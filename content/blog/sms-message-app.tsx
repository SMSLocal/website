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
    q: "What is an SMS message app?",
    a: (
      <>
        An SMS message app is the software on your phone or computer that sends and receives
        text messages over your carrier&apos;s network — Short Message Service, delivered
        through the telecom signalling layer rather than the internet. Every smartphone ships
        with a default one (Google Messages on most Android phones, Messages on iPhone), and
        several third-party apps and desktop tools can access the same SMS inbox.
      </>
    ),
  },
  {
    q: "Which SMS message app should I use?",
    a: (
      <>
        Stick with your phone&apos;s default app unless you have a specific reason to switch:
        Google Messages on Android, Messages (iMessage) on iPhone. Both are free, ad-free, and
        already set up. For a full ranked comparison of Android alternatives —
        Textra, QKSMS, Pulse SMS, and more — see our{" "}
        <A href="/blog/best-sms-apps-for-android/">best SMS apps for Android guide</A>.
      </>
    ),
  },
  {
    q: "Is there an SMS message app for PC?",
    a: (
      <>
        Yes. Android users can mirror their SMS inbox to any browser with Google Messages for
        web, or use Windows&apos; built-in Phone Link. iPhone users get SMS and iMessage
        natively in the Messages app on Mac. See our full{" "}
        <A href="/blog/receive-sms-messages-on-your-computer/">
          guide to receiving SMS on a computer
        </A>{" "}
        for every platform combination.
      </>
    ),
  },
  {
    q: "Can an SMS message app send OTPs and business messages?",
    a: (
      <>
        Personal SMS apps can only receive OTPs — they display whatever your SIM receives, they
        cannot send bulk or transactional SMS. Sending OTPs, alerts, or campaigns to customers in
        India requires a DLT-registered business platform with an approved sender ID, not a
        personal messaging app. See <A href="/products/otp-sms/">OTP SMS</A> and{" "}
        <A href="/products/quick-sms/">Quick SMS</A> for the business side.
      </>
    ),
  },
  {
    q: "Does the SMS message app matter for message delivery?",
    a: (
      <>
        No. Delivery depends on your carrier network and the sender&apos;s route, not which app
        displays the message. Any SMS app on your phone shows the same messages your SIM
        receives — switching apps changes the interface, not whether messages arrive.
      </>
    ),
  },
  {
    q: "What is the difference between an SMS app and a chat app like WhatsApp?",
    a: (
      <>
        An SMS app sends over the telecom network using your phone number and works without an
        internet connection. WhatsApp and similar chat apps send over the internet and only work
        between users of the same app. SMS reaches any phone number, including feature phones;
        WhatsApp only reaches other WhatsApp accounts.
      </>
    ),
  },
]

export default function SmsMessageAppPost() {
  return (
    <>
      <Lead>
        An SMS message app is simply the software that sends and receives text messages on your
        device — Google Messages on most Android phones, Messages on iPhone, and a handful of
        third-party and desktop options in between. This guide covers what an SMS app actually
        does, the default app on every major platform, what to look for if you want to switch,
        and where business SMS apps fit in.
      </Lead>

      <H2 id="what-is-an-sms-app">What an SMS message app actually does</H2>
      <P>
        An SMS message app is the interface layer between you and your carrier&apos;s SMS
        network. When someone texts your number, the message travels over your operator&apos;s
        signalling channel (not the internet) and lands in whichever app is set as your
        phone&apos;s default SMS handler. That app displays the thread, lets you reply, and — on
        most modern apps — adds extras like spam filtering, scheduling, and read receipts when
        the recipient also supports RCS.
      </P>
      <P>
        Every phone ships with a default SMS app already installed and working. You only need a
        different one if you want a feature the default lacks — heavier customisation, a
        privacy-first open-source option, or multi-device sync.
      </P>

      <H2 id="default-apps-by-platform">The default SMS app on every platform</H2>
      <FigureTable
        columns={["Platform", "Default SMS app", "Notes"]}
        rows={[
          ["Android (most brands)", "Google Messages", "Pre-installed on Pixel, OnePlus, Xiaomi, Realme, Motorola"],
          ["Samsung Galaxy", "Samsung Messages", "Ships instead of Google Messages, integrates with Samsung Flow"],
          ["iPhone", "Messages (iMessage + SMS)", "Sends iMessage over data to other Apple devices, falls back to SMS otherwise"],
          ["Windows PC", "Phone Link", "Mirrors an Android or iPhone's SMS inbox to a Windows app"],
          ["Mac", "Messages", "Native iMessage/SMS sync for users signed into the same Apple ID as their iPhone"],
        ]}
        caption="Every platform has a working default — you rarely need to install anything extra just to send and receive SMS."
      />

      <H3>Android</H3>
      <P>
        Google Messages is the default on the large majority of Android phones sold in India. It
        uses your SIM&apos;s bundled SMS quota, supports RCS on Jio and Airtel for read receipts
        and richer media, and includes a built-in spam filter. Samsung is the main exception —
        Galaxy devices ship Samsung Messages instead, which trades RCS for tighter integration
        with the rest of the Samsung ecosystem.
      </P>
      <P>
        For a full ranked breakdown of Android SMS apps — including customisation-focused Textra,
        open-source QKSMS, and multi-device Pulse SMS — see{" "}
        <A href="/blog/best-sms-apps-for-android/">best SMS apps for Android</A>.
      </P>

      <H3>iPhone</H3>
      <P>
        Apple&apos;s Messages app handles both iMessage (Apple-to-Apple, over data or Wi-Fi) and
        standard SMS (to any number, over the carrier network) in a single thread, distinguished
        by blue versus green bubbles. There is no meaningful reason to replace it — third-party
        SMS apps for iPhone are limited by Apple&apos;s platform restrictions and cannot become
        the system default the way they can on Android.
      </P>

      <BlogFigure
        src="/blog/operator-web-portals-free-sms-browser.webp"
        alt="Smartphone and laptop side by side showing an SMS conversation synced between a phone's default messaging app and a browser tab."
        caption="Most default SMS apps today also offer a companion way to read and reply from a computer — no separate app required."
      />

      <H3>Desktop and PC access</H3>
      <P>
        You do not need a dedicated PC-only SMS app to text from a computer — every major
        default app now has an official companion:
      </P>
      <UL>
        <LI>
          <Strong>Windows:</Strong> Phone Link mirrors an Android phone&apos;s SMS (and, with
          limits, an iPhone&apos;s) directly into a Windows app.
        </LI>
        <LI>
          <Strong>Any browser:</Strong> Google Messages for web (messages.google.com) mirrors an
          Android phone&apos;s SMS inbox with just a QR code scan.
        </LI>
        <LI>
          <Strong>Mac:</Strong> Messages syncs natively for anyone signed into the same Apple ID
          across an iPhone and a Mac.
        </LI>
      </UL>
      <P>
        For the complete platform-by-platform walkthrough, including Samsung Flow and
        third-party sync apps, see{" "}
        <A href="/blog/receive-sms-messages-on-your-computer/">
          how to receive SMS messages on your computer
        </A>
        .
      </P>

      <BlogFigure
        src="/blog/phone-link-sms-on-windows-pc.webp"
        alt="An Android phone paired to a Windows PC with SMS conversation threads mirrored on the computer screen via Phone Link."
        caption="Phone Link shows full SMS threads on Windows and lets you reply from the PC — the message still sends from your phone's SIM."
      />

      <Callout variant="tip" title="Switching your default SMS app">
        On Android: Settings → Apps → Default apps → SMS app. Only the current default can send
        messages — other installed apps can only read existing threads. All your SMS stays on
        the device itself, not inside any one app, so switching never loses message history.
      </Callout>

      <H2 id="choosing-the-right-one">When to look beyond the default app</H2>
      <P>
        The default app on your phone already covers the core job — sending, receiving, and
        reading text messages — for free. Consider a third-party SMS app only if you specifically
        want:
      </P>
      <UL>
        <LI>Heavy visual customisation (themes, fonts, per-contact settings)</LI>
        <LI>A fully open-source, ad-free, no-account option</LI>
        <LI>Real-time sync across more than two devices at once</LI>
        <LI>Popup-reply or hidden-inbox privacy features</LI>
      </UL>
      <P>
        None of these change whether or how fast messages are delivered — that is entirely
        determined by your carrier network, not the app.
      </P>

      <H2 id="business-messaging-apps">SMS message apps vs. business SMS platforms</H2>
      <P>
        Personal SMS apps and business SMS platforms solve different problems. A personal app
        reads and sends messages tied to one phone&apos;s SIM card. A business platform sends
        OTPs, delivery alerts, and campaigns to thousands of numbers at once, from a registered
        sender ID, with delivery receipts and compliance built in — none of which a personal app
        can do.
      </P>
      <FigureTable
        columns={["", "Personal SMS app", "Business SMS platform"]}
        rows={[
          ["Sends from", "Your personal phone number", "A registered DLT sender ID"],
          ["Volume", "One-to-one, low volume", "Thousands to millions per send"],
          ["Delivery receipts", "No", "Per-message, via API or dashboard"],
          ["DLT / DND compliance", "Not applicable", "Required and built in"],
          ["Typical use", "Personal texting", "OTPs, alerts, marketing campaigns"],
        ]}
      />
      <P>
        In India, sending bulk or transactional SMS without DLT registration is not just against
        best practice — operators will silently drop the messages at the gateway. See{" "}
        <A href="/blog/send-sms-online/">how to send SMS online in India</A> for the compliant
        options.
      </P>

      <BlogInlineCta
        title="Need to send SMS to customers, not just contacts?"
        body="SMSLocal is a DLT-compliant SMS platform for OTPs, alerts, and campaigns — registered sender ID, delivery receipts, and an API or no-code dashboard."
        primary={{ label: "Start free — ₹60 credit", href: "/signup/" }}
      />

      <H2 id="faq">Frequently asked questions</H2>
      <BlogFaq items={FAQ_ITEMS} />
    </>
  )
}
