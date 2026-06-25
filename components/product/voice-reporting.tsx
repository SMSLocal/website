import { ArrowUpRight, Check, Download } from "lucide-react"

const REPS = [
  { name: "Sarah M.", calls: 214, talk: "3:51", queue: "Sales", tone: "primary" as const },
  { name: "James R.", calls: 187, talk: "3:22", queue: "Support", tone: "sky" as const },
  { name: "Priya K.", calls: 163, talk: "4:05", queue: "Sales", tone: "primary" as const },
  { name: "Chris L.", calls: 148, talk: "2:58", queue: "Billing", tone: "amber" as const },
]

const MAX = Math.max(...REPS.map((r) => r.calls))

const CHECKS = ["By rep", "By queue", "By campaign", "Scheduled CSV"]

const QUEUE_TONE: Record<string, string> = {
  primary: "bg-primary/15 text-primary",
  sky: "bg-sky-400/15 text-sky-300",
  amber: "bg-amber-400/15 text-amber-300",
}

export function VoiceReporting() {
  return (
    <section className="bg-[oklch(0.14_0.02_170)] py-12 text-white sm:py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.35fr]">
        {/* Left: copy + checklist */}
        <div>
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">Reporting</span>
          <h2 className="mt-4 text-pretty text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
            Call reporting your team will actually read.
          </h2>
          <p className="mt-5 max-w-md text-pretty text-[15px] leading-relaxed text-white/65 sm:text-base">
            Call volume by rep, queue, and campaign — with talk time, first-response, and abandonment
            built in. Scheduled CSVs land in every inbox, automatically.
          </p>

          <div className="mt-7 grid max-w-sm grid-cols-2 gap-x-6 gap-y-3.5">
            {CHECKS.map((c) => (
              <div key={c} className="flex items-center gap-2.5 text-[14px] font-medium text-white/90">
                <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                {c}
              </div>
            ))}
          </div>
        </div>

        {/* Right: call report card */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-2xl backdrop-blur sm:p-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/45">
                This week · Call report
              </p>
              <p className="mt-1 flex items-baseline gap-2">
                <span className="text-[26px] font-bold tracking-tight">712 calls</span>
                <span className="inline-flex items-center gap-0.5 text-[12px] font-semibold text-primary">
                  <ArrowUpRight className="h-3.5 w-3.5" /> 14%
                </span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-[11px] font-medium text-white/70">
                May 1—7
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-[11px] font-medium text-white/70">
                <Download className="h-3.5 w-3.5" /> Export CSV
              </span>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-5 flex items-center gap-1.5">
            {["By Rep", "By Queue", "By Campaign"].map((t, i) => (
              <span
                key={t}
                className={`rounded-lg px-3 py-1.5 text-[12px] font-semibold ${
                  i === 0 ? "bg-primary/15 text-primary" : "text-white/50"
                }`}
              >
                {t}
              </span>
            ))}
          </div>

          {/* Table */}
          <div className="mt-4 overflow-hidden rounded-xl border border-white/10">
            <div className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-4 border-b border-white/10 bg-white/[0.02] px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/40">
              <span>Rep</span>
              <span className="text-right">Calls</span>
              <span className="text-right">Talk</span>
              <span className="text-right">Queue</span>
            </div>
            {REPS.map((r, i) => (
              <div
                key={r.name}
                className={`grid grid-cols-[1fr_auto_auto_auto] items-center gap-4 px-4 py-3 ${
                  i < REPS.length - 1 ? "border-b border-white/[0.06]" : ""
                }`}
              >
                <div className="min-w-0">
                  <p className="text-[13px] font-semibold text-white/90">{r.name}</p>
                  <div className="mt-1.5 h-1.5 w-full max-w-[180px] overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-[oklch(0.72_0.17_165)]"
                      style={{ width: `${(r.calls / MAX) * 100}%` }}
                    />
                  </div>
                </div>
                <span className="text-right font-mono text-[13px] font-semibold text-white">{r.calls}</span>
                <span className="text-right font-mono text-[12.5px] text-white/70">{r.talk}</span>
                <span className="flex justify-end">
                  <span className={`rounded-md px-2 py-0.5 text-[10.5px] font-semibold ${QUEUE_TONE[r.tone]}`}>
                    {r.queue}
                  </span>
                </span>
              </div>
            ))}
          </div>

          {/* Footer stats */}
          <div className="mt-4 grid grid-cols-3 gap-3">
            <Stat label="Avg. talk time" value="3:42" tone="text-primary" />
            <Stat label="First-response" value="4.1s" tone="text-primary" />
            <Stat label="Abandonment" value="2.3%" tone="text-amber-300" />
          </div>
        </div>
      </div>
    </section>
  )
}

function Stat({ label, value, tone }: { label: string; value: string; tone: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3">
      <p className="text-[9.5px] font-semibold uppercase tracking-[0.13em] text-white/40">{label}</p>
      <p className={`mt-1 font-mono text-[17px] font-bold ${tone}`}>{value}</p>
    </div>
  )
}
