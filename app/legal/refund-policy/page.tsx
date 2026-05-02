import type { Metadata } from "next"
import { Callout, LegalDoc, Li, P, Strong, Ul } from "@/components/legal/legal-doc"
import { BreadcrumbJsonLd } from "@/components/seo/json-ld"
import { getPageMetadata } from "@/lib/seo"

// ─── SEO — edit lib/seo/registry.ts or open /dev/seo to preview ──────────────
export const metadata: Metadata = getPageMetadata("/legal/refund-policy")

export default function RefundPolicyPage() {
  return (
    <>
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Legal", path: "/legal/refund-policy" },
          { name: "Refund and Cancellation Policy", path: "/legal/refund-policy" },
        ]}
      />
      <LegalDoc
        category="Refunds"
        title="Refund and Cancellation Policy"
        summary="SMSLocal operates on a prepaid wallet model. This page sets out when balance is refundable, how to request a refund, and the timelines we follow for Indian and international payment methods."
        lastUpdated="April 22, 2026"
        effectiveDate="April 22, 2026"
        relatedLinks={[
          { label: "Pricing", href: "/pricing" },
          { label: "Terms of service", href: "/legal/terms" },
          { label: "Privacy policy", href: "/legal/privacy" },
        ]}
        sections={[
          {
            id: "wallet-model",
            title: "1. How billing works",
            body: (
              <>
                <P>
                  SMSLocal accounts are funded through a prepaid wallet. When you send a message we deduct
                  the per-message price (as shown at the time of dispatch) from your wallet. Wallet top-ups
                  are subject to GST as applicable under Indian law, and we issue a GST-compliant tax invoice
                  for each successful top-up from the dashboard.
                </P>
              </>
            ),
          },
          {
            id: "promotional-credits",
            title: "2. Promotional credits and sign-up offers",
            body: (
              <>
                <P>
                  We occasionally offer promotional wallet credits — for example, the{" "}
                  <Strong>₹60 free credit</Strong> shown to new accounts on marketing pages, signup forms,
                  and campaign banners. Promotional credits are governed by the following rules, which apply
                  in addition to the general wallet terms above.
                </P>
                <Ul>
                  <Li>
                    <Strong>Minimum recharge to unlock.</Strong> Promotional credits become usable only after
                    the workspace completes its first paid wallet recharge of at least{" "}
                    <Strong>₹100 (plus applicable GST)</Strong>. On a qualifying first recharge of ₹100, the
                    usable balance becomes ₹160 — your ₹100 paid top-up plus the ₹60 promotional credit.
                  </Li>
                  <Li>
                    <Strong>One promotion per workspace and per business entity.</Strong> Duplicate
                    workspaces created to claim the offer more than once will have the promotional credit
                    revoked.
                  </Li>
                  <Li>
                    <Strong>Not withdrawable as cash.</Strong> Promotional credits can be spent on platform
                    usage (SMS, WhatsApp conversations, OTP routes, AI Agent tokens, and other billable
                    services) but cannot be refunded, withdrawn, transferred to another workspace, or
                    converted to cash under any circumstances.
                  </Li>
                  <Li>
                    <Strong>Spend order.</Strong> When you send messages after unlocking the promotion, paid
                    wallet balance is consumed first and promotional credit is consumed only once paid
                    balance is exhausted, unless we state otherwise in a specific campaign.
                  </Li>
                  <Li>
                    <Strong>Validity.</Strong> Unused promotional credit expires 90 days after it is issued,
                    or earlier if a campaign page explicitly states a shorter window.
                  </Li>
                  <Li>
                    <Strong>No standalone refund.</Strong> If you request a refund of your paid wallet
                    balance before unlocking the promotion, we refund only the paid amount; the ₹60 offer
                    does not apply and is not paid out.
                  </Li>
                  <Li>
                    <Strong>Change of terms.</Strong> We may change the amount, minimum recharge, or validity
                    of any promotional offer at any time. Changes apply prospectively and do not reduce the
                    value of credits already unlocked by an existing workspace.
                  </Li>
                </Ul>
                <Callout>
                  Short version: &ldquo;₹60 free credit&rdquo; is a welcome bonus, not cash. It becomes
                  usable once you recharge ₹100 or more — so the first paid top-up lands in your wallet as
                  ₹160. It is non-refundable and cannot be withdrawn.
                </Callout>
              </>
            ),
          },
          {
            id: "what-is-refundable",
            title: "3. What is refundable",
            body: (
              <>
                <P>Refundable situations include:</P>
                <Ul>
                  <Li>
                    <Strong>Duplicate or accidental top-ups</Strong> — wallet recharges made in error within
                    the previous 7 days that have not been spent.
                  </Li>
                  <Li>
                    <Strong>Undelivered pre-paid credit on workspace closure</Strong> — if you close your
                    workspace and have unused balance that was funded within the preceding 24 months.
                  </Li>
                  <Li>
                    <Strong>Verifiable platform outages</Strong> — service credits or a partial refund for
                    periods where availability falls below the SLA commitment in your plan.
                  </Li>
                  <Li>
                    <Strong>Billing errors</Strong> — incorrect charges caused by a platform defect, once
                    reconciled against delivery reports.
                  </Li>
                </Ul>
              </>
            ),
          },
          {
            id: "what-is-not-refundable",
            title: "4. What is not refundable",
            body: (
              <>
                <P>The following are not refundable:</P>
                <Ul>
                  <Li>
                    <Strong>Messages reported as delivered</Strong> by the operator or WhatsApp, regardless of
                    whether the recipient opened the message.
                  </Li>
                  <Li>
                    <Strong>Failed deliveries due to recipient state</Strong> — DND registration, handset
                    switched off, invalid number, blocked by recipient, or rejected by DLT scrubbing because
                    of a mis-registered template on your side.
                  </Li>
                  <Li>
                    <Strong>Credits older than 24 months</Strong> from the date of recharge — they expire and
                    are not refundable.
                  </Li>
                  <Li>
                    <Strong>Setup fees, onboarding charges, and one-time integration fees</Strong> once the
                    work has been delivered.
                  </Li>
                  <Li>
                    <Strong>Third-party charges passed through by us</Strong> — DLT registration fees,
                    WhatsApp conversation fees charged by Meta, short-code rentals, and operator setup fees.
                  </Li>
                </Ul>
                <Callout>
                  Messages that were attempted but failed for reasons on the recipient&apos;s side do not
                  automatically qualify for refund. Refer to the delivery-report status codes documented in
                  the dashboard to understand what was attempted and what was billed.
                </Callout>
              </>
            ),
          },
          {
            id: "how-to-request",
            title: "5. How to request a refund",
            body: (
              <>
                <P>Email{" "}
                  <a href="mailto:billing@smslocal.in" className="font-medium text-primary hover:underline">
                    billing@smslocal.in
                  </a>{" "}
                  from the email address of a workspace owner. Include:
                </P>
                <Ul>
                  <Li>Workspace ID and GSTIN (if registered).</Li>
                  <Li>Invoice number or transaction reference.</Li>
                  <Li>Amount requested and the reason.</Li>
                  <Li>Your preferred refund method (original payment instrument by default).</Li>
                </Ul>
                <P>
                  We acknowledge receipt within 2 business days and share a decision within 7 business days.
                  Complex cases (platform outages, cross-border refunds) may take up to 14 business days.
                </P>
              </>
            ),
          },
          {
            id: "timelines",
            title: "6. Timelines for processing",
            body: (
              <>
                <P>Once approved, refunds are credited as follows:</P>
                <Ul>
                  <Li>
                    <Strong>UPI and Indian cards</Strong> — within 5 to 7 business days of approval,
                    depending on your bank.
                  </Li>
                  <Li>
                    <Strong>NEFT / RTGS</Strong> — within 3 to 5 business days of approval.
                  </Li>
                  <Li>
                    <Strong>International cards</Strong> — within 10 to 15 business days of approval, subject
                    to your issuing bank.
                  </Li>
                  <Li>
                    <Strong>Wire transfers</Strong> — within 10 to 20 business days, with wire-transfer
                    charges borne by the customer.
                  </Li>
                </Ul>
              </>
            ),
          },
          {
            id: "workspace-closure",
            title: "7. Workspace closure",
            body: (
              <>
                <P>
                  You can close your workspace from Settings → Billing. Closure cancels future billing
                  immediately. Refundable balance (if any) is processed in accordance with this policy, net
                  of GST that we have already remitted to the tax authority and banking charges borne by us
                  for the original top-up.
                </P>
              </>
            ),
          },
          {
            id: "disputes",
            title: "8. Disputes and escalations",
            body: (
              <>
                <P>
                  If you disagree with a refund decision, escalate to{" "}
                  <a href="mailto:grievance@smslocal.in" className="font-medium text-primary hover:underline">
                    grievance@smslocal.in
                  </a>
                  . We respond within 5 business days with a final position. If still unresolved, disputes
                  are handled as described in the Terms of Service.
                </P>
              </>
            ),
          },
          {
            id: "chargebacks",
            title: "9. Chargebacks",
            body: (
              <>
                <P>
                  If you file a chargeback with your card issuer without first contacting our billing team,
                  we may suspend your workspace until the chargeback is resolved. We strongly prefer a direct
                  refund process — it is faster and preserves your sending history and DLT registrations.
                </P>
              </>
            ),
          },
        ]}
      />
    </>
  )
}
