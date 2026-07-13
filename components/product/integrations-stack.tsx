"use client"

import React, { useState, useEffect, useRef } from "react"
import Link from "next/link"
import {
  ArrowRight, Check, ChevronDown, Code2, Copy, Plug, Puzzle, ShieldCheck, Sparkles, Zap,
  MessageSquareText, MessageCircle, Mail, KeyRound, Phone, MessagesSquare, Send, Instagram, Facebook,
} from "lucide-react"

/* ─── DATA ──────────────────────────────────────────────────────────────── */

type Plan = "Free" | "Starter" | "Growth" | "Scale" | "Enterprise"

const PLAN_STYLE: Record<Plan, string> = {
  Free:       "border-emerald-500/30 bg-emerald-500/10 text-emerald-600",
  Starter:    "border-primary/30 bg-primary/10 text-primary",
  Growth:     "border-sky-500/30 bg-sky-500/10 text-sky-600",
  Scale:      "border-violet-500/30 bg-violet-500/10 text-violet-600",
  Enterprise: "border-amber-500/30 bg-amber-500/10 text-amber-600",
}

const CATEGORIES: {
  id: string
  label: string
  gate: Plan
  cards: { name: string; desc: string; plan: Plan }[]
}[] = [
  {
    id: "ecommerce", label: "E-commerce", gate: "Starter",
    cards: [
      { name: "Shopify",     desc: "Order, tracking & refund alerts on SMS and WhatsApp.", plan: "Starter" },
      { name: "WooCommerce", desc: "WordPress store orders and customer data sync.",       plan: "Starter" },
      { name: "Magento",     desc: "Enterprise catalog and order event triggers.",         plan: "Growth" },
    ],
  },
  {
    id: "crm", label: "CRM", gate: "Starter",
    cards: [
      { name: "HubSpot",    desc: "Sync contacts, deals, and message history.",       plan: "Starter" },
      { name: "Salesforce", desc: "Bi-directional CRM sync with messaging workflows.", plan: "Growth" },
      { name: "Zoho CRM",   desc: "Fire SMS & WhatsApp from Zoho lead stages.",        plan: "Starter" },
    ],
  },
  {
    id: "helpdesk", label: "Helpdesk", gate: "Growth",
    cards: [
      { name: "Freshdesk",  desc: "Reply to tickets over WhatsApp from one inbox.", plan: "Growth" },
      { name: "Zendesk",    desc: "Turn SMS replies into helpdesk tickets.",        plan: "Growth" },
      { name: "Intercom",   desc: "Route conversations and escalations.",            plan: "Scale" },
    ],
  },
  {
    id: "communication", label: "Communication", gate: "Starter",
    cards: [
      { name: "Slack",            desc: "Route customer messages into Slack channels.", plan: "Starter" },
      { name: "Microsoft Teams",  desc: "Notify teams on replies and escalations.",     plan: "Starter" },
      { name: "Google Sheets",    desc: "Log contacts and conversations to a sheet.",   plan: "Starter" },
    ],
  },
  {
    id: "analytics", label: "Analytics", gate: "Growth",
    cards: [
      { name: "Google Analytics", desc: "Attribute conversions to campaigns.",     plan: "Growth" },
      { name: "Mixpanel",         desc: "Stream delivery & reply events.",          plan: "Growth" },
      { name: "Power BI",         desc: "Pipe message metrics into dashboards.",    plan: "Scale" },
    ],
  },
  {
    id: "automation", label: "Automation", gate: "Starter",
    cards: [
      { name: "Zapier",        desc: "Connect SMSLocal to 6,000+ apps. No code.",       plan: "Starter" },
      { name: "Make",          desc: "Visual scenario builder with branching.",          plan: "Starter" },
      { name: "Pabbly Connect", desc: "Affordable multi-step automation flows.",         plan: "Growth" },
    ],
  },
]

const NATIVE_CHANNELS: { name: string; plan: Plan; Icon: React.ComponentType<{ className?: string }> }[] = [
  { name: "Bulk SMS",    plan: "Free",    Icon: MessageSquareText },
  { name: "WhatsApp",    plan: "Free",    Icon: MessageCircle },
  { name: "Email",       plan: "Free",    Icon: Mail },
  { name: "OTP SMS",     plan: "Starter", Icon: KeyRound },
  { name: "RCS",         plan: "Starter", Icon: Sparkles },
  { name: "Voice / IVR", plan: "Starter", Icon: Phone },
  { name: "Live Chat",   plan: "Starter", Icon: MessagesSquare },
  { name: "Telegram",    plan: "Starter", Icon: Send },
  { name: "Instagram",   plan: "Growth",  Icon: Instagram },
  { name: "Messenger",   plan: "Growth",  Icon: Facebook },
]

const API_BULLETS = [
  "REST API with full CRUD for contacts, campaigns, and messages",
  "Webhooks on delivery receipts, replies, and status changes",
  "OAuth 2.0 for third-party app authentication",
  "Rate limits: 1,000 req/min on Starter, 10,000 on Enterprise",
  "Sandbox environment to simulate delivery and carrier failures",
]

const CODE = `Authorization: Bearer YOUR_API_KEY

{
  "channel":      "whatsapp",
  "to":           "+91XXXXXXXXXX",
  "content_type": "text",
  "content":      "Hi! How can I help you?"
}`

const TRUST = [
  "AWS Mumbai (ap-south-1)",
  "DPDPA 2023 compliant",
  "DLT-registered · Jio · Airtel · Vi · BSNL",
  "AES-256 encryption at rest",
  "MFA on every agent account",
]

const INT_TESTIMONIALS = [
  {
    quote: "The Linear integration converts a chat into a tracked issue in one click. No copy-paste, no lost context — massive time saver.",
    name: "Neha Joshi",
    role: "Engineering Lead · Razorpay, Mumbai",
    initials: "NJ",
    color: "#f43f5e",
  },
  {
    quote: "Stripe MRR and HubSpot lifecycle sit right on every conversation. One Customer 360 means no more tab-switching mid-chat.",
    name: "Vikram Mehta",
    role: "VP Support · fintech SaaS, Mumbai",
    initials: "VM",
    color: "#14b8a6",
  },
  {
    quote: "We connected Zapier, HubSpot, and WhatsApp in one afternoon. The REST API is clean and the docs are actually good.",
    name: "Rahul Nair",
    role: "Founder · LogiTrack, Bengaluru",
    initials: "RN",
    color: "#8b5cf6",
  },
]

const FAQS = [
  { q: "Is the Zapier integration free?",                       a: "The SMSLocal side is free on Starter and above — connect SMS, WhatsApp, OTP, and RCS triggers at no extra cost. Zapier's own pricing applies; their free tier already covers basic automations like \"new lead → send SMS\"." },
  { q: "Can I keep my existing DLT sender IDs and templates?",  a: "Yes. When you connect SMSLocal we migrate your approved Sender IDs (headers) and DLT content templates across Jio, Airtel, Vi, and BSNL — so your transactional and OTP traffic keeps flowing without re-registration delays." },
  { q: "Is there a public REST API?",                           a: "Yes. A full REST API with CRUD for contacts, campaigns, and messages, idempotency keys, signed webhooks, and official SDKs for Node.js, Python, PHP, and Go. A sandbox lets you simulate delivery and carrier failures without spending credit." },
  { q: "Can SMSLocal integrate with my custom CRM?",            a: "Absolutely. Beyond native HubSpot, Salesforce, and Zoho connectors, you can wire any in-house CRM to SMSLocal through the REST API, webhooks, or Zapier / Make — no waiting on a pre-built connector." },
  { q: "Does SMSLocal support SAML SSO?",                       a: "Yes. SAML 2.0 single sign-on and SCIM user provisioning are available on Enterprise plans, alongside role-based access, IP allowlists, and scoped API keys for every team member." },
]

/* ─── SMALL PARTS ───────────────────────────────────────────────────────── */

function PlanBadge({ plan, suffix = "+" }: { plan: Plan; suffix?: string }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${PLAN_STYLE[plan]}`}>
      {plan}{suffix}
    </span>
  )
}

function Eyebrow({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex items-center gap-3 text-[12px] font-bold uppercase tracking-[0.18em] text-muted-foreground/70">
      <span className="text-primary">/ {n}</span>
      <span>{label}</span>
    </div>
  )
}

/* ─── INTEGRATIONS SHOWCASE (grid + spotlight) ──────────────────────────── */
type Brand = { key: string; name: string; bg: string; fg: string; d?: string; vb?: string; letter?: string }

const BRANDS: Brand[] = [
  { key: "shopify",     name: "Shopify",     bg: "#95bf47", fg: "#fff",     d: "M15.337 23.979l7.216-1.561s-2.604-17.613-2.625-17.73c-.018-.116-.114-.192-.211-.192s-1.929-.136-1.929-.136-1.275-1.274-1.439-1.411c-.045-.037-.075-.057-.121-.074l-.914 21.104h.023zM11.71 11.305s-.81-.424-1.774-.424c-1.447 0-1.504.906-1.504 1.141 0 1.232 3.24 1.715 3.24 4.629 0 2.295-1.44 3.76-3.406 3.76-2.354 0-3.54-1.465-3.54-1.465l.646-2.086s1.245 1.066 2.28 1.066c.675 0 .975-.545.975-.932 0-1.619-2.654-1.694-2.654-4.359-.034-2.237 1.571-4.416 4.827-4.416 1.257 0 1.875.361 1.875.361l-.945 2.715-.02.01zM11.17.83c.136 0 .271.038.405.135-.984.465-2.064 1.639-2.508 3.992-.656.213-1.293.405-1.889.578C7.697 3.75 8.951.84 11.17.84V.83zm1.235 2.949v.135c-.754.232-1.583.484-2.394.736.466-1.777 1.333-2.645 2.085-2.971.193.501.309 1.176.309 2.1zm.539-2.234c.694.074 1.141.867 1.429 1.755-.349.114-.735.231-1.158.366v-.252c0-.752-.096-1.371-.271-1.871v.002zm2.992 1.289c-.02 0-.06.021-.078.021s-.289.075-.714.21c-.423-1.233-1.176-2.37-2.508-2.37h-.115C12.135.209 11.669 0 11.265 0 8.159 0 6.675 3.877 6.21 5.846c-1.194.365-2.063.636-2.16.674-.675.213-.694.232-.772.87-.075.462-1.83 14.063-1.83 14.063L15.009 24l.927-21.166z" },
  { key: "hubspot",     name: "HubSpot",     bg: "#ff7a59", fg: "#fff",     d: "M18.164 7.93V5.084a2.198 2.198 0 001.267-1.978v-.067A2.2 2.2 0 0017.238.845h-.067a2.2 2.2 0 00-2.193 2.193v.067a2.196 2.196 0 001.252 1.973l.013.006v2.852a6.22 6.22 0 00-2.969 1.31l.012-.01-7.828-6.095A2.497 2.497 0 104.3 4.656l-.012.006 7.697 5.991a6.176 6.176 0 00-1.038 3.446c0 1.343.425 2.588 1.147 3.607l-.013-.02-2.342 2.343a1.968 1.968 0 00-.58-.095h-.002a2.033 2.033 0 102.033 2.033 1.978 1.978 0 00-.1-.595l.005.014 2.317-2.317a6.247 6.247 0 104.782-11.134l-.036-.005zm-.964 9.378a3.206 3.206 0 113.215-3.207v.002a3.206 3.206 0 01-3.207 3.207z" },
  { key: "salesforce",  name: "Salesforce",  bg: "#00a1e0", fg: "#fff",     d: "M10.006 5.415a4.195 4.195 0 013.045-1.306c1.56 0 2.954.9 3.69 2.205.63-.3 1.35-.45 2.1-.45 2.85 0 5.159 2.34 5.159 5.22s-2.31 5.22-5.176 5.22c-.345 0-.69-.044-1.02-.104a3.75 3.75 0 01-3.3 1.95c-.6 0-1.155-.15-1.65-.375A4.314 4.314 0 018.88 20.4a4.302 4.302 0 01-4.05-2.82c-.27.062-.54.076-.825.076-2.204 0-4.005-1.8-4.005-4.05 0-1.5.811-2.805 2.01-3.51-.255-.57-.39-1.2-.39-1.846 0-2.58 2.1-4.65 4.65-4.65 1.53 0 2.85.705 3.72 1.8" },
  { key: "slack",       name: "Slack",       bg: "#4a154b", fg: "#fff",     d: "M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" },
  { key: "zapier",      name: "Zapier",      bg: "#ff4f00", fg: "#fff",     d: "M12 14.39a8.4 8.4 0 0 1-.42 2.65 8.39 8.39 0 0 1-2.65.42h-.01a8.39 8.39 0 0 1-2.65-.42A8.43 8.43 0 0 1 5.85 14.4v-.01c0-.92.15-1.81.42-2.64a8.39 8.39 0 0 1 2.65-.42h.01c.92 0 1.81.15 2.65.42.27.83.42 1.72.42 2.64zM21.6 9.6h-5.73l4.05-4.05a9.7 9.7 0 0 0-1.62-2.16 9.7 9.7 0 0 0-2.16-1.62L12.09 5.82V.09A9.65 9.65 0 0 0 10.5 0h-.99a9.65 9.65 0 0 0-1.59.09v5.73L3.87 1.77a9.7 9.7 0 0 0-2.16 1.62A9.7 9.7 0 0 0 .09 5.55L4.14 9.6H-1.6 2.4A9.65 9.65 0 0 0 0 11.19v.99c0 .54.03 1.07.09 1.59h5.73L1.77 17.82c.45.78.99 1.5 1.62 2.13.63.63 1.35 1.17 2.13 1.62l4.05-4.05v5.73c.52.06 1.05.09 1.59.09h.99c.54 0 1.07-.03 1.59-.09v-5.73l4.05 4.05a9.7 9.7 0 0 0 2.16-1.62 9.7 9.7 0 0 0 1.62-2.16l-4.05-4.05h5.73c.06-.52.09-1.05.09-1.59v-.99c0-.54-.03-1.07-.09-1.59z" },
  { key: "stripe",      name: "Stripe",      bg: "#635bff", fg: "#fff",     d: "M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z" },
  { key: "zendesk",     name: "Zendesk",     bg: "#03363d", fg: "#fff",     d: "M12.914 2.904V16.29L24 2.905H12.914zM0 2.906C0 5.966 2.483 8.45 5.543 8.45s5.542-2.484 5.543-5.544H0zm11.086 4.807L0 21.096h11.086V7.713zm7.37 7.84c-3.063 0-5.542 2.48-5.542 5.543H24c0-3.06-2.48-5.543-5.543-5.543z" },
  { key: "pipedrive",   name: "Pipedrive",   bg: "#1a1a1a", fg: "#33eaa8", letter: "P" },
  { key: "mailchimp",   name: "Mailchimp",   bg: "#ffe01b", fg: "#212121", letter: "M" },
  { key: "intercom",    name: "Intercom",    bg: "#0057ff", fg: "#fff",     d: "M21 0H3C1.343 0 0 1.343 0 3v18c0 1.658 1.343 3 3 3h18c1.658 0 3-1.342 3-3V3c0-1.657-1.342-3-3-3zm-5.801 4.399c0-.44.36-.8.802-.8.44 0 .8.36.8.8v10.688c0 .442-.36.801-.8.801-.443 0-.802-.359-.802-.801V4.399zM11.2 3.994c0-.44.357-.799.8-.799s.8.359.8.799v11.602c0 .44-.357.8-.8.8s-.8-.36-.8-.8V3.994zm-4 .405c0-.44.359-.8.799-.8.443 0 .802.36.802.8v10.688c0 .442-.36.801-.802.801-.44 0-.799-.359-.799-.801V4.399zM3.199 6c0-.442.36-.8.802-.8.44 0 .799.358.799.8v7.195c0 .441-.359.8-.799.8-.443 0-.802-.36-.802-.8V6zM20.52 18.202c-.123.105-3.086 2.593-8.52 2.593-5.433 0-8.397-2.486-8.521-2.593-.335-.288-.375-.792-.086-1.128.285-.334.79-.375 1.125-.09.047.041 2.693 2.211 7.481 2.211 4.848 0 7.456-2.186 7.479-2.207.334-.289.839-.25 1.128.086.289.336.25.84-.086 1.128zm.281-5.007c0 .441-.36.8-.801.8-.441 0-.801-.36-.801-.8V6c0-.442.361-.8.801-.8.441 0 .801.357.801.8v7.195z" },
  { key: "notion",      name: "Notion",      bg: "#0f0f0f", fg: "#fff",     d: "M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z" },
  { key: "google",      name: "Google",      bg: "#ffffff", fg: "#4285f4", d: "M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" },
  { key: "segment",     name: "Segment",     bg: "#52bd95", fg: "#fff",     letter: "S" },
  { key: "mixpanel",    name: "Mixpanel",    bg: "#7856ff", fg: "#fff",     d: "M6.967 9.996h3.053c-.763-.477-1.048-1.145-1.431-2.384L7.443 3.366C6.919 1.458 6.49.551 4.39.551H.004v1.145h.621c1.286 0 1.431.477 1.814 1.908L3.44 7.326c.524 1.814 1.337 2.67 3.53 2.67h-.003Zm7.06 0h3.053c2.194 0 2.956-.86 3.484-2.67l1.001-3.722c.382-1.431.57-1.908 1.814-1.908H24V.551h-4.34c-2.146 0-2.576.86-3.053 2.815l-1.145 4.246c-.384 1.286-.673 1.907-1.435 2.384Zm-4.007 4.008h4.007V9.996H10.02v4.008ZM0 23.449h4.39c2.1 0 2.529-.907 3.053-2.815l1.146-4.246c.383-1.239.668-1.907 1.431-2.384H6.967c-2.194 0-3.007.86-3.531 2.67l-1.001 3.722c-.383 1.431-.524 1.907-1.814 1.907H0v1.146Zm19.65 0h4.343v-1.146h-.622c-1.239 0-1.431-.476-1.814-1.907l-1.001-3.722c-.524-1.814-1.286-2.67-3.483-2.67h-3.046c.762.477 1.041 1.098 1.424 2.384l1.145 4.246c.477 1.955.907 2.815 3.054 2.815Z" },
  { key: "twilio",      name: "Twilio",      bg: "#f22f46", fg: "#fff",     d: "M12 0C5.381-.008.008 5.352 0 11.971V12c0 6.64 5.359 12 12 12 6.64 0 12-5.36 12-12 0-6.641-5.36-12-12-12zm0 20.801c-4.846.015-8.786-3.904-8.801-8.75V12c-.014-4.846 3.904-8.786 8.75-8.801H12c4.847-.014 8.786 3.904 8.801 8.75V12c.015 4.847-3.904 8.786-8.75 8.801H12zm5.44-11.76c0 1.359-1.12 2.479-2.481 2.479-1.366-.007-2.472-1.113-2.479-2.479 0-1.361 1.12-2.481 2.479-2.481 1.361 0 2.481 1.12 2.481 2.481zm0 5.919c0 1.36-1.12 2.48-2.481 2.48-1.367-.008-2.473-1.114-2.479-2.48 0-1.359 1.12-2.479 2.479-2.479 1.361-.001 2.481 1.12 2.481 2.479zm-5.919 0c0 1.36-1.12 2.48-2.479 2.48-1.368-.007-2.475-1.113-2.481-2.48 0-1.359 1.12-2.479 2.481-2.479 1.358-.001 2.479 1.12 2.479 2.479zm0-5.919c0 1.359-1.12 2.479-2.479 2.479-1.367-.007-2.475-1.112-2.481-2.479 0-1.361 1.12-2.481 2.481-2.481 1.358 0 2.479 1.12 2.479 2.481z" },
  { key: "microsoft",   name: "Microsoft",   bg: "#0078d4", fg: "#fff",     vb: "0 0 448 512", d: "M0 32h214.6v214.6H0V32zm233.4 0H448v214.6H233.4V32zM0 265.4h214.6V480H0V265.4zm233.4 0H448V480H233.4V265.4z" },
  { key: "jira",        name: "Jira",        bg: "#2684ff", fg: "#fff",     d: "M12.004 0c-2.35 2.395-2.365 6.185.133 8.585l3.412 3.413-3.197 3.198a6.501 6.501 0 0 1 1.412 7.04l9.566-9.566a.95.95 0 0 0 0-1.344L12.004 0zm-1.748 1.74L.67 11.327a.95.95 0 0 0 0 1.344C4.45 16.44 8.22 20.244 12 24c2.295-2.298 2.395-6.096-.08-8.533l-3.47-3.469 3.2-3.2c-1.918-1.955-2.363-4.725-1.394-7.057z" },
  { key: "woocommerce", name: "WooCommerce", bg: "#7f54b3", fg: "#fff",     letter: "W" },
  { key: "make",        name: "Make",        bg: "#6d45f4", fg: "#fff",     d: "M13.38 3.498c-.27 0-.511.19-.566.465L9.85 18.986a.578.578 0 0 0 .453.678l4.095.826a.58.58 0 0 0 .682-.455l2.963-15.021a.578.578 0 0 0-.453-.678l-4.096-.826a.589.589 0 0 0-.113-.012zm-5.876.098a.576.576 0 0 0-.516.318L.062 17.697a.575.575 0 0 0 .256.774l3.733 1.877a.578.578 0 0 0 .775-.258l6.926-13.781a.577.577 0 0 0-.256-.776L7.762 3.658a.571.571 0 0 0-.258-.062zm11.74.115a.576.576 0 0 0-.576.576v15.426c0 .318.258.578.576.578h4.178a.58.58 0 0 0 .578-.578V4.287a.578.578 0 0 0-.578-.576Z" },
  { key: "freshdesk",   name: "Freshdesk",   bg: "#25c16f", fg: "#fff",     letter: "F" },
]

// connected integrations — enterprise console rows
const CONNECTIONS = [
  { key: "shopify",    name: "Shopify",    cat: "E-commerce", sync: "live",    events: "8,420",  health: 98 },
  { key: "hubspot",    name: "HubSpot",    cat: "CRM",        sync: "2m ago",  events: "12,401", health: 99 },
  { key: "salesforce", name: "Salesforce", cat: "CRM",        sync: "5m ago",  events: "3,275",  health: 97 },
  { key: "stripe",     name: "Stripe",     cat: "Payments",   sync: "live",    events: "6,180",  health: 99 },
  { key: "zapier",     name: "Zapier",     cat: "Automation", sync: "1m ago",  events: "8,920",  health: 96 },
]

function BrandTile({ b, size, active }: { b: Brand; size: number; active?: boolean }) {
  return (
    <div
      className="flex items-center justify-center rounded-xl font-bold transition-transform"
      aria-label={b.name}
      title={b.name}
      style={{
        background: b.bg,
        color: b.fg,
        height: size,
        width: size,
        fontSize: size * 0.42,
        transform: active ? "translateY(-3px) scale(1.06)" : "none",
        boxShadow: active
          ? `0 0 0 2px var(--primary), 0 8px 18px -8px rgba(15,42,74,0.3)`
          : "0 8px 18px -8px rgba(15,42,74,0.25), inset 0 0 0 1px rgba(0,0,0,0.05)",
      }}
    >
      {b.d ? (
        <svg viewBox={b.vb || "0 0 24 24"} fill="currentColor" aria-hidden style={{ width: size * 0.46, height: size * 0.46 }}>
          <path d={b.d} />
        </svg>
      ) : (
        b.letter
      )}
    </div>
  )
}

function IntegrationsShowcase() {
  const [syncing, setSyncing] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setSyncing(s => (s + 1) % CONNECTIONS.length), 2400)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="relative mx-auto w-full overflow-hidden rounded-2xl border border-white/20 bg-[oklch(0.22_0.03_230)]" style={{ boxShadow: "0 0 0 1px color-mix(in oklch, var(--primary) 15%, transparent), 0 25px 60px -12px rgba(0,0,0,0.7), 0 0 40px -8px color-mix(in oklch, var(--primary) 20%, transparent)" }}>
      {/* window chrome */}
      <div className="flex items-center gap-3 border-b border-white/8 bg-white/5 px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="mx-auto flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10.5px] text-white/50">
          <ShieldCheck className="h-3 w-3 text-primary" /> app.smslocal.in/integrations
        </div>
      </div>

      {/* console toolbar */}
      <div className="flex items-center justify-between border-b border-white/8 px-5 py-2.5">
        <div>
          <p className="text-[14px] font-bold text-white">Connected integrations</p>
          <p className="text-[11px] text-white/40">5 of 100+ active · synced just now</p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-[12px] font-semibold text-primary-foreground shadow-sm">
          <Plug className="h-3.5 w-3.5" /> Add
        </span>
      </div>

      {/* column header */}
      <div className="hidden items-center gap-3 border-b border-white/8 bg-white/3 px-5 py-2 text-[10px] font-semibold uppercase tracking-wider text-white/35 sm:flex">
        <span className="flex-1">Application</span>
        <span className="w-20 text-right">24h events</span>
        <span className="w-24 text-right">Health</span>
        <span className="w-24 text-right">Status</span>
      </div>

      {/* rows */}
      <div className="flex flex-col">
        {CONNECTIONS.map((c, i) => {
          const b = BRANDS.find(x => x.key === c.key)!
          const isSync = i === syncing
          return (
            <div
              key={c.key}
              className="flex items-center gap-3 border-b border-white/6 px-5 py-2 transition-colors"
              style={{ background: isSync ? "color-mix(in oklch, var(--primary) 8%, transparent)" : "transparent" }}
            >
              <BrandTile b={b} size={34} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-semibold text-white">{c.name}</p>
                <p className="truncate text-[11px] text-white/40">{c.cat} · {isSync ? "syncing…" : c.sync}</p>
              </div>
              <span className="hidden w-20 text-right text-[12.5px] font-semibold tabular-nums text-white/70 sm:block">{c.events}</span>
              <div className="hidden w-24 items-center justify-end gap-2 sm:flex">
                <span className="h-1.5 w-12 overflow-hidden rounded-full bg-white/10">
                  <span className="block h-full rounded-full bg-primary" style={{ width: `${c.health}%` }} />
                </span>
                <span className="text-[11px] tabular-nums text-white/40">{c.health}%</span>
              </div>
              <div className="w-24 text-right">
                {isSync ? (
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-primary">
                    <span className="h-3 w-3 animate-spin rounded-full border-2 border-primary/30 border-t-primary" /> Syncing
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2 py-0.5 text-[11px] font-medium text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Connected
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* enterprise trust footer */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-white/3 px-5 py-2">
        {[
          { icon: ShieldCheck, label: "SAML SSO" },
          { icon: Check, label: "SOC 2 Type II" },
          { icon: Zap, label: "99.99% uptime" },
        ].map(t => (
          <span key={t.label} className="inline-flex items-center gap-1.5 text-[11px] font-medium text-white/40">
            <t.icon className="h-3.5 w-3.5 text-primary" /> {t.label}
          </span>
        ))}
        <span className="font-mono text-[10px] text-white/30">OAuth 2.0</span>
      </div>
    </div>
  )
}

/* ─── AI INTEGRATION MAP ──────────────────────────────────────────────────── */

const IM_W = 700, IM_H = 470, IM_CX = 350, IM_CY = 188

// 5 category nodes in a pentagon spread around the hub
const IM_NODES = [
  {
    id: "crm",        label: "CRM",          apps: ["HubSpot", "Salesforce", "Zoho CRM"],
    x: 148, y: 86,   status: "12 apps",     iconBg: "oklch(0.54 0.19 255)",
    pathOut: "M 350,188 C 290,155 208,112 148,86",
    pathIn:  "M 148,86 C 208,112 290,155 350,188",
    dotsOut: [0, 4.1], dotsIn: [2.0],
    floatDur: 8.2, floatDelay: 0,
  },
  {
    id: "helpdesk",   label: "Helpdesk",     apps: ["Freshdesk", "Zendesk", "Zoho Desk"],
    x: 552, y: 86,   status: "8 apps",      iconBg: "oklch(0.60 0.17 28)",
    pathOut: "M 350,188 C 410,155 492,112 552,86",
    pathIn:  "M 552,86 C 492,112 410,155 350,188",
    dotsOut: [1.3],    dotsIn: [3.4, 7.0],
    floatDur: 9.4, floatDelay: 1.4,
  },
  {
    id: "analytics",  label: "Analytics",    apps: ["Mixpanel", "Google Analytics", "Segment"],
    x: 600, y: 258,  status: "6 apps",      iconBg: "oklch(0.54 0.19 310)",
    pathOut: "M 350,188 C 434,208 548,240 600,258",
    pathIn:  "M 600,258 C 548,240 434,208 350,188",
    dotsOut: [0.7, 5.2], dotsIn: [2.8],
    floatDur: 7.6, floatDelay: 2.2,
  },
  {
    id: "automation", label: "Automation",   apps: ["Zapier", "Make", "Pabbly Connect"],
    x: 100, y: 258,  status: "9 apps",      iconBg: "oklch(0.56 0.17 148)",
    pathOut: "M 350,188 C 266,208 152,240 100,258",
    pathIn:  "M 100,258 C 152,240 266,208 350,188",
    dotsOut: [2.1],    dotsIn: [0.4, 4.8],
    floatDur: 8.8, floatDelay: 0.6,
  },
  {
    id: "comm",       label: "Communication", apps: ["Slack", "Intercom", "WhatsApp Business"],
    x: 350, y: 368,  status: "5 apps",      iconBg: "oklch(0.55 0.18 202)",
    pathOut: "M 350,188 C 350,258 350,318 350,368",
    pathIn:  "M 350,368 C 350,318 350,258 350,188",
    dotsOut: [1.6, 5.9], dotsIn: [3.7],
    floatDur: 9.0, floatDelay: 1.8,
  },
]

const IM_DOT_OUT_DUR  = 8.2
const IM_DOT_IN_DUR   = 8.8
const IM_PULSE_RADII  = [52, 82, 112]

function getIntBrand(name: string): Brand {
  const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "")
  const n = norm(name)
  return (
    BRANDS.find(b => norm(b.name) === n || b.key === n) ??
    { key: n, name, bg: "oklch(0.58 0.12 200)", fg: "#fff", letter: name[0].toUpperCase() }
  )
}

const TECH_STACKS = [
  {
    id: "crm",        label: "CRM",           iconBg: "oklch(0.54 0.19 255)", count: "12 apps",
    apps: [
      { name: "HubSpot",    desc: "Contacts, deals & lifecycle sync"  },
      { name: "Salesforce", desc: "Bi-directional enterprise CRM"     },
      { name: "Zoho CRM",   desc: "SMS triggers from lead stages"     },
    ],
  },
  {
    id: "helpdesk",   label: "Helpdesk",      iconBg: "oklch(0.60 0.17 28)",  count: "8 apps",
    apps: [
      { name: "Freshdesk", desc: "Reply via WhatsApp from one inbox" },
      { name: "Zendesk",   desc: "Convert SMS replies into tickets"  },
      { name: "Zoho Desk", desc: "Route & escalate conversations"    },
    ],
  },
  {
    id: "analytics",  label: "Analytics",     iconBg: "oklch(0.54 0.19 310)", count: "6 apps",
    apps: [
      { name: "Mixpanel",         desc: "Stream delivery & reply events"     },
      { name: "Google Analytics", desc: "Attribute conversions to campaigns" },
      { name: "Segment",          desc: "Pipe events to your data warehouse" },
    ],
  },
  {
    id: "automation", label: "Automation",    iconBg: "oklch(0.56 0.17 148)", count: "9 apps",
    apps: [
      { name: "Zapier",         desc: "Connect 6,000+ apps. No code"  },
      { name: "Make",           desc: "Visual multi-step scenario builder" },
      { name: "Pabbly Connect", desc: "Affordable automation flows"    },
    ],
  },
  {
    id: "comm",       label: "Communication", iconBg: "oklch(0.55 0.18 202)", count: "5 apps",
    apps: [
      { name: "Slack",             desc: "Route messages to channels"      },
      { name: "Intercom",          desc: "Bi-directional conversation sync" },
      { name: "WhatsApp Business", desc: "Native WhatsApp for teams"       },
    ],
  },
]

function TabSwitcher() {
  const [active, setActive] = useState(CATEGORIES[0].id)
  const [fading, setFading] = useState(false)
  const prev = useRef(active)

  const switchTab = (id: string) => {
    if (id === active) return
    setFading(true)
    setTimeout(() => {
      prev.current = id
      setActive(id)
      setFading(false)
    }, 140)
  }

  const cat = CATEGORIES.find(c => c.id === active)!

  return (
    <div>
      {/* Tab pills — horizontal scroll on mobile */}
      <div className="flex items-center gap-0.5 overflow-x-auto border-b border-border/60 pb-0 scrollbar-none">
        {CATEGORIES.map(c => {
          const isActive = c.id === active
          const accent = getIntBrand(c.cards[0].name)
          return (
            <button
              key={c.id}
              onClick={() => switchTab(c.id)}
              className={[
                "relative flex shrink-0 items-center gap-1.5 px-3 py-2.5 text-[12px] font-medium transition-colors duration-150 outline-none sm:px-3.5 sm:text-[12.5px]",
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              ].join(" ")}
            >
              <span
                className="h-[6px] w-[6px] shrink-0 rounded-full transition-opacity duration-150"
                style={{ background: accent.bg, opacity: isActive ? 1 : 0.4 }}
              />
              {c.label}
              {isActive && (
                <span
                  className="absolute inset-x-0 bottom-0 h-[2px] rounded-full"
                  style={{ background: accent.bg }}
                />
              )}
            </button>
          )
        })}
      </div>

      {/* Integration list */}
      <div
        className="mt-5 transition-opacity duration-[140ms]"
        style={{ opacity: fading ? 0 : 1 }}
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
          {cat.cards.map(card => {
            const b = getIntBrand(card.name)
            return (
              <div
                key={card.name}
                className="flex flex-col gap-2 rounded-xl border border-border/60 bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.05)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_18px_rgba(0,0,0,0.09)]"
              >
                <div className="flex items-center gap-2">
                  <span className="h-[10px] w-[10px] shrink-0 rounded-full" style={{ background: b.bg }} />
                  <p className="text-[14px] font-semibold text-foreground">{card.name}</p>
                </div>
                <p className="text-[12.5px] leading-snug text-muted-foreground">{card.desc}</p>
                <span className={["mt-auto inline-flex w-fit items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold", PLAN_STYLE[card.plan]].join(" ")}>
                  {card.plan}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Status line */}
      <div className="mt-6 flex items-center justify-between border-t border-border/40 pt-4 sm:mt-8">
        <p className="text-[12px] text-muted-foreground">
          <span className="font-medium text-foreground">40 integrations</span>
          {" · OAuth 2.0 · REST API · Webhooks"}
        </p>
        <Link
          href="/signup/"
          className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-primary hover:underline"
        >
          Browse all <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  )
}

function CategoryTabs() {
  const [shown, setShown] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) { setShown(true); return }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect() } }, { threshold: 0.08 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={wrapRef} className="mt-8">
      <TabSwitcher />
    </div>
  )
}

/* ─── BUILD YOUR OWN (code block w/ copy) ───────────────────────────────── */
function BuildYourOwn() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CODE)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch { /* clipboard unavailable */ }
  }

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
      <div>
        <Eyebrow n="03" label="Build your own" />
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Build your own integration.
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
          SMSLocal ships with a full REST API and webhook system. Available on every paid
          plan — start sending in minutes with ₹60 of free credit.
        </p>
        <ul className="mt-6 space-y-3">
          {API_BULLETS.map(b => (
            <li key={b} className="flex gap-3 text-[14px] leading-relaxed text-foreground/85">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={3} />
              {b}
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/signup/"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-sm transition hover:opacity-90">
            Get API Access <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/company/contact/"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition hover:border-primary/30">
            Talk to Sales
          </Link>
        </div>
      </div>

      {/* Code card */}
      <div className="overflow-hidden rounded-2xl border border-border bg-[oklch(0.16_0.02_232)] shadow-xl">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <span className="font-mono text-[12.5px] font-semibold text-white/80">
            POST /v1/messages
          </span>
          <button
            onClick={copy}
            className="inline-flex items-center gap-1.5 rounded-md border border-white/15 px-2.5 py-1 text-[11px] font-semibold text-white/70 transition hover:bg-white/10"
          >
            <Copy className="h-3 w-3" /> {copied ? "Copied" : "Copy"}
          </button>
        </div>
        <pre className="overflow-x-auto px-5 py-4 font-mono text-[12.5px] leading-[1.75] text-emerald-300/90 whitespace-pre">
{CODE}
        </pre>
        <div className="flex items-center gap-2 border-t border-white/10 px-4 py-2.5 text-[11.5px] font-mono">
          <span className="rounded bg-emerald-500/15 px-2 py-0.5 font-semibold text-emerald-400">201 Created</span>
          <span className="text-white/40">· 82ms</span>
          <Link href="/developers/api-docs/" className="ml-auto text-primary hover:underline">/docs</Link>
        </div>
      </div>
    </div>
  )
}

/* ─── TESTIMONIALS SLIDER ───────────────────────────────────────────────── */
function TestimonialsSlider() {
  return (
    <section className="bg-muted/30 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        {/* Heading */}
        <div className="text-center">
          <span className="inline-flex items-center rounded-full border border-border bg-background px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Testimonials
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Teams that switched, stayed.
          </h2>
          <p className="mt-3 text-[15px] text-muted-foreground">
            Honest quotes from teams who made the switch to SMSLocal.
          </p>
        </div>
      </div>

      {/* Marquee slider */}
      <div className="relative mt-12 overflow-hidden">
        <style>{`
          @keyframes int-stack-marquee {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
          .int-stack-track {
            animation: int-stack-marquee 30s linear infinite;
          }
          .int-stack-track:hover { animation-play-state: paused; }
          @media (prefers-reduced-motion: reduce) { .int-stack-track { animation: none; } }
        `}</style>
        <div className="int-stack-track flex w-max gap-5">
          {[...INT_TESTIMONIALS, ...INT_TESTIMONIALS, ...INT_TESTIMONIALS, ...INT_TESTIMONIALS].map((t, i) => (
            <div
              key={i}
              className="w-[300px] shrink-0 flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm sm:w-[340px]"
            >
              <svg width="28" height="20" viewBox="0 0 28 20" fill="none" aria-hidden className="mb-4 text-primary opacity-50">
                <path
                  d="M0 20V12.727C0 5.697 4.121 1.394 12.364 0l1.09 2.182C9.758 3.03 7.758 5.03 7.273 8.182H12V20H0ZM16 20V12.727C16 5.697 20.121 1.394 28.364 0l1.09 2.182c-3.696.848-5.696 2.848-6.181 6H28V20H16Z"
                  fill="currentColor"
                />
              </svg>
              <p className="flex-1 text-[14px] leading-relaxed text-foreground/85">{t.quote}</p>
              <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[12px] font-bold text-white"
                  style={{ background: t.color }}
                >
                  {t.initials}
                </span>
                <div>
                  <p className="text-[13px] font-semibold text-foreground">{t.name}</p>
                  <p className="text-[11.5px] text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── FAQ ───────────────────────────────────────────────────────────────── */
function Faq() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="mx-auto mt-12 max-w-3xl border-t border-border text-left">
      {FAQS.map((f, i) => {
        const isOpen = open === i
        return (
          <div key={i} className="border-b border-border">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-6 py-5 text-left transition-colors"
            >
              <span className={`text-[15px] font-semibold tracking-tight transition-colors sm:text-base ${isOpen ? "text-primary" : "text-foreground"}`}>
                {f.q}
              </span>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-180 text-primary" : ""}`}
              />
            </button>
            <div
              className="grid transition-all duration-300 ease-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="pb-5 pr-10 text-[14px] leading-relaxed text-muted-foreground">{f.a}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ─── MAIN ──────────────────────────────────────────────────────────────── */
export function IntegrationsStackPage({ hideHero }: { hideHero?: boolean } = {}) {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className={`relative overflow-hidden bg-[oklch(0.13_0.02_230)] py-10 sm:py-16${hideHero ? " hidden" : ""}`}>
        {/* dark glow blobs */}
        <div aria-hidden className="pointer-events-none absolute -top-32 left-[15%] h-[480px] w-[480px] rounded-full opacity-25 blur-3xl"
          style={{ background: "radial-gradient(circle, color-mix(in oklch, var(--primary) 50%, transparent), transparent 70%)" }} />
        <div aria-hidden className="pointer-events-none absolute -bottom-20 right-[10%] h-[320px] w-[320px] rounded-full opacity-15 blur-3xl"
          style={{ background: "radial-gradient(circle, oklch(0.72 0.17 165), transparent 70%)" }} />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-[12px] font-semibold text-primary">
              <Puzzle className="h-3.5 w-3.5" /> Integrations · 30+ apps · OAuth in one click
            </div>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-[48px] lg:leading-[1.06]">
              Connect SMSLocal to your{" "}
              <span style={{ background: "linear-gradient(135deg,var(--primary),oklch(0.72 0.17 165))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                stack.
              </span>
            </h2>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/60">
              Shopify, HubSpot, Salesforce, Slack, Zapier and more — 1-click OAuth on Starter.
              Plus 10 native channels (SMS, WhatsApp, RCS, OTP) and a full REST API.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Shopify on Starter", "OAuth 2.0", "REST API + Webhooks", "SAML SSO on Enterprise"].map(t => (
                <span key={t} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[12.5px] font-medium text-white/80">
                  <Check className="h-3.5 w-3.5 text-primary" /> {t}
                </span>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Link href="/signup/"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-[14px] font-bold text-primary-foreground shadow-lg shadow-primary/30 transition hover:-translate-y-0.5 hover:opacity-90">
                Start Free <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/pricing/"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-[14px] font-semibold text-white transition hover:border-primary/40 hover:bg-white/10">
                See all plans
              </Link>
            </div>
            <p className="mt-3 text-[12.5px] text-white/40">
              Full REST API on every paid plan. App integrations unlock on Starter — ₹60 free credit to test live.
            </p>
          </div>

          {/* Integrations showcase — icon grid + live spotlight */}
          <IntegrationsShowcase />
        </div>
      </section>

      {/* ── /01 CATEGORIES ────────────────────────────────────────────── */}
      <section className="border-t border-border bg-muted/30 py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Eyebrow n="01" label="By category" />
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">App integrations.</h2>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
            Connect the tools your team already uses. Hover a tab to switch category.
          </p>
          <CategoryTabs />
        </div>
      </section>

      {/* ── /02 NATIVE CHANNELS ──────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white py-16 sm:py-24">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-8">

            {/* Left — heading text */}
            <div className="w-full shrink-0 text-left lg:w-[42%]">
              <Eyebrow n="02" label="No connector needed" />
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">10 channels built in.</h2>
              <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-muted-foreground">
                Native to SMSLocal — no third-party connectors needed.
              </p>
            </div>

            {/* Right — channel icon grid */}
            <div className="w-full lg:flex-1">
              <div className="grid grid-cols-5 gap-3 sm:gap-4">
                {NATIVE_CHANNELS.map((ch, i) => (
                  <div
                    key={ch.name}
                    className="group flex flex-col items-center gap-3 rounded-2xl border border-border/60 bg-white p-4 sm:p-6 shadow-[0_2px_8px_rgba(0,0,0,0.05)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.10)]"
                    style={{ animationDelay: `${i * 0.08}s` }}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/8 sm:h-12 sm:w-12">
                      <ch.Icon className="h-5 w-5 text-primary sm:h-6 sm:w-6" />
                    </div>
                    <span className="text-center text-[11px] font-medium leading-tight text-muted-foreground sm:text-[13px]">
                      {ch.name}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-center text-[13px] text-muted-foreground/50">
                + more channels coming soon
              </p>
            </div>
          </div>{/* end flex row */}
        </div>
      </section>

      {/* ── /03 BUILD YOUR OWN ────────────────────────────────────────── */}
      <section className="border-t border-border bg-muted/30 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <BuildYourOwn />
        </div>
      </section>

      {/* ── TESTIMONIALS SLIDER ───────────────────────────────────────── */}
      <TestimonialsSlider />

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <section className="bg-background py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <span className="inline-flex rounded-full border border-border bg-muted px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">FAQ</span>
          <h2 className="mt-5 text-pretty text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[44px]">Zapier, DLT, custom CRMs, SSO — straight answers.</h2>
          <Faq />
          <p className="mt-8 text-[14px] text-muted-foreground">
            More questions?{" "}
            <Link href="/company/contact/" className="font-semibold text-primary hover:underline">Talk to us</Link>{" "}
            or check the{" "}
            <Link href="/resources/help/" className="font-semibold text-primary hover:underline">Help Center</Link>.
          </p>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-t border-border bg-gradient-to-br from-primary/5 via-background to-primary/10 py-16">
        <div aria-hidden className="pointer-events-none absolute -top-24 left-1/2 h-[420px] w-[620px] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle, color-mix(in oklch, var(--primary) 22%, transparent), transparent 70%)" }} />
        <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-widest text-primary">
            <Sparkles className="h-3 w-3" /> Start · Free, no credit card
          </span>
          <h2 className="mt-6 text-4xl font-black tracking-tight text-foreground sm:text-5xl">Ready to connect your stack?</h2>
          <p className="mt-4 text-[17px] text-muted-foreground">Start free. Full REST API on every paid plan. ₹60 credit on signup.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/signup/" className="inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-4 text-[15px] font-bold text-primary-foreground shadow-lg transition hover:-translate-y-0.5 hover:opacity-90">
              <Zap className="h-4 w-4" /> Start Free
            </Link>
            <Link href="/pricing/" className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-7 py-4 text-[15px] font-semibold text-foreground shadow-sm transition hover:-translate-y-0.5 hover:border-primary/30">
              See all plans <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-9 flex flex-wrap justify-center gap-x-8 gap-y-3">
            {["30+ app integrations", "10 native channels", "REST API on Starter", "SAML SSO on Enterprise"].map(t => (
              <span key={t} className="flex items-center gap-2 text-[13px] font-semibold text-muted-foreground">
                <Check className="h-4 w-4 text-primary" /> {t}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
