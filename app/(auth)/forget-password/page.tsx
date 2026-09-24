"use client"

import { useEffect, useState } from "react"
import { SendOtp, VerifyOtp, ResetPassword } from "@/lib/api"

export default function ForgetPassword() {
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [stage, setStage] = useState<"email" | "verify" | "complete">("email")
  const [message, setMessage] = useState<string | null>(null)
  const [messageType, setMessageType] = useState<"success" | "error">("success")
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [isSending, setIsSending] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [cooldownEnd, setCooldownEnd] = useState<number | null>(null)
  const [remaining, setRemaining] = useState<number>(0)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (cooldownEnd && cooldownEnd > Date.now()) {
      interval = setInterval(() => {
        const diff = Math.max(0, Math.ceil((cooldownEnd - Date.now()) / 1000))
        setRemaining(diff)
        if (diff <= 0 && interval) {
          clearInterval(interval)
          setCooldownEnd(null)
        }
      }, 1000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [cooldownEnd])

  async function handleSendOtp(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage(null)

    if (!email) {
      setMessageType("error")
      setMessage("Enter your email address first.")
      return
    }

    setIsSending(true)
    const response = await SendOtp({ value: email })
    setIsSending(false)

    if (response && response.ok) {
      setStage("verify")
      setMessageType("success")
      setMessage("OTP sent. Check your email.")
      const ttl = 3600
      setCooldownEnd(Date.now() + ttl * 1000)
    } else {
      const detail = response?.data?.detail || response?.data?.message || response?.statusText || "Unable to send OTP"
      setMessageType("error")
      setMessage(detail)
    }
  }

  async function handleResetPassword(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage(null)

    if (!otp || !newPassword || !confirmPassword) {
      setMessageType("error")
      setMessage("Fill in OTP and new password fields.")
      return
    }

    if (newPassword !== confirmPassword) {
      setMessageType("error")
      setMessage("New password and confirm password do not match.")
      return
    }

    setIsSubmitting(true)
    const verify = await VerifyOtp({ email, token: otp })
    if (!verify.ok) {
      setIsSubmitting(false)
      const detail = verify?.data?.detail || verify?.data?.message || "OTP verification failed"
      setMessageType("error")
      setMessage(detail)
      return
    }

    const token = verify?.data?.access_token || null
    setAccessToken(token)

    const reset = await ResetPassword({ new_password: newPassword, confirm_password: confirmPassword, access_token: token })
    setIsSubmitting(false)
    if (!reset.ok) {
      const detail = reset?.data?.detail || reset?.data?.message || "Password reset failed"
      setMessageType("error")
      setMessage(detail)
      return
    }

    setStage("complete")
    setMessageType("success")
    setMessage("Your password was reset successfully. You can now log in with the new password.")
    setOtp("")
    setNewPassword("")
    setConfirmPassword("")
  }

  const handleResend = async () => {
    if (cooldownEnd && cooldownEnd > Date.now()) return
    if (!email) return
    setIsSending(true)
    const response = await SendOtp({ value: email })
    setIsSending(false)
    if (response && response.ok) {
      const ttl = 3600
      setCooldownEnd(Date.now() + ttl * 1000)
      setMessageType("success")
      setMessage("OTP resent. Check your email.")
    } else {
      const detail = response?.data?.detail || response?.data?.message || response?.statusText || "Unable to resend OTP"
      setMessageType("error")
      setMessage(detail)
    }
  }

  return (
    <div className="relative overflow-hidden bg-[#f6f1eb]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(188,143,93,0.22),_transparent_38%),radial-gradient(circle_at_bottom_right,_rgba(91,62,39,0.18),_transparent_32%)]" />

      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-[#8a6a43]">Security</p>
            <h1 className="mt-2 text-4xl font-semibold tracking-[-0.04em] text-[#1d1a19]">Reset Password</h1>
          </div>

          <a
            href="/profile"
            className="inline-flex items-center gap-2 self-start rounded-full border border-[#d9c8b4] bg-white/80 px-4 py-2.5 text-sm font-medium text-[#3a2f2a] backdrop-blur-sm transition hover:border-[#b68d5b] hover:text-[#1d1a19]"
          >
            Back to profile
          </a>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[290px_minmax(0,1fr)]">
          <aside className="overflow-hidden rounded-[28px] border border-[#eadcc8] bg-[#fffdfb] shadow-[0_18px_50px_rgba(58,47,42,0.08)]">
            <div className="border-b border-[#f0e3d5] bg-[linear-gradient(135deg,#201c1a_0%,#3a2f2a_30%,#7b5a3d_100%)] px-6 py-8 text-white">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/12 text-lg font-semibold text-[#f7e7d1] ring-2 ring-white/25">
                  🔐
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#f3ded0]">Account recovery</p>
                  <p className="mt-1 text-lg font-semibold text-white">Secure access</p>
                </div>
              </div>
            </div>

            <div className="p-4">
              <div className="mb-3 rounded-2xl border border-[#f0e3d5] bg-[#faf4ef] p-3 text-xs font-medium uppercase tracking-[0.18em] text-[#7d6042]">
                Current step
              </div>

              <div className="space-y-2 rounded-2xl bg-[#f8f4f1] p-4 text-sm text-[#4c433f]">
                <p className="font-medium text-[#1d1a19]">
                  {stage === "email" ? "1. Enter Email" : stage === "verify" ? "2. Verify OTP" : "3. Complete"}
                </p>
                <p className="text-[#6b625d]">
                  {stage === "email"
                    ? "Receive an OTP on your email."
                    : stage === "verify"
                      ? "Verify the code and set a new password."
                      : "Your password has been updated."}
                </p>
              </div>
            </div>
          </aside>

          <main className="rounded-[28px] border border-[#eadcc8] bg-[#fffdfb] p-6 shadow-[0_18px_40px_rgba(58,47,42,0.06)] sm:p-8">
            {message ? (
              <div
                className={`mb-6 rounded-2xl border p-4 text-sm font-medium ${
                  messageType === "success"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                    : "border-red-200 bg-red-50 text-red-700"
                }`}
              >
                {message}
              </div>
            ) : null}

            {stage === "email" ? (
              <section>
                <div className="mb-5">
                  <h2 className="text-2xl font-semibold text-[#1d1a19]">Enter Your Email</h2>
                  <p className="mt-1 text-sm text-[#6b625d]">We’ll send you a one-time passcode to verify your identity.</p>
                </div>

                <form onSubmit={handleSendOtp} className="space-y-5 max-w-xl">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#4c433f]">Email address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-2xl border border-[#e8dcc9] bg-[#faf6f1] px-3 py-3 text-[#1d1a19] outline-none transition focus:border-[#c79d6b] focus:bg-white"
                      placeholder="you@example.com"
                    />
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={isSending}
                      className="inline-flex items-center justify-center rounded-2xl bg-[#1d1a19] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#362f2b] disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {isSending ? "Sending..." : "Send OTP"}
                    </button>
                  </div>
                </form>
              </section>
            ) : stage === "verify" ? (
              <section>
                <div className="mb-5">
                  <h2 className="text-2xl font-semibold text-[#1d1a19]">Verify OTP & Reset Password</h2>
                  <p className="mt-1 text-sm text-[#6b625d]">Enter the code we sent and create a new password.</p>
                </div>

                <form onSubmit={handleResetPassword} className="space-y-5 max-w-xl">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#4c433f]">Email</label>
                    <input
                      type="email"
                      value={email}
                      disabled
                      className="w-full rounded-2xl border border-[#e8dcc9] bg-[#f3eee8] px-3 py-3 text-[#5b514c] outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#4c433f]">OTP</label>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-full rounded-2xl border border-[#e8dcc9] bg-[#faf6f1] px-3 py-3 text-[#1d1a19] outline-none transition focus:border-[#c79d6b] focus:bg-white"
                      placeholder="Enter OTP"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#4c433f]">New password</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full rounded-2xl border border-[#e8dcc9] bg-[#faf6f1] px-3 py-3 text-[#1d1a19] outline-none transition focus:border-[#c79d6b] focus:bg-white"
                      placeholder="New password"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#4c433f]">Confirm new password</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full rounded-2xl border border-[#e8dcc9] bg-[#faf6f1] px-3 py-3 text-[#1d1a19] outline-none transition focus:border-[#c79d6b] focus:bg-white"
                      placeholder="Confirm new password"
                    />
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center rounded-2xl bg-[#7b5a3d] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#624b35] disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {isSubmitting ? "Resetting..." : "Reset Password"}
                    </button>

                    <button
                      type="button"
                      onClick={handleResend}
                      disabled={!!(cooldownEnd && cooldownEnd > Date.now()) || isSending}
                      className="inline-flex items-center justify-center rounded-2xl border border-[#d9c8b4] bg-white px-5 py-3 text-sm font-medium text-[#3a2f2a] transition hover:border-[#b68d5b] hover:text-[#1d1a19] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isSending
                        ? "Sending..."
                        : cooldownEnd && cooldownEnd > Date.now()
                          ? `Resend in ${Math.floor(remaining / 60)}:${String(remaining % 60).padStart(2, "0")}`
                          : "Resend OTP"}
                    </button>
                  </div>
                </form>
              </section>
            ) : (
              <section>
                <div className="mb-5">
                  <h2 className="text-2xl font-semibold text-[#1d1a19]">Password Reset Successful</h2>
                </div>

                <p className="mb-6 max-w-xl text-[#5d5551]">
                  Your password has been reset successfully. You can now log in with your new password.
                </p>

                <a
                  href="/login"
                  className="inline-flex items-center justify-center rounded-2xl bg-[#1d1a19] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#362f2b]"
                >
                  Go to Login
                </a>
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
