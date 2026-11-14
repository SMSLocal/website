import { ArrowUpRight, CalendarClock, Check, Download, Megaphone, PhoneCall, Sparkles, UserRound } from "lucide-react"

// Reporting section for /products/voice: a dashboard built from a daily call chart, a rep leaderboard with progress
// rings, and three KPI tiles with sparklines. Teal and the amber accent only.

const DAYS = [
  { d: "Mon", v: 96 },
  { d: "Tue", v: 104 },
  { d: "Wed", v: 99 },
  { d: "Thu", v: 131 },
  { d: "Fri", v: 118 },
  { d: "Sat", v: 92 },
  { d: "Sun", v: 72 },
]
const DAY_MAX = Math.max(...DAYS.map((x) => x.v))

const REPS = [
  { name: "Sarah M.", calls: 214, talk: "3:51", queue: "Sales", tone: "primary" as const },
  { name: "James R.", calls: 187, talk: "3:22", queue: "Support", tone: "neutral" as const },
  { name: "Priya K.", calls: 163, talk: "4:05", queue: "Sales", tone: "primary" as const },
  { name: "Chris L.", calls: 148, talk: "2:58", queue: "Billing", tone: "accent" as const },
]
const REP_MAX = Math.max(...REPS.map((r) => r.calls))

const CHECKS = ["By rep", "By queue", "By campaign", "Scheduled CSV"]

const COVER = [
  { icon: UserRound, title: "Call volume by rep" },
  { icon: PhoneCall, title: "Queue and response metrics" },
  { icon: Megaphone, title: "Campaign call reports" },
  { icon: CalendarClock, title: "Scheduled CSV exports" },
]

const TONE: Record<string, string> = {
  primary: "bg-primary/15 text-primary",
  neutral: "bg-white/10 text-white/75",
  accent: "bg-accent/20 text-accent",
}

const CIRC = 2 * Math.PI * 15

function Spark({ d, stroke }: { d: string; stroke: string }) {
  return (
    <svg viewBox="0 0 80 24" className="h-6 w-20" fill="none" aria-hidden>
      <path d={d} stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Kpi({ label, value, spark, accent = false }: { label: string; value: string; spark: string; accent?: boolean }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[.04] px-4 py-3.5">
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/45">{label}</p>
      <div className="mt-1.5 flex items-end justify-between gap-2">
        <p className={`font-mono text-[22px] font-bold leading-none ${accent ? "text-accent" : "text-primary"}`}>{value}</p>
        <Spark d={spark} stroke={accent ? "var(--accent)" : "var(--primary)"} />
      </div>
    </div>
  )
}

export function VoiceReporting() {
  return (
    <section aria-labelledby="voice-reporting-title" className="relative overflow-hidden bg-[oklch(0.15_0.04_245)] py-14 text-white sm:py-20">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[320px] w-[720px] -translate-x-1/2 rounded-full bg-primary/15 blur-[130px]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* copy */}
        <div className="mx-auto max-w-5xl text-center">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-3 py-1 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-primary">
            <Sparkles className="h-3.5 w-3.5" />Reporting
          </span>
          <h2 id="voice-reporting-title" className="mx-auto mt-4 max-w-3xl text-balance text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
            Call reporting and analytics your team will actually read
          </h2>
          <p className="mx-auto mt-5 max-w-5xl text-pretty text-[15px] leading-relaxed text-white/65 sm:text-base">
            Track call volume by rep, queue and campaign, with talk time, first-response time and abandonment rate built
            in. Scheduled CSV reports land in every inbox automatically, so your whole team sees the same numbers.
          </p>
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
            {CHECKS.map((c) => (
              <li key={c} className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[.05] py-1.5 pl-1.5 pr-3.5 text-[13px] font-medium text-white/90">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground"><Check className="h-3 w-3" strokeWidth={3} /></span>
                {c}
              </li>
            ))}
          </ul>
        </div>

        {/* dashboard */}
        <div role="group" aria-label="Sample call report dashboard" className="mt-12 grid gap-4 lg:grid-cols-[1.45fr_1fr]">
          {/* weekly volume */}
          <div className="rounded-3xl border border-white/10 bg-white/[.035] p-5 shadow-2xl backdrop-blur sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-[10.5px] font-semibold uppercase tracking-[0.15em] text-white/45">This week · Call report</p>
                <p className="mt-1.5 flex items-baseline gap-2.5">
                  <span className="text-[34px] font-bold leading-none tracking-tight">712</span>
                  <span className="text-[15px] font-medium text-white/60">calls</span>
                  <span className="inline-flex items-center gap-0.5 rounded-full bg-primary/15 px-2 py-0.5 text-[12px] font-semibold text-primary"><ArrowUpRight className="h-3.5 w-3.5" />14%</span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-full border border-white/12 bg-white/[.05] px-3 py-1.5 text-[11.5px] font-medium text-white/75">May 1 to 7</span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[.05] px-3 py-1.5 text-[11.5px] font-medium text-white/75"><Download className="h-3.5 w-3.5" />Export CSV</span>
              </div>
            </div>

            <div className="relative mt-7">
              <div aria-hidden className="absolute inset-x-0 top-0 flex h-[176px] flex-col justify-between">
                {[0, 1, 2, 3].map((i) => <span key={i} className="border-t border-dashed border-white/10" />)}
              </div>
              <div className="relative flex h-[176px] items-end gap-2.5 sm:gap-4" role="img" aria-label="Calls per day this week, peaking on Thursday">
                {DAYS.map((x) => {
                  const peak = x.v === DAY_MAX
                  return (
                    <div key={x.d} className="group flex h-full flex-1 flex-col items-center justify-end">
                      <span className={`mb-1.5 text-[11.5px] font-semibold ${peak ? "text-accent" : "text-white/70"}`}>{x.v}</span>
                      <div
                        className={`w-full rounded-t-xl transition-transform duration-300 group-hover:-translate-y-1 ${peak ? "bg-gradient-to-t from-accent/50 to-accent shadow-[0_0_28px_-4px] shadow-accent/50" : "bg-gradient-to-t from-primary/25 to-primary"}`}
                        style={{ height: `${(x.v / DAY_MAX) * 80}%` }}
                      />
                    </div>
                  )
                })}
              </div>
              <div className="mt-2 flex gap-2.5 sm:gap-4">
                {DAYS.map((x) => <span key={x.d} className="flex-1 text-center text-[11px] font-medium text-white/45">{x.d}</span>)}
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <Kpi label="Avg. talk time" value="3:42" spark="M2 18 L14 14 L26 16 L38 9 L50 12 L62 6 L78 8" />
              <Kpi label="First-response" value="4.1s" spark="M2 8 L14 12 L26 9 L38 15 L50 13 L62 18 L78 16" />
              <Kpi label="Abandonment" value="2.3%" accent spark="M2 6 L14 10 L26 8 L38 14 L50 12 L62 17 L78 19" />
            </div>
          </div>

          {/* leaderboard */}
          <div className="rounded-3xl border border-white/10 bg-white/[.035] p-5 shadow-2xl backdrop-blur sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[15px] font-semibold">Top reps</p>
              <div className="inline-flex rounded-full bg-white/[.06] p-1 text-[11.5px] font-semibold">
                {["Rep", "Queue", "Campaign"].map((t, i) => (
                  <span key={t} className={`rounded-full px-3 py-1 ${i === 0 ? "bg-primary text-primary-foreground shadow-md shadow-primary/30" : "text-white/55"}`}>{t}</span>
                ))}
              </div>
            </div>

            <ol className="mt-5 space-y-2.5">
              {REPS.map((r, i) => (
                <li key={r.name} className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[.04] px-3.5 py-3">
                  <span className={`w-4 text-center text-[13px] font-bold ${i === 0 ? "text-accent" : "text-white/40"}`}>{i + 1}</span>
                  <span className="relative flex h-10 w-10 shrink-0 items-center justify-center">
                    <svg viewBox="0 0 40 40" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden>
                      <circle cx="20" cy="20" r="15" fill="none" stroke="rgba(255,255,255,.1)" strokeWidth="3.5" />
                      <circle cx="20" cy="20" r="15" fill="none" stroke={i === 0 ? "var(--accent)" : "var(--primary)"} strokeWidth="3.5" strokeLinecap="round" strokeDasharray={`${(r.calls / REP_MAX) * CIRC} ${CIRC}`} />
                    </svg>
                    <span className="text-[12px] font-bold">{r.name[0]}</span>
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[13.5px] font-semibold leading-tight">{r.name}</span>
                    <span className={`mt-1 inline-block rounded-md px-1.5 py-0.5 text-[10px] font-semibold ${TONE[r.tone]}`}>{r.queue}</span>
                  </span>
                  <span className="text-right leading-tight">
                    <span className="block font-mono text-[15px] font-bold">{r.calls}</span>
                    <span className="block font-mono text-[11px] text-white/50">{r.talk} talk</span>
                  </span>
                </li>
              ))}
            </ol>

            <p className="mt-4 flex items-center gap-2 rounded-xl border border-dashed border-white/15 px-3.5 py-2.5 text-[12px] text-white/60">
              <Download className="h-3.5 w-3.5 text-primary" />Scheduled CSVs land in every inbox
            </p>
          </div>
        </div>

        {/* what the reports cover */}
        <div className="mt-14">
          <h3 className="text-center text-[13px] font-semibold uppercase tracking-[0.16em] text-white/50">What you can report on</h3>
          <ul className="mt-6 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
            {COVER.map((c) => (
              <li key={c.title} className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[.07] to-white/[.02] px-5 py-5 transition duration-300 hover:-translate-y-1 hover:border-primary/40">
                <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-b from-primary/70 to-primary text-primary-foreground shadow-[0_10px_22px_-8px] shadow-primary/60 ring-1 ring-white/20">
                  <c.icon className="h-5 w-5" />
                </span>
                <h4 className="relative text-[16px] font-semibold leading-snug tracking-tight">{c.title}</h4>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
