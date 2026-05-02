import type { Metadata } from "next"
import { AdminShell } from "@/components/dev-seo/admin-shell"
import { requireSession } from "@/lib/seo/auth"
import { absoluteUrl } from "@/lib/seo/config"
import { getEffectiveEntries, type EffectiveEntry } from "@/lib/seo/overrides"
import { getSettings, isStoreConfigured } from "@/lib/seo/store"
import { runTechnicalAudit } from "@/lib/seo/technical-audit"

const PAGESPEED_SAMPLE_SIZE = 15

/**
 * Pick a curated subset of indexable paths — one per top-level template,
 * shortest path wins so /pricing beats /pricing/promo. The PageSpeed tab
 * audits this representative slice so the operator can spot regressions
 * across templates without burning a full-site quota every refresh.
 */
function pickRepresentativePaths(
  entries: EffectiveEntry[],
  count: number,
): EffectiveEntry[] {
  const indexable = entries.filter((e) => !e.noindex)
  const byGroup = new Map<string, EffectiveEntry[]>()
  for (const e of indexable) {
    const seg = e.path.split("/")[1] ?? ""
    const key = seg || "_root"
    const list = byGroup.get(key)
    if (list) list.push(e)
    else byGroup.set(key, [e])
  }
  // Sort each group by path length, then alphabetically — keeps the chosen
  // representative the simplest URL (e.g. /products over /products/rcs/…).
  for (const list of byGroup.values()) {
    list.sort((a, b) => a.path.length - b.path.length || a.path.localeCompare(b.path))
  }
  const groups = Array.from(byGroup.entries()).sort(([a], [b]) => {
    if (a === "_root") return -1
    if (b === "_root") return 1
    return a.localeCompare(b)
  })
  const picked: EffectiveEntry[] = []
  const seen = new Set<string>()
  for (const [, list] of groups) {
    if (picked.length >= count) break
    const first = list[0]
    if (first && !seen.has(first.path)) {
      picked.push(first)
      seen.add(first.path)
    }
  }
  // Top-up: if we still have headroom, add the next-shortest paths from any
  // group so we hit `count` even on small sites.
  if (picked.length < count) {
    const rest = indexable.filter((e) => !seen.has(e.path))
    rest.sort((a, b) => a.path.length - b.path.length || a.path.localeCompare(b.path))
    for (const e of rest) {
      if (picked.length >= count) break
      picked.push(e)
      seen.add(e.path)
    }
  }
  return picked
}

/**
 * /dev/seo — SEO Admin Console.
 *
 * Protected by JWT session; unauthenticated users are redirected to
 * /dev/seo/login. Loads every page on the site, plus the live Redis
 * overrides, and hands off to a client-side shell with five tabs:
 *   1. Overview   — counts, score distribution, recent edits
 *   2. Pages      — table with pagination, search, filters, edit drawer
 *   3. Sitemap    — include/exclude, priority, changefreq, XML + ping
 *   4. Settings   — site-wide robots / noindex / verification tokens
 *   5. Technical  — static H1/alt/link audit from the app/ source tree
 */

export const metadata: Metadata = {
  title: "SEO Admin Console",
  robots: { index: false, follow: false, nocache: true },
}

export const dynamic = "force-dynamic"

export default async function DevSeoPage() {
  const session = await requireSession()
  const storeReady = isStoreConfigured()

  const [entries, settings, technical] = await Promise.all([
    getEffectiveEntries().catch(() => []),
    getSettings().catch(() => ({})),
    runTechnicalAudit(process.cwd()),
  ])

  const pageSpeedPages = pickRepresentativePaths(entries, PAGESPEED_SAMPLE_SIZE).map(
    (e) => ({
      path: e.path,
      url: absoluteUrl(e.path),
      label: e.title,
      kind: e.kindLabel,
    }),
  )
  // Site audit covers every indexable page — HTTP fetches are cheap.
  const siteAuditPages = entries
    .filter((e) => !e.noindex)
    .map((e) => ({
      path: e.path,
      url: absoluteUrl(e.path),
      label: e.title,
      kind: e.kindLabel,
    }))

  return (
    <AdminShell
      username={session.sub}
      storeReady={storeReady}
      entries={entries}
      settings={settings}
      technical={technical}
      pageSpeedPages={pageSpeedPages}
      siteAuditPages={siteAuditPages}
    />
  )
}
