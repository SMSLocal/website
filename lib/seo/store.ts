/**
 * Redis-backed store for runtime SEO overrides.
 *
 * Every editable piece of per-page SEO (title, description, keywords, noindex,
 * ogImage, focus keyword, sitemap priority/changeFrequency, include-in-sitemap)
 * lives under the key prefix `seo:override:{path}`. The set `seo:index`
 * tracks every path that currently has overrides so the dashboard can list
 * and clean up orphans without scanning.
 *
 * Site-wide settings (ping URLs, custom robots rules) live under `seo:settings`.
 */

import { Redis } from "@upstash/redis"

export type SeoOverride = {
  title?: string
  titleAbsolute?: string
  description?: string
  keywords?: string[]
  ogImage?: string
  noindex?: boolean
  /** Rank Math-style focus keyword used by the analysis engine. */
  focusKeyword?: string
  /** Include in sitemap.xml. Defaults to true. */
  includeInSitemap?: boolean
  /** Sitemap <priority> override, 0.0–1.0. */
  priority?: number
  /** Sitemap <changefreq> override. */
  changeFrequency?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never"
  /** Book-keeping: last edit metadata for the audit timeline. */
  updatedAt?: string
  updatedBy?: string
}

export type SeoSettings = {
  /** Global default for include-in-sitemap. */
  defaultInclude?: boolean
  /**
   * When true, the whole site emits noindex/nofollow and `/robots.txt` blocks
   * every bot. New deployments START with this flag true so the site stays
   * private until the operator explicitly flips the "Allow indexing" switch
   * in the SEO admin (/dev/seo → Settings).
   */
  globalNoindex?: boolean
  /** Extra paths to hard-block in robots.txt. */
  extraDisallow?: string[]
  /** Extra bot user-agents to hard-block. */
  blockedBots?: string[]
  /** Google Search Console verification token. */
  googleSiteVerification?: string
  /** Bing Webmaster verification token. */
  bingSiteVerification?: string
  /**
   * Internal flag — set to `true` once the operator has explicitly saved
   * settings from the dashboard. Used to differentiate "never configured
   * (default to noindex)" from "operator chose to allow indexing".
   */
  initialized?: boolean
}

/**
 * Defaults applied when no settings have ever been saved. The site is
 * indexable out of the box: robots.txt allows all user-agents, the
 * sitemap is emitted, and `<meta name="robots">` does not include
 * `noindex`. Operators can flip this back via the /dev/seo dashboard
 * ("Allow indexing" toggle) when staging needs to be hidden.
 */
export const SETTINGS_DEFAULTS: Required<
  Pick<SeoSettings, "globalNoindex" | "defaultInclude">
> = {
  globalNoindex: false,
  defaultInclude: true,
}

const PATH_KEY = (path: string) => `seo:override:${path}`
const INDEX_KEY = "seo:index"
const SETTINGS_KEY = "seo:settings"

let _redis: Redis | null = null
function redis(): Redis {
  if (_redis) return _redis
  const url = process.env.KV_REST_API_URL
  const token = process.env.KV_REST_API_TOKEN
  if (!url || !token) {
    throw new Error(
      "Upstash Redis is not configured. Set KV_REST_API_URL and KV_REST_API_TOKEN.",
    )
  }
  _redis = new Redis({ url, token })
  return _redis
}

/** Best-effort check — used by server components to decide whether to degrade. */
export function isStoreConfigured(): boolean {
  return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN)
}

export async function getOverride(path: string): Promise<SeoOverride | null> {
  if (!isStoreConfigured()) return null
  const data = await redis().get<SeoOverride>(PATH_KEY(path))
  return data ?? null
}

/**
 * Batch-load overrides for every path that has one. Uses a single pipeline
 * so the dashboard renders fast even with hundreds of entries.
 */
export async function getAllOverrides(): Promise<Map<string, SeoOverride>> {
  const out = new Map<string, SeoOverride>()
  if (!isStoreConfigured()) return out
  const paths = await redis().smembers(INDEX_KEY)
  if (!paths || paths.length === 0) return out
  const pipe = redis().pipeline()
  for (const p of paths) pipe.get<SeoOverride>(PATH_KEY(p))
  const values = await pipe.exec<Array<SeoOverride | null>>()
  paths.forEach((p, i) => {
    const v = values[i]
    if (v) out.set(p, v)
  })
  return out
}

export async function setOverride(
  path: string,
  patch: Partial<SeoOverride>,
  updatedBy = "admin",
): Promise<SeoOverride> {
  const current = (await getOverride(path)) ?? {}
  // Strip empty-string fields so the registry default can shine through.
  const clean: SeoOverride = { ...current, ...patch }
  for (const k of Object.keys(clean) as (keyof SeoOverride)[]) {
    const v = clean[k]
    if (v === "" || v === undefined || v === null) delete clean[k]
    if (Array.isArray(v) && v.length === 0) delete clean[k]
  }
  clean.updatedAt = new Date().toISOString()
  clean.updatedBy = updatedBy

  const pipe = redis().pipeline()
  pipe.set(PATH_KEY(path), clean)
  pipe.sadd(INDEX_KEY, path)
  await pipe.exec()
  return clean
}

export async function deleteOverride(path: string): Promise<void> {
  if (!isStoreConfigured()) return
  const pipe = redis().pipeline()
  pipe.del(PATH_KEY(path))
  pipe.srem(INDEX_KEY, path)
  await pipe.exec()
}

export async function getSettings(): Promise<SeoSettings> {
  // When Redis isn't configured yet, return safe defaults — site is noindex
  // until an operator saves real settings from the SEO admin.
  if (!isStoreConfigured()) {
    return { ...SETTINGS_DEFAULTS }
  }
  const raw = await redis().get<SeoSettings>(SETTINGS_KEY)
  // First-ever boot OR settings missing entirely — apply safe defaults.
  if (!raw || !raw.initialized) {
    return { ...SETTINGS_DEFAULTS, ...(raw ?? {}) }
  }
  return raw
}

export async function setSettings(
  patch: Partial<SeoSettings>,
): Promise<SeoSettings> {
  const current = await getSettings()
  // Once an operator saves anything, mark the settings as initialized so
  // future reads return the saved values verbatim (no implicit noindex).
  const next: SeoSettings = { ...current, ...patch, initialized: true }
  await redis().set(SETTINGS_KEY, next)
  return next
}
