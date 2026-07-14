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

export default function SmsActivationPost() {
  return (
    <>
      <Lead>
        If SMS has stopped working on your phone — messages won&apos;t send, OTPs don&apos;t
        arrive, or you keep getting &quot;not activated on this device&quot; errors — the fix is
        almost always simpler than it looks. This guide walks through every layer (device,
        carrier, account) you need to check.
      </Lead>

      <Callout variant="info" title="Start here">
        In 9 out of 10 cases, SMS that stopped working is fixed by one of three things:
        toggling airplane mode, setting the correct SMSC (Short Message Service Centre) number,
        or asking your carrier to re-provision your account. Work through the checks below in
        order.
      </Callout>

      <H2 id="quick-fix">The 30-second fix to try first</H2>
      <OL>
        <LI>
          <Strong>Toggle airplane mode.</Strong> Turn it on, wait 10 seconds, turn it off. This
          forces your phone to re-register with the carrier and fixes most SMS issues caused by
          tower hand-offs.
        </LI>
        <LI>
          <Strong>Restart the phone.</Strong> Full reboot — not just screen-off. This clears any
          stuck cellular state.
        </LI>
        <LI>
          <Strong>Send an SMS to yourself.</Strong> If it arrives within 30 seconds, SMS is
          working. If it doesn&apos;t, proceed to the deeper checks below.
        </LI>
      </OL>

      <H2 id="device-level">Device-level checks</H2>

      <H3>iPhone</H3>
      <UL>
        <LI>
          <Strong>Settings → Messages → Send &amp; Receive:</Strong> ensure your phone number
          (not just email) is checked under &quot;You can be reached&quot;.
        </LI>
        <LI>
          <Strong>Settings → Messages → iMessage:</Strong> if iMessage is on but your SMS
          isn&apos;t going through, toggle it off for a minute then back on. iMessage sometimes
          intercepts what should be a normal SMS.
        </LI>
        <LI>
          <Strong>Settings → Cellular → SIM:</Strong> confirm your SIM is enabled and has the
          right label (primary line).
        </LI>
        <LI>
          <Strong>Settings → Cellular → Cellular Data Options → Voice &amp; Data:</Strong> make
          sure it&apos;s set to 5G, LTE, or 4G. Some carriers (Vi especially) drop SMS when the
          phone falls back to 2G.
        </LI>
      </UL>

      <H3>Android</H3>
      <UL>
        <LI>
          <Strong>Settings → Apps → Messages → Permissions:</Strong> SMS permission must be
          granted. Required on Android 12+ after certain updates.
        </LI>
        <LI>
          <Strong>Settings → Apps → Messages → Set as default app:</Strong> if you switched to
          WhatsApp or another messenger as your default, SMS may be disabled.
        </LI>
        <LI>
          <Strong>Settings → Mobile Network → SIM:</Strong> confirm the SIM is enabled and check
          the <Strong>APN settings</Strong> match your carrier&apos;s defaults (each operator has
          specific APN values on their website).
        </LI>
        <LI>
          <Strong>Messages app → Settings → Advanced → Message Centre:</Strong> this is the SMSC
          number and it must match your carrier. Wrong SMSC is the #1 Android SMS issue.
        </LI>
      </UL>

      <BlogFigure
        src="/blog/device-level-checks.webp"
        alt="Hand holding an open empty smartphone SIM tray with a single nano-SIM card and a small metal ejector pin resting on a clean wooden desk in warm window light."
        caption="Where the SMSC lives on most Android builds. A blank or wrong value here is a silent killer for outbound SMS."
      />

      <H2 id="smsc-numbers">Correct SMSC numbers for Indian carriers</H2>
      <P>
        If your SMSC is wrong, outgoing SMS fails silently or gets stuck at &quot;sending&quot;.
        Here are the current defaults:
      </P>
      <FigureTable
        columns={["Carrier", "Default SMSC number"]}
        rows={[
          [<Strong key="jio">Jio</Strong>, "+917010075099"],
          [<Strong key="airtel">Airtel</Strong>, "+919895051914"],
          [<Strong key="vi">Vodafone Idea (Vi)</Strong>, "+919821099999"],
          [<Strong key="bsnl">BSNL</Strong>, "+919434099999"],
          [<Strong key="mtnl">MTNL Delhi</Strong>, "+919868001111"],
        ]}
        caption="Regional SMSCs can differ — check with your carrier&apos;s self-service app if these don&apos;t work."
      />
      <Callout variant="warning" title="Don&apos;t guess the SMSC">
        If SMS starts failing after you change the SMSC, change it back to your carrier&apos;s
        published value. An SMSC mismatch can cause messages to be silently dropped for days.
      </Callout>

      <BlogInlineCta
        title="Sending OTPs your customers actually receive"
        body="SMSLocal delivers DLT-compliant transactional OTP SMS across Jio, Airtel, Vi and BSNL, with per-message delivery receipts so you can see exactly where a message stopped."
        primary={{ label: "Start free — ₹60 credit", href: "/signup/" }}
      />
      <H2 id="carrier-level">Carrier-level issues</H2>
      <P>
        If device settings are correct and SMS still doesn&apos;t work, the issue is probably on
        the carrier side.
      </P>

      <H3>New SIM not activated</H3>
      <P>
        When you insert a new SIM, activation can take 4–24 hours. During that window, voice and
        data might work but SMS doesn&apos;t. If you&apos;re past 24 hours, call your
        carrier&apos;s activation helpline:
      </P>
      <UL>
        <LI>Jio: 199 (from the Jio SIM) or 18008899999</LI>
        <LI>Airtel: 121 or 18001034444</LI>
        <LI>Vi: 199 or 19826200000</LI>
        <LI>BSNL: 1503</LI>
      </UL>

      <H3>Postpaid overage or unpaid bill</H3>
      <P>
        On postpaid, some carriers block outbound SMS (but not incoming) when you&apos;re past
        due. Check your balance in the carrier app or pay the outstanding amount.
      </P>

      <H3>Prepaid balance insufficient</H3>
      <P>
        If your plan doesn&apos;t include free SMS and your main balance is zero, outbound SMS
        will fail. Top up or upgrade to a plan with SMS included.
      </P>

      <H3>International roaming</H3>
      <P>
        When you&apos;re roaming internationally, outbound SMS costs ₹3–20 per message depending
        on the destination. If roaming SMS isn&apos;t enabled on your account, it silently fails.
        Enable &quot;International SMS&quot; in your carrier&apos;s app.
      </P>

      <BlogFigure
        src="/blog/carrier-level-issues.webp"
        alt="Cell-phone tower silhouetted against a warm golden-hour sky over a suburban Indian neighborhood."
        caption="The last layer to rule out before calling your carrier: the tower itself. A weak cell or a stuck hand-off shows up as SMS-only failures more often than you&apos;d think."
      />

      <H2 id="otp-not-arriving">When OTPs specifically aren&apos;t arriving</H2>
      <P>
        If your SIM works for regular SMS but OTPs from specific services don&apos;t arrive, the
        issue is upstream. Check in order:
      </P>
      <OL>
        <LI>
          <Strong>Is the service&apos;s SMS provider having an outage?</Strong> Some providers
          experience partial delivery failures with specific carriers. Check the service&apos;s
          status page.
        </LI>
        <LI>
          <Strong>Is your number on DND with a strict setting?</Strong>{" "}
          <InlineCode>START 0</InlineCode> on DND only blocks promotional, not transactional —
          but if you accidentally enabled a setting that filters transactional too, OTPs stop
          arriving. Check with your carrier&apos;s DND helpline (1909).
        </LI>
        <LI>
          <Strong>Have you blocked the sender?</Strong> If you previously reported the service as
          spam, your phone may be filtering them. Check your blocked list.
        </LI>
        <LI>
          <Strong>Is your phone&apos;s SMS storage full?</Strong> Rare but happens — some phones
          silently drop new SMS when storage is full. Delete old threads.
        </LI>
        <LI>
          <Strong>Is the phone number on file with the service still correct?</Strong> If you
          ported to a new number (MNP), the service might still be sending to your old number.
        </LI>
      </OL>

      <BlogFigure
        src="/blog/when-otps-specifically-arent-arriving.webp"
        alt="Smartphone screen showing an empty SMS inbox with a loading spinner, illustrating an OTP that never arrived."
        caption="OTP failures are usually upstream — DND filters, a suspended DLT template, or a carrier-side rate limit."
      />

      <H2 id="business-side">If you&apos;re the business sending the OTP</H2>
      <P>
        When customers report &quot;not receiving your OTP&quot;, the issue is almost always
        one of these on your side:
      </P>
      <UL>
        <LI>
          <Strong>Template or header suspended</Strong> at the DLT layer. Check your SMSLocal
          dashboard for delivery failures tagged &quot;Header rejected&quot; or &quot;Template
          mismatch&quot;.
        </LI>
        <LI>
          <Strong>Customer is on DND with strict filtering.</Strong> Make sure your header is
          correctly categorised as transactional.
        </LI>
        <LI>
          <Strong>Rate-limiting on carrier side.</Strong> Sending 50 OTPs to the same number in
          5 minutes triggers carrier-level abuse protection.
        </LI>
        <LI>
          <Strong>International format issues.</Strong> Indian numbers should be stored as{" "}
          <InlineCode>+91XXXXXXXXXX</InlineCode>, not <InlineCode>0XXXXXXXXXX</InlineCode> or
          plain 10-digit.
        </LI>
      </UL>

      <BlogFigure
        src="/blog/if-youre-the-business-sending-the-otp.webp"
        alt="Developer looking at an SMS delivery report dashboard on a laptop, checking OTP delivery status."
        caption="Check your SMSLocal delivery report first — it shows whether the failure is at the DLT layer, the carrier, or the end device."
      />

      <H2 id="faq">FAQ</H2>
      <BlogFaq>
        <BlogFaqItem q={"My SIM works for calls but not SMS. Why?"}>
          Usually a wrong SMSC number on Android or a stuck iMessage registration on iPhone. Work
          through the device-level checks above first.
        </BlogFaqItem>
        <BlogFaqItem q={"I switched from iPhone to Android and SMS stopped working."}>
          Known issue — iMessage &quot;captures&quot; your number even after you switch. Fix by
          going to <A href="https://selfsolve.apple.com/deregister-imessage">Apple&apos;s
          de-register iMessage page</A> and entering your number.
        </BlogFaqItem>
        <BlogFaqItem q={"SMS works but sending is stuck at \"sending\" forever."}>
          This is almost always a wrong SMSC or a network issue. Toggle airplane mode, verify SMSC,
          and retry. If it keeps happening, delete the stuck message and restart.
        </BlogFaqItem>
        <BlogFaqItem q={"My phone got a software update and SMS stopped working."}>
          Some updates reset SMSC to a generic default. Re-set your carrier&apos;s SMSC number in
          Messages → Settings → Advanced. On iPhone, sign out of iMessage and back in.
        </BlogFaqItem>
        <BlogFaqItem q={"Can I send SMS from a computer?"}>
          Yes — using web-to-SMS services, your carrier&apos;s portal, or an API like{" "}
          <A href="/products/bulk-sms/">SMSLocal Bulk SMS</A>. See our guide on{" "}
          <A href="/blog/send-sms-online/">sending SMS online</A> for the full breakdown.
        </BlogFaqItem>
      </BlogFaq>

      <Blockquote cite="Support engineer, SMSLocal">
        Half the &quot;SMS broken&quot; tickets we see are solved by airplane-mode toggle. The
        other half are SMSC mismatches or a stuck iMessage number. Almost none are ever carrier
        outages.
      </Blockquote>

      <Callout variant="tip" title="For developers integrating SMS">
        If you&apos;re building a product that sends SMS and customers are reporting non-delivery,
        start with delivery receipts. <A href="/products/otp-sms/">SMSLocal OTP SMS</A> gives you
        per-message DLR showing carrier, template match, and failure reason — so you know whether
        the issue is your side or theirs. The <A href="/developers/api-docs/">API reference</A>
        covers the DLR endpoint.
      </Callout>
    </>
  )
}
