import type { Metadata } from "next"
import { getPageMetadata } from "@/lib/seo"
import {
  BadgeCheck,
  BarChart3,
  Building2,
  Code2,
  CreditCard,
  Globe2,
  LayoutDashboard,
  Palette,
  ShieldCheck,
  Sliders,
  Users,
  Zap,
} from "lucide-react"
import { AnnouncementStrip } from "@/components/landing/announcement-strip"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { RelatedContent } from "@/components/shared/related-content"
import {
  ProductHero,
  LogosStrip,
  FeatureGrid,
  BulletList,
  CompareTable,
  HowItWorks,
  UseCaseGrid,
  StatsBand,
  Faq,
  ProductFinalCta,
  Section,
  SectionHeader,
} from "@/components/product/product-page"
import { BreadcrumbJsonLd, ProductServiceJsonLd } from "@/components/seo/json-ld"

// ─── SEO — edit lib/seo/registry.ts or open /dev/seo to preview ──────────────
export const metadata: Metadata = getPageMetadata("/products/reseller")

function ResellerVisual() {
  return (
    <div className="relative w-full max-w-sm mx-auto select-none">
      {/* Main branded dashboard card */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm shadow-2xl">
        {/* Brand bar */}
        <div className="flex items-center gap-3 mb-4">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground">YB</div>
          <div>
            <div className="text-sm font-semibold text-white">YourBrand SMS</div>
            <div className="text-[10px] text-white/40">yourbrand.com · Powered by SMSLocal</div>
          </div>
          <div className="ml-auto">
            <div className="rounded-full bg-green-500/20 px-2 py-0.5 text-[10px] font-medium text-green-400">Live</div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { label: "Clients", value: "47" },
            { label: "Sent today", value: "1.2M" },
            { label: "Margin", value: "₹38K" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl bg-white/5 p-2.5 text-center">
              <div className="text-base font-bold text-white">{s.value}</div>
              <div className="text-[10px] text-white/40 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Sub-account list */}
        <div className="space-y-2">
          {[
            { name: "Reliance Retail", sent: "340K", status: "green" },
            { name: "QuickMart India", sent: "128K", status: "green" },
            { name: "FintechPay", sent: "89K", status: "yellow" },
          ].map((c) => (
            <div key={c.name} className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2">
              <div className={`h-2 w-2 rounded-full flex-none ${c.status === "green" ? "bg-green-400" : "bg-yellow-400"}`} />
              <span className="flex-1 text-xs text-white/70">{c.name}</span>
              <span className="text-xs text-white/40">{c.sent} SMS</span>
            </div>
          ))}
        </div>
      </div>

      {/* Floating badge */}
      <div className="absolute -top-3 -right-3 rounded-xl bg-primary px-3 py-1.5 shadow-lg">
        <span className="text-[11px] font-semibold text-primary-foreground">Your brand. Your margins.</span>
      </div>
    </div>
  )
}

export default function ResellerPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <ProductServiceJsonLd
        name="White-Label SMS & WhatsApp Platform"
        description="Launch your own branded SMS and WhatsApp messaging platform with SMSLocal white-label — custom domain, your logo, sub-accounts, margin control, and full API access."
        path="/products/reseller"
        category="SMS reseller and white-label platform"
      />
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
          { name: "Reseller / White-label", path: "/products/reseller" },
        ]}
      />
      <AnnouncementStrip />
      <SiteHeader />
      <main className="flex-1">
        <ProductHero
          compact
          eyebrow="White-Label & Reseller"
          title="Launch your own SMS platform. Your brand. Your margins."
          description="White-label the full SMSLocal stack — bulk SMS, WhatsApp Business API, OTP, and RCS — under your own domain and logo. Onboard clients, set your own pricing, and keep the margin. No platform build required."
          primaryCta={{ label: "Become a reseller", href: "/signup/" }}
          secondaryCta={{ label: "Talk to our team", href: "/company/contact/" }}
          trustItems={[
            "Custom domain & logo",
            "Full sub-account management",
            "You set the pricing",
            "API access included",
          ]}
          visual={<ResellerVisual />}
        />

        <LogosStrip label="Trusted by agencies, ISVs, and telecom resellers across India" count={7} />

        <Section>
          <SectionHeader
            eyebrow="Why white-label SMSLocal"
            title="Everything your clients need. All under your brand."
            description="Building a messaging platform from scratch takes years and millions in infra. White-labelling SMSLocal gives you a production-grade platform — DLT-compliant, carrier-connected, and battle-tested — in days."
          />
          <FeatureGrid
            items={[
              { icon: <Palette className="h-5 w-5" />, title: "Full white-label branding", description: "Your logo, your domain, your colour scheme. Clients see your brand throughout — login page, dashboard, reports, and email notifications." },
              { icon: <Users className="h-5 w-5" />, title: "Sub-account management", description: "Create and manage unlimited client sub-accounts from your master dashboard. Set credit limits, permissions, and channel access per client." },
              { icon: <CreditCard className="h-5 w-5" />, title: "You control the margin", description: "Buy SMS and WhatsApp credits at wholesale rates and sell at your own price. Margin stays entirely with you — we never touch your client relationships." },
              { icon: <Globe2 className="h-5 w-5" />, title: "Custom domain", description: "Deploy the platform on your own subdomain (e.g. sms.yourbrand.com) with a valid SSL certificate. Your clients never see SMSLocal." },
              { icon: <Code2 className="h-5 w-5" />, title: "Full API access", description: "Every feature available in the dashboard is also available via API. Your clients can integrate directly into their own systems under your API credentials." },
              { icon: <ShieldCheck className="h-5 w-5" />, title: "DLT compliance included", description: "Full TRAI DLT framework — entity registration, sender ID management, template approval — built in. No extra setup for your clients." },
            ]}
          />
        </Section>

        <Section tone="muted">
          <SectionHeader
            eyebrow="How it works"
            title="From signup to first client in 48 hours."
          />
          <HowItWorks
            steps={[
              { icon: <BadgeCheck className="h-5 w-5" />, title: "Apply as a reseller", description: "Fill in a short form. Our partnerships team reviews and activates your master account — typically within one business day." },
              { icon: <Palette className="h-5 w-5" />, title: "Set up your brand", description: "Upload your logo, set your domain, and configure your colour theme. We handle the SSL and DNS setup." },
              { icon: <Users className="h-5 w-5" />, title: "Onboard your clients", description: "Create sub-accounts, assign credit limits, and set per-client pricing. Clients log in to your branded portal." },
              { icon: <BarChart3 className="h-5 w-5" />, title: "Earn margin, scale up", description: "Monitor all client activity from your master dashboard. Top up wholesale credits and reinvest margin as your client base grows." },
            ]}
          />
        </Section>

        <Section>
          <SectionHeader
            eyebrow="Platform depth"
            title="The full SMSLocal stack — under your label."
          />
          <FeatureGrid
            items={[
              { icon: <Zap className="h-5 w-5" />, title: "Bulk SMS", description: "DLT-compliant bulk SMS with smart route failover, delivery receipts, and Unicode/regional language support for your clients' campaigns." },
              { icon: <ShieldCheck className="h-5 w-5" />, title: "OTP & Transactional SMS", description: "Priority OTP routes with sub-second typical delivery. Your clients' login and checkout flows get the same priority infrastructure as enterprise deployments." },
              { icon: <Globe2 className="h-5 w-5" />, title: "WhatsApp Business API", description: "Meta-approved WhatsApp BSP access for your clients — template messaging, chatbots, two-way conversations, and campaign broadcasts." },
              { icon: <LayoutDashboard className="h-5 w-5" />, title: "Client dashboards", description: "Each sub-account gets a full-featured dashboard — campaign builder, contact lists, delivery reports, wallet, and API docs — all branded as yours." },
              { icon: <Sliders className="h-5 w-5" />, title: "Pricing controls", description: "Set per-client pricing per channel per route. Promotional SMS, transactional SMS, OTP, and WhatsApp can all carry different margins." },
              { icon: <Building2 className="h-5 w-5" />, title: "Dedicated support tier", description: "Reseller accounts get a dedicated account manager and priority support SLA — so you can confidently promise your clients fast issue resolution." },
            ]}
          />
        </Section>

        <Section tone="muted">
          <SectionHeader
            eyebrow="Compared to alternatives"
            title="Why resellers choose SMSLocal over building their own."
          />
          <CompareTable
            columns={["SMSLocal White-label", "Build your own platform", "Other reseller programs"]}
            rows={[
              { label: "Time to first client", values: ["48 hours", "12–24 months", "2–8 weeks"] },
              { label: "DLT compliance built in", values: ["Yes — full stack", "Build yourself", "Partial"] },
              { label: "WhatsApp BSP access", values: ["Included", "Separate Meta approval", "Varies"] },
              { label: "Custom domain & branding", values: ["Full white-label", "Yes, but you build it", "Logo only (usually)"] },
              { label: "Margin control", values: ["100% yours to set", "100% yours", "Capped by platform"] },
              { label: "API for your clients", values: ["Full API included", "You build it", "Limited"] },
              { label: "Infrastructure & uptime", values: ["99.99% — our problem", "Your problem", "Shared, varies"] },
            ]}
          />
        </Section>

        <Section>
          <SectionHeader eyebrow="Who resells SMSLocal" title="Built for agencies, ISVs, and telecom partners." />
          <UseCaseGrid
            items={[
              { icon: <Building2 className="h-5 w-5" />, title: "Digital agencies", description: "Add a recurring revenue SMS and WhatsApp channel to your client offering without building any infrastructure." },
              { icon: <Code2 className="h-5 w-5" />, title: "SaaS and ISVs", description: "Embed messaging into your product with white-label API access — your clients never know the infrastructure provider." },
              { icon: <Globe2 className="h-5 w-5" />, title: "Telecom partners", description: "Resell DLT-compliant SMS and WhatsApp under your telecom brand to business customers you already serve." },
              { icon: <Users className="h-5 w-5" />, title: "Marketing platforms", description: "Add SMS and WhatsApp as native channels inside your marketing automation or CRM product." },
            ]}
          />
        </Section>

        <Section tone="muted">
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-6 md:grid-cols-3">
              <BulletList
                title="Branding"
                items={[
                  "Custom domain with free SSL.",
                  "Your logo in the header, login page, and email notifications.",
                  "Colour theme and favicon configuration.",
                ]}
              />
              <BulletList
                title="Billing & margin"
                items={[
                  "Wholesale credit pricing for resellers.",
                  "Per-client per-channel markup controls.",
                  "Consolidated invoicing with GST for your master account.",
                ]}
              />
              <BulletList
                title="Support & SLA"
                items={[
                  "Dedicated account manager for your reseller account.",
                  "Priority support SLA to keep your clients happy.",
                  "Onboarding assistance for your first five clients.",
                ]}
              />
            </div>
          </div>
        </Section>

        <StatsBand
          items={[
            { value: "48 hrs", label: "typical time from signup to first live client" },
            { value: "99.99%", label: "platform uptime — your clients rely on our infra" },
            { value: "100%", label: "margin control — you set pricing, you keep the difference" },
            { value: "5+", label: "channels available: SMS, WhatsApp, OTP, RCS, Voice" },
          ]}
        />

        <Section tone="muted">
          <SectionHeader eyebrow="FAQs" title="Reseller & white-label, answered." />
          <Faq
            items={[
              { q: "Do my clients see SMSLocal branding anywhere?", a: "No. With full white-label setup, every client-facing surface — login page, dashboard, email notifications, and API docs — shows your brand. SMSLocal is invisible to your clients." },
              { q: "How does pricing and margin work?", a: "You buy credits from SMSLocal at wholesale reseller rates and sell to your clients at whatever price you choose. The difference is your margin. We invoice your master account only — you handle your client billing directly." },
              { q: "Can I give clients API access under my brand?", a: "Yes. Clients can use the full API with credentials that are scoped to their sub-account. API documentation is served from your domain with your branding." },
              { q: "Is DLT registration included for my clients?", a: "Yes. The DLT entity registration, sender ID management, and template approval workflow is built into the platform. Your clients go through the same DLT onboarding flow inside your branded dashboard." },
              { q: "What channels can I resell?", a: "Bulk SMS, OTP & transactional SMS, WhatsApp Business API, RCS Business Messaging, and Voice — all available on the reseller plan. You choose which channels to offer each client." },
              { q: "Is there a minimum commitment to become a reseller?", a: "No long-term commitment is required to start. Talk to our partnerships team and we will outline the wholesale credit tiers and what minimum volume unlocks each pricing level." },
            ]}
          />
        </Section>

        <RelatedContent path="/products/reseller" />

        <Section>
          <ProductFinalCta
            title="Start reselling SMS and WhatsApp under your own brand."
            description="Apply for a reseller account today — our team will have your branded platform live within 48 hours."
            primaryCta={{ label: "Become a reseller", href: "/signup/" }}
            secondaryCta={{ label: "Talk to our team", href: "/company/contact/" }}
          />
        </Section>
      </main>
      <SiteFooter />
    </div>
  )
}
