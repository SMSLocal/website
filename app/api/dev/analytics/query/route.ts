/**
 * POST /api/dev/analytics/query — protected analytics query endpoint.
 *
 * Reuses the same `seo_session` cookie as /dev/seo so a single admin login
 * unlocks both dashboards. Accepts a report name + range + optional filters
 * and returns the aggregated JSON. The actual aggregation lives in
 * `lib/analytics/reports.ts` which is pure and runnable anywhere.
 */

import { NextResponse } from "next/server"
import { z } from "zod"
import { getSession } from "@/lib/seo/auth"
import {
  getEventsForVisitor,
  getEventsInRange,
  getVisitor,
  isStoreConfigured,
  resolveRange,
} from "@/lib/analytics/store"
import {
  buildCampaigns,
  buildConversions,
  buildGeo,
  buildJourneyIndex,
  buildOverview,
  buildPages,
  buildSources,
  buildVisitorJourney,
} from "@/lib/analytics/reports"
import type { AnalyticsEvent, VisitorRecord } from "@/lib/analytics/types"

export const runtime = "nodejs"

const QuerySchema = z.object({
  report: z.enum([
    "overview",
    "geo",
    "pages",
    "sources",
    "campaigns",
    "conversions",
    "journey",
    "visitor",
  ]),
  range: z.enum(["24h", "7d", "30d", "90d"]).default("7d"),
  visitorId: z.string().trim().min(1).max(64).optional(),
})

export async function POST(req: Request) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 })
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 })
  }
  const parsed = QuerySchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: "invalid_payload", issues: parsed.error.flatten().fieldErrors },
      { status: 400 },
    )
  }
  const { report, range: rangeKey, visitorId } = parsed.data

  if (!isStoreConfigured()) {
    return NextResponse.json({
      storeReady: false,
      range: resolveRange(rangeKey),
      data: null,
      message:
        "Upstash Redis is not connected. Add the integration and re-load.",
    })
  }

  const range = resolveRange(rangeKey)

  if (report === "visitor") {
    if (!visitorId) {
      return NextResponse.json({ error: "missing_visitor_id" }, { status: 400 })
    }
    const [events, visitor] = await Promise.all([
      getEventsForVisitor(visitorId, range),
      getVisitor(visitorId),
    ])
    const effective: VisitorRecord = visitor ?? {
      visitorId,
      firstSeen: events[0]?.ts ?? Date.now(),
      lastSeen: events[events.length - 1]?.ts ?? Date.now(),
      sessions: new Set(events.map((e) => e.sessionId)).size,
      events: events.length,
    }
    return NextResponse.json({
      storeReady: true,
      range,
      data: buildVisitorJourney(events, effective),
    })
  }

  const events: AnalyticsEvent[] = await getEventsInRange(range)

  let data: unknown
  switch (report) {
    case "overview":
      data = buildOverview(events, range)
      break
    case "geo":
      data = buildGeo(events)
      break
    case "pages":
      data = buildPages(events)
      break
    case "sources":
      data = buildSources(events)
      break
    case "campaigns":
      data = buildCampaigns(events)
      break
    case "conversions":
      data = buildConversions(events)
      break
    case "journey": {
      // buildJourneyIndex needs a Map of visitors; for the index view we can
      // synthesise lightweight records from the event stream — enough for the
      // dashboard listing. Individual visitor drill-downs hit the "visitor"
      // branch above which does a full fetch.
      const visitorMap = new Map<string, VisitorRecord>()
      for (const e of events) {
        const cur = visitorMap.get(e.visitorId)
        if (!cur) {
          visitorMap.set(e.visitorId, {
            visitorId: e.visitorId,
            firstSeen: e.ts,
            lastSeen: e.ts,
            sessions: 1,
            events: 1,
            userId: e.userId,
            email: e.email,
            firstSource: e.source,
            firstUtm: e.utm,
            firstLanding: e.path,
            firstCountry: e.geo.country,
            firstCity: e.geo.city,
          })
        } else {
          cur.lastSeen = Math.max(cur.lastSeen, e.ts)
          cur.firstSeen = Math.min(cur.firstSeen, e.ts)
          cur.events++
          cur.userId = cur.userId ?? e.userId
          cur.email = cur.email ?? e.email
        }
      }
      data = buildJourneyIndex(events, visitorMap)
      break
    }
  }

  return NextResponse.json({ storeReady: true, range, data })
}

export async function GET() {
  return NextResponse.json({ error: "method_not_allowed" }, { status: 405 })
}
