import { BarChart3, Check, Code2, Facebook, Headphones, Instagram, KeyRound, Layers, Mail, MessageCircle, MessageSquareText, MessagesSquare, Phone, Send, ShoppingCart, Sparkles, Users, Webhook, Zap, MessageSquare } from "lucide-react"
import type { LucideIcon } from "lucide-react"

// Hero graphic for /products/integrations, built from the page's own content: app categories (CRM, E-commerce, Helpdesk,
// Analytics), automation tools (Make, Zapier, Pabbly Connect), the REST API, webhooks and sandbox, and the ten native channels.
// A glass hub on a pedestal in the middle; the eight capability pills (four each side) take turns glowing softly with a tick
// and their beam to the hub brightens; three automation cards float above the hub; a channels strip sits underneath.
// Hand-built HTML + SVG + CSS, silent, 16-second loop. Stage is 580 x 470; on phones the pieces stack.

type Pill = { t: string; Icon: LucideIcon; c: string }
const LEFT: Pill[] = [
  { t: "E-commerce", Icon: ShoppingCart, c: "#0a85ff" },
  { t: "CRM", Icon: Users, c: "#12b886" },
  { t: "Helpdesk", Icon: Headphones, c: "#7b4dff" },
  { t: "Communication", Icon: MessageSquare, c: "#e08a00" },
]
const RIGHT: Pill[] = [
  { t: "Analytics", Icon: BarChart3, c: "#0a85ff" },
  { t: "Automation", Icon: Zap, c: "#12b886" },
  { t: "REST API", Icon: Code2, c: "#7b4dff" },
  { t: "Webhooks", Icon: Webhook, c: "#e08a00" },
]
const PILLS = [...LEFT, ...RIGHT]
const N = PILLS.length
const S = 100 / N
const f = (n: number) => +n.toFixed(2)

const ROW_Y = [118, 178, 238, 298] // pill tops
const PW = 148
const PH = 46
const HX = 290
const HY = 214

const BASE = "0 14px 22px -12px rgba(15,26,46,.4), inset 0 1px 0 #fff"
const PEAK = `transform: scale(1.05); box-shadow: ${BASE}, 0 0 14px 2px color-mix(in oklch, var(--g) 44%, transparent), 0 0 30px 6px color-mix(in oklch, var(--g) 20%, transparent)`
const MID = `transform: scale(1.02); box-shadow: ${BASE}, 0 0 9px 0 color-mix(in oklch, var(--g) 24%, transparent), 0 0 20px 3px color-mix(in oklch, var(--g) 10%, transparent)`
const OFF = `transform: none; box-shadow: ${BASE}`

const ramp = (i: number) => {
  const s = i * S
  const e = (i + 1) * S
  const pts: [number, string][] = [[Math.max(0, s - 0.4), OFF], [s + 0.9, PEAK], [e - 0.6, MID], [Math.min(100, e + 1.6), OFF]]
  const parts: string[] = []
  if (pts[0][0] > 0) parts.push(`0% { ${OFF} }`)
  pts.forEach(([p, v]) => parts.push(`${f(p)}% { ${v} }`))
  if (pts[pts.length - 1][0] < 100) parts.push(`100% { ${OFF} }`)
  return parts.join(" ")
}
const win = (i: number, hi: string, lo: string) => {
  const s = i * S
  const e = (i + 1) * S
  if (i === 0) return `0%, ${f(e - 0.8)}% { ${hi} } ${f(e)}%, 99% { ${lo} } 100% { ${hi} }`
  if (i === N - 1) return `0%, ${f(s - 0.8)}% { ${lo} } ${f(s)}%, 99% { ${hi} } 100% { ${lo} }`
  return `0%, ${f(s - 0.8)}% { ${lo} } ${f(s)}%, ${f(e - 0.8)}% { ${hi} } ${f(e)}%, 100% { ${lo} }`
}

const CSS = `
${PILLS.map((_, i) => `@keyframes ih-g${i} { ${ramp(i)} }\n.ih-g${i} { animation: ih-g${i} 16s ease-in-out infinite }\n@keyframes ih-k${i} { ${win(i, "opacity: 1; transform: scale(1)", "opacity: 0; transform: scale(.4)")} }\n.ih-k${i} { opacity: 0; animation: ih-k${i} 16s cubic-bezier(.3,1.4,.4,1) infinite }\n@keyframes ih-b${i} { ${win(i, "opacity: 1", "opacity: .3")} }\n.ih-b${i} { opacity: .3; animation: ih-b${i} 16s ease-in-out infinite }`).join("\n")}
@keyframes ih-flow { to { stroke-dashoffset: -20 } }
@keyframes ih-float { 0%, 100% { translate: 0 -3px } 50% { translate: 0 4px } }
@keyframes ih-ripple { 0% { transform: scale(.85); opacity: .5 } 100% { transform: scale(1.6); opacity: 0 } }
.ih-flow { stroke-dasharray: 3 6; animation: ih-flow 1.5s linear infinite }
.ih-float { animation: ih-float 6s ease-in-out infinite }
.ih-ripple { animation: ih-ripple 3.2s ease-out infinite }
@media (prefers-reduced-motion: reduce) {
  .ih-k0 { animation: none; opacity: 1; transform: none } .ih-b0 { animation: none; opacity: 1 }
  [class*="ih-g"], .ih-flow, .ih-float, .ih-ripple { animation: none }
}
`

const CARD = "bg-white ring-1 ring-white shadow-[0_16px_26px_-14px_rgba(15,26,46,.4),inset_0_1px_0_#fff]"

function PillView({ p, i }: { p: Pill; i: number }) {
  return (
    <span className="relative block">
      <span className={`ih-g${i} flex items-center gap-2.5 rounded-2xl bg-white px-3 ring-1 ring-white`} style={{ width: PW, height: PH, boxShadow: BASE, ["--g" as string]: p.c }}>
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg" style={{ background: `color-mix(in oklch, ${p.c} 16%, white)`, color: p.c }}><p.Icon className="h-4 w-4" /></span>
        <span className="text-[12.5px] font-semibold text-[#14233a]">{p.t}</span>
      </span>
      <span className={`ih-k${i} absolute -right-1.5 -top-1.5 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#31a24c] text-white ring-2 ring-white`}><Check className="h-2.5 w-2.5" strokeWidth={3.4} /></span>
    </span>
  )
}

function Hub({ size = 128 }: { size?: number }) {
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <i className="ih-ripple absolute inset-0 rounded-[34px] border-2 border-primary/45" />
      <i className="ih-ripple absolute inset-0 rounded-[34px] border-2 border-primary/35" style={{ animationDelay: "1.6s" }} />
      <span
        className="relative flex h-full w-full items-center justify-center rounded-[34px] text-white"
        style={{
          background: "linear-gradient(150deg, color-mix(in oklch, var(--primary) 55%, white) 0%, var(--primary) 52%, color-mix(in oklch, var(--primary) 68%, #062a22) 100%)",
          boxShadow: "inset 0 3px 0 rgba(255,255,255,.6), inset 0 -16px 24px rgba(0,0,0,.14), 0 30px 36px -14px color-mix(in oklch, var(--primary) 65%, transparent)",
        }}
      >
        <Layers className="drop-shadow-[0_4px_8px_rgba(6,60,48,.4)]" style={{ width: size * 0.45, height: size * 0.45 }} strokeWidth={1.7} />
      </span>
    </div>
  )
}

function Pedestal() {
  return (
    <div className="relative" style={{ width: 230, height: 70 }}>
      <span className="absolute inset-x-0 top-0 h-[64px] rounded-[50%] bg-gradient-to-b from-white to-[#bfe6da]" style={{ boxShadow: "0 18px 26px -10px rgba(15,26,46,.35), inset 0 2px 0 #fff, 0 0 0 1px rgba(18,184,134,.15)" }} />
      <span className="absolute left-[14%] right-[14%] top-[8px] h-[44px] rounded-[50%] bg-white/90" style={{ boxShadow: "inset 0 -6px 12px rgba(15,26,46,.07)" }} />
      <span className="absolute left-[30%] right-[30%] top-[18px] h-[22px] rounded-[50%] bg-[radial-gradient(ellipse,color-mix(in_oklch,var(--primary)_55%,white),transparent_72%)]" />
    </div>
  )
}

const AUTO = [
  { n: "Make", c: "#7a3cff", rot: -9, y: 22 },
  { n: "Zapier", c: "#ff4a00", rot: 0, y: 0 },
  { n: "Pabbly Connect", c: "#1f8ded", rot: 9, y: 22 },
]
function AutoCard({ a, w = 96 }: { a: (typeof AUTO)[number]; w?: number }) {
  return (
    <div className={`flex flex-col items-center gap-1.5 rounded-2xl px-2 pb-2.5 pt-3 ${CARD}`} style={{ width: w }}>
      <span className="flex h-9 w-9 items-center justify-center rounded-[11px] text-[15px] font-bold text-white" style={{ background: `linear-gradient(145deg, color-mix(in oklch, ${a.c} 70%, white), ${a.c})`, boxShadow: "inset 0 1px 0 rgba(255,255,255,.5)" }}>{a.n[0]}</span>
      <span className="text-center text-[11px] font-semibold leading-tight text-[#14233a]">{a.n}</span>
    </div>
  )
}

const CH = [
  { Icon: MessageSquareText, c: "#12b886" },
  { Icon: MessageCircle, c: "#25d366" },
  { Icon: Mail, c: "#f59e0b" },
  { Icon: KeyRound, c: "#0a85ff" },
  { Icon: Sparkles, c: "#7b4dff" },
  { Icon: Phone, c: "#0f766e" },
  { Icon: MessagesSquare, c: "#06b6d4" },
  { Icon: Send, c: "#229ed9" },
  { Icon: Instagram, c: "#e1306c" },
  { Icon: Facebook, c: "#1877f2" },
]
function Channels() {
  return (
    <div className={`flex max-w-full flex-wrap items-center justify-center gap-x-2 gap-y-2 rounded-3xl px-4 py-2.5 ${CARD}`}>
      <span className="flex items-center gap-2 pr-1"><Layers className="h-4 w-4 text-primary" /><span className="text-[11px] font-semibold leading-tight text-[#14233a]">10 native<br />channels</span><span className="h-6 w-px bg-border" /></span>
      {CH.map((c, i) => <span key={i} className="flex h-7 w-7 items-center justify-center rounded-[9px] text-white" style={{ background: c.c, boxShadow: "inset 0 1px 0 rgba(255,255,255,.4)" }}><c.Icon className="h-3.5 w-3.5" /></span>)}
    </div>
  )
}

export function IntegrationsHubScene() {
  const pos = (side: "L" | "R", r: number) => ({ x: side === "L" ? 0 : 580 - PW, y: ROW_Y[r] })
  return (
    <div className="relative mx-auto w-full max-w-[580px] lg:h-full lg:min-h-[470px] lg:-translate-x-6">
      {/* ───────────── larger screens ───────────── */}
      <div className="relative hidden h-[470px] sm:block">
        <div className="pointer-events-none absolute h-[470px] w-[470px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_oklch,var(--primary)_12%,white),transparent_66%)]" style={{ left: HX, top: HY }} />

        {/* beams from the pills to the hub */}
        <svg className="pointer-events-none absolute left-0 top-0 h-[470px] w-[580px]" viewBox="0 0 580 470" fill="none" aria-hidden>
          {PILLS.map((_, i) => {
            const side = i < 4 ? "L" : "R"
            const r = i % 4
            const p = pos(side, r)
            const x1 = side === "L" ? p.x + PW : p.x
            const y1 = p.y + PH / 2
            const x2 = side === "L" ? HX - 62 : HX + 62
            const y2 = HY - 14 + r * 9
            const mx = (x1 + x2) / 2
            return <path key={i} className={`ih-flow ih-b${i}`} d={`M${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`} stroke="var(--primary)" strokeWidth="1.6" strokeLinecap="round" />
          })}
        </svg>

        {/* light rays from the automation cards into the hub */}
        <div className="pointer-events-none absolute" style={{ left: HX - 90, top: 70, width: 180, height: 80, background: "linear-gradient(to bottom, color-mix(in oklch, var(--primary) 18%, transparent), transparent)", clipPath: "polygon(0 0, 100% 0, 70% 100%, 30% 100%)" }} />

        {/* automation cards */}
        {AUTO.map((a, i) => (
          <div key={a.n} className="ih-float absolute" style={{ left: HX - 48 + (i - 1) * 102, top: 4 + a.y, rotate: `${a.rot}deg`, animationDelay: `${-i * 1.4}s` }}><AutoCard a={a} /></div>
        ))}

        {/* hub + pedestal */}
        <div className="absolute" style={{ left: HX - 115, top: HY + 46 }}><Pedestal /></div>
        <div className="absolute" style={{ left: HX - 64, top: HY - 62 }}><Hub /></div>

        {/* pills */}
        {PILLS.map((p, i) => {
          const q = pos(i < 4 ? "L" : "R", i % 4)
          return <div key={p.t} className="absolute" style={{ left: q.x, top: q.y }}><PillView p={p} i={i} /></div>
        })}

        {/* channels strip */}
        <div className="absolute inset-x-0 flex justify-center" style={{ top: 392 }}><Channels /></div>
      </div>

      {/* ───────────── phones ───────────── */}
      <div className="flex flex-col items-center gap-5 sm:hidden">
        <div className="flex items-end justify-center gap-2">
          {AUTO.map((a) => <AutoCard key={a.n} a={a} w={92} />)}
        </div>
        <Hub size={104} />
        <div className="grid w-full grid-cols-2 gap-x-3 gap-y-3.5">
          {PILLS.map((p, i) => <div key={p.t} className="flex justify-center"><PillView p={p} i={i} /></div>)}
        </div>
        <Channels />
      </div>
      <style>{CSS}</style>
    </div>
  )
}
