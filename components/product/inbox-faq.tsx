"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const FAQS = [
  {
    q: "How many channels can I connect?",
    a: "SMSLocal Inbox supports 10+ channels — WhatsApp, Email, Instagram, Messenger, Telegram, Line, TikTok, SMS, Voice, and Live Chat. All in one timeline, no extra tools needed.",
  },
  {
    q: "Is there a free trial?",
    a: "Yes — start free with no credit card required. You get full access to all channels and team features. Upgrade only when you're ready.",
  },
  {
    q: "Can multiple agents use the same inbox?",
    a: "Absolutely. Assign conversations, leave internal notes, @mention teammates, and hand off threads with full context — built for teams of any size.",
  },
  {
    q: "Can I port my existing WhatsApp or phone number?",
    a: "Yes. We support number porting for WhatsApp Business API and Voice. Our onboarding team handles the migration end-to-end.",
  },
  {
    q: "Is my data secure?",
    a: "All data is encrypted at rest (AES-256) and in transit (TLS 1.3). We're GDPR and CCPA compliant, with MFA and role-based access controls built in.",
  },
]

export function InboxFaq() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="mx-auto max-w-2xl">
      {FAQS.map((item, i) => (
        <div key={i} className="border-t border-border/60">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between gap-4 py-5 text-left"
          >
            <span className="text-[15px] font-medium text-foreground">{item.q}</span>
            <ChevronDown
              className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ${open === i ? "rotate-180" : ""}`}
            />
          </button>
          <div
            className={`grid transition-all duration-200 ease-in-out ${open === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
          >
            <div className="overflow-hidden">
              <p className="pb-5 text-[13.5px] leading-relaxed text-muted-foreground">{item.a}</p>
            </div>
          </div>
        </div>
      ))}
      <div className="border-t border-border/60" />
    </div>
  )
}
