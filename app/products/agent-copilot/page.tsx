import type { Metadata } from "next"
import Link from "next/link"
import { getPageMetadata } from "@/lib/seo"
import { ArrowRight, ArrowUpRight, BookOpen, Check, FileText, Sparkles, Type } from "lucide-react"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { FaqSection } from "@/components/landing/faq-section"
import { BreadcrumbJsonLd, FaqJsonLd, ProductServiceJsonLd } from "@/components/seo/json-ld"
import { ProductFinalCta } from "@/components/product/product-page"
import { CopilotGlass } from "@/components/product/copilot-glass"

export const metadata: Metadata = getPageMetadata("/products/agent-copilot")

/* ─── DATA ────────────────────────────────────────────────────────────────── */

/* where an agent's time goes on one ticket, with and without Copilot (illustrative split) */
const BEFORE = [
  { l: "Read the thread", w: 28, c: "bg-foreground/80 text-background" },
  { l: "Hunt for the answer", w: 24, c: "bg-foreground/55 text-background" },
  { l: "Type the reply", w: 32, c: "bg-foreground/35 text-foreground" },
  { l: "Think", w: 16, c: "bg-primary text-primary-foreground" },
]
const AFTER = [
  { l: "Skim summary", w: 6, c: "bg-foreground/80 text-background" },
  { l: "Answer found", w: 4, c: "bg-foreground/55 text-background" },
  { l: "Review draft", w: 12, c: "bg-foreground/35 text-foreground" },
  { l: "Think", w: 16, c: "bg-primary text-primary-foreground" },
]

/* the command palette: four things Copilot does, one at a time */
const COMMANDS = [
  { key: "Tab", name: "Draft a reply", out: "Sorry for the wait! Order #4821 is out for delivery and should reach you today. Want the live tracking link?" },
  { key: "/sum", name: "Summarise the thread", out: "Order #4821 is 6 days late. Courier delay confirmed. Customer wants a delivery date and tracking." },
  { key: "/kb", name: "Find the answer", out: "Delivery policy: orders ship in 2 to 4 days and can be tracked from the order page. Source: Help centre." },
  { key: "/tone", name: "Change the tone", out: "Friendly: “Sorry about the wait, your order is on its way and lands today.”" },
]

/* the 5-second summary */
const THREAD = [62, 38, 74, 30, 56, 80, 44, 66, 34, 58, 72, 40]
const SUMMARY: [string, string][] = [
  ["Issue", "Order #4821 is 6 days late."],
  ["Tried so far", "Courier delay confirmed twice."],
  ["Next step", "Share tracking and a delivery date."],
]

/* one message, three tones */
const TONES = [
  { n: "Formal", t: "Good afternoon. I apologise for the delay with order #4821. It is out for delivery and will arrive today." },
  { n: "Friendly", t: "Sorry for the wait! Order #4821 is out for delivery and should reach you today." },
  { n: "Casual", t: "Hey, sorry about that! Your order #4821 is on its way and lands today." },
]

const FAQS = [
  { q: "What is an AI agent copilot?", a: "An AI agent copilot sits inside your inbox's reply box and helps human agents work faster. It drafts replies, summarises long threads, finds answers in your knowledge base and adjusts tone. The agent reviews every suggestion before it is sent." },
  { q: "Does it replace agents?", a: "No, it makes them faster and more consistent. Every suggested reply, summary and answer waits for an agent to review and send. Copilot assists, it does not take over the conversation." },
  { q: "Which channels does it work across?", a: "Every channel in the inbox, including WhatsApp, RCS, SMS, voice, email and social conversations. They all get the same copilot with no separate setup per channel." },
  { q: "Where does it get its answers?", a: "From your help centre, PDFs, product catalog and website. Copilot pulls grounded answers from the same knowledge base your customer-facing AI agent uses." },
  { q: "Can I control the tone of the replies?", a: "Yes. Agents can rephrase any draft on demand, for example more formal, friendly or short, so replies match the customer and the moment whoever is typing." },
  { q: "How is Copilot different from AI agents?", a: "AI agents answer customers on their own. Copilot helps your human team answer better. Both share the same data and guardrails, so you decide conversation by conversation how much AI handles." },
  { q: "Does it help new agents ramp up faster?", a: "Yes. The copilot carries your knowledge and tone, so a new hire starts with sourced answers and on-brand drafts instead of learning every policy first." },
]

/* ─── STYLE TOKENS ────────────────────────────────────────────────────────── */

const EYEBROW = "inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em]"
const H2 = "text-balance text-[28px] font-semibold leading-[1.08] tracking-[-0.035em] sm:text-[38px]"
const BTN = "group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-primary to-[oklch(0.55_0.13_172)] px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:shadow-xl hover:shadow-primary/30"
const BTN_OUT = "inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3.5 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"

/* ─── PAGE ────────────────────────────────────────────────────────────────── */

export default function AgentCopilotPage() {
  return (
    <>
      <ProductServiceJsonLd
        name="SMSLocal Agent Copilot"
        description="Agentic AI copilot for human agents. It drafts on-brand replies, summarises threads and surfaces knowledge-grounded answers so your team responds faster and more consistently."
        path="/products/agent-copilot"
        category="AI Customer Support Copilot"
      />
      <BreadcrumbJsonLd crumbs={[{ name: "Home", path: "/" }, { name: "Products", path: "/products" }, { name: "Agent Copilot", path: "/products/agent-copilot" }]} />
      <SiteHeader />
      <main className="overflow-x-clip bg-background font-normal text-foreground">

        {/* 1 · HERO: Copilot helping a human agent reply: summary, a typed draft, Use reply, sent */}
        <section className="relative isolate overflow-hidden bg-background">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 opacity-50 [background-image:radial-gradient(var(--border)_1.2px,transparent_1.2px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_at_72%_48%,black_10%,transparent_70%)]" />
          </div>
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-14 pt-14 sm:px-6 lg:grid-cols-[1fr_560px] lg:gap-8 lg:pb-20 lg:pt-12">
            <div className="cp-rise">
              <p className="inline-flex items-center gap-2 rounded-full bg-foreground px-3.5 py-1.5 text-[12.5px] font-medium text-background">
                <Sparkles className="h-3.5 w-3.5 text-accent" />Agent Copilot
              </p>
              <h1 className="mt-6 text-balance text-[30px] font-semibold leading-[1.1] tracking-[-0.035em] sm:text-[42px]">
                AI agent copilot that <span className="text-primary">drafts every reply.</span>
              </h1>
              <p className="mt-5 max-w-lg text-pretty text-[17px] leading-relaxed text-muted-foreground">
                An agentic AI copilot inside your agents&apos; reply box. It drafts on-brand replies, summarises long threads and finds answers in your knowledge base, so your team responds faster and stays consistent.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link href="/company/contact/" className={BTN}>Get a demo <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" /></Link>
                <Link href="/signup/" className={BTN_OUT}>Start your trial</Link>
              </div>
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-muted-foreground">
                {["On-brand drafts", "5-second thread summaries", "Works on every channel"].map((t) => (
                  <li key={t} className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" strokeWidth={3} />{t}</li>
                ))}
              </ul>
            </div>
            <div className="cp-rise relative" style={{ animationDelay: "0.15s" }}>
              <CopilotGlass />
            </div>
          </div>
        </section>

        {/* 2 · THE PROBLEM: where an agent's time goes, drawn as two bars */}
        <section className="bg-secondary py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <p className={`${EYEBROW} text-primary`}>The problem</p>
              <h2 className={`${H2} mt-5`}>The right answer exists. Your agent just has to find it.</h2>
              <p className="mt-4 max-w-lg text-[16px] leading-relaxed text-muted-foreground">Agents lose minutes rereading long threads, hunting for policies and retyping the same answer. Copilot removes that drag so only the thinking is left.</p>
            </div>
            <div className="mt-14 space-y-10">
              {[
                { title: "Without Copilot", rows: BEFORE, total: 100, muted: true },
                { title: "With Copilot", rows: AFTER, total: 38, muted: false },
              ].map((bar) => (
                <div key={bar.title}>
                  <p className={`mb-3 font-mono text-[11px] uppercase tracking-[0.2em] ${bar.muted ? "text-muted-foreground" : "text-primary"}`}>{bar.title}</p>
                  <div className="flex h-14 w-full overflow-hidden rounded-xl">
                    {bar.rows.map((r, i) => (
                      <div key={r.l} className="cp-seg relative h-full overflow-hidden" style={{ width: `${r.w}%`, animationDelay: `${i * 0.15 + (bar.muted ? 0 : 0.9)}s` }}>
                        <div className={`flex h-full items-center px-3 text-[12.5px] font-medium ${r.c}`}><span className="truncate">{r.l}</span></div>
                      </div>
                    ))}
                    {bar.total < 100 && (
                      <div className="cp-saved flex h-full flex-1 items-center justify-center rounded-r-xl border-2 border-dashed border-primary/40 text-[13px] font-semibold text-primary" style={{ animationDelay: "1.8s" }}>
                        <Check className="mr-1.5 h-4 w-4" strokeWidth={3} />Time back for the customer
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <p className="text-[12.5px] text-muted-foreground">Illustrative split of one agent&apos;s time on a typical ticket.</p>
            </div>
          </div>
        </section>

        {/* 3 · WHAT IT DOES: a command palette that steps through four jobs */}
        <section className="bg-background py-20 lg:py-28">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div>
              <p className={`${EYEBROW} text-primary`}>What an AI reply assistant does</p>
              <h2 className={`${H2} mt-5`}>Four jobs, one keystroke from the reply box.</h2>
              <p className="mt-4 max-w-md text-[16px] leading-relaxed text-muted-foreground">Copilot never takes over. It drafts, summarises, finds and rephrases on demand, and the agent decides what is sent.</p>
              <ul className="mt-7 space-y-3 text-[15px]">
                {[{ i: Type, t: "Drafts on-brand replies" }, { i: FileText, t: "Summarises long threads" }, { i: BookOpen, t: "Finds answers in your knowledge base" }, { i: Sparkles, t: "Changes the tone on demand" }].map((x) => (
                  <li key={x.t} className="flex items-center gap-3"><x.i className="h-[18px] w-[18px] text-primary" />{x.t}</li>
                ))}
              </ul>
            </div>
            <div className="cp-pal overflow-hidden rounded-2xl bg-foreground text-background shadow-[0_30px_70px_-30px_rgba(15,26,46,.55)]">
              <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4 font-mono text-[14px] text-background/70">
                <span className="text-primary">/</span>Ask Copilot<span className="cp-caret ml-0.5 inline-block h-[18px] w-[2px] bg-primary" />
              </div>
              <ul className="p-2">
                {COMMANDS.map((c, i) => (
                  <li key={c.key} className={`cp-row cp-row${i} flex items-center justify-between rounded-lg px-3 py-3 text-[15px]`}>
                    <span className="flex items-center gap-3"><Sparkles className="h-4 w-4 text-primary" />{c.name}</span>
                    <kbd className="rounded-md border border-white/15 bg-white/10 px-2 py-0.5 font-mono text-[11px] text-background/80">{c.key}</kbd>
                  </li>
                ))}
              </ul>
              <div className="relative h-[116px] border-t border-white/10">
                {COMMANDS.map((c, i) => (
                  <p key={c.key} className={`cp-out cp-out${i} absolute inset-0 px-5 py-4 text-[14.5px] leading-relaxed text-background/90`}>
                    <span className="mb-1 block font-mono text-[10.5px] uppercase tracking-[0.18em] text-primary">Result</span>{c.out}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 4 · THREAD SUMMARIES: a long thread collapses into three lines */}
        <section className="bg-secondary py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <p className={`${EYEBROW} justify-center text-primary`}>Conversation summarisation AI</p>
              <h2 className={`${H2} mt-5`}>Twelve messages in. Three lines out.</h2>
              <p className="mt-4 text-[16px] leading-relaxed text-muted-foreground">Handoffs, escalations and shift changes no longer start with scrolling. Anyone can pick up the context in five seconds.</p>
            </div>
            <div className="mx-auto mt-14 grid max-w-3xl items-center gap-8 md:grid-cols-[1fr_auto_1.1fr]">
              <div className="space-y-2" aria-hidden>
                {THREAD.map((w, i) => (
                  <div key={i} className={`cp-msg flex ${i % 2 ? "justify-end" : ""}`} style={{ animationDelay: `${i * 0.05}s` }}>
                    <span className={`block h-3 rounded-full ${i % 2 ? "bg-primary/35" : "bg-foreground/20"}`} style={{ width: `${w}%` }} />
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-primary md:flex-col">
                <span className="cp-arrow flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground"><ArrowRight className="h-5 w-5 max-md:rotate-90" /></span>5 sec
              </div>
              <div className="border-l-[3px] border-primary pl-6">
                <p className="mb-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-primary"><FileText className="h-3.5 w-3.5" />Summary</p>
                <dl className="space-y-4">
                  {SUMMARY.map(([k, v], i) => (
                    <div key={k} className="cp-sum" style={{ animationDelay: `${i * 0.35}s` }}>
                      <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{k}</dt>
                      <dd className="mt-0.5 text-[17px] font-medium leading-snug">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* 5 · TONE: a slider that moves between formal, friendly and casual */}
        <section className="bg-background py-20 lg:py-28">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <p className={`${EYEBROW} justify-center text-primary`}>On-brand tone, every time</p>
            <h2 className={`${H2} mt-5`}>Same answer. The tone your customer needs.</h2>
            <div className="relative mx-auto mt-14 max-w-xl">
              <div className="relative h-2 rounded-full bg-border">
                <span className="cp-thumb absolute top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_0_8px_oklch(0.6_0.13_168/0.18)]" />
              </div>
              <div className="mt-5 flex justify-between font-mono text-[12px] uppercase tracking-[0.18em]">
                {TONES.map((t, i) => (<span key={t.n} className={`cp-tl cp-tl${i}`}>{t.n}</span>))}
              </div>
            </div>
            <div className="relative mx-auto mt-10 h-[120px] max-w-2xl">
              {TONES.map((t, i) => (
                <p key={t.n} className={`cp-tone cp-tone${i} absolute inset-0 flex items-center justify-center text-balance text-[22px] font-medium leading-snug tracking-[-0.01em] sm:text-[26px]`}>“{t.t}”</p>
              ))}
            </div>
          </div>
        </section>

        {/* 6 · NEW AGENTS: two curves, one reaches your standard sooner */}
        <section className="bg-secondary py-20 lg:py-28">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div>
              <p className={`${EYEBROW} text-primary`}>Agent productivity AI</p>
              <h2 className={`${H2} mt-5`}>New hires reach your standard sooner.</h2>
              <p className="mt-4 max-w-md text-[16px] leading-relaxed text-muted-foreground">Copilot carries your knowledge and tone, so quality does not dip while someone is still learning the ropes. Every reply is still reviewed by a person, and the copilot improves as your team resolves more conversations.</p>
              <Link href="/products/agentic-ai/" className="group mt-7 inline-flex items-center gap-1.5 text-[15px] font-semibold text-primary">How the same agentic AI serves customers <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link>
            </div>
            <div>
              <svg viewBox="0 0 560 280" role="img" aria-label="Reply quality over time: with Copilot a new agent reaches the team standard sooner than without" className="h-auto w-full">
                <line x1="40" y1="236" x2="540" y2="236" stroke="var(--border)" strokeWidth="2" />
                <line x1="40" y1="20" x2="40" y2="236" stroke="var(--border)" strokeWidth="2" />
                <line x1="40" y1="64" x2="540" y2="64" stroke="var(--foreground)" strokeOpacity=".35" strokeWidth="1.5" strokeDasharray="5 6" />
                <text x="544" y="58" textAnchor="end" fontSize="12" fill="var(--muted-foreground)" fontFamily="inherit">Your team standard</text>
                <path className="cp-line cp-line1" pathLength="100" d="M40 214 C120 206 200 190 280 160 C360 130 440 108 540 104" fill="none" stroke="var(--foreground)" strokeOpacity=".4" strokeWidth="3" strokeLinecap="round" strokeDasharray="100" />
                <path className="cp-line cp-line2" pathLength="100" d="M40 214 C90 150 150 92 230 70 C300 58 420 62 540 62" fill="none" stroke="var(--primary)" strokeWidth="4" strokeLinecap="round" strokeDasharray="100" />
                <circle className="cp-dot" cx="230" cy="70" r="7" fill="var(--primary)" />
                <text className="cp-dot" x="238" y="104" fontSize="13" fontWeight="600" fill="var(--primary)" fontFamily="inherit">Ramped up</text>
                <text x="540" y="148" textAnchor="end" fontSize="13" fill="var(--muted-foreground)" fontFamily="inherit">Without Copilot</text>
                <text x="130" y="140" fontSize="13" fontWeight="600" fill="var(--primary)" fontFamily="inherit">With Copilot</text>
                <text x="40" y="258" fontSize="12" fill="var(--muted-foreground)" fontFamily="inherit">First day</text>
                <text x="540" y="258" textAnchor="end" fontSize="12" fill="var(--muted-foreground)" fontFamily="inherit">Time</text>
                <text x="30" y="30" textAnchor="end" fontSize="12" fill="var(--muted-foreground)" fontFamily="inherit" transform="rotate(-90 30 30)">Reply quality</text>
              </svg>
              <p className="mt-2 text-[12.5px] text-muted-foreground">Illustrative curve, not a measured result.</p>
            </div>
          </div>
        </section>

        {/* 7 · FAQ (shared with the home page) */}
        <FaqJsonLd items={FAQS} path="/products/agent-copilot" />
        <FaqSection items={FAQS} />

        <div className="border-y border-border bg-secondary/60 py-6">
          <p className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-8 gap-y-2 px-4 text-[14px] sm:px-6">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Explore more</span>
            {[
              { href: "/products/agentic-ai/", label: "Agentic AI" },
              { href: "/products/ai-agents/", label: "AI agents for WhatsApp" },
              { href: "/products/omnichannel-inbox/", label: "Omnichannel inbox" },
              { href: "/products/analytics/", label: "Analytics" },
              { href: "/compare/", label: "Compare SMSLocal" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="font-medium text-foreground underline decoration-border underline-offset-4 transition hover:text-primary hover:decoration-primary">{l.label}</Link>
            ))}
          </p>
        </div>

        <ProductFinalCta
          title="Give every agent an AI copilot."
          subtitle="Drafted replies, thread summaries and knowledge-grounded answers. Connect your inbox and let your team respond faster and more consistently."
          primaryCta={{ label: "Get a Demo", href: "/company/contact/" }}
          secondaryCta={{ label: "Start your trial", href: "/signup/" }}
        />
      </main>
      <SiteFooter />

      <style>{`
        @keyframes cp-rise { from { opacity: 0; transform: translateY(26px) } to { opacity: 1; transform: none } }
        @keyframes cp-seg { 0%, 4% { transform: scaleX(0) } 20%, 88% { transform: scaleX(1) } 96%, 100% { transform: scaleX(0) } }
        @keyframes cp-saved { 0%, 14% { opacity: 0 } 24%, 88% { opacity: 1 } 96%, 100% { opacity: 0 } }
        @keyframes cp-caret { 0%, 100% { opacity: 1 } 50% { opacity: 0 } }
        @keyframes cp-msg { 0%, 12% { opacity: 1; transform: none } 34%, 78% { opacity: 0; transform: scaleY(.2) scaleX(.6) } 92%, 100% { opacity: 1; transform: none } }
        @keyframes cp-sum { 0%, 30% { opacity: 0; transform: translateX(-10px) } 42%, 80% { opacity: 1; transform: none } 92%, 100% { opacity: 0 } }
        @keyframes cp-arrow { 0%, 100% { transform: translateX(0) } 50% { transform: translateX(5px) } }
        @keyframes cp-line { 0%, 6% { stroke-dashoffset: 100 } 40%, 90% { stroke-dashoffset: 0 } 98%, 100% { stroke-dashoffset: 100 } }
        @keyframes cp-dotk { 0%, 34% { opacity: 0 } 42%, 90% { opacity: 1 } 98%, 100% { opacity: 0 } }
        @keyframes cp-thumb { 0%, 26% { left: 0% } 33%, 59% { left: calc(50% - 12px) } 66%, 92% { left: calc(100% - 24px) } 100% { left: 0% } }
        ${COMMANDS.map((_, i) => `@keyframes cp-row${i} { 0%, ${i * 25 - 1}% { background: transparent } ${i * 25}%, ${i * 25 + 23}% { background: rgba(255,255,255,.1) } ${i * 25 + 25}%, 100% { background: transparent } }
        @keyframes cp-out${i} { 0%, ${i * 25}% { opacity: 0 } ${i * 25 + 2}%, ${i * 25 + 23}% { opacity: 1 } ${i * 25 + 25}%, 100% { opacity: 0 } }
        .cp-row${i} { animation: cp-row${i} 16s linear infinite } .cp-out${i} { opacity: 0; animation: cp-out${i} 16s linear infinite }`).join("\n")}
        ${TONES.map((_, i) => `@keyframes cp-tone${i} { 0%, ${i * 33}% { opacity: 0; transform: translateY(8px) } ${i * 33 + 3}%, ${i * 33 + 30}% { opacity: 1; transform: none } ${i * 33 + 33}%, 100% { opacity: 0 } }
        @keyframes cp-tl${i} { 0%, ${i * 33}% { color: var(--muted-foreground) } ${i * 33 + 3}%, ${i * 33 + 30}% { color: var(--primary) } ${i * 33 + 33}%, 100% { color: var(--muted-foreground) } }
        .cp-tone${i} { opacity: 0; animation: cp-tone${i} 12s ease-in-out infinite } .cp-tl${i} { animation: cp-tl${i} 12s linear infinite }`).join("\n")}

        .cp-rise { animation: cp-rise .9s cubic-bezier(.2,.7,.2,1) both }
        .cp-seg { transform-origin: left; animation: cp-seg 9s ease-out infinite }
        .cp-saved { opacity: 0; animation: cp-saved 9s ease-out infinite }
        .cp-caret { animation: cp-caret 1s steps(1) infinite }
        .cp-msg { transform-origin: center; animation: cp-msg 8s ease-in-out infinite }
        .cp-sum { opacity: 0; animation: cp-sum 8s ease-out infinite }
        .cp-arrow { animation: cp-arrow 1.6s ease-in-out infinite }
        .cp-line { animation: cp-line 9s ease-in-out infinite }
        .cp-line2 { animation-delay: .3s }
        .cp-dot { opacity: 0; animation: cp-dotk 9s ease-out infinite }
        .cp-thumb { animation: cp-thumb 12s cubic-bezier(.6,.1,.3,1) infinite }

        @media (prefers-reduced-motion: reduce) {
          .cp-rise, .cp-seg, .cp-caret, .cp-msg, .cp-arrow, .cp-line, .cp-thumb, .cp-row0, .cp-row1, .cp-row2, .cp-row3 { animation: none }
          .cp-saved, .cp-sum, .cp-dot { animation: none; opacity: 1 }
          .cp-out0 { animation: none; opacity: 1 }
          .cp-out1, .cp-out2, .cp-out3, .cp-tone0, .cp-tone2 { animation: none; opacity: 0 }
          .cp-tone1 { animation: none; opacity: 1 }
          .cp-tl0, .cp-tl1, .cp-tl2 { animation: none }
          .cp-thumb { left: calc(50% - 12px) }
          .cp-line { stroke-dashoffset: 0 }
        }
      `}</style>
    </>
  )
}
