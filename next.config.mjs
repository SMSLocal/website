/**
 * Site-wide security headers + redirects.
 *
 * Every response from every route gets the headers in `SECURITY_HEADERS`.
 * The Content-Security-Policy is tuned for this marketing site — no external
 * scripts other than Vercel Analytics/Speed Insights, no iframe embeds, no
 * user-uploaded content. Add a domain here when a new integration (Sentry,
 * Intercom, Turnstile, Stripe…) starts loading assets from its CDN.
 */

/**
 * Next.js dev mode (React Fast Refresh) compiles modules with eval(), so the
 * dev server needs 'unsafe-eval'. Production never uses eval — keep it out of
 * the shipped CSP so the header stays strict.
 */
const isDev = process.env.NODE_ENV !== "production"

/** Inline CSP sources kept in one place so we can iterate quickly. */
const CSP_DIRECTIVES = {
  "default-src": ["'self'"],
  "script-src": [
    "'self'",
    // JSON-LD <Script> blocks emit inline JSON bodies. Nonce-based CSP would
    // be tighter, but requires middleware — do that once Sentry or similar
    // third-party JS is actually in the tree.
    "'unsafe-inline'",
    // Dev-only: Fast Refresh / React error overlay rely on eval().
    ...(isDev ? ["'unsafe-eval'"] : []),
    "https://va.vercel-scripts.com",
    "https://vercel.live",
    // Google Analytics 4 (gtag.js) — loaded only after analytics consent.
    "https://www.googletagmanager.com",
  ],
  "style-src": [
    "'self'",
    // Next.js ships some inline styles for critical CSS; Tailwind sets inline
    // style attributes for dynamic values. Keep inline styles allowed.
    "'unsafe-inline'",
  ],
  "img-src": [
    "'self'",
    "data:",
    "blob:",
    "https:",
  ],
  "font-src": ["'self'", "data:"],
  "connect-src": [
    "'self'",
    "https://vitals.vercel-insights.com",
    "https://va.vercel-scripts.com",
    "https://vercel.live",
    "wss://ws-us3.pusher.com",
    // Google Analytics 4 collect endpoints (regional subdomains included).
    "https://www.googletagmanager.com",
    "https://www.google-analytics.com",
    "https://*.google-analytics.com",
    "https://analytics.google.com",
    "https://*.analytics.google.com",
  ],
  "frame-ancestors": ["'none'"],
  "form-action": ["'self'"],
  "base-uri": ["'self'"],
  "object-src": ["'none'"],
  "upgrade-insecure-requests": [],
}

const CSP = Object.entries(CSP_DIRECTIVES)
  .map(([k, v]) => (v.length ? `${k} ${v.join(" ")}` : k))
  .join("; ")

const SECURITY_HEADERS = [
  {
    key: "Content-Security-Policy",
    value: CSP,
  },
  {
    // Force HTTPS for two years, include subdomains, and qualify for
    // browser preload lists. Only takes effect when served over HTTPS.
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    // Defence in depth — frame-ancestors 'none' in the CSP is the real
    // protection, but X-Frame-Options still helps legacy clients.
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    // Lock down features the site never uses. Browsers ignore unknown
    // features, so this list is safe to grow.
    key: "Permissions-Policy",
    value: [
      "camera=()",
      "microphone=()",
      "geolocation=()",
      "payment=()",
      "usb=()",
      "magnetometer=()",
      "gyroscope=()",
      "accelerometer=()",
      "interest-cohort=()",
      "browsing-topics=()",
    ].join(", "),
  },
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Cross-Origin-Opener-Policy",
    value: "same-origin",
  },
  {
    // 0 disables the deprecated XSS auditor — modern CSP is the correct tool.
    // Security scanners still expect the header to be present.
    key: "X-XSS-Protection",
    value: "0",
  },
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // SVG images need this flag; non-SVG files (PNG/JPG/WebP) are still
    // compressed and served as WebP with responsive srcsets.
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'none'; script-src 'none'; sandbox;",
  },
  async headers() {
    return [
      {
        // Apply the security baseline to every non-asset route. Static
        // assets under /_next/static/ and /public/ are already cached
        // immutably and don't need most of these headers, but applying
        // them everywhere is simpler and has no downside for this site.
        source: "/:path*",
        headers: SECURITY_HEADERS,
      },
    ]
  },
  async rewrites() {
    return [
      // Work around Next.js 16 + trailingSlash:true conflict where [..slug]
      // catch-all intercepts /sitemap.xml before the metadata route can serve it.
      // The API route at /api/sitemap calls the same sitemap() function.
      { source: "/sitemap.xml", destination: "/sitemap-xml" },
      // IndexNow key file for Ahrefs Site Audit — catch-all route would
      // intercept /v8rcpyc9cjm9zewm2hm9gctu3uakcmb7.txt without this rewrite.
      {
        source: "/v8rcpyc9cjm9zewm2hm9gctu3uakcmb7.txt",
        destination: "/api/indexnow-key",
      },
    ]
  },
  async redirects() {
    return [
      // Old pricing slug — redirect to the canonical /pricing/ page.
      {
        source: "/pricing-plans",
        destination: "/pricing/",
        permanent: true,
      },
      {
        source: "/pricing-plans/",
        destination: "/pricing/",
        permanent: true,
      },
      // The DLT guide content lives under the blog; keep the older resource
      // slug working so existing links and any indexed URLs still land.
      {
        source: "/resources/dlt-guide",
        destination: "/blog/dlt-registration-guide/",
        permanent: true,
      },
      // The old voice-broadcasting slug is retired; the new Voice product
      // lives at /products/voice (no longer redirected).
      {
        source: "/products/voice-broadcasting",
        destination: "/products/voice/",
        permanent: true,
      },
      // AI agents consolidated onto a single slug.
      {
        source: "/products/ai-whatsapp-agents",
        destination: "/products/ai-agents/",
        permanent: true,
      },
      // Renamed from the old FloatChat-branded slug.
      {
        source: "/why-floatchat",
        destination: "/why-smslocal/",
        permanent: true,
      },
      // The use-case agent pages live under /ai-agents/*; the bare path
      // sends visitors to the main Captain AI product page.
      {
        source: "/ai-agents",
        destination: "/products/ai-agents/",
        permanent: true,
      },


      // The /test-home design was promoted to the real homepage. This used to
      // be a page calling permanentRedirect(), but as a statically generated
      // route that emitted HTTP 200 + a meta-refresh instead of a real
      // redirect. Handling it here returns a true 308.
      {
        source: "/test-home",
        destination: "/",
        permanent: true,
      },
      {
        source: "/test-home/",
        destination: "/",
        permanent: true,
      },
      // SMS Bomber tool moved to the /resources/tools/ section.
      {
        source: "/tools/sms-bomber",
        destination: "/resources/tools/sms-bomber/",
        permanent: true,
      },
      // Free SMS tool lives under /resources/tools/ — the bare root-level
      // slug (indexed/linked externally) was 200-ing to a soft-404 instead.
      {
        source: "/free-sms-without-registration",
        destination: "/resources/tools/free-sms-without-registration/",
        permanent: true,
      },
      {
        source: "/free-sms-without-registration/",
        destination: "/resources/tools/free-sms-without-registration/",
        permanent: true,
      },
      // Legacy blog post /blog/send-free-sms-online/ was merged into
      // /blog/send-sms-online/. Both slash forms so the indexed trailing-slash
      // URL redirects in a single hop.
      {
        source: "/blog/send-free-sms-online",
        destination: "/blog/send-sms-online/",
        permanent: true,
      },
      {
        source: "/blog/send-free-sms-online/",
        destination: "/blog/send-sms-online/",
        permanent: true,
      },
      // Legacy WordPress post /blog/sms-forwardings/ (now 404) merged into the
      // live /blog/receive-sms-messages-on-your-computer/ post. Both slash forms
      // so the indexed trailing-slash URL redirects in a single hop.
      {
        source: "/blog/sms-forwardings",
        destination: "/blog/receive-sms-messages-on-your-computer/",
        permanent: true,
      },
      {
        source: "/blog/sms-forwardings/",
        destination: "/blog/receive-sms-messages-on-your-computer/",
        permanent: true,
      },
      // Legacy commercial URL /bulk-sms/ (now 404) → the live product page.
      {
        source: "/bulk-sms",
        destination: "/products/bulk-sms/",
        permanent: true,
      },
      {
        source: "/bulk-sms/",
        destination: "/products/bulk-sms/",
        permanent: true,
      },
      // Legacy blog /blog/temp-sms/ (now 404) → the live receive-SMS-online post.
      {
        source: "/blog/temp-sms",
        destination: "/blog/receive-sms-online-india/",
        permanent: true,
      },
      {
        source: "/blog/temp-sms/",
        destination: "/blog/receive-sms-online-india/",
        permanent: true,
      },
      // Legacy blog /blog/sms-vs-text/ (now 404) → the live what-is-SMS guide.
      {
        source: "/blog/sms-vs-text",
        destination: "/blog/what-is-sms/",
        permanent: true,
      },
      {
        source: "/blog/sms-vs-text/",
        destination: "/blog/what-is-sms/",
        permanent: true,
      },
      // /help/ has no page — redirect to the real help centre.
      // Both with and without trailing slash — trailingSlash:true means the
      // browser may hit /help/ directly, which wouldn't match source:"/help".
      {
        source: "/help",
        destination: "/resources/help/",
        permanent: true,
      },
      {
        source: "/help/",
        destination: "/resources/help/",
        permanent: true,
      },
      // /help/:path* — old URLs Google indexed for individual help articles.
      {
        source: "/help/:path*",
        destination: "/resources/help/:path*",
        permanent: true,
      },
      // DLT compliance content lives in the blog.
      {
        source: "/resources/dlt-compliance",
        destination: "/blog/dlt-registration-guide/",
        permanent: true,
      },
      {
        source: "/resources/dlt-compliance/",
        destination: "/blog/dlt-registration-guide/",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
