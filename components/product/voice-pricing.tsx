"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { ArrowRight, Check, MapPin, PhoneCall, PhoneOutgoing } from "lucide-react"

const NUMBERS = [
  { Icon: MapPin, label: "Local DID", sub: "US local numbers", price: "$5", unit: "/mo" },
  { Icon: PhoneCall, label: "Toll-free", sub: "Virtual business numbers", price: "$15", unit: "/mo" },
  { Icon: PhoneOutgoing, label: "Outbound", sub: "Per-minute, all plans", price: "$0.008", unit: "/min" },
]

const FEATURES = [
  "Inbound & outbound calling",
  "Click-to-call from profiles",
  "Calls on the customer timeline",
  "Call recording & transcription",
]

const ease = "cubic-bezier(0.16,1,0.3,1)"
const spring = "cubic-bezier(0.34,1.56,0.64,1)"

export function VoicePricing() {
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
          interval = setInterval(replay, 5000)
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

  const reveal = (delay: number, dir: "up" | "left" | "right" = "up") => ({
    opacity: shown ? 1 : 0,
    transform: shown
      ? "none"
      : dir === "left"
        ? "translateX(-22px)"
        : dir === "right"
          ? "translateX(22px)"
          : "translateY(20px)",
    transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ${ease} ${delay}ms`,
  })

  return (
    <div
      ref={ref}
      className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-y-12 lg:grid-cols-[1fr_1.05fr] lg:gap-x-16 lg:divide-x lg:divide-border/50"
    >
      {/* ── Left: phone numbers, boxless ──────────────────────────── */}
      <div className="lg:pr-4">
        <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-muted-foreground" style={reveal(0)}>
          Phone numbers
        </p>
        <div className="mt-2">
          {NUMBERS.map(({ Icon, label, sub, price, unit }, i) => (
            <div
              key={label}
              className="flex items-center gap-4 border-b border-border/40 py-5 last:border-0"
              style={reveal(i * 110, "left")}
            >
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"
                style={{
                  transform: shown ? "scale(1)" : "scale(0)",
                  transition: `transform 0.5s ${spring} ${120 + i * 110}ms`,
                }}
              >
                <Icon className="h-5 w-5" strokeWidth={1.8} />
              </span>
              <div className="min-w-0">
                <p className="text-[15px] font-semibold text-foreground">{label}</p>
                <p className="text-[12.5px] text-muted-foreground">{sub}</p>
              </div>
              <span className="ml-auto flex shrink-0 items-baseline gap-0.5 whitespace-nowrap">
                <span className="text-[19px] font-bold text-foreground">{price}</span>
                <span className="text-[12px] font-medium text-muted-foreground">{unit}</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right: starter plan, boxless ──────────────────────────── */}
      <div className="lg:pl-12">
        <div className="flex items-center justify-between" style={reveal(150, "right")}>
          <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-primary">Starter plan</p>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-primary">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Voice ready
          </span>
        </div>

        <div className="mt-4 flex items-baseline gap-1.5" style={reveal(220, "right")}>
          <span className="bg-gradient-to-br from-foreground to-primary bg-clip-text text-5xl font-bold tracking-tight text-transparent">
            $19.99
          </span>
          <span className="text-[14px] text-muted-foreground">/month</span>
        </div>

        <p className="mt-2.5 text-[13px] text-muted-foreground" style={reveal(290, "right")}>
          Voice is available on Starter and every plan above.
        </p>

        <ul className="mt-7 space-y-3.5">
          {FEATURES.map((f, i) => (
            <li
              key={f}
              className="flex items-center gap-3 text-[14px] font-medium text-foreground"
              style={reveal(360 + i * 90, "right")}
            >
              <span
                className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"
                style={{
                  transform: shown ? "scale(1)" : "scale(0)",
                  transition: `transform 0.5s ${spring} ${430 + i * 90}ms`,
                }}
              >
                <Check className="h-3.5 w-3.5" />
              </span>
              {f}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-col gap-3" style={reveal(800, "up")}>
          <Link
            href="https://app.smslocal.in/signup"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground shadow-xl shadow-primary/25 transition hover:brightness-110"
          >
            Add Voice
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/pricing/"
            className="inline-flex w-full items-center justify-center rounded-xl px-5 py-3 text-sm font-medium text-muted-foreground transition hover:text-foreground"
          >
            See Pricing
          </Link>
        </div>
      </div>
    </div>
  )
}
