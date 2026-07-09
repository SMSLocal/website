/**
 * POST /api/track/identify — tie an anonymous visitor to a real user.
 *
 * When the product app on app.smslocal.in finishes a signup (or a
 * marketing-side form captures an email), it calls this endpoint with the
 * visitor and session ids it received on the query string. We stamp the
 * userId and email onto the visitor record so the /dev/analytics journey
 * view can show a complete pre-signup → signup trail.
 *
 * The endpoint is idempotent — repeated calls with the same (vid, uid) pair
 * are safe.
 */

import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { checkLimit, getClientIdentifier } from "@/lib/security/rate-limit"
import { getVisitor, touchVisitor } from "@/lib/analytics/store"
import { geoFromHeaders } from "@/lib/analytics/geo"
import type { AnalyticsEvent } from "@/lib/analytics/types"

export const runtime = "nodejs"

const IdentifySchema = z.object({
  visitorId: z.string().trim().min(4).max(64),
  sessionId: z.string().trim().min(4).max(64).optional(),
  userId: z.string().trim().min(1).max(128),
  email: z.string().trim().email().max(320).optional(),
  traits: z
    .record(z.union([z.string(), z.number(), z.boolean(), z.null()]))
    .optional(),
})

export async function POST(req: NextRequest) {
  const ip = getClientIdentifier(req)
  const rl = await checkLimit("track", ip)
  if (!rl.success) {
    return new NextResponse(null, {
      status: 429,
      headers: { "Retry-After": String(rl.retryAfterSeconds) },
    })
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 })
  }
  const parsed = IdentifySchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: "invalid_payload", issues: parsed.error.flatten().fieldErrors },
      { status: 400 },
    )
  }
  const p = parsed.data

  // Load the existing visitor (if any) so we inherit first-touch attribution.
  const existing = await getVisitor(p.visitorId)

  // Build a synthetic "identify" event so the usual pipeline writes the
  // visitor hash and records the user→visitor lookup.
  const event: AnalyticsEvent = {
    ts: Date.now(),
    type: "event",
    name: "identify",
    path: "/",
    source: existing?.firstSource ?? { kind: "direct", name: "direct" },
    utm: existing?.firstUtm ?? {},
    visitorId: p.visitorId,
    sessionId: p.sessionId ?? p.visitorId,
    userId: p.userId,
    email: p.email,
    geo: geoFromHeaders(req.headers),
    ua: {},
    properties: p.traits ?? undefined,
  }

  await touchVisitor(event, false)
  return new NextResponse(null, { status: 204 })
}

export async function GET() {
  return NextResponse.json({ error: "method_not_allowed" }, { status: 405 })
}
