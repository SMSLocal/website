"use client"

import { ArrowRight, Search } from "lucide-react"
import { useState } from "react"

export function HelpSearchBar() {
  const [query, setQuery] = useState("")

  return (
    <form
      role="search"
      className="relative mx-auto mt-8 flex max-w-xl items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.06] p-1.5 backdrop-blur-md shadow-2xl shadow-primary/10"
      onSubmit={(e) => e.preventDefault()}
    >
      <label htmlFor="help-search" className="sr-only">
        Search the help centre
      </label>
      <div className="flex flex-1 items-center gap-2.5 px-4">
        <Search className="h-4 w-4 text-white/50" />
        <input
          id="help-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search DLT, WhatsApp onboarding, OTP…"
          className="flex-1 bg-transparent py-2.5 text-sm text-white placeholder:text-white/40 outline-none"
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:brightness-110"
      >
        Search
        <ArrowRight className="h-3.5 w-3.5" />
      </button>
    </form>
  )
}
