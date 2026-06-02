"use client"

import { useEffect, useState } from "react"
import {
  Bot,
  Check,
  CheckCheck,
  MessageSquare,
  Radio,
  Send,
  Sparkles,
} from "lucide-react"

type Msg = { from: "cust" | "ai"; text: string }

const CHAT: Msg[] = [
  { from: "cust", text: "Hey, do you ship to Mumbai?" },
  { from: "ai", text: "Yes — free delivery on orders over ₹500. ETA 2 days." },
  { from: "cust", text: "Perfect, ordering now!" },
]

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
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[12.5px] font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5" /> One platform, every channel
          </span>
          <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Bulk SMS, WhatsApp &amp; RCS — answered by AI
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
            Broadcast across every channel, and let your AI agent handle the replies in real time.
          </p>
        </div>

        <div className="relative mt-14 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3">
          {/* dotted connectors (lg only) */}
          <div aria-hidden className="pointer-events-none absolute left-1/3 top-1/2 hidden h-px w-12 -translate-x-1/2 border-t-2 border-dashed border-border lg:block" />
          <div aria-hidden className="pointer-events-none absolute left-2/3 top-1/2 hidden h-px w-12 -translate-x-1/2 border-t-2 border-dashed border-border lg:block" />

          <BulkSmsCard />
          <AiAgentCard count={count} typing={typing} />
          <WhatsAppCard />
        </div>
      </div>
    </section>
  )
}

/* ---------- Left: Bulk SMS ---------- */
function BulkSmsCard() {
  return (
    <div className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
          <Send className="h-5 w-5" />
        </span>
        <div className="leading-tight">
          <div className="text-[15px] font-semibold text-foreground">Bulk SMS</div>
          <div className="text-[12.5px] text-muted-foreground">DLT-compliant campaigns</div>
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-border bg-secondary/40 p-4">
        <div className="flex items-center justify-between text-[12.5px]">
          <span className="font-medium text-foreground">Diwali Sale · sent</span>
          <span className="font-semibold text-primary">98.1%</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-border">
          <div className="h-full rounded-full bg-gradient-to-r from-primary to-emerald-400" style={{ width: "98%" }} />
        </div>
        <div className="mt-2 text-[11.5px] text-muted-foreground">2,371 of 2,418 delivered · &lt;1s</div>
      </div>

      <ul className="mt-5 space-y-2 text-[13px] text-foreground/80">
        {["One-click DLT templates", "Priority routing + failover", "Schedule & throttle sends"].map((f) => (
          <li key={f} className="inline-flex items-center gap-2">
            <Check className="h-4 w-4 text-primary" /> {f}
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ---------- Center: AI agent with robot + looping chat ---------- */
function AiAgentCard({ count, typing }: { count: number; typing: boolean }) {
  return (
    <div className="relative flex flex-col items-center rounded-2xl border border-border bg-gradient-to-b from-secondary/30 to-card p-6 shadow-sm">
      <Robot />
      <div className="mt-5 w-full space-y-2.5">
        {CHAT.slice(0, count).map((m, i) => (
          <ChatRow key={i} msg={m} />
        ))}
        {typing && (
          <div className="ml-auto flex items-center gap-2">
            <div className="flex w-fit items-center gap-1 rounded-2xl rounded-br-sm bg-primary/10 px-3 py-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary/60" style={{ animation: "dot-bounce 1.2s infinite" }} />
              <span className="h-1.5 w-1.5 rounded-full bg-primary/60" style={{ animation: "dot-bounce 1.2s infinite 0.15s" }} />
              <span className="h-1.5 w-1.5 rounded-full bg-primary/60" style={{ animation: "dot-bounce 1.2s infinite 0.3s" }} />
            </div>
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">AI</span>
          </div>
        )}
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
        className={`max-w-[78%] rounded-2xl px-3 py-2 text-[12.5px] leading-snug shadow-sm ${
          isAi
            ? "rounded-br-sm bg-primary text-primary-foreground"
            : "rounded-bl-sm bg-card text-foreground ring-1 ring-border"
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
      <div aria-hidden className="absolute -inset-5 -z-10 rounded-full bg-primary/15 blur-2xl" />
      {/* head */}
      <div className="relative h-24 w-28 rounded-[1.6rem] bg-gradient-to-b from-white to-slate-200 shadow-lg ring-1 ring-slate-300">
        {/* antenna */}
        <span className="absolute -top-3 left-1/2 h-3 w-1 -translate-x-1/2 rounded bg-slate-300" />
        <span className="absolute -top-4 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-primary" />
        {/* ears */}
        <span className="absolute -left-2 top-8 h-7 w-2.5 rounded-full bg-slate-300" />
        <span className="absolute -right-2 top-8 h-7 w-2.5 rounded-full bg-slate-300" />
        {/* face screen */}
        <div className="absolute inset-x-3 top-4 flex h-14 items-center justify-center gap-3 rounded-2xl bg-[#0f1b2e]">
          <span className="h-3.5 w-3.5 rounded-full bg-primary" style={{ animation: "dot-bounce 2.4s infinite" }} />
          <span className="h-3.5 w-3.5 rounded-full bg-primary" style={{ animation: "dot-bounce 2.4s infinite 0.2s" }} />
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
    <div className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-sm">
          <MessageSquare className="h-5 w-5" />
        </span>
        <div className="leading-tight">
          <div className="text-[15px] font-semibold text-foreground">WhatsApp &amp; RCS</div>
          <div className="text-[12.5px] text-muted-foreground">Two-way, one inbox</div>
        </div>
      </div>

      {/* mini WA chat */}
      <div className="mt-5 overflow-hidden rounded-xl border border-border">
        <div className="flex items-center gap-2 bg-[#075e54] px-3 py-2 text-white">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-rose-400 text-[10px] font-bold">M</span>
          <div className="leading-tight">
            <div className="text-[12px] font-semibold">Mia · Customer</div>
            <div className="text-[9.5px] text-emerald-100">online</div>
          </div>
        </div>
        <div className="space-y-2 bg-[#e5ddd5] px-3 py-3">
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
  )
}
