import Link from "next/link"
import { ArrowRight, CheckCircle2, ChevronRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteFooter } from "@/components/landing/site-footer"
import { SiteHeader } from "@/components/landing/site-header"
import type { PlaceholderRoute } from "@/lib/placeholder-routes"

function Breadcrumb({ route }: { route: PlaceholderRoute }) {
  const parts = route.slug.split("/")
  const segments = parts.map((part, i) => {
    const href = "/" + parts.slice(0, i + 1).join("/")
    const label = part
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase())
    return { href, label }
  })
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs text-foreground/55">
      <Link href="/" className="hover:text-foreground">
        Home
      </Link>
      {segments.map((seg, i) => (
        <span key={seg.href} className="flex items-center gap-1.5">
          <ChevronRight className="h-3 w-3" />
          {i === segments.length - 1 ? (
            <span className="text-foreground">{seg.label}</span>
          ) : (
            <Link href={seg.href} className="hover:text-foreground">
              {seg.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  )
}

export function ComingSoon({ route }: { route: PlaceholderRoute }) {
  return (
    <>
      <SiteHeader />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-foreground text-white">
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage:
                "radial-gradient(60% 40% at 20% 10%, oklch(0.7 0.15 165 / 0.35), transparent), radial-gradient(50% 40% at 85% 0%, oklch(0.75 0.14 190 / 0.25), transparent)",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.2) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
              maskImage: "radial-gradient(70% 60% at 50% 40%, black, transparent)",
            }}
          />
          <div className="relative mx-auto max-w-5xl px-4 pt-14 pb-20 sm:px-6 lg:px-8 lg:pt-20 lg:pb-28">
            <Breadcrumb route={route} />
            <div className="mt-6 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent">
                <Sparkles className="h-3 w-3" />
                Coming soon
              </span>
              <span className="text-xs font-medium uppercase tracking-wider text-white/55">{route.category}</span>
            </div>
            <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              {route.title}
            </h1>
            <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-white/75 sm:text-xl">
              {route.tagline}
            </p>
            <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-white/60">{route.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/company/contact">
                  Talk to us now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/20 bg-white/5 text-white hover:bg-white/10">
                <Link href="/products">Explore live products</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* What to expect */}
        <section className="border-b border-border bg-background">
          <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-primary">On this page soon</div>
                <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                  What to expect when this page goes live.
                </h2>
                <p className="mt-4 leading-relaxed text-foreground/65">
                  We would rather hold a page back than publish something half-formed. Here is what this page will cover on
                  the main domain launch.
                </p>
              </div>
              <ul className="space-y-3">
                {route.expect.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-primary" />
                    <span className="leading-relaxed text-foreground/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Meanwhile */}
        {route.related && route.related.length > 0 && (
          <section className="bg-muted/40">
            <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
              <div className="text-xs font-semibold uppercase tracking-wider text-primary">Meanwhile</div>
              <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                Live pages you can explore today.
              </h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {route.related.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-medium text-foreground">{link.label}</span>
                      <ArrowRight className="h-4 w-4 text-primary transition group-hover:translate-x-0.5" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Final CTA */}
        <section className="border-t border-border bg-background">
          <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Need this now? Reach us directly.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-pretty leading-relaxed text-foreground/65">
              Even before this page ships, our sales and support teams can walk you through the details, share draft
              documentation, or get you onboarded on the platform.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg">
                <Link href="/company/contact">
                  Talk to us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/pricing">See pricing</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
