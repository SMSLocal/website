import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  MessageSquare,
  ShieldAlert,
  Sparkles,
  Type,
  Wrench,
} from "lucide-react"
import { AnnouncementStrip } from "@/components/landing/announcement-strip"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import {
  ProductFinalCta,
  Section,
  SectionHeader,
} from "@/components/product/product-page"
import { BreadcrumbJsonLd } from "@/components/seo/json-ld"
import { getPageMetadata } from "@/lib/seo"

// ─── SEO — edit lib/seo/registry.ts or open /dev/seo to preview ──────────────
export const metadata: Metadata = getPageMetadata("/resources/tools")

const TOOLS = [
  {
    slug: "free-sms-without-registration",
    title: "Free SMS without registration",
    tagline: "Send your first SMS with ₹60 in free credit.",
    description:
      "Sign up with email only, get ₹60 in credit (no card, no commitment), and send your first Indian SMS in minutes on a DLT-compliant, TRAI-approved route.",
    icon: MessageSquare,
    tag: "Popular",
    tagTone: "emerald" as const,
  },
  {
    slug: "sms-bomber",
    title: "SMS bomber: what it is, why it's illegal",
    tagline: "An honest explainer — plus the legal way to send high-volume SMS.",
    description:
      "SMS bombing is illegal in India under the IT Act and TRAI regulations. Learn what it is, the real consequences, and how to send high-volume messages the right way.",
    icon: ShieldAlert,
    tag: "Explainer",
    tagTone: "amber" as const,
  },
  {
    slug: "long-sms-messages",
    title: "Long SMS messages — concatenation & character limits",
    tagline: "How multi-part SMS works, GSM-7 vs UCS-2, and DLT template rules.",
    description:
      "A full guide to long SMS in India: how concatenation works, exact segment counts for English, Hindi, and emoji, pricing implications, and DLT template rules.",
    icon: Type,
    tag: "Guide",
    tagTone: "blue" as const,
    external: true,
  },
]

function tagClasses(tone: "emerald" | "amber" | "blue") {
  if (tone === "emerald") {
    return "border-emerald-500/25 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
  }
  if (tone === "blue") {
    return "border-blue-500/25 bg-blue-500/10 text-blue-700 dark:text-blue-300"
  }
  return "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300"
}

export default function ToolsIndexPage() {
  return (
    <>      <SiteHeader />
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Resources", path: "/resources/help" },
          { name: "Tools", path: "/resources/tools" },
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[oklch(0.14_0.02_230)] text-white">
        <div
          aria-hidden
          className="absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(1200px 500px at 15% 10%, oklch(0.62 0.18 145 / 0.18), transparent 60%), radial-gradient(900px 420px at 85% 30%, oklch(0.55 0.16 230 / 0.18), transparent 55%)",
          }}
        />
        <div className="relative mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 sm:py-24">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-white/85 backdrop-blur-md">
            <Wrench className="h-3.5 w-3.5" /> Resources · Tools
          </span>
          <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            Free SMS tools — built the right way.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-[15px] leading-relaxed text-white/75 sm:text-base">
            Utilities for anyone sending SMS in India. Everything here runs on
            DLT-compliant, TRAI-approved infrastructure — so what you send actually
            lands, and what you learn actually applies.
          </p>
        </div>
      </section>

      {/* Tools grid */}
      <Section>
        <SectionHeader
          eyebrow="Available tools"
          title="Pick a tool to get started."
          subtitle="Each tool is paired with honest context — what it does, what it doesn’t, and what the rules are."
        />
        <div className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2">
          {TOOLS.map((tool) => {
            const Icon = tool.icon
            const href = tool.external ? `/${tool.slug}` : `/resources/tools/${tool.slug}`
            return (
              <Link
                key={tool.slug}
                href={href}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-foreground/10 bg-background p-6 shadow-sm transition hover:border-primary/40 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${tagClasses(tool.tagTone)}`}
                  >
                    {tool.tag}
                  </span>
                </div>
                <h3 className="mt-5 flex items-center gap-1.5 text-lg font-semibold">
                  {tool.title}
                </h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-foreground/80">
                  {tool.tagline}
                </p>
                <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">
                  {tool.description}
                </p>
                <div className="mt-auto pt-5">
                  <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary">
                    Open tool
                    <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </Section>

      {/* Trust band */}
      <Section tone="muted">
        <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-3">
          {[
            {
              title: "DLT-registered",
              body: "Every route goes through registered Principal Entities and approved templates.",
            },
            {
              title: "TRAI-aligned",
              body: "Sender IDs, opt-out handling and DND scrubbing follow TCCCPR 2018 rules.",
            },
            {
              title: "₹60 free credit",
              body: "Email signup, no card. Test real delivery on real Indian networks in minutes.",
            },
          ].map((t) => (
            <div
              key={t.title}
              className="rounded-2xl border border-foreground/10 bg-background p-5 shadow-sm"
            >
              <div className="flex items-center gap-2 text-primary">
                <Sparkles className="h-4 w-4" />
                <span className="text-[12px] font-semibold uppercase tracking-[0.14em]">
                  {t.title}
                </span>
              </div>
              <p className="mt-3 text-[13.5px] leading-relaxed text-foreground/85">
                {t.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <ProductFinalCta
        title="Start with ₹60 in free credit."
        description="Email signup, no card, no minimum commit. Send your first SMS in under ten minutes."
        primaryCta={{ label: "Start free", href: "/signup/" }}
        secondaryCta={{ label: "See pricing", href: "/pricing/" }}
      />
      <SiteFooter />
    </>
  )
}
