import { ArrowUpRight, Bot, Mail, MessageCircle, MessageSquareText, Radio, Workflow } from "lucide-react"
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
  { kind: "bulk", short: "Bulk SMS", title: "Bulk SMS", tag: "From ₹0.105 / SMS", desc: "DLT-compliant transactional & promotional SMS on direct-operator routes.", icon: MessageSquareText, href: "/products/bulk-sms/", grad: "linear-gradient(155deg, oklch(0.50 0.13 170), oklch(0.18 0.03 220))" },
  { kind: "wa", short: "WhatsApp API", title: "WhatsApp Business API", tag: "Green-tick BSP", desc: "Broadcasts, templates, and a shared team inbox on the official API.", icon: MessageCircle, href: "/products/whatsapp-business-api/", grad: "linear-gradient(155deg, oklch(0.48 0.14 160), oklch(0.17 0.03 228))" },
  { kind: "ai", short: "AI Agents", title: "AI WhatsApp Agents", tag: "8 Indian languages", desc: "Auto-reply and deflect tickets in eight Indian languages, around the clock.", icon: Bot, href: "/products/ai-agents/", grad: "linear-gradient(155deg, oklch(0.52 0.13 180), oklch(0.19 0.03 214))" },
  { kind: "agentic", short: "Agentic AI", title: "Agentic AI Automation", tag: "Thinks · acts · resolves", desc: "Self-learning agents that resolve queries end to end, trigger workflows, and escalate only when needed.", icon: Workflow, href: "/products/ai-agentic/", grad: "linear-gradient(155deg, oklch(0.49 0.13 166), oklch(0.17 0.03 226))" },
  { kind: "rcs", short: "RCS", title: "RCS Business Messaging", tag: "Branded + SMS fallback", desc: "Verified, branded rich cards that fall back to SMS automatically.", icon: Radio, href: "/products/rcs/", grad: "linear-gradient(155deg, oklch(0.50 0.12 186), oklch(0.18 0.03 222))" },
  { kind: "email", short: "Email", title: "Team Email Inbox", tag: "Shared inbox", desc: "A shared email inbox with assignments, internal notes, and automation — without the per-seat price.", icon: Mail, href: "/products/email/", grad: "linear-gradient(155deg, oklch(0.51 0.12 175), oklch(0.18 0.03 218))" },
]

function Panel({ c, n }: { c: Channel; n: number }) {
  return (
    <a
      href={c.href}
      className="group relative flex h-full min-h-[270px] flex-col overflow-hidden rounded-2xl p-5 text-white shadow-lg ring-1 ring-white/10 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl hover:ring-white/25"
      style={{ background: c.grad }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-2/3 opacity-80 transition-opacity duration-300 group-hover:opacity-100" style={{ background: "radial-gradient(120% 80% at 50% 0%, rgba(255,255,255,0.13), transparent 70%)" }} />
      <c.icon aria-hidden className="pointer-events-none absolute -bottom-4 -right-3 h-28 w-28 text-white/[0.06] transition-transform duration-500 ease-out group-hover:scale-110" />

      <div className="relative flex items-start justify-between">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-white ring-1 ring-white/15 backdrop-blur-sm transition-colors group-hover:bg-white/25"><c.icon className="h-5 w-5" /></span>
        <span className="font-mono text-[11px] text-white/45">0{n} / 0{CHANNELS.length}</span>
      </div>

      {/* live feature demo */}
      <div className="relative flex flex-1 items-center py-4">
        <ChannelVisual kind={c.kind} />
      </div>

      <div className="relative">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-white/60">{c.tag}</div>
        <h3 className="mt-1 text-lg font-bold leading-tight">{c.title}</h3>
        <p className="mt-1.5 text-[13px] leading-relaxed text-white/75">{c.desc}</p>
        <span className="mt-3 inline-flex items-center gap-1 text-[13px] font-semibold text-white/90">
          Learn more <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </a>
  )
}

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
            SMS, WhatsApp, RCS, OTP and AI agents — one API, one wallet, one dashboard.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CHANNELS.map((c, i) => (
            <Reveal key={c.title} delay={(i % 3) * 90} className="h-full">
              <Panel c={c} n={i + 1} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm">
          <span className="text-muted-foreground">Not sure where to start?</span>
          <a href="/products/" className="inline-flex items-center gap-1 font-semibold text-primary hover:underline">
            Explore the full platform <ArrowUpRight className="h-4 w-4" />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
