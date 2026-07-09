import { Bot, CheckCheck, Languages, UserRound } from "lucide-react"

type Turn =
  | { role: "customer"; name: string; text: string; time: string; lang: string }
  | { role: "ai"; text: string; time: string; source?: string; lang: string }
  | { role: "human"; name: string; text: string; time: string }

const TURNS: Turn[] = [
  {
    role: "customer",
    name: "Priya (Mumbai)",
    text: "Order कब आएगा? #SL-48219",
    time: "10:42",
    lang: "Hindi",
  },
  {
    role: "ai",
    text: "Namaste Priya! Aapka order #SL-48219 kal sham 5 baje tak pahunch jaayega. Tracking: smsl.in/t/48219",
    time: "10:42",
    source: "Shiprocket · live lookup",
    lang: "Hindi",
  },
  {
    role: "customer",
    name: "Ravi (Chennai)",
    text: "Return policy என்ன? 15 நாட்கள் இருக்கா?",
    time: "10:44",
    lang: "Tamil",
  },
  {
    role: "ai",
    text: "வணக்கம் Ravi. ஆம், purchase-க்கு பிறகு 15 நாட்கள் return window உண்டு. Original packaging-ல் இருக்க வேண்டும்.",
    time: "10:44",
    source: "Policy doc v3.2",
    lang: "Tamil",
  },
  {
    role: "customer",
    name: "Anita (Bengaluru)",
    text: "I want to raise a complaint about a damaged product. This is urgent.",
    time: "10:47",
    lang: "English",
  },
  {
    role: "human",
    name: "Meera (Support)",
    text: "Hi Anita, I&apos;m Meera from SMSLocal. I have the full chat already — let me fix this for you right now.",
    time: "10:48",
  },
]

export function AiAgentsVisual() {
  return (
    <div className="relative isolate">
      <div
        aria-hidden
        className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-primary/20 via-emerald-500/5 to-transparent blur-2xl"
      />

      <div className="relative rounded-[2rem] border border-white/10 bg-[oklch(0.14_0.03_230)] p-3.5 shadow-2xl shadow-emerald-500/10 sm:p-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-300">
              <Bot className="h-3.5 w-3.5" />
            </span>
            <div>
              <p className="text-[13px] font-semibold text-white">SMSLocal AI Agent</p>
              <p className="text-[11px] text-white/50">Online · 8 Indian languages</p>
            </div>
          </div>
          <div className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 ring-4 ring-emerald-400/15 animate-pulse" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-300">Live</span>
          </div>
        </div>

        {/* Stream */}
        <ul className="mt-2.5 space-y-1.5">
          {TURNS.map((turn, i) => {
            if (turn.role === "customer") {
              return (
                <li
                  key={i}
                  className="flex items-start gap-2"
                  style={{ animation: `agentTurnIn 0.5s ease-out ${i * 0.08}s backwards` }}
                >
                  <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10 text-white/70">
                    <UserRound className="h-2.5 w-2.5" />
                  </span>
                  <div className="min-w-0 flex-1 rounded-2xl rounded-tl-md border border-white/5 bg-white/[0.04] px-2.5 py-1.5">
                    <div className="flex items-center justify-between gap-3 text-[10.5px]">
                      <span className="truncate font-semibold text-white/90">{turn.name}</span>
                      <span className="flex items-center gap-1 text-white/40">
                        <Languages className="h-2.5 w-2.5" />
                        {turn.lang} · {turn.time}
                      </span>
                    </div>
                    <p className="mt-0.5 text-[12px] leading-snug text-white/85">{turn.text}</p>
                  </div>
                </li>
              )
            }
            if (turn.role === "ai") {
              return (
                <li
                  key={i}
                  className="flex items-start justify-end gap-2"
                  style={{ animation: `agentTurnIn 0.5s ease-out ${i * 0.08}s backwards` }}
                >
                  <div className="min-w-0 max-w-[88%] rounded-2xl rounded-tr-md border border-primary/30 bg-gradient-to-br from-primary/25 to-primary/10 px-2.5 py-1.5 backdrop-blur-sm">
                    <div className="flex items-center justify-between gap-3 text-[10.5px]">
                      <span className="inline-flex items-center gap-1 font-semibold text-primary">
                        <Bot className="h-2.5 w-2.5" />
                        AI reply
                      </span>
                      <span className="text-white/50">{turn.time}</span>
                    </div>
                    <p className="mt-0.5 text-[12px] leading-snug text-white">{turn.text}</p>
                    {turn.source ? (
                      <p className="mt-1 inline-flex items-center gap-1 rounded-md bg-white/5 px-1.5 py-0.5 text-[10px] text-white/60">
                        <span className="h-1 w-1 rounded-full bg-emerald-400" />
                        Source: {turn.source}
                      </p>
                    ) : null}
                  </div>
                  <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                    <Bot className="h-2.5 w-2.5" />
                  </span>
                </li>
              )
            }
            return (
              <li
                key={i}
                className="flex items-start justify-end gap-2"
                style={{ animation: `agentTurnIn 0.5s ease-out ${i * 0.08}s backwards` }}
              >
                <div className="min-w-0 max-w-[88%] rounded-2xl rounded-tr-md border border-amber-400/30 bg-amber-400/10 px-2.5 py-1.5">
                  <div className="flex items-center justify-between gap-3 text-[10.5px]">
                    <span className="inline-flex items-center gap-1 font-semibold text-amber-300">
                      <UserRound className="h-2.5 w-2.5" />
                      {turn.name} · human
                    </span>
                    <span className="inline-flex items-center gap-1 text-white/50">
                      <CheckCheck className="h-2.5 w-2.5" />
                      {turn.time}
                    </span>
                  </div>
                  <p className="mt-0.5 text-[12px] leading-snug text-white">{turn.text}</p>
                  <p className="mt-1 text-[10px] text-white/55">
                    Handed off with full transcript · 00:06 response
                  </p>
                </div>
                <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-400/20 text-amber-300">
                  <UserRound className="h-2.5 w-2.5" />
                </span>
              </li>
            )
          })}
        </ul>

        {/* Footer stats */}
        <div className="mt-2.5 grid grid-cols-3 gap-2 border-t border-white/5 pt-2.5 text-center">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/50">Auto-resolved</p>
            <p className="mt-0.5 text-[15px] font-semibold text-white">78%</p>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/50">Avg reply</p>
            <p className="mt-0.5 text-[15px] font-semibold text-white">&lt;2s</p>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/50">Languages</p>
            <p className="mt-0.5 text-[15px] font-semibold text-white">8</p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes agentTurnIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
