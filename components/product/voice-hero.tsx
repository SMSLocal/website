"use client"

import { useEffect, useRef, useState } from "react"
import { Check, Database, FileText, MessageCircle, MessageSquare, PhoneCall, PhoneIncoming } from "lucide-react"
import type { LucideIcon } from "lucide-react"

// Hero graphic for /products/voice: one call, followed from the ring to the customer record. Three cards stand in a row in 3D, joined by a
// line that a pulse of light runs along. (1) The call: an incoming number rings, is answered and runs with a live timer and waveform.
// (2) What was said: the same call written up as a transcript, line by line. (3) The customer record: WhatsApp and SMS are already there and
// the call joins them as a new entry with its summary. Below, three short benefits light up in step with the three cards. On narrow
// screens only the transcript is shown, with the benefits below. HTML + CSS 3D, silent, looping.

const W = 560
const H = 480
const LOOP = 18
const P3 = { transformStyle: "preserve-3d" as const }

const KEY: { Icon: LucideIcon; t: string; d: string; c: string; k: string }[] = [
  { Icon: PhoneCall, t: "Answer without switching tools", d: "Calls live in the inbox, beside the customer.", c: "#0e9f6e", k: "vo-k1" },
  { Icon: FileText, t: "Never lose what was said", d: "Recorded and written up automatically.", c: "#6366f1", k: "vo-k2" },
  { Icon: Database, t: "Everyone sees one story", d: "The call joins WhatsApp and SMS history.", c: "#2f78bd", k: "vo-k3" },
]

const CSS = `
@keyframes vo-bar { 0%, 100% { transform: scaleY(.3) } 50% { transform: scaleY(1) } }
.vo-bar { transform-origin: 50% 50%; animation: vo-bar .9s ease-in-out infinite }
@keyframes vo-ripple { 0% { transform: scale(1); opacity: .5 } 100% { transform: scale(1.7); opacity: 0 } }
.vo-ripple { animation: vo-ripple 1.8s ease-out infinite }
@keyframes vo-shake { 0%, 100% { transform: rotate(0) } 10%, 30%, 50% { transform: rotate(-14deg) } 20%, 40%, 60% { transform: rotate(14deg) } 70% { transform: rotate(0) } }
.vo-shake { animation: vo-shake 1.1s ease-in-out infinite }
@keyframes vo-st-in { 0%, 12% { opacity: 1 } 14%, 100% { opacity: 0 } }
@keyframes vo-st-lv { 0%, 12% { opacity: 0 } 15%, 60% { opacity: 1 } 63%, 100% { opacity: 0 } }
@keyframes vo-st-en { 0%, 60% { opacity: 0 } 64%, 93% { opacity: 1 } 97%, 100% { opacity: 0 } }
.vo-st-in { animation: vo-st-in ${LOOP}s linear infinite }
.vo-st-lv { opacity: 0; animation: vo-st-lv ${LOOP}s linear infinite }
.vo-st-en { opacity: 0; animation: vo-st-en ${LOOP}s linear infinite }
@keyframes vo-l1 { 0%, 22% { opacity: 0; transform: translateY(8px) } 26%, 93% { opacity: 1; transform: translateY(0) } 97%, 100% { opacity: 0 } }
@keyframes vo-l2 { 0%, 34% { opacity: 0; transform: translateY(8px) } 38%, 93% { opacity: 1; transform: translateY(0) } 97%, 100% { opacity: 0 } }
@keyframes vo-l3 { 0%, 46% { opacity: 0; transform: translateY(8px) } 50%, 93% { opacity: 1; transform: translateY(0) } 97%, 100% { opacity: 0 } }
@keyframes vo-l4 { 0%, 56% { opacity: 0; transform: translateY(8px) } 60%, 93% { opacity: 1; transform: translateY(0) } 97%, 100% { opacity: 0 } }
.vo-l1 { opacity: 0; animation: vo-l1 ${LOOP}s ease-out infinite }
.vo-l2 { opacity: 0; animation: vo-l2 ${LOOP}s ease-out infinite }
.vo-l3 { opacity: 0; animation: vo-l3 ${LOOP}s ease-out infinite }
.vo-l4 { opacity: 0; animation: vo-l4 ${LOOP}s ease-out infinite }
@keyframes vo-rec { 0%, 13% { opacity: 0 } 16%, 60% { opacity: 1 } 63%, 100% { opacity: 0 } }
.vo-recb { opacity: 0; animation: vo-rec ${LOOP}s linear infinite }
@keyframes vo-blink { 0%, 100% { opacity: 1 } 50% { opacity: .3 } }
.vo-blink { animation: vo-blink 1.1s ease-in-out infinite }
@keyframes vo-new { 0%, 66% { opacity: 0; transform: translateY(-12px) scale(.96); max-height: 0 } 72%, 93% { opacity: 1; transform: translateY(0) scale(1); max-height: 90px } 97%, 100% { opacity: 0; max-height: 90px } }
.vo-new { opacity: 0; overflow: hidden; animation: vo-new ${LOOP}s cubic-bezier(.3,1.3,.4,1) infinite }
@keyframes vo-pulse1 { 0%, 14% { left: 0; opacity: 0 } 16% { opacity: 1 } 30% { left: calc(100% - 8px); opacity: 1 } 32%, 100% { left: calc(100% - 8px); opacity: 0 } }
@keyframes vo-pulse2 { 0%, 60% { left: 0; opacity: 0 } 62% { opacity: 1 } 70% { left: calc(100% - 8px); opacity: 1 } 72%, 100% { left: calc(100% - 8px); opacity: 0 } }
.vo-p1 { opacity: 0; animation: vo-pulse1 ${LOOP}s ease-in-out infinite }
.vo-p2 { opacity: 0; animation: vo-pulse2 ${LOOP}s ease-in-out infinite }
@keyframes vo-lit1 { 0%, 2% { box-shadow: 0 0 0 0 rgba(14,159,110,0) } 6%, 30% { box-shadow: 0 0 0 2px rgba(14,159,110,.55) } 34%, 100% { box-shadow: 0 0 0 0 rgba(14,159,110,0) } }
@keyframes vo-lit2 { 0%, 32% { box-shadow: 0 0 0 0 rgba(99,102,241,0) } 36%, 64% { box-shadow: 0 0 0 2px rgba(99,102,241,.55) } 68%, 100% { box-shadow: 0 0 0 0 rgba(99,102,241,0) } }
@keyframes vo-lit3 { 0%, 70% { box-shadow: 0 0 0 0 rgba(47,120,189,0) } 74%, 94% { box-shadow: 0 0 0 2px rgba(47,120,189,.55) } 98%, 100% { box-shadow: 0 0 0 0 rgba(47,120,189,0) } }
.vo-lit1 { animation: vo-lit1 ${LOOP}s ease-in-out infinite }
.vo-lit2 { animation: vo-lit2 ${LOOP}s ease-in-out infinite }
.vo-lit3 { animation: vo-lit3 ${LOOP}s ease-in-out infinite }
@keyframes vo-k1 { 0%, 2% { opacity: .6 } 6%, 30% { opacity: 1 } 34%, 100% { opacity: .6 } }
@keyframes vo-k2 { 0%, 32% { opacity: .6 } 36%, 66% { opacity: 1 } 70%, 100% { opacity: .6 } }
@keyframes vo-k3 { 0%, 68% { opacity: .6 } 72%, 94% { opacity: 1 } 98%, 100% { opacity: .6 } }
.vo-k1 { animation: vo-k1 ${LOOP}s ease-in-out infinite }
.vo-k2 { animation: vo-k2 ${LOOP}s ease-in-out infinite }
.vo-k3 { animation: vo-k3 ${LOOP}s ease-in-out infinite }
@keyframes vo-hov { 0%, 100% { translate: 0 0 } 50% { translate: 0 -5px } }
.vo-hov { animation: vo-hov 7s ease-in-out infinite }
.vo-hov2 { animation: vo-hov 8s ease-in-out infinite -3s }
.vo-hov3 { animation: vo-hov 9s ease-in-out infinite -5s }
@media (prefers-reduced-motion: reduce) {
  [class*="vo-l"], .vo-new, .vo-st-en, .vo-recb { animation: none; opacity: 1; transform: none; max-height: none }
  .vo-st-in, .vo-st-lv, .vo-p1, .vo-p2 { animation: none; opacity: 0 }
  .vo-ripple, .vo-shake, .vo-bar, .vo-blink, .vo-hov, .vo-hov2, .vo-hov3, [class*="vo-lit"], [class*="vo-k"] { animation: none }
}
`

const BARS = [0.5, 0.9, 0.6, 1, 0.45, 0.8, 0.55, 0.95, 0.4, 0.75, 0.6, 0.9, 0.5, 0.7]

function Wave({ c, h = 26 }: { c: string; h?: number }) {
  return (
    <div className="flex items-center justify-between" style={{ height: h }}>
      {BARS.map((b, i) => <i key={i} className="vo-bar block w-[3px] rounded-full" style={{ height: h * b, background: c, animationDelay: `${(i % 7) * 0.11}s` }} />)}
    </div>
  )
}

function Card({ w, h, lit, children }: { w: number; h: number; lit: string; children: React.ReactNode }) {
  return <div className={`${lit} absolute overflow-hidden bg-white`} style={{ left: -w / 2, top: -h / 2, width: w, height: h, borderRadius: 16, boxShadow: "0 30px 40px -22px rgba(15,42,71,.5), 0 0 0 1px rgba(15,42,71,.09)" }}>{children}</div>
}

function Head({ n, t, c }: { n: string; t: string; c: string }) {
  return (
    <div className="flex items-center gap-1.5 border-b border-[#eef2f6] px-3 py-2">
      <span className="flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold text-white" style={{ background: c }}>{n}</span>
      <span className="text-[10.5px] font-semibold text-[#0f2a47]">{t}</span>
    </div>
  )
}

function CallCard() {
  return (
    <Card w={150} h={236} lit="vo-lit1">
      <Head n="1" t="The call" c="#0e9f6e" />
      <div className="relative" style={{ height: 190 }}>
        {/* ringing */}
        <div className="vo-st-in absolute inset-0 flex flex-col items-center px-3 pt-5 text-center">
          <div className="relative flex h-14 w-14 items-center justify-center">
            <i className="vo-ripple absolute inset-0 rounded-full border-2 border-[#0e9f6e]" />
            <i className="vo-ripple absolute inset-0 rounded-full border-2 border-[#0e9f6e]" style={{ animationDelay: ".9s" }} />
            <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#0e9f6e] text-white"><PhoneIncoming className="vo-shake h-6 w-6" /></span>
          </div>
          <p className="mt-3 text-[12px] font-semibold text-[#0f2a47]">+91 98765 43210</p>
          <p className="text-[9.5px] text-[#0f2a47]/60">Incoming call · Order #1042</p>
          <span className="mt-3 rounded-full bg-[#0e9f6e] px-4 py-1.5 text-[10px] font-semibold text-white">Answer</span>
        </div>
        {/* live */}
        <div className="vo-st-lv absolute inset-0 flex flex-col items-center px-3 pt-5 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#e7f6ef] text-[17px] font-bold text-[#0e9f6e]">S</span>
          <p className="mt-2.5 text-[12px] font-semibold text-[#0f2a47]">Sam K.</p>
          <p className="font-mono text-[12px] font-bold text-[#ef4444]">02:16</p>
          <div className="mt-3 w-full rounded-lg bg-[#eaf6f0] px-2 py-2"><Wave c="#0e9f6e" /></div>
          <span className="vo-recb mt-2 flex items-center gap-1 text-[9px] font-bold tracking-wider text-[#0f2a47]/70"><i className="vo-blink h-1.5 w-1.5 rounded-full bg-[#ef4444]" />REC</span>
        </div>
        {/* ended */}
        <div className="vo-st-en absolute inset-0 flex flex-col items-center px-3 pt-6 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0f2a47] text-white"><Check className="h-6 w-6" /></span>
          <p className="mt-3 text-[12px] font-semibold text-[#0f2a47]">Call ended</p>
          <p className="text-[10px] text-[#0f2a47]/60">Sam K. · 2:31</p>
          <p className="mt-3 text-[9.5px] leading-snug text-[#0f2a47]/60">Recorded and sent to the transcript</p>
        </div>
      </div>
    </Card>
  )
}

function Line({ k, who, c, text }: { k: string; who: string; c: string; text: string }) {
  return (
    <div className={k}>
      <p className="text-[8.5px] font-bold uppercase tracking-wider" style={{ color: c }}>{who}</p>
      <p className="text-[10.5px] leading-snug text-[#0f2a47]">{text}</p>
    </div>
  )
}

function TranscriptCard({ wide }: { wide?: boolean }) {
  return (
    <Card w={wide ? 300 : 170} h={wide ? 250 : 236} lit="vo-lit2">
      <Head n="2" t="What was said" c="#6366f1" />
      <div className="space-y-2.5 px-3 pt-3">
        <Line k="vo-l1" who="Customer" c="#6366f1" text="Where is my order #1042?" />
        <Line k="vo-l2" who="Agent" c="#0e9f6e" text="It shipped today and arrives Friday." />
        <Line k="vo-l3" who="Customer" c="#6366f1" text="Can you send me the tracking link?" />
        <Line k="vo-l4" who="Agent" c="#0e9f6e" text="Sent on WhatsApp just now." />
      </div>
    </Card>
  )
}

function Row({ Icon, c, t, d, time }: { Icon: LucideIcon; c: string; t: string; d: string; time: string }) {
  return (
    <div className="flex items-start gap-2">
      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white" style={{ background: c }}><Icon className="h-2.5 w-2.5" /></span>
      <span className="min-w-0 flex-1 leading-tight"><span className="block text-[10.5px] font-semibold text-[#0f2a47]">{t}</span><span className="block truncate text-[9.5px] text-[#0f2a47]/55">{d}</span></span>
      <span className="text-[8.5px] text-[#0f2a47]/45">{time}</span>
    </div>
  )
}

function RecordCard() {
  return (
    <Card w={150} h={236} lit="vo-lit3">
      <Head n="3" t="Customer record" c="#2f78bd" />
      <div className="px-3 pt-2.5">
        <div className="flex items-center gap-2"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#e7effa] text-[11px] font-bold text-[#2f78bd]">S</span><span className="leading-tight"><span className="block text-[11px] font-semibold text-[#0f2a47]">Sam K.</span><span className="block text-[9px] text-[#0f2a47]/55">Order #1042</span></span></div>
        <div className="vo-new mt-2.5 rounded-lg bg-[#eaf6f0] px-2 py-1.5">
          <Row Icon={PhoneCall} c="#0e9f6e" t="Call · 2:31" d="Tracking shared, order on time" time="now" />
        </div>
        <div className="mt-2.5 space-y-2.5">
          <Row Icon={MessageCircle} c="#25d366" t="WhatsApp" d="Where is my order?" time="2d" />
          <Row Icon={MessageSquare} c="#6366f1" t="SMS" d="Order #1042 confirmed" time="4d" />
        </div>
      </div>
    </Card>
  )
}

function Scene({ narrow }: { narrow: boolean }) {
  return (
    <div className="absolute inset-0" style={{ ...P3, transform: "rotateY(calc(var(--px, 0) * 4deg)) rotateX(calc(var(--py, 0) * -3deg))", transition: "transform .25s ease-out" }}>
      <i className="absolute rounded-full" style={{ left: 30, top: -40, width: 520, height: 520, background: "radial-gradient(circle, rgba(14,159,110,.18), rgba(14,159,110,0) 64%)", transform: "translateZ(-200px) scale(1.2)" }} />
      <i className="absolute rounded-full" style={{ left: 150, top: 90, width: 420, height: 420, background: "radial-gradient(circle, rgba(99,102,241,.15), rgba(99,102,241,0) 66%)", transform: "translateZ(-200px) scale(1.2)" }} />
      {narrow ? (
        <div className="absolute" style={{ left: 170, top: 150, width: 0, height: 0, ...P3 }}>
          <div className="vo-hov absolute" style={{ left: 0, top: 0, ...P3 }}><div className="absolute" style={{ left: 0, top: 0, ...P3, transform: "translateZ(40px)" }}><TranscriptCard wide /></div></div>
        </div>
      ) : (
        <>
          {/* connecting lines, with a pulse of light that runs along each */}
          <div className="absolute" style={{ left: 156, top: 196, width: 38, height: 2, background: "#d6dee8", borderRadius: 2, transform: "translateZ(-40px)" }}><i className="vo-p1 absolute -top-[3px] h-2 w-2 rounded-full bg-[#0e9f6e]" style={{ boxShadow: "0 0 10px 2px rgba(14,159,110,.6)" }} /></div>
          <div className="absolute" style={{ left: 366, top: 196, width: 38, height: 2, background: "#d6dee8", borderRadius: 2, transform: "translateZ(-40px)" }}><i className="vo-p2 absolute -top-[3px] h-2 w-2 rounded-full bg-[#2f78bd]" style={{ boxShadow: "0 0 10px 2px rgba(47,120,189,.6)" }} /></div>
          <div className="absolute" style={{ left: 80, top: 198, width: 0, height: 0, ...P3 }}>
            <div className="vo-hov2 absolute" style={{ left: 0, top: 0, ...P3 }}><div className="absolute" style={{ left: 0, top: 0, ...P3, transform: "translateZ(-30px) rotateY(18deg)" }}><CallCard /></div></div>
          </div>
          <div className="absolute" style={{ left: 280, top: 192, width: 0, height: 0, ...P3 }}>
            <div className="vo-hov absolute" style={{ left: 0, top: 0, ...P3 }}><div className="absolute" style={{ left: 0, top: 0, ...P3, transform: "translateZ(50px)" }}><TranscriptCard /></div></div>
          </div>
          <div className="absolute" style={{ left: 480, top: 198, width: 0, height: 0, ...P3 }}>
            <div className="vo-hov3 absolute" style={{ left: 0, top: 0, ...P3 }}><div className="absolute" style={{ left: 0, top: 0, ...P3, transform: "translateZ(-30px) rotateY(-18deg)" }}><RecordCard /></div></div>
          </div>
        </>
      )}
    </div>
  )
}

function Key({ flow }: { flow?: boolean }) {
  return (
    <div className={flow ? "mx-auto mt-5 w-full max-w-[340px] px-1" : "absolute inset-x-0 px-3"} style={flow ? undefined : { top: 398 }}>
      <ul className={flow ? "space-y-3.5" : "grid grid-cols-3 gap-5"}>
        {KEY.map((s) => (
          <li key={s.t} className={`${s.k} flex gap-2.5`}>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white" style={{ background: s.c }}><s.Icon className="h-4 w-4" /></span>
            <span>
              <span className="block text-[13px] font-semibold leading-tight text-[#0f2a47]">{s.t}</span>
              <span className="mt-0.5 block text-[11.5px] leading-snug text-[#0f2a47]/65">{s.d}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function VoiceHero() {
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
  const SW = narrow ? 340 : W
  const SH = narrow ? 300 : H
  const k = Math.min(1, width / SW)
  const label = "One phone call followed from ring to customer record. An incoming call is answered and recorded, the same call is written up as a transcript line by line, and then it is added to the customer record beside the WhatsApp and SMS history. Below, three points light up in step: answer without switching tools, never lose what was said, and everyone sees one story"
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
