import type { Metadata } from "next"
import Link from "next/link"
import { getPageMetadata } from "@/lib/seo"
import {
  ArrowRight,
  MapPin,
  PhoneCall,
  PhoneOutgoing,
  Sparkles,
} from "lucide-react"
import { AnnouncementStrip } from "@/components/landing/announcement-strip"
import { SiteHeader } from "@/components/landing/site-header"
import { ExploreMore } from "@/components/product/explore-more"
import { GsFinalCta } from "@/components/home/gs/sections-c"
import { SiteFooter } from "@/components/landing/site-footer"
import { RelatedContent } from "@/components/shared/related-content"
import { VoiceHubScene } from "@/components/product/voice-hub-scene"
import { VoiceCapabilities } from "@/components/product/voice-capabilities"
import { VoiceFlow } from "@/components/product/voice-flow"
import { VoiceRightFit } from "@/components/product/voice-right-fit"
import { VoiceReporting } from "@/components/product/voice-reporting"
import { VoiceTestimonials } from "@/components/product/voice-testimonials"
import { FaqSection } from "@/components/landing/faq-section"
import { FAQS } from "@/components/product/voice-faq"
import { BreadcrumbJsonLd, FaqJsonLd, ProductServiceJsonLd } from "@/components/seo/json-ld"

export const metadata: Metadata = getPageMetadata("/products/voice")

const BTN = "group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-primary to-[oklch(0.55_0.13_172)] px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:shadow-xl hover:shadow-primary/30"
const BTN_OUT = "inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3.5 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"

const EXPLORE = [
  { href: "/numbers/did/", label: "DID and virtual numbers", hint: "Local and toll-free numbers" },
  { href: "/products/analytics/", label: "Agentic AI analytics", hint: "CSAT, sentiment and campaign results" },
  { href: "/products/integrations/", label: "Integrations and API", hint: "Shopify, HubSpot, REST API and more" },
  { href: "/channels/web-chat/", label: "Website live chat widget", hint: "AI chat for every visitor" },
]

const TRUST = [
  { icon: MapPin, label: "$5/mo local numbers" },
  { icon: PhoneCall, label: "$15/mo toll-free numbers" },
  { icon: PhoneOutgoing, label: "$0.008/min outbound" },
  { icon: Sparkles, label: "30–40% below telecom pricing" },
]

export default function VoicePage() {
  return (
    <>
      <ProductServiceJsonLd
        name="SMSLocal Voice — Phone Support in Your Inbox"
        description="Handle inbound and outbound customer calls directly inside your support inbox, with click-to-call, business phone numbers, call context, and team collaboration."
        path="/products/voice"
        category="Voice support and business calling software"
      />
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
          { name: "Voice", path: "/products/voice" },
        ]}
      />
      <FaqJsonLd items={FAQS} path="/products/voice" />
      <AnnouncementStrip />
      <SiteHeader />
      <main className="voice-tight">
        {/* 1 ─ Hero */}
        <section className="relative isolate overflow-hidden bg-background">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-14 pt-14 sm:px-6 lg:grid-cols-[1fr_580px] lg:items-stretch lg:gap-8 lg:pb-20 lg:pt-12">
            <div className="vc-rise">
              <p className="inline-flex items-center gap-2 rounded-full bg-foreground px-3.5 py-1.5 text-[12.5px] font-medium text-background">
                <Sparkles className="h-3.5 w-3.5 text-accent" />SMSLocal Voice
              </p>
              <h1 className="mt-6 text-balance text-[30px] font-semibold leading-[1.1] tracking-[-0.035em] sm:text-[42px]">
                Customer calls, directly inside your <span className="text-primary">support inbox.</span>
              </h1>
              <p className="mt-5 max-w-lg text-pretty text-[17px] leading-relaxed text-muted-foreground">
                Handle inbound and outbound calls without switching tools — phone support, customer context, and conversations in one workspace.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link href="/signup/" className={BTN}>Add Voice <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" /></Link>
                <Link href="/company/contact/" className={BTN_OUT}>Book a demo</Link>
              </div>
              <ul className="mt-8 grid max-w-lg grid-cols-1 gap-x-8 gap-y-3 text-[14px] text-muted-foreground sm:grid-cols-2">
                {TRUST.map((t) => (
                  <li key={t.label} className="flex items-start gap-2.5 leading-snug"><t.icon className="mt-[1px] h-4 w-4 shrink-0 text-primary" /><span>{t.label}</span></li>
                ))}
              </ul>
            </div>
            <div className="vc-rise" style={{ animationDelay: "0.15s" }}>
              <VoiceHubScene />
            </div>
          </div>
          <style>{`
            @keyframes vc-rise { from { opacity: 0; transform: translateY(26px) } to { opacity: 1; transform: none } }
            .vc-rise { animation: vc-rise .9s cubic-bezier(.2,.7,.2,1) both }
            @media (prefers-reduced-motion: reduce) { .vc-rise { animation: none } }
          `}</style>
        </section>

        {/* 2 ─ Capabilities showcase */}
        <VoiceCapabilities />

        {/* 2b ─ How it works */}
        <VoiceFlow />

        {/* 3 ─ Reporting */}
        <VoiceReporting />

        {/* 5 ─ The honest fit */}
        <VoiceRightFit />

        <VoiceTestimonials />

        <FaqSection items={FAQS} />

        <RelatedContent path="/products/voice" />

        <ExploreMore links={EXPLORE} />

        {/* Final CTA */}
        <GsFinalCta />
      </main>
      <SiteFooter />
    </>
  )
}

