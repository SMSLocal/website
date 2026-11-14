import type { Metadata } from "next"
import { getPageMetadata } from "@/lib/seo"
import Link from "next/link"
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  Building2,
  Check,
  Code2,
  GitBranch,
  Image as ImageIcon,
  Layers,
  MessageSquare,
  Palette,
  Receipt,
  Shapes,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Stethoscope,
  Store,
  TrendingDown,
  Truck,
  Zap,
} from "lucide-react"
import {
  formatInr,
  formatPaiseAsRupees,
  RCS_PLANS,
  SMSLOCAL_RCS_RATE,
} from "@/lib/pricing/rcs"
import { RcsCalculator } from "@/components/lazy"
import { RcsHero } from "@/components/product/rcs-hero"
import { AnnouncementStrip } from "@/components/landing/announcement-strip"
import { SiteHeader } from "@/components/landing/site-header"
import { ExploreMore } from "@/components/product/explore-more"
import { SiteFooter } from "@/components/landing/site-footer"
import { FaqSection } from "@/components/landing/faq-section"
import { GsFinalCta } from "@/components/home/gs/sections-c"
import { RcsCompare, RcsDepth, RcsDev, RcsPricing, RcsStyles, RcsUseCases, RcsWaterfall, RcsWhy } from "@/components/product/rcs-sections"
import {
  FeatureGrid,
  BulletList,
  CompareTable,
  HowItWorks,
  UseCaseGrid,
  StatsBand,
  Faq,
  ProductEditorialBand,
  ProductFinalCta,
  Section,
  SectionHeader,
} from "@/components/product/product-page"
import { BreadcrumbJsonLd, FaqJsonLd, ProductServiceJsonLd } from "@/components/seo/json-ld"

// ─── SEO — edit lib/seo/registry.ts or open /dev/seo to preview ──────────────
export const metadata: Metadata = getPageMetadata("/products/rcs")

const BTN = "group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-primary to-[oklch(0.55_0.13_172)] px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:shadow-xl hover:shadow-primary/30"
const BTN_OUT = "inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3.5 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"

const TRUST = [
  { icon: BadgeCheck, label: "Verified sender badge" },
  { icon: Layers, label: "Rich cards & carousels" },
  { icon: MessageSquare, label: "Automatic SMS fallback" },
  { icon: GitBranch, label: "One wallet, one webhook" },
]

const FAQ = [
  {
    q: "What is RCS business messaging and how is it different from SMS?",
    a: "RCS (Rich Communication Services) is the carrier-upgraded successor to SMS. On capable Android phones it supports a verified sender, hero images, carousels, tappable suggested replies, read receipts and typing indicators, rendered natively in Google Messages. It uses the recipient's phone number and needs no separate app.",
  },
  {
    q: "Does RCS work on iPhone in India?",
    a: "Apple added RCS support in iOS 18 and it is rolling out on carriers progressively. Where RCS is available on iPhone we use it; otherwise we fall back to your DLT-compliant SMS template automatically, so your campaign reaches everyone regardless of device.",
  },
  {
    q: "Which Indian carriers support RCS?",
    a: "RCS is live on Jio and Airtel for most Android handsets using Google Messages, with Vi rolling out progressively. SMSLocal's waterfall checks each recipient's capability automatically, so you do not encode carrier logic into your product.",
  },
  {
    q: "What do I need to send branded RCS messages?",
    a: "A verified business identity (we guide you through carrier approval), your brand assets such as logo, colours and name, and one or more RCS agents that our team registers with the carriers. Once approved you can send from the dashboard or the API.",
  },
  {
    q: "How is RCS priced?",
    a: "RCS is billed per conversation or per message depending on the carrier programme. SMS fallback is billed at your existing SMSLocal SMS rate. Both appear on one consolidated GST invoice on a single wallet.",
  },
  {
    q: "Do I need to rebuild my integration to use the RCS API?",
    a: "No. If you already send SMS on SMSLocal, add a card object and a fallback template to your existing payload. Your webhook format, authentication and delivery statuses stay the same, with a channel_used field showing which path landed.",
  },
  {
    q: "Is RCS DLT-compliant?",
    a: "DLT rules in India apply to SMS. RCS follows the carriers' RCS Business Messaging programmes, with their own content and sender-verification approvals. We manage both, so you get a verified RCS brand for the rich path and a DLT SMS template for the fallback.",
  },
  {
    q: "What happens if a customer's phone does not support RCS?",
    a: "SMSLocal checks capability per number in real time. If the handset cannot receive RCS, the message is sent as your approved DLT SMS on the same operator route, and one webhook confirms which channel delivered.",
  },
  {
    q: "RCS or WhatsApp: which should I use?",
    a: "They work well together. RCS reaches Android users in their default messaging app with a verified brand and no opt-in app install, while WhatsApp reaches users inside WhatsApp. One SMSLocal API and wallet lets you run RCS, WhatsApp and SMS as a single waterfall.",
  },
]

const RELATED = [
  { href: "/channels/whatsapp/", label: "WhatsApp Business API", hint: "Official API, templates and AI replies" },
  { href: "/products/analytics/", label: "Agentic AI analytics", hint: "CSAT, sentiment and campaign results" },
  { href: "/products/integrations/", label: "Integrations and API", hint: "Shopify, HubSpot, REST API and more" },
  { href: "/numbers/did/", label: "DID and virtual numbers", hint: "Local and toll-free numbers" },
]

export default function RcsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <ProductServiceJsonLd
        name="RCS Business Messaging"
        description="Send branded, verified RCS Business Messages over Indian carrier networks with rich cards, carousels, suggested replies, and automatic DLT-compliant SMS fallback on the same wallet."
        path="/products/rcs"
        category="Rich business messaging"
      />
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
          { name: "RCS Business Messaging", path: "/products/rcs" },
        ]}
      />      <FaqJsonLd items={FAQ} path="/products/rcs" />
      <SiteHeader />
      <main className="flex-1">
        <section className="relative isolate overflow-hidden bg-background">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 opacity-50 [background-image:radial-gradient(var(--border)_1.2px,transparent_1.2px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_at_72%_48%,black_10%,transparent_70%)]" />
          </div>
          <div className="mx-auto grid max-w-7xl items-stretch gap-10 px-4 pb-14 pt-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_540px] lg:gap-8 lg:pb-16 lg:pt-12 xl:grid-cols-[minmax(0,1fr)_640px]">
            <div className="rcs-rise flex min-w-0 flex-col justify-center gap-7">
              <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-foreground px-3.5 py-1.5 text-[12.5px] font-medium text-background">
                <Sparkles className="h-3.5 w-3.5 text-accent" />RCS Business Messaging
              </p>
              <h1 className="mt-5 text-balance text-[30px] font-semibold leading-[1.1] tracking-[-0.035em] sm:text-[36px] lg:text-[32px] xl:text-[34px]">
                RCS for Indian Businesses — <span className="text-primary">Branded, Verified, Always Delivered</span>
              </h1>
              <p className="mt-4 max-w-md text-pretty text-[15.5px] leading-relaxed text-muted-foreground">
                Rich cards, carousels, and tappable replies under your verified brand on Jio, Airtel, and Vi — with automatic SMS fallback on the same wallet and webhook, so every message reaches every phone.
              </p>
              </div>
              <div>
              <div className="flex flex-wrap items-center gap-3">
                <Link href="/signup/" className={BTN}>Join RCS early access <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" /></Link>
                <Link href="/company/contact/" className={BTN_OUT}>Talk to our team</Link>
              </div>
              <ul className="mt-6 grid max-w-lg grid-cols-1 gap-x-8 gap-y-2 text-[14px] text-muted-foreground sm:grid-cols-2">
                {TRUST.map((t) => (
                  <li key={t.label} className="flex items-start gap-2.5 leading-snug"><t.icon className="mt-[1px] h-4 w-4 shrink-0 text-primary" /><span>{t.label}</span></li>
                ))}
              </ul>
              </div>
            </div>
            <div className="rcs-rise flex min-w-0 items-center" style={{ animationDelay: "0.15s" }}>
              <div className="w-full">
              <RcsHero />
              </div>
            </div>
          </div>
          <style>{`
            @keyframes rcs-rise { from { opacity: 0; transform: translateY(26px) } to { opacity: 1; transform: none } }
            .rcs-rise { animation: rcs-rise .9s cubic-bezier(.2,.7,.2,1) both }
            @media (prefers-reduced-motion: reduce) { .rcs-rise { animation: none } }
          `}</style>
        </section>

        <RcsWhy />
        <RcsWaterfall />
        <RcsDev />
        <RcsDepth />
        <RcsCompare />

        <Section>
          <StatsBand
            items={[
              { value: "Sub-1s", label: "typical RCS rendering on capable Indian handsets" },
              { value: "3x", label: "typical tap-through lift vs. equivalent plain-text SMS" },
              { value: "100%", label: "coverage: RCS where supported, DLT SMS everywhere else" },
              { value: "1 API", label: "one payload covers RCS, WhatsApp and SMS waterfall" },
            ]}
          />
        </Section>

        <RcsUseCases />

        <RcsPricing>
          <RcsCalculator id="rcs-product-calculator" variant="hero" />
        </RcsPricing>

        <FaqSection items={FAQ} />
        <ExploreMore links={RELATED} />
        <RcsStyles />
        <GsFinalCta />
      </main>
      <SiteFooter />
    </div>
  )
}
