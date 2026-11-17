"use client"

import { useEffect, useRef, useState } from "react"
import { CalendarCheck, Check, Gift, MessageCircle, Tag } from "lucide-react"
import type { LucideIcon } from "lucide-react"

// Hero graphic for /solutions/retail: a real flat-lay photo of a shopping bag, a card and a phone, made to show what SMSLocal does.
// The photo already on the site (a paper bag, a blank card and a phone) is the base. SMSLocal's part is laid on top of the real objects:
// the bag is stamped "Receipt sent on WhatsApp", the blank card becomes a loyalty card that gains 120 points, and the phone screen
// receives a flash-sale message and a table confirmation one after another. Below the photo, three plain lines say what that does for the
// business and light up in step. No chips on lines, no invented numbers beyond the placeholders. Photo + HTML, silent, looping.

const W = 560
const PH = 360
const H = 486
const LOOP = 14
const IMG_SCALE = 0.75
const OX = 330
const OY = 120

const CAPS: { Icon: LucideIcon; t: string; d: string; c: string; k: string }[] = [
  { Icon: MessageCircle, t: "Receipts on WhatsApp", d: "Every bill reaches the customer's phone as a message.", c: "#0e9f6e", k: "rt-c1" },
  { Icon: Gift, t: "Loyalty points updated", d: "Points and offers arrive the moment they are earned.", c: "#d946ef", k: "rt-c2" },
  { Icon: CalendarCheck, t: "Sales and bookings sent", d: "Flash sales and table confirmations reach guests at once.", c: "#f59e0b", k: "rt-c3" },
]

const CSS = `
@keyframes rt-stamp { 0%, 8% { opacity: 0; transform: rotate(-9deg) scale(1.7) } 14%, 94% { opacity: 1; transform: rotate(-9deg) scale(1) } 98%, 100% { opacity: 0; transform: rotate(-9deg) scale(1) } }
.rt-stamp { opacity: 0; animation: rt-stamp ${LOOP}s cubic-bezier(.3,1.4,.4,1) infinite }
@keyframes rt-bar { 0%, 34% { width: 62% } 44%, 94% { width: 78% } 100% { width: 62% } }
.rt-bar { width: 62%; animation: rt-bar ${LOOP}s ease-in-out infinite }
@keyframes rt-plus { 0%, 34% { opacity: 0; transform: translateY(8px) scale(.8) } 40%, 90% { opacity: 1; transform: translateY(0) scale(1) } 96%, 100% { opacity: 0 } }
.rt-plus { opacity: 0; animation: rt-plus ${LOOP}s ease-out infinite }
@keyframes rt-n1 { 0%, 56% { opacity: 0; transform: translateY(-10px) scale(.96) } 61%, 94% { opacity: 1; transform: translateY(0) scale(1) } 98%, 100% { opacity: 0 } }
@keyframes rt-n2 { 0%, 72% { opacity: 0; transform: translateY(-10px) scale(.96) } 77%, 94% { opacity: 1; transform: translateY(0) scale(1) } 98%, 100% { opacity: 0 } }
.rt-n1 { opacity: 0; animation: rt-n1 ${LOOP}s cubic-bezier(.2,.8,.25,1) infinite }
.rt-n2 { opacity: 0; animation: rt-n2 ${LOOP}s cubic-bezier(.2,.8,.25,1) infinite }
@keyframes rt-c1 { 0%, 4% { opacity: .65 } 8%, 28% { opacity: 1 } 32%, 100% { opacity: .65 } }
@keyframes rt-c2 { 0%, 30% { opacity: .65 } 34%, 52% { opacity: 1 } 56%, 100% { opacity: .65 } }
@keyframes rt-c3 { 0%, 54% { opacity: .65 } 58%, 94% { opacity: 1 } 98%, 100% { opacity: .65 } }
.rt-c1 { animation: rt-c1 ${LOOP}s ease-in-out infinite }
.rt-c2 { animation: rt-c2 ${LOOP}s ease-in-out infinite }
.rt-c3 { animation: rt-c3 ${LOOP}s ease-in-out infinite }
@keyframes rt-glow { 0%, 100% { box-shadow: 0 0 0 0 rgba(14,159,110,0) } 50% { box-shadow: 0 0 0 8px rgba(14,159,110,.14) } }
.rt-glow { animation: rt-glow 3.2s ease-in-out infinite }
@media (prefers-reduced-motion: reduce) {
  [class*="rt-c"], .rt-stamp, .rt-plus, .rt-n1, .rt-n2 { animation: none; opacity: 1; transform: none }
  .rt-stamp { transform: rotate(-9deg) }
  .rt-bar { animation: none; width: 78% }
  .rt-glow { animation: none }
}
`

const px = (x: number) => Math.round((x - OX) * IMG_SCALE)
const py = (y: number) => Math.round((y - OY) * IMG_SCALE)

function Photo() {
  return (
    <div className="absolute inset-x-0 top-0 overflow-hidden" style={{ height: PH, borderRadius: 26, boxShadow: "0 40px 56px -28px rgba(15,42,71,.55), 0 0 0 1px rgba(15,42,71,.12)" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/home/ind-ecommerce.webp" alt="" style={{ position: "absolute", left: -OX * IMG_SCALE, top: -OY * IMG_SCALE, width: 1400 * IMG_SCALE, maxWidth: "none", height: "auto" }} />

      {/* the blank card becomes a loyalty card */}
      <div className="absolute overflow-hidden text-white" style={{ left: px(668), top: Math.max(py(118), 6), width: px(965) - px(668), height: py(303) - Math.max(py(118), 6), borderRadius: 12, background: "linear-gradient(135deg, #0f2a47 0%, #1b4f6b 55%, #14a373 100%)", boxShadow: "0 14px 22px -10px rgba(15,42,71,.6), inset 0 0 0 1px rgba(255,255,255,.2)" }}>
        <i className="absolute -right-8 -top-10 h-28 w-28 rounded-full bg-white/10" />
        <div className="relative flex h-full flex-col justify-between p-3">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/70">StyleHub Rewards</p>
              <p className="text-[12px] font-semibold">Gold member</p>
            </div>
            <i className="h-5 w-7 rounded-[5px]" style={{ background: "linear-gradient(135deg, #f6d98a, #c9a24a)" }} />
          </div>
          <div>
            <div className="flex items-end justify-between">
              <p className="text-[19px] font-semibold leading-none tracking-tight">2,140<span className="ml-1 text-[9px] font-medium text-white/70">points</span></p>
              <span className="rt-plus rounded-full bg-[#7fdcb8] px-1.5 py-0.5 text-[9.5px] font-bold text-[#0b3b2a]">+120</span>
            </div>
            <i className="mt-1.5 block h-1.5 w-full rounded-full bg-white/20"><i className="rt-bar block h-full rounded-full bg-[#7fdcb8]" /></i>
          </div>
        </div>
      </div>

      {/* the bag is stamped */}
      <div className="absolute flex justify-center" style={{ left: px(405), top: py(500), width: px(695) - px(405) }}>
        <div className="rt-stamp flex items-center gap-2 rounded-md border-[2.5px] border-[#0e9f6e] bg-white/85 px-3 py-1.5 text-[#0b6b4c] shadow-md">
          <Check className="h-4 w-4" strokeWidth={3.6} />
          <span className="text-[11px] font-extrabold uppercase leading-tight tracking-[0.08em]">Receipt sent<br />on WhatsApp</span>
        </div>
      </div>

      {/* the phone screen receives messages */}
      <div className="absolute overflow-hidden" style={{ left: px(757), top: py(366), width: px(963) - px(757), height: PH - py(366), borderRadius: "14px 14px 0 0", background: "#06090f" }}>
        <p className="mt-2 text-center font-mono text-[8px] uppercase tracking-[0.2em] text-white/45">9:41 · Tue</p>
        <div className="mt-3 space-y-1.5 px-1.5">
          <div className="rt-n1 flex items-center gap-1.5 rounded-xl bg-white/92 px-1.5 py-1.5">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#e5446d] text-white"><Tag className="h-3.5 w-3.5" /></span>
            <span className="min-w-0 leading-tight"><span className="block text-[9.5px] font-bold text-[#0f2a47]">StyleHub</span><span className="block text-[9px] text-[#0f2a47]/80">Flash sale: 40% off till 9 PM</span></span>
          </div>
          <div className="rt-n2 flex items-center gap-1.5 rounded-xl bg-white/92 px-1.5 py-1.5">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#f59e0b] text-white"><CalendarCheck className="h-3.5 w-3.5" /></span>
            <span className="min-w-0 leading-tight"><span className="block text-[9.5px] font-bold text-[#0f2a47]">The Corner Table</span><span className="block text-[9px] text-[#0f2a47]/80">Table for 4 at 7:30 PM confirmed</span></span>
          </div>
        </div>
      </div>
    </div>
  )
}

function Captions({ flow }: { flow?: boolean }) {
  return (
    <div className={flow ? "mx-auto mt-4 w-full max-w-[340px] px-1" : "absolute inset-x-0 px-3"} style={flow ? undefined : { top: PH + 22 }}>
      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0b6b4c]">How SMSLocal helps</p>
      <ul className={flow ? "mt-3 space-y-3.5" : "mt-3 grid grid-cols-3 gap-4"}>
        {CAPS.map((s) => (
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

export function RetailHero() {
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
  const narrow = width < 520
  const k = Math.min(1, width / W)
  const SH = narrow ? PH : H
  const label = "A real flat-lay photo of a paper shopping bag, a blank card and a phone, made to show SMSLocal at work. The bag is stamped receipt sent on WhatsApp, the card becomes a loyalty card that gains 120 points, and the phone screen receives a flash sale message and a table confirmation. Below, three points light up in step: receipts on WhatsApp, loyalty points updated, and sales and bookings sent"
  return (
    <div ref={box} className="relative mx-auto w-full max-w-[560px]">
      <div className="relative" style={{ height: SH * k }} role="img" aria-label={label}>
        <div className="absolute left-0 top-0 origin-top-left" style={{ width: W, height: SH, transform: `scale(${k})` }}>
          <Photo />
          {!narrow && <Captions />}
        </div>
      </div>
      {narrow && <Captions flow />}
      <style>{CSS}</style>
    </div>
  )
}
