import type { Metadata } from "next"
import Link from "next/link"
import { getPageMetadata } from "@/lib/seo"
import { ArrowRight, CalendarDays, Check, CheckCheck, Layers, Megaphone, MessageCircle, ShoppingBag, Sparkles } from "lucide-react"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { FaqSection } from "@/components/landing/faq-section"
import { BreadcrumbJsonLd, FaqJsonLd, ProductServiceJsonLd } from "@/components/seo/json-ld"
import { ProductFinalCta } from "@/components/product/product-page"
import { WaBroadcastScene } from "@/components/product/wa-broadcast-scene"

export const metadata: Metadata = getPageMetadata("/channels/whatsapp-broadcasting")

/* ─── DATA ────────────────────────────────────────────────────────────────── */

const TRUST = ["Meta-approved message templates", "Opt-in and opt-out handling", "Sent, delivered, read and replied reports", "Schedule now or for later"]

/* the four parts of a template message */
const PARTS = [
  { n: 1, t: "Header", d: "A photo, video or document that opens the message, so it stands out in the chat list." },
  { n: 2, t: "Body with variables", d: "Your text, with fields such as {{name}} or {{order_id}} filled in separately for every contact." },
  { n: 3, t: "Footer", d: "A short line under the text, for a brand name or a reminder to reply STOP." },
  { n: 4, t: "Buttons", d: "Quick replies, a link or a call button, so customers act in one tap and the reply reaches your AI." },
]

/* the lifecycle of a broadcast */
const STAGES = [
  { t: "Draft", d: "Pick the template and the audience" },
  { t: "Scheduled", d: "Set it for when your customers read" },
  { t: "Ongoing", d: "Sending, with live counts per segment" },
  { t: "Completed", d: "Full report, and the replies carry on" },
]

/* what each tick means */
const TICKS = [
  { k: "sent", t: "Sent", d: "The message left your account and reached WhatsApp." },
  { k: "delivered", t: "Delivered", d: "It reached the customer's phone." },
  { k: "read", t: "Read", d: "The customer opened it. These are the blue ticks you know from WhatsApp." },
  { k: "replied", t: "Replied", d: "They tapped a button or wrote back, and the thread opens in your inbox." },
]

/* the four message types */
const TYPES = [
  { I: Megaphone, t: "Template campaigns", d: "One approved template for a whole segment, with merge fields that fill in a different value for every contact." },
  { I: Sparkles, t: "Rich messages", d: "Photos, video and list replies next to your buttons, so a customer can choose without typing." },
  { I: Layers, t: "WhatsApp Flows", d: "Short forms inside the chat for bookings, sign-ups and lead capture. No landing page needed." },
  { I: ShoppingBag, t: "Click-to-WhatsApp and catalogs", d: "An ad that opens a chat, and catalog messages that show products right where the customer is talking." },
]

/* where to go after the send */
const NEXT = [
  { t: "Answer the replies", d: "Replies open in the same platform that sent the broadcast, tied to the campaign that started them.", links: [{ h: "/products/agentic-ai/", t: "Agentic AI" }, { h: "/products/omnichannel-inbox/", t: "Shared inbox" }] },
  { t: "Reach everyone else", d: "Not every customer is on WhatsApp. Follow the same campaign on a channel they do use.", links: [{ h: "/channels/sms-broadcasting/", t: "SMS broadcasting" }, { h: "/channels/rcs-broadcasting/", t: "RCS broadcasting" }] },
  { t: "Keep supporting them", d: "After the campaign, the same verified number can handle everyday questions.", links: [{ h: "/products/whatsapp-business-api/", t: "WhatsApp Business API" }] },
]

/* what keeps a sender healthy */
const HEALTH = [
  { t: "Quality rating", d: "WhatsApp rates how customers react to your messages. SMSLocal shows the rating for each of your numbers." },
  { t: "Messaging limit", d: "The rating decides how many people you can message. You can see the limit before you plan the next send." },
  { t: "Template status", d: "Every template is tracked from pending to approved or rejected, so you know what is ready to send." },
]

const FAQS = [
  { q: "Is this the official WhatsApp Business API?", a: "Yes, with a verified sender. SMSLocal is an official WhatsApp Business Solution Provider, and every WhatsApp broadcast goes through Meta's infrastructure under your verified brand." },
  { q: "What is WhatsApp broadcasting?", a: "WhatsApp broadcasting is sending one approved message template to a whole audience of opted-in contacts, with each message personalised and tracked. It is the WhatsApp Business API way of doing WhatsApp bulk messaging, not a forwarded list from a personal phone." },
  { q: "Do I need an approved template to broadcast on WhatsApp?", a: "Yes. Campaigns outside a customer's 24-hour reply window use WhatsApp message templates that Meta has approved. SMSLocal helps you write, submit and track your WhatsApp template campaigns so you know when each one is ready to send." },
  { q: "Who can I send a WhatsApp broadcast to?", a: "Only customers who have opted in to hear from you on WhatsApp. SMSLocal stores each contact's opt-in, and anyone who opts out is left out of every later campaign." },
  { q: "Can AI answer broadcast replies?", a: "Yes, automatically. When a customer replies to your broadcast, the agentic AI answers from your knowledge base right away, and hands off to a person in the same thread when needed. " },
  { q: "What are WhatsApp Flows?", a: "WhatsApp Flows are in-chat forms and guided journeys, such as a booking, a sign-up or a lead form, that customers fill in without leaving WhatsApp. You can start a Flow from a button in a broadcast." },
  { q: "How do quality rating and messaging limits work?", a: "WhatsApp rates how customers respond to your messages and sets how many people you can message. Both appear in SMSLocal, so you can grow a WhatsApp marketing platform campaign without risking your number." },
  { q: "Can I schedule and automate WhatsApp campaigns?", a: "Yes. You can schedule a broadcast for later, and WhatsApp campaign automation lets replies and button taps trigger the next message or hand the chat to your team." },
]

/* ─── STYLE TOKENS ────────────────────────────────────────────────────────── */

const EYEBROW = "inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em]"
const H2 = "text-balance text-[28px] font-semibold leading-[1.08] tracking-[-0.035em] sm:text-[38px]"
const BTN = "group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-primary to-[oklch(0.55_0.13_172)] px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:shadow-xl hover:shadow-primary/30"
const BTN_OUT = "inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3.5 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"
const BLUE = "#53bdeb"
const MOCK_SH = { boxShadow: "0 0 0 1px rgba(15,42,71,.08), 0 22px 34px -24px rgba(15,42,71,.45)" }

function TickIcon({ k }: { k: string }) {
  if (k === "sent") return <Check className="h-14 w-14 text-[#9aa8b4]" strokeWidth={2.4} />
  if (k === "delivered") return <CheckCheck className="h-14 w-14 text-[#9aa8b4]" strokeWidth={2.4} />
  if (k === "read") return <CheckCheck className="h-14 w-14" style={{ color: BLUE }} strokeWidth={2.4} />
  return <MessageCircle className="h-12 w-12 text-[#25d366]" strokeWidth={2.2} />
}

/* ─── PAGE ────────────────────────────────────────────────────────────────── */

export default function WhatsAppBroadcastingPage() {
  return (
    <>
      <ProductServiceJsonLd
        name="SMSLocal WhatsApp Broadcasting"
        description="Send segmented WhatsApp template campaigns with media, buttons and Flows to opted-in audiences, track delivery and read analytics per broadcast, then answer replies with agentic AI."
        path="/channels/whatsapp-broadcasting"
        category="WhatsApp Broadcasting"
      />
      <BreadcrumbJsonLd crumbs={[{ name: "Home", path: "/" }, { name: "Channels", path: "/channels" }, { name: "WhatsApp Broadcasting", path: "/channels/whatsapp-broadcasting" }]} />
      <FaqJsonLd items={FAQS} path="/channels/whatsapp-broadcasting" />
      <SiteHeader />
      <main className="overflow-x-clip bg-background font-normal text-foreground">

        {/* 1 · HERO: one broadcast, the ticks going blue across a chat list */}
        <section className="relative isolate overflow-hidden bg-background">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-14 pt-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_560px] lg:gap-10 lg:pb-20 lg:pt-12">
            <div className="wa-rise min-w-0">
              <p className="inline-flex items-center gap-2 rounded-full bg-foreground px-3.5 py-1.5 text-[12.5px] font-medium text-background">
                <MessageCircle className="h-3.5 w-3.5 text-accent" />Channels · WhatsApp broadcasting
              </p>
              <h1 className="mt-6 text-balance text-[30px] font-semibold leading-[1.1] tracking-[-0.035em] sm:text-[42px]">
                WhatsApp broadcasting on the Business API, <span className="text-primary">with AI replies</span>
              </h1>
              <p className="mt-5 max-w-lg text-pretty text-[17px] leading-relaxed text-muted-foreground">
                Run WhatsApp bulk messaging and template campaigns for opted-in customers, with photos, buttons and Flows. Follow every message from sent to read, then keep the conversation going.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link href="/signup/" className={BTN}>Start broadcasting <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" /></Link>
                <Link href="/company/contact/" className={BTN_OUT}>Get a demo</Link>
              </div>
              <ul className="mt-8 grid max-w-lg grid-cols-1 gap-x-8 gap-y-3 text-[14px] text-muted-foreground sm:grid-cols-2">
                {TRUST.map((t) => (
                  <li key={t} className="flex items-start gap-2.5 leading-snug"><Check className="mt-[2px] h-4 w-4 shrink-0 text-primary" strokeWidth={3} /><span>{t}</span></li>
                ))}
              </ul>
            </div>
            <div className="wa-rise min-w-0" style={{ animationDelay: "0.15s" }}>
              <WaBroadcastScene />
            </div>
          </div>
        </section>

                {/* 2 · THE TEMPLATE: a message beside a numbered list of its parts */}
        <section className="bg-secondary py-20 lg:py-28">
          <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
            <div className="mx-auto w-full max-w-[320px] rounded-2xl rounded-tl-md bg-[#d9fdd3] p-2" style={MOCK_SH}>
              <div className="rounded-xl bg-white">
                <div className="flex h-[110px] items-center justify-center rounded-t-xl bg-gradient-to-br from-[#d7f3e6] to-[#cfe0f7]"><CalendarDays className="h-9 w-9 text-[#0e9f6e]" /></div>
                <div className="px-3.5 pb-3 pt-3">
                  <p className="text-[14px] font-semibold text-[#0f2a47]">Appointment confirmed 📅</p>
                  <p className="mt-1 text-[13px] leading-snug text-[#0f2a47]/75">Hi <span className="rounded bg-[#d9f3e6] px-1 font-semibold text-[#0b6b47]">{"{{name}}"}</span>, see you at <span className="rounded bg-[#d9f3e6] px-1 font-semibold text-[#0b6b47]">{"{{time_slot}}"}</span> with Dr. Rao.</p>
                  <p className="mt-2 text-[11.5px] text-[#0f2a47]/45">Reply STOP to opt out</p>
                </div>
              </div>
              <div className="mt-1 divide-y divide-[#0f2a47]/8 overflow-hidden rounded-xl bg-white text-center text-[13px] font-semibold text-[#0a7cff]"><span className="block py-2">Reschedule</span><span className="block py-2">Get directions</span></div>
            </div>
            <div>
              <p className={`${EYEBROW} text-primary`}>WhatsApp template campaigns</p>
              <h2 className={`${H2} mt-5`}>One approved template, four parts to fill.</h2>
              <p className="mt-4 max-w-lg text-[16px] leading-relaxed text-muted-foreground">Every WhatsApp broadcast starts from a message template that Meta approves once. After that, you only change the parts that are personal.</p>
              <ol className="mt-8 divide-y divide-border border-y border-border">
                {PARTS.map((p) => (
                  <li key={p.n} className="flex gap-4 py-4">
                    <span className="w-6 shrink-0 font-mono text-[13px] font-bold text-primary">0{p.n}</span>
                    <div><p className="text-[17px] font-semibold tracking-tight">{p.t}</p><p className="mt-0.5 text-[15px] leading-relaxed text-muted-foreground">{p.d}</p></div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* 3 · LIFECYCLE: one narrow vertical timeline */}
        <section className="bg-background py-20 lg:py-28">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <p className={`${EYEBROW} text-primary`}>WhatsApp campaign automation</p>
            <h2 className={`${H2} mt-5`}>Every broadcast has a clear status.</h2>
            <p className="mt-4 text-[16px] leading-relaxed text-muted-foreground">From the first draft to the last reply, you can see where each campaign stands, with sent, delivered and read counts per segment once it is out the door.</p>
            <ol className="mt-12 border-l-2 border-border">
              {STAGES.map((s, i) => (
                <li key={s.t} className="relative pb-9 pl-8 last:pb-0">
                  <span className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-2 border-primary bg-background" />
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Step {i + 1}</p>
                  <p className="mt-1 text-[24px] font-semibold tracking-tight">{s.t}</p>
                  <p className="mt-1 text-[15px] leading-relaxed text-muted-foreground">{s.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 4 · WHAT YOU CAN SEND: a two by two grid split by thin rules */}
        <section className="bg-secondary py-20 lg:py-28">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <p className={`${EYEBROW} text-primary`}>WhatsApp Business API broadcast</p>
            <h2 className={`${H2} mt-5 max-w-2xl`}>Every kind of message WhatsApp supports.</h2>
            <div className="mt-12 grid md:grid-cols-2">
              {TYPES.map((t, i) => (
                <div key={t.t} className={`py-8 md:px-10 ${i % 2 === 0 ? "md:border-r md:border-border md:pl-0" : "md:pr-0"} ${i < 2 ? "border-b border-border" : ""}`}>
                  <t.I className="h-7 w-7 text-primary" />
                  <p className="mt-4 text-[24px] font-semibold tracking-tight">{t.t}</p>
                  <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-muted-foreground">{t.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5 · THE TICKS: four columns on navy */}
        <section className="bg-[#0f2a47] py-20 text-white lg:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <p className={`${EYEBROW} text-[#9ee6c8]`}>Read analytics</p>
              <h2 className={`${H2} mt-5`}>Know who saw it, and who answered.</h2>
              <p className="mt-4 text-[16px] leading-relaxed text-white/70">WhatsApp shows the status of every message with its ticks. SMSLocal turns them into per-campaign analytics for your whole audience.</p>
            </div>
            <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {TICKS.map((t) => (
                <div key={t.k} className="border-t border-white/20 pt-6">
                  <TickIcon k={t.k} />
                  <p className="mt-5 text-[24px] font-semibold tracking-tight">{t.t}</p>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-white/65">{t.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6 · SENDER HEALTH: a plain term and description list */}
        <section className="bg-background py-20 lg:py-28">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className={`${EYEBROW} text-primary`}>WhatsApp marketing platform</p>
              <h2 className={`${H2} mt-5`}>Keep your sender healthy as you scale.</h2>
            </div>
            <dl className="divide-y divide-border border-y border-border">
              {HEALTH.map((h) => (
                <div key={h.t} className="grid gap-1 py-6 sm:grid-cols-[170px_1fr] sm:gap-8">
                  <dt className="text-[18px] font-semibold tracking-tight">{h.t}</dt>
                  <dd className="text-[15px] leading-relaxed text-muted-foreground">{h.d}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* 7 · WHAT TO PAIR IT WITH: three short columns, each ending in a link */}
        <section className="bg-secondary py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <p className={`${EYEBROW} text-primary`}>WhatsApp AI replies</p>
              <h2 className={`${H2} mt-5`}>What happens after the send.</h2>
            </div>
            <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-12">
              {NEXT.map((n) => (
                <div key={n.t} className="border-t-2 border-foreground pt-5">
                  <p className="text-[22px] font-semibold tracking-tight">{n.t}</p>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{n.d}</p>
                  <ul className="mt-5 space-y-2">
                    {n.links.map((l) => (
                      <li key={l.h}><Link href={l.h} className="group inline-flex items-center gap-2 text-[15px] font-semibold text-primary">{l.t}<ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></Link></li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <FaqSection items={FAQS} />

        <ProductFinalCta
          title="Broadcast on WhatsApp and let AI handle the replies."
          subtitle="Connect the official API, build your templates, and send campaigns your agentic AI can follow up on, automatically."
          primaryCta={{ label: "Start Broadcasting", href: "/signup/" }}
          secondaryCta={{ label: "Get a Demo", href: "/company/contact/" }}
        />
      </main>
      <SiteFooter />

      <style>{`
        @keyframes wa-riseK { from { opacity: 0; transform: translateY(26px) } to { opacity: 1; transform: none } }
        .wa-rise { animation: wa-riseK .9s cubic-bezier(.2,.7,.2,1) both }
        @media (prefers-reduced-motion: reduce) { .wa-rise { animation: none } }
      `}</style>
    </>
  )
}
