"use client"

import { useEffect, useState, type ReactNode } from "react"
import { Bot, Check, Instagram, Layers, Mail, MessagesSquare, Phone, Star, Timer, Users } from "lucide-react"

// "What you get" for /channels/social: four panels side by side. The active panel widens and shows its visual; the
// others fold down to an icon and a title. All the text stays in the page for crawlers. Below lg every panel is open.

function Row({ icon, name, text, tag }: { icon: ReactNode; name: string; text: string; tag?: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-card px-3.5 py-3 ring-1 ring-border">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-foreground text-background">{icon}</span>
      <span className="min-w-0 flex-1">
        <span className="block text-[13px] font-semibold leading-tight">{name}</span>
        <span className="block truncate text-[12px] text-muted-foreground">{text}</span>
      </span>
      {tag && <span className="shrink-0 rounded-full bg-primary/10 px-2.5 py-1 text-[10.5px] font-semibold text-primary">{tag}</span>}
    </div>
  )
}

function InboxMock() {
  return (
    <div className="space-y-2.5">
      <Row icon={<Instagram className="h-4 w-4" />} name="@meera_k" text="Is this available in size M?" tag="Instagram" />
      <Row icon={<MessagesSquare className="h-4 w-4" />} name="Arjun D." text="Can I track my order here?" tag="Messenger" />
      <Row icon={<Users className="h-4 w-4" />} name="Farhan S." text="Thanks, got my refund!" tag="Chat" />
      <Row icon={<Mail className="h-4 w-4" />} name="Priya N." text="Following up on ticket #204" tag="Email" />
      <Row icon={<Phone className="h-4 w-4" />} name="Rahul V." text="Please call me back" tag="Voice" />
    </div>
  )
}

function AiMock() {
  return (
    <div className="space-y-2.5">
      <p className="w-fit max-w-[85%] rounded-2xl rounded-bl-md bg-card px-4 py-2.5 text-[13.5px] ring-1 ring-border">Do you ship to Jaipur?</p>
      <p className="ml-auto w-fit max-w-[90%] rounded-2xl rounded-br-md bg-primary px-4 py-2.5 text-[13.5px] text-primary-foreground">Yes, we ship to Jaipur. Want me to check the delivery date for your pincode?</p>
      <p className="w-fit max-w-[85%] rounded-2xl rounded-bl-md bg-card px-4 py-2.5 text-[13.5px] ring-1 ring-border">302001. And can I get a refund if it doesn&apos;t fit?</p>
      <p className="ml-auto w-fit max-w-[90%] rounded-2xl rounded-br-md bg-primary px-4 py-2.5 text-[13.5px] text-primary-foreground">It arrives in 3 to 5 days, and returns are free within 7 days.</p>
      <p className="flex items-center gap-2 rounded-xl border border-dashed border-primary/50 bg-primary/5 px-3.5 py-2.5 text-[12px] font-medium"><Bot className="h-4 w-4 text-primary" />Answered from your knowledge base, human on standby</p>
    </div>
  )
}

function OpsMock() {
  return (
    <div className="space-y-2.5">
      <div className="flex items-center gap-3 rounded-2xl bg-card px-4 py-3.5 ring-1 ring-border">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary"><Layers className="h-4 w-4" /></span>
        <span className="min-w-0 flex-1">
          <span className="block text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Routing rule</span>
          <span className="block text-[13.5px] font-semibold">Instagram + order question: to Priya</span>
        </span>
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-[12px] font-bold text-background">P</span>
      </div>
      <div className="rounded-2xl bg-card px-4 py-3.5 ring-1 ring-border">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-[13.5px] font-semibold"><Timer className="h-4 w-4 text-primary" />SLA timer</span>
          <span className="rounded-full bg-accent/50 px-2.5 py-0.5 text-[11px] font-bold">12 min left</span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted"><i className="block h-full w-[68%] rounded-full bg-gradient-to-r from-primary to-primary/70" /></div>
        <p className="mt-1.5 text-[11.5px] text-muted-foreground">First reply target: 30 min</p>
      </div>
      <div className="flex items-center justify-between rounded-2xl bg-card px-4 py-3.5 ring-1 ring-border">
        <span className="text-[13.5px] font-semibold">CSAT this week</span>
        <span className="flex items-center gap-2">
          <span className="flex gap-0.5 text-primary">{[0, 1, 2, 3, 4].map((i) => <Star key={i} className={`h-4 w-4 ${i < 4 ? "fill-primary" : ""}`} />)}</span>
          <span className="text-[14px] font-bold">4.8</span>
        </span>
      </div>
    </div>
  )
}

function RecordMock() {
  return (
    <div className="space-y-2.5">
      <div className="grid gap-2 sm:grid-cols-3">
        {["@meera_k on Instagram", "Meera K. on Messenger", "meera@mail.com"].map((t) => (
          <span key={t} className="rounded-xl bg-card px-3 py-2.5 text-center text-[11.5px] font-medium ring-1 ring-border">{t}</span>
        ))}
      </div>
      <div className="flex justify-center"><span className="h-5 w-px bg-primary/50" /></div>
      <div className="flex items-center gap-3 rounded-2xl bg-card px-4 py-3.5 shadow-[0_18px_36px_-22px_rgba(15,42,58,.5)] ring-1 ring-primary/40">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-[14px] font-bold text-background">M</span>
        <span className="min-w-0 flex-1">
          <span className="block text-[14px] font-semibold leading-tight">Meera Kapoor</span>
          <span className="block text-[12px] text-muted-foreground">One record across every channel</span>
        </span>
        <span className="flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-[10.5px] font-bold text-primary-foreground"><Check className="h-3 w-3" strokeWidth={3.5} />Merged</span>
      </div>
      <ul className="space-y-1.5 rounded-2xl bg-card/70 px-4 py-3 ring-1 ring-border">
        {[["Mon", "Asked about size M", "Instagram"], ["Tue", "Asked to track the order", "Messenger"], ["Wed", "Requested an invoice", "Email"]].map(([d, t, c]) => (
          <li key={d} className="flex items-center gap-3 text-[12.5px]">
            <span className="w-8 shrink-0 font-semibold text-muted-foreground">{d}</span>
            <span className="min-w-0 flex-1 truncate">{t}</span>
            <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-[10.5px] font-semibold text-primary">{c}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

const PANELS = [
  { icon: Instagram, title: "Social in one place", body: "Instagram and Messenger DMs alongside chat, voice, SMS and email, with no switching apps to keep up.", Mock: InboxMock },
  { icon: Bot, title: "AI that answers", body: "The agentic AI handles routine social questions automatically, freeing your team for what needs a human.", Mock: AiMock },
  { icon: Users, title: "Built for operations", body: "Routing, SLA timers and CSAT for social support at scale, measured like every other channel.", Mock: OpsMock },
  { icon: Layers, title: "Unified customer", body: "One record, so social ties into the customer's full history, wherever they messaged from.", Mock: RecordMock },
]

export function SocialExplorer() {
  const [active, setActive] = useState(0)
  const [auto, setAuto] = useState(true)

  useEffect(() => {
    if (!auto) return
    const id = window.setInterval(() => setActive((a) => (a + 1) % PANELS.length), 5500)
    return () => window.clearInterval(id)
  }, [auto])

  return (
    <div className="mt-12 flex flex-col gap-3 lg:h-[470px] lg:flex-row" role="list">
      {PANELS.map((p, i) => {
        const on = i === active
        return (
          <article
            key={p.title}
            role="listitem"
            tabIndex={0}
            onMouseEnter={() => { setActive(i); setAuto(false) }}
            onFocus={() => { setActive(i); setAuto(false) }}
            onClick={() => { setActive(i); setAuto(false) }}
            className={`group relative cursor-pointer overflow-hidden rounded-[1.75rem] border transition-[flex-grow,border-color,background-color,box-shadow] duration-500 lg:basis-0 ${
              on ? "border-primary/40 bg-gradient-to-br from-primary/12 via-card to-accent/20 shadow-[0_30px_60px_-36px_rgba(15,42,58,.55)] lg:grow-[3.4]" : "border-border bg-card hover:border-primary/30 lg:grow-[1]"
            }`}
          >
            {/* folded state: icon + vertical title, only on lg and only when inactive */}
            <div className={`absolute inset-0 hidden flex-col items-center justify-between py-6 transition-opacity duration-300 lg:flex ${on ? "pointer-events-none opacity-0" : "opacity-100"}`} aria-hidden>
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-muted text-foreground"><p.icon className="h-5 w-5" /></span>
              <span className="text-[15px] font-semibold tracking-tight [writing-mode:vertical-rl] rotate-180">{p.title}</span>
              <span className="text-[11px] font-bold tracking-[0.18em] text-muted-foreground">0{i + 1}</span>
            </div>

            {/* open state (always open below lg) */}
            <div className={`flex h-full flex-col p-6 transition-opacity duration-500 sm:p-7 lg:min-w-[500px] ${on ? "lg:opacity-100" : "lg:pointer-events-none lg:opacity-0"}`}>
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-b from-primary/80 to-primary text-primary-foreground shadow-[0_10px_20px_-8px] shadow-primary/50 ring-1 ring-white/30"><p.icon className="h-5 w-5" /></span>
                <span className="text-[11px] font-bold tracking-[0.18em] text-primary">0{i + 1}</span>
              </div>
              <h3 className="mt-4 text-[22px] font-semibold leading-tight tracking-tight">{p.title}</h3>
              <p className="mt-2 max-w-md text-[14.5px] leading-relaxed text-muted-foreground">{p.body}</p>
              <div className="flex flex-1 flex-col justify-center pt-5"><p.Mock /></div>
            </div>
          </article>
        )
      })}
    </div>
  )
}
