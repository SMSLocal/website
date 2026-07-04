/**
 * Single source of truth for every site-wide SEO value.
 *
 * Every helper in `lib/seo/*`, every JSON-LD schema in
 * `components/seo/json-ld.tsx`, `app/layout.tsx`, `app/robots.ts`, and
 * `app/sitemap.ts` reads from this one config. Change a value here and it
 * propagates everywhere.
 *
 * The site URL reads from NEXT_PUBLIC_SITE_URL and falls back to the
 * production domain. NEXT_PUBLIC_VERCEL_URL is intentionally excluded
 * because Vercel sets it to the deployment URL (e.g. xyz.vercel.app),
 * which would produce non-canonical URLs on every deployment.
 */

function resolveSiteUrl(): string {
  const env = process.env.NEXT_PUBLIC_SITE_URL?.trim() ?? ""
  if (env) {
    return env.startsWith("http") ? env : `https://${env}`
  }
  return "https://www.smslocal.in"
}

export const SITE = {
  /** Canonical production URL. Overridable via NEXT_PUBLIC_SITE_URL. */
  url: resolveSiteUrl(),

  /** Brand name used in the title template, schema, and OG siteName. */
  name: "SMSLocal",

  /** Short description used anywhere we don't pass a custom one. */
  description:
    "DLT-compliant bulk SMS, AI WhatsApp agents in 8 Indian languages, OTP APIs, and a developer-ready dashboard — built for Indian businesses. Start free with ₹60 credit.",

  /** Title template. `%s` is replaced with the page-specific title. */
  titleTemplate: "%s | SMSLocal",
  defaultTitle: "SMSLocal — India's SMS, WhatsApp & AI Messaging Platform",

  /** Default keywords merged with page-level keywords. */
  defaultKeywords: [
    "bulk SMS India",
    "WhatsApp Business API",
    "OTP SMS",
    "DLT-compliant SMS",
    "transactional SMS India",
    "AI WhatsApp agent",
    "SMS gateway India",
    "SMSLocal",
  ],

  /** Locale used in OG tags, HTML lang, and schema. */
  locale: "en_IN",
  htmlLang: "en-IN",

  /** Default social share image. Place a 1200x630 PNG at /public/og-default.png. */
  defaultOgImage: "/og-default.png",
  defaultOgImageAlt:
    "SMSLocal — India's SMS, WhatsApp and AI messaging platform",

  /** Twitter handle (leave empty string to omit). */
  twitterHandle: "",

  /** Theme colours for the HTML meta tag. */
  themeColor: {
    light: "#ffffff",
    dark: "#0b1220",
  },

  /**
   * Routes that should NEVER be indexed or appear in sitemap.
   * Keep this in sync with the rules in `app/robots.ts`.
   */
  noIndexRoutes: ["/signin", "/api/"] as const,
} as const

/** Helper: absolute URL for any site-relative path. */
export function absoluteUrl(path: string): string {
  if (!path) return SITE.url
  if (path.startsWith("http")) return path
  return `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`
}

/**
 * Normalize a route path to end with a trailing slash, matching the site's
 * `trailingSlash: true` config (so canonical URLs, the sitemap and JSON-LD all
 * agree with the URL the browser lands on). Leaves the root, absolute URLs,
 * query/hash strings and asset files (e.g. /og.png) untouched.
 */
export function withTrailingSlash(path: string): string {
  if (!path || path === "/") return "/"
  if (path.startsWith("http")) return path
  const [p] = path.split(/[?#]/)
  if (p.endsWith("/")) return path
  const last = p.split("/").pop() ?? ""
  if (last.includes(".")) return path // asset file — don't slash
  return `${p}/${path.slice(p.length)}`
}
