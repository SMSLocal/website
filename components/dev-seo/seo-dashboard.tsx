"use client"

import { useMemo, useState } from "react"
import {
  AlertCircle,
  AlertTriangle,
  Check,
  ChevronDown,
  ChevronRight,
  Copy,
  ExternalLink,
  Search,
  ShieldOff,
} from "lucide-react"
import { SITE, type SeoAudit, type SeoIssueLevel } from "@/lib/seo"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

type FilterLevel = "all" | SeoIssueLevel

const LEVEL_META: Record<
  SeoIssueLevel,
  { label: string; dot: string; bg: string; text: string; ring: string }
> = {
  ok: {
    label: "Healthy",
    dot: "bg-emerald-500",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    ring: "ring-emerald-500/20",
  },
  warning: {
    label: "Needs review",
    dot: "bg-amber-500",
    bg: "bg-amber-50",
    text: "text-amber-700",
    ring: "ring-amber-500/20",
  },
  error: {
    label: "Broken",
    dot: "bg-red-500",
    bg: "bg-red-50",
    text: "text-red-700",
    ring: "ring-red-500/20",
  },
}

function clsx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ")
}

function LengthBadge({
  value,
  min,
  max,
  label,
}: {
  value: number
  min: number
  max: number
  label: string
}) {
  const level: SeoIssueLevel =
    value === 0 ? "error" : value < min || value > max ? "warning" : "ok"
  const meta = LEVEL_META[level]
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset",
        meta.bg,
        meta.text,
        meta.ring,
      )}
      title={`${label}: ${value} chars (target ${min}–${max})`}
    >
      <span className={clsx("h-1.5 w-1.5 rounded-full", meta.dot)} />
      {value} / {max}
    </span>
  )
}

function SerpPreview({ audit }: { audit: SeoAudit }) {
  const url = `${SITE.url}${audit.path === "/404" ? "/not-found" : audit.path}`
  const displayUrl = url.replace(/^https?:\/\//, "").replace(/\/$/, "")
  const crumbs = displayUrl.split("/")
  const title =
    audit.entry.titleAbsolute ?? `${audit.entry.title ?? ""} | ${SITE.name}`
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
        Google SERP preview
      </div>
      <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-muted">
          <span className="h-3 w-3 rounded-full bg-primary/70" />
        </span>
        <span className="font-medium text-foreground/80">{crumbs[0]}</span>
        {crumbs.slice(1).map((c, i) => (
          <span key={i} className="flex items-center gap-1">
            <ChevronRight className="h-3 w-3 opacity-50" />
            <span className="opacity-80">{c}</span>
          </span>
        ))}
      </div>
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="mt-1 block text-[20px] leading-snug text-[#1a0dab] hover:underline"
      >
        {title}
      </a>
      <p className="mt-1 text-sm leading-snug text-[#4d5156]">
        {audit.entry.description}
      </p>
    </div>
  )
}

function OgPreview({ audit }: { audit: SeoAudit }) {
  const ogImage = audit.entry.ogImage ?? SITE.defaultOgImage
  const title =
    audit.entry.titleAbsolute ?? `${audit.entry.title ?? ""} | ${SITE.name}`
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="px-4 pt-4 text-[11px] uppercase tracking-wider text-muted-foreground">
        Open Graph preview
      </div>
      <div className="p-4">
        <div className="overflow-hidden rounded-lg border border-border">
          <div className="relative aspect-[1200/630] w-full bg-muted">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ogImage}
              alt="Open Graph social share preview"
              className="h-full w-full object-cover"
              onError={(e) => {
                ;(e.currentTarget as HTMLImageElement).style.display = "none"
              }}
            />
          </div>
          <div className="border-t border-border bg-muted/40 p-3">
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
              {SITE.url.replace(/^https?:\/\//, "")}
            </div>
            <div className="mt-1 line-clamp-2 text-sm font-semibold text-foreground">
              {title}
            </div>
            <div className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
              {audit.entry.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function IssueList({ audit }: { audit: SeoAudit }) {
  if (audit.issues.length === 0) return null
  return (
    <ul className="space-y-1.5">
      {audit.issues.map((issue, i) => {
        const Icon = issue.level === "error" ? AlertCircle : AlertTriangle
        const meta = LEVEL_META[issue.level]
        return (
          <li key={i} className="flex items-start gap-2 text-xs">
            <Icon className={clsx("mt-0.5 h-3.5 w-3.5 shrink-0", meta.text)} />
            <span className="text-foreground/80">{issue.message}</span>
          </li>
        )
      })}
    </ul>
  )
}

function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value)
          setCopied(true)
          setTimeout(() => setCopied(false), 1500)
        } catch {
          /* no-op */
        }
      }}
      className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-1.5 py-0.5 text-[11px] text-muted-foreground transition hover:text-foreground"
      aria-label={`Copy ${label}`}
    >
      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
      {copied ? "Copied" : "Copy"}
    </button>
  )
}

function EntryCard({ audit }: { audit: SeoAudit }) {
  const [open, setOpen] = useState(audit.worstLevel !== "ok")
  const meta = LEVEL_META[audit.worstLevel]
  const title =
    audit.entry.titleAbsolute ?? audit.entry.title ?? "(no title)"
  const keywords = audit.entry.keywords ?? []

  return (
    <Card className="overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-3 px-5 py-4 text-left transition hover:bg-muted/50"
      >
        <span
          className={clsx("h-2.5 w-2.5 shrink-0 rounded-full", meta.dot)}
          aria-label={meta.label}
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[11px] text-foreground/80">
              {audit.path}
            </code>
            {audit.entry.noindex ? (
              <Badge variant="secondary" className="gap-1 text-[10px]">
                <ShieldOff className="h-3 w-3" />
                noindex
              </Badge>
            ) : null}
            {audit.entry.type === "article" ? (
              <Badge variant="secondary" className="text-[10px]">
                article
              </Badge>
            ) : null}
            {audit.issues.length > 0 ? (
              <span
                className={clsx(
                  "inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-medium ring-1 ring-inset",
                  meta.bg,
                  meta.text,
                  meta.ring,
                )}
              >
                {audit.issues.length} issue
                {audit.issues.length === 1 ? "" : "s"}
              </span>
            ) : null}
          </div>
          <div className="mt-1 truncate text-sm font-medium text-foreground">
            {title}
          </div>
          <div className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
            {audit.entry.description}
          </div>
        </div>
        <div className="hidden shrink-0 items-center gap-2 md:flex">
          <LengthBadge
            label="Title"
            value={audit.titleLength}
            min={30}
            max={60}
          />
          <LengthBadge
            label="Description"
            value={audit.descriptionLength}
            min={120}
            max={160}
          />
        </div>
        <ChevronDown
          className={clsx(
            "ml-1 h-4 w-4 shrink-0 text-muted-foreground transition",
            open && "rotate-180",
          )}
        />
      </button>

      {open ? (
        <div className="border-t border-border bg-muted/30 p-5">
          <div className="grid gap-5 lg:grid-cols-2">
            <SerpPreview audit={audit} />
            <OgPreview audit={audit} />
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-[2fr,1fr]">
            <div className="space-y-4">
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Title ({audit.titleLength} chars)
                  </div>
                  <CopyButton value={title} label="title" />
                </div>
                <div className="rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground">
                  {title}
                </div>
              </div>

              <div>
                <div className="mb-1 flex items-center justify-between">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Description ({audit.descriptionLength} chars)
                  </div>
                  <CopyButton value={audit.entry.description} label="description" />
                </div>
                <div className="rounded-md border border-border bg-background px-3 py-2 text-sm leading-relaxed text-foreground">
                  {audit.entry.description}
                </div>
              </div>

              <div>
                <div className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Page keywords ({keywords.length})
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {keywords.length === 0 ? (
                    <span className="text-xs text-muted-foreground">
                      None — inherits site defaults only.
                    </span>
                  ) : (
                    keywords.map((k) => (
                      <Badge
                        key={k}
                        variant="secondary"
                        className="font-normal"
                      >
                        {k}
                      </Badge>
                    ))
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Canonical URL
                </div>
                <a
                  href={`${SITE.url}${audit.path}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 break-all rounded-md border border-border bg-background px-3 py-2 font-mono text-xs text-primary hover:underline"
                >
                  {SITE.url}
                  {audit.path}
                  <ExternalLink className="h-3 w-3 shrink-0" />
                </a>
              </div>

              {audit.issues.length > 0 ? (
                <div>
                  <div className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Issues
                  </div>
                  <div className="rounded-md border border-border bg-background p-3">
                    <IssueList audit={audit} />
                  </div>
                </div>
              ) : (
                <div className="rounded-md border border-emerald-500/20 bg-emerald-50 px-3 py-2 text-xs text-emerald-700">
                  No issues detected. Length, keywords, and uniqueness look
                  healthy.
                </div>
              )}

              <div className="rounded-md border border-border bg-background p-3 text-[11px] leading-relaxed text-muted-foreground">
                <strong className="font-semibold text-foreground">
                  How to edit:
                </strong>{" "}
                open{" "}
                <code className="rounded bg-muted px-1 font-mono">
                  lib/seo/registry.ts
                </code>
                , find the key{" "}
                <code className="rounded bg-muted px-1 font-mono">
                  {`"${audit.path}"`}
                </code>
                , change title / description / keywords, and save. The preview
                above updates on reload.
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </Card>
  )
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
  level: SeoIssueLevel | "total"
  active: boolean
  onClick: () => void
  disabled?: boolean
}) {
  const meta =
    level === "total"
      ? { dot: "bg-primary", bg: "bg-primary/5", ring: "ring-primary/30" }
      : {
          dot: LEVEL_META[level].dot,
          bg: LEVEL_META[level].bg,
          ring: LEVEL_META[level].ring,
        }

  const hint =
    level === "total"
      ? "Show all pages"
      : level === "ok"
        ? "Show only healthy pages"
        : level === "warning"
          ? "Show only pages with warnings"
          : "Show only pages with errors"

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={active}
      title={disabled ? `No ${label.toLowerCase()}` : hint}
      className={clsx(
        "group flex items-center gap-3 rounded-xl border bg-card px-4 py-3 text-left transition",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        active
          ? clsx("border-transparent ring-2 ring-inset", meta.bg, meta.ring)
          : "border-border hover:border-foreground/20 hover:bg-muted/50",
        disabled && "cursor-not-allowed opacity-60 hover:border-border hover:bg-card",
      )}
    >
      <span className={clsx("h-2.5 w-2.5 shrink-0 rounded-full", meta.dot)} />
      <div className="min-w-0 flex-1">
        <div className="text-2xl font-semibold leading-none text-foreground">
          {value}
        </div>
        <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
          <span>{label}</span>
          {active ? (
            <span className="inline-flex items-center gap-0.5 rounded bg-foreground/10 px-1 text-[9px] font-semibold uppercase tracking-wider text-foreground/70">
              Filtering
            </span>
          ) : null}
        </div>
      </div>
    </button>
  )
}

export function SeoDashboard({ audits }: { audits: SeoAudit[] }) {
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState<FilterLevel>("all")

  const applyFilter = (next: FilterLevel) => {
    setFilter((prev) => (prev === next && next !== "all" ? "all" : next))
    if (typeof window !== "undefined") {
      // Smooth-scroll the results into view so the user immediately sees the filtered list.
      requestAnimationFrame(() => {
        const el = document.getElementById("seo-results")
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
      })
    }
  }

  const totals = useMemo(() => {
    let ok = 0
    let warning = 0
    let error = 0
    for (const a of audits) {
      if (a.worstLevel === "error") error++
      else if (a.worstLevel === "warning") warning++
      else ok++
    }
    return { total: audits.length, ok, warning, error }
  }, [audits])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return audits.filter((a) => {
      if (filter !== "all" && a.worstLevel !== filter) return false
      if (!q) return true
      const haystack = [
        a.path,
        a.entry.title ?? "",
        a.entry.titleAbsolute ?? "",
        a.entry.description,
        ...(a.entry.keywords ?? []),
      ]
        .join(" ")
        .toLowerCase()
      return haystack.includes(q)
    })
  }, [audits, filter, query])

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <header className="mb-8">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-700">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            Development only
          </span>
        </div>
        <h1 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          SEO registry
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Every page&apos;s title, description, keywords, canonical URL, and
          social card preview in one place. To edit any entry, change the
          corresponding key in{" "}
          <code className="rounded bg-muted px-1 font-mono text-xs">
            lib/seo/registry.ts
          </code>{" "}
          and save.
        </p>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard
            label="Total pages"
            value={totals.total}
            level="total"
            active={filter === "all"}
            onClick={() => applyFilter("all")}
          />
          <StatCard
            label="Healthy"
            value={totals.ok}
            level="ok"
            active={filter === "ok"}
            onClick={() => applyFilter("ok")}
            disabled={totals.ok === 0}
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
            label="Errors"
            value={totals.error}
            level="error"
            active={filter === "error"}
            onClick={() => applyFilter("error")}
            disabled={totals.error === 0}
          />
        </div>
        <p className="mt-2 text-[11px] text-muted-foreground">
          Tip: click any card above to filter the list below. Click it again to
          clear.
        </p>
      </header>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-sm flex-1">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <Input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search path, title, description, keywords…"
            className="pl-9"
          />
        </div>

        <div
          className="inline-flex items-center gap-1 rounded-lg border border-border bg-card p-1"
          role="tablist"
          aria-label="Filter by status"
        >
          {(["all", "error", "warning", "ok"] as const).map((key) => {
            const active = filter === key
            const label =
              key === "all"
                ? "All"
                : key === "ok"
                  ? "Healthy"
                  : key === "warning"
                    ? "Warnings"
                    : "Errors"
            const count =
              key === "all"
                ? totals.total
                : key === "ok"
                  ? totals.ok
                  : key === "warning"
                    ? totals.warning
                    : totals.error
            return (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => applyFilter(key)}
                className={clsx(
                  "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition",
                  active
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {label}
                <span
                  className={clsx(
                    "rounded px-1 text-[10px] font-semibold",
                    active
                      ? "bg-primary-foreground/20 text-primary-foreground"
                      : "bg-muted text-muted-foreground",
                  )}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <div id="seo-results" className="scroll-mt-6">
        <div className="mb-3 flex items-center justify-between text-xs text-muted-foreground">
          <span>
            Showing{" "}
            <span className="font-semibold text-foreground">
              {filtered.length}
            </span>{" "}
            of {totals.total} pages
            {filter !== "all" ? (
              <>
                {" "}
                · filtered by{" "}
                <span className="font-semibold text-foreground">
                  {filter === "ok"
                    ? "Healthy"
                    : filter === "warning"
                      ? "Warnings"
                      : "Errors"}
                </span>
              </>
            ) : null}
          </span>
          {filter !== "all" || query ? (
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
          ) : null}
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-card p-10 text-center">
            <p className="text-sm text-muted-foreground">
              No entries match your filter.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((audit) => (
              <EntryCard key={audit.path} audit={audit} />
            ))}
          </div>
        )}
      </div>

      <footer className="mt-10 rounded-xl border border-border bg-card p-5 text-xs text-muted-foreground">
        <div className="font-semibold text-foreground">About this page</div>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>
            Renders only when <code>NODE_ENV !== &quot;production&quot;</code>. On
            smslocal.in this route returns 404.
          </li>
          <li>
            Data is the live registry at build time —{" "}
            <code>lib/seo/registry.ts</code>.
          </li>
          <li>
            Dynamic routes (blog posts, help articles, customer stories) are
            not shown here — their SEO is generated from their content files.
          </li>
        </ul>
      </footer>
    </div>
  )
}
