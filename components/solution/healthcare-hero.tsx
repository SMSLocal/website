"use client"

import { useEffect, useRef, useState } from "react"
import { CalendarCheck, Check, FileText, HeartPulse, Send } from "lucide-react"

// Hero graphic for /solutions/healthcare: a clinic sends three automatic patient messages (appointment reminder, lab report link,
// follow-up visit). Each card builds in turn, shows "SMS / WhatsApp sent", then the result: Confirmed, Opened, Booked, with a small
// tile beside it. Layered 3D cards sway gently. White, navy and clinical green. HTML + CSS 3D, silent, 12-second loop.

const W = 560
const H = 440
const CW = 356
const CH = 100
const P3 = { transformStyle: "preserve-3d" as const }
const z = (px: number) => ({ transform: `translateZ(${px}px)` })

const ROWS = [
  { Icon: CalendarCheck, c: "#0e9f6e", who: "Priya S.", t: "Appointment reminder", m: "Tomorrow, 11 AM, Dr. Iyer", ch: "SMS", done: "Confirmed" },
  { Icon: FileText, c: "#0a6fd6", who: "Rahul M.", t: "Lab report ready", m: "Blood test, secure link", ch: "WhatsApp", done: "Opened" },
  { Icon: HeartPulse, c: "#d9480f", who: "Anita K.", t: "Follow-up visit", m: "Friday 5:15 PM, check-up", ch: "WhatsApp", done: "Booked" },
]
const TILES = [
  { strip: "Tue", c: "#0e9f6e", big: "11", cap: "AM · Confirmed" },
  { strip: "Report", c: "#0a6fd6", big: null, cap: "Opened safely" },
  { strip: "Fri", c: "#d9480f", big: "5:15", cap: "PM · Booked" },
]

const CSS = `
${ROWS.map((_, i) => {
  const a = 6 + i * 24
  return `@keyframes v9-c${i} { 0%, ${a}% { opacity: 0; transform: translateY(26px) } ${a + 6}%, 91% { opacity: 1; transform: none } 97%, 100% { opacity: 0; transform: translateY(-12px) } }
@keyframes v9-s${i} { 0%, ${a + 5}% { opacity: 0 } ${a + 8}%, ${a + 13}% { opacity: 1 } ${a + 16}%, 100% { opacity: 0 } }
@keyframes v9-d${i} { 0%, ${a + 14}% { opacity: 0; transform: translateY(4px) } ${a + 18}%, 91% { opacity: 1; transform: none } 97%, 100% { opacity: 0 } }
@keyframes v9-p${i} { 0%, ${a + 15}% { opacity: 0; transform: scale(.5) translateY(10px) } ${a + 21}%, 91% { opacity: 1; transform: none } 97%, 100% { opacity: 0; transform: scale(.8) } }
.v9-c${i} { opacity: 0; animation: v9-c${i} 12s cubic-bezier(.2,.8,.2,1) infinite }
.v9-s${i} { opacity: 0; animation: v9-s${i} 12s ease-in-out infinite }
.v9-d${i} { opacity: 0; animation: v9-d${i} 12s ease-out infinite }
.v9-p${i} { opacity: 0; animation: v9-p${i} 12s cubic-bezier(.3,1.5,.4,1) infinite }
.v9-b${i} { animation: v9-bob 4.${i + 2}s ease-in-out ${i * 0.7}s infinite }`
}).join("\n")}
@keyframes v9-bob { 0%, 100% { translate: 0 -5px } 50% { translate: 0 6px } }
@keyframes v9-sway { 0%, 100% { transform: rotateY(-20deg) rotateX(6deg) } 50% { transform: rotateY(-11deg) rotateX(3deg) } }
.v9-sway { animation: v9-sway 9s ease-in-out infinite }
@media (prefers-reduced-motion: reduce) {
  .v9-sway, [class*="v9-b"] { animation: none }
  [class*="v9-c"], [class*="v9-d"], [class*="v9-p"] { animation: none; opacity: 1; transform: none }
  [class*="v9-s"] { animation: none; opacity: 0 }
}
`

function Header() {
  return (
    <div className="absolute flex items-center gap-3 rounded-2xl bg-white px-5 ring-1 ring-[#0f2a47]/[0.07]" style={{ left: 0, top: 0, width: CW + 6, height: 64, boxShadow: "0 16px 26px -16px rgba(15,42,71,.4)" }}>
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#e3f6ee]">
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden><path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z" fill="#0e9f6e" /></svg>
      </span>
      <div className="min-w-0">
        <p className="text-[15px] font-semibold leading-tight text-[#0f2a47]">Sunrise Clinic</p>
        <p className="text-[12px] leading-tight text-[#0f2a47]/60">Sends patient messages automatically</p>
      </div>
      <Send className="ml-auto h-5 w-5 text-[#0e9f6e]" />
    </div>
  )
}

function Tile({ i }: { i: number }) {
  const t = TILES[i]
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-xl bg-white ring-1 ring-[#0f2a47]/[0.08]" style={{ boxShadow: "0 16px 22px -12px rgba(15,42,71,.45)" }}>
      <div className="flex h-[18px] items-center justify-center font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-white" style={{ background: t.c }}>{t.strip}</div>
      <div className="flex flex-1 items-center justify-center">
        {t.big ? <p className="text-[30px] font-semibold leading-none text-[#0f2a47]">{t.big}</p> : <FileText className="h-8 w-8 text-[#0a6fd6]" strokeWidth={1.8} />}
      </div>
      <p className="pb-2 text-center text-[10.5px] font-medium text-[#0f2a47]/65">{t.cap}</p>
    </div>
  )
}

function Card({ i }: { i: number }) {
  const r = ROWS[i]
  return (
    <div className="absolute" style={{ left: i * 26, top: 92 + i * 114, width: CW, height: CH, ...P3 }}>
      <div className={`v9-c${i} absolute inset-0 px-4`} style={P3}>
        <i className="absolute inset-0 rounded-2xl bg-[#b9c9dc]" style={z(-15)} />
        <i className="absolute inset-0 rounded-2xl bg-[#c9d6e4]" style={z(-10)} />
        <i className="absolute inset-0 rounded-2xl bg-[#dbe5f0]" style={z(-4)} />
        <i className="absolute inset-0 rounded-2xl bg-white ring-1 ring-[#0f2a47]/[0.07]" style={{ ...z(0), boxShadow: "0 14px 24px -14px rgba(15,42,71,.35)" }} />
        <div className="relative flex h-full items-center gap-3.5" style={z(2)}>
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white" style={{ background: r.c }}><r.Icon className="h-6 w-6" /></span>
          <div className="min-w-0 flex-1">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#0f2a47]/45">To {r.who}</p>
            <p className="mt-0.5 whitespace-nowrap text-[15px] font-semibold leading-tight text-[#0f2a47]">{r.t}</p>
            <p className="mt-0.5 truncate text-[12.5px] leading-snug text-[#0f2a47]/65">{r.m}</p>
          </div>
          <div className="relative h-10 w-[88px] shrink-0 text-right">
            <p className={`v9-s${i} absolute inset-x-0 top-0 whitespace-nowrap text-[12px] font-medium text-[#0f2a47]/60`}>{r.ch} sent</p>
            <p className={`v9-d${i} absolute inset-x-0 top-0 flex items-center justify-end gap-1.5 text-[14px] font-semibold text-[#0e9f6e]`}><Check className="h-4 w-4" strokeWidth={3} />{r.done}</p>
          </div>
        </div>
      </div>
      <div className={`v9-p${i} absolute`} style={{ left: CW + 18, top: 6, width: 78, height: 88, ...z(40) }}>
        <div className={`v9-b${i} h-full w-full`}><Tile i={i} /></div>
      </div>
    </div>
  )
}

export function HealthcareHero() {
  const box = useRef<HTMLDivElement>(null)
  const [k, setK] = useState(1)
  useEffect(() => {
    const el = box.current
    if (!el) return
    const fit = () => setK(Math.min(1, el.clientWidth / W))
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  return (
    <div ref={box} className="relative mx-auto w-full max-w-[560px]" style={{ height: H * k }} role="img" aria-label="A clinic sends three automatic patient messages: an appointment reminder that gets confirmed, a lab report link that is opened securely, and a follow-up visit that is booked">
      <div className="absolute left-0 top-0 origin-top-left" style={{ width: W, height: H, transform: `scale(${k})`, perspective: 1600, perspectiveOrigin: "50% 40%" }}>
        <div className="absolute inset-0" style={P3}>
          <div className="absolute" style={{ left: 48, top: 0, width: 0, height: 0, ...P3 }}>
            <div className="v9-sway absolute" style={{ left: 190, top: 214, width: 0, height: 0, ...P3 }}>
              <div className="absolute" style={{ left: -190, top: -214, width: 0, height: 0, ...P3 }}>
                <Header />
                {ROWS.map((_, i) => <Card key={i} i={i} />)}
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{CSS}</style>
    </div>
  )
}
