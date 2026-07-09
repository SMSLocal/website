import type { Metadata } from "next"
import { getPageMetadata } from "@/lib/seo"
import { AlertTriangle, Building2, CheckCircle2, Clock, Code2, Fingerprint, Globe2, Lock, MessageSquare, Receipt, RefreshCw, Route, ShieldCheck, Smartphone, Timer, Users, Zap } from 'lucide-react'
import { AnnouncementStrip } from "@/components/landing/announcement-strip"
import { SiteHeader } from "@/components/landing/site-header"
import { SiteFooter } from "@/components/landing/site-footer"
import { RelatedContent } from "@/components/shared/related-content"
import {
  ProductHero,
  LogosStrip,
  FeatureGrid,
  BulletList,
  CompareTable,
  HowItWorks,
  UseCaseGrid,
  StatsBand,
  Faq,
  ProductEditorialBand,
  ProductFinalCta,
  Section,
  SectionHeader,
} from "@/components/product/product-page"
import { OtpVisual } from "@/components/product/otp-visual"
import { CodeTabs } from "@/components/product/code-tabs"
import { BreadcrumbJsonLd, ProductServiceJsonLd } from "@/components/seo/json-ld"

// ─── SEO — edit lib/seo/registry.ts or open /dev/seo to preview ──────────────
export const metadata: Metadata = getPageMetadata("/products/otp-sms")

const NODE_CODE = `import fetch from "node-fetch"

const res = await fetch("https://api.smslocal.in/v1/otp/send", {
  method: "POST",
  headers: {
    "Authorization": "Bearer " + process.env.SMSLOCAL_API_KEY,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    to: "+919876543210",
    template_id: "OTP_LOGIN_V1",
    sender_id: "SMSLCL",
    variables: { otp: "482915", minutes: 10 },
  }),
})

const data = await res.json()
console.log(data.message_id, data.status)`

const PYTHON_CODE = `import os, requests

res = requests.post(
    "https://api.smslocal.in/v1/otp/send",
    headers={
        "Authorization": f"Bearer {os.environ['SMSLOCAL_API_KEY']}",
        "Content-Type": "application/json",
    },
    json={
        "to": "+919876543210",
        "template_id": "OTP_LOGIN_V1",
        "sender_id": "SMSLCL",
        "variables": {"otp": "482915", "minutes": 10},
    },
)

print(res.json())`

const PHP_CODE = `<?php
$ch = curl_init("https://api.smslocal.in/v1/otp/send");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Authorization: Bearer " . getenv("SMSLOCAL_API_KEY"),
    "Content-Type: application/json",
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
    "to" => "+919876543210",
    "template_id" => "OTP_LOGIN_V1",
    "sender_id" => "SMSLCL",
    "variables" => ["otp" => "482915", "minutes" => 10],
]));

$response = curl_exec($ch);
curl_close($ch);
echo $response;`

export default function OtpSmsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <ProductServiceJsonLd
        name="OTP SMS API"
        description="Priority OTP routes, sub-second delivery on Indian operators, DLT-compliant templates, and retry/fallback logic for login, signup and transaction flows."
        path="/products/otp-sms"
        category="Authentication & verification messaging"
      />
      <BreadcrumbJsonLd
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
          { name: "OTP SMS API", path: "/products/otp-sms" },
        ]}
      />      <SiteHeader />
      <main className="flex-1">
        <ProductHero
          compact
          eyebrow="OTP SMS API"
          title="OTP delivery that your users actually receive — on the first try."
          description="Priority routes to Indian operators, DLT-compliant templates, automatic fallbacks, and a simple API that your team can ship in an afternoon. Built for login, signup, payment, and high-value transaction flows."
          primaryCta={{ label: "Get OTP API keys", href: "/signup" }}
          secondaryCta={{ label: "Read the docs", href: "/developers/api-docs" }}
          trustItems={[
            "Sub-second typical delivery",
            "DLT-compliant templates",
            "Priority OTP routes",
            "Automatic retry & fallback",
          ]}
          visual={<OtpVisual />}
        />

        <LogosStrip label="Powering authentication across Indian fintech, e-commerce, logistics and SaaS" count={7} />

        <Section>
          <SectionHeader
            eyebrow="Why OTP on SMSLocal"
            title="Authentication infrastructure your security team can defend."
            description="OTPs are on the critical path of your signup and checkout funnels. A 2-second delay costs you conversions; a failed delivery costs you the user entirely. SMSLocal is engineered for the boring, unglamorous reliability those flows need."
          />
          <FeatureGrid
            items={[
              { icon: <Zap className="h-5 w-5" />, title: "Priority operator routes", description: "OTP traffic is routed on transactional-priority paths with the major Indian carriers — separate from promotional queues." },
              { icon: <Timer className="h-5 w-5" />, title: "Sub-second delivery target", description: "Typical delivery completes in under a second across major operators under normal network conditions." },
              { icon: <ShieldCheck className="h-5 w-5" />, title: "DLT-compliant templates", description: "Pre-approved OTP template library plus an in-dashboard template workflow aligned to TRAI DLT norms." },
              { icon: <RefreshCw className="h-5 w-5" />, title: "Automatic retry & fallback", description: "Configurable retry logic and secondary routes kick in automatically on operator timeouts or failures." },
              { icon: <Lock className="h-5 w-5" />, title: "Tamper-resistant delivery", description: "Signed webhooks, TLS everywhere, and per-key scoping keep OTP pipelines isolated from marketing traffic." },
              { icon: <Route className="h-5 w-5" />, title: "Smart route selection", description: "Dynamic route scoring picks the fastest, most reliable operator path per number range in real time." },
            ]}
          />
        </Section>

        <Section tone="muted">
          <SectionHeader
            eyebrow="How OTP flows work"
            title="From API call to delivered code in four steps."
          />
          <HowItWorks
            steps={[
              { icon: <Code2 className="h-5 w-5" />, title: "Call the OTP API", description: "POST to /v1/otp/send with a phone number, DLT template ID, and variables. Returns a message ID you can use for tracking." },
              { icon: <Route className="h-5 w-5" />, title: "Route scoring picks a path", description: "Our router picks the best priority operator route for that number range based on live success and latency data." },
              { icon: <Smartphone className="h-5 w-5" />, title: "Delivery to the handset", description: "The SMS is delivered directly to the user's device over a transactional-priority path that never competes with promotional traffic for operator bandwidth." },
              { icon: <CheckCircle2 className="h-5 w-5" />, title: "Webhook confirms delivery", description: "A signed delivery webhook hits your endpoint with the final status — delivered, failed, or expired." },
            ]}
          />
        </Section>

        <Section>
          <SectionHeader
            eyebrow="Developer experience"
            title="Integrate in minutes, not sprints."
            description="A single REST endpoint, an API key, and a DLT template. That is all you need to ship OTPs to production. Idiomatic snippets in the languages your stack already runs."
          />
          <CodeTabs
            tabs={[
              { label: "Node.js", language: "javascript", code: NODE_CODE },
              { label: "Python", language: "python", code: PYTHON_CODE },
              { label: "PHP", language: "php", code: PHP_CODE },
            ]}
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <BulletList
              title="Built-in verification"
              items={[
                "Optional /verify endpoint validates the OTP server-side so you never store it.",
                "Configurable code length, alphabet, and expiry window per template.",
                "Per-user rate limits and cooldowns prevent brute-force and enumeration.",
              ]}
            />
            <BulletList
              title="Production signals"
              items={[
                "Signed webhooks for every status transition — sent, delivered, failed, expired.",
                "Per-number and per-template delivery dashboards in real time.",
                "Exportable delivery reports for audit, reconciliation, and BI pipelines.",
              ]}
            />
            <BulletList
              title="Safe by default"
              items={[
                "Scoped API keys per environment — dev, staging, and production are isolated.",
                "IP allowlists and per-key rate limits available on all paid plans.",
                "Automatic PII redaction in logs; full request payloads available on enterprise plans.",
              ]}
            />
          </div>
        </Section>

        <Section tone="muted">
          <SectionHeader
            eyebrow="Feature depth"
            title="Everything an auth team needs — nothing it does not."
          />
          <FeatureGrid
            items={[
              { icon: <Fingerprint className="h-5 w-5" />, title: "Template versioning", description: "Clone, A/B test, and roll out OTP templates with full version history — every old version stays linked to the messages it sent so audit and recon never drift." },
              { icon: <AlertTriangle className="h-5 w-5" />, title: "Fraud velocity controls", description: "Per-IP, per-user, and per-number rate limits with configurable cooldowns and exponential backoff." },
              { icon: <Globe2 className="h-5 w-5" />, title: "Indian + international", description: "Optimised for Indian carriers out of the box with global delivery available on request for cross-border flows." },
              { icon: <Clock className="h-5 w-5" />, title: "Configurable expiry", description: "Set code validity per template, from 30 seconds for high-risk flows up to 15 minutes for slower UX flows." },
              { icon: <MessageSquare className="h-5 w-5" />, title: "WhatsApp fallback", description: "Automatically fall back from SMS to WhatsApp OTP on delivery failure (enterprise plans)." },
              { icon: <Receipt className="h-5 w-5" />, title: "Transparent billing", description: "Per-SMS pricing with no markups on failed deliveries and consolidated monthly invoicing with GST." },
            ]}
          />
        </Section>

        <Section>
          <SectionHeader
            eyebrow="Compared to alternatives"
            title="Why teams move OTP traffic onto SMSLocal."
          />
          <CompareTable
            columns={["SMSLocal OTP API", "General SMS gateways", "In-app-only OTP"]}
            rows={[
              { label: "Priority operator routes", values: ["Yes — dedicated transactional lanes", "Mixed with promotional traffic", "Not applicable"] },
              { label: "DLT template workflow", values: ["Built into dashboard", "Partial — often manual", "Not applicable"] },
              { label: "Typical delivery latency", values: ["Sub-second on major carriers", "Variable, often seconds to minutes", "Dependent on push reliability"] },
              { label: "Retry & fallback logic", values: ["Automatic, configurable", "Usually manual", "Not applicable"] },
              { label: "Signed delivery webhooks", values: ["Yes, HMAC-signed", "Varies by vendor", "N/A"] },
              { label: "Indian support coverage", values: ["India-based, product-trained team", "Often offshore", "N/A"] },
            ]}
          />
        </Section>

        <ProductEditorialBand
          layout="split"
          src="/products/otp-sms-delivery-performance-dashboard.png"
          imageWidth={1400}
          imageHeight={541}
          alt="SMSLocal OTP SMS delivery performance dashboard showing 2.3-second delivery speed, a 99.6% success rate and per-channel performance across WhatsApp, SMS, voice and email, with smart routing, auto-retries and WhatsApp fallback."
          eyebrow="The critical 30 seconds"
          headline="Every OTP is a trust decision. Make it instant, make it arrive."
          caption="Fastest-route selection, automatic retries, and WhatsApp fallback on enterprise — built around the one metric that matters: sub-5-second delivery."
        />

        <Section tone="muted">
          <SectionHeader
            eyebrow="Use cases"
            title="Where OTP SMS is the critical path."
          />
          <UseCaseGrid
            items={[
              { icon: <Building2 className="h-5 w-5" />, title: "Fintech & banking", description: "Login, high-value transactions, UPI confirmations, and KYC verification flows." },
              { icon: <Users className="h-5 w-5" />, title: "E-commerce & D2C", description: "Signup, guest checkout verification, COD confirmation, and account recovery." },
              { icon: <Smartphone className="h-5 w-5" />, title: "SaaS & mobile apps", description: "Passwordless login, 2FA enrollment, device pairing, and sensitive setting changes." },
              { icon: <ShieldCheck className="h-5 w-5" />, title: "Healthcare & govt.", description: "Appointment confirmations, teleconsultation access codes, and citizen service flows." },
            ]}
          />
        </Section>

        <Section>
          <StatsBand
            items={[
              { value: "Sub-1s", label: "typical OTP delivery on major Indian carriers" },
              { value: "99.99%", label: "platform uptime, measured monthly" },
              { value: "24/7", label: "priority routing for DND and non-DND numbers" },
              { value: "Minutes", label: "from API key to first OTP in production" },
            ]}
          />
        </Section>

        <Section tone="muted">
          <SectionHeader eyebrow="FAQs" title="OTP SMS, answered." />
          <Faq
            items={[
              { q: "How is OTP delivery different from regular bulk SMS?", a: "OTP traffic is routed on transactional-priority paths, uses pre-approved DLT templates, includes built-in retry and fallback logic, and is isolated from promotional queues so it does not compete with marketing blasts for operator bandwidth." },
              { q: "Do I need to register DLT templates myself?", a: "You need a registered DLT header and template, yes — but our dashboard walks you through it and we maintain a library of common OTP templates you can clone and customise." },
              { q: "What happens if the user's phone is off or out of coverage?", a: "Operator-side stores hold the SMS for up to 24 hours and re-attempt delivery as soon as the handset is reachable. Our routing layer surfaces a 'pending' status in your dashboard and fires a webhook once the final state is known — delivered, expired, or failed — so your retry logic can decide when to send a second OTP without the user receiving two at once." },
              { q: "Can SMSLocal generate and verify the OTP for me?", a: "Yes. You can either generate the code yourself and pass it in, or use our managed /send + /verify endpoints where we generate the code, handle expiry, and verify server-side so you never store the OTP." },
              { q: "Is OTP SMS secure for high-value transactions?", a: "OTP SMS is industry standard for banking, payments, and government flows in India, and we add signed webhooks, per-key scoping, IP allowlists, and rate limiting on top. For very high-risk flows we recommend combining OTP with additional signals like device fingerprinting." },
              { q: "What about fallback to WhatsApp?", a: "On our enterprise plan, failed SMS OTP attempts can automatically fall back to WhatsApp OTP for WhatsApp-active users, maximising delivery success across networks." },
            ]}
          />
        </Section>

        <RelatedContent path="/products/otp-sms" />

        <Section>
          <ProductFinalCta
            title="Give your users OTPs that just work."
            description="Get an API key in minutes, ship OTPs in an afternoon, and stop losing signups to bad delivery."
            primaryCta={{ label: "Get OTP API keys", href: "/signup" }}
            secondaryCta={{ label: "Talk to our team", href: "/company/contact" }}
          />
        </Section>
      </main>
      <SiteFooter />
    </div>
  )
}
