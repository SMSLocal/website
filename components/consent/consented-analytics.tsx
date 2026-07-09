"use client"

/**
 * Vercel Analytics, gated behind the visitor's analytics-cookie consent.
 *
 * The component only mounts `<Analytics />` once the user has explicitly
 * granted the "analytics" category. Before consent (or after a Reject), the
 * Analytics script is not loaded at all, which keeps us DPDPA-compliant
 * without relying on Vercel's claim that Analytics is cookieless.
 */

import { Analytics } from "@vercel/analytics/next"
import { useHasConsent } from "./cookie-consent"

export function ConsentedAnalytics() {
  const granted = useHasConsent("analytics")
  if (!granted) return null
  return <Analytics />
}
