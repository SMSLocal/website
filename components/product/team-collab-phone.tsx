"use client"

import { useEffect, useRef, useState } from "react"
import {
  BatteryFull,
  ChevronLeft,
  History,
  Phone,
  Signal,
  Video,
  Wifi,
} from "lucide-react"

/**
 * "Team collaboration" left visual — a phone mockup with the support thread
 * playing out live inside it. No content boxes: it's a device frame, and the
 * conversation types itself in (typing dots → bubble) on a gentle loop.
 *
 * Honours prefers-reduced-motion (whole thread shown at once, no looping).
 */

type Msg =
  | { type: "in"; text: string; who: string }
  | { type: "note"; mention: string; text: string }
  | { type: "out"; text: string; who: string }
  | { type: "activity"; text: string }

const MSGS: Msg[] = [
  { type: "in", text: "My order still hasn't shipped — can someone check?", who: "Customer · 2m ago" },
  { type: "note", mention: "@Dev", text: "warehouse flagged a delay on this SKU — can you confirm the new ETA?" },
  { type: "out", text: "Confirmed — ships tomorrow. I'll add the tracking note. 👍", who: "Dev · just now" },
  { type: "activity", text: 'Reassigned to Priya · note added · tag "delayed" applied' },
]

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1 rounded-2xl rounded-tl-sm bg-muted px-3.5 py-3">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60"
          style={{ animation: "dot-bounce 1.2s ease-in-out infinite", animationDelay: `${i * 0.18}s` }}
        />
      ))}
    </span>
  )
}

export function TeamCollabPhone() {
  const ref = useRef<HTMLDivElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const [started, setStarted] = useState(false)
  const [reduced, setReduced] = useState(false)
  const [step, setStep] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true)
      setStep(MSGS.length)
      return
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setStarted(true)
          io.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (reduced || !started) return
    if (step >= MSGS.length) {
      const t = setTimeout(() => setStep(0), 2800)
      return () => clearTimeout(t)
    }
    const next = MSGS[step]
    const typing = next.type === "in" || next.type === "out"
    const t = setTimeout(() => setStep((s) => s + 1), typing ? 1350 : 750)
    return () => clearTimeout(t)
  }, [step, started, reduced])

  const next = step < MSGS.length ? MSGS[step] : null
  const showTyping = !reduced && started && next && (next.type === "in" || next.type === "out")

  useEffect(() => {
    const el = bodyRef.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" })
  }, [step, showTyping])

  return (
    <div ref={ref} className="relative flex justify-center">
      {/* ambient glow (not a box) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-60 blur-3xl"
        style={{ background: "radial-gradient(circle at 50% 40%, color-mix(in oklch, var(--accent) 26%, transparent), transparent 68%)" }}
      />

      {/* device frame */}
      <div className="relative w-[300px] rounded-[2.6rem] border border-border/60 bg-foreground/90 p-2.5 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.55)]">
        {/* notch */}
        <div className="absolute left-1/2 top-2.5 z-20 h-5 w-28 -translate-x-1/2 rounded-b-2xl bg-foreground/90" />

        <div className="overflow-hidden rounded-[2.1rem] bg-background">
          {/* status bar */}
          <div className="flex items-center justify-between px-6 pb-1 pt-2.5 text-[10px] font-semibold text-foreground">
            <span>9:41</span>
            <span className="flex items-center gap-1">
              <Signal className="h-3 w-3" />
              <Wifi className="h-3 w-3" />
              <BatteryFull className="h-3.5 w-3.5" />
            </span>
          </div>

          {/* chat header */}
          <div className="flex items-center gap-2.5 border-b border-border/60 bg-emerald-500/[0.06] px-3 py-2.5">
            <ChevronLeft className="h-4 w-4 text-muted-foreground" />
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-400 text-[11px] font-semibold text-white">
              AM
            </span>
            <div className="min-w-0 leading-tight">
              <p className="text-[12.5px] font-semibold text-foreground">Aarav Mehta</p>
              <p className="flex items-center gap-1 text-[10px] text-emerald-500">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> online
              </p>
            </div>
            <span className="ml-auto flex items-center gap-3 text-muted-foreground">
              <Video className="h-4 w-4" />
              <Phone className="h-3.5 w-3.5" />
            </span>
          </div>

          {/* chat body */}
          <div
            ref={bodyRef}
            className="flex h-[300px] flex-col justify-end gap-2.5 overflow-y-auto px-3 py-3.5"
            style={{
              backgroundImage:
                "radial-gradient(color-mix(in oklch, var(--muted-foreground) 8%, transparent) 0.5px, transparent 0.5px)",
              backgroundSize: "14px 14px",
            }}
          >
            {MSGS.slice(0, step).map((m, i) => {
              if (m.type === "in") {
                return (
                  <div key={i} className="animate-message-in max-w-[82%] self-start">
                    <div className="rounded-2xl rounded-tl-sm bg-muted px-3.5 py-2.5 text-[12.5px] text-foreground shadow-sm">{m.text}</div>
                    <p className="mt-1 pl-1 text-[9.5px] text-muted-foreground">{m.who}</p>
                  </div>
                )
              }
              if (m.type === "note") {
                return (
                  <div key={i} className="animate-message-in mx-auto w-full max-w-[94%]">
                    <div className="rounded-xl border border-dashed border-amber-400/50 bg-amber-400/10 px-3 py-2">
                      <p className="text-[9.5px] font-semibold uppercase tracking-[0.1em] text-amber-600/90">Internal note · hidden from customer</p>
                      <p className="mt-1 text-[12px] text-foreground">
                        <span className="font-semibold text-primary">{m.mention}</span> {m.text}
                      </p>
                    </div>
                  </div>
                )
              }
              if (m.type === "out") {
                return (
                  <div key={i} className="animate-message-in max-w-[82%] self-end">
                    <div className="rounded-2xl rounded-tr-sm bg-emerald-500 px-3.5 py-2.5 text-[12.5px] text-white shadow-sm">{m.text}</div>
                    <p className="mt-1 pr-1 text-right text-[9.5px] text-muted-foreground">{m.who}</p>
                  </div>
                )
              }
              return (
                <div key={i} className="animate-message-in mx-auto flex items-center gap-1.5 text-[10px] text-muted-foreground">
                  <History className="h-3 w-3 text-primary" />
                  <span>{m.text}</span>
                </div>
              )
            })}

            {/* typing indicator for the next human message */}
            {showTyping && (
              <div className={`max-w-[82%] ${next!.type === "out" ? "self-end" : "self-start"}`}>
                <TypingDots />
              </div>
            )}
          </div>

          {/* input bar */}
          <div className="flex items-center gap-2 border-t border-border/60 px-3 py-2.5">
            <span className="flex-1 rounded-full bg-muted px-3.5 py-2 text-[11.5px] text-muted-foreground">Message</span>
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white">
              <Phone className="h-3.5 w-3.5 rotate-90" />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
