import { redirect } from "next/navigation"
import type { Metadata } from "next"
import { APP_SIGNUP_URL } from "@/lib/app-urls"

/**
 * `/signup` is a server-side 307 redirect to the external AWS product app
 * that handles real account creation. Every marketing CTA in the codebase
 * points at /signup, so the target URL stays centralized behind the
 * NEXT_PUBLIC_APP_URL env var. This page never renders HTML — redirect()
 * sends a Location header before the response body is generated.
 */

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function SignupRedirect() {
  redirect(APP_SIGNUP_URL)
}
