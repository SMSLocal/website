import {
  A,
  Blockquote,
  BlogFigure,
  Callout,
  FigureTable,
  H2,
  H3,
  LI,
  Lead,
  OL,
  P,
  Strong,
  UL,
} from "@/components/blog/blog-prose"

export default function BulkWhatsAppMessagingPost() {
  return (
    <>
      <Lead>
        Bulk WhatsApp messaging lets businesses send thousands of messages to opted-in customers at
        once — order updates, offers, reminders, and campaigns — all on the official WhatsApp Business
        API. This guide explains how it actually works in 2026, what it costs, and how to do it
        without getting your number banned.
      </Lead>

      <BlogFigure
        src="/blog/bulk-whatsapp-messaging-fig1.png"
        width={2046}
        height={1262}
        priority
        alt="A bulk WhatsApp broadcast dashboard showing an approved template going out to a contact list, with sent, delivered, read and replied delivery metrics."
        caption="A bulk WhatsApp broadcast and its delivery metrics."
      />

      <Callout variant="info" title="Official API only">
        This guide covers the official <A href="/products/whatsapp-business-api/">WhatsApp Business
        API</A> route. Unofficial tools that automate WhatsApp Web are against Meta&rsquo;s Terms of
        Service and will get your number permanently banned. There is no safe shortcut.
      </Callout>

      <H2 id="what-it-is">What bulk WhatsApp messaging actually is</H2>
      <P>
        Bulk WhatsApp messaging is the ability to send a single message — an order confirmation, a
        promotional offer, an event reminder — to a large list of contacts simultaneously, through the
        WhatsApp Business Platform. Each recipient gets an individual message in their personal
        WhatsApp inbox, not a group chat.
      </P>
      <P>
        The key word is <Strong>official</Strong>. Meta (WhatsApp&rsquo;s parent company) controls
        exactly who can send bulk messages and on what terms. You access this through a Meta-approved
        Business Solution Provider (BSP) — a company like SMSLocal that has a direct API connection to
        WhatsApp&rsquo;s infrastructure.
      </P>

      <H2 id="api-vs-app">API vs. Business App vs. unofficial tools</H2>
      <P>
        There are only three ways to send to many contacts at once, and they are not equally safe.
        Here&rsquo;s how they compare:
      </P>
      <FigureTable
        columns={["Method", "Who it's for", "Bulk sending", "Risk"]}
        rows={[
          ["Official WhatsApp Business API (via BSP)", "Businesses at any scale", "Yes — approved templates to opted-in lists", "Safe and compliant"],
          ["WhatsApp Business App", "Very small businesses", "Limited broadcast lists only", "Low, but doesn't scale"],
          ["Unofficial tools / APK automation", "Nobody — avoid", "Yes, until you're caught", "Permanent number ban"],
        ]}
      />

      <H2 id="how-it-works">How it works — from contact list to delivered message</H2>
      <P>Every bulk sender goes through the same four steps, regardless of volume:</P>
      <BlogFigure
        src="/blog/bulk-whatsapp-messaging-fig2.png"
        width={2045}
        height={785}
        alt="A four-step diagram: build a verified sender account, create and submit message templates, upload your opted-in contact list, then launch the campaign and handle replies."
        caption="The four steps of sending bulk WhatsApp messages."
      />
      <OL>
        <LI><Strong>Build a verified sender account.</Strong> Your business applies for a WhatsApp Business Account (WABA) through a BSP. Meta verifies your business, approves a display name, and assigns a messaging tier that controls how many unique users you can message per day.</LI>
        <LI><Strong>Create and submit message templates.</Strong> Every outbound bulk message must use a pre-approved template. You write it, submit it for Meta review (usually 24–48 hours), and once approved you can use it in campaigns. Templates support variables for personalisation — name, order ID, date.</LI>
        <LI><Strong>Upload your opted-in contact list.</Strong> The most legally sensitive step. WhatsApp requires every recipient to have explicitly consented to receive messages from your business. Sending to contacts who haven&rsquo;t opted in is a Terms violation and the fastest way to get banned.</LI>
        <LI><Strong>Launch the campaign and handle replies.</Strong> Messages go out through the API, and replies arrive back in your inbox — which is where a well-configured platform like SMSLocal lets <A href="/products/ai-agents/">agentic AI</A> handle them automatically, so a broadcast doesn&rsquo;t create a support backlog.</LI>
      </OL>

      <H2 id="message-types">What kinds of messages you can send</H2>
      <P>
        WhatsApp templates fall into three categories, each with different rules about when you can
        send them:
      </P>
      <FigureTable
        columns={["Template category", "When you can use it", "Examples"]}
        rows={[
          ["Utility", "After the customer has transacted or signed up", "Order confirmation, shipping update, payment receipt, appointment reminder"],
          ["Authentication", "Any time, for identity verification", "OTP, login code, 2FA confirmation"],
          ["Marketing", "To opted-in contacts, within messaging limits", "Promotional offers, product launches, seasonal campaigns, back-in-stock alerts"],
        ]}
      />
      <P>
        Marketing templates require explicit opt-in. Utility and authentication templates are easier
        to send because the customer already initiated a transaction.
      </P>
      <Callout variant="tip" title="Rich templates perform better">
        Plain text gets opened, but templates with an image, a document, or CTA buttons see far higher
        engagement. WhatsApp supports header media (image, video, document), body text with variables,
        a footer, and up to three buttons per template.
      </Callout>

      <H2 id="limits-tiers">Messaging limits and tiers in 2026</H2>
      <P>
        WhatsApp controls how many messages you can send through a tiered limit system tied to your
        quality rating — and the rules changed in 2025–26, so older guides are out of date. The
        current picture:
      </P>
      <UL>
        <LI><Strong>Tier 0 (unverified):</Strong> around 250 unique users per 24 hours. New, unverified accounts no longer start at 1,000 — verification is what unlocks the higher tiers.</LI>
        <LI><Strong>Tier 1:</Strong> 1,000 unique users per 24 hours</LI>
        <LI><Strong>Tier 2:</Strong> 10,000 unique users per 24 hours</LI>
        <LI><Strong>Tier 3:</Strong> 100,000 unique users per 24 hours</LI>
        <LI><Strong>Unlimited:</Strong> no daily cap — requires Facebook Business Verification</LI>
      </UL>
      <P>
        Two more 2026 changes worth knowing. First, limits are now assessed at the portfolio level —
        all numbers in a Business Manager share the strongest number&rsquo;s tier, and Meta
        re-evaluates upgrades far more frequently than before. Second, WhatsApp applies a frequency
        cap, so a user receives only a small number of marketing messages per day across all brands —
        another reason relevance beats volume.
      </P>
      <P>
        Your quality rating (High, Medium, Low) is calculated from how many recipients block or report
        your messages. If it drops to Low, your tier is downgraded — which is why list quality and
        opt-in hygiene matter more than any platform feature.
      </P>
      <BlogFigure
        src="/blog/bulk-whatsapp-messaging-fig3.png"
        width={2047}
        height={1137}
        alt="A chart of WhatsApp messaging tiers and their daily unique-user limits in 2026: Tier 0 around 250, Tier 1 1,000, Tier 2 10,000, Tier 3 100,000, and unlimited after business verification."
        caption="WhatsApp messaging tiers and daily limits in 2026."
      />
      <Callout variant="warning" title="Note for AI flows">
        Since early 2026, Meta no longer allows general-purpose AI chatbots (open-ended assistants
        with no business purpose) on the WhatsApp Business Platform. Business AI for support and sales
        is fine — a customer-service or sales assistant is compliant; a general &ldquo;chat with our
        bot about anything&rdquo; experience is not.
      </Callout>

      <H2 id="opt-in">The opt-in requirement — and why it matters</H2>
      <P>
        This is the part most guides gloss over. WhatsApp&rsquo;s policy requires explicit, affirmative
        consent from every contact before you send a marketing message. &ldquo;Explicit&rdquo; means
        they actively checked a box or submitted a form — not a pre-ticked checkbox buried in your
        terms. In India, this also sits under the Digital Personal Data Protection (DPDP) Act, which
        makes clear consent a legal requirement, not just a platform one.
      </P>
      <P>Practically, your opt-in must:</P>
      <UL>
        <LI>Clearly name WhatsApp as the channel the customer is opting into</LI>
        <LI>Name your business specifically</LI>
        <LI>Describe the types of messages they&rsquo;ll receive</LI>
        <LI>Include a way to opt out later (Meta requires you to honour &ldquo;stop&rdquo; messages within 24 hours)</LI>
      </UL>
      <P>
        Businesses that skip this and buy contact lists hit the same wall every time: high block rates,
        a falling quality rating, and eventually a number ban that&rsquo;s nearly impossible to appeal.
      </P>

      <H2 id="cost">What bulk WhatsApp messaging costs</H2>
      <P>
        Pricing has two layers. First, Meta charges a per-conversation fee that varies by country and
        template category — and as of 2024, Meta charges per conversation (a 24-hour session), not per
        message. In India, marketing conversations are priced differently from utility and
        authentication ones.
      </P>
      <P>
        Second, your BSP (like SMSLocal) charges a platform fee on top of the Meta cost — per
        conversation, per message, or as a monthly subscription depending on volume. Most businesses at
        scale negotiate a flat monthly rate.
      </P>
      <Callout variant="info" title="Free conversations">
        Meta includes a monthly allowance of free service conversations. Conversations the customer
        starts (they message you first) are service conversations — another reason a genuine two-way
        WhatsApp presence lowers your total cost.
      </Callout>

      <H2 id="platform">What to look for in a bulk WhatsApp platform</H2>
      <P>Not all BSPs are equal. When evaluating platforms for bulk messaging, check for:</P>
      <UL>
        <LI><Strong>Official BSP status</Strong> — a confirmed Meta partnership, not a reseller of a reseller</LI>
        <LI><Strong>Template management UI</Strong> — create, submit, and track approvals without manual API calls</LI>
        <LI><Strong>Campaign scheduling</Strong> — queue and stagger delivery to avoid sudden quality-rating spikes</LI>
        <LI><Strong>Delivery analytics</Strong> — sent, delivered, read, and replied rates per campaign</LI>
        <LI><Strong>Reply handling</Strong> — an inbox for manual replies, or AI automation for high-volume campaigns</LI>
        <LI><Strong>Opt-out management</Strong> — automatic suppression of STOP contacts from future sends</LI>
      </UL>

      <H2 id="replies">What happens when customers reply</H2>
      <P>
        This is where most bulk platforms fall down. Your broadcast goes to 10,000 people; even a 5%
        reply rate is 500 conversations your team now has to handle. Without a plan, that backlog
        creates a worse experience than not sending at all.
      </P>
      <P>
        The right architecture treats broadcasting and conversations as the same product. When a
        customer replies, agentic AI picks up the thread, answers from your product knowledge base,
        and escalates to a human only when the conversation genuinely needs one. SMSLocal connects
        broadcasting and the inbox so every reply is handled automatically, at any volume.
      </P>

      <H2 id="faq">Frequently asked questions</H2>
      <H3>Can I send bulk WhatsApp messages without a business account?</H3>
      <P>
        No. Personal WhatsApp accounts can only message contacts you&rsquo;ve saved. For bulk outbound
        sends you need a WhatsApp Business Account through the official API. Unofficial tools that
        automate WhatsApp Web will get your number banned, often permanently.
      </P>
      <H3>How many messages can I send per day?</H3>
      <P>
        It depends on your messaging tier and quality rating. Unverified accounts start around 250
        unique recipients per day at Tier 0, then scale to 1,000, 10,000, 100,000, and unlimited as you
        verify and maintain a high quality rating. Block and report rates control whether you move up or
        get downgraded.
      </P>
      <H3>Is bulk WhatsApp messaging legal in India?</H3>
      <P>
        Yes — if you use the official API and have proper opt-in consent. Unlike{" "}
        <A href="/products/bulk-sms/">SMS</A> (governed by TRAI&rsquo;s{" "}
        <A href="/blog/dlt-registration-guide/">DLT framework</A>), WhatsApp is governed by Meta&rsquo;s
        own Terms and Commerce Policy, and consent is also required under India&rsquo;s DPDP Act. You
        don&rsquo;t need DLT registration for WhatsApp, but you do need explicit consent and must
        respect opt-outs.
      </P>
      <H3>What&rsquo;s the difference between bulk SMS and bulk WhatsApp?</H3>
      <P>
        Bulk SMS has wider reach (any phone, no app required) but is text-only with a 160-character
        limit. Bulk WhatsApp supports rich media, buttons, and interactive flows but requires the
        recipient to have WhatsApp and to have opted in. For most Indian businesses the two work
        together — WhatsApp for engaged customers, SMS for transactional alerts to everyone.
      </P>
      <H3>How do I avoid getting banned?</H3>
      <P>
        Use the official API, message only opted-in contacts, send approved and relevant templates,
        start at low volume and scale gradually, honour opt-outs within 24 hours, and watch your
        quality rating daily. The tool matters less than your behaviour — clean lists and relevance
        keep you out of the ban zone.
      </P>

      <Callout variant="tip" title="Start with utility templates">
        If you&rsquo;re new to bulk WhatsApp, send order confirmations and shipping updates before
        marketing campaigns. Utility templates build your quality rating and warm up your audience —
        making your first marketing campaign far less likely to trigger complaints.{" "}
        <A href="/signup/">Start free with ₹60 credit</A>.
      </Callout>
    </>
  )
}
