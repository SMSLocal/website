import type { Metadata } from "next"
import { getPageMetadata } from "@/lib/seo"
import {
  BellRing,
  Bot,
  CalendarCheck,
  ClipboardList,
  FileHeart,
  FlaskConical,
  HeartPulse,
  Languages,
  Megaphone,
  MessageCircleHeart,
  Pill,
  ShieldCheck,
  Siren,
  Stethoscope,
  Syringe,
  Zap,
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
export const metadata: Metadata = getPageMetadata("/solutions/healthcare")

const USE_CASES = [
  { icon: CalendarCheck, text: "Appointment confirmation and 24-hour reminders" },
  { icon: Pill, text: "Prescription refill reminders" },
  { icon: FlaskConical, text: "Lab result ready notifications with secure portal links" },
  { icon: Syringe, text: "Vaccination schedule and booster reminders" },
  { icon: MessageCircleHeart, text: "Post-surgery and chronic-care follow-ups" },
  { icon: Megaphone, text: "Opt-in health tips and wellness campaigns" },
  { icon: Siren, text: "Emergency broadcasts to the patient roster" },
  { icon: ClipboardList, text: "Insurance pre-authorisation updates" },
]

const FAQS = [
  {
    q: "Can I send lab reports directly inside a WhatsApp message?",
    a: "Not in the message body. Send a link to a secure patient portal where the patient logs in. This keeps PHI out of any intermediate store and preserves your audit trail.",
  },
  {
    q: "What about HIPAA compliance?",
    a: "HIPAA is US-specific. India operates under the DPDPA 2023 framework. SMSLocal runs on India-based infrastructure and signs DPAs with healthcare customers.",
  },
  {
    q: "Which Indian languages are supported?",
    a: "SMS supports every major Indian script via Unicode — Hindi, Tamil, Telugu, Bengali, Marathi, Gujarati, Kannada, Malayalam, Punjabi, Odia and more. WhatsApp templates accept 11 Indian languages at the platform level (Meta's capability). Our AI WhatsApp agent replies in 8 Indian languages today — Hindi, English, Tamil, Telugu, Bengali, Marathi, Gujarati, and Kannada — with Malayalam, Punjabi, and Urdu on the near-term roadmap.",
  },
  {
    q: "Can different clinics or branches share one account?",
    a: "Yes. Create sub-accounts per branch with their own sender IDs, DLT templates, and budget caps — all under a single master wallet and billing.",
  },
]

export default function HealthcareSolutionPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Solutions", path: "/solutions" },
          { name: "Healthcare", path: "/solutions/healthcare" },
        ]}
      />      <SiteHeader />

      <main className="flex-1">
        <ProductHero
          eyebrow="Healthcare"
          title={
            <>
              Patient messaging that <span className="text-primary">reduces no-shows</span> and improves care.
            </>
          }
          subtitle="Appointment reminders, prescription refills, lab result notifications, and chronic-care follow-ups — delivered in the language the patient understands."
          primaryCta={{ label: "Start Free — ₹60 Credit", href: "https://app.smslocal.in/signup" }}
          secondaryCta={{ label: "See Pricing", href: "/pricing" }}
          trustBar={[
            { icon: ShieldCheck, label: "DLT-compliant templates" },
            { icon: Languages, label: "10+ Indian scripts via SMS" },
            { icon: Bot, label: "AI WhatsApp in 8 languages" },
            { icon: Zap, label: "Secure portal links, not PHI" },
          ]}
          visual={
            <SolutionHeroVisual
              tagLabel="Clinic messaging feed"
              tagIcon={HeartPulse}
              volumeLabel="Patient touchpoints today"
              volumeValue="4,218"
              messages={[
                {
                  channel: "SMS",
                  sender: "Appointment reminder",
                  body: "Reminder: Dr. Iyer tomorrow at 11:00 AM, Apollo Koramangala.",
                  time: "just now",
                  status: "delivered",
                },
                {
                  channel: "WhatsApp",
                  sender: "Patient Q&A · AI agent",
                  body: "Namaste, clinic kal Sunday ko 10 se 2 tak open hai. Any other help?",
                  time: "2m ago",
                  status: "read",
                },
                {
                  channel: "SMS",
                  sender: "Lab reports ready",
                  body: "Your lab report is ready. View securely: portal.clinic.in/r/XA2",
                  time: "5m ago",
                  status: "delivered",
                },
                {
                  channel: "WhatsApp",
                  sender: "Refill reminder",
                  body: "Priya — your BP medication refill is due on Friday. Order on UPI →",
                  time: "9m ago",
                  status: "read",
                },
              ]}
            />
          }
        />

        {/* The problem */}
        <Section tone="light">
          <SectionHeader
            eyebrow="The problem"
            title="No-shows and language barriers quietly tax every clinic."
          />
          <div className="mt-10">
            <IndustryPain
              paragraphs={[
                "Missed appointments cost Indian clinics 15–25% of their daily schedule. Lab-result delivery by phone call is slow and error-prone. Care instructions sent only in English reach fewer than half of the patients who actually need them.",
                "What you really need is a messaging layer that speaks the patient's language, respects medical privacy, and integrates with the HIS or EMR you already run — without becoming another system your front-desk has to babysit.",
              ]}
              stat={{
                value: "15–25%",
                label: "of daily clinic schedules lost to no-shows — a direct opportunity for day-before and same-day reminders.",
              }}
            />
          </div>
        </Section>

        {/* How SMSLocal solves it */}
        <Section tone="muted">
          <SectionHeader
            eyebrow="How SMSLocal solves it"
            title="Messaging built around how Indian patients actually communicate."
            subtitle="DLT-compliant SMS for scheduled reminders, secure WhatsApp links for sensitive content, and an AI agent that handles the easy questions so your staff can focus on care."
          />
          <RelevantProductsGrid
            items={[
              {
                icon: CalendarCheck,
                title: "Appointment reminders",
                description:
                  "DLT-approved transactional templates, scheduled day-before and same-day, with a WhatsApp follow-up for patients who prefer reading the reminder.",
                href: "/products/bulk-sms",
                linkLabel: "Transactional SMS details",
              },
              {
                icon: FileHeart,
                title: "Lab results via secure WhatsApp link",
                description:
                  "Send a link to your secure patient portal. WhatsApp's end-to-end encryption keeps the message private in transit; the report never lives in the message body.",
                href: "/products/whatsapp-business-api",
                linkLabel: "WhatsApp details",
              },
              {
                icon: Languages,
                title: "Multilingual patient reach",
                description:
                  "SMS in 10+ Indian scripts via Unicode. AI WhatsApp replies in 8 Indian languages today — Hindi, English, Tamil, Telugu, Bengali, Marathi, Gujarati, Kannada — with Malayalam, Punjabi, Urdu on the roadmap.",
                href: "/products/whatsapp-business-api",
                linkLabel: "AI agent details",
              },
              {
                icon: Stethoscope,
                title: "AI-assisted patient Q&A",
                description:
                  "An AI WhatsApp agent answers common queries (clinic hours, directions, insurance accepted) and hands medical questions to a human clinician with full chat context.",
                href: "/products/whatsapp-business-api",
                linkLabel: "AI agent details",
              },
            ]}
          />
        </Section>

        {/* Use cases */}
        <Section tone="light">
          <SectionHeader
            eyebrow="Use cases"
            title="Every patient-facing touchpoint, in one place."
          />
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

        {/* Compliance */}
        <Section tone="muted">
          <ComplianceCallout
            variant="strict"
            eyebrow="Privacy note"
            title="Keep PHI out of message bodies. Always link to a secure portal."
          >
            <p>
              Healthcare messaging in India requires patient consent for marketing content and DLT compliance for all
              commercial messaging. Medical information should never appear in the plain-text body of an SMS — use a
              link to a secure portal or send via WhatsApp where end-to-end encryption applies in transit.
            </p>
            <p>
              SMSLocal signs DPAs with healthcare customers and runs on India-resident infrastructure under the DPDPA
              2023 framework.
            </p>
          </ComplianceCallout>
        </Section>

        <Faq
          eyebrow="FAQ"
          title="Common questions from hospital and clinic teams."
          items={FAQS}
        />

        <RelatedContent path="/solutions/healthcare" />

        <ProductFinalCta
          title="Better patient communication starts here."
          subtitle={"Try the full stack free with ₹60 credit. No plan, no card, no lock-in \u2014 and every message is DLT-compliant by default."}
          primaryCta={{ label: "Start Free — ₹60 Credit", href: "https://app.smslocal.in/signup" }}
          secondaryCta={{ label: "See Pricing", href: "/pricing" }}
        />
      </main>

      <SiteFooter />
    </div>
  )
}
