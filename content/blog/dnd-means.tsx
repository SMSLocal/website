import {
  A,
  BlogFigure,
  Callout,
  FigureTable,
  H2,
  H3,
  InlineCode,
  LI,
  Lead,
  OL,
  P,
  Strong,
} from "@/components/blog/blog-prose"
import { BlogFaq, BlogFaqItem } from "@/components/blog/blog-faq"
import { BlogInlineCta } from "@/components/blog/blog-cta"

export default function DndMeansPost() {
  return (
    <>
      <Lead>
        DND — Do Not Disturb — is the one setting every Indian mobile user should know about. It
        tells your operator to block promotional calls and SMS from reaching you, and TRAI&apos;s
        rules back it. This guide explains what DND does, how to set it up, and what to do when
        messages still slip through.
      </Lead>

      <Callout variant="info" title="Written for consumers, not marketers">
        If you&apos;re a business trying to figure out how DND affects your SMS campaigns, read our
        companion guide on <A href="/blog/dnd-services/">DND services for senders</A>. This post is
        written for anyone receiving SMS in India.
      </Callout>

      <H2 id="what-dnd-is">What DND actually is</H2>
      <P>
        DND is a consumer service under the rules of the <Strong>Telecom Regulatory Authority of
        India (TRAI)</Strong>, run by every Indian mobile operator. When you register a
        preference, it is recorded in the National Customer Preference Register (NCPR), which
        TRAI&apos;s rules call the Preference Register. A promotional message can reach you only
        if you have not blocked promotions in its category, or if you have given the sender your
        explicit digital consent.
      </P>
      <P>
        Think of it as a <Strong>&quot;block list for marketing&quot;</Strong> that works at the
        network level. You don&apos;t have to install an app, and you don&apos;t have to block
        individual numbers. You register your preference once, and compliant senders cannot
        deliver promotional messages against it.
      </P>

      <BlogFigure
        src="/blog/what-dnd-actually-is.webp"
        alt="Infographic explaining what DND (Do Not Disturb) actually is — a TRAI-mandated network-level filter that blocks promotional SMS and calls on Indian mobile numbers."
        caption="DND works at the network level through TRAI's National Customer Preference Register — no app needed, and every compliant sender is legally required to respect it."
      />

      <H2 id="what-dnd-blocks">What DND blocks and doesn&apos;t block</H2>
      <P>
        DND is specifically scoped to <Strong>promotional</Strong> communication. It does not
        block the messages you actually need. Under TRAI&apos;s rules,{" "}
        <A href="/blog/what-is-sms/">transactional messages</A>, service messages and government
        communication still reach you, because TRAI treats them as important to customers.
      </P>
      <FigureTable
        columns={["Message type", "Does DND block it?", "Examples"]}
        rows={[
          [
            <Strong key="promo">Promotional</Strong>,
            "Yes, unless the sender holds your explicit digital consent",
            "Marketing offers, discount codes, product launches, newsletter blasts",
          ],
          [
            <Strong key="transactional">Transactional</Strong>,
            "No (you still receive them)",
            "Bank or e-commerce transaction OTPs, payment confirmations, refund updates",
          ],
          [
            <Strong key="service">Service</Strong>,
            "No (you still receive them)",
            "Delivery updates, warranty or recall notices, login and password-reset OTPs",
          ],
          [
            <Strong key="govt">Government</Strong>,
            "No",
            "Disaster warnings and other public-interest messages from the government",
          ],
          [
            <Strong key="personal">Personal SMS</Strong>,
            "No",
            "Messages from regular mobile numbers, WhatsApp, etc.",
          ],
        ]}
        caption="DND is a filter on commercial senders — not a total mute button."
      />
      <P>
        One more rule: if a business sends a service message on your explicit consent, TRAI&apos;s
        2026 amendment treats it as a promotional message based on explicit consent. You can
        withdraw consent through the mechanism your operator provides.
      </P>

      <H2 id="why-it-exists">Why DND exists</H2>
      <P>
        Unwanted commercial calls and SMS became a public nuisance, and TRAI stepped in. Its first
        regulations, notified in 2007, set up a National Do Not Call Registry. New regulations
        followed in 2010, and its <Strong>TCCCPR 2018</Strong> regulations rebuilt the system on a
        shared ledger, with every sender and message template registered through{" "}
        <A href="/blog/dlt-registration-guide/">DLT</A>.
      </P>
      <P>
        TRAI has kept tightening the rules, most recently with amendments in February 2025 and
        September 2026. A sender found to be sending unsolicited commercial messages can have all
        outgoing services barred for 15 days on a first violation. A second violation can mean
        disconnection of all its telecom resources for one year and blacklisting.
      </P>

      <BlogFigure
        src="/blog/why-dnd-exists.webp"
        alt="Visual showing why India's DND (Do Not Disturb) regulation exists — the history of TRAI's anti-spam telecom rules and the NCPR system that protects mobile users."
        caption="India's DND regime emerged from the 2007 National Do Not Call Registry and was rebuilt on a shared ledger with TCCCPR 2018 — one of the most detailed anti-spam frameworks in the world."
      />

      <BlogInlineCta
        title="Sending SMS to Indian numbers?"
        body="If you run campaigns, DND compliance is mandatory under TRAI's DLT rules. SMSLocal scrubs against the NCPR registry so your promotional and transactional messages reach the right numbers."
        primary={{ label: "Start your trial", href: "/signup/" }}
      />

      <H2 id="how-to-activate">How to activate DND on your number</H2>
      <P>
        Your operator must give you these ways to register, change or cancel a preference, free
        of cost and 24 hours a day. It must acknowledge your request within 15 minutes with a
        reference number, and TRAI&apos;s rules require your preference to be in effect, with no
        promotional message delivered against it, within 24 hours.
      </P>
      <P>The codes are the same on every route.</P>
      <FigureTable
        columns={["What you want", "SMS to 1909", "Press when you call 1909", "USSD"]}
        rows={[
          [
            <Strong key="all">Block all promotional messages</Strong>,
            <InlineCode key="a1">BLOCK PROMO</InlineCode>,
            "50",
            <InlineCode key="a2">*1909*50#</InlineCode>,
          ],
          [
            "Block banking, insurance, financial products and credit cards",
            <InlineCode key="b1">BLOCK 1</InlineCode>,
            "1",
            <InlineCode key="b2">*1909*1#</InlineCode>,
          ],
          [
            "Block real estate",
            <InlineCode key="c1">BLOCK 2</InlineCode>,
            "2",
            <InlineCode key="c2">*1909*2#</InlineCode>,
          ],
          [
            "Block education",
            <InlineCode key="d1">BLOCK 3</InlineCode>,
            "3",
            <InlineCode key="d2">*1909*3#</InlineCode>,
          ],
          [
            "Block health",
            <InlineCode key="e1">BLOCK 4</InlineCode>,
            "4",
            <InlineCode key="e2">*1909*4#</InlineCode>,
          ],
          [
            "Block consumer goods and automobiles",
            <InlineCode key="f1">BLOCK 5</InlineCode>,
            "5",
            <InlineCode key="f2">*1909*5#</InlineCode>,
          ],
          [
            "Block communication, broadcasting, entertainment and IT",
            <InlineCode key="g1">BLOCK 6</InlineCode>,
            "6",
            <InlineCode key="g2">*1909*6#</InlineCode>,
          ],
          [
            "Block tourism and leisure",
            <InlineCode key="h1">BLOCK 7</InlineCode>,
            "7",
            <InlineCode key="h2">*1909*7#</InlineCode>,
          ],
          [
            "Block food and beverages",
            <InlineCode key="i1">BLOCK 8</InlineCode>,
            "8",
            <InlineCode key="i2">*1909*8#</InlineCode>,
          ],
          [
            <Strong key="un">Unblock everything</Strong>,
            <InlineCode key="j1">UNBLOCK ALL</InlineCode>,
            "90",
            <InlineCode key="j2">*#1909*90#</InlineCode>,
          ],
          [
            "Unblock one category again",
            <InlineCode key="k1">UNBLOCK 91</InlineCode>,
            "91 to 98",
            <InlineCode key="k2">*#1909*91#</InlineCode>,
          ],
        ]}
        caption="Category 91 is banking and 98 is food and beverages, in the same order as 1 to 8. Source: TRAI's Third Amendment Regulations, 2026."
      />
      <Callout variant="tip" title="Most people want BLOCK PROMO">
        Category blocks suit people who want some marketing but not all of it. If you want to stop
        promotional messages entirely, <InlineCode>BLOCK PROMO</InlineCode> is the one to use. If
        you registered a &quot;Fully block&quot; preference in the past, TRAI&apos;s 2026
        amendment moves it to Block promo, and transactional and service messages still reach you.
      </Callout>

      <H3>Option 1: Send an SMS to 1909</H3>
      <P>
        From the phone you want to protect, send the text from the table to{" "}
        <InlineCode>1909</InlineCode>. For example, send <InlineCode>BLOCK PROMO</InlineCode> to
        stop all promotional messages.
      </P>

      <H3>Option 2: Call 1909</H3>
      <P>
        Call <InlineCode>1909</InlineCode>. An automated menu asks you to press the number from
        the table. This is the most accessible option if you&apos;re helping an older relative
        register a preference.
      </P>

      <H3>Option 3: Dial the USSD code</H3>
      <P>
        Dial the USSD code from the table, for example <InlineCode>*1909*50#</InlineCode>. It works
        on feature phones too, because it needs no data connection.
      </P>

      <H3>Option 4: An app, the web portal or customer care</H3>
      <P>
        TRAI&apos;s rules also allow a mobile app approved by TRAI and a web portal that checks
        your identity with an OTP. Your operator&apos;s own app may offer DND controls too, and you
        can ask its customer care to register your preference.
      </P>

      <H2 id="still-getting-spam">Still getting promotional SMS? Here&apos;s what to do</H2>
      <P>
        DND isn&apos;t perfect. Some senders ignore the rules, and a small number use ordinary
        10-digit numbers that sit outside the registered system. If you&apos;re still receiving
        promotional messages, work through these four steps.
      </P>

      <BlogFigure
        src="/blog/still-getting-promotional-sms-what-to-do.webp"
        alt="Step-by-step guide on what to do if you are still receiving promotional SMS after activating DND in India — how to verify, report, and escalate spam."
        caption="Even with DND active, some senders still break through. Report them to 1909 within 7 days of receiving the message, and your operator must acknowledge the complaint within 15 minutes."
      />

      <H3>Step 1: Check your DND status</H3>
      <P>
        Look for the confirmation your operator sent when you registered. If you can&apos;t find
        it, send <InlineCode>BLOCK PROMO</InlineCode> to <InlineCode>1909</InlineCode> again, or
        ask customer care to confirm your preference. A category block stops only the categories
        you chose.
      </P>

      <H3>Step 2: Identify the sender</H3>
      <P>
        Transactional and service messages (OTPs, payment confirmations, delivery updates, bank
        alerts) and government messages aren&apos;t blocked by DND, and they will keep coming.
        Promotional messages are offers, discounts and launches. A business that holds your
        explicit digital consent can also send promotions while DND is on, so check whether you
        agreed to receive them.
      </P>

      <H3>Step 3: Report to 1909</H3>
      <P>
        If you registered a preference and a sender breaks it, complain within 7 days of
        receiving the message. You can send an SMS to <InlineCode>1909</InlineCode>, call it, use
        an approved app, or use the operator&apos;s web portal. TRAI&apos;s rules treat a
        complaint as valid when it gives the sender&apos;s number or header, your own mobile
        number, the date of the message and a short description. Your operator must acknowledge
        it within 15 minutes with a reference number.
      </P>

      <H3>Step 4: Escalate to TRAI</H3>
      <P>
        Operators must investigate complaints against registered senders. If you&apos;re not
        satisfied with how yours is handled, you can raise it with TRAI through its website,{" "}
        <A href="https://www.trai.gov.in/">trai.gov.in</A>.
      </P>

      <H2 id="limitations">Limitations and edge cases</H2>
      <P>Three things DND can&apos;t fix:</P>
      <OL>
        <LI>
          <Strong>Unregistered senders on ordinary numbers.</Strong> TRAI notes that some
          spammers use normal 10-digit mobile or landline numbers to pass as ordinary subscribers
          and avoid the rules. Block and report these numbers individually, and use your
          phone&apos;s spam filter.
        </LI>
        <LI>
          <Strong>Messages you agreed to.</Strong> If you gave a business explicit digital
          consent, it can message you even while DND is on. You can withdraw consent through the
          mechanism your operator provides.
        </LI>
        <LI>
          <Strong>Automated promotional calls.</Strong> TRAI directs promotional robo-calls to
          140-series numbers, and you can block those through your preferences, but not every
          automated call is caught. Your phone&apos;s built-in spam filter adds a second layer.
        </LI>
      </OL>

      <BlogFigure
        src="/blog/limitations-and-edge-cases.webp"
        alt="Infographic outlining the limitations and edge cases of DND in India — unregistered senders, international SMS, and robocalls that still slip through."
        caption="DND has real limits: spammers on ordinary 10-digit numbers, messages you consented to, and automated calls can all get through. Your phone's built-in spam filter is a useful second layer."
      />

      <H2 id="faq">Frequently asked questions</H2>
      <BlogFaq>
        <BlogFaqItem q={"Does DND block WhatsApp?"}>
          No. WhatsApp runs over the internet, not the telecom SMS/voice layer, so TRAI&apos;s DND
          rules don&apos;t apply. WhatsApp has its own report &amp; block mechanism — use the
          in-app &quot;Report&quot; option on unwanted business messages.
        </BlogFaqItem>

        <BlogFaqItem q={"Does DND stop OTPs?"}>
          No. Transaction OTPs are transactional messages, and login, password-reset and two-factor OTPs
          are service messages under TRAI&apos;s 2026 amendment. DND blocks neither. If your OTPs
          have stopped arriving, DND is almost never the cause — check your operator&apos;s DND
          dashboard to confirm you&apos;re not on a stricter filter, but the real cause is usually
          network delays or sender-side issues.
        </BlogFaqItem>

        <BlogFaqItem q={"How long does DND take to activate?"}>
          Your operator must acknowledge your request within 15 minutes, and TRAI&apos;s rules
          require your preference to be in effect, with no promotional message delivered against
          it, within 24 hours.
        </BlogFaqItem>

        <BlogFaqItem q={"Does DND expire?"}>
          A registered preference stays in place until you change it. To switch promotional
          blocking off, send <InlineCode>UNBLOCK ALL</InlineCode> to 1909, press 90 when you call
          1909, or dial <InlineCode>*#1909*90#</InlineCode>.
        </BlogFaqItem>

        <BlogFaqItem q={"If I change operators (MNP), does DND carry over?"}>
          Your DND preference is tied to your phone <Strong>number</Strong>, not your operator.
          When you port, TRAI requires the operator you move to to update the number&apos;s
          serving-network details in the preference register within 24 hours.
        </BlogFaqItem>
      </BlogFaq>

      <Callout variant="tip" title="Running a business?">
        DND isn&apos;t a blocker — it&apos;s a filter. Transactional and service SMS (OTPs,
        receipts, alerts) still reach every number, DND or not. Read our{" "}
        <A href="/blog/dnd-services/">DND services for senders</A> guide for the business side,
        or see how <A href="/products/otp-sms/">SMSLocal OTP SMS</A> sends codes on
        transactional-priority routes.
      </Callout>
    </>
  )
}
