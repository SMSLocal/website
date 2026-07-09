"use client"

import { useEffect, useRef, useState } from "react"
import { CheckCircle2, Loader2, Radio, Send, Sparkles, TrendingUp } from "lucide-react"

type FeedRow = {
  id: number
  phone: string
  carrier: "Jio" | "Airtel" | "Vi" | "BSNL"
  status: "delivered" | "pending"
  lang: "EN" | "HI" | "TA" | "TE" | "BN" | "MR"
  ms: number
}

const TARGET = 50000
const START = { delivered: 41280, pending: 8320, failed: 140 }
const CARRIERS: FeedRow["carrier"][] = ["Jio", "Airtel", "Vi", "BSNL"]
const LANGS: FeedRow["lang"][] = ["EN", "HI", "TA", "TE", "BN", "MR"]

function randomPhone() {
  const prefix = [70, 72, 75, 77, 78, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 93, 94, 95, 96, 97, 98, 99][
    Math.floor(Math.random() * 24)
  ]
  const body = Math.floor(10000000 + Math.random() * 90000000).toString()
  return `+91 ${prefix} ${body.slice(0, 4)} ${body.slice(4, 8).replace(/\d{2}$/, "••")}`
}

/**
 * Live bulk SMS campaign visual for the hero.
 * Combines tweened counters, a streaming delivery feed, pulsing carrier bars,
 * and two floating status chips with staggered entrance animations.
 */
export function BulkSmsVisual() {
  // Smoothly tweened "display" values chase the real target values.
  const [targets, setTargets] = useState(START)
  const [display, setDisplay] = useState(START)

  // Streaming feed. Seeded with fixed placeholder rows so server and client
  // render identically; real random rows are filled in after mount.
  const [feed, setFeed] = useState<FeedRow[]>([
    { id: 1, phone: "+91 98 4021 33••", carrier: "Jio", status: "delivered", lang: "EN", ms: 240 },
    { id: 2, phone: "+91 87 3694 45••", carrier: "Airtel", status: "delivered", lang: "HI", ms: 310 },
    { id: 3, phone: "+91 90 1178 62••", carrier: "Vi", status: "delivered", lang: "TA", ms: 265 },
    { id: 4, phone: "+91 82 6179 27••", carrier: "BSNL", status: "delivered", lang: "TE", ms: 350 },
  ])

  // Floating "+N delivered in last 10s" chip.
  const [recentBatch, setRecentBatch] = useState(4120)

  // Replace the seeded placeholder feed with real random rows, client-only.
  useEffect(() => {
    const now = Date.now()
    setFeed(
      Array.from({ length: 4 }, (_, i) => ({
        id: now - i * 1000,
        phone: randomPhone(),
        carrier: CARRIERS[Math.floor(Math.random() * CARRIERS.length)],
        status: "delivered" as const,
        lang: LANGS[Math.floor(Math.random() * LANGS.length)],
        ms: Math.floor(Math.random() * 450) + 180,
      })),
    )
  }, [])

  // 1) Target counters tick forward steadily, resetting at completion.
  useEffect(() => {
    const id = setInterval(() => {
      setTargets((c) => {
        if (c.delivered + c.pending + c.failed >= TARGET || c.pending <= 0) {
          return START
        }
        const delta = Math.floor(Math.random() * 260) + 180
        const move = Math.min(c.pending, delta)
        const fails = Math.random() < 0.12 ? Math.floor(Math.random() * 3) : 0
        return {
          delivered: c.delivered + (move - fails),
          pending: c.pending - move,
          failed: c.failed + fails,
        }
      })
      setRecentBatch(() => Math.floor(Math.random() * 2200) + 3200)
    }, 1400)
    return () => clearInterval(id)
  }, [])

  // 2) rAF tween: display chases target so numbers roll smoothly.
  const rafRef = useRef<number | null>(null)
  useEffect(() => {
    const tick = () => {
      setDisplay((prev) => {
        const ease = (a: number, b: number) => a + (b - a) * 0.18
        const next = {
          delivered: ease(prev.delivered, targets.delivered),
          pending: ease(prev.pending, targets.pending),
          failed: ease(prev.failed, targets.failed),
        }
        // Snap when close enough and stop scheduling frames — the effect
        // restarts the loop automatically the next time `targets` changes.
        if (
          Math.abs(next.delivered - targets.delivered) < 0.5 &&
          Math.abs(next.pending - targets.pending) < 0.5 &&
          Math.abs(next.failed - targets.failed) < 0.5
        ) {
          return targets
        }
        rafRef.current = requestAnimationFrame(tick)
        return next
      })
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [targets])

  // 3) Streaming feed: push a new row, trim to 4 visible.
  useEffect(() => {
    const id = setInterval(() => {
      setFeed((prev) => {
        const row: FeedRow = {
          id: Date.now() + Math.random(),
          phone: randomPhone(),
          carrier: CARRIERS[Math.floor(Math.random() * CARRIERS.length)],
          status: Math.random() < 0.18 ? "pending" : "delivered",
          lang: LANGS[Math.floor(Math.random() * LANGS.length)],
          ms: Math.floor(Math.random() * 450) + 180,
        }
        return [row, ...prev].slice(0, 4)
      })
    }, 1200)
    return () => clearInterval(id)
  }, [])

  // 4) Promote pending rows to delivered shortly after they appear.
  useEffect(() => {
    const id = setInterval(() => {
      setFeed((prev) =>
        prev.map((r, i) => (i > 0 && r.status === "pending" ? { ...r, status: "delivered" } : r)),
      )
    }, 900)
    return () => clearInterval(id)
  }, [])

  const total = display.delivered + display.pending + display.failed
  const deliveredPct = total ? (display.delivered / total) * 100 : 0
  const pendingPct = total ? (display.pending / total) * 100 : 0
  const failedPct = total ? (display.failed / total) * 100 : 0

  return (
    <div className="relative">
      {/* Ambient animated glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-8 -z-10 rounded-[32px] opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklch, var(--primary) 40%, transparent), transparent 70%)",
          animation: "bulkGlow 6s ease-in-out infinite",
        }}
      />

      {/* Card */}
      <div
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-[oklch(0.16_0.02_230)]/90 shadow-2xl backdrop-blur-xl"
        style={{ animation: "bulkCardIn 0.9s cubic-bezier(0.22,1,0.36,1) both" }}
      >
        {/* Window chrome */}
        <div
          className="flex items-center justify-between border-b border-white/10 px-4 py-3"
          style={{ animation: "bulkStagger 0.7s ease-out 0.05s both" }}
        >
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
          </div>
          <p className="font-mono text-[11px] text-white/55">campaign · festival-sale-oct</p>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-wider text-emerald-400">
            <span className="relative inline-flex h-1.5 w-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/70" />
              <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            Live
          </span>
        </div>

        <div className="px-4 py-4">
          {/* Headline counter */}
          <div style={{ animation: "bulkStagger 0.7s ease-out 0.15s both" }}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/50">
              Campaign progress
            </p>
            <div className="mt-1.5 flex items-baseline gap-2">
              <span className="text-2xl font-semibold tracking-tight text-white tabular-nums">
                {Math.round(total).toLocaleString("en-IN")}
              </span>
              <span className="text-[12.5px] text-white/55">
                of {TARGET.toLocaleString("en-IN")} sent
              </span>
            </div>

            {/* Stacked progress bar */}
            <div className="relative mt-3 h-2 overflow-hidden rounded-full bg-white/10">
              <div className="absolute inset-0 flex">
                <span
                  className="h-full bg-emerald-400 transition-[width] duration-700 ease-out"
                  style={{ width: `${deliveredPct}%` }}
                />
                <span
                  className="h-full bg-amber-400 transition-[width] duration-700 ease-out"
                  style={{ width: `${pendingPct}%` }}
                />
                <span
                  className="h-full bg-rose-400 transition-[width] duration-700 ease-out"
                  style={{ width: `${failedPct}%` }}
                />
              </div>
              {/* Travelling shimmer */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-white/35 to-transparent"
                style={{ animation: "bulkShimmer 2.6s linear infinite" }}
              />
            </div>
          </div>

          {/* Counter tiles */}
          <div
            className="mt-4 grid grid-cols-3 gap-2"
            style={{ animation: "bulkStagger 0.7s ease-out 0.25s both" }}
          >
            <CounterTile
              label="Delivered"
              value={display.delivered}
              tone="emerald"
              icon={CheckCircle2}
            />
            <CounterTile
              label="Pending"
              value={display.pending}
              tone="amber"
              icon={Loader2}
              spin
            />
            <CounterTile label="Failed" value={display.failed} tone="rose" icon={Send} />
          </div>

          {/* Live feed */}
          <div
            className="mt-4"
            style={{ animation: "bulkStagger 0.7s ease-out 0.35s both" }}
          >
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/50">
                Live delivery feed
              </p>
              <span className="font-mono text-[10.5px] text-white/40">last 4 events</span>
            </div>
            <ul className="mt-1.5 space-y-1">
              {feed.map((row, i) => (
                <li
                  key={row.id}
                  className="flex items-center gap-2 rounded-lg border border-white/5 bg-white/[0.03] px-2 py-1 will-change-transform"
                  style={{
                    animation: i === 0 ? "bulkRowIn 0.55s cubic-bezier(0.22,1,0.36,1) both" : undefined,
                    opacity: 1 - i * 0.12,
                  }}
                >
                  <span
                    className={`inline-flex h-5 w-5 flex-none items-center justify-center rounded-md ${
                      row.status === "delivered"
                        ? "bg-emerald-400/15 text-emerald-400"
                        : "bg-amber-400/15 text-amber-400"
                    }`}
                  >
                    {row.status === "delivered" ? (
                      <CheckCircle2 className="h-3 w-3" />
                    ) : (
                      <Loader2 className="h-3 w-3 animate-spin" />
                    )}
                  </span>
                  <span className="font-mono text-[11.5px] text-white/80 tabular-nums">
                    {row.phone}
                  </span>
                  <span className="inline-flex items-center rounded-sm border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[9.5px] font-semibold text-white/60">
                    {row.lang}
                  </span>
                  <span className="ml-auto font-mono text-[10.5px] text-white/45">
                    {row.carrier} · {row.ms}ms
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Carrier lines */}
          <div
            className="mt-4 space-y-1.5"
            style={{ animation: "bulkStagger 0.7s ease-out 0.45s both" }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/50">
              By carrier
            </p>
            {[
              { name: "Jio", pct: 42 },
              { name: "Airtel", pct: 31 },
              { name: "Vi", pct: 19 },
              { name: "BSNL", pct: 8 },
            ].map((c, i) => (
              <div key={c.name} className="flex items-center gap-3">
                <div className="flex w-12 items-center gap-1.5">
                  <Radio className="h-3 w-3 text-primary" />
                  <span className="text-[11.5px] font-medium text-white/75">{c.name}</span>
                </div>
                <div className="relative h-1 flex-1 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-[oklch(0.72_0.17_165)]"
                    style={{
                      width: `${c.pct}%`,
                      animation: `bulkBarPulse 3s ease-in-out ${i * 0.3}s infinite`,
                    }}
                  />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-y-0 w-8 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    style={{
                      animation: `bulkBarShimmer 2.8s linear ${i * 0.45}s infinite`,
                    }}
                  />
                </div>
                <span className="w-10 text-right font-mono text-[11px] text-white/55 tabular-nums">
                  {c.pct}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating: +N delivered */}
      <div
        className="absolute -left-4 top-10 hidden rotate-[-5deg] rounded-xl border border-white/15 bg-[oklch(0.18_0.03_230)]/95 px-3 py-2 text-[11.5px] text-white/80 shadow-xl backdrop-blur md:block"
        style={{ animation: "bulkFloatA 5.5s ease-in-out infinite, bulkCardIn 0.9s ease-out 0.55s both" }}
      >
        <p className="flex items-center gap-1 font-semibold text-emerald-400">
          <TrendingUp className="h-3 w-3" />
          <span className="tabular-nums">+{recentBatch.toLocaleString("en-IN")} delivered</span>
        </p>
        <p className="text-white/55">in the last 10s</p>
      </div>

      {/* Floating: AI routing */}
      <div
        className="absolute -right-3 bottom-16 hidden rotate-[4deg] rounded-xl border border-white/15 bg-[oklch(0.18_0.03_230)]/95 px-3 py-2 text-[11.5px] text-white/80 shadow-xl backdrop-blur md:block"
        style={{ animation: "bulkFloatB 6.5s ease-in-out infinite, bulkCardIn 0.9s ease-out 0.75s both" }}
      >
        <p className="flex items-center gap-1 font-semibold text-white">
          <Sparkles className="h-3 w-3 text-primary" />
          AI route failover
        </p>
        <p className="text-white/55">Switched 312 msgs · Airtel → Jio</p>
      </div>

      <style jsx>{`
        @keyframes bulkCardIn {
          0% {
            opacity: 0;
            transform: translateY(14px) scale(0.98);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes bulkStagger {
          0% {
            opacity: 0;
            transform: translateY(8px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes bulkRowIn {
          0% {
            opacity: 0;
            transform: translateY(-10px) scale(0.98);
          }
          60% {
            opacity: 1;
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes bulkShimmer {
          0% {
            transform: translateX(-120%);
          }
          100% {
            transform: translateX(400%);
          }
        }
        @keyframes bulkBarShimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(400%);
          }
        }
        @keyframes bulkBarPulse {
          0%,
          100% {
            opacity: 0.78;
          }
          50% {
            opacity: 1;
          }
        }
        @keyframes bulkGlow {
          0%,
          100% {
            opacity: 0.55;
            transform: scale(1);
          }
          50% {
            opacity: 0.85;
            transform: scale(1.04);
          }
        }
        @keyframes bulkFloatA {
          0%,
          100% {
            transform: rotate(-5deg) translateY(0);
          }
          50% {
            transform: rotate(-5deg) translateY(-6px);
          }
        }
        @keyframes bulkFloatB {
          0%,
          100% {
            transform: rotate(4deg) translateY(0);
          }
          50% {
            transform: rotate(4deg) translateY(-5px);
          }
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

function CounterTile({
  label,
  value,
  tone,
  icon: Icon,
  spin,
}: {
  label: string
  value: number
  tone: "emerald" | "amber" | "rose"
  icon: React.ComponentType<{ className?: string }>
  spin?: boolean
}) {
  const toneClass =
    tone === "emerald"
      ? "text-emerald-400 bg-emerald-400/10 border-emerald-400/20"
      : tone === "amber"
        ? "text-amber-400 bg-amber-400/10 border-amber-400/20"
        : "text-rose-400 bg-rose-400/10 border-rose-400/20"

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-2.5">
      <div className={`inline-flex h-6 w-6 items-center justify-center rounded-lg border ${toneClass}`}>
        <Icon className={`h-3 w-3 ${spin ? "animate-spin" : ""}`} />
      </div>
      <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/50">
        {label}
      </p>
      <p className="mt-0.5 text-base font-semibold tabular-nums text-white">
        {Math.round(value).toLocaleString("en-IN")}
      </p>
    </div>
  )
}
