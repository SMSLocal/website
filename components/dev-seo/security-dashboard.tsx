import {
  AlertTriangle,
  CheckCircle2,
  Gauge,
  Info,
  ShieldCheck,
  XCircle,
} from "lucide-react"
import type { CheckLevel, SecurityAudit } from "@/lib/security/audit"

function LevelBadge({ level }: { level: CheckLevel }) {
  if (level === "ok") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
        <CheckCircle2 className="h-3 w-3" />
        OK
      </span>
    )
  }
  if (level === "warning") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-300">
        <AlertTriangle className="h-3 w-3" />
        Warning
      </span>
    )
  }
  if (level === "error") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full border border-rose-500/30 bg-rose-500/10 px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-wider text-rose-700 dark:text-rose-300">
        <XCircle className="h-3 w-3" />
        Error
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-border bg-muted/40 px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-wider text-muted-foreground">
      <Info className="h-3 w-3" />
      Info
    </span>
  )
}

export function SecurityDashboard({ audit }: { audit: SecurityAudit }) {
  const { stats } = audit
  const total = audit.checks.length
  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-4">
        <StatCard
          icon={<ShieldCheck className="h-4 w-4" />}
          label="Checks run"
          value={total}
          tone="neutral"
        />
        <StatCard
          icon={<CheckCircle2 className="h-4 w-4" />}
          label="Passing"
          value={stats.ok}
          tone="emerald"
        />
        <StatCard
          icon={<AlertTriangle className="h-4 w-4" />}
          label="Warnings"
          value={stats.warning}
          tone="amber"
        />
        <StatCard
          icon={<XCircle className="h-4 w-4" />}
          label="Errors"
          value={stats.error}
          tone="rose"
        />
      </div>

      <div className="rounded-xl border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-5 py-3">
          <div>
            <h2 className="text-[15px] font-semibold tracking-tight text-foreground">
              All checks
            </h2>
            <p className="text-[12px] text-muted-foreground">
              Audited against <span className="font-mono">{audit.baseUrl}</span> at{" "}
              {new Date(audit.fetchedAt).toLocaleString("en-IN")}.
            </p>
          </div>
        </div>
        <ul className="divide-y divide-border">
          {audit.checks.map((c) => (
            <li key={c.id} className="flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <LevelBadge level={c.level} />
                  <h3 className="text-[14px] font-semibold tracking-tight text-foreground">
                    {c.label}
                  </h3>
                </div>
                <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
                  {c.detail}
                </p>
                {c.hint ? (
                  <p className="mt-1 text-[12.5px] leading-relaxed text-amber-700 dark:text-amber-300">
                    Fix: {c.hint}
                  </p>
                ) : null}
                {c.evidence ? (
                  <pre className="mt-2 overflow-x-auto rounded-md border border-border bg-muted/40 px-3 py-2 text-[12px] text-foreground">
                    <code>{c.evidence}</code>
                  </pre>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-5 py-3">
          <div className="flex items-center gap-2">
            <Gauge className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-[15px] font-semibold tracking-tight text-foreground">
              Rate limiters
            </h2>
          </div>
          <span
            className={
              audit.rateLimit.configured
                ? "inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-300"
                : "inline-flex items-center gap-1 rounded-full border border-rose-500/30 bg-rose-500/10 px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-wider text-rose-700 dark:text-rose-300"
            }
          >
            {audit.rateLimit.configured ? (
              <>
                <CheckCircle2 className="h-3 w-3" />
                Active
              </>
            ) : (
              <>
                <XCircle className="h-3 w-3" />
                Failing open
              </>
            )}
          </span>
        </div>
        <div className="px-5 py-3 text-[12.5px] text-muted-foreground">
          Sliding-window limits applied per client IP. Endpoints enforce their own tight bucket;{" "}
          <span className="font-mono">/api/*</span> has a general fallback via the edge proxy.
        </div>
        <ul className="divide-y divide-border">
          {audit.rateLimit.limiters.map((l) => (
            <li
              key={l.name}
              className="flex flex-col gap-3 px-5 py-3 sm:flex-row sm:items-start sm:justify-between"
            >
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-mono text-[13px] font-semibold text-foreground">
                    {l.name}
                  </h3>
                  <span className="inline-flex items-center gap-1 rounded-full border border-border bg-muted/40 px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {l.limit} / {l.window}
                  </span>
                </div>
                <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
                  {l.description}
                </p>
              </div>
              <code className="flex-none rounded-md border border-border bg-muted/40 px-2 py-1 text-[11.5px] text-foreground">
                {l.prefix}:&lt;ip&gt;
              </code>
            </li>
          ))}
        </ul>
      </div>

      <aside className="rounded-xl border border-dashed border-border bg-muted/30 px-5 py-4 text-[13px] leading-relaxed text-muted-foreground">
        <p className="font-semibold text-foreground">Launch checklist beyond this page</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>
            Verify <span className="font-mono">smslocal.in</span> in Google Search Console and Bing
            Webmaster, then submit <span className="font-mono">/sitemap.xml</span>.
          </li>
          <li>
            Put Cloudflare or Vercel Firewall in front of the origin and enable bot-management rules.
          </li>
          <li>
            Connect Sentry for error tracking and set up an uptime monitor (BetterStack, UptimeRobot).
          </li>
          <li>
            Publish SPF, DKIM, DMARC, and a CAA record at your DNS provider.
          </li>
        </ul>
      </aside>
    </div>
  )
}

function StatCard({
  icon,
  label,
  value,
  tone,
}: {
  icon: React.ReactNode
  label: string
  value: number
  tone: "neutral" | "emerald" | "amber" | "rose"
}) {
  const toneClasses =
    tone === "emerald"
      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
      : tone === "amber"
        ? "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300"
        : tone === "rose"
          ? "border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-300"
          : "border-border bg-card text-foreground"
  return (
    <div className={`rounded-xl border px-4 py-3 ${toneClasses}`}>
      <div className="flex items-center gap-2 text-[11.5px] font-semibold uppercase tracking-[0.12em]">
        {icon}
        {label}
      </div>
      <p className="mt-1 text-2xl font-semibold tabular-nums">{value}</p>
    </div>
  )
}
