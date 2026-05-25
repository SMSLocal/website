import { ArrowUpRight, Check, MessageSquareText, Send, Star, Zap } from "lucide-react"

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
            "radial-gradient(ellipse 80% 60% at 50% -10%, color-mix(in oklch, var(--primary) 14%, transparent), transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-40 h-[460px] w-[460px] rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at center, color-mix(in oklch, var(--primary) 22%, transparent), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-24 h-[420px] w-[420px] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at center, color-mix(in oklch, var(--accent) 35%, transparent), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="bg-grid-light absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      />

      <div className="relative mx-auto max-w-5xl px-4 pb-16 pt-20 text-center sm:px-6 lg:pb-24 lg:pt-28">
        {/* Eyebrow pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-[12.5px] font-medium text-primary backdrop-blur-sm">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
          </span>
          DLT-ready in a day · Free ₹60 credit · No credit card
        </div>

        {/* Headline */}
        <h1 className="mx-auto mt-6 max-w-3xl text-balance text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[58px]">
          India&apos;s{" "}
          <span className="bg-gradient-to-r from-primary via-[oklch(0.66_0.14_178)] to-accent bg-clip-text text-transparent">
            SMS, WhatsApp &amp; AI
          </span>{" "}
          messaging platform
          <Send className="ml-2 inline-block h-8 w-8 -rotate-12 text-primary sm:h-9 sm:w-9" />
        </h1>

        {/* Subhead */}
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
          Send DLT-compliant bulk SMS, launch AI WhatsApp agents that reply in 8 Indian
          languages, and fire OTPs — all from one dashboard, one API, one wallet.
        </p>

        {/* Feature checks */}
        <ul className="mx-auto mt-7 flex max-w-3xl flex-wrap items-center justify-center gap-x-6 gap-y-2.5 text-sm font-medium text-foreground/80">
          {FEATURE_CHECKS.map((item) => (
            <li key={item} className="inline-flex items-center gap-1.5">
              <Check className="h-4 w-4 text-primary" />
              {item}
            </li>
          ))}
          <li className="inline-flex items-center gap-1.5">
            <Star className="h-4 w-4 fill-accent text-accent" />
            Trusted since 2019
          </li>
        </ul>

        {/* CTAs */}
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
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

        {/* Floating accent cards */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-4 top-44 hidden xl:block"
        >
          <div className="flex items-center gap-3 rounded-2xl border border-border bg-card/90 px-4 py-3 shadow-xl shadow-foreground/5 backdrop-blur-sm">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/12 text-primary">
              <Zap className="h-5 w-5" />
            </span>
            <div className="text-left">
              <div className="text-lg font-bold leading-none text-foreground">98%</div>
              <div className="mt-1 text-[11px] font-medium text-muted-foreground">
                delivered in &lt;1 second
              </div>
            </div>
          </div>
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute right-4 top-56 hidden max-w-[230px] xl:block"
        >
          <div className="rounded-2xl border border-border bg-card/90 p-4 text-left shadow-xl shadow-foreground/5 backdrop-blur-sm">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-xs font-bold text-white">
                AS
              </span>
              <div className="text-[13px] font-semibold text-foreground">Aarav S.</div>
            </div>
            <p className="mt-2 text-[12.5px] leading-snug text-muted-foreground">
              <MessageSquareText className="mr-1 inline h-3.5 w-3.5 text-primary" />
              DLT setup done in a day — and the WhatsApp AI just works. 🚀
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
