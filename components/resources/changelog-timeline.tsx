"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowUpRight, Sparkles, TrendingUp, Wrench } from "lucide-react"

export type ChangeKind = "new" | "improved" | "fixed"
export type Change = { kind: ChangeKind; title: string; desc?: string; bullets?: string[] }
export type Release = {
  version: string
  date: string
  type: "Major Release" | "Patch Release"
  changes: Change[]
}

const KIND_META: Record<ChangeKind, { label: string; chip: string; icon: React.ComponentType<{ className?: string }> }> = {
  new: { label: "New", chip: "border-emerald-500/25 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400", icon: Sparkles },
  improved: { label: "Improved", chip: "border-sky-500/25 bg-sky-500/10 text-sky-600 dark:text-sky-400", icon: TrendingUp },
  fixed: { label: "Fixed", chip: "border-rose-500/25 bg-rose-500/10 text-rose-600 dark:text-rose-400", icon: Wrench },
}

export function ChangelogTimeline({ releases }: { releases: Release[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState<Set<number>>(new Set())
  const [progress, setProgress] = useState(0)

  // Reveal cards as they enter the viewport.
  useEffect(() => {
    const els = containerRef.current?.querySelectorAll<HTMLElement>("[data-release]")
    if (!els) return
    const obs = new IntersectionObserver(
      (entries) => {
        setVisible((prev) => {
          const next = new Set(prev)
          for (const e of entries) {
            if (e.isIntersecting) next.add(Number(e.target.getAttribute("data-release")))
          }
          return next
        })
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.15 },
    )
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  // Fill the spine as the section scrolls through the viewport.
  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const el = containerRef.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        const vh = window.innerHeight
        const total = rect.height + vh * 0.5
        const scrolled = Math.min(Math.max(vh * 0.5 - rect.top, 0), total)
        setProgress(Math.min(scrolled / total, 1))
      })
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  return (
    <div ref={containerRef} className="relative mx-auto max-w-3xl">
      {/* Spine */}
      <div aria-hidden className="absolute left-[15px] top-2 bottom-2 w-px bg-border sm:left-[19px]" />
      <div
        aria-hidden
        className="absolute left-[15px] top-2 w-px bg-gradient-to-b from-primary via-primary to-transparent sm:left-[19px]"
        style={{ height: `calc(${progress * 100}% )`, transition: "height 0.15s linear" }}
      />

      <ol className="space-y-8">
        {releases.map((r, i) => {
          const isMajor = r.type === "Major Release"
          const shown = visible.has(i)
          return (
            <li
              key={r.version}
              data-release={i}
              className="relative pl-12 sm:pl-16"
              style={{
                opacity: shown ? 1 : 0,
                transform: shown ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1)",
              }}
            >
              {/* Node */}
              <span
                className={`absolute left-0 top-1.5 inline-flex h-8 w-8 items-center justify-center rounded-full border-2 bg-background transition-colors sm:h-10 sm:w-10 ${
                  shown ? "border-primary" : "border-border"
                }`}
              >
                <span className={`h-2.5 w-2.5 rounded-full transition-colors ${shown ? "bg-primary" : "bg-border"}`} />
              </span>

              {/* Card */}
              <article className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg sm:p-7">
                <span aria-hidden className="absolute inset-x-6 -top-px hidden h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100 sm:block" />
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-xl font-semibold tracking-tight text-foreground">{r.version}</h3>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.1em] ${
                      isMajor
                        ? "border border-primary/25 bg-primary/10 text-primary"
                        : "border border-border bg-muted text-muted-foreground"
                    }`}
                  >
                    {r.type}
                  </span>
                  <time className="ml-auto text-[12.5px] font-medium text-muted-foreground">{r.date}</time>
                </div>

                <ul className="mt-5 space-y-4">
                  {r.changes.map((c) => {
                    const meta = KIND_META[c.kind]
                    const Icon = meta.icon
                    return (
                      <li key={c.title} className="flex gap-3">
                        <span className={`mt-0.5 inline-flex h-6 w-[88px] shrink-0 items-center justify-center gap-1 rounded-full border text-[10.5px] font-bold uppercase tracking-wide ${meta.chip}`}>
                          <Icon className="h-3 w-3" />
                          {meta.label}
                        </span>
                        <div className="min-w-0">
                          <p className="text-[14px] font-semibold tracking-tight text-foreground">{c.title}</p>
                          {c.desc ? (
                            <p className="mt-0.5 text-[13px] leading-relaxed text-muted-foreground">{c.desc}</p>
                          ) : null}
                          {c.bullets ? (
                            <ul className="mt-1.5 flex flex-wrap gap-1.5">
                              {c.bullets.map((b) => (
                                <li key={b} className="inline-flex items-center rounded-md bg-secondary px-2 py-0.5 text-[11.5px] font-medium text-secondary-foreground">
                                  {b}
                                </li>
                              ))}
                            </ul>
                          ) : null}
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </article>
            </li>
          )
        })}
      </ol>

      {/* Tail */}
      <div className="relative mt-8 pl-12 sm:pl-16">
        <span className="absolute left-0 top-1 inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-dashed border-border bg-background sm:h-10 sm:w-10">
          <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground" />
        </span>
        <p className="pt-2 text-[13.5px] text-muted-foreground">
          And we're just getting started — a new release ships every two weeks.
        </p>
      </div>
    </div>
  )
}
