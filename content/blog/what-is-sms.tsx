import {
  A,
  Blockquote,
  BlogFigure,
  Callout,
  FigureTable,
  H2,
  H3,
  LI,
  Lead,
  OL,
  P,
  Strong,
  UL,
} from "@/components/blog/blog-prose"
import { BlogFaq, BlogFaqItem } from "@/components/blog/blog-faq"
import { BlogInlineCta } from "@/components/blog/blog-cta"

export default function WhatIsSmsPost() {
  return (
    <>
      <Lead>
        SMS — Short Message Service — is the text-messaging system built into every mobile network
        on the planet. Despite being invented in 1992, it remains the most reliable channel for
        reaching anyone with a phone number, regardless of their internet connection, smartphone
        model, or app preferences. This guide explains exactly how SMS works, the different types
        India's regulations define, and why it still outperforms newer messaging channels for
        several critical use cases.
      </Lead>

      <H2 id="what-is-sms">What SMS actually is</H2>
      <P>
        SMS stands for <Strong>Short Message Service</Strong>. It is a communication protocol built
        directly into the GSM mobile standard — the same standard that carries phone calls. Every
        SIM card ever manufactured supports it; no app installation, no internet connection, and no
        smartphone are required.
      </P>
      <P>
        A text message travels through your operator's cellular network — not the internet — and is
        stored on the operator's SMSC (Short Message Service Centre) until your phone is available
        to receive it. This store-and-forward architecture means an SMS sent when your phone is off
        or out of coverage will still arrive when you come back online, often hours later.
      </P>
      <P>
        The classic limit is <Strong>160 characters</Strong> per SMS (using the GSM-7 character
        set). Modern phones and networks automatically chain multiple SMS segments into one logical
        "long message," but each 160-character segment is billed and transmitted separately. For
        characters outside GSM-7 — Hindi, Tamil, Gujarati, emoji — messages switch to UCS-2
        encoding and the per-segment limit drops to 70 characters.
      </P>

      <BlogFigure
        src="/blog/what-sms-actually-is.webp"
        alt="Visual representation of SMS — a Short Message Service text message displayed on a mobile phone screen, illustrating the basics of text messaging."
        caption="SMS is built into every mobile network globally — no internet, no app, no smartphone required."
      />

      <H2 id="how-sms-works">How SMS works technically</H2>
      <P>
        When you send a text, here is what happens in under two seconds:
      </P>
      <OL>
        <LI>
          Your phone sends the message to your operator's <Strong>SMSC</Strong> over the control
          channel of the cellular network — the same signalling layer that handles call setup, not
          the data layer your 4G apps use.
        </LI>
        <LI>
          The SMSC looks up the recipient's current operator (via the HLR — Home Location Register).
          If the recipient is on the same network, it delivers directly. If not, it routes to the
          recipient operator's SMSC through inter-operator agreements called <Strong>SMS
          interconnects</Strong>.
        </LI>
        <LI>
          The recipient's SMSC delivers the message to their handset via a push notification over
          the paging channel. Their phone confirms receipt, and both SMSCs log a delivery receipt.
        </LI>
        <LI>
          If the recipient's phone is unreachable, the SMSC holds the message for up to{" "}
          <Strong>72 hours</Strong> (the default validity period, configurable per sender) and
          retries periodically.
        </LI>
      </OL>

      <BlogFigure
        src="/blog/how-sms-works-technically.webp"
        alt="Diagram illustrating how SMS works technically — message flow from sender handset through the SMSC relay to the recipient handset over the cellular network."
        caption="An SMS never touches the internet — it travels through the operator's cellular signalling layer and is held by the SMSC until the recipient device is reachable."
      />

      <Callout variant="info" title="Store-and-forward reliability">
        The SMSC sits between sender and recipient as a relay. Unlike WhatsApp or email, no
        internet connectivity is required at either end — the operator network handles delivery,
        and messages queue for up to 72 hours if the recipient is offline.
      </Callout>

      <H2 id="types-of-sms">The two types of SMS in India</H2>
      <P>
        India's telecom regulator TRAI draws a hard legal line between two categories of SMS. The
        distinction matters for every business that sends messages and for every consumer who
        receives them.
      </P>
      <FigureTable
        columns={["Type", "What it is", "Examples", "DND exemption?"]}
        rows={[
          [
            <Strong key="transactional">Transactional</Strong>,
            "Service-critical messages the recipient has an implied or explicit relationship with the sender for",
            "OTPs, payment receipts, delivery tracking, bank alerts, appointment reminders, flight updates",
            "Yes — delivered even to DND numbers",
          ],
          [
            <Strong key="promotional">Promotional</Strong>,
            "Marketing or commercial communication intended to sell, promote, or advertise",
            "Discount codes, product launches, event invites, sale announcements",
            "No — blocked by DND, subject to send-window restrictions",
          ],
        ]}
        caption="TRAI's TCCCPR 2018 regulations enforce this distinction at the operator level via DLT."
      />
      <P>
        A third sub-category — <A href="/products/otp-sms/"><Strong>OTP (One-Time Password)</Strong></A> SMS — is treated as
        transactional but has its own dedicated routing infrastructure. OTPs must arrive within
        seconds, so operators give them priority queuing and they bypass most congestion filtering.
      </P>

      <H2 id="sms-vs-whatsapp">SMS vs WhatsApp: what actually differs</H2>
      <P>
        WhatsApp has 500 million monthly active users in India, more than any other messaging app.
        Yet SMS continues to dominate for several high-stakes use cases. Here is the practical
        comparison:
      </P>
      <FigureTable
        columns={["Factor", "SMS", "WhatsApp"]}
        rows={[
          ["Requires internet", "No", "Yes"],
          ["Requires app install", "No", "Yes"],
          ["Delivery to feature phones", "Yes", "No"],
          ["Delivery to offline device", "Yes (SMSC holds up to 72 h)", "No (requires internet on delivery)"],
          ["OTP / time-sensitive alerts", "Industry standard", "Possible but slower"],
          ["Rich media (images, video)", "No (plain text only)", "Yes"],
          ["Two-way conversation", "Limited (short-code or longcode)", "Full thread"],
          ["TRAI regulation", "Yes (DLT, DND, send windows)", "Separate (Meta BSP rules)"],
          ["Cost per message (India)", "₹0.03–0.15", "₹0.20–0.80 (conversation-based)"],
        ]}
        caption="SMS and WhatsApp serve different needs — most businesses use both."
      />
      <Callout variant="info" title="The 'last mile' advantage">
        In India, roughly 200 million mobile users still carry feature phones with no WhatsApp
        capability. For government schemes, FMCG delivery alerts, microfinance EMI reminders, and
        rural banking, SMS is the only channel that reaches every number in a contact list,
        regardless of device.
      </Callout>

      <BlogInlineCta
        title="Sending SMS in India starts with compliance"
        body="SMSLocal handles DLT registration, DND scrubbing, and TRAI send-window rules, so your transactional and promotional SMS reach every Indian number compliantly."
        primary={{ label: "Start free — ₹60 credit", href: "/signup/" }}
      />
      <H2 id="sms-in-india">SMS in India: the regulatory context</H2>
      <P>
        India has one of the most sophisticated SMS compliance frameworks in the world, built on
        three pillars:
      </P>

      <H3>1. DLT (Distributed Ledger Technology) registration</H3>
      <P>
        Since 2021, every business that sends commercial SMS in India must register on a
        blockchain-based platform called DLT. Registration covers three things:
      </P>
      <UL>
        <LI>
          <Strong>Principal Entity (PE) registration</Strong> — your company's identity, verified
          with GST, PAN, and authorisation letter
        </LI>
        <LI>
          <Strong>Header (Sender ID)</Strong> — the 6-character alphanumeric tag that appears in
          place of a phone number (e.g. SMSLTD)
        </LI>
        <LI>
          <Strong>Content templates</Strong> — every message template pre-approved by the regulator
          before sending
        </LI>
      </UL>
      <P>
        Unregistered SMS from a 6-character header are automatically blocked by all major operators.
        See our <A href="/blog/dlt-registration-guide/">complete DLT registration guide</A> for the
        step-by-step process.
      </P>

      <H3>2. DND (Do Not Disturb) scrubbing</H3>
      <P>
        Every promotional SMS must be scrubbed against the National Customer Preference Register
        (NCPR) — commonly called the DND list — before delivery. Sending promotional SMS to a
        DND-registered number is a TRAI violation that can result in sender ID suspension.
        Transactional SMS is exempt from DND.
      </P>

      <H3>3. Send windows for promotional SMS</H3>
      <P>
        TRAI restricts promotional SMS to the window between{" "}
        <Strong>9:00 AM and 9:00 PM local time</Strong>. Messages submitted outside this window are
        queued by operators and delivered at 9 AM the next day.
      </P>

      <BlogFigure
        src="/blog/sms-in-india-the-regulatory-context.webp"
        alt="Overview of SMS regulations in India — DLT registration, DND scrubbing, and TRAI send-window rules that govern commercial SMS messaging."
        caption="India's SMS compliance framework — DLT, DND, and send windows — is among the most structured in the world. Every commercial sender must register before messaging."
      />

      <H2 id="sms-for-business">SMS for business: the practical use cases</H2>
      <P>
        Businesses in India use SMS for two broad categories:
      </P>

      <H3>Transactional SMS</H3>
      <UL>
        <LI>
          <Strong>OTPs and 2FA</Strong> — account login, payment authorisation, form verification.
          Industry benchmark: 98%+ delivery within 5 seconds.
        </LI>
        <LI>
          <Strong>Order and delivery notifications</Strong> — dispatch alerts, tracking links,
          delivery confirmations, return labels.
        </LI>
        <LI>
          <Strong>Payment confirmations</Strong> — receipts, EMI reminders, subscription renewals.
        </LI>
        <LI>
          <Strong>Appointment reminders</Strong> — clinic, banking, government service bookings.
        </LI>
        <LI>
          <Strong>System alerts</Strong> — server downtime, threshold alerts, staff notifications.
        </LI>
      </UL>

      <H3>Promotional SMS</H3>
      <UL>
        <LI>
          <A href="/products/bulk-sms/"><Strong>Sale and offer announcements</Strong></A> — discount codes, flash sales, seasonal
          promotions. Average open rate in India: 85–90%, typically within 3 minutes.
        </LI>
        <LI>
          <Strong>Event invitations</Strong> — webinar registration, store opening, product launch.
        </LI>
        <LI>
          <Strong>Re-engagement campaigns</Strong> — win-back offers for lapsed customers.
        </LI>
        <LI>
          <Strong>Survey and feedback requests</Strong> — short 1–2 question follow-ups with a
          reply keyword.
        </LI>
      </UL>

      <BlogFigure
        src="/blog/sms-for-business.webp"
        alt="Business professional using SMS for customer communication — OTP delivery, promotional campaigns, and transactional alerts on a mobile device."
        caption="From OTPs to promotional campaigns — SMS for business spans two very different use cases, each with distinct compliance rules and delivery requirements."
      />

      <Callout variant="tip" title="Open rates that email can't match">
        SMS open rates in India consistently reach 85–97%, with most messages read within 3 minutes
        of delivery. No other channel — email, WhatsApp, or push notification — achieves this
        combination of reach and immediacy across all device types.
      </Callout>

      <H2 id="sms-character-limits">Character limits and encoding</H2>
      <P>
        Understanding SMS encoding prevents a common and expensive mistake: sending what you think
        is one message but the network splits into two and charges you double.
      </P>
      <FigureTable
        columns={["Encoding", "Characters per single SMS", "Characters per segment (multi-part)", "When triggered"]}
        rows={[
          ["GSM-7", "160", "153", "Standard Latin letters, digits, common punctuation"],
          ["UCS-2", "70", "67", "Any character outside GSM-7: Hindi, Tamil, Telugu, emoji, smart quotes"],
        ]}
        caption="Multi-part SMS include a 7-character header for reassembly, reducing per-segment capacity."
      />
      <Callout variant="warning" title="The smart-quote trap">
        Copying text from a Word document or email often pastes &ldquo;smart quotes&rdquo; (
        <Strong>&ldquo; &rdquo;</Strong>) instead of straight quotes (<Strong>&quot;</Strong>).
        Smart quotes are not in the <A href="https://en.wikipedia.org/wiki/GSM">GSM-7</A> alphabet and silently switch your message to UCS-2 — a
        160-character message becomes a 70-character message and you&apos;re billed for 3 segments
        instead of 1.
      </Callout>

      <H2 id="faq">Frequently asked questions</H2>

      <BlogFaq>
        <BlogFaqItem q={"Does SMS work without internet?"}>
          Yes. SMS uses the cellular signalling layer, completely separate from your mobile data
          connection. A phone with no SIM data plan can still send and receive SMS as long as it has
          cellular network coverage.
        </BlogFaqItem>

        <BlogFaqItem q={"What is the difference between SMS and MMS?"}>
          MMS (Multimedia Messaging Service) extends SMS to allow images, audio, and short video
          clips. MMS requires a data connection and is significantly more expensive than SMS. In
          India, MMS is rarely used for business messaging — WhatsApp Business API serves the same
          purpose at better cost with richer features.
        </BlogFaqItem>

        <BlogFaqItem q={"Can I send SMS from a computer?"}>
          Yes — through a web-to-SMS platform or SMS API. You write the message in a browser
          dashboard or integrate via API, and the platform routes it through operator connectivity to
          the recipient's handset. See our guide on{" "}
          <A href="/blog/send-sms-online/">how to send SMS online</A> for a comparison of the four
          main approaches.
        </BlogFaqItem>

        <BlogFaqItem q={"Why does an SMS sometimes take hours to arrive?"}>
          When the recipient's phone is off or out of coverage, the SMSC holds the message and
          retries. The default validity period is 72 hours. If you need near-instant delivery
          guarantees (for OTPs especially), use a platform with direct operator connectivity and
          real-time delivery receipts rather than a reseller with aggregated routes.
        </BlogFaqItem>

        <BlogFaqItem q={"Is SMS encrypted?"}>
          SMS is encrypted between your handset and the cell tower (over-the-air encryption), but
          messages are stored in plaintext on the operator's SMSC and can be accessed by the operator
          and, under legal authority, by law enforcement. SMS is not end-to-end encrypted the way
          WhatsApp or iMessage are. For sensitive personal communications, a dedicated encrypted
          messaging app is more appropriate. For business OTPs and alerts, SMS's traceability and
          reliability remain the industry standard.
        </BlogFaqItem>
      </BlogFaq>

      <Blockquote cite="TRAI Annual Report 2025">
        India processes over 1.5 billion commercial SMS messages every day — more than any other
        country on the planet.
      </Blockquote>

      <Callout variant="tip" title="Ready to send SMS for your business?">
        SMSLocal gives Indian businesses a single platform for OTP, transactional, and promotional
        SMS — fully DLT-compliant, with direct operator connectivity and real-time delivery reports.{" "}
        <A href="/signup/">Start with ₹60 free credit</A> — no DLT registration required to test.
      </Callout>
    </>
  )
}
