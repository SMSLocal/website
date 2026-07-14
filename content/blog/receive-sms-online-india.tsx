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

export default function ReceiveSmsOnlineIndiaPost() {
  return (
    <>
      <Lead>
        &quot;Receive SMS online&quot; services give you a temporary Indian mobile number in your
        browser, useful for signing up to apps without exposing your personal number. This guide
        explains when they&apos;re a legitimate tool, when they&apos;re not, and the tradeoffs
        serious products should understand.
      </Lead>

      <Callout variant="warning" title="This is about legitimate use cases">
        Receive-SMS services can be misused for fraud (fake KYC, bypassing OTP verification). This
        post is for developers, QA engineers, and privacy-conscious users evaluating them for
        <Strong> legitimate</Strong> purposes — not for bypassing identity checks on platforms
        that explicitly prohibit shared numbers.
      </Callout>

      <H2 id="how-it-works">How receive-SMS-online actually works</H2>
      <P>
        A receive-SMS service rents or leases Indian mobile numbers (usually via SIM boxes or
        carrier partnerships), connects them to a web interface, and displays every incoming SMS
        publicly or behind a user session. You pick a number, hand it over to whatever app
        you&apos;re signing up to, and the OTP shows up in the browser instead of on your phone.
      </P>
      <P>
        Technically, the number is real. It passes the carrier-level validation that most OTP
        systems rely on. Behaviourally, it&apos;s shared or ephemeral — the same number might
        receive hundreds of SMS from different users per day.
      </P>

      <BlogFigure
        src="/blog/how-receive-sms-online-works.webp"
        alt="Diagram showing how receive-SMS-online services work in India — renting real mobile numbers via SIM boxes, displaying incoming OTPs on a shared web interface."
        caption="A typical receive-SMS web interface. The number is real, the inbox is shared, and any code that lands there is visible to everyone on the page."
      />

      <H2 id="legit-uses">Legitimate use cases</H2>
      <OL>
        <LI>
          <Strong>QA and testing.</Strong> You&apos;re building an OTP flow and need to test it
          end-to-end without burning your personal number on a dev environment.
        </LI>
        <LI>
          <Strong>App trials.</Strong> You want to try a service you don&apos;t trust yet — a new
          social app, a shopping platform — without giving it your real number.
        </LI>
        <LI>
          <Strong>International users getting Indian OTPs.</Strong> You need to verify an Indian
          service from abroad and don&apos;t have an Indian SIM.
        </LI>
        <LI>
          <Strong>Privacy-first signups.</Strong> Services that don&apos;t need your phone number
          for genuine communication but require it for &quot;verification&quot;.
        </LI>
      </OL>

      <BlogFigure
        src="/blog/legitimate-use-cases.webp"
        alt="Illustration of legitimate use cases for receive-SMS-online services in India — QA testing, app trials, international users, and privacy-first signups."
        caption="Receive-SMS services are a valid tool for QA testing, throwaway signups, and international verification — just never use them for anything you want to keep or recover later."
      />

      <H2 id="not-legit">When it&apos;s not OK</H2>
      <P>Receive-SMS services have real limits — both legal and practical.</P>
      <UL>
        <LI>
          <Strong>Financial KYC.</Strong> UPI apps, banking apps, lending apps all require
          <Strong> your own</Strong> SIM for KYC. Using a shared receive-SMS number is fraud.
        </LI>
        <LI>
          <Strong>Government services.</Strong> Aadhaar, passport, DigiLocker, IRCTC — all tied to
          your real number for legal reasons.
        </LI>
        <LI>
          <Strong>Services with ToS prohibiting shared numbers.</Strong> WhatsApp, Gmail, Telegram
          explicitly prohibit shared numbers for account creation. Your account gets banned.
        </LI>
        <LI>
          <Strong>Any scenario where you&apos;re impersonating someone else.</Strong> This is
          identity fraud under the IT Act and a criminal offence.
        </LI>
      </UL>

      <H2 id="tradeoffs">Practical tradeoffs</H2>
      <FigureTable
        columns={["Attribute", "Receive-SMS online", "Your own SIM"]}
        rows={[
          [<Strong key="p">Privacy</Strong>, "High (disposable)", "Low (tied to you)"],
          [<Strong key="c">Cost</Strong>, "Free or ₹5–50/use", "Your plan"],
          [<Strong key="r">Reliability</Strong>, "Variable — some numbers are already flagged", "100%"],
          [<Strong key="s">Account recovery</Strong>, "Impossible — number is gone", "Works"],
          [
            <Strong key="a">Allowed by ToS?</Strong>,
            "Usually no, for named accounts",
            "Yes",
          ],
          [
            <Strong key="d">2FA implications</Strong>,
            "Do not use — anyone can read your SMS",
            "Safe",
          ],
        ]}
        caption="Good for throwaway, bad for anything you want to keep."
      />
      <Callout variant="warning" title="Never 2FA a real account">
        The single biggest mistake we see: someone signs up to a service with a receive-SMS
        number, forgets to update it, and months later the service uses SMS 2FA to send a
        password-reset code — to a number that thousands of strangers can read. Never 2FA an
        account you care about using a public receive-SMS number.
      </Callout>

      <H2 id="what-to-look-for">What to look for in a legitimate service</H2>
      <P>
        If you do have a genuine reason to use one, here&apos;s how to pick a service that
        won&apos;t leak, scam, or get you banned:
      </P>
      <OL>
        <LI>
          <Strong>Per-user private numbers</Strong> (paid services), not shared public inboxes.
        </LI>
        <LI>
          <Strong>Clear data retention policy</Strong> — SMS should auto-delete after a set
          window, not sit on their servers forever.
        </LI>
        <LI>
          <Strong>Numbers from reputable carriers</Strong>, not SIM-farm blocks flagged by major
          services.
        </LI>
        <LI>
          <Strong>No requirement to install sketchy apps</Strong> or extensions.
        </LI>
        <LI>
          <Strong>Reputable payment processor.</Strong> A service that only takes crypto is a
          signal.
        </LI>
      </OL>

      <BlogFigure
        src="/blog/what-to-look-for-in-a-legitimate-service.webp"
        alt="Checklist of what to look for when evaluating a legitimate receive-SMS-online service in India — private numbers, clear data retention, reputable carriers."
        caption="Private per-user numbers and a clear data-deletion policy are the two most important things to verify before trusting any receive-SMS service."
      />

      <H2 id="better-alternatives">Better alternatives for most use cases</H2>
      <P>
        In most cases there&apos;s a more appropriate tool than a shared receive-SMS service:
      </P>
      <UL>
        <LI>
          <Strong>For QA/testing your own OTP flow:</Strong> Use your own number or your team&apos;s
          QA numbers. Production-grade SMS platforms like{" "}
          <A href="/products/otp-sms/">SMSLocal OTP SMS</A> let you set up test flows with logging
          and delivery receipts so you don&apos;t actually need to receive the SMS on a phone at
          all — you inspect the payload in the dashboard.
        </LI>
        <LI>
          <Strong>For trying a service privately:</Strong> Use an email-only sign-up if one is
          offered. Some privacy-focused virtual-number apps (iPlum, Signal, etc.) give you a
          second real number tied to you, which is safer.
        </LI>
        <LI>
          <Strong>For avoiding telemarketing after signup:</Strong> Give your real number, then
          activate <A href="/blog/dnd-means/">DND</A>. That&apos;s what DND was designed for.
        </LI>
        <LI>
          <Strong>For international users needing an Indian number:</Strong> Most Indian services
          accept international numbers now. If not, an eSIM from an Indian MVNO is a legitimate
          long-term option.
        </LI>
      </UL>

      <H2 id="if-youre-a-business">If you&apos;re a business trying to block these numbers</H2>
      <P>
        From the sender side, most receive-SMS services route through the same few SIM-box
        carriers, and their numbers end up on known-bad lists shared across the industry. You
        have three practical defences:
      </P>
      <OL>
        <LI>
          <Strong>Number-type classification.</Strong> Most OTP vendors (including SMSLocal) flag
          known virtual/receive-SMS numbers before you dispatch. You can choose to block them, or
          route them through a secondary verification (email, voice call).
        </LI>
        <LI>
          <Strong>Velocity checks.</Strong> If the same number requests 20 OTPs across 20
          different user IDs in an hour, it&apos;s almost certainly a receive-SMS box. Rate-limit
          per-number, not just per-user.
        </LI>
        <LI>
          <Strong>Secondary signal binding.</Strong> Tie the phone number to device ID, IP, or
          payment method before granting account privileges — OTP alone is easy to spoof.
        </LI>
      </OL>

      <BlogFigure
        src="/blog/blocking-these-numbers-as-a-business.webp"
        alt="Diagram showing three defences businesses can use to block receive-SMS-online numbers — number-type classification, velocity checks, and secondary signal binding."
        caption="Number-type classification is the first line of defence; velocity checks and secondary binding close the gap for numbers that slip through."
      />

      <H2 id="faq">FAQ</H2>
      <BlogFaq>
        <BlogFaqItem q={"Is receive-SMS-online illegal in India?"}>
          The service itself isn&apos;t illegal, but using it to impersonate someone, commit fraud,
          or violate a service&apos;s terms of use is. For personal-privacy uses on services that
          don&apos;t prohibit it, you&apos;re fine.
        </BlogFaqItem>
        <BlogFaqItem q={"Can I use a receive-SMS number for Aadhaar OTP?"}>
          No. Aadhaar OTP is tied to the mobile number linked to your Aadhaar record. Using any
          other number is fraud and a criminal offence.
        </BlogFaqItem>
        <BlogFaqItem q={"Why do some services still let me sign up with a shared number?"}>
          Because detecting them is imperfect. Many services don&apos;t invest heavily in
          number-reputation checks, especially smaller apps. That doesn&apos;t mean they approve —
          they&apos;ll ban you later if they find out.
        </BlogFaqItem>
        <BlogFaqItem q={"Are there privacy-safe paid alternatives?"}>
          Yes. Signal (a secondary number), Google Voice (not India), JIO Number, Vi eSIM secondary
          lines, and iPlum all give you a real, private-to-you number that&apos;s safer than a
          public receive-SMS inbox and doesn&apos;t violate ToS.
        </BlogFaqItem>
      </BlogFaq>

      <Blockquote cite="A product security engineer we spoke to">
        The rule is simple: if you&apos;d be upset if your phone number got shared with strangers,
        don&apos;t use a public receive-SMS service. That includes anything you want to log back
        into later.
      </Blockquote>

      <Callout variant="tip" title="Building OTP flows?">
        If you&apos;re integrating OTP SMS into your product, <A href="/products/otp-sms/">SMSLocal
        OTP SMS</A> handles DLT registration, delivery guarantees, and number-type detection
        out-of-the-box — so you can block virtual numbers before they cost you. See the{" "}
        <A href="/developers/api-docs/">API reference</A> for the integration.
      </Callout>
    </>
  )
}
