"use client"

import { useEffect, useState, type ReactNode } from "react"
import { Bot, CalendarClock, Check, Inbox, MessageCircle, Radio, UserCheck, Users } from "lucide-react"

// Interactive "What you get" explorer for /channels/messenger: a tab list on the left, a live mock on the right.
// Auto-advances until the visitor picks a tab themselves.

const TABS = [
  {
    key: "auto",
    icon: MessageCircle,
    title: "Automated replies",
    short: "Auto-replies",
    l: ["Greeting sent", "Away message on"],
    r: ["FAQs answered", "Quick replies"],
  },
  {
    key: "ai",
    icon: Bot,
    title: "AI agent with human handoff",
    short: "AI + handoff",
    l: ["Answers from your catalog", "Order data attached"],
    r: ["Handed to Priya", "Full chat history"],
  },
  {
    key: "broadcast",
    icon: Radio,
    title: "Broadcast to opted-in subscribers",
    short: "Broadcasts",
    l: ["Opted-in only", "Rules checked"],
    r: ["Scheduled send", "One campaign tool"],
  },
  {
    key: "pages",
    icon: Inbox,
    title: "One shared inbox, every Page",
    short: "Every Page",
    l: ["One login", "3 Pages connected"],
    r: ["Shared inbox", "One set of rules"],
  },
] as const

function In({ children }: { children: ReactNode }) {
  return <p className="w-fit max-w-[82%] rounded-2xl rounded-bl-md bg-muted px-3.5 py-2 text-[13.5px] leading-snug text-foreground">{children}</p>
}
function Out({ children }: { children: ReactNode }) {
  return <p className="ml-auto w-fit max-w-[84%] rounded-2xl rounded-br-md bg-primary px-3.5 py-2 text-[13.5px] leading-snug text-primary-foreground">{children}</p>
}
function Bar({ title, sub, right }: { title: string; sub: string; right?: ReactNode }) {
  return (
    <div className="flex items-center gap-3 border-b border-border bg-card px-5 py-3.5">
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-[12px] font-bold text-background">M</span>
      <div className="min-w-0 flex-1">
        <p className="text-[13.5px] font-semibold leading-tight">{title}</p>
        <p className="text-[11.5px] text-muted-foreground">{sub}</p>
      </div>
      {right}
    </div>
  )
}

function AutoPanel() {
  return (
    <>
      <Bar title="Mehta Sarees" sub="Facebook Page · auto-reply on" right={<span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary">Live</span>} />
      <div className="flex flex-1 flex-col justify-center gap-5 bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:18px_18px] p-6">
       <div className="space-y-3">
        <In>Hi! Do you deliver to Pune?</In>
        <Out>Hi, thanks for messaging us. Yes, we deliver to Pune. What would you like to do?</Out>
        <div className="ml-auto flex w-fit flex-wrap justify-end gap-2 pt-1">
          {["Delivery options", "Track an order", "Talk to a person"].map((t) => (
            <span key={t} className="rounded-full border border-primary px-3 py-1.5 text-[12px] font-semibold text-primary">{t}</span>
          ))}
        </div>
       </div>
       <div className="grid grid-cols-3 gap-2 text-center text-[12px] font-semibold">
        {["Greeting", "Away message", "FAQ answers"].map((t) => (
          <span key={t} className="flex items-center justify-center gap-1.5 rounded-xl bg-card py-2.5 ring-1 ring-border"><Check className="h-3.5 w-3.5 text-primary" strokeWidth={3} />{t}</span>
        ))}
       </div>
      </div>
    </>
  )
}

function AiPanel() {
  return (
    <>
      <Bar title="AI agent" sub="Replying from your catalog and orders" right={<span className="flex items-center gap-1.5 text-[11px] font-semibold text-primary"><i className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />Active</span>} />
      <div className="flex flex-1 flex-col justify-center space-y-3 bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:18px_18px] p-6">
        <In>Where is order #2041?</In>
        <Out>It left our warehouse yesterday and should reach you today by 6 PM.</Out>
        <In>I want to change the address</In>
        <div className="flex items-center gap-2.5 rounded-xl border border-dashed border-primary/50 bg-primary/5 px-3.5 py-2.5 text-[12px] font-medium">
          <UserCheck className="h-4 w-4 shrink-0 text-primary" />
          Handed to Priya with the full chat and order details
        </div>
        <Out>Hi, this is Priya. I have your order open, what is the new address?</Out>
      </div>
    </>
  )
}

function BroadcastPanel() {
  return (
    <>
      <Bar title="New broadcast" sub="Festive offer · Messenger" right={<span className="rounded-full bg-accent/50 px-2.5 py-1 text-[11px] font-semibold">Draft</span>} />
      <div className="grid flex-1 content-center gap-4 bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:18px_18px] p-6 sm:grid-cols-[1fr_1fr]">
        <div className="space-y-3 text-[12.5px]">
          <div className="rounded-xl bg-muted px-3.5 py-2.5">
            <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground"><Users className="h-3 w-3" />Audience</p>
            <p className="mt-0.5 font-semibold">Opted-in subscribers</p>
          </div>
          <div className="rounded-xl bg-muted px-3.5 py-2.5">
            <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground"><CalendarClock className="h-3 w-3" />Send time</p>
            <p className="mt-0.5 font-semibold">Tomorrow, 10:00 AM</p>
          </div>
          <p className="flex items-center gap-1.5 rounded-xl bg-primary/10 px-3.5 py-2.5 font-semibold text-primary"><Check className="h-3.5 w-3.5" strokeWidth={3} />Within messaging rules</p>
        </div>
        <div className="rounded-2xl bg-muted/70 p-3.5">
          <p className="text-[10.5px] font-semibold uppercase tracking-wide text-muted-foreground">Preview</p>
          <div className="mt-2 overflow-hidden rounded-2xl rounded-bl-md bg-card ring-1 ring-border">
            <div className="h-16 bg-gradient-to-br from-primary/40 to-accent/50" />
            <div className="p-3">
              <p className="text-[13px] font-semibold leading-tight">Festive sale starts today</p>
              <p className="mt-1 text-[11.5px] text-muted-foreground">New arrivals, free shipping this week.</p>
              <span className="mt-2.5 block rounded-full bg-primary py-1.5 text-center text-[11.5px] font-semibold text-primary-foreground">Shop now</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function PagesPanel() {
  const pages = [
    { n: "Mehta Sarees", s: "Retail", u: 4 },
    { n: "Mehta Home", s: "Home decor", u: 2 },
    { n: "Mehta Outlet", s: "Pune store", u: 0 },
  ]
  return (
    <>
      <Bar title="Connected Pages" sub="One login, one inbox" right={<span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary">3 Pages</span>} />
      <ul className="flex flex-1 flex-col justify-center space-y-3 bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:18px_18px] p-6">
        {pages.map((p) => (
          <li key={p.n} className="flex items-center gap-3 rounded-2xl bg-muted/70 px-4 py-3 ring-1 ring-border">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground text-[13px] font-bold text-background">{p.n[6]}</span>
            <span className="min-w-0 flex-1">
              <span className="block text-[13.5px] font-semibold leading-tight">{p.n}</span>
              <span className="block text-[11.5px] text-muted-foreground">{p.s}</span>
            </span>
            {p.u > 0 ? (
              <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-primary px-1.5 text-[11px] font-bold text-primary-foreground">{p.u}</span>
            ) : (
              <span className="text-[11px] font-semibold text-muted-foreground">All caught up</span>
            )}
          </li>
        ))}
      </ul>
      <p className="mx-6 mb-6 flex items-center gap-2 rounded-xl border border-dashed border-primary/50 bg-card px-3.5 py-2.5 text-[12px] font-medium">
        <Inbox className="h-4 w-4 text-primary" />Shown next to WhatsApp, Instagram and SMS in the same inbox
      </p>
    </>
  )
}

const PANELS = [AutoPanel, AiPanel, BroadcastPanel, PagesPanel]

export function MessengerExplorer() {
  const [active, setActive] = useState(0)
  const [auto, setAuto] = useState(true)

  useEffect(() => {
    if (!auto) return
    const id = window.setInterval(() => setActive((a) => (a + 1) % TABS.length), 6000)
    return () => window.clearInterval(id)
  }, [auto])

  const Panel = PANELS[active]
  const tab = TABS[active]
  const chip = (t: string, i: number, side: "l" | "r") => (
    <span
      key={`${active}-${side}-${t}`}
      className="ms-float flex items-center gap-2 rounded-full bg-card px-4 py-2.5 text-[12.5px] font-semibold shadow-[0_14px_30px_-16px_rgba(15,42,58,.5)] ring-1 ring-border"
      style={{ animationDelay: `${-(i + (side === "r" ? 2 : 0)) * 1.3}s` }}
    >
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground"><Check className="h-3 w-3" strokeWidth={3.5} /></span>
      {t}
    </span>
  )
  return (
    <div className="mt-12">
      <div role="tablist" aria-label="Messenger capabilities" className="mx-auto grid max-w-4xl grid-cols-2 gap-1.5 rounded-3xl bg-muted/80 p-1.5 ring-1 ring-border lg:grid-cols-4">
        {TABS.map((t, i) => {
          const on = i === active
          return (
            <button
              key={t.key}
              role="tab"
              aria-selected={on}
              onClick={() => { setActive(i); setAuto(false) }}
              className={`relative flex items-center justify-center gap-2.5 overflow-hidden rounded-[1.25rem] px-4 py-3.5 text-[14px] font-semibold transition-all duration-300 ${on ? "bg-card text-foreground shadow-[0_10px_26px_-14px_rgba(15,42,58,.55)] ring-1 ring-border" : "text-muted-foreground hover:bg-card/60 hover:text-foreground"}`}
            >
              <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${on ? "bg-primary text-primary-foreground shadow-md shadow-primary/30" : "bg-background"}`}>
                <t.icon className="h-4 w-4" />
              </span>
              <span className="truncate">{t.short}</span>
              {on && auto && <span aria-hidden className="absolute inset-x-4 bottom-0 h-[3px] origin-left rounded-full bg-primary" style={{ animation: "ms-progress 6s linear" }} />}
            </button>
          )
        })}
      </div>

      <p className="mt-6 text-center text-[13px] font-semibold uppercase tracking-[0.16em] text-primary" key={`t-${active}`} style={{ animation: "ms-panel .5s both" }}>{tab.title}</p>

      <div className="relative mt-4 overflow-hidden rounded-[2rem] border border-border bg-gradient-to-br from-primary/10 via-card to-accent/25 px-4 py-8 sm:px-8 sm:py-12">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(var(--border)_1.2px,transparent_1.2px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />
        <div className="relative mx-auto grid max-w-5xl items-center gap-6 lg:grid-cols-[1fr_560px_1fr]">
          <div className="hidden flex-col items-end gap-5 lg:flex">{tab.l.map((t, i) => chip(t, i, "l"))}</div>
          <div key={active} className="relative flex min-h-[420px] flex-col overflow-hidden rounded-3xl bg-card shadow-[0_34px_70px_-34px_rgba(15,42,58,.6)] ring-1 ring-border" style={{ animation: "ms-panel .5s cubic-bezier(.2,.7,.2,1) both" }}>
            <Panel />
          </div>
          <div className="hidden flex-col items-start gap-5 lg:flex">{tab.r.map((t, i) => chip(t, i, "r"))}</div>
        </div>
      </div>
      <style>{`
        @keyframes ms-progress { from { transform: scaleX(0); width: 100% } to { transform: scaleX(1); width: 100% } }
        @keyframes ms-panel { from { opacity: 0; transform: translateY(14px) } to { opacity: 1; transform: none } }
        @media (prefers-reduced-motion: reduce) { [role=tab] span[aria-hidden] { animation: none !important } }
      `}</style>
    </div>
  )
}
