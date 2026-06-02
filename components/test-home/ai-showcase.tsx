"use client"

import { useEffect, useRef, useState } from "react"
import {
  Bot,
  Check,
  Globe,
  Lock,
  MessageSquare,
  Radio,
  Send,
  Sparkles,
  Zap,
} from "lucide-react"

type Msg = { from: "cust" | "ai"; text: string }

const CHAT: Msg[] = [
  { from: "cust", text: "Hey, do you ship to Mumbai?" },
  { from: "ai", text: "Yes — free delivery on orders over ₹500. ETA 2 days." },
  { from: "cust", text: "Perfect, ordering now!" },
]

/** Counts up to `to` once it scrolls into view. */
function useCountUp(to: number, duration = 1400) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0
    let started = false
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || started) return
        started = true
        const t0 = performance.now()
        const tick = (now: number) => {
          const p = Math.min(1, (now - t0) / duration)
          const eased = 1 - Math.pow(1 - p, 3)
          setVal(Math.round(to * eased))
          if (p < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [to, duration])
  return { val, ref }
}

export function AiShowcase() {
  const [count, setCount] = useState(0)
  const [typing, setTyping] = useState(false)

  useEffect(() => {
    let cancelled = false
    const timers: ReturnType<typeof setTimeout>[] = []
    const at = (ms: number, fn: () => void) => timers.push(setTimeout(() => !cancelled && fn(), ms))
    function run() {
      setCount(0)
      setTyping(false)
      let t = 600
      CHAT.forEach((m, i) => {
        if (m.from === "ai") {
          at(t, () => setTyping(true))
          t += 1100
          at(t, () => {
            setTyping(false)
            setCount(i + 1)
          })
          t += 900
        } else {
          at(t, () => setCount(i + 1))
          t += 1200
        }
      })
      at(t, () => setTyping(true))
      at(t + 1600, run)
    }
    run()
    return () => {
      cancelled = true
      timers.forEach(clearTimeout)
    }
  }, [])

  return (
    <section className="relative overflow-hidden bg-background py-20 lg:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 65% 50% at 50% 0%, color-mix(in oklch, var(--primary) 9%, transparent), transparent 60%)" }}
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[12.5px] font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5" /> One AI brain · every channel
          </span>
          <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Broadcast on every channel.{" "}
            <span className="bg-gradient-to-r from-primary to-emerald-500 bg-clip-text text-transparent">
              Answered by AI.
            </span>
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
            Bulk SMS, WhatsApp and RCS flow into one AI agent that replies in real time —
            in 8 Indian languages, around the clock.
          </p>
        </div>

        {/* Unified app-window frame */}
        <div className="relative mx-auto mt-14 max-w-6xl overflow-hidden rounded-3xl border border-border bg-gradient-to-b from-secondary/50 to-card p-2 shadow-2xl shadow-primary/5">
          {/* dotted grid backdrop */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.55]"
            style={{
              backgroundImage: "radial-gradient(color-mix(in oklch, var(--foreground) 9%, transparent) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
              WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 40%, #000 30%, transparent 80%)",
              maskImage: "radial-gradient(ellipse 80% 70% at 50% 40%, #000 30%, transparent 80%)",
            }}
          />

          {/* Chrome bar */}
          <div className="relative flex items-center justify-between rounded-2xl bg-card px-4 py-2.5 shadow-sm">
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-rose-400" />
              <span className="h-3 w-3 rounded-full bg-amber-400" />
              <span className="h-3 w-3 rounded-full bg-emerald-400" />
            </div>
            <div className="hidden items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-[12px] font-medium text-muted-foreground sm:flex">
              <Lock className="h-3 w-3 text-emerald-500" /> app.smslocal.in
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-600">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" /> Live
            </span>
          </div>

          {/* Panels — asymmetric, center elevated */}
          <div className="relative grid grid-cols-1 items-center gap-4 p-3 sm:p-5 lg:grid-cols-[1fr_1.14fr_1fr] lg:gap-0">
            {/* connectors feed inward to the AI hub (lg only) */}
            <Connector className="left-[33%]" />
            <Connector className="right-[33%]" flip />

            <div className="lg:px-3">
              <BulkSmsCard />
            </div>
            <div className="z-10 lg:-my-6 lg:px-2">
              <AiAgentCard count={count} typing={typing} />
            </div>
            <div className="lg:px-3">
              <WhatsAppCard />
            </div>
          </div>

          {/* Footer strip */}
          <div className="relative flex flex-col items-center justify-between gap-3 rounded-2xl bg-card px-5 py-3.5 shadow-sm sm:flex-row">
            <div className="flex items-center gap-2 text-[13px] font-medium text-muted-foreground">
              <Zap className="h-4 w-4 text-primary" />
              98.1% delivered · AI replies in 0.8s · 8 Indian languages
            </div>
            <a
              href="/signup"
              className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-[13px] font-semibold text-primary-foreground shadow-sm transition hover:opacity-90"
            >
              Try it free <Send className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

/* Animated connector dot flowing toward the AI hub */
function Connector({ className, flip = false }: { className?: string; flip?: boolean }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute top-1/2 hidden h-px w-20 lg:block ${flip ? "-scale-x-100" : ""} ${className ?? ""}`}
    >
      <div className="relative h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-primary/60">
        <span
          className="absolute -top-[3px] h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_var(--primary)]"
          style={{ animation: "flow-x 2.6s ease-in-out infinite" }}
        />
      </div>
    </div>
  )
}

/* ---------- Left: Bulk SMS ---------- */
function BulkSmsCard() {
  const delivered = useCountUp(2371)
  const bars = [40, 58, 47, 70, 62, 85, 78, 96]
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="h-1 w-full bg-gradient-to-r from-primary to-emerald-400" />
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-emerald-500 text-primary-foreground shadow-md shadow-primary/25">
            <Send className="h-5 w-5" />
          </span>
          <div className="leading-tight">
            <div className="text-[15px] font-semibold text-foreground">Bulk SMS</div>
            <div className="text-[12.5px] text-muted-foreground">DLT-compliant campaigns</div>
          </div>
        </div>

        <div className="mt-5 rounded-xl border border-border bg-gradient-to-b from-secondary/50 to-secondary/20 p-4">
          <div className="flex items-end justify-between">
            <div>
              <div className="text-[11.5px] font-medium text-muted-foreground">Diwali Sale · delivered</div>
              <div className="mt-0.5 text-2xl font-extrabold tracking-tight text-foreground">
                <span ref={delivered.ref}>{delivered.val.toLocaleString("en-IN")}</span>
              </div>
            </div>
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[12px] font-bold text-primary">98.1%</span>
          </div>
          {/* mini bar chart */}
          <div className="mt-3 flex h-10 items-end gap-1.5">
            {bars.map((h, i) => (
              <span
                key={i}
                className="flex-1 rounded-sm bg-gradient-to-t from-primary/40 to-primary"
                style={{ height: `${h}%`, animation: `message-in 0.5s ease both`, animationDelay: `${i * 70}ms` }}
              />
            ))}
          </div>
          <div className="mt-2 text-[11px] text-muted-foreground">of 2,418 sent · &lt;1s avg</div>
        </div>

        <ul className="mt-5 space-y-2 text-[13px] text-foreground/80">
          {["One-click DLT templates", "Priority routing + failover", "Schedule & throttle sends"].map((f) => (
            <li key={f} className="inline-flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" /> {f}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/* ---------- Center: elevated dark AI hub ---------- */
function AiAgentCard({ count, typing }: { count: number; typing: boolean }) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-[1.4rem] border border-ink-border bg-gradient-to-b from-[#13243b] to-[#0c1a2d] shadow-2xl shadow-primary/20 ring-1 ring-primary/20">
      {/* glow */}
      <div aria-hidden className="pointer-events-none absolute -top-16 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-primary/25 blur-3xl" />
      <div className="relative flex items-center justify-between border-b border-white/10 px-4 py-2.5">
        <span className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-white">
          <Bot className="h-4 w-4 text-primary" /> SMSLocal AI
        </span>
        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-300">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" /> online
        </span>
      </div>

      <div className="relative flex flex-1 flex-col items-center px-5 pb-5 pt-6">
        <Robot />

        {/* capability chips */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5">
          {[
            { Icon: Globe, label: "8 languages" },
            { Icon: Zap, label: "0.8s reply" },
          ].map((c) => (
            <span
              key={c.label}
              className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-0.5 text-[10.5px] font-medium text-white/80"
            >
              <c.Icon className="h-3 w-3 text-primary" /> {c.label}
            </span>
          ))}
        </div>

        <div className="mt-4 w-full space-y-2.5">
          {CHAT.slice(0, count).map((m, i) => (
            <ChatRow key={i} msg={m} />
          ))}
          {typing && (
            <div className="flex flex-row-reverse items-end gap-2">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                AI
              </span>
              <div className="flex w-fit items-center gap-1 rounded-2xl rounded-br-sm bg-white/10 px-3 py-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" style={{ animation: "dot-bounce 1.2s infinite" }} />
                <span className="h-1.5 w-1.5 rounded-full bg-primary" style={{ animation: "dot-bounce 1.2s infinite 0.15s" }} />
                <span className="h-1.5 w-1.5 rounded-full bg-primary" style={{ animation: "dot-bounce 1.2s infinite 0.3s" }} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function ChatRow({ msg }: { msg: Msg }) {
  const isAi = msg.from === "ai"
  return (
    <div
      style={{ animation: "message-in 0.4s ease both" }}
      className={`flex items-end gap-2 ${isAi ? "flex-row-reverse" : ""}`}
    >
      <span
        className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white ${
          isAi ? "bg-primary" : "bg-gradient-to-br from-amber-400 to-orange-500"
        }`}
      >
        {isAi ? "AI" : "J"}
      </span>
      <div
        className={`max-w-[78%] rounded-2xl px-3 py-2 text-[12.5px] leading-snug ${
          isAi
            ? "rounded-br-sm bg-primary text-primary-foreground shadow-lg shadow-primary/30"
            : "rounded-bl-sm bg-white/10 text-white ring-1 ring-white/15"
        }`}
      >
        {msg.text}
      </div>
    </div>
  )
}

function Robot() {
  return (
    <div className="relative" style={{ animation: "float-slow 5s ease-in-out infinite" }}>
      <div aria-hidden className="absolute -inset-8 -z-10 rounded-full bg-primary/20 blur-2xl" />
      {/* antenna */}
      <span className="absolute -top-4 left-1/2 h-4 w-1 -translate-x-1/2 rounded bg-slate-400" />
      <span className="absolute -top-[22px] left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_10px_var(--primary)]" />
      {/* head */}
      <div className="relative h-24 w-28 rounded-[1.6rem] bg-gradient-to-b from-white to-slate-200 shadow-xl ring-1 ring-white/40">
        <span className="absolute -left-2.5 top-8 h-7 w-2.5 rounded-full bg-slate-300" />
        <span className="absolute -right-2.5 top-8 h-7 w-2.5 rounded-full bg-slate-300" />
        {/* face screen */}
        <div className="absolute inset-x-3 top-4 flex h-14 items-center justify-center gap-3 overflow-hidden rounded-2xl bg-[#0a1422] ring-1 ring-primary/30">
          <span className="h-3.5 w-3.5 rounded-full bg-primary shadow-[0_0_8px_var(--primary)]" style={{ animation: "dot-bounce 2.4s infinite" }} />
          <span className="h-3.5 w-3.5 rounded-full bg-primary shadow-[0_0_8px_var(--primary)]" style={{ animation: "dot-bounce 2.4s infinite 0.2s" }} />
          <span
            aria-hidden
            className="absolute inset-x-0 top-0 h-px bg-primary/60"
            style={{ animation: "hero-progress 2.6s ease-in-out infinite", transformOrigin: "left" }}
          />
        </div>
      </div>
    </div>
  )
}

/* ---------- Right: WhatsApp & RCS ---------- */
function WhatsAppCard() {
  const connects = [
    { label: "WhatsApp", Icon: MessageSquare, color: "text-emerald-600" },
    { label: "RCS", Icon: Radio, color: "text-indigo-600" },
    { label: "SMS", Icon: MessageSquare, color: "text-teal-600" },
  ]
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="h-1 w-full bg-gradient-to-r from-emerald-500 to-teal-400" />
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-md shadow-emerald-500/25">
            <MessageSquare className="h-5 w-5" />
          </span>
          <div className="leading-tight">
            <div className="text-[15px] font-semibold text-foreground">WhatsApp &amp; RCS</div>
            <div className="text-[12.5px] text-muted-foreground">Two-way, one inbox</div>
          </div>
        </div>

        <div className="mt-5 overflow-hidden rounded-xl border border-border shadow-sm">
          <div className="flex items-center gap-2 bg-[#075e54] px-3 py-2 text-white">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-rose-400 text-[10px] font-bold">M</span>
            <div className="leading-tight">
              <div className="text-[12px] font-semibold">Mia · Customer</div>
              <div className="text-[9.5px] text-emerald-100">online</div>
            </div>
            <MessageSquare className="ml-auto h-3.5 w-3.5 text-emerald-200" />
          </div>
          <div
            className="space-y-2 px-3 py-3"
            style={{ background: "#e5ddd5", backgroundImage: "radial-gradient(rgba(0,0,0,0.04) 1px, transparent 1px)", backgroundSize: "14px 14px" }}
          >
            <div className="mr-auto w-fit max-w-[85%] rounded-2xl rounded-bl-sm bg-white px-3 py-1.5 text-[12px] text-slate-800 shadow-sm">
              Order #4421 update?
            </div>
            <div className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-sm bg-[#dcf8c6] px-3 py-1.5 text-[12px] text-slate-800 shadow-sm">
              Out for delivery 📦
              <span className="ml-1 text-[9px] text-emerald-700/70">9:41 ✓✓</span>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Connects with</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {connects.map((c) => (
              <span key={c.label} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/40 px-2.5 py-1 text-[12px] font-medium text-foreground">
                <c.Icon className={`h-3.5 w-3.5 ${c.color}`} /> {c.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
