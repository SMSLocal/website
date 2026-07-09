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

export default function TelegramCodeSmsPost() {
  return (
    <>
      <Lead>
        Telegram sends a verification code to your phone number when you sign in from a new device.
        In most cases the code arrives via the Telegram app itself — but when you&apos;re not
        already logged in anywhere, it falls back to SMS. If that SMS isn&apos;t arriving, the
        reasons are well-understood and all fixable. This guide walks through how Telegram&apos;s
        verification system works, every reason the SMS code might not reach you, and exactly what
        to do in each case.
      </Lead>

      <H2 id="how-telegram-verification-works">How Telegram&apos;s verification works</H2>
      <P>
        When you enter your phone number in the Telegram app, the platform attempts verification in
        a specific order:
      </P>
      <OL>
        <LI>
          <Strong>Telegram app on another device</Strong> — if you are already logged into Telegram
          on a different phone or desktop, the code appears as a message inside that Telegram
          session, not as an SMS. This is the default and most secure method.
        </LI>
        <LI>
          <Strong>SMS fallback</Strong> — if you have no other active Telegram session (logging in
          for the first time, or all other devices are logged out), Telegram sends a 5-digit code
          via SMS to the registered phone number.
        </LI>
        <LI>
          <Strong>Voice call fallback</Strong> — if the SMS fails to deliver within about 60
          seconds, Telegram offers a &ldquo;Call me&rdquo; option. The code is read aloud by an
          automated IVR call.
        </LI>
      </OL>
      <Callout variant="info" title="Most people never receive the SMS">
        If you have Telegram open on another device, the code goes there — not to your SMS inbox.
        Check all your devices (phones, tablets, desktop) before concluding the SMS hasn&apos;t
        arrived.
      </Callout>

      <H2 id="not-arriving">Why the Telegram SMS code isn&apos;t arriving</H2>
      <P>
        If you&apos;ve confirmed there is no other active Telegram session and the SMS still has
        not arrived after 2 minutes, one of these is usually the cause:
      </P>

      <H3>1. Wrong number registered</H3>
      <P>
        Telegram sends the code to the number associated with the account, not necessarily the SIM
        currently in your phone. If you changed your phone number since you last used Telegram but
        didn&apos;t update it in settings, the SMS goes to your old number.
      </P>
      <P>
        <Strong>Fix:</Strong> Try the old number in the login field. If you no longer have access
        to the old SIM, use the account recovery form (covered below).
      </P>

      <H3>2. DND (Do Not Disturb) active on your number</H3>
      <P>
        India&apos;s TRAI DND framework distinguishes transactional SMS (OTPs, alerts) from
        promotional SMS. OTPs are classified as transactional and should bypass DND. However,
        Telegram&apos;s SMS routing may pass through a commercial aggregator using a header
        registered under a content category that gets flagged as promotional on some operators.
      </P>
      <P>
        <Strong>Fix:</Strong> Temporarily deactivate DND by sending <InlineCode>STOP</InlineCode>{" "}
        to <InlineCode>1909</InlineCode>, wait 10 minutes, then request the code again. Re-activate
        DND by sending <InlineCode>START 0</InlineCode> to 1909 once logged in.
      </P>

      <H3>3. SMS blocked by your operator or spam filter</H3>
      <P>
        Some operators block SMS from international senders or from certain short codes, especially
        on prepaid SIMs. Telegram&apos;s SMS may originate from an international number or a code
        your operator flags as suspicious.
      </P>
      <P>
        <Strong>Fix:</Strong> Check your phone&apos;s spam or blocked messages folder. On Android,
        open Messages → ⋮ → Spam &amp; blocked. If it&apos;s there, mark it as &ldquo;not
        spam.&rdquo;
      </P>

      <H3>4. iMessage intercepting the number (iPhone)</H3>
      <P>
        On iPhones with iMessage enabled, if the sender&apos;s number is in your contacts as an
        iMessage user, iOS may route the message through iMessage rather than SMS. Telegram&apos;s
        verification codes won&apos;t arrive via iMessage.
      </P>
      <P>
        <Strong>Fix:</Strong> Go to Settings → Messages → Send &amp; Receive and make sure your
        number is active for SMS/MMS (green, not blue). Temporarily toggle iMessage off, request
        the code, then re-enable.
      </P>

      <H3>5. SIM not inserted or not primary SIM on dual-SIM phones</H3>
      <P>
        On dual-SIM devices, Telegram sends the code to the number you entered — but the default
        SMS SIM may be different from the number you registered with Telegram.
      </P>
      <P>
        <Strong>Fix:</Strong> Check which SIM is active. On Android: Settings → Network &amp;
        internet → SIM cards. Ensure the SIM associated with your Telegram number is inserted and
        set as the SMS SIM.
      </P>

      <H3>6. Network congestion or routing delay</H3>
      <P>
        International SMS routing (Telegram&apos;s servers are outside India) can occasionally be
        delayed by 2–10 minutes during peak periods. This is more common on Vi (Vodafone Idea) and
        BSNL than on Jio or Airtel.
      </P>
      <P>
        <Strong>Fix:</Strong> Wait 2 minutes and try the &ldquo;Call me&rdquo; option instead.
        A voice call bypasses most SMS routing issues.
      </P>

      <BlogFigure
        src="/blog/telegram-code-sms-phone.jpg"
        alt="Close-up of a hand holding a smartphone showing the Telegram login screen with a phone number entry field, against a softly blurred home background with warm ambient light."
        caption="Telegram shows a countdown timer after sending the code. When it expires, the 'Call me' option appears — this is often faster than waiting for a delayed SMS."
      />

      <H2 id="step-by-step-fix">Step-by-step fix</H2>
      <P>
        Work through these in order — most people resolve the issue by step 3:
      </P>
      <OL>
        <LI>
          <Strong>Check other devices</Strong> — open Telegram on every phone, tablet, or desktop
          where you might be logged in. The code is likely there.
        </LI>
        <LI>
          <Strong>Wait 2 minutes</Strong> — then tap &ldquo;Call me instead.&rdquo; The automated
          call is almost always faster than SMS when there are routing delays.
        </LI>
        <LI>
          <Strong>Check spam/blocked messages</Strong> — on Android: Messages → ⋮ → Spam &amp;
          blocked. On iPhone: Filters → Unknown Senders.
        </LI>
        <LI>
          <Strong>Verify the correct number</Strong> — confirm you&apos;re logging in with the
          number Telegram has on record. Try formatting with and without the country code
          (+91 vs 91 vs 0).
        </LI>
        <LI>
          <Strong>Restart your phone</Strong> — clears carrier network registration issues that can
          block incoming SMS.
        </LI>
        <LI>
          <Strong>Temporarily deactivate DND</Strong> — send STOP to 1909, wait 10 minutes,
          request the code again.
        </LI>
        <LI>
          <Strong>Try a different network</Strong> — if possible, switch to Wi-Fi calling or use
          a different SIM temporarily to check if it&apos;s an operator-specific block.
        </LI>
      </OL>

      <H2 id="voice-call-alternative">Using the voice call option</H2>
      <P>
        The &ldquo;Call me instead&rdquo; button appears on the Telegram login screen about 60
        seconds after the SMS is sent. This is often the fastest resolution:
      </P>
      <UL>
        <LI>An automated call connects to your phone within 10–30 seconds</LI>
        <LI>A voice reads the 5-digit code twice, slowly</LI>
        <LI>The code is the same code that would have come via SMS — enter it in the app</LI>
        <LI>Voice calls bypass DND restrictions and most SMS blocks</LI>
      </UL>
      <Callout variant="tip" title="Voice call is often faster">
        The voice call option consistently outperforms SMS for Telegram login in India. If the SMS
        hasn&apos;t arrived within 90 seconds, tap &ldquo;Call me instead&rdquo; without waiting
        further.
      </Callout>

      <H2 id="account-recovery">What to do if you&apos;ve lost access to the phone number</H2>
      <P>
        If you no longer have the SIM registered to your Telegram account (lost phone, changed
        number, ported to a different operator and SIM expired), recovery is more difficult:
      </P>
      <OL>
        <LI>
          <Strong>Check for an active desktop session</Strong> — Telegram Web (web.telegram.org)
          or the desktop app may still be logged in. If so, you can change your phone number from
          within Settings → Phone number.
        </LI>
        <LI>
          <Strong>Use Telegram&apos;s account deletion flow</Strong> — if you have a new number,
          you can create a new Telegram account on it. Telegram accounts tied to an unused number
          are automatically deleted after 6 months of inactivity, freeing the account.
        </LI>
        <LI>
          <Strong>Contact Telegram support</Strong> — Telegram&apos;s account recovery support is
          limited by design (the system is built to resist unauthorised recovery). File a request
          at telegram.org/support and include as much account ownership evidence as possible.
        </LI>
      </OL>

      <H2 id="security">Security implications of SMS verification</H2>
      <P>
        Telegram&apos;s SMS-based login has a known security limitation: anyone who can intercept
        or forward your SMS (via a SIM-swap attack, for example) can log into your Telegram account.
        To reduce this risk:
      </P>
      <UL>
        <LI>
          <Strong>Enable Two-Step Verification</Strong> — Settings → Privacy and Security → Two-
          Step Verification. This adds a password requirement on top of the SMS code. Even if
          someone receives your verification SMS, they cannot log in without the password.
        </LI>
        <LI>
          <Strong>Set an account self-destruct timer</Strong> — Settings → Privacy → Delete My
          Account. If your account is inactive for 1–6 months, Telegram deletes it, preventing
          long-term dormant account hijacking.
        </LI>
        <LI>
          <Strong>Monitor active sessions</Strong> — Settings → Privacy → Active Sessions. Review
          and terminate any sessions you don&apos;t recognise.
        </LI>
      </UL>

      <FigureTable
        columns={["Threat", "Risk without 2SV", "Risk with 2SV enabled"]}
        rows={[
          ["SIM-swap attack", "Account fully compromised", "Attacker still needs your password"],
          ["SMS interception", "Account accessible", "Password still required"],
          ["Lost phone", "Account accessible to finder", "Password + remote session termination"],
          ["Phishing for code", "Account compromised", "Password still required"],
        ]}
        caption="Two-Step Verification (2SV) is Telegram's built-in protection against SMS-based account takeovers."
      />

      <H2 id="faq">Frequently asked questions</H2>

      <H3>How long does the Telegram verification code take to arrive in India?</H3>
      <P>
        Usually 10–30 seconds. If it hasn&apos;t arrived in 90 seconds, use the &ldquo;Call
        me&rdquo; option — the voice call is more reliable than SMS for Telegram in India.
      </P>

      <H3>I got the code on another device but I don&apos;t have that device with me</H3>
      <P>
        The code sent to your other Telegram session is a notification inside the app, not an SMS.
        You need to log in on the other device temporarily to retrieve it, or wait 60 seconds for
        the SMS fallback option to appear and then use &ldquo;Call me instead.&rdquo;
      </P>

      <H3>Can I use a virtual number or VoIP number for Telegram?</H3>
      <P>
        Telegram actively blocks known VoIP number ranges for registration and verification. Real
        Indian mobile numbers (starting with 6, 7, 8, or 9 on Jio, Airtel, Vi, or BSNL) work
        reliably. Virtual numbers from apps like TextNow frequently fail.
      </P>

      <H3>The code expired before I could enter it — what now?</H3>
      <P>
        Telegram verification codes expire after 5 minutes. If the code expired, tap
        &ldquo;Resend code&rdquo; on the verification screen to request a new one. A 60-second
        cooldown applies between resend attempts.
      </P>

      <H3>Does Telegram use the same number for OTP every time?</H3>
      <P>
        No. Telegram uses different sender numbers and routes across different sessions, regions,
        and operators. The code may arrive from different international numbers on different
        occasions — this is normal. Do not block the sender number after receiving a code.
      </P>

      <Blockquote cite="Telegram FAQ, 2025">
        If you receive a login code without requesting one, someone may be attempting to log into
        your account. Do not share the code with anyone.
      </Blockquote>

      <Callout variant="tip" title="Building SMS OTP into your own app?">
        If you&apos;re a developer building your own SMS verification flow, SMSLocal&apos;s OTP
        route delivers to Indian numbers in under 5 seconds with 99.8% delivery rates.{" "}
        <A href="/developers/sms-api/">See the API documentation</A> or{" "}
        <A href="/signup/">start with ₹60 free credit</A>.
      </Callout>
    </>
  )
}
