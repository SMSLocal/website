"use client"

import { useMemo } from "react"
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  EyeOff,
  FileText,
  Map,
  Pencil,
  ShieldAlert,
  Slash,
  XCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { analyzeSeo } from "@/lib/seo/rank-math"
import type { EffectiveEntry } from "@/lib/seo/overrides"
import type { TechnicalAudit } from "@/lib/seo/technical-audit"

function StatCard({
  label,
  value,
  tone = "neutral",
  Icon,
  sub,
}: {
  label: string
  value: number | string
  tone?: "neutral" | "good" | "warn" | "bad"
  Icon: typeof FileText
  sub?: string
}) {
  const toneRing =
    tone === "good"
      ? "ring-emerald-500/20 bg-emerald-500/5"
      : tone === "warn"
        ? "ring-amber-500/20 bg-amber-500/5"
        : tone === "bad"
          ? "ring-red-500/20 bg-red-500/5"
          : "ring-border bg-card"
  const iconTone =
    tone === "good"
      ? "text-emerald-600 dark:text-emerald-400"
      : tone === "warn"
        ? "text-amber-600 dark:text-amber-400"
        : tone === "bad"
          ? "text-red-600 dark:text-red-400"
          : "text-muted-foreground"
  return (
    <div className={`rounded-2xl p-5 shadow-sm ring-1 ${toneRing}`}>
      <div className="flex items-start justify-between gap-3">
        <p className="text-[12px] font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        <Icon className={`h-4 w-4 ${iconTone}`} aria-hidden="true" />
      </div>
      <p className="mt-2 text-3xl font-semibold tabular-nums tracking-tight text-foreground">
        {value}
      </p>
      {sub ? (
        <p className="mt-1 text-[12px] text-muted-foreground">{sub}</p>
      ) : null}
    </div>
  )
}

export function OverviewPanel({
  entries,
  counts,
  technical,
  onOpenPages,
  onOpenSitemap,
}: {
  entries: EffectiveEntry[]
  counts: { overridden: number; noindex: number; excluded: number }
  technical: TechnicalAudit
  onOpenPages: () => void
  onOpenSitemap: () => void
}) {
  const scoreBuckets = useMemo(() => {
    let excellent = 0
    let good = 0
    let needs = 0
    let poor = 0
    let missingFocus = 0
    for (const e of entries) {
      const fk = e.focusKeyword ?? ""
      if (!fk) {
        missingFocus++
        continue
      }
      const r = analyzeSeo({
        title: e.titleAbsolute ?? e.title,
        description: e.description,
        keywords: e.keywords,
        path: e.path,
        focusKeyword: fk,
      })
      if (r.grade === "excellent") excellent++
      else if (r.grade === "good") good++
      else if (r.grade === "needs-improvement") needs++
      else poor++
    }
    return { excellent, good, needs, poor, missingFocus }
  }, [entries])

  const lastEdits = useMemo(() => {
    return entries
      .filter((e) => e.override.updatedAt)
      .sort((a, b) =>
        (b.override.updatedAt ?? "").localeCompare(a.override.updatedAt ?? ""),
      )
      .slice(0, 6)
  }, [entries])

  const inSitemap = entries.filter((e) => e.includedInSitemap).length
  const techErrors = technical.byLevel?.error ?? 0
  const techWarnings = technical.byLevel?.warning ?? 0

  return (
    <div className="space-y-8">
      <section>
        <h2 className="mb-4 text-[13px] font-semibold uppercase tracking-wide text-muted-foreground">
          Site health
        </h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-5">
          <StatCard
            label="Total pages"
            value={entries.length}
            Icon={FileText}
            sub="Indexed by the admin"
          />
          <StatCard
            label="In sitemap"
            value={inSitemap}
            Icon={Map}
            tone="good"
            sub={`${counts.excluded} excluded`}
          />
          <StatCard
            label="Noindex"
            value={counts.noindex}
            Icon={EyeOff}
            tone={counts.noindex > 0 ? "warn" : "neutral"}
            sub="Discouraged from search"
          />
          <StatCard
            label="Edited"
            value={counts.overridden}
            Icon={Pencil}
            tone={counts.overridden > 0 ? "good" : "neutral"}
            sub="Runtime overrides"
          />
          <StatCard
            label="Tech issues"
            value={techErrors + techWarnings}
            Icon={ShieldAlert}
            tone={techErrors > 0 ? "bad" : techWarnings > 0 ? "warn" : "good"}
            sub={`${techErrors} errors · ${techWarnings} warnings`}
          />
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <h2 className="text-[13px] font-semibold uppercase tracking-wide text-muted-foreground">
              Focus keyword scores
            </h2>
            <p className="mt-1 text-[13px] text-muted-foreground">
              Rank Math-style analysis across every page.
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={onOpenPages}>
            Open pages
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          <StatCard
            label="Excellent"
            value={scoreBuckets.excellent}
            tone="good"
            Icon={CheckCircle2}
            sub="Score 81–100"
          />
          <StatCard
            label="Good"
            value={scoreBuckets.good}
            tone="good"
            Icon={CheckCircle2}
            sub="Score 61–80"
          />
          <StatCard
            label="Needs work"
            value={scoreBuckets.needs}
            tone="warn"
            Icon={AlertTriangle}
            sub="Score 41–60"
          />
          <StatCard
            label="Poor"
            value={scoreBuckets.poor}
            tone="bad"
            Icon={XCircle}
            sub="Below 40"
          />
          <StatCard
            label="No focus keyword"
            value={scoreBuckets.missingFocus}
            tone="neutral"
            Icon={Slash}
            sub="Set one to score"
          />
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-[14px] font-semibold text-foreground">
              Recently edited
            </h3>
            <Button variant="ghost" size="sm" onClick={onOpenPages}>
              View all
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
          {lastEdits.length === 0 ? (
            <p className="mt-4 text-[13px] text-muted-foreground">
              No runtime overrides yet. Edit any page to see the change appear
              here.
            </p>
          ) : (
            <ul className="mt-4 divide-y divide-border">
              {lastEdits.map((e) => (
                <li key={e.path} className="flex items-start justify-between gap-4 py-3">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-medium text-foreground">
                      {e.titleAbsolute ?? e.title ?? e.path}
                    </p>
                    <p className="truncate text-[12px] text-muted-foreground">
                      {e.path}
                    </p>
                  </div>
                  <time
                    className="shrink-0 text-[11px] text-muted-foreground"
                    dateTime={e.override.updatedAt ?? undefined}
                  >
                    {e.override.updatedAt
                      ? new Date(e.override.updatedAt).toLocaleString()
                      : ""}
                  </time>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <h3 className="text-[14px] font-semibold text-foreground">
            Quick actions
          </h3>
          <div className="mt-4 grid gap-2">
            <Button variant="outline" className="justify-start" onClick={onOpenPages}>
              <FileText className="h-4 w-4" aria-hidden="true" />
              Browse and edit pages
            </Button>
            <Button variant="outline" className="justify-start" onClick={onOpenSitemap}>
              <Map className="h-4 w-4" aria-hidden="true" />
              Manage sitemap & ping Google / Bing
            </Button>
            <Button variant="outline" className="justify-start" asChild>
              <a href="/sitemap.xml" target="_blank" rel="noreferrer noopener">
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
                Open live /sitemap.xml
              </a>
            </Button>
            <Button variant="outline" className="justify-start" asChild>
              <a href="/robots.txt" target="_blank" rel="noreferrer noopener">
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
                Open live /robots.txt
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
