import { ArrowRight, CheckCircle2, Clock, ShieldCheck, Zap } from "lucide-react"
import { HeroAnimation } from "./hero-animation"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[oklch(0.14_0.02_230)] text-white">
      {/* Ambient glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at center, color-mix(in oklch, var(--primary) 40%, transparent), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -bottom-40 h-[520px] w-[520px] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at center, color-mix(in oklch, var(--accent) 50%, transparent), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="bg-grid-ink absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,black_10%,transparent_90%)]"
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-14 lg:py-24">
        {/* Copy */}
        <div className="flex flex-col justify-center">
          {/* Eyebrow */}
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-medium text-white/80 backdrop-blur-md">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            Made in India · Direct carrier routes · Since 2019
          </div>

          {/* H1 */}
          <h1 className="mt-5 text-pretty text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-[56px]">
            India&apos;s Complete{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-primary via-[oklch(0.78_0.14_180)] to-accent bg-clip-text text-transparent">
                SMS, WhatsApp
              </span>
            </span>
            <br className="hidden sm:block" /> and AI Messaging Platform
          </h1>

          {/* Sub */}
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
            Send DLT-compliant bulk SMS, launch AI WhatsApp agents that reply in{" "}
            <span className="text-white">8 Indian languages</span>, and fire OTPs from the same
            dashboard.{" "}
            <span className="font-medium text-white">98% delivery in under one second.</span>
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="/signup"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-xl shadow-primary/25 transition hover:brightness-110"
            >
              <span className="relative z-10">Start Free — ₹60 Credit</span>
              <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              <span
                aria-hidden
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full"
              />
            </a>
            <a
              href="/pricing"
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/10"
            >
              See Pricing
            </a>
          </div>

          <p className="mt-3 text-[12.5px] text-white/55">
            No credit card required. 2-minute signup. DLT registration support included.
          </p>

          {/* Trust bar */}
          <div className="mt-10 grid grid-cols-2 gap-3 border-t border-white/10 pt-6 sm:grid-cols-4">
            <TrustItem icon={<ShieldCheck className="h-4 w-4" />} label="DLT-compliant & TRAI-approved" />
            <TrustItem icon={<Zap className="h-4 w-4" />} label="Direct operator connectivity" />
            <TrustItem icon={<CheckCircle2 className="h-4 w-4" />} label="Enterprise-grade SLA" />
            <TrustItem icon={<Clock className="h-4 w-4" />} label="Serving India since 2019" />
          </div>
        </div>

        {/* Animation */}
        <div className="flex items-center justify-center lg:justify-end">
          <HeroAnimation />
        </div>
      </div>
    </section>
  )
}

function TrustItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-start gap-2">
      <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary/15 text-primary">
        {icon}
      </span>
      <span className="text-[12.5px] leading-snug text-white/75">{label}</span>
    </div>
  )
}
