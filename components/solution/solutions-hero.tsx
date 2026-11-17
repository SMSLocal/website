"use client"

import { useEffect, useRef, useState } from "react"
import {
  Building2,
  GraduationCap,
  HeartPulse,
  Landmark,
  Lock,
  ShoppingBag,
  Signal,
  Store,
  Truck,
  Wifi,
  BatteryFull,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

// Hero graphic for /solutions: one phone's lock screen, receiving the messages of seven industries. No orbits, no popups.
// A phone floats on a soft glow. On its lock screen, notifications from seven different businesses arrive one after another: a bank's OTP,
// an order on its way, a clinic's appointment reminder, a school's fee notice, a parcel's delivery code, a property visit and loyalty
// points. Each has its own colour, icon and sender. It shows in one look what the page is: one platform that carries every industry's
// messages. The phone floats and leans toward the pointer. HTML + CSS 3D, silent, looping.

const W = 560
const H = 480
const LOOP = 20

const P3 = { transformStyle: "preserve-3d" as const }

type Note = { app: string; Icon: LucideIcon; c: string; msg: string }
const NOTES: Note[] = [
  { app: "NorthBank", Icon: Landmark, c: "#0ea5e9", msg: "482913 is your login OTP" },
  { app: "ShopEasy", Icon: ShoppingBag, c: "#10b981", msg: "Order #1042 is out for delivery" },
  { app: "CityClinic", Icon: HeartPulse, c: "#f43f5e", msg: "Appointment tomorrow, 10:30 AM" },
  { app: "BrightSchool", Icon: GraduationCap, c: "#f59e0b", msg: "Term 2 fee is due on 5 Dec" },
  { app: "FastShip", Icon: Truck, c: "#6366f1", msg: "Parcel arrives today. OTP 7041" },
  { app: "HomeNest", Icon: Building2, c: "#14b8a6", msg: "Site visit confirmed, Sat 11 AM" },
  { app: "StyleHub", Icon: Store, c: "#d946ef", msg: "You earned 120 loyalty points" },
]

const CSS = `
${NOTES.map((_, i) => {
  const a = 3 + i * 9.5
  return `@keyframes so-n${i} { 0%, ${a}% { opacity: 0; transform: translateY(-14px) scale(.96) } ${a + 3}%, 93% { opacity: 1; transform: translateY(0) scale(1) } 97%, 100% { opacity: 0; transform: translateY(0) scale(1) } }
.so-n${i} { opacity: 0; will-change: transform, opacity; animation: so-n${i} ${LOOP}s cubic-bezier(.2,.8,.25,1) infinite }`
}).join("\n")}
@keyframes so-hover { 0%, 100% { translate: 0 0 } 50% { translate: 0 -7px } }
.so-hover { animation: so-hover 6s ease-in-out infinite }
@media (prefers-reduced-motion: reduce) {
  [class*="so-n"] { animation: none; opacity: 1; transform: none }
  .so-hover { animation: none }
}
`

function Phone() {
  const PW = 262
  const PH = 470
  return (
    <div className="absolute" style={{ left: -PW / 2, top: -PH / 2, width: PW, height: PH }}>
      {[{ t: 82, h: 22, s: "l" }, { t: 120, h: 40, s: "l" }, { t: 170, h: 40, s: "l" }, { t: 136, h: 66, s: "r" }].map((b, i) => (
        <i key={i} className="absolute rounded-sm" style={{ [b.s === "l" ? "left" : "right"]: -3, top: b.t, width: 4, height: b.h, background: "linear-gradient(90deg, #7d8896, #c9d1db, #7d8896)", boxShadow: "0 1px 2px rgba(15,42,71,.35)" }} />
      ))}
      <div className="absolute inset-0 overflow-hidden" style={{ borderRadius: 42, background: "linear-gradient(145deg, #e4e9f0, #8f9aa9 45%, #c7cfda)", padding: 2.5, boxShadow: "0 50px 70px -28px rgba(15,42,71,.6), 0 0 0 1px rgba(15,42,71,.25)" }}>
        <div className="h-full w-full overflow-hidden" style={{ borderRadius: 39.5, background: "#0b1626", padding: 5 }}>
          <div className="relative h-full w-full overflow-hidden" style={{ borderRadius: 35, background: "linear-gradient(165deg, #0f2a47 0%, #0b6b5a 52%, #19b37f 100%)" }}>
            <i className="absolute -left-10 top-40 h-52 w-52 rounded-full bg-white/10" />
            <i className="absolute -right-12 bottom-24 h-60 w-60 rounded-full bg-white/10" />
            {/* status bar */}
            <i className="absolute left-1/2 top-2.5 z-20 h-[16px] w-[60px] -translate-x-1/2 rounded-full bg-[#0b1626]" />
            <div className="absolute inset-x-6 top-[9px] z-20 flex items-center justify-between text-white">
              <span className="text-[11px] font-semibold leading-none">9:41</span>
              <span className="flex items-center gap-1"><Signal className="h-[11px] w-[11px]" /><Wifi className="h-[11px] w-[11px]" /><BatteryFull className="h-[13px] w-[13px]" /></span>
            </div>
            {/* lock screen clock */}
            <div className="absolute inset-x-0 top-8 text-center text-white">
              <Lock className="mx-auto h-3.5 w-3.5 text-white/80" />
              <p className="mt-1 text-[11px] font-medium text-white/80">Tuesday, 17 November</p>
              <p className="-mt-0.5 text-[50px] font-light leading-none tracking-tight">9:41</p>
            </div>
            {/* notifications */}
            <div className="absolute inset-x-2.5 top-[138px] space-y-[5px]">
              {NOTES.map((n, i) => (
                <div key={n.app} className={`so-n${i} flex items-center gap-2 rounded-[14px] bg-white/85 px-2 py-[6px] shadow-[0_6px_14px_-8px_rgba(0,0,0,.5)] backdrop-blur`}>
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] text-white" style={{ background: n.c }}><n.Icon className="h-[15px] w-[15px]" /></span>
                  <span className="min-w-0 flex-1 leading-tight">
                    <span className="flex items-center justify-between gap-2">
                      <span className="text-[10.5px] font-semibold text-[#0f2a47]">{n.app}</span>
                      <span className="text-[8.5px] text-[#0f2a47]/50">now</span>
                    </span>
                    <span className="mt-px block text-[10px] leading-snug text-[#0f2a47]/80">{n.msg}</span>
                  </span>
                </div>
              ))}
            </div>
            <i className="absolute bottom-2 left-1/2 h-1 w-[96px] -translate-x-1/2 rounded-full bg-white/85" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function SolutionsHero() {
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
    <div ref={box} onPointerMove={move} onPointerLeave={leave} className="relative mx-auto w-full max-w-[560px]" style={{ height: H * k }} role="img" aria-label="A phone lock screen receiving messages from seven industries one after another: a bank's login OTP, an e-commerce order out for delivery, a clinic's appointment reminder, a school's fee notice, a parcel's delivery code, a property site visit and retail loyalty points">
      <div className="absolute left-0 top-0 origin-top-left" style={{ width: W, height: H, transform: `scale(${k})`, perspective: 1600, perspectiveOrigin: "50% 40%" }}>
        <div className="absolute inset-0" style={{ ...P3, transform: "rotateY(calc(var(--px, 0) * 5deg)) rotateX(calc(var(--py, 0) * -4deg))", transition: "transform .25s ease-out" }}>
          <i className="absolute rounded-full" style={{ left: 280 - 250, top: 240 - 250, width: 500, height: 500, background: "radial-gradient(circle, rgba(14,159,110,.3), rgba(14,159,110,0) 64%)", transform: "translateZ(-180px) scale(1.2)" }} />
          <i className="absolute rounded-full" style={{ left: 80, top: 150, width: 380, height: 380, background: "radial-gradient(circle, rgba(47,120,189,.18), rgba(47,120,189,0) 66%)", transform: "translateZ(-180px) scale(1.2)" }} />
          <div className="absolute" style={{ left: 280, top: 240, width: 0, height: 0, ...P3 }}>
            <div className="so-hover absolute" style={{ left: 0, top: 0, width: 0, height: 0, ...P3 }}>
              <div className="absolute" style={{ left: 0, top: 0, width: 0, height: 0, ...P3, transform: "rotateY(-12deg) rotateZ(2deg)" }}><Phone /></div>
            </div>
          </div>
        </div>
      </div>
      <style>{CSS}</style>
    </div>
  )
}
