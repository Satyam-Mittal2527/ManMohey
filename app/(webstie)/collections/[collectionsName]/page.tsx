"use client";

import CollectionProducts from "./Product_grid";
import Filter_bar from "./FilterBar";
import MobileFilterDrawer from "./MobileFilterDrawer";

import { fetchCollectionPage } from "@/lib/api";
import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";

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
    count?: number;
}

interface Product {
    id: number;
    name: string;
    slug: string;
    price: number;
    sale_price: number | null;
    featured: boolean;
    active: boolean;
    category_id: number;
    categories: Category;
    product_images: ProductImage[];
}

interface FilterOption {
    id: number;
    name: string;
    slug: string;
    count: number;
    hex_code?: string;
    value?: number;
}

interface FilterGroup {
    displayName: string;
    type: "checkbox" | "color" | "range";
    options: FilterOption[];
    min?: number;
    max?: number;
}

interface CollectionResponse {
    category: Category;
    childCategories: Category[];
    products: Product[];
    filterGroups?: Record<string, FilterGroup>;
    pagination?: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNextPage: boolean;
    };
}

const PAGE_SIZE = 20;

export default function Collection() {
    const params = useParams();
    const collectionSlug = params.collectionsName as string;

    return <CollectionListing key={collectionSlug} collectionSlug={collectionSlug} />;
}

function CollectionListing({ collectionSlug }: { collectionSlug: string }) {

    const [category, setCategory] = useState<Category | null>(null);
    const [childCategories, setChildCategories] = useState<Category[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [filterGroups, setFilterGroups] = useState<Record<string, FilterGroup>>({});
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
    const [selectedFilterValues, setSelectedFilterValues] = useState<Record<string, number[]>>({});
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [availability, setAvailability] = useState<"in_stock" | "out_of_stock" | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [loadMoreError, setLoadMoreError] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const sentinelRef = useRef<HTMLDivElement | null>(null);
    const nextPageRef = useRef(2);
    const hasNextPageRef = useRef(false);
    const isLoadingMoreRef = useRef(false);
    const requestIdRef = useRef(0);
    const firstPageRequestKeyRef = useRef<string | null>(null);
    const activeCollectionRef = useRef(collectionSlug);
    const activeQueryRef = useRef<Record<string, string | number | string[] | undefined>>({});
    const inFlightPagesRef = useRef(new Set<string>());

    const buildQuery = () => {
        const query: Record<string, string | number | string[] | undefined> = {};

        if (selectedCategories.length > 0) {
            query.category = selectedCategories.join(",");
        }

        Object.entries(selectedFilterValues).forEach(([key, values]) => {
            if (values.length > 0) {
                query[key] = values.join(",");
            }
        });

        if (minPrice) {
            query.min_price = minPrice;
        }

        if (maxPrice) {
            query.max_price = maxPrice;
        }

        if (availability) {
            query.availability = availability;
        }

        return query;
    };

    const loadCollection = useCallback(async (query: Record<string, string | number | string[] | undefined> = {}) => {
        const requestKey = `${collectionSlug}:${JSON.stringify(query)}`;
        if (firstPageRequestKeyRef.current === requestKey) return;

        firstPageRequestKeyRef.current = requestKey;
        const requestId = ++requestIdRef.current;
        activeCollectionRef.current = collectionSlug;
        activeQueryRef.current = query;
        nextPageRef.current = 2;
        hasNextPageRef.current = false;
        isLoadingMoreRef.current = false;
        inFlightPagesRef.current.clear();

        setProducts([]);
        setHasNextPage(false);
        setIsLoadingMore(false);
        setLoadMoreError(false);
        setIsLoading(true);
        setErrorMessage(null);

        try {
            const response = await fetchCollectionPage(collectionSlug, {
                ...query,
                page: 1,
                limit: PAGE_SIZE,
            });
            if (!response) throw new Error("Failed to fetch collection");

            const data: CollectionResponse = response?.products ?? {};
            if (requestId !== requestIdRef.current) return;

            setCategory(data.category ?? null);
            setChildCategories(data.childCategories ?? []);
            setProducts(data.products ?? []);
            setFilterGroups(data.filterGroups ?? {});
            const moreAvailable = data.pagination?.hasNextPage ?? (data.products?.length === PAGE_SIZE);
            hasNextPageRef.current = moreAvailable;
            setHasNextPage(moreAvailable);
            nextPageRef.current = (data.pagination?.page ?? 1) + 1;
        } catch (err) {
            console.error(err);
            if (requestId === requestIdRef.current) {
                setErrorMessage("Unable to load collection.");
            }
        } finally {
            if (requestId === requestIdRef.current) {
                setIsLoading(false);
                firstPageRequestKeyRef.current = null;
            }
        }
    }, [collectionSlug]);

    const loadMore = useCallback(async () => {
        if (isLoadingMoreRef.current || !hasNextPageRef.current) return;

        const collection = activeCollectionRef.current;
        const page = nextPageRef.current;
        const query = activeQueryRef.current;
        const requestId = requestIdRef.current;
        const requestKey = `${collection}:${page}:${JSON.stringify(query)}`;
        if (inFlightPagesRef.current.has(requestKey)) return;

        inFlightPagesRef.current.add(requestKey);
        isLoadingMoreRef.current = true;
        setIsLoadingMore(true);
        setLoadMoreError(false);

        try {
            const response = await fetchCollectionPage(collection, {
                ...query,
                page,
                limit: PAGE_SIZE,
            });
            if (!response) throw new Error("Failed to fetch more products");

            const data: CollectionResponse = response?.products ?? {};
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
        } catch (err) {
            console.error(err);
            if (requestId === requestIdRef.current) setLoadMoreError(true);
        } finally {
            inFlightPagesRef.current.delete(requestKey);
            if (requestId === requestIdRef.current) {
                isLoadingMoreRef.current = false;
                setIsLoadingMore(false);
            }
        }
    }, []);

    useEffect(() => {
        async function loadInitialCollection() {
            await loadCollection({});
        }

        void loadInitialCollection();
    }, [loadCollection]);

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

    const toggleCategory = (categoryId: number) => {
        setSelectedCategories((current) => {
            if (current.includes(categoryId)) {
                return current.filter((item) => item !== categoryId);
            }
            return [...current, categoryId];
        });
    };

    const toggleFilterOption = (groupKey: string, optionId: number) => {
        setSelectedFilterValues((current) => {
            const nextValues = current[groupKey] ? [...current[groupKey]] : [];
            const index = nextValues.indexOf(optionId);

            if (index >= 0) {
                nextValues.splice(index, 1);
            } else {
                nextValues.push(optionId);
            }

            return {
                ...current,
                [groupKey]: nextValues,
            };
        });
    };

    const clearFilters = () => {
        setSelectedCategories([]);
        setSelectedFilterValues({});
        setMinPrice("");
        setMaxPrice("");
        setAvailability(null);
        void loadCollection({});
    };

    return (
        <div className="container mx-auto px-4">
            <div className="flex flex-col gap-8 md:flex-row md:items-start">
                <MobileFilterDrawer
                    childCategories={childCategories}
                    filterGroups={filterGroups}
                    selectedFilterValues={selectedFilterValues}
                    selectedCategories={selectedCategories}
                    minPrice={minPrice}
                    maxPrice={maxPrice}
                    availability={availability}
                    onToggleCategory={toggleCategory}
                    onToggleFilterOption={toggleFilterOption}
                    onApplyFilters={() => void loadCollection(buildQuery())}
                    onClearFilters={clearFilters}
                    onPriceChange={(field, value) => {
                        if (field === "min") setMinPrice(value);
                        else setMaxPrice(value);
                    }}
                    onAvailabilityChange={setAvailability}
                />

                <Filter_bar
                    childCategories={childCategories}
                    filterGroups={filterGroups}
                    selectedFilterValues={selectedFilterValues}
                    selectedCategories={selectedCategories}
                    minPrice={minPrice}
                    maxPrice={maxPrice}
                    availability={availability}
                    onToggleCategory={toggleCategory}
                    onToggleFilterOption={toggleFilterOption}
                    onApplyFilters={() => void loadCollection(buildQuery())}
                    onClearFilters={clearFilters}
                    onPriceChange={(field, value) => {
                        if (field === "min") setMinPrice(value);
                        else setMaxPrice(value);
                    }}
                    onAvailabilityChange={setAvailability}
                />

                <main className="flex-1">
                    <div className="flex flex-col gap-4">
                        {isLoading ? (
                            <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-8">
                                {Array.from({ length: 8 }).map((_, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col gap-4 rounded-lg border border-gray-200 p-4 animate-pulse"
                                    >
                                        <div className="h-[360px] rounded bg-slate-200" />
                                        <div className="h-4 w-3/4 rounded bg-slate-200" />
                                        <div className="h-4 w-1/2 rounded bg-slate-200" />
                                        <div className="h-10 w-24 rounded bg-slate-200" />
                                    </div>
                                ))}
                            </div>
                        ) : errorMessage ? (
                            <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center text-red-700">
                                {errorMessage}
                            </div>
                        ) : (
                            <CollectionProducts
                                ProductsList={products}
                                CollectionName={category?.name ?? ""}
                            />
                        )}
                        {!isLoading && !errorMessage && (
                            <div ref={sentinelRef} className="py-6 text-center" aria-live="polite">
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
                                ) : products.length > 0 && !hasNextPage ? (
                                    <span className="text-sm text-slate-500">You&apos;ve reached the end.</span>
                                ) : null}
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}