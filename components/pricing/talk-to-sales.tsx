"use client"

import { useState } from "react"
import { AlertCircle, ArrowRight, Check, CheckCircle2, Headphones, Loader2, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const CHANNELS = ["WhatsApp", "SMS", "Email", "RCS", "Messenger", "Instagram", "Agentic AI"] as const

const VOLUMES = [
  "Under 1 lakh",
  "1 – 5 lakh",
  "5 – 25 lakh",
  "25 lakh – 1 crore",
  "Above 1 crore",
  "Not sure yet",
] as const

type Variant = "primary" | "light" | "outline"

const TRIGGER_STYLES: Record<Variant, string> = {
  primary:
    "bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:brightness-110 border border-transparent",
  light: "border border-white/15 bg-white/5 text-white backdrop-blur-md hover:bg-white/10",
  outline: "border border-border bg-background text-foreground hover:bg-muted",
}

type Stage = "form" | "submitting" | "sent" | "error"

/**
 * "Talk to sales" button that opens a short enquiry form in a dialog.
 *
 * The form asks which channels the visitor needs, their expected monthly
 * volume and the details of the use case, then posts to /api/contact (the same
 * pipeline as the contact page: team email + CRM portal). Nothing here shows
 * or collects a price.
 */
export function TalkToSales({
  label = "Talk to sales",
  variant = "primary",
  defaultChannels = [],
  className = "",
  showArrow = true,
  source = "smslocal.in — /pricing/ (Talk to sales)",
}: {
  label?: string
  variant?: Variant
  defaultChannels?: string[]
  className?: string
  showArrow?: boolean
  source?: string
}) {
  const [open, setOpen] = useState(false)
  const [stage, setStage] = useState<Stage>("form")
  const [error, setError] = useState<string | null>(null)
  const [channels, setChannels] = useState<string[]>(defaultChannels)
  const [volume, setVolume] = useState<string>("")

  function toggle(channel: string) {
    setChannels((prev) => (prev.includes(channel) ? prev.filter((c) => c !== channel) : [...prev, channel]))
  }

  function onOpenChange(next: boolean) {
    setOpen(next)
    if (!next) {
      // Reset after the close animation so a second visit starts clean.
      setTimeout(() => {
        setStage("form")
        setError(null)
      }, 200)
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)

    if (channels.length === 0) {
      setError("Choose at least one channel you want to use.")
      return
    }
    if (!volume) {
      setError("Tell us roughly how many messages you expect to send each month.")
      return
    }

    const data = new FormData(e.currentTarget)
    const details = String(data.get("details") ?? "").trim()

    setStage("submitting")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: String(data.get("firstName") ?? "").trim(),
          lastName: String(data.get("lastName") ?? "").trim(),
          email: String(data.get("email") ?? "").trim(),
          phone: String(data.get("phone") ?? "").trim(),
          company: String(data.get("company") ?? "").trim(),
          interest: channels.join(", "),
          numberType: channels.join(", "),
          volume,
          message: details || "Volume pricing enquiry (no extra details given).",
          source,
          intent: "sales",
          website: String(data.get("website") ?? ""),
        }),
      })

      if (res.status === 429) {
        setError("We're getting too many requests from your network. Please wait a moment and try again.")
        setStage("form")
        return
      }
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        setError(body?.message ?? "We couldn't send that just now. Please try again in a moment.")
        setStage("form")
        return
      }
      setStage("sent")
    } catch {
      setError("Network error. Please check your connection and try again.")
      setStage("form")
    }
  }

  const sending = stage === "submitting"

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <button
          type="button"
          className={`group inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition ${TRIGGER_STYLES[variant]} ${className}`}
        >
          <Headphones className="h-4 w-4" />
          {label}
          {showArrow ? <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /> : null}
        </button>
      </DialogTrigger>

      <DialogContent
        showCloseButton={false}
        className="gap-0 overflow-hidden rounded-2xl border-border p-0 shadow-2xl sm:max-w-2xl"
        // Don't auto-focus the first chip: its focus ring reads as "already selected".
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogClose
          aria-label="Close"
          className="absolute right-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition hover:bg-muted hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </DialogClose>
        <div className="max-h-[90vh] overflow-y-auto p-6 sm:p-8">
        {stage === "sent" ? (
          <div className="py-6 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <DialogTitle className="mt-5 text-2xl font-semibold tracking-tight">Thanks, we&apos;ve got it</DialogTitle>
            <DialogDescription className="mx-auto mt-2 max-w-md text-[15px] leading-relaxed">
              Our sales team will review your requirements and get back to you within one business day with volume
              pricing for the channels you chose.
            </DialogDescription>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="mt-6 inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:brightness-110"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <span className="inline-flex w-fit rounded-full border border-primary/25 bg-primary/10 px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-primary">
                Volume pricing
              </span>
              <DialogTitle className="mt-2 text-2xl font-semibold tracking-tight">Talk to our sales team</DialogTitle>
              <DialogDescription className="text-[14.5px] leading-relaxed">
                Tell us which channels you need and how much you send. We&apos;ll come back with a plan and discount that
                fits your volume.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="mt-2 space-y-6" noValidate={false}>
              {/* Channels */}
              <fieldset>
                <legend className="text-[13px] font-semibold text-foreground">
                  Which channels do you need? <span className="text-destructive" aria-hidden>*</span>{" "}
                  <span className="font-normal text-muted-foreground">(choose all that apply)</span>
                </legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  {CHANNELS.map((channel) => {
                    const on = channels.includes(channel)
                    return (
                      <button
                        key={channel}
                        type="button"
                        aria-pressed={on}
                        onClick={() => toggle(channel)}
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-[13px] font-medium transition ${
                          on
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border bg-background text-foreground/80 hover:border-primary/40"
                        }`}
                      >
                        {on ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : null}
                        {channel}
                      </button>
                    )
                  })}
                </div>
              </fieldset>

              {/* Volume */}
              <fieldset>
                <legend className="text-[13px] font-semibold text-foreground">
                  Expected messages per month <span className="text-destructive" aria-hidden>*</span>
                </legend>
                <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {VOLUMES.map((v) => {
                    const on = volume === v
                    return (
                      <button
                        key={v}
                        type="button"
                        aria-pressed={on}
                        onClick={() => setVolume(v)}
                        className={`rounded-lg border px-3.5 py-3 text-left text-[13px] font-medium transition ${
                          on
                            ? "border-primary bg-primary/10 text-primary ring-1 ring-primary/30"
                            : "border-border bg-background text-foreground/80 hover:border-primary/40"
                        }`}
                      >
                        {v}
                      </button>
                    )
                  })}
                </div>
              </fieldset>

              {/* Contact */}
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-[13px] font-semibold text-foreground">
                  First name <span className="text-destructive" aria-hidden>*</span>
                  <Input name="firstName" autoComplete="given-name" required className="mt-1.5 h-11 rounded-lg font-normal" />
                </label>
                <label className="block text-[13px] font-semibold text-foreground">
                  Last name <span className="text-destructive" aria-hidden>*</span>
                  <Input name="lastName" autoComplete="family-name" required className="mt-1.5 h-11 rounded-lg font-normal" />
                </label>
                <label className="block text-[13px] font-semibold text-foreground">
                  Work email <span className="text-destructive" aria-hidden>*</span>
                  <Input name="email" type="email" autoComplete="email" required className="mt-1.5 h-11 rounded-lg font-normal" />
                </label>
                <label className="block text-[13px] font-semibold text-foreground">
                  Phone / WhatsApp <span className="text-destructive" aria-hidden>*</span>
                  <Input
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    required
                    minLength={7}
                    placeholder="+91 98765 43210"
                    className="mt-1.5 h-11 rounded-lg font-normal"
                  />
                </label>
                <label className="block text-[13px] font-semibold text-foreground sm:col-span-2">
                  Company <span className="font-normal text-muted-foreground">(optional)</span>
                  <Input name="company" autoComplete="organization" className="mt-1.5 h-11 rounded-lg font-normal" />
                </label>
              </div>

              <label className="block text-[13px] font-semibold text-foreground">
                Tell us about your requirement
                <Textarea
                  name="details"
                  rows={4}
                  placeholder="Use case (OTP, alerts, promotions, support), countries you send to, sender ID or WhatsApp number status, launch timeline…"
                  className="mt-1.5 rounded-lg font-normal"
                />
              </label>

              {/* Honeypot: must stay empty. Hidden from people and assistive tech. */}
              <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                <label>
                  Website
                  <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                </label>
              </div>

              {error ? (
                <p role="alert" className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2.5 text-[13px] text-destructive">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  {error}
                </p>
              ) : null}

              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-[12px] text-muted-foreground">
                  Fields marked <span className="text-destructive">*</span> are required. We reply within one business day.
                </p>
                <button
                  type="submit"
                  disabled={sending}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition hover:brightness-110 disabled:opacity-70"
                >
                  {sending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send enquiry
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </>
        )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
