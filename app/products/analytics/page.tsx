import type { Metadata } from "next"
import Link from "next/link"
import { getPageMetadata } from "@/lib/seo"
import {
  ArrowRight,
  BarChart2,
  BarChart3,
  Download,
  Heart,
  Sparkles,
  TrendingUp,
} from "lucide-react"
import { SiteHeader } from "@/components/landing/site-header"
import { ExploreMore } from "@/components/product/explore-more"
import { SiteFooter } from "@/components/landing/site-footer"
import { FaqSection } from "@/components/landing/faq-section"
import { AnalyticsHero } from "@/components/product/analytics-hero"
import { BreadcrumbJsonLd, FaqJsonLd, ProductServiceJsonLd } from "@/components/seo/json-ld"
import { Section, StatsBand } from "@/components/product/product-page"
import { GsFinalCta } from "@/components/home/gs/sections-c"
import {
  AnalyticsFeatures,
  AnalyticsGlossary,
  AnalyticsProblem,
  AnalyticsStyles,
  AnalyticsWhyItWorks,
  AnalyticsWhySmsLocal,
} from "@/components/product/analytics-sections"

export const metadata: Metadata = getPageMetadata("/products/analytics")

const BTN = "group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-primary to-[oklch(0.55_0.13_172)] px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:shadow-xl hover:shadow-primary/30"
const BTN_OUT = "inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3.5 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"

const TRUST = [
  { icon: BarChart2, label: "Real-time dashboards" },
  { icon: Heart, label: "CSAT, NPS, and resolution" },
  { icon: TrendingUp, label: "Deliverability and engagement" },
  { icon: Download, label: "Exportable reports" },
]

const FAQ = [
  {
    q: "What does SMSLocal analytics measure?",
    a: "It measures both support and campaigns in one dashboard: first-response time, resolution rate, CSAT and NPS for conversations, plus deliverability, open rates, clicks and conversions for SMS, WhatsApp and RCS campaigns.",
  },
  {
    q: "Does it cover both campaigns and support?",
    a: "Yes, both in one view. Campaign deliverability, open rates and conversions sit alongside agent CSAT, resolution rate and first-response time on the same dashboard, so you see how each affects the other.",
  },
  {
    q: "What is CSAT and how is it calculated?",
    a: "CSAT (customer satisfaction score) is the share of customers who rate a conversation positively: satisfied responses divided by total responses, multiplied by 100. SMSLocal collects and tracks it automatically across channels.",
  },
  {
    q: "What is NPS and how does it differ from CSAT?",
    a: "NPS (Net Promoter Score) measures how likely customers are to recommend you: the percentage of promoters minus the percentage of detractors, from -100 to +100. CSAT rates a single interaction, while NPS reflects the wider relationship.",
  },
  {
    q: "Can I export the data?",
    a: "Yes. Every report is exportable, and you can schedule automated deliveries to your team or stakeholders as CSV or PDF, or straight to their inbox on whatever cadence you set.",
  },
  {
    q: "Is sentiment analysis included?",
    a: "Yes. Sentiment and trend insights are surfaced automatically across your conversations: the most common questions, how customers feel about them, and how that shifts over time.",
  },
  {
    q: "Are the dashboards real time?",
    a: "Yes. Dashboards update live as conversations and campaigns happen, so you do not wait for end-of-day reports or overnight batch jobs.",
  },
  {
    q: "Can I see AI agent performance separately from human agents?",
    a: "Yes. You can compare how the AI agent and your human team perform on first-response time, resolution rate and CSAT, and see which conversations needed a handoff.",
  },
]

const RELATED = [
  { href: "/channels/whatsapp/", label: "WhatsApp Business API", hint: "Official API, templates and AI replies" },
  { href: "/channels/web-chat/", label: "Website live chat widget", hint: "AI chat for every visitor" },
  { href: "/products/voice/", label: "Business voice calling", hint: "Calls inside your support inbox" },
  { href: "/products/rcs/", label: "RCS business messaging", hint: "Verified, branded rich cards" },
]

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
      <FaqJsonLd items={FAQ} path="/products/analytics" />
      <SiteHeader />
      <main>

        {/* ── HERO ──────────────────────────────────────────────── */}
        <section className="relative isolate overflow-hidden bg-background">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 opacity-50 [background-image:radial-gradient(var(--border)_1.2px,transparent_1.2px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_at_72%_48%,black_10%,transparent_70%)]" />
          </div>
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-14 pt-14 sm:px-6 lg:grid-cols-[1fr_580px] lg:items-stretch lg:gap-8 lg:pb-20 lg:pt-12">
            <div className="an-rise min-w-0">
              <p className="inline-flex items-center gap-2 rounded-full bg-foreground px-3.5 py-1.5 text-[12.5px] font-medium text-background">
                <Sparkles className="h-3.5 w-3.5 text-accent" />Products &middot; Analytics &amp; Insights
              </p>
              <h1 className="mt-6 text-balance text-[30px] font-semibold leading-[1.1] tracking-[-0.035em] sm:text-[42px]">
                Agentic AI Analytics That Show <span className="text-primary">What Actually Matters</span>
              </h1>
              <p className="mt-5 max-w-lg text-pretty text-[17px] leading-relaxed text-muted-foreground">
                Real-time dashboards for agent performance, customer sentiment, and campaign results, in one view.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link href="/company/contact/" className={BTN}>Get a Demo <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" /></Link>
                <Link href="/signup/" className={BTN_OUT}>Start your trial</Link>
              </div>
              <ul className="mt-8 grid max-w-lg grid-cols-1 gap-x-8 gap-y-3 text-[14px] text-muted-foreground sm:grid-cols-2">
                {TRUST.map((t) => (
                  <li key={t.label} className="flex items-start gap-2.5 leading-snug"><t.icon className="mt-[1px] h-4 w-4 shrink-0 text-primary" /><span>{t.label}</span></li>
                ))}
              </ul>
            </div>
            <div className="an-rise min-w-0" style={{ animationDelay: "0.15s" }}>
              <AnalyticsHero />
            </div>
          </div>
          <style>{`
            @keyframes an-rise { from { opacity: 0; transform: translateY(26px) } to { opacity: 1; transform: none } }
            .an-rise { animation: an-rise .9s cubic-bezier(.2,.7,.2,1) both }
            @media (prefers-reduced-motion: reduce) { .an-rise { animation: none } }
          `}</style>
        </section>

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

        <AnalyticsProblem />
        <AnalyticsFeatures />
        <AnalyticsWhyItWorks />
        <AnalyticsGlossary />
        <AnalyticsWhySmsLocal />
        <FaqSection items={FAQ} />
        <ExploreMore links={RELATED} />
        <AnalyticsStyles />
        <GsFinalCta />
      </main>
      <SiteFooter />
    </>
  )
}
