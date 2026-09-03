import type { MetadataRoute } from "next"
import { ALL_POSTS } from "@/lib/blog"
import { ALL_STORIES } from "@/lib/customer-stories"
import { HELP_CATEGORIES, getAllArticlePaths, getArticle } from "@/lib/help-center"
import { SITE } from "@/lib/seo/config"
import { SEO_REGISTRY } from "@/lib/seo/registry"
import { getAllOverrides } from "@/lib/seo/store"
import pageModified from "@/lib/seo/page-modified.generated.json"

const SITE_URL = SITE.url

/**
 * Per-page last-modified dates taken from git by `pnpm sitemap:dates`.
 * See scripts/generate-page-dates.mjs for why the file is committed.
 */
const GENERATED_PAGE_DATES: Record<string, string | undefined> = pageModified.pages

type ChangeFreq = MetadataRoute.Sitemap[number]["changeFrequency"]

/**
 * Path-based heuristic for priority + change frequency.
 *
 * The sitemap itself is derived from `lib/seo/registry.ts` — add a page there
 * and it appears here automatically (unless it's flagged `noindex: true`).
 * To customise priority for a specific path, add it to STATIC_OVERRIDES below.
 *
 * Runtime per-URL overrides (from the /dev/seo dashboard) take precedence
 * over everything below via `getAllOverrides()`.
 */
const STATIC_OVERRIDES: Record<string, { priority: number; changeFrequency: ChangeFreq }> = {
  "/": { priority: 1.0, changeFrequency: "weekly" },
  "/pricing": { priority: 0.9, changeFrequency: "weekly" },
  "/blog": { priority: 0.8, changeFrequency: "weekly" },
  "/resources/help": { priority: 0.7, changeFrequency: "weekly" },
  "/developers/api-docs": { priority: 0.8, changeFrequency: "monthly" },
  "/developers/quickstart": { priority: 0.8, changeFrequency: "monthly" },
  "/company/contact": { priority: 0.7, changeFrequency: "yearly" },
  "/signup": { priority: 0.6, changeFrequency: "yearly" },
}

// Routes that should never appear in the sitemap regardless of registry state.
const SITEMAP_SKIP = new Set<string>([
  "/404",
  "/signin",
  "/forgot-password",
  "/test-home",
  "/dev",
])

function shouldSkip(path: string): boolean {
  if (SITEMAP_SKIP.has(path)) return true
  if (path.startsWith("/dev/")) return true
  if (path.startsWith("/api/")) return true
  return false
}

function defaultFor(path: string): { priority: number; changeFrequency: ChangeFreq } {
  if (STATIC_OVERRIDES[path]) return STATIC_OVERRIDES[path]
  if (path.startsWith("/legal/")) {
    const low = path === "/legal/dpa" || path === "/legal/cookie-policy"
    return { priority: low ? 0.4 : 0.5, changeFrequency: "yearly" }
  }
  if (path === "/products" || path.startsWith("/products/")) {
    return { priority: 0.9, changeFrequency: "monthly" }
  }
  if (path === "/solutions" || path.startsWith("/solutions/")) {
    return { priority: 0.8, changeFrequency: "monthly" }
  }
  if (path === "/compare" || path.startsWith("/compare/")) {
    return { priority: 0.7, changeFrequency: "monthly" }
  }
  if (path === "/developers" || path.startsWith("/developers/")) {
    const lowValue = path === "/developers/xml-api"
    return { priority: lowValue ? 0.6 : 0.7, changeFrequency: "monthly" }
  }
  if (path.startsWith("/resources/")) {
    const lowValue = path === "/resources/tools/sms-bomber"
    return { priority: lowValue ? 0.6 : 0.7, changeFrequency: "monthly" }
  }
  if (path === "/company/careers") return { priority: 0.6, changeFrequency: "monthly" }
  if (path.startsWith("/company/")) return { priority: 0.7, changeFrequency: "monthly" }
  return { priority: 0.7, changeFrequency: "monthly" }
}

/** Ensure every path ends with `/` to match trailingSlash:true canonical URLs. */
function toUrl(path: string): string {
  const withSlash = path === "/" ? "/" : path.endsWith("/") ? path : `${path}/`
  return `${SITE_URL}${withSlash}`
}

export const revalidate = 60 // Refresh sitemap at most once per minute.

/**
 * Parse a date that came from content. Returns undefined rather than an
 * Invalid Date so a typo in one entry drops that one `<lastmod>` instead of
 * emitting `NaN` into the XML.
 */
function parseDate(value: string | undefined): Date | undefined {
  if (!value) return undefined
  const d = new Date(value)
  return Number.isNaN(d.getTime()) ? undefined : d
}

/**
 * Last-modified date of a static page, most trustworthy source first:
 *   1. `modifiedTime` / `publishedTime` hand-set in the SEO registry.
 *   2. The last git commit that touched the page's own file, captured in
 *      page-modified.generated.json by `pnpm sitemap:dates`.
 *   3. Nothing — the URL ships without a `<lastmod>`.
 *
 * Never `new Date()`. Stamping "now" on every page told search engines all 135
 * static URLs changed on every revalidation, which is both false and a reason
 * for Google to disregard the site's lastmod values altogether. Omitting the
 * element is explicitly allowed and is the honest answer when we don't know.
 */
function staticPageLastModified(
  path: string,
  entry: { modifiedTime?: string; publishedTime?: string },
): Date | undefined {
  return (
    parseDate(entry.modifiedTime) ??
    parseDate(entry.publishedTime) ??
    parseDate(GENERATED_PAGE_DATES[path])
  )
}

export default async function sitemapEntries(): Promise<MetadataRoute.Sitemap> {
  // Load Redis overrides for priority/changeFreq customisation.
  // Never let a Redis failure break the sitemap — gracefully degrade.
  const overrides = await getAllOverrides().catch(() => new Map<string, { noindex?: boolean; includeInSitemap?: boolean; changeFrequency?: ChangeFreq; priority?: number }>())

  type RawEntry = { path: string; lastModified?: Date; defaultPriority: number; defaultFreq: ChangeFreq }
  const raw: RawEntry[] = []

  // ─── Static pages — derived from lib/seo/registry.ts ──────────────────────
  for (const [path, entry] of Object.entries(SEO_REGISTRY)) {
    if (entry.noindex || shouldSkip(path)) continue
    const { priority, changeFrequency } = defaultFor(path)
    raw.push({
      path,
      lastModified: staticPageLastModified(path, entry),
      defaultPriority: priority,
      defaultFreq: changeFrequency,
    })
  }

  // ─── Dynamic: blog posts ──────────────────────────────────────────────────
  for (const post of ALL_POSTS) {
    raw.push({
      path: `/blog/${post.meta.slug}`,
      lastModified: parseDate(post.meta.updatedDate ?? post.meta.date),
      defaultPriority: 0.7,
      defaultFreq: "monthly",
    })
  }

  // ─── Dynamic: customer stories ────────────────────────────────────────────
  for (const story of ALL_STORIES) {
    raw.push({
      path: `/resources/customer-stories/${story.slug}`,
      lastModified: parseDate(story.publishedAt),
      defaultPriority: 0.7,
      defaultFreq: "monthly",
    })
  }

  // ─── Dynamic: help-centre categories ──────────────────────────────────────
  // A category page lists its articles, so it is as fresh as its newest one.
  for (const c of HELP_CATEGORIES) {
    const newest = c.articles
      .map((a) => parseDate(a.updatedOn))
      .filter((d): d is Date => d !== undefined)
      .reduce<Date | undefined>((max, d) => (!max || d > max ? d : max), undefined)
    raw.push({
      path: `/resources/help/${c.slug}`,
      lastModified: newest,
      defaultPriority: 0.6,
      defaultFreq: "weekly",
    })
  }

  // ─── Dynamic: help-centre articles ────────────────────────────────────────
  for (const p of getAllArticlePaths()) {
    raw.push({
      path: `/resources/help/${p.category}/${p.article}`,
      lastModified: parseDate(getArticle(p.category, p.article)?.article.updatedOn),
      defaultPriority: 0.5,
      defaultFreq: "monthly",
    })
  }

  // ─── Apply Redis overrides (include toggle, priority, changeFreq) ─────────
  return raw
    .filter((r) => {
      const ov = overrides.get(r.path)
      if (!ov) return true
      if (ov.noindex) return false
      if (ov.includeInSitemap === false) return false
      return true
    })
    .map((r) => {
      const ov = overrides.get(r.path)
      return {
        url: toUrl(r.path),
        lastModified: r.lastModified,
        changeFrequency: (ov?.changeFrequency ?? r.defaultFreq) as ChangeFreq,
        priority: ov?.priority ?? r.defaultPriority,
      }
    })
}
