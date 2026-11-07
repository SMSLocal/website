import type { Metadata } from "next"
import Link from "next/link"
import { getPageMetadata } from "@/lib/seo"
import { ArrowRight, Check, MessageSquare, X } from "lucide-react"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { FaqSection } from "@/components/landing/faq-section"
import { BreadcrumbJsonLd, FaqJsonLd, ProductServiceJsonLd } from "@/components/seo/json-ld"
import { ProductFinalCta } from "@/components/product/product-page"
import { SmsWave } from "@/components/product/sms-wave"

export const metadata: Metadata = getPageMetadata("/channels/sms-broadcasting")

/* ─── DATA ────────────────────────────────────────────────────────────────── */

/* what happens to a reply */
const CHAINS = [
  { who: "Most broadcast tools", ok: false, steps: ["Send", "Delivered", "Customer replies"], end: "Nobody is listening" },
  { who: "SMSLocal", ok: true, steps: ["Send", "Delivered", "Customer replies", "AI answers"], end: "A person takes over only when needed" },
]

/* the parts of one SMS */
const PARTS = [
  { n: 1, t: "Sender ID", d: "Your registered sender ID, set up under DLT, so people see your brand and not a number." },
  { n: 2, t: "Merge field", d: "Each message carries the recipient's own name, order number or any column from your list." },
  { n: 3, t: "Tracked link", d: "A short link with click tracking, so every campaign shows who tapped what." },
  { n: 4, t: "Opt-out line", d: "STOP and HELP are handled for you, and anyone who opts out lands on the suppression list." },
]

/* two kinds of SMS, written like dictionary entries */
const KINDS = [
  { term: "Promotional SMS", say: "pro·mo·tion·al", pos: "noun", def: "A message that markets an offer, a sale or a new product. It goes only to contacts who agreed to hear from you, follows TRAI rules on opt-outs and sending hours, and always carries a way to stop.", eg: "“Hi Rahul, your Diwali offer ends Sunday.”" },
  { term: "Transactional SMS", say: "trans·ac·tion·al", pos: "noun", def: "A message a customer expects because of something they just did, such as a one-time password, an order update or a payment alert. It is about their transaction and not about selling.", eg: "“Your order #4821 is out for delivery.”" },
]

/* a reply, written like a script */
const SCRIPT = [
  { who: "Campaign", say: "Hi Rahul, your Diwali offer ends Sunday. Shop now: smsl.in/d4x9" },
  { who: "Rahul", say: "Is this offer valid at the Koramangala store too?" },
  { who: "AI agent", say: "Yes! It is valid at every store till Sunday, 9 PM." },
  { who: "Rahul", say: "Can I speak to someone about a bulk order?" },
  { who: "Team", say: "Hi Rahul, this is Meera from the sales team. How many pieces do you need?", note: "A person takes over, with the whole thread in front of them." },
]

/* a campaign report (example numbers) */
const REPORT = { total: 48210, delivered: 47890, clicked: 9412, replied: 1306 }

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
const LINK = "font-semibold text-primary underline decoration-primary/40 decoration-2 underline-offset-[5px] transition hover:decoration-primary"
const pct = (n: number) => ((n / REPORT.total) * 100).toFixed(1)

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

        {/* 1 · HERO: one template, and a stream of personal messages leaving it */}
        <section className="relative isolate overflow-hidden bg-background">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute right-[-120px] top-[-60px] h-[520px] w-[520px] rounded-full bg-primary/7 blur-[130px]" />
            <div className="absolute inset-0 opacity-50 [background-image:radial-gradient(var(--border)_1.2px,transparent_1.2px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_at_72%_48%,black_10%,transparent_70%)]" />
          </div>
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-14 pt-14 sm:px-6 lg:grid-cols-[1fr_540px] lg:gap-8 lg:pb-20 lg:pt-12">
            <div className="sm-rise">
              <p className="inline-flex items-center gap-2 rounded-full bg-foreground px-3.5 py-1.5 text-[12.5px] font-medium text-background">
                <MessageSquare className="h-3.5 w-3.5 text-accent" />SMS broadcasting
              </p>
              <h1 className="mt-6 text-balance text-[30px] font-semibold leading-[1.1] tracking-[-0.035em] sm:text-[42px]">
                Bulk SMS broadcasting that <span className="text-primary">answers every reply.</span>
              </h1>
              <p className="mt-5 max-w-lg text-pretty text-[17px] leading-relaxed text-muted-foreground">
                Send A2P SMS campaigns across India with DLT support, then let agentic AI answer the replies.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link href="/company/contact/" className={BTN}>Start broadcasting <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" /></Link>
                <Link href="/company/contact/" className={BTN_OUT}>Get a demo</Link>
              </div>
            </div>
            <div className="sm-rise relative" style={{ animationDelay: "0.15s" }}>
              <SmsWave />
            </div>
          </div>
        </section>

        {/* 2 · WHY SMS: two short chains, one stops at the reply */}
        <section className="bg-secondary py-20 lg:py-28">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <p className={`${EYEBROW} text-primary`}>Why most SMS tools fall short</p>
              <h2 className={`${H2} mt-5`}>SMS reaches every phone. Most tools only send.</h2>
              <p className="mt-4 max-w-lg text-[16px] leading-relaxed text-muted-foreground">There is no app to install and no internet needed, so SMS gets through when nothing else does. The weak point is what happens after the customer writes back.</p>
            </div>
            <div className="mt-12 space-y-10">
              {CHAINS.map((c) => (
                <div key={c.who}>
                  <p className={`font-mono text-[11px] uppercase tracking-[0.2em] ${c.ok ? "text-primary" : "text-muted-foreground"}`}>{c.who}</p>
                  <ol className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-3 text-[16px] sm:text-[18px]">
                    {c.steps.map((s, i) => (
                      <li key={s} className="flex items-center gap-3">
                        <span className={c.ok ? "font-medium" : "text-muted-foreground"}>{s}</span>
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      </li>
                    ))}
                    <li className={`flex items-center gap-2 font-semibold ${c.ok ? "text-primary" : "text-foreground/70"}`}>
                      {c.ok ? <Check className="h-4 w-4" strokeWidth={3} /> : <X className="h-4 w-4" strokeWidth={3} />}{c.end}
                    </li>
                  </ol>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3 · ONE MESSAGE, TAKEN APART: an SMS with four numbered parts */}
        <section className="bg-background py-20 lg:py-28">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
            <div>
              <p className={`${EYEBROW} text-primary`}>What goes into every send</p>
              <h2 className={`${H2} mt-5`}>One bulk SMS campaign, four parts that matter.</h2>
              <p className="mt-8 text-[24px] font-medium leading-[1.5] tracking-[-0.01em] sm:text-[30px]">
                <span className="underline decoration-primary decoration-[3px] underline-offset-[6px]">AD-SMSLCL<sup className="ml-0.5 text-[13px] font-bold text-primary">1</sup></span>: Hi{" "}
                <span className="underline decoration-primary decoration-[3px] underline-offset-[6px]">Rahul<sup className="ml-0.5 text-[13px] font-bold text-primary">2</sup></span>, your Diwali offer ends Sunday. Shop now:{" "}
                <span className="underline decoration-primary decoration-[3px] underline-offset-[6px]">smsl.in/d4x9<sup className="ml-0.5 text-[13px] font-bold text-primary">3</sup></span>{" "}
                <span className="underline decoration-primary decoration-[3px] underline-offset-[6px]">Reply STOP to opt out<sup className="ml-0.5 text-[13px] font-bold text-primary">4</sup></span>
              </p>
              <p className="mt-6 max-w-lg text-[14.5px] leading-relaxed text-muted-foreground">Each message is matched to your registered DLT template before it leaves, so what customers read is what you approved.</p>
            </div>
            <ol className="space-y-6">
              {PARTS.map((p) => (
                <li key={p.n} className="flex gap-4">
                  <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-primary text-[14px] font-bold text-primary-foreground">{p.n}</span>
                  <div>
                    <p className="text-[18px] font-semibold tracking-[-0.01em]">{p.t}</p>
                    <p className="mt-1 text-[15px] leading-relaxed text-muted-foreground">{p.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 4 · PROMOTIONAL AND TRANSACTIONAL: dictionary entries */}
        <section className="bg-secondary py-20 lg:py-28">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <p className={`${EYEBROW} text-primary`}>Know your message type</p>
            <h2 className={`${H2} mt-5`}>Two kinds of SMS, two sets of rules.</h2>
            <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-16">
              {KINDS.map((k) => (
                <article key={k.term} className="border-t-2 border-foreground pt-5">
                  <h3 className="text-[34px] font-semibold leading-none tracking-[-0.03em]">{k.term}</h3>
                  <p className="mt-3 flex items-baseline gap-3 text-[14px] text-muted-foreground"><span className="font-mono">{k.say}</span><span className="italic">{k.pos}</span></p>
                  <p className="mt-5 text-[16.5px] leading-[1.7]">{k.def}</p>
                  <p className="mt-4 border-l-2 border-primary pl-4 text-[15px] italic text-muted-foreground">{k.eg}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 5 · THE REPLY: a short script, with the hand-over marked */}
        <section className="bg-background py-20 lg:py-28">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <div className="text-center">
              <p className={`${EYEBROW} justify-center text-primary`}>Two-way SMS with agentic AI</p>
              <h2 className={`${H2} mt-5`}>A reply becomes a conversation, not a dead end.</h2>
            </div>
            <div className="mt-14 space-y-7">
              {SCRIPT.map((l, i) => (
                <div key={i} className="text-center">
                  <p className={`font-mono text-[11px] uppercase tracking-[0.24em] ${l.who === "AI agent" ? "text-primary" : "text-muted-foreground"}`}>{l.who}</p>
                  <p className="mx-auto mt-1.5 max-w-xl text-[18px] leading-snug sm:text-[21px]">{l.say}</p>
                  {l.note ? <p className="mt-2 text-[13.5px] italic text-muted-foreground">({l.note})</p> : null}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6 · THE REPORT: one headline sentence and a single bar */}
        <section className="bg-secondary py-20 lg:py-28">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <p className={`${EYEBROW} text-primary`}>SMS delivery reports</p>
            <h2 className={`${H2} mt-5`}>Know exactly what landed.</h2>
            <p className="mt-8 text-balance text-[24px] font-medium leading-[1.35] tracking-[-0.02em] sm:text-[34px]">
              <span className="text-primary">{REPORT.delivered.toLocaleString("en-IN")}</span> of {REPORT.total.toLocaleString("en-IN")} delivered. <span className="text-primary">{REPORT.clicked.toLocaleString("en-IN")}</span> clicked the link. <span className="text-primary">{REPORT.replied.toLocaleString("en-IN")}</span> wrote back.
            </p>
            <div className="mt-10">
              <div className="flex h-3 w-full overflow-hidden rounded-full bg-foreground/10">
                <span className="h-full bg-primary" style={{ width: `${pct(REPORT.delivered)}%` }} />
              </div>
              <div className="mt-3 flex justify-between text-[13px] text-muted-foreground">
                <span>{pct(REPORT.delivered)}% delivered</span>
                <span>{(100 - Number(pct(REPORT.delivered))).toFixed(1)}% not delivered</span>
              </div>
            </div>
            <p className="mt-8 max-w-xl text-[15px] leading-relaxed text-muted-foreground">Every campaign gets its own report, with delivery receipts per recipient. Example numbers, shown to illustrate the report.</p>
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
              {[
                { h: "/channels/whatsapp-broadcasting/", t: "WhatsApp broadcasting", d: "Rich campaigns with templates and replies in the same inbox." },
                { h: "/channels/rcs-broadcasting/", t: "RCS broadcasting", d: "Rich cards and buttons, with SMS as the fallback." },
                { h: "/products/omnichannel-inbox/", t: "Omnichannel inbox", d: "Where every reply lands, routed and timed." },
                { h: "/developers/sms-api/", t: "SMS API", d: "Send transactional messages and trigger campaigns from your app." },
                { h: "/numbers/did/", t: "DID and virtual numbers", d: "Numbers managed in the platform, next to your campaigns." },
              ].map((l) => (
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
