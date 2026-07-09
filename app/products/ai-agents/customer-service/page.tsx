import type { Metadata } from "next"
import Link from "next/link"
import { getPageMetadata } from "@/lib/seo"
import {
  BookOpen,
  CheckCircle,
  Globe,
  HeadphonesIcon,
  Languages,
  MessageCircle,
  RefreshCw,
  UserCheck,
  Zap,
} from "lucide-react"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { FaqSection } from "@/components/landing/faq-section"
import { BreadcrumbJsonLd, ProductServiceJsonLd } from "@/components/seo/json-ld"
import {
  CapabilityGrid,
  ProductFinalCta,
  ProductHero,
  Section,
  SectionHeader,
  StatsBand,
} from "@/components/product/product-page"

export const metadata: Metadata = getPageMetadata("/products/ai-agents/customer-service")

/* ── Simple inline visual for the Hero ───────────────────────────────────── */
function CustomerServiceVisual() {
  const messages = [
    { from: "user", text: "Where is my order #4821?" },
    { from: "agent", text: "Your order shipped yesterday and arrives tomorrow by 6 PM. Track it here →" },
    { from: "user", text: "Can I change the delivery address?" },
    { from: "agent", text: "Done — updated to your saved address. Anything else I can help with?" },
  ]
  const channels = ["WhatsApp", "SMS", "Email", "Voice", "Web", "Instagram", "Messenger"]

  return (
    <div className="relative flex h-full min-h-[340px] flex-col gap-4 lg:pl-4">
      {/* Chat bubble card */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
        <div className="mb-3 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-green-400" />
          <span className="text-[12px] font-semibold uppercase tracking-widest text-white/60">
            Live Conversation
          </span>
        </div>
        <div className="space-y-2.5">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${m.from === "user" ? "justify-start" : "justify-end"}`}
            >
              <span
                className={`max-w-[85%] rounded-xl px-3 py-2 text-[12.5px] leading-snug ${
                  m.from === "user"
                    ? "bg-white/10 text-white/80"
                    : "bg-primary text-primary-foreground"
                }`}
              >
                {m.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Channel pill strip */}
      <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-md">
        <p className="mb-2 text-[10.5px] font-semibold uppercase tracking-widest text-white/50">
          Active on 7 channels
        </p>
        <div className="flex flex-wrap gap-1.5">
          {channels.map((ch) => (
            <span
              key={ch}
              className="rounded-full border border-white/15 bg-white/8 px-2.5 py-0.5 text-[11px] font-medium text-white/75"
            >
              {ch}
            </span>
          ))}
        </div>
      </div>

      {/* Resolution badge */}
      <div className="flex items-center gap-2 rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-2.5">
        <CheckCircle className="h-4 w-4 shrink-0 text-green-400" />
        <span className="text-[12.5px] font-medium text-green-300">
          Resolved without a human — multiple languages supported
        </span>
      </div>
    </div>
  )
}

export default function CustomerServiceAgentPage() {
  return (
    <>
      <ProductServiceJsonLd
        name="SMSLocal AI Customer Service Agent"
        description="An agentic AI customer service agent that deflects repetitive tickets across every channel, answers from your data, and escalates with full context when a human is needed."
        path="/products/ai-agents/customer-service"
        category="AI Customer Service Agent"
      />
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
          { name: "AI Agents", path: "/products/ai-agents" },
          { name: "Customer Service", path: "/products/ai-agents/customer-service" },
        ]}
      />
      <SiteHeader />
      <main>

        {/* ── HERO ──────────────────────────────────────────────── */}
        <ProductHero
          compact
          eyebrow="AI Agents · Customer Service"
          title={
            <>
              An Agentic AI Customer Service Agent
              <br className="hidden sm:block" /> That Actually Resolves
            </>
          }
          subtitle="Deflect repetitive tickets across every channel with an agent that answers from your data and escalates the rest with full context."
          primaryCta={{ label: "Get a Demo", href: "/company/contact/" }}
          secondaryCta={{ label: "Start Free", href: "/signup/" }}
          trustBar={[
            { icon: HeadphonesIcon, label: "24/7 across 7 channels" },
            { icon: Zap, label: "Resolves without pre-built journeys" },
            { icon: Languages, label: "Multiple Indian languages" },
            { icon: UserCheck, label: "Full-context human handoff" },
          ]}
          visual={<CustomerServiceVisual />}
        />

        {/* ── TRUST LINE ────────────────────────────────────────── */}
        <div className="border-b border-border bg-muted/30 py-4">
          <p className="text-center text-[13px] font-medium text-muted-foreground">
            Built for support teams that want resolution, not just deflection.
          </p>
        </div>

        {/* ── RESULTS STRIP ─────────────────────────────────────── */}
        <Section>
          <StatsBand
            items={[
              { value: "24/7", label: "across 7 channels — WhatsApp, SMS, email, voice, and more" },
              { value: "0", label: "pre-built journeys needed — the agent figures it out from your data" },
              { value: "Multi-lingual", label: "handles multiple Indian languages, including regional scripts" },
              { value: "100%", label: "context transferred on every human handoff, in the same thread" },
            ]}
          />
        </Section>

        {/* ── THE PROBLEM ───────────────────────────────────────── */}
        <Section tone="muted">
          <div className="mx-auto max-w-3xl">
            <SectionHeader
              eyebrow="The problem"
              title="Support volume scales faster than headcount"
            />
            <p className="mt-5 text-pretty text-[15px] leading-relaxed text-muted-foreground">
              Most chatbots only handle the easy questions and dump everything else on your team with
              no context. An agentic AI agent resolves more on its own and makes the handoffs that
              remain effortless. Your team should be spending their time on the conversations that
              genuinely need a human — not on order lookups and tracking numbers.
            </p>
          </div>
        </Section>

        {/* ── WHAT IT DOES ──────────────────────────────────────── */}
        <CapabilityGrid
          eyebrow="What it does"
          title="Four things that separate an agent from a bot"
          subtitle="It doesn't just match keywords and return a canned reply. It understands, acts, and hands off like a person would."
          items={[
            {
              icon: MessageCircle,
              title: "Answers across channels",
              body: "Handles WhatsApp, SMS, email, voice, and web from one place, grounded in your knowledge base — so every customer gets the same accurate answer regardless of channel.",
            },
            {
              icon: Zap,
              title: "Resolves, not just routes",
              body: "Completes multi-step tasks like order lookups and status changes, not just canned replies. It closes the conversation — not just opens a ticket.",
            },
            {
              icon: UserCheck,
              title: "Escalates with context",
              body: "When a human is needed, it hands off in the same thread with the full history attached. Your team never starts cold or asks a customer to repeat themselves.",
            },
            {
              icon: BookOpen,
              title: "Learns your business",
              body: "Trained on your help center, PDFs, and website, so answers match your policies and tone — not generic AI responses that confuse your customers.",
            },
          ]}
        />

        {/* ── WHY IT WORKS ──────────────────────────────────────── */}
        <Section tone="muted">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16 lg:items-center">
            <div>
              <SectionHeader
                eyebrow="Why it works"
                title="Speed and accuracy, together"
              />
              <p className="mt-5 text-pretty text-[15px] leading-relaxed text-muted-foreground">
                Customers get instant, accurate answers at any hour. Your team stops repeating itself
                and focuses on the conversations that need a person. CSAT rises because nobody waits
                in a queue for a simple answer — and when a human does step in, they already know
                exactly what the customer needs.
              </p>
            </div>

            {/* Supporting stats */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                { icon: <Globe className="h-5 w-5" />, label: "Always on", desc: "24/7 coverage with no shift gaps or overtime" },
                { icon: <RefreshCw className="h-5 w-5" />, label: "Consistent answers", desc: "Every customer gets the same accurate reply, every time" },
                { icon: <Zap className="h-5 w-5" />, label: "Instant replies", desc: "Sub-second first response at any volume, any hour" },
                { icon: <UserCheck className="h-5 w-5" />, label: "Higher CSAT", desc: "No queues for simple questions means happier customers" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-border bg-card p-4 shadow-sm"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {item.icon}
                  </span>
                  <h3 className="mt-3 text-[14px] font-semibold text-foreground">{item.label}</h3>
                  <p className="mt-1 text-[13px] leading-snug text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── WHY SMSLOCAL ──────────────────────────────────────── */}
        <Section tone="dark">
          <div className="mx-auto max-w-3xl">
            <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-white/85">
              Why SMSLocal
            </span>
            <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              One agent. Every channel. One inbox.
            </h2>
            <p className="mt-5 text-pretty text-[15px] leading-relaxed text-white/70">
              Unlike a single-channel bot, this agent works everywhere your customers are, shares
              one inbox with your team, and runs on the same platform as your campaigns and numbers.
              You don&apos;t need to stitch together three tools to cover WhatsApp, email, and voice
              — it&apos;s already there. And your team sees every conversation in one place, with full
              context, whether the agent handled it or a human did.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/products/ai-agents/"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/15"
              >
                See all AI agents
              </Link>
              <Link
                href="/products/omnichannel-inbox/"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/15"
              >
                Omnichannel inbox
              </Link>
            </div>
          </div>
        </Section>

        {/* ── FAQ ───────────────────────────────────────────────── */}
        <FaqSection
          items={[
            {
              q: "Does it replace my support team?",
              a: "No. It handles routine volume so your team handles the work that needs judgment. Think of it as a first line that never gets tired — escalations still land with a human, and they arrive with full context so no time is wasted.",
            },
            {
              q: "Can it take actions, not just answer questions?",
              a: "Yes, it completes multi-step tasks across your connected tools — looking up orders, updating statuses, checking account details. It resolves the conversation end-to-end rather than just describing what the customer should do themselves.",
            },
            {
              q: "How fast is it to launch?",
              a: "Connect your channels and data, and go live in days — no code required. The agent trains on your help center, PDFs, and website, and you can refine its responses before you flip it on for customers.",
            },
          ]}
        />

        {/* ── INTERNAL LINKS ────────────────────────────────────── */}
        <Section tone="muted">
          <div className="mx-auto max-w-3xl">
            <SectionHeader
              eyebrow="Explore more"
              title="Related resources"
            />
            <ul className="mt-6 space-y-3">
              {[
                { href: "/products/ai-agents/", label: "All AI agent use cases" },
                { href: "/products/ai-agentic/", label: "How agentic AI works" },
                { href: "/products/omnichannel-inbox/", label: "Omnichannel inbox — one place for every channel" },
                { href: "/compare/", label: "Compare SMSLocal with alternatives" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-2 text-[14px] font-medium text-primary hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Section>

        {/* ── FINAL CTA ─────────────────────────────────────────── */}
        <ProductFinalCta
          title="Resolve more tickets without adding headcount."
          subtitle="Connect your channels, train the agent on your data, and go live in days. Your team handles what needs a person — the agent handles everything else."
          primaryCta={{ label: "Get a Demo", href: "/company/contact/" }}
          secondaryCta={{ label: "Start Free", href: "/signup/" }}
        />
      </main>
      <SiteFooter />
    </>
  )
}
