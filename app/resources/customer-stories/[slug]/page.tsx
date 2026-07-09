import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Building2, Calendar, MapPin, Quote } from "lucide-react"
import { AnnouncementStrip } from "@/components/landing/announcement-strip"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { ProductFinalCta } from "@/components/product/product-page"
import { BreadcrumbJsonLd } from "@/components/seo/json-ld"
import { StoryCard } from "@/components/customer-stories/story-card"
import {
  ALL_STORIES,
  formatStoryDate,
  getOtherStories,
  getStory,
} from "@/lib/customer-stories"
import { buildArticleMetadata } from "@/lib/seo"

export function generateStaticParams() {
  return ALL_STORIES.map((s) => ({ slug: s.slug }))
}

// ─── SEO — lib/seo/README.md ─────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const story = getStory(slug)
  if (!story) {
    return {
      title: "Customer story not found",
      robots: { index: false, follow: false },
    }
  }
  return buildArticleMetadata({
    title: `${story.company} customer story`,
    description: story.summary,
    path: `/resources/customer-stories/${story.slug}`,
    publishedTime: story.publishedAt,
    keywords: [
      `${story.company} case study`,
      `${story.industry} SMS case study`,
      ...story.products.map((p) => `${p} case study`),
      "SMSLocal customer story",
    ],
  })
}

export default async function CustomerStoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const story = getStory(slug)
  if (!story) notFound()

  const otherStories = getOtherStories(story.slug).slice(0, 2)

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <AnnouncementStrip />
      <SiteHeader />

      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Resources", path: "/resources/" },
          { name: "Customer stories", path: "/resources/customer-stories" },
          {
            name: story.company,
            path: `/resources/customer-stories/${story.slug}`,
          },
        ]}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: story.title,
            description: story.summary,
            datePublished: story.publishedAt,
            author: { "@type": "Organization", name: "SMSLocal" },
            publisher: { "@type": "Organization", name: "SMSLocal" },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://www.smslocal.in/resources/customer-stories/${story.slug}`,
            },
          }),
        }}
      />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative isolate overflow-hidden border-b border-white/10 bg-[oklch(0.14_0.02_230)] text-white">
          <div
            aria-hidden
            className="absolute inset-0 opacity-80"
            style={{
              background:
                "radial-gradient(55% 45% at 82% 20%, color-mix(in oklch, var(--primary) 25%, transparent), transparent 60%), radial-gradient(50% 40% at 10% 100%, color-mix(in oklch, oklch(0.55 0.15 195) 30%, transparent), transparent 65%)",
            }}
          />
          <div className="bg-grid-ink absolute inset-0 opacity-[0.18]" aria-hidden />

          <div className="relative mx-auto w-full max-w-5xl px-6 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-24">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-1.5 text-[12px] text-white/55"
            >
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <span aria-hidden>/</span>
              <Link href="/resources/customer-stories/" className="hover:text-white">
                Customer stories
              </Link>
              <span aria-hidden>/</span>
              <span className="truncate text-white/80">{story.company}</span>
            </nav>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/85 backdrop-blur-md">
                {story.industry}
              </span>
              {story.products.map((p) => (
                <span
                  key={p}
                  className="inline-flex items-center rounded-full border border-primary/40 bg-primary/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/90 backdrop-blur-md"
                >
                  {p}
                </span>
              ))}
            </div>

            <p className="mt-6 text-[13px] font-semibold uppercase tracking-[0.2em] text-white/60">
              {story.company}
            </p>
            <h1 className="mt-2 text-pretty text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-[44px] md:leading-[1.1]">
              {story.title}
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-[17px] leading-relaxed text-white/75">
              {story.summary}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-[13px] text-white/70">
              <span className="inline-flex items-center gap-1.5">
                <Building2 className="h-3.5 w-3.5" aria-hidden />
                {story.companyDescription}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" aria-hidden />
                {story.location}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" aria-hidden />
                <time dateTime={story.publishedAt}>
                  {formatStoryDate(story.publishedAt)}
                </time>
              </span>
            </div>
          </div>
        </section>

        {/* Cover image */}
        <section className="border-b border-border bg-muted/40">
          <div className="mx-auto w-full max-w-5xl px-6 py-10 sm:px-8 sm:py-12">
            <figure className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border bg-muted shadow-sm">
              <Image
                src={story.coverImage}
                alt={story.coverAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 960px"
                className="object-cover"
              />
            </figure>
          </div>
        </section>

        {/* Metric strip */}
        <section className="border-b border-border bg-background">
          <div className="mx-auto w-full max-w-5xl px-6 py-12 sm:px-8 sm:py-14">
            <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              The numbers
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {story.metrics.map((m) => (
                <div
                  key={m.label}
                  className="flex flex-col gap-2 rounded-2xl border border-border bg-card p-5"
                >
                  <p className="text-[12.5px] font-medium leading-snug text-muted-foreground">
                    {m.label}
                  </p>
                  <div className="flex items-baseline gap-2">
                    {m.before ? (
                      <span className="text-[13px] font-medium text-muted-foreground/70 line-through">
                        {m.before}
                      </span>
                    ) : null}
                    <span className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                      {m.after}
                    </span>
                  </div>
                  {m.note ? (
                    <p className="text-[12px] leading-relaxed text-muted-foreground">
                      {m.note}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pull quote */}
        <section className="border-b border-border bg-muted/40">
          <div className="mx-auto w-full max-w-5xl px-6 py-14 sm:px-8 sm:py-20">
            <figure className="flex flex-col gap-8 sm:flex-row sm:items-center sm:gap-10">
              {story.quote.portrait ? (
                <div className="relative aspect-square w-28 shrink-0 overflow-hidden rounded-2xl border border-border bg-muted shadow-sm sm:w-36">
                  <Image
                    src={story.quote.portrait}
                    alt={story.quote.portraitAlt ?? story.quote.name}
                    fill
                    sizes="(max-width: 640px) 112px, 144px"
                    className="object-cover"
                  />
                </div>
              ) : null}
              <div className="min-w-0 flex-1">
                <Quote
                  className="h-6 w-6 text-primary/60"
                  aria-hidden
                />
                <blockquote className="mt-3 text-pretty text-xl font-medium leading-relaxed tracking-tight text-foreground sm:text-2xl">
                  “{story.quote.text}”
                </blockquote>
                <figcaption className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13.5px]">
                  <span className="font-semibold text-foreground">
                    {story.quote.name}
                  </span>
                  <span aria-hidden className="text-border">
                    ·
                  </span>
                  <span className="text-muted-foreground">{story.quote.role}</span>
                </figcaption>
              </div>
            </figure>
          </div>
        </section>

        {/* Body */}
        <section className="mx-auto w-full max-w-3xl px-6 py-14 sm:px-8 sm:py-20">
          <article className="flex flex-col gap-12">
            {story.sections.map((section) => (
              <div key={section.heading} className="flex flex-col gap-5">
                <h2 className="text-pretty text-2xl font-semibold tracking-tight text-foreground sm:text-[28px]">
                  {section.heading}
                </h2>
                {section.body.map((paragraph, i) => (
                  <p
                    key={i}
                    className="text-pretty text-[16.5px] leading-relaxed text-foreground/85"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </article>

          <div className="mt-14 flex flex-wrap items-center gap-2">
            {story.tags.map((t) => (
              <span
                key={t}
                className="inline-flex items-center rounded-full border border-border bg-muted/60 px-3 py-1 text-[12px] font-medium text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-10">
            <Link
              href="/resources/customer-stories/"
              className="inline-flex items-center gap-2 text-[13.5px] font-semibold text-primary hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              All customer stories
            </Link>
          </div>
        </section>

        {/* More stories */}
        {otherStories.length > 0 ? (
          <section className="border-t border-border bg-muted/30">
            <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
              <h2 className="text-[13px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                More customer stories
              </h2>
              <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                {otherStories.map((s) => (
                  <StoryCard key={s.slug} story={s} />
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <ProductFinalCta
          title="Ship messaging like this team did."
          subtitle="Start with ₹60 free credit, send your first DLT-compliant SMS today, and keep the test balance forever."
          primaryCta={{ label: "Create free account", href: "/signup/" }}
          secondaryCta={{ label: "Talk to sales", href: "/company/contact/" }}
        />
      </main>

      <SiteFooter />
    </div>
  )
}
