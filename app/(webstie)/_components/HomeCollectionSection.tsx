"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
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

interface CollectionResponse {
    collection: {
        id: number;
        name: string;
        slug: string;
    };
    products: Product[];
}

interface HomeCollectionSectionProps {
    title: string;
    collectionSlug: string;
    limit?: number;
}

export default function HomeCollectionSection({
    title,
    collectionSlug,
    limit = 4,
}: HomeCollectionSectionProps) {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        async function loadProducts() {
            setIsLoading(true);
            setErrorMessage(null);

            try {
                const data: CollectionResponse =
                    await fetchShopCollection(collectionSlug);
          
                setProducts((data.products ?? []).slice(0, limit));
            } catch (error) {
                console.error(error);
                setErrorMessage(`Unable to load ${title}.`);
            } finally {
                setIsLoading(false);
            }
        }

        loadProducts();
    }, [collectionSlug, limit, title]);
       
    return (
        <section className="bg-white py-12 md:py-14">
            <div className="container mx-auto px-4">

                <div className="flex items-center justify-between gap-4 mb-4">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
                        {title}
                    </p>

                    <Link href={`/shop/${collectionSlug}`}>
                        <button className="rounded border border-black px-3 py-1 transition hover:bg-black hover:text-white">
                            View All
                        </button>
                    </Link>
                </div>

                <div className="grid gap-8 grid-cols-[repeat(auto-fit,minmax(240px,1fr))]">

                    {isLoading ? (
                        Array.from({ length: limit }).map((_, index) => (
                            <div
                                key={index}
                                className="flex flex-col gap-4 rounded-lg border border-gray-200 p-4 animate-pulse"
                            >
                                <div className="h-[360px] rounded-md bg-slate-200" />
                                <div className="h-4 w-3/4 rounded bg-slate-200" />
                                <div className="h-4 w-1/2 rounded bg-slate-200" />
                            </div>
                        ))
                    ) : errorMessage ? (
                        <div className="col-span-full rounded-lg border border-red-200 bg-red-50 p-6 text-center text-red-700">
                            {errorMessage}
                        </div>
                    ) : products.length > 0 ? (
                        products.map((product) => {
                            console.log(product.id, product.name, product.categories);
                            const image =
                                product.product_images
                                    ?.sort(
                                        (a, b) =>
                                            a.display_order - b.display_order
                                    )[0]?.public_url;

                            return (
                                <div
                                    key={product.id}
                                    className="flex flex-col gap-4 rounded-lg border border-gray-200 p-4 transition hover:shadow-lg"
                                >
                                    <div className="overflow-hidden rounded-md bg-white">
                                        {image ? (
                                            <img
                                                src={image}
                                                alt={product.name}
                                                className="aspect-[3/4] w-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex aspect-[3/4] w-full items-center justify-center bg-gray-100 text-sm text-gray-500">
                                                No Image
                                            </div>
                                        )}
                                    </div>

                                    <h3 className="font-medium text-gray-800">
                                        {product.name}
                                    </h3>

                                    <div className="flex items-center gap-2">
                                        {product.sale_price ? (
                                            <>
                                                <span className="font-semibold">
                                                    ₹{product.sale_price}
                                                </span>

                                                <span className="text-sm text-gray-400 line-through">
                                                    ₹{product.price}
                                                </span>
                                            </>
                                        ) : (
                                            <span className="font-semibold">
                                                ₹{product.price}
                                            </span>
                                        )}
                                    </div>

                                    <Link
                                        href={`/collections/${product.categories.slug}/products/${product.slug}`}
                                        className="mt-2 text-sm text-indigo-600 hover:underline"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            );
                        })
                    ) : (
                        <div className="col-span-full rounded-lg border border-slate-200 bg-slate-50 p-6 text-center text-slate-600">
                            No products found.
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}