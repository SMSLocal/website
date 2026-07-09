import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  Award,
  Bot,
  Building2,
  Gauge,
  Globe2,
  Handshake,
  Languages,
  MessageCircle,
  MessageSquare,
  Newspaper,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
} from "lucide-react"
import { AnnouncementStrip } from "@/components/landing/announcement-strip"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { RelatedContent } from "@/components/shared/related-content"
import { ProductFinalCta, Section, SectionHeader } from "@/components/product/product-page"
import { BreadcrumbJsonLd } from "@/components/seo/json-ld"
import { getPageMetadata } from "@/lib/seo"

// ─── SEO — edit lib/seo/registry.ts or open /dev/seo to preview ──────────────
export const metadata: Metadata = getPageMetadata("/company/about")

const PLACEHOLDER_CHIP =
  "inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-600"

const STATS = [
  { value: "7", label: "Years building for Indian business", icon: Gauge },
  { value: "10+", label: "Indian language scripts supported on SMS", icon: Languages },
  { value: "8", label: "Languages our AI WhatsApp agent speaks", icon: Bot },
  { value: "99.99%", label: "Platform uptime, measured monthly", icon: ShieldCheck },
  { value: "Sub-1s", label: "Typical SMS delivery on Indian operators", icon: Zap },
  { value: "PLACEHOLDER", label: "Active Indian businesses using SMSLocal", icon: Users, isPlaceholder: true },
]

const WHAT_WE_DO = [
  {
    title: "Bulk SMS that respects DLT",
    description:
      "Template governance, DND handling, smart route failover, and transactional priority — in one dashboard.",
    href: "/products/bulk-sms/",
    icon: MessageSquare,
  },
  {
    title: "WhatsApp Business API + AI agents",
    description:
      "Broadcasts, visual chatbot builder, team inbox, and AI agents that reply in 8 Indian languages.",
    href: "/products/whatsapp-business-api/",
    icon: MessageCircle,
  },
  {
    title: "OTP & transactional SMS",
    description:
      "Dedicated priority routes, retry logic, DLT-approved templates, and SDKs in six languages.",
    href: "/products/otp-sms/",
    icon: ShieldCheck,
  },
  {
    title: "Quick SMS for non-technical teams",
    description:
      "Upload a CSV, pick a template, preview, send. No code, full compliance, real-time delivery reports.",
    href: "/products/quick-sms/",
    icon: Zap,
  },
]

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Company", path: "/company/about" },
          { name: "About", path: "/company/about" },
        ]}
      />      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-foreground/5 bg-gradient-to-b from-[#061b17] via-[#061b17] to-[#031411] py-20 text-white sm:py-28">
          <div
            aria-hidden
            className="absolute inset-0 opacity-30 [background-image:linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]"
          />
          <div
            aria-hidden
            className="absolute -top-20 left-1/2 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-br from-primary/30 via-primary/10 to-transparent blur-3xl"
          />

          <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6">
            <nav className="mb-6 flex items-center justify-center gap-2 text-xs text-white/50" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-white/80">Home</Link>
              <span>/</span>
              <span className="text-white/80">About</span>
            </nav>

            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-[11px] font-medium uppercase tracking-widest text-white/70">
              <Sparkles className="h-3 w-3 text-primary" />
              Serving India since 2019
            </div>

            <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Messaging built for{" "}
              <span className="bg-gradient-to-r from-primary via-primary to-[#25D366] bg-clip-text text-transparent">
                Indian business
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-base text-white/70 sm:text-lg">
              One dashboard for SMS, WhatsApp, OTP, and AI agents. Built in India, compliant with DLT and DPDPA, ready
              for the volumes and languages Indian businesses actually run.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/signup/"
                className="group inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-xl shadow-primary/25 transition hover:brightness-110"
              >
                Start Free — ₹60 Credit
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/company/contact/"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/10"
              >
                Talk to the team
              </Link>
            </div>
          </div>
        </section>

        {/* Our story */}
        <Section className="border-b border-foreground/5">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <SectionHeader
                eyebrow="Our story"
                title="Built by engineers who were tired of paying US prices for tools that didn't fit India."
                subtitle="Seven years in, we still ship with the same conviction: Indian business deserves messaging infrastructure that understands Indian operators, Indian languages, and Indian compliance."
              />
              <div className="mt-8 inline-flex items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/5 px-3 py-2 text-xs text-amber-700 dark:text-amber-300">
                <span className={PLACEHOLDER_CHIP}>Placeholder</span>
                Founder voice draft below — replace with Sajid&apos;s final copy before launch.
              </div>
            </div>

            <div className="space-y-5 text-[15px] leading-relaxed text-foreground/80">
              <p>
                SMSLocal started in 2019 because the CPaaS market was failing Indian businesses. The global platforms
                were priced in dollars, their documentation assumed US carriers, and their dashboards had no concept of
                DLT, DND regulations, or regional-language SMS scripts. The local platforms that did exist were either
                single-channel, closed-API, or built for a 2015 world without WhatsApp.
              </p>
              <p>
                We set out to build the platform we wished we had while running our own businesses — one dashboard for
                SMS and, later, WhatsApp and AI; priced in rupees; compliant with DLT and DPDPA by default; and
                developer-ready from day one. Every decision gets tested against a simple question: does this make it
                easier for an Indian SMB or developer to ship a message that actually lands?
              </p>
              <p>
                Today SMSLocal powers messaging for businesses across e-commerce, fintech, healthcare, education,
                logistics, real estate, and retail — from five-person startups to listed enterprises. We&apos;re still a
                small, opinionated team. We still write our own routing logic. And we still answer our own support
                tickets.
              </p>
              <p className="text-sm italic text-muted-foreground">
                — The SMSLocal team, Bengaluru
              </p>
            </div>
          </div>
        </Section>

        {/* What we do today */}
        <Section className="bg-muted/30 border-b border-foreground/5">
          <SectionHeader
            eyebrow="What we do"
            title="Four products. One wallet. One API."
            subtitle="Every channel shares a single inbox, a single billing ledger, and a single set of compliance controls."
            center
          />
          <div className="mx-auto mt-12 grid max-w-6xl gap-4 sm:grid-cols-2">
            {WHAT_WE_DO.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative flex items-start gap-4 rounded-2xl border border-foreground/10 bg-background p-6 shadow-sm transition hover:border-primary/40 hover:shadow-md"
              >
                <div className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                  <item.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-semibold">{item.title}</h3>
                    <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-primary" />
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </Section>

        {/* By the numbers */}
        <Section className="border-b border-foreground/5">
          <SectionHeader
            eyebrow="By the numbers"
            title="Only verified facts. Nothing fabricated."
            subtitle="If you see a PLACEHOLDER chip, it means we won't quote a number until it's been independently reconciled."
            center
          />
          <div className="mx-auto mt-12 grid max-w-6xl gap-4 sm:grid-cols-2 md:grid-cols-3">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="relative flex flex-col gap-3 rounded-2xl border border-foreground/10 bg-background p-6 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <stat.icon className="h-4 w-4" />
                  </div>
                  {stat.isPlaceholder && <span className={PLACEHOLDER_CHIP}>Pending</span>}
                </div>
                <div>
                  <div
                    className={`font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight ${
                      stat.isPlaceholder ? "text-muted-foreground/50" : "text-foreground"
                    }`}
                  >
                    {stat.isPlaceholder ? "—" : stat.value}
                  </div>
                  <p className="mt-1 text-sm leading-snug text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Leadership / Investors / Press — placeholder cluster */}
        <Section className="bg-muted/30 border-b border-foreground/5">
          <SectionHeader
            eyebrow="Leadership · Investors · Press"
            title="Attribution slots reserved for real content."
            subtitle="These slots will populate once founder bios, investor lists, and press mentions are approved internally. No stock photos, no fabricated titles."
            center
          />
          <div className="mx-auto mt-12 grid max-w-6xl gap-4 md:grid-cols-3">
            {[
              {
                icon: Users,
                title: "Leadership",
                body: "Founder, CTO, and any public-facing leadership will appear here with real photos, names, and 2-line bios sourced from our internal register.",
              },
              {
                icon: Handshake,
                title: "Investors & backers",
                body: "Named investors and strategic partners will be added here after approval. If the block is empty at launch, that is deliberate — we will not list anyone without consent.",
              },
              {
                icon: Newspaper,
                title: "Press & awards",
                body: "Verified media mentions and awards only. We will link directly to the source article or award page so readers can verify the claim.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex flex-col gap-4 rounded-2xl border border-dashed border-foreground/15 bg-background p-6"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <item.icon className="h-4 w-4" />
                  </div>
                  <h3 className="text-base font-semibold">{item.title}</h3>
                  <span className={`${PLACEHOLDER_CHIP} ml-auto`}>Placeholder</span>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Offices + Careers */}
        <Section>
          <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
            {/* Offices */}
            <div className="relative overflow-hidden rounded-3xl border border-foreground/10 bg-gradient-to-br from-primary/5 via-background to-background p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Building2 className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold">Our offices</h3>
                <span className={`${PLACEHOLDER_CHIP} ml-auto`}>Placeholder</span>
              </div>
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
                <p>
                  Primary office address will go here, sourced directly from our company-KYC records. Map embed and
                  directions will follow once the address is finalized.
                </p>
                <div className="flex items-center gap-2 text-xs">
                  <Globe2 className="h-3.5 w-3.5" />
                  Operating across India with customers in every major metro.
                </div>
              </div>
            </div>

            {/* Careers */}
            <div className="relative overflow-hidden rounded-3xl border border-foreground/10 bg-[#041715] p-8 text-white">
              <div
                aria-hidden
                className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gradient-to-br from-primary/30 to-transparent blur-3xl"
              />
              <div className="relative">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-primary ring-1 ring-white/10">
                    <Award className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold">Careers at SMSLocal</h3>
                </div>
                <p className="mt-6 max-w-md text-sm leading-relaxed text-white/70">
                  We&apos;re a small, opinionated team that ships weekly. If you care about Indian languages, carrier
                  routing, or building infrastructure people actually rely on, we&apos;d like to hear from you.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Link
                    href="/company/careers/"
                    className="group inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:brightness-110"
                  >
                    See open roles
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <span className={`${PLACEHOLDER_CHIP} bg-amber-500/15 text-amber-300`}>
                    Pending — roles live only when hiring
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Section>

        <RelatedContent path="/company/about" />

        <ProductFinalCta
          title="See why Indian businesses pick SMSLocal."
          subtitle="₹60 free credit. No credit card. Full DLT onboarding support from our team."
          primaryCta={{ label: "Start Free — ₹60 Credit", href: "/signup/" }}
          secondaryCta={{ label: "See Pricing", href: "/pricing/" }}
        />
      </main>

      <SiteFooter />
    </div>
  )
}
