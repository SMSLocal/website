import type { Metadata } from "next"
import { headers } from "next/headers"
import { SecurityDashboard } from "@/components/dev-seo/security-dashboard"
import { runSecurityAudit } from "@/lib/security/audit"

export const metadata: Metadata = {
  title: "Security audit (dev)",
  robots: { index: false, follow: false },
}

export const dynamic = "force-dynamic"

async function resolveBaseUrl(): Promise<string> {
  const hdrs = await headers()
  const host = hdrs.get("x-forwarded-host") ?? hdrs.get("host")
  const proto = hdrs.get("x-forwarded-proto") ?? "https"
  if (host) return `${proto}://${host}`
  return process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.smslocal.in"
}

export default async function SecurityAuditPage() {
  const baseUrl = await resolveBaseUrl()
  const audit = await runSecurityAudit(baseUrl)
  return (
    <main className="bg-background">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Dev · Security audit
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
            Security &amp; launch readiness
          </h1>
          <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-muted-foreground">
            Checks response headers, env var hygiene, and well-known files. Run on a deployed
            preview or production URL for accurate results. Local dev will show warnings for
            headers that only take effect once deployed.
          </p>
        </header>
        <SecurityDashboard audit={audit} />
      </div>
    </main>
  )
}
