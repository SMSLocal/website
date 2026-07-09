import type { Metadata } from "next"
import Link from "next/link"
import { getPageMetadata } from "@/lib/seo"
import {
  ArrowRight,
  AlertTriangle,
  Bot,
  Clock,
  CreditCard,
  RadioTower,
  RefreshCw,
  ShieldCheck,
  Zap,
} from "lucide-react"

import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import {
  Faq,
  ProductFinalCta,
  ProductHero,
  Section,
  SectionHeader,
} from "@/components/product/product-page"
import {
  IndustryPain,
  RelevantProductsGrid,
} from "@/components/solution/solution-page"
import { SolutionHeroVisual } from "@/components/solution/solution-hero-visual"
import { BreadcrumbJsonLd } from "@/components/seo/json-ld"

// ─── SEO — edit lib/seo/registry.ts or open /dev/seo to preview ──────────────
export const metadata: Metadata = getPageMetadata("/industry/telecom")

const USE_CASES = [
  {
    icon: RefreshCw,
    title: "Plans and upgrades",
    text: "Recommend plans and process upgrades in the conversation.",
  },
  {
    icon: CreditCard,
    title: "Billing support",
    text: "Answer billing and payment questions and take action.",
  },
  {
    icon: AlertTriangle,
    title: "Notifications",
    text: "Outage and service updates over SMS, WhatsApp, and RCS.",
  },
  {
    icon: Bot,
    title: "High-volume support",
    text: "Automate the repetitive contacts that flood your queues.",
  },
]

const FAQS = [
  {
    q: "Can it scale?",
    a: "Yes, agentic AI handles high volume.",
  },
  {
    q: "Can it send outage alerts?",
    a: "Yes, across channels.",
  },
  {
    q: "Can it take billing actions?",
    a: "Yes, through integrations.",
  },
]

export default function TelecomPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industry" },
          { name: "Telecom", path: "/industry/telecom" },
        ]}
      />
      <SiteHeader />

      <main className="flex-1">
        {/* ── HERO ──────────────────────────────────────────────── */}
        <ProductHero
          compact
          eyebrow="Telecom"
          title={
            <>
              Agentic AI for <span className="text-primary">Telecom</span>
            </>
          }
          subtitle="Handle support, billing, and notifications at scale with agents that act across every channel."
          primaryCta={{ label: "Get a Demo", href: "/company/contact" }}
          secondaryCta={{ label: "Talk to Sales", href: "/company/contact" }}
          trustBar={[
            { icon: ShieldCheck, label: "Built for carriers, MVNOs, and ISPs" },
            { icon: Zap, label: "Built for high-volume sends" },
            { icon: Bot, label: "Agents that act across every channel" },
            { icon: Clock, label: "24/7 automated support" },
          ]}
          visual={
            <SolutionHeroVisual
              tagLabel="Subscriber feed"
              tagIcon={RadioTower}
              volumeLabel="Subscriber touchpoints today"
              volumeValue="1,42,908"
              messages={[
                {
                  channel: "SMS",
                  sender: "Plan expiring",
                  body: "Your plan expires today, 11:59 PM. Recharge now to avoid service interruption.",
                  time: "just now",
                  status: "delivered",
                },
                {
                  channel: "SMS",
                  sender: "Outage alert · Koramangala",
                  body: "Network maintenance in your area 1–3 AM tonight. Service may be intermittent.",
                  time: "4m ago",
                  status: "delivered",
                },
                {
                  channel: "WhatsApp",
                  sender: "Agent · Support",
                  body: "Your current plan has 4.2 GB data left, valid till 9 Jul. Want to upgrade your plan?",
                  time: "19m ago",
                  status: "read",
                },
              ]}
            />
          }
        />

        {/* ── THE PROBLEM ───────────────────────────────────────── */}
        <Section tone="light">
          <SectionHeader
            eyebrow="The problem"
            title="At telecom scale, every unhandled query is a queue."
          />
          <div className="mt-10">
            <IndustryPain
              paragraphs={[
                "Telecom support runs at massive volume, and customers expect instant answers on plans, bills, and outages. A missed expiry reminder means a lapsed connection; a subscriber who hits their data limit with no warning calls in frustrated instead of simply buying a top-up pack.",
                "Agentic AI absorbs the volume and acts on each request — resolving balance checks, plan details, recharge help, and basic connectivity troubleshooting end-to-end, and nudging the right plan or data-pack upgrade based on actual usage.",
              ]}
              stat={{
                value: "Millions",
                label: "of subscriber touchpoints handled by agents that act, not just answer.",
              }}
            />
          </div>
        </Section>

        {/* ── WHY IT WORKS ──────────────────────────────────────── */}
        <Section tone="muted">
          <SectionHeader
            eyebrow="Why it works"
            title="Self-serve instantly, escalate only exceptions."
            subtitle="Customers self-serve common requests instantly, your team handles exceptions, and proactive notifications cut inbound volume."
          />
          <RelevantProductsGrid
            items={[
              {
                icon: Bot,
                title: "Agentic AI for plans and billing",
                description:
                  "Recommend plans, process upgrades, and answer billing questions with agents that take action, not just reply.",
                href: "/products/ai-agentic",
                linkLabel: "Agentic AI details",
              },
              {
                icon: RefreshCw,
                title: "Recharge and bill reminders",
                description:
                  "Expiry and payment-due alerts sent as high-throughput transactional SMS, timed to each subscriber's cycle to cut disconnections.",
                href: "/products/bulk-sms",
                linkLabel: "Bulk SMS details",
              },
              {
                icon: AlertTriangle,
                title: "Notifications across every channel",
                description:
                  "Outage and service updates delivered over SMS, WhatsApp, and RCS so subscribers hear it from you first.",
                href: "/products/omnichannel-inbox",
                linkLabel: "Omnichannel inbox details",
              },
              {
                icon: ShieldCheck,
                title: "Why SMSLocal",
                description:
                  "Support, billing, and notifications share one record across every channel and campaign.",
                href: "/compare",
                linkLabel: "See how we compare",
              },
            ]}
          />
        </Section>

        {/* ── USE CASES ─────────────────────────────────────────── */}
        <Section tone="light">
          <SectionHeader eyebrow="Use cases" title="Every subscriber moment, at scale." />
          <ul className="mt-12 grid gap-3 md:grid-cols-2">
            {USE_CASES.map((uc) => {
              const Icon = uc.icon
              return (
                <li
                  key={uc.title}
                  className="flex items-start gap-3 rounded-xl border border-border bg-background p-4"
                >
                  <span className="mt-0.5 inline-flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/15">
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>
                  <span className="text-sm leading-relaxed text-foreground sm:text-[15px]">
                    <span className="font-semibold">{uc.title}.</span> {uc.text}
                  </span>
                </li>
              )
            })}
          </ul>
        </Section>

        {/* ── FAQ ───────────────────────────────────────────────── */}
        <Faq eyebrow="FAQ" title="Questions we hear from telecom operators." items={FAQS} />

        {/* ── INTERNAL LINKS ────────────────────────────────────── */}
        <Section tone="muted">
          <div className="mx-auto max-w-3xl">
            <SectionHeader eyebrow="Explore more" title="Related resources" />
            <ul className="mt-6 space-y-3">
              {[
                { href: "/products/ai-agentic", label: "Agentic AI — act, not just answer" },
                { href: "/products/bulk-sms", label: "Bulk SMS — high-throughput transactional alerts" },
                { href: "/products/omnichannel-inbox", label: "Omnichannel Inbox — every channel, one queue" },
                { href: "/compare", label: "See how SMSLocal compares" },
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
          title="Scale telecom support with agentic AI."
          subtitle="Support, billing, and notifications handled by agents that act across every channel."
          primaryCta={{ label: "Get a Demo", href: "/company/contact" }}
          secondaryCta={{ label: "Talk to Sales", href: "/company/contact" }}
        />
      </main>

      <SiteFooter />
    </div>
  )
}
