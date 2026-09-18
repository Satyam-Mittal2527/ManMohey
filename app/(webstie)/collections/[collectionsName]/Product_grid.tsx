"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { addToWishlist, getWishlist, removeFromWishlist } from "@/lib/wishlist";

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
    active: boolean;

    category_id: number;

    categories: Category;

    product_images: ProductImage[];
}

interface CollectionProductsProps {
    ProductsList: Product[];
    CollectionName: string;
}

export default function CollectionProducts({
    ProductsList,
    CollectionName,
}: CollectionProductsProps) {
    const [wishlistedIds, setWishlistedIds] = useState<Set<number>>(new Set());

    useEffect(() => {
        const loadWishlist = async () => {
            const result = await getWishlist();
            if (result.success) {
                const ids = new Set<number>(
                    (result.items || [])
                        .map((item: any) => Number(item.id ?? item.product_id ?? item?.products?.id ?? 0))
                        .filter((id: number) => id > 0)
                );
                setWishlistedIds(ids);
            }
        };

        loadWishlist();
    }, []);

    const handleWishlistToggle = async (productId: number) => {
        const isWishlisted = wishlistedIds.has(productId);

        if (isWishlisted) {
            const result = await removeFromWishlist(productId);
            if (result.success) {
                setWishlistedIds((previous) => {
                    const next = new Set(previous);
                    next.delete(productId);
                    return next;
                });
                return;
            }

            if (result.status === 401) {
                window.dispatchEvent(new CustomEvent("open-auth-modal"));
                return;
            }

            alert(result.message || "Unable to update wishlist.");
            return;
        }

        const result = await addToWishlist(productId);
        if (result.success) {
            setWishlistedIds((previous) => new Set(previous).add(productId));
            return;
        }

        if (result.status === 401) {
            window.dispatchEvent(new CustomEvent("open-auth-modal"));
            return;
        }

        alert(result.message || "Unable to add item to wishlist.");
    };

    return (
        <>
            <div className="mb-6">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-slate-900">
                    {CollectionName.toUpperCase()}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    Explore curated items from the {CollectionName} collection.
                </p>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                {ProductsList.map((product) => {

                    const coverImage =
                        product.product_images.find(
                            (img) => img.display_order === 1
                        ) || product.product_images[0];

                    return (
                        <div
                            key={product.id}
                            className="flex flex-col rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-lg"
                        >
                            <div className="relative">
                                <img
                                    src={coverImage?.public_url || "/placeholder.png"}
                                    alt={product.name}
                                    className="aspect-[3/4] w-full rounded-lg object-cover"
                                />
                                <button
                                    type="button"
                                    aria-label={wishlistedIds.has(product.id) ? "Remove from wishlist" : "Add to wishlist"}
                                    onClick={() => handleWishlistToggle(product.id)}
                                    className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/80 bg-white/90 text-slate-700 shadow-sm transition hover:scale-105 hover:text-pink-600"
                                >
                                    <Heart
                                        className="h-4 w-4"
                                        fill={wishlistedIds.has(product.id) ? "currentColor" : "none"}
                                        strokeWidth={2}
                                    />
                                </button>
                            </div>

                            <h3 className="mt-4 text-lg font-semibold">
                                {product.name}
                            </h3>

                            <div className="mt-2">

                                {product.sale_price ? (

                                    <div className="flex items-center gap-2">

                                        <span className="text-lg font-bold text-pink-600">
                                            ₹{product.sale_price}
                                        </span>

                                        <span className="text-sm text-gray-400 line-through">
                                            ₹{product.price}
                                        </span>

                                    </div>

                                ) : (

                                    <span className="text-lg font-semibold">
                                        ₹{product.price}
                                    </span>

                                )}

                            </div>

                            <Link
                                href={`/collections/${product.categories.slug}/products/${product.slug}`}
                                className="mt-4 text-sm font-medium text-pink-600 hover:underline"
                            >
                                View Details
                            </Link>

                        </div>
                    );
                })}
            </div>
        </>
    );
}