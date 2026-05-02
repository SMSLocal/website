export { SITE, absoluteUrl } from "./config"
export { buildMetadata, buildArticleMetadata, type PageSeo } from "./metadata"
export { getPageMetadata } from "./get-page-metadata"
export { SEO_REGISTRY, SEO_PATHS, type SeoEntry } from "./registry"
export {
  SEO_LIMITS,
  auditSeoEntry,
  auditRegistry,
  summariseAudits,
  type SeoAudit,
  type SeoIssue,
  type SeoIssueLevel,
} from "./audit"
