"use client"

import { useEffect, useState } from "react"
import { Bot, Check, CheckCheck, KeyRound, MessageCircle, Radio, X } from "lucide-react"

const FEATURES = [
  { id: 0, name: "Bulk SMS", tag: "Blast 2,418 recipients in seconds" },
  { id: 1, name: "WhatsApp AI", tag: "Auto-reply in 8 Indian languages" },
  { id: 2, name: "OTP", tag: "Verification codes in 0.3 seconds" },
  { id: 3, name: "Cascade", tag: "Automatic multi-channel failover" },
] as const

export function HeroRotator() {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const t = setTimeout(() => setStep((s) => (s + 1) % FEATURES.length), 4400)
    return () => clearTimeout(t)
  }, [step])

  const feature = FEATURES[step]

  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-primary/20 via-transparent to-accent/20 blur-3xl"
      />

      {/* Label */}
      <div className="text-center lg:text-left">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-primary">See it work</span>
        <h3 key={`h-${step}`} style={{ animation: "message-in 0.4s ease both" }} className="mt-0.5 text-2xl font-bold text-foreground">
          {feature.name}
        </h3>
        <p key={`t-${step}`} style={{ animation: "message-in 0.4s ease both 0.05s" }} className="text-[13px] text-muted-foreground">
          {feature.tag}
        </p>
      </div>

      {/* Stage */}
      <div key={`s-${step}`} className="relative mt-6 flex min-h-[300px] items-center justify-center lg:min-h-[320px]">
        {step === 0 && <BulkScene />}
        {step === 1 && <AiScene />}
        {step === 2 && <OtpScene />}
        {step === 3 && <CascadeScene />}
      </div>

      {/* Progress dots */}
      <div className="mt-4 flex items-center justify-center gap-2 lg:justify-start">
        {FEATURES.map((f) => {
          const active = f.id === step
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => setStep(f.id)}
              aria-label={f.name}
              className="h-1.5 overflow-hidden rounded-full bg-secondary transition-all"
              style={{ width: active ? 36 : 14 }}
            >
              {active ? <span key={`d-${step}`} className="animate-hero-progress block h-full rounded-full bg-primary" /> : null}
            </button>
          )
        })}
      </div>
    </div>
  )
}

/* ---------------- Scenes (free-floating, no enclosing box) ---------------- */

function FloatBadge({ className, children }: { className: string; children: React.ReactNode }) {
  return (
    <div className={`absolute inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-[11.5px] font-semibold text-foreground shadow-lg shadow-foreground/10 ${className}`}>
      {children}
    </div>
  )
}

function BulkScene() {
  return (
    <div className="relative w-full max-w-[360px]">
      <div className="grid grid-cols-12 gap-1.5">
        {Array.from({ length: 60 }).map((_, i) => (
          <span
            key={i}
            style={{ animation: "pop-in 0.4s ease both", animationDelay: `${i * 22}ms` }}
            className="flex aspect-square items-center justify-center rounded-[4px] bg-primary/20 text-primary"
          >
            <Check className="h-2.5 w-2.5" />
          </span>
        ))}
      </div>
      <div className="mx-auto mt-5 flex max-w-[280px] items-center gap-3">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
          <div style={{ transformOrigin: "left", animation: "hero-progress 1.7s ease both" }} className="h-full w-[98%] rounded-full bg-gradient-to-r from-primary to-accent" />
        </div>
        <span className="text-[12px] font-bold text-foreground">98.1%</span>
      </div>
      <FloatBadge className="animate-float-slow -right-2 -top-4">
        <CheckCheck className="h-3.5 w-3.5 text-primary" /> 2,371 delivered · 1.8s
      </FloatBadge>
    </div>
  )
}

function AiScene() {
  return (
    <div className="relative w-full max-w-[340px]">
      <div style={{ animation: "message-in 0.4s ease both 0.1s" }} className="max-w-[78%] rounded-2xl rounded-tl-sm bg-card px-3.5 py-2.5 text-[13px] text-foreground shadow-lg shadow-foreground/10">
        பேமென்ட் வெற்றிகரமாக இருந்ததா?
      </div>
      <div style={{ animation: "message-in 0.5s ease both 0.7s" }} className="ml-auto mt-3 max-w-[82%] rounded-2xl rounded-tr-sm bg-primary px-3.5 py-2.5 text-[13px] text-primary-foreground shadow-lg shadow-primary/25">
        ஆம், உங்கள் பேமென்ட் உறுதிப்படுத்தப்பட்டது 🎉 ஆர்டர் #4821 அனுப்பப்படுகிறது.
        <div className="mt-1 flex items-center justify-end gap-1 text-[10px] text-primary-foreground/75">
          <Bot className="h-3 w-3" /> AI agent · 0.8s <CheckCheck className="h-3 w-3" />
        </div>
      </div>
      <FloatBadge className="animate-float-slower -bottom-5 left-0">
        <MessageCircle className="h-3.5 w-3.5 text-primary" /> Tamil · 1 of 8 languages
      </FloatBadge>
    </div>
  )
}

function OtpScene() {
  return (
    <div className="relative flex flex-col items-center">
      <div className="text-[12px] font-medium text-muted-foreground">Your SMSLocal OTP</div>
      <div className="mt-3 flex gap-2">
        {["4", "8", "2", "9", "1", "3"].map((d, i) => (
          <span
            key={i}
            style={{ animation: "pop-in 0.4s ease both", animationDelay: `${0.2 + i * 0.12}s` }}
            className="flex h-14 w-11 items-center justify-center rounded-xl bg-card text-2xl font-bold text-primary shadow-lg shadow-foreground/10"
          >
            {d}
          </span>
        ))}
      </div>
      <div style={{ animation: "pop-in 0.4s ease both 1s" }} className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-[13px] font-semibold text-primary-foreground shadow-lg shadow-primary/25">
        <CheckCheck className="h-4 w-4" /> Delivered & verified in 0.3s
      </div>
    </div>
  )
}

function CascadeScene() {
  const steps = [
    { ch: "RCS", icon: Radio, note: "Not RCS-capable", ok: false },
    { ch: "WhatsApp", icon: MessageCircle, note: "No WhatsApp on number", ok: false },
    { ch: "SMS", icon: KeyRound, note: "Delivered in 0.4s", ok: true },
  ]
  return (
    <div className="w-full max-w-[320px] space-y-3">
      {steps.map((s, i) => (
        <div
          key={s.ch}
          style={{ animation: "message-in 0.45s ease both", animationDelay: `${i * 0.55}s` }}
          className={`flex items-center gap-3 rounded-2xl px-4 py-3 shadow-lg ${s.ok ? "bg-primary text-primary-foreground shadow-primary/25" : "bg-card text-foreground shadow-foreground/10"}`}
        >
          <span className={`inline-flex h-9 w-9 items-center justify-center rounded-xl ${s.ok ? "bg-white/20" : "bg-secondary text-muted-foreground"}`}>
            {s.ok ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
          </span>
          <div className="flex-1">
            <div className="text-[13.5px] font-semibold">{s.ch}</div>
            <div className={`text-[11.5px] ${s.ok ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{s.note}</div>
          </div>
          <span className="text-[11.5px] font-semibold">{s.ok ? "Delivered" : "Skipped"}</span>
        </div>
      ))}
    </div>
  )
}
