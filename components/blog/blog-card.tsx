import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { formatBlogDate, type BlogMeta } from "@/lib/blog"

export function BlogCard({
  meta,
  featured = false,
}: {
  meta: BlogMeta
  featured?: boolean
}) {
  return (
    <Link
      href={`/blog/${meta.slug}`}
      className={`group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:border-primary/30 hover:shadow-md ${
        featured ? "sm:flex-row" : ""
      }`}
    >
      <div
        className={`relative overflow-hidden bg-[oklch(0.18_0.02_230)] ${
          featured ? "aspect-[4/3] sm:aspect-auto sm:w-[42%]" : "aspect-[16/9]"
        }`}
      >
        {meta.coverImage ? (
          <Image
            src={meta.coverImage}
            alt={meta.coverAlt}
            fill
            sizes={
              featured
                ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 42vw"
                : "(max-width: 768px) 100vw, 33vw"
            }
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <>
            <div
              className="absolute inset-0 opacity-70"
              aria-hidden
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, color-mix(in oklch, var(--primary) 45%, transparent), transparent 60%), radial-gradient(circle at 80% 70%, color-mix(in oklch, oklch(0.55 0.15 195) 45%, transparent), transparent 60%)",
              }}
            />
            <div
              className="bg-grid-ink absolute inset-0 opacity-30 mask-radial-fade"
              aria-hidden
            />
          </>
        )}
        <span className="absolute left-4 top-4 z-10 inline-flex rounded-full border border-white/20 bg-black/55 px-3 py-1 font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md">
          {meta.category}
        </span>
      </div>

      <div className={`flex flex-1 flex-col p-6 ${featured ? "sm:p-8" : ""}`}>
        <div className="flex items-center gap-2 text-[11.5px] text-muted-foreground">
          <time dateTime={meta.date}>{formatBlogDate(meta.date)}</time>
          <span aria-hidden>·</span>
          <span>{meta.readingTime}</span>
        </div>
        <h3
          className={`mt-3 flex-1 text-pretty font-semibold tracking-tight text-foreground ${
            featured ? "text-2xl sm:text-[26px]" : "text-[18px] sm:text-[19px]"
          }`}
        >
          {meta.title}
        </h3>
        <p
          className={`mt-3 text-pretty leading-relaxed text-muted-foreground ${
            featured ? "text-[15px]" : "text-[13.5px]"
          }`}
        >
          {meta.description}
        </p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-primary">
          Read article
          <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  )
}
