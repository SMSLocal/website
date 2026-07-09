import type { Metadata } from "next"
import { buildMetadata } from "@/lib/seo"
import { ComingSoon } from "@/components/placeholder/coming-soon"
import { PLACEHOLDER_ROUTES } from "@/lib/placeholder-routes"

const ROUTE = PLACEHOLDER_ROUTES["resources/whatsapp-api-guide"]

export const metadata: Metadata = buildMetadata({
  title: ROUTE.title,
  description: ROUTE.description,
  path: "/resources/whatsapp-api-guide",
  noindex: true,
})

export default function Page() {
  return <ComingSoon route={ROUTE} />
}
