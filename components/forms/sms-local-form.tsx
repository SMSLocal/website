"use client"

/**
 * SmsLocalForm — the in-page widget that drops into the hero banner of
 * /resources/tools/free-sms-without-registration as the equivalent of the
 * legacy [sms_local_form] WordPress shortcode.
 *
 * Behaviour:
 *  - Two pre-approved, non-editable SMSLocal-branded templates (Welcome,
 *    Sample OTP). The visitor picks ONE — they cannot edit the body.
 *  - Recipient phone is the only free-text input besides the captcha.
 *  - HMAC-signed math captcha fetched from /api/tools/free-sms/captcha.
 *  - On submit POSTs /api/tools/free-sms/send which enforces:
 *      • 5 messages per IP per 7 days
 *      • 2 messages per recipient phone per 7 days
 *    Block responses (429) are rendered inline with a clear explanation
 *    and a friendly "try again in N days" countdown.
 *
 * Why not a real send? Unregistered SMS is illegal in India under TRAI's
 * DLT framework. After a successful submission we redirect to /signup so
 * the visitor can claim their Rs.60 free credit and dispatch the same
 * pre-approved template from a registered Principal Entity.
 */

import { useEffect, useId, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Lock,
  Loader2,
  MessageSquare,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Timer,
} from "lucide-react"
import {
  DEFAULT_FREE_SMS_TEMPLATE,
  FREE_SMS_TEMPLATES,
  type FreeSmsTemplateId,
} from "@/lib/free-sms/templates"

const E164_IN = /^[6-9]\d{9}$/

type SendResponse = {
  ok?: boolean
  error?: string
  reason?: string
  message?: string
  source?: "ip" | "phone"
  retryAfterHuman?: string
  retryAfterSeconds?: number
  template?: { id: string; label: string; body: string }
  delivery?: { to: string; maskedTo: string }
  quotas?: {
    ip?: { remaining: number; limit: number; windowDays: number }
    phone?: { remaining: number; limit: number; windowDays: number }
  }
}

type CaptchaState = {
  question: string
  token: string
  loading: boolean
  error: string | null
}

export function SmsLocalForm() {
  const router = useRouter()
  const phoneId = useId()
  const captchaId = useId()
  const tplGroup = useId()

  const [phone, setPhone] = useState("")
  const [templateId, setTemplateId] = useState<FreeSmsTemplateId>(
    DEFAULT_FREE_SMS_TEMPLATE.id,
  )
  const [captcha, setCaptcha] = useState<CaptchaState>({
    question: "",
    token: "",
    loading: true,
    error: null,
  })
  const [captchaAnswer, setCaptchaAnswer] = useState("")
  const [agree, setAgree] = useState(true)
  const [stage, setStage] = useState<"form" | "submitting" | "sent" | "blocked">(
    "form",
  )
  const [error, setError] = useState<string | null>(null)
  const [blockInfo, setBlockInfo] = useState<{
    source: "ip" | "phone"
    retryAfterHuman: string
    message: string
  } | null>(null)
  const [quotas, setQuotas] = useState<SendResponse["quotas"] | null>(null)

  const selectedTemplate = useMemo(
    () =>
      FREE_SMS_TEMPLATES.find((t) => t.id === templateId) ??
      DEFAULT_FREE_SMS_TEMPLATE,
    [templateId],
  )

  const phoneClean = phone.replace(/\D/g, "").slice(-10)
  const phoneValid = E164_IN.test(phoneClean)

  /** Refresh captcha from server. Memoised via state setter. */
  async function loadCaptcha() {
    setCaptcha((c) => ({ ...c, loading: true, error: null }))
    setCaptchaAnswer("")
    try {
      const res = await fetch("/api/tools/free-sms/captcha", { cache: "no-store" })
      const data = (await res.json()) as {
        question?: string
        token?: string
        error?: string
      }
      if (!res.ok || !data.question || !data.token) {
        throw new Error(data.error ?? `HTTP ${res.status}`)
      }
      setCaptcha({
        question: data.question,
        token: data.token,
        loading: false,
        error: null,
      })
    } catch (err) {
      setCaptcha({
        question: "",
        token: "",
        loading: false,
        error:
          err instanceof Error ? err.message : "Could not load the maths check.",
      })
    }
  }

  useEffect(() => {
    loadCaptcha()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const canSubmit =
    phoneValid &&
    agree &&
    captchaAnswer.trim().length > 0 &&
    !captcha.loading &&
    captcha.token.length > 0 &&
    stage === "form"

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)

    if (!phoneValid) {
      setError("Enter a valid 10-digit Indian mobile number.")
      return
    }
    if (!agree) {
      setError("Please confirm you agree to the terms.")
      return
    }
    if (!captcha.token) {
      setError("The maths check could not be loaded. Please refresh.")
      return
    }

    setStage("submitting")
    try {
      const res = await fetch("/api/tools/free-sms/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: phoneClean,
          templateId,
          captchaToken: captcha.token,
          captchaAnswer,
        }),
      })
      const data = (await res.json()) as SendResponse

      if (res.status === 429 && data.error === "blocked") {
        setBlockInfo({
          source: data.source ?? "ip",
          retryAfterHuman: data.retryAfterHuman ?? "7 days",
          message: data.message ?? "Limit reached. Please try again later.",
        })
        setStage("blocked")
        return
      }

      if (!res.ok || !data.ok) {
        const msg = data.message ?? "Could not send the message. Please try again."
        setError(msg)
        // Re-issue captcha so a wrong answer doesn't trap the user.
        await loadCaptcha()
        setStage("form")
        return
      }

      setQuotas(data.quotas ?? null)
      setStage("sent")

      // After 1.2s redirect to signup with template prefilled so the user
      // can complete the actual SMS dispatch from a registered sender.
      const params = new URLSearchParams({
        phone: `91${phoneClean}`,
        templateId,
        from: "free-sms-tool",
      })
      setTimeout(() => router.push(`/signup?${params.toString()}`), 1200)
    } catch (err) {
      console.log("[v0] free-sms submit failed", err)
      setError("Network error — please try again in a moment.")
      setStage("form")
    }
  }

  /* ───────────────── Blocked state ───────────────── */
  if (stage === "blocked" && blockInfo) {
    return (
      <aside
        role="alert"
        aria-live="assertive"
        className="relative overflow-hidden rounded-2xl border border-amber-300/40 bg-white/95 p-6 shadow-2xl shadow-black/30 backdrop-blur"
      >
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-amber-500/15 text-amber-700 ring-1 ring-amber-500/30">
            <Timer className="h-6 w-6" />
          </div>
          <div className="min-w-0">
            <h3 className="text-[16px] font-semibold tracking-tight text-foreground">
              {blockInfo.source === "ip"
                ? "This network has reached its free-SMS limit"
                : "This mobile number has reached its free-SMS limit"}
            </h3>
            <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
              {blockInfo.message}
            </p>
            <div className="mt-3 inline-flex items-center gap-2 rounded-md bg-amber-500/10 px-2.5 py-1 text-[11.5px] font-semibold text-amber-700 ring-1 ring-amber-500/25">
              <Timer className="h-3.5 w-3.5" />
              Unblocks in {blockInfo.retryAfterHuman}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => router.push("/signup?from=free-sms-blocked")}
                className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-primary px-4 text-[12.5px] font-semibold text-primary-foreground shadow-md shadow-primary/25 hover:brightness-110"
              >
                Sign up for unlimited sends
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setBlockInfo(null)
                  setStage("form")
                  loadCaptcha()
                }}
                className="inline-flex h-9 items-center rounded-lg border border-foreground/15 bg-background px-4 text-[12.5px] font-medium hover:bg-foreground/5"
              >
                Try a different number
              </button>
            </div>
          </div>
        </div>
      </aside>
    )
  }

  /* ───────────────── Sent state ───────────────── */
  if (stage === "sent") {
    return (
      <aside
        aria-live="polite"
        className="relative overflow-hidden rounded-2xl border border-emerald-300/30 bg-white/95 p-7 shadow-2xl shadow-black/30 backdrop-blur"
      >
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600 ring-1 ring-emerald-500/30">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div className="min-w-0">
            <h3 className="text-[16px] font-semibold tracking-tight text-foreground">
              Message queued — claim your Rs.60 to send it.
            </h3>
            <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
              We&apos;ll take you to signup with the template saved. Verify
              your email and the SMS lands on{" "}
              <span className="font-mono text-foreground">
                +91 {phoneClean.slice(0, 5)} {phoneClean.slice(5)}
              </span>{" "}
              within seconds.
            </p>
            {quotas?.ip ? (
              <p className="mt-3 text-[11.5px] text-muted-foreground">
                Free-tool quota remaining for your network:{" "}
                <span className="font-semibold text-foreground">
                  {quotas.ip.remaining}/{quotas.ip.limit}
                </span>{" "}
                in the next 7 days.
              </p>
            ) : null}
            <p className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-semibold text-primary">
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Redirecting to signup…
            </p>
          </div>
        </div>
      </aside>
    )
  }

  /* ───────────────── Form ───────────────── */
  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/95 p-5 text-foreground shadow-2xl shadow-black/30 backdrop-blur sm:p-6"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-emerald-500/15 blur-3xl"
      />

      {/* Header */}
      <header className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/15">
            <MessageSquare className="h-[18px] w-[18px]" aria-hidden />
          </div>
          <div>
            <p className="text-[14px] font-semibold leading-none tracking-tight">
              Send a free SMS
            </p>
            <p className="mt-1 text-[11.5px] text-muted-foreground">
              Pick a template &amp; recipient — Rs.60 free with email signup
            </p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-emerald-700 ring-1 ring-emerald-500/25">
          <Sparkles className="h-3 w-3" />
          Free trial
        </span>
      </header>

      {/* Template picker — dropdown + locked preview */}
      <div className="mt-5 space-y-1.5">
        <label
          htmlFor={tplGroup}
          className="inline-flex items-center gap-1.5 text-[12px] font-medium text-foreground/85"
        >
          <Lock className="h-3 w-3 text-muted-foreground" aria-hidden />
          Pre-approved template (DLT-compliant, not editable)
        </label>

        <div className="relative">
          <select
            id={tplGroup}
            value={templateId}
            onChange={(e) => setTemplateId(e.target.value as FreeSmsTemplateId)}
            className="w-full appearance-none rounded-lg border border-foreground/15 bg-background px-3 py-2.5 pr-9 text-[13.5px] text-foreground outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/15"
          >
            {FREE_SMS_TEMPLATES.map((t) => (
              <option key={t.id} value={t.id}>
                {t.label} — {t.category}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
        </div>

        {/* Locked body preview — visually reinforces "you cannot edit this" */}
        <div
          aria-live="polite"
          className="rounded-lg border border-dashed border-foreground/15 bg-foreground/[0.03] p-3"
        >
          <div className="mb-1.5 flex items-center justify-between">
            <span
              className={`rounded-full px-2 py-0.5 text-[9.5px] font-semibold uppercase tracking-[0.1em] ${
                selectedTemplate.category === "Transactional"
                  ? "bg-sky-500/10 text-sky-700 ring-1 ring-sky-500/20"
                  : "bg-emerald-500/10 text-emerald-700 ring-1 ring-emerald-500/20"
              }`}
            >
              {selectedTemplate.category}
            </span>
            <span className="inline-flex items-center gap-1 text-[10.5px] text-muted-foreground">
              <Lock className="h-3 w-3" aria-hidden />
              Locked
            </span>
          </div>
          <p className="text-[12.5px] leading-relaxed text-foreground/85">
            {selectedTemplate.body}
          </p>
        </div>
      </div>

      {/* Phone */}
      <div className="mt-4 space-y-1.5">
        <label
          htmlFor={phoneId}
          className="block text-[12px] font-medium text-foreground/85"
        >
          Recipient mobile number
        </label>
        <div className="flex items-stretch overflow-hidden rounded-lg border border-foreground/15 bg-background focus-within:border-primary/60 focus-within:ring-2 focus-within:ring-primary/15">
          <span className="flex select-none items-center gap-1 border-r border-foreground/10 bg-foreground/[0.04] px-3 text-[13px] font-medium text-muted-foreground">
            <span aria-hidden>{"\uD83C\uDDEE\uD83C\uDDF3"}</span>
            +91
          </span>
          <input
            id={phoneId}
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            maxLength={10}
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
            placeholder="98765 43210"
            aria-invalid={phone.length > 0 && !phoneValid}
            className="w-full bg-transparent px-3 py-2.5 text-[14px] outline-none placeholder:text-muted-foreground/60"
          />
        </div>
        {phone.length > 0 && !phoneValid ? (
          <p className="text-[11.5px] text-destructive">
            Use a 10-digit Indian mobile starting with 6, 7, 8 or 9.
          </p>
        ) : null}
        <p className="text-[11px] text-muted-foreground">
          Each recipient can receive only 2 free messages per 7-day window.
        </p>
      </div>

      {/* Captcha + submit */}
      <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label
              htmlFor={captchaId}
              className="text-[12px] font-medium text-foreground/85"
            >
              Quick check{" "}
              {captcha.loading ? (
                <span className="text-muted-foreground">— loading…</span>
              ) : captcha.error ? (
                <span className="text-destructive">— retry below</span>
              ) : (
                <>
                  —{" "}
                  <span className="font-semibold tabular-nums text-foreground">
                    {captcha.question}
                  </span>
                </>
              )}
            </label>
            <button
              type="button"
              onClick={loadCaptcha}
              disabled={captcha.loading}
              className="inline-flex items-center gap-1 rounded text-[10.5px] font-medium text-muted-foreground hover:text-foreground disabled:opacity-50"
              aria-label="Reload maths check"
            >
              <RefreshCw
                className={`h-3 w-3 ${captcha.loading ? "animate-spin" : ""}`}
              />
              Refresh
            </button>
          </div>
          <input
            id={captchaId}
            type="text"
            inputMode="numeric"
            value={captchaAnswer}
            onChange={(e) =>
              setCaptchaAnswer(e.target.value.replace(/[^\d-]/g, "").slice(0, 3))
            }
            placeholder="Answer"
            disabled={captcha.loading || !!captcha.error}
            className="w-full rounded-lg border border-foreground/15 bg-background px-3 py-2.5 text-[13.5px] outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/15 disabled:bg-muted/50"
          />
        </div>
        <button
          type="submit"
          disabled={!canSubmit}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-[13px] font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
        >
          {stage === "submitting" ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              Send free SMS
              <ArrowRight className="h-3.5 w-3.5" />
            </>
          )}
        </button>
      </div>

      <label className="mt-4 flex items-start gap-2.5 text-[11.5px] leading-relaxed text-muted-foreground">
        <input
          type="checkbox"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
          className="mt-0.5 h-3.5 w-3.5 rounded border-foreground/25 text-primary focus:ring-primary"
        />
        <span>
          I confirm the recipient has consented and I&apos;ll comply with TRAI
          DLT rules. SMSLocal sends from a registered Principal Entity using
          the template shown above (no edits possible).
        </span>
      </label>

      {error ? (
        <p
          role="alert"
          className="mt-3 rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-[12px] text-destructive"
        >
          {error}
        </p>
      ) : null}

      <footer className="mt-4 flex items-center justify-between gap-3 border-t border-foreground/10 pt-3 text-[11px] text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
          DLT-compliant · TLS encrypted
        </span>
        <span className="hidden sm:inline">
          5 sends / IP / 7 days · 2 sends / number / 7 days
        </span>
      </footer>
    </form>
  )
}
