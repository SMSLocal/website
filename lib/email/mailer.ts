import nodemailer, { type Transporter } from "nodemailer"

/**
 * Transactional email for website form notifications.
 *
 * smslocal.in is on Google Workspace (MX → aspmx.l.google.com) and its SPF is
 * `v=spf1 include:_spf.google.com -all` — a hard fail for any non-Google
 * sender. So mail must go out through Gmail's SMTP, which the defaults below
 * already point at. Only the two credential vars are actually required.
 *
 * Credentials come from the environment only — never commit them. Set these
 * in Vercel → Project → Settings → Environment Variables:
 *
 *   SMTP_USER      info@smslocal.in                       (required)
 *   SMTP_PASS      a Google **App Password**, not the     (required)
 *                  account password — generate it at
 *                  myaccount.google.com/apppasswords
 *                  (needs 2-Step Verification enabled)
 *
 *   SMTP_HOST      defaults to smtp.gmail.com             (optional)
 *   SMTP_PORT      defaults to 587 (STARTTLS)             (optional)
 *   SMTP_SECURE    "true" only when using port 465         (optional)
 *   MAIL_FROM      defaults to info@smslocal.in            (optional)
 *   MAIL_TO        defaults to info@smslocal.in            (optional)
 *                  (comma-separate for several recipients)
 *
 * Keep MAIL_FROM as info@smslocal.in unless the address is a verified
 * "send mail as" alias on that Workspace account — Gmail rewrites the From
 * header to the authenticated mailbox otherwise, so a noreply@ sender would
 * silently become info@ anyway.
 *
 * If SMTP is not configured the helpers below no-op rather than throw, so a
 * missing variable can never take the contact form down — the submission is
 * still accepted and logged.
 */

const HOST = process.env.SMTP_HOST ?? "smtp.gmail.com"
const PORT = Number(process.env.SMTP_PORT ?? 587)
const SECURE = process.env.SMTP_SECURE === "true"
const USER = process.env.SMTP_USER
const PASS = process.env.SMTP_PASS

export const MAIL_FROM = process.env.MAIL_FROM ?? "SMSLocal Website <info@smslocal.in>"
export const MAIL_TO = process.env.MAIL_TO ?? "info@smslocal.in"

/**
 * Host and port have working defaults, so configuration comes down to the
 * two secrets. Without them we skip sending rather than throwing.
 */
export function isMailConfigured(): boolean {
  return Boolean(USER && PASS)
}

let cached: Transporter | null = null

function getTransport(): Transporter | null {
  if (!isMailConfigured()) return null
  if (cached) return cached
  cached = nodemailer.createTransport({
    host: HOST,
    port: PORT,
    secure: SECURE,
    auth: { user: USER, pass: PASS },
  })
  return cached
}

export type MailInput = {
  subject: string
  /** Plain-text body. Always provide this — some clients prefer it. */
  text: string
  /** Optional HTML body. */
  html?: string
  /** Overrides MAIL_TO when set. */
  to?: string
  /** Set so a team member can hit reply and reach the enquirer directly. */
  replyTo?: string
}

/**
 * Send a notification email.
 *
 * Never throws: a transport failure is logged and reported via the return
 * value so callers can decide what to do. Form routes deliberately ignore a
 * failure and still return success to the visitor — losing the notification
 * is bad, but showing an error to someone who filled the form correctly is
 * worse, and the submission is logged either way.
 */
export async function sendMail(input: MailInput): Promise<{ ok: boolean; skipped?: boolean; error?: string }> {
  const transport = getTransport()
  if (!transport) {
    console.warn("[mail] SMTP not configured — skipping:", input.subject)
    return { ok: false, skipped: true }
  }

  try {
    await transport.sendMail({
      from: MAIL_FROM,
      to: input.to ?? MAIL_TO,
      replyTo: input.replyTo,
      subject: input.subject,
      text: input.text,
      html: input.html,
    })
    return { ok: true }
  } catch (err) {
    const error = err instanceof Error ? err.message : String(err)
    console.error("[mail] send failed:", input.subject, error)
    return { ok: false, error }
  }
}

/** Render a plain-text "Label: value" block, skipping empty values. */
export function textBlock(rows: [string, string | undefined][]): string {
  return rows
    .filter(([, v]) => typeof v === "string" && v.trim().length > 0)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n")
}

/** Minimal, email-client-safe HTML table for the same rows. */
export function htmlTable(rows: [string, string | undefined][]): string {
  const cells = rows
    .filter(([, v]) => typeof v === "string" && v.trim().length > 0)
    .map(
      ([k, v]) =>
        `<tr>` +
        `<td style="padding:6px 12px 6px 0;color:#666;font:14px system-ui,sans-serif;vertical-align:top;white-space:nowrap">${escapeHtml(k)}</td>` +
        `<td style="padding:6px 0;color:#111;font:14px system-ui,sans-serif">${escapeHtml(v!).replace(/\n/g, "<br>")}</td>` +
        `</tr>`,
    )
    .join("")
  return `<table cellpadding="0" cellspacing="0" style="border-collapse:collapse">${cells}</table>`
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}
