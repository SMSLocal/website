import type { ReactNode } from "react"
import Image from "next/image"
import { AlertCircle, CheckCircle2, Info, Lightbulb } from "lucide-react"

/**
 * Heading — used for post section headings.
 * Uses scroll-mt so sidebar TOC anchors land cleanly below the sticky header.
 */
export function H2({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2
      id={id}
      className="mt-14 scroll-mt-24 text-pretty text-2xl font-semibold tracking-tight text-foreground sm:text-[28px]"
    >
      {children}
    </h2>
  )
}

export function H3({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <h3
      id={id}
      className="mt-10 scroll-mt-24 text-pretty text-[19px] font-semibold tracking-tight text-foreground sm:text-[20px]"
    >
      {children}
    </h3>
  )
}

export function P({ children }: { children: ReactNode }) {
  return (
    <p className="mt-4 text-[16px] leading-[1.75] text-foreground/85 sm:text-[17px]">{children}</p>
  )
}

export function Lead({ children }: { children: ReactNode }) {
  return (
    <p className="mt-6 text-pretty text-[18px] leading-[1.7] text-foreground/90 sm:text-[20px]">
      {children}
    </p>
  )
}

export function UL({ children }: { children: ReactNode }) {
  return (
    <ul className="mt-5 flex flex-col gap-2.5 pl-6 text-[16px] leading-[1.7] text-foreground/85 marker:text-primary sm:text-[17px]">
      {children}
    </ul>
  )
}

export function OL({ children }: { children: ReactNode }) {
  return (
    <ol className="mt-5 flex list-decimal flex-col gap-2.5 pl-6 text-[16px] leading-[1.7] text-foreground/85 marker:font-semibold marker:text-primary sm:text-[17px]">
      {children}
    </ol>
  )
}

export function LI({ children }: { children: ReactNode }) {
  return <li className="pl-1.5">{children}</li>
}

export function Strong({ children }: { children: ReactNode }) {
  return <strong className="font-semibold text-foreground">{children}</strong>
}

export function InlineCode({ children }: { children: ReactNode }) {
  return (
    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[14px] text-foreground">
      {children}
    </code>
  )
}

export function A({ href, children }: { href: string; children: ReactNode }) {
  const isInternal = href.startsWith("/")
  return (
    <a
      href={href}
      className="font-medium text-primary underline decoration-primary/30 underline-offset-4 transition hover:decoration-primary"
      {...(isInternal ? {} : { target: "_blank", rel: "noopener noreferrer" })}
    >
      {children}
    </a>
  )
}

/**
 * Callout — four variants for different emphasis.
 */
export function Callout({
  variant = "info",
  title,
  children,
}: {
  variant?: "info" | "tip" | "warning" | "success"
  title?: string
  children: ReactNode
}) {
  const map = {
    info: {
      Icon: Info,
      border: "border-sky-500/25",
      bg: "bg-sky-500/5",
      iconColor: "text-sky-600 dark:text-sky-400",
    },
    tip: {
      Icon: Lightbulb,
      border: "border-primary/25",
      bg: "bg-primary/5",
      iconColor: "text-primary",
    },
    warning: {
      Icon: AlertCircle,
      border: "border-amber-500/25",
      bg: "bg-amber-500/5",
      iconColor: "text-amber-600 dark:text-amber-500",
    },
    success: {
      Icon: CheckCircle2,
      border: "border-emerald-500/25",
      bg: "bg-emerald-500/5",
      iconColor: "text-emerald-600 dark:text-emerald-400",
    },
  }
  const { Icon, border, bg, iconColor } = map[variant]
  return (
    <aside className={`mt-6 flex gap-3 rounded-xl border ${border} ${bg} p-4`}>
      <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${iconColor}`} aria-hidden />
      <div className="flex-1">
        {title ? (
          <p className="mb-1 text-[14.5px] font-semibold tracking-tight text-foreground">{title}</p>
        ) : null}
        <div className="text-[14.5px] leading-relaxed text-foreground/85 [&>p]:mt-0 [&>p+p]:mt-2.5">
          {children}
        </div>
      </div>
    </aside>
  )
}

export function Blockquote({ children, cite }: { children: ReactNode; cite?: string }) {
  return (
    <blockquote className="mt-6 border-l-4 border-primary/50 pl-5 text-[17px] leading-relaxed text-foreground/90 italic sm:text-[18px]">
      {children}
      {cite ? <footer className="mt-2 text-[13.5px] not-italic text-muted-foreground">— {cite}</footer> : null}
    </blockquote>
  )
}

/**
 * BlogFigure — editorial image with optional caption, rendered inside
 * a post body. Uses next/image for sizing + lazy loading, with a 16:9
 * container so the layout never jumps. Pass `priority` only for images
 * above the fold.
 */
export function BlogFigure({
  src,
  alt,
  caption,
  priority = false,
}: {
  src: string
  alt: string
  caption?: ReactNode
  priority?: boolean
}) {
  return (
    <figure className="mt-10">
      <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-border bg-muted">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 720px"
          priority={priority}
          className="object-cover"
        />
      </div>
      {caption ? (
        <figcaption className="mt-3 text-[13px] leading-relaxed text-muted-foreground">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  )
}

/**
 * FigureTable — a styled HTML table wrapper for comparison matrices inside posts.
 */
export function FigureTable({
  columns,
  rows,
  caption,
}: {
  columns: string[]
  rows: ReactNode[][]
  caption?: string
}) {
  return (
    <figure className="mt-6">
      <div className="overflow-hidden rounded-xl border border-border">
        <table className="w-full border-collapse text-left text-[14px]">
          <thead>
            <tr className="border-b border-border bg-muted/40">
              {columns.map((c) => (
                <th
                  key={c}
                  className="px-4 py-3 text-[11.5px] font-semibold uppercase tracking-[0.12em] text-muted-foreground"
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className={`border-b border-border last:border-b-0 ${i % 2 ? "bg-muted/20" : ""}`}>
                {row.map((cell, j) => (
                  <td key={j} className="px-4 py-3.5 align-top text-foreground/85">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {caption ? (
        <figcaption className="mt-2 text-[12.5px] text-muted-foreground">{caption}</figcaption>
      ) : null}
    </figure>
  )
}
