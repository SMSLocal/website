import type { Metadata } from "next"
import Link from "next/link"
import { getPageMetadata } from "@/lib/seo"
import { ArrowRight, Check, MessageSquare, Smartphone, Mail, Bell, MessageCircle } from "lucide-react"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { FaqSection } from "@/components/landing/faq-section"
import { BreadcrumbJsonLd, FaqJsonLd, ProductServiceJsonLd } from "@/components/seo/json-ld"
import { ProductFinalCta } from "@/components/product/product-page"
import { SmsCollageScene } from "@/components/product/sms-collage-scene"

export const metadata: Metadata = getPageMetadata("/channels/sms-broadcasting")

/* ─── DATA ────────────────────────────────────────────────────────────────── */

const TRUST = ["DLT sender ID and template support", "Merge fields and link tracking", "STOP and HELP handled for you", "Replies answered by agentic AI"]

/* what each channel needs from the customer */
const NEEDS = [
  { Icon: MessageCircle, ch: "WhatsApp", needs: "The app installed and mobile data on", hero: false },
  { Icon: Bell, ch: "App push", needs: "Your app installed and notifications allowed", hero: false },
  { Icon: Mail, ch: "Email", needs: "An inbox they check, and a message that is not in spam", hero: false },
  { Icon: Smartphone, ch: "SMS", needs: "Just a phone number", hero: true },
]

/* promotional vs transactional */
const TYPES = [
  { k: "What it is for", p: "Offers, sales, launches and reminders that market something", t: "Messages about something the customer just did: OTPs, order and payment updates" },
  { k: "Who can receive it", p: "Only contacts who agreed to hear from you", t: "The customer involved in the transaction" },
  { k: "Sender ID", p: "A registered sender ID, set up under DLT", t: "A registered sender ID, set up under DLT" },
  { k: "Template", p: "Every promotional message must match an approved template", t: "Every transactional message must match an approved template" },
  { k: "Sending hours", p: "Limited to the hours TRAI permits for promotions", t: "Any time, because customers expect it" },
  { k: "Opt-outs", p: "STOP is honoured and the contact moves to your suppression list", t: "Not applicable: it is not marketing" },
]

/* narrowing the audience */
const NARROW = [
  { t: "Your whole list", d: "Everyone you have a number for", w: 100 },
  { t: "Opted in", d: "Contacts who agreed to hear from you; suppressed numbers drop out", w: 78 },
  { t: "Your segment", d: "For example: bought in the last 30 days, in Pune", w: 52 },
  { t: "Sent now or scheduled", d: "Personalised with each person's own details", w: 34 },
]

/* what a report shows */
const REPORT = [
  { t: "Delivered", d: "The message reached the handset, confirmed by the delivery receipt.", c: "#0e9f6e" },
  { t: "Failed", d: "It did not arrive, with the reason: switched off, invalid number or blocked.", c: "#dc2626" },
  { t: "Clicked", d: "Who tapped your tracked short link, so you can see which offer worked.", c: "#2f78bd" },
  { t: "Replied", d: "Customers who texted back, with the thread open in your shared inbox.", c: "#7c3aed" },
  { t: "Opted out", d: "Contacts who sent STOP, moved to the suppression list for every later campaign.", c: "#64748b" },
]

const LINKS = [
  { h: "/channels/whatsapp-broadcasting/", t: "WhatsApp broadcasting", d: "Rich campaigns with templates and replies in the same inbox." },
  { h: "/channels/rcs-broadcasting/", t: "RCS broadcasting", d: "Rich cards and buttons, with SMS as the fallback." },
  { h: "/products/omnichannel-inbox/", t: "Omnichannel inbox", d: "Where every reply lands, routed and timed." },
  { h: "/developers/sms-api/", t: "SMS API", d: "Send transactional messages and trigger campaigns from your app." },
  { h: "/numbers/did/", t: "DID and virtual numbers", d: "Numbers managed in the platform, next to your campaigns." },
]

const FAQS = [
  { q: "What is A2P SMS broadcasting?", a: "A2P stands for application-to-person: messages sent by a business to many customers from software, not from a personal phone. SMS broadcasting is sending one campaign to a whole audience, with a sender ID, a registered template and opt-out handling." },
  { q: "Do you support DLT registration?", a: "Yes. Sender ID and template registration are part of the campaign workflow, guided inside the platform so your messages stay compliant with Indian regulations." },
  { q: "What is the difference between promotional and transactional SMS?", a: "Promotional SMS markets an offer and goes only to people who agreed to receive it. Transactional SMS is about something the customer just did, such as an OTP or an order update. The two follow different rules, and the platform keeps them separate." },
  { q: "Can AI answer replies to a broadcast?", a: "Yes. A reply lands in the shared inbox, where the agentic AI answers from your knowledge base and hands off to a person when the conversation needs one." },
  { q: "Are opt-outs handled for me?", a: "Yes. STOP and HELP handling and suppression lists are applied by default across every campaign, with no extra setup." },
  { q: "Can I personalise and schedule a bulk SMS campaign?", a: "Yes. Merge fields add each recipient's name or order detail, and you can schedule a send for the time your customers are most likely to read it." },
  { q: "How do I see what was delivered?", a: "Delivery receipts and per-campaign reports show what landed, what failed, who clicked the link and who replied, so there is no guessing after the send." },
  { q: "Can I send SMS from my own software?", a: "Yes. Everything in the campaign manager is also available through the SMS API, so your app can send transactional messages and trigger campaigns." },
]

/* ─── STYLE TOKENS ────────────────────────────────────────────────────────── */

const EYEBROW = "inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em]"
const H2 = "text-balance text-[28px] font-semibold leading-[1.08] tracking-[-0.035em] sm:text-[38px]"
const BTN = "group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-primary to-[oklch(0.55_0.13_172)] px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:shadow-xl hover:shadow-primary/30"
const BTN_OUT = "inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3.5 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"

/* a message cut into segments: english fits 160 per segment, other scripts 70 */
function Segments({ label, sub, per, text }: { label: string; sub: string; per: number; text: string }) {
  const chars = text.length
  const n = Math.ceil(chars / per)
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-[18px] font-semibold tracking-tight">{label}</p>
        <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-muted-foreground">{n} {n === 1 ? "segment" : "segments"}</p>
      </div>
      <p className="mt-1 text-[14px] text-muted-foreground">{sub}</p>
      <p className="mt-3 text-[15.5px] leading-snug">{text}</p>
      <div className="mt-4 flex h-3 gap-1">
        {Array.from({ length: n }).map((_, i) => (
          <span key={i} className="h-full rounded-sm bg-primary" style={{ flex: i === n - 1 ? (chars - per * (n - 1)) / per : 1 }} />
        ))}
      </div>
      <p className="mt-2 text-[12.5px] text-muted-foreground">{chars} characters, {per} fit in one segment</p>
    </div>
  )
}

/* ─── PAGE ────────────────────────────────────────────────────────────────── */

export default function SmsBroadcastingPage() {
  return (
    <>
      <ProductServiceJsonLd
        name="SMSLocal A2P SMS Broadcasting"
        description="Send DLT-ready bulk SMS campaigns in India with segmentation, personalisation, link tracking, STOP and HELP handling and delivery reports, with replies answered by agentic AI."
        path="/channels/sms-broadcasting"
        category="A2P SMS Broadcasting"
      />
      <BreadcrumbJsonLd crumbs={[{ name: "Home", path: "/" }, { name: "SMS Broadcasting", path: "/channels/sms-broadcasting" }]} />
      <SiteHeader />
      <main className="overflow-x-clip bg-background font-normal text-foreground">

        {/* 1 · HERO: the journey of one bulk SMS through its checks */}
        <section className="relative isolate overflow-hidden bg-background">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-14 pt-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_560px] lg:gap-10 lg:pb-20 lg:pt-12">
            <div className="sm-rise min-w-0">
              <p className="inline-flex items-center gap-2 rounded-full bg-foreground px-3.5 py-1.5 text-[12.5px] font-medium text-background">
                <MessageSquare className="h-3.5 w-3.5 text-accent" />SMS broadcasting
              </p>
              <h1 className="mt-6 text-balance text-[30px] font-semibold leading-[1.1] tracking-[-0.035em] sm:text-[42px]">
                A2P SMS broadcasting that <span className="text-primary">answers every reply.</span>
              </h1>
              <p className="mt-5 max-w-lg text-pretty text-[17px] leading-relaxed text-muted-foreground">
                Run bulk SMS campaigns in India from one campaign manager. Your DLT sender ID and template are checked before every send, each message is personal, and agentic AI answers the replies.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link href="/company/contact/" className={BTN}>Start broadcasting <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" /></Link>
                <Link href="/company/contact/" className={BTN_OUT}>Get a demo</Link>
              </div>
              <ul className="mt-8 grid max-w-lg grid-cols-1 gap-x-8 gap-y-3 text-[14px] text-muted-foreground sm:grid-cols-2">
                {TRUST.map((t) => (
                  <li key={t} className="flex items-start gap-2.5 leading-snug"><Check className="mt-[2px] h-4 w-4 shrink-0 text-primary" strokeWidth={3} /><span>{t}</span></li>
                ))}
              </ul>
            </div>
            <div className="sm-rise min-w-0" style={{ animationDelay: "0.15s" }}>
              <SmsCollageScene />
            </div>
          </div>
        </section>

        {/* 2 · WHY SMS: what each channel needs from the customer, SMS needs the least */}
        <section className="bg-secondary py-20 lg:py-28">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <p className={`${EYEBROW} text-primary`}>SMS broadcast platform</p>
              <h2 className={`${H2} mt-5`}>Every other channel asks something of the customer.</h2>
              <p className="mt-4 max-w-md text-[16px] leading-relaxed text-muted-foreground">SMS needs only a phone number. That is why bulk SMS campaigns still reach people when an app, a data connection or an inbox habit gets in the way. The gap is usually what happens after the send, and that is where SMSLocal adds a shared inbox and AI replies.</p>
            </div>
            <ul className="divide-y divide-border border-y border-border">
              {NEEDS.map((n) => (
                <li key={n.ch} className={`flex items-center gap-4 py-5 ${n.hero ? "text-foreground" : "text-muted-foreground"}`}>
                  <n.Icon className={`h-6 w-6 shrink-0 ${n.hero ? "text-primary" : ""}`} />
                  <span className={`w-24 shrink-0 text-[18px] font-semibold tracking-tight ${n.hero ? "text-primary" : ""}`}>{n.ch}</span>
                  <span className="text-[15px] leading-snug">Needs: {n.needs}</span>
                  {n.hero ? <Check className="ml-auto h-5 w-5 shrink-0 text-primary" strokeWidth={3} /> : null}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 3 · SEGMENTS: the same idea in two scripts, drawn as a ruler */}
        <section className="bg-background py-20 lg:py-28">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <p className={`${EYEBROW} text-primary`}>SMS campaign manager</p>
              <h2 className={`${H2} mt-5`}>Know how long your message really is.</h2>
              <p className="mt-4 text-[16px] leading-relaxed text-muted-foreground">An SMS is sent in segments. English text fits 160 characters in one segment; Hindi and other scripts fit 70. The campaign manager counts for you before you send, so a long message never surprises you.</p>
            </div>
            <div className="mt-14 grid gap-14 md:grid-cols-2 md:gap-16">
              <Segments label="English" sub="Plain text, 160 characters per segment" per={160} text="AD-SMSLCL: Hi Rahul, your Diwali offer ends Sunday. Shop now: smsl.in/d4x9. Reply STOP to opt out" />
              <Segments label="Hindi" sub="Other scripts, 70 characters per segment" per={70} text="राहुल जी, आपका दिवाली ऑफर रविवार को खत्म हो रहा है। अभी खरीदें: smsl.in/d4x9 STOP लिखकर बंद करें" />
            </div>
          </div>
        </section>

        {/* 4 · PROMOTIONAL AND TRANSACTIONAL: one comparison table */}
        <section className="bg-secondary py-20 lg:py-28">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <p className={`${EYEBROW} text-primary`}>DLT SMS broadcasting</p>
              <h2 className={`${H2} mt-5`}>Promotional or transactional: pick the right lane.</h2>
              <p className="mt-4 text-[16px] leading-relaxed text-muted-foreground">India sorts bulk SMS into message types, each with its own rules. SMSLocal guides the sender ID and template registration for both, so you start on the right lane.</p>
            </div>
            <div className="mt-12 text-[15px]">
              <div className="hidden grid-cols-[170px_1fr_1fr] gap-8 border-b-2 border-foreground pb-3 md:grid">
                <span />
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">Promotional SMS</span>
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Transactional SMS</span>
              </div>
              {TYPES.map((r) => (
                <div key={r.k} className="grid gap-1 border-b border-border py-4 md:grid-cols-[170px_1fr_1fr] md:gap-8 md:py-5">
                  <p className="font-semibold tracking-tight">{r.k}</p>
                  <p className="leading-relaxed text-foreground"><span className="mr-2 font-mono text-[10px] uppercase tracking-widest text-primary md:hidden">Promo</span>{r.p}</p>
                  <p className="leading-relaxed text-muted-foreground"><span className="mr-2 font-mono text-[10px] uppercase tracking-widest md:hidden">Transactional</span>{r.t}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5 · AUDIENCE: the list narrowing to the right people */}
        <section className="bg-background py-20 lg:py-28">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <p className={`${EYEBROW} text-primary`}>SMS marketing campaigns India</p>
              <h2 className={`${H2} mt-5`}>Send to the right people, not to everyone.</h2>
              <p className="mt-4 text-[16px] leading-relaxed text-muted-foreground">Bulk SMS in India does not have to mean blasting a list. Narrow it first, then personalise.</p>
            </div>
            <div className="mt-12 space-y-3">
              {NARROW.map((n, i) => (
                <div key={n.t} className="grid items-center gap-x-6 gap-y-1 md:grid-cols-[1fr_1.6fr]">
                  <div className="md:text-right">
                    <p className="text-[17px] font-semibold tracking-tight">{n.t}</p>
                    <p className="text-[13.5px] leading-snug text-muted-foreground">{n.d}</p>
                  </div>
                  <div className="flex h-12 items-center">
                    <span className="flex h-full items-center rounded-r-full bg-primary pl-5 font-mono text-[12px] font-semibold text-primary-foreground" style={{ width: `${n.w}%`, opacity: 1 - i * 0.12 }}>{i + 1}</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-8 max-w-xl text-[14.5px] leading-relaxed text-muted-foreground">Bar widths are only a sketch of how a list narrows. SMS opt-out handling is applied by default, so suppressed numbers never reach a campaign.</p>
          </div>
        </section>

        {/* 6 · REPORTS: five columns, each defined */}
        <section className="bg-secondary py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <p className={`${EYEBROW} text-primary`}>SMS delivery reports</p>
              <h2 className={`${H2} mt-5`}>Know exactly what landed, and what came back.</h2>
            </div>
            <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
              {REPORT.map((r) => (
                <div key={r.t} className="border-t-[3px] pt-4" style={{ borderColor: r.c }}>
                  <p className="text-[20px] font-semibold tracking-tight">{r.t}</p>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">{r.d}</p>
                </div>
              ))}
            </div>
            <p className="mt-10 max-w-xl text-[15px] leading-relaxed text-muted-foreground">Every campaign gets its own report, with delivery receipts per recipient, so there is no guessing after the send.</p>
          </div>
        </section>

        {/* 7 · PAIR IT WITH OTHER CHANNELS */}
        <section className="bg-background py-20 lg:py-28">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className={`${EYEBROW} text-primary`}>Beyond SMS</p>
              <h2 className={`${H2} mt-5`}>One platform for the send and everything after it.</h2>
              <p className="mt-4 max-w-sm text-[16px] leading-relaxed text-muted-foreground">SMS shares one customer record with WhatsApp, RCS and voice, so a campaign reply and a support call are never two tickets in two tools.</p>
            </div>
            <ul className="divide-y divide-border border-y border-border">
              {LINKS.map((l) => (
                <li key={l.h}>
                  <Link href={l.h} className="group flex items-center justify-between gap-6 py-5">
                    <span>
                      <span className="block text-[18px] font-semibold transition group-hover:text-primary">{l.t}</span>
                      <span className="mt-0.5 block text-[14.5px] text-muted-foreground">{l.d}</span>
                    </span>
                    <ArrowRight className="h-5 w-5 flex-none text-muted-foreground transition group-hover:translate-x-1 group-hover:text-primary" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 8 · FAQ (shared with the home page) */}
        <FaqJsonLd items={FAQS} path="/channels/sms-broadcasting" />
        <FaqSection items={FAQS} />

        <div className="border-y border-border bg-secondary/60 py-6">
          <p className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-8 gap-y-2 px-4 text-[14px] sm:px-6">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Explore more</span>
            {[
              { href: "/products/bulk-sms/", label: "Bulk SMS" },
              { href: "/platform/", label: "Platform overview" },
              { href: "/products/ai-agents/", label: "AI agents for WhatsApp" },
              { href: "/compare/", label: "Compare SMSLocal" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="font-medium text-foreground underline decoration-border underline-offset-4 transition hover:text-primary hover:decoration-primary">{l.label}</Link>
            ))}
          </p>
        </div>

        <ProductFinalCta
          title="Broadcast SMS and let AI handle the replies."
          subtitle="Segment your list, personalise the send and let agentic AI carry every reply into a real conversation."
          primaryCta={{ label: "Start Broadcasting", href: "/company/contact/" }}
          secondaryCta={{ label: "Get a Demo", href: "/company/contact/" }}
        />
      </main>
      <SiteFooter />

      <style>{`
        @keyframes sm-rise { from { opacity: 0; transform: translateY(26px) } to { opacity: 1; transform: none } }
        .sm-rise { animation: sm-rise .9s cubic-bezier(.2,.7,.2,1) both }
        @media (prefers-reduced-motion: reduce) { .sm-rise { animation: none } }
      `}</style>
    </>
  )
}
