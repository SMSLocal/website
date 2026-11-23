import type { Metadata } from "next"
import Link from "next/link"
import { getPageMetadata } from "@/lib/seo"
import { ArrowRight, BadgeCheck, BarChart3, Check, Image as ImageIcon, MessageSquare, MousePointerClick, ScanSearch, Send, Sparkles, Users } from "lucide-react"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { FaqSection } from "@/components/landing/faq-section"
import { ExploreMore } from "@/components/product/explore-more"
import { GsFinalCta } from "@/components/home/gs/sections-c"
import { GiftArt } from "@/components/product/rcs-flow-scene"
import { RcsDeckScene } from "@/components/product/rcs-deck-scene"
import { BreadcrumbJsonLd, FaqJsonLd, ProductServiceJsonLd } from "@/components/seo/json-ld"

export const metadata: Metadata = getPageMetadata("/channels/rcs-broadcasting")

const BTN = "group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-primary to-[oklch(0.55_0.13_172)] px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:shadow-xl hover:shadow-primary/30"
const BTN_OUT = "inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3.5 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"
const EYEBROW = "inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em]"
const H2 = "text-balance text-[28px] font-semibold leading-[1.08] tracking-[-0.035em] sm:text-[38px]"

const TRUST = [
  { icon: ImageIcon, label: "Rich cards and carousels" },
  { icon: BadgeCheck, label: "Verified brand sender" },
  { icon: Send, label: "Automatic SMS fallback" },
  { icon: BarChart3, label: "Reads and taps per campaign" },
]

const STAGES = [
  { t: "Bring your list", d: "Upload a file or pick a live segment. Only numbers you have consent to message go in.", Icon: Users },
  { t: "Design the card", d: "Add a photo, a title, a line of text and up to four buttons. The preview matches Google Messages.", Icon: Sparkles },
  { t: "Send once", d: "SMSLocal checks each number for RCS at send time, sends the card where it works and your SMS where it does not.", Icon: Send },
  { t: "Watch it land", d: "See delivery by channel, reads, which button was tapped and who replied, campaign by campaign.", Icon: BarChart3 },
]

const TAPS = [
  { btn: "Shop now", out: "Opens your store or landing page.", Icon: MousePointerClick },
  { btn: "Talk to us", out: "Starts a chat. Agentic AI answers in the shared inbox and hands over to a person when needed.", Icon: MessageSquare },
  { btn: "Reply STOP", out: "The customer is opted out of future broadcasts, automatically.", Icon: Check },
]

const SAFE = [
  "A verified sender, so customers see your name and logo instead of a number",
  "An RCS capability check on every number at send time",
  "A DLT-approved SMS template ready as the fallback",
  "Opt-outs honoured automatically on every send",
  "Brand and agent approvals handled alongside your team",
]

const FAQ = [
  {
    q: "What is RCS broadcasting?",
    a: "RCS broadcasting is sending one branded RCS message to many people at once. Phones that support RCS show a rich card with a photo, text and tappable buttons from your verified sender. It is the RCS version of a bulk SMS campaign.",
  },
  {
    q: "What happens to phones that do not support RCS?",
    a: "They get your SMS instead, in the same send. SMSLocal checks RCS capability for each number at send time, so capable phones receive the rich card and every other phone receives your DLT-approved SMS. You never run a second campaign.",
  },
  {
    q: "Can AI answer the replies?",
    a: "Yes. When a customer replies to your RCS or SMS-fallback broadcast, the reply lands in the shared inbox where agentic AI answers and hands over to a human when needed.",
  },
  {
    q: "What can I see after a campaign?",
    a: "RCS campaign analytics show delivery and reads by channel (RCS and SMS fallback), which button or suggested reply was tapped, and who replied, so you can see what is actually working.",
  },
  {
    q: "Do I need a verified brand to send RCS campaigns?",
    a: "Yes. RCS messages go out from a verified sender, and we help you with the brand and agent approvals. That is what puts your name and logo on the message and builds trust with customers.",
  },
  {
    q: "Can I reach people who have not saved my number?",
    a: "You can message customers who have given you consent, whether or not they have saved your number. The verified sender and rich card make the message recognisable at a glance.",
  },
]

const EXPLORE = [
  { href: "/products/rcs/", label: "RCS business messaging", hint: "Verified, branded rich cards" },
  { href: "/channels/whatsapp-broadcasting/", label: "WhatsApp broadcasting", hint: "Campaigns and conversations" },
  { href: "/channels/sms-broadcasting/", label: "SMS broadcasting", hint: "Reliable fallback at scale" },
  { href: "/products/integrations/", label: "Integrations and API", hint: "Send from your CRM or store" },
]

const CSS = `
@keyframes rbp-rise { from { opacity: 0; transform: translateY(20px) } to { opacity: 1; transform: none } }
.rbp-rise { animation: rbp-rise .8s cubic-bezier(.2,.7,.2,1) both }
@media (prefers-reduced-motion: reduce) { .rbp-rise { animation: none } }
`

export default function RcsBroadcastingPage() {
  return (
    <>
      <ProductServiceJsonLd
        name="SMSLocal RCS Broadcasting"
        description="Send branded RCS broadcast campaigns with rich cards, carousels and suggested replies, with automatic SMS fallback for phones without RCS, and agentic AI that answers the replies."
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
      <FaqJsonLd items={FAQ} path="/channels/rcs-broadcasting" />
      <SiteHeader />
      <main className="overflow-x-clip">

        {/* 1 · HERO */}
        <section className="relative isolate overflow-hidden bg-background">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-14 pt-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_600px] lg:gap-10 lg:pb-20 lg:pt-12">
            <div className="rbp-rise min-w-0">
              <p className="inline-flex items-center gap-2 rounded-full bg-foreground px-3.5 py-1.5 text-[12.5px] font-medium text-background">
                <Sparkles className="h-3.5 w-3.5 text-accent" />Channels · RCS broadcasting
              </p>
              <h1 className="mt-6 text-balance text-[30px] font-semibold leading-[1.1] tracking-[-0.035em] sm:text-[42px]">
                RCS broadcasting in India, <span className="text-primary">with SMS fallback</span>
              </h1>
              <p className="mt-5 max-w-lg text-pretty text-[17px] leading-relaxed text-muted-foreground">
                Send branded RCS bulk campaigns to your whole list. Phones that support RCS get a rich card with buttons; every other phone gets your SMS, from the same send. Replies are answered by agentic AI.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link href="/signup/" className={BTN}>Start broadcasting <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" /></Link>
                <Link href="/company/contact/" className={BTN_OUT}>Get a demo</Link>
              </div>
              <ul className="mt-8 grid max-w-lg grid-cols-1 gap-x-8 gap-y-3 text-[14px] text-muted-foreground sm:grid-cols-2">
                {TRUST.map((t) => (
                  <li key={t.label} className="flex items-start gap-2.5 leading-snug"><t.icon className="mt-[1px] h-4 w-4 shrink-0 text-primary" /><span>{t.label}</span></li>
                ))}
              </ul>
            </div>
            <div className="rbp-rise min-w-0" style={{ animationDelay: "0.15s" }}>
              <RcsDeckScene />
            </div>
          </div>
        </section>

        {/* 2 · ONE SEND, TWO OUTCOMES: the same message as an RCS card and as an SMS */}
        <section className="bg-secondary py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <p className={`${EYEBROW} justify-center text-primary`}>RCS SMS fallback broadcast</p>
              <h2 className={`${H2} mt-5`}>One send. Every phone gets your message.</h2>
              <p className="mt-4 text-[16px] leading-relaxed text-muted-foreground">Not every phone can show RCS yet. SMSLocal checks each number and picks the right version, so nobody is left out.</p>
            </div>
            <div className="mt-14 grid items-center gap-10 md:grid-cols-[1fr_auto_1fr]">
              {/* RCS */}
              <div className="mx-auto w-full max-w-[290px]">
                <div className="overflow-hidden rounded-2xl bg-white shadow-[0_26px_40px_-22px_rgba(15,42,71,.45)] ring-1 ring-black/5">
                  <GiftArt className="h-36 w-full" />
                  <div className="px-4 py-3.5">
                    <p className="flex items-center gap-1.5 text-[12px] font-semibold text-muted-foreground"><span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">U</span>Urban Cart <BadgeCheck className="h-3.5 w-3.5 text-primary" /></p>
                    <p className="mt-2 text-[16px] font-semibold">Your Diwali hamper is here</p>
                    <p className="mt-1 text-[13px] leading-snug text-muted-foreground">Hand-picked gifts, delivered before the festival.</p>
                  </div>
                  <div className="grid grid-cols-2 border-t border-border text-center text-[13px] font-semibold text-[#0a7cff]"><span className="border-r border-border py-2.5">Shop now</span><span className="py-2.5">View offer</span></div>
                </div>
                <p className="mt-5 text-center text-[15px] font-semibold">Phones with RCS</p>
                <p className="mt-1 text-center text-[13.5px] text-muted-foreground">A rich card from your verified sender, with buttons.</p>
              </div>

              {/* the check */}
              <div className="flex flex-col items-center gap-3 text-center">
                <ArrowRight className="hidden h-5 w-5 rotate-180 text-muted-foreground/50 md:block" />
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-foreground text-background shadow-lg"><ScanSearch className="h-7 w-7" /></span>
                <p className="max-w-[130px] text-[12.5px] font-semibold leading-tight">RCS capability check on every number</p>
                <ArrowRight className="hidden h-5 w-5 text-muted-foreground/50 md:block" />
              </div>

              {/* SMS */}
              <div className="mx-auto w-full max-w-[290px]">
                <div className="rounded-2xl rounded-bl-md bg-[#e4e8ed] px-4 py-4 text-[14px] leading-relaxed text-[#14233a]">Urban Cart: Your Diwali hamper is here. Hand-picked gifts, delivered before the festival. Shop: bit.ly/x1Kq</div>
                <p className="mt-5 text-center text-[15px] font-semibold">Every other phone</p>
                <p className="mt-1 text-center text-[13.5px] text-muted-foreground">Your DLT-approved SMS, sent in the same batch.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 3 · FROM LIST TO RESULTS: four full-width bands */}
        <section className="bg-background">
          <div className="mx-auto max-w-6xl px-4 pt-20 sm:px-6 lg:pt-28">
            <p className={`${EYEBROW} text-primary`}>RCS bulk campaigns</p>
            <h2 className={`${H2} mt-5 max-w-2xl`}>From a list to a branded campaign in four steps.</h2>
          </div>
          <div className="mt-12">
            {STAGES.map((s, i) => (
              <div key={s.t} className={i % 2 === 0 ? "bg-background" : "bg-[#eef7f2]"}>
                <div className="mx-auto grid max-w-6xl items-center gap-4 px-4 py-9 sm:px-6 md:grid-cols-[90px_1fr_1.3fr] md:gap-10">
                  <span className="font-mono text-[44px] font-semibold leading-none tracking-[-0.06em] text-primary/35">0{i + 1}</span>
                  <p className="flex items-center gap-3 text-[24px] font-semibold tracking-tight"><s.Icon className="h-6 w-6 shrink-0 text-primary" />{s.t}</p>
                  <p className="max-w-lg text-[15px] leading-relaxed text-muted-foreground">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4 · AFTER THE TAP: what each button does */}
        <section className="bg-background py-20 lg:py-28">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
            <div>
              <p className={`${EYEBROW} text-primary`}>RCS marketing campaigns</p>
              <h2 className={`${H2} mt-5`}>A tap is the start of a conversation.</h2>
              <p className="mt-4 max-w-md text-[16px] leading-relaxed text-muted-foreground">Buttons and suggested replies turn a broadcast into something customers act on. Here is what happens after each one.</p>
            </div>
            <ul className="space-y-5">
              {TAPS.map((t) => (
                <li key={t.btn} className="grid items-center gap-3 border-b border-border pb-5 sm:grid-cols-[170px_28px_1fr] sm:gap-4">
                  <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#0a7cff]/35 bg-white px-4 py-2 text-[14px] font-semibold text-[#0a7cff] shadow-sm"><t.Icon className="h-4 w-4" />{t.btn}</span>
                  <ArrowRight className="hidden h-5 w-5 text-primary sm:block" />
                  <p className="text-[15px] leading-relaxed text-foreground">{t.out}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 5 · VERIFIED AND UNDER CONTROL */}
        <section className="bg-[#0f2a47] py-20 text-white lg:py-28">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            <div>
              <p className={`${EYEBROW} text-[#9ee6c8]`}>RCS mass messaging India</p>
              <h2 className={`${H2} mt-5`}>Reach many people without looking like spam.</h2>
              <p className="mt-4 max-w-md text-[16px] leading-relaxed text-white/70">A verified name, a consent-based list and a clear way to opt out. That is what makes a broadcast welcome.</p>
            </div>
            <ul className="divide-y divide-white/15 border-y border-white/15">
              {SAFE.map((x) => (
                <li key={x} className="flex items-start gap-4 py-5 text-[15.5px] leading-snug"><span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0e9f6e]"><Check className="h-3 w-3" strokeWidth={3.2} /></span>{x}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* 6 · WHAT YOU CAN MEASURE: one big sentence */}
        <section className="bg-secondary py-20 lg:py-28">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <p className={`${EYEBROW} text-primary`}>RCS campaign analytics</p>
            <p className="mt-6 text-balance text-[26px] font-semibold leading-[1.25] tracking-[-0.03em] sm:text-[40px]">
              See <mark className="rounded bg-primary/15 px-2 text-foreground">delivery by channel</mark>, <mark className="rounded bg-primary/15 px-2 text-foreground">reads</mark>, <mark className="rounded bg-primary/15 px-2 text-foreground">which button was tapped</mark> and <mark className="rounded bg-primary/15 px-2 text-foreground">who replied</mark>, for every campaign you send.
            </p>
            <p className="mt-8 max-w-xl text-[16px] leading-relaxed text-muted-foreground">Compare RCS with the SMS fallback, find the buttons that get tapped, and send the next campaign with what you learned.</p>
          </div>
        </section>

        <FaqSection items={FAQ} />
        <ExploreMore links={EXPLORE} />
        <GsFinalCta />
      </main>
      <SiteFooter />
      <style>{CSS}</style>
    </>
  )
}
