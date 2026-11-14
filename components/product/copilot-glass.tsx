"use client"

import { useEffect, useRef, useState } from "react"
import { Check, FileText, Sparkles } from "lucide-react"

// Hero graphic for /products/agent-copilot: a rotating glass prism of Copilot's four jobs, in real 3D.
// A glowing Copilot orb with two tilted orbit rings floats above a glass prism made of four panes (each pane is one
// job from the page's command palette: Tab drafts a reply, /sum summarises the thread, /kb finds the answer, /tone
// changes the tone). The prism turns a quarter-turn every 4 seconds; as each pane swings to the front a sheen sweeps
// across it, the orb pulses and its beam lights the pane, and the front pane plays its job (a reply typing itself, the
// three-line summary, the knowledge-base answer, the tone switching). A glass floor with ripples sits underneath.
// The whole scene also leans toward the pointer. HTML + CSS 3D transforms, silent, 16-second loop.

const JOBS = [
  { k: "Tab", n: "Draft a reply" },
  { k: "/sum", n: "Summarise the thread" },
  { k: "/kb", n: "Find the answer" },
  { k: "/tone", n: "Change the tone" },
]
const LINES = [
  "Sorry for the wait! Order #4821 is out",
  "for delivery and should reach you today.",
  "Want the live tracking link?",
]
const SUMMARY: [string, string][] = [
  ["Issue", "Order #4821 is 6 days late."],
  ["Tried", "Courier delay confirmed twice."],
  ["Next", "Share tracking and a date."],
]

const R = 138 // distance of each pane from the centre of the prism
const CARD_W = 244
const CARD_H = 176
const W = 560
const H = 440

const f = (n: number) => +n.toFixed(2)
// a pane is "front" during its quarter: sheen sweeps in just after the turn finishes
const sheen = (i: number) => {
  const s = i * 25
  return `@keyframes cg-sh${i} { 0%, ${f(s + 3)}% { transform: translateX(-130%) } ${f(s + 11)}%, 100% { transform: translateX(260%) } }`
}
const ease = "animation-timing-function: cubic-bezier(.65,0,.25,1)"

const CSS = `
@keyframes cg-spin {
  0%, 21% { transform: rotateY(0deg); ${ease} }
  25%, 46% { transform: rotateY(-90deg); ${ease} }
  50%, 71% { transform: rotateY(-180deg); ${ease} }
  75%, 96% { transform: rotateY(-270deg); ${ease} }
  100% { transform: rotateY(-360deg) }
}
@keyframes cg-pulse {
  0%, 19%, 29%, 44%, 54%, 69%, 79%, 94%, 100% { transform: scale(1); box-shadow: 0 30px 40px -18px rgba(18,160,124,.55), 0 0 30px 4px color-mix(in oklch, var(--primary) 30%, transparent) }
  23%, 48%, 73%, 98% { transform: scale(1.16); box-shadow: 0 30px 40px -18px rgba(18,160,124,.6), 0 0 56px 14px color-mix(in oklch, var(--primary) 46%, transparent) }
}
${JOBS.map((_, i) => `${sheen(i)}\n.cg-sh${i} { transform: translateX(-130%); animation: cg-sh${i} 16s ease-in-out infinite }`).join("\n")}
${LINES.map((_, i) => `@keyframes cg-t${i} { 0%, ${3 + i * 5}% { width: 0 } ${8 + i * 5}%, 54% { width: 100% } 56%, 100% { width: 0 } }\n.cg-t${i} { display: block; overflow: hidden; white-space: nowrap; width: 0; animation: cg-t${i} 16s steps(40, end) infinite }`).join("\n")}
@keyframes cg-tone { 0%, 76% { background: transparent; color: #14233a } 79%, 96% { background: var(--primary); color: #fff } 98%, 100% { background: transparent; color: #14233a } }
@keyframes cg-orbit { from { transform: rotateX(72deg) rotateZ(0deg) } to { transform: rotateX(72deg) rotateZ(360deg) } }
@keyframes cg-orbit2 { from { transform: rotateX(72deg) rotateY(38deg) rotateZ(360deg) } to { transform: rotateX(72deg) rotateY(38deg) rotateZ(0deg) } }
@keyframes cg-ripple { 0% { transform: scale(.4); opacity: .6 } 100% { transform: scale(1); opacity: 0 } }
@keyframes cg-bob { 0%, 100% { translate: 0 -5px } 50% { translate: 0 5px } }
@keyframes cg-float { 0%, 100% { translate: 0 -3px } 50% { translate: 0 4px } }
@keyframes cg-flow { to { background-position: 0 -20px } }
@keyframes cg-live { 0%, 100% { opacity: 1 } 50% { opacity: .35 } }
.cg-spin { animation: cg-spin 16s infinite }
.cg-pulse { animation: cg-pulse 16s ease-in-out infinite }
.cg-tone { animation: cg-tone 16s ease-in-out infinite }
.cg-orbit { animation: cg-orbit 7s linear infinite }
.cg-orbit2 { animation: cg-orbit2 11s linear infinite }
.cg-ripple { animation: cg-ripple 4.8s ease-out infinite }
.cg-bob { animation: cg-bob 5s ease-in-out infinite }
.cg-float { animation: cg-float 6s ease-in-out infinite }
.cg-beam { background-image: repeating-linear-gradient(to bottom, var(--primary) 0 4px, transparent 4px 9px); background-size: 100% 20px; animation: cg-flow 1s linear infinite }
.cg-live { animation: cg-live 1.4s ease-in-out infinite }
@media (prefers-reduced-motion: reduce) {
  .cg-spin, .cg-pulse, .cg-orbit, .cg-orbit2, .cg-ripple, .cg-bob, .cg-float, .cg-beam, .cg-live, .cg-tone { animation: none }
  [class*="cg-sh"] { animation: none; opacity: 0 }
  .cg-t0, .cg-t1, .cg-t2 { animation: none; width: 100% }
}
`

const PANE = "relative h-full overflow-hidden rounded-[22px] bg-white/92 ring-1 ring-white shadow-[0_30px_46px_-22px_rgba(15,26,46,.45),inset_0_1px_0_#fff]"

function Pane({ i }: { i: number }) {
  const j = JOBS[i]
  return (
    <div className={PANE}>
      <div className="flex h-10 items-center gap-2 border-b border-border/70 px-3.5">
        <kbd className="rounded-md border border-border bg-white px-1.5 py-0.5 font-mono text-[11px] font-bold text-[#14233a] shadow-[0_2px_0_#cfe3dd]">{j.k}</kbd>
        <span className="text-[12.5px] font-semibold text-[#14233a]">{j.n}</span>
        <span className="ml-auto flex items-center gap-1 text-[9.5px] font-medium text-muted-foreground"><i className="cg-live h-1.5 w-1.5 rounded-full bg-primary" />Copilot</span>
      </div>
      <div className="px-3.5 pt-3">
        {i === 0 && (
          <>
            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-primary">Suggested reply</p>
            <div className="mt-1.5 rounded-xl bg-primary/8 px-2.5 py-2 text-[11.5px] leading-[1.55] text-[#14233a]">
              {LINES.map((l, n) => <span key={n} className={`cg-t${n}`}>{l}</span>)}
            </div>
            <div className="mt-2 flex items-center gap-1.5">
              <span className="rounded-full bg-primary/12 px-2 py-0.5 text-[9.5px] font-semibold text-primary">Empathetic</span>
              <kbd className="ml-auto rounded-md border border-border bg-white px-1.5 py-0.5 font-mono text-[9.5px] font-semibold text-[#14233a]">Tab to accept</kbd>
            </div>
          </>
        )}
        {i === 1 && (
          <>
            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">Summary · 12 messages</p>
            <ul className="mt-1.5 space-y-1.5">
              {SUMMARY.map(([a, b]) => (
                <li key={a} className="flex items-center gap-2 rounded-lg bg-[#f4f9f7] px-2.5 py-1.5 text-[11.5px] text-[#14233a]">
                  <span className="w-9 shrink-0 font-mono text-[9px] uppercase tracking-wider text-primary">{a}</span>{b}
                </li>
              ))}
            </ul>
          </>
        )}
        {i === 2 && (
          <>
            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">Found in your knowledge base</p>
            <div className="mt-1.5 flex items-start gap-2.5 rounded-xl bg-[#f4f9f7] p-2.5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#e0efff] text-[#0a85ff]"><FileText className="h-4 w-4" /></span>
              <span className="leading-snug">
                <span className="block text-[12px] font-semibold text-[#14233a]">Delivery policy</span>
                <span className="mt-0.5 block text-[11px] text-[#14233a]">Orders ship in 2 to 4 days and can be tracked from the order page.</span>
                <span className="mt-1 inline-block rounded-full bg-white px-2 py-0.5 text-[9px] font-medium text-muted-foreground ring-1 ring-border">Source · Help centre</span>
              </span>
            </div>
          </>
        )}
        {i === 3 && (
          <>
            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">Same reply, new tone</p>
            <div className="mt-1.5 flex gap-1.5">
              {["Formal", "Friendly", "Casual"].map((t) => (
                <span key={t} className={`rounded-full px-2.5 py-0.5 text-[10.5px] font-semibold ring-1 ring-border ${t === "Friendly" ? "cg-tone" : "text-[#14233a]"}`}>{t}</span>
              ))}
            </div>
            <p className="mt-2 rounded-xl bg-primary/8 px-2.5 py-2 text-[11.5px] leading-[1.5] text-[#14233a]">“Sorry about the wait, your order is on its way and lands today.”</p>
          </>
        )}
      </div>
      <i className={`cg-sh${i} pointer-events-none absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/70 to-transparent`} />
    </div>
  )
}

function Scene() {
  const P3 = { transformStyle: "preserve-3d" as const }
  return (
    <div className="absolute" style={{ left: W / 2, top: 262, width: 0, height: 0, ...P3, transform: "rotateX(calc(-9deg + var(--py, 0) * -5deg)) rotateY(calc(var(--px, 0) * 12deg))", transition: "transform .25s ease-out" }}>
      {/* the glass floor, with ripples running out from the centre */}
      <div className="absolute" style={{ left: -250, top: 112, width: 500, height: 500, ...P3, transform: "rotateX(90deg)" }}>
        <i className="absolute inset-0 rounded-full" style={{ background: "radial-gradient(circle, color-mix(in oklch, var(--primary) 20%, white) 0%, color-mix(in oklch, var(--primary) 7%, white) 48%, transparent 70%)" }} />
        <i className="absolute inset-[70px] rounded-full border border-primary/30" />
        <i className="cg-ripple absolute inset-0 rounded-full border-2 border-primary/40" />
        <i className="cg-ripple absolute inset-0 rounded-full border-2 border-primary/30" style={{ animationDelay: "1.6s" }} />
        <i className="cg-ripple absolute inset-0 rounded-full border-2 border-primary/20" style={{ animationDelay: "3.2s" }} />
      </div>

      {/* the Copilot orb, with two tilted orbit rings */}
      <div className="cg-bob absolute" style={{ left: -45, top: -232, width: 90, height: 90, ...P3 }}>
        <i className="cg-orbit absolute rounded-full border border-primary/45" style={{ left: -48, top: -48, width: 186, height: 186 }} />
        <i className="cg-orbit2 absolute rounded-full border border-dashed border-primary/45" style={{ left: -30, top: -30, width: 150, height: 150 }} />
        <span className="cg-pulse absolute inset-0 flex items-center justify-center rounded-full text-white" style={{ background: "radial-gradient(circle at 34% 28%, color-mix(in oklch, var(--primary) 40%, white) 0%, var(--primary) 52%, color-mix(in oklch, var(--primary) 70%, #04382c) 100%)" }}>
          <Sparkles className="h-9 w-9 drop-shadow-[0_3px_6px_rgba(6,60,48,.45)]" />
          <i className="absolute left-[16%] top-[10%] h-[26%] w-[38%] rotate-[-30deg] rounded-[50%] bg-white/45 blur-[2px]" />
        </span>
      </div>

      {/* a beam from the orb down to the front pane */}
      <i className="cg-beam absolute" style={{ left: -1, top: -140, width: 2, height: 52, transform: `translateZ(${R}px)` }} />

      {/* the prism: four glass panes that turn together */}
      <div className="cg-spin absolute" style={{ left: 0, top: 0, width: 0, height: 0, ...P3 }}>
        {JOBS.map((j, i) => (
          <div key={j.k} className="absolute" style={{ left: -CARD_W / 2, top: -CARD_H / 2 + 22, width: CARD_W, height: CARD_H, transform: `rotateY(${i * 90}deg) translateZ(${R}px)`, backfaceVisibility: "hidden" }}>
            <Pane i={i} />
          </div>
        ))}
      </div>

      {/* two chips floating at different depths */}
      <div className="cg-float absolute" style={{ left: -256, top: -226, transform: "translateZ(90px)" }}>
        <div className="flex items-center gap-2 rounded-2xl bg-white/95 py-2 pl-2.5 pr-3 ring-1 ring-white shadow-[0_20px_30px_-14px_rgba(15,26,46,.45)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logos/channels/whatsapp.svg" alt="" width={16} height={16} className="h-4 w-4" />
          <span className="leading-tight"><span className="block text-[11px] font-semibold text-[#14233a]">Rohan K. · Order #4821</span><span className="block text-[10px] text-muted-foreground">“Where is my order?”</span></span>
        </div>
      </div>
      <div className="cg-float absolute" style={{ left: 62, top: -214, animationDelay: "-3s", transform: "translateZ(120px)" }}>
        <span className="inline-flex items-center gap-2 rounded-full bg-white py-1.5 pl-2 pr-3.5 text-[11.5px] font-semibold text-[#14233a] shadow-[0_18px_28px_-12px_rgba(15,26,46,.45)] ring-1 ring-white"><span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground"><Check className="h-3 w-3" strokeWidth={3.4} /></span>Agent reviews every draft</span>
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
  // lean toward the pointer so the depth of the prism is easy to see
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
    <div ref={box} onPointerMove={move} onPointerLeave={leave} className="relative mx-auto w-full max-w-[560px]" style={{ height: H * k }} role="img" aria-label="A glass prism turning through Copilot's four jobs: draft a reply, summarise the thread, find the answer and change the tone">
      <div className="pointer-events-none absolute left-[6%] top-[8%] h-[84%] w-[88%] rounded-full bg-[radial-gradient(circle,color-mix(in_oklch,var(--primary)_13%,white),transparent_66%)]" />
      <div className="absolute left-0 top-0 origin-top-left" style={{ width: W, height: H, transform: `scale(${k})`, perspective: 1500, perspectiveOrigin: "50% 38%" }}>
        <Scene />
      </div>
      <style>{CSS}</style>
    </div>
  )
}
