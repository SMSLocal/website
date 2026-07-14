"use client"

import { Children, isValidElement, useState, type ReactNode } from "react"
import { ChevronDown } from "lucide-react"

type FaqEntry = { q: ReactNode; a: ReactNode }
type ItemProps = { q: ReactNode; children: ReactNode }

/**
 * Marker for a single FAQ entry when using the inline child API:
 *
 *   <BlogFaq>
 *     <BlogFaqItem q="Question?">Answer with <A href="…">a link</A>.</BlogFaqItem>
 *   </BlogFaq>
 *
 * It never renders on its own — BlogFaq reads its props.
 */
export function BlogFaqItem(_props: ItemProps): null {
  return null
}

/**
 * Accordion FAQ for blog posts — same open/close interaction as the home
 * page's FaqSection (components/landing/faq-section.tsx), sized to sit
 * inside the article column. Accepts either an `items` array or a set of
 * <BlogFaqItem> children.
 */
export function BlogFaq({ items, children }: { items?: FaqEntry[]; children?: ReactNode }) {
  const entries: FaqEntry[] =
    items ??
    Children.toArray(children)
      .filter(isValidElement)
      .map((c) => {
        const p = (c as React.ReactElement<ItemProps>).props
        return { q: p.q, a: p.children }
      })

  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="mt-6 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
      {entries.map((it, i) => {
        const on = open === i
        return (
          <div key={i}>
            <button
              type="button"
              onClick={() => setOpen(on ? null : i)}
              aria-expanded={on}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-secondary/40"
            >
              <span className="text-[15px] font-semibold text-foreground">{it.q}</span>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-primary transition-transform duration-300 ${on ? "rotate-180" : ""}`}
              />
            </button>
            <div
              className={`grid transition-all duration-300 ease-out ${on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
            >
              <div className="overflow-hidden">
                <div className="px-5 pb-4 text-[14.5px] leading-relaxed text-muted-foreground">{it.a}</div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
