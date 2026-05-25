import { ArrowUpRight, Bot, KeyRound, MessageCircle, MessageSquareText, Radio, Zap } from "lucide-react"

type Channel = {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  href: string
  tag?: string
}

const CHANNELS: Channel[] = [
  {
    icon: MessageSquareText,
    title: "Bulk SMS",
    description: "DLT-compliant transactional & promotional SMS on direct-operator routes.",
    href: "/products/bulk-sms",
    tag: "From ₹0.12",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Business API",
    description: "Green-tick BSP with broadcasts, templates, and a shared team inbox.",
    href: "/products/whatsapp-business-api",
  },
  {
    icon: Bot,
    title: "AI WhatsApp Agents",
    description: "Auto-reply and deflect tickets in 8 Indian languages, around the clock.",
    href: "/products/ai-agents",
    tag: "AI",
  },
  {
    icon: KeyRound,
    title: "OTP & Verification",
    description: "Priority-routed OTP SMS with automatic carrier failover.",
    href: "/products/otp-sms",
    tag: "From ₹0.15",
  },
  {
    icon: Radio,
    title: "RCS Business Messaging",
    description: "Branded, verified messaging that falls back to SMS automatically.",
    href: "/products/rcs",
  },
  {
    icon: Zap,
    title: "Quick SMS",
    description: "Launch campaigns without code — straight from your dashboard.",
    href: "/products/quick-sms",
  },
]

export function ChannelsShowcase() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-background py-20 lg:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[12px] font-semibold uppercase tracking-wider text-primary">
            One platform, every channel
          </span>
          <h2 className="mt-5 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[44px] lg:leading-[1.1]">
            Every channel your customers use —{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              one dashboard
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            SMS, WhatsApp, RCS, OTP and AI agents — run them all from one API and one wallet.
            No juggling vendors, no separate invoices.
          </p>
        </div>

        {/* Channel grid */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CHANNELS.map((c) => (
            <a
              key={c.title}
              href={c.href}
              className="group relative flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary/15">
                  <c.icon className="h-5 w-5" />
                </span>
                {c.tag ? (
                  <span className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">
                    {c.tag}
                  </span>
                ) : null}
              </div>
              <h3 className="mt-5 flex items-center gap-1.5 text-lg font-semibold text-foreground">
                {c.title}
                <ArrowUpRight className="h-4 w-4 text-primary opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
                {c.description}
              </p>
            </a>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm">
          <span className="text-muted-foreground">Not sure where to start?</span>
          <a
            href="/products"
            className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"
          >
            Explore the full platform
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
