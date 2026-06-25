"use client"

import { useEffect, useRef, useState } from "react"
import { Check, X } from "lucide-react"

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
    <section ref={ref} className="bg-background py-12 sm:py-16">
      <div className="mx-auto max-w-7xl space-y-20 px-4 sm:px-6">

        {/* ── Row 1: What Voice IS ── */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          {/* Left: text */}
          <div style={reveal(0, "left")}>
            <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
              <span className="font-mono text-muted-foreground">/ 01</span>
              <span className="h-px w-6 bg-border" />
              The honest list
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              What Voice{" "}
              <span className="bg-gradient-to-r from-primary to-[oklch(0.72_0.17_165)] bg-clip-text text-transparent">
                IS.
              </span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-[17px]">
              Inbox-native calling for teams that live in their conversations — not in a separate phone app.
            </p>
          </div>

          {/* Right: green card */}
          <div
            className="rounded-2xl border border-primary/25 bg-primary/[0.05] p-8"
            style={reveal(120, "right")}
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">Included</p>
            <ul className="mt-5 space-y-3">
              {FOR_ITEMS.map((item, i) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-[14px] leading-relaxed text-foreground"
                  style={reveal(200 + i * 60, "right")}
                >
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Row 2: What Voice is NOT ── */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          {/* Left: text */}
          <div style={reveal(0, "left")}>
            <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
              <span className="font-mono text-muted-foreground">/ 02</span>
              <span className="h-px w-6 bg-border" />
              The honest list
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              What Voice is{" "}
              <span className="text-rose-500">NOT.</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-[17px]">
              For full PBX features, keep your existing telephony or pair RingCentral / Dialpad alongside SMSLocal.
            </p>
          </div>

          {/* Right: dark card */}
          <div
            className="overflow-hidden rounded-2xl p-8"
            style={{
              ...reveal(120, "right"),
              background: "linear-gradient(135deg, oklch(0.18 0.04 258) 0%, oklch(0.15 0.05 280) 60%, oklch(0.13 0.03 300) 100%)",
            }}
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-amber-400">Not included</p>
            <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {NOT_ITEMS.map((item, i) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-[13.5px] leading-snug text-white/70"
                  style={reveal(200 + i * 50, "right")}
                >
                  <span className="mt-0.5 inline-flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-rose-500/20 text-rose-400">
                    <X className="h-2.5 w-2.5" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </section>
  )
}
