export default function Header(){
    return (
        <header className="bg-white border-b border-slate-200 shadow-sm">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 text-slate-900">
              <a href="/">
                <img src="/Logo.png" alt="ManMohey logo" className="h-12 w-auto" />
              </a>
            </div>

            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-700">
              <a href="/newArrivals" className="hover:text-slate-900">New Arrivals</a>
              <a href="/bestSellers" className="hover:text-slate-900">Best Sellers</a>
              <a href="/sale" className="hover:text-slate-900">Sale</a>
              <a href="/collections" className="hover:text-slate-900">Collections</a>
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

    )
}