import type { Metadata } from "next"
import Link from "next/link"
import { getPageMetadata } from "@/lib/seo"
import { ArrowRight, Check, FileText, Languages, Route, ScrollText, Sparkles } from "lucide-react"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { RelatedContent } from "@/components/shared/related-content"
import { BreadcrumbJsonLd, FaqJsonLd, ProductServiceJsonLd } from "@/components/seo/json-ld"
import { FaqSection } from "@/components/landing/faq-section"
import { PlainCta } from "@/components/product/plain-blocks"
import { AiAgentsTabs } from "@/components/product/ai-agents-tabs"

// ─── SEO — edit lib/seo/registry.ts or open /dev/seo to preview ──────────────
export const metadata: Metadata = getPageMetadata("/products/ai-agents")

/* ─── DATA ────────────────────────────────────────────────────────────────── */

const LANGS = [
  { name: "Hindi", hello: "नमस्ते" },
  { name: "Tamil", hello: "வணக்கம்" },
  { name: "Telugu", hello: "నమస్కారం" },
  { name: "Bengali", hello: "নমস্কার" },
  { name: "Marathi", hello: "नमस्कार" },
  { name: "Gujarati", hello: "નમસ્તે" },
  { name: "Kannada", hello: "ನಮಸ್ಕಾರ" },
  { name: "Hinglish", hello: "Namaste ji" },
]

const SOURCES = ["FAQ PDFs", "Policy documents", "Product catalogue CSV", "Past chat transcripts", "Website pages"]

const CAPABILITIES = [
  { icon: Languages, title: "Multilingual replies in Indian languages", body: "It follows customers who mix languages in one message and replies in the script they opened with, so the chat never feels translated." },
  { icon: Route, title: "Reads intent and escalates", body: "It spots frustration, routes each customer support conversation to the right team and escalates the moment your rules say so." },
  { icon: ScrollText, title: "Summarises and hands off", body: "Long threads become a one-line recap with the next best action, saved to the customer's profile and synced to your CRM." },
  { icon: FileText, title: "Stays inside your content", body: "Replies come from your FAQs, policies and catalogue, in your tone. When it does not know, it says so and offers a person." },
]

const SHARED = ["Answers from your own knowledge", "Follows your handoff rules", "Takes actions in connected apps", "Logs every step for audit"]

const STEPS = [
  { title: "Train on your knowledge", body: "Add FAQ PDFs, policy documents, catalogue CSVs and past transcripts. Every answer traces back to a source." },
  { title: "Set your handoff rules", body: "Decide by intent, customer tag or time of day when a person steps in, and what Captain says when unsure." },
  { title: "Connect your channels", body: "Captain plugs into your existing WhatsApp, SMS, email and voice inbox. No new numbers, no migration." },
  { title: "Go live", body: "Start with one use case, watch the chats in the shared inbox and widen the agent's remit as trust grows." },
]

const API_ROWS = [
  ["Webhooks", "Inbound, handoff and action events"],
  ["Knowledge", "PDF, DOCX, CSV and URL"],
  ["Actions", "300+ Composio app connectors"],
  ["Auth", "OAuth 2.0 bearer tokens"],
]

const FAQS = [
  { q: "What are AI agents?", a: "AI agents are software that understand a request, decide what to do and act on it. Captain AI is the AI agent built into the SMSLocal inbox: it answers customer questions 24/7 from your own knowledge in Indian languages, takes real actions across your connected apps, routes conversations and hands off to a person with full context." },
  { q: "Can the AI agent reply in Hindi and other Indian languages on WhatsApp?", a: "Yes. Captain reads customers who mix languages in one message, such as Hindi in Latin script or English with Tamil, and replies in the script they opened with. It supports eight Indian languages without a separate translation step, so a Hindi WhatsApp bot and a Tamil one are the same agent." },
  { q: "How does the human handoff work?", a: "You set rules per intent, customer tag or time window. Common triggers are refunds, complaints, VIP accounts or after-hours messages. Captain pauses and pings your team, and the person opens the same thread with the transcript pinned, the intent summarised and a suggested reply ready." },
  { q: "What stops it from inventing answers?", a: "Captain answers only from sources you approve, and every reply traces to its source document. When it is not confident, it follows the fallback you configure: escalate, ask a clarifying question, or quote the closest source and offer a person." },
  { q: "Can I run this on my existing WhatsApp number?", a: "Yes. Captain attaches to your existing WhatsApp Business API number. There is no separate chatbot number and no customer-facing migration. It works across your SMS, email and voice channels too." },
  { q: "How is this priced?", a: "Pay as you go from a single wallet, per resolved conversation on top of Meta's standard WhatsApp fees, with no per-agent monthly platform fee and unlimited agent seats. See the pricing page for current rates." },
  { q: "Is this safe for regulated industries?", a: "Conversations are TLS-encrypted, the knowledge base is workspace-isolated, every answer traces to a source document and every action Captain takes is logged. For banking and healthcare we also offer audit log exports and on-request data-retention controls." },
]

/* ─── STYLE TOKENS ────────────────────────────────────────────────────────── */

const EYEBROW = "inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em]"
const H2 = "text-balance text-[28px] font-semibold leading-[1.08] tracking-[-0.035em] sm:text-[38px]"
const BTN = "group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-primary to-[oklch(0.55_0.13_172)] px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:shadow-xl hover:shadow-primary/30"
const BTN_OUT = "inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3.5 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"

/* ─── KEYFRAMES FOR THE LANGUAGE WHEEL (16s, 8 languages) ─────────────────── */

const SLOT = 100 / LANGS.length
const pos = (i: number) => {
  const a = (i / LANGS.length) * Math.PI * 2 - Math.PI / 2
  return { x: 50 + 43 * Math.cos(a), y: 50 + 43 * Math.sin(a) }
}
const window3 = (name: string, i: number, on: string, off: string) => {
  const a = i * SLOT
  const b = a + SLOT
  return i === 0
    ? `@keyframes ${name} { 0%, ${b - 1.5}% { ${on} } ${b}%, 98% { ${off} } 100% { ${on} } }`
    : `@keyframes ${name} { 0%, ${a}% { ${off} } ${a + 1.5}%, ${b - 1.5}% { ${on} } ${b}%, 100% { ${off} } }`
}
const KEYFRAMES = LANGS.flatMap((_, i) => [
  window3(`aghello${i}`, i, "opacity: 1; transform: none", "opacity: 0; transform: translateY(10px)"),
  window3(`aglab${i}`, i, "color: var(--primary); background-color: color-mix(in oklch, var(--primary) 13%, transparent); transform: translate(-50%, -50%) scale(1.12)", "color: var(--muted-foreground); background-color: transparent; transform: translate(-50%, -50%) scale(1)"),
  window3(`agline${i}`, i, "stroke-opacity: .9", "stroke-opacity: .14"),
]).join("\n")

/* ─── PAGE ────────────────────────────────────────────────────────────────── */

export default function AiAgentsPage() {
  return (
    <>
      <ProductServiceJsonLd
        name="Captain AI — AI Support Agent"
        description="Captain AI is an AI customer-support agent that answers in eight Indian languages, takes real actions across 300+ connected apps via Composio, routes and escalates conversations, and hands off cleanly to a human — with macros, canned responses, SLAs, roles and audit logs built in."
        path="/products/ai-agents"
        category="Conversational AI for customer support"
      />
      <BreadcrumbJsonLd crumbs={[{ name: "Home", path: "/" }, { name: "Products", path: "/products" }, { name: "AI Agents", path: "/products/ai-agents" }]} />
      <SiteHeader />
      <main className="overflow-x-clip bg-background font-normal text-foreground">

        {/* 1 · HERO: a language wheel. Captain greets in a new Indian language every two seconds */}
        <section className="relative isolate overflow-hidden">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -left-40 top-0 h-[460px] w-[460px] rounded-full bg-primary/8 blur-[130px]" />
            <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_70%_40%,black_10%,transparent_70%)]" />
          </div>
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-20 pt-14 sm:px-6 lg:grid-cols-[1fr_460px] lg:gap-14 lg:pb-28 lg:pt-20">
            <div className="ag-rise">
              <p className="inline-flex items-center gap-2 rounded-full bg-foreground px-3.5 py-1.5 text-[12.5px] font-medium text-background">
                <Sparkles className="h-3.5 w-3.5 text-accent" />AI agents · Captain AI
              </p>
              <h1 className="mt-6 text-balance text-[30px] font-semibold leading-[1.1] tracking-[-0.035em] sm:text-[42px]">
                AI WhatsApp agents that reply in <span className="text-primary">your customers' language.</span>
              </h1>
              <p className="mt-5 max-w-lg text-pretty text-[17px] leading-relaxed text-muted-foreground">
                Captain AI is a multilingual AI agent for customer support. It replies on WhatsApp in eight Indian languages, 24/7, learns from your own content and hands off to a person the moment one is needed.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link href="/signup/" className={BTN}>Start your trial <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" /></Link>
                <Link href="/company/contact/" className={BTN_OUT}>Talk to sales</Link>
              </div>
            </div>

            <div className="ag-rise relative mx-auto aspect-square w-full max-w-[400px]" style={{ animationDelay: "0.15s" }} aria-hidden>
              <div aria-hidden className="absolute inset-[14%] rounded-full bg-gradient-to-br from-primary/10 via-primary/[0.04] to-transparent" />
              <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" fill="none">
                <circle cx="50" cy="50" r="43" stroke="var(--border)" strokeWidth="0.3" />
                <circle cx="50" cy="50" r="30" stroke="var(--border)" strokeWidth="0.3" strokeDasharray="1 2" className="ag-orbit" />
                {LANGS.map((l, i) => {
                  const p = pos(i)
                  return <line key={l.name} x1="50" y1="50" x2={p.x} y2={p.y} stroke="var(--primary)" strokeWidth="0.35" style={{ animation: `agline${i} 16s linear infinite` }} />
                })}
              </svg>
              {LANGS.map((l, i) => {
                const p = pos(i)
                return (
                  <span key={l.name} className="absolute whitespace-nowrap rounded-full px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground" style={{ left: `${p.x}%`, top: `${p.y}%`, transform: "translate(-50%, -50%)", animation: `aglab${i} 16s linear infinite` }}>
                    <i className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-current align-middle" />{l.name}
                  </span>
                )
              })}
              <div className="absolute left-1/2 top-1/2 w-[58%] -translate-x-1/2 -translate-y-1/2 text-center">
                <div className="relative h-[60px]">
                  {LANGS.map((l, i) => (
                    <p key={l.name} className="ag-hello absolute inset-0 flex items-center justify-center text-[34px] font-semibold tracking-tight sm:text-[40px]" style={{ animation: `aghello${i} 16s linear infinite`, opacity: 0 }}>{l.hello}</p>
                  ))}
                </div>
                <p className="mt-2 flex items-center justify-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.18em] text-primary"><i className="ag-pulse-dot h-1.5 w-1.5 rounded-full bg-primary" />Captain replies in the same language</p>
              </div>
            </div>
          </div>
        </section>

        {/* 2 · GROUNDED ANSWERS: one big sentence with its source attached */}
        <section className="bg-secondary py-20 lg:py-28">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <p className={`${EYEBROW} text-primary`}>AI agents grounded in your content</p>
            <p className="mt-8 text-balance text-[24px] font-medium leading-[1.4] tracking-[-0.02em] sm:text-[34px]">
              “Your refund starts the moment we receive the return.”
              <span className="ml-2 inline-flex items-center gap-1.5 whitespace-nowrap rounded-md bg-primary/12 px-2 py-0.5 align-middle font-mono text-[12px] font-medium tracking-normal text-primary"><FileText className="h-3.5 w-3.5" />Return policy.pdf</span>
            </p>
            <h2 className={`${H2} mx-auto mt-10 max-w-2xl`}>Every answer comes from a source you approved.</h2>
            <p className="mx-auto mt-4 max-w-xl text-[16px] leading-relaxed text-muted-foreground">Your AI agent knowledge base is built only from your own documents. No public web scraping, no generic training data leaking through. If Captain is not sure, it says so and offers a person.</p>
            <p className="mt-9 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 font-mono text-[12px] uppercase tracking-[0.14em] text-foreground/70">
              {SOURCES.map((s, i) => (<span key={s} className="flex items-center gap-3">{s}{i < SOURCES.length - 1 ? <i className="h-1 w-1 rounded-full bg-primary" /> : null}</span>))}
            </p>
          </div>
        </section>

        {/* 3 · WHAT AI AGENTS DO: four quadrants split by a cross */}
        <section className="bg-background py-20 lg:py-28">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <p className={`${EYEBROW} text-primary`}>What AI agents do</p>
              <h2 className={`${H2} mt-5`}>An agent that thinks, acts and knows when to step back.</h2>
            </div>
            <div className="mt-14 grid md:grid-cols-2">
              {CAPABILITIES.map((c, i) => {
                const Icon = c.icon
                return (
                  <div key={c.title} className={`group border-border p-8 sm:p-10 ${i > 0 ? "border-t" : ""} md:border-t-0 ${i >= 2 ? "md:border-t" : ""} ${i % 2 === 1 ? "md:border-l" : ""}`}>
                    <Icon className="h-9 w-9 text-primary transition duration-300 group-hover:-translate-y-1" strokeWidth={1.5} />
                    <h3 className="mt-6 text-[22px] font-semibold tracking-tight">{c.title}</h3>
                    <p className="mt-2 max-w-sm text-[15.5px] leading-relaxed text-muted-foreground">{c.body}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* 4 · USE CASES: a tab switcher, one live example at a time */}
        <section className="bg-secondary py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <p className={`${EYEBROW} text-primary`}>AI agent use cases</p>
            <h2 className={`${H2} mt-5 max-w-2xl`}>AI agent use cases for support, sales and bookings.</h2>
            <AiAgentsTabs />
          </div>
        </section>

        {/* 5 · ONE AGENT, EVERY CHANNEL: the same answer, written the way each channel needs it */}
        <section className="bg-background py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <p className={`${EYEBROW} text-primary`}>One AI agent, every channel</p>
              <h2 className={`${H2} mt-5`}>One answer, delivered the way each channel needs it.</h2>
              <p className="mt-4 max-w-lg text-[16px] leading-relaxed text-muted-foreground">The same Captain answers on WhatsApp, SMS, email and voice, 24/7, from the same knowledge and under the same rules.</p>
            </div>

            <div className="mt-14 grid gap-10 border-t border-foreground/80 pt-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-border">
              {/* WhatsApp */}
              <div className="lg:pr-8">
                <p className="text-[17px] font-semibold tracking-tight">WhatsApp</p>
                <p className="mt-0.5 text-[12.5px] text-muted-foreground">Official Business API</p>
                <p className="mt-6 text-[16px] leading-relaxed">Your refund starts the moment we receive the return.</p>
                <p className="mt-3 flex items-center gap-1 font-mono text-[11px] text-primary"><Check className="-mr-2.5 h-3.5 w-3.5" strokeWidth={3} /><Check className="h-3.5 w-3.5" strokeWidth={3} /><span className="ml-1.5">Delivered and read</span></p>
              </div>
              {/* SMS and RCS */}
              <div className="lg:px-8">
                <p className="text-[17px] font-semibold tracking-tight">SMS and RCS</p>
                <p className="mt-0.5 text-[12.5px] text-muted-foreground">DLT-compliant and branded</p>
                <p className="mt-6 text-[16px] leading-relaxed">Your refund starts once we receive your return. Reply HELP for support.</p>
                <p className="mt-3 font-mono text-[11px] text-muted-foreground">Short and plain, kept within one message</p>
              </div>
              {/* Email */}
              <div className="lg:px-8">
                <p className="text-[17px] font-semibold tracking-tight">Email</p>
                <p className="mt-0.5 text-[12.5px] text-muted-foreground">Triage, draft and send</p>
                <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Subject</p>
                <p className="text-[16px] font-semibold leading-snug">About your refund</p>
                <p className="mt-3 text-[16px] leading-relaxed">Hello, your refund starts the moment we receive the return. <span className="ag-caret inline-block h-[1em] w-[2px] translate-y-[3px] bg-primary" /></p>
              </div>
              {/* Voice */}
              <div className="lg:pl-8">
                <p className="text-[17px] font-semibold tracking-tight">Voice</p>
                <p className="mt-0.5 text-[12.5px] text-muted-foreground">Hand over full context</p>
                <p className="mt-6 text-[16px] leading-relaxed">“Your refund starts the moment we receive the return.”</p>
                <span aria-hidden className="mt-4 flex h-6 items-center gap-[3px]">
                  {[0.5, 0.9, 0.6, 1, 0.45, 0.8, 0.55, 0.95, 0.4, 0.7, 0.5, 0.85].map((h, i) => (
                    <i key={i} className="ag-wave w-[3px] rounded-full bg-primary" style={{ height: `${h * 100}%`, animationDelay: `${i * 0.09}s` }} />
                  ))}
                </span>
              </div>
            </div>

            <ul className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-2 border-t border-border pt-6 font-mono text-[12px] uppercase tracking-[0.14em] text-foreground/70">
              {SHARED.map((s) => (<li key={s} className="flex items-center gap-2.5"><i className="h-1.5 w-1.5 rounded-full bg-primary" />{s}</li>))}
            </ul>
            <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-muted-foreground"><span className="font-semibold text-foreground">Routine questions are resolved by Captain.</span> Everything else reaches your team with the transcript pinned, the intent summarised and a reply suggested. Billing comes from one wallet.</p>
          </div>
        </section>

        {/* 6 · HOW IT WORKS: a staircase, each step a little further right */}
        <section className="bg-secondary py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <p className={`${EYEBROW} text-primary`}>How to set up an AI agent</p>
            <h2 className={`${H2} mt-5 max-w-2xl`}>From your documents to your first auto-resolved chat.</h2>
            <ol className="mt-14 space-y-8">
              {STEPS.map((s, i) => (
                <li key={s.title} className="ag-stair relative flex items-start gap-5 border-l-2 border-primary/70 pl-6" style={{ ["--ml" as string]: `${i * 9}%` }}>
                  <span className="font-mono text-[13px] text-primary">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="text-[22px] font-semibold tracking-tight">{s.title}</h3>
                    <p className="mt-1.5 max-w-md text-[15.5px] leading-relaxed text-muted-foreground">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 7 · DEVELOPERS: one endpoint line, four columns of facts */}
        <section className="bg-background py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
            <p className={`${EYEBROW} text-primary`}>AI agent API</p>
            <h2 className={`${H2} mx-auto mt-5 max-w-xl`}>One REST API, one token.</h2>
            <p className="mx-auto mt-4 max-w-md text-[16px] leading-relaxed text-muted-foreground">The same stack as the rest of SMSLocal, so your engineers learn it once.</p>
            <p className="mt-10 overflow-x-auto whitespace-nowrap font-mono text-[18px] font-medium text-primary sm:text-[28px]"><span className="text-foreground/35">$ </span>POST /v1/agents/respond<span className="ag-caret ml-1 inline-block h-[1em] w-[3px] translate-y-[3px] bg-primary" /></p>
            <dl className="mt-12 grid grid-cols-2 gap-y-10 text-left md:grid-cols-4 md:divide-x md:divide-border">
              {API_ROWS.map(([k, v]) => (
                <div key={k} className="pr-4 md:px-8 md:first:pl-0 md:last:pr-0">
                  <dt className="text-[22px] font-semibold tracking-tight">{k}</dt>
                  <dd className="mt-1.5 text-[14.5px] leading-relaxed text-muted-foreground">{v}</dd>
                </div>
              ))}
            </dl>
            <Link href="/developers/api-docs/" className="mt-12 inline-flex items-center gap-2 text-[15px] font-semibold text-foreground underline decoration-border underline-offset-4 transition hover:decoration-foreground">
              View API docs <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* 8 · FAQ (shared with the home page), related pages and the closing band */}
        <FaqJsonLd items={FAQS} path="/products/ai-agents" />
        <FaqSection items={FAQS} />

        <RelatedContent path="/products/ai-agents" />

        <PlainCta
          title="Put Captain AI on your support inbox."
          text="Connect your apps, train it on your documents, let it reply in eight Indian languages, and hand off to your team only when it matters."
          primary={{ label: "Start your trial", href: "/signup/" }}
          secondary={{ label: "Talk to sales", href: "/company/contact/" }}
        />
      </main>
      <SiteFooter />

      <style>{`
        ${KEYFRAMES}
        @keyframes ag-rise { from { opacity: 0; transform: translateY(26px) } to { opacity: 1; transform: none } }
        @keyframes ag-orbit { to { transform: rotate(360deg) } }
        @keyframes ag-pulse-dot { 0%, 100% { opacity: 1 } 50% { opacity: .3 } }
        @keyframes ag-drop { 0% { top: 8px } 100% { top: calc(100% - 20px) } }
        @keyframes ag-caret { 0%, 49% { opacity: 1 } 50%, 100% { opacity: 0 } }
        @keyframes ag-wave { 0%, 100% { transform: scaleY(0.35) } 50% { transform: scaleY(1) } }
        @keyframes ag-fadein { from { opacity: 0; transform: translateY(8px) } to { opacity: 1; transform: none } }
        @keyframes ag-row { from { opacity: 0; transform: translateX(-12px) } to { opacity: 1; transform: none } }

        .ag-rise { animation: ag-rise .9s cubic-bezier(.2,.7,.2,1) both }
        .ag-orbit { transform-origin: 50px 50px; animation: ag-orbit 60s linear infinite }
        .ag-pulse-dot { animation: ag-pulse-dot 1.6s ease-in-out infinite }
        .ag-drop { animation: ag-drop 3.2s ease-in-out infinite alternate }
        .ag-caret { animation: ag-caret 1s step-end infinite }
        .ag-wave { transform-origin: center; animation: ag-wave 1.1s ease-in-out infinite }
        .ag-fadein { animation: ag-fadein .35s ease-out }
        @media (min-width: 768px) { .ag-stair { margin-left: var(--ml) } }

        @media (prefers-reduced-motion: reduce) {
          .ag-rise, .ag-orbit, .ag-pulse-dot, .ag-caret, .ag-fadein, .ag-wave { animation: none }
          .ag-hello { animation: none !important; opacity: 0 !important } .ag-hello:first-child { opacity: 1 !important }
        }
      `}</style>
    </>
  )
}
