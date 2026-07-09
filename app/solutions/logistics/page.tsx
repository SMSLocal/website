import type { Metadata } from "next"
import { getPageMetadata } from "@/lib/seo"
import {
  AlertTriangle,
  Bot,
  CheckCheck,
  CircleDollarSign,
  Clock,
  KeyRound,
  Languages,
  MapPin,
  Navigation,
  Package,
  PackageSearch,
  Radio,
  RotateCcw,
  ShieldCheck,
  Truck,
  UserCheck,
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
export const metadata: Metadata = getPageMetadata("/solutions/logistics")

const USE_CASES = [
  { icon: Package, text: "Order confirmation with expected delivery window" },
  { icon: Navigation, text: "Out-for-delivery SMS with live tracking link" },
  { icon: KeyRound, text: "Delivery OTP for identity verification" },
  { icon: CheckCheck, text: "Delivery complete confirmation" },
  { icon: RotateCcw, text: "Return pickup scheduled alerts" },
  { icon: UserCheck, text: "Driver shift start and end check-ins" },
  { icon: AlertTriangle, text: "Exception alerts — delayed, cancelled, re-routed" },
  { icon: CircleDollarSign, text: "COD payment confirmations" },
]

const FAQS = [
  {
    q: "Can I integrate with my WMS or TMS?",
    a: "Yes — via our REST API and webhooks. Dispatches, status changes, and exceptions can all fire messages automatically.",
  },
  {
    q: "What is the OTP delivery success rate?",
    a: "Typically 98–99% on clean DLT traffic with sub-second median delivery. OTP traffic runs on a priority route isolated from promotional bulk.",
  },
  {
    q: "Can drivers respond in regional languages?",
    a: "Yes, via WhatsApp. The AI agent replies in 8 Indian languages today — Hindi, English, Tamil, Telugu, Bengali, Marathi, Gujarati, and Kannada. Malayalam, Punjabi, and Urdu are on the near-term roadmap. The shared inbox accepts any Unicode script, so your human agents can reply in a wider set of languages than the AI covers.",
  },
  {
    q: "Can I fail over between carriers automatically?",
    a: "Yes. Smart route failover switches operators on carrier issues, so a Mumbai dispatch at 7 PM still lands even if a single SMSC degrades.",
  },
]

export default function LogisticsSolutionPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Solutions", path: "/solutions" },
          { name: "Logistics & Delivery", path: "/solutions/logistics" },
        ]}
      />      <SiteHeader />

      <main className="flex-1">
        <ProductHero
          compact
          eyebrow="Logistics & Delivery"
          title={
            <>
              Messaging built for the pace of <span className="text-primary">Indian logistics</span>.
            </>
          }
          subtitle="Dispatch alerts, delivery OTPs, live tracking, driver check-ins, and customer notifications — in every Indian language the driver or customer speaks."
          primaryCta={{ label: "Start Free — ₹60 Credit", href: "/signup" }}
          secondaryCta={{ label: "See Pricing", href: "/pricing" }}
          trustBar={[
            { icon: ShieldCheck, label: "DLT-compliant templates" },
            { icon: Radio, label: "Smart route failover" },
            { icon: Languages, label: "8 languages for drivers" },
            { icon: Clock, label: "Priority OTP lanes" },
          ]}
          visual={
            <SolutionHeroVisual
              tagLabel="Last-mile feed"
              tagIcon={Truck}
              volumeLabel="Dispatches messaged today"
              volumeValue="24,902"
              messages={[
                {
                  channel: "SMS",
                  sender: "Out for delivery · AWB 48219",
                  body: "Your package is on the way. Track live → bit.ly/48219",
                  time: "just now",
                  status: "delivered",
                },
                {
                  channel: "OTP",
                  sender: "Delivery OTP",
                  body: "482139 — share only with the delivery partner on arrival.",
                  time: "2m ago",
                  status: "delivered",
                },
                {
                  channel: "WhatsApp",
                  sender: "Driver check-in · Ramesh",
                  body: "Sir, shift start. Route 12 — 18 dispatches.",
                  time: "6m ago",
                  status: "read",
                },
                {
                  channel: "SMS",
                  sender: "Exception · delayed",
                  body: "Weather delay in Hyderabad hub. New ETA: 18:40.",
                  time: "9m ago",
                  status: "sent",
                },
              ]}
            />
          }
        />

        <Section tone="light">
          <SectionHeader eyebrow="The problem" title="A delayed SMS is a call-centre spike waiting to happen." />
          <div className="mt-10">
            <IndustryPain
              paragraphs={[
                "A delayed dispatch SMS means a call-centre spike. A lost delivery OTP means a returned package. Multi-language drivers and customers need messaging in their language, not in corporate English.",
                "Most generic SMS platforms weren't designed for last-mile chaos in India — carrier flakiness, DND restrictions, and a workforce that doesn't read English. You need routing that compensates for all three automatically.",
              ]}
              stat={{
                value: "8 languages",
                label: "supported for two-way WhatsApp driver flows — so the person actually dispatching your package understands every instruction.",
              }}
            />
          </div>
        </Section>

        <Section tone="muted">
          <SectionHeader
            eyebrow="How SMSLocal solves it"
            title="Messaging that matches how Indian logistics actually runs."
            subtitle="API-driven dispatches, priority OTPs, live tracking links, and two-way WhatsApp flows for drivers and customers."
          />
          <RelevantProductsGrid
            items={[
              {
                icon: PackageSearch,
                title: "Dispatch and delivery SMS",
                description:
                  "Auto-triggered from your WMS or TMS via API, with DLT-approved templates and smart route failover to keep the 7pm blast on time.",
                href: "/products/bulk-sms",
                linkLabel: "Transactional SMS details",
              },
              {
                icon: KeyRound,
                title: "Delivery OTPs on a priority route",
                description:
                  "Typically 98% under 1 sec on clean DLT traffic, DND-exempt via transactional template, with automatic retry on failure.",
                href: "/products/otp-sms",
                linkLabel: "OTP API details",
              },
              {
                icon: MapPin,
                title: "Live-tracking links",
                description:
                  "Send a tap-through tracking link over SMS or WhatsApp. Customers stop calling the hub for ETAs.",
                href: "/products/bulk-sms",
                linkLabel: "Bulk SMS details",
              },
              {
                icon: Bot,
                title: "Driver WhatsApp flows",
                description:
                  "Two-way WhatsApp for pickup confirmation, issue escalation, and shift check-in — in the language each driver speaks.",
                href: "/products/whatsapp-business-api",
                linkLabel: "WhatsApp details",
              },
            ]}
          />
        </Section>

        <Section tone="light">
          <SectionHeader
            eyebrow="Use cases"
            title="Every touchpoint between dispatch and delivery."
          />
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
          <ComplianceCallout title="DND-exempt transactional routes for time-sensitive logistics.">
            <p>
              Dispatch notifications, delivery OTPs, and exception alerts are classified as transactional under TRAI
              rules. They&apos;re exempt from DND restrictions when sent on pre-registered DLT templates — so a
              delivery OTP at 10:30 PM still lands.
            </p>
            <p>
              Promotional logistics messages (upsell on shipping upgrades, offer codes) require opt-in and stay in the
              10 AM–9 PM window. SMSLocal enforces both classifications automatically.
            </p>
          </ComplianceCallout>
        </Section>

        <Faq eyebrow="FAQ" title="What operations and tech teams usually ask us." items={FAQS} />

        <RelatedContent path="/solutions/logistics" />

        <ProductFinalCta
          title="Faster messaging, fewer exceptions."
          subtitle="Free trial with ₹60 credit. Dispatch your first million SMS without a monthly plan."
          primaryCta={{ label: "Start Free — ₹60 Credit", href: "/signup" }}
          secondaryCta={{ label: "See Pricing", href: "/pricing" }}
        />
      </main>

      <SiteFooter />
    </div>
  )
}
