"use client"

import { useEffect, useRef, useState } from "react"
import { BarChart3, Hash, PhoneIncoming } from "lucide-react"
import { VoiceInboundMock } from "@/components/product/voice-inbound-mock"
import { VoiceNumbersMock } from "@/components/product/voice-numbers-mock"
import { VoiceAnalyticsMock } from "@/components/product/voice-analytics-mock"

type Feature = {
  key: string
  icon: React.ComponentType<{ className?: string }>
  eyebrow: string
  title: string
  body: string
  label: string
  visual: React.ReactNode
}

const FEATURES: Feature[] = [
  {
    key: "inbound",
    icon: PhoneIncoming,
    eyebrow: "Inbound calls",
    title: "Incoming calls become support conversations.",
    body: "When a customer dials your number, the call lands in your inbox with their history attached — so whoever answers has the full context.",
    label: "app.smslocal.in · inbound",
    visual: <VoiceInboundMock />,
  },
  {
    key: "numbers",
    icon: Hash,
    eyebrow: "Phone numbers",
    title: "Choose the number your customers recognize.",
    body: "Spin up US local or toll-free numbers in minutes — they route straight into your shared inbox.",
    label: "app.smslocal.in · numbers",
    visual: <VoiceNumbersMock />,
  },
  {
    key: "usage",
    icon: BarChart3,
    eyebrow: "Usage analytics",
    title: "Track your voice usage clearly.",
    body: "See where your minutes go — inbound vs outbound, usage against your plan, and clear overage pricing.",
    label: "app.smslocal.in · usage",
    visual: <VoiceAnalyticsMock />,
  },
]

export function VoiceCapabilities() {
  const [active, setActive] = useState(0)
  const feature = FEATURES[active]

  // Scroll-triggered entrance reveal
  const ref = useRef<HTMLElement>(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setShown(true)
      return
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  const reveal = (delay: number) => ({
    opacity: shown ? 1 : 0,
    transform: shown ? "translateY(0)" : "translateY(22px)",
    transition: `opacity 0.7s ease ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  })

  return (
    <section ref={ref} className="bg-background py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-3xl" style={reveal(0)}>
          <span className="inline-flex rounded-full border border-border bg-muted px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
            Capabilities
          </span>
          <h2 className="mt-4 text-pretty text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Everything your team needs for customer calls.
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground sm:text-[17px]">
            Phone support that works like the rest of your inbox — contextual, collaborative, fast.
          </p>
        </div>

        {/* Showcase: tab list (left) + live panel (right) */}
        <div className="mt-12 grid items-start gap-6 lg:grid-cols-[0.9fr_1.1fr]" style={reveal(120)}>
          {/* Tab list */}
          <div className="flex flex-col gap-3">
            {FEATURES.map((f, i) => {
              const Icon = f.icon
              const isActive = i === active
              return (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`group relative overflow-hidden rounded-2xl border p-5 text-left transition ${
                    isActive
                      ? "border-primary/40 bg-primary/[0.05] shadow-sm"
                      : "border-border bg-card hover:border-primary/25 hover:bg-muted/40"
                  }`}
                >
                  {/* active accent rail */}
                  <span
                    aria-hidden
                    className={`absolute inset-y-0 left-0 w-1 rounded-r bg-gradient-to-b from-primary to-primary/30 transition-opacity ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  <div className="flex items-start gap-4">
                    <span
                      className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition ${
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "bg-primary/10 text-primary group-hover:bg-primary/15"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <p
                        className={`text-[11px] font-semibold uppercase tracking-[0.15em] ${
                          isActive ? "text-primary" : "text-muted-foreground"
                        }`}
                      >
                        {f.eyebrow}
                      </p>
                      <h3 className="mt-1 text-[16px] font-semibold tracking-tight text-foreground">
                        {f.title}
                      </h3>
                      {/* body only expands on the active row */}
                      <div
                        className="grid transition-all duration-300 ease-out"
                        style={{
                          gridTemplateRows: isActive ? "1fr" : "0fr",
                          opacity: isActive ? 1 : 0,
                        }}
                      >
                        <p className="overflow-hidden text-[13.5px] leading-relaxed text-muted-foreground">
                          <span className="mt-2 block">{f.body}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Live app-window panel */}
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-lg lg:sticky lg:top-24">
            {/* Window chrome */}
            <div className="flex items-center gap-1.5 border-b border-border/70 bg-muted/40 px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
              <span className="ml-2 truncate font-mono text-[10.5px] text-muted-foreground">
                {feature.label}
              </span>
            </div>
            {/* Mock — re-keyed so it fades in on each switch */}
            <div
              key={feature.key}
              className="bg-primary/[0.03] p-6 sm:p-8"
              style={{ animation: "fade-in-up 0.4s cubic-bezier(0.16,1,0.3,1) both" }}
            >
              {feature.visual}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
