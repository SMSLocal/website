import { NextResponse } from "next/server"
import { getSession } from "@/lib/seo/auth"
import { backupsEnabled, createBackup, listBackups } from "@/lib/seo/backups"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

/** GET — list all local backups (newest first). */
export async function GET() {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "unauthorised" }, { status: 401 })
  }
  if (!backupsEnabled()) {
    return NextResponse.json({ ok: true, enabled: false, backups: [] })
  }
  const backups = await listBackups()
  return NextResponse.json({ ok: true, enabled: true, backups })
}

/** POST — create an instant backup right now. */
export async function POST() {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "unauthorised" }, { status: 401 })
  }
  if (!backupsEnabled()) {
    return NextResponse.json(
      { error: "not_available_in_production" },
      { status: 403 },
    )
  }
  try {
    const name = await createBackup()
    const backups = await listBackups()
    return NextResponse.json({ ok: true, created: name, backups })
  } catch (err) {
    return NextResponse.json(
      { error: "backup_failed", detail: (err as Error).message },
      { status: 500 },
    )
  }
}
