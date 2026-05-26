import { ArrowUpRight, Bot, CheckCheck, KeyRound, Layers, MessageSquareText, Radio } from "lucide-react"
import { Reveal } from "./reveal"

export function ChannelsShowcase() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-background py-20 lg:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[12px] font-semibold uppercase tracking-wider text-primary">
            One platform, every channel
          </span>
          <h2 className="mt-5 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[44px] lg:leading-[1.1]">
            Every channel your customers use —{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">one dashboard</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            SMS, WhatsApp, RCS, OTP and AI agents — one API, one wallet. Hover any tile to see it.
          </p>
        </Reveal>

        {/* Bento grid */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Featured — WhatsApp AI */}
          <Reveal delay={0} className="sm:col-span-2">
            <a href="/products/ai-agents" className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 transition duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5">
              <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 blur-2xl transition-opacity duration-300 group-hover:opacity-100 opacity-60" />
              <div className="relative flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-white"><Bot className="h-5 w-5" /></span>
                <div>
                  <h3 className="flex items-center gap-1.5 text-lg font-semibold text-foreground">
                    AI WhatsApp Agents
                    <ArrowUpRight className="h-4 w-4 text-primary opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                  </h3>
                  <p className="text-[13px] text-muted-foreground">Auto-reply in 8 Indian languages, 24/7.</p>
                </div>
              </div>
              {/* Mini chat */}
              <div className="relative mt-5 space-y-2 rounded-xl border border-border bg-[oklch(0.97_0.01_150)] p-3">
                <div className="max-w-[75%] rounded-2xl rounded-bl-sm bg-card px-3 py-1.5 text-[12px] text-foreground shadow-sm">Has my order shipped?</div>
                <div className="ml-auto max-w-[80%] rounded-2xl rounded-br-sm bg-primary px-3 py-1.5 text-[12px] text-primary-foreground shadow-sm transition-transform duration-300 group-hover:-translate-y-0.5">
                  ஆம்! இன்று மாலை வந்துவிடும் 🛵
                  <span className="ml-1.5 text-[9px] text-primary-foreground/70">AI · 0.8s</span>
                </div>
              </div>
            </a>
          </Reveal>

          {/* Bulk SMS */}
          <Reveal delay={80}>
            <ChannelCard href="/products/bulk-sms" icon={MessageSquareText} title="Bulk SMS" desc="DLT-compliant, on direct-operator routes.">
              <div className="mt-4">
                <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
                    <div className="h-full w-[98%] rounded-full bg-gradient-to-r from-primary to-accent" />
                  </div>
                  <span className="font-semibold text-primary">98%</span>
                </div>
                <div className="mt-1.5 flex items-center gap-1 text-[11px] font-medium text-muted-foreground"><CheckCheck className="h-3.5 w-3.5 text-primary" /> delivered in &lt;1s</div>
              </div>
            </ChannelCard>
          </Reveal>

          {/* OTP */}
          <Reveal delay={160}>
            <ChannelCard href="/products/otp-sms" icon={KeyRound} title="OTP & Verification" desc="Priority-routed, auto failover.">
              <div className="mt-4 flex items-center gap-1">
                {"482913".split("").map((d, i) => (
                  <span key={i} className="flex h-7 w-5 items-center justify-center rounded bg-primary/10 text-[13px] font-bold text-primary">{d}</span>
                ))}
                <span className="ml-auto text-[11px] font-semibold text-primary">0.3s</span>
              </div>
            </ChannelCard>
          </Reveal>

          {/* RCS */}
          <Reveal delay={80}>
            <ChannelCard href="/products/rcs" icon={Radio} title="RCS Business Messaging" desc="Branded, verified — with SMS fallback.">
              <div className="mt-4 flex flex-wrap gap-1.5">
                {["Branded", "Verified ✓", "SMS fallback"].map((t) => (
                  <span key={t} className="rounded-full bg-secondary px-2 py-0.5 text-[10.5px] font-medium text-muted-foreground">{t}</span>
                ))}
              </div>
            </ChannelCard>
          </Reveal>

          {/* Cascade */}
          <Reveal delay={160} className="sm:col-span-2 lg:col-span-1">
            <ChannelCard href="/products" icon={Layers} title="Cascade failover" desc="Cheapest channel first, automatic fallback.">
              <div className="mt-4 flex items-center gap-1.5 text-[11px] font-medium">
                <span className="rounded-md bg-secondary px-2 py-1 text-muted-foreground">RCS</span>
                <span className="text-muted-foreground">→</span>
                <span className="rounded-md bg-secondary px-2 py-1 text-muted-foreground">WA</span>
                <span className="text-muted-foreground">→</span>
                <span className="rounded-md bg-primary px-2 py-1 text-primary-foreground">SMS ✓</span>
              </div>
            </ChannelCard>
          </Reveal>
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

function ChannelCard({
  href,
  icon: Icon,
  title,
  desc,
  children,
}: {
  href: string
  icon: React.ComponentType<{ className?: string }>
  title: string
  desc: string
  children: React.ReactNode
}) {
  return (
    <a href={href} className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-5 transition duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5">
      <div className="flex items-center justify-between">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary/15"><Icon className="h-5 w-5" /></span>
        <ArrowUpRight className="h-4 w-4 text-primary opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
      </div>
      <h3 className="mt-4 text-[15px] font-semibold text-foreground">{title}</h3>
      <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{desc}</p>
      <div className="mt-auto">{children}</div>
    </a>
  )
}
