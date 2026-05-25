"use client"

import { useEffect, useState } from "react"
import {
  Activity,
  Bot,
  CheckCheck,
  KeyRound,
  MessageCircle,
  MessageSquareText,
  Radio,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react"

type Event = {
  ch: string
  icon: React.ComponentType<{ className?: string }>
  city: string
  text: string
}

const POOL: Event[] = [
  { ch: "WhatsApp", icon: Bot, city: "Chennai", text: "AI replied in Tamil" },
  { ch: "SMS", icon: MessageSquareText, city: "Mumbai", text: "Diwali campaign delivered" },
  { ch: "OTP", icon: KeyRound, city: "Hyderabad", text: "Login code · 0.3s" },
  { ch: "RCS", icon: Radio, city: "Pune", text: "Branded message read" },
  { ch: "WhatsApp", icon: MessageCircle, city: "Delhi", text: "Order update sent" },
  { ch: "SMS", icon: MessageSquareText, city: "Kolkata", text: "Cart reminder delivered" },
  { ch: "OTP", icon: KeyRound, city: "Bengaluru", text: "Verification · 0.2s" },
  { ch: "WhatsApp", icon: Bot, city: "Jaipur", text: "AI resolved ticket" },
]

type Row = Event & { id: number; delivered: boolean }

export function HeroLive() {
  const [rows, setRows] = useState<Row[]>(() =>
    POOL.slice(0, 4).map((p, i) => ({ ...p, id: i, delivered: true })),
  )
  const [count, setCount] = useState(42118)

  useEffect(() => {
    let idx = 4
    let nextId = 100
    const timers: ReturnType<typeof setTimeout>[] = []

    const interval = setInterval(() => {
      const p = POOL[idx % POOL.length]
      idx += 1
      const id = nextId++
      setRows((prev) => [{ ...p, id, delivered: false }, ...prev].slice(0, 5))
      setCount((c) => c + Math.floor(Math.random() * 6) + 2)
      const t = setTimeout(() => {
        setRows((prev) => prev.map((r) => (r.id === id ? { ...r, delivered: true } : r)))
      }, 950)
      timers.push(t)
    }, 2200)

    return () => {
      clearInterval(interval)
      timers.forEach(clearTimeout)
    }
  }, [])

  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-tr from-primary/15 via-transparent to-accent/15 blur-3xl"
      />

      {/* Handwritten accent */}
      <div aria-hidden className="absolute -top-7 right-6 z-20 hidden rotate-3 lg:block">
        <span
          className="inline-flex items-center gap-1 text-[15px] font-medium italic text-primary"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          live, right now <Sparkles className="h-4 w-4" />
        </span>
      </div>

      {/* Live activity card */}
      <div className="relative rounded-2xl border border-border bg-card p-4 shadow-2xl shadow-foreground/10 sm:p-5">
        {/* Header */}
        <div className="flex items-center gap-2.5">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Activity className="h-5 w-5" />
          </span>
          <div className="flex-1">
            <div className="flex items-center gap-1.5 text-[13.5px] font-semibold text-foreground">
              Live activity
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
              </span>
            </div>
            <div className="text-[11px] text-muted-foreground">across SMS · WhatsApp · RCS · OTP</div>
          </div>
          <div className="text-right">
            <div className="text-[15px] font-bold tabular-nums text-foreground">
              {count.toLocaleString("en-IN")}
            </div>
            <div className="text-[10px] uppercase tracking-wide text-muted-foreground">sent today</div>
          </div>
        </div>

        {/* Stream */}
        <div className="mt-4 space-y-2">
          {rows.map((r, i) => (
            <div
              key={r.id}
              style={i === 0 ? { animation: "message-in 0.45s cubic-bezier(0.2,0.8,0.2,1) both" } : undefined}
              className="flex items-center gap-3 rounded-xl border border-border bg-background px-3 py-2.5"
            >
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <r.icon className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 text-[12.5px] font-semibold text-foreground">
                  {r.ch}
                  <span className="text-[11px] font-normal text-muted-foreground">· {r.city}</span>
                </div>
                <div className="truncate text-[11.5px] text-muted-foreground">{r.text}</div>
              </div>
              {r.delivered ? (
                <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10.5px] font-semibold text-primary">
                  <CheckCheck className="h-3 w-3" /> Delivered
                </span>
              ) : (
                <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-accent/15 px-2 py-0.5 text-[10.5px] font-semibold text-accent-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" style={{ animation: "dot-bounce 1s infinite" }} />
                  Sending
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Footer rate bar */}
        <div className="mt-4 flex items-center gap-3">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
            <div className="h-full w-[98%] rounded-full bg-gradient-to-r from-primary to-accent" />
          </div>
          <span className="text-[11px] font-semibold text-foreground">98.4% delivered</span>
        </div>
      </div>

      {/* Floating feature cards */}
      <FloatingCard
        className="animate-float-slow -left-14 top-16"
        icon={Zap}
        title="98% in <1s"
        sub="direct operator routes"
      />
      <FloatingCard
        className="animate-float-slower -right-12 top-36"
        icon={ShieldCheck}
        title="DLT-compliant"
        sub="TRAI-approved"
        delay="0.7s"
      />
      <FloatingCard
        className="animate-float-slower -left-10 bottom-10"
        icon={Bot}
        title="AI agents"
        sub="8 Indian languages"
        delay="1.2s"
      />
    </div>
  )
}

function FloatingCard({
  className,
  icon: Icon,
  title,
  sub,
  delay,
}: {
  className: string
  icon: React.ComponentType<{ className?: string }>
  title: string
  sub?: string
  delay?: string
}) {
  return (
    <div
      aria-hidden
      style={delay ? { animationDelay: delay } : undefined}
      className={`pointer-events-none absolute z-20 hidden items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 shadow-xl shadow-foreground/10 backdrop-blur-sm xl:flex ${className}`}
    >
      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="h-4 w-4" />
      </span>
      <span className="leading-tight">
        <span className="block text-[12.5px] font-semibold text-foreground">{title}</span>
        {sub ? <span className="block text-[10.5px] text-muted-foreground">{sub}</span> : null}
      </span>
    </div>
  )
}
