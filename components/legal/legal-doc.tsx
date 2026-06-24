import Link from "next/link"
import type { ReactNode } from "react"
import { ChevronRight, FileText, Mail } from "lucide-react"
import { AnnouncementStrip } from "@/components/landing/announcement-strip"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"

export type LegalSectionData = {
  id: string
  title: string
  body: ReactNode
}

export type LegalTocEntry = { id: string; label: string }
export type LegalBreadcrumb = { label: string; href?: string }

export function LegalSection({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="text-[22px] font-semibold tracking-tight text-foreground">{title}</h2>
      <div className="mt-4 space-y-4 text-[14.5px] leading-relaxed text-muted-foreground">
        {children}
      </div>
    </section>
  )
}

export function LegalDoc({
  category,
  eyebrow,
  title,
  summary,
  lastUpdated,
  effectiveDate,
  sections,
  toc,
  breadcrumb,
  relatedLinks,
  children,
}: {
  category?: string
  eyebrow?: string
  title: string
  summary: string
  lastUpdated: string
  effectiveDate?: string
  sections?: LegalSectionData[]
  toc?: LegalTocEntry[]
  breadcrumb?: LegalBreadcrumb[]
  relatedLinks?: { label: string; href: string }[]
  children?: ReactNode
}) {
  // Derive a unified TOC: prefer explicit `toc`, fall back to `sections`.
  const tocEntries: LegalTocEntry[] =
    toc ??
    (sections ? sections.map((s) => ({ id: s.id, label: s.title })) : [])

  // Derive an eyebrow label: prefer explicit `eyebrow`, fall back to `category`.
  const eyebrowLabel = eyebrow ?? category ?? "Legal"
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <AnnouncementStrip />
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-white/10 bg-[oklch(0.14_0.02_230)] text-white">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-32 -right-24 h-80 w-80 rounded-full opacity-50 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, color-mix(in oklch, var(--primary) 45%, transparent), transparent 70%)",
            }}
          />
          <div aria-hidden className="bg-grid-ink absolute inset-0 opacity-40 mask-radial-fade" />
          <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[12px] text-white/55">
              {breadcrumb && breadcrumb.length > 0 ? (
                breadcrumb.map((crumb, idx) => {
                  const isLast = idx === breadcrumb.length - 1
                  return (
                    <span key={`${crumb.label}-${idx}`} className="flex items-center gap-1.5">
                      {crumb.href && !isLast ? (
                        <Link href={crumb.href} className="hover:text-white">
                          {crumb.label}
                        </Link>
                      ) : (
                        <span className={isLast ? "text-white/80" : undefined}>{crumb.label}</span>
                      )}
                      {!isLast ? <ChevronRight className="h-3 w-3" /> : null}
                    </span>
                  )
                })
              ) : (
                <>
                  <Link href="/" className="hover:text-white">
                    Home
                  </Link>
                  <ChevronRight className="h-3 w-3" />
                  <Link href="/legal/privacy" className="hover:text-white">
                    Legal
                  </Link>
                  <ChevronRight className="h-3 w-3" />
                  <span className="text-white/80">{title}</span>
                </>
              )}
            </nav>

            <div className="mt-6 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-white/80 backdrop-blur-md">
                <FileText className="h-3 w-3" />
                {eyebrowLabel}
              </span>
            </div>

            <h1 className="mt-5 max-w-3xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              {title}
            </h1>
            <p className="mt-5 max-w-2xl text-pretty text-[15.5px] leading-relaxed text-white/70 sm:text-base">
              {summary}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3 text-[12.5px] text-white/60">
              <span className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1">
                <span className="text-white/45">Last updated</span>
                <span className="font-medium text-white/85">{lastUpdated}</span>
              </span>
              {effectiveDate ? (
                <span className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1">
                  <span className="text-white/45">Effective</span>
                  <span className="font-medium text-white/85">{effectiveDate}</span>
                </span>
              ) : null}
            </div>
          </div>
        </section>

        {/* Body */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[240px_1fr] lg:gap-16">
            {/* Sticky TOC */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                  On this page
                </p>
                <ul className="mt-4 flex flex-col gap-1">
                  {tocEntries.map((entry) => (
                    <li key={entry.id}>
                      <a
                        href={`#${entry.id}`}
                        className="block rounded-md px-2 py-1.5 text-[13px] leading-snug text-muted-foreground transition hover:bg-muted hover:text-foreground"
                      >
                        {entry.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {relatedLinks && relatedLinks.length > 0 ? (
                <div className="mt-4 rounded-2xl border border-border bg-muted/30 p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                    Related
                  </p>
                  <ul className="mt-3 flex flex-col gap-1.5">
                    {relatedLinks.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="inline-flex items-center gap-1.5 text-[13px] font-medium text-primary hover:underline"
                        >
                          {link.label}
                          <ChevronRight className="h-3 w-3" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </aside>

            {/* Document */}
            <div className="min-w-0">
              <article className="prose-doc flex flex-col gap-12">
                {sections
                  ? sections.map((section) => (
                      <section key={section.id} id={section.id} className="scroll-mt-24">
                        <h2 className="text-[22px] font-semibold tracking-tight text-foreground">
                          {section.title}
                        </h2>
                        <div className="mt-4 space-y-4 text-[14.5px] leading-relaxed text-muted-foreground">
                          {section.body}
                        </div>
                      </section>
                    ))
                  : children}
              </article>

              {/* Contact block */}
              <div className="mt-16 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Mail className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-[16px] font-semibold tracking-tight text-foreground">
                      Questions about this document?
                    </h3>
                    <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">
                      Write to us at{" "}
                      <a
                        href="mailto:legal@smslocal.in"
                        className="font-medium text-primary hover:underline"
                      >
                        legal@smslocal.in
                      </a>
                      . Privacy and data protection queries should go to{" "}
                      <a
                        href="mailto:dpo@smslocal.in"
                        className="font-medium text-primary hover:underline"
                      >
                        dpo@smslocal.in
                      </a>
                      . We respond within two business days.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

export function P({ children }: { children: ReactNode }) {
  return <p>{children}</p>
}

export function Ul({ children }: { children: ReactNode }) {
  return <ul className="ml-4 flex list-disc flex-col gap-2 marker:text-primary/60">{children}</ul>
}

export function Ol({ children }: { children: ReactNode }) {
  return (
    <ol className="ml-4 flex list-decimal flex-col gap-2 marker:font-semibold marker:text-primary/70">
      {children}
    </ol>
  )
}

export function Li({ children }: { children: ReactNode }) {
  return <li className="pl-1.5">{children}</li>
}

export function Strong({ children }: { children: ReactNode }) {
  return <strong className="font-semibold text-foreground">{children}</strong>
}

export function Callout({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl border border-primary/20 bg-primary/5 px-5 py-4 text-[13.5px] leading-relaxed text-foreground">
      {children}
    </div>
  )
}
