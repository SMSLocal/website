"use client"

import { useEffect, useRef, useState } from "react"
import { Bookmark, Heart, MessageCircle, MessageSquareReply, Send, ShoppingBag, Zap } from "lucide-react"
import type { LucideIcon } from "lucide-react"

// Hero graphic for /channels/instagram: a product post, and the DM its comments turn into. No phone, no popups.
// Two layered glass-edged cards in 3D. At the back left, an Instagram post shows a product (a classic white tee) with a price tag and a comment
// "PRICE" highlighted. At the front right, the DM that comment opens: an instant answer, the product card, a size question and a second
// answer. A gradient line carries the comment across with a paper plane. A key at the bottom says how SMSLocal helps at each step
// (comments become DMs, the AI agent answers instantly, the product sells inside the chat) and lights up in step. On narrow screens only the
// DM card is shown, with the key below. HTML + CSS 3D, silent, looping.

const W = 560
const H = 520
const LOOP = 16
const IG = "linear-gradient(45deg, #f9ce34, #ee2a7b 55%, #6228d7)"
const P3 = { transformStyle: "preserve-3d" as const }

const KEY: { Icon: LucideIcon; t: string; d: string; c: string; k: string }[] = [
  { Icon: MessageSquareReply, t: "Comments become DMs", d: "A keyword comment or story reply opens a chat in your inbox.", c: "#ee2a7b", k: "ig-k1" },
  { Icon: Zap, t: "AI agent answers instantly", d: "Price, size and shipping questions get a reply in seconds, day or night.", c: "#6228d7", k: "ig-k2" },
  { Icon: ShoppingBag, t: "The product sells in the chat", d: "Share the product card with price and link, with no extra clicks.", c: "#e8710a", k: "ig-k3" },
]

const win = (name: string, a: number) =>
  `@keyframes ${name} { 0%, ${a}% { opacity: 0; transform: translateY(8px) } ${a + 3.5}%, 92% { opacity: 1; transform: translateY(0) } 97%, 100% { opacity: 0; transform: translateY(0) } }\n.${name} { opacity: 0; animation: ${name} ${LOOP}s ease-out infinite }`

const CSS = `
${win("ig-m1", 14)}
${win("ig-m2", 27)}
${win("ig-m3", 35)}
${win("ig-m4", 55)}
${win("ig-m5", 68)}
@keyframes ig-ty { 0%, 19% { opacity: 0 } 21%, 26% { opacity: 1 } 27%, 100% { opacity: 0 } }
@keyframes ig-ty2 { 0%, 59% { opacity: 0 } 61%, 67% { opacity: 1 } 68%, 100% { opacity: 0 } }
.ig-ty { opacity: 0; animation: ig-ty ${LOOP}s linear infinite }
.ig-ty2 { opacity: 0; animation: ig-ty2 ${LOOP}s linear infinite }
@keyframes ig-dot { 0%, 100% { transform: translateY(0); opacity: .4 } 50% { transform: translateY(-2px); opacity: 1 } }
.ig-d { animation: ig-dot .9s ease-in-out infinite }
@keyframes ig-cm { 0%, 4% { background: transparent; box-shadow: none } 8%, 24% { background: rgba(238,42,123,.14); box-shadow: 0 0 0 2px rgba(238,42,123,.4) } 30%, 100% { background: transparent; box-shadow: none } }
.ig-cm { animation: ig-cm ${LOOP}s ease-in-out infinite }
@keyframes ig-line { 0%, 8% { stroke-dashoffset: 1; opacity: 0 } 10% { opacity: 1 } 20%, 90% { stroke-dashoffset: 0; opacity: 1 } 96%, 100% { stroke-dashoffset: 0; opacity: 0 } }
.ig-line { stroke-dasharray: 1; stroke-dashoffset: 1; opacity: 0; animation: ig-line ${LOOP}s ease-out infinite }
@keyframes ig-plane { 0%, 9% { opacity: 0 } 11% { opacity: 1 } 19% { opacity: 1 } 21%, 100% { opacity: 0 } }
.ig-plane { opacity: 0; animation: ig-plane ${LOOP}s linear infinite }
@keyframes ig-k1 { 0%, 2% { opacity: .65 } 6%, 22% { opacity: 1 } 26%, 100% { opacity: .65 } }
@keyframes ig-k2 { 0%, 22% { opacity: .65 } 26%, 34% { opacity: 1 } 38%, 56% { opacity: .65 } 60%, 94% { opacity: 1 } 98%, 100% { opacity: .65 } }
@keyframes ig-k3 { 0%, 33% { opacity: .65 } 37%, 54% { opacity: 1 } 58%, 100% { opacity: .65 } }
.ig-k1 { animation: ig-k1 ${LOOP}s ease-in-out infinite }
.ig-k2 { animation: ig-k2 ${LOOP}s ease-in-out infinite }
.ig-k3 { animation: ig-k3 ${LOOP}s ease-in-out infinite }
@keyframes ig-hov { 0%, 100% { translate: 0 0 } 50% { translate: 0 -6px } }
.ig-hov { animation: ig-hov 6s ease-in-out infinite }
.ig-hov2 { animation: ig-hov 7s ease-in-out infinite -3s }
@media (prefers-reduced-motion: reduce) {
  [class*="ig-m"], [class*="ig-k"] { animation: none; opacity: 1; transform: none }
  .ig-ty, .ig-ty2, .ig-plane { animation: none; opacity: 0 }
  .ig-line { animation: none; stroke-dashoffset: 0; opacity: 1 }
  .ig-d, .ig-hov, .ig-hov2, .ig-cm { animation: none }
}
`

function PostCard() {
  return (
    <div className="absolute overflow-hidden bg-white" style={{ left: -118, top: -168, width: 236, height: 336, borderRadius: 20, boxShadow: "0 36px 50px -22px rgba(15,42,71,.5), 0 0 0 1px rgba(15,42,71,.1)" }}>
      <div className="flex items-center gap-2 px-3 py-2">
        <span className="rounded-full p-[1.5px]" style={{ background: IG }}><span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-[#14305a] text-[10px] font-bold text-white">Y</span></span>
        <span className="text-[12px] font-semibold text-[#111b21]">yourbrand</span>
        <span className="ml-auto text-[14px] leading-none text-[#8e8e8e]">···</span>
      </div>
      <div className="relative h-[148px] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/home/p-tshirt.webp" alt="" className="h-full w-full object-cover" />
        <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[10.5px] font-semibold text-[#111b21] shadow-md">
          <i className="h-1.5 w-1.5 rounded-full bg-[#ee2a7b]" />Classic Tee · ₹899
        </span>
      </div>
      <div className="flex items-center gap-3 px-3 pt-2 text-[#111b21]">
        <Heart className="h-[18px] w-[18px]" /><MessageCircle className="h-[18px] w-[18px]" /><Send className="h-[18px] w-[18px]" /><Bookmark className="ml-auto h-[18px] w-[18px]" />
      </div>
      <p className="px-3 pt-1.5 text-[11px] font-semibold text-[#111b21]">1,204 likes</p>
      <p className="px-3 pt-0.5 text-[11px] leading-snug text-[#111b21]"><b>yourbrand</b> New drop is live. Comment <b>PRICE</b> for the link.</p>
      <div className="space-y-1 px-3 pt-1.5">
        <p className="ig-cm w-fit rounded-md px-1 text-[11px] text-[#111b21]"><b>riya.styles</b> PRICE</p>
        <p className="px-1 text-[11px] text-[#111b21]"><b>aman_k</b> Size M?</p>
      </div>
    </div>
  )
}

function DmCard({ narrow }: { narrow?: boolean }) {
  const mine = "ml-auto w-fit max-w-[84%] rounded-[16px] rounded-br-md px-3 py-1.5 text-[12px] leading-snug text-white"
  const theirs = "w-fit max-w-[88%] rounded-[16px] rounded-bl-md bg-[#efefef] px-3 py-1.5 text-[12px] leading-snug text-[#111b21]"
  return (
    <div className="absolute flex flex-col overflow-hidden bg-white" style={{ left: -118, top: -176, width: 236, height: 352, borderRadius: 20, boxShadow: "0 40px 56px -22px rgba(15,42,71,.55), 0 0 0 1px rgba(15,42,71,.12)" }}>
      <div className="flex items-center gap-2 border-b border-[#efefef] px-3 py-2.5">
        <span className="rounded-full p-[1.5px]" style={{ background: IG }}><span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-[#14305a] text-[10px] font-bold text-white">Y</span></span>
        <div className="min-w-0 flex-1 leading-tight">
          <p className="text-[12px] font-semibold text-[#111b21]">yourbrand</p>
          <p className="text-[9.5px] text-[#8e8e8e]">Direct message</p>
        </div>
        <span className="rounded-full bg-[#f3eefe] px-2 py-0.5 text-[9px] font-semibold text-[#6228d7]">AI agent</span>
      </div>
      <div className="flex min-h-0 flex-1 flex-col gap-1.5 overflow-hidden px-3 pt-2.5 [&>*]:shrink-0">
        <div className="ig-m1">
          <p className="mb-1 text-right text-[9px] text-[#8e8e8e]">Replied to your comment</p>
          <div className={mine} style={{ background: "linear-gradient(135deg, #3797f0, #6a5af9)" }}>PRICE</div>
        </div>
        <div className="relative">
          <div className="ig-ty absolute left-0 top-0 flex w-fit gap-1 rounded-[16px] rounded-bl-md bg-[#efefef] px-3 py-2.5">
            {[0, 0.15, 0.3].map((d) => <i key={d} className="ig-d h-1.5 w-1.5 rounded-full bg-[#8e8e8e]" style={{ animationDelay: `${d}s` }} />)}
          </div>
          <div className="ig-m2"><div className={theirs}>Hi Riya! It is ₹899. Here is the link</div></div>
        </div>
        <div className="ig-m3 flex w-[88%] items-center gap-2 rounded-2xl border border-[#dbdbdb] bg-white p-1.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/home/p-tshirt.webp" alt="" className="h-[48px] w-[48px] shrink-0 rounded-xl object-cover" />
          <div className="min-w-0 flex-1 leading-tight">
            <p className="text-[11.5px] font-semibold text-[#111b21]">Classic Tee</p>
            <p className="text-[10.5px] text-[#8e8e8e]">₹899</p>
            <span className="mt-1 block rounded-md bg-[#0095f6] py-[3px] text-center text-[10px] font-semibold text-white">View product</span>
          </div>
        </div>
        <div className="ig-m4"><div className={mine} style={{ background: "linear-gradient(135deg, #3797f0, #6a5af9)" }}>Is M in stock?</div></div>
        <div className="relative">
          <div className="ig-ty2 absolute left-0 top-0 flex w-fit gap-1 rounded-[16px] rounded-bl-md bg-[#efefef] px-3 py-2.5">
            {[0, 0.15, 0.3].map((d) => <i key={d} className="ig-d h-1.5 w-1.5 rounded-full bg-[#8e8e8e]" style={{ animationDelay: `${d}s` }} />)}
          </div>
          <div className="ig-m5"><div className={theirs}>Yes, M is in stock. Want me to hold one?</div></div>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2 px-3 pb-3 pt-1.5">
        <span className="flex h-[30px] flex-1 items-center rounded-full border border-[#dbdbdb] px-3 text-[11px] text-[#8e8e8e]">Message...</span>
        <Heart className="h-5 w-5 text-[#111b21]" />
      </div>
      {narrow ? null : null}
    </div>
  )
}

function Scene({ narrow }: { narrow: boolean }) {
  return (
    <div className="absolute inset-0" style={{ ...P3, transform: "rotateY(calc(var(--px, 0) * 4deg)) rotateX(calc(var(--py, 0) * -3deg))", transition: "transform .25s ease-out" }}>
      <i className="absolute rounded-full" style={{ left: 280 - 250, top: 210 - 250, width: 500, height: 500, background: "radial-gradient(circle, rgba(238,42,123,.2), rgba(238,42,123,0) 64%)", transform: "translateZ(-200px) scale(1.2)" }} />
      <i className="absolute rounded-full" style={{ left: 120, top: 120, width: 360, height: 360, background: "radial-gradient(circle, rgba(98,40,215,.15), rgba(98,40,215,0) 66%)", transform: "translateZ(-200px) scale(1.2)" }} />
      {!narrow && (
        <div className="absolute" style={{ left: 142, top: 200, width: 0, height: 0, ...P3 }}>
          <div className="ig-hov2 absolute" style={{ left: 0, top: 0, width: 0, height: 0, ...P3 }}>
            <div className="absolute" style={{ left: 0, top: 0, width: 0, height: 0, ...P3, transform: "translateZ(-50px) rotateY(20deg) rotateZ(-3deg)" }}><PostCard /></div>
          </div>
        </div>
      )}
      <div className="absolute" style={{ left: narrow ? 160 : 414, top: narrow ? 200 : 218, width: 0, height: 0, ...P3 }}>
        <div className="ig-hov absolute" style={{ left: 0, top: 0, width: 0, height: 0, ...P3 }}>
          <div className="absolute" style={{ left: 0, top: 0, width: 0, height: 0, ...P3, transform: `translateZ(40px) rotateY(${narrow ? -8 : -14}deg) rotateZ(2deg)` }}><DmCard narrow={narrow} /></div>
        </div>
      </div>
      {!narrow && (
        <svg className="absolute inset-0" width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none" aria-hidden style={{ transform: "translateZ(80px)" }}>
          <defs><linearGradient id="ig-g" x1="0" x2="1"><stop offset="0" stopColor="#f09433" /><stop offset=".5" stopColor="#ee2a7b" /><stop offset="1" stopColor="#6228d7" /></linearGradient></defs>
          <path id="ig-p" className="ig-line" pathLength={1} d="M 214 316 C 250 372, 300 372, 326 296" stroke="url(#ig-g)" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M 326 296 L 316 304 M 326 296 L 334 306" stroke="#6228d7" strokeWidth="3.5" strokeLinecap="round" className="ig-line" pathLength={1} />
          <g className="ig-plane">
            <circle r="13" fill="#ee2a7b" opacity=".2"><animateMotion dur="1.6s" repeatCount="indefinite"><mpath href="#ig-p" /></animateMotion></circle>
            <circle r="9" fill="#fff" stroke="#ee2a7b" strokeWidth="2"><animateMotion dur="1.6s" repeatCount="indefinite"><mpath href="#ig-p" /></animateMotion></circle>
          </g>
        </svg>
      )}
    </div>
  )
}

function Key({ flow }: { flow?: boolean }) {
  return (
    <div className={flow ? "mx-auto mt-3 w-full max-w-[340px] px-1" : "absolute inset-x-0 px-5"} style={flow ? undefined : { top: 408 }}>
      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#c1236c]">How SMSLocal helps</p>
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

export function InstagramHero() {
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
  const label = "A product post and the direct message its comments turn into. On the left an Instagram post shows a classic white tee with a price tag and a comment that says PRICE. On the right the DM it opens: an instant answer with the price, a product card, a question about size and a second answer. A gradient line carries the comment across. Below, three points light up in step: comments become DMs, the AI agent answers instantly, and the product sells in the chat"
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
