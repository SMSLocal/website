"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Search, X } from "lucide-react"
import {
  GLOSSARY_CATEGORIES,
  LETTERS,
  SORTED_TERMS,
  type GlossaryCategorySlug,
  type GlossaryTerm,
} from "@/lib/glossary"

type TermsByLetter = Array<{ letter: string; terms: GlossaryTerm[] }>

function groupByLetter(terms: GlossaryTerm[]): TermsByLetter {
  const map = new Map<string, GlossaryTerm[]>()
  for (const t of terms) {
    const key = t.term[0]!.toUpperCase()
    if (!map.has(key)) map.set(key, [])
    map.get(key)!.push(t)
  }
  return Array.from(map.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([letter, terms]) => ({ letter, terms }))
}

function matches(term: GlossaryTerm, needle: string): boolean {
  if (!needle) return true
  const q = needle.toLowerCase()
  return (
    term.term.toLowerCase().includes(q) ||
    (term.abbr?.toLowerCase().includes(q) ?? false) ||
    term.shortDef.toLowerCase().includes(q) ||
    term.longDef.toLowerCase().includes(q) ||
    (term.aliases?.some((a) => a.toLowerCase().includes(q)) ?? false)
  )
}

export function GlossaryBrowser() {
  const [query, setQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<"all" | GlossaryCategorySlug>("all")

  const filtered = useMemo(() => {
    return SORTED_TERMS.filter((t) => {
      if (activeCategory !== "all" && t.category !== activeCategory) return false
      return matches(t, query)
    })
  }, [query, activeCategory])

  const grouped = useMemo(() => groupByLetter(filtered), [filtered])
  const availableLetters = useMemo(() => new Set(grouped.map((g) => g.letter)), [grouped])

  return (
    <div className="mx-auto max-w-6xl">
      {/* Search + filter bar */}
      <div className="sticky top-[64px] z-30 -mx-4 border-b border-foreground/5 bg-background/95 px-4 py-4 backdrop-blur sm:-mx-6 sm:px-6">
        <div className="flex flex-col gap-3">
          <div className="relative">
            <Search
              aria-hidden
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="search"
              placeholder="Search terms, abbreviations or definitions — e.g. DLT, BSP, OTP, scrubbing"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-11 w-full rounded-xl border border-foreground/10 bg-background pl-10 pr-10 text-sm outline-none ring-0 transition placeholder:text-muted-foreground/60 focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
              aria-label="Search the messaging glossary"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition hover:bg-foreground/5 hover:text-foreground"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            ) : null}
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => setActiveCategory("all")}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                activeCategory === "all"
                  ? "bg-foreground text-background"
                  : "border border-foreground/10 bg-background text-foreground/70 hover:border-foreground/20 hover:text-foreground"
              }`}
            >
              All {SORTED_TERMS.length}
            </button>
            {GLOSSARY_CATEGORIES.map((cat) => {
              const count = SORTED_TERMS.filter((t) => t.category === cat.slug).length
              const isActive = activeCategory === cat.slug
              return (
                <button
                  key={cat.slug}
                  type="button"
                  onClick={() => setActiveCategory(cat.slug)}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                    isActive
                      ? "bg-foreground text-background"
                      : "border border-foreground/10 bg-background text-foreground/70 hover:border-foreground/20 hover:text-foreground"
                  }`}
                >
                  {cat.shortLabel}
                  <span
                    className={`ml-1.5 text-[10px] font-semibold ${
                      isActive ? "text-background/70" : "text-muted-foreground"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* A-Z rail + list */}
      <div className="mt-8 grid gap-8 lg:grid-cols-[64px_1fr]">
        {/* A-Z jump rail (desktop) */}
        <aside className="hidden lg:block">
          <div className="sticky top-[180px] flex flex-col items-center gap-1 rounded-2xl border border-foreground/10 bg-muted/30 px-2 py-3">
            {LETTERS.map((letter) => {
              const enabled = availableLetters.has(letter)
              return (
                <a
                  key={letter}
                  href={enabled ? `#letter-${letter}` : undefined}
                  aria-disabled={!enabled}
                  className={`flex h-7 w-7 items-center justify-center rounded-md text-[11px] font-semibold transition ${
                    enabled
                      ? "text-foreground/70 hover:bg-primary/10 hover:text-primary"
                      : "cursor-default text-muted-foreground/40"
                  }`}
                >
                  {letter}
                </a>
              )
            })}
          </div>
        </aside>

        {/* Results */}
        <div>
          <p className="mb-6 text-xs text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{filtered.length}</span> of{" "}
            {SORTED_TERMS.length} terms
            {query ? (
              <>
                {" "}
                matching <span className="font-semibold text-foreground">&ldquo;{query}&rdquo;</span>
              </>
            ) : null}
            {activeCategory !== "all" ? (
              <>
                {" "}
                in{" "}
                <span className="font-semibold text-foreground">
                  {GLOSSARY_CATEGORIES.find((c) => c.slug === activeCategory)?.title}
                </span>
              </>
            ) : null}
            .
          </p>

          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-foreground/15 bg-muted/20 px-6 py-16 text-center">
              <p className="text-sm font-semibold text-foreground">No terms matched.</p>
              <p className="mt-1.5 text-xs text-muted-foreground">
                Try a shorter query, a different category, or clear the filters.
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery("")
                  setActiveCategory("all")
                }}
                className="mt-4 inline-flex h-8 items-center rounded-md border border-foreground/15 bg-background px-3 text-xs font-medium text-foreground transition hover:border-primary/40 hover:text-primary"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="space-y-12">
              {grouped.map(({ letter, terms }) => (
                <section key={letter} id={`letter-${letter}`} className="scroll-mt-48">
                  <div className="flex items-baseline gap-3 border-b border-foreground/10 pb-3">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground">{letter}</h2>
                    <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                      {terms.length} {terms.length === 1 ? "term" : "terms"}
                    </span>
                  </div>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    {terms.map((t) => (
                      <article
                        key={t.slug}
                        id={t.slug}
                        className="group scroll-mt-48 rounded-2xl border border-foreground/10 bg-background p-5 transition hover:border-primary/30 hover:shadow-sm"
                      >
                        <div className="flex flex-wrap items-baseline gap-2">
                          <h3 className="text-base font-semibold text-foreground">{t.term}</h3>
                          {t.abbr ? (
                            <span className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[10px] font-semibold text-muted-foreground">
                              {t.abbr}
                            </span>
                          ) : null}
                          <span className="ml-auto inline-flex items-center rounded-full border border-foreground/10 bg-muted/40 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                            {
                              GLOSSARY_CATEGORIES.find((c) => c.slug === t.category)
                                ?.shortLabel
                            }
                          </span>
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-foreground/85">
                          {t.shortDef}
                        </p>
                        <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">
                          {t.longDef}
                        </p>
                        {t.example ? (
                          <p className="mt-3 rounded-lg border border-foreground/5 bg-muted/30 px-3 py-2 text-[12px] leading-relaxed text-foreground/75">
                            <span className="font-semibold text-foreground/90">Example — </span>
                            {t.example}
                          </p>
                        ) : null}
                        {t.relatedSlugs && t.relatedSlugs.length ? (
                          <div className="mt-4 flex flex-wrap gap-1.5">
                            {t.relatedSlugs.map((slug) => {
                              const related = SORTED_TERMS.find((x) => x.slug === slug)
                              if (!related) return null
                              return (
                                <Link
                                  key={slug}
                                  href={`#${slug}`}
                                  className="rounded-md border border-foreground/10 bg-background px-2 py-0.5 text-[11px] font-medium text-foreground/70 transition hover:border-primary/30 hover:text-primary"
                                >
                                  {related.term}
                                </Link>
                              )
                            })}
                          </div>
                        ) : null}
                      </article>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
