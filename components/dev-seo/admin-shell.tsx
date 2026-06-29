"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import {
  Activity,
  Archive,
  ArrowRight,
  EyeOff,
  FileText,
  Gauge,
  Globe,
  LogOut,
  Map,
  Radar,
  Settings2,
  ShieldCheck,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { BackupDashboard } from "./backup-dashboard"
import { OverviewPanel } from "./overview-panel"
import { PagesTable } from "./pages-table"
import { PageSpeedDashboard } from "./pagespeed-dashboard"
import { SettingsPanel } from "./settings-panel"
import { SiteAuditDashboard } from "./site-audit-dashboard"
import { SitemapManager } from "./sitemap-manager"
import { TechnicalDashboard } from "./technical-dashboard"
import type { EffectiveEntry } from "@/lib/seo/overrides"
import type { SeoSettings } from "@/lib/seo/store"
import type { TechnicalAudit } from "@/lib/seo/technical-audit"

type TabKey =
  | "overview"
  | "pages"
  | "sitemap"
  | "settings"
  | "technical"
  | "pagespeed"
  | "site-audit"
  | "backup"

const TABS: { key: TabKey; label: string; icon: typeof Activity }[] = [
  { key: "overview", label: "Overview", icon: Activity },
  { key: "pages", label: "Pages", icon: FileText },
  { key: "sitemap", label: "Sitemap", icon: Map },
  { key: "settings", label: "Settings", icon: Settings2 },
  { key: "technical", label: "Technical audit", icon: ShieldCheck },
  { key: "pagespeed", label: "PageSpeed", icon: Gauge },
  { key: "site-audit", label: "Site audit", icon: Radar },
  { key: "backup", label: "Backup", icon: Archive },
]

export type PageSpeedPage = {
  path: string
  url: string
  label: string
  kind: string
}

export function AdminShell({
  username,
  storeReady,
  entries,
  settings,
  technical,
  pageSpeedPages,
  siteAuditPages,
}: {
  username: string
  storeReady: boolean
  entries: EffectiveEntry[]
  settings: SeoSettings
  technical: TechnicalAudit
  pageSpeedPages: PageSpeedPage[]
  siteAuditPages: PageSpeedPage[]
}) {
  const router = useRouter()
  const [active, setActive] = useState<TabKey>("overview")
  const [signingOut, setSigningOut] = useState(false)

  const counts = useMemo(() => {
    let overridden = 0
    let noindex = 0
    let excluded = 0
    for (const e of entries) {
      if (e.overridden) overridden++
      if (e.noindex) noindex++
      if (!e.includedInSitemap) excluded++
    }
    return { overridden, noindex, excluded }
  }, [entries])

  async function signOut() {
    setSigningOut(true)
    await fetch("/api/dev/seo/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "logout" }),
    })
    router.replace("/dev/seo/login")
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-muted/20">
      <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              SMSLocal · SEO Admin
            </p>
            <h1 className="mt-1 text-xl font-semibold tracking-tight text-foreground">
              Search console
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden text-right text-[12px] text-muted-foreground sm:block">
              Signed in as <span className="font-medium text-foreground">{username}</span>
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
          <div className="border-t border-destructive/40 bg-destructive/5 px-4 py-2 text-[12px] text-destructive sm:px-6">
            Upstash Redis is not connected. Reading defaults; edits cannot be
            saved until the integration is configured.
          </div>
        ) : null}

        {/* Indexing-status banner — always visible so the operator never
            forgets whether the site is currently public or private. */}
        <div
          className={`border-t px-4 py-2 text-[12px] sm:px-6 ${
            settings.globalNoindex
              ? "border-amber-500/40 bg-amber-500/10 text-amber-800 dark:text-amber-200"
              : "border-emerald-500/40 bg-emerald-500/10 text-emerald-800 dark:text-emerald-200"
          }`}
        >
          <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-2">
            <span className="inline-flex items-center gap-2">
              {settings.globalNoindex ? (
                <>
                  <EyeOff className="h-4 w-4" aria-hidden="true" />
                  <span className="font-semibold">
                    Site is hidden from search engines.
                  </span>
                  <span className="opacity-90">
                    Every page emits <code>noindex, nofollow</code> and{" "}
                    <code>/robots.txt</code> blocks all crawlers.
                  </span>
                </>
              ) : (
                <>
                  <Globe className="h-4 w-4" aria-hidden="true" />
                  <span className="font-semibold">
                    Site is public &amp; indexable.
                  </span>
                  <span className="opacity-90">
                    Search engines can crawl every URL listed in{" "}
                    <code>/sitemap.xml</code>.
                  </span>
                </>
              )}
            </span>
            <button
              type="button"
              onClick={() => setActive("settings")}
              className="inline-flex items-center gap-1 rounded-md border border-current/20 bg-background/40 px-2 py-1 text-[11px] font-semibold uppercase tracking-wide hover:bg-background/70"
            >
              {settings.globalNoindex ? "Allow indexing" : "Manage"}
              <ArrowRight className="h-3 w-3" aria-hidden="true" />
            </button>
          </div>
        </div>

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
        {active === "overview" ? (
          <OverviewPanel
            entries={entries}
            counts={counts}
            technical={technical}
            onOpenPages={() => setActive("pages")}
            onOpenSitemap={() => setActive("sitemap")}
          />
        ) : null}
        {active === "pages" ? <PagesTable initialEntries={entries} /> : null}
        {active === "sitemap" ? (
          <SitemapManager initialEntries={entries} />
        ) : null}
        {active === "settings" ? (
          <SettingsPanel initialSettings={settings} />
        ) : null}
        {active === "technical" ? (
          <TechnicalDashboard result={technical} />
        ) : null}
        {active === "pagespeed" ? (
          <PageSpeedDashboard pages={pageSpeedPages} />
        ) : null}
        {active === "site-audit" ? (
          <SiteAuditDashboard pages={siteAuditPages} />
        ) : null}
        {active === "backup" ? <BackupDashboard /> : null}
      </main>
    </div>
  )
}
