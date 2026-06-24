/**
 * POST /api/track — ingest a single analytics event from the browser.
 *
 * Security
 *   - Body is strictly validated with Zod. Unknown keys are stripped.
 *   - Per-IP rate limit ("track": 120/min) stops a malicious page from
 *     spamming events. Legitimate visitors rarely trigger more than 20/min.
 *   - Country / region / city / IP / UA are set by the server. The client
 *     can NOT forge geo data.
 *
 * Behaviour
 *   - Persists the enriched event into the Redis hourly bucket.
 *   - Upserts the visitor record (first-seen, last-seen, attribution).
 *   - 204 No Content on success (no payload needed). Errors are logged but
 *     still return 204 so the page keeps working even if Redis is down.
 */

import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { checkLimit, getClientIdentifier } from "@/lib/security/rate-limit"
import { recordEvent, touchVisitor } from "@/lib/analytics/store"
import {
  classifySource,
  extractUtm,
  normalizePath,
  parseUserAgent,
  referrerHostname,
} from "@/lib/analytics/parse"
import { geoFromHeaders } from "@/lib/analytics/geo"
import type { AnalyticsEvent, EventType } from "@/lib/analytics/types"
import { SITE } from "@/lib/seo/config"

export const runtime = "nodejs"

const PropertyValue = z.union([z.string(), z.number(), z.boolean(), z.null()])

const TrackSchema = z.object({
  type: z.enum(["pageview", "event", "conversion"]) as z.ZodType<EventType>,
  name: z.string().trim().max(80).optional(),
  path: z.string().trim().min(1).max(500),
  title: z.string().trim().max(300).optional(),
  referrer: z.string().trim().max(1000).optional(),
  url: z.string().trim().max(1000).optional(),
  visitorId: z.string().trim().min(4).max(64),
  sessionId: z.string().trim().min(4).max(64),
  userId: z.string().trim().max(128).optional(),
  email: z.string().trim().max(320).optional(),
  isNewSession: z.boolean().optional(),
  properties: z.record(PropertyValue).optional(),
})

export async function POST(req: NextRequest) {
  // Rate limit early — never spend CPU on parsing when blocked.
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

  const parsed = TrackSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: "invalid_payload", issues: parsed.error.flatten().fieldErrors },
      { status: 400 },
    )
  }

  const p = parsed.data
  if ((p.type === "event" || p.type === "conversion") && !p.name) {
    return NextResponse.json({ error: "missing_event_name" }, { status: 400 })
  }

  const geo = geoFromHeaders(req.headers)
  const ua = parseUserAgent(req.headers.get("user-agent") ?? undefined)
  const utm = extractUtm(p.url)
  const source = classifySource({
    referrer: p.referrer,
    utm,
    siteHost: new URL(SITE.url).hostname,
  })

  // Dump bot traffic. We still record ts (for load graphs) but we set a
  // `bot` flag in properties so downstream reports can filter.
  // Simpler: skip saving bot hits entirely to keep the dashboard clean.
  if (ua.device === "bot") {
    return new NextResponse(null, { status: 204 })
  }

  const event: AnalyticsEvent = {
    ts: Date.now(),
    type: p.type,
    name: p.name,
    path: normalizePath(p.path),
    title: p.title,
    referrer: referrerHostname(p.referrer),
    source,
    utm,
    visitorId: p.visitorId,
    sessionId: p.sessionId,
    userId: p.userId,
    email: p.email,
    geo,
    ua,
    properties: p.properties,
  }

  // Fire-and-forget writes — keep latency to the browser minimal.
  await Promise.allSettled([
    recordEvent(event),
    touchVisitor(event, p.isNewSession === true),
  ])

  return new NextResponse(null, { status: 204 })
}

export async function GET() {
  return NextResponse.json({ error: "method_not_allowed" }, { status: 405 })
}
