"use client";

import CollectionProducts from "./Product_grid";
import Filter_bar from "./FilterBar";
import MobileFilterDrawer from "./MobileFilterDrawer";

import { fetchCollectionPage } from "@/lib/api";
import { useState, useEffect } from "react";
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
    count: number;
}

interface FilterGroup {
    name: string;
    options: FilterOption[];
}

interface CollectionResponse {
    category: Category;
    childCategories: Category[];
    filterGroups?: FilterGroup[];
    products: Product[];
}

export default function Collection() {

    const params = useParams();
    const collectionSlug = params.collectionsName as string;

    const [category, setCategory] = useState<Category | null>(null);
    const [childCategories, setChildCategories] = useState<Category[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [filterGroups, setFilterGroups] = useState<FilterGroup[]>([]);

    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {

        const loadCollection = async () => {

            setIsLoading(true);
            setErrorMessage(null);

            try {

                const response = await fetchCollectionPage(collectionSlug);

                console.log(response);

                // If your backend wraps the response inside "products"
                const data: CollectionResponse = response.products;

                setCategory(data.category);
                setChildCategories(data.childCategories);
                setProducts(data.products);

                if (data.filterGroups) {
                    setFilterGroups(data.filterGroups);
                }

            } catch (err) {

                console.error(err);
                setErrorMessage("Unable to load collection.");

            } finally {

                setIsLoading(false);

            }

        };

        loadCollection();

    }, [collectionSlug]);

    return (

        <div className="container mx-auto px-4">

            <div className="flex flex-col gap-8 md:flex-row md:items-start">

                <MobileFilterDrawer
                    childCategories={childCategories}
                    filterGroups={filterGroups}
                />

                <Filter_bar
                    childCategories={childCategories}
                    filterGroups={filterGroups}
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