import type { Metadata } from "next"
import { getPageMetadata } from "@/lib/seo"
import Link from "next/link"
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Check,
  GitBranch,
  Layers,
  MessageSquare,
  Minus,
  Plus,
  Receipt,
  Sparkles,
  Stethoscope,
  Store,
  Truck,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { RcsChatHero } from "@/components/product/rcs-chat-hero"
import { AnnouncementStrip } from "@/components/landing/announcement-strip"
import { SiteHeader } from "@/components/landing/site-header"
import { ExploreMore } from "@/components/product/explore-more"
import { SiteFooter } from "@/components/landing/site-footer"
import { FaqSection } from "@/components/landing/faq-section"
import { GsFinalCta } from "@/components/home/gs/sections-c"
import { RcsDev, RcsStyles } from "@/components/product/rcs-sections"
import { BreadcrumbJsonLd, FaqJsonLd, ProductServiceJsonLd } from "@/components/seo/json-ld"

// ─── SEO — edit lib/seo/registry.ts or open /dev/seo to preview ──────────────
export const metadata: Metadata = getPageMetadata("/products/rcs")

const BTN = "group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-primary to-[oklch(0.55_0.13_172)] px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:shadow-xl hover:shadow-primary/30"
const BTN_OUT = "inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3.5 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"

const TRUST = [
  { icon: BadgeCheck, label: "Verified sender badge" },
  { icon: Layers, label: "Rich cards & carousels" },
  { icon: MessageSquare, label: "Automatic SMS fallback" },
  { icon: GitBranch, label: "One dashboard, one webhook" },
]

const EYEBROW = "inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em]"
const H2 = "text-balance text-[28px] font-semibold leading-[1.08] tracking-[-0.035em] sm:text-[38px]"

const DIFF: { k: string; out: string; add: string }[] = [
  { k: "Sender", out: "An anonymous sender ID such as VM-URBCRT", add: "Your brand name, logo and verification tick" },
  { k: "Content", out: "Plain text, 160 characters per segment", add: "A photo, title and description in one card" },
  { k: "Action", out: "A link the customer has to open", add: "Buy now, Track order and Call us buttons" },
  { k: "Feedback", out: "A delivery report, at best", add: "Delivered, read and button-tapped statuses" },
  { k: "Reach", out: "Every phone, nothing richer", add: "RCS phones get the card, the rest get your DLT SMS" },
]

type Use = { Icon: LucideIcon; t: string; d: string; from: string; msg: string; extra: "image" | "bar" | "amount" | "date"; btn: string[] }
const USES: Use[] = [
  { Icon: Store, t: "Retail and D2C", d: "Order updates with a track button, offer carousels and back-in-stock alerts.", from: "Urban Cart", msg: "Your order #1042 is on its way.", extra: "image", btn: ["Track order"] },
  { Icon: Building2, t: "Banking and fintech", d: "Verified alerts and payment reminders customers can trust at a glance.", from: "Fin Bank", msg: "We received your payment. Thank you.", extra: "amount", btn: ["View receipt"] },
  { Icon: Truck, t: "Logistics", d: "Delivery status cards with a one-tap reschedule or contact option.", from: "QuickShip", msg: "Your parcel is out for delivery today.", extra: "bar", btn: ["Reschedule", "Call driver"] },
  { Icon: Stethoscope, t: "Healthcare", d: "Appointment confirmations with Confirm and Reschedule buttons.", from: "CareFirst Clinic", msg: "Your appointment is tomorrow with Dr. Rao.", extra: "date", btn: ["Confirm", "Reschedule"] },
  { Icon: Receipt, t: "Collections", d: "Clear reminders with a tappable pay link from a verified sender.", from: "Fin Bank", msg: "Your payment is due this week.", extra: "amount", btn: ["Pay now"] },
]

const BRING = [
  "A verified business identity",
  "Your brand assets: name, logo and colours",
  "Your DLT-approved SMS template, for the fallback",
  "A first use case, such as order updates",
]
const WE = [
  "Guide you through carrier approval",
  "Register your RCS agent with the carriers",
  "Check every phone for RCS support",
  "Send RCS or SMS from a single request",
  "Report both on one webhook and one dashboard",
]

const FAQ = [
  {
    q: "What is RCS business messaging and how is it different from SMS?",
    a: "RCS (Rich Communication Services) is the carrier-upgraded successor to SMS. On capable Android phones it supports a verified sender, hero images, carousels, tappable suggested replies, read receipts and typing indicators, rendered natively in Google Messages. It uses the recipient's phone number and needs no separate app.",
  },
  {
    q: "Does RCS work on iPhone in India?",
    a: "Apple added RCS support in iOS 18 and it is rolling out on carriers progressively. Where RCS is available on iPhone we use it; otherwise we fall back to your DLT-compliant SMS template automatically, so your campaign reaches everyone regardless of device.",
  },
  {
    q: "Which Indian carriers support RCS?",
    a: "RCS is live on Jio and Airtel for most Android handsets using Google Messages, with Vi rolling out progressively. SMSLocal's waterfall checks each recipient's capability automatically, so you do not encode carrier logic into your product.",
  },
  {
    q: "What do I need to send branded RCS messages?",
    a: "A verified business identity (we guide you through carrier approval), your brand assets such as logo, colours and name, and one or more RCS agents that our team registers with the carriers. Once approved you can send from the dashboard or the API.",
  },
  {
    q: "Do I need to rebuild my integration to use the RCS API?",
    a: "No. If you already send SMS on SMSLocal, add a card object and a fallback template to your existing payload. Your webhook format, authentication and delivery statuses stay the same, with a channel_used field showing which path landed.",
  },
  {
    q: "Is RCS DLT-compliant?",
    a: "DLT rules in India apply to SMS. RCS follows the carriers' RCS Business Messaging programmes, with their own content and sender-verification approvals. We manage both, so you get a verified RCS brand for the rich path and a DLT SMS template for the fallback.",
  },
  {
    q: "What happens if a customer's phone does not support RCS?",
    a: "SMSLocal checks capability per number in real time. If the handset cannot receive RCS, the message is sent as your approved DLT SMS on the same operator route, and one webhook confirms which channel delivered.",
  },
  {
    q: "RCS or WhatsApp: which should I use?",
    a: "They work well together. RCS reaches Android users in their default messaging app with a verified brand and no opt-in app install, while WhatsApp reaches users inside WhatsApp. One SMSLocal API lets you run RCS, WhatsApp and SMS as a single waterfall.",
  },
]

const RELATED = [
  { href: "/channels/whatsapp/", label: "WhatsApp Business API", hint: "Official API, templates and AI replies" },
  { href: "/products/analytics/", label: "Agentic AI analytics", hint: "CSAT, sentiment and campaign results" },
  { href: "/products/integrations/", label: "Integrations and API", hint: "Shopify, HubSpot, REST API and more" },
  { href: "/numbers/did/", label: "DID and virtual numbers", hint: "Local and toll-free numbers" },
]

export default function RcsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <ProductServiceJsonLd
        name="RCS Business Messaging"
        description="Send branded, verified RCS Business Messages over Indian carrier networks with rich cards, carousels, suggested replies, and automatic DLT-compliant SMS fallback on the same API."
        path="/products/rcs"
        category="Rich business messaging"
      />
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
          { name: "RCS Business Messaging", path: "/products/rcs" },
        ]}
      />      <FaqJsonLd items={FAQ} path="/products/rcs" />
      <SiteHeader />
      <main className="flex-1">
        <section className="relative overflow-hidden bg-white">
          <div className="mx-auto grid max-w-7xl items-stretch gap-10 px-4 pb-14 pt-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_490px] lg:gap-10 lg:pb-12 lg:pt-10 xl:grid-cols-[minmax(0,1fr)_520px]">
            <div className="rcs-rise flex min-w-0 flex-col justify-center gap-7">
              <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-foreground px-3.5 py-1.5 text-[12.5px] font-medium text-background">
                <Sparkles className="h-3.5 w-3.5 text-accent" />RCS Business Messaging
              </p>
              <h1 className="mt-5 text-balance text-[28px] font-extrabold leading-[1.1] tracking-[-0.035em] sm:text-[34px] lg:text-[32px] xl:text-[36px]">
                RCS business messaging in India, <span className="text-primary">with SMS fallback built in.</span>
              </h1>
              <p className="mt-4 max-w-md text-pretty text-[15.5px] leading-relaxed text-muted-foreground">
                Send verified, branded rich cards with tappable buttons on Jio, Airtel and Vi. Phones that cannot show RCS get your approved SMS automatically, from the same dashboard and webhook.
              </p>
              </div>
              <div>
              <div className="flex flex-wrap items-center gap-3">
                <Link href="/signup/" className={BTN}>Join RCS early access <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" /></Link>
                <Link href="/company/contact/" className={BTN_OUT}>Talk to our team</Link>
              </div>
              <ul className="mt-6 grid max-w-lg grid-cols-1 gap-x-8 gap-y-2 text-[14px] text-muted-foreground sm:grid-cols-2">
                {TRUST.map((t) => (
                  <li key={t.label} className="flex items-start gap-2.5 leading-snug"><t.icon className="mt-[1px] h-4 w-4 shrink-0 text-primary" /><span>{t.label}</span></li>
                ))}
              </ul>
              </div>
            </div>
            <div className="rcs-rise flex min-w-0 items-center" style={{ animationDelay: "0.15s" }}>
              <div className="w-full">
              <RcsChatHero />
              </div>
            </div>
          </div>
          <style>{`
            @keyframes rcs-rise { from { opacity: 0; transform: translateY(26px) } to { opacity: 1; transform: none } }
            .rcs-rise { animation: rcs-rise .9s cubic-bezier(.2,.7,.2,1) both }
            @media (prefers-reduced-motion: reduce) { .rcs-rise { animation: none } }
          `}</style>
        </section>

        {/* 2 · WHAT IS RCS: a dictionary entry */}
        <section className="bg-background py-20 lg:py-28">
          <div className="mx-auto grid max-w-6xl gap-14 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
            <div>
              <p className={`${EYEBROW} text-primary`}>Rich communication services India</p>
              <p className="mt-6 flex flex-wrap items-baseline gap-x-5 gap-y-1">
                <span className="text-[64px] font-semibold leading-none tracking-[-0.05em] sm:text-[88px]">RCS</span>
                <span className="font-mono text-[14px] text-muted-foreground">/ ar-see-ess /</span>
                <span className="text-[15px] italic text-muted-foreground">noun</span>
              </p>
              <ol className="mt-8 space-y-5 border-t-2 border-foreground pt-6">
                {[
                  "The carrier-upgraded successor to SMS, built into Google Messages on Android.",
                  "A message that carries your verified name and logo, pictures, cards and buttons.",
                  "Sent to a phone number, with nothing for the customer to install.",
                ].map((d, i) => (
                  <li key={d} className="flex gap-4 text-[17px] leading-relaxed sm:text-[19px]"><span className="font-mono text-[14px] text-primary">{i + 1}.</span><span>{d}</span></li>
                ))}
              </ol>
            </div>
            <aside className="self-end border-l-2 border-primary pl-7">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Good to know</p>
              <dl className="mt-5 space-y-6 text-[15px] leading-relaxed">
                <div><dt className="font-semibold">Where it works</dt><dd className="mt-1 text-muted-foreground">Android phones using Google Messages. iPhones from iOS 18, as carriers roll it out.</dd></div>
                <div><dt className="font-semibold">On Indian networks</dt><dd className="mt-1 text-muted-foreground">Live on Jio and Airtel, rolling out on Vi.</dd></div>
                <div><dt className="font-semibold">When it cannot be shown</dt><dd className="mt-1 text-muted-foreground">The same send falls back to your DLT-approved SMS.</dd></div>
              </dl>
            </aside>
          </div>
        </section>

        {/* 3 · HOW IT CHANGES YOUR MESSAGES: a diff panel */}
        <section className="bg-[#0f2a47] py-20 text-white lg:py-28">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <p className={`${EYEBROW} text-[#9ee6c8]`}>RCS SMS fallback</p>
              <h2 className={`${H2} mt-5`}>What changes when you send RCS instead of SMS.</h2>
              <p className="mt-4 text-[16px] leading-relaxed text-white/70">One request, with SMS right behind it for every phone that cannot show the card.</p>
            </div>
            <div className="mt-12 overflow-hidden rounded-2xl bg-[#0a1c31] ring-1 ring-white/10">
              <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3 font-mono text-[12px] text-white/50"><span className="flex gap-1.5"><i className="h-2.5 w-2.5 rounded-full bg-white/20" /><i className="h-2.5 w-2.5 rounded-full bg-white/20" /><i className="h-2.5 w-2.5 rounded-full bg-white/20" /></span><span className="ml-2">sms-to-rcs</span></div>
              <div className="divide-y divide-white/5 text-[14.5px]">
                {DIFF.map((d) => (
                  <div key={d.k}>
                    <p className="flex items-start gap-3 bg-[#e5484d]/10 px-5 py-3 text-white/60"><Minus className="mt-1 h-4 w-4 shrink-0 text-[#ff8a8e]" /><span><span className="mr-2 font-mono text-[11px] uppercase tracking-wider text-white/40">{d.k}</span>{d.out}</span></p>
                    <p className="flex items-start gap-3 bg-[#0e9f6e]/15 px-5 py-3 font-medium text-white"><Plus className="mt-1 h-4 w-4 shrink-0 text-[#9ee6c8]" /><span><span className="mr-2 font-mono text-[11px] uppercase tracking-wider text-[#9ee6c8]/70">{d.k}</span>{d.add}</span></p>
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-8 flex items-start gap-3 text-[14.5px] leading-relaxed text-white/70"><Layers className="mt-0.5 h-5 w-5 shrink-0 text-[#9ee6c8]" />RCS follows the carriers&apos; own business messaging approvals, and the SMS fallback uses your DLT-approved template. We manage both.</p>
          </div>
        </section>

        {/* 4 · FOR DEVELOPERS: the existing code walk-through */}
        <RcsDev />

        {/* 5 · WHERE TEAMS USE IT: a masonry of the messages themselves */}
        <section className="bg-secondary py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <p className={`${EYEBROW} justify-center text-primary`}>Google RCS India</p>
              <h2 className={`${H2} mt-5`}>Where teams use RCS first.</h2>
              <p className="mx-auto mt-4 max-w-xl text-[16px] leading-relaxed text-muted-foreground">Start with the messages customers already open, then add the button that saves them a step.</p>
            </div>
            <div className="mt-14 gap-6 sm:columns-2 lg:columns-3">
              {USES.map((u) => (
                <article key={u.t} className="mb-8 break-inside-avoid">
                  <div className="overflow-hidden rounded-2xl bg-white" style={{ boxShadow: "0 28px 40px -28px rgba(15,42,71,.4), 0 0 0 1px rgba(15,42,71,.07)" }}>
                    <p className="flex items-center gap-2 px-4 pt-4 text-[13px] font-semibold"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0f2a47] text-[11px] font-bold text-white">{u.from[0]}</span>{u.from}<BadgeCheck className="h-4 w-4 text-[#0e9f6e]" /></p>
                    {u.extra === "image" && <div className="mx-4 mt-3 flex h-24 items-center justify-center rounded-xl" style={{ background: "linear-gradient(135deg, #d9f2e6, #c9d8ff)" }}><Truck className="h-8 w-8 text-[#0e9f6e]" /></div>}
                    <p className="px-4 pt-3 text-[14.5px] font-medium">{u.msg}</p>
                    {u.extra === "amount" && <p className="px-4 pt-1 text-[15px] font-semibold tracking-tight text-[#0f2a47]/70">Ref PAY-2041</p>}
                    {u.extra === "bar" && <div className="mx-4 mt-3 grid grid-cols-3 gap-1.5"><i className="h-1.5 rounded-full bg-[#0e9f6e]" /><i className="h-1.5 rounded-full bg-[#0e9f6e]" /><i className="h-1.5 rounded-full bg-[#e2e8f0]" /></div>}
                    {u.extra === "date" && <p className="mx-4 mt-3 rounded-lg bg-[#eef7f2] px-3 py-2 text-[12.5px] text-[#0b7a55]">Tomorrow, with Dr. Rao</p>}
                    <div className="flex flex-wrap gap-2 px-4 pb-4 pt-3.5">{u.btn.map((b) => <span key={b} className="rounded-full border border-[#0e9f6e] bg-[#e9f7f0] px-3.5 py-1.5 text-[12px] font-semibold text-[#0b7a55]">{b}</span>)}</div>
                  </div>
                  <p className="mt-4 flex items-center gap-2 text-[17px] font-semibold tracking-tight"><u.Icon className="h-5 w-5 text-[#0e9f6e]" />{u.t}</p>
                  <p className="mt-1 text-[14.5px] leading-relaxed text-muted-foreground">{u.d}</p>
                </article>
              ))}
            </div>
            <div className="mt-6 text-center"><Link href="/signup/" className={BTN}>Join RCS early access <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" /></Link></div>
          </div>
        </section>

        {/* 6 · GOING LIVE: what you bring, what we do */}
        <section className="bg-background py-20 lg:py-28">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <p className={`${EYEBROW} text-primary`}>RBM India</p>
              <h2 className={`${H2} mt-5`}>From approval to your first rich message.</h2>
              <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-muted-foreground">We handle the carrier paperwork alongside you, so your team can focus on the message.</p>
            </div>
            <div className="mt-12 grid overflow-hidden rounded-3xl border border-border md:grid-cols-2">
              <div className="p-8 sm:p-10">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">You bring</p>
                <ul className="mt-6 space-y-4">{BRING.map((x) => <li key={x} className="flex items-start gap-3 text-[15.5px] leading-snug"><span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 border-foreground/30" />{x}</li>)}</ul>
              </div>
              <div className="bg-[#0f2a47] p-8 text-white sm:p-10">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#9ee6c8]">SMSLocal does</p>
                <ul className="mt-6 space-y-4">{WE.map((x) => <li key={x} className="flex items-start gap-3 text-[15.5px] leading-snug"><span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded bg-[#0e9f6e]"><Check className="h-3.5 w-3.5" /></span>{x}</li>)}</ul>
              </div>
            </div>
          </div>
        </section>

        <FaqSection items={FAQ} />
        <ExploreMore links={RELATED} />
        <RcsStyles />
        <GsFinalCta />
      </main>
      <SiteFooter />
    </div>
  )
}
