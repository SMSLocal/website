"use client"

/**
 * SMSLocal first-party analytics tracker.
 *
 * What it does
 *   1. Generates a stable anonymous visitor id on first visit (localStorage).
 *   2. Rotates a session id after 30 minutes of inactivity (sessionStorage
 *      for the id, timestamps in localStorage for the timeout check).
 *   3. Fires a `pageview` event on every client-side route change.
 *   4. Installs `window.slAnalytics` so application code (e.g. contact form)
 *      can call `.track()`, `.conversion()`, `.identify()` directly.
 *   5. Uses `navigator.sendBeacon` where available so events still land when
 *      the user navigates away mid-request.
 *
 * Consent
 *   The component renders only when `useHasConsent("analytics")` is true.
 *   If consent is revoked the global is removed and no further events fire.
 *
 * Identity stitching
 *   URL params `_sl_vid` / `_sl_sid` override the stored ids on arrival so
 *   cross-domain journeys from app.smslocal.in → smslocal.in remain linked.
 */

import { useCallback, useEffect, useRef } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { useHasConsent } from "@/components/consent/cookie-consent"

const VID_KEY = "sl_vid"
const SID_KEY = "sl_sid"
const SID_LAST_KEY = "sl_sid_last"
const SESSION_TIMEOUT_MS = 30 * 60 * 1000

type TrackProperties = Record<string, string | number | boolean | null>

type WirePayload = {
  type: "pageview" | "event" | "conversion"
  name?: string
  path: string
  title?: string
  referrer?: string
  url?: string
  visitorId: string
  sessionId: string
  userId?: string
  email?: string
  isNewSession?: boolean
  properties?: TrackProperties
}

// ─── ID helpers ──────────────────────────────────────────────────────────────

function generateId(prefix: string): string {
  // 96 bits of entropy is plenty for visitor / session uniqueness.
  const bytes = new Uint8Array(12)
  crypto.getRandomValues(bytes)
  let b64 = ""
  for (let i = 0; i < bytes.length; i++) b64 += String.fromCharCode(bytes[i])
  return `${prefix}_${btoa(b64).replace(/[+/=]/g, "").slice(0, 16)}`
}

function readStored(key: string): string | null {
  try {
    return window.localStorage.getItem(key)
  } catch {
    return null
  }
}
function writeStored(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value)
  } catch {
    /* private mode / quota — ignore */
  }
}

function ensureVisitorId(): string {
  const existing = readStored(VID_KEY)
  if (existing) return existing
  const fresh = generateId("v")
  writeStored(VID_KEY, fresh)
  return fresh
}

/** Returns [sessionId, isNew]. A session rotates after 30m inactivity. */
function ensureSession(): [string, boolean] {
  const now = Date.now()
  const stored = readStored(SID_KEY)
  const last = Number(readStored(SID_LAST_KEY) ?? "0")
  if (stored && now - last < SESSION_TIMEOUT_MS) {
    writeStored(SID_LAST_KEY, String(now))
    return [stored, false]
  }
  const fresh = generateId("s")
  writeStored(SID_KEY, fresh)
  writeStored(SID_LAST_KEY, String(now))
  return [fresh, true]
}

/** Adopt visitor/session ids handed over by the product app on arrival. */
function maybeAdoptFromQuery() {
  try {
    const params = new URLSearchParams(window.location.search)
    const vid = params.get("_sl_vid")
    const sid = params.get("_sl_sid")
    if (vid && /^[A-Za-z0-9_-]{3,64}$/.test(vid)) writeStored(VID_KEY, vid)
    if (sid && /^[A-Za-z0-9_-]{3,64}$/.test(sid)) {
      writeStored(SID_KEY, sid)
      writeStored(SID_LAST_KEY, String(Date.now()))
    }
  } catch {
    /* ignore */
  }
}

// ─── Network ────────────────────────────────────────────────────────────────

function send(payload: WirePayload, endpoint = "/api/track") {
  const body = JSON.stringify(payload)
  try {
    if (
      typeof navigator !== "undefined" &&
      typeof navigator.sendBeacon === "function"
    ) {
      const blob = new Blob([body], { type: "application/json" })
      const queued = navigator.sendBeacon(endpoint, blob)
      if (queued) return
    }
  } catch {
    /* fall through to fetch */
  }
  // keepalive so the request survives a pagehide during navigation.
  fetch(endpoint, {
    method: "POST",
    body,
    headers: { "Content-Type": "application/json" },
    keepalive: true,
    credentials: "same-origin",
  }).catch(() => {})
}

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * Skipped pages — internal admin tools should never appear in visitor
 * analytics. Marketing routes all fire normally.
 */
function shouldIgnorePath(pathname: string): boolean {
  return (
    pathname.startsWith("/dev") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next")
  )
}

export function AnalyticsTracker() {
  const granted = useHasConsent("analytics")
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const lastTracked = useRef<string | null>(null)
  const visitorIdRef = useRef<string | null>(null)
  const userRef = useRef<{ userId?: string; email?: string }>({})

  // One-time setup: adopt cross-domain ids + install window global.
  useEffect(() => {
    if (!granted) return
    maybeAdoptFromQuery()
    visitorIdRef.current = ensureVisitorId()

    const buildBase = (): Omit<WirePayload, "type"> => {
      const [sessionId, isNew] = ensureSession()
      return {
        path: window.location.pathname,
        title: document.title,
        referrer: document.referrer || undefined,
        url: window.location.href,
        visitorId: visitorIdRef.current!,
        sessionId,
        userId: userRef.current.userId,
        email: userRef.current.email,
        isNewSession: isNew,
      }
    }

    window.slAnalytics = {
      track(name, properties) {
        if (!name) return
        send({ ...buildBase(), type: "event", name, properties })
      },
      conversion(name, properties) {
        if (!name) return
        send({ ...buildBase(), type: "conversion", name, properties })
      },
      identify({ userId, email, traits }) {
        if (!userId) return
        userRef.current = { userId, email }
        fetch("/api/track/identify", {
          method: "POST",
          credentials: "same-origin",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            visitorId: visitorIdRef.current,
            sessionId: readStored(SID_KEY) ?? undefined,
            userId,
            email,
            traits,
          }),
          keepalive: true,
        }).catch(() => {})
      },
      ids() {
        return {
          visitorId: visitorIdRef.current,
          sessionId: readStored(SID_KEY),
        }
      },
    }

    return () => {
      try {
        delete window.slAnalytics
      } catch {
        /* ignore */
      }
    }
  }, [granted])

  // Fire a pageview on every client-side route change.
  const firePageview = useCallback(() => {
    if (!granted) return
    if (!visitorIdRef.current) return
    if (typeof window === "undefined") return
    const fullPath = `${window.location.pathname}${window.location.search}`
    if (lastTracked.current === fullPath) return
    if (shouldIgnorePath(window.location.pathname)) return
    lastTracked.current = fullPath

    const [sessionId, isNew] = ensureSession()
    send({
      type: "pageview",
      path: window.location.pathname,
      title: document.title,
      referrer: document.referrer || undefined,
      url: window.location.href,
      visitorId: visitorIdRef.current,
      sessionId,
      userId: userRef.current.userId,
      email: userRef.current.email,
      isNewSession: isNew,
    })
  }, [granted])

  useEffect(() => {
    firePageview()
    // pathname/searchParams change whenever the App Router navigates, so
    // this single effect covers SPA transitions without a global listener.
  }, [pathname, searchParams, firePageview])

  return null
}
