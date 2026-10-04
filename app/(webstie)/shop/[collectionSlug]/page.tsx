"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { fetchShopCollection } from "@/lib/api";

interface ProductImage {
    id: number;
    image_url: string;
    public_url: string;
    display_order: number;
}

interface Category {
    id: number;
    name: string;
    slug: string;
}

interface Product {
    id: number;
    name: string;
    slug: string;
    price: number;
    sale_price: number | null;
    featured: boolean;
    stock: number;

    categories: Category;

    product_images: ProductImage[];
}

interface Collection {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    banner_image: string | null;
}

interface CollectionResponse {
    collection: Collection;
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

export default function ShopCollection() {

    const params = useParams();

    const collectionSlug = params.collectionSlug as string;

    const [collection, setCollection] = useState<Collection | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [loadMoreError, setLoadMoreError] = useState(false);
    const sentinelRef = useRef<HTMLDivElement | null>(null);
    const requestIdRef = useRef(0);
    const initialRequestKeyRef = useRef<string | null>(null);
    const requestBusyRef = useRef(false);
    const hasNextPageRef = useRef(false);
    const nextPageRef = useRef(2);
    const inFlightPagesRef = useRef(new Set<string>());

    const loadMore = useCallback(async () => {
        if (requestBusyRef.current || !hasNextPageRef.current) return;

        const page = nextPageRef.current;
        const requestId = requestIdRef.current;
        const requestKey = `${collectionSlug}:${page}`;
        if (inFlightPagesRef.current.has(requestKey)) return;

        inFlightPagesRef.current.add(requestKey);
        requestBusyRef.current = true;
        setLoadingMore(true);
        setLoadMoreError(false);

        try {
            const data: CollectionResponse = await fetchShopCollection(collectionSlug, page, PAGE_SIZE);
            if (requestId !== requestIdRef.current) return;

            const newProducts = data.products ?? [];
            setProducts((current) => {
                const existingIds = new Set(current.map((product) => product.id));
                const uniqueNewProducts = newProducts.filter((product) => {
                    if (existingIds.has(product.id)) return false;
                    existingIds.add(product.id);
                    return true;
                });
                return [...current, ...uniqueNewProducts];
            });

            const moreAvailable = data.pagination?.hasNextPage ?? (newProducts.length === PAGE_SIZE);
            hasNextPageRef.current = moreAvailable;
            setHasNextPage(moreAvailable);
            nextPageRef.current = page + 1;
        } catch (error) {
            console.error(error);
            if (requestId === requestIdRef.current) setLoadMoreError(true);
        } finally {
            inFlightPagesRef.current.delete(requestKey);
            if (requestId === requestIdRef.current) {
                requestBusyRef.current = false;
                setLoadingMore(false);
            }
        }
    }, [collectionSlug]);

    useEffect(() => {
        if (initialRequestKeyRef.current === collectionSlug) return;
        initialRequestKeyRef.current = collectionSlug;
        const requestId = ++requestIdRef.current;
        requestBusyRef.current = true;
        hasNextPageRef.current = false;
        nextPageRef.current = 2;
        inFlightPagesRef.current.clear();
        setProducts([]);
        setHasNextPage(false);
        setLoadingMore(false);
        setLoadMoreError(false);

        async function loadCollection() {

            setLoading(true);

            try {

                const data: CollectionResponse = await fetchShopCollection(collectionSlug, 1, PAGE_SIZE);
                if (requestId !== requestIdRef.current) return;

                setCollection(data.collection);

                setProducts(data.products ?? []);
                const moreAvailable = data.pagination?.hasNextPage ?? (data.products?.length === PAGE_SIZE);
                hasNextPageRef.current = moreAvailable;
                setHasNextPage(moreAvailable);
                nextPageRef.current = (data.pagination?.page ?? 1) + 1;

            } catch (err) {

                console.error(err);

            } finally {

                if (requestId === requestIdRef.current) {
                    requestBusyRef.current = false;
                    setLoading(false);
                }

            }

        }

        loadCollection();

    }, [collectionSlug]);

    useEffect(() => {
        if (!hasNextPage || loading || loadingMore || loadMoreError || !sentinelRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries.some((entry) => entry.isIntersecting)) void loadMore();
            },
            { rootMargin: "600px 0px" }
        );
        observer.observe(sentinelRef.current);
        return () => observer.disconnect();
    }, [hasNextPage, loading, loadingMore, loadMoreError, loadMore]);

    if (loading) {

        return (
            <div className="container mx-auto py-20 text-center">
                Loading...
            </div>
        );

    }

    return (
        <>
            <section id="hero" className="
    text-center
    px-8
    pt-[72px]
    pb-[56px]
    bg-[radial-gradient(circle_at_20%_10%,rgba(214,188,144,0.12),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(232,220,201,0.15),transparent_40%)]
bg-[#FCFAF7]
  ">
                <p className="text-[12.5px] font-semibold tracking-[0.22em] uppercase text-[var(--gold-deep)] mb-[18px]">Curated by our in-house stylists</p>
                <h1 className="font-[var(--font-display)] font-semibold text-[clamp(44px,7vw,78px)] text-[var(--wine-deep)] leading-[1.05]">{collection?.name}</h1>
                <p className="font-[var(--font-display)] italic text-[20px] text-[var(--wine-soft)] mt-4">हाथों से बुना, दिलों से चुना</p>
                <p className="max-w-[520px] mt-[18px] mx-auto text-[var(--ink-soft)] text-[15.5px] leading-[1.6]">Handwoven by artisans, chosen by women across India — the eight pieces our customers keep coming back for, ranked by what&apos;s flying off the shelf this month.</p>
                <div className="md:flex justify-center gap-[28px] mt-[30px] text-[13.5px] font-medium text-[var(--ink-soft)] hidden">
                    <span className="flex items-center gap-[6px]"><strong>4.8★</strong> average rating</span>
                    <span className="flex items-center gap-[6px]">•</span>
                    <span className="flex items-center gap-[6px]"><strong>50,000+</strong> happy customers</span>
                    <span className="flex items-center gap-[6px]">•</span>
                    <span className="flex items-center gap-[6px]">Restocked <strong>weekly</strong></span>
                </div>
            </section>

            <div className="container mx-auto py-10">

                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">

                    {products.map((product) => (

                        <div
                            key={product.id}
                            className="rounded-xl border p-4 hover:shadow-lg transition"
                        >

                            <img
                                src={
                                    product.product_images.length > 0
                                        ? product.product_images[0].public_url
                                        : "/placeholder.png"
                                }
                                alt={product.name}
                                className="rounded-lg w-full aspect-[3/4] object-cover"
                            />

                            <h3 className="mt-4 font-semibold">

                                {product.name}

                            </h3>

                            <p className="text-gray-500 mt-1">

                                ₹{product.price}

                            </p>

                            <Link
                                href={`/collections/${product.categories.slug}/products/${product.slug}`}
                                className="inline-block mt-4 text-sm font-medium text-pink-600"
                            >
                                View Details
                            </Link>

                        </div>

                    ))}

                </div>

                <div ref={sentinelRef} className="py-8 text-center" aria-live="polite">
                    {loadingMore ? (
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
                    ) : products.length > 0 && !hasNextPage ? (
                        <span className="text-sm text-slate-500">You&apos;ve reached the end.</span>
                    ) : null}
                </div>

            </div>
        </>
    );

}