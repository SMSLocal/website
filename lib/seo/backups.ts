import { promises as fs } from "node:fs"
import path from "node:path"
import { execFile } from "node:child_process"
import { promisify } from "node:util"

/**
 * ────────────────────────────────────────────────────────────────────────────
 * Local backup management (dev-only)
 * ────────────────────────────────────────────────────────────────────────────
 * Lists / creates / restores the zip backups produced by the Windows scheduled
 * task (see C:\Users\SMS\website-backups\backup-smslocal.ps1).
 *
 * These operations touch the local filesystem and run powershell/tar, so they
 * ONLY work when the dashboard is served from the local dev machine. On Vercel
 * (production) `backupsEnabled()` is false and every call is refused.
 * ────────────────────────────────────────────────────────────────────────────
 */

const execFileAsync = promisify(execFile)

export const BACKUP_DIR =
  process.env.BACKUP_DIR ?? "C:\\Users\\SMS\\website-backups"
export const PROJECT_DIR =
  process.env.PROJECT_DIR ?? "C:\\Users\\SMS\\Desktop\\website"
const SCRIPT = path.join(BACKUP_DIR, "backup-smslocal.ps1")

const NAME_RE = /^website-backup_[0-9]{4}-[0-9]{2}-[0-9]{2}_[0-9]{4}\.zip$/

export type BackupItem = {
  name: string
  date: string // ISO timestamp (file mtime)
  day: string // yyyy-mm-dd
  sizeMB: number
}

/** Backups only work on the local dev machine, never on Vercel. */
export function backupsEnabled(): boolean {
  return process.env.NODE_ENV !== "production"
}

export async function listBackups(): Promise<BackupItem[]> {
  try {
    const files = await fs.readdir(BACKUP_DIR)
    const items = await Promise.all(
      files
        .filter((f) => NAME_RE.test(f))
        .map(async (name) => {
          const st = await fs.stat(path.join(BACKUP_DIR, name))
          return {
            name,
            date: st.mtime.toISOString(),
            day: st.mtime.toISOString().slice(0, 10),
            sizeMB: Math.round((st.size / 1048576) * 100) / 100,
          }
        }),
    )
    return items.sort((a, b) => b.date.localeCompare(a.date))
  } catch {
    return []
  }
}

/** Run the backup script now (instant backup). Returns the new file name. */
export async function createBackup(): Promise<string> {
  const before = new Set((await listBackups()).map((b) => b.name))
  await execFileAsync(
    "powershell.exe",
    ["-NoProfile", "-ExecutionPolicy", "Bypass", "-File", SCRIPT],
    { windowsHide: true, timeout: 6 * 60 * 1000 },
  )
  const after = await listBackups()
  const fresh = after.find((b) => !before.has(b.name))
  return fresh?.name ?? after[0]?.name ?? ""
}

/**
 * Restore a backup over the project. Takes a safety backup of the current
 * state first (so the restore itself is reversible), then extracts the chosen
 * zip over PROJECT_DIR. node_modules / .next are untouched (never in the zip).
 */
export async function restoreBackup(
  name: string,
): Promise<{ restored: string; safetyBackup: string }> {
  if (!NAME_RE.test(name)) throw new Error("invalid backup name")
  const zip = path.join(BACKUP_DIR, name)
  await fs.access(zip) // throws if missing

  // 1) Safety net: snapshot the current state before overwriting.
  const safetyBackup = await createBackup()

  // 2) Extract the chosen backup over the project (bsdtar reads zip).
  await execFileAsync("tar.exe", ["-x", "-f", zip, "-C", PROJECT_DIR], {
    windowsHide: true,
    timeout: 6 * 60 * 1000,
  })

  return { restored: name, safetyBackup }
}
