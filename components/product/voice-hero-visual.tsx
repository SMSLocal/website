"use client"

import { useEffect, useState } from "react"
import { Mic, Pause, Phone, PhoneIncoming, PhoneOutgoing, Search, Volume2 } from "lucide-react"

const RECENT = [
  { name: "Jessica Chen",     dir: "in"  as const, time: "9:41 AM",   dur: "2m 14s" },
  { name: "Marcus Williams",  dir: "out" as const, time: "8:55 AM",   dur: "5m 02s" },
  { name: "Ashley Rodriguez", dir: "in"  as const, time: "Yesterday", dur: "1m 47s" },
  { name: "Tyler Brooks",     dir: "out" as const, time: "Yesterday", dur: "4m 11s" },
]

const NUMBERS = [
  { num: "(415) 555-0142", tag: "SF – LOCAL",  cls: "bg-sky-400/15 text-sky-300" },
  { num: "(800) 555-9100", tag: "TOLL-FREE",   cls: "bg-violet-400/15 text-violet-300" },
]

const INIT_BARS = [2, 4, 7, 5, 9, 6, 3, 8, 5, 7, 4, 6, 3, 8, 5]

function fmt(s: number) {
  const m = Math.floor(s / 60)
  const sec = s % 60
  return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`
}

export function VoiceHeroVisual() {
  const [seconds, setSeconds] = useState(26)
  const [bars, setBars] = useState(INIT_BARS)

  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const id = setInterval(() => {
      setBars((prev) =>
        prev.map((h) => Math.max(1, Math.min(10, h + Math.floor(Math.random() * 5) - 2)))
      )
    }, 150)
    return () => clearInterval(id)
  }, [])

  return (
    <div
      className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-[oklch(0.13_0.02_230)] shadow-2xl"
      style={{ animation: "voiceAppIn 0.9s cubic-bezier(0.22,1,0.36,1) 0.1s both" }}
    >
      {/* ── Window chrome ── */}
      <div className="flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.025] px-3 py-2">
        <div className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-rose-400/70" />
          <span className="h-2 w-2 rounded-full bg-amber-400/70" />
          <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
        </div>
        <div className="flex flex-1 justify-center">
          <span className="rounded bg-white/[0.05] px-2.5 py-0.5 font-mono text-[10px] text-white/35">
            app.smslocal.in · voice
          </span>
        </div>
        <span className="flex items-center gap-1 text-[10px] font-medium text-emerald-400">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/60" />
            <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          Online
        </span>
      </div>

      {/* ── App body: sidebar + call panel side-by-side ── */}
      <div className="flex flex-row" style={{ minHeight: "210px" }}>

        {/* ── Sidebar ── */}
        <div className="flex w-[44%] flex-col border-r border-white/[0.06]">

          {/* Local DID badge */}
          <div className="border-b border-white/[0.05] px-2.5 py-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold text-primary">
              <Phone className="h-2.5 w-2.5" /> Local DID $5/mo
            </span>
          </div>

          {/* Recent calls header */}
          <div className="px-2.5 pt-2 pb-1">
            <p className="flex items-center gap-1 text-[10px] font-semibold text-white/60">
              <PhoneIncoming className="h-3 w-3" /> Recent calls
            </p>
          </div>

          {/* Search */}
          <div className="px-2.5 pb-1.5">
            <div className="flex items-center gap-1.5 rounded-md border border-white/[0.06] bg-white/[0.04] px-2 py-1">
              <Search className="h-3 w-3 shrink-0 text-white/30" />
              <span className="text-[9.5px] text-white/25">Search...</span>
            </div>
          </div>

          {/* Call list */}
          <ul className="flex-1 divide-y divide-white/[0.04]">
            {RECENT.map((c, i) => (
              <li
                key={c.name}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 ${i === 0 ? "bg-primary/10" : ""}`}
              >
                <span
                  className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded ${
                    c.dir === "in"
                      ? "bg-emerald-400/10 text-emerald-300"
                      : "bg-sky-400/10 text-sky-300"
                  }`}
                >
                  {c.dir === "in"
                    ? <PhoneIncoming className="h-3 w-3" />
                    : <PhoneOutgoing className="h-3 w-3" />}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[10.5px] font-semibold text-white/85">{c.name}</span>
                  <span className="block text-[9px] text-white/40">
                    {c.dir === "in" ? "In" : "Out"} · {c.time}
                  </span>
                </span>
                <span className="font-mono text-[9px] text-white/40">{c.dur}</span>
              </li>
            ))}
          </ul>

          {/* Your numbers */}
          <div className="border-t border-white/[0.05] px-2.5 pt-2 pb-0.5">
            <p className="text-[8.5px] font-semibold uppercase tracking-[0.13em] text-white/30">
              Your Numbers
            </p>
          </div>
          <ul className="divide-y divide-white/[0.04]">
            {NUMBERS.map((n) => (
              <li key={n.num} className="flex items-center justify-between gap-1 px-2.5 py-1.5">
                <span className="flex items-center gap-1.5 text-[9.5px] text-white/55 truncate">
                  <Phone className="h-3 w-3 shrink-0 text-white/25" />
                  <span className="truncate">{n.num}</span>
                </span>
                <span className={`shrink-0 rounded px-1 py-0.5 text-[8.5px] font-semibold ${n.cls}`}>
                  {n.tag}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Main: active call ── */}
        <div
          className="relative flex flex-1 flex-col items-center justify-center overflow-hidden"
          style={{
            background:
              "linear-gradient(140deg, oklch(0.30 0.12 258) 0%, oklch(0.22 0.10 272) 55%, oklch(0.16 0.06 245) 100%)",
          }}
        >
          {/* Ambient glow */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-35"
            style={{
              background:
                "radial-gradient(ellipse at 55% 35%, oklch(0.62 0.14 168) 0%, transparent 60%)",
            }}
          />

          <div className="relative z-10 flex flex-col items-center text-center px-3">
            {/* Phone icon ring */}
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 ring-2 ring-primary/20">
              <Phone className="h-5 w-5 text-primary" />
            </span>

            <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.18em] text-primary">
              Connected
            </p>
            <p className="mt-0.5 text-[15px] font-semibold leading-tight text-white">
              Jessica Chen
            </p>
            <span className="mt-0.5 font-mono text-[12px] tabular-nums text-white/55">
              {fmt(seconds)}
            </span>

            {/* Live waveform */}
            <div className="mt-3 flex items-end gap-[2px]" style={{ height: "28px" }}>
              {bars.map((h, i) => (
                <span
                  key={i}
                  className="w-1 rounded-full bg-primary/70 transition-all"
                  style={{ height: `${h * 2.6}px`, transitionDuration: "140ms" }}
                />
              ))}
            </div>

            {/* Controls */}
            <div className="mt-3 flex items-center gap-2">
              <CtrlBtn icon={Mic} />
              <CtrlBtn icon={Pause} />
              <CtrlBtn icon={Volume2} />
              <button
                type="button"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-rose-500 text-white shadow-lg"
              >
                <Phone className="h-3.5 w-3.5 rotate-[135deg]" />
              </button>
            </div>
          </div>

          {/* Outbound pricing badge */}
          <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded-full border border-white/10 bg-black/30 px-2 py-0.5 text-[9px] backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span className="text-white/55">Outbound</span>
            <span className="font-semibold text-primary">$0.008/min</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes voiceAppIn {
          0%   { opacity: 0; transform: translateY(28px) scale(0.96); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  )
}

function CtrlBtn({ icon: Icon }: { icon: React.ComponentType<{ className?: string }> }) {
  return (
    <button
      type="button"
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/55"
    >
      <Icon className="h-4 w-4" />
    </button>
  )
}
