"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowDownRight, MousePointerClick, Sparkles } from "lucide-react"

const ease = "cubic-bezier(0.16,1,0.3,1)"

export function AutomationDemoCta() {
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
    transform: shown ? "translateY(0)" : "translateY(16px)",
    transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ${ease} ${delay}ms`,
  })

  return (
    <div ref={ref} className="relative overflow-hidden py-6">
      {/* boxless ambient glow */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-10 h-72 w-72 rounded-full opacity-50 blur-3xl"
        style={{ background: "radial-gradient(circle, color-mix(in oklch, var(--primary) 26%, transparent), transparent 70%)" }}
      />

      <div className="relative max-w-2xl">
        <span
          className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-primary"
          style={reveal(0)}
        >
          <Sparkles className="h-3.5 w-3.5" /> Try the live demo
        </span>

        <h2
          className="mt-4 text-pretty text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          style={reveal(100)}
        >
          See the AI chatbot{" "}
          <span className="bg-gradient-to-r from-primary to-[oklch(0.72_0.17_165)] bg-clip-text text-transparent">
            in action.
          </span>
        </h2>

        <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground" style={reveal(200)}>
          The chat bubble in the bottom-right corner is a live SMSLocal AI assistant. Open it, send a
          message, and watch an automated first response come back — exactly what your customers would
          experience.
        </p>

        {/* boxless prompt — animated pointer that nudges toward the bubble */}
        <div className="mt-6 inline-flex items-center gap-2.5 text-[13.5px] font-medium text-foreground" style={reveal(300)}>
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
            <MousePointerClick className="h-4 w-4" />
          </span>
          Click the chat bubble at the bottom-right to start
          <ArrowDownRight className="h-4 w-4 text-primary motion-safe:animate-bounce" />
        </div>
      </div>
    </div>
  )
}
