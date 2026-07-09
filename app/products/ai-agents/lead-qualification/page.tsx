import type { Metadata } from "next"
import Link from "next/link"
import { getPageMetadata } from "@/lib/seo"
import {
  ArrowRight,
  Database,
  Filter,
  MessageCircle,
  RefreshCw,
  Target,
  TrendingUp,
  UserCheck,
  Zap,
} from "lucide-react"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { FaqSection } from "@/components/landing/faq-section"
import { BreadcrumbJsonLd, ProductServiceJsonLd } from "@/components/seo/json-ld"
import {
  CapabilityGrid,
  ProductFinalCta,
  ProductHero,
  Section,
  SectionHeader,
  StatsBand,
} from "@/components/product/product-page"

export const metadata: Metadata = getPageMetadata("/products/ai-agents/lead-qualification")

/* ── Hero visual ──────────────────────────────────────────────────────────── */
function LeadQualVisual() {
  const convo = [
    { from: "user",  text: "Hi, I'm interested in your enterprise plan" },
    { from: "agent", text: "Great! How many team members would be using it?" },
    { from: "user",  text: "Around 50, across 3 offices" },
    { from: "agent", text: "Got it. Are you currently using any CRM or helpdesk?" },
    { from: "user",  text: "Yes, HubSpot" },
    { from: "agent", text: "Perfect — I'm connecting you with our enterprise team now 🚀" },
  ]

  const scores = [
    { label: "Company size",   value: "50+ seats",   hot: true },
    { label: "Intent",         value: "Enterprise",  hot: true },
    { label: "CRM",            value: "HubSpot",     hot: true },
    { label: "Lead score",     value: "92 / 100",    hot: true },
  ]

  return (
    <div className="flex h-full min-h-[360px] flex-col gap-4 lg:pl-4">
      {/* Chat card */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
        <div className="mb-3 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-green-400" />
          <span className="text-[12px] font-semibold uppercase tracking-widest text-white/60">
            Qualifying in real time
          </span>
        </div>
        <div className="space-y-2">
          {convo.map((m, i) => (
            <div key={i} className={`flex ${m.from === "user" ? "justify-start" : "justify-end"}`}>
              <span
                className={`max-w-[88%] rounded-xl px-3 py-2 text-[12px] leading-snug ${
                  m.from === "user"
                    ? "bg-white/10 text-white/80"
                    : "bg-primary text-primary-foreground"
                }`}
              >
                {m.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Lead score card */}
      <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-md">
        <p className="mb-2 text-[10.5px] font-semibold uppercase tracking-widest text-white/50">
          Lead profile
        </p>
        <div className="grid grid-cols-2 gap-1.5">
          {scores.map((s) => (
            <div key={s.label} className="flex items-center justify-between gap-2 rounded-lg bg-white/5 px-2.5 py-1.5">
              <span className="text-[11px] text-white/55">{s.label}</span>
              <span className="text-[11px] font-semibold text-white">{s.value}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default function LeadQualificationPage() {
  return (
    <>
      <ProductServiceJsonLd
        name="SMSLocal AI Lead Qualification Agent"
        description="An agentic AI lead qualification agent that captures interest, asks the right questions, scores intent, and routes hot leads to your team automatically."
        path="/products/ai-agents/lead-qualification"
        category="AI Lead Qualification Agent"
      />
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
          { name: "AI Agents", path: "/products/ai-agents" },
          { name: "Lead Qualification", path: "/products/ai-agents/lead-qualification" },
        ]}
      />
      <SiteHeader />
      <main>

        {/* ── HERO ──────────────────────────────────────────────── */}
        <ProductHero
          compact
          eyebrow="AI Agents · Lead Qualification"
          title={
            <>
              An Agentic AI Lead Qualification Agent
              <br className="hidden sm:block" /> That Feeds Your Pipeline
            </>
          }
          subtitle="Capture interest, ask the right questions, score intent, and route hot leads to your team, automatically."
          primaryCta={{ label: "Get a Demo", href: "/company/contact/" }}
          secondaryCta={{ label: "Start Free", href: "/signup/" }}
          trustBar={[
            { icon: MessageCircle, label: "Captures leads on every channel" },
            { icon: Filter,        label: "Qualifies with dynamic questions" },
            { icon: Target,        label: "Scores and routes in real time" },
            { icon: Database,      label: "Syncs to your CRM" },
          ]}
          visual={<LeadQualVisual />}
        />

        {/* ── TRUST LINE ────────────────────────────────────────── */}
        <div className="border-b border-border bg-muted/30 py-4">
          <p className="text-center text-[13px] font-medium text-muted-foreground">
            Built for sales teams that lose leads to slow follow-up.
          </p>
        </div>

        {/* ── RESULTS STRIP ─────────────────────────────────────── */}
        <Section>
          <StatsBand
            items={[
              { value: "Every", label: "channel covered — web, WhatsApp, Instagram, Messenger, and more" },
              { value: "Dynamic", label: "questions that adapt to each lead, not a rigid static form" },
              { value: "Live",   label: "intent scoring and routing the moment the conversation ends" },
              { value: "Auto",   label: "CRM sync — every lead, every field, zero manual data entry" },
            ]}
          />
        </Section>

        {/* ── THE PROBLEM ───────────────────────────────────────── */}
        <Section tone="muted">
          <div className="mx-auto max-w-3xl">
            <SectionHeader
              eyebrow="The problem"
              title="Leads go cold in minutes, not days"
            />
            <p className="mt-5 text-pretty text-[15px] leading-relaxed text-muted-foreground">
              A static form cannot ask follow-up questions, and a human cannot answer every inbound
              instantly. An agentic AI agent qualifies the moment interest appears and hands your
              reps only the leads worth their time. Every minute of delay is a percentage point of
              conversion lost.
            </p>
          </div>
        </Section>

        {/* ── WHAT IT DOES ──────────────────────────────────────── */}
        <CapabilityGrid
          eyebrow="What it does"
          title="From first message to pipeline-ready lead, automatically"
          subtitle="It doesn't just collect contact details — it qualifies, scores, routes, and syncs without anyone on your team getting involved."
          items={[
            {
              icon: MessageCircle,
              title: "Captures everywhere",
              body: "Pulls leads from web chat, WhatsApp, and social into one place so no inbound slips through — regardless of which channel the prospect reached out on.",
            },
            {
              icon: Filter,
              title: "Qualifies dynamically",
              body: "Asks adaptive questions instead of a rigid form, so the conversation feels natural and the answers you get are actually useful for scoring and routing.",
            },
            {
              icon: Target,
              title: "Scores intent",
              body: "Ranks leads by readiness the moment the conversation closes so your team always works the best ones first — not whoever messaged most recently.",
            },
            {
              icon: Database,
              title: "Routes and syncs",
              body: "Sends hot leads to the right rep and writes every field to your CRM in real time. No copy-pasting, no missed data, no leads sitting in a spreadsheet.",
            },
          ]}
        />

        {/* ── WHY IT WORKS ──────────────────────────────────────── */}
        <Section tone="muted">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16 lg:items-center">
            <div>
              <SectionHeader
                eyebrow="Why it works"
                title="Reps close deals — the agent fills the pipeline"
              />
              <p className="mt-5 text-pretty text-[15px] leading-relaxed text-muted-foreground">
                Every inbound gets an instant, intelligent response. Reps stop chasing dead ends and
                spend time on leads that convert, and nothing falls through the cracks because the
                agent is always on, always qualifying, and always syncing.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                { icon: <Zap className="h-5 w-5" />,         label: "Instant response",  desc: "Every inbound gets a reply in seconds, not hours" },
                { icon: <TrendingUp className="h-5 w-5" />,  label: "Better pipeline",   desc: "Only qualified, scored leads reach your reps" },
                { icon: <RefreshCw className="h-5 w-5" />,   label: "Nothing missed",    desc: "24/7 capture across every channel, zero gaps" },
                { icon: <UserCheck className="h-5 w-5" />,   label: "Reps focus on close", desc: "No time wasted on unqualified or cold leads" },
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

        {/* ── WHY SMSLOCAL ──────────────────────────────────────── */}
        <Section tone="dark">
          <div className="mx-auto max-w-3xl">
            <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-white/85">
              Why SMSLocal
            </span>
            <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Qualification that flows straight into nurture
            </h2>
            <p className="mt-5 text-pretty text-[15px] leading-relaxed text-white/70">
              Qualification runs on the same platform as your sales agent, your inbox, and your
              campaigns — so a qualified lead flows straight into nurture and follow-up without
              anyone moving data between tools. One record, one platform, from first touch to
              closed deal.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/products/ai-agents/"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/15"
              >
                See all AI agents
              </Link>
              <Link
                href="/products/ai-agents/sales/"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/15"
              >
                AI Sales Agent
              </Link>
            </div>
          </div>
        </Section>

        {/* ── FAQ ───────────────────────────────────────────────── */}
        <FaqSection
          items={[
            {
              q: "Which channels can it capture leads from?",
              a: "Web chat, WhatsApp, Instagram, Messenger, and more — all pulled into one inbox. Every channel uses the same qualification flow and writes to the same CRM record.",
            },
            {
              q: "Does it sync to my CRM?",
              a: "Yes, through 200+ integrations and the open API. HubSpot, Salesforce, Pipedrive, and more. Every lead field the agent collects gets written automatically — no manual data entry.",
            },
            {
              q: "Can it follow up with leads automatically?",
              a: "Yes. Leads that don't convert immediately go into automated nurture sequences across channels — SMS, WhatsApp, or email — so no qualified lead goes cold just because the timing wasn't right.",
            },
          ]}
        />

        {/* ── INTERNAL LINKS ────────────────────────────────────── */}
        <Section tone="muted">
          <div className="mx-auto max-w-3xl">
            <SectionHeader eyebrow="Explore more" title="Related resources" />
            <ul className="mt-6 space-y-3">
              {[
                { href: "/products/ai-agents/",             label: "All AI agent use cases" },
                { href: "/products/ai-agentic/",            label: "How agentic AI works" },
                { href: "/products/ai-agents/sales/",       label: "AI Sales Agent — turn qualified leads into orders" },
                { href: "/compare/",                        label: "Compare SMSLocal with alternatives" },
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
          title="Stop losing leads to slow follow-up."
          subtitle="Connect your channels and CRM, let the agent qualify every inbound instantly, and hand your reps a pipeline full of leads worth closing."
          primaryCta={{ label: "Get a Demo", href: "/company/contact/" }}
          secondaryCta={{ label: "Start Free", href: "/signup/" }}
        />
      </main>
      <SiteFooter />
    </>
  )
}