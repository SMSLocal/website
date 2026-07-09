import type { Metadata } from "next"
import { getPageMetadata } from "@/lib/seo"
import {
  Bot,
  Building2,
  CircleDollarSign,
  MessageSquare,
  Sparkles,
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
export const metadata: Metadata = getPageMetadata("/compare/smslocal-vs-msg91")

const ROWS: CompareRow[] = [
  {
    feature: "India-native DLT onboarding",
    us: "yes",
    them: "yes",
    note: "Both platforms handle PE registration, templates, and sender ID.",
  },
  {
    feature: "Pay-as-you-go SMS pricing",
    us: "yes",
    them: "partial",
    note: "MSG91 offers prepaid, but several features unlock only on higher tiers.",
  },
  {
    feature: "Pay-as-you-go WhatsApp Business API",
    us: "yes",
    them: "partial",
    note: "MSG91 bundles WhatsApp inside broader marketing suites; we charge pass-through.",
  },
  {
    feature: "No monthly platform fee",
    us: "yes",
    them: "no",
    note: "We keep a zero-fee tier; MSG91 requires a plan for production WhatsApp.",
  },
  {
    feature: "OTP API with dedicated priority route",
    us: "yes",
    them: "yes",
    note: "Both offer dedicated OTP routing at the top tiers.",
  },
  {
    feature: "AI WhatsApp agents (multilingual)",
    us: "yes",
    them: "partial",
    note: "We ship an 8-language AI agent baked in; MSG91 offers Hello AI as an add-on.",
  },
  {
    feature: "Visual chatbot flow builder",
    us: "yes",
    them: "yes",
  },
  {
    feature: "Shared team inbox with SLAs",
    us: "yes",
    them: "yes",
  },
  {
    feature: "Idempotency keys on OTP API",
    us: "yes",
    them: "partial",
    note: "MSG91 supports request IDs; explicit idempotency headers vary by endpoint.",
  },
  {
    feature: "Six official SDKs",
    us: "yes",
    them: "yes",
    note: "Both: PHP, Java, Python, Node.js, C#, JavaScript.",
  },
  {
    feature: "Signed webhooks with retries",
    us: "yes",
    them: "yes",
  },
  {
    feature: "Sandbox mode for CI/CD",
    us: "yes",
    them: "partial",
    note: "MSG91 has a test mode; end-to-end sandbox routing is more limited.",
  },
  {
    feature: "RCS messaging",
    us: "no",
    them: "yes",
    note: "MSG91 has been shipping RCS for longer; we're on the roadmap.",
  },
  {
    feature: "Email platform (integrated)",
    us: "no",
    them: "yes",
    note: "MSG91 includes an integrated email product; we focus on SMS, WhatsApp, OTP, and AI agents.",
  },
  {
    feature: "Marketing automation / CDP",
    us: "no",
    them: "yes",
    note: "MSG91 ships a broader segmentation/CDP layer; we keep the dashboard focused.",
  },
  {
    feature: "GST invoicing & INR billing",
    us: "yes",
    them: "yes",
  },
  {
    feature: "In-India data residency",
    us: "yes",
    them: "yes",
  },
  {
    feature: "24×7 human support",
    us: "yes",
    them: "yes",
  },
]

const US_WINS = [
  {
    title: "Simpler, transparent pay-as-you-go pricing",
    description:
      "One rate card for SMS, WhatsApp pass-through, OTP, and AI agents. No plan gating on core features. You pay for what you send — nothing more.",
    icon: CircleDollarSign,
  },
  {
    title: "AI WhatsApp agents included",
    description:
      "Train an agent on your catalogue in eight Indian languages. It's part of the core product, not a separate add-on with a separate contract.",
    icon: Bot,
  },
  {
    title: "Focused, opinionated product surface",
    description:
      "We don't try to be your email, CDP, and survey tool. Fewer dashboards, clearer mental model, faster onboarding.",
    icon: Sparkles,
  },
]

const THEM_WINS = [
  {
    title: "Broader product breadth",
    description:
      "MSG91 has an integrated email platform, RCS messaging, and a marketing-automation/CDP layer. If you want one vendor for all of that, MSG91 is the stronger pick.",
    icon: Building2,
  },
  {
    title: "Longer track record on RCS",
    description:
      "MSG91 has been shipping RCS to Indian carriers for longer. If RCS is your primary channel today, they are further along than we are.",
    icon: MessageSquare,
  },
]

const US_PICKS: PersonaCard[] = [
  {
    title: "The Indian SMB running SMS + WhatsApp without a marketing team",
    description:
      "You want one dashboard, pay-as-you-go pricing, and an AI agent that handles the inbox on its own — without a ₹25,000/month platform fee to unlock the feature.",
    bullets: [
      "Zero monthly platform fee on the core tier",
      "AI WhatsApp agent baked into the product",
      "Human support that answers during your hours, not US hours",
    ],
  },
  {
    title: "The developer who wants a clean, focused API surface",
    description:
      "You need SMS, WhatsApp, and OTP with idempotency, signed webhooks, and a real sandbox — without learning a CDP and email suite you'll never use.",
    bullets: [
      "Six SDKs, versioned REST API, live changelog",
      "Explicit Idempotency-Key headers on OTP and bulk endpoints",
      "Sandbox that routes end-to-end for CI pipelines",
    ],
  },
]

const THEM_PICKS: PersonaCard[] = [
  {
    title: "The enterprise buying one vendor for messaging + email + CDP",
    description:
      "If your RFP explicitly asks for integrated email, RCS, and a marketing-automation layer behind the same dashboard, MSG91's breadth is the honest answer.",
    bullets: [
      "Integrated transactional and marketing email",
      "RCS messaging at scale",
      "Marketing automation and segmentation layer",
    ],
  },
]

export default function CompareMsg91Page() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Compare", path: "/compare" },
          { name: "SMSLocal vs MSG91", path: "/compare/smslocal-vs-msg91" },
        ]}
      />      <SiteHeader />

      <main className="flex-1">
        <CompareHero
          competitor="MSG91"
          tagline="Two Indian CPaaS platforms, compared honestly."
          intro="MSG91 is the incumbent leader in the Indian CPaaS market — a deep, mature product with integrated email, RCS, and a marketing-automation layer. SMSLocal is a focused pay-as-you-go alternative built around SMS, WhatsApp, OTP, and AI agents. Below is an honest, row-by-row look at where each wins so Indian buyers can decide on merit."
          lastUpdated="April 2026"
        />

        {/* Feature table */}
        <Section className="border-b border-foreground/5">
          <SectionHeader
            eyebrow="Feature-by-feature"
            title="Nineteen rows, no fudging."
            subtitle="Tick means fully supported. Amber means partial or gated. Grey means not currently available."
          />
          <div className="mt-10 space-y-6">
            <CompareTableHonest competitor="MSG91" rows={ROWS} />
            <CompareMethodology />
          </div>
        </Section>

        {/* Wins block */}
        <section className="bg-muted/30 border-b border-foreground/5 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <SectionHeader
              eyebrow="Who wins what"
              title="Three wins for us, two for them."
              subtitle="If you want a platform that excels at everything, honest answer: no platform does. Pick the one whose wins match your priorities."
              center
            />
            <div className="mt-12">
              <WinsBlock competitor="MSG91" usWins={US_WINS} themWins={THEM_WINS} />
            </div>
          </div>
        </section>

        {/* Personas */}
        <Section className="border-b border-foreground/5">
          <SectionHeader
            eyebrow="Who should pick what"
            title="Matching the platform to the buyer."
            subtitle="Two buyer personas for SMSLocal, one for MSG91. If you don't see yourself in these personas, talk to both teams."
            center
          />
          <div className="mt-12">
            <PersonaSplit competitor="MSG91" usPicks={US_PICKS} themPicks={THEM_PICKS} />
          </div>
        </Section>

        {/* Related compares */}
        <section className="bg-muted/30 border-b border-foreground/5 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <OtherCompares currentSlug="smslocal-vs-msg91" />
          </div>
        </section>

        <RelatedContent path="/compare/smslocal-vs-msg91" />

        <ProductFinalCta
          title="See SMSLocal on your own data."
          subtitle="₹60 free credit. No credit card. Send a real SMS and a real WhatsApp template in under 5 minutes — then decide."
          primaryCta={{ label: "Start Free — ₹60 Credit", href: "/signup/" }}
          secondaryCta={{ label: "See pricing", href: "/pricing/" }}
        />
      </main>

      <SiteFooter />
    </div>
  )
}
