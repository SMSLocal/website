"use client"

import { useEffect, useRef, useState } from "react"
import { Bot, Camera, Heart, Image as ImageIcon, MessageCircle, Mic, Phone, Smile, ThumbsUp, Users, Video, Zap } from "lucide-react"
import type { LucideIcon } from "lucide-react"

// Hero graphic for /channels/messenger: one Messenger conversation where the AI agent answers first and a person takes over. No phone.
// A wide Messenger chat window floats in 3D. A customer asks about an order and the AI agent answers at once. When the customer asks for
// something the AI should not decide (a change of delivery address), the agent says it is bringing in a teammate, a line shows that
// a person has joined, and the teammate replies with the history already in front of them. A real photo of someone typing on a phone sits behind it, and a small "customer context" panel slides in
// at the handoff (name, order, status), the thing a person needs so they never start from a blank screen. A key below says how SMSLocal
// helps and lights up in step. On narrow screens the context panel is dropped and the key sits below the chat. HTML + CSS 3D, silent.

const W = 560
const H = 500
const LOOP = 18
const BLUE = "linear-gradient(135deg, #0a7cff, #a033ff)"
const P3 = { transformStyle: "preserve-3d" as const }

const KEY: { Icon: LucideIcon; t: string; d: string; c: string; k: string }[] = [
  { Icon: Zap, t: "Instant first answers", d: "The AI agent replies the moment a message lands.", c: "#0a7cff", k: "ms-k1" },
  { Icon: Users, t: "A smooth handoff", d: "A person joins the same thread with the full history.", c: "#a033ff", k: "ms-k2" },
  { Icon: MessageCircle, t: "One shared inbox", d: "Messenger sits beside WhatsApp, Instagram and SMS.", c: "#0e9f6e", k: "ms-k3" },
]

const win = (name: string, a: number) =>
  `@keyframes ${name} { 0%, ${a}% { opacity: 0; transform: translateY(8px) } ${a + 3.5}%, 93% { opacity: 1; transform: translateY(0) } 97%, 100% { opacity: 0; transform: translateY(0) } }\n.${name} { opacity: 0; animation: ${name} ${LOOP}s ease-out infinite }`

const CSS = `
${win("ms-m1", 3)}
${win("ms-m2", 17)}
${win("ms-m3", 33)}
${win("ms-m4", 46)}
${win("ms-m5", 62)}
@keyframes ms-ty { 0%, 10% { opacity: 0 } 12%, 16% { opacity: 1 } 17%, 100% { opacity: 0 } }
@keyframes ms-ty2 { 0%, 38% { opacity: 0 } 40%, 45% { opacity: 1 } 46%, 100% { opacity: 0 } }
@keyframes ms-ty3 { 0%, 54% { opacity: 0 } 56%, 61% { opacity: 1 } 62%, 100% { opacity: 0 } }
.ms-ty { opacity: 0; animation: ms-ty ${LOOP}s linear infinite }
.ms-ty2 { opacity: 0; animation: ms-ty2 ${LOOP}s linear infinite }
.ms-ty3 { opacity: 0; animation: ms-ty3 ${LOOP}s linear infinite }
@keyframes ms-dot { 0%, 100% { transform: translateY(0); opacity: .4 } 50% { transform: translateY(-2px); opacity: 1 } }
.ms-d { animation: ms-dot .9s ease-in-out infinite }
@keyframes ms-ctx { 0%, 48% { opacity: 0; transform: translate3d(30px, 0, 0) scale(.96) } 54%, 93% { opacity: 1; transform: translate3d(0, 0, 0) scale(1) } 97%, 100% { opacity: 0 } }
.ms-ctx { opacity: 0; animation: ms-ctx ${LOOP}s cubic-bezier(.2,.8,.25,1) infinite }
@keyframes ms-k1 { 0%, 2% { opacity: .65 } 6%, 30% { opacity: 1 } 34%, 100% { opacity: .65 } }
@keyframes ms-k2 { 0%, 30% { opacity: .65 } 34%, 66% { opacity: 1 } 70%, 100% { opacity: .65 } }
@keyframes ms-k3 { 0%, 62% { opacity: .65 } 66%, 94% { opacity: 1 } 98%, 100% { opacity: .65 } }
.ms-k1 { animation: ms-k1 ${LOOP}s ease-in-out infinite }
.ms-k2 { animation: ms-k2 ${LOOP}s ease-in-out infinite }
.ms-k3 { animation: ms-k3 ${LOOP}s ease-in-out infinite }
@keyframes ms-spin { to { transform: rotate(360deg) } }
.ms-spin { animation: ms-spin 14s linear infinite }
@keyframes ms-react { 0% { opacity: 0; transform: translateY(0) scale(.6) } 12% { opacity: 1; transform: translateY(-10px) scale(1) } 80% { opacity: 1 } 100% { opacity: 0; transform: translateY(-120px) scale(1.05) } }
.ms-react { opacity: 0; animation: ms-react 6s ease-out infinite }
@keyframes ms-hov { 0%, 100% { translate: 0 0 } 50% { translate: 0 -6px } }
.ms-hov { animation: ms-hov 6s ease-in-out infinite }
.ms-hov2 { animation: ms-hov 7s ease-in-out infinite -3s }
@media (prefers-reduced-motion: reduce) {
  [class*="ms-m"], [class*="ms-k"], .ms-ctx { animation: none; opacity: 1; transform: none }
  .ms-ty, .ms-ty2, .ms-ty3 { animation: none; opacity: 0 }
  .ms-d, .ms-hov, .ms-hov2, .ms-spin, .ms-react { animation: none }
  .ms-react { opacity: 0 }
}
`

function Avatar({ kind, size = 26 }: { kind: "ai" | "human" | "page"; size?: number }) {
  const bg = kind === "ai" ? "linear-gradient(135deg, #0a7cff, #a033ff)" : kind === "human" ? "linear-gradient(135deg, #f59e0b, #ef4444)" : "linear-gradient(135deg, #0f2a47, #14305a)"
  return (
    <span className="flex shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ width: size, height: size, background: bg }}>
      {kind === "ai" ? <Bot style={{ width: size * 0.55, height: size * 0.55 }} /> : kind === "human" ? "P" : "Y"}
    </span>
  )
}

function Chat() {
  const mine = "ml-auto w-fit max-w-[80%] rounded-[18px] px-3.5 py-2 text-[12.5px] leading-snug text-white"
  const theirs = "w-fit max-w-[80%] rounded-[18px] bg-[#f0f0f0] px-3.5 py-2 text-[12.5px] leading-snug text-[#111b21]"
  const row = "flex items-end gap-1.5"
  return (
    <div className="absolute flex flex-col overflow-hidden bg-white" style={{ left: -178, top: -190, width: 356, height: 380, borderRadius: 22, boxShadow: "0 44px 60px -26px rgba(10,124,255,.55), 0 0 0 2px rgba(255,255,255,.9), 0 0 0 4px rgba(160,51,255,.35)" }}>
      <div className="flex items-center gap-2.5 border-b border-[#eee] px-3.5 py-2.5">
        <Avatar kind="page" size={32} />
        <div className="min-w-0 flex-1 leading-tight">
          <p className="text-[13px] font-semibold text-[#111b21]">Your Page</p>
          <p className="text-[10px] text-[#65676b]">Typically replies instantly</p>
        </div>
        <Phone className="h-[17px] w-[17px] text-[#0a7cff]" />
        <Video className="ml-1.5 h-[19px] w-[19px] text-[#0a7cff]" />
      </div>
      <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-hidden px-3.5 pt-3 [&>*]:shrink-0">
        <div className="ms-m1"><div className={mine} style={{ background: BLUE }}>Hi! Is my order #1042 on the way?</div></div>
        <div className="relative">
          <div className="ms-ty absolute left-0 top-0 flex items-end gap-1.5"><Avatar kind="ai" /><span className="flex gap-1 rounded-[18px] bg-[#f0f0f0] px-3 py-2.5">{[0, 0.15, 0.3].map((d) => <i key={d} className="ms-d h-1.5 w-1.5 rounded-full bg-[#8a8d91]" style={{ animationDelay: `${d}s` }} />)}</span></div>
          <div className="ms-m2"><div className={row}><Avatar kind="ai" /><div className={theirs}>Hi Sam! Order #1042 is out for delivery and arrives today.</div></div></div>
        </div>
        <div className="ms-m3"><div className={mine} style={{ background: BLUE }}>Can I change the delivery address?</div></div>
        <div className="relative">
          <div className="ms-ty2 absolute left-0 top-0 flex items-end gap-1.5"><Avatar kind="ai" /><span className="flex gap-1 rounded-[18px] bg-[#f0f0f0] px-3 py-2.5">{[0, 0.15, 0.3].map((d) => <i key={d} className="ms-d h-1.5 w-1.5 rounded-full bg-[#8a8d91]" style={{ animationDelay: `${d}s` }} />)}</span></div>
          <div className="ms-m4">
            <div className={row}><Avatar kind="ai" /><div className={theirs}>I will bring in a teammate for that.</div></div>
            <p className="mx-auto mt-2 flex w-fit items-center gap-1.5 rounded-full bg-[#fff3e0] px-2.5 py-1 text-[10px] font-semibold text-[#b45309]"><Avatar kind="human" size={14} />Priya from the team joined</p>
          </div>
        </div>
        <div className="relative">
          <div className="ms-ty3 absolute left-0 top-0 flex items-end gap-1.5"><Avatar kind="human" /><span className="flex gap-1 rounded-[18px] bg-[#f0f0f0] px-3 py-2.5">{[0, 0.15, 0.3].map((d) => <i key={d} className="ms-d h-1.5 w-1.5 rounded-full bg-[#8a8d91]" style={{ animationDelay: `${d}s` }} />)}</span></div>
          <div className="ms-m5"><div className={row}><Avatar kind="human" /><div className={theirs}>Hi Sam, I can see your order. Where should we deliver it?</div></div></div>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2.5 px-3.5 pb-3 pt-1.5 text-[#0a7cff]">
        <Mic className="h-[18px] w-[18px]" /><Camera className="h-[18px] w-[18px]" /><ImageIcon className="h-[18px] w-[18px]" />
        <span className="flex h-[30px] flex-1 items-center rounded-full bg-[#f0f0f0] px-3 text-[11px] text-[#65676b]">Aa</span>
        <Smile className="h-[18px] w-[18px]" />
      </div>
    </div>
  )
}

function Context() {
  return (
    <div className="ms-ctx absolute overflow-hidden bg-white" style={{ left: -84, top: -88, width: 168, height: 176, borderRadius: 16, boxShadow: "0 30px 40px -20px rgba(15,42,71,.55), 0 0 0 1px rgba(15,42,71,.1)" }}>
      <div className="px-3 pb-1 pt-2.5">
        <p className="font-mono text-[8.5px] font-semibold uppercase tracking-[0.16em] text-[#a033ff]">Customer context</p>
      </div>
      <div className="flex items-center gap-2 px-3 pb-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e8f1ff] text-[12px] font-bold text-[#0a7cff]">S</span>
        <div className="leading-tight"><p className="text-[12px] font-semibold text-[#111b21]">Sam K.</p><p className="text-[9.5px] text-[#65676b]">Messenger · Your Page</p></div>
      </div>
      <dl className="space-y-1.5 border-t border-[#eee] px-3 pt-2 text-[10.5px]">
        <div className="flex justify-between"><dt className="text-[#65676b]">Order</dt><dd className="font-semibold text-[#111b21]">#1042</dd></div>
        <div className="flex justify-between"><dt className="text-[#65676b]">Status</dt><dd className="font-semibold text-[#0e9f6e]">Out for delivery</dd></div>
        <div className="flex justify-between"><dt className="text-[#65676b]">Last chat</dt><dd className="font-semibold text-[#111b21]">Yesterday</dd></div>
        <div className="flex justify-between"><dt className="text-[#65676b]">History</dt><dd className="font-semibold text-[#a033ff]">Attached</dd></div>
      </dl>
    </div>
  )
}

function Photo() {
  return (
    <div className="absolute" style={{ left: -135, top: -135, width: 270, height: 270 }}>
      <i className="ms-spin absolute inset-0 rounded-full" style={{ background: "conic-gradient(from 0deg, #0a7cff, #a033ff, #ff5ca8, #ffb02e, #0a7cff)", filter: "blur(.3px)" }} />
      <div className="absolute overflow-hidden rounded-full bg-white" style={{ inset: 9, boxShadow: "0 0 0 4px #fff" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/products/photo-texting.webp" alt="" className="h-full w-full object-cover" style={{ objectPosition: "60% 48%", transform: "scale(1.25)" }} />
      </div>
      <span className="absolute bottom-6 right-6 flex h-[22px] w-[22px] items-center justify-center rounded-full bg-white"><i className="h-[14px] w-[14px] rounded-full bg-[#31c45a]" /></span>
    </div>
  )
}

function Reactions() {
  const items = [
    { Icon: Heart, c: "#ff3b6b", x: 0, d: 0 },
    { Icon: ThumbsUp, c: "#0a7cff", x: 36, d: 2 },
    { Icon: Smile, c: "#f5a623", x: 14, d: 4 },
  ]
  return (
    <>
      {items.map(({ Icon, c, x, d }) => (
        <span key={c} className="ms-react absolute flex h-9 w-9 items-center justify-center rounded-full bg-white" style={{ left: x - 18, top: -18, animationDelay: `${d}s`, color: c, boxShadow: "0 14px 22px -10px rgba(15,42,71,.5), 0 0 0 1px rgba(15,42,71,.06)" }}>
          <Icon className={`h-[18px] w-[18px] ${Icon === Smile ? "" : "fill-current"}`} />
        </span>
      ))}
    </>
  )
}

function Scene({ narrow }: { narrow: boolean }) {
  const cx = narrow ? 160 : 192
  return (
    <div className="absolute inset-0" style={{ ...P3, transform: "rotateY(calc(var(--px, 0) * 4deg)) rotateX(calc(var(--py, 0) * -3deg))", transition: "transform .25s ease-out" }}>
      <i className="absolute rounded-full" style={{ left: cx - 230, top: 220 - 260, width: 520, height: 520, background: "radial-gradient(circle, rgba(10,124,255,.26), rgba(10,124,255,0) 64%)", transform: "translateZ(-200px) scale(1.2)" }} />
      <i className="absolute rounded-full" style={{ left: cx + 90, top: 120, width: 440, height: 440, background: "radial-gradient(circle, rgba(160,51,255,.22), rgba(160,51,255,0) 66%)", transform: "translateZ(-200px) scale(1.2)" }} />
      <i className="absolute rounded-full" style={{ left: cx + 40, top: -40, width: 360, height: 360, background: "radial-gradient(circle, rgba(255,92,168,.2), rgba(255,92,168,0) 66%)", transform: "translateZ(-200px) scale(1.2)" }} />
      <div className="absolute" style={{ left: cx, top: 206, width: 0, height: 0, ...P3 }}>
        <div className="ms-hov absolute" style={{ left: 0, top: 0, width: 0, height: 0, ...P3 }}>
          <div className="absolute" style={{ left: 0, top: 0, width: 0, height: 0, ...P3, transform: `translateZ(10px) rotateY(${narrow ? -6 : 12}deg) rotateZ(-1.5deg)` }}><Chat /><div className="absolute" style={{ left: 120, top: 150, width: 0, height: 0 }}><Reactions /></div></div>
        </div>
      </div>
      {!narrow && (
        <div className="absolute" style={{ left: 428, top: 196, width: 0, height: 0, ...P3 }}>
          <div className="ms-hov2 absolute" style={{ left: 0, top: 0, width: 0, height: 0, ...P3 }}>
            <div className="absolute" style={{ left: 0, top: 0, width: 0, height: 0, ...P3, transform: "translateZ(-40px) rotateY(-10deg)" }}><Photo /></div>
          </div>
        </div>
      )}
      {!narrow && (
        <div className="absolute" style={{ left: 470, top: 322, width: 0, height: 0, ...P3 }}>
          <div className="ms-hov2 absolute" style={{ left: 0, top: 0, width: 0, height: 0, ...P3 }}>
            <div className="absolute" style={{ left: 0, top: 0, width: 0, height: 0, ...P3, transform: "translateZ(80px) rotateY(-14deg) rotateZ(3deg)" }}><Context /></div>
          </div>
        </div>
      )}
    </div>
  )
}

function Key({ flow }: { flow?: boolean }) {
  return (
    <div className={flow ? "mx-auto mt-3 w-full max-w-[340px] px-1" : "absolute inset-x-0 px-5"} style={flow ? undefined : { top: 414 }}>
      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6a1fd0]">How SMSLocal helps</p>
      <ul className={flow ? "mt-3 space-y-3.5" : "mt-3 grid grid-cols-3 gap-4"}>
        {KEY.map((s) => (
          <li key={s.t} className={`${s.k} flex gap-2.5`}>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white" style={{ background: s.c }}><s.Icon className="h-4 w-4" /></span>
            <span>
              <span className="block text-[12.5px] font-semibold leading-tight text-[#0f2a47]">{s.t}</span>
              <span className="mt-0.5 block text-[11px] leading-snug text-[#0f2a47]/70">{s.d}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function MessengerHero() {
  const box = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(560)
  useEffect(() => {
    const el = box.current
    if (!el) return
    const fit = () => setWidth(el.clientWidth)
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
  const narrow = width < 520
  const SW = narrow ? 320 : W
  const SH = narrow ? 410 : H
  const k = Math.min(1, width / SW)
  const label = "A Messenger chat window beside a real photo of someone typing on a phone. A customer asks if order 1042 is on the way and the AI agent answers at once. When the customer asks to change the delivery address, the agent says it will bring in a teammate, a line shows that Priya from the team joined, and she replies with the order already in front of her. A customer context panel shows the customer, the order and the attached history. Below, three points light up in step: instant first answers, a smooth handoff, and one shared inbox"
  return (
    <div ref={box} onPointerMove={move} onPointerLeave={leave} className="relative mx-auto w-full max-w-[560px]">
      <div className="relative" style={{ height: SH * k }} role="img" aria-label={label}>
        <div className="absolute left-1/2 top-0 origin-top" style={{ width: SW, height: SH, marginLeft: -SW / 2, transform: `scale(${k})`, perspective: 1600, perspectiveOrigin: "50% 40%" }}>
          <Scene narrow={narrow} />
          {!narrow && <Key />}
        </div>
      </div>
      {narrow && <Key flow />}
      <style>{CSS}</style>
    </div>
  )
}
