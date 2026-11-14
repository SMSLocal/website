"use client"

import { useEffect, useRef, useState } from "react"
import { Check, Sparkles, X } from "lucide-react"

// "The honest list" for /products/voice: one split ledger. Left half is what Voice is, right half is what it is not,
// joined by a "vs" badge. Headings and lists only, in the site palette.

const FOR_ITEMS = [
  "Support, sales, or success teams handling 5–200 calls/day",
  "Teams already using SMSLocal for messaging and chat",
  "Companies wanting a business number without a per-seat phone system",
  "Any inbox-first team that wants calls in the same thread",
]

const NOT_ITEMS = [
  "IVR menus or call trees",
  "Voicemail boxes per agent",
  "Call recording & compliance archiving",
  "Call queues or hold music",
  "Predictive or power dialing at scale",
  "Full PBX or contact-center routing",
]

export function VoiceRightFit() {
  const ref = useRef<HTMLElement>(null)
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
      { threshold: 0.1 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const reveal = (delay: number, dir: "up" | "left" | "right" = "up") => ({
    opacity: shown ? 1 : 0,
    transform: shown ? "none" : dir === "left" ? "translateX(-24px)" : dir === "right" ? "translateX(24px)" : "translateY(20px)",
    transition: `opacity 0.65s ease ${delay}ms, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  })

  return (
    <section ref={ref} aria-labelledby="voice-fit-title" className="bg-background py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="mx-auto flex w-fit items-center justify-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-3 py-1 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-primary" style={reveal(0)}>
          <Sparkles className="h-3.5 w-3.5" />The honest list
        </p>
        <h2 id="voice-fit-title" className="mx-auto mt-4 max-w-5xl text-center text-3xl font-semibold leading-[1.12] tracking-[-0.03em] sm:text-[40px]" style={reveal(60)}>
          Is SMSLocal Voice the right fit for your team?
        </h2>

        <div className="relative mt-10 grid overflow-hidden rounded-[2rem] border border-border shadow-[0_30px_60px_-36px_rgba(15,42,58,.45)] md:grid-cols-2" style={reveal(100)}>
          {/* IS */}
          <div className="relative bg-gradient-to-br from-primary/15 via-primary/[.06] to-card p-7 sm:p-10">
            <div aria-hidden className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-primary/20 blur-3xl" />
            <h3 className="relative text-3xl font-semibold tracking-tight sm:text-4xl">
              What Voice{" "}
              <span className="bg-gradient-to-r from-primary to-[oklch(0.72_0.17_165)] bg-clip-text text-transparent">IS.</span>
            </h3>
            <ul className="relative mt-7 divide-y divide-primary/15">
              {FOR_ITEMS.map((item, i) => (
                <li key={item} className="flex items-start gap-3.5 py-3.5 text-[14.5px] leading-snug text-foreground" style={reveal(220 + i * 70, "left")}>
                  <span className="mt-px inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md shadow-primary/30">
                    <Check className="h-3.5 w-3.5" strokeWidth={3.2} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* NOT */}
          <div className="bg-muted/60 p-7 sm:p-10">
            <h3 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              What Voice is{" "}
              <span className="underline decoration-accent decoration-[5px] underline-offset-[6px]">NOT.</span>
            </h3>
            <ul className="mt-7 divide-y divide-border">
              {NOT_ITEMS.map((item, i) => (
                <li key={item} className="flex items-start gap-3.5 py-3 text-[14.5px] leading-snug text-muted-foreground" style={reveal(220 + i * 60, "right")}>
                  <span className="mt-px inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/40 text-foreground">
                    <X className="h-3.5 w-3.5" strokeWidth={3.2} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <span aria-hidden className="absolute left-1/2 top-1/2 hidden h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-foreground text-[12px] font-bold uppercase tracking-wide text-background shadow-xl ring-4 ring-background md:flex">vs</span>
        </div>
      </div>
    </section>
  )
}
