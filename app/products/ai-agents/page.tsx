import type { Metadata } from "next"
import { getPageMetadata } from "@/lib/seo"
import {
  Bot,
  Building2,
  CheckCircle2,
  Clock,
  FileText,
  GraduationCap,
  HeartPulse,
  Inbox,
  Languages,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  UserCheck,
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
import { AiAgentsVisual } from "@/components/product/ai-agents-visual"
import { BreadcrumbJsonLd, ProductServiceJsonLd } from "@/components/seo/json-ld"

// ─── SEO — edit lib/seo/registry.ts or open /dev/seo to preview ──────────────
export const metadata: Metadata = getPageMetadata("/products/ai-agents")

export default function AiAgentsPage() {
  return (
    <>
      <ProductServiceJsonLd
        name="AI WhatsApp Agents"
        description="AI agents that auto-reply to WhatsApp customers in eight Indian languages, trained on your own documents and catalog, with clean human handoff."
        path="/products/ai-agents"
        category="Conversational AI for WhatsApp"
      />
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
          { name: "AI WhatsApp Agents", path: "/products/ai-agents" },
        ]}
      />
      <AnnouncementStrip />
      <SiteHeader />
      <main>
        <ProductHero
          eyebrow="AI WhatsApp Agents"
          title={<>Answer every WhatsApp customer — the moment they message.</>}
          subtitle="An AI agent that auto-replies to routine customer questions on WhatsApp in eight Indian languages, trained only on your own docs and catalog, and hands off to a human the moment a conversation needs one."
          primaryCta={{ label: "Start Free — ₹60 Credit", href: "/signup" }}
          secondaryCta={{ label: "See pricing", href: "/pricing" }}
          trustBar={[
            { icon: Languages, label: "Hindi, English + 6 more" },
            { icon: Bot, label: "Trained on your docs only" },
            { icon: UserCheck, label: "Clean human handoff" },
            { icon: Clock, label: "Live in one afternoon" },
          ]}
          visual={<AiAgentsVisual />}
        />

        <CapabilityGrid
          eyebrow="Capabilities"
          title="The inbox that never sleeps — and never goes off-brand"
          items={[
            {
              icon: Bot,
              title: "Auto-reply, trained on you",
              body: "Feed the agent your FAQs, policies, product catalog and past conversations. It replies in the same tone you do — and only from sources you approve.",
            },
            {
              icon: Languages,
              title: "Eight Indian languages today, three more on deck",
              body: "Live in Hindi, English, Tamil, Telugu, Bengali, Marathi, Gujarati and Kannada — the customer writes in Tamil, the agent replies in Tamil, no routing logic to build. Malayalam, Punjabi and Urdu land next, matching Meta's full 11-language WhatsApp template roster.",
            },
            {
              icon: UserCheck,
              title: "Clean human handoff",
              body: "Set rules for when the agent should escalate — refunds, complaints, VIP tags. The human picks up inside the same WhatsApp thread with full transcript already loaded.",
            },
            {
              icon: ShieldCheck,
              title: "No hallucinations",
              body: "If the answer is not in your source material, the agent says so and offers to connect a human. It never invents policies, prices, or product details.",
            },
          ]}
        />

        <HowItWorks
          eyebrow="How it works"
          title="From upload to first auto-reply — in an afternoon"
          steps={[
            {
              title: "Upload your knowledge",
              body: "Drop in your FAQ PDFs, policy docs, product catalog CSVs and past WhatsApp transcripts. Indexed and ready in under five minutes.",
            },
            {
              title: "Pick the playbook",
              body: "Start from a pre-built agent — support, lead qualification, order status, appointment reminders — or compose your own from the flow builder.",
            },
            {
              title: "Define handoff rules",
              body: "Set which intents and entities escalate instantly to a human — complaints, refunds, VIP accounts, after-hours thresholds.",
            },
            {
              title: "Go live on your WhatsApp number",
              body: "The agent plugs into your existing WhatsApp Business inbox. No new number, no customer-facing migration.",
            },
          ]}
        />

        <DeepDiveFeatures
          eyebrow="Under the hood"
          title="An agent your support lead can actually defend"
          items={[
            {
              title: "Trained only on sources you approve",
              body: "The agent answers from your uploaded docs, catalog, and past transcripts — nothing else. Every reply surfaces the exact source document in the back office so your QA team can verify grounding. No public web scraping, no generic training data leaking through.",
              image: "/products/ai-agents-trained-on-approved-sources.png",
              imageAlt:
                "SMSLocal AI agent source-verification view — the agent trained only on approved sources (product catalog, company documents, customer transcripts and knowledge base), each reply traced to its source document with a 98% confidence score, and no public web scraping or generic training data.",
            },
            {
              title: "Code-switching and transliteration, handled natively",
              body: "Customers in India routinely code-switch inside a single message — Hindi words in Latin script, English mixed with Tamil, transliterated regional spellings like 'kitna hai' instead of 'कितना है'. The agent reads all of it without a translation layer and replies in whichever script the customer opened with, so the chat never feels machine-translated.",
              image: "/products/ai-agents-code-switching-transliteration.png",
              imageAlt:
                "SMSLocal AI agent inbox showing a WhatsApp conversation where the customer code-switches between transliterated Hindi and English and the agent replies natively in the same script, alongside contact details and an auto-generated conversation summary.",
            },
            {
              title: "Handoff that humans actually want",
              body: "When the agent escalates, the human agent opens the same WhatsApp thread with the full transcript pinned, the customer's intent summarised, and the next suggested action already queued. No one has to type 'could you repeat that?' — the customer stays in flow.",
              image: "/products/ai-agents-human-handoff-transcript.png",
              imageAlt:
                "SMSLocal AI-to-human handoff screen showing a completed escalation in the same WhatsApp thread with the full transcript pinned, the customer's intent summarised, and a suggested next reply pre-drafted and ready to send.",
            },
          ]}
        />

        <ProductEditorialBand
          layout="split"
          src="/products/ai-agents-human-agent-same-thread-dashboard.png"
          imageWidth={1400}
          imageHeight={500}
          alt="SMSLocal AI agent and human team working the same WhatsApp thread — a handoff summary dashboard showing the customer's intent, order status, a suggested reply and the next best action already queued so the human never starts cold."
          eyebrow="Humans and agents, same thread"
          headline="The agent handles the obvious. Your team handles what matters."
          caption="Escalations arrive with the full transcript, the customer&apos;s intent summarised, and the next best action already queued — so the human never starts cold."
        />

        <UseCasesGrid
          eyebrow="Where teams put it to work"
          title="The conversations every Indian business has on WhatsApp"
          items={[
            { industry: "E-commerce & D2C", use: "Order status, returns, COD confirmations, cart recovery replies", icon: ShoppingBag, href: "/solutions/ecommerce" },
            { industry: "Banking & Fintech", use: "Product FAQs, statement requests, KYC step-by-step in regional languages", icon: Building2, href: "/solutions/banking-fintech" },
            { industry: "Healthcare", use: "Appointment FAQs, prep instructions, lab report pickup flows", icon: HeartPulse, href: "/solutions/healthcare" },
            { industry: "Education & coaching", use: "Admissions, fee reminders, class timings, parent Q&A", icon: GraduationCap, href: "/solutions/education" },
            { industry: "Lead qualification", use: "Qualify inbound leads 24/7, book to calendar, hand off warm ones to sales", icon: Sparkles, href: "/solutions" },
            { industry: "Any support team", use: "Replace the 'type MENU for options' flow with a real conversation", icon: Inbox, href: "/solutions" },
          ]}
        />

        <TechnicalBlock
          eyebrow="For developers"
          title="One REST API, one token — same stack as the rest of SMSLocal"
          items={[
            { label: "Endpoint", value: "POST /v1/agents/respond" },
            { label: "Webhooks", value: "Inbound + handoff events" },
            { label: "Knowledge", value: "PDF · DOCX · CSV · URL" },
            { label: "Auth", value: "OAuth 2.0 bearer tokens" },
            { label: "Inbox", value: "Lives inside the shared team inbox" },
            { label: "Docs", value: "/developers/api-docs" },
          ]}
          cta={{ label: "View API docs", href: "/developers/api-docs" }}
        />

        <CompareTable
          eyebrow="Compared"
          title="Where an AI WhatsApp agent wins vs the alternatives"
          columns={["SMSLocal AI agent", "Keyword chatbot", "Full human team"]}
          rows={[
            { feature: "Replies in under 2 seconds", cells: ["yes", "yes", "no"] },
            { feature: "Reads mixed Hindi/English/regional chat", cells: ["yes", "no", "yes"] },
            { feature: "Only answers from your own docs", cells: ["yes", "partial", "yes"] },
            { feature: "Clean handoff with full transcript", cells: ["yes", "no", "yes"] },
            { feature: "Operates 24/7 with zero extra headcount", cells: ["yes", "yes", "no"] },
            { feature: "Costs roughly per conversation, not per seat", cells: ["yes", "partial", "no"] },
          ]}
          footnote="Comparison reflects typical Indian-market alternatives; ask sales for a tailored TCO model."
        />

        <Faq
          eyebrow="FAQs"
          title="AI WhatsApp agents — the common questions"
          items={[
            { q: "Does the agent need Meta / WhatsApp verification?", a: "It runs on top of your existing WhatsApp Business API number. If you're already on SMSLocal WhatsApp, the agent plugs in. If not, Meta verification is a 24–48 hour process we help you through." },
            { q: "How often does the agent's knowledge refresh?", a: "The agent re-indexes on every source-document update — a new FAQ, a revised policy PDF, a refreshed catalog CSV — and the updated answer is live within minutes. You can also pin a human-written override for any question whose answer you want to keep pixel-perfect." },
            { q: "What happens if a customer asks something the agent isn't confident about?", a: "The agent falls back to one of three behaviours you configure: acknowledge and escalate to a human, ask one clarifying question, or quote the closest matching source and offer to connect a human. It never invents an answer or a policy it doesn't have source material for." },
            { q: "When does a human take over?", a: "You set rules per intent, entity, customer tag or time window — common triggers are refunds, complaints, VIP accounts, or after-hours. The agent pauses the conversation and pings your human team with the full transcript pinned." },
            { q: "Can I run this on my existing WhatsApp number?", a: "Yes. The agent attaches to your existing WhatsApp Business API number; there is no separate chatbot number and no customer-facing migration." },
            { q: "How is this priced?", a: "Pay-as-you-go per resolved conversation on top of Meta's standard WhatsApp conversation fees — no per-agent monthly platform fee. See the pricing page for current rates." },
            { q: "Can the agent access our CRM or order data?", a: "Yes. Connect CRM, order, or helpdesk systems through our connectors; the agent can then look up live order status, tickets or customer records when it answers." },
            { q: "Is this safe for regulated industries?", a: "Conversations are TLS-encrypted end-to-end to WhatsApp, the knowledge base is workspace-isolated, and every answer is traceable back to a source document. For banking and healthcare we also offer audit log exports and on-request data-retention controls." },
          ]}
        />

        <RelatedContent path="/products/ai-agents" />

        <ProductFinalCta
          title="Put an AI agent on your WhatsApp today."
          subtitle="Train it on your docs in an afternoon, let it auto-reply in eight Indian languages, and hand off to your team only when it actually matters."
          primaryCta={{ label: "Start Free — ₹60 Credit", href: "/signup" }}
          secondaryCta={{ label: "Talk to sales", href: "/company/contact" }}
        />
      </main>
      <SiteFooter />
    </>
  )
}
