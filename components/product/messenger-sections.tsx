import Link from "next/link"
import type { ReactNode } from "react"
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Check,
  Inbox,
  Mail,
  MessageCircle,
  MessageSquare,
  Phone,
  Radio,
  UserCheck,
  Sparkles,
  Users,
  X,
  Zap,
} from "lucide-react"
import { MessengerExplorer } from "@/components/product/messenger-explorer"

// Bespoke sections for /channels/messenger (everything below the hero). Layouts are deliberately different from
// the WhatsApp page and the shared product-page blocks: comparison panels, a tab explorer, a chevron ribbon,
// a Q&A wall, a dark handoff flow, a split-inbox mock and an editorial link list.

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-3 py-1 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-primary">
      <Sparkles className="h-3.5 w-3.5" />
      {children}
    </span>
  )
}

const CSS = `
@keyframes ms-float { 0%, 100% { transform: translateY(0) } 50% { transform: translateY(-8px) } }
@keyframes ms-glow { 0%, 100% { opacity: .55; transform: scale(1) } 50% { opacity: 1; transform: scale(1.12) } }
@keyframes ms-ping { 0% { box-shadow: 0 0 0 0 color-mix(in oklch, var(--primary) 55%, transparent) } 80%, 100% { box-shadow: 0 0 0 8px transparent } }
.ms-float { animation: ms-float 6s ease-in-out infinite }
.ms-glow { animation: ms-glow 7s ease-in-out infinite }
.ms-ping { animation: ms-ping 2.2s ease-out infinite }
.ms-seg { transform-origin: left center; transition: transform .9s cubic-bezier(.2,.7,.2,1) }
.wx-pre .ms-seg { transform: scaleX(0) }
.ms-pop { transition: transform .55s cubic-bezier(.3,1.6,.5,1) .25s }
.wx-pre .ms-pop { transform: scale(0) }
.ms-lift { transition: transform .35s cubic-bezier(.2,.7,.2,1), box-shadow .35s }
.ms-lift:hover { transform: translateY(-4px) }
@media (prefers-reduced-motion: reduce) { .ms-float, .ms-glow, .ms-ping { animation: none } .ms-seg, .ms-pop, .ms-lift { transition: none } }
`

export function MessengerStyles() {
  return <style>{CSS}</style>
}

const H2 = "mt-4 text-balance text-3xl font-semibold leading-[1.12] tracking-[-0.03em] sm:text-[40px]"

/* ───────────────────────── 1. PROBLEM: native inbox vs shared inbox ───────────────────────── */

export function MessengerProblem() {
  const native = [
    "Sits apart from your WhatsApp, Instagram and SMS conversations",
    "No order or customer context next to the chat",
    "Hard to assign, share or hand over inside a team",
    "Replies depend on someone watching the Page",
  ]
  const shared = [
    "Messenger lands in the same inbox as every other channel",
    "Customer and order details sit beside the conversation",
    "Assign, note and hand over with one set of rules",
    "Auto-replies and the AI agent cover the first response",
  ]
  return (
    <section className="border-y border-border bg-secondary/40 py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>The problem</Eyebrow>
          <h2 className={H2}>Messenger is where your customers already are. Is it wired into your workflow?</h2>
          <p className="mx-auto mt-5 max-w-3xl text-pretty text-[16px] leading-relaxed text-muted-foreground">
            Facebook still drives real inbound for Indian brands, but chats left in Meta&apos;s native inbox stay cut off from your order data and your other channels.
          </p>
        </div>

        <div className="mt-12 grid items-stretch gap-5 md:grid-cols-[1fr_auto_1fr]">
          <div className="ms-lift rounded-3xl border border-dashed border-border bg-background/60 p-7">
            <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-muted-foreground">In Meta&apos;s native inbox</p>
            <ul className="mt-5 space-y-4">
              {native.map((t) => (
                <li key={t} className="flex items-start gap-3 text-[14.5px] leading-snug text-muted-foreground">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/50 text-foreground ms-pop"><X className="h-3 w-3" strokeWidth={3} /></span>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-center">
            <span className="flex h-12 w-12 rotate-90 items-center justify-center rounded-full bg-foreground text-background shadow-lg md:rotate-0">
              <ArrowRight className="h-5 w-5" />
            </span>
          </div>

          <div className="ms-lift relative overflow-hidden rounded-3xl border border-primary/40 bg-card p-7 shadow-[0_24px_50px_-34px_rgba(15,42,58,.5)]">
            <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 ms-glow h-44 w-44 rounded-full bg-primary/15 blur-3xl" />
            <p className="relative text-[12px] font-bold uppercase tracking-[0.16em] text-primary">In the SMSLocal shared inbox</p>
            <ul className="relative mt-5 space-y-4">
              {shared.map((t) => (
                <li key={t} className="flex items-start gap-3 text-[14.5px] leading-snug text-foreground">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground ms-pop"><Check className="h-3 w-3" strokeWidth={3.5} /></span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── 2. WHAT YOU GET: interactive explorer ───────────────────────── */

export function MessengerCapabilities() {
  return (
    <section className="border-y border-border bg-background py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <Eyebrow>What you get</Eyebrow>
          <h2 className={H2}>Messenger, built into the same workflow as your other channels</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-muted-foreground">
            Automated where it should be, human where it matters, and broadcast when you&apos;re allowed to.
          </p>
        </div>
        <MessengerExplorer />
      </div>
    </section>
  )
}

/* ───────────────────────── 3. HOW IT WORKS: chevron ribbon ───────────────────────── */

const STEPS = [
  { n: "01", title: "Connect your Facebook Page", body: "Log in with Facebook and approve access for your Page. Add more Pages whenever you need to." },
  { n: "02", title: "Set greetings and FAQs", body: "Add a welcome message, an away message and answers to the questions customers ask most." },
  { n: "03", title: "Turn on the AI agent", body: "Ground it in your catalog, orders and policies, and choose when it should hand over to your team." },
  { n: "04", title: "Reply and broadcast from one inbox", body: "Your team picks up handoffs next to your other channels, and you send updates to opted-in subscribers." },
]

export function MessengerSteps() {
  const shapes = [
    "[clip-path:polygon(0_0,calc(100%-26px)_0,100%_50%,calc(100%-26px)_100%,0_100%)] rounded-l-2xl",
    "[clip-path:polygon(0_0,calc(100%-26px)_0,100%_50%,calc(100%-26px)_100%,0_100%,26px_50%)]",
    "[clip-path:polygon(0_0,calc(100%-26px)_0,100%_50%,calc(100%-26px)_100%,0_100%,26px_50%)]",
    "[clip-path:polygon(0_0,100%_0,100%_100%,0_100%,26px_50%)] rounded-r-2xl",
  ]
  const tones = ["bg-primary/25", "bg-primary/45", "bg-primary/70", "bg-primary"]
  return (
    <section className="border-y border-border bg-secondary/40 py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>How it works</Eyebrow>
          <h2 className={H2}>Connect Messenger and go live in four steps</h2>
        </div>

        <ol className="mt-12 grid gap-8 md:grid-cols-4 md:gap-0">
          {STEPS.map((s, i) => (
            <li key={s.n} className="md:px-0">
              <div className={`ms-seg hidden h-14 items-center justify-center text-[18px] font-extrabold tracking-tight md:flex ${shapes[i]} ${tones[i]} ${i === 3 ? "text-primary-foreground" : "text-foreground"}`}>
                {s.n}
              </div>
              <div className="flex items-center gap-3 md:hidden">
                <span className={`flex h-11 w-11 items-center justify-center rounded-full text-[14px] font-extrabold ${tones[i]} ${i === 3 ? "text-primary-foreground" : "text-foreground"}`}>{s.n}</span>
              </div>
              <div className="mt-4 md:px-5">
                <h3 className="text-[17px] font-semibold leading-snug tracking-tight">{s.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ───────────────────────── 4. WHAT THE AI ANSWERS: two-lane marquee ───────────────────────── */

const QA = [
  { tag: "Order status", q: "Where is my order #2041?", a: "It left our warehouse yesterday and should reach you today. Want the tracking link?" },
  { tag: "Pricing", q: "How much is the large size?", a: "The large size is listed at ₹799 right now. Shall I send you the product link?" },
  { tag: "Store hours", q: "Are you open on Sunday?", a: "Yes, we're open from 10 AM to 8 PM on Sundays." },
  { tag: "Returns", q: "Can I return this if it doesn't fit?", a: "You can return it within 7 days of delivery. I can start the request for you now." },
  { tag: "Booking", q: "Can I book a visit to the store?", a: "Sure. I have Saturday 11 AM or Sunday 4 PM open. Which works for you?" },
  { tag: "Delivery", q: "Do you deliver to Pune?", a: "Yes, we deliver to Pune. I can check the delivery date for your pincode." },
  { tag: "Payments", q: "Do you accept UPI?", a: "Yes, UPI, cards and cash on delivery are all available at checkout." },
  { tag: "Human help", q: "I want to talk to someone", a: "Of course. I'm connecting you to Priya from our support team now." },
]

function QaCard({ x }: { x: (typeof QA)[number] }) {
  return (
    <div className="ms-lift w-[320px] shrink-0 rounded-3xl border border-border bg-card p-5 shadow-[0_18px_40px_-30px_rgba(15,42,58,.5)] sm:w-[360px]">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-primary">{x.tag}</span>
        <span className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground"><Bot className="h-3.5 w-3.5 text-primary" />AI replied</span>
      </div>
      <p className="mt-4 text-[15px] font-semibold leading-snug tracking-tight">&ldquo;{x.q}&rdquo;</p>
      <p className="mt-3 border-l-2 border-primary pl-3 text-[13.5px] leading-relaxed text-muted-foreground">{x.a}</p>
    </div>
  )
}

function Lane({ items, reverse = false }: { items: typeof QA; reverse?: boolean }) {
  return (
    <div className="ms-lane overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
      <div className={`ms-track flex w-max gap-4 ${reverse ? "ms-rev" : ""}`}>
        {[...items, ...items].map((x, i) => (
          <QaCard key={`${x.tag}-${i}`} x={x} />
        ))}
      </div>
    </div>
  )
}

export function MessengerQA() {
  return (
    <section className="overflow-hidden border-y border-border bg-background py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>What the AI answers</Eyebrow>
          <h2 className={H2}>The Messenger questions your AI agent can answer for you</h2>
          <p className="mx-auto mt-4 max-w-2xl text-[16px] leading-relaxed text-muted-foreground">
            Order status, pricing, opening hours, returns and bookings: the routine questions that fill a Page inbox, answered from your own catalog and policies.
          </p>
        </div>
      </div>
      <div className="mt-12 space-y-4" data-no-reveal>
        <Lane items={QA.slice(0, 4)} />
        <Lane items={QA.slice(4)} reverse />
      </div>
      <style>{`
        @keyframes ms-lane { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        .ms-track { animation: ms-lane 46s linear infinite }
        .ms-track.ms-rev { animation-direction: reverse }
        .ms-lane:hover .ms-track { animation-play-state: paused }
        @media (prefers-reduced-motion: reduce) { .ms-track { animation: none } }
      `}</style>
    </section>
  )
}

/* ───────────────────────── 5. WHY IT WORKS: dark handoff flow ───────────────────────── */

export function MessengerWhyItWorks() {
  const nodes = [
    { icon: MessageCircle, label: "Customer messages", title: "Faster first response", desc: "Auto-replies and the AI agent cover the first message instantly." },
    { icon: Zap, label: "Auto-reply", title: "Consistent answers", desc: "Same AI agent and knowledge base across every channel." },
    { icon: Bot, label: "AI agent", title: "Clean handoffs", desc: "Full conversation context moves with the customer to a human." },
    { icon: UserCheck, label: "Human agent", title: "Opted-in broadcasts", desc: "Reach subscribers without breaking Messenger's messaging rules." },
  ]
  return (
    <section className="relative overflow-hidden bg-[oklch(0.15_0.04_245)] py-14 text-white sm:py-16">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 ms-glow h-[300px] w-[640px] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-3 py-1 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-primary"><Sparkles className="h-3.5 w-3.5" />Why it works</span>
          <h2 className={`${H2} text-white`}>One team, one AI agent, every channel your customers pick</h2>
          <p className="mt-5 text-pretty text-[16px] leading-relaxed text-white/70">
            Customers don&apos;t think in channels. They message wherever is convenient, and your team shouldn&apos;t have to remember which app to check.
          </p>
        </div>

        <div className="relative mt-14">
          <div aria-hidden className="absolute left-[12.5%] right-[12.5%] top-[34px] hidden h-px border-t-2 border-dashed border-white/20 lg:block" />
          <span aria-hidden className="ms-packet absolute left-[12.5%] top-[28px] hidden h-3.5 w-3.5 rounded-full bg-primary shadow-[0_0_18px_4px] shadow-primary/60 lg:block" />
          <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {nodes.map((n, i) => (
              <li key={n.label} className="relative text-center">
                <span className="relative mx-auto flex h-[68px] w-[68px] items-center justify-center rounded-2xl bg-white/[.07] ring-1 ring-white/20 backdrop-blur">
                  <n.icon className="h-7 w-7 text-primary" />
                  <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-accent text-[11px] font-extrabold text-accent-foreground">{i + 1}</span>
                </span>
                <p className="mt-4 text-[12.5px] font-semibold uppercase tracking-[0.14em] text-white/55">{n.label}</p>
                <h3 className="mt-3 text-[18px] font-semibold tracking-tight">{n.title}</h3>
                <p className="mx-auto mt-2 max-w-[230px] text-[13.5px] leading-relaxed text-white/65">{n.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <style>{`
        @keyframes ms-packet { 0% { left: 12.5%; opacity: 0 } 8% { opacity: 1 } 92% { opacity: 1 } 100% { left: calc(87.5% - 14px); opacity: 0 } }
        .ms-packet { animation: ms-packet 5s ease-in-out infinite }
        @media (prefers-reduced-motion: reduce) { .ms-packet { animation: none; opacity: 1 } }
      `}</style>
    </section>
  )
}

/* ───────────────────────── 6. WHY SMSLOCAL: split inbox mock ───────────────────────── */

function SplitInbox() {
  const channels = [
    { n: "Messenger", c: 6, on: true, icon: MessageCircle },
    { n: "WhatsApp", c: 3, on: false, icon: MessageSquare },
    { n: "Instagram", c: 2, on: false, icon: Users },
    { n: "SMS", c: 0, on: false, icon: Phone },
    { n: "Email", c: 1, on: false, icon: Mail },
  ]
  const rows = [
    { n: "Riya Kapoor", m: "Is the green one in stock?", t: "now", tag: "AI replying", b: 2 },
    { n: "Sameer Joshi", m: "Please change my address", t: "3m", tag: "With Priya", b: 1 },
    { n: "Neha Rao", m: "Thanks, got it!", t: "12m", tag: "Resolved", b: 0 },
    { n: "Karan Shah", m: "Do you ship to Goa?", t: "20m", tag: "AI replied", b: 0 },
  ]
  return (
    <div className="overflow-hidden rounded-3xl bg-card shadow-[0_28px_60px_-34px_rgba(15,42,58,.55)] ring-1 ring-border">
      <div className="flex items-center gap-1.5 border-b border-border bg-muted/60 px-4 py-3">
        <i className="h-2.5 w-2.5 rounded-full bg-border" /><i className="h-2.5 w-2.5 rounded-full bg-border" /><i className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="mx-auto rounded-md bg-background px-4 py-0.5 text-[11px] font-medium text-muted-foreground ring-1 ring-border">SMSLocal inbox</span>
      </div>
      <div className="grid grid-cols-[132px_minmax(0,1fr)] sm:grid-cols-[176px_minmax(0,1fr)]">
        <ul className="space-y-1 border-r border-border bg-muted/40 p-3">
          {channels.map((c) => (
            <li key={c.n} className={`flex items-center gap-2 rounded-xl px-2.5 py-2 text-[12.5px] font-semibold ${c.on ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>
              <c.icon className="h-3.5 w-3.5 shrink-0" />
              <span className="min-w-0 flex-1 truncate">{c.n}</span>
              {c.c > 0 && <span className={`rounded-full px-1.5 text-[10.5px] ${c.on ? "bg-white/25" : "bg-foreground/10"}`}>{c.c}</span>}
            </li>
          ))}
        </ul>
        <ul className="divide-y divide-border">
          {rows.map((r) => (
            <li key={r.n} className="flex items-center gap-3 px-4 py-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-foreground text-[12px] font-bold text-background">{r.n[0]}</span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center justify-between text-[13px] font-semibold leading-tight">{r.n}<span className="text-[10.5px] font-medium text-muted-foreground">{r.t}</span></span>
                <span className="block truncate text-[12px] text-muted-foreground">{r.m}</span>
                <span className="mt-1 inline-block rounded-md bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary">{r.tag}</span>
              </span>
              {r.b > 0 && <span className="ms-ping flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10.5px] font-bold text-primary-foreground">{r.b}</span>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function MessengerWhySmsLocal() {
  return (
    <section className="border-y border-border bg-secondary/40 py-14 sm:py-16">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_.9fr] lg:gap-16">
        <div className="relative min-w-0">
          <div aria-hidden className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-primary/15 via-transparent to-accent/25 blur-2xl" />
          <div className="ms-float relative"><SplitInbox /></div>
        </div>
        <div className="min-w-0">
          <Eyebrow>Why SMSLocal</Eyebrow>
          <h2 className={H2}>Messenger is another door into the same inbox</h2>
          <p className="mt-5 text-pretty text-[16px] leading-relaxed text-muted-foreground">
            Add Messenger to the omnichannel inbox that already runs your WhatsApp, Instagram and SMS conversations, and let the
            same AI agent and human team handle it. No new tools, no new logins, no new training for your support team.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/products/omnichannel-inbox/" className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition hover:opacity-90">
              Omnichannel inbox <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/products/ai-agents/" className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-semibold transition hover:border-primary hover:text-primary">
              AI Agents
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── 7. RELATED: editorial list ───────────────────────── */

export function MessengerRelated({ links }: { links: { href: string; label: string; hint: string }[] }) {
  return (
    <section className="border-t border-border bg-background py-14 sm:py-16">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[.7fr_1.3fr] lg:gap-16">
        <div>
          <Eyebrow>Explore more</Eyebrow>
          <h2 className={H2}>Keep going with SMSLocal</h2>
        </div>
        <ul className="divide-y divide-border border-y border-border">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="group flex items-center gap-4 py-5 transition-transform duration-300 hover:translate-x-1.5">
                <span className="min-w-0 flex-1">
                  <span className="block text-[18px] font-semibold tracking-tight transition group-hover:text-primary">{l.label}</span>
                  <span className="mt-0.5 block text-[14px] text-muted-foreground">{l.hint}</span>
                </span>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border transition group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
