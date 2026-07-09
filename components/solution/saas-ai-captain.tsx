"use client"

import { useEffect, useRef, useState } from "react"
import {
  AlertTriangle,
  Bot,
  CheckCheck,
  MessageSquare,
  ScrollText,
  Sparkles,
  TrendingUp,
  Workflow,
} from "lucide-react"

const CAPS = [
  { Icon: MessageSquare, t: "Answer product questions", d: "Resolve how-to and account questions instantly from your knowledge base." },
  { Icon: AlertTriangle, t: "Detect churn intent", d: "Flag cancel, downgrade, and frustration signals the moment they appear." },
  { Icon: TrendingUp, t: "Identify expansion signals", d: "Spot rising usage and team growth that point to upsell-ready accounts." },
  { Icon: ScrollText, t: "Summarize conversations", d: "Turn long threads into a one-line recap with the next best action." },
  { Icon: Workflow, t: "Auto-route conversations", d: "Send each conversation to the right team based on context and risk." },
]

const ACTIONS = ["Route to Customer Success team", "Link open Linear bug ACM-1284", "Draft an empathetic reply with ETA"]

const ease = "cubic-bezier(0.16,1,0.3,1)"
const spring = "cubic-bezier(0.34,1.56,0.64,1)"

export function SaasAiCaptainCaps() {
  const ref = useRef<HTMLUListElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setShown(true)
      return
    }
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect() } },
      { threshold: 0.15 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <ul ref={ref} className="mt-8 space-y-1">
      {CAPS.map(({ Icon, t, d }, i) => (
        <li
          key={t}
          className="group flex items-start gap-4 border-b border-white/10 py-4 last:border-0"
          style={{
            opacity: shown ? 1 : 0,
            transform: shown ? "translateX(0)" : "translateX(-22px)",
            transition: `opacity 0.55s ease ${i * 100}ms, transform 0.55s ${ease} ${i * 100}ms`,
          }}
        >
          <span
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary ring-1 ring-primary/20 transition-colors group-hover:bg-primary group-hover:text-white"
            style={{
              transform: shown ? "scale(1)" : "scale(0)",
              transition: `transform 0.5s ${spring} ${120 + i * 100}ms`,
            }}
          >
            <Icon className="h-4 w-4" />
          </span>
          <div>
            <p className="text-[13.5px] font-semibold text-white">{t}</p>
            <p className="mt-0.5 text-[12.5px] leading-relaxed text-white/60">{d}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}

export function SaasAiCaptainMock() {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setShown(true)
      return
    }
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect() } },
      { threshold: 0.15 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const reveal = (delay: number, y = 12) => ({
    opacity: shown ? 1 : 0,
    transform: shown ? "translateY(0)" : `translateY(${y}px)`,
    transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ${ease} ${delay}ms`,
  })

  return (
    <div ref={ref} className="relative">
      {/* ambient glow */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-6 -z-10 rounded-[28px] opacity-50 blur-3xl"
        style={{ background: "radial-gradient(circle, color-mix(in oklch, var(--primary) 30%, transparent), transparent 70%)" }}
      />

      {/* header — boxless, divider only */}
      <div className="flex items-center gap-2.5 border-b border-white/10 pb-3.5" style={reveal(0, -8)}>
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[oklch(0.72_0.17_165)] text-primary-foreground">
          <Bot className="h-[18px] w-[18px]" />
        </span>
        <div>
          <p className="flex items-center gap-1.5 text-[13px] font-semibold text-white">
            AI Captain
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
          </p>
          <p className="text-[11px] text-white/55">Working this conversation</p>
        </div>
      </div>

      <div className="space-y-3 pt-4">
        {/* customer message bubble (kept — it's a chat bubble, not a card) */}
        <div
          className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white/[0.06] px-3 py-2.5 text-[12.5px] text-white/80"
          style={reveal(120)}
        >
          “Thinking about cancelling — Linear sync broke twice this week.”
        </div>

        {/* churn risk — boxless, left accent bar */}
        <div className="border-l-2 border-amber-400/60 pl-3" style={reveal(220)}>
          <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-amber-300">
            <AlertTriangle className="h-3 w-3" /> Churn risk · high
          </p>
          <p className="mt-1 text-[12px] text-white/80">Mentioned “cancel” 3 times this week. Sentiment trending negative.</p>
        </div>

        {/* suggested actions — boxless, left accent bar */}
        <div className="border-l-2 border-primary/60 pl-3" style={reveal(320)}>
          <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-primary">
            <Sparkles className="h-3 w-3" /> Suggested actions
          </p>
          <ul className="mt-1.5 space-y-1.5">
            {ACTIONS.map((a, i) => (
              <li
                key={a}
                className="flex items-center gap-2 text-[12px] text-white/85"
                style={reveal(420 + i * 90)}
              >
                <CheckCheck className="h-3.5 w-3.5 shrink-0 text-primary" /> {a}
              </li>
            ))}
          </ul>
        </div>

        {/* summary — boxless, divider only */}
        <div className="flex items-center gap-2 border-t border-white/10 pt-3" style={reveal(720)}>
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-primary/15 text-primary">
            <ScrollText className="h-3.5 w-3.5" />
          </span>
          <p className="text-[11.5px] text-white/60">Summary saved to Mike Chen&apos;s profile</p>
        </div>
      </div>
    </div>
  )
}
