import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Suspense } from "react"
import { CookieConsentProvider } from "@/components/consent/cookie-consent"
import { ConsentedAnalytics } from "@/components/consent/consented-analytics"
import { AnalyticsTracker } from "@/components/analytics/tracker"
import { OrganizationJsonLd } from "@/components/seo/json-ld"
import { SiteIndexingMeta } from "@/components/seo/site-indexing-meta"
import { SITE } from "@/lib/seo/config"
import { buildMetadata } from "@/lib/seo/metadata"
import "./globals.css"

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
})
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

// Root-level defaults. Page-level `export const metadata` (or
// `generateMetadata`) will deep-merge with this object. New pages should use
// `buildMetadata(...)` from `@/lib/seo` which inherits every default below.
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  applicationName: SITE.name,
  generator: "v0.app",
  authors: [{ name: SITE.name }],
  title: {
    default: SITE.defaultTitle,
    template: SITE.titleTemplate,
  },
  ...buildMetadata({
    titleAbsolute: SITE.defaultTitle,
    description: SITE.description,
    path: "/",
  }),
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: SITE.themeColor.light },
    { media: "(prefers-color-scheme: dark)", color: SITE.themeColor.dark },
  ],
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang={SITE.htmlLang} className={`${geistSans.variable} ${geistMono.variable} bg-background`}>
      <body className="font-sans antialiased">
        {/* Emits a site-wide <meta name="robots"> when the SEO admin's
            "Allow indexing" toggle is OFF. Also injects Google / Bing
            Webmaster verification tags. Hoisted into <head> automatically. */}
        <Suspense fallback={null}>
          <SiteIndexingMeta />
        </Suspense>
        <OrganizationJsonLd />
        <CookieConsentProvider>
          {children}
          {/* Suspense wraps the tracker because useSearchParams() suspends
              on static pages until the client mounts. */}
          <Suspense fallback={null}>
            <AnalyticsTracker />
          </Suspense>
          {process.env.NODE_ENV === "production" && <ConsentedAnalytics />}
        </CookieConsentProvider>
      </body>
    </html>
  )
}
