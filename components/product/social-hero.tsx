import { Bot, Check, Clock, Instagram, Layers, UserRound, X } from "lucide-react"

// Hero graphic for /channels/social: the same Instagram message, with and without SMSLocal. Two lanes sit one above the other.
// "Without a shared inbox": a customer asks whether the classic tee comes in M, a bar fills while nobody is online, and the
// chat ends with "No reply. The customer moves on." "With SMSLocal": the same question gets an answer from the AI agent within seconds,
// the order is placed, and a teammate then sees the whole chat and follows up; the customer's Instagram and Messenger chats are one
// record. Plain HTML + CSS, so it reflows on phones. Silent, looping.

const LOOP = 18

const IG = "linear-gradient(135deg, #feda75, #fa7e1e 28%, #d62976 62%, #962fbf)"

const win = (name: string, a: number, b = 94) =>
  `@keyframes ${name} { 0%, ${a}% { opacity: 0; transform: translateY(8px) scale(.96) } ${a + 3.5}%, ${b}% { opacity: 1; transform: translateY(0) scale(1) } ${b + 4}%, 100% { opacity: 0; transform: translateY(0) scale(1) } }\n.${name} { opacity: 0; animation: ${name} ${LOOP}s cubic-bezier(.3,1.3,.4,1) infinite }`

const CSS = `
${win("so-a1", 3)}
${win("so-a2", 9)}
${win("so-a3", 36)}
${win("so-b1", 44)}
${win("so-b2", 52)}
${win("so-b3", 62)}
${win("so-b4", 72)}
${win("so-b5", 82)}
@keyframes so-bar { 0%, 11% { transform: scaleX(0) } 34%, 100% { transform: scaleX(1) } }
.so-bar { transform-origin: 0 50%; animation: so-bar ${LOOP}s linear infinite }
@keyframes so-tick { to { transform: rotate(360deg) } }
.so-tick { animation: so-tick 6s steps(12) infinite }
@keyframes so-rip { 0%, 63% { transform: scale(1); opacity: 0 } 65% { opacity: .5 } 74%, 100% { transform: scale(2.2); opacity: 0 } }
.so-rip { opacity: 0; animation: so-rip ${LOOP}s ease-out infinite }
@keyframes so-bot { 0%, 51% { box-shadow: 0 0 0 0 rgba(99,102,241,0); transform: scale(1) } 54% { transform: scale(1.18); box-shadow: 0 0 0 6px rgba(99,102,241,.25) } 62%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(99,102,241,0) } }
.so-bot { animation: so-bot ${LOOP}s ease-out infinite }
@keyframes so-ty { 0%, 47% { opacity: 0 } 49%, 52% { opacity: 1 } 53%, 100% { opacity: 0 } }
.so-ty { opacity: 0; animation: so-ty ${LOOP}s linear infinite }
@keyframes so-dot { 0%, 100% { transform: translateY(0); opacity: .4 } 50% { transform: translateY(-2px); opacity: 1 } }
.so-d { animation: so-dot .9s ease-in-out infinite }
@keyframes so-dim { 0%, 40% { opacity: 1 } 46%, 94% { opacity: .55 } 98%, 100% { opacity: 1 } }
.so-dim { animation: so-dim ${LOOP}s ease-in-out infinite }
@media (prefers-reduced-motion: reduce) {
  [class*="so-a"], [class*="so-b"], .so-bar, .so-dim, .so-bot, .so-tick { animation: none; opacity: 1; transform: none }
  .so-rip, .so-ty { animation: none; opacity: 0 }
  .so-d { animation: none }
}
`

const CARD = { boxShadow: "0 26px 38px -26px rgba(15,42,71,.45), 0 0 0 1px rgba(15,42,71,.08)" }

function Ask({ k }: { k: string }) {
  return (
    <div className={`${k} min-w-0`}>
      <div className="flex items-center gap-2">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white" style={{ background: IG }}><Instagram className="h-3.5 w-3.5" /></span>
        <span className="text-[11.5px] font-semibold text-[#0f2a47]">@riya.styles</span>
      </div>
      <p className="mt-2 w-fit rounded-2xl rounded-tl-md bg-[#f1f5f9] px-3 py-2 text-[13px] leading-snug text-[#0f2a47]">Is the classic tee in M?</p>
    </div>
  )
}

function Lane({ tone, title, children, className = "" }: { tone: "bad" | "good"; title: string; children: React.ReactNode; className?: string }) {
  const good = tone === "good"
  return (
    <div className={`${className} rounded-2xl bg-white p-4 sm:p-5`} style={good ? { boxShadow: "0 30px 44px -26px rgba(14,159,110,.55), 0 0 0 2px rgba(14,159,110,.4)" } : CARD}>
      <p className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] ${good ? "bg-[#e3f5ec] text-[#0b7a55]" : "bg-[#eef1f5] text-[#0f2a47]/60"}`}>{title}</p>
      {children}
    </div>
  )
}

export function SocialHero() {
  const label = "The same Instagram message with and without SMSLocal. Without a shared inbox, a customer asks whether the classic tee comes in size M, nobody is online to reply, and there is no reply, so the customer moves on. With SMSLocal, the AI agent answers straight away that size M is in stock, the order is placed, and a teammate then sees the full chat and follows up. The customer's Instagram and Messenger chats sit in one record"
  return (
    <div className="relative mx-auto w-full max-w-[560px]">
      <div role="img" aria-label={label} className="space-y-4">
        {/* WITHOUT */}
        <Lane tone="bad" title="Without a shared inbox" className="so-dim">
          <div className="mt-3 grid items-center gap-3 sm:grid-cols-[1.1fr_1fr_1fr]">
            <Ask k="so-a1" />
            <div className="so-a2 min-w-0">
              <p className="flex items-center gap-1.5 text-[11px] font-semibold text-[#0f2a47]/70"><Clock className="so-tick h-3.5 w-3.5" />Nobody online to reply</p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#e6ebf1]"><i className="so-bar block h-full w-full rounded-full bg-[#94a3b8]" /></div>
            </div>
            <div className="so-a3 flex items-center gap-2 rounded-xl bg-[#fdecec] px-3 py-2.5">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e5484d] text-white"><X className="h-3.5 w-3.5" /></span>
              <span className="text-[12px] font-semibold leading-tight text-[#9b2c2f]">No reply. The customer moves on.</span>
            </div>
          </div>
        </Lane>

        {/* WITH SMSLOCAL */}
        <Lane tone="good" title="With SMSLocal">
          <div className="mt-3 grid items-start gap-3 sm:grid-cols-[1.1fr_1.25fr_0.9fr]">
            <Ask k="so-b1" />
            <div className="relative min-w-0">
              <span className="so-ty absolute left-0 top-0 flex w-fit gap-1 rounded-2xl bg-[#eef0ff] px-3 py-2.5">{[0, 0.15, 0.3].map((d) => <i key={d} className="so-d h-1.5 w-1.5 rounded-full bg-[#6366f1]" style={{ animationDelay: `${d}s` }} />)}</span>
              <div className="so-b2">
                <p className="flex items-center gap-1.5 text-[11.5px] font-semibold text-[#4f46e5]"><span className="so-bot relative flex h-6 w-6 items-center justify-center rounded-full bg-[#6366f1] text-white"><Bot className="h-3.5 w-3.5" /></span>SMSLocal AI</p>
                <p className="mt-2 w-fit rounded-2xl rounded-tl-md bg-[#eef0ff] px-3 py-2 text-[13px] leading-snug text-[#0f2a47]">Yes, M is in stock. Want me to hold one?</p>
              </div>
            </div>
            <div className="so-b3 flex items-center gap-2 rounded-xl bg-[#e3f5ec] px-3 py-2.5">
              <span className="relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0e9f6e] text-white"><i className="so-rip absolute inset-0 rounded-full bg-[#0e9f6e]" /><Check className="relative h-3.5 w-3.5" /></span>
              <span className="text-[12px] font-semibold leading-tight text-[#0b7a55]">Order placed</span>
            </div>
          </div>
          <div className="mt-4 grid gap-2.5 border-t border-[#eef2f6] pt-3.5 sm:grid-cols-2">
            <p className="so-b4 flex items-center gap-2 text-[11.5px] leading-snug text-[#0f2a47]"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0e9f6e] text-white"><UserRound className="h-3.5 w-3.5" /></span><span><span className="font-semibold">Priya</span> sees the full chat and follows up</span></p>
            <p className="so-b5 flex items-center gap-2 text-[11.5px] leading-snug text-[#0f2a47]"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#2f78bd] text-white"><Layers className="h-3.5 w-3.5" /></span><span><span className="font-semibold">Riya K.</span> on Instagram and Messenger is one record</span></p>
          </div>
        </Lane>
      </div>
      <style>{CSS}</style>
    </div>
  )
}
