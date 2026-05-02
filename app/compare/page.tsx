import type { Metadata } from "next"
import { getPageMetadata } from "@/lib/seo"
import Link from "next/link"
import {
  ArrowRight,
  Bot,
  Building2,
  Flag,
  Globe2,
  MessageCircle,
  MessageSquare,
  Scale,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react"
import { AnnouncementStrip } from "@/components/landing/announcement-strip"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { RelatedContent } from "@/components/shared/related-content"
import { ProductFinalCta, Section, SectionHeader } from "@/components/product/product-page"
import { BreadcrumbJsonLd } from "@/components/seo/json-ld"

// ─── SEO — edit lib/seo/registry.ts or open /dev/seo to preview ──────────────
export const metadata: Metadata = getPageMetadata("/compare")

const COMPARISONS = [
  {
    competitor: "MSG91",
    slug: "smslocal-vs-msg91",
    tag: "Incumbent leader",
    tagIcon: Flag,
    summary: "India's most-searched CPaaS comparison. Pricing, WhatsApp depth, and developer experience.",
    focus: ["SMS pricing", "WhatsApp BSP", "API maturity"],
    accent: "from-primary/20 to-primary/0",
    featured: true,
  },
  {
    competitor: "WATI",
    slug: "smslocal-vs-wati",
    tag: "WhatsApp SMBs",
    tagIcon: MessageCircle,
    summary: "Pay-as-you-go vs ₹2,499/month. Team inbox, broadcasts, and AI agent capabilities.",
    focus: ["Pay-as-you-go", "Team inbox", "AI agents"],
    accent: "from-emerald-500/15 to-emerald-500/0",
  },
  {
    competitor: "Fast2SMS",
    slug: "smslocal-vs-fast2sms",
    tag: "SMB SMS",
    tagIcon: Zap,
    summary: "Direct SMB competitor. Delivery speed, template governance, multi-channel reach.",
    focus: ["Route quality", "DLT handling", "Multi-channel"],
    accent: "from-amber-500/15 to-amber-500/0",
  },
  {
    competitor: "AiSensy",
    slug: "smslocal-vs-aisensy",
    tag: "WhatsApp BSP",
    tagIcon: Bot,
    summary: "WhatsApp Business Solution Provider comparison — flows, analytics, and AI.",
    focus: ["BSP pricing", "Chatbot builder", "Inbox UX"],
    accent: "from-sky-500/15 to-sky-500/0",
  },
  {
    competitor: "Interakt",
    slug: "smslocal-vs-interakt",
    tag: "D2C focus",
    tagIcon: Sparkles,
    summary: "D2C-focused WhatsApp platform. Commerce integrations, catalogues, and journeys.",
    focus: ["Commerce", "Catalogues", "D2C journeys"],
    accent: "from-rose-500/15 to-rose-500/0",
  },
  {
    competitor: "Gupshup",
    slug: "smslocal-vs-gupshup",
    tag: "Enterprise",
    tagIcon: Building2,
    summary: "Enterprise WhatsApp and AI agents. Scale, compliance posture, and onboarding speed.",
    focus: ["Enterprise SLAs", "AI quality", "Onboarding"],
    accent: "from-fuchsia-500/15 to-fuchsia-500/0",
  },
  {
    competitor: "Textlocal",
    slug: "smslocal-vs-textlocal",
    tag: "Long-standing SMB",
    tagIcon: MessageSquare,
    summary: "Long-standing Indian SMS platform. Modern API depth and WhatsApp readiness.",
    focus: ["API depth", "WhatsApp", "Modern DX"],
    accent: "from-cyan-500/15 to-cyan-500/0",
  },
  {
    competitor: "Twilio",
    slug: "smslocal-vs-twilio",
    tag: "Global alternative",
    tagIcon: Globe2,
    summary: "For teams weighing a global CPaaS against an India-native platform.",
    focus: ["INR pricing", "India routes", "DLT native"],
    accent: "from-indigo-500/15 to-indigo-500/0",
  },
]

const PRINCIPLES = [
  {
    icon: Scale,
    title: "Honest comparisons",
    description:
      "We tell you where competitors win. If the other platform is a better fit for your use case, our comparison will say so.",
  },
  {
    icon: ShieldCheck,
    title: "Verified claims only",
    description:
      "Every feature row cites a public source — their pricing page, docs, or changelog. No fabricated data points.",
  },
  {
    icon: Sparkles,
    title: "Buyer-first framing",
    description:
      "Each page closes with two persona recommendations: one who should pick us, one who should pick the competitor.",
  },
]

export default function CompareHubPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Compare", path: "/compare" },
        ]}
      />
      <AnnouncementStrip />
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-foreground/5 bg-gradient-to-b from-[#061b17] via-[#051a15] to-[#031411] py-20 text-white sm:py-24">
          <div
            aria-hidden
            className="absolute inset-0 opacity-30 [background-image:linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]"
          />
          <div
            aria-hidden
            className="absolute -top-24 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-gradient-to-br from-primary/25 via-primary/8 to-transparent blur-3xl"
          />

          <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-[11px] font-medium uppercase tracking-widest text-white/70">
              <Scale className="h-3 w-3 text-primary" />
              Fair comparisons
            </div>
            <h1 className="mt-5 text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Comparing SMSLocal to{" "}
              <span className="bg-gradient-to-r from-primary via-primary to-[#25D366] bg-clip-text text-transparent">
                every major platform
              </span>
              .
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-base text-white/70 sm:text-lg">
              Honest side-by-side breakdowns for Indian buyers. No FUD, no straw-man tactics — just the feature,
              pricing, and delivery data you need to decide.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/compare/smslocal-vs-msg91"
                className="group inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-xl shadow-primary/25 transition hover:brightness-110"
              >
                Start with MSG91
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/10"
              >
                See our pricing
              </Link>
            </div>
          </div>
        </section>

        {/* Principles */}
        <Section className="border-b border-foreground/5">
          <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
            {PRINCIPLES.map((p) => (
              <div
                key={p.title}
                className="flex items-start gap-4 rounded-2xl border border-foreground/10 bg-background p-6 shadow-sm"
              >
                <div className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15">
                  <p.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold">{p.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Comparison grid */}
        <section className="bg-muted/30 border-b border-foreground/5 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <SectionHeader
              eyebrow="Eight comparisons"
              title="Pick the one that matches your shortlist."
              subtitle="Every page follows the same structure — so comparing across comparisons is straightforward."
              center
            />
            <div className="mx-auto mt-12 grid gap-4 lg:grid-cols-2">
              {COMPARISONS.map((cmp) => (
                <Link
                  key={cmp.slug}
                  href={`/compare/${cmp.slug}`}
                  className={`group relative overflow-hidden rounded-2xl border bg-background p-6 shadow-sm transition hover:border-primary/40 hover:shadow-md ${
                    cmp.featured ? "border-primary/30 ring-1 ring-primary/20" : "border-foreground/10"
                  }`}
                >
                  <div
                    aria-hidden
                    className={`absolute -right-12 -top-12 h-44 w-44 rounded-full bg-gradient-to-br ${cmp.accent} blur-2xl transition group-hover:scale-110`}
                  />
                  <div className="relative flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-none items-center justify-center rounded-xl border border-foreground/10 bg-background text-foreground shadow-sm">
                      <cmp.tagIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold tracking-tight">
                          SMSLocal vs {cmp.competitor}
                        </h3>
                        {cmp.featured && (
                          <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                            Start here
                          </span>
                        )}
                      </div>
                      <p className="mt-0.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        {cmp.tag}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-foreground/80">{cmp.summary}</p>
                      <ul className="mt-4 flex flex-wrap gap-1.5">
                        {cmp.focus.map((f) => (
                          <li
                            key={f}
                            className="rounded-full border border-foreground/10 bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
                          >
                            {f}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                        Read the comparison
                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <RelatedContent path="/compare" />

        <ProductFinalCta
          title="Still shortlisting? Try SMSLocal free."
          subtitle="₹60 credit, no card, no commitment. See the product on your own data before you compare anything."
          primaryCta={{ label: "Start Free — ₹60 Credit", href: "/signup" }}
          secondaryCta={{ label: "Talk to sales", href: "/company/contact" }}
        />
      </main>

      <SiteFooter />
    </div>
  )
}
