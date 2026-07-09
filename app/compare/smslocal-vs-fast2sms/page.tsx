import type { Metadata } from "next"
import { getPageMetadata } from "@/lib/seo"
import {
  Boxes,
  Code2,
  Gauge,
  Layers,
  ShieldCheck,
  Wallet,
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
export const metadata: Metadata = getPageMetadata("/compare/smslocal-vs-fast2sms")

const ROWS: CompareRow[] = [
  {
    feature: "DLT-compliant SMS to Indian carriers",
    us: "yes",
    them: "yes",
    note: "Both platforms handle PE registration, templates, and sender ID.",
  },
  {
    feature: "Promotional (P1) + Transactional + OTP routes",
    us: "yes",
    them: "yes",
  },
  {
    feature: "Dedicated OTP priority route with SLA",
    us: "yes",
    them: "partial",
    note: "Fast2SMS offers OTP routing but exposes fewer route-selection controls to customers.",
  },
  {
    feature: "WhatsApp Business API (official BSP)",
    us: "yes",
    them: "partial",
    note: "Fast2SMS has added WhatsApp; BSP depth and template workflows still trail dedicated providers.",
  },
  {
    feature: "Visual WhatsApp chatbot builder",
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
    feature: "Transparent delivery-rate reporting per route",
    us: "yes",
    them: "partial",
    note: "Fast2SMS shows aggregate DLRs; per-route and per-carrier breakdowns are thinner.",
  },
  {
    feature: "Signed webhooks for inbound SMS / DLRs",
    us: "yes",
    them: "yes",
  },
  {
    feature: "Idempotency keys on bulk + OTP endpoints",
    us: "yes",
    them: "partial",
    note: "Fast2SMS supports request IDs; first-class idempotency headers are not documented.",
  },
  {
    feature: "Six official SDKs (PHP, Java, Python, Node, C#, JS)",
    us: "yes",
    them: "partial",
    note: "Fast2SMS documents community libraries; first-party SDK coverage is thinner.",
  },
  {
    feature: "Sandbox mode that routes end-to-end",
    us: "yes",
    them: "no",
  },
  {
    feature: "Drop-down wallet recharge (no commitment)",
    us: "yes",
    them: "yes",
    note: "Both offer prepaid wallets with no minimum commit.",
  },
  {
    feature: "Per-campaign DND scrub visible on send",
    us: "yes",
    them: "partial",
  },
  {
    feature: "Branded short links with click analytics",
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
    feature: "Low price-per-SMS headline rate",
    us: "partial",
    them: "yes",
    note: "Fast2SMS has historically published the most aggressive public SMS rate in India; we are competitive on volume but not the cheapest at list.",
  },
]

const US_WINS = [
  {
    title: "Modern, production-grade API",
    description:
      "Idempotency keys, signed webhooks with retries, a real sandbox that routes end-to-end, and six first-party SDKs. If your stack has a CI pipeline, you'll feel the difference on day one.",
    icon: Code2,
  },
  {
    title: "WhatsApp depth, not just a checkbox",
    description:
      "Official BSP status, a visual flow builder, a shared team inbox, and an 8-language AI agent. Fast2SMS added WhatsApp, but the operator experience is closer to a second-channel add-on than a core product.",
    icon: Layers,
  },
  {
    title: "Per-campaign DND and route transparency",
    description:
      "See exactly how many messages were filtered by DND, which route was used per carrier, and what the delivery rate looked like on that specific campaign — not just a monthly aggregate.",
    icon: Gauge,
  },
  {
    title: "One vendor for SMS + WhatsApp + OTP + AI",
    description:
      "Consolidate the stack. One dashboard, one invoice, one support channel — instead of duct-taping together a cheap SMS tool with a separate WhatsApp SaaS.",
    icon: Boxes,
  },
]

const THEM_WINS = [
  {
    title: "Aggressive headline SMS price",
    description:
      "Fast2SMS has historically published some of the lowest list prices for Indian SMS. If your only requirement is the cheapest possible rate on a single SMS route and you don't need WhatsApp or a modern API, they're hard to beat on list price.",
    icon: Wallet,
  },
  {
    title: "Simple, no-frills SMB experience",
    description:
      "If you just need a quick-send web form, a CSV upload, and an invoice — and you're never going to write code — Fast2SMS's dashboard is simpler and more familiar to a non-technical team.",
    icon: ShieldCheck,
  },
]

const US_PICKS: PersonaCard[] = [
  {
    title: "The growing business that needs SMS and WhatsApp to scale together",
    description:
      "You're past the “send a daily blast” phase. You're building OTP flows, transactional notifications, and two-way WhatsApp support — and you need a platform that actually ships a modern API and WhatsApp inbox, not just a cheap SMS rate.",
    bullets: [
      "Production-grade API with idempotency and signed webhooks",
      "Official WhatsApp BSP with flows, inbox, and AI agents",
      "Per-route, per-carrier DLR transparency on every send",
    ],
  },
  {
    title: "The developer who can't afford silent failures",
    description:
      "You're wiring SMS into a checkout or OTP flow where a lost message is a lost order or a locked-out user. You need deterministic retries, deliverable receipts, and a sandbox that routes end-to-end in CI.",
    bullets: [
      "Idempotency keys on bulk and OTP endpoints",
      "Signed webhooks with retry and backoff",
      "Sandbox mode that exercises the real pipeline",
    ],
  },
]

const THEM_PICKS: PersonaCard[] = [
  {
    title: "The price-sensitive SMB sending one simple SMS campaign",
    description:
      "If your entire use case is a single SMS promotional blast per week, you don't use WhatsApp, you don't need a developer-grade API, and the headline per-SMS price is the only thing that matters — Fast2SMS is an honest pick.",
    bullets: [
      "Aggressive public list price on SMS",
      "Simple web-form send UX",
      "No-commitment prepaid wallet",
    ],
  },
]

export default function CompareFast2smsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Compare", path: "/compare" },
          { name: "SMSLocal vs Fast2SMS", path: "/compare/smslocal-vs-fast2sms" },
        ]}
      />      <SiteHeader />

      <main className="flex-1">
        <CompareHero
          competitor="Fast2SMS"
          tagline="Cheapest-rate SMS vs full-stack Indian CPaaS."
          intro="Fast2SMS is one of the most-searched low-cost SMS platforms in India, known for aggressive list pricing and a simple SMB-focused dashboard. SMSLocal is a full-stack CPaaS that ships SMS, WhatsApp, OTP, and AI agents behind a modern developer API. If you want the cheapest rate on a single SMS route, Fast2SMS is a fair pick — if you need WhatsApp depth, a production API, and route transparency, we cover more ground."
          lastUpdated="April 2026"
        />

        <Section className="border-b border-foreground/5">
          <SectionHeader
            eyebrow="Feature-by-feature"
            title="Eighteen rows, no straw-man."
            subtitle="Tick means fully supported. Amber means partial or gated. Grey means not currently available."
          />
          <div className="mt-10 space-y-6">
            <CompareTableHonest competitor="Fast2SMS" rows={ROWS} />
            <CompareMethodology />
          </div>
        </Section>

        <section className="bg-muted/30 border-b border-foreground/5 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <SectionHeader
              eyebrow="Who wins what"
              title="Four wins for us, two for them."
              subtitle="We're a full-stack CPaaS with modern APIs and real WhatsApp depth. They're cheaper per SMS on the simplest route. Pick based on which matters more."
              center
            />
            <div className="mt-12">
              <WinsBlock competitor="Fast2SMS" usWins={US_WINS} themWins={THEM_WINS} />
            </div>
          </div>
        </section>

        <Section className="border-b border-foreground/5">
          <SectionHeader
            eyebrow="Who should pick what"
            title="Matching the platform to the buyer."
            subtitle="Two personas for us, one for Fast2SMS. If you don't see yourself in these personas, talk to both teams."
            center
          />
          <div className="mt-12">
            <PersonaSplit competitor="Fast2SMS" usPicks={US_PICKS} themPicks={THEM_PICKS} />
          </div>
        </Section>

        <section className="bg-muted/30 border-b border-foreground/5 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <OtherCompares currentSlug="smslocal-vs-fast2sms" />
          </div>
        </section>

        <RelatedContent path="/compare/smslocal-vs-fast2sms" />

        <ProductFinalCta
          title="See SMSLocal on your own routes."
          subtitle="₹60 free credit, no card. Send a real DLT SMS and a real WhatsApp template, compare per-route DLRs, decide."
          primaryCta={{ label: "Start Free — ₹60 Credit", href: "/signup/" }}
          secondaryCta={{ label: "See pricing", href: "/pricing/" }}
        />
      </main>

      <SiteFooter />
    </div>
  )
}
