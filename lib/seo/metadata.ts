import type { Metadata } from "next"
import { SITE, absoluteUrl, withTrailingSlash } from "./config"

/**
 * Input accepted by `buildMetadata`. All fields except `path` are optional;
 * anything you omit falls back to sensible site-wide defaults from
 * `lib/seo/config.ts`.
 */
export type PageSeo = {
  /** Page-specific title. The site name is appended via the title template. */
  title?: string
  /** Full override that disables the "| SMSLocal" template. Use sparingly. */
  titleAbsolute?: string
  /** 150-160 character description. Falls back to SITE.description. */
  description?: string
  /** Site-relative path, e.g. "/products/bulk-sms". Used for canonical + OG URL. */
  path: string
  /** Extra keywords merged with SITE.defaultKeywords (deduped). */
  keywords?: string[]
  /** 1200x630 image path. Site-relative or absolute. Falls back to default OG. */
  ogImage?: string
  ogImageAlt?: string
  /** Override the OG type. Defaults to "website". */
  ogType?: "website" | "article" | "profile" | "book"
  /** Set true to emit noindex, nofollow. */
  noindex?: boolean
  /** ISO string; only respected when ogType === "article". */
  publishedTime?: string
  modifiedTime?: string
  /** Author names used in article metadata. */
  authors?: string[]
  /** Alternate language URLs. */
  languages?: Record<string, string>
}

/**
 * Build a fully-populated Next.js `Metadata` object for any page.
 *
 * Usage:
 *
 *   export const metadata = buildMetadata({
 *     title: "Bulk SMS for India",
 *     description: "DLT-compliant bulk SMS API and dashboard.",
 *     path: "/products/bulk-sms",
 *     keywords: ["bulk sms api india"],
 *   })
 */
export function buildMetadata(input: PageSeo): Metadata {
  const {
    title,
    titleAbsolute,
    description = SITE.description,
    path,
    keywords = [],
    ogImage = SITE.defaultOgImage,
    ogImageAlt = SITE.defaultOgImageAlt,
    ogType = "website",
    noindex = false,
    publishedTime,
    modifiedTime,
    authors,
    languages,
  } = input

  const canonical = withTrailingSlash(path || "/")
  const absoluteImage = absoluteUrl(ogImage)
  const resolvedTitle = titleAbsolute ?? title ?? SITE.defaultTitle
  const finalTitle: Metadata["title"] = titleAbsolute
    ? { absolute: titleAbsolute }
    : (title ?? { absolute: SITE.defaultTitle })

  const mergedKeywords = Array.from(
    new Set([...SITE.defaultKeywords, ...keywords]),
  )

  const meta: Metadata = {
    title: finalTitle,
    description,
    keywords: mergedKeywords,
    alternates: {
      canonical,
      ...(languages ? { languages } : {}),
    },
    openGraph: {
      title: resolvedTitle,
      description,
      url: canonical,
      siteName: SITE.name,
      locale: SITE.locale,
      type: ogType,
      images: [
        {
          url: absoluteImage,
          width: 1200,
          height: 630,
          alt: ogImageAlt,
        },
      ],
      ...(ogType === "article" && publishedTime ? { publishedTime } : {}),
      ...(ogType === "article" && modifiedTime ? { modifiedTime } : {}),
      ...(ogType === "article" && authors ? { authors } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description,
      images: [absoluteImage],
      ...(SITE.twitterHandle ? { site: SITE.twitterHandle, creator: SITE.twitterHandle } : {}),
    },
    robots: noindex
      ? { index: false, follow: false, googleBot: { index: false, follow: false } }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  }

  return meta
}

/**
 * Shorthand for article / blog / help-article pages. Sets ogType="article"
 * and forwards publish/modified dates + authors.
 */
export function buildArticleMetadata(
  input: Omit<PageSeo, "ogType"> & {
    publishedTime: string
    modifiedTime?: string
    authors?: string[]
  },
): Metadata {
  return buildMetadata({ ...input, ogType: "article" })
}
