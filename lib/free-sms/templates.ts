/**
 * Fixed SMS templates for the free-SMS public tool. Non-editable by design:
 * unregistered SMS isn't legal in India under TRAI's DLT framework, so we
 * only ever send copy that we (SMSLocal, the registered Principal Entity)
 * have pre-approved as DLT-compliant promotional / transactional templates.
 *
 * Each template includes the brand suffix "- SMSLocal" so the recipient can
 * identify the sender, in line with TRAI's sender-ID guidelines.
 *
 * If you need to add or modify a template, do it here AND register it in
 * your DLT account with the same content. Keep the body within 160 chars
 * to avoid forcing concatenated SMS billing.
 */

export type FreeSmsTemplateId = "welcome" | "otp-sample"

export type FreeSmsTemplate = {
  id: FreeSmsTemplateId
  /** Short label shown on the picker tile. */
  label: string
  /** One-line description for accessibility / tooltip. */
  description: string
  /** The exact SMS body that will be sent. Read-only. */
  body: string
  /** Suggested category badge ("Promotional" / "Transactional" / etc). */
  category: "Promotional" | "Transactional"
}

export const FREE_SMS_TEMPLATES: readonly FreeSmsTemplate[] = [
  {
    id: "welcome",
    label: "Welcome from SMSLocal",
    description:
      "Friendly intro that invites the recipient to try the service.",
    category: "Promotional",
    body:
      "Hi! Try SMSLocal - India's fastest DLT-compliant SMS API. Get Rs.60 free credit on signup at smslocal.in. Reply STOP to opt-out. - SMSLocal",
  },
  {
    id: "otp-sample",
    label: "Sample OTP alert",
    description:
      "Demonstrates how an OTP from SMSLocal looks on the recipient's phone.",
    category: "Transactional",
    body:
      "Your SMSLocal verification code is 482931. Valid for 10 minutes. Do not share this code with anyone. - SMSLocal",
  },
] as const

export function getFreeSmsTemplate(
  id: string | undefined | null,
): FreeSmsTemplate | undefined {
  if (!id) return undefined
  return FREE_SMS_TEMPLATES.find((t) => t.id === id)
}

/** Default template surfaced when the form first renders. */
export const DEFAULT_FREE_SMS_TEMPLATE: FreeSmsTemplate = FREE_SMS_TEMPLATES[0]
