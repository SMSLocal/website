import { NextResponse } from "next/server"
import { SITEMAP_STYLESHEET } from "@/lib/seo/sitemap-stylesheet"

/**
 * `/sitemap.xsl` — the stylesheet browsers apply to the sitemap XML.
 *
 * Served from a route rather than `public/` because the `[..slug]` catch-all
 * intercepts static files here, the same reason `/sitemap.xml` needs a rewrite.
 *
 * The `text/xsl` content type is required: with `X-Content-Type-Options:
 * nosniff` set site-wide, a browser will refuse to apply a stylesheet served
 * as `text/plain`.
 */
export const dynamic = "force-static"

export async function GET() {
  return new NextResponse(SITEMAP_STYLESHEET, {
    headers: {
      "Content-Type": "text/xsl; charset=utf-8",
      "Cache-Control": "public, max-age=3600, must-revalidate",
    },
  })
}
