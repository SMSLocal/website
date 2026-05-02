"use client"

import { Check, Minus, X } from "lucide-react"
import type { RankMathCheck, RankMathReport } from "@/lib/seo/rank-math"
import { ScoreRing } from "./score-ring"

const CATEGORY_LABELS: Record<RankMathCheck["category"], string> = {
  basic: "Basic SEO",
  "title-readability": "Title readability",
  content: "Additional",
  advanced: "Advanced",
}

function gradeLabel(grade: RankMathReport["grade"]): string {
  switch (grade) {
    case "excellent":
      return "Excellent"
    case "good":
      return "Good"
    case "needs-improvement":
      return "Needs improvement"
    case "poor":
      return "Poor"
  }
}

function gradeTone(grade: RankMathReport["grade"]): string {
  switch (grade) {
    case "excellent":
      return "text-emerald-600 dark:text-emerald-400"
    case "good":
      return "text-sky-600 dark:text-sky-400"
    case "needs-improvement":
      return "text-amber-600 dark:text-amber-400"
    case "poor":
      return "text-red-600 dark:text-red-400"
  }
}

export function RankMathAnalysis({ report }: { report: RankMathReport }) {
  const groups = new Map<RankMathCheck["category"], RankMathCheck[]>()
  for (const c of report.checks) {
    const existing = groups.get(c.category) ?? []
    existing.push(c)
    groups.set(c.category, existing)
  }

  if (!report.focusKeyword) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-muted/30 p-6 text-center">
        <p className="text-[14px] font-medium text-foreground">
          Set a focus keyword to see the analysis
        </p>
        <p className="mt-1 text-[12px] text-muted-foreground">
          Rank Math-style scoring needs a focus keyword to evaluate your title,
          description, URL, and keywords against it.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">
        <ScoreRing score={report.score} size={56} />
        <div className="min-w-0 flex-1">
          <p className={`text-[13px] font-semibold ${gradeTone(report.grade)}`}>
            {gradeLabel(report.grade)}
          </p>
          <p className="text-[12px] text-muted-foreground">
            {report.passedCount} of {report.totalCount} checks passed · focus
            keyword <span className="font-medium text-foreground">{report.focusKeyword}</span>
          </p>
        </div>
      </div>

      {(["basic", "title-readability", "content", "advanced"] as const).map(
        (cat) => {
          const items = groups.get(cat)
          if (!items || items.length === 0) return null
          const passed = items.filter((i) => i.pass).length
          return (
            <details
              key={cat}
              className="group overflow-hidden rounded-xl border border-border bg-card"
              open={cat === "basic"}
            >
              <summary className="flex cursor-pointer select-none items-center justify-between gap-3 px-4 py-3 text-[13px] font-medium text-foreground">
                <span>{CATEGORY_LABELS[cat]}</span>
                <span className="text-[11px] font-normal text-muted-foreground">
                  {passed} / {items.length}
                </span>
              </summary>
              <ul className="divide-y divide-border border-t border-border">
                {items.map((c) => (
                  <li key={c.id} className="flex items-start gap-3 px-4 py-3">
                    <span
                      className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                        c.pass
                          ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                          : "bg-red-500/15 text-red-600 dark:text-red-400"
                      }`}
                      aria-hidden="true"
                    >
                      {c.pass ? (
                        <Check className="h-3 w-3" />
                      ) : (
                        <X className="h-3 w-3" />
                      )}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[13px] font-medium text-foreground">
                        {c.label}
                      </p>
                      <p className="mt-0.5 text-[12px] text-muted-foreground">
                        {c.message}
                      </p>
                    </div>
                    <span className="shrink-0 text-[11px] tabular-nums text-muted-foreground">
                      +{c.weight}
                    </span>
                  </li>
                ))}
              </ul>
            </details>
          )
        },
      )}

      <p className="flex items-center gap-2 text-[11px] text-muted-foreground">
        <Minus className="h-3 w-3" aria-hidden="true" />
        Score is a weighted sum of passed checks. This is a guideline only —
        use it as a nudge, not a rulebook.
      </p>
    </div>
  )
}
