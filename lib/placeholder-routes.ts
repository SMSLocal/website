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
  // No unbuilt routes are linked from the site right now. Add an entry here only
  // when a page is linked before it exists.
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
