import type { Metadata } from "next"
import { getPageMetadata } from "@/lib/seo"
import Link from "next/link"
import { ArrowRight, BadgeCheck, GitBranch, Layers, MessageSquare, Sparkles } from "lucide-react"
import { RcsChatHero } from "@/components/product/rcs-chat-hero"
import { AnnouncementStrip } from "@/components/landing/announcement-strip"
import { SiteHeader } from "@/components/landing/site-header"
import { ExploreMore } from "@/components/product/explore-more"
import { SiteFooter } from "@/components/landing/site-footer"
import { FaqSection } from "@/components/landing/faq-section"
import { GsFinalCta } from "@/components/home/gs/sections-c"
import { RcsApi, RcsFormats, RcsGetStarted, RcsIndustries, RcsVersus, RcsWhatIs } from "@/components/product/rcs-page-sections"
import { BreadcrumbJsonLd, FaqJsonLd, ProductServiceJsonLd } from "@/components/seo/json-ld"

// ─── SEO — edit lib/seo/registry.ts or open /dev/seo to preview ──────────────
export const metadata: Metadata = getPageMetadata("/products/rcs")

const BTN = "group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-primary to-[oklch(0.55_0.13_172)] px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:shadow-xl hover:shadow-primary/30"
const BTN_OUT = "inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3.5 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"

const TRUST = [
  { icon: BadgeCheck, label: "Verified sender badge" },
  { icon: Layers, label: "Rich cards & carousels" },
  { icon: MessageSquare, label: "Automatic SMS fallback" },
  { icon: GitBranch, label: "One dashboard, one webhook" },
]

const FAQ = [
  {
    q: "What is RCS business messaging and how is it different from SMS?",
    a: "RCS (Rich Communication Services) business messaging sends branded, interactive messages to a phone number. Compared with SMS, it can show a verified business sender, photos, video, rich cards, carousels, suggested replies and action buttons. SMS is plain text, but it works on any mobile phone without mobile data.",
  },
  {
    q: "Does a customer need an app or internet to receive RCS?",
    a: "There is no extra app to install on a phone whose messaging app already supports RCS, but the phone needs mobile data or Wi-Fi and the carrier must support it. Phones that cannot receive RCS can get your approved SMS instead.",
  },
  {
    q: "What are the size limits of an RCS rich card?",
    a: "Google's RCS for Business guide allows up to 200 characters in a rich card title, 2,000 in the description and four suggested replies or actions on a card. A carousel holds up to ten cards, a chip list holds up to 11 suggestions, and each suggestion label can be up to 25 characters.",
  },
  {
    q: "Does RCS work on iPhone in India?",
    a: "Apple added RCS support in iOS 18. Whether an iPhone can receive RCS business messages depends on its iOS version and carrier, and this is still changing. When RCS is not available for a number, SMSLocal falls back to your DLT-approved SMS.",
  },
  {
    q: "What do I need to send branded RCS messages in India?",
    a: "A verified business identity, brand assets such as your name, logo, banner and colour, contact details, and a first use case. We set up your RCS sender, called an agent, and guide you through verification and approval. Have a DLT-approved SMS template ready for the fallback.",
  },
  {
    q: "Is DLT registration needed for RCS?",
    a: "DLT rules in India apply to SMS, so your SMS fallback needs a DLT-registered sender and an approved template. RCS has its own sender verification and approval under the carriers’ RCS business messaging programme.",
  },
  {
    q: "Do I need to rebuild my integration to use the RCS API?",
    a: "No. If you already send SMS with SMSLocal, you add the rich card and a fallback SMS template to your request. Authentication and the webhook format stay the same, and the webhook shows whether RCS or SMS was sent.",
  },
  {
    q: "RCS or WhatsApp: which should I use?",
    a: "Many businesses use both. RCS reaches customers in their phone's messaging app from a verified business sender. WhatsApp reaches customers who use WhatsApp and have opted in. Choose by where your customers are, and keep SMS for the numbers neither can reach.",
  },
]

const RELATED = [
  { href: "/channels/rcs-broadcasting/", label: "RCS broadcasting", hint: "Rich campaigns with SMS fallback" },
  { href: "/channels/whatsapp/", label: "WhatsApp Business API", hint: "Official API, templates and AI replies" },
  { href: "/products/analytics/", label: "Agentic AI analytics", hint: "CSAT, sentiment and campaign results" },
  { href: "/products/integrations/", label: "Integrations and API", hint: "Shopify, HubSpot, REST API and more" },
]

export default function RcsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <ProductServiceJsonLd
        name="RCS Business Messaging"
        description="Send branded, verified RCS Business Messages over Indian carrier networks with rich cards, carousels, suggested replies, and automatic DLT-compliant SMS fallback on the same API."
        path="/products/rcs"
        category="Rich business messaging"
      />
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
          { name: "RCS Business Messaging", path: "/products/rcs" },
        ]}
      />      <FaqJsonLd items={FAQ} path="/products/rcs" />
      <SiteHeader />
      <main className="flex-1">
        <section className="relative overflow-hidden bg-white">
          <div className="mx-auto grid max-w-7xl items-stretch gap-10 px-4 pb-14 pt-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_490px] lg:gap-10 lg:pb-12 lg:pt-10 xl:grid-cols-[minmax(0,1fr)_520px]">
            <div className="rcs-rise flex min-w-0 flex-col justify-center gap-7">
              <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-foreground px-3.5 py-1.5 text-[12.5px] font-medium text-background">
                <Sparkles className="h-3.5 w-3.5 text-accent" />RCS Business Messaging
              </p>
              <h1 className="mt-5 text-balance text-[28px] font-extrabold leading-[1.1] tracking-[-0.035em] sm:text-[34px] lg:text-[32px] xl:text-[36px]">
                RCS business messaging in India, <span className="text-primary">with SMS fallback built in.</span>
              </h1>
              <p className="mt-4 max-w-md text-pretty text-[15.5px] leading-relaxed text-muted-foreground">
                Send verified, branded rich cards with tappable buttons on Jio, Airtel and Vi. Phones that cannot show RCS get your approved SMS automatically, from the same dashboard and webhook.
              </p>
              </div>
              <div>
              <div className="flex flex-wrap items-center gap-3">
                <Link href="/signup/" className={BTN}>Join RCS early access <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" /></Link>
                <Link href="/company/contact/" className={BTN_OUT}>Talk to our team</Link>
              </div>
              <ul className="mt-6 grid max-w-lg grid-cols-1 gap-x-8 gap-y-2 text-[14px] text-muted-foreground sm:grid-cols-2">
                {TRUST.map((t) => (
                  <li key={t.label} className="flex items-start gap-2.5 leading-snug"><t.icon className="mt-[1px] h-4 w-4 shrink-0 text-primary" /><span>{t.label}</span></li>
                ))}
              </ul>
              </div>
            </div>
            <div className="rcs-rise flex min-w-0 items-center" style={{ animationDelay: "0.15s" }}>
              <div className="w-full">
              <RcsChatHero />
              </div>
            </div>
          </div>
          <style>{`
            @keyframes rcs-rise { from { opacity: 0; transform: translateY(26px) } to { opacity: 1; transform: none } }
            .rcs-rise { animation: rcs-rise .9s cubic-bezier(.2,.7,.2,1) both }
            @media (prefers-reduced-motion: reduce) { .rcs-rise { animation: none } }
          `}</style>
        </section>

        <RcsWhatIs />
        <RcsFormats />
        <RcsVersus />
        <RcsIndustries />
        <RcsGetStarted />
        <RcsApi />

        <FaqSection items={FAQ} />
        <ExploreMore links={RELATED} />
        <GsFinalCta />
      </main>
      <SiteFooter />
    </div>
  )
}
