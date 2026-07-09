import { NextResponse } from "next/server"
import { isCaptchaConfigured, verifyCaptcha } from "@/lib/seo/captcha"
import {
  DEFAULT_FREE_SMS_TEMPLATE,
  type FreeSmsTemplateId,
  getFreeSmsTemplate,
} from "@/lib/free-sms/templates"
import {
  checkLimit,
  getClientIdentifier,
  isRateLimitConfigured,
} from "@/lib/security/rate-limit"

/**
 * POST /api/tools/free-sms/send
 *   body: { phone: "9876543210", templateId: "welcome" | "otp-sample",
 *           captchaToken, captchaAnswer }
 *
 * Defence layers, in order:
 *   1. Captcha verification (HMAC-signed, 5-min TTL).
 *   2. Phone format validation (10-digit Indian mobile).
 *   3. Per-IP rolling cap — 5 sends per 7 days. Once tripped, the IP is
 *      effectively blocked from the tool until the oldest send falls out
 *      of the 7-day window.
 *   4. Per-recipient-phone rolling cap — 2 sends per 7 days, same logic.
 *
 * Both caps are enforced via Upstash sliding-window limiters, so "block for
 * 7 days" reads naturally as "this IP / phone has hit its cap; the next
 * send is allowed when one of its previous sends ages past the 7-day mark".
 *
 * On success this route does NOT actually dispatch SMS through a gateway:
 * unregistered SMS is illegal in India under TRAI DLT, so the tool records
 * the intent, returns success, and the page redirects the visitor to /signup
 * to complete the send from a registered Principal Entity. The rate limits
 * still apply so abusers can't spam the funnel.
 */

const E164_IN = /^[6-9]\d{9}$/

type SendBody = {
  phone?: string
  templateId?: FreeSmsTemplateId
  captchaToken?: string
  captchaAnswer?: string | number
}

function blockedResponse(
  source: "ip" | "phone",
  retryAfterSeconds: number,
  meta: { ip?: string; phone?: string },
) {
  const totalSeconds = Math.max(0, retryAfterSeconds)
  const days = Math.floor(totalSeconds / 86_400)
  const hours = Math.floor((totalSeconds % 86_400) / 3600)
  const friendly =
    days >= 1
      ? `${days} day${days === 1 ? "" : "s"}${
          hours > 0 ? ` ${hours} hr` : ""
        }`
      : hours >= 1
        ? `${hours} hour${hours === 1 ? "" : "s"}`
        : `${Math.max(1, Math.ceil(totalSeconds / 60))} minutes`

  const message =
    source === "ip"
      ? `This IP address has reached the free-SMS limit (5 messages per 7 days). Try again in ${friendly}, or sign up for a free account to send more.`
      : `This mobile number has already received the maximum of 2 free messages in a 7-day window. Try again in ${friendly}, or sign up to send more.`

  return NextResponse.json(
    {
      error: "blocked",
      source,
      retryAfterSeconds: totalSeconds,
      retryAfterHuman: friendly,
      message,
      meta,
    },
    {
      status: 429,
      headers: {
        "Retry-After": String(totalSeconds),
        "Cache-Control": "no-store",
      },
    },
  )
}

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function POST(req: Request) {
  if (!isRateLimitConfigured()) {
    return NextResponse.json(
      {
        error: "service_unavailable",
        message:
          "The free-SMS tool is temporarily unavailable. Please try again later.",
      },
      { status: 503 },
    )
  }

  let body: SendBody = {}
  try {
    body = (await req.json()) as SendBody
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 })
  }

  // 1) Captcha
  if (isCaptchaConfigured()) {
    const captchaResult = await verifyCaptcha(
      body.captchaToken,
      body.captchaAnswer,
    )
    if (!captchaResult.ok) {
      return NextResponse.json(
        {
          error: "captcha_failed",
          reason: captchaResult.reason,
          message:
            captchaResult.reason === "expired"
              ? "The maths check expired. Solve the new question and try again."
              : "That answer was not correct. Try the new maths check.",
        },
        { status: 400 },
      )
    }
  }

  // 2) Phone format
  const phoneRaw = String(body.phone ?? "").replace(/\D/g, "")
  const phone = phoneRaw.slice(-10)
  if (!E164_IN.test(phone)) {
    return NextResponse.json(
      {
        error: "invalid_phone",
        message:
          "Enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.",
      },
      { status: 400 },
    )
  }

  // 3) Template resolution. We ONLY accept the IDs of the pre-approved
  //    templates — the body is not user-editable.
  const template =
    getFreeSmsTemplate(body.templateId) ?? DEFAULT_FREE_SMS_TEMPLATE

  // 4) Per-IP cap
  const ip = getClientIdentifier(req)
  const ipLimit = await checkLimit("free_sms_ip", ip)
  if (!ipLimit.success) {
    return blockedResponse("ip", ipLimit.retryAfterSeconds, { ip })
  }

  // 5) Per-recipient-phone cap
  const phoneLimit = await checkLimit("free_sms_phone", phone)
  if (!phoneLimit.success) {
    return blockedResponse("phone", phoneLimit.retryAfterSeconds, { phone })
  }

  // Audit log so /dev/security can show this (the rate-limiter already
  // tracks aggregates; this is just for the operator's terminal).
  console.log("[v0] free-sms send", {
    ip,
    phone: `${phone.slice(0, 5)}xxxxx`,
    template: template.id,
    ipRemaining: ipLimit.remaining,
    phoneRemaining: phoneLimit.remaining,
  })

  // Hand back the recorded send + the (read-only) message body so the
  // form can show exactly what would be delivered. The actual dispatch
  // happens after signup from a DLT-registered sender.
  return NextResponse.json({
    ok: true,
    template: {
      id: template.id,
      label: template.label,
      body: template.body,
    },
    delivery: {
      to: `+91${phone}`,
      maskedTo: `+91 ${phone.slice(0, 5)} xxxxx`,
    },
    quotas: {
      ip: {
        remaining: Math.max(0, ipLimit.remaining),
        limit: ipLimit.limit,
        windowDays: 7,
      },
      phone: {
        remaining: Math.max(0, phoneLimit.remaining),
        limit: phoneLimit.limit,
        windowDays: 7,
      },
    },
  })
}
