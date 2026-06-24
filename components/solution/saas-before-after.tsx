"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight, Sparkles, TrendingUp } from "lucide-react"

const BEFORE = [
  { tool: "Intercom", price: "₹24,000" },
  { tool: "Zendesk", price: "₹95,000" },
  { tool: "Aircall", price: "₹25,000" },
]

const ease = "cubic-bezier(0.16,1,0.3,1)"
const spring = "cubic-bezier(0.34,1.56,0.64,1)"

export function SaasBeforeAfter() {
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
      className="mx-auto mt-14 grid max-w-4xl grid-cols-1 items-center gap-x-8 gap-y-10 lg:grid-cols-[1fr_auto_1fr]"
    >
      {/* ── Before (boxless) ──────────────────────────────────────── */}
      <div
        style={{
          opacity: shown ? 1 : 0,
          transform: shown ? "translateX(0)" : "translateX(-26px)",
          transition: `opacity 0.6s ease, transform 0.6s ${ease}`,
        }}
      >
        <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/50" /> Before
        </span>
        <ul className="mt-4">
          {BEFORE.map((r, i) => (
            <li
              key={r.tool}
              className="flex items-center justify-between border-b border-border/40 py-3"
              style={{
                opacity: shown ? 1 : 0,
                transform: shown ? "translateX(0)" : "translateX(-14px)",
                transition: `opacity 0.5s ease ${120 + i * 90}ms, transform 0.5s ${ease} ${120 + i * 90}ms`,
              }}
            >
              <span className="text-[13.5px] font-medium text-foreground">{r.tool}</span>
              <span className="font-mono text-[13px] text-muted-foreground">{r.price}/mo</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex items-baseline justify-between border-t border-border/60 pt-4" style={{
          opacity: shown ? 1 : 0,
          transition: `opacity 0.6s ease ${120 + BEFORE.length * 90 + 100}ms`,
        }}>
          <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Monthly</span>
          <span className="text-2xl font-bold tracking-tight text-foreground line-through decoration-destructive/50">₹1,44,000</span>
        </div>
      </div>

      {/* ── Arrow connector ───────────────────────────────────────── */}
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
            <ArrowRight className="h-5 w-5 max-lg:rotate-90" />
          </span>
        </span>
      </div>

      {/* ── After (boxless) ───────────────────────────────────────── */}
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
          After
        </span>

        <div className="mt-4 flex items-center gap-3" style={{
          opacity: shown ? 1 : 0,
          transform: shown ? "translateY(0)" : "translateY(10px)",
          transition: `opacity 0.55s ease 300ms, transform 0.55s ${ease} 300ms`,
        }}>
          <span
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground"
            style={{
              transform: shown ? "scale(1)" : "scale(0)",
              transition: `transform 0.55s ${spring} 360ms`,
            }}
          >
            <Sparkles className="h-5 w-5" />
          </span>
          <div>
            <p className="text-[14px] font-semibold text-foreground">SMSLocal Pro</p>
            <p className="text-[12px] text-muted-foreground">One platform, every workflow</p>
          </div>
        </div>

        <div className="mt-5 flex items-baseline justify-between border-t border-border/60 pt-4" style={{
          opacity: shown ? 1 : 0,
          transition: "opacity 0.6s ease 480ms",
        }}>
          <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Monthly</span>
          <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-2xl font-bold tracking-tight text-transparent">₹15,999</span>
        </div>

        <div
          className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-primary-foreground shadow-lg shadow-primary/25"
          style={{
            opacity: shown ? 1 : 0,
            transform: shown ? "scale(1)" : "scale(0.92)",
            transition: `opacity 0.6s ease 560ms, transform 0.6s ${spring} 560ms`,
          }}
        >
          <TrendingUp className="h-5 w-5" />
          <span className="text-[15px] font-bold">89% savings</span>
        </div>
      </div>
    </div>
  )
}
