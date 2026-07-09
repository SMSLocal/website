/**
 * Browser-side helpers for the SMSLocal first-party analytics tracker.
 *
 * The tracker component (`components/analytics/tracker.tsx`) installs a
 * minimal `window.slAnalytics` object. This module wraps that global with a
 * typed API that React components can import and call directly, falling
 * back to a no-op when consent hasn't been granted yet.
 */

"use client"

type TrackProperties = Record<string, string | number | boolean | null>

type IdentifyPayload = {
  userId: string
  email?: string
  traits?: TrackProperties
}

declare global {
  interface Window {
    slAnalytics?: {
      track: (name: string, properties?: TrackProperties) => void
      conversion: (name: string, properties?: TrackProperties) => void
      identify: (payload: IdentifyPayload) => void
      /** The IDs this visitor currently carries (useful for outbound links). */
      ids: () => { visitorId: string | null; sessionId: string | null }
    }
  }
}

function hasTracker(): boolean {
  return typeof window !== "undefined" && typeof window.slAnalytics !== "undefined"
}

/** Fire a custom event. No-op if the tracker hasn't loaded yet. */
export function track(name: string, properties?: TrackProperties): void {
  if (!hasTracker()) return
  window.slAnalytics!.track(name, properties)
}

/** Fire a conversion. Promoted into the conversions dashboard. */
export function conversion(name: string, properties?: TrackProperties): void {
  if (!hasTracker()) return
  window.slAnalytics!.conversion(name, properties)
}

/** Tie the current anon visitor to a real user id + email. */
export function identify(payload: IdentifyPayload): void {
  if (!hasTracker()) return
  window.slAnalytics!.identify(payload)
}

/**
 * Append the current visitor/session ids to an outbound URL so the product
 * app on app.smslocal.in can call `/api/track/identify` after signup and
 * stitch the marketing-site journey to the new account.
 */
export function withTrackingParams(url: string): string {
  if (!hasTracker()) return url
  const { visitorId, sessionId } = window.slAnalytics!.ids()
  if (!visitorId && !sessionId) return url
  try {
    const u = new URL(url, window.location.origin)
    if (visitorId) u.searchParams.set("_sl_vid", visitorId)
    if (sessionId) u.searchParams.set("_sl_sid", sessionId)
    return u.toString()
  } catch {
    return url
  }
}
