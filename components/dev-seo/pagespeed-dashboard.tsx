"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import {
  Gauge,
  RefreshCcw,
  AlertTriangle,
  ExternalLink,
  Square,
  Smartphone,
  Monitor,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import type { PageSpeedPage } from "./admin-shell"
import type { PageSpeedResult, PsiStrategy } from "@/lib/seo/pagespeed"

type StrategyState = {
  result: PageSpeedResult | null
  running: boolean
  error: string | null
}

type CardState = {
  page: PageSpeedPage
  mobile: StrategyState
  desktop: StrategyState
}

const STRATEGIES: PsiStrategy[] = ["mobile", "desktop"]
const MAX_CONCURRENT = 2
/** Server caches results for 24 h — match that here so a daily refresh
 *  keeps the dashboard fresh without burning quota every visit. */
const STALE_MS = 24 * 60 * 60 * 1000

function scoreClasses(score: number | null): string {
  if (score === null) return "text-muted-foreground"
  if (score >= 90) return "text-emerald-500 dark:text-emerald-400"
  if (score >= 50) return "text-amber-500 dark:text-amber-400"
  return "text-red-500 dark:text-red-400"
}

function vitalClasses(rating: "good" | "needs-improvement" | "poor" | null): string {
  if (rating === "good") return "text-emerald-500 dark:text-emerald-400"
  if (rating === "needs-improvement") return "text-amber-500 dark:text-amber-400"
  if (rating === "poor") return "text-red-500 dark:text-red-400"
  return "text-muted-foreground"
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

function ScoreNumber({ label, score }: { label: string; score: number | null }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-background/40 px-2 py-3">
      <div className={`text-3xl font-bold tabular-nums leading-none ${scoreClasses(score)}`}>
        {score === null ? "—" : score}
      </div>
      <div className="mt-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
    </div>
  )
}

function VitalNumber({
  label,
  display,
  rating,
}: {
  label: string
  display: string
  rating: "good" | "needs-improvement" | "poor" | null
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className={`text-base font-semibold tabular-nums ${vitalClasses(rating)}`}>
        {display}
      </div>
      <div className="mt-0.5 text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
    </div>
  )
}

function StrategyPanel({
  strategy,
  state,
  url,
  onRun,
}: {
  strategy: PsiStrategy
  state: StrategyState
  url: string
  onRun: () => void
}) {
  const r = state.result
  const Icon = strategy === "mobile" ? Smartphone : Monitor
  return (
    <div className="rounded-lg border border-border bg-card/40 p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          <Icon className="h-3.5 w-3.5" aria-hidden="true" />
          {strategy}
        </div>
        <div className="flex items-center gap-2">
          {r ? (
            <a
              href={`https://pagespeed.web.dev/analysis?url=${encodeURIComponent(url)}&form_factor=${strategy}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center text-[11px] text-muted-foreground hover:text-foreground"
              aria-label={`Open ${strategy} report on pagespeed.web.dev`}
            >
              <ExternalLink className="h-3 w-3" aria-hidden="true" />
            </a>
          ) : null}
          <button
            type="button"
            onClick={onRun}
            disabled={state.running}
            className="inline-flex items-center gap-1 rounded text-[11px] font-medium text-muted-foreground hover:text-foreground disabled:opacity-50"
          >
            <RefreshCcw
              className={`h-3 w-3 ${state.running ? "animate-spin" : ""}`}
              aria-hidden="true"
            />
            {state.running ? "Running" : r ? "Re-run" : "Run"}
          </button>
        </div>
      </div>

      {state.error ? (
        <div className="mb-3 flex items-start gap-2 rounded-md bg-red-500/5 p-2 text-[11px] text-red-600 dark:text-red-400">
          <AlertTriangle className="mt-0.5 h-3 w-3 shrink-0" aria-hidden="true" />
          <span className="line-clamp-2">{state.error}</span>
        </div>
      ) : null}

      <div className="grid grid-cols-4 gap-2">
        <ScoreNumber label="Perf" score={r?.scores.performance ?? null} />
        <ScoreNumber label="SEO" score={r?.scores.seo ?? null} />
        <ScoreNumber label="A11Y" score={r?.scores.accessibility ?? null} />
        <ScoreNumber label="Best" score={r?.scores.bestPractices ?? null} />
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2 border-t border-border/50 pt-3">
        <VitalNumber
          label="LCP"
          display={r?.webVitals.lcp?.display ?? "—"}
          rating={r?.webVitals.lcp?.rating ?? null}
        />
        <VitalNumber
          label="CLS"
          display={r?.webVitals.cls?.display ?? "—"}
          rating={r?.webVitals.cls?.rating ?? null}
        />
        <VitalNumber
          label="TTFB"
          display={r?.webVitals.ttfb?.display ?? "—"}
          rating={r?.webVitals.ttfb?.rating ?? null}
        />
      </div>

      {r ? (
        <div className="mt-3 text-center text-[10px] text-muted-foreground">
          {r.cached ? "Cached" : "Fetched"} {timeAgo(r.cachedAt ?? r.fetchedAt)}
          {r.webVitals.source !== "lab" ? " · Field + Lab" : " · Lab"}
          {r.opportunities.length > 0 ? ` · ${r.opportunities.length} opportunities` : ""}
        </div>
      ) : null}
    </div>
  )
}

function PageCard({
  state,
  onRun,
}: {
  state: CardState
  onRun: (strategy: PsiStrategy) => void
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="mb-3 flex flex-wrap items-center gap-2 border-b border-border pb-3">
        <code className="font-mono text-sm font-medium text-foreground">
          {state.page.path}
        </code>
        <a
          href={state.page.url}
          target="_blank"
          rel="noreferrer"
          className="text-muted-foreground hover:text-foreground"
          aria-label={`Open ${state.page.path} in new tab`}
        >
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
        <span className="ml-auto rounded bg-muted/60 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
          {state.page.kind}
        </span>
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        <StrategyPanel
          strategy="mobile"
          state={state.mobile}
          url={state.page.url}
          onRun={() => onRun("mobile")}
        />
        <StrategyPanel
          strategy="desktop"
          state={state.desktop}
          url={state.page.url}
          onRun={() => onRun("desktop")}
        />
      </div>
    </div>
  )
}

export function PageSpeedDashboard({ pages }: { pages: PageSpeedPage[] }) {
  const [cards, setCards] = useState<CardState[]>(() =>
    pages.map((p) => ({
      page: p,
      mobile: { result: null, running: false, error: null },
      desktop: { result: null, running: false, error: null },
    })),
  )
  const [batchProgress, setBatchProgress] = useState<{
    done: number
    total: number
  } | null>(null)
  const [quotaError, setQuotaError] = useState<string | null>(null)
  const cancelBatchRef = useRef(false)
  const quotaHitRef = useRef(false)

  const urls = useMemo(() => pages.map((p) => p.url), [pages])

  // On mount, batch-load cached results for both strategies in parallel.
  const loadCached = useCallback(async () => {
    if (urls.length === 0) return
    const fetchOne = async (strategy: PsiStrategy) => {
      const params = new URLSearchParams({ urls: urls.join(","), strategy })
      try {
        const res = await fetch(`/api/dev/seo/pagespeed/list/?${params}`)
        if (!res.ok) return {}
        const data = await res.json()
        return (data.ok ? data.results : {}) as Record<string, PageSpeedResult>
      } catch {
        return {}
      }
    }
    const [mobileMap, desktopMap] = await Promise.all([
      fetchOne("mobile"),
      fetchOne("desktop"),
    ])
    setCards((prev) =>
      prev.map((c) => ({
        ...c,
        mobile: { ...c.mobile, result: mobileMap[c.page.url] ?? null },
        desktop: { ...c.desktop, result: desktopMap[c.page.url] ?? null },
      })),
    )
  }, [urls])

  useEffect(() => {
    loadCached()
  }, [loadCached])

  function patchStrategy(
    url: string,
    strategy: PsiStrategy,
    patch: Partial<StrategyState>,
  ) {
    setCards((prev) =>
      prev.map((c) =>
        c.page.url === url
          ? { ...c, [strategy]: { ...c[strategy], ...patch } }
          : c,
      ),
    )
  }

  async function runOne(url: string, strategy: PsiStrategy) {
    patchStrategy(url, strategy, { running: true, error: null })
    try {
      const res = await fetch("/api/dev/seo/pagespeed/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, strategy }),
      })
      const data = await res.json()
      // Quota errors are batch-fatal — stop the runner and surface a banner.
      if (res.status === 429 || data?.error === "psi_quota") {
        quotaHitRef.current = true
        setQuotaError(
          data?.message ||
            "Google PageSpeed Insights daily quota exceeded. Wait for the daily reset (midnight Pacific) or raise the project's quota in Cloud Console.",
        )
        patchStrategy(url, strategy, { running: false, error: "Quota exceeded" })
        return
      }
      if (data.ok) {
        patchStrategy(url, strategy, { running: false, result: data.result })
      } else {
        patchStrategy(url, strategy, {
          running: false,
          error: data.message || data.error || "Audit failed",
        })
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Network error"
      patchStrategy(url, strategy, { running: false, error: msg })
    }
  }

  // Audit every (page, strategy) pair whose result is missing or stale.
  // Caps in-flight requests to MAX_CONCURRENT and bails the moment PSI
  // returns a quota error.
  async function runStale() {
    cancelBatchRef.current = false
    quotaHitRef.current = false
    setQuotaError(null)
    const now = Date.now()
    const queue: Array<{ url: string; strategy: PsiStrategy }> = []
    for (const c of cards) {
      for (const strategy of STRATEGIES) {
        const s = c[strategy]
        if (!s.result) {
          queue.push({ url: c.page.url, strategy })
          continue
        }
        const age = now - new Date(s.result.fetchedAt).getTime()
        if (age > STALE_MS) queue.push({ url: c.page.url, strategy })
      }
    }
    if (queue.length === 0) return
    const total = queue.length
    setBatchProgress({ done: 0, total })
    let done = 0
    let inFlight = 0
    await new Promise<void>((resolve) => {
      const tick = () => {
        if (cancelBatchRef.current || quotaHitRef.current) {
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
          runOne(next.url, next.strategy).finally(() => {
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
    cancelBatchRef.current = true
  }

  const stats = useMemo(() => {
    let audited = 0
    let stale = 0
    const now = Date.now()
    const totalSlots = cards.length * STRATEGIES.length
    for (const c of cards) {
      for (const strategy of STRATEGIES) {
        const s = c[strategy]
        if (s.result) {
          audited++
          if (now - new Date(s.result.fetchedAt).getTime() > STALE_MS) stale++
        }
      }
    }
    return { audited, stale, total: totalSlots, missing: totalSlots - audited }
  }, [cards])

  const batchActive = batchProgress !== null
  const nothingToRun = stats.missing === 0 && stats.stale === 0

  return (
    <div className="space-y-5">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
          Page speed
        </p>
        <h2 className="mt-1 text-2xl font-bold tracking-tight text-foreground">
          Core Web Vitals
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Lighthouse scores and Web Vitals for {pages.length} representative
          pages — one from each major template. Mobile and desktop strategies
          side by side. Results cache for 24 hours.
        </p>
      </div>

      {quotaError ? (
        <div className="flex items-start gap-3 rounded-xl border border-amber-500/40 bg-amber-500/5 p-4 text-sm text-amber-900 dark:text-amber-200">
          <AlertTriangle
            className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400"
            aria-hidden="true"
          />
          <div className="min-w-0 flex-1">
            <div className="font-semibold">PageSpeed quota exceeded</div>
            <p className="mt-1 text-xs leading-relaxed">{quotaError}</p>
            <p className="mt-1 text-xs">
              Already-cached panels keep showing.{" "}
              <a
                href="https://console.cloud.google.com/iam-admin/quotas?service=pagespeedonline.googleapis.com"
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                Check Cloud Console quotas
              </a>{" "}
              to see your current limit and request an increase.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setQuotaError(null)}
            className="text-xs text-amber-700 hover:text-amber-900 dark:text-amber-300"
          >
            Dismiss
          </button>
        </div>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card p-4">
        <div className="flex items-center gap-2">
          <Gauge className="h-4 w-4 text-primary" aria-hidden="true" />
          <span className="text-sm font-medium text-foreground">
            {stats.audited}/{stats.total} audited
          </span>
          {stats.stale > 0 ? (
            <span className="text-xs text-amber-600 dark:text-amber-400">
              · {stats.stale} stale
            </span>
          ) : null}
        </div>
        <div className="flex items-center gap-2">
          {batchActive ? (
            <Button onClick={cancelBatch} variant="outline" size="sm">
              <Square className="h-3.5 w-3.5" aria-hidden="true" />
              Cancel ({batchProgress!.done}/{batchProgress!.total})
            </Button>
          ) : (
            <Button onClick={runStale} disabled={nothingToRun} size="sm">
              <RefreshCcw className="h-3.5 w-3.5" aria-hidden="true" />
              {stats.audited === 0
                ? `Run all (${stats.total})`
                : `Refresh ${stats.missing + stats.stale} stale`}
            </Button>
          )}
        </div>
      </div>

      <div className="space-y-3">
        {cards.map((c) => (
          <PageCard key={c.page.url} state={c} onRun={(s) => runOne(c.page.url, s)} />
        ))}
      </div>
    </div>
  )
}
