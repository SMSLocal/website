"use client"

import { useMemo } from "react"
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import type { TimeseriesPoint } from "@/lib/analytics/types"

/**
 * Stacked area chart for the overview timeseries. Bucket granularity is
 * already decided by the server (hour for 24h, day otherwise) — we just
 * format labels and render.
 */
export function TimeseriesChart({
  data,
  bucket,
}: {
  data: TimeseriesPoint[]
  bucket: "hour" | "day"
}) {
  const formatted = useMemo(() => {
    return data.map((p) => ({
      ...p,
      label: formatBucketLabel(p.t, bucket),
    }))
  }, [data, bucket])

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={formatted}
          margin={{ top: 8, right: 8, bottom: 0, left: 0 }}
        >
          <defs>
            <linearGradient id="gradVisitors" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.25} />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradPageviews" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.45} />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="hsl(var(--border))"
            vertical={false}
          />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
            tickLine={false}
            axisLine={false}
            minTickGap={20}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
            tickLine={false}
            axisLine={false}
            width={32}
            allowDecimals={false}
          />
          <Tooltip content={<ChartTooltip />} />
          <Area
            type="monotone"
            dataKey="pageviews"
            stroke="hsl(var(--primary))"
            fill="url(#gradPageviews)"
            strokeWidth={2}
            isAnimationActive={false}
          />
          <Area
            type="monotone"
            dataKey="visitors"
            stroke="hsl(var(--primary))"
            strokeDasharray="4 3"
            fill="url(#gradVisitors)"
            strokeWidth={1.5}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

function formatBucketLabel(iso: string, bucket: "hour" | "day"): string {
  const d = new Date(iso)
  if (bucket === "hour") {
    return d.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
  }
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
  })
}

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: Array<{ name: string; value: number; color?: string }>
  label?: string
}) {
  if (!active || !payload || payload.length === 0) return null
  return (
    <div className="rounded-lg border border-border bg-popover px-3 py-2 shadow-md">
      <div className="text-[11px] font-medium text-muted-foreground">{label}</div>
      <div className="mt-1 space-y-0.5">
        {payload.map((p) => (
          <div
            key={p.name}
            className="flex items-center justify-between gap-4 text-[12.5px]"
          >
            <span className="capitalize text-muted-foreground">{p.name}</span>
            <span className="font-semibold tabular-nums text-foreground">
              {p.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
