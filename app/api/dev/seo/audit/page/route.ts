import { NextResponse } from "next/server"
import { getSession } from "@/lib/seo/auth"
import { auditPage, getCachedAudit } from "@/lib/seo/site-audit"

/**
 * /api/dev/seo/audit/page
 *
 *   GET  ?url=...
 *     → returns the cached audit (404 if none).
 *
 *   POST { url: string }
 *     → fetches the URL, parses HTML, runs SEO checks, caches the result.
 *
 * Both require the seo_session cookie. Each audit is one HTTP fetch +
 * regex parse, typically completes in under 2 s — far faster than PSI.
 */

export const maxDuration = 30

function isHttpUrl(input: string): boolean {
  try {
    const u = new URL(input)
    return u.protocol === "http:" || u.protocol === "https:"
  } catch {
    return false
  }
}

export async function GET(req: Request) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "unauthorised" }, { status: 401 })
  }
  const url = new URL(req.url)
  const target = url.searchParams.get("url") ?? ""
  if (!isHttpUrl(target)) {
    return NextResponse.json({ error: "invalid_url" }, { status: 400 })
  }
  const cached = await getCachedAudit(target)
  if (!cached) {
    return NextResponse.json({ error: "not_cached" }, { status: 404 })
  }
  return NextResponse.json({ ok: true, result: cached })
}

export async function POST(req: Request) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "unauthorised" }, { status: 401 })
  }
  let body: { url?: string } = {}
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 })
  }
  const target = String(body.url ?? "").trim()
  if (!isHttpUrl(target)) {
    return NextResponse.json({ error: "invalid_url" }, { status: 400 })
  }
  try {
    const result = await auditPage(target)
    return NextResponse.json({ ok: true, result })
  } catch (err) {
    const msg = err instanceof Error ? err.message : "unknown_error"
    return NextResponse.json({ error: "audit_failed", message: msg }, { status: 502 })
  }
}
