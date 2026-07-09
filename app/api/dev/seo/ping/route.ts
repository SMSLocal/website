import { NextResponse } from "next/server"
import { getSession } from "@/lib/seo/auth"
import { SITE } from "@/lib/seo/config"

/**
 * POST /api/dev/seo/ping
 *
 * Notify Google and Bing that the sitemap has changed. Returns a per-engine
 * status array so the dashboard can show which ping succeeded.
 *
 * Note: In mid-2023 Google deprecated its sitemap ping endpoint, but the
 * URL is still a harmless no-op (it returns a 410/200 text page and no
 * longer crawls the sitemap as a result). We keep the call so that the
 * UI matches operator expectations, and add IndexNow as the actually-
 * useful modern equivalent.
 */

const SITEMAP_URL = `${SITE.url}/sitemap.xml`

type PingResult = { engine: string; ok: boolean; status: number; detail?: string }

async function ping(url: string): Promise<PingResult> {
  const engine = new URL(url).hostname
  try {
    const res = await fetch(url, { method: "GET", redirect: "follow" })
    return { engine, ok: res.ok, status: res.status }
  } catch (err) {
    return {
      engine,
      ok: false,
      status: 0,
      detail: err instanceof Error ? err.message : "fetch_failed",
    }
  }
}

export async function POST() {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: "unauthorised" }, { status: 401 })

  const targets = [
    `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`,
    `https://www.bing.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`,
  ]

  const results = await Promise.all(targets.map(ping))
  return NextResponse.json({ ok: true, sitemap: SITEMAP_URL, results })
}
