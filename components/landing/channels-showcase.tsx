import { ArrowUpRight, Bot, KeyRound, MessageCircle, MessageSquareText, Radio, Zap } from "lucide-react"
import { Reveal } from "./reveal"

type Channel = {
  short: string
  title: string
  desc: string
  icon: React.ComponentType<{ className?: string }>
  href: string
  grad: string
}

const CHANNELS: Channel[] = [
  {
    short: "Bulk SMS",
    title: "Bulk SMS",
    desc: "DLT-compliant transactional & promotional SMS on direct-operator routes. From ₹0.09.",
    icon: MessageSquareText,
    href: "/products/bulk-sms",
    grad: "linear-gradient(155deg, oklch(0.46 0.12 170), oklch(0.17 0.03 220))",
  },
  {
    short: "WhatsApp API",
    title: "WhatsApp Business API",
    desc: "Green-tick BSP — broadcasts, templates, and a shared team inbox.",
    icon: MessageCircle,
    href: "/products/whatsapp-business-api",
    grad: "linear-gradient(155deg, oklch(0.44 0.13 162), oklch(0.16 0.03 228))",
  },
  {
    short: "AI Agents",
    title: "AI WhatsApp Agents",
    desc: "Auto-reply and deflect tickets in 8 Indian languages, around the clock.",
    icon: Bot,
    href: "/products/ai-agents",
    grad: "linear-gradient(155deg, oklch(0.48 0.13 178), oklch(0.18 0.03 215))",
  },
  {
    short: "OTP",
    title: "OTP & Verification",
    desc: "Priority-routed OTP SMS with automatic carrier failover. From ₹0.15.",
    icon: KeyRound,
    href: "/products/otp-sms",
    grad: "linear-gradient(155deg, oklch(0.43 0.12 158), oklch(0.16 0.03 232))",
  },
  {
    short: "RCS",
    title: "RCS Business Messaging",
    desc: "Branded, verified messaging that falls back to SMS automatically.",
    icon: Radio,
    href: "/products/rcs",
    grad: "linear-gradient(155deg, oklch(0.47 0.12 184), oklch(0.17 0.03 222))",
  },
  {
    short: "Quick SMS",
    title: "Quick SMS",
    desc: "Launch campaigns without code — straight from your dashboard.",
    icon: Zap,
    href: "/products/quick-sms",
    grad: "linear-gradient(155deg, oklch(0.45 0.13 166), oklch(0.16 0.03 226))",
  },
]

export function ChannelsShowcase() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-background py-20 lg:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[12px] font-semibold uppercase tracking-wider text-primary">
            One platform, every channel
          </span>
          <h2 className="mt-5 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[44px] lg:leading-[1.1]">
            Every channel your customers use —{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">one dashboard</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            SMS, WhatsApp, RCS, OTP and AI agents — one API, one wallet. Hover a panel to explore.
          </p>
        </Reveal>

        {/* Hover-expand accordion */}
        <Reveal delay={80} className="mt-12 flex flex-col gap-3 lg:h-[420px] lg:flex-row">
          {CHANNELS.map((c, i) => (
            <a
              key={c.title}
              href={c.href}
              className="group relative flex min-h-[150px] flex-col justify-end overflow-hidden rounded-2xl p-5 text-white shadow-lg transition-all duration-500 ease-out lg:min-h-0 lg:flex-1 lg:hover:flex-[2.6]"
              style={{ background: c.grad }}
            >
              {/* texture + sheen */}
              <div aria-hidden className="bg-grid-ink pointer-events-none absolute inset-0 opacity-30 [mask-image:linear-gradient(to_top,black,transparent)]" />
              {/* number */}
              <span className="absolute right-4 top-4 font-mono text-[11px] text-white/55">0{i + 1} / 06</span>
              {/* icon */}
              <span className="absolute left-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-white backdrop-blur-sm">
                <c.icon className="h-5 w-5" />
              </span>

              <div className="relative">
                <h3 className="text-lg font-bold leading-tight">
                  <span className="lg:hidden">{c.title}</span>
                  <span className="hidden lg:inline lg:group-hover:hidden">{c.short}</span>
                  <span className="hidden lg:group-hover:inline">{c.title}</span>
                </h3>
                {/* reveal */}
                <div className="overflow-hidden opacity-100 transition-all duration-500 lg:max-h-0 lg:opacity-0 lg:group-hover:mt-2 lg:group-hover:max-h-40 lg:group-hover:opacity-100">
                  <p className="mt-2 max-w-sm text-[13px] leading-relaxed text-white/80 lg:mt-0">{c.desc}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-[13px] font-semibold text-white">
                    Learn more <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </a>
          ))}
        </Reveal>

        <Reveal className="mt-10 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm">
          <span className="text-muted-foreground">Not sure where to start?</span>
          <a href="/products" className="inline-flex items-center gap-1 font-semibold text-primary hover:underline">
            Explore the full platform <ArrowUpRight className="h-4 w-4" />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
