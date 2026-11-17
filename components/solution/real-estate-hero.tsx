"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { CalendarCheck, MapPin, Send } from "lucide-react"
import type { LucideIcon } from "lucide-react"

// Hero graphic for /solutions/real-estate: a night-time residential skyline, turning slowly, and the messages that sell it.
// A cluster of four glass towers in true 3D, with four sides each, mullioned glass and warm lit windows. The
// camera turns slowly around them. The windows light up from the ground floor to the roof, one tower after another. A green scan ring
// climbs the main tower, and soft rings pulse out from its base like alerts going out to buyers. Three small glass tags appear one
// after another beside the tower: an alert to matching buyers, the brochure shared, help with booking. No photo, no land,
// no popup grid. The scene also leans toward the pointer. HTML + CSS 3D, silent, 15-second loop; the camera turn is slow and endless.

const W = 560
const H = 440
const LOOP = 15
const TILT = 60

const P3 = { transformStyle: "preserve-3d" as const }

// a small seeded random so the lit windows are the same on the server and in the browser
const rng = (seed: number) => () => {
  seed = (seed * 1664525 + 1013904223) % 4294967296
  return seed / 4294967296
}

type Tower = { x: number; y: number; s: number; h: number; delay: number; seed: number; g: [string, string, string]; rim: string; kind: "block" | "twist" | "terrace"; step?: number }
const TOWERS: Tower[] = [
  { x: 0, y: 0, s: 78, h: 250, delay: 0, seed: 11, g: ["#8fd3e6", "#2f86b4", "#143f6b"], rim: "#f4e6c8", kind: "block" },
  { x: -90, y: 32, s: 62, h: 168, delay: 1.2, seed: 23, g: ["#9fb4f2", "#4a66c4", "#1f2f78"], rim: "#f4e6c8", kind: "block" },
  { x: 86, y: 28, s: 58, h: 130, delay: 2.2, seed: 37, g: ["#8ee0c4", "#2a9a86", "#0f4d57"], rim: "#f4e6c8", kind: "block" },
  { x: 24, y: 104, s: 44, h: 74, delay: 3, seed: 53, g: ["#c7d3e6", "#6f86ab", "#2c3e63"], rim: "#f4e6c8", kind: "block" },
]

const SHADE = [0, 0.2, 0.46, 0.26]

const TAGS: { Icon: LucideIcon; c: string; t: string; d: string; x: number; y: number; tail: string }[] = [
  { Icon: Send, c: "#2f78bd", t: "Alert to matching buyers", d: "By area, budget and BHK", x: 2, y: 10, tail: "-bottom-1.5 right-10" },
  { Icon: MapPin, c: "#7c5cf0", t: "Asks the buyer's location", d: "Saved from WhatsApp, in their language", x: 2, y: 232, tail: "top-1/2 -right-1.5 -translate-y-1/2" },
  { Icon: CalendarCheck, c: "#0e9f6e", t: "Assists with booking", d: "Guides the buyer to a visit slot", x: 394, y: 56, tail: "-bottom-1.5 left-10" },
]

const CSS = `
@keyframes re-spin { to { transform: rotateZ(360deg) } }
.re-spin { will-change: transform; animation: re-spin 60s linear infinite }
@keyframes re-lit { 0%, 3% { clip-path: inset(100% 0 0 0) } 30%, 92% { clip-path: inset(0 0 0 0) } 98%, 100% { clip-path: inset(100% 0 0 0) } }
.re-lit { clip-path: inset(100% 0 0 0); animation: re-lit ${LOOP}s ease-in-out infinite }
@keyframes re-flit { 0%, 3% { opacity: 0 } 18%, 92% { opacity: 1 } 98%, 100% { opacity: 0 } }
.re-flit { opacity: 0; animation: re-flit ${LOOP}s ease-in-out infinite }
@keyframes re-scan { 0%, 30% { transform: translateZ(0); opacity: 0 } 36% { opacity: .95 } 62% { transform: translateZ(252px); opacity: .95 } 68%, 100% { transform: translateZ(252px); opacity: 0 } }
.re-scan { opacity: 0; animation: re-scan ${LOOP}s cubic-bezier(.45,.05,.4,1) infinite }
@keyframes re-ping { 0% { opacity: .7; transform: scale(.35) } 100% { opacity: 0; transform: scale(1.55) } }
.re-ping { will-change: transform, opacity; animation: re-ping 4.5s cubic-bezier(.2,.6,.3,1) infinite }
@keyframes re-beacon { 0%, 100% { opacity: .35 } 50% { opacity: 1 } }
.re-beacon { animation: re-beacon 1.6s ease-in-out infinite }
${[0, 1, 2, 3].map((_, i) => {
  const a = 3.333 + i * 3.333
  return `@keyframes re-t${i} { 0%, ${a}% { opacity: 0; transform: translateY(12px) scale(.96) } ${a + 2.667}% { opacity: 1; transform: translateY(0) scale(1) } 91% { opacity: 1; transform: translateY(0) scale(1) } 97%, 100% { opacity: 0; transform: translateY(-4px) scale(.98) } }
.re-t${i} { opacity: 0; will-change: transform, opacity; animation: re-t${i} ${LOOP}s cubic-bezier(.22,.7,.25,1) infinite }`
}).join(" ")}
@keyframes re-float { 0%, 100% { translate: 0 -3px } 50% { translate: 0 4px } }
.re-float { will-change: translate; animation: re-float 6s ease-in-out infinite }
@media (prefers-reduced-motion: reduce) {
  .re-spin, .re-ping, .re-beacon, .re-float { animation: none }
  .re-lit { animation: none; clip-path: none }
  .re-flit { animation: none; opacity: 1 }
  .re-scan { animation: none; opacity: 0 }
  [class*="re-t"] { animation: none; opacity: 1; transform: none }
}
`

function Face({ tw, k, crown = false }: { tw: Tower; k: number; crown?: boolean }) {
  const { s, h, seed, delay } = tw
  const cols = Math.max(3, Math.round(s / 11))
  const rows = Math.round(h / 14)
  const cells = useMemo(() => {
    const r = rng(seed * 7 + k * 13)
    const out: { c: number; r: number; warm: boolean }[] = []
    for (let rr = 1; rr < rows; rr++) for (let cc = 0; cc < cols; cc++) if (r() < 0.3) out.push({ c: cc, r: rr, warm: r() < 0.8 })
    return out
  }, [seed, k, cols, rows])
  const cw = s / cols
  const rh = h / rows
  return (
    <div className="absolute" style={{ left: 0, top: 0, width: 0, height: 0, ...P3, transform: `rotateZ(${k * 90}deg)` }}>
      <div className="absolute overflow-hidden" style={{ left: -s / 2, top: s / 2 - h, width: s, height: h, transformOrigin: "bottom", transform: "rotateX(-90deg)", background: `repeating-linear-gradient(90deg, transparent 0 ${cw - 1.6}px, rgba(255,255,255,.34) ${cw - 1.6}px ${cw}px), repeating-linear-gradient(180deg, transparent 0 ${rh - 1.2}px, rgba(255,255,255,.2) ${rh - 1.2}px ${rh}px), linear-gradient(180deg, ${tw.g[0]} 0%, ${tw.g[1]} 48%, ${tw.g[2]} 100%)` }}>
        {/* floor slabs every few floors */}
        {!crown && <i className="absolute inset-0" style={{ background: `repeating-linear-gradient(180deg, transparent 0 ${rh * 4 - 2.5}px, rgba(255,244,222,.85) ${rh * 4 - 2.5}px ${rh * 4}px)` }} />}
        <div className="re-lit absolute inset-0" style={{ animationDelay: `${delay}s` }}>
          {cells.map((c) => (
            <i key={`${c.c}-${c.r}`} className="absolute" style={{ left: c.c * cw + 1.6, bottom: c.r * rh + 1.4, width: cw - 3.2, height: rh - 2.8, background: c.warm ? "linear-gradient(180deg, #fff0c2, #ffcf7a)" : "linear-gradient(180deg, #f2f8ff, #cfe2ff)", }} />
          ))}
          {!crown && <i className="absolute inset-x-0 bottom-0 h-[13px]" style={{ background: "linear-gradient(180deg, #ffe9b8, #ffc96b)", boxShadow: "0 0 10px rgba(255,200,110,.7)" }} />}
        </div>
        <i className="absolute inset-0" style={{ background: `rgba(6,18,44,${SHADE[k]})` }} />
        <i className="absolute inset-0" style={{ background: "linear-gradient(112deg, rgba(255,255,255,.34) 0%, rgba(255,255,255,.08) 34%, rgba(255,255,255,0) 52%)" }} />
      </div>
    </div>
  )
}

function TowerModel({ tw }: { tw: Tower }) {
  const { x, y, s, h } = tw
  const crown = { ...tw, s: s * 0.62, h: 26, seed: tw.seed + 5 }
  const rims = Math.floor(h / 56)
  return (
    <div className="absolute" style={{ left: x, top: y, width: 0, height: 0, ...P3 }}>
      {[0, 1, 2, 3].map((k) => <Face key={k} tw={tw} k={k} />)}
      {/* balcony rims every few floors */}
      {Array.from({ length: rims }, (_, n) => (
        <i key={n} className="absolute" style={{ left: -s / 2 - 3, top: -s / 2 - 3, width: s + 6, height: s + 6, border: `3px solid ${tw.rim}`, boxShadow: "0 0 0 1px rgba(60,40,10,.18)", transform: `translateZ(${(n + 1) * 56}px)` }} />
      ))}
      {/* roof slab and the stepped crown */}
      <i className="absolute" style={{ left: -s / 2 - 3, top: -s / 2 - 3, width: s + 6, height: s + 6, background: `linear-gradient(135deg, ${tw.rim}, #e6cfa3)`, boxShadow: "0 0 0 1px rgba(60,40,10,.18)", transform: `translateZ(${h}px)` }} />
      <div className="absolute" style={{ left: 0, top: 0, width: 0, height: 0, ...P3, transform: `translateZ(${h + 2}px)` }}>
        {[0, 1, 2, 3].map((k) => <Face key={k} tw={crown} k={k} crown />)}
        <i className="absolute" style={{ left: -crown.s / 2, top: -crown.s / 2, width: crown.s, height: crown.s, background: `linear-gradient(135deg, ${tw.rim}, #e0c690)`, transform: `translateZ(${crown.h}px)` }} />
      </div>
      {tw.s > 70 && (
        <>
          <i className="absolute" style={{ left: -1.5, top: -1.5, width: 3, height: 3, background: "#7f93b0", transform: `translateZ(${h + 28}px)` }} />
          {[0, 6, 12, 18, 24, 30].map((k) => <i key={k} className="absolute rounded-full" style={{ left: -1.8, top: -1.8, width: 3.6, height: 3.6, background: "#8fa3c0", transform: `translateZ(${h + 28 + k}px)` }} />)}
          <i className="re-beacon absolute rounded-full" style={{ left: -4, top: -4, width: 8, height: 8, background: "#ff5a4a", boxShadow: "0 0 10px 3px rgba(255,90,74,.65)", transform: `translateZ(${h + 62}px)` }} />
        </>
      )}
    </div>
  )
}

const lerpHex = (a: string, b: string, t: number) => {
  const pa = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16))
  const pb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16))
  return "#" + pa.map((v, i) => Math.round(v + (pb[i] - v) * t).toString(16).padStart(2, "0")).join("")
}

/* a twisting tower: every floor is a glass band turned a little more than the one below */
function TwistTower({ tw }: { tw: Tower }) {
  const floors = Math.round(tw.h / 11.4)
  const fh = tw.h / floors
  return (
    <div className="absolute" style={{ left: tw.x, top: tw.y, width: 0, height: 0, ...P3 }}>
      {Array.from({ length: floors }, (_, f) => {
        const t = f / (floors - 1)
        const top = lerpHex(tw.g[0], tw.g[1], Math.min(1, t * 1.6))
        const bot = lerpHex(tw.g[1], tw.g[2], t)
        const rr = rng(tw.seed * 31 + f * 17)
        const cols = Math.max(4, Math.round(tw.s / 11))
        const lit = Array.from({ length: cols }, (_, c) => ({ c, on: rr() < 0.5, warm: rr() < 0.8 })).filter((x) => x.on)
        const cw = tw.s / cols
        return (
          <div key={f} className="absolute" style={{ left: 0, top: 0, width: 0, height: 0, ...P3, transform: `translateZ(${f * fh}px) rotateZ(${f * (tw.step ?? 3.6)}deg)` }}>
            {[0, 1, 2, 3].map((k) => (
              <div key={k} className="absolute" style={{ left: 0, top: 0, width: 0, height: 0, ...P3, transform: `rotateZ(${k * 90}deg)` }}>
                <div className="absolute overflow-hidden" style={{ left: -tw.s / 2, top: tw.s / 2 - fh, width: tw.s, height: fh, transformOrigin: "bottom", transform: "rotateX(-90deg)", background: `repeating-linear-gradient(90deg, transparent 0 ${cw - 1.5}px, rgba(255,255,255,.34) ${cw - 1.5}px ${cw}px), linear-gradient(180deg, ${top}, ${bot})` }}>
                  <div className="re-flit absolute inset-0" style={{ animationDelay: `${tw.delay + f * 0.11}s` }}>
                    {lit.map((x) => <i key={x.c} className="absolute" style={{ left: x.c * cw + 1.6, top: 2, width: cw - 3.2, height: fh - 5, background: x.warm ? "linear-gradient(180deg, #fff0c2, #ffcf7a)" : "linear-gradient(180deg, #f2f8ff, #cfe2ff)", boxShadow: x.warm ? "0 0 5px rgba(255,200,110,.75)" : "0 0 4px rgba(200,225,255,.7)" }} />)}
                  </div>
                  <i className="absolute inset-0" style={{ background: `rgba(6,18,44,${SHADE[k]})` }} />
                  <i className="absolute inset-0" style={{ background: "linear-gradient(112deg, rgba(255,255,255,.3) 0%, rgba(255,255,255,.06) 36%, rgba(255,255,255,0) 54%)" }} />
                </div>
              </div>
            ))}
            <i className="absolute" style={{ left: -tw.s / 2 - 2.5, top: -tw.s / 2 - 2.5, width: tw.s + 5, height: tw.s + 5, border: `2px solid ${tw.rim}`, boxShadow: "0 0 0 1px rgba(60,40,10,.14)", transform: `translateZ(${fh}px)` }} />
          </div>
        )
      })}
      <i className="absolute" style={{ left: -tw.s / 2 - 2.5, top: -tw.s / 2 - 2.5, width: tw.s + 5, height: tw.s + 5, background: `linear-gradient(135deg, ${tw.rim}, #e6cfa3)`, transform: `translateZ(${tw.h + 1}px) rotateZ(${floors * (tw.step ?? 3.6)}deg)` }} />
      {tw.s > 70 && (
        <>
          {[0, 6, 12, 18, 24, 30, 36].map((k) => <i key={k} className="absolute rounded-full" style={{ left: -1.8, top: -1.8, width: 3.6, height: 3.6, background: "#8fa3c0", transform: `translateZ(${tw.h + 2 + k}px)` }} />)}
          <i className="re-beacon absolute rounded-full" style={{ left: -4, top: -4, width: 8, height: 8, background: "#ff5a4a", boxShadow: "0 0 10px 3px rgba(255,90,74,.65)", transform: `translateZ(${tw.h + 46}px)` }} />
        </>
      )}
    </div>
  )
}

/* a terraced block: each stage steps back, and every ledge carries a green planter */
function TerraceTower({ tw }: { tw: Tower }) {
  const stages = [
    { s: tw.s, h: 58, dx: 0, dy: 0 },
    { s: tw.s * 0.82, h: 50, dx: 7, dy: 7 },
    { s: tw.s * 0.64, h: 42, dx: 13, dy: 13 },
    { s: tw.s * 0.46, h: 34, dx: 17, dy: 17 },
  ]
  let z0 = 0
  return (
    <div className="absolute" style={{ left: tw.x, top: tw.y, width: 0, height: 0, ...P3 }}>
      {stages.map((st, i) => {
        const base = z0
        z0 += st.h
        const sub: Tower = { ...tw, s: st.s, h: st.h, seed: tw.seed + i * 9 }
        const green = i < stages.length - 1
        return (
          <div key={i} className="absolute" style={{ left: st.dx, top: st.dy, width: 0, height: 0, ...P3, transform: `translateZ(${base}px)` }}>
            {[0, 1, 2, 3].map((k) => <Face key={k} tw={sub} k={k} />)}
            <i className="absolute" style={{ left: -st.s / 2 - 3, top: -st.s / 2 - 3, width: st.s + 6, height: st.s + 6, background: `linear-gradient(135deg, ${tw.rim}, #e6cfa3)`, transform: `translateZ(${st.h}px)` }} />
            {green && (
              <>
                <i className="absolute" style={{ left: -st.s / 2 + 2, top: -st.s / 2 + 2, width: st.s - 4, height: st.s - 4, background: "linear-gradient(135deg, #7fd6a2, #3fa874)", transform: `translateZ(${st.h + 1.5}px)` }} />
                {[[-0.28, -0.2], [0.24, -0.3], [-0.12, 0.26], [0.3, 0.18]].map(([px, py], n) => <i key={n} className="absolute rounded-full" style={{ left: px * st.s - 4, top: py * st.s - 4, width: 8, height: 8, background: "radial-gradient(circle at 35% 30%, #b6efc8, #2f9a62)", transform: `translateZ(${st.h + 4}px)` }} />)}
              </>
            )}
          </div>
        )
      })}
    </div>
  )
}

function Scene() {
  return (
    <div className="absolute inset-0" style={{ ...P3, transform: "rotateY(calc(var(--px, 0) * 5deg)) rotateX(calc(var(--py, 0) * -3deg))", transition: "transform .25s ease-out" }}>
      <div className="absolute" style={{ left: 288, top: 340, width: 0, height: 0, ...P3 }}>
        <div className="absolute" style={{ left: 0, top: 0, width: 0, height: 0, ...P3, transform: `rotateX(${TILT}deg) scale(.8)` }}>
          {/* rings on the floor: alerts going out, and a fine guide ring */}
          <i className="absolute rounded-full" style={{ left: -100, top: -100, width: 200, height: 200, boxShadow: "inset 0 0 0 1.5px rgba(15,42,71,.14)", transform: "translateZ(-1px)" }} />
          <i className="absolute rounded-full" style={{ left: -74, top: -74, width: 148, height: 148, boxShadow: "inset 0 0 0 1px rgba(15,42,71,.08)", transform: "translateZ(-1px)" }} />
          {[0, 1.5, 3].map((d) => (
            <i key={d} className="re-ping absolute rounded-full" style={{ left: -65, top: -65, width: 130, height: 130, boxShadow: "inset 0 0 0 2px rgba(63,207,157,.8)", animationDelay: `${d}s`, transform: "translateZ(0)" }} />
          ))}
          <div className="re-spin absolute" style={{ left: 0, top: 0, width: 0, height: 0, ...P3 }}>
            {TOWERS.map((t, i) => (t.kind === "twist" ? <TwistTower key={i} tw={t} /> : t.kind === "terrace" ? <TerraceTower key={i} tw={t} /> : <TowerModel key={i} tw={t} />))}
            {/* the scan ring climbing the main tower */}
            <div className="re-scan absolute" style={{ left: -46, top: -46, width: 92, height: 92, border: "2px solid #3fcf9d", boxShadow: "0 0 14px 2px rgba(63,207,157,.7), inset 0 0 12px rgba(63,207,157,.35)", background: "rgba(63,207,157,.08)" }} />
          </div>
        </div>
      </div>
    </div>
  )
}

function Tags() {
  return (
    <>
      {TAGS.map(({ Icon, c, t, d, x, y, tail }, i) => (
        <div key={t} className={`re-t${i} absolute`} style={{ left: x, top: y, width: 164 }}>
          <div className="re-float relative flex items-center gap-2.5 rounded-2xl bg-white px-3 py-2.5" style={{ animationDelay: `${i * 0.7}s`, boxShadow: "0 22px 32px -14px rgba(15,42,71,.5), inset 0 0 0 1px rgba(15,42,71,.07)" }}>
            <i className={`absolute h-3.5 w-3.5 rotate-45 rounded-[3px] bg-white ${tail}`} />
            <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white" style={{ background: c }}><Icon className="h-[18px] w-[18px]" /></span>
            <div className="relative min-w-0">
              <p className="text-[12.5px] font-semibold leading-tight text-[#0f2a47]">{t}</p>
              <p className="mt-0.5 text-[10.5px] leading-snug text-[#0f2a47]/60">{d}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

/* a tri-fold property brochure, printed on paper: cover with a render, inside with the floor plan, and the price with a QR code */
const QR = ["1110111", "1010101", "1110111", "0101010", "1101011", "0010110", "1011101"]

function Brochure() {
  const paper = { boxShadow: "0 0 0 1px rgba(15,42,71,.12), 0 16px 24px -10px rgba(15,42,71,.5)", borderRadius: 3 }
  const fold = (dir: "l" | "r") => ({ background: dir === "l" ? "linear-gradient(90deg, rgba(10,20,40,.16), rgba(10,20,40,0) 42%)" : "linear-gradient(270deg, rgba(10,20,40,.18), rgba(10,20,40,0) 46%)" })
  return (
    <div className="absolute" style={{ left: 396, top: 310, width: 216, height: 150, transform: "scale(.74)", transformOrigin: "0 0" }}>
    <div className="re-t3 absolute inset-0" style={{ perspective: 760 }}>
      <div className="re-float absolute inset-0" style={{ ...P3, animationDelay: "0.6s", transform: "rotateX(12deg) rotateZ(-3deg)" }}>
        <i className="absolute left-4 right-2 -bottom-2 h-6 rounded-[50%] bg-[rgba(15,42,71,.28)] blur-md" />

        {/* cover */}
        <div className="absolute overflow-hidden" style={{ left: 2, top: 10, width: 72, height: 128, transformOrigin: "left center", transform: "rotateY(-20deg)", background: "linear-gradient(180deg, #b9d6f0 0%, #e7eef5 52%, #f3e3c3 100%)", ...paper }}>
          {/* the render: glass tower at golden hour */}
          <i className="absolute bottom-[34px] left-[10px] w-[16px]" style={{ height: 52, background: "repeating-linear-gradient(180deg, rgba(255,255,255,.55) 0 1px, transparent 1px 4px), linear-gradient(180deg, #7aa8d4, #2f5f9a)" }} />
          <i className="absolute bottom-[34px] left-[28px] w-[24px]" style={{ height: 82, background: "repeating-linear-gradient(90deg, rgba(255,255,255,.5) 0 1px, transparent 1px 5px), repeating-linear-gradient(180deg, rgba(255,255,255,.5) 0 1px, transparent 1px 4px), linear-gradient(180deg, #8dc0e6, #2c5f99)", boxShadow: "3px 0 0 -1px rgba(15,42,71,.25)" }} />
          <i className="absolute bottom-[34px] left-[54px] w-[12px]" style={{ height: 40, background: "repeating-linear-gradient(180deg, rgba(255,255,255,.55) 0 1px, transparent 1px 4px), linear-gradient(180deg, #7ec9b4, #2a8a78)" }} />
          <i className="absolute inset-x-0 bottom-[28px] h-[8px]" style={{ background: "linear-gradient(180deg, #d9c9a6, #bfae88)" }} />
          <div className="absolute inset-x-0 bottom-0 h-[28px] px-2 pt-1.5" style={{ background: "linear-gradient(180deg, #14306a, #0d2150)" }}>
            <p className="text-[6px] font-semibold uppercase tracking-[0.12em] text-[#f4e6c8]">Whitefield, Bengaluru</p>
            <p className="mt-0.5 text-[5px] text-white/60">Ready to move 3 and 4 BHK homes</p>
          </div>
          <p className="absolute left-2 right-2 top-3 font-serif text-[8.5px] font-semibold uppercase leading-[1.15] tracking-[0.1em] text-[#14306a]">Prestige<br />Meridian</p>
          <i className="absolute left-2 top-[34px] h-[2px] w-6 bg-[#c9a24a]" />
          <p className="absolute left-2 top-[40px] font-serif text-[6px] italic text-[#14306a]/70">Live above the city</p>
          <i className="absolute inset-0" style={{ background: "linear-gradient(115deg, rgba(255,255,255,.4) 0%, rgba(255,255,255,0) 40%)" }} />
          <i className="absolute inset-0" style={fold("l")} />
        </div>

        {/* inside left: the floor plan */}
        <div className="absolute overflow-hidden" style={{ left: 64, top: 10, width: 72, height: 128, transformOrigin: "left center", transform: "rotateY(22deg)", background: "linear-gradient(180deg, #ffffff, #f4f6f9)", ...paper }}>
          <p className="absolute left-2 top-2 text-[7px] font-semibold uppercase tracking-[0.12em] text-[#14306a]">The 3 BHK</p>
          <p className="absolute left-2 top-[14px] text-[5.5px] text-[#0f2a47]/55">1,420 sqft carpet</p>
          <div className="absolute left-2 right-2 top-[26px] h-[54px] border-[1.4px] border-[#0f2a47]/70">
            <i className="absolute inset-y-0 left-[40%] w-[1.2px] bg-[#0f2a47]/70" />
            <i className="absolute left-0 top-[50%] h-[1.2px] w-[40%] bg-[#0f2a47]/70" />
            <i className="absolute left-[40%] right-0 top-[56%] h-[1.2px] bg-[#0f2a47]/70" />
            <i className="absolute left-[42%] top-[8%] h-[10px] w-[10px] rounded-br-full border-b border-r border-[#0f2a47]/40" />
            <p className="absolute left-1 top-1 text-[4px] text-[#0f2a47]/60">Bed 1</p>
            <p className="absolute left-1 bottom-1 text-[4px] text-[#0f2a47]/60">Bed 2</p>
            <p className="absolute right-2 top-1.5 text-[4px] text-[#0f2a47]/60">Living</p>
            <p className="absolute bottom-1 right-2 text-[4px] text-[#0f2a47]/60">Kitchen</p>
          </div>
          <div className="absolute inset-x-2 bottom-2 space-y-[3px]">
            {["Clubhouse and pool", "Covered parking", "24x7 security"].map((t) => (
              <p key={t} className="flex items-center gap-1 text-[5px] text-[#0f2a47]/75"><i className="h-[3px] w-[3px] rounded-full bg-[#0e9f6e]" />{t}</p>
            ))}
          </div>
          <i className="absolute inset-0" style={fold("r")} />
        </div>

        {/* inside right: the price, a QR code and the call to action */}
        <div className="absolute overflow-hidden" style={{ left: 126, top: 10, width: 72, height: 128, transformOrigin: "left center", transform: "rotateY(-20deg)", background: "linear-gradient(180deg, #fbf6ea, #f2e6c9)", ...paper }}>
          <p className="absolute left-2 top-2 text-[6px] font-semibold uppercase tracking-[0.14em] text-[#7a5a1a]">Starting from</p>
          <p className="absolute left-2 top-[14px] font-serif text-[15px] font-semibold leading-none text-[#14306a]">₹1.8 Cr</p>
          <p className="absolute left-2 top-[34px] text-[5px] leading-snug text-[#0f2a47]/60">Floor 12 · East facing<br />Ready to move</p>
          <div className="absolute left-2 top-[54px] grid h-[26px] w-[26px] grid-cols-7 gap-[0.4px] bg-white p-[1.5px]" style={{ boxShadow: "0 0 0 1px rgba(15,42,71,.2)" }}>
            {QR.join("").split("").map((c, i) => <i key={i} className={c === "1" ? "bg-[#0f2a47]" : "bg-white"} />)}
          </div>
          <p className="absolute left-[38px] top-[58px] text-[4.5px] leading-tight text-[#0f2a47]/60">Scan to<br />see more</p>
          <p className="absolute inset-x-2 bottom-[18px] rounded-[2px] bg-[#0e9f6e] py-[3px] text-center text-[6px] font-semibold text-white">Book a visit</p>
          <p className="absolute inset-x-2 bottom-[6px] text-center text-[4.5px] text-[#0f2a47]/55">+91 98••• ••210</p>
          <i className="absolute inset-0" style={fold("l")} />
        </div>
      </div>
      <p className="absolute -top-5 left-0 right-0 text-center font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-[#0f2a47]/55">Brochure on WhatsApp</p>
    </div>
    </div>
  )
}

export function RealEstateHero() {
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
    <div ref={box} onPointerMove={move} onPointerLeave={leave} className="relative mx-auto w-full max-w-[560px]" style={{ height: H * k }} role="img" aria-label="A night-time residential skyline of four glass towers turning slowly, with warm windows lighting up from the ground floor to the roof, a green scan ring climbing the main tower and rings pulsing out from its base like alerts. Three popups appear in turn: an alert to matching buyers, a question about the buyer's location, and help with booking. A property brochure appears at the bottom right">
      <div className="absolute left-0 top-0 origin-top-left" style={{ width: W, height: H, transform: `scale(${k})`, perspective: 1500, perspectiveOrigin: "50% 40%" }}>
        <i className="absolute rounded-[50%] bg-[rgba(15,42,71,.16)] blur-xl" style={{ left: 120, top: 372, width: 320, height: 34 }} />
        <Scene />
        <Tags />
        <Brochure />
      </div>
      <style>{CSS}</style>
    </div>
  )
}
