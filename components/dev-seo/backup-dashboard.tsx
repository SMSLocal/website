"use client"

import { useCallback, useEffect, useState } from "react"
import {
  AlertTriangle,
  Archive,
  Database,
  Loader2,
  RotateCcw,
} from "lucide-react"
import { Button } from "@/components/ui/button"

type BackupItem = {
  name: string
  date: string
  day: string
  sizeMB: number
}

function fmt(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleString("en-IN", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function BackupDashboard() {
  const [enabled, setEnabled] = useState(true)
  const [backups, setBackups] = useState<BackupItem[]>([])
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState<null | "create" | string>(null)
  const [msg, setMsg] = useState<{ kind: "ok" | "err"; text: string } | null>(
    null,
  )

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/dev/backups/", { cache: "no-store" })
      const data = await res.json()
      setEnabled(Boolean(data.enabled))
      setBackups(Array.isArray(data.backups) ? data.backups : [])
    } catch {
      setMsg({ kind: "err", text: "Failed to load backups." })
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  async function createNow() {
    setBusy("create")
    setMsg(null)
    try {
      const res = await fetch("/api/dev/backups/", { method: "POST" })
      const data = await res.json()
      if (data.ok) {
        setBackups(data.backups ?? [])
        setMsg({ kind: "ok", text: `Backup created: ${data.created}` })
      } else {
        setMsg({ kind: "err", text: data.error ?? "Backup failed." })
      }
    } catch {
      setMsg({ kind: "err", text: "Backup request failed." })
    } finally {
      setBusy(null)
    }
  }

  async function restore(name: string) {
    const ok = window.confirm(
      `Restore this backup?\n\n${name}\n\nThis overwrites the current project files with this backup. A safety backup of the current state is taken first. Restart the dev server afterwards.`,
    )
    if (!ok) return
    setBusy(name)
    setMsg(null)
    try {
      const res = await fetch("/api/dev/backups/restore/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      })
      const data = await res.json()
      if (data.ok) {
        setMsg({
          kind: "ok",
          text: `Restored ${name}. Safety backup: ${data.safetyBackup}. Restart the dev server.`,
        })
        void load()
      } else {
        setMsg({ kind: "err", text: data.detail ?? data.error ?? "Restore failed." })
      }
    } catch {
      setMsg({ kind: "err", text: "Restore request failed." })
    } finally {
      setBusy(null)
    }
  }

  const totalMB = backups.reduce((s, b) => s + b.sizeMB, 0)

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-[17px] font-semibold tracking-tight text-foreground">
            <Database className="h-5 w-5 text-primary" /> Backups
          </h2>
          <p className="mt-1 text-[13px] text-muted-foreground">
            Automatic daily backup at 9:00 PM IST · 60-day rolling retention.
          </p>
        </div>
        <Button onClick={createNow} disabled={!enabled || busy !== null}>
          {busy === "create" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Archive className="h-4 w-4" />
          )}
          Instant backup
        </Button>
      </div>

      {!enabled ? (
        <div className="flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-[13.5px] text-amber-700 dark:text-amber-300">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            Backups run on the local machine, so this tab only works when the
            dashboard is opened from the <strong>local dev server</strong>{" "}
            (localhost:3000/dev/seo). On the deployed site it can&apos;t reach
            the backup files.
          </span>
        </div>
      ) : null}

      {msg ? (
        <div
          className={`rounded-lg border px-4 py-2.5 text-[13px] ${
            msg.kind === "ok"
              ? "border-primary/30 bg-primary/5 text-primary"
              : "border-destructive/30 bg-destructive/5 text-destructive"
          }`}
        >
          {msg.text}
        </div>
      ) : null}

      {/* Summary */}
      {enabled ? (
        <div className="flex flex-wrap gap-3 text-[13px] text-muted-foreground">
          <span className="rounded-lg border border-border bg-card px-3 py-1.5">
            <strong className="text-foreground">{backups.length}</strong> backups
          </span>
          <span className="rounded-lg border border-border bg-card px-3 py-1.5">
            <strong className="text-foreground">{totalMB.toFixed(1)} MB</strong> total
          </span>
        </div>
      ) : null}

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-left text-[13.5px]">
            <thead>
              <tr className="border-b border-border bg-muted/40 text-[12px] uppercase tracking-[0.1em] text-muted-foreground">
                <th className="px-5 py-3 font-semibold">Backup</th>
                <th className="px-5 py-3 font-semibold">Created</th>
                <th className="px-5 py-3 text-right font-semibold">Size</th>
                <th className="px-5 py-3 text-right font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-5 py-10 text-center text-muted-foreground">
                    <Loader2 className="mx-auto h-5 w-5 animate-spin" />
                  </td>
                </tr>
              ) : backups.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-5 py-10 text-center text-muted-foreground">
                    {enabled ? "No backups yet." : "Unavailable in this environment."}
                  </td>
                </tr>
              ) : (
                backups.map((b) => (
                  <tr key={b.name} className="border-b border-border last:border-b-0">
                    <td className="px-5 py-3 font-mono text-[12.5px] text-foreground">
                      {b.name}
                    </td>
                    <td className="px-5 py-3 text-muted-foreground">{fmt(b.date)}</td>
                    <td className="px-5 py-3 text-right tabular-nums text-muted-foreground">
                      {b.sizeMB.toFixed(2)} MB
                    </td>
                    <td className="px-5 py-3 text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => restore(b.name)}
                        disabled={busy !== null}
                      >
                        {busy === b.name ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <RotateCcw className="h-3.5 w-3.5" />
                        )}
                        Restore
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
