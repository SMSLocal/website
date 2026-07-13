import type { Metadata } from "next"
import { LegalDoc, LegalSection } from "@/components/legal/legal-doc"
import { getPageMetadata } from "@/lib/seo"

// ─── SEO — edit lib/seo/registry.ts or open /dev/seo to preview ──────────────
export const metadata: Metadata = getPageMetadata("/legal/dpa")

const TOC = [
  { id: "overview", label: "1. Overview" },
  { id: "roles", label: "2. Roles" },
  { id: "scope", label: "3. Scope of processing" },
  { id: "security", label: "4. Security measures" },
  { id: "subprocessors", label: "5. Sub-processors" },
  { id: "transfers", label: "6. Cross-border transfers" },
  { id: "breach", label: "7. Breach notification" },
  { id: "rights", label: "8. Data principal rights" },
  { id: "audit", label: "9. Audits" },
  { id: "return", label: "10. Return or deletion of data" },
  { id: "term", label: "11. Term and termination" },
  { id: "contact", label: "12. How to execute" },
]

export default function DpaPage() {
  return (
    <LegalDoc
      eyebrow="Legal · Data protection"
      title="Data Processing Addendum"
      lastUpdated="April 2026"
      summary="This Data Processing Addendum (DPA) governs how SMSLocal processes personal data on your behalf. It applies when you use our services to send SMS, WhatsApp, OTP, or AI-agent messages to your customers. The DPA reflects our obligations under India's Digital Personal Data Protection Act, 2023 (DPDPA) and other applicable laws."
      toc={TOC}
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "Legal", href: "/legal/privacy/" },
        { label: "Data Processing Addendum" },
      ]}
    >
      <LegalSection id="overview" title="1. Overview">
        <p>
          You, the Customer, are the <strong>data fiduciary</strong> (or data controller where
          applicable). SMSLocal is the <strong>data processor</strong> — we process personal
          data only on your instructions.
        </p>
        <p>
          This DPA covers all personal data SMSLocal handles on your behalf across our
          messaging products: SMS, WhatsApp Business API, OTP, and AI agents.
        </p>
        <p>
          Executing a signed DPA is optional for most customers. It becomes necessary when
          your processing volume, industry, or enterprise procurement process requires one.
          To request an executable copy, email{" "}
          <a href="mailto:dpo@smslocal.in" className="text-primary hover:underline">
            dpo@smslocal.in
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection id="roles" title="2. Roles">
        <ul>
          <li>
            <strong>Customer (Data Fiduciary):</strong> decides the purposes and means of
            processing the personal data you upload to, or generate within, SMSLocal.
          </li>
          <li>
            <strong>SMSLocal (Data Processor):</strong> processes personal data only on your
            documented instructions — as set out in the Services, this DPA, the Terms of
            Service, and the Privacy Policy.
          </li>
          <li>
            <strong>Data Principal:</strong> the individual (typically your end customer or
            user) to whom the personal data relates.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="scope" title="3. Scope of processing">
        <p>
          <strong>Nature and purpose.</strong> SMSLocal processes personal data to deliver
          the messaging services you request. This includes:
        </p>
        <ul>
          <li>Sending SMS, WhatsApp, and OTP messages on your behalf.</li>
          <li>Routing messages through telecom operators and logging delivery status.</li>
          <li>Providing campaign analytics and reporting.</li>
          <li>Honouring DND and opt-out requests.</li>
          <li>Providing customer support for your account.</li>
        </ul>
        <p>
          <strong>Duration.</strong> For the term of your subscription, plus any additional
          retention required by law — for example, records mandated by the Telecom Commercial
          Communications Customer Preference Regulations, 2018 — or by operational necessity,
          such as delivery reports needed for billing disputes.
        </p>
        <p>
          <strong>Categories of data principals.</strong> Your customers, leads, employees,
          or users to whom you send messages.
        </p>
        <p>
          <strong>Categories of personal data.</strong> Mobile numbers, names included in
          message templates, message content, delivery metadata, opt-out flags, and any
          other fields you upload as part of a campaign or API call.
        </p>
      </LegalSection>

      <LegalSection id="security" title="4. Security measures">
        <p>
          SMSLocal applies appropriate technical and organisational safeguards to protect
          personal data. These include:
        </p>
        <ul>
          <li>TLS 1.2+ encryption in transit and AES-256 encryption at rest.</li>
          <li>Role-based access control with least-privilege defaults.</li>
          <li>Audit logs for sensitive operations and API access.</li>
          <li>Annual third-party penetration testing.</li>
          <li>Employee background checks, confidentiality agreements, and mandatory security training.</li>
          <li>Formal incident response runbooks and an on-call rotation.</li>
        </ul>
      </LegalSection>

      <LegalSection id="subprocessors" title="5. Sub-processors">
        <p>
          We use sub-processors to deliver the Services. Current categories include:
        </p>
        <ul>
          <li>Cloud infrastructure hosted in India.</li>
          <li>Telecom aggregators and operators.</li>
          <li>The WhatsApp Business Platform (Meta).</li>
          <li>Payment processors.</li>
          <li>Customer support tooling.</li>
        </ul>
        <p>
          A current list of sub-processors and their purposes is available in the Privacy
          Policy and on request.
        </p>
        <p>
          We will notify you before adding any new sub-processor that accesses personal
          data. If you object on reasonable grounds, we will work in good faith to resolve
          the concern. If we cannot resolve it, you may terminate the affected Services.
        </p>
      </LegalSection>

      <LegalSection id="transfers" title="6. Cross-border transfers">
        <p>
          SMSLocal processes personal data primarily in India. Some sub-processors — such as
          the WhatsApp Business Platform — may process data outside India.
        </p>
        <p>
          Where we transfer data internationally, we rely on the mechanisms permitted under
          the DPDPA and require our sub-processors to apply equivalent safeguards.
        </p>
      </LegalSection>

      <LegalSection id="breach" title="7. Breach notification">
        <p>
          If we become aware of a personal data breach affecting your data, we will:
        </p>
        <ul>
          <li>Notify you without undue delay.</li>
          <li>Share all information reasonably available to us about the breach.</li>
          <li>Co-operate with your own notifications and any Data Protection Board requirements.</li>
        </ul>
      </LegalSection>

      <LegalSection id="rights" title="8. Data principal rights">
        <p>
          SMSLocal will provide reasonable technical and organisational assistance to help
          you respond to data principal requests. This covers requests to:
        </p>
        <ul>
          <li>Access, correct, or erase personal data.</li>
          <li>Port personal data to another service.</li>
          <li>Withdraw consent.</li>
        </ul>
        <p>
          Assistance is available through self-service tools in your dashboard and, where
          necessary, direct engineering support.
        </p>
      </LegalSection>

      <LegalSection id="audit" title="9. Audits">
        <p>
          You may request an audit of SMSLocal&apos;s processing once per year, or
          additionally following a material security incident.
        </p>
        <p>
          We will satisfy most audit requests through written responses, independent
          certifications, or summary reports. On-site audits are subject to:
        </p>
        <ul>
          <li>At least 30 days&apos; advance written notice.</li>
          <li>A mutually agreed scope and confidentiality protections.</li>
          <li>Scheduling during normal business hours.</li>
        </ul>
      </LegalSection>

      <LegalSection id="return" title="10. Return or deletion of data">
        <p>
          When your Services end, you may choose to have your personal data returned or
          deleted. We will carry out your choice unless retention is required by law.
        </p>
        <p>
          Backups are overwritten in the ordinary course of our operations and are not
          accessible after disposal.
        </p>
      </LegalSection>

      <LegalSection id="term" title="11. Term and termination">
        <p>
          This DPA takes effect on the later of:
        </p>
        <ul>
          <li>The date both parties sign it, or</li>
          <li>The start date of your Services subscription.</li>
        </ul>
        <p>
          It remains in force for as long as SMSLocal processes personal data on your behalf.
        </p>
      </LegalSection>

      <LegalSection id="contact" title="12. How to execute">
        <p>
          To request an executable DPA, email{" "}
          <a href="mailto:dpo@smslocal.in" className="text-primary hover:underline">
            dpo@smslocal.in
          </a>{" "}
          with the following details:
        </p>
        <ul>
          <li>Your company name and registered address.</li>
          <li>Authorised signatory name and title.</li>
          <li>Your expected message volume.</li>
        </ul>
        <p>
          We return a signed copy within five business days in most cases.
        </p>
      </LegalSection>
    </LegalDoc>
  )
}
