import type { ComponentType } from "react"
import BestFreeSmsPost from "@/content/blog/best-free-sms"
import BestSmsAppsForAndroidPost from "@/content/blog/best-sms-apps-for-android"
import SmsVsMmsPost from "@/content/blog/sms-vs-mms"
import BulkWhatsappMessagingPost from "@/content/blog/bulk-whatsapp-messaging"
import DltRegistrationGuide from "@/content/blog/dlt-registration-guide"
import DndMeansPost from "@/content/blog/dnd-means"
import DndServicesPost from "@/content/blog/dnd-services"
import FreeSmsPost from "@/content/blog/free-sms"
import GmailPasswordRecoveryPost from "@/content/blog/gmail-password-recovery-via-sms"
import ReceiveSmsOnlineIndiaPost from "@/content/blog/receive-sms-online-india"
import ReceiveSmsMessagesOnYourComputerPost from "@/content/blog/receive-sms-messages-on-your-computer"
import AwsSmsPost from "@/content/blog/aws-sms"
import SmsActivationPost from "@/content/blog/sms-activation"
import SendSmsOnlinePost from "@/content/blog/send-sms-online"
import TelegramCodeSmsPost from "@/content/blog/telegram-code-sms"
import WhatIsSmsPost from "@/content/blog/what-is-sms"
import WhatsappMarketingIndiaPost from "@/content/blog/whatsapp-marketing-india"
import WhatsappScamsIndiaPost from "@/content/blog/whatsapp-scams-india"

export type BlogAuthor = {
  name: string
  role: string
}

export type BlogTocItem = {
  id: string
  label: string
}

export type BlogMeta = {
  slug: string
  title: string
  description: string
  date: string // ISO 8601
  updatedDate?: string // ISO 8601
  readingTime: string
  category: string
  author: BlogAuthor
  /**
   * Path to a real editorial image (JPG). When set, BlogCard and the
   * article hero render this image instead of the fallback gradient
   * panel. Leave undefined only for draft posts before art is ready.
   */
  coverImage?: string
  /** Alt text for the cover image + aria-label for the gradient fallback. */
  coverAlt: string
  toc: BlogTocItem[]
  relatedSlugs?: string[]
  /** FAQ items for FAQPage JSON-LD rich results. */
  faqItems?: { q: string; a: string }[]
}

export type BlogPost = {
  meta: BlogMeta
  Component: ComponentType
}

const TEAM: BlogAuthor = {
  name: "SMSLocal Team",
  role: "Product, compliance & engineering",
}

export const POSTS_BY_SLUG: Record<string, BlogPost> = {
  "dlt-registration-guide": {
    meta: {
      slug: "dlt-registration-guide",
      title: "DLT Registration Guide for Indian Businesses 2026",
      description:
        "Every step, every document, every rejection reason — from Principal Entity signup to first SMS. Based on 7 years onboarding Indian businesses onto DLT.",
      date: "2026-04-15",
      updatedDate: "2026-04-22",
      readingTime: "14 min read",
      category: "Compliance",
      author: TEAM,
      coverImage: "/blog/dlt-registration-guide-for-indian-businesses-2026-hero.webp",
      coverAlt:
        "Overhead still life of a neat stack of cream paper documents, a closed fountain pen, a small brass stamp, folded reading glasses, and a green leaf sprig on a wooden desk.",
      toc: [
        { id: "why-dlt-exists", label: "Why DLT exists" },
        { id: "who-needs-it", label: "Who actually needs DLT" },
        { id: "the-four-things", label: "The four things you'll register" },
        { id: "principal-entity", label: "Step 1: Principal Entity" },
        { id: "header", label: "Step 2: Header (sender ID)" },
        { id: "template", label: "Step 3: Content Template" },
        { id: "consent", label: "Step 4: Consent capture" },
        { id: "pick-platform", label: "Picking your DLT platform" },
        { id: "rejections", label: "Common rejection reasons" },
        { id: "timelines", label: "Realistic timelines" },
        { id: "after-approval", label: "After approval: Day 1 sends" },
        { id: "ongoing", label: "Ongoing obligations" },
        { id: "faq", label: "FAQ" },
      ],
      relatedSlugs: ["dnd-services", "send-sms-online", "aws-sms"],
      faqItems: [
        { q: "Can I start sending SMS while waiting for DLT approval?", a: "No. Any send before PE, Header, and Template approval will be rejected at the gateway. Approval typically takes 3–5 business days." },
        { q: "Do I need a separate PE registration for a subsidiary?", a: "Yes. Each legal entity with a separate Certificate of Incorporation registers its own Principal Entity. You can share an Aggregator Relationship, but the entity records stay separate." },
        { q: "What if we change our company name after DLT approval?", a: "Submit an amendment on the DLT portal with the updated Certificate of Incorporation. Your existing Headers continue working during the amendment review." },
        { q: "Can international companies register as Principal Entity on DLT?", a: "Typically no — you need an Indian legal entity such as a subsidiary, branch office, or LLP. Some operators allow foreign entity registration with additional paperwork, but most find it simpler to incorporate locally." },
        { q: "How do I handle multiple brands under one company on DLT?", a: "Register one Principal Entity and register a separate Header for each brand. Templates are filed per Header, so you can maintain separate brand voices and content libraries." },
      ],
    },
    Component: DltRegistrationGuide,
  },

  "dnd-means": {
    meta: {
      slug: "dnd-means",
      title: "DND Meaning: What It Is and How to Activate It",
      description:
        "India's Do Not Disturb guide — how to activate DND on Jio, Airtel, Vi and BSNL, what it blocks, and what to do when promotional SMS still slip through.",
      date: "2026-03-28",
      readingTime: "9 min read",
      category: "Consumer",
      author: TEAM,
      coverImage: "/blog/dnd-meaning-what-it-is-and-how-to-activate-it-hero.webp",
      coverAlt:
        "Smartphone lying face-down on a warm linen tablecloth beside a ceramic coffee cup with rising steam, reading glasses, and a small vase with a single white flower in soft morning light.",
      toc: [
        { id: "what-dnd-is", label: "What DND actually is" },
        { id: "what-dnd-blocks", label: "What DND blocks and doesn't block" },
        { id: "why-it-exists", label: "Why DND exists" },
        { id: "how-to-activate", label: "How to activate DND on your number" },
        { id: "still-getting-spam", label: "Still getting promotional SMS?" },
        { id: "limitations", label: "Limitations and edge cases" },
        { id: "faq", label: "FAQ" },
      ],
      relatedSlugs: ["dnd-services", "receive-sms-online-india"],
      faqItems: [
        { q: "Does DND block WhatsApp messages?", a: "No. WhatsApp runs over the internet, not the telecom SMS layer, so TRAI's DND rules do not apply. WhatsApp has its own report and block mechanism inside the app." },
        { q: "Does DND stop OTPs from arriving?", a: "No. OTPs are service-explicit transactional messages and are exempt from DND. If your OTPs have stopped arriving, DND is almost never the cause — check network delays or sender-side issues instead." },
        { q: "How long does DND take to activate in India?", a: "Up to 7 days officially. In practice, most compliant senders update their scrub lists every 24 hours, so you will notice a drop in promotional SMS by the next day." },
        { q: "Does DND registration expire?", a: "No. Once activated, DND stays on until you explicitly de-activate it by sending STOP to 1909 or toggling it off in your operator app." },
        { q: "If I change operators via MNP, does my DND preference carry over?", a: "Yes. Your DND preference is tied to your phone number, not your operator. When you port, the new operator inherits the same DND setting within 48 hours." },
      ],
    },
    Component: DndMeansPost,
  },

  "dnd-services": {
    meta: {
      slug: "dnd-services",
      title: "DND Services for SMS Senders: Compliance Guide",
      description:
        "A practical guide to DND for SMS senders in India — NCPR scrubbing, send windows, consent rules, and the violations that get your sender ID suspended.",
      date: "2026-03-30",
      readingTime: "11 min read",
      category: "Compliance",
      author: TEAM,
      coverImage: "/blog/dnd-services-for-sms-senders-compliance-guide-hero.webp",
      coverAlt:
        "Portrait of a focused Indian woman compliance analyst in professional attire, seated thoughtfully at a modern office desk with a blurred leafy plant and warm lamp glow behind her.",
      toc: [
        { id: "what-it-means-for-senders", label: "What DND means for senders" },
        { id: "how-scrubbing-works", label: "How scrubbing actually works" },
        {
          id: "promotional-vs-transactional",
          label: "Promotional vs. transactional",
        },
        { id: "how-to-check", label: "How to check if a number is on DND" },
        { id: "send-windows", label: "Send windows" },
        { id: "consent", label: "Consent" },
        { id: "penalties", label: "Penalties" },
        { id: "practical-playbook", label: "Practical playbook" },
        { id: "faq", label: "FAQ" },
      ],
      relatedSlugs: ["dlt-registration-guide", "dnd-means"],
      faqItems: [
        { q: "Do I need to scrub NCPR for transactional SMS?", a: "No. DND does not apply to transactional or service-explicit senders. OTPs, payment receipts, and delivery updates reach every number regardless of DND status." },
        { q: "How often should I scrub my SMS list against NCPR?", a: "Before every send. NCPR updates daily, and a number that was clean yesterday might be on DND today. A compliant SMS platform like SMSLocal scrubs on every submission automatically." },
        { q: "Can I use the service-implicit category to reach DND numbers with soft marketing?", a: "No. Service-implicit is for genuine service follow-ups such as policy updates and expiry reminders for existing customers — not disguised marketing. Operators review templates and categorise based on actual content." },
        { q: "What if a user gave consent and then activated DND?", a: "DND overrides individual consent for promotional SMS. If a number is on DND, you cannot send marketing to it even if the user opted in last month. Transactional messages still reach them." },
        { q: "Do WhatsApp Business messages fall under DND rules?", a: "No. WhatsApp is an over-the-top service, not telecom. It has its own rules — opt-in, business verification, 24-hour session window — administered by Meta, not TRAI." },
      ],
    },
    Component: DndServicesPost,
  },

  "receive-sms-online-india": {
    meta: {
      slug: "receive-sms-online-india",
      title: "Receive SMS Online India: Risks & Alternatives",
      description:
        "When receive-SMS-online services in India are a valid privacy tool, when they're fraud, and what senders can do to block them from abusing OTP flows.",
      date: "2026-03-14",
      readingTime: "10 min read",
      category: "Consumer",
      author: TEAM,
      coverImage: "/blog/receive-sms-online-india-hero.webp",
      coverAlt:
        "Dimly lit modern desk at night with a closed laptop, a face-down smartphone, and a small lamp casting a single warm amber pool of light onto a blank leather notebook.",
      toc: [
        { id: "how-it-works", label: "How receive-SMS-online works" },
        { id: "legit-uses", label: "Legitimate use cases" },
        { id: "not-legit", label: "When it's not OK" },
        { id: "tradeoffs", label: "Practical tradeoffs" },
        { id: "what-to-look-for", label: "What to look for" },
        { id: "better-alternatives", label: "Better alternatives" },
        { id: "if-youre-a-business", label: "Blocking them as a business" },
        { id: "faq", label: "FAQ" },
      ],
      relatedSlugs: ["receive-sms-messages-on-your-computer", "dnd-means", "send-sms-online"],
      faqItems: [
        { q: "Is using a receive-SMS-online service illegal in India?", a: "The service itself is not illegal, but using it to impersonate someone, commit fraud, or violate a service's terms of use is. For personal-privacy uses on services that do not prohibit it, you are within the law." },
        { q: "Can I use a receive-SMS number for Aadhaar OTP?", a: "No. Aadhaar OTP is tied to the mobile number linked to your Aadhaar record. Using any other number is fraud and a criminal offence under Indian law." },
        { q: "Why do some services still let me sign up with a shared receive-SMS number?", a: "Because detection is imperfect. Many services do not invest heavily in number-reputation checks, especially smaller apps. That does not mean they approve — they will ban the account later if they find out." },
        { q: "Are there privacy-safe paid alternatives to public receive-SMS services?", a: "Yes. JIO Number, Vi eSIM secondary lines, and iPlum all give you a real, private-to-you Indian number that does not violate app terms and is far safer than a shared public inbox." },
      ],
    },
    Component: ReceiveSmsOnlineIndiaPost,
  },

  "receive-sms-messages-on-your-computer": {
    meta: {
      slug: "receive-sms-messages-on-your-computer",
      title: "How to Receive SMS Messages on Your Computer (2026)",
      description:
        "Every way to receive your own SMS on a Windows PC, Mac, or Linux machine using your real number — Phone Link, Google Messages for web, Samsung Flow, iPhone forwarding, and business options.",
      date: "2026-07-16",
      readingTime: "9 min read",
      category: "Getting started",
      author: TEAM,
      coverImage: "/blog/receive-sms-messages-on-your-computer-hero.webp",
      coverAlt:
        "Illustration of SMS messages appearing on a computer screen next to a smartphone, showing a phone-to-PC message mirroring setup.",
      toc: [
        { id: "quick-pick", label: "Quick pick by platform" },
        { id: "windows-phone-link", label: "Windows — Phone Link" },
        { id: "google-messages-web", label: "Google Messages for web" },
        { id: "samsung-flow", label: "Samsung Flow" },
        { id: "iphone-mac", label: "iPhone — Mac forwarding" },
        { id: "third-party-apps", label: "Third-party apps" },
        { id: "business-use", label: "No phone at all (business)" },
        { id: "troubleshooting", label: "Troubleshooting" },
        { id: "faq", label: "FAQ" },
      ],
      relatedSlugs: ["receive-sms-online-india", "best-sms-apps-for-android", "send-sms-online"],
      faqItems: [
        { q: "Can I receive SMS on my computer without my phone nearby?", a: "With Bluetooth-paired tools like Phone Link, no — your phone needs to be reasonably close and online. Browser-based tools like Google Messages for web and cloud-relay apps like Pulse SMS work as long as your phone has an internet connection, wherever it is." },
        { q: "Is it free to receive SMS on a PC?", a: "Yes, for personal use. Phone Link, Google Messages for web, Samsung Flow, and Apple's Text Message Forwarding are all free and official. Third-party apps like Pulse SMS and AirDroid have free tiers with paid upgrades for unlimited multi-device sync." },
        { q: "Does this use my real phone number?", a: "Yes — every method mirrors your existing SIM's SMS onto a computer. Replies sent from the computer still go out from your real number. This is different from a receive-SMS-online service, which gives you a separate, often shared, number." },
        { q: "What's the best option if I have an iPhone and a Windows PC?", a: "There is no official Apple-to-Windows path. Pulse SMS is the most reliable third-party option — it works on iOS (receive-only) and syncs to a Windows app or browser tab." },
        { q: "How does a business receive SMS on a computer without any phone?", a: "By using a dedicated business SMS platform with a virtual or DID number, like SMSLocal. Incoming SMS lands directly in a web dashboard and can be piped to your own systems via API — no phone or SIM required, and it scales to a whole team." },
      ],
    },
    Component: ReceiveSmsMessagesOnYourComputerPost,
  },

  "aws-sms": {
    meta: {
      slug: "aws-sms",
      title: "AWS SMS: Send SMS With Amazon SNS & Pinpoint (2026)",
      description:
        "How to send SMS on AWS with Amazon SNS and AWS End User Messaging (Pinpoint) — the two services compared, India DLT and sender-ID setup, the sandbox, pricing, and when a dedicated provider is faster.",
      date: "2026-07-17",
      readingTime: "10 min read",
      category: "Getting started",
      author: TEAM,
      coverImage: "/blog/aws-sms-hero.webp",
      coverAlt:
        "Illustration of sending SMS on AWS — an Amazon SNS publish call delivering a text message to a phone, with a dark navy and cyan interface.",
      toc: [
        { id: "two-ways", label: "The two ways AWS sends SMS" },
        { id: "amazon-sns", label: "Amazon SNS" },
        { id: "end-user-messaging", label: "AWS End User Messaging" },
        { id: "india-dlt", label: "Sending SMS in India: DLT" },
        { id: "sandbox-limits", label: "Sandbox & spend limits" },
        { id: "pricing", label: "AWS SMS pricing" },
        { id: "setup-checklist", label: "Setup checklist" },
        { id: "aws-vs-provider", label: "AWS vs a dedicated provider" },
        { id: "faq", label: "FAQ" },
      ],
      relatedSlugs: ["send-sms-online", "dlt-registration-guide", "receive-sms-messages-on-your-computer"],
      faqItems: [
        { q: "What is the difference between Amazon SNS and AWS End User Messaging?", a: "Amazon SNS sends simple one-way SMS with a single Publish call — ideal for OTPs and alerts. AWS End User Messaging (formerly Amazon Pinpoint SMS) adds two-way messaging, dedicated sender IDs and numbers, opt-out handling, and per-message events for campaigns and conversational use. Use SNS for transactional; End User Messaging for everything richer." },
        { q: "Can I send SMS to Indian numbers with AWS?", a: "Yes, but you must be DLT-registered. You supply your DLT Entity ID and Template ID on every message and send from a sender ID that maps to an approved template. Without a byte-exact template match, the operator drops the message even though AWS reports it as sent." },
        { q: "Why are my AWS SMS not being delivered?", a: "The three usual causes: your account is still in the SMS sandbox (only verified numbers receive), you hit the default monthly spend limit, or in India the message does not match an approved DLT template. Check the delivery-status logs and configuration-set events to see which." },
        { q: "How much does AWS SMS cost?", a: "It is pay-as-you-go per message, priced by destination country and, in India, by carrier and message type, plus any operator or DLT fees. Two-way messages and dedicated numbers are billed separately. Always check AWS's current India rate card for exact figures." },
        { q: "Do I still need DLT registration if I use AWS?", a: "Yes. DLT registration is a TRAI requirement on the sender, independent of which platform you send through. AWS enforces it for Indian traffic — it does not replace it. A provider like SMSLocal can complete DLT onboarding on your behalf." },
        { q: "Is AWS SMS good for sending OTPs?", a: "For AWS-native apps, yes — Amazon SNS transactional SMS is a common OTP path. Just budget for the sandbox exit, the spend-limit increase, and (in India) DLT template registration before you rely on it in production." },
      ],
    },
    Component: AwsSmsPost,
  },

  "sms-activation": {
    meta: {
      slug: "sms-activation",
      title: "SMS Not Working? Activate & Fix It Fast (India)",
      description:
        "SMS not sending or receiving in India? Fix it fast — SMSC settings for Jio, Airtel, Vi & BSNL, iMessage traps, DND filters, and exactly when to call your carrier.",
      date: "2026-02-22",
      readingTime: "10 min read",
      category: "Troubleshooting",
      author: TEAM,
      coverImage: "/blog/sms-not-working-activation-troubleshooting-guide-hero.webp",
      coverAlt:
        "Hands holding a smartphone face-down on a wooden desk beside an open empty dual-SIM tray, a single nano-SIM card, and a small metal ejector pin in warm window light.",
      toc: [
        { id: "quick-fix", label: "The 30-second fix" },
        { id: "device-level", label: "Device-level checks" },
        { id: "smsc-numbers", label: "Correct SMSC numbers" },
        { id: "carrier-level", label: "Carrier-level issues" },
        { id: "otp-not-arriving", label: "When OTPs aren't arriving" },
        { id: "business-side", label: "If you're the business sending" },
        { id: "faq", label: "FAQ" },
      ],
      relatedSlugs: ["telegram-code-sms", "best-sms-apps-for-android", "gmail-password-recovery-via-sms"],
      faqItems: [
        { q: "My SIM works for calls but not SMS — what's wrong?", a: "The most common cause is a wrong SMSC (Short Message Service Centre) number. On Jio it should be +919076014000, Airtel +919810012611, Vi +919895032001. Go to Settings → SIM → Advanced or Message Centre and verify." },
        { q: "I switched from iPhone to Android — now SMS isn't working. Why?", a: "Your number is still registered with Apple's iMessage network. Go to Settings → Messages → Send & Receive on the old iPhone, deregister the number, or use Apple's online iMessage deregistration tool. This can take up to 45 days to propagate if you no longer have the iPhone." },
        { q: "My SMS is stuck at 'Sending' — is the problem on my side or the carrier's?", a: "Send a test SMS to a second number you control. If it fails there too, restart your phone and toggle Airplane mode on and off to force a network re-registration. If it still fails, it is likely a carrier outage or your SMSC setting." },
        { q: "A software update broke my SMS — what happened?", a: "Major Android updates sometimes reset the default SMS app. Open Settings → Apps → Default apps → SMS app and ensure your preferred app is selected. Also check that the app has SMS Send and Receive permissions." },
        { q: "Can I send SMS from my computer without a separate app?", a: "Yes, if you use Google Messages as your default SMS app on Android, enable Messages for Web at messages.google.com. On an iPhone, iMessage shows in the Messages app on Mac, but standard SMS via computer requires a third-party bridge like AirDroid or Pushbullet." },
      ],
    },
    Component: SmsActivationPost,
  },

  "gmail-password-recovery-via-sms": {
    meta: {
      slug: "gmail-password-recovery-via-sms",
      title: "Gmail Password Recovery via SMS: Security Tips",
      description:
        "Step-by-step guide to Gmail's SMS recovery — setup, why the SMS won't arrive, the account recovery form, and how to protect your phone from SIM-swap attacks.",
      date: "2026-02-08",
      readingTime: "9 min read",
      category: "Security",
      author: TEAM,
      coverImage: "/blog/gmail-password-recovery-via-sms-hero.webp",
      coverAlt:
        "Abstract illustration representing Gmail password recovery via SMS — phone receiving a verification code to regain access to a Google account.",
      toc: [
        { id: "how-it-works", label: "How Gmail SMS recovery works" },
        { id: "setup", label: "Setting up SMS recovery" },
        { id: "recovering", label: "Recovering your password" },
        { id: "not-arriving", label: "Recovery SMS not arriving" },
        {
          id: "account-recovery-form",
          label: "The account recovery form",
        },
        { id: "security-tips", label: "Security tips" },
        { id: "faq", label: "FAQ" },
      ],
      relatedSlugs: ["sms-activation", "telegram-code-sms", "send-sms-online"],
      faqItems: [
        { q: "Why does Google sometimes skip the SMS recovery option even though I set it up?", a: "Google's risk engine decides whether SMS recovery is safe to offer based on the account's login history, location, and device signals. If the request looks suspicious, Google will skip weak factors like SMS and ask for stronger verification." },
        { q: "I changed my number — can I use the old number for recovery?", a: "You can try, but Google sends the code to the number currently registered. If you no longer receive SMS on that number, you must use the Account Recovery form and answer identity questions instead." },
        { q: "Can I use a friend's number to receive the recovery code?", a: "No. The code goes only to the recovery number registered in your account's security settings, which must be your own number. Borrowing someone else's number for recovery is not supported and would be a security violation." },
        { q: "How long is the SMS recovery code valid?", a: "Google's SMS recovery codes expire within a few minutes — typically 10 minutes. If the code does not arrive quickly, wait 60 seconds and request a new one." },
        { q: "Can DND block a Gmail recovery SMS?", a: "Very unlikely. Recovery codes are sent from Google's infrastructure as transactional messages and are generally not scrubbed against DND. If the code isn't arriving, the problem is more likely carrier filtering, wrong number, or network delay." },
      ],
    },
    Component: GmailPasswordRecoveryPost,
  },

  "send-sms-online": {
    meta: {
      slug: "send-sms-online",
      title: "Send SMS Online India: 4 Methods & When to Use",
      description:
        "Web-to-SMS dashboard, SMS API, bulk platform, or WhatsApp Business API — a practical comparison of how to send SMS online in India with the legal requirements.",
      date: "2026-01-18",
      readingTime: "11 min read",
      category: "Getting started",
      author: TEAM,
      coverImage: "/blog/send-sms-online-india-4-methods-when-to-use-hero.webp",
      coverAlt:
        "Portrait of an Indian small-business owner in his mid-30s in a casual smart shirt, seated at a softly lit cafe table with a ceramic coffee cup and a closed leather notebook in front of him.",
      toc: [
        { id: "who-sends-online", label: "Who sends SMS online and why" },
        { id: "ways-to-send", label: "The four ways" },
        { id: "web-to-sms", label: "Web-to-SMS dashboard" },
        { id: "api", label: "SMS API" },
        { id: "bulk", label: "Bulk SMS platform" },
        { id: "whatsapp", label: "WhatsApp Business API" },
        { id: "legal", label: "Legal requirements" },
        { id: "faq", label: "FAQ" },
      ],
      relatedSlugs: ["receive-sms-messages-on-your-computer", "dlt-registration-guide", "aws-sms"],
      faqItems: [
        { q: "Can I send SMS online for free?", a: "Some platforms offer a free signup credit — SMSLocal gives ₹60 to start, enough for a few hundred test messages. Beyond that, expect ₹0.10–0.40 per SMS. Any 'totally free' service for ongoing use is either operating without DLT compliance or monetising your data." },
        { q: "Do I need a separate sender ID account for each brand?", a: "No. One account, one Principal Entity, but you can register multiple Headers (sender IDs) for different brands under the same account." },
        { q: "Can I send SMS from India to international numbers?", a: "Yes, most Indian SMS platforms route international SMS, but pricing and compliance rules vary sharply by destination country. Check your platform's international rate card before sending." },
        { q: "How fast is online SMS delivery in India?", a: "For transactional messages, expect sub-second carrier delivery in normal conditions. For promotional bulk sends, the batch clears within a few minutes to an hour depending on volume and your configured send rate." },
        { q: "What is the difference between an SMS API and an email API?", a: "Same architecture, different channel. SMS APIs dispatch via telecom carriers; email APIs dispatch via SMTP. In India, SMS carries DLT and NCPR requirements that email does not, so SMS onboarding is more paperwork-intensive but delivery rates are significantly higher." },
        { q: "Can I send SMS in Hindi or regional languages?", a: "Yes. All Indian SMS platforms support Unicode (UCS-2) encoding for Devanagari, Tamil, Telugu, Malayalam, Bengali, Gujarati, Kannada, and Odia. The tradeoff is character limit: a Unicode SMS fits only 70 characters per segment versus 160 for GSM-7 ASCII, so longer Hindi messages will span two segments and be billed as two SMS." },
      ],
    },
    Component: SendSmsOnlinePost,
  },

  "whatsapp-marketing-india": {
    meta: {
      slug: "whatsapp-marketing-india",
      title: "WhatsApp Marketing in India: 2026 Strategy Guide",
      description:
        "How to run WhatsApp marketing in India in 2026 — the official API, opt-ins, templates that convert, costs, and the mistakes that get your number banned.",
      date: "2026-05-12",
      readingTime: "12 min read",
      category: "Marketing",
      author: TEAM,
      coverImage: "/blog/whatsapp-marketing-india-cover.webp",
      coverAlt:
        "Warm editorial photo of a small-business owner smiling while replying to customers on a smartphone WhatsApp chat, seated at a sunlit desk with a notebook and a cup of chai.",
      toc: [
        { id: "why-whatsapp-marketing-works", label: "Why WhatsApp marketing works in India" },
        { id: "official-api-vs-unofficial-tools", label: "Official API vs. unofficial tools" },
        { id: "three-types-of-whatsapp-marketing", label: "The three types of WhatsApp marketing" },
        { id: "click-to-whatsapp-ads", label: "Click-to-WhatsApp ads" },
        { id: "how-to-get-started", label: "How to get started" },
        { id: "templates-that-convert", label: "Writing templates that convert" },
        { id: "automation-at-scale", label: "Automation: handling replies at scale" },
        { id: "measuring-success", label: "Measuring success" },
        { id: "mistakes-that-get-banned", label: "Mistakes that get numbers banned" },
        { id: "cost-in-india", label: "Cost in India" },
        { id: "faq", label: "FAQ" },
      ],
      relatedSlugs: ["bulk-whatsapp-messaging", "whatsapp-scams-india"],
      faqItems: [
        { q: "Is WhatsApp marketing legal in India?", a: "Yes, when done through the official WhatsApp Business API with documented opt-in from each recipient. Unsolicited bulk messaging via unofficial tools or automated scripts violates WhatsApp's Terms of Service and can attract TRAI scrutiny if it uses shared numbers for harassment." },
        { q: "Do I need DLT registration for WhatsApp marketing?", a: "No. DLT is TRAI's framework for telecom SMS channels. WhatsApp operates over the internet and is governed by Meta's own policies, not TRAI. You do need WhatsApp Business API access approved by Meta." },
        { q: "What is the difference between WhatsApp Business App and the WhatsApp Business API?", a: "The WhatsApp Business App is a free phone app for very small businesses — it has no broadcast to non-saved contacts and no CRM integration. The WhatsApp Business API is a paid, scalable integration that allows template broadcasts to opted-in contacts at volume, webhooks, and multi-agent support." },
        { q: "Can I use WhatsApp marketing for B2B outreach?", a: "Yes, but only to contacts who have opted in. Cold B2B prospecting on WhatsApp without prior opt-in violates Meta's policies and will get your number flagged quickly, as business recipients are especially likely to report unsolicited messages." },
        { q: "What happens if my WhatsApp Business number gets banned?", a: "Meta suspends the specific WhatsApp number, not your business account. You can appeal via the Business Support Hub. Common causes are high block rates, sending without opt-in, and using unofficial automation tools. Prevention is far easier than appeal." },
      ],
    },
    Component: WhatsappMarketingIndiaPost,
  },

  "bulk-whatsapp-messaging": {
    meta: {
      slug: "bulk-whatsapp-messaging",
      title: "Bulk WhatsApp Messaging: Send at Scale in India",
      description:
        "Send bulk WhatsApp messages in 2026 the official way — API setup, 2026 message tiers, opt-in rules, costs, and how to scale without getting your number banned.",
      date: "2026-05-20",
      readingTime: "12 min read",
      category: "Getting started",
      author: TEAM,
      coverImage: "/blog/bulk-whatsapp-messaging-cover.webp",
      coverAlt:
        "Close-up of a smartphone displaying a WhatsApp broadcast campaign dashboard with delivery and read-rate charts, resting beside a notebook and a cup of chai on a sunlit desk.",
      toc: [
        { id: "what-bulk-whatsapp-messaging-is", label: "What bulk WhatsApp messaging is" },
        { id: "api-vs-app-vs-unofficial-tools", label: "API vs. App vs. unofficial tools" },
        { id: "how-it-works", label: "How it works" },
        { id: "what-kinds-of-messages", label: "What kinds of messages you can send" },
        { id: "messaging-limits-and-tiers", label: "Messaging limits and tiers in 2026" },
        { id: "the-opt-in-requirement", label: "The opt-in requirement" },
        { id: "what-it-costs", label: "What it costs" },
        { id: "what-to-look-for-in-a-platform", label: "What to look for in a platform" },
        { id: "what-happens-when-customers-reply", label: "What happens when customers reply" },
        { id: "faq", label: "FAQ" },
      ],
      relatedSlugs: ["whatsapp-marketing-india", "whatsapp-scams-india"],
      faqItems: [
        { q: "Can I send bulk WhatsApp messages without a business account?", a: "You can use WhatsApp Broadcast in the personal app to send to up to 256 saved contacts. Beyond that, you need the WhatsApp Business API. Unofficial bulk tools that bypass this violate WhatsApp's Terms of Service and risk permanent number ban." },
        { q: "What is the daily messaging limit on WhatsApp Business API?", a: "The limit is based on your tier. Tier 1 allows 1,000 unique recipient conversations per 24 hours, Tier 2 allows 10,000, and Tier 3 allows 100,000. You move up tiers by initiating conversations and maintaining low block rates over time." },
        { q: "Is bulk WhatsApp messaging legal in India?", a: "Yes, through the official Business API with documented opt-in from recipients. WhatsApp is not governed by TRAI's DLT regulations but by Meta's policies. Unsolicited bulk messaging via unofficial tools is a terms violation and may also attract consumer-protection complaints." },
        { q: "What is the difference between bulk WhatsApp and bulk SMS?", a: "Bulk SMS goes over the telecom network and requires TRAI DLT registration; it reaches every number including those without smartphones. Bulk WhatsApp goes over the internet, requires Meta approval and active WhatsApp accounts on recipient devices, but supports richer content and typically sees higher engagement." },
        { q: "How do I avoid getting my WhatsApp number banned when sending at scale?", a: "Maintain a genuine opt-in list, keep block rates below 2%, honour unsubscribe requests immediately, avoid sending identical messages to large groups simultaneously, and use the official API rather than unofficial automation. Meta's systems flag unusual send patterns automatically." },
      ],
    },
    Component: BulkWhatsappMessagingPost,
  },

  "whatsapp-scams-india": {
    meta: {
      slug: "whatsapp-scams-india",
      title: "WhatsApp Scams in India: How to Spot & Stay Safe",
      description:
        "The most common WhatsApp scams in India 2026 — KYC fraud, OTP theft, digital arrest, job & investment scams. How to spot each and what to do if scammed.",
      date: "2026-05-28",
      readingTime: "13 min read",
      category: "Consumer",
      author: TEAM,
      coverImage: "/blog/whatsapp-scams-india-cover.webp",
      coverAlt:
        "Close-up of a smartphone screen displaying a suspicious WhatsApp message with a red warning triangle overlay, resting on a dark wooden desk beside a pair of reading glasses.",
      toc: [
        { id: "why-scammers-target-whatsapp", label: "Why scammers target WhatsApp" },
        { id: "most-common-scams", label: "The most common WhatsApp scams" },
        { id: "warning-signs", label: "Universal warning signs" },
        { id: "protecting-customers", label: "For businesses: protecting customers" },
        { id: "if-scammed", label: "What to do if you've been scammed" },
        { id: "faq", label: "FAQ" },
      ],
      relatedSlugs: ["whatsapp-marketing-india", "dnd-means"],
      faqItems: [
        { q: "Can a scammer access my phone just by sending me a WhatsApp message?", a: "Simply receiving and reading a message cannot give a scammer access to your phone. However, clicking malicious links inside messages can lead to phishing pages or exploit-loaded sites. Never click links from unknown senders." },
        { q: "I was added to an unknown WhatsApp group with strangers — what should I do?", a: "Exit the group immediately, report it as spam inside WhatsApp, and block the admin's number. Do not engage with any content in the group. Adding you without consent is a known precursor to investment and lottery scams." },
        { q: "I received a WhatsApp message saying I won a lottery — is it real?", a: "No lottery or prize is distributed via WhatsApp. These are always scams designed to extract a 'processing fee' or personal documents. Delete the message and block the sender." },
        { q: "What is a 'digital arrest' scam on WhatsApp?", a: "Scammers impersonate CBI, TRAI, or police officers on a video call, claim your number was used in a crime, and 'digitally arrest' you — keeping you on call for hours while demanding money. No Indian law enforcement conducts arrests via WhatsApp. Hang up and call 1930 to report." },
        { q: "I was scammed on WhatsApp — can I get my money back?", a: "File a complaint immediately on cybercrime.gov.in or call 1930 — the National Cyber Crime Helpline. Also report the transaction to your bank to attempt a freeze. Speed is critical: most UPI transactions become unrecoverable within 24–48 hours." },
      ],
    },
    Component: WhatsappScamsIndiaPost,
  },

  "what-is-sms": {
    meta: {
      slug: "what-is-sms",
      title: "What Is SMS? Text Messaging Explained for 2026",
      description:
        "SMS explained: how it works technically, transactional vs promotional, India's DLT and DND rules, and why SMS still beats newer channels for OTPs and alerts.",
      date: "2026-07-09",
      readingTime: "10 min read",
      category: "Getting started",
      author: TEAM,
      coverImage: "/blog/what-is-sms-how-text-messaging-works-and-why-it-still-matters-in-2026-hero.webp",
      coverAlt:
        "Abstract illustration representing SMS text messaging — how Short Message Service works and why it still matters in 2026.",
      toc: [
        { id: "what-is-sms", label: "What SMS actually is" },
        { id: "how-sms-works", label: "How SMS works technically" },
        { id: "types-of-sms", label: "The two types of SMS in India" },
        { id: "sms-vs-whatsapp", label: "SMS vs WhatsApp" },
        { id: "sms-in-india", label: "SMS in India: the regulatory context" },
        { id: "sms-for-business", label: "SMS for business" },
        { id: "sms-character-limits", label: "Character limits and encoding" },
        { id: "faq", label: "FAQ" },
      ],
      relatedSlugs: ["sms-vs-mms", "send-sms-online", "telegram-code-sms"],
      faqItems: [
        { q: "Does SMS work without internet?", a: "Yes. SMS is transmitted over the telecom signalling layer, not the internet. As long as your SIM card has carrier coverage — even on 2G — you can send and receive SMS without any data connection." },
        { q: "What is the difference between SMS and MMS?", a: "SMS (Short Message Service) sends plain text up to 160 characters per segment. MMS (Multimedia Messaging Service) sends images, audio, or video up to 300 KB. MMS was never widely adopted in India because data charges made it expensive and WhatsApp filled the rich-media gap for free." },
        { q: "Can I send SMS from a computer?", a: "Yes. If you use Google Messages on Android, enable Messages for Web. For iPhones on Mac, use Apple Messages which mirrors your iMessage and SMS threads. Businesses use SMS APIs or web-to-SMS dashboards like SMSLocal." },
        { q: "Why is my SMS delayed even though I have full signal?", a: "SMS delay is usually on the carrier side: the SMSC (Short Message Service Centre) queues messages during high-traffic periods. Transactional OTPs from platforms like SMSLocal use a priority route that bypasses standard queuing." },
        { q: "Is SMS encrypted?", a: "Standard SMS is not end-to-end encrypted. Messages travel in plaintext through the carrier's SMSC. RCS (Rich Communication Services) adds encryption on supported devices and carriers, but adoption in India is still limited. For sensitive communication, use Signal or WhatsApp." },
      ],
    },
    Component: WhatIsSmsPost,
  },

  "free-sms": {
    meta: {
      slug: "free-sms",
      title: "Free SMS in India: 3 Real Ways That Work in 2026",
      description:
        "Send free SMS in India in 2026 — bundled operator SMS, free online tools, Way2SMS alternatives and platform trial credits compared. What's safe, capped, and actually works.",
      date: "2026-07-09",
      readingTime: "8 min read",
      category: "Consumer",
      author: TEAM,
      coverImage: "/blog/how-to-send-free-sms-in-india-hero.webp",
      coverAlt:
        "Abstract illustration representing how to send free SMS in India — mobile phone with message bubbles showing free text messaging options in 2026.",
      toc: [
        { id: "which-option", label: "Which option is right for you?" },
        { id: "what-free-sms-means", label: "What 'free SMS' actually means" },
        { id: "bundled-sms", label: "Free SMS from your mobile plan" },
        { id: "online-free-sms", label: "Online free SMS services" },
        { id: "ways2sms-alternatives", label: "Way2SMS and its successors" },
        { id: "free-trial-platforms", label: "Free trial credits from SMS platforms" },
        { id: "when-free-isnt-enough", label: "When free SMS isn't the right answer" },
        { id: "faq", label: "FAQ" },
      ],
      relatedSlugs: ["best-sms-apps-for-android", "sms-vs-mms", "best-free-sms"],
      faqItems: [
        { q: "Are free SMS websites in India safe to use?", a: "Bundled SIM SMS from Jio, Airtel, and Vi is safe — it uses your real number and your operator's infrastructure. Ad-funded web SMS sites carry risks: they may log messages, display intrusive ads, or stop working without notice. For privacy-sensitive messages, use your SIM or a paid platform trial." },
        { q: "Can I send free SMS to DND numbers?", a: "No. DND applies regardless of whether you are using a free or paid service. If the recipient's number is on NCPR, promotional SMS will be blocked. Transactional messages — OTPs, service alerts — still reach DND numbers." },
        { q: "Can I send bulk SMS for free?", a: "Not reliably. Free web SMS sites are designed for one-to-one personal messages and are rate-limited to a few messages per day. For bulk sends, use a platform's free trial credit — SMSLocal offers ₹60 — which covers a few hundred messages at full carrier quality." },
        { q: "Is there a free WhatsApp replacement for SMS?", a: "WhatsApp is free but uses the internet, not SMS. If you want true SMS (telecom network delivery, no internet required on the recipient's device), your mobile plan's bundled SMS is your free option. Jio gives 100 free SMS per day on most prepaid plans." },
        { q: "Is Way2SMS still working in 2026?", a: "Way2SMS as a fully free unlimited service effectively ended as TRAI's DLT regulations made unregistered bulk SMS gateways non-viable. Some apps still carry the Way2SMS brand in a limited or ad-supported form, but there is no equivalent free-for-all service today." },
      ],
    },
    Component: FreeSmsPost,
  },

  "best-free-sms": {
    meta: {
      slug: "best-free-sms",
      title: "Best Free SMS Apps in India for Android & PC 2026",
      description:
        "The best free SMS apps in India 2026 — Google Messages, AirDroid, Pushbullet, operator portals, and free trial credits. Tested on Jio, Airtel, and Vi.",
      date: "2026-07-09",
      readingTime: "10 min read",
      category: "Consumer",
      author: TEAM,
      coverImage: "/blog/best-free-sms-app-in-india-2026-hero.webp",
      coverAlt:
        "Hero illustration for the best free SMS app in India 2026 — comparing Google Messages, AirDroid, operator portals, WhatsApp, and SMSLocal trial credit.",
      toc: [
        { id: "quick-pick", label: "Quick pick by use case" },
        { id: "google-messages", label: "Google Messages (Android)" },
        { id: "airdroid", label: "AirDroid — SMS from PC" },
        { id: "pushbullet", label: "Pushbullet" },
        { id: "operator-web", label: "Operator web portals" },
        { id: "operator-bundled", label: "Bundled SIM SMS" },
        { id: "whatsapp-alternative", label: "WhatsApp as SMS alternative" },
        { id: "ad-funded-sites", label: "Ad-funded web SMS sites" },
        { id: "smslocal-trial", label: "SMSLocal free trial" },
        { id: "comparison", label: "Full comparison table" },
        { id: "faq", label: "FAQ" },
      ],
      relatedSlugs: ["best-sms-apps-for-android", "free-sms", "what-is-sms"],
      faqItems: [
        { q: "What is the best free SMS app in India for Android in 2026?", a: "Google Messages is the best default — it supports RCS on compatible carriers, handles OTPs cleanly, and backs up to Google Drive. Samsung Messages is the better choice on Samsung Galaxy devices because it integrates tightly with Samsung's ecosystem." },
        { q: "Which is the best website to send free SMS from a laptop without installing anything?", a: "Operator portals are the most reliable: MyJio.com and Airtel Thanks web allow limited free SMS from your registered number. Third-party free SMS sites are largely unreliable in 2026 because TRAI DLT requirements have made free unregistered gateways non-viable." },
        { q: "Can I send free SMS from my laptop without installing any software?", a: "Yes, via Google Messages for Web (messages.google.com) if you use an Android phone with Google Messages as default. It mirrors your phone's SMS threads in the browser — no install required." },
        { q: "How can I send SMS without showing my number?", a: "You cannot send anonymous SMS through legitimate Indian carriers — TRAI requires all SMS to have a registered sender. Businesses use named sender IDs like SMSLTD. For personal anonymity use-cases, a secondary SIM or a second eSIM number is the closest legitimate option." },
        { q: "Which free SMS apps have no ads?", a: "Google Messages and QKSMS are completely ad-free and open-source. Textra is ad-free in its paid version (₹180 one-time). Chomp SMS and GO SMS Pro carry ads in their free tiers." },
      ],
    },
    Component: BestFreeSmsPost,
  },

  "sms-vs-mms": {
    meta: {
      slug: "sms-vs-mms",
      title: "SMS vs MMS India: Key Differences & What to Use",
      description:
        "SMS vs MMS in India — technical differences, why MMS never became a business channel, what WhatsApp and RCS replaced it with, and when to use each in 2026.",
      date: "2026-07-10",
      readingTime: "10 min read",
      category: "Getting started",
      author: TEAM,
      coverImage: "/blog/sms-vs-mms-in-india-hero.webp",
      coverAlt:
        "Comparison illustration of SMS versus MMS messaging — showing text-only SMS on one side and multimedia MMS with image on the other, in the context of Indian mobile networks.",
      toc: [
        { id: "what-is-sms", label: "What is SMS?" },
        { id: "what-is-mms", label: "What is MMS?" },
        { id: "key-differences", label: "Key differences" },
        { id: "why-mms-stalled-india", label: "Why MMS stalled in India" },
        { id: "sms-vs-mms-personal", label: "Personal use in India" },
        { id: "sms-vs-mms-business", label: "Business use in India" },
        { id: "what-replaced-mms", label: "What replaced MMS" },
        { id: "when-to-use-which", label: "When to use which" },
        { id: "sms-vs-mms-cost", label: "Pricing in India" },
        { id: "faq", label: "FAQ" },
      ],
      relatedSlugs: ["what-is-sms", "send-sms-online", "dlt-registration-guide"],
      faqItems: [
        { q: "What is the difference between SMS and MMS in India?", a: "SMS sends plain text (up to 160 characters per segment) over the telecom signalling network. MMS sends multimedia — images, audio, short video — up to 300 KB. In India, MMS is rarely used because WhatsApp filled the rich-media gap for free over data." },
        { q: "Does Jio support MMS in India in 2026?", a: "Jio is a VoLTE-only network and does not support traditional MMS over the legacy circuit-switched network. MMS sent to a Jio number from another carrier may not be delivered. Jio users send rich media over WhatsApp or other OTT apps instead." },
        { q: "Why is MMS not working on my phone?", a: "MMS requires mobile data to be active and the correct APN (Access Point Name) configured. Check that mobile data is on, your APN matches your carrier's MMS settings, and that the message size is under 300 KB. On Jio, MMS is effectively unsupported." },
        { q: "Can Indian businesses send MMS to customers?", a: "Technically yes on carriers that support it, but almost no Indian business SMS platform offers MMS campaigns because carrier support is inconsistent. WhatsApp Business API is the standard way to send images and documents to customers at scale." },
        { q: "What are the character limits for SMS vs MMS?", a: "SMS: 160 characters per segment in GSM-7 (English/ASCII), 70 characters per segment in Unicode (Hindi/regional scripts). Multi-part SMS is billed per segment. MMS: no character limit on text, but total payload including media is capped at around 300 KB." },
      ],
    },
    Component: SmsVsMmsPost,
  },

  "best-sms-apps-for-android": {
    meta: {
      slug: "best-sms-apps-for-android",
      title: "Best SMS Apps for Android in India 2026: Tested",
      description:
        "The best Android SMS apps in 2026 compared — Google Messages, Samsung Messages, Textra, QKSMS, Pulse SMS, AirDroid, and Chomp SMS. Tested on Jio, Airtel, and Vi.",
      date: "2026-07-10",
      readingTime: "11 min read",
      category: "Getting started",
      author: TEAM,
      coverImage: "/blog/best-free-sms-app-in-india-2026-hero.webp",
      coverAlt:
        "Illustration of the best SMS apps for Android in India 2026 — Google Messages, Samsung Messages, Textra, QKSMS, Pulse SMS, and AirDroid side by side.",
      toc: [
        { id: "quick-pick", label: "Quick pick by use case" },
        { id: "google-messages", label: "Google Messages" },
        { id: "samsung-messages", label: "Samsung Messages" },
        { id: "textra-sms", label: "Textra SMS" },
        { id: "qksms", label: "QKSMS" },
        { id: "pulse-sms", label: "Pulse SMS" },
        { id: "airdroid", label: "AirDroid" },
        { id: "chomp-sms", label: "Chomp SMS" },
        { id: "business-sms", label: "Business SMS on Android" },
        { id: "comparison", label: "Full comparison table" },
        { id: "faq", label: "FAQ" },
      ],
      relatedSlugs: ["best-free-sms", "receive-sms-messages-on-your-computer", "send-sms-online"],
      faqItems: [
        { q: "What is the best SMS app for Android in India in 2026?", a: "Google Messages is the best default for most users — free, no ads, RCS-capable, and backed up to Google Drive. On Samsung devices, Samsung Messages integrates better with One UI. For customisation and no ads, QKSMS is the open-source alternative." },
        { q: "Can I run two SMS apps on one Android phone at the same time?", a: "You can have multiple SMS apps installed, but only one can be the default SMS app at a time. Changing the default is in Settings → Apps → Default apps → SMS app. Some dual-SIM phones let you assign different apps per SIM, but notifications consolidate in the default app." },
        { q: "Do third-party SMS apps work with Jio and Airtel in India?", a: "Yes. All SMS apps use Android's standard SMS/MMS API, which works with any Indian carrier. The carrier sees the SIM, not the app. RCS (Rich Communication Services) requires the carrier to support it — Jio and Airtel support RCS through Google Messages." },
        { q: "Which Android SMS app has no ads?", a: "Google Messages, Samsung Messages, and QKSMS are completely ad-free. Textra removes ads with a one-time ₹180 purchase. Avoid GO SMS Pro — it historically had aggressive ad behaviour and bloatware." },
        { q: "What is the best SMS app for receiving OTPs reliably?", a: "Google Messages is the most reliable for OTPs because it includes OTP auto-read and one-tap fill. It also hides OTP messages from notifications after a short delay for security. Samsung Messages auto-suggests OTPs in Samsung's own keyboard and apps." },
      ],
    },
    Component: BestSmsAppsForAndroidPost,
  },

  "telegram-code-sms": {
    meta: {
      slug: "telegram-code-sms",
      title: "Telegram SMS Code Not Arriving? Fix It in 2026",
      description:
        "Why Telegram sends codes via SMS, every reason the code might not arrive on Indian numbers (DND, operator blocks, wrong number, iMessage), and the step-by-step fix.",
      date: "2026-07-09",
      readingTime: "9 min read",
      category: "Troubleshooting",
      author: TEAM,
      coverImage: "/blog/telegram-verification-code-not-arriving-hero.webp",
      coverAlt:
        "Abstract illustration representing a Telegram verification code not arriving via SMS — phone screen with a warning indicator and pending OTP code.",
      toc: [
        { id: "how-telegram-verification-works", label: "How Telegram verification works" },
        { id: "not-arriving", label: "Why the SMS code isn't arriving" },
        { id: "step-by-step-fix", label: "Step-by-step fix" },
        { id: "voice-call-alternative", label: "Using the voice call option" },
        { id: "account-recovery", label: "If you've lost access to the number" },
        { id: "security", label: "Security implications" },
        { id: "faq", label: "FAQ" },
      ],
      relatedSlugs: ["sms-activation", "gmail-password-recovery-via-sms", "what-is-sms"],
      faqItems: [
        { q: "How long does the Telegram verification code take to arrive via SMS?", a: "Usually under 30 seconds on Indian carriers. Jio and Airtel typically deliver in under 10 seconds. If it hasn't arrived after 60 seconds, check for DND on your number, toggle Airplane mode to refresh the carrier connection, then request a new code." },
        { q: "Can I receive the Telegram code on a different device?", a: "If you are already logged into Telegram on another device with the same number, Telegram will send the code to that device first — as an in-app message — rather than via SMS. Check your active Telegram session on a tablet or secondary phone." },
        { q: "Can I use a virtual number to receive the Telegram SMS code?", a: "Telegram actively blocks many VOIP and virtual number ranges to prevent automated account creation. A real SIM-based number is far more reliable. Shared receive-SMS-online numbers are almost always blocked by Telegram." },
        { q: "The Telegram code expired — what do I do?", a: "Request a new code using the 'Send Code Again' button. Telegram codes expire after a few minutes. If you are in a poor signal area, move to better coverage before requesting again." },
        { q: "Does Telegram always send the same code format?", a: "No. The code changes with every login attempt and is a one-time value. Do not reuse or share it. If someone asks you to share your Telegram code, it is a social-engineering account-hijack attempt — never share it." },
      ],
    },
    Component: TelegramCodeSmsPost,
  },
}

export const ALL_POSTS: BlogPost[] = Object.values(POSTS_BY_SLUG).sort(
  (a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime(),
)

export function getPost(slug: string): BlogPost | null {
  return POSTS_BY_SLUG[slug] ?? null
}

export function getRelatedPosts(slugs: string[] | undefined): BlogPost[] {
  if (!slugs?.length) return []
  return slugs.map((s) => POSTS_BY_SLUG[s]).filter((p): p is BlogPost => !!p)
}

export function formatBlogDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

// List of all categories that have at least one post. Useful for the blog index filter.
export function getAllCategories(): string[] {
  const set = new Set<string>()
  ALL_POSTS.forEach((p) => set.add(p.meta.category))
  return Array.from(set).sort()
}
