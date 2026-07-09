import { type NextRequest, NextResponse } from "next/server"
import { checkLimit, getClientIdentifier } from "@/lib/security/rate-limit"

/**
 * Edge proxy (formerly middleware.ts in Next 15). Applies a general-purpose
 * rate limit to every /api/* request as a safety net. Route handlers that
 * need tighter limits (contact, signin, signup, otp) enforce their own
 * tighter bucket *inside* the handler.
 */

export const config = {
  matcher: ["/api/:path*"],
}

export async function proxy(req: NextRequest) {
  // Only rate-limit write requests here — GETs go through unrestricted so
  // dashboards and polling don't churn Redis.
  if (req.method === "GET" || req.method === "HEAD" || req.method === "OPTIONS") {
    return NextResponse.next()
  }

  const identifier = getClientIdentifier(req)
  const result = await checkLimit("api", identifier)

  if (!result.success) {
    return new NextResponse(
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

  const res = NextResponse.next()
  res.headers.set("X-RateLimit-Limit", String(result.limit))
  res.headers.set("X-RateLimit-Remaining", String(result.remaining))
  return res
}
