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
        title="Terms and Conditions"
        summary="These Terms govern your access to and use of the SMSLocal website, platform, APIs, mobile applications, and all related services. By creating an account or sending a single message through us, you agree to everything below."
        lastUpdated="April 22, 2026"
        effectiveDate="April 22, 2026"
        relatedLinks={[
          { label: "Privacy policy", href: "/legal/privacy/" },
          { label: "Acceptable use", href: "/legal/acceptable-use/" },
          { label: "DPDPA notice", href: "/legal/dpdpa/" },
        ]}
        sections={[
          {
            id: "acceptance",
            title: "1. Acceptance of terms",
            body: (
              <>
                <P>
                  These Terms &amp; Conditions (&quot;Terms&quot;) are a binding agreement between you
                  (&quot;Customer&quot;) and <Strong>Swadesh Mobile</Strong>, the operator of SMSLocal.in
                  (&quot;SMSLocal&quot;). They govern your use of the SMSLocal website, platform, APIs, mobile
                  apps, and all related services (the &quot;Services&quot;).
                </P>
                <P>
                  By creating an account or using any Service, you agree to these Terms along with our:
                </P>
                <Ul>
                  <Li>Privacy Policy</Li>
                  <Li>Acceptable Use Policy</Li>
                  <Li>Any product-specific addenda</Li>
                </Ul>
                <P>If you do not agree, you must not use the Services.</P>
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
                    <Strong>Account</Strong> means the registered account through which you access the Services.
                  </Li>
                  <Li>
                    <Strong>Customer Data</Strong> means information you upload, submit, or transmit through the
                    platform, including contact lists, message content, media, and chatbot configurations.
                  </Li>
                  <Li>
                    <Strong>Wallet</Strong> means the prepaid balance maintained in your Account that is debited
                    on a per-message or per-event basis as messages are delivered.
                  </Li>
                  <Li>
                    <Strong>BSP</Strong> means a Business Solution Provider authorised by Meta to provide access
                    to the WhatsApp Business API.
                  </Li>
                </Ul>
              </>
            ),
          },
          {
            id: "eligibility",
            title: "3. Eligibility & account registration",
            body: (
              <>
                <Ul>
                  <Li>
                    You must be at least 18 years old and competent to enter into a binding contract under the
                    Indian Contract Act, 1872.
                  </Li>
                  <Li>
                    You must register a legitimate business entity (sole proprietorship, partnership, LLP,
                    company, or registered trust/society) and provide accurate, current, and complete
                    information during registration, including KYC documents (PAN, GST certificate, business
                    registration documents, authorised signatory ID).
                  </Li>
                  <Li>
                    You are responsible for maintaining the confidentiality of your Account credentials, API
                    keys, and webhook secrets, and for all activities conducted under your Account.
                  </Li>
                  <Li>
                    If you provide information that is false, inaccurate, outdated, or incomplete, we reserve the
                    right to suspend or terminate your Account without refund.
                  </Li>
                </Ul>
              </>
            ),
          },
          {
            id: "services",
            title: "4. Description of Services",
            body: (
              <>
                <P>
                  SMSLocal provides the following Services, which may be updated, expanded, or discontinued from
                  time to time:
                </P>
                <Ul>
                  <Li>
                    WhatsApp Business API access via our Meta-authorised BSP infrastructure, including template
                    message dispatch, two-way conversations, and shared inbox.
                  </Li>
                  <Li>
                    Bulk SMS broadcasting and OTP delivery routed through TRAI-licensed access providers, in
                    compliance with TCCCPR-2018 and the DLT framework.
                  </Li>
                  <Li>No-code chatbot builder, automated flows, and customer journey orchestration.</Li>
                  <Li>
                    Contact management, audience segmentation, campaign analytics, and reporting dashboards.
                  </Li>
                  <Li>
                    Pre-built integrations with platforms such as Shopify, WooCommerce, Zoho, HubSpot, and
                    webhook-based custom integrations.
                  </Li>
                  <Li>
                    RCS Business Messaging (planned service) — to be launched in partnership with Google RBM and
                    authorised carrier aggregators, governed by an additional RCS Addendum at the time of launch.
                  </Li>
                </Ul>
              </>
            ),
          },
          {
            id: "pricing",
            title: "5. Subscription plans, wallet & pricing",
            body: (
              <>
                <Ul>
                  <Li>
                    SMSLocal uses a two-part pricing model: (i) a recurring subscription plan (monthly or
                    annual) for platform access and seats; and (ii) per-message charges debited from your prepaid
                    Wallet for each message delivered.
                  </Li>
                  <Li>
                    Per-message charges are based on Meta&apos;s WhatsApp conversation rates, telecom operator
                    tariffs, and Google RCS rates (as applicable), plus a transparent platform markup. Detailed
                    pricing is published on our{" "}
                    <a href="/pricing/" className="font-medium text-primary hover:underline">
                      pricing page
                    </a>
                    .
                  </Li>
                  <Li>
                    We may revise subscription pricing and per-message rates with 15 days&apos; prior notice,
                    except where a change is necessitated by an upstream change by Meta, telecom operators, or
                    regulators — in which case the change may be effective immediately upon notice.
                  </Li>
                  <Li>
                    Service, marketing, utility, and authentication category messages are billed at different
                    rates as published on our pricing page.
                  </Li>
                </Ul>
              </>
            ),
          },
          {
            id: "payment",
            title: "6. Payment, billing & wallet",
            body: (
              <>
                <Ul>
                  <Li>
                    Subscription fees are billed in advance for the chosen billing cycle. Wallet recharges are
                    billed at the time of recharge.
                  </Li>
                  <Li>
                    All amounts are exclusive of GST and other applicable taxes, which will be added at
                    prevailing rates.
                  </Li>
                  <Li>
                    Payments are processed through PCI-DSS compliant payment gateways. We do not store full card
                    numbers on our servers.
                  </Li>
                  <Li>If a payment fails, we may suspend the affected Services until the dues are cleared.</Li>
                  <Li>
                    You are responsible for maintaining sufficient Wallet balance. Messages will not be
                    dispatched if your Wallet balance is insufficient at the time of dispatch.
                  </Li>
                </Ul>
              </>
            ),
          },
          {
            id: "refunds",
            title: "7. Refund policy",
            body: (
              <>
                <P>
                  Subscription fees and Wallet recharges are non-refundable once paid, except where required by
                  applicable law or expressly agreed in writing. In the limited circumstances where a refund is
                  approved at our sole discretion (for example, duplicate charges or proven service failure on
                  our part), the refund will be processed to the original payment method within 7–14 working
                  days, after deducting transaction fees levied by the payment gateway. Unused Wallet balance is
                  not refundable on Account closure but may be transferred to another active Account at our
                  discretion.
                </P>
              </>
            ),
          },
          {
            id: "user-responsibilities",
            title: "8. User responsibilities & acceptable use",
            body: (
              <>
                <P>
                  You agree to use the Services only for lawful business purposes and in compliance with all
                  applicable laws, regulations, and platform policies. In particular, you must:
                </P>
                <Ul>
                  <Li>
                    Obtain valid, demonstrable opt-in consent from every End-Recipient before sending any message
                    through SMSLocal, and maintain consent records for the period required by applicable law.
                  </Li>
                  <Li>
                    Honour opt-out (STOP / unsubscribe) requests promptly — within 24 hours and in any event
                    before the next message is sent.
                  </Li>
                  <Li>
                    Send only the message categories and template content that have been approved by Meta (for
                    WhatsApp), the DLT platform (for SMS), and Google (for RCS).
                  </Li>
                  <Li>
                    Maintain accurate sender identification and not impersonate any person, brand, or government
                    authority.
                  </Li>
                  <Li>
                    Cooperate with reasonable requests from SMSLocal regarding traffic patterns, complaint rates,
                    content quality, and quality scores.
                  </Li>
                </Ul>
                <P>
                  Full details are in our{" "}
                  <a href="/legal/acceptable-use/" className="font-medium text-primary hover:underline">
                    Acceptable Use Policy
                  </a>
                  .
                </P>
              </>
            ),
          },
          {
            id: "prohibited",
            title: "9. Prohibited content and activities",
            body: (
              <>
                <P>
                  You must not use the Services to send, store, transmit, or facilitate any content or activity
                  that:
                </P>
                <Ul>
                  <Li>
                    Is unlawful, fraudulent, deceptive, defamatory, obscene, pornographic, or otherwise
                    objectionable under Indian law.
                  </Li>
                  <Li>
                    Promotes violence, terrorism, hatred, or discrimination against any individual or group.
                  </Li>
                  <Li>
                    Infringes the intellectual property rights, privacy rights, or any other rights of a third
                    party.
                  </Li>
                  <Li>
                    Constitutes spam, unsolicited bulk messaging, phishing, smishing, vishing, or any
                    social-engineering attack.
                  </Li>
                  <Li>
                    Distributes malware, ransomware, viruses, worms, trojans, or any other malicious code.
                  </Li>
                  <Li>
                    Violates the WhatsApp Business Messaging Policy, WhatsApp Commerce Policy, Google RBM Policy,
                    TRAI TCCCPR-2018, the Information Technology Act, 2000, the Consumer Protection Act, 2019, or
                    any other applicable law.
                  </Li>
                  <Li>
                    Promotes prohibited or restricted goods or services (such as illegal drugs, unregistered
                    financial schemes, weapons, gambling where prohibited, and adult content) without the
                    necessary regulatory licences and platform approvals.
                  </Li>
                </Ul>
                <Callout>
                  We reserve the right to investigate suspected violations and to suspend or terminate Accounts
                  found to be in breach, without refund.
                </Callout>
              </>
            ),
          },
          {
            id: "whatsapp-compliance",
            title: "10. WhatsApp Business Policy compliance",
            body: (
              <>
                <Ul>
                  <Li>
                    Your use of the WhatsApp Business API via SMSLocal is subject to the WhatsApp Business
                    Solution Terms, the WhatsApp Business Messaging Policy, the WhatsApp Commerce Policy, and any
                    additional Meta requirements as updated from time to time.
                  </Li>
                  <Li>
                    Meta may suspend, throttle, or revoke your WhatsApp Business account, lower your quality
                    rating, or restrict your messaging limits at its sole discretion. SMSLocal will pass on these
                    decisions but is not responsible for them.
                  </Li>
                  <Li>
                    Template messages must be approved by Meta before they can be sent. We are not liable for
                    delays or rejections in the template approval process.
                  </Li>
                  <Li>
                    You are solely responsible for the WhatsApp display name, business profile, and Green Tick
                    application.
                  </Li>
                </Ul>
              </>
            ),
          },
          {
            id: "sms-compliance",
            title: "11. SMS, DLT & TRAI compliance",
            body: (
              <>
                <Ul>
                  <Li>
                    Customers must complete Entity, Header, and Template registration on a DLT platform (Jio,
                    Airtel, Vi, or BSNL) before any SMS traffic is dispatched through SMSLocal.
                  </Li>
                  <Li>
                    We may require your Principal Entity ID, Header ID, and Content Template IDs for each campaign
                    and may block campaigns that do not match registered templates.
                  </Li>
                  <Li>
                    Promotional SMS will be honoured only outside DND hours; service and transactional SMS follow
                    TRAI&apos;s defined exceptions.
                  </Li>
                  <Li>
                    Failure to comply with TRAI/DLT requirements may result in immediate suspension of SMS
                    Services without refund and onward financial penalties levied by access providers, which will
                    be recovered from you.
                  </Li>
                </Ul>
              </>
            ),
          },
          {
            id: "rcs",
            title: "12. RCS Business Messaging (planned service)",
            body: (
              <>
                <P>
                  We are preparing to launch RCS Business Messaging. When launched, RCS Services will be subject
                  to (a) Google&apos;s RCS Business Messaging Terms of Service, (b) carrier-specific commercial
                  and content requirements, and (c) a supplementary RCS Addendum to these Terms. Customers
                  wishing to use RCS will be required to complete RBM agent verification and brand verification
                  before going live.
                </P>
              </>
            ),
          },
          {
            id: "ip",
            title: "13. Intellectual property",
            body: (
              <>
                <P>
                  All intellectual property rights in the SMSLocal platform, including the website, logos, trade
                  marks, software, source code, APIs, documentation, designs, and all derivative works, are owned
                  by Swadesh Mobile or our licensors. We grant you a limited, non-exclusive, non-transferable,
                  revocable licence to access and use the Services solely for your internal business purposes
                  during the term of your subscription.
                </P>
                <P>
                  You retain all ownership of Customer Data. You grant us a limited licence to host, copy,
                  transmit, and display Customer Data only as necessary to provide the Services. You must not (a)
                  reverse engineer, decompile, or disassemble the platform; (b) resell or sublicense the Services
                  without our prior written consent; (c) use the Services to build a competing product; or (d)
                  remove or obscure any copyright, trademark, or proprietary notices.
                </P>
              </>
            ),
          },
          {
            id: "confidentiality",
            title: "14. Confidentiality and data protection",
            body: (
              <>
                <P>
                  Each party agrees to protect the confidential information of the other party with the same
                  degree of care it uses to protect its own confidential information, and in any event with no
                  less than reasonable care. Our processing of Personal Information is described in our{" "}
                  <a href="/legal/privacy/" className="font-medium text-primary hover:underline">
                    Privacy Policy
                  </a>{" "}
                  and, where applicable, in a Data Processing Addendum that may be executed between the parties.
                </P>
              </>
            ),
          },
          {
            id: "availability",
            title: "15. Service availability",
            body: (
              <>
                <P>
                  We will use commercially reasonable efforts to make the Services available 24×7, subject to
                  scheduled maintenance, force majeure events, and outages or restrictions caused by upstream
                  providers (including Meta, Google, telecom operators, and cloud infrastructure providers). We
                  do not guarantee uninterrupted, error-free, or perfectly secure operation. SLA-backed uptime
                  commitments, where offered, are set out in the relevant order form or addendum.
                </P>
              </>
            ),
          },
          {
            id: "liability",
            title: "16. Limitation of liability",
            body: (
              <>
                <P>
                  To the maximum extent permitted by law, in no event shall Swadesh Mobile, its directors,
                  employees, affiliates, or licensors be liable for any indirect, incidental, special,
                  consequential, exemplary, or punitive damages, including without limitation loss of profits,
                  revenue, business, goodwill, or data, or business interruption, arising out of or in connection
                  with these Terms or the Services, even if advised of the possibility of such damages.
                </P>
                <P>
                  Our aggregate liability under or in connection with these Terms in any rolling 12-month period
                  shall not exceed the total fees actually paid by you to SMSLocal during that period.
                </P>
              </>
            ),
          },
          {
            id: "indemnification",
            title: "17. Indemnification",
            body: (
              <>
                <P>
                  You agree to indemnify, defend, and hold harmless Swadesh Mobile, its officers, directors,
                  employees, affiliates, and licensors from and against any and all claims, demands, actions,
                  losses, damages, liabilities, costs, and expenses (including reasonable legal fees) arising out
                  of or in connection with: (a) your use of the Services; (b) your violation of these Terms or of
                  any applicable law; (c) your violation of any third-party right (including intellectual
                  property and privacy rights); (d) the content of messages you send through the Services; or (e)
                  penalties levied by Meta, Google, telecom operators, regulators, or end-recipients due to your
                  acts or omissions.
                </P>
              </>
            ),
          },
          {
            id: "termination",
            title: "18. Term, suspension and termination",
            body: (
              <>
                <Ul>
                  <Li>
                    These Terms remain in effect for as long as you have an active Account or use the Services.
                  </Li>
                  <Li>
                    We may suspend or terminate your Account or any Service immediately, with or without prior
                    notice, if (a) you breach these Terms, our Privacy Policy, or our Acceptable Use Policy; (b)
                    we are required to do so by Meta, Google, a telecom operator, regulator, or court of law; (c)
                    we detect fraud, abuse, or excessive complaint rates; or (d) your payment is overdue.
                  </Li>
                  <Li>
                    You may terminate your Account at any time by sending a written request to{" "}
                    <a href="mailto:support@smslocal.in" className="font-medium text-primary hover:underline">
                      support@smslocal.in
                    </a>
                    . Termination does not entitle you to any refund of subscription fees, Wallet balance, or
                    other charges already paid.
                  </Li>
                  <Li>
                    Upon termination, your access to the Services will cease and Customer Data will be deleted in
                    accordance with the retention timelines set out in our Privacy Policy.
                  </Li>
                </Ul>
              </>
            ),
          },
          {
            id: "account-deletion",
            title: "19. Account deletion",
            body: (
              <>
                <P>
                  Once you have signed up, your Account cannot be unilaterally self-deleted from the front-end
                  interface for audit and compliance reasons. You may, however, deactivate your Account at any
                  time, and you may submit a written deletion request to{" "}
                  <a href="mailto:support@smslocal.in" className="font-medium text-primary hover:underline">
                    support@smslocal.in
                  </a>
                  . We will process verified deletion requests in accordance with our Privacy Policy and
                  applicable law, retaining only the records required to be preserved by law (such as KYC,
                  billing, GST, and DLT records).
                </P>
              </>
            ),
          },
          {
            id: "modifications",
            title: "20. Modifications to these Terms",
            body: (
              <>
                <P>
                  We may amend these Terms from time to time. The updated version will be posted on this page
                  with a revised &quot;Last Updated&quot; date. Where the changes are material, we will provide
                  reasonable advance notice (typically 15 days) via email or in-product notification. Your
                  continued use of the Services after the effective date constitutes your acceptance of the
                  amended Terms.
                </P>
              </>
            ),
          },
          {
            id: "force-majeure",
            title: "21. Force majeure",
            body: (
              <>
                <P>
                  Neither party shall be liable for any failure or delay in performance to the extent caused by
                  an event beyond its reasonable control, including acts of God, war, terrorism, civil unrest,
                  strikes, pandemics, epidemics, government action, regulatory change, internet or telecom
                  outages, denial-of-service attacks, or failures of upstream providers (including Meta, Google,
                  and telecom operators).
                </P>
              </>
            ),
          },
          {
            id: "governing-law",
            title: "22. Governing law and jurisdiction",
            body: (
              <>
                <P>
                  These Terms shall be governed by and construed in accordance with the laws of India, without
                  regard to its conflict of laws principles. Subject to the dispute resolution clause below, the
                  courts at the principal place of business of Swadesh Mobile shall have exclusive jurisdiction
                  over any dispute arising out of or in connection with these Terms or the Services.
                </P>
              </>
            ),
          },
          {
            id: "dispute-resolution",
            title: "23. Dispute resolution",
            body: (
              <>
                <P>
                  In the event of any dispute, the parties shall first attempt to resolve the matter amicably
                  through good-faith negotiations within 30 days of written notice. If the dispute is not
                  resolved within that period, it shall be referred to and finally resolved by arbitration under
                  the Arbitration and Conciliation Act, 1996, by a sole arbitrator appointed by mutual consent.
                  The seat and venue of arbitration shall be the principal place of business of Swadesh Mobile,
                  and the language of arbitration shall be English. The arbitral award shall be final and
                  binding.
                </P>
              </>
            ),
          },
          {
            id: "miscellaneous",
            title: "24. Severability, waiver and entire agreement",
            body: (
              <>
                <P>
                  If any provision of these Terms is held to be invalid, illegal, or unenforceable, the remaining
                  provisions shall continue in full force and effect. No failure or delay in exercising any right
                  shall operate as a waiver of that right. These Terms, together with the Privacy Policy,
                  Acceptable Use Policy, and any product-specific addenda, constitute the entire agreement
                  between the parties and supersede all prior understandings.
                </P>
              </>
            ),
          },
          {
            id: "contact",
            title: "25. Contact us",
            body: (
              <>
                <P>Questions about these Terms or our Services may be directed to:</P>
                <Ul>
                  <Li>
                    <Strong>Email</Strong> —{" "}
                    <a href="mailto:support@smslocal.in" className="font-medium text-primary hover:underline">
                      support@smslocal.in
                    </a>
                  </Li>
                  <Li>
                    <Strong>Phone</Strong> —{" "}
                    <a href="tel:+917621073586" className="font-medium text-primary hover:underline">
                      +91 76210 73586
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
