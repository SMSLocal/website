export type GlossaryCategorySlug =
  | "compliance"
  | "sms"
  | "whatsapp"
  | "otp"
  | "routing"
  | "api"
  | "billing"
  | "ai"

export type GlossaryCategory = {
  slug: GlossaryCategorySlug
  title: string
  shortLabel: string
  description: string
}

export type GlossaryTerm = {
  slug: string
  term: string
  abbr?: string
  category: GlossaryCategorySlug
  shortDef: string
  longDef: string
  example?: string
  aliases?: string[]
  relatedSlugs?: string[]
  source?: { label: string; href: string }
}

export const GLOSSARY_CATEGORIES: GlossaryCategory[] = [
  {
    slug: "compliance",
    title: "Compliance & DLT",
    shortLabel: "Compliance",
    description: "TRAI, DLT, consent and scrubbing vocabulary for India.",
  },
  {
    slug: "sms",
    title: "SMS",
    shortLabel: "SMS",
    description: "Message types, encoding, segmentation and delivery.",
  },
  {
    slug: "whatsapp",
    title: "WhatsApp Business",
    shortLabel: "WhatsApp",
    description: "BSP, templates, sessions and number quality.",
  },
  {
    slug: "otp",
    title: "OTP & Authentication",
    shortLabel: "OTP & Auth",
    description: "OTP, 2FA, retries and fallbacks.",
  },
  {
    slug: "routing",
    title: "Delivery & Routing",
    shortLabel: "Routing",
    description: "Operators, SMPP, DLRs and throughput.",
  },
  {
    slug: "api",
    title: "API & Integration",
    shortLabel: "API",
    description: "Webhooks, SDKs, sandboxes and message IDs.",
  },
  {
    slug: "billing",
    title: "Pricing & Billing",
    shortLabel: "Billing",
    description: "Wallets, invoicing, GST and credits.",
  },
  {
    slug: "ai",
    title: "AI Agents",
    shortLabel: "AI",
    description: "Intents, handoff, guardrails and knowledge bases.",
  },
]

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  // ---------- Compliance & DLT ----------
  {
    slug: "dlt",
    term: "DLT",
    abbr: "Distributed Ledger Technology",
    category: "compliance",
    shortDef:
      "India's blockchain-based registration system for commercial SMS senders, mandated by TRAI.",
    longDef:
      "DLT is the operator-run registration platform where every business that wants to send commercial SMS in India has to register its identity, sender header and every message template. Each approved template gets a unique Template ID that has to be sent with the message. Without DLT approval, SMS either fails or gets scrubbed at the operator.",
    aliases: ["TRAI DLT", "Blockchain DLT"],
    relatedSlugs: ["pe", "tm", "template-id", "header", "tcccpr"],
  },
  {
    slug: "pe",
    term: "Principal Entity",
    abbr: "PE",
    category: "compliance",
    shortDef:
      "The business — the actual brand sending SMS — registered on a DLT operator portal.",
    longDef:
      "The Principal Entity is you: the company whose name will appear on the receipt and whose customers are getting messages. You register once on any of the operator DLT portals (Vodafone-Idea, Airtel, Jio or BSNL) and the registration is mirrored across all of them. You'll submit PAN, GST, incorporation and authorised-signatory documents.",
    relatedSlugs: ["dlt", "tm", "header"],
  },
  {
    slug: "tm",
    term: "Telemarketer",
    abbr: "TM",
    category: "compliance",
    shortDef:
      "The messaging platform or aggregator that actually delivers SMS for a Principal Entity.",
    longDef:
      "The Telemarketer is the registered sender platform — SMSLocal is a registered TM. The PE links its headers and templates to one or more TMs on DLT, which is how traffic gets routed and audited. A PE can work with multiple TMs in parallel.",
    relatedSlugs: ["dlt", "pe"],
  },
  {
    slug: "header",
    term: "Header",
    category: "compliance",
    shortDef:
      "The six-character alphanumeric sender ID that shows up on the recipient's phone.",
    longDef:
      "Every SMS in India displays a header instead of a phone number — something like HDFCBK or VKAMZN. Headers are registered on DLT against a Principal Entity, tagged as promotional, transactional, service-implicit or service-explicit, and can only be used for that category of traffic.",
    aliases: ["Sender ID", "Sender header"],
    example: "HDFCBK for HDFC Bank transactional, VKAMZN for Amazon service-implicit.",
    relatedSlugs: ["dlt", "pe", "promotional", "transactional"],
  },
  {
    slug: "template-id",
    term: "Template ID",
    abbr: "TID",
    category: "compliance",
    shortDef: "A unique DLT identifier for an approved SMS content template.",
    longDef:
      "When you submit a content template on DLT and it's approved, you get a 19-digit Template ID. You have to pass this ID with every send, and the message body has to match the approved template character-for-character except for the variable slots. Using the wrong Template ID is the #1 reason SMS shows 'submitted' but never 'delivered'.",
    relatedSlugs: ["dlt", "content-template", "variable"],
  },
  {
    slug: "content-template",
    term: "Content template",
    category: "compliance",
    shortDef:
      "The pre-approved body of an SMS, with variable slots for dynamic data like names or amounts.",
    longDef:
      "Content templates are submitted to DLT with placeholders like {#var#} for dynamic fields. Once approved, the fixed portion cannot change on any send — only the variable values fill in. Templates are categorised as promotional, transactional, service-implicit or service-explicit, and you can only send on routes that match the category.",
    relatedSlugs: ["template-id", "variable", "promotional", "transactional"],
  },
  {
    slug: "consent-template",
    term: "Consent template",
    category: "compliance",
    shortDef:
      "A DLT-approved message body used to collect explicit consent from a subscriber.",
    longDef:
      "Consent templates are a separate category on DLT used when you ask a user to opt in to promotional messaging. The subscriber replies YES to confirm, and the consent is logged on the ledger and tied to the header. You need this trail before you can send promotional SMS to the number.",
    relatedSlugs: ["content-template", "promotional", "dnd"],
  },
  {
    slug: "promotional",
    term: "Promotional SMS",
    category: "compliance",
    shortDef: "Marketing SMS — offers, discounts, product announcements.",
    longDef:
      "Promotional SMS is anything commercial that isn't triggered by a user action — campaign broadcasts, festival offers, product launches. It can only go to numbers not registered on NCPR (DND), can only be sent between 9am and 9pm IST, and requires consent under TCCCPR.",
    relatedSlugs: ["transactional", "dnd", "ncpr", "tcccpr", "consent-template"],
  },
  {
    slug: "transactional",
    term: "Transactional SMS",
    category: "compliance",
    shortDef: "Action-triggered SMS like OTPs, delivery updates and alerts.",
    longDef:
      "Transactional messages are triggered by a user action — an OTP, a payment confirmation, a delivery alert. They can be sent 24×7 and override DND on the recipient's number, but only if the content actually qualifies as transactional under TRAI rules. Sending marketing content on a transactional route is a fast way to lose your header.",
    relatedSlugs: ["promotional", "service-implicit", "service-explicit", "otp"],
  },
  {
    slug: "service-implicit",
    term: "Service-implicit",
    category: "compliance",
    shortDef:
      "Messages sent as part of a service the customer has already paid for or opted into.",
    longDef:
      "Service-implicit messages are things like an order shipment update, an account statement, a renewal reminder. There's no need for separate promotional consent because the customer has already bought the product or enrolled in the service. Still subject to time-of-day rules where applicable.",
    relatedSlugs: ["service-explicit", "transactional"],
  },
  {
    slug: "service-explicit",
    term: "Service-explicit",
    category: "compliance",
    shortDef:
      "Service messages with an explicit promotional tone, requiring opt-in consent.",
    longDef:
      "Service-explicit sits between transactional and promotional — it's service-related but has a marketing flavour, like a 'renew now and save 20%' reminder. It needs explicit consent, stays within 9am–9pm, and honours DND. Operators flag misclassification aggressively.",
    relatedSlugs: ["service-implicit", "promotional"],
  },
  {
    slug: "dnd",
    term: "DND",
    abbr: "Do Not Disturb",
    category: "compliance",
    shortDef:
      "A subscriber preference registered with the operator to block commercial messages.",
    longDef:
      "Any subscriber can activate DND by SMS to 1909 or via the DND app, choosing to block all commercial traffic or specific categories like banking, real estate or education. DND numbers still receive transactional SMS but not promotional. Sender-side DND scrubbing is standard on every SMSLocal campaign.",
    aliases: ["DND scrub"],
    relatedSlugs: ["ncpr", "scrubbing", "promotional"],
  },
  {
    slug: "ncpr",
    term: "NCPR",
    abbr: "National Customer Preference Register",
    category: "compliance",
    shortDef: "TRAI's master registry of subscribers who've opted out of commercial SMS.",
    longDef:
      "NCPR (sometimes still called NDNC, the older name) is the single source of truth for DND. Every TM scrubs outbound lists against NCPR before delivery. Operators also re-scrub on their side, so sending to a DND number costs you both the credit and a compliance strike.",
    aliases: ["NDNC"],
    relatedSlugs: ["dnd", "scrubbing"],
  },
  {
    slug: "scrubbing",
    term: "Scrubbing",
    category: "compliance",
    shortDef:
      "The process of filtering a contact list against DND and other suppression rules before send.",
    longDef:
      "Scrubbing happens in two places: sender-side (your platform checks NCPR, internal opt-outs, and bad-number lists before queuing) and operator-side (the carrier checks again before delivery). Good sender-side scrubbing means fewer drops at the operator and cleaner dashboards.",
    relatedSlugs: ["dnd", "ncpr"],
  },
  {
    slug: "tcccpr",
    term: "TCCCPR",
    abbr: "Telecom Commercial Communications Customer Preference Regulations",
    category: "compliance",
    shortDef: "The TRAI regulation that governs all commercial SMS and voice in India.",
    longDef:
      "TCCCPR 2018 (with subsequent amendments) is the rule-book for DLT, consent, scrubbing, time-of-day windows and penalties. It's why India's SMS ecosystem is among the most regulated in the world, and why DLT compliance is non-negotiable.",
    source: {
      label: "TRAI TCCCPR 2018",
      href: "https://www.trai.gov.in/sites/default/files/RegulationUcc19072018.pdf",
    },
    relatedSlugs: ["dlt", "dnd", "ncpr"],
  },
  {
    slug: "dpdpa",
    term: "DPDPA",
    abbr: "Digital Personal Data Protection Act",
    category: "compliance",
    shortDef: "India's 2023 data-protection law covering customer contact data.",
    longDef:
      "DPDPA governs how businesses collect, store and use personal data — including the phone numbers you message. Consent must be specific, informed and revocable; breaches trigger fines up to ₹250 crore. It overlays TCCCPR for commercial messaging.",
    relatedSlugs: ["tcccpr", "consent-template"],
  },

  // ---------- SMS ----------
  {
    slug: "sms",
    term: "SMS",
    abbr: "Short Message Service",
    category: "sms",
    shortDef: "The 160-character (GSM-7) text-message protocol on every mobile network.",
    longDef:
      "SMS is the universal messaging protocol — works on any phone with a SIM, doesn't need the internet, and is still the highest-reach channel in India. One SMS is up to 160 characters in GSM-7 encoding; Unicode SMS (for Indic scripts) is capped at 70 characters per segment.",
    relatedSlugs: ["segment", "gsm-7", "unicode", "smpp"],
  },
  {
    slug: "segment",
    term: "Segment",
    category: "sms",
    shortDef: "One billable unit of SMS — 160 GSM-7 characters or 70 Unicode characters.",
    longDef:
      "If your message body exceeds one segment, the operator splits it and charges per segment, and the phone stitches them back together on arrival. A 161-character message in GSM-7 costs 2 segments, not 1. Concatenated SMS (long SMS) uses 153 and 67 characters per segment respectively because of the header overhead.",
    relatedSlugs: ["gsm-7", "unicode", "sms"],
  },
  {
    slug: "gsm-7",
    term: "GSM-7",
    category: "sms",
    shortDef:
      "The default 7-bit character encoding for SMS, giving 160 characters per segment.",
    longDef:
      "GSM-7 covers basic Latin letters, numbers, common punctuation and a small extended set (characters like {, }, [, ], ^, ~, | cost 2 characters each). Any character outside this set forces the entire message into Unicode.",
    relatedSlugs: ["unicode", "segment"],
  },
  {
    slug: "unicode",
    term: "Unicode SMS",
    category: "sms",
    shortDef:
      "UCS-2 encoding for non-Latin scripts — 70 characters per segment instead of 160.",
    longDef:
      "Hindi, Tamil, Bengali, Gujarati and every other Indic script uses Unicode. One Unicode character = one UCS-2 code point = 2 bytes. Adding a single Devanagari character to an English message halves your segment size and doubles your cost.",
    relatedSlugs: ["gsm-7", "segment", "sms"],
  },
  {
    slug: "variable",
    term: "Variable",
    category: "sms",
    shortDef: "A placeholder in a DLT-approved template, usually written as {#var#}.",
    longDef:
      "Variables are the dynamic parts of a template — the name, the OTP, the amount, the order ID. On DLT, the fixed text is locked but you can substitute any value into a variable. Some operators cap variable length; overflow is a common silent-failure cause.",
    relatedSlugs: ["content-template", "template-id"],
  },
  {
    slug: "short-code",
    term: "Short code",
    category: "sms",
    shortDef: "A 5- or 6-digit number used for two-way SMS, typically for keywords and OTP replies.",
    longDef:
      "Short codes like 57575 or 567678 are leased from operators and used for incoming SMS — voting, polls, OTP verification, subscribe/unsubscribe keywords. They're more expensive than long codes but deliver better on all operators.",
    relatedSlugs: ["long-code", "two-way"],
  },
  {
    slug: "long-code",
    term: "Long code",
    category: "sms",
    shortDef:
      "A regular 10-digit number used for two-way SMS, usually as a virtual mobile number.",
    longDef:
      "Long codes are 10-digit numbers (like +91 7042 000000) that can receive SMS just like a regular mobile. Cheaper than short codes, but per-operator delivery is patchier — best for low-volume two-way flows.",
    relatedSlugs: ["short-code", "two-way"],
  },
  {
    slug: "two-way",
    term: "Two-way SMS",
    category: "sms",
    shortDef: "An SMS setup where the recipient can reply and the reply hits your application.",
    longDef:
      "Two-way SMS combines an outbound send with an inbound keyword handler. Users reply with STOP, YES, a coupon code or a number, and the reply arrives via webhook. Commonly used for subscribe/unsubscribe, feedback and polls.",
    relatedSlugs: ["short-code", "long-code", "webhook"],
  },
  {
    slug: "flash-sms",
    term: "Flash SMS",
    category: "sms",
    shortDef: "An SMS that displays directly on the lock screen without being saved.",
    longDef:
      "Flash SMS (Class 0 SMS) is useful for urgent OTPs and alerts — the user sees it immediately and can't miss it, but it vanishes without being stored. Supported unevenly across devices and operators; not recommended as a primary channel.",
    relatedSlugs: ["otp", "sms"],
  },

  // ---------- WhatsApp ----------
  {
    slug: "bsp",
    term: "BSP",
    abbr: "Business Solution Provider",
    category: "whatsapp",
    shortDef: "A Meta-approved partner that provides access to the WhatsApp Business API.",
    longDef:
      "You can't connect to the WhatsApp Business API directly — you go through a BSP. SMSLocal is a BSP, which means we handle the Meta application, the number onboarding, the template approvals and the ongoing quality-rating management. BSP onboarding is the first step in going live on WhatsApp API.",
    relatedSlugs: ["wba", "template", "quality-rating"],
  },
  {
    slug: "wba",
    term: "WhatsApp Business API",
    abbr: "WABA",
    category: "whatsapp",
    shortDef:
      "Meta's programmatic interface for businesses to send WhatsApp messages at scale.",
    longDef:
      "The WABA is the paid, high-volume version of WhatsApp for business. Unlike the free WhatsApp Business app, it has no user interface of its own — you connect through a BSP, get a Meta-verified number, and send via templates and session messages. Billing is per conversation, not per message.",
    aliases: ["WhatsApp API"],
    relatedSlugs: ["bsp", "template", "conversation", "session"],
  },
  {
    slug: "template",
    term: "WhatsApp template",
    category: "whatsapp",
    shortDef:
      "A pre-approved WhatsApp message format required to start a conversation outside the 24-hour window.",
    longDef:
      "Templates are pre-written messages — header, body, footer, optional buttons — that Meta reviews and approves. You can only send templates to start a conversation with a user; after they reply, you have 24 hours to send any freeform message. Templates come in four categories: marketing, utility, authentication and service.",
    relatedSlugs: ["template-category", "session", "conversation", "wba"],
  },
  {
    slug: "template-category",
    term: "Template category",
    category: "whatsapp",
    shortDef: "Marketing, Utility, Authentication or Service — determines pricing and rules.",
    longDef:
      "Meta re-classifies every template into one of four categories when it approves it. Authentication templates carry OTP language; utility templates handle transactional updates; marketing is everything commercial; service is started by the user. Category affects what the conversation costs.",
    relatedSlugs: ["template", "conversation"],
  },
  {
    slug: "session",
    term: "Session message",
    category: "whatsapp",
    shortDef: "A freeform WhatsApp message sent within the 24-hour customer service window.",
    longDef:
      "When a user sends you a WhatsApp message, a 24-hour session opens. During that window you can reply with any freeform content — text, images, documents, quick replies — without needing a template. Outside the window, you need a template to re-engage.",
    aliases: ["Session"],
    relatedSlugs: ["window-24h", "template", "conversation"],
  },
  {
    slug: "window-24h",
    term: "24-hour window",
    category: "whatsapp",
    shortDef:
      "The rolling 24 hours after a user message during which you can reply freeform.",
    longDef:
      "Every inbound user message opens or extends a 24-hour window. Within this window, freeform session messages are allowed. The clock resets every time the user sends another message. Outside the window, you're back to templates.",
    relatedSlugs: ["session", "template"],
  },
  {
    slug: "conversation",
    term: "Conversation (WhatsApp)",
    category: "whatsapp",
    shortDef:
      "A 24-hour billing unit on the WhatsApp API — priced by template category.",
    longDef:
      "Meta bills conversations, not messages. A conversation opens the first time you or the user sends a message and lasts 24 hours. Inside that window, unlimited messages are included. Marketing, utility, authentication and service conversations each have their own price.",
    relatedSlugs: ["template-category", "session", "window-24h"],
  },
  {
    slug: "quality-rating",
    term: "Quality rating",
    category: "whatsapp",
    shortDef:
      "Meta's health score for your WhatsApp number — Green, Yellow or Red.",
    longDef:
      "Quality rating is driven by user feedback: blocks, reports and low read rates drag it down. Green is healthy; Yellow is warning; Red can throttle your sending rate or suspend the number. It's the single most important thing to watch on a production WhatsApp number.",
    relatedSlugs: ["number-tier", "template"],
  },
  {
    slug: "number-tier",
    term: "Number tier",
    category: "whatsapp",
    shortDef:
      "Meta's daily-send limit bucket for your WhatsApp number — 250, 1k, 10k, 100k or unlimited.",
    longDef:
      "New WhatsApp numbers start in Tier 1 (1,000 unique users/24h). As your quality rating stays Green and volume grows, Meta automatically upgrades you to Tier 2, 3 and eventually unlimited. A Red rating can drop you back down.",
    relatedSlugs: ["quality-rating", "wba"],
  },
  {
    slug: "green-tick",
    term: "Green tick",
    category: "whatsapp",
    shortDef:
      "The official business badge Meta awards to notable, verified brands on WhatsApp.",
    longDef:
      "The green tick is granted through an application process and is reserved for brands with significant public presence. It increases trust and tap-through on templates, but it's not required to run a WABA. Most businesses operate successfully without one.",
    aliases: ["Official Business Account", "OBA"],
    relatedSlugs: ["wba"],
  },

  // ---------- OTP ----------
  {
    slug: "otp",
    term: "OTP",
    abbr: "One-Time Password",
    category: "otp",
    shortDef: "A short-lived numeric or alphanumeric code used to verify a user.",
    longDef:
      "OTPs are the most common second factor in India — sign-ups, logins, payments, KYC all gate on them. Typical TTL is 5–10 minutes, typical length 4–6 digits. OTP SMS are classified as transactional and bypass DND, but the template language has to qualify under TRAI rules.",
    relatedSlugs: ["2fa", "totp", "transactional", "authentication-template"],
  },
  {
    slug: "2fa",
    term: "2FA",
    abbr: "Two-Factor Authentication",
    category: "otp",
    shortDef:
      "Authentication using two independent signals — typically a password plus an OTP.",
    longDef:
      "2FA covers any system where you combine two proofs: something you know (password), something you have (phone, authenticator, hardware key), something you are (biometric). SMS OTP is the most common 'have' factor in India, though authenticator apps and hardware keys are stronger.",
    aliases: ["Two-step verification"],
    relatedSlugs: ["otp", "mfa", "totp"],
  },
  {
    slug: "mfa",
    term: "MFA",
    abbr: "Multi-Factor Authentication",
    category: "otp",
    shortDef: "Authentication using two or more independent factors.",
    longDef:
      "MFA is the umbrella term for 2FA and anything beyond. High-risk operations (wire transfers, large payments) sometimes combine three factors: password, OTP and biometric. In India, RBI mandates 2FA minimum for most financial transactions.",
    relatedSlugs: ["2fa", "otp"],
  },
  {
    slug: "totp",
    term: "TOTP",
    abbr: "Time-based One-Time Password",
    category: "otp",
    shortDef:
      "OTP generated by an authenticator app from a shared secret and the current time.",
    longDef:
      "TOTP is what Google Authenticator, Authy and hardware keys produce. A shared secret plus the current 30-second time window generates a 6-digit code. More secure than SMS OTP because it's phishing-resistant and doesn't rely on SIM possession.",
    relatedSlugs: ["hotp", "otp", "2fa"],
  },
  {
    slug: "hotp",
    term: "HOTP",
    abbr: "HMAC-based One-Time Password",
    category: "otp",
    shortDef: "OTP generated by a counter that increments on each use.",
    longDef:
      "HOTP is the counter-based cousin of TOTP — used by some hardware tokens. Less common today; most OTP implementations are either SMS, TOTP or push-based.",
    relatedSlugs: ["totp", "otp"],
  },
  {
    slug: "authentication-template",
    term: "Authentication template",
    category: "otp",
    shortDef:
      "A WhatsApp template type specifically designed for OTP-style verification flows.",
    longDef:
      "Meta added a dedicated authentication category in 2023. Authentication templates have a fixed layout with the OTP in a copy-code button and are priced lower than utility. Great for WhatsApp-first OTP, or as a fallback from SMS.",
    relatedSlugs: ["template-category", "otp", "wba"],
  },
  {
    slug: "idempotency",
    term: "Idempotency key",
    category: "otp",
    shortDef:
      "A unique request ID that guarantees an OTP send isn't duplicated on a retry.",
    longDef:
      "If your backend retries an OTP request after a network blip, you don't want the user getting two codes. An idempotency key — a UUID you generate per OTP attempt — lets the provider de-duplicate. SMSLocal honours idempotency keys for 24 hours.",
    relatedSlugs: ["otp", "webhook"],
  },
  {
    slug: "fallback",
    term: "OTP fallback",
    category: "otp",
    shortDef:
      "A secondary delivery route used when the primary OTP channel fails or times out.",
    longDef:
      "A mature OTP setup tries SMS first, and if it doesn't deliver within a few seconds, falls back to WhatsApp, voice call, or email. Fallback improves verification completion by several percentage points on flaky mobile networks.",
    relatedSlugs: ["otp", "authentication-template"],
  },

  // ---------- Routing & Delivery ----------
  {
    slug: "smpp",
    term: "SMPP",
    abbr: "Short Message Peer-to-Peer",
    category: "routing",
    shortDef:
      "The telecom-standard protocol for high-throughput SMS between aggregators and operators.",
    longDef:
      "SMPP is the wire protocol every serious SMS platform speaks to every operator SMSC. It's TCP-based, session-oriented, and supports binds for transmit, receive or both. Enterprise integrations sometimes expose SMPP directly for maximum throughput; most customers use HTTP APIs that wrap SMPP under the hood.",
    relatedSlugs: ["smsc", "throughput", "dlr"],
  },
  {
    slug: "smsc",
    term: "SMSC",
    abbr: "Short Message Service Centre",
    category: "routing",
    shortDef: "The operator's store-and-forward node that actually delivers SMS to a handset.",
    longDef:
      "Every operator runs an SMSC — it accepts messages from aggregators over SMPP, queues them, and delivers them to the recipient handset over the mobile network. DLRs come back from the SMSC too. SMSC capacity and latency are why routing matters.",
    relatedSlugs: ["smpp", "dlr", "throughput"],
  },
  {
    slug: "throughput",
    term: "Throughput",
    abbr: "TPS",
    category: "routing",
    shortDef: "Messages per second a route can sustain — the key capacity metric.",
    longDef:
      "Throughput is measured in messages per second (TPS). An aggregator might have 100 TPS on one operator and 500 on another. For high-volume events — IPL finals, Big Billion Day, election broadcasts — you pre-negotiate throughput to avoid queues.",
    relatedSlugs: ["smpp", "smsc"],
  },
  {
    slug: "dlr",
    term: "DLR",
    abbr: "Delivery Receipt",
    category: "routing",
    shortDef:
      "A status callback from the operator SMSC confirming what happened to a sent SMS.",
    longDef:
      "Every SMS gets a DLR: DELIVERED, UNDELIV, EXPIRED, REJECTD, FAILED and a handful more. The DLR is what flips a message from 'submitted' to a final status in your dashboard. Clean DLR handling is the difference between reporting that matters and reporting that looks good.",
    relatedSlugs: ["smpp", "smsc", "webhook"],
  },
  {
    slug: "operator",
    term: "Operator",
    category: "routing",
    shortDef:
      "A mobile carrier — Jio, Airtel, Vodafone-Idea, BSNL — that delivers SMS to its subscribers.",
    longDef:
      "In India, every mobile number belongs to an operator. Aggregators maintain SMPP binds to each operator's SMSC and route messages to the right one based on number portability data. Operator-level performance varies by circle, time of day and route type.",
    relatedSlugs: ["smsc", "route", "mnp"],
  },
  {
    slug: "route",
    term: "Route",
    category: "routing",
    shortDef: "A specific path from aggregator to operator, with its own pricing and throughput.",
    longDef:
      "Not all routes are equal. A 'premium' transactional route delivers faster and reports DLRs accurately; a 'bulk' promotional route is cheaper but slower. Most platforms abstract routes away, but for OTP traffic you want to know exactly which route you're on.",
    relatedSlugs: ["operator", "smpp", "throughput"],
  },
  {
    slug: "mnp",
    term: "MNP",
    abbr: "Mobile Number Portability",
    category: "routing",
    shortDef:
      "The ability for a subscriber to keep their number when switching operators.",
    longDef:
      "MNP complicates routing — a number with a Vodafone prefix may now be on Airtel. Aggregators query MNP databases in real time to route to the correct SMSC. Stale MNP data is a subtle cause of DLR failures.",
    relatedSlugs: ["operator", "route"],
  },
  {
    slug: "tps",
    term: "TPS",
    abbr: "Transactions Per Second",
    category: "routing",
    shortDef: "Same as throughput — the number of messages a route accepts per second.",
    longDef:
      "TPS is shorthand for SMPP submit_sm rate. Typical enterprise OTP routes run at 100–1,000 TPS per operator per bind; very large customers negotiate multiple binds in parallel.",
    relatedSlugs: ["throughput", "smpp"],
  },

  // ---------- API & Integration ----------
  {
    slug: "webhook",
    term: "Webhook",
    category: "api",
    shortDef:
      "An HTTP callback your server receives when something happens on the platform.",
    longDef:
      "Webhooks are how you get DLRs, inbound messages, and status events in real time — the platform POSTs JSON to a URL you expose. SMSLocal webhooks are signed with HMAC-SHA256 and retried with exponential backoff for 24 hours on 5xx responses.",
    relatedSlugs: ["dlr", "signature", "rest"],
  },
  {
    slug: "signature",
    term: "Webhook signature",
    category: "api",
    shortDef:
      "An HMAC hash on a webhook payload that proves it came from us and wasn't tampered with.",
    longDef:
      "We sign every webhook with HMAC-SHA256 using your signing secret; you re-compute the hash on your side and reject anything that doesn't match. Essential for webhooks that trigger state changes — payment confirmations, order updates, OTP verifications.",
    relatedSlugs: ["webhook"],
  },
  {
    slug: "rest",
    term: "REST API",
    category: "api",
    shortDef:
      "The HTTPS + JSON API for sending messages, reading reports and managing templates.",
    longDef:
      "SMSLocal's core API is REST with JSON over HTTPS. Each resource (messages, templates, contacts, campaigns) has standard verbs. Bearer-token auth, idempotency keys on writes, and OpenAPI-documented.",
    relatedSlugs: ["webhook", "sdk", "sandbox"],
  },
  {
    slug: "sdk",
    term: "SDK",
    abbr: "Software Development Kit",
    category: "api",
    shortDef:
      "An official client library that wraps the REST API for your language or framework.",
    longDef:
      "SDKs remove boilerplate — auth, retries, signature verification — and give you native types. SMSLocal ships SDKs for Node.js, Python, PHP, Java, .NET, Go and Ruby, plus community SDKs for Elixir and Rust.",
    relatedSlugs: ["rest", "webhook"],
  },
  {
    slug: "sandbox",
    term: "Sandbox",
    category: "api",
    shortDef:
      "A separate environment for testing sends without hitting real users or burning credits.",
    longDef:
      "Sandbox mode accepts the same API calls as production, simulates DLRs, and returns realistic latencies — but never reaches a real handset. Free to use, essential for CI. Every SMSLocal workspace has a sandbox key alongside its production key.",
    relatedSlugs: ["rest", "sdk", "webhook"],
  },
  {
    slug: "message-id",
    term: "Message ID",
    category: "api",
    shortDef:
      "A unique identifier returned when you submit a message, used to match DLRs and logs.",
    longDef:
      "Every accepted send gets a message_id immediately. You use it to correlate webhook DLRs, pull logs, or request a status refresh. Always log the message_id alongside your internal reference — it's the primary key when you're debugging.",
    relatedSlugs: ["dlr", "webhook", "rest"],
  },
  {
    slug: "rate-limit",
    term: "Rate limit",
    category: "api",
    shortDef:
      "The maximum number of API calls or sends accepted per second for your account.",
    longDef:
      "Every API has rate limits — some per endpoint, some per account. We return 429 with a Retry-After header when you exceed yours, and SDKs automatically back off. Talk to support before a launch so we can pre-raise your limit.",
    relatedSlugs: ["rest", "throughput"],
  },

  // ---------- Billing ----------
  {
    slug: "pay-as-you-go",
    term: "Pay-as-you-go",
    abbr: "PAYG",
    category: "billing",
    shortDef:
      "A pricing model where you only pay for messages sent, with no monthly commitment.",
    longDef:
      "PAYG is the default on SMSLocal — load ₹60 into a wallet, send messages, get charged per unit. No retainer, no per-seat fee, no lock-in. Auto-recharge keeps the wallet topped up for production accounts.",
    relatedSlugs: ["wallet", "auto-recharge", "credits"],
  },
  {
    slug: "wallet",
    term: "Wallet",
    category: "billing",
    shortDef:
      "Your prepaid credit balance on SMSLocal — used for SMS, OTP, WhatsApp and AI conversations.",
    longDef:
      "One wallet, one INR balance, all products. Every SMS segment, WhatsApp conversation or AI agent message draws from the same pot. Top up by card, UPI, NEFT, IMPS or invoice.",
    relatedSlugs: ["pay-as-you-go", "auto-recharge", "credits"],
  },
  {
    slug: "auto-recharge",
    term: "Auto-recharge",
    category: "billing",
    shortDef:
      "A rule that tops up your wallet automatically when it drops below a threshold.",
    longDef:
      "Set a floor (say ₹5,000) and a recharge amount (say ₹25,000) and the wallet refills itself when it hits the floor. Prevents production sends from bouncing mid-campaign because of an empty wallet.",
    relatedSlugs: ["wallet", "pay-as-you-go"],
  },
  {
    slug: "credits",
    term: "Credits",
    category: "billing",
    shortDef:
      "An alternative to wallet INR — some accounts buy credit packs with tiered pricing.",
    longDef:
      "Credit packs are useful for procurement-heavy customers who prefer to transact in units rather than currency. Internally, credits convert to INR at a fixed rate per product (e.g. 1 credit = 1 SMS segment on a specific route).",
    relatedSlugs: ["wallet", "pay-as-you-go"],
  },
  {
    slug: "gst-invoice",
    term: "GST invoice",
    category: "billing",
    shortDef:
      "A tax invoice issued in your registered business name with GSTIN, eligible for input credit.",
    longDef:
      "Every top-up and every month's usage generates a GST invoice with your GSTIN, HSN code and IGST/CGST+SGST split. Available as PDF immediately; downloadable in bulk from the billing portal.",
    relatedSlugs: ["wallet", "pay-as-you-go"],
  },
  {
    slug: "per-conversation",
    term: "Per-conversation pricing",
    category: "billing",
    shortDef:
      "WhatsApp's billing model — one price per 24-hour conversation, regardless of message count.",
    longDef:
      "Meta introduced per-conversation pricing in 2022. Each conversation is Marketing, Utility, Authentication or Service, and each category has its own rate. Within a conversation, message count is unlimited.",
    relatedSlugs: ["conversation", "template-category", "wba"],
  },

  // ---------- AI ----------
  {
    slug: "ai-agent",
    term: "AI agent",
    category: "ai",
    shortDef:
      "A conversational AI that handles customer messages on WhatsApp, trained on your knowledge base.",
    longDef:
      "An AI agent reads incoming messages, pulls context from your knowledge base, calls tools (place order, look up status, check stock), and replies in your brand voice. SMSLocal agents run on WhatsApp and the team inbox, with explicit handoff rules.",
    relatedSlugs: ["intent", "handoff", "knowledge-base", "guardrails"],
  },
  {
    slug: "intent",
    term: "Intent",
    category: "ai",
    shortDef:
      "The goal a user is trying to achieve with a message — 'track order', 'cancel booking', 'ask price'.",
    longDef:
      "Classical bots need you to define intents explicitly. Modern LLM-based agents infer intent from context without an intent list, but you still group outcomes into known actions for analytics and routing.",
    relatedSlugs: ["ai-agent", "handoff"],
  },
  {
    slug: "handoff",
    term: "Handoff",
    category: "ai",
    shortDef:
      "The transition from AI agent to a human agent when the bot can't or shouldn't reply.",
    longDef:
      "Good handoff is about timing and context. A mature agent hands off when confidence is low, when the user explicitly asks, when the topic is sensitive (refunds, complaints), or when a rule says it must. The human receives the full transcript and suggested next action.",
    relatedSlugs: ["ai-agent", "guardrails"],
  },
  {
    slug: "guardrails",
    term: "Guardrails",
    category: "ai",
    shortDef:
      "Hard rules that keep an AI agent from saying or doing things it shouldn't.",
    longDef:
      "Guardrails cover topics (don't quote prices on unreleased SKUs), tone (never argue), PII (don't ask for card numbers), and scope (don't answer competitor comparisons). Implemented as deterministic pre- and post-filters around the LLM.",
    relatedSlugs: ["ai-agent", "handoff"],
  },
  {
    slug: "knowledge-base",
    term: "Knowledge base",
    abbr: "KB",
    category: "ai",
    shortDef:
      "The grounding content an AI agent retrieves from to answer questions accurately.",
    longDef:
      "The KB is your help-centre articles, FAQs, product catalogues and policies — anything the agent might need to cite. We ingest it, chunk it, embed it, and retrieve the relevant chunks at answer time so the LLM stays grounded.",
    relatedSlugs: ["embedding", "ai-agent"],
  },
  {
    slug: "embedding",
    term: "Embedding",
    category: "ai",
    shortDef:
      "A numeric vector that represents the meaning of a piece of text for semantic search.",
    longDef:
      "Every KB chunk gets embedded into a high-dimensional vector. When a user asks a question, the question is embedded too, and we retrieve the nearest KB chunks by cosine similarity. Faster than keyword search for natural-language queries.",
    relatedSlugs: ["knowledge-base", "ai-agent"],
  },
  {
    slug: "mau",
    term: "MAU",
    abbr: "Monthly Active User",
    category: "ai",
    shortDef:
      "A unique end-user who interacted with your WhatsApp or AI agent in a given month.",
    longDef:
      "MAU is a common billing unit for conversational platforms — one user, regardless of how many conversations they had. SMSLocal doesn't charge by MAU; we charge per conversation or per message. But the metric is useful for capacity planning.",
    relatedSlugs: ["ai-agent", "conversation"],
  },
]

export function getTermsByCategory(slug: GlossaryCategorySlug): GlossaryTerm[] {
  return GLOSSARY_TERMS.filter((t) => t.category === slug).sort((a, b) =>
    a.term.localeCompare(b.term),
  )
}

export function getTermBySlug(slug: string): GlossaryTerm | undefined {
  return GLOSSARY_TERMS.find((t) => t.slug === slug)
}

export function getCategory(slug: GlossaryCategorySlug): GlossaryCategory | undefined {
  return GLOSSARY_CATEGORIES.find((c) => c.slug === slug)
}

/** Sorted once so the browser component can trust the order. */
export const SORTED_TERMS: GlossaryTerm[] = [...GLOSSARY_TERMS].sort((a, b) =>
  a.term.localeCompare(b.term),
)

/** Every unique starting letter we have terms for, uppercased and sorted. */
export const LETTERS: string[] = Array.from(
  new Set(SORTED_TERMS.map((t) => t.term[0]!.toUpperCase())),
).sort()

/** A small curated list of the most-searched terms to feature up top. */
export const FEATURED_TERM_SLUGS: string[] = [
  "dlt",
  "pe",
  "bsp",
  "otp",
  "template",
  "conversation",
  "header",
  "dnd",
  "dlr",
  "idempotency",
]
