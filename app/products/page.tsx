import type { Metadata } from "next"
import { getPageMetadata } from "@/lib/seo"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ArrowUpRight, Check } from "lucide-react"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/json-ld"
import { ProductsHeroPhone } from "@/components/product/products-hero-phone"

// ─── SEO — edit lib/seo/registry.ts or open /dev/seo to preview ──────────────
export const metadata: Metadata = getPageMetadata("/products")

const STEPS = [
  { title: "Sign up", body: "Create your account and add your business details." },
  { title: "Get approved", body: "We help you register your sender ID and message templates, so you stay compliant." },
  { title: "Start sending", body: "Launch from the dashboard or the API and track every delivery." },
]

const BASICS = [
  { title: "DLT and TRAI ready", body: "Headers, templates and consent are handled for you." },
  { title: "One API, one invoice", body: "A single login and webhook format across every product." },
  { title: "One shared inbox", body: "Replies, campaigns and delivery events in one place." },
  { title: "Support in India", body: "A team that knows operators and DLT." },
]

const FAQS = [
  { q: "Do I need DLT registration to send SMS in India?", a: "Yes. TRAI requires businesses to register their sender ID and message templates on a DLT platform before sending commercial SMS. We guide you through it and keep your approved headers and templates ready in the dashboard." },
  { q: "Can I use more than one channel on one account?", a: "Yes. SMS, WhatsApp, RCS, OTP and AI agents share one account, one API and one invoice, so you can add a channel whenever you need it." },
  { q: "Can I send messages without a developer?", a: "Yes. Quick SMS lets you upload a list, pick a template and send from your browser. If your team wants to integrate later, the API is there too." },
  { q: "What happens if a phone does not support RCS?", a: "RCS messages can fall back to SMS, so the customer still receives your message." },
  { q: "Can I resell SMSLocal under my own brand?", a: "Yes. With the reseller programme you use your own logo, domain and prices on our network." },
]

const arrow = "h-5 w-5 shrink-0"

export default function ProductsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <BreadcrumbJsonLd crumbs={[{ name: "Home", path: "/" }, { name: "Products", path: "/products" }]} />
      <SiteHeader />
      <main className="flex-1">
        {/* 1 · Hero: plain white, headline left, product-cycling phone right */}
        <section className="border-b border-border bg-white">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-16 pt-12 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:pb-20 lg:pt-16">
            <div>
              <h1 className="text-balance text-4xl font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl">
                Reach your customers on the channel they actually read.
              </h1>
              <p className="mt-5 max-w-lg text-pretty text-lg leading-relaxed text-slate-600">
                SMS, WhatsApp, RCS, OTP and AI agents on one DLT-compliant platform, built for Indian businesses.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <Link href="/signup/" className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-[15px] font-semibold text-primary-foreground transition hover:brightness-110">
                  Start free trial <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/company/contact/" className="text-[15px] font-semibold text-slate-900 underline decoration-slate-300 underline-offset-4 transition hover:decoration-slate-900">
                  Talk to sales
                </Link>
              </div>
            </div>

            <ProductsHeroPhone />
          </div>
        </section>

        {/* 2 · Channels: tiles, one with a photo */}
        <section className="bg-stone-50 py-16 lg:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="max-w-xl text-balance text-3xl font-bold tracking-tight text-slate-900 sm:text-[34px]">Choose your channel</h2>
            <p className="mt-3 max-w-xl text-[17px] leading-relaxed text-slate-600">Start with one. Add the others on the same account whenever you need them.</p>
            <div className="mt-8 grid gap-4 md:grid-cols-4 md:grid-rows-[14rem_14rem]">
              <Link href="/products/bulk-sms/" className="group relative min-h-[22rem] overflow-hidden rounded-2xl md:col-span-2 md:row-span-2 md:min-h-0">
                <Image src="/products/photo-texting.webp" alt="Hands typing a text message on a smartphone" fill sizes="(min-width:768px) 560px, 100vw" className="object-cover" style={{ objectPosition: "60% 55%" }} />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 text-white">
                  <div>
                    <h3 className="text-2xl font-semibold">Bulk SMS</h3>
                    <p className="mt-1 max-w-xs text-[15px] text-white/85">DLT-compliant campaigns to every phone, with clear delivery reports.</p>
                  </div>
                  <ArrowUpRight className={arrow} />
                </div>
              </Link>

              <Link href="/products/whatsapp-business-api/" className="group flex min-h-[14rem] flex-col justify-between rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-slate-900 transition hover:border-emerald-300 md:col-span-2 md:min-h-0">
                <div className="flex items-start justify-between gap-4">
                  <div aria-hidden className="hidden w-[55%] space-y-1.5 sm:block">
                    <div className="w-fit rounded-xl rounded-tl-sm bg-white px-3 py-1.5 text-[13px] shadow-sm">Is this still in stock?</div>
                    <div className="ml-auto w-fit rounded-xl rounded-tr-sm bg-[#d9fdd3] px-3 py-1.5 text-[13px] shadow-sm">Yes. Want the link to order?</div>
                  </div>
                  <ArrowUpRight className={`${arrow} ml-auto`} />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold">WhatsApp Business API</h3>
                  <p className="mt-1 max-w-sm text-[15px] text-slate-600">Chat, sell and support with approved templates and a shared inbox.</p>
                </div>
              </Link>

              <Link href="/products/rcs/" className="group flex min-h-[12rem] flex-col justify-between rounded-2xl border border-amber-200 bg-amber-50 p-6 text-slate-900 transition hover:border-amber-300 md:min-h-0">
                <ArrowUpRight className={`${arrow} self-end`} />
                <div>
                  <h3 className="text-xl font-semibold">RCS</h3>
                  <p className="mt-1 text-[14px] leading-snug text-slate-600">Rich cards with buttons, and SMS fallback.</p>
                </div>
              </Link>

              <Link href="/products/otp-sms/" className="group flex min-h-[12rem] flex-col justify-between rounded-2xl border border-sky-200 bg-sky-50 p-6 text-slate-900 transition hover:border-sky-300 md:min-h-0">
                <ArrowUpRight className={`${arrow} self-end`} />
                <div>
                  <h3 className="text-xl font-semibold">OTP SMS</h3>
                  <p className="mt-1 text-[14px] leading-snug text-slate-600">Priority routes so login codes arrive on time.</p>
                </div>
              </Link>
            </div>

            <Link href="/products/quick-sms/" className="group mt-4 flex items-center justify-between gap-4 rounded-2xl border border-border bg-white px-6 py-5 transition hover:border-slate-400">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Quick SMS</h3>
                <p className="text-[15px] text-slate-600">Upload a list, pick a template and send from your browser. No developer needed.</p>
              </div>
              <ArrowUpRight className={`${arrow} text-slate-500`} />
            </Link>
          </div>
        </section>

        {/* 3 · Getting started and what is included: numbered steps beside a bordered panel */}
        <section className="bg-white py-16 lg:py-24">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="text-balance text-3xl font-bold tracking-tight text-slate-900 sm:text-[34px]">Getting started</h2>
              <p className="mt-3 max-w-md text-[17px] leading-relaxed text-slate-600">From sign-up to your first delivered message.</p>
              <ol className="mt-8 divide-y divide-border border-y border-border">
                {STEPS.map((s, i) => (
                  <li key={s.title} className="flex gap-5 py-5">
                    <span className="w-6 shrink-0 pt-0.5 text-lg font-semibold text-primary">{i + 1}</span>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">{s.title}</h3>
                      <p className="mt-1 max-w-md text-[16px] leading-relaxed text-slate-600">{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="self-start rounded-2xl border border-slate-900 bg-stone-50 p-8 sm:p-10">
              <h3 className="text-2xl font-bold tracking-tight text-slate-900">Included with every product</h3>
              <dl className="mt-6 space-y-5">
                {BASICS.map((b) => (
                  <div key={b.title} className="flex gap-3">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-primary" strokeWidth={3} />
                    <div>
                      <dt className="font-semibold text-slate-900">{b.title}</dt>
                      <dd className="mt-0.5 text-[15px] leading-relaxed text-slate-600">{b.body}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* 4 · AI and partners: dark band, two panels */}
        <section className="bg-slate-900 py-16 text-white lg:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="max-w-xl text-balance text-3xl font-bold tracking-tight sm:text-[34px]">Automate replies, or resell under your own brand</h2>
            <div className="mt-8 grid gap-4 lg:grid-cols-2">
              <Link href="/products/ai-agents/" className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-8 transition hover:bg-white/[0.08]">
                <div className="space-y-2">
                  <div className="ml-auto w-[70%] rounded-xl rounded-br-sm bg-slate-600 px-4 py-2.5 text-[14px]">मेरा रिफंड कब मिलेगा?</div>
                  <div className="w-[75%] rounded-xl rounded-bl-sm bg-white px-4 py-2.5 text-[14px] text-slate-800">आपका रिफंड शुरू हो गया है।</div>
                </div>
                <div className="mt-10 flex items-end justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-semibold">AI Agents</h3>
                    <p className="mt-1 max-w-sm text-[15px] text-white/70">Answer customers in Indian languages, and hand over to your team when needed.</p>
                  </div>
                  <ArrowUpRight className={arrow} />
                </div>
              </Link>

              <Link href="/products/reseller/" className="group flex flex-col justify-between rounded-2xl bg-white p-8 text-slate-900 transition hover:bg-stone-100">
                <p className="text-[15px] text-slate-500">Your logo. Your domain. Your prices.</p>
                <div className="mt-10 flex items-end justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-semibold">Reseller and white-label</h3>
                    <p className="mt-1 max-w-sm text-[15px] text-slate-600">Launch your own messaging platform on our network and set your own margins.</p>
                  </div>
                  <ArrowUpRight className={arrow} />
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* 5 · Use cases: one large flowing statement, no cards or lists */}
        <section className="bg-white py-16 lg:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="text-balance text-3xl font-bold tracking-tight text-slate-900 sm:text-[34px]">Whatever you sell, there is a message for it</h2>
            <p className="mt-8 text-pretty text-2xl font-medium leading-snug text-slate-400 sm:text-[32px] sm:leading-[1.3]">
              <span className="text-slate-900">Order updates</span> for online stores. <span className="text-slate-900">Payment alerts</span> for banks and lenders. <span className="text-slate-900">Appointment reminders</span> for clinics. <span className="text-slate-900">Delivery status</span> for logistics. <span className="text-slate-900">Fee reminders</span> for schools. <span className="text-slate-900">Login codes</span> for every app.
            </p>
            <Link href="/solutions/" className="mt-8 inline-flex items-center gap-2 text-[15px] font-semibold text-slate-900 underline decoration-slate-300 underline-offset-4 transition hover:decoration-slate-900">
              See solutions by industry <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* 6 · FAQ: centred narrow column, native accordion */}
        <section className="bg-stone-50 py-16 lg:py-24">
          <FaqJsonLd items={FAQS} path="/products" />
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <h2 className="text-center text-balance text-3xl font-bold tracking-tight text-slate-900 sm:text-[34px]">Questions we hear often</h2>
            <div className="mt-10 divide-y divide-stone-200 border-y border-stone-200">
              {FAQS.map((f, i) => (
                <details key={f.q} className="group py-5" open={i === 0}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[17px] font-semibold text-slate-900 [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span aria-hidden className="text-2xl font-normal leading-none text-slate-400 group-open:hidden">+</span>
                    <span aria-hidden className="hidden text-2xl font-normal leading-none text-slate-400 group-open:inline">&minus;</span>
                  </summary>
                  <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-slate-600">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* 7 · Closing call to action: flat brand-colour band, text left, buttons right */}
        <section className="bg-primary text-primary-foreground">
          <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-14 sm:px-6 md:flex-row md:items-center md:justify-between lg:py-16">
            <div className="max-w-xl">
              <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">Not sure which channel to start with?</h2>
              <p className="mt-3 text-[17px] leading-relaxed text-primary-foreground/85">Start a free trial, or tell us what you want to send and we will suggest a setup.</p>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link href="/signup/" className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-[15px] font-semibold text-slate-900 transition hover:bg-stone-100">
                Start free trial <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/company/contact/" className="text-[15px] font-semibold underline decoration-white/50 underline-offset-4 transition hover:decoration-white">
                Talk to sales
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
