import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Users } from "lucide-react"
import { AnnouncementStrip } from "@/components/landing/announcement-strip"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { ProductFinalCta } from "@/components/product/product-page"
import { BreadcrumbJsonLd } from "@/components/seo/json-ld"
import { StoryCard } from "@/components/customer-stories/story-card"
import { getAllStories } from "@/lib/customer-stories"
import { getPageMetadata } from "@/lib/seo"

// ─── SEO — edit lib/seo/registry.ts or open /dev/seo to preview ──────────────
export const metadata: Metadata = getPageMetadata("/resources/customer-stories")

export default function CustomerStoriesIndexPage() {
  const stories = getAllStories()
  const [featured, ...rest] = stories

  return (
    <div className="flex min-h-screen flex-col bg-background">      <SiteHeader />

      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Resources", path: "/resources/help" },
          { name: "Customer stories", path: "/resources/customer-stories" },
        ]}
      />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative isolate overflow-hidden border-b border-white/10 bg-[oklch(0.14_0.02_230)] text-white">
          <div
            aria-hidden
            className="absolute inset-0 opacity-80"
            style={{
              background:
                "radial-gradient(60% 45% at 78% 15%, color-mix(in oklch, var(--primary) 22%, transparent), transparent 60%), radial-gradient(55% 45% at 12% 95%, color-mix(in oklch, oklch(0.55 0.15 195) 28%, transparent), transparent 65%)",
            }}
          />
          <div className="bg-grid-ink absolute inset-0 opacity-[0.18]" aria-hidden />

          <div className="relative mx-auto w-full max-w-6xl px-6 pb-20 pt-20 sm:px-8 sm:pb-24 sm:pt-28">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-1.5 text-[12px] text-white/55"
            >
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <span aria-hidden>/</span>
              <Link href="/resources/help" className="hover:text-white">
                Resources
              </Link>
              <span aria-hidden>/</span>
              <span className="text-white/80">Customer stories</span>
            </nav>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80 backdrop-blur-md">
              <Users className="h-3 w-3" aria-hidden />
              {stories.length} {stories.length === 1 ? "story" : "stories"}
            </div>

            <h1 className="mt-5 max-w-3xl text-pretty text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
              How Indian teams actually ship with SMSLocal.
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-[17px] leading-relaxed text-white/75">
              Case studies with real before and after numbers — not marketing adjectives. Each story was
              written with the operations, growth, or engineering leader who owns the metric that moved.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-[13px] text-white/70">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
                Named spokespeople
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
                Production benchmarks
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
                India-specific compliance context
              </span>
            </div>
          </div>
        </section>

        {/* Featured + grid */}
        <section className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
          {featured ? (
            <>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-[13px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Latest story
                </h2>
              </div>
              <StoryCard story={featured} featured />
            </>
          ) : null}

          {rest.length > 0 ? (
            <div className="mt-16">
              <h2 className="mb-6 text-[13px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                More stories
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {rest.map((story) => (
                  <StoryCard key={story.slug} story={story} />
                ))}
              </div>
            </div>
          ) : null}

          <div className="mt-16 flex flex-col gap-6 rounded-2xl border border-border bg-card p-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-primary">
                Want to be featured?
              </p>
              <h3 className="mt-2 text-pretty text-xl font-semibold tracking-tight text-foreground">
                We&apos;re always looking for teams with an honest metric to share.
              </h3>
              <p className="mt-2 max-w-xl text-[14.5px] leading-relaxed text-muted-foreground">
                If you ship messaging at scale and have a before/after number you are proud of, we&apos;ll write
                the story with you — and make sure it reads like your team, not ours.
              </p>
            </div>
            <Link
              href="/company/contact"
              className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-[13.5px] font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
            >
              Talk to us
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <ProductFinalCta
          title="₹60 free credit. No credit card."
          subtitle="Open a live account, send your first DLT-compliant SMS, and keep the test balance forever."
          primaryCta={{ label: "Create free account", href: "https://app.smslocal.in/signup" }}
          secondaryCta={{ label: "Read the docs", href: "/developers/api-docs" }}
        />
      </main>

      <SiteFooter />
    </div>
  )
}
