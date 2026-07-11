"use client"

/**
 * Lazy-loaded wrappers for heavy "use client" visual/interactive components.
 * Using dynamic({ ssr: false }) here (inside a Client Component file) is valid
 * in Next.js App Router — the restriction only applies when called directly in
 * Server Components.
 *
 * Each export is a code-split, client-only component that shows an animated
 * skeleton placeholder until its JS chunk loads. This keeps these large
 * components out of the initial HTML payload and the primary JS bundle,
 * improving LCP on their respective pages.
 */

import dynamic from "next/dynamic"

const skeleton = (h: string) => () => (
  <div className={`${h} animate-pulse rounded-2xl bg-muted`} />
)

// ── Homepage ──────────────────────────────────────────────────────────────────

export const AiShowcase = dynamic(
  () => import("@/components/test-home/ai-showcase").then((m) => m.AiShowcase),
  { ssr: false, loading: skeleton("h-[480px]") },
)

// ── Pricing ───────────────────────────────────────────────────────────────────

export const PricingTabs = dynamic(
  () => import("@/components/pricing/pricing-tabs").then((m) => m.PricingTabs),
  { ssr: false, loading: skeleton("mx-auto mt-10 h-[520px] max-w-5xl") },
)

// ── Products — individual visual demos ───────────────────────────────────────

export const BulkSmsVisual = dynamic(
  () => import("@/components/product/bulk-sms-visual").then((m) => m.BulkSmsVisual),
  { ssr: false, loading: skeleton("h-[380px]") },
)

export const LiveChatVisual = dynamic(
  () => import("@/components/product/livechat-visual").then((m) => m.LiveChatVisual),
  { ssr: false, loading: skeleton("h-[380px]") },
)

export const InboxVisual = dynamic(
  () => import("@/components/product/inbox-visual").then((m) => m.InboxVisual),
  { ssr: false, loading: skeleton("h-[380px]") },
)

export const TeamCollabPhone = dynamic(
  () => import("@/components/product/team-collab-phone").then((m) => m.TeamCollabPhone),
  { ssr: false, loading: skeleton("h-[360px]") },
)

export const InboxFinalCta = dynamic(
  () => import("@/components/product/inbox-final-cta").then((m) => m.InboxFinalCta),
  { ssr: false, loading: skeleton("h-48") },
)

export const RcsVisual = dynamic(
  () => import("@/components/product/rcs-visual").then((m) => m.RcsVisual),
  { ssr: false, loading: skeleton("h-[380px]") },
)

export const RcsCalculator = dynamic(
  () => import("@/components/pricing/rcs-calculator").then((m) => m.RcsCalculator),
  { ssr: false, loading: skeleton("h-[480px]") },
)

export const EmailInboxVisual = dynamic(
  () => import("@/components/product/email-inbox-visual").then((m) => m.EmailInboxVisual),
  { ssr: false, loading: skeleton("h-[360px]") },
)

export const CollabLaptopVisual = dynamic(
  () => import("@/components/product/collab-laptop-visual").then((m) => m.CollabLaptopVisual),
  { ssr: false, loading: skeleton("h-[360px]") },
)

export const AutomationVisual = dynamic(
  () => import("@/components/product/automation-visual").then((m) => m.AutomationVisual),
  { ssr: false, loading: skeleton("h-[380px]") },
)

export const AutomationChatbotWidget = dynamic(
  () => import("@/components/product/automation-chatbot-widget").then((m) => m.AutomationChatbotWidget),
  { ssr: false, loading: skeleton("h-[360px]") },
)

export const AiAgenticVisual = dynamic(
  () => import("@/components/product/ai-agentic-visual").then((m) => m.AiAgenticVisual),
  { ssr: false, loading: skeleton("h-[380px]") },
)

export const IntegrationsStackPage = dynamic(
  () => import("@/components/product/integrations-stack").then((m) => m.IntegrationsStackPage),
  { ssr: false, loading: skeleton("mx-auto mt-10 h-[600px] max-w-7xl") },
)

// ── Resources ─────────────────────────────────────────────────────────────────

export const GlossaryBrowser = dynamic(
  () => import("@/components/glossary/glossary-browser").then((m) => m.GlossaryBrowser),
  { ssr: false, loading: skeleton("mx-auto mt-10 h-[600px] max-w-5xl") },
)

export const StatusUptimeChart = dynamic(
  () => import("@/components/resources/status-uptime-chart").then((m) => m.StatusUptimeChart),
  { ssr: false, loading: skeleton("h-48") },
)

export const StatusMonitor = dynamic(
  () => import("@/components/resources/status-monitor").then((m) => m.StatusMonitor),
  { ssr: false, loading: skeleton("h-[400px]") },
)

export const ChangelogSubscribe = dynamic(
  () => import("@/components/resources/changelog-subscribe").then((m) => m.ChangelogSubscribe),
  { ssr: false },
)

// ── Tools ─────────────────────────────────────────────────────────────────────

export const SmsBomberSimulator = dynamic(
  () => import("@/components/tools/sms-bomber-simulator").then((m) => m.SmsBomberSimulator),
  {
    ssr: false,
    loading: () => (
      <div className="mx-auto mt-10 h-[480px] max-w-6xl animate-pulse rounded-2xl bg-muted" />
    ),
  },
)
