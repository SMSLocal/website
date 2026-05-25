import type { Metadata } from "next"
import { getPageMetadata } from "@/lib/seo"
import { AnnouncementStrip } from "@/components/landing/announcement-strip"
import { ChannelsShowcase } from "@/components/landing/channels-showcase"
import { DashboardShowcase } from "@/components/landing/dashboard-showcase"
import { HeroShowcase } from "@/components/landing/hero-showcase"
import { ComplianceStrip } from "@/components/landing/compliance-strip"
import { DeveloperStrip } from "@/components/landing/developer-strip"
import { Differentiators } from "@/components/landing/differentiators"
import { FinalCta } from "@/components/landing/final-cta"
import { Hero } from "@/components/landing/hero"
import { HowItWorks } from "@/components/landing/how-it-works"
import { Industries } from "@/components/landing/industries"
import { LogoRow } from "@/components/landing/logo-row"
import { PricingTeaser } from "@/components/landing/pricing-teaser"
import { ProductTiles } from "@/components/landing/product-tiles"
import { SiteFooter } from "@/components/landing/site-footer"
import { SiteHeader } from "@/components/landing/site-header"
import { StatsStrip } from "@/components/landing/stats-strip"
import { Testimonials } from "@/components/landing/testimonials"
import { FaqJsonLd } from "@/components/seo/json-ld"

// ─── SEO — edit lib/seo/registry.ts or open /dev/seo to preview ──────────────
export const metadata: Metadata = getPageMetadata("/")

/**
 * Homepage FAQ — these are the most-searched baseline questions for a
 * messaging platform in India. They live as structured data (FAQPage schema)
 * so Google can show them as rich results in search, and they mirror what
 * the support team already answers most days.
 */
const HOMEPAGE_FAQS = [
  {
    q: "What is SMSLocal?",
    a: "SMSLocal is an Indian messaging platform that lets businesses send DLT-compliant bulk SMS, WhatsApp Business API messages, OTP verifications, and run AI agents across eight Indian languages — all from one dashboard, with a single API and a single wallet.",
  },
  {
    q: "Is SMSLocal DLT-compliant?",
    a: "Yes. SMSLocal is registered on all four operator DLT portals (Jio, Airtel, Vi, BSNL) and handles Principal Entity registration, Sender ID allotment, and content template approvals for customers. Every SMS is sent against a pre-approved template ID so it passes TRAI TCCCPR 2018 checks.",
  },
  {
    q: "How much does SMSLocal cost?",
    a: "SMS pricing starts at ₹0.12 per message for transactional SMS at higher volumes. WhatsApp Business API is billed per conversation (utility, marketing, authentication, service) as per Meta's rates, with zero platform markup on the first slab. OTP SMS starts at ₹0.15 with priority routing. Every new account gets ₹60 of free credit to test on live numbers before paying.",
  },
  {
    q: "Do I need a credit card to start?",
    a: "No. Signup is free, gets you ₹60 of credit instantly, and does not ask for a card. Add credits later via UPI, net banking, or card when you are ready to scale past the free credit.",
  },
  {
    q: "Which Indian carriers does SMSLocal support?",
    a: "Direct-operator connectivity on Reliance Jio, Bharti Airtel, Vodafone Idea (Vi), and BSNL. Routing is priority-based with automatic failover, so OTPs and transactional traffic take the fastest available path at that moment.",
  },
  {
    q: "Can I use SMSLocal for WhatsApp Business API?",
    a: "Yes. SMSLocal is a Meta-registered WhatsApp Business Solution Provider (BSP). We handle the green-tick display name, template approvals, webhook setup, and team inbox — so you can run broadcasts, automations, and support conversations from the same dashboard as your SMS.",
  },
  {
    q: "Does SMSLocal have an API?",
    a: "Yes. A modern REST API with idempotency keys, signed webhooks, per-route delivery receipts, and official SDKs for Node.js, Python, PHP, and Go. A sandbox mode lets you simulate delivery, retries, and carrier failures without charging credit.",
  },
  {
    q: "Where is my data stored?",
    a: "All customer data and message logs are stored in India, on infrastructure that complies with the Digital Personal Data Protection Act (DPDPA) 2023. A signed Data Processing Agreement (DPA) is available for all customers on request.",
  },
]

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col bg-background">
      <FaqJsonLd items={HOMEPAGE_FAQS} path="/" />
      <AnnouncementStrip />
      <SiteHeader />
      <Hero />
      <HeroShowcase />
      <ChannelsShowcase />
      <DashboardShowcase />
      <LogoRow />
      <ProductTiles />
      <StatsStrip />
      <HowItWorks />
      <Differentiators />
      <Industries />
      <PricingTeaser />
      <ComplianceStrip />
      <DeveloperStrip />
      <Testimonials />
      <FinalCta />
      <SiteFooter />
    </main>
  )
}
