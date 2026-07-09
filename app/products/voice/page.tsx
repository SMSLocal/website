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
      <AnnouncementStrip />
      <SiteHeader />
      <main className="voice-tight">
        {/* 1 ─ Hero */}
        <ProductHero
          compact
          eyebrow="SMSLocal Voice"
          title={
            <>
              Customer calls, directly inside your <span className="text-primary">support inbox</span>.
            </>
          }
          subtitle="Handle inbound and outbound calls without switching tools — phone support, customer context, and conversations in one workspace."
          primaryCta={{ label: "Add Voice", href: "/signup" }}
          secondaryCta={{ label: "Book a demo", href: "/company/contact" }}
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

