"use client"

import { useState } from "react"
import { AlertTriangle, Info, XCircle, FileText, Link as LinkIcon, Image as ImageIcon, Circle } from "lucide-react"
import type { TechnicalAudit, TechIssue, TechIssueType } from "@/lib/seo/technical-audit"

type FilterLevel = "all" | "error" | "warning" | "info"

const LEVEL_META = {
  error: {
    icon: XCircle,
    dot: "bg-red-500",
    text: "text-red-600 dark:text-red-400",
    bg: "bg-red-50 dark:bg-red-950/30",
    ring: "ring-red-500/30",
    badge: "Error",
  },
  warning: {
    icon: AlertTriangle,
    dot: "bg-amber-500",
    text: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-950/30",
    ring: "ring-amber-500/30",
    badge: "Warning",
  },
  info: {
    icon: Info,
    dot: "bg-blue-500",
    text: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    ring: "ring-blue-500/30",
    badge: "Info",
  },
}

const TYPE_META: Record<TechIssueType, { icon: any; label: string }> = {
  "multiple-h1": { icon: FileText, label: "Multiple H1s" },
  "missing-alt": { icon: ImageIcon, label: "Missing alt" },
  "empty-alt": { icon: ImageIcon, label: "Empty alt" },
  "broken-internal-link": { icon: LinkIcon, label: "Broken link" },
  "placeholder-href": { icon: LinkIcon, label: "Placeholder href" },
  "unsafe-external-link": { icon: LinkIcon, label: "Unsafe external" },
  "generic-link-text": { icon: LinkIcon, label: "Generic link text" },
  "orphan-page": { icon: Circle, label: "Orphan page" },
  "under-linked": { icon: Circle, label: "Under-linked" },
}

function StatCard({
  label,
  value,
  level,
  active,
  onClick,
  disabled,
}: {
  label: string
  value: number
  level: "error" | "warning" | "info" | "total"
  active: boolean
  onClick: () => void
  disabled?: boolean
}) {
  const meta =
    level === "total"
      ? { dot: "bg-primary", bg: "bg-primary/5", ring: "ring-primary/30" }
      : LEVEL_META[level]

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={active}
      className={`group flex items-center gap-3 rounded-xl border bg-card px-4 py-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
        active
          ? `border-transparent ring-2 ring-inset ${meta.bg} ${meta.ring}`
          : "border-border hover:border-foreground/20 hover:bg-muted/50"
      } ${disabled ? "cursor-not-allowed opacity-60 hover:border-border hover:bg-card" : ""}`}
    >
      <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${meta.dot}`} />
      <div className="min-w-0 flex-1">
        <div className="text-2xl font-semibold leading-none text-foreground tabular-nums">
          {value}
        </div>
        <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
          <span>{label}</span>
          {active && (
            <span className="inline-flex items-center gap-0.5 rounded bg-foreground/10 px-1 text-[9px] font-semibold uppercase tracking-wider text-foreground/70">
              Filtering
            </span>
          )}
        </div>
      </div>
    </button>
  )
}

export function TechnicalDashboard({ result }: { result: TechnicalAudit }) {
  const [filter, setFilter] = useState<FilterLevel>("all")
  const [query, setQuery] = useState("")

  const applyFilter = (next: FilterLevel) => {
    setFilter((prev) => (prev === next && next !== "all" ? "all" : next))
    if (typeof window !== "undefined") {
      requestAnimationFrame(() => {
        const el = document.getElementById("technical-results")
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
      })
    }
  }

  const totals = {
    total: result.issues.length,
    error: result.issues.filter((i) => i.level === "error").length,
    warning: result.issues.filter((i) => i.level === "warning").length,
    info: result.issues.filter((i) => i.level === "info").length,
  }

  const filtered = result.issues.filter((issue) => {
    if (filter !== "all" && issue.level !== filter) return false
    if (query) {
      const q = query.toLowerCase()
      return (
        issue.file.toLowerCase().includes(q) ||
        issue.message.toLowerCase().includes(q) ||
        (issue.snippet && issue.snippet.toLowerCase().includes(q)) ||
        (issue.route && issue.route.toLowerCase().includes(q))
      )
    }
    return true
  })

  // Group by type
  const grouped = filtered.reduce(
    (acc, issue) => {
      if (!acc[issue.type]) acc[issue.type] = []
      acc[issue.type].push(issue)
      return acc
    },
    {} as Record<TechIssueType, TechIssue[]>,
  )

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-baseline justify-between">
          <h2 className="text-[15.5px] font-semibold tracking-tight text-foreground">
            Technical SEO Audit
          </h2>
          <span className="inline-flex items-center gap-1 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-primary">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
            Live
          </span>
        </div>
        <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
          Scanned <span className="font-semibold text-foreground">{result.stats.filesScanned}</span> files ·{" "}
          <span className="font-semibold text-foreground">{result.stats.routesKnown}</span> known routes ·{" "}
          <span className="font-semibold text-foreground">{result.stats.internalLinks}</span> internal links ·{" "}
          <span className="font-semibold text-foreground">{result.stats.externalLinks}</span> external ·{" "}
          <span className="font-semibold text-foreground">{result.stats.images}</span> images
        </p>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard
            label="Total issues"
            value={totals.total}
            level="total"
            active={filter === "all"}
            onClick={() => applyFilter("all")}
          />
          <StatCard
            label="Errors"
            value={totals.error}
            level="error"
            active={filter === "error"}
            onClick={() => applyFilter("error")}
            disabled={totals.error === 0}
          />
          <StatCard
            label="Warnings"
            value={totals.warning}
            level="warning"
            active={filter === "warning"}
            onClick={() => applyFilter("warning")}
            disabled={totals.warning === 0}
          />
          <StatCard
            label="Info"
            value={totals.info}
            level="info"
            active={filter === "info"}
            onClick={() => applyFilter("info")}
            disabled={totals.info === 0}
          />
        </div>

        <p className="mt-2 text-[11px] text-muted-foreground">
          Tip: click any card above to filter the list below. Click again to clear.
        </p>
      </div>

      <div>
        <input
          type="search"
          placeholder="Search file, message, route…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-[14px] text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div id="technical-results" className="scroll-mt-6">
        <div className="mb-3 flex items-center justify-between text-xs text-muted-foreground">
          <span>
            Showing <span className="font-semibold text-foreground">{filtered.length}</span> of {totals.total} issues
            {filter !== "all" && (
              <>
                {" "}
                · filtered by{" "}
                <span className="font-semibold text-foreground capitalize">{filter}</span>
              </>
            )}
          </span>
          {(filter !== "all" || query) && (
            <button
              type="button"
              onClick={() => {
                setFilter("all")
                setQuery("")
              }}
              className="rounded-md border border-border bg-card px-2 py-1 font-medium text-foreground transition hover:bg-muted"
            >
              Clear filters
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-card p-10 text-center">
            <p className="text-sm text-muted-foreground">No issues match your filter.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(grouped).map(([type, issues]) => {
              const meta = TYPE_META[type as TechIssueType]
              const Icon = meta.icon
              return (
                <div key={type} className="rounded-xl border border-border bg-card p-5 shadow-sm">
                  <div className="flex items-center gap-2.5 border-b border-border pb-3">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <h3 className="text-[14px] font-semibold text-foreground">{meta.label}</h3>
                    <span className="ml-auto rounded-full bg-muted px-2 py-0.5 text-[11px] font-semibold text-muted-foreground">
                      {issues.length}
                    </span>
                  </div>

                  <div className="mt-3 space-y-2.5">
                    {issues.map((issue, idx) => {
                      const LevelIcon = LEVEL_META[issue.level].icon
                      return (
                        <div key={idx} className="rounded-lg border border-border bg-background p-3">
                          <div className="flex items-start gap-2.5">
                            <LevelIcon className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${LEVEL_META[issue.level].text}`} />
                            <div className="min-w-0 flex-1 space-y-1.5">
                              <p className="text-[13px] leading-relaxed text-foreground">{issue.message}</p>
                              {issue.suggestion && (
                                <p className="text-[12px] leading-relaxed text-muted-foreground">
                                  <span className="font-semibold">Suggestion:</span> {issue.suggestion}
                                </p>
                              )}
                              <div className="flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
                                <span className="font-mono">{issue.file}</span>
                                {issue.line && <span>Line {issue.line}</span>}
                                {issue.route && <span className="font-mono">{issue.route}</span>}
                              </div>
                              {issue.snippet && (
                                <pre className="mt-2 overflow-x-auto rounded bg-muted p-2 text-[11px] text-foreground">
                                  {issue.snippet}
                                </pre>
                              )}
                            </div>
                            <span
                              className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${LEVEL_META[issue.level].bg} ${LEVEL_META[issue.level].text}`}
                            >
                              {LEVEL_META[issue.level].badge}
                            </span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
