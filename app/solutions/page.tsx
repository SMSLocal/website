import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  Building2,
  GraduationCap,
  HeartPulse,
  Hotel,
  Landmark,
  ShieldCheck,
  ShoppingBag,
  Truck,
  type LucideIcon,
} from "lucide-react"
import { AnnouncementStrip } from "@/components/landing/announcement-strip"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { FinalCta } from "@/components/landing/final-cta"
import { Section, SectionHeader } from "@/components/product/product-page"
import { BreadcrumbJsonLd } from "@/components/seo/json-ld"
import { getPageMetadata } from "@/lib/seo"

// ─── SEO — edit lib/seo/registry.ts or open /dev/seo to preview ──────────────
export const metadata: Metadata = getPageMetadata("/solutions")

type Industry = {
  slug: string
  name: string
  headline: string
  summary: string
  icon: LucideIcon
  accent: string
  useCases: string[]
}

const INDUSTRIES: Industry[] = [
  {
    slug: "ecommerce",
    name: "E-commerce & D2C",
    headline: "Confirm orders, recover carts, blast festive sales",
    summary:
      "DLT-compliant order alerts, AI WhatsApp cart recovery in 8 Indian languages, and festive bulk campaigns that actually land on time.",
    icon: ShoppingBag,
    accent: "from-emerald-500/20 to-emerald-500/0",
    useCases: ["Order & shipping alerts", "Cart recovery via WhatsApp AI", "Festive broadcasts", "Delivery OTPs"],
  },
  {
    slug: "banking-fintech",
    name: "Banking & Fintech",
    headline: "Sub-second OTPs and regulator-ready alerts",
    summary:
      "Priority OTP routes, transaction alerts on DLT-approved templates, WhatsApp KYC flows, and a DPDPA-aware compliance layer.",
    icon: Landmark,
    accent: "from-sky-500/20 to-sky-500/0",
    useCases: ["2FA OTPs", "Credit/debit alerts", "WhatsApp KYC flows", "Fraud notifications"],
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    headline: "Patient messaging that reduces no-shows",
    summary:
      "Appointment reminders, prescription refills, lab-report links, and multilingual patient Q&A that improves outcomes and saves calls.",
    icon: HeartPulse,
    accent: "from-rose-500/20 to-rose-500/0",
    useCases: ["Appointment reminders", "Lab result links", "Refill reminders", "Multilingual patient Q&A"],
  },
  {
    slug: "education",
    name: "Education & EdTech",
    headline: "Keep students, parents, and staff in sync",
    summary:
      "Fee reminders, exam schedules, result drops, and parent-teacher threads — in the language each family reads at home.",
    icon: GraduationCap,
    accent: "from-amber-500/20 to-amber-500/0",
    useCases: ["Fee reminders", "Exam schedules", "Parent updates", "Admission flows"],
  },
  {
    slug: "logistics",
    name: "Logistics & Delivery",
    headline: "Messaging built for the pace of last-mile",
    summary:
      "Dispatch alerts, priority delivery OTPs, live tracking links, and two-way WhatsApp flows for drivers in every Indian language.",
    icon: Truck,
    accent: "from-indigo-500/20 to-indigo-500/0",
    useCases: ["Dispatch alerts", "Delivery OTPs", "Live tracking links", "Driver WhatsApp flows"],
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    headline: "Close more deals with timely, personal messaging",
    summary:
      "Targeted listing alerts, open-house invites, AI qualification on WhatsApp, and 30/60/90-day nurture flows that warm leads back up.",
    icon: Building2,
    accent: "from-teal-500/20 to-teal-500/0",
    useCases: ["Listing alerts", "Open-house invites", "AI qualification", "Nurture flows"],
  },
  {
    slug: "retail",
    name: "Retail & Hospitality",
    headline: "Keep customers and guests coming back",
    summary:
      "Loyalty updates, reservation confirmations and reminders, flash sales, and post-visit feedback on the channel each guest prefers.",
    icon: Hotel,
    accent: "from-fuchsia-500/20 to-fuchsia-500/0",
    useCases: ["Loyalty updates", "Reservation reminders", "Flash sales", "Post-visit feedback"],
  },
]

export default function SolutionsHubPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Solutions", path: "/solutions" },
        ]}
      />      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-[oklch(0.13_0.02_230)] text-white">
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.68_0.16_165/0.2),transparent_55%)]"
          />
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
          />
          <div className="relative mx-auto max-w-7xl px-4 pt-24 pb-20 sm:px-6 sm:pt-28 sm:pb-24 lg:pt-32">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-white/75">
                <ShieldCheck className="h-3.5 w-3.5 text-primary" aria-hidden />
                Industry playbooks
              </span>
              <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
                Built for India&apos;s growth industries.
              </h1>
              <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-white/70 sm:text-lg">
                One compliant platform — SMS, WhatsApp Business API, OTP, and AI agents. Seven industry playbooks, one
                wallet, zero monthly lock-in.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:brightness-110"
                >
                  Start Free — ₹60 Credit
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/10"
                >
                  See Pricing
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Grid of industries */}
        <Section tone="light">
          <SectionHeader
            eyebrow="Pick your industry"
            title="Compliant messaging for every part of Indian business."
            subtitle="Each playbook combines the right mix of SMS, WhatsApp, OTP, and AI agents — with the DLT and DPDPA nuances your industry actually has to meet."
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {INDUSTRIES.map((ind) => {
              const Icon = ind.icon
              return (
                <Link
                  key={ind.slug}
                  href={`/solutions/${ind.slug}`}
                  className="group relative isolate flex flex-col overflow-hidden rounded-2xl border border-border bg-background p-6 transition hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 sm:p-7"
                >
                  <span
                    aria-hidden
                    className={`absolute inset-x-0 top-0 h-28 -z-10 bg-gradient-to-b ${ind.accent}`}
                  />
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15 transition group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <h3 className="text-lg font-semibold text-foreground">{ind.name}</h3>
                  </div>
                  <p className="mt-4 text-sm font-medium leading-snug text-foreground/90 sm:text-[15px]">
                    {ind.headline}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{ind.summary}</p>
                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {ind.useCases.map((u) => (
                      <li
                        key={u}
                        className="inline-flex rounded-full border border-border bg-muted/40 px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
                      >
                        {u}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    Explore {ind.name.split(" ")[0]} playbook
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              )
            })}
          </div>
        </Section>

        {/* Not listed? band */}
        <Section tone="muted">
          <div className="flex flex-col items-start gap-6 rounded-2xl border border-border bg-background p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <div className="max-w-2xl">
              <h3 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                Not seeing your industry?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                The same building blocks — DLT-compliant SMS, WhatsApp Business API, OTP routes, and AI WhatsApp agents
                — power any customer-messaging workflow. Tell us what you&apos;re trying to do and we&apos;ll show you
                the fastest path.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/company/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-foreground px-5 py-3 text-sm font-semibold text-background transition hover:opacity-90"
              >
                Talk to sales
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-muted"
              >
                Browse products
              </Link>
            </div>
          </div>
        </Section>

        <FinalCta />
      </main>

      <SiteFooter />
    </div>
  )
}
