export type PlaceholderCategory =
  | "Product"
  | "Solution"
  | "Developer"
  | "Resource"
  | "Company"
  | "Legal"
  | "Compare"

export type PlaceholderRoute = {
  slug: string
  category: PlaceholderCategory
  title: string
  tagline: string
  description: string
  expect: string[]
  related?: { label: string; href: string }[]
  eta?: string
}

const related = {
  product: [
    { label: "See all products", href: "/products/" },
    { label: "Pricing", href: "/pricing/" },
    { label: "Talk to sales", href: "/company/contact/" },
  ],
  developer: [
    { label: "API reference", href: "/developers/api-docs/" },
    { label: "Quickstart", href: "/developers/quickstart/" },
    { label: "Products overview", href: "/products/" },
  ],
  resource: [
    { label: "Blog", href: "/blog/" },
    { label: "Help centre", href: "/resources/help/" },
    { label: "Pricing", href: "/pricing/" },
  ],
  company: [
    { label: "About", href: "/company/about/" },
    { label: "Contact", href: "/company/contact/" },
    { label: "Products", href: "/products/" },
  ],
}

// Only routes that are linked to from the site but haven't been built yet.
// Shipped routes are removed — hard routes always win over the catch-all, but
// keeping stale entries here would be misleading and would still get them
// rendered as "coming soon" through the PLACEHOLDER_ROUTES sitemap loop.
export const PLACEHOLDER_ROUTES: Record<string, PlaceholderRoute> = {
  // ---------- Developers (secondary surfaces) ----------
  "developers/webhooks": {
    slug: "developers/webhooks",
    category: "Developer",
    title: "Webhooks",
    tagline: "Real-time events for delivery, opens and replies.",
    description:
      "Subscribe to signed webhooks for every status transition across SMS, WhatsApp, OTP and AI agents — with HMAC verification, retries and a replay console.",
    expect: [
      "Signed payloads with HMAC verification",
      "Retries with exponential backoff",
      "Replay console for debugging",
      "Event catalogue for each channel",
    ],
    related: related.developer,
  },
  "developers/status": {
    slug: "developers/status",
    category: "Developer",
    title: "Status",
    tagline: "Live uptime, incident history and operator health.",
    description:
      "Real-time status for every SMSLocal service, historical incident timeline, and per-operator delivery health across India — with email and webhook subscriptions.",
    expect: [
      "Per-service uptime with SLA tracking",
      "Historical incident timeline",
      "Operator-level delivery health",
      "Email and webhook subscriptions",
    ],
    related: related.developer,
  },
  // ---------- Resources ----------
  "resources/whatsapp-api-guide": {
    slug: "resources/whatsapp-api-guide",
    category: "Resource",
    title: "WhatsApp Business API guide",
    tagline: "From number migration to advanced flows.",
    description:
      "Green-tick verification, template management, conversation pricing, interactive messages and AI agent patterns — all a WhatsApp Business API team needs.",
    expect: [
      "Number migration and verification steps",
      "Template categories and approval playbook",
      "Conversation pricing explained",
      "Interactive, flow and catalogue patterns",
    ],
    related: related.resource,
  },
}

/**
 * Look up a placeholder route by its URL segments.
 *
 * The catch-all route (`app/[...slug]/page.tsx`) delivers the path as a
 * string array (e.g. `["products", "reseller"]`). This helper
 * joins the segments back into the key format used by PLACEHOLDER_ROUTES
 * and returns the matching route, or `undefined` if the path isn't a known
 * placeholder (which the caller should treat as a 404).
 */
export function getPlaceholderForSlug(
  slug: string[] | undefined,
): PlaceholderRoute | undefined {
  if (!slug || slug.length === 0) return undefined
  const key = slug.join("/")
  return PLACEHOLDER_ROUTES[key]
}
