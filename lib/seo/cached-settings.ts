import { unstable_cache } from "next/cache"
import { getSettings, type SeoSettings } from "@/lib/seo/store"

/** Cache tag cleared by the SEO admin whenever settings are saved. */
export const SEO_SETTINGS_TAG = "seo-settings"

/**
 * Site-wide SEO settings for page rendering.
 *
 * The root layout needs these on every page (global noindex, Google and Bing
 * verification tags). Reading Redis directly there makes Next.js render every
 * route on each request, so no page is ever cached at the edge. Going through
 * the data cache keeps the routes static and re-reads Redis at most every five
 * minutes. Saving settings in the SEO admin clears the tag, so a change shows
 * up straight away instead of waiting for the window to end.
 *
 * A failed read resolves to null (no extra tags) for one window rather than
 * throwing, which matches how the layout behaved before.
 */
export const getCachedSettings = unstable_cache(
  async (): Promise<SeoSettings | null> => getSettings().catch(() => null),
  ["seo-settings"],
  { revalidate: 300, tags: [SEO_SETTINGS_TAG] },
)
