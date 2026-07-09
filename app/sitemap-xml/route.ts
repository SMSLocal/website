import { NextResponse } from "next/server"
import sitemap from "@/app/sitemap"

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

function toIso(d: Date | string | undefined): string | undefined {
  if (!d) return undefined
  const date = d instanceof Date ? d : new Date(d)
  if (Number.isNaN(date.getTime())) return undefined
  return date.toISOString()
}

export const revalidate = 60

export async function GET() {
  const entries = await sitemap()
  const lines: string[] = []
  lines.push('<?xml version="1.0" encoding="UTF-8"?>')
  lines.push('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')
  for (const e of entries) {
    lines.push("  <url>")
    lines.push(`    <loc>${escapeXml(e.url)}</loc>`)
    const iso = toIso(e.lastModified)
    if (iso) lines.push(`    <lastmod>${iso}</lastmod>`)
    if (e.changeFrequency) lines.push(`    <changefreq>${e.changeFrequency}</changefreq>`)
    if (typeof e.priority === "number") lines.push(`    <priority>${e.priority.toFixed(2)}</priority>`)
    lines.push("  </url>")
  }
  lines.push("</urlset>")
  const xml = lines.join("\n")
  return new NextResponse(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  })
}
