"use client"

import { useEffect, useRef, useState } from "react"
import {
  Headphones,
  Inbox,
  Instagram,
  Mail,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react"

/**
 * "Convergence" — the boxless problem section for the Inbox product page.
 *
 * Story told purely through motion, no cards: six scattered channels orbit a
 * glowing SMSLocal Inbox hub. Curved energy lines run from every channel into
 * the core, and light particles stream continuously inward — every tool's
 * context flowing into one timeline.
 *
 * Stage uses a fixed 16:9 viewBox so the SVG connectors and the HTML icon
 * nodes share one coordinate space and stay perfectly aligned at any width.
 * Honours prefers-reduced-motion (lines drawn, particles paused).
 */

const CX = 480
const CY = 270

type Node = {
  x: number
  y: number
  label: string
  Icon: typeof Mail
  float: string
  delay: string
}

// Six channels arranged on an ellipse around the central hub.
const NODES: Node[] = [
  { x: 151, y: 168, label: "WhatsApp", Icon: MessageCircle, float: "animate-float-slow", delay: "0s" },
  { x: 100, y: 270, label: "Gmail", Icon: Mail, float: "animate-float-slower", delay: "0.8s" },
  { x: 151, y: 372, label: "Instagram", Icon: Instagram, float: "animate-float-slow", delay: "1.4s" },
  { x: 809, y: 168, label: "Messenger", Icon: Send, float: "animate-float-slower", delay: "0.4s" },
  { x: 860, y: 270, label: "Voice", Icon: Phone, float: "animate-float-slow", delay: "1.1s" },
  { x: 809, y: 372, label: "Helpdesk", Icon: Headphones, float: "animate-float-slower", delay: "0.2s" },
]

// Quadratic curve from a node into the hub, bowed slightly for an organic arc.
function curve(nx: number, ny: number): string {
  const mx = (nx + CX) / 2
  const my = (ny + CY) / 2
  const dx = CX - nx
  const dy = CY - ny
  const len = Math.hypot(dx, dy) || 1
  const off = 46
  const cxp = mx + (-dy / len) * off
  const cyp = my + (dx / len) * off
  return `M ${nx} ${ny} Q ${cxp} ${cyp} ${CX} ${CY}`
}

export function ProblemShift() {
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
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className="mx-auto mt-10 w-full max-w-3xl">
      <div className="relative aspect-[16/9] w-full">
        {/* ── energy lines + flowing particles ────────────────────────── */}
        <svg
          viewBox="0 0 960 540"
          preserveAspectRatio="xMidYMid meet"
          className="absolute inset-0 h-full w-full text-primary"
          fill="none"
          aria-hidden
        >
          <defs>
            <radialGradient id="hub-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.35" />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* soft glow pool behind the hub */}
          <circle cx={CX} cy={CY} r="150" fill="url(#hub-glow)" />

          {NODES.map((n, i) => {
            const d = curve(n.x, n.y)
            return (
              <g key={n.label}>
                {/* base line — draws in on scroll */}
                <path
                  id={`flow-${i}`}
                  d={d}
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeOpacity={0.22}
                  pathLength={100}
                  style={{
                    strokeDasharray: 100,
                    strokeDashoffset: shown ? 0 : 100,
                    transition: "stroke-dashoffset 1.1s ease",
                    transitionDelay: `${i * 0.12}s`,
                  }}
                />
                {/* streaming particles flowing into the hub */}
                {shown && !reduced && (
                  <>
                    <circle r="3.5" fill="currentColor" className="drop-shadow-[0_0_6px_var(--primary)]">
                      <animateMotion dur="2.6s" begin={`${i * 0.42}s`} repeatCount="indefinite" rotate="auto">
                        <mpath xlinkHref={`#flow-${i}`} />
                      </animateMotion>
                    </circle>
                    <circle r="2" fill="currentColor" fillOpacity="0.6">
                      <animateMotion dur="2.6s" begin={`${i * 0.42 + 1.3}s`} repeatCount="indefinite">
                        <mpath xlinkHref={`#flow-${i}`} />
                      </animateMotion>
                    </circle>
                  </>
                )}
              </g>
            )
          })}
        </svg>

        {/* ── channel nodes (icons, no boxes) ─────────────────────────── */}
        {NODES.map((n) => (
          <div
            key={n.label}
            className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5"
            style={{ left: `${(n.x / 960) * 100}%`, top: `${(n.y / 540) * 100}%` }}
          >
            <span
              className={`relative inline-flex h-12 w-12 items-center justify-center rounded-full bg-background text-muted-foreground shadow-[0_8px_24px_-10px_rgba(0,0,0,0.4)] ring-1 ring-border ${
                reduced ? "" : n.float
              }`}
              style={{ animationDelay: n.delay }}
            >
              <n.Icon className="h-5 w-5" />
            </span>
            <span className="text-[11px] font-medium text-muted-foreground/80">{n.label}</span>
          </div>
        ))}

        {/* ── central hub: pulsing rings + glowing core ───────────────── */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: "50%", top: "50%" }}
        >
          {!reduced && (
            <>
              <span className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 animate-[pulse-ring_2.8s_ease-out_infinite] rounded-full border border-primary/40" />
              <span className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 animate-[pulse-ring_2.8s_ease-out_infinite] rounded-full border border-primary/30 [animation-delay:1.4s]" />
            </>
          )}
          <span className="relative inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/70 text-primary-foreground shadow-[0_0_40px_-6px_var(--primary)]">
            <Inbox className="h-8 w-8" />
          </span>
        </div>
      </div>

      {/* one-line takeaway — clean, boxless */}
      <p className="mx-auto mt-2 max-w-md text-center text-sm leading-relaxed text-muted-foreground">
        Six tools, endless tabs, lost context.{" "}
        <span className="font-semibold text-foreground">SMSLocal pulls every channel into one timeline</span> —
        so nothing slips and your whole team stays in sync.
      </p>
    </div>
  )
}
