/**
 * XSL stylesheet for the sitemap XML documents.
 *
 * Browsers apply this client-side to render `/sitemap.xml` and its children as
 * a readable page instead of a raw node tree. Crawlers ignore `xml-stylesheet`
 * entirely and parse the underlying XML, so this is presentation only and
 * cannot affect indexing.
 *
 * Constraints worth knowing before editing:
 *   - Browser XSLT is 1.0 only. No xsl:function, no EXSLT date formatting —
 *     hence the substring() slicing of ISO timestamps below.
 *   - No JavaScript, so nothing here needs a CSP script allowance.
 *   - One stylesheet serves both document types; xsl:choose on the root
 *     element picks the index layout or the URL-list layout.
 */
export const SITEMAP_STYLESHEET_PATH = "/sitemap.xsl"

export const SITEMAP_STYLESHEET = `<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="robots" content="noindex, follow"/>
        <title>XML Sitemap | SMSLocal</title>
        <style>
          :root {
            --brand: #10b981;
            --brand-dark: #047857;
            --ink: #0f172a;
            --muted: #64748b;
            --line: #e2e8f0;
            --bg: #f8fafc;
            --card: #ffffff;
          }
          @media (prefers-color-scheme: dark) {
            :root {
              --ink: #e2e8f0;
              --muted: #94a3b8;
              --line: #1e293b;
              --bg: #0f172a;
              --card: #111c33;
            }
          }
          * { box-sizing: border-box; }
          body {
            margin: 0;
            background: var(--bg);
            color: var(--ink);
            font: 15px/1.6 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
              "Helvetica Neue", Arial, sans-serif;
          }
          .band {
            background: linear-gradient(135deg, #10b981 0%, #047857 100%);
            color: #ffffff;
            padding: 40px 24px 34px;
          }
          .band .inner, .wrap { max-width: 1080px; margin: 0 auto; }
          .band h1 { margin: 0 0 10px; font-size: 30px; letter-spacing: -0.02em; }
          .band p { margin: 0; max-width: 70ch; opacity: 0.93; font-size: 14px; }
          .band a { color: #ffffff; text-decoration: underline; }
          .wrap { padding: 26px 24px 60px; }
          .meta {
            display: flex; flex-wrap: wrap; gap: 10px 18px;
            align-items: center; margin-bottom: 16px;
            color: var(--muted); font-size: 14px;
          }
          .count { color: var(--ink); font-weight: 600; }
          .back { color: var(--brand-dark); text-decoration: none; font-weight: 600; }
          .back:hover { text-decoration: underline; }
          .card {
            background: var(--card); border: 1px solid var(--line);
            border-radius: 10px; overflow: hidden;
          }
          /* Below this width the table scrolls inside .scroll rather than
             crushing the URL column into a few characters per line. */
          table { width: 100%; min-width: 680px; border-collapse: collapse; font-size: 14px; }
          th:first-child, td:first-child { width: 100%; }
          th {
            text-align: left; padding: 12px 16px;
            background: #10b981; color: #ffffff; font-weight: 600;
            white-space: nowrap;
          }
          td { padding: 11px 16px; border-top: 1px solid var(--line); }
          tbody tr:nth-child(even) td { background: rgba(16, 185, 129, 0.04); }
          tbody tr:hover td { background: rgba(16, 185, 129, 0.10); }
          td a { color: var(--brand-dark); text-decoration: none; overflow-wrap: anywhere; }
          td a:hover { text-decoration: underline; }
          .num { text-align: right; white-space: nowrap; color: var(--muted); }
          .when { white-space: nowrap; color: var(--muted); }
          .scroll { overflow-x: auto; }
          footer { margin-top: 20px; color: var(--muted); font-size: 13px; }
          @media (prefers-color-scheme: dark) {
            .back, td a { color: #34d399; }
          }
          @media (max-width: 640px) {
            .band { padding: 28px 16px 24px; }
            .band h1 { font-size: 23px; }
            .wrap { padding: 20px 16px 44px; }
          }
        </style>
      </head>
      <body>
        <xsl:choose>
          <xsl:when test="s:sitemapindex"><xsl:call-template name="index"/></xsl:when>
          <xsl:otherwise><xsl:call-template name="urls"/></xsl:otherwise>
        </xsl:choose>
      </body>
    </html>
  </xsl:template>

  <xsl:template name="index">
    <div class="band">
      <div class="inner">
        <h1>XML Sitemap</h1>
        <p>
          This is the sitemap index for SMSLocal. It lists one sitemap per
          section of the site so search engines can crawl and re-crawl the
          pages, blog posts, comparisons, help articles and customer stories
          on this website.
          <a href="https://www.sitemaps.org/">Learn more about XML sitemaps.</a>
        </p>
      </div>
    </div>
    <div class="wrap">
      <div class="meta">
        <span>
          This XML Sitemap Index file contains
          <span class="count"><xsl:value-of select="count(s:sitemapindex/s:sitemap)"/></span>
          sitemaps.
        </span>
      </div>
      <div class="card scroll">
        <table>
          <thead>
            <tr><th>Sitemap</th><th>Last Modified</th></tr>
          </thead>
          <tbody>
            <xsl:for-each select="s:sitemapindex/s:sitemap">
              <tr>
                <td><a href="{s:loc}"><xsl:value-of select="s:loc"/></a></td>
                <td class="when">
                  <xsl:call-template name="when">
                    <xsl:with-param name="iso" select="s:lastmod"/>
                  </xsl:call-template>
                </td>
              </tr>
            </xsl:for-each>
          </tbody>
        </table>
      </div>
      <footer>
        Generated by SMSLocal. Search engines read the underlying XML; this
        page is presentation only.
      </footer>
    </div>
  </xsl:template>

  <xsl:template name="urls">
    <div class="band">
      <div class="inner">
        <h1>XML Sitemap</h1>
        <p>
          This sitemap lists the URLs in one section of smslocal.in, with the
          priority and change frequency reported to search engines.
          <a href="https://www.sitemaps.org/">Learn more about XML sitemaps.</a>
        </p>
      </div>
    </div>
    <div class="wrap">
      <div class="meta">
        <span>
          This XML Sitemap contains
          <span class="count"><xsl:value-of select="count(s:urlset/s:url)"/></span>
          URLs.
        </span>
        <a class="back" href="/sitemap.xml">&#8592; Back to sitemap index</a>
      </div>
      <div class="card scroll">
        <table>
          <thead>
            <tr>
              <th>URL</th>
              <th>Priority</th>
              <th>Change Frequency</th>
              <th>Last Modified</th>
            </tr>
          </thead>
          <tbody>
            <xsl:for-each select="s:urlset/s:url">
              <tr>
                <td><a href="{s:loc}"><xsl:value-of select="s:loc"/></a></td>
                <td class="num"><xsl:value-of select="s:priority"/></td>
                <td class="when"><xsl:value-of select="s:changefreq"/></td>
                <td class="when">
                  <xsl:call-template name="when">
                    <xsl:with-param name="iso" select="s:lastmod"/>
                  </xsl:call-template>
                </td>
              </tr>
            </xsl:for-each>
          </tbody>
        </table>
      </div>
      <footer>
        Generated by SMSLocal. Search engines read the underlying XML; this
        page is presentation only.
      </footer>
    </div>
  </xsl:template>

  <xsl:template name="when">
    <xsl:param name="iso"/>
    <xsl:choose>
      <xsl:when test="string-length($iso) &gt;= 16">
        <xsl:value-of select="substring($iso, 1, 10)"/>
        <xsl:text> </xsl:text>
        <xsl:value-of select="substring($iso, 12, 5)"/>
      </xsl:when>
      <xsl:otherwise><xsl:value-of select="$iso"/></xsl:otherwise>
    </xsl:choose>
  </xsl:template>
</xsl:stylesheet>
`
