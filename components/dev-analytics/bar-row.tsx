import { cn } from "@/lib/utils"

/**
 * Horizontal-bar row used in every ranked list across the analytics
 * dashboard (top pages, top sources, geo breakdown, …). The bar width is
 * proportional to `value / max` so the eye can scan importance quickly
 * without needing a chart.
 */
export function BarRow({
  label,
  sublabel,
  value,
  max,
  rightMeta,
  onClick,
  active = false,
}: {
  label: string
  sublabel?: string
  value: number
  max: number
  rightMeta?: string
  onClick?: () => void
  active?: boolean
}) {
  const pct = max > 0 ? Math.max(2, (value / max) * 100) : 0
  const Body = (
    <div className="flex w-full items-center gap-3 py-2">
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-3">
          <div className="min-w-0 truncate text-[13px] font-medium text-foreground">
            {label}
          </div>
          <div className="flex flex-none items-baseline gap-2 text-[12.5px] text-muted-foreground">
            {rightMeta ? <span>{rightMeta}</span> : null}
            <span className="tabular-nums font-semibold text-foreground">
              {value.toLocaleString()}
            </span>
          </div>
        </div>
        {sublabel ? (
          <div className="mt-0.5 truncate text-[11.5px] text-muted-foreground">
            {sublabel}
          </div>
        ) : null}
        <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary/80 transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  )

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={cn(
          "w-full rounded-md px-2 text-left transition hover:bg-muted/60",
          active ? "bg-muted/80" : "",
        )}
      >
        {Body}
      </button>
    )
  }
  return <div className="px-2">{Body}</div>
}
