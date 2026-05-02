/**
 * lib/seo/site-audit.ts
 *
 * Per-page live HTTP audit — analogous to a single Semrush "Site Audit"
 * row. Fetches the URL, parses the HTML with the same regex approach used
 * by lib/seo/technical-audit.ts (consistency, no extra deps), and records
 * every issue Lighthouse / Search Console-style audits typically flag.
 *
 * Cross-page rollups (duplicate titles, orphan detection) are computed
 * client-side from the cached results — that way each page audit stays
 * stateless and a single re-crawl doesn't have to pay for the whole site.
 *
 * Cache: results land in Upstash under `seo:audit:{url}` with a 24 h TTL,
 * matching the PageSpeed cache. The dashboard reads them in bulk through
 * /api/dev/seo/audit/list.
 */

import { Redis } from "@upstash/redis"

export type AuditLevel = "error" | "warning" | "info"

export type AuditIssueType =
  | "fetch-failed"
  | "http-error"
  | "redirect-chain"
  | "missing-title"
  | "title-too-short"
  | "title-too-long"
  | "missing-description"
  | "description-too-short"
  | "description-too-long"
  | "missing-canonical"
  | "missing-h1"
  | "multiple-h1"
  | "noindex"
  | "missing-og-title"
  | "missing-og-description"
  | "missing-og-image"
  | "missing-twitter-card"
  | "missing-schema"
  | "missing-viewport"
  | "thin-content"
  | "missing-image-alt"
  | "slow-response"
  | "large-page"
  | "mixed-content"

export type AuditIssue = {
  type: AuditIssueType
  level: AuditLevel
  message: string
  detail?: string
}

export type SiteAuditResult = {
  url: string
  finalUrl: string
  status: number
  fetchedAt: string
  responseMs: number
  bytes: number
  contentType: string
  redirectCount: number
  redirectChain: string[]
  /** SEO fields lifted out of the served HTML. */
  title: string | null
  description: string | null
  canonical: string | null
  robots: string | null
  viewport: string | null
  h1: string[]
  hCounts: { h1: number; h2: number; h3: number }
  ogTitle: string | null
  ogDescription: string | null
  ogImage: string | null
  twitterCard: string | null
  schemaTypes: string[]
  /** Lightweight visible-text word count — not exact, regex-based. */
  wordCount: number
  internalLinks: number
  externalLinks: number
  images: number
  imagesWithoutAlt: number
  /** Any HTTP resource referenced from an HTTPS page (mixed content). */
  mixedContentUrls: string[]
  issues: AuditIssue[]
  cached?: boolean
  cachedAt?: string
}

const CACHE_TTL_SECONDS = 24 * 60 * 60
const CACHE_KEY = (url: string) => `seo:audit:${url}`
const FETCH_TIMEOUT_MS = 20_000
/** Slow-page threshold — anything over this raises a warning. */
const SLOW_RESPONSE_MS = 1500
/** Page weight threshold (HTML only) before we flag "large-page". */
const LARGE_PAGE_BYTES = 500_000
/** Title and meta-description length sweet spots. */
const TITLE_MIN = 30
const TITLE_MAX = 60
const DESC_MIN = 70
const DESC_MAX = 160
const THIN_CONTENT_WORDS = 250

let _redis: Redis | null = null
function redis(): Redis | null {
  if (_redis) return _redis
  const url = process.env.KV_REST_API_URL
  const token = process.env.KV_REST_API_TOKEN
  if (!url || !token) return null
  _redis = new Redis({ url, token })
  return _redis
}

function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
}

function attr(html: string, name: string): string | null {
  const re = new RegExp(`${name}\\s*=\\s*("([^"]*)"|'([^']*)'|([^\\s>]+))`, "i")
  const m = html.match(re)
  if (!m) return null
  return decodeEntities(m[2] ?? m[3] ?? m[4] ?? "").trim()
}

function metaContent(html: string, key: "name" | "property", value: string): string | null {
  const re = new RegExp(
    `<meta[^>]*\\b${key}\\s*=\\s*["']${value}["'][^>]*>`,
    "i",
  )
  const m = html.match(re)
  if (!m) return null
  return attr(m[0], "content")
}

function pickTitle(html: string): string | null {
  const m = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)
  if (!m) return null
  return decodeEntities(m[1].trim()).replace(/\s+/g, " ")
}

function pickCanonical(html: string): string | null {
  const m = html.match(/<link[^>]*\brel\s*=\s*["']canonical["'][^>]*>/i)
  if (!m) return null
  return attr(m[0], "href")
}

function pickH1s(html: string): string[] {
  const out: string[] = []
  const re = /<h1\b[^>]*>([\s\S]*?)<\/h1>/gi
  let m: RegExpExecArray | null
  while ((m = re.exec(html))) {
    const text = m[1]
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
    if (text) out.push(decodeEntities(text))
  }
  return out
}

function countTag(html: string, tag: string): number {
  const re = new RegExp(`<${tag}\\b[^>]*>`, "gi")
  return html.match(re)?.length ?? 0
}

function pickSchemaTypes(html: string): string[] {
  const types = new Set<string>()
  const re = /<script[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
  let m: RegExpExecArray | null
  while ((m = re.exec(html))) {
    try {
      const json = JSON.parse(m[1].trim())
      const collect = (node: unknown) => {
        if (!node) return
        if (Array.isArray(node)) {
          for (const v of node) collect(v)
          return
        }
        if (typeof node === "object") {
          const obj = node as Record<string, unknown>
          const t = obj["@type"]
          if (typeof t === "string") types.add(t)
          else if (Array.isArray(t)) for (const v of t) if (typeof v === "string") types.add(v)
          if (Array.isArray(obj["@graph"])) collect(obj["@graph"])
        }
      }
      collect(json)
    } catch {
      // ignore unparseable JSON-LD
    }
  }
  return Array.from(types)
}

function visibleText(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

function classifyLinks(
  html: string,
  pageOrigin: string,
): { internal: number; external: number; mixed: string[] } {
  let internal = 0
  let external = 0
  const mixed: string[] = []
  const re = /<a\b[^>]*\bhref\s*=\s*("([^"]*)"|'([^']*)')[^>]*>/gi
  let m: RegExpExecArray | null
  while ((m = re.exec(html))) {
    const href = (m[2] ?? m[3] ?? "").trim()
    if (!href || href.startsWith("#") || href.startsWith("javascript:") || href.startsWith("mailto:") || href.startsWith("tel:")) continue
    if (href.startsWith("/") && !href.startsWith("//")) {
      internal++
      continue
    }
    try {
      const u = new URL(href, pageOrigin)
      if (u.origin === pageOrigin) internal++
      else external++
    } catch {
      // malformed href — skip
    }
  }
  // Mixed content: HTTP resources on an HTTPS page.
  if (pageOrigin.startsWith("https://")) {
    const resourceRe = /\b(?:src|href)\s*=\s*("([^"]*)"|'([^']*)')/gi
    let r: RegExpExecArray | null
    while ((r = resourceRe.exec(html))) {
      const v = (r[2] ?? r[3] ?? "").trim()
      if (v.startsWith("http://")) mixed.push(v)
    }
  }
  return { internal, external, mixed: mixed.slice(0, 10) }
}

function countImages(html: string): { total: number; missingAlt: number } {
  const re = /<img\b[^>]*>/gi
  let total = 0
  let missingAlt = 0
  let m: RegExpExecArray | null
  while ((m = re.exec(html))) {
    total++
    const altMatch = m[0].match(/\balt\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/i)
    if (!altMatch) missingAlt++
  }
  return { total, missingAlt }
}

function detectIssues(r: SiteAuditResult): AuditIssue[] {
  const issues: AuditIssue[] = []
  if (r.status >= 500) {
    issues.push({
      type: "http-error",
      level: "error",
      message: `Server error (${r.status})`,
    })
  } else if (r.status >= 400) {
    issues.push({
      type: "http-error",
      level: "error",
      message: `Client error (${r.status})`,
    })
  }
  if (r.redirectCount > 0) {
    issues.push({
      type: "redirect-chain",
      level: r.redirectCount > 1 ? "warning" : "info",
      message: `${r.redirectCount} redirect${r.redirectCount > 1 ? "s" : ""} before final URL`,
      detail: r.redirectChain.join(" → "),
    })
  }
  if (!r.title) {
    issues.push({ type: "missing-title", level: "error", message: "<title> is missing" })
  } else {
    if (r.title.length < TITLE_MIN) {
      issues.push({
        type: "title-too-short",
        level: "warning",
        message: `Title is ${r.title.length} chars (recommended ≥ ${TITLE_MIN})`,
      })
    } else if (r.title.length > TITLE_MAX) {
      issues.push({
        type: "title-too-long",
        level: "warning",
        message: `Title is ${r.title.length} chars (recommended ≤ ${TITLE_MAX})`,
      })
    }
  }
  if (!r.description) {
    issues.push({
      type: "missing-description",
      level: "warning",
      message: "Meta description is missing",
    })
  } else {
    if (r.description.length < DESC_MIN) {
      issues.push({
        type: "description-too-short",
        level: "info",
        message: `Description is ${r.description.length} chars (recommended ≥ ${DESC_MIN})`,
      })
    } else if (r.description.length > DESC_MAX) {
      issues.push({
        type: "description-too-long",
        level: "info",
        message: `Description is ${r.description.length} chars (recommended ≤ ${DESC_MAX})`,
      })
    }
  }
  if (!r.canonical) {
    issues.push({
      type: "missing-canonical",
      level: "warning",
      message: "No <link rel=\"canonical\"> tag",
    })
  }
  if (r.hCounts.h1 === 0) {
    issues.push({ type: "missing-h1", level: "error", message: "No <h1> on the page" })
  } else if (r.hCounts.h1 > 1) {
    issues.push({
      type: "multiple-h1",
      level: "warning",
      message: `${r.hCounts.h1} <h1> tags — should be exactly one`,
    })
  }
  if (r.robots && /noindex/i.test(r.robots)) {
    issues.push({
      type: "noindex",
      level: "warning",
      message: "Page is set to noindex",
      detail: r.robots,
    })
  }
  if (!r.ogTitle) issues.push({ type: "missing-og-title", level: "info", message: "Missing og:title" })
  if (!r.ogDescription) issues.push({ type: "missing-og-description", level: "info", message: "Missing og:description" })
  if (!r.ogImage) issues.push({ type: "missing-og-image", level: "warning", message: "Missing og:image" })
  if (!r.twitterCard) issues.push({ type: "missing-twitter-card", level: "info", message: "Missing twitter:card" })
  if (r.schemaTypes.length === 0) {
    issues.push({ type: "missing-schema", level: "warning", message: "No JSON-LD schema markup" })
  }
  if (!r.viewport) {
    issues.push({ type: "missing-viewport", level: "warning", message: "Missing <meta name=\"viewport\">" })
  }
  if (r.wordCount < THIN_CONTENT_WORDS && r.status === 200) {
    issues.push({
      type: "thin-content",
      level: "info",
      message: `Only ${r.wordCount} words of visible text (thin content)`,
    })
  }
  if (r.imagesWithoutAlt > 0) {
    issues.push({
      type: "missing-image-alt",
      level: "warning",
      message: `${r.imagesWithoutAlt} of ${r.images} images missing alt`,
    })
  }
  if (r.responseMs > SLOW_RESPONSE_MS) {
    issues.push({
      type: "slow-response",
      level: "warning",
      message: `Response took ${r.responseMs} ms (> ${SLOW_RESPONSE_MS} ms)`,
    })
  }
  if (r.bytes > LARGE_PAGE_BYTES) {
    issues.push({
      type: "large-page",
      level: "info",
      message: `HTML is ${(r.bytes / 1024).toFixed(0)} KB (> ${LARGE_PAGE_BYTES / 1024} KB)`,
    })
  }
  if (r.mixedContentUrls.length > 0) {
    issues.push({
      type: "mixed-content",
      level: "warning",
      message: `${r.mixedContentUrls.length} HTTP resource${r.mixedContentUrls.length > 1 ? "s" : ""} loaded on an HTTPS page`,
      detail: r.mixedContentUrls.slice(0, 3).join(", "),
    })
  }
  return issues
}

export async function getCachedAudit(url: string): Promise<SiteAuditResult | null> {
  const r = redis()
  if (!r) return null
  const hit = await r.get<SiteAuditResult>(CACHE_KEY(url))
  if (!hit) return null
  return { ...hit, cached: true, cachedAt: hit.fetchedAt }
}

export async function getCachedManyAudits(
  urls: string[],
): Promise<Map<string, SiteAuditResult>> {
  const out = new Map<string, SiteAuditResult>()
  const r = redis()
  if (!r || urls.length === 0) return out
  const pipe = r.pipeline()
  for (const u of urls) pipe.get<SiteAuditResult>(CACHE_KEY(u))
  const values = await pipe.exec<Array<SiteAuditResult | null>>()
  urls.forEach((u, i) => {
    const v = values[i]
    if (v) out.set(u, { ...v, cached: true, cachedAt: v.fetchedAt })
  })
  return out
}

async function setCachedAudit(result: SiteAuditResult): Promise<void> {
  const r = redis()
  if (!r) return
  await r.set(CACHE_KEY(result.url), result, { ex: CACHE_TTL_SECONDS })
}

/**
 * Fetch one URL, follow redirects manually so we can record the chain,
 * then parse the served HTML and detect issues.
 */
export async function auditPage(url: string): Promise<SiteAuditResult> {
  const start = Date.now()
  const redirectChain: string[] = []
  let current = url
  let finalUrl = url
  let status = 0
  let bytes = 0
  let contentType = ""
  let html = ""
  const ac = new AbortController()
  const timer = setTimeout(() => ac.abort(), FETCH_TIMEOUT_MS)
  try {
    for (let hop = 0; hop < 5; hop++) {
      const res = await fetch(current, {
        redirect: "manual",
        signal: ac.signal,
        headers: { "User-Agent": "SMSLocalSeoAudit/1.0 (+https://www.smslocal.in)" },
      })
      status = res.status
      contentType = res.headers.get("content-type") ?? ""
      // Manual redirect handling for 3xx — track every hop.
      if (res.status >= 300 && res.status < 400) {
        const loc = res.headers.get("location")
        if (!loc) break
        redirectChain.push(current)
        current = new URL(loc, current).toString()
        finalUrl = current
        continue
      }
      finalUrl = current
      const buf = await res.arrayBuffer()
      bytes = buf.byteLength
      html = new TextDecoder("utf-8", { fatal: false }).decode(buf)
      break
    }
  } catch (err) {
    clearTimeout(timer)
    const msg = err instanceof Error ? err.message : "fetch failed"
    const result: SiteAuditResult = emptyResult(url)
    result.finalUrl = finalUrl
    result.responseMs = Date.now() - start
    result.issues = [
      { type: "fetch-failed", level: "error", message: `Could not fetch: ${msg}` },
    ]
    await setCachedAudit(result).catch(() => {})
    return result
  }
  clearTimeout(timer)

  const result: SiteAuditResult = emptyResult(url)
  result.finalUrl = finalUrl
  result.status = status
  result.responseMs = Date.now() - start
  result.bytes = bytes
  result.contentType = contentType
  result.redirectCount = redirectChain.length
  result.redirectChain = redirectChain
  result.fetchedAt = new Date().toISOString()

  // Only parse HTML responses — skip images, JSON, etc.
  if (status >= 200 && status < 300 && contentType.includes("text/html")) {
    const head = html.match(/<head[\s\S]*?<\/head>/i)?.[0] ?? html.slice(0, 50_000)
    result.title = pickTitle(head)
    result.description = metaContent(head, "name", "description")
    result.canonical = pickCanonical(head)
    result.robots = metaContent(head, "name", "robots")
    result.viewport = metaContent(head, "name", "viewport")
    result.ogTitle = metaContent(head, "property", "og:title")
    result.ogDescription = metaContent(head, "property", "og:description")
    result.ogImage = metaContent(head, "property", "og:image")
    result.twitterCard = metaContent(head, "name", "twitter:card")
    result.schemaTypes = pickSchemaTypes(html)
    const h1s = pickH1s(html)
    result.h1 = h1s
    result.hCounts = {
      h1: h1s.length,
      h2: countTag(html, "h2"),
      h3: countTag(html, "h3"),
    }
    result.wordCount = visibleText(html).split(/\s+/).filter(Boolean).length
    const origin = new URL(finalUrl).origin
    const links = classifyLinks(html, origin)
    result.internalLinks = links.internal
    result.externalLinks = links.external
    result.mixedContentUrls = links.mixed
    const images = countImages(html)
    result.images = images.total
    result.imagesWithoutAlt = images.missingAlt
  }

  result.issues = detectIssues(result)
  await setCachedAudit(result).catch(() => {})
  return result
}

function emptyResult(url: string): SiteAuditResult {
  return {
    url,
    finalUrl: url,
    status: 0,
    fetchedAt: new Date().toISOString(),
    responseMs: 0,
    bytes: 0,
    contentType: "",
    redirectCount: 0,
    redirectChain: [],
    title: null,
    description: null,
    canonical: null,
    robots: null,
    viewport: null,
    h1: [],
    hCounts: { h1: 0, h2: 0, h3: 0 },
    ogTitle: null,
    ogDescription: null,
    ogImage: null,
    twitterCard: null,
    schemaTypes: [],
    wordCount: 0,
    internalLinks: 0,
    externalLinks: 0,
    images: 0,
    imagesWithoutAlt: 0,
    mixedContentUrls: [],
    issues: [],
  }
}
