"use client"

import { useEffect, useRef, useState } from "react"
import { CreditCard, Gauge, GitBranch, Sparkles, TrendingUp, Zap } from "lucide-react"

// Container 500 × 420 — center at (250, 200), orbit ~155px
// Node positions verified no-overlap (each card 116 × 50, center card 158 × 68)
const CX = 250
const CY = 200

const NODES = [
  {
    key: "mrr", Icon: CreditCard,
    label: "MRR · Stripe", title: "₹3.5L/mo", meta: "Growth · annual",
    accent: "text-violet-600", iconBg: "bg-violet-100",
    borderColor: "rgba(124,58,237,0.28)", dotColor: "rgba(124,58,237,0.85)",
    x: 250, y: 42, floatDur: 8.2, floatDelay: 0,
  },
  {
    key: "lifecycle", Icon: TrendingUp,
    label: "Lifecycle", title: "Evangelist", meta: "Expansion-ready",
    accent: "text-emerald-600", iconBg: "bg-emerald-100",
    borderColor: "rgba(5,150,105,0.28)", dotColor: "rgba(5,150,105,0.85)",
    x: 426, y: 200, floatDur: 9.5, floatDelay: 0.9,
  },
  {
    key: "churn", Icon: Gauge,
    label: "Churn risk", title: "High", meta: "3× cancel signals",
    accent: "text-rose-600", iconBg: "bg-rose-100",
    borderColor: "rgba(225,29,72,0.28)", dotColor: "rgba(225,29,72,0.85)",
    x: 355, y: 356, floatDur: 7.6, floatDelay: 1.6,
  },
  {
    key: "tickets", Icon: GitBranch,
    label: "Open tickets", title: "2 · P1+P2", meta: "ACM-1284",
    accent: "text-amber-600", iconBg: "bg-amber-100",
    borderColor: "rgba(217,119,6,0.28)", dotColor: "rgba(217,119,6,0.85)",
    x: 145, y: 356, floatDur: 10.1, floatDelay: 2.2,
  },
  {
    key: "activity", Icon: Zap,
    label: "API Activity", title: "+38% MoM", meta: "Invoice paid",
    accent: "text-sky-600", iconBg: "bg-sky-100",
    borderColor: "rgba(2,132,199,0.28)", dotColor: "rgba(2,132,199,0.85)",
    x: 74, y: 200, floatDur: 8.6, floatDelay: 0.5,
  },
]

export function SaasCustomer360Mock() {
  const ref = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)
  const [churn, setChurn] = useState(82)
  const churnDir = useRef(-1)

  // Scale inner 500×420 canvas to fit whatever width the container gets
  useEffect(() => {
    const outer = ref.current
    const inner = innerRef.current
    if (!outer || !inner) return
    const update = () => {
      const scale = Math.min(1, outer.offsetWidth / 500)
      inner.style.transform = `scale(${scale})`
      outer.style.height = `${420 * scale}px`
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(outer)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setShown(true)
      return
    }
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect() } },
      { threshold: 0.14 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return
    const id = setInterval(() => {
      setChurn(c => {
        if (c >= 86) churnDir.current = -1
        else if (c <= 78) churnDir.current = 1
        return c + churnDir.current
      })
    }, 1500)
    return () => clearInterval(id)
  }, [])

  return (
    <div ref={ref} className="mx-auto w-full max-w-[500px] select-none overflow-hidden">
      <div ref={innerRef} className="relative" style={{ width: 500, height: 420, transformOrigin: "top left" }}>
      {/* Ambient center glow */}
      <span
        aria-hidden
        className="pointer-events-none absolute -z-10 rounded-full opacity-[0.18] blur-3xl"
        style={{
          left: CX - 150, top: CY - 150,
          width: 300, height: 300,
          background: "radial-gradient(circle, color-mix(in oklch, var(--primary) 80%, transparent), transparent 70%)",
        }}
      />

      {/* SVG: connector lines + traveling dots */}
      <svg
        aria-hidden
        viewBox="0 0 500 420"
        className="pointer-events-none absolute inset-0 h-full w-full"
      >
        <defs>
          {NODES.map(n => (
            <path key={n.key} id={`o360-${n.key}`} d={`M ${CX} ${CY} L ${n.x} ${n.y}`} />
          ))}
        </defs>

        {/* Outer halo ring around center */}
        <circle
          cx={CX} cy={CY} r={56}
          fill="none"
          stroke="color-mix(in oklch,var(--primary) 18%,transparent)"
          strokeWidth="1"
          strokeDasharray="2 5"
        />

        {/* Connector lines */}
        {NODES.map(n => (
          <line
            key={n.key}
            x1={CX} y1={CY} x2={n.x} y2={n.y}
            stroke={n.borderColor}
            strokeWidth="1.2"
            strokeDasharray="3 7"
          />
        ))}

        {/* Node anchor dots */}
        {NODES.map(n => (
          <circle
            key={`nd-${n.key}`}
            cx={n.x} cy={n.y} r={3.5}
            fill={n.dotColor}
            style={{ filter: `drop-shadow(0 0 5px ${n.dotColor})` }}
          />
        ))}

        {/* Traveling signal dots */}
        {shown && NODES.map((n, i) => (
          <circle key={`td-${n.key}`} r={2.5} fill={n.dotColor}>
            <animateMotion
              dur={`${3.4 + i * 0.42}s`}
              begin={`${i * 0.72}s`}
              repeatCount="indefinite"
              calcMode="linear"
            >
              <mpath href={`#o360-${n.key}`} />
            </animateMotion>
            <animate
              attributeName="opacity"
              values="0;0;1;1;0;0"
              keyTimes="0;0.06;0.18;0.82;0.94;1"
              dur={`${3.4 + i * 0.42}s`}
              begin={`${i * 0.72}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </svg>

      {/* ── Profile card (center anchor) ── */}
      <div className="absolute" style={{ left: CX, top: CY }}>
        <div
          className="w-[158px] rounded-2xl border border-border bg-card/96 p-3.5 shadow-[0_20px_50px_-16px_rgba(0,0,0,0.22)] backdrop-blur-xl"
          style={{
            opacity: shown ? 1 : 0,
            transform: shown
              ? "translate(-50%,-50%) scale(1)"
              : "translate(-50%,-50%) scale(0.84)",
            transition: "opacity 0.75s ease, transform 0.9s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <div className="flex items-center gap-2.5">
            <span className="relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[oklch(0.72_0.17_165)] text-[13px] font-bold text-primary-foreground">
              MC
              <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-card bg-emerald-500" />
            </span>
            <div className="min-w-0">
              <p className="text-[13px] font-semibold text-foreground">Mike Chen</p>
              <p className="text-[10.5px] text-muted-foreground">CEO @ Acme</p>
            </div>
          </div>
          <div className="mt-2.5 flex items-center justify-between gap-1">
            <span className="text-[10px] text-muted-foreground">18 mo customer</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-primary">
              <Sparkles className="h-2.5 w-2.5" /> 360
            </span>
          </div>
        </div>
      </div>

      {/* ── Satellite node cards ── */}
      {NODES.map((n, i) => {
        const Icon = n.Icon
        const title = n.key === "churn" ? `High · ${churn}` : n.title
        return (
          /* Outer: positioned at node coords; float animation shifts Y */
          <div
            key={n.key}
            className="absolute"
            style={{
              left: n.x,
              top: n.y,
              animation: shown
                ? `o360Float ${n.floatDur}s ease-in-out ${n.floatDelay}s infinite`
                : undefined,
            }}
          >
            {/* Inner: centering + opacity reveal (no transform conflict with outer) */}
            <div
              className="w-[116px] rounded-xl border bg-card/92 px-2.5 py-2 shadow-[0_8px_24px_-10px_rgba(0,0,0,0.16)] backdrop-blur-md"
              style={{
                borderColor: n.borderColor,
                transform: "translate(-50%,-50%)",
                opacity: shown ? 1 : 0,
                transition: `opacity 0.55s ease ${230 + i * 100}ms`,
              }}
            >
              <div className={`flex items-center gap-1.5 ${n.accent}`}>
                <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md ${n.iconBg}`}>
                  <Icon className="h-3 w-3" />
                </span>
                <span className="truncate text-[9px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                  {n.label}
                </span>
              </div>
              <p
                className={`mt-1 flex items-center gap-1 text-[12.5px] font-semibold leading-tight ${
                  n.key === "churn" ? "text-rose-600" : "text-foreground"
                }`}
              >
                {title}
                {n.key === "churn" && (
                  <span className="relative flex h-1.5 w-1.5 shrink-0">
                    <span className="absolute inset-0 animate-ping rounded-full bg-rose-500/70" />
                    <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-rose-500" />
                  </span>
                )}
              </p>
              <p className="mt-0.5 truncate text-[10px] text-muted-foreground">{n.meta}</p>
            </div>
          </div>
        )
      })}

      {/* Live sync chip */}
      <div
        aria-hidden
        className="absolute bottom-5 right-5 z-20 hidden items-center gap-1.5 rounded-full border border-emerald-500/20 bg-card/95 px-2.5 py-1 text-[9.5px] font-semibold text-emerald-600 shadow-lg backdrop-blur md:flex"
        style={{ animation: shown ? "o360Float 6.2s ease-in-out 1.1s infinite" : undefined }}
      >
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500/70" />
          <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
        </span>
        Live sync · all sources
      </div>

      <style jsx>{`
        @keyframes o360Float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-7px); }
        }
        @media (prefers-reduced-motion: reduce) {
          :global(*) {
            animation-duration: 0.001ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.001ms !important;
          }
        }
      `}</style>
      </div>{/* /inner 500×420 */}
    </div>
  )
}
