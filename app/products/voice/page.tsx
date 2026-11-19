import type { Metadata } from "next"
import Link from "next/link"
import { getPageMetadata } from "@/lib/seo"
import {
  ArrowRight,
  FileText,
  Headset,
  Inbox,
  MapPin,
  MessageCircle,
  Send,
  PhoneCall,
  PhoneForwarded,
  PhoneMissed,
  Shuffle,
  Sparkles,
  Users,
  Voicemail,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { AnnouncementStrip } from "@/components/landing/announcement-strip"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { FaqSection } from "@/components/landing/faq-section"
import { ExploreMore } from "@/components/product/explore-more"
import { ProductFinalCta } from "@/components/product/product-page"
import { BreadcrumbJsonLd, FaqJsonLd, ProductServiceJsonLd } from "@/components/seo/json-ld"
import { VoiceHero } from "@/components/product/voice-hero"

export const metadata: Metadata = getPageMetadata("/products/voice")

/* ─── DATA ────────────────────────────────────────────────────────────────── */

const GAPS = [
  { Icon: Shuffle, moment: "Switching tools mid-call", old: "The agent takes a call in one app and hunts for the customer in another.", fix: "The call opens beside the customer's profile, with their history already in view." },
  { Icon: PhoneMissed, moment: "A call nobody follows up", old: "A missed call is a number on a list, and nobody knows who it was.", fix: "Missed calls become conversations you can answer or call back from the inbox." },
  { Icon: FileText, moment: "A call that leaves no record", old: "What was agreed on the phone lives in someone's memory.", fix: "Calls are recorded and transcribed, and attached to the customer timeline." },
]

const STEPS = [
  { n: "01", t: "Get a number", d: "Take a local or toll-free business number, or port the one you already use." },
  { n: "02", t: "Call from any profile", d: "Click to call a customer, or answer an incoming call, inside the inbox." },
  { n: "03", t: "The call is captured", d: "It is recorded and transcribed, with notes your team can add." },
  { n: "04", t: "It joins the timeline", d: "The call sits beside the customer's WhatsApp, SMS and chats." },
]

const TOOLS: { Icon: LucideIcon; t: string; d: string }[] = [
  { Icon: PhoneCall, t: "Click-to-call", d: "Call a customer from their profile, with no dialer or softphone to install." },
  { Icon: MapPin, t: "Business numbers", d: "Local and toll-free numbers, or port your existing business number." },
  { Icon: FileText, t: "Recording and transcripts", d: "Calls are recorded and transcribed, then attached to the conversation." },
  { Icon: Users, t: "Team handoff", d: "Transfer a call, add notes and bring in a colleague without losing context." },
]

const USES: { Icon: LucideIcon; t: string; d: string }[] = [
  { Icon: Headset, t: "Support escalations", d: "Move a hard chat to a call and keep the whole thread." },
  { Icon: PhoneForwarded, t: "Sales follow-ups", d: "Call a lead from their profile and log the call without typing it up." },
  { Icon: Voicemail, t: "Callbacks for missed calls", d: "See who rang, what they asked before and call them back." },
  { Icon: Inbox, t: "Order and delivery calls", d: "Confirm an address or a time with the order in front of you." },
]

const INBOX: { ch: string; c: string; Icon: LucideIcon; who: string; msg: string; t: string }[] = [
  { ch: "Call", c: "#0e9f6e", Icon: PhoneCall, who: "Sam K., +91 98••• ••210", msg: "Incoming call · Order #1042", t: "now" },
  { ch: "WhatsApp", c: "#16a34a", Icon: MessageCircle, who: "Aman, +91 98••• ••210", msg: "Where is my order #1042?", t: "5 min" },
  { ch: "SMS", c: "#2f78bd", Icon: Send, who: "+91 97••• ••455", msg: "Reply STOP to opt out", t: "12 min" },
]

const FAQS = [
  { q: "Can I use my existing business number?", a: "Yes. Port your current business number into SMSLocal, or get a new local or toll-free number in minutes, so your customers keep calling the same line." },
  { q: "Can I record calls?", a: "Yes. Call recording and automatic transcription are available, with recordings attached to the customer's conversation." },
  { q: "Do calls appear inside customer profiles?", a: "Yes. Every inbound and outbound call becomes a conversation on the customer's timeline, beside email, WhatsApp, SMS and live chat." },
  { q: "Do I need another dialer?", a: "No. Click-to-call works from any customer profile, with no softphone or dialer app to install." },
  { q: "Do you support international calling?", a: "Yes. You can place outbound calls internationally at per-minute rates. Ask us for the current rates for the countries you call." },
  { q: "Is voice included in every plan?", a: "Voice is available on paid plans and numbers and outbound minutes are billed separately. Talk to us for the current numbers and rates for your team." },
]

const EXPLORE = [
  { href: "/numbers/did/", label: "DID and virtual numbers", hint: "Local and toll-free numbers" },
  { href: "/products/analytics/", label: "Agentic AI analytics", hint: "CSAT, sentiment and campaign results" },
  { href: "/products/integrations/", label: "Integrations and API", hint: "Shopify, HubSpot, REST API and more" },
  { href: "/channels/web-chat/", label: "Website live chat widget", hint: "AI chat for every visitor" },
]

/* ─── STYLE TOKENS ────────────────────────────────────────────────────────── */

const EYEBROW = "inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em]"
const H2 = "text-balance text-[28px] font-semibold leading-[1.08] tracking-[-0.035em] sm:text-[38px]"
const BTN = "group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-primary to-[oklch(0.55_0.13_172)] px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:shadow-xl hover:shadow-primary/30"
const BTN_OUT = "inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3.5 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"

const TRUST = [
  { icon: PhoneCall, label: "Click-to-call from any profile" },
  { icon: MapPin, label: "Local and toll-free business numbers" },
  { icon: FileText, label: "Recording and transcription" },
  { icon: Inbox, label: "Calls on the customer timeline" },
]

export default function VoicePage() {
  return (
    <>
      <ProductServiceJsonLd
        name="SMSLocal Voice: Phone Support in Your Inbox"
        description="Handle inbound and outbound customer calls inside your support inbox, with click-to-call, business phone numbers, call recording and transcripts, and the customer's full history in view."
        path="/products/voice"
        category="Voice support and business calling software"
      />
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
          { name: "Voice", path: "/products/voice" },
        ]}
      />
      <FaqJsonLd items={FAQS} path="/products/voice" />
      <AnnouncementStrip />
      <SiteHeader />
      <main className="overflow-x-clip bg-background font-normal text-foreground">

        {/* 1 · HERO: a call on the agent's screen with the customer's history beside it */}
        <section className="relative isolate overflow-hidden bg-background">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 opacity-50 [background-image:radial-gradient(var(--border)_1.2px,transparent_1.2px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_at_72%_48%,black_10%,transparent_70%)]" />
          </div>
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-14 pt-14 sm:px-6 lg:grid-cols-[1fr_560px] lg:gap-8 lg:pb-20 lg:pt-12">
            <div className="min-w-0">
              <p className="inline-flex items-center gap-2 rounded-full bg-foreground px-3.5 py-1.5 text-[12.5px] font-medium text-background">
                <Sparkles className="h-3.5 w-3.5 text-accent" />SMSLocal Voice
              </p>
              <h1 className="mt-6 text-balance text-[30px] font-semibold leading-[1.1] tracking-[-0.035em] sm:text-[42px]">
                Voice support inside your inbox, <span className="text-primary">with the whole customer in view.</span>
              </h1>
              <p className="mt-5 max-w-lg text-pretty text-[17px] leading-relaxed text-muted-foreground">
                Take and place customer calls without switching tools. Every call is recorded, transcribed and added to the same timeline as WhatsApp, SMS and chat.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link href="/signup/" className={BTN}>Add Voice <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" /></Link>
                <Link href="/company/contact/" className={BTN_OUT}>Book a demo</Link>
              </div>
              <ul className="mt-8 grid max-w-lg grid-cols-1 gap-x-8 gap-y-3 text-[14px] text-muted-foreground sm:grid-cols-2">
                {TRUST.map((t) => (
                  <li key={t.label} className="flex items-start gap-2.5 leading-snug"><t.icon className="mt-[1px] h-4 w-4 shrink-0 text-primary" /><span>{t.label}</span></li>
                ))}
              </ul>
            </div>
            <div className="min-w-0">
              <VoiceHero />
            </div>
          </div>
        </section>

        {/* 2 · THE PROBLEM: three moments on a support call */}
        <section className="bg-secondary py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <p className={`${EYEBROW} text-primary`}>Where phone support breaks down</p>
              <h2 className={`${H2} mt-5`}>A call is the one conversation most teams cannot see.</h2>
              <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-muted-foreground">Chats and emails leave a trail. Phone calls often do not. Three moments show where it goes missing.</p>
            </div>
            <div className="mt-12 divide-y divide-border border-y border-border">
              <div className="hidden grid-cols-[1.1fr_1.4fr_1.4fr] gap-6 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground md:grid">
                <span>The moment</span><span>With a separate phone</span><span className="text-primary">With SMSLocal Voice</span>
              </div>
              {GAPS.map((g) => (
                <div key={g.moment} className="grid gap-2 py-6 md:grid-cols-[1.1fr_1.4fr_1.4fr] md:gap-6">
                  <p className="flex items-center gap-2.5 text-[17px] font-semibold tracking-tight"><g.Icon className="h-5 w-5 text-primary" />{g.moment}</p>
                  <p className="text-[14.5px] leading-relaxed text-muted-foreground">{g.old}</p>
                  <p className="text-[14.5px] font-medium leading-relaxed text-foreground">{g.fix}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3 · HOW IT WORKS: four steps from number to timeline */}
        <section className="bg-background py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <p className={`${EYEBROW} text-primary`}>How it works</p>
              <h2 className={`${H2} mt-5`}>From a phone number to a call on the timeline.</h2>
              <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-muted-foreground">There is nothing to install. Your team calls and answers from the inbox they already use.</p>
            </div>
            <ol className="relative mt-14 grid gap-8 md:grid-cols-4 md:gap-6">
              <i aria-hidden className="absolute left-[6%] right-[6%] top-[19px] hidden h-[2px] bg-gradient-to-r from-primary to-[#6366f1] md:block" />
              {STEPS.map((s) => (
                <li key={s.n} className="relative">
                  <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-foreground font-mono text-[12.5px] font-semibold text-background ring-4 ring-background">{s.n}</span>
                  <p className="mt-4 text-[17px] font-semibold tracking-tight">{s.t}</p>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">{s.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 4 · WHAT YOU GET: a dark band with four tools */}
        <section className="bg-[#0f2a47] py-20 text-white lg:py-28">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div>
              <p className={`${EYEBROW} text-[#7fdcb8]`}>What you get</p>
              <h2 className={`${H2} mt-5`}>Everything a phone line needs, inside the inbox.</h2>
              <p className="mt-5 max-w-md text-[16px] leading-relaxed text-white/70">Numbers, calling, recording and handoff come as one workspace, so a call is just another conversation.</p>
            </div>
            <ul className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
              {TOOLS.map((f) => (
                <li key={f.t} className="border-t border-white/20 pt-5">
                  <f.Icon className="h-5 w-5 text-[#7fdcb8]" />
                  <p className="mt-3 text-[17px] font-semibold">{f.t}</p>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-white/65">{f.d}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 5 · ONE TIMELINE: calls beside every other channel */}
        <section className="bg-[#eef8f3] py-20 lg:py-28">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div>
              <p className={`${EYEBROW} text-[#0b6b4c]`}>One customer timeline</p>
              <h2 className={`${H2} mt-5`}>Calls sit beside WhatsApp, SMS and chat.</h2>
              <p className="mt-5 max-w-md text-[16px] leading-relaxed text-muted-foreground">When a customer calls after a WhatsApp message, your agent sees both. When the call ends, the recording and transcript join the same history.</p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[14px] font-semibold text-primary">
                <Link href="/products/omnichannel-inbox/" className="inline-flex items-center gap-1.5 hover:underline">Omnichannel inbox <ArrowRight className="h-4 w-4" /></Link>
                <Link href="/products/analytics/" className="inline-flex items-center gap-1.5 hover:underline">Analytics <ArrowRight className="h-4 w-4" /></Link>
              </div>
            </div>
            <ul className="space-y-3">
              {INBOX.map((r) => (
                <li key={r.who} className="flex items-center gap-4 rounded-2xl bg-white px-5 py-4 shadow-[0_18px_28px_-18px_rgba(11,107,76,.45)]">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white" style={{ background: r.c }}><r.Icon className="h-5 w-5" /></span>
                  <div className="min-w-0 flex-1">
                    <p className="flex items-center gap-2 text-[14.5px] font-semibold"><span className="truncate">{r.who}</span><span className="rounded-full px-2 py-0.5 text-[10.5px] font-semibold text-white" style={{ background: r.c }}>{r.ch}</span></p>
                    <p className="mt-0.5 truncate text-[13.5px] text-muted-foreground">{r.msg}</p>
                  </div>
                  <span className="shrink-0 text-[12px] text-muted-foreground">{r.t}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 6 · USES: where teams use calling */}
        <section className="bg-background py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <p className={`${EYEBROW} text-primary`}>Where teams use it</p>
              <h2 className={`${H2} mt-5`}>Four moments when a call beats a message.</h2>
            </div>
            <ul className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2">
              {USES.map((u) => (
                <li key={u.t} className="flex gap-4 border-t border-border pt-6">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e8f7f0] text-[#0b6b4c]"><u.Icon className="h-5 w-5" /></span>
                  <div>
                    <p className="text-[18px] font-semibold tracking-tight">{u.t}</p>
                    <p className="mt-1.5 text-[14.5px] leading-relaxed text-muted-foreground">{u.d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <FaqSection items={FAQS} />
        <ExploreMore links={EXPLORE} />

        <ProductFinalCta
          title="Put every customer call in the inbox."
          subtitle="Answer, record and follow up on calls without leaving the customer's timeline."
          primaryCta={{ label: "Add Voice", href: "/signup/" }}
          secondaryCta={{ label: "Book a demo", href: "/company/contact/" }}
        />
      </main>
      <SiteFooter />
    </>
  )
}
