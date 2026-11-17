"use client"

import { useEffect, useRef, useState } from "react"
import { Check, Lock, ShieldAlert, ShieldCheck, Wifi } from "lucide-react"

// Hero graphic for /solutions/banking-fintech: a customer's debit card and the alerts that protect it, in real 3D.
// A glossy glass debit card sits at the left. Three glass notification tiles fly in from the depth of the scene on the
// right, each from the same DLT-registered sender: a one-time password (with its 0.87 s delivery time), a UPI debit alert,
// and a fraud alert for an unusual login. When the OTP lands the card is marked verified; when the customer taps
// "Secure account" on the fraud alert, the card locks. Along the bottom a glass audit log adds a line for every message
// (time, template ID, status). The scene sways gently and leans toward the pointer. HTML + CSS 3D transforms, silent,
// 16-second loop.

const W = 560
const H = 440

const f = (n: number) => +n.toFixed(2)
const win = (name: string, a: number, b: number, y = 10) =>
  `@keyframes ${name} { 0%, ${f(a)}% { opacity: 0; transform: translateY(${y}px) } ${f(a + 3)}%, ${f(b)}% { opacity: 1; transform: none } ${f(b + 3)}%, 100% { opacity: 0 } }`
const fly = (name: string, a: number) =>
  `@keyframes ${name} { 0%, ${f(a)}% { opacity: 0; transform: translate3d(90px, 10px, -280px) rotateY(-34deg) } ${f(a + 7)}%, 94% { opacity: 1; transform: none } 98%, 100% { opacity: 0; transform: none } }`

const CSS = `
@property --bkn { syntax: "<integer>"; inherits: false; initial-value: 0 }
${win("bk-card", 0, 94, 16)}
${fly("bk-n1", 8)}
${fly("bk-n2", 32)}
${fly("bk-n3", 56)}
${win("bk-audit", 64, 94, 8)}
@keyframes bk-lock { 0%, 74% { opacity: 0; transform: scale(.7) } 78%, 94% { opacity: 1; transform: none } 98%, 100% { opacity: 0 } }
@keyframes bk-frost { 0%, 74% { opacity: 0 } 78%, 94% { opacity: 1 } 98%, 100% { opacity: 0 } }
@keyframes bk-press { 0%, 71% { transform: none } 72.5%, 74.5% { transform: scale(.94) translateY(1px) } 76%, 100% { transform: none } }
@keyframes bk-b1 { 0%, 73% { opacity: 1 } 75%, 100% { opacity: 0 } }
@keyframes bk-b2 { 0%, 74% { opacity: 0 } 77%, 94% { opacity: 1 } 98%, 100% { opacity: 0 } }
@keyframes bk-count { 0%, 12% { --bkn: 0 } 20%, 100% { --bkn: 87 } }
@keyframes bk-sheen { 0%, 20% { transform: translateX(-130%) } 40%, 100% { transform: translateX(260%) } }
@keyframes bk-sway { 0%, 100% { transform: rotateY(-3deg) } 50% { transform: rotateY(3deg) } }
@keyframes bk-float { 0%, 100% { translate: 0 -3px } 50% { translate: 0 4px } }
@keyframes bk-live { 0%, 100% { opacity: 1 } 50% { opacity: .35 } }
.bk-card { opacity: 0; animation: bk-card 16s cubic-bezier(.2,.7,.2,1) infinite }
.bk-n1 { opacity: 0; animation: bk-n1 16s cubic-bezier(.2,.8,.2,1) infinite } .bk-n2 { opacity: 0; animation: bk-n2 16s cubic-bezier(.2,.8,.2,1) infinite } .bk-n3 { opacity: 0; animation: bk-n3 16s cubic-bezier(.2,.8,.2,1) infinite }
.bk-audit { opacity: 0; animation: bk-audit 16s cubic-bezier(.3,1.4,.4,1) infinite }
.bk-lock { opacity: 0; animation: bk-lock 16s cubic-bezier(.3,1.6,.4,1) infinite }
.bk-frost { opacity: 0; animation: bk-frost 16s ease-out infinite }
.bk-press { animation: bk-press 16s ease-in-out infinite }
.bk-b1 { animation: bk-b1 16s linear infinite } .bk-b2 { opacity: 0; animation: bk-b2 16s linear infinite }
.bk-num { --bkn: 0; counter-reset: bkn var(--bkn); animation: bk-count 16s linear infinite }
.bk-num::after { content: "0." counter(bkn, decimal-leading-zero) " s" }
.bk-sheen { transform: translateX(-130%); animation: bk-sheen 8s ease-in-out infinite }
.bk-sway { animation: bk-sway 9s ease-in-out infinite }
.bk-float { animation: bk-float 6s ease-in-out infinite }
.bk-live { animation: bk-live 1.4s ease-in-out infinite }
@media (prefers-reduced-motion: reduce) {
  .bk-sway, .bk-float, .bk-live, .bk-sheen, .bk-press { animation: none }
  .bk-card, .bk-n1, .bk-n2, .bk-n3, .bk-audit { animation: none; opacity: 1; transform: none }
  .bk-lock, .bk-frost, .bk-b1 { animation: none; opacity: 0 } .bk-b2 { animation: none; opacity: 1 }
  .bk-num { animation: none; --bkn: 87 }
}
`

const P3 = { transformStyle: "preserve-3d" as const }
const z = (px: number) => ({ transform: `translateZ(${px}px)` })

function Gloss() {
  return <i className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(115deg,rgba(255,255,255,.6)_0%,rgba(255,255,255,.1)_30%,transparent_46%)]" />
}

function Tile({ tone, tag, TagIcon, children, time }: { tone: string; tag: string; TagIcon: typeof ShieldCheck; children: React.ReactNode; time: string }) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-white/95 p-3 ring-1 ring-white shadow-[0_28px_40px_-18px_rgba(15,26,46,.5),inset_0_1px_0_#fff]">
      <i className="absolute inset-y-0 left-0 w-1.5" style={{ background: tone }} />
      <div className="flex items-center gap-2 pl-1.5">
        <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[#14233a] text-[8px] font-bold text-white">NS</span>
        <span className="text-[11px] font-semibold text-[#14233a]">NSBANK</span>
        <span className="inline-flex items-center gap-1 rounded-full px-1.5 py-px text-[8.5px] font-semibold" style={{ background: `color-mix(in oklch, ${tone} 14%, white)`, color: tone }}><TagIcon className="h-2.5 w-2.5" />{tag}</span>
        <span className="ml-auto text-[9px] text-muted-foreground">{time}</span>
      </div>
      <div className="pl-1.5 pt-1.5">{children}</div>
      <Gloss />
    </div>
  )
}

function Scene() {
  return (
    <div className="absolute inset-0" style={{ ...P3, transform: "rotateY(calc(-11deg + var(--px, 0) * 7deg)) rotateX(calc(4deg + var(--py, 0) * -5deg))", transition: "transform .25s ease-out" }}>
      <div className="bk-sway absolute inset-0" style={P3}>
        <i className="absolute rounded-[50%] bg-[#0f1a2e]/20 blur-[18px]" style={{ left: 24, top: 296, width: 250, height: 22, ...z(-40) }} />

        {/* the debit card */}
        <div className="absolute" style={{ left: 2, top: 104, width: 276, height: 178, ...P3 }}>
          <div className="bk-card h-full">
            <div className="relative h-full overflow-hidden rounded-[22px] text-white shadow-[0_40px_56px_-24px_rgba(15,26,46,.6)]" style={{ background: "linear-gradient(135deg, #14233a 0%, #1b3f4e 52%, #12a07c 130%)" }}>
              <i className="absolute -right-10 -top-14 h-52 w-52 rounded-full border border-white/10" /><i className="absolute -right-4 -top-8 h-52 w-52 rounded-full border border-white/10" />
              <i className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,.22),transparent_55%)]" />
              <div className="relative flex items-start justify-between px-5 pt-4">
                <span className="text-[13.5px] font-semibold tracking-tight">NorthStar Bank</span>
                <Wifi className="h-5 w-5 rotate-90 text-white/80" />
              </div>
              <i className="absolute left-5 top-[64px] h-[32px] w-[42px] rounded-md" style={{ background: "linear-gradient(135deg, #f0d98a, #c9a23f)", boxShadow: "inset 0 0 0 1px rgba(255,255,255,.4)" }}>
                <i className="absolute left-[14px] top-0 h-full w-px bg-black/20" /><i className="absolute left-0 top-[10px] h-px w-full bg-black/20" /><i className="absolute left-0 top-[20px] h-px w-full bg-black/20" />
              </i>
              <p className="absolute left-5 top-[112px] font-mono text-[17px] tracking-[0.14em] text-white/95">•••• •••• •••• 3482</p>
              <div className="absolute inset-x-5 bottom-4 flex items-end justify-between">
                <span className="leading-tight"><span className="block text-[8px] uppercase tracking-widest text-white/60">Card holder</span><span className="block text-[12px] font-semibold tracking-wide">ROHIT SHARMA</span></span>
                <span className="leading-tight"><span className="block text-[8px] uppercase tracking-widest text-white/60">Valid thru</span><span className="block text-[12px] font-semibold">09/28</span></span>
                <span className="flex"><i className="h-7 w-7 rounded-full bg-[#ff6b6b]/90" /><i className="-ml-3 h-7 w-7 rounded-full bg-[#ffc24b]/90" /></span>
              </div>
              <i className="bk-frost absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,.28),rgba(120,200,255,.25))] backdrop-blur-[2px]" />
              <span className="bk-lock absolute inset-0 flex flex-col items-center justify-center gap-1.5"><span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#14233a] shadow-[0_14px_24px_-8px_rgba(0,0,0,.5)]"><Lock className="h-7 w-7" /></span><span className="rounded-full bg-white/90 px-3 py-0.5 text-[11px] font-semibold text-[#14233a]">Card secured</span></span>
              <i className="bk-sheen pointer-events-none absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            </div>
          </div>
        </div>

        {/* one quiet note about the audit trail */}
        <div className="bk-float absolute" style={{ left: 22, top: 300, ...z(90) }}>
          <span className="bk-audit flex items-center gap-2 whitespace-nowrap rounded-full bg-white py-1.5 pl-2 pr-3.5 text-[11.5px] font-semibold text-[#14233a] shadow-[0_18px_28px_-12px_rgba(15,26,46,.45)] ring-1 ring-white"><ShieldCheck className="h-4 w-4 text-primary" />Every message logged for audit</span>
        </div>

        {/* the three alerts, flying in from the depth of the scene */}
        <div className="absolute" style={{ left: 340, top: 36, width: 216, ...P3, ...z(80) }}>
          <div className="bk-n1" style={P3}>
            <Tile tone="#0a84ff" tag="OTP" TagIcon={ShieldCheck} time="10:02">
              <p className="text-[11.5px] leading-snug text-[#14233a]"><b className="text-[15px] tracking-wider">845712</b> is your one-time password for NorthStar Bank.</p>
              <p className="mt-1.5 flex items-center gap-1 text-[10px] font-medium text-primary"><Check className="h-3 w-3" strokeWidth={3.4} />Delivered in <span className="bk-num" /></p>
            </Tile>
          </div>
        </div>
        <div className="absolute" style={{ left: 340, top: 150, width: 216, ...P3, ...z(80) }}>
          <div className="bk-n2" style={P3}>
            <Tile tone="#e0a21b" tag="Transaction" TagIcon={ShieldCheck} time="10:02">
              <p className="text-[11.5px] leading-snug text-[#14233a]">INR <b className="text-[15px]">12,499</b> debited from A/c XX3482 via UPI to Amazon.</p>
            </Tile>
          </div>
        </div>
        <div className="absolute" style={{ left: 340, top: 244, width: 216, ...P3, ...z(80) }}>
          <div className="bk-n3" style={P3}>
            <Tile tone="#d6453d" tag="Fraud alert" TagIcon={ShieldAlert} time="10:03">
              <p className="text-[11.5px] leading-snug text-[#14233a]">Unusual login from Chennai. Was this you?</p>
              <div className="relative mt-2 h-7">
                <div className="bk-b1 absolute inset-0 flex gap-1.5">
                  <span className="flex flex-1 items-center justify-center rounded-lg bg-secondary text-[10.5px] font-semibold text-[#14233a]">It was me</span>
                  <span className="bk-press flex flex-[1.3] items-center justify-center rounded-lg bg-[#d6453d] text-[10.5px] font-semibold text-white">Secure account</span>
                </div>
                <div className="bk-b2 absolute inset-0 flex items-center justify-center gap-1.5 rounded-lg bg-primary text-[10.5px] font-semibold text-primary-foreground"><Check className="h-3.5 w-3.5" strokeWidth={3.4} />Account secured</div>
              </div>
            </Tile>
          </div>
        </div>

      </div>
    </div>
  )
}

export function BankingHero() {
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
    <div ref={box} onPointerMove={move} onPointerLeave={leave} className="relative mx-auto w-full max-w-[560px]" style={{ height: H * k }} role="img" aria-label="A customer's debit card and the alerts that protect it: a one-time password delivered in under a second, a UPI debit alert and a fraud alert from a DLT-registered sender, the card locked when the customer taps Secure account, and an audit log line for every message">
      <div className="pointer-events-none absolute left-[4%] top-[6%] h-[86%] w-[86%] rounded-full bg-[radial-gradient(circle,color-mix(in_oklch,var(--primary)_13%,white),transparent_66%)]" />
      <div className="absolute left-0 top-0 origin-top-left" style={{ width: W, height: H, transform: `scale(${k})`, perspective: 1600, perspectiveOrigin: "50% 40%" }}>
        <Scene />
      </div>
      <style>{CSS}</style>
    </div>
  )
}
