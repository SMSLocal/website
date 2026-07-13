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
        <div className="relative overflow-hidden bg-[oklch(0.13_0.02_230)] pb-6 pt-10 sm:pt-14">
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-[12px] font-semibold text-emerald-400">
              Integrations &middot; 30+ apps &middot; OAuth in one click
            </div>
            <h1 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-[48px] lg:leading-[1.06]">
              Connect SMSLocal to your{" "}
              <span style={{ background: "linear-gradient(135deg,#10b981,oklch(0.72 0.17 165))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                stack.
              </span>
            </h1>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/60">
              Shopify, HubSpot, Salesforce, Slack, Zapier and more — 1-click OAuth on Starter. Plus 10 native channels and a full REST API.
            </p>
          </div>
        </div>
        <IntegrationsStackPage hideHero />
      </main>
      <SiteFooter />
    </>
  )
}