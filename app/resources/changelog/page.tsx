import type { Metadata } from "next"
import { getPageMetadata } from "@/lib/seo"
import { Gauge, Layers, ShieldCheck, Sparkles, Workflow } from "lucide-react"
import { AnnouncementStrip } from "@/components/landing/announcement-strip"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { ProductHero, Section, SectionHeader } from "@/components/product/product-page"
import { ChangelogHeroVisual } from "@/components/resources/changelog-hero-visual"
import { ChangelogSubscribe } from "@/components/resources/changelog-subscribe"
import { ChangelogTimeline, type Release } from "@/components/resources/changelog-timeline"
import { BreadcrumbJsonLd } from "@/components/seo/json-ld"

export const metadata: Metadata = getPageMetadata("/resources/changelog")

const RELEASES: Release[] = [
  {
    version: "v3.0.0",
    date: "June 16, 2026",
    type: "Major Release",
    changes: [
      { kind: "new", title: "Voice is now generally available", desc: "Inbound and outbound calling inside the inbox, on US local ($5/mo) and toll-free ($15/mo) numbers." },
      { kind: "new", title: "Click-to-call from any profile", desc: "Dial a customer from their timeline — every call logs itself, no separate dialer." },
      { kind: "new", title: "Call reporting", desc: "Volume, talk time, and abandonment by rep, queue, and campaign, with scheduled CSV exports." },
      { kind: "improved", title: "AI Agent replies in 8 Indian languages", desc: "Auto-detects Hindi, Tamil, Telugu, Bengali, Marathi, Gujarati, Kannada, and English." },
      { kind: "fixed", title: "WhatsApp media renders inline", desc: "Images and PDFs now open directly inside the conversation thread." },
    ],
  },
  {
    version: "v2.9.0",
    date: "May 26, 2026",
    type: "Major Release",
    changes: [
      { kind: "new", title: "RCS Business Messaging", desc: "Verified, branded RCS with carousels and suggested replies on supported Android devices." },
      { kind: "new", title: "WhatsApp template builder", desc: "Compose and preview templates before submitting them for approval." },
      { kind: "improved", title: "DLT template sync", desc: "Approved DLT headers and templates pull in automatically from your operator." },
      { kind: "fixed", title: "OTP failover", desc: "Undelivered OTPs now reroute to a backup path within five seconds." },
    ],
  },
  {
    version: "v2.8.0",
    date: "May 5, 2026",
    type: "Major Release",
    changes: [
      { kind: "new", title: "AI Agent", desc: "Answers common questions on SMS, WhatsApp, and chat, then hands off to an agent with full context." },
      { kind: "new", title: "Knowledge base", desc: "Train the AI on your own articles — no code required." },
      { kind: "improved", title: "Bulk SMS throughput", desc: "Campaigns of a million-plus messages now queue and send 35% faster." },
      { kind: "fixed", title: "Regional-language segment counts", desc: "Unicode SMS no longer miscounts message segments at checkout." },
    ],
  },
  {
    version: "v2.7.1",
    date: "April 21, 2026",
    type: "Patch Release",
    changes: [
      { kind: "fixed", title: "Scheduled campaigns honor recipient timezone" },
      { kind: "fixed", title: "Webhook retries no longer duplicate delivery receipts" },
      { kind: "improved", title: "Authenticator-app (TOTP) two-factor login" },
    ],
  },
  {
    version: "v2.7.0",
    date: "April 7, 2026",
    type: "Major Release",
    changes: [
      { kind: "new", title: "Reseller / white-label console", desc: "Brand the dashboard, set your own margins, and manage sub-accounts." },
      { kind: "new", title: "Shared team inbox", bullets: ["Assign conversations", "Internal notes", "Live collision detection"] },
      { kind: "new", title: "Automation builder", desc: "Visual triggers, conditions, and actions across SMS, WhatsApp, and email." },
      { kind: "improved", title: "Per-operator delivery rates in the dashboard" },
    ],
  },
  {
    version: "v2.6.0",
    date: "March 17, 2026",
    type: "Major Release",
    changes: [
      { kind: "new", title: "WhatsApp Business API", desc: "Two-way conversations, templates, and media on an official WABA." },
      { kind: "new", title: "Quick SMS", desc: "Send a one-off message to a single number or a pasted list — no campaign setup." },
      { kind: "improved", title: "Contact import", desc: "Map CSV columns and de-duplicate on the way in." },
      { kind: "fixed", title: "Link shortening keeps DLT template matching intact" },
    ],
  },
  {
    version: "v2.5.0",
    date: "February 24, 2026",
    type: "Major Release",
    changes: [
      { kind: "new", title: "Unified inbox", bullets: ["SMS", "WhatsApp", "RCS", "Email", "Live Chat"] },
      { kind: "new", title: "REST API v1", bullets: ["Messages", "Contacts", "Conversations"] },
      { kind: "new", title: "₹60 signup credit", desc: "Every new account starts with free credit to test live sends." },
      { kind: "improved", title: "Real-time delivery status on every message" },
    ],
  },
]

const NEXT = [
  { icon: Sparkles, title: "AI voice agent", body: "Let the AI Agent answer and qualify inbound calls before a human picks up." },
  { icon: Workflow, title: "Multi-step journeys", body: "Branching, delays, and conditions that span SMS, WhatsApp, and voice." },
  { icon: Layers, title: "Native integrations", body: "Two-way sync with Shopify, Zoho, and HubSpot — no glue code." },
  { icon: Gauge, title: "Faster bulk sends", body: "Higher per-second throughput for campaigns in the tens of millions." },
  { icon: ShieldCheck, title: "Enterprise controls", body: "SSO, granular roles, and audit logs for teams scaling fastest." },
]

export default function ChangelogPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Resources", path: "/resources/help" },
          { name: "Changelog", path: "/resources/changelog" },
        ]}
      />
      <AnnouncementStrip />
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <ProductHero
          eyebrow="Changelog"
          title={<>Product updates, shipped continuously.</>}
          subtitle="See what's new in SMSLocal — new features, improvements, and fixes delivered every two weeks."
          primaryCta={{ label: "Subscribe to updates", href: "#subscribe" }}
          secondaryCta={{ label: "Follow @smslocal", href: "https://twitter.com/smslocal" }}
          trustBar={[
            { icon: Sparkles, label: "New features" },
            { icon: Workflow, label: "Product improvements" },
            { icon: ShieldCheck, label: "Security & platform" },
            { icon: Gauge, label: "Shipped every two weeks" },
          ]}
          visual={<ChangelogHeroVisual />}
          compact
          extraPadding="!py-12 sm:!py-14 lg:!py-14"
        />

        {/* Timeline */}
        <Section>
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full border border-border bg-muted px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
              Release history
            </span>
            <h2 className="mt-4 text-pretty text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Every release, in order.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground sm:text-[17px]">
              New features, improvements, and fixes — the full story of how SMSLocal keeps getting better.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              <LegendChip className="border-emerald-500/25 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" label="New" />
              <LegendChip className="border-sky-500/25 bg-sky-500/10 text-sky-600 dark:text-sky-400" label="Improved" />
              <LegendChip className="border-rose-500/25 bg-rose-500/10 text-rose-600 dark:text-rose-400" label="Fixed" />
            </div>
          </div>

          <div className="mt-14">
            <ChangelogTimeline releases={RELEASES} />
          </div>
        </Section>

        {/* What's shipping next */}
        <Section tone="muted">
          <SectionHeader
            center
            eyebrow="On the roadmap"
            title="What's shipping next?"
            subtitle="A look at where SMSLocal is headed. Subscribe below to hear the moment each lands."
          />
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {NEXT.map((n, i) => {
              const Icon = n.icon
              const wide = i >= 3
              return (
                <div
                  key={n.title}
                  className={`group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md ${
                    wide ? "lg:col-span-1" : ""
                  }`}
                >
                  <span aria-hidden className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-[16px] font-semibold tracking-tight text-foreground">{n.title}</h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">{n.body}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" /> In progress
                  </span>
                </div>
              )
            })}
          </div>
        </Section>

        {/* Subscribe */}
        <section id="subscribe" className="bg-muted/40 py-20 sm:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-[oklch(0.17_0.03_230)] via-[oklch(0.19_0.03_220)] to-[oklch(0.22_0.04_200)] p-10 text-center text-white shadow-2xl sm:p-14">
              <div
                aria-hidden
                className="pointer-events-none absolute -top-32 left-1/2 h-[380px] w-[380px] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
                style={{ background: "radial-gradient(circle, color-mix(in oklch, var(--primary) 45%, transparent), transparent 70%)" }}
              />
              <div aria-hidden className="bg-grid-ink absolute inset-0 opacity-50 mask-radial-fade" />
              <div className="relative mx-auto max-w-xl">
                <h2 className="text-pretty text-3xl font-semibold tracking-tight sm:text-4xl">Never miss an update.</h2>
                <p className="mt-4 text-[15px] leading-relaxed text-white/70">
                  Get release notes and product announcements delivered every two weeks.
                </p>
                <ChangelogSubscribe />
                <p className="mt-4 text-[12px] text-white/50">No spam. Unsubscribe anytime.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

function LegendChip({ className, label }: { className: string; label: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11.5px] font-semibold ${className}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {label}
    </span>
  )
}
