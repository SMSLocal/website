import type { Metadata } from "next"
import Link from "next/link"
import { getPageMetadata } from "@/lib/seo"
import {
  ArrowRight,
  Bell,
  Bot,
  Check,
  Clock,
  Gift,
  KeyRound,
  MessageCircle,
  PackageCheck,
  Plug,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Tag,
  Truck,
  Zap,
} from "lucide-react"

import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { FaqSection } from "@/components/landing/faq-section"
import { RelatedContent } from "@/components/shared/related-content"
import { ProductFinalCta } from "@/components/product/product-page"
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/json-ld"
import { EcommerceHero } from "@/components/solution/ecommerce-hero"
import { EcommerceTabs } from "@/components/solution/ecommerce-tabs"

// ─── SEO — edit lib/seo/registry.ts or open /dev/seo to preview ──────────────
export const metadata: Metadata = getPageMetadata("/solutions/ecommerce")

/* ─── DATA ────────────────────────────────────────────────────────────────── */

/* where an order loses the shopper, and the message that holds on to them */
const FUNNEL = [
  { stage: "Cart", leak: "They leave with items still in the cart.", fix: "A WhatsApp nudge in their own language", Icon: Bot },
  { stage: "Checkout", leak: "The OTP arrives late and payment drops.", fix: "A priority OTP route with automatic retry", Icon: KeyRound },
  { stage: "Order placed", leak: "No confirmation, so they call support.", fix: "An instant order SMS and a WhatsApp receipt", Icon: PackageCheck },
  { stage: "In transit", leak: "“Where is my order?” fills the inbox.", fix: "A live tracking link in every update", Icon: Truck },
  { stage: "Delivered", leak: "Cash-on-delivery parcels are refused at the door.", fix: "A delivery OTP and a WhatsApp check-in", Icon: ShieldCheck },
]
const FUNNEL_H = [100, 80, 62, 46, 34, 25] // left height of each stage as a percentage; the last value is the right edge of the final stage
const FUNNEL_TINT = ["#bfe7da", "#9fdac8", "#7bcdb5", "#55bf9f", "#2fae8c"]

/* a week of messages from one account: the eight things a store sends */
const WEEK = [
  { d: "Mon", I: PackageCheck, t: "Order confirmation SMS and a WhatsApp receipt" },
  { d: "Tue", I: Truck, t: "Shipping updates with a live tracking link" },
  { d: "Wed", I: MessageCircle, t: "Cart abandonment follow-ups in the shopper's language" },
  { d: "Thu", I: Bell, t: "Back-in-stock alerts for sold-out products" },
  { d: "Fri", I: Tag, t: "Festive sale broadcast to opt-in subscribers" },
  { d: "Sat", I: KeyRound, t: "Delivery OTPs for cash-on-delivery orders" },
  { d: "Sun", I: RotateCcw, t: "Return and refund updates, plus loyalty point balances", I2: Gift },
]

const STEPS = [
  {
    n: "1",
    title: "Connect your store",
    body: "Shopify and WooCommerce connect in one click on the Starter plan, and Magento on Growth. Running a custom storefront? Use the REST API and webhooks.",
    chips: ["Shopify", "WooCommerce", "Magento", "REST API"],
  },
  {
    n: "2",
    title: "Pick your templates",
    body: "Order, shipping, OTP and cart messages go out on approved templates: DLT-approved for SMS, Meta-approved for WhatsApp. We support DLT and sender-ID registration.",
    chips: ["DLT SMS", "WhatsApp templates", "Sender ID"],
  },
  {
    n: "3",
    title: "Go live",
    body: "Each order event triggers the right message on its own. One wallet and one report cover SMS, WhatsApp and OTPs, so you see what every message earned.",
    chips: ["One wallet", "One report"],
  },
]

const HOURS = [0, 3, 6, 9, 12, 15, 18, 21, 24]
const hourLabel = (h: number) => (h === 0 || h === 24 ? "12 AM" : h === 12 ? "12 PM" : h < 12 ? `${h} AM` : `${h - 12} PM`)

const FAQS = [
  { q: "Can I connect Shopify, WooCommerce or Magento?", a: "Yes. Shopify and WooCommerce connect in one click on the Starter plan, and Magento connects on the Growth plan. Each connector triggers order, tracking and refund messages on SMS and WhatsApp. For a custom storefront, use the REST API and webhooks. The full list is on the integrations page." },
  { q: "How does cart recovery work on WhatsApp?", a: "An AI agent trained on your catalogue messages shoppers who left items in their cart, answers questions about sizes, stock and offers, and hands over to your team when asked. It replies in the language the shopper writes in: Hindi, Tamil, Telugu, Bengali, Marathi, Gujarati, Kannada or English. Cart reminders on WhatsApp go to customers who have opted in." },
  { q: "Do I need separate tools for SMS and WhatsApp?", a: "No. SMS, WhatsApp and OTPs run from one dashboard on one wallet, with the same reporting. You can send a Diwali broadcast and an order OTP without switching tools." },
  { q: "Are order and shipping messages blocked by DND?", a: "Transactional SMS and WhatsApp utility messages, such as order confirmations, shipping updates and OTPs, are not blocked by DND when they go out on DLT-approved templates. Promotional messages need the customer's opt-in and are sent between 9 AM and 9 PM as TRAI requires. SMSLocal enforces both windows automatically." },
  { q: "Can I send delivery OTPs for cash-on-delivery orders?", a: "Yes. Delivery OTPs use the priority OTP route with automatic retry and fallback, so the code reaches the customer before the rider arrives." },
  { q: "Is there a monthly plan or a minimum commitment?", a: "No. Every channel is pay-as-you-go, so you pay only for the messages you send. Unused credit stays valid for 24 months." },
]

/* ─── STYLE TOKENS ────────────────────────────────────────────────────────── */

const EYEBROW = "inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em]"
const H2 = "text-balance text-[28px] font-semibold leading-[1.08] tracking-[-0.035em] sm:text-[38px]"
const BTN = "group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-primary to-[oklch(0.55_0.13_172)] px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:shadow-xl hover:shadow-primary/30"
const BTN_OUT = "inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3.5 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"

const TRUST = [
  { icon: Bot, label: "Cart recovery on WhatsApp, in 8 languages" },
  { icon: PackageCheck, label: "Order and tracking alerts" },
  { icon: KeyRound, label: "Cash-on-delivery OTPs" },
  { icon: Plug, label: "Shopify and WooCommerce connect" },
]

/* ─── PAGE ────────────────────────────────────────────────────────────────── */

export default function EcommerceSolutionPage() {
  return (
    <>
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Solutions", path: "/solutions" },
          { name: "E-commerce & D2C", path: "/solutions/ecommerce" },
        ]}
      />
      <SiteHeader />
      <main className="overflow-x-clip bg-background font-normal text-foreground">

        {/* 1 · HERO: one order's journey in 3D, with a message at every step */}
        <section className="relative isolate overflow-hidden bg-background">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 opacity-50 [background-image:radial-gradient(var(--border)_1.2px,transparent_1.2px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_at_72%_48%,black_10%,transparent_70%)]" />
          </div>
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-14 pt-14 sm:px-6 lg:grid-cols-[1fr_560px] lg:items-stretch lg:gap-8 lg:pb-20 lg:pt-12">
            <div className="ec-rise min-w-0">
              <p className="inline-flex items-center gap-2 rounded-full bg-foreground px-3.5 py-1.5 text-[12.5px] font-medium text-background">
                <Sparkles className="h-3.5 w-3.5 text-accent" />Solutions &middot; E-commerce &amp; D2C
              </p>
              <h1 className="mt-6 text-balance text-[30px] font-semibold leading-[1.1] tracking-[-0.035em] sm:text-[42px]">
                Win back abandoned carts and keep <span className="text-primary">every order on track.</span>
              </h1>
              <p className="mt-5 max-w-lg text-pretty text-[17px] leading-relaxed text-muted-foreground">
                SMS and WhatsApp for online stores: cart recovery with an AI agent, order and tracking alerts, cash-on-delivery OTPs and festive sales, connected to Shopify and WooCommerce.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link href="/signup/" className={BTN}>Start your trial <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" /></Link>
                <Link href="/company/contact/" className={BTN_OUT}>Talk to sales</Link>
              </div>
              <ul className="mt-8 grid max-w-lg grid-cols-1 gap-x-8 gap-y-3 text-[14px] text-muted-foreground sm:grid-cols-2">
                {TRUST.map((t) => (
                  <li key={t.label} className="flex items-start gap-2.5 leading-snug"><t.icon className="mt-[1px] h-4 w-4 shrink-0 text-primary" /><span>{t.label}</span></li>
                ))}
              </ul>
            </div>
            <div className="ec-rise min-w-0" style={{ animationDelay: "0.15s" }}>
              <EcommerceHero />
            </div>
          </div>
        </section>

        {/* 2 · THE PROBLEM: the order funnel, where each stage leaks and the message that plugs it */}
        <section className="bg-secondary py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <p className={`${EYEBROW} text-primary`}>The problem</p>
              <h2 className={`${H2} mt-5`}>An order can lose the shopper at five different steps.</h2>
              <p className="mt-4 max-w-lg text-[16px] leading-relaxed text-muted-foreground">Each step has its own message, and each message tends to live in a different tool. When one is missing or late, the order leaks.</p>
            </div>

            {/* the funnel */}
            <div className="mt-14 hidden h-[150px] grid-cols-5 sm:grid" aria-hidden>
              {FUNNEL.map((s, i) => {
                const l = FUNNEL_H[i]
                const r = FUNNEL_H[i + 1]
                return (
                  <div key={s.stage} className="relative">
                    <div className="absolute inset-0" style={{ background: FUNNEL_TINT[i], clipPath: `polygon(0 ${50 - l / 2}%, 100% ${50 - r / 2}%, 100% ${50 + r / 2}%, 0 ${50 + l / 2}%)` }} />
                    <span className="absolute inset-0 flex items-center justify-center text-[13px] font-semibold tracking-tight text-[#0c3a2f]">{s.stage}</span>
                  </div>
                )
              })}
            </div>

            <div className="mt-2 grid gap-x-3 gap-y-10 sm:mt-0 sm:grid-cols-5">
              {FUNNEL.map((s, i) => (
                <div key={s.stage} className="relative sm:pt-6">
                  <span className="absolute left-1/2 top-0 hidden h-6 w-px -translate-x-1/2 bg-gradient-to-b from-transparent to-foreground/25 sm:block" aria-hidden />
                  <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-foreground/50 sm:hidden">{i + 1} · {s.stage}</p>
                  <p className="text-[14.5px] font-medium leading-snug text-foreground">{s.leak}</p>
                  <p className="mt-3 flex items-start gap-2 text-[13.5px] leading-snug text-[oklch(0.42_0.12_175)]"><span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"><s.Icon className="h-3 w-3" /></span>{s.fix}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3 · HOW SMSLOCAL SOLVES IT: four jobs in tabs, with what the shopper sees */}
        <section className="bg-background py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <p className={`${EYEBROW} text-primary`}>How SMSLocal solves it</p>
              <h2 className={`${H2} mt-5`}>One account for every message an order needs.</h2>
              <p className="mt-4 max-w-lg text-[16px] leading-relaxed text-muted-foreground">Transactional alerts, OTPs, WhatsApp with AI and festive campaigns, all on DLT-compliant routes and one credit balance.</p>
            </div>
            <div className="mt-12"><EcommerceTabs /></div>
          </div>
        </section>

        {/* 4 · USE CASES: a week of messages, day by day */}
        <section className="bg-secondary py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <p className={`${EYEBROW} text-primary`}>Use cases</p>
              <h2 className={`${H2} mt-5`}>The messaging a store runs in a normal week.</h2>
            </div>
            <div className="relative mt-14">
              <span className="absolute left-0 right-0 top-[17px] hidden h-px bg-border lg:block" aria-hidden />
              <ol className="grid gap-x-4 gap-y-6 lg:grid-cols-7">
                {WEEK.map((w) => (
                  <li key={w.d} className="relative grid grid-cols-[48px_1fr] items-start gap-4 lg:block">
                    <div className="relative z-10 flex items-center gap-2 lg:mb-5">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-[12px] font-semibold text-background ring-4 ring-secondary">{w.d}</span>
                    </div>
                    <div className="lg:border-l lg:border-border lg:pl-4">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary/12 text-primary"><w.I className="h-[18px] w-[18px]" /></span>
                      <p className="mt-2.5 text-[14.5px] font-medium leading-snug text-foreground">{w.t}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* 5 · CONNECT YOUR STORE: three steps on a line */}
        <section className="bg-background py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <p className={`${EYEBROW} text-primary`}>Go live</p>
              <h2 className={`${H2} mt-5`}>From your store to the first message in three steps.</h2>
            </div>
            <div className="relative mt-16">
              <span className="absolute left-6 top-6 hidden h-px w-[calc(100%-3rem)] border-t-2 border-dashed border-primary/35 md:block" aria-hidden />
              <ol className="grid gap-12 md:grid-cols-3 md:gap-8">
                {STEPS.map((s) => (
                  <li key={s.n} className="relative">
                    <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-[17px] font-semibold text-primary-foreground shadow-[0_14px_24px_-10px_rgba(18,160,124,.7)] ring-8 ring-background">{s.n}</span>
                    <h3 className="mt-5 text-[19px] font-semibold tracking-tight">{s.title}</h3>
                    <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-muted-foreground">{s.body}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {s.chips.map((c) => <span key={c} className="rounded-full border border-border bg-background px-3 py-1 text-[12px] font-medium text-foreground/80">{c}</span>)}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <Link href="/products/integrations/" className="mt-10 inline-flex items-center gap-2 text-[14.5px] font-semibold text-primary hover:underline"><Plug className="h-4 w-4" />See every integration <ArrowRight className="h-3.5 w-3.5" /></Link>
          </div>
        </section>

        {/* 6 · COMPLIANCE: two 24-hour bars, when each kind of message may go out */}
        <section className="bg-foreground py-20 text-background lg:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <p className={`${EYEBROW} text-primary`}>Compliance</p>
              <h2 className={`${H2} mt-5 text-background`}>Transactional any time. Promotional between 9 AM and 9 PM.</h2>
            </div>

            <div className="mt-14 space-y-12">
              {[
                { label: "Transactional SMS and WhatsApp utility", note: "Order confirmations, shipping updates and OTPs on DLT-approved templates are not blocked by DND, so they can go out at any hour.", from: 0, to: 24 },
                { label: "Promotional SMS and WhatsApp marketing", note: "These need the customer's opt-in and go out between 9 AM and 9 PM under TRAI rules. SMSLocal enforces the window for you.", from: 9, to: 21 },
              ].map((row) => (
                <div key={row.label}>
                  <p className="flex items-center gap-2 text-[15px] font-semibold"><Check className="h-4 w-4 text-primary" strokeWidth={3} />{row.label}</p>
                  <div className="relative mt-4 h-5 overflow-hidden rounded-full bg-white/10">
                    <span className="absolute inset-y-0 rounded-full bg-gradient-to-r from-primary to-[oklch(0.7_0.14_165)]" style={{ left: `${(row.from / 24) * 100}%`, width: `${((row.to - row.from) / 24) * 100}%` }} />
                  </div>
                  <div className="relative mt-2 h-4">
                    {HOURS.map((h) => <span key={h} className={`absolute whitespace-nowrap text-[10.5px] text-background/55 ${h === 0 ? "" : h === 24 ? "-translate-x-full" : "-translate-x-1/2"}`} style={{ left: `${(h / 24) * 100}%` }}>{hourLabel(h)}</span>)}
                  </div>
                  <p className="mt-3 max-w-xl text-[14.5px] leading-relaxed text-background/75">{row.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <FaqJsonLd items={FAQS} path="/solutions/ecommerce" />
        <FaqSection items={FAQS} />

        <RelatedContent path="/solutions/ecommerce" />

        <ProductFinalCta
          title="Start selling more with every message."
          subtitle="No card, no monthly plan, no lock-in. Just send."
          primaryCta={{ label: "Start your trial", href: "/signup/" }}
          secondaryCta={{ label: "Talk to sales", href: "/company/contact/" }}
        />
      </main>
      <SiteFooter />

      <style>{`
        @keyframes ec-rise { from { opacity: 0; transform: translateY(26px) } to { opacity: 1; transform: none } }
        .ec-rise { animation: ec-rise .9s cubic-bezier(.2,.7,.2,1) both }
        @media (prefers-reduced-motion: reduce) { .ec-rise { animation: none } }
      `}</style>
    </>
  )
}
