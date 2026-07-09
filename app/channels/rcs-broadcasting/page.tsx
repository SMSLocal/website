import type { Metadata } from "next"
import Link from "next/link"
import { getPageMetadata } from "@/lib/seo"
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Image as ImageIcon,
  Radio,
  Send,
  Sparkles,
  Users,
} from "lucide-react"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { FaqSection } from "@/components/landing/faq-section"
import { BreadcrumbJsonLd, ProductServiceJsonLd } from "@/components/seo/json-ld"
import {
  CapabilityGrid,
  ProductFinalCta,
  ProductHero,
  Section,
  SectionHeader,
  StatsBand,
} from "@/components/product/product-page"

export const metadata: Metadata = getPageMetadata("/channels/rcs-broadcasting")

/* ── Hero visual ──────────────────────────────────────────────────────────── */
function RcsBroadcastVisual() {
  const campaign = {
    name: "Diwali Sale — Rich Card Blast",
    audience: "1,84,320 recipients",
    rcsSent: "1,41,900",
    smsFallback: "42,420",
  }

  const badges = [
    { icon: ImageIcon, label: "Carousel card" },
    { icon: Sparkles, label: "3 suggested replies" },
    { icon: BadgeCheck, label: "Verified sender" },
  ]

  return (
    <div className="flex h-full min-h-[360px] flex-col gap-4 lg:pl-4">
      {/* Campaign header */}
      <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-md">
        <div className="flex items-center justify-between">
          <p className="text-[10.5px] font-semibold uppercase tracking-widest text-white/50">
            Broadcast queued
          </p>
          <Radio className="h-3.5 w-3.5 text-primary" />
        </div>
        <p className="mt-1.5 text-[13px] font-semibold text-white/90">{campaign.name}</p>
        <p className="mt-0.5 text-[12px] text-white/60">{campaign.audience}</p>
      </div>

      {/* Rich card preview */}
      <div className="rounded-xl border border-primary/25 bg-primary/10 px-4 py-3.5 backdrop-blur-md">
        <div className="mb-2 flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          <span className="text-[10.5px] font-semibold uppercase tracking-widest text-primary">
            Rich card — preview
          </span>
        </div>
        <p className="text-[13px] font-semibold leading-relaxed text-white">
          Your Diwali hamper is here — flat 40% off, today only.
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {badges.map((b) => (
            <span
              key={b.label}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/8 px-2.5 py-0.5 text-[11px] font-medium text-white/75"
            >
              <b.icon className="h-3 w-3" /> {b.label}
            </span>
          ))}
        </div>
      </div>

      {/* Delivery split */}
      <div className="flex items-center gap-2 rounded-xl border border-blue-500/20 bg-blue-500/10 px-4 py-2.5">
        <Send className="h-4 w-4 shrink-0 text-blue-400" />
        <span className="text-[12.5px] font-medium text-blue-300">
          {campaign.rcsSent} delivered as rich RCS · {campaign.smsFallback} auto-fell back to SMS
        </span>
      </div>
    </div>
  )
}

export default function RcsBroadcastingPage() {
  return (
    <>
      <ProductServiceJsonLd
        name="SMSLocal RCS Broadcasting"
        description="Send branded RCS campaigns with rich cards, carousels, and suggested replies, plus automatic SMS fallback, answered by agentic AI."
        path="/channels/rcs-broadcasting"
        category="RCS Broadcast Messaging"
      />
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Channels", path: "/channels" },
          { name: "RCS Broadcasting", path: "/channels/rcs-broadcasting" },
        ]}
      />
      <SiteHeader />
      <main>

        {/* ── HERO ──────────────────────────────────────────────── */}
        <ProductHero
          compact
          eyebrow="Channels · RCS Broadcasting"
          title={
            <>
              RCS Broadcasting with Rich Cards
              <br className="hidden sm:block" /> and Agentic AI
            </>
          }
          subtitle="Send branded, interactive RCS campaigns with automatic SMS fallback, then let agentic AI handle the replies."
          primaryCta={{ label: "Start Broadcasting", href: "/signup" }}
          secondaryCta={{ label: "Get a Demo", href: "/company/contact" }}
          trustBar={[
            { icon: ImageIcon, label: "Rich cards and carousels" },
            { icon: BadgeCheck, label: "Verified brand sender" },
            { icon: Send, label: "Automatic SMS fallback" },
            { icon: BarChart3, label: "Read receipts and analytics" },
          ]}
          visual={<RcsBroadcastVisual />}
        />

        {/* ── TRUST LINE ────────────────────────────────────────── */}
        <div className="border-b border-border bg-muted/30 py-4">
          <p className="text-center text-[13px] font-medium text-muted-foreground">
            Campaigns that look like your brand and convert.
          </p>
        </div>

        {/* ── RESULTS STRIP ─────────────────────────────────────── */}
        <Section>
          <StatsBand
            items={[
              { value: "Rich",     label: "Cards and carousels for interactive campaigns" },
              { value: "Verified", label: "Brand sender with capability checking" },
              { value: "Auto",     label: "Automatic SMS fallback for every recipient" },
              { value: "Tracked",  label: "Read receipts and analytics per campaign" },
            ]}
          />
        </Section>

        {/* ── THE PROBLEM ───────────────────────────────────────── */}
        <Section tone="muted">
          <div className="mx-auto max-w-3xl">
            <SectionHeader
              eyebrow="The problem"
              title="SMS campaigns get opened but rarely engage"
            />
            <p className="mt-5 text-pretty text-[15px] leading-relaxed text-muted-foreground">
              SMS campaigns get opened but rarely engage. RCS broadcasts give customers a branded,
              tappable experience, and SMSLocal makes sure every reply turns into a conversation
              your AI can handle.
            </p>
          </div>
        </Section>

        {/* ── WHAT YOU GET ──────────────────────────────────────── */}
        <CapabilityGrid
          eyebrow="What you get"
          title="Everything a branded RCS campaign needs, in one broadcast flow"
          subtitle="Design a rich card and send — SMSLocal handles verification, fallback, and analytics for the whole campaign."
          items={[
            {
              icon: ImageIcon,
              title: "Rich campaigns",
              body: "Cards, carousels, and suggested replies and actions to RCS-capable handsets, for a branded, tappable experience.",
            },
            {
              icon: BadgeCheck,
              title: "Brand and agent verification",
              body: "A verified sender with capability checking so you know who can receive RCS versus SMS before you send.",
            },
            {
              icon: Send,
              title: "Automatic SMS fallback",
              body: "Reach every recipient, even when RCS is not available on the device — in the same batch, no separate send.",
            },
            {
              icon: BarChart3,
              title: "Rich analytics",
              body: "Read receipts and engagement data show what is actually working, campaign by campaign.",
            },
          ]}
        />

        {/* ── ONE CAMPAIGN, THE RIGHT CHANNEL ───────────────────── */}
        <Section tone="muted">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16 lg:items-center">
            <div>
              <SectionHeader
                eyebrow="One campaign, the right channel"
                title="RCS where available, SMS where not — on a single send"
              />
              <p className="mt-5 text-pretty text-[15px] leading-relaxed text-muted-foreground">
                Pair RCS with the campaign engine and the platform picks RCS where available and
                SMS where not, on a single send. Replies flow to the inbox where agentic AI
                responds — so a campaign and the conversation that follows never leave SMSLocal.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                { icon: <Users className="h-5 w-5" />,     label: "Upload or segment",  desc: "Bring your list or connect a live segment" },
                { icon: <Sparkles className="h-5 w-5" />,   label: "Design the card",    desc: "Preview matches Google Messages before you send" },
                { icon: <Radio className="h-5 w-5" />,      label: "Send the broadcast", desc: "Capability checks and channel routing happen automatically" },
                { icon: <BarChart3 className="h-5 w-5" />,  label: "Watch it land",      desc: "Read receipts and engagement analytics per campaign" },
              ].map((item) => (
                <div key={item.label} className="rounded-xl border border-border bg-card p-4 shadow-sm">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {item.icon}
                  </span>
                  <h3 className="mt-3 text-[14px] font-semibold text-foreground">{item.label}</h3>
                  <p className="mt-1 text-[13px] leading-snug text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── WHY SMSLOCAL ──────────────────────────────────────── */}
        <Section tone="dark">
          <div className="mx-auto max-w-3xl">
            <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-white/85">
              Why SMSLocal
            </span>
            <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Broadcasting, fallback, and AI live on one platform
            </h2>
            <p className="mt-5 text-pretty text-[15px] leading-relaxed text-white/70">
              Broadcasting, fallback, and AI live on one platform, so your campaign and the
              conversation that follows never leave SMSLocal.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/products/rcs"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/15"
              >
                RCS Business Messaging
              </Link>
              <Link
                href="/channels/whatsapp-broadcasting"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/15"
              >
                WhatsApp Broadcasting
              </Link>
            </div>
          </div>
        </Section>

        {/* ── FAQ ───────────────────────────────────────────────── */}
        <FaqSection
          items={[
            {
              q: "What if RCS is unavailable?",
              a: "Automatic SMS fallback reaches every recipient. We check RCS capability per number at send time — capable handsets get the rich card, everyone else automatically gets the SMS fallback in the same batch.",
            },
            {
              q: "Can AI answer replies?",
              a: "Yes, in the shared inbox. When a customer replies to your RCS or SMS-fallback broadcast, agentic AI answers automatically and hands off to a human when needed.",
            },
            {
              q: "What analytics do I get?",
              a: "Read receipts and engagement metrics — delivery and read rates by channel, and which suggested reply or action got the most taps.",
            },
          ]}
        />

        {/* ── INTERNAL LINKS ────────────────────────────────────── */}
        <Section tone="muted">
          <div className="mx-auto max-w-3xl">
            <SectionHeader eyebrow="Explore more" title="Related resources" />
            <ul className="mt-6 space-y-3">
              {[
                { href: "/products/rcs",                    label: "RCS Business Messaging — rich, verified messaging" },
                { href: "/channels/whatsapp-broadcasting",  label: "WhatsApp Broadcasting — campaigns and conversations" },
                { href: "/products/bulk-sms",                label: "Bulk SMS — reliable fallback at scale" },
                { href: "/compare",                          label: "See how SMSLocal compares" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-2 text-[14px] font-medium text-primary hover:underline"
                  >
                    {link.label} <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Section>

        {/* ── FINAL CTA ─────────────────────────────────────────── */}
        <ProductFinalCta
          title="Run branded RCS campaigns with AI built in."
          subtitle="Design a rich card, let automatic SMS fallback cover every recipient, and let agentic AI handle the replies."
          primaryCta={{ label: "Start Broadcasting", href: "/signup" }}
          secondaryCta={{ label: "Get a Demo", href: "/company/contact" }}
        />
      </main>
      <SiteFooter />
    </>
  )
}
