"use client"

/**
 * Small circular score indicator used by the pages table and the editor
 * drawer. The colour band follows Rank Math's conventions:
 *   0–40  red, 41–60 amber, 61–80 blue, 81–100 green.
 */

export function ScoreRing({
  score,
  size = 36,
  label,
}: {
  score: number
  size?: number
  label?: string
}) {
  const clamped = Math.max(0, Math.min(100, Math.round(score)))
  const r = (size - 4) / 2
  const c = 2 * Math.PI * r
  const offset = c - (clamped / 100) * c
  const colour =
    clamped >= 81
      ? "stroke-emerald-500"
      : clamped >= 61
        ? "stroke-sky-500"
        : clamped >= 41
          ? "stroke-amber-500"
          : "stroke-red-500"
  const text =
    clamped >= 81
      ? "text-emerald-600 dark:text-emerald-400"
      : clamped >= 61
        ? "text-sky-600 dark:text-sky-400"
        : clamped >= 41
          ? "text-amber-600 dark:text-amber-400"
          : "text-red-600 dark:text-red-400"

  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
      aria-label={label ?? `SEO score ${clamped} out of 100`}
      role="img"
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          strokeWidth={3}
          className="stroke-muted"
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          strokeWidth={3}
          strokeLinecap="round"
          className={colour}
          fill="none"
          strokeDasharray={c}
          strokeDashoffset={offset}
        />
      </svg>
      <span className={`absolute text-[11px] font-semibold tabular-nums ${text}`}>
        {clamped}
      </span>
    </div>
  )
}
