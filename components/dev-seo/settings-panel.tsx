"use client"

import { useState } from "react"
import {
  AlertTriangle,
  CheckCircle2,
  EyeOff,
  Globe,
  Loader2,
  Save,
  ShieldCheck,
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
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import type { SeoSettings } from "@/lib/seo/store"

const DEFAULT_BLOCKED_BOTS = [
  "AhrefsBot",
  "SemrushBot",
  "MJ12bot",
  "DotBot",
  "PetalBot",
  "GPTBot",
]

function parseLines(text: string): string[] {
  return text
    .split(/[\n,]/)
    .map((s) => s.trim())
    .filter(Boolean)
    .filter((v, i, arr) => arr.indexOf(v) === i)
    .slice(0, 40)
}

function formatLines(values: string[] | undefined): string {
  return (values ?? []).join("\n")
}

export function SettingsPanel({
  initialSettings,
}: {
  initialSettings: SeoSettings
}) {
  const [settings, setSettings] = useState<SeoSettings>(initialSettings)
  const [defaultInclude, setDefaultInclude] = useState<boolean>(
    initialSettings.defaultInclude ?? true,
  )
  // Internally we still store `globalNoindex` (true = hidden), but the UI
  // exposes its inverse as a positive "allow indexing" toggle so the
  // operator's mental model matches the action they're taking.
  const [allowIndexing, setAllowIndexing] = useState<boolean>(
    !(initialSettings.globalNoindex ?? true),
  )
  const [googleVerify, setGoogleVerify] = useState<string>(
    initialSettings.googleSiteVerification ?? "",
  )
  const [bingVerify, setBingVerify] = useState<string>(
    initialSettings.bingSiteVerification ?? "",
  )
  const [extraDisallowText, setExtraDisallowText] = useState<string>(
    formatLines(initialSettings.extraDisallow),
  )
  const [blockedBotsText, setBlockedBotsText] = useState<string>(
    formatLines(initialSettings.blockedBots),
  )
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState<null | {
    ok: boolean
    message: string
  }>(null)

  async function save() {
    setSaving(true)
    setStatus(null)
    try {
      const patch: Partial<SeoSettings> = {
        defaultInclude,
        // Convert positive UI toggle back to internal "noindex" flag.
        globalNoindex: !allowIndexing,
        googleSiteVerification: googleVerify.trim(),
        bingSiteVerification: bingVerify.trim(),
        extraDisallow: parseLines(extraDisallowText),
        blockedBots: parseLines(blockedBotsText),
      }
      const res = await fetch("/api/dev/seo/settings/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      })
      const data = await res.json()
      if (!res.ok) {
        setStatus({ ok: false, message: data?.error ?? "Save failed." })
        return
      }
      setSettings(data.settings as SeoSettings)
      setStatus({ ok: true, message: "Settings saved." })
    } catch {
      setStatus({ ok: false, message: "Network error." })
    } finally {
      setSaving(false)
    }
  }

  function prependBot(bot: string) {
    const current = parseLines(blockedBotsText)
    if (current.includes(bot)) return
    setBlockedBotsText([bot, ...current].join("\n"))
  }

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-[13px] font-semibold uppercase tracking-wide text-muted-foreground">
          Site-wide indexing
        </h2>
        <p className="mt-1 text-[13px] text-muted-foreground">
          The master switch for how Google, Bing, and other search engines
          treat this entire website.
        </p>

        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <div
            className={`rounded-2xl border p-5 shadow-sm transition ${
              allowIndexing
                ? "border-emerald-500/40 bg-emerald-500/5"
                : "border-amber-500/40 bg-amber-500/5"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  {allowIndexing ? (
                    <Globe
                      className="h-4 w-4 text-emerald-600 dark:text-emerald-400"
                      aria-hidden="true"
                    />
                  ) : (
                    <EyeOff
                      className="h-4 w-4 text-amber-600 dark:text-amber-400"
                      aria-hidden="true"
                    />
                  )}
                  <p className="text-[14px] font-semibold text-foreground">
                    Allow Google to index this website
                  </p>
                </div>
                <p className="mt-1 text-[12.5px] text-muted-foreground">
                  Master switch. When ON, every page emits <code>index, follow</code>,{" "}
                  <code>/robots.txt</code> opens to crawlers, and{" "}
                  <code>/sitemap.xml</code> lists every public URL. When OFF, the
                  whole site is hidden from search.
                </p>
              </div>
              <Switch
                checked={allowIndexing}
                onCheckedChange={setAllowIndexing}
                aria-label="Allow Google to index this website"
              />
            </div>

            {allowIndexing ? (
              <div className="mt-4 flex items-start gap-2 rounded-lg border border-emerald-500/40 bg-emerald-500/10 p-3 text-[12px] text-emerald-700 dark:text-emerald-300">
                <CheckCircle2
                  className="mt-0.5 h-4 w-4 shrink-0"
                  aria-hidden="true"
                />
                <div>
                  <p className="font-semibold">Site is public.</p>
                  <p className="mt-0.5">
                    Pages will be discoverable in Google &amp; Bing. Submit{" "}
                    <code>/sitemap.xml</code> in Search Console after launch
                    for fastest indexing.
                  </p>
                </div>
              </div>
            ) : (
              <div className="mt-4 flex items-start gap-2 rounded-lg border border-amber-500/40 bg-amber-500/10 p-3 text-[12px] text-amber-700 dark:text-amber-300">
                <AlertTriangle
                  className="mt-0.5 h-4 w-4 shrink-0"
                  aria-hidden="true"
                />
                <div>
                  <p className="font-semibold">Site is hidden from search.</p>
                  <p className="mt-0.5">
                    Every page emits{" "}
                    <code>noindex, nofollow</code>, robots.txt blocks all
                    crawlers, and the sitemap is empty. Flip this on once
                    you&apos;re ready to launch.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <ShieldCheck
                    className="h-4 w-4 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <p className="text-[14px] font-semibold text-foreground">
                    Include new pages in sitemap by default
                  </p>
                </div>
                <p className="mt-1 text-[12.5px] text-muted-foreground">
                  When off, newly-added URLs are excluded until you opt them in
                  from the Sitemap tab.
                </p>
              </div>
              <Switch
                checked={defaultInclude}
                onCheckedChange={setDefaultInclude}
                aria-label="Include new pages in sitemap by default"
              />
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-[13px] font-semibold uppercase tracking-wide text-muted-foreground">
          Search Console verification
        </h2>
        <p className="mt-1 text-[13px] text-muted-foreground">
          Paste the meta-tag verification content supplied by each engine.
        </p>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="seo-google-verify">
                Google Search Console
              </FieldLabel>
              <Input
                id="seo-google-verify"
                value={googleVerify}
                onChange={(e) => setGoogleVerify(e.target.value)}
                placeholder="abc123…"
                autoComplete="off"
              />
              <FieldDescription>
                Added as{" "}
                <code>&lt;meta name="google-site-verification"&gt;</code>.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="seo-bing-verify">Bing Webmaster</FieldLabel>
              <Input
                id="seo-bing-verify"
                value={bingVerify}
                onChange={(e) => setBingVerify(e.target.value)}
                placeholder="ABCDE1234…"
                autoComplete="off"
              />
              <FieldDescription>
                Added as <code>&lt;meta name="msvalidate.01"&gt;</code>.
              </FieldDescription>
            </Field>
          </FieldGroup>
        </div>
      </section>

      <section>
        <h2 className="text-[13px] font-semibold uppercase tracking-wide text-muted-foreground">
          Robots.txt overrides
        </h2>
        <p className="mt-1 text-[13px] text-muted-foreground">
          Extra rules merged into <code>/robots.txt</code>.
        </p>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="seo-disallow">Extra disallow paths</FieldLabel>
            <Textarea
              id="seo-disallow"
              rows={5}
              value={extraDisallowText}
              onChange={(e) => setExtraDisallowText(e.target.value)}
              placeholder={"/internal\n/private\n/admin"}
              className="font-mono text-[12px]"
            />
            <FieldDescription>
              One path per line (or comma-separated). Each becomes a{" "}
              <code>Disallow:</code> line for <code>User-agent: *</code>.
            </FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor="seo-bots">Blocked bots</FieldLabel>
            <Textarea
              id="seo-bots"
              rows={5}
              value={blockedBotsText}
              onChange={(e) => setBlockedBotsText(e.target.value)}
              placeholder={"AhrefsBot\nSemrushBot\nGPTBot"}
              className="font-mono text-[12px]"
            />
            <FieldDescription>
              One user-agent per line. Each gets a full <code>Disallow: /</code>.
            </FieldDescription>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {DEFAULT_BLOCKED_BOTS.map((bot) => (
                <button
                  key={bot}
                  type="button"
                  onClick={() => prependBot(bot)}
                  className="rounded-full border border-border bg-card px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground transition hover:border-foreground/20 hover:bg-muted hover:text-foreground"
                >
                  + {bot}
                </button>
              ))}
            </div>
          </Field>
        </div>
      </section>

      <div className="sticky bottom-4 flex flex-col items-stretch justify-between gap-3 rounded-2xl border border-border bg-card/95 p-4 shadow-lg backdrop-blur sm:flex-row sm:items-center">
        <div className="flex items-center gap-3 text-[12.5px]">
          {status ? (
            <Badge
              variant="outline"
              className={
                status.ok
                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                  : "border-destructive/30 bg-destructive/10 text-destructive"
              }
            >
              {status.message}
            </Badge>
          ) : (
            <span className="text-muted-foreground">
              Changes apply globally the moment you save.
            </span>
          )}
          {settings.globalNoindex ? (
            <Badge
              variant="outline"
              className="border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300"
            >
              <EyeOff className="mr-1 h-3 w-3" aria-hidden="true" />
              Hidden from search
            </Badge>
          ) : (
            <Badge
              variant="outline"
              className="border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
            >
              <Globe className="mr-1 h-3 w-3" aria-hidden="true" />
              Public &amp; indexable
            </Badge>
          )}
        </div>
        <Button type="button" onClick={save} disabled={saving}>
          {saving ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <Save className="h-4 w-4" aria-hidden="true" />
          )}
          Save settings
        </Button>
      </div>
    </div>
  )
}
