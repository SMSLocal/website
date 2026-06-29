import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ComingSoon } from "@/components/placeholder/coming-soon"
import { getPlaceholderForSlug, PLACEHOLDER_ROUTES } from "@/lib/placeholder-routes"
import { buildMetadata, getPageMetadata } from "@/lib/seo"

type PageParams = { slug: string[] }

export async function generateStaticParams() {
  return Object.keys(PLACEHOLDER_ROUTES).map((key) => ({
    slug: key.split("/"),
  }))
}

// ─── SEO — lib/seo/README.md ─────────────────────────────────────────────────
export async function generateMetadata({ params }: { params: Promise<PageParams> }): Promise<Metadata> {
  const { slug } = await params
  const route = getPlaceholderForSlug(slug)
  // Unknown URL → this renders the 404; emit the noindex "Page not found"
  // metadata so search engines never index a soft-404.
  if (!route) return getPageMetadata("/404")
  const path = "/" + slug.join("/")
  return buildMetadata({
    title: `${route.title} — Coming soon`,
    description: route.description,
    path,
    noindex: true,
  })
}

export default async function CatchAllPage({ params }: { params: Promise<PageParams> }) {
  const { slug } = await params
  const route = getPlaceholderForSlug(slug)
  if (!route) notFound()
  return <ComingSoon route={route} />
}
