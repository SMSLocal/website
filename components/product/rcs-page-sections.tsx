import Link from "next/link"
import type { ReactNode } from "react"
import { ArrowRight, Check, GraduationCap, HeartPulse, Landmark, Plane, ShoppingBag, Truck } from "lucide-react"
import { RcsFallbackGraphic } from "@/components/product/rcs-fallback-graphic"

// Sections below the hero on /products/rcs. Kept plain, with a different layout for each: a prose article, a limits table,
// three channel columns, a centred icon grid, a numbered vertical list and a tinted band with a graphic. No code samples.
// Server components only.

const H2 = "text-balance text-[28px] font-bold leading-[1.15] tracking-[-0.025em] sm:text-[36px]"
const LEAD = "mt-4 text-pretty text-[16.5px] leading-relaxed text-muted-foreground"
const BODY = "text-[15.5px] leading-relaxed text-muted-foreground"
const LINK = "font-semibold text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary"

function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return <Link href={href} className="inline-flex items-center gap-2 text-[14.5px] font-semibold text-primary hover:underline">{children} <ArrowRight className="h-4 w-4" /></Link>
}

/* ───────── 1 · what it is: heading beside a short article ───────── */
const PARTS = [
  { t: "A verified sender", d: "Your business name, logo and a verification mark appear at the top of the chat, in place of a sender ID such as VM-URBCRT." },
  { t: "Rich content", d: "Photos, video, rich cards and carousels arrive inside the message, so customers see the product before opening any link." },
  { t: "Actions in the chat", d: "Customers can tap a suggested reply to answer you, or an action button to open a page, call you or save a date." },
  { t: "Two-way conversation", d: "Customers reply in the same thread. Delivery, read and tap events show where the phone and carrier report them." },
]

export function RcsWhatIs() {
  return (
    <section className="bg-background py-20 lg:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className={H2}>What is RCS business messaging?</h2>
        <p className="mt-6 text-pretty text-[19px] leading-relaxed">
          RCS (Rich Communication Services) business messaging lets a company send branded, interactive messages to a customer&apos;s phone number. They appear in the phone&apos;s messaging app, with no separate app to download. It is often described as the next step after SMS, because it adds a verified identity, pictures and buttons.
        </p>
        <div className="mt-8 space-y-5">
          {PARTS.map((p) => (
            <p key={p.t} className="text-[16.5px] leading-[1.75] text-muted-foreground">
              <strong className="font-semibold text-foreground">{p.t}.</strong> {p.d}
            </p>
          ))}
          <p className="text-[16.5px] leading-[1.75] text-muted-foreground">
            RCS needs a phone, messaging app and carrier that support it, plus mobile data or Wi-Fi, so plan an SMS fallback for everyone else. For background, read <Link href="/blog/rcs-messaging-india/" className={LINK}>what RCS means for Indian businesses</Link>.
          </p>
        </div>
      </div>
    </section>
  )
}

/* ───────── 2 · formats and limits: one clear table ───────── */
const FORMATS = [
  { f: "Rich card", use: "One picture or video with a title, description and buttons. For a product, order update or booking.", lim: ["Title: up to 200 characters", "Description: up to 2,000 characters", "Up to 4 replies or actions"] },
  { f: "Rich card carousel", use: "Several vertical cards the customer swipes through. For a product range, plan options or time slots.", lim: ["Up to 10 cards", "Up to 4 replies or actions on each card"] },
  { f: "Suggested replies", use: "Ready-made answers under a message. One tap sends the reply, with no typing.", lim: ["Up to 11 suggestions in a chip list", "Up to 25 characters in each label"] },
  { f: "Suggested actions", use: "Buttons that open a link, dial a number, view or share a location, or create a calendar event.", lim: ["Up to 25 characters in each label"] },
]

export function RcsFormats() {
  return (
    <section className="bg-slate-50 py-20 lg:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 className={H2}>RCS rich cards, carousels and their size limits</h2>
          <p className={LEAD}>Check these before you design a campaign, so your message stays readable and within what RCS accepts.</p>
        </div>
        <table className="mt-10 w-full border-collapse text-left">
          <thead className="hidden md:table-header-group">
            <tr className="border-b-2 border-foreground text-[14px]">
              <th scope="col" className="w-[22%] py-3 pr-6 font-semibold">Format</th>
              <th scope="col" className="w-[44%] py-3 pr-6 font-semibold">What it is for</th>
              <th scope="col" className="py-3 font-semibold">Limits</th>
            </tr>
          </thead>
          <tbody>
            {FORMATS.map((r) => (
              <tr key={r.f} className="block border-b border-border py-6 align-top md:table-row md:py-0">
                <th scope="row" className="block text-[17px] font-semibold md:table-cell md:py-6 md:pr-6">{r.f}</th>
                <td className={`mt-2 block md:mt-0 md:table-cell md:py-6 md:pr-6 ${BODY}`}>{r.use}</td>
                <td className="mt-3 block text-[15px] leading-relaxed md:mt-0 md:table-cell md:py-6">
                  <ul className="space-y-1">{r.lim.map((l) => <li key={l}>{l}</li>)}</ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-6 max-w-3xl text-[13.5px] leading-relaxed text-muted-foreground">
          Source: Google&apos;s <a href="https://developers.google.com/business-communications/rcs-business-messaging/guides/learn/rich-cards" target="_blank" rel="noopener noreferrer" className={LINK}>RCS for Business rich card guide</a>. Emoji and non-Latin scripts can count as more than one character, so preview Hindi and other Indian-language cards before sending.
        </p>
      </div>
    </section>
  )
}

/* ───────── 3 · RCS vs SMS vs WhatsApp: three plain columns ───────── */
const CHANNELS = [
  { name: "SMS", when: "Choose it when the message must reach any mobile phone.", facts: ["Works without mobile data", "Text only, 160 characters per segment in English", "Needs DLT registration and an approved template in India"], href: "/channels/sms-broadcasting/", cta: "SMS broadcasting" },
  { name: "RCS", when: "Choose it when you want a branded, visual message in the phone's messaging app.", facts: ["Needs a supported phone and data or Wi-Fi", "Offers rich cards, carousels, replies and actions", "Comes from a verified business sender"], href: "/channels/rcs-broadcasting/", cta: "RCS broadcasting" },
  { name: "WhatsApp", when: "Choose it when your customers already talk to businesses on WhatsApp.", facts: ["Needs WhatsApp and data or Wi-Fi", "Requires customer opt-in", "Uses approved templates for business-initiated messages"], href: "/channels/whatsapp-broadcasting/", cta: "WhatsApp broadcasting" },
]

export function RcsVersus() {
  return (
    <section className="bg-background py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className={H2}>RCS vs SMS vs WhatsApp</h2>
          <p className={LEAD}>None of them wins every time. Pick by who you need to reach and what the customer has to do next.</p>
        </div>
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {CHANNELS.map((c) => (
            <div key={c.name} className={`flex flex-col border-t-2 pt-6 ${c.name === "RCS" ? "border-primary" : "border-border"}`}>
              <h3 className={`text-[22px] font-bold ${c.name === "RCS" ? "text-primary" : ""}`}>{c.name}</h3>
              <p className="mt-3 text-[16px] font-medium leading-snug">{c.when}</p>
              <ul className={`mt-5 space-y-3 ${BODY}`}>{c.facts.map((f) => <li key={f}>{f}</li>)}</ul>
              <div className="mt-6 md:mt-auto md:pt-6"><TextLink href={c.href}>{c.cta}</TextLink></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ───────── 4 · use cases: a centred grid, one icon per industry ───────── */
const SECTORS = [
  { Icon: ShoppingBag, name: "E-commerce and retail", d: "Show new arrivals as a carousel, send shipping updates with a track button, and bring back unfinished carts with a button to complete the order." },
  { Icon: Landmark, name: "Banking and fintech", d: "Confirm payments, send due date reminders with a pay button and share card delivery updates, all from a verified business name." },
  { Icon: Truck, name: "Logistics and delivery", d: "Tell customers a parcel is out for delivery, let them pick a new day after a missed visit, and give directions to a pickup point." },
  { Icon: HeartPulse, name: "Healthcare", d: "Confirm appointments with an add to calendar button, offer a reschedule option the day before and tell patients when a report is ready." },
  { Icon: GraduationCap, name: "Education", d: "Share course details during admissions, remind students about classes and send fee reminders with a clear next step." },
  { Icon: Plane, name: "Travel and hospitality", d: "Keep the booking confirmation, check-in link and directions to the property together in one conversation." },
]

export function RcsIndustries() {
  return (
    <section className="bg-slate-50 py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className={H2}>RCS use cases for businesses in India</h2>
          <p className={LEAD}>Start with a moment your customer already cares about, then add the one button that finishes the job.</p>
        </div>
        <ul className="mt-14 grid gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {SECTORS.map((s) => (
            <li key={s.name} className="text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary"><s.Icon className="h-6 w-6" strokeWidth={1.8} /></span>
              <h3 className="mt-4 text-[17.5px] font-semibold">{s.name}</h3>
              <p className={`mx-auto mt-2 max-w-xs ${BODY}`}>{s.d}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ───────── 5 · getting started: a numbered grid ───────── */
const STEPS = [
  { t: "Share your business details", d: "Tell us who you are, your website and what you plan to send, such as order updates or offers." },
  { t: "Set up your RCS sender", d: "The sender is called an agent. It needs a name, logo, banner, colour, description and contact details." },
  { t: "Get it verified", d: "The business and the agent are reviewed under the carriers' RCS programme. We guide you through it." },
  { t: "Test on real phones", d: "Check cards, images and buttons, including the Indian languages you plan to use." },
  { t: "Add your SMS fallback", d: "Choose the DLT-approved SMS template for phones that cannot show RCS." },
  { t: "Send and improve", d: "Send from the dashboard or API, then use delivery, reads and taps to shape the next message." },
]

export function RcsGetStarted() {
  return (
    <section className="bg-background py-20 lg:py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 className={H2}>How to start RCS business messaging in India</h2>
          <p className={LEAD}>You need a business identity, your brand assets and a first use case. We work through the rest with you.</p>
          <div className="mt-7"><TextLink href="/company/contact/">Talk to our team</TextLink></div>
        </div>
        <ol>
          {STEPS.map((s, i) => (
            <li key={s.t} className="relative flex gap-6 pb-9 last:pb-0">
              {i < STEPS.length - 1 && <i aria-hidden className="absolute bottom-1 left-[21px] top-12 w-px bg-border" />}
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-primary text-[15px] font-bold text-primary">{i + 1}</span>
              <div className="pt-1.5">
                <h3 className="text-[18px] font-semibold">{s.t}</h3>
                <p className={`mt-1.5 max-w-lg ${BODY}`}>{s.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ───────── 6 · RCS API: a tinted band, the checklist beside a still graphic ───────── */
const API_POINTS = [
  "Send the rich card and name your DLT-approved SMS template in the same request",
  "RCS goes to phones that can show it, and SMS goes to the rest",
  "One webhook tells you whether each number received RCS or SMS",
  "Already sending SMS with SMSLocal? Keep the same authentication and webhook format",
]

export function RcsApi() {
  return (
    <section className="bg-[oklch(0.96_0.025_168)] py-20 lg:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20">
        <div>
          <h2 className={H2}>RCS API with SMS fallback in one request</h2>
          <p className={LEAD}>Your developers do not need a second integration for SMS. One call covers both, so you never run a campaign twice.</p>
          <ul className="mt-8 space-y-4">
            {API_POINTS.map((x) => (
              <li key={x} className="flex items-start gap-3.5 text-[15.5px] leading-snug">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"><Check className="h-3 w-3" strokeWidth={3} /></span>{x}
              </li>
            ))}
          </ul>
          <div className="mt-9 flex flex-wrap items-center gap-6">
            <Link href="/signup/" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-[15px] font-semibold text-primary-foreground transition hover:brightness-110">Join RCS early access <ArrowRight className="h-4 w-4" /></Link>
            <TextLink href="/products/integrations/">Integrations and API</TextLink>
          </div>
        </div>
        <RcsFallbackGraphic />
      </div>
    </section>
  )
}
