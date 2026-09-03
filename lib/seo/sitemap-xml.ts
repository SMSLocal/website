import type { MetadataRoute } from "next"
import { SITEMAP_STYLESHEET_PATH } from "@/lib/seo/sitemap-stylesheet"

/** XML-escape a text node. Sitemap `<loc>` values must be escaped entity-wise. */
export function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

export function toIso(d: Date | string | undefined): string | undefined {
  if (!d) return undefined
  const date = d instanceof Date ? d : new Date(d)
  if (Number.isNaN(date.getTime())) return undefined
  return date.toISOString()
}

const XML_DECL = '<?xml version="1.0" encoding="UTF-8"?>'
const SITEMAP_NS = "http://www.sitemaps.org/schemas/sitemap/0.9"

// Renders the XML as a styled page in a browser. Crawlers ignore this
// instruction and parse the XML, so it has no bearing on indexing.
const STYLESHEET_PI = `<?xml-stylesheet type="text/xsl" href="${SITEMAP_STYLESHEET_PATH}"?>`

/** A `<urlset>` document — one child sitemap. */
export function renderUrlset(entries: MetadataRoute.Sitemap): string {
  const lines = [XML_DECL, STYLESHEET_PI, `<urlset xmlns="${SITEMAP_NS}">`]
  for (const e of entries) {
    lines.push("  <url>")
    lines.push(`    <loc>${escapeXml(e.url)}</loc>`)
    const iso = toIso(e.lastModified)
    if (iso) lines.push(`    <lastmod>${iso}</lastmod>`)
    if (e.changeFrequency) lines.push(`    <changefreq>${e.changeFrequency}</changefreq>`)
    if (typeof e.priority === "number") lines.push(`    <priority>${e.priority.toFixed(2)}</priority>`)
    lines.push("  </url>")
  }
  lines.push("</urlset>")
  return lines.join("\n")
}

/** A `<sitemapindex>` document — the parent that lists child sitemaps. */
export function renderSitemapIndex(
  sitemaps: { loc: string; lastModified?: Date }[],
): string {
  const lines = [XML_DECL, STYLESHEET_PI, `<sitemapindex xmlns="${SITEMAP_NS}">`]
  for (const s of sitemaps) {
    lines.push("  <sitemap>")
    lines.push(`    <loc>${escapeXml(s.loc)}</loc>`)
    const iso = toIso(s.lastModified)
    if (iso) lines.push(`    <lastmod>${iso}</lastmod>`)
    lines.push("  </sitemap>")
  }
  lines.push("</sitemapindex>")
  return lines.join("\n")
}

export const XML_HEADERS = {
  "Content-Type": "application/xml; charset=utf-8",
} as const
