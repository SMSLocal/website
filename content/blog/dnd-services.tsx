import {
  A,
  Blockquote,
  BlogFigure,
  Callout,
  FigureTable,
  H2,
  H3,
  InlineCode,
  LI,
  Lead,
  OL,
  P,
  Strong,
  UL,
} from "@/components/blog/blog-prose"
import { BlogFaq, BlogFaqItem } from "@/components/blog/blog-faq"
import { BlogInlineCta } from "@/components/blog/blog-cta"

export default function DndServicesPost() {
  return (
    <>
      <Lead>
        If you&apos;re a business sending SMS in India, DND is the single setting that decides
        whether your campaigns are legal. This guide explains what DND means for senders, how
        scrubbing actually works, and the practical rules that keep your sender ID unsuspended.
      </Lead>

      <Callout variant="info" title="Written for senders, not consumers">
        Looking for how to activate DND on your personal number? Read{" "}
        <A href="/blog/dnd-means/">DND means: the consumer guide</A>. This post is for founders,
        marketers, and developers planning SMS campaigns to Indian numbers. If you landed here
        searching for SMS bombers, read{" "}
        <A href="/resources/tools/sms-bomber/">why SMS bombing is illegal in India</A> and what to
        use instead.
      </Callout>

      <H2 id="what-it-means-for-senders">What DND means for you as a sender</H2>
      <P>
        The <Strong>National Customer Preference Register (NCPR)</Strong> is the master list of
        every Indian mobile number that has opted out of promotional SMS. Before you send a
        promotional message, you — or more accurately, your SMS provider — is legally required to
        scrub your recipient list against the NCPR and remove every number on it.
      </P>
      <P>
        If you send anyway, the operator drops the message at the gateway, logs a violation
        against your header, and after a few incidents, suspends your sender ID. In repeat cases,
        TRAI can blacklist your company from sending SMS entirely.
      </P>

      <BlogFigure
        src="/blog/what-dnd-means-for-senders.webp"
        alt="Illustration explaining what India's DND (Do Not Disturb) regulation means for SMS senders — the legal obligation to scrub recipient lists against the NCPR before every promotional send."
        caption="DND isn't optional for senders. Every promotional SMS must be scrubbed against the National Customer Preference Register before it leaves your platform."
      />

      <H2 id="how-scrubbing-works">How scrubbing actually works</H2>
      <P>
        Scrubbing happens in two places:
      </P>
      <OL>
        <LI>
          <Strong>Sender-side scrub</Strong> (before submission). A compliant SMS platform pulls
          the latest NCPR deltas every 24 hours and filters your list before it leaves the
          platform. This is what SMSLocal does automatically.
        </LI>
        <LI>
          <Strong>Operator-side scrub</Strong> (at the gateway). Each operator also scrubs every
          submitted message against its copy of NCPR. If your sender-side scrub missed a number,
          the operator drops the message and records a violation.
        </LI>
      </OL>
      <Callout variant="warning" title="Two scrubs don&apos;t make it safer">
        You might think operator-side scrub is a safety net — it isn&apos;t. Every dropped
        message is logged against <Strong>your</Strong> header, and accumulated violations get
        your header suspended. The goal is to never rely on the operator catching you.
      </Callout>

      <BlogFigure
        src="/blog/how-scrubbing-works.webp"
        alt="Diagram showing how DND scrubbing works in India — sender-side NCPR scrub before submission and operator-side scrub at the gateway, with violations logged against the sender's header."
        caption="Scrubbing happens twice: once on your platform before submission, and again at the operator gateway. Every drop at the gateway is a logged violation against your header."
      />

      <H2 id="promotional-vs-transactional">Promotional vs. transactional — the DND boundary</H2>
      <P>
        DND only applies to <Strong>promotional</Strong> SMS. Transactional and service-explicit
        messages are exempt, so OTPs and delivery updates still reach every number. The challenge
        is that the category is determined by the <Strong>header you send from</Strong> and the{" "}
        <Strong>approved template body</Strong> — not by your intent.
      </P>
      <FigureTable
        columns={["Category", "Hits DND-activated numbers?", "Send window", "Header type"]}
        rows={[
          [<Strong key="t">Transactional</Strong>, "No (exempt)", "24×7", "Transactional header"],
          [
            <Strong key="se">Service-explicit</Strong>,
            "No (exempt)",
            "24×7",
            "Transactional header",
          ],
          [
            <Strong key="si">Service-implicit</Strong>,
            "Partially exempt",
            "9am–9pm IST",
            "Transactional or promotional",
          ],
          [
            <Strong key="p">Promotional</Strong>,
            "Yes (blocked)",
            "9am–9pm IST",
            "Promotional header only",
          ],
        ]}
        caption="Get the category wrong and your messages disappear silently."
      />
      <P>
        If you try to send a marketing offer through a transactional header, the template gets
        rejected during DLT approval. If it somehow gets through, the operator catches it at the
        gateway and suspends the header. There&apos;s no &quot;grey area&quot; — messages must
        match their header&apos;s declared category exactly.
      </P>

      <H2 id="how-to-check">How to check if a number is on DND</H2>
      <P>
        You don&apos;t check numbers one at a time — you scrub a list. Three practical options:
      </P>

      <H3>Option 1: Let your SMS provider handle it (recommended)</H3>
      <P>
        Every legitimate Indian SMS provider does NCPR scrub automatically. When you upload a list
        to SMSLocal, we scrub it against the latest NCPR snapshot before the first message goes
        out, and we show you exactly how many numbers were filtered.
      </P>

      <H3>Option 2: TRAI&apos;s NCPR API (for in-house stacks)</H3>
      <P>
        TRAI exposes an NCPR lookup API that you can query programmatically. This is only useful
        if you&apos;re building your own SMS platform — in which case you&apos;ll also need DLT
        registration, operator bindings, and scrub infrastructure. Most teams don&apos;t do this.
      </P>

      <H3>Option 3: Manual check at trai.gov.in</H3>
      <P>
        For individual number lookups (e.g., a customer complaint investigation), you can check a
        single number at <A href="https://www.trai.gov.in/">trai.gov.in</A>. Not suitable for
        list-scale work.
      </P>

      <BlogFigure
        src="/blog/how-to-check-dnd-status.webp"
        alt="Step-by-step guide on how to check DND status of a mobile number in India — using an SMS provider dashboard, TRAI's NCPR API, or trai.gov.in for individual lookups."
        caption="For production sends, let your SMS provider handle NCPR scrub automatically. Manual trai.gov.in checks are only useful for investigating individual complaints."
      />

      <H2 id="send-windows">Send windows: when you can send what</H2>
      <P>
        TRAI restricts promotional and service-implicit SMS to a daily time window:
      </P>
      <UL>
        <LI>
          <Strong>Promotional:</Strong> 9am to 9pm IST only
        </LI>
        <LI>
          <Strong>Service-implicit:</Strong> 9am to 9pm IST only
        </LI>
        <LI>
          <Strong>Service-explicit:</Strong> 24×7, any time
        </LI>
        <LI>
          <Strong>Transactional:</Strong> 24×7, any time (OTPs, payment alerts, delivery updates)
        </LI>
      </UL>
      <Callout variant="tip" title="Your queue should know the clock">
        Don&apos;t fire marketing SMS at 11pm assuming they&apos;ll be delayed to 9am — the
        operator drops them and counts it as a violation. SMSLocal&apos;s scheduler respects send
        windows automatically; if you&apos;re building your own stack, enforce it in your queue.
      </Callout>

      <BlogInlineCta
        title="Send DND-compliant SMS in India"
        body="SMSLocal scrubs every list against the NCPR, enforces send windows, and matches header categories automatically. Get started with free credit to test compliant delivery."
        primary={{ label: "Start free — ₹60 credit", href: "/signup/" }}
        secondary={{ label: "View pricing", href: "/pricing/" }}
      />
      <H2 id="consent">Consent: the other half of compliance</H2>
      <P>
        DND tells you <Strong>who</Strong> to skip. Consent tells you <Strong>who you&apos;re
        allowed to message in the first place</Strong>. Even if a number is not on DND, if you
        don&apos;t have documented consent for promotional SMS, you&apos;re non-compliant.
      </P>
      <P>
        Consent for SMS has three attributes that every operator will ask for if a complaint is
        raised:
      </P>
      <OL>
        <LI>
          <Strong>Timestamp:</Strong> when did the user opt in?
        </LI>
        <LI>
          <Strong>Channel:</Strong> web form, in-app toggle, hard-copy signup, call recording?
        </LI>
        <LI>
          <Strong>Scope:</Strong> what exactly did they consent to? &quot;Marketing offers&quot;
          is not specific enough. &quot;Weekly offer emails and 2 SMS/month from Brand X&quot; is.
        </LI>
      </OL>

      <H2 id="penalties">What happens when you violate DND</H2>
      <FigureTable
        columns={["Violation", "First offence", "Repeat offence"]}
        rows={[
          [
            <Strong key="1">Sending promotional SMS to DND number</Strong>,
            "Message dropped, violation logged",
            "Header suspended 7–30 days",
          ],
          [
            <Strong key="2">Sending outside 9am–9pm window</Strong>,
            "Message dropped",
            "Header suspended",
          ],
          [
            <Strong key="3">Using transactional header for marketing</Strong>,
            "Template rejected or header suspended",
            "PE blacklisted, re-registration required",
          ],
          [
            <Strong key="4">No valid consent for recipients</Strong>,
            "Consumer complaint escalated to TRAI",
            "₹1–10 lakh fines; header suspension",
          ],
        ]}
        caption="TRAI&apos;s enforcement has real teeth — violations compound fast."
      />

      <H2 id="practical-playbook">Practical playbook: staying compliant</H2>
      <OL>
        <LI>
          <Strong>Use a provider that scrubs NCPR automatically.</Strong> Verify in the dashboard
          that scrub counts are non-zero on every promotional send.
        </LI>
        <LI>
          <Strong>Register separate headers for transactional and promotional.</Strong> Never
          reuse a header across categories.
        </LI>
        <LI>
          <Strong>Log every consent event</Strong> with timestamp, IP, user-ID, and the exact
          consent text. Retain for at least 2 years.
        </LI>
        <LI>
          <Strong>Honour STOP keyword within 24 hours.</Strong> Every promotional template must
          include an opt-out instruction. When a user replies STOP, remove them everywhere.
        </LI>
        <LI>
          <Strong>Respond to complaints within 48 hours.</Strong> Operators forward every
          consumer complaint; ignoring them is how headers get suspended.
        </LI>
        <LI>
          <Strong>Monitor delivery reports for DND drops.</Strong> Your DLR feed distinguishes
          &quot;DND filtered&quot; from other failure reasons. A sudden spike in DND drops usually
          means your list is stale — clean it.
        </LI>
      </OL>

      <H2 id="suspended-header-recovery">How to recover a suspended sender ID</H2>
      <P>
        A suspended header means your messages stop being delivered — silently, with no error shown
        to your application. Recovery follows a defined process, but it takes time. Here is what
        to do the moment you suspect a suspension.
      </P>
      <OL>
        <LI>
          <Strong>Confirm the suspension.</Strong> Log in to your operator&apos;s DLT portal and
          check the Header status. A suspended header shows as &ldquo;Blocked&rdquo; or
          &ldquo;Suspended&rdquo;. SMSLocal also flags this in your dashboard under Sender IDs.
        </LI>
        <LI>
          <Strong>Identify the violation.</Strong> The DLT portal lists the complaint or
          violation that triggered the suspension — usually a DND breach, a send-window violation,
          or template mismatch. Read it carefully before submitting a response.
        </LI>
        <LI>
          <Strong>File a re-instatement request.</Strong> On the DLT portal (Jio, Airtel, Vi, or
          BSNL), there is a &ldquo;Raise Dispute&rdquo; or &ldquo;Re-instatement Request&rdquo;
          option against the suspended header. Attach evidence: your NCPR scrub logs, consent
          records, and a corrective action plan.
        </LI>
        <LI>
          <Strong>During suspension: register a new header.</Strong> If you need to keep sending
          while the dispute is resolved, register a second header under your PE and use that for
          production traffic. Migrating DLT-approved templates to a new header takes 2–4 hours.
        </LI>
        <LI>
          <Strong>Fix the root cause before re-instating.</Strong> Operators reinstate suspended
          headers but will not tolerate a second violation. If you sent to DND numbers because your
          list was stale, clean it. If a template was mis-categorised, correct the template
          category before sending again.
        </LI>
      </OL>
      <Callout variant="warning" title="Suspension timelines">
        A first-time promotional DND violation typically results in a 7–30 day suspension.
        Repeat violations can extend to 90 days or result in permanent PE blacklisting. The
        re-instatement window is usually 15–30 days from the date of suspension notice.
      </Callout>

      <BlogFigure
        src="/blog/how-to-recover-a-suspended-sender-id.webp"
        alt="Step-by-step guide on how to recover a suspended DLT sender ID in India — confirming the suspension, identifying the violation, filing a re-instatement request, and fixing the root cause."
        caption="Recovery from a suspended header follows a defined process: confirm on the DLT portal, attach scrub logs and consent records, and fix the root cause before re-instating."
      />

      <H2 id="dpdp-consent">Consent in 2026 — DPDP Act adds a new layer</H2>
      <P>
        India&apos;s <Strong>Digital Personal Data Protection (DPDP) Act 2023</Strong> adds a
        statutory consent framework on top of TRAI&apos;s existing DND rules. The practical
        difference: TRAI governs what you can send and when; DPDP governs how you collected the
        data and whether the consent is legally valid.
      </P>
      <P>
        Under DPDP, consent for receiving promotional SMS must be:
      </P>
      <UL>
        <LI><Strong>Free</Strong> — not bundled with other terms or gated on a product purchase</LI>
        <LI><Strong>Specific</Strong> — covering the exact type of SMS you plan to send</LI>
        <LI><Strong>Informed</Strong> — the user must understand what they are consenting to</LI>
        <LI><Strong>Unambiguous</Strong> — a pre-ticked checkbox is not valid consent</LI>
        <LI><Strong>Withdrawable</Strong> — a STOP mechanism must be provided and honoured</LI>
      </UL>
      <P>
        Enforcement is through the Data Protection Board, which can impose penalties up to ₹250
        crore per breach for large data principals. Most SMS compliance teams are revisiting their
        opt-in flows in 2026 to ensure DPDP alignment sits alongside existing TRAI compliance.
      </P>

      <H2 id="faq">FAQ</H2>
      <BlogFaq>
        <BlogFaqItem q={"Do I need to scrub NCPR for transactional SMS?"}>
        No. DND doesn&apos;t apply to transactional/service-explicit senders. OTPs, payment
        receipts, and delivery updates reach every number. That said, double-check that your
        header is correctly categorised as transactional — if it slips into promotional, DND
        scrub suddenly matters.
        </BlogFaqItem>

        <BlogFaqItem q={"How often should I scrub my list?"}>
        Before every send. NCPR updates daily, and a number that was ok yesterday might be on
        DND today. SMSLocal scrubs on every submission automatically.
        </BlogFaqItem>

        <BlogFaqItem q={"Can I use service-implicit category to reach DND numbers with soft marketing?"}>
        No. Service-implicit is for genuine service follow-ups (policy updates, expiry reminders
        for existing customers) — not disguised marketing. Operators review templates carefully
        and categorise based on actual content.
        </BlogFaqItem>

        <BlogFaqItem q={"What if a user gave consent then activated DND?"}>
        DND overrides individual consent for promotional SMS. If they&apos;re on DND, you
        can&apos;t send them marketing, even if they signed up last month. Transactional messages
        still reach them.
        </BlogFaqItem>

        <BlogFaqItem q={"Do WhatsApp Business messages fall under DND?"}>
        No — WhatsApp is over-the-top (OTT), not telecom. WhatsApp has its own rules (opt-in,
        business verification, 24-hour session window) administered by Meta. Read our{" "}
        <A href="/products/whatsapp-business-api/">WhatsApp Business API</A> page for the details.
        </BlogFaqItem>
      </BlogFaq>

      <Blockquote cite="Compliance lead, Indian fintech">
        The companies that never hit a violation are the boring ones. They scrub on every send,
        log consent obsessively, and treat complaints as a priority. There&apos;s no shortcut.
      </Blockquote>

      <Callout variant="tip" title="Let us handle the plumbing">
        SMSLocal does NCPR scrub, send-window enforcement, category matching, and consent logging
        out of the box. See our <A href="/products/bulk-sms/">Bulk SMS</A> and{" "}
        <A href="/products/otp-sms/">OTP SMS</A> products, or jump straight into the{" "}
        <A href="/developers/api-docs/">API reference</A>.
      </Callout>
    </>
  )
}
