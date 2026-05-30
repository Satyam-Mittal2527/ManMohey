export default function Home_usercontact() {
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
                <form className="flex rounded-2xl border border-slate-200 bg-slate-900 p-3">
                    <input id="newsletter-email" type="email" placeholder="Your email here" className="min-w-0 flex-1 rounded-l-2xl border border-slate-900 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500" />
                    <button type="submit" className="rounded-r-2xl bg-slate-200 px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-300">Subscribe</button>
                </form>
            </div>
        </div>
    )
}