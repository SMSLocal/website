/**
 * Pure aggregation functions that turn a flat `AnalyticsEvent[]` into every
 * report the `/dev/analytics` dashboard renders. Keeping these in their own
 * module (no Redis, no Next) means they are trivially unit-testable and run
 * equally well on the server or in a future worker.
 */

import { countryName } from "./geo"
import type {
  AnalyticsEvent,
  CampaignsReport,
  ConversionsReport,
  GeoReport,
  JourneyReport,
  OverviewReport,
  PagesReport,
  ReportRange,
  SourceKind,
  SourcesReport,
  TimeseriesPoint,
  VisitorJourney,
  VisitorRecord,
} from "./types"

const DAY_MS = 24 * 60 * 60 * 1000
const HOUR_MS = 60 * 60 * 1000

// ─── Helpers ────────────────────────────────────────────────────────────────

function bucketStart(ts: number, bucket: "hour" | "day"): number {
  const d = new Date(ts)
  if (bucket === "hour") {
    d.setUTCMinutes(0, 0, 0)
  } else {
    d.setUTCHours(0, 0, 0, 0)
  }
  return d.getTime()
}

function increment<K>(map: Map<K, number>, key: K, by = 1) {
  map.set(key, (map.get(key) ?? 0) + by)
}

function ensureSet<K>(map: Map<K, Set<string>>, key: K): Set<string> {
  let s = map.get(key)
  if (!s) {
    s = new Set<string>()
    map.set(key, s)
  }
  return s
}

function topN<T extends object>(arr: T[], n: number): T[] {
  return arr.slice(0, n)
}

// ─── Overview ───────────────────────────────────────────────────────────────

export function buildOverview(
  events: AnalyticsEvent[],
  range: ReportRange,
): OverviewReport {
  const visitors = new Set<string>()
  const sessions = new Set<string>()
  const conversionEvents: AnalyticsEvent[] = []

  // Per-bucket stats
  const bucketMs = range.bucket === "hour" ? HOUR_MS : DAY_MS
  const bucketMap = new Map<
    number,
    { pv: number; vis: Set<string>; ses: Set<string>; conv: number }
  >()

  const pageviewsByPath = new Map<string, number>()
  const visitorsByPath = new Map<string, Set<string>>()
  const visitorsBySource = new Map<string, Set<string>>()
  const sourceNames = new Map<string, { kind: SourceKind; name: string }>()
  const visitorsByCountry = new Map<string, Set<string>>()

  // For bounce-rate & pages-per-session
  const sessionPages = new Map<string, number>()

  let pageviews = 0
  for (const e of events) {
    visitors.add(e.visitorId)
    sessions.add(e.sessionId)
    const bucketTs = bucketStart(e.ts, range.bucket)
    let bucket = bucketMap.get(bucketTs)
    if (!bucket) {
      bucket = { pv: 0, vis: new Set(), ses: new Set(), conv: 0 }
      bucketMap.set(bucketTs, bucket)
    }
    bucket.vis.add(e.visitorId)
    bucket.ses.add(e.sessionId)

    if (e.type === "pageview") {
      pageviews++
      bucket.pv++
      increment(pageviewsByPath, e.path)
      ensureSet(visitorsByPath, e.path).add(e.visitorId)
      sessionPages.set(e.sessionId, (sessionPages.get(e.sessionId) ?? 0) + 1)

      const srcKey = `${e.source.kind}:${e.source.name}`
      ensureSet(visitorsBySource, srcKey).add(e.visitorId)
      sourceNames.set(srcKey, { kind: e.source.kind, name: e.source.name })

      if (e.geo.countryCode) {
        ensureSet(visitorsByCountry, e.geo.countryCode).add(e.visitorId)
      }
    }
    if (e.type === "conversion") {
      conversionEvents.push(e)
      bucket.conv++
    }
  }

  // Fill missing buckets so the chart has no gaps.
  const series: TimeseriesPoint[] = []
  const startBucket = bucketStart(range.from, range.bucket)
  for (let t = startBucket; t <= range.to; t += bucketMs) {
    const b = bucketMap.get(t)
    series.push({
      t: new Date(t).toISOString(),
      pageviews: b?.pv ?? 0,
      visitors: b?.vis.size ?? 0,
      sessions: b?.ses.size ?? 0,
      conversions: b?.conv ?? 0,
    })
  }

  const totalSessions = sessions.size
  const totalPages = Array.from(sessionPages.values()).reduce((a, b) => a + b, 0)
  const singlePageSessions = Array.from(sessionPages.values()).filter((n) => n === 1).length

  const topPages = topN(
    Array.from(pageviewsByPath.entries())
      .map(([path, pv]) => ({
        path,
        pageviews: pv,
        visitors: visitorsByPath.get(path)?.size ?? 0,
      }))
      .sort((a, b) => b.pageviews - a.pageviews),
    10,
  )

  const topSources = topN(
    Array.from(visitorsBySource.entries())
      .map(([key, set]) => ({
        ...sourceNames.get(key)!,
        visitors: set.size,
      }))
      .sort((a, b) => b.visitors - a.visitors),
    8,
  )

  const topCountries = topN(
    Array.from(visitorsByCountry.entries())
      .map(([code, set]) => ({
        code,
        country: countryName(code),
        visitors: set.size,
      }))
      .sort((a, b) => b.visitors - a.visitors),
    8,
  )

  const recent = events
    .slice()
    .reverse()
    .slice(0, 20)
    .map((e) => ({
      ts: e.ts,
      type: e.type,
      name: e.name,
      path: e.path,
      source: e.source,
      geo: e.geo,
      ua: e.ua,
      visitorId: e.visitorId,
      userId: e.userId,
      email: e.email,
    }))

  return {
    totals: {
      pageviews,
      visitors: visitors.size,
      sessions: totalSessions,
      conversions: conversionEvents.length,
      avgPagesPerSession: totalSessions > 0 ? totalPages / totalSessions : 0,
      bounceRate: totalSessions > 0 ? singlePageSessions / totalSessions : 0,
    },
    series,
    topPages,
    topSources,
    topCountries,
    recent,
  }
}

// ─── Geo ────────────────────────────────────────────────────────────────────

export function buildGeo(events: AnalyticsEvent[]): GeoReport {
  const byCountry = new Map<
    string,
    { country: string; vis: Set<string>; ses: Set<string>; pv: number; conv: number }
  >()
  const byRegion = new Map<
    string,
    { countryCode: string; region: string; vis: Set<string>; pv: number; conv: number }
  >()
  const byCity = new Map<
    string,
    {
      countryCode: string
      region: string
      city: string
      vis: Set<string>
      pv: number
      conv: number
    }
  >()

  for (const e of events) {
    const code = e.geo.countryCode ?? "XX"
    const country = e.geo.country ?? "Unknown"
    const region = e.geo.region ?? "Unknown"
    const city = e.geo.city ?? "Unknown"

    let c = byCountry.get(code)
    if (!c) {
      c = { country, vis: new Set(), ses: new Set(), pv: 0, conv: 0 }
      byCountry.set(code, c)
    }
    c.vis.add(e.visitorId)
    c.ses.add(e.sessionId)
    if (e.type === "pageview") c.pv++
    if (e.type === "conversion") c.conv++

    const regionKey = `${code}::${region}`
    let rr = byRegion.get(regionKey)
    if (!rr) {
      rr = { countryCode: code, region, vis: new Set(), pv: 0, conv: 0 }
      byRegion.set(regionKey, rr)
    }
    rr.vis.add(e.visitorId)
    if (e.type === "pageview") rr.pv++
    if (e.type === "conversion") rr.conv++

    const cityKey = `${code}::${region}::${city}`
    let cc = byCity.get(cityKey)
    if (!cc) {
      cc = { countryCode: code, region, city, vis: new Set(), pv: 0, conv: 0 }
      byCity.set(cityKey, cc)
    }
    cc.vis.add(e.visitorId)
    if (e.type === "pageview") cc.pv++
    if (e.type === "conversion") cc.conv++
  }

  const countries = Array.from(byCountry.entries())
    .map(([code, v]) => ({
      code,
      country: v.country,
      visitors: v.vis.size,
      sessions: v.ses.size,
      pageviews: v.pv,
      conversions: v.conv,
    }))
    .sort((a, b) => b.visitors - a.visitors)

  const regions = Array.from(byRegion.values())
    .map((v) => ({
      countryCode: v.countryCode,
      region: v.region,
      visitors: v.vis.size,
      pageviews: v.pv,
      conversions: v.conv,
    }))
    .sort((a, b) => b.visitors - a.visitors)

  const cities = Array.from(byCity.values())
    .map((v) => ({
      countryCode: v.countryCode,
      region: v.region,
      city: v.city,
      visitors: v.vis.size,
      pageviews: v.pv,
      conversions: v.conv,
    }))
    .sort((a, b) => b.visitors - a.visitors)

  return { countries, regions, cities }
}

// ─── Pages ──────────────────────────────────────────────────────────────────

export function buildPages(events: AnalyticsEvent[]): PagesReport {
  const byPath = new Map<
    string,
    {
      pv: number
      vis: Set<string>
      durations: number[]
      conv: number
    }
  >()

  // Per-session ordering so we can compute entry/exit pages + dwell time.
  const sessionOrder = new Map<string, AnalyticsEvent[]>()
  for (const e of events) {
    if (e.type !== "pageview") {
      if (e.type === "conversion") {
        const b = byPath.get(e.path)
        if (b) b.conv += 1
      }
      continue
    }
    let b = byPath.get(e.path)
    if (!b) {
      b = { pv: 0, vis: new Set(), durations: [], conv: 0 }
      byPath.set(e.path, b)
    }
    b.pv++
    b.vis.add(e.visitorId)

    let arr = sessionOrder.get(e.sessionId)
    if (!arr) {
      arr = []
      sessionOrder.set(e.sessionId, arr)
    }
    arr.push(e)
  }

  // Compute time-on-page from consecutive pageviews within a session.
  for (const arr of sessionOrder.values()) {
    arr.sort((a, b) => a.ts - b.ts)
    for (let i = 0; i < arr.length - 1; i++) {
      const dwell = arr[i + 1].ts - arr[i].ts
      if (dwell > 0 && dwell < 30 * 60 * 1000) {
        byPath.get(arr[i].path)?.durations.push(dwell / 1000)
      }
    }
  }

  const entrySessions = new Map<string, Set<string>>()
  const exitSessions = new Map<string, Set<string>>()
  for (const [sid, arr] of sessionOrder) {
    const first = arr[0]
    const last = arr[arr.length - 1]
    if (first) ensureSet(entrySessions, first.path).add(sid)
    if (last) ensureSet(exitSessions, last.path).add(sid)
  }

  const pages = Array.from(byPath.entries())
    .map(([path, b]) => ({
      path,
      pageviews: b.pv,
      visitors: b.vis.size,
      avgTimeOnPage:
        b.durations.length > 0
          ? b.durations.reduce((a, c) => a + c, 0) / b.durations.length
          : 0,
      conversions: b.conv,
    }))
    .sort((a, b) => b.pageviews - a.pageviews)

  const entryPages = Array.from(entrySessions.entries())
    .map(([path, set]) => ({ path, sessions: set.size }))
    .sort((a, b) => b.sessions - a.sessions)
    .slice(0, 30)

  const exitPages = Array.from(exitSessions.entries())
    .map(([path, set]) => ({ path, sessions: set.size }))
    .sort((a, b) => b.sessions - a.sessions)
    .slice(0, 30)

  return { pages, entryPages, exitPages }
}

// ─── Sources ────────────────────────────────────────────────────────────────

export function buildSources(events: AnalyticsEvent[]): SourcesReport {
  type Agg = {
    kind: SourceKind
    name: string
    vis: Set<string>
    ses: Set<string>
    pv: number
    conv: number
  }
  const bySource = new Map<string, Agg>()
  const byReferrer = new Map<string, { vis: Set<string>; ses: Set<string> }>()

  for (const e of events) {
    const key = `${e.source.kind}:${e.source.name}`
    let agg = bySource.get(key)
    if (!agg) {
      agg = {
        kind: e.source.kind,
        name: e.source.name,
        vis: new Set(),
        ses: new Set(),
        pv: 0,
        conv: 0,
      }
      bySource.set(key, agg)
    }
    agg.vis.add(e.visitorId)
    agg.ses.add(e.sessionId)
    if (e.type === "pageview") agg.pv++
    if (e.type === "conversion") agg.conv++

    if (e.source.kind === "referral" && e.source.name) {
      let r = byReferrer.get(e.source.name)
      if (!r) {
        r = { vis: new Set(), ses: new Set() }
        byReferrer.set(e.source.name, r)
      }
      r.vis.add(e.visitorId)
      r.ses.add(e.sessionId)
    }
  }

  return {
    bySource: Array.from(bySource.values())
      .map((v) => ({
        kind: v.kind,
        name: v.name,
        visitors: v.vis.size,
        sessions: v.ses.size,
        pageviews: v.pv,
        conversions: v.conv,
        conversionRate: v.vis.size > 0 ? v.conv / v.vis.size : 0,
      }))
      .sort((a, b) => b.visitors - a.visitors),
    referrers: Array.from(byReferrer.entries())
      .map(([hostname, v]) => ({
        hostname,
        visitors: v.vis.size,
        sessions: v.ses.size,
      }))
      .sort((a, b) => b.visitors - a.visitors)
      .slice(0, 30),
  }
}

// ─── Campaigns (UTM) ────────────────────────────────────────────────────────

export function buildCampaigns(events: AnalyticsEvent[]): CampaignsReport {
  type Agg = {
    source: string
    medium: string
    campaign: string
    vis: Set<string>
    ses: Set<string>
    conv: number
  }
  const campaigns = new Map<string, Agg>()
  const terms = new Map<
    string,
    { source: string; term: string; vis: Set<string>; conv: number }
  >()
  const contents = new Map<
    string,
    { source: string; content: string; vis: Set<string>; conv: number }
  >()

  for (const e of events) {
    const { utm } = e
    if (utm.campaign || utm.source || utm.medium) {
      const key = `${utm.source ?? "-"}::${utm.medium ?? "-"}::${utm.campaign ?? "-"}`
      let a = campaigns.get(key)
      if (!a) {
        a = {
          source: utm.source ?? "-",
          medium: utm.medium ?? "-",
          campaign: utm.campaign ?? "-",
          vis: new Set(),
          ses: new Set(),
          conv: 0,
        }
        campaigns.set(key, a)
      }
      a.vis.add(e.visitorId)
      a.ses.add(e.sessionId)
      if (e.type === "conversion") a.conv++
    }
    if (utm.term) {
      const key = `${utm.source ?? "-"}::${utm.term}`
      let t = terms.get(key)
      if (!t) {
        t = { source: utm.source ?? "-", term: utm.term, vis: new Set(), conv: 0 }
        terms.set(key, t)
      }
      t.vis.add(e.visitorId)
      if (e.type === "conversion") t.conv++
    }
    if (utm.content) {
      const key = `${utm.source ?? "-"}::${utm.content}`
      let c = contents.get(key)
      if (!c) {
        c = {
          source: utm.source ?? "-",
          content: utm.content,
          vis: new Set(),
          conv: 0,
        }
        contents.set(key, c)
      }
      c.vis.add(e.visitorId)
      if (e.type === "conversion") c.conv++
    }
  }

  return {
    campaigns: Array.from(campaigns.values())
      .map((a) => ({
        source: a.source,
        medium: a.medium,
        campaign: a.campaign,
        visitors: a.vis.size,
        sessions: a.ses.size,
        conversions: a.conv,
        conversionRate: a.vis.size > 0 ? a.conv / a.vis.size : 0,
      }))
      .sort((a, b) => b.visitors - a.visitors),
    terms: Array.from(terms.values())
      .map((t) => ({
        source: t.source,
        term: t.term,
        visitors: t.vis.size,
        conversions: t.conv,
        conversionRate: t.vis.size > 0 ? t.conv / t.vis.size : 0,
      }))
      .sort((a, b) => b.visitors - a.visitors)
      .slice(0, 50),
    contents: Array.from(contents.values())
      .map((c) => ({
        source: c.source,
        content: c.content,
        visitors: c.vis.size,
        conversions: c.conv,
      }))
      .sort((a, b) => b.visitors - a.visitors)
      .slice(0, 30),
  }
}

// ─── Conversions ──────���─────────────────────────────────────────────────────

export function buildConversions(events: AnalyticsEvent[]): ConversionsReport {
  const byEvent = new Map<
    string,
    { count: number; vis: Set<string>; users: Set<string> }
  >()
  const byCampaign = new Map<
    string,
    { source: string; medium: string; campaign: string; conversions: number }
  >()
  const recent: ConversionsReport["recent"] = []

  for (const e of events) {
    if (e.type !== "conversion") continue
    const name = e.name ?? "unnamed"
    let a = byEvent.get(name)
    if (!a) {
      a = { count: 0, vis: new Set(), users: new Set() }
      byEvent.set(name, a)
    }
    a.count++
    a.vis.add(e.visitorId)
    if (e.userId) a.users.add(e.userId)

    if (e.utm.campaign || e.utm.source) {
      const key = `${e.utm.source ?? "-"}::${e.utm.medium ?? "-"}::${e.utm.campaign ?? "-"}`
      let c = byCampaign.get(key)
      if (!c) {
        c = {
          source: e.utm.source ?? "-",
          medium: e.utm.medium ?? "-",
          campaign: e.utm.campaign ?? "-",
          conversions: 0,
        }
        byCampaign.set(key, c)
      }
      c.conversions++
    }

    recent.push({
      ts: e.ts,
      name: e.name,
      path: e.path,
      source: e.source,
      utm: e.utm,
      geo: e.geo,
      visitorId: e.visitorId,
      userId: e.userId,
      email: e.email,
      properties: e.properties,
    })
  }

  recent.sort((a, b) => b.ts - a.ts)

  return {
    byEvent: Array.from(byEvent.entries())
      .map(([name, a]) => ({
        name,
        count: a.count,
        uniqueVisitors: a.vis.size,
        uniqueUsers: a.users.size,
      }))
      .sort((a, b) => b.count - a.count),
    byCampaign: Array.from(byCampaign.values()).sort(
      (a, b) => b.conversions - a.conversions,
    ),
    recent: recent.slice(0, 50),
  }
}

// ─── Journey ────────────────────────────────────────────────────────────────

export function buildJourneyIndex(
  events: AnalyticsEvent[],
  visitors: Map<string, VisitorRecord>,
): JourneyReport {
  const lastByVisitor = new Map<
    string,
    {
      ts: number
      userId?: string
      email?: string
      events: number
      source?: AnalyticsEvent["source"]
      country?: string
      city?: string
    }
  >()
  const lastConversion = new Map<
    string,
    { name: string; ts: number; source?: AnalyticsEvent["source"]; userId?: string; email?: string; country?: string; city?: string }
  >()

  for (const e of events) {
    const cur = lastByVisitor.get(e.visitorId) ?? {
      ts: 0,
      events: 0,
      source: e.source,
    }
    cur.ts = Math.max(cur.ts, e.ts)
    cur.events++
    cur.userId = cur.userId ?? e.userId
    cur.email = cur.email ?? e.email
    cur.source = cur.source ?? e.source
    cur.country = cur.country ?? e.geo.country
    cur.city = cur.city ?? e.geo.city
    lastByVisitor.set(e.visitorId, cur)

    if (e.type === "conversion") {
      lastConversion.set(e.visitorId, {
        name: e.name ?? "unnamed",
        ts: e.ts,
        source: e.source,
        userId: e.userId,
        email: e.email,
        country: e.geo.country,
        city: e.geo.city,
      })
    }
  }

  const converted = Array.from(lastConversion.entries())
    .map(([vid, c]) => ({
      visitorId: vid,
      userId: c.userId,
      email: c.email,
      lastConversion: c.name,
      lastConversionTs: c.ts,
      source: c.source,
      country: c.country,
      city: c.city,
    }))
    .sort((a, b) => b.lastConversionTs - a.lastConversionTs)
    .slice(0, 50)

  const recent = Array.from(lastByVisitor.entries())
    .map(([vid, v]) => {
      const rec = visitors.get(vid)
      return {
        visitorId: vid,
        userId: v.userId ?? rec?.userId,
        email: v.email ?? rec?.email,
        lastSeen: v.ts,
        events: v.events,
        source: v.source ?? rec?.firstSource,
        country: v.country ?? rec?.firstCountry,
        city: v.city ?? rec?.firstCity,
      }
    })
    .sort((a, b) => b.lastSeen - a.lastSeen)
    .slice(0, 50)

  return { converted, recent }
}

/** Expand a single visitor's full cross-session journey. */
export function buildVisitorJourney(
  events: AnalyticsEvent[],
  visitor: VisitorRecord,
): VisitorJourney {
  const bySession = new Map<string, AnalyticsEvent[]>()
  for (const e of events) {
    let arr = bySession.get(e.sessionId)
    if (!arr) {
      arr = []
      bySession.set(e.sessionId, arr)
    }
    arr.push(e)
  }

  const sessions = Array.from(bySession.entries())
    .map(([sid, arr]) => {
      arr.sort((a, b) => a.ts - b.ts)
      const first = arr[0]
      const last = arr[arr.length - 1]
      const pageviews = arr.filter((e) => e.type === "pageview").length
      const evs = arr.filter((e) => e.type === "event" || e.type === "conversion").length
      return {
        sessionId: sid,
        start: first?.ts ?? 0,
        end: last?.ts ?? 0,
        pageviews,
        events: evs,
        source: first?.source,
        utm: first?.utm,
        steps: arr.map((e) => ({
          ts: e.ts,
          type: e.type,
          name: e.name,
          path: e.path,
          title: e.title,
          source: e.source,
          utm: e.utm,
          geo: e.geo,
        })),
      }
    })
    .sort((a, b) => b.start - a.start)

  return { visitor, sessions }
}
