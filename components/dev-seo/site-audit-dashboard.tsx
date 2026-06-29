"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import {
  Search,
  RefreshCcw,
  AlertTriangle,
  XCircle,
  Info,
  ChevronRight,
  ExternalLink,
  Square,
  Copy,
  Link2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import type {
  AuditIssue,
  AuditLevel,
  SiteAuditResult,
} from "@/lib/seo/site-audit"

type AuditPage = { path: string; url: string; label: string; kind: string }

type RowState = {
  page: AuditPage
  result: SiteAuditResult | null
  running: boolean
  error: string | null
}

const MAX_CONCURRENT = 4
const STALE_MS = 24 * 60 * 60 * 1000

const LEVEL_META: Record<
  AuditLevel,
  { icon: typeof XCircle; bg: string; text: string; label: string }
> = {
  error: {
    icon: XCircle,
    bg: "bg-red-500/10",
    text: "text-red-600 dark:text-red-400",
    label: "Error",
  },
  warning: {
    icon: AlertTriangle,
    bg: "bg-amber-500/10",
    text: "text-amber-600 dark:text-amber-400",
    label: "Warning",
  },
  info: {
    icon: Info,
    bg: "bg-blue-500/10",
    text: "text-blue-600 dark:text-blue-400",
    label: "Info",
  },
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  if (diff < 60_000) return "just now"
  const min = Math.floor(diff / 60_000)
  if (min < 60) return `${min}m ago`
  const hr = Math.floor(min / 60)
  if (hr < 24) return `${hr}h ago`
  return `${Math.floor(hr / 24)}d ago`
}

function statusClass(status: number): string {
  if (status === 0) return "text-muted-foreground"
  if (status >= 500) return "text-red-600 dark:text-red-400"
  if (status >= 400) return "text-red-600 dark:text-red-400"
  if (status >= 300) return "text-amber-600 dark:text-amber-400"
  return "text-emerald-600 dark:text-emerald-400"
}

function StatCard({
  label,
  value,
  tone,
}: {
  label: string
  value: number | string
  tone?: "default" | "error" | "warning" | "info" | "muted"
}) {
  const toneClass =
    tone === "error"
      ? "text-red-600 dark:text-red-400"
      : tone === "warning"
        ? "text-amber-600 dark:text-amber-400"
        : tone === "info"
          ? "text-blue-600 dark:text-blue-400"
          : tone === "muted"
            ? "text-muted-foreground"
            : "text-foreground"
  return (
    <div className="rounded-lg border border-border bg-card px-4 py-3">
      <div className={`text-2xl font-bold tabular-nums leading-none ${toneClass}`}>
        {value}
      </div>
      <div className="mt-1.5 text-xs text-muted-foreground">{label}</div>
    </div>
  )
}

function IssueLine({ issue }: { issue: AuditIssue }) {
  const meta = LEVEL_META[issue.level]
  const Icon = meta.icon
  return (
    <div className={`flex items-start gap-2 rounded-md ${meta.bg} px-3 py-2`}>
      <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${meta.text}`} aria-hidden="true" />
      <div className="min-w-0">
        <div className="text-sm font-medium text-foreground">{issue.message}</div>
        {issue.detail ? (
          <div className="mt-0.5 truncate text-xs text-muted-foreground">{issue.detail}</div>
        ) : null}
      </div>
    </div>
  )
}

function DetailPanel({ result }: { result: SiteAuditResult }) {
  return (
    <div className="space-y-4 border-l-2 border-primary/40 bg-muted/20 p-4">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Field label="Status" value={String(result.status || "—")} className={statusClass(result.status)} />
        <Field label="Response" value={`${result.responseMs} ms`} />
        <Field label="Size" value={`${(result.bytes / 1024).toFixed(1)} KB`} />
        <Field label="Word count" value={result.wordCount.toLocaleString()} />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Title" value={result.title ?? "—"} subtext={result.title ? `${result.title.length} chars` : undefined} />
        <Field label="Description" value={result.description ?? "—"} subtext={result.description ? `${result.description.length} chars` : undefined} />
        <Field label="Canonical" value={result.canonical ?? "—"} mono />
        <Field label="Robots" value={result.robots ?? "—"} mono />
        <Field label="OG image" value={result.ogImage ?? "—"} mono />
        <Field label="Schema types" value={result.schemaTypes.length ? result.schemaTypes.join(", ") : "—"} />
      </div>

      <div className="grid gap-3 sm:grid-cols-4">
        <Field label="H1 count" value={String(result.hCounts.h1)} tone={result.hCounts.h1 === 1 ? "default" : "warning"} />
        <Field label="H2 count" value={String(result.hCounts.h2)} />
        <Field label="Images / no-alt" value={`${result.images} / ${result.imagesWithoutAlt}`} tone={result.imagesWithoutAlt > 0 ? "warning" : "default"} />
        <Field label="Internal / external links" value={`${result.internalLinks} / ${result.externalLinks}`} />
      </div>

      {result.redirectChain.length > 0 ? (
        <div>
          <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Redirect chain
          </div>
          <div className="font-mono text-xs text-muted-foreground">
            {result.redirectChain.join(" → ")} → {result.finalUrl}
          </div>
        </div>
      ) : null}

      {result.issues.length > 0 ? (
        <div>
          <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            All issues ({result.issues.length})
          </div>
          <div className="space-y-1.5">
            {result.issues.map((issue, i) => (
              <IssueLine key={i} issue={issue} />
            ))}
          </div>
        </div>
      ) : (
        <div className="rounded-md border border-emerald-500/30 bg-emerald-500/5 px-3 py-2 text-sm text-emerald-700 dark:text-emerald-300">
          No issues detected on this page.
        </div>
      )}
    </div>
  )
}

function Field({
  label,
  value,
  subtext,
  mono,
  className,
  tone,
}: {
  label: string
  value: string
  subtext?: string
  mono?: boolean
  className?: string
  tone?: "default" | "warning"
}) {
  const toneClass =
    tone === "warning" ? "text-amber-600 dark:text-amber-400" : ""
  return (
    <div>
      <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <div
        className={`mt-0.5 truncate text-sm ${mono ? "font-mono" : ""} ${className ?? ""} ${toneClass}`}
        title={value}
      >
        {value}
      </div>
      {subtext ? (
        <div className="text-[11px] text-muted-foreground">{subtext}</div>
      ) : null}
    </div>
  )
}

export function SiteAuditDashboard({ pages }: { pages: AuditPage[] }) {
  const [rows, setRows] = useState<RowState[]>(() =>
    pages.map((p) => ({
      page: p,
      result: null,
      running: false,
      error: null,
    })),
  )
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState<"all" | "errors" | "warnings" | "missing" | "audited">("all")
  const [issueFilter, setIssueFilter] = useState<string>("all")
  const [expanded, setExpanded] = useState<string | null>(null)
  const [batchProgress, setBatchProgress] = useState<{ done: number; total: number } | null>(null)
  const cancelRef = useRef(false)

  const urls = useMemo(() => pages.map((p) => p.url), [pages])

  const loadCached = useCallback(async () => {
    if (urls.length === 0) return
    try {
      // Chunk to keep query strings under typical proxy limits.
      const CHUNK = 80
      const all: Record<string, SiteAuditResult> = {}
      for (let i = 0; i < urls.length; i += CHUNK) {
        const slice = urls.slice(i, i + CHUNK)
        const params = new URLSearchParams({ urls: slice.join(",") })
        const res = await fetch(`/api/dev/seo/audit/list/?${params}`)
        if (!res.ok) continue
        const data = await res.json()
        if (data.ok) Object.assign(all, data.results)
      }
      setRows((prev) =>
        prev.map((r) => ({ ...r, result: all[r.page.url] ?? null })),
      )
    } catch {
      /* empty cells are themselves the signal */
    }
  }, [urls])

  useEffect(() => {
    loadCached()
  }, [loadCached])

  async function runOne(url: string) {
    setRows((prev) =>
      prev.map((r) => (r.page.url === url ? { ...r, running: true, error: null } : r)),
    )
    try {
      const res = await fetch("/api/dev/seo/audit/page/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      })
      const data = await res.json()
      if (data.ok) {
        setRows((prev) =>
          prev.map((r) =>
            r.page.url === url ? { ...r, result: data.result, running: false } : r,
          ),
        )
      } else {
        setRows((prev) =>
          prev.map((r) =>
            r.page.url === url
              ? { ...r, running: false, error: data.message || data.error || "Audit failed" }
              : r,
          ),
        )
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Network error"
      setRows((prev) =>
        prev.map((r) => (r.page.url === url ? { ...r, running: false, error: msg } : r)),
      )
    }
  }

  async function runStale() {
    cancelRef.current = false
    const now = Date.now()
    const queue: string[] = []
    for (const r of rows) {
      if (!r.result) {
        queue.push(r.page.url)
        continue
      }
      if (now - new Date(r.result.fetchedAt).getTime() > STALE_MS) {
        queue.push(r.page.url)
      }
    }
    if (queue.length === 0) return
    const total = queue.length
    setBatchProgress({ done: 0, total })
    let done = 0
    let inFlight = 0
    await new Promise<void>((resolve) => {
      const tick = () => {
        if (cancelRef.current) {
          queue.length = 0
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
            setBatchProgress({ done, total })
            tick()
          })
        }
      }
      tick()
    })
    setBatchProgress(null)
  }

  function cancelBatch() {
    cancelRef.current = true
  }

  // Aggregate stats + cross-page rollups.
  const aggregates = useMemo(() => {
    let audited = 0
    let stale = 0
    let totalErrors = 0
    let totalWarnings = 0
    let totalInfos = 0
    let totalResponseMs = 0
    let responseCount = 0
    const issueCounts = new Map<string, number>()
    const titleMap = new Map<string, string[]>()
    const descMap = new Map<string, string[]>()
    const now = Date.now()
    for (const r of rows) {
      if (!r.result) continue
      audited++
      if (now - new Date(r.result.fetchedAt).getTime() > STALE_MS) stale++
      if (r.result.responseMs > 0) {
        totalResponseMs += r.result.responseMs
        responseCount++
      }
      for (const issue of r.result.issues) {
        if (issue.level === "error") totalErrors++
        else if (issue.level === "warning") totalWarnings++
        else totalInfos++
        issueCounts.set(issue.type, (issueCounts.get(issue.type) ?? 0) + 1)
      }
      if (r.result.title) {
        const arr = titleMap.get(r.result.title) ?? []
        arr.push(r.page.path)
        titleMap.set(r.result.title, arr)
      }
      if (r.result.description) {
        const arr = descMap.get(r.result.description) ?? []
        arr.push(r.page.path)
        descMap.set(r.result.description, arr)
      }
    }
    const dupTitles = Array.from(titleMap.entries()).filter(([, paths]) => paths.length > 1)
    const dupDescs = Array.from(descMap.entries()).filter(([, paths]) => paths.length > 1)
    const sortedIssues = Array.from(issueCounts.entries()).sort((a, b) => b[1] - a[1])
    const avgResponseMs = responseCount > 0 ? Math.round(totalResponseMs / responseCount) : 0
    return {
      total: rows.length,
      audited,
      stale,
      missing: rows.length - audited,
      errors: totalErrors,
      warnings: totalWarnings,
      infos: totalInfos,
      avgResponseMs,
      sortedIssues,
      dupTitles,
      dupDescs,
    }
  }, [rows])

  const visible = useMemo(() => {
    return rows.filter((r) => {
      if (query) {
        const q = query.toLowerCase()
        if (
          !r.page.path.toLowerCase().includes(q) &&
          !r.page.url.toLowerCase().includes(q) &&
          !(r.result?.title ?? "").toLowerCase().includes(q)
        ) {
          return false
        }
      }
      if (filter === "errors") {
        if (!r.result) return false
        return r.result.issues.some((i) => i.level === "error")
      }
      if (filter === "warnings") {
        if (!r.result) return false
        return r.result.issues.some((i) => i.level === "warning")
      }
      if (filter === "missing") return !r.result
      if (filter === "audited") return r.result !== null
      if (issueFilter !== "all") {
        if (!r.result) return false
        return r.result.issues.some((i) => i.type === issueFilter)
      }
      return true
    })
  }, [rows, query, filter, issueFilter])

  const batchActive = batchProgress !== null

  return (
    <div className="space-y-5">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
          Site audit
        </p>
        <h2 className="mt-1 text-2xl font-bold tracking-tight text-foreground">
          Live SEO crawl
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Fetches every indexable page over HTTP, parses the served HTML, and
          flags 14+ classes of SEO issue. Results cache for 24 hours. Each
          page audit is one HTTP request — no external API quotas.
        </p>
      </div>

      <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
        <StatCard label="Pages" value={aggregates.total} />
        <StatCard label="Audited" value={`${aggregates.audited}/${aggregates.total}`} />
        <StatCard label="Errors" value={aggregates.errors} tone="error" />
        <StatCard label="Warnings" value={aggregates.warnings} tone="warning" />
        <StatCard label="Infos" value={aggregates.infos} tone="info" />
        <StatCard label="Avg response" value={aggregates.avgResponseMs ? `${aggregates.avgResponseMs}ms` : "—"} tone="muted" />
      </div>

      {aggregates.sortedIssues.length > 0 ? (
        <div className="rounded-xl border border-border bg-card p-4">
          <h3 className="mb-3 text-sm font-semibold tracking-tight">
            Most common issues
          </h3>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {aggregates.sortedIssues.slice(0, 9).map(([type, count]) => (
              <button
                key={type}
                type="button"
                onClick={() => {
                  setIssueFilter(type)
                  setFilter("all")
                }}
                className={`flex items-center justify-between gap-2 rounded-md border px-3 py-2 text-left text-sm transition hover:bg-muted/50 ${
                  issueFilter === type ? "border-primary bg-primary/5" : "border-border"
                }`}
              >
                <span className="truncate text-foreground">{prettyIssueType(type)}</span>
                <Badge variant="outline" className="shrink-0">
                  {count}
                </Badge>
              </button>
            ))}
          </div>
          {issueFilter !== "all" ? (
            <button
              type="button"
              onClick={() => setIssueFilter("all")}
              className="mt-2 text-xs text-muted-foreground hover:text-foreground"
            >
              Clear issue filter
            </button>
          ) : null}
        </div>
      ) : null}

      {aggregates.dupTitles.length > 0 || aggregates.dupDescs.length > 0 ? (
        <div className="rounded-xl border border-border bg-card p-4">
          <h3 className="mb-3 text-sm font-semibold tracking-tight">
            Duplicates across pages
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {aggregates.dupTitles.length > 0 ? (
              <DuplicateGroup
                icon={Copy}
                label="Duplicate titles"
                groups={aggregates.dupTitles}
              />
            ) : null}
            {aggregates.dupDescs.length > 0 ? (
              <DuplicateGroup
                icon={Link2}
                label="Duplicate descriptions"
                groups={aggregates.dupDescs}
              />
            ) : null}
          </div>
        </div>
      ) : null}

      <div className="flex flex-wrap items-center gap-2 rounded-xl border border-border bg-card p-3">
        {batchActive ? (
          <Button onClick={cancelBatch} variant="outline" size="sm">
            <Square className="h-3.5 w-3.5" aria-hidden="true" />
            Cancel ({batchProgress!.done}/{batchProgress!.total})
          </Button>
        ) : (
          <Button
            onClick={runStale}
            size="sm"
            disabled={aggregates.missing === 0 && aggregates.stale === 0}
          >
            <RefreshCcw className="h-3.5 w-3.5" aria-hidden="true" />
            {aggregates.audited === 0
              ? `Crawl all (${aggregates.total})`
              : `Crawl ${aggregates.missing + aggregates.stale} stale`}
          </Button>
        )}
        <div className="ml-auto flex items-center gap-2">
          <div className="relative">
            <Search className="pointer-events-none absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter paths or titles…"
              className="h-9 w-[220px] pl-7 text-sm"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as typeof filter)}
            className="h-9 rounded-md border border-input bg-background px-2 text-sm"
          >
            <option value="all">All</option>
            <option value="errors">Has errors</option>
            <option value="warnings">Has warnings</option>
            <option value="audited">Audited</option>
            <option value="missing">Not audited</option>
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="w-8 px-2 py-2"></th>
                <th className="px-3 py-2 text-left">Path</th>
                <th className="px-2 py-2 text-center">Status</th>
                <th className="px-3 py-2 text-left">Title</th>
                <th className="px-2 py-2 text-center">Issues</th>
                <th className="px-3 py-2 text-left">Audited</th>
                <th className="px-3 py-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {visible.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-sm text-muted-foreground">
                    {rows.length === 0 ? "Loading paths…" : "No pages match this filter."}
                  </td>
                </tr>
              ) : (
                visible.map((r) => {
                  const isOpen = expanded === r.page.url
                  const errCount = r.result?.issues.filter((i) => i.level === "error").length ?? 0
                  const warnCount = r.result?.issues.filter((i) => i.level === "warning").length ?? 0
                  const infoCount = r.result?.issues.filter((i) => i.level === "info").length ?? 0
                  return (
                    <RowGroup
                      key={r.page.url}
                      row={r}
                      isOpen={isOpen}
                      onToggle={() => setExpanded(isOpen ? null : r.page.url)}
                      onRun={() => runOne(r.page.url)}
                      counts={{ err: errCount, warn: warnCount, info: infoCount }}
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

function DuplicateGroup({
  icon: Icon,
  label,
  groups,
}: {
  icon: typeof Copy
  label: string
  groups: Array<[string, string[]]>
}) {
  return (
    <div>
      <div className="mb-2 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        <Icon className="h-3.5 w-3.5" aria-hidden="true" />
        {label} ({groups.length} group{groups.length > 1 ? "s" : ""})
      </div>
      <div className="space-y-2">
        {groups.slice(0, 5).map(([text, paths]) => (
          <div key={text} className="rounded-md border border-border bg-background/60 px-3 py-2">
            <div className="truncate text-sm font-medium" title={text}>
              "{text}"
            </div>
            <div className="mt-1 text-[11px] font-mono text-muted-foreground">
              {paths.join(", ")}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function RowGroup({
  row,
  isOpen,
  onToggle,
  onRun,
  counts,
}: {
  row: RowState
  isOpen: boolean
  onToggle: () => void
  onRun: () => void
  counts: { err: number; warn: number; info: number }
}) {
  const r = row.result
  return (
    <>
      <tr
        className={`border-t border-border transition hover:bg-muted/30 ${
          isOpen ? "bg-muted/40" : ""
        } ${r ? "cursor-pointer" : ""}`}
        onClick={() => r && onToggle()}
      >
        <td className="px-2 py-2 text-center">
          {r ? (
            <ChevronRight
              className={`h-4 w-4 text-muted-foreground transition-transform ${
                isOpen ? "rotate-90" : ""
              }`}
              aria-hidden="true"
            />
          ) : null}
        </td>
        <td className="px-3 py-2">
          <div className="font-mono text-[13px] text-foreground">{row.page.path}</div>
          <div className="text-[11px] text-muted-foreground">{row.page.kind}</div>
          {row.error ? (
            <div className="mt-0.5 inline-flex items-center gap-1 text-[11px] text-red-600 dark:text-red-400">
              <AlertTriangle className="h-3 w-3" aria-hidden="true" />
              {row.error}
            </div>
          ) : null}
        </td>
        <td className="px-2 py-2 text-center">
          <span className={`text-sm font-semibold tabular-nums ${statusClass(r?.status ?? 0)}`}>
            {r?.status ?? "—"}
          </span>
        </td>
        <td className="px-3 py-2">
          {r?.title ? (
            <>
              <div className="line-clamp-1 text-foreground" title={r.title}>
                {r.title}
              </div>
              <div className="text-[11px] text-muted-foreground">{r.title.length} chars</div>
            </>
          ) : (
            <span className="text-muted-foreground">—</span>
          )}
        </td>
        <td className="px-2 py-2">
          <div className="flex items-center justify-center gap-1.5">
            <CountChip count={counts.err} level="error" />
            <CountChip count={counts.warn} level="warning" />
            <CountChip count={counts.info} level="info" />
          </div>
        </td>
        <td className="px-3 py-2 text-xs text-muted-foreground">
          {r ? timeAgo(r.fetchedAt) : "—"}
        </td>
        <td className="px-3 py-2 text-right">
          <div className="inline-flex items-center gap-1">
            <a
              href={row.page.url}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex h-8 items-center justify-center rounded-md border border-input px-2 text-muted-foreground hover:text-foreground"
              aria-label="Open page"
            >
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
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
              {row.running ? "Running" : r ? "Re-run" : "Run"}
            </Button>
          </div>
        </td>
      </tr>
      {isOpen && r ? (
        <tr className="border-t border-border">
          <td colSpan={7} className="p-0">
            <DetailPanel result={r} />
          </td>
        </tr>
      ) : null}
    </>
  )
}

function CountChip({ count, level }: { count: number; level: AuditLevel }) {
  const meta = LEVEL_META[level]
  if (count === 0) {
    return (
      <span className="inline-flex h-6 w-7 items-center justify-center rounded text-[11px] text-muted-foreground/40 tabular-nums">
        0
      </span>
    )
  }
  return (
    <span
      className={`inline-flex h-6 w-7 items-center justify-center rounded text-[11px] font-semibold tabular-nums ${meta.bg} ${meta.text}`}
      title={`${count} ${meta.label.toLowerCase()}${count > 1 ? "s" : ""}`}
    >
      {count}
    </span>
  )
}

function prettyIssueType(t: string): string {
  return t
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
}
