import type { Metadata } from "next"
import { getPageMetadata } from "@/lib/seo"
import {
  Bot,
  Boxes,
  Code2,
  History,
  Layers,
  ShieldCheck,
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
export const metadata: Metadata = getPageMetadata("/compare/smslocal-vs-textlocal")

const ROWS: CompareRow[] = [
  {
    feature: "India DLT-compliant SMS",
    us: "yes",
    them: "yes",
  },
  {
    feature: "Promotional + Transactional + OTP routes",
    us: "yes",
    them: "yes",
  },
  {
    feature: "Dedicated OTP priority route with SLA",
    us: "yes",
    them: "partial",
  },
  {
    feature: "WhatsApp Business API (official BSP)",
    us: "yes",
    them: "partial",
    note: "Textlocal is historically SMS-first; WhatsApp depth trails dedicated BSPs.",
  },
  {
    feature: "Visual WhatsApp chatbot / flow builder",
    us: "yes",
    them: "no",
  },
  {
    feature: "AI WhatsApp agents (multilingual)",
    us: "yes",
    them: "no",
  },
  {
    feature: "Shared team inbox with assignments",
    us: "yes",
    them: "no",
  },
  {
    feature: "Modern REST API with six first-party SDKs",
    us: "yes",
    them: "partial",
    note: "Textlocal's HTTP API is well-known; SDK and DX depth trail newer platforms.",
  },
  {
    feature: "Idempotency keys on OTP + bulk endpoints",
    us: "yes",
    them: "partial",
  },
  {
    feature: "Signed webhooks with retries and backoff",
    us: "yes",
    them: "partial",
  },
  {
    feature: "Sandbox mode that routes end-to-end",
    us: "yes",
    them: "no",
  },
  {
    feature: "Per-campaign DND scrub visible on send",
    us: "yes",
    them: "yes",
  },
  {
    feature: "Transparent delivery-rate reporting per route",
    us: "yes",
    them: "yes",
  },
  {
    feature: "Bulk CSV upload with scheduling",
    us: "yes",
    them: "yes",
  },
  {
    feature: "Long-standing Indian SMS brand recognition",
    us: "partial",
    them: "yes",
    note: "Textlocal has been operating in India for much longer; brand familiarity is higher.",
  },
  {
    feature: "Pay-as-you-go pricing with no monthly fee",
    us: "yes",
    them: "yes",
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
  },
]

const US_WINS = [
  {
    title: "Modern, production-grade API",
    description:
      "Idempotency keys, signed webhooks with retries, a real sandbox, and six first-party SDKs. If you are wiring SMS into a checkout or a CI pipeline, you will feel the difference on day one.",
    icon: Code2,
  },
  {
    title: "WhatsApp, AI agents, inbox — not just SMS",
    description:
      "Textlocal is SMS-first. We ship an official WhatsApp BSP, a visual flow builder, a shared team inbox, and an 8-language AI agent — all on the core plan. One vendor instead of two.",
    icon: Layers,
  },
  {
    title: "One vendor for SMS + WhatsApp + OTP + AI",
    description:
      "Consolidate the stack. One dashboard, one invoice, one support channel — instead of running SMS on one platform and bolting WhatsApp on via a second SaaS.",
    icon: Boxes,
  },
  {
    title: "AI agent on the core plan",
    description:
      "Our 8-language WhatsApp AI agent is part of the base product. Train it on your catalogue and drop it into the inbox the same day — no procurement cycle.",
    icon: Bot,
  },
]

const THEM_WINS = [
  {
    title: "Long-standing brand familiarity in India",
    description:
      "Textlocal has been a well-known Indian SMS brand for many years. If your buying committee wants a name they have used since 2010, that familiarity is real and we're honest about it.",
    icon: History,
  },
  {
    title: "Well-established, stable SMS-only workflow",
    description:
      "If your entire requirement is bulk SMS with CSV upload, scheduled sends, and DLR reports — no WhatsApp, no API integration — Textlocal's SMS-only workflow has been stable for a long time.",
    icon: ShieldCheck,
  },
]

const US_PICKS: PersonaCard[] = [
  {
    title: "The team that needs SMS and WhatsApp to scale together",
    description:
      "You are past pure SMS. You want WhatsApp broadcasts, an AI agent handling repeat questions, and a shared inbox — all on the same invoice as your DLT SMS. One vendor, one dashboard.",
    bullets: [
      "One login for SMS + WhatsApp + OTP + AI agents",
      "Official BSP with flows, inbox, and multi-language AI",
      "DLT registration and templates managed in-platform",
    ],
  },
  {
    title: "The developer who expects a modern API and a real sandbox",
    description:
      "You need idempotency, signed webhooks, an end-to-end sandbox for CI, and first-party SDKs. A legacy HTTP API that requires one-off wrappers doesn't fit a 2026 stack.",
    bullets: [
      "Six SDKs, versioned REST API, live changelog",
      "Idempotency keys on OTP + bulk endpoints",
      "Sandbox mode that exercises the real pipeline",
    ],
  },
]

const THEM_PICKS: PersonaCard[] = [
  {
    title: "The long-standing SMS-only buyer who already knows the product",
    description:
      "If your team has used Textlocal for a decade, your entire use case is bulk SMS with CSV upload and DLR reports, you don't need WhatsApp or an API — sticking with Textlocal is an honest answer.",
    bullets: [
      "Strong brand familiarity in India",
      "Stable SMS-only web workflow",
      "No switching cost for pure SMS campaigns",
    ],
  },
]

export default function CompareTextlocalPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Compare", path: "/compare" },
          { name: "SMSLocal vs Textlocal", path: "/compare/smslocal-vs-textlocal" },
        ]}
      />
      <AnnouncementStrip />
      <SiteHeader />

      <main className="flex-1">
        <CompareHero
          competitor="Textlocal"
          tagline="A long-standing Indian SMS platform vs a modern full-stack CPaaS."
          intro="Textlocal is one of the oldest Indian SMS platforms with strong brand familiarity and a well-established SMS-only workflow. SMSLocal is a modern CPaaS covering SMS, WhatsApp, OTP, and AI agents on a unified pay-as-you-go invoice, with a production-grade developer surface. If your entire use case is bulk SMS you already understand, Textlocal is an honest pick — this page covers where each actually wins."
          lastUpdated="April 2026"
        />

        <Section className="border-b border-foreground/5">
          <SectionHeader
            eyebrow="Feature-by-feature"
            title="Eighteen rows, sourced from public docs."
            subtitle="Tick means fully supported. Amber means partial or gated. Grey means not currently available."
          />
          <div className="mt-10 space-y-6">
            <CompareTableHonest competitor="Textlocal" rows={ROWS} />
            <CompareMethodology />
          </div>
        </Section>

        <section className="bg-muted/30 border-b border-foreground/5 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <SectionHeader
              eyebrow="Who wins what"
              title="Four wins for us, two for them."
              subtitle="We are a modern, full-stack CPaaS with a production API. They have long-standing SMS-only brand familiarity. Pick based on which matters more."
              center
            />
            <div className="mt-12">
              <WinsBlock competitor="Textlocal" usWins={US_WINS} themWins={THEM_WINS} />
            </div>
          </div>
        </section>

        <Section className="border-b border-foreground/5">
          <SectionHeader
            eyebrow="Who should pick what"
            title="Matching the platform to the buyer."
            subtitle="Two personas for us, one for Textlocal. If you don't see yourself in these personas, talk to both teams."
            center
          />
          <div className="mt-12">
            <PersonaSplit competitor="Textlocal" usPicks={US_PICKS} themPicks={THEM_PICKS} />
          </div>
        </Section>

        <section className="bg-muted/30 border-b border-foreground/5 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <OtherCompares currentSlug="smslocal-vs-textlocal" />
          </div>
        </section>

        <RelatedContent path="/compare/smslocal-vs-textlocal" />

        <ProductFinalCta
          title="See SMSLocal on your own SMS + WhatsApp."
          subtitle="₹60 free credit, no card. Migrate one campaign, compare DLRs, run an AI agent on your inbox — decide from there."
          primaryCta={{ label: "Start Free — ₹60 Credit", href: "/signup" }}
          secondaryCta={{ label: "See pricing", href: "/pricing" }}
        />
      </main>

      <SiteFooter />
    </div>
  )
}
