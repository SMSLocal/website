"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight, Gauge, Rocket, TrendingUp, UserPlus, Zap } from "lucide-react"

const TRADITIONAL = ["Reactive, ticket-by-ticket", "No business context", "Blind to churn and expansion"]

const LIFECYCLE = [
  { Icon: Rocket, t: "Faster onboarding" },
  { Icon: Zap, t: "Better activation" },
  { Icon: Gauge, t: "Customer health tracking" },
  { Icon: TrendingUp, t: "Retention insights" },
  { Icon: UserPlus, t: "Expansion opportunities" },
]

const ease = "cubic-bezier(0.16,1,0.3,1)"
const spring = "cubic-bezier(0.34,1.56,0.64,1)"

export function SaasComparison() {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setShown(true)
      return
    }

    let interval: ReturnType<typeof setInterval> | undefined
    let visible = false

    const replay = () => {
      setShown(false)
      requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)))
    }

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !visible) {
          visible = true
          replay()
          interval = setInterval(replay, 5500)
        } else if (!e.isIntersecting && visible) {
          visible = false
          if (interval) clearInterval(interval)
        }
      },
      { threshold: 0.2 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      if (interval) clearInterval(interval)
    }
  }, [])

  return (
    <div
      ref={ref}
      className="mx-auto mt-14 grid max-w-4xl grid-cols-1 items-center gap-x-8 gap-y-12 lg:grid-cols-[1fr_auto_1fr]"
    >
      {/* ── Left: traditional helpdesk (boxless, muted) ───────────── */}
      <div
        style={{
          opacity: shown ? 1 : 0,
          transform: shown ? "translateX(0)" : "translateX(-26px)",
          transition: `opacity 0.6s ease, transform 0.6s ${ease}`,
        }}
      >
        <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-destructive/80">
          <span className="h-1.5 w-1.5 rounded-full bg-destructive/60" /> Traditional helpdesk
        </span>
        <p className="mt-4 text-[14px] leading-relaxed text-muted-foreground">
          Answers the ticket in front of you and closes it. No memory of the account, no signal about
          health, no idea whether this customer is about to churn or ready to expand.
        </p>
        <ul className="mt-5 space-y-3">
          {TRADITIONAL.map((t, i) => (
            <li
              key={t}
              className="flex items-center gap-3 text-[13.5px] text-muted-foreground"
              style={{
                opacity: shown ? 1 : 0,
                transform: shown ? "translateX(0)" : "translateX(-16px)",
                transition: `opacity 0.5s ease ${150 + i * 90}ms, transform 0.5s ${ease} ${150 + i * 90}ms`,
              }}
            >
              <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-destructive/60" aria-hidden />
              <span className="line-through decoration-destructive/25">{t}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Middle: arrow connector ───────────────────────────────── */}
      <div
        className="flex items-center justify-center"
        style={{
          opacity: shown ? 1 : 0,
          transform: shown ? "scale(1)" : "scale(0)",
          transition: `opacity 0.5s ease 350ms, transform 0.6s ${spring} 350ms`,
        }}
      >
        <span className="relative flex h-12 w-12 items-center justify-center text-primary">
          <span
            aria-hidden
            className="absolute inset-0 rounded-full ring-1 ring-primary/40"
            style={{ animation: "voice-radar 2.4s ease-out infinite" }}
          />
          <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/25">
            <ArrowRight className="h-5 w-5 lg:rotate-0 max-lg:rotate-90" />
          </span>
        </span>
      </div>

      {/* ── Right: SMSLocal for SaaS (boxless, primary) ───────────── */}
      <div
        style={{
          opacity: shown ? 1 : 0,
          transform: shown ? "translateX(0)" : "translateX(26px)",
          transition: `opacity 0.6s ease 200ms, transform 0.6s ${ease} 200ms`,
        }}
      >
        <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-primary">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          SMSLocal for SaaS
        </span>
        <p className="mt-4 text-[14px] leading-relaxed text-foreground">
          Manages the complete customer lifecycle — every conversation enriched with subscription,
          health, and product context, with AI watching for risk and opportunity.
        </p>
        <ul className="mt-5 space-y-3">
          {LIFECYCLE.map(({ Icon, t }, i) => (
            <li
              key={t}
              className="group flex items-center gap-3 text-[13.5px] font-medium text-foreground"
              style={{
                opacity: shown ? 1 : 0,
                transform: shown ? "translateX(0)" : "translateX(16px)",
                transition: `opacity 0.5s ease ${300 + i * 90}ms, transform 0.5s ${ease} ${300 + i * 90}ms`,
              }}
            >
              <span
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/15 transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
                style={{
                  transform: shown ? "scale(1)" : "scale(0)",
                  transition: `transform 0.5s ${spring} ${380 + i * 90}ms`,
                }}
              >
                <Icon className="h-4 w-4" />
              </span>
              {t}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
