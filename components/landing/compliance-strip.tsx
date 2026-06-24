import { Check, Clock3, Database, FileCheck2, ShieldCheck, XCircle } from "lucide-react"
import { Reveal } from "./reveal"

const PILLARS = [
  { icon: FileCheck2, title: "DLT registration support", body: "We guide you through Entity, Sender ID, and Template approvals on Jio, Airtel, Vi, and BSNL DLT portals." },
  { icon: Clock3, title: "TRAI time-window enforcement", body: "Promotional SMS auto-restricted to 10 AM–9 PM. Transactional flows run 24/7 on approved templates." },
  { icon: XCircle, title: "Consent & opt-out management", body: "Every promotional message carries an opt-out, honoured immediately across every sender ID." },
  { icon: Database, title: "India data residency", body: "Customer data and message logs stored in Indian data centres on DPDPA-aware architecture." },
]

const CHECKLIST = [
  "Principal Entity registered",
  "Sender ID allotted",
  "Content templates approved",
  "Opt-outs honoured instantly",
  "Data stored in India · DPDPA 2023",
]

const BADGES = ["TRAI TCCCPR 2018", "DPDPA 2023", "DLT: Jio · Airtel · Vi · BSNL", "Signed DPA available"]

export function ComplianceStrip() {
  return (
    <section className="bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[12px] font-semibold uppercase tracking-wider text-primary">
            Compliance
          </span>
          <h2 className="mt-5 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[44px] lg:leading-[1.1]">
            Compliance built in,{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">not bolted on</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
          {/* Pillars */}
          <div className="space-y-3">
            {PILLARS.map((p, i) => (
              <Reveal key={p.title} delay={i * 90}>
                <div className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-5 transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                    <p.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-[15px] font-semibold text-foreground">{p.title}</h3>
                    <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{p.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Compliance certificate card */}
          <Reveal delay={120}>
            <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-card to-secondary/40 p-6 shadow-xl shadow-foreground/5 lg:p-8">
              <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br from-primary/15 to-accent/10 blur-2xl" />
              <div className="relative flex items-center gap-3">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-white"><ShieldCheck className="h-6 w-6" /></span>
                <div>
                  <div className="text-[15px] font-bold text-foreground">DLT-compliant by default</div>
                  <div className="text-[12px] text-muted-foreground">TRAI TCCCPR 2018 · every message</div>
                </div>
              </div>

              <ul className="relative mt-6 space-y-2.5">
                {CHECKLIST.map((c) => (
                  <li key={c} className="flex items-center gap-2.5 rounded-xl border border-border bg-background px-3.5 py-2.5 text-[13.5px] font-medium text-foreground">
                    <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"><Check className="h-3 w-3" strokeWidth={3} /></span>
                    {c}
                  </li>
                ))}
              </ul>

              <div className="relative mt-5 flex items-center justify-between rounded-xl bg-primary/5 px-4 py-3">
                <span className="text-[12px] font-medium text-muted-foreground">Direct connectivity</span>
                <span className="text-[12.5px] font-semibold text-primary">Jio · Airtel · Vi · BSNL</span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Badge pills */}
        <Reveal delay={80} className="mt-10 flex flex-wrap items-center justify-center gap-2.5">
          {BADGES.map((b) => (
            <span key={b} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-1.5 text-[12.5px] font-medium text-muted-foreground">
              <Check className="h-3.5 w-3.5 text-primary" /> {b}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
