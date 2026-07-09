"use client"

import { useEffect, useRef, useState } from "react"
import { Filter, MessageSquare, Zap, type LucideIcon } from "lucide-react"

/**
 * "Productivity" section — boxless, keyboard-themed.
 *
 * The dark stats band and the three feature cards are gone. Instead:
 *   • four big typographic stats with an underline that draws in on scroll
 *   • three capabilities shown as 3D keycaps that "press" in sequence on a
 *     loop — literally the one-keystroke speed the section is about.
 *
 * Honours prefers-reduced-motion (everything shown, keys at rest).
 */

const STATS = [
  { value: "1-key", label: "Macros run multi-step actions instantly" },
  { value: "Saved", label: "Replies & signatures for common answers" },
  { value: "Custom", label: "Views & filters per team and per agent" },
  { value: "Zero", label: "Time lost hunting for the next conversation" },
]

const FEATURES: { Icon: LucideIcon; combo: string; title: string; desc: string }[] = [
  { Icon: Zap, combo: "⌘M", title: "Macros", desc: "Tag, reply, assign, and close in a single action you can trigger by keyboard." },
  { Icon: MessageSquare, combo: "⌘/", title: "Saved replies", desc: "Drop in approved answers with dynamic fields — consistent every time." },
  { Icon: Filter, combo: "⌘K", title: "Custom views & filters", desc: "Slice the inbox by channel, tag, priority, or SLA so agents see only what's theirs." },
]

export function ProductivityFlow() {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)
  const [reduced, setReduced] = useState(false)
  const [step, setStep] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true)
      setShown(true)
      return
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.25 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (reduced || !shown) return
    const t = setInterval(() => setStep((s) => (s + 1) % FEATURES.length), 1150)
    return () => clearInterval(t)
  }, [reduced, shown])

  const live = shown && !reduced

  return (
    <div ref={ref}>
      {/* ── four typographic stats (boxless) ────────────────────── */}
      <div className="mt-12 grid grid-cols-2 gap-y-8 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <div
            key={s.value}
            className="px-2 transition-all duration-500 first:pl-0 sm:border-l sm:border-border/50 sm:pl-6 sm:[&:first-child]:border-l-0 lg:[&:nth-child(3)]:border-l"
            style={{
              transitionDelay: `${i * 90}ms`,
              opacity: shown ? 1 : 0,
              transform: shown ? "none" : "translateY(12px)",
            }}
          >
            <div className="bg-gradient-to-br from-foreground to-primary bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
              {s.value}
            </div>
            <span
              aria-hidden
              className="mt-2 block h-0.5 w-10 origin-left rounded-full bg-gradient-to-r from-primary to-transparent transition-transform duration-700"
              style={{ transitionDelay: `${300 + i * 90}ms`, transform: shown ? "scaleX(1)" : "scaleX(0)" }}
            />
            <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* ── three capabilities — boxless icon + accent line ────── */}
      <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-10 border-t border-border/60 pt-10 sm:grid-cols-3">
        {FEATURES.map((f, i) => {
          const active = live && step === i
          return (
            <div key={f.title} className="flex flex-col items-center text-center">
              {/* icon — gradient when active, muted when not */}
              <div
                className="mb-4 flex h-10 w-10 items-center justify-center transition-all duration-300"
                style={{
                  color: active ? "var(--primary)" : "var(--muted-foreground)",
                  transform: active ? "scale(1.18)" : "scale(1)",
                  filter: active ? "drop-shadow(0 0 10px color-mix(in oklch, var(--primary) 45%, transparent))" : "none",
                }}
              >
                <f.Icon className="h-7 w-7" />
              </div>

              {/* shortcut chip */}
              <span className={`mb-3 font-mono text-[11px] font-semibold transition-colors ${active ? "text-primary" : "text-muted-foreground/60"}`}>
                <kbd className="rounded border border-border bg-muted px-1.5 py-0.5">{f.combo}</kbd>
              </span>

              <h3 className={`text-[15px] font-semibold tracking-tight transition-colors duration-300 ${active ? "text-primary" : "text-foreground"}`}>
                {f.title}
              </h3>

              {/* growing accent underline */}
              <span
                aria-hidden
                className="my-2 block h-px rounded-full"
                style={{
                  width: active ? "40px" : "0px",
                  background: "var(--primary)",
                  transition: "width 0.4s cubic-bezier(0.22,1,0.36,1)",
                }}
              />

              <p className="max-w-[260px] text-[13px] leading-relaxed text-muted-foreground">{f.desc}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
