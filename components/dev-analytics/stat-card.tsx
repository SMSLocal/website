import type { LucideIcon } from "lucide-react"

/**
 * KPI tile used across the /dev/analytics dashboard.
 *
 * - Compact size (matches the SEO admin overview cards)
 * - Optional icon + optional sub-label (for context like "vs last period")
 * - Handles both numeric values (formats with toLocaleString) and pre-formatted strings
 */
export function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  tone = "default",
}: {
  label: string
  value: number | string
  sub?: string
  icon?: LucideIcon
  tone?: "default" | "primary" | "success" | "warn"
}) {
  const toneClass =
    tone === "primary"
      ? "text-primary"
      : tone === "success"
        ? "text-emerald-600 dark:text-emerald-400"
        : tone === "warn"
          ? "text-amber-600 dark:text-amber-400"
          : "text-foreground"

  return (
    <div className="flex flex-col gap-2 rounded-xl border border-border bg-card p-4">
      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        {Icon ? <Icon className="h-3.5 w-3.5" aria-hidden="true" /> : null}
        <span>{label}</span>
      </div>
      <div className={`text-2xl font-semibold tracking-tight ${toneClass}`}>
        {typeof value === "number" ? value.toLocaleString() : value}
      </div>
      {sub ? (
        <div className="text-[12px] text-muted-foreground">{sub}</div>
      ) : null}
    </div>
  )
}
