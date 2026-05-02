"use client"

import { useEffect, useState } from "react"
import type { BlogTocItem } from "@/lib/blog"

export function BlogToc({ items }: { items: BlogTocItem[] }) {
  const [active, setActive] = useState<string>("")

  useEffect(() => {
    const targets = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => !!el)
    if (!targets.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: "-100px 0px -65% 0px", threshold: 0 },
    )
    targets.forEach((t) => observer.observe(t))
    return () => observer.disconnect()
  }, [items])

  return (
    <nav
      aria-label="Table of contents"
      className="sticky top-24 hidden max-h-[calc(100vh-8rem)] w-[240px] shrink-0 overflow-y-auto pr-2 xl:block"
    >
      <p className="mb-3 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        On this page
      </p>
      <ul className="flex flex-col border-l border-border">
        {items.map((item) => {
          const isActive = active === item.id
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`relative -ml-px flex items-center border-l py-1.5 pl-3 text-[13px] transition ${
                  isActive
                    ? "border-primary font-medium text-foreground"
                    : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
                }`}
              >
                {item.label}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
