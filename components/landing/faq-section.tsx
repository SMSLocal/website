"use client"

import { useState } from "react"
import { ChevronDown, HelpCircle } from "lucide-react"
import { Reveal } from "./reveal"

export function FaqSection({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Reveal className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[12px] font-semibold uppercase tracking-wider text-primary">
            <HelpCircle className="h-3.5 w-3.5" /> FAQ
          </span>
          <h2 className="mt-5 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[44px] lg:leading-[1.1]">
            Common{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">questions</span>
          </h2>
          <p className="mt-4 text-base text-muted-foreground">Straight answers, no sales spin.</p>
        </Reveal>

        <Reveal delay={80} className="mt-10">
          <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
            {items.map((it, i) => {
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
                    <ChevronDown className={`h-5 w-5 shrink-0 text-primary transition-transform duration-300 ${on ? "rotate-180" : ""}`} />
                  </button>
                  <div className={`grid transition-all duration-300 ease-out ${on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                    <div className="overflow-hidden">
                      <p className="px-5 pb-4 text-[13.5px] leading-relaxed text-muted-foreground">{it.a}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
