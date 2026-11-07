import type { Metadata } from "next"
import Link from "next/link"
import { getPageMetadata } from "@/lib/seo"
import { AnnouncementStrip } from "@/components/landing/announcement-strip"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { IntegrationsStackPage } from "@/components/lazy"
import { Section, SectionHeader } from "@/components/product/product-page"

// ─── SEO — edit lib/seo/registry.ts or open /dev/seo to preview ──────────────
// Was a hardcoded metadata object with no canonical, so the page inherited the
// root layout's canonical (the homepage) and was treated as a duplicate.
import { BreadcrumbJsonLd } from "@/components/seo/json-ld"
export const metadata: Metadata = getPageMetadata("/products/integrations")

// The interactive stack below is a client-only component, so none of its text is in
// the server HTML. This plain-text summary (the same apps and channels the stack
// lists) gives crawlers that do not run JavaScript the page content too.
const INTEGRATION_GROUPS = [
  {
    label: "E-commerce",
    apps: "Shopify, WooCommerce and Magento",
    use: "send order, tracking and refund alerts on SMS and WhatsApp, and trigger messages from order events.",
  },
  {
    label: "CRM",
    apps: "HubSpot, Salesforce and Zoho CRM",
    use: "sync contacts, deals and message history, and send SMS or WhatsApp from lead stages.",
  },
  {
    label: "Helpdesk",
    apps: "Freshdesk, Zendesk and Intercom",
    use: "reply to tickets over WhatsApp, turn SMS replies into tickets and route escalations.",
  },
  {
    label: "Communication",
    apps: "Slack, Microsoft Teams and Google Sheets",
    use: "route customer messages into Slack channels, notify teams on replies and log conversations to a sheet.",
  },
  {
    label: "Analytics",
    apps: "Google Analytics, Mixpanel and Power BI",
    use: "attribute conversions to campaigns, stream delivery and reply events, and pipe message metrics into dashboards.",
  },
  {
    label: "Automation",
    apps: "Zapier, Make and Pabbly Connect",
    use: "connect SMSLocal to thousands of other apps without code, using visual scenario builders and multi-step flows.",
  },
] as const

export default function IntegrationsPage() {
  return (
    <>
      <BreadcrumbJsonLd crumbs={[{ name: "Home", path: "/" }, { name: "Products", path: "/products" }, { name: "Integrations", path: "/products/integrations" }]} />
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

        <Section tone="muted">
          <SectionHeader
            eyebrow="At a glance"
            title="What SMSLocal connects to."
            subtitle="The same apps and channels as above, in plain text."
          />
          <div className="mx-auto mt-10 max-w-4xl">
            <dl className="grid gap-4 sm:grid-cols-2">
              {INTEGRATION_GROUPS.map((g) => (
                <div
                  key={g.label}
                  className="rounded-2xl border border-foreground/10 bg-background p-5 shadow-sm"
                >
                  <dt className="text-[15px] font-semibold">
                    {g.label}: {g.apps}
                  </dt>
                  <dd className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">
                    Use it to {g.use}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mt-8 text-[14.5px] leading-relaxed text-foreground/85">
              <strong>Ten native channels in one account.</strong> Besides the apps above,
              SMSLocal covers{" "}
              <Link href="/products/bulk-sms/" className="font-semibold text-primary hover:underline">
                Bulk SMS
              </Link>
              ,{" "}
              <Link
                href="/products/whatsapp-business-api/"
                className="font-semibold text-primary hover:underline"
              >
                WhatsApp
              </Link>
              ,{" "}
              <Link href="/products/email/" className="font-semibold text-primary hover:underline">
                Email
              </Link>
              ,{" "}
              <Link href="/products/otp-sms/" className="font-semibold text-primary hover:underline">
                OTP SMS
              </Link>
              ,{" "}
              <Link href="/products/rcs/" className="font-semibold text-primary hover:underline">
                RCS
              </Link>
              ,{" "}
              <Link href="/products/voice/" className="font-semibold text-primary hover:underline">
                Voice and IVR
              </Link>
              ,{" "}
              <Link href="/products/live-chat/" className="font-semibold text-primary hover:underline">
                Live Chat
              </Link>
              , Telegram, Instagram and Messenger.
            </p>

            <p className="mt-4 text-[14.5px] leading-relaxed text-foreground/85">
              <strong>For anything else, use the API.</strong> The REST API covers contacts,
              campaigns and messages. Webhooks report delivery receipts, replies and status
              changes, OAuth 2.0 handles sign-in for third-party apps, and a sandbox simulates
              delivery and carrier failures. Start with the{" "}
              <Link
                href="/developers/api-docs/"
                className="font-semibold text-primary hover:underline"
              >
                API reference
              </Link>{" "}
              or the{" "}
              <Link
                href="/developers/quickstart/"
                className="font-semibold text-primary hover:underline"
              >
                quickstart
              </Link>
              .
            </p>
          </div>
        </Section>
      </main>
      <SiteFooter />
    </>
  )
}