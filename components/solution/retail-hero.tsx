"use client"

import { useEffect, useRef, useState } from "react"
import { Cake, Check, Receipt, Star, Tag } from "lucide-react"
import type { LucideIcon } from "lucide-react"

// Hero graphic for /solutions/retail: one shop's worth of retail, centred, and the messages that leave it.
// In the middle of a white page, in isometric 3D, stand a sale board ("SALE, up to 50% off"), a point-of-sale terminal showing "Paid ₹2,450"
// with a receipt slipping out, three paper shopping bags (cream, teal, navy) with tissue paper, a red "40% OFF" tag swinging from the teal
// one, a ribbon-wrapped gift box and a wire shopping basket. Everything drops into place, one piece after another. Above it, four dark
// notification chips (receipt, loyalty, flash sale, birthday) appear one by one, 0.5 s apart, each tied to its object by a dotted leader
// line that draws itself. No card, no photo, no land. The scene leans toward the pointer. HTML + CSS 3D, silent, 15-second loop. Amounts,
// offers and names are samples.

const W = 560
const H = 440
const LOOP = 15
const ROT = -30
const TILT = 58
const P3 = { transformStyle: "preserve-3d" as const }

type Chip = { Icon: LucideIcon; c: string; t: string; d: string; ch: string; x: number; y: number; ax: number; ay: number }
const CHIPS: Chip[] = [
  { Icon: Receipt, c: "#0e9f6e", t: "Receipt sent", d: "Paid ₹2,450, bill on WhatsApp", ch: "WhatsApp", x: 18, y: 126, ax: 216, ay: 354 },
  { Icon: Star, c: "#8b6cf5", t: "Loyalty points updated", d: "Balance and tier, after the purchase", ch: "WhatsApp", x: 54, y: 14, ax: 244, ay: 294 },
  { Icon: Tag, c: "#f0527f", t: "Flash sale alert", d: "A 4-hour offer, sent in minutes", ch: "Quick SMS", x: 322, y: 22, ax: 298, ay: 271 },
  { Icon: Cake, c: "#22b8cf", t: "Birthday offer", d: "A personal gift, on the right day", ch: "SMS", x: 352, y: 128, ax: 358, ay: 301 },
]
const CW = 190
const CH = 58

const CSS = `
${[0, 1, 2, 3, 4, 5, 6].map((i) => {
  const a = 1.5 + i * 2.6
  return `@keyframes rt-i${i} { 0%, ${a}% { transform: translateZ(240px); visibility: hidden } ${a + 0.1}% { transform: translateZ(240px); visibility: visible } ${a + 6}%, 96% { transform: translateZ(0); visibility: visible } 98%, 100% { visibility: hidden } }
.rt-i${i} { transform: translateZ(240px); visibility: hidden; animation: rt-i${i} ${LOOP}s cubic-bezier(.3,1,.3,1) infinite }`
}).join(" ")}
@keyframes rt-swing { 0%, 100% { transform: rotateZ(-6deg) } 50% { transform: rotateZ(6deg) } }
.rt-swing { transform-origin: 50% 0; will-change: transform; animation: rt-swing 4.5s ease-in-out infinite }
@keyframes rt-sway { 0%, 100% { transform: rotateZ(-3deg) } 50% { transform: rotateZ(3deg) } }
.rt-sway { will-change: transform; animation: rt-sway 11s ease-in-out infinite }
@keyframes rt-print { 0%, 8% { clip-path: inset(100% 0 0 0) } 20%, 96% { clip-path: inset(0 0 0 0) } 99%, 100% { clip-path: inset(100% 0 0 0) } }
.rt-print { clip-path: inset(100% 0 0 0); animation: rt-print ${LOOP}s ease-out infinite }
${CHIPS.map((_, i) => {
  const a = 3.333 + i * 3.333
  return `@keyframes rt-p${i} { 0%, ${a}% { opacity: 0; transform: translateY(14px) scale(.97) } ${a + 2.667}% { opacity: 1; transform: translateY(0) scale(1) } 91% { opacity: 1; transform: translateY(0) scale(1) } 97%, 100% { opacity: 0; transform: translateY(-4px) scale(.98) } }
.rt-p${i} { opacity: 0; will-change: transform, opacity; animation: rt-p${i} ${LOOP}s cubic-bezier(.22,.7,.25,1) infinite }
@keyframes rt-l${i} { 0%, ${a + 1.5}% { stroke-dashoffset: 1; opacity: 0 } ${a + 2}% { opacity: 1 } ${a + 5}%, 91% { stroke-dashoffset: 0; opacity: 1 } 97%, 100% { stroke-dashoffset: 0; opacity: 0 } }
.rt-l${i} { stroke-dasharray: 1; stroke-dashoffset: 1; opacity: 0; animation: rt-l${i} ${LOOP}s ease-out infinite }
@keyframes rt-d${i} { 0%, ${a + 4}% { opacity: 0; transform: scale(.2) } ${a + 6}%, 91% { opacity: 1; transform: scale(1) } 97%, 100% { opacity: 0 } }
.rt-d${i} { opacity: 0; transform-box: fill-box; transform-origin: center; animation: rt-d${i} ${LOOP}s cubic-bezier(.3,1.5,.4,1) infinite }`
}).join(" ")}
@keyframes rt-float { 0%, 100% { translate: 0 -2px } 50% { translate: 0 3px } }
.rt-float { will-change: translate; animation: rt-float 6s ease-in-out infinite }
@media (prefers-reduced-motion: reduce) {
  .rt-swing, .rt-sway, .rt-float { animation: none }
  [class*="rt-i"] { animation: none; visibility: visible; transform: none }
  .rt-print { animation: none; clip-path: none }
  [class*="rt-p"], [class*="rt-l"], [class*="rt-d"] { animation: none; opacity: 1; transform: none; stroke-dashoffset: 0 }
}
`

type BoxProps = { x: number; y: number; w: number; d: number; h: number; z0?: number; front: string; left: string; top: string; fc?: React.ReactNode; tc?: React.ReactNode }
function Box({ x, y, w, d, h, z0 = 0, front, left, top, fc, tc }: BoxProps) {
  return (
    <div className="absolute" style={{ left: x, top: y, width: 0, height: 0, ...P3, transform: `translateZ(${z0}px)` }}>
      <div className="absolute overflow-hidden" style={{ left: -w / 2, top: d / 2 - h, width: w, height: h, transformOrigin: "bottom", transform: "rotateX(-90deg)", background: front }}>{fc}</div>
      <div className="absolute overflow-hidden" style={{ left: -w / 2, top: -d / 2, width: h, height: d, transformOrigin: "left", transform: "rotateY(-90deg)", background: left }} />
      <div className="absolute overflow-hidden" style={{ left: -w / 2, top: -d / 2, width: w, height: d, background: top, transform: `translateZ(${h}px)` }}>{tc}</div>
    </div>
  )
}

/* an A-frame sale board */
function SaleBoard() {
  const lean = 12
  return (
    <div className="rt-i0 absolute" style={{ left: 0, top: 0, width: 0, height: 0, ...P3 }}>
      <div className="absolute" style={{ left: -178, top: 36, width: 0, height: 0, ...P3 }}>
        <div className="absolute" style={{ left: -28, top: 14 - 74, width: 56, height: 74, transformOrigin: "bottom", transform: `rotateX(${-90 + lean}deg)`, background: "linear-gradient(180deg, #f2f4f8, #dfe4ec)", borderRadius: 3, boxShadow: "0 0 0 3px #3a2c1c" }}>
          <div className="absolute inset-[5px] flex flex-col items-center justify-center rounded-[2px] bg-[#e5446d] text-white">
            <p className="text-[19px] font-extrabold leading-none tracking-[0.04em]">SALE</p>
            <i className="my-[3px] h-px w-[60%] bg-white/70" />
            <p className="text-[6.5px] font-semibold uppercase leading-tight tracking-[0.1em]">Up to 50% off</p>
            <p className="mt-[2px] text-[5px] uppercase tracking-[0.16em] text-white/80">This weekend</p>
          </div>
        </div>
        <div className="absolute" style={{ left: -28, top: -14 - 74, width: 56, height: 74, transformOrigin: "bottom", transform: `rotateX(${-90 - lean}deg)`, background: "#2a2218", borderRadius: 3, boxShadow: "0 0 0 3px #3a2c1c" }} />
      </div>
    </div>
  )
}

/* the point-of-sale terminal with its receipt */
function Pos() {
  return (
    <div className="rt-i1 absolute" style={{ left: 0, top: 0, width: 0, height: 0, ...P3 }}>
      <div className="absolute" style={{ left: -108, top: 40, width: 0, height: 0, ...P3 }}>
        <Box x={0} y={0} w={100} d={64} h={16} front="linear-gradient(180deg, #2b3b57, #17233b)" left="#101a2c" top="linear-gradient(135deg, #3a4d70, #232f4a)"
          fc={<><i className="absolute left-3 top-[5px] h-[3px] w-[26px] rounded-full bg-[#0e9f6e]" /><i className="absolute right-3 top-[5px] h-[3px] w-[14px] rounded-full bg-white/30" /></>}
          tc={<div className="absolute inset-y-[8px] left-[8px] right-[8px] grid grid-cols-4 gap-[2px]">{Array.from({ length: 8 }, (_, k) => <i key={k} className="rounded-[1px] bg-[#0f1a30]/80" />)}</div>}
        />
        <div className="absolute" style={{ left: -44, top: -16 - 56, width: 88, height: 56, transformOrigin: "bottom", transform: "translateZ(16px) rotateX(-74deg)", background: "linear-gradient(180deg, #0c1426, #05080f)", borderRadius: 5, boxShadow: "0 0 0 2px #2b3b57" }}>
          <div className="absolute inset-[4px] flex flex-col items-center justify-center overflow-hidden rounded-[3px] bg-[linear-gradient(160deg,#102a4e,#0a1a36)] text-white">
            <p className="text-[6px] uppercase tracking-[0.18em] text-white/60">Total paid</p>
            <p className="text-[15px] font-semibold leading-none tracking-tight">₹2,450</p>
            <p className="mt-1 flex items-center gap-1 text-[7px] font-semibold text-[#7fdcb8]"><Check className="h-2.5 w-2.5" strokeWidth={4} />Payment received</p>
          </div>
        </div>
        <div className="absolute" style={{ left: 30, top: 8 - 40, width: 30, height: 40, transformOrigin: "bottom", transform: "translateZ(16px) rotateX(-82deg)" }}>
          <div className="rt-print absolute inset-0 bg-white" style={{ boxShadow: "0 2px 6px rgba(0,0,0,.25)", backgroundImage: "repeating-linear-gradient(180deg, transparent 0 4px, rgba(15,42,71,.18) 4px 5px)" }}>
            <p className="px-1 pt-1 text-[4px] font-bold uppercase tracking-[0.1em] text-[#0f2a47]">Boutique</p>
            <p className="px-1 text-[4px] text-[#0f2a47]/70">Total 2,450</p>
          </div>
        </div>
      </div>
    </div>
  )
}

type Bag = { x: number; y: number; w: number; d: number; h: number; c1: string; c2: string; side: string; mark: string; rope: string; k: number; tag?: boolean; tissue?: boolean }
const BAGS: Bag[] = [
  { x: -38, y: 14, w: 64, d: 36, h: 92, c1: "#f8efdc", c2: "#e2cfab", side: "#cdb98f", mark: "#14306a", rope: "#14306a", k: 2, tissue: true },
  { x: 28, y: 22, w: 70, d: 40, h: 114, c1: "#22a0b4", c2: "#0d5c6c", side: "#0b4a57", mark: "#f6d98a", rope: "#f6d98a", k: 3, tag: true },
  { x: 94, y: 14, w: 56, d: 32, h: 80, c1: "#21458a", c2: "#0f2557", side: "#0b1c44", mark: "#f6d98a", rope: "#f6d98a", k: 4, tissue: true },
]

function BagModel({ b }: { b: Bag }) {
  return (
    <div className={`rt-i${b.k} absolute`} style={{ left: 0, top: 0, width: 0, height: 0, ...P3 }}>
      <div className="absolute" style={{ left: b.x, top: b.y, width: 0, height: 0, ...P3 }}>
        <div className="absolute overflow-hidden" style={{ left: -b.w / 2, top: b.d / 2 - b.h, width: b.w, height: b.h, transformOrigin: "bottom", transform: "rotateX(-90deg)", background: `linear-gradient(180deg, ${b.c1}, ${b.c2})`, boxShadow: "inset 0 0 0 1px rgba(0,0,0,.07)" }}>
          <i className="absolute inset-0" style={{ backgroundImage: "repeating-linear-gradient(90deg, rgba(255,255,255,.05) 0 1px, transparent 1px 3px)" }} />
          <i className="absolute inset-x-0 top-0 h-[14px]" style={{ background: "linear-gradient(180deg, rgba(0,0,0,.16), rgba(0,0,0,0))" }} />
          <i className="absolute inset-x-0 bottom-[18px] h-px bg-black/12" />
          <i className="absolute inset-x-0 bottom-[17px] h-px bg-white/30" />
          <i className="absolute left-1/2 top-[28%] h-[24px] w-[24px] -translate-x-1/2 rounded-full" style={{ background: b.mark, opacity: 0.95 }} />
          <i className="absolute left-1/2 top-[28%] h-[10px] w-[10px] -translate-x-1/2 translate-y-[7px] rounded-full" style={{ background: b.c2 }} />
          <p className="absolute inset-x-0 top-[58%] text-center font-mono text-[6.5px] font-bold uppercase tracking-[0.22em]" style={{ color: b.mark }}>Boutique</p>
          <p className="absolute inset-x-0 top-[66%] text-center text-[5px] tracking-[0.14em]" style={{ color: b.mark, opacity: 0.7 }}>EST. 2012</p>
          <i className="absolute inset-0" style={{ background: "linear-gradient(110deg, rgba(255,255,255,.3) 0%, rgba(255,255,255,0) 46%)" }} />
        </div>
        <div className="absolute" style={{ left: -b.w / 2, top: -b.d / 2, width: b.h, height: b.d, transformOrigin: "left", transform: "rotateY(-90deg)", background: `linear-gradient(90deg, ${b.side}, ${b.c2})` }}>
          <i className="absolute inset-y-0 left-1/2 w-px bg-black/22" />
          <i className="absolute inset-y-0 left-[calc(50%+1px)] w-px bg-white/22" />
        </div>
        <div className="absolute" style={{ left: -b.w / 2, top: -b.d / 2, width: b.w, height: b.d, background: "#1a1208", transform: `translateZ(${b.h}px)` }}>
          <i className="absolute inset-[3px]" style={{ background: "linear-gradient(135deg, #3b2c18, #120c04)" }} />
        </div>
        {b.tissue && (
          <>
            <i className="absolute" style={{ left: -b.w * 0.32, top: -3, width: b.w * 0.5, height: 22, background: "linear-gradient(135deg, #ffffff, #e9edf3)", boxShadow: "0 0 0 .5px rgba(0,0,0,.1)", transformOrigin: "bottom", transform: `translateZ(${b.h - 2}px) rotateX(-68deg) rotateZ(-8deg)` }} />
            <i className="absolute" style={{ left: -b.w * 0.06, top: -2, width: b.w * 0.44, height: 26, background: "linear-gradient(135deg, #fff7f0, #f1e2d6)", boxShadow: "0 0 0 .5px rgba(0,0,0,.1)", transformOrigin: "bottom", transform: `translateZ(${b.h - 2}px) rotateX(-62deg) rotateZ(10deg)` }} />
          </>
        )}
        <div className="absolute" style={{ left: 0, top: 0, width: 0, height: 0, ...P3, transform: `translateZ(${b.h}px)` }}>
          <div className="absolute" style={{ left: -b.w * 0.3, top: b.d / 2 - 32, width: b.w * 0.6, height: 32, transformOrigin: "bottom", transform: "rotateX(-90deg)", border: `2.5px solid ${b.rope}`, borderBottom: "none", borderRadius: "44px 44px 0 0" }} />
        </div>
        {b.tag && (
          <div className="absolute" style={{ left: 0, top: 0, width: 0, height: 0, ...P3, transform: `translateZ(${b.h - 10}px)` }}>
            <div className="absolute" style={{ left: -17 + b.w * 0.16, top: b.d / 2 + 1 - 44, width: 34, height: 44, transformOrigin: "bottom", transform: "rotateX(-90deg)" }}>
              <div className="rt-swing absolute inset-0">
                <i className="absolute left-1/2 top-0 h-[14px] w-px bg-[#f6d98a]" />
                <div className="absolute inset-x-0 bottom-0 flex h-[30px] flex-col items-center justify-center rounded-[4px] bg-[#e5446d] text-white" style={{ boxShadow: "0 4px 8px rgba(0,0,0,.3)" }}>
                  <i className="absolute left-1/2 top-[3px] h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-white/80" />
                  <p className="mt-1 text-[11px] font-bold leading-none">40%</p>
                  <p className="text-[6px] font-semibold uppercase leading-none tracking-wider">off</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function GiftBox() {
  const w = 48
  const d = 42
  const h = 36
  return (
    <div className="rt-i5 absolute" style={{ left: 0, top: 0, width: 0, height: 0, ...P3 }}>
      <div className="absolute" style={{ left: 148, top: 24, width: 0, height: 0, ...P3 }}>
        <Box x={0} y={0} w={w} d={d} h={h} front="linear-gradient(180deg, #ef5b84, #c42d5b)" left="linear-gradient(90deg, #8f1d45, #b5254f)" top="linear-gradient(135deg, #f77a9d, #db3f6b)"
          fc={<><i className="absolute inset-y-0 left-1/2 w-[8px] -translate-x-1/2 bg-[#fdf3e0]" /><i className="absolute inset-0" style={{ background: "linear-gradient(110deg, rgba(255,255,255,.28) 0%, rgba(255,255,255,0) 45%)" }} /></>}
          tc={<><i className="absolute inset-y-0 left-1/2 w-[8px] -translate-x-1/2 bg-[#fdf3e0]" /><i className="absolute inset-x-0 top-1/2 h-[8px] -translate-y-1/2 bg-[#fdf3e0]" /></>}
        />
        {[-1, 1].map((s) => <i key={s} className="absolute rounded-full" style={{ left: s * 9 - 8, top: -5, width: 16, height: 10, background: "radial-gradient(circle at 40% 35%, #ffffff, #ead9b9)", transform: `translateZ(${h + 4}px) rotateZ(${s * 28}deg)` }} />)}
        <i className="absolute rounded-full" style={{ left: -4, top: -4, width: 8, height: 8, background: "#ead9b9", transform: `translateZ(${h + 5}px)` }} />
      </div>
    </div>
  )
}

/* a wire shopping basket */
function Basket() {
  const mesh = "repeating-linear-gradient(90deg, rgba(40,52,70,.9) 0 1.4px, transparent 1.4px 6px), repeating-linear-gradient(180deg, rgba(40,52,70,.9) 0 1.4px, transparent 1.4px 6px), linear-gradient(180deg, rgba(255,255,255,.55), rgba(220,228,238,.55))"
  const w = 58
  const d = 38
  const h = 28
  return (
    <div className="rt-i6 absolute" style={{ left: 0, top: 0, width: 0, height: 0, ...P3 }}>
      <div className="absolute" style={{ left: 208, top: 22, width: 0, height: 0, ...P3 }}>
        <Box x={0} y={0} w={w} d={d} h={h} front={mesh} left={mesh} top="#18202c"
          tc={<i className="absolute inset-[2px]" style={{ background: "linear-gradient(135deg, #2c3a50, #0f1622)" }} />}
        />
        {/* a few things inside */}
        <i className="absolute" style={{ left: -16, top: -10, width: 18, height: 14, background: "linear-gradient(135deg, #22a0b4, #0d5c6c)", transform: `translateZ(${h - 6}px)` }} />
        <i className="absolute" style={{ left: 2, top: -4, width: 16, height: 14, background: "linear-gradient(135deg, #f8efdc, #e2cfab)", transform: `translateZ(${h - 4}px)` }} />
        <div className="absolute" style={{ left: 0, top: 0, width: 0, height: 0, ...P3, transform: `translateZ(${h}px)` }}>
          <div className="absolute" style={{ left: -w * 0.34, top: d / 2 - 24, width: w * 0.68, height: 24, transformOrigin: "bottom", transform: "rotateX(-90deg)", border: "3px solid #8a96a8", borderBottom: "none", borderRadius: "40px 40px 0 0" }} />
        </div>
      </div>
    </div>
  )
}

function Shop() {
  return (
    <div className="absolute" style={{ left: 280, top: 376, width: 0, height: 0, ...P3 }}>
      <i className="absolute rounded-[50%] bg-[rgba(15,42,71,.2)] blur-lg" style={{ left: -190, top: -22, width: 380, height: 34 }} />
      <div className="absolute" style={{ left: 0, top: 0, width: 0, height: 0, ...P3, transform: `rotateX(${TILT}deg) rotateZ(${ROT}deg)` }}>
        <div className="rt-sway absolute" style={{ left: 0, top: 0, width: 0, height: 0, ...P3 }}>
          <div className="absolute" style={{ left: 0, top: 0, width: 0, height: 0, ...P3, transform: "translate(-16px, 0) scale(.78)" }}>
            <SaleBoard />
            <Pos />
            {BAGS.map((b) => <BagModel key={b.k} b={b} />)}
            <GiftBox />
            <Basket />
          </div>
        </div>
      </div>
    </div>
  )
}

/* dark notification chips, each tied to its object by a dotted leader line */
function Chips() {
  return (
    <>
      <svg className="absolute inset-0" width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none" aria-hidden>
        {CHIPS.map((c, i) => (
          <g key={c.t}>
            <path className={`rt-l${i}`} d={`M ${c.x + CW / 2} ${c.y + CH} L ${c.ax} ${c.ay}`} pathLength={1} stroke="#0f2a47" strokeOpacity=".55" strokeWidth="1.6" strokeLinecap="round" style={{ strokeDasharray: "0.012 0.02" }} />
            <circle className={`rt-d${i}`} cx={c.ax} cy={c.ay} r="4.5" fill={c.c} stroke="#fff" strokeWidth="2" />
          </g>
        ))}
      </svg>
      {CHIPS.map(({ Icon, c, t, d, ch, x, y }, i) => (
        <div key={t} className={`rt-p${i} absolute`} style={{ left: x, top: y, width: CW }}>
          <div className="rt-float relative overflow-hidden rounded-xl text-white" style={{ animationDelay: `${i * 0.6}s`, background: "linear-gradient(135deg, #14305a, #0b1c3d)", boxShadow: "0 22px 30px -14px rgba(10,24,56,.65), inset 0 0 0 1px rgba(255,255,255,.12)" }}>
            <i className="absolute inset-y-0 left-0 w-[4px]" style={{ background: c }} />
            <div className="flex items-center gap-2.5 px-3.5 py-2.5 pl-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg" style={{ background: c }}><Icon className="h-[18px] w-[18px]" /></span>
              <div className="min-w-0">
                <p className="text-[12.5px] font-semibold leading-tight">{t}</p>
                <p className="mt-0.5 text-[10.5px] leading-snug text-white/65">{d}</p>
              </div>
            </div>
            <p className="absolute bottom-1.5 right-2.5 font-mono text-[7.5px] uppercase tracking-[0.14em] text-white/40">{ch}</p>
          </div>
        </div>
      ))}
    </>
  )
}

export function RetailHero() {
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
  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = box.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty("--px", String(Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width - 0.5) * 2))))
    el.style.setProperty("--py", String(Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height - 0.5) * 2))))
  }
  const leave = () => {
    box.current?.style.setProperty("--px", "0")
    box.current?.style.setProperty("--py", "0")
  }
  return (
    <div ref={box} onPointerMove={move} onPointerLeave={leave} className="relative mx-auto w-full max-w-[560px]" style={{ height: H * k }} role="img" aria-label="A centred 3D shop scene: a sale board, a point-of-sale terminal showing 2,450 rupees paid with a receipt coming out, three paper shopping bags with a red 40 percent off tag swinging from the teal one, a gift box with a ribbon and a wire shopping basket. Four dark notification chips appear one after another above it, each joined to its object by a dotted line: a receipt sent on WhatsApp, loyalty points updated, a flash sale alert, and a birthday offer">
      <div className="absolute left-0 top-0 origin-top-left" style={{ width: W, height: H, transform: `scale(${k})`, perspective: 1500, perspectiveOrigin: "50% 40%" }}>
        <div className="absolute inset-0" style={{ ...P3, transform: "rotateY(calc(var(--px, 0) * 4deg)) rotateX(calc(var(--py, 0) * -3deg))", transition: "transform .25s ease-out" }}>
          <Shop />
        </div>
        <Chips />
      </div>
      <style>{CSS}</style>
    </div>
  )
}
