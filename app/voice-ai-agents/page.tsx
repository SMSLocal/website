import type { Metadata } from "next"
import Link from "next/link"
import { VoiceCall3D } from "@/components/product/voice-call-3d"
import { getPageMetadata } from "@/lib/seo"
import { ArrowRight, ArrowUpRight, Check, PhoneIncoming, PhoneOutgoing, Sparkles } from "lucide-react"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { FaqSection } from "@/components/landing/faq-section"
import { BreadcrumbJsonLd, FaqJsonLd, ProductServiceJsonLd } from "@/components/seo/json-ld"
import { ProductFinalCta } from "@/components/product/product-page"

export const metadata: Metadata = getPageMetadata("/voice-ai-agents")

/* ─── DATA ────────────────────────────────────────────────────────────────── */

/* the queue, before and after */
const QUEUE = [
  { who: "AK", name: "Aarav K.", wait: "6:12", w: 100 },
  { who: "SN", name: "Sneha N.", wait: "4:40", w: 76 },
  { who: "RM", name: "Rohan M.", wait: "3:05", w: 54 },
  { who: "PD", name: "Pooja D.", wait: "2:21", w: 38 },
  { who: "VS", name: "Vikram S.", wait: "1:48", w: 26 },
]

/* what the agent does on a call: four expanding panels */
const STEPS = [
  { n: "01", title: "Answer", body: "Picks up on the first ring, day and night, so no caller waits in a queue. Handles many calls at once on the same number." },
  { n: "02", title: "Understand", body: "Speech-to-text and language understanding follow what the caller actually says, in Hindi and other Indian languages, not a keypad menu." },
  { n: "03", title: "Act", body: "Checks an order, books a slot, sends a WhatsApp link or updates your CRM during the call, using the same trained agent as your chat channels." },
  { n: "04", title: "Hand off", body: "Routes to a person when the caller asks or sounds frustrated, with the transcript and summary already in front of them." },
]

/* one call, second by second */
const CALL = [
  { at: "0:00", t: "The phone rings", b: "The agent answers on the first ring. No queue, no menu to sit through." },
  { at: "0:03", t: "It greets in the caller's language", b: "It follows the caller's first words in Hindi, Tamil, Telugu, English or another Indian language and stays in it." },
  { at: "0:20", t: "It looks up and acts", b: "Checks the order, confirms an appointment or updates the CRM while the caller is still on the line." },
  { at: "0:55", t: "It sends what was promised", b: "A tracking link or confirmation goes out on WhatsApp before the call ends." },
  { at: "1:12", t: "The summary is saved", b: "Transcript, intent and sentiment land in the inbox, ready for a person if the customer calls back." },
]

const INBOUND = ["Order and delivery status", "Appointment booking and changes", "Account and billing questions", "Product and service FAQs", "After-hours call answering"]
const OUTBOUND = ["Payment and renewal reminders", "Appointment confirmations", "Lead qualification calls", "Feedback and NPS calls", "Delivery and COD verification"]

/* the call summary receipt */
const RECEIPT: [string, string][] = [
  ["Caller", "+91 98•• ••• 142"],
  ["Language", "Hindi"],
  ["Intent", "Order status"],
  ["Sentiment", "Positive"],
  ["Resolved by", "Voice agent"],
  ["Next step", "Tracking link sent on WhatsApp"],
  ["Duration", "01:12"],
]

const FAQS = [
  { q: "What is an agentic AI voice agent?", a: "An agentic AI voice agent answers and places phone calls, understands what the caller wants in natural speech, takes action and routes to a person when needed, instead of walking callers through a phone menu. The conversational layer is rolling out progressively. IVR automation and voice queues are live today." },
  { q: "What languages does the voice agent support?", a: "Voice AI agents speak and understand several major Indian languages, including Hindi, so it works as a Hindi voice bot and matches whatever language the caller opens with. We are continuing to expand language coverage over time." },
  { q: "How is a voice AI agent different from IVR?", a: "IVR makes callers choose from menus. A voice AI agent understands what they say and acts on it. SMSLocal also provides IVR automation and voice queues, which are live today, so you can start with front-line handling and add conversation as it rolls out." },
  { q: "Can it make outbound calls as well as answer them?", a: "Yes. Use it for inbound customer support and for outbound calls such as payment reminders, appointment confirmations, lead qualification and feedback. Outbound calls follow your calling hours and consent rules." },
  { q: "Does it route calls to humans?", a: "Yes, with full context. The agent detects when a caller explicitly asks for a human or sounds frustrated, and routes the call with a transcript and summary so the person who picks up never makes the caller repeat themselves." },
  { q: "Are calls logged?", a: "Yes. Every call is transcribed, summarised and scored for sentiment, and it sits in the inbox right beside your WhatsApp, SMS and email conversations." },
  { q: "Does it share knowledge with my WhatsApp AI agent?", a: "Yes. The voice agent is trained on the same data as your WhatsApp AI agents, and a handled call lands in the same inbox, so a follow-up message picks up where the call ended." },
]

/* ─── STYLE TOKENS ────────────────────────────────────────────────────────── */

const EYEBROW = "inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em]"
const H2 = "text-balance text-[28px] font-semibold leading-[1.08] tracking-[-0.035em] sm:text-[38px]"
const BTN = "group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-primary to-[oklch(0.55_0.13_172)] px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:shadow-xl hover:shadow-primary/30"
const BTN_OUT = "inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3.5 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"
const ZIGZAG = "linear-gradient(135deg, var(--background) 25%, transparent 25%) -7px 0, linear-gradient(225deg, var(--background) 25%, transparent 25%) -7px 0"

/* ─── PAGE ────────────────────────────────────────────────────────────────── */

export default function VoiceAiAgentsPage() {
  return (
    <>
      <ProductServiceJsonLd
        name="SMSLocal Voice AI Agents"
        description="Agentic AI voice agents that answer and place calls, understand speech in several Indian languages, hold natural conversations, summarise calls, and route to a human, in the same inbox as your WhatsApp AI agents."
        path="/voice-ai-agents"
        category="Conversational Voice AI"
      />
      <BreadcrumbJsonLd crumbs={[{ name: "Home", path: "/" }, { name: "Voice AI Agents", path: "/voice-ai-agents" }]} />
      <SiteHeader />
      <main className="overflow-x-clip bg-background font-normal text-foreground">

        {/* 1 · HERO: one phone call in 3D. The caller, a bar waveform, Captain and the apps it uses, narrated by captions */}
        <section className="relative isolate overflow-hidden bg-background">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 opacity-50 [background-image:radial-gradient(var(--border)_1.2px,transparent_1.2px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_at_72%_48%,black_10%,transparent_70%)]" />
          </div>
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-14 pt-14 sm:px-6 lg:grid-cols-[1fr_560px] lg:gap-8 lg:pb-20 lg:pt-12">
            <div className="vx-rise">
              <p className="inline-flex items-center gap-2 rounded-full bg-foreground px-3.5 py-1.5 text-[12.5px] font-medium text-background">
                <Sparkles className="h-3.5 w-3.5 text-accent" />Voice AI agents
              </p>
              <h1 className="mt-6 text-balance text-[30px] font-semibold leading-[1.1] tracking-[-0.035em] sm:text-[42px]">
                Agentic AI voice agent that <span className="text-primary">answers your phone calls.</span>
              </h1>
              <p className="mt-5 max-w-lg text-pretty text-[17px] leading-relaxed text-muted-foreground">
                A voice AI agent for customer support that answers and makes calls in Hindi and other Indian languages. It resolves what it can, hands the rest to a live agent, and leaves the transcript and summary in your inbox.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link href="/company/contact/" className={BTN}>Experience Voice AI <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" /></Link>
                <Link href="/company/contact/" className={BTN_OUT}>Talk to sales</Link>
              </div>
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-muted-foreground">
                {["Inbound and outbound calls", "Hindi and more", "Live human handoff"].map((t) => (
                  <li key={t} className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" strokeWidth={3} />{t}</li>
                ))}
              </ul>
            </div>
            <div className="vx-rise relative" style={{ animationDelay: "0.15s" }}>
              <VoiceCall3D />
            </div>
          </div>
        </section>

        {/* 2 · THE PROBLEM: a call queue that flips between waiting and answered */}
        <section className="bg-secondary py-20 lg:py-28">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <p className={`${EYEBROW} text-primary`}>The problem with phone queues</p>
              <h2 className={`${H2} mt-5`}>Callers wait. Agents repeat themselves.</h2>
              <p className="mt-5 max-w-md text-[16px] leading-relaxed text-muted-foreground">Most calls are the same few questions, yet each one holds a queue and a person. An AI call answering agent picks up at once, resolves what it can and passes on the rest with the context already gathered.</p>
            </div>
            <div>
              <div className="relative mb-5 h-6 font-mono text-[11px] uppercase tracking-[0.18em]">
                <span className="vx-a absolute left-0 text-muted-foreground">Without a voice agent · waiting</span>
                <span className="vx-b absolute left-0 text-primary">With a voice agent · answered</span>
              </div>
              <ul className="divide-y divide-border border-y border-border">
                {QUEUE.map((c, i) => (
                  <li key={c.who} className="relative grid grid-cols-[40px_110px_1fr] items-center gap-4 py-4">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-background font-mono text-[11px] font-semibold text-foreground ring-1 ring-border">{c.who}</span>
                    <span className="text-[14.5px] font-medium">{c.name}</span>
                    <span className="relative h-6">
                      <span className="vx-a absolute inset-0 flex items-center gap-3">
                        <span className="vx-grow block h-1.5 rounded-full bg-foreground/25" style={{ width: `${c.w}%`, animationDelay: `${i * 0.12}s` }} />
                        <span className="font-mono text-[12px] text-muted-foreground">{c.wait}</span>
                      </span>
                      <span className="vx-b absolute inset-0 flex items-center gap-2 text-[13.5px] font-medium text-primary">
                        <Check className="h-4 w-4" strokeWidth={3} />Answered in 0s
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 3 · WHAT IT DOES: four panels that open on hover or focus */}
        <section className="bg-background py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <p className={`${EYEBROW} text-primary`}>What a voice AI agent does</p>
              <h2 className={`${H2} mt-5`}>AI call answering, from first ring to handoff.</h2>
              <p className="mt-4 max-w-lg text-[16px] leading-relaxed text-muted-foreground">Voice calling and IVR automation are live today, and the conversational layer is rolling out progressively. Hover or tap a step to read it.</p>
            </div>
            <div className="vx-acc mt-12 flex flex-col gap-3 md:h-[300px] md:flex-row md:gap-0 md:divide-x md:divide-border md:border-y md:border-border">
              {STEPS.map((s) => (
                <div key={s.n} tabIndex={0} className="vx-p group relative flex-1 overflow-hidden rounded-xl border border-border p-6 outline-none transition-[flex] duration-500 md:rounded-none md:border-0">
                  <p className="font-mono text-[12px] text-primary">{s.n}</p>
                  <h3 className="mt-2 text-[24px] font-semibold tracking-[-0.02em]">{s.title}</h3>
                  <p className="vx-body mt-3 max-w-[330px] text-[14.5px] leading-relaxed text-muted-foreground">{s.body}</p>
                  <span aria-hidden className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-primary transition-transform duration-500 group-hover:scale-x-100 group-focus:scale-x-100" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4 · ONE CALL, SECOND BY SECOND: a vertical timeline with a light running down it */}
        <section className="bg-secondary py-20 lg:py-28">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className={`${EYEBROW} text-primary`}>Hindi voice bot and beyond</p>
              <h2 className={`${H2} mt-5`}>One call, from the first ring to the saved summary.</h2>
              <p className="mt-4 max-w-sm text-[16px] leading-relaxed text-muted-foreground">There is no language menu. The voice agent answers in whichever language the caller starts with, and more languages are added over time.</p>
            </div>
            <ol className="relative">
              <span aria-hidden className="absolute bottom-2 left-[5px] top-2 w-px bg-foreground/20" />
              <span aria-hidden className="vx-run absolute left-0 top-2 h-[11px] w-[11px] rounded-full bg-primary shadow-[0_0_0_6px_oklch(0.6_0.13_168/0.18)]" />
              {CALL.map((c) => (
                <li key={c.at} className="relative pb-10 pl-10 last:pb-0">
                  <span aria-hidden className="absolute left-0 top-[7px] h-[11px] w-[11px] rounded-full border-2 border-foreground/40 bg-secondary" />
                  <p className="font-mono text-[12px] text-primary">{c.at}</p>
                  <h3 className="mt-1 text-[21px] font-semibold tracking-[-0.02em]">{c.t}</h3>
                  <p className="mt-1.5 max-w-lg text-[15px] leading-relaxed text-muted-foreground">{c.b}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 5 · INBOUND AND OUTBOUND: a split with a centre line */}
        <section className="bg-background py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <p className={`${EYEBROW} justify-center text-primary`}>Inbound and outbound calls</p>
              <h2 className={`${H2} mt-5`}>One voice agent for calls in and calls out.</h2>
            </div>
            <div className="relative mt-14 grid gap-12 md:grid-cols-2 md:gap-0">
              <span aria-hidden className="absolute bottom-0 left-1/2 top-0 hidden w-px -translate-x-1/2 bg-border md:block" />
              <span aria-hidden className="vx-ping absolute left-1/2 top-1/2 hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary md:block" />
              <div className="md:pr-16">
                <PhoneIncoming className="h-7 w-7 text-primary" strokeWidth={1.6} />
                <h3 className="mt-4 text-[26px] font-semibold tracking-[-0.02em]">Answer every call</h3>
                <ul className="mt-5 space-y-3 text-[15.5px]">
                  {INBOUND.map((t) => (<li key={t} className="flex items-start gap-3"><Check className="mt-1 h-4 w-4 flex-none text-primary" strokeWidth={3} />{t}</li>))}
                </ul>
              </div>
              <div className="md:pl-16">
                <PhoneOutgoing className="h-7 w-7 text-primary" strokeWidth={1.6} />
                <h3 className="mt-4 text-[26px] font-semibold tracking-[-0.02em]">Make the calls nobody has time for</h3>
                <ul className="mt-5 space-y-3 text-[15.5px]">
                  {OUTBOUND.map((t) => (<li key={t} className="flex items-start gap-3"><Check className="mt-1 h-4 w-4 flex-none text-primary" strokeWidth={3} />{t}</li>))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 6 · EVERY CALL ENDS WITH A SUMMARY: a till-receipt style call summary */}
        <section className="bg-secondary py-20 lg:py-28">
          <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1fr_380px] lg:gap-24">
            <div>
              <p className={`${EYEBROW} text-primary`}>Transcript, summary and handoff</p>
              <h2 className={`${H2} mt-5`}>Every call ends in a summary your team can use.</h2>
              <p className="mt-5 max-w-md text-[16px] leading-relaxed text-muted-foreground">Each call is transcribed, summarised and scored for sentiment, then saved in the inbox beside your WhatsApp, SMS and email chats. When a person takes over, or the customer follows up on WhatsApp, nobody starts from zero.</p>
              <Link href="/products/omnichannel-inbox/" className="group mt-7 inline-flex items-center gap-1.5 text-[15px] font-semibold text-primary">See the omnichannel inbox <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link>
            </div>
            <div className="vx-sway mx-auto w-full max-w-[380px] drop-shadow-[0_24px_30px_rgba(15,26,46,.14)]">
              <div className="bg-background px-7 pb-6 pt-7 font-mono text-[13px]">
                <p className="text-center text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Call summary</p>
                <p className="mt-1 text-center text-[15px] font-semibold">SMSLocal Voice AI</p>
                <div className="mt-5 border-t border-dashed border-foreground/30" />
                <dl className="mt-4 space-y-3">
                  {RECEIPT.map(([k, v]) => (
                    <div key={k} className="grid grid-cols-[96px_1fr] gap-3">
                      <dt className="text-muted-foreground">{k}</dt>
                      <dd className={k === "Resolved by" ? "font-semibold text-primary" : "font-medium"}>{v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-5 border-t border-dashed border-foreground/30" />
                <p className="mt-4 text-center text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Saved to inbox</p>
              </div>
              <div aria-hidden className="h-[14px]" style={{ background: ZIGZAG, backgroundSize: "14px 14px", backgroundRepeat: "repeat-x" }} />
            </div>
          </div>
        </section>

        {/* 7 · FAQ (shared with the home page) */}
        <FaqJsonLd items={FAQS} path="/voice-ai-agents" />
        <FaqSection items={FAQS} />

        <div className="border-y border-border bg-secondary/60 py-6">
          <p className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-8 gap-y-2 px-4 text-[14px] sm:px-6">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Explore more</span>
            {[
              { href: "/products/agentic-ai/", label: "Agentic AI" },
              { href: "/products/ai-agents/", label: "AI agents for WhatsApp" },
              { href: "/products/voice/", label: "Voice: IVR and broadcast" },
              { href: "/products/omnichannel-inbox/", label: "Omnichannel inbox" },
              { href: "/compare/", label: "Compare SMSLocal" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="font-medium text-foreground underline decoration-border underline-offset-4 transition hover:text-primary hover:decoration-primary">{l.label}</Link>
            ))}
          </p>
        </div>

        <ProductFinalCta
          title="Automate your phone calls with agentic AI."
          subtitle="Natural voice conversations that resolve calls and route the rest to a live agent, with full context, every time."
          primaryCta={{ label: "Experience Voice AI", href: "/company/contact/" }}
          secondaryCta={{ label: "Talk to Sales", href: "/company/contact/" }}
        />
      </main>
      <SiteFooter />

      <style>{`
        @keyframes vx-rise { from { opacity: 0; transform: translateY(26px) } to { opacity: 1; transform: none } }
        @keyframes vx-a { 0%, 42% { opacity: 1 } 50%, 92% { opacity: 0 } 100% { opacity: 1 } }
        @keyframes vx-b { 0%, 42% { opacity: 0 } 50%, 92% { opacity: 1 } 100% { opacity: 0 } }
        @keyframes vx-grow { 0% { transform: scaleX(0) } 40%, 100% { transform: scaleX(1) } }
        @keyframes vx-run { 0% { top: 8px; opacity: 0 } 6% { opacity: 1 } 94% { opacity: 1 } 100% { top: calc(100% - 20px); opacity: 0 } }
        @keyframes vx-ping { 0% { box-shadow: 0 0 0 0 oklch(0.6 0.13 168 / .5) } 100% { box-shadow: 0 0 0 16px oklch(0.6 0.13 168 / 0) } }
        @keyframes vx-sway { 0%, 100% { transform: rotate(-1.2deg) } 50% { transform: rotate(1.2deg) } }

        .vx-rise { animation: vx-rise .9s cubic-bezier(.2,.7,.2,1) both }
        .vx-a { animation: vx-a 9s ease-in-out infinite }
        .vx-b { opacity: 0; animation: vx-b 9s ease-in-out infinite }
        .vx-grow { transform-origin: left; animation: vx-grow 9s ease-out infinite }
        .vx-run { animation: vx-run 7s ease-in-out infinite }
        .vx-ping { animation: vx-ping 2s ease-out infinite }
        .vx-sway { transform-origin: 50% 0; animation: vx-sway 7s ease-in-out infinite }

        /* the expanding panels: the first is open until you hover another */
        .vx-acc .vx-body { opacity: 1; transition: opacity .35s .1s }
        @media (min-width: 768px) {
          .vx-acc .vx-body { opacity: 0 }
          .vx-acc .vx-p { flex: 1 1 0 }
          .vx-acc:not(:hover):not(:focus-within) .vx-p:first-child, .vx-acc .vx-p:hover, .vx-acc .vx-p:focus { flex: 3.2 1 0 }
          .vx-acc:not(:hover):not(:focus-within) .vx-p:first-child .vx-body, .vx-acc .vx-p:hover .vx-body, .vx-acc .vx-p:focus .vx-body { opacity: 1 }
        }

        @media (prefers-reduced-motion: reduce) {
          .vx-rise, .vx-a, .vx-grow, .vx-run, .vx-ping, .vx-sway { animation: none }
          .vx-b { animation: none; opacity: 0 }
        }
      `}</style>
    </>
  )
}
