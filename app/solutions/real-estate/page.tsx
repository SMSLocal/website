import type { Metadata } from "next"
import { getPageMetadata } from "@/lib/seo"
import {
  Bot,
  Building2,
  Calendar,
  CalendarDays,
  FileText,
  Handshake,
  Home,
  KeyRound,
  Languages,
  MapPin,
  MessageSquareHeart,
  Repeat,
  ShieldCheck,
  Target,
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
export const metadata: Metadata = getPageMetadata("/solutions/real-estate")

const USE_CASES = [
  { icon: Home, text: "New-listing alerts matching buyer preferences" },
  { icon: CalendarDays, text: "Open-house and site-visit invitations" },
  { icon: Bot, text: "Buyer qualification via AI WhatsApp agent" },
  { icon: FileText, text: "Document submission for bookings" },
  { icon: Handshake, text: "Loan application coordination" },
  { icon: KeyRound, text: "Possession and registration updates" },
  { icon: Repeat, text: "Post-handover follow-up and referral asks" },
]

const FAQS = [
  {
    q: "Can the AI agent qualify leads outside business hours?",
    a: "Yes — it runs 24/7. Hot leads are flagged for the sales team first thing the next morning, with the full conversation and captured answers attached.",
  },
  {
    q: "Can I personalise listings by buyer preference?",
    a: "Yes. Segment by city, budget band, configuration, and property type, and send personalised broadcasts only to the buyers a listing actually suits.",
  },
  {
    q: "How do you avoid looking spammy to high-value buyers?",
    a: "By matching listings to stated preferences, capping campaign frequency, and letting buyers opt into WhatsApp where messaging feels personal rather than blasted.",
  },
]

export default function RealEstateSolutionPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Solutions", path: "/solutions" },
          { name: "Real Estate", path: "/solutions/real-estate" },
        ]}
      />
      <AnnouncementStrip />
      <SiteHeader />

      <main className="flex-1">
        <ProductHero
          eyebrow="Real Estate"
          title={
            <>
              Close more deals with <span className="text-primary">timely, personal</span> messaging.
            </>
          }
          subtitle="New listing alerts, open-house invites, buyer follow-ups, and lead nurture flows — personalised, DLT-compliant, and in the client's preferred language."
          primaryCta={{ label: "Start Free — ₹60 Credit", href: "/signup" }}
          secondaryCta={{ label: "See Pricing", href: "/pricing" }}
          trustBar={[
            { icon: ShieldCheck, label: "DLT-compliant templates" },
            { icon: Target, label: "Preference-based segmentation" },
            { icon: Bot, label: "AI qualification, 24/7" },
            { icon: Languages, label: "8 languages for client chats" },
          ]}
          visual={
            <SolutionHeroVisual
              tagLabel="Sales pipeline feed"
              tagIcon={Building2}
              volumeLabel="Buyer touchpoints today"
              volumeValue="1,842"
              messages={[
                {
                  channel: "SMS",
                  sender: "New listing · Whitefield",
                  body: "3BHK, 1,420 sqft, ₹1.8 Cr — ready to move. Details →",
                  time: "just now",
                  status: "delivered",
                },
                {
                  channel: "WhatsApp",
                  sender: "AI qualifier · Prestige Meridian",
                  body: "Namaste Ankit, budget 1.5–2 Cr pe 3BHK dekh rahe ho? Let me line up 3 options.",
                  time: "3m ago",
                  status: "read",
                },
                {
                  channel: "SMS",
                  sender: "Open house invite",
                  body: "This Sunday 11 AM–4 PM at Palm Grove. RSVP: openhouse.in/rsvp/palmgrove",
                  time: "7m ago",
                  status: "delivered",
                },
                {
                  channel: "WhatsApp",
                  sender: "Nurture · Day 30",
                  body: "Hi Divya, prices in HSR stable this quarter. Want to revisit your saved 2BHKs?",
                  time: "12m ago",
                  status: "read",
                },
              ]}
            />
          }
        />

        <Section tone="light">
          <SectionHeader eyebrow="The problem" title="Real estate leads go cold in days." />
          <div className="mt-10">
            <IndustryPain
              paragraphs={[
                "Spray-and-pray SMS annoys more than it converts. Buyers want property-specific information, not generic \u201Cwe have homes\u201D spam. English-only communication loses a majority of the Indian home-buying market before you ever get a reply.",
                "The winning motion is personal, multilingual, and patient — listings that match stated preferences, an AI qualifier that filters the tyre-kickers out, and a nurture sequence that shows up at the right moment across 30, 60, and 90 days.",
              ]}
              stat={{
                value: "24/7",
                label: "AI WhatsApp qualification so a 9 PM enquiry doesn't go cold overnight. Your team wakes up to hot leads, not hopes.",
              }}
            />
          </div>
        </Section>

        <Section tone="muted">
          <SectionHeader
            eyebrow="How SMSLocal solves it"
            title="Segment, qualify, and nurture — on one platform."
            subtitle="Bulk SMS for targeted listing alerts, WhatsApp for open-house invites and AI qualification, and scheduled nurture flows that keep patient buyers warm."
          />
          <RelevantProductsGrid
            items={[
              {
                icon: MapPin,
                title: "Listing alerts by preference",
                description:
                  "Segment buyers by city, budget band, and configuration. Send only the listings that actually fit — over SMS, WhatsApp, or both.",
                href: "/products/bulk-sms",
                linkLabel: "Bulk SMS details",
              },
              {
                icon: Calendar,
                title: "Open-house and site-visit invites",
                description:
                  "Templated SMS and WhatsApp messages with a tap-through calendar invite. RSVP tracking into your CRM via webhooks.",
                href: "/products/bulk-sms",
                linkLabel: "Campaigns details",
              },
              {
                icon: Bot,
                title: "AI WhatsApp qualification",
                description:
                  "The AI agent asks qualification questions — budget, location, timeline — and hands hot leads to your sales team with full context.",
                href: "/products/whatsapp-business-api",
                linkLabel: "AI agent details",
              },
              {
                icon: MessageSquareHeart,
                title: "Nurture flows over 30/60/90 days",
                description:
                  "Scheduled WhatsApp and SMS sequences for leads who aren\u2019t ready today. Stay useful, not pushy, until they are.",
                href: "/products/whatsapp-business-api",
                linkLabel: "WhatsApp details",
              },
            ]}
          />
        </Section>

        <Section tone="light">
          <SectionHeader eyebrow="Use cases" title="Every step of the buyer journey, messaged well." />
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
          <ComplianceCallout title="Real estate promotional messaging — opt-in, templates, 10 AM to 9 PM.">
            <p>
              Listing alerts and open-house invites sit in the promotional category. That means opt-in from the buyer,
              a DLT-registered promotional template, and delivery within the TRAI 10 AM–9 PM window.
            </p>
            <p>
              Transactional messaging — booking confirmations, registration updates, loan coordination — stays
              DND-exempt on transactional templates. SMSLocal routes both correctly with no extra configuration.
            </p>
          </ComplianceCallout>
        </Section>

        <Faq eyebrow="FAQ" title="Questions from sales leaders and marketers." items={FAQS} />

        <RelatedContent path="/solutions/real-estate" />

        <ProductFinalCta
          title="Never let a lead go cold."
          subtitle="Start free with ₹60 credit. Qualify buyers on WhatsApp 24/7, without a monthly plan."
          primaryCta={{ label: "Start Free — ₹60 Credit", href: "/signup" }}
          secondaryCta={{ label: "See Pricing", href: "/pricing" }}
        />
      </main>

      <SiteFooter />
    </div>
  )
}
