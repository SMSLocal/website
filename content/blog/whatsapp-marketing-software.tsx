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
    q: "What is WhatsApp marketing software?",
    a: (
      <>
        WhatsApp marketing software, sometimes called WhatsApp campaign software, is a tool
        to plan, send and track WhatsApp campaigns. It manages your contacts, templates,
        campaigns and replies. You can also view reports for all messages.
      </>
    ),
  },
  {
    q: "Is WhatsApp marketing software safe to use?",
    a: (
      <>
        Yes, as long as it uses the official WhatsApp Business Platform and you&apos;re only
        sending to opted-in users. Unofficial senders that automate messages from a normal
        number put your number at risk of being restricted.
      </>
    ),
  },
  {
    q: "How much does WhatsApp marketing software cost in India?",
    a: (
      <>
        The list rate for a marketing message in India is ₹0.8631 per delivered message as
        of 1st October 2026. Your provider may charge a platform fee. Ask how much they
        charge per message (all in).
      </>
    ),
  },
  {
    q: "Can I send WhatsApp marketing messages to anyone?",
    a: (
      <>
        No. You must have opt-in from each user and only use approved templates. Meta may
        also restrict how many marketing messages each user receives, and messages that hit
        this limit fail with error 131049.
      </>
    ),
  },
  {
    q: "What features should WhatsApp marketing software have?",
    a: (
      <>
        Look for templates, segments, scheduling, personalisation, a shared inbox, analytics
        (with reasons for failures) and automatic opt-outs. If you use a CRM or store, look
        for integrations.
      </>
    ),
  },
]

export default function WhatsappMarketingSoftwarePost() {
  return (
    <>
      <Lead>
        WhatsApp marketing software allows businesses to plan, send and track WhatsApp
        marketing campaigns. If you do not use the correct software, you could incur hidden
        costs. For example: messages blocked by Meta&apos;s limits, templates held in review
        and a number restricted because customers reported it.
      </Lead>
      <P>
        We&apos;ll break down what the software does and the main types of tool. We&apos;ve
        also included the key features to look for, the policies to follow, pricing in India
        and how to test one before you buy.
      </P>

      <H2 id="what-whatsapp-marketing-software-does">What WhatsApp marketing software does</H2>
      <P>
        On the official WhatsApp Business Platform, businesses can only start conversations
        using pre-approved template messages, and only with users who have opted in.
        Marketing software puts these rules into a tool your marketing team can actually
        use.
      </P>
      <P>
        Essentially, it&apos;ll allow you to:
      </P>
      <UL>
        <LI>
          <Strong>Create contacts and segments.</Strong>{" "}Store your opted-in contacts
          and sort them into segments (tags, lists or behaviours).
        </LI>
        <LI>
          <Strong>Create templates.</Strong>{" "}Create, submit and track your templates
          with Meta.
        </LI>
        <LI>
          <Strong>Schedule and send campaigns.</Strong>{" "}Schedule and send a template to
          a specific segment.
        </LI>
        <LI>
          <Strong>Track replies.</Strong>{" "}Automatically route replies to a shared inbox
          or chatbot.
        </LI>
        <LI>
          <Strong>View reports.</Strong>{" "}See what happened with each message.
        </LI>
      </UL>
      <P>
        Most will include personalisation, automation and analytics. Some WhatsApp marketing
        platforms will include everything in one place. For example, SMSLocal&apos;s
        {" "}<A href="/channels/whatsapp-broadcasting/">WhatsApp broadcasting</A>{" "}is
        WhatsApp broadcast software that allows businesses to send out segmented template
        campaigns to opted-in audiences. You can also view delivery and read rates for each
        campaign and route replies to your team or AI agent.
      </P>

      <BlogFigure
        src="/blog/whatsapp-marketing-software-what-it-does.webp"
        alt="Four things WhatsApp marketing software does around a phone: campaigns, personalisation, automation and analytics"
        caption="Most tools add personalisation, automation and analytics around the core jobs."
      />

      <H2 id="types-of-whatsapp-marketing-tools">Types of WhatsApp marketing tools</H2>
      <P>
        There are 4 categories of tools. Ignore the product name and look at how they
        interact with WhatsApp.
      </P>
      <FigureTable
        columns={["Type", "What it is", "Often suits", "Watch out for"]}
        rows={[
          [
            "Official API platform",
            "A dashboard built on the WhatsApp Business Platform through a Solution Provider",
            "Businesses sending campaigns at scale",
            "Template help, reporting depth and total cost",
          ],
          [
            "CRM or store add-on",
            "A WhatsApp feature inside a CRM or ecommerce tool",
            "Teams that work mainly in one CRM or store platform",
            "Fewer campaign features and less control over templates",
          ],
          [
            "Chat-first inbox tool",
            "A shared inbox with basic broadcasts",
            "Support-led teams with light marketing",
            "Thin segmentation and analytics",
          ],
          [
            "Unofficial sender",
            "A browser extension or app that automates WhatsApp Web or an ordinary number",
            "Nobody who wants to keep a number",
            "Bans, no template approval and no official reporting",
          ],
        ]}
        caption="Judge a tool by how it connects to WhatsApp, not by what it calls itself."
      />
      <P>
        Avoid the last group. According to WhatsApp&apos;s business messaging policy, if
        you&apos;re sending mass messages in an unauthorised way, your access could be
        restricted or removed. If your number gets restricted, you lose your main line of
        communication with customers.
      </P>
      <H2 id="features-that-matter">Features that matter</H2>
      <P>
        All the features will look similar. Look for the following:
      </P>
      <UL>
        <LI>
          <Strong>Templates.</Strong>{" "}Create, submit, amend and resubmit templates. View
          Meta&apos;s decision without contacting support.
        </LI>
        <LI>
          <Strong>Segments.</Strong>{" "}Target specific segments (tag, list or behaviour).
        </LI>
        <LI>
          <Strong>Scheduling.</Strong>{" "}Schedule your campaigns and send in batches.
        </LI>
        <LI>
          <Strong>Personalisation.</Strong>{" "}Add personalisation such as names or order
          information. Add images, buttons and links.
        </LI>
        <LI>
          <Strong>Automation.</Strong>{" "}WhatsApp marketing automation sends messages
          based on events (order or payment) and automates replies.
        </LI>
        <LI>
          <Strong>Shared inbox.</Strong>{" "}Route replies to a person or bot. Include the
          conversation history.
        </LI>
        <LI>
          <Strong>Analytics.</Strong>{" "}See how many messages were sent, delivered, read
          and replied to. Include reasons why messages failed.
        </LI>
        <LI>
          <Strong>Opt-in and opt-out.</Strong>{" "}Track how and when each person opted in.
          Stop sending to anyone who opts out.
        </LI>
        <LI>
          <Strong>Integrations.</Strong>{" "}Integrate with your CRM, store or helpdesk,
          either through a ready-made integration or via API and webhooks.
        </LI>
      </UL>
      <P>
        For some campaign ideas and template writing tips, view our
        {" "}<A href="/blog/whatsapp-marketing-india/">guide to WhatsApp marketing in India</A>.
      </P>

      <BlogFigure
        src="/blog/whatsapp-marketing-software-features-that-matter.webp"
        alt="Features that matter in WhatsApp marketing software: templates, segments, a shared inbox and analytics"
        caption="Judge each tool by what it does in practice, not by the length of its feature list."
      />

      <H2 id="rules-your-software-has-to-handle">Rules your software has to handle</H2>
      <P>
        A good piece of software will ensure you follow Meta&apos;s policies. The 5 main
        policies to follow are:
      </P>
      <UL>
        <LI>
          <Strong>Opt-in.</Strong>{" "}According to WhatsApp&apos;s policy, you can only
          contact people who have given you their number and opted in to receive messages
          from you. It&apos;s up to you how you do this, but you&apos;re solely responsible.
          Ensure you have evidence.
        </LI>
        <LI>
          <Strong>Opt-out.</Strong>{" "}You must honour any requests to block, stop or opt
          out.
        </LI>
        <LI>
          <Strong>Templates.</Strong>{" "}You can only send messages using approved
          templates. Once the 24-hour window has passed, you can only send using a template.
        </LI>
        <LI>
          <Strong>Marketing limits.</Strong>{" "}Meta may restrict how many marketing
          templates one person can receive from any business. This will depend on their
          recent read rate and how many messages they&apos;re already receiving. There is no
          set amount published by Meta. If you hit this limit you&apos;ll receive an error
          (131049). Meta suggests waiting at least 24 hours before attempting to send again.
        </LI>
        <LI>
          <Strong>Quality.</Strong>{" "}Users can block or report your business. This could
          mean your sending is restricted by Meta.
        </LI>
      </UL>
      <P>
        A useful tip: marketing messages sent during a customer service window, which opens
        when a person replies, will not count towards your limits. If your software shows
        why a message failed and doesn&apos;t try to send it again, it helps protect your
        number.
      </P>
      <H2 id="what-whatsapp-marketing-software-costs-in-india">What WhatsApp marketing software costs in India</H2>
      <P>
        Your cost has two layers.
      </P>

      <BlogFigure
        src="/blog/whatsapp-marketing-software-costs-in-india.webp"
        alt="What WhatsApp marketing software costs in India: monthly plans, per-message pricing and usage-based costs"
        caption="Costs come from Meta's per-message charges plus whatever your provider adds."
      />

      <P>
        <Strong>Meta&apos;s charges.</Strong>{" "}Meta will charge you per message
        delivered. Depending on the type of message you&apos;re sending, the price varies.
        As of 1st October 2026, Meta&apos;s INR rate card lists these rates for India:
      </P>
      <UL>
        <LI>
          <Strong>Marketing:</Strong>{" "}₹0.8631 per message.
        </LI>
        <LI>
          <Strong>Utility and authentication:</Strong>{" "}₹0.115 per message each (varies
          depending on volume).
        </LI>
        <LI>
          <Strong>Service:</Strong>{" "}₹0.115 per message, after the first 1,000 free
          service messages each month for a business number.
        </LI>
      </UL>
      <P>
        If you&apos;re sending 1,000 messages at the marketing rate, you&apos;ll pay ₹863.10
        in Meta&apos;s fees (excluding any platform fees). If you&apos;re sending within a
        free entry point window you won&apos;t be charged. This window is available if the
        user starts a chat via a Click to WhatsApp ad on the mobile app and you respond in
        time. It can last up to 7 days.
      </P>
      <P>
        Meta can change prices on the first day of each quarter, so check
        {" "}<A href="https://developers.facebook.com/documentation/business-messaging/whatsapp/pricing">Meta&apos;s pricing page</A>
        {" "}before you budget.
      </P>
      <P>
        <Strong>Your provider&apos;s charges.</Strong>{" "}Some providers will charge a
        monthly fee, a setup fee or a per-seat fee. Some won&apos;t. SMSLocal&apos;s
        WhatsApp Business API page says there are no setup fees, monthly plans or per-seat
        licence fees, and the minimum top-up is ₹100. Ask any provider how much they charge
        per message (all in) and compare this to Meta&apos;s list rate.
      </P>
      <H2 id="how-to-test-a-tool-before-you-buy">How to test a tool before you buy</H2>
      <P>
        Try a quick trial. Try 2-3 tools.
      </P>
      <OL>
        <LI>
          <Strong>Create a trial account.</Strong>{" "}If available, use a free trial.
        </LI>
        <LI>
          <Strong>Submit 1 template.</Strong>{" "}How long does it take to be approved, and
          is the feedback clear if it&apos;s rejected?
        </LI>
        <LI>
          <Strong>Send to a small opted-in group.</Strong>{" "}Send to a small group of
          colleagues or customers who have agreed to receive messages.
        </LI>
        <LI>
          <Strong>Compare reports.</Strong>{" "}Ensure what the report shows matches what is
          happening on the phones. Are messages being delivered and read?
        </LI>
        <LI>
          <Strong>Test opt-out.</Strong>{" "}Ask your test contact to opt out and ensure
          they aren&apos;t sent any messages.
        </LI>
        <LI>
          <Strong>Check failures.</Strong>{" "}Add a number that isn&apos;t on WhatsApp and
          ensure the report shows why it failed.
        </LI>
        <LI>
          <Strong>Check pricing.</Strong>{" "}Ensure you&apos;re being charged correctly
          according to Meta&apos;s rate card.
        </LI>
      </OL>
      <P>
        To choose the right WhatsApp marketing software, pick the tool that gets your
        templates approved, shows honest reports and leaves no surprises on the invoice.
      </P>
      <H2 id="what-smslocal-offers">What SMSLocal offers</H2>
      <P>
        SMSLocal describes itself as an official WhatsApp Business Solution Provider. On its
        pages it mentions:
      </P>
      <UL>
        <LI>
          <Strong>Broadcast.</Strong>{" "}Send segmented template campaigns with media,
          buttons, list or CTA replies and merge-field personalisation. Use WhatsApp Flows
          to collect data in chat.
        </LI>
        <LI>
          <Strong>Templates.</Strong>{" "}Create and submit templates through the SMSLocal
          dashboard.
        </LI>
        <LI>
          <Strong>Reports.</Strong>{" "}View how many messages were sent, delivered and
          read. View delivery reports per message, including why they failed. See replies
          linked to the broadcast.
        </LI>
        <LI>
          <Strong>Replies.</Strong>{" "}A shared inbox with assignment, tags and notes. AI
          agents are an optional add-on which reply to messages and pass the chat to a
          person.
        </LI>
        <LI>
          <Strong>Protection.</Strong>{" "}Quality rating, message limit monitoring and
          automatic opt-outs.
        </LI>
        <LI>
          <Strong>Pricing.</Strong>{" "}No setup fee, monthly plan or per-seat licence fee.
          The minimum top-up is ₹100.
        </LI>
      </UL>

      <BlogFigure
        src="/blog/whatsapp-marketing-software-what-smslocal-offers.webp"
        alt="What SMSLocal offers for WhatsApp marketing: broadcasts, templates, reports, a shared inbox, quality monitoring and opt-outs"
        caption="What SMSLocal's own pages describe for WhatsApp marketing."
      />

      <H2 id="conclusion">Conclusion</H2>
      <P>
        The best WhatsApp marketing software will use the official platform, handle opt-ins
        and limits and provide honest reports. Features are a bonus once those basics are
        covered.
      </P>
      <P>
        Shortlist 2-3 tools and try them with real templates and a small opted-in group.
        Judge them on what you see. Build up slowly and monitor your quality rating.
      </P>

      <H2 id="faq">Frequently asked questions</H2>
      <BlogFaq items={FAQ_ITEMS} />
    </>
  )
}
