import "./globals.css";

export const metadata = {
  title: "ManMohey",
  description: "ManMohey Clothing Website",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
        <header className="bg-white border-b border-slate-200 shadow-sm">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 text-slate-900">
              <a href="/">
                <img src="/Logo.png" alt="ManMohey logo" className="h-10 w-auto" />
              </a>
            </div>

            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-700">
              <a href="/newArrivals" className="hover:text-slate-900">New Arrivals</a>
              <a href="/bestSellers" className="hover:text-slate-900">Best Sellers</a>
              <a href="/sale" className="hover:text-slate-900">Sale</a>
              <div className="relative group">
                <a href="/collections" className="inline-flex items-center gap-2 hover:text-slate-900">
                  Collections
                  <span className="text-xs text-slate-400">▾</span>
                </a>
                <div className="invisible absolute left-1/2 top-full z-50 mt-2 -translate-x-1/2 w-[58rem] max-w-[calc(100vw-2rem)] overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-100 p-6 opacity-0 shadow-2xl transition duration-200 group-hover:visible group-hover:opacity-100">
                  <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr]">
                    <div className="rounded-[1.75rem] bg-slate-50 p-8">
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Indian wear</p>
                      <div className="mt-8 space-y-6 text-sm text-slate-800">
                        <div>
                          <a href="/collections/sarees" className="font-semibold hover:text-slate-900">Sarees</a>
                          <p className="mt-1 text-xs text-slate-500">Timeless elegance in every drape</p>
                        </div>
                        <div>
                          <a href="/collections/kurtis" className="font-semibold hover:text-slate-900">Kurtis</a>
                          <p className="mt-1 text-xs text-slate-500">Comfort meets style in our collection</p>
                        </div>
                        <div>
                          <a href="/collections/lehengas" className="font-semibold hover:text-slate-900">Lehengas</a>
                          <p className="mt-1 text-xs text-slate-500">Celebrate in grace and beauty</p>
                        </div>
                        <div>
                          <a href="/collections/salwar-suits" className="font-semibold hover:text-slate-900">Salwar suits</a>
                          <p className="mt-1 text-xs text-slate-500">Perfect for everyday elegance</p>
                        </div>
                        <div>
                          <a href="/collections/western-wear" className="font-semibold hover:text-slate-900">Western wear</a>
                          <p className="mt-1 text-xs text-slate-500">Modern pieces for relaxed style</p>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-[1.75rem] bg-slate-200 p-6">
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Read more</p>
                      <div className="mt-4 space-y-4">
                        <a href="/fabric-care" className="flex gap-4 rounded-[1.5rem] bg-white p-4 shadow-sm hover:bg-slate-50">
                          <div className="h-20 w-28 overflow-hidden rounded-xl bg-[url('https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=800&q=80')] bg-cover bg-center" />
                          <div>
                            <p className="font-semibold text-slate-900">Fabric care essentials</p>
                            <p className="mt-1 text-xs text-slate-500">Keep your clothes looking new.</p>
                          </div>
                        </a>
                        <a href="/about" className="flex gap-4 rounded-[1.5rem] bg-white p-4 shadow-sm hover:bg-slate-50">
                          <div className="h-20 w-28 overflow-hidden rounded-xl bg-[url('https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80')] bg-cover bg-center" />
                          <div>
                            <p className="font-semibold text-slate-900">About us</p>
                            <p className="mt-1 text-xs text-slate-500">Learn our story and values.</p>
                          </div>
                        </a>
                      </div>
                      <div className="mt-6 grid gap-4">
                        <div className="rounded-[1.5rem] bg-white p-4 text-sm shadow-sm">
                          <p className="font-semibold text-slate-900">About Us</p>
                          <p className="mt-2 text-xs text-slate-500">Learn our story and values.</p>
                        </div>
                        <div className="rounded-[1.5rem] bg-white p-4 text-sm shadow-sm">
                          <p className="font-semibold text-slate-900">Contact</p>
                          <p className="mt-2 text-xs text-slate-500">Reach out anytime you need us.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </nav>

            <div className="flex items-center gap-4 text-sm text-slate-700">
              <a href="/cart" className="flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 hover:border-slate-300 hover:text-slate-900">
                <span className="inline-flex h-5 w-5 items-center justify-center text-slate-500">🛒</span>
                <span>Cart</span>
              </a>
              <a href="/profile" className="flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 hover:border-slate-300 hover:text-slate-900">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-slate-600">👤</span>
                <span>Profile</span>
              </a>
            </div>
          </div>
        </header>

        <main className="flex-1">
          {children}
        </main>

        <footer className="border-t border-slate-200 bg-white text-slate-900">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-6 lg:px-6">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-900">Shop</h3>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li><a href="/newArrivals" className="hover:text-slate-900">New arrivals</a></li>
                <li><a href="/bestSellers" className="hover:text-slate-900">Best sellers</a></li>
                <li><a href="/sale" className="hover:text-slate-900">Sale items</a></li>
                <li><a href="/collections" className="hover:text-slate-900">All collections</a></li>
                <li><a href="/collections" className="hover:text-slate-900">By category</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-900">Collections</h3>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li><a href="/collections/sarees" className="hover:text-slate-900">Sarees</a></li>
                <li><a href="/collections/kurtis" className="hover:text-slate-900">Kurtis</a></li>
                <li><a href="/collections/lehengas" className="hover:text-slate-900">Lehengas</a></li>
                <li><a href="/collections/salwar-suits" className="hover:text-slate-900">Salwar suits</a></li>
                <li><a href="/collections/western-wear" className="hover:text-slate-900">Western wear</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-900">Support</h3>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li><a href="/contact" className="hover:text-slate-900">Contact us</a></li>
                <li><a href="/faqs" className="hover:text-slate-900">FAQs</a></li>
                <li><a href="/returns" className="hover:text-slate-900">Returns</a></li>
                <li><a href="/shipping" className="hover:text-slate-900">Shipping info</a></li>
                <li><a href="/size-guide" className="hover:text-slate-900">Size guide</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-900">Company</h3>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li><a href="/about" className="hover:text-slate-900">About ManMohey</a></li>
                <li><a href="/story" className="hover:text-slate-900">Our story</a></li>
                <li><a href="/team" className="hover:text-slate-900">Meet team</a></li>
                <li><a href="/testimonials" className="hover:text-slate-900">Testimonials</a></li>
                <li><a href="/blog" className="hover:text-slate-900">Blog</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-900">Legal</h3>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li><a href="/privacy" className="hover:text-slate-900">Privacy policy</a></li>
                <li><a href="/terms" className="hover:text-slate-900">Terms of service</a></li>
                <li><a href="/cookies" className="hover:text-slate-900">Cookie policy</a></li>
                <li><a href="/accessibility" className="hover:text-slate-900">Accessibility</a></li>
                <li><a href="/account" className="hover:text-slate-900">Account</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-900">My account</h3>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li><a href="/order-history" className="hover:text-slate-900">Order history</a></li>
                <li><a href="/saved-items" className="hover:text-slate-900">Saved items</a></li>
                <li><a href="/wishlist" className="hover:text-slate-900">Wishlist</a></li>
                <li><a href="/sign-out" className="hover:text-slate-900">Sign out</a></li>
                <li><a href="/login" className="hover:text-slate-900">Log in</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-200 bg-slate-950 text-slate-100">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
              <div className="flex items-center gap-3">
                <img src="/Logo.png" alt="ManMohey logo" className="h-10 w-auto" />
              </div>
              <p className="text-sm text-slate-400">© 2026 ManMohey. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
