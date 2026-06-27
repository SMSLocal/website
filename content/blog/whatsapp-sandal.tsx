import {
  A,
  Blockquote,
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

export default function WhatsAppSandalPost() {
  return (
    <>
      <Lead>
        WhatsApp scams are among the most common digital frauds in India today — fake job offers, KYC
        fraud, investment schemes, OTP theft, digital-arrest calls, and impersonation attacks all
        arrive through WhatsApp every single day. This guide explains exactly how each type of WhatsApp
        scam works, how to identify it before it is too late, and what to do if you or a customer has
        already fallen victim.
      </Lead>
      <P>
        Guidance in this article is aligned with the advisories of the Indian Cyber Crime Coordination
        Centre (I4C) and WhatsApp&rsquo;s official safety resources.
      </P>

      <BlogFigure
        src="/blog/whatsapp-sandal-fig1.png"
        width={2046}
        height={1552}
        priority
        alt="An annotated WhatsApp KYC scam message from a fake bank account, with its red flags highlighted — unknown number, urgency, and a request to share an OTP."
        caption="A typical WhatsApp KYC scam — and its red flags."
      />

      <Callout variant="warning" title="This happens every day">
        India&rsquo;s cyber-crime helpline (1930) receives thousands of WhatsApp fraud complaints every
        month. The scams are not sophisticated — they work because they are fast, they create urgency,
        and they impersonate trusted entities like banks, government departments, and family members.
      </Callout>

      <H2 id="why-whatsapp">Why scammers target WhatsApp</H2>
      <P>
        WhatsApp is the default personal communication channel for most Indians, which makes it
        uniquely powerful for fraudsters: a message on WhatsApp feels more personal and urgent than an
        email, it arrives with a notification that demands attention, and it can carry images,
        documents, and links that look completely official.
      </P>
      <P>
        Unlike SMS, WhatsApp shows profile pictures and display names — both of which can be faked. A
        scammer can set a bank&rsquo;s logo as their picture, name themselves &ldquo;SBI Customer
        Care&rdquo;, and send a message that looks almost identical to a real bank communication. On a
        small phone screen, most people can&rsquo;t tell the difference quickly enough.
      </P>

      <H2 id="common-scams">The most common WhatsApp scams in India</H2>

      <H3>1. KYC fraud</H3>
      <P>
        The most widespread WhatsApp scam in India. You receive a message claiming your bank account,
        UPI ID, or wallet will be blocked unless you complete a KYC update immediately. It manufactures
        panic, then asks you to share your Aadhaar, PAN, account details, or OTP — sometimes via a link,
        sometimes by direct reply.
      </P>
      <P>
        <Strong>How to identify it:</Strong> real banks and regulated institutions never ask for OTPs,
        full account numbers, or passwords over WhatsApp. Ever. A genuine KYC request comes through a
        branch visit, the institution&rsquo;s own verified app, or registered email — not a WhatsApp
        message from an unknown number.
      </P>

      <H3>2. Fake job offers</H3>
      <P>
        A message offers high-paying remote work — task-based jobs, product reviewing, video-liking,
        stock tips. Early tasks are simple and the victim is even paid small amounts to build trust.
        Then comes a &ldquo;registration fee&rdquo;, &ldquo;security deposit&rdquo;, or
        &ldquo;withdrawal unlock fee&rdquo; — and the money disappears.
      </P>
      <P>
        <Strong>How to identify it:</Strong> no legitimate employer asks you to pay to start working.
        If you get paid first and are then asked to pay something back, it&rsquo;s a scam. Verify any
        company name on the MCA portal (mca.gov.in) before sharing personal information.
      </P>

      <H3>3. Investment and trading scams</H3>
      <P>
        Scammers add victims to WhatsApp groups posing as stock or crypto investment communities. A
        &ldquo;financial expert&rdquo; or &ldquo;SEBI-registered advisor&rdquo; shares tips and fake
        screenshots of huge returns, then pushes members to invest through a fraudulent platform.
        Deposited money can&rsquo;t be withdrawn — the platform vanishes or adds endless withdrawal
        fees.
      </P>
      <P>
        <Strong>How to identify it:</Strong> SEBI-registered advisors are listed on the SEBI website
        (sebi.gov.in) — verify before trusting anyone. Guaranteed returns are illegal under Indian
        securities law, and being added to a group you never asked to join is itself a red flag.
      </P>

      <H3>4. Impersonation — the family-emergency scam</H3>
      <P>
        A message from an unknown number: &ldquo;Beta, mera phone kho gaya, ye naya number hai. Please
        ₹5,000 bhej do, emergency hai.&rdquo; It appears to be from a parent, sibling, or close relative
        — the scammer has researched enough on social media to use the right language and context.
      </P>
      <P>
        <Strong>How to identify it:</Strong> always call the known number of the family member directly
        before sending any money. If they&rsquo;re genuinely unreachable, call another relative to
        verify. Never transfer money based on a WhatsApp message from a new number, however convincing.
      </P>

      <H3>5. OTP theft</H3>
      <P>
        Someone claiming to be from your bank, TRAI, or a government agency says you must verify your
        account by sharing the OTP you&rsquo;re about to receive. The instant you share it, they use it
        to log into your bank, UPI, or wallet and clear the balance.
      </P>
      <P>
        <Strong>How to identify it:</Strong> no bank, payment app, or government body will ever ask you
        to share an OTP. The whole purpose of a one-time password is to stay private. The second
        someone asks for an OTP, it&rsquo;s a scam — full stop.
      </P>

      <H3>6. Screen sharing and remote access</H3>
      <P>
        A scammer posing as support asks you to install a screen-sharing app (AnyDesk, TeamViewer, Quick
        Support) to &ldquo;fix your account&rdquo;. Once you share your screen, they see every OTP, PIN,
        and password you enter — many victims have watched their savings drain in real time.
      </P>
      <P>
        <Strong>How to identify it:</Strong> real bank support never needs remote access to your phone.
        If any agent asks you to install an app or share your screen, end the call immediately and
        report the number.
      </P>

      <H3>7. Digital arrest scams</H3>
      <P>
        One of the fastest-growing frauds in India. Scammers pose as police, CBI, customs, or
        income-tax officers on a WhatsApp video call — often with a fake uniform and a staged
        &ldquo;police station&rdquo; background. They claim you&rsquo;re implicated in money laundering
        or a parcel of contraband and that you&rsquo;re under &ldquo;digital arrest&rdquo;, then demand
        payment to &ldquo;clear your name&rdquo; and keep you on the call so you can&rsquo;t verify.
      </P>
      <P>
        <Strong>How to identify it:</Strong> there is no such thing as a &ldquo;digital arrest&rdquo;.
        No genuine Indian law-enforcement agency arrests, interrogates, or collects fines over a
        WhatsApp video call. Disconnect, and report it on 1930.
      </P>

      <H3>8. Malicious APK and fake-invitation files</H3>
      <P>
        You receive a file that looks like a wedding invitation, an e-challan, a bank statement, or a
        courier-tracking app — but it&rsquo;s an Android APK. Installing it loads malware that can read
        your SMS (including OTPs), intercept banking apps, and quietly authorise transactions.
      </P>
      <P>
        <Strong>How to identify it:</Strong> never install an APK sent over WhatsApp. Legitimate apps
        come only from the Google Play Store or Apple App Store. A &ldquo;wedding invite&rdquo; or
        &ldquo;statement&rdquo; that&rsquo;s an app to install is always a scam.
      </P>

      <H3>9. QR-code and payment-request scams</H3>
      <P>
        A buyer, landlord, or &ldquo;refund&rdquo; agent sends a QR code or a UPI collect request and
        tells you to scan or approve it to receive money. Scanning a QR code or approving a collect
        request authorises a payment <Strong>out</Strong> of your account — you never receive money by
        scanning a code.
      </P>
      <P>
        <Strong>How to identify it:</Strong> you scan a QR code or approve a UPI request only to send
        money, never to receive it. Anyone telling you to scan &ldquo;to get paid&rdquo; is trying to
        debit your account.
      </P>

      <P>Quick reference — the hook and the tell for each scam:</P>
      <FigureTable
        columns={["Scam type", "The hook", "The tell"]}
        rows={[
          ["KYC fraud", "Account blocked unless you update KYC now", "Asks for OTP, account number, or Aadhaar over WhatsApp"],
          ["Fake job offer", "High-paying work from home — pay to register", "Asks you to pay before earning"],
          ["Investment scam", "Guaranteed returns, SEBI advisor in a group", "Not on SEBI registry; money can't be withdrawn"],
          ["Impersonation", "Family member on a new number needs money", "Unknown number; can't verify on their real number"],
          ["OTP theft", "Bank/TRAI asking for an OTP to verify", "Anyone asking for an OTP you received is a scammer"],
          ["Screen sharing", "Support agent needs to see your screen", "No real support needs remote access"],
          ["Digital arrest", "Police/CBI video call, you're 'under arrest'", "No such thing — agencies don't arrest over a call"],
          ["Malicious APK", "Wedding invite / e-challan / statement file", "It's an .apk — never install apps from WhatsApp"],
          ["QR / payment request", "Scan this QR / approve to receive money", "Scanning or approving only sends money out"],
        ]}
      />
      <P>
        The one rule that catches almost everything: if a WhatsApp message triggers urgency and asks
        for money, personal data, or an OTP — stop, and verify through an official channel before doing
        anything.
      </P>

      <H2 id="warning-signs">Universal warning signs of a WhatsApp scam</H2>
      <P>
        Across every scam type, the same psychological patterns repeat. Learn to spot these and
        you&rsquo;ll catch the vast majority of attempts before any damage is done:
      </P>
      <UL>
        <LI><Strong>Urgency and panic.</Strong> &ldquo;Your account will be blocked in 2 hours.&rdquo; Scammers use urgency to stop you thinking. A real bank gives you days, not minutes.</LI>
        <LI><Strong>Unknown numbers claiming to be official.</Strong> Real banks and government departments use registered headers, official apps, or verified email — not random +91 numbers.</LI>
        <LI><Strong>Requests for OTPs, passwords, or PINs.</Strong> These are never shared with anyone — not bank staff, not family, not anyone.</LI>
        <LI><Strong>Links to look-alike websites.</Strong> A real bank&rsquo;s link matches its official domain exactly. Scam links add extra characters — sbi-kyc-update.com, icicibankverify.net, and similar.</LI>
        <LI><Strong>Requests to install apps or APK files.</Strong> AnyDesk, TeamViewer, or any APK gives remote access or installs malware. No legitimate company needs this.</LI>
        <LI><Strong>Too-good-to-be-true offers.</Strong> ₹5,000/hour for liking videos, 50% monthly returns, lottery wins you never entered — these do not exist.</LI>
      </UL>

      <BlogFigure
        src="/blog/whatsapp-sandal-fig2.png"
        width={2046}
        height={1307}
        alt="An infographic of the six warning signs common to almost every WhatsApp scam: urgency, unknown official numbers, OTP requests, look-alike links, app-install requests, and too-good-to-be-true offers."
        caption="The six warning signs common to almost every WhatsApp scam."
      />

      <H2 id="businesses">For businesses: protecting your customers from impersonation</H2>
      <P>
        If your business communicates with customers on WhatsApp, scammers may impersonate you —
        creating fake accounts with your logo and name to send your customers fake refunds, support, or
        offers. Here&rsquo;s how to protect them and your brand:
      </P>
      <UL>
        <LI><Strong>Use the official WhatsApp Business API with a verified green tick.</Strong> The verified badge tells customers Meta has authenticated your account. Scammers can&rsquo;t fake it.</LI>
        <LI><Strong>Publish your official WhatsApp number prominently.</Strong> Put your verified number on your website, app, invoices, and packaging so customers know which number to trust. Any other number claiming to be you is an impersonator.</LI>
        <LI><Strong>Tell customers what you&rsquo;ll never ask for.</Strong> Add a line to your transactional messages: &ldquo;We will never ask for your OTP, password, or full card number on WhatsApp.&rdquo; This one sentence prevents most impersonation attacks.</LI>
        <LI><Strong>Report impersonator accounts immediately.</Strong> Document the fake account with screenshots and report it through WhatsApp&rsquo;s Business Support channel.</LI>
      </UL>

      <H2 id="if-scammed">What to do if you&rsquo;ve been scammed</H2>
      <P>
        If you&rsquo;ve already shared sensitive information or transferred money, act within the first
        hour — that&rsquo;s the window where banks can sometimes freeze a transaction:
      </P>
      <OL>
        <LI><Strong>Call your bank immediately</Strong> on their official customer-care number (printed on your card or website). Ask them to freeze your account and reverse recent transactions.</LI>
        <LI><Strong>Call the Cyber Crime Helpline: 1930.</Strong> This 24-hour government helpline is specifically for financial cyber fraud. The earlier you call, the higher the chance of recovering funds.</LI>
        <LI><Strong>File a complaint at cybercrime.gov.in.</Strong> The National Cyber Crime Reporting Portal lets you file online. Keep screenshots of the WhatsApp conversation as evidence.</LI>
        <LI><Strong>Change all passwords immediately.</Strong> If you shared credentials or an OTP was used, change your banking PIN, UPI PIN, email password, and anything using the same credentials.</LI>
        <LI><Strong>Block and report the number on WhatsApp.</Strong> Open the chat, tap the number, then Report and Block — this helps WhatsApp shut the scammer down faster.</LI>
      </OL>

      <BlogFigure
        src="/blog/whatsapp-sandal-fig3.png"
        width={1976}
        height={1368}
        alt="A first-hour action checklist after a WhatsApp scam: call your bank, call helpline 1930, file at cybercrime.gov.in, change passwords, and block and report the number."
        caption="What to do in the first hour after a scam."
      />
      <Blockquote cite="Indian Cyber Crime Coordination Centre (I4C)">
        The key vulnerability in WhatsApp fraud is not technology — it&rsquo;s urgency. Slow down,
        verify, and never share an OTP with anyone.
      </Blockquote>

      <H2 id="faq">Frequently asked questions</H2>
      <H3>Can a scammer access my phone just by sending a WhatsApp message?</H3>
      <P>
        Not from a text message alone. The danger comes when you click a malicious link (which can
        install malware or open a phishing page) or voluntarily install an app or APK the scammer
        recommends. Don&rsquo;t click links from unknown numbers and never install apps on a
        stranger&rsquo;s say-so.
      </P>
      <H3>Someone added me to a WhatsApp group I didn&rsquo;t join. Is it a scam?</H3>
      <P>
        It may be. Being added without consent — especially to a group promoting investments, jobs, or
        giveaways — is a common scam setup. Leave immediately and don&rsquo;t interact. Prevent it in
        future via WhatsApp Settings → Privacy → Groups → &ldquo;My Contacts Only&rdquo;.
      </P>
      <H3>I got a WhatsApp message saying I won a lottery. Is it real?</H3>
      <P>
        No. No legitimate lottery notifies winners by WhatsApp from an unknown number. These always ask
        for a &ldquo;processing fee&rdquo; or personal details to &ldquo;release&rdquo; the winnings.
        Block and report.
      </P>
      <H3>Is a &ldquo;digital arrest&rdquo; real?</H3>
      <P>
        No. There is no legal concept of digital arrest in India. No police, CBI, or tax officer will
        arrest, interrogate, or collect a fine over a WhatsApp video call. Disconnect and report it on
        1930.
      </P>
      <H3>Can I get my money back after a WhatsApp scam?</H3>
      <P>
        Possibly, if you act fast. Banks have fraud teams that can sometimes freeze a receiving account
        before the money moves, and the 1930 helpline has recovered funds for people who called within
        the first hour. The longer you wait, the lower the odds — fraudsters move money through multiple
        accounts within minutes.
      </P>

      <Callout variant="tip" title="One rule prevents most scams">
        Pause before acting. Every WhatsApp scam works by creating urgency. A real emergency from your
        bank or family can always wait five minutes while you verify through an official channel. A
        scam cannot afford those five minutes.
      </Callout>
    </>
  )
}
