import type { Metadata } from "next"
import Link from "next/link"
import { getPageMetadata } from "@/lib/seo"
import { AnnouncementStrip } from "@/components/landing/announcement-strip"
import { SiteHeader } from "@/components/landing/site-header"
import { ExploreMore } from "@/components/product/explore-more"
import { GsFinalCta } from "@/components/home/gs/sections-c"
import { SiteFooter } from "@/components/landing/site-footer"
import { FaqSection } from "@/components/landing/faq-section"
import { WhatsAppMotion } from "@/components/product/whatsapp-motion"
import {
  IntegrationsApi,
  IntegrationsChannels,
  IntegrationsDirectory,
  IntegrationsRecipes,
  IntegrationsStyles,
  IntegrationsTrust,
} from "@/components/product/integrations-sections"
import { IntegrationsHubScene } from "@/components/product/integrations-hub-scene"
import { ArrowRight, Code2, KeyRound, Layers, Sparkles, Webhook } from "lucide-react"

// ─── SEO — edit lib/seo/registry.ts or open /dev/seo to preview ──────────────
// Was a hardcoded metadata object with no canonical, so the page inherited the
// root layout's canonical (the homepage) and was treated as a duplicate.
import { BreadcrumbJsonLd, FaqJsonLd, ProductServiceJsonLd } from "@/components/seo/json-ld"
export const metadata: Metadata = getPageMetadata("/products/integrations")

const FAQ = [
  {
    q: "Which apps does SMSLocal integrate with?",
    a: "SMSLocal connects to Shopify, WooCommerce and Magento for e-commerce, HubSpot, Salesforce and Zoho CRM, Freshdesk, Zendesk and Intercom for support, Slack, Microsoft Teams and Google Sheets, Google Analytics, Mixpanel and Power BI, and Zapier, Make and Pabbly Connect for automation.",
  },
  {
    q: "Do I need a developer to connect my apps?",
    a: "No. App integrations use 1-click OAuth on Starter and above, so you can connect a store, CRM or helpdesk without writing code. For anything custom, the REST API and webhooks are there.",
  },
  {
    q: "Is the Zapier integration free?",
    a: "The SMSLocal side is free on Starter and above. Connect SMS, WhatsApp, OTP and RCS triggers at no extra cost. Zapier's own pricing applies, and their free tier already covers basic automations like \"new lead, then send SMS\".",
  },
  {
    q: "Can I keep my existing DLT sender IDs and templates?",
    a: "Yes. When you connect SMSLocal we migrate your approved Sender IDs (headers) and DLT content templates across Jio, Airtel, Vi and BSNL, so your transactional and OTP traffic keeps flowing without re-registration delays.",
  },
  {
    q: "Is there a public REST API?",
    a: "Yes. A full REST API with CRUD for contacts, campaigns and messages, idempotency keys, signed webhooks, and official SDKs for Node.js, Python, PHP and Go. A sandbox lets you simulate delivery and carrier failures without spending credit.",
  },
  {
    q: "Can SMSLocal integrate with my custom CRM?",
    a: "Yes. Beyond the native HubSpot, Salesforce and Zoho connectors, you can wire any in-house CRM to SMSLocal through the REST API, webhooks, or Zapier and Make, with no wait for a pre-built connector.",
  },
  {
    q: "Does SMSLocal support SAML SSO?",
    a: "Yes. SAML 2.0 single sign-on and SCIM user provisioning are available on Enterprise plans, alongside role-based access, IP allowlists and scoped API keys for every team member.",
  },
]

const EXPLORE = [
  { href: "/channels/whatsapp/", label: "WhatsApp Business API", hint: "Official API, templates and AI replies" },
  { href: "/channels/web-chat/", label: "Website live chat widget", hint: "AI chat for every visitor" },
  { href: "/products/voice/", label: "Business voice calling", hint: "Calls inside your support inbox" },
  { href: "/numbers/did/", label: "DID and virtual numbers", hint: "Local and toll-free numbers" },
]

const BTN = "group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-primary to-[oklch(0.55_0.13_172)] px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:shadow-xl hover:shadow-primary/30"
const BTN_OUT = "inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3.5 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"

const TRUST = [
  { icon: KeyRound, label: "1-click OAuth on Starter" },
  { icon: Layers, label: "10 native channels" },
  { icon: Code2, label: "A full REST API" },
  { icon: Webhook, label: "Webhooks and a sandbox" },
]

export default function IntegrationsPage() {
  return (
    <>
      <ProductServiceJsonLd name="SMSLocal Integrations" description="Connect SMSLocal to Shopify, HubSpot, Salesforce, Slack, Zapier and 30+ apps with 1-click OAuth, 10 native channels and a full REST API." path="/products/integrations" category="Business Software Integrations" />
      <BreadcrumbJsonLd crumbs={[{ name: "Home", path: "/" }, { name: "Products", path: "/products" }, { name: "Integrations", path: "/products/integrations" }]} />
      <FaqJsonLd items={FAQ} path="/products/integrations" />
      <AnnouncementStrip />
      <SiteHeader />
      <main className="overflow-x-clip">
        <section className="relative isolate overflow-hidden bg-background">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 opacity-50 [background-image:radial-gradient(var(--border)_1.2px,transparent_1.2px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_at_72%_48%,black_10%,transparent_70%)]" />
          </div>
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-14 pt-14 sm:px-6 lg:grid-cols-[1fr_580px] lg:items-stretch lg:gap-8 lg:pb-20 lg:pt-12">
            <div className="int-rise min-w-0">
              <p className="inline-flex items-center gap-2 rounded-full bg-foreground px-3.5 py-1.5 text-[12.5px] font-medium text-background">
                <Sparkles className="h-3.5 w-3.5 text-accent" />Integrations &middot; 30+ apps &middot; OAuth in one click
              </p>
              <h1 className="mt-6 text-balance text-[30px] font-semibold leading-[1.1] tracking-[-0.035em] sm:text-[42px]">
                Connect SMSLocal to your <span className="text-primary">stack.</span>
              </h1>
              <p className="mt-5 max-w-lg text-pretty text-[17px] leading-relaxed text-muted-foreground">
                Shopify, HubSpot, Salesforce, Slack, Zapier and more — 1-click OAuth on Starter. Plus 10 native channels and a full REST API.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link href="/signup/" className={BTN}>Start your trial <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" /></Link>
                <Link href="/developers/api-docs/" className={BTN_OUT}>View the API docs</Link>
              </div>
              <ul className="mt-8 grid max-w-lg grid-cols-1 gap-x-8 gap-y-3 text-[14px] text-muted-foreground sm:grid-cols-2">
                {TRUST.map((t) => (
                  <li key={t.label} className="flex items-start gap-2.5 leading-snug"><t.icon className="mt-[1px] h-4 w-4 shrink-0 text-primary" /><span>{t.label}</span></li>
                ))}
              </ul>
            </div>
            <div className="int-rise min-w-0" style={{ animationDelay: "0.15s" }}>
              <IntegrationsHubScene />
            </div>
          </div>
          <style>{`
            @keyframes int-rise { from { opacity: 0; transform: translateY(26px) } to { opacity: 1; transform: none } }
            .int-rise { animation: int-rise .9s cubic-bezier(.2,.7,.2,1) both }
            @media (prefers-reduced-motion: reduce) { .int-rise { animation: none } }
          `}</style>
        </section>
        <IntegrationsDirectory />
        <IntegrationsChannels />
        <IntegrationsApi />
        <IntegrationsTrust />
        <IntegrationsRecipes />
        <FaqSection items={FAQ} />
        <ExploreMore links={EXPLORE} />
        <GsFinalCta />
        <IntegrationsStyles />
        <WhatsAppMotion />
      </main>
      <SiteFooter />
    </>
  )
}