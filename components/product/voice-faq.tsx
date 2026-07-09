const FAQS = [
  { q: "Can I use my existing business number?", a: "Yes. Port your current business number into SMSLocal, or get a new local or toll-free number in minutes — your customers keep calling the same line." },
  { q: "Do you support international calling?", a: "Yes. Make outbound calls internationally at transparent per-minute rates, typically 30–40% below traditional telecom pricing." },
  { q: "Can I record calls?", a: "Yes. Call recording and automatic transcription are available, with recordings attached to the customer's conversation." },
  { q: "Is voice included in every plan?", a: "Voice is available on the Starter plan ($19.99/mo) and above. You pay $5/mo per local number, $15/mo per toll-free number, and $0.008/min for outbound." },
  { q: "Do calls appear inside customer profiles?", a: "Yes. Every inbound and outbound call becomes a conversation on the customer's unified timeline, right alongside email, WhatsApp, and live chat." },
  { q: "Do I need another dialer?", a: "No. Click-to-call works from any customer profile — no softphone or dialer app to install." },
]

export function VoiceFaq() {
  return (
    <section className="bg-muted/40 py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        {/* Centered header */}
        <div className="text-center">
          <span className="mx-auto inline-flex rounded-full border border-border bg-background px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
            FAQ
          </span>
          <h2 className="mt-4 text-pretty text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
            Common{" "}
            <span className="bg-gradient-to-r from-primary to-[oklch(0.72_0.17_165)] bg-clip-text text-transparent">
              questions
            </span>
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground sm:text-base">
            Straight answers, no sales spin.
          </p>
        </div>

        {/* Single-column accordion list — boxless, divider only */}
        <div className="mt-10 border-t border-border">
          {FAQS.map((item) => (
            <details
              key={item.q}
              className="group border-b border-border py-5"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-semibold tracking-tight text-foreground transition group-open:text-primary">
                {item.q}
                <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition group-open:rotate-180 group-open:border-primary/40 group-open:text-primary">
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden>
                    <path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </summary>
              <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
