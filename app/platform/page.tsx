import type { Metadata } from "next"
import Link from "next/link"
import { getPageMetadata } from "@/lib/seo"
import {
  ArrowRight,
  BookOpen,
  Code2,
  Inbox,
  Send,
  ShieldCheck,
  Sparkles,
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

export const metadata: Metadata = getPageMetadata("/platform")

/* ── Hero visual ──────────────────────────────────────────────────────────── */
function PlatformVisual() {
  const modules = [
    { icon: Sparkles, label: "Agentic AI + Copilot" },
    { icon: Inbox, label: "Omnichannel Inbox" },
    { icon: Send, label: "Broadcasting" },
    { icon: BookOpen, label: "Help Center" },
    { icon: Code2, label: "Developer Tools" },
  ]

  return (
    <div className="flex h-full min-h-[360px] flex-col gap-4 lg:pl-4">
      {/* One record card */}
      <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 backdrop-blur-md">
        <div className="mb-2 flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-green-400" />
          <span className="text-[10.5px] font-semibold uppercase tracking-widest text-white/60">
            One customer record
          </span>
        </div>
        <p className="text-[12.5px] leading-relaxed text-white/80">
          Priya M. — WhatsApp reply, support call, and campaign click, all tied to one profile.
        </p>
      </div>

      {/* Module stack */}
      <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-md">
        <p className="mb-2 text-[10.5px] font-semibold uppercase tracking-widest text-white/50">
          Five modules, one platform
        </p>
        <div className="space-y-1.5">
          {modules.map((m) => (
            <div
              key={m.label}
              className="flex items-center gap-2.5 rounded-lg bg-white/5 px-3 py-2"
            >
              <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary/20 text-primary">
                <m.icon className="h-3.5 w-3.5" />
              </span>
              <span className="text-[12px] font-medium text-white/80">{m.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Security badge */}
      <div className="flex items-center gap-2 rounded-xl border border-primary/20 bg-primary/10 px-4 py-2.5">
        <ShieldCheck className="h-4 w-4 shrink-0 text-primary" />
        <span className="text-[12.5px] font-medium text-primary">
          SSO, audit logs, and role-based access built in
        </span>
      </div>
    </div>
  )
}

export default function PlatformPage() {
  return (
    <>
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Platform", path: "/platform" },
        ]}
      />
      <SiteHeader />
      <main>

        {/* ── HERO ──────────────────────────────────────────────── */}
        <ProductHero
          compact
          eyebrow="Platform"
          title={
            <>
              One Platform for Agentic AI,
              <br className="hidden sm:block" /> Channels, and Broadcasting
            </>
          }
          subtitle="The agentic AI agent, the omnichannel inbox, the campaigns, and the developer tools, in a single product."
          primaryCta={{ label: "Get a Demo", href: "/company/contact/" }}
          secondaryCta={{ label: "Start Free", href: "/signup/" }}
          trustBar={[
            { icon: Sparkles, label: "Agentic AI across every channel" },
            { icon: Send, label: "SMS, WhatsApp, and RCS broadcasting" },
            { icon: Code2, label: "100+ integrations" },
            { icon: ShieldCheck, label: "Enterprise security built in" },
          ]}
          visual={<PlatformVisual />}
        />

        {/* ── TRUST LINE ────────────────────────────────────────── */}
        <div className="border-b border-border bg-muted/30 py-4">
          <p className="text-center text-[13px] font-medium text-muted-foreground">
            Replace four vendors with one platform.
          </p>
        </div>

        {/* ── RESULTS STRIP ─────────────────────────────────────── */}
        <Section>
          <StatsBand
            items={[
              { value: "AI",       label: "Agentic AI plus copilot, working across every channel" },
              { value: "Campaigns",label: "SMS, WhatsApp, and RCS broadcasting from one dashboard" },
              { value: "100+",     label: "Integrations to connect your existing CRM and helpdesk stack" },
              { value: "Secure",   label: "SSO, audit logs, and role-based access built into the core" },
            ]}
          />
        </Section>

        {/* ── THE PROBLEM ───────────────────────────────────────── */}
        <Section tone="muted">
          <div className="mx-auto max-w-3xl">
            <SectionHeader
              eyebrow="The problem"
              title="Buying CX in pieces leaves you with four bills and no single view of the customer"
            />
            <p className="mt-5 text-pretty text-[15px] leading-relaxed text-muted-foreground">
              An AI vendor here, a messaging vendor there, a separate contact-center tool for the
              inbox — each with its own login, its own data, and its own bill. SMSLocal unifies the
              AI, the channels, the campaigns, and the team in one place, so nothing about a
              customer ever sits in a silo.
            </p>
          </div>
        </Section>

        {/* ── WHAT'S INSIDE ──────────────────────────────────────── */}
        <CapabilityGrid
          eyebrow="What's inside"
          title="Everything your customer experience needs, in one product"
          subtitle="Five modules that share the same data, the same customer record, and the same platform — not five separate tools stitched together."
          items={[
            {
              icon: Sparkles,
              title: "Agentic AI and copilot",
              body: "A no-code agent that answers and takes action across your channels, plus a copilot that drafts replies and summaries for your human team.",
            },
            {
              icon: Inbox,
              title: "Omnichannel inbox",
              body: "Every channel, full conversation history, routing, SLA timers, macros, and CSAT — all in one shared view for your whole team.",
            },
            {
              icon: Send,
              title: "Broadcasting",
              body: "DLT-compliant SMS, WhatsApp, and RCS campaigns from one dashboard, with replies flowing straight into the shared inbox.",
            },
            {
              icon: BookOpen,
              title: "Help center and developer tools",
              body: "A knowledge base with AI search that grounds your agent's answers, plus a REST API, webhooks, and SSO/SAML for your engineering team.",
            },
          ]}
        />

        {/* ── WHY IT WORKS ──────────────────────────────────────── */}
        <Section tone="muted">
          <div className="mx-auto max-w-3xl">
            <SectionHeader
              eyebrow="Why it works"
              title="One customer record follows every touchpoint"
            />
            <p className="mt-5 text-pretty text-[15px] leading-relaxed text-muted-foreground">
              A WhatsApp reply, a support call, and a campaign click all tie back to the same
              customer profile, so your team and your AI always have the full picture — no
              switching tools to piece together what already happened.
            </p>
          </div>
        </Section>

        {/* ── WHY SMSLOCAL ──────────────────────────────────────── */}
        <Section tone="dark">
          <div className="mx-auto max-w-3xl">
            <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-white/85">
              Why SMSLocal
            </span>
            <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              The AI brain and the carrier plumbing, on one platform
            </h2>
            <p className="mt-5 text-pretty text-[15px] leading-relaxed text-white/70">
              Most AI vendors leave you to bring your own numbers and carrier relationships.
              SMSLocal runs both — the agentic AI and the messaging infrastructure it acts on — so
              you launch faster and manage one tool instead of five.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/products/ai-agentic/"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/15"
              >
                Agentic AI
              </Link>
              <Link
                href="/products/omnichannel-inbox/"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/15"
              >
                Omnichannel inbox
              </Link>
              <Link
                href="/platform/security/"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/15"
              >
                Platform security
              </Link>
            </div>
          </div>
        </Section>

        {/* ── FAQ ───────────────────────────────────────────────── */}
        <FaqSection
          items={[
            {
              q: "Is it really one platform?",
              a: "Yes — the agentic AI, every channel, broadcasting, and the shared inbox all run on the same product, sharing the same customer data. No separate logins or syncing required.",
            },
            {
              q: "Do I need a developer to set it up?",
              a: "No — the platform is built to launch without an engineering project. A REST API and webhooks are available for teams that want to go deeper.",
            },
            {
              q: "Is it secure?",
              a: "Yes — SSO and SAML, audit logs, role-based access, and GDPR/CCPA-aligned data handling are built into the platform, with SOC 2 on our roadmap.",
            },
          ]}
        />

        {/* ── INTERNAL LINKS ────────────────────────────────────── */}
        <Section tone="muted">
          <div className="mx-auto max-w-3xl">
            <SectionHeader eyebrow="Explore more" title="Related resources" />
            <ul className="mt-6 space-y-3">
              {[
                { href: "/products/ai-agentic/",         label: "Agentic AI — how it works" },
                { href: "/products/omnichannel-inbox/",  label: "Omnichannel inbox — one place for every channel" },
                { href: "/products/integrations/",       label: "Integrations — connect your existing stack" },
                { href: "/platform/security/",           label: "Platform security — SSO, audit logs, and controls" },
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
          title="Run your customer experience from one platform."
          subtitle="Agentic AI, every channel, broadcasting, and a shared inbox — connected from day one."
          primaryCta={{ label: "Get a Demo", href: "/company/contact/" }}
          secondaryCta={{ label: "Start Free", href: "/signup/" }}
        />
      </main>
      <SiteFooter />
    </>
  )
}
