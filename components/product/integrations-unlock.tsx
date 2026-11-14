"use client"

import { useEffect, useState, type ComponentType, type ReactNode } from "react"
import { Check, Facebook, Instagram, KeyRound, Lock, Mail, MessageCircle, MessageSquareText, MessagesSquare, Phone, Send, Sparkles } from "lucide-react"

// "Native channels" for /products/integrations: pick a plan and the channels it unlocks light up, the rest stay
// locked. Cycles through the plans until the visitor chooses one. All channel names stay in the page.

type Plan = "Free" | "Starter" | "Growth"

const PLANS: { plan: Plan; note: string }[] = [
  { plan: "Free", note: "Start sending today" },
  { plan: "Starter", note: "Adds OTP, voice and chat" },
  { plan: "Growth", note: "Adds social messaging" },
]

const CHANNELS: { name: string; plan: Plan; Icon: ComponentType<{ className?: string }> }[] = [
  { name: "Bulk SMS", plan: "Free", Icon: MessageSquareText },
  { name: "WhatsApp", plan: "Free", Icon: MessageCircle },
  { name: "Email", plan: "Free", Icon: Mail },
  { name: "OTP SMS", plan: "Starter", Icon: KeyRound },
  { name: "RCS", plan: "Starter", Icon: Sparkles },
  { name: "Voice / IVR", plan: "Starter", Icon: Phone },
  { name: "Live Chat", plan: "Starter", Icon: MessagesSquare },
  { name: "Telegram", plan: "Starter", Icon: Send },
  { name: "Instagram", plan: "Growth", Icon: Instagram },
  { name: "Messenger", plan: "Growth", Icon: Facebook },
]

const RANK: Record<Plan, number> = { Free: 0, Starter: 1, Growth: 2 }

export function IntegrationsUnlock({ children }: { children?: ReactNode }) {
  const [active, setActive] = useState(0)
  const [auto, setAuto] = useState(true)

  useEffect(() => {
    if (!auto) return
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setActive(2)
      return
    }
    const id = window.setInterval(() => setActive((a) => (a + 1) % 3), 3800)
    return () => window.clearInterval(id)
  }, [auto])

  const unlocked = CHANNELS.filter((c) => RANK[c.plan] <= active).length

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-14">
      {/* left: copy, plan switch and counter */}
      <div>
        {children}

        <div role="tablist" aria-label="Plan" className="mt-8 grid max-w-md grid-cols-3 gap-1.5 rounded-full bg-muted p-1.5 ring-1 ring-border">
          {PLANS.map((p, i) => (
            <button
              key={p.plan}
              role="tab"
              aria-selected={i === active}
              onClick={() => { setActive(i); setAuto(false) }}
              className={`rounded-full px-4 py-2.5 text-[14px] font-semibold transition-all duration-300 ${i === active ? "bg-gradient-to-b from-primary/85 to-primary text-primary-foreground shadow-[0_12px_22px_-10px] shadow-primary/60" : "text-muted-foreground hover:text-foreground"}`}
            >
              {p.plan}
            </button>
          ))}
        </div>

        <div className="mt-7 flex items-center gap-5 rounded-3xl border border-border bg-card p-5 shadow-[0_24px_46px_-34px_rgba(15,42,58,.5)]">
          <p className="shrink-0 text-[48px] font-extrabold leading-none tracking-tight">
            <span className="text-primary">{unlocked}</span>
            <span className="text-[26px] text-muted-foreground/60"> / 10</span>
          </p>
          <div className="min-w-0 flex-1">
            <p className="text-[14.5px] font-semibold leading-tight">channels on the {PLANS[active].plan} plan</p>
            <p className="mt-0.5 text-[13px] text-muted-foreground">{PLANS[active].note}</p>
            <span className="mt-3 block h-2 overflow-hidden rounded-full bg-primary/15"><i className="block h-full rounded-full bg-gradient-to-r from-primary/70 to-primary transition-all duration-700" style={{ width: `${unlocked * 10}%` }} /></span>
          </div>
        </div>
      </div>

      {/* right: the ten channels, two columns */}
      <ul className="grid gap-3 sm:grid-cols-2">
        {CHANNELS.map((c) => {
          const rank = RANK[c.plan]
          const state = rank < active ? "on" : rank === active ? "new" : "locked"
          return (
            <li
              key={`${c.name}-${state === "new" ? active : "x"}`}
              className={`flex items-center gap-4 rounded-2xl border px-4 py-3.5 transition-all duration-500 ${
                state === "locked"
                  ? "border-border bg-muted/50 opacity-60 grayscale"
                  : state === "new"
                    ? "border-primary/50 bg-card shadow-[0_22px_40px_-24px] shadow-primary/60"
                    : "border-border bg-card shadow-[0_16px_30px_-26px_rgba(15,42,58,.5)]"
              }`}
              style={state === "new" ? { animation: "iu-pop .55s cubic-bezier(.3,1.4,.5,1) both" } : undefined}
            >
              <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors duration-500 ${state === "locked" ? "bg-background text-muted-foreground" : "bg-gradient-to-b from-primary/80 to-primary text-primary-foreground shadow-[0_12px_20px_-10px] shadow-primary/55 ring-1 ring-white/30"}`}>
                {state === "locked" ? <Lock className="h-5 w-5" /> : <c.Icon className="h-5 w-5" />}
              </span>
              <span className="min-w-0">
                <span className="block text-[14.5px] font-semibold leading-tight tracking-tight">{c.name}</span>
                <span className={`mt-1 flex items-center gap-1 text-[10.5px] font-bold uppercase tracking-[0.12em] ${state === "locked" ? "text-muted-foreground" : "text-primary"}`}>
                  {state === "locked" ? `From ${c.plan}` : (<><Check className="h-3 w-3" strokeWidth={3.5} />{state === "new" ? "Unlocked" : "Included"}</>)}
                </span>
              </span>
            </li>
          )
        })}
      </ul>
      <style>{`@keyframes iu-pop { 0% { transform: scale(.94); opacity: .4 } 100% { transform: none; opacity: 1 } } @media (prefers-reduced-motion: reduce) { li[style*="iu-pop"] { animation: none !important } }`}</style>
    </div>
  )
}
