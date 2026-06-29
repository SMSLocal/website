import type { Metadata } from "next"
import { getPageMetadata } from "@/lib/seo"
import {
  MapPin,
  PhoneCall,
  PhoneOutgoing,
  Sparkles,
} from "lucide-react"
import { AnnouncementStrip } from "@/components/landing/announcement-strip"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { RelatedContent } from "@/components/shared/related-content"
import { ProductHero } from "@/components/product/product-page"
import { VoiceHeroVisual } from "@/components/product/voice-hero-visual"
import { VoiceCapabilities } from "@/components/product/voice-capabilities"
import { VoiceRightFit } from "@/components/product/voice-right-fit"
import { VoiceReporting } from "@/components/product/voice-reporting"
import { VoiceFinalCta } from "@/components/product/voice-final-cta"
import { VoiceTestimonials } from "@/components/product/voice-testimonials"
import { VoiceFaq } from "@/components/product/voice-faq"
import { BreadcrumbJsonLd, ProductServiceJsonLd } from "@/components/seo/json-ld"

export const metadata: Metadata = getPageMetadata("/products/voice")

export default function VoicePage() {
  return (
    <>
      <ProductServiceJsonLd
        name="SMSLocal AI Voice Receptionist"
        description="An AI voice receptionist that answers inbound calls 24/7, routes them, books appointments, and captures every lead — with business numbers, call context, and clean human handoff."
        path="/products/voice"
        category="AI voice receptionist software"
      />
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
          { name: "AI Voice Receptionist", path: "/products/voice" },
        ]}
      />
      <AnnouncementStrip />
      <SiteHeader />
      <main className="voice-tight">
        {/* 1 ─ Hero */}
        <ProductHero
          eyebrow="AI Voice Receptionist"
          title={
            <>
              An AI voice receptionist that <span className="text-primary">answers every call</span>.
            </>
          }
          subtitle="Answer inbound calls 24/7, route them to the right place, book appointments, and capture every lead — in your customers' language, without adding headcount."
          primaryCta={{ label: "Add Voice", href: "https://app.smslocal.in/signup" }}
          secondaryCta={{ label: "Book a demo", href: "/company/contact/" }}
          trustBar={[
            { icon: MapPin, label: "$5/mo local numbers" },
            { icon: PhoneCall, label: "$15/mo toll-free numbers" },
            { icon: PhoneOutgoing, label: "$0.008/min outbound" },
            { icon: Sparkles, label: "30–40% below telecom pricing" },
          ]}
          visual={<VoiceHeroVisual />}
          compact
        />

        {/* 2 ─ Capabilities showcase */}
        <VoiceCapabilities />

        {/* 3 ─ Reporting */}
        <VoiceReporting />

        {/* 5 ─ The honest fit */}
        <VoiceRightFit />

        <VoiceTestimonials />

        <VoiceFaq />

        <RelatedContent path="/products/voice" />

        {/* Final CTA */}
        <VoiceFinalCta />
      </main>
      <SiteFooter />
    </>
  )
}

