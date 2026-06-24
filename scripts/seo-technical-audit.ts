/**
 * scripts/seo-technical-audit.ts
 *
 * Run: pnpm dlx tsx scripts/seo-technical-audit.ts
 *
 * Prints a grouped report of on-page SEO + a11y issues found across app/,
 * components/, and content/. Also writes a JSON file to .seo-audit.json
 * so you can diff runs in CI.
 */

import fs from "node:fs/promises"
import path from "node:path"
import {
  runTechnicalAudit,
  TECH_ISSUE_TYPE_META,
} from "../lib/seo/technical-audit"

const ROOT = process.cwd()

function colour(s: string, code: number): string {
  return `\u001b[${code}m${s}\u001b[0m`
}

async function main() {
  console.log(colour("Running SMSLocal technical SEO audit…", 36))
  const result = await runTechnicalAudit(ROOT)

  const { stats, byLevel, byType, issues } = result

  console.log("")
  console.log(colour("─".repeat(60), 90))
  console.log(
    `  ${colour("Files scanned", 90)}       ${stats.filesScanned}`,
  )
  console.log(`  ${colour("Routes known", 90)}        ${stats.routesKnown}`)
  console.log(
    `  ${colour("Internal links", 90)}      ${stats.internalLinks}`,
  )
  console.log(
    `  ${colour("External links", 90)}      ${stats.externalLinks}`,
  )
  console.log(`  ${colour("Images", 90)}              ${stats.images}`)
  console.log(colour("─".repeat(60), 90))
  console.log(
    `  ${colour("Errors  ", 31)}${byLevel.error}   ${colour("Warnings", 33)}${byLevel.warning}   ${colour("Info", 36)}${byLevel.info}`,
  )
  console.log(colour("─".repeat(60), 90))
  console.log("")

  // Print by type
  const types = Object.keys(byType).sort(
    (a, b) => (byType[b] || 0) - (byType[a] || 0),
  )

  for (const type of types) {
    const count = byType[type]
    const meta = TECH_ISSUE_TYPE_META[type as keyof typeof TECH_ISSUE_TYPE_META]
    console.log(
      colour(`▸ ${meta?.label ?? type}  (${count})`, 1),
    )
    if (meta?.description) {
      console.log(colour(`  ${meta.description}`, 90))
    }
    const typeIssues = issues.filter((i) => i.type === type).slice(0, 10)
    for (const i of typeIssues) {
      const loc = i.line ? `:${i.line}` : ""
      const levelColour =
        i.level === "error" ? 31 : i.level === "warning" ? 33 : 36
      console.log(
        `  ${colour(i.level.toUpperCase().padEnd(7), levelColour)} ${i.file}${loc}`,
      )
      console.log(colour(`          ${i.message}`, 90))
      if (i.snippet) {
        const snip = i.snippet.replace(/\s+/g, " ").slice(0, 110)
        console.log(colour(`          ${snip}`, 90))
      }
    }
    if (issues.filter((i) => i.type === type).length > 10) {
      console.log(
        colour(
          `          …and ${issues.filter((i) => i.type === type).length - 10} more`,
          90,
        ),
      )
    }
    console.log("")
  }

  // Orphan summary
  const orphans = issues
    .filter((i) => i.type === "orphan-page")
    .map((i) => i.route)
    .filter(Boolean) as string[]
  if (orphans.length) {
    console.log(colour("Orphan routes:", 33))
    for (const r of orphans) console.log(`  ${r}`)
    console.log("")
  }

  // Write JSON for CI
  const outPath = path.join(ROOT, ".seo-audit.json")
  await fs.writeFile(outPath, JSON.stringify(result, null, 2), "utf8")
  console.log(colour(`Wrote ${path.relative(ROOT, outPath)}`, 90))
  console.log("")

  if (byLevel.error > 0) {
    console.log(colour(`Done — ${byLevel.error} error(s).`, 31))
    process.exit(1)
  }
  console.log(
    colour(
      `Done — 0 errors, ${byLevel.warning} warning(s), ${byLevel.info} info.`,
      byLevel.warning > 0 ? 33 : 32,
    ),
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
