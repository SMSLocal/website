"use client"

import { useEffect, useRef, useState } from "react"
import { Check, X } from "lucide-react"

const BUILT_FOR = ["Calling inside your support inbox", "Customer context on every call", "Simple, fast workflows"]
const NOT_FOR = ["Enterprise PBX systems", "Complex IVR trees", "Large call queues", "Heavy contact-center infrastructure"]

const ease = "cubic-bezier(0.16,1,0.3,1)"
const spring = "cubic-bezier(0.34,1.56,0.64,1)"

export function VoiceFit() {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setShown(true)
      return
    }

    let interval: ReturnType<typeof setInterval> | undefined
    let visible = false

    const replay = () => {
      setShown(false)
      requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)))
    }

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !visible) {
          visible = true
          replay()
          interval = setInterval(replay, 4500)
        } else if (!e.isIntersecting && visible) {
          visible = false
          if (interval) clearInterval(interval)
        }
      },
      { threshold: 0.2 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      if (interval) clearInterval(interval)
    }
  }, [])

  return (
    <div ref={ref} className="relative mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-16">
      {/* center divider with gradient + glow */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-2 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-border to-transparent md:block"
        style={{
          height: shown ? "calc(100% - 1rem)" : "0%",
          transition: `height 0.9s ${ease} 0.2s`,
        }}
      />

      {/* ── Built for ───────────────────────────────────────────── */}
      <div>
        <div
          className="mb-7"
          style={{
            opacity: shown ? 1 : 0,
            transform: shown ? "translateY(0)" : "translateY(-10px)",
            transition: `opacity 0.5s ease, transform 0.5s ${ease}`,
          }}
        >
          <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
              <Check className="h-3.5 w-3.5" />
            </span>
            Built for teams that need
          </p>
          <span
            aria-hidden
            className="mt-3 block h-px origin-left rounded-full bg-gradient-to-r from-primary to-transparent"
            style={{ transform: shown ? "scaleX(1)" : "scaleX(0)", transition: `transform 0.7s ${ease} 0.25s` }}
          />
        </div>

        <ul className="space-y-1">
          {BUILT_FOR.map((t, i) => (
            <li
              key={t}
              className="group flex items-center gap-3.5 rounded-lg py-2.5 text-[15px] font-medium text-foreground transition-colors"
              style={{
                opacity: shown ? 1 : 0,
                transform: shown ? "translateX(0)" : "translateX(-22px)",
                transition: `opacity 0.55s ease ${i * 110}ms, transform 0.55s ${ease} ${i * 110}ms`,
              }}
            >
              <span
                className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/15 transition-all group-hover:bg-primary group-hover:text-primary-foreground"
                style={{
                  transform: shown ? "scale(1)" : "scale(0)",
                  transition: `transform 0.5s ${spring} ${130 + i * 110}ms`,
                }}
              >
                <Check className="h-4 w-4" />
              </span>
              {t}
            </li>
          ))}
        </ul>
      </div>

      {/* ── Not designed for ────────────────────────────────────── */}
      <div>
        <div
          className="mb-7"
          style={{
            opacity: shown ? 1 : 0,
            transform: shown ? "translateY(0)" : "translateY(-10px)",
            transition: `opacity 0.5s ease 0.15s, transform 0.5s ${ease} 0.15s`,
          }}
        >
          <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-muted-foreground/10">
              <X className="h-3.5 w-3.5" />
            </span>
            Not designed for
          </p>
          <span
            aria-hidden
            className="mt-3 block h-px origin-left rounded-full bg-gradient-to-r from-muted-foreground/40 to-transparent"
            style={{ transform: shown ? "scaleX(1)" : "scaleX(0)", transition: `transform 0.7s ${ease} 0.4s` }}
          />
        </div>

        <ul className="space-y-1">
          {NOT_FOR.map((t, i) => (
            <li
              key={t}
              className="flex items-center gap-3.5 py-2.5 text-[15px] text-muted-foreground"
              style={{
                opacity: shown ? 1 : 0,
                transform: shown ? "translateX(0)" : "translateX(22px)",
                transition: `opacity 0.55s ease ${200 + i * 110}ms, transform 0.55s ${ease} ${200 + i * 110}ms`,
              }}
            >
              <span
                className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted-foreground/[0.07] text-muted-foreground/55 ring-1 ring-border"
                style={{
                  transform: shown ? "scale(1)" : "scale(0)",
                  transition: `transform 0.5s ${spring} ${320 + i * 110}ms`,
                }}
              >
                <X className="h-3.5 w-3.5" />
              </span>
              <span className="line-through decoration-muted-foreground/25">{t}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
