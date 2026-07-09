import type { LucideIcon } from "lucide-react"
import Link from "next/link"
import { ArrowRight, CheckCircle2, Circle, MinusCircle, Scale, XCircle } from "lucide-react"

export type Verdict = "yes" | "no" | "partial"

export type CompareRow = {
  feature: string
  us: Verdict
  them: Verdict
  note?: string
}

export type PersonaCard = {
  title: string
  description: string
  bullets: string[]
}

type CompareHeroProps = {
  competitor: string
  tagline: string
  intro: string
  lastUpdated: string
}

export function CompareHero({ competitor, tagline, intro, lastUpdated }: CompareHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-foreground/5 bg-gradient-to-b from-[#061b17] via-[#051a15] to-[#031411] py-20 text-white sm:py-24">
      <div
        aria-hidden
        className="absolute inset-0 opacity-30 [background-image:linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]"
      />
      <div
        aria-hidden
        className="absolute -top-24 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-gradient-to-br from-primary/25 via-primary/8 to-transparent blur-3xl"
      />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        <nav className="mb-6 flex items-center justify-center gap-2 text-xs text-white/50" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-white/80">Home</Link>
          <span>/</span>
          <Link href="/compare/" className="hover:text-white/80">Compare</Link>
          <span>/</span>
          <span className="text-white/80">vs {competitor}</span>
        </nav>

        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-[11px] font-medium uppercase tracking-widest text-white/70">
          <Scale className="h-3 w-3 text-primary" />
          A fair comparison
        </div>
        <h1 className="mt-5 text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          SMSLocal vs{" "}
          <span className="bg-gradient-to-r from-primary via-primary to-[#25D366] bg-clip-text text-transparent">
            {competitor}
          </span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-pretty text-base text-white/75 sm:text-lg">{tagline}</p>
        <p className="mx-auto mt-6 max-w-3xl text-sm leading-relaxed text-white/65">{intro}</p>
        <p className="mt-6 text-[11px] font-medium uppercase tracking-widest text-white/40">
          Last updated: {lastUpdated}
        </p>
      </div>
    </section>
  )
}

function VerdictCell({ verdict, note, dark = false }: { verdict: Verdict; note?: string; dark?: boolean }) {
  if (verdict === "yes") {
    return (
      <div className="flex flex-col items-center gap-1.5">
        <CheckCircle2 className={`h-5 w-5 ${dark ? "text-primary" : "text-primary"}`} />
        {note && <span className="text-[11px] font-medium text-muted-foreground">{note}</span>}
      </div>
    )
  }
  if (verdict === "no") {
    return (
      <div className="flex flex-col items-center gap-1.5">
        <XCircle className="h-5 w-5 text-muted-foreground/40" />
        {note && <span className="text-[11px] font-medium text-muted-foreground">{note}</span>}
      </div>
    )
  }
  return (
    <div className="flex flex-col items-center gap-1.5">
      <MinusCircle className="h-5 w-5 text-amber-500" />
      <span className="text-[11px] font-medium text-amber-600">{note ?? "Partial"}</span>
    </div>
  )
}

type CompareTableProps = {
  competitor: string
  rows: CompareRow[]
}

export function CompareTableHonest({ competitor, rows }: CompareTableProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-foreground/10 bg-background shadow-sm">
      <div className="grid grid-cols-[1.6fr_1fr_1fr] items-center gap-4 border-b border-foreground/10 bg-muted/40 px-6 py-4 sm:grid-cols-[2fr_1fr_1fr]">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Feature</span>
        <span className="text-center text-sm font-bold text-foreground">SMSLocal</span>
        <span className="text-center text-sm font-bold text-muted-foreground">{competitor}</span>
      </div>
      <ul>
        {rows.map((row, i) => (
          <li
            key={row.feature}
            className={`grid grid-cols-[1.6fr_1fr_1fr] items-center gap-4 px-6 py-4 sm:grid-cols-[2fr_1fr_1fr] ${
              i !== rows.length - 1 ? "border-b border-foreground/5" : ""
            } ${i % 2 === 0 ? "bg-background" : "bg-muted/20"}`}
          >
            <div className="text-sm">
              <span className="font-medium text-foreground/90">{row.feature}</span>
              {row.note && (
                <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{row.note}</p>
              )}
            </div>
            <VerdictCell verdict={row.us} />
            <VerdictCell verdict={row.them} />
          </li>
        ))}
      </ul>
    </div>
  )
}

type WinsBlockProps = {
  competitor: string
  usWins: { title: string; description: string; icon: LucideIcon }[]
  themWins: { title: string; description: string; icon: LucideIcon }[]
}

export function WinsBlock({ competitor, usWins, themWins }: WinsBlockProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/[0.04] via-background to-background p-8">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold tracking-tight">Where SMSLocal wins</h3>
        </div>
        <ul className="mt-6 space-y-5">
          {usWins.map((w) => (
            <li key={w.title} className="flex items-start gap-3">
              <div className="flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-primary/10 text-primary">
                <w.icon className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-sm font-semibold">{w.title}</h4>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{w.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-3xl border border-foreground/10 bg-background p-8">
        <div className="flex items-center gap-2">
          <Circle className="h-5 w-5 text-muted-foreground" />
          <h3 className="text-lg font-semibold tracking-tight">Where {competitor} wins</h3>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Credibility matters. If we claimed we beat the competitor on everything, nobody would trust us.
        </p>
        <ul className="mt-6 space-y-5">
          {themWins.map((w) => (
            <li key={w.title} className="flex items-start gap-3">
              <div className="flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-muted text-muted-foreground">
                <w.icon className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-sm font-semibold">{w.title}</h4>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{w.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

type PersonaSplitProps = {
  competitor: string
  usPicks: PersonaCard[]
  themPicks: PersonaCard[]
}

export function PersonaSplit({ competitor, usPicks, themPicks }: PersonaSplitProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="rounded-3xl border border-foreground/10 bg-background p-8">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-primary">Pick SMSLocal if you&apos;re</p>
        <div className="mt-6 space-y-6">
          {usPicks.map((persona) => (
            <div key={persona.title} className="rounded-2xl border border-primary/15 bg-primary/[0.03] p-5">
              <h4 className="text-sm font-semibold">{persona.title}</h4>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{persona.description}</p>
              <ul className="mt-4 space-y-2">
                {persona.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-foreground/80">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-none text-primary" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-foreground/10 bg-background p-8">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          Pick {competitor} if you&apos;re
        </p>
        <div className="mt-6 space-y-6">
          {themPicks.map((persona) => (
            <div key={persona.title} className="rounded-2xl border border-foreground/10 bg-muted/30 p-5">
              <h4 className="text-sm font-semibold">{persona.title}</h4>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{persona.description}</p>
              <ul className="mt-4 space-y-2">
                {persona.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-foreground/80">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-none text-muted-foreground" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function CompareMethodology() {
  return (
    <div className="rounded-3xl border border-dashed border-foreground/15 bg-muted/20 p-6 text-sm leading-relaxed text-muted-foreground">
      <div className="flex items-center gap-2 font-semibold text-foreground">
        <Scale className="h-4 w-4 text-primary" />
        How we built this comparison
      </div>
      <p className="mt-3">
        Every feature row in this table cites a public source — the competitor&apos;s pricing page, official
        documentation, or publicly announced changelog as of the &quot;Last updated&quot; date above. If you think a row
        is out of date or inaccurate, email <a className="font-semibold text-primary hover:underline" href="mailto:hello@smslocal.in">hello@smslocal.in</a> and
        we&apos;ll verify and correct within one business day.
      </p>
    </div>
  )
}

type OtherComparesProps = { currentSlug: string }

const ALL_COMPARES = [
  { competitor: "MSG91", slug: "smslocal-vs-msg91" },
  { competitor: "WATI", slug: "smslocal-vs-wati" },
  { competitor: "Fast2SMS", slug: "smslocal-vs-fast2sms" },
  { competitor: "AiSensy", slug: "smslocal-vs-aisensy" },
  { competitor: "Interakt", slug: "smslocal-vs-interakt" },
  { competitor: "Gupshup", slug: "smslocal-vs-gupshup" },
  { competitor: "Textlocal", slug: "smslocal-vs-textlocal" },
  { competitor: "Twilio", slug: "smslocal-vs-twilio" },
]

export function OtherCompares({ currentSlug }: OtherComparesProps) {
  const others = ALL_COMPARES.filter((c) => c.slug !== currentSlug).slice(0, 4)
  return (
    <div>
      <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Compare SMSLocal to other platforms
      </p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {others.map((o) => (
          <Link
            key={o.slug}
            href={`/compare/${o.slug}`}
            className="group flex items-center justify-between rounded-xl border border-foreground/10 bg-background px-4 py-3 text-sm font-medium transition hover:border-primary/40"
          >
            <span>vs {o.competitor}</span>
            <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-primary" />
          </Link>
        ))}
      </div>
    </div>
  )
}
