import {
  A,
  BlogFigure,
  Callout,
  FigureTable,
  H2,
  LI,
  Lead,
  P,
  Strong,
  UL,
} from "@/components/blog/blog-prose"
import { BlogFaq } from "@/components/blog/blog-faq"

const FAQ_ITEMS = [
  {
    q: "What is RCS messaging?",
    a: (
      <>
        RCS (Rich Communication Services) is the carrier-backed successor to SMS. It carries
        images, carousels, tappable buttons and read receipts inside the phone&apos;s default
        messaging app, and shows a verified business name and logo instead of a six-character
        sender ID.
      </>
    ),
  },
  {
    q: "Does RCS work on every phone in India?",
    a: (
      <>
        No. RCS needs a supported messaging app and an active data connection. It is widespread on
        Android through Google Messages, and Apple added RCS support in iOS 18, but any recipient
        without both will not receive an RCS message at all.
      </>
    ),
  },
  {
    q: "Does RCS replace SMS?",
    a: (
      <>
        Not yet, and probably not soon. RCS needs data and a compatible app, while SMS reaches
        every handset on the network including feature phones. Most Indian senders run RCS as the
        preferred channel and fall back to SMS whenever it is unavailable.
      </>
    ),
  },
  {
    q: "Is RCS cheaper than SMS?",
    a: (
      <>
        Usually not. RCS is billed per conversation or per message depending on the operator and
        the message type, and richer formats cost more than a plain text SMS. The argument for RCS
        is engagement and trust, not unit price.
      </>
    ),
  },
  {
    q: "Do I still need DLT registration for RCS in India?",
    a: (
      <>
        Yes. RCS traffic to Indian numbers runs over the same operator relationships as SMS, so the
        usual entity, sender and template registration still applies. Budget for the same approval
        process before your first campaign.
      </>
    ),
  },
  {
    q: "Can customers reply to an RCS message?",
    a: (
      <>
        Yes, and that is a large part of the appeal. RCS is two-way by design, so a recipient can
        tap a suggested reply or type freely, and your platform receives the response as an inbound
        event rather than a dead end.
      </>
    ),
  },
]

export default function RcsMessagingIndiaPost() {
  return (
    <>
      <Lead>
        RCS turns a text message into something closer to an app screen: a verified business name,
        a logo, images, and buttons a customer can actually tap. Indian operators now carry it, and
        the obvious question is whether it deserves a place in your messaging mix or whether SMS
        still does the job. This guide covers what RCS is, where it works, what it costs you in
        setup, and when it genuinely beats a plain text.
      </Lead>

      <H2 id="what-is-rcs">What RCS actually is</H2>
      <P>
        RCS stands for Rich Communication Services. It is a carrier-supported messaging standard
        that runs inside the phone&apos;s default messaging app rather than a separate download, so
        a customer sees your message in the same thread as their bank alerts and delivery updates.
      </P>
      <UL>
        <LI>
          <Strong>Verified identity.</Strong> Your business name and logo appear instead of a
          six-character header, with a verification badge.
        </LI>
        <LI>
          <Strong>Rich content.</Strong> Images, carousels, and suggested replies, rather than 160
          characters of plain text.
        </LI>
        <LI>
          <Strong>Real delivery signals.</Strong> Sent, delivered and read states, instead of
          inferring engagement from click-throughs.
        </LI>
        <LI>
          <Strong>Two-way by default.</Strong> Replies come back as inbound events your platform
          can route to an agent or a bot.
        </LI>
      </UL>

      <H2 id="how-it-differs">How RCS differs from SMS underneath</H2>
      <P>
        The important difference is the transport. SMS travels the operator&apos;s signalling layer
        and needs no internet connection at all, which is exactly why it still reaches every
        handset on the network. RCS is an internet protocol with carrier involvement, so the
        recipient needs data and a compatible messaging app before anything can arrive.
      </P>
      <P>
        That single distinction drives most of the practical trade-offs below. If you want the
        mechanics of the older channel first, our{" "}
        <A href="/blog/what-is-sms/">explainer on how SMS works</A> covers the signalling path and
        why it is so resilient.
      </P>
      <BlogFigure
        src="/blog/how-sms-works-technically.webp"
        alt="Schematic of a message travelling from one handset through a network relay to another handset."
        caption="SMS needs no data connection, which is the advantage RCS cannot match and the reason a fallback path stays mandatory."
      />

      <H2 id="india-support">Where RCS actually works in India</H2>
      <P>
        Support is no longer theoretical. Google Messages ships as the default messaging app on
        most Android handsets sold in India, and Apple added RCS in iOS 18, which pulled a large
        share of the remaining market into range. What has not changed is that support is a
        property of the recipient, not of you.
      </P>
      <FigureTable
        columns={["Condition", "Message arrives as", "What you should assume"]}
        rows={[
          ["Android with Google Messages, data on", "Full RCS", "Rich formats render as designed"],
          ["iPhone on iOS 18 or later", "RCS", "Support varies by carrier rollout"],
          ["Older handset or no data", "Nothing — needs fallback", "SMS must catch it"],
          ["Feature phone", "Nothing — needs fallback", "SMS only, always"],
        ]}
        caption="Every RCS campaign is really two campaigns: the rich one, and the SMS that catches everyone it could not reach."
      />
      <P>
        Because of that last column, treat RCS as an upgrade layered on top of your existing SMS
        setup rather than a replacement for it. Our{" "}
        <A href="/products/rcs/">RCS messaging product</A> handles the fallback automatically, so a
        recipient who cannot receive the rich version still gets the message.
      </P>

      <H2 id="verified-sender">Verified sender, branding, and approval</H2>
      <P>
        The verified sender profile is the part customers actually notice. Instead of a cryptic
        header, they see your brand name, logo and a badge confirming the sender is who it claims
        to be — which matters in a market where SMS fraud has trained people to distrust unknown
        senders.
      </P>
      <P>
        Getting there takes an approval round. You submit brand assets, a description, sample
        messages and contact details, and the agent is reviewed before it can send. Google&apos;s{" "}
        <A href="https://developers.google.com/business-communications/rcs-business-messaging">
          RCS Business Messaging documentation
        </A>{" "}
        sets out the agent model, the verification steps and the message formats in full.
      </P>
      <BlogFigure
        src="/blog/business-sms-web-dashboard-no-phone.webp"
        alt="Web console listing message threads with status indicators beside each conversation."
        caption="Approved agents send from the same console as your SMS campaigns, with per-message delivery and read events flowing back."
      />
      <Callout variant="tip" title="Plan for two approvals, not one">
        Brand verification with the RCS provider is separate from Indian DLT registration. Both
        must be complete before a campaign goes out, and they run on independent timelines.
      </Callout>

      <H2 id="rcs-vs-whatsapp">RCS versus WhatsApp</H2>
      <P>
        In India this is the comparison that decides budgets, because WhatsApp already has the
        reach and the habit. The honest summary is that they are close cousins solving the same
        problem from opposite directions: WhatsApp is an app people chose to install, RCS is a
        capability their existing messaging app gained.
      </P>
      <FigureTable
        columns={["Question", "RCS", "WhatsApp Business API"]}
        rows={[
          ["Where it lands", "Default messaging app", "WhatsApp app"],
          ["Needs an install", "No", "Yes"],
          ["Opt-in model", "Operator and brand verification", "Explicit user opt-in"],
          ["Fallback to SMS", "Built in", "Not native"],
        ]}
      />
      <P>
        Neither is strictly better. RCS reaches people who never installed WhatsApp and inherits
        the credibility of the native inbox; WhatsApp has deeper session mechanics and near-total
        smartphone penetration in India.
      </P>
      <BlogFigure
        src="/blog/bulk-whatsapp-broadcast-metrics.webp"
        alt="Campaign dashboard charting delivery and read rates across a broadcast audience."
        caption="Both channels report read state, so compare them on real engagement rather than on delivered counts alone."
      />

      <H2 id="when-to-use">When RCS is worth it</H2>
      <P>
        RCS earns its place when the message benefits from being seen rather than merely delivered
        — and it is wasted on messages that are already fine as plain text.
      </P>
      <UL>
        <LI>
          <Strong>Worth it:</Strong> order tracking with a live map, appointment cards, product
          carousels, anything where a tappable action replaces a pasted link.
        </LI>
        <LI>
          <Strong>Not worth it:</Strong> OTPs. They are read in a notification shade in two
          seconds, and the rich format adds cost and a failure mode for no gain.
        </LI>
        <LI>
          <Strong>Test first:</Strong> promotional sends, where the branding lift is real but so is
          the per-message premium.
        </LI>
      </UL>
      <BlogFigure
        src="/blog/what-is-mms.webp"
        alt="Phone screen showing a picture message rendered inside a chat thread."
        caption="India skipped MMS almost entirely; RCS is the first rich format with a realistic path into the default inbox."
      />

      <H2 id="faq">Frequently asked questions</H2>
      <BlogFaq items={FAQ_ITEMS} />
    </>
  )
}
