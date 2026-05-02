"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import {
  Gauge,
  Smartphone,
  Monitor,
  RefreshCcw,
  AlertTriangle,
  ExternalLink,
  Clock,
  ChevronRight,
  Search,
  Square,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import type {
  PageSpeedResult,
  PsiStrategy,
  Opportunity,
  WebVital,
} from "@/lib/seo/pagespeed"

const VITAL_LABELS: Record<keyof Omit<PageSpeedResult["webVitals"], "source">, string> = {
  lcp: "LCP — Largest Contentful Paint",
  cls: "CLS — Cumulative Layout Shift",
  inp: "INP — Interaction to Next Paint",
  tbt: "TBT — Total Blocking Time",
  fcp: "FCP — First Contentful Paint",
  ttfb: "TTFB — Time to First Byte",
}

type PathRow = {
  url: string
  /** Path part for display (e.g. "/", "/pricing"). */
  path: string
  result: PageSpeedResult | null
  /** UI-only state: this URL is currently being audited. */
  running: boolean
  /** Last error message from a failed audit. */
  error: string | null
}

const MAX_CONCURRENT = 2
/** Stale threshold: results older than this should be re-audited. */
const STALE_MS = 60 * 60 * 1000 // 1 h — matches server cache TTL

function scoreColorClasses(score: number | null): string {
  if (score === null) return "text-muted-foreground"
  if (score >= 90) return "text-emerald-600 dark:text-emerald-400"
  if (score >= 50) return "text-amber-600 dark:text-amber-400"
  return "text-red-600 dark:text-red-400"
}

function scoreBg(score: number | null): string {
  if (score === null) return "bg-muted/50"
  if (score >= 90) return "bg-emerald-500/10"
  if (score >= 50) return "bg-amber-500/10"
  return "bg-red-500/10"
}

function ratingBadgeClass(rating: WebVital["rating"]): string {
  if (rating === "good") return "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
  if (rating === "needs-improvement") return "bg-amber-500/10 text-amber-700 dark:text-amber-300"
  if (rating === "poor") return "bg-red-500/10 text-red-700 dark:text-red-300"
  return "bg-muted text-muted-foreground"
}

function ratingLabel(rating: WebVital["rating"]): string {
  if (rating === "good") return "Good"
  if (rating === "needs-improvement") return "Needs improvement"
  if (rating === "poor") return "Poor"
  return "—"
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  if (diff < 60_000) return "just now"
  const min = Math.floor(diff / 60_000)
  if (min < 60) return `${min}m ago`
  const hr = Math.floor(min / 60)
  if (hr < 24) return `${hr}h ago`
  return new Date(iso).toLocaleDateString()
}

function ScoreCell({ score }: { score: number | null }) {
  const display = score === null ? "—" : String(score)
  return (
    <span
      className={`inline-flex h-7 w-10 items-center justify-center rounded text-sm font-semibold tabular-nums ${scoreBg(score)} ${scoreColorClasses(score)}`}
    >
      {display}
    </span>
  )
}

function VitalRow({ name, vital }: { name: string; vital: WebVital | null }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-border bg-card px-4 py-3">
      <div className="min-w-0">
        <div className="text-sm font-medium text-foreground">{name}</div>
        <div className="text-xs text-muted-foreground">
          {vital ? vital.display : "Not reported"}
        </div>
      </div>
      <Badge
        variant="outline"
        className={`shrink-0 border-transparent ${ratingBadgeClass(vital?.rating ?? null)}`}
      >
        {ratingLabel(vital?.rating ?? null)}
      </Badge>
    </div>
  )
}

function OpportunityRow({ opp }: { opp: Opportunity }) {
  const savings =
    opp.savingsMs !== null && opp.savingsMs > 0
      ? opp.savingsMs >= 1000
        ? `${(opp.savingsMs / 1000).toFixed(2)} s`
        : `${Math.round(opp.savingsMs)} ms`
      : opp.displayValue ?? "—"
  return (
    <div className="rounded-lg border border-border bg-card px-4 py-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-sm font-medium text-foreground">{opp.title}</div>
          {opp.description ? (
            <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
              {opp.description.replace(/\[Learn .*?\]\([^)]+\)/g, "").trim()}
            </p>
          ) : null}
        </div>
        <Badge variant="outline" className="shrink-0">
          {savings}
        </Badge>
      </div>
    </div>
  )
}

function DetailPanel({ result }: { result: PageSpeedResult }) {
  return (
    <div className="space-y-4 border-l-2 border-primary/40 bg-muted/20 p-4">
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
          {result.cached ? "Cached" : "Fetched"}{" "}
          {timeAgo(result.cachedAt ?? result.fetchedAt)} · Lighthouse{" "}
          {result.lighthouseVersion ?? "?"}
          {result.webVitals.source === "lab" ? " · Lab data" : " · Field + Lab"}
        </span>
        <a
          href={`https://pagespeed.web.dev/analysis?url=${encodeURIComponent(result.url)}&form_factor=${result.strategy}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-primary hover:underline"
        >
          Open in pagespeed.web.dev
          <ExternalLink className="h-3 w-3" aria-hidden="true" />
        </a>
      </div>

      <div>
        <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Core Web Vitals
        </h4>
        <div className="grid gap-2 sm:grid-cols-2">
          {(Object.keys(VITAL_LABELS) as Array<keyof typeof VITAL_LABELS>).map((k) => (
            <VitalRow key={k} name={VITAL_LABELS[k]} vital={result.webVitals[k]} />
          ))}
        </div>
      </div>

      <div>
        <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Opportunities ({result.opportunities.length})
        </h4>
        {result.opportunities.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No opportunities flagged — performance looks clean.
          </p>
        ) : (
          <div className="space-y-2">
            {result.opportunities.map((o) => (
              <OpportunityRow key={o.id} opp={o} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export function PageSpeedDashboard({
  defaultUrl,
  paths,
}: {
  defaultUrl: string
  paths: string[]
}) {
  const [strategy, setStrategy] = useState<PsiStrategy>("mobile")
  const [rows, setRows] = useState<PathRow[]>([])
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState<"all" | "audited" | "missing" | "poor">("all")
  const [expanded, setExpanded] = useState<string | null>(null)
  const [batchProgress, setBatchProgress] = useState<{ done: number; total: number } | null>(null)
  const cancelBatchRef = useRef(false)

  // Build the path list once. defaultUrl is included so the homepage is
  // always present even if it isn't in the explicit registry list.
  const allUrls = useMemo(() => {
    const set = new Set<string>([defaultUrl, ...paths])
    return Array.from(set)
  }, [defaultUrl, paths])

  // Initial load: fetch every cached result for the current strategy in one shot.
  const loadCached = useCallback(async () => {
    if (allUrls.length === 0) return
    setRows(
      allUrls.map((u) => {
        let path = u
        try {
          path = new URL(u).pathname || "/"
        } catch {
          /* keep as-is */
        }
        return { url: u, path, result: null, running: false, error: null }
      }),
    )
    try {
      // Chunk to keep query strings under typical proxy limits (~8KB).
      const CHUNK = 80
      const all: Record<string, PageSpeedResult> = {}
      for (let i = 0; i < allUrls.length; i += CHUNK) {
        const slice = allUrls.slice(i, i + CHUNK)
        const params = new URLSearchParams({
          urls: slice.join(","),
          strategy,
        })
        const res = await fetch(`/api/dev/seo/pagespeed/list?${params}`)
        if (!res.ok) continue
        const data = await res.json()
        if (data.ok) Object.assign(all, data.results)
      }
      setRows((prev) =>
        prev.map((r) => ({ ...r, result: all[r.url] ?? null })),
      )
    } catch {
      /* surface no toast — empty cells are themselves the signal */
    }
  }, [allUrls, strategy])

  useEffect(() => {
    loadCached()
  }, [loadCached])

  const visible = useMemo(() => {
    return rows.filter((r) => {
      if (query) {
        const q = query.toLowerCase()
        if (!r.path.toLowerCase().includes(q) && !r.url.toLowerCase().includes(q)) {
          return false
        }
      }
      if (filter === "audited") return r.result !== null
      if (filter === "missing") return r.result === null
      if (filter === "poor") {
        const p = r.result?.scores.performance
        return p !== undefined && p !== null && p < 50
      }
      return true
    })
  }, [rows, query, filter])

  const stats = useMemo(() => {
    let audited = 0
    let stale = 0
    let poor = 0
    const now = Date.now()
    for (const r of rows) {
      if (r.result) {
        audited++
        const ts = new Date(r.result.fetchedAt).getTime()
        if (now - ts > STALE_MS) stale++
        if ((r.result.scores.performance ?? 100) < 50) poor++
      }
    }
    return { audited, stale, poor, total: rows.length }
  }, [rows])

  async function runOne(url: string) {
    setRows((prev) =>
      prev.map((r) => (r.url === url ? { ...r, running: true, error: null } : r)),
    )
    try {
      const res = await fetch("/api/dev/seo/pagespeed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, strategy }),
      })
      const data = await res.json()
      if (data.ok) {
        setRows((prev) =>
          prev.map((r) =>
            r.url === url ? { ...r, result: data.result, running: false } : r,
          ),
        )
      } else {
        setRows((prev) =>
          prev.map((r) =>
            r.url === url
              ? { ...r, running: false, error: data.message || data.error || "Audit failed" }
              : r,
          ),
        )
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Network error"
      setRows((prev) =>
        prev.map((r) => (r.url === url ? { ...r, running: false, error: msg } : r)),
      )
    }
  }

  // Audit every URL whose cached result is missing or older than STALE_MS.
  // Runs MAX_CONCURRENT in flight. Updates rows incrementally so the operator
  // sees results stream in.
  async function runStale() {
    cancelBatchRef.current = false
    const now = Date.now()
    const queue: string[] = []
    for (const r of rows) {
      if (!r.result) {
        queue.push(r.url)
        continue
      }
      const age = now - new Date(r.result.fetchedAt).getTime()
      if (age > STALE_MS) queue.push(r.url)
    }
    if (queue.length === 0) return
    setBatchProgress({ done: 0, total: queue.length })
    let done = 0
    let inFlight = 0
    await new Promise<void>((resolve) => {
      const tick = () => {
        if (cancelBatchRef.current) {
          if (inFlight === 0) resolve()
          return
        }
        if (queue.length === 0 && inFlight === 0) {
          resolve()
          return
        }
        while (inFlight < MAX_CONCURRENT && queue.length > 0) {
          const next = queue.shift()!
          inFlight++
          runOne(next).finally(() => {
            inFlight--
            done++
            setBatchProgress({ done, total: done + queue.length + inFlight })
            tick()
          })
        }
      }
      tick()
    })
    setBatchProgress(null)
  }

  function cancelBatch() {
    cancelBatchRef.current = true
  }

  const batchActive = batchProgress !== null

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Gauge className="h-5 w-5 text-primary" aria-hidden="true" />
              <h2 className="text-lg font-semibold tracking-tight">PageSpeed audit</h2>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Live Lighthouse scores via Google PageSpeed Insights. Results
              cache for 1 hour. Batched audits run 2 at a time.
            </p>
          </div>
          <div className="inline-flex rounded-md border border-border bg-background p-1">
            <button
              type="button"
              onClick={() => setStrategy("mobile")}
              disabled={batchActive}
              className={`inline-flex items-center gap-1.5 rounded px-3 py-1 text-xs font-medium ${
                strategy === "mobile"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Smartphone className="h-3.5 w-3.5" aria-hidden="true" />
              Mobile
            </button>
            <button
              type="button"
              onClick={() => setStrategy("desktop")}
              disabled={batchActive}
              className={`inline-flex items-center gap-1.5 rounded px-3 py-1 text-xs font-medium ${
                strategy === "desktop"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Monitor className="h-3.5 w-3.5" aria-hidden="true" />
              Desktop
            </button>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
          <StatCard label="Pages" value={stats.total} />
          <StatCard label="Audited" value={stats.audited} tone="emerald" />
          <StatCard label="Stale (>1h)" value={stats.stale} tone="amber" />
          <StatCard label="Perf < 50" value={stats.poor} tone="red" />
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {batchActive ? (
            <Button onClick={cancelBatch} variant="outline">
              <Square className="h-4 w-4" aria-hidden="true" />
              Cancel ({batchProgress!.done}/{batchProgress!.total})
            </Button>
          ) : (
            <Button onClick={runStale} disabled={stats.audited === stats.total && stats.stale === 0}>
              <RefreshCcw className="h-4 w-4" aria-hidden="true" />
              {stats.audited === 0
                ? `Audit all (${stats.total})`
                : `Audit missing/stale (${stats.total - stats.audited + stats.stale})`}
            </Button>
          )}
          <div className="ml-auto flex items-center gap-2">
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Filter paths…"
                className="h-9 w-[200px] pl-7 text-sm"
              />
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as typeof filter)}
              className="h-9 rounded-md border border-input bg-background px-2 text-sm"
            >
              <option value="all">All</option>
              <option value="audited">Audited</option>
              <option value="missing">Not audited</option>
              <option value="poor">Performance &lt; 50</option>
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="w-8 px-2 py-2"></th>
                <th className="px-3 py-2 text-left">Path</th>
                <th className="px-2 py-2 text-center">Perf</th>
                <th className="px-2 py-2 text-center">A11y</th>
                <th className="px-2 py-2 text-center">SEO</th>
                <th className="px-2 py-2 text-center">Best</th>
                <th className="px-3 py-2 text-left">LCP</th>
                <th className="px-3 py-2 text-left">CLS</th>
                <th className="px-3 py-2 text-left">Audited</th>
                <th className="px-3 py-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {visible.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-4 py-10 text-center text-sm text-muted-foreground">
                    {rows.length === 0 ? "Loading paths…" : "No pages match this filter."}
                  </td>
                </tr>
              ) : (
                visible.map((r) => {
                  const isOpen = expanded === r.url
                  const s = r.result?.scores
                  const lcp = r.result?.webVitals.lcp
                  const cls = r.result?.webVitals.cls
                  return (
                    <RowGroup
                      key={r.url}
                      row={r}
                      isOpen={isOpen}
                      onToggle={() => setExpanded(isOpen ? null : r.url)}
                      onRun={() => runOne(r.url)}
                      scores={s}
                      lcp={lcp}
                      cls={cls}
                    />
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function StatCard({
  label,
  value,
  tone,
}: {
  label: string
  value: number
  tone?: "emerald" | "amber" | "red"
}) {
  const toneClass =
    tone === "emerald"
      ? "text-emerald-600 dark:text-emerald-400"
      : tone === "amber"
        ? "text-amber-600 dark:text-amber-400"
        : tone === "red"
          ? "text-red-600 dark:text-red-400"
          : "text-foreground"
  return (
    <div className="rounded-lg border border-border bg-background px-3 py-2">
      <div className={`text-xl font-semibold tabular-nums ${toneClass}`}>{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  )
}

function RowGroup({
  row,
  isOpen,
  onToggle,
  onRun,
  scores,
  lcp,
  cls,
}: {
  row: PathRow
  isOpen: boolean
  onToggle: () => void
  onRun: () => void
  scores: PageSpeedResult["scores"] | undefined
  lcp: WebVital | null | undefined
  cls: WebVital | null | undefined
}) {
  return (
    <>
      <tr
        className={`border-t border-border transition hover:bg-muted/30 ${
          isOpen ? "bg-muted/40" : ""
        } ${row.result ? "cursor-pointer" : ""}`}
        onClick={() => row.result && onToggle()}
      >
        <td className="px-2 py-2 text-center">
          {row.result ? (
            <ChevronRight
              className={`h-4 w-4 text-muted-foreground transition-transform ${
                isOpen ? "rotate-90" : ""
              }`}
              aria-hidden="true"
            />
          ) : null}
        </td>
        <td className="px-3 py-2">
          <div className="font-mono text-[13px] text-foreground">{row.path}</div>
          {row.error ? (
            <div className="mt-0.5 inline-flex items-center gap-1 text-[11px] text-red-600 dark:text-red-400">
              <AlertTriangle className="h-3 w-3" aria-hidden="true" />
              {row.error}
            </div>
          ) : null}
        </td>
        <td className="px-2 py-2 text-center">
          <ScoreCell score={scores?.performance ?? null} />
        </td>
        <td className="px-2 py-2 text-center">
          <ScoreCell score={scores?.accessibility ?? null} />
        </td>
        <td className="px-2 py-2 text-center">
          <ScoreCell score={scores?.seo ?? null} />
        </td>
        <td className="px-2 py-2 text-center">
          <ScoreCell score={scores?.bestPractices ?? null} />
        </td>
        <td className="px-3 py-2 text-xs text-muted-foreground">
          {lcp ? lcp.display : "—"}
        </td>
        <td className="px-3 py-2 text-xs text-muted-foreground">
          {cls ? cls.display : "—"}
        </td>
        <td className="px-3 py-2 text-xs text-muted-foreground">
          {row.result ? timeAgo(row.result.fetchedAt) : "—"}
        </td>
        <td className="px-3 py-2 text-right">
          <Button
            variant="outline"
            size="sm"
            disabled={row.running}
            onClick={(e) => {
              e.stopPropagation()
              onRun()
            }}
          >
            <RefreshCcw
              className={`h-3.5 w-3.5 ${row.running ? "animate-spin" : ""}`}
              aria-hidden="true"
            />
            {row.running ? "Running" : row.result ? "Re-run" : "Run"}
          </Button>
        </td>
      </tr>
      {isOpen && row.result ? (
        <tr className="border-t border-border">
          <td colSpan={10} className="p-0">
            <DetailPanel result={row.result} />
          </td>
        </tr>
      ) : null}
    </>
  )
}
