"use client"

import { useEffect, useState, type ReactNode } from "react"
import { Bot, Check, Megaphone, Phone, PhoneForwarded, Router, Server, Voicemail } from "lucide-react"

// "Why it works" for /numbers/did: one number card with three ways to route it. Pick a route and the panel on the right
// shows what it does. Auto-advances until the visitor chooses. All text is always in the page.

const ROUTES = [
  { key: "ivr", icon: Voicemail, title: "Voice: IVR and broadcast", sub: "Classic menus and broadcast calling" },
  { key: "ai", icon: Bot, title: "Voice AI Agents", sub: "Answers with a real conversation" },
  { key: "pbx", icon: Router, title: "Your PBX via SIP trunk", sub: "Keep the calling stack you run" },
] as const

function Bar({ label, tag }: { label: string; tag: string }) {
  return (
    <div className="mb-5 flex items-center justify-between gap-3 rounded-2xl bg-foreground px-4 py-3 text-background">
      <span className="flex items-center gap-2.5 text-[13px] font-semibold"><Phone className="h-4 w-4 text-primary" />{label}</span>
      <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold"><i className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />{tag}</span>
    </div>
  )
}

function Note({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return <p className="flex items-center gap-2.5 rounded-xl border border-dashed border-primary/50 bg-primary/5 px-4 py-3 text-[13px] font-medium">{icon}{children}</p>
}

function IvrPanel() {
  return (
    <div>
      <Bar label="Incoming call · +91 ·· ···· ····" tag="IVR menu" />
      <p className="w-fit max-w-[90%] rounded-2xl rounded-tl-md bg-card px-4 py-3 text-[14.5px] ring-1 ring-border">Thanks for calling. Please choose an option.</p>
      <ul className="mt-4 space-y-2.5">
        {[["1", "Orders", "Order status and tracking"], ["2", "Support", "Help with an existing order"], ["3", "Sales", "Talk to the sales team"]].map(([k, v, d]) => (
          <li key={k} className="flex items-center gap-4 rounded-2xl bg-card px-4 py-3.5 ring-1 ring-border">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-foreground text-[15px] font-bold text-background">{k}</span>
            <span className="min-w-0 flex-1">
              <span className="block text-[15px] font-semibold leading-tight">{v}</span>
              <span className="block text-[12.5px] text-muted-foreground">{d}</span>
            </span>
            <span className="text-[12px] font-semibold text-primary">Press {k}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4"><Note icon={<Megaphone className="h-4 w-4 shrink-0 text-primary" />}>The same number can also send broadcast calls</Note></div>
    </div>
  )
}

function AiPanel() {
  return (
    <div>
      <Bar label="Live call · +91 ·· ···· ····" tag="AI agent on the line" />
      <div className="space-y-2.5">
        <p className="w-fit max-w-[85%] rounded-2xl rounded-bl-md bg-card px-4 py-2.5 text-[14px] ring-1 ring-border">Hi, where is my order?</p>
        <p className="ml-auto w-fit max-w-[88%] rounded-2xl rounded-br-md bg-primary px-4 py-2.5 text-[14px] text-primary-foreground">It is out for delivery and should reach you today. Want the tracking link by SMS?</p>
        <p className="w-fit max-w-[85%] rounded-2xl rounded-bl-md bg-card px-4 py-2.5 text-[14px] ring-1 ring-border">Yes please, and can I talk to someone?</p>
        <p className="ml-auto w-fit max-w-[88%] rounded-2xl rounded-br-md bg-primary px-4 py-2.5 text-[14px] text-primary-foreground">Sent. Connecting you to a person from our team now.</p>
      </div>
      <div className="mt-4"><Note icon={<PhoneForwarded className="h-4 w-4 shrink-0 text-primary" />}>Escalates to a human only when it needs to</Note></div>
    </div>
  )
}

function PbxPanel() {
  return (
    <div>
      <Bar label="SIP trunk · +91 ·· ···· ····" tag="Connected" />
      <div className="flex items-center gap-3">
        <span className="flex flex-1 items-center gap-3 rounded-2xl bg-card px-4 py-4 ring-1 ring-border"><Server className="h-5 w-5 text-foreground" /><span className="text-[14.5px] font-semibold">Your PBX</span></span>
        <span className="flex w-24 items-center">
          <i className="h-px flex-1 border-t-2 border-dashed border-primary/60" />
          <span className="mx-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground"><Check className="h-3.5 w-3.5" strokeWidth={3.5} /></span>
          <i className="h-px flex-1 border-t-2 border-dashed border-primary/60" />
        </span>
        <span className="flex flex-1 items-center gap-3 rounded-2xl bg-card px-4 py-4 ring-1 ring-primary/50"><Phone className="h-5 w-5 text-primary" /><span className="text-[14.5px] font-semibold">SMSLocal number</span></span>
      </div>
      <ul className="mt-4 space-y-2.5">
        {[["Inbound calls", "Delivered to your PBX"], ["Outbound calls", "Placed from your SMSLocal number"], ["Your setup", "No change to the system you already run"]].map(([k, v]) => (
          <li key={k} className="flex items-center justify-between gap-3 rounded-2xl bg-card px-4 py-3.5 text-[13.5px] ring-1 ring-border">
            <span className="font-semibold">{k}</span>
            <span className="flex items-center gap-1.5 text-muted-foreground"><Check className="h-3.5 w-3.5 text-primary" strokeWidth={3.5} />{v}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4"><Note icon={<Router className="h-4 w-4 shrink-0 text-primary" />}>Works with the calling stack you already run</Note></div>
    </div>
  )
}

const PANELS = [IvrPanel, AiPanel, PbxPanel]

export function DidRouter() {
  const [active, setActive] = useState(0)
  const [auto, setAuto] = useState(true)

  useEffect(() => {
    if (!auto) return
    const id = window.setInterval(() => setActive((a) => (a + 1) % ROUTES.length), 5500)
    return () => window.clearInterval(id)
  }, [auto])

  const Panel = PANELS[active]
  return (
    <div className="mt-12 grid items-stretch gap-5 lg:grid-cols-[.9fr_1.1fr] lg:gap-8">
      {/* the number and its routes */}
      <div className="rounded-[2rem] border border-border bg-card p-6 shadow-[0_30px_60px_-40px_rgba(15,42,58,.5)] sm:p-8">
        <div className="rounded-3xl bg-gradient-to-br from-foreground to-[oklch(0.22_0.03_200)] p-6 text-background">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">SMSLocal number</p>
          <p className="mt-2 font-mono text-[28px] font-bold tracking-tight">+91 ·· ···· ····</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {["Voice ready", "SMS ready"].map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11.5px] font-semibold"><i className="h-1.5 w-1.5 rounded-full bg-primary" />{t}</span>
            ))}
          </div>
        </div>

        <p className="mt-6 text-[12px] font-bold uppercase tracking-[0.16em] text-muted-foreground">Route it to</p>
        <div role="tablist" aria-label="Number routing options" className="mt-3 space-y-2.5">
          {ROUTES.map((r, i) => {
            const on = i === active
            return (
              <button
                key={r.key}
                role="tab"
                aria-selected={on}
                onClick={() => { setActive(i); setAuto(false) }}
                className={`flex w-full items-center gap-3.5 rounded-2xl border px-4 py-3.5 text-left transition ${on ? "border-primary/50 bg-primary/10 shadow-[0_14px_28px_-20px] shadow-primary/60" : "border-border bg-background hover:border-primary/30"}`}
              >
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition ${on ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}><r.icon className="h-5 w-5" /></span>
                <span className="min-w-0">
                  <span className="block text-[14.5px] font-semibold leading-tight">{r.title}</span>
                  <span className="block text-[12.5px] text-muted-foreground">{r.sub}</span>
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* what the chosen route does */}
      <div className="relative flex">
        <div aria-hidden className="absolute -inset-3 rounded-[2.5rem] bg-gradient-to-br from-primary/15 via-transparent to-accent/25 blur-2xl" />
        <div className="relative flex w-full flex-col rounded-[2rem] border border-border bg-gradient-to-br from-primary/10 via-card to-accent/15 p-6 sm:p-8">
          <div key={active} className="flex flex-1 flex-col justify-center" style={{ animation: "dr-in .5s cubic-bezier(.2,.7,.2,1) both" }}>
            <Panel />
          </div>
        </div>
      </div>
      <style>{`@keyframes dr-in { from { opacity: 0; transform: translateY(12px) } to { opacity: 1; transform: none } }`}</style>
    </div>
  )
}
