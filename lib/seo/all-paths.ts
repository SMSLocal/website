/**
 * Enumerate every URL on the site that the SEO dashboard should manage.
 *
 * This merges:
 *   1. Every entry in the static `SEO_REGISTRY`.
 *   2. Every dynamic blog post.
 *   3. Every help-centre category index AND article.
 *   4. Every customer story.
 *
 * Each path is returned with a *default* SEO payload — what the page would
 * emit today, before runtime overrides. The dashboard then layers Redis
 * overrides on top via `lib/seo/overrides.ts`.
 */

import { ALL_POSTS } from "@/lib/blog"
import { ALL_STORIES } from "@/lib/customer-stories"
import { HELP_CATEGORIES, getAllArticlePaths } from "@/lib/help-center"
import { SEO_REGISTRY, type SeoEntry } from "./registry"

export type PathKind =
  | "static"
  | "blog"
  | "story"
  | "help-category"
  | "help-article"

export type DashboardEntry = {
  path: string
  kind: PathKind
  title: string
  titleAbsolute?: string
  description: string
  keywords: string[]
  ogImage?: string
  noindex: boolean
  type: "website" | "article"
  publishedTime?: string
  modifiedTime?: string
  /** Label shown in the kind-filter dropdown. */
  kindLabel: string
  /** True when this path is in the static registry and can be edited inline. */
  editable: boolean
  /**
   * The recommended focus keyword baked into the static registry. Used by
   * `EffectiveEntry` as the fallback when no admin override has been set,
   * and surfaced to the editor so users see the recommended keyword
   * pre-filled the first time they open a page. Empty string for dynamic
   * pages (blog/help/stories) where there's no compile-time default.
   */
  defaultFocusKeyword: string
}

const STATIC_ENTRY = (path: string, e: SeoEntry): DashboardEntry => ({
  path,
  kind: "static",
  kindLabel: "Page",
  title: e.title ?? "",
  titleAbsolute: e.titleAbsolute,
  description: e.description,
  keywords: e.keywords ?? [],
  ogImage: e.ogImage,
  noindex: Boolean(e.noindex),
  type: e.type ?? "website",
  publishedTime: e.publishedTime,
  modifiedTime: e.modifiedTime,
  editable: true,
  defaultFocusKeyword: e.focusKeyword ?? "",
})

/** Return every path that the dashboard knows about. */
export function getAllDashboardEntries(): DashboardEntry[] {
  const out: DashboardEntry[] = []

  // 1) Static registry
  for (const [path, entry] of Object.entries(SEO_REGISTRY)) {
    out.push(STATIC_ENTRY(path, entry))
  }

  // 2) Blog posts
  for (const post of ALL_POSTS) {
    out.push({
      path: `/blog/${post.meta.slug}`,
      kind: "blog",
      kindLabel: "Blog post",
      title: post.meta.title,
      description: post.meta.description,
      keywords: [],
      ogImage: post.meta.coverImage,
      noindex: false,
      type: "article",
      publishedTime: post.meta.date,
      modifiedTime: post.meta.updatedDate,
      editable: true,
      defaultFocusKeyword: "",
    })
  }

  // 3) Customer stories
  for (const story of ALL_STORIES) {
    out.push({
      path: `/resources/customer-stories/${story.slug}`,
      kind: "story",
      kindLabel: "Customer story",
      title: `${story.company} — Customer Story`,
      description: story.companyDescription ?? "",
      keywords: [],
      noindex: false,
      type: "article",
      publishedTime: (story as { publishedAt?: string }).publishedAt,
      editable: true,
      defaultFocusKeyword: "",
    })
  }

  // 4) Help centre — categories
  for (const cat of HELP_CATEGORIES) {
    out.push({
      path: `/resources/help/${cat.slug}`,
      kind: "help-category",
      kindLabel: "Help category",
      title: `${cat.title} — Help Centre`,
      description: cat.description,
      keywords: [],
      noindex: false,
      type: "website",
      editable: true,
      defaultFocusKeyword: "",
    })
  }

  // 5) Help centre — articles
  for (const { category, article } of getAllArticlePaths()) {
    const cat = HELP_CATEGORIES.find((c) => c.slug === category)
    const art = cat?.articles.find((a) => a.slug === article)
    out.push({
      path: `/resources/help/${category}/${article}`,
      kind: "help-article",
      kindLabel: "Help article",
      title: art?.title ?? article,
      description: art?.excerpt ?? "",
      keywords: [],
      noindex: false,
      type: "article",
      publishedTime: art?.updatedOn,
      editable: true,
      defaultFocusKeyword: "",
    })
  }

  return out.sort((a, b) => a.path.localeCompare(b.path))
}
