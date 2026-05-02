"use client"

import { useCallback, useEffect, useState } from "react"
import {
  Gauge,
  Smartphone,
  Monitor,
  RefreshCcw,
  AlertTriangle,
  ExternalLink,
  Clock,
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

function scoreColor(score: number | null): {
  ring: string
  text: string
  label: string
} {
  if (score === null) return { ring: "stroke-muted-foreground/40", text: "text-muted-foreground", label: "—" }
  if (score >= 90) return { ring: "stroke-emerald-500", text: "text-emerald-600 dark:text-emerald-400", label: "Good" }
  if (score >= 50) return { ring: "stroke-amber-500", text: "text-amber-600 dark:text-amber-400", label: "Needs work" }
  return { ring: "stroke-red-500", text: "text-red-600 dark:text-red-400", label: "Poor" }
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

function ScoreRing({ label, score }: { label: string; score: number | null }) {
  const { ring, text, label: bucket } = scoreColor(score)
  const display = score === null ? "—" : String(score)
  // Conic-gradient ring built from CSS — no chart lib needed.
  const angle = score === null ? 0 : (score / 100) * 360
  const ringColor =
    score === null
      ? "rgb(148 163 184 / 0.4)"
      : score >= 90
        ? "rgb(16 185 129)"
        : score >= 50
          ? "rgb(245 158 11)"
          : "rgb(239 68 68)"
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-5">
      <div
        className="grid h-24 w-24 place-items-center rounded-full"
        style={{
          background: `conic-gradient(${ringColor} ${angle}deg, hsl(var(--muted)) ${angle}deg)`,
        }}
        aria-hidden="true"
      >
        <div className="grid h-[78px] w-[78px] place-items-center rounded-full bg-card">
          <span className={`text-2xl font-semibold tabular-nums ${text}`}>{display}</span>
        </div>
      </div>
      <div className="text-center">
        <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </div>
        <div className={`text-[11px] font-semibold ${text}`}>{bucket}</div>
      </div>
    </div>
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

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  if (diff < 60_000) return "just now"
  const min = Math.floor(diff / 60_000)
  if (min < 60) return `${min} min ago`
  const hr = Math.floor(min / 60)
  if (hr < 24) return `${hr} h ago`
  return new Date(iso).toLocaleString()
}

export function PageSpeedDashboard({
  defaultUrl,
  paths = [],
}: {
  defaultUrl: string
  paths?: string[]
}) {
  const [url, setUrl] = useState(defaultUrl)
  const [strategy, setStrategy] = useState<PsiStrategy>("mobile")
  const [running, setRunning] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<PageSpeedResult | null>(null)

  // On URL/strategy change, look for a cached result so re-opening the tab
  // shows the last audit instantly.
  const loadCached = useCallback(async () => {
    setError(null)
    setResult(null)
    if (!url) return
    try {
      const res = await fetch(
        `/api/dev/seo/pagespeed?url=${encodeURIComponent(url)}&strategy=${strategy}`,
      )
      if (res.status === 404) return
      const data = await res.json()
      if (data.ok) setResult(data.result)
    } catch {
      // cache read failures are silent
    }
  }, [url, strategy])

  useEffect(() => {
    loadCached()
  }, [loadCached])

  async function runAudit() {
    setRunning(true)
    setError(null)
    try {
      const res = await fetch("/api/dev/seo/pagespeed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, strategy }),
      })
      const data = await res.json()
      if (!data.ok) {
        setError(data.message || data.error || "Audit failed")
        return
      }
      setResult(data.result)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Network error")
    } finally {
      setRunning(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="flex items-center gap-2">
          <Gauge className="h-5 w-5 text-primary" aria-hidden="true" />
          <h2 className="text-lg font-semibold tracking-tight">PageSpeed audit</h2>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          Live Lighthouse audit via Google PageSpeed Insights. Results cached
          for 1 hour. PSI runs take 15–35 seconds — be patient.
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto_auto]">
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.smslocal.in/"
            list={paths.length ? "pagespeed-paths" : undefined}
            disabled={running}
          />
          {paths.length ? (
            <datalist id="pagespeed-paths">
              {paths.slice(0, 200).map((p) => (
                <option key={p} value={p} />
              ))}
            </datalist>
          ) : null}
          <div className="inline-flex rounded-md border border-border bg-background p-1">
            <button
              type="button"
              onClick={() => setStrategy("mobile")}
              disabled={running}
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
              disabled={running}
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
          <Button onClick={runAudit} disabled={running || !url}>
            <RefreshCcw
              className={`h-4 w-4 ${running ? "animate-spin" : ""}`}
              aria-hidden="true"
            />
            {running ? "Running…" : "Run audit"}
          </Button>
        </div>

        {error ? (
          <div className="mt-3 flex items-start gap-2 rounded-md border border-red-500/40 bg-red-500/5 p-3 text-sm text-red-700 dark:text-red-300">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{error}</span>
          </div>
        ) : null}
      </div>

      {result ? (
        <>
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              {result.cached ? "Cached" : "Fetched"}{" "}
              {timeAgo(result.cachedAt ?? result.fetchedAt)} · Lighthouse{" "}
              {result.lighthouseVersion ?? "?"} · Strategy: {result.strategy}
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

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <ScoreRing label="Performance" score={result.scores.performance} />
            <ScoreRing label="Accessibility" score={result.scores.accessibility} />
            <ScoreRing label="SEO" score={result.scores.seo} />
            <ScoreRing label="Best practices" score={result.scores.bestPractices} />
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="text-sm font-semibold tracking-tight">Core Web Vitals</h3>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {result.webVitals.source === "lab"
                ? "Lab metrics from this Lighthouse run. Field data unavailable for this URL."
                : "Field data (CrUX) where available, otherwise lab metrics."}
            </p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {(Object.keys(VITAL_LABELS) as Array<keyof typeof VITAL_LABELS>).map((k) => (
                <VitalRow key={k} name={VITAL_LABELS[k]} vital={result.webVitals[k]} />
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="text-sm font-semibold tracking-tight">
              Opportunities ({result.opportunities.length})
            </h3>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Highest-impact fixes Lighthouse identified, sorted by estimated savings.
            </p>
            <div className="mt-4 space-y-2">
              {result.opportunities.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No opportunities flagged — performance looks clean.
                </p>
              ) : (
                result.opportunities.map((o) => (
                  <OpportunityRow key={o.id} opp={o} />
                ))
              )}
            </div>
          </div>
        </>
      ) : !running ? (
        <div className="rounded-xl border border-dashed border-border p-10 text-center">
          <Gauge className="mx-auto h-8 w-8 text-muted-foreground" aria-hidden="true" />
          <p className="mt-3 text-sm text-muted-foreground">
            No audit yet for this URL + strategy. Click <strong>Run audit</strong> to start.
          </p>
        </div>
      ) : null}
    </div>
  )
}
