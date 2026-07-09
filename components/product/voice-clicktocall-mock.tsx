"use client"

import { useEffect, useRef, useState } from "react"
import { MessageSquare, Mic, PhoneCall, UserRound } from "lucide-react"

const STEPS = [
  { Icon: UserRound, label: "Open customer profile" },
  { Icon: PhoneCall, label: "Click the call button" },
  { Icon: Mic, label: "Agent connects" },
  { Icon: MessageSquare, label: "Conversation starts & logs itself" },
]

export function VoiceClickToCallMock() {
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
      { threshold: 0.2 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className="relative">
      {/* soft ambient glow */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-6 -z-10 rounded-[28px] opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, color-mix(in oklch, var(--primary) 22%, transparent), transparent 70%)" }}
      />

      {/* header — boxless, just a divider */}
      <div
        className="flex items-center justify-between border-b border-border/60 pb-3"
        style={{
          opacity: shown ? 1 : 0,
          transform: shown ? "translateY(0)" : "translateY(-8px)",
          transition: "opacity 0.5s ease, transform 0.5s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <p className="text-[13px] font-semibold text-foreground">Customer profile</p>
        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> No dialer
        </span>
      </div>

      {/* contact row — boxless */}
      <div
        className="mt-5 flex items-center gap-3"
        style={{
          opacity: shown ? 1 : 0,
          transform: shown ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 0.55s ease 0.1s, transform 0.55s cubic-bezier(0.16,1,0.3,1) 0.1s",
        }}
      >
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[oklch(0.72_0.17_165)] text-[13px] font-semibold text-primary-foreground">
          MW
        </span>
        <div className="min-w-0">
          <p className="text-[14px] font-semibold text-foreground">Marcus Williams</p>
          <p className="font-mono text-[12px] text-muted-foreground">(415) 555-0188</p>
        </div>
        {/* Call button — the one intentional pill, with a pulse */}
        <span className="relative ml-auto inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-[12.5px] font-semibold text-primary-foreground shadow-lg shadow-primary/25">
          <span aria-hidden className="absolute inset-0 -z-10 animate-ping rounded-lg bg-primary/40" />
          <PhoneCall className="h-4 w-4" /> Call
        </span>
      </div>

      {/* flow steps — connected line, bare icons, no chips */}
      <ol className="relative mt-6 space-y-5">
        <span
          aria-hidden
          className="absolute left-[11px] top-2 w-px bg-gradient-to-b from-primary/40 to-primary/10"
          style={{
            height: shown ? "calc(100% - 1rem)" : "0%",
            transition: "height 0.9s cubic-bezier(0.16,1,0.3,1) 0.35s",
          }}
        />
        {STEPS.map(({ Icon, label }, i) => (
          <li
            key={label}
            className="relative flex items-center gap-3.5"
            style={{
              opacity: shown ? 1 : 0,
              transform: shown ? "translateX(0)" : "translateX(-16px)",
              transition: `opacity 0.55s ease ${200 + i * 110}ms, transform 0.55s cubic-bezier(0.16,1,0.3,1) ${200 + i * 110}ms`,
            }}
          >
            <span
              className="relative z-10 flex h-[23px] w-[23px] shrink-0 items-center justify-center rounded-full bg-background text-primary"
              style={{
                transform: shown ? "scale(1)" : "scale(0)",
                transition: `transform 0.5s cubic-bezier(0.34,1.56,0.64,1) ${280 + i * 110}ms`,
              }}
            >
              <Icon className="h-[15px] w-[15px]" />
            </span>
            <span className="text-[13px] font-medium text-foreground">{label}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}
