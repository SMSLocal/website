import { redirect } from "next/navigation"
import type { Metadata } from "next"
import { APP_FORGOT_PASSWORD_URL } from "@/lib/app-urls"

/**
 * `/forgot-password` is a server-side 307 redirect to the external AWS app's
 * password-reset flow. The AWS app owns the email delivery and token logic;
 * this route exists only so the marketing site can deep-link to it.
 */

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function ForgotPasswordRedirect() {
  redirect(APP_FORGOT_PASSWORD_URL)
}
