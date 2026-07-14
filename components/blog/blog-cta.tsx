import Link from "next/link"
import { ArrowRight } from "lucide-react"

/**
 * Mid-article call-to-action for blog posts — a horizontal band: heading and a
 * short line of context on the left, one button on the right (stacks on small
 * screens). Uses the site's standard primary button. Lighter than the
 * page-level ProductFinalCta used at the end of each post.
 */
export function BlogInlineCta({
  title,
  body,
  primary,
}: {
  title: string
  body?: string
  primary: { label: string; href: string }
}) {
  return (
    <aside className="my-10 flex flex-col gap-5 rounded-2xl border border-border bg-gradient-to-br from-[oklch(0.17_0.03_230)] via-[oklch(0.19_0.03_220)] to-[oklch(0.22_0.04_200)] p-6 text-white shadow-lg sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:p-7">
      <div className="min-w-0">
        <h3 className="text-lg font-semibold tracking-tight text-white">{title}</h3>
        {body ? (
          <p className="mt-1.5 text-[14px] leading-relaxed text-white/70">{body}</p>
        ) : null}
      </div>
      <Link
        href={primary.href}
        className="group inline-flex shrink-0 items-center gap-2 self-start rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:brightness-110 sm:self-auto"
      >
        {primary.label}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </aside>
  )
}
