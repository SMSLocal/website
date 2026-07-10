import type { Metadata } from "next"
import { buildMetadata } from "@/lib/seo"
import { ComingSoon } from "@/components/placeholder/coming-soon"

const ROUTE = {
  slug: "resources/whatsapp-api-guide",
  category: "Resource" as const,
  title: "WhatsApp Business API Guide",
  tagline: "Everything Indian businesses need to know about the WhatsApp Business API.",
  description:
    "A complete guide to the WhatsApp Business API for Indian businesses — setup, messaging tiers, template approval, opt-in rules, costs, and how to go live with a BSP.",
  expect: [
    "API setup and BSP selection guide",
    "Template approval and message categories",
    "Opt-in and consent requirements",
    "Pricing tiers and conversation billing",
    "Going live checklist",
  ],
  related: [
    { label: "WhatsApp Business API product", href: "/products/whatsapp-business-api/" },
    { label: "Blog", href: "/blog/" },
    { label: "Help centre", href: "/resources/help/" },
  ],
}

export const metadata: Metadata = buildMetadata({
  title: "WhatsApp Business API Guide for Indian Businesses",
  description: ROUTE.description,
  path: "/resources/whatsapp-api-guide",
})

export default function Page() {
  return <ComingSoon route={ROUTE} />
}
