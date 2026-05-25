"use client"

import { useEffect, useState } from "react"
import { Bot, Check, CheckCheck, ShieldCheck, X, Zap } from "lucide-react"

const FEATURES = [
  { id: 0, name: "Bulk SMS", tag: "Blast thousands in seconds" },
  { id: 1, name: "WhatsApp AI", tag: "Auto-replies in 8 Indian languages" },
  { id: 2, name: "OTP", tag: "Verification codes in 0.3 seconds" },
  { id: 3, name: "Cascade", tag: "Automatic multi-channel failover" },
] as const

export function HeroFeatures() {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const t = setTimeout(() => setStep((s) => (s + 1) % FEATURES.length), 4600)
    return () => clearTimeout(t)
  }, [step])

  const feature = FEATURES[step]

  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      <div
        aria-hidden
        className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-tr from-primary/15 via-transparent to-accent/15 blur-3xl"
      />

      <div className="relative rounded-2xl border border-border bg-card p-5 shadow-2xl shadow-foreground/10 sm:p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-primary">
              See it work
            </div>
            <div className="mt-0.5 text-lg font-bold text-foreground">{feature.name}</div>
            <div className="text-[12.5px] text-muted-foreground">{feature.tag}</div>
          </div>
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
          </span>
        </div>

        {/* Scene */}
        <div key={step} className="mt-4 min-h-[230px]">
          {step === 0 && <BulkScene />}
          {step === 1 && <AiScene />}
          {step === 2 && <OtpScene />}
          {step === 3 && <CascadeScene />}
        </div>

        {/* Step nav */}
        <div className="mt-5 grid grid-cols-4 gap-2">
          {FEATURES.map((f) => {
            const active = f.id === step
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setStep(f.id)}
                aria-pressed={active}
                className="group/step text-left"
              >
                <div className="h-1 overflow-hidden rounded-full bg-secondary">
                  {active ? (
                    <div key={`p-${step}`} className="animate-hero-progress h-full rounded-full bg-primary" />
                  ) : (
                    <div className="h-full w-0 rounded-full bg-primary" />
                  )}
                </div>
                <span
                  className={`mt-1.5 block truncate text-[10.5px] font-medium transition ${
                    active ? "text-foreground" : "text-muted-foreground group-hover/step:text-foreground"
                  }`}
                >
                  {f.name}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Floating accents */}
      <FloatingCard className="animate-float-slow -left-14 top-20" icon={Zap} title="98% in <1s" sub="direct routes" />
      <FloatingCard className="animate-float-slower -right-12 bottom-24" icon={ShieldCheck} title="DLT-compliant" sub="TRAI-approved" delay="0.8s" />
    </div>
  )
}

/* ---------- Scenes ---------- */

function BulkScene() {
  const cells = Array.from({ length: 32 })
  return (
    <div>
      <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
        <span className="rounded-full bg-secondary px-2 py-0.5 font-medium text-foreground">Diwali Sale · 2,418 recipients</span>
        <span className="rounded-full bg-secondary px-2 py-0.5 font-medium text-foreground">SMSLCL</span>
      </div>
      <div className="mt-3 grid grid-cols-8 gap-1.5">
        {cells.map((_, i) => (
          <span
            key={i}
            style={{ animation: "pop-in 0.4s ease both", animationDelay: `${i * 45}ms` }}
            className="flex aspect-square items-center justify-center rounded-md bg-primary/15 text-primary"
          >
            <Check className="h-3 w-3" />
          </span>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-3">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
          <div
            style={{ transformOrigin: "left", animation: "hero-progress 1.5s ease both" }}
            className="h-full w-[98%] rounded-full bg-gradient-to-r from-primary to-accent"
          />
        </div>
        <span className="text-[12px] font-bold text-foreground">98.1%</span>
      </div>
      <div className="mt-2 flex items-center gap-1.5 text-[12px] font-semibold text-primary">
        <CheckCheck className="h-4 w-4" /> 2,371 delivered in 1.8s
      </div>
    </div>
  )
}

function AiScene() {
  return (
    <div className="space-y-2.5 rounded-xl border border-border bg-[oklch(0.97_0.01_150)] p-3">
      <div className="flex items-center gap-2 border-b border-border/60 pb-2">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-[10px] font-bold text-white">P</span>
        <span className="text-[12.5px] font-semibold text-foreground">Priya · WhatsApp</span>
        <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary"><Bot className="h-3 w-3" /> Tamil</span>
      </div>
      <div style={{ animation: "message-in 0.4s ease both" }} className="max-w-[82%] rounded-2xl rounded-tl-sm bg-card px-3 py-2 text-[12.5px] text-foreground shadow-sm">
        பேமென்ட் வெற்றிகரமாக இருந்ததா?
      </div>
      <div style={{ animation: "message-in 0.4s ease both", animationDelay: "0.5s" }} className="ml-auto flex w-fit items-center gap-1 rounded-2xl rounded-tr-sm bg-card px-3 py-2 shadow-sm">
        <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60" style={{ animation: "dot-bounce 1.2s infinite" }} />
        <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60" style={{ animation: "dot-bounce 1.2s infinite 0.15s" }} />
        <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60" style={{ animation: "dot-bounce 1.2s infinite 0.3s" }} />
      </div>
      <div style={{ animation: "message-in 0.4s ease both", animationDelay: "1.1s" }} className="ml-auto max-w-[86%] rounded-2xl rounded-tr-sm bg-primary px-3 py-2 text-[12.5px] text-primary-foreground shadow-sm">
        ஆம், உங்கள் பேமென்ட் உறுதிப்படுத்தப்பட்டது. 🎉
        <div className="mt-1 flex items-center justify-end gap-1 text-[9.5px] text-primary-foreground/75"><Bot className="h-3 w-3" /> AI · 0.8s <CheckCheck className="h-3 w-3" /></div>
      </div>
    </div>
  )
}

function OtpScene() {
  return (
    <div className="flex flex-col items-center justify-center py-2">
      <div style={{ animation: "pop-in 0.5s ease both" }} className="w-full max-w-[260px] rounded-xl border border-border bg-background p-4 text-center">
        <div className="text-[11px] font-medium text-muted-foreground">Your SMSLocal OTP</div>
        <div className="mt-1.5 flex justify-center gap-1.5">
          {["4", "8", "2", "9", "1", "3"].map((d, i) => (
            <span key={i} style={{ animation: "pop-in 0.35s ease both", animationDelay: `${0.3 + i * 0.1}s` }} className="flex h-9 w-7 items-center justify-center rounded-md bg-primary/10 text-base font-bold text-primary">
              {d}
            </span>
          ))}
        </div>
        <div className="mt-2 text-[11px] text-muted-foreground">Valid for 10 minutes</div>
      </div>
      <div style={{ animation: "pop-in 0.4s ease both", animationDelay: "1s" }} className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-[12.5px] font-semibold text-primary">
        <CheckCheck className="h-4 w-4" /> Delivered & verified in 0.3s
      </div>
    </div>
  )
}

function CascadeScene() {
  const steps = [
    { ch: "RCS", note: "Not RCS-capable", ok: false },
    { ch: "WhatsApp", note: "No WhatsApp on number", ok: false },
    { ch: "SMS", note: "Delivered in 0.4s", ok: true },
  ]
  return (
    <div className="space-y-2">
      {steps.map((s, i) => (
        <div
          key={s.ch}
          style={{ animation: "message-in 0.4s ease both", animationDelay: `${i * 0.5}s` }}
          className={`flex items-center gap-2.5 rounded-xl border p-2.5 ${s.ok ? "border-primary/30 bg-primary/5" : "border-border bg-background"}`}
        >
          <span className="text-[11px] font-bold text-muted-foreground">{i + 1}</span>
          <span className={`inline-flex h-7 w-7 items-center justify-center rounded-lg ${s.ok ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>
            {s.ok ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
          </span>
          <div className="flex-1">
            <div className="text-[12.5px] font-semibold text-foreground">{s.ch}</div>
            <div className="text-[11px] text-muted-foreground">{s.note}</div>
          </div>
          <span className={`text-[11px] font-semibold ${s.ok ? "text-primary" : "text-muted-foreground"}`}>{s.ok ? "Delivered" : "Skipped"}</span>
        </div>
      ))}
    </div>
  )
}

/* ---------- Floating accent ---------- */

function FloatingCard({
  className,
  icon: Icon,
  title,
  sub,
  delay,
}: {
  className: string
  icon: React.ComponentType<{ className?: string }>
  title: string
  sub?: string
  delay?: string
}) {
  return (
    <div
      aria-hidden
      style={delay ? { animationDelay: delay } : undefined}
      className={`pointer-events-none absolute z-20 hidden items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 shadow-xl shadow-foreground/10 backdrop-blur-sm xl:flex ${className}`}
    >
      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="h-4 w-4" />
      </span>
      <span className="leading-tight">
        <span className="block text-[12.5px] font-semibold text-foreground">{title}</span>
        {sub ? <span className="block text-[10.5px] text-muted-foreground">{sub}</span> : null}
      </span>
    </div>
  )
}
