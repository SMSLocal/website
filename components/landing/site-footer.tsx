import Link from "next/link"
import { Facebook, Linkedin, Phone, Twitter, Youtube } from "lucide-react"
import { BrandLogo } from "@/components/brand/brand-logo"
import { ManageConsentLink } from "@/components/consent/cookie-consent"

type FooterLink = { label: string; href: string }

const COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: "Resources",
    links: [
      { label: "Resources", href: "/resources/" },
      { label: "Blog", href: "/blog/" },
      { label: "DLT registration guide", href: "/blog/dlt-registration-guide/" },
      { label: "Bulk SMS guide", href: "/blog/bulk-sms/" },
      { label: "WhatsApp marketing guide", href: "/blog/whatsapp-marketing-india/" },
      { label: "Bulk WhatsApp messaging", href: "/blog/bulk-whatsapp-messaging/" },
      { label: "OTP SMS delivery guide", href: "/blog/otp-sms-service/" },
      { label: "RCS messaging guide", href: "/blog/rcs-messaging-india/" },
      { label: "Long SMS messages", href: "/long-sms-messages/" },
      { label: "DND: the consumer guide", href: "/blog/dnd-means/" },
      { label: "Free SMS online", href: "/resources/tools/free-sms-without-registration/" },
      { label: "Help centre", href: "/resources/help/" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/company/about/" },
      { label: "Careers", href: "/company/careers/" },
      { label: "Contact", href: "/company/contact/" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy policy", href: "/legal/privacy/" },
      { label: "Terms of service", href: "/legal/terms/" },
      { label: "Acceptable use", href: "/legal/acceptable-use/" },
      { label: "Data Processing Addendum", href: "/legal/dpa/" },
      { label: "DPDPA notice", href: "/legal/dpdpa/" },
      { label: "Cookie policy", href: "/legal/cookie-policy/" },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-ink-border bg-[oklch(0.11_0.02_230)] text-white/80">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        {/* Brand row */}
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-[2.4fr_1fr_1fr_1fr]">
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <BrandLogo size="lg" />
            <p className="mt-4 max-w-[19rem] text-[13.5px] leading-relaxed text-white/60">
              India&apos;s complete SMS, WhatsApp and AI messaging platform. DLT-compliant,
              developer-ready, and built for Indian businesses since 2019.
            </p>
            <a
              href="tel:+919930736339"
              className="mt-5 inline-flex items-center gap-2 text-[13.5px] font-medium text-white/75 transition hover:text-white"
            >
              <Phone className="h-4 w-4 text-primary" />
              +91 99307 36339
            </a>
            <div className="mt-5 flex items-center gap-2">
              {[
                { Icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/company/smslocal-india/" },
                { Icon: Twitter, label: "X", href: "https://x.com/smslocal" },
                { Icon: Facebook, label: "Facebook", href: "https://www.facebook.com/smslocal" },
                { Icon: Youtube, label: "YouTube", href: "https://www.youtube.com/@smslocal" },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-[12px] font-semibold uppercase tracking-[0.15em] text-white">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[13px] text-white/60 transition hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Base strip */}
        <div className="mt-12 border-t border-white/10 pt-6">
          <div className="flex flex-col items-start justify-between gap-3 text-[12px] text-white/55 sm:flex-row sm:items-center">
            <p>Copyright © 2019–2026 SMSLocal. All rights reserved.</p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <ManageConsentLink className="text-[12px] text-white/55 underline-offset-2 transition hover:text-white hover:underline" />
              <Link
                href="/legal/cookie-policy/"
                className="text-[12px] text-white/55 underline-offset-2 transition hover:text-white hover:underline"
              >
                Cookie policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
