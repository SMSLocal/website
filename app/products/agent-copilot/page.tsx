import type { Metadata } from "next"
import Link from "next/link"
import { getPageMetadata } from "@/lib/seo"
import {
  ArrowRight,
  Bot,
  FileText,
  GraduationCap,
  MessageSquare,
  Sparkles,
  Type,
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

export const metadata: Metadata = getPageMetadata("/products/agent-copilot")

/* ── Hero visual ──────────────────────────────────────────────────────────── */
function CopilotVisual() {
  const suggestion = {
    customer: "Hi, my order #4821 hasn't arrived yet and it's been 6 days.",
    draft:
      "Hi! Sorry for the delay — I can see order #4821 is out for delivery and should arrive today. Want me to send you the live tracking link?",
  }

  const badges = [
    { icon: Sparkles, label: "Suggested reply" },
    { icon: Type, label: "Tone: friendly" },
    { icon: FileText, label: "Grounded in order data" },
  ]

  return (
    <div className="flex h-full min-h-[280px] flex-col justify-center gap-4 lg:pl-4">
      {/* Customer message */}
      <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-md">
        <p className="text-[10.5px] font-semibold uppercase tracking-widest text-white/50">
          Customer
        </p>
        <p className="mt-1.5 text-[13px] leading-relaxed text-white/85">{suggestion.customer}</p>
      </div>

      {/* Copilot draft card */}
      <div className="rounded-xl border border-primary/25 bg-primary/10 px-4 py-3.5 backdrop-blur-md">
        <div className="mb-2 flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          <span className="text-[10.5px] font-semibold uppercase tracking-widest text-primary">
            Copilot draft — ready to send
          </span>
        </div>
        <p className="text-[13px] leading-relaxed text-white">{suggestion.draft}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {badges.map((b) => (
            <span
              key={b.label}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/8 px-2.5 py-0.5 text-[11px] font-medium text-white/75"
            >
              <b.icon className="h-3 w-3" /> {b.label}
            </span>
          ))}
        </div>
      </div>

      {/* Speed badge */}
      <div className="flex items-center gap-2 rounded-xl border border-blue-500/20 bg-blue-500/10 px-4 py-2.5">
        <Zap className="h-4 w-4 shrink-0 text-blue-400" />
        <span className="text-[12.5px] font-medium text-blue-300">
          Drafted in under a second — agent just reviews and hits send
        </span>
      </div>
    </div>
  )
}

export default function AgentCopilotPage() {
  return (
    <>
      <ProductServiceJsonLd
        name="SMSLocal Agent Copilot"
        description="Agentic AI copilot for human agents — drafts on-brand replies, summarizes threads, and surfaces knowledge-grounded answers so your team responds faster and more consistently."
        path="/products/agent-copilot"
        category="AI Customer Support Copilot"
      />
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
          { name: "Agent Copilot", path: "/products/agent-copilot" },
        ]}
      />
      <SiteHeader />
      <main>

        {/* ── HERO ──────────────────────────────────────────────── */}
        <ProductHero
          compact
          eyebrow="Products · Agent Copilot"
          title={
            <>
              An Agentic AI Copilot Inside
              <br className="hidden sm:block" /> Every Agent&apos;s Reply Box
            </>
          }
          subtitle="Reply drafting, thread summaries, and knowledge-grounded answers that make your human team faster and more consistent."
          primaryCta={{ label: "Get a Demo", href: "/company/contact/" }}
          secondaryCta={{ label: "Start Free", href: "/signup/" }}
          trustBar={[
            { icon: Sparkles, label: "On-brand reply drafts" },
            { icon: FileText, label: "5-second thread summaries" },
            { icon: MessageSquare, label: "Knowledge-grounded answers" },
            { icon: GraduationCap, label: "Works on every channel" },
          ]}
          visual={<CopilotVisual />}
        />

        {/* ── TRUST LINE ────────────────────────────────────────── */}
        <div className="border-b border-border bg-muted/30 py-4">
          <p className="text-center text-[13px] font-medium text-muted-foreground">
            The same agentic AI that serves customers now assists your team.
          </p>
        </div>

        {/* ── RESULTS STRIP ─────────────────────────────────────── */}
        <Section>
          <StatsBand
            items={[
              { value: "On-brand", label: "Reply drafts your agents can send or edit in one click" },
              { value: "5-second",  label: "Thread summaries so anyone can pick up context fast" },
              { value: "Grounded",label: "Answers pulled straight from your knowledge base" },
              { value: "Every channel",label: "Works wherever your team is already replying" },
            ]}
          />
        </Section>

        {/* ── THE PROBLEM ───────────────────────────────────────── */}
        <Section tone="muted">
          <div className="mx-auto max-w-3xl">
            <SectionHeader
              eyebrow="The problem"
              title="The right answer exists somewhere — just not where your agent is looking"
            />
            <p className="mt-5 text-pretty text-[15px] leading-relaxed text-muted-foreground">
              Agents lose time rereading long threads, hunting for policies, and rewriting the same
              answers. A copilot built into the inbox removes that drag so your team resolves
              faster without sacrificing quality.
            </p>
          </div>
        </Section>

        {/* ── WHAT IT DOES ──────────────────────────────────────── */}
        <CapabilityGrid
          eyebrow="What it does"
          title="Everything your agents need, one keystroke into the conversation"
          subtitle="Copilot sits inside every conversation, ready with a sourced answer, a draft, or a summary — never taking over, always assisting."
          items={[
            {
              icon: Type,
              title: "Drafts replies",
              body: "Suggests on-brand responses your agents can send or edit in one click — no starting from a blank box on a repeat question.",
            },
            {
              icon: FileText,
              title: "Summarizes threads",
              body: "Condenses long conversations into a few lines so anyone can pick up the context fast, whether it's an escalation, a handoff, or a shift change.",
            },
            {
              icon: MessageSquare,
              title: "Surfaces answers",
              body: "Pulls grounded answers from your knowledge base, right where the agent is typing — no switching tabs to check a policy or product detail.",
            },
            {
              icon: GraduationCap,
              title: "Adjusts tone",
              body: "Rephrases and shifts tone on demand to match the customer and the moment, so replies stay consistent no matter who is typing.",
            },
          ]}
        />

        {/* ── WHY IT WORKS ──────────────────────────────────────── */}
        <Section tone="muted">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16 lg:items-center">
            <div>
              <SectionHeader
                eyebrow="Why it works"
                title="Less time on mechanics, more time on the customer"
              />
              <p className="mt-5 text-pretty text-[15px] leading-relaxed text-muted-foreground">
                Agents spend less time on mechanics and more on the customer. New hires ramp faster
                because the copilot carries your knowledge and tone for them, so quality doesn&apos;t
                dip while someone is still learning the ropes.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                { icon: <Zap className="h-5 w-5" />,             label: "No more tab-switching", desc: "Answers arrive inside the chat — no separate doc or system to check" },
                { icon: <Bot className="h-5 w-5" />,              label: "Human in control",       desc: "Every suggestion is a draft — your agent reviews before it sends" },
                { icon: <MessageSquare className="h-5 w-5" />,    label: "Consistent quality",      desc: "Every reply matches your tone, whoever is typing it" },
                { icon: <GraduationCap className="h-5 w-5" />,    label: "Gets better over time",   desc: "Learns from every conversation your team resolves" },
              ].map((item) => (
                <div key={item.label} className="rounded-xl border border-border bg-card p-4 shadow-sm">
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
              Copilot for humans, AI Agents for automation — one inbox, both
            </h2>
            <p className="mt-5 text-pretty text-[15px] leading-relaxed text-white/70">
              Copilot shares the same agentic AI, data, and guardrails as your customer-facing
              agent, so human and AI replies stay consistent across every channel — you decide
              conversation by conversation how much AI handles.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/products/ai-agentic/"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/15"
              >
                Agentic AI
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
              q: "Does it replace agents?",
              a: "No, it makes them faster and more consistent. Every suggested reply, summary, and answer waits for an agent to review and send — Copilot assists, it doesn't take over the conversation.",
            },
            {
              q: "Which channels does it work across?",
              a: "Every channel in the inbox — WhatsApp, RCS, SMS, voice, email, and social conversations all get the same copilot, with no separate setup per channel.",
            },
            {
              q: "Where does it get answers?",
              a: "Your help center, PDFs, catalog, and website — Copilot pulls grounded answers from the same knowledge base your customer-facing agent uses.",
            },
          ]}
        />

        {/* ── INTERNAL LINKS ────────────────────────────────────── */}
        <Section tone="muted">
          <div className="mx-auto max-w-3xl">
            <SectionHeader eyebrow="Explore more" title="Related resources" />
            <ul className="mt-6 space-y-3">
              {[
                { href: "/products/ai-agentic/",        label: "Agentic AI — automate support and sales" },
                { href: "/products/omnichannel-inbox/", label: "Omnichannel inbox — one place for every channel" },
                { href: "/products/analytics/",         label: "Analytics — CSAT, NPS, and campaign results" },
                { href: "/compare/",                    label: "Compare SMSLocal with alternatives" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-2 text-[14px] font-medium text-primary hover:underline"
                  >
                    {link.label} <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Section>

        {/* ── FINAL CTA ─────────────────────────────────────────── */}
        <ProductFinalCta
          title="Give every agent an AI copilot."
          subtitle="Drafted replies, thread summaries, and knowledge-grounded answers — connect your inbox and let your team respond faster and more consistently."
          primaryCta={{ label: "Get a Demo", href: "/company/contact/" }}
          secondaryCta={{ label: "Start Free", href: "/signup/" }}
        />
      </main>
      <SiteFooter />
    </>
  )
}
