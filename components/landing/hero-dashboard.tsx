"use client"

import { useEffect, useState } from "react"
import { Bot, CheckCheck, KeyRound, MessageCircle, MessageSquareText, Radio, ShieldCheck, Zap } from "lucide-react"

type Event = { ch: string; icon: React.ComponentType<{ className?: string }>; city: string; text: string }

const POOL: Event[] = [
  { ch: "WhatsApp", icon: Bot, city: "Chennai", text: "AI replied in Tamil" },
  { ch: "SMS", icon: MessageSquareText, city: "Mumbai", text: "Diwali campaign delivered" },
  { ch: "OTP", icon: KeyRound, city: "Hyderabad", text: "Login code · 0.3s" },
  { ch: "RCS", icon: Radio, city: "Pune", text: "Branded message read" },
  { ch: "WhatsApp", icon: MessageCircle, city: "Delhi", text: "Order update sent" },
  { ch: "SMS", icon: MessageSquareText, city: "Kolkata", text: "Cart reminder delivered" },
  { ch: "OTP", icon: KeyRound, city: "Bengaluru", text: "Verification · 0.2s" },
]

type Row = Event & { id: number; delivered: boolean }

const CHANNELS = ["SMS", "WhatsApp", "RCS", "OTP", "Email"]
const BARS = [58, 44, 76, 52, 88, 66, 98]

export function HeroDashboard() {
  const [rows, setRows] = useState<Row[]>(() => POOL.slice(0, 4).map((p, i) => ({ ...p, id: i, delivered: true })))
  const [count, setCount] = useState(42118)

  useEffect(() => {
    let idx = 4
    let nextId = 100
    const timers: ReturnType<typeof setTimeout>[] = []
    const interval = setInterval(() => {
      const p = POOL[idx % POOL.length]
      idx += 1
      const id = nextId++
      setRows((prev) => [{ ...p, id, delivered: false }, ...prev].slice(0, 4))
      setCount((c) => c + Math.floor(Math.random() * 6) + 2)
      timers.push(setTimeout(() => setRows((prev) => prev.map((r) => (r.id === id ? { ...r, delivered: true } : r))), 950))
    }, 2300)
    return () => {
      clearInterval(interval)
      timers.forEach(clearTimeout)
    }
  }, [])

  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      <div aria-hidden className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-tr from-primary/15 via-transparent to-accent/15 blur-3xl" />

      {/* Product surface */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-foreground/10">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border bg-secondary/40 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-primary text-[11px] font-bold text-primary-foreground">SL</span>
            <span className="text-[13px] font-semibold text-foreground">SMSLocal</span>
            <span className="text-[11px] text-muted-foreground">· Dashboard</span>
          </div>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-primary">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            Live
          </span>
        </div>

        <div className="space-y-3 p-4">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "Sent today", value: count.toLocaleString("en-IN") },
              { label: "Delivered", value: "98.4%" },
              { label: "Failed", value: "0.3%" },
            ].map((m) => (
              <div key={m.label} className="rounded-xl border border-border bg-background p-2.5">
                <div className="text-[9.5px] uppercase tracking-wide text-muted-foreground">{m.label}</div>
                <div className="mt-0.5 text-[15px] font-bold tabular-nums text-foreground">{m.value}</div>
              </div>
            ))}
          </div>

          {/* Channel chips */}
          <div className="flex flex-wrap gap-1.5">
            {CHANNELS.map((c, i) => (
              <span
                key={c}
                className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${i === 0 ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}
              >
                {c}
              </span>
            ))}
          </div>

          {/* Activity feed */}
          <div>
            <div className="mb-1.5 text-[10.5px] font-semibold uppercase tracking-wide text-muted-foreground">Live activity</div>
            <div className="space-y-1.5">
              {rows.map((r, i) => (
                <div
                  key={r.id}
                  style={i === 0 ? { animation: "message-in 0.4s ease both" } : undefined}
                  className="flex items-center gap-2.5 rounded-lg border border-border bg-background px-2.5 py-2"
                >
                  <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <r.icon className="h-3.5 w-3.5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-[11.5px] font-semibold text-foreground">
                      {r.ch} <span className="font-normal text-muted-foreground">· {r.city}</span>
                    </div>
                    <div className="truncate text-[10.5px] text-muted-foreground">{r.text}</div>
                  </div>
                  {r.delivered ? (
                    <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                      <CheckCheck className="h-3 w-3" /> Sent
                    </span>
                  ) : (
                    <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-semibold text-accent-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" style={{ animation: "dot-bounce 1s infinite" }} /> Sending
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Chart + AI */}
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-xl border border-border bg-background p-2.5">
              <div className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">7-day volume</div>
              <div className="mt-2 flex h-14 items-end gap-1">
                {BARS.map((h, i) => (
                  <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-primary/60 to-primary" style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>
            <div className="flex flex-col justify-between rounded-xl border border-border bg-background p-2.5">
              <div className="flex items-center gap-1.5 text-[10.5px] font-semibold text-primary">
                <Bot className="h-3.5 w-3.5" /> AI agent
              </div>
              <div className="mt-1 rounded-lg bg-primary px-2 py-1.5 text-[10.5px] leading-snug text-primary-foreground">
                ஆம், உங்கள் ஆர்டர் அனுப்பப்படுகிறது 🎉
              </div>
              <div className="mt-1 text-[9.5px] text-muted-foreground">Replied in Tamil · 0.8s</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating accents for depth */}
      <div aria-hidden className="animate-float-slow pointer-events-none absolute -right-4 top-16 z-20 hidden items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 shadow-xl shadow-foreground/10 backdrop-blur-sm xl:flex">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary"><Zap className="h-4 w-4" /></span>
        <span className="leading-tight"><span className="block text-[12.5px] font-semibold text-foreground">98% in &lt;1s</span><span className="block text-[10.5px] text-muted-foreground">direct routes</span></span>
      </div>
      <div aria-hidden className="animate-float-slower pointer-events-none absolute -left-4 bottom-16 z-20 hidden items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 shadow-xl shadow-foreground/10 backdrop-blur-sm xl:flex" style={{ animationDelay: "0.8s" }}>
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary"><ShieldCheck className="h-4 w-4" /></span>
        <span className="leading-tight"><span className="block text-[12.5px] font-semibold text-foreground">DLT-compliant</span><span className="block text-[10.5px] text-muted-foreground">TRAI-approved</span></span>
      </div>
    </div>
  )
}
