/**
 * Shared types for the SMSLocal first-party analytics pipeline.
 *
 * Design notes
 * ────────────
 * - Everything flows through one event shape (`AnalyticsEvent`). A `pageview`,
 *   a custom `event`, and a `conversion` use the same record so the storage
 *   layer stays simple (one sorted set per hour, queried by time range).
 * - The client sends a slim "wire" payload (`TrackPayload`). The server
 *   enriches it with geo, UA classification, and IP-derived identifiers
 *   before persisting, so clients cannot lie about their country or IP.
 * - Source classification lives next to this file in `./parse.ts` to keep
 *   this module type-only and safe to import from anywhere.
 */

export type SourceKind =
  | "direct"
  | "organic_search"
  | "paid_search"
  | "paid_social"
  | "social"
  | "email"
  | "referral"
  | "internal"
  | "unknown"

export type DeviceKind = "desktop" | "mobile" | "tablet" | "bot"

export type EventType = "pageview" | "event" | "conversion"

export type UtmSet = {
  source?: string
  medium?: string
  campaign?: string
  term?: string
  content?: string
  /** Google Ads click id. When present, source is forced to paid_search. */
  gclid?: string
  /** Meta (Facebook/Instagram) click id. Forces paid_social. */
  fbclid?: string
  /** Microsoft Ads click id. Forces paid_search. */
  msclkid?: string
}

export type GeoInfo = {
  /** ISO-3166 alpha-2, uppercase. */
  countryCode?: string
  country?: string
  /** Sub-division / state name. In India this is the full state name. */
  region?: string
  city?: string
}

export type UaInfo = {
  browser?: string
  os?: string
  device?: DeviceKind
}

export type SourceInfo = {
  kind: SourceKind
  /** Canonical source name: "google", "facebook", "linkedin", "direct", etc. */
  name: string
}

/** The payload the browser sends to `/api/track`. Kept small. */
export type TrackPayload = {
  type: EventType
  /** Only required for `event` and `conversion` types. */
  name?: string
  /** Path including leading slash, excluding origin. */
  path: string
  /** Full document.title at the time of the event. */
  title?: string
  /** document.referrer as the browser reports it. */
  referrer?: string
  /** Current URL — the server re-parses UTMs from here to avoid client drift. */
  url?: string
  /** Anon visitor id, generated on first visit and persisted in localStorage. */
  visitorId: string
  /** Session id, rotated after 30 minutes of inactivity. */
  sessionId: string
  /**
   * Optional user identity. Set after the product app calls
   * `/api/track/identify` or the contact form posts an email.
   */
  userId?: string
  email?: string
  /** Arbitrary event properties — stored verbatim. Keys are lower-cased. */
  properties?: Record<string, string | number | boolean | null>
}

/** Fully-enriched event persisted in Redis. */
export type AnalyticsEvent = {
  /** Unix ms. Used as the sorted-set score and as the primary order key. */
  ts: number
  type: EventType
  name?: string
  path: string
  title?: string
  referrer?: string
  source: SourceInfo
  utm: UtmSet
  visitorId: string
  sessionId: string
  userId?: string
  email?: string
  geo: GeoInfo
  ua: UaInfo
  properties?: Record<string, string | number | boolean | null>
}

/**
 * Per-visitor identity record. The visitorId is the stable cross-session key;
 * when identify() runs, we attach user/email and merge older sessions.
 */
export type VisitorRecord = {
  visitorId: string
  userId?: string
  email?: string
  firstSeen: number
  lastSeen: number
  /** Total sessions — incremented when a new sessionId is seen. */
  sessions: number
  /** Total events (pageviews + events + conversions). */
  events: number
  /** Entry attribution — captured from the first pageview of the first session. */
  firstSource?: SourceInfo
  firstUtm?: UtmSet
  firstLanding?: string
  firstCountry?: string
  firstCity?: string
}

/** Supported human-readable ranges. */
export type RangeKey = "24h" | "7d" | "30d" | "90d"

export type ReportRange = {
  key: RangeKey
  /** Inclusive start timestamp (ms). */
  from: number
  /** Inclusive end timestamp (ms). */
  to: number
  /** Bucket granularity chosen automatically based on range width. */
  bucket: "hour" | "day"
}

export type TimeseriesPoint = {
  /** ISO string — the start of the bucket. */
  t: string
  pageviews: number
  visitors: number
  sessions: number
  conversions: number
}

export type OverviewReport = {
  totals: {
    pageviews: number
    visitors: number
    sessions: number
    conversions: number
    avgPagesPerSession: number
    bounceRate: number
  }
  series: TimeseriesPoint[]
  topPages: Array<{ path: string; pageviews: number; visitors: number }>
  topSources: Array<{ kind: SourceKind; name: string; visitors: number }>
  topCountries: Array<{ code: string; country: string; visitors: number }>
  recent: Array<
    Pick<
      AnalyticsEvent,
      "ts" | "type" | "name" | "path" | "source" | "geo" | "ua" | "visitorId" | "userId" | "email"
    >
  >
}

export type GeoReport = {
  countries: Array<{
    code: string
    country: string
    visitors: number
    sessions: number
    pageviews: number
    conversions: number
  }>
  regions: Array<{
    countryCode: string
    region: string
    visitors: number
    pageviews: number
    conversions: number
  }>
  cities: Array<{
    countryCode: string
    region: string
    city: string
    visitors: number
    pageviews: number
    conversions: number
  }>
}

export type PagesReport = {
  pages: Array<{
    path: string
    pageviews: number
    visitors: number
    avgTimeOnPage: number
    conversions: number
  }>
  entryPages: Array<{ path: string; sessions: number }>
  exitPages: Array<{ path: string; sessions: number }>
}

export type SourcesReport = {
  bySource: Array<{
    kind: SourceKind
    name: string
    visitors: number
    sessions: number
    pageviews: number
    conversions: number
    conversionRate: number
  }>
  referrers: Array<{ hostname: string; visitors: number; sessions: number }>
}

export type CampaignsReport = {
  campaigns: Array<{
    source: string
    medium: string
    campaign: string
    visitors: number
    sessions: number
    conversions: number
    conversionRate: number
  }>
  terms: Array<{
    source: string
    term: string
    visitors: number
    conversions: number
    conversionRate: number
  }>
  contents: Array<{
    source: string
    content: string
    visitors: number
    conversions: number
  }>
}

export type ConversionsReport = {
  byEvent: Array<{
    name: string
    count: number
    uniqueVisitors: number
    uniqueUsers: number
  }>
  recent: Array<
    Pick<
      AnalyticsEvent,
      | "ts"
      | "name"
      | "path"
      | "source"
      | "utm"
      | "geo"
      | "visitorId"
      | "userId"
      | "email"
      | "properties"
    >
  >
  byCampaign: Array<{
    source: string
    medium: string
    campaign: string
    conversions: number
  }>
}

export type JourneyStep = {
  ts: number
  type: EventType
  name?: string
  path: string
  title?: string
  source?: SourceInfo
  utm?: UtmSet
  geo?: GeoInfo
}

export type VisitorJourney = {
  visitor: VisitorRecord
  sessions: Array<{
    sessionId: string
    start: number
    end: number
    pageviews: number
    events: number
    source?: SourceInfo
    utm?: UtmSet
    steps: JourneyStep[]
  }>
}

export type JourneyReport = {
  /** Recent identified conversions with a direct link into their journey. */
  converted: Array<{
    visitorId: string
    userId?: string
    email?: string
    lastConversion: string
    lastConversionTs: number
    source?: SourceInfo
    country?: string
    city?: string
  }>
  /** Recently active visitors, identified or not. */
  recent: Array<{
    visitorId: string
    userId?: string
    email?: string
    lastSeen: number
    events: number
    source?: SourceInfo
    country?: string
    city?: string
  }>
}
