"use client"

import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, LogIn, RefreshCw, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

type Challenge = { question: string; token: string }

type LoginFormProps = {
  disabled?: boolean
  /**
   * When true, fetch a math captcha from `/api/dev/seo/captcha` and require
   * the operator to solve it before submitting credentials. The server
   * enforces this regardless of this prop, but the prop drives the UI.
   */
  captchaEnabled?: boolean
}

export function LoginForm({
  disabled = false,
  captchaEnabled = false,
}: LoginFormProps) {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Captcha state — only meaningful when captchaEnabled.
  const [challenge, setChallenge] = useState<Challenge | null>(null)
  const [captchaAnswer, setCaptchaAnswer] = useState("")
  const [captchaLoading, setCaptchaLoading] = useState(false)
  const [captchaError, setCaptchaError] = useState<string | null>(null)

  /**
   * Pulls a fresh challenge from the server. Called on mount, after every
   * failed submit, and when the user clicks the manual refresh button. Each
   * token is single-use (it carries its own answer), so we always discard
   * the old one before issuing a new request.
   */
  const refreshCaptcha = useCallback(async () => {
    if (!captchaEnabled) return
    setCaptchaLoading(true)
    setCaptchaError(null)
    setCaptchaAnswer("")
    try {
      const res = await fetch("/api/dev/seo/captcha", {
        method: "GET",
        cache: "no-store",
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        if (res.status === 403) {
          setCaptchaError("Your IP is not on the SEO admin allowlist.")
        } else if (res.status === 429) {
          setCaptchaError(
            `Too many requests. Try again in ${data?.retryAfterSeconds ?? 60}s.`,
          )
        } else {
          setCaptchaError("Could not load captcha. Try again.")
        }
        setChallenge(null)
        return
      }
      setChallenge({ question: data.question, token: data.token })
    } catch {
      setCaptchaError("Network error loading captcha.")
      setChallenge(null)
    } finally {
      setCaptchaLoading(false)
    }
  }, [captchaEnabled])

  useEffect(() => {
    if (captchaEnabled) {
      void refreshCaptcha()
    }
  }, [captchaEnabled, refreshCaptcha])

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)

    if (captchaEnabled && (!challenge || !captchaAnswer.trim())) {
      setError("Please solve the captcha to continue.")
      return
    }

    setPending(true)
    try {
      const res = await fetch("/api/dev/seo/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "login",
          username,
          password,
          captchaAnswer: captchaEnabled ? captchaAnswer.trim() : undefined,
          captchaToken: captchaEnabled ? challenge?.token : undefined,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(
          data?.error === "invalid_credentials"
            ? "Incorrect username or password."
            : data?.error === "captcha_failed"
              ? (data.message ?? "Captcha was incorrect.")
              : data?.error === "rate_limited"
                ? `Too many attempts. Try again in ${data.retryAfterSeconds}s.`
                : data?.error === "ip_forbidden"
                  ? "Your IP is not on the SEO admin allowlist."
                  : (data?.message ?? "Sign-in failed."),
        )
        // The captcha token is single-use — refresh after every failed
        // attempt so the operator gets a new question.
        if (captchaEnabled) void refreshCaptcha()
        setPending(false)
        return
      }
      router.replace("/dev/seo")
      router.refresh()
    } catch {
      setError("Network error. Please try again.")
      if (captchaEnabled) void refreshCaptcha()
      setPending(false)
    }
  }

  const submitDisabled =
    disabled ||
    pending ||
    !username ||
    !password ||
    (captchaEnabled && (!challenge || !captchaAnswer.trim()))

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-border bg-card p-6 shadow-sm"
    >
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="seo-username">Username</FieldLabel>
          <Input
            id="seo-username"
            name="username"
            autoComplete="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={disabled || pending}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="seo-password">Password</FieldLabel>
          <Input
            id="seo-password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={disabled || pending}
          />
        </Field>

        {captchaEnabled ? (
          <Field>
            <FieldLabel htmlFor="seo-captcha">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck
                  className="h-3.5 w-3.5 text-muted-foreground"
                  aria-hidden="true"
                />
                Security check
              </span>
            </FieldLabel>
            <div className="flex items-stretch gap-2">
              <div className="flex min-w-[7rem] flex-1 items-center justify-between gap-2 rounded-md border border-input bg-muted/40 px-3 py-2 font-mono text-[14px] tabular-nums">
                {captchaLoading ? (
                  <span className="inline-flex items-center gap-2 text-muted-foreground">
                    <Loader2
                      className="h-3.5 w-3.5 animate-spin"
                      aria-hidden="true"
                    />
                    Loading…
                  </span>
                ) : challenge ? (
                  <span className="font-semibold tracking-wider text-foreground">
                    {challenge.question} = ?
                  </span>
                ) : (
                  <span className="text-destructive">unavailable</span>
                )}
                <button
                  type="button"
                  onClick={() => void refreshCaptcha()}
                  disabled={captchaLoading || pending}
                  aria-label="Refresh captcha"
                  className="rounded p-1 text-muted-foreground transition hover:bg-background hover:text-foreground disabled:opacity-50"
                >
                  <RefreshCw
                    className={`h-3.5 w-3.5 ${
                      captchaLoading ? "animate-spin" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>
              </div>
              <Input
                id="seo-captcha"
                name="captcha"
                type="text"
                inputMode="numeric"
                autoComplete="off"
                required
                placeholder="Answer"
                className="flex-1"
                value={captchaAnswer}
                onChange={(e) =>
                  setCaptchaAnswer(e.target.value.replace(/[^\d-]/g, ""))
                }
                disabled={
                  disabled || pending || captchaLoading || !challenge
                }
              />
            </div>
            {captchaError ? (
              <p className="mt-1 text-[12px] text-destructive">
                {captchaError}
              </p>
            ) : (
              <p className="mt-1 text-[11.5px] text-muted-foreground">
                Solve to prove you&apos;re human. Refreshes after every failed
                attempt.
              </p>
            )}
          </Field>
        ) : null}
      </FieldGroup>

      {error ? (
        <p
          role="alert"
          className="mt-4 rounded-lg border border-destructive/40 bg-destructive/5 px-3 py-2 text-[13px] text-destructive"
        >
          {error}
        </p>
      ) : null}

      <Button
        type="submit"
        className="mt-5 w-full"
        disabled={submitDisabled}
      >
        {pending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Signing in…
          </>
        ) : (
          <>
            <LogIn className="h-4 w-4" aria-hidden="true" />
            Sign in
          </>
        )}
      </Button>
    </form>
  )
}
