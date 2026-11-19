"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronDown, Clock, Database, Globe, Lock, MessageCircle, MousePointer2, Search, ShoppingBag, Sparkles, X } from "lucide-react"
import type { LucideIcon } from "lucide-react"

// Hero graphic for /channels/web-chat: a website, and the chat widget that answers on it. No phone, no popups on lines.
// A browser window floats in 3D showing a product page (a real leather shoe photo, a price and an add-to-cart button). A cursor lingers on the
// page, a small greeting appears over the chat launcher because the visitor has been there a while (a proactive trigger), the widget
// opens, the AI agent answers a question about shoe size and stock, and the chat is saved to the customer's record. A key under the window says
// how SMSLocal helps and lights up in step. On narrow screens only the opened widget is shown, with the key below. HTML + CSS 3D, silent.

const W = 560
const H = 500
const LOOP = 18
const P3 = { transformStyle: "preserve-3d" as const }

const KEY: { Icon: LucideIcon; t: string; d: string; c: string; k: string }[] = [
  { Icon: Clock, t: "Proactive greetings", d: "The chat starts at the moment a visitor is most likely to need help.", c: "#f59e0b", k: "wc-k1" },
  { Icon: Sparkles, t: "Instant AI answers", d: "Agentic AI replies from your knowledge base before an agent joins.", c: "#0e9f6e", k: "wc-k2" },
  { Icon: Database, t: "Saved to the record", d: "Every chat is stored against the customer, beside WhatsApp and SMS.", c: "#2f78bd", k: "wc-k3" },
]

const win = (name: string, a: number) =>
  `@keyframes ${name} { 0%, ${a}% { opacity: 0; transform: translateY(8px) } ${a + 3.5}%, 93% { opacity: 1; transform: translateY(0) } 97%, 100% { opacity: 0; transform: translateY(0) } }\n.${name} { opacity: 0; animation: ${name} ${LOOP}s ease-out infinite }`

const CSS = `
${win("wc-m1", 36)}
${win("wc-m2", 50)}
${win("wc-m3", 66)}
${win("wc-m4", 78)}
@keyframes wc-greet { 0%, 10% { opacity: 0; transform: translateY(10px) scale(.9) } 15%, 26% { opacity: 1; transform: translateY(0) scale(1) } 30%, 100% { opacity: 0; transform: translateY(0) scale(.96) } }
.wc-greet { opacity: 0; transform-origin: 100% 100%; animation: wc-greet ${LOOP}s cubic-bezier(.3,1.3,.4,1) infinite }
@keyframes wc-open { 0%, 29% { opacity: 0; transform: translateY(20px) scale(.88) } 34%, 93% { opacity: 1; transform: translateY(0) scale(1) } 97%, 100% { opacity: 0; transform: translateY(0) scale(1) } }
.wc-open { opacity: 0; transform-origin: 100% 100%; animation: wc-open ${LOOP}s cubic-bezier(.2,.9,.3,1) infinite }
@keyframes wc-launch { 0%, 29% { opacity: 1; transform: scale(1) } 33%, 94% { opacity: 0; transform: scale(.6) } 98%, 100% { opacity: 1; transform: scale(1) } }
.wc-launch { animation: wc-launch ${LOOP}s ease-in-out infinite }
@keyframes wc-cursor { 0%, 4% { opacity: 1; transform: translate(0, 0) } 14%, 28% { opacity: 1; transform: translate(130px, 70px) } 33% { opacity: 1; transform: translate(176px, 106px) } 36%, 100% { opacity: 0; transform: translate(176px, 106px) } }
.wc-cursor { animation: wc-cursor ${LOOP}s ease-in-out infinite }
@keyframes wc-saved { 0%, 84% { opacity: 0; transform: translateY(6px) } 88%, 93% { opacity: 1; transform: translateY(0) } 97%, 100% { opacity: 0 } }
.wc-saved { opacity: 0; animation: wc-saved ${LOOP}s ease-out infinite }
@keyframes wc-ty { 0%, 44% { opacity: 0 } 46%, 49% { opacity: 1 } 50%, 100% { opacity: 0 } }
@keyframes wc-ty2 { 0%, 60% { opacity: 0 } 62%, 65% { opacity: 1 } 66%, 100% { opacity: 0 } }
.wc-ty { opacity: 0; animation: wc-ty ${LOOP}s linear infinite }
.wc-ty2 { opacity: 0; animation: wc-ty2 ${LOOP}s linear infinite }
@keyframes wc-dot { 0%, 100% { transform: translateY(0); opacity: .4 } 50% { transform: translateY(-2px); opacity: 1 } }
.wc-d { animation: wc-dot .9s ease-in-out infinite }
@keyframes wc-k1 { 0%, 6% { opacity: .65 } 10%, 28% { opacity: 1 } 32%, 100% { opacity: .65 } }
@keyframes wc-k2 { 0%, 30% { opacity: .65 } 34%, 82% { opacity: 1 } 86%, 100% { opacity: .65 } }
@keyframes wc-k3 { 0%, 82% { opacity: .65 } 86%, 94% { opacity: 1 } 98%, 100% { opacity: .65 } }
.wc-k1 { animation: wc-k1 ${LOOP}s ease-in-out infinite }
.wc-k2 { animation: wc-k2 ${LOOP}s ease-in-out infinite }
.wc-k3 { animation: wc-k3 ${LOOP}s ease-in-out infinite }
@keyframes wc-hov { 0%, 100% { translate: 0 0 } 50% { translate: 0 -6px } }
.wc-hov { animation: wc-hov 7s ease-in-out infinite }
@media (prefers-reduced-motion: reduce) {
  [class*="wc-m"], [class*="wc-k"], .wc-open, .wc-saved { animation: none; opacity: 1; transform: none }
  .wc-greet, .wc-ty, .wc-ty2 { animation: none; opacity: 0 }
  .wc-launch { animation: none; opacity: 0 }
  .wc-cursor, .wc-d, .wc-hov { animation: none }
}
`

function Widget({ standalone }: { standalone?: boolean }) {
  const mine = "ml-auto w-fit max-w-[84%] rounded-2xl rounded-br-md bg-[#0e9f6e] px-3 py-1.5 text-[11.5px] leading-snug text-white"
  const theirs = "w-fit max-w-[88%] rounded-2xl rounded-bl-md bg-[#f1f5f9] px-3 py-1.5 text-[11.5px] leading-snug text-[#0f2a47]"
  return (
    <div className={`${standalone ? "" : "wc-open"} flex flex-col overflow-hidden bg-white`} style={{ width: 222, height: 306, borderRadius: 16, boxShadow: "0 28px 40px -16px rgba(15,42,71,.55), 0 0 0 1px rgba(15,42,71,.1)" }}>
      <div className="flex items-center gap-2 px-3 py-2.5 text-white" style={{ background: "linear-gradient(135deg, #0e9f6e, #0b7a55)" }}>
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20"><Sparkles className="h-3.5 w-3.5" /></span>
        <div className="min-w-0 flex-1 leading-tight"><p className="text-[12px] font-semibold">yourstore support</p><p className="text-[9px] text-white/75">AI agent · replies instantly</p></div>
        <X className="h-3.5 w-3.5 text-white/80" />
      </div>
      <div className="flex min-h-0 flex-1 flex-col gap-1.5 overflow-hidden px-2.5 pt-2.5 [&>*]:shrink-0">
        <div className="wc-m1"><div className={mine}>Is the Derby true to size? I wear UK 8</div></div>
        <div className="relative">
          <div className="wc-ty absolute left-0 top-0 flex w-fit gap-1 rounded-2xl rounded-bl-md bg-[#f1f5f9] px-3 py-2.5">{[0, 0.15, 0.3].map((d) => <i key={d} className="wc-d h-1.5 w-1.5 rounded-full bg-[#94a3b8]" style={{ animationDelay: `${d}s` }} />)}</div>
          <div className="wc-m2"><div className={theirs}>Yes, it runs true to size. UK 8 is a good fit.</div></div>
        </div>
        <div className="wc-m3"><div className={mine}>Is UK 8 in stock?</div></div>
        <div className="relative">
          <div className="wc-ty2 absolute left-0 top-0 flex w-fit gap-1 rounded-2xl rounded-bl-md bg-[#f1f5f9] px-3 py-2.5">{[0, 0.15, 0.3].map((d) => <i key={d} className="wc-d h-1.5 w-1.5 rounded-full bg-[#94a3b8]" style={{ animationDelay: `${d}s` }} />)}</div>
          <div className="wc-m4"><div className={theirs}>Yes, UK 8 is in stock. Add it to your cart?</div></div>
        </div>
      </div>
      <div className="wc-saved mx-2.5 mb-1 flex items-center gap-1.5 rounded-lg bg-[#eaf2ff] px-2 py-1 text-[9px] font-semibold text-[#1d5fb8]"><Database className="h-3 w-3" />Chat saved to the customer record</div>
      <div className="flex shrink-0 items-center gap-2 px-2.5 pb-2.5 pt-1"><span className="flex h-[26px] flex-1 items-center rounded-full border border-[#e2e8f0] px-3 text-[10px] text-[#94a3b8]">Type your message...</span></div>
    </div>
  )
}

function Browser() {
  return (
    <div className="absolute overflow-hidden bg-white" style={{ left: -226, top: -178, width: 452, height: 356, borderRadius: 20, boxShadow: "0 44px 60px -26px rgba(15,42,71,.55), 0 0 0 1px rgba(15,42,71,.12)" }}>
      <div className="flex items-center gap-2 border-b border-[#e8edf3] bg-[#f4f7fa] px-3 py-2">
        <span className="flex gap-1.5"><i className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" /><i className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" /><i className="h-2.5 w-2.5 rounded-full bg-[#28c840]" /></span>
        <span className="mx-auto flex w-[62%] items-center gap-1.5 rounded-md bg-white px-2 py-1 text-[9.5px] text-[#64748b]"><Lock className="h-2.5 w-2.5" />yourstore.com/leather-derby</span>
        <Search className="h-3 w-3 text-[#94a3b8]" />
      </div>
      <div className="flex items-center justify-between px-4 py-2.5">
        <span className="font-mono text-[11px] font-bold tracking-[0.18em] text-[#0f2a47]">YOURSTORE</span>
        <span className="flex items-center gap-3 text-[10px] text-[#64748b]"><span>New</span><span>Men</span><span>Women</span><ShoppingBag className="h-3.5 w-3.5" /></span>
      </div>
      <div className="grid grid-cols-[168px_1fr] gap-4 px-4 pb-4">
        <div className="overflow-hidden rounded-xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/home/p-shoe.webp" alt="" className="h-[170px] w-full object-cover" style={{ objectPosition: "42% 50%" }} />
        </div>
        <div className="pt-1">
          <p className="text-[15px] font-semibold text-[#0f2a47]">Leather Derby</p>
          <p className="mt-0.5 text-[13px] font-semibold text-[#0f2a47]">₹2,499</p>
          <p className="mt-2 flex items-center gap-1 text-[10px] text-[#64748b]">UK size <ChevronDown className="h-3 w-3" /></p>
          <div className="mt-1.5 flex gap-1.5">{["7", "8", "9", "10"].map((s) => <span key={s} className="flex h-6 w-7 items-center justify-center rounded-md border border-[#dbe3ec] text-[10px] font-semibold text-[#0f2a47]">{s}</span>)}</div>
          <span className="mt-3 block w-[110px] rounded-lg bg-[#0f2a47] py-1.5 text-center text-[10.5px] font-semibold text-white">Add to cart</span>
          <i className="mt-3 block h-1.5 w-full rounded bg-[#eef2f6]" /><i className="mt-1.5 block h-1.5 w-[80%] rounded bg-[#eef2f6]" />
        </div>
      </div>
    </div>
  )
}

function Scene() {
  return (
    <div className="absolute inset-0" style={{ ...P3, transform: "rotateY(calc(var(--px, 0) * 4deg)) rotateX(calc(var(--py, 0) * -3deg))", transition: "transform .25s ease-out" }}>
      <i className="absolute rounded-full" style={{ left: 30, top: -30, width: 520, height: 520, background: "radial-gradient(circle, rgba(14,159,110,.22), rgba(14,159,110,0) 64%)", transform: "translateZ(-200px) scale(1.2)" }} />
      <i className="absolute rounded-full" style={{ left: 160, top: 110, width: 420, height: 420, background: "radial-gradient(circle, rgba(47,120,189,.18), rgba(47,120,189,0) 66%)", transform: "translateZ(-200px) scale(1.2)" }} />
      <div className="absolute" style={{ left: 280, top: 206, width: 0, height: 0, ...P3 }}>
        <div className="wc-hov absolute" style={{ left: 0, top: 0, width: 0, height: 0, ...P3 }}>
          <div className="absolute" style={{ left: 0, top: 0, width: 0, height: 0, ...P3, transform: "rotateY(-9deg) rotateX(2deg) rotateZ(-1deg)" }}>
            <Browser />
            {/* the widget: launcher, greeting, opened panel, anchored at the bottom right of the page */}
            <div className="absolute" style={{ left: 226 - 14, top: 178 - 14, width: 0, height: 0 }}>
              <div className="wc-greet absolute rounded-2xl rounded-br-sm bg-white px-3 py-2 text-[11px] font-medium text-[#0f2a47]" style={{ right: 0, bottom: 44, width: 170, boxShadow: "0 16px 26px -12px rgba(15,42,71,.5), 0 0 0 1px rgba(15,42,71,.08)" }}>Hi! Need help finding your size?</div>
              <div className="wc-open-wrap absolute" style={{ right: 0, bottom: 0 }}><Widget /></div>
              <span className="wc-launch absolute flex h-11 w-11 items-center justify-center rounded-full text-white" style={{ right: 0, bottom: 0, background: "linear-gradient(135deg, #0e9f6e, #0b7a55)", boxShadow: "0 14px 22px -8px rgba(11,122,85,.7)" }}><MessageCircle className="h-5 w-5" /></span>
            </div>
            <div className="wc-cursor absolute" style={{ left: 20, top: 40, width: 0, height: 0 }}><MousePointer2 className="h-5 w-5 fill-[#0f2a47] text-white" /></div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Key({ flow }: { flow?: boolean }) {
  return (
    <div className={flow ? "mx-auto mt-3 w-full max-w-[340px] px-1" : "absolute inset-x-0 px-5"} style={flow ? undefined : { top: 412 }}>
      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0b6b4c]">How SMSLocal helps</p>
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

export function WebChatHero() {
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
  const k = Math.min(1, width / W)
  const label = "A website with a chat widget on it. A browser window shows a product page for a leather derby shoe with a real photo, a price and an add-to-cart button. A greeting appears over the chat launcher because the visitor has been on the page a while, the widget opens, the AI agent answers a question about shoe size and stock, and the chat is saved to the customer record. Below, three points light up in step: proactive greetings, instant AI answers, and chats saved to the record"
  return (
    <div ref={box} onPointerMove={move} onPointerLeave={leave} className="relative mx-auto w-full max-w-[560px]">
      {narrow ? (
        <div className="relative mx-auto flex justify-center py-3" role="img" aria-label={label}>
          <div className="relative" style={{ ...P3 }}>
            <i className="absolute -inset-10 rounded-full" style={{ background: "radial-gradient(circle, rgba(14,159,110,.22), rgba(14,159,110,0) 66%)" }} />
            <div className="relative"><Widget standalone /></div>
          </div>
        </div>
      ) : (
        <div className="relative" style={{ height: H * k }} role="img" aria-label={label}>
          <div className="absolute left-0 top-0 origin-top-left" style={{ width: W, height: H, transform: `scale(${k})`, perspective: 1600, perspectiveOrigin: "50% 40%" }}>
            <Scene />
            <Key />
          </div>
        </div>
      )}
      {narrow && <Key flow />}
      <style>{CSS}</style>
    </div>
  )
}

export const _unused: LucideIcon = Globe
