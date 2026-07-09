import type { Metadata } from "next"
import { getPageMetadata } from "@/lib/seo"
import {
  Banknote,
  Bell,
  CalendarClock,
  CreditCard,
  Database,
  FileKey2,
  Fingerprint,
  Landmark,
  Layers,
  Lock,
  ReceiptText,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  Wallet,
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
export const metadata: Metadata = getPageMetadata("/solutions/banking-fintech")

const USE_CASES = [
  { icon: Fingerprint, text: "Login and transaction 2FA OTPs" },
  { icon: CreditCard, text: "Debit and credit card transaction alerts" },
  { icon: Wallet, text: "UPI transaction confirmations" },
  { icon: ReceiptText, text: "Loan application status updates" },
  { icon: FileKey2, text: "KYC document submission via WhatsApp" },
  { icon: Bell, text: "Monthly statement delivery notifications" },
  { icon: ShieldAlert, text: "Fraud and suspicious-activity alerts" },
  { icon: Layers, text: "Account activity and balance summaries" },
  { icon: CalendarClock, text: "EMI and due-date reminders" },
  { icon: Banknote, text: "Policy renewal reminders (insurance)" },
]

const FAQS = [
  {
    q: "Do you sign Data Processing Addendums with regulated customers?",
    a: "Yes — our standard DPA is available at /legal/dpa. Our team can also review your counter-signed version for enterprise agreements.",
  },
  {
    q: "Are your OTP routes dedicated?",
    a: "Yes. OTP traffic runs on a separate priority route, isolated from bulk promotional traffic, with automatic retry on failure.",
  },
  {
    q: "Can I enforce idempotency on OTP API calls?",
    a: "Yes. Every /v1/otp/send request accepts an idempotency_key header so retried requests never trigger duplicate OTP sends or extra charges.",
  },
  {
    q: "What audit trail do I get for regulators?",
    a: "Every message is logged with timestamp, sender, recipient, template ID, carrier, delivery status, and cost. The full log is exportable per account and per sub-account.",
  },
]

export default function BankingFintechSolutionPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Solutions", path: "/solutions" },
          { name: "Banking & Fintech", path: "/solutions/banking-fintech" },
        ]}
      />      <SiteHeader />

      <main className="flex-1">
        <ProductHero
          compact
          eyebrow="Banking & Fintech"
          title={
            <>
              Secure, compliant messaging for{" "}
              <span className="text-primary">banks and fintechs</span>.
            </>
          }
          subtitle="OTP delivery in under a second, transaction alerts that always arrive, KYC flows that stay compliant, and WhatsApp utility messaging that respects DPDPA."
          primaryCta={{ label: "Start Free — ₹60 Credit", href: "/signup" }}
          secondaryCta={{ label: "Talk to Sales", href: "/company/contact" }}
          trustBar={[
            { icon: Zap, label: "Sub-second OTP routing" },
            { icon: ShieldCheck, label: "DLT-registered templates" },
            { icon: Lock, label: "DPDPA-aware architecture" },
            { icon: Database, label: "India-resident infrastructure" },
          ]}
          visual={
            <SolutionHeroVisual
              tagLabel="Secure fintech stream"
              tagIcon={Landmark}
              volumeLabel="OTP and alert traffic today"
              volumeValue="3.4M"
              messages={[
                {
                  channel: "OTP",
                  sender: "2FA · Login verification",
                  body: "845712 is your one-time password. Do not share.",
                  time: "just now",
                  status: "delivered",
                },
                {
                  channel: "SMS",
                  sender: "Transaction alert",
                  body: "INR 12,499 debited from A/c XX3482 via UPI to Amazon.",
                  time: "1m ago",
                  status: "delivered",
                },
                {
                  channel: "WhatsApp",
                  sender: "KYC assistant",
                  body: "Hi Priya — please upload your PAN to continue. Your data stays in India.",
                  time: "3m ago",
                  status: "read",
                },
                {
                  channel: "SMS",
                  sender: "Fraud alert",
                  body: "Unusual login from Chennai. Tap to confirm or secure your account.",
                  time: "6m ago",
                  status: "delivered",
                },
              ]}
            />
          }
        />

        {/* The problem */}
        <Section tone="light">
          <SectionHeader
            eyebrow="The problem"
            title="SMS platforms are built for marketers. You need one built for engineers."
          />
          <div className="mt-10">
            <IndustryPain
              paragraphs={[
                "A financial OTP that takes eight seconds isn't an OTP — it's a customer-support ticket. A transaction alert that misses one customer in a hundred is a compliance risk and a reputational risk.",
                "Most SMS platforms were designed for promotional blasts. Regulated messaging needs dedicated routes, strict idempotency, India-resident infrastructure, and an audit trail your compliance team can hand straight to a regulator.",
              ]}
              stat={{
                value: "Sub-1s",
                label: "median OTP delivery on clean DLT traffic — on a priority route isolated from promotional bulk.",
              }}
            />
          </div>
        </Section>

        {/* How SMSLocal solves it */}
        <Section tone="muted">
          <SectionHeader
            eyebrow="How SMSLocal solves it"
            title="A messaging stack regulated messaging actually deserves."
            subtitle="Priority OTP routes, DLT-approved transactional templates, WhatsApp for KYC flows, and a compliance layer designed around DPDPA 2023."
          />
          <RelevantProductsGrid
            items={[
              {
                icon: Fingerprint,
                title: "OTP API with priority route",
                description:
                  "Dedicated infrastructure separated from promotional bulk. Automatic retry, idempotency keys, and fallback logic for failed OTPs.",
                href: "/products/otp-sms",
                linkLabel: "OTP API details",
              },
              {
                icon: CreditCard,
                title: "Transaction alerts over DLT-approved SMS",
                description:
                  "Pre-registered templates for every common event — credit, debit, UPI, failed transaction, card swipe — with carrier-level audit logs.",
                href: "/products/bulk-sms",
                linkLabel: "Transactional SMS details",
              },
              {
                icon: Smartphone,
                title: "KYC and onboarding over WhatsApp",
                description:
                  "Document upload, selfie submission, and follow-up questions — in the customer's language, with end-to-end encryption in transit.",
                href: "/products/whatsapp-business-api",
                linkLabel: "WhatsApp details",
              },
              {
                icon: ShieldCheck,
                title: "Compliance and audit layer",
                description:
                  "DLT entity, Sender ID, and PE certificate management in the dashboard. Data residency in India. Exportable logs for regulators.",
                href: "/pricing",
                linkLabel: "See enterprise options",
              },
            ]}
          />
        </Section>

        {/* Use cases */}
        <Section tone="light">
          <SectionHeader eyebrow="Use cases" title="Every fintech touchpoint, on one stack." />
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
            eyebrow="Regulatory note"
            title="RBI, SEBI, TRAI and DPDPA — covered by default."
          >
            <p>
              Banking-related messaging in India is restricted to verified senders. TRAI DLT compliance is mandatory,
              and customer data must reside in India under the DPDPA 2023 framework.
            </p>
            <p>
              SMSLocal runs on India-based infrastructure and supports all three regimes out of the box — including
              DLT entity management, signed DPAs for regulated customers, and audit-ready exports.
            </p>
          </ComplianceCallout>
        </Section>

        <Faq
          eyebrow="FAQ"
          title="Questions our engineering and compliance teams get most."
          items={FAQS}
        />

        <RelatedContent path="/solutions/banking-fintech" />

        <ProductFinalCta
          title="Built for regulated messaging."
          subtitle="Start with ₹60 free credit and priority OTP routing from day one. Talk to sales for enterprise SLAs, sub-accounts, and signed DPAs."
          primaryCta={{ label: "Start Free — ₹60 Credit", href: "/signup" }}
          secondaryCta={{ label: "Talk to Sales", href: "/company/contact" }}
        />
      </main>

      <SiteFooter />
    </div>
  )
}
