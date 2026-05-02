import type { Metadata } from "next"
import { Callout, LegalDoc, Li, P, Strong, Ul } from "@/components/legal/legal-doc"
import { BreadcrumbJsonLd } from "@/components/seo/json-ld"
import { getPageMetadata } from "@/lib/seo"

// ─── SEO — edit lib/seo/registry.ts or open /dev/seo to preview ──────────────
export const metadata: Metadata = getPageMetadata("/legal/terms")

export default function TermsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Legal", path: "/legal/terms" },
          { name: "Terms of Service", path: "/legal/terms" },
        ]}
      />
      <LegalDoc
        category="Terms"
        title="Terms of Service"
        summary="These terms govern your access to and use of the SMSLocal platform, APIs, dashboards, and support services. By creating a workspace or sending a single message through us, you agree to everything below."
        lastUpdated="April 22, 2026"
        effectiveDate="April 22, 2026"
        relatedLinks={[
          { label: "Privacy policy", href: "/legal/privacy" },
          { label: "Acceptable use", href: "/legal/acceptable-use" },
          { label: "Refund policy", href: "/legal/refund-policy" },
          { label: "DPDPA notice", href: "/legal/dpdpa" },
        ]}
        sections={[
          {
            id: "parties",
            title: "1. Parties and acceptance",
            body: (
              <>
                <P>
                  These Terms are a binding agreement between <Strong>SMSLocal Technologies Private Limited</Strong>{" "}
                  (&quot;SMSLocal&quot;, &quot;we&quot;, &quot;our&quot;) and the individual or legal entity
                  that has signed up for a workspace (&quot;Customer&quot;, &quot;you&quot;). If you are
                  accepting these Terms on behalf of a company, you confirm you have authority to bind that
                  company.
                </P>
              </>
            ),
          },
          {
            id: "services",
            title: "2. The services",
            body: (
              <>
                <P>
                  The services include our dashboards, APIs, SDKs, documentation, SMS/WhatsApp/OTP
                  routing, AI Agents, and any tool we make available at smslocal.in
                  (collectively, the &quot;Services&quot;). We may add, change, or retire features over time;
                  we give reasonable advance notice for material reductions.
                </P>
              </>
            ),
          },
          {
            id: "accounts",
            title: "3. Accounts and access",
            body: (
              <>
                <P>
                  You are responsible for the accuracy of your account information, the security of your
                  credentials and API keys, and every action taken under your workspace. You must promptly
                  notify us at{" "}
                  <a href="mailto:security@smslocal.in" className="font-medium text-primary hover:underline">
                    security@smslocal.in
                  </a>{" "}
                  if you suspect unauthorised access.
                </P>
              </>
            ),
          },
          {
            id: "compliance",
            title: "4. Telecom and data-protection compliance",
            body: (
              <>
                <P>You warrant that:</P>
                <Ul>
                  <Li>
                    You will only send messages to recipients who have provided lawful consent under TRAI&apos;s
                    TCCCPR regulations and applicable sectoral rules.
                  </Li>
                  <Li>
                    Every sender ID, header, and content template used through the Services is validly
                    registered on the operator DLT platform and matches the category declared.
                  </Li>
                  <Li>
                    Your data-collection notices, terms, and opt-in mechanisms comply with the DPDP Act, 2023
                    and any sector-specific laws (RBI, IRDAI, SEBI, NMC, etc.) that apply to you.
                  </Li>
                  <Li>
                    You maintain demonstrable proof of consent and make it available to us within 72 hours if
                    requested by an operator, TRAI, or the Data Protection Board of India.
                  </Li>
                </Ul>
                <Callout>
                  If an operator or regulator suspends or fines us because of traffic originating from your
                  workspace, we may set off the corresponding cost against your wallet balance and suspend
                  delivery until the root cause is resolved.
                </Callout>
              </>
            ),
          },
          {
            id: "acceptable-use",
            title: "5. Acceptable use",
            body: (
              <>
                <P>
                  You must follow our{" "}
                  <a href="/legal/acceptable-use" className="font-medium text-primary hover:underline">
                    Acceptable Use Policy
                  </a>
                  . In short: no spam, no phishing, no illegal content, no impersonation, no traffic in
                  restricted categories (drugs, weapons, gambling where prohibited, adult content, political
                  messaging without specific registration), and no attempts to interfere with the platform or
                  bypass route throttles.
                </P>
              </>
            ),
          },
          {
            id: "fees",
            title: "6. Fees, credits, and taxes",
            body: (
              <>
                <P>
                  You pay for the Services through a prepaid wallet. Rates are listed on the{" "}
                  <a href="/pricing" className="font-medium text-primary hover:underline">
                    pricing page
                  </a>{" "}
                  and in your signed order form (if any). Wallet credits are valid for 24 months from the
                  recharge date.
                </P>
                <P>
                  Fees are exclusive of GST, which is added as required under Indian law. For international
                  customers, taxes and withholding are handled per applicable treaties.
                </P>
                <P>
                  Refunds are governed by our{" "}
                  <a href="/legal/refund-policy" className="font-medium text-primary hover:underline">
                    Refund Policy
                  </a>
                  .
                </P>
              </>
            ),
          },
          {
            id: "ownership",
            title: "7. Ownership and licence",
            body: (
              <>
                <P>
                  You retain all rights to the content you route through the Services. You grant us a
                  non-exclusive, worldwide licence to host, transmit, display, and process that content
                  strictly for the purpose of delivering the Services and complying with legal obligations.
                  We retain all rights to our platform, code, documentation, dashboards, and related trademarks.
                </P>
              </>
            ),
          },
          {
            id: "privacy",
            title: "8. Privacy and data processing",
            body: (
              <>
                <P>
                  Our handling of personal data is governed by our{" "}
                  <a href="/legal/privacy" className="font-medium text-primary hover:underline">
                    Privacy Policy
                  </a>{" "}
                  and, where applicable, a separate Data Processing Addendum (DPA) that you can request by
                  writing to{" "}
                  <a href="mailto:dpo@smslocal.in" className="font-medium text-primary hover:underline">
                    dpo@smslocal.in
                  </a>
                  .
                </P>
              </>
            ),
          },
          {
            id: "availability",
            title: "9. Availability and support",
            body: (
              <>
                <P>
                  We target 99.99% monthly availability for the dispatch API, measured as detailed in our
                  Service Level Agreement (SLA). Enterprise plans receive a signed SLA with service credits.
                  Scheduled maintenance windows are announced at least 48 hours in advance through the status
                  page and in-app banners.
                </P>
              </>
            ),
          },
          {
            id: "suspension",
            title: "10. Suspension and termination",
            body: (
              <>
                <P>
                  We may suspend or terminate the Services if you (a) materially breach these Terms or the
                  AUP, (b) create risk to the platform or other customers, or (c) are required to be suspended
                  by an operator or regulator. For material breaches other than emergencies, we give written
                  notice and a 7-day cure period.
                </P>
                <P>
                  You can terminate your workspace at any time from the dashboard. Unused wallet balance is
                  refundable as described in the Refund Policy, net of GST and banking charges.
                </P>
              </>
            ),
          },
          {
            id: "disclaimer",
            title: "11. Disclaimer of warranties",
            body: (
              <>
                <P>
                  The Services are provided on an &quot;as is&quot; and &quot;as available&quot; basis. We do
                  not warrant that message delivery will be instantaneous for every recipient, because
                  delivery depends on handset state, operator congestion, DND registrations, and factors
                  outside our control. To the maximum extent permitted by law, we disclaim all implied
                  warranties, including merchantability and fitness for a particular purpose.
                </P>
              </>
            ),
          },
          {
            id: "liability",
            title: "12. Limitation of liability",
            body: (
              <>
                <P>
                  To the maximum extent permitted by law, our aggregate liability under these Terms in any
                  twelve-month period is limited to the fees actually paid by you in the preceding twelve
                  months. Neither party is liable for indirect, incidental, special, consequential, or
                  punitive damages, nor for loss of revenue, data, goodwill, or anticipated savings.
                </P>
                <P>
                  Nothing in these Terms limits liability for fraud, wilful misconduct, or any other liability
                  that cannot be limited under Indian law.
                </P>
              </>
            ),
          },
          {
            id: "indemnity",
            title: "13. Indemnity",
            body: (
              <>
                <P>
                  You agree to defend, indemnify, and hold SMSLocal harmless from any third-party claim
                  arising out of your breach of these Terms, your violation of telecom or data-protection
                  laws, or the content or targeting of messages sent through your workspace.
                </P>
              </>
            ),
          },
          {
            id: "governing-law",
            title: "14. Governing law and disputes",
            body: (
              <>
                <P>
                  These Terms are governed by the laws of India. Disputes are subject to the exclusive
                  jurisdiction of the courts at <Strong>[PLACEHOLDER — jurisdiction city]</Strong>, India.
                  Before filing a lawsuit, both parties agree to first attempt resolution through good-faith
                  discussion and, if required, mediation under the Indian Arbitration and Conciliation Act,
                  1996.
                </P>
              </>
            ),
          },
          {
            id: "changes",
            title: "15. Changes to these Terms",
            body: (
              <>
                <P>
                  We may update these Terms from time to time. Material changes are announced at least 14
                  days in advance by email to workspace owners and via in-app banners. Continued use of the
                  Services after a change means you accept the updated Terms.
                </P>
              </>
            ),
          },
          {
            id: "miscellaneous",
            title: "16. Miscellaneous",
            body: (
              <>
                <P>
                  These Terms, together with any signed order form, Privacy Policy, DPA, and Acceptable Use
                  Policy, constitute the entire agreement between the parties. If any provision is held
                  unenforceable, the remainder remains in effect. No waiver is effective unless in writing.
                  You may not assign these Terms without our consent; we may assign to an affiliate or in
                  connection with a merger or acquisition.
                </P>
              </>
            ),
          },
        ]}
      />
    </>
  )
}
