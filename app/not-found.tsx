import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Home, LifeBuoy, Search, Send } from "lucide-react"
import { AnnouncementStrip } from "@/components/landing/announcement-strip"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { getPageMetadata } from "@/lib/seo"

// ─── SEO — edit lib/seo/registry.ts or open /dev/seo to preview ──────────────
export const metadata: Metadata = getPageMetadata("/404")

const QUICK_LINKS = [
  {
    href: "/products",
    title: "Products",
    description: "SMS, WhatsApp, OTP, and AI agents — all our channels on one page.",
    icon: Send,
  },
  {
    href: "/pricing",
    title: "Pricing",
    description: "Volume-tier SMS rates and pay-as-you-go WhatsApp pricing.",
    icon: Search,
  },
  {
    href: "/company/contact",
    title: "Talk to us",
    description: "Questions about onboarding, DLT, or enterprise routing? Reach our team.",
    icon: LifeBuoy,
  },
]

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-background">      <SiteHeader />

      <main className="flex-1">
        <section className="relative overflow-hidden bg-slate-950 py-24 text-white lg:py-32">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute -top-20 left-1/2 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
          </div>

          <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/80">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
              Error 404
            </div>

            <h1 className="mt-6 font-serif text-6xl font-semibold leading-none tracking-tight text-white md:text-7xl lg:text-8xl">
              404
            </h1>
            <p className="mt-6 max-w-xl text-balance font-serif text-2xl font-semibold leading-snug tracking-tight text-white md:text-3xl">
              We couldn&apos;t find that page.
            </p>
            <p className="mt-4 max-w-md text-pretty text-[15px] leading-relaxed text-white/70">
              The link may be broken, the page may have moved, or it may not exist yet. Try one of the destinations below.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:brightness-110"
              >
                <Home className="h-4 w-4" aria-hidden />
                Go home
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/10"
              >
                Browse products
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-background py-16 lg:py-20">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-balance text-center font-serif text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              Looking for something specific?
            </h2>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {QUICK_LINKS.map((link) => {
                const Icon = link.icon
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" aria-hidden />
                    </div>
                    <h3 className="mt-4 text-base font-semibold text-foreground">{link.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{link.description}</p>
                    <div className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-primary">
                      Open
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden />
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
