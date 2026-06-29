"use client"

import { useState } from "react"
import { ArrowRight, Check, MessageCircle, Sparkles, Star } from "lucide-react"
import { Reveal } from "./reveal"

type Tier = {
  name: string
  rate: number
  max: number
  features: string[]
  cta: { label: string; href: string }
  popular?: boolean
}

const TIERS: Tier[] = [
  { name: "Starter", rate: 0.24, max: 16000, features: ["Unlimited validity", "Full DLT compliance", "Pay-as-you-go, no lock-in"], cta: { label: "Start Free", href: "https://app.smslocal.in/signup" } },
  { name: "Growth", rate: 0.16, max: 375000, features: ["24-month validity", "AI WhatsApp agents included", "Priority support"], cta: { label: "Start Free", href: "https://app.smslocal.in/signup" }, popular: true },
  { name: "Enterprise", rate: 0.09, max: Number.POSITIVE_INFINITY, features: ["Dedicated account manager", "Custom routing & SLAs", "24-month validity"], cta: { label: "Talk to Sales", href: "/company/contact" } },
]

const MIN = 5000
const MAX = 1000000

const fmt = (n: number) => n.toLocaleString("en-IN")

export function PricingTeaser() {
  const [vol, setVol] = useState(25000)
  const tier = TIERS.find((t) => vol <= t.max) ?? TIERS[TIERS.length - 1]
  const monthly = Math.round(vol * tier.rate)

  return (
    <section id="pricing" className="bg-muted/40 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[12px] font-semibold uppercase tracking-wider text-primary">
            Pricing
          </span>
          <h2 className="mt-5 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[44px] lg:leading-[1.1]">
            Simple pricing,{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">volume discounts built in</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            All features at every tier. Drag the slider to see your rate — the more you send, the less you pay.
          </p>
        </Reveal>

        {/* Interactive slider */}
        <Reveal delay={80} className="mx-auto mt-12 max-w-3xl">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-xl shadow-foreground/5 lg:p-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Your volume</div>
                <div className="text-2xl font-bold text-foreground">
                  {fmt(vol)} <span className="text-sm font-medium text-muted-foreground">SMS / month</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Per SMS</div>
                <div className="text-4xl font-bold text-primary">₹{tier.rate.toFixed(2)}</div>
              </div>
            </div>

            <input
              type="range"
              min={MIN}
              max={MAX}
              step={1000}
              value={vol}
              onChange={(e) => setVol(Number(e.target.value))}
              aria-label="Monthly SMS volume"
              className="mt-5 w-full accent-[var(--primary)]"
            />
            <div className="mt-1 flex justify-between text-[11px] text-muted-foreground">
              <span>5K</span><span>10 Lakh+</span>
            </div>

            {/* Tier track */}
            <div className="mt-5 grid grid-cols-3 gap-2">
              {TIERS.map((t) => (
                <button
                  key={t.name}
                  type="button"
                  onClick={() => setVol(t.max === Number.POSITIVE_INFINITY ? MAX : Math.min(t.max, MAX))}
                  className={`relative rounded-lg px-3 py-2 text-center text-[12.5px] font-semibold transition ${t.name === tier.name ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20" : "bg-secondary text-muted-foreground hover:text-foreground"}`}
                >
                  {t.popular && (
                    <span className="absolute -top-2 left-1/2 inline-flex -translate-x-1/2 items-center gap-0.5 rounded-full bg-accent px-1.5 py-0.5 text-[8.5px] font-bold uppercase text-accent-foreground">
                      <Sparkles className="h-2.5 w-2.5" /> Popular
                    </span>
                  )}
                  {t.name}
                </button>
              ))}
            </div>

            {/* Estimate + features */}
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-primary/5 p-5">
                <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Estimated monthly</div>
                <div className="mt-1 text-3xl font-bold tabular-nums text-foreground">≈ ₹{fmt(monthly)}</div>
                <div className="mt-1 text-[12px] text-muted-foreground">on the {tier.name} plan · ₹60 free credit to start</div>
              </div>
              <ul className="space-y-2.5">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-[13.5px] text-foreground">
                    <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary"><Check className="h-2.5 w-2.5" strokeWidth={3} /></span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href={tier.cta.href} className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:brightness-110">
                {tier.cta.label} <ArrowRight className="h-4 w-4" />
              </a>
              <a href="/pricing" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
                See full pricing <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </Reveal>

        {/* WhatsApp + RCS notes */}
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <Reveal delay={120}>
            <div id="whatsapp" className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg">
              <div className="inline-flex w-fit items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-accent">
                <MessageCircle className="h-3 w-3" /> WhatsApp Business API
              </div>
              <p className="mt-3 text-[15px] font-semibold text-foreground">Zero setup. Zero activation. Zero monthly plan.</p>
              <p className="mt-1 text-[13.5px] leading-relaxed text-muted-foreground">Pay per message on Meta&apos;s India rate card. Start with the ₹100 minimum top-up — your first wallet shows ₹160 with the signup bonus.</p>
              <a href="/pricing#whatsapp" className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[13.5px] font-semibold text-primary hover:underline">See WhatsApp rates <ArrowRight className="h-3.5 w-3.5" /></a>
            </div>
          </Reveal>
          <Reveal delay={180}>
            <div id="rcs" className="flex h-full flex-col rounded-2xl border border-primary/40 bg-primary/[0.04] p-6 transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-center gap-2">
                <div className="inline-flex w-fit items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-primary">
                  <Star className="h-3 w-3" /> RCS Business Messaging
                </div>
                <span className="inline-flex items-center rounded-full bg-primary px-2 py-0.5 text-[9.5px] font-semibold uppercase tracking-wider text-primary-foreground">New</span>
              </div>
              <p className="mt-3 text-[15px] font-semibold text-foreground">Priced 1% below MSG91. Same Google RBM rails.</p>
              <p className="mt-1 text-[13.5px] leading-relaxed text-muted-foreground">Verified, branded rich cards on Jio, Airtel, Vi — with automatic DLT SMS fallback. From ₹0.1188 basic text · ₹0.1386 rich card.</p>
              <a href="/pricing#rcs" className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[13.5px] font-semibold text-primary hover:underline">See RCS rates &amp; cost calculator <ArrowRight className="h-3.5 w-3.5" /></a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
