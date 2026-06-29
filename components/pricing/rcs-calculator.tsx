"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { ArrowRight, ChevronDown, Sparkles, TrendingDown } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import {
  COMPETITOR_RATES,
  COMPETITOR_RATES_FETCHED_AT,
  formatInr,
  formatPaiseAsRupees,
  RCS_PLANS,
  SMSLOCAL_RCS_RATE,
} from "@/lib/pricing/rcs"

type MessageType = "basic" | "rich"

const VOLUME_PRESETS = [10_000, 50_000, 100_000, 500_000, 1_000_000]

// Sliders are hard for wide log ranges. Use a 0-100 slider and map to volume.
const MIN_VOL = 1_000
const MAX_VOL = 5_000_000

function sliderToVolume(p: number): number {
  // Logarithmic mapping so 50% ≈ 50k–100k, the realistic zone.
  const ratio = Math.log(MAX_VOL / MIN_VOL)
  const v = MIN_VOL * Math.exp((p / 100) * ratio)
  // Snap to a "friendly" increment.
  if (v < 10_000) return Math.round(v / 500) * 500
  if (v < 100_000) return Math.round(v / 1_000) * 1_000
  if (v < 1_000_000) return Math.round(v / 10_000) * 10_000
  return Math.round(v / 50_000) * 50_000
}

function volumeToSlider(v: number): number {
  const ratio = Math.log(MAX_VOL / MIN_VOL)
  return Math.max(0, Math.min(100, (Math.log(v / MIN_VOL) / ratio) * 100))
}

function recommendedPlan(monthlyCost: number) {
  // Pick the smallest plan whose wallet >= 1 month of spend, else biggest.
  const sorted = [...RCS_PLANS].sort((a, b) => a.walletInr - b.walletInr)
  const match = sorted.find((p) => p.walletInr >= monthlyCost)
  return match ?? sorted[sorted.length - 1]
}

export function RcsCalculator({
  id = "rcs-calculator",
  variant = "panel",
}: {
  id?: string
  /** "panel" = tight card on the pricing tab, "hero" = full-width on product page. */
  variant?: "panel" | "hero"
}) {
  const [volume, setVolume] = useState<number>(100_000)
  const [msgType, setMsgType] = useState<MessageType>("rich")

  const smsLocalPaise =
    msgType === "basic" ? SMSLOCAL_RCS_RATE.basicTextPaise : SMSLOCAL_RCS_RATE.richCardPaise

  const smsLocalMonthly = volume * (smsLocalPaise / 100)
  const smsLocalAnnual = smsLocalMonthly * 12

  const rows = useMemo(() => {
    return COMPETITOR_RATES.map((c) => {
      const paise = msgType === "basic" ? c.basicTextPaise : c.richCardPaise
      if (paise == null) {
        return {
          name: c.name,
          note: c.note,
          paise: null as number | null,
          monthly: null as number | null,
          saving: null as number | null,
          sourceUrl: c.sourceUrl,
        }
      }
      const monthly = volume * (paise / 100)
      return {
        name: c.name,
        note: c.note,
        paise,
        monthly,
        saving: monthly - smsLocalMonthly,
        sourceUrl: c.sourceUrl,
      }
    })
  }, [msgType, volume, smsLocalMonthly])

  // Annual savings vs the median competitor with public pricing.
  const publicRates = rows.filter((r) => r.saving != null).map((r) => r.saving as number)
  const medianMonthlySaving =
    publicRates.length > 0
      ? [...publicRates].sort((a, b) => a - b)[Math.floor(publicRates.length / 2)]
      : 0
  const medianAnnualSaving = medianMonthlySaving * 12

  const plan = recommendedPlan(smsLocalMonthly)
  const planMonthsCovered =
    smsLocalMonthly > 0 ? Math.max(1, Math.floor(plan.walletInr / smsLocalMonthly)) : 0

  const isHero = variant === "hero"

  return (
    <div
      id={id}
      className={`scroll-mt-32 rounded-2xl border border-border bg-card shadow-sm ${
        isHero ? "" : ""
      }`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)]">
        {/* ── Inputs ────────────────────────────────────────────── */}
        <div className="border-b border-border p-6 lg:border-b-0 lg:border-r">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full border border-primary/25 bg-primary/10 px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-primary">
              <Sparkles className="h-3 w-3" />
              Live calculator
            </span>
          </div>
          <h3 className="mt-3 text-[18px] font-semibold tracking-tight text-foreground sm:text-[20px]">
            How much will RCS cost your team?
          </h3>
          <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
            Set your monthly volume and message type. We&apos;ll show what you&apos;d pay here
            versus the published India rate cards of every tracked competitor.
          </p>

          {/* Volume */}
          <div className="mt-6">
            <div className="flex items-baseline justify-between gap-4">
              <label
                htmlFor={`${id}-vol`}
                className="text-[11.5px] font-semibold uppercase tracking-[0.12em] text-muted-foreground"
              >
                Messages per month
              </label>
              <span className="font-mono text-[18px] font-semibold tabular-nums text-foreground">
                {volume.toLocaleString("en-IN")}
              </span>
            </div>
            <Slider
              id={`${id}-vol`}
              className="mt-3"
              min={0}
              max={100}
              step={0.5}
              value={[volumeToSlider(volume)]}
              onValueChange={(v) => setVolume(sliderToVolume(v[0] ?? 0))}
              aria-label="Messages per month"
            />
            <div className="mt-3 flex flex-wrap gap-1.5">
              {VOLUME_PRESETS.map((p) => {
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
                    {p >= 1_000_000 ? `${p / 1_000_000}M` : `${p / 1_000}K`}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Message type */}
          <fieldset className="mt-6">
            <legend className="text-[11.5px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Message type
            </legend>
            <div
              role="radiogroup"
              aria-label="Message type"
              className="mt-2 grid grid-cols-2 overflow-hidden rounded-lg border border-border"
            >
              {(
                [
                  {
                    k: "basic" as const,
                    label: "Basic text",
                    sub: formatPaiseAsRupees(SMSLOCAL_RCS_RATE.basicTextPaise),
                  },
                  {
                    k: "rich" as const,
                    label: "Rich card",
                    sub: formatPaiseAsRupees(SMSLOCAL_RCS_RATE.richCardPaise),
                  },
                ] as const
              ).map((opt) => {
                const active = msgType === opt.k
                return (
                  <button
                    key={opt.k}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => setMsgType(opt.k)}
                    className={`flex flex-col items-start gap-0.5 px-4 py-3 text-left transition ${
                      active
                        ? "bg-primary/10 text-primary"
                        : "bg-background text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                    }`}
                  >
                    <span className="text-[13px] font-semibold">{opt.label}</span>
                    <span
                      className={`font-mono text-[11.5px] tabular-nums ${
                        active ? "text-primary/80" : "text-muted-foreground"
                      }`}
                    >
                      {opt.sub} / msg
                    </span>
                  </button>
                )
              })}
            </div>
            <p className="mt-2 text-[11.5px] leading-relaxed text-muted-foreground">
              All figures are pre-GST. Rates fetched {COMPETITOR_RATES_FETCHED_AT} from public
              rate cards — we reprice if any of them drop below ours.
            </p>
          </fieldset>
        </div>

        {/* ── Results ───────────────────────────────────────────── */}
        <div className="p-6">
          {/* Primary number */}
          <div className="rounded-xl border border-primary/40 bg-primary/[0.04] p-5 ring-1 ring-primary/15">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                Your estimated SMSLocal bill
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                <TrendingDown className="h-3 w-3" />
                1% below market
              </span>
            </div>
            <div className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <span className="font-mono text-[34px] font-semibold tracking-tight tabular-nums text-foreground sm:text-[40px]">
                {formatInr(smsLocalMonthly)}
              </span>
              <span className="text-[13px] text-muted-foreground">/ month</span>
              <span className="text-[12.5px] text-muted-foreground">
                ≈ {formatInr(smsLocalAnnual)} / year
              </span>
            </div>
          </div>

          {/* Competitor table */}
          <div className="mt-5">
            <h4 className="text-[11.5px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Same volume, benchmarked competitors
            </h4>
            <div className="mt-3 overflow-hidden rounded-xl border border-border">
              <table className="w-full border-collapse text-left text-[13px]">
                <thead>
                  <tr className="border-b border-border bg-muted/40 text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
                    <th scope="col" className="px-4 py-2.5 font-semibold">
                      Provider
                    </th>
                    <th scope="col" className="hidden px-4 py-2.5 text-right font-semibold sm:table-cell">
                      Rate
                    </th>
                    <th scope="col" className="px-4 py-2.5 text-right font-semibold">
                      Monthly
                    </th>
                    <th scope="col" className="px-4 py-2.5 text-right font-semibold">
                      You save
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => {
                    const isQuoteOnly = r.paise == null
                    return (
                      <tr
                        key={r.name}
                        className="border-b border-border last:border-b-0"
                      >
                        <td className="px-4 py-3">
                          <a
                            href={r.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-foreground underline-offset-2 hover:underline"
                            title={`${r.name} public rate card — source`}
                          >
                            {r.name}
                          </a>
                          {r.note ? (
                            <p className="mt-0.5 text-[11.5px] leading-snug text-muted-foreground">
                              {r.note}
                            </p>
                          ) : null}
                        </td>
                        <td className="hidden px-4 py-3 text-right font-mono text-[12.5px] tabular-nums text-muted-foreground sm:table-cell">
                          {isQuoteOnly ? "—" : formatPaiseAsRupees(r.paise as number)}
                        </td>
                        <td className="px-4 py-3 text-right font-mono text-[13px] tabular-nums">
                          {isQuoteOnly ? (
                            <span className="inline-flex items-center gap-1 rounded-full border border-border bg-muted/50 px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-wider text-muted-foreground">
                              Quote only
                            </span>
                          ) : (
                            <span className="text-muted-foreground line-through">
                              {formatInr(r.monthly as number)}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-right font-mono text-[13px] tabular-nums">
                          {isQuoteOnly ? (
                            <span className="text-muted-foreground">—</span>
                          ) : (r.saving as number) > 0 ? (
                            <span className="font-semibold text-emerald-700 dark:text-emerald-300">
                              {formatInr(r.saving as number)}
                            </span>
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recommended plan */}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-dashed border-border bg-muted/30 px-4 py-3">
            <div className="min-w-0">
              <p className="text-[11.5px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                Recommended wallet top-up
              </p>
              <p className="mt-1 text-[13.5px] font-semibold text-foreground">
                {plan.name} — {formatInr(plan.walletInr)}
                <span className="ml-2 font-normal text-muted-foreground">
                  covers ~{planMonthsCovered === 0 ? "<1" : planMonthsCovered}{" "}
                  {planMonthsCovered === 1 ? "month" : "months"} at this volume
                </span>
              </p>
            </div>
            <Link
              href={`/pricing#rcs-plans`}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-2 text-[12.5px] font-semibold text-foreground transition hover:bg-muted"
            >
              View plans
              <ChevronDown className="h-3.5 w-3.5 -rotate-90" />
            </Link>
          </div>

          {/* Annual saving callout */}
          {medianAnnualSaving > 0 ? (
            <p className="mt-3 text-[12.5px] leading-relaxed text-muted-foreground">
              Switching at this volume saves an estimated{" "}
              <span className="font-semibold text-foreground">
                {formatInr(medianAnnualSaving)} / year
              </span>{" "}
              vs the median tracked competitor.
            </p>
          ) : null}

          <Link
            href="https://app.smslocal.in/signup"
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-[13.5px] font-semibold text-primary-foreground shadow-md shadow-primary/20 transition hover:brightness-110"
          >
            Start with ₹60 free credit
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  )
}
