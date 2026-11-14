import type { ReactNode } from "react"
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, BarChart3, Bot, Check, KeyRound, Layers, Link2, Mail, MessageCircle, MessagesSquare, SlidersHorizontal, Timer, Unlink, UserCheck, Users, X, Sparkles } from "lucide-react"
import { SocialExplorer } from "@/components/product/social-explorer"

// Bespoke sections for /channels/social (everything below the hero). Layouts are deliberately different from the other
// channel pages: a fan of app windows, a folding-panel explorer, a zig-zag timeline, a dark convergence diagram and a
// side-by-side comparison table. Site palette only.

const CSS = `
@keyframes so-flow { to { stroke-dashoffset: -24 } }
@keyframes so-float { 0%, 100% { translate: 0 0 } 50% { translate: 0 -7px } }
@keyframes so-pulse { 0%, 100% { opacity: .5; transform: scale(1) } 50% { opacity: 1; transform: scale(1.06) } }
.so-flow { stroke-dasharray: 3 9; animation: so-flow 1.4s linear infinite }
.so-flow-v { background: repeating-linear-gradient(180deg, var(--primary) 0 6px, transparent 6px 12px); background-size: 2px 24px; animation: so-vflow 1s linear infinite }
@keyframes so-vflow { to { background-position: 0 24px } }
.so-float { animation: so-float 6s ease-in-out infinite }
.so-pulse { transform-box: fill-box; transform-origin: center; animation: so-pulse 3.2s ease-in-out infinite }
@keyframes so-spin { to { transform: rotate(360deg) } }
@keyframes so-glow { 0%, 100% { opacity: .5; transform: translateX(-50%) scale(1) } 50% { opacity: 1; transform: translateX(-50%) scale(1.15) } }
.so-spin { transform-box: fill-box; transform-origin: center; animation: so-spin 26s linear infinite }
.so-glow { animation: so-glow 8s ease-in-out infinite }
.so-lift { transition: transform .35s cubic-bezier(.2,.7,.2,1), border-color .3s }
.so-lift:hover { transform: translateY(-5px) }
.so-node { transition: transform .6s cubic-bezier(.3,1.5,.5,1) .2s }
.wx-pre .so-node { transform: scale(0) }
@media (prefers-reduced-motion: reduce) { .so-flow, .so-float, .so-pulse, .so-spin, .so-glow { animation: none } .so-node { transition: none } }
`

export function SocialStyles() {
  return <style>{CSS}</style>
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-3 py-1 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-primary">
      <Sparkles className="h-3.5 w-3.5" />
      {children}
    </span>
  )
}

const H2 = "mt-4 text-balance text-3xl font-semibold leading-[1.12] tracking-[-0.03em] sm:text-[40px]"

/* ───────────────────────── 1. PROBLEM: a fan of app windows ───────────────────────── */

const LANES = [
  { app: "Instagram DMs", count: 12, items: [["@meera_k", "Is size M available?", "2h"], ["@rohit.s", "Where is my order?", "5h"], ["@anaya_d", "Price for 2?", "1d"]] },
  { app: "Messenger", count: 7, items: [["Arjun D.", "Can I track it here?", "1h"], ["Priya N.", "Refund status?", "3h"], ["Karan M.", "Store timings?", "6h"]] },
  { app: "Email inbox", count: 23, items: [["Ticket #204", "Following up again", "4h"], ["Invoice", "Please resend", "1d"], ["Delivery", "Still not received", "2d"]] },
]

const PAINS = [
  { icon: KeyRound, t: "Different apps, different logins", d: "Instagram, Messenger and email each live in their own inbox." },
  { icon: Unlink, t: "No shared context", d: "Nobody sees the customer's history from the other channels." },
  { icon: Timer, t: "No SLA, no measurement", d: "Replies depend on whoever happens to look, so nothing is tracked." },
]

export function SocialProblem() {
  return (
    <section className="border-y border-border bg-secondary/40 py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <Eyebrow>The problem</Eyebrow>
          <h2 className={H2}>Instagram and Messenger DMs scattered across apps are slow to answer</h2>
          <p className="mx-auto mt-5 max-w-3xl text-pretty text-[16px] leading-relaxed text-muted-foreground">
            Social conversations spread across separate apps are slow to answer and impossible to measure. One inbox brings every DM together with the rest of your channels.
          </p>
        </div>

        {/* three unconnected inboxes, each with messages waiting */}
        <div className="relative mt-12 grid gap-4 md:grid-cols-3">
          {LANES.map((l, li) => (
            <div key={l.app} style={{ animationDelay: `${-li * 1.6}s` }} className="so-float so-lift relative overflow-hidden rounded-3xl border border-border bg-card p-5 shadow-[0_24px_46px_-34px_rgba(15,42,58,.5)]">
              <div className="flex items-center justify-between">
                <span className="text-[15px] font-semibold tracking-tight">{l.app}</span>
                <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-foreground px-2 text-[11.5px] font-bold text-background">{l.count}</span>
              </div>
              <ul className="mt-4 space-y-2.5">
                {l.items.map(([who, msg, wait]) => (
                  <li key={who} className="flex items-center gap-3 rounded-2xl bg-muted/70 px-3.5 py-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-background text-[11px] font-bold ring-1 ring-border">{who[0] === "@" ? who[1] : who[0]}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[13px] font-semibold leading-tight">{who}</span>
                      <span className="block truncate text-[12px] text-muted-foreground">{msg}</span>
                    </span>
                    <span className="so-pulse shrink-0 rounded-full bg-accent/50 px-2 py-0.5 text-[10.5px] font-bold text-foreground">{wait}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 flex items-center gap-2 text-[11.5px] font-medium text-muted-foreground"><Unlink className="h-3.5 w-3.5" />Not connected to the other inboxes</p>
            </div>
          ))}
          <span className="so-pulse absolute -top-3.5 left-1/2 z-10 -translate-x-1/2 rounded-full bg-accent px-4 py-1.5 text-[11.5px] font-bold text-accent-foreground shadow-lg">3 inboxes, nobody owns them</span>
        </div>

        {/* what it costs you */}
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {PAINS.map((p) => (
            <li key={p.t} className="so-lift flex items-start gap-4 rounded-2xl border border-border bg-background/70 p-5 hover:border-primary/40">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary"><p.icon className="h-5 w-5" /></span>
              <span>
                <span className="block text-[15.5px] font-semibold leading-snug tracking-tight">{p.t}</span>
                <span className="mt-1 block text-[14px] leading-relaxed text-muted-foreground">{p.d}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ───────────────────────── 2. WHAT YOU GET: folding panels ───────────────────────── */

export function SocialCapabilities() {
  return (
    <section className="border-y border-border bg-background py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>What you get</Eyebrow>
          <h2 className={H2}>Social channels join the same inbox as everything else</h2>
          <p className="mx-auto mt-4 max-w-2xl text-[16px] leading-relaxed text-muted-foreground">
            Instagram and Messenger aren&apos;t bolted on as an afterthought. They are first-class channels in the same one-view inbox as chat, voice, SMS and email.
          </p>
        </div>
        <SocialExplorer />
      </div>
    </section>
  )
}

/* ───────────────────────── 3. HOW IT WORKS: zig-zag timeline ───────────────────────── */

const STEPS = [
  { n: "01", icon: Link2, title: "Connect Instagram and Messenger", body: "Link your Instagram and Facebook accounts to SMSLocal. They join the same inbox as your chat, voice, SMS and email." },
  { n: "02", icon: SlidersHorizontal, title: "Set routing, SLAs and AI rules", body: "Decide who gets which conversation, set response targets, and choose what the AI agent answers on its own." },
  { n: "03", icon: MessagesSquare, title: "Reply from one inbox", body: "The AI handles routine questions, and your team picks up handoffs in the same thread with the full customer history." },
  { n: "04", icon: BarChart3, title: "Measure with CSAT and unified reports", body: "Track response times and satisfaction for social the same way as every other channel, in one report." },
]

// clockwise loop: 01 top left, 02 top right, 03 bottom right, 04 bottom left
const ORDER = ["md:order-1", "md:order-2", "md:order-4", "md:order-3"]

export function SocialSteps() {
  return (
    <section className="border-y border-border bg-secondary/40 py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>How it works</Eyebrow>
          <h2 className={H2}>Set up social media messaging in four steps</h2>
        </div>

        <ol className="relative mt-12 grid gap-5 md:grid-cols-2 md:gap-7">
          {STEPS.map((st, i) => (
            <li key={st.n} className={`group relative overflow-hidden rounded-[1.75rem] border border-border bg-card p-6 shadow-[0_24px_46px_-34px_rgba(15,42,58,.5)] transition duration-300 hover:-translate-y-1 hover:border-primary/40 sm:p-8 ${ORDER[i]}`}>
              <span aria-hidden className="pointer-events-none absolute -right-2 -top-6 select-none text-[120px] font-extrabold leading-none tracking-tighter text-primary/[.07]">{st.n}</span>
              <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-b from-primary/80 to-primary text-primary-foreground shadow-[0_12px_24px_-8px] shadow-primary/50 ring-1 ring-white/30">
                <st.icon className="h-6 w-6" />
              </span>
              <p className="relative mt-5 text-[11.5px] font-bold uppercase tracking-[0.16em] text-primary">Step {st.n}</p>
              <h3 className="relative mt-1.5 text-[20px] font-semibold leading-snug tracking-tight">{st.title}</h3>
              <p className="relative mt-2.5 max-w-md text-[14.5px] leading-relaxed text-muted-foreground">{st.body}</p>
            </li>
          ))}

          {/* arrows that close the loop, desktop only */}
          <span aria-hidden className="so-node so-pulse absolute left-1/2 top-[25%] z-10 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-foreground text-background shadow-lg ring-4 ring-muted md:flex"><ArrowRight className="h-4 w-4" /></span>
          <span aria-hidden className="so-node so-pulse absolute left-[75%] top-1/2 z-10 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-foreground text-background shadow-lg ring-4 ring-muted md:flex"><ArrowDown className="h-4 w-4" /></span>
          <span aria-hidden className="so-node so-pulse absolute left-1/2 top-[75%] z-10 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-foreground text-background shadow-lg ring-4 ring-muted md:flex"><ArrowLeft className="h-4 w-4" /></span>
          <span aria-hidden className="so-node so-pulse absolute left-[25%] top-1/2 z-10 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-foreground text-background shadow-lg ring-4 ring-muted md:flex"><ArrowUp className="h-4 w-4" /></span>
          <span aria-hidden className="absolute left-1/2 top-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary px-4 py-2 text-[12px] font-bold text-primary-foreground shadow-xl shadow-primary/40 ring-4 ring-muted md:block">One inbox</span>
        </ol>
      </div>
    </section>
  )
}

/* ───────────────────────── 4. WHY IT WORKS: dark convergence diagram ───────────────────────── */

function Converge() {
  const sources = [
    { y: 36, l: "Instagram DMs" },
    { y: 108, l: "Messenger" },
    { y: 180, l: "Live chat" },
    { y: 252, l: "SMS" },
    { y: 324, l: "Email" },
  ]
  const outs = [
    { y: 110, l: "AI resolves it", c: "var(--primary)" },
    { y: 250, l: "Human handoff", c: "oklch(0.85 0.14 80)" },
  ]
  return (
    <svg viewBox="0 0 900 360" className="h-auto w-full" role="img" aria-label="Instagram, Messenger, chat, SMS and email conversations flow into one AI agent and one customer record, which resolves them or hands off to a human in the same thread">
      {sources.map((s) => (
        <path key={s.l} d={`M190 ${s.y} C 320 ${s.y}, 330 180, 395 180`} fill="none" stroke="var(--primary)" strokeOpacity=".55" strokeWidth="2" strokeLinecap="round" className="so-flow" />
      ))}
      {outs.map((o) => (
        <path key={o.l} d={`M505 180 C 570 180, 580 ${o.y}, 710 ${o.y}`} fill="none" stroke={o.c} strokeOpacity=".7" strokeWidth="2" strokeLinecap="round" className="so-flow" />
      ))}
      {sources.map((s) => (
        <g key={s.l} transform={`translate(30 ${s.y - 20})`}>
          <rect width="160" height="40" rx="20" fill="#fff" fillOpacity=".07" stroke="#fff" strokeOpacity=".2" />
          <circle cx="22" cy="20" r="5" fill="var(--primary)" />
          <text x="40" y="25" fontSize="14" fontWeight="600" fill="#fff" fillOpacity=".9">{s.l}</text>
        </g>
      ))}
      <g transform="translate(450 180)">
        <circle r="78" fill="var(--primary)" opacity=".12" className="so-pulse" />
        <circle r="94" fill="none" stroke="var(--primary)" strokeOpacity=".35" strokeWidth="1.5" strokeDasharray="2 9" strokeLinecap="round" className="so-spin" />
        <circle r="60" fill="oklch(0.18 0.02 170)" stroke="var(--primary)" strokeOpacity=".7" strokeWidth="2" />
        <text y="-6" textAnchor="middle" fontSize="15" fontWeight="700" fill="#fff">AI agent</text>
        <text y="16" textAnchor="middle" fontSize="12" fill="#fff" fillOpacity=".65">+ one record</text>
      </g>
      {outs.map((o) => (
        <g key={o.l} transform={`translate(710 ${o.y - 20})`}>
          <rect width="160" height="40" rx="20" fill="#fff" fillOpacity=".07" stroke={o.c} strokeOpacity=".6" />
          <circle cx="22" cy="20" r="5" fill={o.c} />
          <text x="40" y="25" fontSize="14" fontWeight="600" fill="#fff" fillOpacity=".9">{o.l}</text>
        </g>
      ))}
    </svg>
  )
}

export function SocialWhyItWorks() {
  const items = [
    { icon: Bot, label: "Answers everywhere", desc: "Same agentic AI on every social and messaging channel." },
    { icon: Users, label: "One customer record", desc: "Identity merged across platforms automatically." },
    { icon: UserCheck, label: "Human handoff", desc: "Escalates in the same thread with full cross-channel context." },
  ]
  return (
    <section className="relative overflow-hidden bg-[oklch(0.15_0.04_245)] py-14 text-white sm:py-20">
      <div aria-hidden className="so-glow pointer-events-none absolute left-1/2 top-1/3 h-[360px] w-[700px] rounded-full bg-primary/15 blur-[130px]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-3 py-1 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-primary"><Sparkles className="h-3.5 w-3.5" />Why it works</span>
          <h2 className={`${H2} text-white`}>Your team stops juggling apps</h2>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-[16px] leading-relaxed text-white/70">
            Customers get fast replies wherever they message, and you finally measure social support like every other channel.
          </p>
        </div>

        <div className="mx-auto mt-12 hidden max-w-5xl md:block"><Converge /></div>
        <div className="mx-auto mt-10 max-w-md md:hidden">
          <div className="flex flex-wrap justify-center gap-2">
            {["Instagram DMs", "Messenger", "Live chat", "SMS", "Email"].map((c) => (
              <span key={c} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[.07] px-3.5 py-2 text-[13px] font-semibold text-white/90"><i className="h-2 w-2 rounded-full bg-primary" />{c}</span>
            ))}
          </div>
          <div className="my-3 flex justify-center"><i className="so-flow-v block h-8 w-[2px]" /></div>
          <div className="mx-auto flex w-fit flex-col items-center rounded-3xl border-2 border-primary/70 bg-[oklch(0.18_0.02_170)] px-8 py-5 text-center shadow-[0_0_40px_-8px] shadow-primary/40">
            <span className="text-[16px] font-bold">AI agent</span>
            <span className="text-[12.5px] text-white/65">+ one record</span>
          </div>
          <div className="my-3 flex justify-center"><i className="so-flow-v block h-8 w-[2px]" /></div>
          <div className="flex flex-wrap justify-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/60 bg-white/[.07] px-3.5 py-2 text-[13px] font-semibold"><i className="h-2 w-2 rounded-full bg-primary" />AI resolves it</span>
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/70 bg-white/[.07] px-3.5 py-2 text-[13px] font-semibold"><i className="h-2 w-2 rounded-full bg-accent" />Human handoff</span>
          </div>
        </div>

        <ul className="mx-auto mt-12 grid max-w-5xl divide-y divide-white/10 border-y border-white/10 md:grid-cols-3 md:divide-x md:divide-y-0">
          {items.map((it) => (
            <li key={it.label} className="so-lift flex items-start gap-4 px-2 py-6 md:px-7">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/15 text-primary ring-1 ring-primary/30"><it.icon className="h-5 w-5" /></span>
              <span>
                <span className="block text-[16px] font-semibold tracking-tight">{it.label}</span>
                <span className="mt-1 block text-[13.5px] leading-relaxed text-white/60">{it.desc}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ───────────────────────── 5. WHY SMSLOCAL: comparison table ───────────────────────── */

const ROWS = [
  { icon: MessageCircle, label: "Every DM answered", desc: "Instagram and Messenger get the same SLA as chat and email." },
  { icon: MessagesSquare, label: "No repeat questions", desc: "The AI agent carries context across every channel switch." },
  { icon: Layers, label: "Consistent answers", desc: "One knowledge base powers every platform's replies." },
  { icon: Mail, label: "One report, not five", desc: "Unified analytics across social, chat and email." },
]

export function SocialWhySmsLocal() {
  return (
    <section className="border-y border-border bg-secondary/40 py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>Why SMSLocal</Eyebrow>
          <h2 className={H2}>Social is part of a platform, not a bolt-on tool</h2>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-[16px] leading-relaxed text-muted-foreground">
            SMSLocal treats social as another door into the same house: the same inbox, the same AI agent, the same record and one set of numbers to report on.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-[0_28px_60px_-38px_rgba(15,42,58,.5)]" role="table" aria-label="A bolt-on social tool compared with SMSLocal">
          <div className="grid grid-cols-[1.4fr_1fr_1fr] items-center border-b border-border text-[12px] font-bold uppercase tracking-[0.14em]" role="row">
            <span className="px-5 py-4 text-muted-foreground sm:px-7" role="columnheader">What matters</span>
            <span className="px-3 py-4 text-center text-muted-foreground" role="columnheader">Bolt-on social tool</span>
            <span className="bg-primary px-3 py-4 text-center text-primary-foreground" role="columnheader">SMSLocal</span>
          </div>
          {ROWS.map((r, i) => (
            <div key={r.label} className={`grid grid-cols-[1.4fr_1fr_1fr] items-stretch ${i < ROWS.length - 1 ? "border-b border-border" : ""}`} role="row">
              <div className="flex items-start gap-3.5 px-5 py-5 sm:px-7" role="cell">
                <span className="mt-0.5 hidden h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-muted text-foreground sm:flex"><r.icon className="h-4 w-4" /></span>
                <span>
                  <span className="block text-[15px] font-semibold leading-snug tracking-tight">{r.label}</span>
                  <span className="mt-0.5 block text-[13px] leading-snug text-muted-foreground">{r.desc}</span>
                </span>
              </div>
              <div className="flex items-center justify-center" role="cell" aria-label="Not included">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/40 text-foreground"><X className="h-4 w-4" strokeWidth={3} /></span>
              </div>
              <div className="flex items-center justify-center bg-primary/10" role="cell" aria-label="Included">
                <span className="so-node flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md shadow-primary/30"><Check className="h-4 w-4" strokeWidth={3.2} /></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
