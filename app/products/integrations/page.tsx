import type { Metadata } from "next"
import { AnnouncementStrip } from "@/components/landing/announcement-strip"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { IntegrationsStackPage } from "@/components/lazy"

export const metadata: Metadata = {
  title: "Integrations — Connect SMSLocal to Your Stack | SMSLocal",
  description:
    "Connect SMSLocal to your stack — Shopify, HubSpot, Salesforce, Slack, Zapier and 30+ apps with 1-click OAuth, 10 native channels, and a full REST API.",
}

export default function IntegrationsPage() {
  return (
    <>
      <AnnouncementStrip />
      <SiteHeader />
      <main className="overflow-x-clip">
        <IntegrationsStackPage />
      </main>
      <SiteFooter />
    </>
  )
}