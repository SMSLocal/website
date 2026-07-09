"use client"

import { useEffect, useRef, useState } from "react"
import { Building2, Headphones, HeartPulse, ShoppingBag } from "lucide-react"

const SEGMENTS = [
  { Icon: Building2, name: "Small B2B teams", use: "Customer follow-up calls" },
  { Icon: ShoppingBag, name: "D2C brands", use: "Support calls from customers" },
  { Icon: HeartPulse, name: "Healthcare clinics", use: "Patient communication" },
  { Icon: Headphones, name: "Service businesses", use: "One business phone line" },
]

const ease = "cubic-bezier(0.16,1,0.3,1)"
const spring = "cubic-bezier(0.34,1.56,0.64,1)"

export function VoiceSegments() {
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
          interval = setInterval(replay, 4500)
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
      className="mt-14 grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-y-0 lg:divide-x lg:divide-border/50"
    >
      {SEGMENTS.map(({ Icon, name, use }, i) => (
        <div
          key={name}
          className="group relative flex flex-col px-0 lg:px-8 lg:first:pl-0 lg:last:pr-0"
          style={{
            opacity: shown ? 1 : 0,
            transform: shown ? "translateY(0)" : "translateY(26px)",
            transition: `opacity 0.6s ease ${i * 130}ms, transform 0.6s ${ease} ${i * 130}ms`,
          }}
        >
          {/* index number */}
          <span className="font-mono text-[11px] font-bold tracking-widest text-primary/30">
            {String(i + 1).padStart(2, "0")}
          </span>

          {/* icon — boxless, scales + glows on hover */}
          <span
            className="mt-3 flex h-12 w-12 items-center justify-center text-primary transition-all duration-300 group-hover:scale-110"
            style={{
              transform: shown ? "scale(1)" : "scale(0)",
              transition: `transform 0.55s ${spring} ${150 + i * 130}ms`,
              filter: "drop-shadow(0 4px 12px color-mix(in oklch, var(--primary) 18%, transparent))",
            }}
          >
            <Icon className="h-8 w-8" strokeWidth={1.6} />
          </span>

          <h3 className="mt-5 text-[16px] font-semibold tracking-tight text-foreground">{name}</h3>

          {/* accent underline that grows on hover */}
          <span
            aria-hidden
            className="mt-2 h-px w-0 rounded-full bg-gradient-to-r from-primary to-transparent transition-all duration-500 group-hover:w-12"
          />

          <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{use}</p>
        </div>
      ))}
    </div>
  )
}
