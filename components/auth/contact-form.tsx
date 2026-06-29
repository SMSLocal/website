"use client"

import { useState } from "react"
import Link from "next/link"
import { AlertCircle, ArrowRight, CheckCircle2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Stage = "form" | "submitting" | "sent" | "error"

type ErrorState = {
  message: string
  retryAfterSeconds?: number
}

export function ContactForm() {
  const [stage, setStage] = useState<Stage>("form")
  const [error, setError] = useState<ErrorState | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStage("submitting")
    setError(null)

    const form = e.currentTarget
    const data = new FormData(form)
    const payload = Object.fromEntries(data.entries())

    try {
      const res = await fetch("/api/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (res.status === 429) {
        const body = await res.json().catch(() => ({}))
        const wait = Number(body?.retryAfterSeconds) || 60
        setError({
          message:
            "We're getting too many messages from your network. Please wait a moment and try again.",
          retryAfterSeconds: wait,
        })
        setStage("error")
        return
      }

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        setError({
          message:
            body?.message ??
            "We couldn't send that just now. Please try again or email hello@smslocal.in directly.",
        })
        setStage("error")
        return
      }

      setStage("sent")
    } catch {
      setError({
        message:
          "Network error. Please check your connection, or email hello@smslocal.in directly.",
      })
      setStage("error")
    }
  }

  if (stage === "sent") {
    return (
      <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <h2 className="mt-5 text-2xl font-semibold tracking-tight text-foreground">We&apos;ve got your note</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          A member of the SMSLocal team will get back to you within one business day. If your query is urgent and
          you&apos;re already a customer, email <span className="text-foreground">support@smslocal.in</span> for
          priority handling.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button asChild>
            <Link href="/">Back to homepage</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/pricing/">View pricing</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
      <FieldGroup>
        <FieldSet>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="firstName">First name</FieldLabel>
              <Input id="firstName" name="firstName" autoComplete="given-name" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="lastName">Last name</FieldLabel>
              <Input id="lastName" name="lastName" autoComplete="family-name" required />
            </Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="email">Work email</FieldLabel>
              <Input id="email" name="email" type="email" autoComplete="email" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="phone">Phone</FieldLabel>
              <Input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="+91 98765 43210" />
            </Field>
          </div>

          <Field>
            <FieldLabel htmlFor="company">Company</FieldLabel>
            <Input id="company" name="company" autoComplete="organization" required />
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="interest">What are you exploring?</FieldLabel>
              <Select name="interest">
                <SelectTrigger id="interest">
                  <SelectValue placeholder="Pick a product" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bulk-sms">Bulk SMS</SelectItem>
                  <SelectItem value="whatsapp">WhatsApp Business API</SelectItem>
                  <SelectItem value="otp">OTP & Transactional SMS</SelectItem>
                  <SelectItem value="quick-sms">Quick SMS</SelectItem>
                  <SelectItem value="ai-agents">AI agents</SelectItem>
                  <SelectItem value="reseller">Reseller / white-label</SelectItem>
                  <SelectItem value="enterprise">Enterprise / custom</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel htmlFor="volume">Monthly message volume</FieldLabel>
              <Select name="volume">
                <SelectTrigger id="volume">
                  <SelectValue placeholder="Rough estimate" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-100k">Under 100K</SelectItem>
                  <SelectItem value="100k-1m">100K – 1M</SelectItem>
                  <SelectItem value="1m-10m">1M – 10M</SelectItem>
                  <SelectItem value="10m-plus">10M+</SelectItem>
                  <SelectItem value="unsure">Not sure yet</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </div>

          <Field>
            <FieldLabel htmlFor="message">How can we help?</FieldLabel>
            <Textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Tell us about your use case, timelines, and any integration or compliance questions."
              required
            />
            <FieldDescription>
              The more specific you are, the faster we can route you to the right engineer or account manager.
            </FieldDescription>
          </Field>

          {/* Honeypot: visually hidden, never rendered to screen readers as a real field.
              Bots tend to fill every input they see; if `website` comes in non-empty,
              /api/contact silently accepts without acting on it. */}
          <div aria-hidden="true" className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label htmlFor="website">Your website (leave blank)</label>
            <input
              id="website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              defaultValue=""
            />
          </div>
        </FieldSet>

        {error ? (
          <div
            role="alert"
            className="flex items-start gap-2.5 rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2.5 text-sm text-destructive"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 flex-none" />
            <div>
              <p>{error.message}</p>
              {error.retryAfterSeconds ? (
                <p className="mt-0.5 text-xs opacity-80">
                  Try again in about {Math.max(1, Math.ceil(error.retryAfterSeconds / 60))} minute
                  {error.retryAfterSeconds >= 120 ? "s" : ""}.
                </p>
              ) : null}
            </div>
          </div>
        ) : null}

        <Button type="submit" size="lg" className="mt-2 w-full sm:w-auto" disabled={stage === "submitting"}>
          {stage === "submitting" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              Send message
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </FieldGroup>
    </form>
  )
}
