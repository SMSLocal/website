import { CheckCircle2, Send } from 'lucide-react'

export function QuickSmsVisual() {
  return (
    <div className="relative">
      <div className="absolute -inset-8 rounded-[2rem] bg-gradient-to-br from-primary/20 via-accent/10 to-transparent blur-2xl" aria-hidden />
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/80 shadow-2xl backdrop-blur">
        {/* Window chrome */}
        <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-5 py-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          </div>
          <span className="text-xs font-medium text-white/60">Quick Send</span>
          <span className="text-[10px] uppercase tracking-widest text-white/40">No code</span>
        </div>

        <div className="grid gap-5 p-6 md:grid-cols-2">
          {/* Compose form */}
          <div className="space-y-4">
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-widest text-white/50">Sender ID</label>
              <div className="mt-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90">SMSLCL</div>
            </div>
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-widest text-white/50">Recipients</label>
              <div className="mt-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90">
                <span className="text-emerald-300">1,284 numbers</span>
                <span className="text-white/40"> · imported from CSV</span>
              </div>
            </div>
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-widest text-white/50">Message</label>
              <div className="mt-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm leading-relaxed text-white/90">
                Hi {"{{name}}"}, your order #{"{{order_id}}"} has shipped. Track it here: {"{{url}}"} — Team SMSLocal
              </div>
              <div className="mt-2 flex items-center justify-between text-[11px] text-white/40">
                <span>DLT template: ORDER_SHIPPED_V2</span>
                <span>128 / 160 chars</span>
              </div>
            </div>
            <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20" type="button">
              <Send className="h-4 w-4" aria-hidden />
              Send to 1,284 numbers
            </button>
          </div>

          {/* Preview + status */}
          <div className="space-y-3">
            <div className="rounded-xl border border-white/10 bg-gradient-to-br from-emerald-400/10 to-transparent p-4">
              <div className="text-[11px] font-semibold uppercase tracking-widest text-emerald-300/80">Preview</div>
              <div className="mt-3 rounded-lg bg-slate-950/60 p-3 text-xs leading-relaxed text-white/90">
                Hi <span className="text-emerald-300">Priya</span>, your order{" "}
                <span className="text-emerald-300">#SL-48219</span> has shipped. Track it here:{" "}
                <span className="text-emerald-300">smsl.in/t/4821</span> — Team SMSLocal
              </div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-[11px] font-semibold uppercase tracking-widest text-white/50">Delivery in progress</div>
              <div className="mt-3 space-y-2.5">
                {[
                  { n: "1,284", l: "Queued", c: "text-white/70" },
                  { n: "1,201", l: "Delivered", c: "text-emerald-300" },
                  { n: "12", l: "Failed · auto-retry", c: "text-amber-300" },
                ].map((row) => (
                  <div key={row.l} className="flex items-center justify-between rounded-md bg-black/20 px-3 py-2 text-xs">
                    <span className="text-white/60">{row.l}</span>
                    <span className={`font-semibold ${row.c}`}>{row.n}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-400/5 px-3 py-2 text-xs text-emerald-200">
              <CheckCircle2 className="h-4 w-4" aria-hidden />
              <span>93.5% delivered in the first 2 seconds</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
