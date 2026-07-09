import { NextResponse } from "next/server"
import { getSession } from "@/lib/seo/auth"
import { deleteOverride, setOverride, type SeoOverride } from "@/lib/seo/store"

/**
 * CRUD endpoints for per-path SEO overrides.
 *
 *   PUT /api/dev/seo/pages
 *     body: { path: string, patch: Partial<SeoOverride> }
 *     → merges the patch on top of the current override in Redis.
 *
 *   DELETE /api/dev/seo/pages?path=/foo
 *     → removes the override, the page falls back to registry defaults.
 *
 * All endpoints require a valid `seo_session` cookie.
 */

async function requireSession() {
  const session = await getSession()
  if (!session) return null
  return session
}

function clampPriority(p: unknown): number | undefined {
  if (typeof p !== "number" || Number.isNaN(p)) return undefined
  return Math.min(1, Math.max(0, p))
}

const VALID_FREQS = new Set([
  "always",
  "hourly",
  "daily",
  "weekly",
  "monthly",
  "yearly",
  "never",
])

function sanitisePatch(input: unknown): Partial<SeoOverride> {
  if (!input || typeof input !== "object") return {}
  const p = input as Record<string, unknown>
  const out: Partial<SeoOverride> = {}
  if (typeof p.title === "string") out.title = p.title.trim()
  if (typeof p.titleAbsolute === "string") out.titleAbsolute = p.titleAbsolute.trim()
  if (typeof p.description === "string") out.description = p.description.trim()
  if (Array.isArray(p.keywords))
    out.keywords = p.keywords
      .map((k) => String(k).trim())
      .filter((k, i, arr) => k.length > 0 && arr.indexOf(k) === i)
      .slice(0, 20)
  if (typeof p.ogImage === "string") out.ogImage = p.ogImage.trim()
  if (typeof p.noindex === "boolean") out.noindex = p.noindex
  if (typeof p.focusKeyword === "string") out.focusKeyword = p.focusKeyword.trim()
  if (typeof p.includeInSitemap === "boolean") out.includeInSitemap = p.includeInSitemap
  const pr = clampPriority(p.priority)
  if (pr !== undefined) out.priority = pr
  if (typeof p.changeFrequency === "string" && VALID_FREQS.has(p.changeFrequency))
    out.changeFrequency = p.changeFrequency as SeoOverride["changeFrequency"]
  return out
}

export async function PUT(req: Request) {
  const session = await requireSession()
  if (!session) return NextResponse.json({ error: "unauthorised" }, { status: 401 })

  let body: { path?: string; patch?: unknown } = {}
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 })
  }

  const path = String(body.path ?? "")
  if (!path.startsWith("/")) {
    return NextResponse.json({ error: "invalid_path" }, { status: 400 })
  }

  const patch = sanitisePatch(body.patch)
  if (Object.keys(patch).length === 0) {
    return NextResponse.json({ error: "empty_patch" }, { status: 400 })
  }

  const saved = await setOverride(path, patch, session.sub)
  return NextResponse.json({ ok: true, override: saved })
}

export async function DELETE(req: Request) {
  const session = await requireSession()
  if (!session) return NextResponse.json({ error: "unauthorised" }, { status: 401 })

  const url = new URL(req.url)
  const path = url.searchParams.get("path") ?? ""
  if (!path.startsWith("/")) {
    return NextResponse.json({ error: "invalid_path" }, { status: 400 })
  }
  await deleteOverride(path)
  return NextResponse.json({ ok: true })
}
