"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight, Sparkles, TrendingUp, Users, Zap } from "lucide-react"

const SIGNALS = [
  { Icon: TrendingUp, t: "Increased usage" },
  { Icon: Sparkles, t: "Feature requests" },
  { Icon: Users, t: "Team growth" },
  { Icon: Zap, t: "Higher engagement" },
]

const ease = "cubic-bezier(0.16,1,0.3,1)"
const spring = "cubic-bezier(0.34,1.56,0.64,1)"

export function SaasExpansionMock() {
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
    <div ref={ref} className="relative">
      {/* soft ambient glow */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-6 -z-10 rounded-[28px] opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, color-mix(in oklch, var(--primary) 22%, transparent), transparent 70%)" }}
      />

      {/* header — boxless, divider only */}
      <div
        className="flex items-center justify-between border-b border-border/60 pb-3"
        style={{
          opacity: shown ? 1 : 0,
          transform: shown ? "translateY(0)" : "translateY(-8px)",
          transition: `opacity 0.5s ease, transform 0.5s ${ease}`,
        }}
      >
        <p className="text-[13px] font-semibold text-foreground">Expansion signals</p>
        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          Opportunity
        </span>
      </div>

      {/* signals — boxless, 2-col grid with bare icons */}
      <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-5">
        {SIGNALS.map(({ Icon, t }, i) => (
          <div
            key={t}
            className="flex items-center gap-3"
            style={{
              opacity: shown ? 1 : 0,
              transform: shown ? "translateY(0)" : "translateY(12px)",
              transition: `opacity 0.5s ease ${i * 90}ms, transform 0.5s ${ease} ${i * 90}ms`,
            }}
          >
            <span
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
              style={{
                transform: shown ? "scale(1)" : "scale(0)",
                transition: `transform 0.5s ${spring} ${120 + i * 90}ms`,
              }}
            >
              <Icon className="h-4 w-4" />
            </span>
            <span className="text-[12.5px] font-semibold text-foreground">{t}</span>
          </div>
        ))}
      </div>

      {/* detected — boxless, accent bar + bold figure */}
      <div
        className="mt-6 border-t border-border/60 pt-5"
        style={{
          opacity: shown ? 1 : 0,
          transform: shown ? "translateY(0)" : "translateY(12px)",
          transition: `opacity 0.6s ease 480ms, transform 0.6s ${ease} 480ms`,
        }}
      >
        <p className="flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-primary">
          <TrendingUp className="h-3 w-3" /> Detected
        </p>
        <p className="mt-1.5 flex items-baseline gap-1">
          <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-[20px] font-bold text-transparent">
            ₹40L MRR
          </span>
          <span className="text-[14px] font-semibold text-foreground">expansion opportunity</span>
        </p>
        <button
          type="button"
          className="group mt-4 inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-[11.5px] font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:brightness-110"
        >
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          Route to sales / CS
        </button>
      </div>
    </div>
  )
}
