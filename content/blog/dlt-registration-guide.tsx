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

export default function DltRegistrationGuide() {
  return (
    <>
      <Lead>
        Every Indian business that wants to send SMS — even a single OTP — has to be registered on
        DLT. This guide walks through the exact steps, the paperwork, the gotchas, and the reasons
        your first application will probably get rejected.
      </Lead>

      <Callout variant="info" title="Written for founders and developers, not lawyers">
        We deliberately skip the legal philosophy and focus on what you actually do. If you need
        the statutory text, check TRAI&apos;s{" "}
        <A href="https://trai.gov.in/">official regulation page</A>. Everything here is based on
        seven years of onboarding Indian businesses onto DLT at SMSLocal.
      </Callout>

      <H2 id="why-dlt-exists">Why DLT exists</H2>
      <P>
        <Strong>Distributed Ledger Technology (DLT)</Strong> is the compliance layer TRAI mandates
        between every Indian sender and every Indian mobile number. Before DLT, consumers were
        drowning in spam and had no real recourse. The regulator&apos;s answer was to make every
        sender, every sender-ID, every template, and every consent chain verifiable on a
        blockchain-backed registry — operated by the major telecom operators.
      </P>
      <P>
        In practice, DLT means three things for you: you register <Strong>who</Strong> is sending
        (your company as a Principal Entity), <Strong>what name</Strong> shows up on recipients'
        phones (the Header), and <Strong>what you plan to say</Strong> (the Content Template). If
        any of these are missing or mismatched, the message is dropped at the operator gateway —
        not delivered, not reported, not billed.
      </P>

      <BlogFigure
        src="/blog/why-dlt-exists.webp"
        alt="Illustration explaining why India's DLT (Distributed Ledger Technology) regulation exists — the TRAI-mandated compliance layer that governs every SMS sender in India."
        caption="DLT is TRAI's answer to the Indian SMS spam crisis — a blockchain-backed registry that makes every sender, sender ID, and message template verifiable before delivery."
      />

      <H2 id="who-needs-it">Who actually needs DLT</H2>
      <P>
        You need DLT if your application sends <Strong>any</Strong> SMS to <Strong>any</Strong>{" "}
        Indian mobile number, whether transactional, promotional, or service-related. There are
        very few exceptions — and even those (personal messages from a consumer SIM) don&apos;t
        apply when you&apos;re building a product.
      </P>
      <UL>
        <LI>
          <Strong>Transactional senders</Strong> (OTPs, payment receipts, shipping updates): yes,
          DLT required. See our <A href="/products/otp-sms/">OTP SMS product</A> for how this
          works end-to-end once you are registered.
        </LI>
        <LI>
          <Strong>Service senders</Strong> (alerts, reminders, policy updates): yes, DLT required.
        </LI>
        <LI>
          <Strong>Promotional senders</Strong> (marketing, offers, newsletters): yes, and
          additionally constrained by DND rules and 9am–9pm IST send windows. Our{" "}
          <A href="/products/bulk-sms/">Bulk SMS product</A> handles NCPR scrubbing, send-window
          enforcement, and DLT compliance automatically.
        </LI>
        <LI>
          <Strong>International businesses sending to Indian numbers</Strong>: yes, you still need
          DLT, and typically appoint a local entity or use your Indian operations arm as the PE.
        </LI>
      </UL>

      <BlogFigure
        src="/blog/who-actually-needs-dlt.webp"
        alt="Visual guide showing who actually needs DLT registration in India — covering transactional, service, promotional, and international SMS senders."
        caption="If your application sends any SMS to any Indian mobile number, DLT is mandatory — no exceptions for OTPs, alerts, or promotional messages."
      />

      <H2 id="the-four-things">The four things you&apos;ll register</H2>
      <P>
        People rush this part and pay for it later. You&apos;ll register four distinct objects,
        and each has its own approval cycle, rejection reasons, and update semantics.
      </P>
      <FigureTable
        columns={["Object", "What it is", "Who approves", "Typical time"]}
        rows={[
          [
            <Strong key="pe">Principal Entity</Strong>,
            "Your legal business identity on DLT",
            "Operator (Jio/Airtel/Vi/BSNL)",
            "24–72 hrs",
          ],
          [
            <Strong key="header">Header (Sender ID)</Strong>,
            "The 6-character name recipients see",
            "Operator",
            "Near-instant after PE is approved",
          ],
          [
            <Strong key="template">Content Template</Strong>,
            "The exact SMS body with variable slots",
            "Operator",
            "2–24 hrs",
          ],
          [
            <Strong key="consent">Consent</Strong>,
            "Your proof that a user opted in",
            "You (audit trail)",
            "Ongoing",
          ],
        ]}
        caption="Every sender registers all four. Templates and consent are the ongoing work."
      />

      <H2 id="principal-entity">Step 1: Register your Principal Entity (PE)</H2>
      <P>
        The PE is your company&apos;s identity on DLT. You only register it once per legal entity,
        and the same PE works across every operator&apos;s DLT portal. Pick <Strong>one</Strong>{" "}
        operator to register with first — whichever you trust most operationally. Most customers
        go with Jio or Vodafone Idea.
      </P>
      <H3>Documents you&apos;ll need</H3>
      <UL>
        <LI>Certificate of Incorporation or Partnership Deed (PDF).</LI>
        <LI>GSTIN certificate. Make sure the address matches the one on your CoI.</LI>
        <LI>PAN card of the business (not personal PAN).</LI>
        <LI>A board-authorised letter naming an Authorised Representative (AR).</LI>
        <LI>AR&apos;s personal KYC (PAN + Aadhaar).</LI>
      </UL>
      <Callout variant="warning" title="The AR matters">
        The Authorised Representative is the person whose phone gets every OTP during setup and
        every rejection email later. Pick someone who will actually be reachable — and keep the
        authorisation letter in your compliance folder because you&apos;ll need it again on at
        least one other operator.
      </Callout>

      <H2 id="header">Step 2: Register your Header (sender ID)</H2>
      <P>
        The Header is the 6-character string that appears in place of a phone number when
        recipients get your SMS — e.g. <InlineCode>SMSLCL</InlineCode> or <InlineCode>MYBRND</InlineCode>.
        Pick it carefully; you&apos;ll live with it for years. Headers are also{" "}
        <Strong>category-scoped</Strong>: you&apos;ll register separate headers for transactional
        and promotional use, even if the brand name is the same.
      </P>
      <H3>Rules every Header has to follow</H3>
      <OL>
        <LI>Exactly 6 characters, alphabetical only (A–Z).</LI>
        <LI>
          Must match your <Strong>registered brand</Strong> or be a recognisable short-form of it.
          Random codes get rejected.
        </LI>
        <LI>
          Transactional and promotional Headers live separately. You can&apos;t send a marketing
          SMS on a transactional Header, and vice versa.
        </LI>
        <LI>Competitor brand names, profanity, and generic words (INFO, ALERT) are rejected.</LI>
      </OL>

      <H2 id="template">Step 3: Register your Content Template</H2>
      <P>
        This is where most rejections happen. A Content Template is the exact body of an SMS you
        plan to send, with variable slots marked as <InlineCode>{"{#var#}"}</InlineCode>. The
        operator approves the template once; after that, every send that references the Template
        ID must match the template body <Strong>character-for-character</Strong>, with only the
        variable slots filled in.
      </P>
      <Callout variant="tip" title="Think before you split">
        Registering ten templates is much easier than registering one template and trying to make
        it fit ten use cases. Keep templates specific — one for OTP login, one for OTP signup, one
        for password reset — so when you need to change copy you can do it per-flow.
      </Callout>

      <H3>What makes templates reject</H3>
      <UL>
        <LI>
          <Strong>Mismatch with Header category.</Strong> Submitting a marketing template under a
          transactional Header is the single most common cause of rejection.
        </LI>
        <LI>
          <Strong>Variable slots used for copy.</Strong>{" "}
          <InlineCode>{"{#var#}"}</InlineCode> is for dynamic values (OTP codes, order IDs, names).
          You can&apos;t put sentences in variables.
        </LI>
        <LI>
          <Strong>Wrong language declaration.</Strong> Hindi template body with an English
          declaration gets rejected. Pick the declared language accurately.
        </LI>
        <LI>
          <Strong>URL shorteners.</Strong> Only pre-whitelisted URLs or your registered domain.
          Raw bit.ly links are rejected for promotional routes.
        </LI>
      </UL>

      <H2 id="consent">Step 4: Capture consent (the ongoing obligation)</H2>
      <P>
        You don&apos;t register consent on the DLT portal — you own it. But if a recipient
        complains, the operator will ask you to produce the exact opt-in record for that number.
        &quot;The user checked a box in our app&quot; is not enough. You need the timestamp, the
        channel, the exact text they consented to, and the IP address.
      </P>
      <P>
        Store consent events in their own table in your database, retain them for at least 2
        years, and back them up. If you can&apos;t produce the log, the complaint stands and the
        operator can freeze your Header.
      </P>

      <BlogInlineCta
        title="DLT registration, guided end to end"
        body="SMSLocal walks Indian businesses through Principal Entity, header, and template registration, reviewing your documents before submission to avoid the most common rejections."
        primary={{ label: "Start free — ₹60 credit", href: "/signup/" }}
        secondary={{ label: "View pricing", href: "/pricing/" }}
      />

      <H2 id="pick-platform">Picking your DLT platform</H2>
      <P>
        All four major operators run their own DLT portals and they all accept the same format.
        In practice teams pick based on support responsiveness and UI quality.
      </P>
      <FigureTable
        columns={["Platform", "Strengths", "Quirks"]}
        rows={[
          [
            <Strong key="vi">Vi (Vodafone Idea)</Strong>,
            "Cleanest UI, fastest template approvals",
            "Sometimes slow on weekends",
          ],
          [
            <Strong key="jio">Jio</Strong>,
            "Most popular, strong support, documented well",
            "Newer UI can be laggy",
          ],
          [
            <Strong key="airtel">Airtel</Strong>,
            "Strict but predictable template reviews",
            "PE verification can take 72+ hours",
          ],
          [
            <Strong key="bsnl">BSNL</Strong>,
            "Accepts everything the private operators accept",
            "Interface feels legacy",
          ],
        ]}
        caption="You only need to register on one. Approval syncs to every other operator."
      />

      <H2 id="rejections">Common rejection reasons (and how to fix them)</H2>
      <P>
        Don&apos;t take rejections personally — they&apos;re the norm. Here are the ten most
        common reasons we see at SMSLocal, ranked.
      </P>
      <OL>
        <LI>
          <Strong>PE name doesn&apos;t match CoI.</Strong> Use the name exactly as printed on the
          Certificate of Incorporation. No abbreviations, no trading names.
        </LI>
        <LI>
          <Strong>GST address mismatch.</Strong> If your GSTIN is at one address and your CoI
          shows another, resolve that before applying.
        </LI>
        <LI>
          <Strong>AR authorisation letter on plain paper.</Strong> Use your company letterhead and
          include the registered company seal.
        </LI>
        <LI>
          <Strong>Header too generic.</Strong> &quot;ALERTS&quot;, &quot;UPDATE&quot;, &quot;INFO&quot; all get rejected.
        </LI>
        <LI>
          <Strong>Template body doesn&apos;t match Header category.</Strong> See above.
        </LI>
        <LI>
          <Strong>Template URL not whitelisted.</Strong> Register your domain on the DLT portal
          before submitting templates that contain it.
        </LI>
        <LI>
          <Strong>Too many variables.</Strong> Templates with more than 4–5 variable slots look
          like form letters and get flagged.
        </LI>
        <LI>
          <Strong>Missing unsubscribe instruction</Strong> on promotional templates. Add &quot;To
          opt out, send STOP to {"{#var#}"}&quot;.
        </LI>
        <LI>
          <Strong>Language mismatch.</Strong> Declare the actual language. Hindi body declared as
          English is an auto-reject.
        </LI>
        <LI>
          <Strong>Competitor brand name in Header.</Strong> Even a substring gets rejected.
        </LI>
      </OL>

      <BlogFigure
        src="/blog/common-rejection-reasons.webp"
        alt="Infographic listing the most common DLT registration rejection reasons in India — PE name mismatch, GST address issues, generic header names, and template errors."
        caption="Most first-time DLT applications get rejected. PE name must match your Certificate of Incorporation exactly — no abbreviations, no trading names."
      />

      <H2 id="timelines">Realistic timelines</H2>
      <P>Plan backwards from your first send. Here&apos;s what actually happens:</P>
      <FigureTable
        columns={["Milestone", "Best case", "Typical", "Worst case"]}
        rows={[
          [<Strong key="pe">PE approval</Strong>, "4 hours", "24 hours", "72 hours"],
          [<Strong key="h">Header approval</Strong>, "Instant after PE", "2 hours", "24 hours"],
          [<Strong key="t">Template approval</Strong>, "30 min", "4 hours", "48 hours"],
          [
            <Strong key="sync">Sync to other operators</Strong>,
            "Instant",
            "2 hours",
            "12 hours",
          ],
          [<Strong key="send">First SMS delivered</Strong>, "Same day", "Next day", "3–5 days"],
        ]}
        caption="Don&apos;t book a launch date until PE and Header are approved."
      />

      <H2 id="after-approval">After approval: sending Day 1 SMS</H2>
      <P>
        Once your PE, Header, and at least one Template are approved, add the Header in your
        SMSLocal dashboard under <Strong>Settings → Sender IDs</Strong>, wait ~2 hours for sync,
        and test. We recommend a 3-step validation before any production traffic:
      </P>
      <OL>
        <LI>
          Send a single SMS to your own phone using the transactional Header + Template. Confirm
          it arrives with the correct Header name.
        </LI>
        <LI>
          Pull the delivery report via <InlineCode>/api/dlrapi</InlineCode> and confirm{" "}
          <InlineCode>DELIVERED</InlineCode>.
        </LI>
        <LI>
          Configure a webhook and repeat, so you verify the end-to-end event pipeline before
          launch.
        </LI>
      </OL>
      <BlogFigure
        src="/blog/sending-day1-sms.webp"
        alt="Step-by-step illustration of sending your first DLT-compliant SMS in India — adding the sender ID in the SMSLocal dashboard and running a 3-step validation before production traffic."
        caption="After PE, Header, and Template approval, add your Sender ID in the SMSLocal dashboard and run a 3-step validation — single test SMS, delivery report, and webhook — before going live."
      />

      <Callout variant="success" title="You&apos;re live">
        If the test succeeds, you&apos;re cleared to send at whatever volume your route supports.
        Scale gradually — even a compliant Header looks suspicious to the operator if it jumps
        from 100 sends to 500,000 overnight.
      </Callout>

      <H2 id="dlt-cost">DLT registration cost in India</H2>
      <P>
        DLT registration is not free. You pay once per operator at the Principal Entity level, and
        once per content template in some categories. Here is what to budget in 2026:
      </P>
      <FigureTable
        columns={["Item", "Jio", "Airtel", "Vi", "BSNL"]}
        rows={[
          ["PE registration", "₹5,900 + GST", "₹5,900 + GST", "₹5,900 + GST", "₹4,000 + GST"],
          ["Header registration", "Free (after PE)", "Free", "Free", "Free"],
          ["Template registration", "Free (most categories)", "Free", "Free", "Free"],
          ["Annual renewal (PE)", "₹5,900 + GST", "₹5,900 + GST", "₹5,900 + GST", "₹4,000 + GST"],
        ]}
        caption="Fees are per operator. You only need to register with one operator — your PE, headers, and templates sync to all other operators automatically."
      />
      <P>
        Most businesses register with a single operator (typically Jio or Vi for UI quality) and
        pay once. The annual renewal applies on the anniversary date. Templates are free regardless
        of how many you register — so register generously.
      </P>
      <Callout variant="info" title="SMSLocal handles DLT for you">
        SMSLocal customers complete DLT registration inside the platform during onboarding.
        We guide you through the PE application, header selection, and template submission, and
        our team reviews your documents before you submit to avoid common rejection reasons.
      </Callout>

      <H2 id="ongoing">Ongoing obligations</H2>
      <P>
        DLT isn&apos;t set-and-forget. Four things need attention forever:
      </P>
      <UL>
        <LI>
          <Strong>Template hygiene.</Strong> Every time your product copy changes, register a new
          template. Don&apos;t try to edit an approved one.
        </LI>
        <LI>
          <Strong>Consent audit trail.</Strong> Retain opt-in records for at least 2 years.
        </LI>
        <LI>
          <Strong>Complaint response.</Strong> Operators forward every complaint; respond within
          48 hours or risk Header suspension.
        </LI>
        <LI>
          <Strong>Annual AR re-authorisation</Strong> on some operators (Airtel, notably). Keep a
          reminder.
        </LI>
      </UL>

      <Blockquote cite="Compliance lead at a fintech onboarded in 2024">
        The one thing I wish someone had told us: treat DLT like an ongoing partnership with your
        operator, not a one-time signup. Reply fast to every complaint email and you&apos;ll
        almost never see your Header suspended.
      </Blockquote>

      <H2 id="faq">FAQ</H2>
      <BlogFaq>
        <BlogFaqItem q={"Can I start sending SMS while waiting for approval?"}>
          No. Any send before PE + Header + Template approval will be rejected at the gateway.
        </BlogFaqItem>
        <BlogFaqItem q={"Do I need separate PE for a subsidiary?"}>
          Yes. Each legal entity (separate CoI) registers its own PE. You can share the AR, but the
          entity records stay separate.
        </BlogFaqItem>
        <BlogFaqItem q={"What if we change our company name after approval?"}>
          Submit an amendment on the DLT portal with the updated CoI. Your existing Headers keep
          working during the amendment review.
        </BlogFaqItem>
        <BlogFaqItem q={"Can international companies register as PE?"}>
          Typically no — you&apos;ll need an Indian legal entity (subsidiary, branch office, or LLP).
          Some operators let you register as a foreign entity with additional paperwork; most find
          it simpler to incorporate locally.
        </BlogFaqItem>
        <BlogFaqItem q={"How do I handle multiple brands under one company?"}>
          Register one PE, and register a separate Header for each brand. Templates are filed per
          Header, so you can keep brand voices separate.
        </BlogFaqItem>
      </BlogFaq>

      <Callout variant="tip" title="Need hands-on help?">
        SMSLocal customers on any paid tier get free DLT onboarding support — we handle the PE
        paperwork, Header submission, and first-template approval with you. Email{" "}
        <A href="mailto:info@smslocal.in">info@smslocal.in</A> or{" "}
        <A href="/company/contact/">reach out to sales</A>.
      </Callout>
    </>
  )
}
