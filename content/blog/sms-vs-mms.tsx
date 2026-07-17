import {
  A,
  BlogFigure,
  Callout,
  FigureTable,
  H2,
  H3,
  LI,
  Lead,
  P,
  Strong,
  UL,
} from "@/components/blog/blog-prose"
import { BlogFaq, BlogFaqItem } from "@/components/blog/blog-faq"
import { BlogInlineCta } from "@/components/blog/blog-cta"

export default function SmsVsMmsPost() {
  return (
    <>
      <Lead>
        SMS and MMS are both built into every mobile phone, but in India the two channels have
        taken completely different paths. SMS is the backbone of OTPs, bank alerts, and business
        messaging — regulated, reliable, and used by every Indian business that sends a text. MMS
        technically works on every Indian carrier, but it never became a business channel here:
        WhatsApp replaced it for personal photo and video sharing, and RCS is now the multimedia
        successor for verified business messaging. This guide explains the technical differences,
        why MMS stalled in India, and which channel to use for each situation.
      </Lead>

      <Callout variant="info" title="The short answer for Indian businesses">
        Use <Strong>SMS</Strong> for OTPs, alerts, and transactional messages — it is DLT-regulated,
        universally supported, and reaches every mobile number. Use <Strong>WhatsApp Business API</Strong>{" "}
        for multimedia and conversational messages to smartphone users. MMS is technically available
        but is not used for business messaging in India and has no DLT compliance framework.
      </Callout>

      <H2 id="what-is-sms">What Is SMS?</H2>
      <P>
        SMS — Short Message Service — is the original <A href="/blog/what-is-sms/">text messaging standard</A> built into every
        mobile phone since 1992. An SMS message travels through the cellular signalling network,
        not the internet, which means it works on any phone (smartphone or feature phone) with any
        mobile connection, even with no data plan and on 2G networks.
      </P>
      <P>
        In India, SMS is the dominant channel for:
      </P>
      <UL>
        <LI>OTP and verification codes (UPI, banking, e-commerce, government portals)</LI>
        <LI>Transactional alerts (bank debits, order confirmations, delivery updates)</LI>
        <LI>Promotional campaigns (offers, announcements — sent only to opted-in or non-DND numbers)</LI>
        <LI>Service messages (appointment reminders, utility bills, insurance)</LI>
      </UL>
      <P>
        Every SMS sent for business in India must go through TRAI&apos;s Distributed Ledger
        Technology (DLT) system — a blockchain registry where senders register their entity,
        header (sender ID), and message content templates before sending. This gives Indian SMS
        infrastructure a level of spam protection and accountability that most countries lack.
      </P>

      <BlogFigure
        src="/blog/what-is-sms.webp"
        alt="Smartphone screen showing an SMS inbox with short text messages — OTP codes, bank alerts, and delivery notifications on an Indian mobile network."
        caption="SMS is text-only, works on every phone, and remains the backbone of OTPs and business alerts in India."
      />

      <H2 id="what-is-mms">What Is MMS?</H2>
      <P>
        MMS — Multimedia Messaging Service — is an extension of SMS that allows a message to
        include multimedia content: images (JPEG, PNG, GIF), audio, video, and longer text up to
        approximately 1,600 characters. An MMS is delivered through the same cellular network as
        SMS but requires the recipient&apos;s device to have an active data connection to download
        the media payload.
      </P>
      <P>
        MMS was standardised in 2002 as a richer successor to SMS. In the United States, MMS
        became a mainstream personal and business channel — carriers bundled unlimited MMS with
        phone plans, and businesses used it for image-based promotions. In India, this adoption
        never happened at scale.
      </P>

      <BlogFigure
        src="/blog/what-is-mms.webp"
        alt="Smartphone displaying an MMS message thread with an image attachment alongside text, illustrating how MMS extends SMS with multimedia content."
        caption="MMS extends SMS with images, audio, and video — but requires a data connection on both sides and never found a business use case in India."
      />

      <H2 id="key-differences">SMS vs MMS: Key Technical Differences</H2>
      <FigureTable
        columns={["Feature", "SMS", "MMS"]}
        rows={[
          ["Full name", "Short Message Service", "Multimedia Messaging Service"],
          ["Content type", "Text only", "Text + images, audio, video, contacts"],
          ["Character limit", "160 chars per segment (concatenated for longer messages)", "~1,600 characters + media"],
          ["Max file size", "N/A", "300 KB–600 KB (carrier-dependent)"],
          ["Internet required (sender)", "No — works on 2G cellular signal", "Yes — data connection required to send"],
          ["Internet required (recipient)", "No", "Yes — required to download media payload"],
          ["Works on feature phones", "Yes", "No"],
          ["Delivery speed", "Seconds (held by SMSC up to 72 hours if offline)", "Slower — media upload/download adds latency"],
          ["Cost (business)", "₹0.03–₹0.25 per message depending on route", "Not commercially available in India via DLT"],
          ["DLT regulation (India)", "Mandatory for business sends", "No DLT framework exists for MMS in India"],
          ["Business use in India", "Standard and required", "Essentially unused"],
        ]}
        caption="The technical differences are real, but the practical difference in India is simpler: SMS is the business channel, MMS is not."
      />

      <H2 id="why-mms-stalled-india">Why MMS Never Took Off in India</H2>
      <P>
        MMS is available on every Indian carrier — Jio, Airtel, Vi, and BSNL all technically
        support it. But it never became a meaningful channel, personal or business. There are
        four specific reasons:
      </P>

      <H3>1. Data plans were expensive when MMS launched</H3>
      <P>
        When MMS was introduced in India in the mid-2000s, mobile data was expensive and
        penetration was low. Sending a 100 KB image via MMS cost significantly more than a plain
        SMS, and many users&apos; plans did not include data at all. The habit of using MMS for
        photos never formed at scale.
      </P>

      <H3>2. WhatsApp arrived before MMS could establish itself</H3>
      <P>
        WhatsApp launched in India around 2010, just as smartphone prices were falling and data
        plans were becoming affordable. It offered free, unlimited{" "}
        <A href="/blog/bulk-whatsapp-messaging/">photo and video sharing</A> over
        Wi-Fi and mobile data — everything MMS could do, for free, without carrier per-message
        charges. By the time Jio made data nearly free in 2016, WhatsApp was already the de facto
        multimedia messaging platform for all Indian smartphone users.
      </P>
      <P>
        India and Brazil are the two largest markets globally where person-to-person multimedia
        messaging moved almost entirely to WhatsApp rather than MMS. In the US, MMS was already
        entrenched in unlimited carrier plans before WhatsApp arrived — that path dependency did
        not exist in India.
      </P>

      <H3>3. TRAI&apos;s DLT system covers SMS but not MMS</H3>
      <P>
        India&apos;s Telecom Regulatory Authority (TRAI) built the DLT framework to regulate
        commercial SMS — sender ID registration, content template pre-approval, and DND scrubbing.
        MMS is not covered by this framework. There is no approved route for a business to send a
        regulated, branded MMS in India the way there is for SMS. This regulatory gap means
        responsible businesses have no MMS infrastructure to use, even if they wanted to.
      </P>

      <H3>4. Feature phone penetration remained high</H3>
      <P>
        India still has a significant feature phone user base — estimates put it at 150–200 million
        active feature phone SIMs as of 2025. Feature phones do not support MMS. Any business
        channel that excludes this segment is fundamentally unsuitable for mass communication in India,
        which is why SMS (which works on every phone) remained the business standard.
      </P>

      <BlogFigure
        src="/blog/why-mms-never-took-off.webp"
        alt="Side-by-side view of a feature phone and a smartphone in India, illustrating why MMS never reached mass adoption — feature phones don't support it and WhatsApp arrived before MMS could establish itself."
        caption="Four factors killed MMS in India: expensive data when it launched, WhatsApp's rise, no TRAI DLT framework, and a large feature phone user base that MMS simply can't reach."
      />

      <Callout variant="info" title="MMS is not zero in India">
        Indian users do send personal MMS occasionally — a photo to a contact who is not on
        WhatsApp, or a group MMS between contacts on a feature phone. It works and is delivered.
        But it is not a meaningful business channel and is not how most Indians share media.
      </Callout>

      <H2 id="sms-vs-mms-personal">SMS vs MMS for Personal Use in India</H2>
      <P>
        For personal messaging between individuals in India, the practical choice in 2026 is not
        really SMS vs MMS — it is SMS vs WhatsApp:
      </P>
      <FigureTable
        columns={["Situation", "What most Indians use", "Why"]}
        rows={[
          ["Quick text to any number", "SMS", "Works on every phone, no data needed"],
          ["Sending a photo to a friend", "WhatsApp", "Free, instant, higher resolution than MMS"],
          ["Sending a video", "WhatsApp", "MMS has 300–600 KB limit; WhatsApp handles full videos"],
          ["Messaging someone without WhatsApp", "SMS for text, MMS for photos", "No choice — but MMS delivery depends on their data connection"],
          ["Group message to mixed smartphone/feature phone users", "SMS", "MMS excluded feature phone recipients"],
          ["Receiving an OTP or alert", "SMS (always)", "Banks and apps only send via SMS, never MMS"],
        ]}
        caption="For personal use, WhatsApp has largely replaced both MMS and casual SMS in India for smartphone-to-smartphone communication."
      />

      <BlogInlineCta
        title="Choosing a channel for business messaging?"
        body="SMS is the only DLT-regulated channel between the two, reaching every Indian number with delivery receipts. Set up compliant OTP and alert sending in minutes."
        primary={{ label: "Start free — ₹60 credit", href: "/signup/" }}
      />

      <H2 id="sms-vs-mms-business">SMS vs MMS for Business Use in India</H2>
      <P>
        For business messaging, the comparison is clearer: SMS is the only viable channel between
        the two for Indian businesses.
      </P>
      <UL>
        <LI>
          <Strong>SMS has a complete regulatory framework.</Strong> DLT registration, sender ID
          approval, template pre-approval, and DND scrubbing are all defined for SMS. Businesses
          that send SMS commercially must comply — and can comply — with this system.
        </LI>
        <LI>
          <Strong>MMS has no equivalent framework.</Strong> There is no DLT path for MMS, no
          approved sender ID system, and no aggregator infrastructure offering commercial MMS
          delivery in India at the standard business level.
        </LI>
        <LI>
          <Strong>SMS reaches every Indian number.</Strong> Feature phones, non-data SIMs, roaming
          users — SMS reaches them all. MMS requires a data connection on both sides.
        </LI>
        <LI>
          <Strong>SMS delivery is guaranteed and trackable.</Strong> DLT-registered messages on
          direct operator routes have delivery receipts. MMS delivery tracking is not standardised
          in India.
        </LI>
      </UL>

      <BlogFigure
        src="/blog/sms-vs-mms-business-use.webp"
        alt="Business dashboard showing SMS campaign delivery stats with DLT-registered sender IDs and high delivery rates across Indian carriers."
        caption="For Indian businesses, SMS is the only viable choice between the two — it has a complete DLT framework, reaches every phone, and offers trackable delivery receipts."
      />

      <Callout variant="tip" title="Need to send rich media to customers in India?">
        The right channel is <Strong>WhatsApp Business API</Strong> — it supports images, PDFs,
        buttons, and carousels, is widely used on Indian smartphones, and has an approved business
        messaging layer. For OTPs and alerts, <Strong>SMS</Strong> remains the standard. MMS is
        not a practical business option in India.
      </Callout>

      <H2 id="what-replaced-mms">What Replaced MMS in India</H2>
      <P>
        Two channels have effectively replaced MMS in India — one for personal use, one for
        business:
      </P>

      <H3>WhatsApp — personal multimedia messaging</H3>
      <P>
        With over 500 million monthly active users in India, WhatsApp is how Indian smartphone
        users share photos, videos, documents, and voice notes. It is free over Wi-Fi and data,
        supports files up to 2 GB (vs MMS&apos;s 300–600 KB limit), and works in groups without
        the per-person cost of individual MMS sends. For personal multimedia, WhatsApp made MMS
        unnecessary for the vast majority of Indian smartphone users.
      </P>

      <H3>RCS — business multimedia messaging</H3>
      <P>
        Rich Communication Services (RCS) is the carrier-level successor to SMS and{" "}
        <A href="https://en.wikipedia.org/wiki/Multimedia_Messaging_Service">MMS</A>.
        In 2026, all three major Indian carriers — Jio, Airtel, and Vi — have activated RCS
        on their networks. RCS supports images, carousels, quick-reply buttons, and verified
        business sender branding, all delivered via the cellular network with SMS as a fallback
        for non-RCS devices.
      </P>
      <P>
        RCS is what MMS should have been for business: a rich messaging channel with carrier
        infrastructure, without requiring recipients to install an app. Early Indian businesses
        deploying RCS Business Messaging are seeing higher engagement rates than plain SMS, with
        verified branding that prevents spoofing.
      </P>
      <FigureTable
        columns={["Channel", "Best for", "Media support", "Regulation", "India reach"]}
        rows={[
          ["SMS", "OTPs, alerts, business transactional", "Text only (160 chars)", "DLT mandatory", "Every phone, every network"],
          ["MMS", "Personal photo/video (rare)", "Images, video, audio", "None in India for business", "Smartphones with data only"],
          ["WhatsApp", "Personal multimedia, business conversational", "Images, video, docs, buttons", "Meta Business Policy", "500M+ smartphone users"],
          ["RCS", "Business rich messaging, verified brand messages", "Images, carousels, buttons", "Carrier-based, emerging", "450M+ RCS-ready Android devices"],
        ]}
        caption="In India, SMS and WhatsApp Business API cover the practical range of business messaging. MMS occupies neither end of that spectrum well."
      />

      <H2 id="when-to-use-which">When to Use SMS vs MMS vs WhatsApp</H2>
      <P>
        For anyone in India deciding which channel to use:
      </P>
      <FigureTable
        columns={["Use case", "Recommended channel", "Reason"]}
        rows={[
          ["OTP / verification code", "SMS", "Universal delivery, fastest route, works offline"],
          ["Bank alert / payment confirmation", "SMS", "Regulatory requirement; not sent via MMS or WhatsApp"],
          ["Order confirmation / delivery update", "SMS or WhatsApp", "SMS for guaranteed reach; WhatsApp for richer experience"],
          ["Promotional campaign to opted-in list", "SMS (DLT-approved) or WhatsApp Business API", "Both require opt-in; WhatsApp allows images/buttons"],
          ["Sending a photo to a friend", "WhatsApp", "Free, full resolution, instant"],
          ["Sending a photo to someone not on WhatsApp", "MMS (personal) or email", "MMS is the fallback for multimedia to non-WhatsApp numbers"],
          ["Sending a video to customers", "WhatsApp Business API or RCS", "MMS limit too small; SMS cannot carry media"],
          ["Reaching feature phone users", "SMS (only option)", "MMS and WhatsApp do not work on feature phones"],
        ]}
        caption="Choose SMS for reliability and reach; WhatsApp Business API for rich media to smartphone users; MMS only as a last resort for personal use."
      />

      <H2 id="sms-vs-mms-cost">SMS vs MMS Pricing in India</H2>
      <P>
        For personal use, both SMS and MMS are charged against your plan — most Jio, Airtel, and
        Vi plans include 100 free SMS per day, and MMS is charged at a per-message rate that varies
        by carrier (typically ₹1–3 per MMS on prepaid plans).
      </P>
      <P>
        For business use, only SMS pricing is meaningful, since MMS is not commercially available
        through DLT-registered routes:
      </P>
      <FigureTable
        columns={["Route type", "Approximate cost per SMS", "Use case"]}
        rows={[
          ["OTP / transactional (direct route)", "₹0.03–₹0.10", "Bank OTPs, app verifications, delivery alerts"],
          ["Transactional (standard route)", "₹0.10–₹0.18", "Service messages, reminders"],
          ["Promotional (opted-in list)", "₹0.08–₹0.25", "Offers, campaigns, newsletters"],
          ["International SMS", "₹1.50–₹5.00", "Sending to overseas numbers"],
        ]}
        caption="Business MMS pricing in India is not listed here because there is no commercial DLT-registered MMS route available from Indian aggregators."
      />

      <H2 id="faq">Frequently asked questions</H2>

      <BlogFaq>
        <BlogFaqItem q={"What is the difference between SMS and MMS in India?"}>
        SMS is a text-only message (up to 160 characters per segment) that works on every phone
        and network in India with no data connection required. MMS allows images, audio, and video
        to be sent alongside text (up to ~1,600 characters) but requires a data connection on both
        sides and only works on smartphones. In India, SMS is the dominant business messaging
        channel; MMS is rarely used because WhatsApp handles multimedia messaging for smartphone
        users, and no commercial DLT-compliant MMS infrastructure exists for businesses.
        </BlogFaqItem>

        <BlogFaqItem q={"Is MMS available on Jio in India?"}>
        Yes, Jio technically supports MMS for personal messaging between subscribers. However, it
        is not part of Jio&apos;s standard bundled quota (which covers 100 SMS/day), and each MMS
        is charged at a per-message rate. Jio does not offer commercial MMS services for business
        use — there is no DLT-registered business MMS route on Jio or any other Indian carrier.
        For rich media messaging, Jio has activated RCS, which is the recommended business-grade
        alternative.
        </BlogFaqItem>

        <BlogFaqItem q={"Why does MMS not work on my Indian phone?"}>
        If your MMS is not sending or receiving in India, the most common reasons are: your data
        connection is off (MMS requires active mobile data to download), your APN (Access Point
        Name) settings are not configured for MMS (older phones sometimes need this set manually),
        or the recipient&apos;s phone or plan does not support MMS. For specific APN settings,
        check your carrier&apos;s support page — Airtel, Jio, and Vi all publish the correct MMS
        APN values.
        </BlogFaqItem>

        <BlogFaqItem q={"Can businesses send MMS in India?"}>
        Technically yes, but practically no. There is no TRAI DLT registration framework for
        commercial MMS in India — you cannot register a sender ID or content template for MMS the
        way you can for SMS. Most Indian SMS aggregators do not offer bulk MMS as a product. For
        rich media, Indian businesses use WhatsApp Business API (for smartphone users) or SMS with
        a link to a landing page with images.
        </BlogFaqItem>

        <BlogFaqItem q={"Is MMS free in India like SMS?"}>
        No. Most Indian mobile plans include 100 free SMS per day, but MMS is not included in this
        bundled quota. MMS is charged separately — typically ₹1–3 per message on most prepaid
        plans. Check your specific carrier plan for the exact MMS rate.
        </BlogFaqItem>

        <BlogFaqItem q={"What is the character limit for SMS and MMS in India?"}>
        SMS is limited to 160 characters per segment when using the standard GSM-7 character set.
        If you use Unicode characters (Hindi, Tamil, or other Indian scripts), the limit drops to
        70 characters per segment. Longer messages are automatically split into multiple segments
        and delivered concatenated — so a 300-character message is sent as two segments and billed
        as two SMS. MMS has a text limit of approximately 1,600 characters alongside the media
        attachment, with a total message size limit of 300–600 KB depending on the carrier.
        </BlogFaqItem>

        <BlogFaqItem q={"Does MMS work on WhatsApp?"}>
        No. WhatsApp is a separate messaging system that operates over the internet — it is not
        connected to the cellular SMS or MMS infrastructure. WhatsApp messages (including photos
        and videos) go through Meta&apos;s servers, not through your carrier&apos;s MMS system.
        The two systems are completely independent. An MMS you send will arrive in the
        recipient&apos;s native messaging app (SMS inbox), not in WhatsApp.
        </BlogFaqItem>

        <BlogFaqItem q={"What replaced MMS in India?"}>
        For personal multimedia messaging, <Strong>WhatsApp</Strong> replaced MMS — it is free,
        unlimited, and handles full-resolution photos and videos. For business rich messaging,
        <Strong>RCS Business Messaging</Strong> is the emerging replacement — supported by Jio,
        Airtel, and Vi on 450M+ Android devices in India. For simple text-based business
        messaging, <Strong>SMS via DLT-registered routes</Strong> remains the dominant channel
        and has no replacement in sight for OTPs and transactional alerts.
        </BlogFaqItem>

        <BlogFaqItem q={"Which is better for OTPs — SMS or MMS?"}>
        SMS is the only correct choice for OTPs in India. OTP delivery requires near-instant
        delivery to every phone type (including feature phones) without a data connection. All
        banking and government systems in India send OTPs via SMS. MMS requires a data connection
        and only works on smartphones — it cannot be used for OTP delivery in a country where
        a significant portion of SIM cards belong to feature phone users.
        </BlogFaqItem>
      </BlogFaq>

      <Callout variant="tip" title="Ready to send SMS in India?">
        SMSLocal provides DLT-compliant SMS for OTPs, transactional alerts, and promotional
        campaigns — with delivery receipts, DND scrubbing, and direct operator routes. Start with
        <Strong> ₹60 free credit</Strong> and no credit card.{" "}
        <A href="/signup/">Create a free account</A>, or read our{" "}
        <A href="/blog/dlt-registration-guide/">DLT registration guide</A> to understand the
        compliance requirements before your first send.
      </Callout>
    </>
  )
}
