"use client"

import { useEffect, useRef, useState } from "react"
import { CalendarCheck, CheckCheck, Clock, MapPin, Send, Users } from "lucide-react"

/**
 * Animated restaurant-operations dashboard for the Restaurant solution hero.
 * Live activity: new reservations stream to the top (Pending → Confirmed),
 * tonight's cover count ticks up, and the SMS reminder follows the newest
 * booking from "awaiting reply" to "confirmed" on a loop.
 */

type Status = "Confirmed" | "Pending" | "Reminder sent"

const STATUS_TINT: Record<Status, string> = {
  Confirmed: "text-emerald-300 bg-emerald-400/12 border-emerald-400/25",
  Pending: "text-amber-300 bg-amber-400/12 border-amber-400/25",
  "Reminder sent": "text-sky-300 bg-sky-400/12 border-sky-400/25",
}

type Resv = { id: number; name: string; party: number; time: string; status: Status }

const INITIAL: Resv[] = [
  { id: 1, name: "Smith", party: 4, time: "6:30 PM", status: "Confirmed" },
  { id: 2, name: "Lopez", party: 2, time: "7:00 PM", status: "Confirmed" },
  { id: 3, name: "Wong", party: 6, time: "7:30 PM", status: "Confirmed" },
  { id: 4, name: "Chen", party: 3, time: "8:00 PM", status: "Confirmed" },
]

// New bookings that stream in over time.
const POOL: { name: string; party: number; time: string }[] = [
  { name: "Garcia", party: 2, time: "8:15 PM" },
  { name: "Patel", party: 5, time: "8:30 PM" },
  { name: "Kim", party: 4, time: "8:45 PM" },
  { name: "Rossi", party: 2, time: "9:00 PM" },
  { name: "Nguyen", party: 6, time: "9:15 PM" },
  { name: "Brown", party: 3, time: "9:30 PM" },
]

export function RestaurantHeroVisual() {
  const [feed, setFeed] = useState<Resv[]>(INITIAL.slice(0, 3))
  const [covers, setCovers] = useState(14)
  const [confirmedId, setConfirmedId] = useState<number | null>(null)
  const poolRef = useRef(0)
  const idRef = useRef(100)

  // Loop: a fresh reservation books in (Pending) then confirms shortly after.
  useEffect(() => {
    const id = setInterval(() => {
      const g = POOL[poolRef.current % POOL.length]
      poolRef.current += 1
      idRef.current += 1
      const newId = idRef.current

      setFeed((prev) => [{ id: newId, ...g, status: "Pending" as Status }, ...prev].slice(0, 3))
      setCovers((c) => c + g.party)
      setConfirmedId(null)

      // Guest replies "C" → confirmed.
      const t = setTimeout(() => {
        setFeed((prev) => prev.map((r) => (r.id === newId ? { ...r, status: "Confirmed" } : r)))
        setConfirmedId(newId)
      }, 1400)
      return () => clearTimeout(t)
    }, 3000)
    return () => clearInterval(id)
  }, [])

  const latest = feed[0]
  const latestConfirmed = confirmedId === latest?.id

  return (
    <div className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-8 -z-10 rounded-[32px] opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklch, var(--primary) 40%, transparent), transparent 70%)",
          animation: "restGlow 6s ease-in-out infinite",
        }}
      />

      <div
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-[oklch(0.16_0.02_230)]/90 shadow-2xl backdrop-blur-xl"
        style={{ animation: "restCardIn 0.9s cubic-bezier(0.22,1,0.36,1) both" }}
      >
        {/* Window chrome */}
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3" style={{ animation: "restStagger 0.7s ease-out 0.05s both" }}>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
          </div>
          <p className="font-mono text-[11px] text-white/55">atlas-bistro · brooklyn</p>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-wider text-emerald-400">
            <span className="relative inline-flex h-1.5 w-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/70" />
              <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            Live
          </span>
        </div>

        <div className="px-5 py-5">
          {/* Header */}
          <div className="flex items-center justify-between" style={{ animation: "restStagger 0.7s ease-out 0.15s both" }}>
            <div>
              <p className="text-[14px] font-semibold text-white">Atlas Bistro</p>
              <p className="flex items-center gap-1 text-[11.5px] text-white/55">
                <MapPin className="h-3 w-3" /> Brooklyn
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/45">Tonight</p>
              <p className="flex items-center justify-end gap-1.5 text-[15px] font-semibold text-white">
                <Users className="h-3.5 w-3.5 text-primary" />
                <span key={covers} className="tabular-nums" style={{ animation: "restPulse 0.6s ease-out both" }}>
                  {covers} covers
                </span>
              </p>
            </div>
          </div>

          {/* Reservation cards */}
          <div className="mt-4 space-y-1.5" style={{ animation: "restStagger 0.7s ease-out 0.25s both" }}>
            {feed.map((r, i) => (
              <div
                key={r.id}
                className={`flex items-center gap-3 rounded-xl border px-3 py-2 transition-all duration-500 ${r.status === "Confirmed" && r.id === confirmedId ? "border-emerald-400/30 bg-emerald-400/[0.06]" : "border-white/8 bg-white/[0.025]"
                  }`}
                style={{ animation: i === 0 ? "restRowIn 0.55s cubic-bezier(0.22,1,0.36,1) both" : undefined }}
              >
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/30 to-[oklch(0.72_0.17_165)]/20 text-[11px] font-semibold text-white">
                  {r.name[0]}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[12.5px] font-semibold text-white/90">{r.name}</span>
                  <span className="block text-[11px] text-white/50">Party of {r.party}</span>
                </span>
                <span className="flex items-center gap-1 font-mono text-[11px] text-white/60">
                  <Clock className="h-3 w-3" /> {r.time}
                </span>
                <span className={`inline-flex shrink-0 items-center rounded-full border px-2 py-0.5 text-[9.5px] font-semibold ${STATUS_TINT[r.status]}`}>
                  {r.status}
                </span>
              </div>
            ))}
          </div>

          {/* SMS automation card */}
          <div className="mt-4 rounded-xl border border-white/8 bg-white/[0.03] p-3" style={{ animation: "restStagger 0.7s ease-out 0.4s both" }}>
            <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-primary">
              <Send className="h-3 w-3" /> SMS automation
            </p>
            <div className="mt-2 rounded-lg rounded-tl-sm bg-white/[0.04] px-3 py-2 text-[11.5px] leading-relaxed text-white/80">
              Hi {latest?.name ?? "Chen"}! Reminder: tonight {latest?.time ?? "8:00 PM"} at Atlas Bistro, party of {latest?.party ?? 3}. Reply <span className="font-semibold text-primary">C</span> to confirm.
            </div>
            <div className="mt-2 flex items-center gap-1.5">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10.5px] font-semibold transition-all duration-500 ${latestConfirmed ? "bg-emerald-400/15 text-emerald-300" : "bg-white/5 text-white/50"
                  }`}
              >
                {latestConfirmed ? <CheckCheck className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                {latestConfirmed ? "Reservation confirmed" : "Awaiting reply…"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating: no-shows */}
      <div
        className="absolute -left-4 -top-5 hidden rotate-[-5deg] rounded-xl border border-white/15 bg-[oklch(0.18_0.03_230)]/95 px-3 py-2 text-[11.5px] text-white/80 shadow-xl backdrop-blur md:block"
        style={{ animation: "restFloatA 5.5s ease-in-out infinite, restCardIn 0.9s ease-out 0.55s both" }}
      >
        <p className="flex items-center gap-1 font-semibold text-emerald-400">
          <CalendarCheck className="h-3 w-3" /> −38% no-shows
        </p>
        <p className="text-white/55">With auto reminders</p>
      </div>

      {/* Floating: reviews */}
      <div
        className="absolute -right-3 -bottom-4 hidden rotate-[4deg] rounded-xl border border-white/15 bg-[oklch(0.18_0.03_230)]/95 px-3 py-2 text-[11.5px] text-white/80 shadow-xl backdrop-blur md:block"
        style={{ animation: "restFloatB 6.5s ease-in-out infinite, restCardIn 0.9s ease-out 0.75s both" }}
      >
        <p className="flex items-center gap-1 font-semibold text-white">
          ⭐ 4.8 avg rating
        </p>
        <p className="text-white/55">62 new reviews this week</p>
      </div>

      <style jsx>{`
        @keyframes restCardIn {
          0% { opacity: 0; transform: translateY(14px) scale(0.98); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes restStagger {
          0% { opacity: 0; transform: translateY(8px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes restRowIn {
          0% { opacity: 0; transform: translateY(-12px) scale(0.97); }
          60% { opacity: 1; }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes restPulse {
          0% { transform: scale(1); color: var(--primary); }
          40% { transform: scale(1.12); }
          100% { transform: scale(1); }
        }
        @keyframes restGlow {
          0%, 100% { opacity: 0.55; transform: scale(1); }
          50% { opacity: 0.85; transform: scale(1.04); }
        }
        @keyframes restFloatA {
          0%, 100% { transform: rotate(-5deg) translateY(0); }
          50% { transform: rotate(-5deg) translateY(-6px); }
        }
        @keyframes restFloatB {
          0%, 100% { transform: rotate(4deg) translateY(0); }
          50% { transform: rotate(4deg) translateY(-5px); }
        }
        @media (prefers-reduced-motion: reduce) {
          :global(*) {
            animation-duration: 0.001ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.001ms !important;
          }
        }
      `}</style>
    </div>
  )
}
