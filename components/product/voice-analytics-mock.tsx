"use client"

import { useEffect, useRef, useState } from "react"
import { PhoneIncoming, PhoneOutgoing } from "lucide-react"

export function VoiceAnalyticsMock() {
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

  const ease = "cubic-bezier(0.16,1,0.3,1)"

  return (
    <div ref={ref} className="relative">
      {/* soft ambient glow */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-6 -z-10 rounded-[28px] opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, color-mix(in oklch, var(--primary) 22%, transparent), transparent 70%)" }}
      />

      {/* header — boxless, just a divider */}
      <div
        className="flex items-center justify-between border-b border-border/60 pb-3"
        style={{
          opacity: shown ? 1 : 0,
          transform: shown ? "translateY(0)" : "translateY(-8px)",
          transition: `opacity 0.5s ease, transform 0.5s ${ease}`,
        }}
      >
        <p className="text-[13px] font-semibold text-foreground">Voice usage</p>
        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> This month
        </span>
      </div>

      {/* minutes + progress */}
      <div
        className="mt-5"
        style={{
          opacity: shown ? 1 : 0,
          transform: shown ? "translateY(0)" : "translateY(8px)",
          transition: `opacity 0.55s ease 0.1s, transform 0.55s ${ease} 0.1s`,
        }}
      >
        <div className="flex items-baseline justify-between">
          <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Minutes this month
          </p>
          <p className="font-mono text-[13px] text-foreground">
            <span className="text-[18px] font-semibold">342</span> / 500
          </p>
        </div>
        {/* bar that fills on scroll */}
        <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-muted">
          <div className="flex h-full">
            <span
              className="h-full bg-emerald-500"
              style={{ width: shown ? "36.4%" : "0%", transition: `width 1s ${ease} 0.3s` }}
            />
            <span
              className="h-full bg-sky-500"
              style={{ width: shown ? "32%" : "0%", transition: `width 1s ${ease} 0.6s` }}
            />
          </div>
        </div>
      </div>

      {/* inbound / outbound — boxless, divider between */}
      <div className="mt-6 grid grid-cols-2 divide-x divide-border/50">
        {[
          { Icon: PhoneIncoming, label: "Inbound", value: "182 min", color: "text-emerald-600 dark:text-emerald-400" },
          { Icon: PhoneOutgoing, label: "Outbound", value: "160 min", color: "text-sky-600 dark:text-sky-400" },
        ].map(({ Icon, label, value, color }, i) => (
          <div
            key={label}
            className={i === 0 ? "pr-4" : "pl-4"}
            style={{
              opacity: shown ? 1 : 0,
              transform: shown ? "translateY(0)" : "translateY(10px)",
              transition: `opacity 0.55s ease ${400 + i * 120}ms, transform 0.55s ${ease} ${400 + i * 120}ms`,
            }}
          >
            <p className={`flex items-center gap-1.5 text-[11px] font-semibold ${color}`}>
              <Icon className="h-3.5 w-3.5" /> {label}
            </p>
            <p className="mt-1 text-[18px] font-semibold text-foreground">{value}</p>
          </div>
        ))}
      </div>

      {/* overage — boxless, divider only */}
      <div
        className="mt-6 flex items-center justify-between border-t border-border/60 pt-4"
        style={{
          opacity: shown ? 1 : 0,
          transform: shown ? "translateY(0)" : "translateY(10px)",
          transition: `opacity 0.6s ease 0.7s, transform 0.6s ${ease} 0.7s`,
        }}
      >
        <span className="text-[12px] font-medium text-muted-foreground">Overage</span>
        <span className="font-mono text-[13px] font-semibold text-primary">$0.008/min</span>
      </div>
    </div>
  )
}
