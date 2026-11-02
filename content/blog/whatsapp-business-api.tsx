import {
  A,
  BlogFigure,
  FigureTable,
  H2,
  LI,
  Lead,
  OL,
  P,
  Strong,
  UL,
} from "@/components/blog/blog-prose"
import { BlogFaq } from "@/components/blog/blog-faq"

const FAQ_ITEMS = [
  {
    q: "Is the WhatsApp Business API free to use?",
    a: (
      <>
        No. Meta charges per delivered message, with rates that depend on the category and
        country. Messages from users to you are free, each business number gets 1,000 free
        service messages a month, and messages inside a free entry point window are free.
        Providers may add their own fees.
      </>
    ),
  },
  {
    q: "Can I use the WhatsApp Business API with my existing number?",
    a: (
      <>
        Often yes. SMSLocal&apos;s product page says you can keep an existing business
        number, with porting and migration handled for you. Ask your provider how the move
        affects the number&apos;s current WhatsApp setup before you start.
      </>
    ),
  },
  {
    q: "Do I need a developer to use the WhatsApp Business API?",
    a: (
      <>
        No. A provider dashboard lets non-technical teams send campaigns, build chatbot
        flows and use the inbox. Developers can use the API directly for custom
        integrations.
      </>
    ),
  },
  {
    q: "How long does approval take?",
    a: (
      <>
        There are two approvals. Meta business verification is the main one. SMSLocal&apos;s
        product page describes it as usually under 48 hours. Templates are reviewed
        separately, and Meta says review can take up to 24 hours.
      </>
    ),
  },
  {
    q: "Can I send bulk messages with the WhatsApp Business API?",
    a: (
      <>
        Yes, to opted-in contacts using approved templates. Sending to people who have not
        agreed to hear from you risks a lower quality rating and restrictions on your
        number.
      </>
    ),
  },
]

export default function WhatsappBusinessApiPost() {
  return (
    <>
      <Lead>
        The WhatsApp Business API is the official way for a company to send and receive
        WhatsApp messages through software, with automation, a shared team inbox and
        per-message delivery reports. If one phone on the free WhatsApp Business app can no
        longer keep up with your customers, this is the next step.
      </Lead>
      <P>
        This guide explains what the WhatsApp Business API is, how it works, how Meta
        charges for it, which rules apply and how to start without a developer.
      </P>

      <H2 id="what-the-whatsapp-business-api-is">What the WhatsApp Business API is</H2>
      <P>
        The WhatsApp Business API is the interface that lets software talk to WhatsApp on
        behalf of a business. Meta&apos;s main version is the Cloud API, part of the wider
        WhatsApp Business Platform. Your systems send messages through it and receive
        replies and status updates back through webhooks.
      </P>
      <P>
        The API has no app screen of its own. You use it in one of two ways: build directly
        on the Cloud API with your own developers, or use a Business Solution Provider (BSP)
        for a dashboard, team inbox and chatbot builder. Most small and mid-sized businesses
        choose a provider, because it avoids engineering work.
      </P>

      <BlogFigure
        src="/blog/whatsapp-business-api-what-it-is.webp"
        alt="Diagram of a business, a provider dashboard and the WhatsApp Business API"
        caption="The API connects your business systems to your customers' WhatsApp chats."
      />

      <H2 id="whatsapp-business-app-vs-api">WhatsApp Business App vs API</H2>
      <P>
        Many businesses start on the free WhatsApp Business app and move later.
      </P>
      <FigureTable
        columns={["Feature", "WhatsApp Business App", "WhatsApp Business API"]}
        rows={[
          [
            "Built for",
            "Small shops and solo owners",
            "Growing teams and automated workflows",
          ],
          [
            "Interface",
            "A phone app",
            "A provider dashboard or your own code",
          ],
          [
            "Team access",
            "One person answering from a phone",
            "Many agents through a shared inbox",
          ],
          [
            "Automation",
            "Simple greeting and away messages",
            "Chatbots, event triggers, webhooks",
          ],
          [
            "Campaigns",
            "Manual, small scale",
            "Template-based messages to segmented lists",
          ],
          [
            "Integrations",
            "Few",
            "CRMs, order systems, helpdesks",
          ],
        ]}
        caption="Most businesses start on the app and move to the API as chats grow."
      />
      <P>
        If you answer a handful of chats a day yourself, the app is enough. If several
        people answer customers, or you want order updates and reminders to go out
        automatically, you need the API.
      </P>
      <H2 id="how-it-works">How it works</H2>
      <P>
        Behind any dashboard, the flow is the same.
      </P>
      <OL>
        <LI>
          <Strong>Your business connects a number.</Strong>{" "}The number is registered to
          a WhatsApp Business Account inside your Meta business portfolio.
        </LI>
        <LI>
          <Strong>Your system sends a message.</Strong>{" "}It goes out as a JSON request
          over HTTP, authenticated with a bearer token.
        </LI>
        <LI>
          <Strong>WhatsApp delivers it</Strong>{" "}to the customer&apos;s phone.
        </LI>
        <LI>
          <Strong>Replies and delivery updates return through webhooks,</Strong>{" "}so your
          inbox or CRM knows when a message was delivered, read or answered.
        </LI>
      </OL>
      <H2 id="what-you-can-do-with-it">What you can do with it</H2>
      <P>
        The API supports more than plain text. Common uses include:
      </P>
      <UL>
        <LI>
          <Strong>Campaigns.</Strong>{" "}Send approved offers and notices to opted-in
          contacts, segmented by tag or list.
        </LI>
        <LI>
          <Strong>Order and booking updates.</Strong>{" "}Confirmations, shipping alerts and
          appointment reminders sent the moment something happens.
        </LI>
        <LI>
          <Strong>Customer support.</Strong>{" "}A shared inbox where chats can be assigned,
          tagged and annotated.
        </LI>
        <LI>
          <Strong>Chatbots.</Strong>{" "}Visual flows that answer common questions, collect
          details and hand over to a person.
        </LI>
        <LI>
          <Strong>Rich messages.</Strong>{" "}Images, PDFs, videos and location cards
          alongside text.
        </LI>
      </UL>
      <P>
        SMSLocal&apos;s
        {" "}<A href="/products/whatsapp-business-api/">WhatsApp Business API product</A>
        {" "}combines broadcasts, a drag-and-drop chatbot builder and a shared inbox, with
        optional AI agents that reply in eight Indian languages and pass complex chats to a
        human along with the conversation history.
      </P>

      <BlogFigure
        src="/blog/whatsapp-business-api-what-you-can-do.webp"
        alt="Four common uses of the WhatsApp Business API: automating conversations, sending timely updates, supporting customers and connecting business systems"
        caption="Four common uses of the WhatsApp Business API."
      />

      <H2 id="templates-the-24-hour-window-and-free-messages">Templates, the 24-hour window and free messages</H2>
      <P>
        Templates are where most first-time senders get stuck, so it is worth understanding
        them before you launch.
      </P>
      <P>
        <Strong>The customer service window.</Strong>{" "}When a user messages you, a
        24-hour window opens. While it is open, you can send ordinary non-template messages.
        Once it closes, templates are the only message type you can send.
      </P>
      <P>
        <Strong>Message templates.</Strong>{" "}A template is a pre-written message that
        Meta must approve before you can use it. Each one belongs to a category, and the
        category also decides what you are charged.
      </P>
      <FigureTable
        columns={["Category", "Use it for", "Rules to know"]}
        rows={[
          [
            "Marketing",
            "Offers, launches, announcements and awareness",
            "The most flexible category. Mixed content, such as an order update with a promotion, and unclear content are treated as marketing",
          ],
          [
            "Utility",
            "Messages triggered by a user's action or request, such as order updates, account alerts and feedback surveys tied to a specific order",
            "Must be non-promotional. Generic surveys do not qualify",
          ],
          [
            "Authentication",
            "One-time passcodes",
            "The only category that can send OTPs. It needs a copy-code or one-tap button and cannot include URLs, media or emojis",
          ],
        ]}
        caption="The category decides the rules for a template and what Meta charges for it."
      />
      <P>
        Meta checks the category when you submit. Since 9 April 2025, a utility template
        that should be marketing is approved as marketing by default. Repeated misuse of the
        utility category can bring warnings and temporary restrictions.
      </P>
      <P>
        <Strong>How review works.</Strong>{" "}Meta uses automated systems and manual
        review, and a decision can take up to 24 hours. You are told in WhatsApp Manager, by
        email and through a webhook. Any template with variables must include sample values.
      </P>
      <P>
        <Strong>Why templates get rejected.</Strong>{" "}Meta lists these common causes:
      </P>
      <UL>
        <LI>
          <Strong>Parameter formatting.</Strong>{" "}Mismatched curly braces, special
          characters such as #, $ or %, non-sequential numbering, or a template that starts
          or ends with a parameter.
        </LI>
        <LI>
          <Strong>Policy breaches.</Strong>{" "}Content that breaks Meta&apos;s policies,
          such as asking for full card, account or national ID numbers, or using threatening
          wording.
        </LI>
        <LI>
          <Strong>Duplicates.</Strong>{" "}The same body and footer as a template you
          already have. This check does not apply to authentication templates.
        </LI>
      </UL>
      <P>
        A rejected template can be edited and resubmitted, or appealed in WhatsApp Manager
        by adding a sample. Appeals are decided within 24 hours. If you plan campaigns, our
        {" "}<A href="/blog/whatsapp-marketing-india/">WhatsApp marketing guide for India</A>
        {" "}covers measurement and sending habits that protect your number.
      </P>
      <P>
        <Strong>Quality ratings.</Strong>{" "}Meta rates templates on customer feedback,
        read rates and engagement. Repeated negative feedback or low read rates can lead to
        a template being paused or disabled.
      </P>
      <P>
        <Strong>What is free.</Strong>{" "}Meta does not charge for messages users send to
        you. Each business number also gets 1,000 free service messages a month, which are
        the non-template replies you send inside an open window. They reset monthly and do
        not roll over, and Meta charges from the 1,001st. Messages in a free entry point
        window are free too, and a chat started from a Click to WhatsApp ad on the mobile
        app can keep it open for up to seven days if you reply in time.
      </P>
      <P>
        Until 1 October 2026, service messages and utility templates sent inside an open
        window were free. Meta now charges for both, apart from the free service allowance
        above.
      </P>
      <P>
        One difference from SMS is worth knowing. DLT is India&apos;s registry for SMS
        senders and templates. WhatsApp templates go through Meta&apos;s approval instead.
      </P>
      <H2 id="whatsapp-business-api-pricing-in-india">WhatsApp Business API pricing in India</H2>
      <P>
        Your cost has two layers.
      </P>

      <BlogFigure
        src="/blog/whatsapp-business-api-pricing-in-india.webp"
        alt="Total WhatsApp Business API cost as Meta messaging charges plus business platform charges from your provider"
        caption="Total cost is Meta's per-message charges plus your provider's fees."
      />

      <P>
        <Strong>Meta&apos;s charges.</Strong>{" "}Since 1 July 2025, Meta bills per
        delivered message, not per conversation, and by category: marketing, utility and
        authentication for templates, and service for replies inside an open window. The
        rate depends on the category and the recipient&apos;s country, and utility and
        authentication have volume tiers. Meta publishes an INR rate card and changes prices
        only on the first day of a quarter, so check the
        {" "}<A href="https://developers.facebook.com/documentation/business-messaging/whatsapp/pricing">Meta pricing page</A>
        {" "}before you budget. Older guides that bill by the conversation, or call replies
        in an open window free, are out of date.
      </P>
      <P>
        Two other points matter in India. Meta also offers its own AI agent platform, billed
        per token. And Meta says eligible customers billed in another currency must move all
        messaging accounts to INR by 31 December 2026, after which it stops delivering
        messages from non-INR accounts. Ask your provider whether this applies to you.
      </P>
      <P>
        <Strong>Your provider&apos;s charges.</Strong>{" "}Providers differ. Some add a
        monthly subscription, setup fee or per-seat charge on top of Meta&apos;s rates.
        SMSLocal&apos;s WhatsApp Business API product page states that there is no setup
        fee, no monthly plan and no per-seat licence fee. It asks for a minimum top-up of
        ₹100.
      </P>
      <P>
        Here is how four providers structure their charges for India, based on each
        provider&apos;s own pricing page as checked on 2 November 2026. Meta&apos;s
        per-message fees apply on top of every row.
      </P>
      <FigureTable
        columns={["Provider", "Monthly subscription", "Setup fee", "Seats", "Worth noting"]}
        rows={[
          [
            "SMSLocal",
            "None. You pay for the messages you send",
            "None",
            "No per-seat licence fees",
            "Minimum top-up ₹100",
          ],
          [
            "Interakt",
            "Growth ₹2,799, Advanced ₹3,799 (plus taxes). The ₹999 Starter plan is Instagram only",
            "None listed",
            "No agent limit on Growth and Advanced",
            "The Enterprise plan is listed as \"no markup charges\"",
          ],
          [
            "AiSensy",
            "Plan prices are not shown on the pricing page",
            "No fee to get API access",
            "No cap on users, with fair-use limits (for example, up to 200 agents)",
            "Chatbot builder add-on ₹2,500 a month, AI agent add-on ₹1,350 a month, listed India marketing rate ₹1.09 per message, effective 1 October 2026",
          ],
          [
            "Wati",
            "Growth ₹2,699, Pro ₹5,799, Business ₹16,799 a month, billed quarterly",
            "None for API access. Optional paid onboarding",
            "3 users on Growth with no extra users offered. 5 on Pro and Business, then ₹1,299 (Pro) or ₹2,199 (Business) a month per extra user",
            "Template message charges are extra. The page also lists a $4.99 Shopify add-on",
          ],
        ]}
        caption="How four providers structure their charges for India, as of 2 November 2026."
      />
      <P>
        Provider prices change, so confirm figures on each provider&apos;s site. Ask what is
        included: inbox seats, chatbot flows, template help and reports.
      </P>
      <H2 id="rules-you-have-to-follow">Rules you have to follow</H2>
      <P>
        Meta&apos;s rules apply from the first message.
      </P>
      <UL>
        <LI>
          <Strong>You need a Meta business portfolio.</Strong>{" "}It holds your WhatsApp
          Business Accounts.
        </LI>
        <LI>
          <Strong>You need opt-in.</Strong>{" "}Meta requires businesses to get a
          user&apos;s permission before sending message templates.
        </LI>
        <LI>
          <Strong>Use approved tools only.</Strong>{" "}Meta&apos;s platform documentation
          says that using unauthorized third-party tools is prohibited. Extensions and
          unofficial senders that automate WhatsApp Web fall into this group and put your
          number at risk.
        </LI>
        <LI>
          <Strong>Protect your quality rating.</Strong>{" "}Send relevant messages to people
          who asked for them, and keep your templates clear.
        </LI>
      </UL>
      <P>
        Numbers get restricted when customers block and report messages they did not want.
      </P>
      <H2 id="how-to-get-started">How to get started</H2>
      <P>
        Here is the usual path with a provider.
      </P>
      <OL>
        <LI>
          <Strong>Pick a provider and sign up.</Strong>{" "}Confirm they are an official
          partner.
        </LI>
        <LI>
          <Strong>Connect your Meta Business Manager account.</Strong>{" "}Meta business
          verification is required. SMSLocal&apos;s product page describes it as usually
          taking under 48 hours, but verification can take longer if Meta asks for more
          details.
        </LI>
        <LI>
          <Strong>Choose your number.</Strong>{" "}Use a number you control and keep
          long-term. You can port an existing business number with SMSLocal, which handles
          the migration.
        </LI>
        <LI>
          <Strong>Create and submit templates early.</Strong>{" "}Review can take up to 24
          hours per template, so submit them before your launch date.
        </LI>
        <LI>
          <Strong>Add credit and send.</Strong>{" "}Launch a campaign, a chatbot flow or an
          AI agent.
        </LI>
        <LI>
          <Strong>Read your reports.</Strong>{" "}Check delivery, read status and failures,
          and improve weak templates.
        </LI>
      </OL>
      <H2 id="how-to-choose-a-provider">How to choose a provider</H2>
      <P>
        Providers look alike on a pricing page. These checks separate them.
      </P>

      <BlogFigure
        src="/blog/whatsapp-business-api-how-to-choose-a-provider.webp"
        alt="Four checks when choosing a provider: pricing transparency, integration options, automation and scalability, and support and reliability"
        caption="Four checks that separate one provider from another."
      />

      <UL>
        <LI>
          <Strong>Official status.</Strong>{" "}Confirm they work through Meta&apos;s
          official platform, not an unofficial tool.
        </LI>
        <LI>
          <Strong>Total cost.</Strong>{" "}Ask about setup fees, monthly plans, seat charges
          and how Meta&apos;s per-message rates are passed on.
        </LI>
        <LI>
          <Strong>Template help.</Strong>{" "}Good support gets templates approved faster.
        </LI>
        <LI>
          <Strong>Inbox and bot quality.</Strong>{" "}Test assignment, tags, notes and
          handover before you commit.
        </LI>
        <LI>
          <Strong>Languages.</Strong>{" "}If your customers write in Hindi, Tamil or
          Bengali, check the bots and templates support them.
        </LI>
        <LI>
          <Strong>Developer access.</Strong>{" "}Look for a documented send endpoint,
          webhooks and SDKs in case you integrate later.
        </LI>
        <LI>
          <Strong>Support.</Strong>{" "}Check that real people are reachable in Indian
          working hours.
        </LI>
      </UL>
      <P>
        If you also send SMS, a provider that covers both channels saves you from running
        two dashboards.
      </P>
      <H2 id="mistakes-that-cost-you-reach">Mistakes that cost you reach</H2>
      <UL>
        <LI>
          <Strong>Messaging people who never opted in.</Strong>{" "}It drives blocks, lowers
          your quality rating and can get templates paused.
        </LI>
        <LI>
          <Strong>Mixing a promotion into an order update.</Strong>{" "}Meta treats mixed
          content as marketing, so it is reviewed and charged as marketing, and repeated
          misuse of utility can bring restrictions.
        </LI>
        <LI>
          <Strong>Starting or ending a template with a variable, or leaving out sample values.</Strong>
          {" "}Meta lists both among the causes of rejection.
        </LI>
        <LI>
          <Strong>Launching without a reply plan.</Strong>{" "}A campaign creates replies,
          so decide who answers and when a bot hands over.
        </LI>
        <LI>
          <Strong>Working from outdated pricing.</Strong>{" "}Meta changed its billing in
          July 2025 and again on 1 October 2026, so use a current rate card.
        </LI>
      </UL>
      <H2 id="conclusion">Conclusion</H2>
      <P>
        The WhatsApp Business API is how a business moves from answering chats by hand to
        running WhatsApp as a proper channel, with approved templates, a shared inbox and
        automation. The technology is the easy part. Opt-in, template quality and the right
        provider decide whether it works.
      </P>
      <P>
        Start small. Connect your number, get a few templates approved and message people
        who have agreed to hear from you. Then add chatbots and campaigns as your volume
        grows.
      </P>

      <H2 id="faq">Frequently asked questions</H2>
      <BlogFaq items={FAQ_ITEMS} />
    </>
  )
}
