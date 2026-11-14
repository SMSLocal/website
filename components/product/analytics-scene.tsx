"use client"

import { useRef } from "react"
import { Download, FileText, Smile } from "lucide-react"

// Hero graphic for /products/analytics, built from the page's own content: real-time dashboards (first-response time,
// resolution rate, CSAT, open rate), conversations and campaigns over time, engagement by channel, sentiment and trends,
// campaign deliverability / opens / clicks / conversions, and scheduled exportable reports.
// One large glass dashboard window, tilted in real 3D, with three cards floating in front of it at different depths so
// the whole thing has parallax. The four KPI tiles take turns glowing; a marker travels along the chart with a tooltip;
// the donut and bars fill in. Hand-built SVG + HTML + CSS 3D transforms, silent, 12-second loop.
// Stage is 580 x 470 on larger screens; on phones the window and the cards stack.

const KPIS = [
  { l: "First response", v: "1.2s", d: "↓ 34%", c: "#12b886", line: "M0 18 L12 14 L24 16 L36 9 L48 11 L60 4" },
  { l: "Resolution", v: "78%", d: "↑ 12%", c: "#0a85ff", line: "M0 16 L12 18 L24 10 L36 12 L48 6 L60 3" },
  { l: "CSAT", v: "4.7", d: "↑ 0.4", c: "#7b4dff", line: "M0 14 L12 12 L24 15 L36 8 L48 9 L60 3" },
  { l: "Open rate", v: "61%", d: "↑ 8%", c: "#e08a00", line: "M0 17 L12 12 L24 14 L36 7 L48 10 L60 3" },
]
const BARS = [
  { l: "WhatsApp", p: 82, c: "#25c26e" },
  { l: "SMS", p: 61, c: "#12b886" },
  { l: "Email", p: 47, c: "#f5a524" },
  { l: "Web chat", p: 38, c: "#3b82f6" },
]
const FUNNEL = [
  { l: "Deliverability", p: 98, c: "#12b886" },
  { l: "Opens", p: 61, c: "#0a85ff" },
  { l: "Clicks", p: 24, c: "#7b4dff" },
  { l: "Conversions", p: 9, c: "#e08a00" },
]

const N = KPIS.length
const S = 100 / N
const f = (n: number) => +n.toFixed(2)
const BASE = "0 12px 18px -12px rgba(15,26,46,.35), inset 0 1px 0 #fff"
const PEAK = `transform: scale(1.04); box-shadow: ${BASE}, 0 0 12px 1px color-mix(in oklch, var(--g) 36%, transparent), 0 0 26px 4px color-mix(in oklch, var(--g) 16%, transparent)`
const MID = `transform: scale(1.02); box-shadow: ${BASE}, 0 0 8px 0 color-mix(in oklch, var(--g) 20%, transparent)`
const OFF = `transform: none; box-shadow: ${BASE}`
const ramp = (i: number) => {
  const s = i * S
  const e = (i + 1) * S
  const p: [number, string][] = [[Math.max(0, s - 0.4), OFF], [s + 1, PEAK], [e - 0.8, MID], [Math.min(100, e + 2), OFF]]
  const o: string[] = []
  if (p[0][0] > 0) o.push(`0% { ${OFF} }`)
  p.forEach(([a, v]) => o.push(`${f(a)}% { ${v} }`))
  if (p[p.length - 1][0] < 100) o.push(`100% { ${OFF} }`)
  return o.join(" ")
}

const CSS = `
${KPIS.map((_, i) => `@keyframes at-g${i} { ${ramp(i)} }\n.at-g${i} { animation: at-g${i} 12s ease-in-out infinite }`).join("\n")}
@keyframes at-draw { 0% { stroke-dashoffset: 1 } 24%, 100% { stroke-dashoffset: 0 } }
@keyframes at-area { 0%, 8% { opacity: 0 } 28%, 100% { opacity: 1 } }
@keyframes at-bar { 0% { transform: scaleX(0) } 14%, 100% { transform: scaleX(1) } }
@keyframes at-donut { 0% { stroke-dashoffset: 100 } 22%, 100% { stroke-dashoffset: var(--to) } }
@keyframes at-float { 0%, 100% { translate: 0 -4px } 50% { translate: 0 5px } }
@keyframes at-sweep { 0%, 55% { transform: translateX(-120%) } 85%, 100% { transform: translateX(220%) } }
@keyframes at-pop { 0%, 6% { opacity: 0; transform: translateY(8px) scale(.9) } 12%, 88% { opacity: 1; transform: none } 94%, 100% { opacity: 0; transform: translateY(-4px) } }
@keyframes at-glow { 0%, 100% { opacity: .55; transform: scale(1) } 50% { opacity: 1; transform: scale(1.08) } }
@keyframes at-pulse { 0%, 100% { opacity: 1; transform: scale(1) } 50% { opacity: .4; transform: scale(1.5) } }
@keyframes at-tip { 0%, 24% { opacity: 0 } 30%, 90% { opacity: 1 } 96%, 100% { opacity: 0 } }
.at-draw { stroke-dasharray: 1; stroke-dashoffset: 1; animation: at-draw 12s ease-out infinite }
.at-draw2 { stroke-dasharray: 1; stroke-dashoffset: 1; animation: at-draw 12s ease-out infinite; animation-delay: .25s }
.at-area { animation: at-area 12s ease-out infinite }
.at-bar { transform-origin: left; animation: at-bar 12s cubic-bezier(.3,.8,.2,1) infinite }
.at-donut { stroke-dasharray: 100; stroke-dashoffset: 100; animation: at-donut 12s cubic-bezier(.3,.8,.2,1) infinite }
.at-float { animation: at-float 6s ease-in-out infinite }
.at-sweep { animation: at-sweep 8s ease-in-out infinite }
.at-pop { opacity: 0; animation: at-pop 12s ease-out infinite }
.at-glow { animation: at-glow 6s ease-in-out infinite }
.at-pulse { animation: at-pulse 1.6s ease-in-out infinite }
.at-tip { opacity: 0; animation: at-tip 12s ease-in-out infinite }
@media (prefers-reduced-motion: reduce) {
  [class*="at-g"], .at-glow, .at-sweep, .at-pop, .at-draw, .at-draw2, .at-area, .at-bar, .at-float, .at-pulse, .at-tip { animation: none }
  .at-draw, .at-draw2 { stroke-dashoffset: 0 } .at-donut { animation: none; stroke-dashoffset: var(--to) } .at-tip { opacity: 1 } .at-pop { opacity: 1 }
}
`

const T = "text-[#14233a]"
const GLASS = "bg-white/95 ring-1 ring-white shadow-[0_30px_46px_-22px_rgba(15,26,46,.45),inset_0_1px_0_#fff]"
const A = "M0 78 C 30 74, 46 52, 80 56 S 130 70, 162 44 S 214 24, 246 30 S 300 14, 330 10"
const B = "M0 88 C 30 84, 50 70, 86 72 S 138 80, 170 62 S 222 46, 254 50 S 306 36, 330 30"
const TIP: [number, number] = [214, 24]

function Gloss() {
  return <i className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(115deg,rgba(255,255,255,.65)_0%,rgba(255,255,255,.1)_30%,transparent_46%)]" />
}

function Window() {
  return (
    <div className={`relative overflow-hidden rounded-[22px] p-4 ${GLASS}`}>
      {/* title bar */}
      <div className="flex items-center gap-1.5">
        <i className="h-2.5 w-2.5 rounded-full bg-[#ff6b6b]" /><i className="h-2.5 w-2.5 rounded-full bg-[#ffc24b]" /><i className="h-2.5 w-2.5 rounded-full bg-[#31c48d]" />
        <span className={`ml-2 text-[12px] font-semibold ${T}`}>Analytics &amp; Insights</span>
        <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-[#e3f7ec] px-2 py-0.5 text-[10px] font-semibold text-[#238a3b]"><i className="at-pulse h-1.5 w-1.5 rounded-full bg-[#31a24c]" />Live</span>
        <span className="hidden rounded-full bg-[#eef4f3] px-2 py-0.5 text-[10px] font-medium text-muted-foreground sm:inline">Last 7 days</span>
      </div>

      {/* KPI tiles */}
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {KPIS.map((k, i) => (
          <div key={k.l} className={`at-g${i} rounded-xl bg-white px-2.5 py-2 ring-1 ring-black/5`} style={{ ["--g" as string]: k.c, boxShadow: BASE }}>
            <p className="truncate text-[10px] font-medium text-muted-foreground">{k.l}</p>
            <div className="flex items-end justify-between">
              <span className={`text-[19px] font-semibold leading-tight ${T}`}>{k.v}</span>
              <svg viewBox="0 0 60 20" className="mb-1 h-4 w-9" fill="none" aria-hidden><path className="at-draw" d={k.line} pathLength={1} stroke={k.c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <p className="text-[10px] font-semibold" style={{ color: k.c }}>{k.d}</p>
          </div>
        ))}
      </div>

      {/* chart + donut */}
      <div className="mt-3 grid grid-cols-[1fr_104px] gap-3">
        <div className="relative rounded-xl bg-[#f6fbf9] p-2.5 ring-1 ring-black/5">
          <span className="at-tip absolute z-10 whitespace-nowrap rounded-lg bg-[#14233a] px-2 py-1 text-[9.5px] font-semibold text-white shadow-lg" style={{ left: "56%", top: "22%" }}>Wed · 1,248 chats</span>
          <div className={`flex items-center justify-between text-[10px] font-semibold ${T}`}>
            <span>Conversations &amp; campaigns</span>
            <span className="hidden items-center gap-2 font-medium text-muted-foreground sm:flex"><i className="inline-block h-1.5 w-3 rounded-full bg-primary" />Chats<i className="inline-block h-1.5 w-3 rounded-full bg-[#7fb2ff]" />Campaigns</span>
          </div>
          <svg viewBox="0 0 330 100" className="mt-1 h-[88px] w-full" fill="none" preserveAspectRatio="none" aria-hidden>
            <defs><linearGradient id="at-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="var(--primary)" stopOpacity=".28" /><stop offset="1" stopColor="var(--primary)" stopOpacity="0" /></linearGradient></defs>
            {[25, 50, 75].map((y) => <line key={y} x1="0" x2="330" y1={y} y2={y} stroke="#14233a" strokeOpacity=".07" strokeDasharray="3 4" />)}
            <path className="at-area" d={`${A} L330 100 L0 100 Z`} fill="url(#at-fill)" />
            <path className="at-draw2" d={B} pathLength={1} stroke="#7fb2ff" strokeWidth="2" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
            <path className="at-draw" d={A} pathLength={1} stroke="var(--primary)" strokeWidth="2.6" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
            <g className="at-tip">
              <line x1={TIP[0]} x2={TIP[0]} y1={TIP[1]} y2="100" stroke="var(--primary)" strokeOpacity=".4" strokeDasharray="3 3" />
              <circle cx={TIP[0]} cy={TIP[1]} r="5" fill="#fff" stroke="var(--primary)" strokeWidth="2.4" />
            </g>
          </svg>
        </div>
        <div className="flex flex-col items-center justify-center rounded-xl bg-white p-2 ring-1 ring-black/5">
          <div className="relative h-[62px] w-[62px]">
            <svg viewBox="0 0 40 40" className="h-full w-full -rotate-90" aria-hidden>
              <circle cx="20" cy="20" r="15.9" fill="none" stroke="#e8f0ee" strokeWidth="5" />
              <circle className="at-donut" style={{ ["--to" as string]: 6 }} cx="20" cy="20" r="15.9" fill="none" stroke="var(--primary)" strokeWidth="5" strokeLinecap="round" pathLength={100} />
            </svg>
            <span className={`absolute inset-0 flex items-center justify-center text-[15px] font-semibold ${T}`}>4.7</span>
          </div>
          <p className="mt-1.5 text-[9px] font-medium text-muted-foreground">CSAT · NPS +52</p>
        </div>
      </div>

      {/* engagement by channel */}
      <div className="mt-3 grid grid-cols-1 gap-x-4 gap-y-1.5 sm:grid-cols-2">
        {BARS.map((b, i) => (
          <div key={b.l} className="flex items-center gap-2">
            <span className="w-[52px] shrink-0 text-[10px] text-muted-foreground">{b.l}</span>
            <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#e8f0ee]"><span className="at-bar block h-full rounded-full" style={{ width: `${b.p}%`, background: `linear-gradient(90deg, color-mix(in oklch, ${b.c} 65%, white), ${b.c})`, animationDelay: `${i * 0.15}s` }} /></span>
            <span className={`w-7 text-right text-[10px] font-semibold ${T}`}>{b.p}%</span>
          </div>
        ))}
      </div>
      <Gloss />
      <i className="at-sweep pointer-events-none absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/45 to-transparent" />
    </div>
  )
}

function ReportCard() {
  return (
    <div className={`relative overflow-hidden rounded-2xl p-3 ${GLASS}`}>
      <div className="flex items-center gap-2"><span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#e0efff] text-[#0a85ff]"><Download className="h-4 w-4" /></span><span className="leading-tight"><span className={`block text-[12px] font-semibold ${T}`}>Scheduled report</span><span className="block text-[10px] text-muted-foreground">Every Monday · 9 AM</span></span></div>
      <div className="mt-2 flex gap-1.5">{["CSV", "PDF"].map((t) => <span key={t} className="inline-flex items-center gap-1 rounded-md bg-[#eef4f3] px-2 py-0.5 text-[10px] font-semibold text-[#14233a]"><FileText className="h-3 w-3 text-primary" />{t}</span>)}</div>
      <Gloss />
    </div>
  )
}
function SentimentCard() {
  return (
    <div className={`relative overflow-hidden rounded-2xl p-3 ${GLASS}`}>
      <div className="flex items-center gap-2"><span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#fff3d6] text-[#e08a00]"><Smile className="h-4 w-4" /></span><span className={`text-[12px] font-semibold ${T}`}>Sentiment &amp; trends</span></div>
      <div className="mt-2.5 flex h-2 overflow-hidden rounded-full bg-[#e8f0ee]"><span style={{ width: "62%", background: "#12b886" }} /><span style={{ width: "26%", background: "#f5b83d" }} /><span style={{ width: "12%", background: "#ef6a6a" }} /></div>
      <div className="mt-1.5 flex justify-between text-[9.5px] text-muted-foreground"><span>Positive</span><span>Neutral</span><span>Negative</span></div>
      <Gloss />
    </div>
  )
}
function FunnelCard() {
  return (
    <div className={`relative overflow-hidden rounded-2xl p-3 ${GLASS}`}>
      <p className={`text-[12px] font-semibold ${T}`}>Campaign results</p>
      <div className="mt-2 space-y-1.5">
        {FUNNEL.map((r, i) => (
          <div key={r.l} className="flex items-center gap-2">
            <span className="w-[68px] shrink-0 text-[10px] text-muted-foreground">{r.l}</span>
            <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#e8f0ee]"><span className="at-bar block h-full rounded-full" style={{ width: `${r.p}%`, background: r.c, animationDelay: `${i * 0.15}s` }} /></span>
            <span className={`w-7 text-right text-[10px] font-semibold ${T}`}>{r.p}%</span>
          </div>
        ))}
      </div>
      <Gloss />
    </div>
  )
}

export function AnalyticsScene() {
  const stage = useRef<HTMLDivElement>(null)
  // the 3D scene leans toward the pointer, so the depth between the layers is easy to see
  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = stage.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty("--px", String(Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width - 0.5) * 2))))
    el.style.setProperty("--py", String(Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height - 0.5) * 2))))
  }
  const leave = () => {
    stage.current?.style.setProperty("--px", "0")
    stage.current?.style.setProperty("--py", "0")
  }
  return (
    <div className="relative mx-auto w-full max-w-[580px] lg:h-full lg:min-h-[470px]">
      {/* ───────────── larger screens ───────────── */}
      <div ref={stage} onPointerMove={move} onPointerLeave={leave} className="relative hidden h-[470px] sm:block" style={{ perspective: 1600, perspectiveOrigin: "50% 40%" }}>
        <div className="at-glow pointer-events-none absolute left-[6%] top-[8%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,color-mix(in_oklch,var(--primary)_13%,white),transparent_66%)]" />
        <div className="absolute inset-0" style={{ transformStyle: "preserve-3d", transform: "rotateY(calc(-15deg + var(--px, 0) * 8deg)) rotateX(calc(6deg + var(--py, 0) * -6deg))", transition: "transform .25s ease-out" }}>
          {/* floor shadow */}
          <i className="absolute rounded-[50%] bg-[#0f1a2e]/20 blur-[18px]" style={{ left: 40, top: 372, width: 420, height: 34, transform: "translateZ(-40px)" }} />
          {/* two ghost panels behind the window give the stack some thickness */}
          <div className="absolute rounded-[22px] bg-white/55 ring-1 ring-white/80" style={{ left: 40, top: 42, width: 430, height: 300, transform: "translateZ(-28px)" }} />
          <div className="absolute rounded-[22px] bg-white/35 ring-1 ring-white/60" style={{ left: 52, top: 54, width: 430, height: 296, transform: "translateZ(-56px)" }} />
          {/* the dashboard window */}
          <div className="absolute" style={{ left: 28, top: 30, width: 430 }}><Window /></div>
          {/* cards floating in front, at different depths */}
          <div className="at-pop absolute" style={{ left: -4, top: 4, transform: "translateZ(120px)" }}>
            <span className="inline-flex items-center gap-2 rounded-full bg-white py-1.5 pl-2 pr-3 text-[11px] font-semibold text-[#14233a] shadow-[0_18px_28px_-12px_rgba(15,26,46,.45)] ring-1 ring-white"><span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#f5b942] text-[10px] text-white">★</span>New 5-star CSAT</span>
          </div>
          <div className="at-float absolute" style={{ left: 340, top: 0, width: 190, transform: "translateZ(90px)" }}><ReportCard /></div>
          <div className="at-float absolute" style={{ left: 0, top: 352, width: 188, transform: "translateZ(70px)", animationDelay: "-2s" }}><SentimentCard /></div>
          <div className="at-float absolute" style={{ left: 340, top: 346, width: 218, transform: "translateZ(100px)", animationDelay: "-4s" }}><FunnelCard /></div>
        </div>
      </div>

      {/* ───────────── phones ───────────── */}
      <div className="flex flex-col gap-4 sm:hidden">
        <Window />
        <ReportCard />
        <SentimentCard />
        <FunnelCard />
      </div>
      <style>{CSS}</style>
    </div>
  )
}
