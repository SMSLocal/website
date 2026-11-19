import type { Metadata } from "next"
import Link from "next/link"
import { getPageMetadata } from "@/lib/seo"
import { ArrowRight, MapPin, PhoneCall, Router, Sparkles, Zap, Check } from "lucide-react"
import { SiteHeader } from "@/components/landing/site-header"
import { ExploreMore } from "@/components/product/explore-more"
import { GsFinalCta } from "@/components/home/gs/sections-c"
import { SiteFooter } from "@/components/landing/site-footer"
import { FaqSection } from "@/components/landing/faq-section"
import { BreadcrumbJsonLd, FaqJsonLd, ProductServiceJsonLd } from "@/components/seo/json-ld"
import { DidNumberHero } from "@/components/product/did-number-hero"

export const metadata: Metadata = getPageMetadata("/numbers/did")

const BTN = "group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-primary to-[oklch(0.55_0.13_172)] px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:shadow-xl hover:shadow-primary/30"
const BTN_OUT = "inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3.5 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"
const EYEBROW = "inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em]"
const H2 = "text-balance text-[28px] font-semibold leading-[1.08] tracking-[-0.035em] sm:text-[38px]"

const TRUST = [
  { icon: MapPin, label: "Local, toll-free & short codes" },
  { icon: PhoneCall, label: "Numbers for voice and SMS" },
  { icon: Zap, label: "DLT and sender-ID registration" },
  { icon: Router, label: "Fraud and spam protection" },
]

const KINDS = [
  { big: "011 · 022 · 080", t: "City numbers", d: "City-wise virtual numbers that give you a local business phone number wherever your customers are. Use them for outbound calls and for SMS that looks familiar.", best: "Sales teams, delivery updates, local presence" },
  { big: "1800", t: "Toll-free numbers", d: "A toll free number India-wide, free for callers. Calls ring in your support inbox or are answered first by a Voice AI agent.", best: "Customer support, helplines, order queries" },
  { big: "5xxxx", t: "Short codes", d: "Short numbers for high-volume messaging, registered for you so campaigns and alerts leave from an approved sender.", best: "Broadcasts, alerts, two-way campaigns" },
]

const STEPS = [
  { t: "Tell us what you need", d: "Pick the cities, a toll-free line or a short code. Share your business details once." },
  { t: "We register it", d: "Our team files the DLT sender ID registration and sets up the number for you." },
  { t: "Bring your own, if you like", d: "Port an existing number over, or connect your PBX with SIP trunking." },
  { t: "Make the first call and send the first SMS", d: "The same number carries voice and messaging from day one." },
]

const BOARD = [
  { n: "1800 xxx xxxx", k: "Toll-free", r: "Support inbox", s: "Live" },
  { n: "+91 22 4xxx xx10", k: "City number", r: "Sales team", s: "Live" },
  { n: "+91 80 4xxx xx20", k: "City number", r: "Voice AI agent", s: "Live" },
  { n: "5xxxx", k: "Short code", r: "Broadcast sender", s: "Registered" },
  { n: "Your PBX line", k: "SIP trunk", r: "Your own PBX", s: "Connected" },
]

const FAQ = [
  {
    q: "What number types are available?",
    a: "Local, toll-free and short codes, covering local presence calling, national support lines and high-volume messaging use cases.",
  },
  {
    q: "Do you handle DLT and sender-ID registration?",
    a: "Yes, with guided registration. DLT and sender-ID registration workflows are handled through our team so you're not navigating carrier paperwork alone.",
  },
  {
    q: "Can one number do both voice and SMS?",
    a: "Yes. One number set serves both, so the same numbers power calling, SMS and broadcasting and you don't manage a separate inventory per channel.",
  },
  {
    q: "Can I keep my existing business number?",
    a: "Yes. You can port your existing number over without losing calls, so customers keep dialling the same line.",
  },
  {
    q: "Does it work with my existing PBX or phone system?",
    a: "Yes. SIP trunking works with the calling stack you already run, or you can route the number into SMSLocal Voice or Voice AI Agents.",
  },
  {
    q: "Which number type should I choose?",
    a: "Use a local number for city-matching outbound and local calls, a toll-free line for support, and a short code for high-volume messaging. The same platform handles all three.",
  },
]

const EXPLORE = [
  { href: "/products/voice/", label: "Business voice calling", hint: "Calls inside your support inbox" },
  { href: "/products/rcs/", label: "RCS business messaging", hint: "Verified, branded rich cards" },
  { href: "/products/integrations/", label: "Integrations and API", hint: "Shopify, HubSpot, REST API and more" },
  { href: "/channels/whatsapp/", label: "WhatsApp Business API", hint: "Official API, templates and AI replies" },
]

const CSS = `
@keyframes did-rise { from { opacity: 0; transform: translateY(26px) } to { opacity: 1; transform: none } }
.did-rise { animation: did-rise .9s cubic-bezier(.2,.7,.2,1) both }
@keyframes did-pulse { 0%, 100% { opacity: 1 } 50% { opacity: .3 } }
.did-pulse { animation: did-pulse 2.4s ease-in-out infinite }
@keyframes did-old { 0%, 42% { opacity: 1 } 50%, 92% { opacity: 0 } 100% { opacity: 1 } }
@keyframes did-new { 0%, 42% { opacity: 0 } 50%, 92% { opacity: 1 } 100% { opacity: 0 } }
.did-old { animation: did-old 8s ease-in-out infinite }
.did-new { opacity: 0; animation: did-new 8s ease-in-out infinite }
@media (prefers-reduced-motion: reduce) { .did-rise, .did-pulse, .did-old { animation: none } .did-new { animation: none; opacity: 1 } .did-old { opacity: 0 } }
`

export default function DidNumbersPage() {
  return (
    <>
      <ProductServiceJsonLd
        name="SMSLocal DID Numbers"
        description="Local, toll-free, and short code DID virtual phone numbers for voice and SMS, with DLT and sender-ID registration guided by our team, fraud and spam protection, and SIP trunking — all managed in one platform."
        path="/numbers/did"
        category="Virtual Phone Numbers (DID)"
      />
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Numbers", path: "/numbers/did" },
          { name: "DID Numbers", path: "/numbers/did" },
        ]}
      />
      <FaqJsonLd items={FAQ} path="/numbers/did" />
      <SiteHeader />
      <main>

        {/* 1 · HERO */}
        <section className="relative isolate overflow-hidden bg-background">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-14 pt-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_560px] lg:gap-12 lg:pb-20 lg:pt-12">
            <div className="did-rise min-w-0">
              <p className="inline-flex items-center gap-2 rounded-full bg-foreground px-3.5 py-1.5 text-[12.5px] font-medium text-background">
                <Sparkles className="h-3.5 w-3.5 text-accent" />Numbers · DID
              </p>
              <h1 className="mt-6 text-balance text-[30px] font-semibold leading-[1.1] tracking-[-0.035em] sm:text-[42px]">
                DID and virtual numbers, <span className="text-primary">managed in one platform</span>
              </h1>
              <p className="mt-5 max-w-lg text-pretty text-[17px] leading-relaxed text-muted-foreground">
                Get DID virtual numbers in India: local, toll-free and short codes for voice and messaging. DLT sender ID registration is guided by our team, with fraud and spam protection built in.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link href="/company/contact/" className={BTN}>Get a Demo <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" /></Link>
                <Link href="/company/contact/" className={BTN_OUT}>Talk to Sales</Link>
              </div>
              <ul className="mt-8 grid max-w-lg grid-cols-1 gap-x-8 gap-y-3 text-[14px] text-muted-foreground sm:grid-cols-2">
                {TRUST.map((t) => (
                  <li key={t.label} className="flex items-start gap-2.5 leading-snug"><t.icon className="mt-[1px] h-4 w-4 shrink-0 text-primary" /><span>{t.label}</span></li>
                ))}
              </ul>
            </div>
            <div className="did-rise min-w-0" style={{ animationDelay: "0.15s" }}>
              <DidNumberHero />
            </div>
          </div>
        </section>

        {/* 2 · THREE KINDS OF NUMBER: giant prefixes in three columns split by hairlines */}
        <section className="bg-secondary py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <p className={`${EYEBROW} text-primary`}>DID numbers India</p>
              <h2 className={`${H2} mt-5`}>Three kinds of number, one platform.</h2>
              <p className="mt-4 text-[16px] leading-relaxed text-muted-foreground">A DID (direct inward dialling) number is a virtual phone number that rings in software instead of on a SIM. Choose the kind that fits the job.</p>
            </div>
            <div className="mt-14 grid gap-12 md:grid-cols-3 md:gap-0">
              {KINDS.map((k, i) => (
                <div key={k.t} className={`md:px-8 ${i === 0 ? "md:pl-0" : "md:border-l md:border-border"} ${i === 2 ? "md:pr-0" : ""}`}>
                  <p className="font-mono text-[34px] font-semibold leading-none tracking-[-0.05em] text-primary sm:text-[40px]">{k.big}</p>
                  <p className="mt-5 text-[21px] font-semibold tracking-tight">{k.t}</p>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground">{k.d}</p>
                  <p className="mt-4 text-[13px] font-medium text-foreground"><span className="text-muted-foreground">Best for </span>{k.best}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3 · REQUEST TO DIAL TONE: a horizontal line with steps staggered above and below it */}
        <section className="bg-background py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <p className={`${EYEBROW} text-primary`}>DLT sender ID registration</p>
              <h2 className={`${H2} mt-5`}>From request to dial tone.</h2>
              <p className="mt-4 text-[16px] leading-relaxed text-muted-foreground">The paperwork is ours. You choose the number and we take it to a working line.</p>
            </div>
            {/* phones: a vertical list */}
            <ol className="mt-12 space-y-7 border-l-2 border-primary/30 pl-6 lg:hidden">
              {STEPS.map((s, i) => (
                <li key={s.t} className="relative">
                  <span className="absolute -left-[33px] top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary font-mono text-[10px] font-semibold text-primary-foreground">{i + 1}</span>
                  <p className="text-[17px] font-semibold tracking-tight">{s.t}</p>
                  <p className="mt-1 text-[14.5px] leading-relaxed text-muted-foreground">{s.d}</p>
                </li>
              ))}
            </ol>
            {/* desktop: staggered along a line */}
            <ol className="relative mt-16 hidden grid-cols-4 gap-x-6 lg:grid" style={{ gridTemplateRows: "auto 40px auto" }}>
              {STEPS.map((s, i) => (
                <li key={s.t} className="contents">
                  <div className="flex flex-col justify-end pb-3" style={{ gridColumn: i + 1, gridRow: 1 }}>
                    {i % 2 === 0 && (<><p className="text-[18px] font-semibold tracking-tight">{s.t}</p><p className="mt-1.5 text-[14px] leading-relaxed text-muted-foreground">{s.d}</p></>)}
                  </div>
                  <div className="relative flex items-center" style={{ gridColumn: i + 1, gridRow: 2 }}>
                    <i aria-hidden className="absolute top-1/2 h-0.5 -translate-y-1/2 bg-primary/30" style={{ left: i === 0 ? 16 : -12, right: i === 3 ? "auto" : -12, width: i === 3 ? "calc(0% + 28px)" : undefined }} />
                    <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-primary font-mono text-[12px] font-semibold text-primary-foreground ring-4 ring-background">{i + 1}</span>
                  </div>
                  <div className="pt-3" style={{ gridColumn: i + 1, gridRow: 3 }}>
                    {i % 2 === 1 && (<><p className="text-[18px] font-semibold tracking-tight">{s.t}</p><p className="mt-1.5 text-[14px] leading-relaxed text-muted-foreground">{s.d}</p></>)}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 4 · WHERE THE NUMBER RINGS: a departures board */}
        <section className="bg-[#0f2a47] py-20 text-white lg:py-28">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <p className={`${EYEBROW} text-[#9ee6c8]`}>Toll free number India</p>
              <h2 className={`${H2} mt-5`}>Every number knows where it rings.</h2>
              <p className="mt-4 text-[16px] leading-relaxed text-white/70">Point a number at your support inbox, a sales team, a Voice AI agent or your own PBX through SIP trunking in India. Change it any time.</p>
            </div>
            <div className="mt-12 font-mono text-[13px] sm:text-[14px]">
              <div className="hidden grid-cols-[1.3fr_1fr_1.2fr_.8fr] gap-4 border-b border-white/25 pb-3 text-[11px] uppercase tracking-[0.2em] text-white/50 md:grid">
                <span>Number</span><span>Type</span><span>Rings at</span><span>Status</span>
              </div>
              {BOARD.map((b) => (
                <div key={b.n} className="grid grid-cols-2 gap-x-4 gap-y-1 border-b border-white/10 py-4 md:grid-cols-[1.3fr_1fr_1.2fr_.8fr] md:items-center">
                  <span className="col-span-2 text-[16px] font-semibold text-white md:col-span-1">{b.n}</span>
                  <span className="text-white/60">{b.k}</span>
                  <span className="text-[#9ee6c8]">{b.r}</span>
                  <span className="col-span-2 flex items-center gap-2 text-white/80 md:col-span-1"><i className="did-pulse h-2 w-2 rounded-full bg-[#34d399]" />{b.s}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5 · KEEP YOUR NUMBER: one giant number, only the carrier label changes */}
        <section className="bg-background py-20 lg:py-28">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <p className={`${EYEBROW} justify-center text-primary`}>Virtual phone number India</p>
            <h2 className={`${H2} mt-5`}>Keep the number your customers already know.</h2>
            <p className="mt-10 font-mono text-[34px] font-semibold tracking-[-0.05em] sm:text-[64px]">+91 98xxx xxx10</p>
            <div className="relative mx-auto mt-5 h-9 w-64">
              <span className="did-old absolute inset-0 flex items-center justify-center gap-2 text-[15px] text-muted-foreground">Today it rings on <b className="rounded-full border border-border px-3 py-1 font-semibold text-foreground">Your old carrier</b></span>
              <span className="did-new absolute inset-0 flex items-center justify-center gap-2 text-[15px] text-muted-foreground">Now it rings on <b className="rounded-full bg-primary px-3 py-1 font-semibold text-primary-foreground">SMSLocal</b></span>
            </div>
            <p className="mx-auto mt-8 max-w-xl text-[16px] leading-relaxed text-muted-foreground">Port your existing local business phone number to SMSLocal. Calls keep coming through while we move it, and you gain SMS and voice on one line.</p>
            <ul className="mx-auto mt-8 flex max-w-2xl flex-wrap justify-center gap-x-8 gap-y-3 text-[14.5px] font-medium">
              {["No missed calls", "Same number on every card and website", "We file the paperwork"].map((x) => (
                <li key={x} className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />{x}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* 6 · PROTECTED: an editorial paragraph with footnotes */}
        <section className="bg-secondary py-20 lg:py-28">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.25fr_1fr] lg:gap-20">
            <div>
              <p className={`${EYEBROW} text-primary`}>Fraud and spam protection</p>
              <h2 className={`${H2} mt-5`}>Protected before the first call.</h2>
              <p className="mt-8 text-[20px] leading-[1.6] tracking-tight sm:text-[24px]">
                Every number is checked before it carries traffic<sup className="ml-0.5 font-mono text-[12px] text-primary">1</sup>. Calls from known spam sources are flagged before they ring your team<sup className="ml-0.5 font-mono text-[12px] text-primary">2</sup>, and every SMS leaves from a sender ID that has been registered, never borrowed<sup className="ml-0.5 font-mono text-[12px] text-primary">3</sup>.
              </p>
            </div>
            <ol className="space-y-6 self-end border-t-2 border-foreground pt-6 text-[14px] leading-relaxed text-muted-foreground">
              <li><span className="mr-2 font-mono font-semibold text-primary">1</span>Number lookup confirms the number type and whether it can be reached before you dial or send.</li>
              <li><span className="mr-2 font-mono font-semibold text-primary">2</span>Spam and fraud screening runs on inbound calls so agents are not pulled away by robocalls.</li>
              <li><span className="mr-2 font-mono font-semibold text-primary">3</span>Our team files your DLT sender ID registration with your entity details, so messages are not held back.</li>
            </ol>
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
