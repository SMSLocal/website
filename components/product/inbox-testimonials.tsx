import { Quote } from "lucide-react"

const TESTIMONIALS = [
  {
    quote:
      "The Linear integration converts a chat into a tracked issue in one click. No copy-paste, no lost context — massive time saver.",
    name: "Neha Joshi",
    role: "Engineering Lead · Razorpay, Mumbai",
    initials: "NJ",
    color: "bg-rose-500",
  },
  {
    quote:
      "Stripe MRR and HubSpot lifecycle sit right on every conversation. One Customer 360 means no more tab-switching mid-chat.",
    name: "Vikram Mehta",
    role: "VP Support · fintech SaaS, Mumbai",
    initials: "VM",
    color: "bg-teal-500",
  },
  {
    quote:
      "We connected Zapier, HubSpot, and WhatsApp in one afternoon. The REST API is clean and the docs are actually good.",
    name: "Rahul Nair",
    role: "Founder · LogiTrack, Bengaluru",
    initials: "RN",
    color: "bg-violet-500",
  },
]

const ITEMS = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS]

export function InboxTestimonials() {
  return (
    <div className="overflow-hidden">
      <style>{`
        @keyframes inbox-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .inbox-marquee-track {
          animation: inbox-marquee 32s linear infinite;
        }
        .inbox-marquee-track:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .inbox-marquee-track { animation: none; }
        }
      `}</style>
      <div className="inbox-marquee-track flex w-max gap-5">
        {ITEMS.map((t, i) => (
          <div
            key={i}
            className="flex w-[300px] shrink-0 flex-col gap-4 rounded-2xl border border-border/60 bg-background p-6 shadow-sm sm:w-[340px]"
          >
            <Quote className="h-5 w-5 text-primary/40" />
            <p className="flex-1 text-[13.5px] leading-relaxed text-muted-foreground">
              "{t.quote}"
            </p>
            <div className="flex items-center gap-3 border-t border-border/40 pt-4">
              <span
                className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold text-white ${t.color}`}
              >
                {t.initials}
              </span>
              <div>
                <p className="text-[13px] font-semibold text-foreground">{t.name}</p>
                <p className="text-[11.5px] text-muted-foreground">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
