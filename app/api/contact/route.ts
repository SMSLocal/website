import {
  checkLimit,
  getClientIdentifier,
  rateLimitResponse,
} from "@/lib/security/rate-limit"
import { htmlTable, sendMail, textBlock } from "@/lib/email/mailer"

/**
 * Contact-form endpoint.
 *
 * Rate-limited at 5 / hour / IP via the `contact` limiter. When the wallet
 * CRM/webhook is wired in a later phase, payloads land here first so the
 * rate-limit and validation layer stays in one place.
 */

export const runtime = "nodejs"

const MAX_BODY_BYTES = 10 * 1024 // 10 KB is plenty for a contact form
const FIELD_MAX = 2_000

type ContactPayload = {
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  company?: string
  interest?: string
  volume?: string
  message?: string
  // Honeypot — must be empty. If a bot fills it, drop silently.
  website?: string
}

function jsonError(status: number, error: string, message: string) {
  return new Response(JSON.stringify({ error, message }), {
    status,
    headers: { "Content-Type": "application/json" },
  })
}

function validate(body: ContactPayload): { ok: true } | { ok: false; field: string; message: string } {
  const required: (keyof ContactPayload)[] = ["firstName", "lastName", "email", "company", "message"]
  for (const key of required) {
    const v = body[key]
    if (typeof v !== "string" || v.trim().length === 0) {
      return { ok: false, field: key, message: `Missing ${key}` }
    }
    if (v.length > FIELD_MAX) {
      return { ok: false, field: key, message: `${key} is too long` }
    }
  }
  const email = body.email!.trim()
  // Pragmatic email check — deeper validation happens in the CRM/webhook.
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return { ok: false, field: "email", message: "Enter a valid email address" }
  }
  return { ok: true }
}

export async function POST(req: Request) {
  // ---- Size guard (before parsing)
  const lengthHeader = req.headers.get("content-length")
  if (lengthHeader && Number(lengthHeader) > MAX_BODY_BYTES) {
    return jsonError(413, "payload_too_large", "Message is too large.")
  }

  // ---- Rate limit
  const identifier = getClientIdentifier(req)
  const rate = await checkLimit("contact", identifier)
  if (!rate.success) return rateLimitResponse(rate)

  // ---- Parse
  let body: ContactPayload
  try {
    body = (await req.json()) as ContactPayload
  } catch {
    return jsonError(400, "invalid_json", "Request body must be JSON.")
  }

  // ---- Honeypot: silently accept so the bot thinks it worked
  if (body.website && body.website.trim().length > 0) {
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  }

  // ---- Validation
  const result = validate(body)
  if (!result.ok) {
    return jsonError(400, "invalid_input", result.message)
  }

  // ---- Log first, so the submission survives even if the mail hop fails.
  console.log("[v0] contact submission", {
    email: body.email,
    company: body.company,
    interest: body.interest,
    volume: body.volume,
    messageLength: body.message?.length ?? 0,
    identifier,
  })

  // ---- Notify the team by email.
  const name = `${body.firstName?.trim() ?? ""} ${body.lastName?.trim() ?? ""}`.trim()
  const rows: [string, string | undefined][] = [
    ["Name", name],
    ["Email", body.email?.trim()],
    ["Phone", body.phone?.trim()],
    ["Company", body.company?.trim()],
    ["Interest", body.interest?.trim()],
    ["Monthly volume", body.volume?.trim()],
    ["Message", body.message?.trim()],
    ["Source", "smslocal.in — /company/contact/"],
  ]

  // Deliberately not awaited into the response path's failure handling: a
  // dead SMTP box must not turn a valid submission into an error for the
  // visitor. sendMail never throws; it reports failure via its return value.
  const mail = await sendMail({
    subject: `New enquiry — ${name || body.email} ${body.company ? `(${body.company})` : ""}`.trim(),
    text: textBlock(rows),
    html: htmlTable(rows),
    // Lets the team reply straight to the enquirer from their inbox.
    replyTo: body.email?.trim(),
  })
  if (!mail.ok && !mail.skipped) {
    console.error("[v0] contact notification failed", { email: body.email, error: mail.error })
  }

  return new Response(
    JSON.stringify({
      ok: true,
      message: "We received your message and will respond within one business day.",
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "X-RateLimit-Limit": String(rate.limit),
        "X-RateLimit-Remaining": String(rate.remaining),
      },
    },
  )
}
