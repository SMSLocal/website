"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { ArrowRight } from "lucide-react"

const ease = "cubic-bezier(0.16,1,0.3,1)"

export function VoiceFinalCta() {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setShown(true)
      return
    }
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect() } },
      { threshold: 0.25 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const reveal = (delay: number) => ({
    opacity: shown ? 1 : 0,
    transform: shown ? "translateY(0)" : "translateY(18px)",
    transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ${ease} ${delay}ms`,
  })

  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      {/* boxless ambient background — soft radial glows, no card */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-3xl"
        style={{ background: "radial-gradient(circle, color-mix(in oklch, var(--primary) 22%, transparent), transparent 70%)" }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute right-[12%] top-10 h-44 w-44 rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, color-mix(in oklch, var(--primary) 30%, transparent), transparent 70%)" }}
      />

      <div ref={ref} className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2
          className="text-pretty text-3xl font-semibold tracking-tight text-foreground sm:text-5xl"
          style={reveal(0)}
        >
          Bring phone support{" "}
          <span className="bg-gradient-to-r from-primary to-[oklch(0.72_0.17_165)] bg-clip-text text-transparent">
            into your inbox.
          </span>
        </h2>

        <p
          className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:text-base"
          style={reveal(120)}
        >
          A faster way to handle customer calls — voice, built into SMSLocal.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3" style={reveal(240)}>
          <Link
            href="/signup"
            className="group inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-xl shadow-primary/25 transition hover:brightness-110 hover:shadow-2xl hover:shadow-primary/30"
          >
            Add Voice
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/company/contact"
            className="group inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-medium text-foreground transition hover:text-primary"
          >
            Book a demo
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}
