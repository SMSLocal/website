import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, ChevronRight, Clock, LifeBuoy } from "lucide-react"
import { AnnouncementStrip } from "@/components/landing/announcement-strip"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { BreadcrumbJsonLd } from "@/components/seo/json-ld"
import { ProductFinalCta, Section } from "@/components/product/product-page"
import { HelpArticleBody } from "@/components/help/help-article-body"
import { HELP_CATEGORIES, getAllArticlePaths, getArticle } from "@/lib/help-center"
import { buildArticleMetadata } from "@/lib/seo"

type Params = { category: string; article: string }

export const dynamicParams = false

export function generateStaticParams(): Params[] {
  return getAllArticlePaths()
}

// ─── SEO — lib/seo/README.md ─────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { category, article } = await params
  const match = getArticle(category, article)
  if (!match) {
    return {
      title: "Help article not found",
      robots: { index: false, follow: false },
    }
  }
  const { article: art, category: cat } = match
  return buildArticleMetadata({
    title: `${art.title} — ${cat.title}`,
    description: art.excerpt,
    path: `/resources/help/${cat.slug}/${art.slug}`,
    publishedTime: art.updatedOn,
    modifiedTime: art.updatedOn,
    keywords: [
      `${art.title} guide`,
      `${cat.title} help`,
      "SMSLocal help article",
      "messaging platform how-to",
    ],
  })
}

export default async function HelpArticlePage({
  params,
}: {
  params: Promise<Params>
}) {
  const { category, article } = await params
  const match = getArticle(category, article)
  if (!match) notFound()

  const { category: cat, article: art } = match

  // Adjacent articles in the same category
  const idx = cat.articles.findIndex((a) => a.slug === art.slug)
  const prev = idx > 0 ? cat.articles[idx - 1] : null
  const next = idx < cat.articles.length - 1 ? cat.articles[idx + 1] : null

  // Four "see also" articles from the same category (excluding current)
  const seeAlso = cat.articles.filter((a) => a.slug !== art.slug).slice(0, 4)

  // Four other categories
  const otherCategories = HELP_CATEGORIES.filter((c) => c.slug !== cat.slug).slice(0, 4)

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Help Centre", path: "/resources/help" },
          { name: cat.title, path: `/resources/help/${cat.slug}` },
          { name: art.title, path: `/resources/help/${cat.slug}/${art.slug}` },
        ]}
      />
      <AnnouncementStrip />
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-foreground/5 bg-gradient-to-b from-[#061b17] via-[#051a15] to-[#031411] py-14 text-white sm:py-16">
          <div
            aria-hidden
            className="absolute inset-0 opacity-25 [background-image:linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]"
          />

          <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
            {/* Breadcrumbs */}
            <nav
              aria-label="Breadcrumb"
              className="mb-5 flex flex-wrap items-center gap-1.5 text-xs text-white/55"
            >
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/resources/help/" className="hover:text-white">
                Help Centre
              </Link>
              <ChevronRight className="h-3 w-3" />
              <Link href={`/resources/help/${cat.slug}`} className="hover:text-white">
                {cat.title}
              </Link>
              <ChevronRight className="h-3 w-3" />
              <span className="truncate text-white/85">{art.title}</span>
            </nav>

            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-[11px] font-medium uppercase tracking-widest text-white/70">
              <LifeBuoy className="h-3 w-3 text-primary" />
              {cat.title}
            </div>
            <h1 className="mt-4 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              {art.title}
            </h1>
            <p className="mt-3 text-pretty text-base leading-relaxed text-white/70">{art.excerpt}</p>
            <div className="mt-5 flex flex-wrap items-center gap-3 text-[11px] font-medium text-white/55">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3 w-3" />
                {art.readMinutes} min read
              </span>
              <span aria-hidden>·</span>
              <span>Updated {formatDate(art.updatedOn)}</span>
            </div>
          </div>
        </section>

        {/* Body */}
        <Section>
          <div className="mx-auto max-w-3xl">
            <HelpArticleBody blocks={art.body} />

            {/* Prev / next within category */}
            {(prev || next) && (
              <div className="mt-14 grid gap-3 border-t border-foreground/10 pt-8 sm:grid-cols-2">
                {prev ? (
                  <Link
                    href={`/resources/help/${cat.slug}/${prev.slug}`}
                    className="group rounded-2xl border border-foreground/10 bg-background p-5 transition hover:border-primary/40 hover:shadow-sm"
                  >
                    <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                      <ArrowLeft className="h-3 w-3" />
                      Previous
                    </span>
                    <p className="mt-2 text-sm font-semibold text-foreground group-hover:text-primary">
                      {prev.title}
                    </p>
                  </Link>
                ) : (
                  <div />
                )}
                {next ? (
                  <Link
                    href={`/resources/help/${cat.slug}/${next.slug}`}
                    className="group rounded-2xl border border-foreground/10 bg-background p-5 text-right transition hover:border-primary/40 hover:shadow-sm"
                  >
                    <span className="flex items-center justify-end gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                      Next
                      <ArrowRight className="h-3 w-3" />
                    </span>
                    <p className="mt-2 text-sm font-semibold text-foreground group-hover:text-primary">
                      {next.title}
                    </p>
                  </Link>
                ) : (
                  <div />
                )}
              </div>
            )}
          </div>
        </Section>

        {/* See also */}
        {seeAlso.length > 0 && (
          <section className="border-t border-foreground/5 bg-muted/30 py-14 sm:py-16">
            <div className="mx-auto max-w-4xl px-4 sm:px-6">
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                Related articles in {cat.title}
              </h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {seeAlso.map((a) => (
                  <li key={a.slug}>
                    <Link
                      href={`/resources/help/${cat.slug}/${a.slug}`}
                      className="group flex items-start gap-3 rounded-xl border border-foreground/10 bg-background px-4 py-3.5 transition hover:border-primary/40 hover:shadow-sm"
                    >
                      <span className="flex-1 text-sm font-medium leading-snug text-foreground/85 group-hover:text-foreground">
                        {a.title}
                      </span>
                      <ArrowRight className="mt-0.5 h-3.5 w-3.5 flex-none text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-primary" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Other categories */}
        <section className="border-t border-foreground/5 py-14 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="text-center text-xl font-semibold tracking-tight sm:text-2xl">
              Browse other help categories
            </h2>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {otherCategories.map((c) => {
                const CIcon = c.icon
                return (
                  <Link
                    key={c.slug}
                    href={`/resources/help/${c.slug}`}
                    className="group rounded-2xl border border-foreground/10 bg-background p-5 transition hover:border-primary/40 hover:shadow-sm"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15">
                      <CIcon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 flex items-center gap-1.5 text-sm font-semibold">
                      {c.title}
                      <ArrowRight className="h-3.5 w-3.5 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-primary" />
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                      {c.description}
                    </p>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        <ProductFinalCta
          title="Did this article help?"
          subtitle="If something isn't clear or the steps don't match what you're seeing, tell us and we'll fix the doc the same day."
          primaryCta={{ label: "Contact support", href: "/company/contact/" }}
          secondaryCta={{ label: "Back to help centre", href: "/resources/help/" }}
        />
      </main>

      <SiteFooter />
    </div>
  )
}

function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}
