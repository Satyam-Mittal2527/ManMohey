"use client"

import { useState, useEffect } from "react"
import { ChangePassword } from "@/lib/api";

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

    useEffect(() => {
        async function loadProfile() {
            try {
                    const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL as string) || "http://localhost:8000"
                    const res = await fetch(`${baseUrl}/api/User/me`, { credentials: "include" })
                    console.log("/api/User/me status:", res.status)
                    if (!res.ok) {
                        const text = await res.text()
                        console.error("/api/User/me returned non-OK:", res.status, text)
                        setError("Failed to load profile")
                        return
                    }
                    const json = await res.json()
                console.log("/api/User/me response:", json)
                const profile = json?.profile
                if (profile) {
                    const name = [profile.first_name, profile.last_name].filter(Boolean).join(" ")
                    setFullName(name)
                    setEmail(profile.email || "")
                    setPhone(profile.phone_number || "")
                    setError(null)
                } else if (json?.user) {
                    // fallback to user object
                    setEmail(json.user.email || "")
                    setError(null)
                } else {
                    setError("No profile data found. Please log in.")
                }
                setLoading(false)
            } catch (err) {
                console.error("Failed to load profile", err)
                setError("Failed to load profile")
                setLoading(false)
            }
        }

        loadProfile()
    }, [])

    function handlePersonalSubmit(e: React.FormEvent) {
            e.preventDefault()
            ;(async () => {
                try {
                    const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL as string) || "http://localhost:8000"
                    // split fullName into first and last
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
                        const t = await res.text()
                        console.error("Profile update failed:", res.status, t)
                        setError("Failed to update profile")
                        setMessage(null)
                        setMessageType("error")
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
                    setError(null)
                    setMessage("Profile updated successfully")
                    setMessageType("success")
                } catch (err) {
                    console.error("Error saving profile", err)
                    setError("Failed to update profile")
                    setMessage(null)
                    setMessageType("error")
                }
            })()
    }

    async function handlePasswordSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError(null)

        if (!currentPassword || !newPassword || !confirmPassword) {
            setError("Please fill in all password fields")
            return
        }

        if (newPassword !== confirmPassword) {
            setError("New password and confirm password do not match")
            return
        }

        try {
            const result = await ChangePassword({
                current_password: currentPassword,
                new_password: newPassword,
                confirm_password: confirmPassword,
            })

            if (!result.ok) {
                const detail = result.data?.detail || result.data?.message || "Failed to change password"
                setError(detail)
                setMessage(null)
                setMessageType("error")
                return
            }

            setError(null)
            setMessage("Password changed successfully")
            setMessageType("success")
            setCurrentPassword("")
            setNewPassword("")
            setConfirmPassword("")
        } catch (err) {
            console.error("Change password error", err)
            setError("Failed to change password")
        }
    }

    return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-semibold mb-8 text-center">My Profile</h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <aside className="md:col-span-1 bg-white p-6 border rounded">
                    <nav className="space-y-3">
                        <button
                            type="button"
                            onClick={() => setTab("personal")}
                            className={`w-full text-left px-4 py-3 rounded ${tab === "personal" ? "bg-gray-900 text-white" : "bg-transparent text-gray-700"}`}
                        >
                            Personal Information
                        </button>

                        <button
                            type="button"
                            onClick={() => setTab("password")}
                            className={`w-full text-left px-4 py-3 rounded ${tab === "password" ? "bg-gray-900 text-white" : "bg-transparent text-gray-700"}`}
                        >
                            Change Password
                        </button>
                        <a
                            href="/forget-password"
                            className="w-full block text-left px-4 py-3 rounded border border-dashed border-gray-300 text-gray-700 hover:bg-gray-50"
                        >
                            Forgot Password
                        </a>
                    </nav>
                </aside>

                <main className="md:col-span-3 bg-white p-6 border rounded">
                    {message ? (
                        <div className={`mb-4 rounded border p-4 ${messageType === "success" ? "border-green-200 bg-green-50 text-green-700" : "border-red-200 bg-red-50 text-red-700"}`}>
                            {message}
                        </div>
                    ) : null}
                    {error ? (
                        <div className="mb-4 rounded border border-red-200 bg-red-50 p-4 text-red-700">
                            {error}
                        </div>
                    ) : null}
                    {loading ? (
                        <div className="py-10 text-center text-gray-500">Loading personal information...</div>
                    ) : tab === "personal" ? (
                        <section>
                            <h2 className="text-xl font-medium mb-4">Personal Information</h2>
                            <form onSubmit={handlePersonalSubmit} className="space-y-4 max-w-xl">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Full name</label>
                                    <input name="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} className="mt-1 block w-full border rounded px-3 py-2" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email</label>
                                    <input name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full border rounded px-3 py-2" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                                    <input name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1 block w-full border rounded px-3 py-2" />
                                </div>

                                <div>
                                    <button type="submit" className="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded">Save changes</button>
                                </div>
                            </form>
                        </section>
                    ) : (
                        <section>
                            <h2 className="text-xl font-medium mb-4">Change Password</h2>
                            <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-xl">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Current password</label>
                                    <input
                                        name="currentPassword"
                                        type="password"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        className="mt-1 block w-full border rounded px-3 py-2"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">New password</label>
                                    <input
                                        name="newPassword"
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="mt-1 block w-full border rounded px-3 py-2"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Confirm new password</label>
                                    <input
                                        name="confirmPassword"
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="mt-1 block w-full border rounded px-3 py-2"
                                    />
                                </div>

                                <div>
                                    <button type="submit" className="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded">Update password</button>
                                </div>
                            </form>
                        </section>
                    )}
                </main>
            </div>
        </div>
    )
}