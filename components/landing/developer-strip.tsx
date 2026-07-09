"use client"

import { useState } from "react"
import { ArrowRight, Check, Terminal } from "lucide-react"
import { Reveal } from "./reveal"

const FEATURES = [
  "REST API with GET and POST",
  "SDKs: PHP · Java · Python · Node.js · C# · JavaScript",
  "Webhooks for delivery reports and inbound replies",
  "Sandbox mode with ₹60 free credit",
]

const SNIPPETS = {
  "Node.js": {
    file: "send-sms.ts",
    code: `// Send an SMS with the SMSLocal API
const res = await fetch("https://api.smslocal.in/v1/send", {
  method: "POST",
  headers: {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    sender_id: "SMSLCL",
    template_id: "DLT_TEMPLATE_ID",
    to: "+919876543210",
    variables: { otp: "482913" }
  })
});
`,
  },
  Python: {
    file: "send_sms.py",
    code: `# Send an SMS with the SMSLocal API
import requests

requests.post("https://api.smslocal.in/v1/send",
  headers={"Authorization": "Bearer YOUR_API_KEY"},
  json={
    "sender_id": "SMSLCL",
    "template_id": "DLT_TEMPLATE_ID",
    "to": "+919876543210",
    "variables": {"otp": "482913"}
  })
`,
  },
  cURL: {
    file: "send-sms.sh",
    code: `# Send an SMS with the SMSLocal API
curl -X POST https://api.smslocal.in/v1/send \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"sender_id":"SMSLCL","template_id":"DLT_TEMPLATE_ID","to":"+919876543210"}'
`,
  },
} as const

type Lang = keyof typeof SNIPPETS

export function DeveloperStrip() {
  const [lang, setLang] = useState<Lang>("Node.js")
  const snip = SNIPPETS[lang]

  return (
    <section id="developers" className="relative overflow-hidden bg-[oklch(0.14_0.02_230)] py-20 text-white sm:py-24">
      <div aria-hidden className="pointer-events-none absolute -top-24 right-0 h-[480px] w-[480px] rounded-full opacity-40 blur-3xl" style={{ background: "radial-gradient(circle, color-mix(in oklch, var(--primary) 45%, transparent), transparent 70%)" }} />
      <div aria-hidden className="bg-grid-ink absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]" />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <Reveal>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-white/80">
            <Terminal className="h-3 w-3" /> Developers
          </span>
          <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-[44px] lg:leading-[1.1]">
            Built for{" "}
            <span className="bg-gradient-to-r from-primary to-[oklch(0.78_0.14_180)] bg-clip-text text-transparent">developers</span>
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-white/70">Send your first SMS in five minutes. API keys live the moment you sign up.</p>

          <ul className="mt-6 space-y-2.5">
            {FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-[14px] text-white/85">
                <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary"><Check className="h-2.5 w-2.5" strokeWidth={3} /></span>
                {f}
              </li>
            ))}
          </ul>

          <a href="/developers" className="group mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/10">
            View API Docs <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </Reveal>

        {/* Code card with language tabs */}
        <Reveal delay={120} className="relative">
          <div aria-hidden className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-primary/40 via-transparent to-accent/30 opacity-60 blur-lg" />
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[oklch(0.11_0.02_230)] shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/5 px-4 py-2.5">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
              </div>
              <span className="font-mono text-[11px] text-white/50">{snip.file}</span>
              <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] text-white/70">POST /v1/send</span>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 border-b border-white/5 px-3 pt-2.5">
              {(Object.keys(SNIPPETS) as Lang[]).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLang(l)}
                  aria-pressed={l === lang}
                  className={`rounded-t-md px-3 py-1.5 text-[12px] font-medium transition ${l === lang ? "bg-white/10 text-white" : "text-white/50 hover:text-white/80"}`}
                >
                  {l}
                </button>
              ))}
            </div>

            <pre className="overflow-x-auto px-5 py-5 font-mono text-[12.5px] leading-relaxed text-white/85">
              <code>{highlightCode(snip.code)}</code>
            </pre>
          </div>
          <p className="mt-3 text-right text-[11px] text-white/50">Snippet illustrative — confirm exact payload with live API docs.</p>
        </Reveal>
      </div>
    </section>
  )
}

function highlightCode(code: string): React.ReactNode {
  return code.split("\n").map((line, i) => {
    let parts: React.ReactNode[]
    const trimmed = line.trim()
    if (trimmed.startsWith("//") || trimmed.startsWith("#")) {
      parts = [<span key="c" className="text-white/40">{line}</span>]
    } else {
      parts = []
      const re = /("(?:[^"\\]|\\.)*")/g
      let last = 0
      let m: RegExpExecArray | null
      while ((m = re.exec(line)) !== null) {
        if (m.index > last) parts.push(<span key={`k${last}`}>{highlightKeywords(line.slice(last, m.index))}</span>)
        parts.push(<span key={`s${m.index}`} className="text-[oklch(0.82_0.14_82)]">{m[0]}</span>)
        last = m.index + m[0].length
      }
      if (last < line.length) parts.push(<span key={`e${last}`}>{highlightKeywords(line.slice(last))}</span>)
    }
    return <span key={i}>{parts}{"\n"}</span>
  })
}

function highlightKeywords(text: string): React.ReactNode {
  const kwRe = /\b(const|await|fetch|method|headers|body|JSON|stringify|import|requests|curl|post)\b/g
  const parts: React.ReactNode[] = []
  let last = 0
  let m: RegExpExecArray | null
  while ((m = kwRe.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index))
    parts.push(<span key={m.index} className="text-[oklch(0.78_0.14_180)]">{m[0]}</span>)
    last = m.index + m[0].length
  }
  if (last < text.length) parts.push(text.slice(last))
  return <>{parts}</>
}
