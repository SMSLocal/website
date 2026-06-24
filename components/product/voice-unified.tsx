"use client"

import { useEffect, useRef, useState } from "react"
import {
  Mail,
  MessageCircle,
  MessageSquare,
  PhoneCall,
  PhoneIncoming,
  StickyNote,
  UserRound,
} from "lucide-react"

const STEPS = [
  { Icon: PhoneIncoming, label: "Customer calls" },
  { Icon: MessageSquare, label: "Conversation created" },
  { Icon: PhoneCall, label: "Agent replies" },
  { Icon: StickyNote, label: "Notes added" },
  { Icon: UserRound, label: "Customer profile updated" },
]

const EVENTS = [
  { Icon: PhoneIncoming, tint: "text-amber-500 bg-amber-500/10", t: "Voice · 2m 14s inbound call", time: "now" },
  { Icon: Mail, tint: "text-sky-500 bg-sky-500/10", t: "Email · refund question", time: "2d" },
  { Icon: MessageCircle, tint: "text-emerald-500 bg-emerald-500/10", t: "WhatsApp · order status", time: "5d" },
  { Icon: MessageSquare, tint: "text-teal-500 bg-teal-500/10", t: "Live Chat · pre-sales question", time: "2w" },
]

const ease = "cubic-bezier(0.16,1,0.3,1)"
const spring = "cubic-bezier(0.34,1.56,0.64,1)"

export function VoiceUnified() {
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
    <div ref={ref} className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
      {/* ── LEFT: upgraded flow chain, boxless ──────────────────── */}
      <ol className="relative space-y-6">
        {/* connector line that draws down */}
        <span
          aria-hidden
          className="absolute left-[13px] top-3 w-px bg-gradient-to-b from-primary/50 via-primary/25 to-transparent"
          style={{
            height: shown ? "calc(100% - 1.5rem)" : "0%",
            transition: `height 1s ${ease} 0.25s`,
          }}
        />
        {STEPS.map(({ Icon, label }, i) => (
          <li
            key={label}
            className="group relative flex items-center gap-4"
            style={{
              opacity: shown ? 1 : 0,
              transform: shown ? "translateX(0)" : "translateX(-22px)",
              transition: `opacity 0.6s ease ${i * 110}ms, transform 0.6s ${ease} ${i * 110}ms`,
            }}
          >
            <span
              className="relative z-10 flex h-[27px] w-[27px] shrink-0 items-center justify-center rounded-full bg-background text-primary ring-1 ring-primary/20"
              style={{
                transform: shown ? "scale(1)" : "scale(0)",
                transition: `transform 0.55s ${spring} ${140 + i * 110}ms`,
              }}
            >
              <Icon className="h-[15px] w-[15px]" />
            </span>
            <span className="text-[15px] font-medium text-foreground transition-colors group-hover:text-primary">
              {label}
            </span>
          </li>
        ))}
      </ol>

      {/* ── RIGHT: unified timeline, boxless ────────────────────── */}
      <div className="relative">
        {/* soft ambient glow */}
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-6 -z-10 rounded-[28px] opacity-45 blur-3xl"
          style={{ background: "radial-gradient(circle, color-mix(in oklch, var(--primary) 22%, transparent), transparent 70%)" }}
        />

        {/* contact header — boxless, divider only */}
        <div
          className="flex items-center gap-3 border-b border-border/60 pb-4"
          style={{
            opacity: shown ? 1 : 0,
            transform: shown ? "translateY(0)" : "translateY(-8px)",
            transition: `opacity 0.5s ease, transform 0.5s ${ease}`,
          }}
        >
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[oklch(0.72_0.17_165)] text-[13px] font-semibold text-primary-foreground">
            JC
          </span>
          <div>
            <p className="text-[14px] font-semibold text-foreground">Jessica Chen</p>
            <p className="text-[12px] text-muted-foreground">One unified timeline · all channels</p>
          </div>
        </div>

        {/* events — connected line, no boxes */}
        <ul className="relative mt-5 space-y-5">
          <span
            aria-hidden
            className="absolute left-[15px] top-2 w-px bg-gradient-to-b from-border to-transparent"
            style={{
              height: shown ? "calc(100% - 1rem)" : "0%",
              transition: `height 0.9s ${ease} 0.4s`,
            }}
          />
          {EVENTS.map(({ Icon, tint, t, time }, i) => (
            <li
              key={t}
              className="relative flex items-center gap-3"
              style={{
                opacity: shown ? 1 : 0,
                transform: shown ? "translateX(0)" : "translateX(18px)",
                transition: `opacity 0.55s ease ${250 + i * 120}ms, transform 0.55s ${ease} ${250 + i * 120}ms`,
              }}
            >
              <span
                className={`relative z-10 inline-flex h-[31px] w-[31px] shrink-0 items-center justify-center rounded-lg ${tint}`}
                style={{
                  transform: shown ? "scale(1)" : "scale(0)",
                  transition: `transform 0.5s ${spring} ${330 + i * 120}ms`,
                }}
              >
                <Icon className="h-4 w-4" />
              </span>
              <span className="flex-1 truncate text-[13px] text-foreground">{t}</span>
              <span className="font-mono text-[11px] text-muted-foreground">{time}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
