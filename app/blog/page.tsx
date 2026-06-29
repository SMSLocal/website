import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Rss } from "lucide-react"
import { AnnouncementStrip } from "@/components/landing/announcement-strip"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { ProductFinalCta } from "@/components/product/product-page"
import { BreadcrumbJsonLd } from "@/components/seo/json-ld"
import { BlogCard } from "@/components/blog/blog-card"
import { ALL_POSTS, getAllCategories } from "@/lib/blog"
import { getPageMetadata } from "@/lib/seo"

// ─── SEO — edit lib/seo/registry.ts or open /dev/seo to preview ──────────────
export const metadata: Metadata = getPageMetadata("/blog")

export default function BlogIndexPage() {
  const [featured, ...rest] = ALL_POSTS
  const categories = getAllCategories()
  const postCount = ALL_POSTS.length

  return (
    <div className="flex min-h-screen flex-col bg-background">      <SiteHeader />

      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ]}
      />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative isolate overflow-hidden border-b border-white/10 bg-[oklch(0.14_0.02_230)] text-white">
          <div
            className="absolute inset-0 opacity-80"
            aria-hidden
            style={{
              background:
                "radial-gradient(60% 45% at 78% 15%, color-mix(in oklch, var(--primary) 22%, transparent), transparent 60%), radial-gradient(55% 45% at 12% 95%, color-mix(in oklch, oklch(0.55 0.15 195) 28%, transparent), transparent 65%)",
            }}
          />
          <div className="bg-grid-ink absolute inset-0 opacity-[0.18]" aria-hidden />

          <div className="relative mx-auto w-full max-w-6xl px-6 pb-20 pt-20 sm:px-8 sm:pb-24 sm:pt-28">
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[12px] text-white/55">
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <span aria-hidden>/</span>
              <span className="text-white/80">Blog</span>
            </nav>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80 backdrop-blur-md">
              <Rss className="h-3 w-3" />
              {postCount} {postCount === 1 ? "article" : "articles"}
            </div>

            <h1 className="mt-5 max-w-3xl text-pretty text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
              Messaging, compliance, and delivery — written by people who ship.
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-[17px] leading-relaxed text-white/75">
              Honest guides on DLT, WhatsApp Business, OTP delivery, and operator-level messaging in India.
              No fluff, no repackaged press releases — just what we learn onboarding businesses every day.
            </p>

            {categories.length > 1 ? (
              <div className="mt-10 flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-full bg-white/[0.08] px-3 py-1.5 text-[12px] font-medium text-white">
                  All topics
                </span>
                {categories.map((c) => (
                  <span
                    key={c}
                    className="inline-flex items-center rounded-full border border-white/15 px-3 py-1.5 text-[12px] font-medium text-white/75"
                  >
                    {c}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </section>

        {/* Featured + grid */}
        <section className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
          {featured ? (
            <>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-[13px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Latest
                </h2>
              </div>
              <BlogCard meta={featured.meta} featured />
            </>
          ) : null}

          {rest.length > 0 ? (
            <div className="mt-14">
              <h2 className="mb-6 text-[13px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                More articles
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {rest.map((post) => (
                  <BlogCard key={post.meta.slug} meta={post.meta} />
                ))}
              </div>
            </div>
          ) : (
            <p className="mt-12 text-center text-[14px] text-muted-foreground">
              More articles are in the pipeline. Follow along — we ship weekly.
            </p>
          )}

          <div className="mt-16 flex items-center justify-between rounded-2xl border border-border bg-card p-8">
            <div>
              <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-primary">
                Write for us
              </p>
              <h3 className="mt-2 text-pretty text-xl font-semibold tracking-tight text-foreground">
                Seen something we got wrong?
              </h3>
              <p className="mt-2 max-w-xl text-[14.5px] leading-relaxed text-muted-foreground">
                If you&apos;ve worked through DLT, WhatsApp onboarding, or OTP delivery at scale and want
                to co-author a post, we&apos;ll pay for good craft.
              </p>
            </div>
            <Link
              href="/company/contact/"
              className="hidden shrink-0 items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-[13.5px] font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90 sm:inline-flex"
            >
              Pitch us
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <ProductFinalCta
          title="₹60 free credit. No credit card."
          subtitle="Open a live account, send your first DLT-compliant SMS, and keep the test balance forever."
          primaryCta={{ label: "Create free account", href: "https://app.smslocal.in/signup" }}
          secondaryCta={{ label: "Read the docs", href: "/developers/api-docs/" }}
        />
      </main>

      <SiteFooter />
    </div>
  )
}
