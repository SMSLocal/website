"use client"

import { useEffect, useState } from "react"
import { BadgeCheck, ChevronRight, Image as ImageIcon, MoreVertical } from "lucide-react"

type Phase = "rcs-rendering" | "rcs-delivered" | "sms-fallback"

export function RcsVisual() {
  const [phase, setPhase] = useState<Phase>("rcs-rendering")

  useEffect(() => {
    let mounted = true
    const cycle = async () => {
      // Loop between RCS delivered and SMS fallback to tell the waterfall story
      while (mounted) {
        setPhase("rcs-rendering")
        await sleep(700)
        setPhase("rcs-delivered")
        await sleep(2800)
        setPhase("sms-fallback")
        await sleep(2800)
      }
    }
    cycle()
    return () => {
      mounted = false
    }
  }, [])

  return (
    <div className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-8 -z-10 rounded-[32px] opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklch, var(--primary) 35%, transparent), transparent 70%)",
        }}
      />

      {/* Phone frame */}
      <div className="relative mx-auto w-[320px] max-w-full overflow-hidden rounded-[40px] border border-white/10 bg-[oklch(0.14_0.02_230)] p-3 shadow-2xl shadow-black/40">
        <div className="overflow-hidden rounded-[30px] bg-white">
          {/* Status bar */}
          <div className="flex items-center justify-between border-b border-black/5 px-5 py-2 text-[10px] font-semibold text-slate-700">
            <span>9:41</span>
            <span className="flex items-center gap-1">
              <span className="h-1 w-1 rounded-full bg-slate-700" />
              <span className="h-1 w-1 rounded-full bg-slate-700" />
              <span className="h-1 w-1 rounded-full bg-slate-700" />
              <span className="ml-1">Jio 5G</span>
            </span>
          </div>

          {/* Chat header */}
          <div className="flex items-center justify-between border-b border-black/5 px-4 py-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-[11px] font-bold text-white shadow-sm">
                SL
              </div>
              <div>
                <p className="flex items-center gap-1 text-[13px] font-semibold text-slate-900">
                  SMSLocal
                  <BadgeCheck className="h-3.5 w-3.5 fill-sky-500 text-white" aria-label="Verified sender" />
                </p>
                <p className="text-[10.5px] text-slate-500">
                  {phase === "sms-fallback" ? "SMS · +91 98200 00000" : "Verified business · RCS"}
                </p>
              </div>
            </div>
            <MoreVertical className="h-4 w-4 text-slate-400" />
          </div>

          {/* Conversation */}
          <div className="space-y-2 bg-slate-50 px-3 py-3">
            <p className="text-center text-[10px] font-medium uppercase tracking-[0.15em] text-slate-400">
              Today · 2:14 PM
            </p>

            {/*
              Both cards stay mounted and are stacked in the same grid cell
              (col-start-1 row-start-1). The grid's height is always the
              taller of the two, so switching phases never resizes or
              clips the phone — only opacity toggles.
            */}
            <div className="grid grid-cols-1">
              {/* SMS fallback bubble */}
              <div
                className={`col-start-1 row-start-1 max-w-[80%] self-start rounded-2xl rounded-bl-sm bg-white px-3.5 py-2.5 shadow-sm ring-1 ring-black/5 transition-opacity duration-300 ${
                  phase === "sms-fallback" ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
                aria-hidden={phase !== "sms-fallback"}
              >
                <p className="text-[11.5px] leading-relaxed text-slate-800">
                  Your order #A-5921 is out for delivery. Track:
                  smslocal.in/t/5921 — SMSLocal
                </p>
                <p className="mt-1 text-right text-[9.5px] text-slate-400">2:14 PM · SMS</p>
              </div>

              {/* Rich RCS card */}
              <div
                className={`col-start-1 row-start-1 w-[78%] self-start overflow-hidden rounded-2xl rounded-bl-sm bg-white shadow-sm ring-1 ring-black/5 transition-opacity duration-300 ${
                  phase === "sms-fallback" ? "pointer-events-none opacity-0" : phase === "rcs-rendering" ? "opacity-60" : "opacity-100"
                }`}
                aria-hidden={phase === "sms-fallback"}
              >
                {/* Rich image */}
                <div className="relative aspect-[2.6/1] w-full bg-gradient-to-br from-primary/90 via-primary to-accent">
                  <div className="absolute inset-0 flex items-center justify-center text-white">
                    <div className="text-center">
                      <p className="text-[9px] font-semibold uppercase tracking-[0.15em] opacity-75">
                        Diwali special
                      </p>
                      <p className="mt-0.5 font-serif text-xl font-semibold leading-tight">
                        Flat ₹500 off
                      </p>
                      <p className="mt-0.5 text-[9.5px] opacity-85">orders over ₹2,499</p>
                    </div>
                  </div>
                  {phase === "rcs-rendering" && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
                      <div className="flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-medium text-white">
                        <ImageIcon className="h-3 w-3 animate-pulse" />
                        Rendering rich card…
                      </div>
                    </div>
                  )}
                </div>

                {/* Body */}
                <div className="px-3.5 py-1.5">
                  <p className="text-[12px] font-semibold leading-snug text-slate-900">
                    Your Diwali hamper is ready to ship
                  </p>
                  <p className="mt-0.5 text-[11px] leading-snug text-slate-600">
                    Apply code <span className="font-semibold text-primary">DIWALI500</span> at
                    checkout and confirm delivery to your Mumbai address.
                  </p>
                </div>

                {/* Suggested replies */}
                <div className="flex flex-wrap gap-1.5 border-t border-black/5 bg-slate-50/60 px-2.5 py-1.5">
                  {["Track order", "View offer", "Not now"].map((chip, idx) => (
                    <button
                      key={chip}
                      type="button"
                      className={`rounded-full px-2.5 py-1 text-[10.5px] font-semibold ${
                        idx === 0
                          ? "bg-primary text-primary-foreground"
                          : "border border-slate-200 bg-white text-slate-700"
                      }`}
                    >
                      {chip}
                      {idx === 0 && <ChevronRight className="ml-0.5 inline h-2.5 w-2.5" />}
                    </button>
                  ))}
                </div>

                <p className="border-t border-black/5 px-3.5 py-1 text-right text-[9.5px] text-slate-400">
                  2:14 PM · RCS · Read
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status chip outside the phone */}
      <div className="mx-auto mt-4 flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] backdrop-blur">
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            phase === "sms-fallback"
              ? "bg-amber-400"
              : phase === "rcs-delivered"
                ? "bg-emerald-400"
                : "bg-sky-400 animate-pulse"
          }`}
        />
        <span className="font-mono text-white/70">
          {phase === "rcs-rendering"
            ? "RCS handshake · checking capability"
            : phase === "rcs-delivered"
              ? "RCS delivered · verified sender"
              : "Handset not RCS-capable · fell back to DLT SMS"}
        </span>
      </div>
    </div>
  )
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}
