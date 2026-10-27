import Link from "next/link"
import type { Metadata } from "next"
import {
  ArrowRight,
  BadgeCheck,
  Bot,
  Building2,
  CheckCircle2,
  Gift,
  Headphones,
  Layers,
  Mail,
  MessageSquare,
  MessagesSquare,
  Percent,
  Send,
  ShieldCheck,
  TrendingUp,
  UserPlus,
  Wallet,
  Zap,
} from "lucide-react"
import { AnnouncementStrip } from "@/components/landing/announcement-strip"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { RelatedContent } from "@/components/shared/related-content"
import { Faq, Section } from "@/components/product/product-page"
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/json-ld"
import { InstagramMark, MessengerMark, WhatsAppMark } from "@/components/pricing/brand-marks"
import { TalkToSales } from "@/components/pricing/talk-to-sales"
import { getPageMetadata } from "@/lib/seo"

// ─── SEO — edit lib/seo/registry.ts or open /dev/seo to preview ──────────────
export const metadata: Metadata = getPageMetadata("/pricing")

type IconComp = React.ComponentType<{ className?: string }>

/** Every channel and capability that comes with an account. */
const PLATFORM: { name: string; blurb: string; icon: IconComp; tint: string }[] = [
  {
    name: "SMS",
    blurb: "DLT-compliant promotional and transactional SMS on direct-operator routes.",
    icon: MessageSquare,
    tint: "bg-sky-500/10 text-sky-600 dark:text-sky-300",
  },
  {
    name: "WhatsApp",
    blurb: "Official Business API with approved templates, media, buttons and a shared team inbox.",
    icon: WhatsAppMark,
    tint: "bg-[#25D366]/10",
  },
  {
    name: "RCS",
    blurb: "Verified, branded rich cards and carousels with automatic SMS fallback.",
    icon: MessagesSquare,
    tint: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-300",
  },
  {
    name: "Messenger",
    blurb: "Reply to Facebook Messenger conversations from the same inbox.",
    icon: MessengerMark,
    tint: "bg-[#0084FF]/10",
  },
  {
    name: "Instagram",
    blurb: "Manage Instagram DMs and story replies alongside every other channel.",
    icon: InstagramMark,
    tint: "bg-[#E4405F]/10",
  },
  {
    name: "Agentic AI",
    blurb: "AI agents that answer customers on every channel, in 8 Indian languages, around the clock.",
    icon: Bot,
    tint: "bg-primary/10 text-primary",
  },
]

/** Bulk messaging runs on four channels. */
const BULK: { name: string; line: string; points: string[]; icon: IconComp; tint: string }[] = [
  {
    name: "WhatsApp",
    line: "Broadcast approved templates to opted-in customers.",
    points: ["Images, buttons and links in every message", "Delivery and read reports"],
    icon: WhatsAppMark,
    tint: "bg-[#25D366]/10",
  },
  {
    name: "SMS",
    line: "Reach every handset, with or without data.",
    points: ["DLT template and sender ID management", "Priority routes for OTP and alerts"],
    icon: MessageSquare,
    tint: "bg-sky-500/10 text-sky-600 dark:text-sky-300",
  },
  {
    name: "Email",
    line: "Campaigns and transactional email from one dashboard.",
    points: ["Reusable templates and audiences", "Open and click tracking"],
    icon: Mail,
    tint: "bg-amber-500/10 text-amber-600 dark:text-amber-300",
  },
  {
    name: "RCS",
    line: "Rich, branded messages that fall back to SMS.",
    points: ["Cards, carousels and quick replies", "Verified sender with your logo"],
    icon: MessagesSquare,
    tint: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-300",
  },
]

/** Channel pills in the hero. `plain` icons inherit the text colour; brand marks keep their own. */
const HERO_CHANNELS: { name: string; icon: IconComp; plain?: boolean }[] = [
  { name: "WhatsApp", icon: WhatsAppMark },
  { name: "SMS", icon: MessageSquare, plain: true },
  { name: "RCS", icon: MessagesSquare, plain: true },
  { name: "Messenger", icon: MessengerMark },
  { name: "Instagram", icon: InstagramMark },
  { name: "Email", icon: Mail, plain: true },
  { name: "Agentic AI", icon: Bot, plain: true },
]

const STEPS: { n: string; title: string; text: string; icon: IconComp }[] = [
  {
    n: "01",
    title: "Create your account",
    text: "Sign up in a couple of minutes. No credit card, no setup fee.",
    icon: UserPlus,
  },
  {
    n: "02",
    title: "Try every channel",
    text: "Use your free credit to send on SMS, WhatsApp, RCS and more, and test the AI agent.",
    icon: Send,
  },
  {
    n: "03",
    title: "Scale with a plan that fits",
    text: "Sending a lot? Talk to sales for volume discounts, routes and a dedicated manager.",
    icon: TrendingUp,
  },
]

const PRICING_FAQ = [
  {
    q: "What do I get when I sign up?",
    a: "Every new account gets free credit, with no credit card required. You can use it to test SMS, WhatsApp, RCS and the other channels on real numbers before you commit to anything.",
  },
  {
    q: "Which channels are included?",
    a: "SMS, WhatsApp, RCS, Messenger, Instagram and Email, with Agentic AI to handle conversations on them. They all run from one platform, one wallet and one inbox.",
  },
  {
    q: "How do I get volume pricing or a discount?",
    a: "Use the Talk to sales button on this page and tell us which channels you need and how much you send each month. Our team will come back within one business day with a plan that fits your volume.",
  },
  {
    q: "Which channels can I use for bulk messaging?",
    a: "Bulk messaging works on four channels: WhatsApp, SMS, Email and RCS. You can run campaigns on one channel or combine them, for example RCS with an automatic SMS fallback.",
  },
  {
    q: "Is there a setup or activation fee?",
    a: "No. Setup and activation are both free, and there is no monthly subscription or minimum commitment to get started.",
  },
  {
    q: "Do you help with DLT and WhatsApp onboarding?",
    a: "Yes. Our team supports DLT registration, sender IDs and template approvals for SMS, and guides you through Meta business verification and template approval for WhatsApp.",
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
      <FaqJsonLd items={PRICING_FAQ} path="/pricing" />
      <AnnouncementStrip />
      <SiteHeader />
      <main>
        {/* ───────────── Hero ───────────── */}
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
              Pricing
            </span>
            <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Every channel. One platform.{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Start free.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-[17px] leading-relaxed text-white/70">
              SMS, WhatsApp, RCS, Messenger and Instagram, with Agentic AI answering for you. Try everything
              free, then talk to us for a plan that fits your volume.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/signup/"
                className="group inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-xl shadow-primary/25 transition hover:brightness-110"
              >
                Start your trial
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
            <ul className="mx-auto mt-10 flex max-w-5xl flex-wrap items-center justify-center gap-2 lg:flex-nowrap">
              {HERO_CHANNELS.map(({ name, icon: Icon, plain }) => (
                <li
                  key={name}
                  className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-white/[0.06] px-3.5 py-1.5 text-[12.5px] font-medium text-white/85 backdrop-blur-md"
                >
                  <Icon className={`h-4 w-4 ${plain ? "text-white/70" : ""}`} />
                  {name}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[12.5px] text-white/70">
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
                One wallet for every channel
              </span>
            </div>
          </div>
        </section>

        {/* ───────────── Broadcasting at scale → Talk to sales ───────────── */}
        <Section tone="dark" className="!border-t-0 !pt-0">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-8 sm:p-12">
            <div
              aria-hidden
              className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-primary/20 blur-3xl"
            />
            <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-primary">
                  <Building2 className="h-3.5 w-3.5" />
                  Broadcasting at scale
                </span>
                <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Big volumes. Bigger discounts.
                </h2>
                <p className="mt-4 max-w-xl text-[15.5px] leading-relaxed text-white/70">
                  Tell us the channels you use and how much you send. Our sales team will build a plan
                  around your volume, with better rates, dedicated routes and a person who knows your account.
                </p>
                <div className="mt-7">
                  <TalkToSales variant="primary" label="Talk to sales" />
                </div>
              </div>

              <ul className="grid gap-3">
                {[
                  { icon: Percent, title: "Volume discounts", text: "Better rates as your monthly volume grows." },
                  { icon: Zap, title: "Custom routing and SLAs", text: "Priority routes and delivery commitments." },
                  { icon: BadgeCheck, title: "Dedicated account manager", text: "One person who knows your account." },
                ].map(({ icon: Icon, title, text }) => (
                  <li
                    key={title}
                    className="flex items-start gap-3.5 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur"
                  >
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-[14.5px] font-semibold text-white">{title}</span>
                      <span className="mt-0.5 block text-[13px] leading-relaxed text-white/65">{text}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* ───────────── All channels + Agentic AI ───────────── */}
        <Section tone="muted" className="sm:!py-20">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">What you get</span>
            <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Every channel, with Agentic AI built in
            </h2>
            <p className="mt-3 text-[15.5px] leading-relaxed text-muted-foreground">
              One account gives you all of these, so you can meet customers wherever they message you.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PLATFORM.map(({ name, blurb, icon: Icon, tint }) => (
              <div
                key={name}
                className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <span className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${tint}`}>
                  <Icon className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="text-[17px] font-semibold tracking-tight text-foreground">{name}</h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-muted-foreground">{blurb}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ───────────── Free credit ───────────── */}
        <Section className="sm:!py-20">
          <div className="relative overflow-hidden rounded-3xl border border-primary/25 bg-gradient-to-br from-primary/10 via-card to-accent/10 p-8 shadow-sm sm:p-12">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/15 blur-3xl"
            />
            <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-[auto_1fr_auto]">
              <div className="flex items-center gap-5">
                <span className="inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                  <Gift className="h-8 w-8" />
                </span>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">Free on signup</p>
                  <p className="mt-1 text-6xl font-bold leading-none tracking-tight text-foreground sm:text-7xl">
                    ₹60
                  </p>
                  <p className="mt-1 text-[14px] font-medium text-muted-foreground">free credit</p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  Test every channel before you spend anything.
                </h2>
                <ul className="mt-4 grid gap-2.5 text-[14.5px] text-muted-foreground sm:grid-cols-2">
                  {[
                    "No credit card required",
                    "Works on SMS, WhatsApp, RCS and more",
                    "Try the AI agent on live conversations",
                    "DLT registration support included",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href="/signup/"
                className="group inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:brightness-110"
              >
                Claim your free credit
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </Section>

        {/* ───────────── Bulk messaging: 4 channels ───────────── */}
        <Section className="sm:!py-20">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                Bulk messaging
              </span>
              <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Four channels for every campaign
              </h2>
              <p className="mt-3 text-[15.5px] leading-relaxed text-muted-foreground">
                Send to thousands of customers at once on WhatsApp, SMS, Email and RCS, from one dashboard
                and one wallet.
              </p>
            </div>
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-[12.5px] font-semibold text-foreground shadow-sm">
              <Layers className="h-4 w-4 text-primary" />
              4 channels · 1 wallet
            </span>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {BULK.map(({ name, line, points, icon: Icon, tint }) => (
              <div key={name} className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm">
                <span className={`inline-flex h-12 w-12 items-center justify-center rounded-full ${tint}`}>
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-[18px] font-semibold tracking-tight text-foreground">{name}</h3>
                <p className="mt-1.5 text-[14px] leading-relaxed text-muted-foreground">{line}</p>
                <ul className="mt-4 space-y-2 border-t border-border pt-4">
                  {points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-[13.5px] text-foreground/85">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        {/* ───────────── Agentic AI spotlight (dark) ───────────── */}
        <Section tone="dark" className="sm:!py-20">
          <div className="relative overflow-hidden">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full bg-primary/15 blur-3xl"
            />
            <div className="relative grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-primary">
                  <Bot className="h-3.5 w-3.5" />
                  Agentic AI
                </span>
                <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[42px] lg:leading-[1.08]">
                  AI that answers while{" "}
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">you sleep.</span>
                </h2>
                <p className="mt-4 max-w-xl text-[15.5px] leading-relaxed text-white/70">
                  Agentic AI replies to your customers on WhatsApp, Messenger, Instagram and more, in 8 Indian
                  languages, around the clock.
                </p>
                <ul className="mt-7 space-y-3.5">
                  {[
                    "Answers common questions instantly, on every channel",
                    "Replies in the language your customer writes in",
                    "Works alongside your team in one shared inbox",
                  ].map((point) => (
                    <li key={point} className="flex items-start gap-3 text-[15px] text-white/85">
                      <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* chat mock */}
              <div className="mx-auto w-full max-w-md">
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/40 backdrop-blur">
                  <div className="flex items-center gap-3 border-b border-white/10 bg-white/[0.04] px-4 py-3.5">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary">
                      <Bot className="h-5 w-5" />
                    </span>
                    <div className="leading-tight">
                      <p className="text-[14px] font-semibold text-white">SMSLocal AI agent</p>
                      <p className="mt-0.5 inline-flex items-center gap-1.5 text-[12px] text-white/60">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        Online now
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 px-4 py-5">
                    <div className="max-w-[82%] rounded-2xl rounded-tl-md bg-white/10 px-3.5 py-2.5 text-[14px] leading-snug text-white">
                      मेरा ऑर्डर कहाँ है?
                    </div>
                    <div className="ml-auto max-w-[82%] rounded-2xl rounded-tr-md bg-primary px-3.5 py-2.5 text-[14px] leading-snug text-primary-foreground">
                      आपका ऑर्डर #4821 कल तक पहुँच जाएगा। 🚚
                    </div>
                    <div className="max-w-[82%] rounded-2xl rounded-tl-md bg-white/10 px-3.5 py-2.5 text-[14px] leading-snug text-white">
                      Can I change the delivery address?
                    </div>
                    <div className="ml-auto max-w-[82%] rounded-2xl rounded-tr-md bg-primary px-3.5 py-2.5 text-[14px] leading-snug text-primary-foreground">
                      Sure. Share the new address and I&apos;ll update it right away.
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-white/10 bg-white/[0.04] px-4 py-3 text-[12px] text-white/60">
                    <span className="inline-flex items-center gap-1.5">
                      <Zap className="h-3.5 w-3.5 text-primary" />
                      Handled by AI
                    </span>
                    <span>WhatsApp · Messenger · Instagram</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* ───────────── How it works ───────────── */}
        <Section tone="muted" className="sm:!py-20">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">How it works</span>
            <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              From signup to scale in three steps
            </h2>
          </div>
          <ol className="relative mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
            <span
              aria-hidden
              className="pointer-events-none absolute left-[16.6%] right-[16.6%] top-[34px] hidden border-t border-dashed border-primary/40 md:block"
            />
            {STEPS.map(({ n, title, text, icon: Icon }) => (
              <li
                key={n}
                className="relative rounded-2xl border border-border bg-card p-6 text-center shadow-sm"
              >
                <span className="relative mx-auto inline-flex h-[68px] w-[68px] items-center justify-center rounded-full border border-primary/25 bg-primary/10 text-primary ring-8 ring-card">
                  <Icon className="h-7 w-7" />
                </span>
                <p className="mt-4 font-mono text-[12px] font-semibold tracking-[0.2em] text-primary">STEP {n}</p>
                <h3 className="mt-1.5 text-[18px] font-semibold tracking-tight text-foreground">{title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">{text}</p>
              </li>
            ))}
          </ol>
        </Section>

        {/* ───────────── Billing basics (no amounts) ───────────── */}
        <Section>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              { icon: Wallet, title: "One wallet, every channel", text: "Load once and use the same balance across SMS, WhatsApp, RCS, Email and AI." },
              { icon: ShieldCheck, title: "Compliant by default", text: "DLT-compliant SMS, approved WhatsApp templates and verified RCS senders." },
              { icon: Headphones, title: "Help from real people", text: "Onboarding, DLT registration and template approvals handled with you." },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-[16px] font-semibold tracking-tight text-foreground">{title}</h3>
                  <p className="mt-1 text-[14px] leading-relaxed text-muted-foreground">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <RelatedContent path="/pricing" />

        <Faq eyebrow="Pricing FAQs" title="Everything you might want to ask first" items={PRICING_FAQ} />

        {/* ───────────── Final CTA ───────────── */}
        <section className="bg-muted/40 py-20 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Start sending in two minutes.
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-[16px] leading-relaxed text-muted-foreground">
              Free credit on signup. Full DLT compliance. No card. Every channel included.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/signup/"
                className="group inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:brightness-110"
              >
                Start your trial
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <TalkToSales variant="outline" showArrow={false} className="py-3.5" />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
