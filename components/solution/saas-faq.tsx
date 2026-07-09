"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

type QA = { q: string; a: string }

/**
 * Centered single-column FAQ accordion (SMSLocal-style): "FAQ" pill, large
 * centered heading, full-width rows separated by divider lines with a chevron
 * that rotates and a smoothly expanding answer.
 */
export function SaasFaq({
  eyebrow = "FAQ",
  title,
  items,
}: {
  eyebrow?: string
  title: string
  items: QA[]
}) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center">
          <span className="inline-flex rounded-full border border-border bg-muted px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
            {eyebrow}
          </span>
          <h2 className="mt-5 text-pretty text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[44px]">
            {title}
          </h2>
        </div>

        <div className="mt-12 border-t border-border">
          {items.map((it, i) => {
            const isOpen = open === i
            return (
              <div key={it.q} className="border-b border-border">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left transition-colors"
                >
                  <span className={`text-[15px] font-semibold tracking-tight transition-colors sm:text-base ${isOpen ? "text-primary" : "text-foreground"}`}>
                    {it.q}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-180 text-primary" : ""}`}
                  />
                </button>
                <div
                  className="grid transition-all duration-300 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="pb-5 pr-10 text-[14px] leading-relaxed text-muted-foreground">
                      {it.a}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
