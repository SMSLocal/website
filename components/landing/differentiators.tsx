import { Layers, Sparkles, Zap } from "lucide-react"

const CARDS = [
  {
    icon: Layers,
    tag: "Multi-channel waterfall",
    title: "One message, every channel your customer has",
    body: "Send a single payload and we'll try RCS first for branded rich cards, fall through to WhatsApp if the recipient is opted in, and finish on DLT-compliant SMS — on the same wallet, same delivery report, same webhook. No duplicate code paths, no second vendor.",
    pills: ["RCS", "WhatsApp", "SMS"],
  },
  {
    icon: Zap,
    tag: "Delivery",
    title: "Delivery that fights for every message",
    body: "Smart route failover sends traffic through the fastest carrier path and auto-switches if anything slows down. Wrong-number detection flags invalid contacts before send. Failed-batch retry recovers 10–30% of deliveries most platforms simply write off.",
    stats: [
      { k: "Routes", v: "4+ carriers" },
      { k: "Failover", v: "< 200ms" },
      { k: "Recovery", v: "10–30%" },
    ],
  },
  {
    icon: Sparkles,
    tag: "AI Agents",
    title: "AI agents that speak your customer's language",
    body: "Hand off boilerplate queries to an agent that replies in the language the customer writes in — Hindi, English, Tamil, Telugu, Bengali, Marathi, Gujarati, or Kannada. Flows built in a visual builder, grounded on your docs and catalog, with clean escalation to a human in the shared inbox.",
    languages: ["हिन्दी", "தமிழ்", "తెలుగు", "বাংলা", "मराठी", "ગુજરાતી", "ಕನ್ನಡ", "EN"],
  },
]

export function Differentiators() {
  return (
    <section className="bg-muted/40 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex rounded-full border border-border bg-background px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            What makes SMSLocal different
          </span>
          <h2 className="mt-4 text-pretty text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Capability you can&apos;t buy off a pricing page.
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {CARDS.map((card) => {
            const Icon = card.icon
            return (
              <article
                key={card.title}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-background p-7 transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="rounded-full border border-border bg-muted px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {card.tag}
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-semibold leading-tight tracking-tight text-foreground">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{card.body}</p>

                {card.languages && (
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {card.languages.map((lang) => (
                      <span
                        key={lang}
                        className="rounded-md border border-border bg-muted/80 px-2 py-1 text-[11px] font-medium text-foreground"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                )}

                {card.stats && (
                  <dl className="mt-5 grid grid-cols-3 gap-2 border-t border-border pt-4">
                    {card.stats.map((s) => (
                      <div key={s.k}>
                        <dt className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                          {s.k}
                        </dt>
                        <dd className="mt-0.5 text-sm font-semibold text-foreground">{s.v}</dd>
                      </div>
                    ))}
                  </dl>
                )}

                {card.pills && (
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {card.pills.map((p) => (
                      <span
                        key={p}
                        className="rounded-full border border-primary/30 bg-primary/5 px-2.5 py-1 text-[11px] font-semibold text-primary"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
