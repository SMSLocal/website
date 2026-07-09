import type { Metadata } from "next"
import Link from "next/link"
import { getPageMetadata } from "@/lib/seo"
import {
  ArrowRight,
  Bot,
  Clock,
  FileCheck2,
  Handshake,
  RefreshCw,
  ShieldCheck,
  Umbrella,
  UserCheck,
} from "lucide-react"

import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import {
  Faq,
  ProductFinalCta,
  ProductHero,
  Section,
  SectionHeader,
} from "@/components/product/product-page"
import {
  IndustryPain,
  RelevantProductsGrid,
} from "@/components/solution/solution-page"
import { SolutionHeroVisual } from "@/components/solution/solution-hero-visual"
import { BreadcrumbJsonLd } from "@/components/seo/json-ld"

// ─── SEO — edit lib/seo/registry.ts or open /dev/seo to preview ──────────────
export const metadata: Metadata = getPageMetadata("/industry/insurance")

const USE_CASES = [
  {
    icon: UserCheck,
    title: "Quotes and leads",
    text: "Assist with quotes and qualify leads in the conversation.",
  },
  {
    icon: FileCheck2,
    title: "Claims",
    text: "Intake claims and provide status updates automatically.",
  },
  {
    icon: RefreshCw,
    title: "Renewals",
    text: "Reminders and payment prompts over SMS and WhatsApp.",
  },
  {
    icon: Bot,
    title: "Policy questions",
    text: "Answer coverage questions around the clock.",
  },
]

const FAQS = [
  {
    q: "Can it qualify leads?",
    a: "Yes, with dynamic questions and scoring.",
  },
  {
    q: "Can it handle claims intake?",
    a: "Yes, with status updates.",
  },
  {
    q: "Is it secure?",
    a: "Yes — SSO, audit logs, and role-based access.",
  },
]

export default function InsurancePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industry" },
          { name: "Insurance", path: "/industry/insurance" },
        ]}
      />
      <SiteHeader />

      <main className="flex-1">
        {/* ── HERO ──────────────────────────────────────────────── */}
        <ProductHero
          compact
          eyebrow="Insurance"
          title={
            <>
              Agentic AI for <span className="text-primary">Insurance</span>
            </>
          }
          subtitle="Guide quotes, claims, and renewals across every channel with agents that act and escalate."
          primaryCta={{ label: "Get a Demo", href: "/company/contact/" }}
          secondaryCta={{ label: "Talk to Sales", href: "/company/contact/" }}
          trustBar={[
            { icon: ShieldCheck, label: "Built for carriers, brokers, and insurtech" },
            { icon: Clock, label: "Instant guidance, day or night" },
            { icon: Bot, label: "Agents that act and escalate" },
            { icon: Handshake, label: "Human handoff built in" },
          ]}
          visual={
            <SolutionHeroVisual
              tagLabel="Policyholder feed"
              tagIcon={Umbrella}
              volumeLabel="Policyholder touchpoints today"
              volumeValue="7,286"
              messages={[
                {
                  channel: "SMS",
                  sender: "Premium due",
                  body: "Your health policy premium installment is due on 10 Jul. Pay now: smsl.in/pay92k",
                  time: "just now",
                  status: "delivered",
                },
                {
                  channel: "WhatsApp",
                  sender: "Claim update",
                  body: "Claim #CLM48213 is under review. Surveyor visit scheduled for 5 Jul, 11 AM.",
                  time: "6m ago",
                  status: "read",
                },
                {
                  channel: "WhatsApp",
                  sender: "Agent · Claims",
                  body: "Got it — your documents are complete. An adjuster will review within 2 business days.",
                  time: "20m ago",
                  status: "read",
                },
              ]}
            />
          }
        />

        {/* ── THE PROBLEM ───────────────────────────────────────── */}
        <Section tone="light">
          <SectionHeader
            eyebrow="The problem"
            title="Slow service on quotes and claims drives churn."
          />
          <div className="mt-10">
            <IndustryPain
              paragraphs={[
                "Insurance customers want fast answers on quotes and claims, and slow service drives churn. A premium reminder that never lands means a lapsed policy. A claim that sits unopened because first notice of loss only happens over a phone call means frustration, and often a complaint.",
                "Agentic AI guides them through each step and routes complex cases to your team — capturing first notice of loss, checking document completeness, and keeping policyholders updated at every stage of a claim, while anything needing judgment goes to a human adjuster.",
              ]}
              stat={{
                value: "1 thread",
                label: "per policyholder — quotes, claims, renewals, and campaigns in one channel.",
              }}
            />
          </div>
        </Section>

        {/* ── WHY IT WORKS ──────────────────────────────────────── */}
        <Section tone="muted">
          <SectionHeader
            eyebrow="Why it works"
            title="Instant guidance, human judgment where it matters."
            subtitle="Customers get instant guidance, agents handle the complex claims, and reminders keep policies active."
          />
          <RelevantProductsGrid
            items={[
              {
                icon: UserCheck,
                title: "Quotes and lead qualification",
                description:
                  "Assist with quotes and qualify leads in the conversation with dynamic questions and scoring, day or night.",
                href: "/products/ai-agents/lead-qualification/",
                linkLabel: "Lead qualification agent details",
              },
              {
                icon: FileCheck2,
                title: "Claims intake and status updates",
                description:
                  "Capture first notice of loss and send automated status updates at every stage — submitted, under review, settled.",
                href: "/products/ai-agentic/",
                linkLabel: "Agentic AI details",
              },
              {
                icon: ShieldCheck,
                title: "Secure by design",
                description:
                  "SSO, audit logs, and role-based access so your compliance and security teams stay in control.",
                href: "/platform/security/",
                linkLabel: "Security details",
              },
              {
                icon: Handshake,
                title: "Why SMSLocal",
                description:
                  "Quotes, claims, and renewals share one record across every channel and campaign.",
                href: "/compare/",
                linkLabel: "See how we compare",
              },
            ]}
          />
        </Section>

        {/* ── USE CASES ─────────────────────────────────────────── */}
        <Section tone="light">
          <SectionHeader eyebrow="Use cases" title="Every policyholder moment, covered." />
          <ul className="mt-12 grid gap-3 md:grid-cols-2">
            {USE_CASES.map((uc) => {
              const Icon = uc.icon
              return (
                <li
                  key={uc.title}
                  className="flex items-start gap-3 rounded-xl border border-border bg-background p-4"
                >
                  <span className="mt-0.5 inline-flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/15">
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>
                  <span className="text-sm leading-relaxed text-foreground sm:text-[15px]">
                    <span className="font-semibold">{uc.title}.</span> {uc.text}
                  </span>
                </li>
              )
            })}
          </ul>
        </Section>

        {/* ── FAQ ───────────────────────────────────────────────── */}
        <Faq eyebrow="FAQ" title="Questions we hear from insurers and brokers." items={FAQS} />

        {/* ── INTERNAL LINKS ────────────────────────────────────── */}
        <Section tone="muted">
          <div className="mx-auto max-w-3xl">
            <SectionHeader eyebrow="Explore more" title="Related resources" />
            <ul className="mt-6 space-y-3">
              {[
                { href: "/products/ai-agents/lead-qualification/", label: "AI Agents — lead qualification" },
                { href: "/products/ai-agentic/", label: "Agentic AI — act, not just answer" },
                { href: "/platform/security/", label: "Platform Security — SSO, audit logs, RBAC" },
                { href: "/compare/", label: "See how SMSLocal compares" },
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
          title="Guide policyholders with agentic AI."
          subtitle="Quotes, claims, and renewals handled by agents that act and escalate."
          primaryCta={{ label: "Get a Demo", href: "/company/contact/" }}
          secondaryCta={{ label: "Talk to Sales", href: "/company/contact/" }}
        />
      </main>

      <SiteFooter />
    </div>
  )
}
