import { NextResponse } from "next/server"
import { getSession } from "@/lib/seo/auth"
import { getCachedManyAudits, type SiteAuditResult } from "@/lib/seo/site-audit"

/**
 * /api/dev/seo/audit/list?urls=u1,u2,u3
 *
 * Comma-separated `urls` query param. Returns whatever the cache holds
 * for each — missing URLs are simply absent from the response. Lets the
 * site-audit dashboard populate the table on first paint with a single
 * Redis pipeline read.
 */

export async function GET(req: Request) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "unauthorised" }, { status: 401 })
  }
  const url = new URL(req.url)
  const raw = url.searchParams.get("urls") ?? ""
  const urls = raw
    .split(",")
    .map((u) => u.trim())
    .filter(Boolean)
  if (urls.length > 500) {
    return NextResponse.json({ error: "too_many_urls" }, { status: 400 })
  }
  const map = await getCachedManyAudits(urls)
  const results: Record<string, SiteAuditResult> = {}
  for (const [k, v] of map) results[k] = v
  return NextResponse.json({ ok: true, results })
}
