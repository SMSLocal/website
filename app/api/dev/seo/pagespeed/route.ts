import { NextResponse } from "next/server"
import { getSession } from "@/lib/seo/auth"
import {
  getCachedPageSpeed,
  isAuditableUrl,
  runPageSpeed,
  type PsiStrategy,
} from "@/lib/seo/pagespeed"

/**
 * /api/dev/seo/pagespeed
 *
 *   GET  ?url=...&strategy=mobile|desktop
 *     → returns the cached result (or 404 if none).
 *
 *   POST { url: string, strategy?: "mobile" | "desktop" }
 *     → kicks off a fresh PSI run, caches it, returns the result.
 *
 * Both endpoints require the seo_session cookie. PSI runs are slow
 * (15–35 s) — the client should show a loading state on POST.
 */

// PSI calls take well over Vercel's default 10 s; bump to 60 s.
export const maxDuration = 60

function isStrategy(s: unknown): s is PsiStrategy {
  return s === "mobile" || s === "desktop"
}

async function requireAuth() {
  const session = await getSession()
  if (!session) return null
  return session
}

export async function GET(req: Request) {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: "unauthorised" }, { status: 401 })
  }
  const url = new URL(req.url)
  const target = url.searchParams.get("url") ?? ""
  const strategyRaw = url.searchParams.get("strategy") ?? "mobile"
  if (!isStrategy(strategyRaw)) {
    return NextResponse.json({ error: "invalid_strategy" }, { status: 400 })
  }
  if (!isAuditableUrl(target)) {
    return NextResponse.json({ error: "invalid_url" }, { status: 400 })
  }
  const cached = await getCachedPageSpeed(target, strategyRaw)
  if (!cached) {
    return NextResponse.json({ error: "not_cached" }, { status: 404 })
  }
  return NextResponse.json({ ok: true, result: cached })
}

export async function POST(req: Request) {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: "unauthorised" }, { status: 401 })
  }
  let body: { url?: string; strategy?: string } = {}
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 })
  }
  const target = String(body.url ?? "").trim()
  const strategyRaw = body.strategy ?? "mobile"
  if (!isStrategy(strategyRaw)) {
    return NextResponse.json({ error: "invalid_strategy" }, { status: 400 })
  }
  if (!isAuditableUrl(target)) {
    return NextResponse.json({ error: "invalid_url" }, { status: 400 })
  }
  try {
    const result = await runPageSpeed(target, strategyRaw)
    return NextResponse.json({ ok: true, result })
  } catch (err) {
    const msg = err instanceof Error ? err.message : "unknown_error"
    return NextResponse.json({ error: "psi_failed", message: msg }, { status: 502 })
  }
}
