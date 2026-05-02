import { Quote, TrendingUp, Clock3, MessageCircle } from "lucide-react"

type Slot = {
  template: string
  roleHint: string
  sectorHint: string
  metricHint: {
    icon: React.ReactNode
    valueHint: string
    labelHint: string
  }
}

// Per brand rules: no fabricated customer names, quotes, or metrics.
// These are clearly-marked placeholder slots to be replaced with real,
// approved customer stories. Structure stays; copy swaps.
const SLOTS: Slot[] = [
  {
    template:
      "Short, specific quote about what changed for the customer after moving OTP traffic to SMSLocal — written in their voice, 1–3 sentences.",
    roleHint: "Head of Engineering",
    sectorHint: "Consumer fintech",
    metricHint: {
      icon: <TrendingUp className="h-3.5 w-3.5" />,
      valueHint: "+X pts",
      labelHint: "OTP first-attempt delivery",
    },
  },
  {
    template:
      "Story about a peak campaign window — festive, flash sale, new launch — where delivery volume, failover, or analytics made a measurable difference.",
    roleHint: "CRM & Growth Lead",
    sectorHint: "D2C retail",
    metricHint: {
      icon: <MessageCircle className="h-3.5 w-3.5" />,
      valueHint: "X M+",
      labelHint: "messages in a single window",
    },
  },
  {
    template:
      "Outcome from an AI WhatsApp agent deployment — ideally covering multi-language replies, deflection rate, and handoff to human agents.",
    roleHint: "Customer Experience Director",
    sectorHint: "Logistics & last-mile",
    metricHint: {
      icon: <Clock3 className="h-3.5 w-3.5" />,
      valueHint: "−X%",
      labelHint: "first-response time on WhatsApp",
    },
  },
]

export function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-background py-20 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          background:
            "radial-gradient(60% 40% at 50% 0%, color-mix(in oklch, var(--primary) 12%, transparent), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex rounded-full border border-border bg-card px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Customer stories
          </span>
          <h2 className="mt-4 text-pretty text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Built to carry real Indian workloads.
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
            Placeholder testimonial slots — ready for verified customer quotes. Real stories will
            replace these cards once customers have approved public attribution.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {SLOTS.map((s, i) => (
            <PlaceholderCard key={i} slot={s} />
          ))}
        </div>

        <div className="mx-auto mt-10 flex max-w-2xl items-center justify-center gap-2 rounded-full border border-dashed border-border bg-card/60 px-4 py-2 text-center text-[12px] text-muted-foreground">
          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          <span>
            Replace each slot with a real, approved customer quote before launch. Full attribution
            is available from the SMSLocal sales team.
          </span>
        </div>
      </div>
    </section>
  )
}

function PlaceholderCard({ slot }: { slot: Slot }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-dashed border-border/80 bg-card p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full bg-primary/10 blur-2xl transition-opacity duration-500 group-hover:opacity-80"
      />

      {/* Placeholder chip */}
      <div className="relative flex items-center justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Quote className="h-4 w-4" />
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-accent">
          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          Placeholder
        </span>
      </div>

      {/* Template copy (clearly indicative, not fabricated) */}
      <blockquote className="relative mt-5 text-[14.5px] italic leading-relaxed text-muted-foreground">
        &ldquo;{slot.template}&rdquo;
      </blockquote>

      {/* Metric slot */}
      <div className="relative mt-6 flex items-center gap-3 rounded-xl border border-dashed border-border/80 bg-muted/40 px-4 py-3">
        <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {slot.metricHint.icon}
        </span>
        <div className="min-w-0">
          <div className="text-sm font-semibold tracking-tight text-foreground">
            {slot.metricHint.valueHint}
          </div>
          <div className="truncate text-[11.5px] leading-snug text-muted-foreground">
            {slot.metricHint.labelHint}
          </div>
        </div>
      </div>

      {/* Attribution slot */}
      <div className="relative mt-6 border-t border-dashed border-border/80 pt-4">
        <div className="text-sm font-medium text-foreground/70">{slot.roleHint}</div>
        <div className="text-[12.5px] text-muted-foreground">
          {slot.sectorHint} · customer name pending approval
        </div>
      </div>
    </article>
  )
}
