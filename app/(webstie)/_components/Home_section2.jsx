export default function Home_section2() {
    return (
        <section className="bg-white py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">See it worn</p>
                    <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">How our pieces look on real women like you</h2>
                </div>

                <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
                    <div className="overflow-hidden rounded-[2rem] bg-slate-100 shadow-lg shadow-slate-200/50">
                        <img
                            src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80"
                            alt="Model wearing saree"
                            className="h-full w-full object-cover"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="overflow-hidden rounded-[1.75rem] bg-slate-100 shadow-lg shadow-slate-200/40">
                            <img
                                src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80"
                                alt="Model in saree"
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <div className="overflow-hidden rounded-[1.75rem] bg-slate-100 shadow-lg shadow-slate-200/40">
                            <img
                                src="https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=800&q=80"
                                alt="Model in lehenga"
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <div className="overflow-hidden rounded-[1.75rem] bg-slate-100 shadow-lg shadow-slate-200/40">
                            <img
                                src="https://images.unsplash.com/photo-1516685018646-5491f6b0d3bc?auto=format&fit=crop&w=800&q=80"
                                alt="Model in bridal outfit"
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <div className="overflow-hidden rounded-[1.75rem] bg-slate-100 shadow-lg shadow-slate-200/40">
                            <img
                                src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80"
                                alt="Model in ethnic wear"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}