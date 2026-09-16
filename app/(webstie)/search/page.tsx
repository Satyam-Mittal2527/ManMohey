"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { searchProducts } from "@/lib/api";

interface ProductImage {
  public_url: string;
}

interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  sale_price: number | null;
  categories?: { slug: string };
  product_images: ProductImage[];
}

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.trim() ?? "";
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadResults() {
      setIsLoading(true);
      setErrorMessage("");
      try {
        const results = query ? await searchProducts(query) : [];
        if (!cancelled) setProducts(results);
      } catch {
        if (!cancelled) setErrorMessage("Unable to search products right now.");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    loadResults();
    return () => { cancelled = true; };
  }, [query]);

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold text-slate-900">
        {query ? `Search results for “${query}”` : "Search products"}
      </h1>

      {isLoading && <p className="mt-8 text-slate-500">Searching...</p>}
      {!isLoading && errorMessage && <p className="mt-8 text-red-600">{errorMessage}</p>}
      {!isLoading && !errorMessage && query && products.length === 0 && (
        <p className="mt-8 text-slate-500">No products matched your search.</p>
      )}
      {!isLoading && !errorMessage && products.length > 0 && (
        <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <article key={product.id} className="rounded-xl border border-slate-200 p-4">
              <img
                src={product.product_images[0]?.public_url || "/placeholder.png"}
                alt={product.name}
                className="aspect-[3/4] w-full rounded-lg object-cover"
              />
              <h2 className="mt-4 font-semibold text-slate-900">{product.name}</h2>
              <p className="mt-1 text-slate-600">₹{product.sale_price ?? product.price}</p>
              <Link
                href={`/collections/${product.categories?.slug ?? "all"}/products/${product.slug}`}
                className="mt-4 inline-block text-sm font-medium text-pink-600"
              >
                View Details
              </Link>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<main className="container mx-auto px-4 py-12">Searching...</main>}>
      <SearchResults />
    </Suspense>
  );
}
