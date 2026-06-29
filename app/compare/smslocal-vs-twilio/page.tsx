import type { Metadata } from "next"
import { getPageMetadata } from "@/lib/seo"
import {
  Building2,
  CircleDollarSign,
  Clock,
  Flag,
  Globe2,
  Sparkles,
} from "lucide-react"
import { AnnouncementStrip } from "@/components/landing/announcement-strip"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { RelatedContent } from "@/components/shared/related-content"
import { ProductFinalCta, Section, SectionHeader } from "@/components/product/product-page"
import { BreadcrumbJsonLd } from "@/components/seo/json-ld"
import {
  CompareHero,
  CompareMethodology,
  CompareTableHonest,
  OtherCompares,
  PersonaSplit,
  WinsBlock,
  type CompareRow,
  type PersonaCard,
} from "@/components/compare/compare-page"

// ─── SEO — edit lib/seo/registry.ts or open /dev/seo to preview ──────────────
export const metadata: Metadata = getPageMetadata("/compare/smslocal-vs-twilio")

const ROWS: CompareRow[] = [
  {
    feature: "India DLT-compliant SMS, native workflow",
    us: "yes",
    them: "partial",
    note: "Twilio supports DLT; most Indian teams find the flow heavier than on India-native platforms.",
  },
  {
    feature: "INR-denominated billing with GST invoices",
    us: "yes",
    them: "partial",
    note: "Twilio bills primarily in USD; INR billing + GST paths exist via resellers and specific entities.",
  },
  {
    feature: "Local Indian support hours + human support",
    us: "yes",
    them: "partial",
    note: "Twilio has 24×7 support; IST-hour human coverage is thinner without an enterprise plan.",
  },
  {
    feature: "Same-day DLT + WhatsApp onboarding",
    us: "yes",
    them: "partial",
  },
  {
    feature: "OTP API with dedicated India priority route",
    us: "yes",
    them: "yes",
  },
  {
    feature: "WhatsApp Business API (official BSP)",
    us: "yes",
    them: "yes",
    note: "Twilio is a Meta-approved WhatsApp partner globally.",
  },
  {
    feature: "Visual WhatsApp chatbot / flow builder",
    us: "yes",
    them: "partial",
    note: "Twilio ships Flex / Studio; Studio is powerful but has a steeper learning curve than a focused no-code builder.",
  },
  {
    feature: "AI WhatsApp agent (multilingual) on the core plan",
    us: "yes",
    them: "partial",
    note: "Twilio has AI capabilities across its products; an Indic-tuned WhatsApp agent on the core plan is not the default.",
  },
  {
    feature: "Shared team inbox",
    us: "yes",
    them: "partial",
    note: "Twilio Flex is a full contact-center; it is more than an inbox and priced accordingly.",
  },
  {
    feature: "Six official SDKs for SMS/WhatsApp",
    us: "yes",
    them: "yes",
    note: "Twilio's SDK ecosystem is the widest in the industry.",
  },
  {
    feature: "Idempotency keys on bulk + OTP endpoints",
    us: "yes",
    them: "yes",
  },
  {
    feature: "Signed webhooks with retries",
    us: "yes",
    them: "yes",
  },
  {
    feature: "Sandbox mode that routes end-to-end",
    us: "yes",
    them: "yes",
  },
  {
    feature: "Voice / IVR and programmable video",
    us: "no",
    them: "yes",
    note: "Twilio has deep voice, video, and Authy/Verify products. We focus on SMS, WhatsApp, OTP, and AI agents.",
  },
  {
    feature: "Global 200+ country messaging footprint",
    us: "partial",
    them: "yes",
  },
  {
    feature: "Contact-center platform (Flex)",
    us: "no",
    them: "yes",
  },
  {
    feature: "Transparent pay-as-you-go pricing without an enterprise sale",
    us: "yes",
    them: "partial",
    note: "Twilio's self-serve pricing is published, but complex deployments typically move to enterprise contracts.",
  },
  {
    feature: "In-India data residency",
    us: "yes",
    them: "partial",
    note: "Twilio offers regional data residency options; India-specific residency has varied by product.",
  },
]

const US_WINS = [
  {
    title: "India-native by design",
    description:
      "DLT workflows, INR pricing, GST invoices, IST-hour support, and same-day onboarding — built into the core product, not bolted on via a reseller or a regional edge.",
    icon: Flag,
  },
  {
    title: "Predictable INR costs without an enterprise motion",
    description:
      "One public rate card in INR. No USD-to-INR forex swing on your bill, no enterprise call to unlock a reasonable rate. An Indian SMB can start, scale, and predict spend without a finance review.",
    icon: CircleDollarSign,
  },
  {
    title: "Same-day onboarding for DLT + WhatsApp",
    description:
      "PE registration, templates, sender ID, and a production WhatsApp number in a single business day. Twilio DLT flows work — they are just heavier to live through.",
    icon: Clock,
  },
  {
    title: "AI WhatsApp agent on the core plan",
    description:
      "Our 8-language Indic-tuned AI agent is part of the base product. If you want a WhatsApp agent trained on Indian languages without stitching together Flex + Studio + a third-party LLM — we ship that on day one.",
    icon: Sparkles,
  },
]

const THEM_WINS = [
  {
    title: "True global footprint and product breadth",
    description:
      "Twilio runs messaging, voice, video, and a contact-center across 200+ countries. If you are a multinational operating across US, EU, APAC, and India — under one vendor — Twilio has honest breadth we do not match.",
    icon: Globe2,
  },
  {
    title: "Enterprise-grade platform surface (Flex, Verify, Segment)",
    description:
      "Twilio Flex, Verify, Authy, Segment, and Studio make up an enterprise platform. If your RFP explicitly asks for all of those under one contract, Twilio is the honest pick.",
    icon: Building2,
  },
]

const US_PICKS: PersonaCard[] = [
  {
    title: "The Indian buyer who wants INR pricing and IST support",
    description:
      "Most of your volume is in India. You want published INR pricing with GST invoices, a human in the support channel during IST hours, and a DLT flow that feels native instead of bolted-on.",
    bullets: [
      "Published INR rate card, GST invoices out-of-the-box",
      "Same-day DLT + WhatsApp onboarding",
      "IST-hour human support on the core tier",
    ],
  },
  {
    title: "The team that needs WhatsApp + AI agents, not a contact-center",
    description:
      "You want WhatsApp, an AI agent, and a shared inbox — not Flex, not Studio, not a programmable contact-center. Twilio can do it; it's just heavier than you need.",
    bullets: [
      "WhatsApp flows, inbox, and AI agent on the core tier",
      "No Flex / Studio learning curve for a simple inbox",
      "One dashboard for SMS + WhatsApp + OTP",
    ],
  },
]

const THEM_PICKS: PersonaCard[] = [
  {
    title: "The global enterprise buying messaging, voice, video, and CC together",
    description:
      "If you are a multinational running WhatsApp, SMS, voice, video, and a contact-center across US, EU, APAC, and India — under one contract — Twilio's product breadth is the honest answer.",
    bullets: [
      "200+ country messaging + voice + video footprint",
      "Flex contact-center, Verify, Segment in the same vendor",
      "Enterprise SLAs and deep integrations ecosystem",
    ],
  },
]

export default function CompareTwilioPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Compare", path: "/compare" },
          { name: "SMSLocal vs Twilio", path: "/compare/smslocal-vs-twilio" },
        ]}
      />      <SiteHeader />

      <main className="flex-1">
        <CompareHero
          competitor="Twilio"
          tagline="A global CPaaS vs an India-native pay-as-you-go platform."
          intro="Twilio is the largest global CPaaS — messaging, voice, video, Verify, Flex, Segment — across 200+ countries. SMSLocal is an India-native CPaaS focused on SMS, WhatsApp, OTP, and AI agents with INR pricing, GST invoices, DLT-native workflows, and IST-hour support. If you are a multinational buying messaging, voice, and a contact-center together, Twilio is an honest pick — this page covers where each actually wins for an Indian buyer."
          lastUpdated="April 2026"
        />

        <Section className="border-b border-foreground/5">
          <SectionHeader
            eyebrow="Feature-by-feature"
            title="Eighteen rows, publicly sourced."
            subtitle="Tick means fully supported. Amber means partial or gated. Grey means not currently available."
          />
          <div className="mt-10 space-y-6">
            <CompareTableHonest competitor="Twilio" rows={ROWS} />
            <CompareMethodology />
          </div>
        </Section>

        <section className="bg-muted/30 border-b border-foreground/5 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <SectionHeader
              eyebrow="Who wins what"
              title="Four wins for us, two for them."
              subtitle="We are India-native, INR-priced, and faster to onboard. They have a global footprint and enterprise breadth. Pick based on where your buyers actually are."
              center
            />
            <div className="mt-12">
              <WinsBlock competitor="Twilio" usWins={US_WINS} themWins={THEM_WINS} />
            </div>
          </div>
        </section>

        <Section className="border-b border-foreground/5">
          <SectionHeader
            eyebrow="Who should pick what"
            title="Matching the platform to the buyer."
            subtitle="Two personas for us, one for Twilio. If you don't see yourself in these personas, talk to both teams."
            center
          />
          <div className="mt-12">
            <PersonaSplit competitor="Twilio" usPicks={US_PICKS} themPicks={THEM_PICKS} />
          </div>
        </Section>

        <section className="bg-muted/30 border-b border-foreground/5 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <OtherCompares currentSlug="smslocal-vs-twilio" />
          </div>
        </section>

        <RelatedContent path="/compare/smslocal-vs-twilio" />

        <ProductFinalCta
          title="See SMSLocal on INR pricing."
          subtitle="₹60 free credit, no card, no procurement cycle. Send a real DLT SMS and a real WhatsApp template in 5 minutes — then decide."
          primaryCta={{ label: "Start Free — ₹60 Credit", href: "https://app.smslocal.in/signup" }}
          secondaryCta={{ label: "See pricing", href: "/pricing" }}
        />
      </main>

      <SiteFooter />
    </div>
  )
}
