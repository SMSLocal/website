import type { Metadata } from "next"
import Link from "next/link"
import { getPageMetadata } from "@/lib/seo"
import {
  ArrowRight,
  Bot,
  Building2,
  CalendarCheck,
  Clock,
  Database,
  Filter,
  GraduationCap,
  Headphones,
  HeartPulse,
  Inbox,
  Languages,
  Mail,
  MessageCircle,
  MessageSquare,
  Phone,
  ScrollText,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  UserCheck,
  Wallet,
  Workflow,
  Zap,
} from "lucide-react"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { RelatedContent } from "@/components/shared/related-content"
import {
  CapabilityGrid,
  CompareTable,
  DeepDiveFeatures,
  FeatureGrid,
  HowItWorks,
  ProductFinalCta,
  ProductHero,
  Section,
  SectionHeader,
  StatsBand,
  TechnicalBlock,
  UseCaseGrid,
  UseCasesGrid,
} from "@/components/product/product-page"
import { AiAgentsVisual } from "@/components/product/ai-agents-visual"
import {
  CodeSwitchScene,
  HandoffScene,
  InboxScene,
  SourceGroundingScene,
} from "@/components/product/ai-agents-scenes"
import { FaqSection } from "@/components/landing/faq-section"
import { BreadcrumbJsonLd, ProductServiceJsonLd } from "@/components/seo/json-ld"

// ─── SEO — edit lib/seo/registry.ts or open /dev/seo to preview ──────────────
export const metadata: Metadata = getPageMetadata("/products/ai-agents")

/* Representative slice of the 300+ apps Captain AI can act in via Composio. */
const INTEGRATIONS = [
  { category: "CRM", apps: "HubSpot · Salesforce · Pipedrive" },
  { category: "Finance & payments", apps: "Razorpay · Stripe · QuickBooks" },
  { category: "E-commerce", apps: "Shopify · WooCommerce" },
  { category: "Helpdesk", apps: "Zendesk · Freshdesk · Intercom" },
  { category: "Comms & docs", apps: "Gmail · Slack · Notion" },
  { category: "Dev & data", apps: "GitHub · Sentry · Supabase" },
]

export default function AiAgentsPage() {
  return (
    <>
      <ProductServiceJsonLd
        name="Captain AI — AI Support Agent"
        description="Captain AI is an AI customer-support agent that answers in eight Indian languages, takes real actions across 300+ connected apps via Composio, routes and escalates conversations, and hands off cleanly to a human — with macros, canned responses, SLAs, roles and audit logs built in."
        path="/products/ai-agents"
        category="Conversational AI for customer support"
      />
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
          { name: "AI Agents", path: "/products/ai-agents" },
        ]}
      />
      <SiteHeader />
      <main>
        <ProductHero
          compact
          eyebrow="AI Agents · Captain AI"
          title={
            <>
              Captain AI doesn&apos;t just reply —
              <br className="hidden sm:block" /> it resolves the conversation.
            </>
          }
          subtitle="The agent inside your support inbox. It answers in eight Indian languages from your own knowledge, takes real actions across 300+ connected apps — looking up orders, updating invoices, issuing refunds — and hands off to a human the moment a conversation needs one."
          primaryCta={{ label: "Start Free — ₹60 Credit", href: "https://app.smslocal.in/signup" }}
          secondaryCta={{ label: "See pricing", href: "/pricing/" }}
          trustBar={[
            { icon: Languages, label: "8 Indian languages" },
            { icon: Zap, label: "Acts across 300+ apps" },
            { icon: UserCheck, label: "Clean human handoff" },
            { icon: ShieldCheck, label: "Roles, SLAs & audit logs" },
          ]}
          visual={<AiAgentsVisual />}
        />

        <CapabilityGrid
          eyebrow="What Captain AI does"
          title="An agent that thinks, acts, and knows when to step back"
          items={[
            {
              icon: Bot,
              title: "Answers, grounded in your content",
              body: "Replies from your FAQs, policies, catalog and past chats — in your tone, only from sources you approve. When it doesn't know, it says so and offers a human instead of inventing an answer.",
            },
            {
              icon: Zap,
              title: "Takes real action across 300+ apps",
              body: "Through Composio it looks up contacts, invoices and orders, updates a Razorpay order, issues a refund, raises a ticket, or links a Linear bug — resolving the request end-to-end, not just describing it.",
            },
            {
              icon: Workflow,
              title: "Reads intent, routes and escalates",
              body: "Detects churn and frustration signals, scores risk, auto-routes each conversation to the right team, and escalates to a human the instant your rules say so.",
            },
            {
              icon: ScrollText,
              title: "Summarizes, logs and hands off",
              body: "Turns long threads into a one-line recap with the next best action, saves it to the customer's profile, and hands your team a fully briefed conversation.",
            },
          ]}
        />

        {/* ── Use-case agents ───────────────────────────────────────────── */}
        <Section tone="muted">
          <SectionHeader
            eyebrow="Use cases"
            title="See Captain AI in action for your team"
            subtitle="Dive into a specific use case to see exactly how the agent works for that workflow."
          />
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Headphones, title: "Customer Service", body: "Deflect repetitive tickets across every channel and escalate the rest with full context.", href: "/ai-agents/customer-service/", cta: "See how it works" },
              { icon: ShoppingBag, title: "Sales", body: "Recommend products, recover carts, and guide buyers to checkout inside the conversation.", href: "/ai-agents/sales/", cta: "See how it works" },
              { icon: CalendarCheck, title: "Booking", body: "Schedule appointments inside the chat, check availability, and send automatic reminders.", href: "/ai-agents/booking/", cta: "See how it works" },
              { icon: Filter, title: "Lead Qualification", body: "Capture, qualify, score, and route hot leads to your team — synced to your CRM automatically.", href: "/ai-agents/lead-qualification/", cta: "See how it works" },
              { icon: Workflow, title: "Agent Builder", body: "Build, train, and launch AI agents visually — no code, no developers, no waiting.", href: "/ai-agents/agent-builder/", cta: "Start building" },
            ].map((c) => {
              const Icon = c.icon
              return (
                <Link
                  key={c.href}
                  href={c.href}
                  className="group flex flex-col rounded-2xl border border-border bg-background p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-[16px] font-semibold tracking-tight text-foreground">{c.title}</h3>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted-foreground">{c.body}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-primary transition group-hover:gap-2.5">
                    {c.cta} <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              )
            })}
          </div>
        </Section>

        <Section>
          <SectionHeader
            eyebrow="By the numbers"
            title="Built to deflect the repetitive, escalate the rest"
            subtitle="Typical results once Captain AI is trained on your content and connected to your order and support data."
          />
          <div className="mt-10">
            <StatsBand
              items={[
                { value: "78%", label: "of routine chats auto-resolved before a human is needed" },
                { value: "<2s", label: "median first reply, day or night, every day of the year" },
                { value: "300+", label: "apps Captain can read from and act in, via Composio" },
                { value: "8", label: "Indian languages, with code-switching handled natively" },
              ]}
            />
          </div>
        </Section>

        {/* ── Channels ──────────────────────────────────────────────────── */}
        <Section tone="muted">
          <SectionHeader
            eyebrow="One agent, every channel"
            title="Captain works wherever your customers message"
            subtitle="The same agent, knowledge and actions across every channel — on your existing numbers, billed from one wallet."
          />
          <UseCaseGrid
            items={[
              { icon: <MessageCircle className="h-4 w-4" />, title: "WhatsApp", description: "Official Business API — broadcasts, support, and the AI agent on one number." },
              { icon: <MessageSquare className="h-4 w-4" />, title: "SMS & RCS", description: "DLT-compliant SMS and branded RCS from the same agent and wallet." },
              { icon: <Mail className="h-4 w-4" />, title: "Email", description: "Triage, draft and send email replies inside the same shared inbox." },
              { icon: <Phone className="h-4 w-4" />, title: "Voice", description: "Hand a voice call the full context the chat agent already gathered." },
            ]}
          />
        </Section>

        {/* ── Composio integrations ─────────────────────────────────────── */}
        <Section>
          <SectionHeader
            eyebrow="Powered by Composio"
            title="Give Captain the keys to your whole stack"
            subtitle="Connect with one-click OAuth and Captain can look up and act on live data — 300+ apps across 20 categories. Razorpay alone exposes 42 actions like update order, update invoice and update payment link."
          />
          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {INTEGRATIONS.map((row) => (
              <div
                key={row.category}
                className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-5 py-4 shadow-sm"
              >
                <div>
                  <p className="text-[14px] font-semibold text-foreground">{row.category}</p>
                  <p className="mt-0.5 text-[12.5px] text-muted-foreground">{row.apps}</p>
                </div>
                <Sparkles className="h-4 w-4 shrink-0 text-primary" />
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link href="/products/ai-agentic/" className="inline-flex items-center gap-2 text-[14px] font-semibold text-primary hover:underline">
              Explore the full integration directory <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/products/integrations/" className="inline-flex items-center gap-2 text-[14px] font-semibold text-muted-foreground hover:text-primary">
              See all integrations <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Section>

        <HowItWorks
          eyebrow="How it works"
          title="From connected apps to first auto-resolution — in an afternoon"
          steps={[
            {
              title: "Connect your apps",
              body: "One-click OAuth to 300+ tools via Composio. Captain inherits the right scopes to read and act — CRM, payments, e-commerce, helpdesk and more.",
            },
            {
              title: "Train on your knowledge",
              body: "Drop in your FAQ PDFs, policy docs, catalog CSVs and past transcripts. Indexed in minutes, and every answer traces back to a source document.",
            },
            {
              title: "Set the guardrails",
              body: "Custom roles scope what Captain can touch, SLAs set response and resolution targets, and handoff rules decide exactly when a human steps in.",
            },
            {
              title: "Go live across channels",
              body: "Captain plugs into your existing WhatsApp, SMS, email and voice inbox. No new numbers, no customer-facing migration.",
            },
          ]}
        />

        <DeepDiveFeatures
          eyebrow="Under the hood"
          title="An agent your support lead can actually defend"
          items={[
            {
              title: "Trained only on sources you approve",
              body: "Captain answers from your uploaded docs, catalog, and past transcripts — nothing else. Every reply surfaces the exact source document in the back office so your QA team can verify grounding. No public web scraping, no generic training data leaking through.",
              visual: <SourceGroundingScene />,
            },
            {
              title: "Code-switching and transliteration, handled natively",
              body: "Customers in India routinely code-switch inside a single message — Hindi words in Latin script, English mixed with Tamil, transliterated regional spellings like 'kitna hai' instead of 'कितना है'. Captain reads all of it without a translation layer and replies in whichever script the customer opened with, so the chat never feels machine-translated.",
              visual: <CodeSwitchScene />,
            },
            {
              title: "Handoff that humans actually want",
              body: "When Captain escalates, the human opens the same thread with the full transcript pinned, the customer's intent summarised, and the next suggested action already queued. No one has to type 'could you repeat that?' — the customer stays in flow.",
              visual: <HandoffScene />,
            },
          ]}
        />

        <Section tone="dark">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-12">
            <div>
              <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-white/85">
                One inbox, every channel
              </span>
              <h3 className="mt-4 text-balance text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Captain handles the obvious. Your team handles what matters.
              </h3>
              <p className="mt-4 max-w-md text-pretty text-[15px] leading-relaxed text-white/70">
                WhatsApp, Email, Instagram, Messenger, Telegram and more land in one shared inbox.
                Captain triages and resolves the routine, and every escalation arrives with the full
                transcript, the intent summarised, and the next best action already queued — so the
                human never starts cold.
              </p>
            </div>
            <InboxScene />
          </div>
        </Section>

        {/* ── Help desk controls ────────────────────────────────────────── */}
        <Section tone="muted">
          <SectionHeader
            eyebrow="Built-in controls"
            title="A real help desk, not just a bot"
            subtitle="Captain operates inside the guardrails your team already relies on — so autonomy never means a loss of oversight."
          />
          <FeatureGrid
            items={[
              { icon: <Sparkles className="h-5 w-5" />, title: "Macros", description: "One-click multi-step actions — apply a tag, send a reply, update the CRM and close — in a single click, run by Captain or your team." },
              { icon: <MessageSquare className="h-5 w-5" />, title: "Canned Responses", description: "Saved replies for the questions you answer every day, available to both Captain and your human agents." },
              { icon: <Clock className="h-5 w-5" />, title: "SLA policies", description: "Set first-response and resolution targets; Captain works to them and escalates before they breach." },
              { icon: <ShieldCheck className="h-5 w-5" />, title: "Custom Roles", description: "Scope exactly which apps, actions and conversations each teammate — and Captain — is allowed to access." },
              { icon: <ScrollText className="h-5 w-5" />, title: "Audit Logs", description: "Every lookup, action and handoff is logged — who, what, when and why — and exportable for compliance." },
              { icon: <Wallet className="h-5 w-5" />, title: "Wallet billing", description: "One pay-as-you-go balance across SMS, WhatsApp, email, voice and AI actions. No per-seat fees, unlimited agents." },
            ]}
          />
        </Section>

        <UseCasesGrid
          eyebrow="Where teams put it to work"
          title="The conversations every Indian business has"
          items={[
            { industry: "E-commerce & D2C", use: "Order status, returns, COD confirmations, refunds and cart recovery", icon: ShoppingBag, href: "/solutions/ecommerce/" },
            { industry: "Banking & Fintech", use: "Product FAQs, statement requests, KYC step-by-step in regional languages", icon: Building2, href: "/solutions/banking-fintech/" },
            { industry: "Healthcare", use: "Appointment FAQs, prep instructions, lab report pickup flows", icon: HeartPulse, href: "/solutions/healthcare/" },
            { industry: "Education & coaching", use: "Admissions, fee reminders, class timings, parent Q&A", icon: GraduationCap, href: "/solutions/education/" },
            { industry: "SaaS & B2B", use: "Triage tickets, detect churn signals, surface upsell-ready accounts", icon: Database, href: "/solutions/saas-b2b/" },
            { industry: "Any support team", use: "Replace the 'type MENU for options' flow with a real conversation", icon: Inbox, href: "/solutions/" },
          ]}
        />

        <CompareTable
          eyebrow="Compared"
          title="Captain AI vs WATI, AiSensy & a DIY GPT bot"
          subtitle="Most WhatsApp tools bolt an AI add-on onto a flat-fee SaaS and gate it behind higher tiers. A raw GPT bot can talk but can't safely act. Here's where each option actually lands."
          columns={["Captain AI", "WATI", "AiSensy", "DIY GPT bot"]}
          rows={[
            { feature: "AI agent on the core plan (not a higher tier)", cells: ["yes", "partial", "partial", "yes"] },
            { feature: "Takes real actions across 300+ connected apps", cells: ["yes", "partial", "partial", "partial"] },
            { feature: "8 Indian languages + code-switching out of the box", cells: ["yes", "partial", "partial", "partial"] },
            { feature: "Answers only from your approved sources", cells: ["yes", "partial", "partial", "no"] },
            { feature: "Detects intent, routes and escalates automatically", cells: ["yes", "partial", "partial", "no"] },
            { feature: "Macros, canned responses, SLAs & roles built in", cells: ["yes", "yes", "partial", "no"] },
            { feature: "Audit log of every AI action", cells: ["yes", "partial", "partial", "no"] },
            { feature: "SMS + WhatsApp + email + voice from one vendor", cells: ["yes", "no", "no", "no"] },
            { feature: "Pay-as-you-go, no monthly platform fee", cells: ["yes", "no", "no", "partial"] },
            { feature: "Priced per message, not per agent seat", cells: ["yes", "no", "partial", "yes"] },
            { feature: "Live in an afternoon, no engineering team", cells: ["yes", "yes", "yes", "no"] },
          ]}
          footnote="Based on public pricing and documentation as of June 2026. WATI starts at ₹2,499/month and AiSensy at ~₹999/month — both WhatsApp-only, with AI agent features on higher-tier plans. A 'DIY GPT bot' means wiring an LLM API to WhatsApp yourself."
          ctaLabel="See the full WATI & AiSensy breakdowns"
          ctaHref="/compare"
        />

        <TechnicalBlock
          eyebrow="For developers"
          title="One REST API, one token — same stack as the rest of SMSLocal"
          items={[
            { label: "Endpoint", value: "POST /v1/agents/respond" },
            { label: "Webhooks", value: "Inbound · handoff · action events" },
            { label: "Knowledge", value: "PDF · DOCX · CSV · URL" },
            { label: "Actions", value: "300+ Composio app connectors" },
            { label: "Auth", value: "OAuth 2.0 bearer tokens" },
            { label: "Docs", value: "/developers/api-docs" },
          ]}
          cta={{ label: "View API docs", href: "/developers/api-docs/" }}
        />

        <FaqSection
          items={[
            { q: "What is Captain AI?", a: "Captain AI is the AI agent built into the SMSLocal inbox. It answers customer questions from your own knowledge in eight Indian languages, takes real actions across your connected apps (look up orders, update invoices, issue refunds, raise tickets), detects intent and risk, routes and escalates conversations, and hands off to a human with the full context. It runs alongside your team with macros, canned responses, SLAs, roles and audit logs." },
            { q: "Does the agent just answer, or can it actually do things?", a: "Both. Connect your apps via Composio — Razorpay, Shopify, HubSpot, Gmail, Zendesk and 300+ more — and Captain can look up live data and run real actions (Razorpay alone exposes 42, like update order and update invoice). So a 'where is my order' or 'I want a refund' conversation gets resolved, not just acknowledged." },
            { q: "How is this different from WATI or AiSensy?", a: "WATI and AiSensy are excellent WhatsApp-only SaaS platforms, but both are flat-fee (₹2,499/month and ~₹999/month) and put their AI agent features on higher-tier plans. Captain AI is pay-as-you-go with the agent on the core plan, adds SMS, email and voice from the same vendor and invoice, charges per message instead of per seat, takes real actions across 300+ apps, and logs every action to an audit trail." },
            { q: "How does the human handoff work?", a: "You set rules per intent, entity, customer tag or time window — common triggers are refunds, complaints, VIP accounts, or after-hours. Captain pauses and pings your team, and the human opens the same thread with the full transcript pinned, the intent summarised, and a suggested reply ready." },
            { q: "What stops it from inventing answers?", a: "Captain answers only from sources you approve and every reply traces to its source document. When it isn't confident it follows the fallback you configure — escalate, ask a clarifying question, or quote the closest source and offer a human. It never invents a policy or price." },
            { q: "Can I control what the agent is allowed to do?", a: "Yes. Custom Roles scope exactly which apps, actions and conversations Captain (and each teammate) can access, SLAs govern timing, and every lookup and action is written to an exportable audit log — so autonomy stays inside your guardrails." },
            { q: "Can I run this on my existing WhatsApp number?", a: "Yes. Captain attaches to your existing WhatsApp Business API number; there is no separate chatbot number and no customer-facing migration. It works across your SMS, email and voice channels too." },
            { q: "How is this priced?", a: "Pay-as-you-go from a single wallet — per resolved conversation on top of Meta's standard WhatsApp fees, with no per-agent monthly platform fee and unlimited agent seats. See the pricing page for current rates." },
            { q: "Is this safe for regulated industries?", a: "Conversations are TLS-encrypted, the knowledge base is workspace-isolated, every answer traces to a source document, and every action Captain takes is logged. For banking and healthcare we also offer audit log exports and on-request data-retention controls." },
          ]}
        />

        <RelatedContent path="/products/ai-agents" />

        <ProductFinalCta
          title="Put Captain AI on your support inbox today."
          subtitle="Connect your apps so it can actually resolve requests, train it on your docs in an afternoon, let it reply in eight Indian languages, and hand off to your team only when it matters."
          primaryCta={{ label: "Start Free — ₹60 Credit", href: "https://app.smslocal.in/signup" }}
          secondaryCta={{ label: "Talk to sales", href: "/company/contact/" }}
        />
      </main>
      <SiteFooter />
    </>
  )
}
