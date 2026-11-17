import type { Metadata } from "next"
import Link from "next/link"
import { getPageMetadata } from "@/lib/seo"
import {
  ArrowRight,
  Bot,
  BellRing,
  Building2,
  Cake,
  CalendarCheck,
  Check,
  Clock,
  Gift,
  MessageSquareHeart,
  PartyPopper,
  ShieldCheck,
  Sparkles,
  Star,
  Store,
  Tag,
  X,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { FaqSection } from "@/components/landing/faq-section"
import { RelatedContent } from "@/components/shared/related-content"
import { ProductFinalCta } from "@/components/product/product-page"
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/json-ld"
import { RetailHero } from "@/components/solution/retail-hero"

// ─── SEO — edit lib/seo/registry.ts or open /dev/seo to preview ──────────────
export const metadata: Metadata = getPageMetadata("/solutions/retail")

/* ─── DATA ────────────────────────────────────────────────────────────────── */

const BEFORE_AFTER = [
  { moment: "After a visit", without: "A walk-in leaves and you never hear from them again.", with: "A loyalty message with their points brings them back." },
  { moment: "Reservations", without: "No-shows quietly empty tables and chairs.", with: "Day-before and 2-hour reminders hold the booking." },
  { moment: "A quiet afternoon", without: "A flash sale waits for the campaign team.", with: "A 4-hour offer goes out in minutes." },
  { moment: "Feedback", without: "Unhappy guests tell the internet, not you.", with: "The AI follows up and a manager steps in." },
]

const POSTERS: { Icon: LucideIcon; bg: string; fg: string; t: string; d: string; msg: string; ch: string; href: string; link: string }[] = [
  { Icon: Gift, bg: "linear-gradient(160deg, #6a4fe0, #4630b3)", fg: "#ffffff", t: "Loyalty programme messaging", d: "Point-balance updates, earned-offer alerts and tier-upgrade notifications, automated from your CRM or POS via API.", msg: "You just earned 320 points. Balance: 2,140. Gold tier.", ch: "WhatsApp", href: "/products/whatsapp-business-api/", link: "WhatsApp details" },
  { Icon: CalendarCheck, bg: "linear-gradient(160deg, #14a574, #0b7752)", fg: "#ffffff", t: "Reservation confirmations and reminders", d: "Day-before and 2-hour reminders, sent as DLT-compliant transactional SMS or WhatsApp, to help cut no-shows.", msg: "Table for 4 at 7:30 PM tonight. Reply 1 to confirm.", ch: "SMS or WhatsApp", href: "/products/bulk-sms/", link: "Transactional SMS details" },
  { Icon: BellRing, bg: "linear-gradient(160deg, #e5446d, #b3234c)", fg: "#ffffff", t: "Flash sales and limited-time offers", d: "Launch a 4-hour promo in minutes from Quick SMS: no coding, no integration, just a segmented contact list and a DLT template.", msg: "40% off the winter collection till 9 PM, in store today.", ch: "Quick SMS", href: "/products/quick-sms/", link: "Quick SMS details" },
  { Icon: MessageSquareHeart, bg: "linear-gradient(160deg, #1aa3b8, #0e6c80)", fg: "#ffffff", t: "Post-visit feedback with AI follow-up", d: "A WhatsApp survey goes out after checkout. The AI agent follows up on negative feedback and escalates to a human manager.", msg: "Thanks for dining with us! How was your visit? Rate 1 to 5.", ch: "WhatsApp", href: "/products/whatsapp-business-api/", link: "AI agent details" },
]

const WEEK: { day: string; items: { Icon: LucideIcon; t: string; k: "retail" | "hosp" }[] }[] = [
  { day: "Mon", items: [{ Icon: Star, t: "Loyalty point balance and tier updates", k: "retail" }] },
  { day: "Tue", items: [{ Icon: Cake, t: "Birthday and anniversary offers", k: "retail" }] },
  { day: "Wed", items: [{ Icon: Tag, t: "Flash sale and limited-stock alerts", k: "retail" }] },
  { day: "Thu", items: [{ Icon: CalendarCheck, t: "Reservation reminders, day-before and 2-hour", k: "hosp" }] },
  { day: "Fri", items: [{ Icon: PartyPopper, t: "Seasonal campaigns: Diwali, Valentine's, New Year", k: "retail" }, { Icon: Check, t: "Restaurant, salon and hotel reservation confirmations", k: "hosp" }] },
  { day: "Sat", items: [{ Icon: Tag, t: "Weekend flash sale", k: "retail" }] },
  { day: "Sun", items: [{ Icon: MessageSquareHeart, t: "Post-visit feedback surveys on WhatsApp", k: "hosp" }] },
]

const OUTLETS = ["Whitefield", "Koramangala", "Indiranagar"]

const FAQS = [
  { q: "Can I tie SMS events to my POS?", a: "Yes, via API triggers or Zapier-style integrations. Every checkout, reservation or inventory change can fire a message automatically." },
  { q: "Can I send reservation reminders without DND restrictions?", a: "Yes, when they are on transactional templates. Reservation confirmations, table-ready pings and check-in codes are classified as transactional and are DND-exempt." },
  { q: "How does the AI agent handle negative feedback?", a: "The agent flags negative sentiment automatically and escalates to a human manager. You can configure routing by outlet so the right general manager gets the chat, not a shared inbox." },
  { q: "Can I run one account across multiple outlets or brands?", a: "Yes. Create sub-accounts per outlet or brand, each with its own sender ID, templates and wallet, all rolling up into a single master invoice." },
  { q: "Which channel should I use for which message?", a: "Use transactional SMS for confirmations and reminders, WhatsApp for loyalty and feedback, and Quick SMS for a fast flash sale. Every template is registered once and routed to the right lane." },
]

/* ─── STYLE TOKENS ────────────────────────────────────────────────────────── */

const EYEBROW = "inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em]"
const H2 = "text-balance text-[28px] font-semibold leading-[1.08] tracking-[-0.035em] sm:text-[38px]"
const BTN = "group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-primary to-[oklch(0.55_0.13_172)] px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:shadow-xl hover:shadow-primary/30"
const BTN_OUT = "inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3.5 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"

const TRUST = [
  { icon: ShieldCheck, label: "DLT-compliant templates" },
  { icon: Clock, label: "Pay-as-you-go" },
  { icon: Bot, label: "AI WhatsApp for guest chats" },
  { icon: Sparkles, label: "Festive-ready throughput" },
]

/* ─── PAGE ────────────────────────────────────────────────────────────────── */

export default function RetailSolutionPage() {
  return (
    <>
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Solutions", path: "/solutions" },
          { name: "Retail & Hospitality", path: "/solutions/retail" },
        ]}
      />
      <SiteHeader />
      <main className="overflow-x-clip bg-background font-normal text-foreground">

        {/* 1 · HERO: a loyalty card, shopping bags and four sequential popups */}
        <section className="relative isolate overflow-hidden bg-background">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 opacity-50 [background-image:radial-gradient(var(--border)_1.2px,transparent_1.2px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_at_72%_48%,black_10%,transparent_70%)]" />
          </div>
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-14 pt-14 sm:px-6 lg:grid-cols-[1fr_560px] lg:items-stretch lg:gap-8 lg:pb-20 lg:pt-12">
            <div className="rt-rise min-w-0">
              <p className="inline-flex items-center gap-2 rounded-full bg-foreground px-3.5 py-1.5 text-[12.5px] font-medium text-background">
                <Store className="h-3.5 w-3.5 text-accent" />Solutions &middot; Retail &amp; Hospitality
              </p>
              <h1 className="mt-6 text-balance text-[30px] font-semibold leading-[1.1] tracking-[-0.035em] sm:text-[42px]">
                Keep your customers and guests <span className="text-primary">coming back.</span>
              </h1>
              <p className="mt-5 max-w-lg text-pretty text-[17px] leading-relaxed text-muted-foreground">
                Loyalty offers, reservation confirmations, flash sales, feedback requests and post-visit follow-up, from one dashboard.
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
            <div className="rt-rise min-w-0" style={{ animationDelay: "0.15s" }}>
              <RetailHero />
            </div>
          </div>
        </section>

        {/* 2 · THE PROBLEM: the same four moments, without and with messaging */}
        <section className="bg-secondary py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <p className={`${EYEBROW} text-primary`}>The problem</p>
              <h2 className={`${H2} mt-5`}>Repeat visits make the margin. Messaging protects them.</h2>
              <p className="mt-5 text-[16px] leading-relaxed text-muted-foreground">Walk-in data is not worth much if you cannot reach the customer again. Loyalty programmes fail without reliable messaging, and reservation no-shows quietly kill margins.</p>
            </div>
            <div className="mt-12 overflow-hidden rounded-3xl bg-white ring-1 ring-border shadow-[0_30px_60px_-40px_rgba(15,26,46,.3)]">
              <div className="hidden grid-cols-[150px_1fr_1fr] border-b border-border text-[12px] font-semibold uppercase tracking-[0.14em] md:grid">
                <span className="p-4" />
                <span className="flex items-center gap-2 bg-[#fff1ec] p-4 text-[#b4531a]"><X className="h-4 w-4" strokeWidth={3} />Without messaging</span>
                <span className="flex items-center gap-2 bg-[#e8f7f0] p-4 text-[#0b7a55]"><Check className="h-4 w-4" strokeWidth={3.4} />With SMSLocal</span>
              </div>
              {BEFORE_AFTER.map((r, i) => (
                <div key={r.moment} className={`grid md:grid-cols-[150px_1fr_1fr] ${i ? "border-t border-border" : ""}`}>
                  <p className="p-4 pb-1 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground md:py-5">{r.moment}</p>
                  <p className="px-4 pb-3 text-[15px] leading-snug text-[#7a3a10] md:bg-[#fff8f5] md:p-5">{r.without}</p>
                  <p className="px-4 pb-4 text-[15px] font-medium leading-snug md:bg-[#f2fbf7] md:p-5">{r.with}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3 · HOW SMSLOCAL SOLVES IT: four posters, one for each job */}
        <section className="bg-background py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <p className={`${EYEBROW} text-primary`}>How SMSLocal solves it</p>
              <h2 className={`${H2} mt-5`}>The customer-retention stack for modern retail.</h2>
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {POSTERS.map((p) => (
                <div key={p.t} className="flex flex-col overflow-hidden rounded-3xl shadow-[0_30px_60px_-36px_rgba(15,26,46,.45)]" style={{ background: p.bg, color: p.fg }}>
                  <div className="flex-1 p-6">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20"><p.Icon className="h-6 w-6" /></span>
                    <h3 className="mt-6 text-[19px] font-semibold leading-snug tracking-tight">{p.t}</h3>
                    <p className="mt-3 text-[14px] leading-relaxed text-white/80">{p.d}</p>
                  </div>
                  <div className="mx-4 rounded-2xl rounded-bl-md bg-white p-3.5 text-[#0f2a47]">
                    <p className="text-[13px] leading-snug">{p.msg}</p>
                    <p className="mt-2 font-mono text-[9.5px] uppercase tracking-[0.16em] text-[#0f2a47]/45">{p.ch}</p>
                  </div>
                  <Link href={p.href} className="m-4 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-white hover:underline">{p.link} <ArrowRight className="h-3.5 w-3.5" /></Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4 · USE CASES: a week of customer messages on a calendar */}
        <section className="bg-secondary py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-2xl">
                <p className={`${EYEBROW} text-primary`}>Use cases</p>
                <h2 className={`${H2} mt-5`}>Every customer moment worth a message.</h2>
              </div>
              <p className="flex items-center gap-4 text-[13px] text-muted-foreground"><span className="flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-sm bg-[#2f78bd]" />Retail</span><span className="flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-sm bg-[#0e9f6e]" />Restaurant and hospitality</span></p>
            </div>
            <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-7">
              {WEEK.map((d) => (
                <div key={d.day} className="rounded-2xl bg-white p-3 ring-1 ring-border">
                  <p className="px-1 pb-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">{d.day}</p>
                  <div className="space-y-2">
                    {d.items.map((it) => (
                      <div key={it.t} className={`rounded-xl p-2.5 ${it.k === "retail" ? "bg-[#e9f1fb]" : "bg-[#e5f6ee]"}`}>
                        <span className={`flex h-6 w-6 items-center justify-center rounded-md text-white ${it.k === "retail" ? "bg-[#2f78bd]" : "bg-[#0e9f6e]"}`}><it.Icon className="h-3.5 w-3.5" /></span>
                        <p className="mt-2 text-[12.5px] font-medium leading-snug">{it.t}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-5 text-[13px] text-muted-foreground">An example week. Each message is triggered by an event or scheduled, and sent on the channel that fits it.</p>
          </div>
        </section>

        {/* 5 · MANY OUTLETS: a dark band, one master account and a lane per outlet */}
        <section className="bg-[#0f2a47] py-20 text-white lg:py-28">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <p className={`${EYEBROW} text-[#7fdcb8]`}>Many outlets</p>
              <h2 className={`${H2} mt-5`}>One master account, every outlet in its own lane.</h2>
              <p className="mt-5 max-w-md text-[16px] leading-relaxed text-white/70">Create a sub-account for each outlet or brand, each with its own sender ID, templates and wallet. Everything rolls up into a single master invoice, and negative feedback can be routed to the right outlet manager.</p>
            </div>
            <div>
              <div className="mx-auto flex w-fit items-center gap-3 rounded-2xl bg-white px-5 py-3.5 text-[#0f2a47]">
                <Building2 className="h-5 w-5 text-primary" />
                <div><p className="text-[15px] font-semibold leading-tight">Master account</p><p className="text-[12px] text-[#0f2a47]/60">One invoice for the group</p></div>
              </div>
              <div className="mx-auto h-8 w-px bg-white/25" />
              <div className="grid gap-4 sm:grid-cols-3">
                {OUTLETS.map((o) => (
                  <div key={o} className="rounded-2xl bg-white/[0.07] p-4 ring-1 ring-white/15">
                    <p className="flex items-center gap-2 text-[15px] font-semibold"><Store className="h-4 w-4 text-[#7fdcb8]" />{o}</p>
                    <ul className="mt-3 space-y-1.5 text-[13px] text-white/65">
                      {["Own sender ID", "Own templates", "Own wallet"].map((t) => <li key={t} className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-[#7fdcb8]" strokeWidth={3.4} />{t}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 6 · COMPLIANCE: two lanes, each with its own rules and its own messages */}
        <section className="bg-background py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <p className={`${EYEBROW} text-primary`}>Compliance</p>
              <h2 className={`${H2} mt-5`}>Transactional and promotional, routed correctly by default.</h2>
              <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-muted-foreground">SMSLocal classifies each template correctly at registration and enforces the right delivery window, with no extra configuration from your team.</p>
            </div>
            <div className="mt-12 space-y-5">
              {[
                { name: "Transactional lane", rule: "Sent whenever the event happens. Pre-approved DLT template, not blocked by DND.", c: "#0e9f6e", bg: "#e8f7f0", items: ["Reservation reminders", "Table-ready pings", "Check-in codes", "Loyalty balance updates"] },
                { name: "Promotional lane", rule: "Opt-in from the customer, a DLT-registered promotional template, delivered in the TRAI 9 AM to 9 PM window.", c: "#d9902f", bg: "#fff5e3", items: ["Flash sales", "Discount codes", "Festive campaigns"] },
              ].map((l) => (
                <div key={l.name} className="grid items-center gap-5 overflow-hidden rounded-3xl p-5 ring-1 ring-border sm:p-6 lg:grid-cols-[320px_1fr]" style={{ background: l.bg }}>
                  <div>
                    <p className="flex items-center gap-2 text-[18px] font-semibold tracking-tight"><i className="h-8 w-1.5 rounded-full" style={{ background: l.c }} />{l.name}</p>
                    <p className="mt-2 text-[14px] leading-relaxed text-[#0f2a47]/70">{l.rule}</p>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {l.items.map((t) => <span key={t} className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-[14px] font-medium shadow-[0_10px_18px_-14px_rgba(15,26,46,.5)]"><Check className="h-4 w-4" style={{ color: l.c }} strokeWidth={3.2} />{t}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <FaqJsonLd items={FAQS} path="/solutions/retail" />
        <FaqSection items={FAQS} />

        <RelatedContent path="/solutions/retail" />

        <ProductFinalCta
          title="Messaging that drives repeat visits."
          subtitle="Loyalty, reservations and flash sales from day one."
          primaryCta={{ label: "Start your trial", href: "/signup/" }}
          secondaryCta={{ label: "Talk to sales", href: "/company/contact/" }}
        />
      </main>
      <SiteFooter />

      <style>{`
        @keyframes rt-rise { from { opacity: 0; transform: translateY(26px) } to { opacity: 1; transform: none } }
        .rt-rise { animation: rt-rise .9s cubic-bezier(.2,.7,.2,1) both }
        @media (prefers-reduced-motion: reduce) { .rt-rise { animation: none } }
      `}</style>
    </>
  )
}
