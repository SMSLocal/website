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
  // Build output dir. Defaults to `.next`; override with NEXT_DIST_DIR so a
  // production build can run alongside a dev server that already locks `.next`.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  // Canonical URLs end with a trailing slash (e.g. /products/bulk-sms/).
  // Next 308-redirects the non-slash form and emits slashed <Link> hrefs.
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
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
  async redirects() {
    return [
      // The free-SMS tool lives under /resources/tools; keep the short
      // top-level slug working for old links and indexed URLs.
      {
        source: "/free-sms-without-registration",
        destination: "/resources/tools/free-sms-without-registration/",
        permanent: true,
      },
      // The DLT guide content lives under the blog; keep the older resource
      // slug working so existing links and any indexed URLs still land.
      {
        source: "/resources/dlt-guide",
        destination: "/blog/dlt-registration-guide",
        permanent: true,
      },
      // The old voice-broadcasting slug is retired; the new Voice product
      // lives at /products/voice (no longer redirected).
      {
        source: "/products/voice-broadcasting",
        destination: "/products/voice",
        permanent: true,
      },
      // AI agents consolidated onto a single slug.
      {
        source: "/products/ai-whatsapp-agents",
        destination: "/products/ai-agents",
        permanent: true,
      },
      // The use-case agent pages live under /ai-agents/*; the bare path
      // sends visitors to the main Captain AI product page.
      {
        source: "/ai-agents",
        destination: "/products/ai-agents",
        permanent: false,
      },
      // OTP SMS product page retired — send old links to the SMS API docs.
      {
        source: "/products/otp-sms",
        destination: "/developers/sms-api/",
        permanent: true,
      },
      // Reseller / white-label page retired — send old links to the products hub.
      {
        source: "/products/reseller",
        destination: "/products",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
