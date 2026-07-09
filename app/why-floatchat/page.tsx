import type { Metadata } from "next"
import Link from "next/link"
import { getPageMetadata } from "@/lib/seo"
import {
  ArrowRight,
  BadgeIndianRupee,
  Clock,
  FileCheck2,
  Headset,
  Layers,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { FaqSection } from "@/components/landing/faq-section"
import { BreadcrumbJsonLd } from "@/components/seo/json-ld"
import {
  CapabilityGrid,
  ProductFinalCta,
  ProductHero,
  Section,
  SectionHeader,
  StatsBand,
} from "@/components/product/product-page"

export const metadata: Metadata = getPageMetadata("/why-floatchat")

/* ── Hero visual ──────────────────────────────────────────────────────────── */
function WhySmsLocalVisual() {
  const rows = [
    { label: "DLT registration", value: "Guided, same-day" },
    { label: "WhatsApp Business API", value: "Live same-day" },
    { label: "Pricing", value: "INR, pay-as-you-go" },
    { label: "Invoices", value: "GST-ready, automatic" },
  ]

  return (
    <div className="flex h-full min-h-[360px] flex-col gap-4 lg:pl-4">
      <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 backdrop-blur-md">
        <div className="mb-2 flex items-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5 text-primary" />
          <span className="text-[10.5px] font-semibold uppercase tracking-widest text-primary">
            Built for India, from day one
          </span>
        </div>
        <dl className="mt-2 flex flex-col gap-2.5">
          {rows.map((r) => (
            <div key={r.label} className="flex items-center justify-between gap-3 text-[13px]">
              <dt className="text-white/60">{r.label}</dt>
              <dd className="font-medium text-white/90">{r.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="rounded-xl border border-primary/25 bg-primary/10 px-4 py-3.5 backdrop-blur-md">
        <div className="mb-1.5 flex items-center gap-1.5">
          <Layers className="h-3.5 w-3.5 text-primary" />
          <span className="text-[10.5px] font-semibold uppercase tracking-widest text-primary">
            One platform, not six subscriptions
          </span>
        </div>
        <p className="text-[13px] leading-relaxed text-white/85">
          SMS, WhatsApp, RCS, Email, Voice, AI agents, and a shared inbox — one login, one wallet,
          one bill.
        </p>
      </div>

      <div className="flex items-center gap-2 rounded-xl border border-blue-500/20 bg-blue-500/10 px-4 py-2.5">
        <Clock className="h-4 w-4 shrink-0 text-blue-400" />
        <span className="text-[12.5px] font-medium text-blue-300">
          IST support hours — a real person, not a ticket queue
        </span>
      </div>
    </div>
  )
}

export default function WhySmsLocalPage() {
  return (
    <>
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Why SMSLocal", path: "/why-floatchat" },
        ]}
      />
      <SiteHeader />
      <main>

        {/* ── HERO ──────────────────────────────────────────────── */}
        <ProductHero
          compact
          eyebrow="Why SMSLocal"
          title={
            <>
              Why Teams Choose SMSLocal
              <br className="hidden sm:block" /> for Agentic AI
            </>
          }
          subtitle="The agentic AI agent, the channels, the numbers, and the broadcasting in one product."
          primaryCta={{ label: "Get a Demo", href: "/company/contact/" }}
          secondaryCta={{ label: "Start Free", href: "/signup/" }}
          trustBar={[
            { icon: ShieldCheck, label: "DLT-compliant by default" },
            { icon: BadgeIndianRupee, label: "INR billing, GST invoices" },
            { icon: Zap, label: "Same-day WhatsApp onboarding" },
            { icon: Headset, label: "IST-hour human support" },
          ]}
          visual={<WhySmsLocalVisual />}
        />

        {/* ── TRUST LINE ────────────────────────────────────────── */}
        <div className="border-b border-border bg-muted/30 py-4">
          <p className="text-center text-[13px] font-medium text-muted-foreground">
            One platform instead of four vendors.
          </p>
        </div>

        {/* ── RESULTS STRIP ─────────────────────────────────────── */}
        <Section>
          <StatsBand
            items={[
              { value: "Agentic + broadcast", label: "Agentic AI plus broadcasting in one product" },
              { value: "0 devs",   label: "No developer required to build and launch" },
              { value: "Growing",  label: "A growing integrations library, and counting" },
              { value: "1 bill",   label: "One predictable bill instead of several vendors" },
            ]}
          />
        </Section>

        {/* ── THE PROBLEM ───────────────────────────────────────── */}
        <Section tone="muted">
          <div className="mx-auto max-w-3xl">
            <SectionHeader
              eyebrow="The problem"
              title="Most messaging platforms make India an afterthought"
            />
            <p className="mt-5 text-pretty text-[15px] leading-relaxed text-muted-foreground">
              Global CPaaS platforms quote you in dollars, leave DLT registration as "your problem,"
              and route messages through carrier paths that were never built for Indian operators.
              Meanwhile, India-only tools often stop at plain SMS — leaving you to stitch together a
              separate WhatsApp BSP, a separate email tool, and a separate helpdesk just to run one
              support team. SMSLocal exists because Indian businesses deserve better than either
              trade-off.
            </p>
          </div>
        </Section>

        {/* ── THE CASE FOR SMSLOCAL ──────────────────────────────── */}
        <CapabilityGrid
          eyebrow="The case for SMSLocal"
          title="Four reasons Indian businesses pick SMSLocal"
          subtitle="Every differentiator below solves a real friction point we've watched Indian teams hit with other platforms — and DLT paperwork."
          items={[
            {
              icon: Layers,
              title: "One platform",
              body: "The AI, the channels, the campaigns, and the inbox in a single product — SMS, WhatsApp, RCS, Email, Voice, and a shared team inbox all live on one API and one dashboard.",
            },
            {
              icon: Sparkles,
              title: "Agentic, not scripted",
              body: "Agents that take multi-step action, not just answer questions — resolving requests end to end instead of routing every edge case back to a human.",
            },
            {
              icon: Zap,
              title: "No developer required",
              body: "Build and launch without an engineering project. Most teams get DLT registration and WhatsApp Business API both live the same day they sign up.",
            },
            {
              icon: BadgeIndianRupee,
              title: "Numbers and broadcasting included",
              body: "The carrier layer some AI-only vendors leave out — DLT-compliant numbers and broadcasting are built in, not a separate vendor you have to bolt on.",
            },
          ]}
        />

        {/* ── WHY IT WORKS ──────────────────────────────────────── */}
        <Section tone="muted">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16 lg:items-center">
            <div>
              <SectionHeader
                eyebrow="Why it matters"
                title="One tool instead of stitching several together"
              />
              <p className="mt-5 text-pretty text-[15px] leading-relaxed text-muted-foreground">
                You move faster, manage one tool instead of stitching several together, while your
                customers get a consistent experience on every channel. DLT scrubbing rules, GST
                invoicing, and IST office hours are not "features," they're the baseline.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                { icon: <FileCheck2 className="h-5 w-5" />, label: "GST invoices, automatically", desc: "Every recharge and usage cycle generates a compliant tax invoice" },
                { icon: <Sparkles className="h-5 w-5" />,   label: "AI agents in 8 languages",    desc: "Hindi, Tamil, Telugu, Bengali, Marathi, Kannada, Gujarati, and English" },
                { icon: <Headset className="h-5 w-5" />,    label: "Human support in IST",         desc: "Talk to someone during your working hours, not theirs" },
                { icon: <Layers className="h-5 w-5" />,     label: "Shared inbox, every channel",  desc: "One conversation view across SMS, WhatsApp, RCS, Email, and Voice" },
              ].map((item) => (
                <div key={item.label} className="rounded-xl border border-border bg-card p-4 shadow-sm">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {item.icon}
                  </span>
                  <h3 className="mt-3 text-[14px] font-semibold text-foreground">{item.label}</h3>
                  <p className="mt-1 text-[13px] leading-snug text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── WHY SMSLOCAL (dark band) ────────────────────────────── */}
        <Section tone="dark">
          <div className="mx-auto max-w-3xl">
            <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-white/85">
              See it for yourself
            </span>
            <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Compare us honestly, then decide
            </h2>
            <p className="mt-5 text-pretty text-[15px] leading-relaxed text-white/70">
              We'd rather you compare SMSLocal against MSG91, Twilio, WATI, Gupshup, and others on
              features and platform depth than take our word for it. Most teams find the same
              thing: agentic AI plus broadcasting on one platform beats stitching together point
              tools.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/compare/"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/15"
              >
                Compare platforms
              </Link>
              <Link
                href="/platform/security/"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/15"
              >
                See the platform
              </Link>
            </div>
          </div>
        </Section>

        {/* ── FAQ ───────────────────────────────────────────────── */}
        <FaqSection
          items={[
            {
              q: "What makes it agentic?",
              a: "Multi-step action across your tools, with guardrails and handoff — agents don't just answer questions, they complete the task and escalate to a human when they hit the edge of what they should decide alone.",
            },
            {
              q: "Do I need engineers?",
              a: "No, it is no-code with an API option. Most teams build and launch without an engineering project, and developers can go deeper through the API when they want to.",
            },
            {
              q: "What does it replace?",
              a: "An AI vendor, a messaging vendor, and a contact-center tool — SMSLocal bundles agentic AI, every channel, numbers, and broadcasting into one platform instead of three separate subscriptions.",
            },
            {
              q: "How is billing different from global providers?",
              a: "You're billed in INR and receive a GST-compliant invoice automatically for every recharge and usage cycle — one predictable bill instead of stitching together several vendors.",
            },
          ]}
        />

        {/* ── INTERNAL LINKS ────────────────────────────────────── */}
        <Section tone="muted">
          <div className="mx-auto max-w-3xl">
            <SectionHeader eyebrow="Explore more" title="Related resources" />
            <ul className="mt-6 space-y-3">
              {[
                { href: "/products/ai-agentic/", label: "Explore agentic AI on SMSLocal" },
                { href: "/platform/security/",   label: "See the platform and security" },
                { href: "/compare/",             label: "Compare SMSLocal with alternatives" },
                { href: "/company/contact/",     label: "Talk to our team" },
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
          title="See why teams run on SMSLocal."
          subtitle="Agentic AI, every channel, numbers, and broadcasting in one product — start free and see for yourself."
          primaryCta={{ label: "Start Free", href: "/signup/" }}
          secondaryCta={{ label: "Get a Demo", href: "/company/contact/" }}
        />
      </main>
      <SiteFooter />
    </>
  )
}
