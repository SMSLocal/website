"use client"

import { useMemo, useState, useTransition } from "react"
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Download,
  ExternalLink,
  FileCode2,
  Loader2,
  MapPinOff,
  RefreshCw,
  Search,
  Send,
  XCircle,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
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
import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { EffectiveEntry } from "@/lib/seo/overrides"
import type { SeoOverride } from "@/lib/seo/store"

const FREQUENCIES = [
  { value: "always", label: "Always" },
  { value: "hourly", label: "Hourly" },
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
  { value: "never", label: "Never" },
] as const

type FreqValue = (typeof FREQUENCIES)[number]["value"]
type PingResult = {
  engine: string
  ok: boolean
  status: number
  detail?: string
}

const PAGE_SIZES = [25, 50, 100, 200]

function defaultPriorityFor(e: EffectiveEntry): number {
  // Light mirror of app/sitemap.ts defaultFor() for the UI display. The real
  // source of truth is sitemap.ts — this is purely so the "Priority" column
  // isn't blank for rows that have no override yet.
  if (e.path === "/") return 1.0
  if (e.path === "/pricing") return 0.9
  if (e.path === "/products" || e.path.startsWith("/products/")) return 0.9
  if (e.path === "/blog" || e.path === "/developers/api-docs") return 0.8
  if (e.path === "/solutions" || e.path.startsWith("/solutions/")) return 0.8
  if (e.path.startsWith("/legal/")) return 0.5
  if (e.kind === "help-article") return 0.5
  if (e.kind === "blog" || e.kind === "story") return 0.7
  return 0.7
}

function defaultFreqFor(e: EffectiveEntry): FreqValue {
  if (e.path.startsWith("/legal/")) return "yearly"
  if (e.path === "/signup" || e.path === "/company/contact") return "yearly"
  if (
    e.path === "/" ||
    e.path === "/blog" ||
    e.path === "/pricing" ||
    e.path === "/resources/help" ||
    e.kind === "help-category"
  ) {
    return "weekly"
  }
  return "monthly"
}

export function SitemapManager({
  initialEntries,
}: {
  initialEntries: EffectiveEntry[]
}) {
  const [entries, setEntries] = useState<EffectiveEntry[]>(initialEntries)
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState<"all" | "included" | "excluded">("all")
  const [pageSize, setPageSize] = useState(50)
  const [page, setPage] = useState(1)
  const [xmlOpen, setXmlOpen] = useState(false)
  const [xml, setXml] = useState<string>("")
  const [loadingXml, setLoadingXml] = useState(false)
  const [pinging, setPinging] = useState(false)
  const [pingResults, setPingResults] = useState<PingResult[] | null>(null)
  const [isPending, startTransition] = useTransition()
  const [savingPath, setSavingPath] = useState<string | null>(null)

  const stats = useMemo(() => {
    let included = 0
    let excluded = 0
    let noindex = 0
    let overridden = 0
    for (const e of entries) {
      if (e.includedInSitemap) included++
      else excluded++
      if (e.noindex) noindex++
      if (
        e.override?.priority !== undefined ||
        e.override?.changeFrequency !== undefined ||
        e.override?.includeInSitemap !== undefined
      ) {
        overridden++
      }
    }
    return { included, excluded, noindex, overridden, total: entries.length }
  }, [entries])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return entries.filter((e) => {
      if (filter === "included" && !e.includedInSitemap) return false
      if (filter === "excluded" && e.includedInSitemap) return false
      if (!q) return true
      return (
        e.path.toLowerCase().includes(q) ||
        (e.title ?? "").toLowerCase().includes(q) ||
        (e.titleAbsolute ?? "").toLowerCase().includes(q)
      )
    })
  }, [entries, query, filter])

  const total = filtered.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const currentPage = Math.min(page, totalPages)
  const start = (currentPage - 1) * pageSize
  const visible = filtered.slice(start, start + pageSize)

  async function patchEntry(path: string, patch: Partial<SeoOverride>) {
    setSavingPath(path)
    try {
      const res = await fetch("/api/dev/seo/pages", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path, patch }),
      })
      if (!res.ok) {
        console.log("[v0] sitemap save failed", await res.text())
        return
      }
      const data = (await res.json()) as { override: SeoOverride }
      setEntries((prev) =>
        prev.map((e) => {
          if (e.path !== path) return e
          const next: EffectiveEntry = {
            ...e,
            override: data.override,
            includedInSitemap:
              data.override.includeInSitemap ?? !(data.override.noindex ?? e.noindex),
            priority: data.override.priority ?? e.priority,
            changeFrequency: data.override.changeFrequency ?? e.changeFrequency,
            noindex: data.override.noindex ?? e.noindex,
            overridden: true,
          }
          return next
        }),
      )
    } finally {
      setSavingPath(null)
    }
  }

  const toggleInclude = (entry: EffectiveEntry, next: boolean) => {
    startTransition(() => {
      patchEntry(entry.path, { includeInSitemap: next })
    })
  }

  const setPriorityFor = (entry: EffectiveEntry, value: string) => {
    const pr = Number(value)
    if (Number.isNaN(pr)) return
    startTransition(() => {
      patchEntry(entry.path, { priority: Math.max(0, Math.min(1, pr)) })
    })
  }

  const setFrequencyFor = (entry: EffectiveEntry, value: FreqValue) => {
    startTransition(() => {
      patchEntry(entry.path, { changeFrequency: value })
    })
  }

  async function loadXml() {
    setLoadingXml(true)
    try {
      const res = await fetch("/api/dev/seo/sitemap-xml")
      const text = await res.text()
      setXml(text)
    } catch {
      setXml("<!-- Failed to fetch sitemap. -->")
    } finally {
      setLoadingXml(false)
    }
  }

  async function openXml() {
    setXmlOpen(true)
    if (!xml) await loadXml()
  }

  async function pingEngines() {
    setPinging(true)
    setPingResults(null)
    try {
      const res = await fetch("/api/dev/seo/ping", { method: "POST" })
      const data = (await res.json()) as { results?: PingResult[] }
      setPingResults(data.results ?? [])
    } catch {
      setPingResults([
        { engine: "network", ok: false, status: 0, detail: "Request failed" },
      ])
    } finally {
      setPinging(false)
    }
  }

  function downloadXml() {
    if (!xml) return
    const blob = new Blob([xml], { type: "application/xml" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "sitemap.xml"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
          <p className="text-[12px] font-medium uppercase tracking-wide text-muted-foreground">
            In sitemap
          </p>
          <p className="mt-1 text-2xl font-semibold tabular-nums">
            {stats.included}
            <span className="ml-1 text-[13px] font-normal text-muted-foreground">
              / {stats.total}
            </span>
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
          <p className="text-[12px] font-medium uppercase tracking-wide text-muted-foreground">
            Excluded
          </p>
          <p className="mt-1 text-2xl font-semibold tabular-nums">
            {stats.excluded}
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
          <p className="text-[12px] font-medium uppercase tracking-wide text-muted-foreground">
            Noindex
          </p>
          <p className="mt-1 text-2xl font-semibold tabular-nums">
            {stats.noindex}
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
          <p className="text-[12px] font-medium uppercase tracking-wide text-muted-foreground">
            Overridden rows
          </p>
          <p className="mt-1 text-2xl font-semibold tabular-nums">
            {stats.overridden}
          </p>
        </div>
      </section>

      <section className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-[14px] font-semibold text-foreground">
            Live sitemap.xml
          </h2>
          <p className="mt-0.5 text-[12.5px] text-muted-foreground">
            Preview the real feed Google &amp; Bing fetch, then notify them of
            changes.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <a href="/sitemap.xml" target="_blank" rel="noreferrer noopener">
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              Open /sitemap.xml
            </a>
          </Button>
          <Button variant="outline" size="sm" onClick={openXml}>
            <FileCode2 className="h-4 w-4" aria-hidden="true" />
            Preview XML
          </Button>
          <Button size="sm" onClick={pingEngines} disabled={pinging}>
            {pinging ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            ) : (
              <Send className="h-4 w-4" aria-hidden="true" />
            )}
            Ping Google &amp; Bing
          </Button>
        </div>
      </section>

      {pingResults ? (
        <section className="rounded-2xl border border-border bg-card p-4 shadow-sm">
          <p className="text-[12px] font-semibold uppercase tracking-wide text-muted-foreground">
            Ping results
          </p>
          <ul className="mt-2 space-y-1.5">
            {pingResults.map((r, i) => (
              <li
                key={`${r.engine}-${i}`}
                className="flex items-center gap-2 text-[13px]"
              >
                {r.ok ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                )}
                <span className="font-mono text-[12px]">{r.engine}</span>
                <span className="text-muted-foreground">
                  · HTTP {r.status || "n/a"}
                  {r.detail ? ` · ${r.detail}` : ""}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-[11px] text-muted-foreground">
            Note: Google deprecated its sitemap ping endpoint in 2023 and now
            prefers Search Console. Bing still processes pings.
          </p>
        </section>
      ) : null}

      <section className="space-y-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
            <InputGroup className="w-full sm:max-w-sm">
              <InputGroupAddon>
                <Search
                  className="h-4 w-4 text-muted-foreground"
                  aria-hidden="true"
                />
              </InputGroupAddon>
              <InputGroupInput
                type="search"
                placeholder="Filter by path or title…"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setPage(1)
                }}
                aria-label="Search URLs"
              />
            </InputGroup>
            <Select
              value={filter}
              onValueChange={(v) => {
                setFilter(v as typeof filter)
                setPage(1)
              }}
            >
              <SelectTrigger className="h-9 w-[160px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All URLs</SelectItem>
                <SelectItem value="included">Only included</SelectItem>
                <SelectItem value="excluded">Only excluded</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="text-[12px] text-muted-foreground">
            {total === 0
              ? "No results"
              : `${start + 1}–${Math.min(start + pageSize, total)} of ${total}`}
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Include</TableHead>
                  <TableHead>URL</TableHead>
                  <TableHead className="w-[130px]">Priority</TableHead>
                  <TableHead className="w-[150px]">Change frequency</TableHead>
                  <TableHead className="w-[110px]">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {visible.map((e) => {
                  const isSaving = savingPath === e.path
                  const prio = e.priority ?? defaultPriorityFor(e)
                  const freq = (e.changeFrequency ??
                    defaultFreqFor(e)) as FreqValue
                  const hasOverride =
                    e.override?.priority !== undefined ||
                    e.override?.changeFrequency !== undefined ||
                    e.override?.includeInSitemap !== undefined
                  return (
                    <TableRow key={e.path}>
                      <TableCell className="align-top">
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={e.includedInSitemap}
                            onCheckedChange={(v) => toggleInclude(e, v)}
                            disabled={e.noindex || isPending || isSaving}
                            aria-label={`Include ${e.path} in sitemap`}
                          />
                          {isSaving ? (
                            <Loader2
                              className="h-3.5 w-3.5 animate-spin text-muted-foreground"
                              aria-hidden="true"
                            />
                          ) : null}
                        </div>
                      </TableCell>
                      <TableCell className="align-top">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[13px] font-medium text-foreground line-clamp-1">
                            {e.titleAbsolute ?? e.title ?? e.path}
                          </span>
                          <span className="font-mono text-[11px] text-muted-foreground">
                            {e.path}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="align-top">
                        <Select
                          value={prio.toFixed(1)}
                          onValueChange={(v) => setPriorityFor(e, v)}
                          disabled={!e.includedInSitemap}
                        >
                          <SelectTrigger className="h-8 w-[100px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[
                              0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0,
                            ].map((v) => (
                              <SelectItem key={v} value={v.toFixed(1)}>
                                {v.toFixed(1)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="align-top">
                        <Select
                          value={freq}
                          onValueChange={(v) =>
                            setFrequencyFor(e, v as FreqValue)
                          }
                          disabled={!e.includedInSitemap}
                        >
                          <SelectTrigger className="h-8 w-[130px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {FREQUENCIES.map((f) => (
                              <SelectItem key={f.value} value={f.value}>
                                {f.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="align-top">
                        <div className="flex flex-col gap-1">
                          {e.noindex ? (
                            <Badge
                              variant="outline"
                              className="border-amber-500/30 bg-amber-500/10 text-[10px] font-medium uppercase tracking-wide text-amber-700 dark:text-amber-300"
                            >
                              Noindex
                            </Badge>
                          ) : !e.includedInSitemap ? (
                            <Badge
                              variant="outline"
                              className="border-destructive/30 bg-destructive/10 text-[10px] font-medium uppercase tracking-wide text-destructive"
                            >
                              <MapPinOff
                                className="mr-1 h-3 w-3"
                                aria-hidden="true"
                              />
                              Excluded
                            </Badge>
                          ) : (
                            <Badge
                              variant="outline"
                              className="border-emerald-500/30 bg-emerald-500/10 text-[10px] font-medium uppercase tracking-wide text-emerald-700 dark:text-emerald-300"
                            >
                              Indexed
                            </Badge>
                          )}
                          {hasOverride ? (
                            <Badge
                              variant="outline"
                              className="border-sky-500/30 bg-sky-500/10 text-[10px] font-medium uppercase tracking-wide text-sky-700 dark:text-sky-300"
                            >
                              Custom
                            </Badge>
                          ) : null}
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
                {visible.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="py-12 text-center text-muted-foreground"
                    >
                      No URLs match the current filter.
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
      </section>

      <Dialog open={xmlOpen} onOpenChange={setXmlOpen}>
        <DialogContent className="max-h-[85vh] max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileCode2 className="h-5 w-5" aria-hidden="true" />
              /sitemap.xml
            </DialogTitle>
            <DialogDescription>
              Rendered from the static registry, dynamic content, and your Redis
              overrides.
            </DialogDescription>
          </DialogHeader>
          <div className="relative max-h-[60vh] overflow-auto rounded-md bg-muted p-4 font-mono text-[12px] leading-relaxed">
            {loadingXml ? (
              <div className="flex items-center gap-2 text-muted-foreground">
                <RefreshCw
                  className="h-4 w-4 animate-spin"
                  aria-hidden="true"
                />
                Fetching sitemap…
              </div>
            ) : (
              <pre className="whitespace-pre-wrap break-all">{xml}</pre>
            )}
          </div>
          <DialogFooter className="flex-col gap-2 sm:flex-row">
            <Button
              variant="outline"
              onClick={loadXml}
              disabled={loadingXml}
              className="gap-2 bg-transparent"
            >
              <RefreshCw className="h-4 w-4" aria-hidden="true" />
              Refresh
            </Button>
            <Button
              variant="outline"
              onClick={downloadXml}
              disabled={!xml}
              className="gap-2 bg-transparent"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Download
            </Button>
            <Button onClick={pingEngines} disabled={pinging} className="gap-2">
              {pinging ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              ) : (
                <Send className="h-4 w-4" aria-hidden="true" />
              )}
              Ping engines
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
