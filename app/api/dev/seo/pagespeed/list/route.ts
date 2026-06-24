import { NextResponse } from "next/server"
import { getSession } from "@/lib/seo/auth"
import {
  getCachedManyPageSpeed,
  type PageSpeedResult,
  type PsiStrategy,
} from "@/lib/seo/pagespeed"

/**
 * /api/dev/seo/pagespeed/list?urls=...&strategy=mobile|desktop
 *
 * Comma-separated `urls` query param (URL-encoded). Returns whatever the
 * cache holds for each — missing URLs are simply absent from the response.
 * Used by the bulk PageSpeed table to populate scores on tab open without
 * one round-trip per page.
 */

function isStrategy(s: unknown): s is PsiStrategy {
  return s === "mobile" || s === "desktop"
}

export async function GET(req: Request) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "unauthorised" }, { status: 401 })
  }
  const url = new URL(req.url)
  const raw = url.searchParams.get("urls") ?? ""
  const strategyRaw = url.searchParams.get("strategy") ?? "mobile"
  if (!isStrategy(strategyRaw)) {
    return NextResponse.json({ error: "invalid_strategy" }, { status: 400 })
  }
  const urls = raw
    .split(",")
    .map((u) => u.trim())
    .filter(Boolean)
  // Hard cap so a malicious caller can't make us pipeline-read 100k keys.
  if (urls.length > 500) {
    return NextResponse.json({ error: "too_many_urls" }, { status: 400 })
  }

  const map = await getCachedManyPageSpeed(urls, strategyRaw)
  const results: Record<string, PageSpeedResult> = {}
  for (const [k, v] of map) results[k] = v
  return NextResponse.json({ ok: true, results, strategy: strategyRaw })
}
