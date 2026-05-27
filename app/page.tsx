export default function Home() {
    return (
        <main className="bg-slate-50">
            <section className="overflow-hidden bg-gradient-to-r from-rose-400 via-fuchsia-500 to-orange-400 text-white">
                <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 py-16 sm:px-6 lg:flex-row lg:items-center lg:py-24 lg:px-8">
                    <div className="lg:w-1/2">
                        <div className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-white/10 p-6 shadow-2xl shadow-slate-950/15 sm:p-8">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.35),transparent_35%)]" />
                            <div className="relative h-[420px] overflow-hidden rounded-[1.75rem] bg-slate-950">
                                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-95" />
                                <div className="absolute inset-0 bg-slate-950/35" />
                                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                                    <p className="text-xs uppercase tracking-[0.35em] text-white/80">Saree Fabrics</p>
                                    <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Elegance tailored for every occasion</h2>
                                    <p className="mt-3 max-w-xs text-sm leading-6 text-white/75">
                                        Discover luxurious sarees designed to bring grace, color, and comfort to your wardrobe.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-1/2 lg:pl-12">
                        <p className="text-sm font-semibold uppercase tracking-[0.4em] text-white/85">Saree Fabrics</p>
                        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                            That define grace
                        </h1>
                        <p className="mt-6 max-w-xl text-lg leading-8 text-white/85">
                            We bring authentic Indian fashion to your wardrobe with handcrafted sarees, bold prints, and premium fabrics made for every celebration.
                        </p>
                        <div className="mt-10 flex flex-wrap gap-4">
                            <a href="/collections" className="inline-flex items-center justify-center rounded-full bg-slate-950 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-950/30 transition hover:bg-slate-900">
                                Shop now
                            </a>
                            <a href="/bestSellers" className="inline-flex items-center justify-center rounded-full border border-white/40 bg-white/10 px-8 py-3 text-sm font-semibold text-white/90 transition hover:border-white/60 hover:bg-white/15">
                                Explore best sellers
                            </a>
                        </div>
                        <div className="mt-10 grid gap-4 sm:grid-cols-3">
                            <div className="rounded-3xl bg-white/10 px-5 py-6 text-center backdrop-blur-sm">
                                <p className="text-sm uppercase tracking-[0.3em] text-white/70">Quality</p>
                                <p className="mt-4 text-base font-semibold text-white">Handcrafted with care</p>
                            </div>
                            <div className="rounded-3xl bg-white/10 px-5 py-6 text-center backdrop-blur-sm">
                                <p className="text-sm uppercase tracking-[0.3em] text-white/70">Selection</p>
                                <p className="mt-4 text-base font-semibold text-white">Wide range of styles</p>
                            </div>
                            <div className="rounded-3xl bg-white/10 px-5 py-6 text-center backdrop-blur-sm">
                                <p className="text-sm uppercase tracking-[0.3em] text-white/70">Returns</p>
                                <p className="mt-4 text-base font-semibold text-white">Hassle-free exchanges</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

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

            <section className="bg-slate-50 py-14">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Trusted by women across India and beyond</p>
                    </div>
                    <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
                        <div className="rounded-full bg-slate-200 px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.24em] text-slate-700">Brand name</div>
                        <div className="rounded-full bg-slate-200 px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.24em] text-slate-700">Brand name</div>
                        <div className="rounded-full bg-slate-200 px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.24em] text-slate-700">Brand name</div>
                        <div className="rounded-full bg-slate-200 px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.24em] text-slate-700">Brand name</div>
                        <div className="rounded-full bg-slate-200 px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.24em] text-slate-700">Brand name</div>
                        <div className="rounded-full bg-slate-200 px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.24em] text-slate-700">Brand name</div>
                        <div className="rounded-full bg-slate-200 px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.24em] text-slate-700">Brand name</div>
                    </div>
                </div>
            </section>
            <section className="bg-white py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Trending</p>
                        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">Trending</h2>
                        <p className="mt-4 max-w-2xl mx-auto text-sm text-slate-600">Browse our most-loved pieces from the latest collections.</p>
                    </div>

                    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                        <div className="overflow-hidden rounded-[2rem] bg-slate-100 shadow-sm shadow-slate-200/50">
                            <img src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80" alt="Trending product" className="h-48 w-full object-cover" />
                        </div>
                        <div className="overflow-hidden rounded-[2rem] bg-slate-100 shadow-sm shadow-slate-200/50">
                            <img src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80" alt="Trending product" className="h-48 w-full object-cover" />
                        </div>
                        <div className="overflow-hidden rounded-[2rem] bg-slate-100 shadow-sm shadow-slate-200/50">
                            <img src="https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=800&q=80" alt="Trending product" className="h-48 w-full object-cover" />
                        </div>
                        <div className="overflow-hidden rounded-[2rem] bg-slate-100 shadow-sm shadow-slate-200/50">
                            <img src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=800&q=80" alt="Trending product" className="h-48 w-full object-cover" />
                        </div>
                        <div className="overflow-hidden rounded-[2rem] bg-slate-100 shadow-sm shadow-slate-200/50">
                            <img src="https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=80" alt="Trending product" className="h-48 w-full object-cover" />
                        </div>
                        <div className="overflow-hidden rounded-[2rem] bg-slate-100 shadow-sm shadow-slate-200/50">
                            <img src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80" alt="Trending product" className="h-48 w-full object-cover" />
                        </div>
                        <div className="overflow-hidden rounded-[2rem] bg-slate-100 shadow-sm shadow-slate-200/50">
                            <img src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80" alt="Trending product" className="h-48 w-full object-cover" />
                        </div>
                        <div className="overflow-hidden rounded-[2rem] bg-slate-100 shadow-sm shadow-slate-200/50">
                            <img src="https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=800&q=80" alt="Trending product" className="h-48 w-full object-cover" />
                        </div>
                        <div className="overflow-hidden rounded-[2rem] bg-slate-100 shadow-sm shadow-slate-200/50">
                            <img src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=800&q=80" alt="Trending product" className="h-48 w-full object-cover" />
                        </div>
                        <div className="overflow-hidden rounded-[2rem] bg-slate-100 shadow-sm shadow-slate-200/50">
                            <img src="https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=80" alt="Trending product" className="h-48 w-full object-cover" />
                        </div>
                        <div className="overflow-hidden rounded-[2rem] bg-slate-100 shadow-sm shadow-slate-200/50">
                            <img src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80" alt="Trending product" className="h-48 w-full object-cover" />
                        </div>
                        <div className="overflow-hidden rounded-[2rem] bg-slate-100 shadow-sm shadow-slate-200/50">
                            <img src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80" alt="Trending product" className="h-48 w-full object-cover" />
                        </div>
                        <div className="overflow-hidden rounded-[2rem] bg-slate-100 shadow-sm shadow-slate-200/50">
                            <img src="https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=800&q=80" alt="Trending product" className="h-48 w-full object-cover" />
                        </div>
                        <div className="overflow-hidden rounded-[2rem] bg-slate-100 shadow-sm shadow-slate-200/50">
                            <img src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=800&q=80" alt="Trending product" className="h-48 w-full object-cover" />
                        </div>
                        <div className="overflow-hidden rounded-[2rem] bg-slate-100 shadow-sm shadow-slate-200/50">
                            <img src="https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=80" alt="Trending product" className="h-48 w-full object-cover" />
                        </div>
                        <div className="overflow-hidden rounded-[2rem] bg-slate-100 shadow-sm shadow-slate-200/50">
                            <img src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80" alt="Trending product" className="h-48 w-full object-cover" />
                        </div>
                        <div className="overflow-hidden rounded-[2rem] bg-slate-100 shadow-sm shadow-slate-200/50">
                            <img src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80" alt="Trending product" className="h-48 w-full object-cover" />
                        </div>
                        <div className="overflow-hidden rounded-[2rem] bg-slate-100 shadow-sm shadow-slate-200/50">
                            <img src="https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=800&q=80" alt="Trending product" className="h-48 w-full object-cover" />
                        </div>
                        <div className="overflow-hidden rounded-[2rem] bg-slate-100 shadow-sm shadow-slate-200/50">
                            <img src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=800&q=80" alt="Trending product" className="h-48 w-full object-cover" />
                        </div>
                        <div className="overflow-hidden rounded-[2rem] bg-slate-100 shadow-sm shadow-slate-200/50">
                            <img src="https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=80" alt="Trending product" className="h-48 w-full object-cover" />
                        </div>
                        <div className="overflow-hidden rounded-[2rem] bg-slate-100 shadow-sm shadow-slate-200/50">
                            <img src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80" alt="Trending product" className="h-48 w-full object-cover" />
                        </div>
                        <div className="overflow-hidden rounded-[2rem] bg-slate-100 shadow-sm shadow-slate-200/50">
                            <img src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80" alt="Trending product" className="h-48 w-full object-cover" />
                        </div>
                        <div className="overflow-hidden rounded-[2rem] bg-slate-100 shadow-sm shadow-slate-200/50">
                            <img src="https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=800&q=80" alt="Trending product" className="h-48 w-full object-cover" />
                        </div>
                    </div>
                </div>
            </section>
            <section className="bg-white py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-12">
                        <h2 className="text-3xl font-semibold tracking-tight text-slate-900">FAQs</h2>
                        <p className="mt-3 max-w-2xl text-sm text-slate-600">Find answers to questions about our collections, shipping, and returns.</p>
                    </div>

                    <div className="grid gap-12 lg:grid-cols-3">
                        <div className="space-y-8 text-sm text-slate-700">
                            <div>
                                <h3 className="font-semibold text-slate-900">How long does shipping take?</h3>
                                <p className="mt-3 text-slate-600">We ship within five to seven business days. International orders typically arrive within two to three weeks depending on your location. You’ll receive tracking information once your order leaves our warehouse.</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-900">How do I care for my saree?</h3>
                                <p className="mt-3 text-slate-600">Each piece comes with care instructions. Generally, hand wash or dry clean to preserve the fabric and embroidery. Store in a cool, dry place away from direct sunlight.</p>
                            </div>
                        </div>

                        <div className="space-y-8 text-sm text-slate-700">
                            <div>
                                <h3 className="font-semibold text-slate-900">What is your return policy?</h3>
                                <p className="mt-3 text-slate-600">We offer thirty days for returns or exchanges from the date of purchase. Items must be unworn and in original condition with all tags attached. Contact our support team to initiate the process.</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-900">Can I customize my order?</h3>
                                <p className="mt-3 text-slate-600">We offer limited customization options for select pieces. Contact our team to discuss your specific needs and we’ll work with you on possibilities.</p>
                            </div>
                        </div>

                        <div className="space-y-8 text-sm text-slate-700">
                            <div>
                                <h3 className="font-semibold text-slate-900">Do you ship internationally?</h3>
                                <p className="mt-3 text-slate-600">Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location. Check our shipping page for specific details about your destination.</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-900">What payment methods do you accept?</h3>
                                <p className="mt-3 text-slate-600">We accept all major credit cards, digital wallets, and bank transfers. Your payment information is secure and encrypted during checkout.</p>
                            </div>
                        </div>
                    </div>

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
                </div>
            </section>

        </main>
    )
}
