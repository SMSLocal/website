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
      relatedSlugs: ["dnd-services", "send-sms-online"],
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
      coverImage: "/blog/receive-sms-online-india-cover.svg",
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
      relatedSlugs: ["dnd-means", "send-sms-online"],
    },
    Component: ReceiveSmsOnlineIndiaPost,
  },

  "sms-activation": {
    meta: {
      slug: "sms-activation",
      title: "SMS Not Working? Activation & Fix Guide for India",
      description:
        "Can't send or receive SMS? Walk through every check — SMSC numbers for Indian carriers, iMessage gotchas, DND filters, and when to escalate to your carrier.",
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
      coverImage: "/blog/send-sms-online-cover.svg",
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
      relatedSlugs: ["dlt-registration-guide", "dnd-services"],
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
    },
    Component: WhatIsSmsPost,
  },

  "free-sms": {
    meta: {
      slug: "free-sms",
      title: "Free SMS in India: What Actually Works in 2026",
      description:
        "Free SMS in India compared — operator bundled SMS, online services, and platform trial credits. Why Way2SMS shut down and what replaced it in 2026.",
      date: "2026-07-09",
      readingTime: "8 min read",
      category: "Consumer",
      author: TEAM,
      coverImage: "/blog/how-to-send-free-sms-in-india-hero.webp",
      coverAlt:
        "Abstract illustration representing how to send free SMS in India — mobile phone with message bubbles showing free text messaging options in 2026.",
      toc: [
        { id: "what-free-sms-means", label: "What 'free SMS' actually means" },
        { id: "bundled-sms", label: "Free SMS from your mobile plan" },
        { id: "online-free-sms", label: "Online free SMS services" },
        { id: "ways2sms-alternatives", label: "Way2SMS and its successors" },
        { id: "free-trial-platforms", label: "Free trial credits from SMS platforms" },
        { id: "when-free-isnt-enough", label: "When free SMS isn't the right answer" },
        { id: "faq", label: "FAQ" },
      ],
      relatedSlugs: ["best-sms-apps-for-android", "sms-vs-mms", "best-free-sms"],
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
      relatedSlugs: ["best-free-sms", "sms-activation", "send-sms-online"],
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
