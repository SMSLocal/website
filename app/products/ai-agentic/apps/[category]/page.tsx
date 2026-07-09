import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, ExternalLink, Zap } from "lucide-react"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { AnnouncementStrip } from "@/components/landing/announcement-strip"
import { getAppCategoryBySlug, generateAppCategorySlugs, APP_CATEGORIES } from "../data"
import { AppLogo } from "@/components/product/app-logo"

export const dynamicParams = false

export async function generateStaticParams() {
  return generateAppCategorySlugs()
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params
  const cat = getAppCategoryBySlug(category)
  if (!cat) return {}
  return {
    title: `${cat.label} Integrations — Captain AI | SMSLocal`,
    description: cat.desc,
  }
}

export default async function AppCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params
  const cat = getAppCategoryBySlug(category)
  if (!cat) notFound()

  const related = APP_CATEGORIES.filter((c) => c.slug !== cat.slug).slice(0, 4)

  return (
    <>
      <AnnouncementStrip />
      <SiteHeader />
      <main className="overflow-x-clip">

        {/* ── HERO ── */}
        <section className="border-b border-border bg-muted/30 py-12 sm:py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <Link
              href="/products/ai-agentic/#apps"
              className="inline-flex items-center gap-1.5 text-[13px] font-medium text-muted-foreground transition hover:text-foreground"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Powered by Composio
            </Link>

            <div className="mt-5 flex items-start gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-0.5 text-[11px] font-semibold uppercase tracking-widest text-primary">
                    Composio Integration
                  </span>
                  <span className="rounded-full border border-border bg-background px-2.5 py-0.5 text-[11px] font-semibold text-muted-foreground">
                    {cat.count} apps
                  </span>
                </div>
                <h1 className="mt-3 text-3xl font-black tracking-tight text-foreground sm:text-4xl">
                  {cat.label}
                </h1>
                <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
                  {cat.desc} Connect any of these apps with one-click OAuth and Captain AI can read live data and take real actions — inside every customer conversation.
                </p>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/signup/"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-[13px] font-bold text-primary-foreground shadow-sm transition hover:opacity-90"
              >
                Connect {cat.label} <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/products/ai-agentic/"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-5 py-2.5 text-[13px] font-semibold text-foreground transition hover:border-primary/30"
              >
                See all integrations
              </Link>
            </div>
          </div>
        </section>

        {/* ── APP GRID ── */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="text-[16px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
              Featured apps
            </h2>

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {cat.apps.map((app) => (
                <div
                  key={app.name}
                  className="group relative flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
                >
                  <div className="flex items-start gap-3">
                    <AppLogo name={app.name} url={app.url} logoUrl={app.logoUrl} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-[15px] font-bold text-foreground">{app.name}</p>
                        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                          <Zap className="h-2.5 w-2.5" /> {app.actions} actions
                        </span>
                      </div>
                      <p className="mt-1 text-[12.5px] leading-relaxed text-muted-foreground">
                        {app.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {app.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md border border-border bg-muted/60 px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a
                      href={app.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-3 inline-flex shrink-0 items-center gap-1 text-[12px] font-semibold text-primary opacity-0 transition group-hover:opacity-100"
                    >
                      Visit <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-10 rounded-2xl border border-primary/20 bg-primary/5 p-6 text-center">
              <p className="text-[15px] font-semibold text-foreground">
                Connect {cat.label} to Captain AI
              </p>
              <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">
                One-click OAuth. No API keys to manage. Captain gets the right scopes and can start taking actions immediately.
              </p>
              <Link
                href="/signup/"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-[14px] font-bold text-primary-foreground shadow-sm transition hover:opacity-90"
              >
                Start Free <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── RELATED CATEGORIES ── */}
        {related.length > 0 && (
          <section className="border-t border-border bg-muted/30 py-12 sm:py-16">
            <div className="mx-auto max-w-5xl px-4 sm:px-6">
              <h2 className="text-[16px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                More integrations
              </h2>
              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {related.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/products/ai-agentic/apps/${c.slug}`}
                    className="group flex flex-col gap-2 rounded-2xl border border-border bg-card p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
                  >
                    <p className="text-[13px] font-bold text-foreground transition group-hover:text-primary">
                      {c.label}
                    </p>
                    <p className="text-[11.5px] leading-relaxed text-muted-foreground line-clamp-2">
                      {c.desc}
                    </p>
                    <span className="mt-auto text-[11px] font-semibold text-muted-foreground">
                      {c.count} apps →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

      </main>
      <SiteFooter />
    </>
  )
}
