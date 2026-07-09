import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { AnnouncementStrip } from "@/components/landing/announcement-strip"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { BrandLogo } from "@/components/brand/brand-logo"

export const metadata: Metadata = {
  title: "Create your free SMSLocal account",
  description:
    "Sign up for SMSLocal and start sending SMS, WhatsApp, and OTP messages in minutes. Free ₹60 credit. No credit card required.",
  robots: { index: true, follow: true },
}

const BENEFITS = [
  "₹60 free credit — no credit card needed",
  "DLT-compliant bulk SMS from day one",
  "WhatsApp Business API in 10 minutes",
  "OTP delivery under 1 second",
  "AI agents in 8 Indian languages",
  "Pay-as-you-go, no monthly lock-in",
]

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <AnnouncementStrip />
      <SiteHeader />

      <main className="flex flex-1 items-center justify-center px-4 py-20">
        <div className="mx-auto w-full max-w-md">
          {/* Card */}
          <div className="rounded-2xl border border-foreground/10 bg-card p-8 shadow-xl shadow-black/5">
            <div className="flex justify-center">
              <BrandLogo className="h-8 w-auto" />
            </div>

            <h1 className="mt-6 text-center text-2xl font-semibold tracking-tight text-foreground">
              Create your free account
            </h1>
            <p className="mt-2 text-center text-[14px] text-muted-foreground">
              India&apos;s messaging platform — SMS, WhatsApp &amp; AI agents.
            </p>

            {/* Benefits */}
            <ul className="mt-6 space-y-2">
              {BENEFITS.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-[13.5px] text-foreground/80">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {b}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <Link
              href="https://app.smslocal.in/signup"
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:brightness-110"
            >
              Start Free — ₹60 Credit
              <ArrowRight className="h-4 w-4" />
            </Link>

            <p className="mt-4 text-center text-[12px] text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="https://app.smslocal.in"
                className="font-medium text-primary hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>

          <p className="mt-6 text-center text-[12px] text-muted-foreground">
            By signing up you agree to our{" "}
            <Link href="/legal/terms/" className="underline underline-offset-2 hover:text-foreground">
              Terms
            </Link>{" "}
            and{" "}
            <Link href="/legal/privacy/" className="underline underline-offset-2 hover:text-foreground">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
