import Link from "next/link"
import { ArrowRight } from "lucide-react"

/**
 * Mid-article call-to-action for blog posts — a compact version of the
 * page-level ProductFinalCta (components/product/product-page.tsx), sized to
 * sit inside the article column. Drop one into the middle of a post, tailored
 * to that post's topic. The end-of-page CTA stays as the closing conversion.
 */
export function BlogInlineCta({
  title,
  body,
  primary,
  secondary,
}: {
  title: string
  body: string
  primary: { label: string; href: string }
  secondary?: { label: string; href: string }
}) {
  return (
    <aside className="relative my-12 overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-[oklch(0.17_0.03_230)] via-[oklch(0.19_0.03_220)] to-[oklch(0.22_0.04_200)] p-7 text-white shadow-xl sm:p-9">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-16 h-64 w-64 rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklch, var(--primary) 45%, transparent), transparent 70%)",
        }}
      />
      <div className="relative">
        <h3 className="text-pretty text-xl font-semibold tracking-tight sm:text-[22px]">{title}</h3>
        <p className="mt-3 max-w-xl text-[14.5px] leading-relaxed text-white/70">{body}</p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link
            href={primary.href}
            className="group inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg transition hover:brightness-110"
          >
            {primary.label}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          {secondary ? (
            <Link
              href={secondary.href}
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/10"
            >
              {secondary.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
          ) : null}
        </div>
      </div>
    </aside>
  )
}
