"use client"

import { useEffect, useState } from "react"

type Point = { month: string; value: number }

const DATA: Point[] = [
  { month: "Dec 2025", value: 99.98 },
  { month: "Jan 2026", value: 99.97 },
  { month: "Feb 2026", value: 99.99 },
  { month: "Mar 2026", value: 99.98 },
  { month: "Apr 2026", value: 99.95 },
  { month: "May 2026", value: 99.97 },
]

// Scale the visible axis tightly so sub-0.1% differences are legible.
const MIN = 99.9
const MAX = 100
const pct = (v: number) => ((v - MIN) / (MAX - MIN)) * 100

export function StatusUptimeChart() {
  const [mounted, setMounted] = useState(false)
  const [active, setActive] = useState<number | null>(null)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60)
    return () => clearTimeout(t)
  }, [])

  const avg = (DATA.reduce((s, d) => s + d.value, 0) / DATA.length).toFixed(3)

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">6-month average</p>
          <p className="mt-1 text-3xl font-semibold tracking-tight text-foreground tabular-nums">{avg}%</p>
        </div>
        <div className="flex items-center gap-2 text-[12px] text-muted-foreground">
          <span className="inline-flex h-2.5 w-2.5 rounded-sm bg-primary" /> Monthly uptime
        </div>
      </div>

      {/* Chart */}
      <div className="relative mt-8">
        {/* Gridlines */}
        <div aria-hidden className="absolute inset-0 flex flex-col justify-between">
          {[100, 99.975, 99.95, 99.925, 99.9].map((g) => (
            <div key={g} className="flex items-center gap-2">
              <span className="w-12 shrink-0 text-right font-mono text-[10px] text-muted-foreground/70">{g}%</span>
              <span className="h-px flex-1 bg-border/70" />
            </div>
          ))}
        </div>

        {/* Bars */}
        <div className="relative flex h-52 items-end gap-2 pl-14 sm:gap-4">
          {DATA.map((d, i) => {
            const h = pct(d.value)
            const isActive = active === i
            return (
              <div
                key={d.month}
                className="group relative flex flex-1 flex-col items-center justify-end"
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
              >
                {/* Tooltip */}
                <div
                  className={`pointer-events-none absolute -top-2 z-10 -translate-y-full rounded-lg border border-border bg-popover px-2.5 py-1.5 text-center shadow-lg transition-all duration-200 ${
                    isActive ? "opacity-100 translate-y-[-100%]" : "translate-y-[calc(-100%+6px)] opacity-0"
                  }`}
                >
                  <p className="whitespace-nowrap text-[11px] font-semibold text-foreground tabular-nums">{d.value}%</p>
                  <p className="whitespace-nowrap text-[10px] text-muted-foreground">{d.month}</p>
                </div>

                <div
                  className="w-full max-w-[56px] rounded-t-md bg-gradient-to-t from-primary/70 to-primary transition-[height,filter] duration-700 ease-out group-hover:brightness-110"
                  style={{
                    height: mounted ? `${h}%` : "0%",
                    transitionDelay: `${i * 80}ms`,
                  }}
                />
              </div>
            )
          })}
        </div>

        {/* X labels */}
        <div className="mt-2 flex gap-2 pl-14 sm:gap-4">
          {DATA.map((d) => (
            <span key={d.month} className="flex-1 text-center text-[10.5px] font-medium text-muted-foreground">
              {d.month.split(" ")[0]}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
