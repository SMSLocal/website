import type { Metadata } from "next"
import { getPageMetadata } from "@/lib/seo"
import Link from "next/link"
import {
  ArrowRight,
  Bot,
  Boxes,
  CheckCircle2,
  Code2,
  Layers,
  MessageCircle,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  Zap,
} from 'lucide-react'
import { AnnouncementStrip } from "@/components/landing/announcement-strip"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { FinalCta } from "@/components/landing/final-cta"
import { BreadcrumbJsonLd } from "@/components/seo/json-ld"

// ─── SEO — edit lib/seo/registry.ts or open /dev/seo to preview ──────────────
export const metadata: Metadata = getPageMetadata("/products")

type Product = {
  name: string
  tag: string
  href: string
  description: string
  features: string[]
  icon: React.ReactNode
  accent: string
  status?: "live" | "soon"
}

const PRIMARY_PRODUCTS: Product[] = [
  {
    name: "Bulk SMS",
    tag: "Campaigns at scale",
    href: "/products/bulk-sms",
    icon: <Send className="h-6 w-6" />,
    accent: "from-primary/25 to-primary/5",
    description:
      "Send millions of DLT-compliant messages across India with priority routing, audience segmentation, and honest delivery reporting.",
    features: [
      "Direct operator connectivity across major Indian carriers",
      "DLT-compliant templates and sender IDs",
      "Audience segmentation, scheduling, and automatic retries",
      "Sub-second typical delivery on transactional routes",
    ],
  },
  {
    name: "RCS Business Messaging",
    tag: "Rich, verified messaging",
    href: "/products/rcs",
    icon: <Star className="h-6 w-6" />,
    accent: "from-amber-500/25 to-amber-500/5",
    description:
      "Send verified, branded rich cards, carousels, and suggested replies on Jio, Airtel, and Vi — with automatic DLT-compliant SMS fallback on the same wallet.",
    features: [
      "Verified sender badge, brand colours, and logo in the inbox header",
      "Rich cards, image carousels, and tap-to-reply chips render natively",
      "Automatic per-number fallback to your approved DLT SMS template",
      "One wallet, one webhook, one consolidated GST invoice",
    ],
  },
  {
    name: "WhatsApp Business API",
    tag: "Two-way conversations",
    href: "/products/whatsapp-business-api",
    icon: <MessageCircle className="h-6 w-6" />,
    accent: "from-emerald-500/25 to-emerald-500/5",
    description:
      "Official WhatsApp Business API with a full conversation dashboard, template management, AI agents, and a visual flow builder.",
    features: [
      "Green tick, verified sender, and official Meta partner onboarding",
      "Template manager with approval workflow and variable preview",
      "AI agents that speak 8 Indian languages and route to humans",
      "Shared inbox with assignments, tags, and CSAT tracking",
    ],
  },
  {
    name: "Quick SMS",
    tag: "No-code dashboard",
    href: "/products/quick-sms",
    icon: <Zap className="h-6 w-6" />,
    accent: "from-sky-500/25 to-sky-500/5",
    description:
      "A browser-based composer for ops, marketing, and support teams. Upload a list, pick a template, preview, and send — no developer required.",
    features: [
      "Drag-and-drop CSV import with live column mapping",
      "DLT template library, variable merging, and character counter",
      "Live delivery reports with downloadable per-number CSVs",
      "Roles, approval gates, and a full audit log per workspace",
    ],
  },
]

const SECONDARY_PRODUCTS: Product[] = [
  {
    name: "AI Agents",
    tag: "Conversational AI",
    href: "/products/ai-agents",
    icon: <Bot className="h-6 w-6" />,
    accent: "from-violet-500/25 to-violet-500/5",
    description:
      "Launch WhatsApp AI agents that resolve routine questions in Hindi, English, and six more Indian languages — and hand off cleanly to humans when it matters.",
    features: [
      "Pre-built agents for support, lead qualification, and reminders",
      "Context-aware handoff to your human agents with full transcripts",
      "Trained on your docs, catalog, and policies via a secure connector",
    ],
    status: "live",
  },
]

const PLATFORM_CAPABILITIES = [
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "DLT & TRAI compliance",
    description: "Header, template, and consent workflows aligned to TRAI DLT rules — enforced across every channel, not bolted on.",
  },
  {
    icon: <Code2 className="h-5 w-5" />,
    title: "One API, all channels",
    description: "A single authentication layer, a single webhook format, and a single billing ledger across SMS, WhatsApp, OTP, and AI.",
  },
  {
    icon: <Layers className="h-5 w-5" />,
    title: "Unified inbox and dashboard",
    description: "Every conversation, campaign, and delivery event in one place — searchable, assignable, and exportable.",
  },
  {
    icon: <Sparkles className="h-5 w-5" />,
    title: "India-first product team",
    description: "Product, support, and onboarding teams based in India who understand DLT, operators, and your customers' expectations.",
  },
]

export default function ProductsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
        ]}
      />      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-slate-950 py-20 text-white lg:py-28">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute -left-40 top-0 h-[36rem] w-[36rem] rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute right-0 bottom-0 h-[30rem] w-[30rem] rounded-full bg-accent/10 blur-3xl" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
          </div>
          <div className="relative mx-auto max-w-6xl px-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/80">
              <Boxes className="h-3.5 w-3.5" aria-hidden />
              <span>Products</span>
            </div>
            <h1 className="mt-5 max-w-3xl text-balance font-serif text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
              Every way your business talks to customers in India — on one compliant platform.
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-white/70 md:text-lg">
              SMS, WhatsApp, OTP, and AI agents, with DLT compliance and India-based support baked in. Pick the channel you need today; add the rest without changing your integration.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="https://app.smslocal.in/signup"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:bg-primary/90"
              >
                Start building free
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10"
              >
                See pricing
              </Link>
            </div>
          </div>
        </section>

        {/* Primary product cards */}
        <section className="bg-background py-20 lg:py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Core channels
              </div>
              <h2 className="mt-4 text-balance font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                Four pillars. One messaging platform.
              </h2>
              <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
                Start with the product that solves today's problem. Add the others as your use cases grow — without re-platforming or renegotiating vendor contracts.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {PRIMARY_PRODUCTS.map((p) => (
                <ProductCard key={p.name} product={p} size="large" />
              ))}
            </div>
          </div>
        </section>

        {/* Secondary products */}
        <section className="border-y border-border bg-muted/40 py-20 lg:py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
                <Sparkles className="h-3.5 w-3.5" aria-hidden />
                Also available
              </div>
              <h2 className="mt-4 text-balance font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                AI agents and reseller tooling — same API, same billing.
              </h2>
              <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
                Layer AI on top of your existing SMS and WhatsApp footprint, or white-label the whole stack under your own brand — no second vendor, no second integration.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {SECONDARY_PRODUCTS.map((p) => (
                <ProductCard key={p.name} product={p} size="medium" />
              ))}
            </div>
          </div>
        </section>

        {/* Platform capabilities */}
        <section className="bg-background py-20 lg:py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground">
                <Layers className="h-3.5 w-3.5" aria-hidden />
                Platform
              </div>
              <h2 className="mt-4 text-balance font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                The foundation every product shares.
              </h2>
              <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
                You do not pay for compliance, dashboards, or developer tooling per channel. They are part of the platform — available to every product you enable.
              </p>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {PLATFORM_CAPABILITIES.map((cap) => (
                <div
                  key={cap.title}
                  className="rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:border-primary/30 hover:shadow-md"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {cap.icon}
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-foreground">{cap.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{cap.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  )
}

function ProductCard({ product, size }: { product: Product; size: "large" | "medium" }) {
  return (
    <Link
      href={product.href}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card p-7 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-xl md:p-8"
    >
      <div
        aria-hidden
        className={`pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-gradient-to-br ${product.accent} blur-3xl transition duration-500 group-hover:scale-110`}
      />

      <div className="relative flex items-start justify-between gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-background text-primary shadow-sm">
          {product.icon}
        </div>
        <span className="rounded-full border border-border bg-background/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground backdrop-blur">
          {product.tag}
        </span>
      </div>

      <div className="relative mt-6">
        <h3 className="font-serif text-2xl font-semibold tracking-tight text-foreground md:text-[28px]">
          {product.name}
        </h3>
        <p className="mt-3 text-pretty text-[15px] leading-relaxed text-muted-foreground">{product.description}</p>
      </div>

      {size === "large" && (
        <ul className="relative mt-6 space-y-2.5">
          {product.features.map((feat) => (
            <li key={feat} className="flex gap-2.5 text-sm leading-relaxed text-foreground/80">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      )}

      {size === "medium" && (
        <ul className="relative mt-5 space-y-2 text-sm leading-relaxed text-foreground/80">
          {product.features.slice(0, 3).map((feat) => (
            <li key={feat} className="flex gap-2.5">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="relative mt-7 flex items-center gap-2 text-sm font-semibold text-primary">
        Explore {product.name}
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden />
      </div>
    </Link>
  )
}
