"use client";

import CollectionProducts from "./[collectionsName]/Product_grid";
import Filter_bar from "./[collectionsName]/FilterBar";
import MobileFilterDrawer from "./[collectionsName]/MobileFilterDrawer";
import { fetchCollectionPage } from "@/lib/api";
import { useState, useEffect, useCallback } from "react";

interface ProductImage {
    id: number;
    image_url: string;
    public_url: string;
    display_order: number;
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
export default function Collection() {
    const collectionSlug = "regular";

    const [products, setProducts] = useState<Product[]>([]);
    const [category, setCategory] = useState<Category | null>(null);
    const [childCategories, setChildCategories] = useState<Category[]>([]);

    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [retryKey, setRetryKey] = useState(0);
    const [filterGroups, setFilterGroups] = useState<Record<string, FilterGroup>>({});
    const [selectedFilterValues, setSelectedFilterValues] = useState<Record<string, number[]>>({});
    const collectionName = category?.name ?? "";

    const loadProducts = useCallback(async (filters: Record<string, string> = {}) => {
        setIsLoading(true);
        setErrorMessage(null);
        try {
            const response = await fetchCollectionPage(collectionSlug, filters);
            const data = response?.products;
            if (!data) throw new Error("Collection response is missing products");

            setProducts(data.products ?? []);
            setCategory(data.category ?? null);
            setChildCategories(data.childCategories ?? []);
            setFilterGroups(data.filterGroups ?? data.filters ?? {});
        } catch (err) {
            console.error("Failed to load collection:", err);
            setErrorMessage("Unable to load this collection. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }, [collectionSlug]);

    useEffect(() => {
        void Promise.resolve().then(() => loadProducts());
    }, [loadProducts, retryKey]);

    const toggleFilterOption = (groupKey: string, optionId: number) => {
        setSelectedFilterValues((current) => {
            const values = current[groupKey] ?? [];
            const nextValues = values.includes(optionId)
                ? values.filter((value) => value !== optionId)
                : [...values, optionId];

            if (nextValues.length === 0) {
                const next = { ...current };
                delete next[groupKey];
                return next;
            }

            return { ...current, [groupKey]: nextValues };
        });
    };

    const applyFilters = () => {
        const query = Object.fromEntries(
            Object.entries(selectedFilterValues)
                .filter(([, values]) => values.length > 0)
                .map(([key, values]) => [key, values.join(",")])
        );
        void loadProducts(query);
    };

    const clearFilters = () => {
        setSelectedFilterValues({});
        void loadProducts();
    };

    return (

        <div className="container mx-auto px-4">
            <div className="flex gap-8 md:items-start flex-col md:flex-row">
                <MobileFilterDrawer
                    childCategories={childCategories}
                    filterGroups={filterGroups}
                    title="Filters for Regular Collection"
                    categoryTitle="Collections"
                    showPriceAvailability={false}
                    selectedFilterValues={selectedFilterValues}
                    onToggleFilterOption={toggleFilterOption}
                    onApplyFilters={applyFilters}
                    onClearFilters={clearFilters}
                />
                <Filter_bar
                    childCategories={childCategories}
                    filterGroups={filterGroups}
                    title="Filters for Regular Collection"
                    categoryTitle="Collections"
                    showPriceAvailability={false}
                    selectedFilterValues={selectedFilterValues}
                    onToggleFilterOption={toggleFilterOption}
                    onApplyFilters={applyFilters}
                    onClearFilters={clearFilters}
                />
                <main className="flex-1">
                    <div className="flex flex-col gap-4 w-full">
                        {isLoading ? (
                            <div className="grid gap-8 grid-cols-[repeat(auto-fit,minmax(240px,1fr))]">
                                {Array.from({ length: 8 }).map((_, index) => (
                                    <div key={index} className="flex flex-col gap-4 rounded-lg border border-gray-200 p-4 animate-pulse">
                                        <div className="h-[360px] rounded-md bg-slate-200" />
                                        <div className="h-4 w-3/4 rounded bg-slate-200" />
                                        <div className="h-4 w-1/2 rounded bg-slate-200" />
                                        <div className="h-10 w-24 rounded bg-slate-200" />
                                    </div>
                                ))}
                            </div>
                        ) : errorMessage ? (
                            <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center text-sm text-red-700" role="alert">
                                <p>{errorMessage}</p>
                                <button type="button" onClick={() => setRetryKey((value) => value + 1)} className="mt-4 rounded bg-red-700 px-4 py-2 font-medium text-white hover:bg-red-800">Try again</button>
                            </div>
                        ) : (
                            <CollectionProducts ProductsList={products} CollectionName={collectionName} />
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}
