import type { ComponentType } from "react"
import DltRegistrationGuide from "@/content/blog/dlt-registration-guide"
import DndMeansPost from "@/content/blog/dnd-means"
import DndServicesPost from "@/content/blog/dnd-services"
import ReceiveSmsOnlineIndiaPost from "@/content/blog/receive-sms-online-india"
import SmsActivationPost from "@/content/blog/sms-activation"
import GmailPasswordRecoveryPost from "@/content/blog/gmail-password-recovery-via-sms"
import SendSmsOnlinePost from "@/content/blog/send-sms-online"
import BulkWhatsAppMessagingPost from "@/content/blog/bulk-whatsapp-messaging"
import WhatsAppMarketingPost from "@/content/blog/whatsapp-marketing"
import WhatsAppSandalPost from "@/content/blog/whatsapp-sandal"

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
  "bulk-whatsapp-messaging": {
    meta: {
      slug: "bulk-whatsapp-messaging",
      title:
        "Bulk WhatsApp Messaging: How to Send at Scale Without Getting Banned (2026)",
      description:
        "How bulk WhatsApp messaging works on the official Business API in 2026 — the four sending steps, template categories, the updated messaging tiers and frequency caps, DPDP-compliant opt-in, pricing, and how to send thousands of messages without getting your number banned.",
      date: "2026-06-16",
      readingTime: "11 min read",
      category: "WhatsApp",
      author: TEAM,
      coverAlt:
        "One broadcast hub fanning out to many opted-in WhatsApp contacts, in SMSLocal's dark and emerald theme.",
      toc: [
        { id: "what-it-is", label: "What bulk WhatsApp messaging is" },
        { id: "api-vs-app", label: "API vs Business App vs unofficial" },
        { id: "how-it-works", label: "How it works" },
        { id: "message-types", label: "Kinds of messages you can send" },
        { id: "limits-tiers", label: "Messaging limits and tiers in 2026" },
        { id: "opt-in", label: "The opt-in requirement" },
        { id: "cost", label: "What it costs" },
        { id: "platform", label: "What to look for in a platform" },
        { id: "replies", label: "When customers reply" },
        { id: "faq", label: "FAQ" },
      ],
      relatedSlugs: ["whatsapp-marketing", "send-sms-online"],
    },
    Component: BulkWhatsAppMessagingPost,
  },

  "whatsapp-marketing": {
    meta: {
      slug: "whatsapp-marketing",
      title: "WhatsApp Marketing in India: The Complete 2026 Strategy Guide",
      description:
        "The complete WhatsApp marketing playbook for India — why it works, official API vs unofficial tools, the three campaign types, Click-to-WhatsApp ads, templates that convert, automation, the metrics to watch, the five mistakes that get numbers banned, and what it costs.",
      date: "2026-06-14",
      readingTime: "12 min read",
      category: "Marketing",
      author: TEAM,
      coverAlt:
        "Rising WhatsApp campaign performance chart with a megaphone message bubble, in SMSLocal's dark and emerald theme.",
      toc: [
        { id: "why-it-works", label: "Why it works in India" },
        { id: "official-vs-unofficial", label: "Official API vs unofficial tools" },
        { id: "three-types", label: "The three types of marketing" },
        { id: "ctwa", label: "Click-to-WhatsApp ads" },
        { id: "getting-started", label: "How to get started" },
        { id: "templates", label: "Templates that convert" },
        { id: "automation", label: "Automation at scale" },
        { id: "measure", label: "How to measure success" },
        { id: "mistakes", label: "Five mistakes that get bans" },
        { id: "cost", label: "What it costs in India" },
        { id: "faq", label: "FAQ" },
      ],
      relatedSlugs: ["bulk-whatsapp-messaging", "whatsapp-sandal"],
    },
    Component: WhatsAppMarketingPost,
  },

  "whatsapp-sandal": {
    meta: {
      slug: "whatsapp-sandal",
      title: "WhatsApp Scams in India: How to Identify Every Type and Stay Safe (2026)",
      description:
        "KYC fraud, fake jobs, investment scams, OTP theft, digital arrest, malicious APKs and QR-code fraud — how each WhatsApp scam in India works, the universal warning signs, how businesses prevent impersonation, and exactly what to do in the first hour if you have been scammed.",
      date: "2026-06-12",
      readingTime: "12 min read",
      category: "Security",
      author: TEAM,
      coverAlt:
        "A suspicious WhatsApp message asking for an OTP beside a warning shield, in a dark amber caution theme.",
      toc: [
        { id: "why-whatsapp", label: "Why scammers target WhatsApp" },
        { id: "common-scams", label: "The most common scams" },
        { id: "warning-signs", label: "Universal warning signs" },
        { id: "businesses", label: "Protecting your customers" },
        { id: "if-scammed", label: "If you have been scammed" },
        { id: "faq", label: "FAQ" },
      ],
      relatedSlugs: ["whatsapp-marketing", "dnd-means"],
    },
    Component: WhatsAppSandalPost,
  },

  "dlt-registration-guide": {
    meta: {
      slug: "dlt-registration-guide",
      title:
        "DLT Registration: The Practical Guide for Indian Businesses (2026)",
      description:
        "Every step, every document, every rejection reason — from Principal Entity signup to sending your first SMS. Based on 7 years of onboarding Indian businesses onto DLT.",
      date: "2026-04-15",
      updatedDate: "2026-04-22",
      readingTime: "14 min read",
      category: "Compliance",
      author: TEAM,
      coverImage: "/blog/dlt-registration-guide-cover.jpg",
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
      title: "DND Means: What It Is, How to Activate It, and What It Actually Blocks",
      description:
        "A consumer guide to India's Do Not Disturb registry — how to activate it on Jio, Airtel, Vi and BSNL, what it blocks, and what to do when promotional SMS still slip through.",
      date: "2026-03-28",
      readingTime: "9 min read",
      category: "Consumer",
      author: TEAM,
      coverImage: "/blog/dnd-means-cover.jpg",
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
      title: "DND Services for Senders: Scrubbing, Compliance, and Category Rules",
      description:
        "If you send SMS in India, DND decides whether your campaigns are legal. A practical guide to NCPR scrubbing, send windows, consent, and the exact violations that get your sender ID suspended.",
      date: "2026-03-30",
      readingTime: "11 min read",
      category: "Compliance",
      author: TEAM,
      coverImage: "/blog/dnd-services-cover.jpg",
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
      title: "Receive SMS Online in India: Legitimate Uses, Tradeoffs, and Better Alternatives",
      description:
        "An honest look at receive-SMS-online services in India — when they're a valid privacy tool, when they're fraud, and what senders can do to block them from abusing OTP flows.",
      date: "2026-03-14",
      readingTime: "10 min read",
      category: "Consumer",
      author: TEAM,
      coverImage: "/blog/receive-sms-online-india-cover.jpg",
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
      title: "SMS Not Working on Your Phone? The Complete Activation & Troubleshooting Guide",
      description:
        "Can't send or receive SMS? Walk through every check — device settings, SMSC numbers for Indian carriers, iMessage gotchas, DND filters, and when to escalate to your carrier.",
      date: "2026-02-22",
      readingTime: "10 min read",
      category: "Troubleshooting",
      author: TEAM,
      coverImage: "/blog/sms-activation-cover.jpg",
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
      relatedSlugs: ["gmail-password-recovery-via-sms", "send-sms-online"],
    },
    Component: SmsActivationPost,
  },

  "gmail-password-recovery-via-sms": {
    meta: {
      slug: "gmail-password-recovery-via-sms",
      title: "Gmail Password Recovery via SMS: How It Works, Common Failures, and Security Tips",
      description:
        "A step-by-step walkthrough of Gmail's SMS-based password recovery — setup, the exact failure modes when the SMS won't arrive, the account recovery form, and how to secure your recovery phone against SIM-swap attacks.",
      date: "2026-02-08",
      readingTime: "9 min read",
      category: "Security",
      author: TEAM,
      coverImage: "/blog/gmail-password-recovery-via-sms-cover.jpg",
      coverAlt:
        "Still life of a small metal padlock on a closed leather notebook, a face-down smartphone, and folded glasses, lit by a warm brass desk lamp on a dark walnut desk.",
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
      relatedSlugs: ["sms-activation", "send-sms-online"],
    },
    Component: GmailPasswordRecoveryPost,
  },

  "send-sms-online": {
    meta: {
      slug: "send-sms-online",
      title: "How to Send SMS Online in India: The 4 Ways and When to Use Each",
      description:
        "Web-to-SMS dashboard, SMS API, bulk platform, or WhatsApp Business API — a practical comparison of how to send SMS online in India, with the legal requirements every sender has to follow.",
      date: "2026-01-18",
      readingTime: "11 min read",
      category: "Getting started",
      author: TEAM,
      coverImage: "/blog/send-sms-online-cover.jpg",
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
