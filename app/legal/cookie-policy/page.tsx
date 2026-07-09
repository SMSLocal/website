import type { Metadata } from "next"
import { LegalDoc, LegalSection } from "@/components/legal/legal-doc"
import { getPageMetadata } from "@/lib/seo"

// ─── SEO — edit lib/seo/registry.ts or open /dev/seo to preview ──────────────
export const metadata: Metadata = getPageMetadata("/legal/cookie-policy")

const TOC = [
  { id: "overview", label: "1. Overview" },
  { id: "what", label: "2. What cookies are" },
  { id: "categories", label: "3. Categories we use" },
  { id: "list", label: "4. Specific cookies" },
  { id: "third-party", label: "5. Third-party cookies" },
  { id: "control", label: "6. How to control cookies" },
  { id: "signals", label: "7. Global Privacy signals" },
  { id: "changes", label: "8. Changes to this policy" },
  { id: "contact", label: "9. Contact" },
]

function CookieRow({
  name,
  purpose,
  duration,
  type,
}: {
  name: string
  purpose: string
  duration: string
  type: string
}) {
  return (
    <tr className="border-b border-border last:border-b-0">
      <td className="px-4 py-3 font-mono text-[12.5px] font-medium text-foreground">{name}</td>
      <td className="px-4 py-3 text-[13px] text-muted-foreground">{purpose}</td>
      <td className="px-4 py-3 text-[13px] text-muted-foreground">{duration}</td>
      <td className="px-4 py-3 text-[13px] text-muted-foreground">{type}</td>
    </tr>
  )
}

export default function CookiePolicyPage() {
  return (
    <LegalDoc
          eyebrow="Legal · Cookies"
          title="Cookie Policy"
          lastUpdated="April 2026"
          summary="This Cookie Policy explains how SMSLocal uses cookies and similar technologies on our marketing website and in the SMSLocal application. It supplements the Privacy Policy and is incorporated by reference into our Terms of Service."
          toc={TOC}
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Legal", href: "/legal/privacy" },
            { label: "Cookie Policy" },
          ]}
        >
          <LegalSection id="overview" title="1. Overview">
            <p>
              We use a small number of cookies and similar technologies (local storage, session
              storage, pixels) to keep the site working, remember your preferences, and
              understand how features are being used so we can improve them.
            </p>
            <p>
              We do not use cookies to build advertising profiles of individual visitors, and we
              do not sell cookie data to third parties.
            </p>
          </LegalSection>

          <LegalSection id="what" title="2. What cookies are">
            <p>
              Cookies are small text files that websites place on your device. They can be
              &ldquo;session&rdquo; cookies, which are deleted when you close your browser, or
              &ldquo;persistent&rdquo; cookies, which remain for a defined period. Similar
              technologies include local storage (used by the SMSLocal dashboard to remember the
              last-used campaign tab, for example) and transparent pixels in marketing emails.
            </p>
          </LegalSection>

          <LegalSection id="categories" title="3. Categories we use">
            <p>We classify the technologies we use into four categories:</p>
            <ul>
              <li>
                <strong>Strictly necessary.</strong> Required for authentication, fraud
                prevention, and keeping the site functioning. You cannot disable these without
                breaking core features like signing in.
              </li>
              <li>
                <strong>Preferences.</strong> Remember UI choices such as theme, language, and
                the last dashboard tab you visited.
              </li>
              <li>
                <strong>Analytics.</strong> Measure aggregate usage — page views, device and
                browser distribution, error rates — so we can prioritise engineering work. Where
                required by law, these are only set after you accept.
              </li>
              <li>
                <strong>Marketing.</strong> Limited use, only on the marketing site, to measure
                the effectiveness of campaigns we run ourselves. We do not run third-party
                behavioural advertising networks.
              </li>
            </ul>
          </LegalSection>

          <LegalSection id="list" title="4. Specific cookies">
            <p>
              The exact list depends on which products you use. The table below covers cookies
              used on smslocal.in and in the hosted SMSLocal dashboard at the time of writing.
              The names, durations, and third-party status are illustrative and will be updated
              as our stack evolves.
            </p>
            <div className="mt-4 overflow-hidden rounded-xl border border-border bg-background">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] border-collapse text-left text-[13.5px]">
                  <thead>
                    <tr className="border-b border-border bg-muted/40">
                      <th className="px-4 py-3 text-[11.5px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                        Name
                      </th>
                      <th className="px-4 py-3 text-[11.5px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                        Purpose
                      </th>
                      <th className="px-4 py-3 text-[11.5px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                        Duration
                      </th>
                      <th className="px-4 py-3 text-[11.5px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                        Category
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <CookieRow
                      name="sml_session"
                      purpose="Authenticates you on the dashboard and keeps you signed in."
                      duration="Session"
                      type="Strictly necessary"
                    />
                    <CookieRow
                      name="sml_csrf"
                      purpose="Prevents cross-site request forgery on form submissions."
                      duration="Session"
                      type="Strictly necessary"
                    />
                    <CookieRow
                      name="sml_prefs"
                      purpose="Remembers dashboard layout, theme, and default campaign tab."
                      duration="12 months"
                      type="Preferences"
                    />
                    <CookieRow
                      name="_sml_analytics"
                      purpose="Aggregate product usage — page views and feature adoption."
                      duration="13 months"
                      type="Analytics"
                    />
                    <CookieRow
                      name="sml_cookie_consent"
                      purpose="Records your consent choices so we don&apos;t re-ask on every visit."
                      duration="12 months"
                      type="Strictly necessary"
                    />
                  </tbody>
                </table>
              </div>
            </div>
            <p className="mt-3 text-[12.5px] text-muted-foreground">
              [PLACEHOLDER — exact cookie list will be reconciled with production once consent
              banner is wired.]
            </p>
          </LegalSection>

          <LegalSection id="third-party" title="5. Third-party cookies">
            <p>
              Some third-party services we use may set their own cookies when you interact with
              features they power. Examples include payment processors during checkout,
              video-embed providers on the marketing site, and WhatsApp widget providers when
              enabled. We only set these cookies where necessary or where you have granted
              consent.
            </p>
          </LegalSection>

          <LegalSection id="control" title="6. How to control cookies">
            <p>
              You can manage cookies through your browser settings — block all, block
              third-party only, or delete them on exit. Instructions are available for{" "}
              <a
                href="https://support.google.com/chrome/answer/95647"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Chrome
              </a>
              ,{" "}
              <a
                href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Firefox
              </a>
              ,{" "}
              <a
                href="https://support.apple.com/en-in/guide/safari/sfri11471/mac"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Safari
              </a>
              , and{" "}
              <a
                href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Edge
              </a>
              . You can also withdraw analytics consent at any time via the cookie settings link
              in the footer.
            </p>
            <p>
              Blocking strictly-necessary cookies will break core features such as sign-in. We
              do not recommend it.
            </p>
          </LegalSection>

          <LegalSection id="signals" title="7. Global Privacy signals">
            <p>
              Where feasible and required by applicable law, we honour Global Privacy Control
              signals sent by your browser as a withdrawal of consent for non-essential cookies.
            </p>
          </LegalSection>

          <LegalSection id="changes" title="8. Changes to this policy">
            <p>
              We update this Cookie Policy when we change which cookies we use or how we use
              them. The &ldquo;Last updated&rdquo; date at the top reflects the most recent
              change. Material changes will also be announced in our product changelog.
            </p>
          </LegalSection>

          <LegalSection id="contact" title="9. Contact">
            <p>
              Questions about this policy, or about a specific cookie, can be directed to{" "}
              <a href="mailto:privacy@smslocal.in" className="text-primary hover:underline">
                privacy@smslocal.in
              </a>
              .
            </p>
          </LegalSection>
    </LegalDoc>
  )
}
