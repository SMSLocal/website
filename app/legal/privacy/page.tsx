import type { Metadata } from "next"
import { Callout, LegalDoc, Li, P, Strong, Ul } from "@/components/legal/legal-doc"
import { BreadcrumbJsonLd } from "@/components/seo/json-ld"
import { getPageMetadata } from "@/lib/seo"

// ─── SEO — edit lib/seo/registry.ts or open /dev/seo to preview ──────────────
export const metadata: Metadata = getPageMetadata("/legal/privacy")

const LAST_UPDATED = "April 22, 2026"
const EFFECTIVE_DATE = "April 22, 2026"

export default function PrivacyPolicyPage() {
  return (
    <>
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Legal", path: "/legal/privacy" },
          { name: "Privacy Policy", path: "/legal/privacy" },
        ]}
      />
      <LegalDoc
        category="Privacy"
        title="Privacy Policy"
        summary="This policy explains what personal data SMSLocal processes when you use our platform, why we process it, who we share it with, and the rights you have under India's Digital Personal Data Protection Act, 2023."
        lastUpdated={LAST_UPDATED}
        effectiveDate={EFFECTIVE_DATE}
        relatedLinks={[
          { label: "Terms of service", href: "/legal/terms" },
          { label: "DPDPA notice", href: "/legal/dpdpa" },
          { label: "Cookie policy", href: "/legal/cookie-policy" },
          { label: "Data Processing Addendum", href: "/legal/dpa" },
          { label: "Acceptable use", href: "/legal/acceptable-use" },
          { label: "Refund policy", href: "/legal/refund-policy" },
        ]}
        sections={[
          {
            id: "who-we-are",
            title: "1. Who we are",
            body: (
              <>
                <P>
                  SMSLocal is a messaging platform operated by <Strong>SMSLocal Technologies Private Limited</Strong>,
                  a company incorporated in India. Our registered office address is listed in the{" "}
                  <a href="/company/contact" className="font-medium text-primary hover:underline">
                    contact page
                  </a>
                  . For the purposes of the Digital Personal Data Protection Act, 2023 (&quot;DPDP Act&quot;), we
                  act as a <Strong>Data Fiduciary</Strong> for account-holder data and as a{" "}
                  <Strong>Data Processor</Strong> for end-customer data that our customers route through the
                  platform.
                </P>
              </>
            ),
          },
          {
            id: "scope",
            title: "2. Scope of this policy",
            body: (
              <>
                <P>
                  This policy applies to information we collect when you visit{" "}
                  <Strong>smslocal.in</Strong>, sign up for a workspace, use the dashboard or APIs, attend our
                  events, or contact our sales, support, or legal teams. It does not cover third-party websites
                  you reach through links on our platform.
                </P>
              </>
            ),
          },
          {
            id: "what-we-collect",
            title: "3. What we collect",
            body: (
              <>
                <P>
                  <Strong>Account data</Strong> — name, work email, mobile number, company name, GSTIN, billing
                  address, and password hashes for workspace administrators and team members.
                </P>
                <P>
                  <Strong>Compliance data</Strong> — DLT principal-entity IDs, template IDs, sender IDs, KYC
                  documents required by telecom regulations, and signed declarations of consent source.
                </P>
                <P>
                  <Strong>Usage data</Strong> — API requests, campaign metadata, message counts, delivery
                  reports, IP addresses, browser/device identifiers, and dashboard event logs used for
                  auditing and debugging.
                </P>
                <P>
                  <Strong>Message content routed via the platform</Strong> — SMS bodies, WhatsApp template
                  renders, and webhook payloads. This content belongs to our customers; we process it strictly
                  to deliver the service.
                </P>
                <P>
                  <Strong>Support and communications</Strong> — transcripts of chats, emails, call notes, and
                  screen-share recordings shared during onboarding or troubleshooting.
                </P>
                <Callout>
                  We do not ask for, and you should not send us, sensitive personal data such as passwords for
                  third-party systems, financial account PINs, health records, Aadhaar numbers in full, or
                  biometric identifiers unless an integration explicitly requires it and we have a signed data
                  processing agreement (DPA) covering that use.
                </Callout>
              </>
            ),
          },
          {
            id: "purposes",
            title: "4. Why we process your data",
            body: (
              <>
                <P>We use personal data only for the purposes below:</P>
                <Ul>
                  <Li>Provide, maintain, and secure the SMSLocal platform and APIs.</Li>
                  <Li>Authenticate users, prevent abuse, and investigate fraudulent activity.</Li>
                  <Li>
                    Submit, reconcile, and report DLT-registered traffic to Indian telecom operators and TRAI.
                  </Li>
                  <Li>Generate invoices, reconcile wallet balances, and comply with Indian tax laws.</Li>
                  <Li>Respond to support requests, send service notifications, and share policy updates.</Li>
                  <Li>
                    With your consent, send product updates and marketing communications. You can opt out of
                    marketing at any time from your workspace settings or by replying{" "}
                    <Strong>STOP</Strong> to any promotional message.
                  </Li>
                  <Li>Meet legal, regulatory, and lawful enforcement obligations in India.</Li>
                </Ul>
              </>
            ),
          },
          {
            id: "legal-bases",
            title: "5. Legal bases for processing",
            body: (
              <>
                <P>
                  Under the DPDP Act, we rely on <Strong>consent</Strong> or a recognised{" "}
                  <Strong>legitimate use</Strong> for every processing activity. For contractually necessary
                  processing (operating your workspace, honouring invoices, delivering messages), we rely on
                  the performance-of-contract legitimate use. For fraud prevention, auditing, and safety
                  operations, we rely on the corresponding legitimate uses. For marketing we rely on explicit,
                  revocable consent.
                </P>
              </>
            ),
          },
          {
            id: "sharing",
            title: "6. Who we share data with",
            body: (
              <>
                <P>We share data strictly on a need-to-know basis with:</P>
                <Ul>
                  <Li>
                    <Strong>Indian telecom operators and WhatsApp / Meta</Strong> to actually deliver messages,
                    under the traffic-routing obligations agreed with each carrier.
                  </Li>
                  <Li>
                    <Strong>DLT platforms</Strong> (Jio, Vi, Airtel, BSNL, VIL) for template registration,
                    reporting, and scrubbing as required under TRAI&apos;s TCCCPR regulations.
                  </Li>
                  <Li>
                    <Strong>Payment providers</Strong> (such as Razorpay) for wallet recharges, GST invoicing,
                    and dispute management.
                  </Li>
                  <Li>
                    <Strong>Cloud infrastructure providers</Strong> that host the platform, under contractual
                    data-protection terms.
                  </Li>
                  <Li>
                    <Strong>Professional advisers</Strong> (auditors, lawyers, tax consultants) when required
                    and under confidentiality.
                  </Li>
                  <Li>
                    <Strong>Authorities</Strong> when mandated by a valid legal request served in India.
                  </Li>
                </Ul>
                <P>
                  We do not sell personal data, and we do not share it with advertising networks for profiling
                  or retargeting.
                </P>
              </>
            ),
          },
          {
            id: "cross-border",
            title: "7. Cross-border transfers",
            body: (
              <>
                <P>
                  Message content and operational logs are processed in India wherever technically possible.
                  When we use a sub-processor outside India (for example, a global email-delivery service for
                  our transactional notifications), we transfer data only to jurisdictions not restricted by
                  the Central Government under Section 16 of the DPDP Act, and only under contractual
                  safeguards.
                </P>
              </>
            ),
          },
          {
            id: "retention",
            title: "8. Retention",
            body: (
              <>
                <P>
                  We retain account and billing data for the duration of your workspace plus the period
                  mandated by Indian tax and telecom regulations (typically up to eight years for financial
                  records and the TRAI-mandated window for message metadata). Message content and delivery
                  reports are retained per your workspace&apos;s plan and the retention defaults documented in
                  the dashboard; you can shorten these defaults from Settings → Data.
                </P>
              </>
            ),
          },
          {
            id: "security",
            title: "9. Security",
            body: (
              <>
                <P>
                  We follow industry-standard controls including encryption in transit (TLS 1.2+),
                  encryption at rest for credentials and message payloads, role-based access control, hardened
                  production access, structured audit logs, and regular third-party penetration testing. No
                  system is perfectly secure; if we detect a personal-data breach, we notify the Data
                  Protection Board of India and affected Data Principals within the timelines required by the
                  DPDP Act.
                </P>
              </>
            ),
          },
          {
            id: "your-rights",
            title: "10. Your rights as a Data Principal",
            body: (
              <>
                <P>Under the DPDP Act, if SMSLocal holds personal data about you, you can:</P>
                <Ul>
                  <Li>Request a summary of the personal data we hold and how we use it.</Li>
                  <Li>Request correction or erasure of inaccurate or no-longer-needed data.</Li>
                  <Li>Withdraw consent for any processing that relies on consent.</Li>
                  <Li>Nominate another individual to exercise your rights in the event of your incapacity.</Li>
                  <Li>
                    File a grievance with our Data Protection Officer (details below) and, if unresolved,
                    with the Data Protection Board of India.
                  </Li>
                </Ul>
                <P>
                  To make a request, write to{" "}
                  <a href="mailto:dpo@smslocal.in" className="font-medium text-primary hover:underline">
                    dpo@smslocal.in
                  </a>{" "}
                  with enough detail to verify your identity. We respond to verified requests within 30
                  calendar days.
                </P>
              </>
            ),
          },
          {
            id: "cookies",
            title: "11. Cookies and analytics",
            body: (
              <>
                <P>
                  Our marketing website uses a small number of strictly necessary cookies for session handling
                  and a privacy-respecting analytics tool to measure traffic in aggregate. We do not use
                  third-party advertising cookies. You can disable non-essential cookies from your browser
                  settings.
                </P>
              </>
            ),
          },
          {
            id: "childrens-data",
            title: "12. Children's data",
            body: (
              <>
                <P>
                  SMSLocal is a B2B product intended for businesses and developers. We do not knowingly
                  process personal data of anyone under 18 years of age. If you become aware that a child has
                  shared personal data with us, email{" "}
                  <a href="mailto:dpo@smslocal.in" className="font-medium text-primary hover:underline">
                    dpo@smslocal.in
                  </a>{" "}
                  and we will delete it.
                </P>
              </>
            ),
          },
          {
            id: "updates",
            title: "13. Updates to this policy",
            body: (
              <>
                <P>
                  We review this policy at least annually. Material changes are announced at least 14 days in
                  advance by email to workspace owners and via a banner in the dashboard. The &quot;Last
                  updated&quot; date at the top of this page always reflects the current version.
                </P>
              </>
            ),
          },
          {
            id: "contact",
            title: "14. Contact and grievances",
            body: (
              <>
                <P>
                  For questions about this policy, our data protection practices, or to exercise any of the
                  rights listed above:
                </P>
                <Ul>
                  <Li>
                    <Strong>Data Protection Officer</Strong> —{" "}
                    <a href="mailto:dpo@smslocal.in" className="font-medium text-primary hover:underline">
                      dpo@smslocal.in
                    </a>
                  </Li>
                  <Li>
                    <Strong>Grievance Officer (India)</Strong> —{" "}
                    <a href="mailto:grievance@smslocal.in" className="font-medium text-primary hover:underline">
                      grievance@smslocal.in
                    </a>
                  </Li>
                  <Li>
                    <Strong>Postal address</Strong> — see{" "}
                    <a href="/company/contact" className="font-medium text-primary hover:underline">
                      Contact us
                    </a>
                  </Li>
                </Ul>
              </>
            ),
          },
        ]}
      />
    </>
  )
}
