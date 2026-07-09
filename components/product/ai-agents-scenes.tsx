import {
  ArrowRight,
  Bot,
  Check,
  CheckCheck,
  FileText,
  Search,
  Sparkles,
  UserRound,
} from "lucide-react"

/* Channel colours, matched to the real inbox. */
const CHANNELS = [
  { name: "WhatsApp", color: "#25D366", count: 12 },
  { name: "Email", color: "#3b82f6", count: 8 },
  { name: "Instagram", color: "#ec4899", count: 5 },
  { name: "Messenger", color: "#0ea5e9", count: 3 },
  { name: "Telegram", color: "#22d3ee", count: 2 },
  { name: "Line", color: "#22c55e", count: 1 },
  { name: "TikTok", color: "#f43f5e", count: 1 },
]

function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-white/10 bg-[oklch(0.15_0.02_240)] shadow-2xl ${className}`}
    >
      {children}
    </div>
  )
}

function Chrome({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-white/8 bg-white/[0.02] px-4 py-2.5">
      <span className="flex gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
      </span>
      <span className="ml-2 truncate text-[11px] font-medium text-white/45">{label}</span>
    </div>
  )
}

/* ── Scene 1 — answers grounded in approved sources ─────────────────────── */
export function SourceGroundingScene() {
  return (
    <Panel>
      <Chrome label="app.smslocal.com / inbox · grounding" />
      <div className="space-y-3 p-4">
        {/* customer */}
        <div className="flex items-start gap-2.5">
          <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-white/70">
            <UserRound className="h-3.5 w-3.5" />
          </span>
          <div className="rounded-2xl rounded-tl-md border border-white/5 bg-white/[0.04] px-3.5 py-2.5 text-[12.5px] leading-snug text-white/85">
            What&apos;s your return window for opened items?
          </div>
        </div>
        {/* AI reply */}
        <div className="flex items-start justify-end gap-2.5">
          <div className="max-w-[88%] rounded-2xl rounded-tr-md border border-emerald-400/25 bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 px-3.5 py-2.5">
            <div className="flex items-center gap-1 text-[10.5px] font-semibold text-emerald-300">
              <Bot className="h-2.5 w-2.5" /> Captain AI
            </div>
            <p className="mt-1 text-[12.5px] leading-snug text-white">
              Opened items can be returned within 15 days if the original packaging is intact.
            </p>
          </div>
          <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300">
            <Bot className="h-3.5 w-3.5" />
          </span>
        </div>
        {/* grounding footer */}
        <div className="rounded-lg border border-white/8 bg-white/[0.03] p-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/45">
              Traced to source
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10.5px] font-semibold text-emerald-300">
              <Check className="h-2.5 w-2.5" strokeWidth={3} /> 98% grounded
            </span>
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {["Return Policy v3.2", "FAQ · Returns", "Catalog"].map((s) => (
              <span
                key={s}
                className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10.5px] text-white/70"
              >
                <FileText className="h-2.5 w-2.5 text-emerald-300" /> {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Panel>
  )
}

/* ── Scene 2 — code-switching, native script ────────────────────────────── */
export function CodeSwitchScene() {
  return (
    <Panel>
      <Chrome label="app.smslocal.com / inbox · WhatsApp" />
      <div className="space-y-3 p-4">
        <div className="flex items-start gap-2.5">
          <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-white/70">
            <UserRound className="h-3.5 w-3.5" />
          </span>
          <div className="rounded-2xl rounded-tl-md border border-white/5 bg-white/[0.04] px-3.5 py-2.5">
            <p className="text-[12.5px] leading-snug text-white/85">Bhaiya order #4421 kitna time lagega?</p>
            <span className="mt-1 inline-block text-[10px] text-white/40">Hindi + English · Latin script</span>
          </div>
        </div>
        <div className="flex items-start justify-end gap-2.5">
          <div className="max-w-[88%] rounded-2xl rounded-tr-md border border-emerald-400/25 bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 px-3.5 py-2.5">
            <div className="flex items-center gap-1 text-[10.5px] font-semibold text-emerald-300">
              <Bot className="h-2.5 w-2.5" /> Captain AI
            </div>
            <p className="mt-1 text-[12.5px] leading-snug text-white">
              Aapka order #4421 kal sham tak pahunch jaayega — same script mein reply. 📦
            </p>
          </div>
          <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300">
            <Bot className="h-3.5 w-3.5" />
          </span>
        </div>
        <div className="flex items-center justify-center gap-2 rounded-lg border border-white/8 bg-white/[0.03] py-2 text-[10.5px] text-white/55">
          <Sparkles className="h-3 w-3 text-emerald-300" />
          No translation layer · replies in the script the customer used
        </div>
      </div>
    </Panel>
  )
}

/* ── Scene 3 — human handoff with full context ──────────────────────────── */
export function HandoffScene() {
  return (
    <Panel>
      <Chrome label="app.smslocal.com / inbox · handoff" />
      <div className="p-4">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-white">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-amber-400/20 text-amber-300">
              <UserRound className="h-3 w-3" />
            </span>
            Handed to Meera
          </span>
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-amber-300">
            <CheckCheck className="h-3 w-3" /> Escalated · 00:06
          </span>
        </div>

        <div className="mt-3 rounded-lg border border-white/8 bg-white/[0.03] p-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/45">Intent summary</p>
          <p className="mt-1 text-[12px] leading-snug text-white/85">
            Damaged item on order #4421 — customer wants a replacement. Eligible. Payment verified.
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {["Full transcript pinned", "Order #4421", "VIP"].map((t) => (
              <span key={t} className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-white/65">
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-3 rounded-lg border border-emerald-400/25 bg-emerald-500/10 p-3">
          <div className="flex items-center gap-1 text-[10.5px] font-semibold text-emerald-300">
            <Sparkles className="h-2.5 w-2.5" /> Suggested reply
          </div>
          <p className="mt-1 text-[12px] leading-snug text-white">
            &ldquo;Hi, I&apos;ve approved a free replacement for #4421 — it ships today. Anything else?&rdquo;
          </p>
          <button className="mt-2 inline-flex items-center gap-1.5 rounded-md bg-emerald-500 px-2.5 py-1 text-[11px] font-semibold text-[#06251a]">
            Send <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </div>
    </Panel>
  )
}

/* ── Wide scene — the multi-channel inbox (matches the reference) ────────── */
export function InboxScene() {
  return (
    <Panel className="w-full">
      <Chrome label="app.smslocal.com / inbox" />
      <div className="grid grid-cols-[120px_1fr] sm:grid-cols-[150px_1fr]">
        {/* Channel rail */}
        <div className="border-r border-white/8 bg-white/[0.015] p-3">
          <p className="px-1 text-[9.5px] font-semibold uppercase tracking-[0.16em] text-white/35">Channels</p>
          <ul className="mt-2 space-y-0.5">
            {CHANNELS.map((c, i) => (
              <li
                key={c.name}
                className={`flex items-center justify-between rounded-md px-2 py-1.5 ${i === 0 ? "bg-white/[0.06]" : ""}`}
              >
                <span className="flex items-center gap-1.5 text-[11.5px] text-white/75">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: c.color }} />
                  {c.name}
                </span>
                <span className="text-[10px] font-semibold text-white/40">{c.count}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Conversation list */}
        <div className="p-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-[12px] font-semibold text-white">All conversations</span>
            <span className="inline-flex items-center gap-1 text-[10px] text-white/45">
              <Search className="h-3 w-3" /> 142 open
            </span>
          </div>
          <ul className="mt-2 space-y-1.5">
            {[
              { who: "Jessica Chen", init: "JC", msg: "Is order #4421 shipped yet?", ch: "WhatsApp", color: "#25D366", t: "2m", n: 2 },
              { who: "Marcus Williams", init: "MW", msg: "About the subscription renewal…", ch: "Email", color: "#3b82f6", t: "5m", n: 1 },
              { who: "Ashley Rodriguez", init: "AR", msg: "DM'd you about the linen set…", ch: "Instagram", color: "#ec4899", t: "12m", n: 0 },
            ].map((r) => (
              <li key={r.who} className="flex items-start gap-2.5 rounded-lg border border-white/5 bg-white/[0.03] px-3 py-2">
                <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-[10px] font-semibold text-white/80">
                  {r.init}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-[12px] font-semibold text-white">{r.who}</span>
                    <span className="text-[10px] text-white/40">{r.t}</span>
                  </div>
                  <p className="mt-0.5 truncate text-[11.5px] text-white/55">{r.msg}</p>
                  <div className="mt-1.5 flex items-center justify-between">
                    <span
                      className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-wider"
                      style={{ color: r.color, backgroundColor: `${r.color}1f` }}
                    >
                      <span className="h-1 w-1 rounded-full" style={{ backgroundColor: r.color }} />
                      {r.ch}
                    </span>
                    {r.n > 0 ? (
                      <span className="inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-emerald-500 px-1 text-[9.5px] font-bold text-[#06251a]">
                        {r.n}
                      </span>
                    ) : null}
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* footer stats */}
          <div className="mt-3 grid grid-cols-3 gap-2 border-t border-white/8 pt-3 text-center">
            {[
              { v: "142", l: "Conversations" },
              { v: "2m", l: "Avg first reply" },
              { v: "89", l: "Resolved" },
            ].map((s) => (
              <div key={s.l}>
                <p className="text-[14px] font-semibold text-white">{s.v}</p>
                <p className="text-[9.5px] uppercase tracking-[0.1em] text-white/40">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Panel>
  )
}
