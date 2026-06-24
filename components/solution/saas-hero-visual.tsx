"use client"

import { useEffect, useRef, useState } from "react"
import {
  AlertTriangle,
  ArrowRight,
  CreditCard,
  Gauge,
  Rocket,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react"

/**
 * Premium "Customer 360 / journey" dashboard for the SaaS hero.
 * Glassmorphism card on dark teal gradients, an animated journey-stage
 * tracker (onboarding → retention → expansion → churn), live metric cards,
 * an AI insights panel, floating metric cards, and slow-moving data
 * particles. All motion is client-only and loops subtly.
 */

const STAGES = [
  { icon: Rocket, label: "Onboarding" },
  { icon: Users, label: "Retention" },
  { icon: TrendingUp, label: "Expansion" },
  { icon: AlertTriangle, label: "Churn watch" },
]

// Deterministic particle field (no random → no hydration mismatch).
const PARTICLES = [
  { left: "8%", top: "18%", size: 4, dur: 9, delay: 0 },
  { left: "82%", top: "12%", size: 3, dur: 11, delay: 1.5 },
  { left: "68%", top: "40%", size: 5, dur: 13, delay: 0.8 },
  { left: "20%", top: "62%", size: 3, dur: 10, delay: 2.2 },
  { left: "90%", top: "70%", size: 4, dur: 12, delay: 0.4 },
  { left: "45%", top: "88%", size: 3, dur: 14, delay: 1.1 },
  { left: "12%", top: "84%", size: 4, dur: 11, delay: 2.6 },
  { left: "58%", top: "8%", size: 3, dur: 10, delay: 1.9 },
]

export function SaasHeroVisual() {
  const [stage, setStage] = useState(0)
  const [routed, setRouted] = useState(false)
  const [churn, setChurn] = useState(82)
  const dir = useRef(1)

  useEffect(() => {
    const id = setInterval(() => setStage((s) => (s + 1) % STAGES.length), 2200)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const id = setInterval(() => setRouted((r) => !r), 3600)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const id = setInterval(() => {
      setChurn((c) => {
        if (c >= 88) dir.current = -1
        else if (c <= 76) dir.current = 1
        return c + dir.current * (Math.floor(Math.random() * 2) + 1)
      })
    }, 1400)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-10 -z-10 rounded-[40px] opacity-90 blur-3xl"
        style={{
          background:
            "radial-gradient(60% 60% at 70% 30%, color-mix(in oklch, var(--primary) 55%, transparent), transparent 70%)",
          animation: "saasGlow 7s ease-in-out infinite",
        }}
      />
      {/* Extra bottom glow for depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-8 -left-8 -z-10 h-64 w-64 rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.72 0.17 165), transparent 70%)" }}
      />

      {/* Slow-moving data particles */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-primary/60"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              boxShadow: "0 0 8px color-mix(in oklch, var(--primary) 70%, transparent)",
              animation: `saasParticle ${p.dur}s ease-in-out ${p.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Main glass card */}
      <div
        className="relative overflow-hidden rounded-2xl border border-white/20 backdrop-blur-xl"
        style={{
          background: "linear-gradient(160deg, oklch(0.24 0.04 200 / 0.95), oklch(0.20 0.03 230 / 0.97))",
          boxShadow: "0 0 0 1px color-mix(in oklch, var(--primary) 15%, transparent), 0 25px 60px -12px rgba(0,0,0,0.7), 0 0 40px -8px color-mix(in oklch, var(--primary) 20%, transparent)",
          animation: "saasCardIn 0.9s cubic-bezier(0.22,1,0.36,1) both",
        }}
      >
        {/* sheen */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"
        />

        {/* Window chrome */}
        <div
          className="flex items-center justify-between border-b border-white/10 px-4 py-3"
          style={{ animation: "saasStagger 0.7s ease-out 0.05s both" }}
        >
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
          </div>
          <p className="font-mono text-[11px] text-white/55">customer · mike-chen</p>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-wider text-primary">
            <Gauge className="h-3 w-3" /> Customer 360
          </span>
        </div>

        <div className="px-4 py-3">
          {/* Profile */}
          <div className="flex items-center gap-2.5" style={{ animation: "saasStagger 0.7s ease-out 0.15s both" }}>
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[oklch(0.72_0.17_175)] text-[13px] font-semibold text-primary-foreground">
              MC
            </span>
            <div className="min-w-0">
              <p className="text-[13px] font-semibold text-white">Mike Chen</p>
              <p className="text-[11px] text-white/55">CEO @ Acme</p>
            </div>
            <span className="ml-auto rounded-full border border-white/12 bg-white/5 px-2 py-0.5 text-[10px] font-medium text-white/70">
              18 months customer
            </span>
          </div>

          {/* Journey stage tracker */}
          <div className="mt-3" style={{ animation: "saasStagger 0.7s ease-out 0.22s both" }}>
            <div className="relative flex items-center justify-between">
              <span aria-hidden className="absolute inset-x-3 top-3 h-px bg-white/10" />
              <span
                aria-hidden
                className="absolute top-3 h-px bg-primary transition-all duration-700"
                style={{ left: "0.75rem", width: `calc(${(stage / (STAGES.length - 1)) * 100}% - 0.75rem)` }}
              />
              {STAGES.map((s, i) => {
                const Icon = s.icon
                const active = i === stage
                const done = i < stage
                return (
                  <div key={s.label} className="relative z-10 flex flex-1 flex-col items-center gap-1">
                    <span
                      className={`inline-flex h-6 w-6 items-center justify-center rounded-full border transition-all duration-500 ${
                        active
                          ? "scale-110 border-primary bg-primary text-primary-foreground shadow-[0_0_0_3px_color-mix(in_oklch,var(--primary)_22%,transparent)]"
                          : done
                            ? "border-primary/50 bg-primary/20 text-primary"
                            : "border-white/15 bg-white/[0.03] text-white/40"
                      }`}
                    >
                      <Icon className="h-3 w-3" />
                    </span>
                    <span className={`text-[9px] font-medium transition-colors ${active ? "text-white" : "text-white/45"}`}>
                      {s.label}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Metric cards */}
          <div className="mt-3 grid grid-cols-2 gap-1.5" style={{ animation: "saasStagger 0.7s ease-out 0.3s both" }}>
            <MetricCard icon={CreditCard} source="Stripe" label="MRR" value="₹3.5L/mo" tint="text-violet-300" />
            <MetricCard icon={Users} source="Plan" label="Subscription" value="Growth Annual" tint="text-sky-300" />
            <MetricCard icon={TrendingUp} source="HubSpot" label="Lifecycle" value="Customer" tint="text-emerald-300" />
            <div className="relative overflow-hidden rounded-xl border border-rose-400/30 bg-rose-400/[0.08] p-2.5">
              <div className="flex items-center gap-1.5">
                <span className="relative inline-flex h-1.5 w-1.5">
                  <span className="absolute inset-0 animate-ping rounded-full bg-rose-400/70" />
                  <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-rose-400" />
                </span>
                <span className="text-[9px] font-semibold uppercase tracking-[0.12em] text-rose-300">Risk</span>
              </div>
              <p className="mt-1 text-[12px] font-semibold text-white">High churn risk</p>
              <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-rose-400 transition-[width] duration-700" style={{ width: `${churn}%` }} />
              </div>
            </div>
          </div>

          {/* AI insights panel */}
          <div
            className="relative mt-2.5 overflow-hidden rounded-xl border border-primary/30 bg-primary/[0.08] px-3 py-2"
            style={{ animation: "saasStagger 0.7s ease-out 0.38s both" }}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/12 to-transparent"
              style={{ animation: "saasScan 3s linear infinite" }}
            />
            <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-primary">
              <Sparkles className="h-3 w-3" /> AI Captain
            </p>
            <p className="mt-0.5 flex items-start gap-1.5 text-[11.5px] leading-snug text-white/85">
              <AlertTriangle className="mt-0.5 h-3 w-3 shrink-0 text-amber-400" />
              Churn risk detected. Mentioned "cancel" 3 times this week.
            </p>
          </div>

          {/* Route action */}
          <div
            className="mt-2 flex items-center gap-2 rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2"
            style={{ animation: "saasStagger 0.7s ease-out 0.46s both" }}
          >
            <span className="text-[11px] text-white/55">Action</span>
            <ArrowRight className="h-3 w-3 text-white/35" />
            <span
              className={`inline-flex items-center gap-1.5 rounded-lg px-2 py-0.5 text-[11px] font-semibold transition-all duration-500 ${
                routed ? "bg-primary text-primary-foreground" : "bg-primary/15 text-primary"
              }`}
            >
              <Users className="h-3 w-3" />
              Route to Customer Success
            </span>
            {routed ? (
              <span className="ml-auto text-[10px] font-semibold text-emerald-400">✓ assigned</span>
            ) : (
              <span className="ml-auto text-[10px] text-white/40">routing…</span>
            )}
          </div>
        </div>
      </div>

      {/* Floating: expansion */}
      <div
        className="absolute -right-4 top-28 hidden rotate-[4deg] rounded-xl border border-white/15 bg-[oklch(0.18_0.03_200)]/95 px-3 py-2 text-[11.5px] text-white/80 shadow-xl backdrop-blur md:block"
        style={{ animation: "saasFloatB 6.5s ease-in-out infinite, saasCardIn 0.9s ease-out 0.75s both" }}
      >
        <p className="flex items-center gap-1 font-semibold text-emerald-400">
          <TrendingUp className="h-3 w-3" /> ₹40L expansion
        </p>
        <p className="text-white/55">Usage up 3× this month</p>
      </div>

      {/* Floating: activation */}
      <div
        className="absolute -left-5 bottom-16 hidden -rotate-[5deg] rounded-xl border border-white/15 bg-[oklch(0.18_0.03_200)]/95 px-3 py-2 text-[11.5px] text-white/80 shadow-xl backdrop-blur lg:block"
        style={{ animation: "saasFloatA 7.5s ease-in-out infinite, saasCardIn 0.9s ease-out 0.9s both" }}
      >
        <p className="flex items-center gap-1 font-semibold text-primary">
          <Rocket className="h-3 w-3" /> 85% activated
        </p>
        <p className="text-white/55">Onboarding week 1</p>
      </div>

      <style jsx>{`
        @keyframes saasCardIn {
          0% { opacity: 0; transform: translateY(14px) scale(0.98); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes saasStagger {
          0% { opacity: 0; transform: translateY(8px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes saasGlow {
          0%, 100% { opacity: 0.55; transform: scale(1); }
          50% { opacity: 0.85; transform: scale(1.05); }
        }
        @keyframes saasScan {
          0% { left: -33%; }
          100% { left: 133%; }
        }
        @keyframes saasParticle {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.25; }
          50% { transform: translateY(-18px) translateX(6px); opacity: 0.8; }
        }
        @keyframes saasFloatB {
          0%, 100% { transform: rotate(4deg) translateY(0); }
          50% { transform: rotate(4deg) translateY(-6px); }
        }
        @keyframes saasFloatA {
          0%, 100% { transform: rotate(-5deg) translateY(0); }
          50% { transform: rotate(-5deg) translateY(7px); }
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

function MetricCard({
  icon: Icon,
  source,
  label,
  value,
  tint,
}: {
  icon: React.ComponentType<{ className?: string }>
  source: string
  label: string
  value: string
  tint: string
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-2 transition-colors hover:border-primary/25">
      <div className="flex items-center gap-1.5">
        <Icon className={`h-3 w-3 ${tint}`} />
        <span className="text-[9px] font-semibold uppercase tracking-[0.12em] text-white/45">{source}</span>
      </div>
      <p className="mt-0.5 text-[9.5px] text-white/40">{label}</p>
      <p className="text-[11.5px] font-semibold text-white">{value}</p>
    </div>
  )
}
