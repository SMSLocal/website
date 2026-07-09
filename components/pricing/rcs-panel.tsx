import Link from "next/link"
import { ArrowRight, Check, Info, Minus, ShieldCheck, Sparkles, Star, TrendingDown } from "lucide-react"
import {
  COMPETITOR_RATES,
  COMPETITOR_RATES_FETCHED_AT,
  formatInr,
  formatPaise,
  formatPaiseAsRupees,
  RCS_PLANS,
  SMSLOCAL_RCS_RATE,
  type RcsPlan,
} from "@/lib/pricing/rcs"
import { RcsCalculator } from "@/components/pricing/rcs-calculator"

export function RcsPanel() {
  return (
    <div id="rcs" className="scroll-mt-32">
      {/* Headline */}
      <div className="max-w-3xl">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/5 px-2.5 py-1 text-[11px] font-semibold text-primary">
            <Star className="h-3 w-3" />
            New channel
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/5 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300">
            <TrendingDown className="h-3 w-3" />
            1% below market rate
          </span>
        </div>
        <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
          RCS Business Messaging — priced 1% below MSG91.
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
          We publish SMSLocal&apos;s RCS rate at exactly 1% below the market leader&apos;s
          published India rate card. Same Google RBM partners, same Jio–Airtel–Vi coverage,
          same rich-card rendering — just a cheaper per-message rate, transparent on this page
          and locked on your invoice.
        </p>
      </div>

      {/* Rate card */}
      <div className="mt-10">
        <div className="rounded-2xl border border-border bg-card shadow-sm">
          <div className="flex items-baseline justify-between border-b border-border px-6 py-4">
            <div>
              <h3 className="text-[15.5px] font-semibold tracking-tight text-foreground">
                SMSLocal RCS rate card — India A2P
              </h3>
              <p className="mt-0.5 text-[12.5px] text-muted-foreground">
                Exclusive of 18% GST. Billed per delivered message.
              </p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full border border-primary/25 bg-primary/10 px-2.5 py-0.5 text-[10.5px] font-semibold uppercase tracking-[0.1em] text-primary">
              <Sparkles className="h-3 w-3" />
              Live
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-left text-[14px]">
              <thead>
                <tr className="border-b border-border bg-muted/30 text-[12px] uppercase tracking-[0.12em] text-muted-foreground">
                  <th className="px-6 py-3.5 font-semibold">Message type</th>
                  <th className="px-6 py-3.5 text-right font-semibold">Per message</th>
                  <th className="px-6 py-3.5 text-right font-semibold">Market rate</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="px-6 py-4">
                    <p className="font-semibold text-foreground">Basic text message</p>
                    <p className="mt-0.5 text-[12.5px] text-muted-foreground">
                      Brand-verified single text, up to 160 characters, with delivery + read
                      receipts.
                    </p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className="font-mono text-[15.5px] font-semibold text-foreground">
                      {formatPaiseAsRupees(SMSLOCAL_RCS_RATE.basicTextPaise)}
                    </p>
                    <p className="mt-0.5 text-[11.5px] text-muted-foreground">
                      {formatPaise(SMSLOCAL_RCS_RATE.basicTextPaise)} / msg
                    </p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className="font-mono text-[13.5px] text-muted-foreground line-through">
                      ₹0.12
                    </p>
                    <p className="mt-0.5 text-[11px] text-emerald-700 dark:text-emerald-400">
                      Save 1%
                    </p>
                  </td>
                </tr>
                <tr className="border-b border-border bg-primary/[0.04]">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-foreground">Rich card message</p>
                      <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent">
                        Most used
                      </span>
                    </div>
                    <p className="mt-0.5 text-[12.5px] text-muted-foreground">
                      Single A2P rich message with image, video, carousel, or PDF, plus tap-to-reply
                      chips.
                    </p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className="font-mono text-[15.5px] font-semibold text-foreground">
                      {formatPaiseAsRupees(SMSLOCAL_RCS_RATE.richCardPaise)}
                    </p>
                    <p className="mt-0.5 text-[11.5px] text-muted-foreground">
                      {formatPaise(SMSLOCAL_RCS_RATE.richCardPaise)} / msg
                    </p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className="font-mono text-[13.5px] text-muted-foreground line-through">
                      ₹0.14
                    </p>
                    <p className="mt-0.5 text-[11px] text-emerald-700 dark:text-emerald-400">
                      Save 1%
                    </p>
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-6 py-4">
                    <p className="font-semibold text-foreground">International basic text</p>
                    <p className="mt-0.5 text-[12.5px] text-muted-foreground">
                      A2P text message to all other supported countries.
                    </p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className="font-mono text-[15.5px] font-semibold text-foreground">
                      {formatPaiseAsRupees(SMSLOCAL_RCS_RATE.intlBasicTextPaise)}
                    </p>
                    <p className="mt-0.5 text-[11.5px] text-muted-foreground">
                      {formatPaise(SMSLOCAL_RCS_RATE.intlBasicTextPaise)} / msg
                    </p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className="font-mono text-[13.5px] text-muted-foreground line-through">
                      ₹0.15
                    </p>
                    <p className="mt-0.5 text-[11px] text-emerald-700 dark:text-emerald-400">
                      Save 1%
                    </p>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-foreground">International rich card</p>
                    <p className="mt-0.5 text-[12.5px] text-muted-foreground">
                      A2P rich card to all other supported countries.
                    </p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className="font-mono text-[15.5px] font-semibold text-foreground">
                      {formatPaiseAsRupees(SMSLOCAL_RCS_RATE.intlRichCardPaise)}
                    </p>
                    <p className="mt-0.5 text-[11.5px] text-muted-foreground">
                      {formatPaise(SMSLOCAL_RCS_RATE.intlRichCardPaise)} / msg
                    </p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className="font-mono text-[13.5px] text-muted-foreground line-through">
                      ₹0.20
                    </p>
                    <p className="mt-0.5 text-[11px] text-emerald-700 dark:text-emerald-400">
                      Save 1%
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex flex-wrap items-start gap-2 border-t border-border bg-muted/20 px-6 py-4 text-[12.5px] text-muted-foreground">
            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            <p>
              You are only billed for messages that Google confirms as delivered. Failures and
              SMS-fallback sends are charged at your SMS tier rate, not RCS. Rates published on
              this page are locked on every invoice you receive.
            </p>
          </div>
        </div>

      </div>

      {/* Full-width interactive calculator */}
      <div className="mt-10">
        <RcsCalculator id="rcs-calculator" variant="panel" />
      </div>

      {/* Plans */}
      <div id="rcs-plans" className="mt-16 scroll-mt-32">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h3 className="text-2xl font-semibold tracking-tight">Wallet plans</h3>
            <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-muted-foreground">
              Pick a wallet size, use the balance at the rate card above. No separate platform fee
              — the plan amount is your wallet credit. Validity is 24 months on every plan.
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-[11.5px] font-medium text-muted-foreground">
            <Minus className="h-3 w-3" />
            No monthly platform fee
          </span>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
          {RCS_PLANS.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      </div>

      {/* Competitor comparison */}
      <div className="mt-16">
        <h3 className="text-2xl font-semibold tracking-tight">How we compare</h3>
        <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-muted-foreground">
          Published India A2P RCS rates, as of {COMPETITOR_RATES_FETCHED_AT}. We don&apos;t reprint
          private quotes — only what each provider publishes on their own website.
        </p>

        <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left text-[14px]">
              <thead>
                <tr className="border-b border-border bg-muted/30 text-[12px] uppercase tracking-[0.12em] text-muted-foreground">
                  <th className="px-6 py-3.5 font-semibold">Provider</th>
                  <th className="px-6 py-3.5 text-right font-semibold">Basic text</th>
                  <th className="px-6 py-3.5 text-right font-semibold">Rich card</th>
                  <th className="px-6 py-3.5 font-semibold">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border bg-primary/[0.05]">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-primary/15 text-primary">
                        <ShieldCheck className="h-3.5 w-3.5" />
                      </span>
                      <p className="font-semibold text-foreground">SMSLocal</p>
                      <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                        You
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right font-mono text-[14px] font-semibold text-foreground">
                    {formatPaiseAsRupees(SMSLOCAL_RCS_RATE.basicTextPaise)}
                  </td>
                  <td className="px-6 py-4 text-right font-mono text-[14px] font-semibold text-foreground">
                    {formatPaiseAsRupees(SMSLOCAL_RCS_RATE.richCardPaise)}
                  </td>
                  <td className="px-6 py-4 text-[13px] text-muted-foreground">
                    Locked at 1% below MSG91, auditable on every invoice.
                  </td>
                </tr>
                {COMPETITOR_RATES.map((c) => (
                  <tr key={c.name} className="border-b border-border last:border-b-0">
                    <td className="px-6 py-4 font-semibold text-foreground">
                      <a
                        href={c.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="underline-offset-2 hover:underline"
                      >
                        {c.name}
                      </a>
                    </td>
                    <td className="px-6 py-4 text-right font-mono text-[14px] text-foreground">
                      {c.basicTextPaise != null ? `₹${(c.basicTextPaise / 100).toFixed(2)}` : "—"}
                    </td>
                    <td className="px-6 py-4 text-right font-mono text-[14px] text-foreground">
                      {c.richCardPaise != null ? `₹${(c.richCardPaise / 100).toFixed(2)}` : "—"}
                    </td>
                    <td className="px-6 py-4 text-[13px] text-muted-foreground">{c.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

function PlanCard({ plan }: { plan: RcsPlan }) {
  const featured = plan.badge === "Most popular"
  return (
    <div
      className={`relative flex h-full flex-col rounded-2xl border bg-card p-6 shadow-sm ${
        featured
          ? "border-primary/60 shadow-lg ring-1 ring-primary/20"
          : "border-border"
      }`}
    >
      {plan.badge ? (
        <span className="absolute -top-3 left-6 inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-wider text-primary-foreground shadow-sm">
          <Sparkles className="h-3 w-3" />
          {plan.badge}
        </span>
      ) : null}
      <h4 className="text-[15px] font-semibold tracking-tight text-foreground">{plan.name}</h4>
      <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{plan.description}</p>
      <div className="mt-5">
        <div className="flex items-baseline gap-1.5">
          <span className="text-[32px] font-semibold tracking-tight text-foreground tabular-nums">
            {formatInr(plan.walletInr)}
          </span>
          <span className="text-[12.5px] text-muted-foreground">wallet</span>
        </div>
        <p className="mt-1 text-[12px] text-muted-foreground">
          ≈ {plan.richCardsIncluded.toLocaleString("en-IN")} rich cards or{" "}
          {plan.basicTextsIncluded.toLocaleString("en-IN")} basic texts
        </p>
      </div>
      <ul className="mt-5 flex-1 space-y-2">
        {plan.includes.map((line) => (
          <li key={line} className="flex items-start gap-2 text-[13px] text-foreground/90">
            <span className="mt-1 inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
              <Check className="h-2.5 w-2.5" strokeWidth={3} />
            </span>
            {line}
          </li>
        ))}
      </ul>
      <Link
        href="/signup/"
        className={`mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-[13.5px] font-semibold transition ${
          featured
            ? "bg-primary text-primary-foreground shadow-md shadow-primary/25 hover:brightness-110"
            : "border border-border bg-background text-foreground hover:bg-muted"
        }`}
      >
        Start with {plan.name}
        <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  )
}

// re-export for cross-linking on the product page

