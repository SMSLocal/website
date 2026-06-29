import type { Metadata } from "next"
import { getPageMetadata } from "@/lib/seo"
import {
  Bot,
  Boxes,
  CircleDollarSign,
  Code2,
  ShoppingBag,
  Workflow,
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
export const metadata: Metadata = getPageMetadata("/compare/smslocal-vs-interakt")

const ROWS: CompareRow[] = [
  {
    feature: "WhatsApp Business API (official BSP)",
    us: "yes",
    them: "yes",
  },
  {
    feature: "Pay-as-you-go with no monthly platform fee",
    us: "yes",
    them: "no",
    note: "Interakt's paid plans start around ₹2,500/month; advanced commerce features gate higher.",
  },
  {
    feature: "Shopify native integration with abandoned-cart flows",
    us: "yes",
    them: "yes",
    note: "Interakt's Shopify integration is more D2C-opinionated out-of-the-box.",
  },
  {
    feature: "WhatsApp product catalogue + cart inside chat",
    us: "yes",
    them: "yes",
  },
  {
    feature: "Pre-built D2C journey templates",
    us: "partial",
    them: "yes",
    note: "Interakt ships more ready-made journeys for D2C patterns like welcome, COD-confirmation, and winback.",
  },
  {
    feature: "SMS alongside WhatsApp (single vendor)",
    us: "yes",
    them: "no",
    note: "Interakt is WhatsApp-only. SMS needs a second vendor.",
  },
  {
    feature: "OTP API with dedicated priority route",
    us: "yes",
    them: "no",
  },
  {
    feature: "Shared team inbox with assignments + SLAs",
    us: "yes",
    them: "yes",
  },
  {
    feature: "AI WhatsApp agent (multilingual) on the core plan",
    us: "yes",
    them: "partial",
    note: "Interakt has AI / smart-reply features on higher tiers.",
  },
  {
    feature: "8-language Indic tuning",
    us: "yes",
    them: "partial",
  },
  {
    feature: "Broadcasts with RFM / LTV segmentation",
    us: "yes",
    them: "yes",
    note: "Interakt's D2C segmentation presets are more built-in.",
  },
  {
    feature: "Per-agent seat pricing",
    us: "no",
    them: "yes",
    note: "Interakt's team plans price per agent; we price per message only.",
  },
  {
    feature: "REST API with six official SDKs",
    us: "yes",
    them: "partial",
  },
  {
    feature: "Idempotency keys on bulk + OTP endpoints",
    us: "yes",
    them: "partial",
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
]

const US_WINS = [
  {
    title: "One vendor for SMS, OTP, and WhatsApp",
    description:
      "D2C brands send OTP on checkout, SMS on shipping, and WhatsApp on marketing. Interakt is WhatsApp-only — with us you don't duct-tape a second CPaaS onto the stack.",
    icon: Boxes,
  },
  {
    title: "No platform fee, no per-seat tax",
    description:
      "Zero monthly fee on the core tier and unlimited agent seats. You pay for messages and conversations — not for having five teammates in the inbox.",
    icon: CircleDollarSign,
  },
  {
    title: "AI agent included, tuned for Indic",
    description:
      "Our 8-language WhatsApp AI agent handles product questions, size queries, and order-status lookups on the core plan — not gated behind a higher-tier contract.",
    icon: Bot,
  },
  {
    title: "Developer-friendly for custom commerce stacks",
    description:
      "If your team runs a custom Next.js storefront, a headless Shopify, or a stack that isn't a standard Interakt template — six SDKs, idempotency keys, and a real sandbox make the integration actually production-grade.",
    icon: Code2,
  },
]

const THEM_WINS = [
  {
    title: "More D2C-opinionated out-of-the-box",
    description:
      "Interakt ships more pre-built flows for welcome, abandoned-cart, COD-confirmation, winback, and post-purchase. If you want to click a template and ship in a day — without a growth engineer designing the flow — Interakt's D2C focus shows.",
    icon: ShoppingBag,
  },
  {
    title: "Deeper Shopify-first integration surface",
    description:
      "The Shopify integration is more opinionated: it maps Shopify events to WhatsApp flows directly with less wiring. If your entire business runs on Shopify and you want minimum plumbing, Interakt is a fair pick.",
    icon: Workflow,
  },
]

const US_PICKS: PersonaCard[] = [
  {
    title: "The D2C brand that sends SMS, OTP, and WhatsApp",
    description:
      "Checkout OTP, shipping SMS, and WhatsApp marketing all run on the same customer. Running one of them on a separate vendor creates billing and attribution mess; consolidating on one CPaaS doesn't.",
    bullets: [
      "One login, one invoice for SMS + WhatsApp + OTP",
      "Dedicated OTP priority route with sub-5-second SLA",
      "AI agent handles post-purchase questions on day one",
    ],
  },
  {
    title: "The D2C team with a custom / headless storefront",
    description:
      "Your store isn't a vanilla Shopify out-of-the-box — it's a custom Next.js or headless setup. You need a CPaaS whose API is strong enough to wire properly, not a template-driven SaaS.",
    bullets: [
      "Six SDKs, versioned REST API, live changelog",
      "Idempotency keys and signed webhooks",
      "Sandbox that exercises the real pipeline in CI",
    ],
  },
]

const THEM_PICKS: PersonaCard[] = [
  {
    title: "The pure-Shopify D2C brand that wants flows out-of-the-box",
    description:
      "If your entire stack is Shopify, you don't write code, and you want to click-install a platform with pre-built D2C journeys (welcome, abandoned-cart, COD-confirmation, winback) — Interakt's D2C focus is the honest pick.",
    bullets: [
      "Opinionated D2C journey templates",
      "Deep Shopify-native integration",
      "Broader D2C app marketplace",
    ],
  },
]

export default function CompareInteraktPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Compare", path: "/compare" },
          { name: "SMSLocal vs Interakt", path: "/compare/smslocal-vs-interakt" },
        ]}
      />      <SiteHeader />

      <main className="flex-1">
        <CompareHero
          competitor="Interakt"
          tagline="A D2C-first WhatsApp SaaS vs a full-stack Indian CPaaS."
          intro="Interakt is a D2C-focused WhatsApp Business Solution Provider with strong Shopify integration and pre-built journey templates. SMSLocal is a full-stack CPaaS covering SMS, OTP, WhatsApp, and AI agents under a single pay-as-you-go invoice. If you run pure Shopify and want an opinionated D2C template library, Interakt is a fair pick — this page covers where each actually wins."
          lastUpdated="April 2026"
        />

        <Section className="border-b border-foreground/5">
          <SectionHeader
            eyebrow="Feature-by-feature"
            title="Eighteen rows, sourced from public docs."
            subtitle="Tick means fully supported. Amber means partial or gated. Grey means not currently available."
          />
          <div className="mt-10 space-y-6">
            <CompareTableHonest competitor="Interakt" rows={ROWS} />
            <CompareMethodology />
          </div>
        </Section>

        <section className="bg-muted/30 border-b border-foreground/5 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <SectionHeader
              eyebrow="Who wins what"
              title="Four wins for us, two for them."
              subtitle="We consolidate channels and ship a production API. They have deeper D2C templates and Shopify plumbing. Pick based on which matters more."
              center
            />
            <div className="mt-12">
              <WinsBlock competitor="Interakt" usWins={US_WINS} themWins={THEM_WINS} />
            </div>
          </div>
        </section>

        <Section className="border-b border-foreground/5">
          <SectionHeader
            eyebrow="Who should pick what"
            title="Matching the platform to the buyer."
            subtitle="Two personas for us, one for Interakt. If you don't see yourself in these personas, talk to both teams."
            center
          />
          <div className="mt-12">
            <PersonaSplit competitor="Interakt" usPicks={US_PICKS} themPicks={THEM_PICKS} />
          </div>
        </Section>

        <section className="bg-muted/30 border-b border-foreground/5 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <OtherCompares currentSlug="smslocal-vs-interakt" />
          </div>
        </section>

        <RelatedContent path="/compare/smslocal-vs-interakt" />

        <ProductFinalCta
          title="See SMSLocal on your own storefront."
          subtitle="₹60 free credit, no card. Connect a WhatsApp number, wire an OTP into checkout, run one abandoned-cart broadcast — decide from there."
          primaryCta={{ label: "Start Free — ₹60 Credit", href: "https://app.smslocal.in/signup" }}
          secondaryCta={{ label: "See pricing", href: "/pricing/" }}
        />
      </main>

      <SiteFooter />
    </div>
  )
}
