/**
 * lib/seo/technical-audit.ts
 *
 * Scans every .tsx / .ts file under app/, components/, and content/ for
 * on-page SEO and accessibility issues. Runs in Node (fs + regex) — used
 * by /dev/seo/technical and scripts/seo-technical-audit.ts.
 *
 * What it catches:
 *   - Multiple <h1> tags in one page
 *   - <img> / <Image> without alt, or with empty alt (info)
 *   - Internal <Link href="/foo"> where /foo doesn't match any app route
 *   - External <a target="_blank"> without rel="noopener"
 *   - Generic link text ("click here", "read more")
 *   - Placeholder hrefs ("#" or empty)
 *   - Orphan registry pages (no incoming internal links)
 *   - Under-linked pages (only one incoming link)
 *
 * What it doesn't catch (yet):
 *   - HTTP-level broken links (would need a crawler)
 *   - Missing <h1> (hard to detect without rendering — components may provide it)
 *   - Thin content / word count
 */

import fs from "node:fs/promises"
import path from "node:path"
import { SEO_REGISTRY } from "./registry"

export type TechLevel = "error" | "warning" | "info"

export type TechIssueType =
  | "multiple-h1"
  | "broken-internal-link"
  | "placeholder-href"
  | "unsafe-external-link"
  | "generic-link-text"
  | "missing-alt"
  | "empty-alt"
  | "orphan-page"
  | "under-linked"

export interface TechIssue {
  type: TechIssueType
  level: TechLevel
  file: string
  line?: number
  snippet?: string
  message: string
  suggestion?: string
  route?: string
}

export interface TechnicalAudit {
  issues: TechIssue[]
  stats: {
    filesScanned: number
    routesKnown: number
    internalLinks: number
    externalLinks: number
    images: number
  }
  byLevel: Record<TechLevel, number>
  byType: Record<string, number>
  linkGraph: {
    incoming: Record<string, number>
    referencedRoutes: string[]
    brokenTargets: string[]
  }
}

const IGNORE_DIRS = new Set([
  "node_modules",
  ".next",
  ".git",
  "dist",
  ".vercel",
  "user_read_only_context",
  "v0_memories",
  "scripts",
])

async function walk(root: string, acc: string[] = []): Promise<string[]> {
  let entries
  try {
    entries = await fs.readdir(root, { withFileTypes: true })
  } catch {
    return acc
  }
  for (const e of entries) {
    if (IGNORE_DIRS.has(e.name)) continue
    const p = path.join(root, e.name)
    if (e.isDirectory()) await walk(p, acc)
    else if (e.isFile() && (e.name.endsWith(".tsx") || e.name.endsWith(".ts"))) {
      acc.push(p)
    }
  }
  return acc
}

/**
 * Discover every app-router route from the folder layout.
 * Returns:
 *  - staticRoutes: Set of literal routes like "/pricing"
 *  - dynamicPatterns: RegExp list that matches "/blog/my-slug" etc.
 */
async function discoverRoutes(
  appDir: string,
): Promise<{ staticRoutes: Set<string>; dynamicPatterns: RegExp[] }> {
  const staticRoutes = new Set<string>(["/"])
  const dynamicPatterns: RegExp[] = []

  const files = await walk(appDir)
  const pageFiles = files.filter((f) => f.endsWith(`${path.sep}page.tsx`))

  for (const f of pageFiles) {
    let rel = path
      .relative(appDir, f)
      .replace(new RegExp(`${path.sep}page\\.tsx$`), "")
      .replaceAll(path.sep, "/")

    if (!rel || rel === "page.tsx") continue

    // Strip route groups like (marketing) — they don't affect URL
    const segments = rel
      .split("/")
      .filter((s) => !(s.startsWith("(") && s.endsWith(")")))

    if (segments.length === 0) continue

    const isDynamic = segments.some((s) => s.startsWith("["))
    if (!isDynamic) {
      staticRoutes.add("/" + segments.join("/"))
    } else {
      const pattern = segments.map((s) => {
        if (s.startsWith("[...")) return ".+"
        if (s.startsWith("[")) return "[^/]+"
        return s.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")
      })
      dynamicPatterns.push(new RegExp("^/" + pattern.join("/") + "/?$"))
    }
  }

  // Also include everything from the registry (defensive)
  for (const key of Object.keys(SEO_REGISTRY)) staticRoutes.add(key)

  return { staticRoutes, dynamicPatterns }
}

const lineOf = (src: string, index: number): number =>
  src.slice(0, index).split("\n").length

export async function runTechnicalAudit(
  projectRoot: string,
): Promise<TechnicalAudit> {
  const appDir = path.join(projectRoot, "app")

  const [appFiles, compFiles, contentFiles] = await Promise.all([
    walk(appDir),
    walk(path.join(projectRoot, "components")),
    walk(path.join(projectRoot, "content")),
  ])
  const files = [...appFiles, ...compFiles, ...contentFiles]

  const { staticRoutes, dynamicPatterns } = await discoverRoutes(appDir)

  const isKnownRoute = (href: string): boolean => {
    const clean = (href.split("#")[0].split("?")[0] || "/").replace(
      /\/+$/,
      "",
    )
    const canonical = clean === "" ? "/" : clean
    if (staticRoutes.has(canonical)) return true
    if (staticRoutes.has(canonical + "/")) return true
    for (const re of dynamicPatterns) if (re.test(canonical)) return true
    return false
  }

  const issues: TechIssue[] = []
  let internalLinks = 0
  let externalLinks = 0
  let imagesCount = 0
  const incoming: Record<string, number> = {}
  const referencedRoutes = new Set<string>()
  const brokenTargets = new Set<string>()

  for (const absFile of files) {
    const rel = path.relative(projectRoot, absFile).replaceAll(path.sep, "/")
    let src: string
    try {
      src = await fs.readFile(absFile, "utf8")
    } catch {
      continue
    }

    // Skip test files and storybook stories
    if (/\.(test|spec|stories)\.tsx?$/.test(rel)) continue

    // --- Multiple H1
    const h1Matches = src.match(/<h1[\s>]/g) || []
    if (h1Matches.length > 1) {
      issues.push({
        type: "multiple-h1",
        level: "warning",
        file: rel,
        message: `File renders ${h1Matches.length} <h1> tags. A page should have exactly one H1.`,
        suggestion:
          "Change secondary H1s to <h2> or <h3>. Keep a single H1 that describes the whole page.",
      })
    }

    // --- Links (<Link>, <a>, and blog prose <A> wrapper)
    const linkTagRegex =
      /<(Link|a|A)\b([^>]*?)>([^<]{0,160})<\/\1>|<(Link|a|A)\b([^>]*?)\/?>/g
    let m: RegExpExecArray | null
    while ((m = linkTagRegex.exec(src)) !== null) {
      const attrs = m[2] ?? m[5] ?? ""
      const innerText = (m[3] ?? "").trim()
      const tagName = m[1] ?? m[4] ?? "a"
      const lineNum = lineOf(src, m.index)
      const tagText = m[0]

      const hrefMatch = attrs.match(
        /\bhref\s*=\s*\{?\s*["'`]([^"'`]*)["'`]\s*\}?/,
      )
      if (!hrefMatch) continue
      const href = hrefMatch[1]

      if (href.startsWith("http://") || href.startsWith("https://")) {
        externalLinks++
        if (/target\s*=\s*["']_blank["']/.test(attrs)) {
          const relAttr = attrs.match(/\brel\s*=\s*["']([^"']*)["']/)
          if (!relAttr || !/\bnoopener\b/.test(relAttr[1])) {
            issues.push({
              type: "unsafe-external-link",
              level: "warning",
              file: rel,
              line: lineNum,
              snippet: tagText.slice(0, 160),
              message: `External link opens in a new tab without rel="noopener".`,
              suggestion: `Add rel="noopener noreferrer" for security and correct referrer behaviour.`,
            })
          }
        }
      } else if (href === "" || href === "#") {
        issues.push({
          type: "placeholder-href",
          level: "warning",
          file: rel,
          line: lineNum,
          snippet: tagText.slice(0, 160),
          message: `Placeholder href (${href === "" ? '""' : '"#"'}). Replace with a real destination or remove the link.`,
        })
      } else if (href.startsWith("/")) {
        internalLinks++
        const cleanHref = href.split("#")[0].split("?")[0] || "/"
        referencedRoutes.add(cleanHref)
        incoming[cleanHref] = (incoming[cleanHref] || 0) + 1
        if (!isKnownRoute(cleanHref)) {
          brokenTargets.add(cleanHref)
          issues.push({
            type: "broken-internal-link",
            level: "error",
            file: rel,
            line: lineNum,
            snippet: cleanHref,
            message: `Internal link points to "${cleanHref}" but no matching app route exists.`,
            suggestion: `Either create the route, fix the typo, or add a redirect in next.config.mjs.`,
          })
        }
      }
      // skip anchor-only (#section), mailto:, tel:, relative paths

      // Generic link text
      if (innerText) {
        const normalised = innerText
          .replace(/<[^>]*>/g, "")
          .replace(/\s+/g, " ")
          .trim()
          .toLowerCase()
        if (
          /^(click here|read more|learn more|here|more|more info|details|link)\.?$/i.test(
            normalised,
          )
        ) {
          issues.push({
            type: "generic-link-text",
            level: "warning",
            file: rel,
            line: lineNum,
            snippet: tagText.slice(0, 160),
            message: `Generic link text "${normalised}" — search engines and screen readers gain nothing.`,
            suggestion: `Rewrite the link text to describe the destination (e.g. "See pricing tiers").`,
          })
        }
      }
    }

    // --- Hrefs declared in data arrays, e.g. `{ href: "/products/otp-sms" }`.
    //     These get rendered via .map() and aren't matched by the JSX regex above.
    //     We only use these for incoming-link tracking (not for broken-link errors,
    //     to avoid false positives on template strings and computed values).
    const dataHrefRegex = /\bhref\s*:\s*["'`](\/[^"'`\s]*)["'`]/g
    while ((m = dataHrefRegex.exec(src)) !== null) {
      const cleanHref = m[1].split("#")[0].split("?")[0] || "/"
      internalLinks++
      referencedRoutes.add(cleanHref)
      incoming[cleanHref] = (incoming[cleanHref] || 0) + 1
      if (!isKnownRoute(cleanHref) && !brokenTargets.has(cleanHref)) {
        brokenTargets.add(cleanHref)
        issues.push({
          type: "broken-internal-link",
          level: "error",
          file: rel,
          line: lineOf(src, m.index),
          snippet: cleanHref,
          message: `Data-array href points to "${cleanHref}" but no matching app route exists.`,
          suggestion: `Either create the route, fix the typo, or add a redirect in next.config.mjs.`,
        })
      }
    }

    // --- Template-literal hrefs, e.g. `href={`/compare/${cmp.slug}`}`.
    //     Resolve the substitution by looking for `slug: "xyz"` (or matching
    //     field name) in the same file and credit the resulting paths as
    //     incoming links. This matches the Next.js App Router convention of
    //     iterating a data array of `{ slug, ... }` items.
    const tmplHrefRegex =
      /href\s*=\s*\{?\s*`(\/[^`${]*)\$\{\s*(?:\w+\s*\.\s*)?(\w+)\s*\}([^`]*)`\s*\}?/g
    while ((m = tmplHrefRegex.exec(src)) !== null) {
      const prefix = m[1] // e.g. "/compare/"
      const field = m[2] // e.g. "slug"
      const suffix = m[3] // e.g. "" or "/edit"
      // Find every `field: "value"` in the file.
      const fieldRegex = new RegExp(
        `\\b${field}\\s*:\\s*["'\\\`]([\\w\\-]+)["'\\\`]`,
        "g",
      )
      let f: RegExpExecArray | null
      const seen = new Set<string>()
      while ((f = fieldRegex.exec(src)) !== null) {
        const value = f[1]
        const resolved = (prefix + value + suffix).split("#")[0].split("?")[0]
        if (seen.has(resolved)) continue
        seen.add(resolved)
        internalLinks++
        referencedRoutes.add(resolved)
        incoming[resolved] = (incoming[resolved] || 0) + 1
      }
    }

    // --- Images (literal <img>, <Image>, AND image-wrapper components).
    //     Any JSX element with a `src=` prop that points at (or appears to point
    //     at) an image path needs an `alt`. This catches blog wrappers like
    //     <BlogFigure>, <ProductEditorialBand>, custom `<Avatar src=...>`, etc.
    //     Tags whose `src` is semantically not an image (Script, iframe, video,
    //     audio, source) are explicitly excluded.
    const NON_IMAGE_TAGS = new Set([
      "Script",
      "script",
      "iframe",
      "Iframe",
      "IFrame",
      "video",
      "Video",
      "audio",
      "Audio",
      "source",
      "Source",
      "embed",
      "Embed",
      "object",
      "Object",
      "track",
      "Track",
    ])
    const imgRegex = /<([A-Z][\w]*|img)\b([\s\S]*?)\/?>(?:\s*<\/\1>)?/g
    while ((m = imgRegex.exec(src)) !== null) {
      const tag = m[0]
      const tagName = m[1]
      const attrs = m[2] || ""

      // Must have a src= prop (or srcSet/srcset) to be an image-like element.
      if (!/\bsrc(?:Set|set)?\s*=/.test(attrs)) continue
      if (NON_IMAGE_TAGS.has(tagName)) continue

      imagesCount++
      const lineNum = lineOf(src, m.index)
      const hasAltAttr = /\balt\s*=/.test(attrs)
      const isEmptyAlt =
        /\balt\s*=\s*["'`]\s*["'`]/.test(attrs) ||
        /\balt\s*=\s*\{\s*["'`]\s*["'`]\s*\}/.test(attrs) ||
        /\balt\s*=\s*\{\s*(?:undefined|null|""|''|``)\s*\}/.test(attrs)

      if (!hasAltAttr) {
        issues.push({
          type: "missing-alt",
          level: "error",
          file: rel,
          line: lineNum,
          snippet: tag.slice(0, 160),
          message: `<${tagName}> has a src= prop but no alt. Every image-like element needs descriptive alt text.`,
          suggestion: `Add alt="descriptive text" or alt="" if the image is purely decorative.`,
        })
      } else if (isEmptyAlt) {
        issues.push({
          type: "empty-alt",
          level: "info",
          file: rel,
          line: lineNum,
          snippet: tag.slice(0, 160),
          message: `<${tagName}> has empty alt. Fine for purely decorative images; add a description if the image conveys meaning.`,
        })
      }
    }
  }

  // --- Orphan / under-linked registry pages
  for (const [routePath, entry] of Object.entries(SEO_REGISTRY)) {
    if (entry.noindex) continue
    if (routePath === "/") continue
    const count = incoming[routePath] || 0
    if (count === 0) {
      issues.push({
        type: "orphan-page",
        level: "warning",
        file: "lib/seo/registry.ts",
        route: routePath,
        message: `Orphan — "${routePath}" has zero internal links pointing to it.`,
        suggestion: `Link to it from the nav, footer, or a related page so users and crawlers can find it.`,
      })
    } else if (count < 2) {
      issues.push({
        type: "under-linked",
        level: "info",
        file: "lib/seo/registry.ts",
        route: routePath,
        message: `Under-linked — "${routePath}" has only ${count} incoming internal link.`,
        suggestion: `Add 1–2 contextual internal links from related content.`,
      })
    }
  }

  const byLevel: Record<TechLevel, number> = { error: 0, warning: 0, info: 0 }
  const byType: Record<string, number> = {}
  for (const i of issues) {
    byLevel[i.level]++
    byType[i.type] = (byType[i.type] || 0) + 1
  }

  return {
    issues,
    stats: {
      filesScanned: files.length,
      routesKnown: staticRoutes.size,
      internalLinks,
      externalLinks,
      images: imagesCount,
    },
    byLevel,
    byType,
    linkGraph: {
      incoming,
      referencedRoutes: Array.from(referencedRoutes).sort(),
      brokenTargets: Array.from(brokenTargets).sort(),
    },
  }
}

export const TECH_ISSUE_TYPE_META: Record<
  TechIssueType,
  { label: string; description: string }
> = {
  "multiple-h1": {
    label: "Multiple H1",
    description: "A page has more than one <h1>. Keep exactly one per page.",
  },
  "broken-internal-link": {
    label: "Broken internal link",
    description: "A <Link> points to a route that doesn't exist.",
  },
  "placeholder-href": {
    label: "Placeholder href",
    description: 'href="" or href="#" — replace with a real destination.',
  },
  "unsafe-external-link": {
    label: "Unsafe external link",
    description:
      'target="_blank" without rel="noopener" leaks the referrer and is a minor security risk.',
  },
  "generic-link-text": {
    label: "Generic link text",
    description: `"Click here" / "Read more" give no context to crawlers or assistive tech.`,
  },
  "missing-alt": {
    label: "Missing alt",
    description: "<img> / <Image> missing an alt attribute.",
  },
  "empty-alt": {
    label: "Empty alt",
    description: "Empty alt is only valid for purely decorative images.",
  },
  "orphan-page": {
    label: "Orphan page",
    description: "Registry route with no incoming internal links.",
  },
  "under-linked": {
    label: "Under-linked",
    description: "Registry route with only one incoming internal link.",
  },
}
