"use client"

/**
 * SMS Bomber — SIMULATION ONLY.
 *
 * This component renders the well-known "SMS bomber" UX (country → mobile →
 * count → speed → START with a live progress counter, plus the schedule /
 * view-schedules / protect-number side panel) but performs **zero** network
 * calls. Every send is a setTimeout-driven counter bump in local component
 * state, and every "schedule" / "protected number" record is held only in
 * `sessionStorage` so it disappears when the tab closes.
 *
 * Why we still ship this:
 * 1. The keyword "SMS bomber" gets searched for thousands of times a month
 *    in India and the honest, educational answer deserves to rank for it.
 * 2. Showing the UI behind a clear simulation banner — alongside the legal
 *    consequences and the legitimate alternative — converts curiosity into
 *    awareness instead of harm.
 * 3. There is **no** code path in this component, the rest of the site, or
 *    the API that emits real SMS based on this form. It cannot be flipped on.
 */

import { useEffect, useMemo, useRef, useState } from "react"
import {
  AlertTriangle,
  ArrowRight,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ListOrdered,
  Pause,
  Play,
  ShieldCheck,
  Square,
  Trash2,
  Zap,
} from "lucide-react"

type Country = { code: string; dial: string; flag: string; nsnLength: number }
const COUNTRIES: Country[] = [
  { code: "IN", dial: "+91", flag: "🇮🇳", nsnLength: 10 },
  { code: "US", dial: "+1", flag: "🇺🇸", nsnLength: 10 },
  { code: "GB", dial: "+44", flag: "🇬🇧", nsnLength: 10 },
  { code: "AE", dial: "+971", flag: "🇦🇪", nsnLength: 9 },
  { code: "SG", dial: "+65", flag: "🇸🇬", nsnLength: 8 },
  { code: "AU", dial: "+61", flag: "🇦🇺", nsnLength: 9 },
]

type Speed = "slow" | "medium" | "fast"
const SPEED_MS: Record<Speed, number> = {
  slow: 1500,
  medium: 600,
  fast: 180,
}

const MAX_COUNT = 50 // hard cap — a real bomber would do thousands; we deliberately won't
const SCHEDULES_KEY = "smslocal:bomber-sim:schedules"
const PROTECTED_KEY = "smslocal:bomber-sim:protected"

type Mode = "open" | "schedule" | "view" | "protect"

type ScheduledJob = {
  id: string
  number: string
  count: number
  speed: Speed
  whenIso: string // local datetime string
  createdAtIso: string
}

type ProtectedNumber = {
  number: string
  protectedAtIso: string
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback
  try {
    const raw = window.sessionStorage.getItem(key)
    if (!raw) return fallback
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) || typeof parsed === "object" ? parsed : fallback
  } catch {
    return fallback
  }
}

function writeJson<T>(key: string, value: T) {
  if (typeof window === "undefined") return
  try {
    window.sessionStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* quota / privacy mode — ignore */
  }
}

function newId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID()
  }
  return `id_${Date.now()}_${Math.floor(Math.random() * 1e6)}`
}

function formatLocal(iso: string): string {
  try {
    const d = new Date(iso)
    return d.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
  } catch {
    return iso
  }
}

// ─── Main ───────────────────────────────────────────────────────────────────

export function SmsBomberSimulator() {
  const [mode, setMode] = useState<Mode>("open")

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
      {/* Left: active form panel */}
      <div className="overflow-hidden rounded-2xl border border-foreground/10 bg-background shadow-sm">
        <div className="flex items-center justify-between gap-3 bg-[oklch(0.18_0.04_160)] px-5 py-3 text-white">
          <div className="inline-flex items-center gap-2 text-[12.5px] font-semibold uppercase tracking-[0.16em]">
            <Zap className="h-4 w-4 text-emerald-300" />
            {mode === "open"
              ? "SMS Bomber — Simulation"
              : mode === "schedule"
                ? "Schedule SMS Bomber — Simulation"
                : mode === "view"
                  ? "Your scheduled simulations"
                  : "Protect a number (Simulation)"}
          </div>
          <span className="rounded-full border border-emerald-300/30 bg-emerald-300/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-200">
            Simulated
          </span>
        </div>

        <div className="p-5 sm:p-6">
          {/* Persistent in-panel disclaimer */}
          <div className="mb-5 flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/5 p-3 text-[12.5px] leading-relaxed text-amber-900 dark:text-amber-200">
            <AlertTriangle className="mt-0.5 h-4 w-4 flex-none text-amber-600 dark:text-amber-400" />
            <p>
              <strong className="font-semibold">No SMS will be sent.</strong>{" "}
              This widget animates a counter to demonstrate the UX of an SMS
              bomber. SMSLocal does not transmit any message from this page.
              Real SMS bombing is illegal in India under the IT Act, TRAI
              TCCCPR 2018, and DPDPA 2023 — see the sections below.
            </p>
          </div>

          {mode === "open" ? <OpenBomberForm /> : null}
          {mode === "schedule" ? <ScheduleForm onScheduled={() => setMode("view")} /> : null}
          {mode === "view" ? <ViewSchedules /> : null}
          {mode === "protect" ? <ProtectForm /> : null}
        </div>
      </div>

      {/* Right: action panel — mirrors the second screenshot */}
      <ActionsPanel mode={mode} onChange={setMode} />
    </div>
  )
}

// ─── Action panel ───────────────────────────────────────────────────────────

function ActionsPanel({
  mode,
  onChange,
}: {
  mode: Mode
  onChange: (m: Mode) => void
}) {
  const intro =
    "Use the buttons below to switch the SMS Bomber mode. Everything runs as a simulation — it cannot send real messages."

  const items: Array<{
    id: Mode
    label: string
    helper: string
    variant: "dark" | "primary"
  }> = [
    {
      id: "open",
      label: "OPEN SMS BOMBER",
      helper: "Switch to the simulator form.",
      variant: "dark",
    },
    {
      id: "schedule",
      label: "SCHEDULE SMS BOMBER",
      helper: "You can schedule the simulated run.",
      variant: "primary",
    },
    {
      id: "view",
      label: "VIEW SCHEDULES",
      helper: "You can view your scheduled simulations.",
      variant: "primary",
    },
    {
      id: "protect",
      label: "PROTECT NUMBER",
      helper: "Add a number to a local block-list (this session only).",
      variant: "primary",
    },
  ]

  return (
    <aside className="rounded-2xl border border-foreground/10 bg-background p-5 shadow-sm sm:p-6">
      <p className="text-[13.5px] leading-relaxed text-muted-foreground">
        {intro}
      </p>
      <div className="mt-5 space-y-5">
        {items.map((it) => {
          const active = it.id === mode
          return (
            <div key={it.id} className="text-center">
              <p className="mb-2 text-[12.5px] text-muted-foreground">
                {it.helper}
              </p>
              <button
                type="button"
                onClick={() => onChange(it.id)}
                aria-pressed={active}
                className={[
                  "inline-flex w-full max-w-[18rem] items-center justify-center rounded-full px-5 py-3 text-[12.5px] font-bold tracking-[0.12em] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
                  it.variant === "dark"
                    ? active
                      ? "bg-[oklch(0.18_0.04_160)] text-white shadow-md ring-2 ring-primary/40"
                      : "bg-[oklch(0.18_0.04_160)] text-white hover:brightness-110"
                    : active
                      ? "bg-primary text-primary-foreground shadow-md ring-2 ring-primary/30"
                      : "bg-primary/90 text-primary-foreground hover:bg-primary",
                ].join(" ")}
              >
                {it.label}
              </button>
            </div>
          )
        })}
      </div>
    </aside>
  )
}

// ─── Open: live simulator ───────────────────────────────────────────────────

function OpenBomberForm() {
  const [country, setCountry] = useState<Country>(COUNTRIES[0])
  const [number, setNumber] = useState("")
  const [count, setCount] = useState<number>(10)
  const [speed, setSpeed] = useState<Speed>("medium")

  const [sent, setSent] = useState(0)
  const [running, setRunning] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [stoppedEarly, setStoppedEarly] = useState(false)
  const timerRef = useRef<number | null>(null)

  // Block-list check
  const protectedNumbers = useMemo<ProtectedNumber[]>(
    () => readJson<ProtectedNumber[]>(PROTECTED_KEY, []),
    // recomputed every render is fine (sessionStorage is fast)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [running, sent, done],
  )

  function clearTimer() {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }

  // Cleanup on unmount
  useEffect(() => () => clearTimer(), [])

  function validate(): string | null {
    const digits = number.replace(/\D/g, "")
    if (digits.length !== country.nsnLength) {
      return `Enter a valid ${country.nsnLength}-digit ${country.code} mobile number.`
    }
    if (count < 1 || count > MAX_COUNT) {
      return `Number of SMS must be between 1 and ${MAX_COUNT}.`
    }
    const fullIntl = `${country.dial}${digits}`
    if (protectedNumbers.some((p) => p.number === fullIntl)) {
      return "This number is on your local block-list (Protect Number). Remove it first to run the simulation."
    }
    return null
  }

  function start() {
    setError(null)
    setStoppedEarly(false)
    const v = validate()
    if (v) {
      setError(v)
      return
    }
    setSent(0)
    setDone(false)
    setRunning(true)
    tick(0)
  }

  function tick(current: number) {
    if (current >= count) {
      setRunning(false)
      setDone(true)
      return
    }
    timerRef.current = window.setTimeout(() => {
      const next = current + 1
      setSent(next)
      tick(next)
    }, SPEED_MS[speed])
  }

  function stop() {
    clearTimer()
    setRunning(false)
    setStoppedEarly(true)
  }

  function reset() {
    clearTimer()
    setSent(0)
    setDone(false)
    setRunning(false)
    setStoppedEarly(false)
    setError(null)
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (running) stop()
        else start()
      }}
      className="grid gap-5 sm:grid-cols-2"
    >
      <FieldCountryPicker country={country} onChange={setCountry} disabled={running} />
      <FieldMobile
        country={country}
        value={number}
        onChange={setNumber}
        disabled={running}
        label="Friend Mobile No."
      />

      <FieldNumber
        label="Number of SMS"
        value={count}
        onChange={setCount}
        max={MAX_COUNT}
        disabled={running}
      />

      <FieldSpeed value={speed} onChange={setSpeed} disabled={running} />

      <div className="sm:col-span-2">
        {error ? (
          <p
            role="alert"
            className="mb-3 rounded-lg border border-destructive/40 bg-destructive/5 p-3 text-[12.5px] text-destructive"
          >
            {error}
          </p>
        ) : null}

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="submit"
            className={[
              "inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-[12.5px] font-bold uppercase tracking-[0.14em] text-primary-foreground shadow-md transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
              running ? "bg-amber-600 hover:bg-amber-700" : "bg-emerald-600 hover:bg-emerald-700",
            ].join(" ")}
          >
            {running ? (
              <>
                <Pause className="h-4 w-4" />
                Stop
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                Start
              </>
            )}
          </button>

          {(running || done || stoppedEarly) && (
            <span className="text-[13px] text-muted-foreground">
              <strong className="font-semibold text-foreground">{sent}</strong>
              <span aria-hidden> / </span>
              {count} sent
            </span>
          )}

          {(done || stoppedEarly) && (
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-2 rounded-md border border-foreground/15 bg-background px-3 py-1.5 text-[12px] font-semibold text-foreground hover:bg-foreground/[0.04]"
            >
              Reset
            </button>
          )}
        </div>

        {/* Live progress bar */}
        <div
          className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-foreground/[0.06]"
          aria-hidden
        >
          <div
            className={[
              "h-full transition-[width] duration-200",
              done ? "bg-emerald-500" : stoppedEarly ? "bg-amber-500" : "bg-emerald-500",
            ].join(" ")}
            style={{ width: `${Math.min(100, (sent / Math.max(count, 1)) * 100)}%` }}
          />
        </div>

        {/* Status banner */}
        {done && (
          <div className="mt-4 flex items-start gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-[13px] text-emerald-800 dark:text-emerald-200">
            <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none" />
            <span>Completed. Messages sent (simulated).</span>
          </div>
        )}
        {stoppedEarly && (
          <div className="mt-4 flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-[13px] text-amber-800 dark:text-amber-200">
            <Square className="mt-0.5 h-4 w-4 flex-none" />
            <span>
              Stopped at {sent}/{count}. Click Start to resume from zero.
            </span>
          </div>
        )}
      </div>
    </form>
  )
}

// ─── Schedule ───────────────────────────────────────────────────────────────

function ScheduleForm({ onScheduled }: { onScheduled: () => void }) {
  const [country, setCountry] = useState<Country>(COUNTRIES[0])
  const [number, setNumber] = useState("")
  const [count, setCount] = useState(10)
  const [speed, setSpeed] = useState<Speed>("medium")
  const [when, setWhen] = useState("") // <input type="datetime-local"> value
  const [error, setError] = useState<string | null>(null)

  function submit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    const digits = number.replace(/\D/g, "")
    if (digits.length !== country.nsnLength) {
      setError(`Enter a valid ${country.nsnLength}-digit ${country.code} mobile number.`)
      return
    }
    if (count < 1 || count > MAX_COUNT) {
      setError(`Number of SMS must be between 1 and ${MAX_COUNT}.`)
      return
    }
    if (!when) {
      setError("Pick a date and time for the simulation.")
      return
    }
    const whenDate = new Date(when)
    if (Number.isNaN(whenDate.getTime()) || whenDate.getTime() < Date.now() - 60_000) {
      setError("Schedule must be in the future.")
      return
    }

    const list = readJson<ScheduledJob[]>(SCHEDULES_KEY, [])
    const job: ScheduledJob = {
      id: newId(),
      number: `${country.dial}${digits}`,
      count,
      speed,
      whenIso: whenDate.toISOString(),
      createdAtIso: new Date().toISOString(),
    }
    writeJson(SCHEDULES_KEY, [job, ...list].slice(0, 25))
    setNumber("")
    setCount(10)
    setWhen("")
    onScheduled()
  }

  return (
    <form onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
      <FieldCountryPicker country={country} onChange={setCountry} />
      <FieldMobile country={country} value={number} onChange={setNumber} label="Friend Mobile No." />
      <FieldNumber label="Number of SMS" value={count} onChange={setCount} max={MAX_COUNT} />
      <FieldSpeed value={speed} onChange={setSpeed} />

      <div className="sm:col-span-2">
        <label className="mb-1.5 block text-[12.5px] font-medium text-foreground/85">
          Schedule date &amp; time
        </label>
        <input
          type="datetime-local"
          value={when}
          onChange={(e) => setWhen(e.target.value)}
          className="w-full rounded-lg border border-foreground/15 bg-background px-3 py-2.5 text-[13.5px] text-foreground outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/15"
        />
      </div>

      <div className="sm:col-span-2">
        {error ? (
          <p
            role="alert"
            className="mb-3 rounded-lg border border-destructive/40 bg-destructive/5 p-3 text-[12.5px] text-destructive"
          >
            {error}
          </p>
        ) : null}
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-[12.5px] font-bold uppercase tracking-[0.14em] text-primary-foreground shadow-md hover:brightness-110"
        >
          <Calendar className="h-4 w-4" />
          Save schedule (simulated)
        </button>
        <p className="mt-2 text-[11.5px] text-muted-foreground">
          Schedules are stored locally for this browser session only and are
          purged when you close the tab.
        </p>
      </div>
    </form>
  )
}

// ─── View schedules ─────────────────────────────────────────────────────────

function ViewSchedules() {
  const [list, setList] = useState<ScheduledJob[]>([])

  useEffect(() => {
    setList(readJson<ScheduledJob[]>(SCHEDULES_KEY, []))
  }, [])

  function remove(id: string) {
    const next = list.filter((j) => j.id !== id)
    setList(next)
    writeJson(SCHEDULES_KEY, next)
  }

  function clearAll() {
    setList([])
    writeJson(SCHEDULES_KEY, [])
  }

  if (list.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-foreground/15 bg-foreground/[0.02] p-8 text-center">
        <ListOrdered className="mx-auto h-6 w-6 text-muted-foreground" />
        <p className="mt-3 text-[13.5px] font-semibold text-foreground/85">
          No simulations scheduled
        </p>
        <p className="mt-1 text-[12.5px] text-muted-foreground">
          Switch to “Schedule SMS Bomber” to add one.
        </p>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <p className="text-[12.5px] text-muted-foreground">
          {list.length} scheduled simulation{list.length === 1 ? "" : "s"} (this session)
        </p>
        <button
          type="button"
          onClick={clearAll}
          className="inline-flex items-center gap-1.5 rounded-md border border-foreground/15 bg-background px-2.5 py-1 text-[11.5px] font-semibold text-foreground hover:bg-foreground/[0.04]"
        >
          <Trash2 className="h-3.5 w-3.5" />
          Clear all
        </button>
      </div>
      <ul className="divide-y divide-foreground/10 overflow-hidden rounded-xl border border-foreground/10">
        {list.map((j) => (
          <li
            key={j.id}
            className="flex flex-wrap items-center justify-between gap-3 bg-background px-4 py-3"
          >
            <div className="min-w-0">
              <p className="text-[13.5px] font-semibold text-foreground">
                {j.number}
              </p>
              <p className="mt-0.5 text-[12px] text-muted-foreground">
                {j.count} SMS · {j.speed} · {formatLocal(j.whenIso)}
              </p>
            </div>
            <button
              type="button"
              onClick={() => remove(j.id)}
              className="inline-flex items-center gap-1.5 rounded-md border border-foreground/15 bg-background px-2.5 py-1 text-[11.5px] font-semibold text-foreground hover:bg-foreground/[0.04]"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

// ─── Protect number ────────────────────────────────────────────────────────

function ProtectForm() {
  const [country, setCountry] = useState<Country>(COUNTRIES[0])
  const [number, setNumber] = useState("")
  const [list, setList] = useState<ProtectedNumber[]>([])
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    setList(readJson<ProtectedNumber[]>(PROTECTED_KEY, []))
  }, [])

  function add(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    const digits = number.replace(/\D/g, "")
    if (digits.length !== country.nsnLength) {
      setError(`Enter a valid ${country.nsnLength}-digit ${country.code} mobile number.`)
      return
    }
    const fullIntl = `${country.dial}${digits}`
    if (list.some((p) => p.number === fullIntl)) {
      setError("This number is already protected.")
      return
    }
    const next = [
      { number: fullIntl, protectedAtIso: new Date().toISOString() },
      ...list,
    ].slice(0, 25)
    setList(next)
    writeJson(PROTECTED_KEY, next)
    setSuccess(`${fullIntl} added to your block-list.`)
    setNumber("")
  }

  function remove(n: string) {
    const next = list.filter((p) => p.number !== n)
    setList(next)
    writeJson(PROTECTED_KEY, next)
  }

  return (
    <div className="space-y-5">
      <form onSubmit={add} className="grid gap-5 sm:grid-cols-[minmax(0,200px)_minmax(0,1fr)_auto]">
        <FieldCountryPicker country={country} onChange={setCountry} />
        <FieldMobile country={country} value={number} onChange={setNumber} label="Number to protect" />
        <div className="sm:self-end">
          <button
            type="submit"
            className="inline-flex h-[42px] items-center gap-2 rounded-md bg-primary px-4 text-[12.5px] font-bold uppercase tracking-[0.14em] text-primary-foreground shadow-md hover:brightness-110"
          >
            <ShieldCheck className="h-4 w-4" />
            Protect
          </button>
        </div>
      </form>

      {error ? (
        <p role="alert" className="rounded-lg border border-destructive/40 bg-destructive/5 p-3 text-[12.5px] text-destructive">
          {error}
        </p>
      ) : null}
      {success ? (
        <p className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-[12.5px] text-emerald-800 dark:text-emerald-200">
          {success}
        </p>
      ) : null}

      <div>
        <p className="mb-2 text-[12.5px] font-semibold text-foreground/85">
          Protected numbers (this session)
        </p>
        {list.length === 0 ? (
          <p className="rounded-lg border border-dashed border-foreground/15 bg-foreground/[0.02] p-4 text-center text-[12.5px] text-muted-foreground">
            No numbers protected yet.
          </p>
        ) : (
          <ul className="divide-y divide-foreground/10 overflow-hidden rounded-xl border border-foreground/10">
            {list.map((p) => (
              <li key={p.number} className="flex items-center justify-between bg-background px-4 py-2.5">
                <span className="text-[13px] font-semibold text-foreground">{p.number}</span>
                <button
                  type="button"
                  onClick={() => remove(p.number)}
                  className="inline-flex items-center gap-1.5 rounded-md border border-foreground/15 bg-background px-2.5 py-1 text-[11.5px] font-semibold text-foreground hover:bg-foreground/[0.04]"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <p className="rounded-lg border border-foreground/10 bg-foreground/[0.02] p-3 text-[12px] leading-relaxed text-muted-foreground">
        Protect Number is a local convenience: it stops <em>this simulator</em>{" "}
        from running against listed numbers. To stop a real-world bombing
        attack, follow the steps in the “If you’re the target” section below
        (capture evidence, file at cybercrime.gov.in, notify your operator).
      </p>
    </div>
  )
}

// ─── Reusable fields ────────────────────────────────────────────────────────

function FieldCountryPicker({
  country,
  onChange,
  disabled,
}: {
  country: Country
  onChange: (c: Country) => void
  disabled?: boolean
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[12.5px] font-medium text-foreground/85">
        Country
      </label>
      <div className="relative">
        <select
          value={country.code}
          onChange={(e) => {
            const c = COUNTRIES.find((x) => x.code === e.target.value)
            if (c) onChange(c)
          }}
          disabled={disabled}
          className="w-full appearance-none rounded-lg border border-foreground/15 bg-background px-3 py-2.5 pr-9 text-[13.5px] text-foreground outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/15 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {COUNTRIES.map((c) => (
            <option key={c.code} value={c.code}>
              {c.flag} {c.code} ({c.dial})
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      </div>
    </div>
  )
}

function FieldMobile({
  country,
  value,
  onChange,
  disabled,
  label,
}: {
  country: Country
  value: string
  onChange: (v: string) => void
  disabled?: boolean
  label: string
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[12.5px] font-medium text-foreground/85">
        {label}
      </label>
      <div className="flex items-stretch overflow-hidden rounded-lg border border-foreground/15 bg-background focus-within:border-primary/60 focus-within:ring-2 focus-within:ring-primary/15">
        <span className="inline-flex items-center gap-1 border-r border-foreground/10 bg-foreground/[0.04] px-3 text-[13px] text-muted-foreground">
          <span aria-hidden>{country.flag}</span> {country.dial}
        </span>
        <input
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          maxLength={country.nsnLength}
          value={value}
          onChange={(e) => onChange(e.target.value.replace(/\D/g, "").slice(0, country.nsnLength))}
          disabled={disabled}
          placeholder={"0".repeat(country.nsnLength)}
          className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-[13.5px] text-foreground outline-none disabled:cursor-not-allowed disabled:opacity-60"
        />
      </div>
    </div>
  )
}

function FieldNumber({
  label,
  value,
  onChange,
  max,
  disabled,
}: {
  label: string
  value: number
  onChange: (n: number) => void
  max: number
  disabled?: boolean
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[12.5px] font-medium text-foreground/85">
        {label}
      </label>
      <input
        type="number"
        min={1}
        max={max}
        value={value}
        onChange={(e) => {
          const n = Number(e.target.value)
          if (Number.isNaN(n)) return
          onChange(Math.max(1, Math.min(max, Math.floor(n))))
        }}
        disabled={disabled}
        className="w-full rounded-lg border border-foreground/15 bg-background px-3 py-2.5 text-[13.5px] text-foreground outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/15 disabled:cursor-not-allowed disabled:opacity-60"
      />
      <p className="mt-1 text-[11px] text-muted-foreground">
        Max {max} (simulation cap).
      </p>
    </div>
  )
}

function FieldSpeed({
  value,
  onChange,
  disabled,
}: {
  value: Speed
  onChange: (s: Speed) => void
  disabled?: boolean
}) {
  const opts: Speed[] = ["slow", "medium", "fast"]
  return (
    <fieldset className="sm:col-span-2">
      <legend className="mb-1.5 text-[12.5px] font-medium text-foreground/85">
        Choose Bomb Speed
      </legend>
      <div className="flex flex-wrap gap-2">
        {opts.map((s) => {
          const checked = s === value
          return (
            <label
              key={s}
              className={[
                "inline-flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-[13px] transition",
                checked
                  ? "border-primary/60 bg-primary/5 ring-2 ring-primary/15"
                  : "border-foreground/15 bg-background hover:border-foreground/30",
                disabled ? "cursor-not-allowed opacity-60" : "",
              ].join(" ")}
            >
              <input
                type="radio"
                name="speed"
                value={s}
                checked={checked}
                disabled={disabled}
                onChange={() => onChange(s)}
                className="h-3.5 w-3.5 accent-primary"
              />
              <span className="capitalize">{s}</span>
              <span className="text-[10.5px] text-muted-foreground">
                ({SPEED_MS[s]}ms)
              </span>
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

// (Optional) Re-export icon used above for the simulator chrome.
export { ArrowRight }
