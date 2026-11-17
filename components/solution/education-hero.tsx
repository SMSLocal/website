"use client"

import { useEffect, useRef, useState } from "react"
import { CalendarCheck, IndianRupee, UserCheck, Video } from "lucide-react"
import type { LucideIcon } from "lucide-react"

// Hero graphic for /solutions/education: a school's books and cap, and four short popups on how SMSLocal helps the school.
// Three hardback books are stacked in isometric 3D (cream page edges, gold-banded spines, a slight twist) with a navy mortarboard and
// gold tassel on top. Around them, four speech-bubble popups appear one after another, each a benefit in plain words: fee reminders,
// exam schedules and results, admission updates, class reminders. The pile drops into place first; the
// popups pop in, hold, and fade as the loop restarts. The scene sways slightly and leans toward the pointer.
// HTML + CSS 3D, silent, 14-second loop.

const W = 560
const H = 440
const ISO = "rotateX(58deg) rotateZ(-38deg) scale(.8)"

const P3 = { transformStyle: "preserve-3d" as const }
const z = (px: number) => ({ transform: `translateZ(${px}px)` })

type Book = { w: number; d: number; h: number; z0: number; rot: number; c1: string; c2: string; dark: string; title: string }
const BOOKS: Book[] = [
  { w: 250, d: 172, h: 36, z0: 0, rot: 0, c1: "#24477a", c2: "#14305a", dark: "#0e2243", title: "Mathematics" },
  { w: 224, d: 156, h: 32, z0: 36, rot: 5, c1: "#1fa07a", c2: "#0e7556", dark: "#0a5a43", title: "Science" },
  { w: 200, d: 140, h: 28, z0: 68, rot: -4, c1: "#d99524", c2: "#b3730f", dark: "#8a550a", title: "English" },
]
const CAP_Z = 96

type Pop = { Icon: LucideIcon; c: string; t: string; d: string; x: number; y: number; tail: string }
const POPS: Pop[] = [
  { Icon: IndianRupee, c: "#d98a0b", t: "Fee reminders", d: "Due-date alerts with a UPI pay link", x: 4, y: 22, tail: "-bottom-1.5 right-10" },
  { Icon: CalendarCheck, c: "#0e9f6e", t: "Exam schedules and results", d: "Sent in one go, on SMS or WhatsApp", x: 330, y: 12, tail: "-bottom-1.5 left-10" },
  { Icon: UserCheck, c: "#0f2a47", t: "Admission updates", d: "Application status sent to every applicant", x: 4, y: 338, tail: "-top-1.5 right-10" },
  { Icon: Video, c: "#2f78bd", t: "Class reminders", d: "Students get a nudge before every live class", x: 330, y: 352, tail: "-top-1.5 left-10" },
]

const CSS = `
${BOOKS.map((b, i) => {
  const a = 3 + i * 8
  return `@keyframes ed-b${i} { 0%, ${a - 0.1}% { transform: translateZ(240px); visibility: hidden } ${a}% { transform: translateZ(240px); visibility: visible } ${a + 6}%, 94% { transform: translateZ(0); visibility: visible } 97% { transform: translateZ(50px); visibility: visible } 97.5%, 100% { transform: translateZ(50px); visibility: hidden } }
.ed-b${i} { transform: translateZ(240px); visibility: hidden; animation: ed-b${i} 14s cubic-bezier(.3,.95,.3,1) infinite }`
}).join(" ")}
@keyframes ed-cap { 0%, 26% { transform: translateZ(260px); visibility: hidden } 26.1% { transform: translateZ(260px); visibility: visible } 33%, 94% { transform: translateZ(0); visibility: visible } 97% { transform: translateZ(50px); visibility: visible } 97.5%, 100% { transform: translateZ(50px); visibility: hidden } }
.ed-cap { transform: translateZ(260px); visibility: hidden; animation: ed-cap 14s cubic-bezier(.3,1.1,.3,1) infinite }
${POPS.map((_, i) => {
  const a = 34 + i * 14
  return `@keyframes ed-p${i} { 0%, ${a}% { opacity: 0; transform: scale(.5) translateY(14px) } ${a + 4}% { opacity: 1; transform: scale(1.05) } ${a + 6}%, 93% { opacity: 1; transform: none } 97%, 100% { opacity: 0; transform: scale(.9) } }
.ed-p${i} { opacity: 0; transform-origin: 50% 100%; animation: ed-p${i} 14s cubic-bezier(.3,1.2,.4,1) infinite }`
}).join(" ")}
@keyframes ed-float { 0%, 100% { translate: 0 -3px } 50% { translate: 0 4px } }
.ed-float { animation: ed-float 5s ease-in-out infinite }
@keyframes ed-sway { 0%, 100% { transform: rotateZ(-2.5deg) } 50% { transform: rotateZ(2.5deg) } }
.ed-sway { animation: ed-sway 10s ease-in-out infinite }
@media (prefers-reduced-motion: reduce) {
  .ed-sway, .ed-float { animation: none }
  [class*="ed-b"], .ed-cap { animation: none; visibility: visible; transform: none }
  [class*="ed-p"] { animation: none; opacity: 1; transform: none }
}
`

function BookBox({ w, d, h, z0, rot, c1, c2, dark, title }: Book) {
  return (
    <div className="absolute" style={{ left: 0, top: 0, width: 0, height: 0, ...P3, transform: `translateZ(${z0}px) rotateZ(${rot}deg)` }}>
      <div className="absolute overflow-hidden" style={{ left: -w / 2, top: d / 2 - h, width: w, height: h, transformOrigin: "bottom", transform: "rotateX(-90deg)", background: `linear-gradient(180deg, ${c2} 0 5px, transparent 5px calc(100% - 5px), ${c2} calc(100% - 5px)), repeating-linear-gradient(180deg, #f6f1e5 0 2px, #e2d9c6 2px 3px)` }} />
      <div className="absolute flex items-center justify-center overflow-hidden" style={{ left: -w / 2, top: -d / 2, width: h, height: d, transformOrigin: "left", transform: "rotateY(-90deg)", background: `linear-gradient(90deg, ${dark}, ${c2})` }}>
        <i className="absolute inset-x-0 top-[14px] h-[3px] bg-[#f3cf7a]/90" />
        <i className="absolute inset-x-0 bottom-[14px] h-[3px] bg-[#f3cf7a]/90" />
        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-white/85" style={{ writingMode: "vertical-rl" }}>{title}</span>
      </div>
      <div className="absolute" style={{ left: -w / 2, top: -d / 2, width: w, height: d, background: `linear-gradient(135deg, ${c1}, ${c2})`, boxShadow: "inset 0 0 0 3px rgba(255,255,255,.16)", transform: `translateZ(${h}px)` }}>
        <i className="absolute rounded-[3px]" style={{ left: 22, top: 22, right: 22, bottom: 22, boxShadow: "inset 0 0 0 1.5px rgba(243,207,122,.7)" }} />
      </div>
    </div>
  )
}

function Disc({ r, z0, bg }: { r: number; z0: number; bg: string }) {
  return <i className="absolute rounded-full" style={{ left: -r, top: -r, width: r * 2, height: r * 2, background: bg, boxShadow: "0 0 0 .6px rgba(0,0,0,.18)", transform: `translateZ(${z0}px)` }} />
}

function Mortarboard() {
  const S = 132
  return (
    <div className="absolute" style={{ left: 0, top: 0, width: 0, height: 0, ...P3, transform: `translateZ(${CAP_Z}px) rotateZ(14deg)` }}>
      {Array.from({ length: 9 }, (_, k) => <Disc key={k} r={38} z0={k * 3} bg={k > 5 ? "#0d2240" : "linear-gradient(135deg, #1c3a66, #0f2a47)"} />)}
      {[27, 29, 31, 33].map((zz) => <i key={zz} className="absolute" style={{ left: -S / 2, top: -S / 2, width: S, height: S, background: "#0c2140", boxShadow: "0 0 0 .6px rgba(0,0,0,.25)", transform: `translateZ(${zz}px)` }} />)}
      <i className="absolute" style={{ left: -S / 2, top: -S / 2, width: S, height: S, background: "linear-gradient(135deg, #34609f, #1b3c6c 55%, #15325c)", boxShadow: "inset 0 0 0 2px rgba(255,255,255,.18)", transform: "translateZ(35px)" }} />
      {[0, 3].map((k) => <Disc key={k} r={7} z0={35 + k} bg="linear-gradient(135deg, #f7d27a, #d79a1b)" />)}
      <Disc r={7} z0={39} bg="linear-gradient(135deg, #ffe7a3, #e8b13a)" />
      <i className="absolute rounded-full" style={{ left: 0, top: -1.2, width: S * 0.66, height: 2.4, background: "#e8b13a", transformOrigin: "left center", transform: "translateZ(37px) rotateZ(45deg)" }} />
      {Array.from({ length: 11 }, (_, k) => (
        <div key={k} className="absolute" style={{ left: S * 0.46, top: S * 0.46, width: 0, height: 0, ...P3 }}><Disc r={2.2} z0={37 - k * 3} bg="#e8b13a" /></div>
      ))}
      {Array.from({ length: 7 }, (_, k) => (
        <div key={`t${k}`} className="absolute" style={{ left: S * 0.46, top: S * 0.46, width: 0, height: 0, ...P3 }}><Disc r={5} z0={4 - k * 3} bg="linear-gradient(135deg, #f7d27a, #d79a1b)" /></div>
      ))}
    </div>
  )
}

function Scene() {
  return (
    <div className="absolute inset-0" style={{ ...P3, transform: "rotateY(calc(var(--px, 0) * 5deg)) rotateX(calc(var(--py, 0) * -3deg))", transition: "transform .25s ease-out" }}>
      <i className="absolute rounded-[50%] bg-[rgba(15,42,71,.16)] blur-xl" style={{ left: 140, top: 366, width: 280, height: 30 }} />
      <div className="absolute" style={{ left: 280, top: 262, width: 0, height: 0, ...P3 }}>
        <div className="absolute" style={{ left: 0, top: 0, width: 0, height: 0, ...P3, transform: ISO }}>
          <div className="ed-sway absolute" style={{ left: 0, top: 0, width: 0, height: 0, ...P3 }}>
            <i className="absolute rounded-[26px] bg-white ring-1 ring-[#0f2a47]/[0.07]" style={{ left: -190, top: -136, width: 380, height: 272, boxShadow: "0 40px 50px -30px rgba(15,42,71,.45)", transform: "translateZ(-5px)" }} />
            <i className="absolute rounded-[20px]" style={{ left: -176, top: -122, width: 352, height: 244, background: "linear-gradient(135deg, #eef3f9, #dbe6f1)", transform: "translateZ(-4px)" }} />
            {BOOKS.map((b, i) => (
              <div key={b.title} className={`ed-b${i} absolute`} style={{ left: 0, top: 0, width: 0, height: 0, ...P3 }}><BookBox {...b} /></div>
            ))}
            <div className="ed-cap absolute" style={{ left: 0, top: 0, width: 0, height: 0, ...P3 }}><Mortarboard /></div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Popups() {
  return (
    <>
      {POPS.map(({ Icon, c, t, d, x, y, tail }, i) => (
        <div key={t} className={`ed-p${i} absolute`} style={{ left: x, top: y, width: 226 }}>
          <div className="ed-float relative flex items-center gap-3 rounded-2xl bg-white px-3.5 py-3" style={{ animationDelay: `${i * 0.7}s`, boxShadow: "0 22px 32px -14px rgba(15,42,71,.5), inset 0 0 0 1px rgba(15,42,71,.07)" }}>
            <i className={`absolute h-3.5 w-3.5 rotate-45 rounded-[3px] bg-white ${tail}`} />
            <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white" style={{ background: c }}><Icon className="h-5 w-5" /></span>
            <div className="relative min-w-0">
              <p className="text-[14px] font-semibold leading-tight text-[#0f2a47]">{t}</p>
              <p className="mt-0.5 text-[11.5px] leading-snug text-[#0f2a47]/60">{d}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export function EducationHero() {
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
    <div ref={box} onPointerMove={move} onPointerLeave={leave} className="relative mx-auto w-full max-w-[560px]" style={{ height: H * k }} role="img" aria-label="A stack of three schoolbooks with a graduation cap on top, and four short popups on how SMSLocal helps a school: fee reminders with a UPI pay link, exam schedules and results sent in one go on SMS or WhatsApp, admission updates sent to every applicant, and class reminders before every live class">
      <div className="absolute left-0 top-0 origin-top-left" style={{ width: W, height: H, transform: `scale(${k})`, perspective: 1600, perspectiveOrigin: "50% 40%" }}>
        <Scene />
        <Popups />
      </div>
      <style>{CSS}</style>
    </div>
  )
}
