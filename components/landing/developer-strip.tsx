import Link from "next/link"
import { ArrowRight, Check, Terminal } from "lucide-react"

const FEATURES = [
  "REST API with GET and POST",
  "SDKs: PHP · Java · Python · Node.js · C# · JavaScript",
  "Webhooks for delivery reports and inbound replies",
  "Sandbox mode with ₹60 free credit",
]

const SNIPPET = `// Send an SMS with the SMSLocal API
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

// Delivery reports arrive at your webhook
`

export function DeveloperStrip() {
  return (
    <section
      id="developers"
      className="relative overflow-hidden bg-[oklch(0.14_0.02_230)] py-20 text-white sm:py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-0 h-[480px] w-[480px] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklch, var(--primary) 45%, transparent), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="bg-grid-ink absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]"
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-white/80">
            <Terminal className="h-3 w-3" />
            Developers
          </span>
          <h2 className="mt-4 text-pretty text-3xl font-semibold tracking-tight sm:text-4xl">
            Built for developers.
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-white/70">
            Send your first SMS in five minutes. API keys live the moment you sign up.
          </p>

          <ul className="mt-6 space-y-2.5">
            {FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-[14px] text-white/85">
                <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                  <Check className="h-2.5 w-2.5" strokeWidth={3} />
                </span>
                {f}
              </li>
            ))}
          </ul>

          <Link
            href="/developers/api-docs"
            className="group mt-8 inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/10"
          >
            View API Docs
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Code card */}
        <div className="relative">
          <div
            aria-hidden
            className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-primary/40 via-transparent to-accent/30 opacity-60 blur-lg"
          />
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[oklch(0.11_0.02_230)] shadow-2xl">
            {/* Card header */}
            <div className="flex items-center justify-between border-b border-white/5 px-4 py-2.5">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
              </div>
              <span className="font-mono text-[11px] text-white/50">send-sms.ts</span>
              <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] text-white/70">
                POST /v1/send
              </span>
            </div>
            <pre className="overflow-x-auto px-5 py-5 font-mono text-[12.5px] leading-relaxed text-white/85">
              <code>{highlightCode(SNIPPET)}</code>
            </pre>
          </div>
          <p className="mt-3 text-right text-[11px] text-white/50">
            Snippet illustrative — confirm exact payload with live API docs before publishing.
          </p>
        </div>
      </div>
    </section>
  )
}

/**
 * Very lightweight syntax highlighting for the code snippet.
 * We wrap keywords, strings, and comments in spans with Tailwind text colors.
 * This is not a full parser — just enough polish for the marketing section.
 */
function highlightCode(code: string): React.ReactNode {
  const tokens: React.ReactNode[] = []
  const lines = code.split("\n")
  lines.forEach((line, i) => {
    const parts: React.ReactNode[] = []
    // Comments
    if (line.trim().startsWith("//")) {
      parts.push(
        <span key="c" className="text-white/40">
          {line}
        </span>,
      )
    } else {
      // Split on strings
      const re = /("(?:[^"\\]|\\.)*")/g
      let last = 0
      let m: RegExpExecArray | null
      while ((m = re.exec(line)) !== null) {
        if (m.index > last) {
          parts.push(
            <span key={`k${last}`} className="text-white/85">
              {highlightKeywords(line.slice(last, m.index))}
            </span>,
          )
        }
        parts.push(
          <span key={`s${m.index}`} className="text-[oklch(0.82_0.14_82)]">
            {m[0]}
          </span>,
        )
        last = m.index + m[0].length
      }
      if (last < line.length) {
        parts.push(
          <span key={`e${last}`} className="text-white/85">
            {highlightKeywords(line.slice(last))}
          </span>,
        )
      }
    }
    tokens.push(
      <span key={i}>
        {parts}
        {"\n"}
      </span>,
    )
  })
  return tokens
}

function highlightKeywords(text: string): React.ReactNode {
  const kwRe = /\b(const|await|fetch|method|headers|body|JSON|stringify)\b/g
  const parts: React.ReactNode[] = []
  let last = 0
  let m: RegExpExecArray | null
  while ((m = kwRe.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index))
    parts.push(
      <span key={m.index} className="text-[oklch(0.78_0.14_180)]">
        {m[0]}
      </span>,
    )
    last = m.index + m[0].length
  }
  if (last < text.length) parts.push(text.slice(last))
  return <>{parts}</>
}
