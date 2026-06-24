import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"
import type { NextRequest } from "next/server"

/**
 * Centralised rate-limiting for smslocal.in.
 *
 * Uses Upstash Redis + @upstash/ratelimit with sliding-window limiters so
 * bursts still get blocked without being too punishing for legitimate users.
 *
 * Every limiter is lazy: if the Upstash env vars are missing (e.g. CI, a
 * misconfigured preview, or a developer laptop without the integration), we
 * return a no-op limiter that always allows the request. This keeps the
 * marketing site functional in every environment while still enforcing limits
 * in production where the env is properly configured.
 */

const hasUpstash = Boolean(
  process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN,
)

const redis = hasUpstash
  ? new Redis({
      url: process.env.KV_REST_API_URL!,
      token: process.env.KV_REST_API_TOKEN!,
    })
  : null

export type LimiterResult = {
  success: boolean
  limit: number
  remaining: number
  reset: number
  retryAfterSeconds: number
  disabled?: boolean
}

type LimiterDef = {
  name: string
  /** Human description for the /dev/security dashboard. */
  description: string
  /** Max requests per window (see `window`). */
  limit: number
  /** Duration expressed as an @upstash/ratelimit `Duration` literal. */
  window: Parameters<typeof Ratelimit.slidingWindow>[1]
  /** Prefix used in Redis keys. */
  prefix: string
}

/**
 * The definitive list of rate-limiters used across the app. Adding a new
 * limiter here automatically surfaces it in the `/dev/security` dashboard.
 */
export const LIMITER_DEFINITIONS: readonly LimiterDef[] = [
  {
    name: "contact",
    description:
      "Contact-form submissions. Stops aggressive form-spam while still letting a real visitor retry 2–3 times if they hit a field-validation error.",
    limit: 5,
    window: "1 h",
    prefix: "rl:contact",
  },
  {
    name: "signin",
    description:
      "Signin POSTs. Tight limit so credential-stuffing attacks are shut down quickly. Legitimate users get more than enough attempts to handle a typo.",
    limit: 8,
    window: "15 m",
    prefix: "rl:signin",
  },
  {
    name: "signup",
    description:
      "New account creation. Prevents scripted signup abuse while still allowing marketing-event spikes.",
    limit: 5,
    window: "1 h",
    prefix: "rl:signup",
  },
  {
    name: "otp",
    description:
      "Forgot-password / OTP send endpoints. Keeps SMS cost under control and makes OTP-probing expensive for attackers.",
    limit: 4,
    window: "1 h",
    prefix: "rl:otp",
  },
  {
    name: "api",
    description:
      "General fallback for every /api/* route. Stops generic scraping and accidental retry storms.",
    limit: 60,
    window: "1 m",
    prefix: "rl:api",
  },
  {
    name: "track",
    description:
      "First-party analytics ingest (/api/track and /api/track/identify). Generous limit so legitimate SPAs with many interactions aren't blocked, but abusive event-spam is still stopped.",
    limit: 120,
    window: "1 m",
    prefix: "rl:track",
  },
  {
    name: "free_sms_ip",
    description:
      "Free-SMS public tool (/resources/tools/free-sms-without-registration) — per-IP cap. After 5 sends in any 7-day window, the IP is blocked from the tool until the window rolls.",
    limit: 5,
    window: "7 d",
    prefix: "rl:free-sms:ip",
  },
  {
    name: "free_sms_phone",
    description:
      "Free-SMS public tool — per-recipient-phone cap. After 2 sends to the same Indian mobile in any 7-day window, that number is blocked from the tool until the window rolls.",
    limit: 2,
    window: "7 d",
    prefix: "rl:free-sms:phone",
  },
] as const

export type LimiterName = (typeof LIMITER_DEFINITIONS)[number]["name"]

const limiterCache = new Map<LimiterName, Ratelimit | null>()

function getLimiter(name: LimiterName): Ratelimit | null {
  if (limiterCache.has(name)) return limiterCache.get(name)!
  if (!redis) {
    limiterCache.set(name, null)
    return null
  }
  const def = LIMITER_DEFINITIONS.find((d) => d.name === name)
  if (!def) throw new Error(`Unknown rate limiter: ${name}`)
  const limiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(def.limit, def.window),
    analytics: true,
    prefix: def.prefix,
  })
  limiterCache.set(name, limiter)
  return limiter
}

/**
 * Derive a stable identifier for the caller. Prefers the real edge-client IP
 * when we can find it, falls back to a hashed forwarded header, and finally
 * to a shared bucket (which is intentionally aggressive).
 */
export function getClientIdentifier(req: NextRequest | Request): string {
  const headers = "headers" in req ? req.headers : new Headers()
  const candidates = [
    headers.get("x-vercel-forwarded-for"),
    headers.get("x-real-ip"),
    headers.get("cf-connecting-ip"),
    headers.get("x-forwarded-for"),
  ]
  for (const c of candidates) {
    if (!c) continue
    // x-forwarded-for may be comma-separated; take the left-most entry.
    const ip = c.split(",")[0]?.trim()
    if (ip) return ip
  }
  return "anonymous"
}

/** Check a limit and get a structured result. Always resolves — never throws. */
export async function checkLimit(
  name: LimiterName,
  identifier: string,
): Promise<LimiterResult> {
  const def = LIMITER_DEFINITIONS.find((d) => d.name === name)!
  const limiter = getLimiter(name)

  if (!limiter) {
    // No Upstash configured — fail open (explicitly flagged so /dev/security
    // can tell the operator).
    return {
      success: true,
      limit: def.limit,
      remaining: def.limit,
      reset: Date.now() + 60_000,
      retryAfterSeconds: 0,
      disabled: true,
    }
  }

  try {
    const res = await limiter.limit(identifier)
    const retryAfter = Math.max(0, Math.ceil((res.reset - Date.now()) / 1000))
    return {
      success: res.success,
      limit: res.limit,
      remaining: res.remaining,
      reset: res.reset,
      retryAfterSeconds: retryAfter,
    }
  } catch (err) {
    console.error("[v0] rate-limit check failed", name, err)
    // Fail open on transient Redis errors — better to serve one extra request
    // than to block legitimate traffic.
    return {
      success: true,
      limit: def.limit,
      remaining: def.limit,
      reset: Date.now() + 60_000,
      retryAfterSeconds: 0,
      disabled: true,
    }
  }
}

/** Convert a LimiterResult into the right JSON Response when the limit is hit. */
export function rateLimitResponse(result: LimiterResult) {
  return new Response(
    JSON.stringify({
      error: "rate_limited",
      message:
        "You've sent too many requests. Please wait a moment and try again.",
      retryAfterSeconds: result.retryAfterSeconds,
    }),
    {
      status: 429,
      headers: {
        "Content-Type": "application/json",
        "Retry-After": String(result.retryAfterSeconds),
        "X-RateLimit-Limit": String(result.limit),
        "X-RateLimit-Remaining": String(result.remaining),
        "X-RateLimit-Reset": String(result.reset),
      },
    },
  )
}

export function isRateLimitConfigured() {
  return hasUpstash
}
