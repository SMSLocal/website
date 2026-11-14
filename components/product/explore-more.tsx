import Link from "next/link"
import { ArrowRight, Link2, Sparkles } from "lucide-react"

// Shared "Explore more" tiles used at the bottom of the channel and product pages.
export function ExploreMore({ links }: { links: { href: string; label: string; hint: string }[] }) {
  return (
    <section className="border-b border-border bg-secondary/40 py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-3 py-1 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-primary">
          <Sparkles className="h-3.5 w-3.5" />Explore more
        </span>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {links.map((l, i) => (
            <Link key={l.href} href={l.href} className="group relative flex min-h-[150px] flex-col justify-between overflow-hidden rounded-[22px] border border-border bg-card p-5 transition hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl">
              <span className="absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-60 transition group-hover:scale-125" style={{ background: i % 2 ? "color-mix(in oklch, var(--accent) 45%, transparent)" : "color-mix(in oklch, var(--primary) 20%, transparent)" }} />
              <Link2 className="relative h-5 w-5 text-primary" />
              <span className="relative">
                <span className="block text-[15px] font-semibold leading-snug tracking-tight">{l.label}</span>
                <span className="mt-1 block text-[12.5px] leading-snug text-muted-foreground">{l.hint}</span>
                <ArrowRight className="mt-3 h-4 w-4 text-primary transition group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
