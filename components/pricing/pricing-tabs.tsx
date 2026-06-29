"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  Bot,
  Check,
  MessageCircle,
  MessageSquareText,
  ShieldCheck,
  Star,
} from "lucide-react"
type TabKey = "sms" | "rcs" | "whatsapp" | "ai" | "otp"

const TABS: { key: TabKey; label: string; icon: React.ComponentType<{ className?: string }>; badge?: string }[] = [
  { key: "sms", label: "SMS", icon: MessageSquareText },
  { key: "rcs", label: "RCS Business Messaging", icon: Star, badge: "Soon" },
  { key: "whatsapp", label: "WhatsApp Business API", icon: MessageCircle },
  { key: "ai", label: "AI WhatsApp Agents", icon: Bot },
  { key: "otp", label: "OTP & Transactional", icon: ShieldCheck },
]

const VALID_TAB_KEYS: TabKey[] = ["sms", "rcs", "whatsapp", "ai", "otp"]

export function PricingTabs() {
  const [active, setActive] = useState<TabKey>("sms")

  // Read the URL hash on mount and when it changes; open the matching tab.
  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash.replace("#", "")
      if (VALID_TAB_KEYS.includes(hash as TabKey)) {
        setActive(hash as TabKey)
      }
    }
    syncFromHash()
    window.addEventListener("hashchange", syncFromHash)
    return () => window.removeEventListener("hashchange", syncFromHash)
  }, [])

  const selectTab = (key: TabKey) => {
    setActive(key)
    if (typeof window !== "undefined") {
      history.replaceState(null, "", `#${key}`)
    }
  }

  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Tab bar */}
        <div className="sticky top-[57px] z-20 -mx-4 border-b border-border bg-background/95 backdrop-blur-xl sm:-mx-6">
          <div className="flex gap-1 overflow-x-auto px-4 sm:px-6">
            {TABS.map((tab) => {
              const Icon = tab.icon
              const isActive = active === tab.key
              return (
                <button
                  key={tab.key}
                  onClick={() => selectTab(tab.key)}
                  className={`group relative inline-flex shrink-0 items-center gap-2 border-b-2 px-4 py-4 text-[13.5px] font-medium transition ${
                    isActive
                      ? "border-primary text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? "text-primary" : ""}`} />
                  {tab.label}
                  {tab.badge ? (
                    <span
                      className={`ml-1 rounded-full px-1.5 py-0.5 text-[9.5px] font-semibold uppercase tracking-wider ${
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "bg-primary/15 text-primary"
                      }`}
                    >
                      {tab.badge}
                    </span>
                  ) : null}
                </button>
              )
            })}
          </div>
        </div>

        {/* Panels */}
        <div className="py-14">
          {active === "sms" && <SmsPanel />}
          {active === "rcs" && <RcsComingSoon />}
          {active === "whatsapp" && <WhatsAppPanel />}
          {active === "ai" && <AiPanel />}
          {active === "otp" && <OtpPanel />}
        </div>
      </div>
    </section>
  )
}

/* ---------- RCS Panel (coming soon) ---------- */

function RcsComingSoon() {
  return (
    <div id="rcs" className="mx-auto max-w-2xl scroll-mt-32 py-10 text-center">
      <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/5 px-3 py-1 text-[12px] font-semibold text-primary">
        <Star className="h-3.5 w-3.5" /> Coming soon
      </span>
      <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
        RCS Business Messaging is launching soon
      </h2>
      <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
        Verified, branded rich cards with image carousels and suggested replies on Jio, Airtel and
        Vi — with automatic DLT SMS fallback on the same wallet. Pricing will be published here at
        launch.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/products/rcs"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:brightness-110"
        >
          Learn about RCS
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="/company/contact"
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-5 py-3 text-sm font-medium text-foreground hover:bg-muted"
        >
          Get notified at launch
        </Link>
      </div>
    </div>
  )
}

/* ---------- SMS Panel ---------- */

type SmsTier = {
  tier: number
  range: string
  rate: string
  rateValue: number
  minRecharge: number
  maxRecharge: number
  validity: string
  badge?: string
}

const SMS_TIERS: SmsTier[] = [
  { tier: 1, range: "₹100 – ₹3,999", rate: "₹0.25", rateValue: 0.25, minRecharge: 100, maxRecharge: 3_999, validity: "Unlimited" },
  { tier: 2, range: "₹4,000 – ₹7,999", rate: "₹0.21", rateValue: 0.21, minRecharge: 4_000, maxRecharge: 7_999, validity: "24 months" },
  { tier: 3, range: "₹8,000 – ₹13,999", rate: "₹0.19", rateValue: 0.19, minRecharge: 8_000, maxRecharge: 13_999, validity: "24 months" },
  { tier: 4, range: "₹14,000 – ₹59,999", rate: "₹0.17", rateValue: 0.17, minRecharge: 14_000, maxRecharge: 59_999, validity: "24 months" },
  { tier: 5, range: "₹60,000 – ₹1,29,999", rate: "₹0.15", rateValue: 0.15, minRecharge: 60_000, maxRecharge: 129_999, validity: "24 months", badge: "Most popular" },
  { tier: 6, range: "₹1,30,000 – ₹5,99,999", rate: "₹0.13", rateValue: 0.13, minRecharge: 130_000, maxRecharge: 599_999, validity: "24 months" },
  { tier: 7, range: "₹6,00,000+", rate: "₹0.1050", rateValue: 0.105, minRecharge: 600_000, maxRecharge: Number.POSITIVE_INFINITY, validity: "24 months", badge: "Best rate" },
]

function SmsPanel() {
  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.3fr_1fr]">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Bulk SMS pricing — seven volume tiers
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
          Every tier gets the same feature set: AI-powered routing, real-time analytics, smart
          route failover, DLT template management, and full regional-language support. The rate
          drops as your recharge grows.
        </p>

        <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-left text-[14px]">
              <thead>
                <tr className="border-b border-border bg-muted/40 text-[12px] uppercase tracking-[0.12em] text-muted-foreground">
                  <th className="px-5 py-3.5 font-semibold">Tier</th>
                  <th className="px-5 py-3.5 font-semibold">Recharge range</th>
                  <th className="px-5 py-3.5 text-right font-semibold">Per-SMS rate</th>
                  <th className="px-5 py-3.5 text-right font-semibold">Validity</th>
                </tr>
              </thead>
              <tbody>
                {SMS_TIERS.map((t) => (
                  <tr
                    key={t.tier}
                    className={`border-b border-border last:border-b-0 ${t.badge ? "bg-primary/[0.04]" : ""}`}
                  >
                    <td className="px-5 py-3.5 font-semibold text-foreground">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-primary/10 text-[12px] text-primary">
                          {t.tier}
                        </span>
                        {t.badge ? (
                          <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent">
                            {t.badge}
                          </span>
                        ) : null}
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-foreground">{t.range}</td>
                    <td className="px-5 py-3.5 text-right font-mono text-[14px] font-semibold text-foreground">
                      {t.rate}
                    </td>
                    <td className="px-5 py-3.5 text-right text-muted-foreground">{t.validity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <ul className="mt-8 space-y-2.5">
          {[
            "All rates are per SMS, all-inclusive — no carrier surcharges, no hidden fees.",
            "Promotional SMS is delivered to non-DND numbers only, between 10 AM and 9 PM IST as per TRAI.",
            "Transactional SMS is delivered to all numbers, 24/7, on DLT-approved templates.",
            "Unicode pricing (Hindi, Tamil, Telugu, Bengali, Marathi, Gujarati, Kannada and other Indic scripts) matches the table above for messages up to 70 characters. Longer messages count as multiple segments.",
            "Credits purchased at any tier carry a minimum 24-month validity (unlimited on Tier 1).",
          ].map((line) => (
            <li key={line} className="flex items-start gap-2.5 text-[13.5px] text-muted-foreground">
              <span className="mt-1 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                <Check className="h-2.5 w-2.5" strokeWidth={3} />
              </span>
              {line}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="https://app.smslocal.in/signup"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:brightness-110"
          >
            Start Free — ₹60 Credit
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/company/contact"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-5 py-3 text-sm font-medium text-foreground hover:bg-muted"
          >
            Talk to Sales for volume above ₹6L
          </Link>
        </div>
      </div>

      <VolumeCalculator />
    </div>
  )
}

/* ---------- Volume Calculator ---------- */

const MIN_VOL = 1_000
const MAX_VOL = 10_000_000
const PRESETS = [5_000, 25_000, 100_000, 500_000, 2_000_000]

function sliderToVolume(s: number): number {
  const t = Math.max(0, Math.min(1, s / 1000))
  const raw = Math.exp(Math.log(MIN_VOL) + t * (Math.log(MAX_VOL) - Math.log(MIN_VOL)))
  if (raw < 10_000) return Math.round(raw / 100) * 100
  if (raw < 100_000) return Math.round(raw / 1_000) * 1_000
  if (raw < 1_000_000) return Math.round(raw / 5_000) * 5_000
  return Math.round(raw / 50_000) * 50_000
}

function volumeToSlider(v: number): number {
  const clamped = Math.max(MIN_VOL, Math.min(MAX_VOL, Math.max(1, v)))
  const t =
    (Math.log(clamped) - Math.log(MIN_VOL)) /
    (Math.log(MAX_VOL) - Math.log(MIN_VOL))
  return Math.round(t * 1000)
}

function findTier(volume: number): SmsTier {
  // Highest tier (lowest rate) whose minimum recharge is covered by volume × rate.
  for (let i = SMS_TIERS.length - 1; i >= 0; i--) {
    const t = SMS_TIERS[i]
    if (volume * t.rateValue >= t.minRecharge) return t
  }
  return SMS_TIERS[0]
}

function formatInr(n: number): string {
  return "₹" + Math.round(n).toLocaleString("en-IN")
}

function formatVolume(n: number): string {
  return n.toLocaleString("en-IN")
}

function presetLabel(p: number): string {
  if (p >= 1_000_000) return `${p / 1_000_000}M`
  if (p >= 1_000) return `${p / 1_000}K`
  return `${p}`
}

function VolumeCalculator() {
  const [volume, setVolume] = useState(100_000)
  const tier = findTier(volume)
  const tierIndex = SMS_TIERS.findIndex((t) => t.tier === tier.tier)
  const nextTier =
    tierIndex < SMS_TIERS.length - 1 ? SMS_TIERS[tierIndex + 1] : null

  const monthly = volume * tier.rateValue
  const savingsPerMonth = nextTier ? volume * (tier.rateValue - nextTier.rateValue) : 0
  const volumeToUnlock = nextTier
    ? Math.max(0, Math.ceil(nextTier.minRecharge / nextTier.rateValue) - volume)
    : 0

  const progress = nextTier
    ? Math.min(
        100,
        Math.max(
          6,
          ((monthly - tier.minRecharge) /
            Math.max(1, nextTier.minRecharge - tier.minRecharge)) *
            100,
        ),
      )
    : 100

  return (
    <aside className="lg:sticky lg:top-[130px] lg:self-start">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-baseline justify-between">
          <h3 className="text-[15.5px] font-semibold tracking-tight text-foreground">
            Volume calculator
          </h3>
          <span className="inline-flex items-center gap-1 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-primary">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
            Live
          </span>
        </div>
        <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
          Set your monthly SMS volume to see the tier and per-SMS rate you qualify for.
        </p>

        <div className="mt-5">
          <label
            htmlFor="sms-volume-input"
            className="text-[11.5px] font-semibold uppercase tracking-[0.12em] text-muted-foreground"
          >
            Monthly SMS volume
          </label>
          <div className="mt-2 flex items-stretch gap-2">
            <input
              id="sms-volume-input"
              type="number"
              min={0}
              max={MAX_VOL}
              step={1000}
              value={volume}
              onChange={(e) => {
                const v = Number(e.target.value)
                if (Number.isFinite(v)) {
                  setVolume(Math.min(MAX_VOL, Math.max(0, Math.round(v))))
                }
              }}
              onBlur={() => setVolume((v) => Math.max(MIN_VOL, v))}
              className="min-w-0 flex-1 rounded-lg border border-border bg-background px-3 py-2 font-mono text-[15px] font-semibold text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <span className="inline-flex items-center rounded-lg border border-border bg-muted/40 px-3 text-[12px] font-medium text-muted-foreground">
              SMS / mo
            </span>
          </div>

          <input
            type="range"
            min={0}
            max={1000}
            step={1}
            value={volumeToSlider(volume)}
            onChange={(e) => setVolume(sliderToVolume(Number(e.target.value)))}
            aria-label="Monthly SMS volume slider"
            className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-muted accent-primary"
          />

          <div className="mt-2 flex flex-wrap gap-1.5">
            {PRESETS.map((p) => {
              const active = volume === p
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => setVolume(p)}
                  aria-pressed={active}
                  className={`rounded-full border px-2.5 py-1 text-[11.5px] font-medium transition ${
                    active
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-background text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                  }`}
                >
                  {presetLabel(p)}
                </button>
              )
            })}
          </div>
        </div>

        <div className="mt-5 rounded-xl border border-border bg-background p-4">
          <p className="text-[11.5px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Estimated monthly spend
          </p>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="text-[28px] font-semibold tracking-tight text-foreground tabular-nums">
              {formatInr(monthly)}
            </span>
            <span className="text-[13px] text-muted-foreground">/ month</span>
          </div>
          <p className="mt-1 text-[12.5px] text-muted-foreground">
            <span className="font-semibold text-foreground">
              Tier {tier.tier}
              {tier.badge ? ` · ${tier.badge}` : ""}
            </span>{" "}
            · {formatVolume(volume)} × {tier.rate}
          </p>

          <div
            className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted"
            role="progressbar"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Progress to next tier"
          >
            <div
              className="h-full rounded-full bg-primary transition-[width] duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          {nextTier ? (
            <p className="mt-2.5 text-[12.5px] leading-relaxed text-muted-foreground">
              Send{" "}
              <span className="font-semibold text-foreground">
                {formatVolume(volumeToUnlock)} more / mo
              </span>{" "}
              to unlock{" "}
              <span className="font-semibold text-foreground">
                Tier {nextTier.tier} at {nextTier.rate}
              </span>
              {savingsPerMonth > 0 ? (
                <>
                  {" "}
                  — save{" "}
                  <span className="font-semibold text-primary">
                    ~{formatInr(savingsPerMonth)}/mo
                  </span>{" "}
                  at today&apos;s volume.
                </>
              ) : (
                <>.</>
              )}
            </p>
          ) : (
            <p className="mt-2.5 text-[12.5px] leading-relaxed text-muted-foreground">
              You&apos;re at our best per-SMS rate.{" "}
              <Link
                href="/company/contact"
                className="font-semibold text-foreground underline-offset-2 hover:underline"
              >
                Talk to sales
              </Link>{" "}
              for custom terms.
            </p>
          )}
        </div>

        <Link
          href="https://app.smslocal.in/signup"
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-[13.5px] font-semibold text-primary-foreground shadow-md shadow-primary/20 hover:brightness-110"
        >
          Start with ₹60 free credit
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>

        <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
          Rates are indicative. Final billing uses the exact tier your recharge falls into.
        </p>
      </div>
    </aside>
  )
}

/* ---------- WhatsApp Panel ---------- */

const META_RATES = [
  { type: "Marketing", rate: "₹0.9000", use: "Promotional campaigns, offers, broadcasts" },
  { type: "Utility", rate: "₹0.1700", use: "Order updates, shipping alerts, account notifications" },
  { type: "Authentication", rate: "₹0.1700", use: "OTPs, 2FA codes, identity verification" },
  { type: "Service (24h window)", rate: "₹0.0200", use: "Replies within the 24h customer service window" },
]

const BSP_COMPARE = [
  { name: "SMSLocal", monthly: "₹0", setup: "₹0", passthrough: "Yes — Meta rate only", us: true },
  { name: "WATI", monthly: "From ₹2,499", setup: "Varies", passthrough: "Yes + platform fee" },
  { name: "AiSensy", monthly: "From ₹1,500", setup: "₹0", passthrough: "Yes + platform fee" },
  { name: "Interakt", monthly: "From ₹999", setup: "₹0", passthrough: "Yes + platform fee" },
  { name: "Gupshup", monthly: "Enterprise quote", setup: "Varies", passthrough: "Yes + platform fee" },
]

function WhatsAppPanel() {
  return (
    <div>
      <div className="max-w-3xl">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          WhatsApp Business API — zero lock-in, pay-as-you-go
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
          Unlike every other major Indian WhatsApp BSP, SMSLocal has no monthly subscription, no
          setup fee, and no activation fee. You load a wallet, and we deduct per message sent at
          Meta&apos;s published rate.
        </p>
      </div>

      {/* Starter plan callout */}
      <div className="mt-8 rounded-2xl border border-primary/25 bg-primary/[0.04] p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-2.5 py-0.5 text-[10.5px] font-semibold uppercase tracking-wider text-primary-foreground">
              <Star className="h-3 w-3" /> Starter plan
            </span>
            <h3 className="mt-2.5 text-[18px] font-semibold tracking-tight text-foreground">
              WhatsApp Starter — <span className="font-mono">₹499</span> one-time
            </h3>
            <p className="mt-1 max-w-xl text-[13.5px] leading-relaxed text-muted-foreground">
              A one-time ₹499 gets you started on the WhatsApp Business API with the{" "}
              <span className="font-semibold text-foreground">AI WhatsApp agent included</span>. The
              24-hour customer service window is billed at just{" "}
              <span className="font-semibold text-foreground font-mono">₹0.0200</span> per conversation —
              template messages are charged at Meta&apos;s rates below.
            </p>
          </div>
          <Link
            href="https://app.smslocal.in/signup"
            className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:brightness-110"
          >
            Get the Starter plan
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_1fr]">
        {/* How it works */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h3 className="text-[15.5px] font-semibold tracking-tight text-foreground">How it works</h3>
          <ol className="mt-4 space-y-4">
            {[
                "Start with the ₹100 minimum top-up. First-time signup adds a ₹60 bonus, so your wallet opens with ₹160 — roughly 180–220 WhatsApp messages depending on category (marketing, utility, or authentication).",
                "Messages are charged per template message on Meta's current India rate card.",
                "Top up when you're low — any amount from ₹100 upwards. Wallet credits carry 24-month validity.",
              "No monthly fee, no contracted volume, no lock-in. Pause or stop anytime.",
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary/10 font-mono text-[12px] font-semibold text-primary">
                  {i + 1}
                </span>
                <span className="text-[13.5px] leading-relaxed text-muted-foreground">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Meta rates */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-baseline justify-between">
            <h3 className="text-[15.5px] font-semibold tracking-tight text-foreground">
              Meta rate card — India
            </h3>
            <span className="text-[11px] text-muted-foreground">Effective 1 Jan 2026</span>
          </div>
          <div className="mt-4 divide-y divide-border">
            {META_RATES.map((r) => (
              <div key={r.type} className="flex items-start justify-between gap-4 py-3">
                <div>
                  <p className="text-[13.5px] font-semibold text-foreground">{r.type}</p>
                  <p className="mt-0.5 text-[12px] text-muted-foreground">{r.use}</p>
                </div>
                <p className="shrink-0 font-mono text-[14px] font-semibold text-foreground">
                  {r.rate}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Supporting bullets */}
      <ul className="mt-8 grid grid-cols-1 gap-2.5 md:grid-cols-2">
        {[
          "These are Meta's published rates, passed through with zero SMSLocal markup.",
          "18% GST applies on every message as per Indian tax law.",
          "Wallet balance can be used for any message type — you don't pre-commit to a category.",
          "WhatsApp Business API is available on SMSLocal the moment your Meta Business Manager account is verified.",
          "Template approval turnaround is typically under 24 hours (Meta-dependent).",
        ].map((line) => (
          <li key={line} className="flex items-start gap-2.5 text-[13.5px] text-muted-foreground">
            <span className="mt-1 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
              <Check className="h-2.5 w-2.5" strokeWidth={3} />
            </span>
            {line}
          </li>
        ))}
      </ul>

      {/* BSP comparison */}
      <div className="mt-12">
        <h3 className="text-[17px] font-semibold tracking-tight text-foreground">
          Compared to other Indian WhatsApp BSPs
        </h3>
        <p className="mt-1 text-[13.5px] text-muted-foreground">
          Most providers require a monthly subscription on top of Meta&apos;s rates.
        </p>
        <div className="mt-5 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left text-[13.5px]">
              <thead>
                <tr className="border-b border-border bg-muted/40 text-[12px] uppercase tracking-[0.12em] text-muted-foreground">
                  <th className="px-5 py-3.5 font-semibold">Provider</th>
                  <th className="px-5 py-3.5 font-semibold">Monthly plan</th>
                  <th className="px-5 py-3.5 font-semibold">Setup fee</th>
                  <th className="px-5 py-3.5 font-semibold">Meta rate pass-through</th>
                </tr>
              </thead>
              <tbody>
                {BSP_COMPARE.map((p) => (
                  <tr
                    key={p.name}
                    className={`border-b border-border last:border-b-0 ${p.us ? "bg-primary/[0.06]" : ""}`}
                  >
                    <td className="px-5 py-3.5 font-semibold text-foreground">
                      {p.name}
                      {p.us ? (
                        <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground">
                          You
                        </span>
                      ) : null}
                    </td>
                    <td className="px-5 py-3.5 text-muted-foreground">{p.monthly}</td>
                    <td className="px-5 py-3.5 text-muted-foreground">{p.setup}</td>
                    <td className="px-5 py-3.5 text-muted-foreground">{p.passthrough}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="mt-4 text-[12.5px] text-muted-foreground">
          Small and mid-sized businesses sending fewer than 3,000 marketing messages per month save
          the most with SMSLocal&apos;s pay-as-you-go model.
        </p>
      </div>

      <div className="mt-8">
        <Link
          href="https://app.smslocal.in/signup"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:brightness-110"
        >
          Start WhatsApp — ₹60 Free Credit
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}

/* ---------- AI Panel ---------- */

const AI_ROWS = [
  {
    component: "AI conversation",
    rate: "[PLACEHOLDER — confirm rate]",
    notes: "One conversation = up to 25 exchanges in a 24h window",
    placeholder: true,
  },
  { component: "Additional language packs", rate: "₹0", notes: "All 8 languages included by default" },
  { component: "Visual flow builder", rate: "₹0", notes: "Unlimited flows included" },
  { component: "Team inbox seats", rate: "₹0", notes: "Unlimited human agent seats — no per-seat fee" },
  {
    component: "WhatsApp message cost",
    rate: "As per Meta rate card",
    notes: "Charged in addition to AI conversation fee",
  },
]

function AiPanel() {
  return (
    <div>
      <div className="max-w-3xl">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          AI WhatsApp Agents — per conversation, no agent licence fees
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
          Add AI chat agents to your WhatsApp Business API account. Agents reply in 8 Indian
          languages, follow your scripts, and hand off to humans when they should. Pay per AI
          conversation, not per agent seat.
        </p>
      </div>

      <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left text-[14px]">
            <thead>
              <tr className="border-b border-border bg-muted/40 text-[12px] uppercase tracking-[0.12em] text-muted-foreground">
                <th className="px-5 py-3.5 font-semibold">Component</th>
                <th className="px-5 py-3.5 font-semibold">Rate</th>
                <th className="px-5 py-3.5 font-semibold">Notes</th>
              </tr>
            </thead>
            <tbody>
              {AI_ROWS.map((r) => (
                <tr key={r.component} className="border-b border-border last:border-b-0">
                  <td className="px-5 py-3.5 font-semibold text-foreground">{r.component}</td>
                  <td className="px-5 py-3.5">
                    {r.placeholder ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-2.5 py-1 text-[11.5px] font-semibold text-accent">
                        {r.rate}
                      </span>
                    ) : (
                      <span className="font-mono font-semibold text-foreground">{r.rate}</span>
                    )}
                  </td>
                  <td className="px-5 py-3.5 text-[13px] text-muted-foreground">{r.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h3 className="text-[15.5px] font-semibold tracking-tight text-foreground">How it works</h3>
          <ol className="mt-4 space-y-3">
            {[
              "Connect your WhatsApp Business API account.",
              "Build your AI agent flow in the visual builder — no code.",
              "Pick your languages (Hindi, English, Tamil, Telugu, Bengali, Marathi, Gujarati, Kannada).",
              "Set handoff rules to human agents for complex queries.",
              "Pay per AI conversation from your wallet balance.",
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-3 text-[13.5px] text-muted-foreground">
                <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary/10 font-mono text-[12px] font-semibold text-primary">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        <ul className="space-y-2.5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          {[
            "AI agents work on the same WhatsApp Business API number as your team inbox — no new number needed.",
            "Conversations where AI hands off to a human within the first exchange are not charged.",
            "Training the AI on your FAQ, product catalog, and past conversation logs is included.",
            "Volume discount structure for AI conversations — [PLACEHOLDER: confirm if any].",
          ].map((line) => (
            <li key={line} className="flex items-start gap-2.5 text-[13.5px] text-muted-foreground">
              <span className="mt-1 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                <Check className="h-2.5 w-2.5" strokeWidth={3} />
              </span>
              {line}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <Link
          href="https://app.smslocal.in/signup"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:brightness-110"
        >
          Launch an AI agent in 10 minutes
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}

/* ---------- OTP Panel ---------- */

const OTP_FEATURES = [
  { feature: "Priority OTP route", cost: "Included", notes: "No premium on OTP delivery" },
  { feature: "Delivery webhook", cost: "Included", notes: "Real-time DLR to your webhook endpoint" },
  { feature: "Retry logic on failure", cost: "Included", notes: "Failed OTPs auto-retry on alternate route" },
  { feature: "Multi-language OTP templates", cost: "Included", notes: "Hindi, English, all Indic scripts" },
  { feature: "Sender ID registration", cost: "Included", notes: "DLT support team handles approval" },
]

function OtpPanel() {
  return (
    <div>
      <div className="max-w-3xl">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          OTP &amp; Transactional SMS — priority routing, 24/7 delivery
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
          OTP and transactional messages go through dedicated priority routes. Delivered 24/7 to
          every Indian number including DND, on DLT-approved templates.
        </p>
        <p className="mt-3 text-[13.5px] text-muted-foreground">
          Per-message rates follow the same seven-tier volume structure as Bulk SMS. Switch to the
          SMS tab above to see the full tier table and run the calculator.
        </p>
      </div>

      <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left text-[14px]">
            <thead>
              <tr className="border-b border-border bg-muted/40 text-[12px] uppercase tracking-[0.12em] text-muted-foreground">
                <th className="px-5 py-3.5 font-semibold">Feature</th>
                <th className="px-5 py-3.5 font-semibold">Cost</th>
                <th className="px-5 py-3.5 font-semibold">Notes</th>
              </tr>
            </thead>
            <tbody>
              {OTP_FEATURES.map((r) => (
                <tr key={r.feature} className="border-b border-border last:border-b-0">
                  <td className="px-5 py-3.5 font-semibold text-foreground">{r.feature}</td>
                  <td className="px-5 py-3.5">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[11.5px] font-semibold text-primary">
                      <Check className="h-3 w-3" strokeWidth={3} />
                      {r.cost}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-[13px] text-muted-foreground">{r.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ul className="mt-8 grid grid-cols-1 gap-2.5 md:grid-cols-2">
        {[
          "Dedicated OTP APIs: POST /v1/otp/send, POST /v1/otp/verify.",
          "SDKs: PHP · Java · Python · Node.js · C# · JavaScript.",
          "Standard OTP delivery in under 5 seconds; 98% delivered in under 1 second.",
          "Transactional flows (shipping alerts, payment confirmations, account updates) use the same route.",
        ].map((line) => (
          <li key={line} className="flex items-start gap-2.5 text-[13.5px] text-muted-foreground">
            <span className="mt-1 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
              <Check className="h-2.5 w-2.5" strokeWidth={3} />
            </span>
            {line}
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/developers/api-docs"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:brightness-110"
        >
          View API docs
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="https://app.smslocal.in/signup"
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-5 py-3 text-sm font-medium text-foreground hover:bg-muted"
        >
          Start Free — ₹60 Credit
        </Link>
      </div>
    </div>
  )
}


