import type { Metadata } from "next"
import { getPageMetadata } from "@/lib/seo"
import {
  Bot,
  Boxes,
  CircleDollarSign,
  LineChart,
  MessageCircle,
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
export const metadata: Metadata = getPageMetadata("/compare/smslocal-vs-aisensy")

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
    note: "AiSensy's Basic plan starts at ~₹999/month; advanced features unlock on higher tiers.",
  },
  {
    feature: "SMS alongside WhatsApp (single vendor)",
    us: "yes",
    them: "no",
    note: "AiSensy is WhatsApp-only — a second vendor is needed for DLT SMS.",
  },
  {
    feature: "Visual WhatsApp chatbot / flow builder",
    us: "yes",
    them: "yes",
    note: "AiSensy's flow builder has had more iterations in-market.",
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
    note: "AiSensy offers Smart AI / Agent capabilities on higher-tier plans.",
  },
  {
    feature: "8-language Indic tuning",
    us: "yes",
    them: "partial",
  },
  {
    feature: "Broadcasts with advanced segmentation",
    us: "yes",
    them: "yes",
  },
  {
    feature: "Click-through + conversion analytics per campaign",
    us: "yes",
    them: "yes",
  },
  {
    feature: "OTP API with dedicated priority route",
    us: "yes",
    them: "no",
  },
  {
    feature: "Shopify / WooCommerce / HubSpot integrations",
    us: "yes",
    them: "yes",
    note: "AiSensy's marketplace is broader for D2C-specific apps.",
  },
  {
    feature: "Per-agent seat pricing",
    us: "no",
    them: "yes",
    note: "AiSensy charges per agent on some plans; we do not.",
  },
  {
    feature: "REST API with six official SDKs",
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
  {
    feature: "24×7 human support on the core plan",
    us: "yes",
    them: "partial",
    note: "AiSensy's premium support is plan-gated.",
  },
]

const US_WINS = [
  {
    title: "No plan floor, no per-agent tax",
    description:
      "Zero monthly platform fee on the core tier and unlimited agent seats. Add or remove teammates from the inbox without a pricing conversation.",
    icon: CircleDollarSign,
  },
  {
    title: "SMS + OTP + WhatsApp in one vendor",
    description:
      "AiSensy is WhatsApp-only. With us you consolidate DLT SMS, OTP, and WhatsApp into a single dashboard, invoice, and support channel.",
    icon: Boxes,
  },
  {
    title: "AI agent on the core plan, tuned for Indic",
    description:
      "Our 8-language WhatsApp AI agent is part of the base product, not an “advanced” add-on. Train it on your catalogue and drop it into the inbox the same day.",
    icon: Bot,
  },
  {
    title: "Modern developer surface",
    description:
      "Six first-party SDKs, idempotency keys, signed webhooks, and an end-to-end sandbox. If your product engineers are wiring WhatsApp into a checkout or a backend, they'll feel the difference.",
    icon: Workflow,
  },
]

const THEM_WINS = [
  {
    title: "Deeper WhatsApp-only product focus",
    description:
      "AiSensy has been a WhatsApp-first platform for longer. If you don't care about SMS or OTP and want a team that eats, sleeps, and breathes only WhatsApp, their focus shows in small UX details.",
    icon: MessageCircle,
  },
  {
    title: "Broader campaign-analytics depth for pure marketers",
    description:
      "Their analytics dashboards for broadcast campaigns have more pre-built marketing-oriented views. A performance marketer running only WhatsApp campaigns may find the reporting more ready-made.",
    icon: LineChart,
  },
]

const US_PICKS: PersonaCard[] = [
  {
    title: "The business that needs WhatsApp and SMS together",
    description:
      "You send OTP, DLT transactional SMS, and WhatsApp broadcasts in a typical month. Running a WhatsApp-only SaaS on top of a separate SMS vendor doesn't compound; consolidating on one CPaaS does.",
    bullets: [
      "One login, one invoice for SMS + WhatsApp + OTP",
      "Dedicated OTP priority route with sub-5-second SLA",
      "DLT registration and template governance in-platform",
    ],
  },
  {
    title: "The team that wants AI deflection without a plan upgrade",
    description:
      "You want the AI agent to handle repeat questions from day one — not after you move to the highest tier. You also want it to actually speak Hindi, Tamil, and Marathi on day one.",
    bullets: [
      "AI WhatsApp agent included on the base tier",
      "8-language Indic tuning out-of-the-box",
      "Shared inbox with human hand-off as a single view",
    ],
  },
]

const THEM_PICKS: PersonaCard[] = [
  {
    title: "The WhatsApp-only performance marketer",
    description:
      "If your role is WhatsApp broadcasts, nothing else — and you want a platform whose entire roadmap is focused on that single channel — AiSensy is a focused, credible pick with a mature product surface.",
    bullets: [
      "Deep WhatsApp-only product focus",
      "Pre-built campaign analytics dashboards",
      "Broader marketplace for D2C-focused apps",
    ],
  },
]

export default function CompareAiSensyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Compare", path: "/compare" },
          { name: "SMSLocal vs AiSensy", path: "/compare/smslocal-vs-aisensy" },
        ]}
      />      <SiteHeader />

      <main className="flex-1">
        <CompareHero
          competitor="AiSensy"
          tagline="A WhatsApp-only SaaS vs a full-stack Indian CPaaS."
          intro="AiSensy is a well-known WhatsApp Business Solution Provider in India with a polished flow builder and marketing-focused campaign analytics. SMSLocal is a full-stack CPaaS covering WhatsApp, SMS, OTP, and AI agents on a single pay-as-you-go invoice. If you only care about WhatsApp and want a team laser-focused on that single channel, AiSensy is a fair pick — this page covers where each actually wins."
          lastUpdated="April 2026"
        />

        <Section className="border-b border-foreground/5">
          <SectionHeader
            eyebrow="Feature-by-feature"
            title="Eighteen rows, publicly sourced."
            subtitle="Tick means fully supported. Amber means partial or gated. Grey means not currently available."
          />
          <div className="mt-10 space-y-6">
            <CompareTableHonest competitor="AiSensy" rows={ROWS} />
            <CompareMethodology />
          </div>
        </Section>

        <section className="bg-muted/30 border-b border-foreground/5 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <SectionHeader
              eyebrow="Who wins what"
              title="Four wins for us, two for them."
              subtitle="We consolidate channels and ship AI on the core tier. They have deeper WhatsApp-only focus and broader marketing-ready analytics. Pick based on which matters more."
              center
            />
            <div className="mt-12">
              <WinsBlock competitor="AiSensy" usWins={US_WINS} themWins={THEM_WINS} />
            </div>
          </div>
        </section>

        <Section className="border-b border-foreground/5">
          <SectionHeader
            eyebrow="Who should pick what"
            title="Matching the platform to the buyer."
            subtitle="Two personas for us, one for AiSensy. If you don't see yourself in these personas, talk to both teams."
            center
          />
          <div className="mt-12">
            <PersonaSplit competitor="AiSensy" usPicks={US_PICKS} themPicks={THEM_PICKS} />
          </div>
        </Section>

        <section className="bg-muted/30 border-b border-foreground/5 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <OtherCompares currentSlug="smslocal-vs-aisensy" />
          </div>
        </section>

        <RelatedContent path="/compare/smslocal-vs-aisensy" />

        <ProductFinalCta
          title="See SMSLocal on your own WhatsApp number."
          subtitle="₹60 free credit, no card. Connect a number, send a real broadcast, try the AI agent on your own catalogue."
          primaryCta={{ label: "Start Free — ₹60 Credit", href: "/signup" }}
          secondaryCta={{ label: "See pricing", href: "/pricing" }}
        />
      </main>

      <SiteFooter />
    </div>
  )
}
