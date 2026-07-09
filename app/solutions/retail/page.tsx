import type { Metadata } from "next"
import { getPageMetadata } from "@/lib/seo"
import {
  BellRing,
  Bot,
  Cake,
  CalendarCheck,
  Clock,
  Gift,
  MessageSquareHeart,
  PartyPopper,
  Repeat,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Store,
  Tag,
  UtensilsCrossed,
} from "lucide-react"

import { AnnouncementStrip } from "@/components/landing/announcement-strip"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { RelatedContent } from "@/components/shared/related-content"
import {
  Faq,
  ProductFinalCta,
  ProductHero,
  Section,
  SectionHeader,
} from "@/components/product/product-page"
import {
  ComplianceCallout,
  IndustryPain,
  RelevantProductsGrid,
} from "@/components/solution/solution-page"
import { SolutionHeroVisual } from "@/components/solution/solution-hero-visual"
import { BreadcrumbJsonLd } from "@/components/seo/json-ld"

// ─── SEO — edit lib/seo/registry.ts or open /dev/seo to preview ──────────────
export const metadata: Metadata = getPageMetadata("/solutions/retail")

const USE_CASES = [
  { icon: Star, text: "Loyalty point balance and tier updates" },
  { icon: UtensilsCrossed, text: "Restaurant, salon, and hotel reservation confirmations" },
  { icon: CalendarCheck, text: "Reservation reminders (day-before and 2-hour)" },
  { icon: Tag, text: "Flash sale and limited-stock alerts" },
  { icon: MessageSquareHeart, text: "Post-visit feedback surveys on WhatsApp" },
  { icon: Cake, text: "Birthday and anniversary offers" },
  { icon: PartyPopper, text: "Seasonal campaigns (Diwali, Valentine's, New Year)" },
]

const FAQS = [
  {
    q: "Can I tie SMS events to my POS?",
    a: "Yes — via API triggers or Zapier-style integrations. Every checkout, reservation, or inventory change can fire a message automatically.",
  },
  {
    q: "Can I send reservation reminders without DND restrictions?",
    a: "Yes, when they're on transactional templates. Reservation confirmations, table-ready pings, and check-in codes are classified as transactional and are DND-exempt.",
  },
  {
    q: "How does the AI agent handle negative feedback?",
    a: "The agent flags negative sentiment automatically and escalates to a human manager. You can configure routing by outlet so the right GM gets the chat, not a shared inbox.",
  },
  {
    q: "Can I run one account across multiple outlets or brands?",
    a: "Yes. Create sub-accounts per outlet or brand, each with its own sender ID, templates, and wallet, all rolling up into a single master invoice.",
  },
]

export default function RetailSolutionPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Solutions", path: "/solutions" },
          { name: "Retail & Hospitality", path: "/solutions/retail" },
        ]}
      />      <SiteHeader />

      <main className="flex-1">
        <ProductHero
          compact
          eyebrow="Retail & Hospitality"
          title={
            <>
              Keep your <span className="text-primary">customers and guests</span> coming back.
            </>
          }
          subtitle="Loyalty offers, reservation confirmations, flash sales, feedback requests, and post-visit follow-up — from one dashboard."
          primaryCta={{ label: "Start Free — ₹60 Credit", href: "/signup" }}
          secondaryCta={{ label: "See Pricing", href: "/pricing" }}
          trustBar={[
            { icon: ShieldCheck, label: "DLT-compliant templates" },
            { icon: Clock, label: "Pay-as-you-go" },
            { icon: Bot, label: "AI WhatsApp for guest chats" },
            { icon: Sparkles, label: "Festive-ready throughput" },
          ]}
          visual={
            <SolutionHeroVisual
              tagLabel="Storefront feed"
              tagIcon={Store}
              volumeLabel="Customer touchpoints today"
              volumeValue="6,214"
              messages={[
                {
                  channel: "WhatsApp",
                  sender: "Reservation confirmed",
                  body: "Toit Whitefield — 7:30 PM tonight, table for 4. See you!",
                  time: "just now",
                  status: "read",
                },
                {
                  channel: "SMS",
                  sender: "Loyalty · Gold tier",
                  body: "You just earned 320 pts. Balance: 2,140. Redeem in app →",
                  time: "4m ago",
                  status: "delivered",
                },
                {
                  channel: "SMS",
                  sender: "Flash sale · 4 hrs only",
                  body: "40% off winter collection till 9 PM — SOHO Koramangala.",
                  time: "7m ago",
                  status: "delivered",
                },
                {
                  channel: "WhatsApp",
                  sender: "Post-visit · AI agent",
                  body: "Thanks for dining with us! How was your experience? 1–5",
                  time: "14m ago",
                  status: "read",
                },
              ]}
            />
          }
        />

        <Section tone="light">
          <SectionHeader eyebrow="The problem" title="Repeat visits make the margin. Messaging protects them." />
          <div className="mt-10">
            <IndustryPain
              paragraphs={[
                "Retail and hospitality run on repeat visits. Walk-in data isn't worth much if you can't reach the customer again. Loyalty programmes fail without reliable messaging, and reservation no-shows quietly kill restaurant margins.",
                "The right stack is simple: transactional SMS for booking confirmations, WhatsApp for loyalty and feedback, Quick SMS for that 4-hour flash sale, and an AI agent that picks up every customer chat — even when the floor manager can't.",
              ]}
              stat={{
                value: "1 wallet",
                label: "for every outlet and every channel — loyalty, reservations, flash sales, feedback. No per-brand contracts.",
              }}
            />
          </div>
        </Section>

        <Section tone="muted">
          <SectionHeader
            eyebrow="How SMSLocal solves it"
            title="The customer-retention stack for modern retail."
            subtitle="Loyalty messaging, reservation reminders that cut no-shows, flash sales on Quick SMS, and a WhatsApp AI agent that actually follows up on feedback."
          />
          <RelevantProductsGrid
            items={[
              {
                icon: Gift,
                title: "Loyalty programme messaging",
                description:
                  "Point-balance updates, earned-offer alerts, and tier-upgrade notifications — automated from your CRM or POS via API.",
                href: "/products/whatsapp-business-api",
                linkLabel: "WhatsApp details",
              },
              {
                icon: CalendarCheck,
                title: "Reservation confirmations and reminders",
                description:
                  "Day-before and 2-hour reminders, sent as DLT-compliant transactional SMS or WhatsApp. No-shows drop by a meaningful margin.",
                href: "/products/bulk-sms",
                linkLabel: "Transactional SMS details",
              },
              {
                icon: BellRing,
                title: "Flash sales and limited-time offers",
                description:
                  "Launch a 4-hour promo in minutes from Quick SMS — no coding, no integration, just a segmented contact list and a DLT template.",
                href: "/products/quick-sms",
                linkLabel: "Quick SMS details",
              },
              {
                icon: MessageSquareHeart,
                title: "Post-visit feedback with AI follow-up",
                description:
                  "A WhatsApp survey link goes out after checkout. The AI agent follows up on negative feedback and escalates to a human manager.",
                href: "/products/whatsapp-business-api",
                linkLabel: "AI agent details",
              },
            ]}
          />
        </Section>

        <Section tone="light">
          <SectionHeader eyebrow="Use cases" title="Every customer moment worth a message." />
          <ul className="mt-12 grid gap-3 md:grid-cols-2">
            {USE_CASES.map((uc) => {
              const Icon = uc.icon
              return (
                <li
                  key={uc.text}
                  className="flex items-start gap-3 rounded-xl border border-border bg-background p-4"
                >
                  <span className="mt-0.5 inline-flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/15">
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>
                  <span className="text-sm leading-relaxed text-foreground sm:text-[15px]">{uc.text}</span>
                </li>
              )
            })}
          </ul>
        </Section>

        <Section tone="muted">
          <ComplianceCallout title="Transactional and promotional, routed correctly by default.">
            <p>
              Reservation reminders and loyalty balance updates sit in the transactional bucket — DND-exempt on
              pre-approved DLT templates. Flash sales, discount codes, and festive campaigns are promotional and stay
              in the 10 AM–9 PM window per TRAI rules.
            </p>
            <p>
              SMSLocal classifies each template correctly at registration and enforces the right delivery window
              without extra configuration from your team.
            </p>
          </ComplianceCallout>
        </Section>

        <Faq eyebrow="FAQ" title="Questions we hear from retail and F&B operators." items={FAQS} />

        <RelatedContent path="/solutions/retail" />

        <ProductFinalCta
          title="Messaging that drives repeat visits."
          subtitle="Free trial with ₹60 credit. Loyalty, reservations, and flash sales from day one."
          primaryCta={{ label: "Start Free — ₹60 Credit", href: "/signup" }}
          secondaryCta={{ label: "See Pricing", href: "/pricing" }}
        />
      </main>

      <SiteFooter />
    </div>
  )
}
