import type { Metadata } from "next"
import { getPageMetadata } from "@/lib/seo"
import {
  Building2,
  CircleDollarSign,
  Clock,
  Globe2,
  Sparkles,
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
export const metadata: Metadata = getPageMetadata("/compare/smslocal-vs-gupshup")

const ROWS: CompareRow[] = [
  {
    feature: "Official WhatsApp Business Solution Provider",
    us: "yes",
    them: "yes",
    note: "Gupshup is one of the largest global BSPs by volume.",
  },
  {
    feature: "India-native DLT SMS",
    us: "yes",
    them: "yes",
  },
  {
    feature: "Transparent pay-as-you-go pricing (self-serve)",
    us: "yes",
    them: "partial",
    note: "Gupshup's enterprise pricing is typically contracted; self-serve rates exist but core features gate on plans.",
  },
  {
    feature: "Same-day onboarding for SMBs",
    us: "yes",
    them: "partial",
    note: "Gupshup's enterprise process has longer lead times; self-serve onboarding exists but is thinner.",
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
    note: "Gupshup's AI agent and Conversation Cloud sit behind enterprise contracts.",
  },
  {
    feature: "8-language Indic tuning",
    us: "yes",
    them: "yes",
    note: "Gupshup has strong multilingual support globally.",
  },
  {
    feature: "Shared team inbox with assignments + SLAs",
    us: "yes",
    them: "yes",
  },
  {
    feature: "OTP API with dedicated priority route",
    us: "yes",
    them: "yes",
  },
  {
    feature: "RCS messaging",
    us: "no",
    them: "yes",
    note: "Gupshup has been shipping RCS longer than we have.",
  },
  {
    feature: "Voice / IVR channel",
    us: "no",
    them: "yes",
    note: "Gupshup offers voice; we focus on SMS, WhatsApp, OTP, and AI agents.",
  },
  {
    feature: "Global messaging footprint (200+ countries)",
    us: "partial",
    them: "yes",
    note: "We are India-first with partner routes abroad; Gupshup is global by design.",
  },
  {
    feature: "REST API with six official SDKs",
    us: "yes",
    them: "yes",
  },
  {
    feature: "Idempotency keys on OTP + bulk endpoints",
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
    feature: "24×7 human support on the core plan",
    us: "yes",
    them: "partial",
    note: "Gupshup's 24×7 SLA-backed support is enterprise-tier.",
  },
]

const US_WINS = [
  {
    title: "Transparent, self-serve pay-as-you-go",
    description:
      "No enterprise sales call to get a rate card. Sign up, top up, send — the same pricing for a one-person team as for a thousand-agent deployment.",
    icon: CircleDollarSign,
  },
  {
    title: "Same-day onboarding for SMBs",
    description:
      "DLT registration, WhatsApp number provisioning, and first production send in a single business day on the core tier. Enterprise CPaaS onboarding cycles are measured in weeks — ours aren't.",
    icon: Clock,
  },
  {
    title: "AI agent included, not gated behind a contract",
    description:
      "Our 8-language WhatsApp AI agent is part of the base product. With Gupshup, the equivalent Conversation Cloud / AI agent surfaces typically require an enterprise contract.",
    icon: Sparkles,
  },
  {
    title: "Modern, opinionated developer surface",
    description:
      "Idempotency headers, signed webhooks with backoff, a real sandbox, and six first-party SDKs. If you are building a production system (not a one-off campaign), you will feel the difference.",
    icon: Workflow,
  },
]

const THEM_WINS = [
  {
    title: "True global messaging footprint",
    description:
      "Gupshup runs WhatsApp and SMS across 200+ countries with carrier relationships around the world. If you are a multinational running one platform across India, SEA, MENA, and LATAM — they have honest breadth we don't match today.",
    icon: Globe2,
  },
  {
    title: "Enterprise breadth (RCS, voice, CDP-adjacent)",
    description:
      "Gupshup ships RCS at scale, voice/IVR, and broader enterprise conversational surfaces. If your RFP explicitly asks for those in a single vendor, they are a fair pick and we're honest about that.",
    icon: Building2,
  },
]

const US_PICKS: PersonaCard[] = [
  {
    title: "The India-first SMB or mid-market team",
    description:
      "You do most of your volume in India. You want same-day onboarding, transparent pricing, and an AI agent that works on day one — not a quarter-long enterprise procurement cycle.",
    bullets: [
      "Self-serve DLT and WhatsApp onboarding",
      "Published INR pricing with no contract gates",
      "AI agent, inbox, and flows on the core tier",
    ],
  },
  {
    title: "The developer who doesn't want an enterprise contract for an API",
    description:
      "You want production-grade APIs — idempotency, signed webhooks, sandbox — without a sales motion. You want to read the docs, get an API key, and ship.",
    bullets: [
      "Six SDKs, versioned REST API, live changelog",
      "Idempotency keys on OTP + bulk endpoints",
      "Sandbox that exercises the real pipeline in CI",
    ],
  },
]

const THEM_PICKS: PersonaCard[] = [
  {
    title: "The global enterprise running messaging across 10+ countries",
    description:
      "If you are a multinational brand running WhatsApp and SMS across India, SEA, MENA, LATAM, and Europe — and you want RCS, voice, and enterprise SLAs under one contract — Gupshup is honest breadth.",
    bullets: [
      "200+ country messaging footprint",
      "RCS and voice/IVR in the same vendor",
      "Enterprise SLA-backed 24×7 support",
    ],
  },
]

export default function CompareGupshupPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Compare", path: "/compare" },
          { name: "SMSLocal vs Gupshup", path: "/compare/smslocal-vs-gupshup" },
        ]}
      />      <SiteHeader />

      <main className="flex-1">
        <CompareHero
          competitor="Gupshup"
          tagline="A global enterprise CPaaS vs a focused Indian pay-as-you-go platform."
          intro="Gupshup is one of the largest global WhatsApp BSPs with messaging reach in 200+ countries, enterprise SLAs, RCS, voice, and a broad Conversation Cloud product suite. SMSLocal is an India-focused, pay-as-you-go CPaaS built around SMS, WhatsApp, OTP, and AI agents — with same-day onboarding and no enterprise-contract gating. If you run global and need breadth, Gupshup is honest — this page covers where each actually wins."
          lastUpdated="April 2026"
        />

        <Section className="border-b border-foreground/5">
          <SectionHeader
            eyebrow="Feature-by-feature"
            title="Eighteen rows, publicly sourced."
            subtitle="Tick means fully supported. Amber means partial or gated. Grey means not currently available."
          />
          <div className="mt-10 space-y-6">
            <CompareTableHonest competitor="Gupshup" rows={ROWS} />
            <CompareMethodology />
          </div>
        </Section>

        <section className="bg-muted/30 border-b border-foreground/5 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <SectionHeader
              eyebrow="Who wins what"
              title="Four wins for us, two for them."
              subtitle="We're faster and cheaper to start in India. They are broader globally. Pick based on where your customers actually are."
              center
            />
            <div className="mt-12">
              <WinsBlock competitor="Gupshup" usWins={US_WINS} themWins={THEM_WINS} />
            </div>
          </div>
        </section>

        <Section className="border-b border-foreground/5">
          <SectionHeader
            eyebrow="Who should pick what"
            title="Matching the platform to the buyer."
            subtitle="Two personas for us, one for Gupshup. If you don't see yourself in these personas, talk to both teams."
            center
          />
          <div className="mt-12">
            <PersonaSplit competitor="Gupshup" usPicks={US_PICKS} themPicks={THEM_PICKS} />
          </div>
        </Section>

        <section className="bg-muted/30 border-b border-foreground/5 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <OtherCompares currentSlug="smslocal-vs-gupshup" />
          </div>
        </section>

        <RelatedContent path="/compare/smslocal-vs-gupshup" />

        <ProductFinalCta
          title="See SMSLocal without a procurement cycle."
          subtitle="₹60 free credit, no card, no enterprise call. Send a real SMS and a real WhatsApp template in 5 minutes — then decide."
          primaryCta={{ label: "Start Free — ₹60 Credit", href: "https://app.smslocal.in/signup" }}
          secondaryCta={{ label: "See pricing", href: "/pricing/" }}
        />
      </main>

      <SiteFooter />
    </div>
  )
}
