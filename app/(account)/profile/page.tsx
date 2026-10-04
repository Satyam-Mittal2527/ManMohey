"use client"

import { useState, useEffect } from "react"
import { ChangePassword } from "@/lib/api"
import Link from "next/link"
import {
  ArrowRight,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserRound,
} from "lucide-react"

export default function Profile() {
  const [tab, setTab] = useState<"personal" | "password">("personal")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [messageType, setMessageType] = useState<"success" | "error">("success")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)

  const initials = fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("") || "M"

  useEffect(() => {
    async function loadProfile() {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? ""
        const res = await fetch(`${baseUrl}/api/User/me`, { credentials: "include" })

        if (!res.ok) {
          const text = await res.text()
          console.error("/api/User/me returned non-OK:", res.status, text)
          setError("Failed to load profile")
          return
        }

        const json = await res.json()
        const profile = json?.profile

        if (profile) {
          const name = [profile.first_name, profile.last_name].filter(Boolean).join(" ")
          setFullName(name)
          setEmail(profile.email || "")
          setPhone(profile.phone_number || "")
          setError(null)
        } else if (json?.user) {
          setEmail(json.user.email || "")
          setError(null)
        } else {
          setError("No profile data found. Please log in.")
        }
      } catch (err) {
        console.error("Failed to load profile", err)
        setError("Failed to load profile")
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [])

  function handlePersonalSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setMessage(null)
    setIsSaving(true)

    ;(async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? ""
        const parts = fullName.trim().split(/\s+/)
        const first_name = parts.length > 0 ? parts[0] : ""
        const last_name = parts.length > 1 ? parts.slice(1).join(" ") : ""

        const body = {
          first_name,
          last_name,
          email,
          phone_number: phone,
        }

        const res = await fetch(`${baseUrl}/api/User/profile`, {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        })

        if (!res.ok) {
          const text = await res.text()
          console.error("Profile update failed:", res.status, text)
          setMessageType("error")
          setMessage("Failed to update profile")
          return
        }

        const json = await res.json()
        const updated = json?.profile

        if (updated) {
          const name = [updated.first_name, updated.last_name].filter(Boolean).join(" ")
          setFullName(name)
          setEmail(updated.email || email)
          setPhone(updated.phone_number || phone)
        }

        setMessageType("success")
        setMessage("Profile updated successfully")
      } catch (err) {
        console.error("Error saving profile", err)
        setMessageType("error")
        setMessage("Failed to update profile")
      } finally {
        setIsSaving(false)
      }
    })()
  }

  async function handlePasswordSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setMessage(null)

    if (!currentPassword || !newPassword || !confirmPassword) {
      setMessageType("error")
      setMessage("Please fill in all password fields")
      return
    }

    if (newPassword !== confirmPassword) {
      setMessageType("error")
      setMessage("New password and confirm password do not match")
      return
    }

    setIsChangingPassword(true)

    try {
      const result = await ChangePassword({
        current_password: currentPassword,
        new_password: newPassword,
        confirm_password: confirmPassword,
      })

      if (!result.ok) {
        const detail = result.data?.detail || result.data?.message || "Failed to change password"
        setMessageType("error")
        setMessage(detail)
        return
      }

      setMessageType("success")
      setMessage("Password changed successfully")
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    } catch (err) {
      console.error("Change password error", err)
      setMessageType("error")
      setMessage("Failed to change password")
    } finally {
      setIsChangingPassword(false)
    }
  }

  return (
    <div className="relative overflow-hidden bg-[#f6f1eb]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(188,143,93,0.22),_transparent_38%),radial-gradient(circle_at_bottom_right,_rgba(91,62,39,0.18),_transparent_32%)]" />

      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-[#8a6a43]">Account</p>
            <h1 className="mt-2 text-4xl font-semibold tracking-[-0.04em] text-[#1d1a19]">My Profile</h1>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 self-start rounded-full border border-[#d9c8b4] bg-white/80 px-4 py-2.5 text-sm font-medium text-[#3a2f2a] backdrop-blur-sm transition hover:border-[#b68d5b] hover:text-[#1d1a19]"
          >
            Continue shopping
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[290px_minmax(0,1fr)]">
          <aside className="overflow-hidden rounded-[28px] border border-[#eadcc8] bg-[#fffdfb] shadow-[0_18px_50px_rgba(58,47,42,0.08)]">
            <div className="border-b border-[#f0e3d5] bg-[linear-gradient(135deg,#201c1a_0%,#3a2f2a_30%,#7b5a3d_100%)] px-6 py-8 text-white">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/12 text-lg font-semibold text-[#f7e7d1] ring-2 ring-white/25">
                  {initials}
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#f3ded0]">Welcome back</p>
                  <p className="mt-1 text-lg font-semibold text-white">{fullName || "Customer"}</p>
                </div>
              </div>
            </div>

            <div className="p-4">
              <div className="mb-3 rounded-2xl border border-[#f0e3d5] bg-[#faf4ef] p-3 text-xs font-medium uppercase tracking-[0.18em] text-[#7d6042]">
                My account
              </div>

              <nav className="space-y-2">
                <button
                  type="button"
                  onClick={() => setTab("personal")}
                  className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${
                    tab === "personal"
                      ? "bg-[#f4ebdf] text-[#3e2d24] ring-1 ring-inset ring-[#d8c2a4]"
                      : "text-[#4c433f] hover:bg-[#f6f2ee]"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <UserRound className="h-4 w-4" />
                    Personal info
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setTab("password")}
                  className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${
                    tab === "password"
                      ? "bg-[#f4ebdf] text-[#3e2d24] ring-1 ring-inset ring-[#d8c2a4]"
                      : "text-[#4c433f] hover:bg-[#f6f2ee]"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <LockKeyhole className="h-4 w-4" />
                    Change password
                  </span>
                </button>

                <Link
                  href="/addresses"
                  className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-medium text-[#4c433f] transition hover:bg-[#f6f2ee]"
                >
                  <span className="flex items-center gap-3">
                    <MapPin className="h-4 w-4" />
                    Saved addresses
                  </span>
                </Link>

                <Link
                  href="/forget-password"
                  className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-medium text-[#4c433f] transition hover:bg-[#f6f2ee]"
                >
                  <span className="flex items-center gap-3">
                    <ShieldCheck className="h-4 w-4" />
                    Forgot password
                  </span>
                </Link>
              </nav>
            </div>
          </aside>

          <main className="rounded-[28px] border border-[#eadcc8] bg-[#fffdfb] p-6 shadow-[0_18px_40px_rgba(58,47,42,0.06)] sm:p-8">
            <div className="mb-6 overflow-hidden rounded-[24px] border border-[#e7d7c2] bg-[linear-gradient(135deg,#f9f2e9_0%,#f2e7da_100%)] p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#8a6a43]">Member profile</p>
                  <h2 className="mt-2 text-xl font-semibold text-[#1d1a19]">
                    {fullName ? `Welcome, ${fullName}` : "Complete your profile"}
                  </h2>
                </div>
                
              </div>
            </div>

            <div className="mb-6 grid gap-4 md:grid-cols-3">
              <div className="group rounded-[22px] border border-[#eedec8] bg-[#f7efe7] p-4 transition hover:-translate-y-0.5 hover:shadow-md">
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#8a6a43]">Name</p>
                <p className="mt-3 text-lg font-semibold text-[#2b241f]">{fullName || "Not added yet"}</p>
              </div>
              <div className="group rounded-[22px] border border-[#dfeaf7] bg-[#eef6ff] p-4 transition hover:-translate-y-0.5 hover:shadow-md">
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#3b6ea7]">Email</p>
                <p className="mt-3 text-lg font-semibold text-[#2b241f]">{email || "No email"}</p>
              </div>
              <div className="group rounded-[22px] border border-[#dff1e9] bg-[#edfdf5] p-4 transition hover:-translate-y-0.5 hover:shadow-md">
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#2d7a5f]">Phone</p>
                <p className="mt-3 text-lg font-semibold text-[#2b241f]">{phone || "No phone"}</p>
              </div>
            </div>

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

            {error ? (
              <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
                {error}
                <button type="button" onClick={() => window.location.reload()} className="ml-3 underline">Try again</button>
              </div>
            ) : null}

            {loading ? (
              <div className="space-y-4 py-8">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="animate-pulse rounded-2xl border border-[#efe7dd] bg-[#f7f2ee] p-4">
                    <div className="h-4 w-28 rounded bg-[#e7d8c6]" />
                    <div className="mt-3 h-11 w-full rounded-xl bg-[#e7d8c6]" />
                  </div>
                ))}
              </div>
            ) : tab === "personal" ? (
              <section className="rounded-[24px] border border-[#efe1d0] bg-[#fffaf5] p-5 sm:p-6">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <div>
                    <h2 className="text-2xl font-semibold text-[#1d1a19]">Personal Information</h2>
                    <p className="mt-1 text-sm text-[#6b625d]">Keep your details refined and up to date.</p>
                  </div>
                  <div className="hidden rounded-full border border-[#e3d0b3] bg-[#f9f0e6] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-[#7a6047] sm:inline-flex">
                    Details
                  </div>
                </div>

                <form onSubmit={handlePersonalSubmit} className="space-y-5">
                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-[#4c433f]">Full name</label>
                      <div className="relative">
                        <UserRound className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-[#9b8a7a]" />
                        <input
                          name="fullName"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full rounded-2xl border border-[#e8dcc9] bg-[#faf6f1] py-3 pl-10 pr-3 text-[#1d1a19] outline-none transition focus:border-[#c79d6b] focus:bg-white"
                          placeholder="Your full name"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-[#4c433f]">Phone</label>
                      <div className="relative">
                        <Phone className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-[#9b8a7a]" />
                        <input
                          name="phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full rounded-2xl border border-[#e8dcc9] bg-[#faf6f1] py-3 pl-10 pr-3 text-[#1d1a19] outline-none transition focus:border-[#c79d6b] focus:bg-white"
                          placeholder="Phone number"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#4c433f]">Email</label>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-[#9b8a7a]" />
                      <input
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-2xl border border-[#e8dcc9] bg-[#faf6f1] py-3 pl-10 pr-3 text-[#1d1a19] outline-none transition focus:border-[#c79d6b] focus:bg-white"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="inline-flex items-center justify-center rounded-2xl bg-[#1d1a19] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#362f2b] disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {isSaving ? "Saving..." : "Save changes"}
                    </button>
                  </div>
                </form>
              </section>
            ) : (
              <section className="rounded-[24px] border border-[#efe1d0] bg-[#fffaf5] p-5 sm:p-6">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <div>
                    <h2 className="text-2xl font-semibold text-[#1d1a19]">Change Password</h2>
                    <p className="mt-1 text-sm text-[#6b625d]">Use a strong password to protect your account.</p>
                  </div>
                  <div className="hidden rounded-full border border-[#e3d0b3] bg-[#f9f0e6] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-[#7a6047] sm:inline-flex">
                    Security
                  </div>
                </div>

                <form onSubmit={handlePasswordSubmit} className="space-y-5">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#4c433f]">Current password</label>
                    <input
                      name="currentPassword"
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full rounded-2xl border border-[#e8dcc9] bg-[#faf6f1] px-3 py-3 text-[#1d1a19] outline-none transition focus:border-[#c79d6b] focus:bg-white"
                      placeholder="Enter current password"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#4c433f]">New password</label>
                    <input
                      name="newPassword"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full rounded-2xl border border-[#e8dcc9] bg-[#faf6f1] px-3 py-3 text-[#1d1a19] outline-none transition focus:border-[#c79d6b] focus:bg-white"
                      placeholder="Create a new password"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#4c433f]">Confirm new password</label>
                    <input
                      name="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full rounded-2xl border border-[#e8dcc9] bg-[#faf6f1] px-3 py-3 text-[#1d1a19] outline-none transition focus:border-[#c79d6b] focus:bg-white"
                      placeholder="Confirm your new password"
                    />
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      disabled={isChangingPassword}
                      className="inline-flex items-center justify-center rounded-2xl bg-[#7b5a3d] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#624b35] disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {isChangingPassword ? "Updating..." : "Update password"}
                    </button>
                  </div>
                </form>
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
