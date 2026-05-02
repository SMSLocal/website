import type { Metadata } from "next"
import { getPageMetadata } from "@/lib/seo"
import {
  Bot,
  Building2,
  CheckCircle2,
  GraduationCap,
  HeartPulse,
  Inbox,
  Languages,
  Megaphone,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Workflow,
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
import { WhatsAppVisual } from "@/components/product/whatsapp-visual"
import { BreadcrumbJsonLd, ProductServiceJsonLd } from "@/components/seo/json-ld"

// ─── SEO — edit lib/seo/registry.ts or open /dev/seo to preview ──────────────
export const metadata: Metadata = getPageMetadata("/products/whatsapp-business-api")

export default function WhatsAppPage() {
  return (
    <>
      <ProductServiceJsonLd
        name="WhatsApp Business API with AI Agents"
        description="Native WhatsApp Business API for India with visual chatbot builder, broadcasts, team inbox and AI agents that reply in 8 Indian languages."
        path="/products/whatsapp-business-api"
        category="WhatsApp Business messaging"
      />
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
          { name: "WhatsApp Business API", path: "/products/whatsapp-business-api" },
        ]}
      />
      <AnnouncementStrip />
      <SiteHeader />
      <main>
        <ProductHero
          eyebrow="WhatsApp Business API"
          title={<>WhatsApp Business API with AI agents in 8 Indian languages</>}
          subtitle="Run broadcasts, build visual chatbot flows, and let AI agents handle routine customer queries across eight Indian languages. Zero setup fee, no monthly plan — only pay for the conversations you actually have."
          primaryCta={{ label: "Start Free — ₹60 Credit", href: "/signup" }}
          secondaryCta={{ label: "See pricing", href: "/pricing" }}
          trustBar={[
            { icon: ShieldCheck, label: "Native WhatsApp BSP" },
            { icon: Languages, label: "Templates in 11 Indian languages" },
            { icon: CheckCircle2, label: "Zero setup · no monthly plan" },
            { icon: Zap, label: "Live in 10 min after Meta verification" },
          ]}
          visual={<WhatsAppVisual />}
        />

        <CapabilityGrid
          eyebrow="Capabilities"
          title="Everything WhatsApp-for-business, in one native stack"
          items={[
            {
              icon: Megaphone,
              title: "Broadcast campaigns",
              body: "Upload a segmented contact list, pick an approved template, and broadcast to thousands with per-message delivery reports. Supports images, PDFs, videos, and location cards.",
            },
            {
              icon: Workflow,
              title: "Visual chatbot builder",
              body: "Drag-and-drop flow designer. Conditional branches. CRM integration. Publish an AI-powered flow in under an hour without writing a line of code.",
            },
            {
              icon: Inbox,
              title: "Shared team inbox",
              body: "Multi-agent inbox with assignment, tags, and internal notes. AI handles the first line; humans pick up complex queries. No per-seat licence fees.",
            },
            {
              icon: Bot,
              title: "AI agents (optional add-on)",
              body: "Plug an AI agent into the same inbox to deflect 40–60% of repeat queries. Trained only on your docs, replies in whichever Indian language the customer writes in, clean handoff to humans on complex threads.",
            },
          ]}
        />

        <HowItWorks
          eyebrow="How it works"
          title="From Meta verification to first broadcast — same day"
          steps={[
            {
              title: "Sign up free",
              body: "Create a SMSLocal account. Get ₹60 credit to test WhatsApp end-to-end.",
            },
            {
              title: "Connect your Meta account",
              body: "Standard Meta Business Manager verification — usually takes under 48 hours.",
            },
            {
              title: "Top up your wallet",
              body: "Minimum ₹100 (one-time ₹60 signup bonus lands in the same wallet, so your first wallet shows ₹160). Use the balance for broadcasts, AI conversations, or utility messages.",
            },
            {
              title: "Launch",
              body: "Build your first broadcast, chatbot flow, or AI agent — no monthly plan, no commitment.",
            },
          ]}
        />

        <DeepDiveFeatures
          eyebrow="Under the hood"
          title="Built for how Indian customers actually chat"
          items={[
            {
              title: "Conversation-based pricing, transparent and auditable",
              body: "WhatsApp bills per 24-hour conversation window — utility, marketing, authentication, or service — at Meta's published India rates. We don't mark them up and we don't add a platform fee on top. Your invoice shows the Meta conversation count against every category, with GST added once at the bottom.",
            },
            {
              title: "Human handoff without handoff pain",
              body: "The AI answers what it can. Complex queries — returns, escalations, angry customers — get handed off to a human agent with full conversation context already in the shared inbox. No message history lost. No confused customer repeating themselves.",
            },
            {
              title: "Broadcasting that respects Meta's rules",
              body: "Templates are created and submitted for Meta approval through the SMSLocal dashboard. Once approved, you broadcast with full delivery tracking. Read receipts, delivery receipts, and failure reasons all surface in one view.",
            },
          ]}
        />

        <ProductEditorialBand
          src="/products/whatsapp-business-editorial.jpg"
          alt="Indian small-business shop owner at her boutique counter, smiling at a smartphone displaying a WhatsApp-style chat thread, with a warm richly-textured shop background."
          eyebrow="WhatsApp in practice"
          headline="The way your customers already talk — now wired into your systems."
          caption="A green-tick verified number, templates that Meta approves, and a single thread that carries the customer from first reply to repeat purchase."
        />

        <UseCasesGrid
          eyebrow="Use cases"
          title="The conversations every Indian business needs to have on WhatsApp"
          items={[
            { industry: "E-commerce", use: "Order confirmations, shipping updates, cart recovery by AI", icon: ShoppingBag, href: "/solutions/ecommerce" },
            { industry: "D2C brands", use: "Launch broadcasts, Diwali sales, AI-handled returns", icon: Sparkles, href: "/solutions/ecommerce" },
            { industry: "Banking & Fintech", use: "KYC reminders, account notifications, utility messages", icon: Building2, href: "/solutions/banking-fintech" },
            { industry: "Education", use: "Admissions, fee reminders, parent comms in regional languages", icon: GraduationCap, href: "/solutions/education" },
            { industry: "Healthcare", use: "Appointment reminders, prescription refills, follow-up", icon: HeartPulse, href: "/solutions/healthcare" },
            { industry: "All industries", use: "Any team that chats with customers on WhatsApp", icon: Inbox, href: "/solutions" },
          ]}
        />

        <TechnicalBlock
          eyebrow="For developers"
          title="REST API, webhooks, and template management under one token"
          items={[
            { label: "Endpoint", value: "POST /v1/whatsapp/send" },
            { label: "Webhooks", value: "Inbound + delivery events" },
            { label: "Templates", value: "Create, submit, track — via API" },
            { label: "Auth", value: "OAuth 2.0 bearer tokens" },
            { label: "SDKs", value: "PHP · Java · Python · Node.js · C# · JavaScript" },
            { label: "Docs", value: "/developers/api-docs" },
          ]}
          cta={{ label: "View API docs", href: "/developers/api-docs" }}
        />

        <Faq
          eyebrow="FAQs"
          title="WhatsApp Business API — the common questions"
          items={[
            { q: "Do I need Meta verification?", a: "Yes. WhatsApp Business API requires a verified Meta Business Manager account. We help you through it." },
            { q: "How long does WhatsApp go-live take?", a: "Typically 24–48 hours after Meta verification." },
            { q: "Is there a setup or activation fee?", a: "No. Zero setup, zero activation." },
            { q: "Is there a monthly subscription?", a: "No. You pay only for messages you send, at Meta's published rate." },
            { q: "What's the difference between utility, marketing, and service conversations?", a: "Meta bills WhatsApp in 24-hour conversation windows, priced by category. Utility conversations (like order updates and KYC reminders) are cheapest; marketing conversations (promotions) are priced highest; service conversations (when the customer writes first) are free for the first 24 hours. Our dashboard tags every thread automatically and shows the current month's bill broken down by category." },
            { q: "Can I switch from my current WhatsApp BSP?", a: "Yes — number porting is supported. Our team handles the migration." },
            { q: "Does my WhatsApp number stay the same?", a: "Yes. Your existing business number is used." },
            { q: "Can AI conversations hand off to humans mid-chat?", a: "Yes. Set handoff rules in the flow builder and the human agent picks up with full context." },
          ]}
        />

        <CompareTable
          eyebrow="Compared"
          title="SMSLocal vs other Indian WhatsApp BSPs"
          columns={["SMSLocal", "WATI", "AiSensy", "Interakt", "Gupshup"]}
          rows={[
            { feature: "Zero setup fee", cells: ["yes", "yes", "yes", "yes", "partial"] },
            { feature: "No monthly plan required", cells: ["yes", "no", "no", "no", "no"] },
            { feature: "AI agents in 8 Indian languages", cells: ["yes", "partial", "partial", "partial", "yes"] },
            { feature: "Visual flow builder", cells: ["yes", "yes", "yes", "yes", "yes"] },
            { feature: "Shared team inbox", cells: ["yes", "yes", "yes", "yes", "yes"] },
            { feature: "Pay-as-you-go wallet", cells: ["yes", "no", "no", "no", "partial"] },
          ]}
          footnote="Competitor feature sets change — re-verify tick marks before publishing."
          ctaLabel="See the full WhatsApp comparison"
          ctaHref="/compare/smslocal-vs-wati"
        />

        <RelatedContent path="/products/whatsapp-business-api" />

        <ProductFinalCta
          title="Launch WhatsApp in 10 minutes."
          subtitle="Zero setup. Zero monthly plan. Pay only for what you send. ₹60 free credit."
          primaryCta={{ label: "Start Free — ₹60 Credit", href: "/signup" }}
          secondaryCta={{ label: "See pricing", href: "/pricing" }}
        />
      </main>
      <SiteFooter />
    </>
  )
}
