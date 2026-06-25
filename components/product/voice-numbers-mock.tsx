"use client"

import { useEffect, useRef, useState } from "react"
import { MapPin, PhoneCall } from "lucide-react"

const ROWS = [
  { Icon: MapPin, name: "Local DID", desc: "US local numbers", price: "$5" },
  { Icon: PhoneCall, name: "Toll-free", desc: "Virtual business numbers", price: "$15" },
]

export function VoiceNumbersMock() {
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

      {/* header — boxless, just a divider */}
      <div
        className="flex items-center justify-between border-b border-border/60 pb-3"
        style={{
          opacity: shown ? 1 : 0,
          transform: shown ? "translateY(0)" : "translateY(-8px)",
          transition: "opacity 0.5s ease, transform 0.5s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <p className="text-[13px] font-semibold text-foreground">Your numbers</p>
        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> 2 active
        </span>
      </div>

      {/* number rows — boxless, separated by dividers */}
      <div className="mt-2">
        {ROWS.map(({ Icon, name, desc, price }, i) => (
          <div
            key={name}
            className="flex items-center gap-3.5 border-b border-border/40 py-5 last:border-0"
            style={{
              opacity: shown ? 1 : 0,
              transform: shown ? "translateX(0)" : "translateX(-18px)",
              transition: `opacity 0.6s ease ${i * 140}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 140}ms`,
            }}
          >
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"
              style={{
                transform: shown ? "scale(1)" : "scale(0)",
                transition: `transform 0.5s cubic-bezier(0.34,1.56,0.64,1) ${120 + i * 140}ms`,
              }}
            >
              <Icon className="h-5 w-5" />
            </span>
            <div>
              <p className="font-mono text-[14px] font-semibold text-foreground">{name}</p>
              <p className="text-[12px] text-muted-foreground">{desc}</p>
            </div>
            <span className="ml-auto text-right">
              <span className="block bg-gradient-to-r from-foreground to-primary bg-clip-text text-[19px] font-bold text-transparent">
                {price}
              </span>
              <span className="text-[11px] text-muted-foreground">/month</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
