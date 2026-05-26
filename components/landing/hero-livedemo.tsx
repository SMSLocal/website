"use client"

import { useEffect, useRef, useState } from "react"
import { Bot, Check, CheckCheck, KeyRound, MessageSquareText, Radio, Sparkles, X } from "lucide-react"

const FEATURES = ["Bulk SMS", "WhatsApp AI", "OTP", "Cascade"]

type Ev =
  | { f: number; type: "campaign"; title: string; sub: string }
  | { f: number; type: "delivery"; value: string; meta: string }
  | { f: number; type: "in"; name: string; text: string }
  | { f: number; type: "typing" }
  | { f: number; type: "ai"; text: string; meta: string }
  | { f: number; type: "otp"; code: string; meta: string }
  | { f: number; type: "route"; ch: string; ok: boolean; note: string }

const SCRIPT: Ev[] = [
  { f: 0, type: "campaign", title: "Diwali Sale broadcast", sub: "2,418 recipients · sender SMSLCL" },
  { f: 0, type: "delivery", value: "2,371 delivered", meta: "98.1% · in 1.8s" },
  { f: 1, type: "in", name: "Priya", text: "Hey! Has my order #4821 shipped? 📦" },
  { f: 1, type: "typing" },
  { f: 1, type: "ai", text: "Out for delivery 🛵 ETA today by 6 PM. Track: smsl.in/t/4821", meta: "AI agent · Tamil · 0.8s" },
  { f: 2, type: "otp", code: "482913", meta: "Hyderabad · delivered & verified in 0.3s" },
  { f: 3, type: "route", ch: "RCS", ok: false, note: "recipient not RCS-capable" },
  { f: 3, type: "route", ch: "WhatsApp", ok: false, note: "no WhatsApp on number" },
  { f: 3, type: "route", ch: "SMS", ok: true, note: "delivered in 0.4s" },
]

const delayFor = (e: Ev) => (e.type === "typing" ? 1000 : e.type === "route" ? 1300 : 2000)
const WINDOW = 5

export function HeroLiveDemo() {
  const [shown, setShown] = useState<{ id: number; e: Ev }[]>(() =>
    SCRIPT.slice(0, 3).map((e, i) => ({ id: i, e })),
  )
  const idx = useRef(3)
  const nid = useRef(3)

  useEffect(() => {
    let active = true
    let timer: ReturnType<typeof setTimeout>
    const tick = () => {
      if (!active) return
      const e = SCRIPT[idx.current % SCRIPT.length]
      idx.current += 1
      const id = nid.current++
      setShown((prev) => [...prev, { id, e }].slice(-WINDOW))
      timer = setTimeout(tick, delayFor(e))
    }
    timer = setTimeout(tick, 1600)
    return () => {
      active = false
      clearTimeout(timer)
    }
  }, [])

  const currentF = shown.length ? shown[shown.length - 1].e.f : 0

  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      <div aria-hidden className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-tr from-primary/15 via-transparent to-accent/15 blur-3xl" />

      {/* Handwritten accent */}
      <div aria-hidden className="absolute -top-7 right-6 z-20 hidden rotate-3 lg:block">
        <span className="inline-flex items-center gap-1 text-[15px] font-medium italic text-primary" style={{ fontFamily: "var(--font-mono)" }}>
          live, right now <Sparkles className="h-4 w-4" />
        </span>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-foreground/10">
        {/* Header: feature chips advancing one after another */}
        <div className="border-b border-border bg-secondary/40 px-4 py-3">
          <div className="mb-2.5 flex items-center gap-2 text-[12px] font-semibold text-foreground">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            Live demo
            <span className="ml-auto text-[11px] font-normal text-muted-foreground">app.smslocal.in</span>
          </div>
          <div className="flex gap-1.5">
            {FEATURES.map((f, i) => (
              <span
                key={f}
                className={`flex-1 truncate rounded-md px-2 py-1 text-center text-[10.5px] font-medium transition ${
                  i === currentF ? "bg-primary text-primary-foreground" : "bg-background text-muted-foreground"
                }`}
              >
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* Live feed */}
        <div className="flex h-[330px] flex-col justify-end gap-2 overflow-hidden bg-[oklch(0.985_0.004_180)] p-3.5">
          {shown.map((row, i) => (
            <EventView key={row.id} e={row.e} fresh={i === shown.length - 1} />
          ))}
        </div>

        {/* Decorative footer */}
        <div className="flex items-center gap-2 border-t border-border bg-card px-3.5 py-2.5">
          <div className="flex-1 rounded-full bg-secondary px-3 py-1.5 text-[11px] text-muted-foreground">Watching the platform live…</div>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary">
            <CheckCheck className="h-3.5 w-3.5" /> 98.4%
          </span>
        </div>
      </div>

      {/* Floating accents */}
      <div aria-hidden className="animate-float-slow pointer-events-none absolute -left-12 top-24 z-20 hidden items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 shadow-xl shadow-foreground/10 backdrop-blur-sm xl:flex">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary"><Bot className="h-4 w-4" /></span>
        <span className="leading-tight"><span className="block text-[12.5px] font-semibold text-foreground">8 languages</span><span className="block text-[10.5px] text-muted-foreground">AI auto-reply</span></span>
      </div>
      <div aria-hidden className="animate-float-slower pointer-events-none absolute -right-10 bottom-24 z-20 hidden items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 shadow-xl shadow-foreground/10 backdrop-blur-sm xl:flex" style={{ animationDelay: "0.8s" }}>
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary"><Check className="h-4 w-4" /></span>
        <span className="leading-tight"><span className="block text-[12.5px] font-semibold text-foreground">DLT-compliant</span><span className="block text-[10.5px] text-muted-foreground">TRAI-approved</span></span>
      </div>
    </div>
  )
}

function EventView({ e, fresh }: { e: Ev; fresh: boolean }) {
  const anim = fresh ? { animation: "message-in 0.45s cubic-bezier(0.2,0.8,0.2,1) both" } : undefined

  if (e.type === "campaign") {
    return (
      <div style={anim} className="flex items-center gap-2.5 rounded-xl border border-border bg-card px-3 py-2.5 shadow-sm">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary"><MessageSquareText className="h-4 w-4" /></span>
        <div className="min-w-0">
          <div className="text-[12.5px] font-semibold text-foreground">{e.title}</div>
          <div className="truncate text-[11px] text-muted-foreground">{e.sub}</div>
        </div>
      </div>
    )
  }
  if (e.type === "delivery") {
    return (
      <div style={anim} className="flex items-center gap-2 rounded-xl bg-primary/10 px-3 py-2.5">
        <CheckCheck className="h-4 w-4 text-primary" />
        <span className="text-[12.5px] font-semibold text-primary">{e.value}</span>
        <span className="ml-auto text-[11px] text-muted-foreground">{e.meta}</span>
      </div>
    )
  }
  if (e.type === "in") {
    return (
      <div style={anim} className="flex items-end gap-2">
        <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-[9px] font-bold text-white">{e.name[0]}</span>
        <div className="max-w-[78%] rounded-2xl rounded-bl-sm bg-card px-3 py-2 text-[12.5px] text-foreground shadow-sm">{e.text}</div>
      </div>
    )
  }
  if (e.type === "typing") {
    return (
      <div style={anim} className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-card px-3 py-2.5 w-fit shadow-sm">
        <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60" style={{ animation: "dot-bounce 1.2s infinite" }} />
        <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60" style={{ animation: "dot-bounce 1.2s infinite 0.15s" }} />
        <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60" style={{ animation: "dot-bounce 1.2s infinite 0.3s" }} />
      </div>
    )
  }
  if (e.type === "ai") {
    return (
      <div style={anim} className="ml-auto max-w-[82%] rounded-2xl rounded-br-sm bg-primary px-3 py-2 text-[12.5px] text-primary-foreground shadow-sm">
        {e.text}
        <div className="mt-1 flex items-center justify-end gap-1 text-[9.5px] text-primary-foreground/75"><Bot className="h-3 w-3" /> {e.meta} <CheckCheck className="h-3 w-3" /></div>
      </div>
    )
  }
  if (e.type === "otp") {
    return (
      <div style={anim} className="rounded-xl border border-border bg-card px-3 py-2.5 shadow-sm">
        <div className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground"><KeyRound className="h-3.5 w-3.5 text-primary" /> Your SMSLocal OTP</div>
        <div className="mt-1.5 flex items-center gap-2">
          <div className="flex gap-1">
            {e.code.split("").map((d, i) => (
              <span key={i} className="flex h-7 w-5 items-center justify-center rounded bg-primary/10 text-[13px] font-bold text-primary">{d}</span>
            ))}
          </div>
          <span className="ml-auto inline-flex items-center gap-1 text-[10.5px] font-semibold text-primary"><CheckCheck className="h-3.5 w-3.5" /> 0.3s</span>
        </div>
        <div className="mt-1 text-[10.5px] text-muted-foreground">{e.meta}</div>
      </div>
    )
  }
  // route
  return (
    <div style={anim} className={`flex items-center gap-2.5 rounded-xl px-3 py-2 ${e.ok ? "bg-primary text-primary-foreground" : "border border-border bg-card text-foreground"}`}>
      <span className={`inline-flex h-6 w-6 items-center justify-center rounded-lg ${e.ok ? "bg-white/20" : "bg-secondary text-muted-foreground"}`}>
        {e.ok ? <Check className="h-3.5 w-3.5" /> : e.ch === "RCS" ? <Radio className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
      </span>
      <span className="text-[12.5px] font-semibold">{e.ch}</span>
      <span className={`ml-auto text-[11px] ${e.ok ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{e.note}</span>
    </div>
  )
}
