"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

export type DocsSidebarSection = {
  title: string
  items: { href: string; label: string; badge?: string }[]
}

export function DocsSidebar({ sections }: { sections: DocsSidebarSection[] }) {
  const [active, setActive] = useState<string>("")

  useEffect(() => {
    const allIds = sections.flatMap((s) => s.items.map((i) => i.href.replace("#", "")))
    const targets = allIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el)

    if (!targets.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to the top that's intersecting.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (visible) setActive("#" + visible.target.id)
      },
      { rootMargin: "-100px 0px -60% 0px", threshold: 0 },
    )

    targets.forEach((t) => observer.observe(t))
    return () => observer.disconnect()
  }, [sections])

  return (
    <nav
      aria-label="API documentation sections"
      className="sticky top-24 hidden max-h-[calc(100vh-8rem)] w-[240px] shrink-0 overflow-y-auto pr-2 lg:block"
    >
      <ul className="flex flex-col gap-6">
        {sections.map((section) => (
          <li key={section.title}>
            <p className="mb-2 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {section.title}
            </p>
            <ul className="flex flex-col border-l border-border">
              {section.items.map((item) => {
                const isActive = active === item.href
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`relative -ml-px flex items-center gap-2 border-l py-1.5 pl-3 text-[13.5px] transition ${
                        isActive
                          ? "border-primary font-medium text-foreground"
                          : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
                      }`}
                    >
                      <span>{item.label}</span>
                      {item.badge ? (
                        <span className="inline-flex items-center rounded-sm bg-muted px-1.5 py-px text-[9.5px] font-semibold uppercase tracking-wider text-muted-foreground">
                          {item.badge}
                        </span>
                      ) : null}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  )
}
