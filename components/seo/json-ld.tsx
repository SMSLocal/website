import { SITE, absoluteUrl } from "@/lib/seo/config"

const SITE_URL = SITE.url

type Crumb = { name: string; path: string }

// Server-rendered inline script — crawled immediately from HTML, no JS execution needed.
function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

/**
 * Organization + WebSite schemas. Mounted once at the root layout so every
 * page inherits it.
 */
export function OrganizationJsonLd() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE.name,
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
    description: SITE.description,
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
    },
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    sameAs: [
      "https://www.linkedin.com/company/smslocal",
      "https://twitter.com/smslocal",
      "https://www.facebook.com/smslocal",
      "https://www.youtube.com/@smslocal",
    ],
  }

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE.name,
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: SITE.htmlLang,
  }

  return (
    <>
      <JsonLd data={organization} />
      <JsonLd data={website} />
    </>
  )
}

/**
 * BreadcrumbList schema. Pass crumbs in order from root to the current page.
 */
export function BreadcrumbJsonLd({ crumbs }: { crumbs: Crumb[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${SITE_URL}${c.path}`,
    })),
  }
  return <JsonLd data={data} />
}

/**
 * Product / Service schema for each product page. Use Service (not Product)
 * since these are SaaS offerings, not physical goods.
 */
export function ProductServiceJsonLd({
  name,
  description,
  path,
  category,
}: {
  name: string
  description: string
  path: string
  category: string
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}${path}#service`,
    name,
    description,
    url: `${SITE_URL}${path}`,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "Country", name: "India" },
    category,
  }
  return <JsonLd data={data} />
}

/**
 * FAQ schema. Accepts an array of Q/A pairs and emits FAQPage.
 */
export function FaqJsonLd({ items, path }: { items: { q: string; a: string }[]; path: string }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  }
  return <JsonLd data={data} />
}

/**
 * Article / BlogPosting schema for editorial content.
 * Use this in blog posts, customer stories, and help articles.
 */
export function ArticleJsonLd({
  path,
  headline,
  description,
  image,
  datePublished,
  dateModified,
  authorName,
  type = "Article",
}: {
  path: string
  headline: string
  description: string
  image?: string
  datePublished: string
  dateModified?: string
  authorName?: string
  type?: "Article" | "BlogPosting" | "NewsArticle"
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${SITE_URL}${path}#article`,
    mainEntityOfPage: `${SITE_URL}${path}`,
    headline,
    description,
    image: image ? [absoluteUrl(image)] : [absoluteUrl(SITE.defaultOgImage)],
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: authorName
      ? { "@type": "Person", name: authorName }
      : { "@type": "Organization", name: SITE.name, "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: SITE.htmlLang,
  }
  return <JsonLd data={data} />
}

/**
 * HowTo schema. For step-by-step guides — send your first SMS, register DLT,
 * set up a WhatsApp template, etc.
 */
export function HowToJsonLd({
  path,
  name,
  description,
  steps,
  totalTime,
}: {
  path: string
  name: string
  description: string
  steps: { name: string; text: string }[]
  /** ISO 8601 duration, e.g. "PT10M" for 10 minutes. */
  totalTime?: string
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "@id": `${SITE_URL}${path}#howto`,
    name,
    description,
    ...(totalTime ? { totalTime } : {}),
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  }
  return <JsonLd data={data} />
}

/**
 * ItemList schema. For listing pages — blog index, compare matrix, glossary,
 * customer stories — so Google can understand the grid's members.
 */
export function ItemListJsonLd({
  path,
  name,
  items,
}: {
  path: string
  name: string
  items: { name: string; path: string }[]
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE_URL}${path}#itemlist`,
    name,
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      url: `${SITE_URL}${it.path}`,
    })),
  }
  return <JsonLd data={data} />
}
