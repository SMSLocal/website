import type { Metadata } from "next"
import Link from "next/link"
import { getPageMetadata } from "@/lib/seo"
import {
  ArrowRight,
  Lock,
  ShieldCheck,
  KeyRound,
  FileSearch,
  Siren,
  Building2,
  ScrollText,
  UserCheck,
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

export const metadata: Metadata = getPageMetadata("/platform/security")

/* ── Hero visual ──────────────────────────────────────────────────────────── */
function SecurityVisual() {
  const layers = [
    { icon: Lock, label: "TLS 1.2+ in transit", detail: "Every request encrypted end to end" },
    { icon: KeyRound, label: "AES-256 at rest", detail: "Data encrypted on disk and in backups" },
    { icon: UserCheck, label: "Role-based access", detail: "Least-privilege by default, per team member" },
    { icon: FileSearch, label: "Audit logs", detail: "Every sensitive action is recorded" },
  ]

  return (
    <div className="flex h-full min-h-[360px] flex-col gap-3 lg:pl-4">
      <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-md">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5 text-primary" />
          <span className="text-[10.5px] font-semibold uppercase tracking-widest text-primary">
            Security posture
          </span>
        </div>
        <p className="mt-1.5 text-[13px] leading-relaxed text-white/85">
          Every layer of the platform — network, storage, application, and people — is built to
          the same standard, not just the ones customers ask about.
        </p>
      </div>

      {layers.map((layer) => (
        <div
          key={layer.label}
          className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 backdrop-blur-md"
        >
          <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
            <layer.icon className="h-4 w-4" />
          </span>
          <div>
            <p className="text-[13px] font-semibold text-white">{layer.label}</p>
            <p className="text-[11.5px] leading-snug text-white/60">{layer.detail}</p>
          </div>
        </div>
      ))}

      <div className="flex items-center gap-2 rounded-xl border border-blue-500/20 bg-blue-500/10 px-4 py-2.5">
        <Building2 className="h-4 w-4 shrink-0 text-blue-400" />
        <span className="text-[12.5px] font-medium text-blue-300">
          Infrastructure hosted in India, DPDPA-aligned by design
        </span>
      </div>
    </div>
  )
}

export default function PlatformSecurityPage() {
  return (
    <>
      <ProductServiceJsonLd
        name="SMSLocal Platform Security & Compliance"
        description="Enterprise security built into SMSLocal — SSO and SAML, audit logs, IP blocklisting, role-based access, and GDPR/CCPA-aligned data handling for teams that answer to security reviews."
        path="/platform/security"
        category="Platform Security & Compliance"
      />
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Platform", path: "/platform/security" },
          { name: "Security", path: "/platform/security" },
        ]}
      />
      <SiteHeader />
      <main>

        {/* ── HERO ──────────────────────────────────────────────── */}
        <ProductHero
          compact
          eyebrow="Platform · Security & Compliance"
          title={
            <>
              Enterprise-Grade Security
              <br className="hidden sm:block" /> for Agentic AI
            </>
          }
          subtitle="SSO, audit logs, and data controls that satisfy IT and compliance, without slowing your team down."
          primaryCta={{ label: "Talk to Sales", href: "/company/contact" }}
          secondaryCta={{ label: "Get a Demo", href: "/company/contact" }}
          trustBar={[
            { icon: KeyRound, label: "SSO and SAML" },
            { icon: FileSearch, label: "Audit logs & IP blocklisting" },
            { icon: UserCheck, label: "Role-based access" },
            { icon: ScrollText, label: "GDPR and CCPA aligned" },
          ]}
          visual={<SecurityVisual />}
        />

        {/* ── TRUST LINE ────────────────────────────────────────── */}
        <div className="border-b border-border bg-muted/30 py-4">
          <p className="text-center text-[13px] font-medium text-muted-foreground">
            Built for teams that answer to security reviews.
          </p>
        </div>

        {/* ── STATS ─────────────────────────────────────────────── */}
        <Section>
          <StatsBand
            items={[
              { value: "SSO", label: "SSO and SAML for centralized identity management" },
              { value: "Audit logs", label: "Full audit trail plus IP blocklisting" },
              { value: "RBAC", label: "Role-based access control, least-privilege by default" },
              { value: "GDPR/CCPA", label: "Data handling aligned with GDPR and CCPA" },
            ]}
          />
        </Section>

        {/* ── THE PROBLEM ───────────────────────────────────────── */}
        <Section tone="muted">
          <div className="mx-auto max-w-3xl">
            <SectionHeader
              eyebrow="Why it matters"
              title="Powerful AI and broad channel access raise the bar on security"
            />
            <p className="mt-5 text-pretty text-[15px] leading-relaxed text-muted-foreground">
              Every OTP, order update, and support conversation that passes through a messaging
              platform carries phone numbers, names, and sometimes payment or health information.
              Your platform needs strong controls by default so you can move fast without
              creating risk — not treat security as an afterthought.
            </p>
          </div>
        </Section>

        {/* ── WHAT YOU GET ──────────────────────────────────────── */}
        <CapabilityGrid
          eyebrow="What you get"
          title="Four layers of protection, active on every account"
          subtitle="No add-on security tier, no enterprise-only lock. These protections are the default for every customer, on every account size."
          items={[
            {
              icon: KeyRound,
              title: "Access control",
              body: "SSO and SAML, role-based permissions, and teams for managed access — every team member gets exactly the access their role needs, and nothing more.",
            },
            {
              icon: FileSearch,
              title: "Visibility",
              body: "Audit logs and IP blocklisting so you can see and limit who does what. Sensitive operations are logged with who, what, and when.",
            },
            {
              icon: Lock,
              title: "Data handling",
              body: "GDPR and CCPA aligned processing today, with SOC 2 currently in progress on our roadmap — we'll share updates as that certification work advances.",
            },
            {
              icon: Siren,
              title: "Brand and control",
              body: "White-label UI and customizable dashboards so the platform fits how your team already works, not the other way around.",
            },
          ]}
        />

        {/* ── WHY IT WORKS ──────────────────────────────────────── */}
        <Section tone="muted">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16 lg:items-center">
            <div>
              <SectionHeader
                eyebrow="Why it works"
                title="Security that's built in, not bolted on"
              />
              <p className="mt-5 text-pretty text-[15px] leading-relaxed text-muted-foreground">
                Security is built into the platform, not bolted on, so enabling AI and
                broadcasting does not mean loosening your controls. Third-party penetration
                testing, employee background checks and confidentiality training, and India-based
                infrastructure are part of how SMSLocal is built and operated.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                { icon: <ShieldCheck className="h-5 w-5" />, label: "Penetration tested", desc: "Regular third-party security testing of the platform" },
                { icon: <UserCheck className="h-5 w-5" />,   label: "Vetted employees",   desc: "Background checks, confidentiality agreements, mandatory training" },
                { icon: <Building2 className="h-5 w-5" />,   label: "India-based hosting", desc: "Infrastructure hosted in India, aligned with DPDPA" },
                { icon: <ScrollText className="h-5 w-5" />,  label: "Documented commitments", desc: "Security terms spelled out in our DPA, not just a sales page" },
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
              One security model across AI, channels, and campaigns
            </h2>
            <p className="mt-5 text-pretty text-[15px] leading-relaxed text-white/70">
              One platform means one security model across your AI, channels, and campaigns,
              instead of stitching policies across four vendors. Our Data Processing Addendum
              spells out exactly how we handle your data as a processor, and our Privacy Policy
              covers what we collect and why.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/legal/dpa"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/15"
              >
                Data Processing Addendum
              </Link>
              <Link
                href="/legal/privacy"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/15"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </Section>

        {/* ── FAQ ───────────────────────────────────────────────── */}
        <FaqSection
          items={[
            {
              q: "Do you support SSO?",
              a: "Yes, SSO and SAML are supported for centralized identity management, alongside role-based permissions and teams for managed access.",
            },
            {
              q: "Are you SOC 2 certified?",
              a: "SOC 2 is on our roadmap and currently in progress. GDPR and CCPA aligned data handling is in place today, and we'll share updates as SOC 2 work advances.",
            },
            {
              q: "Can I control access by role?",
              a: "Yes, with role-based permissions and teams — every team member gets exactly the access their role needs, from read-only reporting access to full admin.",
            },
          ]}
        />

        {/* ── INTERNAL LINKS ────────────────────────────────────── */}
        <Section tone="muted">
          <div className="mx-auto max-w-3xl">
            <SectionHeader eyebrow="Explore more" title="Related resources" />
            <ul className="mt-6 space-y-3">
              {[
                { href: "/legal/dpa",           label: "Data Processing Addendum — how we process your data" },
                { href: "/legal/privacy",       label: "Privacy Policy — what we collect and why" },
                { href: "/products/ai-agentic", label: "Agentic AI — the AI these controls protect" },
                { href: "/products/integrations", label: "Integrations — connect your existing stack securely" },
                { href: "/compare",             label: "Compare SMSLocal with alternatives" },
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
          title="Bring agentic AI to your team with controls IT will approve."
          subtitle="SSO, audit logs, role-based access, and GDPR/CCPA-aligned data handling — built into the platform, not bolted on."
          primaryCta={{ label: "Talk to Sales", href: "/company/contact" }}
          secondaryCta={{ label: "Get a Demo", href: "/company/contact" }}
        />
      </main>
      <SiteFooter />
    </>
  )
}
