import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  BookOpenCheck,
  Briefcase,
  Bug,
  Building2,
  Code2,
  Compass,
  Gauge,
  Globe2,
  Handshake,
  HeartHandshake,
  IndianRupee,
  Laptop,
  LifeBuoy,
  Mail,
  MessageSquare,
  PenTool,
  Puzzle,
  ScrollText,
  ShieldCheck,
  Sparkles,
  Sprout,
  Terminal,
  TrendingUp,
  Users,
} from "lucide-react"
import { AnnouncementStrip } from "@/components/landing/announcement-strip"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { RelatedContent } from "@/components/shared/related-content"
import {
  ProductFinalCta,
  Section,
  SectionHeader,
} from "@/components/product/product-page"
import { BreadcrumbJsonLd } from "@/components/seo/json-ld"
import { getPageMetadata } from "@/lib/seo"

// ─── SEO — edit lib/seo/registry.ts or open /dev/seo to preview ──────────────
export const metadata: Metadata = getPageMetadata("/company/careers")

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const WHY_SMSLOCAL = [
  {
    icon: Sparkles,
    title: "Ship work that actually lands",
    description:
      "Every feature you build moves a real metric at a real business. OTP delivery that unblocks a fintech sign-up. A DLT template that lets an e-commerce brand launch a campaign. No research-ware, no dashboards nobody opens.",
  },
  {
    icon: Users,
    title: "A small, opinionated team",
    description:
      "You'll work directly with people who've been writing routing logic, carrier integrations, and compliance workflows for years. No eight-layer approval chains. If you have an idea, you can ship it by Friday.",
  },
  {
    icon: Globe2,
    title: "India-first, not India-later",
    description:
      "Most global CPaaS teams treat India as a rounding-error market. We treat it as the whole market. DLT, DND, regional-language scripts, INR billing, IST support hours — it's all first-class.",
  },
  {
    icon: Laptop,
    title: "Remote-first, Bengaluru optional",
    description:
      "We're a distributed team with an optional hub in Bengaluru. You choose your setup. Expect async-first documentation, weekly demos, and real focus time — not meetings-all-day theatre.",
  },
]

/**
 * Role areas — what we hire across.
 *
 * We deliberately don't list specific job titles here. Role requirements
 * change faster than a marketing site can, and listing "Senior Backend
 * Engineer" when the spec shifted a month ago is worse than listing
 * nothing. Instead we list the *areas* we hire across with an honest
 * status:
 *
 *   - "Evergreen pipeline" — we're always reading applications here
 *     and will schedule a first conversation within two weeks when
 *     the fit looks right.
 *   - "Not currently hiring" — pipeline is closed; we'll still keep
 *     your note on file.
 *
 * If a specific opening becomes live, we flip the relevant area to a
 * direct job-post link without having to redesign the page.
 */
const ROLE_AREAS: Array<{
  icon: typeof Terminal
  title: string
  scope: string
  stack: string
  status: "evergreen" | "closed"
}> = [
  {
    icon: Terminal,
    title: "Backend engineering",
    scope:
      "Messaging routing, carrier integrations, queueing, idempotent delivery, DLR pipelines, rate-limit-aware schedulers.",
    stack: "Go, Node.js, PostgreSQL, Redis, Kafka",
    status: "evergreen",
  },
  {
    icon: Code2,
    title: "Frontend engineering",
    scope:
      "Customer dashboards, campaign builders, WhatsApp inbox, real-time delivery streams, accessible form-heavy UI.",
    stack: "Next.js, React, TypeScript, Tailwind",
    status: "evergreen",
  },
  {
    icon: Gauge,
    title: "SRE & platform",
    scope:
      "Sub-second delivery budgets, multi-carrier failover, production observability, on-call for messaging workloads.",
    stack: "Kubernetes, Prometheus, Grafana, Linux",
    status: "evergreen",
  },
  {
    icon: ShieldCheck,
    title: "Carrier & regulatory operations",
    scope:
      "TRAI / DLT workflows, header and template governance, DND scrubs, operator escalations, carrier SLA tracking.",
    stack: "Compliance tooling, operator portals, SQL",
    status: "evergreen",
  },
  {
    icon: Puzzle,
    title: "Customer engineering",
    scope:
      "Embedding SMSLocal into customer stacks, debugging integration issues, writing reference code and SDK examples.",
    stack: "Any 2 of: Node, Python, PHP, Java, Go",
    status: "evergreen",
  },
  {
    icon: TrendingUp,
    title: "Go-to-market",
    scope:
      "Mid-market and enterprise sales in India, partnerships with ISVs and agencies, RFP responses, field enablement.",
    stack: "CRM discipline, technical fluency, field experience",
    status: "evergreen",
  },
  {
    icon: LifeBuoy,
    title: "Support engineering",
    scope:
      "L1/L2 support during Indian business hours, deep diagnostics of delivery failures, customer-facing post-mortems.",
    stack: "SQL, log tools, clear written English and Hindi",
    status: "evergreen",
  },
  {
    icon: PenTool,
    title: "Product design",
    scope:
      "Campaign UX, inbox and composer flows, onboarding for non-technical operators, accessible dashboards.",
    stack: "Figma, interaction prototyping, design systems",
    status: "evergreen",
  },
]

const WORK_PRINCIPLES = [
  {
    icon: ScrollText,
    title: "Async-first documentation",
    description:
      "Decisions live in writing. Any teammate in any timezone should be able to catch up without a meeting.",
  },
  {
    icon: Compass,
    title: "Ship weekly, reflect quarterly",
    description:
      "Small, frequent releases over big-bang launches. Every quarter we review what worked, what didn't, and what we cut.",
  },
  {
    icon: Bug,
    title: "We debug in public",
    description:
      "When something breaks, the team writes a real post-mortem and shares the fix. No silent patches, no blame.",
  },
  {
    icon: Sprout,
    title: "Career growth, not title inflation",
    description:
      "Levelling is grounded in scope and impact, not title arbitrage. We tell you what the next step looks like, on purpose.",
  },
]

const BENEFITS = [
  {
    icon: IndianRupee,
    title: "Market-rate compensation",
    description:
      "Calibrated against India tech benchmarks with transparent ranges shared up front for every role.",
  },
  {
    icon: Briefcase,
    title: "Equity for full-time roles",
    description:
      "Every full-time employee gets a stake in the company, with a standard four-year vest.",
  },
  {
    icon: HeartHandshake,
    title: "Health & wellbeing",
    description:
      "Comprehensive health cover for you and immediate family, plus a monthly wellbeing stipend.",
  },
  {
    icon: Laptop,
    title: "Remote-work setup",
    description:
      "Laptop of your choice, an annual home-office budget, and a co-working allowance if you prefer working out.",
  },
  {
    icon: BookOpenCheck,
    title: "Learning budget",
    description:
      "An annual personal-development budget for books, courses, conferences, and the certifications your role needs.",
  },
  {
    icon: Building2,
    title: "Bengaluru hub, when you want",
    description:
      "Drop into our Bengaluru office whenever it suits you. Travel support for team weeks twice a year.",
  },
]

const HIRING_STEPS = [
  {
    step: "01",
    title: "Apply with a short note",
    description:
      "No generic cover letter. Tell us the area you want to join, link to one thing you're proud of, and say why SMSLocal. 15 minutes of your time.",
  },
  {
    step: "02",
    title: "First conversation (30 min)",
    description:
      "A hiring manager walks you through the role in detail and answers your questions. This is two-way — we want you to leave with enough information to decide.",
  },
  {
    step: "03",
    title: "Focused technical or craft round",
    description:
      "Scoped to the role. Engineers get a take-home or pair-programming session against a realistic scenario. GTM folks get a live scenario walk-through. No leetcode.",
  },
  {
    step: "04",
    title: "System or strategy deep-dive (60–90 min)",
    description:
      "A whiteboarding session with two teammates on a problem from our actual backlog. You'll see the kind of work you'd do on day one.",
  },
  {
    step: "05",
    title: "Reference calls and offer",
    description:
      "Two quick reference calls on our side, transparent offer with a compensation ladder, and a joining plan with 30/60/90-day expectations.",
  },
]

/* ------------------------------------------------------------------ */
/* Tiny presentational helpers                                         */
/* ------------------------------------------------------------------ */

function StatusChip({
  status,
}: {
  status: "evergreen" | "closed"
}) {
  if (status === "evergreen") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[10.5px] font-semibold uppercase tracking-wider text-primary">
        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-primary" />
        Evergreen pipeline
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-foreground/15 bg-muted px-2.5 py-0.5 text-[10.5px] font-semibold uppercase tracking-wider text-muted-foreground">
      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60" />
      Not currently hiring
    </span>
  )
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function CareersPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Company", path: "/company/about" },
          { name: "Careers", path: "/company/careers" },
        ]}
      />      <SiteHeader />

      <main className="flex-1">
        {/* Hero — dark gradient band, matching About */}
        <section className="relative overflow-hidden border-b border-foreground/5 bg-gradient-to-b from-[#061b17] via-[#061b17] to-[#031411] py-20 text-white sm:py-28">
          <div
            aria-hidden
            className="absolute inset-0 opacity-30 [background-image:linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]"
          />
          <div
            aria-hidden
            className="absolute -top-20 left-1/2 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-br from-primary/30 via-primary/10 to-transparent blur-3xl"
          />

          <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6">
            <nav
              className="mb-6 flex items-center justify-center gap-2 text-xs text-white/50"
              aria-label="Breadcrumb"
            >
              <Link href="/" className="hover:text-white/80">
                Home
              </Link>
              <span>/</span>
              <Link href="/company/about/" className="hover:text-white/80">
                Company
              </Link>
              <span>/</span>
              <span className="text-white/80">Careers</span>
            </nav>

            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-[11px] font-medium uppercase tracking-widest text-white/70">
              <Briefcase className="h-3 w-3 text-primary" />
              Join the team
            </div>

            <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Build messaging infrastructure{" "}
              <span className="bg-gradient-to-r from-primary via-primary to-[#25D366] bg-clip-text text-transparent">
                India actually relies on
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-base text-white/70 sm:text-lg">
              SMSLocal is a small, opinionated team shipping SMS, WhatsApp, OTP,
              and AI messaging for Indian business. If you care about carrier
              routing, regional languages, or infrastructure people actually
              depend on, we&apos;d like to hear from you.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="#open-areas"
                className="group inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-xl shadow-primary/25 transition hover:brightness-110"
              >
                See role areas
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="mailto:careers@smslocal.in?subject=Open%20application"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/10"
              >
                <Mail className="h-4 w-4" />
                Send an open application
              </Link>
            </div>

            <p className="mx-auto mt-6 max-w-xl text-[13px] leading-relaxed text-white/55">
              We hire when we find the right person, not on a calendar. Every
              application gets a response within two weeks, even if it&apos;s a
              pass.
            </p>
          </div>
        </section>

        {/* Why join */}
        <Section className="border-b border-foreground/5">
          <SectionHeader
            eyebrow="Why SMSLocal"
            title="Small team. Real infrastructure. India-first by design."
            subtitle="This isn't a pitch for another growth-stage SaaS. It's a description of the day-to-day you should expect if you join."
            center
          />
          <div className="mx-auto mt-12 grid max-w-6xl gap-4 sm:grid-cols-2">
            {WHY_SMSLOCAL.map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-4 rounded-2xl border border-foreground/10 bg-card p-6 shadow-sm"
              >
                <div className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                  <item.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Role areas */}
        <Section id="open-areas" className="bg-muted/30 border-b border-foreground/5">
          <SectionHeader
            eyebrow="Role areas"
            title="Where we hire."
            subtitle="We run evergreen pipelines across these areas — applications are reviewed as they arrive, and we open specific roles when the pipeline meets the need."
            center
          />

          <div className="mx-auto mt-12 grid max-w-6xl gap-4 md:grid-cols-2 lg:grid-cols-3">
            {ROLE_AREAS.map((area) => (
              <div
                key={area.title}
                className="group flex flex-col gap-4 rounded-2xl border border-foreground/10 bg-background p-6 shadow-sm transition hover:border-primary/30 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                    <area.icon className="h-5 w-5" />
                  </div>
                  <StatusChip status={area.status} />
                </div>
                <div>
                  <h3 className="text-base font-semibold">{area.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {area.scope}
                  </p>
                </div>
                <div className="mt-auto flex items-center gap-2 border-t border-foreground/5 pt-4 text-[12.5px] text-muted-foreground">
                  <span className="font-semibold uppercase tracking-wider text-foreground/70">
                    Typical stack
                  </span>
                  <span className="truncate">{area.stack}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-3 rounded-2xl border border-foreground/10 bg-background p-5 text-center shadow-sm">
            <p className="w-full text-sm text-muted-foreground sm:w-auto sm:flex-1 sm:text-left">
              Don&apos;t see your area? If you&apos;ve done something unusual we
              should know about, tell us anyway.
            </p>
            <Link
              href="mailto:careers@smslocal.in?subject=Open%20application"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition hover:brightness-110"
            >
              <Mail className="h-4 w-4" />
              careers@smslocal.in
            </Link>
          </div>
        </Section>

        {/* How we work */}
        <Section className="border-b border-foreground/5">
          <SectionHeader
            eyebrow="How we work"
            title="The defaults you can expect on your first week."
            subtitle="Culture is the sum of defaults. Here are ours."
            center
          />
          <div className="mx-auto mt-12 grid max-w-6xl gap-4 sm:grid-cols-2">
            {WORK_PRINCIPLES.map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-4 rounded-2xl border border-foreground/10 bg-card p-6 shadow-sm"
              >
                <div className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                  <item.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Benefits */}
        <Section className="bg-muted/30 border-b border-foreground/5">
          <SectionHeader
            eyebrow="What you get"
            title="A real job, with a real package."
            subtitle="Transparent compensation, market-rate benefits, and a setup that works whether you're in Bengaluru, Bhopal, or anywhere else."
            center
          />
          <div className="mx-auto mt-12 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((benefit) => (
              <div
                key={benefit.title}
                className="flex flex-col gap-3 rounded-2xl border border-foreground/10 bg-background p-6 shadow-sm"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <benefit.icon className="h-4 w-4" />
                </div>
                <h3 className="text-base font-semibold">{benefit.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* Hiring process */}
        <Section className="border-b border-foreground/5">
          <SectionHeader
            eyebrow="The process"
            title="Our hiring process, end-to-end."
            subtitle="Five steps, about two to three weeks from first note to offer, with clear feedback at every stage."
            center
          />
          <ol className="mx-auto mt-12 grid max-w-5xl gap-4 md:grid-cols-[1fr_1fr]">
            {HIRING_STEPS.map((step, i) => (
              <li
                key={step.step}
                className={`relative flex gap-5 rounded-2xl border border-foreground/10 bg-card p-6 shadow-sm ${
                  i === HIRING_STEPS.length - 1 && HIRING_STEPS.length % 2 === 1
                    ? "md:col-span-2"
                    : ""
                }`}
              >
                <div
                  aria-hidden
                  className="flex-none font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-primary/70"
                >
                  {step.step}
                </div>
                <div>
                  <h3 className="text-base font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        {/* Open-application band */}
        <Section>
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 rounded-3xl border border-foreground/10 bg-gradient-to-br from-primary/10 via-background to-background p-8 text-center sm:p-12">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15 text-primary ring-1 ring-primary/20">
              <Handshake className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-balance text-2xl font-bold tracking-tight sm:text-3xl">
                Don&apos;t see the right role? Send a note anyway.
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
                The strongest additions to our team usually arrive through open
                applications. Tell us what you&apos;d want to own, link to one
                thing you&apos;re proud of, and we&apos;ll take it from there.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="mailto:careers@smslocal.in?subject=Open%20application"
                className="group inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:brightness-110"
              >
                <Mail className="h-4 w-4" />
                careers@smslocal.in
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/company/about/"
                className="inline-flex items-center gap-2 rounded-lg border border-foreground/10 bg-card px-5 py-3 text-sm font-medium text-foreground transition hover:border-primary/30"
              >
                <MessageSquare className="h-4 w-4" />
                Read about SMSLocal
              </Link>
            </div>
          </div>
        </Section>

        <RelatedContent path="/company/careers" />

        <ProductFinalCta
          title="Ship with a team that sweats the details."
          subtitle="Applications are read by humans, not filters. Two-week response guarantee."
          primaryCta={{
            label: "Send your application",
            href: "mailto:careers@smslocal.in?subject=Open%20application",
          }}
          secondaryCta={{ label: "About SMSLocal", href: "/company/about/" }}
        />
      </main>

      <SiteFooter />
    </div>
  )
}
