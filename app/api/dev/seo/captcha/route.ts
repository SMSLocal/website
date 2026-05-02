import { NextResponse } from "next/server"
import { isCaptchaConfigured, issueCaptcha } from "@/lib/seo/captcha"
import { checkIpAllowlist } from "@/lib/seo/ip-allowlist"
import { checkLimit, getClientIdentifier } from "@/lib/security/rate-limit"

/**
 * GET /api/dev/seo/captcha
 *
 * Issues a fresh math-captcha challenge. The login form calls this on mount
 * (and on every failed attempt) to populate the question shown to the user.
 *
 * Returns:
 *   200 { question: "7 + 4", token: "<opaque>" }   on success
 *   403 { error: "ip_forbidden" }                   if IP allowlist denies
 *   429 { error: "rate_limited" }                   on burst abuse
 *   503 { error: "not_configured" }                 if SEO_JWT_SECRET unset
 */
export const dynamic = "force-dynamic"

export async function GET(req: Request) {
  // Honour the IP allowlist on the captcha endpoint too — there's no value
  // in handing out fresh challenges to a blocked attacker.
  const ipCheck = checkIpAllowlist(req)
  if (!ipCheck.allowed) {
    return NextResponse.json({ error: "ip_forbidden" }, { status: 403 })
  }

  // Use the same `signin` bucket so an attacker can't farm tokens to
  // pre-compute future answers; legitimate operators only need 1 request
  // per page load.
  const id = getClientIdentifier(req)
  const rl = await checkLimit("signin", id).catch(() => null)
  if (rl && !rl.success) {
    return NextResponse.json(
      { error: "rate_limited", retryAfterSeconds: rl.retryAfterSeconds },
      { status: 429 },
    )
  }

  if (!isCaptchaConfigured()) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 })
  }

  const challenge = await issueCaptcha()
  if (!challenge) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 })
  }
  return NextResponse.json(challenge, {
    headers: { "Cache-Control": "no-store" },
  })
}
