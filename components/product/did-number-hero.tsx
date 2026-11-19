import { ArrowLeftRight, Hash, MapPin, PhoneCall, ShieldCheck, MessageSquare, Headphones } from "lucide-react"
import type { LucideIcon } from "lucide-react"

// Hero graphic for /numbers/did: a plain number list. Four numbers (a city number, a toll-free line, a short code and a ported
// number) sit in a column; each is picked in turn and a panel underneath says what SMSLocal does with that kind of number
// (registers it, routes the calls, carries the SMS). One loop, CSS only, server component. No clock times, no prices.

const LOOP = 16

type Row = { Icon: LucideIcon; num: string; kind: string; title: string; body: string; chips: { Icon: LucideIcon; t: string }[] }

const ROWS: Row[] = [
  {
    Icon: MapPin, num: "+91 22 4xxx xx10", kind: "City number",
    title: "Look local in every city",
    body: "Customers see a Mumbai, Delhi or Bengaluru number and pick up. We provision it and send your SMS from the same line.",
    chips: [{ Icon: PhoneCall, t: "Outbound calls" }, { Icon: MessageSquare, t: "SMS" }],
  },
  {
    Icon: PhoneCall, num: "1800 xxx xxxx", kind: "Toll-free number",
    title: "One support line for the country",
    body: "Callers dial free. Calls ring in your support inbox, or a Voice AI agent answers first.",
    chips: [{ Icon: Headphones, t: "Support inbox" }, { Icon: ShieldCheck, t: "Spam filter" }],
  },
  {
    Icon: Hash, num: "5xxxx", kind: "Short code",
    title: "Built for high-volume messaging",
    body: "Our team handles DLT sender ID registration, so your broadcasts leave from an approved header.",
    chips: [{ Icon: ShieldCheck, t: "DLT registered" }, { Icon: MessageSquare, t: "Broadcasts" }],
  },
  {
    Icon: ArrowLeftRight, num: "Your current number", kind: "Ported number",
    title: "Keep the number customers know",
    body: "Move your existing business number to SMSLocal without a gap in calls. Nobody has to learn a new one.",
    chips: [{ Icon: PhoneCall, t: "No missed calls" }, { Icon: MessageSquare, t: "SMS enabled" }],
  },
]

const stops = (i: number): [number, number][] => {
  const s = i * 25
  const e = s + 25
  if (i === 0) return [[0, 1], [e - 2, 1], [e + 1, 0], [97, 0], [100, 1]]
  if (i === 3) return [[0, 0], [s - 2, 0], [s + 1, 1], [98, 1], [100, 0]]
  return [[0, 0], [s - 2, 0], [s + 1, 1], [e - 2, 1], [e + 1, 0], [100, 0]]
}

const CSS = ROWS.map((_, i) => {
  const fr = stops(i).map(([p, o]) => `${p}% { opacity: ${o} }`).join(" ")
  return `@keyframes dn-${i} { ${fr} }\n.dn-${i} { opacity: ${i === 0 ? 1 : 0}; animation: dn-${i} ${LOOP}s ease-in-out infinite }`
}).join("\n") + `
@media (prefers-reduced-motion: reduce) {
  .dn-0, .dn-1, .dn-2, .dn-3 { animation: none }
  .dn-1, .dn-2, .dn-3 { opacity: 0 }
  .dn-0 { opacity: 1 }
}
`

export function DidNumberHero() {
  const label = "A list of four kinds of business number: a city number, a toll-free line, a short code and a ported number. Each is picked in turn, and a panel explains what SMSLocal does for it: provisions a local number, routes toll-free calls to your inbox or a Voice AI agent, registers the DLT sender ID for a short code, and ports your existing number without missed calls. All of them carry voice and SMS"
  return (
    <div className="relative mx-auto w-full max-w-[560px]">
      <div role="img" aria-label={label}>
        <p className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0b7a55]">Your numbers on SMSLocal</p>
        <ul className="divide-y divide-[#0f2a47]/10 border-y border-[#0f2a47]/10">
          {ROWS.map((r, i) => (
            <li key={r.kind} className="relative flex items-center gap-4 px-3 py-3.5">
              <i aria-hidden className={`dn-${i} absolute inset-0 bg-[#e9f7f0]`} />
              <i aria-hidden className={`dn-${i} absolute inset-y-0 left-0 w-[3px] bg-[#0e9f6e]`} />
              <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0f2a47] text-white"><r.Icon className="h-[17px] w-[17px]" /></span>
              <span className="relative min-w-0 flex-1">
                <span className="block font-mono text-[15px] font-semibold tracking-tight text-[#0f2a47]">{r.num}</span>
                <span className="block text-[12px] text-[#0f2a47]/60">{r.kind}</span>
              </span>
              <span className="relative hidden shrink-0 items-center gap-1.5 text-[11px] font-semibold text-[#0b7a55] sm:flex"><PhoneCall className="h-3.5 w-3.5" /><MessageSquare className="h-3.5 w-3.5" />Voice + SMS</span>
            </li>
          ))}
        </ul>

        {/* what SMSLocal does for the picked number: four panels share one grid cell */}
        <div className="mt-6 grid" style={{ minHeight: 150 }}>
          {ROWS.map((r, i) => (
            <div key={r.kind} className={`dn-${i} px-1`} style={{ gridArea: "1 / 1" }}>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0f2a47]/55">What SMSLocal does</p>
              <p className="mt-2 text-[20px] font-semibold leading-tight tracking-tight text-[#0f2a47]">{r.title}</p>
              <p className="mt-2 text-[14px] leading-relaxed text-[#0f2a47]/70">{r.body}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {r.chips.map((c) => <span key={c.t} className="inline-flex items-center gap-1.5 rounded-full border border-[#0e9f6e]/50 bg-white px-3 py-1 text-[12px] font-semibold text-[#0b7a55]"><c.Icon className="h-3.5 w-3.5" />{c.t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{CSS}</style>
    </div>
  )
}
