import { BarChart3, Check, FileCheck2, Rocket, Send, UserPlus } from "lucide-react"
import { Reveal } from "./reveal"

type Step = {
  icon: React.ComponentType<{ className?: string }>
  title: string
  body: string
  visual: React.ReactNode
}

const STEPS: Step[] = [
  {
    icon: UserPlus,
    title: "Sign up free",
    body: "Create your account in 2 minutes — no card, no lock-in.",
    visual: (
      <div className="rounded-lg border border-border bg-secondary/60 p-2.5">
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-muted-foreground">Wallet</span>
          <span className="font-bold text-primary">₹60</span>
        </div>
        <div className="mt-1.5 inline-flex items-center gap-1 text-[10.5px] font-medium text-primary">
          <Check className="h-3 w-3" /> free credit added
        </div>
      </div>
    ),
  },
  {
    icon: FileCheck2,
    title: "Register your DLT entity",
    body: "Add your PE certificate — we track Sender ID and template approvals.",
    visual: (
      <div className="space-y-1 rounded-lg border border-border bg-secondary/60 p-2.5 text-[10.5px]">
        {["PE certificate", "Sender ID · SMSLCL", "Template approved"].map((x) => (
          <div key={x} className="flex items-center gap-1.5 text-foreground">
            <Check className="h-3 w-3 text-primary" /> {x}
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: Rocket,
    title: "Send your first campaign",
    body: "Upload contacts, pick a DLT template, and launch in seconds.",
    visual: (
      <div className="rounded-lg border border-border bg-secondary/60 p-2.5">
        <div className="flex items-center gap-2 text-[10.5px]">
          <span className="rounded bg-card px-1.5 py-0.5 text-muted-foreground">2,418 recipients</span>
          <span className="ml-auto inline-flex items-center gap-1 rounded bg-primary px-1.5 py-0.5 text-primary-foreground">
            <Send className="h-3 w-3" /> Send
          </span>
        </div>
        <div className="mt-1.5 inline-flex items-center gap-1 text-[10.5px] font-medium text-primary">
          <Check className="h-3 w-3" /> campaign launched
        </div>
      </div>
    ),
  },
  {
    icon: BarChart3,
    title: "Measure & optimise",
    body: "Delivery rate, click tracking, and carrier-level breakdown, live.",
    visual: (
      <div className="rounded-lg border border-border bg-secondary/60 p-2.5">
        <div className="flex h-10 items-end gap-1">
          {[50, 70, 45, 85, 98].map((h, i) => (
            <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-primary/60 to-primary" style={{ height: `${h}%` }} />
          ))}
        </div>
        <div className="mt-1.5 text-[10.5px] font-semibold text-primary">98.4% delivered</div>
      </div>
    ),
  },
]

export function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[12px] font-semibold uppercase tracking-wider text-primary">
            How it works
          </span>
          <h2 className="mt-5 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[44px] lg:leading-[1.1]">
            Live in 10 minutes —{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">four simple steps</span>
          </h2>
        </Reveal>

        <div className="relative mt-14">
          <div aria-hidden className="pointer-events-none absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent lg:block" />

          <ol className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <Reveal key={step.title} delay={i * 120}>
                <li className="group relative flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5">
                  <div className="relative inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <step.icon className="h-6 w-6" />
                    <span className="absolute -right-2 -top-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-[11px] font-semibold text-background">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="mt-5 text-base font-semibold tracking-tight text-foreground">{step.title}</h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">{step.body}</p>
                  <div className="mt-4">{step.visual}</div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
