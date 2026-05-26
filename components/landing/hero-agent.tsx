"use client"

import { useEffect, useState } from "react"
import { Bot, Check, Globe, KeyRound, MessageSquareText, Radio, Send, ShieldCheck, Sparkles } from "lucide-react"

const CONFIRMS = [
  { icon: MessageSquareText, title: "Campaign delivered", sub: "2,371 of 2,418 · 98.1% · in 1.8s", pill: "SMS" },
  { icon: Bot, title: "AI replied in Tamil", sub: "Resolved automatically · 0.8s", pill: "WhatsApp" },
  { icon: KeyRound, title: "OTP verified", sub: "Code 482913 · Hyderabad · 0.3s", pill: "OTP" },
  { icon: Radio, title: "Delivered via SMS fallback", sub: "RCS → WhatsApp → SMS · 0.4s", pill: "RCS" },
] as const

const PILLS = ["SMS", "WhatsApp", "RCS", "OTP", "AI"]

export function HeroAgent() {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setStep((s) => (s + 1) % CONFIRMS.length), 2600)
    return () => clearInterval(t)
  }, [])

  const c = CONFIRMS[step]
  const Icon = c.icon

  return (
    <div className="relative mx-auto flex min-h-[440px] w-full max-w-md flex-col items-center justify-center gap-7 py-6 lg:max-w-none">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -z-10 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-primary/20 via-transparent to-accent/20 blur-3xl"
      />
      {/* Dotted texture */}
      <div
        aria-hidden
        className="bg-grid-light absolute inset-0 -z-10 opacity-50 [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_70%)]"
      />

      {/* Script accent */}
      <span
        aria-hidden
        className="absolute -top-1 right-2 hidden rotate-3 items-center gap-1 text-[15px] font-medium italic text-primary lg:inline-flex"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        replies in 0.8s <Sparkles className="h-4 w-4" />
      </span>

      {/* Identity row */}
      <div className="flex w-full max-w-[340px] items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-[13px] font-bold text-white">
            SL
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background bg-primary" />
          </span>
          <div className="leading-tight">
            <div className="text-[13.5px] font-semibold text-foreground">SMSLocal AI</div>
            <div className="text-[11px] text-muted-foreground">online · always on</div>
          </div>
        </div>
        <span className="rounded-full border border-primary/20 bg-primary/5 px-2.5 py-1 text-[11px] font-semibold text-primary">24/7</span>
      </div>

      {/* Cycling confirmation */}
      <div key={step} style={{ animation: "message-in 0.5s cubic-bezier(0.2,0.8,0.2,1) both" }} className="flex flex-col items-center text-center">
        <span className="relative inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-xl shadow-primary/30">
          <Icon className="h-8 w-8" />
          <span className="absolute -bottom-2 -right-2 inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-card text-primary shadow-lg">
            <Check className="h-4 w-4" strokeWidth={3} />
          </span>
        </span>
        <div className="mt-5 text-xl font-bold tracking-tight text-foreground">{c.title}</div>
        <div className="mt-1 text-[13.5px] text-muted-foreground">{c.sub}</div>
      </div>

      {/* Capability pills */}
      <div className="flex flex-wrap items-center justify-center gap-1.5">
        {PILLS.map((p) => (
          <span
            key={p}
            className={`rounded-full px-3 py-1 text-[12px] font-medium transition ${
              p === c.pill ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20" : "bg-secondary text-muted-foreground"
            }`}
          >
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
