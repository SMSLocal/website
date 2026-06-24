"use client"

import { useEffect, useRef, useState } from "react"
import {
  ArrowLeftRight,
  AtSign,
  CheckCheck,
  History,
  MessageSquare,
  Users,
  type LucideIcon,
} from "lucide-react"

/**
 * "Built for teams" feature list — boxless replacement for the old card grid.
 * Each capability is just a tinted icon + title + copy, separated by hairline
 * rules (no cards). Items reveal with a stagger on scroll and lift on hover.
 */

type Feature = { Icon: LucideIcon; tint: string; title: string; desc: string }

const FEATURES: Feature[] = [
  { Icon: Users, tint: "text-emerald-500", title: "Assign conversations", desc: "Route a thread to the right owner in one click — no more “who's got this?”." },
  { Icon: MessageSquare, tint: "text-sky-500", title: "Internal notes", desc: "Discuss privately on the thread. Customers never see it; teammates always do." },
  { Icon: AtSign, tint: "text-violet-500", title: "@Mentions", desc: "Pull in an expert mid-conversation without leaving the inbox." },
  { Icon: ArrowLeftRight, tint: "text-amber-500", title: "Ownership transfer", desc: "Hand off with full context attached — nothing gets re-explained." },
  { Icon: CheckCheck, tint: "text-teal-500", title: "Shared visibility", desc: "Everyone sees what's open, claimed, and resolved in real time." },
  { Icon: History, tint: "text-pink-500", title: "Activity timeline", desc: "A complete audit trail of every reply, note, and assignment." },
]

export function TeamFeatureList() {
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
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className="mt-8 grid grid-cols-1 gap-x-8 sm:grid-cols-2">
      {FEATURES.map((f, i) => (
        <div
          key={f.title}
          className="group relative border-t border-border/60 py-5 transition-all duration-500"
          style={{
            transitionDelay: `${i * 90}ms`,
            opacity: shown ? 1 : 0,
            transform: shown ? "none" : "translateY(12px)",
          }}
        >
          {/* accent rule that grows in on hover (replaces the old card border) */}
          <span
            aria-hidden
            className="absolute left-0 top-0 h-px w-0 bg-gradient-to-r from-primary to-transparent transition-all duration-300 group-hover:w-2/3"
          />
          <div className="flex items-start gap-3.5">
            <span className={`mt-0.5 shrink-0 transition-transform duration-300 group-hover:scale-110 ${f.tint}`}>
              <f.Icon className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <h3 className="text-[14.5px] font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
                {f.title}
              </h3>
              <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{f.desc}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
