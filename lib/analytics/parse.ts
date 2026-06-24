/**
 * Referrer, UTM, and user-agent classification for the analytics pipeline.
 *
 * All functions are pure — no I/O — so they can run on the edge, in a
 * route handler, or inside a unit test without any setup.
 */

import type { DeviceKind, SourceInfo, SourceKind, UaInfo, UtmSet } from "./types"

// ─── Source classification ──────────────────────────────────────────────────

type Rule = {
  match: (hostname: string) => boolean
  kind: Exclude<SourceKind, "direct" | "unknown" | "internal">
  name: string
}

/**
 * Rules are applied in order — the first match wins. Hostname is always
 * lower-case and without a leading `www.`.
 */
const REFERRER_RULES: Rule[] = [
  // Search engines
  { match: (h) => /^google\.[a-z.]+$/.test(h) || h.endsWith(".google.com"), kind: "organic_search", name: "google" },
  { match: (h) => /^bing\./.test(h) || h.endsWith(".bing.com"), kind: "organic_search", name: "bing" },
  { match: (h) => /^duckduckgo\./.test(h), kind: "organic_search", name: "duckduckgo" },
  { match: (h) => /^yahoo\./.test(h) || h.endsWith(".yahoo.com"), kind: "organic_search", name: "yahoo" },
  { match: (h) => /^yandex\./.test(h), kind: "organic_search", name: "yandex" },
  { match: (h) => /^baidu\./.test(h), kind: "organic_search", name: "baidu" },
  { match: (h) => /^ecosia\./.test(h), kind: "organic_search", name: "ecosia" },
  { match: (h) => /^brave\./.test(h) || h === "search.brave.com", kind: "organic_search", name: "brave" },
  { match: (h) => h === "openai.com" || h === "chatgpt.com" || h === "chat.openai.com", kind: "organic_search", name: "chatgpt" },
  { match: (h) => h === "perplexity.ai" || h === "www.perplexity.ai", kind: "organic_search", name: "perplexity" },
  { match: (h) => h === "gemini.google.com", kind: "organic_search", name: "gemini" },
  { match: (h) => h.endsWith("claude.ai"), kind: "organic_search", name: "claude" },

  // Social
  { match: (h) => h === "facebook.com" || h.endsWith(".facebook.com") || h === "m.facebook.com" || h === "l.facebook.com", kind: "social", name: "facebook" },
  { match: (h) => h === "instagram.com" || h.endsWith(".instagram.com"), kind: "social", name: "instagram" },
  { match: (h) => h === "twitter.com" || h === "x.com" || h === "t.co" || h.endsWith(".twitter.com") || h.endsWith(".x.com"), kind: "social", name: "x" },
  { match: (h) => h === "linkedin.com" || h.endsWith(".linkedin.com") || h === "lnkd.in", kind: "social", name: "linkedin" },
  { match: (h) => h === "youtube.com" || h.endsWith(".youtube.com") || h === "youtu.be", kind: "social", name: "youtube" },
  { match: (h) => h === "whatsapp.com" || h.endsWith(".whatsapp.com") || h === "wa.me" || h === "chat.whatsapp.com", kind: "social", name: "whatsapp" },
  { match: (h) => h === "reddit.com" || h.endsWith(".reddit.com"), kind: "social", name: "reddit" },
  { match: (h) => h === "pinterest.com" || h.endsWith(".pinterest.com"), kind: "social", name: "pinterest" },
  { match: (h) => h === "quora.com" || h.endsWith(".quora.com"), kind: "social", name: "quora" },
  { match: (h) => h.endsWith("telegram.org") || h === "t.me", kind: "social", name: "telegram" },
  { match: (h) => h.endsWith("medium.com"), kind: "social", name: "medium" },
  { match: (h) => h.endsWith("github.com"), kind: "social", name: "github" },
  { match: (h) => h.endsWith("producthunt.com"), kind: "social", name: "producthunt" },
  { match: (h) => h.endsWith("news.ycombinator.com"), kind: "social", name: "hackernews" },

  // Email providers (when someone clicks a link from webmail)
  { match: (h) => h.endsWith("mail.google.com"), kind: "email", name: "gmail" },
  { match: (h) => h.endsWith("outlook.live.com") || h.endsWith("outlook.office.com"), kind: "email", name: "outlook" },
  { match: (h) => h.endsWith("mail.yahoo.com"), kind: "email", name: "yahoo_mail" },
]

/**
 * Classify a visitor's traffic source using referrer hostname + UTM + click
 * ids. The result is what surfaces in the "Sources" dashboard.
 */
export function classifySource(opts: {
  referrer?: string
  utm?: UtmSet
  siteHost?: string
}): SourceInfo {
  const { referrer, utm = {}, siteHost } = opts

  // 1. Click ids unambiguously identify paid traffic.
  if (utm.gclid) return { kind: "paid_search", name: utm.source || "google" }
  if (utm.msclkid) return { kind: "paid_search", name: utm.source || "bing" }
  if (utm.fbclid) return { kind: "paid_social", name: utm.source || "facebook" }

  // 2. Explicit UTM medium is the next strongest signal.
  if (utm.medium) {
    const m = utm.medium.toLowerCase()
    const name = (utm.source || "unknown").toLowerCase()
    if (["cpc", "ppc", "paid", "paidsearch", "sem"].includes(m)) return { kind: "paid_search", name }
    if (["paidsocial", "paid-social", "social-cpc"].includes(m)) return { kind: "paid_social", name }
    if (["social", "social-organic", "smm"].includes(m)) return { kind: "social", name }
    if (["email", "newsletter", "mailer"].includes(m)) return { kind: "email", name }
    if (["affiliate", "partner", "referral"].includes(m)) return { kind: "referral", name }
    if (["display", "banner"].includes(m)) return { kind: "paid_social", name }
  }

  // 3. Fall back to referrer hostname.
  if (referrer) {
    try {
      const u = new URL(referrer)
      const host = u.hostname.toLowerCase().replace(/^www\./, "")
      // Self-referral → "internal" (same-site navigations shouldn't count).
      if (siteHost && host === siteHost.replace(/^www\./, "")) {
        return { kind: "internal", name: "self" }
      }
      for (const rule of REFERRER_RULES) {
        if (rule.match(host)) return { kind: rule.kind, name: rule.name }
      }
      return { kind: "referral", name: host }
    } catch {
      // Malformed referrer — ignore.
    }
  }

  return { kind: "direct", name: "direct" }
}

// ─── UTM extraction ──────────────────────────────────────────────────────────

export function extractUtm(rawUrl: string | undefined): UtmSet {
  if (!rawUrl) return {}
  let url: URL
  try {
    url = new URL(rawUrl, "https://smslocal.in")
  } catch {
    return {}
  }
  const p = url.searchParams
  const get = (k: string) => {
    const v = p.get(k)
    return v && v.length > 0 && v.length <= 200 ? v : undefined
  }
  const utm: UtmSet = {
    source: get("utm_source"),
    medium: get("utm_medium"),
    campaign: get("utm_campaign"),
    term: get("utm_term"),
    content: get("utm_content"),
    gclid: get("gclid"),
    fbclid: get("fbclid"),
    msclkid: get("msclkid"),
  }
  // Remove undefined keys so the stored JSON stays clean.
  for (const k of Object.keys(utm) as (keyof UtmSet)[]) {
    if (utm[k] === undefined) delete utm[k]
  }
  return utm
}

// ─── User-agent classification ───────────────────────────────────────────────

/**
 * Zero-dependency UA parser. It only returns the high-level fields that the
 * analytics dashboards actually display, which is all we need.
 */
export function parseUserAgent(ua: string | undefined): UaInfo {
  if (!ua) return {}
  const lower = ua.toLowerCase()

  // Bot detection — coarse but catches the majority.
  if (
    /bot|crawler|spider|crawling|chatgpt|perplexitybot|claudebot|googlebot|bingbot|yandexbot|duckduckbot|baiduspider|facebot|slurp|msnbot|applebot|twitterbot|linkedinbot|pinterest/.test(
      lower,
    )
  ) {
    return { browser: "Bot", os: "Bot", device: "bot" }
  }

  // OS
  let os: string | undefined
  if (/iphone|ipad|ipod/.test(lower)) os = "iOS"
  else if (/android/.test(lower)) os = "Android"
  else if (/windows phone/.test(lower)) os = "Windows Phone"
  else if (/windows/.test(lower)) os = "Windows"
  else if (/mac os x|macintosh/.test(lower)) os = "macOS"
  else if (/cros /.test(lower)) os = "ChromeOS"
  else if (/linux/.test(lower)) os = "Linux"

  // Browser — order matters, Edge/Opera must run before Chrome since they
  // include "Chrome" in their UA string.
  let browser: string | undefined
  if (/edg\//.test(lower)) browser = "Edge"
  else if (/opr\/|opera/.test(lower)) browser = "Opera"
  else if (/samsungbrowser/.test(lower)) browser = "Samsung"
  else if (/firefox/.test(lower)) browser = "Firefox"
  else if (/chrome/.test(lower)) browser = "Chrome"
  else if (/safari/.test(lower)) browser = "Safari"

  // Device class
  let device: DeviceKind = "desktop"
  if (/ipad|tablet|kindle|playbook/.test(lower)) device = "tablet"
  else if (/mobile|iphone|android.*mobile|phone/.test(lower)) device = "mobile"

  return { browser, os, device }
}

// ─── Helpers ────────────────────────────────────────────────────────────────

/** Normalize a referrer URL into a displayable hostname (no protocol / path). */
export function referrerHostname(referrer: string | undefined): string | undefined {
  if (!referrer) return undefined
  try {
    return new URL(referrer).hostname.toLowerCase().replace(/^www\./, "")
  } catch {
    return undefined
  }
}

/**
 * Strip query strings and fragments from a path before it's stored, so the
 * `pages` report aggregates cleanly. UTMs have already been captured by the
 * caller, so dropping the query here is safe.
 */
export function normalizePath(path: string): string {
  if (!path) return "/"
  let out = path
  const q = out.indexOf("?")
  if (q >= 0) out = out.slice(0, q)
  const h = out.indexOf("#")
  if (h >= 0) out = out.slice(0, h)
  if (!out.startsWith("/")) out = `/${out}`
  if (out.length > 1 && out.endsWith("/")) out = out.replace(/\/+$/, "")
  return out || "/"
}
