"use client"

import { useEffect, useState } from "react"
import {
  ArrowDown,
  Bot,
  Check,
  CheckCheck,
  Globe,
  Send,
  ShieldCheck,
  Smartphone,
  Sparkles,
  X,
} from "lucide-react"

const SCENES = [
  { name: "Bulk SMS", pill: "SMS" },
  { name: "WhatsApp AI", pill: "WhatsApp" },
  { name: "OTP", pill: "OTP" },
  { name: "Cascade", pill: "RCS" },
] as const

const PILLS = ["SMS", "WhatsApp", "RCS", "OTP", "AI"]

export function HeroAgent() {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setStep((s) => (s + 1) % SCENES.length), 3800)
    return () => clearInterval(t)
  }, [])

  const scene = SCENES[step]

  return (
    <div className="relative mx-auto flex min-h-[460px] w-full max-w-md flex-col items-center gap-6 py-6 lg:max-w-none">
      {/* Ambient glow + texture */}
      <div aria-hidden className="absolute left-1/2 top-1/2 -z-10 h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-primary/20 via-transparent to-accent/20 blur-3xl" />
      <div aria-hidden className="bg-grid-light absolute inset-0 -z-10 opacity-50 [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_70%)]" />

      {/* Script accent */}
      <span aria-hidden className="absolute -top-1 right-2 hidden rotate-3 items-center gap-1 text-[15px] font-medium italic text-primary lg:inline-flex" style={{ fontFamily: "var(--font-mono)" }}>
        live demo <Sparkles className="h-4 w-4" />
      </span>

      {/* Identity row */}
      <div className="flex w-full max-w-[360px] items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-[13px] font-bold text-white">
            SL
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background bg-primary" />
          </span>
          <div className="leading-tight">
            <div className="text-[13.5px] font-semibold text-foreground">SMSLocal AI</div>
            <div className="text-[11px] text-muted-foreground">{scene.name} · live</div>
          </div>
        </div>
        <span className="rounded-full border border-primary/20 bg-primary/5 px-2.5 py-1 text-[11px] font-semibold text-primary">24/7</span>
      </div>

      {/* Cycling scene */}
      <div key={step} className="flex min-h-[210px] w-full max-w-[360px] items-center justify-center">
        {step === 0 && <BulkDiagram />}
        {step === 1 && <AiChat />}
        {step === 2 && <OtpFlow />}
        {step === 3 && <CascadeFlow />}
      </div>

      {/* Capability pills */}
      <div className="flex flex-wrap items-center justify-center gap-1.5">
        {PILLS.map((p) => (
          <span key={p} className={`rounded-full px-3 py-1 text-[12px] font-medium transition ${p === scene.pill ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20" : "bg-secondary text-muted-foreground"}`}>
            {p}
          </span>
        ))}
      </div>

      {/* Bottom capability row */}
      <div className="flex items-center justify-center gap-5 text-[11.5px] font-medium text-muted-foreground">
        <span className="inline-flex items-center gap-1.5"><Send className="h-3.5 w-3.5 text-primary" /> Send</span>
        <span className="inline-flex items-center gap-1.5"><Bot className="h-3.5 w-3.5 text-primary" /> Reply</span>
        <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-primary" /> Verify</span>
        <span className="inline-flex items-center gap-1.5"><Globe className="h-3.5 w-3.5 text-primary" /> 8 langs</span>
      </div>
    </div>
  )
}

/* ---------- Bulk SMS: fan-out diagram ---------- */
function BulkDiagram() {
  const cities = [
    { y: 28, name: "Mumbai" },
    { y: 73, name: "Delhi" },
    { y: 118, name: "Chennai" },
    { y: 163, name: "Pune" },
  ]
  return (
    <div className="flex w-full flex-col items-center">
      <svg viewBox="0 0 320 190" className="h-[190px] w-full">
        {cities.map((c, i) => (
          <path
            key={i}
            d={`M64,95 C150,95 150,${c.y} 224,${c.y}`}
            fill="none"
            stroke="var(--primary)"
            strokeWidth="1.5"
            strokeOpacity="0.45"
            strokeDasharray="260"
            style={{ animation: `trail 1.8s ease ${i * 0.12}s both` }}
          />
        ))}
        {/* hub */}
        <rect x="22" y="73" width="44" height="44" rx="12" fill="var(--primary)" />
        <text x="44" y="99" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">SMS</text>
        {/* endpoints */}
        {cities.map((c, i) => (
          <g key={i} style={{ animation: `pop-in 0.4s ease ${0.45 + i * 0.15}s both` }}>
            <circle cx="224" cy={c.y} r="12" fill="var(--card)" stroke="var(--primary)" strokeWidth="1.5" />
            <path d={`M219,${c.y} l3.5,3.5 l6,-7`} fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <text x="244" y={c.y + 4} fontSize="11" fill="var(--foreground)">{c.name}</text>
          </g>
        ))}
      </svg>
      <div className="mt-1 text-[12.5px] font-semibold text-foreground">
        2,371 of 2,418 delivered · <span className="text-primary">98.1%</span>
      </div>
    </div>
  )
}

/* ---------- WhatsApp AI: chat messages ---------- */
function AiChat() {
  return (
    <div className="w-full space-y-2.5">
      <div style={{ animation: "message-in 0.4s ease both 0.1s" }} className="flex items-end gap-2">
        <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-[9px] font-bold text-white">P</span>
        <div className="max-w-[80%] rounded-2xl rounded-bl-sm bg-card px-3 py-2 text-[12.5px] text-foreground shadow-sm">Hey! Has my order #4821 shipped? 📦</div>
      </div>
      <div style={{ animation: "message-in 0.4s ease both 0.6s" }} className="flex w-fit items-center gap-1 rounded-2xl rounded-bl-sm bg-card px-3 py-2.5 shadow-sm">
        <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60" style={{ animation: "dot-bounce 1.2s infinite" }} />
        <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60" style={{ animation: "dot-bounce 1.2s infinite 0.15s" }} />
        <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60" style={{ animation: "dot-bounce 1.2s infinite 0.3s" }} />
      </div>
      <div style={{ animation: "message-in 0.5s ease both 1.2s" }} className="ml-auto max-w-[86%] rounded-2xl rounded-br-sm bg-primary px-3 py-2 text-[12.5px] text-primary-foreground shadow-sm">
        ஆம்! உங்கள் ஆர்டர் இன்று மாலை 6 மணிக்குள் வந்துவிடும் 🛵
        <div className="mt-1 flex items-center justify-end gap-1 text-[9.5px] text-primary-foreground/75"><Bot className="h-3 w-3" /> AI agent · Tamil · 0.8s <CheckCheck className="h-3 w-3" /></div>
      </div>
    </div>
  )
}

/* ---------- OTP: flow diagram ---------- */
function OtpFlow() {
  const nodes = [
    { icon: Smartphone, label: "App", sub: "login" },
    { icon: Send, label: "SMSLocal", sub: "priority route" },
  ]
  return (
    <div className="flex w-full flex-col items-center gap-3">
      <div className="flex items-center gap-2">
        {nodes.map((n, i) => (
          <div key={i} className="contents">
            <div style={{ animation: `pop-in 0.4s ease ${i * 0.25}s both` }} className="flex flex-col items-center gap-1">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-card text-primary shadow-sm ring-1 ring-border"><n.icon className="h-5 w-5" /></span>
              <span className="text-[10.5px] font-semibold text-foreground">{n.label}</span>
            </div>
            <ArrowDown className="h-4 w-4 -rotate-90 text-muted-foreground" style={{ animation: `pop-in 0.3s ease ${0.15 + i * 0.25}s both` }} />
          </div>
        ))}
        <div style={{ animation: "pop-in 0.45s ease 0.6s both" }} className="rounded-xl bg-primary px-3 py-2 text-center text-primary-foreground shadow-lg shadow-primary/25">
          <div className="flex gap-0.5">
            {"482913".split("").map((d, i) => (
              <span key={i} className="text-[15px] font-bold tabular-nums">{d}</span>
            ))}
          </div>
          <div className="text-[9px] text-primary-foreground/80">delivered phone</div>
        </div>
      </div>
      <div style={{ animation: "pop-in 0.4s ease 1s both" }} className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[12px] font-semibold text-primary">
        <CheckCheck className="h-3.5 w-3.5" /> Verified in 0.3s · Hyderabad
      </div>
    </div>
  )
}

/* ---------- Cascade: failover diagram ---------- */
function CascadeFlow() {
  const steps = [
    { ch: "RCS", note: "not RCS-capable", ok: false },
    { ch: "WhatsApp", note: "no WhatsApp on number", ok: false },
    { ch: "SMS", note: "delivered in 0.4s", ok: true },
  ]
  return (
    <div className="flex w-full flex-col items-center gap-1.5">
      {steps.map((s, i) => (
        <div key={s.ch} className="flex w-full max-w-[280px] flex-col items-center">
          <div style={{ animation: `message-in 0.4s ease ${i * 0.5}s both` }} className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 ${s.ok ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25" : "border border-border bg-card text-foreground"}`}>
            <span className={`inline-flex h-6 w-6 items-center justify-center rounded-lg ${s.ok ? "bg-white/20" : "bg-secondary text-muted-foreground"}`}>
              {s.ok ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
            </span>
            <span className="text-[12.5px] font-semibold">{s.ch}</span>
            <span className={`ml-auto text-[11px] ${s.ok ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{s.note}</span>
          </div>
          {i < steps.length - 1 && (
            <ArrowDown className="my-0.5 h-4 w-4 text-muted-foreground" style={{ animation: `pop-in 0.3s ease ${0.3 + i * 0.5}s both` }} />
          )}
        </div>
      ))}
    </div>
  )
}
