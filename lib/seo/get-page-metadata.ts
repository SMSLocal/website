import type { Metadata } from "next"
import { buildArticleMetadata, buildMetadata } from "./metadata"
import { SEO_REGISTRY } from "./registry"

/**
 * Resolve a page's Next.js Metadata object from the registry.
 *
 * Usage:
 *
 *   // app/pricing/page.tsx
 *   import { getPageMetadata } from "@/lib/seo"
 *   export const metadata = getPageMetadata("/pricing")
 *
 * If the path is not in the registry this logs a warning and falls back to
 * site-wide defaults, so pages never crash because you forgot to register.
 */
export function getPageMetadata(path: string): Metadata {
  const entry = SEO_REGISTRY[path]

  if (!entry) {
    if (process.env.NODE_ENV !== "production") {
      // Surface this once in the dev console; the page still renders with defaults.
      console.warn(
        `[seo] No registry entry for "${path}". Add it to lib/seo/registry.ts.`,
      )
    }
    return buildMetadata({ path })
  }

  const common = {
    title: entry.title,
    titleAbsolute: entry.titleAbsolute,
    description: entry.description,
    path,
    keywords: entry.keywords,
    ogImage: entry.ogImage,
    noindex: entry.noindex,
  } as const

  if (entry.type === "article") {
    return buildArticleMetadata({
      ...common,
      publishedTime:
        entry.publishedTime ?? new Date().toISOString(),
      modifiedTime: entry.modifiedTime,
      authors: entry.authors,
    })
  }

  return buildMetadata(common)
}
