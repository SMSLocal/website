"use client"

import { useEffect, useRef, useState } from "react"
import { Clock, Layers, PhoneMissed, Sparkles, StickyNote, Workflow } from "lucide-react"

const ITEMS = [
  { Icon: PhoneMissed, text: "Missed customer calls with no record" },
  { Icon: Clock,       text: "No conversation history on the call" },
  { Icon: Layers,      text: "A separate dialer app to juggle" },
  { Icon: StickyNote,  text: "Notes typed by hand, then lost" },
  { Icon: Workflow,    text: "Constant switching between platforms" },
]

export function VoiceProblems() {
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
    <div ref={ref} className="mx-auto mt-10 max-w-xl">
      {/* Problem list */}
      {ITEMS.map(({ Icon, text }, i) => (
        <div
          key={text}
          className="group relative flex items-center gap-5 py-5 border-b border-border/40 last:border-0 first:pt-0 overflow-hidden"
          style={{
            opacity: shown ? 1 : 0,
            transform: shown ? "none" : "translateX(-28px)",
            transition: `opacity 0.55s ${i * 85}ms cubic-bezier(0.22,1,0.36,1), transform 0.55s ${i * 85}ms cubic-bezier(0.22,1,0.36,1)`,
          }}
        >
          {/* Faint index */}
          <span className="w-5 shrink-0 font-mono text-[10.5px] font-bold text-destructive/25 tabular-nums select-none">
            {String(i + 1).padStart(2, "0")}
          </span>

          {/* Icon — no box */}
          <Icon className="h-[15px] w-[15px] shrink-0 text-destructive/50" />

          {/* Text */}
          <span className="relative flex-1 text-[14.5px] font-medium text-foreground/75">
            {text}
            {/* Strikethrough that draws across after item slides in */}
            <span
              aria-hidden
              className="absolute left-0 top-1/2 -translate-y-1/2 h-px bg-destructive/40 rounded-full"
              style={{
                width: shown ? "100%" : "0%",
                transition: `width 0.65s ${180 + i * 85}ms cubic-bezier(0.22,1,0.36,1)`,
              }}
            />
          </span>
        </div>
      ))}

      {/* Connector thread */}
      <div
        className="mt-8 flex flex-col items-center text-center"
        style={{
          opacity: shown ? 1 : 0,
          transition: `opacity 0.6s ${ITEMS.length * 85 + 200}ms`,
        }}
      >
        <span
          aria-hidden
          className="mb-4 block w-px"
          style={{
            height: shown ? "40px" : "0px",
            background: "linear-gradient(to bottom, var(--border), var(--primary))",
            transition: `height 0.6s ${ITEMS.length * 85 + 100}ms cubic-bezier(0.22,1,0.36,1)`,
          }}
        />

        <Sparkles
          className="mb-3 h-5 w-5 text-primary"
          style={{
            opacity: shown ? 1 : 0,
            transform: shown ? "scale(1)" : "scale(0.5)",
            transition: `opacity 0.4s ${ITEMS.length * 85 + 280}ms, transform 0.4s ${ITEMS.length * 85 + 280}ms cubic-bezier(0.34,1.56,0.64,1)`,
          }}
        />

        <p
          className="max-w-md text-[15px] font-medium leading-relaxed text-foreground"
          style={{
            opacity: shown ? 1 : 0,
            transform: shown ? "none" : "translateY(8px)",
            transition: `opacity 0.5s ${ITEMS.length * 85 + 340}ms, transform 0.5s ${ITEMS.length * 85 + 340}ms`,
          }}
        >
          SMSLocal connects voice conversations with your existing support workflow —{" "}
          <span
            style={{
              background: "linear-gradient(90deg, var(--primary), oklch(0.72 0.17 165))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            every call in context, every time.
          </span>
        </p>
      </div>
    </div>
  )
}
