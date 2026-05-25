import {
  Bot,
  CheckCheck,
  Globe,
  Phone,
  SendHorizontal,
  ShieldCheck,
  Sparkles,
  Video,
  Zap,
} from "lucide-react"

const msgIn = (delay: string) => ({
  animation: "message-in 0.5s cubic-bezier(0.2,0.8,0.2,1) both",
  animationDelay: delay,
})

function FloatingCard({
  className,
  icon: Icon,
  title,
  sub,
  delay,
}: {
  className: string
  icon: React.ComponentType<{ className?: string }>
  title: string
  sub?: string
  delay?: string
}) {
  return (
    <div
      aria-hidden
      style={delay ? { animationDelay: delay } : undefined}
      className={`pointer-events-none absolute z-20 hidden items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 shadow-xl shadow-foreground/10 backdrop-blur-sm sm:flex ${className}`}
    >
      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="h-4 w-4" />
      </span>
      <span className="leading-tight">
        <span className="block text-[12.5px] font-semibold text-foreground">{title}</span>
        {sub ? <span className="block text-[10.5px] text-muted-foreground">{sub}</span> : null}
      </span>
    </div>
  )
}

export function HeroPhone() {
  return (
    <div className="relative mx-auto w-[270px] sm:w-[300px]">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="absolute -inset-8 rounded-[3rem] bg-gradient-to-tr from-primary/20 via-transparent to-accent/20 blur-3xl"
      />

      {/* Handwritten accent */}
      <div aria-hidden className="absolute -top-7 left-2 z-20 hidden -rotate-3 lg:block">
        <span
          className="inline-flex items-center gap-1 text-[15px] font-medium italic text-primary"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          <Sparkles className="h-4 w-4" /> replies in 0.8s
        </span>
      </div>

      {/* Phone */}
      <div className="relative rounded-[2.6rem] border border-foreground/10 bg-foreground p-2.5 shadow-2xl shadow-foreground/25">
        <div className="absolute left-1/2 top-2.5 z-10 h-5 w-24 -translate-x-1/2 rounded-b-2xl bg-foreground" />
        <div className="relative overflow-hidden rounded-[2.1rem] bg-background">
          {/* Chat header */}
          <div className="flex items-center gap-2.5 bg-primary px-4 pb-3 pt-7 text-primary-foreground">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-[13px] font-bold">
              SL
            </span>
            <div className="flex-1 leading-tight">
              <div className="text-[13.5px] font-semibold">SMSLocal AI</div>
              <div className="flex items-center gap-1 text-[10.5px] text-primary-foreground/80">
                <span className="h-1.5 w-1.5 rounded-full bg-white" /> online · typically instant
              </div>
            </div>
            <Video className="h-4 w-4 opacity-80" />
            <Phone className="h-4 w-4 opacity-80" />
          </div>

          {/* Conversation */}
          <div className="min-h-[362px] space-y-2.5 bg-[oklch(0.97_0.01_150)] px-3 py-4">
            <div className="mx-auto w-fit rounded-full bg-foreground/5 px-2.5 py-0.5 text-[10px] font-medium text-muted-foreground">
              Today
            </div>

            <div
              style={msgIn("0.15s")}
              className="max-w-[82%] rounded-2xl rounded-tl-sm bg-card px-3 py-2 text-[12.5px] text-foreground shadow-sm"
            >
              Hey! Has my order #4821 shipped? 📦
            </div>

            <div
              style={msgIn("0.5s")}
              className="ml-auto flex w-fit items-center gap-1 rounded-2xl rounded-tr-sm bg-card px-3 py-2 shadow-sm"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60" style={{ animation: "dot-bounce 1.2s infinite" }} />
              <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60" style={{ animation: "dot-bounce 1.2s infinite 0.15s" }} />
              <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60" style={{ animation: "dot-bounce 1.2s infinite 0.3s" }} />
            </div>

            <div
              style={msgIn("1.1s")}
              className="ml-auto max-w-[86%] rounded-2xl rounded-tr-sm bg-primary px-3 py-2 text-[12.5px] text-primary-foreground shadow-sm"
            >
              Yes — out for delivery now 🛵 ETA today by 6 PM. Here&apos;s your live tracking link:
              smsl.in/t/4821
              <div className="mt-1 flex items-center justify-end gap-1 text-[9.5px] text-primary-foreground/75">
                <Bot className="h-3 w-3" /> AI agent · 0.8s <CheckCheck className="h-3 w-3" />
              </div>
            </div>

            <div
              style={msgIn("1.5s")}
              className="mx-auto flex w-fit items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[10.5px] font-medium text-primary"
            >
              <Globe className="h-3 w-3" /> Auto-replies in 8 Indian languages
            </div>
          </div>

          {/* Input bar */}
          <div className="flex items-center gap-2 border-t border-border bg-card px-3 py-2.5">
            <div className="flex-1 rounded-full bg-secondary px-3 py-1.5 text-[11.5px] text-muted-foreground">
              Message
            </div>
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <SendHorizontal className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </div>

      {/* Floating feature cards */}
      <FloatingCard
        className="animate-float-slow -left-16 top-24"
        icon={CheckCheck}
        title="98% delivered"
        sub="in under 1 second"
      />
      <FloatingCard
        className="animate-float-slower -right-16 top-40"
        icon={ShieldCheck}
        title="DLT-compliant"
        sub="TRAI-approved routes"
        delay="0.7s"
      />
      <FloatingCard
        className="animate-float-slower -left-12 bottom-16"
        icon={Zap}
        title="OTP in 0.3s"
        sub="from ₹0.12 / SMS"
        delay="1.2s"
      />
    </div>
  )
}
