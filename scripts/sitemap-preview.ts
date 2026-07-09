/**
 * Local preview of what `/sitemap.xml` will output in production.
 * Run with: pnpm dlx tsx scripts/sitemap-preview.ts
 */
import sitemap from "../app/sitemap"

async function main() {
  const entries = await sitemap()
  console.log(`\nSitemap entries: ${entries.length}\n`)
  for (const e of entries) {
    const priority = typeof e.priority === "number" ? e.priority.toFixed(1) : "—"
    const freq = e.changeFrequency ?? "—"
    console.log(`  [${priority}] [${freq.padEnd(8)}]  ${e.url}`)
  }
  console.log("")
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
