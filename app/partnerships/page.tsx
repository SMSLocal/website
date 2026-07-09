import type { Metadata } from "next"
import Link from "next/link"
import { getPageMetadata } from "@/lib/seo"
import {
  ArrowRight,
  Building2,
  Handshake,
  Layers,
  Megaphone,
  Percent,
  Plug,
  ShoppingCart,
  Ticket,
  Users,
} from "lucide-react"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { FaqSection } from "@/components/landing/faq-section"
import { BreadcrumbJsonLd } from "@/components/seo/json-ld"
import {
  CapabilityGrid,
  ProductFinalCta,
  ProductHero,
  Section,
  SectionHeader,
  StatsBand,
} from "@/components/product/product-page"

export const metadata: Metadata = getPageMetadata("/partnerships")

/* ── Hero visual ──────────────────────────────────────────────────────────── */
function PartnershipsVisual() {
  const tiers = [
    { label: "Referral", detail: "Send us a lead, earn a commission" },
    { label: "Reseller", detail: "White-label SMSLocal under your brand" },
    { label: "Integration", detail: "Build a native connector, get listed" },
  ]

  return (
    <div className="flex h-full min-h-[360px] flex-col gap-4 lg:pl-4">
      <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 backdrop-blur-md">
        <div className="mb-2 flex items-center gap-1.5">
          <Handshake className="h-3.5 w-3.5 text-primary" />
          <span className="text-[10.5px] font-semibold uppercase tracking-widest text-primary">
            Partner tracks
          </span>
        </div>
        <dl className="mt-2 flex flex-col gap-3">
          {tiers.map((t) => (
            <div key={t.label} className="flex flex-col gap-0.5 text-[13px]">
              <dt className="font-medium text-white/90">{t.label}</dt>
              <dd className="text-white/60">{t.detail}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="rounded-xl border border-primary/25 bg-primary/10 px-4 py-3.5 backdrop-blur-md">
        <div className="mb-1.5 flex items-center gap-1.5">
          <Percent className="h-3.5 w-3.5 text-primary" />
          <span className="text-[10.5px] font-semibold uppercase tracking-widest text-primary">
            Revenue share
          </span>
        </div>
        <p className="text-[13px] leading-relaxed text-white/85">
          Ongoing commission on every client you bring, paid monthly against real usage.
        </p>
      </div>

      <div className="flex items-center gap-2 rounded-xl border border-blue-500/20 bg-blue-500/10 px-4 py-2.5">
        <Users className="h-4 w-4 shrink-0 text-blue-400" />
        <span className="text-[12.5px] font-medium text-blue-300">
          A dedicated partner manager, not a shared support queue
        </span>
      </div>
    </div>
  )
}

export default function PartnershipsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Partnerships", path: "/partnerships" },
        ]}
      />
      <SiteHeader />
      <main>

        {/* ── HERO ──────────────────────────────────────────────── */}
        <ProductHero
          compact
          eyebrow="Partnerships"
          title={
            <>
              Partner with SMSLocal
              <br className="hidden sm:block" /> on Agentic AI
            </>
          }
          subtitle="Grow with a platform that bundles agentic AI, channels, and broadcasting."
          primaryCta={{ label: "Become a Partner", href: "/company/contact/" }}
          secondaryCta={{ label: "Contact Us", href: "/company/contact/" }}
          trustBar={[
            { icon: Percent, label: "Recurring revenue share for resellers" },
            { icon: Layers, label: "White-label in progress" },
            { icon: Users, label: "Dedicated partner support" },
            { icon: Megaphone, label: "Co-marketing opportunities" },
          ]}
          visual={<PartnershipsVisual />}
        />

        {/* ── TRUST LINE ────────────────────────────────────────── */}
        <div className="border-b border-border bg-muted/30 py-4">
          <p className="text-center text-[13px] font-medium text-muted-foreground">
            One platform, many ways to grow together.
          </p>
        </div>

        {/* ── RESULTS STRIP ─────────────────────────────────────── */}
        <Section>
          <StatsBand
            items={[
              { value: "4 tracks",    label: "Agencies, resellers, technology partners, operators" },
              { value: "Recurring",   label: "Revenue share paid on every active client, monthly" },
              { value: "1 manager",   label: "A dedicated partner contact for onboarding and support" },
              { value: "Co-marketing",label: "Joint case studies, listings, and launch support" },
            ]}
          />
        </Section>

        {/* ── THE PROBLEM ───────────────────────────────────────── */}
        <Section tone="muted">
          <div className="mx-auto max-w-3xl">
            <SectionHeader
              eyebrow="Why partner with us"
              title="Your clients need agentic AI and messaging — you shouldn't have to build it"
            />
            <p className="mt-5 text-pretty text-[15px] leading-relaxed text-muted-foreground">
              If you're an agency, consultant, or systems integrator, your clients are already
              asking for WhatsApp automation, SMS campaigns, or an AI agent — and building that
              infrastructure yourself means carrier relationships, DLT compliance, and ongoing
              platform maintenance you didn't sign up for. The SMSLocal Partner Program lets you
              offer agentic AI and a complete channel stack under your own relationship, backed by
              infrastructure we already run in production for thousands of Indian businesses — as
              a verified WhatsApp Business Solution Provider with direct carrier relationships
              across India.
            </p>
          </div>
        </Section>

        {/* ── WAYS TO PARTNER ──────────────────────────────────────── */}
        <CapabilityGrid
          eyebrow="Ways to partner"
          title="Four ways to grow with SMSLocal"
          subtitle="Whichever track fits your business, we handle delivery, compliance, and infrastructure behind the scenes."
          items={[
            {
              icon: Building2,
              title: "Agencies",
              body: "Deliver CX projects faster with agentic AI and a complete channel stack — spend your time on strategy and creative instead of carrier plumbing.",
            },
            {
              icon: Percent,
              title: "Resellers",
              body: "Offer one platform across many channels to your customers. Our white-label reseller billing program is in progress — resellers today buy at partner rates and set their own client pricing.",
            },
            {
              icon: Plug,
              title: "Technology partners",
              body: "Integrate with SMSLocal through the open API and webhooks — build a native connector and get listed for co-marketing to our customer base.",
            },
            {
              icon: Users,
              title: "Operators",
              body: "Manage multiple clients with multi-tenant sub-accounts — one login, clear separation between client workspaces, and centralized reporting.",
            },
          ]}
        />

        {/* ── WHAT YOU GET ──────────────────────────────────────── */}
        <Section tone="muted">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16 lg:items-center">
            <div>
              <SectionHeader
                eyebrow="What you get"
                title="Partner enablement and a platform your customers can actually run"
              />
              <p className="mt-5 text-pretty text-[15px] leading-relaxed text-muted-foreground">
                Partner enablement, technical support, and a platform your customers can actually
                run, with agentic AI and broadcasting built in. If you build a CRM, e-commerce
                platform, helpdesk, or vertical SaaS product, your customers likely already want
                SMS, WhatsApp, or AI-agent messaging inside your product — we work with technology
                partners to build native integrations and support your customers directly when
                SMSLocal is the messaging layer underneath your platform.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                { icon: <Plug className="h-5 w-5" />,         label: "CRM integrations",       desc: "Trigger messaging workflows directly from customer records" },
                { icon: <ShoppingCart className="h-5 w-5" />, label: "E-commerce platforms",    desc: "Order, shipping, and cart-recovery messaging built in" },
                { icon: <Ticket className="h-5 w-5" />,        label: "Helpdesk & support tools",desc: "Route WhatsApp and SMS conversations into existing queues" },
                { icon: <Megaphone className="h-5 w-5" />,     label: "Co-marketing",            desc: "Joint listings, case studies, and launch announcements" },
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

        {/* ── HOW TO APPLY (dark band) ────────────────────────────── */}
        <Section tone="dark">
          <div className="mx-auto max-w-3xl">
            <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-white/85">
              How it works
            </span>
            <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Let's build something together
            </h2>
            <p className="mt-5 text-pretty text-[15px] leading-relaxed text-white/70">
              Tell us about your agency, client base, or platform, and our partnerships team will
              walk you through the agency, reseller, technology, or operator track that fits —
              including onboarding and what co-marketing looks like once you're live.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/products/ai-agentic/"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/15"
              >
                Explore agentic AI
              </Link>
              <Link
                href="/company/contact/"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/15"
              >
                Become a partner
              </Link>
            </div>
          </div>
        </Section>

        {/* ── FAQ ───────────────────────────────────────────────── */}
        <FaqSection
          items={[
            {
              q: "Who is the partner program for?",
              a: "Four kinds of partners: agencies delivering CX projects, resellers offering SMSLocal across many channels to their customers, technology partners integrating through our open API, and operators managing multiple clients with multi-tenant sub-accounts.",
            },
            {
              q: "Can I white-label SMSLocal under my own brand?",
              a: "White-label reseller billing is a program we're actively building out — it's available and in progress rather than a fully turnkey system today. Resellers can already buy at partner rates and set their own client pricing while we handle the underlying infrastructure and DLT compliance.",
            },
            {
              q: "How does revenue share work?",
              a: "Resellers buy at partner rates and set their own client pricing, earning the margin on every active client. Commission is calculated against real usage and paid out monthly.",
            },
            {
              q: "How do I apply?",
              a: "Reach out through our contact form with a bit about your business and client base. Our partnerships team will follow up to walk you through the track that fits and next steps.",
            },
          ]}
        />

        {/* ── INTERNAL LINKS ────────────────────────────────────── */}
        <Section tone="muted">
          <div className="mx-auto max-w-3xl">
            <SectionHeader eyebrow="Explore more" title="Related resources" />
            <ul className="mt-6 space-y-3">
              {[
                { href: "/products/ai-agentic/",     label: "Explore agentic AI on SMSLocal" },
                { href: "/products/integrations/",   label: "See integrations and the open API" },
                { href: "/platform/security/",       label: "See the platform and security" },
                { href: "/company/contact/",         label: "Apply to become a partner" },
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
          title="Let's build something together."
          subtitle="Agentic AI, every channel, and broadcasting bundled into one platform — become a partner and start growing with your customers this month."
          primaryCta={{ label: "Become a Partner", href: "/company/contact/" }}
          secondaryCta={{ label: "Contact Us", href: "/company/contact/" }}
        />
      </main>
      <SiteFooter />
    </>
  )
}
