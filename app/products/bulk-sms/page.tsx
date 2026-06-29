import type { Metadata } from "next"
import { getPageMetadata } from "@/lib/seo"
import {
  Building2,
  GraduationCap,
  HeartPulse,
  Home,
  Languages,
  RefreshCw,
  Search,
  ShieldCheck,
  ShoppingBag,
  SplitSquareHorizontal,
  Truck,
  Waypoints,
  Zap,
} from "lucide-react"
import { AnnouncementStrip } from "@/components/landing/announcement-strip"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { RelatedContent } from "@/components/shared/related-content"
import {
  CapabilityGrid,
  CompareTable,
  DeepDiveFeatures,
  Faq,
  HowItWorks,
  ProductEditorialBand,
  ProductFinalCta,
  ProductHero,
  TechnicalBlock,
  UseCasesGrid,
} from "@/components/product/product-page"
import { BulkSmsVisual } from "@/components/product/bulk-sms-visual"
import { BreadcrumbJsonLd, ProductServiceJsonLd } from "@/components/seo/json-ld"

// ─── SEO — edit lib/seo/registry.ts or open /dev/seo to preview ──────────────
export const metadata: Metadata = getPageMetadata("/products/bulk-sms")

export default function BulkSmsPage() {
  return (
    <>
      <ProductServiceJsonLd
        name="Bulk SMS India"
        description="DLT-compliant bulk SMS with smart route failover, AI-powered routing, wrong-number detection and real-time delivery reports for Indian businesses."
        path="/products/bulk-sms"
        category="Bulk SMS marketing and notifications"
      />
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
          { name: "Bulk SMS", path: "/products/bulk-sms" },
        ]}
      />      <SiteHeader />
      <main>
        <ProductHero
          eyebrow="Bulk SMS"
          title={<>Bulk SMS that actually gets delivered</>}
          subtitle="Launch DLT-compliant bulk SMS campaigns with smart route failover, real-time delivery reports, and AI-powered routing that hits 98% delivery in under one second. Built for Indian businesses since 2019."
          primaryCta={{ label: "Start Free — ₹60 Credit", href: "https://app.smslocal.in/signup" }}
          secondaryCta={{ label: "See pricing", href: "/pricing" }}
          trustBar={[
            { icon: Zap, label: "98% delivery in under 1 second" },
            { icon: ShieldCheck, label: "99.99% platform uptime" },
            { icon: ShieldCheck, label: "DLT-compliant · TRAI-approved" },
            { icon: Languages, label: "10+ Indian languages (Unicode)" },
          ]}
          visual={<BulkSmsVisual />}
        />

        <CapabilityGrid
          eyebrow="Capabilities"
          title="Built so more of your messages actually arrive"
          subtitle="Four systems that quietly protect your delivery rate — turned on by default for every tier."
          items={[
            {
              icon: SplitSquareHorizontal,
              title: "Smart route failover",
              body: "Primary carrier slows down or fails? Traffic automatically switches to a backup route in real time, keeping your delivery rate high even during peak hours like festival sales.",
            },
            {
              icon: Search,
              title: "Wrong-number detection",
              body: "Invalid numbers are flagged before send, so your credits aren't wasted on numbers that will never receive. Saves 5–15% on typical campaign lists.",
            },
            {
              icon: RefreshCw,
              title: "Failed-campaign resend",
              body: "Messages that fail on the primary route are automatically retried on an alternate route. Recovers 10–30% of deliveries other platforms simply write off.",
            },
            {
              icon: Waypoints,
              title: "Real-time analytics",
              body: "Live delivery feed during sends. Per-carrier breakdown. Click tracking on links. Export reports for stakeholders in one click.",
            },
          ]}
        />

        <HowItWorks
          eyebrow="How it works"
          title="From signup to live campaign in a morning"
          subtitle="DLT registration support is included — our team handles the portal dance across Jio, Airtel, Vi and BSNL."
          steps={[
            {
              title: "Sign up free",
              body: "Create your account in 2 minutes. Get ₹60 credit to test every feature. No card, no commitment.",
            },
            {
              title: "Register your DLT entity",
              body: "Add your DLT-approved entity and upload your PE certificate. Our team helps across every major operator portal.",
            },
            {
              title: "Upload, template, send",
              body: "Import your CSV, choose a DLT-approved template, schedule or send immediately.",
            },
            {
              title: "Watch live, optimise, repeat",
              body: "Real-time delivery reports. Per-carrier breakdown. Click tracking. Export for stakeholders.",
            },
          ]}
        />

        <DeepDiveFeatures
          eyebrow="Under the hood"
          title="Three things that make Indian SMS actually work at scale"
          items={[
            {
              title: "DLT in the dashboard, not outside it",
              body: "Every step of DLT compliance — entity registration, Sender ID approval, template submission and PE-TM binding — is tracked inside your SMSLocal dashboard. You don't have to juggle tabs between Jio's DLT portal, Airtel's, and ours. We handle the portal dance for you and surface approvals in one status view.",
              image: "/products/bulk-sms-dlt-compliance-dashboard.png",
              imageAlt:
                "SMSLocal dashboard showing DLT compliance status — entity registration, Sender ID approval and template submission tracked across Jio, Airtel, Vi and BSNL in one view.",
            },
            {
              title: "10+ Indian languages, one Unicode engine",
              body: "Send SMS in Hindi, Tamil, Telugu, Bengali, Marathi, Gujarati, Kannada, Malayalam, Punjabi, Odia and more. Unicode support is built in, character counts are calculated correctly, and regional-language templates are approved through the same DLT flow.",
              image: "/products/bulk-sms-indian-language-unicode-sms.png",
              imageAlt:
                "Bulk SMS composer rendering regional-language messages in Hindi, Tamil and Telugu with a live Unicode character count on the SMSLocal platform.",
              href: "/long-sms-messages",
              linkLabel: "How long SMS messages are billed",
            },
            {
              title: "Built for Indian scale, not global dashboards",
              body: "We're not a US or European platform adapted for India — we're built for India from day one. Direct operator connections with every major Indian telecom, TRAI time windows enforced automatically, and regional-language rendering tested on popular Indian handsets.",
              image: "/products/bulk-sms-built-for-indian-scale.png",
              imageAlt:
                "SMSLocal's India-first bulk SMS infrastructure with direct operator connections to Jio, Airtel, Vi and BSNL and automatic TRAI time-window enforcement.",
            },
          ]}
        />

        <ProductEditorialBand
          layout="split"
          src="/products/bulk-sms-delivery-reports-dashboard.png"
          imageWidth={1400}
          imageHeight={500}
          alt="SMSLocal bulk SMS delivery dashboard showing every send, real-time delivery receipts, per-carrier breakdown and automatic retries for millions of messages in a single view."
          eyebrow="Built for scale"
          headline="Every send, every delivery receipt, every retry — in one view."
          caption="Teams running millions of messages a month need to see what shipped, what bounced, and what&apos;s still in the queue without opening five tools."
        />

        <UseCasesGrid
          eyebrow="Use cases"
          title="What Indian businesses send with Bulk SMS"
          subtitle="Every industry has its own delivery profile — explore the playbooks."
          items={[
            { industry: "E-commerce", use: "Order confirmations, cart recovery, festive sales", icon: ShoppingBag, href: "/solutions/ecommerce" },
            { industry: "Banking & Fintech", use: "Transaction alerts, account notifications", icon: Building2, href: "/solutions/banking-fintech" },
            { industry: "Healthcare", use: "Appointment reminders, lab results, prescription refills", icon: HeartPulse, href: "/solutions/healthcare" },
            { industry: "Education", use: "Fee reminders, results, exam schedules", icon: GraduationCap, href: "/solutions/education" },
            { industry: "Logistics", use: "Dispatch alerts, delivery OTPs", icon: Truck, href: "/solutions/logistics" },
            { industry: "Real Estate", use: "Listing alerts, open-house invites", icon: Home, href: "/solutions/real-estate" },
          ]}
        />

        <TechnicalBlock
          eyebrow="For developers"
          title="Drop-in REST API, six SDKs, webhook DLRs"
          subtitle="Sandbox mode for free testing. Full delivery receipts for every message."
          items={[
            { label: "Endpoint", value: "POST /v1/sms/send" },
            { label: "Authentication", value: "Bearer token" },
            { label: "SDKs", value: "PHP · Java · Python · Node.js · C# · JavaScript" },
            { label: "Webhooks", value: "Delivery receipts in real time" },
            { label: "Sandbox", value: "Free mock route for integration testing" },
            { label: "Docs", value: "/developers/api-docs" },
          ]}
          cta={{ label: "View API docs", href: "/developers/api-docs" }}
        />

        <Faq
          eyebrow="FAQs"
          title="Bulk SMS — the common questions"
          items={[
            { q: "What's the minimum amount to start sending bulk SMS?", a: "₹60 free credit on signup, or top-up from ₹100 onwards." },
            { q: "Do I need DLT registration to send bulk SMS in India?", a: "Yes — DLT is mandatory under TRAI rules. Our team helps you register across every operator." },
            { q: "Can I send promotional SMS to DND numbers?", a: "No. Promotional SMS goes to non-DND numbers only, between 10 AM and 9 PM IST. Transactional SMS goes to all numbers, 24/7." },
            { q: "How fast are messages delivered?", a: "98% of messages land in under 1 second thanks to direct operator connections." },
            { q: "Can I send SMS in Hindi, Tamil, or other Indian languages?", a: "Yes. Unicode is built in; 10+ Indian scripts are supported." },
            { q: "Do credits expire?", a: "Tier 1 (₹100–₹3,999) has unlimited validity. Every higher tier is valid for 24 months." },
            { q: "Is there a monthly subscription or setup fee?", a: "No. No setup fee, no monthly plan, no commitment." },
            { q: "What's the delivery rate I should expect?", a: "98–99% on clean DLT-compliant traffic. Wrong numbers and failed campaigns are recovered automatically." },
          ]}
        />

        <CompareTable
          eyebrow="Compared"
          title="SMSLocal vs other Indian bulk SMS providers"
          subtitle="A quick look at the capabilities that decide whether your campaign lands."
          columns={["SMSLocal", "Fast2SMS", "Textlocal", "MSG91"]}
          rows={[
            { feature: "Volume-tier pricing", cells: ["yes", "yes", "partial", "yes"] },
            { feature: "Wrong-number detection", cells: ["yes", "no", "no", "no"] },
            { feature: "Failed-campaign resend", cells: ["yes", "no", "no", "partial"] },
            { feature: "Smart route failover", cells: ["yes", "no", "partial", "partial"] },
            { feature: "DLT fully managed in-app", cells: ["yes", "partial", "yes", "yes"] },
            { feature: "WhatsApp Business API integrated", cells: ["yes", "partial", "no", "yes"] },
            { feature: "AI agents in 8 Indian languages", cells: ["yes", "no", "no", "no"] },
          ]}
          footnote="Tick marks reflect publicly documented capabilities at time of publication and should be re-verified before launch."
          ctaLabel="See the full Bulk SMS comparison"
          ctaHref="/compare/smslocal-vs-msg91"
        />

        <RelatedContent path="/products/bulk-sms" />

        <ProductFinalCta
          title="Ready to send?"
          subtitle="₹60 free credit. Two-minute signup. DLT registration support included."
          primaryCta={{ label: "Start Free — ₹60 Credit", href: "https://app.smslocal.in/signup" }}
          secondaryCta={{ label: "See pricing", href: "/pricing" }}
        />
      </main>
      <SiteFooter />
    </>
  )
}
