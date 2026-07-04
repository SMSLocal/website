/**
 * Customer stories data module.
 *
 * Each story is long-form editorial content that pairs a narrative with
 * concrete before/after metrics, a named spokesperson quote, and the
 * SMSLocal products involved. The stories below are representative of
 * the businesses we work with — composite profiles reflecting typical
 * patterns we see from fintech, D2C, and EdTech customers in India.
 *
 * When adding a new story, keep the shape consistent so the listing
 * card and the detail page can render without extra conditionals.
 */

export type StoryProduct =
  | "Bulk SMS"
  | "OTP SMS"
  | "WhatsApp Business API"
  | "AI WhatsApp Agents"
  | "Quick SMS"

export type StoryMetric = {
  /** One-line label explaining what we measured. */
  label: string
  /** Headline number after rollout — the value the eye should land on. */
  after: string
  /**
   * Optional baseline value pre-SMSLocal. When present, it renders with
   * a struck-through style next to the after value.
   */
  before?: string
  /**
   * Optional qualitative note — shipped within, confidence level, etc.
   */
  note?: string
}

export type StorySection = {
  /** Sub-heading for the section, rendered as an h2 in the detail page. */
  heading: string
  /** Paragraph-level narrative body. One string per paragraph. */
  body: string[]
}

export type CustomerStory = {
  slug: string
  /** Short display name of the customer. */
  company: string
  /** One-sentence description of what the company does. */
  companyDescription: string
  /** e.g. "Digital lending NBFC", "D2C ethnicwear brand". */
  industry: string
  /** Primary headquarters city — used as a small meta label. */
  location: string
  /**
   * Publish date in ISO 8601. Used for ordering and the meta row on the
   * detail page. Case studies are ordered newest-first on the index.
   */
  publishedAt: string
  /** Short article-style title for the story. */
  title: string
  /** Short description used on the index card and meta tags. */
  summary: string
  /** Editorial cover image (16:9). No text/UI/logos baked into the art. */
  coverImage: string
  coverAlt: string
  /** Products SMSLocal rolled out for this customer. */
  products: StoryProduct[]
  /** Key metrics, rendered as a stat strip on the detail page. */
  metrics: StoryMetric[]
  /** Pull quote shown in the hero band of the detail page. */
  quote: {
    text: string
    name: string
    role: string
    /** Optional photo — square 1:1 editorial portrait. */
    portrait?: string
    portraitAlt?: string
  }
  /** Ordered narrative sections for the detail page body. */
  sections: StorySection[]
  /** Tags used for filter chips and related stories (future work). */
  tags: string[]
}

export const ALL_STORIES: CustomerStory[] = [
  {
    slug: "nirvaana-capital",
    company: "Nirvaana Capital",
    companyDescription:
      "Mumbai-based digital lending NBFC offering personal and small-business loans across tier-1 and tier-2 India.",
    industry: "Digital lending NBFC",
    location: "Mumbai, Maharashtra",
    publishedAt: "2026-03-18",
    title:
      "How Nirvaana Capital cut loan-OTP delivery from nine seconds to two — and lifted approvals by 17%",
    summary:
      "A mid-sized NBFC replaced its single-operator SMS stack with SMSLocal OTP SMS and WhatsApp fallback — lifting application completions by double digits.",
    coverImage: "/customer-stories/nirvaana-capital-cover.jpg",
    coverAlt:
      "Warm-lit modern fintech office interior with polished concrete floors, minimalist wooden furniture, a large potted fiddle-leaf fig plant, and muted emerald upholstered chairs beside floor-to-ceiling windows.",
    products: ["OTP SMS", "WhatsApp Business API"],
    metrics: [
      {
        label: "Median OTP delivery time",
        before: "9.1s",
        after: "2.3s",
        note: "At 4x peak QPS",
      },
      {
        label: "Sub-5-second delivery rate",
        before: "61%",
        after: "98.4%",
      },
      {
        label: "Application completion rate",
        before: "—",
        after: "+17.3%",
        note: "Eight weeks after rollout",
      },
      {
        label: "Monthly infrastructure cost",
        after: "−22%",
        note: "Compared to incumbent aggregator",
      },
    ],
    quote: {
      text: "We stopped thinking of OTP delivery as a product problem and realised it was a revenue problem. Every dropped OTP was a customer we had paid to acquire and then lost at the last step. SMSLocal’s routing and operator-level visibility gave us back that last step.",
      name: "Priya Ramanathan",
      role: "VP Engineering, Nirvaana Capital",
      portrait: "/customer-stories/nirvaana-capital-portrait.jpg",
      portraitAlt:
        "Portrait of Priya Ramanathan, a confident Indian woman in her mid-30s with a short professional bob, wearing a charcoal blazer over a cream blouse, in soft natural window light.",
    },
    sections: [
      {
        heading: "The challenge: OTPs that arrived too late to matter",
        body: [
          "Nirvaana Capital had spent three years tuning its loan-application funnel — the real-time KYC, the bureau call, the income-verification step. By early 2026, the team had every stage humming inside a two-minute window. Every stage, that is, except the one step they did not own: the OTP that confirmed the applicant’s mobile number before the decisioning engine even started.",
          "Their incumbent SMS aggregator was routed through a single operator agreement. Delivery was fine on weekday mornings — nine seconds, on average. But weekday evenings, the QPS climbed, the operator queue backed up, and customers saw OTP wait times drift past twenty and thirty seconds. By forty seconds, the applicant had switched tabs. By sixty, they were gone. The loan was unmade.",
          "“We could see the funnel break in the dashboard,” Ramanathan recalls. “Every evening around seven, a clean 17-point dip in OTP verification. And then it just stayed dipped until ten at night. We were losing the best customers of the day — the ones motivated enough to apply at end-of-day — to a routing problem we did not even know we had.”",
        ],
      },
      {
        heading: "The approach: treat routing as a first-class product",
        body: [
          "The Nirvaana team evaluated four aggregators over six weeks. The decision point wasn’t pricing — the top three were within 8% of each other. It was visibility. “We wanted to see which operator we were on, for which handset, at which time of day, and what the p95 latency looked like,” Ramanathan says. “Everyone else showed us a delivery-rate number. SMSLocal showed us the chart.”",
          "SMSLocal rolled Nirvaana onto multi-operator OTP routing with automatic fastest-path selection per destination circle. When Airtel queue latency climbed past a threshold, the next message silently moved to Jio or Vi with no code change at Nirvaana’s end. A secondary WhatsApp Business API OTP path was wired in for repeat customers who had already opted in.",
          "The rollout was careful. Nirvaana ran SMSLocal in shadow mode for two weeks — every OTP sent via the incumbent was mirrored to SMSLocal and the latency recorded but no user-facing traffic switched. Once the gap was unambiguous, they moved a single tier-2 circle over, waited a week, then moved the rest.",
        ],
      },
      {
        heading: "The results: a funnel that holds at peak",
        body: [
          "Eight weeks after full rollout, the evening dip was gone. Median OTP delivery stabilised at 2.3 seconds, with the sub-five-second delivery rate sitting at 98.4% even at 4x peak QPS. The application-completion rate climbed 17.3% year-on-year — a lift Nirvaana’s growth team attributes almost entirely to the OTP step, since nothing else in the funnel changed over the same window.",
          "The knock-on effect was on infrastructure cost. Because sub-operator routing avoided expensive fallback retries and because Nirvaana could shift some repeat-customer OTPs to WhatsApp at a fraction of SMS unit economics, monthly spend on authentication fell 22% even with a meaningfully larger top of funnel.",
          "“The thing I did not expect,” Ramanathan adds, “is that compliance got easier too. DLT template violations dropped to zero because SMSLocal surfaces template mismatches before the send, not after. We used to spend two engineer-days a month on audits. Now we spend about an hour.”",
        ],
      },
      {
        heading: "What’s next",
        body: [
          "Nirvaana is piloting SMSLocal’s AI WhatsApp agents for post-approval customer questions — the “when will my loan amount be credited, and where do I update my bank account” volume that currently lands in email support. Early numbers suggest it absorbs roughly 40% of the contact-centre volume without human review.",
          "“We treat messaging infrastructure like we treat our core banking stack now,” Ramanathan says. “If the p95 moves by 200 milliseconds, someone is on a call.”",
        ],
      },
    ],
    tags: ["Fintech", "OTP", "DLT", "Scale"],
  },
  {
    slug: "kaveri-co",
    company: "Kaveri & Co.",
    companyDescription:
      "Bengaluru-based D2C ethnicwear label shipping handwoven sarees and contemporary Indian silhouettes nationally.",
    industry: "D2C ethnicwear",
    location: "Bengaluru, Karnataka",
    publishedAt: "2026-02-24",
    title:
      "Kaveri & Co. rebuilt post-purchase on WhatsApp — and recovered 3.1x more abandoned carts",
    summary:
      "D2C label moved order notifications, cart recovery, and post-purchase support to SMSLocal WhatsApp API. Support fell 41%; abandoned-cart revenue tripled.",
    coverImage: "/customer-stories/kaveri-co-cover.jpg",
    coverAlt:
      "Warm-lit D2C packaging station with neatly folded handwoven sarees in emerald, mustard, and rust, a kraft paper box, a roll of natural twine, fabric scissors, and a sprig of dried marigold on a wooden table.",
    products: ["WhatsApp Business API", "Bulk SMS", "AI WhatsApp Agents"],
    metrics: [
      {
        label: "Abandoned-cart recovery revenue",
        after: "3.1x",
        note: "vs. previous email-only flow",
      },
      {
        label: "CAC payback period",
        after: "−28%",
      },
      {
        label: "Support tickets per 1,000 orders",
        before: "47",
        after: "28",
      },
      {
        label: "Template approval time",
        before: "~4 days",
        after: "under 24 hours",
      },
    ],
    quote: {
      text: "Our customers are not reading marketing email. They are reading WhatsApp. Once we admitted that to ourselves, the whole post-purchase experience changed — and so did the retention curve.",
      name: "Ananya Srinivasan",
      role: "Founder & CEO, Kaveri & Co.",
      portrait: "/customer-stories/kaveri-co-portrait.jpg",
      portraitAlt:
        "Portrait of Ananya Srinivasan, an Indian woman in her late 30s with loosely tied-back black hair, wearing a deep emerald green handloom kurta, softly lit by warm daylight in her boutique studio.",
    },
    sections: [
      {
        heading: "The challenge: a post-purchase experience split across four tools",
        body: [
          "By its second anniversary, Kaveri & Co. had grown from a small studio to a team of eleven shipping roughly three thousand orders a month across India. The product was strong — repeat rate hovered around 28% — but the post-purchase experience was stitched together from four tools, each bought at a different time for a different reason.",
          "Order confirmations went out as transactional email plus an aggregator SMS. Shipping updates came from the courier partner directly, and rarely matched the brand tone. Abandoned-cart recovery lived in the email service provider. And WhatsApp — the channel customers actually used to reach out — was a single shared business number answered by whoever was free.",
          "“We would get the same four questions about a saree nineteen times in a row on WhatsApp,” Srinivasan recalls. “Care instructions, fall stitching, return window, exchange of size. The human answering had the answers, but the answers were not the same each time, and we were paying a person to do it for ten hours a day.”",
        ],
      },
      {
        heading: "The approach: one channel, four jobs",
        body: [
          "Kaveri chose SMSLocal for the WhatsApp Business API rollout after a trial against two aggregators. The decision came down to how quickly templates could move from drafted to approved — a metric that matters enormously for a brand running weekly drops — and how much of the work their small team could self-serve without a solutions engineer on the line every week.",
          "The rollout sequenced post-purchase first: order confirmation, dispatch notification, delivery confirmation, and a single well-timed review request. Then cart recovery moved from email to WhatsApp using a soft two-touch sequence at ninety minutes and twenty-four hours, with a genuine offer on the second touch for high-intent carts only.",
          "Finally, the team rolled SMSLocal’s AI WhatsApp Agent on top of the same thread. The agent answered care instructions, size charts, return policy, and exchange eligibility using Kaveri’s own documentation — and cleanly handed off to a human the moment the customer said anything that needed one.",
        ],
      },
      {
        heading: "The results: a single thread, three meaningful shifts",
        body: [
          "Abandoned-cart recovery revenue tripled — 3.1x the email-only baseline — within two months of rollout. The gain came partly from WhatsApp’s higher open rates, but more from timing: a cart abandoned at 9:15 pm and nudged at 10:45 pm converts much better than one nudged at 9 am the next morning.",
          "Support load fell from 47 tickets per thousand orders to 28. The AI agent absorbed roughly 60% of post-purchase messages without escalation, and the human team spent the saved time on the 5% of conversations that were actually complex — size-exchange coordination, damage claims, pre-order queries.",
          "The third shift was brand tone. “Every touchpoint now sounds like us,” Srinivasan says. “When the courier updates go out, they are on our WhatsApp, in our voice. When the review request goes, it is written by our copywriter, not a template a third party wrote for an unrelated industry.”",
        ],
      },
      {
        heading: "What’s next",
        body: [
          "Kaveri is rolling SMSLocal’s catalogue integration onto WhatsApp, so a returning customer can browse and check out inside the thread without ever returning to the website. Early tests show roughly 1.8x higher conversion on a catalogue-only thread versus a thread that redirects to the website.",
          "“We are building the brand inside a messaging thread,” Srinivasan says. “That is the honest way to describe it. And for a D2C label in India, that is where the brand actually lives.”",
        ],
      },
    ],
    tags: ["D2C", "E-commerce", "WhatsApp", "AI Agents"],
  },
  {
    slug: "srinivasa-academy",
    company: "Srinivasa Academy",
    companyDescription:
      "NEET and JEE coaching institute with 40,000+ students across Rajasthan, Maharashtra, and an online division.",
    industry: "EdTech / coaching institute",
    location: "Kota, Rajasthan",
    publishedAt: "2026-01-09",
    title:
      "Srinivasa Academy ships exam-day results to 40,000 students in under 90 seconds",
    summary:
      "Coaching institute moved admissions, results, and parent comms onto SMSLocal. DLT approval fell from 6 days to 14 hours; WhatsApp engagement is now 3x SMS.",
    coverImage: "/customer-stories/srinivasa-academy-cover.jpg",
    coverAlt:
      "Warm golden-hour study desk scene with a brass lamp casting amber light onto closed blank notebooks, a wooden pencil case, and a small clay pot of green leaves, with a blurred empty classroom behind.",
    products: ["Bulk SMS", "WhatsApp Business API"],
    metrics: [
      {
        label: "Result-day SMS delivery window",
        before: "~12 min",
        after: "under 90s",
        note: "For 40,000+ students in a single burst",
      },
      {
        label: "DLT template approval time",
        before: "6 days",
        after: "14 hours",
      },
      {
        label: "Parent open rate — WhatsApp vs SMS",
        after: "2.8x",
      },
      {
        label: "Admissions campaign ROI",
        after: "+41%",
        note: "Season on season",
      },
    ],
    quote: {
      text: "On results day, we are talking to forty thousand families at the same time. A twelve-minute delivery window means the first family knows, the last family does not, and by the time the last SMS lands the WhatsApp groups have already misinformed everyone. Ninety seconds gives us a single moment of truth.",
      name: "Dr. Ramesh Sharma",
      role: "Director, Srinivasa Academy",
      portrait: "/customer-stories/srinivasa-academy-portrait.jpg",
      portraitAlt:
        "Portrait of Dr. Ramesh Sharma, a distinguished Indian man in his early 50s with salt-and-pepper hair, wearing a simple navy blue kurta, standing in front of a softly blurred traditional wooden bookshelf.",
    },
    sections: [
      {
        heading: "The challenge: forty thousand families, one moment",
        body: [
          "Srinivasa Academy runs four exam cycles a year for its NEET and JEE cohorts, plus the admissions season that runs May through July. On each result day, the institute has to push individual scorecards, rank, and next-step instructions to roughly forty thousand students and an equal number of parents — in a single burst, ideally before any of them read a leaked screenshot on a WhatsApp group.",
          "The institute’s previous bulk SMS aggregator delivered the batch reliably, but slowly. A clean run took about twelve minutes from the first message to the last. In the context of exam day, those twelve minutes were long enough for families at the end of the queue to hear their neighbour’s result first, for the academy’s phones to start ringing, and for the support team to be fielding rank questions before the actual rank SMS had landed.",
          "The second compounding problem was template approval. For an institute that runs frequent, time-bound admissions campaigns, waiting five to six days for a DLT content template to clear is the difference between a campaign landing on schedule and missing an entire batch. “We had a finance team asking us why we had budgeted for Tuesday and sent on Saturday,” Sharma says. “That is not a messaging problem. That is a business problem wearing a messaging disguise.”",
        ],
      },
      {
        heading: "The approach: parallel delivery, a human template desk",
        body: [
          "Srinivasa moved to SMSLocal for two specific capabilities. The first was parallel multi-operator dispatch — a single campaign is split across operators at the sender side, so the forty-thousand-message burst clears in a single minute rather than twelve. The second was SMSLocal’s template-approval help desk: a human reviewer who sits with institute-side drafts, flags the exact compliance blocker before submission, and cuts the back-and-forth from five rounds to one.",
          "The team added WhatsApp Business API for parent communications alongside SMS. For exam results, the SMS remained the official channel — legally receipt-able, DLT-compliant, auditable. But a parallel WhatsApp message gave parents the rich-content version: a rank summary, a counselling timeline, a link to the detailed report card. Parent engagement on WhatsApp settled at roughly 2.8 times SMS open rates within the first three campaigns.",
          "“We did not migrate SMS to WhatsApp,” Sharma emphasises. “We ran them together. SMS is for trust; WhatsApp is for depth. A parent needs both.”",
        ],
      },
      {
        heading: "The results: a quiet results day",
        body: [
          "On the first full cycle after rollout, the entire forty-thousand-message burst cleared in 82 seconds. By the time the first parents opened the SMS, the last parents already had theirs. The call volume to the academy’s admissions desk during the first two hours of results day fell by 38% year-on-year — a shift Sharma attributes directly to the delivery window.",
          "On the admissions campaigns, the thing that changed was not the click rate. It was the planning cycle. With template approval landing reliably within fourteen hours, the academy’s marketing team started scheduling campaigns a week ahead instead of three. Season-on-season admissions campaign ROI rose 41%, with the institute’s analytics team attributing most of the lift to timing rather than creative.",
          "“A good admissions SMS on Tuesday beats a brilliant one on Friday,” Sharma says. “The boring operational part turns out to be where the ROI lives.”",
        ],
      },
      {
        heading: "What’s next",
        body: [
          "Srinivasa is rolling out SMSLocal’s AI WhatsApp agent for admissions enquiries — the repetitive questions about fees, hostel availability, transport, and scholarship eligibility that consume a counsellor’s day during peak season. The institute’s aim is for counsellors to spend their time on the conversations that actually need judgement.",
          "“An excellent counsellor is rare and valuable,” Sharma says. “We should not be spending that counsellor’s afternoon answering whether the hostel has a mess. We should be spending it helping a child choose between two universities.”",
        ],
      },
    ],
    tags: ["EdTech", "Bulk SMS", "WhatsApp", "DLT"],
  },
]

/**
 * Returns stories sorted newest-first. Use this as the default listing
 * ordering on the index page and for "more stories" rails.
 */
export function getAllStories(): CustomerStory[] {
  return [...ALL_STORIES].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  )
}

/**
 * Look up a story by its slug. Returns undefined when the slug doesn't
 * match a published story — the caller should render a 404.
 */
export function getStory(slug: string): CustomerStory | undefined {
  return ALL_STORIES.find((s) => s.slug === slug)
}

/**
 * Returns the other stories in the collection, used for the
 * "more stories" rail on the detail page. Ordered newest-first.
 */
export function getOtherStories(slug: string): CustomerStory[] {
  return getAllStories().filter((s) => s.slug !== slug)
}

/**
 * Format a story's publishedAt into a readable display date.
 */
export function formatStoryDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}
