import { Clock3, Database, FileCheck2, XCircle } from "lucide-react"

const PILLARS = [
  {
    icon: FileCheck2,
    title: "DLT Registration Support",
    body: "We guide you through Entity, Sender ID, and Template approvals on Jio, Airtel, Vi, and BSNL DLT portals.",
  },
  {
    icon: Clock3,
    title: "TRAI Time-Window Enforcement",
    body: "Promotional SMS automatically restricted to 10 AM–9 PM. Transactional flows run 24/7 on approved templates.",
  },
  {
    icon: XCircle,
    title: "Consent & Opt-Out Management",
    body: "Every promotional message carries an opt-out. Opt-outs are honoured immediately across every sender ID.",
  },
  {
    icon: Database,
    title: "India Data Residency",
    body: "Customer data and messaging logs stored in Indian data centres. DPDPA-aware architecture.",
  },
]

export function ComplianceStrip() {
  return (
    <section className="bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex rounded-full border border-border bg-muted px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Compliance
          </span>
          <h2 className="mt-4 text-pretty text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Compliance built in, not bolted on.
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p) => {
            const Icon = p.icon
            return (
              <div
                key={p.title}
                className="rounded-2xl border border-border bg-card p-6 transition hover:border-primary/40"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-[15px] font-semibold tracking-tight text-foreground">
                  {p.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{p.body}</p>
              </div>
            )
          })}
        </div>

        <p className="mt-6 text-center text-[12px] text-muted-foreground">
          [PLACEHOLDER — add ISO 27001, SOC 2, or audit certification badges here if applicable]
        </p>
      </div>
    </section>
  )
}
