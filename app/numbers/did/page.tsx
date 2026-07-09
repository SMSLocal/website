import type { Metadata } from "next"
import Link from "next/link"
import { getPageMetadata } from "@/lib/seo"
import {
  ArrowRight,
  MapPin,
  PhoneCall,
  PhoneForwarded,
  Router,
  Sparkles,
  Zap,
  Phone,
  Network,
} from "lucide-react"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { FaqSection } from "@/components/landing/faq-section"
import { BreadcrumbJsonLd, ProductServiceJsonLd } from "@/components/seo/json-ld"
import {
  CapabilityGrid,
  ProductFinalCta,
  ProductHero,
  Section,
  SectionHeader,
  StatsBand,
} from "@/components/product/product-page"

export const metadata: Metadata = getPageMetadata("/numbers/did")

/* ── Hero visual ──────────────────────────────────────────────────────────── */
function DidNumbersVisual() {
  const numbers = [
    { city: "Mumbai", number: "+91 22 6xxx xxxx", tag: "Local" },
    { city: "Bengaluru", number: "+91 80 6xxx xxxx", tag: "Local" },
    { city: "Toll-free", number: "1800 xxx xxxx", tag: "Toll-free" },
  ]

  return (
    <div className="flex h-full min-h-[360px] flex-col gap-3 lg:pl-4">
      <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-md">
        <div className="flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5 text-primary" />
          <span className="text-[10.5px] font-semibold uppercase tracking-widest text-primary">
            Number inventory
          </span>
        </div>
        <p className="mt-1.5 text-[13px] leading-relaxed text-white/85">
          Local, toll-free, and short code numbers, provisioned through our platform team.
        </p>
      </div>

      {numbers.map((n) => (
        <div
          key={n.number}
          className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 backdrop-blur-md"
        >
          <div className="flex items-center gap-3">
            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <Phone className="h-4 w-4" />
            </span>
            <div>
              <p className="text-[13px] font-semibold text-white">{n.city}</p>
              <p className="font-mono text-[12px] text-white/60">{n.number}</p>
            </div>
          </div>
          <span className="inline-flex items-center rounded-full border border-white/15 bg-white/8 px-2.5 py-0.5 text-[11px] font-medium text-white/75">
            {n.tag}
          </span>
        </div>
      ))}

      <div className="flex items-center gap-2 rounded-xl border border-blue-500/20 bg-blue-500/10 px-4 py-2.5">
        <Zap className="h-4 w-4 shrink-0 text-blue-400" />
        <span className="text-[12.5px] font-medium text-blue-300">
          Registration and activation guided by our team, start to finish
        </span>
      </div>
    </div>
  )
}

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
      <SiteHeader />
      <main>

        {/* ── HERO ──────────────────────────────────────────────── */}
        <ProductHero
          compact
          eyebrow="Numbers · DID"
          title={
            <>
              DID and Virtual Numbers,
              <br className="hidden sm:block" /> Managed In-Platform
            </>
          }
          subtitle="Provision local, toll-free, and short code numbers for voice and messaging, all in one place."
          primaryCta={{ label: "Get a Demo", href: "/company/contact/" }}
          secondaryCta={{ label: "Talk to Sales", href: "/company/contact/" }}
          trustBar={[
            { icon: MapPin, label: "Local, toll-free & short codes" },
            { icon: PhoneCall, label: "Numbers for voice and SMS" },
            { icon: Zap, label: "DLT and sender-ID registration" },
            { icon: Router, label: "Fraud and spam protection" },
          ]}
          visual={<DidNumbersVisual />}
        />

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

        {/* ── THE PROBLEM ───────────────────────────────────────── */}
        <Section tone="muted">
          <div className="mx-auto max-w-3xl">
            <SectionHeader
              eyebrow="The problem"
              title="Most AI platforms make you bring your own numbers"
            />
            <p className="mt-5 text-pretty text-[15px] leading-relaxed text-muted-foreground">
              Most AI platforms make you bring numbers from a separate carrier, adding a vendor and
              a handoff. SMSLocal provisions the numbers your agent and campaigns use, in the same
              product — no separate carrier relationship to manage.
            </p>
          </div>
        </Section>

        {/* ── WHAT YOU GET ──────────────────────────────────────── */}
        <CapabilityGrid
          eyebrow="What you get"
          title="Numbers that fit how your business actually calls and messages"
          subtitle="Provision the number type you need — local, toll-free, or short code — and route it into your existing calling stack or ours."
          items={[
            {
              icon: MapPin,
              title: "The numbers you need",
              body: "Local DID, toll-free, and short code numbers for every use case — a city-matching number for local calls, a toll-free line for support, or a short code for high-volume messaging.",
            },
            {
              icon: PhoneCall,
              title: "For voice and messaging",
              body: "One number set powers calling, SMS, and broadcasting — no separate number inventory to manage per channel.",
            },
            {
              icon: PhoneForwarded,
              title: "Registration handled",
              body: "DLT and sender-ID registration workflows are guided in the platform through our team, so you're not left to navigate carrier paperwork alone.",
            },
            {
              icon: Network,
              title: "Protection built in",
              body: "Number lookup plus fraud and spam protection, so the numbers you provision stay trusted and deliverable.",
            },
          ]}
        />

        {/* ── WHY IT WORKS ──────────────────────────────────────── */}
        <Section tone="muted">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16 lg:items-center">
            <div>
              <SectionHeader
                eyebrow="Why it works"
                title="Numbers, messaging, voice, and AI live together"
              />
              <p className="mt-5 text-pretty text-[15px] leading-relaxed text-muted-foreground">
                Numbers, messaging, voice, and AI live together, so there is no carrier handoff and
                no separate bill to reconcile. Route a number into our Voice product for IVR and
                broadcast calling, or into Voice AI Agents so it answers with a real conversation.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                { icon: <MapPin className="h-5 w-5" />,          label: "Local trust",       desc: "City-matching numbers lift pickup rates on outbound calls" },
                { icon: <Zap className="h-5 w-5" />,              label: "Guided activation", desc: "Registration handled by our team — no carrier paperwork on your own" },
                { icon: <Router className="h-5 w-5" />,           label: "Keep your PBX",      desc: "SIP trunking works with the calling stack you already run" },
                { icon: <PhoneForwarded className="h-5 w-5" />,   label: "Port without downtime", desc: "Move your existing number over without losing calls" },
              ].map((item) => (
                <div key={item.label} className="rounded-xl border border-border bg-card p-4 shadow-sm">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {item.icon}
                  </span>
                  <h3 className="mt-3 text-[14px] font-semibold text-foreground">{item.label}</h3>
                  <p className="mt-1 text-[13px] leading-snug text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── WHY SMSLOCAL ──────────────────────────────────────── */}
        <Section tone="dark">
          <div className="mx-auto max-w-3xl">
            <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-white/85">
              Why SMSLocal
            </span>
            <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              The carrier layer some AI-only vendors leave out
            </h2>
            <p className="mt-5 text-pretty text-[15px] leading-relaxed text-white/70">
              This is the carrier layer some AI-only vendors leave out, included in the same
              platform as your agentic AI and broadcasting. Point a number at our Voice product for
              classic IVR menus and broadcast, or at Voice AI Agents so it answers with a real
              conversation and escalates to a human only when it needs to.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/products/voice/"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/15"
              >
                Voice — IVR & broadcast
              </Link>
              <Link
                href="/voice-ai-agents/"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/15"
              >
                Voice AI Agents
              </Link>
            </div>
          </div>
        </Section>

        {/* ── FAQ ───────────────────────────────────────────────── */}
        <FaqSection
          items={[
            {
              q: "What number types are available?",
              a: "Local, toll-free, and short codes — covering local presence calling, national support lines, and high-volume messaging use cases.",
            },
            {
              q: "Do you handle DLT?",
              a: "Yes, with guided registration. DLT and sender-ID registration workflows are handled through our team so you're not navigating carrier paperwork alone.",
            },
            {
              q: "Can numbers do voice and SMS?",
              a: "Yes, one set serves both — the same number set powers calling, SMS, and broadcasting, so you don't manage a separate inventory per channel.",
            },
          ]}
        />

        {/* ── INTERNAL LINKS ────────────────────────────────────── */}
        <Section tone="muted">
          <div className="mx-auto max-w-3xl">
            <SectionHeader eyebrow="Explore more" title="Related resources" />
            <ul className="mt-6 space-y-3">
              {[
                { href: "/products/voice/",       label: "Voice — IVR, OTP calls, and voice broadcast" },
                { href: "/products/bulk-sms/",    label: "Bulk SMS — send at scale on registered numbers" },
                { href: "/platform/security/",    label: "Platform security — controls behind every number" },
                { href: "/compare/",              label: "Compare SMSLocal with alternatives" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-2 text-[14px] font-medium text-primary hover:underline"
                  >
                    {link.label} <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Section>

        {/* ── FINAL CTA ─────────────────────────────────────────── */}
        <ProductFinalCta
          title="Get the numbers your agentic AI runs on."
          subtitle="Local, toll-free, and short code numbers for voice and messaging, with DLT and sender-ID registration guided by our team — all in one platform."
          primaryCta={{ label: "Get a Demo", href: "/company/contact/" }}
          secondaryCta={{ label: "Talk to Sales", href: "/company/contact/" }}
        />
      </main>
      <SiteFooter />
    </>
  )
}
