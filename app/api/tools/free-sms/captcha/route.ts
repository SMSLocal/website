import { NextResponse } from "next/server"
import { isCaptchaConfigured, issueCaptcha } from "@/lib/seo/captcha"

/**
 * GET /api/tools/free-sms/captcha
 *
 * Public, unauthenticated endpoint that hands the free-SMS form a fresh
 * HMAC-signed math challenge. We deliberately use the same captcha module
 * the SEO admin uses so the verification path is identical — but expose it
 * here without the IP allowlist so any visitor can solve it.
 *
 * Stateless by design: the answer travels back to us inside the signed
 * token, so no Redis writes happen on issue.
 */
export const dynamic = "force-dynamic"
export const runtime = "nodejs"

export async function GET() {
  if (!isCaptchaConfigured()) {
    return NextResponse.json(
      {
        error: "captcha_not_configured",
        message:
          "Captcha cannot be issued — SEO_JWT_SECRET environment variable is missing.",
      },
      { status: 503 },
    )
  }

  const challenge = await issueCaptcha()
  if (!challenge) {
    // Belt-and-braces: `isCaptchaConfigured()` already verified the secret
    // is present, but `issueCaptcha()` re-reads the env at call time and
    // returns null if it's somehow vanished. Surface the same shape as
    // the not-configured branch so the client renders a clean error.
    return NextResponse.json(
      {
        error: "captcha_not_configured",
        message:
          "Captcha cannot be issued — SEO_JWT_SECRET environment variable is missing.",
      },
      { status: 503 },
    )
  }
  return NextResponse.json(
    {
      question: challenge.question,
      token: challenge.token,
    },
    {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    },
  )
}
