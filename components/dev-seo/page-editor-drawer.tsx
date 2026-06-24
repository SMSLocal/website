"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import {
  Check,
  Loader2,
  Plus,
  RotateCcw,
  Save,
  Target,
  X,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { analyzeSeo } from "@/lib/seo/rank-math"
import type { EffectiveEntry } from "@/lib/seo/overrides"
import type { SeoOverride } from "@/lib/seo/store"
import { RankMathAnalysis } from "./rank-math-analysis"
import { SerpPreview } from "./serp-preview"

type EditorTab = "edit" | "preview" | "analysis"

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

export function PageEditorDrawer({
  entry,
  open,
  onOpenChange,
  onSaved,
}: {
  entry: EffectiveEntry | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSaved: (updated: EffectiveEntry) => void
}) {
  const [tab, setTab] = useState<EditorTab>("edit")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [keywordsText, setKeywordsText] = useState("")
  const [focusKeyword, setFocusKeyword] = useState("")
  const [ogImage, setOgImage] = useState("")
  const [noindex, setNoindex] = useState(false)
  const [includeInSitemap, setIncludeInSitemap] = useState(true)
  const [priority, setPriority] = useState<string>("")
  const [changeFrequency, setChangeFrequency] = useState<"" | FreqValue>("")
  const [saving, setSaving] = useState(false)
  const [resetting, setResetting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const lastPath = useRef<string | null>(null)

  useEffect(() => {
    if (!entry) return
    if (lastPath.current === entry.path && open) return
    lastPath.current = entry.path
    setTab("edit")
    setTitle(entry.titleAbsolute ?? entry.title ?? "")
    setDescription(entry.description)
    setKeywordsText(entry.keywords.join(", "))
    // Pre-fill the focus keyword field with whatever's effective right now —
    // admin override if set, otherwise the registry's recommended default.
    // This way, opening a fresh page in the editor already shows the
    // recommended focus keyword instead of a blank input.
    setFocusKeyword(entry.focusKeyword ?? "")
    setOgImage(entry.ogImage ?? "")
    setNoindex(entry.noindex)
    setIncludeInSitemap(entry.includedInSitemap)
    setPriority(
      typeof entry.priority === "number" ? entry.priority.toFixed(1) : "",
    )
    setChangeFrequency((entry.changeFrequency ?? "") as "" | FreqValue)
    setError(null)
  }, [entry, open])

  const keywords = useMemo(
    () =>
      keywordsText
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean),
    [keywordsText],
  )

  const analysis = useMemo(() => {
    if (!entry) return null
    return analyzeSeo({
      title,
      description,
      keywords,
      path: entry.path,
      focusKeyword,
    })
  }, [entry, title, description, keywords, focusKeyword])

  if (!entry) return null
  const current: EffectiveEntry = entry

  async function save() {
    setSaving(true)
    setError(null)
    const patch: Partial<SeoOverride> = {
      title: title.trim(),
      description: description.trim(),
      keywords,
      focusKeyword: focusKeyword.trim(),
      ogImage: ogImage.trim(),
      noindex,
      includeInSitemap,
    }
    const pr = parseFloat(priority)
    if (!Number.isNaN(pr) && pr >= 0 && pr <= 1) patch.priority = pr
    if (changeFrequency) patch.changeFrequency = changeFrequency as FreqValue

    try {
      const res = await fetch("/api/dev/seo/pages", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: current.path, patch }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data?.message ?? data?.error ?? "Save failed.")
        setSaving(false)
        return
      }
      onSaved({
        ...current,
        ...patch,
        overridden: true,
        override: data.override as SeoOverride,
        titleAbsolute: current.titleAbsolute ? title.trim() : current.titleAbsolute,
        title: title.trim(),
        description: description.trim(),
        keywords,
        noindex,
        includedInSitemap: includeInSitemap,
        priority: patch.priority,
        changeFrequency: patch.changeFrequency,
      })
      onOpenChange(false)
    } catch {
      setError("Network error. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  async function resetToDefault() {
    if (!current.overridden) {
      onOpenChange(false)
      return
    }
    setResetting(true)
    setError(null)
    try {
      const res = await fetch(
        `/api/dev/seo/pages?path=${encodeURIComponent(current.path)}`,
        { method: "DELETE" },
      )
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setError(data?.error ?? "Reset failed.")
        setResetting(false)
        return
      }
      onSaved({
        ...current,
        overridden: false,
        override: {},
      })
      onOpenChange(false)
    } catch {
      setError("Network error. Please try again.")
    } finally {
      setResetting(false)
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full overflow-y-auto p-0 sm:max-w-xl"
      >
        <SheetHeader className="border-b border-border px-6 py-4">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <SheetTitle className="truncate text-[15px] font-semibold">
                {entry.path}
              </SheetTitle>
              <SheetDescription className="mt-0.5 text-[12px]">
                {entry.kindLabel}
                {entry.overridden ? (
                  <Badge
                    variant="outline"
                    className="ml-2 border-sky-500/30 bg-sky-500/10 text-[10px] font-medium uppercase tracking-wide text-sky-700 dark:text-sky-300"
                  >
                    Overridden
                  </Badge>
                ) : null}
              </SheetDescription>
            </div>
          </div>

          <div className="mt-4 flex gap-1 border-b border-border">
            {(
              [
                { k: "edit", label: "Edit" },
                { k: "preview", label: "Preview" },
                { k: "analysis", label: "Analysis" },
              ] as { k: EditorTab; label: string }[]
            ).map((t) => (
              <button
                key={t.k}
                type="button"
                className={`relative px-3 py-2 text-[13px] font-medium transition ${
                  tab === t.k
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setTab(t.k)}
              >
                {t.label}
                {t.k === "analysis" && analysis ? (
                  <span className="ml-1.5 rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-semibold tabular-nums">
                    {analysis.score}
                  </span>
                ) : null}
                {tab === t.k ? (
                  <span className="absolute -bottom-px left-0 right-0 h-0.5 rounded-full bg-primary" />
                ) : null}
              </button>
            ))}
          </div>
        </SheetHeader>

        <div className="px-6 py-5">
          {tab === "edit" ? (
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="seo-title">Title</FieldLabel>
                <Input
                  id="seo-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength={120}
                />
                <FieldDescription>
                  {title.length} characters · Google truncates beyond 60.
                </FieldDescription>
              </Field>

              <Field>
                <FieldLabel htmlFor="seo-description">Meta description</FieldLabel>
                <Textarea
                  id="seo-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  maxLength={320}
                />
                <FieldDescription>
                  {description.length} characters · Aim for 120–160.
                </FieldDescription>
              </Field>

              <Field>
                <FieldLabel htmlFor="seo-focus">Focus keyword</FieldLabel>
                <Input
                  id="seo-focus"
                  value={focusKeyword}
                  onChange={(e) => setFocusKeyword(e.target.value)}
                  placeholder="e.g. bulk sms india"
                />
                <FieldDescription>
                  The keyword you want this page to rank for. Drives the analysis score.
                </FieldDescription>
              </Field>

              <Field>
                <FieldLabel htmlFor="seo-keywords">Meta keywords</FieldLabel>
                <Textarea
                  id="seo-keywords"
                  value={keywordsText}
                  onChange={(e) => setKeywordsText(e.target.value)}
                  rows={2}
                  placeholder="Comma-separated list"
                />

                {/* Live preview of the parsed list. The focus keyword (if set)
                    is rendered first with a distinct ring + Target icon so it's
                    visually unmistakable that it's already in use. If the focus
                    keyword isn't in the list yet, a one-click "Add to list"
                    chip appends it without forcing the user to retype it. */}
                {keywords.length > 0 || focusKeyword.trim() ? (
                  <div className="mt-2 flex flex-wrap items-center gap-1.5">
                    {(() => {
                      const fk = focusKeyword.trim().toLowerCase()
                      const fkInList = fk
                        ? keywords.some((k) => k.toLowerCase() === fk)
                        : false
                      return (
                        <>
                          {keywords.map((k) => {
                            const isFocus = fk && k.toLowerCase() === fk
                            return (
                              <Badge
                                key={k}
                                variant="secondary"
                                className={
                                  isFocus
                                    ? "border-primary/40 bg-primary/10 text-[11px] font-medium text-primary ring-1 ring-primary/30"
                                    : "text-[11px]"
                                }
                              >
                                {isFocus ? (
                                  <Target
                                    className="mr-1 h-3 w-3"
                                    aria-hidden="true"
                                  />
                                ) : null}
                                {k}
                                {isFocus ? (
                                  <span className="sr-only">
                                    {" "}
                                    (focus keyword, already in list)
                                  </span>
                                ) : null}
                              </Badge>
                            )
                          })}
                          {fk && !fkInList ? (
                            <button
                              type="button"
                              onClick={() => {
                                const trimmed = focusKeyword.trim()
                                const next = keywordsText.trim()
                                  ? `${keywordsText.replace(/,\s*$/, "")}, ${trimmed}`
                                  : trimmed
                                setKeywordsText(next)
                              }}
                              className="inline-flex items-center gap-1 rounded-md border border-dashed border-primary/40 bg-primary/5 px-1.5 py-0.5 text-[11px] font-medium text-primary transition hover:bg-primary/10"
                              aria-label={`Add focus keyword "${focusKeyword.trim()}" to keywords list`}
                            >
                              <Plus
                                className="h-3 w-3"
                                aria-hidden="true"
                              />
                              Add focus keyword
                            </button>
                          ) : null}
                        </>
                      )
                    })()}
                  </div>
                ) : null}

                {/* Status line under the chips — confirms whether the focus
                    keyword is present, with green check if so. */}
                <FieldDescription className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span>
                    <span className="tabular-nums">{keywords.length}</span>{" "}
                    keywords · 3–10 recommended
                  </span>
                  {focusKeyword.trim() ? (
                    keywords.some(
                      (k) =>
                        k.toLowerCase() === focusKeyword.trim().toLowerCase(),
                    ) ? (
                      <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                        <Check className="h-3 w-3" aria-hidden="true" />
                        Focus keyword in list
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400">
                        <Target className="h-3 w-3" aria-hidden="true" />
                        Focus keyword not in list
                      </span>
                    )
                  ) : null}
                </FieldDescription>
              </Field>

              <Field>
                <FieldLabel htmlFor="seo-og">OG image path</FieldLabel>
                <Input
                  id="seo-og"
                  value={ogImage}
                  onChange={(e) => setOgImage(e.target.value)}
                  placeholder="/og-default.png"
                />
                <FieldDescription>
                  1200×630 JPG or PNG. Leave blank to use the site default.
                </FieldDescription>
              </Field>

              <div className="rounded-xl border border-border bg-muted/30 p-4">
                <p className="mb-3 text-[12px] font-semibold uppercase tracking-wide text-muted-foreground">
                  Indexing & sitemap
                </p>
                <FieldGroup>
                  <Field orientation="horizontal">
                    <div className="flex-1">
                      <FieldLabel htmlFor="seo-noindex">Discourage search engines</FieldLabel>
                      <FieldDescription>
                        Emits <code>noindex,nofollow</code> and removes the page from the sitemap.
                      </FieldDescription>
                    </div>
                    <Switch
                      id="seo-noindex"
                      checked={noindex}
                      onCheckedChange={setNoindex}
                    />
                  </Field>
                  <Field orientation="horizontal">
                    <div className="flex-1">
                      <FieldLabel htmlFor="seo-include">Include in sitemap.xml</FieldLabel>
                      <FieldDescription>
                        When off, the URL is omitted even if not noindex.
                      </FieldDescription>
                    </div>
                    <Switch
                      id="seo-include"
                      checked={includeInSitemap}
                      onCheckedChange={setIncludeInSitemap}
                      disabled={noindex}
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="seo-priority">Sitemap priority</FieldLabel>
                    <Input
                      id="seo-priority"
                      type="number"
                      min={0}
                      max={1}
                      step={0.1}
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                      placeholder="0.7"
                    />
                    <FieldDescription>
                      0.0 – 1.0. Leave blank to use the heuristic default.
                    </FieldDescription>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="seo-freq">Change frequency</FieldLabel>
                    <Select
                      value={changeFrequency}
                      onValueChange={(v) => setChangeFrequency(v as FreqValue)}
                    >
                      <SelectTrigger id="seo-freq">
                        <SelectValue placeholder="Use default" />
                      </SelectTrigger>
                      <SelectContent>
                        {FREQUENCIES.map((f) => (
                          <SelectItem key={f.value} value={f.value}>
                            {f.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                </FieldGroup>
              </div>
            </FieldGroup>
          ) : null}

          {tab === "preview" ? (
            <div className="space-y-4">
              <SerpPreview
                title={title}
                description={description}
                path={entry.path}
                noindex={noindex}
              />
              <div className="rounded-xl border border-border bg-card p-4">
                <p className="mb-2 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                  Metadata summary
                </p>
                <dl className="space-y-2 text-[13px]">
                  <div className="flex gap-3">
                    <dt className="w-32 shrink-0 text-muted-foreground">URL</dt>
                    <dd className="font-mono text-[12px] break-all">{entry.path}</dd>
                  </div>
                  <div className="flex gap-3">
                    <dt className="w-32 shrink-0 text-muted-foreground">Keywords</dt>
                    <dd className="flex flex-wrap gap-1">
                      {keywords.length === 0 ? (
                        <span className="text-muted-foreground">None</span>
                      ) : (
                        keywords.map((k) => (
                          <Badge key={k} variant="secondary" className="text-[11px]">
                            {k}
                          </Badge>
                        ))
                      )}
                    </dd>
                  </div>
                  <div className="flex gap-3">
                    <dt className="w-32 shrink-0 text-muted-foreground">Focus</dt>
                    <dd>{focusKeyword || <span className="text-muted-foreground">Not set</span>}</dd>
                  </div>
                  <div className="flex gap-3">
                    <dt className="w-32 shrink-0 text-muted-foreground">OG image</dt>
                    <dd className="font-mono text-[12px] break-all">
                      {ogImage || <span className="text-muted-foreground">Default</span>}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          ) : null}

          {tab === "analysis" && analysis ? (
            <RankMathAnalysis report={analysis} />
          ) : null}
        </div>

        <div className="sticky bottom-0 border-t border-border bg-card px-6 py-4">
          {error ? (
            <p
              role="alert"
              className="mb-3 rounded-lg border border-destructive/40 bg-destructive/5 px-3 py-2 text-[12px] text-destructive"
            >
              {error}
            </p>
          ) : null}
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
            <Button
              type="button"
              variant="ghost"
              onClick={resetToDefault}
              disabled={resetting || !entry.overridden}
            >
              {resetting ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              ) : (
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
              )}
              Reset to default
            </Button>
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                <X className="h-4 w-4" aria-hidden="true" />
                Cancel
              </Button>
              <Button type="button" onClick={save} disabled={saving}>
                {saving ? (
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                ) : (
                  <Save className="h-4 w-4" aria-hidden="true" />
                )}
                Save changes
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
