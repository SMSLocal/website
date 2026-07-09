"use client"

import { useMemo, useState } from "react"
import {
  ChevronLeft,
  ChevronRight,
  EyeOff,
  MapPinOff,
  Pencil,
  Search,
  SlidersHorizontal,
  ExternalLink,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { analyzeSeo, type RankMathReport } from "@/lib/seo/rank-math"
import type { EffectiveEntry } from "@/lib/seo/overrides"
import { PageEditorDrawer } from "./page-editor-drawer"
import { ScoreRing } from "./score-ring"

type KindFilter = "all" | "static" | "blog" | "story" | "help-category" | "help-article"
type StatusFilter = "all" | "overridden" | "default" | "noindex" | "excluded"
type ScoreFilter = "all" | "excellent" | "good" | "needs" | "poor" | "none"

const PAGE_SIZES = [25, 50, 100, 200]

function lengthTone(value: number, min: number, max: number) {
  if (value === 0) return "text-red-600 dark:text-red-400"
  if (value < min || value > max) return "text-amber-600 dark:text-amber-400"
  return "text-emerald-600 dark:text-emerald-400"
}

function scoreForEntry(e: EffectiveEntry): RankMathReport {
  return analyzeSeo({
    title: e.titleAbsolute ?? e.title,
    description: e.description,
    keywords: e.keywords,
    path: e.path,
    focusKeyword: e.focusKeyword ?? "",
  })
}

export function PagesTable({
  initialEntries,
}: {
  initialEntries: EffectiveEntry[]
}) {
  const [entries, setEntries] = useState<EffectiveEntry[]>(initialEntries)
  const [query, setQuery] = useState("")
  const [kind, setKind] = useState<KindFilter>("all")
  const [status, setStatus] = useState<StatusFilter>("all")
  const [scoreFilter, setScoreFilter] = useState<ScoreFilter>("all")
  const [pageSize, setPageSize] = useState(50)
  const [page, setPage] = useState(1)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [editing, setEditing] = useState<EffectiveEntry | null>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return entries.filter((e) => {
      if (kind !== "all" && e.kind !== kind) return false
      if (status === "overridden" && !e.overridden) return false
      if (status === "default" && e.overridden) return false
      if (status === "noindex" && !e.noindex) return false
      if (status === "excluded" && e.includedInSitemap) return false
      if (scoreFilter !== "all") {
        const fk = e.focusKeyword ?? ""
        if (scoreFilter === "none") {
          if (fk) return false
        } else {
          if (!fk) return false
          const r = scoreForEntry(e)
          if (scoreFilter === "excellent" && r.grade !== "excellent") return false
          if (scoreFilter === "good" && r.grade !== "good") return false
          if (scoreFilter === "needs" && r.grade !== "needs-improvement") return false
          if (scoreFilter === "poor" && r.grade !== "poor") return false
        }
      }
      if (!q) return true
      const hay = [
        e.path,
        e.title,
        e.titleAbsolute ?? "",
        e.description,
        e.keywords.join(" "),
        e.focusKeyword ?? "",
      ]
        .join(" ")
        .toLowerCase()
      return hay.includes(q)
    })
  }, [entries, query, kind, status, scoreFilter])

  const total = filtered.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const currentPage = Math.min(page, totalPages)
  const start = (currentPage - 1) * pageSize
  const visible = filtered.slice(start, start + pageSize)

  const openEditor = (entry: EffectiveEntry) => {
    setEditing(entry)
    setDrawerOpen(true)
  }

  const handleSaved = (updated: EffectiveEntry) => {
    setEntries((prev) =>
      prev.map((e) => (e.path === updated.path ? updated : e)),
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
          <InputGroup className="w-full sm:max-w-sm">
            <InputGroupAddon>
              <Search className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            </InputGroupAddon>
            <InputGroupInput
              type="search"
              placeholder="Search path, title, description, keywords…"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setPage(1)
              }}
              aria-label="Search pages"
            />
          </InputGroup>
          <div className="flex flex-wrap items-center gap-2 text-[12px] text-muted-foreground">
            <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
            <Select
              value={kind}
              onValueChange={(v) => {
                setKind(v as KindFilter)
                setPage(1)
              }}
            >
              <SelectTrigger className="h-9 w-[150px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All types</SelectItem>
                <SelectItem value="static">Pages</SelectItem>
                <SelectItem value="blog">Blog posts</SelectItem>
                <SelectItem value="story">Customer stories</SelectItem>
                <SelectItem value="help-category">Help categories</SelectItem>
                <SelectItem value="help-article">Help articles</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={status}
              onValueChange={(v) => {
                setStatus(v as StatusFilter)
                setPage(1)
              }}
            >
              <SelectTrigger className="h-9 w-[160px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="overridden">Overridden</SelectItem>
                <SelectItem value="default">Defaults only</SelectItem>
                <SelectItem value="noindex">Noindex</SelectItem>
                <SelectItem value="excluded">Excluded from sitemap</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={scoreFilter}
              onValueChange={(v) => {
                setScoreFilter(v as ScoreFilter)
                setPage(1)
              }}
            >
              <SelectTrigger className="h-9 w-[170px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All scores</SelectItem>
                <SelectItem value="excellent">Excellent</SelectItem>
                <SelectItem value="good">Good</SelectItem>
                <SelectItem value="needs">Needs work</SelectItem>
                <SelectItem value="poor">Poor</SelectItem>
                <SelectItem value="none">No focus keyword</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[12px] text-muted-foreground">
          <span className="whitespace-nowrap">
            {total === 0
              ? "No results"
              : `${start + 1}–${Math.min(start + pageSize, total)} of ${total}`}
          </span>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[56px]">Score</TableHead>
                <TableHead>Page</TableHead>
                <TableHead className="hidden lg:table-cell">Description</TableHead>
                <TableHead className="hidden w-[120px] md:table-cell">Status</TableHead>
                <TableHead className="hidden w-[110px] xl:table-cell">Focus</TableHead>
                <TableHead className="w-[60px]" aria-label="Actions" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {visible.map((e) => {
                const title = e.titleAbsolute ?? e.title
                const report = scoreForEntry(e)
                const hasFocus = Boolean(e.focusKeyword)
                return (
                  <TableRow
                    key={e.path}
                    className="cursor-pointer hover:bg-muted/40"
                    onClick={() => openEditor(e)}
                  >
                    <TableCell className="align-top">
                      {hasFocus ? (
                        <ScoreRing score={report.score} />
                      ) : (
                        <span
                          className="inline-block h-[36px] w-[36px] rounded-full border border-dashed border-muted-foreground/40"
                          title="No focus keyword"
                        />
                      )}
                    </TableCell>
                    <TableCell className="align-top">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[13px] font-medium text-foreground line-clamp-1">
                          {title || (
                            <span className="italic text-muted-foreground">
                              No title
                            </span>
                          )}
                        </span>
                        <span className="font-mono text-[11px] text-muted-foreground">
                          {e.path}
                        </span>
                        <span className="flex items-center gap-2 text-[11px]">
                          <span className={lengthTone(title.length, 30, 60)}>
                            T {title.length}
                          </span>
                          <span
                            className={lengthTone(e.description.length, 120, 160)}
                          >
                            D {e.description.length}
                          </span>
                          <span className={lengthTone(e.keywords.length, 3, 10)}>
                            K {e.keywords.length}
                          </span>
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden max-w-md align-top text-[12px] text-muted-foreground lg:table-cell">
                      <span className="line-clamp-2">
                        {e.description || (
                          <em className="text-red-600 dark:text-red-400">
                            Missing description
                          </em>
                        )}
                      </span>
                    </TableCell>
                    <TableCell className="hidden align-top md:table-cell">
                      <div className="flex flex-col gap-1">
                        {e.overridden ? (
                          <Badge
                            variant="outline"
                            className="border-sky-500/30 bg-sky-500/10 text-[10px] font-medium uppercase tracking-wide text-sky-700 dark:text-sky-300"
                          >
                            Overridden
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="border-border text-[10px] font-medium uppercase tracking-wide text-muted-foreground"
                          >
                            Default
                          </Badge>
                        )}
                        {e.noindex ? (
                          <Badge
                            variant="outline"
                            className="border-amber-500/30 bg-amber-500/10 text-[10px] font-medium uppercase tracking-wide text-amber-700 dark:text-amber-300"
                          >
                            <EyeOff className="mr-1 h-3 w-3" aria-hidden="true" />
                            Noindex
                          </Badge>
                        ) : null}
                        {!e.includedInSitemap ? (
                          <Badge
                            variant="outline"
                            className="border-destructive/30 bg-destructive/10 text-[10px] font-medium uppercase tracking-wide text-destructive"
                          >
                            <MapPinOff className="mr-1 h-3 w-3" aria-hidden="true" />
                            Excluded
                          </Badge>
                        ) : null}
                      </div>
                    </TableCell>
                    <TableCell className="hidden align-top xl:table-cell">
                      {hasFocus ? (
                        <span className="line-clamp-1 text-[12px] text-foreground">
                          {e.focusKeyword}
                        </span>
                      ) : (
                        <span className="text-[11px] text-muted-foreground">
                          Not set
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="align-top">
                      <div className="flex items-center justify-end gap-1">
                        <a
                          href={e.path}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
                          aria-label={`Open ${e.path} in new tab`}
                          onClick={(ev) => ev.stopPropagation()}
                        >
                          <ExternalLink className="h-4 w-4" aria-hidden="true" />
                        </a>
                        <button
                          type="button"
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
                          aria-label={`Edit ${e.path}`}
                          onClick={(ev) => {
                            ev.stopPropagation()
                            openEditor(e)
                          }}
                        >
                          <Pencil className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
              {visible.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="py-12 text-center text-muted-foreground">
                    No pages match the current filters.
                  </TableCell>
                </TableRow>
              ) : null}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
        <div className="flex items-center gap-2 text-[12px] text-muted-foreground">
          <span>Rows per page</span>
          <Select
            value={String(pageSize)}
            onValueChange={(v) => {
              setPageSize(Number(v))
              setPage(1)
            }}
          >
            <SelectTrigger className="h-8 w-[80px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PAGE_SIZES.map((s) => (
                <SelectItem key={s} value={String(s)}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2 text-[12px] text-muted-foreground">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            Previous
          </Button>
          <span className="tabular-nums">
            Page {currentPage} / {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage >= totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </div>

      <PageEditorDrawer
        entry={editing}
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        onSaved={handleSaved}
      />
    </div>
  )
}
