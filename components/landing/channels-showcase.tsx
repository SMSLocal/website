import { ArrowUpRight, Bot, KeyRound, MessageCircle, MessageSquareText, Radio, Zap } from "lucide-react"
import { ChannelVisual } from "./channel-visual"
import { Reveal } from "./reveal"

type Channel = {
  kind: string
  short: string
  title: string
  tag: string
  desc: string
  icon: React.ComponentType<{ className?: string }>
  href: string
  grad: string
}

const CHANNELS: Channel[] = [
  { kind: "bulk", short: "Bulk SMS", title: "Bulk SMS", tag: "From ₹0.09 / SMS", desc: "DLT-compliant transactional & promotional SMS on direct-operator routes.", icon: MessageSquareText, href: "/products/bulk-sms", grad: "linear-gradient(155deg, oklch(0.50 0.13 170), oklch(0.18 0.03 220))" },
  { kind: "wa", short: "WhatsApp API", title: "WhatsApp Business API", tag: "Green-tick BSP", desc: "Broadcasts, templates, and a shared team inbox on the official API.", icon: MessageCircle, href: "/products/whatsapp-business-api", grad: "linear-gradient(155deg, oklch(0.48 0.14 160), oklch(0.17 0.03 228))" },
  { kind: "ai", short: "AI Agents", title: "AI WhatsApp Agents", tag: "8 Indian languages", desc: "Auto-reply and deflect tickets in eight Indian languages, around the clock.", icon: Bot, href: "/products/ai-agents", grad: "linear-gradient(155deg, oklch(0.52 0.13 180), oklch(0.19 0.03 214))" },
  { kind: "otp", short: "OTP", title: "OTP & Verification", tag: "From ₹0.15 · 0.3s", desc: "Priority-routed OTP SMS with automatic carrier failover.", icon: KeyRound, href: "/products/otp-sms", grad: "linear-gradient(155deg, oklch(0.47 0.12 156), oklch(0.16 0.03 232))" },
  { kind: "rcs", short: "RCS", title: "RCS Business Messaging", tag: "Branded + SMS fallback", desc: "Verified, branded rich cards that fall back to SMS automatically.", icon: Radio, href: "/products/rcs", grad: "linear-gradient(155deg, oklch(0.50 0.12 186), oklch(0.18 0.03 222))" },
  { kind: "quick", short: "Quick SMS", title: "Quick SMS", tag: "No code", desc: "Launch campaigns without code — straight from your dashboard.", icon: Zap, href: "/products/quick-sms", grad: "linear-gradient(155deg, oklch(0.49 0.13 166), oklch(0.17 0.03 226))" },
]

function Panel({ c, n }: { c: Channel; n: number }) {
  return (
    <a
      href={c.href}
      className="group relative flex min-h-[240px] flex-col overflow-hidden rounded-2xl p-5 text-white shadow-lg transition-all duration-500 ease-out lg:min-h-0 lg:flex-1 lg:hover:flex-[2.2]"
      style={{ background: c.grad }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-2/3" style={{ background: "radial-gradient(120% 80% at 50% 0%, rgba(255,255,255,0.12), transparent 70%)" }} />
      <c.icon aria-hidden className="pointer-events-none absolute -bottom-4 -right-3 h-28 w-28 text-white/[0.07]" />

      <div className="relative flex items-start justify-between">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-white backdrop-blur-sm"><c.icon className="h-5 w-5" /></span>
        <span className="font-mono text-[11px] text-white/55">0{n} / 06</span>
      </div>

      {/* live feature demo */}
      <div className="relative flex flex-1 items-center py-4">
        <ChannelVisual kind={c.kind} />
      </div>

      <div className="relative">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-white/65">{c.tag}</div>
        <h3 className="mt-1 text-lg font-bold leading-tight">
          <span className="lg:hidden">{c.title}</span>
          <span className="hidden lg:inline lg:group-hover:hidden">{c.short}</span>
          <span className="hidden lg:group-hover:inline">{c.title}</span>
        </h3>
        <div className="overflow-hidden opacity-100 transition-all duration-500 lg:max-h-0 lg:opacity-0 lg:group-hover:mt-2 lg:group-hover:max-h-40 lg:group-hover:opacity-100">
          <p className="mt-2 max-w-sm text-[13px] leading-relaxed text-white/80 lg:mt-0">{c.desc}</p>
          <span className="mt-3 inline-flex items-center gap-1 text-[13px] font-semibold text-white">Learn more <ArrowUpRight className="h-4 w-4" /></span>
        </div>
      </div>
    </a>
  )
}

export function ChannelsShowcase() {
  const rows = [CHANNELS.slice(0, 3), CHANNELS.slice(3, 6)]
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

        <div className="mt-12 space-y-3">
          {rows.map((row, ri) => (
            <Reveal key={ri} delay={ri * 120} className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:flex lg:h-[300px]">
              {row.map((c, j) => (
                <Panel key={c.title} c={c} n={ri * 3 + j + 1} />
              ))}
            </Reveal>
          ))}
        </div>

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
