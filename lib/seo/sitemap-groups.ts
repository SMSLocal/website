import type { MetadataRoute } from "next"
import { SITE } from "@/lib/seo/config"

/**
 * Sitemap index groups.
 *
 * `/sitemap.xml` is a sitemap *index* that points at one child sitemap per
 * group below, e.g. `/post-sitemap.xml`. Splitting by content type keeps each
 * file small and lets Search Console report indexing per section, so a drop in
 * blog coverage is visible without being averaged away by 70+ static pages.
 *
 * Adding a group means adding it here and to the `:group` regex in the
 * `/:group-sitemap.xml` rewrite in `next.config.mjs` — the rewrite cannot read
 * this array, so the two must be kept in step.
 */
export const SITEMAP_GROUPS = [
  "page",
  "post",
  "compare",
  "help",
  "customer-story",
] as const

export type SitemapGroup = (typeof SITEMAP_GROUPS)[number]

export function isSitemapGroup(value: string): value is SitemapGroup {
  return (SITEMAP_GROUPS as readonly string[]).includes(value)
}

/**
 * Which child sitemap a path belongs to.
 *
 * Only leaf content is split out. Hub pages (`/blog`, `/compare`,
 * `/resources/help`) stay in `page` — they are navigation, not content, and
 * grouping them with their children would misreport section coverage.
 */
export function groupForPath(path: string): SitemapGroup {
  // URLs are canonically trailing-slashed, so "/blog/" is the hub and
  // "/blog/<slug>/" is a post. Trim the trailing slash before matching or the
  // hub matches its own children prefix and lands in the wrong sitemap.
  const p = path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path
  if (p.startsWith("/blog/")) return "post"
  if (p.startsWith("/compare/")) return "compare"
  if (p.startsWith("/resources/help/")) return "help"
  if (p.startsWith("/resources/customer-stories/")) return "customer-story"
  return "page"
}

/** Strip the origin off a sitemap entry so it can be classified by path. */
export function pathOf(url: string): string {
  return url.startsWith(SITE.url) ? url.slice(SITE.url.length) || "/" : url
}

export function groupEntries(
  entries: MetadataRoute.Sitemap,
): Map<SitemapGroup, MetadataRoute.Sitemap> {
  const byGroup = new Map<SitemapGroup, MetadataRoute.Sitemap>()
  for (const group of SITEMAP_GROUPS) byGroup.set(group, [])
  for (const entry of entries) {
    byGroup.get(groupForPath(pathOf(entry.url)))!.push(entry)
  }
  return byGroup
}

/** Most recent `lastModified` in a group — the index's `<lastmod>`. */
export function latestLastModified(
  entries: MetadataRoute.Sitemap,
): Date | undefined {
  let latest: number | undefined
  for (const entry of entries) {
    if (!entry.lastModified) continue
    const time = new Date(entry.lastModified).getTime()
    if (Number.isNaN(time)) continue
    if (latest === undefined || time > latest) latest = time
  }
  return latest === undefined ? undefined : new Date(latest)
}
