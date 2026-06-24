"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { ArrowRight, Check } from "lucide-react"

const FEATURES = ["200 AI replies / month", "Unlimited Auto Reply rules", "REST API access", "5 webhooks"]

const ease = "cubic-bezier(0.16,1,0.3,1)"
const spring = "cubic-bezier(0.34,1.56,0.64,1)"

export function AutomationPricing() {
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

  const reveal = (delay: number, y = 14) => ({
    opacity: shown ? 1 : 0,
    transform: shown ? "translateY(0)" : `translateY(${y}px)`,
    transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ${ease} ${delay}ms`,
  })

  return (
    <div ref={ref} className="relative mx-auto mt-12 max-w-md text-center">
      {/* soft ambient glow — no card */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-3xl"
        style={{ background: "radial-gradient(circle, color-mix(in oklch, var(--primary) 18%, transparent), transparent 70%)" }}
      />

      <div className="relative">
        <div className="flex items-center justify-center gap-2.5" style={reveal(0, -8)}>
          <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-primary">SMSLocal Lite</p>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-primary">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Most popular
          </span>
        </div>

        <div className="mt-4 flex items-baseline justify-center gap-1.5" style={reveal(100)}>
          <span className="bg-gradient-to-br from-foreground to-primary bg-clip-text text-6xl font-bold tracking-tight text-transparent">
            $9.99
          </span>
          <span className="text-[14px] text-muted-foreground">/month</span>
        </div>

        <ul className="mx-auto mt-7 inline-flex flex-col gap-3.5 text-left">
          {FEATURES.map((f, i) => (
            <li key={f} className="flex items-center gap-3 text-[14px] font-medium text-foreground" style={reveal(180 + i * 90)}>
              <span
                className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"
                style={{ transform: shown ? "scale(1)" : "scale(0)", transition: `transform 0.5s ${spring} ${240 + i * 90}ms` }}
              >
                <Check className="h-3.5 w-3.5" />
              </span>
              {f}
            </li>
          ))}
        </ul>

        <div className="mt-9" style={reveal(620)}>
          <Link
            href="/signup"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground shadow-xl shadow-primary/25 transition hover:brightness-110 hover:shadow-2xl hover:shadow-primary/30"
          >
            Try Lite Free
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <p className="mt-3 text-[12px] text-muted-foreground">No credit card required.</p>
        </div>
      </div>
    </div>
  )
}
