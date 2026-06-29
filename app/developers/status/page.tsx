import type { Metadata } from "next"
import { buildMetadata } from "@/lib/seo"
import { ComingSoon } from "@/components/placeholder/coming-soon"
import { PLACEHOLDER_ROUTES } from "@/lib/placeholder-routes"

const ROUTE = PLACEHOLDER_ROUTES["developers/status"]

export const metadata: Metadata = buildMetadata({
  title: `${ROUTE.title} — Coming soon`,
  description: ROUTE.description,
  path: "/developers/status",
  noindex: true,
})

export default function Page() {
  return <ComingSoon route={ROUTE} />
}
