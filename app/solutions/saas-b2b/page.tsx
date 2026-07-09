import type { Metadata } from "next"
import { getPageMetadata } from "@/lib/seo"
import Link from "next/link"
import {
  ArrowRight,
  CreditCard,
  Gauge,
  KeyRound,
  LifeBuoy,
  MessageSquare,
  ScrollText,
  ShieldCheck,
  TrendingUp,
  Zap,
} from "lucide-react"
import { AnnouncementStrip } from "@/components/landing/announcement-strip"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { RelatedContent } from "@/components/shared/related-content"
import {
  Section,
  SectionHeader,
} from "@/components/product/product-page"
import { SaasFaq } from "@/components/solution/saas-faq"
import { SaasHeroVisual } from "@/components/solution/saas-hero-visual"
import { SaasLifecycleCards } from "@/components/solution/saas-lifecycle-cards"
import { SaasCustomer360Mock } from "@/components/solution/saas-customer360-mock"
import { FinalCtaBoxless } from "@/components/shared/final-cta-boxless"
import { SaasIntegrations } from "@/components/solution/saas-integrations"
import { SaasTestimonialsMarquee } from "@/components/solution/saas-testimonials-marquee"
import { BreadcrumbJsonLd } from "@/components/seo/json-ld"

export const metadata: Metadata = getPageMetadata("/solutions/saas-b2b")

const TESTIMONIALS = [
  { quote: "We replaced Intercom and Zendesk with SMSLocal Pro and cut our support stack spend by 89% — without losing a single workflow.", name: "Rohan Sharma", role: "Founder · dev-tools SaaS, Bengaluru", initials: "RS" },
  { quote: "AI Captain flags churn intent before renewals. Our success team now reaches at-risk accounts days earlier — retention is up materially.", name: "Aisha Khan", role: "Head of CS · B2B SaaS, Gurugram", initials: "AK" },
  { quote: "Stripe MRR and HubSpot lifecycle sit right on every conversation. One Customer 360 means no more tab-switching mid-chat.", name: "Vikram Mehta", role: "VP Support · fintech SaaS, Mumbai", initials: "VM" },
]

const TRUST_BADGES = ["DPDPA-aware", "SOC 2 Type II in progress", "AES-256 encryption", "GDPR + CCPA", "MFA on every account"]

const FAQS = [
  { q: "Do you support custom roles?", a: "Yes, on Pro and Enterprise. Define permissions per role: agent, supervisor, billing-only, read-only — all scoped by inbox, team, and action." },
  { q: "SSO / SAML?", a: "Yes. SAML and OIDC single sign-on is available on Pro, alongside RBAC and audit logs — enforce your identity provider and provision agents centrally." },
  { q: "Is HIPAA available?", a: "HIPAA-aligned controls (encryption at rest/in transit, access logs, RBAC) are available on Enterprise, and a BAA can be arranged for qualifying healthcare workloads." },
]

export default function SaasB2BPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Solutions", path: "/solutions" },
          { name: "SaaS / B2B", path: "/solutions/saas-b2b" },
        ]}
      />
      <AnnouncementStrip />
      <SiteHeader />

      <main className="flex-1">
        {/* 1 ─ Hero (dark) */}
        <section className="relative overflow-hidden bg-[oklch(0.13_0.02_230)]">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-40 -left-32 h-[520px] w-[520px] rounded-full opacity-25 blur-3xl"
            style={{ background: "radial-gradient(circle, color-mix(in oklch, var(--primary) 50%, transparent), transparent 70%)" }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-40 top-20 h-[400px] w-[400px] rounded-full opacity-15 blur-3xl"
            style={{ background: "radial-gradient(circle, oklch(0.72 0.17 165), transparent 70%)" }}
          />
          <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:py-20">
            <div>
              <span className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-primary">
                SaaS / B2B · Pro plan ₹15,999
              </span>
              <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
                Customer support for <span className="text-primary">SaaS teams</span>.
              </h1>
              <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-white/60 sm:text-[17px]">
                Onboarding, retention, expansion, and churn alerts in one inbox. SSO and audit logs on Pro (₹15,999). Replace Intercom + Zendesk.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/signup/"
                  className="group inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-xl shadow-primary/30 transition hover:brightness-110"
                >
                  Start Free
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/company/contact/"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
                >
                  Talk to Sales
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="mt-10 grid grid-cols-2 gap-3 border-t border-white/10 pt-6 sm:grid-cols-4">
                {[
                  { icon: ShieldCheck, label: "SOC 2 in progress" },
                  { icon: KeyRound, label: "SSO + RBAC on Pro" },
                  { icon: CreditCard, label: "Stripe + HubSpot inline" },
                  { icon: ScrollText, label: "Audit logs" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-start gap-2 text-[12.5px] text-white/50">
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                      <Icon className="h-3 w-3" />
                    </span>
                    <span className="leading-snug">{label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <SaasHeroVisual />
            </div>
          </div>
        </section>

        {/* 2 ─ Lifecycle feature blocks */}
        <section className="bg-muted/40 py-10 sm:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <SaasLifecycleCards />
          </div>
        </section>

        {/* 3 ─ Customer 360 */}
        <Section className="!py-12 sm:!py-16">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHeader
                eyebrow="Customer 360"
                title="One customer profile. Complete context."
                subtitle="Every conversation connected with business context — so your team always knows who they're talking to and what's at stake."
              />
              <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                {[
                  { icon: MessageSquare, t: "Conversation history" },
                  { icon: CreditCard, t: "Subscription data & MRR" },
                  { icon: TrendingUp, t: "Lifecycle stage" },
                  { icon: Gauge, t: "Churn score" },
                  { icon: LifeBuoy, t: "Open tickets" },
                  { icon: Zap, t: "Product activity" },
                ].map(({ icon: Icon, t }) => (
                  <div key={t} className="flex items-start gap-2.5">
                    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="pt-1.5 text-[13.5px] font-medium text-foreground">{t}</span>
                  </div>
                ))}
              </div>
            </div>
            <SaasCustomer360Mock />
          </div>
        </Section>

        {/* 4 ─ Integrations */}
        <Section className="!py-12 sm:!py-16">
          <SectionHeader
            center
            eyebrow="Stack"
            title="SaaS integrations."
            subtitle="Connect the tools your team already uses."
          />
          <SaasIntegrations />
        </Section>

        {/* 5 ─ Testimonials */}
        <SaasTestimonialsMarquee />

        <SaasFaq eyebrow="FAQ" title="Roles, SSO, HIPAA — straight answers." items={FAQS} />

        <RelatedContent path="/solutions/saas-b2b" />

        {/* Final CTA */}
        <FinalCtaBoxless
          title="Replace Intercom + Zendesk with one customer platform."
          subtitle="Give your SaaS team the context, automation, and AI tools needed to build stronger customer relationships."
          primaryCta={{ label: "Start Free", href: "/signup/" }}
          secondaryCta={{ label: "Talk to Sales", href: "/company/contact/" }}
        />
      </main>

      <SiteFooter />
    </div>
  )
}
