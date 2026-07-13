import type { MetadataRoute } from "next"
import { SITE } from "@/lib/seo/config"
import { getSettings } from "@/lib/seo/store"

/**
 * robots.txt policy for smslocal.in.
 *
 * Baked-in defaults:
 *   1. All mainstream search engines can crawl everything except `/signin`,
 *      `/api/`, `/_next/`, and `/dev/`.
 *   2. Reputable AI retrieval bots (ChatGPT-User, ClaudeBot, PerplexityBot,
 *      Google-Extended, Applebot-Extended) are allowed.
 *   3. Known scrapers and link-harvesters are explicitly disallowed.
 *
 * Runtime extras from the /dev/seo dashboard (stored in Redis):
 *   - `globalNoindex` — blocks every user-agent everywhere.
 *   - `extraDisallow` — extra path prefixes to block.
 *   - `blockedBots`   — extra user-agents to hard-block.
 */

const BLOCKED_DEFAULT = [...SITE.noIndexRoutes, "/_next/", "/dev/"]

// Crawlers we explicitly want to permit even though they're SEO/audit
// scrapers — they're tools the site owner is actively using.
// SemrushBot covers the main Semrush index; SiteAuditBot is the dedicated
// Site Audit crawler that fetches /siteaudit-*.txt for verification and
// then crawls pages on demand. AhrefsBot must be allowed so it can fetch
// the IndexNow key file for validation. All must NOT appear in BLOCKED_BOTS.
const ALLOWED_AUDIT_BOTS = ["SemrushBot", "SiteAuditBot", "AhrefsBot"]

const BLOCKED_BOTS = [
  "MJ12bot",
  "DotBot",
  "BLEXBot",
  "SeekportBot",
  "PetalBot",
  "DataForSeoBot",
  "Bytespider",
  "ZoominfoBot",
  "SerpstatBot",
]

export const revalidate = 60

export default async function robots(): Promise<MetadataRoute.Robots> {
  const settings = await getSettings().catch(
    () => ({}) as Awaited<ReturnType<typeof getSettings>>,
  )

  if (settings.globalNoindex) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
      sitemap: `${SITE.url}/sitemap.xml`,
      host: SITE.url,
    }
  }

  const disallow = [
    ...BLOCKED_DEFAULT,
    ...((settings.extraDisallow ?? []) as string[]),
  ] as unknown as string[]
  // Merge static + runtime blocklists, then strip out anything we've
  // committed to allowing (e.g. SemrushBot for the active Site Audit) so
  // an accidental click in the dashboard can't re-block them.
  const blockedBots = [
    ...BLOCKED_BOTS,
    ...((settings.blockedBots ?? []) as string[]),
  ].filter((bot) => !ALLOWED_AUDIT_BOTS.includes(bot))

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      // Explicit Googlebot allow. The wildcard rule above already covers
      // Googlebot, but calling it out by name is a common SEO ask: it
      // makes the intent unambiguous to crawlers and to humans auditing
      // robots.txt, and lets Google Search Console's robots.txt tester
      // show a clean "Allowed by: User-agent: Googlebot" verdict instead
      // of falling back to the wildcard rule.
      { userAgent: "Googlebot", allow: "/", disallow },
      // Semrush Site Audit. Required for the verification flow that pairs
      // with /public/siteaudit-*.txt — without an explicit allow, Semrush
      // refuses to start crawling. Same disallow list as the wildcard
      // rule so private surfaces (/dev, /api, /_next, /signin) stay off.
      { userAgent: ALLOWED_AUDIT_BOTS, allow: "/", disallow },
      {
        userAgent: [
          "ChatGPT-User",
          "OAI-SearchBot",
          "ClaudeBot",
          "PerplexityBot",
          "Google-Extended",
          "Applebot-Extended",
        ],
        allow: "/",
        disallow,
      },
      ...blockedBots.map((bot) => ({ userAgent: bot, disallow: "/" })),
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  }
}
