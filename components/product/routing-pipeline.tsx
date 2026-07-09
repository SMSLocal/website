"use client"

import { useEffect, useRef, useState } from "react"
import {
  ArrowRight,
  BellRing,
  CheckCheck,
  Clock3,
  GitBranch,
  Languages,
  Mail,
  MessageCircle,
  Phone,
  Tag,
  Users,
  Workflow,
  Zap,
} from "lucide-react"

/**
 * "Smart routing" visual — boxless animated pipeline.
 *
 * No cards: incoming messages (left) flow along glowing rails into a pulsing
 * routing engine (center) and out to the right agent (right). A synchronized
 * loop lights up one message, the rule that catches it, and the agent it lands
 * on — so you can watch routing happen. The five capability pills below are a
 * plain icon row, no boxes. Honours prefers-reduced-motion.
 */

const INCOMING = [
  { Icon: MessageCircle, tint: "text-emerald-500 bg-emerald-500/10", t: 'WhatsApp · "billing issue"' },
  { Icon: Mail, tint: "text-sky-500 bg-sky-500/10", t: "Email · refund (Hindi)" },
  { Icon: Phone, tint: "text-amber-500 bg-amber-500/10", t: "Voice · urgent callback" },
]

const RULES = [
  { Icon: Languages, t: "Language → native-speaker team" },
  { Icon: Tag, t: 'Tag "billing" → finance queue' },
  { Icon: BellRing, t: "Priority → front of the line" },
  { Icon: Clock3, t: "After hours → on-call agent" },
]

const AGENTS = [
  { initials: "AR", name: "Arjun", role: "Hindi · Billing", c: "from-primary to-[oklch(0.72_0.17_165)]" },
  { initials: "PR", name: "Priya", role: "WhatsApp lead", c: "from-sky-500 to-cyan-400" },
  { initials: "ME", name: "Meera", role: "On-call · Voice", c: "from-amber-500 to-orange-400" },
]

// step → which agent / rule lights up (logical routing).
const AGENT_FOR_STEP = [1, 0, 2]
const RULE_FOR_STEP = [1, 0, 2]

const PILLS = [
  { Icon: Zap, t: "Auto assignment" },
  { Icon: GitBranch, t: "Round robin" },
  { Icon: Users, t: "Team routing" },
  { Icon: BellRing, t: "Priority handling" },
  { Icon: Clock3, t: "Business-hour rules" },
]

function Rail() {
  return (
    <div className="flex items-center justify-center py-1 lg:py-0">
      {/* mobile: a downward arrow */}
      <span className="inline-flex h-8 w-8 rotate-90 items-center justify-center rounded-full bg-primary/10 text-primary lg:hidden">
        <ArrowRight className="h-4 w-4" />
      </span>
      {/* desktop: horizontal rail with streaming packets */}
      <div className="relative hidden h-px w-full min-w-[44px] bg-gradient-to-r from-primary/15 via-primary/45 to-primary/15 lg:block">
        {[0, 0.9, 1.8].map((d) => (
          <span
            key={d}
            aria-hidden
            className="animate-flow-x absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_8px_var(--primary)]"
            style={{ animationDelay: `${d}s` }}
          />
        ))}
      </div>
    </div>
  )
}

export function RoutingPipeline() {
  const ref = useRef<HTMLDivElement>(null)
  const [started, setStarted] = useState(false)
  const [reduced, setReduced] = useState(false)
  const [step, setStep] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true)
      return
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setStarted(true)
          io.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (reduced || !started) return
    const t = setInterval(() => setStep((s) => (s + 1) % INCOMING.length), 2100)
    return () => clearInterval(t)
  }, [reduced, started])

  const live = started && !reduced
  const activeIn = live ? step : -1
  const activeAgent = live ? AGENT_FOR_STEP[step] : -1
  const activeRule = live ? RULE_FOR_STEP[step] : -1

  return (
    <div ref={ref}>
      <div className="mt-12 grid grid-cols-1 items-center gap-4 lg:grid-cols-[1fr_auto_1.2fr_auto_1fr]">
        {/* ── Incoming ─────────────────────────────────────────── */}
        <div>
          <p className="mb-3 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Incoming</p>
          <ul className="space-y-2.5">
            {INCOMING.map((e, i) => (
              <li
                key={e.t}
                className={`flex items-center gap-2.5 rounded-xl px-2 py-1.5 transition-all duration-500 ${
                  activeIn === i ? "scale-[1.03] bg-primary/5" : "scale-100"
                }`}
              >
                <span
                  className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${e.tint} transition-shadow duration-300 ${
                    activeIn === i ? "shadow-[0_0_0_3px_var(--primary)]" : ""
                  }`}
                >
                  <e.Icon className="h-4 w-4" />
                </span>
                <span className="truncate text-[12.5px] text-foreground">{e.t}</span>
              </li>
            ))}
          </ul>
        </div>

        <Rail />

        {/* ── Routing engine ───────────────────────────────────── */}
        <div className="flex flex-col items-center text-center">
          {/* glowing core */}
          <span className="relative mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/70 text-primary-foreground shadow-[0_0_36px_-6px_var(--primary)]">
            {!reduced && (
              <>
                <span className="absolute inset-0 animate-[pulse-ring_2.6s_ease-out_infinite] rounded-full border border-primary/50" />
                <span className="absolute inset-0 animate-[pulse-ring_2.6s_ease-out_infinite] rounded-full border border-primary/40 [animation-delay:1.3s]" />
              </>
            )}
            <Workflow className="h-7 w-7" />
          </span>
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-primary">Routing rules</p>
          <ul className="mt-3 space-y-2">
            {RULES.map((r, i) => (
              <li
                key={r.t}
                className={`flex items-center gap-2 text-[12.5px] transition-all duration-300 ${
                  activeRule === i ? "font-semibold text-primary" : "font-medium text-foreground"
                }`}
              >
                <r.Icon className={`h-4 w-4 shrink-0 ${activeRule === i ? "text-primary" : "text-primary/60"}`} />
                <span>{r.t}</span>
              </li>
            ))}
          </ul>
        </div>

        <Rail />

        {/* ── Assigned agents ──────────────────────────────────── */}
        <div>
          <p className="mb-3 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Assigned to</p>
          <ul className="space-y-2.5">
            {AGENTS.map((a, i) => (
              <li
                key={a.name}
                className={`flex items-center gap-2.5 rounded-xl px-2 py-1.5 transition-all duration-500 ${
                  activeAgent === i ? "scale-[1.03] bg-primary/5" : "scale-100"
                }`}
              >
                <span
                  className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${a.c} text-[11px] font-semibold text-white transition-shadow duration-300 ${
                    activeAgent === i ? "shadow-[0_0_0_3px_var(--primary)]" : ""
                  }`}
                >
                  {a.initials}
                </span>
                <span className="min-w-0">
                  <span className="block text-[12.5px] font-semibold text-foreground">{a.name}</span>
                  <span className="block text-[11px] text-muted-foreground">{a.role}</span>
                </span>
                <CheckCheck
                  className={`ml-auto h-4 w-4 shrink-0 text-primary transition-all duration-300 ${
                    activeAgent === i ? "scale-125" : "scale-100 opacity-50"
                  }`}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── capability pills (boxless icon row) ────────────────── */}
      <div className="mx-auto mt-14 flex max-w-4xl flex-wrap items-center justify-center gap-x-9 gap-y-6">
        {PILLS.map((p, i) => (
          <div
            key={p.t}
            className="group flex items-center gap-2.5 transition-all duration-500"
            style={{
              transitionDelay: `${i * 80}ms`,
              opacity: started || reduced ? 1 : 0,
              transform: started || reduced ? "none" : "translateY(10px)",
            }}
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
              <p.Icon className="h-4 w-4" />
            </span>
            <span className="text-[13px] font-semibold text-foreground transition-colors group-hover:text-primary">{p.t}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
