import type { Metadata } from "next"
import { getPageMetadata } from "@/lib/seo"
import {
  Bell,
  Bot,
  Clock,
  Gift,
  KeyRound,
  MessageCircle,
  PackageCheck,
  RotateCcw,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Tag,
  Truck,
  Zap,
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
export const metadata: Metadata = getPageMetadata("/solutions/ecommerce")

const USE_CASES = [
  { icon: PackageCheck, text: "Order confirmation SMS plus a WhatsApp receipt" },
  { icon: Truck, text: "Shipping notifications with a live tracking link" },
  { icon: KeyRound, text: "Delivery OTPs for cash-on-delivery orders" },
  { icon: MessageCircle, text: "Cart abandonment follow-ups in the shopper's language" },
  { icon: Tag, text: "Festive sale broadcasts to opt-in WhatsApp subscribers" },
  { icon: Bell, text: "Back-in-stock alerts for out-of-stock products" },
  { icon: Gift, text: "Loyalty point balances and earned-offer alerts" },
  { icon: RotateCcw, text: "Return and refund status updates" },
]

const FAQS = [
  {
    q: "Can I integrate with Shopify, WooCommerce, or Magento?",
    a: "Yes — via our REST API and webhooks. Direct plugin integrations are on the roadmap and will be listed in /developers when available.",
  },
  {
    q: "Does cart recovery work in regional languages?",
    a: "Yes. The AI WhatsApp agent replies in the language the customer writes in — Hindi, Tamil, Telugu, Bengali, Marathi, Gujarati, Kannada, or English.",
  },
  {
    q: "Can I do both SMS and WhatsApp from one dashboard?",
    a: "Yes. One wallet, both channels, the same reporting. No switching tools to blast a Diwali promo and send an OTP.",
  },
  {
    q: "Is there a minimum commitment or monthly plan?",
    a: "No. Every channel is pay-as-you-go — you only pay for messages you send. Unused credit is valid for 24 months.",
  },
]

export default function EcommerceSolutionPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Solutions", path: "/solutions" },
          { name: "E-commerce & D2C", path: "/solutions/ecommerce" },
        ]}
      />      <SiteHeader />

      <main className="flex-1">
        <ProductHero
          compact
          eyebrow="E-commerce & D2C"
          title={
            <>
              SMS and WhatsApp for India&apos;s fastest-growing{" "}
              <span className="text-primary">D2C brands</span>.
            </>
          }
          subtitle="Confirm orders, recover carts, blast festive sales, and run AI WhatsApp agents that nudge browsers to buy — all from one dashboard."
          primaryCta={{ label: "Start Free — ₹60 Credit", href: "/signup" }}
          secondaryCta={{ label: "See Pricing", href: "/pricing" }}
          trustBar={[
            { icon: ShieldCheck, label: "DLT-compliant templates" },
            { icon: Bot, label: "AI WhatsApp in 8 Indian languages" },
            { icon: Zap, label: "Sub-second OTP routing" },
            { icon: Clock, label: "Pay-as-you-go, 24-month validity" },
          ]}
          visual={
            <SolutionHeroVisual
              tagLabel="Live shop feed"
              tagIcon={ShoppingCart}
              volumeLabel="Orders messaged today"
              volumeValue="12,486"
              messages={[
                {
                  channel: "SMS",
                  sender: "Shipped — Order #A48219",
                  body: "Your order from Nutri&Bloom is out for delivery. Track live →",
                  time: "2m ago",
                  status: "delivered",
                },
                {
                  channel: "WhatsApp",
                  sender: "Cart recovery · AI agent",
                  body: "Rohit, aapka cart abhi save hai. 10% off code: COMEBACK10",
                  time: "4m ago",
                  status: "read",
                },
                {
                  channel: "OTP",
                  sender: "Checkout OTP",
                  body: "482193 is your one-time password. Valid for 5 mins.",
                  time: "6m ago",
                  status: "delivered",
                },
                {
                  channel: "SMS",
                  sender: "Diwali sale — opt-in list",
                  body: "Flat 40% off site-wide till midnight. Shop now →",
                  time: "11m ago",
                  status: "sent",
                },
              ]}
            />
          }
        />

        {/* The problem */}
        <Section tone="light">
          <SectionHeader eyebrow="The problem" title="Fragmented messaging leaks revenue." />
          <div className="mt-10">
            <IndustryPain
              paragraphs={[
                "E-commerce in India runs on messaging. Order confirmations, OTP verification, shipping updates, cart-recovery nudges, Diwali and Black Friday blasts — every one of them is revenue or retention.",
                "Most platforms are either SMS-only, or WhatsApp-only with a ₹2,000+/month lock-in, or stitched together across three vendors and two dashboards. That fragmentation means slow deliveries, lost carts, and a support team chasing ghosts.",
              ]}
              stat={{
                value: "₹2,000+/mo",
                label: "what brands typically pay to get WhatsApp-only — before a single message is sent. SMSLocal is pay-as-you-go across every channel.",
              }}
            />
          </div>
        </Section>

        {/* How SMSLocal solves it */}
        <Section tone="muted">
          <SectionHeader
            eyebrow="How SMSLocal solves it"
            title="One wallet. Every D2C messaging use case."
            subtitle="Transactional alerts, OTPs, WhatsApp AI, and bulk festive campaigns — all on DLT-compliant rails, all on the same credit balance."
          />
          <RelevantProductsGrid
            items={[
              {
                icon: PackageCheck,
                title: "Order alerts & shipping updates",
                description:
                  "DLT-approved transactional templates for every order event. 24/7 delivery with smart route failover so updates land on time.",
                href: "/products/otp-sms",
                linkLabel: "Transactional SMS details",
              },
              {
                icon: Bot,
                title: "Cart recovery with AI WhatsApp",
                description:
                  "Train an AI agent on your catalogue. It follows up on abandoned carts, answers product questions, and closes the sale — in the language the customer shops in.",
                href: "/products/whatsapp-business-api",
                linkLabel: "WhatsApp + AI details",
              },
              {
                icon: Sparkles,
                title: "Festive campaigns at scale",
                description:
                  "Diwali, Holi, Independence Day, Black Friday — launch multi-million-SMS blasts with smart route failover so the 7pm send actually lands at 7pm.",
                href: "/products/bulk-sms",
                linkLabel: "Bulk SMS details",
              },
              {
                icon: KeyRound,
                title: "Login & checkout OTPs",
                description:
                  "Priority route with 98% under 1 sec delivery on clean traffic. Automatic retry and fallback to keep conversions from dropping.",
                href: "/products/otp-sms",
                linkLabel: "OTP API details",
              },
            ]}
          />
        </Section>

        {/* Use cases */}
        <Section tone="light">
          <SectionHeader
            eyebrow="Use cases"
            title="The messaging an e-commerce brand actually runs in a week."
          />
          <ul className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-2">
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

        {/* Compliance */}
        <Section tone="muted">
          <ComplianceCallout title="DND-exempt transactional templates, compliant promotional sends.">
            <p>
              Transactional SMS and WhatsApp utility messages — order confirmations, shipping updates, OTPs — are
              exempt from DND restrictions when sent on DLT-approved templates.
            </p>
            <p>
              Promotional SMS and WhatsApp marketing templates require opt-in from the customer and go out between
              10&nbsp;AM and 9&nbsp;PM per TRAI rules. SMSLocal enforces both windows automatically.
            </p>
          </ComplianceCallout>
        </Section>

        <Faq eyebrow="FAQ" title="E-commerce questions we get from brands every week." items={FAQS} />

        <RelatedContent path="/solutions/ecommerce" />

        <ProductFinalCta
          title="Start selling more with every message."
          subtitle="Free trial with ₹60 credit. No card, no monthly plan, no lock-in — just send."
          primaryCta={{ label: "Start Free — ₹60 Credit", href: "/signup" }}
          secondaryCta={{ label: "See Pricing", href: "/pricing" }}
        />
      </main>

      <SiteFooter />
    </div>
  )
}
