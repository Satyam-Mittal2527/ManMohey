"use client";

import { useState } from "react";
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
];

export default function NavBar() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <nav className="bg-white border-b border-slate-100 shadow-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center-safe h-10">
          {/* Desktop Navigation */}
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
                  <span className="text-sm font-medium text-slate-700 hover:text-slate-900">
                    {category.name}
                  </span>
                </Link>
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          {/* <div className="md:hidden flex items-center">
            <button
              onClick={() =>
                setActiveCategory(
                  activeCategory ? null : categories[0].name
                )
              }
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-700 hover:bg-slate-100 focus:outline-none transition-colors"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div> */}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          {activeCategory && (
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-slate-100">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className="flex items-center gap-2 block px-3 py-2 rounded-md text-base font-medium text-slate-700 border border-slate-300 hover:text-slate-900 hover:bg-slate-50 hover:border-slate-400 transition-colors"
                >
                  {category.image && (
                    <img
                      src={category.image}
                      alt={category.name}
                      className="h-5 w-5 object-contain"
                    />
                  )}
                  {category.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}