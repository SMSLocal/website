"use client"

import { useEffect, useState } from "react"
import { Bot, CheckCheck, UserRound } from "lucide-react"

type Msg = { from: "user" | "ai" | "human"; text: string; lang: string }

const SCRIPTS: Msg[][] = [
  [
    { from: "user", text: "मेरा ऑर्डर कहाँ है?", lang: "Hindi" },
    { from: "ai", text: "नमस्ते! आपका ऑर्डर #48219 कल शाम तक पहुँच जाएगा।", lang: "Hindi" },
    { from: "user", text: "और जल्दी मिल सकता है?", lang: "Hindi" },
    { from: "human", text: "मैं देखती हूँ और आपको 2 मिनट में अपडेट देती हूँ।", lang: "Hindi" },
  ],
  [
    { from: "user", text: "வழக்கமான சிகிச்சை பற்றி கேள்வி உள்ளது", lang: "Tamil" },
    { from: "ai", text: "வணக்கம்! எந்த சிகிச்சையைப் பற்றி கேட்க விரும்புகிறீர்கள்?", lang: "Tamil" },
    { from: "user", text: "Price for consultation?", lang: "English" },
    { from: "ai", text: "Standard consultation is ₹499. Book a slot?", lang: "English" },
  ],
  [
    { from: "user", text: "আমি রিফান্ড চাই", lang: "Bengali" },
    { from: "ai", text: "নিশ্চিত। অর্ডার নম্বর শেয়ার করুন।", lang: "Bengali" },
    { from: "user", text: "#72301", lang: "Bengali" },
    { from: "human", text: "আমি রিফান্ড প্রসেস করে দিচ্ছি, ২৪ ঘণ্টার মধ্যে হবে।", lang: "Bengali" },
  ],
]

export function WhatsAppVisual() {
  const [scriptIdx, setScriptIdx] = useState(0)
  const [shown, setShown] = useState(1)

  useEffect(() => {
    const id = setInterval(() => {
      setShown((s) => {
        const script = SCRIPTS[scriptIdx]
        if (s >= script.length) {
          setScriptIdx((i) => (i + 1) % SCRIPTS.length)
          return 1
        }
        return s + 1
      })
    }, 1800)
    return () => clearInterval(id)
  }, [scriptIdx])

  const script = SCRIPTS[scriptIdx]
  const visible = script.slice(0, shown)

  return (
    <div className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-6 -z-10 rounded-[28px] opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklch, var(--primary) 35%, transparent), transparent 70%)",
        }}
      />

      <div className="grid grid-cols-[1fr_auto] gap-4">
        {/* Chat column */}
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[oklch(0.16_0.02_230)]/90 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                <UserRound className="h-3.5 w-3.5" />
              </div>
              <div>
                <p className="text-[12.5px] font-semibold text-white">Priya · Customer</p>
                <p className="text-[10.5px] text-white/50">
                  {script[shown - 1]?.lang ?? "Hindi"} · typing in-language
                </p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-400">
              <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              Online
            </span>
          </div>

          <div className="min-h-[340px] space-y-2.5 px-4 py-4">
            {visible.map((m, i) => (
              <div
                key={`${scriptIdx}-${i}`}
                className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-[12.5px] leading-snug ${
                    m.from === "user"
                      ? "rounded-tr-sm bg-emerald-500/90 text-white"
                      : m.from === "ai"
                        ? "rounded-tl-sm border border-white/10 bg-white/[0.04] text-white/90"
                        : "rounded-tl-sm border border-primary/30 bg-primary/15 text-white/95"
                  }`}
                >
                  {m.from !== "user" ? (
                    <div className="mb-1 flex items-center gap-1.5 text-[9.5px] font-semibold uppercase tracking-wider opacity-75">
                      {m.from === "ai" ? (
                        <>
                          <Bot className="h-3 w-3" />
                          AI agent
                        </>
                      ) : (
                        <>
                          <UserRound className="h-3 w-3" />
                          Human · Sana
                        </>
                      )}
                    </div>
                  ) : null}
                  {m.text}
                  {m.from === "user" ? (
                    <div className="mt-1 flex items-center justify-end gap-1 text-[9.5px] opacity-75">
                      <CheckCheck className="h-3 w-3" />
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 bg-white/[0.02] px-4 py-2.5">
            <div className="flex items-center gap-2 text-[11px] text-white/50">
              <Bot className="h-3 w-3 text-primary" />
              AI handled 3 — handed off to Sana · avg first-response 1.2s
            </div>
          </div>
        </div>

        {/* Flow builder column */}
        <div className="hidden w-[220px] overflow-hidden rounded-2xl border border-white/10 bg-[oklch(0.16_0.02_230)]/90 shadow-2xl backdrop-blur-xl md:block">
          <div className="border-b border-white/10 px-3 py-2.5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/50">
              Flow builder
            </p>
            <p className="text-[12px] font-semibold text-white">Support · v3</p>
          </div>

          <div className="relative space-y-3 px-3 py-4">
            <FlowNode label="Incoming WhatsApp" tone="white" />
            <Connector />
            <FlowNode label="Detect language" tone="primary" />
            <Connector />
            <FlowNode label="AI agent reply" tone="primary" subtle="8 languages" />
            <Connector />
            <FlowNode label="Handoff to human?" tone="accent" subtle="If refund / angry" />
            <Connector />
            <FlowNode label="Team inbox" tone="white" />
          </div>
        </div>
      </div>
    </div>
  )
}

function FlowNode({
  label,
  subtle,
  tone,
}: {
  label: string
  subtle?: string
  tone: "white" | "primary" | "accent"
}) {
  const toneClass =
    tone === "primary"
      ? "border-primary/40 bg-primary/15 text-white"
      : tone === "accent"
        ? "border-accent/40 bg-accent/15 text-white"
        : "border-white/15 bg-white/[0.04] text-white/85"
  return (
    <div className={`rounded-lg border px-2.5 py-2 text-[11px] ${toneClass}`}>
      <p className="font-medium">{label}</p>
      {subtle ? <p className="mt-0.5 text-[10px] opacity-70">{subtle}</p> : null}
    </div>
  )
}

function Connector() {
  return (
    <div className="flex justify-center">
      <div className="h-3 w-px bg-gradient-to-b from-white/30 to-transparent" />
    </div>
  )
}
