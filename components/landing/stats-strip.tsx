const STATS = [
  { value: "Sub-1s", label: "typical SMS delivery latency across major Indian operators" },
  { value: "99.99%", label: "platform uptime, measured monthly" },
  { value: "5", label: "channels on one wallet — RCS, SMS, WhatsApp, OTP, AI" },
  { value: "24/7", label: "priority OTP routing to DND and non-DND numbers" },
]

export function StatsStrip() {
  return (
    <section className="relative overflow-hidden bg-[oklch(0.14_0.02_230)] py-20 text-white sm:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(70% 50% at 50% 100%, color-mix(in oklch, var(--primary) 30%, transparent), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="bg-grid-ink absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-white/70 backdrop-blur-md">
            What we&apos;ve built
          </span>
          <h2 className="mt-4 text-pretty text-3xl font-semibold tracking-tight sm:text-4xl">
            Infrastructure tuned for Indian messaging.
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-white/65">
            Delivery rates, carrier failover, and DLT rules are solved at the platform layer so
            your team can ship.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md transition hover:border-primary/40 hover:bg-white/[0.06]"
            >
              <div className="bg-gradient-to-r from-white to-primary bg-clip-text text-4xl font-semibold tracking-tight text-transparent sm:text-5xl">
                {stat.value}
              </div>
              <p className="mt-3 text-sm leading-snug text-white/65">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
