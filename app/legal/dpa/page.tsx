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
  { id: "rights", label: "8. Data principal rights assistance" },
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
          summary="This Data Processing Addendum (DPA) forms part of the SMSLocal Terms of Service when you, the Customer, use our services to process personal data of data principals. It sets out our commitments as a data processor under the Digital Personal Data Protection Act, 2023 (DPDPA) and other applicable laws."
          toc={TOC}
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Legal", href: "/legal/privacy" },
            { label: "Data Processing Addendum" },
          ]}
        >
          <LegalSection id="overview" title="1. Overview">
            <p>
              The Customer is the <strong>data fiduciary</strong> (or, where applicable, the data
              controller). SMSLocal is the <strong>data processor</strong>. This DPA applies to all
              personal data that SMSLocal processes on the Customer&apos;s behalf through any of
              our messaging products — SMS, WhatsApp Business API, OTP, and AI agents.
            </p>
            <p>
              Executing the DPA is optional for most customers; it becomes mandatory when your
              processing volume, industry, or enterprise procurement checklist requires one. To
              request an executable copy on your company paper or ours, write to{" "}
              <a href="mailto:dpo@smslocal.in" className="text-primary hover:underline">
                dpo@smslocal.in
              </a>
              .
            </p>
          </LegalSection>

          <LegalSection id="roles" title="2. Roles">
            <ul>
              <li>
                <strong>Customer (Data Fiduciary):</strong> determines the purposes and means of
                processing the personal data uploaded to, or generated within, the SMSLocal
                platform.
              </li>
              <li>
                <strong>SMSLocal (Data Processor):</strong> processes personal data only on your
                documented instructions, as described in the Services, this DPA, the Terms of
                Service, and the Privacy Policy.
              </li>
              <li>
                <strong>Data Principal:</strong> the individual — typically your end customer or
                user — to whom the personal data relates.
              </li>
            </ul>
          </LegalSection>

          <LegalSection id="scope" title="3. Scope of processing">
            <p>
              <strong>Nature and purpose.</strong> To deliver messaging services requested by the
              Customer — sending SMS, WhatsApp, and OTP messages; routing them through
              operators; logging delivery status; reporting analytics; honouring DND and
              opt-out requests; and providing support.
            </p>
            <p>
              <strong>Duration.</strong> For the term of the Customer&apos;s subscription, plus
              retention periods required by law (for example, records mandated by the Telecom
              Commercial Communications Customer Preference Regulations, 2018) or operational
              necessity (for example, delivery reports that inform billing disputes).
            </p>
            <p>
              <strong>Categories of data principals.</strong> Your customers, leads, employees, or
              users to whom you send messages.
            </p>
            <p>
              <strong>Categories of personal data.</strong> Mobile numbers, names if included in
              templates, message content, delivery metadata, opt-out flags, and any other fields
              the Customer uploads to SMSLocal as part of a campaign or API call.
            </p>
          </LegalSection>

          <LegalSection id="security" title="4. Security measures">
            <p>
              SMSLocal implements appropriate technical and organisational measures including:
            </p>
            <ul>
              <li>TLS 1.2+ encryption in transit and AES-256 encryption at rest.</li>
              <li>Role-based access control with least-privilege defaults.</li>
              <li>Audit logs for sensitive operations and API access.</li>
              <li>Regular third-party penetration testing [PLACEHOLDER — frequency to confirm].</li>
              <li>Employee background checks, confidentiality agreements, and mandatory training.</li>
              <li>Formal incident response runbooks and on-call rotation.</li>
            </ul>
          </LegalSection>

          <LegalSection id="subprocessors" title="5. Sub-processors">
            <p>
              We engage sub-processors to deliver the Services. Current categories include cloud
              infrastructure hosted in India, telecom aggregators and operators, the WhatsApp
              Business Platform, payment processors, and customer support tooling. A current list
              of sub-processors and their purposes is maintained in the Privacy Policy and
              available on request.
            </p>
            <p>
              We will give the Customer prior notice of any new sub-processor with access to
              personal data. If the Customer objects on reasonable grounds, we will work in good
              faith to resolve the concern; where we cannot, the Customer may terminate the
              affected Services.
            </p>
          </LegalSection>

          <LegalSection id="transfers" title="6. Cross-border transfers">
            <p>
              SMSLocal processes personal data primarily in India. Some sub-processors — for
              example, the WhatsApp Business Platform — may process data outside India. Where
              data is transferred internationally, we rely on the mechanisms permitted under the
              DPDPA and applicable law and require our sub-processors to maintain equivalent
              safeguards.
            </p>
          </LegalSection>

          <LegalSection id="breach" title="7. Breach notification">
            <p>
              If we become aware of a personal data breach affecting the Customer&apos;s data, we
              will notify the Customer without undue delay, provide information reasonably
              available to us, and co-operate with the Customer&apos;s and Data Protection Board
              notifications as required by law.
            </p>
          </LegalSection>

          <LegalSection id="rights" title="8. Data principal rights assistance">
            <p>
              SMSLocal will provide reasonable technical and organisational assistance to help the
              Customer respond to requests from data principals to access, correct, erase, or
              port their personal data, and to honour consent withdrawal — including through
              self-service tools in the dashboard and, where necessary, engineering support.
            </p>
          </LegalSection>

          <LegalSection id="audit" title="9. Audits">
            <p>
              Once per year, and additionally in the event of a material security incident, the
              Customer may request an audit of SMSLocal&apos;s processing of personal data.
              SMSLocal will reasonably satisfy most audit requests through written responses,
              independent certifications, or summary reports. On-site audits require at least 30
              days&apos; advance notice, a mutually agreed scope, confidentiality protections, and
              are conducted during business hours.
            </p>
          </LegalSection>

          <LegalSection id="return" title="10. Return or deletion of data">
            <p>
              On termination of the Services, SMSLocal will, at the Customer&apos;s option, delete
              or return all personal data processed on the Customer&apos;s behalf, except where
              retention is required by law. Backups are overwritten in the ordinary course and do
              not remain accessible after disposal.
            </p>
          </LegalSection>

          <LegalSection id="term" title="11. Term and termination">
            <p>
              This DPA takes effect on the later of (a) its signature by both parties or (b) the
              start of the Services subscription, and remains in force for as long as SMSLocal
              processes personal data on the Customer&apos;s behalf.
            </p>
          </LegalSection>

          <LegalSection id="contact" title="12. How to execute">
            <p>
              Request an executable DPA by writing to{" "}
              <a href="mailto:dpo@smslocal.in" className="text-primary hover:underline">
                dpo@smslocal.in
              </a>{" "}
              with your company name, registered address, authorised signatory details, and your
              expected volume. We will return a signed copy within five business days in most
              cases.
            </p>
          </LegalSection>
    </LegalDoc>
  )
}
