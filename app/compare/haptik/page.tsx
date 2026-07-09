import type { Metadata } from "next"
import Link from "next/link"
import { getPageMetadata } from "@/lib/seo"
import {
  ArrowRight,
  Building2,
  CircleDollarSign,
  Clock,
  Rocket,
  ShieldCheck,
  Sparkles,
} from "lucide-react"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { ProductFinalCta, Section, SectionHeader } from "@/components/product/product-page"
import { BreadcrumbJsonLd } from "@/components/seo/json-ld"
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
export const metadata: Metadata = getPageMetadata("/compare/haptik")

const ROWS: CompareRow[] = [
  {
    feature: "Self-serve signup, no sales call required",
    us: "yes",
    them: "partial",
    note: "Haptik's enterprise suite (Contakt) is generally an RFP-driven sale, but its SMB arm, Interakt, does offer self-serve tiered signup.",
  },
  {
    feature: "Transparent, published pricing",
    us: "yes",
    them: "partial",
    note: "Interakt publishes tiered plan pricing for SMBs; the enterprise Contakt suite is generally quoted per-deployment after a sales conversation.",
  },
  {
    feature: "Same-day WhatsApp + DLT onboarding",
    us: "yes",
    them: "partial",
    note: "Interakt's self-serve WhatsApp setup can move quickly; Contakt's enterprise onboarding commonly involves a project-style rollout measured in weeks.",
  },
  {
    feature: "Works for SMBs, not just large enterprises",
    us: "yes",
    them: "partial",
    note: "Haptik now serves SMBs through Interakt, its WhatsApp-first CRM, alongside its enterprise-focused Contakt product — worth checking which line fits your size.",
  },
  {
    feature: "WhatsApp Business API (official BSP)",
    us: "yes",
    them: "yes",
  },
  {
    feature: "India DLT-compliant SMS, native workflow",
    us: "yes",
    them: "partial",
    note: "Haptik's core strength is conversational AI/chatbots; SMS is a secondary channel rather than the primary product.",
  },
  {
    feature: "Visual WhatsApp chatbot / flow builder",
    us: "yes",
    them: "yes",
    note: "Haptik's bot-builder tooling is deep and mature, built over years of enterprise chatbot deployments.",
  },
  {
    feature: "AI WhatsApp agent (multilingual) on the core plan",
    us: "yes",
    them: "partial",
    note: "Haptik's AI Agents are offered to SMBs as a paid add-on on top of Interakt, and as a custom-scoped build on the enterprise Contakt suite — not bundled by default.",
  },
  {
    feature: "Voice bots / IVR automation",
    us: "no",
    them: "yes",
    note: "Haptik has invested significantly in voice-bot automation, now offered to both large contact centers and, more recently, SMBs.",
  },
  {
    feature: "Deep enterprise professional-services support",
    us: "partial",
    them: "yes",
    note: "Large Haptik accounts get dedicated solution-engineering and integration teams; we offer responsive human support, not embedded project teams.",
  },
  {
    feature: "Backing / scale for very large deployments",
    us: "partial",
    them: "yes",
    note: "Haptik is owned by Reliance Jio, which gives it distribution and scale for very large, complex rollouts.",
  },
  {
    feature: "Shared team inbox for human handoff",
    us: "yes",
    them: "partial",
    note: "Haptik is bot-first; human-agent inbox tooling exists but is not the centerpiece of the product.",
  },
  {
    feature: "IST-hour human support on the base plan",
    us: "yes",
    them: "partial",
    note: "Support quality is typically tied to enterprise contract value rather than guaranteed on a base tier.",
  },
]

const US_WINS = [
  {
    title: "Self-serve, not sales-led",
    description:
      "Sign up, add credit, and send a real SMS or WhatsApp message in minutes. No RFP, no procurement cycle, no waiting on a sales team to size a deal before you can even test the product.",
    icon: Rocket,
  },
  {
    title: "Published INR pricing, pay-as-you-go",
    description:
      "One public rate card in INR. You know your cost per message before you send it — no custom quote, no minimum contract value to unlock reasonable rates.",
    icon: CircleDollarSign,
  },
  {
    title: "Same-day DLT + WhatsApp onboarding",
    description:
      "PE registration, templates, sender ID, and a production WhatsApp number in a single business day — not a multi-week enterprise implementation project.",
    icon: Clock,
  },
  {
    title: "Built for SMBs and mid-market too",
    description:
      "You don't need a large enterprise budget or a dedicated integration team to get started. SMSLocal scales down to a single founder and up to a growing business, not just Fortune 500 accounts.",
    icon: Sparkles,
  },
]

const THEM_WINS = [
  {
    title: "Deep enterprise conversational-AI tooling",
    description:
      "Through its Contakt suite, Haptik has built conversational AI and chatbot platforms for large enterprises for years. If you need heavily customized, large-scale bot and voice automation, their tooling and experience run deep.",
    icon: Building2,
  },
  {
    title: "Reliance Jio backing and scale",
    description:
      "As a Jio-owned company, Haptik has distribution, capital, and enterprise relationships that support very large, complex deployments with dedicated professional services.",
    icon: ShieldCheck,
  },
]

const US_PICKS: PersonaCard[] = [
  {
    title: "The founder or SMB who wants to start today",
    description:
      "You want to send a DLT-compliant SMS or a WhatsApp template today, on a free self-serve trial, without a sales call or a minimum commitment.",
    bullets: [
      "Self-serve signup, live in minutes",
      "Published INR pay-as-you-go pricing",
      "Same-day DLT + WhatsApp onboarding",
    ],
  },
  {
    title: "The growing business that outgrew spreadsheets, not enterprise IT",
    description:
      "You need SMS, WhatsApp, and an AI agent working together — without hiring a solutions-engineering team to configure an enterprise conversational-AI platform.",
    bullets: [
      "One dashboard for SMS + WhatsApp + AI agent",
      "No RFP or procurement cycle to get started",
      "IST-hour human support on the core plan",
    ],
  },
]

const THEM_PICKS: PersonaCard[] = [
  {
    title: "The large enterprise running an RFP for conversational AI",
    description:
      "If you're a large enterprise evaluating vendors through a formal RFP process and need deep, custom-built conversational AI and voice-bot automation backed by a dedicated professional-services team, Haptik is built for that engagement.",
    bullets: [
      "Mature enterprise chatbot and voice-bot tooling",
      "Reliance Jio-backed scale and distribution",
      "Dedicated solution engineering for large accounts",
    ],
  },
]

export default function CompareHaptikPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Compare", path: "/compare" },
          { name: "SMSLocal vs Haptik", path: "/compare/haptik" },
        ]}
      />
      <SiteHeader />

      <main className="flex-1">
        {/* ── HERO ──────────────────────────────────────────────── */}
        <CompareHero
          competitor="Haptik"
          tagline="An enterprise conversational-AI platform vs a self-serve, India-native messaging platform."
          intro="Haptik, owned by Reliance Jio, runs two product lines: Contakt, a deep conversational-AI and voice-bot suite typically sold to large enterprises through an RFP-driven engagement, and Interakt, a self-serve WhatsApp CRM built for SMBs. SMSLocal is a single self-serve, pay-as-you-go platform for SMS, WhatsApp, OTP, and AI agents with published pricing, DLT-native workflows, and same-day onboarding. If you're running a formal enterprise RFP for conversational AI, Haptik's Contakt suite is an honest pick — this page covers where each actually wins."
          lastUpdated="July 2026"
        />

        {/* ── COMPARISON TABLE ──────────────────────────────────── */}
        <Section className="border-b border-foreground/5">
          <SectionHeader
            eyebrow="Feature-by-feature"
            title="Thirteen rows, honestly scored."
            subtitle="Tick means fully supported. Amber means partial or gated. Grey means not currently available."
          />
          <div className="mt-10 space-y-6">
            <CompareTableHonest competitor="Haptik" rows={ROWS} />
            <CompareMethodology />
          </div>
        </Section>

        {/* ── WINS BLOCK ────────────────────────────────────────── */}
        <section className="bg-muted/30 border-b border-foreground/5 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <SectionHeader
              eyebrow="Who wins what"
              title="Four wins for us, two for them."
              subtitle="We are self-serve, transparently priced, and fast to onboard. They have deep enterprise tooling and Jio-backed scale. Pick based on how you buy."
              center
            />
            <div className="mt-12">
              <WinsBlock competitor="Haptik" usWins={US_WINS} themWins={THEM_WINS} />
            </div>
          </div>
        </section>

        {/* ── PERSONA SPLIT ─────────────────────────────────────── */}
        <Section className="border-b border-foreground/5">
          <SectionHeader
            eyebrow="Who should pick what"
            title="Matching the platform to the buyer."
            subtitle="Two personas for us, one for Haptik. If you don't see yourself in these personas, talk to both teams."
            center
          />
          <div className="mt-12">
            <PersonaSplit competitor="Haptik" usPicks={US_PICKS} themPicks={THEM_PICKS} />
          </div>
        </Section>

        {/* ── INTERNAL LINKS ────────────────────────────────────── */}
        <Section tone="muted">
          <div className="mx-auto max-w-3xl">
            <SectionHeader eyebrow="Explore more" title="Compare more" />
            <ul className="mt-6 space-y-3">
              {[
                { href: "/compare/", label: "See all SMSLocal comparisons" },
                { href: "/compare/smslocal-vs-twilio/", label: "SMSLocal vs Twilio — global CPaaS comparison" },
                { href: "/pricing/", label: "Pricing — published INR rate card" },
                { href: "/products/ai-agents/", label: "AI Agents — automate support and sales" },
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

        {/* ── FINAL CTA ─────────────────────────────────────────── */}
        <ProductFinalCta
          title="See SMSLocal's transparent pricing."
          subtitle="Free signup credit, no card, no procurement cycle. Send a real DLT SMS and a real WhatsApp template in 5 minutes — then decide."
          primaryCta={{ label: "Start Free", href: "/signup/" }}
          secondaryCta={{ label: "See pricing", href: "/pricing/" }}
        />
      </main>

      <SiteFooter />
    </div>
  )
}
