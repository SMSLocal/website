"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { ArrowRight, Check } from "lucide-react"

const GROWTH = ["Shared inbox & AI replies", "Stripe + HubSpot context", "Core integrations", "Email support"]
const PRO = ["Everything in Growth", "SSO + RBAC", "Audit logs", "AI Captain (churn & expansion)", "Advanced integrations"]

const ease = "cubic-bezier(0.16,1,0.3,1)"
const spring = "cubic-bezier(0.34,1.56,0.64,1)"

export function SaasPricing() {
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

  const reveal = (delay: number, dir: "left" | "right" = "left") => ({
    opacity: shown ? 1 : 0,
    transform: shown ? "translateX(0)" : `translateX(${dir === "left" ? "-22px" : "22px"})`,
    transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ${ease} ${delay}ms`,
  })

  const feature = (delay: number) => ({
    opacity: shown ? 1 : 0,
    transform: shown ? "translateY(0)" : "translateY(8px)",
    transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ${ease} ${delay}ms`,
  })

  return (
    <div
      ref={ref}
      className="mx-auto mt-14 grid max-w-3xl grid-cols-1 gap-x-14 gap-y-12 md:grid-cols-2 md:divide-x md:divide-border/50"
    >
      {/* ── Growth (boxless) ──────────────────────────────────────── */}
      <div className="flex flex-col md:pr-8">
        <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-muted-foreground" style={reveal(0)}>
          Growth
        </p>
        <div className="mt-3 flex items-baseline gap-1.5" style={reveal(80)}>
          <span className="text-5xl font-bold tracking-tight text-foreground">₹5,999</span>
          <span className="text-[14px] text-muted-foreground">/month</span>
        </div>
        <p className="mt-2 text-[13px] text-muted-foreground" style={reveal(140)}>For smaller teams getting started.</p>

        <ul className="mt-7 flex-1 space-y-3.5">
          {GROWTH.map((f, i) => (
            <li key={f} className="flex items-center gap-3 text-[13.5px] text-foreground" style={feature(220 + i * 80)}>
              <span
                className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"
                style={{ transform: shown ? "scale(1)" : "scale(0)", transition: `transform 0.5s ${spring} ${280 + i * 80}ms` }}
              >
                <Check className="h-3.5 w-3.5" />
              </span>
              {f}
            </li>
          ))}
        </ul>

        <Link
          href="/signup/"
          className="mt-8 inline-flex w-full items-center justify-center rounded-xl border border-border px-5 py-3 text-sm font-semibold text-foreground transition hover:border-primary/40 hover:bg-secondary"
          style={feature(560)}
        >
          Start Free
        </Link>
      </div>

      {/* ── Pro (boxless) ─────────────────────────────────────────── */}
      <div className="flex flex-col md:pl-12">
        <div className="flex items-center justify-between" style={reveal(150, "right")}>
          <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-primary">Pro</p>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-primary">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Recommended
          </span>
        </div>
        <div className="mt-3 flex items-baseline gap-1.5" style={reveal(220, "right")}>
          <span className="bg-gradient-to-br from-foreground to-primary bg-clip-text text-5xl font-bold tracking-tight text-transparent">
            ₹15,999
          </span>
          <span className="text-[14px] text-muted-foreground">/month</span>
        </div>
        <p className="mt-2 text-[13px] text-muted-foreground" style={reveal(290, "right")}>For scaling SaaS & success teams.</p>

        <ul className="mt-7 flex-1 space-y-3.5">
          {PRO.map((f, i) => (
            <li key={f} className="flex items-center gap-3 text-[13.5px] font-medium text-foreground" style={feature(360 + i * 80)}>
              <span
                className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"
                style={{ transform: shown ? "scale(1)" : "scale(0)", transition: `transform 0.5s ${spring} ${420 + i * 80}ms` }}
              >
                <Check className="h-3.5 w-3.5" />
              </span>
              {f}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-col gap-3" style={feature(820)}>
          <Link
            href="/signup/"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground shadow-xl shadow-primary/25 transition hover:brightness-110"
          >
            Start Free
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/company/contact/"
            className="inline-flex w-full items-center justify-center rounded-xl px-5 py-3 text-sm font-medium text-muted-foreground transition hover:text-foreground"
          >
            Talk to Sales
          </Link>
        </div>
      </div>
    </div>
  )
}
