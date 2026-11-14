import Link from "next/link"
import { Fragment, type ReactNode } from "react"
import {
  ArrowRight,
  Bot,
  Check,
  ClipboardCheck,
  Hash,
  MapPin,
  MessageSquare,
  Network,
  PhoneCall,
  PhoneForwarded,
  Router,
  ShieldCheck,
  Zap, Sparkles } from "lucide-react"
import { DidRouter } from "@/components/product/did-router"

// Bespoke sections for /numbers/did (everything below the hero): receipt stack, phone-keypad cards, a number-routing
// diagram, and a layer-cake for the dark section. Site palette only.

const CSS = `
@keyframes dd-flow { to { stroke-dashoffset: -24 } }
@keyframes dd-float { 0%, 100% { translate: 0 0 } 50% { translate: 0 -6px } }
@keyframes dd-pulse { 0%, 100% { transform: scale(1) } 50% { transform: scale(1.07) } }
@keyframes dd-glow { 0%, 100% { opacity: .45 } 50% { opacity: 1 } }
.dd-flow { stroke-dasharray: 3 9; animation: dd-flow 1.4s linear infinite }
.dd-float { animation: dd-float 6s ease-in-out infinite }
.dd-pulse { transform-box: fill-box; transform-origin: center; animation: dd-pulse 3.2s ease-in-out infinite }
.dd-glow { animation: dd-glow 3.4s ease-in-out infinite }
.dd-lift { transition: transform .35s cubic-bezier(.2,.7,.2,1), border-color .3s }
.dd-lift:hover { transform: translateY(-5px) }
.dd-pop { transition: transform .55s cubic-bezier(.3,1.5,.5,1) .2s }
.wx-pre .dd-pop { transform: scale(0) }
@media (prefers-reduced-motion: reduce) { .dd-flow, .dd-float, .dd-pulse, .dd-glow { animation: none } .dd-lift, .dd-pop { transition: none } }
`

export function DidStyles() {
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

/* ───────────────────────── 1. PROBLEM: receipts ───────────────────────── */

const BYO = [
  { icon: Bot, t: "Pick an AI platform", s: "Vendor 1" },
  { icon: Network, t: "Find a separate carrier", s: "Vendor 2" },
  { icon: Hash, t: "Rent numbers elsewhere", s: "Vendor 3" },
  { icon: ClipboardCheck, t: "Register and connect", s: "Your team" },
]

const SAVED = [
  { from: "3 vendors", to: "1 platform", label: "Who you deal with" },
  { from: "3 invoices", to: "1 invoice", label: "What you reconcile" },
  { from: "3 handoffs", to: "None", label: "Where things stall" },
]

export function DidProblem() {
  return (
    <section className="border-y border-border bg-secondary/40 py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-6xl text-center">
          <Eyebrow>The problem</Eyebrow>
          <h2 className={`${H2} mx-auto max-w-4xl`}>Most AI platforms make you bring your own phone numbers</h2>
          <p className="mx-auto mt-5 max-w-5xl text-pretty text-[16px] leading-relaxed text-muted-foreground">
            They send you to a separate carrier for numbers, adding a vendor and a handoff. SMSLocal provisions the numbers your agent and campaigns use, in the same product, with no separate carrier relationship to manage.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-[2rem] border border-border bg-card shadow-[0_30px_60px_-40px_rgba(15,42,58,.5)]">
          {/* lane 1: the long way round */}
          <div className="p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-muted px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-[0.14em] text-muted-foreground">Bring your own numbers</span>
              <span className="text-[13px] text-muted-foreground">Three vendors before a single call goes out</span>
            </div>
            <ol className="mt-7 grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] md:items-center">
              {BYO.map((st, i) => (
                <Fragment key={st.t}>
                  <li className="flex items-center gap-3.5 rounded-2xl border border-border bg-background/70 px-4 py-3.5">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-muted text-foreground"><st.icon className="h-5 w-5" /></span>
                    <span className="min-w-0">
                      <span className="block text-[14px] font-semibold leading-tight">{st.t}</span>
                      <span className="mt-0.5 block text-[11.5px] font-medium text-muted-foreground">{st.s}</span>
                    </span>
                  </li>
                  {i < BYO.length - 1 && (
                    <li aria-hidden className="flex items-center justify-center">
                      <span className="dd-pulse flex items-center gap-1 rounded-full bg-accent/50 px-2.5 py-1 text-[10.5px] font-bold text-foreground">
                        <ArrowRight className="h-3 w-3 md:block" />handoff
                      </span>
                    </li>
                  )}
                </Fragment>
              ))}
            </ol>
          </div>

          {/* lane 2: all in one place */}
          <div className="border-t border-primary/30 bg-gradient-to-r from-primary/15 via-primary/[.07] to-transparent p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-primary px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-[0.14em] text-primary-foreground shadow-md shadow-primary/30">With SMSLocal</span>
              <span className="text-[13px] text-muted-foreground">One platform, no carrier handoff</span>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {["Numbers", "Voice and SMS", "AI agents", "Registration"].map((t) => (
                <span key={t} className="dd-pop inline-flex items-center gap-2 rounded-full bg-card px-4 py-2.5 text-[14px] font-semibold shadow-[0_12px_22px_-14px] shadow-primary/50 ring-1 ring-primary/30">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground"><Check className="h-3 w-3" strokeWidth={3.5} /></span>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* what changes */}
          <ul className="grid divide-y divide-border border-t border-border md:grid-cols-3 md:divide-x md:divide-y-0">
            {SAVED.map((x) => (
              <li key={x.label} className="px-6 py-5 text-center sm:px-8">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">{x.label}</p>
                <p className="mt-2 flex items-center justify-center gap-3 text-[18px] font-semibold tracking-tight">
                  <span className="text-muted-foreground line-through decoration-accent decoration-2">{x.from}</span>
                  <ArrowRight className="h-4 w-4 text-primary" />
                  <span className="text-primary">{x.to}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── 2. WHAT YOU GET: keypad cards ───────────────────────── */

const SPECS = [
  {
    icon: MapPin,
    title: "The numbers you need",
    body: "Local DID, toll-free and short code numbers for every use case: a city-matching number for local calls, a toll-free line for support, or a short code for high-volume messaging.",
    covers: ["Local DID", "Toll-free", "Short code"],
  },
  {
    icon: PhoneCall,
    title: "For voice and messaging",
    body: "One number set powers calling, SMS and broadcasting, with no separate number inventory to manage per channel.",
    covers: ["Voice", "SMS", "Broadcasting"],
  },
  {
    icon: PhoneForwarded,
    title: "Registration handled",
    body: "DLT and sender-ID registration workflows are guided in the platform through our team, so you're not left to navigate carrier paperwork alone.",
    covers: ["DLT", "Sender ID", "Guided by our team"],
  },
  {
    icon: Network,
    title: "Protection built in",
    body: "Number lookup plus fraud and spam protection, so the numbers you provision stay trusted and deliverable.",
    covers: ["Number lookup", "Fraud protection", "Spam protection"],
  },
]

export function DidCapabilities() {
  const grid = "md:grid-cols-[.95fr_1.7fr_1fr]"
  return (
    <section className="border-y border-border bg-background py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <Eyebrow>What you get</Eyebrow>
          <h2 className={H2}>Virtual phone numbers that fit how your business calls and messages</h2>
          <p className="mx-auto mt-4 max-w-3xl text-[16px] leading-relaxed text-muted-foreground">
            Provision the number type you need, whether local, toll-free or short code, and route it into your existing calling stack or ours.
          </p>
        </div>

        {/* spec sheet */}
        <div className="mt-12 overflow-hidden rounded-[2rem] border border-border bg-card shadow-[0_30px_60px_-40px_rgba(15,42,58,.5)]" role="table" aria-label="What DID numbers include">
          <div className={`hidden border-b border-border bg-muted/60 px-8 py-3.5 text-[11.5px] font-bold uppercase tracking-[0.16em] text-muted-foreground md:grid md:gap-8 ${grid}`} role="row">
            <span role="columnheader">Capability</span>
            <span role="columnheader">What you get</span>
            <span role="columnheader">Covers</span>
          </div>
          {SPECS.map((r, i) => (
            <div key={r.title} className={`group relative grid gap-4 px-6 py-7 transition-colors duration-300 hover:bg-primary/[.05] sm:px-8 md:items-center md:gap-8 ${grid} ${i < SPECS.length - 1 ? "border-b border-border" : ""}`} role="row">
              <span aria-hidden className="absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-primary transition-transform duration-300 group-hover:scale-y-100" />
              <div className="flex items-center gap-4" role="cell">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-b from-primary/80 to-primary text-primary-foreground shadow-[0_12px_22px_-8px] shadow-primary/50 ring-1 ring-white/30 transition group-hover:scale-105">
                  <r.icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-[11px] font-bold tracking-[0.18em] text-primary">0{i + 1}</span>
                  <h3 className="text-[17px] font-semibold leading-snug tracking-tight">{r.title}</h3>
                </span>
              </div>
              <p className="text-[14.5px] leading-relaxed text-muted-foreground" role="cell">{r.body}</p>
              <ul className="flex flex-wrap gap-2" role="cell">
                {r.covers.map((c) => (
                  <li key={c} className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-[12px] font-semibold text-primary">
                    <Check className="h-3 w-3" strokeWidth={3.5} />{c}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── 3. WHY IT WORKS: routing diagram ───────────────────────── */

export function DidWhyItWorks() {
  const items = [
    { icon: MapPin, label: "Local trust", desc: "City-matching numbers lift pickup rates on outbound calls." },
    { icon: Zap, label: "Guided activation", desc: "Registration handled by our team, with no carrier paperwork on your own." },
    { icon: Router, label: "Keep your PBX", desc: "SIP trunking works with the calling stack you already run." },
    { icon: PhoneForwarded, label: "Port without downtime", desc: "Move your existing number over without losing calls." },
  ]
  return (
    <section className="border-y border-border bg-secondary/40 py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>Why it works</Eyebrow>
          <h2 className={H2}>Numbers, messaging, voice and AI live together</h2>
          <p className="mx-auto mt-5 max-w-3xl text-pretty text-[16px] leading-relaxed text-muted-foreground">
            There is no carrier handoff and no separate bill to reconcile. Route a number into our Voice product for IVR and broadcast calling, or into Voice AI Agents so it answers with a real conversation.
          </p>
        </div>

        <DidRouter />

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it) => (
            <li key={it.label} className="dd-lift flex items-center gap-3.5 rounded-2xl border border-border bg-card px-5 py-4 hover:border-primary/40">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-b from-primary/80 to-primary text-primary-foreground shadow-[0_10px_20px_-8px] shadow-primary/50 ring-1 ring-white/30"><it.icon className="h-5 w-5" /></span>
              <h3 className="text-[16px] font-semibold tracking-tight">{it.label}</h3>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ───────────────────────── 4. WHY SMSLOCAL: layer cake (dark) ───────────────────────── */

const LAYERS = [
  { icon: Bot, t: "Agentic AI agents", s: "Answer and act on calls and chats", base: false },
  { icon: MessageSquare, t: "Voice, SMS and broadcasting", s: "Campaigns, IVR and two-way messaging", base: false },
  { icon: PhoneCall, t: "Numbers and carrier layer", s: "Local, toll-free and short code numbers", base: true },
  { icon: ShieldCheck, t: "DLT and sender-ID registration", s: "Guided by our team, with fraud and spam protection", base: false },
]

export function DidWhySmsLocal() {
  return (
    <section className="relative overflow-hidden bg-[oklch(0.15_0.04_245)] py-14 text-white sm:py-20">
      <div aria-hidden className="dd-glow pointer-events-none absolute right-[8%] top-1/4 h-[360px] w-[520px] rounded-full bg-primary/20 blur-[120px]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <div>
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-3 py-1 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-primary"><Sparkles className="h-3.5 w-3.5" />Why SMSLocal</span>
          <h2 className={`${H2} text-white`}>The carrier layer some AI-only vendors leave out</h2>
          <p className="mt-5 max-w-xl text-pretty text-[16px] leading-relaxed text-white/70">
            It is included in the same platform as your agentic AI and broadcasting. Point a number at our Voice product for classic IVR menus and broadcast, or at Voice AI Agents so it answers with a real conversation and escalates to a human only when it needs to.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/products/voice/" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition hover:brightness-110">
              Voice: IVR &amp; broadcast <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/voice-ai-agents/" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-semibold backdrop-blur transition hover:bg-white/15">
              Voice AI Agents
            </Link>
          </div>
        </div>

        <div className="relative">
          <ol className="space-y-3">
            {LAYERS.map((l, i) => (
              <li
                key={l.t}
                className={`relative flex items-center gap-4 rounded-2xl border px-5 py-4 transition duration-300 ${
                  l.base
                    ? "border-primary/60 bg-gradient-to-r from-primary/25 to-primary/10 shadow-[0_0_40px_-8px] shadow-primary/40"
                    : "border-white/10 bg-white/[.05]"
                }`}
                style={{ marginLeft: `${(i % 2) * 14}px`, marginRight: `${((i + 1) % 2) * 14}px` }}
              >
                <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${l.base ? "bg-primary text-primary-foreground" : "bg-white/10 text-white/80"}`}><l.icon className="h-5 w-5" /></span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[15.5px] font-semibold tracking-tight">{l.t}</span>
                  <span className="block text-[12.5px] text-white/60">{l.s}</span>
                </span>
                {l.base && <span className="dd-pop shrink-0 rounded-full bg-accent px-3 py-1 text-[10.5px] font-bold text-accent-foreground">Often left out</span>}
              </li>
            ))}
          </ol>
          <p className="mt-4 flex items-center gap-2 text-[12.5px] font-medium text-white/60"><Check className="h-4 w-4 text-primary" strokeWidth={3} />All four layers in one platform, one bill</p>
        </div>
      </div>
    </section>
  )
}
