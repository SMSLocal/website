import type { Metadata } from "next"
import { AnnouncementStrip } from "@/components/landing/announcement-strip"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { IntegrationsStackPage } from "@/components/product/integrations-stack"
import { getPageMetadata } from "@/lib/seo"

// ─── SEO — edit lib/seo/registry.ts or open /dev/seo to preview ──────────────
export const metadata: Metadata = getPageMetadata("/products/integrations")

export default function IntegrationsPage() {
  return (
    <>
      <AnnouncementStrip />
      <SiteHeader />
      <main className="overflow-x-clip">
        <IntegrationsStackPage />
      </main>
      <SiteFooter />
    </>
  )
}