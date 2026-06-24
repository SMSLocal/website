import { redirect } from "next/navigation"
import type { Metadata } from "next"
import { APP_SIGNIN_URL } from "@/lib/app-urls"

/**
 * `/signin` is a server-side 307 redirect to the external AWS product app
 * that handles real authentication. Marketing CTAs keep using /signin so the
 * target URL stays centralized behind the NEXT_PUBLIC_APP_URL env var.
 */

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function SigninRedirect() {
  redirect(APP_SIGNIN_URL)
}
