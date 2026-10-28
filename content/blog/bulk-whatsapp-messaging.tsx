import {
  A,
  BlogFigure,
  Callout,
  FigureTable,
  H2,
  LI,
  Lead,
  OL,
  P,
  Strong,
  UL,
} from "@/components/blog/blog-prose"
import { BlogFaq, BlogFaqItem } from "@/components/blog/blog-faq"
import { BlogInlineCta } from "@/components/blog/blog-cta"

export default function BulkWhatsappMessagingPost() {
  return (
    <>
      <Lead>
        Bulk WhatsApp messaging lets businesses send thousands of messages to opted-in customers
        at once — order updates, offers, reminders, and campaigns — all on the official{" "}
        <A href="/products/whatsapp-business-api/">WhatsApp Business API</A>. This guide explains
        how it actually works in 2026, what it costs, and how to do it without getting your number
        banned.
      </Lead>

      <BlogFigure
        src="/blog/bulk-whatsapp-broadcast-metrics.webp"
        alt="Smartphone screen showing a WhatsApp broadcast campaign dashboard with sent, delivered, and read metrics."
        caption="A bulk WhatsApp broadcast and its delivery metrics."
      />

      <Callout variant="info" title="Official API only">
        This guide covers the official WhatsApp Business API route. Unofficial tools that automate
        WhatsApp Web are against Meta&apos;s Terms of Service and will get your number permanently
        banned. There is no safe shortcut.
      </Callout>

      <H2 id="what-bulk-whatsapp-messaging-is">What bulk WhatsApp messaging actually is</H2>
      <P>
        Bulk WhatsApp messaging is the ability to send a single message — an order confirmation, a
        promotional offer, an event reminder — to a large list of contacts simultaneously, through
        the WhatsApp Business Platform. Each recipient gets an individual message in their personal
        WhatsApp inbox, not a group chat.
      </P>
      <P>
        The key word is official. Meta (WhatsApp&apos;s parent company) controls exactly who can
        send bulk messages and on what terms. You access this through a Meta-approved Business
        Solution Provider (BSP) — a company like SMSLocal that has a direct{" "}
        <A href="/developers/api-docs/">API connection</A> to
        WhatsApp&apos;s infrastructure.
      </P>

      <H2 id="api-vs-app-vs-unofficial-tools">API vs. Business App vs. unofficial tools</H2>
      <P>
        There are only three ways to send to many contacts at once, and they are not equally safe.
        Here&apos;s how they compare:
      </P>
      <FigureTable
        columns={["", "WhatsApp Business API", "Business App (broadcast lists)", "Unofficial tools / extensions"]}
        rows={[
          [
            <Strong key="best-for">Best for</Strong>,
            "Serious bulk + automation",
            "Tiny lists, sent manually",
            "“Quick hacks” — don't",
          ],
          [
            <Strong key="scale">Scale</Strong>,
            "250 → unlimited/day (tiered)",
            "256 saved contacts per list",
            "Varies (until you're banned)",
          ],
          [
            <Strong key="automation">Automation</Strong>,
            "Yes — templates, scheduling, API",
            "None",
            "Yes, but against the rules",
          ],
          [
            <Strong key="ban-risk">Ban risk</Strong>,
            "Low when compliant",
            "Medium (manual, easy to trip spam)",
            "Very high — often within minutes",
          ],
          [
            <Strong key="compliance">Compliance</Strong>,
            "Meta-approved",
            "Allowed but limited",
            "Violates Meta's Terms of Service",
          ],
          [
            <Strong key="verdict">Verdict</Strong>,
            "The only way to scale safely",
            "Fine for <256, by hand",
            "Never use",
          ],
        ]}
      />

      <H2 id="how-it-works">How it works — from contact list to delivered message</H2>
      <P>Every bulk sender goes through the same four steps, regardless of volume:</P>

      <BlogFigure
        src="/blog/bulk-whatsapp-four-steps.webp"
        alt="Four-step flow diagram showing WABA setup, template approval, contact upload, and campaign launch."
        caption="The four steps of sending bulk WhatsApp messages."
      />

      <OL>
        <LI>
          <Strong>Build a verified sender account.</Strong> Your business applies for a WhatsApp
          Business Account (WABA) through a BSP. Meta verifies your business, approves a display
          name, and assigns a messaging tier that controls how many unique users you can message
          per day.
        </LI>
        <LI>
          <Strong>Create and submit message templates.</Strong> Every outbound bulk message must
          use a pre-approved template. You write it, submit it for Meta review (usually 24–48
          hours), and once approved you can use it in campaigns. Templates support variables for
          personalisation — name, order ID, date.
        </LI>
        <LI>
          <Strong>Upload your opted-in contact list.</Strong> The most legally sensitive step.
          WhatsApp requires every recipient to have explicitly consented to receive messages from
          your business. Sending to contacts who haven&apos;t opted in is a Terms violation and the
          fastest way to get banned.
        </LI>
        <LI>
          <Strong>Launch the campaign and handle replies.</Strong> Messages go out through the API,
          and replies arrive back in your <A href="/products/omnichannel-inbox/">inbox</A> — which is where a well-configured platform like
          SMSLocal lets agentic AI handle them automatically, so a broadcast doesn&apos;t create a
          support backlog.
        </LI>
      </OL>

      <H2 id="what-kinds-of-messages">What kinds of messages you can send</H2>
      <P>
        WhatsApp templates fall into three categories, each with different rules about when you
        can send them:
      </P>
      <FigureTable
        columns={["Category", "When you can use it", "Examples"]}
        rows={[
          [
            <Strong key="utility">Utility</Strong>,
            "After the customer has transacted or signed up",
            "Order confirmation, shipping update, payment receipt, appointment reminder",
          ],
          [
            <Strong key="auth">Authentication</Strong>,
            "Any time, for identity verification",
            "OTP, login code, 2FA confirmation",
          ],
          [
            <Strong key="marketing">Marketing</Strong>,
            "To opted-in contacts, within messaging limits",
            "Promotional offers, product launches, seasonal campaigns, back-in-stock alerts",
          ],
        ]}
      />
      <P>
        Marketing templates require explicit opt-in. Utility and authentication templates are
        easier to send because the customer already initiated a transaction.
      </P>
      <Callout variant="tip" title="Rich templates perform better">
        Plain text gets opened, but templates with an image, a document, or CTA buttons see far
        higher engagement. WhatsApp supports header media (image, video, document), body text with
        variables, a footer, and up to three buttons per template.
      </Callout>

      <BlogInlineCta
        title="Ready to broadcast on the official API?"
        body="SMSLocal is an official WhatsApp Business API provider with template management, campaign scheduling, and opt-out handling built in — so Indian businesses can send bulk messages within Meta's rules."
        primary={{ label: "Start your trial", href: "/signup/" }}
      />

      <H2 id="messaging-limits-and-tiers">Messaging limits and tiers in 2026</H2>
      <P>
        <A href="https://en.wikipedia.org/wiki/WhatsApp">WhatsApp</A> controls how many people you
        can message outside a customer service window through a messaging limit: the number of
        unique users you can reach within a moving 24-hour period. Meta has changed these rules
        more than once, so older guides are out of date. The current picture, from
        Meta&apos;s documentation:
      </P>
      <UL>
        <LI>
          <Strong>250:</Strong> the starting limit for a new business portfolio.
        </LI>
        <LI>
          <Strong>2,000:</Strong> unlocked by verifying your business (or having your partner
          verify it), or by delivering 2,000 messages to unique users within 30 days using
          high-quality templates.
        </LI>
        <LI>
          <Strong>10,000, then 100,000, then unlimited:</Strong> unlocked automatically. If you
          send high-quality messages and use at least half of your current limit within 7 days,
          the limit rises one level within 6 hours.
        </LI>
      </UL>
      <P>
        Limits are set at the business portfolio level and shared by every number in it, so one
        number can use up the whole allowance. Separately, Meta may limit how many marketing
        templates a single person receives from all businesses in a period, so a user sees only
        a small number of marketing messages. That is another reason relevance beats volume.
      </P>
      <P>
        Your quality rating is calculated from how many recipients block or report your
        messages. If it drops, Meta can limit your sending, which is why list quality and opt-in
        hygiene matter more than any platform feature.
      </P>

      <BlogFigure
        src="/blog/bulk-whatsapp-messaging-limits.webp"
        alt="Chart of WhatsApp messaging limits: 250, 2,000, 10,000, 100,000 and unlimited unique users per 24 hours."
        caption="WhatsApp messaging limits, per business portfolio, per moving 24 hours."
      />

      <Callout variant="warning" title="Note for AI flows">
        Meta&apos;s terms for the WhatsApp Business Platform (section 4.7) bar providers of AI
        technology from using the platform when AI is the primary rather than incidental
        functionality, and they restrict using platform data to train AI models. The terms do not
        directly address a business using AI to answer its own customers, so read them for your
        case.
      </Callout>

      <H2 id="the-opt-in-requirement">The opt-in requirement — and why it matters</H2>
      <P>
        This is the part most guides gloss over. WhatsApp&apos;s policy requires explicit,
        affirmative consent from every contact before you send a marketing message.
        &quot;Explicit&quot; means they actively checked a box or submitted a form — not a
        pre-ticked checkbox buried in your terms. In India, this also sits under the Digital
        Personal Data Protection (DPDP) Act, which makes clear consent a legal requirement, not
        just a platform one.
      </P>
      <P>Practically, your opt-in must:</P>
      <UL>
        <LI>Clearly name WhatsApp as the channel the customer is opting into</LI>
        <LI>Name your business specifically</LI>
        <LI>Describe the types of messages they&apos;ll receive</LI>
        <LI>
          Include a way to opt out later (Meta requires you to honour &quot;stop&quot; messages
          within 24 hours)
        </LI>
      </UL>
      <P>
        Businesses that skip this and buy contact lists hit the same wall every time: high block
        rates, a falling quality rating, and eventually a number ban that&apos;s nearly impossible
        to appeal.
      </P>

      <H2 id="what-it-costs">What bulk WhatsApp messaging costs</H2>
      <P>
        Pricing has two layers. First, Meta charges per delivered message, and the rate varies by
        country and message category. Since 1 July 2025 Meta bills per message, not per 24-hour
        conversation. In India, a marketing message costs ₹0.8631 and a utility, authentication
        or service message costs ₹0.115 (Meta&apos;s INR rate card, effective 1 October 2026;
        utility and authentication also have volume tiers).
      </P>
      <P>
        Second, some BSPs add a platform fee on top of the Meta cost, per message or as a monthly
        subscription depending on volume. Ask any provider for the all-in cost per delivered
        message and compare it with Meta&apos;s list rate.
      </P>
      <Callout variant="info" title="Free messages">
        Replies inside an open customer service window are service messages, and Meta gives each
        business number 1,000 free service messages a month. Messages sent inside a free
        entry-point window, which opens when someone starts a chat from a Click-to-WhatsApp ad,
        are also free for up to 7 days. A genuine two-way WhatsApp presence lowers your total
        cost.
      </Callout>

      <H2 id="what-to-look-for-in-a-platform">What to look for in a bulk WhatsApp platform</H2>
      <P>
        Not all BSPs are equal. When evaluating platforms for bulk messaging, check for:
      </P>
      <UL>
        <LI>
          <Strong>Official BSP status</Strong> — a confirmed Meta partnership, not a reseller of a
          reseller
        </LI>
        <LI>
          <Strong>Template management UI</Strong> — create, submit, and track approvals without
          manual API calls
        </LI>
        <LI>
          <Strong>Campaign scheduling</Strong> — queue and stagger delivery to avoid sudden
          quality-rating spikes
        </LI>
        <LI>
          <Strong>Delivery analytics</Strong> — sent, delivered, read, and replied rates per
          campaign
        </LI>
        <LI>
          <Strong>Reply handling</Strong> — an inbox for manual replies, or AI automation for
          high-volume campaigns
        </LI>
        <LI>
          <Strong>Opt-out management</Strong> — automatic suppression of STOP contacts from future
          sends
        </LI>
      </UL>

      <H2 id="what-happens-when-customers-reply">What happens when customers reply</H2>
      <P>
        This is where most bulk platforms fall down. Your broadcast goes to 10,000 people; even a
        5% reply rate is 500 conversations your team now has to handle. Without a plan, that
        backlog creates a worse experience than not sending at all.
      </P>
      <P>
        The right architecture treats broadcasting and conversations as the same product. When a
        customer replies, agentic AI picks up the thread, answers from your product knowledge base,
        and escalates to a human only when the conversation genuinely needs one. SMSLocal connects
        broadcasting and the inbox so every reply is handled automatically, at any volume. Good{" "}
        <A href="/blog/whatsapp-marketing-india/">WhatsApp marketing</A> and good support are the
        same discipline — and getting it wrong is also how businesses fail to{" "}
        <A href="/blog/whatsapp-scams-india/">protect your customers</A> from impersonation and
        confusion during high-volume campaigns.
      </P>

      <H2 id="faq">Frequently asked questions</H2>

      <BlogFaq>
        <BlogFaqItem q={"Can I send bulk WhatsApp messages without a business account?"}>
          No. Personal WhatsApp accounts can only message contacts you&apos;ve saved. For bulk
          outbound sends you need a WhatsApp Business Account through the official API. Unofficial
          tools that automate WhatsApp Web will get your number banned, often permanently.
        </BlogFaqItem>
        <BlogFaqItem q={"How many messages can I send per day?"}>
          It depends on your messaging tier and quality rating. Unverified accounts start around 250
          unique recipients per day at Tier 0, then scale to 1,000, 10,000, 100,000, and unlimited as
          you verify and maintain a high quality rating. Block and report rates control whether you
          move up or get downgraded.
        </BlogFaqItem>
        <BlogFaqItem q={"Is bulk WhatsApp messaging legal in India?"}>
          Yes — if you use the official API and have proper opt-in consent. Unlike SMS (governed by
          TRAI&apos;s DLT framework), WhatsApp is governed by Meta&apos;s own Terms and Commerce
          Policy, and consent is also required under India&apos;s DPDP Act. You don&apos;t need DLT
          registration for WhatsApp, but you do need explicit consent and must respect opt-outs.
        </BlogFaqItem>
        <BlogFaqItem q={"What's the difference between bulk SMS and bulk WhatsApp?"}>
          Bulk SMS has wider reach (any phone, no app required) but is text-only with a 160-character
          limit. Bulk WhatsApp supports rich media, buttons, and interactive flows but requires the
          recipient to have WhatsApp and to have opted in. For most Indian businesses the two work
          together — WhatsApp for engaged customers, SMS for transactional alerts to everyone.
        </BlogFaqItem>
        <BlogFaqItem q={"How do I avoid getting banned?"}>
          Use the official API, message only opted-in contacts, send approved and relevant templates,
          start at low volume and scale gradually, honour opt-outs within 24 hours, and watch your
          quality rating daily. The tool matters less than your behaviour — clean lists and relevance
          keep you out of the ban zone.
        </BlogFaqItem>
      </BlogFaq>

      <Callout variant="tip" title="Start with utility templates">
        If you&apos;re new to bulk WhatsApp, send order confirmations and shipping updates before
        marketing campaigns. Utility templates build your quality rating and warm up your audience
        — making your first marketing campaign far less likely to trigger complaints.
      </Callout>

      <Callout variant="success" title="Scale bulk WhatsApp safely with SMSLocal">
        Official BSP, template management, campaign scheduling, and AI that handles every reply —
        so you can broadcast at scale without risking your number.{" "}
        <A href="/company/contact/">Book a demo</A> to get started.
      </Callout>
    </>
  )
}
