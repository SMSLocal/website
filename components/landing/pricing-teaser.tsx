import { ArrowRight, Check, MessageCircle, Sparkles, Star } from "lucide-react"

const PLANS = [
  {
    name: "Starter",
    rate: "₹0.24",
    rateUnit: "/SMS",
    recharge: "Recharge from ₹100 to ₹3,999",
    cta: "Start Free",
    features: ["Unlimited validity", "Full DLT compliance", "Pay-as-you-go, no lock-in"],
  },
  {
    name: "Growth",
    rate: "₹0.16",
    rateUnit: "/SMS",
    recharge: "Recharge from ₹14,000 to ₹59,999",
    cta: "Start Free",
    popular: true,
    features: ["24-month validity", "AI WhatsApp agents included", "Priority support"],
  },
  {
    name: "Enterprise",
    rate: "₹0.09",
    rateUnit: "/SMS",
    recharge: "₹6,00,000+ recharge",
    cta: "Talk to Sales",
    features: ["24-month validity", "Dedicated account manager", "Custom routing & SLAs"],
  },
]

export function PricingTeaser() {
  return (
    <section id="pricing" className="bg-muted/40 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex rounded-full border border-border bg-background px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Pricing
          </span>
          <h2 className="mt-4 text-pretty text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Simple pricing. Volume discounts built in.
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
            All features at every tier. The more you send, the less you pay.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {PLANS.map((plan) => {
            const popular = plan.popular
            return (
              <div
                key={plan.name}
                className={`relative flex flex-col rounded-2xl border p-7 transition ${
                  popular
                    ? "border-primary/50 bg-gradient-to-b from-background to-primary/5 shadow-xl shadow-primary/10 lg:-translate-y-2 lg:scale-[1.02]"
                    : "border-border bg-background hover:border-primary/30"
                }`}
              >
                {popular && (
                  <div className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-primary px-3 py-1 text-[11px] font-semibold text-primary-foreground shadow-lg shadow-primary/30">
                    <Sparkles className="h-3 w-3" />
                    Most popular
                  </div>
                )}

                <div className="flex items-baseline justify-between">
                  <h3 className="text-lg font-semibold tracking-tight text-foreground">
                    {plan.name}
                  </h3>
                </div>

                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-5xl font-semibold tracking-tight text-foreground">
                    {plan.rate}
                  </span>
                  <span className="text-sm text-muted-foreground">{plan.rateUnit}</span>
                </div>
                <p className="mt-2 text-[13px] text-muted-foreground">{plan.recharge}</p>

                <ul className="mt-6 flex-1 space-y-2.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-[13.5px] text-foreground">
                      <span
                        className={`mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                          popular ? "bg-primary text-primary-foreground" : "bg-primary/15 text-primary"
                        }`}
                      >
                        <Check className="h-2.5 w-2.5" strokeWidth={3} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href={plan.cta === "Talk to Sales" ? "/company/contact" : "/signup"}
                  className={`mt-7 inline-flex items-center justify-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                    popular
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:brightness-110"
                      : "border border-border bg-card text-foreground hover:border-primary/40 hover:bg-primary/5"
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            )
          })}
        </div>

        {/* Other channels — WhatsApp + RCS */}
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* WhatsApp note */}
          <div
            id="whatsapp"
            className="flex flex-col rounded-2xl border border-border bg-background p-6"
          >
            <div className="inline-flex w-fit items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-accent">
              <MessageCircle className="h-3 w-3" />
              WhatsApp Business API
            </div>
            <p className="mt-3 text-[15px] font-semibold text-foreground">
              Zero setup. Zero activation. Zero monthly plan.
            </p>
            <p className="mt-1 text-[13.5px] leading-relaxed text-muted-foreground">
              Pay per message on Meta&apos;s India rate card. Start with the ₹100 minimum top-up —
              your first wallet shows ₹160 with the signup bonus.
            </p>
            <a
              href="/pricing#whatsapp"
              className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[13.5px] font-semibold text-primary hover:underline"
            >
              See WhatsApp rates
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* RCS note */}
          <div
            id="rcs"
            className="flex flex-col rounded-2xl border border-primary/40 bg-primary/[0.04] p-6"
          >
            <div className="flex items-center gap-2">
              <div className="inline-flex w-fit items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-primary">
                <Star className="h-3 w-3" />
                RCS Business Messaging
              </div>
              <span className="inline-flex items-center rounded-full bg-primary px-2 py-0.5 text-[9.5px] font-semibold uppercase tracking-wider text-primary-foreground">
                New
              </span>
            </div>
            <p className="mt-3 text-[15px] font-semibold text-foreground">
              Priced 1% below MSG91. Same Google RBM rails.
            </p>
            <p className="mt-1 text-[13.5px] leading-relaxed text-muted-foreground">
              Verified, branded rich cards on Jio, Airtel, Vi — with automatic DLT SMS fallback. From
              ₹0.1188 basic text · ₹0.1386 rich card.
            </p>
            <a
              href="/pricing#rcs"
              className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[13.5px] font-semibold text-primary hover:underline"
            >
              See RCS rates &amp; cost calculator
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
