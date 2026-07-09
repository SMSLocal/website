import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { AnalyticsShell } from "@/components/dev-analytics/analytics-shell"
import { getSession } from "@/lib/seo/auth"
import { isStoreConfigured } from "@/lib/analytics/store"

/**
 * /dev/analytics — first-party traffic & conversions console.
 *
 * Shares the same JWT cookie as /dev/seo: if the operator is not signed in,
 * we redirect to the SEO login page with `?next=/dev/analytics` so they land
 * back here after authenticating. Unlike /dev/seo the shell does its own
 * data-fetching client-side (one endpoint per tab) so opening the page is
 * always instant — even if Redis is cold.
 */
export const metadata: Metadata = {
  title: "Analytics · SMSLocal",
  robots: { index: false, follow: false, nocache: true },
}

export const dynamic = "force-dynamic"

export default async function DevAnalyticsPage() {
  const session = await getSession()
  if (!session) {
    redirect("/dev/seo/login?next=/dev/analytics")
  }
  const storeReady = isStoreConfigured()

  return <AnalyticsShell username={session.sub} storeReady={storeReady} />
}
