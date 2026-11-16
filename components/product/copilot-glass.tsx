"use client"

import { useEffect, useRef, useState } from "react"
import { Check, FileText, Send, Sparkles } from "lucide-react"

// Hero graphic for /products/agent-copilot: a human agent and Copilot answering one customer together, in real 3D.
// The agent's inbox window sits in the back with an upset customer's thread arriving. Copilot's panel flies in from the
// depth of the scene and swings to face the viewer; it summarises the thread and types a suggested reply. The agent
// (shown as a chip in front, "Priya, human agent") presses Tab, the draft lifts out of the panel as a glass card, flies
// through the scene into the reply box and lands; the agent sends it, a paper plane flies off into the distance, the
// reply appears in the thread and "Replied in 12 s" pops up. The whole scene sways gently and also leans toward the
// pointer. HTML + CSS 3D transforms, silent, 14-second loop.

const LINES = [
  { t: "I’m sorry about the double charge, Rohan.", n: 41, a: 34, b: 42 },
  { t: "I’ve found the duplicate and started your", n: 41, a: 42, b: 52 },
  { t: "refund. It will reach you in 3–5 days.", n: 38, a: 52, b: 60 },
]

// opacity + rise window: hidden until a, in from a to a+3, out at 94
const rise = (name: string, a: number, y = 8) =>
  `@keyframes ${name} { 0%, ${a}% { opacity: 0; transform: translateY(${y}px) } ${a + 3}%, 94% { opacity: 1; transform: none } 97%, 100% { opacity: 0 } }`
// a short on-window
const on = (name: string, a: number, b: number) =>
  `@keyframes ${name} { 0%, ${a}% { opacity: 0 } ${a + 2}%, ${b}% { opacity: 1 } ${b + 2}%, 100% { opacity: 0 } }`

const CSS = `
${rise("cg-win", 0, 14)}
${rise("cg-q1", 3)}
${rise("cg-q2", 6)}
${rise("cg-q3", 9)}
${rise("cg-chip", 12, 5)}
${rise("cg-b1", 27, 6)}
${rise("cg-b2", 31, 6)}
${rise("cg-meta", 62, 6)}
${rise("cg-a", 84)}
${rise("cg-fast", 89, 5)}
@keyframes cg-panel { 0%, 13% { opacity: 0; transform: translateZ(-300px) rotateY(48deg) } 21%, 94% { opacity: 1; transform: none } 97%, 100% { opacity: 0; transform: none } }
@keyframes cg-fly { 0%, 66% { opacity: 0; transform: translate3d(0, 0, 0) rotateY(0) scale(1) } 67.5% { opacity: 1; transform: translate3d(0, -4px, 40px) rotateY(0) scale(1.04) } 72% { opacity: 1; transform: translate3d(-170px, 120px, -40px) rotateY(18deg) scale(.9) } 75%, 100% { opacity: 0; transform: translate3d(-260px, 176px, -80px) rotateY(24deg) scale(.7) } }
@keyframes cg-plane { 0%, 83% { opacity: 0; transform: translate3d(0, 0, 0) scale(1) rotate(0) } 85% { opacity: 1; transform: translate3d(6px, -10px, 20px) scale(1.15) rotate(-6deg) } 92% { opacity: .9; transform: translate3d(70px, -90px, -170px) scale(.7) rotate(-14deg) } 95%, 100% { opacity: 0; transform: translate3d(120px, -150px, -330px) scale(.3) rotate(-18deg) } }
@keyframes cg-tab { 0%, 64% { opacity: 0; transform: translateY(6px) scale(.8) } 66%, 72% { opacity: 1; transform: none } 74%, 100% { opacity: 0; transform: none } }
@keyframes cg-orb { 0%, 14% { opacity: 0; transform: scale(.6) } 21%, 62% { opacity: 1; transform: scale(1) } 70%, 100% { opacity: .3; transform: scale(.9) } }
${on("cg-think", 21, 26)}
${on("cg-draft", 72, 83)}
${on("cg-beam", 66, 84)}
@keyframes cg-ph { 0%, 71% { opacity: 1 } 73%, 83% { opacity: 0 } 85%, 96% { opacity: 1 } 99%, 100% { opacity: 0 } }
@keyframes cg-use { 0%, 65% { transform: none } 67%, 71% { transform: scale(.93) translateY(2px) } 74%, 100% { transform: none } }
@keyframes cg-send { 0%, 80% { transform: none } 82%, 84% { transform: scale(.88) } 87%, 100% { transform: none } }
@keyframes cg-sway { 0%, 100% { transform: rotateY(-3.5deg) } 50% { transform: rotateY(3.5deg) } }
${LINES.map((l, i) => `@keyframes cg-t${i} { 0%, ${l.a + 4}% { width: 0 } ${l.b + 4}%, 100% { width: 100% } }
.cg-t${i} { display: block; overflow: hidden; white-space: nowrap; width: 0; animation: cg-t${i} 14s steps(${l.n}, end) infinite }`).join("\n")}
@keyframes cg-dots { 0%, 100% { opacity: .3 } 50% { opacity: 1 } }
@keyframes cg-live { 0%, 100% { opacity: 1 } 50% { opacity: .35 } }
@keyframes cg-float { 0%, 100% { translate: 0 -3px } 50% { translate: 0 4px } }
@keyframes cg-flow { to { stroke-dashoffset: -20 } }
.cg-win { opacity: 0; animation: cg-win 14s cubic-bezier(.2,.7,.2,1) infinite }
.cg-q1 { opacity: 0; animation: cg-q1 14s cubic-bezier(.2,.7,.2,1) infinite } .cg-q2 { opacity: 0; animation: cg-q2 14s cubic-bezier(.2,.7,.2,1) infinite } .cg-q3 { opacity: 0; animation: cg-q3 14s cubic-bezier(.2,.7,.2,1) infinite }
.cg-chip { opacity: 0; animation: cg-chip 14s cubic-bezier(.3,1.4,.4,1) infinite }
.cg-meta { opacity: 0; animation: cg-meta 14s cubic-bezier(.2,.7,.2,1) infinite }
.cg-b1 { opacity: 0; animation: cg-b1 14s cubic-bezier(.2,.7,.2,1) infinite } .cg-b2 { opacity: 0; animation: cg-b2 14s cubic-bezier(.2,.7,.2,1) infinite }
.cg-a { opacity: 0; animation: cg-a 14s cubic-bezier(.2,.7,.2,1) infinite }
.cg-fast { opacity: 0; animation: cg-fast 14s cubic-bezier(.3,1.4,.4,1) infinite }
.cg-panel { opacity: 0; animation: cg-panel 14s cubic-bezier(.2,.8,.2,1) infinite }
.cg-fly { opacity: 0; animation: cg-fly 14s cubic-bezier(.4,0,.2,1) infinite }
.cg-plane { opacity: 0; animation: cg-plane 14s ease-in infinite }
.cg-tab { opacity: 0; animation: cg-tab 14s cubic-bezier(.3,1.4,.4,1) infinite }
.cg-orb { opacity: 0; animation: cg-orb 14s ease-in-out infinite }
.cg-think { opacity: 0; animation: cg-think 14s ease-in-out infinite }
.cg-think i { animation: cg-dots 1s ease-in-out infinite }
.cg-draft { opacity: 0; animation: cg-draft 14s ease-in-out infinite }
.cg-ph { animation: cg-ph 14s ease-in-out infinite }
.cg-use { animation: cg-use 14s ease-in-out infinite }
.cg-send { animation: cg-send 14s ease-in-out infinite }
.cg-beam { opacity: 0; animation: cg-beam 14s ease-in-out infinite }
.cg-flow { stroke-dasharray: 3 6; animation: cg-flow 1.4s linear infinite }
.cg-sway { animation: cg-sway 9s ease-in-out infinite }
.cg-live { animation: cg-live 1.4s ease-in-out infinite }
.cg-float { animation: cg-float 6s ease-in-out infinite }
@media (prefers-reduced-motion: reduce) {
  .cg-think i, .cg-live, .cg-use, .cg-send, .cg-flow, .cg-float, .cg-sway { animation: none }
  .cg-win, .cg-q1, .cg-q2, .cg-q3, .cg-chip, .cg-meta, .cg-b1, .cg-b2, .cg-a, .cg-fast, .cg-panel, .cg-orb { animation: none; opacity: 1; transform: none }
  .cg-think, .cg-draft, .cg-ph, .cg-beam, .cg-fly, .cg-plane, .cg-tab { animation: none; opacity: 0 }
  .cg-t0, .cg-t1, .cg-t2 { animation: none; width: 100% }
}
`

const SHADOW = "shadow-[0_34px_50px_-24px_rgba(15,26,46,.42),inset_0_1px_0_#fff]"
const W = 560
const H = 440
const P3 = { transformStyle: "preserve-3d" as const }
const z = (px: number) => ({ transform: `translateZ(${px}px)` })

function Gloss() {
  return <i className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(115deg,rgba(255,255,255,.6)_0%,rgba(255,255,255,.1)_30%,transparent_46%)]" />
}

function Scene() {
  return (
    <div className="absolute inset-0" style={{ ...P3, transform: "rotateY(calc(-12deg + var(--px, 0) * 7deg)) rotateX(calc(5deg + var(--py, 0) * -5deg))", transition: "transform .25s ease-out" }}>
      <div className="cg-sway absolute inset-0" style={P3}>
        <i className="absolute rounded-[50%] bg-[#0f1a2e]/20 blur-[18px]" style={{ left: 30, top: 372, width: 320, height: 30, ...z(-40) }} />
        <div className="absolute rounded-[22px] bg-white/45 ring-1 ring-white/70" style={{ left: 22, top: 62, width: 340, height: 322, ...z(-30) }} />

        {/* the agent's inbox */}
        <div className="cg-win absolute" style={{ left: 8, top: 46, width: 340, height: 330 }}>
          <div className={`relative h-full overflow-hidden rounded-[22px] bg-white/95 ring-1 ring-white ${SHADOW}`}>
            <div className="flex h-11 items-center gap-2 border-b border-border/70 px-3.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logos/channels/whatsapp.svg" alt="" width={16} height={16} className="h-4 w-4" />
              <span className="text-[13px] font-semibold text-[#14233a]">Rohan K.</span>
              <span className="text-[11px] text-muted-foreground">· Order #1042</span>
              <span className="cg-chip ml-1 rounded-full bg-[#fde8e8] px-2.5 py-0.5 text-[10.5px] font-semibold text-[#c0392b]">Frustrated</span>
            </div>
            <div className="relative space-y-2 px-3.5 pt-3">
              <p className="cg-q1 w-fit max-w-[80%] rounded-2xl rounded-tl-sm bg-secondary px-3 py-2 text-[11.5px] leading-snug text-[#14233a]">Hi, I think I was charged twice for #1042.</p>
              <p className="cg-q2 w-fit max-w-[80%] rounded-2xl rounded-tl-sm bg-secondary px-3 py-2 text-[11.5px] leading-snug text-[#14233a]">Two payments, same amount, same day.</p>
              <p className="cg-q3 w-fit max-w-[88%] rounded-2xl rounded-tl-sm bg-secondary px-3 py-2 text-[12.5px] font-medium leading-snug text-[#14233a]">I was charged twice and nobody has replied for 2 days!<span className="ml-2 align-bottom text-[9px] font-normal text-muted-foreground">10:41</span></p>
              <div className="cg-a ml-auto w-fit max-w-[92%] rounded-2xl rounded-tr-sm bg-primary px-3.5 py-2.5 text-[12.5px] leading-snug text-primary-foreground">
                I’m sorry about the double charge, Rohan. I’ve found the duplicate and started your refund. It will reach you in 3–5 days.
                <span className="mt-1 flex items-center justify-end gap-1 text-[9px] text-primary-foreground/80">10:43 <Check className="h-2.5 w-2.5" strokeWidth={3} /></span>
              </div>
            </div>
            {/* reply box */}
            <div className="absolute inset-x-3 bottom-3 flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2">
              <div className="relative h-[34px] flex-1 overflow-hidden text-[11.5px] leading-snug">
                <span className="cg-ph absolute inset-0 flex items-center text-muted-foreground">Write a reply…</span>
                <span className="cg-draft absolute inset-0 flex items-center text-foreground">I’m sorry about the double charge, Rohan. I’ve found the duplicate and started your refund. It will reach you in 3–5 days.</span>
              </div>
              <span className="cg-send flex h-8 shrink-0 items-center rounded-lg bg-[#14233a] px-3 text-[11.5px] font-semibold text-white">Send</span>
            </div>
            <Gloss />
          </div>
        </div>

        {/* a light beam from the Copilot panel to the reply box while the reply is used */}
        <svg className="pointer-events-none absolute left-0 top-0" width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none" aria-hidden style={z(30)}>
          <path className="cg-beam cg-flow" d="M318 262 C 300 300, 260 320, 200 352" stroke="var(--primary)" strokeWidth="2.2" strokeLinecap="round" />
        </svg>

        {/* the glow behind the Copilot panel */}
        <div className="cg-orb pointer-events-none absolute rounded-full bg-primary/25 blur-[44px]" style={{ left: 330, top: -10, width: 230, height: 230, ...z(40) }} />

        {/* the Copilot panel: flies in from the depth of the scene, then faces the viewer */}
        <div className="absolute" style={{ left: 296, top: 4, width: 262, ...P3, ...z(70) }}>
          <div className="cg-panel" style={P3}>
            <div className={`relative overflow-hidden rounded-[20px] bg-white p-3.5 ring-1 ring-white ${SHADOW}`}>
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-[oklch(0.5_0.12_175)] text-primary-foreground shadow-[0_6px_12px_-4px_rgba(18,160,124,.6)]"><Sparkles className="h-4 w-4" /></span>
                <span className="text-[13.5px] font-semibold text-[#14233a]">Copilot</span>
                <span className="cg-think ml-auto flex items-center gap-1 text-[10px] font-medium text-muted-foreground">thinking<span className="flex gap-[3px]"><i className="h-1 w-1 rounded-full bg-primary" /><i className="h-1 w-1 rounded-full bg-primary" style={{ animationDelay: ".15s" }} /><i className="h-1 w-1 rounded-full bg-primary" style={{ animationDelay: ".3s" }} /></span></span>
              </div>

              <p className="mt-3 font-mono text-[9.5px] uppercase tracking-[0.16em] text-muted-foreground">Summary</p>
              <ul className="mt-1.5 space-y-1 text-[11.5px] leading-snug text-[#14233a]">
                <li className="cg-b1 flex gap-1.5"><span className="mt-[5px] h-1 w-1 shrink-0 rounded-full bg-primary" />Charged twice on order #1042</li>
                <li className="cg-b2 flex gap-1.5"><span className="mt-[5px] h-1 w-1 shrink-0 rounded-full bg-primary" />Waiting 2 days · customer is upset</li>
              </ul>

              <p className="mt-3 font-mono text-[9.5px] uppercase tracking-[0.16em] text-primary">Suggested reply</p>
              <div className="mt-1.5 rounded-lg bg-primary/8 px-2.5 py-2 text-[11px] leading-[1.5] text-[#14233a]">
                {LINES.map((l, i) => <span key={i} className={`cg-t${i}`}>{l.t}</span>)}
              </div>

              <div className="cg-meta mt-2.5 flex flex-wrap items-center gap-1.5">
                <span className="rounded-full bg-primary/12 px-2 py-0.5 text-[10px] font-semibold text-primary">Empathetic</span>
                <span className="flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium text-muted-foreground"><FileText className="h-3 w-3" />Refund policy.pdf</span>
              </div>

              <span className="cg-use mt-3 flex items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-primary to-[oklch(0.55_0.13_172)] py-2 text-[12px] font-semibold text-primary-foreground shadow-[0_10px_16px_-8px_rgba(18,160,124,.7)]">Use reply <kbd className="rounded bg-white/25 px-1.5 text-[10px] font-semibold">Tab</kbd></span>
              <Gloss />
            </div>
          </div>
        </div>

        {/* the draft lifts out of the panel and flies into the reply box */}
        <div className="absolute" style={{ left: 310, top: 176, width: 232, ...P3, ...z(96) }}>
          <div className="cg-fly rounded-xl bg-white p-2.5 text-[10.5px] leading-snug text-[#14233a] shadow-[0_22px_34px_-14px_rgba(18,160,124,.55)] ring-1 ring-primary/40" style={P3}>
            <span className="mb-1 flex items-center gap-1 font-mono text-[8.5px] uppercase tracking-[0.14em] text-primary"><Sparkles className="h-3 w-3" />Draft</span>
            I’m sorry about the double charge, Rohan. I’ve found the duplicate and started your refund.
          </div>
        </div>

        {/* the paper plane after Send */}
        <div className="absolute" style={{ left: 286, top: 348, width: 36, height: 36, ...P3, ...z(20) }}>
          <span className="cg-plane flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_14px_22px_-8px_rgba(18,160,124,.7)]"><Send className="h-4 w-4" /></span>
        </div>

        {/* the human agent, in front: pressing Tab, then sending */}
        <div className="cg-float absolute" style={{ left: 0, top: 388, animationDelay: "-2s", ...z(100) }}>
          <div className="cg-meta flex items-center gap-2.5 rounded-2xl bg-white py-2 pl-2 pr-4 shadow-[0_20px_30px_-16px_rgba(15,26,46,.45)] ring-1 ring-white">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#14233a] text-[12px] font-bold text-white">P</span>
            <span className="leading-tight"><span className="block text-[11.5px] font-semibold text-[#14233a]">Priya · Human agent</span><span className="block text-[9.5px] text-muted-foreground">Reviews, edits, sends</span></span>
            <kbd className="cg-tab ml-1 rounded-md border border-border bg-white px-1.5 py-0.5 font-mono text-[10.5px] font-bold text-[#14233a] shadow-[0_2px_0_#cfe3dd]">Tab</kbd>
          </div>
        </div>
        <div className="cg-float absolute" style={{ left: 318, top: 396, animationDelay: "-4s", ...z(70) }}>
          <span className="cg-meta inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-white py-1.5 pl-2 pr-3.5 text-[11.5px] font-semibold text-[#14233a] shadow-[0_18px_28px_-12px_rgba(15,26,46,.45)] ring-1 ring-white"><span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground"><Sparkles className="h-3 w-3" /></span>Copilot assists, you decide</span>
        </div>

        {/* the reply time pops up when the reply is sent */}
        <div className="absolute" style={{ left: 8, top: -2, ...z(125) }}>
          <p className="cg-fast flex items-center gap-1.5 whitespace-nowrap rounded-full bg-white py-1.5 pl-2 pr-3.5 text-[11.5px] font-semibold text-primary shadow-[0_18px_28px_-12px_rgba(15,26,46,.45)] ring-1 ring-white"><span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground"><Check className="h-3 w-3" strokeWidth={3.4} /></span>Replied in 12 s</p>
        </div>
      </div>
    </div>
  )
}

export function CopilotGlass() {
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
    <div ref={box} onPointerMove={move} onPointerLeave={leave} className="relative mx-auto w-full max-w-[560px]" style={{ height: H * k }} role="img" aria-label="A human agent and Copilot answering a customer together: Copilot summarises the thread and drafts a reply, the agent presses Tab, sends it, and the reply goes out in 12 seconds">
      <div className="pointer-events-none absolute left-[4%] top-[6%] h-[86%] w-[86%] rounded-full bg-[radial-gradient(circle,color-mix(in_oklch,var(--primary)_13%,white),transparent_66%)]" />
      <div className="absolute left-0 top-0 origin-top-left" style={{ width: W, height: H, transform: `scale(${k})`, perspective: 1600, perspectiveOrigin: "50% 40%" }}>
        <Scene />
      </div>
      <style>{CSS}</style>
    </div>
  )
}
