"use client"

import { useEffect, useState } from "react"
import { BarChart3, Bot, Check, CheckCheck, Layers, Send, X } from "lucide-react"

const STEPS = [
  { id: 0, label: "Send SMS", icon: Send },
  { id: 1, label: "AI reply", icon: Bot },
  { id: 2, label: "Cascade", icon: Layers },
  { id: 3, label: "Analytics", icon: BarChart3 },
] as const

export function HeroDemo() {
  const [step, setStep] = useState(0)

  // Auto-advance through the scenes; any manual click resets the timer
  // because this effect re-runs whenever `step` changes.
  useEffect(() => {
    const t = setTimeout(() => setStep((s) => (s + 1) % STEPS.length), 4000)
    return () => clearTimeout(t)
  }, [step])

  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      <div
        aria-hidden
        className="absolute -inset-5 rounded-[2rem] bg-gradient-to-tr from-primary/15 via-transparent to-accent/15 blur-2xl"
      />
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-foreground/10">
        {/* Window bar */}
        <div className="flex items-center gap-3 border-b border-border bg-secondary/60 px-4 py-2.5">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-primary/60" />
          </div>
          <div className="mx-auto flex items-center gap-1.5 rounded-md bg-background px-2.5 py-0.5 text-[11px] text-muted-foreground">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            app.smslocal.in
          </div>
        </div>

        {/* Scene tabs */}
        <div className="flex gap-1 border-b border-border bg-secondary/30 p-2">
          {STEPS.map((s) => {
            const active = s.id === step
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setStep(s.id)}
                aria-pressed={active}
                className={`relative inline-flex flex-1 items-center justify-center gap-1.5 overflow-hidden rounded-md px-2 py-1.5 text-[11.5px] font-medium transition ${
                  active
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <s.icon className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{s.label}</span>
              </button>
            )
          })}
        </div>

        {/* Scene */}
        <div key={step} className="animate-message-in min-h-[296px] p-4 sm:p-5">
          {step === 0 && <SceneSms />}
          {step === 1 && <SceneAi />}
          {step === 2 && <SceneCascade />}
          {step === 3 && <SceneAnalytics />}
        </div>
      </div>
    </div>
  )
}

function SceneSms() {
  return (
    <div>
      <div className="text-[12.5px] font-semibold text-foreground">New SMS campaign</div>
      <div className="mt-3 rounded-xl border border-border bg-background p-3">
        <div className="flex flex-wrap gap-1.5 text-[11px]">
          <span className="rounded-full bg-secondary px-2 py-0.5 font-medium text-foreground">
            To: Diwali Offer · 2,418
          </span>
          <span className="rounded-full bg-secondary px-2 py-0.5 font-medium text-foreground">
            From: SMSLCL
          </span>
        </div>
        <p className="mt-2 text-[12.5px] leading-snug text-foreground">
          Hi {"{name}"}, celebrate Diwali with 25% off your next order 🎉 Shop: smsl.in/diwali
        </p>
        <div className="mt-2 flex items-center justify-between text-[10.5px] text-muted-foreground">
          <span>132/160 · GSM-7</span>
          <span className="font-semibold text-foreground">₹290.16</span>
        </div>
      </div>
      <div className="mt-3 inline-flex items-center gap-2 rounded-lg bg-primary px-3.5 py-2 text-[12.5px] font-semibold text-primary-foreground">
        <Send className="h-3.5 w-3.5" /> Send now
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 rounded-lg bg-primary/5 px-3 py-2.5 text-[12px]">
        <span className="inline-flex items-center gap-1.5 font-semibold text-primary">
          <CheckCheck className="h-4 w-4" /> Delivered 2,371 · 98.1%
        </span>
        <span className="text-muted-foreground">Pending 35 · Failed 12</span>
      </div>
    </div>
  )
}

function SceneAi() {
  return (
    <div>
      <div className="mb-2 flex items-center gap-2">
        <span className="text-[12.5px] font-semibold text-foreground">WhatsApp · AI agent</span>
        <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
          <Bot className="h-3 w-3" /> Tamil
        </span>
      </div>
      <div className="space-y-2.5 rounded-xl border border-border bg-[oklch(0.97_0.01_150)] p-3">
        <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-card px-3 py-2 text-[12.5px] text-foreground shadow-sm">
          பேமென்ட் வெற்றிகரமாக இருந்ததா?
        </div>
        <div className="flex items-center gap-1 pl-1">
          <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60" style={{ animation: "dot-bounce 1.2s infinite" }} />
          <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60" style={{ animation: "dot-bounce 1.2s infinite 0.15s" }} />
          <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60" style={{ animation: "dot-bounce 1.2s infinite 0.3s" }} />
        </div>
        <div className="ml-auto max-w-[88%] rounded-2xl rounded-tr-sm bg-primary px-3 py-2 text-[12.5px] text-primary-foreground shadow-sm">
          ஆம், உங்கள் பேமென்ட் உறுதிப்படுத்தப்பட்டது. 🎉 ஆர்டர் #4821 அனுப்பப்படுகிறது.
          <div className="mt-1 flex items-center justify-end gap-1 text-[10px] text-primary-foreground/70">
            AI agent <CheckCheck className="h-3 w-3" /> 10:24
          </div>
        </div>
      </div>
      <p className="mt-2.5 text-[11.5px] text-muted-foreground">
        Resolved automatically in 8 Indian languages · avg. 0.8s
      </p>
    </div>
  )
}

function SceneCascade() {
  const steps = [
    { ch: "RCS", note: "Not RCS-capable", ok: false },
    { ch: "WhatsApp", note: "No WhatsApp on number", ok: false },
    { ch: "SMS", note: "Delivered in 0.4s", ok: true },
  ]
  return (
    <div>
      <div className="text-[12.5px] font-semibold text-foreground">Cascade · OTP delivery</div>
      <p className="mb-3 mt-0.5 text-[11.5px] text-muted-foreground">
        Cheapest channel first, automatic fallback.
      </p>
      <div className="space-y-2">
        {steps.map((s, i) => (
          <div
            key={s.ch}
            className={`flex items-center gap-2.5 rounded-xl border p-2.5 ${
              s.ok ? "border-primary/30 bg-primary/5" : "border-border bg-background"
            }`}
          >
            <span className="text-[11px] font-bold text-muted-foreground">{i + 1}</span>
            <span
              className={`inline-flex h-7 w-7 items-center justify-center rounded-lg ${
                s.ok ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
              }`}
            >
              {s.ok ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
            </span>
            <div className="flex-1">
              <div className="text-[12.5px] font-semibold text-foreground">{s.ch}</div>
              <div className="text-[11px] text-muted-foreground">{s.note}</div>
            </div>
            <span
              className={`text-[11px] font-semibold ${
                s.ok ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {s.ok ? "Delivered" : "Skipped"}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function SceneAnalytics() {
  const bars = [60, 46, 78, 54, 90, 68, 100]
  return (
    <div>
      <div className="text-[12.5px] font-semibold text-foreground">Delivery · last 7 days</div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {[
          { label: "Sent", value: "42,118" },
          { label: "Delivered", value: "98.4%" },
          { label: "Failed", value: "0.3%" },
        ].map((m) => (
          <div key={m.label} className="rounded-lg border border-border bg-background p-2.5">
            <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{m.label}</div>
            <div className="mt-0.5 text-base font-bold text-foreground">{m.value}</div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex h-24 items-end justify-between gap-1.5 rounded-lg border border-border bg-background p-3">
        {bars.map((h, i) => (
          <div
            key={i}
            className="w-full rounded-t bg-gradient-to-t from-primary/70 to-primary transition-[height] duration-500"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </div>
  )
}
