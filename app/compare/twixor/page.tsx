import type { Metadata } from "next"
import Link from "next/link"
import { getPageMetadata } from "@/lib/seo"
import {
  ArrowRight,
  Building2,
  CircleDollarSign,
  Clock,
  Layers,
  Rocket,
  ShieldCheck,
  Workflow,
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
export const metadata: Metadata = getPageMetadata("/compare/twixor")

const ROWS: CompareRow[] = [
  {
    feature: "Agentic AI agents built for your own brand's CX",
    us: "yes",
    them: "partial",
    note: "Twixor offers conversational AI, but it's positioned for resellers building CX on behalf of their own clients, not a brand running its own customer experience.",
  },
  {
    feature: "Omnichannel reach (SMS, WhatsApp, RCS, voice)",
    us: "yes",
    them: "yes",
  },
  {
    feature: "DID numbers provisioned in-platform",
    us: "yes",
    them: "partial",
    note: "Publicly available information points to Twixor numbers being provisioned via telecom and aggregator partners rather than natively in-product; worth confirming directly with their sales team.",
  },
  {
    feature: "Built for the brand running its own CX (not a reseller platform)",
    us: "yes",
    them: "no",
    note: "Twixor is positioned as a white-label CPaaS for telcos, aggregators, and resellers — multi-tenant billing and partner tooling included — rather than a single-brand CX product.",
  },
  {
    feature: "Onboarding model: self-serve vs. custom sales process",
    us: "yes",
    them: "partial",
    note: "Twixor markets itself as an enterprise CX-automation platform; publicly available information points to demo-and-quote onboarding rather than self-serve signup.",
  },
  {
    feature: "Self-serve signup, no sales call required",
    us: "yes",
    them: "partial",
    note: "Twixor markets itself as an enterprise CX-automation platform; publicly available information points to demo-and-quote onboarding rather than self-serve signup.",
  },
  {
    feature: "Same-day WhatsApp + DLT onboarding",
    us: "yes",
    them: "partial",
    note: "Complex conversational-commerce workflow setups tend to take longer to configure than a single-channel WhatsApp number.",
  },
  {
    feature: "One platform for SMS + WhatsApp + RCS + voice + AI agents",
    us: "yes",
    them: "partial",
    note: "Twixor covers a wide channel mix including WhatsApp, SMS, RCS, and social apps; a dedicated, Indic-tuned AI agent comparable to ours is less clearly documented.",
  },
  {
    feature: "WhatsApp Business API (official BSP)",
    us: "yes",
    them: "yes",
  },
  {
    feature: "RCS messaging support",
    us: "partial",
    them: "yes",
    note: "RCS is one of Twixor's core positioning channels alongside WhatsApp.",
  },
  {
    feature: "Low-code visual workflow / journey builder",
    us: "partial",
    them: "yes",
    note: "Twixor is built around a low-code conversational-journey builder for complex, multi-step commerce flows — deeper than our simpler flow tooling.",
  },
  {
    feature: "Enterprise workflow-system integrations (ERP/CRM)",
    us: "partial",
    them: "yes",
    note: "Twixor markets itself heavily on enterprise workflow integration; we support common integrations but don't lead with this depth.",
  },
  {
    feature: "AI WhatsApp agent (multilingual) on the core plan",
    us: "yes",
    them: "partial",
    note: "Twixor offers conversational AI features, but an Indic-tuned agent bundled into a default core plan isn't clearly published.",
  },
  {
    feature: "India DLT-compliant SMS, native workflow",
    us: "yes",
    them: "partial",
  },
  {
    feature: "Shared team inbox for human handoff",
    us: "yes",
    them: "partial",
  },
  {
    feature: "Fast onboarding for a single-channel SMB use case",
    us: "yes",
    them: "partial",
    note: "Twixor's workflow-builder strength is best suited to teams with dedicated implementation resources rather than a five-minute self-serve start.",
  },
]

const US_WINS = [
  {
    title: "Built for the brand, not the reseller",
    description:
      "SMSLocal is built for the brand running its own customer experience — not for reselling CX to downstream clients. You get agentic AI and omnichannel reach without the multi-tenant, white-label machinery you'll never touch.",
    icon: ShieldCheck,
  },
  {
    title: "No reseller overhead to pay for or configure",
    description:
      "You skip the white-label billing layers, partner tooling, and multi-tenant admin that a reseller platform needs — and that a single-brand team simply doesn't.",
    icon: Layers,
  },
  {
    title: "DID numbers provisioned in-platform",
    description:
      "Numbers are provisioned directly in the product, not sourced through a chain of telecom and aggregator partners.",
    icon: CircleDollarSign,
  },
  {
    title: "Faster, self-serve setup",
    description:
      "Sign up, verify, and send your first SMS or WhatsApp message within days — no workflow-builder learning curve or custom onboarding project required before you can test the basics.",
    icon: Rocket,
  },
]

const THEM_WINS = [
  {
    title: "Purpose-built white-label CPaaS for resellers",
    description:
      "Twixor is a capable white-label CPaaS for telcos, aggregators, and resellers, with multi-tenant billing and partner tools built in — a strong pick if reselling CX to your own downstream clients is the business model.",
    icon: Building2,
  },
  {
    title: "Deeper low-code visual workflow tooling",
    description:
      "Twixor's journey builder is purpose-built for complex, multi-step conversational commerce flows — cart recovery, order-status journeys, approval chains — with more visual workflow depth than our simpler flow builder.",
    icon: Workflow,
  },
  {
    title: "Strong enterprise workflow-system integration story",
    description:
      "If your conversational flows need to reach deep into ERP, CRM, or custom enterprise workflow systems, Twixor's positioning and tooling are built around exactly that integration depth.",
    icon: Layers,
  },
]

const US_PICKS: PersonaCard[] = [
  {
    title: "The brand running its own customer experience",
    description:
      "You want agentic AI and omnichannel reach for your own CX, not a white-label platform built for reselling to downstream clients. You want SMS, WhatsApp, and an AI agent live quickly, rather than investing weeks in a reseller-oriented workflow build first.",
    bullets: [
      "Built for the brand, not for reselling CX",
      "DID numbers provisioned in-platform",
      "One dashboard for SMS + WhatsApp + RCS + voice + AI",
    ],
  },
  {
    title: "The SMB or mid-market team without a dedicated implementation resource",
    description:
      "You don't have a team to own a low-code workflow builder or multi-tenant reseller tooling full-time. You want sensible defaults and a working integration fast, self-serve.",
    bullets: [
      "No workflow-builder learning curve to get started",
      "Self-serve signup, no sales cycle",
      "IST-hour human support on the core plan",
    ],
  },
]

const THEM_PICKS: PersonaCard[] = [
  {
    title: "The enterprise building complex conversational commerce journeys",
    description:
      "If you need a low-code visual builder to design multi-step conversational commerce flows deeply integrated with your ERP or CRM, and you have the resources to own that build, Twixor's workflow-automation depth is the honest pick.",
    bullets: [
      "Purpose-built low-code journey builder",
      "Deep enterprise workflow-system integrations",
      "Strong RCS + WhatsApp conversational-commerce focus",
    ],
  },
]

const TWIXOR_FAQS = [
  {
    q: "Is SMSLocal white-label?",
    a: "SMSLocal is built for your brand's own customer experience, not for reselling CX to downstream clients. Multi-tenant, white-label reseller billing is on our roadmap, but it isn't the product today.",
  },
  {
    q: "Does SMSLocal provision phone numbers?",
    a: "Yes — DID numbers are provisioned in-platform, not sourced through a chain of telecom or aggregator partners.",
  },
  {
    q: "How fast is setup compared to Twixor?",
    a: "Fast — SMSLocal is self-serve and typically live within days. Twixor's workflow-builder strength is best suited to teams with dedicated implementation resources for a slower, more custom onboarding process.",
  },
]

export default function CompareTwixorPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Compare", path: "/compare" },
          { name: "SMSLocal vs Twixor", path: "/compare/twixor" },
        ]}
      />
      <SiteHeader />

      <main className="flex-1">
        {/* ── HERO ──────────────────────────────────────────────── */}
        <CompareHero
          competitor="Twixor"
          tagline="Keep the agentic AI and omnichannel reach, without paying for white-label reseller machinery you will not use."
          intro="Twixor is an India-based, enterprise-grade CX-automation platform built around a low-code workflow and journey builder, spanning WhatsApp, SMS, RCS, and other social channels for complex conversational-commerce flows aimed at telcos, aggregators, and resellers. SMSLocal is built for brands running their own CX — not reselling it — with agentic AI, omnichannel reach, in-platform DID numbers, and fast, self-serve setup. If you need deep, custom conversational-commerce journeys wired into enterprise systems and have the resources to own that build, Twixor is an honest pick — this page covers where each actually wins."
          lastUpdated="July 2026"
        />

        {/* ── COMPARISON TABLE ──────────────────────────────────── */}
        <Section className="border-b border-foreground/5">
          <SectionHeader
            eyebrow="At a glance"
            title="Agentic AI and omnichannel reach, built for your brand."
            subtitle="Tick means fully supported. Amber means partial or gated. Grey means not currently available."
          />
          <div className="mt-10 space-y-6">
            <CompareTableHonest competitor="Twixor" rows={ROWS} />
            <CompareMethodology />
          </div>
        </Section>

        {/* ── WINS BLOCK ────────────────────────────────────────── */}
        <section className="bg-muted/30 border-b border-foreground/5 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <SectionHeader
              eyebrow="Who wins what"
              title="Four wins for us, three for them."
              subtitle="We are brand-first, self-serve, and skip the reseller overhead. They have deeper low-code workflow tooling built for resellers. Pick based on whether you're running your own CX or reselling it."
              center
            />
            <div className="mt-12">
              <WinsBlock competitor="Twixor" usWins={US_WINS} themWins={THEM_WINS} />
            </div>
          </div>
        </section>

        {/* ── PERSONA SPLIT ─────────────────────────────────────── */}
        <Section className="border-b border-foreground/5">
          <SectionHeader
            eyebrow="Who should pick what"
            title="Matching the platform to the buyer."
            subtitle="Two personas for us, one for Twixor. If you don't see yourself in these personas, talk to both teams."
            center
          />
          <div className="mt-12">
            <PersonaSplit competitor="Twixor" usPicks={US_PICKS} themPicks={THEM_PICKS} />
          </div>
        </Section>

        {/* ── INTERNAL LINKS ────────────────────────────────────── */}
        <Section tone="muted">
          <div className="mx-auto max-w-3xl">
            <SectionHeader eyebrow="Explore more" title="Compare more" />
            <ul className="mt-6 space-y-3">
              {[
                { href: "/products/ai-agentic/", label: "Agentic AI — automate support and sales for your brand" },
                { href: "/compare/", label: "See all SMSLocal comparisons" },
                { href: "/numbers/did/", label: "DID numbers — provisioned in-platform" },
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
        <FaqJsonLd items={TWIXOR_FAQS} path="/compare/twixor" />
        <FaqSection items={TWIXOR_FAQS} />

        {/* ── FINAL CTA ─────────────────────────────────────────── */}
        <ProductFinalCta
          title="Run your own CX with agentic AI."
          subtitle="Agentic AI and omnichannel reach, built for your brand — not a white-label reseller platform. Fast, self-serve setup, typically live within days."
          primaryCta={{ label: "Start Free", href: "/signup/" }}
          secondaryCta={{ label: "Talk to us", href: "/company/contact/" }}
        />
      </main>

      <SiteFooter />
    </div>
  )
}
