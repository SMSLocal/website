"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { AI_AGENTIC_FAQS } from "./ai-agentic-faq-data"

export function AiAgenticFaq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="border-t border-border bg-muted/40 py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        {/* Centered header */}
        <div className="text-center">
          <span className="mx-auto inline-flex rounded-full border border-border bg-background px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
            FAQ
          </span>
          <h2 className="mt-4 text-pretty text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
            Common{" "}
            <span className="bg-gradient-to-r from-primary to-[oklch(0.72_0.17_165)] bg-clip-text text-transparent">
              questions
            </span>
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground sm:text-base">
            Straight answers, no sales spin.
          </p>
        </div>

        {/* Animated accordion — one open at a time, matching the home & blog FAQ */}
        <div className="mt-10 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
          {AI_AGENTIC_FAQS.map((item, i) => {
            const on = open === i
            return (
              <div key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpen(on ? null : i)}
                  aria-expanded={on}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-secondary/40"
                >
                  <span className="text-[15px] font-semibold text-foreground">{item.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-primary transition-transform duration-300 ${on ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ease-out ${on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-4 text-[14px] leading-relaxed text-muted-foreground">{item.a}</p>
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
