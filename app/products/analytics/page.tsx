import type { Metadata } from "next"
import Link from "next/link"
import { getPageMetadata } from "@/lib/seo"
import {
  ArrowRight,
  BarChart2,
  BarChart3,
  Download,
  Heart,
  MessageSquare,
  Smile,
  TrendingUp,
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

export const metadata: Metadata = getPageMetadata("/products/analytics")

/* ── Hero visual ──────────────────────────────────────────────────────────── */
function AnalyticsVisual() {
  const metrics = [
    { label: "First response",  value: "1.2s",  change: "↓ 34%",  good: true  },
    { label: "Resolution rate", value: "78%",   change: "↑ 12%",  good: true  },
    { label: "CSAT",            value: "4.7",   change: "↑ 0.4",  good: true  },
    { label: "Open rate",       value: "61%",   change: "↑ 8%",   good: true  },
  ]

  const bars = [
    { label: "WhatsApp", pct: 82 },
    { label: "SMS",      pct: 61 },
    { label: "Email",    pct: 47 },
    { label: "Web chat", pct: 38 },
  ]

  return (
    <div className="flex h-full min-h-[360px] flex-col gap-4 lg:pl-4">
      {/* KPI grid */}
      <div className="grid grid-cols-2 gap-2">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-3 backdrop-blur-md"
          >
            <p className="text-[10.5px] text-white/50">{m.label}</p>
            <p className="mt-0.5 text-[22px] font-semibold text-white">{m.value}</p>
            <span
              className={`text-[11px] font-semibold ${
                m.good ? "text-green-400" : "text-red-400"
              }`}
            >
              {m.change} vs last period
            </span>
          </div>
        ))}
      </div>

      {/* Engagement bars */}
      <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-md">
        <p className="mb-3 text-[10.5px] font-semibold uppercase tracking-widest text-white/50">
          Engagement by channel
        </p>
        <div className="space-y-2">
          {bars.map((b) => (
            <div key={b.label} className="flex items-center gap-3">
              <span className="w-16 shrink-0 text-[11px] text-white/60">{b.label}</span>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${b.pct}%` }}
                />
              </div>
              <span className="w-8 text-right text-[11px] font-semibold text-white">
                {b.pct}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Export badge */}
      <div className="flex items-center gap-2 rounded-xl border border-blue-500/20 bg-blue-500/10 px-4 py-2.5">
        <Download className="h-4 w-4 shrink-0 text-blue-400" />
        <span className="text-[12.5px] font-medium text-blue-300">
          Scheduled report sent to your team — every Monday at 9 AM
        </span>
      </div>
    </div>
  )
}

export default function AnalyticsPage() {
  return (
    <>
      <ProductServiceJsonLd
        name="SMSLocal Analytics & Insights"
        description="Real-time dashboards for agent performance, customer sentiment, and campaign results — CSAT, NPS, resolution, deliverability, and engagement in one view."
        path="/products/analytics"
        category="Customer Experience Analytics"
      />
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
          { name: "Analytics", path: "/products/analytics" },
        ]}
      />
      <SiteHeader />
      <main>

        {/* ── HERO ──────────────────────────────────────────────── */}
        <ProductHero
          compact
          eyebrow="Products · Analytics & Insights"
          title={
            <>
              Agentic AI Analytics That Show
              <br className="hidden sm:block" /> What Actually Matters
            </>
          }
          subtitle="Real-time dashboards for agent performance, customer sentiment, and campaign results, in one view."
          primaryCta={{ label: "Get a Demo", href: "/company/contact/" }}
          secondaryCta={{ label: "Start Free", href: "/signup/" }}
          trustBar={[
            { icon: BarChart2,    label: "Real-time dashboards" },
            { icon: Heart,        label: "CSAT, NPS, and resolution" },
            { icon: TrendingUp,   label: "Deliverability and engagement" },
            { icon: Download,     label: "Exportable reports" },
          ]}
          visual={<AnalyticsVisual />}
        />

        {/* ── TRUST LINE ────────────────────────────────────────── */}
        <div className="border-b border-border bg-muted/30 py-4">
          <p className="text-center text-[13px] font-medium text-muted-foreground">
            Decisions backed by data, not guesses.
          </p>
        </div>

        {/* ── RESULTS STRIP ─────────────────────────────────────── */}
        <Section>
          <StatsBand
            items={[
              { value: "Live",     label: "Real-time dashboards — no waiting for end-of-day reports" },
              { value: "CSAT",     label: "NPS and resolution tracked automatically across every channel" },
              { value: "Campaign", label: "Deliverability, open rates, and conversions for SMS, WhatsApp, and RCS" },
              { value: "Export",   label: "Scheduled reports sent to your team and stakeholders automatically" },
            ]}
          />
        </Section>

        {/* ── THE PROBLEM ───────────────────────────────────────── */}
        <Section tone="muted">
          <div className="mx-auto max-w-3xl">
            <SectionHeader
              eyebrow="The problem"
              title="Data scattered across channels hides what is really happening"
            />
            <p className="mt-5 text-pretty text-[15px] leading-relaxed text-muted-foreground">
              When support metrics live in one tool, campaign data in another, and sentiment nowhere
              at all, you are always working from an incomplete picture. One view of conversations
              and campaigns tells you where to improve and where to invest — without stitching
              spreadsheets together every Monday morning.
            </p>
          </div>
        </Section>

        {/* ── WHAT YOU GET ──────────────────────────────────────── */}
        <CapabilityGrid
          eyebrow="What you get"
          title="Every metric that matters, in one place"
          subtitle="Support, campaigns, sentiment, and reporting — all on one dashboard, updated in real time."
          items={[
            {
              icon: BarChart3,
              title: "Performance dashboards",
              body: "First-response time, resolution rate, CSAT, and NPS tracked in real time so you know exactly how your team and agents are performing, at any moment.",
            },
            {
              icon: TrendingUp,
              title: "Campaign analytics",
              body: "Deliverability, open rates, clicks, and conversions across SMS, WhatsApp, and RCS in one view — so you know which campaigns drive results and which to cut.",
            },
            {
              icon: Smile,
              title: "Sentiment and trends",
              body: "The most common questions and how customers feel about each one, surfaced automatically — so you can fix recurring problems before they show up in your CSAT score.",
            },
            {
              icon: Download,
              title: "Reporting",
              body: "Exportable conversation logs and scheduled reports delivered to your team and stakeholders automatically — no manual pulling, no formatting, no waiting.",
            },
          ]}
        />

        {/* ── WHY IT WORKS ──────────────────────────────────────── */}
        <Section tone="muted">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16 lg:items-center">
            <div>
              <SectionHeader
                eyebrow="Why it works"
                title="One view, fewer blind spots"
              />
              <p className="mt-5 text-pretty text-[15px] leading-relaxed text-muted-foreground">
                You see the full picture of conversations and campaigns in one place, so you can
                staff, route, and message based on what the data says — not what you think is
                happening. When a problem surfaces in sentiment, you see it the same day, not
                three weeks later in a quarterly review.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                { icon: <Zap className="h-5 w-5" />,           label: "Real-time",      desc: "Dashboards update live — no waiting for overnight batch jobs" },
                { icon: <MessageSquare className="h-5 w-5" />, label: "All channels",   desc: "Support and campaigns in one view, not split across tools" },
                { icon: <Smile className="h-5 w-5" />,         label: "Sentiment",      desc: "Automatic trend detection — catch issues before they escalate" },
                { icon: <Download className="h-5 w-5" />,      label: "Scheduled reports", desc: "Delivered to inboxes automatically, no manual work required" },
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

        {/* ── WHY FLOATCHAT ─────────────────────────────────────── */}
        <Section tone="dark">
          <div className="mx-auto max-w-3xl">
            <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-white/85">
              Why SMSLocal
            </span>
            <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Analytics that cover the entire customer journey
            </h2>
            <p className="mt-5 text-pretty text-[15px] leading-relaxed text-white/70">
              Because the AI, the inbox, and the broadcasting all share one platform, your analytics
              cover the entire customer journey — not a single channel in isolation. A campaign that
              drives support tickets shows up in both views, so you can act on the connection instead
              of missing it entirely.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/products/omnichannel-inbox/"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/15"
              >
                Omnichannel inbox
              </Link>
              <Link
                href="/products/ai-agentic/"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/15"
              >
                Agentic AI
              </Link>
            </div>
          </div>
        </Section>

        {/* ── FAQ ───────────────────────────────────────────────── */}
        <FaqSection
          items={[
            {
              q: "Does it cover both campaigns and support?",
              a: "Yes — both in one view. Campaign deliverability, open rates, and conversions sit alongside agent CSAT, resolution rate, and first-response time on the same dashboard, so you see how each affects the other.",
            },
            {
              q: "Can I export the data?",
              a: "Yes. Every report is exportable, and you can schedule automated deliveries to your team or stakeholders — CSV, PDF, or direct to their inbox on whatever cadence you set.",
            },
            {
              q: "Is sentiment analysis included?",
              a: "Yes. Sentiment and trend insights are surfaced automatically across your conversations — you see the most common questions, how customers feel about them, and how that shifts over time.",
            },
          ]}
        />

        {/* ── INTERNAL LINKS ────────────────────────────────────── */}
        <Section tone="muted">
          <div className="mx-auto max-w-3xl">
            <SectionHeader eyebrow="Explore more" title="Related resources" />
            <ul className="mt-6 space-y-3">
              {[
                { href: "/products/ai-agentic/",         label: "How agentic AI works" },
                { href: "/products/omnichannel-inbox/",  label: "Omnichannel inbox — one place for every channel" },
                { href: "/products/ai-agents/",          label: "AI Agents — automate support and sales" },
                { href: "/compare/",                     label: "Compare SMSLocal with alternatives" },
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
          title="See what is really driving your customer experience."
          subtitle="Connect your channels and get a live view of agent performance, campaign results, and customer sentiment — all in one dashboard."
          primaryCta={{ label: "Get a Demo", href: "/company/contact/" }}
          secondaryCta={{ label: "Start Free", href: "/signup/" }}
        />
      </main>
      <SiteFooter />
    </>
  )
}
