"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  BarChart3,
  Bot,
  CheckCircle2,
  Layers,
  LayoutPanelTop,
  Megaphone,
  MessagesSquare,
  Radio,
  MessageSquare,
  Send,
  Sparkles,
  Star,
  Users,
} from "lucide-react"

/* ──────────────────────────────────────────────────────────────────────────
 * "Agentic AI meets CPaaS" — a tabbed capability showcase.
 * Original SMSLocal copy; each tab pairs a short pitch with a lightweight,
 * fully responsive UI mock. Replaces the old pricing teaser on the homepage.
 * ──────────────────────────────────────────────────────────────────────── */

function VisualAgentic() {
  const steps = ["Prompt", "Configure", "Train", "Deploy"]
  const actions = [
    "Customer asked for order status",
    "Looked up order in CRM",
    "Replied with live tracking link",
  ]
  return (
    <div className="rounded-2xl border border-border bg-secondary/30 p-4 sm:p-5">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {steps.map((s, i) => (
          <div
            key={s}
            className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 py-2 text-[11px] font-semibold text-foreground"
          >
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-primary/10 text-[9px] font-bold text-primary">
              {i + 1}
            </span>
            {s}
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-xl border border-primary/20 bg-primary/5 p-3">
        <div className="flex items-center gap-1.5 text-[11.5px] font-semibold text-primary">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" /> Agent live · no human in the loop
        </div>
        <ul className="mt-2 space-y-1.5">
          {actions.map((a) => (
            <li key={a} className="flex items-center gap-2 text-[11.5px] text-foreground/80">
              <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-primary" /> {a}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function VisualTiers() {
  const tiers = [
    { t: "Tier 1 · AI self-serve", d: "Resolves 70% of routine queries instantly", w: "70%", c: "from-primary to-emerald-400" },
    { t: "Tier 2 · Specialist agents", d: "Complex cases, full transcript handed over", w: "45%", c: "from-indigo-500 to-sky-400" },
    { t: "Tier 3 · Priority / VIP", d: "Highest-value customers, fastest lane", w: "25%", c: "from-amber-500 to-orange-400" },
  ]
  return (
    <div className="space-y-2.5 rounded-2xl border border-border bg-secondary/30 p-4 sm:p-5">
      {tiers.map((tier) => (
        <div key={tier.t} className="rounded-xl border border-border bg-card p-3">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-semibold text-foreground">{tier.t}</span>
            <span className="text-[10.5px] font-semibold text-muted-foreground">{tier.w}</span>
          </div>
          <div className="mt-1.5 text-[11px] text-muted-foreground">{tier.d}</div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-border">
            <div className={`h-full rounded-full bg-gradient-to-r ${tier.c}`} style={{ width: tier.w }} />
          </div>
        </div>
      ))}
    </div>
  )
}

function VisualOmnichannel() {
  const channels = [
    { Icon: MessageSquare, label: "WhatsApp", c: "text-emerald-600" },
    { Icon: Radio, label: "RCS", c: "text-indigo-600" },
    { Icon: MessageSquare, label: "SMS", c: "text-teal-600" },
  ]
  return (
    <div className="rounded-2xl border border-border bg-secondary/30 p-5">
      <div className="flex flex-col items-center">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-emerald-500 text-primary-foreground shadow-lg shadow-primary/30">
          <Bot className="h-6 w-6" />
        </span>
        <span className="mt-2 text-[12px] font-semibold text-foreground">One assistant · one brain</span>
        <div className="mt-3 grid w-full grid-cols-3 gap-2">
          {channels.map((ch) => (
            <div key={ch.label} className="flex flex-col items-center gap-1 rounded-xl border border-border bg-card px-2 py-3">
              <ch.Icon className={`h-5 w-5 ${ch.c}`} />
              <span className="text-[10.5px] font-medium text-foreground">{ch.label}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 w-full rounded-lg border border-primary/20 bg-primary/5 px-3 py-2 text-center text-[11px] font-medium text-primary">
          Switch channel mid-chat — the thread never resets
        </div>
      </div>
    </div>
  )
}

function VisualCampaign() {
  const camps = [
    { name: "Diwali Sale", ch: "SMS · WhatsApp", pct: "98%", w: "98%" },
    { name: "Cart recovery", ch: "RCS", pct: "76%", w: "76%" },
    { name: "Loyalty drop", ch: "WhatsApp", pct: "54%", w: "54%" },
  ]
  return (
    <div className="space-y-2.5 rounded-2xl border border-border bg-secondary/30 p-4 sm:p-5">
      {camps.map((c) => (
        <div key={c.name} className="rounded-xl border border-border bg-card p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Send className="h-3.5 w-3.5" />
              </span>
              <div className="leading-tight">
                <div className="text-[12px] font-semibold text-foreground">{c.name}</div>
                <div className="text-[10.5px] text-muted-foreground">{c.ch}</div>
              </div>
            </div>
            <span className="text-[11px] font-semibold text-primary">{c.pct}</span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-border">
            <div className="h-full rounded-full bg-gradient-to-r from-primary to-emerald-400" style={{ width: c.w }} />
          </div>
        </div>
      ))}
    </div>
  )
}

function VisualRichCard() {
  return (
    <div className="mx-auto max-w-[260px] rounded-2xl border border-border bg-card p-3 shadow-lg">
      <div className="aspect-[16/9] w-full rounded-xl bg-gradient-to-br from-primary/15 via-secondary to-indigo-500/15" />
      <div className="mt-3 flex items-center gap-1.5">
        <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[8px] font-bold text-primary-foreground">
          ✓
        </span>
        <span className="text-[11px] font-semibold text-foreground">Acme Footwear · Verified</span>
      </div>
      <div className="mt-1 text-[12px] font-bold text-foreground">Air Zoom Runner — ₹6,499</div>
      <div className="text-[11px] text-muted-foreground">Free delivery · COD available</div>
      <div className="mt-3 grid grid-cols-2 gap-1.5">
        <span className="rounded-full bg-primary px-2 py-1.5 text-center text-[10.5px] font-semibold text-primary-foreground">
          Buy now
        </span>
        <span className="rounded-full border border-border px-2 py-1.5 text-center text-[10.5px] font-semibold text-foreground">
          Track order
        </span>
      </div>
    </div>
  )
}

function VisualHybrid() {
  return (
    <div className="space-y-2.5 rounded-2xl border border-border bg-secondary/30 p-4 sm:p-5">
      <div className="flex items-start gap-2">
        <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-[9px] font-bold text-white">J</span>
        <div className="rounded-2xl rounded-bl-sm border border-border bg-card px-3 py-2 text-[11.5px] text-foreground">My refund hasn&apos;t arrived yet.</div>
      </div>
      <div className="flex flex-row-reverse items-start gap-2">
        <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground">AI</span>
        <div className="rounded-2xl rounded-br-sm bg-primary px-3 py-2 text-[11.5px] text-primary-foreground">Checking your order #4821 — one moment.</div>
      </div>
      <div className="flex items-center justify-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[10.5px] font-semibold text-primary">
        <Users className="h-3 w-3" /> Priya (human) joined — transcript &amp; intent loaded
      </div>
      <div className="rounded-xl border border-border bg-card p-2.5 text-[10.5px] text-muted-foreground">
        <span className="font-semibold text-foreground">Suggested reply:</span> Your refund of ₹6,499 is processed — funds land in 24h.
      </div>
    </div>
  )
}

function VisualAnalytics() {
  const bars = ["55%", "72%", "48%", "88%", "66%", "94%"]
  return (
    <div className="rounded-2xl border border-border bg-secondary/30 p-4 sm:p-5">
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-xl border border-border bg-card p-3">
          <div className="text-[10.5px] text-muted-foreground">Delivery rate</div>
          <div className="text-lg font-extrabold text-foreground">98.1%</div>
        </div>
        <div className="rounded-xl border border-border bg-card p-3">
          <div className="text-[10.5px] text-muted-foreground">AI resolution</div>
          <div className="text-lg font-extrabold text-foreground">71%</div>
        </div>
      </div>
      <div className="mt-3 flex h-24 items-end gap-2 rounded-xl border border-border bg-card p-3">
        {bars.map((h, i) => (
          <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-primary to-emerald-400" style={{ height: h }} />
        ))}
      </div>
      <div className="mt-2 flex items-center gap-1 text-[10.5px] text-muted-foreground">
        <Star className="h-3 w-3 text-amber-500" /> CSAT 4.7 / 5 across all channels
      </div>
    </div>
  )
}

const TABS = [
  {
    id: "agentic-ai",
    label: "Agentic AI",
    Icon: Bot,
    headline: "Agentic AI for intelligent automation",
    body: "Deploy AI agents that resolve customer queries end to end, trigger backend workflows, and escalate to a human only when it truly matters. No scripts, no rigid decision trees, and no human in the loop for routine conversations.",
    ctaLabel: "Let AI do the heavy lifting",
    ctaHref: "/products/ai-agents",
    Visual: VisualAgentic,
  },
  {
    id: "multi-tier-cx",
    label: "Multi-tiered CX",
    Icon: Layers,
    headline: "Multi-tiered CX management",
    body: "Route every conversation to the right level — self-serve AI for the simple stuff, specialist agents for complex cases, and a priority lane for your highest-value customers. One workspace, tiered exactly the way your team already works.",
    ctaLabel: "See how routing works",
    ctaHref: "/products/ai-agents",
    Visual: VisualTiers,
  },
  {
    id: "omnichannel-bot",
    label: "Omnichannel Bot",
    Icon: MessagesSquare,
    headline: "One bot across every channel",
    body: "Build once and your assistant answers on WhatsApp, RCS and SMS with the same brain, the same context and the same tone. Customers switch channels mid-conversation; the thread and the memory never reset.",
    ctaLabel: "Explore the channels",
    ctaHref: "/products",
    Visual: VisualOmnichannel,
  },
  {
    id: "campaign-manager",
    label: "Campaign Manager",
    Icon: Megaphone,
    headline: "Campaigns that practically run themselves",
    body: "Plan, segment, schedule and launch DLT-compliant campaigns across SMS, WhatsApp and RCS from a single console — with AI suggesting the best channel, send time and template for each segment automatically.",
    ctaLabel: "Build a campaign",
    ctaHref: "/products/bulk-sms",
    Visual: VisualCampaign,
  },
  {
    id: "rich-cards",
    label: "Dynamic Rich Cards",
    Icon: LayoutPanelTop,
    headline: "Dynamic rich cards that convert",
    body: "Turn plain texts into branded, interactive RCS cards — product carousels, quick-reply chips, invoices and feedback forms — generated on the fly from your catalog and order data, right inside the conversation.",
    ctaLabel: "See RCS in action",
    ctaHref: "/products/rcs",
    Visual: VisualRichCard,
  },
  {
    id: "hybrid-chat",
    label: "Hybrid Chat",
    Icon: Users,
    headline: "Hybrid AI + human chat",
    body: "The AI lands the first response in under a second and stays on as a co-pilot. When a human steps in, they inherit the full transcript, the customer's intent and a suggested reply already drafted — so no one starts cold.",
    ctaLabel: "Meet the team inbox",
    ctaHref: "/products/ai-agents",
    Visual: VisualHybrid,
  },
  {
    id: "analytics",
    label: "Analytics",
    Icon: BarChart3,
    headline: "Analytics you can actually act on",
    body: "Track delivery, engagement, AI resolution and CSAT across every channel in real time. See which templates land, which routes win and where the agent hands off — then optimise without ever leaving the dashboard.",
    ctaLabel: "Explore analytics",
    ctaHref: "/products",
    Visual: VisualAnalytics,
  },
]

export function AgenticCpaas() {
  const [active, setActive] = useState(TABS[0].id)
  const current = TABS.find((t) => t.id === active) ?? TABS[0]
  const Visual = current.Visual

  return (
    <section className="relative overflow-hidden bg-secondary/30 py-20 lg:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 0%, color-mix(in oklch, var(--primary) 9%, transparent), transparent 60%)" }}
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[12.5px] font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5" /> Agentic AI × CPaaS
          </span>
          <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Where agentic AI meets your{" "}
            <span className="bg-gradient-to-r from-primary to-emerald-500 bg-clip-text text-transparent">
              communication stack
            </span>
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
            Self-learning AI agents that think, adapt and act on their own — working natively
            across SMS, WhatsApp and RCS, all on the SMSLocal platform.
          </p>
        </div>

        {/* Tabs — horizontally scrollable on mobile, wrapped & centered on desktop */}
        <div
          role="tablist"
          aria-label="Platform capabilities"
          className="mt-10 -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0 [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {TABS.map((t) => {
            const on = t.id === active
            return (
              <button
                key={t.id}
                role="tab"
                aria-selected={on}
                onClick={() => setActive(t.id)}
                className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-3.5 py-2 text-[13px] font-semibold transition-colors ${
                  on
                    ? "border-primary bg-primary text-primary-foreground shadow-sm shadow-primary/30"
                    : "border-border bg-card text-muted-foreground hover:text-foreground"
                }`}
              >
                <t.Icon className="h-4 w-4" />
                {t.label}
              </button>
            )
          })}
        </div>

        {/* Panel */}
        <div className="mt-8 overflow-hidden rounded-3xl border border-border bg-card shadow-xl shadow-primary/5">
          <div
            key={active}
            style={{ animation: "message-in 0.35s ease both" }}
            className="grid items-center gap-8 p-6 sm:p-8 lg:grid-cols-2 lg:gap-12 lg:p-12"
          >
            {/* Copy */}
            <div>
              <h3 className="text-balance text-2xl font-bold tracking-tight text-foreground sm:text-[28px]">
                {current.headline}
              </h3>
              <p className="mt-4 text-pretty text-[15px] leading-relaxed text-muted-foreground">
                {current.body}
              </p>
              <Link
                href={current.ctaHref}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/30 transition hover:opacity-90"
              >
                {current.ctaLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Visual */}
            <div className="min-w-0">
              <Visual />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
