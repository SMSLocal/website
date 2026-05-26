import { ArrowUpRight, Check, Star } from "lucide-react"
import { HeroLiveDemo } from "./hero-livedemo"

const FEATURE_CHECKS = [
  "DLT-compliant",
  "Free ₹60 credit",
  "8 Indian languages",
  "98% delivery in <1s",
]

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* Soft tinted backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, color-mix(in oklch, var(--primary) 13%, transparent), transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-40 h-[460px] w-[460px] rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at center, color-mix(in oklch, var(--primary) 20%, transparent), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-24 h-[420px] w-[420px] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at center, color-mix(in oklch, var(--accent) 32%, transparent), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="bg-grid-light absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]"
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-10 lg:py-24">
        {/* Copy — on the left at lg */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-[12.5px] font-medium text-primary backdrop-blur-sm">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            DLT-ready in a day · Free ₹60 credit
          </div>

          <h1 className="mt-6 max-w-xl text-balance text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[52px]">
            India&apos;s{" "}
            <span className="bg-gradient-to-r from-primary via-[oklch(0.66_0.14_178)] to-accent bg-clip-text text-transparent">
              SMS, WhatsApp &amp; AI
            </span>{" "}
            messaging platform
          </h1>

          <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            Send DLT-compliant bulk SMS, launch AI WhatsApp agents that reply in 8 Indian
            languages, and fire OTPs — all from one dashboard, one API, one wallet.
          </p>

          <ul className="mt-6 flex max-w-xl flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm font-medium text-foreground/80 lg:justify-start">
            {FEATURE_CHECKS.map((item) => (
              <li key={item} className="inline-flex items-center gap-1.5">
                <Check className="h-4 w-4 text-primary" />
                {item}
              </li>
            ))}
            <li className="inline-flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-accent text-accent" />
              Since 2019
            </li>
          </ul>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <a
              href="/signup"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-primary to-[oklch(0.55_0.13_172)] px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:shadow-xl hover:shadow-primary/30"
            >
              <span className="relative z-10">Start Free — ₹60 Credit</span>
              <ArrowUpRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              <span
                aria-hidden
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
              />
            </a>
            <a
              href="/company/contact"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 text-sm font-semibold text-foreground shadow-sm transition hover:bg-secondary"
            >
              Book a Demo
            </a>
          </div>

          <p className="mt-4 text-[12.5px] text-muted-foreground">
            No credit card required · 2-minute signup · DLT registration support included.
          </p>
        </div>

        {/* Live demo console — on the right at lg */}
        <div>
          <HeroLiveDemo />
        </div>
      </div>
    </section>
  )
}
