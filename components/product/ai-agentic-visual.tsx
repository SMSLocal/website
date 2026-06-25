"use client"

import { useEffect, useRef, useState } from "react"
import { Bot, Check, CreditCard, Loader2, Mail, ShoppingCart, Sparkles, Users } from "lucide-react"

type Step = { label: string; status: "done" | "running" | "pending" }
type Run = { goal: string; steps: Step[] }

const RUNS: { goal: string; steps: Omit<Step, "status">[] }[] = [
  {
    goal: "Resolve a refund request",
    steps: [
      { label: "Found the contact in HubSpot" },
      { label: "Looked up the order in Shopify" },
      { label: "Verified the payment in Razorpay" },
      { label: "Issued the refund via Razorpay" },
      { label: "Replied to the customer in the inbox" },
    ],
  },
  {
    goal: "Answer “where is my invoice?”",
    steps: [
      { label: "Matched the customer in the CRM" },
      { label: "Pulled the latest invoice from Razorpay" },
      { label: "Generated a fresh payment link" },
      { label: "Sent the link over WhatsApp" },
      { label: "Logged a note back to the deal" },
    ],
  },
  {
    goal: "Handle a booking change",
    steps: [
      { label: "Read the request from Gmail" },
      { label: "Checked availability in Google Calendar" },
      { label: "Rescheduled the appointment" },
      { label: "Confirmed by SMS & WhatsApp" },
      { label: "Updated the ticket status" },
    ],
  },
]

const TOOLS = [
  { icon: Mail, label: "Gmail" },
  { icon: CreditCard, label: "Razorpay" },
  { icon: Users, label: "HubSpot" },
  { icon: ShoppingCart, label: "Shopify" },
  { icon: Sparkles, label: "Composio" },
]

export function AiAgenticVisual() {
  const [runIdx, setRunIdx] = useState(0)
  const [stepsDone, setStepsDone] = useState(0)
  const tickRef = useRef(0)

  const run = RUNS[runIdx]
  const totalSteps = run.steps.length

  useEffect(() => {
    setStepsDone(0)
    tickRef.current = 0
  }, [runIdx])

  useEffect(() => {
    const id = setInterval(() => {
      tickRef.current += 1
      if (tickRef.current <= totalSteps) {
        setStepsDone(tickRef.current)
      } else if (tickRef.current > totalSteps + 6) {
        setRunIdx((r) => (r + 1) % RUNS.length)
      }
    }, 900)
    return () => clearInterval(id)
  }, [runIdx, totalSteps])

  const steps: Step[] = run.steps.map((s, i) => ({
    ...s,
    status: i < stepsDone ? "done" : i === stepsDone ? "running" : "pending",
  }))

  const allDone = stepsDone >= totalSteps

  return (
    <div className="relative mx-auto w-full max-w-[480px]">
      {/* ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-8 -z-10 rounded-[36px] opacity-50 blur-3xl"
        style={{ background: "radial-gradient(circle, color-mix(in oklch, var(--primary) 30%, transparent), transparent 70%)" }}
      />

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[oklch(0.16_0.02_230)]/95 shadow-2xl backdrop-blur-xl">
        {/* header */}
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-primary/20 text-primary">
              <Bot className="h-4 w-4" />
            </span>
            <span className="text-[13px] font-semibold text-white">Captain AI</span>
          </div>
          <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10.5px] font-semibold uppercase tracking-wider ${allDone ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300" : "border-primary/30 bg-primary/10 text-primary"}`}>
            <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${allDone ? "bg-emerald-400" : "bg-primary"}`}>
              {!allDone && <span className="absolute inset-0 animate-ping rounded-full bg-primary/70" />}
            </span>
            {allDone ? "Complete" : "Running"}
          </span>
        </div>

        {/* goal */}
        <div className="border-b border-white/8 px-4 py-2.5">
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-white/40">Goal</p>
          <p key={runIdx} className="mt-0.5 text-[13px] font-medium text-white/90" style={{ animation: "agentFadeIn 0.4s ease-out both" }}>
            {run.goal}
          </p>
        </div>

        {/* steps */}
        <div className="flex flex-col gap-0 px-4 py-3">
          {steps.map((s, i) => (
            <div
              key={`${runIdx}-${i}`}
              className="flex items-center gap-3 py-1.5"
              style={{ animation: "agentFadeIn 0.35s ease-out both", animationDelay: `${i * 0.06}s` }}
            >
              {s.status === "done" ? (
                <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
              ) : s.status === "running" ? (
                <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Loader2 className="h-3 w-3 animate-spin" />
                </span>
              ) : (
                <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/5">
                  <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                </span>
              )}
              <span className={`text-[12.5px] ${s.status === "done" ? "text-white/70 line-through decoration-white/20" : s.status === "running" ? "font-medium text-white" : "text-white/30"}`}>
                {s.label}
              </span>
              {s.status === "running" && (
                <span className="ml-auto flex gap-0.5">
                  {[0, 1, 2].map((d) => (
                    <span key={d} className="h-1 w-1 rounded-full bg-primary/60" style={{ animation: `agentDot 1.2s ease-in-out ${d * 0.2}s infinite` }} />
                  ))}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* tools footer */}
        <div className="flex items-center gap-2 border-t border-white/8 bg-white/[0.02] px-4 py-2.5">
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/30">Tools</span>
          <div className="flex flex-wrap gap-1.5">
            {TOOLS.map((t) => {
              const Icon = t.icon
              return (
                <span key={t.label} className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10.5px] text-white/55">
                  <Icon className="h-3 w-3 text-primary" /> {t.label}
                </span>
              )
            })}
          </div>
        </div>
      </div>

      {/* floating chip: agents online */}
      <div
        className="absolute -bottom-4 -right-3 hidden items-center gap-2 rounded-full border border-emerald-400/30 bg-[oklch(0.18_0.03_230)]/95 px-3 py-1.5 text-[11px] font-semibold text-emerald-300 shadow-xl backdrop-blur md:flex"
        style={{ animation: "agentFloatB 6s ease-in-out infinite" }}
      >
        <span className="relative inline-flex h-1.5 w-1.5">
          <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/70" />
          <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
        </span>
        Captain AI · online
      </div>


      <style jsx>{`
        @keyframes agentFadeIn {
          0% { opacity: 0; transform: translateY(4px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes agentDot {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-2px); opacity: 1; }
        }
        @keyframes agentFloatA {
          0%, 100% { transform: rotate(-4deg) translateY(0); }
          50% { transform: rotate(-4deg) translateY(-5px); }
        }
        @keyframes agentFloatB {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
      `}</style>
    </div>
  )
}
