import type { Metadata } from "next"
import Link from "next/link"
import { getPageMetadata } from "@/lib/seo"
import {
  ArrowRight,
  Bot,
  Calendar,
  Clock,
  Globe2,
  Languages,
  Percent,
  Plane,
  PlaneTakeoff,
  ShieldCheck,
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
export const metadata: Metadata = getPageMetadata("/industry/travel-and-hospitality")

const USE_CASES = [
  {
    icon: PlaneTakeoff,
    title: "Bookings and reservations",
    text: "Schedule and confirm inside the conversation, with availability checks.",
  },
  {
    icon: Calendar,
    title: "Itinerary management",
    text: "Updates, changes, and reminders over SMS, WhatsApp, or email.",
  },
  {
    icon: Languages,
    title: "24/7 multilingual support",
    text: "Answers around the clock in multiple Indian and international languages.",
  },
  {
    icon: Percent,
    title: "Upsells and campaigns",
    text: "Upgrades, add-ons, and offers broadcast across channels.",
  },
]

const FAQS = [
  {
    q: "Is it multilingual?",
    a: "Yes, multiple languages including major Indian languages.",
  },
  {
    q: "Can it book?",
    a: "Yes, with availability checks and confirmations.",
  },
  {
    q: "Can it send reminders?",
    a: "Yes, across channels.",
  },
]

export default function TravelHospitalityPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industry" },
          { name: "Travel & Hospitality", path: "/industry/travel-and-hospitality" },
        ]}
      />
      <SiteHeader />

      <main className="flex-1">
        {/* ── HERO ──────────────────────────────────────────────── */}
        <ProductHero
          compact
          eyebrow="Travel & Hospitality"
          title={
            <>
              Agentic AI for <span className="text-primary">Travel and Hospitality</span>
            </>
          }
          subtitle="Handle bookings, itineraries, and support around the clock with agents that act, not just answer."
          primaryCta={{ label: "Get a Demo", href: "/company/contact" }}
          secondaryCta={{ label: "Start Free", href: "/signup" }}
          trustBar={[
            { icon: ShieldCheck, label: "Built for airlines, hotels, OTAs, and tour operators" },
            { icon: Clock, label: "24/7 multilingual support" },
            { icon: Bot, label: "Agents that act, not just answer" },
            { icon: Globe2, label: "Every touch on one record" },
          ]}
          visual={
            <SolutionHeroVisual
              tagLabel="Traveler feed"
              tagIcon={Plane}
              volumeLabel="Traveler touchpoints today"
              volumeValue="9,842"
              messages={[
                {
                  channel: "WhatsApp",
                  sender: "Booking confirmed · 6E 204",
                  body: "Your flight BLR → DEL on 12 Jul, 6:45 AM is confirmed. PNR: XJ92KL.",
                  time: "just now",
                  status: "read",
                },
                {
                  channel: "SMS",
                  sender: "Itinerary update",
                  body: "12951 Mumbai Rajdhani is running 40 min late. New arrival: 11:10 PM.",
                  time: "3m ago",
                  status: "delivered",
                },
                {
                  channel: "WhatsApp",
                  sender: "Agent · Booking",
                  body: "Room's ready 2 hours early if you'd like. Also, the rooftop restaurant has a table free at 8 PM — want it booked?",
                  time: "15m ago",
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
            title="A missed message can mean a lost booking."
          />
          <div className="mt-10">
            <IndustryPain
              paragraphs={[
                "Travelers ask questions at all hours and in many languages, and a missed message can mean a lost booking. A gate change buried in an inbox, a question asked at 11 PM, or a follow-up that never happens each turn into a support call, a missed connection, or a booking made with a competitor instead.",
                "Agentic AI books, updates, and supports instantly, in the traveler's language — acting on availability checks and confirmations rather than just answering questions, so nothing waits on a call center queue.",
              ]}
              stat={{
                value: "24/7",
                label: "instant booking, updates, and support in the traveler's language.",
              }}
            />
          </div>
        </Section>

        {/* ── WHY IT WORKS ──────────────────────────────────────── */}
        <Section tone="muted">
          <SectionHeader
            eyebrow="Why it works"
            title="Instant help, more bookings, fewer no-shows."
            subtitle="Travelers get instant help in their language, you capture more bookings, and reminders cut no-shows — all from one platform."
          />
          <RelevantProductsGrid
            items={[
              {
                icon: PlaneTakeoff,
                title: "Bookings and reservations",
                description:
                  "Schedule and confirm bookings inside the conversation, with real-time availability checks before anything is promised.",
                href: "/products/ai-agents/booking",
                linkLabel: "Booking agent details",
              },
              {
                icon: Calendar,
                title: "Itinerary management",
                description:
                  "Updates, changes, and reminders delivered over SMS, WhatsApp, or email, so travelers always know what's next.",
                href: "/products/whatsapp-business-api",
                linkLabel: "WhatsApp details",
              },
              {
                icon: Bot,
                title: "Agentic AI for every touchpoint",
                description:
                  "One agentic layer books, updates, and supports travelers automatically, escalating to a human only when it truly needs one.",
                href: "/products/ai-agentic",
                linkLabel: "Agentic AI details",
              },
              {
                icon: Globe2,
                title: "Why SMSLocal",
                description:
                  "Bookings, reminders, and campaigns share one customer record, so every touch knows the traveler's trip.",
                href: "/compare",
                linkLabel: "See how we compare",
              },
            ]}
          />
        </Section>

        {/* ── USE CASES ─────────────────────────────────────────── */}
        <Section tone="light">
          <SectionHeader eyebrow="Use cases" title="Every stage of the journey, covered." />
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
        <Faq eyebrow="FAQ" title="Questions we hear from travel and hospitality teams." items={FAQS} />

        {/* ── INTERNAL LINKS ────────────────────────────────────── */}
        <Section tone="muted">
          <div className="mx-auto max-w-3xl">
            <SectionHeader eyebrow="Explore more" title="Related resources" />
            <ul className="mt-6 space-y-3">
              {[
                { href: "/products/ai-agents/booking", label: "AI Agents — booking automation" },
                { href: "/products/ai-agentic", label: "Agentic AI — act, not just answer" },
                { href: "/products/whatsapp-business-api", label: "WhatsApp Business API — rich itinerary messages" },
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
          title="Serve travelers with agentic AI."
          subtitle="Bookings, itineraries, and support handled by agents that act, not just answer."
          primaryCta={{ label: "Get a Demo", href: "/company/contact" }}
          secondaryCta={{ label: "Start Free", href: "/signup" }}
        />
      </main>

      <SiteFooter />
    </div>
  )
}
