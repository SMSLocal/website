import type { Metadata } from "next"
import Link from "next/link"
import { getPageMetadata } from "@/lib/seo"
import {
  ArrowRight,
  Bot,
  Calendar,
  Clock,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Ticket,
  Tv,
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
export const metadata: Metadata = getPageMetadata("/industry/media-entertainment")

const USE_CASES = [
  {
    icon: Ticket,
    title: "Ticketing and booking",
    text: "Assist with purchases and reservations inside the chat.",
  },
  {
    icon: Sparkles,
    title: "Recommendations",
    text: "Personalized content and event suggestions.",
  },
  {
    icon: Calendar,
    title: "Reminders and updates",
    text: "Event reminders and changes over SMS, WhatsApp, and RCS.",
  },
  {
    icon: Bot,
    title: "Subscriber support",
    text: "Answer account and billing questions around the clock.",
  },
]

const FAQS = [
  {
    q: "Can it scale for peaks?",
    a: "Yes, agentic AI absorbs high volume.",
  },
  {
    q: "Can it recommend?",
    a: "Yes, personalized to each fan.",
  },
  {
    q: "Which channels?",
    a: "SMS, WhatsApp, RCS, web, and social.",
  },
]

export default function MediaEntertainmentPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industry" },
          { name: "Media & Entertainment", path: "/industry/media-entertainment" },
        ]}
      />
      <SiteHeader />

      <main className="flex-1">
        {/* ── HERO ──────────────────────────────────────────────── */}
        <ProductHero
          compact
          eyebrow="Media & Entertainment"
          title={
            <>
              Agentic AI for <span className="text-primary">Media and Entertainment</span>
            </>
          }
          subtitle="Grow audiences and handle high volume with agents that recommend, support, and engage."
          primaryCta={{ label: "Get a Demo", href: "/company/contact" }}
          secondaryCta={{ label: "Start Free", href: "/signup" }}
          trustBar={[
            { icon: ShieldCheck, label: "Built for streaming, ticketing, sports, and publishers" },
            { icon: Clock, label: "Absorbs release-day spikes" },
            { icon: Bot, label: "Agents that recommend and support" },
            { icon: Sparkles, label: "One record per fan" },
          ]}
          visual={
            <SolutionHeroVisual
              tagLabel="Subscriber feed"
              tagIcon={Tv}
              volumeLabel="Subscriber touchpoints today"
              volumeValue="18,430"
              messages={[
                {
                  channel: "WhatsApp",
                  sender: "Renewal reminder",
                  body: "Your Premium plan renews in 3 days. Tap to update payment method.",
                  time: "just now",
                  status: "read",
                },
                {
                  channel: "SMS",
                  sender: "New release",
                  body: "Season 3 drops tonight at 8 PM. Set a reminder and never miss the premiere.",
                  time: "5m ago",
                  status: "delivered",
                },
                {
                  channel: "WhatsApp",
                  sender: "Ticket confirmed",
                  body: "2 tickets for Friday 7:30 PM show, Screen 4. QR code attached — show at entry.",
                  time: "11m ago",
                  status: "read",
                },
                {
                  channel: "WhatsApp",
                  sender: "Agent · Support",
                  body: "Your last payment went through on 2 Jul. Want a receipt sent here?",
                  time: "18m ago",
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
            title="Audiences spike, and support has to scale with them."
          />
          <div className="mt-10">
            <IndustryPain
              paragraphs={[
                "Audiences spike around releases and events, and support has to scale with them. A subscriber whose card fails silently churns. A moviegoer who never got the confirmation shows up at the counter instead of walking straight in. And a generic alert sent to everyone, instead of the fans who'd actually care, gets ignored the way any untargeted broadcast does.",
                "Agentic AI absorbs the volume, recommends content, and keeps fans engaged — clearing routine billing and account questions before they ever reach a support queue, and running real-time engagement during premieres and drops.",
              ]}
              stat={{
                value: "1 API",
                label: "for recommendations, support, and campaigns during every release-day spike.",
              }}
            />
          </div>
        </Section>

        {/* ── WHY IT WORKS ──────────────────────────────────────── */}
        <Section tone="muted">
          <SectionHeader
            eyebrow="Why it works"
            title="Instant help, relevant suggestions, support that scales."
            subtitle="Fans get instant help and relevant suggestions, support scales through peaks, and campaigns drive attendance and subscriptions."
          />
          <RelevantProductsGrid
            items={[
              {
                icon: Ticket,
                title: "Ticketing and booking",
                description:
                  "Assist with purchases and reservations inside the chat, with QR codes and seat details delivered the instant a booking confirms.",
                href: "/products/ai-agents",
                linkLabel: "AI agent details",
              },
              {
                icon: RefreshCw,
                title: "Reminders and updates",
                description:
                  "Event reminders and changes broadcast over SMS, WhatsApp, and RCS, so fans never miss a premiere or showtime.",
                href: "/channels/rcs-broadcasting",
                linkLabel: "RCS broadcasting details",
              },
              {
                icon: Bot,
                title: "Agentic AI for subscriber support",
                description:
                  "Billing questions, plan changes, and account access resolved instantly by agents that act, not just answer — with human handoff for disputes.",
                href: "/products/ai-agentic",
                linkLabel: "Agentic AI details",
              },
              {
                icon: Sparkles,
                title: "Why SMSLocal",
                description:
                  "Recommendations, support, and campaigns share one record, so every fan interaction is connected.",
                href: "/compare",
                linkLabel: "See how we compare",
              },
            ]}
          />
        </Section>

        {/* ── USE CASES ─────────────────────────────────────────── */}
        <Section tone="light">
          <SectionHeader eyebrow="Use cases" title="Every subscriber and viewer moment, covered." />
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
        <Faq eyebrow="FAQ" title="Questions we hear from OTT, ticketing, and cinema teams." items={FAQS} />

        {/* ── INTERNAL LINKS ────────────────────────────────────── */}
        <Section tone="muted">
          <div className="mx-auto max-w-3xl">
            <SectionHeader eyebrow="Explore more" title="Related resources" />
            <ul className="mt-6 space-y-3">
              {[
                { href: "/products/ai-agents", label: "AI Agents — subscriber support at scale" },
                { href: "/products/ai-agentic", label: "Agentic AI — act, not just answer" },
                { href: "/channels/rcs-broadcasting", label: "RCS Broadcasting — rich event alerts" },
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
          title="Engage audiences with agentic AI."
          subtitle="Recommendations, support, and campaigns handled by agents that act, not just answer."
          primaryCta={{ label: "Get a Demo", href: "/company/contact" }}
          secondaryCta={{ label: "Start Free", href: "/signup" }}
        />
      </main>

      <SiteFooter />
    </div>
  )
}
