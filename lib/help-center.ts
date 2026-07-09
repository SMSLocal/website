import type { LucideIcon } from "lucide-react"
import {
  Bot,
  Code2,
  CreditCard,
  KeyRound,
  MessageCircle,
  MessageSquare,
  Play,
  ShieldCheck,
} from "lucide-react"

/* ----------------------------- Types ----------------------------- */

export type HelpBlock =
  | { t: "p"; c: string }
  | { t: "h"; c: string }
  | { t: "steps"; items: string[] }
  | { t: "list"; items: string[] }
  | {
      t: "callout"
      tone: "info" | "warn" | "tip"
      title: string
      body: string
    }
  | { t: "code"; lang?: string; code: string }

export type HelpArticle = {
  slug: string
  title: string
  excerpt: string
  readMinutes: number
  updatedOn: string
  body: HelpBlock[]
}

export type HelpCategory = {
  slug: string
  title: string
  description: string
  icon: LucideIcon
  articles: HelpArticle[]
}

/* --------------------------- Categories --------------------------- */

export const HELP_CATEGORIES: HelpCategory[] = [
  {
    slug: "getting-started",
    title: "Getting started",
    description: "Create your account, add credits, and send your first message in under fifteen minutes.",
    icon: Play,
    articles: [
      {
        slug: "create-your-account",
        title: "How do I create an SMSLocal account?",
        excerpt: "Signing up takes about two minutes and gives you ₹60 of free credit to try SMS, WhatsApp and OTP.",
        readMinutes: 2,
        updatedOn: "2026-02-10",
        body: [
          { t: "p", c: "Accounts are free to open. You need a working email address, an Indian mobile number for OTP verification, and your company PAN or GST number if you intend to send commercial traffic." },
          { t: "h", c: "Steps to sign up" },
          {
            t: "steps",
            items: [
              "Open the signup page and enter your business email.",
              "Verify your mobile number with the OTP we send.",
              "Complete your business profile (PAN, GST, business address).",
              "Pick your primary use case — SMS, WhatsApp, OTP, or all three.",
              "Land on the dashboard with ₹60 of credit already loaded.",
            ],
          },
          {
            t: "callout",
            tone: "info",
            title: "Personal accounts",
            body: "Individuals can also sign up for testing, but DLT registration and live traffic require a registered business entity because of TRAI rules.",
          },
        ],
      },
      {
        slug: "add-credits-and-billing",
        title: "How do I add credits to my wallet?",
        excerpt: "Credits are paid-in-advance INR balance. You can top up by UPI, card, net banking or bank transfer.",
        readMinutes: 3,
        updatedOn: "2026-02-12",
        body: [
          { t: "p", c: "Every SMSLocal account is wallet-based. You load credits once, and each SMS, WhatsApp message or OTP is debited at the listed per-unit price. There are no monthly minimums on the pay-as-you-go plans." },
          { t: "h", c: "Top-up methods" },
          {
            t: "list",
            items: [
              "UPI — instant, no surcharge, up to ₹1,00,000 per transaction.",
              "Credit or debit card — instant, 2% processing fee on some cards.",
              "Net banking — instant, no surcharge.",
              "Bank transfer (NEFT/RTGS) — for top-ups above ₹1,00,000, credited within two banking hours.",
            ],
          },
          { t: "p", c: "After your first paid top-up, you can enable auto-recharge so we refill your wallet before you run out. The threshold and amount are both configurable from the billing settings." },
        ],
      },
      {
        slug: "send-your-first-sms",
        title: "How do I send my first SMS?",
        excerpt: "Use the composer in your dashboard to send a one-off SMS to a verified test number before going live.",
        readMinutes: 3,
        updatedOn: "2026-02-14",
        body: [
          { t: "p", c: "Before you can send to real customers, your Principal Entity and at least one content template must be approved on DLT. While those are in progress, you can send to verified test numbers you add to your account — these do not need template approval." },
          { t: "h", c: "From the dashboard" },
          {
            t: "steps",
            items: [
              "Open Campaigns → New campaign → Single SMS.",
              "Pick a sender ID. On test mode, use TESTSL; on live, pick an approved six-character header.",
              "Choose an approved template or type your message (test mode only).",
              "Enter the destination mobile number with the country code (e.g. +91 98XXXXXXXX).",
              "Click Send. Delivery report lands in under 30 seconds for Indian operators.",
            ],
          },
          {
            t: "callout",
            tone: "tip",
            title: "Prefer the API?",
            body: "The same send is one POST request to /v2/sms/send with a template_id, a sender, and a variables object. See the API category for full examples.",
          },
        ],
      },
      {
        slug: "connect-whatsapp-business",
        title: "How do I connect a WhatsApp Business number?",
        excerpt: "Bring your own number or port a new one. Meta approval usually lands within 24 hours.",
        readMinutes: 4,
        updatedOn: "2026-02-15",
        body: [
          { t: "p", c: "SMSLocal is an authorised Meta Business Solution Provider. You can either connect a fresh mobile number you own, or migrate an existing WhatsApp Business API number from another BSP without losing message history or the green tick." },
          { t: "h", c: "Prerequisites" },
          {
            t: "list",
            items: [
              "A Meta Business Manager account (we help create one if you don't have it).",
              "A display name that matches your registered brand.",
              "A mobile number not currently signed in to the regular WhatsApp app.",
              "PAN and GST for verified business status.",
            ],
          },
          { t: "p", c: "Once those are in place, onboarding is a guided six-step wizard from the WhatsApp section of your dashboard. Most first-time onboardings complete in under four hours of active work across one or two business days." },
        ],
      },
      {
        slug: "invite-your-team",
        title: "How do I invite teammates?",
        excerpt: "All plans — including the free tier — include unlimited team seats with role-based permissions.",
        readMinutes: 2,
        updatedOn: "2026-02-16",
        body: [
          { t: "p", c: "There is no per-seat fee on any SMSLocal plan. Invite as many teammates as you need, and restrict what each one can do with granular roles." },
          { t: "h", c: "Built-in roles" },
          {
            t: "list",
            items: [
              "Owner — full access to billing, DLT, team and all channels.",
              "Admin — everything except billing and account deletion.",
              "Marketer — can create and send campaigns, no billing or DLT access.",
              "Agent — inbox-only; handles WhatsApp and chat replies, no campaign access.",
              "Developer — API keys and webhooks, no marketing or inbox access.",
              "Finance — invoices, top-ups and usage reports only.",
            ],
          },
          { t: "p", c: "Enterprise plans also support custom roles, SSO with your IdP, and SCIM provisioning so access is revoked automatically the moment someone leaves your HR system." },
        ],
      },
      {
        slug: "understand-the-dashboard",
        title: "A tour of the SMSLocal dashboard",
        excerpt: "What lives where — campaigns, inbox, reports, billing, and compliance — and why.",
        readMinutes: 4,
        updatedOn: "2026-02-18",
        body: [
          { t: "p", c: "The dashboard is organised around the four things Indian messaging teams actually do every day: send, respond, measure, and stay compliant." },
          { t: "h", c: "Top-level sections" },
          {
            t: "list",
            items: [
              "Campaigns — one-off and scheduled sends across SMS, WhatsApp and email.",
              "Inbox — shared team inbox for WhatsApp and SMS replies with assignment and notes.",
              "Reports — delivery, cost, opt-outs, and funnel analytics.",
              "Contacts — segments, consent records, opt-outs, and imports.",
              "Compliance — DLT registrations, templates, sender IDs, DND scrub logs.",
              "Developers — API keys, webhooks, logs, and sandbox controls.",
              "Billing — wallet, invoices, auto-recharge, and plan changes.",
            ],
          },
          { t: "p", c: "The left-nav preserves your last-used sub-page per section, so if you live in the inbox all day it opens there by default the next time you log in." },
        ],
      },
    ],
  },

  {
    slug: "sms",
    title: "SMS campaigns",
    description: "Templates, DLT routing, sender IDs, delivery reports, scheduling, and retries.",
    icon: MessageSquare,
    articles: [
      {
        slug: "transactional-vs-promotional",
        title: "Transactional vs promotional SMS — what's the difference?",
        excerpt: "India's TRAI regulations force you to pick a category up front. Picking wrong gets your traffic blocked.",
        readMinutes: 4,
        updatedOn: "2026-02-20",
        body: [
          { t: "p", c: "Every SMS sent to an Indian number must be tagged with one of four DLT categories: transactional, service-implicit, service-explicit, or promotional. The category controls who you can send to, when, and at what price." },
          { t: "h", c: "The quick rule" },
          {
            t: "list",
            items: [
              "Transactional — OTPs and critical alerts tied to a user action. Allowed 24x7 to everyone, even DND-registered numbers.",
              "Service-implicit — status updates for something the user initiated (order shipped, refund processed). Allowed 24x7 to everyone.",
              "Service-explicit — reminders and nudges on a subscribed service. Allowed 24x7 to users who opted in.",
              "Promotional — offers, deals, newsletters. Only allowed to non-DND numbers, only 9am–9pm IST.",
            ],
          },
          {
            t: "callout",
            tone: "warn",
            title: "Don't mix categories in one template",
            body: "Sending a promotional line inside an OTP template is the single fastest way to get a content template suspended. Keep them clearly separated.",
          },
        ],
      },
      {
        slug: "dlt-headers-and-template-ids",
        title: "How sender headers and template IDs work",
        excerpt: "Every outbound SMS carries a six-character header and a 19-digit template ID that both have to match your DLT record.",
        readMinutes: 3,
        updatedOn: "2026-02-22",
        body: [
          { t: "p", c: "Operators (Jio, Airtel, Vi, BSNL) reject any SMS whose header or template ID isn't registered for your Principal Entity on the DLT chain. SMSLocal validates both at the moment of send so you don't waste credits on a message the operator will drop." },
          { t: "h", c: "Fields that must match exactly" },
          {
            t: "list",
            items: [
              "Header (sender) — six uppercase letters, e.g. SMSLCL. Case-sensitive on some operators.",
              "Template ID — a 19-digit numeric string assigned by the DLT portal at approval.",
              "Body — must match the approved text character-for-character. Variables in {#var#} slots can be anything; static text cannot.",
              "Category — transactional, service, or promotional must match what you registered.",
            ],
          },
          { t: "p", c: "If the DLR comes back with 'template mismatch' or 'header suspended', 95% of the time it's an extra space or a changed word in the body. Diff the send payload against the approved template and you'll find it." },
        ],
      },
      {
        slug: "delivery-reports-explained",
        title: "What do SMS delivery statuses actually mean?",
        excerpt: "SUBMITTED, DELIVERED, FAILED, EXPIRED — the statuses you see are a standardisation of operator DLRs.",
        readMinutes: 4,
        updatedOn: "2026-02-24",
        body: [
          { t: "p", c: "Each operator reports delivery in their own format. SMSLocal normalises them into a common vocabulary so a dashboard filter means the same thing whether the carrier was Jio or Airtel." },
          { t: "h", c: "The statuses" },
          {
            t: "list",
            items: [
              "SUBMITTED — we accepted the message and forwarded it to the operator's SMSC.",
              "DELIVERED — the operator confirmed delivery to the handset.",
              "FAILED — the operator reported a permanent failure (number invalid, DND-blocked, template mismatch).",
              "EXPIRED — the message sat on the SMSC longer than its validity period (usually 24h) and was dropped.",
              "UNKNOWN — no DLR received in 48 hours. You're not charged for these.",
            ],
          },
          { t: "p", c: "Webhook events fire the moment the status changes, so your system always has the freshest data. You can also pull the full DLR trail via the /v2/sms/dlr endpoint for any message in the last 90 days." },
        ],
      },
      {
        slug: "sender-id-allocation",
        title: "How do I get a six-character sender ID?",
        excerpt: "You pick the header, the operator assigns the availability, DLT records it for you.",
        readMinutes: 3,
        updatedOn: "2026-02-25",
        body: [
          { t: "p", c: "Sender headers in India are not first-come-first-served globally — they're allocated per Principal Entity. Two brands can share the same six letters so long as the operator can disambiguate by DLT registration." },
          { t: "h", c: "Allocation rules" },
          {
            t: "list",
            items: [
              "Exactly six characters, all uppercase letters A–Z.",
              "Must be a sensible abbreviation of your registered brand name.",
              "No special characters, no digits, no operator names (AIRTEL, JIO etc. are reserved).",
              "One free header per DLT category per Principal Entity.",
            ],
          },
          { t: "p", c: "Registration takes 24–72 hours once you submit the request on your operator's DLT portal. SMSLocal can submit on your behalf if you grant us access during onboarding." },
        ],
      },
      {
        slug: "unicode-and-multilingual",
        title: "How many characters fit in a multilingual SMS?",
        excerpt: "English SMS fits 160 chars. Hindi and regional scripts fit 70. This is an operator limit, not ours.",
        readMinutes: 3,
        updatedOn: "2026-02-26",
        body: [
          { t: "p", c: "SMS messages are split into 'parts' by the operator. Each part is billed as a separate SMS. The part size depends on which character set you're using." },
          { t: "h", c: "Part sizes" },
          {
            t: "list",
            items: [
              "GSM-7 (English + Latin) — 160 characters per part, 153 for messages with more than one part.",
              "Unicode UCS-2 (Hindi, Tamil, Telugu, Bengali, Marathi, Gujarati, Punjabi, Kannada, Malayalam) — 70 chars per part, 67 for multipart.",
              "Mixed scripts — the entire message is encoded as Unicode, so even one Hindi character drops you to 70 per part.",
            ],
          },
          {
            t: "callout",
            tone: "tip",
            title: "The composer tells you live",
            body: "The SMS composer shows the current character count and how many billable parts your message will split into, including for approved DLT templates with variables filled in.",
          },
        ],
      },
      {
        slug: "scheduling-and-throttling",
        title: "Scheduling and throttling bulk campaigns",
        excerpt: "For promotional sends above 50k recipients, throttle the send so your inbound hotline doesn't melt.",
        readMinutes: 3,
        updatedOn: "2026-02-27",
        body: [
          { t: "p", c: "The fastest-to-inbox send isn't always the best one. Sending 500k promotional SMS in two minutes triggers 500k possible replies and calls in the next fifteen minutes. For most teams, spreading the send over 30–60 minutes produces better economics." },
          { t: "h", c: "Controls available" },
          {
            t: "list",
            items: [
              "Schedule — pick an exact IST date and time, or choose the next allowed promotional window (9am IST the following day).",
              "Throttle — cap throughput to N messages per minute so downstream systems can keep up.",
              "Stagger by timezone — not really needed for India but useful if you have NRI contact lists.",
              "Quiet hours — auto-pause sends between 9pm and 9am IST for promotional categories.",
            ],
          },
          { t: "p", c: "All of these are configurable per-campaign on the web composer and through the API's throttle and schedule_at fields." },
        ],
      },
    ],
  },

  {
    slug: "whatsapp",
    title: "WhatsApp Business API",
    description: "Onboarding, template approval, chatbot flows, team inbox, quality rating, and analytics.",
    icon: MessageCircle,
    articles: [
      {
        slug: "business-api-onboarding",
        title: "The WhatsApp Business API onboarding, end to end",
        excerpt: "From signing up to your first approved template usually takes between 24 and 48 hours.",
        readMinutes: 5,
        updatedOn: "2026-02-28",
        body: [
          { t: "p", c: "The WhatsApp Business API (WABA) onboarding has three independent approvals: a Meta Business Manager verification, a display-name approval, and your first content template approval. All three can run in parallel." },
          { t: "h", c: "The timeline we see most often" },
          {
            t: "list",
            items: [
              "Hour 0 — You start the wizard, connect Facebook Business Manager and enter your display name.",
              "Hour 0–4 — Business verification gets auto-approved if your Meta BM is already verified, otherwise 24–72 hours.",
              "Hour 0–24 — Display name approval. Shorter if your registered brand matches a PAN/GST on file.",
              "Hour 0–48 — First template approval. Most common rejection is promotional language in a utility template.",
            ],
          },
          { t: "p", c: "Enterprise customers with pre-approved Meta access can usually be fully live — including the green tick — within four hours." },
        ],
      },
      {
        slug: "template-approval-guide",
        title: "Writing a WhatsApp template that Meta will approve first time",
        excerpt: "The three most common reasons templates get rejected and how to write around them.",
        readMinutes: 4,
        updatedOn: "2026-03-01",
        body: [
          { t: "p", c: "Meta reviews templates against three things: category accuracy, variable clarity, and the absence of forbidden content like financial solicitation, political content, or vague offers." },
          { t: "h", c: "The recipe that passes" },
          {
            t: "steps",
            items: [
              "Open with the customer's name or order reference in variable one.",
              "Include a verb that matches the category — 'shipped', 'delivered', 'confirmed' for utility.",
              "Keep variable slots for dynamic info, static text for everything else.",
              "End with a clear call-to-action button or opt-out instruction.",
              "Match the category — marketing, utility, or authentication — to what the body actually does.",
            ],
          },
          {
            t: "callout",
            tone: "warn",
            title: "No bait-and-switch categories",
            body: "Submitting a marketing template as 'utility' to save on pricing gets both the template rejected and your WABA quality rating lowered. Meta's classifier is very good now.",
          },
        ],
      },
      {
        slug: "template-categories-and-pricing",
        title: "WhatsApp template categories and pricing",
        excerpt: "Meta splits templates into Marketing, Utility and Authentication. Each has its own rate.",
        readMinutes: 3,
        updatedOn: "2026-03-02",
        body: [
          { t: "p", c: "The 2024 category-based pricing change made the category matter for your margin, not just your compliance. Matching the right category to the right message saves anywhere from 30% to 85% per conversation." },
          { t: "h", c: "India rates (per conversation, INR)" },
          {
            t: "list",
            items: [
              "Authentication — ₹0.1150 flat rate for OTPs and login alerts.",
              "Utility — ₹0.1150 for order/status updates. Free within a 24-hour service window triggered by a user-initiated message.",
              "Marketing — ₹0.7260. Always billed, regardless of service window.",
              "Service (1:1 human replies) — free inside the 24-hour service window, ₹0.2891 after.",
            ],
          },
          { t: "p", c: "SMSLocal shows the category and price per template right in the composer, so there are no billing surprises at month end." },
        ],
      },
      {
        slug: "team-inbox-setup",
        title: "Setting up the WhatsApp team inbox",
        excerpt: "Auto-assign threads, tag conversations, and keep your reply SLA under a minute.",
        readMinutes: 4,
        updatedOn: "2026-03-03",
        body: [
          { t: "p", c: "The team inbox lets multiple agents handle replies from one WhatsApp Business number without stepping on each other. It supports auto-assignment, private notes, tags, canned responses, and full CRM sync." },
          { t: "h", c: "A good starting setup" },
          {
            t: "steps",
            items: [
              "Create three inboxes — Support, Sales, and Logistics — even if you start with one team.",
              "Set round-robin assignment with a 10-minute re-assign timeout for no-reply.",
              "Add the 10 most-used canned replies in English, Hindi and your primary regional language.",
              "Enable the away-auto-reply outside business hours so customers know when to expect a human.",
              "Wire the CRM sync so every thread creates or updates a contact in your tool of choice.",
            ],
          },
          { t: "p", c: "After a week, open the inbox analytics and look at your first-reply time. Under 60 seconds during working hours is a healthy benchmark for most Indian businesses." },
        ],
      },
      {
        slug: "broadcast-lists-and-consent",
        title: "Broadcasts, consent, and the 24-hour rule",
        excerpt: "You can broadcast to anyone who opted in. The 24-hour free service window starts with their reply.",
        readMinutes: 4,
        updatedOn: "2026-03-04",
        body: [
          { t: "p", c: "WhatsApp broadcasts are business-initiated messages sent to a list of opted-in contacts. Each recipient must have given explicit consent — a website checkbox, a keyword opt-in, or a form submission — and the opt-in proof must be storable for two years." },
          { t: "h", c: "The service window" },
          {
            t: "list",
            items: [
              "Any user message to you opens a 24-hour service window.",
              "Inside the window, you can reply with free-form text, no template needed, and no per-message fee for utility replies.",
              "Outside the window, you can only use approved templates.",
              "The window resets every time the user messages you again.",
            ],
          },
          { t: "p", c: "SMSLocal surfaces the live service window for every contact in the inbox header, so your agents always know whether the next reply will be free or billed." },
        ],
      },
      {
        slug: "quality-rating-and-tier",
        title: "Your WhatsApp quality rating and messaging tier",
        excerpt: "Meta rates your number green, yellow or red. Yellow is a warning, red is a throttle.",
        readMinutes: 3,
        updatedOn: "2026-03-05",
        body: [
          { t: "p", c: "Every WhatsApp Business number has a quality rating (green, yellow, red) and a messaging tier (1k, 10k, 100k, unlimited). The rating is a rolling 24-hour judgement of your messaging quality; the tier is a hard cap on business-initiated conversations per 24 hours." },
          { t: "h", c: "How to keep green" },
          {
            t: "list",
            items: [
              "Broadcast only to contacts who opted in within the last 6 months.",
              "Segment so recipients only get content relevant to them.",
              "Keep block rate under 1% and report rate under 0.1%.",
              "Always honour STOP/opt-out instantly — our platform does this automatically.",
            ],
          },
          { t: "p", c: "Tiers upgrade automatically once you sustain green status and hit 50% of your current cap for two consecutive days. Going from 1k to unlimited usually takes 3–5 weeks of clean sending." },
        ],
      },
    ],
  },

  {
    slug: "ai-agents",
    title: "AI WhatsApp Agents",
    description: "Train your agent, sync your catalogue, set handoff rules, and go multilingual.",
    icon: Bot,
    articles: [
      {
        slug: "train-your-first-agent",
        title: "Training your first AI WhatsApp agent",
        excerpt: "Upload your knowledge sources, pick a tone, and the agent is live in under an hour.",
        readMinutes: 4,
        updatedOn: "2026-03-06",
        body: [
          { t: "p", c: "SMSLocal's AI agent combines your documented knowledge (FAQ, policy docs, product catalogue) with the live context of the current conversation to answer customer questions in your voice." },
          { t: "h", c: "Training inputs it accepts" },
          {
            t: "list",
            items: [
              "PDFs — policies, user manuals, FAQ exports.",
              "Website pages — paste URLs and we crawl up to 500 pages.",
              "CSV — structured Q&A pairs from your existing helpdesk.",
              "Shopify or WooCommerce — auto-sync product catalogue, prices, and stock.",
              "Notion or Confluence — connect the workspace and pick folders.",
            ],
          },
          { t: "p", c: "After upload, the agent indexes in under fifteen minutes. You get a test console where you can paste real customer messages and see the answer + the source it drew from, before going live." },
        ],
      },
      {
        slug: "catalogue-sync",
        title: "Syncing your product catalogue to the agent",
        excerpt: "Shopify, WooCommerce, Magento and custom sources all supported with webhook-based live sync.",
        readMinutes: 3,
        updatedOn: "2026-03-07",
        body: [
          { t: "p", c: "When your catalogue is live-synced, the agent can answer 'is this in stock', 'what's the price', and 'do you have it in red, size L' accurately in the moment the customer asks." },
          { t: "h", c: "Sync options" },
          {
            t: "list",
            items: [
              "Webhook-based — Shopify and WooCommerce push updates the moment they happen. Sub-minute accuracy.",
              "Polling — every 15 minutes, we pull the full catalogue. Good for Magento and custom REST endpoints.",
              "CSV upload — for one-off or lightly changing catalogues. Manual refresh.",
            ],
          },
          { t: "p", c: "The agent also cites the live product URL in its reply so customers can tap straight through to the product page in a WhatsApp Flow card or button." },
        ],
      },
      {
        slug: "handoff-rules",
        title: "When should the AI hand off to a human?",
        excerpt: "Handoff rules are how you stay in control. Start simple and evolve as you see real conversations.",
        readMinutes: 3,
        updatedOn: "2026-03-08",
        body: [
          { t: "p", c: "The agent is great at repetitive questions. It's deliberately cautious about anything it is not confident about — and in those cases, a human reply is a much better customer experience than a wrong automated one." },
          { t: "h", c: "Default handoff triggers" },
          {
            t: "list",
            items: [
              "Customer types keywords like 'agent', 'manager', 'human', 'complaint', or any of your custom escalation words.",
              "The agent's confidence score drops below the threshold you set (default 0.7).",
              "The conversation has exceeded N turns without resolution (default 6).",
              "Any mention of refunds, cancellations, or legal action.",
              "The customer's sentiment score turns negative.",
            ],
          },
          { t: "p", c: "When handoff fires, the agent hands the agent the full transcript, the customer's current intent in one line, and the next-best action it was about to suggest — so the human never starts from zero." },
        ],
      },
      {
        slug: "multilingual-setup",
        title: "Setting up a multilingual AI agent",
        excerpt: "One agent, twelve Indian languages, zero extra training. The handoff transcript is translated on the fly.",
        readMinutes: 3,
        updatedOn: "2026-03-09",
        body: [
          { t: "p", c: "The agent auto-detects the language of each incoming message and replies in the same language using your trained tone. No separate 'Hindi agent' or 'Tamil agent' setup is required." },
          { t: "h", c: "Languages supported end-to-end" },
          {
            t: "list",
            items: [
              "English, Hindi, Marathi, Bengali, Tamil, Telugu, Kannada, Malayalam, Gujarati, Punjabi, Odia, Assamese.",
              "Transliterated Hinglish — 'kitne ka hai', 'order kab ayega' etc. — detected as Hindi.",
              "Mixed-language messages handled gracefully; the agent replies in the primary language.",
            ],
          },
          { t: "p", c: "When the AI hands off to a human agent who doesn't speak the customer's language, the inbox shows the original message plus a translation above it, and your typed reply goes back to the customer in their language automatically." },
        ],
      },
      {
        slug: "agent-analytics",
        title: "Understanding your AI agent analytics",
        excerpt: "Deflection rate, CSAT, confidence distribution, and the top ten questions drive the biggest wins.",
        readMinutes: 3,
        updatedOn: "2026-03-10",
        body: [
          { t: "p", c: "The analytics dashboard tells you where the agent is winning, where it is losing, and what to fix next. Check it weekly for the first month, monthly after that." },
          { t: "h", c: "The four numbers that matter" },
          {
            t: "list",
            items: [
              "Deflection rate — share of conversations the agent resolved without human handoff. Healthy is 55–75%.",
              "CSAT after AI-only chats — if this is below 4.2/5, tighten your handoff rules.",
              "Confidence distribution — a right-skewed distribution with most conversations above 0.85 is the goal.",
              "Top ten unanswered questions — directly feed these into new FAQ documents for the agent to learn from.",
            ],
          },
          { t: "p", c: "Enterprise customers also get cohort analytics — returning customers, first-time buyers, high-LTV — so you can tune tone per segment." },
        ],
      },
    ],
  },

  {
    slug: "otp",
    title: "OTP & Transactional",
    description: "Priority routing, retry logic, idempotency keys, carrier failover, and WhatsApp OTP fallback.",
    icon: KeyRound,
    articles: [
      {
        slug: "set-up-otp-api",
        title: "Setting up the OTP API",
        excerpt: "One endpoint for send, one for verify. Most teams are live in under 30 minutes.",
        readMinutes: 4,
        updatedOn: "2026-03-11",
        body: [
          { t: "p", c: "The OTP API is a narrow, opinionated pair of endpoints designed to do one thing extremely well: deliver a verification code and confirm it was entered correctly." },
          { t: "h", c: "The two endpoints" },
          {
            t: "list",
            items: [
              "POST /v2/otp/send — takes a mobile number, generates or accepts a code, delivers over SMS (default), WhatsApp, or voice.",
              "POST /v2/otp/verify — takes the mobile number and the code the user typed, returns a true/false and a reason.",
            ],
          },
          { t: "p", c: "The API handles code generation, expiry (default 10 minutes), attempt limiting (default 5), resend cooldown (default 30 seconds), and idempotency. You don't store the code yourself." },
          {
            t: "callout",
            tone: "tip",
            title: "Sandbox first",
            body: "Use the sandbox key in development. The API behaves identically but no real SMS is sent, and the test code 999999 always verifies successfully.",
          },
        ],
      },
      {
        slug: "priority-routing",
        title: "How OTP priority routing works",
        excerpt: "We route each OTP through the fastest live carrier path for that specific destination at that specific moment.",
        readMinutes: 4,
        updatedOn: "2026-03-12",
        body: [
          { t: "p", c: "Unlike bulk SMS where least-cost routing makes sense, OTP routing is latency-first. Saving two paise isn't worth a five-second delivery delay on a login flow." },
          { t: "h", c: "What the router considers" },
          {
            t: "list",
            items: [
              "The destination's home operator, detected from the numbering prefix.",
              "Live latency and success rate on each eligible route in the last 5 minutes.",
              "Whether that route has thrown any 5xx responses in the last minute.",
              "DLT template availability on each route.",
            ],
          },
          { t: "p", c: "The decision is made in under 1ms and surfaced in the webhook response so you can see which route was chosen for each send. Median OTP latency on SMSLocal is 2.3 seconds end-to-end." },
        ],
      },
      {
        slug: "retry-and-failover",
        title: "OTP retry and failover logic",
        excerpt: "If the primary route fails, we fail over to the next-fastest one before your user even sees a delay.",
        readMinutes: 3,
        updatedOn: "2026-03-13",
        body: [
          { t: "p", c: "OTP sends automatically retry on failure, with a per-channel and per-carrier retry policy that respects operator capacity and your own rate limits." },
          { t: "h", c: "The default retry ladder" },
          {
            t: "steps",
            items: [
              "Send on the primary route with a 7-second timeout.",
              "On failure or timeout, failover to the second-fastest route for that operator.",
              "If both SMS routes fail, automatically fall back to WhatsApp OTP (if enabled and the user has WhatsApp).",
              "If WhatsApp also fails, fall back to voice OTP as a last resort.",
              "Return a final status to your webhook within 12 seconds.",
            ],
          },
          { t: "p", c: "You can tighten or relax this ladder per message by passing a retry_strategy in the send payload." },
        ],
      },
      {
        slug: "idempotency-keys",
        title: "Idempotency keys for OTP sends",
        excerpt: "Stop double-sending when a retry happens on your side. Pass an idempotency key and we deduplicate.",
        readMinutes: 2,
        updatedOn: "2026-03-14",
        body: [
          { t: "p", c: "If your application retries a send request because of a network blip, you can end up sending two OTPs to the same user. Idempotency keys prevent this completely." },
          { t: "h", c: "How to use them" },
          {
            t: "steps",
            items: [
              "Generate a unique key (we recommend a UUIDv4) for each OTP request.",
              "Pass it in the Idempotency-Key header on POST /v2/otp/send.",
              "If the same key arrives within 24 hours, we return the original response without sending a second OTP.",
              "Keep the key until you receive a terminal status (delivered, failed, or expired).",
            ],
          },
          {
            t: "callout",
            tone: "tip",
            title: "Also valid for verify",
            body: "You can pass an idempotency key on /v2/otp/verify too — useful if a user double-taps your submit button.",
          },
        ],
      },
      {
        slug: "whatsapp-otp-fallback",
        title: "Using WhatsApp as a fallback for SMS OTP",
        excerpt: "When SMS is slow or fails, the same OTP is delivered over WhatsApp — usually in under a second.",
        readMinutes: 3,
        updatedOn: "2026-03-15",
        body: [
          { t: "p", c: "Most Indian smartphone users have WhatsApp, and WhatsApp OTPs arrive faster than SMS on an average day. Using WhatsApp as a first or fallback channel is the single biggest OTP-latency win for most apps." },
          { t: "h", c: "How it works" },
          {
            t: "list",
            items: [
              "You send one /v2/otp/send request. We try your preferred channel first.",
              "If the primary channel doesn't deliver in your configured window (default 7s), we automatically send the same code over the fallback channel.",
              "The user sees whichever arrives first. The other is silently cancelled when the code verifies.",
              "You're only billed for the channel that actually delivered.",
            ],
          },
          { t: "p", c: "WhatsApp OTP is billed at the Authentication rate (₹0.1150 per conversation), usually cheaper than SMS in bulk." },
        ],
      },
    ],
  },

  {
    slug: "dlt",
    title: "DLT & Compliance",
    description: "Principal Entity, content templates, TRAI rules, DND preferences, and DPDPA.",
    icon: ShieldCheck,
    articles: [
      {
        slug: "register-principal-entity",
        title: "How do I register a DLT Principal Entity?",
        excerpt: "You need GST, PAN, and authorisation letter. Approval is 24–72 hours on most operator portals.",
        readMinutes: 5,
        updatedOn: "2026-03-16",
        body: [
          { t: "p", c: "Every business sending commercial SMS to Indian numbers must register as a Principal Entity (PE) on at least one operator's DLT portal. Registration is free. Once registered, your PE ID propagates to all operators within 48 hours." },
          { t: "h", c: "Documents you need" },
          {
            t: "list",
            items: [
              "Company PAN card (scan, legible).",
              "GST registration certificate.",
              "Authorisation letter on company letterhead, signed by a director or authorised signatory.",
              "Contact details of the authorised signatory (mobile and email).",
              "A chosen six-character header (e.g. SMSLCL, CAREIN).",
            ],
          },
          {
            t: "callout",
            tone: "info",
            title: "Operator portals",
            body: "You can register on Jio's TrueSense, Airtel's Commercial Communications, Vodafone-Idea's PING, or BSNL's CCPL. Registering on any one propagates to the rest.",
          },
        ],
      },
      {
        slug: "submit-content-templates",
        title: "Submitting content templates on DLT",
        excerpt: "Every message you send must match an approved template. Here's how to write one that passes first time.",
        readMinutes: 4,
        updatedOn: "2026-03-17",
        body: [
          { t: "p", c: "Content templates are pre-approved message bodies with variable slots in {#var#} format. Operators verify every outbound SMS against the template database before relaying it." },
          { t: "h", c: "A template that always passes" },
          {
            t: "list",
            items: [
              "Keep static text generic and reusable — 'Your OTP is {#var#}' works for every use case.",
              "Put dynamic content only in variable slots, never static.",
              "Add an opt-out instruction for promotional templates — '-<Brand>' at the end.",
              "Match the category (transactional / service / promotional) to the actual use case.",
              "No URL shorteners — use your approved full domain or short link service registered with DLT.",
            ],
          },
          { t: "p", c: "Approval is typically 4–24 hours for transactional and service templates. Promotional takes longer (24–72 hours) because of manual review." },
        ],
      },
      {
        slug: "rejection-reasons",
        title: "The top 10 reasons DLT templates get rejected",
        excerpt: "90% of rejections come from the same handful of mistakes. Here's the cheat sheet.",
        readMinutes: 4,
        updatedOn: "2026-03-18",
        body: [
          { t: "p", c: "Operators reject templates for cause. The reason codes aren't always descriptive, but the underlying issue is usually one of these." },
          { t: "h", c: "The usual suspects" },
          {
            t: "list",
            items: [
              "Promotional text in a transactional template.",
              "Variables placed inside URLs ('visit shop.com/{#var#}' — disallowed).",
              "Missing opt-out in a promotional template.",
              "Category mismatch — 'Hurry, buy now!' submitted as service-implicit.",
              "Generic brand name that clashes with another PE's trademark.",
              "URL shortener (bit.ly, tinyurl) not registered with the operator.",
              "Unicode special characters (smart quotes, em-dashes) that don't match across operator systems.",
              "Variable slots not in the {#var#} format.",
              "More than 30 variables in one template (hard operator limit).",
              "Template identical to one already approved under another PE — considered a duplicate.",
            ],
          },
          { t: "p", c: "If a rejection is wrong, use the appeals flow — most legitimate templates are approved on first appeal within 48 hours." },
        ],
      },
      {
        slug: "dnd-and-preferences",
        title: "DND, consent, and customer preferences",
        excerpt: "Transactional SMS reaches DND numbers. Promotional does not. Here's how we apply that at send time.",
        readMinutes: 4,
        updatedOn: "2026-03-19",
        body: [
          { t: "p", c: "TRAI maintains a National Customer Preference Register (NCPR). Users can set their preference to fully block commercial messages, or selectively allow categories like banking or healthcare." },
          { t: "h", c: "How we honour it" },
          {
            t: "list",
            items: [
              "Transactional and service-implicit messages bypass DND completely (and must, by regulation).",
              "Service-explicit messages are sent only to users who opted in to that specific service.",
              "Promotional messages are scrubbed against the live NCPR at the moment of send.",
              "Scrub results are surfaced in the campaign summary so you see exactly how many were filtered and why.",
            ],
          },
          { t: "p", c: "You can also maintain your own internal suppression list — users who replied STOP, unsubscribed from a link, or requested removal — and we merge it with the NCPR automatically." },
        ],
      },
      {
        slug: "header-and-template-id",
        title: "Where the header and template ID come from",
        excerpt: "Your six-character header belongs to your PE; template IDs are 19-digit numbers assigned at approval.",
        readMinutes: 3,
        updatedOn: "2026-03-20",
        body: [
          { t: "p", c: "DLT issues two identifiers that every outbound SMS must carry: the header (six characters, owned by your PE) and the template ID (19 digits, unique per approved content)." },
          { t: "h", c: "Where to find them in SMSLocal" },
          {
            t: "list",
            items: [
              "Compliance → Headers — all your approved six-character headers with their categories.",
              "Compliance → Templates — every template with its 19-digit ID, category, and live status.",
              "Campaigns → Composer — header and template ID auto-populate when you pick a template.",
              "API — both are required fields on /v2/sms/send; mismatch returns a 400 with a clear error.",
            ],
          },
          { t: "p", c: "If a template is suspended on the operator side, we show it in amber on the list with the last-known reason so you can take action before your next send." },
        ],
      },
      {
        slug: "appeals-process",
        title: "How to appeal a rejected DLT template",
        excerpt: "If the rejection reason is wrong, the appeal takes 24–48 hours and succeeds about 70% of the time.",
        readMinutes: 3,
        updatedOn: "2026-03-21",
        body: [
          { t: "p", c: "Operators allow one or two appeals per rejected template. A well-worded appeal that cites the use case and provides context is much more likely to succeed than a blunt resubmission." },
          { t: "h", c: "What to include in the appeal" },
          {
            t: "steps",
            items: [
              "The original template text and category.",
              "The specific rejection reason you're contesting.",
              "A plain-English description of the customer journey that triggers this message.",
              "An example of the fully-filled-in message (what the end user actually sees).",
              "Why the category is correct — who opted in, when, on what form.",
            ],
          },
          { t: "p", c: "We're happy to draft the appeal for enterprise customers. Submit a support ticket with your template ID and we'll get it in the queue within a business day." },
        ],
      },
    ],
  },

  {
    slug: "billing",
    title: "Billing & Wallet",
    description: "Top-ups, GST invoices, auto-recharge, refunds, and plan changes.",
    icon: CreditCard,
    articles: [
      {
        slug: "add-credits",
        title: "Adding credits to your wallet",
        excerpt: "UPI, cards, net banking and NEFT. Credits are non-expiring and fully consumable.",
        readMinutes: 2,
        updatedOn: "2026-03-22",
        body: [
          { t: "p", c: "Your wallet balance is real INR, not proprietary tokens. Every send debits the exact per-message price. Unused credit stays on your account indefinitely — we do not expire balances." },
          { t: "h", c: "How to top up" },
          {
            t: "steps",
            items: [
              "Billing → Wallet → Add credits.",
              "Enter any amount from ₹500 upwards.",
              "Pick a payment method. UPI, card, net banking are instant.",
              "For NEFT/RTGS above ₹1,00,000, use the pre-filled beneficiary details and your balance updates within two banking hours.",
            ],
          },
          {
            t: "callout",
            tone: "info",
            title: "GST",
            body: "GST at 18% is added on top and is fully creditable against your own output liability. Every top-up generates an auto-emailed tax invoice.",
          },
        ],
      },
      {
        slug: "auto-recharge",
        title: "Setting up auto-recharge",
        excerpt: "Never run out mid-campaign. Set a threshold and an amount, and we refill automatically.",
        readMinutes: 2,
        updatedOn: "2026-03-23",
        body: [
          { t: "p", c: "Auto-recharge is the single most popular billing feature on the platform. Set it once and forget wallet top-ups forever." },
          { t: "h", c: "How to enable" },
          {
            t: "steps",
            items: [
              "Billing → Auto-recharge → Enable.",
              "Pick a threshold — when balance drops below this, the refill fires. ₹2,000 is the popular default.",
              "Pick a refill amount — ₹10,000 is the default.",
              "Authorise a saved card or e-mandate from your bank. UPI AutoPay is also supported.",
              "Confirm. A small verification charge (refunded within 7 days) goes through on card methods.",
            ],
          },
          { t: "p", c: "You'll get a Slack/email alert on every auto-recharge so finance always knows. If a refill fails, we send two reminder emails before the balance actually hits zero." },
        ],
      },
      {
        slug: "gst-invoices",
        title: "Finding and downloading your GST invoices",
        excerpt: "Every top-up and every monthly usage cycle generates a GST-compliant invoice. Auto-emailed and on-demand.",
        readMinutes: 2,
        updatedOn: "2026-03-24",
        body: [
          { t: "p", c: "SMSLocal is a registered Indian entity with a valid GSTIN. Every invoice includes your GSTIN, our GSTIN, HSN/SAC codes, and tax breakdown — ready for your input-credit claim." },
          { t: "h", c: "Three ways to get invoices" },
          {
            t: "list",
            items: [
              "Auto-emailed — to the billing contact address you set, within 30 minutes of each transaction.",
              "Dashboard — Billing → Invoices. Filter by date range and bulk-download as ZIP.",
              "API — GET /v2/billing/invoices for programmatic sync into your ERP.",
            ],
          },
          { t: "p", c: "If your GSTIN changes or you need the address updated on a specific invoice, raise a support ticket — we reissue within two business hours." },
        ],
      },
      {
        slug: "refunds-and-disputes",
        title: "Refunds and chargebacks",
        excerpt: "We refund unused credit and mistaken top-ups. We don't refund spent credit except for platform failures.",
        readMinutes: 3,
        updatedOn: "2026-03-25",
        body: [
          { t: "p", c: "Our refund policy is written to be fair and predictable: you always get back money you haven't used yet, and you never pay for a failure on our side." },
          { t: "h", c: "What's refundable" },
          {
            t: "list",
            items: [
              "Unused wallet balance on account closure — refunded in full to the original payment method within 7 working days.",
              "Duplicate top-ups — refunded in full within 48 hours of ticket.",
              "Platform failures (our API was down, DLR was lost) — credits back within 24 hours of ticket.",
              "Rejected sends (template mismatch, invalid number) — automatically credited back the same day, visible in the usage report.",
            ],
          },
          { t: "p", c: "What's not refundable: delivered messages, operator-side failures where the operator confirmed delivery, and opt-outs after the send (these don't cost you anyway)." },
        ],
      },
      {
        slug: "change-plan",
        title: "Changing your plan",
        excerpt: "Upgrade or downgrade at any time. Pro-rated to the day, no termination fees.",
        readMinutes: 2,
        updatedOn: "2026-03-26",
        body: [
          { t: "p", c: "Plans on SMSLocal control volume commitments and negotiated per-message rates, not feature gates. Every feature is on every plan. Upgrading gets you a lower per-message rate; downgrading moves you to the next lower bracket on the first of next month." },
          { t: "h", c: "To change plan" },
          {
            t: "steps",
            items: [
              "Billing → Plan → Change plan.",
              "Pick the target plan. You see the new per-message rates and the monthly minimum commitment (if any).",
              "Confirm. Upgrade takes effect immediately; downgrade at the start of next cycle.",
              "Any pro-rated adjustment shows on the next invoice.",
            ],
          },
          { t: "p", c: "Enterprise customers with custom contracts should email their account manager — changes are made within one business day." },
        ],
      },
    ],
  },

  {
    slug: "api",
    title: "API & Integrations",
    description: "REST docs, SDKs, webhooks, sandbox mode, Shopify, Zapier, and more.",
    icon: Code2,
    articles: [
      {
        slug: "authentication",
        title: "Authenticating API requests",
        excerpt: "One API key per environment. Pass it as a Bearer token on every request.",
        readMinutes: 3,
        updatedOn: "2026-03-27",
        body: [
          { t: "p", c: "Every API request needs an Authorization header with a Bearer token. Keys come in live and sandbox variants — same API surface, separate balances." },
          { t: "h", c: "Getting a key" },
          {
            t: "steps",
            items: [
              "Developers → API keys → Create key.",
              "Pick the environment (live or sandbox) and an optional label.",
              "Copy the key — it's shown only once. Store it in your secrets manager.",
              "Rotate keys anytime. Deleting an old key takes effect immediately.",
            ],
          },
          {
            t: "code",
            lang: "bash",
            code: `curl -X POST https://api.smslocal.in/v2/sms/send \\
  -H "Authorization: Bearer sk_live_xxx" \\
  -H "Content-Type: application/json" \\
  -d '{
    "to": "+919876543210",
    "sender": "SMSLCL",
    "template_id": "1234567890123456789",
    "variables": { "name": "Priya", "otp": "482915" }
  }'`,
          },
        ],
      },
      {
        slug: "webhooks-signing",
        title: "How webhooks are signed and verified",
        excerpt: "Every webhook carries an HMAC-SHA256 signature. Verify it before trusting the payload.",
        readMinutes: 4,
        updatedOn: "2026-03-28",
        body: [
          { t: "p", c: "Webhook endpoints are public by definition. To confirm that an incoming request actually came from SMSLocal and wasn't tampered with, verify the signature in every webhook header." },
          { t: "h", c: "Verification steps" },
          {
            t: "steps",
            items: [
              "Read the X-SMSLocal-Signature header — it contains a timestamp and an HMAC.",
              "Reject requests where the timestamp is older than 5 minutes (prevents replay).",
              "Compute HMAC-SHA256 over 'timestamp.raw_body' using your webhook secret.",
              "Compare the computed HMAC with the one in the header using constant-time equality.",
              "Only act on the payload if the HMACs match.",
            ],
          },
          {
            t: "code",
            lang: "javascript",
            code: `import crypto from "node:crypto"

function verify(req, secret) {
  const [tsPart, sigPart] = req.headers["x-smslocal-signature"].split(",")
  const ts = tsPart.split("=")[1]
  const sig = sigPart.split("=")[1]
  if (Date.now() / 1000 - Number(ts) > 300) return false
  const expected = crypto
    .createHmac("sha256", secret)
    .update(\`\${ts}.\${req.rawBody}\`)
    .digest("hex")
  return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))
}`,
          },
        ],
      },
      {
        slug: "sdks",
        title: "Official SDKs",
        excerpt: "Node, Python, PHP, Ruby, Go, Java and .NET. All open source, all versioned in lockstep.",
        readMinutes: 2,
        updatedOn: "2026-03-29",
        body: [
          { t: "p", c: "The SDKs wrap the REST API with language-native types, retry logic, idempotency keys, and a pluggable logger. You don't need them — curl works fine — but they eliminate the common boilerplate." },
          { t: "h", c: "Install" },
          {
            t: "code",
            lang: "bash",
            code: `# Node.js
npm install @smslocal/node

# Python
pip install smslocal

# PHP
composer require smslocal/smslocal-php

# Ruby
gem install smslocal

# Go
go get github.com/smslocal/smslocal-go`,
          },
          { t: "p", c: "All SDKs ship with typed responses, a built-in exponential-backoff retry policy, and automatic idempotency-key generation. Source is on GitHub under the smslocal org." },
        ],
      },
      {
        slug: "sandbox-mode",
        title: "Sandbox mode",
        excerpt: "Develop and test against a real API surface without sending real messages or burning credits.",
        readMinutes: 3,
        updatedOn: "2026-03-30",
        body: [
          { t: "p", c: "Sandbox is a full mirror of the live API. It has its own keys (sk_test_*), its own wallet (free credits that don't expire), and returns deterministic responses that let you test the full range of success and error paths." },
          { t: "h", c: "Deterministic test data" },
          {
            t: "list",
            items: [
              "+919999999999 — always delivers successfully after 300ms.",
              "+919999999911 — always fails with INVALID_NUMBER.",
              "+919999999922 — always fails with DND_BLOCKED.",
              "+919999999933 — always fails with TEMPLATE_MISMATCH.",
              "+919999999944 — times out, useful for testing your retry logic.",
              "OTP 999999 — always verifies successfully on /v2/otp/verify.",
            ],
          },
          { t: "p", c: "Webhooks fire identically in sandbox, so you can point a local ngrok URL and walk through the full flow before touching production." },
        ],
      },
      {
        slug: "rate-limits",
        title: "Rate limits and throughput",
        excerpt: "Default 1000 requests per minute, burst to 5000. Enterprise gets higher custom limits.",
        readMinutes: 2,
        updatedOn: "2026-03-31",
        body: [
          { t: "p", c: "The API is engineered to not rate-limit sensible usage patterns. The default ceilings exist only to protect shared infrastructure from runaway scripts — genuine traffic spikes are handled with a sliding-window burst allowance." },
          { t: "h", c: "Default limits" },
          {
            t: "list",
            items: [
              "1000 requests per minute, sustained, per API key.",
              "5000 requests per minute, burst, as long as sustained rate stays under the cap.",
              "100 simultaneous open connections per key.",
              "Rate-limit headers (X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset) on every response.",
            ],
          },
          { t: "p", c: "Enterprise plans start at 10,000/min sustained and can be raised further against a capacity reservation — useful for Black Friday or exam-result-day traffic." },
        ],
      },
      {
        slug: "shopify-integration",
        title: "Shopify integration",
        excerpt: "Abandoned-cart, order confirmation, shipment tracking, and review-request flows in a single app install.",
        readMinutes: 4,
        updatedOn: "2026-04-01",
        body: [
          { t: "p", c: "The SMSLocal Shopify app adds SMS and WhatsApp messaging into the native Shopify admin. No code, no webhooks to wire up, and all events respect Shopify's consent framework." },
          { t: "h", c: "Flows you can enable out of the box" },
          {
            t: "list",
            items: [
              "Order confirmation — SMS + WhatsApp, sent within 60 seconds of checkout.",
              "Payment confirmation — after successful payment.",
              "Shipment tracking — with carrier-specific tracking URL and live updates.",
              "Delivery confirmation — once the order is marked delivered.",
              "Abandoned cart — 30-minute, 4-hour, and 24-hour nudges.",
              "Review request — 3 days after delivery, one-tap reply to submit.",
              "Post-purchase upsell — day 14, segmented by collection.",
            ],
          },
          { t: "p", c: "Every flow is pausable, editable, and A/B-testable per variant. GST invoices for Shopify-generated usage roll into your single monthly SMSLocal invoice." },
        ],
      },
    ],
  },
]

/* --------------------------- Helpers --------------------------- */

export function getCategory(slug: string): HelpCategory | undefined {
  return HELP_CATEGORIES.find((c) => c.slug === slug)
}

export function getArticle(
  categorySlug: string,
  articleSlug: string,
): { category: HelpCategory; article: HelpArticle } | undefined {
  const category = getCategory(categorySlug)
  if (!category) return undefined
  const article = category.articles.find((a) => a.slug === articleSlug)
  if (!article) return undefined
  return { category, article }
}

export function getAllArticlePaths(): { category: string; article: string }[] {
  return HELP_CATEGORIES.flatMap((c) =>
    c.articles.map((a) => ({ category: c.slug, article: a.slug })),
  )
}

/**
 * Popular topics used on the help index. Each entry maps a question to a real
 * article path so every link on the index page resolves to live content.
 */
export const POPULAR_TOPIC_LINKS: { title: string; href: string }[] = [
  {
    title: "How do I register a DLT Principal Entity (PE)?",
    href: "/resources/help/dlt/register-principal-entity/",
  },
  {
    title: "What is the difference between transactional and promotional SMS in India?",
    href: "/resources/help/sms/transactional-vs-promotional/",
  },
  {
    title: "How long does WhatsApp Business API onboarding take?",
    href: "/resources/help/whatsapp/business-api-onboarding/",
  },
  {
    title: "Why is my SMS showing as 'submitted' but not 'delivered'?",
    href: "/resources/help/sms/delivery-reports-explained/",
  },
  {
    title: "How do I set up a six-character sender ID for DLT templates?",
    href: "/resources/help/sms/sender-id-allocation/",
  },
  {
    title: "Does SMSLocal support multilingual SMS? Which scripts?",
    href: "/resources/help/sms/unicode-and-multilingual/",
  },
  {
    title: "How do I integrate SMSLocal with Shopify?",
    href: "/resources/help/api/shopify-integration/",
  },
  {
    title: "What happens to unused credits on my wallet?",
    href: "/resources/help/billing/add-credits/",
  },
  {
    title: "Can I schedule WhatsApp template broadcasts in advance?",
    href: "/resources/help/whatsapp/broadcast-lists-and-consent/",
  },
  {
    title: "How do webhooks authenticate? Are they signed?",
    href: "/resources/help/api/webhooks-signing/",
  },
]
