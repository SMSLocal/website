import Link from "next/link"
import type { Metadata } from "next"
import { ArrowRight, CheckCircle2, Headphones, Wallet } from "lucide-react"
import { AnnouncementStrip } from "@/components/landing/announcement-strip"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { RelatedContent } from "@/components/shared/related-content"
import { Faq, ProductFinalCta, Section } from "@/components/product/product-page"
import { PricingTabs } from "@/components/lazy"
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/json-ld"
import { getPageMetadata } from "@/lib/seo"

// ─── SEO — edit lib/seo/registry.ts or open /dev/seo to preview ──────────────
export const metadata: Metadata = getPageMetadata("/pricing")

const WALLET_POINTS = [
  "One wallet, every channel. Load once and use the balance for SMS, WhatsApp, AI, and OTP.",
  "Credits are denominated in INR, not messages. Rates apply at send time.",
  "24-month validity at every paid tier (unlimited on Tier 1).",
  "Top-up from ₹100 via UPI, net banking, Visa/Mastercard/Rupay, or wire transfer for enterprise.",
  "GST (18%) added on every invoice as per Indian law.",
  "Auto-generated GST invoices emailed to your billing contact.",
  "Unused credit balance refundable within 7 days of purchase if no messages have been sent.",
]

const ENTERPRISE_POINTS = [
  "Custom routing arrangements",
  "Dedicated account manager and technical contact",
  "99.99% uptime SLA with credit guarantees",
  "Priority AI agent language tuning on your domain data",
  "Custom reporting and audit exports",
  "Invoicing terms (NET 15/30) available on approval",
]

const PRICING_FAQ = [
  {
    q: "Is there a free trial?",
    a: "Every new account gets ₹60 free credit on signup, no credit card required. You can test every product — SMS, WhatsApp, OTP — until the credit runs out.",
  },
  {
    q: "Are there any monthly fees?",
    a: "No. SMSLocal has no monthly subscription, no minimum volume commitment, and no user licence fees. You pay only for messages sent.",
  },
  {
    q: "Is there a setup or activation fee for WhatsApp?",
    a: "No. Setup and activation are both zero. You pay only for the messages you send, at Meta's published India rates.",
  },
  {
    q: "How is SMSLocal's RCS pricing set?",
    a: "Our published RCS rate is pegged at exactly 1% below MSG91's public India rate card — 11.88 paise per basic text and 13.86 paise per rich card (pre-GST). If a benchmarked competitor drops below us, we reprice. The competitor rates we track, their source URLs, and the last-fetched date are all listed on the RCS pricing tab.",
  },
  {
    q: "Is there a monthly platform fee for RCS?",
    a: "No. Our RCS wallet plans (Starter ₹2,000, Growth ₹5,000, Scale ₹10,000) are wallet credit — the amount you pay is the amount of credit in your wallet. We don't charge a separate platform fee on top, unlike some competitors. Validity is 24 months on every plan.",
  },
  {
    q: "Do I pay for RCS messages that fall back to SMS?",
    a: "No — failed RCS deliveries are charged at your SMS tier rate, not the RCS rate. You only pay RCS when Google confirms the rich card was actually rendered on the recipient's device.",
  },
  {
    q: "Do my credits expire?",
    a: "Tier 1 credits (₹100–₹3,999 recharges) have unlimited validity. Every higher tier carries 24 months of validity from the date of recharge.",
  },
  {
    q: "Is GST included in the rates shown?",
    a: "No — GST at 18% is added at checkout as per Indian tax law. The rates on this page are ex-GST.",
  },
  {
    q: "Can I get an invoice for my recharge?",
    a: "Yes, every top-up generates a GST-compliant invoice emailed to your billing contact.",
  },
  {
    q: "What happens when my wallet hits zero?",
    a: "Campaigns in progress pause. We email you when the balance hits the 10% mark so you can top up without interruption.",
  },
  {
    q: "Is promotional SMS subject to DND?",
    a: "Yes — promotional SMS can only be sent to non-DND numbers between 10 AM and 9 PM IST as per TRAI. Transactional SMS goes to all numbers, 24/7, on DLT-approved templates.",
  },
  {
    q: "What about international SMS?",
    a: "Available on request. Rates vary by destination country.",
  },
  {
    q: "How do I downgrade tier if I'm sending less this month?",
    a: "You don't. Your per-SMS rate is locked to the tier at which you last topped up. Rates update automatically on your next recharge.",
  },
]

export default function PricingPage() {
  return (
    <>
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Pricing", path: "/pricing" },
        ]}
      />
      <FaqJsonLd items={PRICING_FAQ} path="/pricing" />      <SiteHeader />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-[oklch(0.14_0.02_230)] text-white">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-32 left-1/2 h-[520px] w-[920px] -translate-x-1/2 opacity-40 blur-3xl"
            style={{
              background:
                "radial-gradient(ellipse, color-mix(in oklch, var(--primary) 45%, transparent), transparent 70%)",
            }}
          />
          <div aria-hidden className="bg-grid-ink absolute inset-0 opacity-60 mask-radial-fade" />
          <div className="relative mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 sm:py-28">
            <span className="inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-white/80 backdrop-blur-md">
              Transparent pricing
            </span>
            <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Simple pricing — scaled to your volume.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-[17px] leading-relaxed text-white/70">
              No setup fee. No activation fee. No monthly subscription. Pay only for what you send,
              and pay less the more you send. ₹60 free credit on signup — enough to test every
              product.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/signup/"
                className="group inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-xl shadow-primary/25 transition hover:brightness-110"
              >
                Start Free — ₹60 Credit
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/company/contact/"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/10"
              >
                <Headphones className="h-4 w-4" />
                Talk to sales
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[12.5px] text-white/70">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                No credit card to start
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                DLT-compliant, TRAI-approved
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                Credits valid 24 months
              </span>
            </div>
          </div>
        </section>

        {/* Channel tabs */}
        <PricingTabs />

        {/* Wallet & billing */}
        <Section tone="muted">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.3fr]">
            <div>
              <span className="inline-flex rounded-full border border-border bg-background px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                Billing &amp; wallet
              </span>
              <h2 className="mt-4 text-pretty text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                How your wallet works
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
                One wallet, every channel. Credits in INR, rates applied at send time, GST-compliant
                invoicing on every top-up.
              </p>
              <div className="mt-8 rounded-2xl border border-border bg-background p-5 shadow-sm">
                <div className="flex items-center gap-2 border-b border-border pb-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Wallet className="h-4.5 w-4.5" />
                  </span>
                  <div className="leading-tight">
                    <p className="text-[13px] font-semibold text-foreground">Your first top-up</p>
                    <p className="text-[11.5px] text-muted-foreground">
                      Pay ₹100, get ₹160 in the wallet — a one-time ₹60 signup bonus.
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-[1fr_auto_1fr_auto_1.2fr] items-stretch gap-2">
                  <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-muted/30 p-3 text-center">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                      You pay
                    </p>
                    <p className="mt-1 font-mono text-[22px] font-semibold text-foreground tabular-nums">
                      ₹100
                    </p>
                    <p className="mt-0.5 text-[10.5px] text-muted-foreground">Minimum top-up</p>
                  </div>

                  <span
                    className="flex items-center justify-center font-mono text-[18px] font-semibold text-muted-foreground/60"
                    aria-hidden="true"
                  >
                    +
                  </span>

                  <div className="flex flex-col items-center justify-center rounded-lg border border-primary/30 bg-primary/5 p-3 text-center">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-primary">
                      We add
                    </p>
                    <p className="mt-1 font-mono text-[22px] font-semibold text-primary tabular-nums">
                      ₹60
                    </p>
                    <p className="mt-0.5 text-[10.5px] text-muted-foreground">One-time bonus</p>
                  </div>

                  <span
                    className="flex items-center justify-center font-mono text-[18px] font-semibold text-muted-foreground/60"
                    aria-hidden="true"
                  >
                    =
                  </span>

                  <div className="flex flex-col items-center justify-center rounded-lg border-2 border-primary bg-primary p-3 text-center text-primary-foreground">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.12em] opacity-90">
                      Wallet shows
                    </p>
                    <p className="mt-1 font-mono text-[22px] font-semibold tabular-nums">₹160</p>
                    <p className="mt-0.5 text-[10.5px] opacity-85">Ready to spend</p>
                  </div>
                </div>
                <p className="mt-3 text-[11.5px] leading-relaxed text-muted-foreground">
                  Signup credit is a one-time bonus on your first top-up. Subsequent top-ups (any
                  amount ≥ ₹100) credit the wallet 1:1, pre-GST. Credits never expire at the
                  Starter tier and carry 24-month validity at every paid tier.
                </p>
              </div>
            </div>
            <ul className="grid grid-cols-1 gap-3">
              {WALLET_POINTS.map((line) => (
                <li
                  key={line}
                  className="flex items-start gap-3 rounded-xl border border-border bg-background p-4 shadow-sm"
                >
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-[13.5px] leading-relaxed text-foreground">{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </Section>

        {/* Enterprise */}
        <Section>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-[oklch(0.17_0.03_230)] via-[oklch(0.19_0.03_220)] to-[oklch(0.22_0.04_200)] p-10 text-white shadow-2xl sm:p-14">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-32 -top-32 h-[380px] w-[380px] rounded-full opacity-40 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, color-mix(in oklch, var(--primary) 50%, transparent), transparent 70%)",
              }}
            />
            <div aria-hidden className="bg-grid-ink absolute inset-0 opacity-40 mask-radial-fade" />
            <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
              <div>
                <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-white/85">
                  Enterprise
                </span>
                <h2 className="mt-4 text-pretty text-3xl font-semibold tracking-tight sm:text-4xl">
                  Sending more than ₹6,00,000 / month? Let&apos;s talk.
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-white/75">
                  Enterprise terms with custom routing, SLAs, and dedicated support for high-volume
                  senders across SMS, WhatsApp, and AI agents.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/company/contact/"
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-xl shadow-primary/25 hover:brightness-110"
                  >
                    Talk to sales
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/products/"
                    className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-5 py-3 text-sm font-medium text-white hover:bg-white/10"
                  >
                    View all products
                  </Link>
                </div>
              </div>
              <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {ENTERPRISE_POINTS.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2.5 rounded-lg border border-white/10 bg-white/5 p-3 text-[13px] text-white/85 backdrop-blur"
                  >
                    <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/25 text-primary">
                      <CheckCircle2 className="h-3 w-3" />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        <Faq eyebrow="Pricing FAQs" title="Everything you might want to ask before topping up" items={PRICING_FAQ} />

        <RelatedContent path="/pricing" />

        <ProductFinalCta
          title="Start sending in two minutes."
          subtitle="₹60 free credit. Full DLT compliance. No card. Every product included."
          primaryCta={{ label: "Start Free — ₹60 Credit", href: "/signup/" }}
          secondaryCta={{ label: "Talk to sales", href: "/company/contact/" }}
        />
      </main>
      <SiteFooter />
    </>
  )
}
