import {
  A,
  BlogFigure,
  Callout,
  FigureTable,
  H2,
  LI,
  Lead,
  P,
  Strong,
  UL,
} from "@/components/blog/blog-prose"
import { BlogFaq } from "@/components/blog/blog-faq"

const FAQ_ITEMS = [
  {
    q: "What is an OTP SMS service?",
    a: (
      <>
        An OTP SMS service delivers one-time password codes to a user&apos;s phone over the
        telecom network. Your application generates the code, calls the provider&apos;s API with
        an approved DLT template, and the provider routes it to the recipient&apos;s carrier and
        reports back whether it was delivered.
      </>
    ),
  },
  {
    q: "Do OTP messages need DLT registration in India?",
    a: (
      <>
        Yes. Every SMS sent to an Indian number, including OTPs, must originate from a registered
        Principal Entity and Sender ID and match an approved content template. Without a matching
        template the API call still succeeds, but the operator drops the message before it reaches
        the handset.
      </>
    ),
  },
  {
    q: "Does DND block OTP messages?",
    a: (
      <>
        No. OTPs are service-explicit transactional messages and are exempt from NCPR scrubbing,
        so they reach numbers registered on DND. If your OTPs are not arriving, DND is almost
        never the cause.
      </>
    ),
  },
  {
    q: "How long should an OTP stay valid?",
    a: (
      <>
        Short enough to limit exposure, long enough to survive a slow network. Most Indian
        products settle between five and ten minutes, paired with a resend button rather than a
        longer window. Always invalidate the code the moment it is used successfully.
      </>
    ),
  },
  {
    q: "Why do some users receive the OTP late?",
    a: (
      <>
        Late delivery is usually a queue, not a failure. Promotional-category routes are batched
        and deprioritised by carriers during peak traffic, so an OTP filed under the wrong
        category will lag. Sending on a transactional route keeps codes in the priority queue.
      </>
    ),
  },
  {
    q: "Can I send OTPs on WhatsApp instead of SMS?",
    a: (
      <>
        You can, using WhatsApp authentication templates, but it only works if the user has
        WhatsApp installed and online. Most Indian products send SMS as the primary channel
        because it needs no internet connection, and treat WhatsApp or voice as the fallback.
      </>
    ),
  },
]

export default function OtpSmsServicePost() {
  return (
    <>
      <Lead>
        An OTP SMS is the one message a business cannot afford to lose. It has seconds to arrive,
        it has to match a pre-approved template byte for byte, and it reaches a user who is
        already stuck at a login screen. This guide covers how OTP delivery actually works in
        India, the rules that apply specifically to one-time passwords, why codes go missing, and
        what to weigh before you pick a provider.
      </Lead>

      <H2 id="what-is-otp-sms">What an OTP SMS actually is</H2>
      <P>
        A one-time password is a short numeric code, valid for a single use inside a narrow time
        window, that proves the person completing an action controls a particular phone number.
        The SMS itself is ordinary — what makes it an OTP is everything around it: how the code is
        generated, how long it lives, and how quickly it is invalidated.
      </P>
      <UL>
        <LI>
          <Strong>Single use.</Strong> Once redeemed, the code must be dead. Reusable codes defeat
          the entire purpose.
        </LI>
        <LI>
          <Strong>Time-boxed.</Strong> A short expiry limits how long an intercepted code is
          worth anything.
        </LI>
        <LI>
          <Strong>Transactional category.</Strong> OTPs are service-explicit messages, which is
          why they reach numbers on DND when marketing SMS cannot.
        </LI>
        <LI>
          <Strong>Network-independent.</Strong> SMS rides the carrier signalling layer, so the
          code arrives on a phone with no data connection at all.
        </LI>
      </UL>

      <H2 id="how-it-works">How an OTP send works, end to end</H2>
      <P>
        The round trip has more moving parts than most teams expect, and each one is a place
        delivery can quietly fail.
      </P>
      <UL>
        <LI>
          <Strong>1. Your server generates the code.</Strong> Store a hash of it against the
          session with an expiry, never the plain value.
        </LI>
        <LI>
          <Strong>2. Your server calls the SMS API.</Strong> The request carries the recipient,
          your registered sender ID, the approved template ID, and the code as a template
          variable.
        </LI>
        <LI>
          <Strong>3. The platform validates and routes.</Strong> Template match is checked first,
          then the message is handed to the fastest available route for that operator.
        </LI>
        <LI>
          <Strong>4. The carrier delivers.</Strong> The operator&apos;s SMSC pushes the message to
          the handset, holding it if the device is unreachable.
        </LI>
        <LI>
          <Strong>5. A delivery receipt comes back.</Strong> A webhook confirms delivered or
          failed per message — this is the only honest signal that the code arrived.
        </LI>
      </UL>
      <BlogFigure
        src="/blog/how-sms-works-technically.webp"
        alt="Flow diagram tracing a text message from the sending device through the operator's SMSC relay to the receiving handset."
        caption="An OTP never touches the internet on the last leg — it travels the operator's signalling layer and is held by the SMSC until the handset is reachable."
      />

      <H2 id="dlt-rules">The DLT rules that apply to OTP</H2>
      <P>
        India treats OTP traffic like all other business SMS: it must come from a registered
        entity, use a registered sender ID, and match a registered template. The template is where
        OTP senders trip up, because the approved text is matched exactly and only the declared
        variable slots may change between sends.
      </P>
      <FigureTable
        columns={["What breaks", "What the sender sees", "What the user sees"]}
        rows={[
          ["Template text edited after approval", "API returns success", "Nothing arrives"],
          ["Extra variable added to the message", "API returns success", "Nothing arrives"],
          ["Sender ID not mapped to the template", "API returns success", "Nothing arrives"],
          ["Filed under promotional category", "Delivered, slowly", "Code arrives late"],
        ]}
        caption="The dangerous failure mode is silent: the platform accepts the request and the operator drops it downstream."
      />
      <P>
        If you have not been through entity, header, and template approval yet, our{" "}
        <A href="/blog/dlt-registration-guide/">DLT registration guide</A> walks through each
        document, the realistic timelines, and the rejection reasons that catch most first-time
        senders.
      </P>
      <BlogFigure
        src="/blog/why-dlt-exists.webp"
        alt="Graphic showing India's TRAI-mandated DLT registry sitting between business senders and mobile subscribers."
        caption="DLT makes every sender, sender ID, and message template verifiable before delivery — OTP traffic is no exception."
      />

      <H2 id="delivery-failures">Why OTPs go missing</H2>
      <P>
        When a user says the code never came, the cause is almost always upstream of their phone.
        Working through these in order resolves the majority of reports.
      </P>
      <UL>
        <LI>
          <Strong>Template drift.</Strong> Someone changed the wording in code without re-filing
          the template. The commonest cause by a wide margin.
        </LI>
        <LI>
          <Strong>Wrong category.</Strong> An OTP filed as promotional gets batched behind
          marketing traffic and arrives minutes late, or during a blackout window, not at all.
        </LI>
        <LI>
          <Strong>Carrier rate limiting.</Strong> Repeated sends to one number in a short span get
          throttled at the operator.
        </LI>
        <LI>
          <Strong>Handset-side filtering.</Strong> Spam filters and blocked-sender lists on the
          device can swallow a legitimate code.
        </LI>
        <LI>
          <Strong>Stale number.</Strong> The number was ported, recycled, or simply mistyped at
          signup.
        </LI>
      </UL>
      <BlogFigure
        src="/blog/when-otps-specifically-arent-arriving.webp"
        alt="Phone display with a blank message list and a spinner where a verification code should have appeared."
        caption="Start at the delivery report, not the handset — it tells you whether the failure sits at the template layer, the carrier, or the device."
      />
      <P>
        Working through that list depends entirely on the platform handing back a per-message
        delivery receipt rather than a single &ldquo;accepted&rdquo; response at send time. Real
        receipts are what the{" "}
        <A href="/products/otp-sms/">SMSLocal OTP SMS product</A> reports back per code, which is
        the difference between knowing a message failed and guessing at it.
      </P>

      <Callout variant="tip" title="Instrument before you debug">
        Log the provider message ID against every OTP you issue and store the delivery receipt
        when it lands. Without that pairing, every failure report becomes guesswork.
      </Callout>

      <H2 id="security">What SMS OTP does and does not protect</H2>
      <P>
        SMS OTP is a genuine improvement over passwords alone: it stops credential stuffing and
        reuse attacks outright, because a leaked password is no longer sufficient. What it does
        not stop is an attacker who controls the phone number or who relays the code in real time.
        SIM-swap fraud and convincing phishing pages both defeat it, which is why{" "}
        <A href="https://pages.nist.gov/800-63-3/sp800-63b.html">
          NIST&apos;s digital identity guidelines
        </A>{" "}
        classify SMS as a restricted authenticator and push higher-risk flows toward app-based or
        hardware factors.
      </P>
      <P>
        For most Indian consumer products SMS remains the right default, because reach beats
        theoretical strength when the alternative is no second factor at all. Tighten it where it
        is weakest:
      </P>
      <UL>
        <LI>Keep expiry short and invalidate immediately on successful use.</LI>
        <LI>Rate-limit both requests per number and verification attempts per code.</LI>
        <LI>Bind the code to the originating session so it cannot be replayed elsewhere.</LI>
        <LI>Never read a code back to a user, and say so in the message itself.</LI>
      </UL>

      <H2 id="build-vs-buy">Build versus buy</H2>
      <P>
        The API call is the easy part. What you actually take on by building is carrier
        relationships, DLT paperwork, route failover when one operator degrades, retry logic,
        delivery-receipt plumbing, and someone reachable at 2am when codes stop landing on one
        network.
      </P>
      <FigureTable
        columns={["Concern", "Build it yourself", "Use a provider"]}
        rows={[
          ["DLT onboarding", "Your team files everything", "Onboarding support"],
          ["Route failover", "You negotiate and monitor", "Handled upstream"],
          ["Delivery receipts", "You build the pipeline", "Webhook out of the box"],
          ["Time to first OTP", "Weeks", "Days"],
        ]}
      />
      <P>
        For teams that want the second column, an established provider absorbs the DLT paperwork,
        the route monitoring, and the receipt plumbing — which leaves your codebase responsible
        for only two things: generating the code and verifying it.
      </P>
      <BlogFigure
        src="/blog/business-sms-web-dashboard-no-phone.webp"
        alt="Browser-based team inbox listing SMS threads beside per-message delivery status badges."
        caption="Whether a code is triggered by your code or a person, the same template, route, and delivery-receipt machinery runs underneath."
      />

      <H2 id="faq">Frequently asked questions</H2>
      <BlogFaq items={FAQ_ITEMS} />
    </>
  )
}
