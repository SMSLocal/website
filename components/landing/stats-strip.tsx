import { Clock, Gauge, Layers, ShieldCheck } from "lucide-react"
import { Reveal } from "./reveal"

const STATS = [
  { value: "Sub-1s", label: "typical SMS delivery latency across major Indian operators", Icon: Gauge },
  { value: "99.99%", label: "platform uptime, measured monthly", Icon: ShieldCheck },
  { value: "5", label: "channels on one wallet — RCS, SMS, WhatsApp, OTP, AI", Icon: Layers },
  { value: "24/7", label: "priority OTP routing to DND and non-DND numbers", Icon: Clock },
]

export function StatsStrip() {
  return (
    <section className="relative overflow-hidden bg-[oklch(0.14_0.02_230)] py-8 text-white sm:py-10">
      {/* base vertical depth tint */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.16 0.025 232) 0%, oklch(0.13 0.02 230) 55%, oklch(0.15 0.03 222) 100%)",
        }}
      />
      {/* aurora glows: top accent + bottom brand wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-45"
        style={{
          background:
            "radial-gradient(60% 45% at 50% 100%, color-mix(in oklch, var(--primary) 32%, transparent), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(50% 40% at 18% 8%, color-mix(in oklch, var(--accent) 22%, transparent), transparent 70%), radial-gradient(45% 40% at 85% 12%, color-mix(in oklch, var(--primary) 24%, transparent), transparent 70%)",
        }}
      />
      {/* drifting grid */}
      <div
        aria-hidden
        className="bg-grid-ink animate-grid-pan absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_78%)]"
      />
      {/* floating brand orbs */}
      <div
        aria-hidden
        className="animate-float-slow pointer-events-none absolute left-[6%] top-[28%] h-44 w-44 rounded-full bg-primary/15 blur-3xl"
      />
      <div
        aria-hidden
        className="animate-float-slower pointer-events-none absolute bottom-[12%] right-[8%] h-52 w-52 rounded-full bg-emerald-400/10 blur-3xl"
      />
      {/* top & bottom edge accent lines */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-white/70 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_var(--primary)]" />
            What we&apos;ve built
          </span>
          <h2 className="mt-3 text-pretty text-2xl font-semibold tracking-tight sm:text-3xl">
            Infrastructure tuned for Indian messaging.
          </h2>
          <p className="mt-2.5 text-[14px] leading-relaxed text-white/65">
            Delivery rates, carrier failover, and DLT rules are solved at the platform layer so
            your team can ship.
          </p>
        </Reveal>

        <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 90} className="h-full">
              <div className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-3.5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.7)]">
                {/* top accent line on hover */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
                {/* corner glow on hover */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-primary/25 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                />
                {/* watermark icon */}
                <stat.Icon
                  aria-hidden
                  className="pointer-events-none absolute -bottom-3 -right-2 h-20 w-20 text-white/[0.04] transition-transform duration-500 ease-out group-hover:scale-110"
                />

                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 text-primary ring-1 ring-primary/25 transition-colors group-hover:bg-primary/25">
                  <stat.Icon className="h-4 w-4" />
                </span>

                <div className="mt-2.5 bg-gradient-to-r from-white to-primary bg-clip-text text-2xl font-bold tracking-tight text-transparent sm:text-3xl">
                  {stat.value}
                </div>
                <p className="mt-1.5 text-[12.5px] leading-snug text-white/60">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
