"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
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

interface SearchResponse {
  products: Product[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
  };
}

const PAGE_SIZE = 20;

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.trim() ?? "";
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [loadMoreError, setLoadMoreError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const requestIdRef = useRef(0);
  const initialRequestKeyRef = useRef<string | null>(null);
  const requestBusyRef = useRef(false);
  const hasNextPageRef = useRef(false);
  const nextPageRef = useRef(2);
  const inFlightPagesRef = useRef(new Set<string>());

  const loadMore = useCallback(async () => {
    if (requestBusyRef.current || !hasNextPageRef.current || !query) return;

    const page = nextPageRef.current;
    const requestId = requestIdRef.current;
    const requestKey = `${query}:${page}`;
    if (inFlightPagesRef.current.has(requestKey)) return;

    inFlightPagesRef.current.add(requestKey);
    requestBusyRef.current = true;
    setIsLoadingMore(true);
    setLoadMoreError(false);

    try {
      const result: SearchResponse = await searchProducts(query, page, PAGE_SIZE);
      if (requestId !== requestIdRef.current) return;

      const newProducts = result.products ?? [];
      setProducts((current) => {
        const existingIds = new Set(current.map((product) => product.id));
        const uniqueNewProducts = newProducts.filter((product) => {
          if (existingIds.has(product.id)) return false;
          existingIds.add(product.id);
          return true;
        });
        return [...current, ...uniqueNewProducts];
      });
      const moreAvailable = result.pagination?.hasNextPage ?? (newProducts.length === PAGE_SIZE);
      hasNextPageRef.current = moreAvailable;
      setHasNextPage(moreAvailable);
      nextPageRef.current = page + 1;
    } catch {
      if (requestId === requestIdRef.current) setLoadMoreError(true);
    } finally {
      inFlightPagesRef.current.delete(requestKey);
      if (requestId === requestIdRef.current) {
        requestBusyRef.current = false;
        setIsLoadingMore(false);
      }
    }
  }, [query]);

  useEffect(() => {
    if (initialRequestKeyRef.current === query) return;
    initialRequestKeyRef.current = query;
    const requestId = ++requestIdRef.current;
    requestBusyRef.current = true;
    hasNextPageRef.current = false;
    nextPageRef.current = 2;
    inFlightPagesRef.current.clear();
    setProducts([]);
    setHasNextPage(false);
    setIsLoadingMore(false);
    setLoadMoreError(false);

    async function loadResults() {
      setIsLoading(true);
      setErrorMessage("");
      try {
        const result: SearchResponse = query ? await searchProducts(query, 1, PAGE_SIZE) : { products: [] };
        if (requestId !== requestIdRef.current) return;
        setProducts(result.products ?? []);
        const moreAvailable = result.pagination?.hasNextPage ?? ((result.products ?? []).length === PAGE_SIZE);
        hasNextPageRef.current = moreAvailable;
        setHasNextPage(moreAvailable);
        nextPageRef.current = (result.pagination?.page ?? 1) + 1;
      } catch {
        if (requestId === requestIdRef.current) setErrorMessage("Unable to search products right now.");
      } finally {
        if (requestId === requestIdRef.current) {
          requestBusyRef.current = false;
          setIsLoading(false);
        }
      }
    }

    void loadResults();
  }, [query]);

  useEffect(() => {
    if (!hasNextPage || isLoading || isLoadingMore || loadMoreError || !sentinelRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) void loadMore();
      },
      { rootMargin: "600px 0px" }
    );
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, isLoading, isLoadingMore, loadMoreError, loadMore]);

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold text-slate-900">
        {query ? `Search results for “${query}”` : "Search products"}
      </h1>

      {isLoading && <p className="mt-8 text-slate-500">Searching...</p>}
      {!isLoading && errorMessage && <p className="mt-8 text-red-600">{errorMessage}</p>}
      {!isLoading && !errorMessage && !query && (
        <p className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-6 text-slate-600" role="status">Enter a search term to find products.</p>
      )}
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
      {!isLoading && !errorMessage && products.length > 0 && (
        <div ref={sentinelRef} className="py-8 text-center" aria-live="polite">
          {isLoadingMore ? (
            <span className="text-sm text-slate-500">Loading more products...</span>
          ) : loadMoreError ? (
            <button
              type="button"
              onClick={() => {
                setLoadMoreError(false);
                void loadMore();
              }}
              className="text-sm text-pink-600 hover:underline"
            >
              Unable to load more products. Try again.
            </button>
          ) : !hasNextPage ? (
            <span className="text-sm text-slate-500">You&apos;ve reached the end.</span>
          ) : null}
        </div>
      )}
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<main className="container mx-auto animate-pulse space-y-6 px-4 py-12" aria-busy="true"><div className="h-9 w-72 rounded bg-slate-200" /><div className="grid grid-cols-2 gap-6 md:grid-cols-3 xl:grid-cols-4">{Array.from({ length: 4 }).map((_, index) => <div key={index} className="space-y-4 rounded-xl border p-4"><div className="aspect-[3/4] rounded bg-slate-200" /><div className="h-4 rounded bg-slate-200" /></div>)}</div><span className="sr-only">Preparing search...</span></main>}>
      <SearchResults />
    </Suspense>
  );
}
