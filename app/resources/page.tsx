import type { Metadata } from "next"
import Link from "next/link"
import {
  Activity,
  ArrowRight,
  BookOpen,
  Bot,
  Code2,
  CreditCard,
  GitCommit,
  KeyRound,
  MessageCircle,
  MessageSquare,
  Play,
  ShieldCheck,
  Users,
  Wrench,
} from "lucide-react"
import { AnnouncementStrip } from "@/components/landing/announcement-strip"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { ProductFinalCta } from "@/components/product/product-page"
import { BreadcrumbJsonLd } from "@/components/seo/json-ld"
import { getAllStories } from "@/lib/customer-stories"
import { HELP_CATEGORIES } from "@/lib/help-center"
import { getPageMetadata } from "@/lib/seo"

// ─── SEO — edit lib/seo/registry.ts or open /dev/seo to preview ──────────────
export const metadata: Metadata = getPageMetadata("/resources")

// ─── Hub sections ────────────────────────────────────────────────────────────

const SECTIONS = [
  {
    href: "/resources/help/",
    icon: MessageSquare,
    label: "Help Centre",
    description: "Step-by-step guides for DLT setup, SMS campaigns, WhatsApp onboarding, OTP routing, billing, and the API.",
    meta: "8 categories · 45+ articles",
    accent: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    href: "/resources/customer-stories/",
    icon: Users,
    label: "Customer Stories",
    description: "Real before/after metrics from Indian fintech, D2C, and EdTech teams using SMSLocal in production.",
    meta: "3 case studies",
    accent: "text-violet-400",
    bg: "bg-violet-500/10",
  },
  {
    href: "/resources/glossary/",
    icon: BookOpen,
    label: "SMS Glossary",
    description: "Plain-English definitions for DLT, PE, BSP, Sender ID, DLR, TCCCPR, and every Indian messaging term.",
    meta: "100+ terms defined",
    accent: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    href: "/resources/tools/",
    icon: Wrench,
    label: "Free Tools",
    description: "Try SMS free with ₹60 credit, learn why SMS bombing is illegal in India, and explore SMS length limits.",
    meta: "2 free utilities",
    accent: "text-amber-400",
    bg: "bg-amber-500/10",
  },
  {
    href: "/resources/changelog/",
    icon: GitCommit,
    label: "Changelog",
    description: "Every feature shipped, every bug fixed — with dates, descriptions, and what's coming next on the roadmap.",
    meta: "Updated continuously",
    accent: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
  {
    href: "/resources/status/",
    icon: Activity,
    label: "System Status",
    description: "Live platform health, 90-day uptime history, incident reports, and real-time service monitoring.",
    meta: "99.97% uptime · live",
    accent: "text-green-400",
    bg: "bg-green-500/10",
  },
] as const

// Map category slug → icon (mirrors lib/help-center.ts ordering)
const CATEGORY_ICONS: Record<string, typeof Play> = {
  "getting-started": Play,
  "sms": MessageSquare,
  "whatsapp": MessageCircle,
  "ai-agents": Bot,
  "otp": KeyRound,
  "dlt": ShieldCheck,
  "billing": CreditCard,
  "api": Code2,
}

export default function ResourcesIndexPage() {
  const stories = getAllStories()

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <AnnouncementStrip />
      <SiteHeader />

      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Resources", path: "/resources/" },
        ]}
      />

      <main className="flex-1">

        {/* ── Hero ────────────────────────────────────────────────────────── */}
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
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[12px] text-white/55">
              <Link href="/" className="hover:text-white">Home</Link>
              <span aria-hidden>/</span>
              <span className="text-white/80">Resources</span>
            </nav>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80 backdrop-blur-md">
              Help · Stories · Glossary · Tools
            </div>

            <h1 className="mt-5 max-w-3xl text-pretty text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-[52px] md:leading-[1.08]">
              Everything you need to ship messaging in India.
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-[17px] leading-relaxed text-white/75">
              Help guides, customer case studies, the full SMS glossary, free tools, live system status, and a
              running changelog — all in one place.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/resources/help/"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-[13.5px] font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
              >
                Browse help articles
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/resources/customer-stories/"
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/[0.06] px-5 py-2.5 text-[13.5px] font-semibold text-white backdrop-blur-sm transition hover:bg-white/10"
              >
                Read customer stories
              </Link>
            </div>
          </div>
        </section>

        {/* ── 6-section hub grid ──────────────────────────────────────────── */}
        <section className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
          <h2 className="mb-8 text-[13px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Browse resources
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SECTIONS.map(({ href, icon: Icon, label, description, meta, accent, bg }) => (
              <Link
                key={href}
                href={href}
                className="group flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 transition hover:border-primary/40 hover:shadow-md hover:shadow-primary/5"
              >
                <div className="flex items-start justify-between">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${bg}`}>
                    <Icon className={`h-5 w-5 ${accent}`} />
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground/40 transition group-hover:translate-x-0.5 group-hover:text-primary" />
                </div>
                <div>
                  <p className="text-[15px] font-semibold tracking-tight text-foreground">{label}</p>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">{description}</p>
                </div>
                <p className="mt-auto text-[11.5px] font-medium text-muted-foreground/60">{meta}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Help centre categories ───────────────────────────────────────── */}
        <section className="border-t border-border bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Help Centre</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
                  Browse by topic
                </h2>
              </div>
              <Link
                href="/resources/help/"
                className="hidden items-center gap-1.5 text-[13px] font-semibold text-primary hover:underline sm:flex"
              >
                All help articles <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {HELP_CATEGORIES.map((cat) => {
                const Icon = CATEGORY_ICONS[cat.slug] ?? MessageSquare
                return (
                  <Link
                    key={cat.slug}
                    href={`/resources/help/${cat.slug}/`}
                    className="group flex flex-col gap-3 rounded-xl border border-border bg-card p-4 transition hover:border-primary/30 hover:bg-card/80"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-[13.5px] font-semibold text-foreground group-hover:text-primary transition-colors">
                        {cat.title}
                      </p>
                      <p className="mt-1 text-[11.5px] text-muted-foreground line-clamp-2">
                        {cat.description}
                      </p>
                    </div>
                    <p className="text-[11px] text-muted-foreground/55 font-medium mt-auto">
                      {cat.articles.length} {cat.articles.length === 1 ? "article" : "articles"}
                    </p>
                  </Link>
                )
              })}
            </div>

            <div className="mt-5 sm:hidden">
              <Link
                href="/resources/help/"
                className="flex items-center gap-1.5 text-[13px] font-semibold text-primary hover:underline"
              >
                All help articles <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── Customer stories ────────────────────────────────────────────── */}
        <section className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Customer Stories</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
                Real results from Indian teams
              </h2>
            </div>
            <Link
              href="/resources/customer-stories/"
              className="hidden items-center gap-1.5 text-[13px] font-semibold text-primary hover:underline sm:flex"
            >
              All stories <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {stories.map((story) => {
              const topMetric = story.metrics[0]
              return (
                <Link
                  key={story.slug}
                  href={`/resources/customer-stories/${story.slug}/`}
                  className="group flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 transition hover:border-primary/40 hover:shadow-md hover:shadow-primary/5"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-[13px] font-bold text-primary">
                      {story.company.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-[13.5px] font-semibold text-foreground">{story.company}</p>
                      <p className="text-[11.5px] text-muted-foreground">{story.industry}</p>
                    </div>
                  </div>

                  {topMetric && (
                    <div className="rounded-lg bg-muted/60 px-4 py-3">
                      <p className="text-[22px] font-bold tracking-tight text-foreground font-variant-numeric tabular-nums">
                        {topMetric.after}
                        {topMetric.before && (
                          <span className="ml-2 text-[13px] font-normal text-muted-foreground line-through">
                            {topMetric.before}
                          </span>
                        )}
                      </p>
                      <p className="mt-0.5 text-[11.5px] text-muted-foreground">{topMetric.label}</p>
                    </div>
                  )}

                  <p className="text-[13px] leading-relaxed text-muted-foreground line-clamp-2">
                    {story.summary}
                  </p>

                  <span className="mt-auto inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary">
                    Read story <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                  </span>
                </Link>
              )
            })}
          </div>

          <div className="mt-5 sm:hidden">
            <Link
              href="/resources/customer-stories/"
              className="flex items-center gap-1.5 text-[13px] font-semibold text-primary hover:underline"
            >
              All customer stories <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </section>

      </main>

      <ProductFinalCta
        title="₹60 free credit. No credit card."
        subtitle="Open a live account, send your first DLT-compliant SMS, and keep the test balance forever."
        primaryCta={{ label: "Create free account", href: "/signup/" }}
        secondaryCta={{ label: "Read the docs", href: "/developers/api-docs/" }}
      />

      <SiteFooter />
    </div>
  )
}
