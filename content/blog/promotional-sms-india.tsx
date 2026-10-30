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
    q: "What is promotional SMS?",
    a: (
      <>
        Promotional SMS is a text message that advertises a product or service, such as an
        offer, a sale or a new launch. TRAI requires it to carry an opt-out in the same message
        and to be sent only to customers who have not blocked promotions or who gave consent.
      </>
    ),
  },
  {
    q: "Can I send promotional SMS to numbers on DND?",
    a: (
      <>
        Only if you hold explicit digital consent from the customer. Without it, TRAI&apos;s
        rules allow promotional messages only to customers who have not blocked promotions in the
        relevant category. A customer who chose Block promo will not receive them.
      </>
    ),
  },
  {
    q: "What time can I send promotional SMS in India?",
    a: (
      <>
        Between 9 AM and 9 PM. TRAI&apos;s summary of its 2018 rules limits commercial
        communication other than transactional messages to that window, so schedule your campaign
        to be delivered inside it.
      </>
    ),
  },
  {
    q: "Does a promotional SMS need an opt-out?",
    a: (
      <>
        Yes. TRAI&apos;s definition of a promotional message requires the sender to give an
        opt-out mechanism in the same message. A message without one does not meet the
        definition.
      </>
    ),
  },
  {
    q: "What happens if I break the promotional SMS rules?",
    a: (
      <>
        Operators can act against a sender found to be sending unsolicited commercial messages. A
        first violation bars outgoing services on all the sender&apos;s telecom resources for 15
        days, and a second or later violation means disconnection for one year and blacklisting.
      </>
    ),
  },
]

export default function PromotionalSmsIndiaPost() {
  return (
    <>
      <Lead>
        Promotional SMS is a text message that advertises a product or service, such as an offer,
        a sale or a new launch. In India it is the most regulated kind of business SMS. You need a
        registered sender name and template, you must respect each customer&apos;s DND
        preference, and you can send only between 9 AM and 9 PM.
      </Lead>
      <P>
        This guide explains what promotional SMS is, who can receive it, how to send it, how DLT
        registration works, TRAI&apos;s rules and penalties, the mistakes that get messages
        blocked and what a recipient can do about unwanted ones.
      </P>

      <H2 id="what-promotional-sms-is">What promotional SMS is</H2>
      <P>
        TRAI, India&apos;s telecom regulator, defines a promotional message as a commercial
        communication that contains promotional material or an advertisement of a product or
        service. Sale announcements, discount codes, new product launches and event invitations
        that sell something are all promotional.
      </P>
      <P>
        Two rules follow from the definition. A promotional message must include an opt-out
        mechanism in the same message. And if you mix promotional content into a transactional or
        service message, such as adding an offer to an order confirmation, TRAI treats the whole
        message as promotional.
      </P>

      <BlogFigure
        src="/blog/promotional-sms-india-what-it-is.webp"
        alt="Business sending an SMS offer to a customer, with a sale message on a phone and the words offers, discounts and campaigns."
        caption="A promotional SMS is any message that advertises a product or service."
      />

      <H2 id="who-can-receive-promotional-sms">Who can receive promotional SMS</H2>
      <P>
        TRAI keeps two registers. In the Preference Register, customers record what they do not
        want to receive. In the Consent Register, customers record what they have agreed to. A
        promotional message can go only to customers who have not blocked promotions under the
        applicable category in the Preference Register, or who have given consent in the Consent
        Register.
      </P>
      <P>
        If you hold explicit digital consent from a customer, your promotional message can reach
        them even if they registered a DND preference. TRAI defines explicit consent as
        permission verified directly with the recipient in a robust and verifiable manner and
        recorded by a Consent Registrar. It can also be permission you collected through
        verifiable means and then registered in the Consent Register.
      </P>
      <P>
        Customers set their preferences through 1909, and the options decide who your message can
        reach. TRAI&apos;s September 2026 amendment retires the older Fully block option and
        moves those customers to Block promo. That change takes effect 30 days after the
        amendment&apos;s publication in the Official Gazette.
      </P>
      <FigureTable
        columns={["Preference", "Code", "What it blocks"]}
        rows={[
          [
            <Strong key="bp">Block promo</Strong>,
            "50",
            "All promotional messages, in every category. Transactional messages, service messages and government communication still arrive",
          ],
          [
            <Strong key="bc">Block a category</Strong>,
            "1 to 8",
            "Messages in one category: 1 banking, insurance, financial products and credit cards; 2 real estate; 3 education; 4 health; 5 consumer goods and automobiles; 6 communication, broadcasting, entertainment and IT; 7 tourism and leisure; 8 food and beverages",
          ],
        ]}
        caption="Customers choose these through 1909. Your content category decides which block applies to your message."
      />
      <P>
        Your content category matters. A customer who blocked category 3 will not receive your
        education offer even if they never blocked promotions in general.
      </P>

      <H2 id="how-to-send-promotional-sms">How to send promotional SMS</H2>
      <P>Here is the usual path from nothing to a first campaign.</P>
      <OL>
        <LI>
          <Strong>Get your consent in order.</Strong> Decide which customers gave explicit
          digital consent, and keep proof of how and when each person agreed. Everyone else is
          subject to the DND scrub.
        </LI>
        <LI>
          <Strong>Register with DLT.</Strong> You need your business, a sender name and an
          approved template, covered in the next section.
        </LI>
        <LI>
          <Strong>Choose a platform.</Strong> A platform such as SMSLocal&apos;s{" "}
          <A href="/products/bulk-sms/">bulk SMS service</A> handles the upload, template
          selection, scheduling and delivery reports.
        </LI>
        <LI>
          <Strong>Upload your contacts.</Strong> Import a CSV of numbers and clean out invalid
          ones first.
        </LI>
        <LI>
          <Strong>Write to your template.</Strong> The final text must match an approved
          template, and it must include the opt-out.
        </LI>
        <LI>
          <Strong>Schedule inside the window.</Strong> Send between 9 AM and 9 PM, and schedule
          so messages are delivered inside that window.
        </LI>
        <LI>
          <Strong>Send and read the report.</Strong> Check delivery and failures, then fix
          problems before the next send.
        </LI>
      </OL>

      <BlogFigure
        src="/blog/promotional-sms-india-how-to-send.webp"
        alt="Three steps to send promotional SMS: register on DLT, create an approved template, then send, with a checklist of consent, template and audience."
        caption="Register, create, send: the short version of the process."
      />

      <H2 id="dlt-registration-and-templates-for-promotional-sms">
        DLT registration and templates for promotional SMS
      </H2>
      <P>Indian operators will not deliver business SMS from an unregistered sender. You register three things.</P>
      <UL>
        <LI>
          <Strong>Your business.</Strong> This is the Principal Entity, which identifies you as a
          legal sender.
        </LI>
        <LI>
          <Strong>Your sender name.</Strong> This is the header recipients see. TRAI defines a
          header as an alphanumeric string of up to eleven characters.
        </LI>
        <LI>
          <Strong>Your message templates.</Strong> The exact wording, with variable slots for the
          parts that change, such as a name or a discount code.
        </LI>
      </UL>
      <P>
        TRAI requires commercial communication to go out through registered headers and
        registered content templates. In practice, a message that does not match an approved
        template will not reach the recipient. Each operator&apos;s portal has its own fees and
        timing, so start early. Our{" "}
        <A href="/blog/dlt-registration-guide/">DLT registration guide</A> walks through the
        steps, the documents and the common reasons for rejection.
      </P>

      <H2 id="rules-for-promotional-sms-in-india">Rules for promotional SMS in India</H2>
      <P>These are the rules that matter most, from TRAI&apos;s regulations as amended.</P>
      <UL>
        <LI>
          <Strong>Respect preferences and consent.</Strong> Send only to customers who have not
          blocked promotions in the category you are sending in, or who gave consent.
        </LI>
        <LI>
          <Strong>Include an opt-out.</Strong> It must be in the same message.
        </LI>
        <LI>
          <Strong>Keep to the hours.</Strong>{" "}
          TRAI&apos;s summary of its 2018 rules limits
          commercial communication other than transactional messages to 9 AM to 9 PM.
        </LI>
        <LI>
          <Strong>Do not mix content.</Strong> An offer inside a transactional or service message
          makes the whole message promotional.
        </LI>
        <LI>
          <Strong>Expect fast action on misuse.</Strong>{" "}
          TRAI&apos;s September 2026 amendment
          will require an operator to suspend a misused header or template, across all
          operators, within six hours of noticing it. That part takes effect 60 days after
          Gazette publication.
        </LI>
        <LI>
          <Strong>Know the penalties.</Strong>{" "}
          When an investigation finds a sender was sending
          unsolicited commercial messages, the first violation bars outgoing services on all of
          the sender&apos;s telecom resources for 15 days. A second or later violation means
          disconnection for one year and blacklisting.
        </LI>
      </UL>
      <P>
        Read the definitions and DND options in TRAI&apos;s{" "}
        <A href="https://www.trai.gov.in/sites/default/files/2025-02/Regulation_12022025.pdf">
          Second Amendment Regulations, 2025
        </A>
        , and check TRAI&apos;s September 2026 amendment for the latest changes. This is a
        summary, not legal advice.
      </P>

      <BlogFigure
        src="/blog/promotional-sms-india-rules-checklist.webp"
        alt="Four rule cards for promotional SMS in India: DLT registration, approved templates, consent and preferences, and sender and time rules."
        caption="The four things every promotional campaign has to get right."
      />

      <H2 id="common-promotional-sms-mistakes">Common promotional SMS mistakes</H2>
      <UL>
        <LI>
          <Strong>Messaging customers who blocked your category.</Strong> The message may not be
          delivered, and repeated complaints put your sender name at risk.
        </LI>
        <LI>
          <Strong>Leaving out the opt-out.</Strong> The definition requires it in the same
          message.
        </LI>
        <LI>
          <Strong>Scheduling outside 9 AM to 9 PM.</Strong> Check the time zone and the delivery
          time, not just the send time.
        </LI>
        <LI>
          <Strong>Adding an offer to a transactional template.</Strong> It becomes promotional,
          with promotional rules.
        </LI>
        <LI>
          <Strong>Using a list you did not collect.</Strong> People on a bought list have not
          given you consent.
        </LI>
        <LI>
          <Strong>Keeping no proof of consent.</Strong> If you rely on explicit consent, you need
          to show how and when it was given.
        </LI>
      </UL>

      <H2 id="if-you-receive-unwanted-promotional-messages">
        If you receive unwanted promotional messages
      </H2>
      <P>
        You can block promotional messages through TRAI&apos;s 1909 service. To block promotions
        only, call 1909 and press 50 at the prompt, send the text BLOCK PROMO to 1909, or dial
        *1909*50#. To block one category, such as real estate, use its number from 1 to 8. Block
        promo never stops transactional messages, service messages or government communication.
      </P>
      <P>
        You can also use the opt-out in the message itself. TRAI&apos;s rules require every
        promotional message to carry one.
      </P>
      <P>
        If a sender ignores your choices, report the message. TRAI lets you register a complaint
        by sending an SMS to 1909, by calling 1909 or through the mobile app. File it within
        seven days of receiving the message.
      </P>

      <BlogFigure
        src="/blog/promotional-sms-india-unwanted-messages-1909.webp"
        alt="Steps for unwanted promotional SMS: identify the spam, report it via 1909, and block promotional messages, then manage preferences."
        caption="Review the message, report it, and set your preferences."
      />

      <H2 id="what-smslocal-offers">What SMSLocal offers</H2>
      <P>SMSLocal&apos;s bulk SMS and Quick SMS pages describe the following.</P>
      <UL>
        <LI>
          <Strong>DLT help.</Strong>{" "}
          DLT registration support is included, and SMSLocal&apos;s
          team helps across the operator portals.
        </LI>
        <LI>
          <Strong>Campaign tools.</Strong> Import a CSV, choose a DLT-approved template, preview
          the message, and send now or schedule it.
        </LI>
        <LI>
          <Strong>Number checks.</Strong> Invalid numbers are flagged before you send, so credits
          are not spent on numbers that cannot receive.
        </LI>
        <LI>
          <Strong>Retries.</Strong> Messages that fail on the primary route are retried on an
          alternate route.
        </LI>
        <LI>
          <Strong>Compliance controls.</Strong> DND filtering, opt-out handling and sender ID
          validation are applied to every send, according to the Quick SMS page.
        </LI>
        <LI>
          <Strong>Reports.</Strong> A live delivery feed, a per-carrier breakdown and click
          tracking on links.
        </LI>
      </UL>

      <H2 id="conclusion">Conclusion</H2>
      <P>
        Promotional SMS works when you treat the rules as part of the campaign. Know who has
        blocked what, hold consent you can prove, include the opt-out, register your header and
        template, and send inside 9 AM to 9 PM.
      </P>
      <P>
        Start small. Send to customers who gave explicit consent, read the delivery report, and
        widen to the rest of your list only after you have checked who the DND scrub removes.
      </P>

      <H2 id="faq">Frequently asked questions</H2>
      <BlogFaq items={FAQ_ITEMS} />
    </>
  )
}
