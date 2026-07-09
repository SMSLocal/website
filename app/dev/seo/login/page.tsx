import type { Metadata } from "next"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { ShieldX } from "lucide-react"
import { LoginForm } from "@/components/dev-seo/login-form"
import { getSession, isAuthConfigured } from "@/lib/seo/auth"
import { isCaptchaConfigured } from "@/lib/seo/captcha"
import {
  checkIpAllowlist,
  isIpAllowlistEnabled,
} from "@/lib/seo/ip-allowlist"
import { isStoreConfigured } from "@/lib/seo/store"

export const metadata: Metadata = {
  title: "SEO Admin — Sign in",
  robots: { index: false, follow: false, nocache: true },
}

export const dynamic = "force-dynamic"

export default async function SeoLoginPage() {
  const session = await getSession()
  if (session) redirect("/dev/seo")

  const authReady = isAuthConfigured()
  const storeReady = isStoreConfigured()
  const captchaReady = isCaptchaConfigured()
  const ipAllowlistEnabled = isIpAllowlistEnabled()

  // Build a Request-like object for the allowlist check using the live
  // request headers. `next/headers` is read-only but exposes the same
  // forwarding headers the rate-limiter relies on.
  const hdrs = await headers()
  const ipCheck = checkIpAllowlist(
    new Request("https://dev.seo/login", { headers: hdrs }),
  )

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 p-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="m8 14 2.5-2.5L13 14l3-3" />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            SEO Admin Console
          </h1>
          <p className="mt-1 text-[13px] text-muted-foreground">
            Sign in to manage titles, meta, sitemap and indexing.
          </p>
        </div>

        {/* Hard IP block — render a denial page instead of the form so a
            blocked visitor never even sees the input fields. */}
        {ipCheck.enabled && !ipCheck.allowed ? (
          <div
            role="alert"
            className="rounded-2xl border border-destructive/40 bg-destructive/5 p-6 text-center"
          >
            <ShieldX
              className="mx-auto mb-3 h-8 w-8 text-destructive"
              aria-hidden="true"
            />
            <p className="text-[14px] font-semibold text-destructive">
              Access denied for your IP address
            </p>
            <p className="mt-2 text-[12.5px] text-destructive/80">
              The SEO admin console is restricted to an allowlist of IP
              addresses. Your current IP{" "}
              <code className="rounded bg-destructive/10 px-1 font-mono">
                {ipCheck.ip}
              </code>{" "}
              is not on it.
            </p>
            <p className="mt-3 text-[12px] text-muted-foreground">
              If this is a mistake, ask the site owner to add your IP to{" "}
              <code className="rounded bg-muted px-1">
                SEO_ADMIN_IP_ALLOWLIST
              </code>
              .
            </p>
          </div>
        ) : (
          <>
            {!authReady ? (
              <div className="mb-6 rounded-xl border border-amber-500/40 bg-amber-500/5 p-4 text-[13px] text-amber-900 dark:text-amber-200">
                <strong className="font-semibold">
                  Environment not configured.
                </strong>{" "}
                Set{" "}
                <code className="rounded bg-amber-500/15 px-1">
                  SEO_ADMIN_USER
                </code>
                ,{" "}
                <code className="rounded bg-amber-500/15 px-1">
                  SEO_ADMIN_PASS
                </code>
                , and{" "}
                <code className="rounded bg-amber-500/15 px-1">
                  SEO_JWT_SECRET
                </code>{" "}
                in the Vercel project, then reload this page.
              </div>
            ) : null}

            {!storeReady ? (
              <div className="mb-6 rounded-xl border border-destructive/40 bg-destructive/5 p-4 text-[13px] text-destructive">
                Upstash Redis is not connected. Connect it from the project
                Settings to persist overrides.
              </div>
            ) : null}

            <LoginForm disabled={!authReady} captchaEnabled={captchaReady} />

            <ul className="mt-6 space-y-1.5 text-center text-[11px] text-muted-foreground">
              <li>
                Access is restricted. All sign-in attempts are rate-limited
                and logged.
              </li>
              {ipAllowlistEnabled ? (
                <li>
                  IP allowlist is{" "}
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                    active
                  </span>{" "}
                  — your IP{" "}
                  <code className="rounded bg-muted px-1 font-mono">
                    {ipCheck.ip}
                  </code>{" "}
                  is allowed.
                </li>
              ) : (
                <li>
                  IP allowlist is{" "}
                  <span className="font-semibold text-amber-600 dark:text-amber-400">
                    inactive
                  </span>{" "}
                  — set{" "}
                  <code className="rounded bg-muted px-1">
                    SEO_ADMIN_IP_ALLOWLIST
                  </code>{" "}
                  to enable.
                </li>
              )}
            </ul>
          </>
        )}
      </div>
    </main>
  )
}
