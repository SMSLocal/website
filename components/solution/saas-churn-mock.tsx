"use client"

import { useEffect, useRef, useState } from "react"
import { AlertTriangle, Bell, CheckCheck, Tag } from "lucide-react"

const SIGNALS = ["cancel", "switching", "broken experience", "repeated issues"]

const ACTIONS = [
  { Icon: AlertTriangle, t: "Detect risk" },
  { Icon: Tag, t: "Tag customer" },
  { Icon: Bell, t: "Alert success team" },
  { Icon: CheckCheck, t: "Create follow-up" },
]

const ease = "cubic-bezier(0.16,1,0.3,1)"
const spring = "cubic-bezier(0.34,1.56,0.64,1)"

export function SaasChurnMock() {
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
        <p className="text-[13px] font-semibold text-foreground">AI Captain · churn watch</p>
        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          Monitoring
        </span>
      </div>

      {/* signals — pills stay (they read as tags, not boxes), pop in */}
      <p
        className="mt-5 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-muted-foreground"
        style={{ opacity: shown ? 1 : 0, transition: "opacity 0.5s ease 0.1s" }}
      >
        Signals detected
      </p>
      <div className="mt-2.5 flex flex-wrap gap-1.5">
        {SIGNALS.map((s, i) => (
          <span
            key={s}
            className="inline-flex items-center gap-1 rounded-full bg-rose-500/10 px-2.5 py-1 text-[11px] font-semibold text-rose-600 dark:text-rose-400"
            style={{
              opacity: shown ? 1 : 0,
              transform: shown ? "scale(1)" : "scale(0.6)",
              transition: `opacity 0.4s ease ${150 + i * 80}ms, transform 0.45s ${spring} ${150 + i * 80}ms`,
            }}
          >
            <AlertTriangle className="h-3 w-3" /> {s}
          </span>
        ))}
      </div>

      {/* actions — boxless rows separated by dividers */}
      <p
        className="mt-6 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-muted-foreground"
        style={{ opacity: shown ? 1 : 0, transition: "opacity 0.5s ease 0.45s" }}
      >
        AI Captain actions
      </p>
      <ul className="mt-1">
        {ACTIONS.map(({ Icon, t }, i) => (
          <li
            key={t}
            className="flex items-center gap-3 border-b border-border/40 py-3 last:border-0"
            style={{
              opacity: shown ? 1 : 0,
              transform: shown ? "translateX(0)" : "translateX(-16px)",
              transition: `opacity 0.5s ease ${500 + i * 110}ms, transform 0.5s ${ease} ${500 + i * 110}ms`,
            }}
          >
            <span
              className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"
              style={{
                transform: shown ? "scale(1)" : "scale(0)",
                transition: `transform 0.5s ${spring} ${560 + i * 110}ms`,
              }}
            >
              <Icon className="h-3.5 w-3.5" />
            </span>
            <span className="text-[12.5px] font-medium text-foreground">{t}</span>
            <CheckCheck
              className="ml-auto h-4 w-4 text-primary"
              style={{
                opacity: shown ? 1 : 0,
                transform: shown ? "scale(1)" : "scale(0)",
                transition: `opacity 0.4s ease ${680 + i * 110}ms, transform 0.5s ${spring} ${680 + i * 110}ms`,
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
