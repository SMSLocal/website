import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, ArrowUpRight, ChevronRight, Clock, LifeBuoy } from "lucide-react"
import { AnnouncementStrip } from "@/components/landing/announcement-strip"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { BreadcrumbJsonLd } from "@/components/seo/json-ld"
import { ProductFinalCta, Section, SectionHeader } from "@/components/product/product-page"
import { HELP_CATEGORIES, getCategory } from "@/lib/help-center"
import { buildMetadata } from "@/lib/seo"

type Params = { category: string }

export function generateStaticParams(): Params[] {
  return HELP_CATEGORIES.map((c) => ({ category: c.slug }))
}

// ─── SEO — lib/seo/README.md ─────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { category } = await params
  const cat = getCategory(category)
  if (!cat) {
    return {
      title: "Help Centre category not found",
      robots: { index: false, follow: false },
    }
  }
  return buildMetadata({
    title: `${cat.title} — Help Centre`,
    description: cat.description,
    path: `/resources/help/${cat.slug}`,
    keywords: [
      `${cat.title} help`,
      `${cat.title} guide India`,
      "SMSLocal help centre",
      "messaging platform help",
    ],
  })
}

export default async function HelpCategoryPage({
  params,
}: {
  params: Promise<Params>
}) {
  const { category } = await params
  const cat = getCategory(category)
  if (!cat) notFound()

  const Icon = cat.icon
  const otherCategories = HELP_CATEGORIES.filter((c) => c.slug !== cat.slug).slice(0, 4)

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Help Centre", path: "/resources/help" },
          { name: cat.title, path: `/resources/help/${cat.slug}` },
        ]}
      />
      <AnnouncementStrip />
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-foreground/5 bg-gradient-to-b from-[#061b17] via-[#051a15] to-[#031411] py-16 text-white sm:py-20">
          <div
            aria-hidden
            className="absolute inset-0 opacity-25 [background-image:linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]"
          />
          <div
            aria-hidden
            className="absolute -top-24 left-1/2 h-[360px] w-[720px] -translate-x-1/2 rounded-full bg-gradient-to-br from-primary/25 via-primary/8 to-transparent blur-3xl"
          />

          <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
            {/* Breadcrumbs */}
            <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-xs text-white/55">
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/resources/help/" className="hover:text-white">
                Help Centre
              </Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white/85">{cat.title}</span>
            </nav>

            <div className="flex items-start gap-5">
              <div className="flex h-14 w-14 flex-none items-center justify-center rounded-2xl border border-white/15 bg-white/[0.08] text-primary shadow-lg">
                <Icon className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-[11px] font-medium uppercase tracking-widest text-white/70">
                  <LifeBuoy className="h-3 w-3 text-primary" />
                  Help Centre
                </div>
                <h1 className="mt-4 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
                  {cat.title}
                </h1>
                <p className="mt-3 max-w-2xl text-pretty text-base text-white/70">
                  {cat.description}
                </p>
                <p className="mt-4 text-[11px] font-medium uppercase tracking-widest text-white/50">
                  {cat.articles.length} {cat.articles.length === 1 ? "article" : "articles"}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Articles list */}
        <Section>
          <div className="mx-auto max-w-4xl">
            <ul className="divide-y divide-foreground/10 overflow-hidden rounded-2xl border border-foreground/10 bg-background">
              {cat.articles.map((article) => (
                <li key={article.slug}>
                  <Link
                    href={`/resources/help/${cat.slug}/${article.slug}`}
                    className="group flex items-start gap-4 px-5 py-5 transition hover:bg-muted/50 sm:px-6 sm:py-6"
                  >
                    <div className="flex-1 min-w-0">
                      <h3 className="flex items-center gap-1.5 text-base font-semibold tracking-tight text-foreground sm:text-lg">
                        <span className="truncate">{article.title}</span>
                        <ArrowUpRight className="h-4 w-4 flex-none text-muted-foreground transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                        {article.excerpt}
                      </p>
                      <div className="mt-3 flex flex-wrap items-center gap-3 text-[11px] font-medium text-muted-foreground">
                        <span className="inline-flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {article.readMinutes} min read
                        </span>
                        <span aria-hidden>·</span>
                        <span>Updated {formatDate(article.updatedOn)}</span>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Section>

        {/* Other categories */}
        <section className="border-t border-foreground/5 bg-muted/30 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <SectionHeader
              eyebrow="Keep exploring"
              title="Other help categories"
              subtitle="Browse the rest of the help centre."
            />
            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {otherCategories.map((c) => {
                const CIcon = c.icon
                return (
                  <Link
                    key={c.slug}
                    href={`/resources/help/${c.slug}`}
                    className="group rounded-2xl border border-foreground/10 bg-background p-5 transition hover:border-primary/40 hover:shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15">
                        <CIcon className="h-5 w-5" />
                      </div>
                      <span className="text-[11px] font-medium text-muted-foreground">
                        {c.articles.length} articles
                      </span>
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
          title="Still stuck?"
          subtitle="Our support team responds within 15 minutes during Indian business hours, seven days a week."
          primaryCta={{ label: "Contact support", href: "/company/contact/" }}
          secondaryCta={{ label: "All help topics", href: "/resources/help/" }}
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
