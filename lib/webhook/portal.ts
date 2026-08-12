/**
 * Lead forwarding to the MCM BPO webhook portal.
 *
 * The portal is a PHP handler, so the payload is sent as
 * application/x-www-form-urlencoded — that is what populates $_POST. Field
 * names are capitalised to match the portal's expected keys exactly:
 *
 *   Name, Email, Phone, Country, Message, Service, Website
 *
 * Override the destination with CONTACT_WEBHOOK_URL. Set it to an empty
 * string to disable forwarding entirely.
 *
 * NOTE: `Website` here is a constant identifying which site the lead came
 * from. It is unrelated to the contact form's hidden `website` honeypot
 * field, which must stay empty and never reaches this function.
 */

const DEFAULT_WEBHOOK_URL = "https://form.mcmbpo.com/webhook-handler.php"
const TIMEOUT_MS = 8_000

export type PortalLead = {
  Name: string
  Email: string
  Phone: string
  Country: string
  Message: string
  Service: string
  Website: string
}

export function getWebhookUrl(): string {
  const configured = process.env.CONTACT_WEBHOOK_URL
  return configured === undefined ? DEFAULT_WEBHOOK_URL : configured
}

/**
 * POST a lead to the portal.
 *
 * Never throws — a portal outage must not turn a valid enquiry into an error
 * for the visitor. Callers log the outcome and carry on.
 */
export async function sendToPortal(
  lead: PortalLead,
): Promise<{ ok: boolean; skipped?: boolean; status?: number; error?: string }> {
  const url = getWebhookUrl()
  if (!url) {
    console.warn("[webhook] CONTACT_WEBHOOK_URL is empty — skipping forward")
    return { ok: false, skipped: true }
  }

  const form = new URLSearchParams()
  for (const [key, value] of Object.entries(lead)) {
    form.set(key, value ?? "")
  }

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        Accept: "*/*",
      },
      body: form.toString(),
      signal: controller.signal,
      cache: "no-store",
    })
    if (!res.ok) {
      const text = await res.text().catch(() => "")
      console.error("[webhook] portal rejected lead", res.status, text.slice(0, 300))
      return { ok: false, status: res.status, error: text.slice(0, 300) }
    }
    return { ok: true, status: res.status }
  } catch (err) {
    const error = err instanceof Error ? err.message : String(err)
    console.error("[webhook] portal post failed:", error)
    return { ok: false, error }
  } finally {
    clearTimeout(timer)
  }
}
