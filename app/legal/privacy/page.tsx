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
        summary="This policy explains what personal information SMSLocal processes when you use our WhatsApp Business API, bulk SMS, chatbot, and related services, why we process it, who we share it with, and the rights you have under India's Digital Personal Data Protection Act, 2023."
        lastUpdated={LAST_UPDATED}
        effectiveDate={EFFECTIVE_DATE}
        relatedLinks={[
          { label: "Terms of service", href: "/legal/terms/" },
          { label: "DPDPA notice", href: "/legal/dpdpa/" },
          { label: "Cookie policy", href: "/legal/cookie-policy/" },
          { label: "Data Processing Addendum", href: "/legal/dpa/" },
          { label: "Acceptable use", href: "/legal/acceptable-use/" },
        ]}
        sections={[
          {
            id: "introduction",
            title: "1. Introduction",
            body: (
              <>
                <P>
                  SMSLocal.in (&quot;SMSLocal&quot;, &quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is operated by{" "}
                  <Strong>Swadesh Mobile</Strong>. We provide WhatsApp Business API services, bulk SMS
                  broadcasting, chatbot automation, two-way messaging, and planned RCS Business Messaging
                  services to businesses across India and abroad.
                </P>
                <P>
                  This Privacy Policy applies whenever you visit{" "}
                  <a href="https://www.smslocal.in" className="font-medium text-primary hover:underline">
                    smslocal.in
                  </a>
                  , register for an account, purchase or use our Services, integrate with our APIs, or contact
                  our support, sales, billing, or grievance teams.
                </P>
              </>
            ),
          },
          {
            id: "definitions",
            title: "2. Definitions",
            body: (
              <>
                <Ul>
                  <Li>
                    <Strong>Personal Information</Strong> — data relating to an identified or identifiable
                    natural person, as understood under the Digital Personal Data Protection Act, 2023 and the
                    Information Technology Act, 2000.
                  </Li>
                  <Li>
                    <Strong>Customer Data</Strong> — information you upload or transmit through the platform,
                    including contact lists, message content, media, and chatbot conversations.
                  </Li>
                  <Li>
                    <Strong>End-Recipient</Strong> — an individual who receives a WhatsApp, SMS, or RCS message
                    sent via SMSLocal.
                  </Li>
                  <Li>
                    <Strong>Services</Strong> — all SMSLocal products, including the WhatsApp Business API, bulk
                    messaging, chatbot builder, analytics, and integrations.
                  </Li>
                </Ul>
              </>
            ),
          },
          {
            id: "information-we-collect",
            title: "3. Information we collect",
            body: (
              <>
                <P>
                  <Strong>Information you provide</Strong> — account registration details (name, business name,
                  email, mobile number, password, GSTIN, PAN, billing address), KYC and onboarding documents,
                  payment information (processed through PCI-DSS compliant gateways; we do not store full card
                  numbers), and your communications with our sales, support, billing, and grievance teams.
                </P>
                <P>
                  <Strong>Customer Data you upload</Strong> — end-recipient contact lists, message content,
                  templates, chatbot flows, and two-way conversation transcripts.
                </P>
                <P>
                  <Strong>Information collected automatically</Strong> — device and connection data (IP address,
                  browser type, device identifiers, operating system, timezone, language), usage data (pages
                  visited, features used, API calls, campaign statistics), delivery, read, and engagement
                  metadata from Meta, telecom operators, and Google, and information collected via cookies and
                  similar technologies.
                </P>
                <P>
                  <Strong>Information from third parties</Strong> — identity verification and anti-fraud
                  signals, profile data from authentication providers (Google, Microsoft), and information from
                  Meta, telecom operators, payment processors, and integration partners.
                </P>
              </>
            ),
          },
          {
            id: "how-we-use",
            title: "4. How we use your information",
            body: (
              <>
                <P>We use the information we collect to:</P>
                <Ul>
                  <Li>Create accounts and carry out identity verification, KYC, DLT, and WhatsApp onboarding.</Li>
                  <Li>Deliver the Services and dispatch messages on your behalf.</Li>
                  <Li>Process payments, generate invoices, and manage your wallet.</Li>
                  <Li>Provide customer support and resolve grievances.</Li>
                  <Li>Improve the platform and develop new features.</Li>
                  <Li>Send service notifications, security alerts, and billing reminders.</Li>
                  <Li>Send marketing communications, from which you may opt out at any time.</Li>
                  <Li>Detect and prevent fraud, abuse, and spam.</Li>
                  <Li>Comply with legal and regulatory obligations.</Li>
                </Ul>
              </>
            ),
          },
          {
            id: "whatsapp-meta",
            title: "5. WhatsApp Business API & Meta compliance",
            body: (
              <>
                <P>
                  As an authorised WhatsApp Business Solution Provider, SMSLocal follows Meta&apos;s terms and
                  policies. Customer Data is processed on Meta-hosted infrastructure and on SMSLocal servers.
                  You must obtain valid opt-in consent from your end-recipients. SMSLocal does not use
                  end-recipient numbers or message content for any unrelated purpose.
                </P>
                <Callout>
                  Meta may apply quality ratings, throughput limits, and template restrictions to your account at
                  its sole discretion. SMSLocal passes on these decisions but is not responsible for them.
                </Callout>
              </>
            ),
          },
          {
            id: "sms-dlt-trai",
            title: "6. SMS, DLT & TRAI compliance",
            body: (
              <>
                <P>
                  All SMS services comply with TRAI&apos;s Telecom Commercial Communications Customer Preference
                  Regulations, 2018 (TCCCPR) and the DLT framework. Before sending SMS, customers must complete
                  Entity Registration, Sender ID (Header) Registration, and Template Registration on the DLT
                  platforms (Jio, Airtel, Vi, BSNL). Consent records and DLT identifiers are retained as mandated
                  by TRAI, and promotional SMS is honoured only outside Do-Not-Disturb hours.
                </P>
              </>
            ),
          },
          {
            id: "rcs",
            title: "7. RCS Business Messaging (planned service)",
            body: (
              <>
                <P>
                  We are preparing to launch RCS Business Messaging. For this service we will collect mobile
                  numbers, opt-in timestamps, IP addresses, message delivery status, interaction events, and
                  opt-out preferences.
                </P>
                <P>
                  <Strong>How we use it</Strong> — to deliver messages, honour STOP / UNSUBSCRIBE keywords,
                  respond to HELP / INFO replies, and generate delivery and engagement reports.
                </P>
                <P>
                  <Strong>Legal basis</Strong> — explicit consent obtained via a pre-unticked checkbox during
                  registration.
                </P>
                <P>
                  <Strong>Your rights</Strong> — you may opt out using the STOP, UNSUBSCRIBE, CANCEL, END, or
                  QUIT keywords or a settings toggle, email{" "}
                  <a href="mailto:support@smslocal.in" className="font-medium text-primary hover:underline">
                    support@smslocal.in
                  </a>{" "}
                  (24-hour response), and access or delete your personal data on request. Opted-out numbers are
                  added to a suppression list.
                </P>
                <P>
                  <Strong>Third parties</Strong> — Infobip (carrier aggregator) and Google RBM handle routing.{" "}
                  <Strong>Retention</Strong> — opt-in/opt-out timestamps and audit logs are retained for 24
                  months after account closure; message bodies for 90 days.
                </P>
              </>
            ),
          },
          {
            id: "sharing",
            title: "8. Data sharing and disclosure",
            body: (
              <>
                <P>
                  SMSLocal does not sell, rent, or trade your Personal Information or Customer Data. We share
                  data only with:
                </P>
                <Ul>
                  <Li>Meta (WhatsApp) and Google (RCS).</Li>
                  <Li>Indian telecom operators and DLT registrars.</Li>
                  <Li>Payment processors, banks, and tax authorities.</Li>
                  <Li>Sub-processors and infrastructure providers under confidentiality obligations.</Li>
                  <Li>Channel partners and resellers, as needed.</Li>
                  <Li>Professional advisers under confidentiality.</Li>
                  <Li>Law enforcement and regulators when legally compelled.</Li>
                  <Li>A successor entity in a merger or acquisition, with notice to you.</Li>
                </Ul>
              </>
            ),
          },
          {
            id: "retention",
            title: "9. Data retention",
            body: (
              <>
                <P>
                  We retain Personal Information and Customer Data only as long as necessary to provide the
                  Services, comply with legal obligations, and resolve disputes.
                </P>
                <Ul>
                  <Li>
                    <Strong>Account and KYC records</Strong> — for the life of the account plus 5–8 years as
                    required by Indian law.
                  </Li>
                  <Li>
                    <Strong>Message metadata and delivery logs</Strong> — 180 days in active storage, longer in
                    archival.
                  </Li>
                  <Li>
                    <Strong>Billing and tax records</Strong> — at least 8 years.
                  </Li>
                  <Li>
                    <Strong>Contact lists and chatbot data</Strong> — for the active life of the account,
                    deleted within 90 days of closure.
                  </Li>
                </Ul>
              </>
            ),
          },
          {
            id: "your-rights",
            title: "10. Your rights",
            body: (
              <>
                <P>Subject to applicable law, you have the right to:</P>
                <Ul>
                  <Li>Access a summary of the Personal Information we hold about you.</Li>
                  <Li>Correct and update inaccurate data.</Li>
                  <Li>Request erasure, subject to legal retention requirements.</Li>
                  <Li>Seek grievance redressal.</Li>
                  <Li>Nominate another person to exercise your rights.</Li>
                </Ul>
                <P>
                  <Strong>Additional rights for EU / EEA users (GDPR)</Strong> — the GDPR grants rights to
                  object to processing, restrict processing, data portability, and to lodge a complaint with a
                  Supervisory Authority. Such requests may be directed to our customers (acting as data
                  controllers) or to SMSLocal using the contact details in Section 19.
                </P>
              </>
            ),
          },
          {
            id: "cookies",
            title: "11. Cookies and tracking technologies",
            body: (
              <>
                <P>
                  We use cookies and similar technologies (pixels, local storage, SDKs) to operate the website,
                  remember your preferences, secure your account, and measure usage. You can control cookies
                  through your browser settings, though disabling certain cookies may limit some features. See
                  our{" "}
                  <a href="/legal/cookie-policy/" className="font-medium text-primary hover:underline">
                    Cookie Policy
                  </a>{" "}
                  for more detail.
                </P>
              </>
            ),
          },
          {
            id: "international-transfers",
            title: "12. International data transfers",
            body: (
              <>
                <P>
                  Your information may be processed or stored in India and in other countries where our service
                  providers operate. Transfers of data outside your country rely on Standard Contractual
                  Clauses, intra-group agreements, and provider certifications.
                </P>
              </>
            ),
          },
          {
            id: "childrens-privacy",
            title: "13. Children's privacy",
            body: (
              <>
                <P>
                  SMSLocal is intended exclusively for businesses and individuals over 18 years of age. We do
                  not knowingly collect information from children. If a child has provided information to us,
                  please contact support and we will delete it.
                </P>
              </>
            ),
          },
          {
            id: "third-party",
            title: "14. Third-party websites and integrations",
            body: (
              <>
                <P>
                  Our website and platform contain links to and integrations with third-party services
                  (Shopify, WooCommerce, Zoho, Razorpay, Stripe, Meta, Google, and others). We are not
                  responsible for their privacy practices. Please review the privacy policies of those third
                  parties before sharing information with them.
                </P>
              </>
            ),
          },
          {
            id: "security",
            title: "15. Data security",
            body: (
              <>
                <P>
                  We implement reasonable technical, administrative, and physical safeguards to protect your
                  Personal Information, including:
                </P>
                <Ul>
                  <Li>TLS / SSL encryption in transit.</Li>
                  <Li>Encryption at rest for sensitive fields.</Li>
                  <Li>Role-based access controls.</Li>
                  <Li>Multi-factor authentication for administrative access.</Li>
                  <Li>Secure cloud hosting.</Li>
                  <Li>Periodic vulnerability assessments.</Li>
                  <Li>Employee confidentiality obligations.</Li>
                </Ul>
                <P>
                  No method of transmission or storage is 100% secure. Keep your credentials confidential and
                  notify{" "}
                  <a href="mailto:support@smslocal.in" className="font-medium text-primary hover:underline">
                    support@smslocal.in
                  </a>{" "}
                  of any suspected unauthorised access.
                </P>
              </>
            ),
          },
          {
            id: "law-enforcement",
            title: "16. Government and law enforcement requests",
            body: (
              <>
                <P>
                  Swadesh Mobile cooperates with valid requests from Indian and foreign government, security,
                  defence, revenue, regulatory, and law enforcement authorities. We disclose Personal Information
                  and Customer Data when legally compelled, or when necessary to comply with law, enforce our
                  terms, protect our users, or investigate fraud.
                </P>
              </>
            ),
          },
          {
            id: "grievance-officer",
            title: "17. Grievance Officer",
            body: (
              <>
                <P>
                  In accordance with the Information Technology Act, 2000, the IT (Reasonable Security Practices)
                  Rules, 2011, and the DPDP Act, 2023, the Grievance Officer can be reached at:
                </P>
                <Ul>
                  <Li>
                    <Strong>Name</Strong> — to be appointed by Swadesh Mobile.
                  </Li>
                  <Li>
                    <Strong>Entity</Strong> — Swadesh Mobile (operator of SMSLocal.in).
                  </Li>
                  <Li>
                    <Strong>Email</Strong> —{" "}
                    <a href="mailto:grievance@smslocal.in" className="font-medium text-primary hover:underline">
                      grievance@smslocal.in
                    </a>
                  </Li>
                </Ul>
                <P>Complaints are acknowledged within 48 hours and resolved within the timelines set by law.</P>
              </>
            ),
          },
          {
            id: "changes",
            title: "18. Changes to this Privacy Policy",
            body: (
              <>
                <P>
                  We may update this policy to reflect changes in our practices, technology, legal requirements,
                  or operations. Updated versions are posted with a revised date, and material changes receive
                  additional notice by email or in-product notification. Your continued use of the Services after
                  an update constitutes acceptance of the revised policy.
                </P>
              </>
            ),
          },
          {
            id: "contact",
            title: "19. Contact us",
            body: (
              <>
                <P>For questions or requests regarding our privacy practices:</P>
                <Ul>
                  <Li>
                    <Strong>Email</Strong> —{" "}
                    <a href="mailto:privacy@smslocal.in" className="font-medium text-primary hover:underline">
                      privacy@smslocal.in
                    </a>
                  </Li>
                  <Li>
                    <Strong>Website</Strong> —{" "}
                    <a href="https://www.smslocal.in" className="font-medium text-primary hover:underline">
                      smslocal.in
                    </a>
                  </Li>
                  <Li>
                    <Strong>Operator</Strong> — Swadesh Mobile
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
