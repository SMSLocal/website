"use client"

import { useEffect, useRef, useState } from "react"
import { Filter, MessageCircle, Send, Timer, Workflow, Zap, type LucideIcon } from "lucide-react"

const NODES = [
  { kind: "Trigger", title: "New message", Icon: MessageCircle, tint: "text-emerald-300 bg-emerald-400/15 ring-emerald-400/30" },
  { kind: "Condition", title: "Contains keyword", Icon: Filter, tint: "text-amber-300 bg-amber-400/15 ring-amber-400/30" },
  { kind: "Action", title: "Send reply", Icon: Send, tint: "text-primary bg-primary/15 ring-primary/35" },
]

const STATS: { Icon: LucideIcon; label: string; value: string; sub?: string; accent?: boolean }[] = [
  { Icon: Workflow, label: "Flow status", value: "Running", accent: true },
  { Icon: Zap, label: "Executions", value: "2,341", sub: "this week" },
  { Icon: Timer, label: "Average runtime", value: "0.4s", sub: "per execution" },
]

const ease = "cubic-bezier(0.16,1,0.3,1)"
const spring = "cubic-bezier(0.34,1.56,0.64,1)"

export function AutomationWorkflow() {
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
      { threshold: 0.2 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className="mt-12 grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
      {/* ── Left: flow nodes (boxless) ────────────────────────────── */}
      <div className="relative flex flex-col">
        {NODES.map(({ kind, title, Icon, tint }, i) => (
          <div key={kind}>
            <div
              className="flex items-center gap-3.5"
              style={{
                opacity: shown ? 1 : 0,
                transform: shown ? "translateX(0)" : "translateX(-20px)",
                transition: `opacity 0.55s ease ${i * 220}ms, transform 0.55s ${ease} ${i * 220}ms`,
              }}
            >
              <span
                className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ring-1 ${tint}`}
                style={{
                  transform: shown ? "scale(1)" : "scale(0)",
                  transition: `transform 0.5s ${spring} ${100 + i * 220}ms`,
                }}
              >
                <Icon className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-white/45">{kind}</span>
                <span className="block text-[14.5px] font-semibold text-white">{title}</span>
              </span>
              <span className="ml-auto font-mono text-[10.5px] text-white/40">node {i + 1}</span>
            </div>

            {/* connector with travelling pulse */}
            {i < NODES.length - 1 ? (
              <div
                className="relative mx-auto my-2 w-px bg-white/15"
                style={{
                  height: shown ? "28px" : "0px",
                  transition: `height 0.5s ${ease} ${160 + i * 220}ms`,
                }}
              >
                <span
                  aria-hidden
                  className="absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_8px_var(--primary)]"
                  style={{ animation: `flowPulse 2.4s ease-in-out ${i * 0.4}s infinite` }}
                />
              </div>
            ) : null}
          </div>
        ))}
      </div>

      {/* ── Right: stats (boxless, divider separated) ─────────────── */}
      <div className="divide-y divide-white/10">
        {STATS.map(({ Icon, label, value, sub, accent }, i) => (
          <div
            key={label}
            className="py-5 first:pt-0 last:pb-0"
            style={{
              opacity: shown ? 1 : 0,
              transform: shown ? "translateX(0)" : "translateX(20px)",
              transition: `opacity 0.6s ease ${250 + i * 140}ms, transform 0.6s ${ease} ${250 + i * 140}ms`,
            }}
          >
            <div className="flex items-center gap-2.5">
              <span
                className={`inline-flex h-8 w-8 items-center justify-center rounded-lg ${accent ? "bg-primary text-primary-foreground" : "bg-white/10 text-primary"}`}
                style={{
                  transform: shown ? "scale(1)" : "scale(0)",
                  transition: `transform 0.5s ${spring} ${330 + i * 140}ms`,
                }}
              >
                <Icon className="h-4 w-4" />
              </span>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/50">{label}</p>
              {accent ? (
                <span className="ml-auto inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400">
                  <span className="relative inline-flex h-1.5 w-1.5">
                    <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/70" />
                    <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </span>
                  live
                </span>
              ) : null}
            </div>
            <p className="mt-2.5 flex items-baseline gap-1.5">
              <span className={`text-3xl font-bold tracking-tight ${accent ? "bg-gradient-to-r from-white to-primary bg-clip-text text-transparent" : "text-white"}`}>
                {value}
              </span>
              {sub ? <span className="text-[12px] text-white/50">{sub}</span> : null}
            </p>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes flowPulse {
          0% { top: -8px; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  )
}
