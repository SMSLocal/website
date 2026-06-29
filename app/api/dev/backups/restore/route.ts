import { NextResponse } from "next/server"
import { getSession } from "@/lib/seo/auth"
import { backupsEnabled, restoreBackup } from "@/lib/seo/backups"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

/** POST { name } — restore the given backup over the project (dev only). */
export async function POST(req: Request) {
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
  let name = ""
  try {
    const body = (await req.json()) as { name?: string }
    name = (body.name ?? "").trim()
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 })
  }
  if (!name) {
    return NextResponse.json({ error: "missing_name" }, { status: 400 })
  }
  try {
    const result = await restoreBackup(name)
    return NextResponse.json({ ok: true, ...result })
  } catch (err) {
    return NextResponse.json(
      { error: "restore_failed", detail: (err as Error).message },
      { status: 500 },
    )
  }
}
