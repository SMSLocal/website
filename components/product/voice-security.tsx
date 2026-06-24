"use client"

import { useEffect, useRef, useState } from "react"
import { Globe, KeyRound, ShieldCheck, Workflow } from "lucide-react"

const SECURITY = [
  { Icon: ShieldCheck, label: "AES-256 encryption", note: "At rest and in transit" },
  { Icon: Globe, label: "GDPR compliant", note: "Data-subject tooling built in" },
  { Icon: Globe, label: "CCPA compliant", note: "Consumer privacy honored" },
  { Icon: KeyRound, label: "Multi-factor auth", note: "MFA on every login" },
  { Icon: ShieldCheck, label: "Secure cloud infrastructure", note: "Redundant & monitored" },
  { Icon: Workflow, label: "SOC 2 Type II", note: "In progress" },
]

const ease = "cubic-bezier(0.16,1,0.3,1)"
const spring = "cubic-bezier(0.34,1.56,0.64,1)"

export function VoiceSecurity() {
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
          interval = setInterval(replay, 5000)
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
    <div ref={ref} className="mt-14 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {SECURITY.map(({ Icon, label, note }, i) => (
        <div
          key={label}
          className="group relative flex items-center gap-4"
          style={{
            opacity: shown ? 1 : 0,
            transform: shown ? "translateY(0)" : "translateY(20px)",
            transition: `opacity 0.6s ease ${i * 110}ms, transform 0.6s ${ease} ${i * 110}ms`,
          }}
        >
          {/* radar icon — boxless, with radiating pulse rings */}
          <span
            className="relative flex h-12 w-12 shrink-0 items-center justify-center"
            style={{
              transform: shown ? "scale(1)" : "scale(0)",
              transition: `transform 0.55s ${spring} ${130 + i * 110}ms`,
            }}
          >
            {/* radar sweep rings */}
            <span
              aria-hidden
              className="absolute inset-0 rounded-full ring-1 ring-primary/40"
              style={{ animation: "voice-radar 2.4s ease-out infinite", animationDelay: `${i * 0.3}s` }}
            />
            <span
              aria-hidden
              className="absolute inset-0 rounded-full ring-1 ring-primary/30"
              style={{ animation: "voice-radar 2.4s ease-out infinite", animationDelay: `${i * 0.3 + 1.2}s` }}
            />
            {/* core */}
            <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-primary ring-1 ring-primary/30 transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
              <Icon className="h-5 w-5" />
            </span>
          </span>

          <div className="min-w-0">
            <p className="text-[14.5px] font-semibold text-white">{label}</p>
            <p className="mt-0.5 text-[12.5px] text-white/55">{note}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
