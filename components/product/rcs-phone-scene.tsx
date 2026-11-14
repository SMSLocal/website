import { ArrowRight, BadgeCheck, Check, ChevronLeft, Gift, Image as ImageIcon, Layers, Mic, Plus, Send, ShieldCheck, Smartphone, Smile, MessageSquare, Zap } from "lucide-react"

// Hero graphic for /products/rcs, in the layout of the reference image: a tilted phone showing a verified business's
// rich card and a tapped reply, a column of feature tiles on the left joined to it by dashed lines, and a big "RCS"
// speech bubble on the right. Content is this page's own: rich cards, carousels, suggested replies, the verified sender
// badge, automatic SMS fallback on one wallet and one webhook, and the Diwali hamper card from the API example.
// Hand-built HTML + SVG + CSS, silent, 12-second loop. Stage is 580 x 470 on larger screens; on phones the pieces stack.

const seg = (name: string, a: number, b: number, y = 8) =>
  `@keyframes ${name} { 0%, ${a}% { opacity: 0; transform: translateY(${y}px) scale(.97) } ${a + 3}%, ${b}% { opacity: 1; transform: none } ${b + 3}%, 100% { opacity: 0; transform: none } }`

const S = 100 / 5
const f = (n: number) => +n.toFixed(2)
const BASE = "0 18px 26px -12px rgba(15,26,46,.35), inset 0 1px 0 #fff"
const PEAK = `transform: scale(1.07); box-shadow: ${BASE}, 0 0 16px 2px color-mix(in oklch, var(--g) 44%, transparent), 0 0 34px 6px color-mix(in oklch, var(--g) 20%, transparent)`
const MID = `transform: scale(1.03); box-shadow: ${BASE}, 0 0 12px 0 color-mix(in oklch, var(--g) 24%, transparent), 0 0 26px 3px color-mix(in oklch, var(--g) 11%, transparent)`
const OFF = `transform: none; box-shadow: ${BASE}`

// each tile glows in turn, easing in and then fading away
const glowKf = (i: number) => {
  const s = i * S
  const e = (i + 1) * S
  const pts: [number, string][] = [[Math.max(0, s - 0.5), OFF], [s + 1.5, PEAK], [e - 1, MID], [Math.min(100, e + 2.5), OFF]]
  const parts: string[] = []
  if (pts[0][0] > 0) parts.push(`0% { ${OFF} }`)
  pts.forEach(([p, v]) => parts.push(`${f(p)}% { ${v} }`))
  if (pts[pts.length - 1][0] < 100) parts.push(`100% { ${OFF} }`)
  return parts.join(" ")
}

// the text that belongs to each tile glows with it: same timing, a soft halo in the tile's colour, then it fades away
const T_OFF = "text-shadow: 0 0 0 transparent"
const T_PEAK = "color: var(--g); text-shadow: 0 0 12px color-mix(in oklch, var(--g) 65%, transparent), 0 0 3px color-mix(in oklch, var(--g) 35%, transparent)"
const T_MID = "color: color-mix(in oklch, var(--g) 72%, #5b6b78); text-shadow: 0 0 8px color-mix(in oklch, var(--g) 32%, transparent)"
const textKf = (i: number) => {
  const s = i * S
  const e = (i + 1) * S
  const pts: [number, string][] = [[Math.max(0, s - 0.5), T_OFF], [s + 1.5, T_PEAK], [e - 1, T_MID], [Math.min(100, e + 2.5), T_OFF]]
  const parts: string[] = []
  if (pts[0][0] > 0) parts.push(`0% { ${T_OFF} }`)
  pts.forEach(([p, v]) => parts.push(`${f(p)}% { ${v} }`))
  if (pts[pts.length - 1][0] < 100) parts.push(`100% { ${T_OFF} }`)
  return parts.join(" ")
}

const CSS = `
${seg("rp-card", 3, 94, 10)}
${seg("rp-chips", 14, 94, 8)}
${seg("rp-user", 36, 94, 8)}
${seg("rp-bot", 52, 94, 8)}
@keyframes rp-tap { 0%, 24% { background-color: #fff; color: var(--primary); box-shadow: 0 0 0 1px color-mix(in oklch, var(--primary) 45%, transparent) } 27%, 33% { background-color: var(--primary); color: #fff; box-shadow: 0 0 0 4px color-mix(in oklch, var(--primary) 22%, transparent) } 36%, 100% { background-color: #fff; color: var(--primary); box-shadow: 0 0 0 1px color-mix(in oklch, var(--primary) 45%, transparent) } }
@keyframes rp-ty { 0%, 44% { opacity: 0 } 46%, 50% { opacity: 1 } 52%, 100% { opacity: 0 } }
@keyframes rp-flow { to { stroke-dashoffset: -18 } }
@keyframes rp-float { 0%, 100% { translate: 0 -3px } 50% { translate: 0 4px } }
@keyframes rp-bubble { 0%, 100% { transform: rotate(-8deg) translateY(0) } 50% { transform: rotate(-6deg) translateY(-6px) } }
@keyframes rp-streak { 0%, 100% { opacity: .35; transform: translateX(0) } 50% { opacity: 1; transform: translateX(-6px) } }
@keyframes rp-td { 0%, 100% { transform: translateY(0); opacity: .4 } 50% { transform: translateY(-2px); opacity: 1 } }
${[0, 1, 2, 3, 4].map((i) => `@keyframes rp-g${i} { ${glowKf(i)} }\n.rp-g${i} { animation: rp-g${i} 12s ease-in-out infinite }`).join("\n")}
${[0, 1, 2, 3, 4].map((i) => `@keyframes rp-t${i} { ${textKf(i)} }\n.rp-t${i} { animation: rp-t${i} 12s ease-in-out infinite }`).join("\n")}
.rp-card, .rp-chips, .rp-user, .rp-bot { opacity: 0 }
.rp-card { animation: rp-card 12s cubic-bezier(.2,.7,.2,1) infinite } .rp-chips { animation: rp-chips 12s cubic-bezier(.2,.7,.2,1) infinite }
.rp-user { animation: rp-user 12s cubic-bezier(.2,.7,.2,1) infinite } .rp-bot { animation: rp-bot 12s cubic-bezier(.2,.7,.2,1) infinite }
.rp-tap { animation: rp-tap 12s ease-in-out infinite }
.rp-ty { opacity: 0; animation: rp-ty 12s ease-in-out infinite }
.rp-flow { stroke-dasharray: 4 5; animation: rp-flow 1.4s linear infinite }
.rp-float { animation: rp-float 6s ease-in-out infinite }
.rp-bubble { animation: rp-bubble 5s ease-in-out infinite }
.rp-streak { animation: rp-streak 1.8s ease-in-out infinite }
.rp-td { animation: rp-td 1s ease-in-out infinite }
@media (prefers-reduced-motion: reduce) {
  .rp-card, .rp-chips, .rp-user, .rp-bot { animation: none; opacity: 1; transform: none }
  .rp-ty { animation: none; opacity: 0 } .rp-tap, .rp-flow, .rp-float, .rp-bubble, .rp-streak, .rp-td { animation: none }
  [class*="rp-g"] { animation: none }
  .rp-t0, .rp-t1, .rp-t2, .rp-t3, .rp-t4 { animation: none }
}
`

const NAVY = "#14233a"
const BLUE = "#1d9bf0"

const TILES = [
  { Icon: ImageIcon, c: "#12b886", g: "#12b886", t: "Rich cards" },
  { Icon: Layers, c: "#7b4dff", g: "#7b4dff", t: "Carousels" },
  { Icon: MessageSquare, c: "#0a85ff", g: "#0a85ff", t: "Suggested replies" },
  { Icon: ShieldCheck, c: "#1d9bf0", g: "#1d9bf0", t: "Verified sender" },
  { Icon: Smartphone, c: "#e08a00", g: "#e08a00", t: "SMS fallback" },
]

/* the phone's screen: a verified business, a rich card, suggested replies, a tapped reply, the business's answer */
function Screen() {
  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-[32px] bg-white text-[#14233a]">
      <span className="absolute left-1/2 top-2 z-10 h-[17px] w-[62px] -translate-x-1/2 rounded-full" style={{ background: NAVY }} />
      <div className="flex items-center justify-between px-5 pt-2 text-[9px] font-semibold"><span>9:41</span><span className="flex items-center gap-0.5"><i className="h-1.5 w-1.5 rounded-full bg-[#14233a]" /><i className="h-1.5 w-1.5 rounded-full bg-[#14233a]" /><i className="h-1.5 w-1.5 rounded-full bg-[#14233a]/40" /></span></div>
      <div className="mt-3.5 flex items-center gap-2 border-b border-black/5 px-3 pb-2">
        <ChevronLeft className="h-4 w-4 text-muted-foreground" />
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">A</span>
        <span className="leading-tight"><span className="flex items-center gap-1 text-[11.5px] font-semibold">Aarav Mart<BadgeCheck className="h-3.5 w-3.5" style={{ color: BLUE }} aria-label="Verified sender" /></span><span className="rp-t3 block text-[8.5px] font-semibold text-muted-foreground" style={{ ["--g" as string]: TILES[3].g }}>Verified sender</span></span>
      </div>

      <div className="flex-1 overflow-hidden bg-[#f4f6fa] px-3 py-3">
        {/* the rich card, with the next carousel card peeking in from the right */}
        <div className="rp-card relative">
          <div className="flex gap-2">
            <div className="w-[180px] shrink-0 overflow-hidden rounded-2xl bg-white shadow-[0_10px_20px_-12px_rgba(15,26,46,.4)] ring-1 ring-black/5">
              <div className="relative flex h-[92px] items-center justify-center" style={{ background: "linear-gradient(135deg,#ffb020,#ee5a7b)" }}><Gift className="h-11 w-11 text-white drop-shadow-[0_6px_8px_rgba(0,0,0,.25)]" /><span className="absolute right-2 top-2 text-[10px] text-white/80">✦</span></div>
              <div className="px-2.5 pb-2.5 pt-2">
                <p className="rp-t0 text-[11.5px] font-semibold leading-snug" style={{ ["--g" as string]: TILES[0].g }}>Your Diwali hamper is ready</p>
                <p className="mt-0.5 text-[9px] leading-snug text-muted-foreground">Apply code DIWALI500 at checkout.</p>
                <p className="mt-2 rounded-full bg-primary py-1.5 text-center text-[9.5px] font-semibold text-primary-foreground">View offer</p>
              </div>
            </div>
            <div className="w-[60px] shrink-0 rounded-2xl bg-white ring-1 ring-black/5"><div className="h-[92px] rounded-t-2xl" style={{ background: "linear-gradient(135deg,#2ec9a0,#0b8f6a)" }} /><div className="space-y-1 p-2"><i className="block h-1.5 w-8 rounded-full bg-[#dfe6eb]" /><i className="block h-1.5 w-6 rounded-full bg-[#e8eef2]" /></div></div>
          </div>
        </div>

        <div className="rp-card"><p className="rp-t1 mt-1.5 text-center text-[8.5px] font-semibold text-muted-foreground" style={{ ["--g" as string]: TILES[1].g }}>Swipe for more cards ›</p></div>

        <div className="rp-chips mt-2 flex flex-wrap gap-1.5">
          {["Track order", "View offer", "Not now"].map((c, i) => <span key={c} className={`${i === 0 ? "rp-tap" : ""} rounded-full bg-white px-2.5 py-1 text-[9.5px] font-semibold text-primary ring-1 ring-primary/40`}><span className="rp-t2" style={{ ["--g" as string]: TILES[2].g }}>{c}</span></span>)}
        </div>

        <div className="rp-user mt-3 ml-auto w-max max-w-[80%] rounded-2xl rounded-br-md bg-[#d9f5e5] px-3 py-1.5 text-[10px]">Track order<span className="ml-1.5 inline-flex align-middle text-[#1d9bf0]"><Check className="-mr-1.5 h-2.5 w-2.5" strokeWidth={3} /><Check className="h-2.5 w-2.5" strokeWidth={3} /></span></div>

        <div className="relative mt-2 max-w-[85%]">
          <div className="rp-ty absolute left-0 top-0 flex items-center gap-1 rounded-2xl rounded-bl-md bg-white px-2.5 py-2 ring-1 ring-black/5"><i className="rp-td h-1 w-1 rounded-full bg-muted-foreground" /><i className="rp-td h-1 w-1 rounded-full bg-muted-foreground" style={{ animationDelay: ".15s" }} /><i className="rp-td h-1 w-1 rounded-full bg-muted-foreground" style={{ animationDelay: ".3s" }} /></div>
          <div className="rp-bot rounded-2xl rounded-bl-md bg-white px-3 py-1.5 text-[10px] leading-snug ring-1 ring-black/5">Out for delivery today by 6 pm.</div>
        </div>
      </div>

      <div className="flex items-center gap-2 border-t border-black/5 bg-white px-3 py-2"><Plus className="h-3.5 w-3.5 text-muted-foreground" /><span className="flex-1 rounded-full bg-secondary px-3 py-1 text-[9px] text-muted-foreground">RCS message</span><Smile className="h-3.5 w-3.5 text-muted-foreground" /><span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground"><Send className="h-3 w-3" /></span></div>
    </div>
  )
}

function Phone() {
  return (
    <div className="rounded-[40px] p-[6px] shadow-[0_40px_60px_-24px_rgba(15,26,46,.55)]" style={{ width: 232, height: 440, background: "linear-gradient(160deg,#2d3a55,#0f1a2e)" }}>
      <Screen />
    </div>
  )
}

/* the big RCS speech bubble, with motion lines */
function RcsBubble() {
  return (
    <div className="rp-bubble relative" style={{ width: 138, height: 118 }}>
      <svg viewBox="0 0 138 118" width="138" height="118" fill="none" aria-hidden>
        <path d="M24 6 H114 Q132 6 132 24 V68 Q132 86 114 86 H64 L38 110 L40 86 H24 Q6 86 6 68 V24 Q6 6 24 6Z" fill="color-mix(in oklch, var(--primary) 78%, #062a22)" />
        <path d="M24 6 H114 Q132 6 132 24 V68 Q132 86 114 86 H64 L38 110 L40 86 H24 Q6 86 6 68 V24 Q6 6 24 6Z" fill="url(#rp-bg)" />
        <path d="M24 6 H114 Q132 6 132 24 V30 Q80 44 6 30 V24 Q6 6 24 6Z" fill="#fff" opacity=".16" />
        <rect x="22" y="22" width="94" height="48" rx="13" stroke="#fff" strokeWidth="4" />
        <text x="69" y="56" textAnchor="middle" fontSize="27" fontWeight="800" fill="#fff" letterSpacing="1">RCS</text>
        <defs><linearGradient id="rp-bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="color-mix(in oklch, var(--primary) 60%, white)" /><stop offset="1" stopColor="var(--primary)" /></linearGradient></defs>
      </svg>
      {/* sparkle ticks, top right */}
      <svg viewBox="0 0 40 40" width="40" height="40" className="absolute -right-4 -top-5" fill="none" aria-hidden><path d="M8 30 L20 18" stroke="var(--primary)" strokeWidth="3" strokeLinecap="round" /><path d="M20 12 L24 2" stroke="var(--primary)" strokeWidth="3" strokeLinecap="round" /><path d="M28 24 L38 22" stroke="var(--primary)" strokeWidth="3" strokeLinecap="round" /></svg>
      {/* motion streaks, trailing to the left */}
      <svg viewBox="0 0 70 40" width="70" height="40" className="absolute -left-14 bottom-1" fill="none" aria-hidden>
        <path className="rp-streak" d="M4 8 H50" stroke="var(--primary)" strokeWidth="3" strokeLinecap="round" opacity=".7" /><path className="rp-streak" d="M14 20 H60" stroke="var(--primary)" strokeWidth="3" strokeLinecap="round" style={{ animationDelay: ".3s" }} /><path className="rp-streak" d="M0 32 H40" stroke="var(--primary)" strokeWidth="3" strokeLinecap="round" opacity=".5" style={{ animationDelay: ".6s" }} />
      </svg>
    </div>
  )
}

function Fallback() {
  return (
    <div className="rounded-2xl bg-white/90 p-3 ring-1 ring-white shadow-[0_22px_34px_-18px_rgba(15,26,46,.4),inset_0_1px_0_#fff] backdrop-blur-sm">
      <p className="text-[9.5px] font-semibold uppercase tracking-wide text-muted-foreground">Automatic fallback</p>
      <div className="mt-2 flex flex-wrap items-center gap-1 text-[10px] font-semibold text-[#14233a]">
        <span className="rounded-md bg-primary/10 px-1.5 py-1 text-primary">RCS</span><ArrowRight className="h-2.5 w-2.5 text-primary" /><span className="rounded-md bg-secondary px-1.5 py-1">WhatsApp</span><ArrowRight className="h-2.5 w-2.5 text-primary" /><span className="rp-t4 rounded-md bg-secondary px-1.5 py-1" style={{ ["--g" as string]: TILES[4].g }}>SMS</span>
      </div>
      <p className="mt-2 flex items-center gap-1 text-[10px] text-muted-foreground"><Zap className="h-3 w-3 text-primary" />One wallet, one webhook</p>
    </div>
  )
}

function FeatureTile({ i, size = 54 }: { i: number; size?: number }) {
  const t = TILES[i]
  return (
    <span className="inline-flex flex-col items-center">
      <span className={`rp-g${i} flex items-center justify-center bg-white ring-1 ring-white`} style={{ width: size, height: size, borderRadius: 17, boxShadow: BASE, ["--g" as string]: t.g, color: t.c }} title={t.t}>
        <t.Icon style={{ width: size * 0.44, height: size * 0.44 }} />
      </span>
    </span>
  )
}

export function RcsPhoneScene() {
  const ys = [57, 135, 213, 291, 369] // tile centres
  const ty = [130, 180, 230, 280, 330] // where each line meets the phone
  return (
    <div className="relative mx-auto w-full max-w-[580px] lg:h-full lg:min-h-[470px]">
      {/* ───────────── larger screens: the stage ───────────── */}
      <div className="relative hidden h-[470px] sm:block">
        <div className="pointer-events-none absolute left-[300px] top-[225px] h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_oklch,var(--primary)_12%,white),transparent_66%)]" />

        {/* dashed lines from each tile to the phone */}
        <svg className="pointer-events-none absolute left-0 top-0 h-[470px] w-[580px]" viewBox="0 0 580 470" fill="none" aria-hidden>
          {ys.map((y, i) => <path key={i} className="rp-flow" d={`M70 ${y} C120 ${y} 140 ${ty[i]} 192 ${ty[i]}`} stroke="var(--primary)" strokeOpacity=".55" strokeWidth="1.6" strokeLinecap="round" />)}
          {ys.map((y, i) => <circle key={i} cx="128" cy={(y + ty[i]) / 2 + (i - 2) * 0} r="3.5" fill="#fff" stroke="var(--primary)" strokeWidth="1.8" />)}
        </svg>

        {/* the feature tiles, in a column */}
        {ys.map((y, i) => <div key={i} className="rp-float absolute" style={{ left: 14, top: y - 27 }}><FeatureTile i={i} /></div>)}

        {/* the phone, tilted */}
        <div className="absolute" style={{ left: 196, top: 14, transform: "perspective(1400px) rotateY(-14deg) rotateZ(4deg)", transformOrigin: "50% 50%" }}><Phone /></div>

        {/* the RCS bubble, and the fallback card under it */}
        <div className="absolute origin-top-left" style={{ left: 462, top: 96, transform: "scale(.82)" }}><RcsBubble /></div>
        <div className="absolute" style={{ left: 430, top: 306, width: 146 }}><Fallback /></div>
      </div>

      {/* ───────────── phones: the pieces stacked ───────────── */}
      <div className="flex flex-col items-center gap-5 sm:hidden">
        <Phone />
        <div className="flex w-full items-start justify-between px-1">{TILES.map((_, i) => <FeatureTile key={i} i={i} size={48} />)}</div>
        <div className="w-full"><Fallback /></div>
      </div>
      <style>{CSS}</style>
    </div>
  )
}
