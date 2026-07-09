import {
  A,
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

export default function WhatsappScamsIndiaPost() {
  return (
    <>
      <Lead>
        WhatsApp scams are among the most common digital frauds in India today — fake job offers,
        KYC fraud, investment schemes, OTP theft, digital-arrest calls, and impersonation attacks
        all arrive through WhatsApp every single day. This guide explains exactly how each type of
        WhatsApp scam works, how to identify it before it is too late, and what to do if you or a
        customer has already fallen victim.
      </Lead>

      <P>
        Guidance in this article is aligned with the advisories of the Indian Cyber Crime
        Coordination Centre (I4C) and WhatsApp&apos;s official safety resources.
      </P>

      <BlogFigure
        src="/blog/whatsapp-scams-kyc-fraud-redflags.webp"
        alt="Smartphone screen showing a WhatsApp chat with a suspicious KYC-update message, an urgent red warning banner, and a magnifying glass highlighting a fake bank logo."
        caption="A typical WhatsApp KYC scam — and its red flags."
      />

      <Callout variant="warning" title="This happens every day">
        India&apos;s cyber-crime helpline (1930) receives thousands of WhatsApp fraud complaints
        every month. The scams are not sophisticated — they work because they are fast, they
        create urgency, and they impersonate trusted entities like banks, government departments,
        and family members.
      </Callout>

      <H2 id="why-scammers-target-whatsapp">Why scammers target WhatsApp</H2>
      <P>
        WhatsApp is the default personal communication channel for most Indians, which makes it
        uniquely powerful for fraudsters: a message on WhatsApp feels more personal and urgent
        than an email, it arrives with a notification that demands attention, and it can carry
        images, documents, and links that look completely official.
      </P>
      <P>
        Unlike SMS, WhatsApp shows profile pictures and display names — both of which can be
        faked. A scammer can set a bank&apos;s logo as their picture, name themselves &quot;SBI
        Customer Care&quot;, and send a message that looks almost identical to a real bank
        communication. On a small phone screen, most people can&apos;t tell the difference quickly
        enough.
      </P>

      <H2 id="most-common-scams">The most common WhatsApp scams in India</H2>

      <H3 id="kyc-fraud">1. KYC fraud</H3>
      <P>
        The most widespread WhatsApp scam in India. You receive a message claiming your bank
        account, UPI ID, or wallet will be blocked unless you complete a KYC update immediately.
        It manufactures panic, then asks you to share your Aadhaar, PAN, account details, or OTP —
        sometimes via a link, sometimes by direct reply.
      </P>
      <P>
        <Strong>How to identify it:</Strong> real banks and regulated institutions never ask for
        OTPs, full account numbers, or passwords over WhatsApp. Ever. A genuine KYC request comes
        through a branch visit, the institution&apos;s own verified app, or registered email — not
        a WhatsApp message from an unknown number.
      </P>

      <H3 id="fake-job-offers">2. Fake job offers</H3>
      <P>
        A message offers high-paying remote work — task-based jobs, product reviewing,
        video-liking, stock tips. Early tasks are simple and the victim is even paid small amounts
        to build trust. Then comes a &quot;registration fee&quot;, &quot;security deposit&quot;, or
        &quot;withdrawal unlock fee&quot; — and the money disappears.
      </P>
      <P>
        <Strong>How to identify it:</Strong> no legitimate employer asks you to pay to start
        working. If you get paid first and are then asked to pay something back, it&apos;s a scam.
        Verify any company name on the <A href="https://www.mca.gov.in">MCA portal</A> before
        sharing personal information.
      </P>

      <H3 id="investment-scams">3. Investment and trading scams</H3>
      <P>
        Scammers add victims to WhatsApp groups posing as stock or crypto investment communities.
        A &quot;financial expert&quot; or &quot;SEBI-registered advisor&quot; shares tips and fake
        screenshots of huge returns, then pushes members to invest through a fraudulent platform.
        Deposited money can&apos;t be withdrawn — the platform vanishes or adds endless withdrawal
        fees.
      </P>
      <P>
        <Strong>How to identify it:</Strong> SEBI-registered advisors are listed on the{" "}
        <A href="https://www.sebi.gov.in">SEBI website</A> — verify before trusting anyone.
        Guaranteed returns are illegal under Indian securities law, and being added to a group you
        never asked to join is itself a red flag.
      </P>

      <H3 id="impersonation-scam">4. Impersonation — the family-emergency scam</H3>
      <P>
        A message from an unknown number: &quot;Beta, mera phone kho gaya, ye naya number hai.
        Please ₹5,000 bhej do, emergency hai.&quot; It appears to be from a parent, sibling, or
        close relative — the scammer has researched enough on social media to use the right
        language and context.
      </P>
      <P>
        <Strong>How to identify it:</Strong> always call the known number of the family member
        directly before sending any money. If they&apos;re genuinely unreachable, call another
        relative to verify. Never transfer money based on a WhatsApp message from a new number,
        however convincing.
      </P>

      <H3 id="otp-theft">5. OTP theft</H3>
      <P>
        Someone claiming to be from your bank, TRAI, or a government agency says you must verify
        your account by sharing the OTP you&apos;re about to receive. The instant you share it,
        they use it to log into your bank, UPI, or wallet and clear the balance.
      </P>
      <P>
        <Strong>How to identify it:</Strong> no bank, payment app, or government body will ever ask
        you to share an OTP. The whole purpose of a one-time password is to stay private. The
        second someone asks for an OTP, it&apos;s a scam — full stop.
      </P>

      <H3 id="screen-sharing">6. Screen sharing and remote access</H3>
      <P>
        A scammer posing as support asks you to install a screen-sharing app (AnyDesk, TeamViewer,
        Quick Support) to &quot;fix your account&quot;. Once you share your screen, they see every
        OTP, PIN, and password you enter — many victims have watched their savings drain in real
        time.
      </P>
      <P>
        <Strong>How to identify it:</Strong> real bank support never needs remote access to your
        phone. If any agent asks you to install an app or share your screen, end the call
        immediately and report the number.
      </P>

      <H3 id="digital-arrest">7. Digital arrest scams</H3>
      <P>
        One of the fastest-growing frauds in India. Scammers pose as police, CBI, customs, or
        income-tax officers on a WhatsApp video call — often with a fake uniform and a staged
        &quot;police station&quot; background. They claim you&apos;re implicated in money
        laundering or a parcel of contraband and that you&apos;re under &quot;digital
        arrest&quot;, then demand payment to &quot;clear your name&quot; and keep you on the call
        so you can&apos;t verify.
      </P>
      <P>
        <Strong>How to identify it:</Strong> there is no such thing as a &quot;digital
        arrest&quot;. No genuine Indian law-enforcement agency arrests, interrogates, or collects
        fines over a WhatsApp video call. Disconnect, and report it on 1930.
      </P>

      <H3 id="malicious-apk">8. Malicious APK and fake-invitation files</H3>
      <P>
        You receive a file that looks like a wedding invitation, an e-challan, a bank statement, or
        a courier-tracking app — but it&apos;s an Android APK. Installing it loads malware that can
        read your SMS (including OTPs), intercept banking apps, and quietly authorise
        transactions.
      </P>
      <P>
        <Strong>How to identify it:</Strong> never install an APK sent over WhatsApp. Legitimate
        apps come only from the Google Play Store or Apple App Store. A &quot;wedding invite&quot;
        or &quot;statement&quot; that&apos;s an app to install is always a scam.
      </P>

      <H3 id="qr-code-scams">9. QR-code and payment-request scams</H3>
      <P>
        A buyer, landlord, or &quot;refund&quot; agent sends a QR code or a UPI collect request and
        tells you to scan or approve it to receive money. Scanning a QR code or approving a
        collect request authorises a payment out of your account — you never receive money by
        scanning a code.
      </P>
      <P>
        <Strong>How to identify it:</Strong> you scan a QR code or approve a UPI request only to
        send money, never to receive it. Anyone telling you to scan &quot;to get paid&quot; is
        trying to debit your account.
      </P>

      <P>
        <Strong>Quick reference — the hook and the tell for each scam:</Strong>
      </P>
      <FigureTable
        columns={["Scam type", "The hook", "The red flag"]}
        rows={[
          [
            <Strong key="kyc">KYC fraud</Strong>,
            "Account will be blocked unless you update KYC now",
            "Asks for OTP, account number, or Aadhaar over WhatsApp",
          ],
          [
            <Strong key="job">Fake job offer</Strong>,
            "High-paying work from home — pay to register",
            "Asks you to pay before you earn",
          ],
          [
            <Strong key="invest">Investment scam</Strong>,
            "Guaranteed returns, “SEBI advisor” in a group",
            "Can't verify on the SEBI registry; can't withdraw",
          ],
          [
            <Strong key="impersonation">Impersonation</Strong>,
            "Family member on a new number needs money urgently",
            "Unknown number; can't be reached on their real number",
          ],
          [
            <Strong key="otp">OTP theft</Strong>,
            "Bank/TRAI asking for an OTP to “verify” you",
            "Anyone asking for an OTP you received is a scammer",
          ],
          [
            <Strong key="screen">Screen sharing</Strong>,
            "Support agent needs to see your screen to help",
            "No real agent ever needs remote access",
          ],
          [
            <Strong key="arrest">Digital arrest</Strong>,
            "“Officer” on video call says you're under arrest",
            "Police never arrest or fine you over WhatsApp",
          ],
          [
            <Strong key="apk">Malicious APK</Strong>,
            "Wedding invite / e-challan / statement file",
            "It's an app to install, not a document",
          ],
          [
            <Strong key="qr">QR / payment request</Strong>,
            "Scan this QR or approve this request to get money",
            "Scanning/approving only sends money, never receives",
          ],
        ]}
        caption="Nine scam patterns, one shared mechanism: manufactured urgency plus a request for money, data, or an OTP."
      />

      <Callout variant="tip" title="The one rule that catches almost everything">
        If a WhatsApp message triggers urgency and asks for money, personal data, or an OTP — stop,
        and verify through an official channel before doing anything.
      </Callout>

      <H2 id="warning-signs">Universal warning signs of a WhatsApp scam</H2>
      <P>
        Across every scam type, the same psychological patterns repeat. Learn to spot these and
        you&apos;ll catch the vast majority of attempts before any damage is done:
      </P>
      <UL>
        <LI>
          <Strong>Urgency and panic.</Strong> &quot;Your account will be blocked in 2 hours.&quot;
          Scammers use urgency to stop you thinking. A real bank gives you days, not minutes.
        </LI>
        <LI>
          <Strong>Unknown numbers claiming to be official.</Strong> Real banks and government
          departments use registered headers, official apps, or verified email — not random +91
          numbers.
        </LI>
        <LI>
          <Strong>Requests for OTPs, passwords, or PINs.</Strong> These are never shared with
          anyone — not bank staff, not family, not anyone.
        </LI>
        <LI>
          <Strong>Links to look-alike websites.</Strong> A real bank&apos;s link matches its
          official domain exactly. Scam links add extra characters — sbi-kyc-update.com,
          icicibankverify.net, and similar.
        </LI>
        <LI>
          <Strong>Requests to install apps or APK files.</Strong> AnyDesk, TeamViewer, or any APK
          gives remote access or installs malware. No legitimate company needs this.
        </LI>
        <LI>
          <Strong>Too-good-to-be-true offers.</Strong> ₹5,000/hour for liking videos, 50% monthly
          returns, lottery wins you never entered — these do not exist.
        </LI>
      </UL>

      <BlogFigure
        src="/blog/whatsapp-scams-warning-signs-checklist.webp"
        alt="Editorial illustration of a smartphone with a checklist overlay showing six warning-sign icons — a clock, an unknown caller, a padlock, a broken link, a download icon, and a rupee symbol."
        caption="The six warning signs common to almost every WhatsApp scam."
      />

      <H2 id="protecting-customers">
        For businesses: protecting your customers from impersonation
      </H2>
      <P>
        If your business communicates with customers on WhatsApp, scammers may impersonate you —
        creating fake accounts with your logo and name to send your customers fake refunds,
        support, or offers. Here&apos;s how to protect them and your brand:
      </P>
      <OL>
        <LI>
          <Strong>
            Use the official <A href="/products/whatsapp-business-api/">WhatsApp Business API</A>{" "}
            with a verified green tick.
          </Strong>{" "}
          The verified badge tells customers Meta has authenticated your account. Scammers
          can&apos;t fake it.
        </LI>
        <LI>
          <Strong>Publish your official WhatsApp number prominently.</Strong> Put your{" "}
          <A href="/blog/whatsapp-marketing-india/">verified WhatsApp Business account</A> number on
          your website, app, invoices, and packaging so customers know which number to trust. Any
          other number claiming to be you is an impersonator.
        </LI>
        <LI>
          <Strong>Tell customers what you&apos;ll never ask for.</Strong> Add a line to your
          transactional messages: &quot;We will never ask for your OTP, password, or full card
          number on WhatsApp.&quot; This one sentence prevents most impersonation attacks.
        </LI>
        <LI>
          <Strong>Report impersonator accounts immediately.</Strong> Document the fake account
          with screenshots and report it through WhatsApp&apos;s Business Support channel.
        </LI>
      </OL>

      <H2 id="if-scammed">What to do if you&apos;ve been scammed</H2>
      <P>
        If you&apos;ve already shared sensitive information or transferred money, act within the
        first hour — that&apos;s the window where banks can sometimes freeze a transaction:
      </P>
      <OL>
        <LI>
          <Strong>Call your bank immediately</Strong> on their official customer-care number
          (printed on your card or website). Ask them to freeze your account and reverse recent
          transactions.
        </LI>
        <LI>
          <Strong>Call the Cyber Crime Helpline: 1930.</Strong> This 24-hour government helpline is
          specifically for financial cyber fraud. The earlier you call, the higher the chance of
          recovering funds.
        </LI>
        <LI>
          <Strong>
            File a complaint at <A href="https://www.cybercrime.gov.in">cybercrime.gov.in</A>.
          </Strong>{" "}
          The National Cyber Crime Reporting Portal lets you file online. Keep screenshots of the
          WhatsApp conversation as evidence.
        </LI>
        <LI>
          <Strong>Change all passwords immediately.</Strong> If you shared credentials or an OTP
          was used, change your banking PIN, UPI PIN, email password, and anything using the same
          credentials.
        </LI>
        <LI>
          <Strong>Block and report the number on WhatsApp.</Strong> Open the chat, tap the number,
          then Report and Block — this helps WhatsApp shut the scammer down faster.
        </LI>
      </OL>

      <BlogFigure
        src="/blog/whatsapp-scams-first-hour-response.webp"
        alt="Split illustration showing a phone call to a bank, the 1930 cyber-crime helpline number, a government reporting portal on a laptop screen, and a hand blocking a contact on WhatsApp."
        caption="What to do in the first hour after a scam."
      />

      <Callout variant="info" title="I4C note">
        The key vulnerability in WhatsApp fraud is not technology — it&apos;s urgency. Slow down,
        verify, and never share an OTP with anyone.
      </Callout>

      <H2 id="faq">Frequently asked questions</H2>
      <H3>Can a scammer access my phone just by sending a WhatsApp message?</H3>
      <P>
        Not from a text message alone. The danger comes when you click a malicious link (which can
        install malware or open a phishing page) or voluntarily install an app or APK the scammer
        recommends. Don&apos;t click links from unknown numbers and never install apps on a
        stranger&apos;s say-so.
      </P>

      <H3>Someone added me to a WhatsApp group I didn&apos;t join. Is it a scam?</H3>
      <P>
        It may be. Being added without consent — especially to a group promoting investments,
        jobs, or giveaways — is a common scam setup. Leave immediately and don&apos;t interact.
        Prevent it in future via WhatsApp Settings → Privacy → Groups → &quot;My Contacts
        Only&quot;.
      </P>

      <H3>I got a WhatsApp message saying I won a lottery. Is it real?</H3>
      <P>
        No. No legitimate lottery notifies winners by WhatsApp from an unknown number. These
        always ask for a &quot;processing fee&quot; or personal details to &quot;release&quot; the
        winnings. Block and report.
      </P>

      <H3>Is a &quot;digital arrest&quot; real?</H3>
      <P>
        No. There is no legal concept of digital arrest in India. No police, CBI, or tax officer
        will arrest, interrogate, or collect a fine over a WhatsApp video call. Disconnect and
        report it on 1930.
      </P>

      <H3>Can I get my money back after a WhatsApp scam?</H3>
      <P>
        Possibly, if you act fast. Banks have fraud teams that can sometimes freeze a receiving
        account before the money moves, and the 1930 helpline has recovered funds for people who
        called within the first hour. The longer you wait, the lower the odds — fraudsters move
        money through multiple accounts within minutes.
      </P>

      <Callout variant="tip" title="One rule prevents most scams">
        Pause before acting. Every WhatsApp scam works by creating urgency. A real emergency from
        your bank or family can always wait five minutes while you verify through an official
        channel. A scam cannot afford those five minutes.
      </Callout>
    </>
  )
}
