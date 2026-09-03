import { NextResponse } from "next/server"
import sitemapEntries from "@/lib/seo/sitemap-entries"
import { SITEMAP_GROUPS, groupEntries, isSitemapGroup } from "@/lib/seo/sitemap-groups"
import { XML_HEADERS, renderUrlset } from "@/lib/seo/sitemap-xml"

/**
 * The child sitemaps listed in `/sitemap.xml`.
 *
 * Reached as `/{group}-sitemap.xml` via the rewrite in `next.config.mjs`,
 * matching the naming search engines see on most CMS-generated sitemaps
 * (`page-sitemap.xml`, `post-sitemap.xml`, …).
 */
export const revalidate = 60

// Prerender the known groups so each child sitemap is served from the ISR
// cache like the index, rather than rendered on every crawler request.
export function generateStaticParams() {
  return SITEMAP_GROUPS.map((group) => ({ group }))
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ group: string }> },
) {
  const { group } = await params
  if (!isSitemapGroup(group)) {
    return new NextResponse("Not found", { status: 404 })
  }

  const entries = groupEntries(await sitemapEntries()).get(group) ?? []
  return new NextResponse(renderUrlset(entries), { headers: XML_HEADERS })
}
