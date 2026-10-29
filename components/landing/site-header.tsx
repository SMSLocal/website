"use client"

import Link from "next/link"
import { useState } from "react"
import { BrandLogo } from "@/components/brand/brand-logo"
import {
  Activity,
  ArrowUpRight,
  BarChart3,
  BookOpen,
  Bot,
  Building2,
  ChevronDown,
  FileText,
  GraduationCap,
  HeadphonesIcon,
  Home,
  Cloud,
  FileClock,
  Facebook,
  Globe,
  Inbox,
  Instagram,
  LifeBuoy,
  Mail,
  Menu,
  MessageCircle,
  MessageSquare,
  MessageSquareText,
  Mic,
  Package,
  PhoneCall,
  Plane,
  Puzzle,
  RadioTower,
  Send,
  Share2,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Stethoscope,
  Store,
  Truck,
  Tv,
  Umbrella,
  UtensilsCrossed,
  Users,
  Workflow,
  Wrench,
  X,
  Zap,
} from "lucide-react"

type NavLeaf = {
  label: string
  href: string
  icon?: React.ComponentType<{ className?: string }>
}

type Pillar = {
  id: string
  label: string
  sub: string
  icon: React.ComponentType<{ className?: string }>
  tagline: string
  items: NavLeaf[]
}

type NavItem =
  | { label: string; href: string }
  | {
      label: string
      columns: { heading: string; items: NavLeaf[] }[]
      footer?: { label: string; href: string }
    }
  | {
      label: string
      pillars: Pillar[]
      footer?: { label: string; href: string }
    }

const NAV: NavItem[] = [
  {
    label: "Products",
    columns: [
      {
        heading: "AI Agents & Platform",
        items: [
          { label: "Platform Overview", href: "/platform/", icon: Sparkles },
          { label: "Agentic AI", href: "/products/ai-agentic/", icon: Bot },
          { label: "AI Agents", href: "/products/ai-agents/", icon: Sparkles },
          { label: "Voice AI Agent", href: "/voice-ai-agents/", icon: Mic },
          { label: "Agent Copilot", href: "/products/agent-copilot/", icon: MessageSquare },
          { label: "Omnichannel Inbox", href: "/products/omnichannel-inbox/", icon: Inbox },
        ],
      },
    ],
    footer: { label: "View all products", href: "/products/" },
  },
  {
    label: "Channels",
    columns: [
      {
        heading: "Broadcasting",
        items: [
          { label: "SMS Broadcasting", href: "/channels/sms-broadcasting/", icon: Send },
          { label: "RCS Broadcasting", href: "/channels/rcs-broadcasting/", icon: Sparkles },
          { label: "WhatsApp Broadcasting", href: "/channels/whatsapp-broadcasting/", icon: MessageSquareText },
        ],
      },
      {
        heading: "Messaging channels",
        items: [
          { label: "WhatsApp", href: "/channels/whatsapp/", icon: MessageCircle },
          { label: "Instagram", href: "/channels/instagram/", icon: Instagram },
          { label: "Messenger", href: "/channels/messenger/", icon: Facebook },
          { label: "Web Chat", href: "/channels/web-chat/", icon: Globe },
          { label: "Voice", href: "/products/voice/", icon: PhoneCall },
        ],
      },
      {
        heading: "More channels",
        items: [
          { label: "Social", href: "/channels/social/", icon: Share2 },
          { label: "RCS Messaging", href: "/products/rcs/", icon: Sparkles },
          { label: "Virtual Numbers", href: "/numbers/did/", icon: Package },
          { label: "Integrations", href: "/products/integrations/", icon: Puzzle },
          { label: "Analytics", href: "/products/analytics/", icon: Activity },
        ],
      },
    ],
  },
  {
    label: "Solutions",
    columns: [
      {
        heading: "By industry",
        items: [
          { label: "E-commerce & D2C", href: "/solutions/ecommerce/", icon: ShoppingBag },
          { label: "Banking & Fintech", href: "/solutions/banking-fintech/", icon: Building2 },
          { label: "Healthcare", href: "/solutions/healthcare/", icon: Stethoscope },
          { label: "Education & EdTech", href: "/solutions/education/", icon: GraduationCap },
        ],
      },
      {
        heading: "More industries",
        items: [
          { label: "Logistics & Delivery", href: "/solutions/logistics/", icon: Truck },
          { label: "Real Estate", href: "/solutions/real-estate/", icon: Building2 },
          { label: "Retail & Hospitality", href: "/solutions/retail/", icon: Store },
        ],
      },
      {
        heading: "More sectors",
        items: [
          { label: "SaaS / B2B", href: "/solutions/saas-b2b/", icon: Cloud },
          { label: "Restaurant", href: "/solutions/restaurant/", icon: UtensilsCrossed },
        ],
      },
      {
        heading: "Specialized industries",
        items: [
          { label: "Travel & Hospitality", href: "/industry/travel-and-hospitality/", icon: Plane },
          { label: "Media & Entertainment", href: "/industry/media-entertainment/", icon: Tv },
          { label: "Insurance", href: "/industry/insurance/", icon: Umbrella },
          { label: "Mortgage", href: "/industry/mortgage/", icon: Home },
          { label: "Telecom", href: "/industry/telecom/", icon: RadioTower },
        ],
      },
    ],
    footer: { label: "View all industries", href: "/solutions/" },
  },
  {
    label: "Why SMSLocal",
    columns: [
      {
        heading: "Why SMSLocal",
        items: [
          { label: "Why SMSLocal", href: "/why-smslocal/", icon: Bot },
          { label: "Compare", href: "/compare/", icon: BarChart3 },
          { label: "Security", href: "/platform/security/", icon: ShieldCheck },
        ],
      },
      {
        heading: "Grow with us",
        items: [
          { label: "Partnerships", href: "/partnerships/", icon: Users },
          { label: "AI Consulting", href: "/services/ai-consulting/", icon: Wrench },
        ],
      },
    ],
    footer: { label: "See why teams switch", href: "/why-smslocal/" },
  },
  {
    label: "Resources",
    columns: [
      {
        heading: "Learn",
        items: [
          { label: "Blog", href: "/blog/", icon: FileText },
          { label: "DLT registration guide", href: "/blog/dlt-registration-guide/", icon: BookOpen },
          { label: "Bulk SMS guide", href: "/blog/bulk-sms/", icon: BookOpen },
          { label: "WhatsApp marketing guide", href: "/blog/whatsapp-marketing-india/", icon: BookOpen },
        ],
      },
      {
        heading: "Support",
        items: [
          { label: "Help centre", href: "/resources/help/", icon: LifeBuoy },
          { label: "Glossary", href: "/resources/glossary/", icon: BookOpen },
          { label: "Tools", href: "/resources/tools/", icon: Wrench },
          { label: "Customer stories", href: "/resources/customer-stories/", icon: Users },
        ],
      },
      {
        heading: "Stay updated",
        items: [
          { label: "Status", href: "/resources/status/", icon: Activity },
          { label: "Changelog", href: "/resources/changelog/", icon: FileClock },
        ],
      },
    ],
  },
]

/* A single leaf link shared by the pillar panel and the column dropdowns. */
function LeafLink({ leaf }: { leaf: NavLeaf }) {
  const Icon = leaf.icon
  return (
    <Link
      href={leaf.href}
      className="group/i flex items-center gap-3 rounded-xl px-3 py-2 transition-colors duration-200 hover:bg-primary/[0.06]"
    >
      {Icon ? (
        <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-secondary text-foreground/70 transition-all duration-200 group-hover/i:bg-primary group-hover/i:text-primary-foreground group-hover/i:shadow-md group-hover/i:shadow-primary/25">
          <Icon className="h-4 w-4" />
        </span>
      ) : null}
      <span className="min-w-0 flex-1">
        <span className="block whitespace-nowrap text-[13.5px] font-medium text-foreground">{leaf.label}</span>
      </span>
      <ArrowUpRight className="h-4 w-4 shrink-0 text-primary opacity-0 transition-all group-hover/i:translate-x-0.5 group-hover/i:opacity-100" />
    </Link>
  )
}

/* Products dropdown — pillar rail (left) + active panel + featured card. */
function PillarMegaItem({ item }: { item: Extract<NavItem, { pillars: Pillar[] }> }) {
  const [active, setActive] = useState(item.pillars[0].id)

  return (
    <div className="group">
      <button
        type="button"
        className="inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-[13.5px] font-medium text-foreground/70 transition hover:bg-secondary hover:text-foreground group-hover:bg-secondary group-hover:text-foreground"
      >
        {item.label}
        <ChevronDown className="h-3.5 w-3.5 opacity-60 transition-transform group-hover:rotate-180" />
      </button>
      <div className="pointer-events-none invisible absolute left-0 right-0 top-full z-50 -mt-3.5 translate-y-1 pt-[26px] opacity-0 transition-all duration-200 ease-out group-hover:pointer-events-auto group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 flex justify-center">
        <div className="overflow-hidden rounded-3xl border border-border/70 bg-popover/95 shadow-[0_28px_70px_-18px_rgba(15,23,42,0.28)] ring-1 ring-black/[0.03] backdrop-blur-xl">
          <div className="flex">
            {/* Pillar rail */}
            <div className="flex w-[236px] shrink-0 flex-col gap-1 border-r border-border bg-secondary/30 p-3">
              <p className="mb-1 flex items-center gap-1.5 px-2.5 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                <span className="h-1 w-1 shrink-0 rounded-full bg-primary" />
                Explore
              </p>
              {item.pillars.map((p) => {
                const PIcon = p.icon
                const on = p.id === active
                return (
                  <button
                    key={p.id}
                    type="button"
                    onMouseEnter={() => setActive(p.id)}
                    onFocus={() => setActive(p.id)}
                    className={`flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-left transition ${on ? "bg-popover shadow-sm ring-1 ring-border" : "hover:bg-secondary"}`}
                  >
                    <span
                      className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition ${on ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"}`}
                    >
                      <PIcon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[13px] font-semibold text-foreground">{p.label}</span>
                      <span className="block truncate text-[11px] text-muted-foreground">{p.sub}</span>
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Panels — all rendered for crawlability, inactive ones hidden */}
            <div className="w-[520px] p-4">
              {item.pillars.map((p) => (
                <div key={p.id} className={p.id === active ? "block" : "hidden"}>
                  <div className="mb-2 px-1">
                    <p className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-primary">{p.label}</p>
                    <p className="mt-0.5 text-[12px] text-muted-foreground">{p.tagline}</p>
                  </div>
                  <ul className="grid grid-cols-2 gap-0.5">
                    {p.items.map((leaf) => (
                      <li key={leaf.label}>
                        <LeafLink leaf={leaf} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

          </div>
          {item.footer ? (
            <Link
              href={item.footer.href}
              className="flex items-center justify-between gap-2 border-t border-border/70 bg-secondary/40 px-7 py-3.5 text-[13px] font-semibold text-primary transition hover:bg-secondary/70"
            >
              {item.footer.label}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openMobileIndex, setOpenMobileIndex] = useState<number | null>(null)

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-xl">
      {/* Utility bar */}
      <div className="hidden border-b border-border text-[11px] text-muted-foreground md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-end gap-5 px-6 py-1.5">
          <Link href="/resources/help/" className="inline-flex items-center gap-1.5 hover:text-foreground">
            <HeadphonesIcon className="h-3 w-3" />
            Support
          </Link>
          <span className="h-3 w-px bg-border" />
          <Link href="/company/contact/" className="inline-flex items-center gap-1.5 hover:text-foreground">
            <PhoneCall className="h-3 w-3" />
            Talk to sales
          </Link>
          <span className="h-3 w-px bg-border" />
          <Link href="/signin/" className="hover:text-foreground">
            Sign in
          </Link>
          <span className="h-3 w-px bg-border" />
          <span>India · ₹ INR</span>
        </div>
      </div>

      {/* Main nav */}
      <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3.5 sm:px-6">
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
            if ("pillars" in item) {
              return <PillarMegaItem key={item.label} item={item} />
            }
                      return (
              <div key={item.label} className="group">
                <button
                  type="button"
                  className="inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-[13.5px] font-medium text-foreground/70 transition hover:bg-secondary hover:text-foreground group-hover:bg-secondary group-hover:text-foreground"
                >
                  {item.label}
                  <ChevronDown className="h-3.5 w-3.5 opacity-60 transition-transform group-hover:rotate-180" />
                </button>
                {/* Dropdown */}
                <div className="pointer-events-none invisible absolute left-0 right-0 top-full z-50 -mt-3.5 translate-y-1 pt-[26px] opacity-0 transition-all duration-200 ease-out group-hover:pointer-events-auto group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 flex justify-center">
                  <div className="overflow-hidden rounded-3xl border border-border/70 bg-popover/95 shadow-[0_28px_70px_-18px_rgba(15,23,42,0.28)] ring-1 ring-black/[0.03] backdrop-blur-xl">
                    <div className="flex">
                    <div className="flex gap-2 p-4">
                      {item.columns.map((col) => (
                        <div key={col.heading} className={`p-1 ${item.columns.length > 2 ? "w-[228px]" : "w-[260px]"}`}>
                          <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/80 whitespace-nowrap">
                            {col.heading}
                          </p>
                          <ul className="flex flex-col gap-0">
                            {col.items.map((leaf) => (
                              <li key={leaf.label}>
                                <LeafLink leaf={leaf} />
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    </div>
                    {item.footer ? (
                      <Link
                        href={item.footer.href}
                        className="flex items-center justify-between gap-2 border-t border-border/70 bg-secondary/40 px-7 py-3.5 text-[13px] font-semibold text-primary transition hover:bg-secondary/70"
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
            href="/signin/"
            className="hidden rounded-md px-3 py-1.5 text-[13.5px] font-medium text-foreground/80 hover:text-foreground md:inline-flex"
          >
            Sign in
          </Link>
          <Link
            href="/signup/"
            className="group relative inline-flex items-center gap-1.5 overflow-hidden rounded-md bg-primary px-3.5 py-2 text-[13px] font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:brightness-110"
          >
            <span className="relative z-10">Start your trial</span>
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
        <div className="max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-border/70 bg-background/95 backdrop-blur-xl lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 pb-6 pt-2">
            {NAV.map((item, i) => {
              if ("href" in item) {
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center justify-between border-b border-border/60 py-4 text-[17px] font-semibold text-foreground"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                  </Link>
                )
              }
              const isOpen = openMobileIndex === i
              const groups =
                "pillars" in item
                  ? item.pillars.map((p) => ({ heading: p.label, items: p.items }))
                  : item.columns
              return (
                <div key={item.label} className="border-b border-border/60">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenMobileIndex(isOpen ? null : i)}
                    className="flex w-full items-center justify-between py-4 text-left text-[17px] font-semibold text-foreground"
                  >
                    {item.label}
                    <span className={`inline-flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 ${isOpen ? "rotate-180 bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>
                      <ChevronDown className="h-4 w-4" />
                    </span>
                  </button>
                  <div className={`grid transition-all duration-300 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                    <div className="overflow-hidden">
                      <div className="space-y-4 pb-5">
                        {groups.map((col) => (
                          <div key={col.heading}>
                            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/80">{col.heading}</p>
                            <ul className="grid grid-cols-2 gap-2">
                              {col.items.map((leaf) => {
                                const LIcon = leaf.icon
                                return (
                                  <li key={leaf.label}>
                                    <Link
                                      href={leaf.href}
                                      onClick={() => setMobileOpen(false)}
                                      className="flex h-full items-center gap-2.5 rounded-2xl border border-border/70 bg-card px-3 py-2.5 text-[13px] font-medium leading-tight text-foreground transition active:scale-[0.98] hover:border-primary/40 hover:bg-primary/[0.04]"
                                    >
                                      {LIcon ? (
                                        <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-secondary text-foreground/70">
                                          <LIcon className="h-4 w-4" />
                                        </span>
                                      ) : null}
                                      <span className="min-w-0">{leaf.label}</span>
                                    </Link>
                                  </li>
                                )
                              })}
                            </ul>
                          </div>
                        ))}
                        {item.footer ? (
                          <Link
                            href={item.footer.href}
                            onClick={() => setMobileOpen(false)}
                            className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-primary"
                          >
                            {item.footer.label} <ArrowUpRight className="h-4 w-4" />
                          </Link>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
            <div className="mt-5 grid grid-cols-2 gap-3">
              <Link
                href="/signin/"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center justify-center rounded-full border border-border bg-card py-3 text-[14.5px] font-semibold text-foreground"
              >
                Sign in
              </Link>
              <Link
                href="/company/contact/"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center justify-center rounded-full bg-primary py-3 text-[14.5px] font-semibold text-primary-foreground shadow-lg shadow-primary/25"
              >
                Talk to sales
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
