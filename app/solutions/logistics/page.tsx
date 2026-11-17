import type { Metadata } from "next"
import Link from "next/link"
import { getPageMetadata } from "@/lib/seo"
import {
  AlertTriangle,
  ArrowRight,
  ArrowDown,
  Bot,
  Check,
  CheckCheck,
  CircleDollarSign,
  Clock,
  Cog,
  KeyRound,
  Languages,
  Navigation,
  Package,
  Radio,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Truck,
  UserCheck,
  Warehouse,
} from "lucide-react"

import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { FaqSection } from "@/components/landing/faq-section"
import { RelatedContent } from "@/components/shared/related-content"
import { ProductFinalCta } from "@/components/product/product-page"
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/json-ld"
import { LogisticsHero } from "@/components/solution/logistics-hero"

// ─── SEO — edit lib/seo/registry.ts or open /dev/seo to preview ──────────────
export const metadata: Metadata = getPageMetadata("/solutions/logistics")

/* ─── DATA ────────────────────────────────────────────────────────────────── */

const CAUSES = [
  { when: "A dispatch SMS arrives late", then: "The call centre fills with “where is my order?” calls", Icon: Clock },
  { when: "A delivery OTP never reaches the customer", then: "The package goes back to the hub as a failed delivery", Icon: KeyRound },
  { when: "Instructions are only in English", then: "Drivers who read Hindi, Tamil or Telugu miss them", Icon: Languages },
  { when: "A carrier route degrades or DND blocks the message", then: "The 7 PM batch lands the next morning, if at all", Icon: Radio },
]

const STOPS = [
  { n: "01", Icon: Warehouse, t: "Dispatch", msg: "Order confirmed. Expected Thu, 10 AM to 2 PM.", ch: "SMS", d: "Your WMS or TMS calls the API when an order is packed. A DLT-approved template goes out, and smart route failover keeps it on time.", href: "/products/bulk-sms/", link: "Transactional SMS" },
  { n: "02", Icon: Navigation, t: "Out for delivery", msg: "Your package is on the way. Track live: smsl.in/48219", ch: "SMS or WhatsApp", d: "A tap-through tracking link goes to the customer on the channel they use, so they stop calling the hub for an ETA.", href: "/products/bulk-sms/", link: "Bulk SMS" },
  { n: "03", Icon: KeyRound, t: "At the door", msg: "482139 is your delivery OTP. Share it only with the delivery partner.", ch: "OTP SMS", d: "The delivery OTP runs on a priority route, separate from promotional bulk, with automatic retry on failure.", href: "/products/otp-sms/", link: "OTP API" },
  { n: "04", Icon: Bot, t: "Drivers and exceptions", msg: "Shift start. Route 12, 18 dispatches.", ch: "WhatsApp", d: "Two-way WhatsApp for pickup confirmation, shift check-ins and issue escalation, in the language each driver speaks.", href: "/products/whatsapp-business-api/", link: "WhatsApp API" },
]

const CUSTOMER = [
  { Icon: Package, tag: "Order confirmed", body: "Your order is confirmed. Expected delivery: Thu, 10 AM to 2 PM." },
  { Icon: Navigation, tag: "Out for delivery", body: "Your package is on the way. Track live: smsl.in/48219" },
  { Icon: KeyRound, tag: "Delivery OTP", body: "482139 is your delivery OTP. Share it only with the delivery partner." },
  { Icon: CheckCheck, tag: "Delivered", body: "Delivered. Thank you for ordering with us." },
  { Icon: RotateCcw, tag: "Return pickup", body: "Return pickup scheduled for Fri, between 11 AM and 1 PM." },
  { Icon: CircleDollarSign, tag: "COD received", body: "We received ₹1,249 cash on delivery for AWB 48219." },
]
const OPS = [
  { Icon: UserCheck, tag: "Driver check-in", body: "Shift start. Route 12, 18 dispatches.", from: "Driver, on WhatsApp" },
  { Icon: AlertTriangle, tag: "Exception alert", body: "Weather delay at the Hyderabad hub. New ETA: 18:40.", from: "To the customer" },
]

const PIPE = [
  { Icon: Cog, t: "Your WMS or TMS", d: "Dispatch, status change or exception fires an API call or webhook" },
  { Icon: Sparkles, t: "SMSLocal", d: "Picks the template, the language and the channel for that message" },
]
const LANES = [
  { t: "Priority OTP lane", d: "Delivery OTPs, isolated from bulk traffic", c: "#0e9f6e" },
  { t: "Transactional lane", d: "Dispatch, tracking and exception alerts", c: "#2f78bd" },
  { t: "Promotional lane", d: "Offers and upgrades, inside the allowed window", c: "#d98a0b" },
]

const FAQS = [
  { q: "Can I integrate with my WMS or TMS?", a: "Yes, through our REST API and webhooks. Dispatches, status changes and exceptions can all fire messages automatically." },
  { q: "How fast and reliable is OTP delivery?", a: "Delivery OTPs run on a priority route that is isolated from promotional bulk traffic, with automatic retry on failure. Speed depends on the operator and the destination, and delivery reports are available per message." },
  { q: "Can drivers respond in regional languages?", a: "Yes, through WhatsApp. The AI agent replies in 8 Indian languages today: Hindi, English, Tamil, Telugu, Bengali, Marathi, Gujarati and Kannada. The shared inbox accepts any Unicode script, so your human agents can reply in a wider set of languages than the AI covers." },
  { q: "Can I fail over between carriers automatically?", a: "Yes. Smart route failover switches operators on carrier issues, so a dispatch batch at 7 PM still lands even if a single operator route degrades." },
  { q: "Do delivery OTPs and dispatch alerts need DLT templates?", a: "Yes. Dispatch notifications, delivery OTPs and exception alerts are sent as transactional or service messages on pre-registered DLT templates. SMSLocal helps you register your entity and get the templates approved." },
]

/* ─── STYLE TOKENS ────────────────────────────────────────────────────────── */

const EYEBROW = "inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em]"
const H2 = "text-balance text-[28px] font-semibold leading-[1.08] tracking-[-0.035em] sm:text-[38px]"
const BTN = "group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-primary to-[oklch(0.55_0.13_172)] px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:shadow-xl hover:shadow-primary/30"
const BTN_OUT = "inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3.5 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"

const TRUST = [
  { icon: ShieldCheck, label: "DLT-compliant templates" },
  { icon: Radio, label: "Smart route failover" },
  { icon: Languages, label: "8 languages for drivers" },
  { icon: Clock, label: "Priority OTP lanes" },
]

/* ─── PAGE ────────────────────────────────────────────────────────────────── */

export default function LogisticsSolutionPage() {
  return (
    <>
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Solutions", path: "/solutions" },
          { name: "Logistics & Delivery", path: "/solutions/logistics" },
        ]}
      />
      <SiteHeader />
      <main className="overflow-x-clip bg-background font-normal text-foreground">

        {/* 1 · HERO: a parcel travels a route and a message goes out at every stop */}
        <section className="relative isolate overflow-hidden bg-background">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 opacity-50 [background-image:radial-gradient(var(--border)_1.2px,transparent_1.2px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_at_72%_48%,black_10%,transparent_70%)]" />
          </div>
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-14 pt-14 sm:px-6 lg:grid-cols-[1fr_560px] lg:items-stretch lg:gap-8 lg:pb-20 lg:pt-12">
            <div className="lg-rise min-w-0">
              <p className="inline-flex items-center gap-2 rounded-full bg-foreground px-3.5 py-1.5 text-[12.5px] font-medium text-background">
                <Truck className="h-3.5 w-3.5 text-accent" />Solutions &middot; Logistics &amp; Delivery
              </p>
              <h1 className="mt-6 text-balance text-[30px] font-semibold leading-[1.1] tracking-[-0.035em] sm:text-[42px]">
                Every parcel keeps its customer <span className="text-primary">in the loop.</span>
              </h1>
              <p className="mt-5 max-w-lg text-pretty text-[17px] leading-relaxed text-muted-foreground">
                Dispatch alerts, delivery OTPs, live-tracking links and driver check-ins over SMS and WhatsApp, in the language each driver and customer speaks.
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
            <div className="lg-rise min-w-0" style={{ animationDelay: "0.15s" }}>
              <LogisticsHero />
            </div>
          </div>
        </section>

        {/* 2 · THE PROBLEM: cause and effect, side by side */}
        <section className="bg-secondary py-20 lg:py-28">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className={`${EYEBROW} text-primary`}>The problem</p>
              <h2 className={`${H2} mt-5`}>A late message is a phone call waiting to happen.</h2>
              <p className="mt-5 max-w-md text-[16px] leading-relaxed text-muted-foreground">Most generic SMS platforms were not designed for last-mile delivery in India: carrier flakiness, DND restrictions and a workforce that does not always read English. You need routing that compensates for all three automatically.</p>
            </div>
            <div className="space-y-4">
              {CAUSES.map((c) => (
                <div key={c.when} className="grid items-stretch gap-0 overflow-hidden rounded-2xl bg-white ring-1 ring-border shadow-[0_24px_44px_-34px_rgba(15,26,46,.35)] sm:grid-cols-[1fr_auto_1fr]">
                  <div className="p-5">
                    <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground">When</p>
                    <p className="mt-1.5 text-[15.5px] font-medium leading-snug">{c.when}</p>
                  </div>
                  <div className="flex items-center justify-center bg-secondary px-3 py-1 text-primary sm:py-0"><ArrowRight className="hidden h-5 w-5 sm:block" /><ArrowDown className="h-5 w-5 sm:hidden" /></div>
                  <div className="bg-[#fff4ec] p-5">
                    <p className="flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.18em] text-[#b4531a]"><c.Icon className="h-3.5 w-3.5" />Then</p>
                    <p className="mt-1.5 text-[15.5px] font-medium leading-snug text-[#7a3a10]">{c.then}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3 · HOW SMSLOCAL SOLVES IT: the journey of one order, stop by stop */}
        <section className="bg-background py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <p className={`${EYEBROW} text-primary`}>How SMSLocal solves it</p>
              <h2 className={`${H2} mt-5`}>One order, four stops, a message at each.</h2>
            </div>
            <ol className="relative mt-14 grid gap-10 md:grid-cols-4 md:gap-5">
              <span aria-hidden className="absolute left-[27px] top-6 hidden h-[3px] rounded-full bg-primary/25 md:block" style={{ right: "12%" }} />
              {STOPS.map((s) => (
                <li key={s.t} className="relative">
                  <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_14px_24px_-10px_rgba(18,160,124,.7)] ring-8 ring-background"><s.Icon className="h-6 w-6" /></span>
                  <p className="mt-5 font-mono text-[11px] font-semibold tracking-[0.16em] text-primary">STOP {s.n}</p>
                  <h3 className="mt-1 text-[19px] font-semibold tracking-tight">{s.t}</h3>
                  <div className="mt-4 rounded-2xl rounded-tl-md bg-secondary p-3.5">
                    <p className="text-[13.5px] leading-snug">{s.msg}</p>
                    <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{s.ch}</p>
                  </div>
                  <p className="mt-4 text-[14.5px] leading-relaxed text-muted-foreground">{s.d}</p>
                  <Link href={s.href} className="mt-3 inline-flex items-center gap-1.5 text-[14px] font-semibold text-primary hover:underline">{s.link} <ArrowRight className="h-3.5 w-3.5" /></Link>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 4 · USE CASES: the actual messages, in two lanes */}
        <section className="bg-secondary py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <p className={`${EYEBROW} text-primary`}>Use cases</p>
              <h2 className={`${H2} mt-5`}>Every touchpoint between dispatch and delivery.</h2>
            </div>
            <div className="mt-12 grid gap-6 lg:grid-cols-[1.35fr_1fr]">
              <div className="rounded-3xl bg-white p-6 ring-1 ring-border shadow-[0_30px_60px_-40px_rgba(15,26,46,.3)] sm:p-7">
                <p className="flex items-center gap-2 text-[14px] font-semibold"><span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground"><Package className="h-4 w-4" /></span>To the customer</p>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {CUSTOMER.map((m) => (
                    <li key={m.tag} className="rounded-2xl bg-secondary p-4">
                      <p className="flex items-center gap-1.5 font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-primary"><m.Icon className="h-3.5 w-3.5" />{m.tag}</p>
                      <p className="mt-2 text-[14px] leading-snug">{m.body}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl bg-[#0f2a47] p-6 text-white sm:p-7">
                <p className="flex items-center gap-2 text-[14px] font-semibold"><span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#0e9f6e]"><Truck className="h-4 w-4" /></span>Drivers and operations</p>
                <ul className="mt-5 space-y-3">
                  {OPS.map((m) => (
                    <li key={m.tag} className="rounded-2xl bg-white/[0.08] p-4">
                      <p className="flex items-center gap-1.5 font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#7fdcb8]"><m.Icon className="h-3.5 w-3.5" />{m.tag}</p>
                      <p className="mt-2 text-[14px] leading-snug text-white/90">{m.body}</p>
                      <p className="mt-2 text-[11.5px] text-white/50">{m.from}</p>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 flex items-start gap-2 text-[13.5px] leading-relaxed text-white/65"><Languages className="mt-0.5 h-4 w-4 shrink-0 text-[#7fdcb8]" />Drivers reply on WhatsApp in 8 Indian languages. Your own agents can answer in any Unicode script.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 5 · RELIABILITY: how a message is routed so it still lands */}
        <section className="bg-background py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <p className={`${EYEBROW} justify-center text-primary`}>Built to land</p>
              <h2 className={`${H2} mt-5`}>Every message is routed by what it is.</h2>
              <p className="mx-auto mt-4 max-w-xl text-[16px] leading-relaxed text-muted-foreground">An OTP and an offer should never share a queue. SMSLocal sends each on its own lane and switches operators when one route degrades.</p>
            </div>
            <div className="mt-14 grid items-center gap-4 lg:grid-cols-[1fr_auto_1fr_auto_1.2fr_auto_1fr]">
              {PIPE.map((p) => (
                <div key={p.t} className="contents">
                  <div className="rounded-2xl bg-white p-5 ring-1 ring-border shadow-[0_24px_44px_-34px_rgba(15,26,46,.35)]">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary"><p.Icon className="h-5 w-5" /></span>
                    <p className="mt-3 text-[16px] font-semibold tracking-tight">{p.t}</p>
                    <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted-foreground">{p.d}</p>
                  </div>
                  <><ArrowRight className="mx-auto hidden h-5 w-5 text-primary lg:block" /><ArrowDown className="mx-auto h-5 w-5 text-primary lg:hidden" /></>
                </div>
              ))}
              <div className="space-y-2.5">
                {LANES.map((l) => (
                  <div key={l.t} className="flex items-center gap-3 rounded-xl bg-white p-3.5 ring-1 ring-border">
                    <i className="h-9 w-1.5 shrink-0 rounded-full" style={{ background: l.c }} />
                    <div><p className="text-[14px] font-semibold leading-tight">{l.t}</p><p className="mt-0.5 text-[12.5px] leading-snug text-muted-foreground">{l.d}</p></div>
                  </div>
                ))}
              </div>
              <><ArrowRight className="mx-auto hidden h-5 w-5 text-primary lg:block" /><ArrowDown className="mx-auto h-5 w-5 text-primary lg:hidden" /></>
              <div className="rounded-2xl bg-[#0f2a47] p-5 text-white">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-[#7fdcb8]"><Radio className="h-5 w-5" /></span>
                <p className="mt-3 text-[16px] font-semibold tracking-tight">Operators, with failover</p>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-white/65">If one operator route degrades, the message moves to another and still lands.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 6 · COMPLIANCE: the day, in two windows */}
        <section className="bg-secondary py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid items-end gap-6 lg:grid-cols-[1fr_1fr] lg:gap-16">
              <div>
                <p className={`${EYEBROW} text-primary`}>Compliance</p>
                <h2 className={`${H2} mt-5`}>Time-sensitive messages are not held to the promotional clock.</h2>
              </div>
              <p className="text-[16px] leading-relaxed text-muted-foreground">Dispatch notifications, delivery OTPs and exception alerts are classified as transactional or service messages under TRAI rules. Sent on pre-registered DLT templates, they are not blocked by DND or limited to a send window, so a delivery OTP at 10:30 PM still lands.</p>
            </div>
            <div className="mt-12 rounded-3xl bg-white p-6 ring-1 ring-border shadow-[0_30px_60px_-40px_rgba(15,26,46,.3)] sm:p-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">One day, 12 AM to 12 AM</p>
              <div className="mt-6 space-y-5">
                <div>
                  <p className="flex items-center gap-2 text-[14px] font-semibold"><Check className="h-4 w-4 text-primary" strokeWidth={3.4} />Dispatch, OTP and exception alerts <span className="font-normal text-muted-foreground">on registered DLT templates</span></p>
                  <div className="mt-2.5 h-3 rounded-full bg-primary" />
                </div>
                <div>
                  <p className="flex items-center gap-2 text-[14px] font-semibold"><Sparkles className="h-4 w-4 text-[#d98a0b]" />Promotional offers and upgrades <span className="font-normal text-muted-foreground">opt-in only, 9 AM to 9 PM</span></p>
                  <div className="relative mt-2.5 h-3 rounded-full bg-[#eef1f5]"><i className="absolute inset-y-0 rounded-full bg-[#e6a43a]" style={{ left: "37.5%", width: "50%" }} /></div>
                </div>
              </div>
              <div className="mt-3 flex justify-between font-mono text-[10.5px] text-muted-foreground"><span>12 AM</span><span>6 AM</span><span>12 PM</span><span>6 PM</span><span>12 AM</span></div>
              <p className="mt-6 text-[14px] leading-relaxed text-muted-foreground">SMSLocal applies both classifications automatically, so a shipping-upgrade offer waits for the morning while the OTP goes straight out.</p>
            </div>
          </div>
        </section>

        <FaqJsonLd items={FAQS} path="/solutions/logistics" />
        <FaqSection items={FAQS} />

        <RelatedContent path="/solutions/logistics" />

        <ProductFinalCta
          title="Faster messaging, fewer exceptions."
          subtitle="Dispatch your first million SMS without a monthly plan."
          primaryCta={{ label: "Start your trial", href: "/signup/" }}
          secondaryCta={{ label: "Talk to sales", href: "/company/contact/" }}
        />
      </main>
      <SiteFooter />

      <style>{`
        @keyframes lg-rise { from { opacity: 0; transform: translateY(26px) } to { opacity: 1; transform: none } }
        .lg-rise { animation: lg-rise .9s cubic-bezier(.2,.7,.2,1) both }
        @media (prefers-reduced-motion: reduce) { .lg-rise { animation: none } }
      `}</style>
    </>
  )
}
