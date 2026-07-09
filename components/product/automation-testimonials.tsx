"use client"

const TESTIMONIALS = [
  {
    quote: "Stripe MRR and HubSpot lifecycle sit right on every conversation. One Customer 360 means no more tab-switching mid-chat.",
    name: "Vikram Mehta",
    title: "VP Support",
    company: "fintech SaaS, Mumbai",
    initials: "VM",
    color: "bg-teal-500",
  },
  {
    quote: "We connected Zapier, HubSpot, and WhatsApp in one afternoon. The REST API is clean and the docs are actually good.",
    name: "Rahul Nair",
    title: "Founder",
    company: "LogiTrack, Bengaluru",
    initials: "RN",
    color: "bg-violet-500",
  },
  {
    quote: "The Linear integration converts a chat into a tracked issue in one click. No copy-paste, no lost context — massive time saver.",
    name: "Neha Joshi",
    title: "Engineering Lead",
    company: "Razorpay, Mumbai",
    initials: "NJ",
    color: "bg-rose-500",
  },
]

/* 4 copies so the reset point is never on screen */
const ALL = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS]

function StarRow() {
  return (
    <div className="flex gap-0.5" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="h-3.5 w-3.5 text-amber-400" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
          <path d="M8 1.5l1.75 3.55 3.92.57-2.84 2.77.67 3.9L8 10.4l-3.5 1.84.67-3.9-2.84-2.77 3.92-.57z" />
        </svg>
      ))}
    </div>
  )
}

export function AutomationTestimonials() {
  return (
    <div className="mt-12 overflow-hidden">
      <style>{`
        @keyframes marquee-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marquee-left 50s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
        }
      `}</style>

      <div className="marquee-track flex w-max gap-5">
        {ALL.map((t, i) => (
          <div
            key={i}
            className="flex w-[320px] shrink-0 flex-col gap-4 rounded-2xl border border-border/60 bg-background p-6 shadow-sm"
          >
            <StarRow />

            <p className="flex-1 text-[14px] leading-relaxed text-muted-foreground">"{t.quote}"</p>

            <div className="flex items-center gap-3 border-t border-border/40 pt-4">
              <span className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white ${t.color}`}>
                {t.initials}
              </span>
              <div>
                <p className="text-[13px] font-semibold text-foreground">{t.name}</p>
                <p className="text-[12px] text-muted-foreground">
                  {t.title}, {t.company}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
