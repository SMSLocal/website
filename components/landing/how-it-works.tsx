import { BarChart3, FileCheck2, Rocket, UserPlus } from "lucide-react"

const STEPS = [
  {
    icon: UserPlus,
    title: "Sign up free",
    body: "Create your account in 2 minutes. You get ₹60 credit to test every feature. No card, no lock-in.",
  },
  {
    icon: FileCheck2,
    title: "Register your DLT entity",
    body: "Add your DLT-approved entity and upload your PE certificate. Sender ID and template approvals tracked inside the dashboard.",
  },
  {
    icon: Rocket,
    title: "Send your first campaign",
    body: "Upload contacts, choose a DLT template, and launch. Watch live traffic in real time.",
  },
  {
    icon: BarChart3,
    title: "Measure and optimise",
    body: "Delivery rate, click tracking, campaign ROI, and carrier-level breakdown — all in the dashboard.",
  },
]

export function HowItWorks() {
  return (
    <section className="bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex rounded-full border border-border bg-muted px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            How it works
          </span>
          <h2 className="mt-4 text-pretty text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Go live in four steps — about 10 minutes.
          </h2>
        </div>

        <div className="relative mt-14">
          {/* Connecting line */}
          <div
            aria-hidden
            className="pointer-events-none absolute top-8 right-0 left-0 hidden h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent lg:block"
          />

          <ol className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => {
              const Icon = step.icon
              return (
                <li
                  key={step.title}
                  className="relative flex flex-col rounded-2xl border border-border bg-card p-6 transition hover:border-primary/40 hover:shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" />
                      <span className="absolute -top-1.5 -right-1.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-[11px] font-semibold text-background">
                        {i + 1}
                      </span>
                    </div>
                  </div>
                  <h3 className="mt-5 text-base font-semibold tracking-tight text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">
                    {step.body}
                  </p>
                </li>
              )
            })}
          </ol>
        </div>

      </div>
    </section>
  )
}
