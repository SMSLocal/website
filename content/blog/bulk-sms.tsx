import {
  A,
  BlogFigure,
  Callout,
  FigureTable,
  H2,
  LI,
  Lead,
  OL,
  P,
  Strong,
  UL,
} from "@/components/blog/blog-prose"
import { BlogFaq } from "@/components/blog/blog-faq"

const FAQ_ITEMS = [
  {
    q: "What is bulk SMS and how does it work?",
    a: (
      <>
        Bulk SMS is sending text messages to many numbers at once through a software platform.
        You upload a list, choose an approved template and the platform delivers each message
        through mobile operators, then reports the result.
      </>
    ),
  },
  {
    q: "Is DLT registration mandatory for bulk SMS in India?",
    a: (
      <>
        Yes. Business SMS to Indian numbers must use a registered sender name and an approved
        template. A message that does not match an approved template will not be delivered.
      </>
    ),
  },
  {
    q: "Can I send bulk SMS to any number?",
    a: (
      <>
        No. Promotional messages cannot go to numbers on the DND list unless you hold the
        recipient&apos;s explicit digital consent, and they must follow the 9 AM to 9 PM window.
        Keep a record of consent for everyone on your list.
      </>
    ),
  },
  {
    q: "How is bulk SMS billed?",
    a: (
      <>
        Per segment. A standard English message holds 160 characters in one segment, and a
        Unicode message such as Hindi holds 70. Longer messages use more segments, and each one
        is billed.
      </>
    ),
  },
  {
    q: "Can I send bulk SMS in Hindi or other Indian languages?",
    a: (
      <>
        Yes, using Unicode. Regional-language templates go through the same DLT approval, and
        each message counts fewer characters per segment than English.
      </>
    ),
  },
]

export default function BulkSmsPost() {
  return (
    <>
      <Lead>
        Bulk SMS is a way to send the same text message, or a personalised version of it, to many
        phone numbers at once. Banks use it for alerts, shops use it for order updates and
        offers, and schools use it for notices. It reaches people on any phone without an app or
        an internet connection.
      </Lead>
      <P>
        In India, though, bulk SMS has rules that do not exist in most countries. Senders must
        register, templates must be approved, and promotional messages face time and DND limits.
        This guide explains how bulk SMS works, what you must set up first, how the rules apply
        and how to send your first campaign.
      </P>

      <H2 id="what-bulk-sms-is">What bulk SMS is</H2>
      <P>
        Bulk SMS means sending text messages in large volumes through a software platform instead
        of from a phone. You upload a list of numbers, choose a message and the platform delivers
        it to every recipient through mobile operators.
      </P>
      <P>Two points make it different from texting from your own phone:</P>
      <UL>
        <LI>
          <Strong>It is sent from a registered sender name.</Strong> Recipients see a short
          header such as a brand name, not a personal mobile number.
        </LI>
        <LI>
          <Strong>It is controlled by approved templates.</Strong> In India, every message must
          match a template registered in advance. A free-form message cannot simply be typed and
          sent.
        </LI>
      </UL>
      <P>
        The word &ldquo;bulk&rdquo; describes volume, not a different kind of message. The same
        platform can send one OTP or fifty thousand reminders.
      </P>

      <BlogFigure
        src="/blog/bulk-sms-business-sender-to-recipients.webp"
        alt="Diagram of a business sending one bulk SMS campaign from a dashboard to many recipient phones at once."
        caption="One campaign, many recipients: the platform handles delivery to every phone."
      />

      <H2 id="how-bulk-sms-works">How bulk SMS works</H2>
      <P>Behind the dashboard, a bulk SMS send follows the same path every time.</P>
      <OL>
        <LI>
          <Strong>You upload recipients and pick a template.</Strong> Numbers usually come from a
          CSV file, and the template holds the fixed wording with spaces for details such as a
          name or order number.
        </LI>
        <LI>
          <Strong>The platform checks the message.</Strong> It confirms that the sender name and
          template are registered, and that the message length is what you expect.
        </LI>
        <LI>
          <Strong>The message goes to the operator.</Strong> The platform hands it to the
          recipient&apos;s mobile network, which delivers it to the handset.
        </LI>
        <LI>
          <Strong>A delivery report comes back.</Strong> You see which messages were delivered,
          which failed and why.
        </LI>
      </OL>
      <P>
        A good platform wraps this in a simple workflow. SMSLocal&apos;s{" "}
        <A href="/products/bulk-sms/">Bulk SMS service</A> lets you import a CSV, choose a
        DLT-approved template and either send immediately or schedule the campaign, then watch
        live delivery reports with a per-carrier breakdown and click tracking.
      </P>

      <H2 id="dlt-registration-what-you-need-first">DLT registration: what you need first</H2>
      <P>
        DLT, short for Distributed Ledger Technology, is the system Indian operators use to
        register businesses that send SMS. Without it, your messages will not be delivered. You
        register three things:
      </P>
      <UL>
        <LI>
          <Strong>Your business (the Principal Entity).</Strong> This identifies you as a legal
          sender.
        </LI>
        <LI>
          <Strong>Your sender name (the header).</Strong> This is what recipients see as the
          sender.
        </LI>
        <LI>
          <Strong>Your message templates.</Strong> The exact wording, with variable slots, that
          you plan to send.
        </LI>
      </UL>
      <P>
        TRAI&apos;s regulations require that commercial communication goes out only through
        registered headers, and message templates are held in a content template register. In
        practice, a message that does not match an approved template will not reach the
        recipient.
      </P>
      <P>
        Each operator&apos;s DLT portal charges its own registration fee and has its own approval
        times, so check both before you pick a launch date. Our{" "}
        <A href="/blog/dlt-registration-guide/">DLT registration guide</A> walks through each
        step, the documents you need and the common reasons for rejection. SMSLocal also helps
        register across the operator portals and tracks entity, sender ID and template status in
        the dashboard.
      </P>

      <Callout variant="tip" title="Start DLT first">
        Approvals are outside your control, so they set your launch date.
      </Callout>

      <BlogFigure
        src="/blog/bulk-sms-dlt-registration-documents.webp"
        alt="Flow of the documents needed for DLT registration: business documents, company details and identity verification feeding a checklist and the DLT portal form."
        caption="What to gather before you open the DLT portal."
      />

      <H2 id="message-types-and-trai-rules">Message types and TRAI rules</H2>
      <P>
        TRAI, India&apos;s telecom regulator, sorts business messages by purpose, and the
        category decides your rules. Its definitions, as set out in its{" "}
        <A href="https://www.trai.gov.in/sites/default/files/2025-02/Regulation_12022025.pdf">
          2025 amendment to the commercial communication regulations
        </A>
        , work out like this. TRAI amended the rules again in September 2026, so check its
        website for the latest text.
      </P>
      <FigureTable
        columns={["Type", "What it is", "Key rule"]}
        rows={[
          [
            <Strong key="t">Transactional</Strong>,
            "A message to your customer within 30 minutes of a transaction they started, such as an OTP, transaction alert or refund notice",
            "Not promotional. No explicit consent needed. No daily time limit",
          ],
          [
            <Strong key="s">Service</Strong>,
            "Information about a product or service the customer already uses (warranty, recall, delivery, balance alerts), or a message that completes an ongoing transaction with their explicit consent",
            "Not promotional. Consent-based service messages need explicit consent, which lasts seven days",
          ],
          [
            <Strong key="p">Promotional</Strong>,
            "Any message with promotional material or an advertisement, such as an offer or sale",
            "Needs an opt-out in the message. 9 AM to 9 PM only. Blocked for DND numbers unless you hold explicit digital consent",
          ],
        ]}
        caption="The category decides your time window and whether DND numbers can receive the message."
      />
      <P>
        If you add promotional content to a transactional or service message, TRAI treats the
        whole message as promotional. The regulations limit promotional messages to 9 AM to 9
        PM. Customers can also register preferences, including a full block on promotional
        messages, by messaging 1909. This is the DND list. A promotional message to a number on
        it will not be delivered unless the sender holds the recipient&apos;s explicit digital
        consent.
      </P>
      <P>
        Consent is the other half. The regulations define explicit consent as permission
        verified directly with the recipient and recorded. Keep proof of how and when each person
        agreed.
      </P>
      <P>
        The penalties are severe. When an investigation finds a sender was sending unsolicited
        messages, the first violation bars outgoing services on all of the sender&apos;s
        telecom resources for 15 days. A second or later violation disconnects all of them for
        one year and puts the sender on a blacklist. Operators must also suspend a misused
        header or template within six hours of noticing it, so one bad campaign can cost you
        your sender name.
      </P>

      <H2 id="how-to-send-bulk-sms-step-by-step">How to send bulk SMS step by step</H2>
      <P>Here is the usual path from nothing to a first campaign.</P>
      <OL>
        <LI>
          <Strong>Choose an SMS platform.</Strong> Pick a provider that handles DLT and delivery
          reports. SMSLocal lets new accounts start a trial, so you can test before you
          pay.
        </LI>
        <LI>
          <Strong>Upload your recipient contacts.</Strong> Import a CSV of numbers that gave you
          permission, and clean out invalid ones first.
        </LI>
        <LI>
          <Strong>Write the message.</Strong> Draft the wording and mark where personal details
          go. In India the final text must match an approved template, so write to your template.
        </LI>
        <LI>
          <Strong>Select your sender ID and approved template.</Strong> Choose your registered
          header and an approved template. If DLT registration is not finished, you cannot
          complete this step, which is why it comes first.
        </LI>
        <LI>
          <Strong>Send the campaign and track delivery.</Strong> Send now or schedule it, keeping
          promotions inside the allowed window. Then read the report for delivery, failures and
          link clicks, and fix problems before your next send.
        </LI>
      </OL>

      <BlogFigure
        src="/blog/bulk-sms-five-steps-to-send.webp"
        alt="Five numbered steps to send bulk SMS: choose a platform, upload contacts, write the message, select sender ID and approved template, then send and track delivery."
        caption="The five steps from sign-up to your first delivery report."
      />

      <H2 id="message-length-encoding-and-cost">Message length, encoding and cost</H2>
      <P>
        Cost depends on how many segments each message uses, and that depends on what you write.
      </P>
      <FigureTable
        columns={["Encoding", "Single SMS", "Each segment when longer"]}
        rows={[
          ["Standard (GSM-7), English", "160 characters", "153 characters"],
          ["Unicode (UCS-2), Hindi and other scripts, emoji", "70 characters", "67 characters"],
        ]}
        caption="One non-English character or emoji switches the whole message to Unicode."
      />
      <P>
        One Hindi, Tamil or emoji character switches the whole message to Unicode. Operators bill
        per segment, not per message. A 200-character English SMS uses 2 segments, and a
        150-character Hindi SMS uses 3. Adding one emoji to a 100-character English message turns
        one segment into two.
      </P>
      <P>
        Other factors shape your bill: your volume, the message type and your provider&apos;s
        rates. SMSLocal has no setup fee and no monthly subscription or minimum commitment, and
        higher-volume senders can ask sales about better rates. Write short, check the character
        count before sending and leave out emoji you do not need.
      </P>

      <H2 id="where-businesses-use-bulk-sms">Where businesses use bulk SMS</H2>
      <UL>
        <LI>
          <Strong>Retail and e-commerce:</Strong> order confirmations, delivery updates and sale
          announcements.
        </LI>
        <LI>
          <Strong>Banking and fintech:</Strong> transaction alerts, OTPs and payment reminders.
        </LI>
        <LI>
          <Strong>Healthcare:</Strong> appointment reminders and report-ready notices.
        </LI>
        <LI>
          <Strong>Education:</Strong> fee reminders, exam schedules and admission updates.
        </LI>
        <LI>
          <Strong>Logistics:</Strong> dispatch and delivery alerts.
        </LI>
        <LI>
          <Strong>Real estate:</Strong> site-visit reminders and new-listing notices.
        </LI>
      </UL>
      <P>
        The best results come from relevance. A message the customer expects, at a sensible time,
        is read. An unexpected offer is reported.
      </P>

      <H2 id="how-to-choose-a-bulk-sms-provider">How to choose a bulk SMS provider</H2>
      <P>Rate cards look alike. These checks separate providers.</P>
      <UL>
        <LI>
          <Strong>DLT compliance help.</Strong> Do they guide you through registration, or only
          point you to the portals?
        </LI>
        <LI>
          <Strong>Delivery speed and routes.</Strong> Direct operator connections are generally
          more reliable than resold routes. Ask which one you get.
        </LI>
        <LI>
          <Strong>Real delivery reports.</Strong> You want per-message delivered and failed
          status, not just &ldquo;accepted&rdquo;.
        </LI>
        <LI>
          <Strong>Clear pricing.</Strong> You should know what each message costs, how segments
          are billed and whether there is a platform fee on top.
        </LI>
        <LI>
          <Strong>Regional languages.</Strong> If you write in Hindi or other scripts, check how
          Unicode messages are counted and rendered.
        </LI>
        <LI>
          <Strong>API and sandbox.</Strong> Developers should find a documented endpoint,
          webhooks and a way to test without sending real messages.
        </LI>
        <LI>
          <Strong>Support.</Strong> Check how quickly real people respond in Indian hours.
        </LI>
      </UL>
      <P>
        If you also want WhatsApp, a provider that handles both channels saves you a second
        dashboard.
      </P>

      <BlogFigure
        src="/blog/bulk-sms-choose-provider-checklist.webp"
        alt="Checklist of what to compare in a bulk SMS provider: delivery speed, pricing, DLT compliance, delivery reports and customer support."
        caption="Five checks that matter more than the headline rate."
      />

      <H2 id="mistakes-that-get-messages-blocked">Mistakes that get messages blocked</H2>
      <UL>
        <LI>
          <Strong>Skipping consent.</Strong> Messaging a purchased or scraped list invites
          complaints and penalties.
        </LI>
        <LI>
          <Strong>Using a transactional header for marketing.</Strong> The category is set by the
          header and template, so misuse can get templates rejected or headers suspended.
        </LI>
        <LI>
          <Strong>Sending promotions outside 9 AM to 9 PM.</Strong> The message will not go out.
          A platform that enforces the window for you, as SMSLocal does, removes this risk.
        </LI>
        <LI>
          <Strong>Not scrubbing DND numbers.</Strong> Promotional messages to them are blocked
          unless you hold their recorded explicit consent. SMSLocal checks every list against
          the national preference register before sending.
        </LI>
        <LI>
          <Strong>Mixing an offer into an OTP or order update.</Strong> TRAI then treats the
          whole message as promotional, with the time window and DND rules that come with it.
        </LI>
        <LI>
          <Strong>Leaving out the opt-out.</Strong> Every promotional message must give the
          recipient a way to opt out in the same message.
        </LI>
        <LI>
          <Strong>Editing template wording.</Strong> The text must match the approved template.
        </LI>
        <LI>
          <Strong>Ignoring Unicode.</Strong> One emoji can double your segments and your cost.
        </LI>
        <LI>
          <Strong>Uploading bad numbers.</Strong> Invalid numbers waste credits. Clean the list
          first.
        </LI>
      </UL>

      <H2 id="conclusion">Conclusion</H2>
      <P>
        Bulk SMS remains one of the most direct ways to reach customers in India, but it rewards
        preparation. Register on DLT first, use the right message type, respect the time window
        and DND, and keep proof of consent. Those steps protect your sender name and your
        delivery.
      </P>
      <P>
        Start small. Send a short, well-targeted campaign to people who expect to hear from you,
        read the delivery report and improve from there.
      </P>

      <H2 id="faq">Frequently asked questions</H2>
      <BlogFaq items={FAQ_ITEMS} />
    </>
  )
}
