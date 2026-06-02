"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowUpRight, Check, Send, Star } from "lucide-react"

/**
 * Centered marketing hero for /test-home (inspired by floatchat.com), themed to
 * the site's teal/emerald brand. Light background to blend with the rest of the
 * page. Two floating cards get a subtle mouse-parallax on pointer devices.
 */

const FEATURES = ["DLT-compliant", "99.7% delivery", "AI in 8 languages", "₹2,100 free credit"]

const TYPED_WORDS = ["India", "Bulk SMS", "WhatsApp", "RCS", "AI replies"]

/** Typewriter that types + deletes through TYPED_WORDS on a loop. */
function Typewriter() {
  const [idx, setIdx] = useState(0)
  const [text, setText] = useState("")
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = TYPED_WORDS[idx]
    let to: ReturnType<typeof setTimeout>
    if (!deleting && text === word) {
      to = setTimeout(() => setDeleting(true), 1500)
    } else if (deleting && text === "") {
      setDeleting(false)
      setIdx((i) => (i + 1) % TYPED_WORDS.length)
    } else {
      to = setTimeout(
        () => setText(word.slice(0, text.length + (deleting ? -1 : 1))),
        deleting ? 50 : 95,
      )
    }
    return () => clearTimeout(to)
  }, [text, deleting, idx])

  return (
    <span className="inline-flex items-center">
      <span className="bg-gradient-to-r from-primary via-emerald-500 to-teal-500 bg-clip-text text-transparent">
        {text}
      </span>
      <span
        aria-hidden
        className="ml-1 inline-block h-[0.85em] w-[3px] translate-y-[0.06em] animate-pulse rounded-sm bg-primary"
      />
    </span>
  )
}

export function TestHero() {
  const ref = useRef<HTMLElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    let raf = 0
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect()
        setTilt({ x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 })
      })
    }
    el.addEventListener("mousemove", onMove)
    return () => {
      el.removeEventListener("mousemove", onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  const px = (d: number) => `translate3d(${tilt.x * d}px, ${tilt.y * d}px, 0)`

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#f6f8fc]">
      {/* Soft brand glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% -10%, color-mix(in oklch, var(--primary) 14%, transparent), transparent 60%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(ellipse at center, color-mix(in oklch, var(--accent) 22%, transparent), transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 lg:py-28">
        {/* Floating stat (left) */}
        <div
          className="absolute left-2 top-28 hidden flex-col items-center lg:flex"
          style={{ transform: px(22) }}
        >
          <div className="text-3xl font-extrabold tracking-tight text-foreground">10k+</div>
          <div className="text-[12.5px] font-medium text-muted-foreground">messages / second</div>
          <span className="mt-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[oklch(0.55_0.13_172)] text-white shadow-lg shadow-primary/30">
            <Send className="h-5 w-5" />
          </span>
        </div>

        {/* Floating testimonial (right) */}
        <div
          className="absolute right-0 top-24 hidden w-60 rounded-2xl border border-border bg-card p-4 text-left shadow-xl lg:block"
          style={{ transform: px(18) }}
        >
          <div className="flex items-center gap-2.5">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-rose-400 to-orange-400 text-xs font-bold text-white">
              P
            </span>
            <span className="text-[13.5px] font-semibold text-foreground">Priya S.</span>
          </div>
          <p className="mt-2 text-[12.5px] leading-relaxed text-muted-foreground">
            Replaced three tools with one. Delivery and AI replies just work. 🔥
          </p>
        </div>

        {/* Eyebrow */}
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-[12.5px] font-medium text-primary">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
          </span>
          Free ₹2,100 credit — no credit card required
        </div>

        {/* Headline — centered, with typewriter */}
        <h1 className="mx-auto mt-7 max-w-4xl text-balance text-5xl font-extrabold leading-[1.08] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
          The messaging platform built for
          <span className="mt-3 flex min-h-[1.15em] flex-wrap items-center justify-center gap-3">
            <Typewriter />
            <Send className="h-8 w-8 -rotate-12 text-primary sm:h-10 sm:w-10" />
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          Send DLT-compliant bulk SMS, run WhatsApp &amp; RCS two-way, and let an AI agent reply in 8
          Indian languages — all from one dashboard, one API, one wallet.
        </p>

        {/* Feature row */}
        <div className="mx-auto mt-7 flex max-w-3xl flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium text-foreground/80">
          {FEATURES.map((f) => (
            <span key={f} className="inline-flex items-center gap-1.5">
              <Check className="h-4 w-4 text-primary" /> {f}
            </span>
          ))}
          <span className="inline-flex items-center gap-1.5">
            <Star className="h-4 w-4 fill-accent text-accent" /> 4.9/5
          </span>
        </div>

        {/* CTAs — centered */}
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <a
            href="/signup"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-[oklch(0.55_0.13_172)] px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:shadow-xl hover:shadow-primary/30"
          >
            Start Free — ₹2,100 Credit
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href="/company/contact"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-7 py-3.5 text-sm font-semibold text-foreground shadow-sm transition hover:bg-secondary"
          >
            Book a Demo
          </a>
        </div>

        <p className="mt-4 text-[12.5px] text-muted-foreground">
          No credit card · 2-minute signup · DLT registration support included.
        </p>
      </div>
    </section>
  )
}
