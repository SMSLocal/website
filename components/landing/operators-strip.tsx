import { Reveal } from "./reveal"

/* Direct-operator / partner strip shown right under the hero.
   NOTE: these are styled text wordmarks as placeholders. Drop real logo
   SVGs/PNGs into /public and swap the <span> for <img> to use exact marks. */

type Mark = { label: string; sub?: string; className: string }

const OPERATORS: Mark[] = [
  { label: "BSNL", className: "font-extrabold tracking-tight" },
  { label: "vodafone", className: "font-semibold lowercase tracking-tight" },
  { label: "Jio", sub: "DIGITAL LIFE", className: "font-bold" },
  { label: "airtel", className: "font-bold lowercase tracking-tight" },
  { label: "infobip", className: "font-semibold lowercase tracking-tight" },
  { label: "VIDEOCON", className: "font-bold tracking-wide" },
]

export function OperatorsStrip() {
  return (
    <section className="relative bg-background py-14 sm:py-16">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <h2
            className="text-center text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-[40px]"
            style={{ color: "oklch(0.42 0.13 168)" }}
          >
            Connected with Direct Operator
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-7 sm:gap-x-14 lg:gap-x-16">
            {OPERATORS.map((op) => (
              <span
                key={op.label}
                className={`inline-flex items-baseline gap-1.5 text-2xl text-muted-foreground/70 transition hover:text-foreground sm:text-[26px] ${op.className}`}
              >
                {op.label}
                {op.sub ? <span className="text-[10px] font-semibold tracking-wide">{op.sub}</span> : null}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
