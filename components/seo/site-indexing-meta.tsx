import { getSettings } from "@/lib/seo/store"

/**
 * Renders site-wide indexing meta tags into <head>:
 *
 *   1. `<meta name="robots">` — when the global noindex toggle is ON, this
 *      forces every page to be marked `noindex, nofollow`, even if a
 *      page-level `metadata` export said otherwise. Search engines honour
 *      the most restrictive value across all robots tags.
 *   2. `<meta name="google-site-verification">` — for Google Search Console.
 *   3. `<meta name="msvalidate.01">` — for Bing Webmaster Tools.
 *
 * In Next.js App Router, raw <meta> tags rendered as JSX are automatically
 * hoisted into <head>, so this component can live anywhere inside the root
 * layout's tree.
 */
export async function SiteIndexingMeta() {
  const settings = await getSettings().catch(() => null)
  if (!settings) return null

  return (
    <>
      {settings.globalNoindex ? (
        <>
          <meta
            name="robots"
            content="noindex, nofollow, noarchive, nosnippet, noimageindex"
          />
          <meta
            name="googlebot"
            content="noindex, nofollow, noarchive, nosnippet, noimageindex"
          />
          <meta
            name="bingbot"
            content="noindex, nofollow, noarchive, nosnippet, noimageindex"
          />
        </>
      ) : null}
      {settings.googleSiteVerification ? (
        <meta
          name="google-site-verification"
          content={settings.googleSiteVerification}
        />
      ) : null}
      {settings.bingSiteVerification ? (
        <meta name="msvalidate.01" content={settings.bingSiteVerification} />
      ) : null}
    </>
  )
}
