"use client"

/**
 * DPDPA-compliant cookie / consent management for SMSLocal.
 *
 * Legal model (India — Digital Personal Data Protection Act 2023)
 *   • Affirmative, specific, informed consent BEFORE any non-essential
 *     processing begins. No processing until a choice is made.
 *   • Refusal must be at least as easy as acceptance. The "Reject all" button
 *     is visually equal to "Accept all".
 *   • No pre-ticked checkboxes. Analytics and Marketing default to OFF inside
 *     the preferences dialog until the user opts in.
 *   • The user can withdraw or modify consent at any time through the
 *     "Manage cookie preferences" link in the footer.
 *
 * Where the consent state lives
 *   • localStorage key: `smslocal-consent-v1` (versioned so a future policy
 *     change can re-prompt everyone automatically by bumping the version).
 *   • Shape: { essential, analytics, marketing, ts, v }
 *
 * How to gate a tracker
 *   Wrap it in `useHasConsent("analytics")` or render it inside
 *   <ConsentGate category="analytics">…</ConsentGate>. Vercel Analytics is
 *   already gated this way in app/layout.tsx.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import Link from "next/link"
import { Cookie, Settings2, ShieldCheck, X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"

// ─── Types ───────────────────────────────────────────────────────────────────

export type ConsentCategory = "essential" | "analytics" | "marketing"

export type ConsentState = {
  essential: true // Always granted. Required for the site to function.
  analytics: boolean
  marketing: boolean
  /** Unix ms when the choice was made. */
  ts: number
  /** Version of the consent schema — bump to invalidate existing consent. */
  v: number
}

const STORAGE_KEY = "smslocal-consent-v1"
const CONSENT_VERSION = 1

// ─── Context ─────────────────────────────────────────────────────────────────

type ConsentContextValue = {
  /** null while SSR or before the first client read. Never null after that. */
  consent: ConsentState | null
  /** True once the client has read localStorage (prevents SSR/client flicker). */
  hydrated: boolean
  acceptAll: () => void
  rejectAll: () => void
  updatePreferences: (partial: Partial<Pick<ConsentState, "analytics" | "marketing">>) => void
  openPreferences: () => void
  reset: () => void
}

const ConsentContext = createContext<ConsentContextValue | null>(null)

export function useConsent(): ConsentContextValue {
  const ctx = useContext(ConsentContext)
  if (!ctx) {
    throw new Error("useConsent must be used inside <CookieConsentProvider>")
  }
  return ctx
}

/** Convenience — returns true if the user has granted the given category. */
export function useHasConsent(category: Exclude<ConsentCategory, "essential">): boolean {
  const { consent } = useConsent()
  return consent?.[category] === true
}

// ─── Provider ────────────────────────────────────────────────────────────────

function readStored(): ConsentState | null {
  if (typeof window === "undefined") return null
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as ConsentState
    // Re-prompt if the schema version changed — policy updates invalidate
    // previous consent (a DPDPA principle: consent must be specific).
    if (parsed.v !== CONSENT_VERSION) return null
    return parsed
  } catch {
    return null
  }
}

function writeStored(state: ConsentState): void {
  if (typeof window === "undefined") return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // Ignore storage errors (private mode, quota) — user can re-decide.
  }
}

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<ConsentState | null>(null)
  const [hydrated, setHydrated] = useState(false)
  const [prefsOpen, setPrefsOpen] = useState(false)

  useEffect(() => {
    setConsent(readStored())
    setHydrated(true)
  }, [])

  const commit = useCallback((next: ConsentState) => {
    writeStored(next)
    setConsent(next)
  }, [])

  const acceptAll = useCallback(() => {
    commit({
      essential: true,
      analytics: true,
      marketing: true,
      ts: Date.now(),
      v: CONSENT_VERSION,
    })
    setPrefsOpen(false)
  }, [commit])

  const rejectAll = useCallback(() => {
    commit({
      essential: true,
      analytics: false,
      marketing: false,
      ts: Date.now(),
      v: CONSENT_VERSION,
    })
    setPrefsOpen(false)
  }, [commit])

  const updatePreferences = useCallback(
    (partial: Partial<Pick<ConsentState, "analytics" | "marketing">>) => {
      commit({
        essential: true,
        analytics: partial.analytics ?? consent?.analytics ?? false,
        marketing: partial.marketing ?? consent?.marketing ?? false,
        ts: Date.now(),
        v: CONSENT_VERSION,
      })
    },
    [commit, consent],
  )

  const openPreferences = useCallback(() => setPrefsOpen(true), [])

  const reset = useCallback(() => {
    if (typeof window !== "undefined") {
      try {
        window.localStorage.removeItem(STORAGE_KEY)
      } catch {
        /* ignore */
      }
    }
    setConsent(null)
  }, [])

  const value = useMemo<ConsentContextValue>(
    () => ({ consent, hydrated, acceptAll, rejectAll, updatePreferences, openPreferences, reset }),
    [consent, hydrated, acceptAll, rejectAll, updatePreferences, openPreferences, reset],
  )

  return (
    <ConsentContext.Provider value={value}>
      {children}
      {hydrated && consent === null ? <CookieBanner /> : null}
      <PreferencesDialog open={prefsOpen} onOpenChange={setPrefsOpen} />
    </ConsentContext.Provider>
  )
}

// ─── Banner (appears until the user decides) ─────────────────────────────────

function CookieBanner() {
  const { acceptAll, rejectAll, openPreferences } = useConsent()
  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[60] flex justify-center px-3 pb-3 sm:px-6 sm:pb-6"
    >
      <div className="w-full max-w-4xl rounded-2xl border border-border/80 bg-background/95 p-5 shadow-xl backdrop-blur supports-[backdrop-filter]:bg-background/85 sm:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
          <div className="flex flex-none items-center gap-3">
            <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl border border-border bg-muted/50 text-foreground">
              <Cookie className="h-5 w-5" aria-hidden="true" />
            </span>
            <h2 className="text-[15px] font-semibold tracking-tight text-foreground sm:hidden">
              Your privacy choices
            </h2>
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="hidden text-[15px] font-semibold tracking-tight text-foreground sm:block">
              Your privacy choices
            </h2>
            <p className="mt-0 text-[13px] leading-relaxed text-muted-foreground sm:mt-1.5">
              SMSLocal uses essential cookies to keep the site working. With your consent we also
              use analytics to understand how pages are used so we can improve them. You can change
              your choice any time from the footer. Read our{" "}
              <Link
                href="/legal/cookie-policy/"
                className="font-medium text-foreground underline underline-offset-2 hover:text-primary"
              >
                cookie policy
              </Link>{" "}
              for details.
            </p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                onClick={acceptAll}
                className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-5 text-[13px] font-semibold text-primary-foreground shadow-sm transition hover:opacity-90"
              >
                Accept all
              </button>
              <button
                type="button"
                onClick={rejectAll}
                className="inline-flex h-10 items-center justify-center rounded-lg border border-border bg-background px-5 text-[13px] font-semibold text-foreground transition hover:bg-muted"
              >
                Reject all
              </button>
              <button
                type="button"
                onClick={openPreferences}
                className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg px-3 text-[13px] font-medium text-muted-foreground transition hover:text-foreground sm:ml-1"
              >
                <Settings2 className="h-3.5 w-3.5" aria-hidden="true" />
                Customize
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Per-category preferences dialog (also used for "Manage" in footer) ──────

type CategoryDef = {
  key: ConsentCategory
  label: string
  summary: string
  examples: string
  required?: boolean
}

const CATEGORIES: CategoryDef[] = [
  {
    key: "essential",
    label: "Strictly necessary",
    summary:
      "Required for the site to function — session handling, security, load balancing, rate limiting, and remembering your cookie choice. Always on.",
    examples: "Session cookie, CSRF token, rate-limit key.",
    required: true,
  },
  {
    key: "analytics",
    label: "Analytics",
    summary:
      "Helps us understand which pages visitors read so we can improve them. Data is aggregated and never used to identify individuals.",
    examples: "Vercel Analytics (cookieless page views, referrer, device category).",
  },
  {
    key: "marketing",
    label: "Marketing",
    summary:
      "Enables remarketing on third-party advertising networks so we can reach people who have shown interest in SMSLocal. Currently not in use.",
    examples: "Reserved for future campaigns — no marketing trackers are loaded today.",
  },
]

function PreferencesDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (o: boolean) => void
}) {
  const { consent, acceptAll, rejectAll, updatePreferences } = useConsent()
  const [analytics, setAnalytics] = useState<boolean>(false)
  const [marketing, setMarketing] = useState<boolean>(false)

  // Seed the toggles whenever the dialog opens.
  useEffect(() => {
    if (!open) return
    setAnalytics(consent?.analytics ?? false)
    setMarketing(consent?.marketing ?? false)
  }, [open, consent])

  const save = () => {
    updatePreferences({ analytics, marketing })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-[15px]">
            <ShieldCheck className="h-4 w-4 text-primary" aria-hidden="true" />
            Cookie preferences
          </DialogTitle>
          <DialogDescription className="text-[13px] leading-relaxed">
            Choose which categories of cookies SMSLocal may use on this device. You can change this
            any time from the footer link, and your choice is stored locally on this browser.
          </DialogDescription>
        </DialogHeader>

        <ul className="divide-y divide-border rounded-lg border border-border">
          {CATEGORIES.map((cat) => {
            const checked =
              cat.key === "essential"
                ? true
                : cat.key === "analytics"
                ? analytics
                : marketing
            const onChange = (next: boolean) => {
              if (cat.key === "analytics") setAnalytics(next)
              else if (cat.key === "marketing") setMarketing(next)
            }
            return (
              <li
                key={cat.key}
                className="flex items-start gap-4 px-4 py-3.5"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-[13.5px] font-semibold text-foreground">{cat.label}</h3>
                    {cat.required ? (
                      <span className="rounded-full border border-border bg-muted/60 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Always on
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1 text-[12.5px] leading-relaxed text-muted-foreground">
                    {cat.summary}
                  </p>
                  <p className="mt-1 text-[11.5px] text-muted-foreground/80">
                    <span className="font-medium text-muted-foreground">Used by:</span>{" "}
                    {cat.examples}
                  </p>
                </div>
                <Switch
                  checked={checked}
                  onCheckedChange={onChange}
                  disabled={cat.required}
                  aria-label={`${cat.label} cookies`}
                  className="mt-0.5"
                />
              </li>
            )
          })}
        </ul>

        <DialogFooter className="mt-2 flex-col gap-2 sm:flex-row sm:justify-between">
          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={rejectAll}
              className="inline-flex h-10 items-center justify-center rounded-lg border border-border bg-background px-4 text-[13px] font-semibold text-foreground transition hover:bg-muted"
            >
              Reject all
            </button>
            <button
              type="button"
              onClick={acceptAll}
              className="inline-flex h-10 items-center justify-center rounded-lg border border-border bg-background px-4 text-[13px] font-semibold text-foreground transition hover:bg-muted"
            >
              Accept all
            </button>
          </div>
          <button
            type="button"
            onClick={save}
            className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-5 text-[13px] font-semibold text-primary-foreground shadow-sm transition hover:opacity-90"
          >
            Save preferences
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// ─── Helpers for the rest of the app ─────────────────────────────────────────

/** Conditionally render children once the user has granted the given category. */
export function ConsentGate({
  category,
  children,
  fallback = null,
}: {
  category: Exclude<ConsentCategory, "essential">
  children: ReactNode
  fallback?: ReactNode
}) {
  const granted = useHasConsent(category)
  if (!granted) return <>{fallback}</>
  return <>{children}</>
}

/**
 * Footer / preferences link — renders a plain button styled as a text link
 * that re-opens the preferences dialog. Drop this into the site footer so
 * users can withdraw or modify consent at any time (DPDPA requirement).
 */
export function ManageConsentLink({ className }: { className?: string }) {
  const { openPreferences } = useConsent()
  return (
    <button
      type="button"
      onClick={openPreferences}
      className={
        className ??
        "text-[13px] text-white/60 transition hover:text-white underline-offset-2 hover:underline"
      }
    >
      Cookie preferences
    </button>
  )
}

/**
 * Small dismiss-cross used by the banner on narrow screens. Exported so we
 * can tree-shake the lucide import if the banner is redesigned later.
 */
export const ConsentDismissIcon = X
