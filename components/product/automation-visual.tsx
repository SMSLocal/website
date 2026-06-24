"use client"

import { useEffect, useRef, useState } from "react"
import {
  CornerDownRight,
  Filter,
  MessageCircle,
  Send,
  Sparkles,
  UserRound,
} from "lucide-react"

/**
 * Animated workflow-builder mockup for the Automation hero.
 * Same dark-card language as the other product heroes: window chrome,
 * staggered entrance, a vertical node flow with a travelling pulse on the
 * connectors, a live execution counter, and two floating status chips.
 */

const NODES = [
  {
    kind: "Trigger",
    title: "New WhatsApp message",
    icon: MessageCircle,
    tint: "text-emerald-300 bg-emerald-400/12 border-emerald-400/25",
  },
  {
    kind: "Condition",
    title: 'Message contains "refund"',
    icon: Filter,
    tint: "text-amber-300 bg-amber-400/12 border-amber-400/25",
  },
  {
    kind: "Action",
    title: "Send refund policy",
    icon: Send,
    tint: "text-primary bg-primary/12 border-primary/30",
    ai: true,
  },
  {
    kind: "Fallback",
    title: "Assign to human agent",
    icon: UserRound,
    tint: "text-sky-300 bg-sky-400/12 border-sky-400/25",
  },
]

export function AutomationVisual() {
  const [active, setActive] = useState(0)
  const stepRef = useRef(0)

  useEffect(() => {
    const id = setInterval(() => {
      stepRef.current = (stepRef.current + 1) % NODES.length
      setActive(stepRef.current)
    }, 1100)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-8 -z-10 rounded-[32px] opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklch, var(--primary) 40%, transparent), transparent 70%)",
          animation: "autoGlow 6s ease-in-out infinite",
        }}
      />

      <div
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-[oklch(0.16_0.02_230)]/90 shadow-2xl backdrop-blur-xl"
        style={{ animation: "autoCardIn 0.9s cubic-bezier(0.22,1,0.36,1) both" }}
      >
        {/* Window chrome */}
        <div
          className="flex items-center justify-between border-b border-white/10 px-4 py-3"
          style={{ animation: "autoStagger 0.7s ease-out 0.05s both" }}
        >
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
          </div>
          <p className="font-mono text-[11px] text-white/55">automation · refund-flow</p>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-wider text-emerald-400">
            <span className="relative inline-flex h-1.5 w-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/70" />
              <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            Running
          </span>
        </div>

        {/* Flow */}
        <div className="px-5 py-5" style={{ animation: "autoStagger 0.7s ease-out 0.15s both" }}>
          <ol className="relative">
            {NODES.map((n, i) => {
              const Icon = n.icon
              const isActive = i === active
              return (
                <li key={n.kind} className="relative">
                  {/* Connector above (except first) */}
                  {i > 0 ? (
                    <div className="relative ml-[19px] h-6 w-px bg-white/12">
                      <span
                        aria-hidden
                        className="absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_10px_2px_color-mix(in_oklch,var(--primary)_60%,transparent)]"
                        style={{
                          top: isActive ? "100%" : "-8px",
                          opacity: isActive ? 1 : 0,
                          transition: "top 0.7s ease, opacity 0.3s ease",
                        }}
                      />
                    </div>
                  ) : null}

                  <div
                    className={`flex items-center gap-3 rounded-xl border px-3 py-3 transition-all duration-500 ${
                      isActive
                        ? "border-primary/40 bg-primary/[0.08] shadow-[0_0_0_1px_color-mix(in_oklch,var(--primary)_25%,transparent)]"
                        : "border-white/8 bg-white/[0.025]"
                    }`}
                  >
                    <span className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border ${n.tint}`}>
                      <Icon className="h-[18px] w-[18px]" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-1.5">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/45">
                          {n.kind}
                        </span>
                        {n.ai ? (
                          <span className="inline-flex items-center gap-0.5 rounded-full bg-primary/15 px-1.5 py-0.5 text-[8.5px] font-bold uppercase tracking-wide text-primary">
                            <Sparkles className="h-2.5 w-2.5" /> AI
                          </span>
                        ) : null}
                      </span>
                      <span className="mt-0.5 block truncate text-[13px] font-semibold text-white/90">
                        {n.title}
                      </span>
                    </span>
                    {isActive ? (
                      <span className="inline-flex h-5 items-center rounded-full bg-emerald-400/15 px-2 text-[9.5px] font-semibold uppercase tracking-wide text-emerald-300">
                        ✓ ok
                      </span>
                    ) : (
                      <CornerDownRight className="h-3.5 w-3.5 shrink-0 text-white/25" />
                    )}
                  </div>
                </li>
              )
            })}
          </ol>

        </div>
      </div>

      {/* Floating: AI assistant */}
      <div
        className="absolute -left-4 top-12 hidden rotate-[-5deg] rounded-xl border border-white/15 bg-[oklch(0.18_0.03_230)]/95 px-3 py-2 text-[11.5px] text-white/80 shadow-xl backdrop-blur md:block"
        style={{ animation: "autoFloatA 5.5s ease-in-out infinite, autoCardIn 0.9s ease-out 0.55s both" }}
      >
        <p className="flex items-center gap-1 font-semibold text-white">
          <Sparkles className="h-3 w-3 text-primary" /> AI assistant
        </p>
        <p className="text-white/55">Answered from knowledge base</p>
      </div>


      <style jsx>{`
        @keyframes autoCardIn {
          0% { opacity: 0; transform: translateY(14px) scale(0.98); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes autoStagger {
          0% { opacity: 0; transform: translateY(8px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes autoGlow {
          0%, 100% { opacity: 0.55; transform: scale(1); }
          50% { opacity: 0.85; transform: scale(1.04); }
        }
        @keyframes autoFloatA {
          0%, 100% { transform: rotate(-5deg) translateY(0); }
          50% { transform: rotate(-5deg) translateY(-6px); }
        }
@media (prefers-reduced-motion: reduce) {
          :global(*) {
            animation-duration: 0.001ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.001ms !important;
          }
        }
      `}</style>
    </div>
  )
}

function StatTile({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/45">{label}</p>
      <p className="mt-1 text-lg font-semibold tabular-nums text-white">{value}</p>
      <p className="text-[10.5px] text-white/45">{sub}</p>
    </div>
  )
}
