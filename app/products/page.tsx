import type { Metadata } from "next"
import { getPageMetadata } from "@/lib/seo"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, Bot, Boxes, MessageCircle, Send, ShieldCheck, Smartphone, Star } from "lucide-react"
import Image from "next/image"
import { AnnouncementStrip } from "@/components/landing/announcement-strip"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { FinalCta } from "@/components/landing/final-cta"
import { BreadcrumbJsonLd } from "@/components/seo/json-ld"

// ─── SEO — edit lib/seo/registry.ts or open /dev/seo to preview ──────────────
export const metadata: Metadata = getPageMetadata("/products")

type Product = { name: string; href: string; line: string; icon: React.ReactNode }

const MESSAGING: Product[] = [
  { name: "Bulk SMS", href: "/products/bulk-sms/", icon: <Send className="h-5 w-5" />, line: "DLT-compliant campaigns with direct operator routes and clear delivery reports." },
  { name: "WhatsApp Business API", href: "/products/whatsapp-business-api/", icon: <MessageCircle className="h-5 w-5" />, line: "Two-way conversations, templates and a shared inbox on the official API." },
  { name: "RCS Business Messaging", href: "/products/rcs/", icon: <Star className="h-5 w-5" />, line: "Verified, branded rich cards with automatic SMS fallback." },
  { name: "OTP SMS", href: "/products/otp-sms/", icon: <ShieldCheck className="h-5 w-5" />, line: "Priority routes for login and payment codes, with retries built in." },
  { name: "Quick SMS", href: "/products/quick-sms/", icon: <Smartphone className="h-5 w-5" />, line: "Upload a list, pick a template and send from the browser. No developer needed." },
]

const MORE: Product[] = [
  { name: "AI Agents", href: "/products/ai-agents/", icon: <Bot className="h-5 w-5" />, line: "Agents that answer in Indian languages and hand over to your team when needed." },
  { name: "Reseller and white-label", href: "/products/reseller/", icon: <Boxes className="h-5 w-5" />, line: "Run your own messaging platform under your brand, on our network." },
]

const BASICS = [
  { title: "DLT and TRAI ready", body: "Headers, templates and consent handled for every channel." },
  { title: "One API", body: "A single login, webhook format and invoice across all products." },
  { title: "One inbox", body: "Conversations, campaigns and delivery events in one place." },
  { title: "Support in India", body: "A team that knows operators, DLT and your customers." },
]

function Row({ p }: { p: Product }) {
  return (
    <li>
      <Link href={p.href} className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-x-4 gap-y-1 py-5 sm:grid-cols-[2.5rem_14rem_1fr_auto] sm:gap-x-6">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">{p.icon}</span>
        <span className="text-lg font-semibold tracking-tight text-foreground">{p.name}</span>
        <span className="col-start-2 text-[15px] leading-relaxed text-muted-foreground sm:col-start-auto">{p.line}</span>
        <ArrowUpRight className="row-start-1 col-start-3 h-5 w-5 text-muted-foreground transition group-hover:text-primary sm:row-start-auto sm:col-start-auto" aria-hidden />
      </Link>
    </li>
  )
}

export default function ProductsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <BreadcrumbJsonLd crumbs={[{ name: "Home", path: "/" }, { name: "Products", path: "/products" }]} />
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-border">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-20">
            <div>
              <p className="text-sm font-semibold text-primary">Products</p>
              <h1 className="mt-3 text-balance text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl">
                Reach your customers on the channel they actually use.
              </h1>
              <p className="mt-5 max-w-lg text-pretty text-lg leading-relaxed text-muted-foreground">
                SMS, WhatsApp, RCS, OTP and AI agents on one compliant platform. Start with one and add the rest later.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/signup/" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-[15px] font-semibold text-primary-foreground transition hover:brightness-110">
                  Start free trial <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/company/contact/" className="inline-flex items-center rounded-full border border-border px-6 py-3 text-[15px] font-semibold text-foreground transition hover:bg-muted">
                  Talk to sales
                </Link>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-muted">
              <Image src="/home/people-desk.webp" alt="A support executive at her desk, smiling at the camera" fill priority sizes="(min-width:1024px) 560px, 100vw" className="object-cover" />
            </div>
          </div>
        </section>

        {/* Products */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Messaging</h2>
            <ul className="mt-4 divide-y divide-border border-y border-border">
              {MESSAGING.map((p) => <Row key={p.name} p={p} />)}
            </ul>

            <h2 className="mt-14 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">AI and partners</h2>
            <ul className="mt-4 divide-y divide-border border-y border-border">
              {MORE.map((p) => <Row key={p.name} p={p} />)}
            </ul>
          </div>
        </section>

        {/* Shared basics */}
        <section className="border-t border-border bg-muted/40 py-16 lg:py-24">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-muted">
              <Image src="/home/people-friends.webp" alt="Two friends laughing at a message on a phone" fill sizes="(min-width:1024px) 500px, 100vw" className="object-cover" />
            </div>
            <div>
              <h2 className="text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Every product shares the same foundation</h2>
              <dl className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
                {BASICS.map((b) => (
                  <div key={b.title}>
                    <dt className="font-semibold text-foreground">{b.title}</dt>
                    <dd className="mt-1 text-[15px] leading-relaxed text-muted-foreground">{b.body}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  )
}
