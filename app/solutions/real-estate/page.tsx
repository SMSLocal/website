import type { Metadata } from "next"
import Link from "next/link"
import { getPageMetadata } from "@/lib/seo"
import {
  ArrowRight,
  Bot,
  Building2,
  CalendarCheck,
  Check,
  FileText,
  Handshake,
  Home,
  KeyRound,
  Languages,
  MapPin,
  MessageSquareHeart,
  Repeat,
  ShieldCheck,
  Target,
  X,
} from "lucide-react"

import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { FaqSection } from "@/components/landing/faq-section"
import { RelatedContent } from "@/components/shared/related-content"
import { ProductFinalCta } from "@/components/product/product-page"
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/json-ld"
import { RealEstateHero } from "@/components/solution/real-estate-hero"

// ─── SEO — edit lib/seo/registry.ts or open /dev/seo to preview ──────────────
export const metadata: Metadata = getPageMetadata("/solutions/real-estate")

/* ─── DATA ────────────────────────────────────────────────────────────────── */

/* how a lead cools (illustrative) */
const COOLING = [
  { when: "9 PM", t: "The enquiry arrives", d: "The buyer is ready to talk, right now.", c: "#e0501c" },
  { when: "Next morning", t: "Nobody replied overnight", d: "The first message waited for office hours.", c: "#e08a1c" },
  { when: "Day 3", t: "A generic blast lands", d: "“We have homes”, for a buyer who wanted a 3BHK in Whitefield.", c: "#5a9bd0" },
  { when: "Day 7", t: "The buyer has moved on", d: "They already visited another site.", c: "#3b6fb0" },
]

const KANBAN = [
  { stage: "Discover", items: [{ Icon: Home, t: "New-listing alerts matching buyer preferences" }, { Icon: Bot, t: "Buyer qualification via the AI WhatsApp agent" }] },
  { stage: "Visit", items: [{ Icon: CalendarCheck, t: "Open-house and site-visit invitations" }] },
  { stage: "Book", items: [{ Icon: FileText, t: "Document submission for bookings" }, { Icon: Handshake, t: "Loan application coordination" }] },
  { stage: "Possession", items: [{ Icon: KeyRound, t: "Possession and registration updates" }] },
  { stage: "Advocate", items: [{ Icon: Repeat, t: "Post-handover follow-up and referral asks" }] },
]

const BUYERS = [
  { n: "Ankit", want: "3BHK · ₹1.5 to 2 Cr · Whitefield", fit: true },
  { n: "Divya", want: "2BHK · ₹95 L · HSR Layout", fit: false },
  { n: "Rahul", want: "3BHK · ₹1.6 to 2 Cr · Whitefield", fit: true },
  { n: "Meera", want: "3BHK · ₹80 L to 1 Cr · Whitefield", fit: false },
  { n: "Sanjay", want: "3BHK · ₹1.7 to 2.2 Cr · Whitefield", fit: true },
  { n: "Priya", want: "Villa · ₹3 Cr · Sarjapur", fit: false },
]

const FAQS = [
  { q: "Can the AI agent qualify leads outside business hours?", a: "Yes. It runs 24/7. Hot leads are flagged for the sales team first thing the next morning, with the full conversation and captured answers attached." },
  { q: "Can I personalise listings by buyer preference?", a: "Yes. Segment by city, budget band, configuration and property type, and send personalised broadcasts only to the buyers a listing actually suits." },
  { q: "How do you avoid looking spammy to high-value buyers?", a: "By matching listings to stated preferences, capping campaign frequency, and letting buyers opt into WhatsApp where messaging feels personal rather than blasted." },
  { q: "Can I send EMI, loan-status or registration reminders?", a: "Yes. Payment-milestone, home-loan-status and registration or possession reminders all run as DLT-approved transactional templates, so they reach buyers reliably alongside your marketing broadcasts." },
  { q: "Which languages can I message buyers in?", a: "SMS supports every major Indian script through Unicode. The AI WhatsApp agent replies in 8 Indian languages, so a buyer can ask in Hindi, Tamil or Telugu and get an answer in the same language." },
]

/* ─── STYLE TOKENS ────────────────────────────────────────────────────────── */

const EYEBROW = "inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em]"
const H2 = "text-balance text-[28px] font-semibold leading-[1.08] tracking-[-0.035em] sm:text-[38px]"
const BTN = "group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-primary to-[oklch(0.55_0.13_172)] px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:shadow-xl hover:shadow-primary/30"
const BTN_OUT = "inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3.5 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"

const TRUST = [
  { icon: ShieldCheck, label: "DLT-compliant templates" },
  { icon: Target, label: "Preference-based segmentation" },
  { icon: Bot, label: "AI qualification, 24/7" },
  { icon: Languages, label: "8 languages for client chats" },
]

/* small sample visuals for the four jobs */
function ListingVisual() {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2 text-[12.5px] font-medium">
        {["Whitefield", "₹1.5 to 2 Cr", "3BHK"].map((c) => <span key={c} className="rounded-md bg-[#e4f0fd] px-2.5 py-1 text-[#0a6fd6]">{c}</span>)}
      </div>
      <p className="max-w-[88%] rounded-2xl rounded-tl-md bg-white p-3.5 text-[13.5px] leading-snug ring-1 ring-black/5">3BHK, 1,420 sqft, ₹1.8 Cr, ready to move. Details: smsl.in/wf3</p>
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">SMS or WhatsApp, to matching buyers only</p>
    </div>
  )
}
function VisitVisual() {
  return (
    <div className="rounded-2xl bg-white p-4 ring-1 ring-black/5">
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 flex-col items-center justify-center rounded-xl bg-[#0e9f6e] text-white"><span className="font-mono text-[9px] uppercase leading-none">Sun</span><span className="text-[19px] font-semibold leading-none">14</span></span>
        <div><p className="text-[14px] font-semibold leading-tight">Open house, Palm Grove</p><p className="mt-0.5 text-[12px] text-muted-foreground">11 AM to 4 PM</p></div>
      </div>
      <div className="mt-3 flex gap-2 text-[12.5px] font-semibold"><span className="rounded-lg bg-[#0e9f6e] px-3.5 py-1.5 text-white">I will come</span><span className="rounded-lg bg-secondary px-3.5 py-1.5">Not this time</span></div>
    </div>
  )
}
function QualVisual() {
  return (
    <div className="space-y-2">
      <p className="max-w-[78%] rounded-2xl rounded-bl-md bg-white px-3.5 py-2 text-[13px] ring-1 ring-black/5">Which area and budget are you looking at?</p>
      <p className="ml-auto max-w-[78%] rounded-2xl rounded-br-md bg-[#0e9f6e] px-3.5 py-2 text-[13px] text-white">Whitefield, 1.5 to 2 Cr, 3BHK</p>
      <p className="max-w-[78%] rounded-2xl rounded-bl-md bg-white px-3.5 py-2 text-[13px] ring-1 ring-black/5">Thanks. When are you planning to move?</p>
    </div>
  )
}
function NurtureVisual() {
  return (
    <div className="space-y-2.5">
      {[["Day 30", "Prices in HSR were stable this quarter. Want to revisit your saved 2BHKs?"], ["Day 60", "A new tower just opened bookings near your shortlist."], ["Day 90", "Still looking? I can set up a visit this weekend."]].map(([d, t]) => (
        <div key={d} className="flex items-start gap-3 rounded-xl bg-white p-3 ring-1 ring-black/5"><span className="mt-0.5 rounded-md bg-[#e4f0fd] px-2 py-0.5 font-mono text-[10px] font-semibold text-[#0a6fd6]">{d}</span><p className="text-[12.5px] leading-snug">{t}</p></div>
      ))}
    </div>
  )
}

const JOBS = [
  { Icon: MapPin, c: "#2f78bd", V: ListingVisual, t: "Listing alerts by preference", d: "Segment buyers by city, budget band and configuration. Send only the listings that actually fit, over SMS, WhatsApp or both.", href: "/products/bulk-sms/", link: "Bulk SMS details" },
  { Icon: CalendarCheck, c: "#0e9f6e", V: VisitVisual, t: "Open-house and site-visit invites", d: "Templated SMS and WhatsApp messages with a tap-through calendar invite. RSVP tracking into your CRM via webhooks.", href: "/products/bulk-sms/", link: "Bulk SMS details" },
  { Icon: Bot, c: "#0f2a47", V: QualVisual, t: "AI WhatsApp qualification", d: "The AI agent asks qualification questions on budget, location and timeline, then hands hot leads to your sales team with full context.", href: "/products/whatsapp-business-api/", link: "AI agent details" },
  { Icon: MessageSquareHeart, c: "#e0731c", V: NurtureVisual, t: "Nurture flows over 30, 60 and 90 days", d: "Scheduled WhatsApp and SMS sequences for leads who are not ready today. Stay useful, not pushy, until they are.", href: "/products/whatsapp-business-api/", link: "WhatsApp details" },
]

/* ─── PAGE ────────────────────────────────────────────────────────────────── */

export default function RealEstateSolutionPage() {
  return (
    <>
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Solutions", path: "/solutions" },
          { name: "Real Estate", path: "/solutions/real-estate" },
        ]}
      />
      <SiteHeader />
      <main className="overflow-x-clip bg-background font-normal text-foreground">

        {/* 1 · HERO: a 3BHK cut-away model and the four steps from enquiry to hot lead */}
        <section className="relative isolate overflow-hidden bg-background">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 opacity-50 [background-image:radial-gradient(var(--border)_1.2px,transparent_1.2px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_at_72%_48%,black_10%,transparent_70%)]" />
          </div>
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-14 pt-14 sm:px-6 lg:grid-cols-[1fr_560px] lg:items-stretch lg:gap-8 lg:pb-20 lg:pt-12">
            <div className="re-rise min-w-0">
              <p className="inline-flex items-center gap-2 rounded-full bg-foreground px-3.5 py-1.5 text-[12.5px] font-medium text-background">
                <Building2 className="h-3.5 w-3.5 text-accent" />Solutions &middot; Real Estate
              </p>
              <h1 className="mt-6 text-balance text-[30px] font-semibold leading-[1.1] tracking-[-0.035em] sm:text-[42px]">
                Turn every enquiry into <span className="text-primary">a site visit.</span>
              </h1>
              <p className="mt-5 max-w-lg text-pretty text-[17px] leading-relaxed text-muted-foreground">
                New listing alerts, open-house invites, buyer follow-ups and lead nurture flows. Personalised, DLT-compliant and in the buyer&apos;s preferred language.
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
            <div className="re-rise min-w-0" style={{ animationDelay: "0.15s" }}>
              <RealEstateHero />
            </div>
          </div>
        </section>

        {/* 2 · THE PROBLEM: a lead cooling down, from hot to cold */}
        <section className="bg-secondary py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid items-end gap-6 lg:grid-cols-2 lg:gap-16">
              <div>
                <p className={`${EYEBROW} text-primary`}>The problem</p>
                <h2 className={`${H2} mt-5`}>Real estate leads go cold in days.</h2>
              </div>
              <p className="text-[16px] leading-relaxed text-muted-foreground">Spray-and-pray SMS annoys more than it converts. Buyers want property-specific information, not generic spam, and English-only messages lose many of the buyers you most want to reach.</p>
            </div>
            <div className="mt-14">
              <div className="h-3 rounded-full" style={{ background: "linear-gradient(90deg, #e0501c, #e08a1c 34%, #5a9bd0 68%, #3b6fb0)" }} />
              <ol className="mt-8 grid gap-8 md:grid-cols-4 md:gap-5">
                {COOLING.map((c) => (
                  <li key={c.when} className="relative">
                    <i className="absolute -top-[39px] left-0 hidden h-5 w-5 rounded-full ring-4 ring-secondary md:block" style={{ background: c.c }} />
                    <p className="font-mono text-[12px] font-semibold tracking-[0.14em]" style={{ color: c.c }}>{c.when}</p>
                    <h3 className="mt-1.5 text-[18px] font-semibold leading-snug tracking-tight">{c.t}</h3>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground">{c.d}</p>
                  </li>
                ))}
              </ol>
            </div>
            <p className="mt-12 flex max-w-2xl items-start gap-3 rounded-2xl bg-white p-5 text-[15.5px] leading-relaxed ring-1 ring-border"><Bot className="mt-1 h-5 w-5 shrink-0 text-primary" />The winning motion is personal, multilingual and patient: listings that match stated preferences, an AI qualifier that answers at 9 PM, and a nurture sequence that shows up at 30, 60 and 90 days.</p>
          </div>
        </section>

        {/* 3 · HOW SMSLOCAL SOLVES IT: four jobs, in alternating rows */}
        <section className="bg-background py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <p className={`${EYEBROW} text-primary`}>How SMSLocal solves it</p>
              <h2 className={`${H2} mt-5`}>Segment, qualify and nurture, on one platform.</h2>
            </div>
            <div className="mt-14 space-y-14 lg:space-y-20">
              {JOBS.map((j, i) => (
                <div key={j.t} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
                  <div className={i % 2 ? "lg:order-2" : ""}>
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl text-white" style={{ background: j.c }}><j.Icon className="h-5 w-5" /></span>
                    <h3 className="mt-5 text-[24px] font-semibold leading-tight tracking-tight">{j.t}</h3>
                    <p className="mt-3 max-w-md text-[16px] leading-relaxed text-muted-foreground">{j.d}</p>
                    <Link href={j.href} className="mt-5 inline-flex items-center gap-1.5 text-[14.5px] font-semibold text-primary hover:underline">{j.link} <ArrowRight className="h-3.5 w-3.5" /></Link>
                  </div>
                  <div className={`rounded-3xl bg-secondary p-6 sm:p-8 ${i % 2 ? "lg:order-1" : ""}`}><j.V /></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4 · USE CASES: the buyer journey as a board of five stages */}
        <section className="bg-secondary py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <p className={`${EYEBROW} text-primary`}>Use cases</p>
              <h2 className={`${H2} mt-5`}>Every step of the buyer journey, messaged well.</h2>
            </div>
            <div className="mt-12 grid gap-4 md:grid-cols-5">
              {KANBAN.map((col, i) => (
                <div key={col.stage} className="rounded-2xl bg-white/60 p-3 ring-1 ring-border">
                  <p className="flex items-center justify-between px-1 pb-3 pt-1 font-mono text-[11px] font-semibold uppercase tracking-[0.16em]"><span>{col.stage}</span><span className="text-primary">0{i + 1}</span></p>
                  <div className="space-y-2.5">
                    {col.items.map((it) => (
                      <div key={it.t} className="rounded-xl bg-white p-3.5 ring-1 ring-border shadow-[0_14px_24px_-20px_rgba(15,26,46,.4)]">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary"><it.Icon className="h-4 w-4" /></span>
                        <p className="mt-2.5 text-[13.5px] font-medium leading-snug">{it.t}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5 · PERSONALISATION: who actually receives one listing */}
        <section className="bg-background py-20 lg:py-28">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div>
              <p className={`${EYEBROW} text-primary`}>Personalisation</p>
              <h2 className={`${H2} mt-5`}>One listing, sent only to the buyers it suits.</h2>
              <p className="mt-5 max-w-md text-[16px] leading-relaxed text-muted-foreground">Match on the preferences buyers have told you: city, budget band, configuration and property type. Everyone else is left alone, which is how you avoid looking spammy to the buyers who matter most.</p>
              <div className="mt-6 rounded-2xl bg-secondary p-4">
                <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground">The listing</p>
                <p className="mt-1.5 text-[16px] font-semibold">3BHK, Whitefield</p>
                <p className="text-[14px] text-muted-foreground">1,420 sqft &middot; &#8377;1.8 Cr &middot; ready to move</p>
              </div>
            </div>
            <div className="overflow-hidden rounded-3xl bg-white ring-1 ring-border shadow-[0_30px_60px_-40px_rgba(15,26,46,.3)]">
              <p className="grid grid-cols-[1fr_auto] bg-secondary px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground"><span>Buyer and stated preference</span><span>Result</span></p>
              {BUYERS.map((b, i) => (
                <div key={b.n} className={`grid grid-cols-[1fr_auto] items-center gap-4 px-5 py-3.5 ${i ? "border-t border-border" : ""} ${b.fit ? "" : "opacity-55"}`}>
                  <div><p className="text-[15px] font-semibold leading-tight">{b.n}</p><p className="mt-0.5 text-[13px] text-muted-foreground">{b.want}</p></div>
                  {b.fit ? (
                    <span className="inline-flex items-center gap-1.5 rounded-md bg-[#e3f6ee] px-2.5 py-1 text-[12.5px] font-semibold text-[#0b7a55]"><Check className="h-3.5 w-3.5" strokeWidth={3.4} />Gets the alert</span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-md bg-secondary px-2.5 py-1 text-[12.5px] font-semibold text-muted-foreground"><X className="h-3.5 w-3.5" strokeWidth={3} />Not a fit</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6 · COMPLIANCE: two kinds of message, two sets of rules */}
        <section className="bg-secondary py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <p className={`${EYEBROW} justify-center text-primary`}>Compliance</p>
              <h2 className={`${H2} mt-5`}>Promotional and transactional messages follow different rules.</h2>
              <p className="mx-auto mt-4 max-w-xl text-[16px] leading-relaxed text-muted-foreground">SMSLocal routes both correctly with no extra configuration.</p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl bg-white p-7 ring-1 ring-border sm:p-8">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#fff1da] text-[#b4741a]"><Home className="h-5 w-5" /></span>
                <h3 className="mt-5 text-[22px] font-semibold tracking-tight">Promotional</h3>
                <p className="mt-1 text-[14px] text-muted-foreground">Listing alerts and open-house invites</p>
                <ul className="mt-5 space-y-3 text-[15px]">
                  {["Opt-in from the buyer", "A DLT-registered promotional template", "Delivery within the TRAI 9 AM to 9 PM window"].map((t) => <li key={t} className="flex items-start gap-2.5"><Check className="mt-1 h-4 w-4 shrink-0 text-[#b4741a]" strokeWidth={3.2} />{t}</li>)}
                </ul>
              </div>
              <div className="rounded-3xl bg-[#0f2a47] p-7 text-white sm:p-8">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-[#7fdcb8]"><FileText className="h-5 w-5" /></span>
                <h3 className="mt-5 text-[22px] font-semibold tracking-tight">Transactional</h3>
                <p className="mt-1 text-[14px] text-white/60">Booking confirmations, registration updates, loan coordination</p>
                <ul className="mt-5 space-y-3 text-[15px] text-white/90">
                  {["A DLT-registered transactional template", "DND-exempt, so it reaches the buyer", "Sent whenever the event happens"].map((t) => <li key={t} className="flex items-start gap-2.5"><Check className="mt-1 h-4 w-4 shrink-0 text-[#7fdcb8]" strokeWidth={3.2} />{t}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <FaqJsonLd items={FAQS} path="/solutions/real-estate" />
        <FaqSection items={FAQS} />

        <RelatedContent path="/solutions/real-estate" />

        <ProductFinalCta
          title="Never let a lead go cold."
          subtitle="Start your trial. Qualify buyers on WhatsApp 24/7, without a monthly plan."
          primaryCta={{ label: "Start your trial", href: "/signup/" }}
          secondaryCta={{ label: "Talk to sales", href: "/company/contact/" }}
        />
      </main>
      <SiteFooter />

      <style>{`
        @keyframes re-rise { from { opacity: 0; transform: translateY(26px) } to { opacity: 1; transform: none } }
        .re-rise { animation: re-rise .9s cubic-bezier(.2,.7,.2,1) both }
        @media (prefers-reduced-motion: reduce) { .re-rise { animation: none } }
      `}</style>
    </>
  )
}
