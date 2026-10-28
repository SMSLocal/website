"use client"

/**
 * Fires conversion and CTA events from link clicks anywhere on the site, so
 * the many CTA components don't each need their own handler.
 *
 *   signup_cta_clicked   a link to this site's /signup page
 *   signup_started       the click through to app.smslocal.in/signup
 *   sales_cta_clicked    a link to /company/contact/ (not on that page)
 *   dlt_help_clicked     a link to the DLT help or DLT guide pages
 *
 * `contact_submitted` is sent by the contact form itself. Signup completion
 * happens on app.smslocal.in, outside this site, so it can't be sent from here.
 *
 * Nothing is attached or sent until the visitor accepts analytics cookies.
 */

import { useEffect } from "react"
import { useHasConsent } from "@/components/consent/cookie-consent"
import { captureEvent, rememberLanding } from "@/lib/analytics/events"

const APP_HOST = "app.smslocal.in"

type Hit = { name: string; asConversion?: boolean }

function classify(url: URL, pagePath: string): Hit | null {
  if (url.host === APP_HOST && /^\/signup(\/|$)/.test(url.pathname)) {
    return { name: "signup_started", asConversion: true }
  }
  if (url.origin !== window.location.origin) return null
  if (/^\/signup\/?$/.test(url.pathname)) return { name: "signup_cta_clicked" }
  if (/^\/company\/contact\/?$/.test(url.pathname) && !/^\/company\/contact\/?$/.test(pagePath)) {
    return { name: "sales_cta_clicked" }
  }
  if (/^\/resources\/help\/dlt(\/|$)/.test(url.pathname) || /^\/blog\/dlt-/.test(url.pathname)) {
    return { name: "dlt_help_clicked" }
  }
  return null
}

function ctaLocation(a: Element): string {
  if (a.closest("header")) return "header"
  if (a.closest("footer")) return "footer"
  return "body"
}

export function ConversionEvents() {
  const granted = useHasConsent("analytics")

  useEffect(() => {
    if (!granted) return
    rememberLanding()

    const onClick = (e: MouseEvent) => {
      // Left click, or middle click (opens a new tab). Ignore everything else.
      if (e.type === "auxclick" && e.button !== 1) return
      const target = e.target
      if (!(target instanceof Element)) return
      const a = target.closest("a[href]")
      if (!(a instanceof HTMLAnchorElement)) return

      let url: URL
      try {
        url = new URL(a.href, window.location.href)
      } catch {
        return
      }
      const hit = classify(url, window.location.pathname)
      if (!hit) return

      const label = (a.getAttribute("aria-label") || a.textContent || "")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 60)
      captureEvent(
        hit.name,
        {
          target: url.host + url.pathname,
          cta_label: label,
          cta_location: ctaLocation(a),
        },
        { asConversion: hit.asConversion },
      )
    }

    document.addEventListener("click", onClick)
    document.addEventListener("auxclick", onClick)
    return () => {
      document.removeEventListener("click", onClick)
      document.removeEventListener("auxclick", onClick)
    }
  }, [granted])

  return null
}
