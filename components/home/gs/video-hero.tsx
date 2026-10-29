"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { ArrowRight, CalendarDays, Check, CheckCheck, Loader2, Sparkles } from "lucide-react"

/**
 * Full-bleed video hero with two scenes that cross-fade: a person texting on a
 * phone, then two people working at a laptop. A pop-up conversation matching
 * each scene builds up card by card in front of the video. Reduced-motion
 * visitors get the paused phone scene with its finished conversation.
 */

const TICK = 1500
const SCENE_TICKS = 8 // 8 ticks = 12 s per scene

const T = "transition-all duration-500 ease-out"

export function VideoHero() {
  const phoneRef = useRef<HTMLVideoElement>(null)
  const laptopRef = useRef<HTMLVideoElement>(null)
  const [scene, setScene] = useState<0 | 1>(0)
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      phoneRef.current?.pause()
      laptopRef.current?.pause()
      setStep(6)
      return
    }
    let s = 0
    const t = setInterval(() => {
      s += 1
      if (s >= SCENE_TICKS) {
        s = 0
        setScene((c) => (c === 0 ? 1 : 0))
      }
      setStep(s)
    }, TICK)
    return () => clearInterval(t)
  }, [])

  const show = (n: number) => (step >= n ? "opacity-100 translate-y-0" : "pointer-events-none translate-y-3 opacity-0")
  const sceneOn = (n: 0 | 1) => (scene === n ? "opacity-100" : "pointer-events-none opacity-0")

  return (
    <section className="relative isolate overflow-hidden border-b border-border bg-slate-900 text-white">
      <video ref={phoneRef} className={`absolute inset-0 -z-20 h-full w-full object-cover transition-opacity duration-1000 ${sceneOn(0)}`} src="/home/hero-phone.mp4" autoPlay muted loop playsInline preload="metadata" aria-hidden />
      <video ref={laptopRef} className={`absolute inset-0 -z-20 h-full w-full object-cover transition-opacity duration-1000 ${sceneOn(1)}`} src="/home/hero-laptop.mp4" autoPlay muted loop playsInline preload="metadata" aria-hidden />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-[oklch(0.14_0.04_245)]/95 via-[oklch(0.14_0.04_245)]/78 to-[oklch(0.14_0.04_245)]/35 max-lg:from-[oklch(0.14_0.04_245)]/90 max-lg:to-[oklch(0.14_0.04_245)]/85" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-[oklch(0.14_0.04_245)]/70 to-transparent" />

      <div className="relative mx-auto grid min-h-[560px] max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.3fr_0.8fr_0.45fr] lg:min-h-[640px] lg:py-20">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[12.5px] font-semibold text-white backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-primary" /> The next generation of conversational AI
          </span>
          <h1 className="mt-6 text-balance text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-[54px]">
            Every customer conversation, <span className="text-emerald-300">answered like a person would</span>
          </h1>
          <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-white/80">
            AI agents that understand context, reply in 8 Indian languages and take action across SMS, WhatsApp, RCS and voice, then hand over to your team when it matters.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/signup/" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-[15px] font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition hover:brightness-110">
              Start your trial <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/company/contact/" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[15px] font-semibold text-slate-900 transition hover:bg-white/90">
              Request a demo
            </Link>
          </div>
        </div>

        {/* pop-ups, one set per scene */}
        <div className="relative mx-auto min-h-[310px] w-full max-w-[17.5rem] lg:col-span-2 lg:col-start-2 lg:mx-0 lg:justify-self-end lg:mr-6" aria-label="Example conversation">
          {/* scene 0: phone, booking */}
          <div className={`absolute inset-0 space-y-2.5 transition-opacity duration-700 ${sceneOn(0)}`}>
            <div className={`ml-auto w-[82%] rounded-2xl rounded-br-md bg-[#1e66ff]/95 px-3.5 py-2 text-[12px] font-medium shadow-2xl backdrop-blur ${T} ${show(1)}`}>I&apos;d like to book an appointment with my doctor.</div>
            <div className={`w-[78%] rounded-2xl rounded-bl-md bg-slate-100/95 px-3.5 py-2 text-[12px] font-medium text-slate-800 shadow-2xl backdrop-blur ${T} ${show(2)}`}>Sure! Please choose a preferred date and time.</div>
            <div className={`rounded-2xl bg-slate-100/95 p-3 text-slate-800 shadow-2xl backdrop-blur ${T} ${show(3)}`}>
              <div className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white text-primary shadow-sm"><CalendarDays className="h-5 w-5" /></span>
                <div className="text-[11.5px] leading-tight"><div className="font-bold">Dr. Sarah Johnson</div><div className="text-slate-500">Cardiologist</div><div className="mt-0.5 font-medium">Mon, 26 May · 10:30 AM</div></div>
              </div>
            </div>
            <div className={`rounded-2xl bg-slate-100/95 py-2.5 text-center text-[12px] font-bold text-[#1e66ff] shadow-2xl backdrop-blur ${T} ${show(4)}`}>Confirm booking</div>
            <div className={`flex items-start gap-2.5 rounded-2xl bg-slate-100/95 px-3.5 py-2.5 text-[11.5px] font-medium text-slate-800 shadow-2xl backdrop-blur ${T} ${show(5)}`}>
              <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-emerald-500 text-white"><Check className="h-3.5 w-3.5" strokeWidth={3} /></span>
              <span>Your appointment is confirmed! You&apos;ll receive a reminder before your visit.</span>
            </div>
          </div>

          {/* scene 1: laptop, support */}
          <div className={`absolute inset-0 space-y-2.5 transition-opacity duration-700 ${sceneOn(1)}`}>
            <div className={`rounded-2xl bg-white/95 p-3 text-slate-800 shadow-2xl backdrop-blur ${T} ${show(1)}`}>
              <div className="flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-wider text-[#128C7E]">New chat · WhatsApp</div>
              <div className="mt-1 text-[12px] font-medium">Rohan: &ldquo;My payment failed but money was deducted. Can you check?&rdquo;</div>
            </div>
            <div className={`flex items-center gap-2.5 rounded-2xl bg-slate-100/95 px-3.5 py-2.5 text-[11.5px] font-medium text-slate-800 shadow-2xl backdrop-blur ${T} ${show(2)}`}>
              <Loader2 className="h-4 w-4 animate-spin text-[#1e66ff]" /> AI agent is checking the payment status…
            </div>
            <div className={`rounded-2xl bg-slate-100/95 p-3 text-[11.5px] text-slate-800 shadow-2xl backdrop-blur ${T} ${show(3)}`}>
              <div className="font-bold">Payment found</div>
              <div className="mt-0.5 text-slate-600">₹1,499 · received 10:42 AM · order #4821</div>
            </div>
            <div className={`ml-auto w-[88%] rounded-2xl rounded-br-md bg-[#1e66ff]/95 px-3.5 py-2 text-[12px] font-medium shadow-2xl backdrop-blur ${T} ${show(4)}`}>Good news, Rohan: your payment went through and order #4821 is confirmed. A receipt is on its way.</div>
            <div className={`flex items-start gap-2.5 rounded-2xl bg-slate-100/95 px-3.5 py-2.5 text-[11.5px] font-medium text-slate-800 shadow-2xl backdrop-blur ${T} ${show(5)}`}>
              <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-emerald-500 text-white"><Check className="h-3.5 w-3.5" strokeWidth={3} /></span>
              <span>Resolved by AI. No ticket needed.</span>
            </div>
          </div>

          <div className={`absolute -left-4 -top-6 hidden items-center gap-2 rounded-full border border-white/20 bg-black/55 px-3.5 py-2 text-[11px] font-semibold text-white backdrop-blur sm:inline-flex ${T} ${show(2)}`}>
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" /> AI agent online
          </div>
          <div className={`absolute -bottom-10 right-0 hidden items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-[11px] font-semibold text-slate-800 shadow-xl sm:inline-flex ${T} ${show(5)}`}>
            <CheckCheck className="h-4 w-4 text-primary" /> {scene === 0 ? "Reminder sent on WhatsApp" : "Receipt sent on WhatsApp"}
          </div>
        </div>
      </div>
    </section>
  )
}
