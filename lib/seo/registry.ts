/**
 * ────────────────────────────────────────────────────────────────────────────
 * SMSLocal — SEO Registry (single source of truth for static-page SEO)
 * ────────────────────────────────────────────────────────────────────────────
 *
 * Every static page on smslocal.in reads its <title>, meta description,
 * keywords, Open Graph tags, canonical URL, and (if applicable) article
 * dates from THIS FILE.
 *
 * HOW TO EDIT
 *   1. Find the page path below (e.g. "/pricing").
 *   2. Change title / description / keywords / ogImage as needed.
 *   3. Save. The page metadata updates automatically — no other files to touch.
 *
 * VISUAL EDITOR
 *   Run the dev server and open http://localhost:3000/dev/seo to see
 *   every entry in a table with Google SERP and Open Graph previews,
 *   plus automatic length-warning flags.
 *
 * FIELD LIMITS (informational — helpers only warn, never hard-fail)
 *   title         : 30–60 characters (Google truncates beyond ~60)
 *   description   : 120–160 characters (Google truncates beyond ~160)
 *   keywords      : 4–8 recommended (Google ignores them, but Bing + LLMs read them)
 *
 * NOTES
 *   • The title is automatically suffixed with " | SMSLocal" by the root layout.
 *     → Write the page-specific title only, e.g. "Pricing — SMS, WhatsApp & AI".
 *   • Use `titleAbsolute` to opt out of the suffix (e.g. the homepage).
 *   • Use `type: "article"` for blog-like pages so OG tags emit publishedTime etc.
 *   • Use `noindex: true` for auth pages, 404, or any page that shouldn't be indexed.
 *   • Dynamic routes (blog posts, help articles, customer stories) are NOT in this
 *     registry — their SEO is generated from their content files at build time.
 */

export type SeoEntry = {
  /** Page-specific title. Suffix " | SMSLocal" is added automatically. */
  title?: string
  /** Full title override that disables the site-wide suffix. Use only on the homepage. */
  titleAbsolute?: string
  /** 120–160 char meta description. */
  description: string
  /** Keywords array. Merged with SITE.defaultKeywords. */
  keywords?: string[]
  /**
   * Primary keyword the page is built to rank for — used by the dashboard's
   * Rank Math-style scorer. The editor pre-fills this and shows a one-click
   * "Add to keywords list" affordance when it's missing from `keywords`.
   * Convention: ALSO include the focus keyword as the first item of
   * `keywords` so the in-page meta tag reflects it too.
   */
  focusKeyword?: string
  /** 1200×630 image, site-relative path. Falls back to /og-default.png. */
  ogImage?: string
  /** Block search engines from indexing. */
  noindex?: boolean
  /** Emit article OG tags (publishedTime, modifiedTime, authors). */
  type?: "website" | "article"
  /** ISO 8601. Required when type === "article". */
  publishedTime?: string
  /** ISO 8601. Optional. */
  modifiedTime?: string
  /** Author names for article OG tags. */
  authors?: string[]
}

export const SEO_REGISTRY: Record<string, SeoEntry> = {
  // ─── Homepage ─────────────────────────────────────────────────────────────
  "/": {
    titleAbsolute: "SMS, WhatsApp & AI Messaging — Trusted Since 2019 | SMSLocal",
    description:
      "SMS, WhatsApp & AI messaging for India — DLT-compliant bulk SMS, WhatsApp Business API, OTP, and AI agents in 8 Indian languages. Start free with ₹60 credit.",
    focusKeyword: "SMS, WhatsApp & AI messaging",
    keywords: [
      "SMS, WhatsApp & AI messaging",
      "bulk SMS India",
      "WhatsApp Business API India",
      "OTP SMS India",
      "SMS gateway India",
      "DLT compliant SMS",
      "transactional SMS India",
      "SMSLocal",
    ],
  },

  // ─── Pricing ──────────────────────────────────────────────────────────────
  "/pricing": {
    title: "SMS Pricing in India — Plans from ₹0.105, Trusted",
    description:
      "SMS pricing in India with volume-tier discounts — pay-as-you-go WhatsApp Business API, OTP, and AI WhatsApp Agents, 24-month validity, and ₹60 free credit.",
    focusKeyword: "SMS pricing in India",
    keywords: [
      "SMS pricing in India",
      "bulk SMS price India",
      "WhatsApp Business API pricing",
      "OTP SMS rates India",
      "bulk SMS cost per message",
      "transactional SMS pricing",
      "SMS plans India",
      "SMS credit pricing",
    ],
  },

  // ─── Products ─────────────────────────────────────────────────────────────
  "/products": {
    title: "Business Messaging Products for India — Trusted, 1 API",
    description:
      "Business messaging products for India — bulk SMS, OTP, Quick SMS, WhatsApp Business API, and AI agents on one compliant platform, one API, and one wallet.",
    focusKeyword: "business messaging products",
    keywords: [
      "business messaging products",
      "SMS WhatsApp products",
      "CPaaS India",
      "messaging platform India",
      "bulk SMS service",
      "WhatsApp Business API",
      "AI WhatsApp agent",
      "SMSLocal products",
    ],
  },
  "/products/bulk-sms": {
    title: "Bulk SMS India — 98% Delivery, Fast & Trusted",
    description:
      "Bulk SMS in India, DLT-compliant and AI-routed — send millions with wrong-number detection, failed-campaign resend, and 99.99% uptime. ₹60 free credit.",
    focusKeyword: "bulk SMS",
    keywords: [
      "bulk SMS",
      "bulk SMS service India",
      "send bulk SMS",
      "bulk SMS gateway",
      "DLT compliant SMS",
      "promotional SMS India",
      "transactional SMS India",
      "SMS marketing India",
    ],
  },
  "/products/inbox": {
    title: "Shared Team Inbox — Every Channel, One Workspace",
    description:
      "SMSLocal Inbox unifies WhatsApp, Email, Instagram, Messenger, SMS and Voice in one workspace — with Customer 360, smart routing and team assignments.",
    focusKeyword: "shared team inbox",
    keywords: [
      "shared team inbox",
      "omnichannel inbox",
      "unified inbox software",
      "customer support inbox",
      "WhatsApp team inbox",
      "multichannel customer messaging",
      "collaborative inbox",
      "shared inbox for teams",
    ],
  },
  "/products/email": {
    title: "Shared Email Inbox for Teams — Support, Not a Mailbox",
    description:
      "Turn your support@ inbox into a collaborative workspace. Assign conversations, add private notes, automate routing, and give every agent full customer context.",
    focusKeyword: "shared email inbox",
    keywords: [
      "shared email inbox",
      "team email inbox",
      "support email software",
      "shared mailbox alternative",
      "Front alternative",
      "Help Scout alternative",
      "collaborative inbox for support",
      "support@ inbox tool",
    ],
  },
  "/products/automation": {
    title: "Conversation Automation Platform — Replies, AI, Workflows",
    description:
      "Automate customer conversations with auto-reply rules, an AI chatbot, a no-code workflow builder, REST API and webhooks — with instant human handoff.",
    focusKeyword: "conversation automation",
    keywords: [
      "conversation automation",
      "customer support automation",
      "AI chatbot for support",
      "auto reply rules",
      "no-code workflow builder",
      "WhatsApp automation",
      "support automation platform",
      "chatbot with human handoff",
    ],
  },
  "/products/voice": {
    title: "AI Voice Receptionist — Answer & Route Every Call 24/7",
    description:
      "An AI voice receptionist that answers inbound calls 24/7, routes them, books appointments and captures every lead — with business numbers and clean human handoff.",
    focusKeyword: "AI voice receptionist",
    keywords: [
      "AI voice receptionist",
      "AI phone answering service",
      "virtual receptionist software",
      "AI call answering",
      "automated appointment booking calls",
      "inbound call routing AI",
      "AI IVR India",
      "voice agent for business calls",
    ],
  },
  "/products/quick-sms": {
    title: "Quick SMS — Trusted, No-Code Sending in 5 Minutes",
    description:
      "Quick SMS lets you send DLT-compliant campaigns from your browser in minutes — upload a list, pick a template, preview and send. No code, ₹60 free credit.",
    focusKeyword: "Quick SMS",
    keywords: [
      "Quick SMS",
      "bulk SMS panel India",
      "send SMS without coding",
      "web SMS sender",
      "SMS dashboard India",
      "bulk SMS software",
      "SMS campaign tool",
      "DLT SMS template sender",
    ],
  },
  "/products/rcs": {
    title: "RCS Business Messaging — Verified, Trusted, 3 Carriers",
    description:
      "RCS business messaging in India — verified, branded rich cards and suggested replies on Jio, Airtel, and Vi, with automatic DLT SMS fallback on one API.",
    focusKeyword: "RCS business messaging",
    keywords: [
      "RCS business messaging",
      "RCS messaging API",
      "Google RCS India",
      "RBM India",
      "verified sender RCS",
      "rich communication services India",
      "RCS SMS fallback",
      "RCS Jio Airtel Vi",
    ],
  },
  "/products/whatsapp-business-api": {
    title: "WhatsApp Business API — Free, Trusted, 8 Languages",
    description:
      "WhatsApp Business API for India with AI agents that reply in 8 Indian languages — broadcasts, chatbot builder, team inbox, no monthly plan, and ₹60 free credit.",
    focusKeyword: "WhatsApp Business API",
    keywords: [
      "WhatsApp Business API",
      "WhatsApp API provider India",
      "WhatsApp BSP India",
      "WhatsApp Cloud API",
      "WhatsApp broadcast API",
      "WhatsApp chatbot builder",
      "WhatsApp marketing API",
      "WhatsApp team inbox",
    ],
  },
  "/products/ai-agents": {
    title: "AI Agents That Resolve, Not Just Reply — Captain AI",
    description:
      "Captain AI answers in 8 Indian languages and takes real actions across 300+ apps — look up orders, update invoices, issue refunds — then hands off to a human.",
    focusKeyword: "AI agents",
    keywords: [
      "AI agents",
      "AI customer support agent",
      "agentic AI support",
      "AI chatbot WhatsApp",
      "WhatsApp AI bot India",
      "multilingual WhatsApp chatbot",
      "AI customer support WhatsApp",
      "WhatsApp auto reply bot",
    ],
  },
  "/products/ai-agentic": {
    title: "Agentic AI for Customer Support — Captain AI",
    description:
      "Captain AI is agentic AI that resolves conversations end to end — acting across 300+ connected apps to look up orders, update invoices and issue refunds.",
    focusKeyword: "agentic AI",
    keywords: [
      "agentic AI",
      "agentic AI support",
      "AI agent for customer support",
      "autonomous AI agent",
      "AI support automation",
      "Captain AI",
      "AI agent that takes actions",
      "agentic AI India",
    ],
  },
  "/products/integrations": {
    title: "Integrations — Connect SMSLocal to Your Stack",
    description:
      "Connect SMSLocal to Shopify, HubSpot, Salesforce, Slack, Zapier and 30+ apps with 1-click OAuth, native channels and a full REST API — no glue code required.",
    focusKeyword: "messaging integrations",
    keywords: [
      "messaging integrations",
      "SMSLocal integrations",
      "CRM SMS integration",
      "Shopify SMS integration",
      "HubSpot WhatsApp integration",
      "Zapier SMS integration",
      "Salesforce messaging integration",
      "REST API messaging",
    ],
  },
  "/products/live-chat": {
    title: "Live Chat for Your Website — AI + Human, One Inbox",
    description:
      "Add a live chat widget to your website and answer visitors from the same inbox as WhatsApp, SMS and email — with an AI agent handling the first reply instantly.",
    focusKeyword: "live chat software",
    keywords: [
      "live chat software",
      "website live chat",
      "live chat widget",
      "AI live chat",
      "customer live chat",
      "live chat for website India",
      "website chat widget",
      "live chat with human handoff",
    ],
  },

  // ─── Solutions ───────────────────────────────────────────────────────────
  "/solutions": {
    title: "Business Messaging Solutions — Trusted, 7 Industries",
    description:
      "Business messaging solutions for India — DLT-compliant SMS, WhatsApp API, and AI agents tailored for e-commerce, banking, healthcare, logistics and more.",
    focusKeyword: "business messaging solutions",
    keywords: [
      "business messaging solutions",
      "SMS solutions by industry",
      "WhatsApp API use cases",
      "industry SMS solutions",
      "SMS for enterprises India",
      "SMS for ecommerce banking healthcare",
      "SMSLocal industries",
    ],
  },
  "/solutions/saas-b2b": {
    title: "Customer Support Built for SaaS Teams — B2B Platform",
    description:
      "Run onboarding, retention, expansion and churn prevention from one AI-powered support platform built for SaaS teams — with Stripe, HubSpot and Linear context.",
    focusKeyword: "customer support for SaaS",
    keywords: [
      "customer support for SaaS",
      "B2B customer support platform",
      "SaaS customer success software",
      "churn prevention software",
      "customer 360 platform",
      "Intercom alternative",
      "Zendesk alternative",
      "AI customer support SaaS",
    ],
  },
  "/solutions/restaurant": {
    title: "Customer Support for Restaurants — Reservations & Reviews",
    description:
      "Manage guest conversations, automate SMS reservations, send order updates and collect reviews from one inbox — built for restaurants, cafes and chains.",
    focusKeyword: "customer support for restaurants",
    keywords: [
      "customer support for restaurants",
      "restaurant SMS reservations",
      "restaurant guest messaging",
      "WhatsApp for restaurants",
      "restaurant review automation",
      "multi-location restaurant software",
      "restaurant order updates SMS",
      "food service customer communication",
    ],
  },
  "/solutions/banking-fintech": {
    title: "SMS for Banking & Fintech — Trusted, Sub-1s OTPs",
    description:
      "SMS for banking & fintech in India — secure OTPs in under 1 second, transaction alerts, and KYC flows. DLT-compliant, DPDPA-aware, with ₹60 free credit.",
    focusKeyword: "SMS for banking & fintech",
    keywords: [
      "SMS for banking & fintech",
      "banking SMS India",
      "fintech SMS API",
      "banking OTP SMS",
      "transaction alert SMS",
      "KYC WhatsApp India",
      "NBFC SMS gateway",
      "DPDPA compliant SMS",
    ],
  },
  "/solutions/ecommerce": {
    title: "SMS for E-commerce — Trusted, 24/7 Cart Recovery",
    description:
      "SMS for e-commerce in India — DLT-compliant order and shipping alerts, WhatsApp broadcasts, and AI cart-recovery agents that lift repeat sales. ₹60 free.",
    focusKeyword: "SMS for e-commerce",
    keywords: [
      "SMS for e-commerce",
      "ecommerce SMS India",
      "cart recovery WhatsApp",
      "order confirmation SMS",
      "shipping tracking SMS",
      "COD OTP SMS",
      "abandoned cart SMS",
      "D2C WhatsApp broadcast",
    ],
  },
  "/solutions/education": {
    title: "SMS for Schools & EdTech — Trusted, 8 Languages",
    description:
      "SMS for schools and EdTech in India — DLT-compliant fee reminders, exam schedules, result alerts, and parent updates over SMS and WhatsApp. ₹60 free credit.",
    focusKeyword: "SMS for schools",
    keywords: [
      "SMS for schools",
      "school SMS service India",
      "edtech WhatsApp India",
      "fee reminder SMS",
      "exam result SMS",
      "parent communication SMS",
      "coaching institute SMS",
      "school management SMS",
    ],
  },
  "/solutions/healthcare": {
    title: "SMS for Healthcare — Trusted, Sub-1s in 8 Languages",
    description:
      "SMS for healthcare in India — DLT-compliant appointment reminders, prescription refills, lab results, and patient follow-up over SMS and WhatsApp. ₹60 free.",
    focusKeyword: "SMS for healthcare",
    keywords: [
      "SMS for healthcare",
      "healthcare SMS API",
      "hospital SMS service India",
      "appointment reminder SMS",
      "lab report SMS",
      "patient WhatsApp India",
      "clinic SMS gateway",
      "doctor patient SMS",
    ],
  },
  "/solutions/logistics": {
    title: "SMS for Logistics — Trusted, 24/7 Delivery OTPs",
    description:
      "SMS for logistics in India — DLT-compliant dispatch alerts, delivery OTPs, live tracking links, and driver check-ins over SMS and WhatsApp. ₹60 free credit.",
    focusKeyword: "SMS for logistics",
    keywords: [
      "SMS for logistics",
      "logistics SMS India",
      "delivery OTP SMS",
      "courier SMS service",
      "dispatch SMS alerts",
      "last mile delivery SMS",
      "tracking SMS API",
      "logistics WhatsApp India",
    ],
  },
  "/solutions/real-estate": {
    title: "SMS for Real Estate — Trusted, 24/7 Lead Alerts",
    description:
      "SMS for real estate in India — DLT-compliant property alerts, open-house invites, lead nurture, and client follow-up over SMS and WhatsApp. ₹60 free credit.",
    focusKeyword: "SMS for real estate",
    keywords: [
      "SMS for real estate",
      "real estate SMS India",
      "real estate WhatsApp marketing",
      "property alerts SMS",
      "real estate lead nurture",
      "property broker SMS",
      "open house SMS invites",
      "real estate CRM SMS",
    ],
  },
  "/solutions/retail": {
    title: "SMS for Retail & Hospitality — Trusted, 24/7",
    description:
      "SMS for retail & hospitality in India — DLT-compliant loyalty offers, reservation confirmations, flash sales, and guest messaging over SMS & WhatsApp. ₹60 free.",
    focusKeyword: "SMS for retail",
    keywords: [
      "SMS for retail",
      "retail SMS India",
      "retail WhatsApp marketing",
      "hospitality WhatsApp India",
      "restaurant SMS service",
      "loyalty SMS programme",
      "flash sale SMS",
      "retail customer engagement",
    ],
  },

  // ─── Compare ──────────────────────────────────────────────────────────────
  "/compare": {
    title: "SMS Service Comparison — Trusted, 8 Platforms",
    description:
      "SMS service comparison for India — SMSLocal vs MSG91, Fast2SMS, WATI, AiSensy, Interakt, Gupshup, Twilio, and Textlocal on features and pricing. ₹60 free.",
    focusKeyword: "SMS service comparison",
    keywords: [
      "SMS service comparison",
      "best SMS gateway India",
      "SMS provider comparison",
      "WhatsApp API comparison",
      "MSG91 alternative",
      "Twilio alternative India",
      "bulk SMS comparison India",
    ],
  },
  "/compare/smslocal-vs-aisensy": {
    title: "SMSLocal vs AiSensy — A Trusted 2026 Comparison",
    description:
      "SMSLocal vs AiSensy — an honest 2026 comparison of WhatsApp BSP pricing, chatbot builder, analytics, and AI agents, plus who should pick which. ₹60 free.",
    focusKeyword: "SMSLocal vs AiSensy",
    keywords: [
      "SMSLocal vs AiSensy",
      "AiSensy alternative",
      "AiSensy pricing",
      "AiSensy review",
      "AiSensy vs WATI",
      "WhatsApp BSP comparison",
      "WhatsApp chatbot builder alternative",
    ],
  },
  "/compare/smslocal-vs-fast2sms": {
    title: "SMSLocal vs Fast2SMS — A Trusted 2026 Comparison",
    description:
      "SMSLocal vs Fast2SMS — an honest 2026 comparison of route quality, DLT handling, WhatsApp coverage, and API maturity, plus who should pick which. ₹60 free.",
    focusKeyword: "SMSLocal vs Fast2SMS",
    keywords: [
      "SMSLocal vs Fast2SMS",
      "Fast2SMS alternative",
      "Fast2SMS pricing",
      "Fast2SMS review",
      "Fast2SMS vs MSG91",
      "cheap bulk SMS India",
      "bulk SMS comparison India",
    ],
  },
  "/compare/smslocal-vs-gupshup": {
    title: "SMSLocal vs Gupshup — A Trusted 2026 Comparison",
    description:
      "SMSLocal vs Gupshup — an honest 2026 comparison of enterprise WhatsApp, AI agents, onboarding speed, and pricing, plus who should pick which. ₹60 free.",
    focusKeyword: "SMSLocal vs Gupshup",
    keywords: [
      "SMSLocal vs Gupshup",
      "Gupshup alternative",
      "Gupshup pricing",
      "Gupshup WhatsApp pricing",
      "Gupshup review",
      "Gupshup vs Twilio",
      "enterprise WhatsApp BSP",
    ],
  },
  "/compare/smslocal-vs-interakt": {
    title: "SMSLocal vs Interakt — A Trusted 2026 Comparison",
    description:
      "SMSLocal vs Interakt — an honest 2026 comparison of D2C commerce integrations, WhatsApp catalogues, customer journeys, and who should pick which. ₹60 free.",
    focusKeyword: "SMSLocal vs Interakt",
    keywords: [
      "SMSLocal vs Interakt",
      "Interakt alternative",
      "Interakt pricing",
      "Interakt review",
      "Interakt vs WATI",
      "Shopify WhatsApp app",
      "WhatsApp D2C commerce platform",
    ],
  },
  "/compare/smslocal-vs-msg91": {
    title: "SMSLocal vs MSG91 — A Trusted 2026 Comparison",
    description:
      "SMSLocal vs MSG91 — an honest 2026 breakdown of features and INR pricing, where each platform wins, and who should pick which for messaging in India.",
    focusKeyword: "SMSLocal vs MSG91",
    keywords: [
      "SMSLocal vs MSG91",
      "MSG91 alternative",
      "MSG91 pricing",
      "MSG91 review",
      "MSG91 vs Twilio",
      "MSG91 vs Fast2SMS",
      "Indian CPaaS comparison",
    ],
  },
  "/compare/smslocal-vs-textlocal": {
    title: "SMSLocal vs Textlocal — A Trusted 2026 Comparison",
    description:
      "SMSLocal vs Textlocal — an honest 2026 comparison of API depth, WhatsApp readiness, modern developer experience, and AI agents, plus who should pick which.",
    focusKeyword: "SMSLocal vs Textlocal",
    keywords: [
      "SMSLocal vs Textlocal",
      "Textlocal alternative",
      "Textlocal pricing",
      "Textlocal review",
      "Textlocal India",
      "Textlocal vs MSG91",
      "Textlocal WhatsApp",
    ],
  },
  "/compare/smslocal-vs-twilio": {
    title: "SMSLocal vs Twilio — A Trusted 2026 Comparison",
    description:
      "SMSLocal vs Twilio for Indian buyers — an honest 2026 look at INR pricing, India routes, DLT-native workflows, and WhatsApp depth, plus who should pick which.",
    focusKeyword: "SMSLocal vs Twilio",
    keywords: [
      "SMSLocal vs Twilio",
      "Twilio alternative India",
      "Twilio India pricing",
      "Twilio SMS India",
      "Twilio DLT compliance",
      "Twilio vs MSG91",
      "cheaper Twilio India",
    ],
  },
  "/compare/smslocal-vs-wati": {
    title: "SMSLocal vs WATI — A Trusted 2026 Comparison",
    description:
      "SMSLocal vs WATI — an honest 2026 comparison of pay-as-you-go vs flat-fee pricing, team inbox depth, and AI agents, plus who should pick which. ₹60 free.",
    focusKeyword: "SMSLocal vs WATI",
    keywords: [
      "SMSLocal vs WATI",
      "WATI alternative",
      "WATI pricing",
      "WATI review",
      "WATI WhatsApp",
      "WhatsApp team inbox India",
      "WhatsApp shared inbox alternative",
    ],
  },

  // ─── Developers ───────────────────────────────────────────────────────────
  "/developers": {
    title: "SMS & WhatsApp API — Free SDKs in 6 Languages, Trusted",
    description:
      "SMS & WhatsApp API for developers — REST endpoints, SDKs for PHP, Java, Python, Node.js, C# and JavaScript, signed webhooks, and a free sandbox. ₹60 free.",
    focusKeyword: "SMS & WhatsApp API",
    keywords: [
      "SMS & WhatsApp API",
      "SMS gateway API India",
      "WhatsApp API India",
      "OTP API India",
      "REST SMS API",
      "messaging SDK India",
      "SMS API documentation",
      "developer hub SMSLocal",
    ],
  },
  "/developers/api-docs": {
    title: "SMS API Documentation — Trusted REST Reference, 3 SDKs",
    description:
      "SMS API documentation for SMSLocal — send DLT-compliant SMS, fetch delivery reports, and check credits with cURL, Node, and Python examples. ₹60 free credit.",
    focusKeyword: "SMS API documentation",
    keywords: [
      "SMS API documentation",
      "SMS API reference",
      "send SMS API",
      "REST SMS API docs",
      "SMS HTTP API",
      "DLR webhook API",
      "SMS credits API",
      "SMS API examples",
    ],
  },
  "/developers/quickstart": {
    title: "SMS API Quickstart — Trusted, First SMS in 5 Minutes",
    description:
      "SMS API quickstart — go from zero to your first delivered SMS in five minutes: signup, DLT setup, API keys, and ready-to-paste cURL, Node, and Python snippets.",
    focusKeyword: "SMS API quickstart",
    keywords: [
      "SMS API quickstart",
      "send SMS API tutorial",
      "send SMS Node.js",
      "send SMS Python",
      "SMS API integration",
      "SMS API getting started",
      "DLT setup guide",
      "send SMS curl",
    ],
  },
  "/developers/sms-api": {
    title: "SMS API for Business — Trusted, 98% Delivery REST API",
    description:
      "SMS API for business messaging — DLT-compliant, 98%+ delivery, with integrations for REST, SMTP, SDKs, Excel, and every major CRM. ₹60 free credit to start.",
    focusKeyword: "SMS API",
    keywords: [
      "SMS API",
      "business SMS API India",
      "transactional SMS API",
      "promotional SMS API",
      "REST SMS API India",
      "DLT SMS API",
      "SMS gateway API",
      "SMS automation API",
    ],
  },
  "/developers/xml-api": {
    title: "XML API for SMS — Trusted, DLT-Ready in 5 Steps",
    description:
      "XML API for SMS at SMSLocal — send DLT-compliant SMS, fetch delivery reports, and check credits via XML requests, ideal for legacy and XML-centric stacks.",
    focusKeyword: "XML API",
    keywords: [
      "XML API",
      "SMS XML integration",
      "XML SMS gateway",
      "XML send SMS",
      "legacy SMS API",
      "DLT XML SMS",
      "SOAP SMS API",
      "XML API SMS India",
    ],
  },

  // ─── Blog (index only; individual posts read from lib/blog.ts) ────────────
  "/blog": {
    title: "SMS Marketing Blog — Trusted Guides & 2026 Tips",
    description:
      "SMS marketing blog for India — practical guides on SMS, WhatsApp, and AI messaging: compliance, delivery, developer recipes, and honest product notes here.",
    focusKeyword: "SMS marketing blog",
    keywords: [
      "SMS marketing blog",
      "SMS messaging blog",
      "WhatsApp marketing blog",
      "DLT compliance guides",
      "bulk SMS tips",
      "WhatsApp Business tips",
      "SMS best practices",
      "SMSLocal blog",
    ],
  },

  // ─── Resources ────────────────────────────────────────────────────────────
  "/resources/customer-stories": {
    title: "SMS Case Studies — Trusted Results from 3 Sectors",
    description:
      "SMS case studies from India — how fintech, D2C, and EdTech teams ship with SMSLocal, with hard benchmarks, named leaders, and before/after metrics here.",
    focusKeyword: "SMS case studies",
    keywords: [
      "SMS case studies",
      "WhatsApp Business case study",
      "SMS marketing case study",
      "SMSLocal customer stories",
      "OTP success stories",
      "fintech SMS case study",
      "D2C WhatsApp case study",
      "EdTech SMS case study",
    ],
  },
  "/resources/status": {
    title: "System Status — Real-Time Platform Health & Uptime",
    description:
      "Monitor SMSLocal platform health in real time — live service status, 90-day uptime, historical analytics, incident history and maintenance updates.",
    focusKeyword: "system status",
    keywords: [
      "system status",
      "SMSLocal status",
      "platform uptime",
      "service status dashboard",
      "incident history",
      "real-time system health",
      "uptime monitoring",
      "status page",
    ],
  },
  "/resources/changelog": {
    title: "Changelog — New Features, Improvements & Fixes",
    description:
      "See what's new in SMSLocal — features, improvements and fixes shipped every two weeks across AI agents, omnichannel inbox, automation and integrations.",
    focusKeyword: "SMSLocal changelog",
    keywords: [
      "SMSLocal changelog",
      "product updates",
      "release notes",
      "what's new",
      "product roadmap updates",
      "feature releases",
      "platform changelog",
      "SMSLocal product updates",
    ],
  },
  "/resources/glossary": {
    title: "SMS Glossary — Trusted DLT & WhatsApp Terms, 2026",
    description:
      "SMS glossary for India — plain-English definitions for DLT, PE, BSP, template, DLR, MAU, scrubbing, and every term that matters in Indian messaging today.",
    focusKeyword: "SMS glossary",
    keywords: [
      "SMS glossary",
      "DLT glossary",
      "SMS terminology",
      "WhatsApp API terms",
      "messaging glossary India",
      "DLR meaning SMS",
      "BSP meaning WhatsApp",
      "PE ID meaning DLT",
    ],
  },
  "/resources/help": {
    title: "DLT Registration Guide — Trusted Help, 2026 Setup",
    description:
      "DLT registration guide and help centre — step-by-step setup for SMS, WhatsApp, OTP, Sender IDs, and templates, plus thousands of answers from our support.",
    focusKeyword: "DLT registration guide",
    keywords: [
      "DLT registration guide",
      "DLT registration process",
      "DLT template registration",
      "Header registration DLT",
      "SMS help centre",
      "WhatsApp Business setup",
      "SMS API support",
      "messaging platform help",
    ],
  },
  "/resources/tools": {
    title: "Free SMS Tools — Trusted Utilities, ₹60 to Try",
    description:
      "Free SMS tools for Indian businesses — send SMS with ₹60 credit, learn the legal alternatives to SMS bombing, and compose DLT-ready messages the right way.",
    focusKeyword: "free SMS tools",
    keywords: [
      "free SMS tools",
      "SMS tools online",
      "SMS character counter",
      "DLT message validator",
      "free SMS sender",
      "SMS utility tools",
      "bulk SMS utilities",
      "SMS testing tools",
    ],
  },
  "/resources/tools/free-sms-without-registration": {
    title: "Free SMS Without Registration — Trusted, ₹60 Credit",
    description:
      "Free SMS without registration — send to Indian numbers with ₹60 signup credit, pay-as-you-go from ₹0.1050, and no credit card. DLT-compliant, live in minutes.",
    focusKeyword: "free SMS without registration",
    keywords: [
      "free SMS without registration",
      "send free SMS online",
      "free SMS India",
      "free bulk SMS",
      "send SMS without sign up",
      "free SMS no credit card",
      "free SMS sender online",
      "trial SMS India",
    ],
  },
  "/resources/tools/sms-bomber": {
    title: "SMS Bomber — Illegal in India: a Trusted 2026 Guide",
    description:
      "SMS bomber tools are illegal in India under the IT Act, TCCCPR 2018, and DPDPA — what they are, the consequences for senders, and the legal alternative.",
    type: "article",
    publishedTime: "2026-01-15T00:00:00.000Z",
    modifiedTime: "2026-04-22T00:00:00.000Z",
    authors: ["SMSLocal Team"],
    focusKeyword: "SMS bomber",
    keywords: [
      "SMS bomber",
      "SMS bomber online",
      "SMS bomber India",
      "SMS bombing illegal",
      "is SMS bomber legal",
      "IT Act SMS harassment",
      "TRAI TCCCPR 2018",
      "legal bulk SMS alternative",
    ],
  },

  // ─── Long SMS explainer (article) ─────────────────────────────────────────
  "/long-sms-messages": {
    title: "Long SMS Messages — The Complete, Trusted 2026 Guide",
    description:
      "Long SMS messages explained for India — how concatenation works, GSM-7 vs UCS-2 limits, segment counts, pricing, and DLT template rules. ₹60 free to try.",
    type: "article",
    publishedTime: "2026-02-10T00:00:00.000Z",
    modifiedTime: "2026-04-22T00:00:00.000Z",
    authors: ["SMSLocal Team"],
    focusKeyword: "long SMS messages",
    keywords: [
      "long SMS messages",
      "SMS character limit",
      "concatenated SMS",
      "160 character SMS",
      "GSM-7 vs UCS-2",
      "SMS segments",
      "Unicode SMS India",
      "multi part SMS",
    ],
  },

  // ─── Company ──────────────────────────────────────────────────────────────
  "/company/about": {
    title: "About SMSLocal — Trusted in India Since 2019",
    description:
      "About SMSLocal — India's complete SMS, WhatsApp, and AI messaging platform, built for Indian businesses since 2019. DLT-compliant, scalable, developer-ready.",
    focusKeyword: "about SMSLocal",
    keywords: [
      "about SMSLocal",
      "SMSLocal company",
      "Indian SMS company",
      "Indian messaging platform",
      "CPaaS company India",
      "SMS gateway company",
      "WhatsApp BSP India",
      "messaging platform Bengaluru",
    ],
  },
  "/company/careers": {
    title: "SMSLocal Careers — Trusted Team, Remote-First in 2026",
    description:
      "SMSLocal careers — join a small, opinionated team building India's messaging platform. Engineering, operations, carrier relations, and GTM, remote-first.",
    focusKeyword: "SMSLocal careers",
    keywords: [
      "SMSLocal careers",
      "SMSLocal jobs",
      "SMS company jobs India",
      "CPaaS jobs India",
      "SaaS jobs Bengaluru",
      "remote tech jobs India",
      "messaging platform careers",
      "fintech SaaS hiring",
    ],
  },
  "/company/contact": {
    title: "Contact SMSLocal — Trusted Sales & Support, 1-Day Reply",
    description:
      "Contact SMSLocal for enterprise sales, DLT onboarding, integration help, partnerships, or press — our team responds within one business day. ₹60 free to try.",
    focusKeyword: "contact SMSLocal",
    keywords: [
      "contact SMSLocal",
      "SMSLocal support",
      "SMSLocal sales",
      "SMS support India",
      "WhatsApp API sales contact",
      "DLT onboarding help",
      "enterprise SMS sales",
      "messaging platform contact",
    ],
  },

  // ─── Auth & utility ───────────────────────────────────────────────────────
  // Note: /signin, /signup, and /forgot-password are 307 redirects to the
  // external AWS product app (see app/signin/page.tsx, app/signup/page.tsx,
  // app/forgot-password/page.tsx). They emit `noindex` via their own page
  // metadata, so they don't belong in this registry.
  "/404": {
    title: "Page not found — SMSLocal Messaging Platform",
    description:
      "We couldn't find the page you were looking for on SMSLocal. Try the home page, pricing, developer docs, or contact support for help.",
    noindex: true,
  },

  // ─── Legal ────────────────────────────────────────────────────────────────
  "/legal/acceptable-use": {
    title: "Acceptable Use Policy — Trusted Rules, 2026",
    description:
      "Acceptable use policy for SMSLocal — the content and behaviour not allowed on the platform, the prohibited categories, and the enforcement actions we take.",
    focusKeyword: "acceptable use policy",
    keywords: [
      "acceptable use policy",
      "SMSLocal AUP",
      "SMS AUP India",
      "prohibited SMS content",
      "messaging platform rules",
      "bulk SMS terms",
    ],
  },
  "/legal/cookie-policy": {
    title: "Cookie Policy — Trusted, SMSLocal Cookies in 2026",
    description:
      "Cookie policy for SMSLocal — how we use cookies and similar technologies on smslocal.in, covering strictly-necessary, preference, analytics, and ad cookies.",
    focusKeyword: "cookie policy",
    keywords: [
      "cookie policy",
      "cookie policy India",
      "website cookies policy",
      "DPDPA cookie consent",
      "tracking cookies SaaS",
      "cookies messaging platform",
    ],
  },
  "/legal/dpa": {
    title: "Data Processing Addendum — Trusted DPA, DPDPA 2023",
    description:
      "Data processing addendum (DPA) for SMSLocal — how we process personal data on your behalf under India's DPDP Act, 2023 and international frameworks.",
    focusKeyword: "data processing addendum",
    keywords: [
      "data processing addendum",
      "DPA agreement SaaS",
      "SMSLocal DPA",
      "GDPR DPA SMS",
      "DPDP Act processor agreement",
      "data processor agreement",
    ],
  },
  "/legal/dpdpa": {
    title: "DPDPA Notice — Trusted Data Principal Rights, 2023",
    description:
      "DPDPA notice from SMSLocal — a plain-language explanation under India's Digital Personal Data Protection Act, 2023 of how we handle your data and your rights.",
    focusKeyword: "DPDPA notice",
    keywords: [
      "DPDPA notice",
      "DPDP Act 2023",
      "Digital Personal Data Protection Act",
      "Data Principal rights",
      "DPDPA compliance",
      "DPDPA SMS messaging",
      "Indian privacy law",
    ],
  },
  "/legal/privacy": {
    title: "Privacy Policy — Trusted Data Protection, DPDPA 2023",
    description:
      "Privacy policy for SMSLocal — how we collect, use, and safeguard personal data in line with India's DPDP Act, 2023, TRAI rules, and global best practices.",
    focusKeyword: "privacy policy",
    keywords: [
      "privacy policy",
      "privacy policy SMS",
      "DPDP Act 2023 compliance",
      "data privacy India",
      "personal data messaging",
      "TRAI privacy SMS",
      "GDPR privacy SaaS",
    ],
  },
  "/legal/terms": {
    title: "Terms of Service — Trusted SMSLocal Agreement, 2026",
    description:
      "Terms of service for SMSLocal — the agreement that governs your use of the platform: account responsibilities, acceptable use, fees, and liability limits.",
    focusKeyword: "terms of service",
    keywords: [
      "terms of service",
      "SMS terms of service",
      "messaging platform terms",
      "SMS service agreement",
      "SaaS terms India",
      "bulk SMS service agreement",
    ],
  },
}

/** Ordered list of every registered path. Handy for the /dev/seo dashboard. */
export const SEO_PATHS = Object.keys(SEO_REGISTRY) as ReadonlyArray<
  keyof typeof SEO_REGISTRY
>
