"use client"

import Link from "next/link"
import { useState } from "react"
import { BrandLogo } from "@/components/brand/brand-logo"
import {
  ArrowUpRight,
  BookOpen,
  Building2,
  ChevronDown,
  Code2,
  FileText,
  GraduationCap,
  HeadphonesIcon,
  HeartPulse,
  LifeBuoy,
  Menu,
  MessageCircle,
  MessageSquare,
  MessageSquareText,
  Package,
  PhoneCall,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Stethoscope,
  Store,
  Truck,
  Users,
  Wrench,
  X,
  Zap,
} from "lucide-react"

type NavLeaf = {
  label: string
  href: string
  icon?: React.ComponentType<{ className?: string }>
  description?: string
}

type NavItem =
  | { label: string; href: string }
  | { label: string; columns: { heading: string; items: NavLeaf[] }[]; footer?: { label: string; href: string } }

const NAV: NavItem[] = [
  {
    label: "Products",
    columns: [
      {
        heading: "Messaging channels",
        items: [
          { label: "Bulk SMS", href: "/products/bulk-sms", icon: MessageSquareText, description: "DLT-compliant SMS at scale" },
          { label: "RCS Business Messaging", href: "/products/rcs", icon: Sparkles, description: "Verified, branded rich cards — new" },
          { label: "WhatsApp Business API", href: "/products/whatsapp-business-api", icon: MessageCircle, description: "Native BSP with no monthly plan" },
          { label: "OTP & Transactional SMS", href: "/products/otp-sms", icon: ShieldCheck, description: "Priority routes, 24/7 delivery" },
          { label: "Quick SMS", href: "/products/quick-sms", icon: Zap, description: "DND-compliant promotional blasts" },
        ],
      },
      {
        heading: "Intelligence & scale",
        items: [
          { label: "AI Agents", href: "/products/ai-agents", icon: Sparkles, description: "Replies in 8 Indian languages" },
          { label: "Reseller / White-label", href: "/products/reseller", icon: Package, description: "Launch your own platform" },
        ],
      },
    ],
    footer: { label: "View all products", href: "/products" },
  },
  {
    label: "Solutions",
    columns: [
      {
        heading: "By industry",
        items: [
          { label: "E-commerce & D2C", href: "/solutions/ecommerce", icon: ShoppingBag },
          { label: "Banking & Fintech", href: "/solutions/banking-fintech", icon: Building2 },
          { label: "Healthcare", href: "/solutions/healthcare", icon: Stethoscope },
          { label: "Education & EdTech", href: "/solutions/education", icon: GraduationCap },
        ],
      },
      {
        heading: "More industries",
        items: [
          { label: "Logistics & Delivery", href: "/solutions/logistics", icon: Truck },
          { label: "Real Estate", href: "/solutions/real-estate", icon: Building2 },
          { label: "Retail & Hospitality", href: "/solutions/retail", icon: Store },
          { label: "Healthcare networks", href: "/solutions/healthcare", icon: HeartPulse },
        ],
      },
    ],
    footer: { label: "View all industries", href: "/solutions" },
  },
  { label: "Pricing", href: "/pricing" },
  {
    label: "Developers",
    columns: [
      {
        heading: "Build",
        items: [
          { label: "API docs", href: "/developers/api-docs", icon: Code2, description: "Full REST reference" },
          { label: "Quickstart", href: "/developers/quickstart", icon: Zap, description: "Send your first message in 5 min" },
          { label: "SMS API reference", href: "/developers/sms-api", icon: MessageSquare, description: "Send, status, webhooks — full spec" },
        ],
      },
    ],
    footer: { label: "Open developer hub", href: "/developers" },
  },
  {
    label: "Resources",
    columns: [
      {
        heading: "Learn",
        items: [
          { label: "Blog", href: "/blog", icon: FileText },
          { label: "DLT registration guide", href: "/resources/dlt-guide", icon: BookOpen },
          { label: "WhatsApp API guide", href: "/resources/whatsapp-api-guide", icon: BookOpen },
        ],
      },
      {
        heading: "Support",
        items: [
          { label: "Help centre", href: "/resources/help", icon: LifeBuoy },
          { label: "Glossary", href: "/resources/glossary", icon: BookOpen },
          { label: "Tools", href: "/resources/tools", icon: Wrench },
          { label: "Customer stories", href: "/resources/customer-stories", icon: Users },
        ],
      },
    ],
  },
]

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openMobileIndex, setOpenMobileIndex] = useState<number | null>(null)

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-xl">
      {/* Utility bar */}
      <div className="hidden border-b border-border text-[11px] text-muted-foreground md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-end gap-5 px-6 py-1.5">
          <Link href="/resources/help" className="inline-flex items-center gap-1.5 hover:text-foreground">
            <HeadphonesIcon className="h-3 w-3" />
            Support
          </Link>
          <span className="h-3 w-px bg-border" />
          <Link href="/company/contact" className="inline-flex items-center gap-1.5 hover:text-foreground">
            <PhoneCall className="h-3 w-3" />
            Talk to sales
          </Link>
          <span className="h-3 w-px bg-border" />
          <Link href="/signin" className="hover:text-foreground">
            Sign in
          </Link>
          <span className="h-3 w-px bg-border" />
          <span>India · ₹ INR</span>
        </div>
      </div>

      {/* Main nav */}
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3.5 sm:px-6">
        {/* Logo */}
        <BrandLogo tone="dark" size="lg" />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-0.5 lg:flex">
          {NAV.map((item) => {
            if ("href" in item) {
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="rounded-md px-3 py-1.5 text-[13.5px] font-medium text-foreground/70 transition hover:bg-secondary hover:text-foreground"
                >
                  {item.label}
                </Link>
              )
            }
            return (
              <div key={item.label} className="group relative">
                <button
                  type="button"
                  className="inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-[13.5px] font-medium text-foreground/70 transition hover:bg-secondary hover:text-foreground group-hover:bg-secondary group-hover:text-foreground"
                >
                  {item.label}
                  <ChevronDown className="h-3.5 w-3.5 opacity-60 transition-transform group-hover:rotate-180" />
                </button>
                {/* Dropdown */}
                <div className="pointer-events-none invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 opacity-0 transition-all duration-150 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100">
                  <div className="w-[680px] overflow-hidden rounded-2xl border border-border bg-popover shadow-2xl shadow-foreground/10">
                    <div className="grid grid-cols-2 gap-2 p-4">
                      {item.columns.map((col) => (
                        <div key={col.heading} className="p-1">
                          <p className="mb-1.5 flex items-center gap-1.5 px-2.5 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                            <span className="h-1 w-1 rounded-full bg-primary" />
                            {col.heading}
                          </p>
                          <ul className="flex flex-col gap-0.5">
                            {col.items.map((leaf) => {
                              const Icon = leaf.icon
                              return (
                                <li key={leaf.label}>
                                  <Link
                                    href={leaf.href}
                                    className="group/i flex items-center gap-3 rounded-xl px-2.5 py-2 transition hover:bg-secondary"
                                  >
                                    {Icon ? (
                                      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition group-hover/i:bg-primary group-hover/i:text-primary-foreground">
                                        <Icon className="h-4 w-4" />
                                      </span>
                                    ) : null}
                                    <span className="min-w-0 flex-1">
                                      <span className="block text-[13px] font-semibold text-foreground">{leaf.label}</span>
                                      {leaf.description ? (
                                        <span className="block truncate text-[11.5px] text-muted-foreground">{leaf.description}</span>
                                      ) : null}
                                    </span>
                                    <ArrowUpRight className="h-4 w-4 shrink-0 text-primary opacity-0 transition-all group-hover/i:translate-x-0.5 group-hover/i:opacity-100" />
                                  </Link>
                                </li>
                              )
                            })}
                          </ul>
                        </div>
                      ))}
                    </div>
                    {item.footer ? (
                      <Link
                        href={item.footer.href}
                        className="flex items-center justify-between gap-2 border-t border-border bg-secondary/50 px-5 py-3.5 text-[12.5px] font-semibold text-primary transition hover:bg-secondary"
                      >
                        {item.footer.label}
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    ) : null}
                  </div>
                </div>
              </div>
            )
          })}
        </nav>

        {/* CTA cluster */}
        <div className="flex items-center gap-2">
          <Link
            href="/signin"
            className="hidden rounded-md px-3 py-1.5 text-[13.5px] font-medium text-foreground/80 hover:text-foreground md:inline-flex"
          >
            Sign in
          </Link>
          <Link
            href="/signup"
            className="group relative inline-flex items-center gap-1.5 overflow-hidden rounded-md bg-primary px-3.5 py-2 text-[13px] font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:brightness-110"
          >
            <span className="relative z-10">Start Free — ₹60 Credit</span>
            <span
              aria-hidden
              className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full"
            />
          </Link>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-foreground/80 hover:bg-secondary lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="border-t border-border lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            {NAV.map((item, i) => {
              if ("href" in item) {
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="rounded-md px-3 py-2 text-sm text-foreground/80 hover:bg-secondary"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              }
              const isOpen = openMobileIndex === i
              return (
                <div key={item.label} className="rounded-md">
                  <button
                    type="button"
                    onClick={() => setOpenMobileIndex(isOpen ? null : i)}
                    className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm text-foreground/80 hover:bg-secondary"
                  >
                    {item.label}
                    <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen ? (
                    <div className="px-3 pb-2">
                      {item.columns.map((col) => (
                        <div key={col.heading} className="mt-2">
                          <p className="px-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                            {col.heading}
                          </p>
                          <ul className="mt-1 flex flex-col">
                            {col.items.map((leaf) => (
                              <li key={leaf.label}>
                                <Link
                                  href={leaf.href}
                                  onClick={() => setMobileOpen(false)}
                                  className="block rounded-md px-3 py-1.5 text-[13px] text-foreground/70 hover:bg-secondary hover:text-foreground"
                                >
                                  {leaf.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                      {item.footer ? (
                        <Link
                          href={item.footer.href}
                          onClick={() => setMobileOpen(false)}
                          className="mt-2 inline-flex px-3 py-1.5 text-[12.5px] font-medium text-primary"
                        >
                          {item.footer.label} →
                        </Link>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              )
            })}
            <Link
              href="/signin"
              className="rounded-md px-3 py-2 text-sm text-foreground/80 hover:bg-secondary"
              onClick={() => setMobileOpen(false)}
            >
              Sign in
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
