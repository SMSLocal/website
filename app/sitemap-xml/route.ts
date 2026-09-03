import { NextResponse } from "next/server"
import sitemapEntries from "@/lib/seo/sitemap-entries"
import { SITE } from "@/lib/seo/config"
import { SITEMAP_GROUPS, groupEntries, latestLastModified } from "@/lib/seo/sitemap-groups"
import { XML_HEADERS, renderSitemapIndex } from "@/lib/seo/sitemap-xml"

/**
 * `/sitemap.xml` — the sitemap *index*.
 *
 * Served here rather than from `app/sitemap.ts` because the `[..slug]`
 * catch-all intercepts `/sitemap.xml` before the metadata route can; the
 * rewrite in `next.config.mjs` points at this route.
 *
 * Empty groups are omitted: an index entry pointing at a `<urlset>` with no
 * URLs is reported as an error in Search Console.
 */
export const revalidate = 60

export async function GET() {
  const byGroup = groupEntries(await sitemapEntries())

  const sitemaps = SITEMAP_GROUPS.filter(
    (group) => (byGroup.get(group) ?? []).length > 0,
  ).map((group) => ({
    loc: `${SITE.url}/${group}-sitemap.xml`,
    lastModified: latestLastModified(byGroup.get(group) ?? []),
  }))

  return new NextResponse(renderSitemapIndex(sitemaps), { headers: XML_HEADERS })
}
