import { ArrowRight, Calendar, Check } from "lucide-react"
import { Reveal } from "./reveal"

export function FinalCta() {
  return (
    <section className="bg-muted/40 py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-[oklch(0.17_0.03_230)] via-[oklch(0.19_0.03_220)] to-[oklch(0.22_0.04_200)] p-10 text-white shadow-2xl sm:p-14">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-32 -left-24 h-[380px] w-[380px] rounded-full opacity-60 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, color-mix(in oklch, var(--primary) 45%, transparent), transparent 70%)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-32 -bottom-24 h-[380px] w-[380px] rounded-full opacity-40 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, color-mix(in oklch, var(--accent) 55%, transparent), transparent 70%)",
            }}
          />
          <div aria-hidden className="bg-grid-ink absolute inset-0 opacity-50 mask-radial-fade" />

          <Reveal className="relative max-w-2xl">
            <span className="inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-white/80 backdrop-blur-md">
              Ready when you are
            </span>
            <h2 className="mt-4 text-pretty text-3xl font-bold tracking-tight sm:text-5xl">
              Your first campaign is{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">on us</span>.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-white/70 sm:text-base">
              ₹60 free credit. Full DLT compliance. Two-minute signup. No card.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="/signup"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-xl shadow-primary/25 transition hover:brightness-110"
              >
                <span className="relative z-10">Start Free — ₹60 Credit</span>
                <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                <span aria-hidden className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </a>
              <a
                href="/company/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/10"
              >
                <Calendar className="h-4 w-4" />
                Book a 15-min Demo
              </a>
            </div>

            <ul className="mt-8 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
              {[
                "API keys issued instantly on signup",
                "Credits valid 24 months at every paid tier",
                "Cancel anytime — credits stay yours",
              ].map((line) => (
                <li
                  key={line}
                  className="flex items-start gap-2 text-[13px] text-white/80"
                >
                  <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/25 text-primary">
                    <Check className="h-2.5 w-2.5" strokeWidth={3} />
                  </span>
                  {line}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
