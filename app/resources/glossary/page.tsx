import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, BookOpen, Sparkles } from "lucide-react"
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
import { GlossaryBrowser } from "@/components/glossary/glossary-browser"
import {
  FEATURED_TERM_SLUGS,
  GLOSSARY_CATEGORIES,
  GLOSSARY_TERMS,
  getTermBySlug,
} from "@/lib/glossary"
import { getPageMetadata } from "@/lib/seo"

// ─── SEO — edit lib/seo/registry.ts or open /dev/seo to preview ──────────────
export const metadata: Metadata = getPageMetadata("/resources/glossary")

const FEATURED_TERMS = FEATURED_TERM_SLUGS.map((slug) => getTermBySlug(slug)).filter(
  (t): t is NonNullable<ReturnType<typeof getTermBySlug>> => Boolean(t),
)

export default function GlossaryPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Resources", path: "/resources/help" },
          { name: "Messaging glossary", path: "/resources/glossary" },
        ]}
      />
      {/* DefinedTermSet JSON-LD */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "DefinedTermSet",
            "@id": "https://smslocal.in/resources/glossary",
            name: "SMSLocal Messaging Glossary",
            description:
              "Definitions for SMS, WhatsApp Business, OTP and DLT-compliance terms used across the Indian messaging ecosystem.",
            hasDefinedTerm: GLOSSARY_TERMS.map((t) => ({
              "@type": "DefinedTerm",
              "@id": `https://smslocal.in/resources/glossary#${t.slug}`,
              name: t.term,
              alternateName: t.abbr ? [t.abbr, ...(t.aliases ?? [])] : t.aliases,
              description: t.shortDef,
              inDefinedTermSet: "https://smslocal.in/resources/glossary",
            })),
          }),
        }}
      />      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-foreground/5 bg-gradient-to-b from-[#061b17] via-[#051a15] to-[#031411] py-20 text-white sm:py-24">
          <div
            aria-hidden
            className="absolute inset-0 opacity-30 [background-image:linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]"
          />
          <div
            aria-hidden
            className="absolute -top-24 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-gradient-to-br from-primary/25 via-primary/8 to-transparent blur-3xl"
          />

          <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-[11px] font-medium uppercase tracking-widest text-white/70">
              <BookOpen className="h-3 w-3 text-primary" />
              Glossary
            </div>
            <h1 className="mt-5 text-balance text-4xl font-bold tracking-tight sm:text-5xl">
              Every messaging term, defined.
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-base text-white/70">
              DLT, PE, BSP, conversation, template, DLR, scrubbing — the full vocabulary of Indian
              messaging, written in plain English for everyone on the team.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-[12px] text-white/60">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                {GLOSSARY_TERMS.length} terms
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                {GLOSSARY_CATEGORIES.length} categories
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                India-specific
              </span>
            </div>
          </div>
        </section>

        {/* Featured strip */}
        <section className="border-b border-foreground/5 bg-muted/30 py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="flex items-baseline justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary">
                  Most looked-up
                </p>
                <h2 className="mt-1 text-lg font-semibold tracking-tight">
                  Ten terms worth knowing cold.
                </h2>
              </div>
              <Link
                href="#all-terms"
                className="hidden items-center gap-1 text-[12px] font-medium text-primary hover:underline sm:inline-flex"
              >
                Browse all
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
              {FEATURED_TERMS.map((t) => (
                <Link
                  key={t.slug}
                  href={`#${t.slug}`}
                  className="group relative overflow-hidden rounded-xl border border-foreground/10 bg-background p-4 transition hover:border-primary/30 hover:shadow-sm"
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="text-sm font-semibold text-foreground">{t.term}</h3>
                    {t.abbr ? (
                      <span className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[9px] font-semibold text-muted-foreground">
                        {t.abbr}
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1.5 line-clamp-2 text-[12px] leading-relaxed text-muted-foreground">
                    {t.shortDef}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Category grid */}
        <Section className="border-b border-foreground/5">
          <SectionHeader
            eyebrow="Browse by category"
            title="Pick the area you're working in."
            subtitle="Each category is self-contained, but every term links to its neighbours."
            center
          />
          <div className="mx-auto mt-10 grid max-w-6xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {GLOSSARY_CATEGORIES.map((cat) => {
              const count = GLOSSARY_TERMS.filter((t) => t.category === cat.slug).length
              return (
                <Link
                  key={cat.slug}
                  href={`#all-terms`}
                  className="group relative overflow-hidden rounded-2xl border border-foreground/10 bg-background p-5 transition hover:border-primary/30 hover:shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary">
                      {cat.shortLabel}
                    </span>
                    <span className="text-[11px] font-medium text-muted-foreground">
                      {count} terms
                    </span>
                  </div>
                  <h3 className="mt-3 flex items-center gap-1.5 text-sm font-semibold">
                    {cat.title}
                    <ArrowRight className="h-3.5 w-3.5 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-primary" />
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                    {cat.description}
                  </p>
                </Link>
              )
            })}
          </div>
        </Section>

        {/* Full browser */}
        <section id="all-terms" className="scroll-mt-24 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mb-10 text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary">
                A – Z
              </p>
              <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
                The full glossary.
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
                Filter by category, search any word, or click a letter to jump. Every definition
                links to the related terms it depends on.
              </p>
            </div>

            <GlossaryBrowser />
          </div>
        </section>

        {/* Suggest a term CTA */}
        <section className="border-y border-foreground/5 bg-muted/30 py-12">
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-4 text-center sm:px-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-background px-3 py-1 text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
              <Sparkles className="h-3 w-3 text-primary" />
              Missing something?
            </div>
            <h2 className="text-balance text-2xl font-bold tracking-tight">
              Tell us which term we should add next.
            </h2>
            <p className="max-w-lg text-pretty text-sm leading-relaxed text-muted-foreground">
              Every definition on this page started as a question from a real customer. If
              there&apos;s a piece of vocabulary tripping up your team, write in and we&apos;ll
              add it within the week.
            </p>
            <Link
              href="/company/contact"
              className="group inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:brightness-110"
            >
              Suggest a term
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </section>

        <RelatedContent path="/resources/glossary" />

        <ProductFinalCta
          title="The vocabulary is only half the job."
          subtitle="The other half is software that actually does what the words say. Start with ₹60 of free credit and send your first message in minutes."
          primaryCta={{ label: "Start Free — ₹60 Credit", href: "/signup" }}
          secondaryCta={{ label: "Open the help centre", href: "/resources/help" }}
        />
      </main>

      <SiteFooter />
    </div>
  )
}
