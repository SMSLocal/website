import Link from "next/link"
import {
  ArrowRight,
  Banknote,
  GraduationCap,
  HeartPulse,
  Home,
  ShoppingBag,
  Truck,
} from "lucide-react"

const INDUSTRIES = [
  {
    icon: ShoppingBag,
    name: "E-commerce",
    href: "/solutions/ecommerce",
    hook: "Order confirmations, cart recovery, festive offers — with delivery tracking built in",
  },
  {
    icon: Banknote,
    name: "Banking & Fintech",
    href: "/solutions/banking-fintech",
    hook: "Secure OTPs, transaction alerts, and DPDP-aware customer messaging",
  },
  {
    icon: HeartPulse,
    name: "Healthcare",
    href: "/solutions/healthcare",
    hook: "Appointment reminders, prescription refills, lab result notifications",
  },
  {
    icon: GraduationCap,
    name: "Education",
    href: "/solutions/education",
    hook: "Fee reminders, result announcements, exam schedules for schools and colleges",
  },
  {
    icon: Truck,
    name: "Logistics",
    href: "/solutions/logistics",
    hook: "Dispatch alerts, delivery OTPs, route updates across multilingual India",
  },
  {
    icon: Home,
    name: "Real Estate",
    href: "/solutions/real-estate",
    hook: "New-listing alerts, open-house invites, lead follow-up in the buyer's language",
  },
]

export function Industries() {
  return (
    <section className="bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex rounded-full border border-border bg-muted px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Industry solutions
          </span>
          <h2 className="mt-4 text-pretty text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Built for India&apos;s growing industries.
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
            Every industry has different compliance, timing, and content rules. We&apos;ve solved
            them so you don&apos;t have to.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((ind) => {
            const Icon = ind.icon
            return (
              <Link
                key={ind.name}
                href={ind.href}
                className="group flex items-start gap-4 rounded-xl border border-border bg-card p-5 transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg"
              >
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-[15px] font-semibold tracking-tight text-foreground">
                      {ind.name}
                    </h3>
                    <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-primary" />
                  </div>
                  <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
                    {ind.hook}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
