export type RelatedLink = {
  href: string
  label: string
  blurb: string
}

export type RelatedGroup = {
  title: string
  links: RelatedLink[]
}

export type RelatedContent = {
  eyebrow?: string
  title?: string
  subtitle?: string
  groups: RelatedGroup[]
}

// Canonical link data, referenced from every related-content registry entry.
const LINKS = {
  // Products
  bulkSms: {
    href: "/products/bulk-sms",
    label: "Bulk SMS",
    blurb: "DLT-compliant campaigns with AI routing and wrong-number detection.",
  },
  whatsapp: {
    href: "/products/whatsapp-business-api",
    label: "WhatsApp Business API",
    blurb: "Broadcasts, AI agents in 8 Indian languages, and a visual flow builder.",
  },
  otp: {
    href: "/products/otp-sms",
    label: "OTP & Transactional SMS",
    blurb: "Priority routes, sub-second delivery, and a ship-today API.",
  },
  quickSms: {
    href: "/products/quick-sms",
    label: "Quick SMS",
    blurb: "Send DLT-compliant SMS from your browser without a developer.",
  },
  rcs: {
    href: "/products/rcs",
    label: "RCS Business Messaging",
    blurb: "Verified, branded rich cards on Jio, Airtel, and Vi — with SMS fallback.",
  },

  // Solutions
  ecommerce: {
    href: "/solutions/ecommerce",
    label: "E-commerce",
    blurb: "Abandoned-cart recovery, COD confirmation, and order-status loops.",
  },
  banking: {
    href: "/solutions/banking-fintech",
    label: "Banking & Fintech",
    blurb: "Low-latency OTPs, KYC nudges, and DPDPA-aligned data handling.",
  },
  healthcare: {
    href: "/solutions/healthcare",
    label: "Healthcare",
    blurb: "Appointment reminders, lab-report delivery, and consent-first workflows.",
  },
  education: {
    href: "/solutions/education",
    label: "Education",
    blurb: "Admissions nudges, fee reminders, and attendance alerts at scale.",
  },
  logistics: {
    href: "/solutions/logistics",
    label: "Logistics",
    blurb: "Out-for-delivery pings, rider OTPs, and COD confirmations.",
  },
  realEstate: {
    href: "/solutions/real-estate",
    label: "Real Estate",
    blurb: "Site-visit reminders, lead nurture, and multi-language follow-ups.",
  },
  retail: {
    href: "/solutions/retail",
    label: "Retail & Hospitality",
    blurb: "Loyalty broadcasts, reservations, and catalog-driven WhatsApp flows.",
  },

  // Resources / conversion
  pricing: {
    href: "/pricing",
    label: "Pricing",
    blurb: "Volume-tier SMS, pay-as-you-go WhatsApp, and 24-month wallet validity.",
  },
  developers: {
    href: "/developers",
    label: "Developer hub",
    blurb: "REST API, SDKs in 6 languages, webhooks, and a full Postman collection.",
  },
  help: {
    href: "/resources/help",
    label: "Help centre",
    blurb: "DLT onboarding, WhatsApp verification, and integration guides.",
  },
  compareHub: {
    href: "/compare",
    label: "Compare SMSLocal",
    blurb: "Honest side-by-side breakdowns vs. common Indian messaging vendors.",
  },
  msg91: {
    href: "/compare/smslocal-vs-msg91",
    label: "SMSLocal vs MSG91",
    blurb: "Fifteen-row comparison of routing, pricing, WhatsApp depth, and support.",
  },
  dpdpa: {
    href: "/legal/dpdpa",
    label: "DPDPA notice",
    blurb: "How we handle your data under India's Digital Personal Data Protection Act.",
  },
  about: {
    href: "/company/about",
    label: "About SMSLocal",
    blurb: "Built by engineers who were tired of paying US prices for tools built for the US.",
  },

  // Developer docs
  apiDocs: {
    href: "/developers/api-docs",
    label: "API reference",
    blurb: "Every endpoint, parameter, and error code — with copy-paste cURL, Node, and Python.",
  },
  quickstart: {
    href: "/developers/quickstart",
    label: "Quickstart",
    blurb: "From signup to your first delivered SMS in under five minutes.",
  },
  smsApi: {
    href: "/developers/sms-api",
    label: "SMS API overview",
    blurb: "Why thousands of teams ship SMS on our API — and the snippets to start with.",
  },
  xmlApi: {
    href: "/developers/xml-api",
    label: "XML API reference",
    blurb: "Legacy XML endpoint for teams integrating through older SMPP-style stacks.",
  },

  // Blog + resources
  blog: {
    href: "/blog",
    label: "SMSLocal blog",
    blurb: "Honest guides on DLT, WhatsApp, and messaging delivery — written by the team.",
  },
  blogDlt: {
    href: "/blog/dlt-registration-guide",
    label: "DLT registration — the practical guide",
    blurb: "Every step, every document, every rejection reason for Indian SMS registration.",
  },
} as const

function products(...keys: (keyof typeof LINKS)[]): RelatedGroup {
  return { title: "Explore products", links: keys.map((k) => LINKS[k]) }
}
function solutions(...keys: (keyof typeof LINKS)[]): RelatedGroup {
  return { title: "See it in your industry", links: keys.map((k) => LINKS[k]) }
}
function resources(...keys: (keyof typeof LINKS)[]): RelatedGroup {
  return { title: "Keep reading", links: keys.map((k) => LINKS[k]) }
}

// Registry keyed by the current page path.
export const RELATED_CONTENT: Record<string, RelatedContent> = {
  // -------- Products --------
  "/products/bulk-sms": {
    eyebrow: "Related reading",
    title: "More ways Indian businesses use SMSLocal.",
    subtitle:
      "Pair bulk SMS with the other channels on the same wallet, or see how teams like yours ship it in production.",
    groups: [
      products("rcs", "whatsapp", "otp", "quickSms"),
      solutions("ecommerce", "banking", "education"),
      resources("pricing", "msg91"),
    ],
  },
  "/products/whatsapp-business-api": {
    eyebrow: "Related reading",
    title: "What pairs well with WhatsApp Business API.",
    subtitle:
      "Layer branded RCS for the richest inbox moment, fall back to SMS when WhatsApp fails, and fire OTPs on the same wallet.",
    groups: [
      products("rcs", "bulkSms", "otp", "quickSms"),
      solutions("ecommerce", "retail", "healthcare", "realEstate"),
      resources("pricing", "developers"),
    ],
  },
  "/products/otp-sms": {
    eyebrow: "Related reading",
    title: "OTPs are rarely a product of one.",
    subtitle:
      "Most teams combine OTP with transactional SMS, WhatsApp verification, or industry-specific authentication flows.",
    groups: [
      products("bulkSms", "rcs", "whatsapp", "quickSms"),
      solutions("banking", "healthcare", "ecommerce"),
      resources("developers", "pricing"),
    ],
  },
  "/products/quick-sms": {
    eyebrow: "Related reading",
    title: "For teams who move faster than their dev team.",
    subtitle:
      "Quick SMS pairs naturally with RCS rich cards, WhatsApp broadcasts, and bulk SMS for ops, marketing, and support.",
    groups: [
      products("rcs", "bulkSms", "whatsapp", "otp"),
      solutions("education", "realEstate", "retail"),
      resources("pricing", "help"),
    ],
  },
  "/products/rcs": {
    eyebrow: "Related reading",
    title: "Rich messaging pairs well with these.",
    subtitle:
      "Most teams combine RCS with a DLT SMS fallback, WhatsApp for opted-in audiences, and AI agents to answer the replies that RCS's suggested-reply chips trigger.",
    groups: [
      products("bulkSms", "whatsapp", "otp", "quickSms"),
      solutions("retail", "ecommerce", "logistics", "banking"),
      resources("pricing", "developers"),
    ],
  },

  // -------- Solutions --------
  "/solutions/ecommerce": {
    eyebrow: "Related reading",
    title: "Keep exploring.",
    subtitle:
      "See how retail and logistics teams extend the same stack, or go deep on a specific channel.",
    groups: [
      solutions("retail", "logistics", "banking"),
      products("whatsapp", "bulkSms", "otp"),
      resources("pricing", "help"),
    ],
  },
  "/solutions/banking-fintech": {
    eyebrow: "Related reading",
    title: "Adjacent regulated industries.",
    subtitle:
      "Healthcare and insurance run similar playbooks. Or dig into the OTP product that underpins every login.",
    groups: [
      solutions("healthcare", "ecommerce", "logistics"),
      products("otp", "bulkSms", "whatsapp"),
      resources("dpdpa", "msg91"),
    ],
  },
  "/solutions/healthcare": {
    eyebrow: "Related reading",
    title: "Keep exploring.",
    subtitle:
      "Other consent-first industries use the same building blocks, and the OTP product is the workhorse under it all.",
    groups: [
      solutions("banking", "education", "realEstate"),
      products("otp", "whatsapp", "bulkSms"),
      resources("dpdpa", "pricing"),
    ],
  },
  "/solutions/education": {
    eyebrow: "Related reading",
    title: "Keep exploring.",
    subtitle:
      "Bulk SMS is the spine of most campus workflows; see adjacent industries with similar notification patterns.",
    groups: [
      solutions("realEstate", "retail", "healthcare"),
      products("bulkSms", "quickSms", "whatsapp"),
      resources("pricing", "help"),
    ],
  },
  "/solutions/logistics": {
    eyebrow: "Related reading",
    title: "Keep exploring.",
    subtitle:
      "E-commerce and retail teams use the same delivery loops. The developer hub covers webhook patterns for carrier events.",
    groups: [
      solutions("ecommerce", "retail", "banking"),
      products("bulkSms", "otp", "whatsapp"),
      resources("developers", "pricing"),
    ],
  },
  "/solutions/real-estate": {
    eyebrow: "Related reading",
    title: "Keep exploring.",
    subtitle:
      "Long sales cycles show up everywhere: education admissions, insurance renewals, and retail CRM.",
    groups: [
      solutions("retail", "education", "banking"),
      products("quickSms", "whatsapp", "bulkSms"),
      resources("pricing", "help"),
    ],
  },
  "/solutions/retail": {
    eyebrow: "Related reading",
    title: "Keep exploring.",
    subtitle:
      "Retail, e-commerce, and hospitality converge. WhatsApp Business API does most of the heavy lifting.",
    groups: [
      solutions("ecommerce", "realEstate", "education"),
      products("whatsapp", "bulkSms", "quickSms"),
      resources("pricing", "help"),
    ],
  },

  // -------- Conversion + hubs --------
  "/pricing": {
    eyebrow: "Before you pick a plan",
    title: "Two more ways to get comfortable.",
    subtitle:
      "See how teams in your industry use SMSLocal, or read our honest side-by-sides against common vendors.",
    groups: [
      solutions("ecommerce", "banking", "healthcare"),
      products("bulkSms", "whatsapp", "otp"),
      resources("msg91", "compareHub", "developers"),
    ],
  },
  "/compare": {
    eyebrow: "Continue exploring",
    title: "What most teams look at next.",
    groups: [
      products("bulkSms", "whatsapp", "otp"),
      solutions("ecommerce", "banking", "healthcare"),
      resources("pricing", "msg91", "about"),
    ],
  },
  "/compare/smslocal-vs-msg91": {
    eyebrow: "Keep reading",
    title: "More context before you decide.",
    groups: [
      products("bulkSms", "whatsapp", "otp"),
      solutions("ecommerce", "banking", "logistics"),
      resources("compareHub", "pricing", "about"),
    ],
  },
  "/developers": {
    eyebrow: "Pair with",
    title: "What every API integration ends up needing.",
    groups: [
      products("otp", "bulkSms", "whatsapp"),
      solutions("banking", "ecommerce", "logistics"),
      resources("pricing", "help", "dpdpa"),
    ],
  },
  "/resources/help": {
    eyebrow: "Related",
    title: "Articles tied to common onboarding paths.",
    groups: [
      products("bulkSms", "whatsapp", "otp"),
      solutions("ecommerce", "banking", "healthcare"),
      resources("developers", "dpdpa", "pricing"),
    ],
  },
  "/company/about": {
    eyebrow: "Keep reading",
    title: "See what we actually ship.",
    groups: [
      products("bulkSms", "whatsapp", "otp"),
      solutions("ecommerce", "banking", "healthcare"),
      resources("pricing", "compareHub", "developers"),
    ],
  },

  // -------- Developer docs --------
  "/developers/api-docs": {
    eyebrow: "Related reading",
    title: "What most developers look at next.",
    subtitle:
      "Pair the reference with the five-minute quickstart, the SMS API overview, or the product pages the API drives.",
    groups: [
      {
        title: "Developer docs",
        links: [LINKS.quickstart, LINKS.smsApi, LINKS.xmlApi],
      },
      products("otp", "bulkSms", "whatsapp"),
      resources("pricing", "help", "blogDlt"),
    ],
  },
  "/developers/quickstart": {
    eyebrow: "Related reading",
    title: "Once your first send works.",
    subtitle:
      "Move from the five-minute demo to the full API reference, or jump to the products you'll build on.",
    groups: [
      {
        title: "Developer docs",
        links: [LINKS.apiDocs, LINKS.smsApi, LINKS.xmlApi],
      },
      products("otp", "bulkSms", "whatsapp"),
      resources("pricing", "help", "blogDlt"),
    ],
  },
  "/developers/sms-api": {
    eyebrow: "Related reading",
    title: "Keep exploring the API.",
    subtitle:
      "See the full reference, use the five-minute quickstart, or check the product pages for DLT and sender-ID specifics.",
    groups: [
      {
        title: "Developer docs",
        links: [LINKS.quickstart, LINKS.apiDocs, LINKS.xmlApi],
      },
      products("otp", "bulkSms", "whatsapp"),
      resources("pricing", "blogDlt", "help"),
    ],
  },
  "/developers/xml-api": {
    eyebrow: "Related reading",
    title: "Most teams prefer the HTTP API.",
    subtitle:
      "If you're starting fresh, the HTTP reference and quickstart are faster to integrate. The product pages explain delivery guarantees.",
    groups: [
      {
        title: "Developer docs",
        links: [LINKS.apiDocs, LINKS.quickstart, LINKS.smsApi],
      },
      products("otp", "bulkSms", "whatsapp"),
      resources("pricing", "help", "blogDlt"),
    ],
  },

  // -------- Blog --------
  "/blog": {
    eyebrow: "Explore",
    title: "Product pages the blog talks about.",
    subtitle:
      "Most posts map back to a product decision or an industry playbook. Here's where to start if you're evaluating us.",
    groups: [
      products("bulkSms", "whatsapp", "otp"),
      solutions("ecommerce", "banking", "healthcare"),
      resources("pricing", "developers", "compareHub"),
    ],
  },
  "/blog/dlt-registration-guide": {
    eyebrow: "Related reading",
    title: "Keep going.",
    subtitle:
      "DLT is the first mile; once you're registered, these are the pages that decide what you actually send.",
    groups: [
      products("bulkSms", "otp", "whatsapp"),
      solutions("banking", "ecommerce", "healthcare"),
      {
        title: "Start sending",
        links: [LINKS.quickstart, LINKS.apiDocs, LINKS.pricing],
      },
    ],
  },

  // -------- Tools / SEO landing pages --------
  "/resources/tools/sms-bomber": {
    eyebrow: "Related reading",
    title: "Build responsibly instead.",
    subtitle:
      "If you're here for rate-limited testing or legitimate bulk sending, these are the tools and policies you actually want.",
    groups: [
      products("bulkSms", "otp", "quickSms"),
      {
        title: "Compliance first",
        links: [LINKS.blog, LINKS.blogDlt, LINKS.help],
      },
      resources("pricing", "developers"),
    ],
  },
  "/resources/tools/free-sms-without-registration": {
    eyebrow: "Related reading",
    title: "For a few SMS or a few million.",
    subtitle:
      "Free tools cover a handful of sends. Our paid plans start at ₹60 credit and include the DLT onboarding you'll need to scale.",
    groups: [
      products("bulkSms", "otp", "quickSms"),
      {
        title: "Learn the fundamentals",
        links: [LINKS.blogDlt, LINKS.blog, LINKS.help],
      },
      resources("pricing", "msg91"),
    ],
  },
  "/long-sms-messages": {
    eyebrow: "Related reading",
    title: "Long SMS pairs well with these.",
    subtitle:
      "Long SMS is a format choice. The channel choice — bulk, OTP, WhatsApp — depends on your use case.",
    groups: [
      products("bulkSms", "whatsapp", "otp"),
      solutions("banking", "ecommerce", "realEstate"),
      resources("pricing", "developers", "blogDlt"),
    ],
  },
  "/help/way2sms-alternative-website": {
    eyebrow: "Related reading",
    title: "Why most teams move to a real provider.",
    subtitle:
      "Once you need deliverability, compliance, and an API, free web-SMS sites stop being the answer. Here's where teams usually end up.",
    groups: [
      products("bulkSms", "otp", "quickSms"),
      {
        title: "What to learn next",
        links: [LINKS.blogDlt, LINKS.blog, LINKS.help],
      },
      resources("pricing", "compareHub", "msg91"),
    ],
  },

  // -------- New blog posts --------
  "/blog/dnd-means": {
    eyebrow: "Related reading",
    title: "Go deeper on DND and compliance.",
    groups: [
      products("bulkSms", "otp", "whatsapp"),
      {
        title: "Continue reading",
        links: [
          { href: "/blog/dnd-services", label: "DND services for senders", blurb: "The business side of NCPR scrubbing, send windows, and template categories." },
          LINKS.blogDlt,
          LINKS.blog,
        ],
      },
      resources("pricing", "help"),
    ],
  },
  "/blog/dnd-services": {
    eyebrow: "Related reading",
    title: "Senders stay compliant by pairing these.",
    groups: [
      products("bulkSms", "otp", "whatsapp"),
      {
        title: "Continue reading",
        links: [
          LINKS.blogDlt,
          { href: "/blog/dnd-means", label: "DND means — the consumer side", blurb: "How your end-users activate and interact with DND — useful context for senders." },
          LINKS.blog,
        ],
      },
      resources("pricing", "developers"),
    ],
  },
  "/blog/receive-sms-online-india": {
    eyebrow: "Related reading",
    title: "For builders and for users.",
    groups: [
      products("otp", "bulkSms", "whatsapp"),
      {
        title: "Continue reading",
        links: [
          { href: "/blog/dnd-means", label: "DND means — consumer guide", blurb: "The legitimate way to reduce promotional SMS without shared numbers." },
          { href: "/blog/send-sms-online", label: "Send SMS online — the 4 ways", blurb: "Every legitimate path to send SMS online in India." },
          LINKS.blog,
        ],
      },
      resources("developers", "pricing"),
    ],
  },
  "/blog/sms-activation": {
    eyebrow: "Related reading",
    title: "When troubleshooting leads to a real sender.",
    groups: [
      products("otp", "bulkSms", "quickSms"),
      {
        title: "Continue reading",
        links: [
          { href: "/blog/gmail-password-recovery-via-sms", label: "Gmail password recovery via SMS", blurb: "What to do when recovery SMS don't arrive." },
          { href: "/blog/send-sms-online", label: "Send SMS online — the 4 ways", blurb: "Sending SMS from a browser or app, reliably." },
          LINKS.blog,
        ],
      },
      resources("help", "developers"),
    ],
  },
  "/blog/gmail-password-recovery-via-sms": {
    eyebrow: "Related reading",
    title: "Recovery SMS is OTP. Here's the stack.",
    groups: [
      products("otp", "bulkSms", "whatsapp"),
      {
        title: "Continue reading",
        links: [
          { href: "/blog/sms-activation", label: "SMS not working — troubleshooting", blurb: "Every device + carrier check to get SMS flowing again." },
          { href: "/blog/send-sms-online", label: "Send SMS online — the 4 ways", blurb: "Building a recovery-grade OTP pipeline." },
          LINKS.blog,
        ],
      },
      resources("developers", "pricing"),
    ],
  },
  "/blog/send-sms-online": {
    eyebrow: "Related reading",
    title: "Pick the right path for your team.",
    groups: [
      products("bulkSms", "otp", "whatsapp", "quickSms"),
      {
        title: "Continue reading",
        links: [
          LINKS.blogDlt,
          { href: "/blog/dnd-services", label: "DND services for senders", blurb: "Compliance rules every Indian sender has to follow." },
          LINKS.blog,
        ],
      },
      resources("pricing", "developers", "msg91"),
    ],
  },
}

export function getRelatedContent(path: string): RelatedContent | null {
  return RELATED_CONTENT[path] ?? null
}
