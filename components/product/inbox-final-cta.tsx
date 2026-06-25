"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  Facebook,
  Instagram,
  Mail,
  MessageCircle,
  Phone,
  Send,
  Smartphone,
  Users,
} from "lucide-react"

/**
 * Final CTA for the Inbox page — no box, no card, no border.
 *
 * Layout: full-bleed section with:
 *   • Two slow-breathing aurora blobs (no container)
 *   • Channel icons drifting upward in the background
 *   • H2 words that stagger-reveal word-by-word on scroll
 *   • Glowing pill primary CTA with shimmer sweep on hover
 *   • Ghost text secondary CTA
 *   • Hairline + trust line at the bottom
 */

// Six channel icons float up in the background
const FLOATERS = [
  { Icon: MessageCircle, color: "#10b981", delay: 0,   left: "7%",  dur: 8 },
  { Icon: Mail,          color: "#38bdf8", delay: 1.5, left: "21%", dur: 10 },
  { Icon: Instagram,     color: "#f472b6", delay: 0.7, left: "43%", dur: 9  },
  { Icon: Facebook,      color: "#60a5fa", delay: 2.2, left: "61%", dur: 11 },
  { Icon: Smartphone,    color: "#a78bfa", delay: 0.3, left: "78%", dur: 8.5 },
  { Icon: Send,          color: "#22d3ee", delay: 1.9, left: "91%", dur: 9.5 },
]

// Title split into two lines for the stagger reveal
const LINE_1 = ["Stop", "managing", "channels."]
const LINE_2 = ["Start", "managing", "customers."]
const ALL_WORDS = [...LINE_1, ...LINE_2]

export function InboxFinalCta({
  subtitle,
  primaryCta,
  secondaryCta,
}: {
  subtitle: string
  primaryCta: { label: string; href: string }
  secondaryCta: { label: string; href: string }
}) {
  const ref = useRef<HTMLElement>(null)
  const [shown, setShown] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
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
      { threshold: 0.18 },
    )
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  return (
    <section ref={ref} className="relative overflow-hidden py-8 sm:py-12">
      {/* ── aurora blobs (no box, just ambient glow) ─────────────── */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute -left-48 top-1/2 h-[560px] w-[560px] -translate-y-1/2 rounded-full opacity-[0.14] blur-[110px]"
          style={{
            background: "radial-gradient(circle, var(--primary), transparent 70%)",
            animation: reduced ? "none" : "aurora-breathe 9s ease-in-out infinite",
          }}
        />
        <div
          className="absolute -right-48 top-1/2 h-[440px] w-[440px] -translate-y-1/2 rounded-full opacity-[0.11] blur-[130px]"
          style={{
            background: "radial-gradient(circle, oklch(0.72 0.17 165), transparent 70%)",
            animation: reduced ? "none" : "aurora-breathe 12s ease-in-out 3s infinite",
          }}
        />
        <div
          className="absolute left-1/2 -top-24 h-[260px] w-[700px] -translate-x-1/2 rounded-full opacity-[0.08] blur-[90px]"
          style={{ background: "radial-gradient(circle, var(--primary), transparent 70%)" }}
        />
      </div>

      {/* ── floating channel icons drifting upward ───────────────── */}
      {!reduced && (
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          {FLOATERS.map((f, i) => (
            <span
              key={i}
              className="absolute bottom-[-10%]"
              style={{
                left: f.left,
                animation: `float-icon ${f.dur}s ease-in-out ${f.delay}s infinite`,
              }}
            >
              <f.Icon className="h-6 w-6" style={{ color: f.color }} />
            </span>
          ))}
        </div>
      )}

      {/* ── content ──────────────────────────────────────────────── */}
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        {/* eyebrow */}
        <p
          className="mb-3 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary transition-all duration-700"
          style={{ opacity: shown ? 1 : 0, transitionDelay: "0ms" }}
        >
          <span className={`h-1.5 w-1.5 rounded-full bg-primary ${reduced ? "" : "animate-pulse"}`} />
          SMSLocal Inbox
        </p>

        {/* headline — word-by-word stagger reveal */}
        <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          {ALL_WORDS.map((word, i) => (
            <span
              key={i}
              className="inline-block transition-all duration-600"
              style={{
                transitionDelay: `${60 + i * 70}ms`,
                opacity: shown ? 1 : 0,
                transform: shown ? "translateY(0)" : "translateY(22px)",
                marginRight: word.endsWith(".") && i < ALL_WORDS.length - 1 ? "0.6em" : "0.25em",
              }}
            >
              {/* "customers." — gradient accent on last word */}
              {i === ALL_WORDS.length - 1 ? (
                <span className="bg-gradient-to-r from-primary to-[oklch(0.72_0.17_165)] bg-clip-text text-transparent">
                  {word}
                </span>
              ) : (
                word
              )}
            </span>
          ))}
        </h2>

        {/* subtitle */}
        <p
          className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-muted-foreground transition-all duration-700"
          style={{
            transitionDelay: "560ms",
            opacity: shown ? 1 : 0,
            transform: shown ? "none" : "translateY(10px)",
          }}
        >
          {subtitle}
        </p>

        {/* CTAs */}
        <div
          className="mt-5 flex flex-wrap items-center justify-center gap-5 transition-all duration-700"
          style={{
            transitionDelay: "680ms",
            opacity: shown ? 1 : 0,
            transform: shown ? "none" : "translateY(10px)",
          }}
        >
          {/* Primary — glowing pill with shimmer sweep */}
          <Link
            href={primaryCta.href}
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_0_40px_-10px_var(--primary)] transition-shadow duration-500 hover:shadow-[0_0_60px_-6px_var(--primary)]"
          >
            {/* shimmer streak */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
            />
            {primaryCta.label}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>

          {/* Secondary — plain text link */}
          <Link
            href={secondaryCta.href}
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-foreground/70 transition-colors hover:text-primary"
          >
            {secondaryCta.label}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* trust line — hairline + stat */}
        <div
          className="mx-auto mt-5 flex max-w-sm flex-col items-center gap-3 transition-all duration-700"
          style={{
            transitionDelay: "800ms",
            opacity: shown ? 1 : 0,
            transform: shown ? "none" : "translateY(8px)",
          }}
        >
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-border to-transparent" />
          <p className="flex items-center gap-2 text-[12px] font-medium text-muted-foreground">
            <Users className="h-3.5 w-3.5 text-primary" />
            Trusted by 10,000+ businesses across India
          </p>
        </div>
      </div>
    </section>
  )
}
