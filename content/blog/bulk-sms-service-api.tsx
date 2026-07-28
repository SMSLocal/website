import {
  A,
  BlogFigure,
  Callout,
  FigureTable,
  H2,
  H3,
  LI,
  Lead,
  P,
  Strong,
  UL,
} from "@/components/blog/blog-prose"
import { BlogFaq } from "@/components/blog/blog-faq"
import { BlogInlineCta } from "@/components/blog/blog-cta"

const FAQ_ITEMS = [
  {
    q: "What is a bulk SMS service API?",
    a: (
      <>
        A bulk SMS service API is a set of HTTP endpoints that let your application send SMS to
        one or thousands of recipients programmatically, instead of through a web dashboard.
        You make a request with the recipient numbers, message content (matched to an approved
        DLT template in India), and sender ID, and the API queues, routes, and reports delivery
        back to you — usually via webhook.
      </>
    ),
  },
  {
    q: "Do I need DLT registration to use a bulk SMS API?",
    a: (
      <>
        Yes, for any SMS sent to Indian numbers. TRAI requires every sender to register a
        Principal Entity, a Sender ID (Header), and each message template on the DLT platform
        before the API will accept a send request. Without an approved template ID, the API call
        succeeds but the operator drops the message. See our{" "}
        <A href="/blog/dlt-registration-guide/">DLT registration guide</A> for the full process.
      </>
    ),
  },
  {
    q: "What's the difference between a bulk SMS API and a web dashboard?",
    a: (
      <>
        A dashboard is a browser UI for uploading a contact list and clicking send — good for
        one-off campaigns run by a non-technical team. An API is code-driven: your product
        triggers sends automatically (order confirmations, OTPs, alerts) without a human in the
        loop, and can handle far higher volume with programmatic retry and reporting logic.
      </>
    ),
  },
  {
    q: "How much does a bulk SMS API cost in India?",
    a: (
      <>
        Typically ₹0.09–₹0.30 per SMS depending on route (transactional vs. promotional),
        message encoding, and volume tier — see the{" "}
        <A href="/pricing/">current SMSLocal rate card</A> for exact tiers. There's usually no
        separate charge for API access itself; you pay per message sent.
      </>
    ),
  },
  {
    q: "Can I test a bulk SMS API before paying?",
    a: (
      <>
        Yes. SMSLocal gives every new account ₹60 of free credit and sandbox access to send real
        test messages before you commit to a paid top-up — no credit card required to start.
      </>
    ),
  },
  {
    q: "What should I look for when choosing a bulk SMS API provider?",
    a: (
      <>
        Four things matter most: DLT onboarding support (do they help you register, or leave you
        to TRAI's portal alone), direct operator connectivity vs. reseller routes (affects
        delivery speed and reliability), real per-message delivery receipts via webhook, and
        transparent per-segment pricing with no hidden platform fee.
      </>
    ),
  },
]

export default function BulkSmsServiceApiPost() {
  return (
    <>
      <Lead>
        A bulk SMS service API lets your application send DLT-compliant SMS to any volume of
        recipients with a single HTTP call — no dashboard, no manual upload. This guide covers
        what the API actually does, the DLT requirements every Indian sender must meet, a working
        code example, and what separates a reliable provider from a risky one.
      </Lead>

      <H2 id="what-is-a-bulk-sms-api">What a bulk SMS service API actually does</H2>
      <P>
        At its core, a bulk SMS API is a request/response contract: you send an HTTP request with
        the recipient number(s), the message content, your registered sender ID, and (in India) a
        DLT template ID. The provider's platform validates the request, routes it to the
        recipient's carrier, and returns a message ID you can use to track delivery status.
      </P>
      <P>
        The word &ldquo;bulk&rdquo; just means the same endpoint accepts one recipient or
        thousands in a single call — the API doesn&apos;t change, only the size of the recipient
        array.
      </P>

      <BlogFigure
        src="/blog/web-to-sms-dashboard-no-code.webp"
        alt="Screenshot of a bulk SMS campaign interface showing recipient upload, template selection, scheduling, and a live delivery report with DND-filtered numbers highlighted."
        caption="Whether you send through a dashboard or call the API directly, the same DLT template, delivery-report, and DND-filtering rules apply underneath."
      />

      <H2 id="how-it-works">How a send actually works, end to end</H2>
      <UL>
        <LI>
          <Strong>1. Authenticate.</Strong> Every request carries an API key tied to your account,
          usually as a header (<code>Authorization: Bearer YOUR_API_KEY</code>).
        </LI>
        <LI>
          <Strong>2. Match a DLT template.</Strong> Your message text must match a pre-approved
          template byte-for-byte (with variables substituted in the approved positions) — this is
          checked before the request reaches the carrier.
        </LI>
        <LI>
          <Strong>3. Route and send.</Strong> The platform picks the fastest available carrier
          route for the destination network and dispatches the message.
        </LI>
        <LI>
          <Strong>4. Delivery report.</Strong> The API returns a message ID immediately; the final
          delivered/failed status arrives moments later via a delivery-report webhook or a status
          endpoint you poll.
        </LI>
      </UL>

      <H2 id="dlt-requirement">The DLT requirement (India-specific)</H2>
      <P>
        Every business SMS sent to an Indian number — transactional or promotional — must
        originate from a registered DLT Sender ID and match an approved content template. This is
        a TRAI rule enforced at the carrier level, not something any provider can bypass. An API
        call with an unregistered template returns a success response from the platform but the
        message never reaches the recipient.
      </P>
      <FigureTable
        columns={["Step", "What it registers", "Typical approval time"]}
        rows={[
          ["Principal Entity (PE)", "Your business as a legal sender", "1–2 business days"],
          ["Sender ID (Header)", "The 6-letter name recipients see (e.g. SMSLCL)", "1–2 business days"],
          ["Content Template", "The exact message text with variable slots", "Same day–2 days"],
        ]}
        caption="All three must be approved before an API send request will actually deliver. Full walkthrough in the DLT registration guide."
      />
      <P>
        For the complete step-by-step process, document checklist, and common rejection reasons,
        see our <A href="/blog/dlt-registration-guide/">DLT registration guide</A>.
      </P>

      <H2 id="code-example">A working request example</H2>
      <P>
        Every modern bulk SMS API follows roughly the same shape — a POST request with your
        sender ID, approved template ID, recipient, and template variables:
      </P>
      <FigureTable
        columns={["Field", "Example value", "Notes"]}
        rows={[
          ["sender_id", "SMSLCL", "Your approved DLT Header"],
          ["template_id", "1707xxxxxxxxxxxxxxxx", "Must match an approved DLT template"],
          ["to", "+919876543210", "Single number or an array for bulk sends"],
          ["variables", "{ otp: \"482913\" }", "Substituted into the approved template's variable slots"],
        ]}
      />
      <P>
        See the <A href="/developers/quickstart/">API quickstart</A> for a full working cURL,
        Node.js, and Python example you can paste in directly, and the{" "}
        <A href="/developers/sms-api/">SMS API reference</A> for every endpoint.
      </P>

      <BlogFigure
        src="/blog/business-sms-web-dashboard-no-phone.webp"
        alt="A web dashboard showing a shared team inbox of SMS conversations with delivery-status indicators, illustrating API-driven business SMS without a physical phone in the loop."
        caption="API-driven sends land the same delivery-report data you'd see in a dashboard — the difference is your code triggers it instead of a person clicking send."
      />

      <H2 id="choosing-a-provider">How to choose a bulk SMS API provider</H2>
      <P>
        Pricing per SMS is the most visible number, but it's rarely the deciding factor once you
        compare providers seriously. These matter more in practice:
      </P>
      <UL>
        <LI>
          <Strong>DLT onboarding help.</Strong> Some providers walk you through Entity, Header,
          and Template registration; others hand you a TRAI portal link and leave you to it.
        </LI>
        <LI>
          <Strong>Direct operator routes vs. resold routes.</Strong> Direct connectivity to Jio,
          Airtel, Vi, and BSNL is faster and more reliable than routes resold through an
          intermediary aggregator.
        </LI>
        <LI>
          <Strong>Real delivery receipts.</Strong> A webhook or endpoint that reports
          delivered/failed per message, not just an "accepted" response at send time.
        </LI>
        <LI>
          <Strong>Transparent pricing.</Strong> A published per-segment rate card with no hidden
          monthly platform fee layered on top.
        </LI>
      </UL>
      <P>
        See our full <A href="/pricing/">pricing breakdown</A> or read how SMSLocal compares to{" "}
        <A href="/compare/smslocal-vs-msg91/">MSG91</A> and{" "}
        <A href="/compare/smslocal-vs-fast2sms/">Fast2SMS</A> on API depth and route quality.
      </P>

      <Callout variant="tip" title="Test before you commit">
        SMSLocal gives every new account <Strong>₹60 free credit</Strong> and full API sandbox
        access — enough to send real test messages and see actual delivery receipts before your
        first paid top-up.
      </Callout>

      <BlogInlineCta
        title="Send your first bulk SMS via API today"
        body="DLT-compliant sender ID, direct operator routes, real delivery receipts, and a REST API with a free sandbox."
        primary={{ label: "Start free — ₹60 credit", href: "/signup/" }}
      />

      <H2 id="faq">Frequently asked questions</H2>
      <BlogFaq items={FAQ_ITEMS} />
    </>
  )
}
