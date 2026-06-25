"use client"

import { useEffect, useRef, useState } from "react"
import { Bot, MessageSquare, Send, Sparkles, X } from "lucide-react"

/**
 * Interactive demo chatbot — a floating launcher pinned bottom-right that
 * opens an intro card, then a working chat window with a canned AI reply.
 * Purely a marketing demo of what an SMSLocal AI chatbot looks like in the
 * wild; it stores nothing and calls no API.
 */

type Stage = "closed" | "intro" | "chat"
type Msg = { id: number; from: "user" | "ai"; text: string }

const AI_REPLY =
  "Hello! Thank you for reaching out to SMSLocal AI. How can we assist you today?"

export function AutomationChatbotWidget() {
  const [stage, setStage] = useState<Stage>("closed")
  const [messages, setMessages] = useState<Msg[]>([])
  const [draft, setDraft] = useState("")
  const [typing, setTyping] = useState(false)
  const idRef = useRef(0)
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    return () => timersRef.current.forEach(clearTimeout)
  }, [])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [messages, typing])

  function send() {
    const text = draft.trim()
    if (!text) return
    idRef.current += 1
    setMessages((m) => [...m, { id: idRef.current, from: "user", text }])
    setDraft("")
    setTyping(true)
    const t = setTimeout(() => {
      setTyping(false)
      idRef.current += 1
      setMessages((m) => [...m, { id: idRef.current, from: "ai", text: AI_REPLY }])
    }, 1100)
    timersRef.current.push(t)
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 print:hidden">
      {/* Panel */}
      {stage !== "closed" ? (
        <div
          className="w-[330px] max-w-[calc(100vw-2.5rem)] overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-foreground/15"
          style={{ animation: "chatPanelIn 0.32s cubic-bezier(0.22,1,0.36,1) both" }}
        >
          {/* Header */}
          <div className="relative overflow-hidden bg-[oklch(0.16_0.02_230)] px-4 py-3.5 text-white">
            <div aria-hidden className="bg-grid-ink pointer-events-none absolute inset-0 opacity-40" />
            <div
              aria-hidden
              className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-50 blur-2xl"
              style={{ background: "radial-gradient(circle, color-mix(in oklch, var(--primary) 50%, transparent), transparent 70%)" }}
            />
            <div className="relative flex items-center gap-2.5">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[oklch(0.72_0.17_165)] text-primary-foreground">
                <Bot className="h-[18px] w-[18px]" />
              </span>
              <div className="min-w-0">
                <p className="flex items-center gap-1.5 text-[13.5px] font-semibold">
                  SMSLocal AI
                  <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </p>
                <p className="text-[11px] text-white/60">AI assistant · usually instant</p>
              </div>
              <button
                type="button"
                onClick={() => setStage("closed")}
                aria-label="Close chat"
                className="ml-auto inline-flex h-7 w-7 items-center justify-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {stage === "intro" ? (
            <div className="p-5">
              <div className="flex flex-col items-center text-center">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Sparkles className="h-7 w-7" />
                </span>
                <p className="mt-3 text-[14px] font-semibold tracking-tight text-foreground">
                  You're chatting with an AI assistant
                </p>
                <p className="mt-1.5 text-[12px] leading-relaxed text-muted-foreground">
                  AI replies may be inaccurate. For complex issues, type{" "}
                  <span className="font-mono font-semibold text-foreground">agent</span> to reach a human.
                </p>
              </div>

              <div className="mt-4 rounded-xl border border-border bg-muted/50 p-3 text-center">
                <p className="text-[12px] font-medium text-foreground">We are away at the moment.</p>
                <p className="mt-0.5 text-[11.5px] text-muted-foreground">We'll be back as soon as possible.</p>
              </div>

              <button
                type="button"
                onClick={() => setStage("chat")}
                className="group mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-[13px] font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:brightness-110"
              >
                Start conversation
                <Send className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </button>
              <p className="mt-3 text-center text-[10.5px] leading-relaxed text-muted-foreground">
                You're about to chat with an AI assistant. Replies may be wrong. We don't store sensitive personal data.
              </p>
            </div>
          ) : (
            <>
              {/* Messages */}
              <div ref={scrollRef} className="h-[260px] space-y-2.5 overflow-y-auto bg-muted/20 px-4 py-4">
                <div className="mx-auto w-fit rounded-full bg-secondary px-3 py-1 text-[10.5px] font-medium text-muted-foreground">
                  We'll be back as soon as possible
                </div>
                {messages.length === 0 ? (
                  <div className="flex items-start gap-2">
                    <Avatar />
                    <div className="max-w-[78%] rounded-2xl rounded-tl-sm border border-border bg-card px-3 py-2 text-[12.5px] text-foreground shadow-sm">
                      Hi! I'm SMSLocal AI. Ask me anything to see how automated replies work.
                    </div>
                  </div>
                ) : null}

                {messages.map((m) =>
                  m.from === "ai" ? (
                    <div key={m.id} className="flex items-start gap-2" style={{ animation: "chatMsgIn 0.3s ease both" }}>
                      <Avatar />
                      <div className="max-w-[78%] rounded-2xl rounded-tl-sm border border-border bg-card px-3 py-2 text-[12.5px] leading-relaxed text-foreground shadow-sm">
                        {m.text}
                      </div>
                    </div>
                  ) : (
                    <div key={m.id} className="flex justify-end" style={{ animation: "chatMsgIn 0.3s ease both" }}>
                      <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-primary px-3 py-2 text-[12.5px] leading-relaxed text-primary-foreground shadow-sm">
                        {m.text}
                      </div>
                    </div>
                  ),
                )}

                {typing ? (
                  <div className="flex items-start gap-2">
                    <Avatar />
                    <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm border border-border bg-card px-3 py-2.5 shadow-sm">
                      <Dot delay={0} />
                      <Dot delay={0.15} />
                      <Dot delay={0.3} />
                    </div>
                  </div>
                ) : null}
              </div>

              {/* Composer */}
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  send()
                }}
                className="flex items-center gap-2 border-t border-border bg-card p-2.5"
              >
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Please enter your message"
                  aria-label="Message"
                  className="min-w-0 flex-1 rounded-lg border border-border bg-background px-3 py-2 text-[12.5px] text-foreground outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                />
                <button
                  type="submit"
                  aria-label="Send message"
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground transition hover:brightness-110 disabled:opacity-40"
                  disabled={!draft.trim()}
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </>
          )}
        </div>
      ) : null}

      {/* Launcher */}
      <button
        type="button"
        onClick={() => setStage((s) => (s === "closed" ? "intro" : "closed"))}
        aria-label={stage === "closed" ? "Open chat" : "Close chat"}
        className="group relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl shadow-primary/30 transition hover:scale-105 hover:brightness-110"
      >
        <span aria-hidden className="absolute inset-0 rounded-full" style={{ animation: stage === "closed" ? "chatPing 2.4s ease-out infinite" : "none", background: "color-mix(in oklch, var(--primary) 40%, transparent)" }} />
        <span className="relative">
          {stage === "closed" ? <MessageSquare className="h-6 w-6" /> : <X className="h-6 w-6" />}
        </span>
      </button>

      <style jsx>{`
        @keyframes chatPanelIn {
          0% { opacity: 0; transform: translateY(12px) scale(0.97); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes chatMsgIn {
          0% { opacity: 0; transform: translateY(6px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes chatPing {
          0% { transform: scale(1); opacity: 0.5; }
          80%, 100% { transform: scale(1.7); opacity: 0; }
        }
        @keyframes chatDot {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-3px); opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          :global(*) {
            animation-duration: 0.001ms !important;
            animation-iteration-count: 1 !important;
          }
        }
      `}</style>
    </div>
  )
}

function Avatar() {
  return (
    <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[oklch(0.72_0.17_165)] text-primary-foreground">
      <Bot className="h-3.5 w-3.5" />
    </span>
  )
}

function Dot({ delay }: { delay: number }) {
  return (
    <span
      className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60"
      style={{ animation: `chatDot 1.1s ease-in-out ${delay}s infinite` }}
    />
  )
}
