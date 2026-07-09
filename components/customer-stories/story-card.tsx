import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, MapPin } from "lucide-react"
import type { CustomerStory } from "@/lib/customer-stories"

/**
 * StoryCard — used on the customer-stories index page and on the
 * "more stories" rail on detail pages.
 *
 * `featured` stretches the card into a two-column layout with the cover
 * on the left and the body on the right — suitable for the top of the
 * listing page. The default (non-featured) card is a single-column tile
 * that fits a three-column grid.
 */
export function StoryCard({
  story,
  featured = false,
}: {
  story: CustomerStory
  featured?: boolean
}) {
  return (
    <Link
      href={`/resources/customer-stories/${story.slug}`}
      className={`group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:border-primary/30 hover:shadow-md ${
        featured ? "sm:flex-row" : ""
      }`}
    >
      <div
        className={`relative overflow-hidden bg-[oklch(0.18_0.02_230)] ${
          featured ? "aspect-[4/3] sm:aspect-auto sm:w-[46%]" : "aspect-[16/9]"
        }`}
      >
        <Image
          src={story.coverImage}
          alt={story.coverAlt}
          fill
          sizes={
            featured
              ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 46vw"
              : "(max-width: 768px) 100vw, 33vw"
          }
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        <span className="absolute left-4 top-4 z-10 inline-flex rounded-full border border-white/20 bg-black/55 px-3 py-1 font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md">
          {story.industry}
        </span>
      </div>

      <div
        className={`flex min-w-0 flex-1 flex-col gap-4 p-6 sm:p-7 ${
          featured ? "sm:justify-center sm:gap-5 sm:p-10" : ""
        }`}
      >
        <div className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
          <span className="text-foreground">{story.company}</span>
          <span aria-hidden className="text-border">
            /
          </span>
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3 w-3" aria-hidden />
            {story.location}
          </span>
        </div>

        <h3
          className={`text-pretty font-semibold tracking-tight text-foreground transition group-hover:text-primary ${
            featured ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl"
          }`}
        >
          {story.title}
        </h3>

        <p
          className={`text-pretty text-muted-foreground ${
            featured ? "text-[15px] leading-relaxed" : "text-[14px] leading-relaxed"
          }`}
        >
          {story.summary}
        </p>

        <div className="mt-auto flex flex-wrap items-center gap-2">
          {story.products.map((p) => (
            <span
              key={p}
              className="inline-flex items-center rounded-full border border-border bg-muted/60 px-2.5 py-1 text-[11.5px] font-medium text-muted-foreground"
            >
              {p}
            </span>
          ))}
        </div>

        <div className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary">
          Read the story
          <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </Link>
  )
}
