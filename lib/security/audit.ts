/**
 * Server-side security audit for the dev dashboard.
 *
 * Covers two things the browser can easily check and one the server can:
 *   1. HTTP response headers on the homepage — do we actually ship HSTS,
 *      CSP, X-Frame-Options, etc. (fetches the site at build time).
 *   2. Env var hygiene — any `NEXT_PUBLIC_*` var whose name looks like a
 *      secret, any missing critical vars, any leaked server-only vars.
 *   3. Well-known files — `/robots.txt`, `/sitemap.xml`, `/llms.txt`
 *      respond with 200 and plausible content.
 *
 * The dashboard at `/dev/security` renders this in plain English so a
 * founder (not just a developer) can tell at a glance whether the launch
 * checklist is green.
 */

import { LIMITER_DEFINITIONS, isRateLimitConfigured } from "./rate-limit"

export type CheckLevel = "ok" | "warning" | "error" | "info"

export type Check = {
  id: string
  label: string
  level: CheckLevel
  detail: string
  evidence?: string
  hint?: string
}

export type RateLimitInfo = {
  configured: boolean
  limiters: Array<{
    name: string
    description: string
    limit: number
    window: string
    prefix: string
  }>
}

export type SecurityAudit = {
  baseUrl: string
  fetchedAt: string
  checks: Check[]
  stats: { ok: number; warning: number; error: number }
  rateLimit: RateLimitInfo
}

/** Headers we expect on every response, with the shape each should take. */
const EXPECTED_HEADERS: Array<{
  key: string
  label: string
  required: boolean
  validate: (value: string | null) => { level: CheckLevel; detail: string }
}> = [
  {
    key: "strict-transport-security",
    label: "HSTS (Strict-Transport-Security)",
    required: true,
    validate: (v) => {
      if (!v) {
        return {
          level: "error",
          detail: "Missing. Browsers won't pin HTTPS or qualify for the preload list.",
        }
      }
      const maxAge = /max-age=(\d+)/.exec(v)?.[1]
      const age = maxAge ? Number(maxAge) : 0
      if (age < 31536000) {
        return {
          level: "warning",
          detail: `max-age is ${age}s (below 1 year). Browsers may ignore it for preload.`,
        }
      }
      if (!/includeSubDomains/i.test(v) || !/preload/i.test(v)) {
        return {
          level: "warning",
          detail: "Present, but missing includeSubDomains and/or preload directives.",
        }
      }
      return { level: "ok", detail: "Present with a 1+ year max-age, includeSubDomains, preload." }
    },
  },
  {
    key: "content-security-policy",
    label: "Content-Security-Policy",
    required: true,
    validate: (v) => {
      if (!v) {
        return {
          level: "error",
          detail:
            "Missing. Without CSP the site is unprotected against XSS and third-party script injection.",
        }
      }
      if (/'unsafe-eval'/.test(v)) {
        return {
          level: "warning",
          detail: "Present but allows 'unsafe-eval' — tighten script-src if possible.",
        }
      }
      if (/\bdefault-src\b/.test(v) && /\bframe-ancestors\b/.test(v)) {
        return { level: "ok", detail: "Present with default-src and frame-ancestors set." }
      }
      return { level: "warning", detail: "Present but missing default-src or frame-ancestors." }
    },
  },
  {
    key: "x-content-type-options",
    label: "X-Content-Type-Options",
    required: true,
    validate: (v) => {
      if (v && v.toLowerCase().includes("nosniff")) {
        return { level: "ok", detail: "nosniff — blocks MIME-type sniffing attacks." }
      }
      return { level: "error", detail: "Missing or not set to 'nosniff'." }
    },
  },
  {
    key: "x-frame-options",
    label: "X-Frame-Options",
    required: true,
    validate: (v) => {
      if (!v) {
        return {
          level: "warning",
          detail: "Missing. CSP frame-ancestors covers modern browsers but legacy clients won't.",
        }
      }
      if (/^(deny|sameorigin)$/i.test(v.trim())) {
        return { level: "ok", detail: `Set to "${v.trim().toUpperCase()}".` }
      }
      return { level: "warning", detail: `Unexpected value "${v}". Should be DENY or SAMEORIGIN.` }
    },
  },
  {
    key: "referrer-policy",
    label: "Referrer-Policy",
    required: true,
    validate: (v) => {
      if (!v) return { level: "warning", detail: "Missing. Browsers default to 'strict-origin-when-cross-origin' but set it explicitly." }
      const safe = [
        "no-referrer",
        "same-origin",
        "strict-origin",
        "strict-origin-when-cross-origin",
      ]
      if (safe.some((s) => v.toLowerCase().includes(s))) {
        return { level: "ok", detail: `Set to "${v}".` }
      }
      return { level: "warning", detail: `"${v}" leaks more URL context than necessary.` }
    },
  },
  {
    key: "permissions-policy",
    label: "Permissions-Policy",
    required: false,
    validate: (v) => {
      if (!v) {
        return {
          level: "warning",
          detail: "Missing. Lock down camera, microphone, geolocation, and FLoC/Topics at least.",
        }
      }
      return { level: "ok", detail: "Present — site disables sensitive features by default." }
    },
  },
  {
    key: "cross-origin-opener-policy",
    label: "Cross-Origin-Opener-Policy",
    required: false,
    validate: (v) => {
      if (!v) return { level: "info", detail: "Missing. Nice-to-have for isolating browsing contexts." }
      return { level: "ok", detail: `Set to "${v}".` }
    },
  },
]

/** Env vars that should never be exposed to the browser by name. */
const SECRET_WORDS = [
  "secret",
  "password",
  "apikey",
  "api_key",
  "token",
  "private",
  "_key",
  "database_url",
]

/** Env vars that indicate a connected integration — informational only. */
const INTEGRATION_HINTS = [
  "SUPABASE_",
  "UPSTASH_",
  "AI_GATEWAY_",
  "SENTRY_",
  "STRIPE_",
  "BLOB_",
]

function auditEnv(): Check[] {
  const checks: Check[] = []
  const entries = Object.entries(process.env)

  const publicSecrets = entries.filter(
    ([k]) =>
      k.startsWith("NEXT_PUBLIC_") &&
      SECRET_WORDS.some((w) => k.toLowerCase().includes(w)),
  )
  if (publicSecrets.length > 0) {
    checks.push({
      id: "env-public-secrets",
      label: "Public env vars that look like secrets",
      level: "error",
      detail: `${publicSecrets.length} NEXT_PUBLIC_* variable(s) contain secret-like words.`,
      evidence: publicSecrets.map(([k]) => k).join(", "),
      hint: "NEXT_PUBLIC_* values are embedded in the client bundle. Rename or move to a server-only var.",
    })
  } else {
    checks.push({
      id: "env-public-secrets",
      label: "Public env vars that look like secrets",
      level: "ok",
      detail: "No NEXT_PUBLIC_* vars contain secret-like words.",
    })
  }

  const integrations = entries
    .map(([k]) => k)
    .filter((k) => INTEGRATION_HINTS.some((prefix) => k.startsWith(prefix)))
  const connected = new Set<string>()
  for (const k of integrations) {
    const prefix = INTEGRATION_HINTS.find((p) => k.startsWith(p))
    if (prefix) connected.add(prefix.replace(/_$/, ""))
  }
  checks.push({
    id: "env-integrations",
    label: "Connected integrations",
    level: connected.size > 0 ? "info" : "warning",
    detail:
      connected.size > 0
        ? `${[...connected].sort().join(", ")}.`
        : "No common integration env vars detected. If you meant to connect Supabase/Upstash/Sentry, do so in the project settings.",
  })

  if (!process.env.NEXT_PUBLIC_SITE_URL) {
    checks.push({
      id: "env-site-url",
      label: "NEXT_PUBLIC_SITE_URL",
      level: "warning",
      detail:
        "Not set. Canonical URLs, OG tags, and robots.txt will fall back to https://www.smslocal.in. Set this for preview deployments.",
    })
  } else {
    checks.push({
      id: "env-site-url",
      label: "NEXT_PUBLIC_SITE_URL",
      level: "ok",
      detail: `Set to "${process.env.NEXT_PUBLIC_SITE_URL}".`,
    })
  }

  return checks
}

async function fetchHeaders(url: string): Promise<Headers | null> {
  try {
    const res = await fetch(url, {
      method: "HEAD",
      cache: "no-store",
      redirect: "follow",
    })
    return res.headers
  } catch {
    try {
      const res = await fetch(url, { method: "GET", cache: "no-store", redirect: "follow" })
      return res.headers
    } catch {
      return null
    }
  }
}

async function auditWellKnown(baseUrl: string): Promise<Check[]> {
  const checks: Check[] = []
  const files: Array<{ path: string; label: string; expect: RegExp }> = [
    { path: "/robots.txt", label: "robots.txt reachable", expect: /sitemap/i },
    { path: "/sitemap.xml", label: "sitemap.xml reachable", expect: /<url>|<urlset|<sitemap/i },
    { path: "/llms.txt", label: "llms.txt reachable", expect: /#\s*SMSLocal/i },
  ]
  for (const f of files) {
    try {
      const res = await fetch(`${baseUrl}${f.path}`, { cache: "no-store", redirect: "follow" })
      if (!res.ok) {
        checks.push({
          id: `well-known-${f.path}`,
          label: f.label,
          level: "error",
          detail: `HTTP ${res.status} at ${f.path}.`,
        })
        continue
      }
      const body = await res.text()
      const matched = f.expect.test(body)
      checks.push({
        id: `well-known-${f.path}`,
        label: f.label,
        level: matched ? "ok" : "warning",
        detail: matched
          ? `200 OK, content looks correct.`
          : `200 OK but content does not match expected pattern.`,
        evidence: matched ? undefined : body.slice(0, 120),
      })
    } catch (err) {
      checks.push({
        id: `well-known-${f.path}`,
        label: f.label,
        level: "warning",
        detail: `Could not reach ${f.path} at ${baseUrl}. This is expected during local dev if the server isn't running.`,
        evidence: String(err).slice(0, 160),
      })
    }
  }
  return checks
}

function auditHeaders(headers: Headers | null): Check[] {
  if (!headers) {
    return [
      {
        id: "headers-unreachable",
        label: "Response headers",
        level: "warning",
        detail:
          "Could not fetch headers from the deployed site. Run this on a deployed preview or production URL.",
      },
    ]
  }
  return EXPECTED_HEADERS.map((h) => {
    const value = headers.get(h.key)
    const { level, detail } = h.validate(value)
    return {
      id: `header-${h.key}`,
      label: h.label,
      level,
      detail,
      evidence: value ?? undefined,
    }
  })
}

function auditRateLimit(): Check[] {
  const configured = isRateLimitConfigured()
  if (!configured) {
    return [
      {
        id: "rate-limit-configured",
        label: "Rate limiting (Upstash)",
        level: "error",
        detail:
          "KV_REST_API_URL / KV_REST_API_TOKEN are not set. Every limiter fails open, which means contact, signin, signup, and OTP endpoints are currently unprotected.",
        hint: "Connect Upstash for Redis in Project Settings → Integrations. Env vars are populated automatically.",
      },
    ]
  }
  return [
    {
      id: "rate-limit-configured",
      label: "Rate limiting (Upstash)",
      level: "ok",
      detail: `Connected. ${LIMITER_DEFINITIONS.length} limiters configured and active.`,
      evidence: LIMITER_DEFINITIONS.map(
        (l) => `${l.name}: ${l.limit}/${l.window}`,
      ).join("  ·  "),
    },
  ]
}

export async function runSecurityAudit(baseUrl: string): Promise<SecurityAudit> {
  const headers = await fetchHeaders(baseUrl)
  const checks: Check[] = [
    ...auditHeaders(headers),
    ...auditEnv(),
    ...auditRateLimit(),
    ...(await auditWellKnown(baseUrl)),
  ]
  const stats = checks.reduce(
    (acc, c) => {
      if (c.level === "ok") acc.ok++
      else if (c.level === "warning") acc.warning++
      else if (c.level === "error") acc.error++
      return acc
    },
    { ok: 0, warning: 0, error: 0 },
  )
  return {
    baseUrl,
    fetchedAt: new Date().toISOString(),
    checks,
    stats,
    rateLimit: {
      configured: isRateLimitConfigured(),
      limiters: LIMITER_DEFINITIONS.map((l) => ({
        name: l.name,
        description: l.description,
        limit: l.limit,
        window: String(l.window),
        prefix: l.prefix,
      })),
    },
  }
}
