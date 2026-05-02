"use client"

import { useState } from "react"
import { ArrowRight, Sparkles, X } from "lucide-react"

export function AnnouncementStrip() {
  const [open, setOpen] = useState(true)
  if (!open) return null

  return (
    <div
      aria-live="polite"
      className="relative w-full bg-[oklch(0.22_0.04_60)] text-[oklch(0.98_0.02_82)]"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2 text-[13px] sm:px-6">
        <div className="flex flex-1 items-center justify-center gap-2 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/20 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-accent">
            <Sparkles className="h-3 w-3" />
            New
          </span>
          <a
            href="/products/ai-agents"
            className="group inline-flex items-center gap-1.5 font-medium hover:underline"
          >
            AI WhatsApp agents that reply in 8 Indian languages. Launch yours in 10 minutes
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Dismiss announcement"
          className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-white/70 hover:bg-white/10 hover:text-white"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
}
