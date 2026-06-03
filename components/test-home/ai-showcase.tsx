"use client"

import { useEffect, useRef, useState } from "react"
import {
  BarChart3,
  Bell,
  Bot,
  Inbox,
  LayoutDashboard,
  Lock,
  MessageSquare,
  Radio,
  Search,
  Send,
  Sparkles,
  Zap,
} from "lucide-react"

type Msg = { from: "cust" | "ai"; text: string }

const CHAT: Msg[] = [
  { from: "cust", text: "Do you ship to Mumbai?" },
  { from: "ai", text: "Yes — free delivery on orders over ₹500. ETA 2 days." },
  { from: "cust", text: "Perfect, ordering now!" },
]

const NAV = [
  { Icon: LayoutDashboard, label: "Overview", active: true },
  { Icon: Send, label: "Campaigns" },
  { Icon: MessageSquare, label: "WhatsApp" },
  { Icon: Radio, label: "RCS" },
  { Icon: Inbox, label: "Inbox", badge: 3 },
  { Icon: Bot, label: "AI Agent" },
  { Icon: BarChart3, label: "Analytics" },
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
      let t = 700
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
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[12.5px] font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5" /> One dashboard · every channel
          </span>
          <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Run all your messaging from{" "}
            <span className="bg-gradient-to-r from-primary to-emerald-500 bg-clip-text text-transparent">
              one place
            </span>
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
            Bulk SMS, WhatsApp and RCS in a single SMSLocal workspace — with a built-in AI
            agent that answers customers in real time.
          </p>
        </div>

        {/* ===== One unified SaaS dashboard ===== */}
        <div className="mx-auto mt-14 overflow-hidden rounded-3xl border border-border bg-card shadow-2xl shadow-primary/10">
          {/* Chrome bar */}
          <div className="flex items-center justify-between border-b border-border bg-secondary/40 px-4 py-2.5">
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-rose-400" />
              <span className="h-3 w-3 rounded-full bg-amber-400" />
              <span className="h-3 w-3 rounded-full bg-emerald-400" />
            </div>
            <div className="hidden items-center gap-1.5 rounded-full bg-card px-3 py-1 text-[12px] font-medium text-muted-foreground shadow-sm sm:flex">
              <Lock className="h-3 w-3 text-emerald-500" /> app.smslocal.in
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-600">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" /> Live
            </span>
          </div>

          {/* Workspace body */}
          <div className="flex flex-col lg:flex-row">
            {/* Sidebar */}
            <aside className="hidden w-[200px] shrink-0 flex-col border-r border-border bg-secondary/30 p-3 lg:flex">
              <div className="flex items-center px-2 py-1.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/smslocal-logo.svg" alt="SMSLocal" style={{ height: 22, width: "auto" }} className="block w-auto select-none" draggable={false} />
              </div>
              <nav className="mt-4 space-y-0.5">
                {NAV.map((n) => (
                  <span
                    key={n.label}
                    className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-medium ${
                      n.active ? "bg-primary/10 text-primary" : "text-muted-foreground"
                    }`}
                  >
                    <n.Icon className="h-4 w-4" />
                    {n.label}
                    {n.badge && (
                      <span className="ml-auto inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[9px] font-bold text-primary-foreground">
                        {n.badge}
                      </span>
                    )}
                  </span>
                ))}
              </nav>
              <div className="mt-auto rounded-xl border border-primary/20 bg-primary/5 p-3">
                <div className="text-[11px] font-semibold text-primary">₹2,100 free credit</div>
                <div className="mt-0.5 text-[10.5px] text-muted-foreground">No card required</div>
              </div>
            </aside>

            {/* Main panel */}
            <main className="min-w-0 flex-1 p-4 sm:p-5">
              {/* topbar */}
              <div className="flex items-center justify-between gap-3">
                <div className="leading-tight">
                  <div className="text-[15px] font-bold text-foreground">Overview</div>
                  <div className="text-[12px] text-muted-foreground">Welcome back · here's today</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="hidden items-center gap-1.5 rounded-full border border-border bg-secondary/40 px-3 py-1.5 text-[12px] text-muted-foreground sm:flex">
                    <Search className="h-3.5 w-3.5" /> Search
                  </span>
                  <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-secondary/40 text-muted-foreground">
                    <Bell className="h-4 w-4" />
                    <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-rose-500" />
                  </span>
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-[11px] font-bold text-white">
                    P
                  </span>
                </div>
              </div>

              {/* stat tiles */}
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <StatTile label="Messages sent" to={2418} delta="+18%" />
                <StatTile label="AI replies" to={1204} delta="+32%" />
                <StatTile label="Delivery rate" staticVal="98.1%" delta="live" />
                <StatTile label="Avg reply" staticVal="0.8s" delta="fast" />
              </div>

              {/* widgets */}
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {/* campaign */}
                <div className="rounded-xl border border-border bg-secondary/20 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-emerald-500 text-primary-foreground">
                        <Send className="h-4 w-4" />
                      </span>
                      <div className="leading-tight">
                        <div className="text-[13px] font-semibold text-foreground">Diwali Sale</div>
                        <div className="text-[11px] text-muted-foreground">Bulk SMS · DLT</div>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10.5px] font-semibold text-primary">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" /> Sending
                    </span>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-border">
                    <div className="animate-fill-loop h-full rounded-full bg-gradient-to-r from-primary to-emerald-400" />
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground">
                    <span>2,371 / 2,418 delivered</span>
                    <span className="font-semibold text-primary">98.1%</span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {[
                      { Icon: MessageSquare, label: "WhatsApp", c: "text-emerald-600" },
                      { Icon: Radio, label: "RCS", c: "text-indigo-600" },
                      { Icon: MessageSquare, label: "SMS", c: "text-teal-600" },
                    ].map((b) => (
                      <span key={b.label} className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-2 py-0.5 text-[10.5px] font-medium text-foreground">
                        <b.Icon className={`h-3 w-3 ${b.c}`} /> {b.label}
                      </span>
                    ))}
                  </div>
                </div>

                {/* live activity */}
                <div className="rounded-xl border border-border bg-secondary/20 p-4">
                  <div className="flex items-center gap-1.5 text-[12.5px] font-semibold text-foreground">
                    <Zap className="h-4 w-4 text-primary" /> Live activity
                  </div>
                  <ul className="mt-3 space-y-2.5">
                    {[
                      { dot: "bg-emerald-500", text: "WhatsApp delivered to +91 98•••", t: "now" },
                      { dot: "bg-indigo-500", text: "RCS · 30 messages sent", t: "2s" },
                      { dot: "bg-teal-500", text: "SMS delivered · Mumbai", t: "4s" },
                      { dot: "bg-primary", text: "AI replied to Mia in 0.8s", t: "6s" },
                    ].map((r, i) => (
                      <li key={i} className="flex items-center gap-2 text-[11.5px]">
                        <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${r.dot}`} />
                        <span className="text-foreground/80">{r.text}</span>
                        <span className="ml-auto text-muted-foreground">{r.t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </main>

            {/* AI assistant dock (right) */}
            <aside className="relative w-full shrink-0 overflow-hidden border-t border-ink-border bg-gradient-to-b from-[#13243b] to-[#0b1626] lg:w-[280px] lg:border-l lg:border-t-0">
              <div aria-hidden className="pointer-events-none absolute -top-16 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-primary/25 blur-3xl" />
              <div className="relative flex items-center justify-between border-b border-white/10 px-4 py-3">
                <span className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-white">
                  <Bot className="h-4 w-4 text-primary" /> SMSLocal AI
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-300">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" /> online
                </span>
              </div>

              <div className="relative flex flex-col items-center px-4 pt-5">
                <Robot />
                <div className="mt-3 text-center text-[11px] text-white/50">
                  Move your cursor — I'm watching 👀
                </div>
              </div>

              {/* fixed-height chat */}
              <div className="relative mt-3 flex h-[150px] flex-col justify-end gap-2.5 overflow-hidden px-4">
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

              {/* input bar */}
              <div className="relative mt-3 flex items-center gap-2 border-t border-white/10 px-4 py-3">
                <div className="flex-1 rounded-full bg-white/10 px-3.5 py-2 text-[12px] text-white/40">Ask anything…</div>
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md shadow-primary/40">
                  <Send className="h-3.5 w-3.5" />
                </span>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  )
}

function StatTile({ label, to, staticVal, delta }: { label: string; to?: number; staticVal?: string; delta: string }) {
  const c = useCountUp(to ?? 0)
  return (
    <div className="rounded-xl border border-border bg-secondary/20 p-3">
      <div className="text-[11px] font-medium text-muted-foreground">{label}</div>
      <div className="mt-1 flex items-end justify-between">
        <span ref={c.ref} className="text-xl font-extrabold tracking-tight text-foreground">
          {staticVal ?? c.val.toLocaleString("en-IN")}
        </span>
        <span className="text-[10.5px] font-semibold text-primary">{delta}</span>
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
        className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[9px] font-bold text-white ${
          isAi ? "bg-primary" : "bg-gradient-to-br from-amber-400 to-orange-500"
        }`}
      >
        {isAi ? "AI" : "J"}
      </span>
      <div
        className={`max-w-[80%] rounded-2xl px-3 py-2 text-[12px] leading-snug ${
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

/* Robot with pupils that follow the mouse */
function Robot() {
  const ref = useRef<HTMLDivElement>(null)
  const [eye, setEye] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    let raf = 0
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const el = ref.current
        if (!el) return
        const r = el.getBoundingClientRect()
        const cx = r.left + r.width / 2
        const cy = r.top + r.height / 2
        const dx = e.clientX - cx
        const dy = e.clientY - cy
        const dist = Math.hypot(dx, dy) || 1
        const mag = Math.min(4, dist / 28)
        setEye({ x: (dx / dist) * mag, y: (dy / dist) * mag })
      })
    }
    window.addEventListener("mousemove", onMove)
    return () => {
      window.removeEventListener("mousemove", onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div ref={ref} className="relative flex flex-col items-center">
      <div aria-hidden className="absolute -inset-8 -z-10 rounded-full bg-primary/25 blur-2xl" />

      <div className="animate-robot-bob relative flex flex-col items-center">
        {/* HEAD */}
        <div className="relative z-10">
          {/* side ears */}
          <span className="absolute -left-2.5 top-1/2 h-9 w-4 -translate-y-1/2 rounded-2xl bg-gradient-to-b from-slate-700 to-slate-900 shadow-md ring-1 ring-black/20" />
          <span className="absolute -right-2.5 top-1/2 h-9 w-4 -translate-y-1/2 rounded-2xl bg-gradient-to-b from-slate-700 to-slate-900 shadow-md ring-1 ring-black/20" />

          {/* head shell */}
          <div className="relative h-[94px] w-[118px] rounded-[1.9rem] bg-gradient-to-b from-white to-slate-200 shadow-xl ring-1 ring-white/70">
            {/* glossy highlight */}
            <span className="absolute inset-x-4 top-2 h-3.5 rounded-full bg-white/80 blur-[3px]" />

            {/* face screen */}
            <div className="absolute inset-x-2.5 bottom-3 top-3 overflow-hidden rounded-[1.35rem] bg-gradient-to-b from-[#0d1a2c] to-[#05080f] shadow-inner ring-1 ring-black/50">
              {/* screen reflection */}
              <span aria-hidden className="absolute inset-0 bg-gradient-to-br from-white/12 via-transparent to-transparent" />

              {/* chevron eyes — track the cursor + blink */}
              <div
                className="absolute inset-0 flex items-center justify-center transition-transform duration-100"
                style={{ transform: `translate(${eye.x}px, ${eye.y}px)` }}
              >
                <div className="animate-robot-blink flex items-center gap-2.5">
                  {[0, 1].map((i) => (
                    <svg
                      key={i}
                      width="26"
                      height="18"
                      viewBox="0 0 26 18"
                      fill="none"
                      className="drop-shadow-[0_0_7px_var(--primary)]"
                    >
                      <path
                        d="M3 13 L13 4 L23 13"
                        stroke="var(--primary)"
                        strokeWidth="4.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ))}
                </div>
              </div>

              {/* scan line */}
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-px bg-primary/50"
                style={{ animation: "hero-progress 2.8s ease-in-out infinite", transformOrigin: "left" }}
              />
            </div>
          </div>
        </div>

        {/* BODY with slim hanging arms */}
        <div className="relative -mt-2 h-12 w-[76px] rounded-b-[2rem] rounded-t-lg bg-gradient-to-b from-slate-100 to-slate-300 shadow-md ring-1 ring-white/50">
          {/* chest light */}
          <span className="absolute left-1/2 top-3 h-2 w-2 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_8px_var(--primary)]" />
          {/* left arm */}
          <span className="absolute -left-[11px] -top-1 h-11 w-3 rotate-[7deg] rounded-full bg-gradient-to-b from-slate-200 to-slate-300 shadow-sm ring-1 ring-white/50" />
          {/* right arm */}
          <span className="absolute -right-[11px] -top-1 h-11 w-3 -rotate-[7deg] rounded-full bg-gradient-to-b from-slate-200 to-slate-300 shadow-sm ring-1 ring-white/50" />
        </div>
      </div>
    </div>
  )
}
