import type { MetadataRoute } from "next"
import { ALL_POSTS } from "@/lib/blog"
import { ALL_STORIES } from "@/lib/customer-stories"
import { HELP_CATEGORIES, getAllArticlePaths } from "@/lib/help-center"
import { SITE } from "@/lib/seo/config"
import { SEO_REGISTRY } from "@/lib/seo/registry"
import { getAllOverrides } from "@/lib/seo/store"

const SITE_URL = SITE.url

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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  // Load Redis overrides for priority/changeFreq customisation.
  // Never let a Redis failure break the sitemap — gracefully degrade.
  const overrides = await getAllOverrides().catch(() => new Map<string, { noindex?: boolean; includeInSitemap?: boolean; changeFrequency?: ChangeFreq; priority?: number }>())

  type RawEntry = { path: string; lastModified: Date; defaultPriority: number; defaultFreq: ChangeFreq }
  const raw: RawEntry[] = []

  // ─── Static pages — derived from lib/seo/registry.ts ──────────────────────
  for (const [path, entry] of Object.entries(SEO_REGISTRY)) {
    if (entry.noindex || shouldSkip(path)) continue
    const { priority, changeFrequency } = defaultFor(path)
    raw.push({ path, lastModified: now, defaultPriority: priority, defaultFreq: changeFrequency })
  }

  // ─── Dynamic: blog posts ──────────────────────────────────────────────────
  for (const post of ALL_POSTS) {
    const updatedAt = post.meta.updatedDate ?? post.meta.date
    raw.push({
      path: `/blog/${post.meta.slug}`,
      lastModified: updatedAt ? new Date(updatedAt) : now,
      defaultPriority: 0.7,
      defaultFreq: "monthly",
    })
  }

  // ─── Dynamic: customer stories ────────────────────────────────────────────
  for (const story of ALL_STORIES) {
    raw.push({
      path: `/resources/customer-stories/${story.slug}`,
      lastModified: story.publishedAt ? new Date(story.publishedAt) : now,
      defaultPriority: 0.7,
      defaultFreq: "monthly",
    })
  }

  // ─── Dynamic: help-centre categories ──────────────────────────────────────
  for (const c of HELP_CATEGORIES) {
    raw.push({
      path: `/resources/help/${c.slug}`,
      lastModified: now,
      defaultPriority: 0.6,
      defaultFreq: "weekly",
    })
  }

  // ─── Dynamic: help-centre articles ────────────────────────────────────────
  for (const p of getAllArticlePaths()) {
    raw.push({
      path: `/resources/help/${p.category}/${p.article}`,
      lastModified: now,
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
