"use client"

import { useEffect, useRef, useState } from "react"

const ITEMS = [
  {
    quote: "Click-to-call from any profile means my reps stopped switching tabs. Every call logs itself automatically.",
    name: "Amit Rao",
    role: "Head of Sales · Forge Commerce",
    initial: "A",
    color: "from-violet-500 to-violet-700",
  },
  {
    quote: "We cut first-response time by 40% in the first week. Having calls and SMS in one place is a game changer.",
    name: "Priya Sharma",
    role: "Head of Support · Meesho",
    initial: "PS",
    color: "from-emerald-500 to-teal-600",
  },
  {
    quote: "Onboarding the whole team took under an hour. WhatsApp, calls, SMS — everyone was live the same day.",
    name: "Dev Kumar",
    role: "CTO · RapidShip",
    initial: "DK",
    color: "from-indigo-500 to-blue-600",
  },
]

/* 4 copies so the -50% reset point is never visible on screen */
const ALL = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS]

function Card({ item }: { item: typeof ITEMS[0] }) {
  return (
    <div className="relative flex w-[300px] shrink-0 flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-sm">
      <span className="mb-4 block font-serif text-4xl leading-none text-primary/40">&ldquo;&rdquo;</span>
      <p className="flex-1 text-[13.5px] leading-relaxed text-foreground/80">
        &ldquo;{item.quote}&rdquo;
      </p>
      <div className="mt-5 flex items-center gap-3">
        <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${item.color} text-[11px] font-bold text-white`}>
          {item.initial}
        </span>
        <div>
          <p className="text-[13px] font-semibold text-foreground">{item.name}</p>
          <p className="text-[11.5px] text-muted-foreground">{item.role}</p>
        </div>
      </div>
    </div>
  )
}

export function VoiceTestimonials() {
  const ref = useRef<HTMLElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) { setShown(true); return }
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect() } },
      { threshold: 0.1 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section ref={ref} className="overflow-hidden bg-muted/40 py-10 sm:py-14">
      <style>{`
        @keyframes voice-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .voice-marquee-track {
          animation: voice-marquee 30s linear infinite;
        }
        .voice-marquee-track:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .voice-marquee-track { animation: none; }
        }
      `}</style>

      {/* Header */}
      <div
        className="mx-auto max-w-xl px-4 text-center sm:px-6"
        style={{
          opacity: shown ? 1 : 0,
          transform: shown ? "translateY(0)" : "translateY(18px)",
          transition: "opacity 0.6s ease, transform 0.6s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <span className="inline-flex rounded-full border border-border bg-background px-3 py-1 text-[10.5px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
          Loved by support teams
        </span>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Teams that switched, stayed.
        </h2>
      </div>

      {/* Marquee */}
      <div
        className="relative mt-8"
        style={{
          opacity: shown ? 1 : 0,
          transition: "opacity 0.7s ease 200ms",
        }}
      >
        <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-muted/40 to-transparent" />
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-muted/40 to-transparent" />

        <div className="voice-marquee-track flex w-max gap-4">
          {ALL.map((item, i) => (
            <Card key={i} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
