"use client"

import { Sparkles, TrendingUp, Wrench } from "lucide-react"

/**
 * "Latest release" announcement card for the changelog hero.
 * Static dark-card preview matching the product-hero visual language, with a
 * staggered entrance and a few highlight rows.
 */
export function ChangelogHeroVisual() {
  const rows = [
    { kind: "New", chip: "border-emerald-400/25 bg-emerald-400/12 text-emerald-300", icon: Sparkles, t: "Voice is now generally available" },
    { kind: "New", chip: "border-emerald-400/25 bg-emerald-400/12 text-emerald-300", icon: Sparkles, t: "Click-to-call from any profile" },
    { kind: "Improved", chip: "border-sky-400/25 bg-sky-400/12 text-sky-300", icon: TrendingUp, t: "AI Agent in 8 Indian languages" },
    { kind: "Fixed", chip: "border-rose-400/25 bg-rose-400/12 text-rose-300", icon: Wrench, t: "WhatsApp media renders inline" },
  ]
  return (
    <div className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-8 -z-10 rounded-[32px] opacity-70 blur-3xl"
        style={{
          background: "radial-gradient(circle, color-mix(in oklch, var(--primary) 40%, transparent), transparent 70%)",
          animation: "clogGlow 6s ease-in-out infinite",
        }}
      />
      <div
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-[oklch(0.16_0.02_230)]/90 shadow-2xl backdrop-blur-xl"
        style={{ animation: "clogCardIn 0.9s cubic-bezier(0.22,1,0.36,1) both" }}
      >
        {/* Chrome */}
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3" style={{ animation: "clogStagger 0.7s ease-out 0.05s both" }}>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
          </div>
          <p className="font-mono text-[11px] text-white/55">releases · latest</p>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-wider text-emerald-400">
            <span className="relative inline-flex h-1.5 w-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/70" />
              <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            Shipped
          </span>
        </div>

        <div className="px-5 py-5">
          <div className="flex items-center justify-between" style={{ animation: "clogStagger 0.7s ease-out 0.15s both" }}>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/45">Version</p>
              <p className="text-3xl font-semibold tracking-tight text-white">v3.0.0</p>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-primary">
                Major Release
              </span>
              <p className="mt-1.5 text-[12px] text-white/55">June 16, 2026</p>
            </div>
          </div>

          <div className="mt-5 space-y-2">
            {rows.map((r, i) => {
              const Icon = r.icon
              return (
                <div
                  key={r.t}
                  className="flex items-center gap-2.5 rounded-xl border border-white/8 bg-white/[0.025] px-3 py-2.5"
                  style={{ animation: `clogStagger 0.7s ease-out ${0.25 + i * 0.08}s both` }}
                >
                  <span className={`inline-flex h-5 w-[74px] shrink-0 items-center justify-center gap-1 rounded-full border text-[9.5px] font-bold uppercase tracking-wide ${r.chip}`}>
                    <Icon className="h-2.5 w-2.5" />
                    {r.kind}
                  </span>
                  <span className="truncate text-[12.5px] font-medium text-white/85">{r.t}</span>
                </div>
              )
            })}
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4" style={{ animation: "clogStagger 0.7s ease-out 0.6s both" }}>
            <span className="text-[11.5px] text-white/45">5 changes · 3 new · 1 improved · 1 fixed</span>
            <span className="font-mono text-[11px] text-primary">read notes →</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes clogCardIn {
          0% { opacity: 0; transform: translateY(14px) scale(0.98); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes clogStagger {
          0% { opacity: 0; transform: translateY(8px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes clogGlow {
          0%, 100% { opacity: 0.55; transform: scale(1); }
          50% { opacity: 0.85; transform: scale(1.04); }
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
