"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Heart, ShoppingBag } from "lucide-react";
import { getWishlist, removeFromWishlist } from "@/lib/wishlist";

export default function WishlistPage() {
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    const loadWishlist = async () => {
      setIsLoading(true);
      const result = await getWishlist();

      if (result.success) {
        setItems(result.items || []);
        setIsAuthenticated(true);
      } else if (result.error === "unauthorized") {
        setIsAuthenticated(false);
        setItems([]);
      } else {
        setItems([]);
        setIsAuthenticated(true);
      }

      setIsLoading(false);
    };

    loadWishlist();
  }, []);

  const handleRemove = async (productId: number) => {
    const result = await removeFromWishlist(productId);
    if (result.success) {
      setItems((current) => current.filter((product) => Number(product.id ?? product.product_id ?? product?.products?.id) !== Number(productId)));
      return;
    }

    if (result.status === 401) {
      window.dispatchEvent(new CustomEvent("open-auth-modal"));
      return;
    }

    alert(result.message || "Unable to remove item from wishlist.");
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-44 rounded bg-slate-200" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="h-72 rounded-xl bg-slate-200" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto max-w-xl px-4 py-20 text-center">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <Heart className="mx-auto h-12 w-12 text-pink-500" />
          <h1 className="mt-5 text-3xl font-semibold text-slate-900">Sign in to view your wishlist</h1>
          <p className="mt-3 text-slate-600">Save your favorite pieces and revisit them anytime.</p>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent("open-auth-modal"))}
            className="mt-6 inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white hover:bg-slate-700"
          >
            Login to continue
          </button>
        </div>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="container mx-auto max-w-xl px-4 py-20 text-center">
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10">
          <ShoppingBag className="mx-auto h-12 w-12 text-slate-400" />
          <h1 className="mt-6 text-3xl font-semibold text-slate-900">Your wishlist is empty</h1>
          <p className="mt-3 text-slate-600">Start saving pieces you love and they’ll appear here.</p>
          <Link
            href="/collections"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-pink-600 px-6 py-3 text-sm font-medium text-white hover:bg-pink-500"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Saved items</p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">Wishlist</h1>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">{items.length} item{items.length > 1 ? "s" : ""}</span>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {items.map((product: any) => {
          const item = product?.products ?? product;
          const coverImage = item?.product_images?.find((img: any) => img.display_order === 1) || item?.product_images?.[0];
          const productId = Number(item?.id ?? product?.product_id ?? product?.id ?? 0);

          return (
            <div key={productId} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="relative">
                <img
                  src={coverImage?.public_url || coverImage?.image_url || "/placeholder.png"}
                  alt={item?.name || "Wishlist product"}
                  className="h-72 w-full object-cover"
                />
                <button
                  type="button"
                  aria-label="Remove from wishlist"
                  onClick={() => handleRemove(productId)}
                  className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm text-pink-600 hover:bg-slate-100"
                >
                  <Heart className="h-4 w-4 fill-current" />
                </button>
              </div>

              <div className="space-y-3 p-5">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">{item?.name}</h2>
                  <p className="mt-1 text-sm text-slate-500">{item?.categories?.name || "Collection item"}</p>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <div>
                    {item?.sale_price ? (
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-pink-600">₹{item.sale_price}</span>
                        <span className="text-sm text-slate-400 line-through">₹{item.price}</span>
                      </div>
                    ) : (
                      <span className="text-xl font-bold text-slate-900">₹{item?.price}</span>
                    )}
                  </div>
                  <Link
                    href={item?.slug ? `/collections/${item?.categories?.slug || "shop"}/products/${item.slug}` : "/collections"}
                    className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:border-slate-400"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
