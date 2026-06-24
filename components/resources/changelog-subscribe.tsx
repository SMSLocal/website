"use client"

import { useState } from "react"
import { ArrowRight, CheckCircle2 } from "lucide-react"

/**
 * Subscribe form for the changelog CTA. Client-side only — validates the email
 * and shows a success state. Wire to a real list endpoint when available.
 */
export function ChangelogSubscribe() {
  const [email, setEmail] = useState("")
  const [done, setDone] = useState(false)

  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  if (done) {
    return (
      <div className="mx-auto mt-8 flex max-w-md items-center justify-center gap-2.5 rounded-xl border border-primary/25 bg-primary/[0.06] px-5 py-4">
        <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
        <p className="text-[14px] font-medium text-foreground">
          You're subscribed — release notes are on the way every two weeks.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (valid) setDone(true)
      }}
      className="mx-auto mt-8 flex max-w-md flex-col gap-2.5 sm:flex-row"
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@company.com"
        aria-label="Email address"
        className="min-w-0 flex-1 rounded-lg border border-border bg-background px-4 py-3 text-[14px] text-foreground outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
      />
      <button
        type="submit"
        disabled={!valid}
        className="group inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Subscribe
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </button>
    </form>
  )
}
