"use client"

/**
 * PostHog product analytics, gated behind the visitor's analytics-cookie
 * consent — the same rule as GA4 and Vercel Analytics. Before consent (or
 * after a Reject) posthog-js is never initialised, so no cookies are written
 * and nothing is sent. Withdrawing consent later opts the visitor out.
 *
 * Route changes: the App Router navigates without a full reload, so automatic
 * pageview capture is off and the effect below sends a $pageview on every
 * pathname/query change instead.
 *
 * Note: the CSP in next.config.mjs must allow the PostHog hosts below in
 * script-src and connect-src or the SDK is blocked.
 */

import posthog from "posthog-js"
import { usePathname, useSearchParams } from "next/navigation"
import { useEffect, useRef } from "react"
import { useHasConsent } from "./cookie-consent"

/** PostHog project token for smslocal.in. Write-only and public by design. */
export const POSTHOG_KEY = "phc_q8WyP4UuRPsTo9ChWCsj4YMmyWHiNBvuMaNj5dzczXr3"
export const POSTHOG_HOST = "https://us.i.posthog.com"

export function ConsentedPostHog() {
  const granted = useHasConsent("analytics")
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const initialised = useRef(false)

  useEffect(() => {
    if (granted && !initialised.current) {
      posthog.init(POSTHOG_KEY, {
        api_host: POSTHOG_HOST,
        ui_host: "https://us.posthog.com",
        defaults: "2025-05-24",
        capture_pageview: false,
        person_profiles: "identified_only",
      })
      initialised.current = true
    } else if (granted && initialised.current) {
      posthog.opt_in_capturing()
    } else if (!granted && initialised.current) {
      posthog.opt_out_capturing()
    }
  }, [granted])

  useEffect(() => {
    if (!granted || !initialised.current) return
    const qs = searchParams?.toString()
    posthog.capture("$pageview", {
      $current_url: window.location.origin + pathname + (qs ? `?${qs}` : ""),
    })
  }, [granted, pathname, searchParams])

  return null
}
