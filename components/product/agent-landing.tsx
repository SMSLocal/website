import type { ReactNode } from "react"
import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"
import { AnnouncementStrip } from "@/components/landing/announcement-strip"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { FaqSection } from "@/components/landing/faq-section"
import {
  CapabilityGrid,
  CompareTable,
  ProductFinalCta,
  ProductHero,
  Section,
  SectionHeader,
  type Capability,
  type CompareRow,
  type FaqItem,
} from "@/components/product/product-page"

export type AgentLandingData = {
  eyebrow: string
  title: ReactNode
  subtitle: string
  trustLine: string
  /** Hero illustration, distinct per use case. */
  visual: ReactNode
  primaryCta: { label: string; href: string }
  secondaryCta: { label: string; href: string }
  /** Four short outcome phrases for the results strip. */
  results: string[]
  problem: { title: string; body: string }
  /** "What it does" / "How it works" — section heading + 4 capability cards. */
  doesTitle: string
  features: Capability[]
  /** "Why it works" — heading + three supporting outcome cards. */
  whyItWorks: { title: string; points: { label: string; body: string }[] }
  compare: {
    title: string
    subtitle?: string
    columns: string[]
    rows: CompareRow[]
    footnote?: string
  }
  whyUs: { title: string; body: string }
  faq: FaqItem[]
  finalCta: { title: string; subtitle: string }
  /** Internal links rendered as a "Keep exploring" row. */
  related: { label: string; href: string }[]
}

export function AgentLanding({ data }: { data: AgentLandingData }) {
  return (
    <>
      <AnnouncementStrip />
      <SiteHeader />
      <main>
        <ProductHero
          compact
          eyebrow={data.eyebrow}
          title={data.title}
          subtitle={data.subtitle}
          primaryCta={data.primaryCta}
          secondaryCta={data.secondaryCta}
          trustBar={data.results.map((label) => ({ icon: Check, label }))}
          visual={data.visual}
        />

        {/* Results strip */}
        <div className="border-b border-border bg-muted/40">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-4 py-8 sm:px-6 lg:grid-cols-4">
            {data.results.map((r) => (
              <div key={r} className="flex items-start gap-2.5 px-2">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                <span className="text-[13.5px] font-medium leading-snug text-foreground">{r}</span>
              </div>
            ))}
          </div>
        </div>

        {/* The problem */}
        <Section>
          <div className="mx-auto max-w-3xl">
            <SectionHeader eyebrow="The problem" title={data.problem.title} />
            <p className="mt-5 text-[16px] leading-relaxed text-muted-foreground sm:text-[17px]">
              {data.problem.body}
            </p>
            <p className="mt-3 text-[13px] font-medium text-primary">{data.trustLine}</p>
          </div>
        </Section>

        {/* What it does */}
        <CapabilityGrid eyebrow="What it does" title={data.doesTitle} items={data.features} />

        {/* Why it works — same Section wrapper as every other section */}
        <Section tone="dark">
          <SectionHeader eyebrow="Why it works" title={data.whyItWorks.title} dark />
          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            {data.whyItWorks.points.map((p) => (
              <div
                key={p.label}
                className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur transition hover:border-primary/30"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <Check className="h-5 w-5" strokeWidth={3} />
                </span>
                <p className="mt-4 text-[12px] font-semibold uppercase tracking-[0.15em] text-white/50">
                  {p.label}
                </p>
                <p className="mt-2 text-[14.5px] leading-relaxed text-white/85">{p.body}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Competitor comparison */}
        <CompareTable
          eyebrow="Compared"
          title={data.compare.title}
          subtitle={data.compare.subtitle}
          columns={data.compare.columns}
          rows={data.compare.rows}
          footnote={data.compare.footnote}
        />

        {/* Why SMSLocal */}
        <Section tone="muted">
          <div className="mx-auto max-w-3xl">
            <SectionHeader eyebrow="Why SMSLocal" title={data.whyUs.title} />
            <p className="mt-5 text-[16px] leading-relaxed text-muted-foreground sm:text-[17px]">
              {data.whyUs.body}
            </p>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2">
              {data.related.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="group inline-flex items-center gap-1.5 text-[14px] font-semibold text-primary hover:underline"
                >
                  {l.label}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
          </div>
        </Section>

        {/* FAQ — single-column accordion */}
        <FaqSection items={data.faq} />

        <ProductFinalCta
          title={data.finalCta.title}
          subtitle={data.finalCta.subtitle}
          primaryCta={data.primaryCta}
          secondaryCta={{ label: "Talk to sales", href: "/company/contact/" }}
        />
      </main>
      <SiteFooter />
    </>
  )
}
