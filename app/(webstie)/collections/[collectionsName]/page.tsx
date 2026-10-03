"use client";

import CollectionProducts from "./Product_grid";
import Filter_bar from "./FilterBar";
import MobileFilterDrawer from "./MobileFilterDrawer";

import { fetchCollectionPage } from "@/lib/api";
import { useEffect, useState } from "react";
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
}

export default function Collection() {
    const params = useParams();
    const collectionSlug = params.collectionsName as string;

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
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

    const loadCollection = async (queryOverrides: Record<string, string | number | string[] | undefined> = {}) => {
        setIsLoading(true);
        setErrorMessage(null);

        try {
            const query = { ...buildQuery(), ...queryOverrides };
            const response = await fetchCollectionPage(collectionSlug, query);
            const data: CollectionResponse = response?.products ?? {};

            setCategory(data.category ?? null);
            setChildCategories(data.childCategories ?? []);
            setProducts(data.products ?? []);
            setFilterGroups(data.filterGroups ?? {});
        } catch (err) {
            console.error(err);
            setErrorMessage("Unable to load collection.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadCollection();
    }, [collectionSlug]);

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
        loadCollection({});
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
                    onApplyFilters={() => loadCollection()}
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
                    onApplyFilters={() => loadCollection()}
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
                    </div>
                </main>
            </div>
        </div>
    );
}