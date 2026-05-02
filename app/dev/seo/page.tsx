import type { Metadata } from "next"
import { AdminShell } from "@/components/dev-seo/admin-shell"
import { requireSession } from "@/lib/seo/auth"
import { getEffectiveEntries } from "@/lib/seo/overrides"
import { getSettings, isStoreConfigured } from "@/lib/seo/store"
import { runTechnicalAudit } from "@/lib/seo/technical-audit"

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

  return (
    <AdminShell
      username={session.sub}
      storeReady={storeReady}
      entries={entries}
      settings={settings}
      technical={technical}
    />
  )
}
