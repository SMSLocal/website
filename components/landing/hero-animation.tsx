"use client"

import { useEffect, useState } from "react"
import { Check, CheckCheck, Shield, Zap, MessageSquare, Sparkles } from "lucide-react"

/**
 * Hero animation
 * ───────────────
 * A layered visual showing:
 *  • A glassy "phone" mockup with a live-cycling WhatsApp-like conversation
 *    across 8 Indian languages (the brand's flagship capability).
 *  • Orbital rings + pulsing nodes around the phone representing the network.
 *  • Floating micro-cards (OTP, delivery receipt, AI agent) that drift around.
 *  • A vertical delivery ticker on the right.
 *  • An animated grid + radial glow backdrop.
 *
 * All motion is pure CSS keyframes (see globals.css) + a small React interval
 * to cycle conversations — no extra deps.
 */

type Conversation = {
  language: string
  flag: string
  customer: { name: string; text: string }
  agent: { text: string }
}

const CONVERSATIONS: Conversation[] = [
  {
    language: "Hindi",
    flag: "हि",
    customer: { name: "Ananya", text: "मेरा ऑर्डर कब आएगा?" },
    agent: { text: "आपका ऑर्डर कल दोपहर 2 बजे तक पहुंच जाएगा।" },
  },
  {
    language: "Tamil",
    flag: "த",
    customer: { name: "Priya", text: "பேமென்ட் வெற்றிகரமாக இருந்ததா?" },
    agent: { text: "ஆம், உங்கள் பேமென்ட் உறுதிப்படுத்தப்பட்டுள்ளது." },
  },
  {
    language: "Bengali",
    flag: "বা",
    customer: { name: "Rahul", text: "আমার অর্ডার কোথায়?" },
    agent: { text: "আপনার প্যাকেজ এখন বেঙ্গালুরু হাবে আছে।" },
  },
  {
    language: "Marathi",
    flag: "म",
    customer: { name: "Neha", text: "रिफंड कधी येईल?" },
    agent: { text: "3–5 कामकाजी दिवसांत रिफंड तुमच्या खात्यात जमा होईल." },
  },
  {
    language: "Telugu",
    flag: "తె",
    customer: { name: "Kiran", text: "నా ఆర్డర్ ఎప్పుడు వస్తుంది?" },
    agent: { text: "మీ ఆర్డర్ రేపు ఉదయం 11 గంటలకు చేరుతుంది." },
  },
  {
    language: "Gujarati",
    flag: "ગુ",
    customer: { name: "Vivek", text: "મારી ડિલિવરી સ્ટેટસ?" },
    agent: { text: "તમારું પેકેજ આજે સાંજે 6 વાગ્યે પહોંચશે." },
  },
  {
    language: "Kannada",
    flag: "ಕ",
    customer: { name: "Arjun", text: "ನನ್ನ ಆರ್ಡರ್ ಎಲ್ಲಿದೆ?" },
    agent: { text: "ನಿಮ್ಮ ಆರ್ಡರ್ ನಾಳೆ ಮಧ್ಯಾಹ್ನ ತಲುಪುತ್ತದೆ." },
  },
  {
    language: "English",
    flag: "EN",
    customer: { name: "Mira", text: "Is my OTP valid?" },
    agent: { text: "Yes — OTP 482913 is valid for 5 more minutes." },
  },
]

const TICKER_LINES = [
  "SMS delivered · Mumbai · 0.42s",
  "OTP sent · Bengaluru · 0.31s",
  "WhatsApp template · Delhi · 0.58s",
  "Campaign started · 42,118 contacts",
  "AI agent replied · Chennai · हिंदी",
  "Delivery report · Airtel · 98.4%",
  "SMS delivered · Kolkata · 0.37s",
  "OTP sent · Hyderabad · 0.29s",
  "AI agent replied · Pune · தமிழ்",
  "Campaign completed · 1.2M sent",
]

export function HeroAnimation() {
  const [idx, setIdx] = useState(0)
  const [phase, setPhase] = useState<"typing" | "received" | "reply">("typing")

  useEffect(() => {
    // Orchestrate the conversation cycle.
    let t1: ReturnType<typeof setTimeout>
    let t2: ReturnType<typeof setTimeout>
    let t3: ReturnType<typeof setTimeout>

    setPhase("typing")
    t1 = setTimeout(() => setPhase("received"), 1100)
    t2 = setTimeout(() => setPhase("reply"), 2400)
    t3 = setTimeout(() => {
      setIdx((i) => (i + 1) % CONVERSATIONS.length)
    }, 4200)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [idx])

  const convo = CONVERSATIONS[idx]

  return (
    <div className="relative isolate mx-auto aspect-square w-full max-w-[560px]">
      {/* ——— Radial glow ——— */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 55% at 50% 45%, color-mix(in oklch, var(--primary) 35%, transparent) 0%, transparent 70%)",
        }}
      />
      {/* ——— Moving grid ——— */}
      <div
        aria-hidden
        className="bg-grid-ink animate-grid-pan mask-radial-fade absolute inset-0 -z-10"
      />

      {/* ——— Orbital rings ——— */}
      <div aria-hidden className="absolute inset-0 flex items-center justify-center">
        <div className="animate-orbit relative aspect-square w-[92%] rounded-full border border-white/10">
          <OrbitDot className="top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary" />
          <OrbitDot className="top-1/2 right-0 -translate-y-1/2 translate-x-1/2 bg-accent" />
          <OrbitDot className="bottom-[10%] left-[8%] bg-white/90" />
        </div>
      </div>
      <div aria-hidden className="absolute inset-0 flex items-center justify-center">
        <div className="animate-orbit-reverse relative aspect-square w-[74%] rounded-full border border-white/10">
          <OrbitDot className="top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 bg-accent" />
          <OrbitDot className="bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-primary" />
        </div>
      </div>

      {/* ——— Pulsing signal rings behind phone ——— */}
      <div aria-hidden className="absolute inset-0 flex items-center justify-center">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="absolute aspect-square w-[58%] rounded-full border border-primary/40"
            style={{
              animation: `pulse-ring 3.2s ease-out ${i * 1.05}s infinite`,
            }}
          />
        ))}
      </div>

      {/* ——— Connecting message trails (SVG) ——— */}
      <svg
        aria-hidden
        viewBox="0 0 560 560"
        className="absolute inset-0 h-full w-full"
        fill="none"
      >
        <defs>
          <linearGradient id="trail-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.72 0.15 168)" stopOpacity="0" />
            <stop offset="50%" stopColor="oklch(0.72 0.15 168)" stopOpacity="1" />
            <stop offset="100%" stopColor="oklch(0.82 0.14 82)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M60 120 C 180 80, 240 200, 280 260"
          stroke="url(#trail-grad)"
          strokeWidth="1.5"
          strokeDasharray="240"
          style={{ animation: "trail 3.8s ease-in-out infinite" }}
        />
        <path
          d="M500 100 C 400 160, 360 220, 300 260"
          stroke="url(#trail-grad)"
          strokeWidth="1.5"
          strokeDasharray="240"
          style={{ animation: "trail 4.6s ease-in-out 0.9s infinite" }}
        />
        <path
          d="M80 460 C 200 440, 240 360, 280 300"
          stroke="url(#trail-grad)"
          strokeWidth="1.5"
          strokeDasharray="240"
          style={{ animation: "trail 5.2s ease-in-out 1.6s infinite" }}
        />
        <path
          d="M500 480 C 380 440, 340 360, 300 300"
          stroke="url(#trail-grad)"
          strokeWidth="1.5"
          strokeDasharray="240"
          style={{ animation: "trail 4.2s ease-in-out 2.1s infinite" }}
        />
      </svg>

      {/* ——— Floating micro-cards ——— */}
      <FloatingCard
        className="animate-float-slow top-[6%] left-[2%]"
        icon={<Shield className="h-3.5 w-3.5" />}
        label="OTP"
        title="482913"
        subtitle="Verified · 0.3s"
        tone="primary"
      />
      <FloatingCard
        className="animate-float-slower top-[10%] right-[-2%]"
        icon={<Zap className="h-3.5 w-3.5" />}
        label="DLT"
        title="Template Approved"
        subtitle="Airtel · SMSLCL"
        tone="amber"
      />
      <FloatingCard
        className="animate-float-slower bottom-[16%] left-[-4%]"
        icon={<CheckCheck className="h-3.5 w-3.5" />}
        label="Delivered"
        title="98.4%"
        subtitle="4.2M sent · Diwali"
        tone="primary"
      />
      <FloatingCard
        className="animate-float-slow right-[0%] bottom-[12%]"
        icon={<Sparkles className="h-3.5 w-3.5" />}
        label="AI Agent"
        title="Replied in हिंदी"
        subtitle="Chennai · 1.1s"
        tone="accent"
      />

      {/* ——— Vertical delivery ticker ——— */}
      <div
        aria-hidden
        className="absolute top-1/2 right-[-18px] hidden h-40 w-44 -translate-y-1/2 overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-md md:block"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-6 bg-gradient-to-b from-[oklch(0.17_0.03_230)] to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-6 bg-gradient-to-t from-[oklch(0.17_0.03_230)] to-transparent" />
        <div
          className="flex flex-col gap-2 px-3 py-3 text-[10px] font-medium text-white/70"
          style={{ animation: "ticker 18s linear infinite" }}
        >
          {[...TICKER_LINES, ...TICKER_LINES].map((line, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span className="truncate">{line}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ——— Phone mockup ——— */}
      <div className="absolute top-1/2 left-1/2 w-[62%] max-w-[280px] -translate-x-1/2 -translate-y-1/2">
        <div className="relative rounded-[28px] border border-white/10 bg-[oklch(0.2_0.03_230)] p-2 shadow-2xl shadow-primary/20">
          {/* Sheen */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[28px]">
            <div className="animate-sheen absolute -inset-y-8 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>

          {/* Phone screen */}
          <div className="relative overflow-hidden rounded-[22px] bg-[oklch(0.14_0.02_230)]">
            {/* Notch */}
            <div className="flex justify-center pt-2">
              <div className="h-5 w-20 rounded-full bg-black/70" />
            </div>

            {/* Header */}
            <div className="flex items-center gap-2.5 border-b border-white/5 px-3 py-2.5">
              <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[oklch(0.5_0.14_195)] text-[11px] font-semibold text-white">
                {convo.flag}
                <span className="absolute -right-0.5 -bottom-0.5 h-2.5 w-2.5 rounded-full border-2 border-[oklch(0.14_0.02_230)] bg-green-400" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[11px] font-semibold text-white">
                  {convo.customer.name}
                </div>
                <div className="flex items-center gap-1 text-[9px] text-white/50">
                  <span className="h-1 w-1 rounded-full bg-green-400" />
                  SMSLocal AI · {convo.language}
                </div>
              </div>
              <MessageSquare className="h-3.5 w-3.5 text-white/40" />
            </div>

            {/* Conversation */}
            <div
              key={idx}
              className="flex min-h-[220px] flex-col gap-2 bg-[oklch(0.12_0.02_230)] px-3 py-3"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 0%, rgba(52, 211, 153, 0.08), transparent 60%), radial-gradient(circle at 80% 100%, rgba(250, 204, 21, 0.06), transparent 60%)",
              }}
            >
              {/* Incoming */}
              <div className="animate-message-in max-w-[85%] self-start rounded-2xl rounded-bl-sm bg-white/10 px-3 py-2 text-[11px] leading-relaxed text-white/90 backdrop-blur-sm">
                {convo.customer.text}
                <div className="mt-0.5 text-right text-[8.5px] text-white/40">10:24</div>
              </div>

              {/* Typing indicator */}
              {phase === "typing" && (
                <div className="animate-message-in flex items-center gap-1.5 self-end rounded-2xl rounded-br-sm bg-primary/90 px-3 py-2.5">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="h-1.5 w-1.5 rounded-full bg-white"
                      style={{
                        animation: `dot-bounce 1.2s ease-in-out ${i * 0.18}s infinite`,
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Agent reply */}
              {(phase === "received" || phase === "reply") && (
                <div className="animate-message-in max-w-[85%] self-end rounded-2xl rounded-br-sm bg-primary px-3 py-2 text-[11px] leading-relaxed text-primary-foreground shadow-lg shadow-primary/30">
                  {convo.agent.text}
                  <div className="mt-0.5 flex items-center justify-end gap-1 text-[8.5px] text-primary-foreground/70">
                    10:24
                    <CheckCheck className="h-2.5 w-2.5" />
                  </div>
                </div>
              )}

              {/* Delivery tag */}
              {phase === "reply" && (
                <div className="animate-message-in mt-1 flex items-center gap-1.5 self-end rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[9px] text-white/60">
                  <Check className="h-2.5 w-2.5 text-green-400" />
                  Delivered · 0.{Math.floor(Math.random() * 4) + 3}s
                </div>
              )}
            </div>

            {/* Composer */}
            <div className="flex items-center gap-2 border-t border-white/5 bg-[oklch(0.14_0.02_230)] px-3 py-2">
              <div className="flex-1 rounded-full bg-white/5 px-3 py-1.5 text-[10px] text-white/30">
                Type a message…
              </div>
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                <MessageSquare className="h-3 w-3 text-primary-foreground" />
              </div>
            </div>
          </div>
        </div>

        {/* Language chip */}
        <div className="absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-white/10 bg-[oklch(0.2_0.03_230)] px-3 py-1 text-[10px] font-medium text-white/80 shadow-lg">
          <Sparkles className="h-3 w-3 text-accent" />
          AI agent · {convo.language}
        </div>
      </div>
    </div>
  )
}

function OrbitDot({ className = "" }: { className?: string }) {
  return (
    <span
      className={`absolute h-3 w-3 rounded-full shadow-[0_0_20px_currentColor] ${className}`}
    />
  )
}

function FloatingCard({
  className = "",
  icon,
  label,
  title,
  subtitle,
  tone,
}: {
  className?: string
  icon: React.ReactNode
  label: string
  title: string
  subtitle: string
  tone: "primary" | "accent" | "amber"
}) {
  const toneClass =
    tone === "primary"
      ? "text-primary bg-primary/15 border-primary/30"
      : tone === "accent"
        ? "text-accent bg-accent/15 border-accent/30"
        : "text-accent bg-accent/15 border-accent/30"

  return (
    <div
      className={`absolute w-40 rounded-xl border border-white/10 bg-white/5 p-3 shadow-xl backdrop-blur-xl ${className}`}
    >
      <div className="flex items-center gap-1.5">
        <span
          className={`inline-flex h-5 items-center justify-center gap-1 rounded-full border px-1.5 text-[9px] font-semibold uppercase tracking-wider ${toneClass}`}
        >
          {icon}
          {label}
        </span>
      </div>
      <div className="mt-1.5 text-[13px] font-semibold text-white">{title}</div>
      <div className="text-[10px] text-white/50">{subtitle}</div>
    </div>
  )
}
