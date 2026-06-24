import { NextResponse } from "next/server"
import { getSession } from "@/lib/seo/auth"
import { getSettings, setSettings, type SeoSettings } from "@/lib/seo/store"

/**
 * GET  /api/dev/seo/settings  — return the current site-wide SEO settings.
 * POST /api/dev/seo/settings  — merge a patch into the settings.
 *
 * Both require a valid `seo_session` cookie.
 */

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: "unauthorised" }, { status: 401 })
  const settings = await getSettings()
  return NextResponse.json({ settings })
}

function sanitise(input: unknown): Partial<SeoSettings> {
  if (!input || typeof input !== "object") return {}
  const p = input as Record<string, unknown>
  const out: Partial<SeoSettings> = {}
  if (typeof p.defaultInclude === "boolean") out.defaultInclude = p.defaultInclude
  if (typeof p.globalNoindex === "boolean") out.globalNoindex = p.globalNoindex
  if (Array.isArray(p.extraDisallow))
    out.extraDisallow = p.extraDisallow.map(String).filter(Boolean).slice(0, 40)
  if (Array.isArray(p.blockedBots))
    out.blockedBots = p.blockedBots.map(String).filter(Boolean).slice(0, 40)
  if (typeof p.googleSiteVerification === "string")
    out.googleSiteVerification = p.googleSiteVerification.trim()
  if (typeof p.bingSiteVerification === "string")
    out.bingSiteVerification = p.bingSiteVerification.trim()
  return out
}

export async function POST(req: Request) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: "unauthorised" }, { status: 401 })
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 })
  }
  const patch = sanitise(body)
  const saved = await setSettings(patch)
  return NextResponse.json({ ok: true, settings: saved })
}
