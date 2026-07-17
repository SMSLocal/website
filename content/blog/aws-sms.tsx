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

export default function AwsSmsPost() {
  return (
    <>
      <Lead>
        AWS sends SMS two ways: <Strong>Amazon SNS</Strong> for simple, one-line transactional
        texts, and <Strong>AWS End User Messaging</Strong> (the service formerly called Amazon
        Pinpoint SMS) for two-way messaging, campaigns, and dedicated sender IDs. Both are powerful
        and pay-as-you-go — but sending to Indian numbers adds DLT registration, a sender-ID
        approval step, and a sandbox you must escape first. This guide covers every part.
      </Lead>

      <Callout variant="info" title="Who this guide is for">
        Developers and teams already on AWS who want to send OTPs, alerts, or campaigns to Indian
        (and global) numbers — and anyone weighing AWS against a dedicated Indian SMS provider. It
        assumes basic familiarity with the AWS console and IAM.
      </Callout>

      <H2 id="two-ways">The two ways AWS sends SMS</H2>
      <P>
        There isn&apos;t a single &ldquo;AWS SMS&rdquo; product. Two services send text messages,
        and picking the right one matters:
      </P>
      <FigureTable
        columns={["", "Amazon SNS", "AWS End User Messaging (Pinpoint SMS)"]}
        rows={[
          ["Best for", "Transactional OTPs & alerts", "Campaigns, two-way, marketing"],
          ["Send model", "Publish to a number or topic", "Send + receive, with events"],
          ["Two-way / replies", "No", "Yes"],
          ["Dedicated sender ID / number", "Basic", "Full (sender IDs, long/short codes)"],
          ["Opt-out management", "Manual", "Built-in keyword handling"],
          ["Setup effort", "Minutes", "More — pools, config sets, phone numbers"],
        ]}
        caption="Rule of thumb: SNS for a quick one-way OTP; End User Messaging when you need replies, campaigns, or a managed sender ID."
      />

      <H2 id="amazon-sns">Amazon SNS — the fastest path to a text</H2>
      <P>
        Amazon Simple Notification Service (SNS) can send an SMS with a single{" "}
        <InlineCode>Publish</InlineCode> call — no phone-number resource to provision. You either
        publish directly to a phone number in E.164 format, or publish to an SNS topic that fans
        out to many subscribers.
      </P>
      <H3>A minimal send</H3>
      <OL>
        <LI>Create an IAM user or role with <InlineCode>sns:Publish</InlineCode> permission.</LI>
        <LI>Set your account&apos;s default SMS type — <Strong>Transactional</Strong> (higher priority, for OTPs) or <Strong>Promotional</Strong>.</LI>
        <LI>Call <InlineCode>Publish</InlineCode> with a <InlineCode>PhoneNumber</InlineCode> like <InlineCode>+9199XXXXXXXX</InlineCode> and a <InlineCode>Message</InlineCode> body.</LI>
        <LI>Read the delivery status from CloudWatch / delivery-status logs.</LI>
      </OL>
      <P>
        It&apos;s the same request whether you call it from the CLI, an SDK, or a Lambda — which is
        why SNS is the go-to for wiring an OTP into an existing AWS backend. If you just need to
        push a code from code, this is the shortest route; our guide to{" "}
        <A href="/developers/api-docs/">the SMS API</A> shows the equivalent on a dedicated Indian
        platform.
      </P>

      <BlogFigure
        src="/blog/aws-sms-sns-publish-flow.webp"
        alt="Diagram of an Amazon SNS Publish call sending an SMS OTP from an AWS Lambda backend to a phone."
        caption="With Amazon SNS, a single Publish call from Lambda or any SDK sends a transactional SMS — no phone-number resource to provision first."
      />

      <H2 id="end-user-messaging">AWS End User Messaging — for campaigns and two-way</H2>
      <P>
        AWS renamed the SMS and voice side of Amazon Pinpoint to <Strong>AWS End User
        Messaging</Strong> in 2024. This is the richer service: you provision origination
        identities (sender IDs, long codes, short codes), group them into <Strong>phone
        pools</Strong>, attach <Strong>configuration sets</Strong> for event logging, and handle
        inbound replies and opt-out keywords automatically.
      </P>
      <UL>
        <LI><Strong>Two-way SMS.</Strong> Receive replies and route them to an SNS topic or Amazon Connect.</LI>
        <LI><Strong>Opt-out lists.</Strong> STOP/UNSUBSCRIBE handling is managed for you.</LI>
        <LI><Strong>Event stream.</Strong> Per-message delivery, bounce, and complaint events to Kinesis/CloudWatch.</LI>
        <LI><Strong>Sender IDs.</Strong> Register a branded alphabetic sender ID where the country supports it — including India.</LI>
      </UL>

      <BlogFigure
        src="/blog/aws-sms-sns-vs-pinpoint.webp"
        alt="Comparison illustration of Amazon SNS versus AWS End User Messaging (Pinpoint) for sending SMS."
        caption="SNS is a one-line publish; AWS End User Messaging adds pools, sender IDs, two-way replies, and opt-out handling for real campaigns."
      />

      <H2 id="india-dlt">Sending SMS on AWS in India: the DLT catch</H2>
      <P>
        This is where teams get stuck. India&apos;s TRAI regulations require every business sender
        to be registered on a telecom-operator <Strong>DLT</Strong> platform, and AWS enforces it.
        To deliver to Indian numbers you must supply, per message, your DLT{" "}
        <Strong>Entity ID</Strong> and <Strong>Template ID</Strong>, and send from a registered{" "}
        <Strong>Sender ID</Strong> (Header) that matches an approved template.
      </P>
      <OL>
        <LI>Complete <A href="/blog/dlt-registration-guide/">DLT registration</A> — Principal Entity, Header (sender ID), and content templates — on a DLT portal (Jio, Airtel, Vodafone Idea, or BSNL).</LI>
        <LI>Register your Sender ID and templates inside AWS End User Messaging, mapping them to the DLT Entity ID and Template ID.</LI>
        <LI>Pass the Entity ID and Template ID as message attributes on every send, or the operator rejects the message.</LI>
      </OL>
      <Callout variant="warning" title="A mismatch means silent failure">
        If the template you send doesn&apos;t byte-match an approved DLT template — even an extra
        space or a variable in the wrong place — the operator drops the SMS. AWS returns
        &ldquo;sent,&rdquo; but it never arrives. Template hygiene is the single biggest cause of
        Indian delivery failures on AWS.
      </Callout>

      <BlogInlineCta
        title="Skip the DLT-on-AWS plumbing"
        body="SMSLocal handles DLT registration, sender-ID approval, and template mapping for you — send DLT-compliant OTPs and campaigns to Indian numbers without the AWS sandbox and sender-ID paperwork."
        primary={{ label: "Start free — ₹60 credit", href: "/signup/" }}
      />

      <H2 id="sandbox-limits">The SMS sandbox and spending limits</H2>
      <P>
        Two account-level gates trip up first-time senders:
      </P>
      <UL>
        <LI>
          <Strong>The SMS sandbox.</Strong> Every new AWS account starts in a sandbox that can only
          send to phone numbers you&apos;ve verified. You must open a support case to move to
          production before you can text real customers.
        </LI>
        <LI>
          <Strong>Monthly spend quota.</Strong> AWS sets a low default SMS spending limit
          (historically about $1/month). Until you request an increase, sends stop the moment you
          hit it — a classic &ldquo;why did my OTPs stop&rdquo; surprise in production.
        </LI>
      </UL>

      <H2 id="pricing">AWS SMS pricing, briefly</H2>
      <P>
        Both services are pay-as-you-go with no minimum. You pay a per-message price that varies by
        destination country and, in India, by the carrier and message type. On top of the AWS price
        there can be operator/DLT fees. AWS also bills for inbound (two-way) messages and for
        dedicated numbers.
      </P>
      <P>
        Because Indian carrier rates and DLT fees change, always price against AWS&apos;s current
        India rate card rather than a number you read in a blog. For a plain-English comparison of
        how Indian SMS is priced across platforms, see our guide to{" "}
        <A href="/blog/send-sms-online/">sending SMS online in India</A>.
      </P>

      <BlogFigure
        src="/blog/aws-sms-india-dlt-flow.webp"
        alt="Step diagram of sending DLT-compliant SMS through AWS in India — DLT registration, sender ID mapping, and passing Entity and Template IDs."
        caption="The Indian AWS SMS path: register on DLT, map your sender ID and templates in AWS, then pass the Entity and Template IDs on every send."
      />

      <H2 id="setup-checklist">Quick setup checklist</H2>
      <OL>
        <LI>Create an IAM role scoped to only the SNS / End User Messaging actions you need.</LI>
        <LI>Choose the service: SNS for one-way OTPs, End User Messaging for two-way or campaigns.</LI>
        <LI>Request production access (leave the SMS sandbox) and raise your monthly spend limit.</LI>
        <LI>For India: finish DLT registration, then register the sender ID and templates in AWS.</LI>
        <LI>Set up a configuration set / delivery-status logging so you can actually see failures.</LI>
        <LI>Send a test to a verified number, confirm the delivery event, then go live.</LI>
      </OL>

      <H2 id="aws-vs-provider">When AWS SMS is the right call — and when it isn&apos;t</H2>
      <P>
        If your stack already lives on <A href="https://en.wikipedia.org/wiki/Amazon_Web_Services">AWS</A>{" "}
        and you have the DevOps capacity to manage DLT registration, sender-ID mapping, the sandbox,
        and delivery monitoring yourself, AWS SMS is a solid, scalable choice that keeps everything
        in one bill.
      </P>
      <P>
        But if you&apos;re India-first, want DLT and sender-ID onboarding handled for you, need
        someone to call when the operator route misbehaves, or just don&apos;t want to run the
        template-mapping gauntlet, a dedicated Indian provider gets you to first-message faster —
        often the same day — with delivery support built in.
      </P>
      <FigureTable
        columns={["If you need…", "AWS SMS", "Dedicated India provider"]}
        rows={[
          ["Everything inside your AWS bill", "Yes", "Separate"],
          ["DLT & sender ID handled for you", "You do it", "Done for you"],
          ["Time to first live SMS in India", "Days–weeks", "Often same day"],
          ["Hands-on delivery support", "Support plan", "Included"],
          ["Deep AWS-native automation", "Best", "Via API/webhooks"],
        ]}
        caption="AWS wins on AWS-native depth; a dedicated provider wins on India onboarding speed and delivery support."
      />

      <H2 id="faq">Frequently asked questions</H2>
      <BlogFaq>
        <BlogFaqItem q={"What is the difference between Amazon SNS and AWS End User Messaging?"}>
          Amazon SNS sends simple one-way SMS with a single Publish call — ideal for OTPs and
          alerts. AWS End User Messaging (formerly Amazon Pinpoint SMS) adds two-way messaging,
          dedicated sender IDs and numbers, opt-out handling, and per-message events — for campaigns
          and conversational use. Use SNS for transactional; End User Messaging for everything richer.
        </BlogFaqItem>
        <BlogFaqItem q={"Can I send SMS to Indian numbers with AWS?"}>
          Yes, but you must be DLT-registered. You supply your DLT Entity ID and Template ID on
          every message and send from a sender ID that maps to an approved template. Without a
          byte-exact template match, the operator drops the message even though AWS reports it as
          sent.
        </BlogFaqItem>
        <BlogFaqItem q={"Why are my AWS SMS not being delivered?"}>
          The three usual causes: your account is still in the SMS sandbox (only verified numbers
          receive), you hit the default monthly spend limit, or — in India — the message doesn&apos;t
          match an approved DLT template. Check the delivery-status logs / configuration-set events
          to see which.
        </BlogFaqItem>
        <BlogFaqItem q={"How much does AWS SMS cost?"}>
          It&apos;s pay-as-you-go per message, priced by destination country and, in India, by
          carrier and message type, plus any operator/DLT fees. Two-way messages and dedicated
          numbers are billed separately. Always check AWS&apos;s current India rate card for exact
          figures.
        </BlogFaqItem>
        <BlogFaqItem q={"Do I still need DLT registration if I use AWS?"}>
          Yes. DLT registration is a TRAI requirement on the sender, independent of which platform
          you send through. AWS enforces it for Indian traffic — it does not replace it. A provider
          like SMSLocal can complete DLT onboarding on your behalf.
        </BlogFaqItem>
        <BlogFaqItem q={"Is AWS SMS good for sending OTPs?"}>
          For AWS-native apps, yes — Amazon SNS transactional SMS is a common OTP path. Just budget
          for the sandbox exit, the spend-limit increase, and (in India) DLT template registration
          before you rely on it in production.
        </BlogFaqItem>
      </BlogFaq>

      <Blockquote cite="An engineer who migrated an OTP flow off AWS SNS in India">
        AWS itself was never the problem — DLT template mismatches were. We spent more time on
        sender-ID and template paperwork than on the actual integration.
      </Blockquote>

      <Callout variant="tip" title="Sending to India? Skip the paperwork">
        SMSLocal handles DLT registration, sender-ID approval, and template mapping, then gives you
        an API and a dashboard for DLT-compliant OTPs and campaigns. <A href="/signup/">Start with
        ₹60 free credit</A> — no credit card — or read the{" "}
        <A href="/blog/dlt-registration-guide/">full DLT registration guide</A> first.
      </Callout>
    </>
  )
}
