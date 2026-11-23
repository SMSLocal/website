import type { Metadata } from "next"
import Link from "next/link"
import { getPageMetadata } from "@/lib/seo"
import { ArrowRight, BadgeCheck, Bot, Check, CheckCheck, Layers, Megaphone, MessageCircle, Phone, ShieldCheck, ShoppingBag, Sparkles, CalendarDays, User } from "lucide-react"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { FaqSection } from "@/components/landing/faq-section"
import { BreadcrumbJsonLd, FaqJsonLd, ProductServiceJsonLd } from "@/components/seo/json-ld"
import { ProductFinalCta } from "@/components/product/product-page"
import { WaBroadcastScene } from "@/components/product/wa-broadcast-scene"

export const metadata: Metadata = getPageMetadata("/channels/whatsapp-broadcasting")

/* ─── DATA ────────────────────────────────────────────────────────────────── */

const TRUST = ["Official WhatsApp Business API", "Templates with media and buttons", "WhatsApp Flows and catalogs", "Replies answered by AI"]

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
  { k: "read", t: "Read", d: "The customer opened it. These are the blue ticks." },
  { k: "replied", t: "Replied", d: "They tapped a button or wrote back, and your AI answers." },
]

const LINKS = [
  { h: "/products/whatsapp-business-api/", t: "WhatsApp Business API", d: "Two-way conversations, templates and AI replies." },
  { h: "/channels/sms-broadcasting/", t: "SMS broadcasting", d: "The fallback for customers who are not on WhatsApp." },
  { h: "/channels/rcs-broadcasting/", t: "RCS broadcasting", d: "Branded rich cards on Android, with SMS behind them." },
  { h: "/products/agentic-ai/", t: "Agentic AI", d: "How the AI agent answers campaign replies." },
  { h: "/products/omnichannel-inbox/", t: "Omnichannel inbox", d: "One shared inbox for every conversation." },
]

const FAQS = [
  { q: "Is this the official WhatsApp Business API?", a: "Yes, with a verified sender. SMSLocal is an official WhatsApp Business Solution Provider, and every WhatsApp broadcast goes through Meta's infrastructure under your verified brand." },
  { q: "What is WhatsApp broadcasting?", a: "WhatsApp broadcasting is sending one approved message template to a whole audience of opted-in contacts, with each message personalised and tracked. It is the WhatsApp Business API way of doing WhatsApp bulk messaging, not a forwarded list from a personal phone." },
  { q: "Do I need an approved template to broadcast on WhatsApp?", a: "Yes. Campaigns outside a customer's 24-hour reply window use WhatsApp message templates that Meta has approved. SMSLocal helps you write, submit and track your WhatsApp template campaigns so you know when each one is ready to send." },
  { q: "Who can I send a WhatsApp broadcast to?", a: "Only customers who have opted in to hear from you on WhatsApp. SMSLocal helps you collect and store opt-ins, and people who opt out are left out of every later campaign automatically." },
  { q: "Can AI answer broadcast replies?", a: "Yes, automatically. When a customer replies to your broadcast, the agentic AI answers from your knowledge base right away, and hands off to a person in the same thread when needed. These WhatsApp AI replies stay tied to the campaign that started them." },
  { q: "What are WhatsApp Flows?", a: "WhatsApp Flows are in-chat forms and guided journeys, such as a booking, a sign-up or a lead form, that customers fill in without leaving WhatsApp. You can start a Flow from a button in a broadcast." },
  { q: "How do quality rating and messaging limits work?", a: "WhatsApp rates how customers respond to your messages and sets how many people you can message. SMSLocal shows your quality rating and limits so you can scale a WhatsApp marketing platform campaign without risking your number." },
  { q: "Can I schedule and automate WhatsApp campaigns?", a: "Yes. You can schedule a broadcast for later, and WhatsApp campaign automation lets replies and button taps trigger the next message or hand the chat to your team." },
]

/* ─── STYLE TOKENS ────────────────────────────────────────────────────────── */

const EYEBROW = "inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em]"
const H2 = "text-balance text-[28px] font-semibold leading-[1.08] tracking-[-0.035em] sm:text-[38px]"
const BTN = "group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-primary to-[oklch(0.55_0.13_172)] px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:shadow-xl hover:shadow-primary/30"
const BTN_OUT = "inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3.5 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"
const BLUE = "#53bdeb"
const MOCK = "rounded-2xl bg-white p-3.5 text-[13px] text-[#0f2a47]"
const MOCK_SH = { boxShadow: "0 0 0 1px rgba(15,42,71,.08), 0 22px 34px -24px rgba(15,42,71,.45)" }

function Pin({ n, pos }: { n: number; pos: string }) {
  return <span className={`absolute ${pos} flex h-6 w-6 items-center justify-center rounded-full bg-[#0f2a47] font-mono text-[11px] font-bold text-white ring-2 ring-white`}>{n}</span>
}

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
                Run WhatsApp bulk messaging and template campaigns for opted-in customers, with photos, buttons and Flows. Track every message from sent to read, and let agentic AI answer every reply.
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

        {/* 2 · ANATOMY: a template message with four numbered parts */}
        <section className="bg-secondary py-20 lg:py-28">
          <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div className="relative mx-auto w-full max-w-[330px]">
              <div className="relative rounded-2xl rounded-tl-md bg-[#d9fdd3] p-2" style={MOCK_SH}>
                <div className="relative rounded-xl bg-white">
                  <div className="relative flex h-[120px] items-center justify-center rounded-t-xl bg-gradient-to-br from-[#d7f3e6] to-[#cfe0f7]"><ShoppingBag className="h-10 w-10 text-[#0e9f6e]" /><Pin n={1} pos="-right-5 top-3" /></div>
                  <div className="relative px-3.5 pb-2 pt-3">
                    <p className="text-[14px] font-semibold text-[#0f2a47]">Order shipped ✅</p>
                    <p className="mt-1 text-[13px] leading-snug text-[#0f2a47]/75">Hi <span className="rounded bg-[#d9f3e6] px-1 font-semibold text-[#0b6b47]">{"{{name}}"}</span>, your order <span className="rounded bg-[#d9f3e6] px-1 font-semibold text-[#0b6b47]">{"{{order_id}}"}</span> has shipped.</p>
                    <Pin n={2} pos="-right-5 top-6" />
                    <p className="relative mt-2 text-[11.5px] text-[#0f2a47]/45">Reply STOP to opt out<Pin n={3} pos="-right-5 -top-1" /></p>
                  </div>
                </div>
                <div className="relative mt-1 divide-y divide-[#0f2a47]/8 overflow-hidden rounded-xl bg-white text-center text-[13px] font-semibold text-[#0a7cff]"><span className="block py-2">Track order</span><span className="block py-2">Contact support</span></div>
                <Pin n={4} pos="-right-5 bottom-8" />
              </div>
            </div>
            <div>
              <p className={`${EYEBROW} text-primary`}>WhatsApp template campaigns</p>
              <h2 className={`${H2} mt-5`}>One approved template, four parts to fill.</h2>
              <p className="mt-4 max-w-lg text-[16px] leading-relaxed text-muted-foreground">Every WhatsApp broadcast starts from a message template that Meta approves once. After that, you only change the parts that are personal.</p>
              <ol className="mt-8 space-y-5">
                {PARTS.map((p) => (
                  <li key={p.n} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-foreground font-mono text-[13px] font-bold text-background">{p.n}</span>
                    <div><p className="text-[18px] font-semibold tracking-tight">{p.t}</p><p className="mt-0.5 text-[15px] leading-relaxed text-muted-foreground">{p.d}</p></div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* 3 · LIFECYCLE: a track with a moving highlight */}
        <section className="bg-background py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <p className={`${EYEBROW} text-primary`}>WhatsApp campaign automation</p>
              <h2 className={`${H2} mt-5`}>Every broadcast has a clear status.</h2>
              <p className="mt-4 text-[16px] leading-relaxed text-muted-foreground">From the first draft to the last reply, you can see where each campaign stands, with sent, delivered and read counts per segment once it is out the door.</p>
            </div>
            <ol className="mt-14 grid gap-3 md:grid-cols-4">
              {STAGES.map((s, i) => (
                <li key={s.t} className={`wa-stage wa-stage${i} relative rounded-2xl border px-5 py-5`}>
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] opacity-60">0{i + 1}</span>
                  <p className="mt-2 text-[22px] font-semibold tracking-tight">{s.t}</p>
                  <p className="mt-1.5 text-[14px] leading-snug opacity-80">{s.d}</p>
                  {i < 3 ? <ArrowRight className="absolute -right-[18px] top-1/2 z-10 hidden h-5 w-5 -translate-y-1/2 rounded-full bg-background text-muted-foreground md:block" /> : null}
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 4 · WHAT YOU CAN SEND: four small WhatsApp mock-ups */}
        <section className="bg-secondary py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <p className={`${EYEBROW} text-primary`}>WhatsApp Business API broadcast</p>
              <h2 className={`${H2} mt-5`}>Every kind of message WhatsApp supports.</h2>
              <p className="mt-4 text-[16px] leading-relaxed text-muted-foreground">Send to the right segment, in the format that fits, and track it end to end.</p>
            </div>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {/* template campaign */}
              <div>
                <div className={MOCK} style={MOCK_SH}>
                  <p className="font-semibold">Hi <span className="rounded bg-[#d9f3e6] px-1 text-[#0b6b47]">{"{{name}}"}</span>,</p>
                  <p className="mt-1 leading-snug text-[#0f2a47]/75">your order <span className="rounded bg-[#d9f3e6] px-1 font-semibold text-[#0b6b47]">{"{{order_id}}"}</span> ships on <span className="rounded bg-[#d9f3e6] px-1 font-semibold text-[#0b6b47]">{"{{date}}"}</span>.</p>
                </div>
                <p className="mt-4 flex items-center gap-2 text-[17px] font-semibold tracking-tight"><Megaphone className="h-5 w-5 text-primary" />Template campaigns</p>
                <p className="mt-1 text-[14px] leading-relaxed text-muted-foreground">Approved templates to large opted-in audiences, with merge fields for names, orders and dates.</p>
              </div>
              {/* rich message */}
              <div>
                <div className={`${MOCK} overflow-hidden !p-0`} style={MOCK_SH}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/home/p-shoe.webp" alt="" width={400} height={240} className="h-[96px] w-full object-cover" />
                  <div className="p-3"><p className="font-semibold">New arrivals</p><div className="mt-2 flex gap-2"><span className="flex-1 rounded-full border border-[#0e9f6e] py-1 text-center text-[12px] font-semibold text-[#0b6b47]">Shop now</span><span className="flex-1 rounded-full border border-[#cbd5e1] py-1 text-center text-[12px] font-semibold text-[#0f2a47]/60">Not now</span></div></div>
                </div>
                <p className="mt-4 flex items-center gap-2 text-[17px] font-semibold tracking-tight"><Sparkles className="h-5 w-5 text-primary" />Rich messages</p>
                <p className="mt-1 text-[14px] leading-relaxed text-muted-foreground">Photos, video, buttons and list replies, so customers act without leaving the chat.</p>
              </div>
              {/* flow */}
              <div>
                <div className={MOCK} style={MOCK_SH}>
                  <p className="font-semibold">Book a visit</p>
                  <div className="mt-2 flex items-center gap-2 rounded-lg border border-[#0f2a47]/12 px-2.5 py-1.5 text-[12px] text-[#0f2a47]/55"><User className="h-3.5 w-3.5" />Your name</div>
                  <div className="mt-1.5 flex items-center gap-2 rounded-lg border border-[#0f2a47]/12 px-2.5 py-1.5 text-[12px] text-[#0f2a47]/55"><CalendarDays className="h-3.5 w-3.5" />Choose a day</div>
                  <span className="mt-2 block rounded-full bg-[#25d366] py-1.5 text-center text-[12px] font-semibold text-white">Confirm</span>
                </div>
                <p className="mt-4 flex items-center gap-2 text-[17px] font-semibold tracking-tight"><Layers className="h-5 w-5 text-primary" />WhatsApp Flows</p>
                <p className="mt-1 text-[14px] leading-relaxed text-muted-foreground">In-chat forms and guided journeys for bookings, sign-ups and lead capture. No landing page needed.</p>
              </div>
              {/* click to whatsapp / catalog */}
              <div>
                <div className={MOCK} style={MOCK_SH}>
                  <div className="grid grid-cols-2 gap-2">
                    {["#d7f3e6", "#dbeafe", "#fef3c7", "#ede9fe"].map((c) => <span key={c} className="flex h-[52px] items-center justify-center rounded-lg" style={{ background: c }}><ShoppingBag className="h-5 w-5 text-[#0f2a47]/45" /></span>)}
                  </div>
                  <span className="mt-2.5 block rounded-full border border-[#0a7cff]/40 py-1.5 text-center text-[12px] font-semibold text-[#0a7cff]">View catalog</span>
                </div>
                <p className="mt-4 flex items-center gap-2 text-[17px] font-semibold tracking-tight"><ShoppingBag className="h-5 w-5 text-primary" />Click-to-WhatsApp and catalogs</p>
                <p className="mt-1 text-[14px] leading-relaxed text-muted-foreground">Ad entry points and catalog messages turn interest into a conversation your AI can qualify.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 5 · THE TICKS: what each stage means */}
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

        {/* 6 · QUALITY: a gauge with a sweeping needle */}
        <section className="bg-background py-20 lg:py-28">
          <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <div>
              <p className={`${EYEBROW} text-primary`}>WhatsApp marketing platform</p>
              <h2 className={`${H2} mt-5`}>Keep your sender healthy as you scale.</h2>
              <p className="mt-4 max-w-lg text-[16px] leading-relaxed text-muted-foreground">WhatsApp rates how customers react to your messages and sets how many people you can reach. A broadcast that people want keeps your rating high, and a high rating raises your limit.</p>
              <ul className="mt-7 space-y-4">
                {[{ I: BadgeCheck, t: "Quality rating, shown for each number" }, { I: ShieldCheck, t: "Messaging limits, so you can plan the next send" }, { I: Bot, t: "Opt-outs handled, so unwanted messages stop" }, { I: Phone, t: "Opt-ins collected and stored, so you only send to people who agreed" }].map((x) => (
                  <li key={x.t} className="flex items-start gap-3 text-[15.5px]"><x.I className="mt-0.5 h-5 w-5 shrink-0 text-primary" />{x.t}</li>
                ))}
              </ul>
            </div>
            <div className="mx-auto w-full max-w-[420px]">
              <svg viewBox="0 0 400 240" className="w-full" role="img" aria-label="A quality rating gauge from low to high with the needle resting on high">
                <defs>
                  <linearGradient id="wa-gauge" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#ef4444" /><stop offset=".5" stopColor="#f59e0b" /><stop offset="1" stopColor="#0e9f6e" /></linearGradient>
                </defs>
                <path d="M 40 210 A 160 160 0 0 1 360 210" fill="none" stroke="#0f2a47" strokeOpacity=".08" strokeWidth="26" strokeLinecap="round" />
                <path d="M 40 210 A 160 160 0 0 1 360 210" fill="none" stroke="url(#wa-gauge)" strokeWidth="26" strokeLinecap="round" pathLength={1} strokeDasharray="1" className="wa-gauge" />
                <g className="wa-needle" style={{ transformOrigin: "200px 210px" }}>
                  <path d="M 200 210 L 200 78" stroke="#0f2a47" strokeWidth="6" strokeLinecap="round" />
                  <circle cx="200" cy="210" r="14" fill="#0f2a47" />
                </g>
                <text x="40" y="236" fontSize="14" fontWeight="600" fill="#64748b">Low</text>
                <text x="178" y="40" fontSize="14" fontWeight="600" fill="#64748b">Medium</text>
                <text x="326" y="236" fontSize="14" fontWeight="700" fill="#0b7a55">High</text>
              </svg>
              <p className="mt-2 text-center text-[13.5px] font-semibold text-muted-foreground">Quality rating</p>
            </div>
          </div>
        </section>

        {/* 7 · LINKS */}
        <section className="bg-secondary py-20 lg:py-28">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className={`${EYEBROW} text-primary`}>WhatsApp AI replies</p>
              <h2 className={`${H2} mt-5`}>The send is only the start of the conversation.</h2>
              <p className="mt-4 max-w-sm text-[16px] leading-relaxed text-muted-foreground">The broadcast, the AI agent and the inbox share one platform, so a reply to a campaign becomes a real conversation tied to the broadcast that started it.</p>
            </div>
            <ul className="divide-y divide-border border-y border-border">
              {LINKS.map((l) => (
                <li key={l.h}>
                  <Link href={l.h} className="group flex items-center justify-between gap-6 py-5">
                    <span><span className="block text-[18px] font-semibold transition group-hover:text-primary">{l.t}</span><span className="mt-0.5 block text-[14.5px] text-muted-foreground">{l.d}</span></span>
                    <ArrowRight className="h-5 w-5 flex-none text-muted-foreground transition group-hover:translate-x-1 group-hover:text-primary" />
                  </Link>
                </li>
              ))}
            </ul>
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
        .wa-stage { background: var(--card); border-color: var(--border); color: var(--foreground); animation-duration: 12s; animation-iteration-count: infinite; animation-timing-function: ease-in-out }
        @keyframes wa-st0 { 0%, 22% { background: #0f2a47; color: #fff; border-color: #0f2a47 } 28%, 100% { background: var(--card); color: var(--foreground); border-color: var(--border) } }
        @keyframes wa-st1 { 0%, 22% { background: var(--card); color: var(--foreground); border-color: var(--border) } 28%, 47% { background: #0f2a47; color: #fff; border-color: #0f2a47 } 53%, 100% { background: var(--card); color: var(--foreground); border-color: var(--border) } }
        @keyframes wa-st2 { 0%, 47% { background: var(--card); color: var(--foreground); border-color: var(--border) } 53%, 72% { background: #0f2a47; color: #fff; border-color: #0f2a47 } 78%, 100% { background: var(--card); color: var(--foreground); border-color: var(--border) } }
        @keyframes wa-st3 { 0%, 72% { background: var(--card); color: var(--foreground); border-color: var(--border) } 78%, 97% { background: #0e9f6e; color: #fff; border-color: #0e9f6e } 100% { background: var(--card); color: var(--foreground); border-color: var(--border) } }
        .wa-stage0 { animation-name: wa-st0 } .wa-stage1 { animation-name: wa-st1 } .wa-stage2 { animation-name: wa-st2 } .wa-stage3 { animation-name: wa-st3 }
        @keyframes wa-gaugeK { 0%, 8% { stroke-dashoffset: 1 } 40%, 100% { stroke-dashoffset: 0 } }
        .wa-gauge { stroke-dashoffset: 1; animation: wa-gaugeK 6s ease-out infinite }
        @keyframes wa-needleK { 0%, 6% { transform: rotate(-78deg) } 24% { transform: rotate(-30deg) } 36% { transform: rotate(-52deg) } 52%, 90% { transform: rotate(66deg) } 100% { transform: rotate(-78deg) } }
        .wa-needle { transform: rotate(66deg); animation: wa-needleK 6s cubic-bezier(.4,.1,.3,1) infinite }
        @media (prefers-reduced-motion: reduce) { .wa-rise { animation: none } .wa-stage { animation: none } .wa-gauge, .wa-needle { animation: none } .wa-gauge { stroke-dashoffset: 0 } }
      `}</style>
    </>
  )
}
