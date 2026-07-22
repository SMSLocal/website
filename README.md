# SMSLocal — smslocal.in

Marketing site for SMSLocal, an Indian SMS / WhatsApp / AI messaging platform.

**Live:** https://www.smslocal.in
**Deploys:** Vercel, automatically, on every push to `main`. There is no manual
deploy step — merging to `main` ships to production.

---

## Getting started

Requires **Node 24** and **pnpm 11**. Older versions will fail to install.

```bash
git clone https://github.com/SMSLocal/website.git
cd website
pnpm install
pnpm dev
```

The dev server starts on http://localhost:3000 (it picks the next free port if
3000 is taken).

| Command | What it does |
| --- | --- |
| `pnpm dev` | Dev server with Turbopack + Fast Refresh |
| `pnpm build` | Production build |
| `pnpm start` | Serve a production build locally |
| `pnpm lint` | ESLint |

> **`pnpm build` needs a lot of memory.** On an 8 GB machine it can die with
> "JavaScript heap out of memory". That is the machine, not the code — the
> compile itself completes before the crash. Verify against a Vercel preview
> deploy instead of fighting it locally.

---

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · Tailwind v4 · TypeScript ·
Radix UI · pnpm

---

## Layout

```
app/            Routes (App Router). Each folder is a URL segment.
  [...slug]/    Catch-all — serves "coming soon" placeholders, else 404s
  api/          Route handlers
  dev/          Internal tooling, not indexed
components/     UI, grouped by area: landing/ blog/ product/ seo/ consent/
content/blog/   Blog post bodies, one .tsx per post
lib/            Core logic
  seo/          SEO system — see below
  blog.ts       Blog registry
public/         Images and static assets
scripts/        Audit + sitemap utilities
next.config.mjs Security headers, CSP, redirects, rewrites
```

---

## The SEO system — read this before touching metadata

`lib/seo/registry.ts` is the **single source of truth**. One entry per path,
and it drives *both* the page's metadata *and* `sitemap.xml`. Two consequences
that bite people:

- A page **missing from the registry** falls back to homepage defaults — so it
  gets the **homepage's canonical URL**, which tells Google the page is a
  duplicate and quietly de-indexes it.
- A page missing from the registry is also **missing from the sitemap**.

So when you add a page, add its registry entry in the same commit:

```ts
// lib/seo/registry.ts
"/products/your-page": {
  title: "Your Page — Under 60 characters",
  description: "70–160 characters.",
  focusKeyword: "your keyword",
  keywords: [...],
},
```

Then in the page itself:

```tsx
import { getPageMetadata } from "@/lib/seo"
export const metadata: Metadata = getPageMetadata("/products/your-page")
```

Preview any page's resolved metadata at `/dev/seo` on the dev server.

---

## Adding a blog post

1. Create `content/blog/your-slug.tsx` — default-export the article body.
2. Register it in `lib/blog.ts`: import the component and add a `BlogMeta`
   entry.

`author` is **required** — use the shared `TEAM` constant. Omitting it builds
fine locally and then **fails the Vercel deploy** at static-generation time,
because `meta.author.name` throws. TypeScript would normally catch this, but
`next.config.mjs` sets `typescript: { ignoreBuildErrors: true }`, so it slips
through to the build. This has broken a deploy before.

House rules for posts, applied across all 18 existing ones:

- Exactly **3 outbound links**: 2 internal, then 1 external. Never two in the
  same section or paragraph, never in the intro or conclusion, and the external
  link must come after both internal ones.
- Every link must resolve — no 404s, 403s, or redirects.
- Use `<BlogFaq>` for FAQs (animated accordion + FAQPage JSON-LD).
- Use `<BlogCta>` for the mid-article call to action.

---

## Gotchas that cost real time

**Never add `loading.tsx` at the app root**, or above any route that can 404.
A loading file wraps its segment in Suspense, which makes Next.js *stream* the
response — and once the first bytes flush, the HTTP status is locked at 200.
That turned every missing URL on the site into a soft 404: the 404 page
rendered, but with `200 OK`, the homepage canonical, and `index, follow`.
Google read the entire space of bogus URLs as indexable homepage duplicates.
Removing the root `loading.tsx` is what fixed it. If you want loading UI, scope
it to a segment that never calls `notFound()`.

**A server component importing a value from a `"use client"` module** gets a
client-reference proxy, not the value. Symptom: `items.map is not a function`.
Put shared data in a plain module both sides can import — see
`components/product/ai-agentic-faq-data.ts`.

**`dynamicParams = false` + `generateStaticParams`** means an unlisted slug
404s. If a new blog post 404s in production, it is almost always missing from
`lib/blog.ts`.

**CSP blocks third-party scripts** unless allow-listed in `next.config.mjs`.
Analytics, chat widgets, and tag managers all need their domains added there or
they silently fail to load.

**Redirects belong in `next.config.mjs`, not in page components.** A page that
calls `permanentRedirect()` is statically prerendered into a 200 response with
a meta-refresh, which is not a real redirect. `redirects()` runs at the edge
and returns a true 308.

**`trailingSlash: true`.** URLs canonically end in `/`. When adding a redirect,
add both the slashed and unslashed source, as the existing entries do.

---

## Analytics and consent

GA4 (`G-PTER5SFMVM`) is **consent-gated** for DPDPA compliance — it only loads
after the user accepts analytics cookies, via `useHasConsent("analytics")` in
`components/consent/consented-google-analytics.tsx`. It is also production-only,
so it will not appear in dev. Do not "fix" this by loading it unconditionally.

---

## A note on traffic

Roughly 90% of this site's search traffic has historically come from a single
page, `/tools/sms-bomber/`, ranking for queries like "sms blaster" and "message
bombing". On **1 July 2026** Google demoted that page from about position 5 to
position 18, and site traffic fell by roughly 90% overnight.

This is a **content/ranking** matter, not a bug. It is not caused by anything in
this codebase and cannot be fixed here — not by rewriting the page, adding
keywords, or changing its URL, since a redirect carries the demotion with it.
Please do not spend engineering time hunting for a technical cause; there isn't
one. The durable answer is growing traffic to the real product pages (bulk SMS,
WhatsApp API, OTP), which currently account for under 2% of clicks.

Check Search Console → Security & Manual Actions for the current status.
