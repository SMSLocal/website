import { ArrowUpRight, Bot, Check, Layers, Sparkles, X, Zap } from "lucide-react"
import { Reveal } from "./reveal"

function WaterfallVisual() {
  const rows = [
    { c: "RCS", ok: false, note: "skipped" },
    { c: "WhatsApp", ok: false, note: "skipped" },
    { c: "SMS", ok: true, note: "delivered 0.4s" },
  ]
  return (
    <div className="space-y-1.5 rounded-xl border border-border bg-secondary/50 p-3">
      {rows.map((s) => (
        <div key={s.c} className={`flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-[11.5px] font-medium ${s.ok ? "bg-primary text-primary-foreground" : "bg-card text-foreground"}`}>
          <span className={`inline-flex h-5 w-5 items-center justify-center rounded ${s.ok ? "bg-white/20" : "bg-secondary text-muted-foreground"}`}>
            {s.ok ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
          </span>
          {s.c}
          <span className={`ml-auto text-[10px] ${s.ok ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{s.note}</span>
        </div>
      ))}
    </div>
  )
}

function DeliveryVisual() {
  return (
    <div className="rounded-xl border border-border bg-secondary/50 p-3">
      <div className="flex justify-between text-[10.5px] text-muted-foreground"><span>Delivery rate</span><span className="font-bold text-primary">98%</span></div>
      <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-secondary"><div className="animate-fill-loop h-full rounded-full bg-gradient-to-r from-primary to-accent" /></div>
      <div className="mt-3 grid grid-cols-3 gap-2 text-center">
        {[["4+", "routes"], ["<200ms", "failover"], ["10–30%", "recovery"]].map(([v, l]) => (
          <div key={l}>
            <div className="text-[13px] font-bold text-foreground">{v}</div>
            <div className="text-[9.5px] text-muted-foreground">{l}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function AiVisual() {
  return (
    <div className="rounded-xl border border-border bg-secondary/50 p-3">
      <div className="space-y-1.5">
        <div className="max-w-[80%] rounded-xl rounded-bl-sm bg-card px-2.5 py-1.5 text-[11px] text-foreground">मेरा ऑर्डर कहाँ है?</div>
        <div className="ml-auto max-w-[86%] rounded-xl rounded-br-sm bg-primary px-2.5 py-1.5 text-[11px] text-primary-foreground">आज शाम तक पहुँच जाएगा 🛵</div>
      </div>
      <div className="mt-2.5 flex flex-wrap gap-1">
        {["हिन्दी", "தமிழ்", "తెలుగు", "বাংলা", "+4"].map((l) => (
          <span key={l} className="rounded bg-card px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">{l}</span>
        ))}
      </div>
    </div>
  )
}

const CARDS = [
  {
    n: 1,
    tag: "Multi-channel waterfall",
    icon: Layers,
    titleA: "One message, ",
    titleB: "every channel",
    body: "Send one payload — we try RCS first, fall through to WhatsApp, then DLT SMS. Same wallet, same delivery report, same webhook. No second vendor.",
    href: "/products/",
    visual: <WaterfallVisual />,
  },
  {
    n: 2,
    tag: "Delivery",
    icon: Zap,
    titleA: "Delivery that fights for ",
    titleB: "every message",
    body: "Smart route failover takes the fastest carrier path and auto-switches if it slows. Wrong-number detection and failed-batch retry recover deliveries most platforms write off.",
    href: "/products/bulk-sms/",
    visual: <DeliveryVisual />,
  },
  {
    n: 3,
    tag: "AI Agents",
    icon: Sparkles,
    titleA: "Speaks ",
    titleB: "your customer's language",
    body: "Hand off repeat queries to an agent that replies in the language the customer writes in — Hindi, Tamil, Telugu, Bengali and more — with clean escalation to a human.",
    href: "/products/ai-agents/",
    visual: <AiVisual />,
  },
]

export function Differentiators() {
  return (
    <section className="bg-muted/40 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[12px] font-semibold uppercase tracking-wider text-primary">
            What makes us different
          </span>
          <h2 className="mt-5 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[44px] lg:leading-[1.1]">
            Capability you can&apos;t buy{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">off a pricing page</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {CARDS.map((card, i) => (
            <Reveal key={card.n} delay={i * 120}>
              <article className="group flex h-full flex-col rounded-2xl border border-border bg-background p-6 transition duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5">
                {card.visual}
                <div className="mt-5 flex items-center gap-2">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary"><card.icon className="h-4 w-4" /></span>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">0{card.n} — {card.tag}</span>
                </div>
                <h3 className="mt-3 text-xl font-bold leading-tight tracking-tight text-foreground">
                  {card.titleA}
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{card.titleB}</span>
                </h3>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted-foreground">{card.body}</p>
                <a href={card.href} className="mt-auto inline-flex items-center gap-1 pt-4 text-[13.5px] font-semibold text-primary hover:underline">
                  Learn more <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
