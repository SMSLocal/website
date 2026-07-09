"use client"

import { useEffect } from "react"
import Link from "next/link"
import { AlertTriangle, Home, RefreshCw } from "lucide-react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Surface the error to the browser console so the dev/preview logs pick it up.
    // In production, Vercel Analytics + your error-tracking integration will see it.
    console.error("[SMSLocal] Unhandled error boundary:", error)
  }, [error])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-6 py-16 text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 left-1/2 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-accent/15 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
      </div>

      <div className="relative flex max-w-xl flex-col items-center text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-white/5 text-accent">
          <AlertTriangle className="h-6 w-6" aria-hidden />
        </div>

        <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/70">
          Something went wrong
        </p>

        <h1 className="mt-5 font-serif text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
          We hit an unexpected error.
        </h1>
        <p className="mt-4 max-w-md text-pretty text-[15px] leading-relaxed text-white/70">
          The SMSLocal platform itself is healthy — only this page failed to render. Try again, or head back home and pick up where you left off.
        </p>

        {error.digest && (
          <p className="mt-4 rounded-md border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-[11px] text-white/50">
            Error ref: {error.digest}
          </p>
        )}

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:brightness-110"
          >
            <RefreshCw className="h-4 w-4" aria-hidden />
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/10"
          >
            <Home className="h-4 w-4" aria-hidden />
            Go home
          </Link>
        </div>

        <p className="mt-10 text-xs text-white/50">
          If this keeps happening,{" "}
          <Link href="/company/contact" className="text-white/80 underline underline-offset-4 hover:text-white">
            let our support team know
          </Link>
          .
        </p>
      </div>
    </main>
  )
}
