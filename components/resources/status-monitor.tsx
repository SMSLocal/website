"use client"

import { useEffect, useState } from "react"
import { Activity, Bot, Database, MessageSquare, Server } from "lucide-react"

/**
 * "Live system monitoring" widget — a futuristic infra card with an animated
 * heartbeat line and per-system rows whose latency values gently fluctuate to
 * convey real-time monitoring. All values are illustrative.
 */

const SYSTEMS = [
  { key: "api", label: "API", icon: Server, base: 42 },
  { key: "db", label: "Database", icon: Database, base: 18 },
  { key: "msg", label: "Messaging", icon: MessageSquare, base: 64 },
  { key: "ai", label: "AI", icon: Bot, base: 120 },
]

export function StatusMonitor() {
  const [latency, setLatency] = useState<Record<string, number>>(() =>
    Object.fromEntries(SYSTEMS.map((s) => [s.key, s.base])),
  )

  useEffect(() => {
    let n = 0
    const id = setInterval(() => {
      n += 1
      setLatency(() =>
        Object.fromEntries(
          SYSTEMS.map((s) => {
            // Deterministic-ish wobble (avoids hydration mismatch on first paint).
            const wobble = Math.round(Math.sin(n * 0.7 + s.base) * 6 + Math.cos(n * 1.3) * 3)
            return [s.key, Math.max(6, s.base + wobble)]
          }),
        ),
      )
    }, 1600)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[oklch(0.16_0.02_230)] p-6 shadow-2xl sm:p-7">
      <div aria-hidden className="bg-grid-ink pointer-events-none absolute inset-0 opacity-40" />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-50 blur-3xl"
        style={{ background: "radial-gradient(circle, color-mix(in oklch, var(--primary) 40%, transparent), transparent 70%)" }}
      />

      <div className="relative">
        {/* Heartbeat header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/45">System heartbeat</p>
            <p className="mt-1 flex items-center gap-2 text-[15px] font-semibold text-white">
              <span className="relative inline-flex h-2 w-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/70" />
                <span className="relative inline-block h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Online
            </p>
          </div>
          <Activity className="h-5 w-5 text-emerald-400" />
        </div>

        {/* Heartbeat line */}
        <div className="mt-4 h-12 overflow-hidden rounded-lg border border-white/8 bg-white/[0.02]">
          <svg viewBox="0 0 240 48" preserveAspectRatio="none" className="h-full w-full">
            <polyline
              points="0,24 30,24 40,24 48,10 56,38 64,24 96,24 104,24 112,16 120,32 128,24 168,24 176,8 184,40 192,24 240,24"
              fill="none"
              stroke="color-mix(in oklch, var(--primary) 80%, white)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ strokeDasharray: 600, strokeDashoffset: 600, animation: "monHeartbeat 2.6s linear infinite" }}
            />
          </svg>
        </div>

        {/* Systems */}
        <ul className="mt-5 space-y-2">
          {SYSTEMS.map((s) => {
            const Icon = s.icon
            return (
              <li key={s.key} className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.025] px-3 py-2.5">
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5 text-white/70">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="text-[13px] font-medium text-white/85">{s.label}</span>
                <span className="ml-auto font-mono text-[11px] text-white/45 tabular-nums">{latency[s.key]}ms</span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/12 px-2 py-0.5 text-[10.5px] font-semibold text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" style={{ animation: "monBlink 1.8s ease-in-out infinite" }} />
                  Healthy
                </span>
              </li>
            )
          })}
        </ul>
      </div>

      <style jsx>{`
        @keyframes monHeartbeat {
          0% { stroke-dashoffset: 600; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes monBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @media (prefers-reduced-motion: reduce) {
          :global(*) {
            animation-duration: 0.001ms !important;
            animation-iteration-count: 1 !important;
          }
        }
      `}</style>
    </div>
  )
}
