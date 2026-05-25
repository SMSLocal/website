"use client"

import { useState } from "react"
import {
  BarChart3,
  Bot,
  Check,
  CheckCheck,
  Layers,
  Send,
  Sparkles,
  X,
} from "lucide-react"

type TabId = "sms" | "ai" | "cascade" | "analytics"

const TABS: { id: TabId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "sms", label: "Send SMS", icon: Send },
  { id: "ai", label: "WhatsApp AI", icon: Bot },
  { id: "cascade", label: "Cascade", icon: Layers },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
]

export function DashboardShowcase() {
  const [tab, setTab] = useState<TabId>("sms")

  return (
    <section className="relative overflow-hidden border-b border-border bg-secondary/40 py-20 lg:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, color-mix(in oklch, var(--primary) 10%, transparent), transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[12px] font-semibold uppercase tracking-wider text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            See it in action
          </span>
          <h2 className="mt-5 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[44px] lg:leading-[1.1]">
            One dashboard to{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              run every conversation
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            Compose campaigns, let AI handle replies, cascade across channels, and watch
            delivery live — click a tab to explore.
          </p>
        </div>

        {/* Window chrome */}
        <div className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-foreground/10">
          {/* Title bar */}
          <div className="flex items-center gap-3 border-b border-border bg-secondary/60 px-4 py-3">
            <div className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-destructive/60" />
              <span className="h-3 w-3 rounded-full bg-accent/70" />
              <span className="h-3 w-3 rounded-full bg-primary/60" />
            </div>
            <div className="mx-auto flex items-center gap-2 rounded-md bg-background px-3 py-1 text-[12px] text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-primary" />
              app.smslocal.in/dashboard
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr]">
            {/* Tab rail */}
            <div className="flex gap-2 overflow-x-auto border-b border-border bg-secondary/30 p-3 md:flex-col md:overflow-visible md:border-b-0 md:border-r">
              {TABS.map((t) => {
                const active = t.id === tab
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTab(t.id)}
                    aria-pressed={active}
                    className={`inline-flex shrink-0 items-center gap-2.5 rounded-lg px-3.5 py-2.5 text-left text-sm font-medium transition ${
                      active
                        ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
                  >
                    <t.icon className="h-4 w-4 shrink-0" />
                    {t.label}
                  </button>
                )
              })}
            </div>

            {/* Panel */}
            <div className="min-h-[360px] bg-background p-5 sm:p-7">
              {tab === "sms" && <SmsPanel />}
              {tab === "ai" && <AiPanel />}
              {tab === "cascade" && <CascadePanel />}
              {tab === "analytics" && <AnalyticsPanel />}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function PanelHeading({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="mb-5">
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      <p className="mt-1 text-[13px] text-muted-foreground">{sub}</p>
    </div>
  )
}

function SmsPanel() {
  return (
    <div className="animate-message-in">
      <PanelHeading title="New SMS campaign" sub="DLT-compliant, sent over direct-operator routes." />
      <div className="rounded-xl border border-border bg-card p-4">
        <div className="flex flex-wrap gap-2 text-[12px]">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1 font-medium text-foreground">
            To: Diwali Offer · 2,418 contacts
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1 font-medium text-foreground">
            From: SMSLCL
          </span>
        </div>
        <div className="mt-3 rounded-lg border border-border bg-background p-3 text-[13px] leading-relaxed text-foreground">
          Hi {"{name}"}, celebrate Diwali with 25% off your next order. Shop now: smsl.in/diwali
          <br />
          Reply STOP to opt out.
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[11.5px] text-muted-foreground">
          <span>142/160 chars · 1 part · GSM-7</span>
          <span className="font-semibold text-foreground">Est. cost ₹290.16</span>
        </div>
      </div>
      <button
        type="button"
        className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"
      >
        <Send className="h-4 w-4" />
        Send now
      </button>
      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1.5 rounded-lg bg-primary/5 px-4 py-3 text-[12.5px]">
        <span className="inline-flex items-center gap-1.5 font-semibold text-primary">
          <CheckCheck className="h-4 w-4" /> Delivered 2,371 · 98.1%
        </span>
        <span className="text-muted-foreground">Pending 35</span>
        <span className="text-muted-foreground">Failed 12</span>
      </div>
    </div>
  )
}

function AiPanel() {
  return (
    <div className="animate-message-in">
      <PanelHeading
        title="AI agent · WhatsApp"
        sub="Replies automatically in 8 Indian languages — here, Tamil."
      />
      <div className="rounded-xl border border-border bg-[oklch(0.97_0.01_150)] p-4">
        <div className="mb-3 flex items-center gap-2.5 border-b border-border/60 pb-3">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-xs font-bold text-white">
            P
          </span>
          <div>
            <div className="text-[13px] font-semibold text-foreground">Priya Sharma</div>
            <div className="text-[11px] text-muted-foreground">+91 98xxx · WhatsApp</div>
          </div>
          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10.5px] font-semibold text-primary">
            <Bot className="h-3 w-3" /> AI · Tamil
          </span>
        </div>
        <div className="space-y-2.5">
          <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-card px-3.5 py-2 text-[13px] text-foreground shadow-sm">
            பேமென்ட் வெற்றிகரமாக இருந்ததா?
          </div>
          <div className="ml-auto max-w-[80%] rounded-2xl rounded-tr-sm bg-primary px-3.5 py-2 text-[13px] text-primary-foreground shadow-sm">
            ஆம், உங்கள் பேமென்ட் உறுதிப்படுத்தப்பட்டது. 🎉 ஆர்டர் #4821 அனுப்பப்படுகிறது.
            <div className="mt-1 flex items-center justify-end gap-1 text-[10px] text-primary-foreground/70">
              AI agent <CheckCheck className="h-3 w-3" /> 10:24
            </div>
          </div>
        </div>
      </div>
      <p className="mt-3 text-[12px] text-muted-foreground">
        Resolved without an agent · avg. reply time 0.8s
      </p>
    </div>
  )
}

function CascadePanel() {
  const steps = [
    { ch: "RCS", note: "Recipient not RCS-capable", ok: false },
    { ch: "WhatsApp", note: "No WhatsApp on this number", ok: false },
    { ch: "SMS", note: "Delivered in 0.4s", ok: true },
  ]
  return (
    <div className="animate-message-in">
      <PanelHeading
        title="Cascade · OTP delivery"
        sub="Tries the cheapest channel first, falls back automatically until it lands."
      />
      <div className="space-y-2.5">
        {steps.map((s, i) => (
          <div
            key={s.ch}
            className={`flex items-center gap-3 rounded-xl border p-3.5 ${
              s.ok ? "border-primary/30 bg-primary/5" : "border-border bg-card"
            }`}
          >
            <span className="text-[12px] font-bold text-muted-foreground">{i + 1}</span>
            <span
              className={`inline-flex h-8 w-8 items-center justify-center rounded-lg ${
                s.ok ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
              }`}
            >
              {s.ok ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
            </span>
            <div className="flex-1">
              <div className="text-[13.5px] font-semibold text-foreground">{s.ch}</div>
              <div className="text-[12px] text-muted-foreground">{s.note}</div>
            </div>
            <span
              className={`text-[11.5px] font-semibold ${
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

function AnalyticsPanel() {
  const bars = [62, 48, 80, 55, 92, 70, 100]
  return (
    <div className="animate-message-in">
      <PanelHeading title="Delivery analytics · last 7 days" sub="Live status across every channel." />
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Submitted", value: "42,118" },
          { label: "Delivered", value: "98.4%" },
          { label: "Failed", value: "0.3%" },
        ].map((m) => (
          <div key={m.label} className="rounded-xl border border-border bg-card p-3.5">
            <div className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
              {m.label}
            </div>
            <div className="mt-1 text-xl font-bold text-foreground">{m.value}</div>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-xl border border-border bg-card p-4">
        <div className="flex h-28 items-end justify-between gap-2">
          {bars.map((h, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
              <div
                className="w-full rounded-t bg-gradient-to-t from-primary/70 to-primary"
                style={{ height: `${h}%` }}
              />
              <span className="text-[10px] text-muted-foreground">{`D${i + 1}`}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
