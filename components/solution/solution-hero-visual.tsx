import type { LucideIcon } from "lucide-react"
import { CheckCircle2, Radio } from "lucide-react"

/* ---------------------------------------------------------------------------
   Reusable solution hero visual.
   Each solution page supplies 4-5 "messages" that reflect the industry —
   an order confirmation, an OTP, a cart-recovery nudge, etc.
   Rendered as a stack of floating cards against a gradient backdrop.
--------------------------------------------------------------------------- */

export type SolutionMessage = {
  channel: "SMS" | "WhatsApp" | "OTP"
  sender: string
  time: string
  body: string
  status?: "delivered" | "read" | "sent"
}

const channelTheme: Record<SolutionMessage["channel"], { dot: string; label: string }> = {
  SMS: { dot: "bg-sky-400", label: "text-sky-200" },
  WhatsApp: { dot: "bg-emerald-400", label: "text-emerald-200" },
  OTP: { dot: "bg-amber-400", label: "text-amber-200" },
}

export function SolutionHeroVisual({
  tagLabel,
  tagIcon: TagIcon = Radio,
  messages,
  volumeLabel,
  volumeValue,
}: {
  tagLabel: string
  tagIcon?: LucideIcon
  messages: SolutionMessage[]
  volumeLabel: string
  volumeValue: string
}) {
  return (
    <div className="relative isolate">
      {/* backdrop glow */}
      <div
        aria-hidden
        className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-primary/15 via-emerald-500/5 to-transparent blur-2xl"
      />

      <div className="relative rounded-[2rem] border border-white/10 bg-[oklch(0.14_0.03_230)] p-5 shadow-2xl shadow-emerald-500/10 sm:p-7">
        {/* top bar */}
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-medium text-white/70">
            <TagIcon className="h-3.5 w-3.5 text-primary" aria-hidden />
            {tagLabel}
          </div>
          <div className="hidden items-center gap-1.5 sm:inline-flex">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 ring-4 ring-emerald-400/15 animate-pulse" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-300">Live feed</span>
          </div>
        </div>

        {/* volume widget */}
        <div className="mt-5 flex items-end justify-between border-b border-white/5 pb-5">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-white/50">{volumeLabel}</p>
            <p className="mt-1 font-[family-name:var(--font-serif,var(--font-sans))] text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              {volumeValue}
            </p>
          </div>
          <div className="flex items-end gap-1 pb-1">
            {[16, 22, 14, 28, 20, 34, 24, 40, 32].map((h, i) => (
              <span
                key={i}
                className="w-1.5 rounded-t bg-gradient-to-t from-primary/20 via-primary/60 to-primary"
                style={{ height: `${h}px`, opacity: 0.4 + i * 0.07 }}
              />
            ))}
          </div>
        </div>

        {/* message stream */}
        <ul className="mt-5 space-y-3">
          {messages.map((m, i) => {
            const theme = channelTheme[m.channel]
            return (
              <li
                key={m.sender + i}
                className="group flex gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-3.5 backdrop-blur-sm transition hover:border-primary/30 hover:bg-white/[0.06]"
                style={{ animation: `solutionMessageIn 0.6s ease-out ${i * 0.08}s backwards` }}
              >
                <span className={`mt-1 inline-flex h-2 w-2 flex-none rounded-full ${theme.dot}`} aria-hidden />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3 text-[11px]">
                    <span className="truncate font-semibold text-white">{m.sender}</span>
                    <span className="flex-none text-white/40">{m.time}</span>
                  </div>
                  <p className="mt-1 truncate text-[13px] leading-snug text-white/75">{m.body}</p>
                  <div className="mt-1.5 flex items-center gap-2 text-[10px] font-medium uppercase tracking-wider">
                    <span className={theme.label}>{m.channel}</span>
                    {m.status ? (
                      <span className="inline-flex items-center gap-1 text-emerald-300">
                        <CheckCircle2 className="h-3 w-3" aria-hidden />
                        {m.status}
                      </span>
                    ) : null}
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>

      <style>{`
        @keyframes solutionMessageIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
