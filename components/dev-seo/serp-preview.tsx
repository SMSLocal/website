"use client"

import { SITE } from "@/lib/seo/config"

/**
 * Google-style SERP snippet. Matches how the desktop result page renders
 * titles, descriptions, and breadcrumb URLs in 2026 — the typography is
 * approximate but the truncation thresholds are real.
 */

function truncate(text: string, max: number): string {
  if (text.length <= max) return text
  return text.slice(0, max).trimEnd() + "…"
}

function breadcrumb(path: string): string {
  const host = SITE.url.replace(/^https?:\/\//, "").replace(/^www\./, "")
  if (path === "/" || path === "") return host
  const segs = path.split("/").filter(Boolean).join(" › ")
  return `${host} › ${segs}`
}

export function SerpPreview({
  title,
  description,
  path,
  noindex,
}: {
  title: string
  description: string
  path: string
  noindex?: boolean
}) {
  const safeTitle = truncate(title || "Untitled", 60)
  const safeDesc = truncate(description || "No description provided.", 160)
  const crumb = truncate(breadcrumb(path), 80)

  return (
    <div className="rounded-xl border border-border bg-card p-4 font-sans">
      <p className="mb-1 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
        Google desktop preview
      </p>
      <div className="rounded-lg border border-border bg-background p-4">
        <p className="text-[12px] leading-tight text-muted-foreground">{crumb}</p>
        <h4 className="mt-1 text-[18px] leading-snug text-[#1a0dab] underline-offset-2 hover:underline dark:text-[#8ab4f8]">
          {safeTitle}
        </h4>
        <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
          {safeDesc}
        </p>
        {noindex ? (
          <p className="mt-2 inline-block rounded-md bg-amber-500/10 px-2 py-0.5 text-[11px] font-medium text-amber-700 dark:text-amber-300">
            Discouraged from search engines (noindex)
          </p>
        ) : null}
      </div>
      <div className="mt-2 flex justify-between text-[11px] text-muted-foreground">
        <span>Title: {title.length}/60</span>
        <span>Description: {description.length}/160</span>
      </div>
    </div>
  )
}
