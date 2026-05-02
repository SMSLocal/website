"use client"

import type { RangeKey } from "@/lib/analytics/types"
import { cn } from "@/lib/utils"

const OPTIONS: Array<{ key: RangeKey; label: string }> = [
  { key: "24h", label: "Last 24h" },
  { key: "7d", label: "Last 7 days" },
  { key: "30d", label: "Last 30 days" },
  { key: "90d", label: "Last 90 days" },
]

export function RangePicker({
  value,
  onChange,
  disabled = false,
}: {
  value: RangeKey
  onChange: (next: RangeKey) => void
  disabled?: boolean
}) {
  return (
    <div
      role="tablist"
      aria-label="Date range"
      className="inline-flex items-center gap-1 rounded-lg border border-border bg-card p-1"
    >
      {OPTIONS.map((opt) => {
        const active = opt.key === value
        return (
          <button
            key={opt.key}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(opt.key)}
            disabled={disabled}
            className={cn(
              "rounded-md px-3 py-1.5 text-[12px] font-medium transition",
              active
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
              disabled ? "cursor-not-allowed opacity-50" : "",
            )}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
