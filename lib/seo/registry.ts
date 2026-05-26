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
    title: "SMS Pricing in India — Plans from ₹0.09, Trusted",
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
  "/products/otp-sms": {
    title: "OTP SMS API India — Sub-1s, Trusted Delivery",
    description:
      "OTP SMS in India with priority routing and sub-second delivery on every Indian operator — DLT-compliant templates, signed webhooks, and ₹60 free credit.",
    focusKeyword: "OTP SMS",
    keywords: [
      "OTP SMS",
      "OTP API India",
      "SMS OTP service",
      "two factor authentication SMS",
      "OTP verification API",
      "login OTP API",
      "OTP SMS gateway",
      "priority OTP route India",
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
    title: "AI Agents for WhatsApp — Trusted, 8 Indian Languages",
    description:
      "AI agents for WhatsApp that reply in 8 Indian languages, 24/7 — deflect repeat queries, escalate to a human when needed, and cut first-response time fast.",
    focusKeyword: "AI agents",
    keywords: [
      "AI agents",
      "AI chatbot WhatsApp",
      "WhatsApp AI bot India",
      "multilingual WhatsApp chatbot",
      "Hindi WhatsApp bot",
      "AI customer support WhatsApp",
      "WhatsApp ChatGPT bot",
      "WhatsApp auto reply bot",
    ],
  },

  // ─── Solutions ���───────────────────────────────────────────────────────────
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
    title: "SMS & WhatsApp for Real Estate India",
    description:
      "Property alerts, open-house invites, lead nurture, and client follow-up — via DLT-compliant SMS and WhatsApp in regional languages. ₹60 free credit.",
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
    title: "SMS & WhatsApp for Retail & Hospitality India",
    description:
      "Loyalty programmes, reservation confirmations, flash sales, and guest messaging — DLT-compliant SMS and WhatsApp. ₹60 free credit.",
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
    title: "Compare SMSLocal to Other Messaging Platforms",
    description:
      "Detailed feature and pricing comparisons of SMSLocal vs MSG91, Fast2SMS, WATI, AiSensy, Interakt, Gupshup, Twilio, and Textlocal.",
    focusKeyword: "SMS service comparison India",
    keywords: [
      "SMS service comparison India",
      "best SMS gateway India",
      "SMS provider comparison",
      "WhatsApp API comparison",
      "MSG91 alternative",
      "Twilio alternative India",
      "bulk SMS comparison India",
    ],
  },
  "/compare/smslocal-vs-aisensy": {
    title: "SMSLocal vs AiSensy — A Fair 2026 Comparison",
    description:
      "Honest side-by-side of SMSLocal and AiSensy. WhatsApp BSP pricing, chatbot builder, analytics, AI agents, and who should pick which.",
    focusKeyword: "AiSensy alternative",
    keywords: [
      "AiSensy alternative",
      "SMSLocal vs AiSensy",
      "AiSensy pricing",
      "AiSensy review",
      "AiSensy vs WATI",
      "WhatsApp BSP comparison",
      "WhatsApp chatbot builder alternative",
    ],
  },
  "/compare/smslocal-vs-fast2sms": {
    title: "SMSLocal vs Fast2SMS — A Fair 2026 Comparison",
    description:
      "Honest side-by-side of SMSLocal and Fast2SMS. Route quality, DLT handling, WhatsApp coverage, API maturity, and who should pick which.",
    focusKeyword: "Fast2SMS alternative",
    keywords: [
      "Fast2SMS alternative",
      "SMSLocal vs Fast2SMS",
      "Fast2SMS pricing",
      "Fast2SMS review",
      "Fast2SMS vs MSG91",
      "cheap bulk SMS India",
      "bulk SMS comparison India",
    ],
  },
  "/compare/smslocal-vs-gupshup": {
    title: "SMSLocal vs Gupshup — A Fair 2026 Comparison",
    description:
      "Honest side-by-side of SMSLocal and Gupshup. Enterprise WhatsApp, AI agents, onboarding speed, pricing, and who should pick which.",
    focusKeyword: "Gupshup alternative",
    keywords: [
      "Gupshup alternative",
      "SMSLocal vs Gupshup",
      "Gupshup pricing",
      "Gupshup WhatsApp pricing",
      "Gupshup review",
      "Gupshup vs Twilio",
      "enterprise WhatsApp BSP",
    ],
  },
  "/compare/smslocal-vs-interakt": {
    title: "SMSLocal vs Interakt — A Fair 2026 Comparison",
    description:
      "Honest side-by-side of SMSLocal and Interakt. D2C commerce integrations, WhatsApp catalogues, journeys, and who should pick which.",
    focusKeyword: "Interakt alternative",
    keywords: [
      "Interakt alternative",
      "SMSLocal vs Interakt",
      "Interakt pricing",
      "Interakt review",
      "Interakt vs WATI",
      "Shopify WhatsApp app",
      "WhatsApp D2C commerce platform",
    ],
  },
  "/compare/smslocal-vs-msg91": {
    title: "SMSLocal vs MSG91 — A Fair 2026 Comparison",
    description:
      "Honest feature and pricing breakdown of SMSLocal vs MSG91. Where each platform wins, who should pick which, and how pricing compares in INR.",
    focusKeyword: "MSG91 alternative",
    keywords: [
      "MSG91 alternative",
      "SMSLocal vs MSG91",
      "MSG91 pricing",
      "MSG91 review",
      "MSG91 vs Twilio",
      "MSG91 vs Fast2SMS",
      "Indian CPaaS comparison",
    ],
  },
  "/compare/smslocal-vs-textlocal": {
    title: "SMSLocal vs Textlocal — A Fair 2026 Comparison",
    description:
      "Honest side-by-side of SMSLocal and Textlocal. API depth, WhatsApp readiness, modern DX, AI agents, and who should pick which.",
    focusKeyword: "Textlocal alternative",
    keywords: [
      "Textlocal alternative",
      "SMSLocal vs Textlocal",
      "Textlocal pricing",
      "Textlocal review",
      "Textlocal India",
      "Textlocal vs MSG91",
      "Textlocal WhatsApp",
    ],
  },
  "/compare/smslocal-vs-twilio": {
    title: "SMSLocal vs Twilio — A Fair 2026 Comparison",
    description:
      "Honest side-by-side of SMSLocal and Twilio for Indian buyers. INR pricing, India routes, DLT-native workflows, WhatsApp depth, and who should pick which.",
    focusKeyword: "Twilio alternative India",
    keywords: [
      "Twilio alternative India",
      "SMSLocal vs Twilio",
      "Twilio India pricing",
      "Twilio SMS India",
      "Twilio DLT compliance",
      "Twilio vs MSG91",
      "cheaper Twilio India",
    ],
  },
  "/compare/smslocal-vs-wati": {
    title: "SMSLocal vs WATI — A Fair 2026 Comparison",
    description:
      "Honest side-by-side of SMSLocal and WATI. Pay-as-you-go vs flat-fee pricing, team inbox depth, AI agents, and who should pick which.",
    focusKeyword: "WATI alternative",
    keywords: [
      "WATI alternative",
      "SMSLocal vs WATI",
      "WATI pricing",
      "WATI review",
      "WATI WhatsApp",
      "WhatsApp team inbox India",
      "WhatsApp shared inbox alternative",
    ],
  },

  // ─── Developers ───────────────────────────────────────────────────────────
  "/developers": {
    title: "Developer Hub — SMS, WhatsApp, OTP APIs",
    description:
      "REST APIs, SDKs for PHP, Java, Python, Node.js, C#, JavaScript, webhooks, and sandbox mode. Full developer docs for SMS, WhatsApp, and OTP.",
    focusKeyword: "SMS API India",
    keywords: [
      "SMS API India",
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
    title: "API Reference — Send SMS, Check Delivery, Manage Credits",
    description:
      "Full HTTP API reference for SMSLocal. Send DLT-compliant SMS, fetch delivery reports, and check credits with cURL, Node, and Python examples.",
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
    title: "Quickstart — Send your first SMS in 5 minutes",
    description:
      "Go from zero to your first delivered SMS in five minutes. Covers signup, DLT setup, API key generation, and the exact cURL, Node, and Python snippets you need.",
    focusKeyword: "send SMS API tutorial",
    keywords: [
      "send SMS API tutorial",
      "SMS API quickstart",
      "send SMS Node.js",
      "send SMS Python",
      "SMS API integration",
      "SMS API getting started",
      "DLT setup guide",
      "send SMS curl",
    ],
  },
  "/developers/sms-api": {
    title: "SMS API for Business Messaging — Developer-Friendly REST API",
    description:
      "Automate business messaging with the SMSLocal SMS API. DLT-compliant, 98%+ delivery, and integrations for REST, SMTP, SDKs, Excel, and every major CRM.",
    focusKeyword: "SMS API for business",
    keywords: [
      "SMS API for business",
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
    title: "XML API Reference — Send SMS via XML",
    description:
      "XML API reference for SMSLocal. Send DLT-compliant SMS, fetch delivery reports, and check credits using XML requests — ideal for legacy and XML-centric stacks.",
    focusKeyword: "XML SMS API",
    keywords: [
      "XML SMS API",
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
    title: "Blog — Messaging, compliance, and developer guides",
    description:
      "Practical guides on SMS, WhatsApp, and AI messaging for Indian businesses — compliance, delivery, developer recipes, and honest product notes.",
    focusKeyword: "SMS marketing blog India",
    keywords: [
      "SMS marketing blog India",
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
    title: "Customer Stories — Indian businesses shipping with SMSLocal",
    description:
      "How fintech, D2C, and EdTech teams ship with SMSLocal — case studies with hard benchmarks, named leaders, and before/after metrics.",
    focusKeyword: "SMS case studies India",
    keywords: [
      "SMS case studies India",
      "WhatsApp Business case study",
      "SMS marketing case study",
      "SMSLocal customer stories",
      "OTP success stories",
      "fintech SMS case study",
      "D2C WhatsApp case study",
      "EdTech SMS case study",
    ],
  },
  "/resources/glossary": {
    title: "Messaging Glossary — SMS, WhatsApp & DLT Terms",
    description:
      "Plain-English definitions for every term that matters in Indian messaging — DLT, PE, BSP, template, DLR, MAU, scrubbing and more. India-specific.",
    focusKeyword: "SMS glossary India",
    keywords: [
      "SMS glossary India",
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
    title: "Help Centre — Documentation & Guides",
    description:
      "Step-by-step guides for SMS, WhatsApp, OTP, DLT registration, and platform features. Search thousands of answers from SMSLocal support.",
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
    title: "SMS Tools — Free utilities for Indian messaging",
    description:
      "Free SMS utilities for Indian businesses: send SMS with ₹60 credit, learn the legal alternatives to SMS bombing, and compose messages the right way.",
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
    title: "Free SMS (No Credit Card) — ₹60 Credit on Signup",
    description:
      "Send free SMS to Indian numbers with ₹60 signup credits, pay-as-you-go from ₹0.1050 / SMS, and no credit card. DLT-compliant and live in minutes.",
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
    title: "SMS Bomber in India — Illegal, and What to Use Instead",
    description:
      "SMS bombing is illegal in India under the IT Act, TCCCPR 2018, and DPDPA. What it is, the consequences for senders, and the legal high-volume alternative.",
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
    title: "Long SMS Messages — Concatenation & Character Limits",
    description:
      "A full guide to long SMS in India: how concatenation works, GSM-7 vs UCS-2 limits, segment counts, pricing, and DLT template rules.",
    type: "article",
    publishedTime: "2026-02-10T00:00:00.000Z",
    modifiedTime: "2026-04-22T00:00:00.000Z",
    authors: ["SMSLocal Team"],
    focusKeyword: "SMS character limit",
    keywords: [
      "SMS character limit",
      "long SMS messages",
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
    title: "About — India's messaging platform since 2019",
    description:
      "SMSLocal is India's complete SMS, WhatsApp, and AI messaging platform. Built for Indian businesses since 2019. DLT-compliant, scalable, developer-ready.",
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
    title: "Careers — Build messaging infrastructure for India",
    description:
      "Join a small, opinionated team building India's messaging platform. Engineering, operations, carrier relations, and GTM — remote-first, Bengaluru-optional.",
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
    title: "Contact — Talk to sales or support",
    description:
      "Reach the SMSLocal team for enterprise sales, DLT onboarding, integration help, partnerships, or press. We respond within one business day.",
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
    title: "Acceptable Use Policy — What you can send on SMSLocal",
    description:
      "The categories of content and behaviour that are not allowed on the SMSLocal platform, and the enforcement actions we take.",
    focusKeyword: "SMS acceptable use policy",
    keywords: [
      "SMS acceptable use policy",
      "SMSLocal AUP",
      "SMS AUP India",
      "prohibited SMS content",
      "messaging platform rules",
      "bulk SMS terms",
    ],
  },
  "/legal/cookie-policy": {
    title: "Cookie Policy — How SMSLocal uses cookies",
    description:
      "How SMSLocal uses cookies and similar technologies on smslocal.in. Covers strictly-necessary, preference, analytics, and advertising cookies.",
    focusKeyword: "SMSLocal cookie policy",
    keywords: [
      "SMSLocal cookie policy",
      "cookie policy India",
      "website cookies policy",
      "DPDPA cookie consent",
      "tracking cookies SaaS",
      "cookies messaging platform",
    ],
  },
  "/legal/dpa": {
    title: "Data Processing Addendum — SMSLocal DPA",
    description:
      "The SMSLocal Data Processing Addendum (DPA) covers how we process personal data on your behalf under the DPDP Act, 2023 and international frameworks.",
    focusKeyword: "data processing addendum India",
    keywords: [
      "data processing addendum India",
      "DPA agreement SaaS",
      "SMSLocal DPA",
      "GDPR DPA SMS",
      "DPDP Act processor agreement",
      "data processor agreement",
    ],
  },
  "/legal/dpdpa": {
    title: "DPDPA Notice — Your rights as a Data Principal",
    description:
      "Plain-language notice under India's Digital Personal Data Protection Act, 2023 on how SMSLocal handles your data and your rights as a Data Principal.",
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
    title: "Privacy Policy — How SMSLocal protects your data",
    description:
      "How SMSLocal collects, uses, and safeguards personal data in line with India's DPDP Act, 2023, TRAI regulations, and international best practices.",
    focusKeyword: "SMSLocal privacy policy",
    keywords: [
      "SMSLocal privacy policy",
      "privacy policy SMS",
      "DPDP Act 2023 compliance",
      "data privacy India",
      "personal data messaging",
      "TRAI privacy SMS",
      "GDPR privacy SaaS",
    ],
  },
  "/legal/refund-policy": {
    title: "Refund and Cancellation Policy",
    description:
      "When SMSLocal wallet balance is refundable, how we handle disputes, and the timelines for processing refunds to Indian and international customers.",
    focusKeyword: "SMSLocal refund policy",
    keywords: [
      "SMSLocal refund policy",
      "SMS refund policy",
      "SMS wallet refund",
      "prepaid SMS refund",
      "cancellation policy SaaS",
      "messaging credit refund",
    ],
  },
  "/legal/terms": {
    title: "Terms of Service — SMSLocal Messaging Platform",
    description:
      "The agreement that governs your use of SMSLocal, including account responsibilities, acceptable use, fees, and liability limits.",
    focusKeyword: "SMSLocal terms of service",
    keywords: [
      "SMSLocal terms of service",
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
