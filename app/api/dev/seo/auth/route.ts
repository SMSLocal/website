import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import {
  SEO_COOKIE,
  SESSION_COOKIE_OPTIONS,
  isAuthConfigured,
  issueToken,
  verifyCredentials,
} from "@/lib/seo/auth"
import { isCaptchaConfigured, verifyCaptcha } from "@/lib/seo/captcha"
import { checkIpAllowlist } from "@/lib/seo/ip-allowlist"
import { checkLimit, getClientIdentifier } from "@/lib/security/rate-limit"

type LoginBody = {
  action?: "login" | "logout"
  username?: string
  password?: string
  captchaAnswer?: string | number
  captchaToken?: string
}

/**
 * POST /api/dev/seo/auth
 *   body: { action: "login", username, password, captchaAnswer, captchaToken }
 *       | { action: "logout" }
 *
 * Defence layers, applied in order:
 *   1. IP allowlist (`SEO_ADMIN_IP_ALLOWLIST`) — outright reject if denied.
 *   2. Sliding-window rate limit (`signin` bucket) — 8 attempts / 15 min.
 *   3. HMAC-signed math captcha — must be solved on every login attempt.
 *   4. Username + password constant-time comparison.
 *   5. JWT issued + httpOnly cookie set.
 */
export async function POST(req: Request) {
  // 1) IP allowlist gate. Even logout is gated so a leaked session cookie
  //    can't be invalidated from outside the allowed network.
  const ipCheck = checkIpAllowlist(req)
  if (!ipCheck.allowed) {
    return NextResponse.json(
      {
        error: "ip_forbidden",
        message:
          "Your IP address is not on the SEO admin allowlist. Contact the site owner to be added.",
      },
      { status: 403 },
    )
  }

  // 2) Rate limit.
  const id = getClientIdentifier(req)
  const rl = await checkLimit("signin", id).catch(() => null)
  if (rl && !rl.success) {
    return NextResponse.json(
      { error: "rate_limited", retryAfterSeconds: rl.retryAfterSeconds },
      { status: 429 },
    )
  }

  let body: LoginBody = {}
  try {
    body = (await req.json()) as LoginBody
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 })
  }

  if (body.action === "logout") {
    const res = NextResponse.json({ ok: true })
    res.cookies.set(SEO_COOKIE, "", { ...SESSION_COOKIE_OPTIONS, maxAge: 0 })
    return res
  }

  if (!isAuthConfigured()) {
    return NextResponse.json(
      {
        error: "not_configured",
        message:
          "Set SEO_ADMIN_USER, SEO_ADMIN_PASS, and SEO_JWT_SECRET environment variables before signing in.",
      },
      { status: 503 },
    )
  }

  // 3) Captcha. Runs before credentials so failed attempts cost an extra
  //    HMAC verify instead of a chance at a real password match.
  if (isCaptchaConfigured()) {
    const captchaResult = await verifyCaptcha(
      body.captchaToken,
      body.captchaAnswer,
    )
    if (!captchaResult.ok) {
      const message =
        captchaResult.reason === "expired"
          ? "Captcha expired. Please solve the new question."
          : captchaResult.reason === "wrong_answer"
            ? "Captcha answer was incorrect."
            : "Captcha failed. Please try again."
      return NextResponse.json(
        { error: "captcha_failed", reason: captchaResult.reason, message },
        { status: 400 },
      )
    }
  }

  const username = String(body.username ?? "")
  const password = String(body.password ?? "")
  if (!username || !password) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 })
  }

  // 4) Credentials.
  const ok = await verifyCredentials(username, password)
  if (!ok) {
    return NextResponse.json({ error: "invalid_credentials" }, { status: 401 })
  }

  // 5) Issue session.
  const token = await issueToken(username)
  if (!token) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 })
  }

  const cookieStore = await cookies()
  cookieStore.set(SEO_COOKIE, token, SESSION_COOKIE_OPTIONS)
  return NextResponse.json({ ok: true })
}
