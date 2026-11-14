"use client"

import { useEffect, useState, type ReactNode } from "react"
import { Check, Hash, Link2, Loader2, MapPin, MessageSquare, PhoneCall, PhoneForwarded, PhoneIncoming, Radio, Router, ShieldCheck } from "lucide-react"

// Hero graphic for /numbers/did, light theme: the numbers console playing a live set-up. The screen steps through
// choosing a number type, registering it (DLT and sender ID), protection checks, and going live, while the sidebar,
// the stepper and the cards around the window follow along. Masked sample numbers. With reduced motion it rests on the
// finished screen. Stage is 580 x 440; below sm the window comes first and the cards stack under it.

const CSS = `
@keyframes dc-float { 0%, 100% { translate: 0 -3px } 50% { translate: 0 4px } }
@keyframes dc-live { 0%, 100% { opacity: .4 } 50% { opacity: 1 } }
@keyframes dc-in { from { opacity: 0; transform: translateY(14px) } to { opacity: 1; transform: none } }
@keyframes dc-bar { from { width: 0 } to { width: 100% } }
@keyframes dc-pop { 0% { transform: scale(0) } 70% { transform: scale(1.25) } 100% { transform: scale(1) } }
@keyframes dc-sel { from { box-shadow: 0 0 0 0 transparent; border-color: var(--border) } to { box-shadow: 0 16px 28px -16px color-mix(in oklch, var(--primary) 70%, transparent); border-color: color-mix(in oklch, var(--primary) 60%, transparent) } }
@keyframes dc-ring { 0% { transform: scale(.8); opacity: .5 } 100% { transform: scale(1.8); opacity: 0 } }
@keyframes dc-spin-out { 0%, 45% { opacity: 1 } 55%, 100% { opacity: 0 } }
@keyframes dc-cursor { 0% { opacity: 0; transform: translate(150px, 70px) } 12% { opacity: 1 } 55% { opacity: 1; transform: translate(26px, 40px) scale(1) } 62% { transform: translate(26px, 40px) scale(.82) } 70% { transform: translate(26px, 40px) scale(1) } 92% { opacity: 1 } 100% { opacity: 0; transform: translate(26px, 40px) } }
@keyframes dc-burst { 0% { transform: translate(0, 0) scale(0); opacity: 1 } 100% { transform: translate(var(--dx), var(--dy)) scale(1); opacity: 0 } }
@keyframes dc-toast { 0% { opacity: 0; transform: translateY(-12px) scale(.96) } 12%, 82% { opacity: 1; transform: none } 100% { opacity: 0; transform: translateY(-8px) } }
@keyframes dc-shine { 0% { transform: translateX(-120%) } 60%, 100% { transform: translateX(260%) } }
@keyframes dc-glow { 0%, 100% { opacity: .55 } 50% { opacity: 1 } }
.dc-cursor { animation: dc-cursor 3s ease-in-out both }
.dc-burst { animation: dc-burst 1s ease-out both }
.dc-toast { animation: dc-toast 3.6s ease-in-out both }
.dc-shine { animation: dc-shine 3.4s ease-in-out infinite }
.dc-glowbg { animation: dc-glow 6s ease-in-out infinite }
.dc-float { animation: dc-float 6s ease-in-out infinite }
.dc-live { animation: dc-live 1.6s ease-in-out infinite }
.dc-in { animation: dc-in .5s cubic-bezier(.2,.7,.2,1) both }
.dc-bar { animation: dc-bar 1.3s cubic-bezier(.4,0,.2,1) both }
.dc-pop { animation: dc-pop .45s cubic-bezier(.3,1.5,.5,1) both }
.dc-sel { animation: dc-sel .5s ease both }
.dc-ring { animation: dc-ring 1.8s ease-out infinite }
.dc-card { background: linear-gradient(180deg, #fff 0%, #f1faf7 100%); border-radius: 20px; box-shadow: 0 28px 44px -22px rgba(8,60,48,.42), 0 8px 16px -8px rgba(8,60,48,.14), inset 0 2px 0 #fff, inset 0 -4px 8px rgba(16,185,129,.07) }
.dc-3d { background: linear-gradient(180deg, color-mix(in oklch, var(--primary) 60%, white) 0%, var(--primary) 52%, color-mix(in oklch, var(--primary) 84%, black) 100%); box-shadow: 0 10px 16px -8px color-mix(in oklch, var(--primary) 75%, transparent), inset 0 2px 2px rgba(255,255,255,.6), inset 0 -3px 5px rgba(0,60,40,.25) }
@media (prefers-reduced-motion: reduce) { .dc-float, .dc-live, .dc-in, .dc-bar, .dc-pop, .dc-sel, .dc-ring, .dc-cursor, .dc-burst, .dc-toast, .dc-shine, .dc-glowbg { animation: none } }
`

const NAVY = "text-[#14233a]"

const STEPS = ["Type", "Register", "Protect", "Live"]
const TITLES = ["Choose a number type", "Registering your number", "Protection checks", "Live and ready"]
const SIDE = [
  { icon: Hash, label: "Numbers" },
  { icon: PhoneForwarded, label: "Registration" },
  { icon: ShieldCheck, label: "Protection" },
  { icon: Router, label: "Routing" },
  { icon: Link2, label: "Porting" },
]
const SIDE_FOR_STEP = [0, 1, 2, 3]

function Tick({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <p className={`flex items-center gap-1.5 text-[11px] font-semibold leading-tight ${NAVY}`} style={{ animationDelay: `${delay}s` }}>
      <span className="dc-3d flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-primary-foreground"><Check className="h-2.5 w-2.5" strokeWidth={3.5} /></span>
      {children}
    </p>
  )
}

function Check4({ label, delay }: { label: string; delay: number }) {
  return (
    <div className="dc-in flex items-center gap-3 rounded-2xl bg-[#f6faf9] px-4 py-3.5 ring-1 ring-border" style={{ animationDelay: `${delay * 0.4}s` }}>
      <span className="relative flex h-7 w-7 shrink-0 items-center justify-center">
        <Loader2 className="absolute h-5 w-5 animate-spin text-primary" style={{ animation: `spin 1s linear infinite, dc-spin-out ${1.2}s ${delay + 0.3}s both` }} />
        <span className="dc-pop dc-3d flex h-6 w-6 items-center justify-center rounded-full text-primary-foreground" style={{ animationDelay: `${delay + 1.4}s` }}><Check className="h-3.5 w-3.5" strokeWidth={3.5} /></span>
      </span>
      <span className={`text-[13px] font-semibold ${NAVY}`}>{label}</span>
    </div>
  )
}

function Body({ step }: { step: number }) {
  if (step === 0)
    return (
      <div className="relative grid gap-2.5 sm:grid-cols-3">
        <svg className="dc-cursor pointer-events-none absolute left-0 top-0 z-10 hidden h-6 w-6 drop-shadow-[0_4px_6px_rgba(8,60,48,.4)] sm:block" viewBox="0 0 24 24" aria-hidden><path d="M5 3l14 8-6 1.8L10 19z" fill="#14233a" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" /></svg>
        {[
          { icon: MapPin, t: "Local DID", d: "City-matching, for local calls", sel: true },
          { icon: PhoneIncoming, t: "Toll-free", d: "A support line, free to call" },
          { icon: Radio, t: "Short code", d: "High-volume messaging" },
        ].map((x, i) => (
          <div key={x.t} className={`dc-in rounded-2xl border bg-white p-3.5 ${x.sel ? "dc-sel border-border" : "border-border"}`} style={x.sel ? { animationDelay: `${i * 0.08}s, 0.9s` } : { animationDelay: `${i * 0.08}s` }}>
            <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${x.sel ? "dc-3d text-primary-foreground" : "bg-muted text-foreground"}`}><x.icon className="h-4 w-4" /></span>
            <p className={`mt-2.5 text-[12.5px] font-semibold ${NAVY}`}>{x.t}</p>
            <p className="mt-0.5 text-[10.5px] leading-snug text-muted-foreground">{x.d}</p>
            {x.sel && <p className="dc-pop mt-2 inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary" style={{ animationDelay: "1.1s" }}><Check className="h-2.5 w-2.5" strokeWidth={3.5} />Selected</p>}
          </div>
        ))}
      </div>
    )
  if (step === 1)
    return (
      <div className="space-y-3">
        {[["DLT registration", 0], ["Sender ID approval", 1.1]].map(([l, d]) => (
          <div key={l as string} className="dc-in rounded-2xl bg-[#f6faf9] px-4 py-3.5 ring-1 ring-border" style={{ animationDelay: `${(d as number) * 0.3}s` }}>
            <div className="flex items-center justify-between">
              <span className={`text-[13px] font-semibold ${NAVY}`}>{l}</span>
              <span className="dc-pop dc-3d flex h-5 w-5 items-center justify-center rounded-full text-primary-foreground" style={{ animationDelay: `${(d as number) + 1.4}s` }}><Check className="h-3 w-3" strokeWidth={3.5} /></span>
            </div>
            <span className="mt-2.5 block h-2 overflow-hidden rounded-full bg-primary/15"><i className="dc-bar block h-full rounded-full bg-gradient-to-r from-primary/70 to-primary" style={{ animationDelay: `${d}s` }} /></span>
          </div>
        ))}
        <p className="dc-in flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground" style={{ animationDelay: ".6s" }}><i className="dc-live h-1.5 w-1.5 rounded-full bg-primary" />Guided by our team</p>
      </div>
    )
  if (step === 2)
    return (
      <div className="space-y-2.5">
        <Check4 label="Number lookup" delay={0} />
        <Check4 label="Fraud and spam screening" delay={1} />
        <p className="dc-in flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground" style={{ animationDelay: ".8s" }}><ShieldCheck className="h-3.5 w-3.5 text-primary" />Keeps the number trusted and deliverable</p>
      </div>
    )
  return (
    <div className="dc-in flex flex-col items-center text-center">
      <div className="relative">
        <i className="dc-ring absolute inset-0 rounded-3xl bg-primary/30" />
        {[[-120, -30], [120, -34], [-90, 36], [96, 40], [-40, -52], [46, -54], [-140, 4], [142, 8]].map(([dx, dy], i) => (
          <i key={i} className="dc-burst absolute left-1/2 top-1/2 h-2 w-2 rounded-full" style={{ background: i % 2 ? "var(--accent)" : "var(--primary)", ["--dx" as string]: `${dx}px`, ["--dy" as string]: `${dy}px`, animationDelay: `${0.15 + i * 0.04}s` }} />
        ))}
        <div className="relative rounded-3xl bg-white px-6 py-4 shadow-[0_22px_36px_-20px_rgba(8,60,48,.5)] ring-1 ring-primary/40">
          <p className="flex items-center justify-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-primary"><i className="dc-live h-1.5 w-1.5 rounded-full bg-primary" />Active</p>
          <p className={`mt-1.5 whitespace-nowrap font-mono text-[22px] font-bold leading-none ${NAVY}`}>+91 22 ···· ····</p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {[[PhoneCall, "Voice"], [MessageSquare, "SMS"], [Radio, "Broadcast"]].map(([I, l], i) => {
          const Icon = I as typeof PhoneCall
          return <span key={l as string} className="dc-pop inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-bold text-primary" style={{ animationDelay: `${0.3 + i * 0.15}s` }}><Icon className="h-3 w-3" />{l as string}</span>
        })}
      </div>
      <p className="mt-3 text-[11px] text-muted-foreground">Route to IVR, a Voice AI agent or your own PBX</p>
    </div>
  )
}

export function DidHeroConsole() {
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setStep(3)
      return
    }
    const id = window.setInterval(() => setStep((s) => (s + 1) % 4), 4200)
    return () => window.clearInterval(id)
  }, [])

  const glow = (on: boolean) => `transition-all duration-500 ${on ? "scale-[1.04] ring-primary/60 shadow-[0_0_0_4px_color-mix(in_oklch,var(--primary)_14%,transparent)]" : "ring-white"}`

  return (
    <div className="relative mx-auto flex w-full max-w-[580px] flex-col gap-3 sm:block sm:h-[440px] lg:h-full lg:min-h-[440px]">
      <div aria-hidden className="dc-glowbg pointer-events-none absolute left-[44%] top-[50%] hidden h-[380px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_oklch,var(--primary)_16%,transparent),transparent_68%)] sm:block" />

      {/* the console window */}
      <div className="dc-float relative overflow-hidden rounded-[22px] bg-white shadow-[0_44px_70px_-34px_rgba(8,60,48,.55),0_14px_24px_-10px_rgba(8,60,48,.16)] ring-1 ring-border sm:absolute sm:left-0 sm:top-[34px] sm:h-[322px] sm:w-[536px]" style={{ animationDelay: "-1s" }}>
        <div className="flex items-center gap-1.5 border-b border-border bg-[#f1f7f5] px-4 py-2.5">
          <i className="h-2.5 w-2.5 rounded-full bg-border" /><i className="h-2.5 w-2.5 rounded-full bg-border" /><i className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="mx-auto rounded-md bg-white px-4 py-0.5 text-[10.5px] font-medium text-muted-foreground ring-1 ring-border">app.smslocal.in / numbers</span>
          <span className="flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[9.5px] font-bold text-primary"><i className="dc-live h-1.5 w-1.5 rounded-full bg-primary" />Live</span>
        </div>

        <div className="flex h-[calc(100%-38px)]">
          <ul className="hidden w-[116px] shrink-0 space-y-1 border-r border-border bg-[#f6faf9] p-2.5 sm:block">
            {SIDE.map((x, i) => {
              const on = SIDE_FOR_STEP[step] === i
              return (
                <li key={x.label} className={`relative flex items-center gap-2 overflow-hidden rounded-lg px-2.5 py-2 text-[11px] font-semibold transition-all duration-500 ${on ? "dc-3d text-primary-foreground" : "text-muted-foreground"}`}>
                  {on && <span aria-hidden className="dc-shine pointer-events-none absolute inset-y-0 left-0 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent" />}
                  <x.icon className="relative h-3.5 w-3.5 shrink-0" /><span className="relative">{x.label}</span>
                </li>
              )
            })}
          </ul>

          <div className="flex min-w-0 flex-1 flex-col p-4">
            <div className="flex items-center justify-between gap-3">
              <p key={step} className={`dc-in text-[15px] font-semibold tracking-tight ${NAVY}`}>{TITLES[step]}</p>
              <span className="shrink-0 rounded-full bg-muted px-2.5 py-1 text-[10.5px] font-semibold text-muted-foreground">Step {step + 1} of 4</span>
            </div>

            <ol className="mt-3 grid grid-cols-4 gap-2">
              {STEPS.map((s, i) => (
                <li key={s}>
                  <span className="block h-1.5 overflow-hidden rounded-full bg-primary/15"><i className={`block h-full rounded-full bg-primary transition-all duration-700 ${i <= step ? "w-full" : "w-0"}`} /></span>
                  <span className={`mt-1 block text-[10px] font-semibold transition-colors ${i <= step ? "text-primary" : "text-muted-foreground"}`}>{s}</span>
                </li>
              ))}
            </ol>

            <div key={step} className="mt-3 flex flex-1 flex-col justify-center">
              <Body step={step} />
            </div>
          </div>
        </div>
      </div>

      {/* success toast when the number goes live */}
      {step === 3 && (
        <div key="toast" className="dc-toast hidden sm:absolute sm:left-[16px] sm:top-[2px] sm:block">
          <div className="dc-card flex items-center gap-2.5 px-3.5 py-2.5 ring-1 ring-primary/40">
            <span className="dc-3d flex h-7 w-7 items-center justify-center rounded-full text-primary-foreground"><Check className="h-4 w-4" strokeWidth={3.5} /></span>
            <span className="leading-tight"><span className={`block text-[12px] font-semibold ${NAVY}`}>Number provisioned</span><span className="block text-[10px] text-muted-foreground">Ready for voice and SMS</span></span>
          </div>
        </div>
      )}

      {/* top right: protection */}
      <div className="dc-float sm:absolute sm:left-[392px] sm:top-[0px] sm:w-[178px]" style={{ animationDelay: "-2s" }}>
        <div className={`dc-card space-y-1.5 p-3.5 ring-1 ${glow(step === 2)}`}>
          <p className={`flex items-center gap-1.5 text-[12.5px] font-semibold ${NAVY}`}><ShieldCheck className="h-4 w-4 text-primary" />Protected</p>
          <Tick>Number lookup</Tick>
          <Tick>Fraud and spam</Tick>
        </div>
      </div>

      {/* bottom right: registration */}
      <div className="dc-float sm:absolute sm:left-[366px] sm:top-[340px] sm:w-[204px]" style={{ animationDelay: "-4s" }}>
        <div className={`dc-card space-y-1.5 p-3.5 ring-1 ${glow(step === 1)}`}>
          <p className={`flex items-center gap-1.5 text-[12.5px] font-semibold ${NAVY}`}><PhoneForwarded className="h-4 w-4 text-primary" />Registration handled</p>
          <Tick>DLT registration</Tick>
          <Tick>Sender ID approved</Tick>
        </div>
      </div>

      {/* bottom left: one number set */}
      <div className="dc-float sm:absolute sm:left-[8px] sm:top-[362px] sm:w-[236px]" style={{ animationDelay: "-3s" }}>
        <div className={`dc-card flex items-center gap-3 px-3.5 py-3 ring-1 ${glow(step === 3 || step === 0)}`}>
          <span className="dc-3d flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-primary-foreground"><PhoneCall className="h-4 w-4" /></span>
          <span className="leading-tight"><span className={`block text-[12.5px] font-semibold ${NAVY}`}>One number set</span><span className="block text-[10.5px] text-muted-foreground">Voice, SMS and broadcasting</span></span>
        </div>
      </div>
      <style>{CSS}</style>
    </div>
  )
}
