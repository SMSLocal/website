import { Bot, CheckCheck, MessageCircle, MessageSquareText } from "lucide-react"

/* Visual "how it works" preview shown directly under the hero — three mock
   product cards that demonstrate the platform in action (SMS delivery, an AI
   WhatsApp agent replying, and a two-way WhatsApp inbox). */

export function HeroShowcase() {
  return (
    <section className="relative overflow-hidden bg-background pb-16 pt-4 lg:pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.15fr_1fr] lg:items-stretch">
          {/* Card 1 — Bulk SMS */}
          <article className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-sm">
            <header className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <MessageSquareText className="h-5 w-5" />
              </span>
              <div>
                <div className="text-sm font-semibold text-foreground">Bulk SMS &amp; OTP</div>
                <div className="text-[12px] text-muted-foreground">DLT-compliant, in &lt;1s</div>
              </div>
            </header>

            <div className="mt-4 rounded-xl border border-border bg-background p-3">
              <div className="text-[11px] font-semibold text-muted-foreground">SMSLCL</div>
              <p className="mt-1 text-[13px] leading-snug text-foreground">
                Your OTP is <span className="font-semibold">482913</span>. Valid for 10 minutes.
                Do not share.
              </p>
              <div className="mt-2 flex items-center justify-end gap-1 text-[11px] font-medium text-primary">
                <CheckCheck className="h-3.5 w-3.5" /> Delivered · 0.4s
              </div>
            </div>

            <ul className="mt-4 space-y-1.5 text-[12.5px] text-muted-foreground">
              <li className="flex items-center gap-1.5">
                <CheckCheck className="h-3.5 w-3.5 text-primary" /> Direct operator routes
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCheck className="h-3.5 w-3.5 text-primary" /> Priority OTP failover
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCheck className="h-3.5 w-3.5 text-primary" /> One API, one wallet
              </li>
            </ul>
          </article>

          {/* Card 2 — AI WhatsApp agent (emphasized) */}
          <article className="flex flex-col rounded-2xl border border-primary/20 bg-card p-5 shadow-lg shadow-primary/5 lg:-mt-4">
            <header className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-white">
                <Bot className="h-5 w-5" />
              </span>
              <div>
                <div className="text-sm font-semibold text-foreground">AI WhatsApp Agent</div>
                <div className="text-[12px] text-muted-foreground">Replies in 8 Indian languages</div>
              </div>
            </header>

            <div className="mt-4 flex-1 space-y-2.5 rounded-xl border border-border bg-background p-3">
              <div className="flex items-start gap-2">
                <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/30 text-[10px] font-bold text-accent-foreground">
                  R
                </span>
                <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-secondary px-3 py-1.5 text-[12.5px] text-foreground">
                  Hi, do you ship to Chennai? Order #4421
                </div>
              </div>
              <div className="flex items-start justify-end gap-2">
                <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-primary px-3 py-1.5 text-[12.5px] text-primary-foreground">
                  Yes! Free shipping over ₹500. Order #4421 is out for delivery 🛵 — ETA today 6 PM.
                  <div className="mt-1 flex items-center justify-end gap-1 text-[10px] text-primary-foreground/70">
                    AI agent <CheckCheck className="h-3 w-3" />
                  </div>
                </div>
                <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-[9px] font-bold text-white">
                  AI
                </span>
              </div>
            </div>
            <p className="mt-3 text-center text-[11.5px] text-muted-foreground">
              Resolved automatically · avg. reply 0.8s
            </p>
          </article>

          {/* Card 3 — WhatsApp two-way + channels */}
          <article className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-sm">
            <header className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[oklch(0.62_0.17_150)]/12 text-[oklch(0.52_0.17_150)]">
                <MessageCircle className="h-5 w-5" />
              </span>
              <div>
                <div className="text-sm font-semibold text-foreground">WhatsApp Two-Way</div>
                <div className="text-[12px] text-muted-foreground">All channels, one inbox</div>
              </div>
            </header>

            <div className="mt-4 rounded-xl border border-border bg-[oklch(0.97_0.01_150)] p-3">
              <div className="mb-2 flex items-center gap-2 border-b border-border/60 pb-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-[10px] font-bold text-white">
                  M
                </span>
                <span className="text-[12px] font-semibold text-foreground">Mira · Customer</span>
                <span className="ml-auto text-[10px] text-primary">online</span>
              </div>
              <div className="space-y-1.5">
                <div className="max-w-[80%] rounded-lg bg-card px-2.5 py-1.5 text-[12px] text-foreground shadow-sm">
                  Order #4421 update?
                </div>
                <div className="ml-auto max-w-[80%] rounded-lg bg-[oklch(0.88_0.08_150)] px-2.5 py-1.5 text-[12px] text-foreground">
                  Out for delivery 🛵
                  <span className="ml-1 text-[9px] text-foreground/50">9:41 ✓✓</span>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Connects with
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {["SMS", "WhatsApp", "RCS", "Email"].map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-border bg-background px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
