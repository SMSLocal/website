import Link from "next/link"
import { ArrowRight, ClipboardCheck, Hash, PhoneIncoming, PhoneOutgoing, Sparkles, UserRound } from "lucide-react"

// "How it works" for /products/voice: four setup steps on the left, and on the right a call-detail card that shows the
// same journey as a timeline (ring, answer, customer context, logged in the thread, click-to-call follow-up).

const STEPS = [
  {
    icon: Hash,
    title: "Get a business number",
    body: "Pick a local number ($5/mo) or a toll-free number ($15/mo) from your dashboard and point it at your inbox.",
  },
  {
    icon: PhoneIncoming,
    title: "Calls ring inside the inbox",
    body: "Inbound calls arrive in the same place as your chats and messages, so your team never switches to a phone app.",
  },
  {
    icon: UserRound,
    title: "Answer with full context",
    body: "The customer profile, order details and earlier conversations sit next to the call while you talk.",
  },
  {
    icon: ClipboardCheck,
    title: "Every call is logged in the thread",
    body: "The call is saved to the conversation for the whole team, and click-to-call makes the follow-up one tap.",
  },
]

const TRACE = [
  { t: "0:00", icon: PhoneIncoming, title: "Incoming call", sub: "Support line · +91 98••• ••041", tone: "primary" as const },
  { t: "0:03", icon: UserRound, title: "Answered by Priya", sub: "Picked up inside the inbox", tone: "primary" as const },
  { t: "0:04", icon: Hash, title: "Customer profile opened", sub: "Order #2041 · 3 earlier chats", tone: "neutral" as const },
  { t: "3:42", icon: ClipboardCheck, title: "Call logged in the thread", sub: "Talk time 3:42 · visible to the team", tone: "primary" as const },
  { t: "Next", icon: PhoneOutgoing, title: "Click-to-call follow-up", sub: "Call back from the same thread", tone: "accent" as const },
]

const DOT: Record<string, string> = {
  primary: "bg-primary text-primary-foreground shadow-md shadow-primary/30",
  neutral: "bg-foreground text-background",
  accent: "bg-accent text-accent-foreground",
}

export function VoiceFlow() {
  return (
    <section aria-labelledby="voice-flow-title" className="border-y border-border bg-secondary/40 py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-3 py-1 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-primary">
            <Sparkles className="h-3.5 w-3.5" />How it works
          </span>
          <h2 id="voice-flow-title" className="mt-4 text-balance text-3xl font-semibold leading-[1.12] tracking-[-0.03em] sm:text-[40px]">
            Business calling that runs inside your support inbox
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-[16px] leading-relaxed text-muted-foreground">
            Set up a business phone number, take inbound calls and make outbound calls without leaving the inbox your team already uses.
          </p>
        </div>

      <div className="mt-12 grid items-stretch gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-14">
        {/* steps */}
        <div className="flex flex-col">
          <ol className="space-y-3.5">
            {STEPS.map((s, i) => (
              <li key={s.title} className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-4 transition duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[0_18px_40px_-28px_rgba(15,42,58,.5)] sm:p-5">
                <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-b from-primary/80 to-primary text-primary-foreground shadow-[0_10px_20px_-8px] shadow-primary/50 ring-1 ring-white/30">
                  <s.icon className="h-5 w-5" />
                  <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-[10.5px] font-bold text-background">{i + 1}</span>
                </span>
                <div className="min-w-0">
                  <h3 className="text-[17px] font-semibold leading-snug tracking-tight">{s.title}</h3>
                  <p className="mt-1 text-[14px] leading-relaxed text-muted-foreground">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <Link href="/signup/" className="group mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition hover:opacity-90">
            Add Voice to your inbox <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* call detail */}
        <div className="relative flex">
          <div aria-hidden className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-primary/20 via-transparent to-accent/30 blur-2xl" />
          <div className="relative flex w-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-[0_34px_70px_-36px_rgba(15,42,58,.6)]">
            <div className="flex items-center gap-3 border-b border-border bg-muted/60 px-5 py-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-foreground text-[15px] font-bold text-background">A</span>
              <div className="min-w-0 flex-1">
                <p className="text-[14.5px] font-semibold leading-tight">Aarav Mehta</p>
                <p className="text-[12px] text-muted-foreground">Call detail · same thread as chat</p>
              </div>
              <span className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[11.5px] font-semibold text-primary">
                <i className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />Live
              </span>
            </div>

            <ol className="relative flex flex-1 flex-col justify-around px-5 py-6">
              <span aria-hidden className="absolute bottom-10 left-[67px] top-10 w-px bg-gradient-to-b from-primary via-primary/40 to-border" />
              {TRACE.map((e) => (
                <li key={e.title} className="relative flex items-start gap-4 py-3">
                  <span className="w-9 shrink-0 pt-2 text-right font-mono text-[11px] font-semibold text-muted-foreground">{e.t}</span>
                  <span className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ring-4 ring-card ${DOT[e.tone]}`}>
                    <e.icon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 pt-0.5">
                    <span className="block text-[14px] font-semibold leading-tight">{e.title}</span>
                    <span className="mt-0.5 block text-[12.5px] text-muted-foreground">{e.sub}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
      </div>
    </section>
  )
}
