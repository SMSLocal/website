"use client"

import { useEffect, useRef, useState } from "react"
import { MessageSquare, Phone } from "lucide-react"

// Hero graphic for /products/omnichannel-inbox: seven channel threads folding into one conversation, in real 3D.
// The scene opens as a closed stack of seven glass sheets, one per channel (WhatsApp, email, SMS, voice, Instagram,
// Messenger, RCS). The stack explodes apart in depth, a beam of light climbs through every sheet at the same spot (the
// same customer on every channel), then the sheets slide together and the camera swings round from the isometric
// view to face the result head on: one customer card with every message from every channel in a single history.
// A caption under the scene follows along ("7 channels, 7 threads" then "One conversation"). The scene also leans
// toward the pointer. HTML + CSS 3D transforms, silent, 14-second loop.

const CH = [
  { n: "WhatsApp", logo: "/logos/channels/whatsapp.svg", c: "#25a85a", m: "Where is my order?", t: "2 min ago" },
  { n: "Email", logo: "/logos/channels/gmail.svg", c: "#ea4335", m: "Invoice, please", t: "Yesterday" },
  { n: "SMS", logo: "", c: "#e0a21b", m: "Delivery update?", t: "3 days ago" },
  { n: "Voice", logo: "", c: "#34a853", m: "Missed call · callback booked", t: "Last week" },
  { n: "Instagram", logo: "/logos/channels/instagram.svg", c: "#d6246e", m: "Love the jacket!", t: "Last week" },
  { n: "Messenger", logo: "/logos/channels/messenger.svg", c: "#0a84ff", m: "Is it in stock?", t: "2 weeks ago" },
  { n: "RCS", logo: "/logos/channels/google-messages.svg", c: "#1a73e8", m: "Booking confirmed ✓", t: "3 weeks ago" },
]
const N = CH.length
const MID = 3
const DOT_X = 142
const DOT_Y = 126
const OPEN = 48 // gap between sheets when the stack is open
const CLOSED = 5 // gap when closed
const SH_W = 240
const SH_H = 146
const W = 540
const H = 440
const ISO = "rotateX(58deg) rotateZ(-36deg)"
const FRONT = "rotateX(9deg) rotateZ(-3deg)"

const f = (n: number) => +n.toFixed(2)
const zc = (i: number, gap: number) => `translateZ(${(i - MID) * gap}px)`

const CSS = `
@keyframes oh-cam {
  0%, 52% { transform: ${ISO}; animation-timing-function: cubic-bezier(.65,0,.25,1) }
  68%, 88% { transform: ${FRONT}; animation-timing-function: cubic-bezier(.65,0,.25,1) }
  98%, 100% { transform: ${ISO} }
}
${CH.map((_, i) => {
  const e0 = 6 + i * 1
  const e1 = e0 + 10
  const c0 = 50 + (N - 1 - i) * 0.8
  const c1 = c0 + 7
  return `@keyframes oh-s${i} {
  0%, ${f(e0)}% { transform: ${zc(i, CLOSED)}; opacity: 1; animation-timing-function: cubic-bezier(.3,.8,.25,1) }
  ${f(e1)}%, ${f(c0)}% { transform: ${zc(i, OPEN)}; opacity: 1; animation-timing-function: cubic-bezier(.5,0,.2,1) }
  ${f(c1)}% { transform: translateZ(0px); opacity: 1 }
  ${f(c1 + 1.5)}%, 96% { transform: translateZ(0px); opacity: 0 }
  97% { transform: ${zc(i, CLOSED)}; opacity: 0 }
  99%, 100% { transform: ${zc(i, CLOSED)}; opacity: 1 }
}
.oh-s${i} { animation: oh-s${i} 14s infinite }
@keyframes oh-dot${i} { 0%, ${f(24 + i * 2.6)}% { transform: scale(1); box-shadow: 0 0 0 0 transparent } ${f(26.5 + i * 2.6)}% { transform: scale(1.7); box-shadow: 0 0 14px 5px rgba(109,184,255,.6) } ${f(31 + i * 2.6)}%, 100% { transform: scale(1); box-shadow: 0 0 0 0 transparent } }
.oh-dot${i} { animation: oh-dot${i} 14s ease-in-out infinite }
@keyframes oh-row${i} { 0%, ${f(63 + i * 2.2)}% { opacity: 0; transform: translateX(-10px) } ${f(66.5 + i * 2.2)}%, 91% { opacity: 1; transform: none } 94%, 100% { opacity: 0 } }
.oh-row${i} { opacity: 0; animation: oh-row${i} 14s cubic-bezier(.2,.8,.25,1) infinite }`
}).join("\n")}
@keyframes oh-uni { 0%, 58% { opacity: 0 } 66%, 91% { opacity: 1 } 95%, 100% { opacity: 0 } }
@keyframes oh-beam { 0%, 22% { opacity: 0 } 26%, 50% { opacity: 1 } 54%, 100% { opacity: 0 } }
@keyframes oh-rise { to { background-position: 0 -40px } }
@keyframes oh-cap1 { 0%, 50% { opacity: 1; transform: none } 54%, 96% { opacity: 0; transform: translateY(8px) } 99%, 100% { opacity: 1; transform: none } }
@keyframes oh-cap2 { 0%, 56% { opacity: 0; transform: translateY(8px) } 62%, 91% { opacity: 1; transform: none } 95%, 100% { opacity: 0; transform: translateY(8px) } }
@keyframes oh-chips { 0%, 76% { opacity: 0; transform: translateY(8px) scale(.9) } 80%, 91% { opacity: 1; transform: none } 95%, 100% { opacity: 0 } }
@keyframes oh-live { 0%, 100% { opacity: 1 } 50% { opacity: .35 } }
.oh-cam { transform: ${ISO}; animation: oh-cam 14s infinite }
.oh-uni { opacity: 0; animation: oh-uni 14s ease-in-out infinite }
.oh-beam { opacity: 0; animation: oh-beam 14s ease-in-out infinite }
.oh-beam i { background-image: repeating-linear-gradient(to top, #6db8ff 0 8px, rgba(109,184,255,.25) 8px 20px); background-size: 100% 40px; animation: oh-rise .9s linear infinite }
.oh-cap1 { animation: oh-cap1 14s ease-in-out infinite }
.oh-cap2 { opacity: 0; animation: oh-cap2 14s ease-in-out infinite }
.oh-chips { opacity: 0; animation: oh-chips 14s cubic-bezier(.3,1.4,.4,1) infinite }
.oh-live { animation: oh-live 1.4s ease-in-out infinite }
@media (prefers-reduced-motion: reduce) {
  .oh-cam { animation: none; transform: ${FRONT} }
  [class*="oh-s"], .oh-beam { animation: none; opacity: 0 }
  [class*="oh-dot"], .oh-live, .oh-beam i { animation: none }
  [class*="oh-row"], .oh-uni, .oh-cap2, .oh-chips { animation: none; opacity: 1; transform: none }
  .oh-cap1 { animation: none; opacity: 0 }
}
`

const P3 = { transformStyle: "preserve-3d" as const }

function Logo({ i, size }: { i: number; size: number }) {
  const c = CH[i]
  if (c.logo) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={c.logo} alt="" width={size} height={size} style={{ width: size, height: size }} />
  }
  const Icon = c.n === "Voice" ? Phone : MessageSquare
  return <span className="flex items-center justify-center rounded-full text-white" style={{ width: size, height: size, background: c.c }}><Icon style={{ width: size * 0.58, height: size * 0.58 }} /></span>
}

function Scene() {
  return (
    <div className="absolute inset-0" style={{ ...P3, transform: "rotateY(calc(var(--px, 0) * 7deg)) rotateX(calc(var(--py, 0) * -5deg))", transition: "transform .25s ease-out" }}>
      <div className="absolute" style={{ left: W / 2, top: 204, width: 0, height: 0, ...P3 }}>
        <div className="oh-cam absolute" style={{ left: 0, top: 0, width: 0, height: 0, ...P3 }}>
          {/* the seven channel sheets */}
          {CH.map((c, i) => (
            <div key={c.n} className={`oh-s${i} absolute`} style={{ left: -SH_W / 2, top: -SH_H / 2, width: SH_W, height: SH_H, ...P3, transform: zc(i, CLOSED) }}>
              <div className="absolute inset-0 overflow-hidden rounded-[18px] bg-white/88 ring-1 ring-white shadow-[0_18px_26px_-16px_rgba(15,26,46,.5),inset_0_1px_0_#fff]">
                <i className="absolute inset-y-0 left-0 w-[5px]" style={{ background: c.c }} />
                <div className="space-y-2 pl-4 pr-3 pt-3">
                  <p className="w-fit max-w-[82%] rounded-xl rounded-tl-sm bg-secondary px-2.5 py-1.5 text-[11px] leading-snug text-[#14233a]">{c.m}</p>
                  <p className="ml-auto h-[16px] w-[40%] rounded-xl rounded-tr-sm bg-primary/70" />
                </div>
                <div className="absolute inset-x-0 bottom-0 flex h-10 items-center gap-2 border-t border-border/60 bg-white/70 pl-4 pr-3">
                  <Logo i={i} size={20} />
                  <span className="text-[13px] font-semibold text-[#14233a]">{c.n}</span>
                  <span className="ml-auto text-[10px] text-muted-foreground">{c.t}</span>
                </div>
                <i className={`oh-dot${i} absolute rounded-full bg-[#6db8ff] ring-2 ring-white`} style={{ left: DOT_X, top: DOT_Y, width: 10, height: 10 }} />
              </div>
            </div>
          ))}

          {/* the beam of light that climbs through every sheet at the same customer */}
          <div className="oh-beam absolute" style={{ left: DOT_X + 5 - SH_W / 2 - 1.5, top: DOT_Y + 5 - SH_H / 2, width: 3, height: (N - 1) * OPEN + 12, transformOrigin: "top", transform: `translateZ(${-MID * OPEN - 12}px) rotateX(90deg)`, ...P3 }}>
            <i className="block h-full w-full rounded-full" />
          </div>

          {/* the one conversation they fold into */}
          <div className="oh-uni absolute" style={{ left: -135, top: -138, width: 270, height: 276, ...P3, transform: "translateZ(2px)" }}>
            <div className="absolute inset-0 overflow-hidden rounded-[22px] bg-white ring-1 ring-white shadow-[0_34px_50px_-24px_rgba(15,26,46,.45),inset_0_1px_0_#fff]">
              <div className="flex items-center gap-2.5 border-b border-border/70 px-4 py-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f5b942] text-[14px] font-bold text-white">A</span>
                <span className="leading-tight"><span className="flex items-center gap-1.5 text-[13.5px] font-semibold text-[#14233a]">Aarav Mehta<span className="rounded-full bg-[#fde8e8] px-1.5 py-px text-[8.5px] font-semibold text-[#c0392b]">VIP</span></span><span className="block text-[10px] text-muted-foreground">One conversation, seven channels</span></span>
                <span className="ml-auto inline-flex items-center gap-1 text-[9px] font-medium text-muted-foreground"><i className="oh-live h-1.5 w-1.5 rounded-full bg-primary" />Live</span>
              </div>
              <ul className="space-y-[5px] px-3 pt-2.5">
                {CH.map((c, i) => (
                  <li key={c.n} className={`oh-row${i} flex h-[24px] items-center gap-2 rounded-lg bg-[#f4f9f7] px-2`}>
                    <Logo i={i} size={15} />
                    <span className="min-w-0 flex-1 truncate text-[10.5px] font-medium text-[#14233a]">{c.m}</span>
                    <span className="shrink-0 text-[8.5px] text-muted-foreground">{c.t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function OmniHero() {
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
  // lean toward the pointer so the depth of the stack is easy to see
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
    <div ref={box} onPointerMove={move} onPointerLeave={leave} className="relative mx-auto w-full max-w-[540px]" style={{ height: H * k }} role="img" aria-label="Seven channel threads (WhatsApp, email, SMS, voice, Instagram, Messenger and RCS) as a stack of glass sheets that folds into one customer conversation">
      <div className="pointer-events-none absolute left-[4%] top-[6%] h-[86%] w-[86%] rounded-full bg-[radial-gradient(circle,color-mix(in_oklch,var(--primary)_13%,white),transparent_66%)]" />
      <div className="absolute left-0 top-0 origin-top-left" style={{ width: W, height: H, transform: `scale(${k})`, perspective: 1500, perspectiveOrigin: "50% 42%" }}>
        <Scene />
        {/* the caption follows the story */}
        <div className="absolute inset-x-0" style={{ top: 398 }}>
          <div className="relative mx-auto h-9 w-[280px]">
            <span className="oh-cap1 absolute inset-0 flex items-center justify-center rounded-full bg-white text-[12px] font-semibold text-[#14233a] shadow-[0_14px_22px_-12px_rgba(15,26,46,.45)] ring-1 ring-white">7 channels, 7 separate threads</span>
            <span className="oh-cap2 absolute inset-0 flex items-center justify-center gap-2 rounded-full bg-primary text-[12px] font-semibold text-primary-foreground shadow-[0_14px_22px_-12px_rgba(18,160,124,.6)]">One conversation, one history</span>
          </div>
        </div>
      </div>
      <style>{CSS}</style>
    </div>
  )
}
