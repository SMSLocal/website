import Link from "next/link"
import {
  ArrowRight,
  Building2,
  Clock,
  Headphones,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
} from "lucide-react"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { ContactForm } from "@/components/auth/contact-form"
import { BreadcrumbJsonLd } from "@/components/seo/json-ld"
import type { Metadata } from "next"
import { getPageMetadata } from "@/lib/seo"

// ─── SEO — edit lib/seo/registry.ts or open /dev/seo to preview ──────────────
export const metadata: Metadata = getPageMetadata("/company/contact")

const CHANNELS = [
  {
    icon: Building2,
    title: "Sales & enterprise",
    body: "Volume pricing, custom SLAs, dedicated IPs, white-label, and multi-entity rollouts.",
    action: { label: "sales@smslocal.in", href: "mailto:sales@smslocal.in" },
  },
  {
    icon: Headphones,
    title: "Customer support",
    body: "Active customers get 24x7 priority support via WhatsApp, email, and phone.",
    action: { label: "support@smslocal.in", href: "mailto:support@smslocal.in" },
  },
  {
    icon: MessageCircle,
    title: "WhatsApp us",
    body: "Quick pre-sales questions? Message our team directly on WhatsApp.",
    action: { label: "Chat on WhatsApp", href: "https://wa.me/919999999999" },
  },
  {
    icon: Phone,
    title: "Phone",
    body: "Mon–Sat, 9 AM to 8 PM IST. For after-hours incidents, use support email.",
    action: { label: "+91 99999 99999", href: "tel:+919999999999" },
  },
]

const TRUST = [
  "One business-day response on every inbound lead",
  "Routed to the right team — sales, compliance, engineering, or partnerships",
  "GST-compliant invoicing and Indian entity-ready paperwork",
  "Dedicated account manager for customers with custom SLAs",
]

export default function ContactPage() {
  return (
    <main className="bg-background">
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Company", path: "/company/about" },
          { name: "Contact", path: "/company/contact" },
        ]}
      />
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-foreground">
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_20%_30%,color-mix(in_oklab,var(--primary)_25%,transparent)_0%,transparent_65%)]" />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.25) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.25) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-10">
          <div className="max-w-3xl text-background">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-white/60">
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <span>/</span>
              <Link href="/company/about" className="hover:text-white">
                Company
              </Link>
              <span>/</span>
              <span className="text-white">Contact</span>
            </nav>
            <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Let&apos;s talk about your messaging stack.
            </h1>
            <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-white/75">
              Enterprise pricing, DLT onboarding, custom integrations, partnerships, or press — tell us what you
              need and the right person on our team will get back to you within one business day.
            </p>
          </div>
        </div>
      </section>

      {/* Form + info */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">Send us a note</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Fill in a few details so we can route you to the right team. If you&apos;re evaluating us for a
              time-sensitive rollout, mention it — we prioritize active evaluations.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-foreground">Registered office</h3>
              <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                <p className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 flex-none text-primary" />
                  <span>
                    SMSLocal
                    <br />
                    India — full address pending launch.
                  </span>
                </p>
                <p className="flex items-center gap-2.5">
                  <Clock className="h-4 w-4 flex-none text-primary" />
                  Mon–Sat · 9:00 AM to 8:00 PM IST
                </p>
                <p className="flex items-center gap-2.5">
                  <Mail className="h-4 w-4 flex-none text-primary" />
                  <Link href="mailto:hello@smslocal.in" className="hover:text-foreground">
                    hello@smslocal.in
                  </Link>
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-foreground">What to expect</h3>
              <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                {TRUST.map((t) => (
                  <li key={t} className="flex items-start gap-2.5">
                    <ShieldCheck className="mt-0.5 h-4 w-4 flex-none text-primary" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-dashed border-border bg-muted/40 p-6 text-xs leading-relaxed text-muted-foreground">
              All addresses, numbers, and email aliases on this page will be replaced with verified contact
              details before the public launch.
            </div>
          </aside>
        </div>
      </section>

      {/* Channels grid */}
      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-10">
          <div className="max-w-2xl">
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground">
              Reach the right team, directly.
            </h2>
            <p className="mt-3 text-pretty text-base leading-relaxed text-muted-foreground">
              Skip the form if you already know which team you need. Here&apos;s how to get to each one fastest.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CHANNELS.map((c) => (
              <div
                key={c.title}
                className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:border-primary/40 hover:shadow-md"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <c.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-foreground">{c.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
                <Link
                  href={c.action.href}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                >
                  {c.action.label}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
