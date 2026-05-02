import { ArrowRight, CheckCircle2, Code2, FileCode2, Terminal } from "lucide-react"

const LINES = [
  { n: 1, t: "$ ", c: "curl -X POST https://api.smslocal.in/v1/messages \\", cls: "text-white/85" },
  { n: 2, t: "  ", c: "-H 'Authorization: Bearer sk_live_xxx' \\", cls: "text-white/60" },
  { n: 3, t: "  ", c: "-H 'Content-Type: application/json' \\", cls: "text-white/60" },
  { n: 4, t: "  ", c: "-d '{", cls: "text-white/60" },
  { n: 5, t: "    ", c: '"sender": "SMSLCL",', cls: "text-emerald-300" },
  { n: 6, t: "    ", c: '"to": ["+919876543210"],', cls: "text-emerald-300" },
  { n: 7, t: "    ", c: '"template_id": "1407123456...",', cls: "text-emerald-300" },
  { n: 8, t: "    ", c: '"variables": { "order_id": "A7K9" }', cls: "text-emerald-300" },
  { n: 9, t: "  ", c: "}'", cls: "text-white/60" },
]

const TAB_PILLS = [
  { icon: Terminal, label: "cURL", active: true },
  { icon: Code2, label: "Node.js" },
  { icon: FileCode2, label: "Python" },
]

export function SmsApiVisual() {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-6 -z-10 rounded-[28px] opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklch, var(--primary) 35%, transparent), transparent 70%)",
        }}
      />

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[oklch(0.12_0.02_230)]/95 shadow-2xl">
        {/* Tab chrome */}
        <div className="flex items-center justify-between border-b border-white/10 bg-black/30 px-3 py-2">
          <div className="flex items-center gap-1">
            {TAB_PILLS.map((tab) => {
              const Icon = tab.icon
              return (
                <span
                  key={tab.label}
                  className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[11.5px] font-medium transition ${
                    tab.active ? "bg-white/10 text-white" : "text-white/55"
                  }`}
                >
                  <Icon className="h-3 w-3" />
                  {tab.label}
                </span>
              )
            })}
          </div>
          <span className="font-mono text-[10.5px] text-white/40">POST /v1/messages</span>
        </div>

        {/* Request body */}
        <div className="px-5 py-4 font-mono text-[12px] leading-relaxed">
          {LINES.map((line) => (
            <div key={line.n} className="flex">
              <span className="mr-3 w-5 shrink-0 select-none text-right text-white/25">{line.n}</span>
              <pre className={line.cls}>
                <span className="text-white/30">{line.t}</span>
                {line.c}
              </pre>
            </div>
          ))}
        </div>

        {/* Response */}
        <div className="border-t border-white/10 bg-black/30 px-5 py-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/45">
            Response
          </p>
          <div className="mt-2 font-mono text-[12px] text-white/75">
            <span className="text-emerald-400">202 Accepted</span>{" "}
            <span className="text-white/40">·</span>{" "}
            <span className="text-white/70">
              {
                '{ "message_id": "msg_01HK9YX", "status": "queued", "estimated_delivery": "2.1s" }'
              }
            </span>
          </div>
        </div>

        {/* Webhook strip */}
        <div className="border-t border-white/10 bg-[oklch(0.16_0.02_230)] px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-emerald-400/40 bg-emerald-400/15 text-emerald-400">
              <CheckCircle2 className="h-3.5 w-3.5" />
            </span>
            <div className="flex-1">
              <p className="font-mono text-[11.5px] text-white/55">webhook · /delivery</p>
              <p className="text-[13px] font-semibold text-white">
                Delivered · Jio primary route · 1.8s
              </p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10.5px] font-semibold text-white/70">
              DLT verified <ArrowRight className="h-2.5 w-2.5" />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
