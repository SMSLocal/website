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

export default function SendSmsOnlinePost() {
  return (
    <>
      <Lead>
        Sending SMS from a computer or web browser is faster, cheaper, and more reliable than
        sending from a phone — especially at any kind of scale. This guide walks through every
        legitimate way to send SMS online in India, the tradeoffs, and which path fits your use
        case.
      </Lead>

      <Callout variant="info" title="Scope">
        We focus on sending <Strong>from India to Indian numbers</Strong>. International SMS
        routing has different compliance rules and costs. We also explicitly avoid unsafe
        &quot;free bulk SMS&quot; sites that violate TRAI&apos;s DLT requirements — those get
        your sender ID suspended and can&apos;t be used in production.
      </Callout>

      <H2 id="who-sends-online">Who sends SMS online and why</H2>
      <P>
        Four user segments dominate online SMS sending in India:
      </P>
      <OL>
        <LI>
          <Strong>Small businesses</Strong> running customer follow-ups, appointment reminders,
          and seasonal promotions. Typical volume: 100–10,000 SMS/month.
        </LI>
        <LI>
          <Strong>Developers and startups</Strong> integrating SMS via API into their products —
          <A href="/products/otp-sms/">OTPs</A>, verification codes, service notifications.
          Typical volume: variable, demand-driven.
        </LI>
        <LI>
          <Strong>Enterprise marketing teams</Strong> running scheduled bulk campaigns and cart
          recovery. Typical volume: 100,000+ SMS/campaign.
        </LI>
        <LI>
          <Strong>Schools, clinics, housing societies</Strong> sending parent/member notices.
          Typical volume: a few thousand per event.
        </LI>
      </OL>

      <BlogFigure
        src="/blog/who-sends-sms-online-and-why.webp"
        alt="Illustration of the four segments that send SMS online in India — small businesses, developers, enterprise marketing teams, and institutions like schools and clinics."
        caption="Online SMS sending in India spans small businesses running 100-message reminders to enterprise teams pushing millions per campaign — the right method depends on volume and technical capability."
      />

      <H2 id="ways-to-send">The four ways to send SMS online</H2>
      <FigureTable
        columns={["Method", "Best for", "Cost", "Setup time"]}
        rows={[
          [
            <Strong key="web">Web-to-SMS dashboard</Strong>,
            "Non-technical users, small batches",
            "₹0.10–0.40/SMS",
            "10 minutes",
          ],
          [
            <Strong key="api">SMS API</Strong>,
            "Developers, in-app notifications, OTPs",
            "₹0.10–0.25/SMS",
            "30 minutes",
          ],
          [
            <Strong key="bulk">Bulk SMS platform</Strong>,
            "Marketing teams, scheduled campaigns",
            "₹0.08–0.20/SMS",
            "1 hour",
          ],
          [
            <Strong key="wa">WhatsApp Business API</Strong>,
            "Rich content, higher engagement",
            "₹0.40–1.40/msg",
            "2–7 days (verification)",
          ],
        ]}
        caption="Pick based on volume, channel, and whether you need a UI or code integration."
      />

      <H2 id="web-to-sms">1. Web-to-SMS dashboard (no code)</H2>
      <P>
        The fastest way in. You sign up on a platform, upload a CSV of numbers, type the message,
        and hit send. This is what non-technical users typically want.
      </P>
      <P>What to look for:</P>
      <UL>
        <LI>
          <Strong>DLT-compliant.</Strong> Platform must scrub your list against NCPR and reject
          any un-registered sender attempt. If a service lets you send without DLT, don&apos;t
          use it — they&apos;re operating illegally and you&apos;re liable.
        </LI>
        <LI>
          <Strong>Campaign scheduling.</Strong> Send at 10am the day of, not at 3am when you
          finish drafting.
        </LI>
        <LI>
          <Strong>Delivery reports.</Strong> Every send should show per-number delivery status —
          delivered, dropped, DND-filtered.
        </LI>
        <LI>
          <Strong>Template manager.</Strong> Approved DLT templates stored in the platform; you
          pick from a list instead of copying between tools.
        </LI>
      </UL>
      <Callout variant="tip" title="Our take">
        <A href="/products/bulk-sms/">SMSLocal Bulk SMS</A> is our web-to-SMS product, built for
        exactly this use case. DLT onboarding, NCPR scrub, scheduling, and DLR are all
        out-of-the-box. If you just want to{" "}
        <A href="/resources/tools/free-sms-without-registration/">
          send free SMS without registration
        </A>{" "}
        to test the waters, we have a ₹60 credit to start. For personal sending from a browser
        using your own SIM, see our{" "}
        <A href="/blog/free-sms/">guide to free SMS in India</A> — operator portals like MyJio
        and Airtel Thanks let you send from your real number at no cost.
      </Callout>

      <BlogFigure
        src="/blog/web-to-sms-dashboard-no-code.webp"
        alt="Screenshot of a web-to-SMS dashboard showing a bulk SMS campaign interface — upload CSV, select template, schedule send, and view delivery report with DND-filtered numbers highlighted."
        caption="A typical web-to-SMS campaign: upload, segment, schedule, watch the delivery stream. The best platforms surface DND drops and wrong-number filtering inline so you see exactly what was reached."
      />

      <BlogInlineCta
        title="Send your first SMS in minutes"
        body="Sign up for an SMSLocal account to send SMS from a web dashboard or our API, with DLT-compliant routing for Indian numbers. Start with ₹60 credit."
        primary={{ label: "Start free — ₹60 credit", href: "/signup/" }}
      />

      <H2 id="api">2. SMS API (for developers)</H2>
      <P>
        If you&apos;re building a product, use an API instead of a dashboard. You call an
        endpoint with the recipient&apos;s number and message body, and the SMS is dispatched.
        The typical request looks like this:
      </P>
      <Callout variant="info" title="Minimal HTTP request">
        <P>
          <InlineCode>POST https://api.smslocal.in/sms/send</InlineCode>
          {" — "}with JSON body{" "}
          <InlineCode>{"{\"to\": \"+91XXXXXXXXXX\", \"template_id\": \"...\", \"vars\": {...}}"}</InlineCode>
          {" — "}and an API-key header. You get back a delivery ID and a status URL you can poll.
        </P>
      </Callout>
      <P>
        What a good SMS API gives you that a dashboard doesn&apos;t:
      </P>
      <UL>
        <LI>
          <Strong>Webhooks.</Strong> Push delivery updates to your server instead of polling.
        </LI>
        <LI>
          <Strong>Per-message tracking.</Strong> Correlate every SMS back to your user, flow, and
          template.
        </LI>
        <LI>
          <Strong>Template interpolation.</Strong> Send the same DLT-approved template with
          different variable values per user.
        </LI>
        <LI>
          <Strong>Rate-limit-aware queueing.</Strong> Built-in backoff when you hit carrier-side
          throttles.
        </LI>
      </UL>

      <Callout variant="tip" title="Start here">
        Our <A href="/developers/quickstart/">Quickstart</A> gets you from signup to first SMS in
        under 5 minutes. The <A href="/developers/api-docs/">full API reference</A> covers every
        endpoint.
      </Callout>

      <H2 id="bulk">3. Bulk SMS platform (for marketing teams)</H2>
      <P>
        Bulk platforms are web-to-SMS with campaign management layered on top. You upload a
        segmented list, pick a template, schedule a send, and get a post-campaign dashboard with
        deliveries, bounces, and DND drops.
      </P>
      <P>Key features a marketing team needs:</P>
      <UL>
        <LI>
          <Strong>Audience segmentation.</Strong> Filter your list by state, language preference,
          last-engagement, or any custom attribute.
        </LI>
        <LI>
          <Strong>A/B testing.</Strong> Split your audience across two templates and compare
          delivery + response rates.
        </LI>
        <LI>
          <Strong>Regional sending.</Strong> Send Hindi templates to Hindi-belt pincodes and
          English templates to metros — from the same campaign.
        </LI>
        <LI>
          <Strong>Unsubscribe handling.</Strong> Built-in STOP-keyword handling that updates your
          list automatically.
        </LI>
      </UL>

      <H2 id="whatsapp">4. WhatsApp Business API (when SMS isn&apos;t enough)</H2>
      <P>
        When you need richer content (images, buttons, catalogs) or higher engagement than SMS
        gives you, <A href="/blog/bulk-whatsapp-messaging/">WhatsApp Business API</A> is the modern
        answer. The tradeoff is complexity: there
        are message categories, template approvals, 24-hour sessions, and Meta verification.
      </P>
      <P>WhatsApp makes sense when:</P>
      <UL>
        <LI>You need two-way conversations, not just one-shot sends.</LI>
        <LI>Your audience is mostly on WhatsApp already (which, in India, is most audiences).</LI>
        <LI>You want to send rich media — receipts with product images, appointment cards with confirm buttons.</LI>
        <LI>You have the bandwidth to manage template approvals through Meta.</LI>
      </UL>
      <Callout variant="tip" title="Deep dive">
        See our <A href="/products/whatsapp-business-api/">WhatsApp Business API</A> page for
        pricing, session windows, and template approval guidance.
      </Callout>

      <H2 id="legal">Legal requirements for sending SMS online in India</H2>
      <P>
        Whatever channel and platform you pick, these rules apply to every{" "}
        <A href="https://en.wikipedia.org/wiki/SMS">SMS</A> sent from India to an Indian number:
      </P>
      <OL>
        <LI>
          <Strong>DLT registration.</Strong> Your company (Principal Entity), sender ID
          (Header), and every template you send must be registered on TRAI&apos;s DLT platform.
          Read the full <A href="/blog/dlt-registration-guide/">DLT registration guide</A>.
        </LI>
        <LI>
          <Strong>Consent.</Strong> You must hold documented, auditable opt-in for every
          recipient of a promotional message. Service SMS to your own customers (OTPs, receipts)
          don&apos;t need explicit SMS consent — they&apos;re implied by the relationship.
        </LI>
        <LI>
          <Strong>NCPR scrub.</Strong> Promotional lists must be scrubbed against the National
          Customer Preference Register before every send.
        </LI>
        <LI>
          <Strong>Send windows.</Strong> 9am to 9pm IST for promotional and service-implicit
          messages. 24×7 for transactional and service-explicit.
        </LI>
        <LI>
          <Strong>Unsubscribe mechanism.</Strong> Promotional templates must include a STOP
          keyword instruction, and you must honour opt-outs within 24 hours.
        </LI>
      </OL>

      <BlogFigure
        src="/blog/legal-requirements-sms-india.webp"
        alt="Summary of the legal requirements for sending SMS online in India — DLT registration, consent, NCPR scrub, send windows, and unsubscribe mechanism."
        caption="All five rules apply regardless of which method you use. A compliant SMS platform handles NCPR scrub and send-window enforcement automatically — DLT registration and consent are on you."
      />

      <H2 id="faq">FAQ</H2>
      <BlogFaq>
        <BlogFaqItem q={"Can I send SMS online for free?"}>
        Some platforms offer a free signup credit (SMSLocal gives you ₹60 to start), which is
        enough for a few hundred test messages. Beyond that, expect ₹0.10–0.40 per SMS depending
        on volume and route. Any &quot;totally free&quot; service for ongoing use is either
        running illegally without DLT, or is going to sell your data.
        </BlogFaqItem>

        <BlogFaqItem q={"Do I need a separate account for each sender ID?"}>
        No. One account, one Principal Entity, but you can register multiple sender IDs
        (different brands, different campaign types) under the same account.
        </BlogFaqItem>

        <BlogFaqItem q={"Can I send SMS to international numbers?"}>
        Yes, most Indian SMS platforms route international SMS, but the pricing and compliance
        rules vary sharply by destination country. Check your platform&apos;s international rate
        card.
        </BlogFaqItem>

        <BlogFaqItem q={"How fast is online SMS delivery?"}>
        For transactional messages, expect sub-second carrier delivery (the time the recipient
        actually sees it depends on their phone/network). For promotional at scale, the batch
        clears within a few minutes to an hour depending on volume and your send rate.
        </BlogFaqItem>

        <BlogFaqItem q={"What's the difference between SMS API and email API?"}>
        Same architecture, different channel. SMS APIs dispatch via telecom carriers; email APIs
        dispatch via SMTP. In India, SMS has DLT + NCPR requirements that email doesn&apos;t, so
        SMS onboarding is more paperwork-heavy but delivery rates are higher.
        </BlogFaqItem>

        <BlogFaqItem q={"Can I send SMS in Hindi or regional languages?"}>
        Yes — all Indian SMS platforms support Unicode (UCS-2) encoding for Devanagari, Tamil,
        Telugu, Malayalam, Bengali, Gujarati, Kannada, and Odia. The tradeoff is character limit:
        a standard ASCII/GSM-7 SMS fits 160 characters per segment, but a Unicode SMS fits only
        70 characters per segment. A Hindi OTP message like &ldquo;आपका OTP है: {"{#var#}"}. 5
        मिनट में उपयोग करें।&rdquo; uses about 55 characters — comfortably in one segment. Longer
        promotional messages will span two segments (billed as two SMS). DLT template approval for
        regional-language templates works the same as for English; declare the correct language on
        the portal when submitting.
        </BlogFaqItem>
      </BlogFaq>

      <Blockquote cite="A growth marketer onboarded in 2024">
        The whole process took three days — two for DLT header approval and one for us to set up
        the dashboard. After that, every campaign is 10 minutes: pick template, upload list,
        schedule, done.
      </Blockquote>

      <Callout variant="tip" title="Pick your starting point">
        Not sure which path fits? If you&apos;re non-technical and want to send a few thousand
        messages for a promotion, start with <A href="/products/bulk-sms/">Bulk SMS</A>. If
        you&apos;re a developer integrating into your product, jump into the{" "}
        <A href="/developers/quickstart/">Quickstart</A>. And if you want richer conversations,{" "}
        <A href="/products/whatsapp-business-api/">WhatsApp Business API</A> is probably what
        you&apos;re looking for.
      </Callout>
    </>
  )
}
