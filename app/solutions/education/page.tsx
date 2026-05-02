import type { Metadata } from "next"
import { getPageMetadata } from "@/lib/seo"
import {
  Bot,
  Bus,
  CalendarDays,
  ClipboardCheck,
  CreditCard,
  FileCheck,
  GraduationCap,
  IndianRupee,
  Languages,
  MessageCircle,
  Plane,
  School,
  Shield,
  ShieldCheck,
  UserCheck,
  Users,
} from "lucide-react"

import { AnnouncementStrip } from "@/components/landing/announcement-strip"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { RelatedContent } from "@/components/shared/related-content"
import {
  Faq,
  ProductFinalCta,
  ProductHero,
  Section,
  SectionHeader,
} from "@/components/product/product-page"
import {
  ComplianceCallout,
  IndustryPain,
  RelevantProductsGrid,
} from "@/components/solution/solution-page"
import { SolutionHeroVisual } from "@/components/solution/solution-hero-visual"
import { BreadcrumbJsonLd } from "@/components/seo/json-ld"

// ─── SEO — edit lib/seo/registry.ts or open /dev/seo to preview ──────────────
export const metadata: Metadata = getPageMetadata("/solutions/education")

const USE_CASES = [
  { icon: IndianRupee, text: "Fee payment reminders with UPI link" },
  { icon: CalendarDays, text: "Exam timetable announcements" },
  { icon: ClipboardCheck, text: "Result and report card availability alerts" },
  { icon: UserCheck, text: "Daily absence notifications to parents" },
  { icon: Users, text: "PTA meeting reminders" },
  { icon: FileCheck, text: "Admission application status updates" },
  { icon: GraduationCap, text: "Scholarship eligibility alerts" },
  { icon: Plane, text: "Holiday and event communication" },
  { icon: Bus, text: "Bus route or timing changes" },
  { icon: Shield, text: "Transport safety and arrival notifications" },
]

const FAQS = [
  {
    q: "Can I segment messages by class or section?",
    a: "Yes. Upload segmented contact lists or tag contacts in the dashboard, then send targeted broadcasts to any subset — Class 8, Section B, Maths electives, you name it.",
  },
  {
    q: "Is the parent-teacher inbox shared among multiple teachers?",
    a: "Yes. SMSLocal's shared team inbox lets multiple teachers handle parent conversations, with conversation assignment, internal notes, and handoff history.",
  },
  {
    q: "Do you offer pricing for non-profit schools?",
    a: "We have a discount policy for verified educational non-profits. Get in touch from /company/contact with your registration details and we'll set you up.",
  },
  {
    q: "Can each branch of our school group have its own sender ID?",
    a: "Yes. Create sub-accounts per branch or campus with their own DLT-registered sender IDs, templates, and wallets — all rolling up into one master invoice.",
  },
]

export default function EducationSolutionPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Solutions", path: "/solutions" },
          { name: "Education & EdTech", path: "/solutions/education" },
        ]}
      />
      <AnnouncementStrip />
      <SiteHeader />

      <main className="flex-1">
        <ProductHero
          eyebrow="Education & EdTech"
          title={
            <>
              Messaging that keeps <span className="text-primary">students, parents, and staff</span> in sync.
            </>
          }
          subtitle="Fee reminders, exam schedules, result announcements, and day-to-day parent communication — in the language the family reads at home."
          primaryCta={{ label: "Start Free — ₹60 Credit", href: "/signup" }}
          secondaryCta={{ label: "See Pricing", href: "/pricing" }}
          trustBar={[
            { icon: ShieldCheck, label: "DLT-registered institution templates" },
            { icon: Languages, label: "10+ Indian scripts for SMS" },
            { icon: Users, label: "Shared inbox across teachers" },
            { icon: Bot, label: "AI WhatsApp in 8 languages" },
          ]}
          visual={
            <SolutionHeroVisual
              tagLabel="Campus messaging feed"
              tagIcon={School}
              volumeLabel="Parent and student touchpoints"
              volumeValue="8,912"
              messages={[
                {
                  channel: "SMS",
                  sender: "Fees due reminder",
                  body: "Term 2 fees: INR 18,500. Pay via UPI by 20 Oct →",
                  time: "just now",
                  status: "delivered",
                },
                {
                  channel: "WhatsApp",
                  sender: "PTA assistant · AI agent",
                  body: "Namaskar, agli PTA meeting Saturday 11 AM hai. Need directions?",
                  time: "3m ago",
                  status: "read",
                },
                {
                  channel: "SMS",
                  sender: "Results published",
                  body: "Term 1 results are now available in the parent portal.",
                  time: "7m ago",
                  status: "delivered",
                },
                {
                  channel: "WhatsApp",
                  sender: "Bus delay · Route 12",
                  body: "Bus delayed by 20 mins due to rain. Pickup at 3:10 PM.",
                  time: "12m ago",
                  status: "read",
                },
              ]}
            />
          }
        />

        <Section tone="light">
          <SectionHeader eyebrow="The problem" title="Three audiences, three languages, one hard-to-reach parent." />
          <div className="mt-10">
            <IndustryPain
              paragraphs={[
                "Schools, coaching institutes, and EdTech platforms communicate with three audiences — students, parents, and staff — each on different phones, in different languages, with different urgency levels.",
                "English-only SMS misses half of the parents who actually need the message. WhatsApp broadcasts at classroom scale need business-grade tooling, not group chats that hit the 256-member cap on your third blast.",
              ]}
              stat={{
                value: "50%+",
                label: "of Indian parents read home in a language that isn't English. Multilingual SMS closes that gap.",
              }}
            />
          </div>
        </Section>

        <Section tone="muted">
          <SectionHeader
            eyebrow="How SMSLocal solves it"
            title="One dashboard for the whole institution."
            subtitle="Scheduled transactional SMS for fees and schedules, WhatsApp broadcasts for results and events, an AI agent for routine parent questions, and OTPs for admission flows."
          />
          <RelevantProductsGrid
            items={[
              {
                icon: IndianRupee,
                title: "Fee and fine reminders",
                description:
                  "Scheduled, DLT-approved transactional SMS with a UPI deep-link. Cuts follow-up calls to the front desk dramatically.",
                href: "/products/bulk-sms",
                linkLabel: "Transactional SMS details",
              },
              {
                icon: CalendarDays,
                title: "Exam schedules and result drops",
                description:
                  "Broadcast to 10,000+ students or parents at once over Bulk SMS or WhatsApp, in Hindi, Tamil, Marathi, or whatever language each family reads.",
                href: "/products/bulk-sms",
                linkLabel: "Bulk SMS details",
              },
              {
                icon: MessageCircle,
                title: "Parent-teacher AI WhatsApp",
                description:
                  "The AI answers routine questions — PTA timing, holiday list, uniform supplier — and hands grades or discipline questions to the teacher with full context.",
                href: "/products/whatsapp-business-api",
                linkLabel: "WhatsApp details",
              },
              {
                icon: FileCheck,
                title: "Admissions and enrolment flows",
                description:
                  "OTP verification at form start, document submission via WhatsApp, and application status updates by SMS. All auditable in one dashboard.",
                href: "/products/otp-sms",
                linkLabel: "OTP API details",
              },
            ]}
          />
        </Section>

        <Section tone="light">
          <SectionHeader eyebrow="Use cases" title="Every message a school group sends in a term." />
          <ul className="mt-12 grid gap-3 md:grid-cols-2">
            {USE_CASES.map((uc) => {
              const Icon = uc.icon
              return (
                <li
                  key={uc.text}
                  className="flex items-start gap-3 rounded-xl border border-border bg-background p-4"
                >
                  <span className="mt-0.5 inline-flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/15">
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>
                  <span className="text-sm leading-relaxed text-foreground sm:text-[15px]">{uc.text}</span>
                </li>
              )
            })}
          </ul>
        </Section>

        <Section tone="muted">
          <ComplianceCallout title="DLT-registered institution templates — pre-approved and reusable.">
            <p>
              Education messaging sits comfortably inside India&apos;s DLT regime. Fee reminders, exam schedules, and
              result notifications all qualify as transactional — DND-exempt when sent on a pre-approved template.
            </p>
            <p>
              SMSLocal helps you register your DLT entity and get institution-specific templates approved once, then
              reuse them across every campus under the same master account.
            </p>
          </ComplianceCallout>
        </Section>

        <Faq eyebrow="FAQ" title="What school administrators ask us first." items={FAQS} />

        <RelatedContent path="/solutions/education" />

        <ProductFinalCta
          title="Communication that reaches every family."
          subtitle="Start with ₹60 free credit and DLT-compliant templates from day one."
          primaryCta={{ label: "Start Free — ₹60 Credit", href: "/signup" }}
          secondaryCta={{ label: "See Pricing", href: "/pricing" }}
        />
      </main>

      <SiteFooter />
    </div>
  )
}
