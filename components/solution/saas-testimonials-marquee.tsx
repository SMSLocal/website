"use client"

const TESTIMONIALS = [
  {
    quote: "The Linear integration converts a chat into a tracked issue in one click. No copy-paste, no lost context — massive time saver.",
    name: "Neha Joshi",
    role: "Engineering Lead · Razorpay, Mumbai",
    initials: "NJ",
    color: "#f43f5e",
  },
  {
    quote: "Stripe MRR and HubSpot lifecycle sit right on every conversation. One Customer 360 means no more tab-switching mid-chat.",
    name: "Vikram Mehta",
    role: "VP Support · fintech SaaS, Mumbai",
    initials: "VM",
    color: "#14b8a6",
  },
  {
    quote: "We connected Zapier, HubSpot, and WhatsApp in one afternoon. The REST API is clean and the docs are actually good.",
    name: "Rahul Nair",
    role: "Founder · LogiTrack, Bengaluru",
    initials: "RN",
    color: "#8b5cf6",
  },
]

/* 4 copies so the -50% reset point is never visible on screen */
const ITEMS = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS]

export function SaasTestimonialsMarquee() {
  return (
    <section className="overflow-hidden bg-muted/30 py-14 sm:py-20">
      <style>{`
        @keyframes saas-testimonial-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .saas-testimonial-track {
          animation: saas-testimonial-marquee 30s linear infinite;
        }
        .saas-testimonial-track:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .saas-testimonial-track { animation: none; }
        }
      `}</style>

      {/* Header */}
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
        <span className="inline-flex items-center rounded-full border border-border bg-background px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Testimonials
        </span>
        <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
          Teams that switched, stayed.
        </h2>
      </div>

      {/* Marquee */}
      <div className="relative mt-12">
        {/* Fade edges */}
        <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-muted/30 to-transparent" />
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-muted/30 to-transparent" />

        <div className="saas-testimonial-track flex w-max gap-5 pb-2">
          {ITEMS.map((t, i) => (
            <div
              key={i}
              className="w-[300px] shrink-0 rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md sm:w-[340px]"
            >
              {/* Quote mark */}
              <svg width="28" height="20" viewBox="0 0 28 20" fill="none" aria-hidden>
                <path
                  d="M0 20V12.727C0 5.697 4.121 1.394 12.364 0l1.09 2.182C9.758 3.03 7.758 5.03 7.273 8.182H12V20H0ZM16 20V12.727C16 5.697 20.121 1.394 28.364 0l1.09 2.182c-3.696.848-5.696 2.848-6.181 6H28V20H16Z"
                  fill="currentColor"
                  className="text-primary"
                />
              </svg>

              <p className="mt-3 text-[14px] leading-relaxed text-foreground/90">
                {t.quote}
              </p>

              <div className="mt-5 flex items-center gap-3">
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[12px] font-bold text-white"
                  style={{ background: t.color }}
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
    </section>
  )
}
