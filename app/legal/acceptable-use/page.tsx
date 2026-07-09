import type { Metadata } from "next"
import { Callout, LegalDoc, Li, P, Strong, Ul } from "@/components/legal/legal-doc"
import { BreadcrumbJsonLd } from "@/components/seo/json-ld"
import { getPageMetadata } from "@/lib/seo"

// ─── SEO — edit lib/seo/registry.ts or open /dev/seo to preview ──────────────
export const metadata: Metadata = getPageMetadata("/legal/acceptable-use")

export default function AcceptableUsePage() {
  return (
    <>
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Legal", path: "/legal/acceptable-use" },
          { name: "Acceptable Use Policy", path: "/legal/acceptable-use" },
        ]}
      />
      <LegalDoc
        category="Acceptable Use"
        title="Acceptable Use Policy"
        summary="To keep delivery rates high for everyone, every customer on SMSLocal follows a common set of content and behavioural rules. This page documents them in one place and describes how we enforce them."
        lastUpdated="April 22, 2026"
        effectiveDate="April 22, 2026"
        relatedLinks={[
          { label: "Terms of service", href: "/legal/terms" },
          { label: "Privacy policy", href: "/legal/privacy" },
          { label: "DPDPA notice", href: "/legal/dpdpa" },
        ]}
        sections={[
          {
            id: "overview",
            title: "1. Overview",
            body: (
              <>
                <P>
                  You are responsible for every message sent from your workspace. This policy (&quot;AUP&quot;)
                  is part of the Terms of Service. Violations may result in throttling, suspension, account
                  termination, operator-level blacklisting, and reimbursement of fines we incur as a result.
                </P>
              </>
            ),
          },
          {
            id: "prohibited-content",
            title: "2. Prohibited content",
            body: (
              <>
                <P>You must not send content that:</P>
                <Ul>
                  <Li>Is illegal under Indian law or the law of the recipient&apos;s country.</Li>
                  <Li>
                    Promotes adult services, escort services, explicit sexual content, or any form of child
                    sexual abuse material.
                  </Li>
                  <Li>
                    Solicits or facilitates illegal drugs, counterfeit medicine, or prescription drugs without
                    the required licences.
                  </Li>
                  <Li>
                    Offers weapons, ammunition, or explosives to the general public outside a regulated sales
                    channel.
                  </Li>
                  <Li>
                    Promotes hate, harassment, discrimination, or violence based on caste, religion, gender,
                    sexual orientation, nationality, disability, or similar characteristics.
                  </Li>
                  <Li>
                    Spreads deliberate misinformation about elections, public health, or emergencies.
                  </Li>
                  <Li>
                    Facilitates gambling, cryptocurrency trading, or betting where prohibited by law.
                  </Li>
                  <Li>
                    Infringes intellectual-property rights, impersonates another brand, or uses a sender ID
                    you do not have the right to use.
                  </Li>
                </Ul>
              </>
            ),
          },
          {
            id: "prohibited-behaviour",
            title: "3. Prohibited behaviour",
            body: (
              <>
                <P>You must not:</P>
                <Ul>
                  <Li>
                    Send unsolicited commercial communication to recipients who have not opted in through a
                    lawful process, or to recipients who have opted out.
                  </Li>
                  <Li>
                    Run phishing campaigns, smishing, pretexting, or social-engineering attempts against
                    recipients.
                  </Li>
                  <Li>
                    Circumvent DND (Do-Not-Disturb) registrations, DLT scrubbing, or operator-level
                    throttles.
                  </Li>
                  <Li>
                    Purchase or use contact lists sourced without verifiable, purpose-specific consent.
                  </Li>
                  <Li>
                    Use the platform to enable a service that you resell to third parties without a signed
                    reseller agreement with us.
                  </Li>
                  <Li>
                    Probe, scan, or stress-test the Services, or attempt to bypass authentication, rate
                    limits, or IP-based controls.
                  </Li>
                  <Li>
                    Introduce malware, tracking scripts without consent, or bulk-harvest delivery reports
                    for purposes other than operating your own messaging programme.
                  </Li>
                </Ul>
              </>
            ),
          },
          {
            id: "sensitive-categories",
            title: "4. Sensitive categories",
            body: (
              <>
                <P>
                  Some categories are allowed but require additional safeguards. Contact sales before sending
                  at scale in any of these areas:
                </P>
                <Ul>
                  <Li>
                    <Strong>Financial services</Strong> — lending, credit, investment advisory, insurance.
                  </Li>
                  <Li>
                    <Strong>Healthcare</Strong> — appointments, prescription reminders, lab results. Never
                    include a full diagnosis or clinical detail that is not the recipient&apos;s right to
                    receive over an unencrypted channel.
                  </Li>
                  <Li>
                    <Strong>Political messaging</Strong> — subject to the Election Commission of India&apos;s
                    silence period and a dedicated DLT category.
                  </Li>
                  <Li>
                    <Strong>International traffic</Strong> — you must comply with the destination country&apos;s
                    laws (for example, TCPA in the US, PECR in the UK, LGPD in Brazil).
                  </Li>
                </Ul>
              </>
            ),
          },
          {
            id: "consent",
            title: "5. Consent standards",
            body: (
              <>
                <P>Valid consent must be:</P>
                <Ul>
                  <Li>
                    <Strong>Specific</Strong> — tied to the communication purpose, not hidden in generic T&amp;Cs.
                  </Li>
                  <Li>
                    <Strong>Informed</Strong> — the recipient knew what they were agreeing to and who was
                    sending.
                  </Li>
                  <Li>
                    <Strong>Demonstrable</Strong> — you can produce a time-stamped record on request.
                  </Li>
                  <Li>
                    <Strong>Revocable</Strong> — every promotional message includes a working opt-out (for
                    example, <Strong>STOP</Strong> to the sender ID).
                  </Li>
                </Ul>
                <Callout>
                  If a recipient opts out, honour it within 24 hours across every channel you operate.
                </Callout>
              </>
            ),
          },
          {
            id: "enforcement",
            title: "6. Enforcement",
            body: (
              <>
                <P>
                  We monitor for complaints, DLT scrubbing rejections, operator blacklisting, and spam
                  signals from recipients. Depending on severity, we may:
                </P>
                <Ul>
                  <Li>Send a warning and require corrective action.</Li>
                  <Li>Throttle delivery on affected routes until the issue is resolved.</Li>
                  <Li>Suspend the workspace pending investigation.</Li>
                  <Li>
                    Terminate the workspace and report the incident to operators, TRAI, or law enforcement
                    where required.
                  </Li>
                </Ul>
              </>
            ),
          },
          {
            id: "report",
            title: "7. Reporting abuse",
            body: (
              <>
                <P>
                  If you believe another SMSLocal customer is violating this policy, email{" "}
                  <a href="mailto:abuse@smslocal.in" className="font-medium text-primary hover:underline">
                    abuse@smslocal.in
                  </a>{" "}
                  with the offending message (or a screenshot), the sender ID, and the time received. We
                  triage abuse reports within 24 hours.
                </P>
              </>
            ),
          },
        ]}
      />
    </>
  )
}
