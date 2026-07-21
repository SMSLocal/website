"use client"

/**
 * Google Analytics 4, gated behind the visitor's analytics-cookie consent.
 *
 * GA4 writes first-party cookies (_ga, _ga_*), so under the DPDPA it may only
 * load after the user affirmatively grants the "analytics" category — the same
 * rule we apply to Vercel Analytics in ConsentedAnalytics. Before consent (or
 * after a Reject) no gtag script is injected at all.
 *
 * Route changes: the App Router navigates without a full reload, so GA would
 * only ever record the first page. The effect below re-sends a page_view on
 * every pathname/query change.
 *
 * Note: the CSP in next.config.mjs must allow googletagmanager.com (script-src)
 * and the google-analytics.com endpoints (connect-src) or the tag is blocked.
 */

import Script from "next/script"
import { usePathname, useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { useHasConsent } from "./cookie-consent"

/** GA4 Measurement ID for smslocal.in. Public by design — safe in client code. */
export const GA_MEASUREMENT_ID = "G-PTER5SFMVM"

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

export function ConsentedGoogleAnalytics() {
  const granted = useHasConsent("analytics")
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!granted || typeof window === "undefined" || typeof window.gtag !== "function") return
    const qs = searchParams?.toString()
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: qs ? `${pathname}?${qs}` : pathname,
    })
  }, [granted, pathname, searchParams])

  if (!granted) return null

  return (
    <>
      <Script
        id="ga4-src"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`}
      </Script>
    </>
  )
}
