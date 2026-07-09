import type { Metadata } from "next"
import Link from "next/link"
import { getPageMetadata } from "@/lib/seo"
import {
  ArrowRight,
  Bot,
  Clock,
  FileText,
  Handshake,
  Home,
  ShieldCheck,
  TrendingUp,
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
export const metadata: Metadata = getPageMetadata("/industry/mortgage")

const USE_CASES = [
  {
    icon: UserCheck,
    title: "Pre-qualification",
    text: "Capture and qualify borrowers in the conversation.",
  },
  {
    icon: FileText,
    title: "Document collection",
    text: "Reminders for the paperwork that stalls applications.",
  },
  {
    icon: TrendingUp,
    title: "Status updates",
    text: "Rate and milestone updates over SMS and WhatsApp.",
  },
  {
    icon: Bot,
    title: "Application support",
    text: "Answer questions around the clock and route complex cases.",
  },
]

const FAQS = [
  {
    q: "Can it pre-qualify?",
    a: "Yes, with dynamic questions and scoring.",
  },
  {
    q: "Can it chase documents?",
    a: "Yes, with automated reminders.",
  },
  {
    q: "Which channels?",
    a: "SMS, WhatsApp, web, and more.",
  },
]

export default function MortgagePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industry" },
          { name: "Mortgage & Home Loans", path: "/industry/mortgage" },
        ]}
      />
      <SiteHeader />

      <main className="flex-1">
        {/* ── HERO ──────────────────────────────────────────────── */}
        <ProductHero
          compact
          eyebrow="Mortgage & Home Loans"
          title={
            <>
              Agentic AI for <span className="text-primary">Mortgage</span>
            </>
          }
          subtitle="Move borrowers from inquiry to close with agents that qualify, remind, and update across channels."
          primaryCta={{ label: "Get a Demo", href: "/company/contact/" }}
          secondaryCta={{ label: "Talk to Sales", href: "/company/contact/" }}
          trustBar={[
            { icon: ShieldCheck, label: "Built for lenders and mortgage/home-loan brokers" },
            { icon: Clock, label: "Pre-qualification around the clock" },
            { icon: Bot, label: "Agents that qualify, remind, and update" },
            { icon: Handshake, label: "Human handoff for approvals" },
          ]}
          visual={
            <SolutionHeroVisual
              tagLabel="Borrower feed"
              tagIcon={Home}
              volumeLabel="Borrower touchpoints today"
              volumeValue="5,127"
              messages={[
                {
                  channel: "SMS",
                  sender: "EMI due",
                  body: "Your home loan EMI installment is due on 5 Jul. Ensure sufficient balance.",
                  time: "just now",
                  status: "delivered",
                },
                {
                  channel: "WhatsApp",
                  sender: "Application update",
                  body: "Your loan application LN-88213 has moved to Technical Valuation stage.",
                  time: "9m ago",
                  status: "read",
                },
                {
                  channel: "WhatsApp",
                  sender: "Agent · Eligibility",
                  body: "Based on your monthly income, here's your estimated eligibility. Want a callback from an RM?",
                  time: "24m ago",
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
            title="Slow follow-up loses borrowers to the next lender."
          />
          <div className="mt-10">
            <IndustryPain
              paragraphs={[
                "Mortgage/home-loan journeys are long and document-heavy, and borrowers drop off when follow-up is slow. Every stage depends on a document or a signature that's easy to lose track of over email, and a website inquiry that comes in at 9 PM sits untouched until a relationship manager calls back the next afternoon — by which time the borrower has already spoken to two other lenders.",
                "Agentic AI keeps applications moving and borrowers informed — capturing income, loan amount, and eligibility basics the moment a lead comes in, and chasing the paperwork that stalls applications with automated reminders.",
              ]}
              stat={{
                value: "1 thread",
                label: "per borrower — pre-qualification, documents, and status updates in one channel.",
              }}
            />
          </div>
        </Section>

        {/* ── WHY IT WORKS ──────────────────────────────────────── */}
        <Section tone="muted">
          <SectionHeader
            eyebrow="Why it works"
            title="Borrowers stay engaged, documents arrive faster."
            subtitle="Borrowers stay engaged, documents arrive faster, and your team focuses on underwriting, not chasing updates."
          />
          <RelevantProductsGrid
            items={[
              {
                icon: UserCheck,
                title: "Pre-qualification",
                description:
                  "Capture and qualify borrowers in the conversation with dynamic questions and scoring, day or night.",
                href: "/products/ai-agents/lead-qualification/",
                linkLabel: "Lead qualification agent details",
              },
              {
                icon: Bot,
                title: "Agentic AI for applications",
                description:
                  "Agents that qualify, remind, and update borrowers automatically, escalating anything needing underwriting judgment to a human.",
                href: "/products/ai-agentic/",
                linkLabel: "Agentic AI details",
              },
              {
                icon: FileText,
                title: "Document reminders",
                description:
                  "Automated reminders for the paperwork that stalls applications, sent over SMS and WhatsApp.",
                href: "/products/bulk-sms/",
                linkLabel: "Bulk SMS details",
              },
              {
                icon: Handshake,
                title: "Why SMSLocal",
                description:
                  "Pre-qualification, reminders, and campaigns share one borrower record across every channel.",
                href: "/compare/",
                linkLabel: "See how we compare",
              },
            ]}
          />
        </Section>

        {/* ── USE CASES ─────────────────────────────────────────── */}
        <Section tone="light">
          <SectionHeader eyebrow="Use cases" title="Every borrower moment, covered." />
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
        <Faq eyebrow="FAQ" title="Questions we hear from lenders and NBFCs." items={FAQS} />

        {/* ── INTERNAL LINKS ────────────────────────────────────── */}
        <Section tone="muted">
          <div className="mx-auto max-w-3xl">
            <SectionHeader eyebrow="Explore more" title="Related resources" />
            <ul className="mt-6 space-y-3">
              {[
                { href: "/products/ai-agents/lead-qualification/", label: "AI Agents — borrower pre-qualification" },
                { href: "/products/ai-agentic/", label: "Agentic AI — act, not just answer" },
                { href: "/products/bulk-sms/", label: "Bulk SMS — EMI and document reminders" },
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
          title="Close more loans with agentic AI."
          subtitle="Pre-qualification, document reminders, and status updates handled by agents that act."
          primaryCta={{ label: "Get a Demo", href: "/company/contact/" }}
          secondaryCta={{ label: "Talk to Sales", href: "/company/contact/" }}
        />
      </main>

      <SiteFooter />
    </div>
  )
}
