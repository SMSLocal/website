import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar, Clock, User } from "lucide-react"
import { AnnouncementStrip } from "@/components/landing/announcement-strip"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { ProductFinalCta } from "@/components/product/product-page"
import { BreadcrumbJsonLd } from "@/components/seo/json-ld"
import { BlogCard } from "@/components/blog/blog-card"
import { BlogToc } from "@/components/blog/blog-toc"
import { ALL_POSTS, formatBlogDate, getPost, getRelatedPosts } from "@/lib/blog"
import { buildArticleMetadata } from "@/lib/seo"
import { SITE } from "@/lib/seo/config"

export function generateStaticParams() {
  return ALL_POSTS.map((p) => ({ slug: p.meta.slug }))
}

// ─── SEO — lib/seo/README.md ─────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()
  const { meta } = post
  return buildArticleMetadata({
    title: meta.title,
    description: meta.description,
    path: `/blog/${meta.slug}/`,
    publishedTime: meta.date,
    modifiedTime: meta.updatedDate ?? meta.date,
    authors: [meta.author.name],
    keywords: [
      meta.category,
      `${meta.category} guide India`,
      "SMSLocal blog",
    ],
    ...(meta.coverImage ? { ogImage: meta.coverImage, ogImageAlt: meta.coverAlt } : {}),
  })
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const { meta, Component } = post
  const related = getRelatedPosts(meta.relatedSlugs)

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <AnnouncementStrip />
      <SiteHeader />

      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog/" },
          { name: meta.title, path: `/blog/${meta.slug}/` },
        ]}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "@id": `${SITE.url}/blog/${meta.slug}/#article`,
            headline: meta.title,
            description: meta.description,
            image: meta.coverImage
              ? [`${SITE.url}${meta.coverImage}`]
              : [`${SITE.url}/og-default.png`],
            datePublished: meta.date,
            dateModified: meta.updatedDate ?? meta.date,
            inLanguage: "en-IN",
            author: {
              "@type": "Organization",
              name: meta.author.name,
              "@id": `${SITE.url}/#organization`,
            },
            publisher: {
              "@id": `${SITE.url}/#organization`,
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `${SITE.url}/blog/${meta.slug}/`,
            },
          }),
        }}
      />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative isolate overflow-hidden border-b border-white/10 bg-[oklch(0.14_0.02_230)] text-white">
          <div
            className="absolute inset-0 opacity-80"
            aria-hidden
            style={{
              background:
                "radial-gradient(55% 45% at 82% 20%, color-mix(in oklch, var(--primary) 25%, transparent), transparent 60%), radial-gradient(50% 40% at 10% 100%, color-mix(in oklch, oklch(0.55 0.15 195) 30%, transparent), transparent 65%)",
            }}
          />
          <div className="bg-grid-ink absolute inset-0 opacity-[0.18]" aria-hidden />

          <div className="relative mx-auto w-full max-w-4xl px-6 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-24">
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[12px] text-white/55">
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <span aria-hidden>/</span>
              <Link href="/blog/" className="hover:text-white">
                Blog
              </Link>
              <span aria-hidden>/</span>
              <span className="truncate text-white/80">{meta.category}</span>
            </nav>

            <div className="mt-6">
              <span className="inline-flex items-center rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/85 backdrop-blur-md">
                {meta.category}
              </span>
            </div>

            <h1 className="mt-5 text-pretty text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-[44px] md:leading-[1.1]">
              {meta.title}
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-[17px] leading-relaxed text-white/75">
              {meta.description}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-[13px] text-white/70">
              <span className="inline-flex items-center gap-1.5">
                <User className="h-3.5 w-3.5" />
                <span className="text-white/90">{meta.author.name}</span>
                <span className="text-white/55">· {meta.author.role}</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                <time dateTime={meta.date}>{formatBlogDate(meta.date)}</time>
                {meta.updatedDate && meta.updatedDate !== meta.date ? (
                  <span className="text-white/55">
                    · updated {formatBlogDate(meta.updatedDate)}
                  </span>
                ) : null}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {meta.readingTime}
              </span>
            </div>
          </div>
        </section>

        {/* Hero image — appears between the dark hero and the article body
            when the post has a real cover. For posts still using the
            gradient fallback, we skip the band entirely so the layout
            stays tight. */}
        {meta.coverImage ? (
          <section className="border-b border-border bg-muted/40">
            <div className="mx-auto w-full max-w-5xl px-6 py-10 sm:px-8 sm:py-12">
              <figure className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border bg-muted shadow-sm">
                <Image
                  src={meta.coverImage}
                  alt={meta.coverAlt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 960px"
                  className="object-cover"
                />
              </figure>
            </div>
          </section>
        ) : null}

        {/* Article body + TOC */}
        <section className="mx-auto w-full max-w-6xl px-6 py-14 sm:px-8 sm:py-20">
          <div className="flex gap-12">
            <article className="min-w-0 flex-1 max-w-3xl">
              <Component />

              {/* Author card */}
              <aside className="mt-16 flex items-start gap-4 rounded-2xl border border-border bg-card p-6">
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-[15px] font-semibold text-white"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--primary), oklch(0.55 0.15 195))",
                  }}
                  aria-hidden
                >
                  {meta.author.name
                    .split(" ")
                    .map((w) => w[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div className="flex-1">
                  <p className="text-[14.5px] font-semibold tracking-tight text-foreground">
                    {meta.author.name}
                  </p>
                  <p className="text-[13px] text-muted-foreground">{meta.author.role}</p>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-muted-foreground">
                    The SMSLocal team writes about messaging, compliance, and the day-to-day of
                    running communications infrastructure for Indian businesses.
                  </p>
                </div>
              </aside>

              <div className="mt-10">
                <Link
                  href="/blog/"
                  className="inline-flex items-center gap-2 text-[13.5px] font-semibold text-primary hover:underline"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to blog
                </Link>
              </div>
            </article>

            <BlogToc items={meta.toc} />
          </div>
        </section>

        {/* Related posts */}
        {related.length > 0 ? (
          <section className="border-t border-border bg-muted/30">
            <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
              <h2 className="text-[13px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Related reading
              </h2>
              <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {related.map((post) => (
                  <BlogCard key={post.meta.slug} meta={post.meta} />
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <ProductFinalCta
          title="₹60 free credit. No credit card."
          subtitle="Open a live account, send your first DLT-compliant SMS, and keep the test balance forever."
          primaryCta={{ label: "Create free account", href: "/signup/" }}
          secondaryCta={{ label: "Read the docs", href: "/developers/api-docs/" }}
        />
      </main>

      <SiteFooter />
    </div>
  )
}
