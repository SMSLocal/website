import { ArrowRight, Bot, Check, Hash, MapPin, MessageSquare, Phone, PhoneCall, PhoneForwarded, Router, ScanSearch, ShieldCheck, Sparkles } from "lucide-react"

// Hero graphic for /numbers/did, built from the page's own words: "DID and virtual numbers, managed in-platform".
// A deck of glass number cards; the front card slides between the three number types (Local, Toll-free, Short code) while
// the platform ticks through DLT registration, sender-ID approval, number lookup and fraud / spam protection. The number is
// then routed with travelling beams to where it belongs: Voice (IVR and broadcast), a Voice AI agent, SMS and broadcasting,
// or your own PBX over SIP. A strip underneath shows porting an existing number without downtime.
// Hand-built HTML + SVG + CSS, silent, 15-second loop (5 s per number). Stage is 580 x 470; on phones the pieces stack.

const SLOTS = 3
const S = 100 / SLOTS
const f = (n: number) => +n.toFixed(2)
const BASE = "0 16px 24px -12px rgba(15,26,46,.35), inset 0 1px 0 #fff"
const PEAK = `transform: scale(1.03); box-shadow: ${BASE}, 0 0 16px 2px color-mix(in oklch, var(--g) 44%, transparent), 0 0 36px 6px color-mix(in oklch, var(--g) 20%, transparent)`
const MID = `transform: scale(1.015); box-shadow: ${BASE}, 0 0 12px 0 color-mix(in oklch, var(--g) 24%, transparent), 0 0 26px 3px color-mix(in oklch, var(--g) 11%, transparent)`
const OFF = `transform: none; box-shadow: ${BASE}`
const T_OFF = "text-shadow: 0 0 0 transparent"
const T_PEAK = "color: var(--g); text-shadow: 0 0 12px color-mix(in oklch, var(--g) 60%, transparent), 0 0 3px color-mix(in oklch, var(--g) 30%, transparent)"
const T_MID = "color: color-mix(in oklch, var(--g) 72%, #14233a); text-shadow: 0 0 8px color-mix(in oklch, var(--g) 30%, transparent)"

// eases in to a peak at the start of a slot, fades to a faint halo by its end, then fades out
const ramp = (slots: number[], off: string, peak: string, mid: string) => {
  const pts: [number, string][] = []
  slots.forEach((i) => {
    const s = i * S
    const e = (i + 1) * S
    pts.push([Math.max(0, s - 0.5), off], [s + 1.5, peak], [e - 1, mid], [Math.min(100, e + 2.5), off])
  })
  const out: [number, string][] = []
  pts.sort((a, b) => a[0] - b[0]).forEach((p) => { if (!out.length || p[0] > out[out.length - 1][0]) out.push(p) })
  const parts: string[] = []
  if (out[0][0] > 0) parts.push(`0% { ${off} }`)
  out.forEach(([p, v]) => parts.push(`${f(p)}% { ${v} }`))
  if (out[out.length - 1][0] < 100) parts.push(`100% { ${off} }`)
  return parts.join(" ")
}

// the front card for slot i: slides up into place, holds, then slides away
const on = "opacity: 1; transform: none"
const away = "opacity: 0; transform: translateY(-14px) scale(.97)"
const before = "opacity: 0; transform: translateY(16px) scale(.97)"
const win = (i: number) => {
  const s = i * S
  const e = (i + 1) * S
  if (i === 0) return `0%, ${f(e - 2)}% { ${on} } ${f(e)}%, 99% { ${away} } 100% { ${on} }`
  if (i === SLOTS - 1) return `0%, ${f(s - 2)}% { ${before} } ${f(s)}%, 98% { ${on} } 100% { ${away} }`
  return `0%, ${f(s - 2)}% { ${before} } ${f(s)}%, ${f(e - 2)}% { ${on} } ${f(e)}%, 100% { ${away} }`
}

const ROUTES = [
  { Icon: PhoneCall, t: "Voice · IVR & broadcast", d: "Classic menus and campaigns", g: "#12b886", slots: [0] },
  { Icon: Bot, t: "Voice AI agent", d: "Answers with a real conversation", g: "#7b4dff", slots: [1] },
  { Icon: MessageSquare, t: "SMS & broadcasting", d: "Same number, same inventory", g: "#0a85ff", slots: [2] },
  { Icon: Router, t: "Your PBX · SIP trunk", d: "Keep the stack you already run", g: "#e08a00", slots: [0, 1] },
]
const TYPES = [
  { Icon: MapPin, t: "Local", chip: "Local DID", city: "Mumbai", num: "+91 22 6xxx xxxx", g: "#12b886" },
  { Icon: Phone, t: "Toll-free", chip: "Toll-free", city: "Support line", num: "1800 xxx xxxx", g: "#7b4dff" },
  { Icon: Hash, t: "Short code", chip: "Short code", city: "High-volume SMS", num: "5xxxx", g: "#0a85ff" },
]
const CHECKS = ["DLT registered", "Sender ID approved", "Number lookup passed", "Fraud & spam protection on"]

const CSS = `
${[0, 1, 2].map((i) => `@keyframes dn-p${i} { ${win(i)} }\n.dn-p${i} { opacity: 0; animation: dn-p${i} 15s cubic-bezier(.3,.7,.2,1) infinite }\n@keyframes dn-ty${i} { ${ramp([i], "background-color: transparent; color: #5b6b78", "background-color: color-mix(in oklch, var(--g) 16%, white); color: var(--g)", "background-color: color-mix(in oklch, var(--g) 10%, white); color: color-mix(in oklch, var(--g) 75%, #14233a)")} }\n.dn-ty${i} { animation: dn-ty${i} 15s ease-in-out infinite }`).join("\n")}
${ROUTES.map((r, j) => `@keyframes dn-r${j} { ${ramp(r.slots, OFF, PEAK, MID)} }\n.dn-r${j} { animation: dn-r${j} 15s ease-in-out infinite }\n@keyframes dn-rt${j} { ${ramp(r.slots, T_OFF, T_PEAK, T_MID)} }\n.dn-rt${j} { animation: dn-rt${j} 15s ease-in-out infinite }`).join("\n")}
${[0, 1, 2, 3].map((k) => `@keyframes dn-k${k} { 0%, ${6 + k * 14}% { opacity: 0; transform: translateX(-8px) } ${12 + k * 14}%, 90% { opacity: 1; transform: none } 96%, 100% { opacity: 0; transform: none } }\n.dn-k${k} { opacity: 0; animation: dn-k${k} 5s cubic-bezier(.2,.7,.2,1) infinite }`).join("\n")}
@keyframes dn-flow { to { stroke-dashoffset: -20 } }
@keyframes dn-float { 0%, 100% { translate: 0 -3px } 50% { translate: 0 4px } }
@keyframes dn-blink { 0%, 100% { opacity: .35 } 50% { opacity: 1 } }
@keyframes dn-sheen { 0% { transform: translateX(-120%) } 55%, 100% { transform: translateX(260%) } }
.dn-flow { stroke-dasharray: 3 6; animation: dn-flow 1.5s linear infinite }
.dn-float { animation: dn-float 6s ease-in-out infinite }
.dn-blink { animation: dn-blink 1.4s ease-in-out infinite }
.dn-sheen { animation: dn-sheen 5s ease-in-out infinite }
@media (prefers-reduced-motion: reduce) {
  .dn-p0 { animation: none; opacity: 1; transform: none } .dn-p1, .dn-p2 { animation: none; opacity: 0 }
  [class*="dn-k"] { animation: none; opacity: 1; transform: none }
  [class*="dn-ty"], [class*="dn-r"], .dn-flow, .dn-float, .dn-blink, .dn-sheen { animation: none }
  .dn-dot { display: none }
}
`

const NAVY = "#14233a"
const GLASS = "bg-white/90 ring-1 ring-white backdrop-blur-sm shadow-[0_26px_40px_-20px_rgba(15,26,46,.4),inset_0_1px_0_#fff]"

/* the deck: two cards peeking out behind, and the front card with the live number */
function NumberDeck() {
  return (
    <div className="relative">
      <div className="absolute inset-x-0 top-0 h-full -rotate-[5deg] rounded-[22px] bg-white/70 ring-1 ring-white shadow-[0_20px_30px_-18px_rgba(15,26,46,.35)]" style={{ transformOrigin: "20% 80%" }} />
      <div className="absolute inset-x-0 top-0 h-full rotate-[4deg] rounded-[22px] bg-white/80 ring-1 ring-white shadow-[0_20px_30px_-18px_rgba(15,26,46,.35)]" style={{ transformOrigin: "80% 80%" }} />
      <div className={`relative overflow-hidden rounded-[22px] ${GLASS}`}>
        <div className="relative flex items-center gap-2 overflow-hidden px-4 py-3 text-white" style={{ background: "linear-gradient(120deg, color-mix(in oklch, var(--primary) 85%, #062a22), var(--primary) 60%, color-mix(in oklch, var(--primary) 55%, #3d8bff))" }}>
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/20"><Phone className="h-3.5 w-3.5" /></span>
          <span className="text-[12.5px] font-semibold">Number inventory</span>
          <span className="ml-auto inline-flex items-center gap-1 text-[10px] font-semibold text-white/90"><i className="dn-blink h-1.5 w-1.5 rounded-full bg-[#7ff0a8]" />Live</span>
          <span className="dn-sheen pointer-events-none absolute inset-y-0 -left-1/3 w-1/4 skew-x-[-20deg] bg-white/25" />
        </div>
        <div className="relative" style={{ height: 106 }}>
          {TYPES.map((t, i) => (
            <div key={t.t} className={`dn-p${i} absolute inset-x-4 top-3.5`}>
              <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10.5px] font-semibold" style={{ background: `color-mix(in oklch, ${t.g} 13%, white)`, color: t.g }}><t.Icon className="h-3 w-3" />{t.chip}</span>
              <p className="mt-2 whitespace-nowrap font-mono text-[21px] font-semibold tracking-tight text-[#14233a]">{t.num}</p>
              <p className="mt-0.5 text-[10.5px] text-muted-foreground">{t.city} · voice and SMS on one number</p>
            </div>
          ))}
        </div>
        <ul className="space-y-1.5 px-4 pb-4">
          {CHECKS.map((t, k) => (
            <li key={t} className={`dn-k${k} flex items-center gap-2 rounded-lg bg-[#f4f7f9] px-2.5 py-1.5`}>
              <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-primary text-primary-foreground">{k === 3 ? <ShieldCheck className="h-2.5 w-2.5" strokeWidth={3.2} /> : k === 2 ? <ScanSearch className="h-2.5 w-2.5" strokeWidth={3.2} /> : <Check className="h-2.5 w-2.5" strokeWidth={3.2} />}</span>
              <span className="text-[11px] font-semibold text-[#14233a]">{t}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/* the number-type tabs; the active one follows the number on the card */
function Tabs() {
  return (
    <div className={`flex items-center gap-1 rounded-full p-1 ${GLASS}`}>
      {TYPES.map((t, i) => (
        <span key={t.t} className={`dn-ty${i} flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-2 py-1.5 text-[11px] font-semibold`} style={{ ["--g" as string]: t.g }}><i className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: t.g }} />{t.t}</span>
      ))}
    </div>
  )
}

function RoutePill({ j }: { j: number }) {
  const r = ROUTES[j]
  return (
    <span className={`dn-r${j} flex items-center gap-2.5 rounded-2xl bg-white px-3 py-2.5 ring-1 ring-white`} style={{ ["--g" as string]: r.g, boxShadow: BASE }}>
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white shadow-[inset_0_1px_0_rgba(255,255,255,.45)]" style={{ background: `linear-gradient(145deg, color-mix(in oklch, ${r.g} 70%, white), ${r.g})` }}><r.Icon className="h-[18px] w-[18px]" /></span>
      <span className="leading-tight"><span className={`dn-rt${j} block text-[11.5px] font-semibold text-[#14233a]`} style={{ ["--g" as string]: r.g }}>{r.t}</span><span className="mt-0.5 block text-[9.5px] text-muted-foreground">{r.d}</span></span>
    </span>
  )
}

function PortStrip() {
  return (
    <div className={`relative flex items-center gap-3 overflow-hidden rounded-2xl px-4 py-3 ${GLASS}`}>
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white" style={{ background: `linear-gradient(145deg, #2c4a73, ${NAVY})` }}><PhoneForwarded className="h-[18px] w-[18px]" /></span>
      <span className="leading-tight"><span className="block text-[12.5px] font-semibold text-[#14233a]">Port your existing number</span><span className="block text-[10.5px] text-muted-foreground">Move it over without losing calls</span></span>
      <span className="ml-auto flex items-center gap-2 text-[10.5px] font-semibold"><span className="rounded-lg bg-secondary px-2 py-1 text-muted-foreground">Your number</span><ArrowRight className="h-3.5 w-3.5 text-primary" /><span className="inline-flex items-center gap-1 rounded-lg bg-primary/10 px-2 py-1 text-primary"><Sparkles className="h-3 w-3" />SMSLocal</span></span>
    </div>
  )
}

export function DidNumberScene() {
  const startY = [104, 144, 184, 224] // where each beam leaves the card
  const endY = [80, 150, 220, 290] // route tile centres
  return (
    <div className="relative mx-auto w-full max-w-[580px] lg:h-full lg:min-h-[470px]">
      {/* ───────────── larger screens: the stage ───────────── */}
      <div className="relative hidden h-[470px] sm:block">
        <div className="pointer-events-none absolute left-[290px] top-[190px] h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_oklch,var(--primary)_12%,white),transparent_66%)]" />

        {/* beams from the card to each route, with a light travelling along each */}
        <svg className="pointer-events-none absolute left-0 top-0 h-[470px] w-[580px]" viewBox="0 0 580 470" fill="none" aria-hidden>
          {startY.map((y, j) => <path key={j} id={`dn-b${j}`} className="dn-flow" d={`M296 ${y} C336 ${y} 332 ${endY[j]} 372 ${endY[j]}`} stroke="var(--primary)" strokeOpacity=".55" strokeWidth="1.6" strokeLinecap="round" />)}
          {startY.map((y, j) => <circle key={"n" + j} cx="296" cy={y} r="3.5" fill="#fff" stroke="var(--primary)" strokeWidth="1.8" />)}
          {startY.map((y, j) => (
            <circle key={"d" + j} className="dn-dot" r="3.2" fill="var(--primary)">
              <animateMotion dur="2.6s" begin={`${j * 0.5}s`} repeatCount="indefinite" path={`M296 ${y} C336 ${y} 332 ${endY[j]} 372 ${endY[j]}`} />
              <animate attributeName="opacity" values="0;1;1;0" dur="2.6s" begin={`${j * 0.5}s`} repeatCount="indefinite" />
            </circle>
          ))}
        </svg>

        {/* the number-type tabs */}
        <div className="absolute" style={{ left: 40, top: 6, width: 250 }}><Tabs /></div>

        {/* the number deck */}
        <div className="absolute" style={{ left: 40, top: 62, width: 250, transform: "perspective(1200px) rotateY(-6deg)", transformOrigin: "50% 50%" }}><NumberDeck /></div>

        {/* the routes */}
        {endY.map((y, j) => <div key={j} className="dn-float absolute" style={{ left: 372, top: y - 28, width: 204, animationDelay: `${-j * 1.1}s` }}><RoutePill j={j} /></div>)}

        {/* porting */}
        <div className="absolute" style={{ left: 8, top: 384, width: 564 }}><PortStrip /></div>
      </div>

      {/* ───────────── phones: the same pieces stacked ───────────── */}
      <div className="flex flex-col gap-4 sm:hidden">
        <Tabs />
        <NumberDeck />
        <div className="grid grid-cols-1 gap-2">{ROUTES.map((_, j) => <RoutePill key={j} j={j} />)}</div>
        <PortStrip />
      </div>
      <style>{CSS}</style>
    </div>
  )
}
