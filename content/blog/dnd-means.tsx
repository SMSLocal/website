import {
  A,
  Blockquote,
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
  UL,
} from "@/components/blog/blog-prose"
import { BlogFaq, BlogFaqItem } from "@/components/blog/blog-faq"
import { BlogInlineCta } from "@/components/blog/blog-cta"

export default function DndMeansPost() {
  return (
    <>
      <Lead>
        DND — Do Not Disturb — is the one setting every Indian mobile user should know about. It
        tells your operator to block promotional calls and SMS from reaching you, and it&apos;s
        legally enforced by TRAI. This guide explains exactly what DND does, how to activate it,
        and what to do when messages still slip through.
      </Lead>

      <Callout variant="info" title="Written for consumers, not marketers">
        If you&apos;re a business trying to figure out how DND affects your SMS campaigns, read our
        companion guide on <A href="/blog/dnd-services/">DND services for senders</A>. This post is
        written for anyone receiving SMS in India.
      </Callout>

      <H2 id="what-dnd-is">What DND actually is</H2>
      <P>
        DND is a consumer-facing service run by the <Strong>Telecom Regulatory Authority of India
        (TRAI)</Strong>, administered by every Indian mobile operator. When you activate DND on
        your number, the operator adds you to the National Customer Preference Register (NCPR) —
        a database that every registered sender is legally required to scrub against before they
        send you a promotional message.
      </P>
      <P>
        Think of it as a <Strong>&quot;block list for marketing&quot;</Strong> that works at the
        network level. You don&apos;t have to install an app, you don&apos;t have to block
        individual numbers — you opt into DND once and every compliant sender stops reaching you
        through promotional channels.
      </P>

      <BlogFigure
        src="/blog/what-dnd-actually-is.webp"
        alt="Infographic explaining what DND (Do Not Disturb) actually is — a TRAI-mandated network-level filter that blocks promotional SMS and calls on Indian mobile numbers."
        caption="DND works at the network level through TRAI's National Customer Preference Register — no app needed, and every compliant sender is legally required to scrub against it."
      />

      <H2 id="what-dnd-blocks">What DND blocks and doesn&apos;t block</H2>
      <P>
        DND is specifically scoped to <Strong>promotional</Strong> communication. It does not
        block legitimate transactional messages — the ones you actually need — because those are
        considered service-critical under TRAI&apos;s rules.
      </P>
      <FigureTable
        columns={["Message type", "Does DND block it?", "Examples"]}
        rows={[
          [
            <Strong key="promo">Promotional</Strong>,
            "Yes",
            "Marketing offers, discount codes, product launches, newsletter blasts",
          ],
          [
            <Strong key="service">Service-explicit</Strong>,
            "No (you still receive them)",
            "OTPs, payment receipts, delivery updates, bank alerts, appointment reminders",
          ],
          [
            <Strong key="service-implicit">Service-implicit</Strong>,
            "Partially (time-restricted)",
            "Customer-care follow-ups, policy updates from services you use",
          ],
          [
            <Strong key="govt">Government</Strong>,
            "No",
            "Aadhaar, election commission, disaster alerts, vaccination notifications",
          ],
          [
            <Strong key="personal">Personal SMS</Strong>,
            "No",
            "Messages from regular mobile numbers, WhatsApp, etc.",
          ],
        ]}
        caption="DND is a filter on commercial senders — not a total mute button."
      />

      <H2 id="why-it-exists">Why DND exists</H2>
      <P>
        In the early 2010s, Indian mobile users were drowning in spam. Some numbers were getting
        30+ unsolicited calls and SMS a day, and there was no recourse. TRAI introduced the
        National Do Not Call Registry in 2007 and expanded it into the full NCPR system with the
        <Strong> TCCCPR 2018</Strong> regulations — which added blockchain-backed DLT registration
        for every sender.
      </P>
      <P>
        Today, India has one of the strictest anti-spam telecom regimes in the world. If a
        registered sender messages a DND-activated number, the operator can fine them, suspend
        their sender ID, and in repeat cases, blacklist the company from sending SMS entirely.
      </P>

      <BlogFigure
        src="/blog/why-dnd-exists.webp"
        alt="Visual showing why India's DND (Do Not Disturb) regulation exists — the history of TRAI's anti-spam telecom rules and the NCPR system that protects mobile users."
        caption="India's DND regime emerged from the 2007 National Do Not Call Registry and was strengthened with TCCCPR 2018 — making it one of the strictest anti-spam frameworks in the world."
      />

      <BlogInlineCta
        title="Sending SMS to Indian numbers?"
        body="If you run campaigns, DND compliance is mandatory under TRAI's DLT rules. SMSLocal scrubs against the NCPR registry so your promotional and transactional messages reach the right numbers."
        primary={{ label: "Start free — ₹60 credit", href: "/signup/" }}
        secondary={{ label: "View pricing", href: "/pricing/" }}
      />

      <H2 id="how-to-activate">How to activate DND on your number</H2>
      <P>
        DND activation takes 5 minutes and is free. There are three ways:
      </P>

      <H3>Option 1: Send an SMS to 1909</H3>
      <P>
        From the phone you want to add to DND, send an SMS to <InlineCode>1909</InlineCode> with
        one of these commands:
      </P>
      <UL>
        <LI>
          <InlineCode>START 0</InlineCode> — fully block all promotional SMS and calls
        </LI>
        <LI>
          <InlineCode>START 1</InlineCode> — block all promotional <Strong>except</Strong>{" "}
          banking/financial
        </LI>
        <LI>
          <InlineCode>START 2</InlineCode> — block all except real estate
        </LI>
        <LI>
          <InlineCode>START 3</InlineCode> — block all except education
        </LI>
        <LI>
          <InlineCode>START 4</InlineCode> — block all except health
        </LI>
        <LI>
          <InlineCode>STOP</InlineCode> — de-activate DND entirely
        </LI>
      </UL>
      <Callout variant="tip" title="Most people want START 0">
        Category-specific opt-ins were designed for users who wanted certain kinds of marketing
        but not others. In practice, almost everyone who activates DND wants a clean total block,
        which is <InlineCode>START 0</InlineCode>.
      </Callout>

      <H3>Option 2: Call 1909</H3>
      <P>
        From the number you want to protect, call <InlineCode>1909</InlineCode> toll-free. An IVR
        walks you through the same options. This is the most accessible option if you&apos;re
        helping an older relative activate DND.
      </P>

      <H3>Option 3: Your operator&apos;s app or website</H3>
      <P>
        Every major Indian operator exposes DND controls in their self-service app:
      </P>
      <UL>
        <LI>
          <Strong>Jio:</Strong> MyJio app → Settings → Service Settings → Do Not Disturb
        </LI>
        <LI>
          <Strong>Airtel:</Strong> Airtel Thanks app → More → DND Settings
        </LI>
        <LI>
          <Strong>Vodafone Idea (Vi):</Strong> Vi app → Account → DND
        </LI>
        <LI>
          <Strong>BSNL:</Strong> BSNL Selfcare portal → Value Added Services → DND
        </LI>
      </UL>
      <P>
        Activation takes up to 7 days to propagate across every sender&apos;s scrub list,
        but most legitimate senders pick up the change within 24 hours.
      </P>

      <H2 id="still-getting-spam">Still getting promotional SMS? Here&apos;s what to do</H2>
      <P>
        DND isn&apos;t perfect. Some senders ignore it (illegally), some don&apos;t scrub their
        lists often enough, and a small number exploit personal 10-digit numbers that aren&apos;t
        covered by DLT at all. If you&apos;re still receiving spam, you have recourse.
      </P>

      <BlogFigure
        src="/blog/still-getting-promotional-sms-what-to-do.webp"
        alt="Step-by-step guide on what to do if you are still receiving promotional SMS after activating DND in India — how to verify, report, and escalate spam."
        caption="Even with DND active, some senders still break through. Report them to 1909 by forwarding the unwanted SMS — the complaint creates an official record the operator must act on."
      />

      <H3>Step 1: Verify the SMS is actually promotional</H3>
      <P>
        Service SMS (OTPs, delivery updates, bank alerts) aren&apos;t covered by DND and will keep
        coming. Promotional SMS are clearly marketing — offers, discounts, product launches.
      </P>

      <H3>Step 2: Report the sender</H3>
      <P>
        Forward the unwanted SMS to <InlineCode>1909</InlineCode>, including the sender&apos;s
        number or header. Include the date and time. This is a free SMS and it creates an
        official complaint record.
      </P>
      <Callout variant="warning" title="What the format looks like">
        <InlineCode>
          COMPLAIN {"<sender header>"} {"<date time>"} {"<SMS text>"}
        </InlineCode>
        . Most operator apps have a &quot;Report Spam&quot; button that formats this for you.
      </Callout>

      <H3>Step 3: Escalate if ignored</H3>
      <P>
        If 7 days pass without resolution, you can escalate to TRAI directly through the{" "}
        <A href="https://www.trai.gov.in/">TRAI complaint portal</A>. Operators are required to
        respond to every complaint, and repeat offenders face Header suspension.
      </P>

      <H2 id="limitations">Limitations and edge cases</H2>
      <P>Three things DND can&apos;t fix:</P>
      <OL>
        <LI>
          <Strong>Unregistered senders on personal numbers.</Strong> Some spammers rent SIMs and
          send from regular 10-digit numbers. These aren&apos;t covered by DND at all — block them
          individually or use your phone&apos;s spam filter.
        </LI>
        <LI>
          <Strong>International SMS.</Strong> SMS originating outside India (+1, +44, etc.) don&apos;t
          pass through Indian DLT infrastructure and aren&apos;t scrubbed against the DND registry.
        </LI>
        <LI>
          <Strong>Voice bots and robocalls.</Strong> DND blocks registered promotional calls but
          not every automated call gets caught. Android&apos;s Phone app has a &quot;Caller ID &amp;
          spam&quot; setting that adds a second layer.
        </LI>
      </OL>

      <BlogFigure
        src="/blog/limitations-and-edge-cases.webp"
        alt="Infographic outlining the limitations and edge cases of DND in India — unregistered senders, international SMS, and robocalls that still slip through."
        caption="DND has real limits: personal 10-digit spammers, international SMS, and robocalls all bypass it. Android's built-in spam filter adds a useful second layer for these gaps."
      />

      <H2 id="faq">Frequently asked questions</H2>
      <BlogFaq>
        <BlogFaqItem q={"Does DND block WhatsApp?"}>
          No. WhatsApp runs over the internet, not the telecom SMS/voice layer, so TRAI&apos;s DND
          rules don&apos;t apply. WhatsApp has its own report &amp; block mechanism — use the
          in-app &quot;Report&quot; option on unwanted business messages.
        </BlogFaqItem>

        <BlogFaqItem q={"Does DND stop OTPs?"}>
          No. OTPs are service-explicit transactional messages and are exempt from DND. If your OTPs
          have stopped arriving, DND is almost never the cause — check your operator&apos;s DND
          dashboard to confirm you&apos;re not on a stricter filter, but the real cause is usually
          network delays or sender-side issues.
        </BlogFaqItem>

        <BlogFaqItem q={"How long does DND take to activate?"}>
          Up to 7 days officially. In practice, most compliant senders update their scrub lists
          every 24 hours, so you&apos;ll notice a drop by the next day.
        </BlogFaqItem>

        <BlogFaqItem q={"Does DND expire?"}>
          No. Once activated, DND stays on until you explicitly de-activate it by sending{" "}
          <InlineCode>STOP</InlineCode> to 1909 or toggling it off in your operator app.
        </BlogFaqItem>

        <BlogFaqItem q={"If I change operators (MNP), does DND carry over?"}>
          Your DND preference is tied to your phone <Strong>number</Strong>, not your operator. When
          you port, the new operator inherits the same DND setting within 48 hours.
        </BlogFaqItem>
      </BlogFaq>

      <Blockquote cite="TRAI consumer helpline, 2024">
        Every registered sender in India is legally required to scrub against NCPR before every
        send. If you&apos;re on DND and still receive promotional SMS, the sender is in violation,
        not you.
      </Blockquote>

      <Callout variant="tip" title="Running a business?">
        DND isn&apos;t a blocker — it&apos;s a filter. Transactional SMS (OTPs, receipts, alerts)
        still reaches every number, DND or not. Read our{" "}
        <A href="/blog/dnd-services/">DND services for senders</A> guide for the business side,
        or see how <A href="/products/otp-sms/">SMSLocal OTP SMS</A> automatically handles DND
        scrubbing for you.
      </Callout>
    </>
  )
}
