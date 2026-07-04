import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  LifeBuoy,
  Send,
  Sparkles,
} from "lucide-react"
import { AnnouncementStrip } from "@/components/landing/announcement-strip"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { RelatedContent } from "@/components/shared/related-content"
import { ProductFinalCta, Section, SectionHeader } from "@/components/product/product-page"
import { BreadcrumbJsonLd } from "@/components/seo/json-ld"
import { HelpSearchBar } from "@/components/help/help-search-bar"
import { HELP_CATEGORIES, POPULAR_TOPIC_LINKS } from "@/lib/help-center"
import { getPageMetadata } from "@/lib/seo"

// ─── SEO — edit lib/seo/registry.ts or open /dev/seo to preview ──────────────
export const metadata: Metadata = getPageMetadata("/resources/help")



export default function HelpCentrePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Resources", path: "/resources/help" },
          { name: "Help Centre", path: "/resources/help" },
        ]}
      />      <SiteHeader />

      <main className="flex-1">
        {/* Hero with search */}
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
              <LifeBuoy className="h-3 w-3 text-primary" />
              Help Centre
            </div>
            <h1 className="mt-5 text-balance text-4xl font-bold tracking-tight sm:text-5xl">
              How can we help?
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-base text-white/70">
              Search guides, read how-tos, or jump into a category below. If you&apos;re stuck, our team is one
              click away.
            </p>

            <HelpSearchBar />

            <p className="mt-3 text-[11px] text-white/45">
              Search is powered by the same index as your dashboard — results reflect your workspace when logged in.
            </p>
          </div>
        </section>

        {/* Categories */}
        <Section className="border-b border-foreground/5">
          <SectionHeader
            eyebrow="Browse by category"
            title="Everything you need to run messaging in India."
            subtitle="Eight focused areas, each with walkthroughs, gotchas, and API recipes."
            center
          />
          <div className="mx-auto mt-12 grid max-w-6xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {HELP_CATEGORIES.map((cat) => {
              const Icon = cat.icon
              return (
                <Link
                  key={cat.slug}
                  href={`/resources/help/${cat.slug}`}
                  className="group relative overflow-hidden rounded-2xl border border-foreground/10 bg-background p-5 shadow-sm transition hover:border-primary/40 hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-[11px] font-medium text-muted-foreground">
                      {cat.articles.length} articles
                    </span>
                  </div>
                  <h3 className="mt-4 flex items-center gap-1.5 text-sm font-semibold">
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

        {/* Popular topics */}
        <section className="bg-muted/30 border-b border-foreground/5 py-20 sm:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <SectionHeader
              eyebrow="Top articles"
              title="The 10 questions our support team answers most."
              subtitle="When something is popular, it means we've documented it thoroughly. Start here."
            />
            <ol className="mt-10 grid gap-2 sm:grid-cols-2">
              {POPULAR_TOPIC_LINKS.map((topic, i) => (
                <li key={topic.href}>
                  <Link
                    href={topic.href}
                    className="group flex items-start gap-3 rounded-xl border border-foreground/10 bg-background px-4 py-3.5 transition hover:border-primary/40 hover:shadow-sm"
                  >
                    <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-md bg-primary/10 text-[11px] font-bold text-primary">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 text-sm leading-relaxed text-foreground/85 group-hover:text-foreground">
                      {topic.title}
                    </span>
                    <ArrowRight className="mt-1 h-3.5 w-3.5 flex-none text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-primary" />
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Compliance call-out */}
        <Section>
          <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.2fr_1fr]">
            <div className="relative overflow-hidden rounded-3xl border border-foreground/10 bg-gradient-to-br from-primary/10 via-background to-background p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/20">
                  <FileText className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold">DLT registration — the definitive guide</h3>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                The single most-read guide on our help centre. Covers Principal Entity registration, template
                submission, sender ID allocation, rejection reasons, and how to appeal. If you&apos;re new to Indian
                SMS, read this first.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Link
                  href="/blog/dlt-registration-guide/"
                  className="group inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:brightness-110"
                >
                  Open DLT guide
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                  Updated for 2026 TRAI amendments
                </span>
              </div>
            </div>

            {/* Contact support block */}
            <div className="relative overflow-hidden rounded-3xl border border-foreground/10 bg-[#041715] p-8 text-white">
              <div
                aria-hidden
                className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gradient-to-br from-primary/30 to-transparent blur-3xl"
              />
              <div className="relative">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-[11px] font-medium uppercase tracking-widest text-white/70">
                  <Sparkles className="h-3 w-3 text-primary" />
                  Still stuck?
                </div>
                <h3 className="mt-5 text-2xl font-bold tracking-tight">
                  Our team answers every ticket.
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  Live chat inside the dashboard, email for longer investigations, and a dedicated channel for
                  enterprise customers. We respond within 15 minutes during business hours.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Link
                    href="/company/contact/"
                    className="group inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:brightness-110"
                  >
                    Contact support
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <Link
                    href="https://app.smslocal.in/"
                    className="inline-flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white"
                  >
                    <Send className="h-4 w-4" />
                    Sign in to open chat
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Section>

        <RelatedContent path="/resources/help" />

        <ProductFinalCta
          title="Documentation that tells the truth."
          subtitle="Every article is written by the engineer who owns the feature. If a doc is wrong, a human fixes it the same day."
          primaryCta={{ label: "Start Free — ₹60 Credit", href: "https://app.smslocal.in/signup" }}
          secondaryCta={{ label: "Open developer hub", href: "/developers/" }}
        />
      </main>

      <SiteFooter />
    </div>
  )
}
