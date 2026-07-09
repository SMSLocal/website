"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import {
  Activity,
  FileText,
  Flag,
  Globe2,
  LogOut,
  Megaphone,
  Route,
  Target,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { BarRow } from "./bar-row"
import { RangePicker } from "./range-picker"
import { SourceBadge } from "./source-badge"
import { StatCard } from "./stat-card"
import { TimeseriesChart } from "./timeseries-chart"
import type {
  CampaignsReport,
  ConversionsReport,
  GeoReport,
  JourneyReport,
  OverviewReport,
  PagesReport,
  RangeKey,
  ReportRange,
  SourcesReport,
  VisitorJourney,
} from "@/lib/analytics/types"

type TabKey =
  | "overview"
  | "geo"
  | "pages"
  | "sources"
  | "campaigns"
  | "conversions"
  | "journeys"

const TABS: { key: TabKey; label: string; icon: typeof Activity }[] = [
  { key: "overview", label: "Overview", icon: Activity },
  { key: "geo", label: "Geography", icon: Globe2 },
  { key: "pages", label: "Pages", icon: FileText },
  { key: "sources", label: "Sources", icon: Flag },
  { key: "campaigns", label: "Campaigns", icon: Megaphone },
  { key: "conversions", label: "Conversions", icon: Target },
  { key: "journeys", label: "Customer journeys", icon: Users },
]

type ReportMap = {
  overview: OverviewReport
  geo: GeoReport
  pages: PagesReport
  sources: SourcesReport
  campaigns: CampaignsReport
  conversions: ConversionsReport
  journeys: JourneyReport
}

/**
 * Client shell for /dev/analytics. Reuses the same `seo_session` cookie, so a
 * single admin login unlocks both the SEO and the analytics consoles. Each
 * tab lazy-loads its own report from `/api/dev/analytics/query` and caches
 * the result keyed by `${tab}::${range}`.
 */
export function AnalyticsShell({
  username,
  storeReady,
}: {
  username: string
  storeReady: boolean
}) {
  const router = useRouter()
  const [active, setActive] = useState<TabKey>("overview")
  const [range, setRange] = useState<RangeKey>("7d")
  const [signingOut, setSigningOut] = useState(false)

  // Cache reports by `${tab}::${range}` so switching tabs is instant after
  // the first fetch.
  const [cache, setCache] = useState<
    Record<string, { data: unknown; resolvedRange: ReportRange }>
  >({})
  const [loading, setLoading] = useState<Record<TabKey, boolean>>({
    overview: false,
    geo: false,
    pages: false,
    sources: false,
    campaigns: false,
    conversions: false,
    journeys: false,
  })
  const [errors, setErrors] = useState<Partial<Record<TabKey, string>>>({})

  const cacheKey = `${active}::${range}`

  const load = useCallback(
    async (tab: TabKey, rangeKey: RangeKey) => {
      const key = `${tab}::${rangeKey}`
      setLoading((prev) => ({ ...prev, [tab]: true }))
      setErrors((prev) => ({ ...prev, [tab]: undefined }))
      try {
        const reportName = tab === "journeys" ? "journey" : tab
        const res = await fetch("/api/dev/analytics/query", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ report: reportName, range: rangeKey }),
        })
        if (!res.ok) {
          throw new Error(`request_failed_${res.status}`)
        }
        const json = (await res.json()) as {
          storeReady: boolean
          range: ReportRange
          data: unknown
          message?: string
        }
        if (!json.storeReady || !json.data) {
          setErrors((prev) => ({
            ...prev,
            [tab]:
              json.message ??
              "Upstash Redis is not connected; nothing to show yet.",
          }))
          return
        }
        setCache((prev) => ({
          ...prev,
          [key]: { data: json.data, resolvedRange: json.range },
        }))
      } catch (err) {
        setErrors((prev) => ({
          ...prev,
          [tab]: err instanceof Error ? err.message : "unknown_error",
        }))
      } finally {
        setLoading((prev) => ({ ...prev, [tab]: false }))
      }
    },
    [],
  )

  // Auto-load on tab or range change if we don't already have a cached result.
  useEffect(() => {
    if (!storeReady) return
    if (cache[cacheKey]) return
    load(active, range)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, range, storeReady])

  async function signOut() {
    setSigningOut(true)
    await fetch("/api/dev/seo/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "logout" }),
    })
    router.replace("/dev/seo/login?next=/dev/analytics")
    router.refresh()
  }

  const current = cache[cacheKey]?.data as ReportMap[TabKey] | undefined
  const resolvedRange = cache[cacheKey]?.resolvedRange

  return (
    <div className="min-h-screen bg-muted/20">
      <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              SMSLocal · Analytics
            </p>
            <h1 className="mt-1 text-xl font-semibold tracking-tight text-foreground">
              Traffic &amp; conversions
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <RangePicker
              value={range}
              onChange={setRange}
              disabled={!storeReady}
            />
            <div className="hidden text-right text-[12px] text-muted-foreground sm:block">
              Signed in as{" "}
              <span className="font-medium text-foreground">{username}</span>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={signOut}
              disabled={signingOut}
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
              Sign out
            </Button>
          </div>
        </div>

        {!storeReady ? (
          <div className="border-t border-amber-500/40 bg-amber-500/5 px-4 py-2 text-[12px] text-amber-900 dark:text-amber-200 sm:px-6">
            <strong className="font-semibold">Upstash Redis is not connected.</strong>{" "}
            Add the integration from the project settings and set{" "}
            <code className="rounded bg-amber-500/15 px-1">KV_REST_API_URL</code>{" "}
            +{" "}
            <code className="rounded bg-amber-500/15 px-1">
              KV_REST_API_TOKEN
            </code>
            . Tracking continues to fail open until then, so pageviews that
            happen now will not be recorded.
          </div>
        ) : null}

        <nav className="mx-auto max-w-[1400px] overflow-x-auto px-2 sm:px-4">
          <div className="flex gap-1">
            {TABS.map((t) => {
              const isActive = active === t.key
              const Icon = t.icon
              return (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setActive(t.key)}
                  className={`relative flex items-center gap-2 whitespace-nowrap rounded-t-lg px-4 py-2.5 text-[13px] font-medium transition ${
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {t.label}
                  {isActive ? (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-primary" />
                  ) : null}
                </button>
              )
            })}
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:py-8">
        {loading[active] && !current ? (
          <LoadingBlock />
        ) : errors[active] ? (
          <ErrorBlock message={errors[active]!} onRetry={() => load(active, range)} />
        ) : !current ? (
          <EmptyBlock storeReady={storeReady} />
        ) : (
          <>
            {active === "overview" ? (
              <OverviewPanel
                data={current as OverviewReport}
                bucket={resolvedRange?.bucket ?? "day"}
              />
            ) : null}
            {active === "geo" ? <GeoPanel data={current as GeoReport} /> : null}
            {active === "pages" ? (
              <PagesPanel data={current as PagesReport} />
            ) : null}
            {active === "sources" ? (
              <SourcesPanel data={current as SourcesReport} />
            ) : null}
            {active === "campaigns" ? (
              <CampaignsPanel data={current as CampaignsReport} />
            ) : null}
            {active === "conversions" ? (
              <ConversionsPanel data={current as ConversionsReport} />
            ) : null}
            {active === "journeys" ? (
              <JourneysPanel
                data={current as JourneyReport}
                range={range}
              />
            ) : null}
          </>
        )}
      </main>
    </div>
  )
}

// ───────────────────────────────────────────────────────────────────────────
// Common blocks
// ───────────────────────────────────────────────────────────────────────────

function LoadingBlock() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="h-24 animate-pulse rounded-xl border border-border bg-card"
        />
      ))}
      <div className="col-span-full h-64 animate-pulse rounded-xl border border-border bg-card" />
    </div>
  )
}

function ErrorBlock({
  message,
  onRetry,
}: {
  message: string
  onRetry: () => void
}) {
  return (
    <div className="rounded-xl border border-destructive/40 bg-destructive/5 p-6 text-[13px] text-destructive">
      <div className="font-semibold">Could not load report</div>
      <p className="mt-1 text-destructive/80">{message}</p>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="mt-3"
        onClick={onRetry}
      >
        Try again
      </Button>
    </div>
  )
}

function EmptyBlock({ storeReady }: { storeReady: boolean }) {
  return (
    <div className="rounded-xl border border-border bg-card p-8 text-center">
      <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-muted">
        <Activity className="h-5 w-5 text-muted-foreground" />
      </div>
      <h2 className="mt-4 text-[15px] font-semibold text-foreground">
        No data yet for this range
      </h2>
      <p className="mx-auto mt-2 max-w-md text-[13px] text-muted-foreground">
        {storeReady
          ? "Pageviews will appear within seconds of the first visit. If you just enabled analytics, visit the homepage in another tab and reload."
          : "Connect Upstash Redis from the project settings to begin collecting traffic data."}
      </p>
    </div>
  )
}

// ───────────────────────────────────────────────────────────────────────────
// Overview
// ───────────────────────────────────────────────────────────────────────────

function OverviewPanel({
  data,
  bucket,
}: {
  data: OverviewReport
  bucket: "hour" | "day"
}) {
  const maxPageview = Math.max(1, ...data.topPages.map((p) => p.pageviews))
  const maxSourceVisitors = Math.max(1, ...data.topSources.map((s) => s.visitors))
  const maxCountryVisitors = Math.max(
    1,
    ...data.topCountries.map((c) => c.visitors),
  )
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Visitors"
          value={data.totals.visitors}
          sub="Unique visitors"
        />
        <StatCard
          label="Pageviews"
          value={data.totals.pageviews}
          tone="primary"
        />
        <StatCard
          label="Sessions"
          value={data.totals.sessions}
          sub={`${data.totals.avgPagesPerSession.toFixed(1)} pages / session`}
        />
        <StatCard
          label="Conversions"
          value={data.totals.conversions}
          sub={`Bounce rate ${(data.totals.bounceRate * 100).toFixed(0)}%`}
          tone="success"
        />
      </div>

      <section className="rounded-xl border border-border bg-card p-4">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-[14px] font-semibold">Traffic over time</h2>
          <span className="text-[11px] text-muted-foreground">
            Bucket: {bucket === "hour" ? "hourly" : "daily"}
          </span>
        </div>
        <TimeseriesChart data={data.series} bucket={bucket} />
      </section>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card title="Top pages" empty={data.topPages.length === 0}>
          {data.topPages.map((p) => (
            <BarRow
              key={p.path}
              label={p.path}
              rightMeta={`${p.visitors.toLocaleString()} vis`}
              value={p.pageviews}
              max={maxPageview}
            />
          ))}
        </Card>
        <Card title="Top traffic sources" empty={data.topSources.length === 0}>
          {data.topSources.map((s) => (
            <BarRow
              key={`${s.kind}:${s.name}`}
              label={s.name === "direct" ? "Direct / none" : s.name}
              sublabel={s.kind.replace("_", " ")}
              value={s.visitors}
              max={maxSourceVisitors}
            />
          ))}
        </Card>
        <Card title="Top countries" empty={data.topCountries.length === 0}>
          {data.topCountries.map((c) => (
            <BarRow
              key={c.code}
              label={c.country}
              sublabel={c.code}
              value={c.visitors}
              max={maxCountryVisitors}
            />
          ))}
        </Card>
      </div>

      <Card title="Recent activity" empty={data.recent.length === 0}>
        <ul className="divide-y divide-border">
          {data.recent.map((r, i) => (
            <li
              key={`${r.ts}-${i}`}
              className="flex flex-wrap items-center gap-3 px-2 py-2.5 text-[12.5px]"
            >
              <span className="tabular-nums text-muted-foreground">
                {formatTime(r.ts)}
              </span>
              <TypePill type={r.type} name={r.name} />
              <span className="truncate font-medium text-foreground">
                {r.path}
              </span>
              <SourceBadge kind={r.source.kind} name={r.source.name} />
              {r.geo.country ? (
                <span className="text-muted-foreground">
                  {r.geo.city ? `${r.geo.city}, ` : ""}
                  {r.geo.country}
                </span>
              ) : null}
              {r.email ? (
                <span className="ml-auto rounded-md bg-primary/10 px-1.5 py-0.5 font-mono text-[11px] text-primary">
                  {r.email}
                </span>
              ) : null}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}

// ───────────────────────────────────────────────────────────────────────────
// Geography
// ───────────────────────────────────────────────────────────────────────────

function GeoPanel({ data }: { data: GeoReport }) {
  const [focusCountry, setFocusCountry] = useState<string | null>(
    data.countries[0]?.code ?? null,
  )
  const [focusRegion, setFocusRegion] = useState<string | null>(null)

  // Reset region when country changes.
  useEffect(() => {
    setFocusRegion(null)
  }, [focusCountry])

  const maxCountry = Math.max(1, ...data.countries.map((c) => c.visitors))
  const regionsForCountry = useMemo(
    () =>
      data.regions
        .filter((r) => r.countryCode === focusCountry)
        .sort((a, b) => b.visitors - a.visitors),
    [data.regions, focusCountry],
  )
  const maxRegion = Math.max(1, ...regionsForCountry.map((r) => r.visitors))
  const citiesForRegion = useMemo(
    () =>
      data.cities
        .filter(
          (c) =>
            c.countryCode === focusCountry &&
            (focusRegion == null || c.region === focusRegion),
        )
        .sort((a, b) => b.visitors - a.visitors)
        .slice(0, 50),
    [data.cities, focusCountry, focusRegion],
  )
  const maxCity = Math.max(1, ...citiesForRegion.map((c) => c.visitors))

  return (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-3">
        <Card title="Countries" empty={data.countries.length === 0}>
          {data.countries.slice(0, 30).map((c) => (
            <BarRow
              key={c.code}
              label={c.country}
              sublabel={`${c.code} · ${c.pageviews.toLocaleString()} pv · ${c.conversions.toLocaleString()} conv`}
              value={c.visitors}
              max={maxCountry}
              onClick={() => setFocusCountry(c.code)}
              active={focusCountry === c.code}
            />
          ))}
        </Card>
        <Card
          title={focusCountry ? `States / regions (${focusCountry})` : "States / regions"}
          empty={regionsForCountry.length === 0}
        >
          {regionsForCountry.slice(0, 30).map((r) => (
            <BarRow
              key={`${r.countryCode}-${r.region}`}
              label={r.region}
              sublabel={`${r.pageviews.toLocaleString()} pv · ${r.conversions.toLocaleString()} conv`}
              value={r.visitors}
              max={maxRegion}
              onClick={() => setFocusRegion(r.region)}
              active={focusRegion === r.region}
            />
          ))}
        </Card>
        <Card
          title={
            focusRegion
              ? `Cities (${focusRegion})`
              : focusCountry
                ? `Cities (${focusCountry})`
                : "Cities"
          }
          empty={citiesForRegion.length === 0}
        >
          {citiesForRegion.map((c) => (
            <BarRow
              key={`${c.countryCode}-${c.region}-${c.city}`}
              label={c.city}
              sublabel={`${c.region} · ${c.pageviews.toLocaleString()} pv · ${c.conversions.toLocaleString()} conv`}
              value={c.visitors}
              max={maxCity}
            />
          ))}
        </Card>
      </div>
    </div>
  )
}

// ───────────────────────────────────────────────────────────────────────────
// Pages
// ───────────────────────────────────────────────────────────────────────────

function PagesPanel({ data }: { data: PagesReport }) {
  const maxPv = Math.max(1, ...data.pages.map((p) => p.pageviews))
  const maxEntry = Math.max(1, ...data.entryPages.map((p) => p.sessions))
  const maxExit = Math.max(1, ...data.exitPages.map((p) => p.sessions))
  return (
    <div className="space-y-6">
      <Card title="All pages" empty={data.pages.length === 0}>
        <div className="grid grid-cols-12 gap-4 border-b border-border px-2 pb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          <div className="col-span-5">Path</div>
          <div className="col-span-2 text-right">Pageviews</div>
          <div className="col-span-2 text-right">Visitors</div>
          <div className="col-span-2 text-right">Avg time</div>
          <div className="col-span-1 text-right">Conv</div>
        </div>
        <ul className="divide-y divide-border">
          {data.pages.slice(0, 100).map((p) => (
            <li
              key={p.path}
              className="grid grid-cols-12 items-center gap-4 px-2 py-2 text-[12.5px]"
            >
              <div className="col-span-5 truncate font-medium text-foreground">
                {p.path}
                <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full bg-primary/70"
                    style={{
                      width: `${Math.max(2, (p.pageviews / maxPv) * 100)}%`,
                    }}
                  />
                </div>
              </div>
              <div className="col-span-2 text-right tabular-nums">
                {p.pageviews.toLocaleString()}
              </div>
              <div className="col-span-2 text-right tabular-nums text-muted-foreground">
                {p.visitors.toLocaleString()}
              </div>
              <div className="col-span-2 text-right tabular-nums text-muted-foreground">
                {formatDuration(p.avgTimeOnPage)}
              </div>
              <div className="col-span-1 text-right tabular-nums">
                {p.conversions.toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card title="Entry pages (landing)" empty={data.entryPages.length === 0}>
          {data.entryPages.slice(0, 20).map((p) => (
            <BarRow
              key={p.path}
              label={p.path}
              value={p.sessions}
              max={maxEntry}
              rightMeta="sessions"
            />
          ))}
        </Card>
        <Card title="Exit pages" empty={data.exitPages.length === 0}>
          {data.exitPages.slice(0, 20).map((p) => (
            <BarRow
              key={p.path}
              label={p.path}
              value={p.sessions}
              max={maxExit}
              rightMeta="sessions"
            />
          ))}
        </Card>
      </div>
    </div>
  )
}

// ───────────────────────────────────────────────────────────────────────────
// Sources
// ───────────────────────────────────────────────────────────────────────────

function SourcesPanel({ data }: { data: SourcesReport }) {
  const maxSourceVisitors = Math.max(1, ...data.bySource.map((s) => s.visitors))
  const maxReferrer = Math.max(
    1,
    ...data.referrers.map((r) => r.visitors),
  )
  // Pre-group by kind so users can scan "organic", "paid", "social" at once.
  const grouped = useMemo(() => {
    const map = new Map<string, typeof data.bySource>()
    for (const s of data.bySource) {
      let arr = map.get(s.kind)
      if (!arr) {
        arr = []
        map.set(s.kind, arr)
      }
      arr.push(s)
    }
    return Array.from(map.entries()).map(([kind, rows]) => ({
      kind,
      rows: rows.sort((a, b) => b.visitors - a.visitors),
      visitors: rows.reduce((a, c) => a + c.visitors, 0),
      conversions: rows.reduce((a, c) => a + c.conversions, 0),
    }))
  }, [data.bySource])
  const totalVisitors = grouped.reduce((a, g) => a + g.visitors, 0)

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {grouped.slice(0, 4).map((g) => (
          <StatCard
            key={g.kind}
            label={g.kind.replace("_", " ")}
            value={g.visitors}
            sub={
              totalVisitors > 0
                ? `${((g.visitors / totalVisitors) * 100).toFixed(1)}% of traffic · ${g.conversions} conv`
                : undefined
            }
          />
        ))}
      </div>

      <Card title="All sources" empty={data.bySource.length === 0}>
        <div className="grid grid-cols-12 gap-4 border-b border-border px-2 pb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          <div className="col-span-4">Source</div>
          <div className="col-span-2">Channel</div>
          <div className="col-span-2 text-right">Visitors</div>
          <div className="col-span-1 text-right">Sessions</div>
          <div className="col-span-1 text-right">PV</div>
          <div className="col-span-1 text-right">Conv</div>
          <div className="col-span-1 text-right">CR</div>
        </div>
        <ul className="divide-y divide-border">
          {data.bySource.map((s) => (
            <li
              key={`${s.kind}:${s.name}`}
              className="grid grid-cols-12 items-center gap-4 px-2 py-2 text-[12.5px]"
            >
              <div className="col-span-4 truncate font-medium text-foreground">
                {s.name === "direct" ? "Direct / none" : s.name}
                <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full bg-primary/70"
                    style={{
                      width: `${Math.max(2, (s.visitors / maxSourceVisitors) * 100)}%`,
                    }}
                  />
                </div>
              </div>
              <div className="col-span-2">
                <SourceBadge kind={s.kind} />
              </div>
              <div className="col-span-2 text-right tabular-nums">
                {s.visitors.toLocaleString()}
              </div>
              <div className="col-span-1 text-right tabular-nums text-muted-foreground">
                {s.sessions.toLocaleString()}
              </div>
              <div className="col-span-1 text-right tabular-nums text-muted-foreground">
                {s.pageviews.toLocaleString()}
              </div>
              <div className="col-span-1 text-right tabular-nums">
                {s.conversions.toLocaleString()}
              </div>
              <div className="col-span-1 text-right tabular-nums text-muted-foreground">
                {(s.conversionRate * 100).toFixed(1)}%
              </div>
            </li>
          ))}
        </ul>
      </Card>

      <Card title="Referring sites" empty={data.referrers.length === 0}>
        {data.referrers.map((r) => (
          <BarRow
            key={r.hostname}
            label={r.hostname}
            sublabel={`${r.sessions.toLocaleString()} sessions`}
            value={r.visitors}
            max={maxReferrer}
          />
        ))}
      </Card>
    </div>
  )
}

// ───────────────────────────────────────────────────────────────────────────
// Campaigns (UTM)
// ───────────────────────────────────────────────────────────────────────────

function CampaignsPanel({ data }: { data: CampaignsReport }) {
  const maxVisitors = Math.max(1, ...data.campaigns.map((c) => c.visitors))
  const maxTerm = Math.max(1, ...data.terms.map((t) => t.visitors))
  return (
    <div className="space-y-6">
      <Card title="Campaigns" empty={data.campaigns.length === 0}>
        <div className="grid grid-cols-12 gap-4 border-b border-border px-2 pb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          <div className="col-span-3">Source</div>
          <div className="col-span-2">Medium</div>
          <div className="col-span-3">Campaign</div>
          <div className="col-span-1 text-right">Visitors</div>
          <div className="col-span-1 text-right">Sessions</div>
          <div className="col-span-1 text-right">Conv</div>
          <div className="col-span-1 text-right">CR</div>
        </div>
        <ul className="divide-y divide-border">
          {data.campaigns.map((c) => (
            <li
              key={`${c.source}::${c.medium}::${c.campaign}`}
              className="grid grid-cols-12 items-center gap-4 px-2 py-2 text-[12.5px]"
            >
              <div className="col-span-3 truncate font-medium text-foreground">
                {c.source}
                <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full bg-primary/70"
                    style={{
                      width: `${Math.max(2, (c.visitors / maxVisitors) * 100)}%`,
                    }}
                  />
                </div>
              </div>
              <div className="col-span-2 truncate text-muted-foreground">
                {c.medium}
              </div>
              <div className="col-span-3 truncate">{c.campaign}</div>
              <div className="col-span-1 text-right tabular-nums">
                {c.visitors.toLocaleString()}
              </div>
              <div className="col-span-1 text-right tabular-nums text-muted-foreground">
                {c.sessions.toLocaleString()}
              </div>
              <div className="col-span-1 text-right tabular-nums">
                {c.conversions.toLocaleString()}
              </div>
              <div className="col-span-1 text-right tabular-nums text-muted-foreground">
                {(c.conversionRate * 100).toFixed(1)}%
              </div>
            </li>
          ))}
        </ul>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card
          title="Paid keywords (utm_term)"
          empty={data.terms.length === 0}
          footnote="Google Ads populates utm_term with the keyword when you use {keyword} in the final URL."
        >
          {data.terms.slice(0, 30).map((t) => (
            <BarRow
              key={`${t.source}::${t.term}`}
              label={t.term}
              sublabel={`${t.source} · CR ${(t.conversionRate * 100).toFixed(1)}%`}
              value={t.visitors}
              max={maxTerm}
              rightMeta={`${t.conversions} conv`}
            />
          ))}
        </Card>
        <Card title="Ad creatives (utm_content)" empty={data.contents.length === 0}>
          {data.contents.slice(0, 30).map((c) => (
            <BarRow
              key={`${c.source}::${c.content}`}
              label={c.content}
              sublabel={c.source}
              value={c.visitors}
              max={Math.max(1, ...data.contents.map((x) => x.visitors))}
              rightMeta={`${c.conversions} conv`}
            />
          ))}
        </Card>
      </div>
    </div>
  )
}

// ───────────────────────────────────────────────────────────────────────────
// Conversions
// ───────────────────────────────────────────────────────────────────────────

function ConversionsPanel({ data }: { data: ConversionsReport }) {
  const maxEvent = Math.max(1, ...data.byEvent.map((e) => e.count))
  return (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-2">
        <Card title="Conversions by event" empty={data.byEvent.length === 0}>
          {data.byEvent.map((e) => (
            <BarRow
              key={e.name}
              label={e.name}
              sublabel={`${e.uniqueVisitors.toLocaleString()} unique visitors · ${e.uniqueUsers.toLocaleString()} identified`}
              value={e.count}
              max={maxEvent}
              rightMeta="total"
            />
          ))}
        </Card>
        <Card title="Converting campaigns" empty={data.byCampaign.length === 0}>
          <ul className="divide-y divide-border">
            {data.byCampaign.map((c, i) => (
              <li
                key={`${c.source}-${c.medium}-${c.campaign}-${i}`}
                className="flex items-center justify-between gap-4 px-2 py-2 text-[12.5px]"
              >
                <div className="min-w-0">
                  <div className="truncate font-medium">{c.campaign}</div>
                  <div className="truncate text-[11.5px] text-muted-foreground">
                    {c.source} · {c.medium}
                  </div>
                </div>
                <span className="tabular-nums font-semibold">{c.conversions}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card title="Recent conversions" empty={data.recent.length === 0}>
        <ul className="divide-y divide-border">
          {data.recent.map((c, i) => (
            <li
              key={`${c.ts}-${i}`}
              className="flex flex-wrap items-center gap-3 px-2 py-2.5 text-[12.5px]"
            >
              <span className="tabular-nums text-muted-foreground">
                {formatTime(c.ts)}
              </span>
              <span className="rounded-md bg-emerald-500/10 px-1.5 py-0.5 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                {c.name ?? "conversion"}
              </span>
              <span className="truncate font-medium text-foreground">
                {c.path}
              </span>
              <SourceBadge kind={c.source.kind} name={c.source.name} />
              {c.utm.campaign ? (
                <span className="rounded-md border border-border px-1.5 py-0.5 text-[11px]">
                  {c.utm.campaign}
                </span>
              ) : null}
              {c.geo.country ? (
                <span className="text-muted-foreground">
                  {c.geo.city ? `${c.geo.city}, ` : ""}
                  {c.geo.country}
                </span>
              ) : null}
              <span className="ml-auto font-mono text-[11px] text-muted-foreground">
                {c.email ?? c.userId ?? c.visitorId.slice(0, 10)}
              </span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}

// ───────────────────────────────────────────────────────────────────────────
// Customer journeys
// ───────────────────────────────────────────────────────────────────────────

function JourneysPanel({
  data,
  range,
}: {
  data: JourneyReport
  range: RangeKey
}) {
  const [visitorId, setVisitorId] = useState<string | null>(null)
  const [journey, setJourney] = useState<VisitorJourney | null>(null)
  const [journeyLoading, setJourneyLoading] = useState(false)

  useEffect(() => {
    if (!visitorId) return
    let cancelled = false
    setJourneyLoading(true)
    setJourney(null)
    fetch("/api/dev/analytics/query", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ report: "visitor", range, visitorId }),
    })
      .then((r) => r.json())
      .then((json) => {
        if (cancelled) return
        if (json.data) setJourney(json.data)
      })
      .finally(() => {
        if (!cancelled) setJourneyLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [visitorId, range])

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
      <div className="space-y-6">
        <Card title="Converted visitors" empty={data.converted.length === 0}>
          <ul className="divide-y divide-border">
            {data.converted.map((c) => (
              <li key={c.visitorId}>
                <button
                  type="button"
                  onClick={() => setVisitorId(c.visitorId)}
                  className={`flex w-full items-center justify-between gap-3 px-2 py-2 text-left text-[12.5px] transition hover:bg-muted/60 ${
                    visitorId === c.visitorId ? "bg-muted/80" : ""
                  }`}
                >
                  <div className="min-w-0">
                    <div className="truncate font-medium text-foreground">
                      {c.email ?? c.userId ?? c.visitorId.slice(0, 12)}
                    </div>
                    <div className="mt-0.5 flex flex-wrap items-center gap-2 text-muted-foreground">
                      <span>{c.lastConversion}</span>
                      {c.source ? (
                        <SourceBadge kind={c.source.kind} name={c.source.name} />
                      ) : null}
                      {c.country ? (
                        <span>
                          {c.city ? `${c.city}, ` : ""}
                          {c.country}
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <span className="tabular-nums text-muted-foreground">
                    {formatRelativeTime(c.lastConversionTs)}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Recent visitors" empty={data.recent.length === 0}>
          <ul className="divide-y divide-border">
            {data.recent.slice(0, 30).map((v) => (
              <li key={v.visitorId}>
                <button
                  type="button"
                  onClick={() => setVisitorId(v.visitorId)}
                  className={`flex w-full items-center justify-between gap-3 px-2 py-2 text-left text-[12.5px] transition hover:bg-muted/60 ${
                    visitorId === v.visitorId ? "bg-muted/80" : ""
                  }`}
                >
                  <div className="min-w-0">
                    <div className="truncate font-medium">
                      {v.email ?? v.userId ?? v.visitorId.slice(0, 12)}
                    </div>
                    <div className="mt-0.5 flex flex-wrap items-center gap-2 text-muted-foreground">
                      {v.source ? (
                        <SourceBadge kind={v.source.kind} name={v.source.name} />
                      ) : null}
                      <span>{v.events} events</span>
                      {v.country ? (
                        <span>
                          {v.city ? `${v.city}, ` : ""}
                          {v.country}
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <span className="tabular-nums text-muted-foreground">
                    {formatRelativeTime(v.lastSeen)}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div>
        <Card
          title={
            visitorId
              ? `Journey · ${visitorId.slice(0, 12)}…`
              : "Select a visitor"
          }
        >
          {!visitorId ? (
            <div className="flex flex-col items-center justify-center px-4 py-12 text-center">
              <Route className="h-6 w-6 text-muted-foreground" />
              <p className="mt-3 text-[13px] text-muted-foreground">
                Click any visitor on the left to see every page they viewed,
                every session, the original source, UTM parameters and the
                conversion event that closed the loop.
              </p>
            </div>
          ) : journeyLoading ? (
            <div className="h-64 animate-pulse rounded-lg bg-muted" />
          ) : !journey ? (
            <div className="px-2 py-6 text-center text-[13px] text-muted-foreground">
              No data found for this visitor in the current range.
            </div>
          ) : (
            <VisitorJourneyView journey={journey} />
          )}
        </Card>
      </div>
    </div>
  )
}

function VisitorJourneyView({ journey }: { journey: VisitorJourney }) {
  const { visitor, sessions } = journey
  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-border bg-muted/30 p-3 text-[12.5px]">
        <div className="flex flex-wrap items-center gap-3">
          <div>
            <div className="font-semibold">
              {visitor.email ?? visitor.userId ?? visitor.visitorId.slice(0, 16)}
            </div>
            <div className="mt-0.5 text-[11.5px] text-muted-foreground">
              First seen {formatTime(visitor.firstSeen)} · Last seen{" "}
              {formatTime(visitor.lastSeen)}
            </div>
          </div>
          <div className="ml-auto flex items-center gap-4 text-[11.5px] text-muted-foreground">
            <span>{sessions.length} sessions</span>
            <span>{visitor.events} events</span>
            {visitor.firstSource ? (
              <SourceBadge
                kind={visitor.firstSource.kind}
                name={visitor.firstSource.name}
              />
            ) : null}
          </div>
        </div>
        {visitor.firstLanding ? (
          <div className="mt-2 text-[11.5px] text-muted-foreground">
            Landed on{" "}
            <code className="rounded bg-muted px-1">{visitor.firstLanding}</code>
            {visitor.firstCity || visitor.firstCountry ? (
              <>
                {" "}from{" "}
                <span className="text-foreground">
                  {visitor.firstCity ? `${visitor.firstCity}, ` : ""}
                  {visitor.firstCountry ?? ""}
                </span>
              </>
            ) : null}
          </div>
        ) : null}
      </div>

      <ol className="space-y-4">
        {sessions.map((s, idx) => (
          <li
            key={s.sessionId}
            className="rounded-lg border border-border bg-card p-3"
          >
            <div className="flex flex-wrap items-center gap-3 border-b border-border pb-2 text-[11.5px]">
              <span className="font-semibold text-foreground">
                Session {sessions.length - idx}
              </span>
              <span className="text-muted-foreground">
                {formatTime(s.start)} → {formatTime(s.end)}
              </span>
              <span className="text-muted-foreground">
                {s.pageviews} pv · {s.events} events
              </span>
              {s.source ? (
                <SourceBadge kind={s.source.kind} name={s.source.name} />
              ) : null}
              {s.utm?.campaign ? (
                <span className="rounded-md border border-border px-1.5 py-0.5 font-mono">
                  {s.utm.campaign}
                </span>
              ) : null}
            </div>
            <ol className="mt-2 space-y-1">
              {s.steps.map((step, i) => (
                <li
                  key={`${step.ts}-${i}`}
                  className="flex items-center gap-3 text-[12px]"
                >
                  <span className="w-20 shrink-0 tabular-nums text-muted-foreground">
                    {formatTime(step.ts, "time")}
                  </span>
                  <TypePill type={step.type} name={step.name} />
                  <span className="truncate">{step.path}</span>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
    </div>
  )
}

// ───────────────────────────────────────────────────────────────────────────
// Small pieces
// ───────────────────────────────────────────────────────────────────────────

function Card({
  title,
  children,
  empty = false,
  footnote,
}: {
  title: string
  children?: React.ReactNode
  empty?: boolean
  footnote?: string
}) {
  return (
    <section className="rounded-xl border border-border bg-card p-4">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-[14px] font-semibold">{title}</h2>
      </div>
      {empty ? (
        <div className="rounded-md border border-dashed border-border px-3 py-6 text-center text-[12.5px] text-muted-foreground">
          No data.
        </div>
      ) : (
        <div>{children}</div>
      )}
      {footnote ? (
        <p className="mt-3 text-[11px] text-muted-foreground">{footnote}</p>
      ) : null}
    </section>
  )
}

function TypePill({
  type,
  name,
}: {
  type: "pageview" | "event" | "conversion"
  name?: string
}) {
  if (type === "pageview") {
    return (
      <span className="rounded-md bg-muted px-1.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        view
      </span>
    )
  }
  if (type === "conversion") {
    return (
      <span className="rounded-md bg-emerald-500/10 px-1.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
        {name ?? "conv"}
      </span>
    )
  }
  return (
    <span className="rounded-md bg-primary/10 px-1.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-primary">
      {name ?? "event"}
    </span>
  )
}

function formatTime(ts: number, mode: "datetime" | "time" = "datetime") {
  const d = new Date(ts)
  if (mode === "time") {
    return d.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })
  }
  return d.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
}

function formatRelativeTime(ts: number) {
  const diff = Date.now() - ts
  const s = Math.max(0, Math.floor(diff / 1000))
  if (s < 60) return `${s}s ago`
  const m = Math.floor(s / 60)
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 48) return `${h}h ago`
  const d = Math.floor(h / 24)
  return `${d}d ago`
}

function formatDuration(seconds: number) {
  if (!seconds || !Number.isFinite(seconds)) return "—"
  if (seconds < 60) return `${Math.round(seconds)}s`
  const m = Math.floor(seconds / 60)
  const s = Math.round(seconds - m * 60)
  return `${m}m ${s}s`
}
