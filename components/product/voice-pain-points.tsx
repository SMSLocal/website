"use client"

import { useEffect, useRef, useState } from "react"
import { Clock, Layers, PhoneMissed, Sparkles, StickyNote, Workflow } from "lucide-react"

const ITEMS = [
  { Icon: PhoneMissed, text: "Missed customer calls with no record" },
  { Icon: Clock, text: "No conversation history on the call" },
  { Icon: Layers, text: "A separate dialer app to juggle" },
  { Icon: StickyNote, text: "Notes typed by hand, then lost" },
  { Icon: Workflow, text: "Constant switching between platforms" },
]

export function VoicePainPoints() {
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
      { threshold: 0.15 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="mx-auto mt-12 grid max-w-4xl gap-x-16 gap-y-10 lg:grid-cols-2 lg:items-center"
    >
      {/* ── Left: problems that get struck through ────────────────── */}
      <ul className="space-y-4">
        {ITEMS.map(({ Icon, text }, i) => (
          <li
            key={text}
            className="group flex items-center gap-3.5"
            style={{
              opacity: shown ? 1 : 0,
              transform: shown ? "translateX(0)" : "translateX(-24px)",
              transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 90}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 90}ms`,
            }}
          >
            <Icon
              className="h-[17px] w-[17px] shrink-0 text-destructive/55"
              style={{
                transform: shown ? "scale(1)" : "scale(0)",
                transition: `transform 0.5s cubic-bezier(0.34,1.56,0.64,1) ${120 + i * 90}ms`,
              }}
            />
            {/* text with an animated strike line drawing through it */}
            <span className="relative text-[15px] font-medium text-foreground/70">
              {text}
              <span
                aria-hidden
                className="absolute left-0 top-1/2 h-px -translate-y-1/2 bg-destructive/45"
                style={{
                  width: shown ? "100%" : "0%",
                  transition: `width 0.6s cubic-bezier(0.16,1,0.3,1) ${500 + i * 90}ms`,
                }}
              />
            </span>
          </li>
        ))}
      </ul>

      {/* ── Right: the solution, boxless with an accent bar ───────── */}
      <div className="relative pl-6">
        {/* gradient accent bar that grows down */}
        <span
          aria-hidden
          className="absolute left-0 top-1 w-[3px] rounded-full bg-gradient-to-b from-primary to-secondary"
          style={{
            height: shown ? "calc(100% - 0.5rem)" : "0%",
            transition: `height 0.8s cubic-bezier(0.16,1,0.3,1) ${ITEMS.length * 90 + 200}ms`,
          }}
        />

        <Sparkles
          className="mb-4 h-6 w-6 text-primary"
          style={{
            opacity: shown ? 1 : 0,
            transform: shown ? "scale(1) rotate(0deg)" : "scale(0) rotate(-120deg)",
            transition: `opacity 0.5s ease ${ITEMS.length * 90 + 300}ms, transform 0.6s cubic-bezier(0.34,1.56,0.64,1) ${ITEMS.length * 90 + 300}ms`,
          }}
        />

        <p
          className="text-lg font-medium leading-relaxed text-foreground"
          style={{
            opacity: shown ? 1 : 0,
            transform: shown ? "translateY(0)" : "translateY(10px)",
            transition: `opacity 0.7s ease ${ITEMS.length * 90 + 380}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${ITEMS.length * 90 + 380}ms`,
          }}
        >
          SMSLocal connects voice conversations with your existing support workflow —{" "}
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text font-semibold text-transparent">
            every call in context, every time.
          </span>
        </p>
      </div>
    </div>
  )
}
