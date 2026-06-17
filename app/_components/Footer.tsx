export default function Footer(){
    return (
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
    )
}