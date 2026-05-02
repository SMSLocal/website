/**
 * lib/seo/pagespeed.ts
 *
 * Thin client around Google's PageSpeed Insights API v5 plus a Redis-backed
 * cache (1 h TTL) so re-opening the dashboard doesn't burn quota.
 *
 * The PSI endpoint is free without an API key but the per-IP daily quota is
 * shared and small. Set PAGESPEED_API_KEY in production for project-scoped
 * quotas. The module degrades gracefully when no key is present.
 *
 * What we extract from the raw PSI response:
 *   - Lighthouse category scores (performance, accessibility, seo, best-practices)
 *   - Core Web Vitals — both lab metrics and CrUX field data when available
 *   - Top opportunities (sorted by estimated savings)
 */

import { Redis } from "@upstash/redis"

export type PsiStrategy = "mobile" | "desktop"

export type LighthouseCategory =
  | "performance"
  | "accessibility"
  | "seo"
  | "best-practices"

export type PageSpeedScore = {
  /** 0–100 (Lighthouse rounds these). null if PSI couldn't compute. */
  performance: number | null
  accessibility: number | null
  seo: number | null
  bestPractices: number | null
}

export type WebVital = {
  /** Numeric value in the metric's native unit (ms / unitless for CLS). */
  value: number
  /** Display string PSI returns ("2.4 s", "0.05"). */
  display: string
  /** Lighthouse rating bucket. */
  rating: "good" | "needs-improvement" | "poor" | null
}

export type CoreWebVitals = {
  lcp: WebVital | null
  cls: WebVital | null
  inp: WebVital | null
  tbt: WebVital | null
  fcp: WebVital | null
  ttfb: WebVital | null
  /** True when the metrics came from CrUX field data, not lab Lighthouse. */
  source: "lab" | "field" | "mixed"
}

export type Opportunity = {
  id: string
  title: string
  description: string
  /** Estimated milliseconds saved (PSI reports this for most opportunities). */
  savingsMs: number | null
  /** Display string PSI provides ("Potential savings of 1.2 s"). */
  displayValue: string | null
}

export type PageSpeedResult = {
  url: string
  finalUrl: string
  strategy: PsiStrategy
  fetchedAt: string
  /** Lighthouse version reported by PSI — handy for debugging score drift. */
  lighthouseVersion: string | null
  scores: PageSpeedScore
  webVitals: CoreWebVitals
  opportunities: Opportunity[]
  /** When true the response came from cache, not a fresh PSI run. */
  cached?: boolean
  /** ISO timestamp of when this result was originally fetched, if cached. */
  cachedAt?: string
}

const PSI_ENDPOINT = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed"
const CACHE_TTL_SECONDS = 60 * 60 // 1 h
const CACHE_KEY = (strategy: PsiStrategy, url: string) =>
  `seo:pagespeed:${strategy}:${url}`

let _redis: Redis | null = null
function redis(): Redis | null {
  if (_redis) return _redis
  const url = process.env.KV_REST_API_URL
  const token = process.env.KV_REST_API_TOKEN
  if (!url || !token) return null
  _redis = new Redis({ url, token })
  return _redis
}

function bucketFromScore(score: number | null): WebVital["rating"] {
  if (score === null) return null
  if (score >= 0.9) return "good"
  if (score >= 0.5) return "needs-improvement"
  return "poor"
}

function audit(audits: Record<string, any>, id: string): WebVital | null {
  const a = audits?.[id]
  if (!a || typeof a.numericValue !== "number") return null
  return {
    value: a.numericValue,
    display: typeof a.displayValue === "string" ? a.displayValue : "",
    rating: bucketFromScore(typeof a.score === "number" ? a.score : null),
  }
}

function pickOpportunities(audits: Record<string, any>): Opportunity[] {
  const out: Opportunity[] = []
  for (const [id, raw] of Object.entries(audits ?? {})) {
    const a = raw as any
    if (a?.details?.type !== "opportunity") continue
    if (typeof a.score === "number" && a.score >= 0.9) continue
    const savings =
      typeof a.details?.overallSavingsMs === "number"
        ? a.details.overallSavingsMs
        : typeof a.numericValue === "number"
          ? a.numericValue
          : null
    out.push({
      id,
      title: typeof a.title === "string" ? a.title : id,
      description: typeof a.description === "string" ? a.description : "",
      savingsMs: savings,
      displayValue: typeof a.displayValue === "string" ? a.displayValue : null,
    })
  }
  out.sort((a, b) => (b.savingsMs ?? 0) - (a.savingsMs ?? 0))
  return out.slice(0, 12)
}

function parsePsi(
  raw: any,
  url: string,
  strategy: PsiStrategy,
): PageSpeedResult {
  const lhr = raw?.lighthouseResult ?? {}
  const categories = lhr?.categories ?? {}
  const audits = lhr?.audits ?? {}

  const score = (k: string): number | null => {
    const c = categories?.[k]
    if (!c || typeof c.score !== "number") return null
    return Math.round(c.score * 100)
  }

  // Prefer field data (CrUX) when present — that's what users actually
  // experience. Fall back to lab Lighthouse audits otherwise.
  const loadingMetrics = raw?.loadingExperience?.metrics
  const hasField = loadingMetrics && Object.keys(loadingMetrics).length > 0

  const fieldVital = (
    metricKey: string,
    unit: "ms" | "score",
  ): WebVital | null => {
    const m = loadingMetrics?.[metricKey]
    if (!m || typeof m.percentile !== "number") return null
    const value = unit === "score" ? m.percentile / 100 : m.percentile
    const display =
      unit === "score" ? value.toFixed(2) : `${(value / 1000).toFixed(2)} s`
    const cat = m.category as string | undefined
    const rating: WebVital["rating"] =
      cat === "FAST"
        ? "good"
        : cat === "AVERAGE"
          ? "needs-improvement"
          : cat === "SLOW"
            ? "poor"
            : null
    return { value, display, rating }
  }

  const webVitals: CoreWebVitals = {
    lcp:
      fieldVital("LARGEST_CONTENTFUL_PAINT_MS", "ms") ??
      audit(audits, "largest-contentful-paint"),
    cls:
      fieldVital("CUMULATIVE_LAYOUT_SHIFT_SCORE", "score") ??
      audit(audits, "cumulative-layout-shift"),
    inp:
      fieldVital("INTERACTION_TO_NEXT_PAINT", "ms") ??
      audit(audits, "interactive"),
    tbt: audit(audits, "total-blocking-time"),
    fcp:
      fieldVital("FIRST_CONTENTFUL_PAINT_MS", "ms") ??
      audit(audits, "first-contentful-paint"),
    ttfb:
      fieldVital("EXPERIMENTAL_TIME_TO_FIRST_BYTE", "ms") ??
      audit(audits, "server-response-time"),
    source: hasField ? "mixed" : "lab",
  }

  return {
    url,
    finalUrl: typeof lhr?.finalUrl === "string" ? lhr.finalUrl : url,
    strategy,
    fetchedAt: new Date().toISOString(),
    lighthouseVersion:
      typeof lhr?.lighthouseVersion === "string" ? lhr.lighthouseVersion : null,
    scores: {
      performance: score("performance"),
      accessibility: score("accessibility"),
      seo: score("seo"),
      bestPractices: score("best-practices"),
    },
    webVitals,
    opportunities: pickOpportunities(audits),
  }
}

/**
 * Validate a URL string. PSI only accepts public HTTP/HTTPS URLs — block
 * anything else early so the caller gets a useful error instead of an
 * opaque 400 from Google.
 */
export function isAuditableUrl(input: string): boolean {
  try {
    const u = new URL(input)
    if (u.protocol !== "http:" && u.protocol !== "https:") return false
    // Localhost and private ranges aren't reachable from PSI's crawler.
    const host = u.hostname.toLowerCase()
    if (host === "localhost" || host === "127.0.0.1" || host === "0.0.0.0") {
      return false
    }
    return true
  } catch {
    return false
  }
}

export async function getCachedPageSpeed(
  url: string,
  strategy: PsiStrategy,
): Promise<PageSpeedResult | null> {
  const r = redis()
  if (!r) return null
  const key = CACHE_KEY(strategy, url)
  const hit = await r.get<PageSpeedResult>(key)
  if (!hit) return null
  return { ...hit, cached: true, cachedAt: hit.fetchedAt }
}

async function setCachedPageSpeed(result: PageSpeedResult): Promise<void> {
  const r = redis()
  if (!r) return
  const key = CACHE_KEY(result.strategy, result.url)
  await r.set(key, result, { ex: CACHE_TTL_SECONDS })
}

/**
 * Run a fresh PSI audit. Throws on network/HTTP errors with a useful message.
 * Pass `force: true` from the caller to bypass the cache lookup; otherwise
 * the API route will check the cache first.
 */
export async function runPageSpeed(
  url: string,
  strategy: PsiStrategy = "mobile",
): Promise<PageSpeedResult> {
  if (!isAuditableUrl(url)) {
    throw new Error(`URL is not publicly auditable: ${url}`)
  }

  const params = new URLSearchParams({
    url,
    strategy,
  })
  for (const cat of ["performance", "accessibility", "seo", "best-practices"]) {
    params.append("category", cat)
  }
  const key = process.env.PAGESPEED_API_KEY
  if (key) params.set("key", key)

  // PSI runs a real Lighthouse audit on Google's hardware — typical wall
  // time is 15–35 s. Set a generous timeout and let the route handler
  // surface "still running" to the client.
  const ac = new AbortController()
  const timer = setTimeout(() => ac.abort(), 60_000)
  let res: Response
  try {
    res = await fetch(`${PSI_ENDPOINT}?${params.toString()}`, {
      signal: ac.signal,
      cache: "no-store",
    })
  } catch (err) {
    clearTimeout(timer)
    const msg = err instanceof Error ? err.message : String(err)
    throw new Error(`PageSpeed Insights request failed: ${msg}`)
  }
  clearTimeout(timer)

  if (!res.ok) {
    const text = await res.text().catch(() => "")
    throw new Error(
      `PageSpeed Insights returned ${res.status}: ${text.slice(0, 200)}`,
    )
  }

  const raw = await res.json()
  const parsed = parsePsi(raw, url, strategy)
  await setCachedPageSpeed(parsed).catch(() => {
    /* cache failures shouldn't break the response */
  })
  return parsed
}

export function isPageSpeedConfigured(): {
  cacheReady: boolean
  apiKeyPresent: boolean
} {
  return {
    cacheReady: Boolean(
      process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN,
    ),
    apiKeyPresent: Boolean(process.env.PAGESPEED_API_KEY),
  }
}
