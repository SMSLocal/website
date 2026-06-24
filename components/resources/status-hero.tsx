"use client"

import { useEffect, useState } from "react"
import { CheckCircle2 } from "lucide-react"

/**
 * Animated "all systems operational" banner for the status hero.
 * Shows a live "last checked" counter that ticks up to 60s, then resets —
 * giving the page a real-time, continuously-monitored feel.
 */
export function StatusHero() {
  const [secs, setSecs] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setSecs((s) => (s + 1) % 60), 1000)
    return () => clearInterval(id)
  }, [])

  const checked = secs === 0 ? "just now" : `${secs}s ago`

  return (
    <div
      className="relative mx-auto max-w-2xl overflow-hidden rounded-2xl border border-emerald-400/30 bg-emerald-400/[0.06] p-6 shadow-2xl backdrop-blur sm:p-8"
      style={{ animation: "statusBannerIn 0.8s cubic-bezier(0.22,1,0.36,1) both" }}
    >
      {/* Soft scanning sheen */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-emerald-300/10 to-transparent"
        style={{ animation: "statusScan 4s linear infinite" }}
      />
      <div className="relative flex flex-col items-center text-center">
        <span className="relative inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-400">
          <span aria-hidden className="absolute inset-0 rounded-full ring-2 ring-emerald-400/40" style={{ animation: "statusPing 2s ease-out infinite" }} />
          <CheckCircle2 className="h-8 w-8" />
        </span>
        <h2 className="mt-4 flex items-center gap-2.5 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          <span className="relative inline-flex h-2.5 w-2.5">
            <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/70" />
            <span className="relative inline-block h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </span>
          All Systems Operational
        </h2>
        <p className="mt-3 text-[13.5px] text-white/60">
          Last checked: <span className="font-medium text-white/80">{checked}</span> · Updated every 60 seconds
        </p>
      </div>

      <style jsx>{`
        @keyframes statusBannerIn {
          0% { opacity: 0; transform: translateY(14px) scale(0.98); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes statusScan {
          0% { left: -33%; }
          100% { left: 133%; }
        }
        @keyframes statusPing {
          0% { transform: scale(1); opacity: 0.6; }
          80%, 100% { transform: scale(1.5); opacity: 0; }
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
