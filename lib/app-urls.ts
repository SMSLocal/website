/**
 * ────────────────────────────────────────────────────────────────────────────
 * External app (AWS) URL configuration
 * ────────────────────────────────────────────────────────────────────────────
 *
 * The marketing site at smslocal.in is separate from the product app that
 * handles authentication, dashboard, billing, and message sending (hosted on
 * AWS). This file is the single source of truth for the app's base URL.
 *
 * HOW IT WORKS
 *   Every marketing CTA in this codebase points at local paths like /signup,
 *   /signin, or /forgot-password. Those local routes exist only as
 *   server-side 307 redirects that send the user to the external app — see
 *   app/signup/page.tsx, app/signin/page.tsx, and app/forgot-password/page.tsx.
 *
 * TO CHANGE THE APP URL
 *   Set the NEXT_PUBLIC_APP_URL env var in Vercel (Project → Settings → Vars).
 *   All redirects pick it up automatically on the next deployment. No code
 *   changes required.
 *
 * DEFAULT
 *   https://app.smslocal.in — placeholder until the AWS app is deployed.
 *   Update the env var to the real URL before pointing DNS at this build.
 * ────────────────────────────────────────────────────────────────────────────
 */

/**
 * Base URL of the external product app. Reads NEXT_PUBLIC_APP_URL when set
 * (so it's available on both client and server), falling back to a sensible
 * default. Trailing slashes are stripped so we can safely concatenate paths.
 */
export const APP_BASE_URL: string = (
  process.env.NEXT_PUBLIC_APP_URL?.trim() || "https://app.smslocal.in"
).replace(/\/+$/, "")

/** Join a path onto APP_BASE_URL, normalizing the leading slash. */
export function appUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`
  return `${APP_BASE_URL}${normalized}`
}

export const APP_SIGNUP_URL = appUrl("/signup")
export const APP_SIGNIN_URL = APP_BASE_URL
export const APP_FORGOT_PASSWORD_URL = appUrl("/forgot-password")
export const APP_VERIFY_EMAIL_URL = appUrl("/verify-email")
export const APP_DASHBOARD_URL = appUrl("/")
