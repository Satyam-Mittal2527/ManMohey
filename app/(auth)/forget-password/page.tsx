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
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold mb-8 text-center">Reset Password</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="md:col-span-1 bg-white p-6 border rounded">
          <nav className="space-y-3">
            <a
              href="/profile"
              className="w-full block text-left px-4 py-3 rounded border border-dashed border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Back to Profile
            </a>
            <div className="border-t pt-3 mt-3">
              <p className="text-sm text-gray-600 px-2">Current Step:</p>
              <p className="text-sm font-medium text-gray-900 px-2 mt-2">
                {stage === "email" ? "1. Enter Email" : stage === "verify" ? "2. Verify OTP" : "3. Complete"}
              </p>
            </div>
          </nav>
        </aside>

        <main className="md:col-span-3 bg-white p-6 border rounded">
          {message ? (
            <div className={`mb-4 rounded border p-4 ${messageType === "success" ? "border-green-200 bg-green-50 text-green-700" : "border-red-200 bg-red-50 text-red-700"}`}>
              {message}
            </div>
          ) : null}

          {stage === "email" ? (
            <section>
              <h2 className="text-xl font-medium mb-4">Enter Your Email</h2>
              <p className="mb-4 text-gray-600">Enter your email address to receive an OTP.</p>
              <form onSubmit={handleSendOtp} className="space-y-4 max-w-xl">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full border rounded px-3 py-2"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSending}
                    className="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded hover:bg-black disabled:opacity-50"
                  >
                    {isSending ? "Sending..." : "Send OTP"}
                  </button>
                </div>
              </form>
            </section>
          ) : stage === "verify" ? (
            <section>
              <h2 className="text-xl font-medium mb-4">Verify OTP & Reset Password</h2>
              <form onSubmit={handleResetPassword} className="space-y-4 max-w-xl">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input type="email" value={email} disabled className="mt-1 block w-full border rounded bg-gray-100 px-3 py-2" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">OTP</label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="mt-1 block w-full border rounded px-3 py-2"
                    placeholder="Enter OTP"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">New password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="mt-1 block w-full border rounded px-3 py-2"
                    placeholder="New password"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Confirm new password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="mt-1 block w-full border rounded px-3 py-2"
                    placeholder="Confirm new password"
                  />
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded hover:bg-black disabled:opacity-50"
                  >
                    {isSubmitting ? "Resetting..." : "Reset Password"}
                  </button>
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={!!(cooldownEnd && cooldownEnd > Date.now()) || isSending}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 disabled:opacity-50"
                  >
                    {isSending ? "Sending..." : cooldownEnd && cooldownEnd > Date.now() ? `Resend in ${Math.floor(remaining / 60)}:${String(remaining % 60).padStart(2,"0")}` : "Resend OTP"}
                  </button>
                </div>
              </form>
            </section>
          ) : (
            <section>
              <h2 className="text-xl font-medium mb-4">Password Reset Successful</h2>
              <p className="mb-6 text-gray-700">Your password has been reset successfully. You can now log in with your new password.</p>
              <a href="/login" className="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded hover:bg-black">Go to Login</a>
            </section>
          )}
        </main>
      </div>
    </div>
  )
}
