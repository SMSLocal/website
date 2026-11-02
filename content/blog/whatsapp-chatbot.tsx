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
    q: "What is a WhatsApp chatbot and how does it work?",
    a: (
      <>
        A WhatsApp chatbot, also called a WhatsApp business chatbot or WhatsApp bot, is
        software linked to your business number on the WhatsApp Business Platform. It
        receives each customer message, follows a flow or finds an answer in your content,
        and replies in the same chat. It hands the chat to a person when it can&apos;t help.
      </>
    ),
  },
  {
    q: "How do I create a WhatsApp chatbot?",
    a: (
      <>
        Sign up with a provider for Business API access, list your most common questions and
        design a flow around them. Add your content, get your templates approved and set up
        handover to a human. Test, go live with a small group and review the chats weekly.
      </>
    ),
  },
  {
    q: "Do I need the WhatsApp Business API to build a chatbot?",
    a: (
      <>
        Yes. The free WhatsApp Business app isn&apos;t built for chatbots, so a WhatsApp
        Business API chatbot needs the WhatsApp Business Platform, which you reach through a
        provider that is an official Solution Provider.
      </>
    ),
  },
  {
    q: "Is a WhatsApp chatbot free to run?",
    a: (
      <>
        Not completely. Messages from customers are free, and each business number gets
        1,000 free service messages a month. Meta charges for messages beyond that and for
        template messages, and your provider may add its own fee.
      </>
    ),
  },
  {
    q: "Can a WhatsApp chatbot use AI?",
    a: (
      <>
        Meta&apos;s terms don&apos;t directly address a business using AI to answer its own
        customers, so check them for your case. They bar AI providers from the platform when
        AI is the main product, and they restrict using platform data to train AI models.
      </>
    ),
  },
]

export default function WhatsappChatbotPost() {
  return (
    <>
      <Lead>
        A WhatsApp chatbot is a program that can automatically respond to customers any time
        of the day using your business&apos; WhatsApp number, and hand the chat to a human
        when it can&apos;t help. As many customers use WhatsApp daily, a chatbot makes it
        easy for them to chat to your business using the same method instead of filling a
        form or queuing on the phone.
      </Lead>
      <P>
        There are some differences between having a chatbot on WhatsApp and having one on
        your website. Meta controls who you can message, when you can reply and how much it
        costs to send each message. They also changed the price structure and AI policies in
        2026. In this guide we&apos;ll show you how WhatsApp chatbots work for businesses in
        India, what you can do, how much it&apos;ll cost and how to create one step by step.
      </P>

      <H2 id="what-a-whatsapp-chatbot-is">What a WhatsApp chatbot is</H2>
      <P>
        A WhatsApp chatbot is a piece of software that is linked to a number on the WhatsApp
        Business Platform. When a customer sends a message, this is sent to your bot via the
        platform and a response is sent back.
      </P>
      <P>
        This is not the same as the free WhatsApp Business app. This is designed for one
        person or a small team to use on their phone. To create a chatbot you need to use
        the WhatsApp Business Platform (Business API). This can be done using a provider
        like SMSLocal.
      </P>
      <P>
        A good chatbot will:
      </P>
      <UL>
        <LI>
          <Strong>Answer frequently asked questions.</Strong>{" "}This could be opening
          times, order status, pricing and policies.
        </LI>
        <LI>
          <Strong>Complete simple tasks.</Strong>{" "}This could include making a booking,
          checking order status or gathering information for a callback.
        </LI>
      </UL>

      <BlogFigure
        src="/blog/whatsapp-chatbot-what-it-is.webp"
        alt="Three steps of a WhatsApp chatbot: a customer asks about business hours, the chatbot processes the message, and an automated reply is sent."
        caption="A chatbot will receive a question, find the answer and reply."
      />

      <H2 id="rule-based-ai-and-hybrid-chatbots">Rule-based, AI and hybrid chatbots</H2>
      <P>
        There are three types of chatbot you can use on WhatsApp. Which one you choose
        depends on how predictable your questions are.
      </P>
      <FigureTable
        columns={["Chatbot type", "How it works", "Best for", "Things to note"]}
        rows={[
          [
            "Rule-based",
            "Chatbot follows a flow you design. Has buttons and set responses",
            "Order status, bookings & simple FAQs",
            "Can't answer out-of-scope questions",
          ],
          [
            "AI",
            "Answers open-ended questions from your content",
            "Wide range of product/policy questions",
            "Needs good content and testing",
          ],
          [
            "Hybrid",
            "Hybrid of the above. Has a flow for key tasks, AI for open-ended questions and a human for everything else",
            "Most businesses",
            "More set-up required",
          ],
        ]}
        caption="The right type depends on how predictable your customers' questions are."
      />
      <P>
        A rule-based chatbot is the most predictable, and an AI WhatsApp chatbot is the most
        flexible. To start with, a hybrid chatbot is the safest. This will ensure that key
        tasks like bookings are precise and predictable. AI will cover any long-tail
        questions you didn&apos;t plan for and humans can handle anything sensitive.
      </P>
      <H2 id="how-a-whatsapp-chatbot-works">How a WhatsApp chatbot works</H2>
      <P>
        Every message sent in a simple chat will follow the same process.
      </P>
      <OL>
        <LI>
          <Strong>The customer sends a message</Strong>{" "}to your WhatsApp number. This is
          often after clicking a link to start a chat or clicking on an ad.
        </LI>
        <LI>
          <Strong>The message is sent to your bot through the platform.</Strong>{" "}The
          message is received by your provider and sent to the chatbot.
        </LI>
        <LI>
          <Strong>The bot decides what to do.</Strong>{" "}This could be following your
          flow, looking up an answer from your content, asking a follow-up question or
          completing an action like making a booking.
        </LI>
        <LI>
          <Strong>The bot replies.</Strong>{" "}This could be text, media, reply buttons or
          lists. Meta will allow you to use up to three reply buttons. Titles must be up to
          20 characters and the body text up to 1,024 characters.
        </LI>
        <LI>
          <Strong>Handover to human.</Strong>{" "}If the bot can&apos;t help, the chat will
          be handed over to a shared inbox.
        </LI>
      </OL>
      <P>
        SMSLocal&apos;s
        {" "}<A href="/products/ai-agents/agent-builder/">no-code agent builder</A>{" "}is a
        WhatsApp chatbot builder that follows this process. Train the agent using your help
        center, PDFs, catalog and website pages, then design a visual flow with triggers,
        branching, delays and handovers to humans. Add API or webhook actions for the bot to
        complete actions like making a booking. Publish the agent to WhatsApp and other
        channels.
      </P>

      <BlogFigure
        src="/blog/whatsapp-chatbot-how-it-works.webp"
        alt="Five steps of a WhatsApp chatbot: the customer sends a message, WhatsApp receives it, the chatbot processes it, a business system or knowledge base provides information, and an automated reply reaches the customer."
        caption="All messages sent in a chatbot will follow the same process."
      />

      <H2 id="the-24-hour-window-and-templates">The 24-hour window and templates</H2>
      <P>
        WhatsApp has rules around when a business can send free-form messages.
      </P>
      <P>
        When a customer sends a message to you, a 24-hour customer service window will open.
        Every new message from the customer will reset the timer. During the window you can
        send any non-template message. Outside of the window you can only send a
        pre-approved template.
      </P>
      <FigureTable
        columns={["Situation", "What your bot can send"]}
        rows={[
          [
            "If the customer sent a message within the last 24 hours",
            "You can send any message",
          ],
          [
            "If the window has expired",
            "You can only send an approved template",
          ],
        ]}
        caption="The 24-hour window decides what your bot is allowed to send."
      />
      <P>
        There are three types of template: marketing, utility and authentication. Meta also
        requires that people have opted in to receive messages from your business. You
        can&apos;t send a template to someone who hasn&apos;t opted in.
      </P>
      <P>
        As a best practice, you should design any follow-up messages to be based around a
        template. Ensure the window is open before sending any free-form messages. See our
        guide to{" "}<A href="/blog/bulk-whatsapp-messaging/">bulk WhatsApp messaging</A>
        {" "}for more info on templates and opting in.
      </P>
      <H2 id="what-a-whatsapp-chatbot-costs">What a WhatsApp chatbot costs</H2>
      <P>
        Meta charges per delivered message, not per conversation. Since 1st July 2025, there
        have been a few changes to the costs.
      </P>
      <UL>
        <LI>
          <Strong>Messages sent by the customer are free.</Strong>
        </LI>
        <LI>
          <Strong>Messages sent within the window are service messages.</Strong>{" "}You
          will get 1,000 free service messages per month per business phone number. From
          message 1,001 you&apos;ll be charged. There is no rollover.
        </LI>
        <LI>
          <Strong>Utility messages sent in response to a customer message will also be charged.</Strong>
          {" "}These were free between 1st July 2025 and 1st October 2026.
        </LI>
        <LI>
          <Strong>Templates will be charged depending on the type.</Strong>{" "}The price
          will depend on the customer&apos;s country.
        </LI>
        <LI>
          <Strong>However, there is a free entry window.</Strong>{" "}If the customer
          started the chat using a Click to WhatsApp ad in the mobile app and you responded
          in time, messages will be free for up to 7 days.
        </LI>
      </UL>
      <P>
        Meta also has its own AI agent platform, Meta Business Agent. This is charged per
        token. If you use any other platform to create your bot, you will be sending regular
        service messages. These can be powered by third party AI or humans.
      </P>
      <P>
        Your provider will charge you. SMSLocal&apos;s WhatsApp Business API page says there
        are no setup fees, monthly plans or per-seat fees. You will just be charged per
        message sent, and the minimum top-up is ₹100. Check Meta&apos;s current rates on its
        {" "}<A href="https://developers.facebook.com/documentation/business-messaging/whatsapp/pricing">WhatsApp pricing page</A>.
      </P>
      <P>
        There will also be some set-up costs. Linking your bot to your ordering, booking or
        CRM systems could take some time and may require some development. So the full
        WhatsApp chatbot cost has three parts: Meta&apos;s messaging charges, your platform
        fees and the set-up work.
      </P>
      <P>
        <Strong>If an old guide says messages within the 24-hour window are always free, this is outdated.</Strong>
      </P>

      <BlogFigure
        src="/blog/whatsapp-chatbot-costs.webp"
        alt="Three costs of a WhatsApp chatbot: Meta's messaging charges, chatbot platform or provider fees, and development and integration, adding up to the total."
        caption="Total cost will depend on the messaging, platform and set-up."
      />

      <H2 id="metas-rule-on-ai">Meta&apos;s rule on AI</H2>
      <P>
        If you plan to build an AI WhatsApp chatbot, read Meta&apos;s terms first.
        Meta&apos;s terms state that AI providers cannot use the WhatsApp Business Platform
        if AI is their main service rather than an incidental part of one. While this does
        not specifically relate to using AI to answer your own customers, it does add that
        if you use Meta&apos;s own Business Agents or other AI-related technologies there
        may be different or additional terms.
      </P>
      <P>
        Whether your support, booking or ordering bot for your own customers will fall under
        this depends on the terms. If you&apos;re unsure, a lawyer may be able to help. To
        stay on the safe side:
      </P>
      <UL>
        <LI>
          <Strong>Ensure your bot is in-house.</Strong>{" "}This should be answering
          questions around your products, orders, bookings and policies.
        </LI>
        <LI>
          <Strong>Do not use chat data to train a model.</Strong>{" "}The terms state that
          platform data cannot be used to create, develop, train or improve AI models,
          except for fine-tuning a model for your exclusive use. This matters most if your
          Solution Provider is an AI company.
        </LI>
      </UL>
      <P>
        SMSLocal describes itself as a native WhatsApp Business Solution Provider.
      </P>
      <H2 id="where-a-chatbot-works-best">Where a chatbot works best</H2>
      <P>
        A chatbot should be used where there are lots of common questions. A WhatsApp
        chatbot for customer support is a typical example of WhatsApp automation. These are
        the main WhatsApp chatbot use cases:
      </P>
      <UL>
        <LI>
          <Strong>Support:</Strong>{" "}opening times, delivery times, returns and how-to
          answers.
        </LI>
        <LI>
          <Strong>Order status:</Strong>{" "}the customer will ask a question which your bot
          can look up.
        </LI>
        <LI>
          <Strong>Appointments:</Strong>{" "}booking, rescheduling and reminders for
          clinics, salons and classes.
        </LI>
        <LI>
          <Strong>Lead qualification:</Strong>{" "}ask 2 or 3 questions before handing over
          to a salesperson.
        </LI>
        <LI>
          <Strong>Reminders for payment and renewals:</Strong>{" "}short utility messages
          with a clear next step.
        </LI>
      </UL>
      <P>
        Refunds, disputes or anything sensitive shouldn&apos;t be handled by a chatbot. Send
        these to a human quickly with the chat history.
      </P>

      <BlogFigure
        src="/blog/whatsapp-chatbot-where-it-works-best.webp"
        alt="Four places a chatbot works best: customer support, order updates, lead generation, and appointments and bookings."
        caption="Start with common and clear questions."
      />

      <H2 id="how-to-build-a-whatsapp-chatbot-step-by-step">How to build a WhatsApp chatbot step by step</H2>
      <P>
        Here is a practical path to create a WhatsApp chatbot.
      </P>
      <OL>
        <LI>
          <Strong>Get Business API access.</Strong>{" "}Sign up with a provider that gives
          you a verified sender on the official API. SMSLocal lets you start a trial to test
          WhatsApp end to end.
        </LI>
        <LI>
          <Strong>Identify your most common questions.</Strong>{" "}Go through your recent
          chats or support tickets and identify the 5 to 10 most common questions or tasks.
        </LI>
        <LI>
          <Strong>Design your flow.</Strong>{" "}Design a welcome message, a main flow, a
          fallback for out-of-scope questions and a clear way of getting to a human. Keep
          your messages short and use buttons.
        </LI>
        <LI>
          <Strong>Add your content.</Strong>{" "}If using an AI chatbot, link your help
          center, PDFs and catalog.
        </LI>
        <LI>
          <Strong>Get your templates approved.</Strong>{" "}Write your utility and other
          templates.
        </LI>
        <LI>
          <Strong>Design your handover to human.</Strong>{" "}Decide who will take over,
          what hours they&apos;ll be available and ensure they can see the full chat.
        </LI>
        <LI>
          <Strong>Test, go live with a small group and improve.</Strong>{" "}Test with real
          and tricky questions. Go live with a small group and review your chats weekly.
        </LI>
      </OL>
      <H2 id="mistakes-that-hurt-a-whatsapp-chatbot">Mistakes that hurt a WhatsApp chatbot</H2>
      <UL>
        <LI>
          <Strong>No way to get to a human.</Strong>{" "}If customers get stuck in a loop
          they&apos;ll leave and some will report you.
        </LI>
        <LI>
          <Strong>Sending messages to people who haven&apos;t opted in.</Strong>{" "}Meta
          requires you to have opted in. Customer reports will affect your quality rating.
        </LI>
        <LI>
          <Strong>Sending free-form messages outside of the window.</Strong>{" "}You can
          only send approved templates.
        </LI>
        <LI>
          <Strong>Allowing the AI to answer with no sources.</Strong>{" "}If there is no
          content for the bot to use it will guess. Ensure you link your help center and
          catalog. Test.
        </LI>
        <LI>
          <Strong>Generic responses and confusing menus.</Strong>{" "}Customers will be put
          off by endless &apos;please select&apos; menus and answers that don&apos;t answer
          the question.
        </LI>
        <LI>
          <Strong>Long blocks of text.</Strong>{" "}Keep your messages short and use reply
          buttons.
        </LI>
        <LI>
          <Strong>Out-of-date information.</Strong>{" "}Ensure you update your sources if
          your opening times, prices or policies change.
        </LI>
        <LI>
          <Strong>Using chats to train AI models.</Strong>{" "}Meta&apos;s terms limit this.
          Do not use chat data to train models.
        </LI>
        <LI>
          <Strong>Not keeping track of your numbers.</Strong>{" "}Keep track of your
          messaging limits and quality rating. Review failed chats to see where the bot is
          getting stuck.
        </LI>
      </UL>

      <BlogFigure
        src="/blog/whatsapp-chatbot-mistakes.webp"
        alt="Four mistakes that hurt a WhatsApp chatbot: generic replies, poor conversation flow, no human handoff and outdated information."
        caption="Four mistakes to avoid with your chatbot."
      />

      <H2 id="how-to-choose-a-platform">How to choose a platform</H2>
      <P>
        Most platforms will look similar. Consider the following when you compare a WhatsApp
        chatbot platform:
      </P>
      <UL>
        <LI>
          <Strong>Official API.</Strong>{" "}Will you get a verified sender through a
          Solution Provider? Don&apos;t use an unofficial tool, as you risk getting banned.
        </LI>
        <LI>
          <Strong>Visual builder.</Strong>{" "}Can your team easily edit flows without a
          developer?
        </LI>
        <LI>
          <Strong>Train on your content.</Strong>{" "}Can the bot answer using your help
          center, files and catalog?
        </LI>
        <LI>
          <Strong>Human handover.</Strong>{" "}Can a person see the full chat in a shared
          inbox?
        </LI>
        <LI>
          <Strong>Template management.</Strong>{" "}Can you create, submit and track
          approvals from Meta?
        </LI>
        <LI>
          <Strong>API and webhooks.</Strong>{" "}Can the bot complete actions?
        </LI>
        <LI>
          <Strong>Clear pricing.</Strong>{" "}How are Meta&apos;s charges for messages
          passed on? Are there any platform charges?
        </LI>
      </UL>
      <P>
        If you want to use the same bot for web chat and SMS, choose a platform that will
        publish your agent to multiple channels.
      </P>
      <H2 id="conclusion">Conclusion</H2>
      <P>
        A WhatsApp chatbot can be a great solution if you stick to Meta&apos;s rules and
        understand the limitations. Ensure you use the Business API, respect the 24-hour
        window and opt-in. Plan for the per-message charges, including those that apply
        again from 1 October 2026. Keep your AI in-house and ensure it can easily be handed
        over to a human.
      </P>
      <P>
        Start with one task, like order status or bookings. Build it, test with real
        questions, review your chats and add more features once it&apos;s working.
      </P>

      <H2 id="faq">Frequently asked questions</H2>
      <BlogFaq items={FAQ_ITEMS} />
    </>
  )
}
