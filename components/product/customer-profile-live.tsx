"use client"

import { useEffect, useRef, useState } from "react"
import {
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Tag,
} from "lucide-react"

/**
 * "Customer 360 — live profile" — the boxless replacement for the old bordered
 * profile card. No card chrome: the profile sits on the section background,
 * organised by hairline dividers instead of a box.
 *
 * Animation does the storytelling:
 *   • avatar wears a soft online pulse-ring
 *   • the LTV and order counts tick up from zero when scrolled into view
 *   • a glow dot streams down the channel-timeline thread on a loop, and each
 *     event slides in with a stagger — the profile "assembling" itself
 *
 * Honours prefers-reduced-motion (final values shown, motion paused).
 */

const STATS = [
  { k: "Email", v: "aarav@mail.com" },
  { k: "Orders", v: "14 (3 open)" },
  { k: "Last order", v: "#FC-2841" },
  { k: "First seen", v: "Mar 2022" },
]

const TIMELINE = [
  { icon: MessageCircle, tint: "text-emerald-500 bg-emerald-500/10", t: "WhatsApp · asked about order status", time: "2m", live: true },
  { icon: Mail, tint: "text-sky-500 bg-sky-500/10", t: "Email · refund request resolved", time: "3d", live: false },
  { icon: Phone, tint: "text-amber-500 bg-amber-500/10", t: "Voice · 4-min call, escalation", time: "1w", live: false },
  { icon: Instagram, tint: "text-pink-500 bg-pink-500/10", t: "Instagram · product question", time: "2w", live: false },
]

/** Tick a number from 0 → target once `run` flips true. */
function useCountUp(target: number, run: boolean, ms = 1100) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!run) return
    let raf = 0
    let start: number | null = null
    const step = (ts: number) => {
      if (start === null) start = ts
      const p = Math.min((ts - start) / ms, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setN(Math.round(target * eased))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [target, run, ms])
  return n
}

export function CustomerProfileLive() {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)
  const [reduced, setReduced] = useState(false)

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
      { threshold: 0.35 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const ltv = useCountUp(48200, shown && !reduced)
  const orders = useCountUp(14, shown && !reduced)
  const ltvText = reduced ? "48,200" : ltv.toLocaleString("en-IN")
  const ordersText = reduced ? "14" : String(orders)

  return (
    <div ref={ref} className="relative">
      {/* soft ambient glow (not a box) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-8 -z-10 opacity-50 blur-3xl"
        style={{ background: "radial-gradient(circle at 70% 30%, color-mix(in oklch, var(--primary) 22%, transparent), transparent 70%)" }}
      />

      {/* ── header ─────────────────────────────────────────────── */}
      <div className="flex items-center gap-4">
        <span className="relative inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[oklch(0.72_0.17_165)] text-[16px] font-semibold text-primary-foreground shadow-lg">
          {!reduced && (
            <>
              <span className="absolute inset-0 animate-[pulse-ring_2.6s_ease-out_infinite] rounded-full border border-primary/50" />
              <span className="absolute inset-0 animate-[pulse-ring_2.6s_ease-out_infinite] rounded-full border border-primary/40 [animation-delay:1.3s]" />
            </>
          )}
          AM
          <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-background bg-emerald-500" />
        </span>
        <div className="min-w-0">
          <p className="text-[17px] font-semibold tracking-tight text-foreground">Aarav Mehta</p>
          <p className="flex items-center gap-1.5 text-[12.5px] text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" /> Mumbai · VIP customer
          </p>
        </div>
        <div className="ml-auto text-right">
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Lifetime value</p>
          <p className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-2xl font-bold tracking-tight text-transparent tabular-nums">
            ₹{ltvText}
          </p>
        </div>
      </div>

      {/* ── stat figures (hairline-separated, no boxes) ─────────── */}
      <div className="mt-6 grid grid-cols-2 gap-y-5 border-t border-border/60 pt-5 sm:grid-cols-4">
        {STATS.map((a, i) => (
          <div
            key={a.k}
            className="px-1 transition-all duration-500"
            style={{
              transitionDelay: `${i * 90}ms`,
              opacity: shown ? 1 : 0,
              transform: shown ? "none" : "translateY(8px)",
            }}
          >
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">{a.k}</p>
            <p className="mt-1 text-[13.5px] font-medium text-foreground tabular-nums">
              {a.k === "Orders" ? `${ordersText} (3 open)` : a.v}
            </p>
          </div>
        ))}
      </div>

      {/* ── tags (borderless) ───────────────────────────────────── */}
      <div className="mt-5 flex flex-wrap gap-2 border-t border-border/60 pt-5">
        {["wholesale", "priority", "returns-flagged"].map((t, i) => (
          <span
            key={t}
            className="inline-flex items-center gap-1 text-[12px] font-medium text-muted-foreground transition-all duration-500"
            style={{ transitionDelay: `${250 + i * 80}ms`, opacity: shown ? 1 : 0, transform: shown ? "none" : "translateY(6px)" }}
          >
            <Tag className="h-3 w-3 text-primary" /> {t}
          </span>
        ))}
      </div>

      {/* ── channel timeline (animated thread) ──────────────────── */}
      <div className="mt-5 border-t border-border/60 pt-5">
        <div className="flex items-center justify-between">
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Channel timeline</p>
          <span className="inline-flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-wider text-emerald-500">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" /> Live
          </span>
        </div>

        <div className="relative mt-4 pl-1">
          {/* the thread */}
          <span aria-hidden className="absolute bottom-2 left-[14px] top-2 w-px bg-gradient-to-b from-primary/50 via-border to-transparent" />

          <ul className="space-y-3.5">
            {TIMELINE.map((e, i) => {
              const Icon = e.icon
              return (
                <li
                  key={e.t}
                  className="relative flex items-center gap-3 transition-all duration-500"
                  style={{
                    transitionDelay: `${300 + i * 120}ms`,
                    opacity: shown ? 1 : 0,
                    transform: shown ? "none" : "translateX(10px)",
                  }}
                >
                  <span className={`relative z-10 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full ring-4 ring-background ${e.tint}`}>
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <span className="truncate text-[12.5px] text-foreground">{e.t}</span>
                  <span className="ml-auto shrink-0 font-mono text-[10.5px] text-muted-foreground">{e.time}</span>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}
