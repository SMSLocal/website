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
      />      <SiteHeader />
      <main>
        <ProductHero
          compact
          eyebrow="WhatsApp Business API"
          title={<>WhatsApp Business API with AI agents in 8 Indian languages</>}
          subtitle="Run broadcasts, build visual chatbot flows, and let AI agents handle routine customer queries across eight Indian languages. Zero setup fee, no monthly plan — only pay for the conversations you actually have."
          primaryCta={{ label: "Start Free — ₹60 Credit", href: "/signup/" }}
          secondaryCta={{ label: "See pricing", href: "/pricing/" }}
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
              visual: (
                <svg viewBox="0 0 480 360" width="100%" xmlns="http://www.w3.org/2000/svg" aria-label="WhatsApp conversation invoice showing utility, marketing, authentication and service categories billed at Meta India rates with GST and zero platform markup">
                  <rect width="480" height="360" fill="#0a1f18" rx="12"/>
                  <rect x="16" y="16" width="448" height="328" rx="10" fill="#0d2820" stroke="rgba(255,255,255,0.07)" strokeWidth="1"/>
                  <rect x="16" y="16" width="448" height="46" rx="10" fill="#0f3025"/>
                  <rect x="16" y="46" width="448" height="16" fill="#0f3025"/>
                  <text x="32" y="44" fontFamily="system-ui,sans-serif" fontSize="13" fontWeight="700" fill="rgba(255,255,255,0.9)">WhatsApp Invoice · October 2026</text>
                  <rect x="326" y="24" width="122" height="22" rx="11" fill="rgba(37,211,102,0.12)" stroke="rgba(37,211,102,0.3)" strokeWidth="1"/>
                  <text x="387" y="39" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="10" fontWeight="600" fill="#25d366">Meta rates · No markup</text>
                  <text x="32" y="82" fontFamily="system-ui,sans-serif" fontSize="10" fontWeight="600" fill="rgba(255,255,255,0.35)" letterSpacing="0.5">CATEGORY</text>
                  <text x="230" y="82" fontFamily="system-ui,sans-serif" fontSize="10" fontWeight="600" fill="rgba(255,255,255,0.35)" letterSpacing="0.5">CONVERSATIONS</text>
                  <text x="336" y="82" fontFamily="system-ui,sans-serif" fontSize="10" fontWeight="600" fill="rgba(255,255,255,0.35)" letterSpacing="0.5">RATE</text>
                  <text x="456" y="82" textAnchor="end" fontFamily="system-ui,sans-serif" fontSize="10" fontWeight="600" fill="rgba(255,255,255,0.35)" letterSpacing="0.5">AMOUNT</text>
                  <line x1="24" y1="88" x2="456" y2="88" stroke="rgba(255,255,255,0.07)" strokeWidth="1"/>
                  <rect x="24" y="95" width="10" height="10" rx="2" fill="#3b82f6"/>
                  <text x="40" y="105" fontFamily="system-ui,sans-serif" fontSize="12" fill="rgba(255,255,255,0.8)">Utility</text>
                  <text x="230" y="105" fontFamily="system-ui,sans-serif" fontSize="12" fill="rgba(255,255,255,0.7)">12,440</text>
                  <text x="336" y="105" fontFamily="system-ui,sans-serif" fontSize="12" fill="rgba(255,255,255,0.55)">₹0.35</text>
                  <text x="456" y="105" textAnchor="end" fontFamily="system-ui,sans-serif" fontSize="12" fontWeight="600" fill="rgba(255,255,255,0.85)">₹4,354</text>
                  <line x1="24" y1="114" x2="456" y2="114" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
                  <rect x="24" y="119" width="10" height="10" rx="2" fill="#f59e0b"/>
                  <text x="40" y="129" fontFamily="system-ui,sans-serif" fontSize="12" fill="rgba(255,255,255,0.8)">Marketing</text>
                  <text x="230" y="129" fontFamily="system-ui,sans-serif" fontSize="12" fill="rgba(255,255,255,0.7)">3,820</text>
                  <text x="336" y="129" fontFamily="system-ui,sans-serif" fontSize="12" fill="rgba(255,255,255,0.55)">₹0.82</text>
                  <text x="456" y="129" textAnchor="end" fontFamily="system-ui,sans-serif" fontSize="12" fontWeight="600" fill="rgba(255,255,255,0.85)">₹3,132</text>
                  <line x1="24" y1="138" x2="456" y2="138" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
                  <rect x="24" y="143" width="10" height="10" rx="2" fill="#a78bfa"/>
                  <text x="40" y="153" fontFamily="system-ui,sans-serif" fontSize="12" fill="rgba(255,255,255,0.8)">Authentication</text>
                  <text x="230" y="153" fontFamily="system-ui,sans-serif" fontSize="12" fill="rgba(255,255,255,0.7)">8,100</text>
                  <text x="336" y="153" fontFamily="system-ui,sans-serif" fontSize="12" fill="rgba(255,255,255,0.55)">₹0.15</text>
                  <text x="456" y="153" textAnchor="end" fontFamily="system-ui,sans-serif" fontSize="12" fontWeight="600" fill="rgba(255,255,255,0.85)">₹1,215</text>
                  <line x1="24" y1="162" x2="456" y2="162" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
                  <rect x="24" y="167" width="10" height="10" rx="2" fill="#25d366"/>
                  <text x="40" y="177" fontFamily="system-ui,sans-serif" fontSize="12" fill="rgba(255,255,255,0.8)">Service (customer-initiated)</text>
                  <text x="230" y="177" fontFamily="system-ui,sans-serif" fontSize="12" fill="rgba(255,255,255,0.7)">6,200</text>
                  <text x="336" y="177" fontFamily="system-ui,sans-serif" fontSize="12" fill="rgba(255,255,255,0.55)">₹0.00</text>
                  <text x="456" y="177" textAnchor="end" fontFamily="system-ui,sans-serif" fontSize="12" fontWeight="700" fill="#25d366">Free</text>
                  <line x1="24" y1="186" x2="456" y2="186" stroke="rgba(255,255,255,0.07)" strokeWidth="1"/>
                  <text x="280" y="205" fontFamily="system-ui,sans-serif" fontSize="12" fill="rgba(255,255,255,0.45)">Subtotal</text>
                  <text x="456" y="205" textAnchor="end" fontFamily="system-ui,sans-serif" fontSize="12" fill="rgba(255,255,255,0.7)">₹8,701</text>
                  <text x="280" y="223" fontFamily="system-ui,sans-serif" fontSize="12" fill="rgba(255,255,255,0.45)">GST 18%</text>
                  <text x="456" y="223" textAnchor="end" fontFamily="system-ui,sans-serif" fontSize="12" fill="rgba(255,255,255,0.7)">₹1,566</text>
                  <text x="280" y="241" fontFamily="system-ui,sans-serif" fontSize="12" fill="rgba(255,255,255,0.45)">Platform fee</text>
                  <text x="456" y="241" textAnchor="end" fontFamily="system-ui,sans-serif" fontSize="12" fontWeight="700" fill="#25d366">₹0</text>
                  <line x1="270" y1="248" x2="456" y2="248" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
                  <rect x="270" y="254" width="186" height="34" rx="7" fill="rgba(37,211,102,0.08)" stroke="rgba(37,211,102,0.2)" strokeWidth="1"/>
                  <text x="284" y="276" fontFamily="system-ui,sans-serif" fontSize="13" fontWeight="700" fill="rgba(255,255,255,0.9)">Total due</text>
                  <text x="448" y="276" textAnchor="end" fontFamily="system-ui,sans-serif" fontSize="15" fontWeight="800" fill="#25d366">₹10,267</text>
                  <text x="32" y="306" fontFamily="system-ui,sans-serif" fontSize="10" fill="rgba(255,255,255,0.3)" letterSpacing="0.5">CONVERSATION MIX · OCT 2026</text>
                  <rect x="32" y="314" width="148" height="16" rx="3" fill="#3b82f6" opacity="0.75"/>
                  <rect x="182" y="314" width="46" height="16" rx="3" fill="#f59e0b" opacity="0.75"/>
                  <rect x="230" y="314" width="97" height="16" rx="3" fill="#a78bfa" opacity="0.75"/>
                  <rect x="329" y="314" width="75" height="16" rx="3" fill="#25d366" opacity="0.75"/>
                  <text x="106" y="325" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="9" fill="#fff">Utility 41%</text>
                  <text x="205" y="325" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="9" fill="#fff">Mktg</text>
                  <text x="278" y="325" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="9" fill="#fff">Auth 27%</text>
                  <text x="366" y="325" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="9" fill="#fff">Svc 20%</text>
                  <text x="32" y="346" fontFamily="system-ui,sans-serif" fontSize="10" fill="rgba(255,255,255,0.22)">Billed at Meta India rates · GST invoice issued monthly · Zero platform markup</text>
                </svg>
              ),
            },
            {
              title: "Human handoff without handoff pain",
              body: "The AI answers what it can. Complex queries — returns, escalations, angry customers — get handed off to a human agent with full conversation context already in the shared inbox. No message history lost. No confused customer repeating themselves.",
              visual: (
                <svg viewBox="0 0 480 360" width="100%" xmlns="http://www.w3.org/2000/svg" aria-label="WhatsApp shared inbox showing AI agent handling a customer complaint then handing off to human agent Raj with full conversation context preserved">
                  <rect width="480" height="360" fill="#0a1f18" rx="12"/>
                  <rect x="0" y="0" width="148" height="360" rx="12" fill="#0d2820" stroke="rgba(255,255,255,0.07)" strokeWidth="1"/>
                  <rect x="148" y="0" width="1" height="360" fill="rgba(255,255,255,0.06)"/>
                  <text x="14" y="22" fontFamily="system-ui,sans-serif" fontSize="11" fontWeight="700" fill="rgba(255,255,255,0.5)">INBOX</text>
                  <rect x="106" y="11" width="32" height="16" rx="8" fill="rgba(37,211,102,0.15)" stroke="rgba(37,211,102,0.3)" strokeWidth="1"/>
                  <text x="122" y="22" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="9" fontWeight="700" fill="#25d366">Live</text>
                  <rect x="8" y="30" width="132" height="52" rx="8" fill="rgba(37,211,102,0.1)" stroke="rgba(37,211,102,0.25)" strokeWidth="1"/>
                  <circle cx="26" cy="50" r="12" fill="#075e54"/>
                  <text x="26" y="54" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="9" fontWeight="700" fill="#fff">PR</text>
                  <text x="44" y="45" fontFamily="system-ui,sans-serif" fontSize="11" fontWeight="600" fill="rgba(255,255,255,0.9)">Priya R.</text>
                  <text x="44" y="60" fontFamily="system-ui,sans-serif" fontSize="10" fill="rgba(255,255,255,0.4)">Cancel my order...</text>
                  <rect x="116" y="34" width="18" height="14" rx="7" fill="#f59e0b"/>
                  <text x="125" y="44" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="8" fontWeight="700" fill="#fff">!</text>
                  <rect x="8" y="88" width="132" height="50" rx="8" fill="rgba(255,255,255,0.02)"/>
                  <circle cx="26" cy="107" r="12" fill="#1a3040"/>
                  <text x="26" y="111" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="9" fill="rgba(255,255,255,0.5)">AK</text>
                  <text x="44" y="102" fontFamily="system-ui,sans-serif" fontSize="11" fill="rgba(255,255,255,0.55)">Arjun K.</text>
                  <text x="44" y="117" fontFamily="system-ui,sans-serif" fontSize="10" fill="rgba(255,255,255,0.28)">When will it arrive?</text>
                  <rect x="8" y="144" width="132" height="50" rx="8" fill="rgba(255,255,255,0.02)"/>
                  <circle cx="26" cy="163" r="12" fill="#1a2840"/>
                  <text x="26" y="167" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="9" fill="rgba(255,255,255,0.5)">SM</text>
                  <text x="44" y="158" fontFamily="system-ui,sans-serif" fontSize="11" fill="rgba(255,255,255,0.55)">Sneha M.</text>
                  <text x="44" y="173" fontFamily="system-ui,sans-serif" fontSize="10" fill="rgba(255,255,255,0.28)">Thanks, resolved ✓</text>
                  <text x="14" y="212" fontFamily="system-ui,sans-serif" fontSize="9" fontWeight="600" fill="rgba(255,255,255,0.28)" letterSpacing="0.5">ASSIGNED TO</text>
                  <rect x="14" y="218" width="120" height="24" rx="6" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.07)" strokeWidth="1"/>
                  <circle cx="26" cy="230" r="7" fill="#10b981"/>
                  <text x="26" y="234" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="7" fontWeight="700" fill="#fff">R</text>
                  <text x="38" y="234" fontFamily="system-ui,sans-serif" fontSize="10" fill="rgba(255,255,255,0.7)">Raj · Support</text>
                  <rect x="149" y="0" width="331" height="360" rx="12" fill="#111b11"/>
                  <rect x="149" y="0" width="331" height="44" fill="#075e54"/>
                  <rect x="149" y="30" width="331" height="14" fill="#075e54"/>
                  <circle cx="172" cy="20" r="14" fill="#0a2820"/>
                  <text x="172" y="24" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="9" fontWeight="700" fill="#25d366">PR</text>
                  <text x="194" y="16" fontFamily="system-ui,sans-serif" fontSize="12" fontWeight="700" fill="#fff">Priya Rao</text>
                  <text x="194" y="30" fontFamily="system-ui,sans-serif" fontSize="10" fill="rgba(255,255,255,0.55)">+91 98200 12345</text>
                  <rect x="396" y="10" width="70" height="18" rx="9" fill="rgba(37,211,102,0.2)"/>
                  <text x="431" y="22" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="9" fontWeight="600" fill="#25d366">● Online</text>
                  <rect x="159" y="52" width="178" height="36" rx="9" fill="#1f2f1f"/>
                  <text x="170" y="68" fontFamily="system-ui,sans-serif" fontSize="11" fill="rgba(255,255,255,0.85)">I want to cancel order</text>
                  <text x="170" y="82" fontFamily="system-ui,sans-serif" fontSize="11" fill="rgba(255,255,255,0.85)">#ORD-2024-99102</text>
                  <text x="331" y="82" textAnchor="end" fontFamily="system-ui,sans-serif" fontSize="9" fill="rgba(255,255,255,0.28)">10:31</text>
                  <rect x="228" y="98" width="234" height="48" rx="9" fill="#005c4b"/>
                  <text x="239" y="114" fontFamily="system-ui,sans-serif" fontSize="9" fill="rgba(37,211,102,0.9)" fontWeight="600">🤖 AI Agent</text>
                  <text x="239" y="128" fontFamily="system-ui,sans-serif" fontSize="11" fill="rgba(255,255,255,0.9)">I see order #ORD-2024-99102.</text>
                  <text x="239" y="141" fontFamily="system-ui,sans-serif" fontSize="11" fill="rgba(255,255,255,0.9)">May I ask the reason?</text>
                  <text x="454" y="141" textAnchor="end" fontFamily="system-ui,sans-serif" fontSize="9" fill="rgba(255,255,255,0.3)">10:31 ✓✓</text>
                  <rect x="159" y="156" width="196" height="36" rx="9" fill="#1f2f1f"/>
                  <text x="170" y="172" fontFamily="system-ui,sans-serif" fontSize="11" fill="rgba(255,255,255,0.85)">Item arrived damaged.</text>
                  <text x="170" y="186" fontFamily="system-ui,sans-serif" fontSize="11" fill="rgba(255,255,255,0.85)">Very unhappy with this.</text>
                  <text x="349" y="186" textAnchor="end" fontFamily="system-ui,sans-serif" fontSize="9" fill="rgba(255,255,255,0.28)">10:32</text>
                  <rect x="159" y="202" width="303" height="26" rx="7" fill="rgba(245,158,11,0.12)" stroke="rgba(245,158,11,0.35)" strokeWidth="1"/>
                  <text x="311" y="219" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="10" fontWeight="600" fill="#f59e0b">⚡ Escalated to Raj · full context preserved</text>
                  <rect x="228" y="238" width="234" height="60" rx="9" fill="#005c4b"/>
                  <text x="239" y="254" fontFamily="system-ui,sans-serif" fontSize="9" fill="rgba(255,255,255,0.45)" fontWeight="600">Raj · Support Agent</text>
                  <text x="239" y="268" fontFamily="system-ui,sans-serif" fontSize="11" fill="rgba(255,255,255,0.9)">Hi Priya, so sorry about this!</text>
                  <text x="239" y="282" fontFamily="system-ui,sans-serif" fontSize="11" fill="rgba(255,255,255,0.9)">Refund processed immediately.</text>
                  <text x="239" y="293" fontFamily="system-ui,sans-serif" fontSize="11" fill="rgba(255,255,255,0.9)">You'll see it in 2–3 days. 🙏</text>
                  <text x="454" y="293" textAnchor="end" fontFamily="system-ui,sans-serif" fontSize="9" fill="rgba(255,255,255,0.3)">10:33 ✓✓</text>
                  <rect x="159" y="308" width="303" height="40" rx="8" fill="rgba(37,211,102,0.06)" stroke="rgba(37,211,102,0.15)" strokeWidth="1"/>
                  <text x="170" y="324" fontFamily="system-ui,sans-serif" fontSize="10" fill="rgba(255,255,255,0.5)">✓  Full history visible to Raj · no repeated questions</text>
                  <text x="170" y="340" fontFamily="system-ui,sans-serif" fontSize="10" fill="rgba(255,255,255,0.5)">✓  Order context auto-loaded · refund initiated in one step</text>
                </svg>
              ),
            },
            {
              title: "Broadcasting that respects Meta's rules",
              body: "Templates are created and submitted for Meta approval through the SMSLocal dashboard. Once approved, you broadcast with full delivery tracking. Read receipts, delivery receipts, and failure reasons all surface in one view.",
              visual: (
                <svg viewBox="0 0 480 360" width="100%" xmlns="http://www.w3.org/2000/svg" aria-label="WhatsApp broadcast dashboard showing a live campaign to 48200 contacts with Meta-approved templates, delivery progress bar, and read-receipt tracking">
                  <rect width="480" height="360" fill="#0a1f18" rx="12"/>
                  <rect x="12" y="12" width="456" height="336" rx="10" fill="#0d2820" stroke="rgba(255,255,255,0.07)" strokeWidth="1"/>
                  <rect x="12" y="12" width="456" height="44" rx="10" fill="#0f3025"/>
                  <rect x="12" y="42" width="456" height="14" fill="#0f3025"/>
                  <text x="28" y="40" fontFamily="system-ui,sans-serif" fontSize="13" fontWeight="700" fill="rgba(255,255,255,0.9)">Broadcast Campaign</text>
                  <rect x="336" y="22" width="118" height="20" rx="10" fill="rgba(37,211,102,0.15)" stroke="rgba(37,211,102,0.3)" strokeWidth="1"/>
                  <text x="395" y="36" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="10" fontWeight="600" fill="#25d366">● Sending live</text>
                  <rect x="20" y="64" width="100" height="58" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
                  <text x="70" y="84" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="9" fill="rgba(255,255,255,0.38)" letterSpacing="0.3">AUDIENCE</text>
                  <text x="70" y="106" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="18" fontWeight="800" fill="rgba(255,255,255,0.9)">48,200</text>
                  <text x="70" y="116" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="9" fill="rgba(255,255,255,0.32)">opted-in</text>
                  <rect x="128" y="64" width="100" height="58" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
                  <text x="178" y="84" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="9" fill="rgba(255,255,255,0.38)" letterSpacing="0.3">DELIVERED</text>
                  <text x="178" y="106" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="18" fontWeight="800" fill="#25d366">46,980</text>
                  <text x="178" y="116" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="9" fill="rgba(255,255,255,0.32)">97.5%</text>
                  <rect x="236" y="64" width="100" height="58" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
                  <text x="286" y="84" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="9" fill="rgba(255,255,255,0.38)" letterSpacing="0.3">READ ✓✓</text>
                  <text x="286" y="106" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="18" fontWeight="800" fill="#25d366">34,820</text>
                  <text x="286" y="116" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="9" fill="rgba(255,255,255,0.32)">74.1%</text>
                  <rect x="344" y="64" width="110" height="58" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
                  <text x="399" y="84" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="9" fill="rgba(255,255,255,0.38)" letterSpacing="0.3">FAILED</text>
                  <text x="399" y="106" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="18" fontWeight="800" fill="#f87171">1,220</text>
                  <text x="399" y="116" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="9" fill="rgba(255,255,255,0.32)">2.5% · auto-retry</text>
                  <text x="20" y="138" fontFamily="system-ui,sans-serif" fontSize="10" fill="rgba(255,255,255,0.38)">Delivery progress</text>
                  <rect x="20" y="144" width="436" height="8" rx="4" fill="rgba(255,255,255,0.07)"/>
                  <rect x="20" y="144" width="425" height="8" rx="4" fill="#25d366"/>
                  <text x="456" y="154" textAnchor="end" fontFamily="system-ui,sans-serif" fontSize="9" fill="#25d366">97.5%</text>
                  <text x="20" y="174" fontFamily="system-ui,sans-serif" fontSize="10" fontWeight="600" fill="rgba(255,255,255,0.32)" letterSpacing="0.5">TEMPLATE IN USE</text>
                  <rect x="20" y="182" width="218" height="100" rx="8" fill="#0a1e12" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
                  <rect x="20" y="182" width="218" height="28" rx="8" fill="#075e54"/>
                  <rect x="20" y="198" width="218" height="12" fill="#075e54"/>
                  <text x="129" y="200" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="10" fontWeight="700" fill="rgba(255,255,255,0.85)">SMSLocal</text>
                  <rect x="160" y="186" width="68" height="16" rx="8" fill="rgba(37,211,102,0.2)" stroke="rgba(37,211,102,0.4)" strokeWidth="1"/>
                  <text x="194" y="197" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="8" fontWeight="700" fill="#25d366">✓ Approved</text>
                  <text x="30" y="226" fontFamily="system-ui,sans-serif" fontSize="10" fill="rgba(255,255,255,0.75)">Hi {"{{"}name{"}}"}, your Diwali offer:</text>
                  <text x="30" y="240" fontFamily="system-ui,sans-serif" fontSize="10" fill="rgba(255,255,255,0.75)">20% off all orders till 2 Nov.</text>
                  <text x="30" y="254" fontFamily="system-ui,sans-serif" fontSize="10" fill="rgba(255,255,255,0.75)">Code: {"{{"}code{"}}"}. –SMSLocal</text>
                  <rect x="28" y="262" width="202" height="14" rx="7" fill="rgba(37,211,102,0.15)"/>
                  <text x="129" y="273" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="9" fill="#25d366">Shop Now →</text>
                  <text x="250" y="174" fontFamily="system-ui,sans-serif" fontSize="10" fontWeight="600" fill="rgba(255,255,255,0.32)" letterSpacing="0.5">TEMPLATES</text>
                  {[
                    { name: "diwali_offer_v3",      status: "Approved",  color: "#25d366", bg: "rgba(37,211,102,0.12)", y: 182 },
                    { name: "order_confirmation",   status: "Approved",  color: "#25d366", bg: "rgba(37,211,102,0.12)", y: 206 },
                    { name: "payment_reminder",     status: "Approved",  color: "#25d366", bg: "rgba(37,211,102,0.12)", y: 230 },
                    { name: "cart_recovery_v2",     status: "In review", color: "#f59e0b", bg: "rgba(245,158,11,0.12)", y: 254 },
                    { name: "new_product_launch",   status: "Draft",     color: "rgba(255,255,255,0.38)", bg: "rgba(255,255,255,0.04)", y: 278 },
                  ].map((t) => (
                    <g key={t.name}>
                      <rect x="250" y={t.y} width="206" height="20" rx="5" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
                      <text x="260" y={t.y + 14} fontFamily="system-ui,sans-serif" fontSize="10" fill="rgba(255,255,255,0.62)">{t.name}</text>
                      <rect x={392} y={t.y + 4} width={56} height={13} rx={6} fill={t.bg}/>
                      <text x={420} y={t.y + 14} textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="9" fontWeight="600" fill={t.color}>{t.status}</text>
                    </g>
                  ))}
                  <rect x="20" y="292" width="436" height="44" rx="8" fill="rgba(37,211,102,0.05)" stroke="rgba(37,211,102,0.12)" strokeWidth="1"/>
                  <text x="30" y="310" fontFamily="system-ui,sans-serif" fontSize="10" fill="rgba(255,255,255,0.52)">✓  Templates submitted &amp; approved through Meta — no direct API access needed</text>
                  <text x="30" y="328" fontFamily="system-ui,sans-serif" fontSize="10" fill="rgba(255,255,255,0.52)">✓  Delivery · read receipts · failure reasons all surfaced in one view</text>
                </svg>
              ),
            },
          ]}
        />

        <ProductEditorialBand
          src="/products/whatsapp-business-editorial.svg"
          alt="Indian small-business shop owner at her boutique counter, smiling at a smartphone displaying a WhatsApp-style chat thread, with a warm richly-textured shop background."
          eyebrow="WhatsApp in practice"
          headline="The way your customers already talk — now wired into your systems."
          caption="A green-tick verified number, templates that Meta approves, and a single thread that carries the customer from first reply to repeat purchase."
        />

        <UseCasesGrid
          eyebrow="Use cases"
          title="The conversations every Indian business needs to have on WhatsApp"
          items={[
            { industry: "E-commerce", use: "Order confirmations, shipping updates, cart recovery by AI", icon: ShoppingBag, href: "/solutions/ecommerce/" },
            { industry: "D2C brands", use: "Launch broadcasts, Diwali sales, AI-handled returns", icon: Sparkles, href: "/solutions/ecommerce/" },
            { industry: "Banking & Fintech", use: "KYC reminders, account notifications, utility messages", icon: Building2, href: "/solutions/banking-fintech/" },
            { industry: "Education", use: "Admissions, fee reminders, parent comms in regional languages", icon: GraduationCap, href: "/solutions/education/" },
            { industry: "Healthcare", use: "Appointment reminders, prescription refills, follow-up", icon: HeartPulse, href: "/solutions/healthcare/" },
            { industry: "All industries", use: "Any team that chats with customers on WhatsApp", icon: Inbox, href: "/solutions/" },
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
          cta={{ label: "View API docs", href: "/developers/api-docs/" }}
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
          primaryCta={{ label: "Start Free — ₹60 Credit", href: "/signup/" }}
          secondaryCta={{ label: "See pricing", href: "/pricing/" }}
        />
      </main>
      <SiteFooter />
    </>
  )
}
