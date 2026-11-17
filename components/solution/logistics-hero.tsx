"use client"

import { useEffect, useRef, useState } from "react"
import { Bot, KeyRound, Navigation, Package } from "lucide-react"
import type { LucideIcon } from "lucide-react"

// Hero graphic for /solutions/logistics: a sorting-hub conveyor where every scan sends a message.
// A conveyor belt runs up the scene in isometric 3D, from one tunnel to another, with its rollers visibly moving. Kraft parcels with
// tape and a shipping label ride it one after another. In the middle stands a navy scanner arch with a green scan strip. As each parcel
// passes through the arch, a message goes out and a speech bubble opens above it: order dispatched, out for delivery with a tracking
// link, delivery OTP sent. A note in the corner says what it means: every scan sends a message, with no manual step.
// The parcels loop forever. The scene leans toward the pointer. HTML + CSS 3D, silent, 12-second loop. The AWB, link and OTP are samples.

const W = 560
const H = 440
const ROT = -38
const TILT = 58
const SC = 0.86
const CX = 280
const CY = 292
const REACH = 262 // how far the parcels travel each way along the belt

const P3 = { transformStyle: "preserve-3d" as const }
const POPS: { Icon: LucideIcon; c: string; t: string; d: string; x: number; y: number; tail: string }[] = [
  { Icon: Package, c: "#2f78bd", t: "Order dispatched", d: "Customer gets the delivery window", x: 4, y: 6, tail: "-bottom-1.5 right-12" },
  { Icon: Navigation, c: "#0e9f6e", t: "Out for delivery", d: "Live tracking, no calls to the hub", x: 324, y: 6, tail: "-bottom-1.5 left-12" },
  { Icon: KeyRound, c: "#0f2a47", t: "Delivery OTP", d: "Priority route, lands even at night", x: 4, y: 98, tail: "-bottom-1.5 right-12" },
  { Icon: Bot, c: "#1a8f86", t: "Drivers reply in their language", d: "WhatsApp, 8 Indian languages", x: 324, y: 98, tail: "-bottom-1.5 left-12" },
]

const KR = { front: "linear-gradient(180deg, #dcae72, #c4924f)", left: "linear-gradient(90deg, #a8763a, #b9853f)", top: "linear-gradient(135deg, #ecc58e, #dcae72)" }

const CSS = `
@keyframes lg-belt { to { background-position: 44px 0 } }
.lg-belt { animation: lg-belt 1.1s linear infinite }
${[0, 1, 2].map((i) => `@keyframes lg-pk { from { transform: translate3d(${-REACH}px, 0, 14px) } to { transform: translate3d(${REACH}px, 0, 14px) } }
.lg-pk${i} { animation: lg-pk 12s linear ${-4 * i}s infinite }`).join(" ")}
${POPS.map((_, i) => {
  const a = 14 + i * 16
  return `@keyframes lg-m${i} { 0%, ${a}% { opacity: 0; transform: scale(.5) translateY(14px) } ${a + 4}% { opacity: 1; transform: scale(1.05) } ${a + 6}%, 93% { opacity: 1; transform: none } 97%, 100% { opacity: 0; transform: scale(.92) } }
.lg-m${i} { opacity: 0; transform-origin: 50% 100%; animation: lg-m${i} 12s cubic-bezier(.3,1.2,.4,1) infinite }`
}).join(" ")}
@keyframes lg-scan { 0%, 100% { opacity: .3 } 50% { opacity: 1 } }
@keyframes lg-curtain { 0%, 100% { opacity: .35 } 50% { opacity: 1 } }
.lg-curtain { animation: lg-curtain 1.5s ease-in-out infinite }
.lg-scan { animation: lg-scan 1.5s ease-in-out infinite }
@keyframes lg-float { 0%, 100% { translate: 0 -3px } 50% { translate: 0 4px } }
.lg-float { animation: lg-float 5s ease-in-out infinite }
@keyframes lg-in { from { opacity: 0; transform: translateY(-10px) } to { opacity: 1; transform: none } }
.lg-in { animation: lg-in .9s cubic-bezier(.2,.8,.2,1) .4s both }
@media (prefers-reduced-motion: reduce) {
  .lg-belt, .lg-scan, .lg-curtain, .lg-float, .lg-in { animation: none }
  .lg-pk0 { animation: none; transform: translate3d(-150px, 0, 14px) } .lg-pk1 { animation: none; transform: translate3d(40px, 0, 14px) } .lg-pk2 { animation: none; transform: translate3d(190px, 0, 14px) }
  [class*="lg-m"] { animation: none; opacity: 1; transform: none }
}
`

type BoxProps = { x: number; y: number; w: number; d: number; h: number; z0?: number; front: string; left: string; top: string; fc?: React.ReactNode; tc?: React.ReactNode }
function Box({ x, y, w, d, h, z0 = 0, front, left, top, fc, tc }: BoxProps) {
  return (
    <div className="absolute" style={{ left: x, top: y, width: 0, height: 0, ...P3, transform: `translateZ(${z0}px)` }}>
      <div className="absolute overflow-hidden" style={{ left: -w / 2, top: d / 2 - h, width: w, height: h, transformOrigin: "bottom", transform: "rotateX(-90deg)", background: front }}>{fc}</div>
      <div className="absolute" style={{ left: -w / 2, top: -d / 2, width: h, height: d, transformOrigin: "left", transform: "rotateY(-90deg)", background: left }} />
      <div className="absolute overflow-hidden" style={{ left: -w / 2, top: -d / 2, width: w, height: d, background: top, transform: `translateZ(${h}px)` }}>{tc}</div>
    </div>
  )
}

function Parcel({ i }: { i: number }) {
  const w = 66
  const d = 52
  const h = 44
  return (
    <div className={`lg-pk${i} absolute`} style={{ left: 0, top: 0, width: 0, height: 0, ...P3 }}>
      <Box x={0} y={0} w={w} d={d} h={h} front={KR.front} left={KR.left} top={KR.top}
        fc={
          <>
            <i className="absolute left-1/2 top-0 h-[44%] w-[11px] -translate-x-1/2 bg-[#efe0bf]" />
            <i className="absolute rounded-[1px] bg-white" style={{ left: 7, bottom: 6, width: 30, height: 17 }}><i className="mx-[4px] mt-[4px] block h-[9px]" style={{ background: "repeating-linear-gradient(90deg, #0f2a47 0 1px, transparent 1px 3px)" }} /></i>
          </>
        }
        tc={<i className="absolute inset-y-0 left-1/2 w-[11px] -translate-x-1/2 bg-[#efe0bf]" />}
      />
    </div>
  )
}

function Scene() {
  const stripe = "linear-gradient(90deg, #0e9f6e, #3fcf9d)"
  return (
    <div className="absolute inset-0" style={{ ...P3, transform: "rotateY(calc(var(--px, 0) * 5deg)) rotateX(calc(var(--py, 0) * -3deg))", transition: "transform .25s ease-out" }}>
      <i className="absolute rounded-[50%] bg-[rgba(15,42,71,.14)] blur-xl" style={{ left: 60, top: 376, width: 440, height: 30 }} />
      <div className="absolute" style={{ left: CX, top: CY, width: 0, height: 0, ...P3 }}>
        <div className="absolute" style={{ left: 0, top: 0, width: 0, height: 0, ...P3, transform: `rotateX(${TILT}deg) rotateZ(${ROT}deg) scale(${SC})` }}>
          {/* floor */}
          <i className="absolute rounded-[28px] bg-white ring-1 ring-[#0f2a47]/[0.07]" style={{ left: -276, top: -118, width: 552, height: 236, boxShadow: "0 40px 50px -30px rgba(15,42,71,.45)", transform: "translateZ(-6px)" }} />
          <i className="absolute rounded-[22px]" style={{ left: -262, top: -104, width: 524, height: 208, background: "linear-gradient(135deg, #eef3f9, #dbe6f1)", transform: "translateZ(-5px)" }} />

          {/* the belt: a low frame, rails, and a moving roller surface */}
          <Box x={0} y={0} w={500} d={92} h={12} front="#2b3a4f" left="#222f42" top="#1d2838"
            tc={<i className="lg-belt absolute inset-[9px] rounded-[3px]" style={{ background: "repeating-linear-gradient(90deg, #4a586c 0 18px, #3a4658 18px 22px)", backgroundSize: "44px 100%" }} />}
          />
          <Box x={0} y={-47} w={500} d={6} h={20} front="#7d8da3" left="#6a7a90" top="#9aa8bb" />
          <Box x={0} y={47} w={500} d={6} h={20} front="#7d8da3" left="#6a7a90" top="#9aa8bb" />

          {/* the parcels */}
          {[0, 1, 2].map((i) => <Parcel key={i} i={i} />)}

          {/* tunnel hoods at both ends hide the parcels as they enter and leave */}
          <Box x={-236} y={0} w={64} d={108} h={78} front="linear-gradient(180deg, #1d3a63, #14284a)" left="#0f2038" top="#223f6a" fc={<i className="absolute inset-x-0 top-0 h-[6px]" style={{ background: stripe }} />} tc={<i className="absolute inset-x-0 top-0 h-[6px]" style={{ background: stripe }} />} />
          <Box x={236} y={0} w={64} d={108} h={78} front="linear-gradient(180deg, #1d3a63, #14284a)" left="#0f2038" top="#223f6a" fc={<i className="absolute inset-x-0 top-0 h-[6px]" style={{ background: stripe }} />} tc={<i className="absolute inset-x-0 top-0 h-[6px]" style={{ background: stripe }} />} />

          {/* the scan curtain inside the arch */}
          <div className="lg-curtain absolute" style={{ left: 0, top: -48, width: 84, height: 96, transformOrigin: "left", transform: "translateZ(12px) rotateY(-90deg)", background: "linear-gradient(180deg, rgba(14,159,110,0), rgba(14,159,110,.45))" }} />
          {/* the scanner arch */}
          <Box x={0} y={-56} w={16} d={16} h={92} front="linear-gradient(180deg, #223f6a, #14284a)" left="#0f2038" top="#2c4d7e" />
          <Box x={0} y={56} w={16} d={16} h={92} front="linear-gradient(180deg, #223f6a, #14284a)" left="#0f2038" top="#2c4d7e" />
          <Box x={0} y={0} w={20} d={128} h={16} z0={90} front="linear-gradient(180deg, #2c4d7e, #14284a)" left="#0f2038" top="#2f5486"
            tc={<i className="lg-scan absolute inset-x-0 top-1/2 h-[6px] -translate-y-1/2 bg-[#0e9f6e]" />}
          />
        </div>
      </div>
    </div>
  )
}

function Overlay() {
  return (
    <>
      {POPS.map(({ Icon, c, t, d, x, y, tail }, i) => (
        <div key={t} className={`lg-m${i} absolute`} style={{ left: x, top: y, width: 232 }}>
          <div className="lg-float relative flex items-center gap-3 rounded-2xl bg-white px-3.5 py-3" style={{ animationDelay: `${i * 0.7}s`, boxShadow: "0 22px 32px -14px rgba(15,42,71,.5), inset 0 0 0 1px rgba(15,42,71,.07)" }}>
            <i className={`absolute h-3.5 w-3.5 rotate-45 rounded-[3px] bg-white ${tail}`} />
            <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white" style={{ background: c }}><Icon className="h-5 w-5" /></span>
            <div className="relative min-w-0">
              <p className="font-mono text-[9.5px] font-semibold uppercase tracking-[0.18em] text-[#0b7a55]">Step {i + 1}</p>
              <p className="text-[13.5px] font-semibold leading-tight text-[#0f2a47]">{t}</p>
              <p className="mt-0.5 text-[11px] leading-snug text-[#0f2a47]/60">{d}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export function LogisticsHero() {
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
    <div ref={box} onPointerMove={move} onPointerLeave={leave} className="relative mx-auto w-full max-w-[560px]" style={{ height: H * k }} role="img" aria-label="A sorting-hub conveyor belt carries parcels through a scanner arch. As each parcel passes, a message goes out and a bubble opens: order dispatched, out for delivery with a tracking link, and delivery OTP sent. A note says every scan sends a message with no manual step">
      <div className="absolute left-0 top-0 origin-top-left" style={{ width: W, height: H, transform: `scale(${k})`, perspective: 1600, perspectiveOrigin: "50% 40%" }}>
        <Scene />
        <Overlay />
      </div>
      <style>{CSS}</style>
    </div>
  )
}
