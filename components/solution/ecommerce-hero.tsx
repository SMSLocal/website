"use client"

import { useEffect, useRef, useState } from "react"
import { Camera, Check, CheckCheck, ChevronLeft, Clock, Mic, MessageSquare, Phone, ShoppingCart, Smile, Star, Video } from "lucide-react"

// Hero graphic for /solutions/ecommerce: a lost sale being won back, in real 3D.
// A glass storefront window shows a product page (a D2C supplement jar, ₹1,299). The shopper taps "Add to cart", then
// leaves: the product is tagged "Left in cart". A glass phone then swings in from the depth of the scene with the AI
// WhatsApp agent's cart reminder in Hindi; the shopper replies, the agent confirms the order, the storefront flips to
// "Ordered" and an order-confirmation SMS pops up. A revenue chip counts up to ₹1,299 recovered, while a progress strip
// along the bottom lights up Cart, WhatsApp nudge, Order, Shipped, Delivered. The scene sways gently and leans toward
// the pointer. HTML + CSS 3D transforms, silent, 16-second loop.

const W = 560
const H = 440
const STEPS = [
  { t: "Cart", at: 15 },
  { t: "WhatsApp nudge", at: 34 },
  { t: "Order", at: 58 },
  { t: "Shipped", at: 72 },
  { t: "Delivered", at: 86 },
]

const f = (n: number) => +n.toFixed(2)
const win = (name: string, a: number, b: number, y = 10) =>
  `@keyframes ${name} { 0%, ${f(a)}% { opacity: 0; transform: translateY(${y}px) } ${f(a + 3)}%, ${f(b)}% { opacity: 1; transform: none } ${f(b + 3)}%, 100% { opacity: 0 } }`

const CSS = `
@property --ecn { syntax: "<integer>"; inherits: false; initial-value: 0 }
${win("ec-win", 0, 94, 16)}
${win("ec-b1", 36, 94, 10)}
${win("ec-b2", 46, 94, 10)}
${win("ec-b3", 56, 94, 10)}
${win("ec-sms", 61, 94, 12)}
${win("ec-rev", 64, 94, 12)}
${win("ec-left", 24, 58, 6)}
${win("ec-badge", 15, 94, 4)}
@keyframes ec-phone { 0%, 27% { opacity: 0; transform: translateZ(-320px) rotateY(46deg) } 35%, 94% { opacity: 1; transform: none } 98%, 100% { opacity: 0; transform: none } }
@keyframes ec-press { 0%, 12% { transform: none } 13.5%, 15% { transform: scale(.94) translateY(2px) } 17%, 100% { transform: none } }
@keyframes ec-t1 { 0%, 14% { opacity: 1 } 16%, 100% { opacity: 0 } }
@keyframes ec-t2 { 0%, 14% { opacity: 0 } 16%, 57% { opacity: 1 } 59%, 100% { opacity: 0 } }
@keyframes ec-t3 { 0%, 57% { opacity: 0 } 60%, 94% { opacity: 1 } 98%, 100% { opacity: 0 } }
@keyframes ec-dim { 0%, 22% { opacity: 0 } 26%, 58% { opacity: 1 } 61%, 100% { opacity: 0 } }
@keyframes ec-count { 0%, 64% { --ecn: 0 } 76%, 100% { --ecn: 1299 } }
@keyframes ec-line { 0%, 12% { transform: scaleX(0) } 88%, 100% { transform: scaleX(1) } }
${STEPS.map((s, i) => `@keyframes ec-n${i} { 0%, ${s.at - 1}% { background: #fff; color: #7b8aa0; box-shadow: 0 0 0 0 transparent } ${s.at + 1.5}%, 94% { background: var(--primary); color: #fff; box-shadow: 0 0 0 4px color-mix(in oklch, var(--primary) 22%, transparent) } 98%, 100% { background: #fff; color: #7b8aa0; box-shadow: 0 0 0 0 transparent } }
.ec-n${i} { animation: ec-n${i} 16s ease-in-out infinite }`).join("\n")}
@keyframes ec-sway { 0%, 100% { transform: rotateY(-3deg) } 50% { transform: rotateY(3deg) } }
@keyframes ec-float { 0%, 100% { translate: 0 -3px } 50% { translate: 0 4px } }
@keyframes ec-live { 0%, 100% { opacity: 1 } 50% { opacity: .35 } }
.ec-win { opacity: 0; animation: ec-win 16s cubic-bezier(.2,.7,.2,1) infinite }
.ec-b1 { opacity: 0; animation: ec-b1 16s cubic-bezier(.2,.7,.2,1) infinite } .ec-b2 { opacity: 0; animation: ec-b2 16s cubic-bezier(.2,.7,.2,1) infinite } .ec-b3 { opacity: 0; animation: ec-b3 16s cubic-bezier(.2,.7,.2,1) infinite }
.ec-sms { opacity: 0; animation: ec-sms 16s cubic-bezier(.3,1.3,.4,1) infinite }
.ec-rev { opacity: 0; animation: ec-rev 16s cubic-bezier(.3,1.3,.4,1) infinite }
.ec-left { opacity: 0; animation: ec-left 16s cubic-bezier(.3,1.3,.4,1) infinite }
.ec-badge { opacity: 0; animation: ec-badge 16s cubic-bezier(.3,1.6,.4,1) infinite }
.ec-phone { opacity: 0; animation: ec-phone 16s cubic-bezier(.2,.8,.2,1) infinite }
.ec-press { animation: ec-press 16s ease-in-out infinite }
.ec-t1 { animation: ec-t1 16s linear infinite } .ec-t2 { opacity: 0; animation: ec-t2 16s linear infinite } .ec-t3 { opacity: 0; animation: ec-t3 16s linear infinite }
.ec-dim { opacity: 0; animation: ec-dim 16s ease-in-out infinite }
.ec-num { --ecn: 0; counter-reset: ecn var(--ecn); animation: ec-count 16s linear infinite }
.ec-num::after { content: counter(ecn) }
.ec-line { transform-origin: left; transform: scaleX(0); animation: ec-line 16s linear infinite }
.ec-sway { animation: ec-sway 9s ease-in-out infinite }
.ec-float { animation: ec-float 6s ease-in-out infinite }
.ec-live { animation: ec-live 1.4s ease-in-out infinite }
@media (prefers-reduced-motion: reduce) {
  .ec-sway, .ec-float, .ec-live, .ec-press, .ec-dim { animation: none }
  .ec-win, .ec-b1, .ec-b2, .ec-b3, .ec-sms, .ec-rev, .ec-badge, .ec-phone { animation: none; opacity: 1; transform: none }
  .ec-left, .ec-t1, .ec-t2 { animation: none; opacity: 0 } .ec-t3 { animation: none; opacity: 1 }
  .ec-num { animation: none; --ecn: 1299 } .ec-line { animation: none; transform: scaleX(1) }
  [class*="ec-n"] { animation: none }
}
`

const P3 = { transformStyle: "preserve-3d" as const }
const z = (px: number) => ({ transform: `translateZ(${px}px)` })

function Gloss() {
  return <i className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(115deg,rgba(255,255,255,.6)_0%,rgba(255,255,255,.1)_30%,transparent_46%)]" />
}

/* a D2C supplement tub: shaded body, ridged cap, wrap-around label */
function Jar() {
  return (
    <svg viewBox="0 0 140 190" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id="ec-body" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#1b7762" /><stop offset=".22" stopColor="#3fbf9f" /><stop offset=".48" stopColor="#8be6cb" /><stop offset=".78" stopColor="#3aae8f" /><stop offset="1" stopColor="#14604e" /></linearGradient>
        <linearGradient id="ec-cap" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#0c1829" /><stop offset=".3" stopColor="#2a3f5c" /><stop offset=".5" stopColor="#3a5476" /><stop offset=".8" stopColor="#1a2b44" /><stop offset="1" stopColor="#0a1423" /></linearGradient>
        <linearGradient id="ec-label" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#c9d6d2" /><stop offset=".18" stopColor="#f6faf8" /><stop offset=".55" stopColor="#ffffff" /><stop offset=".85" stopColor="#eef4f1" /><stop offset="1" stopColor="#bccac5" /></linearGradient>
        <radialGradient id="ec-floor" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#0f1a2e" stopOpacity=".28" /><stop offset="1" stopColor="#0f1a2e" stopOpacity="0" /></radialGradient>
      </defs>
      <ellipse cx="72" cy="176" rx="52" ry="9" fill="url(#ec-floor)" />
      <path d="M20 168 C 8 150 12 128 30 118 C 36 134 34 152 20 168Z" fill="#2fae8c" opacity=".85" />
      <path d="M124 170 C 136 152 132 132 114 124 C 108 140 110 156 124 170Z" fill="#1f8a6e" opacity=".85" />
      <rect x="30" y="52" width="80" height="118" rx="15" fill="url(#ec-body)" />
      <rect x="36" y="38" width="68" height="20" rx="6" fill="url(#ec-body)" />
      <ellipse cx="70" cy="168" rx="38" ry="5.5" fill="#0b4a3b" opacity=".35" />
      <rect x="32" y="10" width="76" height="34" rx="9" fill="url(#ec-cap)" />
      {Array.from({ length: 11 }, (_, i) => <line key={i} x1={39 + i * 6.2} y1="16" x2={39 + i * 6.2} y2="40" stroke="#fff" strokeOpacity=".1" strokeWidth="1.4" />)}
      <rect x="36" y="12" width="68" height="3" rx="1.5" fill="#fff" opacity=".22" />
      <rect x="34" y="42" width="72" height="4" rx="2" fill="#0a1423" opacity=".55" />
      <rect x="30" y="76" width="80" height="70" fill="url(#ec-label)" />
      <rect x="30" y="140" width="80" height="6" fill="#2fae8c" />
      <path d="M62 96 C 62 86 72 84 78 88 C 76 98 68 102 62 96Z" fill="#2fae8c" />
      <path d="M62 96 C 66 94 70 92 74 90" stroke="#fff" strokeWidth="1" fill="none" strokeLinecap="round" />
      <text x="70" y="113" textAnchor="middle" fontSize="10" fontWeight="700" fill="#14233a" fontFamily="inherit">Nutri&amp;Bloom</text>
      <text x="70" y="124" textAnchor="middle" fontSize="6.4" fontWeight="700" fill="#1f8a6e" letterSpacing="1.2" fontFamily="inherit">DAILY GREENS</text>
      <text x="70" y="134" textAnchor="middle" fontSize="5.2" fill="#6b7a8e" fontFamily="inherit">30 sachets · 150 g</text>
      <rect x="37" y="58" width="6" height="104" rx="3" fill="#fff" opacity=".4" />
      <rect x="96" y="60" width="2.5" height="96" rx="1.2" fill="#fff" opacity=".18" />
    </svg>
  )
}

function Scene() {
  return (
    <div className="absolute inset-0" style={{ ...P3, transform: "rotateY(calc(-11deg + var(--px, 0) * 7deg)) rotateX(calc(4deg + var(--py, 0) * -5deg))", transition: "transform .25s ease-out" }}>
      <div className="ec-sway absolute inset-0" style={P3}>
        <i className="absolute rounded-[50%] bg-[#0f1a2e]/20 blur-[18px]" style={{ left: 30, top: 372, width: 330, height: 26, ...z(-40) }} />
        <div className="absolute rounded-[22px] bg-white/45 ring-1 ring-white/70" style={{ left: 22, top: 74, width: 336, height: 286, ...z(-30) }} />

        {/* the storefront: a product page */}
        <div className="ec-win absolute" style={{ left: 6, top: 62, width: 330, height: 286 }}>
          <div className="relative h-full overflow-hidden rounded-[22px] bg-white/95 ring-1 ring-white shadow-[0_34px_50px_-24px_rgba(15,26,46,.42),inset_0_1px_0_#fff]">
            <div className="flex h-9 items-center gap-2 border-b border-border/70 px-3.5">
              <i className="h-2 w-2 rounded-full bg-[#ff6b6b]" /><i className="h-2 w-2 rounded-full bg-[#ffc24b]" /><i className="h-2 w-2 rounded-full bg-[#31c48d]" />
              <span className="ml-2 rounded-full bg-secondary px-3 py-0.5 text-[10px] text-muted-foreground">nutribloom.in</span>
              <span className="relative ml-auto text-[#14233a]"><ShoppingCart className="h-4 w-4" /><i className="ec-badge absolute -right-2 -top-2 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-primary text-[8px] font-bold not-italic text-white">1</i></span>
            </div>
            <div className="grid grid-cols-[116px_1fr] gap-3 p-3.5">
              <div className="relative flex h-[158px] items-center justify-center overflow-hidden rounded-2xl bg-[linear-gradient(160deg,#eef8f4,#d3ede4)]">
                <div className="h-[146px] w-[108px]"><Jar /></div>
                <span className="ec-left absolute left-1.5 top-1.5 inline-flex items-center gap-1 rounded-full bg-[#fff3d6] px-2 py-0.5 text-[8.5px] font-semibold text-[#b87400]"><Clock className="h-2.5 w-2.5" />Left in cart</span>
              </div>
              <div className="min-w-0">
                <p className="text-[9.5px] font-semibold uppercase tracking-[0.14em] text-primary">Nutri&amp;Bloom</p>
                <p className="mt-0.5 text-[14px] font-semibold leading-tight text-[#14233a]">Daily Greens · 30 sachets</p>
                <p className="mt-1 flex items-center gap-1 text-[10px] text-muted-foreground"><span className="flex text-[#f5a524]">{[0, 1, 2, 3, 4].map((s) => <Star key={s} className="h-2.5 w-2.5 fill-current" />)}</span>4.8 · 2,140 reviews</p>
                <p className="mt-2 flex items-baseline gap-2"><span className="text-[20px] font-semibold text-[#14233a]">₹1,299</span><span className="text-[11px] text-muted-foreground line-through">₹1,599</span><span className="text-[10px] font-semibold text-primary">19% off</span></p>
                <div className="mt-2.5 flex gap-1.5">{["30", "60", "90"].map((s, i) => <span key={s} className={`rounded-md px-2 py-0.5 text-[10px] font-medium ring-1 ${i === 0 ? "bg-primary/10 text-primary ring-primary/40" : "text-[#14233a] ring-border"}`}>{s}</span>)}</div>
                <span className="ec-press mt-3 flex h-8 items-center justify-center rounded-lg bg-[#14233a] text-[11.5px] font-semibold text-white">
                  <span className="relative block h-full w-full">
                    <span className="ec-t1 absolute inset-0 flex items-center justify-center">Add to cart</span>
                    <span className="ec-t2 absolute inset-0 flex items-center justify-center gap-1 text-[#ffd98a]"><Clock className="h-3 w-3" />In cart</span>
                    <span className="ec-t3 absolute inset-0 flex items-center justify-center gap-1 rounded-lg bg-primary"><Check className="h-3.5 w-3.5" strokeWidth={3.4} />Ordered</span>
                  </span>
                </span>
              </div>
            </div>
            <div className="mx-3.5 rounded-xl bg-[#f4f9f7] px-3 py-2 text-[10px] text-muted-foreground">Free shipping over ₹999 · Cash on delivery available</div>
            <i className="ec-dim pointer-events-none absolute inset-0 bg-white/35" />
            <Gloss />
          </div>
        </div>

        {/* the shopper's phone: an iPhone-style handset showing the AI agent's cart reminder on WhatsApp, flying in from the depth of the scene */}
        <div className="absolute" style={{ left: 346, top: -12, width: 210, ...P3, ...z(90) }}>
          <div className="ec-phone relative" style={P3}>
            <i className="absolute -left-[2px] top-[74px] h-7 w-[3px] rounded-l bg-[#2b3b57]" /><i className="absolute -left-[2px] top-[112px] h-11 w-[3px] rounded-l bg-[#2b3b57]" /><i className="absolute -right-[2px] top-[96px] h-14 w-[3px] rounded-r bg-[#2b3b57]" />
            <div className="rounded-[30px] bg-gradient-to-b from-[#3a4a63] via-[#1a2538] to-[#0b1422] p-[1.5px] shadow-[0_44px_60px_-26px_rgba(15,26,46,.6)]">
              <div className="rounded-[28.5px] bg-black p-[3px]">
                <div className="relative flex h-[398px] flex-col overflow-hidden rounded-[25.5px] bg-[#efeae2]">
                  <div className="relative flex h-[26px] items-end justify-between bg-[#0b6f58] px-4 pb-0.5 text-[9.5px] font-semibold text-white">
                    <span>9:41</span>
                    <i className="absolute left-1/2 top-[5px] h-[13px] w-[58px] -translate-x-1/2 rounded-full bg-black" />
                    <span className="flex items-center gap-1">
                      <svg viewBox="0 0 16 10" className="h-[8px] w-[12px]" fill="currentColor"><rect x="0" y="6" width="2.6" height="4" rx=".6" /><rect x="4.4" y="4" width="2.6" height="6" rx=".6" /><rect x="8.8" y="2" width="2.6" height="8" rx=".6" /><rect x="13.2" y="0" width="2.6" height="10" rx=".6" /></svg>
                      <svg viewBox="0 0 24 11" className="h-[9px] w-[18px]" fill="none"><rect x=".5" y=".5" width="20" height="10" rx="3" stroke="currentColor" opacity=".6" /><rect x="2" y="2" width="14" height="7" rx="1.6" fill="currentColor" /><rect x="21.5" y="3.5" width="2" height="4" rx="1" fill="currentColor" opacity=".6" /></svg>
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-[#0b6f58] px-2 pb-2 pt-1 text-white">
                    <ChevronLeft className="h-4 w-4" />
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[10px] font-bold text-[#0b6f58]">N&amp;B</span>
                    <span className="min-w-0 leading-tight"><span className="flex items-center gap-1 text-[11.5px] font-semibold">Nutri&amp;Bloom<Check className="h-3 w-3 rounded-full bg-[#34b7f1] p-[1.5px]" strokeWidth={3.6} /></span><span className="block text-[8.5px] text-white/75">Business account · online</span></span>
                    <span className="ml-auto flex items-center gap-2.5"><Video className="h-3.5 w-3.5" /><Phone className="h-3.5 w-3.5" /></span>
                  </div>
                  <div className="relative min-h-0 flex-1 px-2 pt-2.5" style={{ backgroundImage: "radial-gradient(rgba(11,111,88,.07) 1.2px, transparent 1.3px), radial-gradient(rgba(11,111,88,.05) 1px, transparent 1.1px)", backgroundSize: "18px 18px, 18px 18px", backgroundPosition: "0 0, 9px 9px" }}>
                    <div className="space-y-2.5">
                      <div className="ec-b1 max-w-[92%]">
                        <div className="rounded-xl rounded-tl-none bg-white px-2.5 py-2 shadow-[0_1px_1px_rgba(0,0,0,.14)]">
                          <p className="text-[11.5px] leading-[1.35] text-[#111b21]">Rohit, aapka cart save hai 🛒 <b>10% off</b> code: <b className="text-[#0b6f58]">COMEBACK10</b></p>
                          <p className="mt-0.5 text-right text-[8.5px] text-[#667781]">4:10 PM</p>
                        </div>
                        <span className="mt-1 block rounded-xl bg-white py-2 text-center text-[11.5px] font-semibold text-[#027eb5] shadow-[0_1px_1px_rgba(0,0,0,.14)]">Order karein</span>
                      </div>
                      <div className="ec-b2 ml-auto w-fit max-w-[80%] rounded-xl rounded-tr-none bg-[#d9fdd3] px-2.5 py-1.5 shadow-[0_1px_1px_rgba(0,0,0,.14)]">
                        <span className="text-[11.5px] text-[#111b21]">Haan, order kar do</span>
                        <span className="ml-2 inline-flex items-center gap-0.5 align-bottom text-[8.5px] text-[#667781]">4:12 PM<CheckCheck className="h-3.5 w-3.5 text-[#53bdeb]" /></span>
                      </div>
                      <div className="ec-b3 max-w-[92%]">
                        <div className="rounded-xl rounded-tl-none bg-white px-2.5 py-2 shadow-[0_1px_1px_rgba(0,0,0,.14)]">
                          <p className="text-[11.5px] leading-[1.35] text-[#111b21]">Ho gaya! Order <b>#A48219</b> confirm ✓ <span className="font-semibold text-[#027eb5]">Track karein →</span></p>
                          <p className="mt-0.5 text-right text-[8.5px] text-[#667781]">4:12 PM</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="shrink-0 bg-[#f0f2f5] px-2 pb-1.5 pt-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className="flex h-7 flex-1 items-center gap-1.5 rounded-full bg-white px-2.5 text-[10.5px] text-[#8696a0]"><Smile className="h-4 w-4" />Message<Camera className="ml-auto h-4 w-4" /></span>
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0b6f58] text-white"><Mic className="h-4 w-4" /></span>
                    </div>
                    <i className="mx-auto mt-1.5 block h-[3px] w-[70px] rounded-full bg-black/80" />
                  </div>
                  <i className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,.2)_0%,transparent_34%)]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* the order-confirmation SMS and the recovered revenue, floating in front */}
        <div className="ec-float absolute" style={{ left: 18, top: 292, ...z(100) }}>
          <div className="ec-sms flex max-w-[236px] items-start gap-2 rounded-2xl bg-white p-2.5 shadow-[0_22px_34px_-14px_rgba(15,26,46,.5)] ring-1 ring-white">
            <span className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-[#e0a21b] text-white"><MessageSquare className="h-2.5 w-2.5" /></span>
            <span className="leading-snug"><span className="block text-[10.5px] font-semibold text-[#14233a]">Order confirmed</span><span className="block text-[10px] text-[#14233a]/80">Order #A48219 for ₹1,299 is confirmed. Track it live →</span></span>
          </div>
        </div>
        <div className="ec-float absolute" style={{ left: 18, top: 2, animationDelay: "-3s", ...z(120) }}>
          <div className="ec-rev flex items-center gap-2.5 whitespace-nowrap rounded-2xl bg-white py-2 pl-2.5 pr-4 shadow-[0_22px_34px_-14px_rgba(18,160,124,.55)] ring-1 ring-primary/30">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-primary-foreground"><Check className="h-4 w-4" strokeWidth={3.4} /></span>
            <span className="leading-tight"><span className="block text-[9.5px] font-medium uppercase tracking-wider text-muted-foreground">Recovered</span><span className="block text-[17px] font-semibold text-[#14233a]">₹<span className="ec-num" /></span></span>
          </div>
        </div>

        {/* the progress strip: cart, nudge, order, shipped, delivered */}
        <div className="absolute" style={{ left: 8, top: 410, width: 536, ...z(24) }}>
          <div className="relative flex items-center justify-between rounded-full bg-white/85 px-5 py-2 ring-1 ring-white shadow-[0_18px_28px_-16px_rgba(15,26,46,.4)]">
            <i className="absolute left-9 right-9 top-1/2 h-[2px] -translate-y-1/2 rounded-full bg-border" />
            <i className="ec-line absolute left-9 right-9 top-1/2 h-[2px] -translate-y-1/2 rounded-full bg-primary" />
            {STEPS.map((s, i) => (
              <span key={s.t} className="relative flex items-center gap-1.5">
                <span className={`ec-n${i} flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-bold ring-1 ring-border`}>{i + 1}</span>
                <span className="rounded bg-white/90 px-1 text-[10.5px] font-semibold text-[#14233a]">{s.t}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function EcommerceHero() {
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
  // lean toward the pointer so the depth between the layers is easy to see
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
    <div ref={box} onPointerMove={move} onPointerLeave={leave} className="relative mx-auto w-full max-w-[560px]" style={{ height: H * k }} role="img" aria-label="A lost sale won back: a shopper leaves a product in the cart, an AI WhatsApp agent sends a cart reminder in Hindi, the shopper orders, an order-confirmation SMS arrives and ₹1,299 of revenue is recovered">
      <div className="pointer-events-none absolute left-[4%] top-[6%] h-[86%] w-[86%] rounded-full bg-[radial-gradient(circle,color-mix(in_oklch,var(--primary)_13%,white),transparent_66%)]" />
      <div className="absolute left-0 top-0 origin-top-left" style={{ width: W, height: H, transform: `scale(${k})`, perspective: 1600, perspectiveOrigin: "50% 40%" }}>
        <Scene />
      </div>
      <style>{CSS}</style>
    </div>
  )
}
