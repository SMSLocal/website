import type { Metadata } from "next"
import { getPageMetadata } from "@/lib/seo"
import {
  Boxes,
  CircleDollarSign,
  Inbox,
  LayoutGrid,
  Sparkles,
  Users,
} from "lucide-react"
import { AnnouncementStrip } from "@/components/landing/announcement-strip"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { RelatedContent } from "@/components/shared/related-content"
import { ProductFinalCta, Section, SectionHeader } from "@/components/product/product-page"
import { BreadcrumbJsonLd } from "@/components/seo/json-ld"
import {
  CompareHero,
  CompareMethodology,
  CompareTableHonest,
  OtherCompares,
  PersonaSplit,
  WinsBlock,
  type CompareRow,
  type PersonaCard,
} from "@/components/compare/compare-page"

// ─── SEO — edit lib/seo/registry.ts or open /dev/seo to preview ──────────────
export const metadata: Metadata = getPageMetadata("/compare/smslocal-vs-wati")

const ROWS: CompareRow[] = [
  {
    feature: "Pay-as-you-go pricing (no monthly fee)",
    us: "yes",
    them: "no",
    note: "WATI starts at ₹2,499/month per workspace; we have a zero-fee tier.",
  },
  {
    feature: "WhatsApp Business API (official BSP)",
    us: "yes",
    them: "yes",
    note: "Both are Meta-approved BSPs.",
  },
  {
    feature: "Shared team inbox with assignments and SLAs",
    us: "yes",
    them: "yes",
    note: "WATI's inbox is more mature; ours ships SLAs, private notes, and tags.",
  },
  {
    feature: "Broadcasts with segmentation",
    us: "yes",
    them: "yes",
  },
  {
    feature: "Visual chatbot / flow builder",
    us: "yes",
    them: "yes",
  },
  {
    feature: "AI WhatsApp agents on the core plan",
    us: "yes",
    them: "partial",
    note: "WATI's KnowBot / AI inbox features sit behind higher-tier plans.",
  },
  {
    feature: "8-language multilingual agent",
    us: "yes",
    them: "partial",
    note: "WATI supports multiple languages; we ship an 8-language Indic tuning out-of-the-box.",
  },
  {
    feature: "SMS alongside WhatsApp (single vendor)",
    us: "yes",
    them: "no",
    note: "WATI is WhatsApp-only. If you need DLT SMS, you'll add a second vendor.",
  },
  {
    feature: "OTP API with dedicated priority route",
    us: "yes",
    them: "no",
  },
  {
    feature: "DLT registration and template management",
    us: "yes",
    them: "no",
  },
  {
    feature: "Shopify / WooCommerce / Zapier integrations",
    us: "yes",
    them: "yes",
    note: "WATI's app marketplace is broader; both cover mainstream stacks.",
  },
  {
    feature: "Per-agent seat pricing",
    us: "no",
    them: "yes",
    note: "WATI charges per user seat; we charge per message only.",
  },
  {
    feature: "REST API with six official SDKs",
    us: "yes",
    them: "partial",
    note: "WATI has an API; SDK coverage is thinner than ours.",
  },
  {
    feature: "Signed webhooks with retries and backoff",
    us: "yes",
    them: "yes",
  },
  {
    feature: "Sandbox mode for CI/CD",
    us: "yes",
    them: "partial",
  },
  {
    feature: "GST invoicing and INR billing",
    us: "yes",
    them: "yes",
  },
  {
    feature: "In-India data residency",
    us: "yes",
    them: "yes",
  },
  {
    feature: "24×7 human support on the core plan",
    us: "yes",
    them: "partial",
    note: "WATI's 24×7 response is gated to higher tiers.",
  },
]

const US_WINS = [
  {
    title: "Zero monthly fee",
    description:
      "No ₹2,499/month floor. You pay only for messages sent. An SMB on 5,000 WhatsApp conversations a month saves roughly ₹30,000/year before any usage.",
    icon: CircleDollarSign,
  },
  {
    title: "SMS + WhatsApp + OTP in one vendor",
    description:
      "WATI is WhatsApp-only. With us you don't need a second CPaaS for DLT SMS, OTP delivery, or promotional campaigns — one dashboard, one invoice, one set of DLRs.",
    icon: Boxes,
  },
  {
    title: "AI agents on the core plan",
    description:
      "WATI's KnowBot and advanced AI features sit behind higher tiers. Our 8-language AI agent is part of the base product — train it once, run it everywhere.",
    icon: Sparkles,
  },
  {
    title: "Per-message pricing, not per-seat",
    description:
      "Add ten agents to your inbox without a pricing conversation. Seats are free — throughput is what you pay for.",
    icon: Users,
  },
]

const THEM_WINS = [
  {
    title: "Deeper, more mature inbox",
    description:
      "WATI has iterated on the shared inbox for years. If your primary need is a feature-rich conversation UI with a large agent team, WATI's inbox still feels more polished in day-to-day use.",
    icon: Inbox,
  },
  {
    title: "Broader no-code app marketplace",
    description:
      "WATI's template and integration marketplace covers more niche SaaS tools than ours does today. If your stack is full of long-tail apps, WATI will click into more of them out-of-the-box.",
    icon: LayoutGrid,
  },
]

const US_PICKS: PersonaCard[] = [
  {
    title: "The SMB who wants WhatsApp plus SMS in one vendor",
    description:
      "You send DLT SMS, OTP, and WhatsApp broadcasts in a typical month. Paying a WhatsApp-only SaaS fee on top of a second SMS vendor doesn't make sense.",
    bullets: [
      "One login, one invoice, one DLR view for SMS + WhatsApp",
      "DLT onboarding, templates, and headers managed in-platform",
      "AI agent handles repeat inbox questions out of the box",
    ],
  },
  {
    title: "The team scaling support headcount without scaling cost",
    description:
      "You want to add five, ten, twenty agents over the next year without that being a pricing event. You also want real AI deflection, not a “coming soon” label.",
    bullets: [
      "Unlimited agent seats on every plan",
      "AI agent + human hand-off as a single shared view",
      "Per-message billing only — seats are free",
    ],
  },
]

const THEM_PICKS: PersonaCard[] = [
  {
    title: "The WhatsApp-first team that values a polished inbox above all else",
    description:
      "If you run WhatsApp-only, have a large support team that lives in the inbox all day, and value a mature, battle-tested UI over every other factor — WATI is honestly an excellent pick.",
    bullets: [
      "Best-in-class shared WhatsApp inbox experience",
      "Broad app marketplace including niche SaaS tools",
      "Years of iteration on multi-agent workflows",
    ],
  },
]

export default function CompareWatiPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Compare", path: "/compare" },
          { name: "SMSLocal vs WATI", path: "/compare/smslocal-vs-wati" },
        ]}
      />
      <AnnouncementStrip />
      <SiteHeader />

      <main className="flex-1">
        <CompareHero
          competitor="WATI"
          tagline="Pay-as-you-go messaging vs a flat-fee WhatsApp SaaS."
          intro="WATI is one of the most-used WhatsApp Business Solution Providers in India, priced as a flat-fee SaaS (₹2,499/month and up). SMSLocal is a pay-as-you-go CPaaS that ships SMS, WhatsApp, OTP, and AI agents in one dashboard with no monthly platform fee. If you live purely inside WhatsApp and a polished inbox is your top priority, WATI is a fair pick — this page explains where each platform actually wins."
          lastUpdated="April 2026"
        />

        <Section className="border-b border-foreground/5">
          <SectionHeader
            eyebrow="Feature-by-feature"
            title="Eighteen rows, sourced from public docs."
            subtitle="Tick means fully supported. Amber means partial or gated. Grey means not currently available."
          />
          <div className="mt-10 space-y-6">
            <CompareTableHonest competitor="WATI" rows={ROWS} />
            <CompareMethodology />
          </div>
        </Section>

        <section className="bg-muted/30 border-b border-foreground/5 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <SectionHeader
              eyebrow="Who wins what"
              title="Four wins for us, two for them."
              subtitle="We cover more channels and cost less to start. They have a deeper single-channel inbox. Pick based on which matters more."
              center
            />
            <div className="mt-12">
              <WinsBlock competitor="WATI" usWins={US_WINS} themWins={THEM_WINS} />
            </div>
          </div>
        </section>

        <Section className="border-b border-foreground/5">
          <SectionHeader
            eyebrow="Who should pick what"
            title="Matching the platform to the buyer."
            subtitle="Two personas for us, one for WATI. If you don't see yourself in these personas, talk to both teams."
            center
          />
          <div className="mt-12">
            <PersonaSplit competitor="WATI" usPicks={US_PICKS} themPicks={THEM_PICKS} />
          </div>
        </Section>

        <section className="bg-muted/30 border-b border-foreground/5 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <OtherCompares currentSlug="smslocal-vs-wati" />
          </div>
        </section>

        <RelatedContent path="/compare/smslocal-vs-wati" />

        <ProductFinalCta
          title="See SMSLocal on your own inbox."
          subtitle="₹60 free credit, no card. Connect a WhatsApp number, send a real broadcast, and compare on your own data."
          primaryCta={{ label: "Start Free — ₹60 Credit", href: "/signup" }}
          secondaryCta={{ label: "See pricing", href: "/pricing" }}
        />
      </main>

      <SiteFooter />
    </div>
  )
}
