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

export default function GmailPasswordRecoveryPost() {
  return (
    <>
      <Lead>
        Gmail&apos;s SMS-based password recovery has saved millions of accounts — and locked
        millions out when something goes wrong. This guide explains how Gmail&apos;s SMS recovery
        actually works, the exact failure modes, and what to do when the SMS just isn&apos;t
        arriving.
      </Lead>

      <Callout variant="warning" title="If you&apos;re locked out right now">
        Read the <Strong>&quot;Recovery SMS not arriving&quot;</Strong> section below first — it
        covers the five fastest fixes. If none work, the long-term recovery path (Google&apos;s
        account-recovery form) takes 3–5 days but almost always succeeds.
      </Callout>

      <H2 id="how-it-works">How Gmail&apos;s SMS recovery actually works</H2>
      <P>
        When you set up a Gmail account and add a phone number as a recovery method, Google
        stores it as a <Strong>recovery phone</Strong>. When you later need to reset your
        password, Google can send a 6-digit code to that number via SMS. You enter the code in
        the recovery flow and you&apos;re in.
      </P>
      <P>
        Under the hood, Google uses multiple SMS providers routed through different carriers
        globally. In India, the SMS typically arrives from the alphanumeric sender{" "}
        <InlineCode>VM-Google</InlineCode> or similar, and the code is valid for about 15
        minutes.
      </P>

      <H2 id="setup">Setting up SMS recovery (do this before you need it)</H2>
      <OL>
        <LI>
          Go to <A href="https://myaccount.google.com/">myaccount.google.com</A> → Security.
        </LI>
        <LI>
          Under <Strong>&quot;Ways we can verify it&apos;s you&quot;</Strong>, click{" "}
          <Strong>Recovery phone</Strong>.
        </LI>
        <LI>
          Add your mobile number (include country code — <InlineCode>+91</InlineCode> for India).
        </LI>
        <LI>
          Google sends a verification SMS. Enter the 6-digit code to confirm the number.
        </LI>
        <LI>
          Also set a <Strong>recovery email</Strong>. SMS alone is risky — if you lose your phone
          or the SIM is compromised, email is your fallback.
        </LI>
      </OL>
      <Callout variant="tip" title="Use a number you control long-term">
        The recovery phone should be one you&apos;ll keep for years — not a work number you might
        lose when you change jobs, or a family member&apos;s. If you port/change numbers, update
        it immediately.
      </Callout>

      <BlogFigure
        src="/blog/gmail-recovery-2fa-setup.jpg"
        alt="Small plain metallic hardware security key resting on a dark wooden desk beside a face-down smartphone, illuminated by a single warm amber lamp glow against a deep navy shadowed background."
        caption="Add a hardware key or authenticator app alongside SMS. When the SMS path breaks, the second factor is what lets you recover without the form."
      />

      <H2 id="recovering">Recovering your Gmail password with SMS</H2>
      <OL>
        <LI>
          On the sign-in screen, enter your email address and click <Strong>Next</Strong>.
        </LI>
        <LI>
          Click <Strong>&quot;Forgot password?&quot;</Strong>.
        </LI>
        <LI>
          Google may ask you to try your last remembered password. If you don&apos;t remember,
          click <Strong>Try another way</Strong>.
        </LI>
        <LI>
          You&apos;ll see options for recovery. Choose <Strong>&quot;Get a verification code at
          ***-***-**XX&quot;</Strong> (the last two digits of your recovery phone).
        </LI>
        <LI>
          Google sends an SMS with a 6-digit code. Enter it in the form.
        </LI>
        <LI>
          Set a new password. It must be different from your last one.
        </LI>
      </OL>

      <H2 id="not-arriving">Recovery SMS not arriving</H2>
      <P>
        Before panicking, wait 2 minutes — Google&apos;s SMS provider queue can lag. If it still
        hasn&apos;t arrived, try in this order:
      </P>

      <H3>1. Resend the code once (only once)</H3>
      <P>
        Click &quot;Resend&quot;. Multiple resends within 5 minutes can trigger anti-abuse and
        cause Google to fall back to a 24-hour verification hold.
      </P>

      <H3>2. Check every SMS folder</H3>
      <P>
        On Android, check: Inbox, Spam, Promotions, and any separate messaging app (Samsung
        Messages + Google Messages both installed is a common cause).
      </P>

      <H3>3. Verify the phone number Google has on file</H3>
      <P>
        Google shows the last two digits. If they don&apos;t match your current number — because
        you changed numbers — you won&apos;t receive the SMS. Skip to the alternate-method step.
      </P>

      <H3>4. Toggle airplane mode and reboot</H3>
      <P>
        Classic fix. Your phone may not be properly registered with the carrier. See our{" "}
        <A href="/blog/sms-activation/">SMS activation guide</A> for the full device-level
        checklist.
      </P>

      <H3>5. Try an alternate recovery method</H3>
      <P>
        On the recovery screen, click <Strong>&quot;Try another way&quot;</Strong>. Google may
        offer:
      </P>
      <UL>
        <LI>
          <Strong>Voice call</Strong> to the same number (reads the code aloud)
        </LI>
        <LI>
          <Strong>Code to recovery email</Strong>
        </LI>
        <LI>
          <Strong>Google prompt</Strong> on a device already signed in to your account
        </LI>
        <LI>
          <Strong>Passkey or security key</Strong> if you&apos;ve set one up
        </LI>
        <LI>
          <Strong>Account recovery form</Strong> (last resort — slow but reliable)
        </LI>
      </UL>

      <H2 id="account-recovery-form">The account recovery form (last resort)</H2>
      <P>
        If all SMS and email paths are dead, Google&apos;s{" "}
        <A href="https://accounts.google.com/signin/recovery">account-recovery form</A> is the
        fallback. Fill it out with:
      </P>
      <OL>
        <LI>The last password you remember (even a partial/old one helps).</LI>
        <LI>Approximate date you created the account.</LI>
        <LI>A device you typically sign in from (same Wi-Fi/IP works best).</LI>
        <LI>Contact details where Google can reach you.</LI>
      </OL>
      <P>
        Google reviews the form manually (or via their ML models). A decision typically comes
        within 3–5 days. Persistence matters — if the first attempt fails, resubmit with more
        details or from a device/network Google associates with you.
      </P>

      <H2 id="security-tips">Security tips so you never need recovery</H2>

      <H3>Use two-factor, but not SMS-only</H3>
      <P>
        SMS-based 2FA is better than nothing, but SIM-swap attacks are real in India. The safer
        setup:
      </P>
      <UL>
        <LI>
          <Strong>Google Authenticator or a passkey</Strong> as your primary second factor.
        </LI>
        <LI>
          <Strong>SMS as backup</Strong> only, with a recovery phone different from your daily
          SIM when possible.
        </LI>
        <LI>
          <Strong>Printed backup codes</Strong> stored in a safe place. Print them from your
          Google account settings.
        </LI>
      </UL>

      <BlogFigure
        src="/blog/gmail-recovery-sim-swap.jpg"
        alt="Single tiny nano-SIM card resting on an ejected smartphone SIM tray on a dark polished wooden surface, illuminated by cool blue directional light with one subtle warm amber highlight."
        caption="SIM swap attacks are the reason SMS-only recovery is no longer enough on accounts that matter. A second factor makes the SIM alone useless to an attacker."
      />

      <H3>Set up multiple recovery paths</H3>
      <P>
        Add both a recovery phone <Strong>and</Strong> a recovery email. Also enable Google
        prompts on your phone, so when you sign in on a new device you get a one-tap approval
        instead of needing SMS.
      </P>

      <H3>Watch for SIM-swap warning signs</H3>
      <P>
        If your SIM suddenly loses signal &quot;for no reason&quot; in the middle of the day and
        doesn&apos;t come back within an hour, treat it as a possible SIM swap. Call your carrier
        immediately from another phone, lock down banking, and check that your recovery phone
        still receives SMS.
      </P>
      <Callout variant="warning" title="Indian carriers and SIM swap">
        SIM-swap attacks in India typically work through document forgery — a fraudster takes a
        forged ID to a carrier outlet, claims to be you, and asks for a replacement SIM. Within
        minutes, they control your number. Recovery SMS goes to them. Keep your carrier&apos;s
        fraud hotline saved elsewhere.
      </Callout>

      <H2 id="faq">FAQ</H2>
      <H3>Why does Google sometimes skip SMS recovery?</H3>
      <P>
        Google&apos;s recovery algorithm is conditional. If your sign-in attempt looks suspicious
        — new country, unfamiliar device, strange timing — Google may disable SMS recovery
        temporarily and force you through the recovery form instead. This is a feature, not a
        bug.
      </P>

      <H3>My recovery phone is an old number I don&apos;t have anymore. What do I do?</H3>
      <P>
        You can&apos;t change it without signing in first — catch-22. Use the account recovery
        form and specify that you&apos;ve lost access to the phone number. Google will verify
        through other signals and, if successful, let you update it post-recovery.
      </P>

      <H3>Can I use a friend&apos;s number for recovery?</H3>
      <P>
        Technically yes, but it&apos;s a bad idea. Your recovery phone is how Google proves
        you&apos;re you — if a friend&apos;s number is on file, whoever has that number has the
        power to reset your password. Only use a number you control.
      </P>

      <H3>How long is the SMS code valid?</H3>
      <P>About 15 minutes. After that you&apos;ll need to request a new one.</P>

      <H3>Does DND block Gmail recovery SMS?</H3>
      <P>
        No. Google&apos;s recovery SMS is categorised as transactional/service-explicit and is
        exempt from DND. If you&apos;re on DND and still not receiving the SMS, the cause is
        elsewhere. Read our <A href="/blog/dnd-means/">DND means</A> guide for the mechanics.
      </P>

      <Blockquote cite="A support engineer who handles recovery escalations">
        The pattern is always the same: people set up a recovery phone, never update it, change
        numbers years later, and then get locked out. Review your recovery methods every six
        months — it takes two minutes and saves days.
      </Blockquote>

      <Callout variant="tip" title="For developers integrating OTP">
        Recovery SMS like Gmail&apos;s is the same category as your OTP SMS — transactional,
        time-sensitive, delivery-critical.{" "}
        <A href="/developers/sms-api/">SMSLocal OTP SMS</A> is built for exactly this pattern, with
        per-message delivery receipts and carrier-level retry. The{" "}
        <A href="/developers/api-docs/">API reference</A> covers the full integration.
      </Callout>
    </>
  )
}
