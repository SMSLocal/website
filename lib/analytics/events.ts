"use client"

/**
 * Conversion and CTA events, sent to both analytics backends:
 *
 *   - the first-party tracker (`window.slAnalytics`), which is installed only
 *     after the visitor accepts analytics cookies, and
 *   - PostHog, which is initialised only after the same consent.
 *
 * Before consent neither exists, so nothing is sent. Properties are limited to
 * page paths, link targets and CTA labels. Never pass a name, email, phone
 * number or any form content in here.
 */

import posthog from "posthog-js"
import { conversion, track } from "@/lib/analytics/client"

type Props = Record<string, string | number | boolean | null>

const LANDING_PATH_KEY = "sl_landing_path"
const LANDING_REF_KEY = "sl_landing_ref"

/** Origin plus path of a URL, with query string and hash dropped. */
function stripUrl(raw: string): string {
  try {
    const u = new URL(raw)
    return u.origin + u.pathname
  } catch {
    return ""
  }
}

function readSession(key: string): string | null {
  try {
    return window.sessionStorage.getItem(key)
  } catch {
    return null
  }
}

function writeSession(key: string, value: string) {
  try {
    window.sessionStorage.setItem(key, value)
  } catch {
    /* private mode / quota — ignore */
  }
}

/**
 * Remember the first page of this browser session and where the visitor came
 * from, so later conversion events can say which page brought them in. Called
 * only once analytics consent exists.
 */
export function rememberLanding(): void {
  if (readSession(LANDING_PATH_KEY) !== null) return
  writeSession(LANDING_PATH_KEY, window.location.pathname)
  writeSession(LANDING_REF_KEY, stripUrl(document.referrer))
}

function context(): Props {
  return {
    page_path: window.location.pathname,
    landing_path: readSession(LANDING_PATH_KEY) ?? window.location.pathname,
    landing_referrer: readSession(LANDING_REF_KEY) ?? "",
    referrer: stripUrl(document.referrer),
  }
}

/**
 * Send one event. `asConversion` also promotes it into the first-party
 * conversions dashboard.
 */
export function captureEvent(
  name: string,
  props: Props = {},
  options: { asConversion?: boolean } = {},
): void {
  if (typeof window === "undefined") return
  const payload = { ...context(), ...props }

  if (options.asConversion) conversion(name, payload)
  else track(name, payload)

  try {
    if (posthog.__loaded && !posthog.has_opted_out_capturing()) {
      // sendBeacon so the event survives the page unloading on outbound clicks.
      posthog.capture(name, payload, { transport: "sendBeacon" })
    }
  } catch {
    /* analytics must never break the page */
  }
}
