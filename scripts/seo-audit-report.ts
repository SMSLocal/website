/**
 * One-off: print every warning/error in the SEO registry so we can see
 * exactly which pages need fixing. Run with:
 *   pnpm exec tsx scripts/seo-audit-report.ts
 */
import { auditRegistry, summariseAudits } from "../lib/seo/audit"

const audits = auditRegistry()
const summary = summariseAudits(audits)

console.log(
  `\nSEO audit — total ${summary.total} | ok ${summary.ok} | warnings ${summary.warning} | errors ${summary.error}\n`,
)

for (const a of audits) {
  if (a.issues.length === 0) continue
  const title = a.entry.titleAbsolute ?? a.entry.title ?? "(missing)"
  console.log(`\n${a.worstLevel.toUpperCase()}  ${a.path}`)
  console.log(
    `  title (${a.titleLength}): ${title}\n  description (${a.descriptionLength}): ${a.entry.description}\n  keywords: ${a.keywordCount}`,
  )
  for (const issue of a.issues) {
    console.log(`   - [${issue.level}] ${issue.field}: ${issue.message}`)
  }
}
console.log("\nDone.\n")
