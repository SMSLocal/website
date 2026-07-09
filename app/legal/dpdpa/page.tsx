import type { Metadata } from "next"
import { Callout, LegalDoc, Li, P, Strong, Ul } from "@/components/legal/legal-doc"
import { BreadcrumbJsonLd } from "@/components/seo/json-ld"
import { getPageMetadata } from "@/lib/seo"

// ─── SEO — edit lib/seo/registry.ts or open /dev/seo to preview ──────────────
export const metadata: Metadata = getPageMetadata("/legal/dpdpa")

export default function DpdpaPage() {
  return (
    <>
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Legal", path: "/legal/dpdpa" },
          { name: "DPDPA Notice", path: "/legal/dpdpa" },
        ]}
      />
      <LegalDoc
        category="DPDP Act"
        title="DPDPA Notice to Data Principals"
        summary="A plain-language summary of what SMSLocal does with personal data, why, for how long, and what you can ask us to do under the Digital Personal Data Protection Act, 2023. This notice supplements the full Privacy Policy."
        lastUpdated="April 22, 2026"
        effectiveDate="April 22, 2026"
        relatedLinks={[
          { label: "Privacy policy", href: "/legal/privacy" },
          { label: "Terms of service", href: "/legal/terms" },
          { label: "Grievance contact", href: "/company/contact" },
        ]}
        sections={[
          {
            id: "purpose",
            title: "1. Why we are giving you this notice",
            body: (
              <>
                <P>
                  Section 5 of the Digital Personal Data Protection Act, 2023 requires every Data Fiduciary
                  to give you a clear notice in plain English (or one of the 22 scheduled Indian languages you
                  choose) describing the personal data being processed and the purpose. This page is our
                  notice in English. On request we will provide a translation in any of the scheduled
                  languages.
                </P>
              </>
            ),
          },
          {
            id: "who",
            title: "2. Who processes your data",
            body: (
              <>
                <P>
                  <Strong>SMSLocal Technologies Private Limited</Strong>, an Indian private limited company,
                  is the Data Fiduciary for account-holder data (dashboard users, billing contacts). When you
                  are the end recipient of a message sent through our platform by one of our customers, that
                  customer is the Data Fiduciary and SMSLocal acts as a Data Processor on their behalf.
                </P>
              </>
            ),
          },
          {
            id: "data-processed",
            title: "3. What personal data we process",
            body: (
              <>
                <Ul>
                  <Li>
                    <Strong>Account data</Strong> — name, email, mobile, company, GSTIN, password hash.
                  </Li>
                  <Li>
                    <Strong>Usage data</Strong> — login events, API requests, dashboard actions, IP address.
                  </Li>
                  <Li>
                    <Strong>Compliance data</Strong> — DLT IDs, template registrations, KYC documents.
                  </Li>
                  <Li>
                    <Strong>Billing data</Strong> — wallet transactions, invoices, tax details.
                  </Li>
                  <Li>
                    <Strong>Message traffic metadata</Strong> — sender, recipient mobile, timestamp, delivery
                    status. Actual content is processed only to deliver the message.
                  </Li>
                </Ul>
              </>
            ),
          },
          {
            id: "purposes",
            title: "4. The purposes",
            body: (
              <>
                <Ul>
                  <Li>Running the platform, dashboards, and APIs.</Li>
                  <Li>Delivering SMS, WhatsApp, and OTP messages to recipients.</Li>
                  <Li>Meeting TRAI, DoT, and operator compliance requirements.</Li>
                  <Li>Billing, invoicing, and GST reporting.</Li>
                  <Li>Security, fraud prevention, and abuse investigation.</Li>
                  <Li>Customer support and product communication.</Li>
                  <Li>With your consent, marketing and product updates.</Li>
                </Ul>
              </>
            ),
          },
          {
            id: "legal-basis",
            title: "5. Legal basis",
            body: (
              <>
                <P>
                  We rely on your consent for marketing. For every other purpose we rely on a legitimate use
                  recognised by Section 7 of the Act — typically performance of contract, compliance with
                  law, or for the safety of our platform.
                </P>
              </>
            ),
          },
          {
            id: "sharing",
            title: "6. Who we share data with",
            body: (
              <>
                <P>
                  Telecom operators, the DLT platforms they rely on (Jio, Vi, Airtel, BSNL, VIL), Meta /
                  WhatsApp for WhatsApp Business API traffic, payment processors (such as Razorpay), cloud
                  infrastructure providers, and professional advisers under confidentiality. We do not sell
                  personal data and do not share it with ad networks.
                </P>
              </>
            ),
          },
          {
            id: "retention",
            title: "7. Retention",
            body: (
              <>
                <P>
                  Account data is kept for the life of the workspace plus the period required by Indian tax
                  and telecom laws. Message metadata is retained for the period required by TRAI. Content
                  retention is configurable in Settings → Data; the default is documented in the dashboard.
                </P>
              </>
            ),
          },
          {
            id: "rights",
            title: "8. Your rights",
            body: (
              <>
                <P>As a Data Principal you can:</P>
                <Ul>
                  <Li>Request a summary of the personal data we hold about you.</Li>
                  <Li>Request correction, completion, update, or erasure.</Li>
                  <Li>Withdraw consent for any consent-based processing.</Li>
                  <Li>Nominate an individual to exercise your rights if you are unable to.</Li>
                  <Li>File a grievance with our Grievance Officer.</Li>
                </Ul>
                <Callout>
                  All requests: email{" "}
                  <a href="mailto:dpo@smslocal.in" className="font-medium text-primary hover:underline">
                    dpo@smslocal.in
                  </a>
                  . Include enough detail to let us verify your identity. We respond within 30 days.
                </Callout>
              </>
            ),
          },
          {
            id: "grievance",
            title: "9. Grievance redressal",
            body: (
              <>
                <P>
                  If you are not satisfied with our response you can escalate to our Grievance Officer at{" "}
                  <a href="mailto:grievance@smslocal.in" className="font-medium text-primary hover:underline">
                    grievance@smslocal.in
                  </a>
                  . If still unresolved, you may file a complaint with the Data Protection Board of India
                  once it is operational under the Act.
                </P>
              </>
            ),
          },
          {
            id: "children",
            title: "10. Children and persons with disability",
            body: (
              <>
                <P>
                  SMSLocal is designed for business users. We do not knowingly process the personal data of a
                  child (anyone under 18) or a person with disability who requires a guardian, without
                  verifiable consent from the lawful guardian. If you believe we have inadvertently processed
                  such data, write to us at{" "}
                  <a href="mailto:dpo@smslocal.in" className="font-medium text-primary hover:underline">
                    dpo@smslocal.in
                  </a>
                  .
                </P>
              </>
            ),
          },
          {
            id: "changes",
            title: "11. Changes to this notice",
            body: (
              <>
                <P>
                  Material changes are communicated at least 14 days in advance to workspace owners by email
                  and via an in-app banner. The &quot;Last updated&quot; date above always reflects the
                  current version.
                </P>
              </>
            ),
          },
        ]}
      />
    </>
  )
}
