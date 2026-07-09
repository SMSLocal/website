"use client"

import Link from "next/link"
import { Fragment, useEffect, useRef } from "react"
import { AlertTriangle, ArrowRight, Check, GitBranch, Rocket, TrendingUp } from "lucide-react"

type Card = {
  icon: React.ComponentType<{ className?: string }>
  label: string
  title: string
  body: string
  points: string[]
}

const CARDS: Card[] = [
  {
    icon: Rocket,
    label: "Onboarding",
    title: "Onboarding nudges",
    body: "Auto-trigger live chat the first time a user lands on the dashboard, then guide them through setup, step by step.",
    points: ["First-login trigger", "Guided setup flow", "85% week-1 activation"],
  },
  {
    icon: AlertTriangle,
    label: "Churn",
    title: "Churn risk alerts",
    body: "Stripe shows MRR and subscription status inline. AI Captain flags conversations with cancel intent before renewal.",
    points: ["MRR & plan inline", "Cancel-intent detection", "Auto-tag at-risk accounts"],
  },
  {
    icon: TrendingUp,
    label: "Expansion",
    title: "Expansion plays",
    body: "AI Captain spots upgrade-ready signals — rising usage, team growth — and routes them to your customer success team.",
    points: ["Usage & growth signals", "Upsell-ready scoring", "₹40L MRR captured"],
  },
  {
    icon: GitBranch,
    label: "Bug triage",
    title: "Bug triage",
    body: "Linear integration. Convert a conversation into a tracked issue in one click — no copy-paste, no lost context.",
    points: ["One-click Linear issue", "Context preserved", "2.3s avg time to ticket"],
  },
]

const SCALE_STEP = 0.032

export function SaasLifecycleCards() {
  const colRef   = useRef<HTMLDivElement | null>(null)
  const wrapRefs = useRef<(HTMLDivElement | null)[]>([])
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    /* pin-base = sticky header height + a little breathing room */
    const pinBase = () => (window.innerWidth < 768 ? 68 : 96)
    const pinStep = () => (window.innerWidth < 768 ? 10 : 14)
    const spacerH = () => (window.innerWidth < 768 ? "22vh" : "30vh")

    /* size the spacer divs whenever viewport changes */
    const spacers = Array.from(
      colRef.current?.querySelectorAll<HTMLElement>("[data-spacer]") ?? []
    )
    const applySpacers = () => spacers.forEach(s => { s.style.height = spacerH() })
    applySpacers()

    /* lock column height so sticky children can pin */
    const lockHeight = () => {
      const col = colRef.current
      if (!col) return
      col.style.height = "auto"
      col.style.height = `${col.scrollHeight}px`
    }
    lockHeight()

    /* update sticky top values */
    const applyTops = () => {
      wrapRefs.current.forEach((wrap, i) => {
        if (wrap) wrap.style.top = `${pinBase() + i * pinStep()}px`
      })
    }
    applyTops()

    const onResize = () => {
      applySpacers()
      applyTops()
      lockHeight()
    }
    window.addEventListener("resize", onResize)

    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      return () => window.removeEventListener("resize", onResize)
    }

    /* scroll → scale stacking */
    let raf = 0
    const update = () => {
      raf = 0
      const vh  = window.innerHeight
      const n   = cardRefs.current.length
      const pinned: number[] = []

      for (let j = 0; j < n; j++) {
        const wrap = wrapRefs.current[j]
        if (!wrap) { pinned[j] = 0; continue }
        const pinY   = pinBase() + j * pinStep()
        const startY = vh * 0.78
        const top    = wrap.getBoundingClientRect().top
        pinned[j] = Math.min(1, Math.max(0, (startY - top) / (startY - pinY)))
      }

      cardRefs.current.forEach((card, i) => {
        if (!card) return
        let depth = 0
        for (let j = i + 1; j < n; j++) depth += pinned[j]
        card.style.transform = `scale(${Math.max(0.84, 1 - SCALE_STEP * depth)})`
      })
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)

    return () => {
      window.removeEventListener("scroll",  onScroll)
      window.removeEventListener("resize",  onScroll)
      window.removeEventListener("resize",  onResize)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    /* ── outer grid: single-col on mobile, 2-col on md+ ──────────────── */
    <div className="grid grid-cols-1 gap-y-6 md:grid-cols-[0.85fr_1fr] md:items-start md:gap-x-12 md:gap-y-0">

      {/* ── LEFT: sticky text panel (only sticks on md+) ──────────────── */}
      <div className="md:sticky md:top-28 md:self-start">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[11.5px] font-semibold tracking-wide text-primary">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          01 — Customer lifecycle
        </span>
        <h3 className="mt-4 text-[28px] font-semibold leading-[1.1] tracking-tight text-foreground sm:text-4xl md:mt-5 md:text-5xl">
          Built for the full{" "}
          <span className="text-primary">customer lifecycle.</span>
        </h3>
        <p className="mt-3 max-w-md text-[14px] leading-relaxed text-muted-foreground sm:text-[15px] md:mt-5">
          Activation, retention, and expansion — every stage handled in one inbox.
          Turn each play on as your team grows.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-3 md:mt-7">
          <Link
            href="/signup/"
            className="group inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:brightness-110"
          >
            Start Free
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/company/contact/"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground transition hover:bg-muted"
          >
            Book a demo
          </Link>
        </div>
      </div>

      {/* ── RIGHT: stacking sticky deck — works on every screen size ──── */}
      <div ref={colRef} className="self-start">
        {CARDS.map((c, i) => {
          const Icon   = c.icon
          const isLast = i === CARDS.length - 1
          return (
            <Fragment key={c.title}>
              {/* wrapper carries the sticky + top; top is set by JS */}
              <div
                ref={el => { wrapRefs.current[i] = el }}
                className="sticky"
                style={{ top: 96 + i * 14, zIndex: i + 1 }}
              >
                <div
                  ref={el => { cardRefs.current[i] = el }}
                  className="origin-top rounded-2xl border border-border bg-card shadow-[0_8px_32px_-8px_rgba(0,0,0,0.14)] transition-transform duration-200 will-change-transform sm:rounded-3xl"
                >
                  {/* card inner — tighter padding on mobile */}
                  <div className="p-5 sm:p-7">
                    <div className="flex items-start justify-between">
                      <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-primary sm:text-[11px]">
                        Stack · {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md shadow-primary/25 sm:h-11 sm:w-11">
                        <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                      </span>
                    </div>

                    <h4 className="mt-4 text-[18px] font-semibold tracking-tight text-foreground sm:mt-6 sm:text-[22px]">
                      {c.title}
                    </h4>
                    <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground sm:mt-3 sm:text-[14.5px]">
                      {c.body}
                    </p>

                    <ul className="mt-4 space-y-2 border-t border-border/60 pt-4 sm:mt-5 sm:space-y-3 sm:pt-5">
                      {c.points.map(p => (
                        <li key={p} className="flex items-center gap-2 text-[12.5px] font-medium text-foreground sm:gap-2.5 sm:text-[13.5px]">
                          <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary sm:h-5 sm:w-5">
                            <Check className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                          </span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* spacer — height set by JS based on viewport */}
              {!isLast && <div aria-hidden data-spacer style={{ height: "22vh" }} />}
            </Fragment>
          )
        })}
      </div>
    </div>
  )
}
