import Image from "next/image"
import type { CSSProperties, ReactNode } from "react"
import { ArrowLeft, BadgeCheck, CheckCheck, EllipsisVertical, MessageSquare, Reply, ShoppingBag, Eye } from "lucide-react"
import type { LucideIcon } from "lucide-react"

// Hero graphic for /products/rcs: one real-looking RCS conversation in a messaging app. A verified business sends a rich card,
// the customer taps a suggested reply, and the carousel that answers swipes out past the edge of the phone. Beside it, the plain
// SMS that a phone without RCS receives. Plain CSS keyframes, no scripts. Every size is in --u units (1/600 of the stage width).

const LOOP = 13

const u = (n: number) => `calc(${n} * var(--u))`
const box = (x: number, y: number, w?: number, h?: number): CSSProperties => ({
  position: "absolute", left: u(x), top: u(y), ...(w !== undefined ? { width: u(w) } : {}), ...(h !== undefined ? { height: u(h) } : {}),
})

// each piece appears at its moment, stays, and leaves together with the others before the loop restarts
const appear = (name: string, at: number, from: string) =>
  `@keyframes ${name} { 0%, ${at}% { opacity: 0; transform: ${from} } ${at + 4}%, 93% { opacity: 1; transform: none } 97%, 100% { opacity: 0; transform: none } }
.${name} { animation: ${name} ${LOOP}s cubic-bezier(.2,.75,.25,1) infinite }`

// after the carousel lands, each card lifts in turn and its button fills in
const lift = (i: number, at: number) =>
  `@keyframes rch-l${i} { 0%, ${at}% { transform: none } ${at + 3}%, ${at + 6}% { transform: translateY(calc(-12 * var(--u))) scale(1.035) } ${at + 9}%, 100% { transform: none } }
.rch-l${i} { animation: rch-l${i} ${LOOP}s cubic-bezier(.3,.7,.3,1) infinite }
@keyframes rch-f${i} { 0%, ${at}% { background-color: #fff; color: #0b57d0 } ${at + 3}%, ${at + 6}% { background-color: #0b57d0; color: #fff } ${at + 9}%, 100% { background-color: #fff; color: #0b57d0 } }
.rch-f${i} { animation: rch-f${i} ${LOOP}s ease-out infinite }`

const CSS = `
.rch-wrap { container-type: inline-size }
.rch { --u: calc(100cqw / 600) }
@media (max-width: 639px) {
  .rch-wrap { overflow: hidden }
  .rch { --u: calc(100cqw / 320); left: calc(-26 * var(--u)); height: calc(740 * var(--u)) !important }
  .rch-sms { left: calc(54 * var(--u)) !important; top: calc(628 * var(--u)) !important; width: calc(264 * var(--u)) !important }
}
${appear("rch-card", 2, "translateY(calc(18 * var(--u))) scale(.96)")}
${appear("rch-sms", 12, "translateX(calc(24 * var(--u)))")}
${appear("rch-me", 27, "translateY(calc(14 * var(--u))) scale(.9)")}
${appear("rch-c1", 42, "translateX(calc(-30 * var(--u)))")}
${appear("rch-c2", 46, "translateX(calc(-80 * var(--u)))")}
${appear("rch-c3", 50, "translateX(calc(-130 * var(--u)))")}
${appear("rch-p1", 58, "translateY(calc(14 * var(--u))) scale(.6)")}
${appear("rch-p2", 61, "translateY(calc(14 * var(--u))) scale(.6)")}
${appear("rch-p3", 64, "translateY(calc(14 * var(--u))) scale(.6)")}
${lift(1, 67)}
${lift(2, 74)}
${lift(3, 81)}
@keyframes rch-float { 0%, 100% { transform: translateY(0) } 50% { transform: translateY(calc(-7 * var(--u))) } }
.rch-float { position: absolute; inset: 0; animation: rch-float 6.5s ease-in-out infinite }
.rch-float2 { animation: rch-float 6.5s ease-in-out -3.2s infinite }
@keyframes rch-wave { 0% { transform: scale(.55); opacity: 0 } 18% { opacity: .75 } 100% { transform: scale(1.18); opacity: 0 } }
.rch-wave { opacity: 0; animation: rch-wave 6s cubic-bezier(.2,.6,.4,1) infinite }
@keyframes rch-zoom { 0%, 100% { transform: scale(1) } 55% { transform: scale(1.09) } }
.rch-zoom { animation: rch-zoom ${LOOP}s ease-in-out infinite }
@keyframes rch-shine { 0%, 12% { transform: translateX(-130%) } 22%, 100% { transform: translateX(130%) } }
.rch-shine { transform: translateX(-130%); animation: rch-shine ${LOOP}s ease-in-out infinite }
@keyframes rch-verify { 0%, 4% { transform: scale(0) rotate(-60deg) } 8% { transform: scale(1.35) rotate(8deg) } 11%, 100% { transform: scale(1) rotate(0) } }
.rch-verify { display: inline-flex; animation: rch-verify ${LOOP}s ease-out infinite }
@keyframes rch-buzz { 0%, 16%, 24%, 100% { transform: rotate(0) } 18% { transform: rotate(-2.4deg) } 20% { transform: rotate(2deg) } 22% { transform: rotate(-1deg) } }
.rch-buzz { transform-origin: left bottom; animation: rch-buzz ${LOOP}s ease-in-out infinite }
@keyframes rch-tap { 0%, 20% { background-color: #fff; transform: scale(1) } 23% { background-color: #d3e3fd; transform: scale(.96) } 27%, 100% { background-color: #fff; transform: scale(1) } }
.rch-tap { animation: rch-tap ${LOOP}s ease-out infinite }
@keyframes rch-finger { 0%, 19% { opacity: 0; transform: scale(.3) } 22% { opacity: .9; transform: scale(.7) } 27%, 100% { opacity: 0; transform: scale(1.6) } }
.rch-finger { opacity: 0; animation: rch-finger ${LOOP}s ease-out infinite }
@keyframes rch-typing { 0%, 32% { opacity: 0 } 34%, 41% { opacity: 1 } 43%, 100% { opacity: 0 } }
.rch-typing { opacity: 0; animation: rch-typing ${LOOP}s linear infinite }
@keyframes rch-dot { 0%, 100% { transform: translateY(0); opacity: .45 } 50% { transform: translateY(calc(-3 * var(--u))); opacity: 1 } }
.rch-dot { animation: rch-dot .8s ease-in-out infinite }
@keyframes rch-read { 0%, 33% { opacity: 0 } 36%, 93% { opacity: 1 } 97%, 100% { opacity: 0 } }
.rch-read { animation: rch-read ${LOOP}s linear infinite }
@media (prefers-reduced-motion: reduce) {
  .rch-card, .rch-sms, .rch-me, .rch-c1, .rch-c2, .rch-c3, .rch-p1, .rch-p2, .rch-p3, .rch-read, .rch-tap { animation: none }
  .rch-l1, .rch-l2, .rch-l3, .rch-f1, .rch-f2, .rch-f3, .rch-float, .rch-float2, .rch-zoom, .rch-shine, .rch-verify, .rch-buzz { animation: none }
  .rch-typing, .rch-finger, .rch-wave { display: none }
}
`

const MORE: { img: string; pos: string; t: string; d: string; btn: string; Icon: LucideIcon }[] = [
  { img: "/home/rcs-backpack.webp", pos: "center 68%", t: "City backpack", d: "Room for your day", btn: "View", Icon: Eye },
  { img: "/home/rcs-sunglasses.webp", pos: "center 55%", t: "Sunny day shades", d: "New for the season", btn: "Shop now", Icon: ShoppingBag },
  { img: "/home/rcs-speaker.webp", pos: "center", t: "Portable speaker", d: "Take it anywhere", btn: "View", Icon: Eye },
]

function Action({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`flex items-center justify-center font-bold text-[#0b57d0] ${className}`} style={{ height: u(34), gap: u(6), fontSize: u(12.5) }}>{children}</span>
  )
}

export function RcsChatHero() {
  const label = "An RCS conversation on a phone. The verified business Urban Cart sends a rich card with a photo of wireless headphones and a Buy now button. The customer taps the suggested reply Show me more, sees it marked as read, and a carousel of product cards swipes out past the edge of the phone, followed by more suggested replies. A phone without RCS receives a plain SMS instead"
  return (
    <div role="img" aria-label={label} className="rch-wrap mx-auto w-full max-w-[310px] sm:max-w-[490px] xl:max-w-[510px]">
      <div aria-hidden className="rch relative text-[#14233a]" style={{ height: u(612) }}>
        {/* soft rings travelling out from the phone: the message going out */}
        {[0, 1, 2].map((i) => <i key={i} className="rch-wave pointer-events-none" style={{ ...box(-4, 112, 380, 380), borderRadius: "50%", border: `${u(1.5)} solid rgba(14,159,110,.38)`, animationDelay: `${i * 2}s` }} />)}

        {/* soft floor under the phone */}
        <i style={{ ...box(30, 560, 330, 40), borderRadius: "50%", background: "rgba(15,42,71,.16)", filter: `blur(${u(20)})` }} />

        <div className="rch-float">
        {/* the phone */}
        <div style={{ ...box(36, 4, 300, 596), borderRadius: u(46), background: "#111827", boxShadow: `0 ${u(30)} ${u(50)} ${u(-28)} rgba(15,42,71,.55)` }} />
        <div style={{ ...box(41, 9, 290, 586), borderRadius: u(41), background: "#f6f8fc" }} />
        <i style={{ ...box(179, 18, 14, 14), borderRadius: "50%", background: "#111827" }} />
        <span className="font-bold" style={{ ...box(66, 18), fontSize: u(11.5) }}>9:41</span>
        <span style={{ ...box(276, 20), display: "flex", alignItems: "flex-end", gap: u(2) }}>
          {[4, 6, 8, 10].map((h) => <i key={h} style={{ width: u(2.6), height: u(h), background: "#14233a", display: "block" }} />)}
          <i style={{ width: u(17), height: u(9), marginLeft: u(5), borderRadius: u(2.5), background: "#14233a", display: "block" }} />
        </span>

        {/* conversation header: the verified sender */}
        <div className="flex items-center bg-white" style={{ ...box(41, 40, 290, 56), padding: `0 ${u(12)}`, gap: u(9), borderBottom: "1px solid #e6eaf0" }}>
          <ArrowLeft style={{ width: u(17), height: u(17) }} />
          <span className="flex items-center justify-center rounded-full bg-[#0f2a47] font-extrabold text-white" style={{ width: u(34), height: u(34), fontSize: u(15) }}>U</span>
          <span className="leading-tight">
            <span className="flex items-center font-bold" style={{ fontSize: u(14), gap: u(4) }}>Urban Cart<span className="rch-verify"><BadgeCheck className="fill-[#0b57d0] text-white" style={{ width: u(17), height: u(17) }} /></span></span>
            <span className="block text-[#5b6678]" style={{ fontSize: u(10.5) }}>Verified business</span>
          </span>
          <EllipsisVertical className="ml-auto" style={{ width: u(16), height: u(16) }} />
        </div>
        <p className="text-center text-[#5b6678]" style={{ ...box(41, 103, 290), margin: 0, fontSize: u(10) }}>RCS message · Today</p>

        {/* 1 · the rich card */}
        <div className="rch-card overflow-hidden bg-white" style={{ ...box(54, 122, 224, 190), borderRadius: u(18), boxShadow: "0 0 0 1px #e3e8ef" }}>
          <span className="relative block overflow-hidden" style={{ height: u(112) }}>
            <Image src="/home/rcs-headphones.webp" alt="" fill sizes="240px" priority className="rch-zoom object-cover" style={{ objectPosition: "72% 52%" }} />
          </span>
          <span className="block leading-tight" style={{ height: u(44), padding: `${u(6)} ${u(12)}` }}>
            <span className="block font-bold" style={{ fontSize: u(13) }}>New wireless headphones</span>
            <span className="block text-[#5b6678]" style={{ fontSize: u(11), marginTop: u(2) }}>Over-ear, in classic black</span>
          </span>
          <span className="relative block overflow-hidden border-t border-[#e3e8ef]">
            <Action><ShoppingBag style={{ width: u(14), height: u(14) }} />Buy now</Action>
            <i className="rch-shine pointer-events-none absolute inset-0 block bg-gradient-to-r from-transparent via-[#0b57d0]/15 to-transparent" />
          </span>
        </div>

        {/* the suggested reply the customer taps */}
        <span className="rch-tap inline-flex items-center justify-center rounded-full border border-[#c3d3f0] font-bold text-[#0b57d0]" style={{ ...box(54, 320, 124, 28), fontSize: u(11.5) }}>Show me more</span>
        <i className="rch-finger" style={{ ...box(124, 318, 32, 32), borderRadius: "50%", background: "rgba(11,87,208,.35)" }} />

        {/* 2 · the customer's reply */}
        <span className="rch-me flex items-center justify-center bg-[#0b57d0] font-semibold text-white" style={{ ...box(202, 354, 116, 32), borderRadius: `${u(16)} ${u(16)} ${u(4)} ${u(16)}`, fontSize: u(12.5), transformOrigin: "right bottom" }}>Show me more</span>
        <span className="rch-read flex items-center justify-end font-semibold text-[#5b6678]" style={{ ...box(202, 389, 116), gap: u(3), fontSize: u(9.5) }}><CheckCheck className="text-[#0b57d0]" style={{ width: u(12), height: u(12) }} />Read</span>
        <span className="rch-typing flex items-center justify-center bg-[#e9edf3]" style={{ ...box(54, 406, 50, 28), borderRadius: u(14), gap: u(4) }}>
          {[0, 1, 2].map((i) => <i key={i} className="rch-dot block rounded-full bg-[#5b6678]" style={{ width: u(5.5), height: u(5.5), animationDelay: `${i * 0.13}s` }} />)}
        </span>

        {/* 3 · the carousel answers, swiping out past the phone */}
        {MORE.map((c, i) => (
          <div key={c.t} className={`rch-c${i + 1}`} style={{ ...box(54 + i * 178, 406, 168, 148), zIndex: 3 - i }}>
            <div className={`rch-l${i + 1} h-full overflow-hidden bg-white`} style={{ borderRadius: u(16), boxShadow: `0 0 0 1px #e3e8ef, 0 ${u(18)} ${u(28)} ${u(-18)} rgba(15,42,71,.45)` }}>
            <span className="relative block" style={{ height: u(72) }}>
              <Image src={c.img} alt="" fill sizes="180px" className="object-cover" style={{ objectPosition: c.pos }} />
            </span>
            <span className="block leading-tight" style={{ padding: `${u(7)} ${u(11)}` }}>
              <span className="block whitespace-nowrap font-bold" style={{ fontSize: u(12.5) }}>{c.t}</span>
              <span className="block whitespace-nowrap text-[#5b6678]" style={{ fontSize: u(10.5), marginTop: u(2) }}>{c.d}</span>
            </span>
            <Action className={`rch-f${i + 1} border-t border-[#e3e8ef]`}><c.Icon style={{ width: u(13), height: u(13) }} />{c.btn}</Action>
            </div>
          </div>
        ))}

        {/* suggested replies */}
        <div className="flex" style={{ ...box(54, 564), gap: u(6) }}>
          {["Colours", "Track order", "Call us"].map((r, i) => (
            <span key={r} className={`rch-p${i + 1} inline-flex items-center whitespace-nowrap rounded-full border border-[#c3d3f0] bg-white font-bold text-[#0b57d0]`} style={{ height: u(24), padding: `0 ${u(10)}`, gap: u(4), fontSize: u(10.5) }}><Reply style={{ width: u(10), height: u(10) }} />{r}</span>
          ))}
        </div>

        </div>

        {/* what a phone without RCS receives */}
        <div className="rch-sms" style={box(366, 128, 220)}>
          <div className="rch-float2"><div className="rch-buzz">
          <p className="font-bold uppercase text-[#5b6678]" style={{ margin: 0, fontSize: u(10.5), letterSpacing: "0.12em" }}>Phone without RCS</p>
          <p className="bg-[#eef1f5] leading-snug" style={{ margin: `${u(10)} 0 0`, padding: `${u(12)} ${u(14)}`, borderRadius: `${u(18)} ${u(18)} ${u(18)} ${u(5)}`, fontSize: u(13) }}>Urban Cart: New wireless headphones are here. Visit our online store.</p>
          <p className="flex items-center font-semibold text-[#0b7a55]" style={{ margin: `${u(9)} 0 0`, gap: u(6), fontSize: u(12) }}><MessageSquare style={{ width: u(13), height: u(13) }} />Sent as your DLT-approved SMS</p>
          </div></div>
        </div>
      </div>
      <style>{CSS}</style>
    </div>
  )
}
