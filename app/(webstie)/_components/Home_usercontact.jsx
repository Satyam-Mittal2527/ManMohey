"use client";

import { useState } from "react";
import { SubscribeToNewsletter } from "@/lib/api";

export default function Home_usercontact() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("idle");
    const [message, setMessage] = useState("");

    async function handleNewsletterSubmit(event) {
        event.preventDefault();
        if (status === "loading") return;

        const normalizedEmail = email.trim();
        if (!normalizedEmail) {
            setStatus("error");
            setMessage("Please enter your email address.");
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
            setStatus("error");
            setMessage("Please enter a valid email address.");
            return;
        }

        setStatus("loading");
        setMessage("");
        const result = await SubscribeToNewsletter(normalizedEmail);

        if (result.ok) {
            setStatus("success");
            setMessage(result.data?.message || "Please check your inbox to confirm your subscription.");
            setEmail("");
        } else {
            setStatus("error");
            setMessage(typeof result.data?.detail === "string"
                ? result.data.detail
                : "We couldn’t subscribe you right now. Please try again later.");
        }
    }

    return (
        <div className="mt-14 rounded-3xl border border-slate-200 bg-slate-50 px-6 py-8 sm:px-8 lg:px-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Still have questions?</p>
                    <p className="mt-3 text-sm text-slate-600">Reach out to our team anytime.</p>
                </div>
                <a href="/contact" className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800">Contact</a>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-[2fr_1fr]">
                <div className="rounded-2xl bg-white px-4 py-4 shadow-sm shadow-slate-200">
                    <label className="text-sm font-semibold text-slate-900" htmlFor="newsletter-email">Stay in the loop</label>
                    <p className="mt-2 text-sm text-slate-600">Get updates on new collections and exclusive offers.</p>
                </div>
                <form noValidate onSubmit={handleNewsletterSubmit} className="flex flex-col gap-2">
                    <div className="flex rounded-2xl border border-slate-200 bg-slate-900 p-3">
                        <input
                            id="newsletter-email"
                            type="email"
                            required
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="Your email here"
                            autoComplete="email"
                            aria-describedby="newsletter-feedback"
                            disabled={status === "loading"}
                            className="min-w-0 flex-1 rounded-l-2xl border border-slate-900 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 disabled:opacity-70"
                        />
                        <button
                            type="submit"
                            disabled={status === "loading"}
                            aria-busy={status === "loading"}
                            className="rounded-r-2xl bg-slate-200 px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-300 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {status === "loading" ? "Subscribing…" : "Subscribe"}
                        </button>
                    </div>
                    <p
                        id="newsletter-feedback"
                        aria-live="polite"
                        className={`min-h-5 text-sm ${status === "error" ? "text-red-700" : "text-green-700"}`}
                    >
                        {message}
                    </p>
                </form>
            </div>
        </div>
    )
}