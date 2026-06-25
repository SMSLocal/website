"use client"

import { useEffect, useRef, useState } from "react"
import { MessageSquare, PhoneCall, PhoneIncoming, StickyNote, UserRound } from "lucide-react"

const STEPS = [
  { Icon: PhoneIncoming, label: "Customer calls business number" },
  { Icon: MessageSquare, label: "Call appears inside SMSLocal inbox" },
  { Icon: PhoneCall, label: "Agent answers" },
  { Icon: UserRound, label: "Customer history appears" },
]

export function VoiceInboundMock() {
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
        <p className="text-[13px] font-semibold text-foreground">Inbound call</p>
        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          Ringing
        </span>
      </div>

      {/* flow steps — connected line, bare icons, no chips */}
      <ol className="relative mt-5 space-y-5">
        {/* line that draws down */}
        <span
          aria-hidden
          className="absolute left-[11px] top-2 w-px bg-gradient-to-b from-primary/40 to-primary/10"
          style={{
            height: shown ? "calc(100% - 1rem)" : "0%",
            transition: "height 0.9s cubic-bezier(0.16,1,0.3,1) 0.3s",
          }}
        />
        {STEPS.map(({ Icon, label }, i) => (
          <li
            key={label}
            className="relative flex items-center gap-3.5"
            style={{
              opacity: shown ? 1 : 0,
              transform: shown ? "translateX(0)" : "translateX(-16px)",
              transition: `opacity 0.55s ease ${i * 110}ms, transform 0.55s cubic-bezier(0.16,1,0.3,1) ${i * 110}ms`,
            }}
          >
            <span
              className="relative z-10 flex h-[23px] w-[23px] shrink-0 items-center justify-center rounded-full bg-background text-primary"
              style={{
                transform: shown ? "scale(1)" : "scale(0)",
                transition: `transform 0.5s cubic-bezier(0.34,1.56,0.64,1) ${150 + i * 110}ms`,
              }}
            >
              <Icon className="h-[15px] w-[15px]" />
            </span>
            <span className="text-[13px] font-medium text-foreground">{label}</span>
          </li>
        ))}
      </ol>

      {/* customer card — boxless, divider only */}
      <div
        className="mt-6 flex items-center gap-3 border-t border-border/60 pt-5"
        style={{
          opacity: shown ? 1 : 0,
          transform: shown ? "translateY(0)" : "translateY(10px)",
          transition: `opacity 0.6s ease ${STEPS.length * 110 + 200}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${STEPS.length * 110 + 200}ms`,
        }}
      >
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[oklch(0.72_0.17_165)] text-[11px] font-semibold text-primary-foreground">
          JC
        </span>
        <div>
          <p className="text-[13px] font-semibold text-foreground">Jessica Chen</p>
          <p className="text-[11px] text-muted-foreground">3 past conversations · VIP</p>
        </div>
        <span className="ml-auto inline-flex items-center gap-1 text-[11px] font-semibold text-primary">
          <StickyNote className="h-3.5 w-3.5" /> Notes
        </span>
      </div>
    </div>
  )
}
