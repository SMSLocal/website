"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowUpRight, Check, Send, Star } from "lucide-react"

/**
 * Centered marketing hero for /test-home (inspired by floatchat.com), themed to
 * the site's teal/emerald brand. Light background to blend with the rest of the
 * page. Two floating cards get a subtle mouse-parallax on pointer devices.
 */

const FEATURES = ["DLT-compliant", "99.7% delivery", "AI in 8 languages", "₹60 free credit"]

const TYPED_WORDS = ["Bulk SMS", "WhatsApp", "RCS Message", "Agentic AI"]

// Conversation bubbles scattered around the hero edges; they scatter away from
// the cursor for a light, game-like feel.
const BUBBLES = [
  { left: 9, top: 22, text: "Hi there! 👋", out: false },
  { left: 15, top: 52, text: "OTP is 4821", out: true },
  { left: 7, top: 78, text: "Track my order?", out: false },
  { left: 24, top: 14, text: "New lead 🔔", out: false },
  { left: 86, top: 20, text: "Order shipped ✓", out: false },
  { left: 90, top: 50, text: "Reply YES to confirm", out: true },
  { left: 83, top: 80, text: "Thanks! 🎉", out: false },
  { left: 76, top: 14, text: "Payment received ✓", out: true },
]

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
  const [m, setM] = useState({ x: 0, y: 0, w: 1, h: 1, on: false })
  const [size, setSize] = useState({ w: 0, h: 0 })

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const measure = () => setSize({ w: el.clientWidth, h: el.clientHeight })
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    let raf = 0
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect()
        const x = e.clientX - r.left
        const y = e.clientY - r.top
        setTilt({ x: x / r.width - 0.5, y: y / r.height - 0.5 })
        setM({ x, y, w: r.width, h: r.height, on: true })
      })
    }
    const onLeave = () => setM((s) => ({ ...s, on: false }))
    el.addEventListener("mousemove", onMove)
    el.addEventListener("mouseleave", onLeave)
    return () => {
      el.removeEventListener("mousemove", onMove)
      el.removeEventListener("mouseleave", onLeave)
      cancelAnimationFrame(raf)
    }
  }, [])

  const px = (d: number) => `translate3d(${tilt.x * d}px, ${tilt.y * d}px, 0)`

  // Scatter a bubble away from the cursor within a radius.
  const repel = (leftPct: number, topPct: number) => {
    if (!m.on) return "translate3d(0,0,0)"
    const bx = (leftPct / 100) * m.w
    const by = (topPct / 100) * m.h
    const dx = bx - m.x
    const dy = by - m.y
    const dist = Math.hypot(dx, dy) || 1
    const R = 170
    if (dist > R) return "translate3d(0,0,0)"
    const force = ((R - dist) / R) * 64
    return `translate3d(${(dx / dist) * force}px, ${(dy / dist) * force}px, 0)`
  }

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

      {/* Drifting dotted grid for depth */}
      <div
        aria-hidden
        className="animate-dot-drift pointer-events-none absolute inset-0 mask-radial-fade opacity-70"
        style={{
          backgroundImage: "radial-gradient(color-mix(in oklch, var(--foreground) 8%, transparent) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Interactive constellation: a faint network between conversation nodes
          that lights up around the cursor (connect-the-chat game feel) */}
      <svg aria-hidden className="pointer-events-none absolute inset-0 hidden h-full w-full md:block">
        {(() => {
          const nodes = BUBBLES.map((b) => ({
            x: (b.left / 100) * size.w,
            y: (b.top / 100) * size.h,
          }))
          return (
            <>
              {/* static web between nearby nodes */}
              {nodes.map((a, i) =>
                nodes.slice(i + 1).map((b, j) => {
                  const d = Math.hypot(a.x - b.x, a.y - b.y)
                  if (d > 340) return null
                  return (
                    <line
                      key={`e${i}-${j}`}
                      x1={a.x}
                      y1={a.y}
                      x2={b.x}
                      y2={b.y}
                      stroke="var(--primary)"
                      strokeWidth={1}
                      opacity={(1 - d / 340) * 0.16}
                    />
                  )
                }),
              )}
              {/* node dots */}
              {nodes.map((n, i) => (
                <circle key={`n${i}`} cx={n.x} cy={n.y} r={2.5} fill="var(--primary)" opacity={0.28} />
              ))}
              {/* bright links from cursor to nearby nodes */}
              {m.on &&
                nodes.map((n, i) => {
                  const d = Math.hypot(n.x - m.x, n.y - m.y)
                  if (d > 240) return null
                  return (
                    <line
                      key={`c${i}`}
                      x1={m.x}
                      y1={m.y}
                      x2={n.x}
                      y2={n.y}
                      stroke="var(--primary)"
                      strokeWidth={1.4}
                      strokeLinecap="round"
                      opacity={(1 - d / 240) * 0.6}
                    />
                  )
                })}
              {m.on && <circle cx={m.x} cy={m.y} r={4.5} fill="var(--primary)" opacity={0.75} />}
              {m.on && (
                <circle cx={m.x} cy={m.y} r={11} fill="none" stroke="var(--primary)" strokeWidth={1} opacity={0.3} />
              )}
            </>
          )
        })()}
      </svg>
      {/* Soft floating brand orbs */}
      <div
        aria-hidden
        className="animate-float-slow pointer-events-none absolute left-[8%] top-[22%] h-40 w-40 rounded-full bg-primary/10 blur-3xl"
      />
      <div
        aria-hidden
        className="animate-float-slower pointer-events-none absolute right-[10%] bottom-[14%] h-48 w-48 rounded-full bg-accent/15 blur-3xl"
      />

      {/* Interactive conversation bubbles — scatter away from the cursor */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden md:block">
        {BUBBLES.map((b, i) => (
          <div
            key={i}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${b.left}%`, top: `${b.top}%` }}
          >
            <div
              className="transition-transform duration-500 ease-out"
              style={{ transform: repel(b.left, b.top) }}
            >
              <div
                className={`flex items-center gap-1.5 rounded-2xl border px-3 py-2 text-[12px] font-medium shadow-sm backdrop-blur ${
                  b.out
                    ? "rounded-br-sm border-primary/20 bg-primary/10 text-primary"
                    : "rounded-bl-sm border-border bg-card/80 text-foreground/70"
                }`}
              >
                {b.text}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 lg:py-28">
        {/* Floating stat (bottom-left) */}
        <div
          className="absolute bottom-10 left-2 hidden flex-col items-center xl:flex"
          style={{ transform: px(22) }}
        >
          <div className="text-3xl font-extrabold tracking-tight text-foreground">10k+</div>
          <div className="text-[12.5px] font-medium text-muted-foreground">messages / second</div>
          <span className="mt-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[oklch(0.55_0.13_172)] text-white shadow-lg shadow-primary/30">
            <Send className="h-5 w-5" />
          </span>
        </div>

        {/* Floating testimonial (bottom-right, clear of the heading) */}
        <div
          className="absolute bottom-8 right-0 hidden w-56 rounded-2xl border border-border bg-card p-4 text-left shadow-xl xl:block"
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
          Free ₹60 credit — no credit card required
        </div>

        {/* Headline — centered, with typewriter */}
        <h1 className="mx-auto mt-7 max-w-4xl text-balance text-5xl font-extrabold leading-[1.08] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
          India&rsquo;s messaging platform for
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
            href="https://app.smslocal.in/signup"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-[oklch(0.55_0.13_172)] px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:shadow-xl hover:shadow-primary/30"
          >
            Start Free — ₹60 Credit
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
