import type { Metadata } from "next"
import Link from "next/link"
import { getPageMetadata } from "@/lib/seo"
import { ArrowRight, MapPin, PhoneCall, Router, Sparkles, Zap } from "lucide-react"
import { SiteHeader } from "@/components/landing/site-header"
import { ExploreMore } from "@/components/product/explore-more"
import { GsFinalCta } from "@/components/home/gs/sections-c"
import { SiteFooter } from "@/components/landing/site-footer"
import { FaqSection } from "@/components/landing/faq-section"
import { BreadcrumbJsonLd, FaqJsonLd, ProductServiceJsonLd } from "@/components/seo/json-ld"
import { DidHeroConsole } from "@/components/product/did-hero-console"
import { Section, StatsBand } from "@/components/product/product-page"
import { DidCapabilities, DidProblem, DidStyles, DidWhyItWorks, DidWhySmsLocal } from "@/components/product/did-sections"
import { WhatsAppMotion } from "@/components/product/whatsapp-motion"

export const metadata: Metadata = getPageMetadata("/numbers/did")

const BTN = "group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-primary to-[oklch(0.55_0.13_172)] px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:shadow-xl hover:shadow-primary/30"
const BTN_OUT = "inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3.5 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"

const TRUST = [
  { icon: MapPin, label: "Local, toll-free & short codes" },
  { icon: PhoneCall, label: "Numbers for voice and SMS" },
  { icon: Zap, label: "DLT and sender-ID registration" },
  { icon: Router, label: "Fraud and spam protection" },
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

        {/* ── HERO ──────────────────────────────────────────────── */}
        <section className="relative isolate overflow-hidden bg-background">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 opacity-50 [background-image:radial-gradient(var(--border)_1.2px,transparent_1.2px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_at_72%_48%,black_10%,transparent_70%)]" />
          </div>
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-14 pt-14 sm:px-6 lg:grid-cols-[1fr_580px] lg:items-stretch lg:gap-8 lg:pb-20 lg:pt-12">
            <div className="did-rise min-w-0">
              <p className="inline-flex items-center gap-2 rounded-full bg-foreground px-3.5 py-1.5 text-[12.5px] font-medium text-background">
                <Sparkles className="h-3.5 w-3.5 text-accent" />Numbers · DID
              </p>
              <h1 className="mt-6 text-balance text-[30px] font-semibold leading-[1.1] tracking-[-0.035em] sm:text-[42px]">
                DID and Virtual Numbers, <span className="text-primary">Managed In-Platform</span>
              </h1>
              <p className="mt-5 max-w-lg text-pretty text-[17px] leading-relaxed text-muted-foreground">
                Provision local, toll-free, and short code numbers for voice and messaging, all in one place. DLT and sender-ID registration are guided by our team, with fraud and spam protection built in.
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
              <DidHeroConsole />
            </div>
          </div>
          <style>{`
            @keyframes did-rise { from { opacity: 0; transform: translateY(26px) } to { opacity: 1; transform: none } }
            .did-rise { animation: did-rise .9s cubic-bezier(.2,.7,.2,1) both }
            @media (prefers-reduced-motion: reduce) { .did-rise { animation: none } }
          `}</style>
        </section>

        {/* ── TRUST LINE ────────────────────────────────────────── */}
        <div className="border-b border-border bg-muted/30 py-4">
          <p className="text-center text-[13px] font-medium text-muted-foreground">
            The numbers your agentic AI runs on, inside the platform.
          </p>
        </div>

        {/* ── RESULTS STRIP ─────────────────────────────────────── */}
        <Section>
          <StatsBand
            items={[
              { value: "Local", label: "Local, toll-free, and short code numbers" },
              { value: "Voice + SMS", label: "One number set powers calling and messaging" },
              { value: "DLT", label: "DLT and sender-ID registration, guided in-platform" },
              { value: "Protected", label: "Number lookup plus fraud and spam protection" },
            ]}
          />
        </Section>

        <DidProblem />
        <DidCapabilities />
        <DidWhyItWorks />
        <DidWhySmsLocal />
        <FaqSection items={FAQ} />
        <ExploreMore links={EXPLORE} />

        {/* ── FINAL CTA ─────────────────────────────────────────── */}
        <GsFinalCta />
        <DidStyles />
        <WhatsAppMotion />
      </main>
      <SiteFooter />
    </>
  )
}
