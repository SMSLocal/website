import Link from "next/link"
import { Facebook, Linkedin, Twitter, Youtube } from "lucide-react"
import { BrandLogo } from "@/components/brand/brand-logo"
import { ManageConsentLink } from "@/components/consent/cookie-consent"

type FooterLink = { label: string; href: string }

const COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: "Products",
    links: [
      { label: "Bulk SMS", href: "/products/bulk-sms" },
      { label: "RCS Business Messaging", href: "/products/rcs" },
      { label: "WhatsApp Business API", href: "/products/whatsapp-business-api" },
      { label: "AI Agents", href: "/products/ai-agents" },
      { label: "Quick SMS", href: "/products/quick-sms" },
      { label: "Inbox", href: "/products/inbox" },
      { label: "Automation", href: "/products/automation" },
      { label: "Integration", href: "/products/integrations" },
      { label: "Email", href: "/products/email" },
      { label: "AI Voice Receptionist", href: "/products/voice" },
      { label: "Live chat", href: "/products/live-chat" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "E-commerce & D2C", href: "/solutions/ecommerce" },
      { label: "Banking & Fintech", href: "/solutions/banking-fintech" },
      { label: "Healthcare", href: "/solutions/healthcare" },
      { label: "Education", href: "/solutions/education" },
      { label: "Logistics", href: "/solutions/logistics" },
      { label: "Real Estate", href: "/solutions/real-estate" },
      { label: "Retail & Hospitality", href: "/solutions/retail" },
      { label: "SaaS / B2B", href: "/solutions/saas-b2b" },
      { label: "Restaurant", href: "/solutions/restaurant" },
    ],
  },
  {
    title: "Developers",
    links: [
      { label: "API docs", href: "/developers/api-docs" },
      { label: "Quickstart", href: "/developers/quickstart" },
      { label: "SMS API reference", href: "/developers/sms-api" },
      { label: "XML API", href: "/developers/xml-api" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "DLT registration guide", href: "/blog/dlt-registration-guide" },
      { label: "Long SMS messages", href: "/long-sms-messages" },
      { label: "DND: the consumer guide", href: "/blog/dnd-means" },
      { label: "Free SMS online", href: "/resources/tools/free-sms-without-registration" },
      { label: "SMS tools", href: "/resources/tools" },
      { label: "SMS bomber (legal alternative)", href: "/resources/tools/sms-bomber" },
      { label: "Help centre", href: "/resources/help" },
      { label: "Glossary", href: "/resources/glossary" },
      { label: "Compare alternatives", href: "/compare" },
      { label: "Status", href: "/resources/status" },
      { label: "Changelog", href: "/resources/changelog" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/company/about" },
      { label: "Careers", href: "/company/careers" },
      { label: "Contact", href: "/company/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy policy", href: "/legal/privacy" },
      { label: "Terms of service", href: "/legal/terms" },
      { label: "Acceptable use", href: "/legal/acceptable-use" },
      { label: "Data Processing Addendum", href: "/legal/dpa" },
      { label: "DPDPA notice", href: "/legal/dpdpa" },
      { label: "Cookie policy", href: "/legal/cookie-policy" },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-ink-border bg-[oklch(0.11_0.02_230)] text-white/80">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        {/* Brand row */}
        <div className="grid grid-cols-1 gap-10 border-b border-white/10 pb-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <BrandLogo size="lg" />
            <p className="mt-4 max-w-md text-[13.5px] leading-relaxed text-white/60">
              India&apos;s complete SMS, WhatsApp and AI messaging platform. DLT-compliant,
              developer-ready, and built for Indian businesses since 2019.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {[
                { Icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/company/smslocal" },
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

          <div className="flex flex-col justify-end gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/75">
                DLT-compliant
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/75">
                TRAI-approved
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/75">
                DPDPA-aware
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/75">
                India · ₹ INR
              </span>
            </div>
            <Link
              href="/signup"
              className="inline-flex w-fit items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-[13px] font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:brightness-110"
            >
              Start Free — ₹60 Credit
            </Link>
          </div>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-2 gap-10 pt-12 md:grid-cols-3 lg:grid-cols-6">
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
        <div className="mt-14 border-t border-white/10 pt-6">
          <div className="flex flex-col items-start justify-between gap-3 text-[12px] text-white/55 sm:flex-row sm:items-center">
            <p>Copyright © 2019–2026 SMSLocal. All rights reserved.</p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <ManageConsentLink className="text-[12px] text-white/55 underline-offset-2 transition hover:text-white hover:underline" />
              <Link
                href="/legal/cookie-policy"
                className="text-[12px] text-white/55 underline-offset-2 transition hover:text-white hover:underline"
              >
                Cookie policy
              </Link>
              <p>
                Registered name &amp; address:{" "}
                <span className="text-white/70">
                  [PLACEHOLDER — legal entity name and address]
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
