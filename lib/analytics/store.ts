/**
 * Redis-backed storage for the SMSLocal analytics pipeline.
 *
 * Why Redis?
 *   The same Upstash integration that powers the SEO admin and rate-limiters
 *   is already wired into this codebase (KV_REST_API_URL / KV_REST_API_TOKEN).
 *   Re-using it means no new integration to install and consistent fail-open
 *   behaviour across every subsystem.
 *
 * Data model
 *   Events are written to hourly sorted sets keyed by UTC hour. Reads span
 *   `N` hour-buckets in parallel via a pipeline, which gives sub-100ms
 *   queries for 90-day windows on small-to-medium volumes.
 *
 *     an:ev:2026-04-24-17          ZSET  score=ts  value=JSON.stringify(event)
 *     an:hours                     ZSET  score=hourTs  value=hourKey       (index)
 *     an:visitor:{vid}             JSON  VisitorRecord
 *     an:user:{uid}                JSON  { vid, email, firstSeen }          (for identify)
 *
 * Capacity guards
 *   - Each hourly bucket is capped at 10k events (ZREMRANGEBYRANK) so a
 *     runaway bot can't balloon the key.
 *   - The hour-index is capped at 90d worth of entries to bound read fanout.
 *
 * Fail-open
 *   When KV_REST_API_URL is not set, every read returns empty and every
 *   write silently drops. The /dev/analytics dashboard surfaces a banner so
 *   the operator knows they need to connect the integration.
 */

import { Redis } from "@upstash/redis"
import type {
  AnalyticsEvent,
  RangeKey,
  ReportRange,
  VisitorRecord,
} from "./types"

// ─── Configuration ───────────────────────────────────────────────────────────

const HOURLY_CAP = 10_000
const HOUR_INDEX_CAP = 24 * 90 // 90 days
const VISITOR_TTL_SECONDS = 60 * 60 * 24 * 180 // 180d

function keyEventBucket(hourKey: string) {
  return `an:ev:${hourKey}`
}
const HOUR_INDEX_KEY = "an:hours"
function keyVisitor(vid: string) {
  return `an:visitor:${vid}`
}
function keyUser(uid: string) {
  return `an:user:${uid}`
}

// ─── Redis client ────────────────────────────────────────────────────────────

let _redis: Redis | null = null
function redis(): Redis | null {
  if (_redis) return _redis
  const url = process.env.KV_REST_API_URL
  const token = process.env.KV_REST_API_TOKEN
  if (!url || !token) return null
  _redis = new Redis({ url, token })
  return _redis
}

export function isStoreConfigured(): boolean {
  return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN)
}

// ─── Time helpers ────────────────────────────────────────────────────────────

/** Format a Date as "YYYY-MM-DD-HH" in UTC. */
export function hourKeyForTs(ts: number): string {
  const d = new Date(ts)
  const pad = (n: number) => n.toString().padStart(2, "0")
  return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}-${pad(d.getUTCHours())}`
}

/** Parse back a hourKey into a Date (UTC). */
function dateFromHourKey(k: string): Date {
  const [y, m, d, h] = k.split("-").map(Number)
  return new Date(Date.UTC(y, m - 1, d, h, 0, 0, 0))
}

/** Given a range key, expand to a list of hour-keys (UTC) that fall within it. */
export function hoursInRange(range: ReportRange): string[] {
  const out: string[] = []
  const start = new Date(range.from)
  start.setUTCMinutes(0, 0, 0)
  for (let t = start.getTime(); t <= range.to; t += 60 * 60 * 1000) {
    out.push(hourKeyForTs(t))
  }
  return out
}

export function resolveRange(key: RangeKey, now: number = Date.now()): ReportRange {
  const DAY = 24 * 60 * 60 * 1000
  const HOUR = 60 * 60 * 1000
  let ms: number
  let bucket: "hour" | "day"
  switch (key) {
    case "24h":
      ms = 24 * HOUR
      bucket = "hour"
      break
    case "7d":
      ms = 7 * DAY
      bucket = "day"
      break
    case "30d":
      ms = 30 * DAY
      bucket = "day"
      break
    case "90d":
      ms = 90 * DAY
      bucket = "day"
      break
  }
  return { key, from: now - ms, to: now, bucket }
}

// ─── Writes ──────────────────────────────────────────────────────────────────

export async function recordEvent(event: AnalyticsEvent): Promise<void> {
  const r = redis()
  if (!r) return
  const hourKey = hourKeyForTs(event.ts)
  const bucket = keyEventBucket(hourKey)
  try {
    const pipe = r.pipeline()
    pipe.zadd(bucket, { score: event.ts, member: JSON.stringify(event) })
    // Cap bucket size — drop oldest beyond HOURLY_CAP.
    pipe.zremrangebyrank(bucket, 0, -HOURLY_CAP - 1)
    // Auto-expire old buckets after 100 days (belt + braces with HOUR_INDEX_CAP).
    pipe.expire(bucket, 60 * 60 * 24 * 100)
    // Track the hour key for fast range queries.
    pipe.zadd(HOUR_INDEX_KEY, { score: dateFromHourKey(hourKey).getTime(), member: hourKey })
    pipe.zremrangebyrank(HOUR_INDEX_KEY, 0, -HOUR_INDEX_CAP - 1)
    await pipe.exec()
  } catch (err) {
    console.error("[v0] analytics.recordEvent failed", err)
  }
}

export async function getVisitor(vid: string): Promise<VisitorRecord | null> {
  const r = redis()
  if (!r) return null
  try {
    const data = await r.get<VisitorRecord>(keyVisitor(vid))
    return data ?? null
  } catch {
    return null
  }
}

/** Upsert a visitor record with the latest event. */
export async function touchVisitor(
  event: AnalyticsEvent,
  isNewSession: boolean,
): Promise<void> {
  const r = redis()
  if (!r) return
  const current = (await getVisitor(event.visitorId)) ?? {
    visitorId: event.visitorId,
    firstSeen: event.ts,
    lastSeen: event.ts,
    sessions: 0,
    events: 0,
    firstSource: event.source,
    firstUtm: event.utm,
    firstLanding: event.path,
    firstCountry: event.geo.country,
    firstCity: event.geo.city,
  }

  const next: VisitorRecord = {
    ...current,
    visitorId: event.visitorId,
    userId: event.userId ?? current.userId,
    email: event.email ?? current.email,
    firstSeen: Math.min(current.firstSeen, event.ts),
    lastSeen: Math.max(current.lastSeen, event.ts),
    sessions: current.sessions + (isNewSession ? 1 : 0),
    events: current.events + 1,
  }
  try {
    await r.set(keyVisitor(event.visitorId), next, { ex: VISITOR_TTL_SECONDS })
    if (next.userId) {
      await r.set(
        keyUser(next.userId),
        { vid: next.visitorId, email: next.email, firstSeen: next.firstSeen },
        { ex: VISITOR_TTL_SECONDS },
      )
    }
  } catch (err) {
    console.error("[v0] analytics.touchVisitor failed", err)
  }
}

// ─── Reads ───────────────────────────────────────────────────────────────────

/**
 * Fetch every event in the given range. Uses a single pipeline so even a
 * 90-day window stays inside one Upstash round-trip per 1000 hour-keys.
 */
export async function getEventsInRange(
  range: ReportRange,
): Promise<AnalyticsEvent[]> {
  const r = redis()
  if (!r) return []
  const hours = hoursInRange(range)
  if (hours.length === 0) return []

  try {
    const pipe = r.pipeline()
    for (const h of hours) {
      pipe.zrange(keyEventBucket(h), range.from, range.to, {
        byScore: true,
      })
    }
    const chunks = (await pipe.exec()) as Array<Array<string | AnalyticsEvent>>

    const events: AnalyticsEvent[] = []
    for (const chunk of chunks) {
      if (!chunk) continue
      for (const raw of chunk) {
        const parsed = parseEventMember(raw)
        if (parsed) events.push(parsed)
      }
    }
    // Redis returns each bucket pre-sorted; a final sort fixes cross-bucket
    // ordering so callers can trust [0] = earliest.
    events.sort((a, b) => a.ts - b.ts)
    return events
  } catch (err) {
    console.error("[v0] analytics.getEventsInRange failed", err)
    return []
  }
}

/** Upstash returns members as strings; some client versions auto-parse. */
function parseEventMember(raw: unknown): AnalyticsEvent | null {
  if (!raw) return null
  if (typeof raw === "object") return raw as AnalyticsEvent
  if (typeof raw === "string") {
    try {
      return JSON.parse(raw) as AnalyticsEvent
    } catch {
      return null
    }
  }
  return null
}

/**
 * Fetch the full event stream for a single visitor. Scans every hour bucket
 * in the range — fine for the per-visitor journey view since visitors only
 * have a handful of events.
 */
export async function getEventsForVisitor(
  visitorId: string,
  range: ReportRange,
): Promise<AnalyticsEvent[]> {
  const events = await getEventsInRange(range)
  return events.filter((e) => e.visitorId === visitorId)
}

// ─── User → visitor lookup (for identify) ───────────────────────────────────

export async function visitorIdForUser(
  userId: string,
): Promise<string | null> {
  const r = redis()
  if (!r) return null
  try {
    const data = await r.get<{ vid: string }>(keyUser(userId))
    return data?.vid ?? null
  } catch {
    return null
  }
}
