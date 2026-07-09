import type { Metadata } from "next"
import Link from "next/link"
import { getPageMetadata } from "@/lib/seo"
import {
  ArrowRight,
  Building2,
  CircleDollarSign,
  Clock,
  Flag,
  Globe2,
  Rocket,
  Sparkles,
} from "lucide-react"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { ProductFinalCta, Section, SectionHeader } from "@/components/product/product-page"
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/json-ld"
import { FaqSection } from "@/components/landing/faq-section"
import {
  CompareHero,
  CompareMethodology,
  CompareTableHonest,
  PersonaSplit,
  WinsBlock,
  type CompareRow,
  type PersonaCard,
} from "@/components/compare/compare-page"

// ─── SEO — edit lib/seo/registry.ts or open /dev/seo to preview ──────────────
export const metadata: Metadata = getPageMetadata("/compare/infobip")

const ROWS: CompareRow[] = [
  {
    feature: "Agentic AI agents",
    us: "yes",
    them: "yes",
  },
  {
    feature: "DID numbers provisioned in-platform",
    us: "yes",
    them: "yes",
  },
  {
    feature: "Onboarding model: self-serve vs. enterprise sales process",
    us: "yes",
    them: "partial",
    note: "Infobip has a self-serve entry point, but larger or India-specific deployments commonly move through an account-managed enterprise sales process.",
  },
  {
    feature: "Right-sized for SMB to mid-market (not just global enterprise)",
    us: "yes",
    them: "partial",
    note: "Infobip is built and priced primarily for global enterprise volume; SMB and mid-market buyers can end up paying for scale and process they don't need.",
  },
  {
    feature: "India DLT-compliant SMS, native workflow",
    us: "yes",
    them: "partial",
    note: "Infobip supports DLT registration for Indian sends; the flow is generally handled as one part of a much larger global platform.",
  },
  {
    feature: "INR-denominated billing with GST invoices",
    us: "yes",
    them: "partial",
    note: "Infobip's pricing and billing are structured around a global platform-fee-plus-usage model; INR-native billing with GST-specific invoicing is not clearly the default self-serve path.",
  },
  {
    feature: "IST-hour human support on the core plan",
    us: "yes",
    them: "partial",
    note: "Infobip offers 24×7 global support; dedicated IST-hour account handling is typically tied to enterprise contract tiers.",
  },
  {
    feature: "Self-serve onboarding without an enterprise sales motion",
    us: "yes",
    them: "partial",
    note: "Infobip has a self-serve entry point, but larger or India-specific deployments commonly move through an account-managed sales process.",
  },
  {
    feature: "Same-day WhatsApp + DLT onboarding",
    us: "yes",
    them: "partial",
  },
  {
    feature: "AI WhatsApp agent (multilingual) included on the core plan",
    us: "yes",
    them: "partial",
    note: "Infobip has AI/conversational-cloud capabilities, but an Indic-tuned agent bundled by default into an entry plan is not clearly published.",
  },
  {
    feature: "WhatsApp Business API (official BSP)",
    us: "yes",
    them: "yes",
  },
  {
    feature: "Global 190+ country messaging footprint",
    us: "partial",
    them: "yes",
    note: "Infobip's global reach, built on owned infrastructure across 190+ countries, is one of its strongest differentiators.",
  },
  {
    feature: "Voice, video, push, and omnichannel CPaaS breadth",
    us: "no",
    them: "yes",
    note: "Infobip runs a full omnichannel suite — voice, video, push notifications, RCS — in one platform. We focus on SMS, WhatsApp, OTP, and AI agents.",
  },
  {
    feature: "RCS messaging support",
    us: "partial",
    them: "yes",
  },
  {
    feature: "Enterprise omnichannel contact-center tooling",
    us: "no",
    them: "yes",
    note: "Infobip's Conversations/Answers products offer a full contact-center layer for large multinational deployments.",
  },
  {
    feature: "Transparent pay-as-you-go pricing without an enterprise sale",
    us: "yes",
    them: "partial",
    note: "Infobip's usage-based pricing varies by country and operator route, and typically layers a platform fee on top; larger volumes and India-specific routes are commonly custom-negotiated.",
  },
  {
    feature: "Shared team inbox",
    us: "yes",
    them: "partial",
    note: "Infobip offers this within its broader Conversations product, which is more than a lightweight shared inbox.",
  },
  {
    feature: "Signed webhooks and modern developer SDKs",
    us: "yes",
    them: "yes",
  },
]

const US_WINS = [
  {
    title: "Right-sized for SMB to mid-market",
    description:
      "You get omnichannel reach and agentic AI without the enterprise-scale onboarding or process built for global multinationals — sized for teams that don't have that volume yet.",
    icon: Rocket,
  },
  {
    title: "Fast, self-serve setup",
    description:
      "Live in days, not weeks or months of enterprise onboarding. Sign up and go, with no mandatory sales-quote cycle before you can send your first message.",
    icon: Clock,
  },
  {
    title: "India-native by design",
    description:
      "DLT workflows, INR pricing, GST invoices, IST-hour support — built into the core product, not one region among 190+ handled by a global platform.",
    icon: Flag,
  },
  {
    title: "AI WhatsApp agent included on the core plan",
    description:
      "Our 8-language Indic-tuned AI agent ships as part of the base product. If you want a WhatsApp agent trained on Indian languages without assembling it from a broader conversational-cloud suite, we ship that on day one.",
    icon: Sparkles,
  },
]

const THEM_WINS = [
  {
    title: "True global footprint across 190+ countries",
    description:
      "Infobip runs owned infrastructure and local connectivity across 190+ countries. If you're a multinational needing consistent delivery across US, EU, APAC, LatAm, and India under one vendor, Infobip's reach is honest and hard to match.",
    icon: Globe2,
  },
  {
    title: "Deep enterprise omnichannel CPaaS breadth",
    description:
      "Voice, video, push notifications, RCS, and a full contact-center layer in one platform. If your RFP needs all of that under a single global contract, Infobip is the honest pick.",
    icon: Building2,
  },
]

const US_PICKS: PersonaCard[] = [
  {
    title: "The Indian buyer who wants INR pricing and IST support",
    description:
      "Most of your volume is in India. You want published INR pricing with GST invoices, a human in the support channel during IST hours, and a DLT flow that feels native instead of one region among many.",
    bullets: [
      "Published INR rate card, GST invoices out-of-the-box",
      "Same-day DLT + WhatsApp onboarding",
      "IST-hour human support on the core tier",
    ],
  },
  {
    title: "The team that needs WhatsApp + AI agents, not a global omnichannel suite",
    description:
      "You want WhatsApp, an AI agent, and a shared inbox — not voice, video, push, and a contact-center platform sized for multinational operations. Infobip can do it; it's just more platform than you need.",
    bullets: [
      "WhatsApp flows, inbox, and AI agent on the core tier",
      "No enterprise onboarding cycle for a simple setup",
      "One dashboard for SMS + WhatsApp + OTP",
    ],
  },
]

const THEM_PICKS: PersonaCard[] = [
  {
    title: "The global enterprise buying messaging, voice, video, and CX together",
    description:
      "If you are a multinational running WhatsApp, SMS, voice, video, RCS, and a contact-center across 190+ countries — under one contract — Infobip's global product breadth is the honest answer.",
    bullets: [
      "190+ country messaging and voice footprint",
      "Full omnichannel CPaaS suite in one vendor",
      "Enterprise SLAs for multinational deployments",
    ],
  },
]

const INFOBIP_FAQS = [
  {
    q: "Is SMSLocal enterprise-ready?",
    a: "Yes — SMSLocal supports SSO, audit logs, and access controls, without requiring the enterprise onboarding process that comes with Infobip's global-scale deployments.",
  },
  {
    q: "How fast is setup compared to Infobip?",
    a: "Fast — typically days. Infobip's self-serve entry point exists, but larger or India-specific deployments commonly move through a slower, account-managed enterprise onboarding process.",
  },
  {
    q: "Is signup self-serve?",
    a: "Yes. Sign up and go, with no mandatory sales-quote cycle required to get started.",
  },
]

export default function CompareInfobipPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Compare", path: "/compare" },
          { name: "SMSLocal vs Infobip", path: "/compare/infobip" },
        ]}
      />
      <SiteHeader />

      <main className="flex-1">
        {/* ── HERO ──────────────────────────────────────────────── */}
        <CompareHero
          competitor="Infobip"
          tagline="The same omnichannel reach and AI for the businesses Infobip prices out of reach, with much faster setup."
          intro="Infobip is a large global CPaaS headquartered in Croatia and the UK, running messaging, voice, video, and omnichannel CX across 190+ countries — built for enterprise-scale volume and process. SMSLocal delivers the same omnichannel channels and agentic AI, right-sized for SMB to mid-market teams, with INR pricing, GST invoices, DLT-native workflows, IST-hour support, and fast, self-serve setup. If you're a multinational buying voice, video, and omnichannel CX together under one enterprise contract, Infobip is an honest pick — this page covers where each actually wins for an Indian buyer."
          lastUpdated="July 2026"
        />

        {/* ── COMPARISON TABLE ──────────────────────────────────── */}
        <Section className="border-b border-foreground/5">
          <SectionHeader
            eyebrow="At a glance"
            title="Enterprise capability, without the enterprise process."
            subtitle="Tick means fully supported. Amber means partial or gated. Grey means not currently available."
          />
          <div className="mt-10 space-y-6">
            <CompareTableHonest competitor="Infobip" rows={ROWS} />
            <CompareMethodology />
          </div>
        </Section>

        {/* ── WINS BLOCK ────────────────────────────────────────── */}
        <section className="bg-muted/30 border-b border-foreground/5 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <SectionHeader
              eyebrow="Who wins what"
              title="Four wins for us, two for them."
              subtitle="We are right-sized, India-native, and faster to onboard, self-serve. They have a true global footprint and enterprise CPaaS breadth. Pick based on where your buyers actually are, and how much process you want to go through."
              center
            />
            <div className="mt-12">
              <WinsBlock competitor="Infobip" usWins={US_WINS} themWins={THEM_WINS} />
            </div>
          </div>
        </section>

        {/* ── PERSONA SPLIT ─────────────────────────────────────── */}
        <Section className="border-b border-foreground/5">
          <SectionHeader
            eyebrow="Who should pick what"
            title="Matching the platform to the buyer."
            subtitle="Two personas for us, one for Infobip. If you don't see yourself in these personas, talk to both teams."
            center
          />
          <div className="mt-12">
            <PersonaSplit competitor="Infobip" usPicks={US_PICKS} themPicks={THEM_PICKS} />
          </div>
        </Section>

        {/* ── INTERNAL LINKS ────────────────────────────────────── */}
        <Section tone="muted">
          <div className="mx-auto max-w-3xl">
            <SectionHeader eyebrow="Explore more" title="Compare more" />
            <ul className="mt-6 space-y-3">
              {[
                { href: "/products/ai-agentic/", label: "Agentic AI — automate support and sales" },
                { href: "/compare/", label: "See all SMSLocal comparisons" },
                { href: "/platform/security/", label: "Platform security — SSO, audit logs, access controls" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-2 text-[14px] font-medium text-primary hover:underline"
                  >
                    {link.label} <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Section>

        {/* ── FAQ ───────────────────────────────────────────────── */}
        <FaqJsonLd items={INFOBIP_FAQS} path="/compare/infobip" />
        <FaqSection items={INFOBIP_FAQS} />

        {/* ── FINAL CTA ─────────────────────────────────────────── */}
        <ProductFinalCta
          title="Get omnichannel agentic AI without the enterprise overhead."
          subtitle="Self-serve signup, no mandatory sales-quote cycle. Send a real DLT SMS and a real WhatsApp template in 5 minutes — then decide."
          primaryCta={{ label: "Start Free", href: "/signup/" }}
          secondaryCta={{ label: "Talk to us", href: "/company/contact/" }}
        />
      </main>

      <SiteFooter />
    </div>
  )
}
