"use client"

import { useState } from "react"
// import NavBar from "../(webstie)/_components/NavBar"
import { Search } from "lucide-react";
import Link from "next/link";
const categories = [
  {
    name: "Sarees",
    href: "/collections/sarees",
    image: "/saree_icon.png",
    description: "Timeless elegance in every drape",
  },
  {
    name: "Kurtis",
    href: "/collections/kurtis",
    image: "/kurti_icon.png",
    description: "Comfort meets style",
  },
  {
    name: "Lehengas",
    href: "/collections/lehengas",
    image: "/lehenga_icon.png",
    description: "Celebrate in grace and beauty",
  },
  {
    name: "Unstich",
    href: "/collections/unstich",
    image: "/saree_icon.png",
    description: "Perfect everyday elegance",
  },
  {
    name: "Bridal",
    href: "/collections/bridal",
    image: "/bridal_icon.png",
    description: "Modern meets traditional",
  },
  {
    name: "Beauty",
    href: "/collections/beauty",
    image: "/beauty_icon.png",
    description: "Modern meets traditional",
  },
  {
    name: "Lingerie",
    href: "/collections/lingerie",
    image: "/lingerie_icon.png",
    description: "Modern meets traditional",
  },
];
export default function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="flex flex-col">
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="mx-auto flex w-full items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 text-slate-900">
            <a href="/">
              <img src="/Logo.png" alt="ManMohey logo" className="h-12 w-auto" />
            </a>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-700">
            <div className="flex flex-row gap-8 justify-center-safe">
              {categories.map((category) => (
                <div key={category.name} className="relative group">
                  <Link
                    href={category.href}
                    className="flex flex-col items-center transition delay-100 duration-200 ease-in-out hover:-translate-y-1 hover:bg-slate-200"
                  >
                    {category.image && (
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-17 h-20 items-center"
                      />
                    )}
                    <span className="text-lg font-medium text-slate-700 hover:text-slate-900">
                      {category.name}
                    </span>
                  </Link>
                </div>
              ))}
            </div>
            {/* <a href="/newArrivals" className="hover:text-slate-900">New Arrivals</a>
            <a href="/bestSellers" className="hover:text-slate-900">Best Sellers</a>
            <a href="/sale" className="hover:text-slate-900">Sale</a> */}
            {/* <button className="hover:text-slate-900" onClick={() => setIsNavBarVisible(!isNavBarVisible)}>Collections</button> */}
          </nav>
          <div className="md:flex items-center bg-white rounded-full border border-gray-300 px-4 py-2 md:w-[400px] hidden">
            <Search className="h-5 w-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search for Sarees, Kurtis, Lehengas..."
              className="ml-2 flex-1 outline-none bg-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4 text-sm text-slate-700">
            <a href="/cart" className="flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 hover:border-slate-300 hover:text-slate-900">
              <span className="inline-flex h-5 w-5 items-center justify-center text-slate-500">🛒</span>
              <span>Cart</span>
            </a>
            <a href="/login" className="flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 hover:border-slate-300 hover:text-slate-900">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-slate-600">👤</span>
              <span>Profile</span>
            </a>
          </div>
        </div>
      </header>
      {/* <div className={`block md:${isNavBarVisible ? "block" : "hidden"}`}>
        <NavBar />
      </div> */}
      <nav className="md:hidden overflow-x-auto flex items-center gap-8 text-sm font-medium text-slate-700">
        <div className="flex flex-row gap-8 justify-center-safe">
          {categories.map((category) => (
            <div key={category.name} className="relative group">
              <Link
                href={category.href}
                className="flex flex-col items-center transition delay-100 duration-200 ease-in-out hover:-translate-y-1 hover:bg-slate-200"
              >
                {category.image && (
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-17 h-20 items-center"
                  />
                )}
                <span className="text-lg font-medium text-slate-700 hover:text-slate-900">
                  {category.name}
                </span>
              </Link>
            </div>
          ))}
        </div>
        {/* <a href="/newArrivals" className="hover:text-slate-900">New Arrivals</a>
            <a href="/bestSellers" className="hover:text-slate-900">Best Sellers</a>
            <a href="/sale" className="hover:text-slate-900">Sale</a> */}
        {/* <button className="hover:text-slate-900" onClick={() => setIsNavBarVisible(!isNavBarVisible)}>Collections</button> */}
      </nav>
    </div>
  )
}