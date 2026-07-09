import type { Metadata } from "next"
import Link from "next/link"
import { getPageMetadata } from "@/lib/seo"
import {
  ArrowRight,
  Bot,
  Languages,
  Mic,
  PhoneCall,
  PhoneForwarded,
  Smile,
  Sparkles,
  Waves,
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

export const metadata: Metadata = getPageMetadata("/voice-ai-agents")

/* ── Hero visual ──────────────────────────────────────────────────────────── */
function VoiceAgentVisual() {
  const transcript = [
    { speaker: "Caller", text: "Hi, I want to check my order status for #7734." },
    { speaker: "AI Agent", text: "Sure — order #7734 shipped yesterday and is out for delivery today by 7 PM. Want me to text you the tracking link?" },
  ]

  const badges = [
    { icon: Languages, label: "Hindi & more" },
    { icon: Waves, label: "Live speech" },
    { icon: Smile, label: "Sentiment: positive" },
  ]

  return (
    <div className="flex h-full min-h-[360px] flex-col gap-4 lg:pl-4">
      <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-md">
        <p className="text-[10.5px] font-semibold uppercase tracking-widest text-white/50">
          {transcript[0].speaker}
        </p>
        <p className="mt-1.5 text-[13px] leading-relaxed text-white/85">{transcript[0].text}</p>
      </div>

      <div className="rounded-xl border border-primary/25 bg-primary/10 px-4 py-3.5 backdrop-blur-md">
        <div className="mb-2 flex items-center gap-1.5">
          <Bot className="h-3.5 w-3.5 text-primary" />
          <span className="text-[10.5px] font-semibold uppercase tracking-widest text-primary">
            AI Agent — answered live, no hold music
          </span>
        </div>
        <p className="text-[13px] leading-relaxed text-white">{transcript[1].text}</p>
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

      <div className="flex items-center gap-2 rounded-xl border border-blue-500/20 bg-blue-500/10 px-4 py-2.5">
        <PhoneForwarded className="h-4 w-4 shrink-0 text-blue-400" />
        <span className="text-[12.5px] font-medium text-blue-300">
          Escalates to a human agent automatically when the caller asks, or gets frustrated
        </span>
      </div>
    </div>
  )
}

export default function VoiceAiAgentsPage() {
  return (
    <>
      <ProductServiceJsonLd
        name="SMSLocal Voice AI Agents"
        description="Agentic AI voice agents that answer and place calls, understand speech in several Indian languages, hold natural conversations, summarise calls, and route to a human — in the same inbox as your WhatsApp AI agents."
        path="/voice-ai-agents"
        category="Conversational Voice AI"
      />
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Voice AI Agents", path: "/voice-ai-agents" },
        ]}
      />
      <SiteHeader />
      <main>

        {/* ── HERO ──────────────────────────────────────────────── */}
        <ProductHero
          compact
          eyebrow="Voice AI Agents"
          title={
            <>
              Agentic AI Voice Agents That
              <br className="hidden sm:block" /> Handle Phone Calls
            </>
          }
          subtitle="Natural voice conversations that resolve inbound and outbound calls and route the rest to a live agent."
          primaryCta={{ label: "Experience Voice AI", href: "/company/contact" }}
          secondaryCta={{ label: "Talk to Sales", href: "/company/contact" }}
          trustBar={[
            { icon: Mic, label: "Natural voice conversations" },
            { icon: PhoneForwarded, label: "Dynamic call routing" },
            { icon: Smile, label: "Transcription and summaries" },
            { icon: Languages, label: "Several Indian languages" },
          ]}
          visual={<VoiceAgentVisual />}
        />

        {/* ── TRUST LINE ────────────────────────────────────────── */}
        <div className="border-b border-border bg-muted/30 py-4">
          <p className="text-center text-[13px] font-medium text-muted-foreground">
            Voice that understands, not a phone tree.
          </p>
        </div>

        {/* ── RESULTS STRIP ─────────────────────────────────────── */}
        <Section>
          <StatsBand
            items={[
              { value: "Natural",    label: "Voice conversations, not a rigid phone tree" },
              { value: "Dynamic", label: "Call routing based on the caller's actual need" },
              { value: "Transcribed", label: "Every call transcribed and summarized" },
              { value: "Indian languages", label: "Support across several major Indian languages" },
            ]}
          />
        </Section>

        {/* ── THE PROBLEM ───────────────────────────────────────── */}
        <Section tone="muted">
          <div className="mx-auto max-w-3xl">
            <SectionHeader
              eyebrow="The problem"
              title="Phone queues frustrate customers and burn agent time"
            />
            <p className="mt-5 text-pretty text-[15px] leading-relaxed text-muted-foreground">
              Phone queues frustrate customers and burn agent time on repetitive calls. An agentic
              AI voice agent answers naturally, resolves what it can, and routes the rest with
              context already gathered — so a human never starts a handoff cold.
            </p>
          </div>
        </Section>

        {/* ── WHAT IT DOES ──────────────────────────────────────── */}
        <CapabilityGrid
          eyebrow="What it does"
          title="A conversational agent for your phone line, not just a menu tree"
          subtitle="Live voice calling and IVR automation today, with natural-language call understanding rolling out to bring the same agentic AI to your phone line."
          items={[
            {
              icon: PhoneCall,
              title: "Natural conversation",
              body: "Speech-to-text, language understanding, and text-to-speech for human-like back-and-forth — this conversational layer is rolling out progressively as we bring it to full production scale.",
            },
            {
              icon: PhoneForwarded,
              title: "Dynamic routing",
              body: "Routes by the caller's actual need, not a rigid menu, for faster resolution and fewer transfers.",
            },
            {
              icon: Smile,
              title: "Transcription and summary",
              body: "Every call transcribed, summarized, and scored for sentiment in the same inbox as your other channels.",
            },
            {
              icon: Mic,
              title: "IVR and queues",
              body: "Automate front-line handling, manage voice queues, and record calls — this part of voice calling is live and in production today.",
            },
          ]}
        />

        {/* ── ONE INBOX FOR VOICE AND CHAT ───────────────────────── */}
        <Section tone="muted">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16 lg:items-center">
            <div>
              <SectionHeader
                eyebrow="One inbox for voice and chat"
                title="A handled call lands beside every other channel"
              />
              <p className="mt-5 text-pretty text-[15px] leading-relaxed text-muted-foreground">
                A handled call lands in the same inbox as your WhatsApp, SMS, and email, so a
                follow-up message picks up where the call ended — no repeating themselves, no
                context lost between channels.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                { icon: <Bot className="h-5 w-5" />,            label: "Same brain, new channel", desc: "Trained on the same data as your WhatsApp AI Agents" },
                { icon: <PhoneForwarded className="h-5 w-5" />, label: "Clean human handoff",      desc: "Full transcript and summary passed to the agent who picks up" },
                { icon: <Waves className="h-5 w-5" />,          label: "Natural conversation",     desc: "Handles pauses, interruptions, and background noise without losing the thread" },
                { icon: <Sparkles className="h-5 w-5" />,       label: "One inbox for everything", desc: "Call transcripts sit next to WhatsApp, SMS, and email threads" },
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
              One agentic AI, consistent across every channel
            </h2>
            <p className="mt-5 text-pretty text-[15px] leading-relaxed text-white/70">
              The voice agent shares the same agentic AI, data, and guardrails as your chat
              agents, so the experience stays consistent across every channel. Not every use case
              needs a conversational agent — for OTP calls, broadcast blasts, or click-to-call from
              your CRM, that's what our Voice product covers.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/products/ai-agentic"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/15"
              >
                Agentic AI
              </Link>
              <Link
                href="/products/voice"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/15"
              >
                Voice — IVR & broadcast
              </Link>
            </div>
          </div>
        </Section>

        {/* ── FAQ ───────────────────────────────────────────────── */}
        <FaqSection
          items={[
            {
              q: "What languages does the voice agent support?",
              a: "Voice AI Agents speak and understand several major Indian languages, including Hindi, matching whatever language the caller opens with. We're continuing to expand language coverage over time.",
            },
            {
              q: "Does it route to humans?",
              a: "Yes, with full context. The agent detects when a caller explicitly asks for a human or sounds frustrated, and routes the call with a transcript and summary so the human agent who picks up doesn't make the caller repeat themselves.",
            },
            {
              q: "Are calls logged?",
              a: "Yes, with transcript and summary in the inbox. Every call is transcribed, summarized, and scored for sentiment right beside your WhatsApp, SMS, and email conversations.",
            },
          ]}
        />

        {/* ── INTERNAL LINKS ────────────────────────────────────── */}
        <Section tone="muted">
          <div className="mx-auto max-w-3xl">
            <SectionHeader eyebrow="Explore more" title="Related resources" />
            <ul className="mt-6 space-y-3">
              {[
                { href: "/products/ai-agentic",        label: "Agentic AI — the platform behind every channel" },
                { href: "/products/ai-agents",         label: "AI Agents — automate WhatsApp support and sales" },
                { href: "/products/omnichannel-inbox", label: "Omnichannel inbox — one place for every channel" },
                { href: "/compare",                    label: "Compare SMSLocal with alternatives" },
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
          title="Automate your phone calls with agentic AI."
          subtitle="Natural voice conversations that resolve calls and route the rest to a live agent — with full context, every time."
          primaryCta={{ label: "Experience Voice AI", href: "/company/contact" }}
          secondaryCta={{ label: "Talk to Sales", href: "/company/contact" }}
        />
      </main>
      <SiteFooter />
    </>
  )
}
