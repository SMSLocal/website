/**
 * Merge the compile-time default (registry / dynamic content) with the
 * runtime Redis override for a path. Consumed by:
 *   - the dashboard (to show effective values)
 *   - app/sitemap.ts (to respect include/priority/changeFrequency)
 *   - any page that wants live metadata via `generateMetadata`
 */

import { getAllDashboardEntries, type DashboardEntry } from "./all-paths"
import { getAllOverrides, getOverride, type SeoOverride } from "./store"

export type EffectiveEntry = DashboardEntry & {
  /** Whether any override is present for this path. */
  overridden: boolean
  /** The raw override blob (empty object when none). */
  override: SeoOverride
  /** Sitemap inclusion after overrides. Defaults to !noindex. */
  includedInSitemap: boolean
  /** Sitemap priority after overrides (number between 0 and 1). */
  priority?: number
  /** Sitemap change frequency after overrides. */
  changeFrequency?: SeoOverride["changeFrequency"]
  /**
   * The resolved focus keyword that applies right now: the admin override
   * if one exists, otherwise the registry default (`defaultFocusKeyword`).
   * Empty string when nothing is set anywhere — consumers should treat
   * empty as "no focus keyword", not as a real keyword.
   */
  focusKeyword: string
}

function mergeOne(entry: DashboardEntry, ov: SeoOverride | undefined | null): EffectiveEntry {
  const override = ov ?? {}
  const noindex = override.noindex ?? entry.noindex
  // Preserve override semantics: explicit empty string from the editor means
  // "I cleared the focus keyword", so it wins over the registry default.
  const focusKeyword =
    override.focusKeyword !== undefined
      ? override.focusKeyword
      : entry.defaultFocusKeyword
  return {
    ...entry,
    title: override.title ?? entry.title,
    titleAbsolute: override.titleAbsolute ?? entry.titleAbsolute,
    description: override.description ?? entry.description,
    keywords: override.keywords ?? entry.keywords,
    ogImage: override.ogImage ?? entry.ogImage,
    noindex,
    overridden: ov != null && Object.keys(override).length > 0,
    override,
    includedInSitemap: override.includeInSitemap ?? !noindex,
    priority: override.priority,
    changeFrequency: override.changeFrequency,
    focusKeyword,
  }
}

/** Load everything the dashboard renders — defaults + live overrides. */
export async function getEffectiveEntries(): Promise<EffectiveEntry[]> {
  const base = getAllDashboardEntries()
  const overrides = await getAllOverrides()
  return base.map((e) => mergeOne(e, overrides.get(e.path)))
}

/** Fast single-path lookup for `generateMetadata`. */
export async function getEffectiveEntry(
  path: string,
): Promise<EffectiveEntry | null> {
  const base = getAllDashboardEntries().find((e) => e.path === path)
  if (!base) return null
  const ov = await getOverride(path)
  return mergeOne(base, ov)
}
