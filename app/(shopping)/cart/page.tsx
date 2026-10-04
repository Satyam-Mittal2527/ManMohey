"use client"

import React, { useState } from "react";
import { useEffect } from "react";
import Link from "next/link";
import { Plus as PlusIcon, Minus as DashIcon, Trash2 } from "lucide-react";
import { getCart, updateCartItem, removeCartItem } from "@/lib/checkout";
interface CartItem {
    id: number;
    productId: number;
    name: string;
    variant: string | null;
    price: number;
    qty: number;
    img: string;
}

export default function CartPage() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [actionError, setActionError] = useState<string | null>(null);
    const [pendingItemId, setPendingItemId] = useState<number | null>(null);

    const increment = async (itemId: number) => {
        const item = cartItems.find(i => i.id === itemId);
        if (!item) return;
        
        try {
            setActionError(null);
            setPendingItemId(itemId);
            await updateCartItem(itemId, item.qty + 1);
            setCartItems(cartItems.map(item =>
                item.id === itemId ? { ...item, qty: item.qty + 1 } : item
            ));
        } catch (error) {
            console.error("Failed to increment:", error);
            setActionError("Unable to update the item quantity. Please try again.");
        } finally {
            setPendingItemId(null);
        }
    };

    const decrement = async (itemId: number) => {
        const item = cartItems.find(i => i.id === itemId);
        if (!item || item.qty <= 1) return;
        
        try {
            setActionError(null);
            setPendingItemId(itemId);
            await updateCartItem(itemId, item.qty - 1);
            setCartItems(cartItems.map(item =>
                item.id === itemId && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item
            ));
        } catch (error) {
            console.error("Failed to decrement:", error);
            setActionError("Unable to update the item quantity. Please try again.");
        } finally {
            setPendingItemId(null);
        }
    };

    const setQty = async (itemId: number, newQty: number) => {
        if (newQty < 1) return;
        
        try {
            setActionError(null);
            setPendingItemId(itemId);
            await updateCartItem(itemId, newQty);
            setCartItems(cartItems.map(item =>
                item.id === itemId ? { ...item, qty: newQty } : item
            ));
        } catch (error) {
            console.error("Failed to update quantity:", error);
            setActionError("Unable to update the item quantity. Please try again.");
        } finally {
            setPendingItemId(null);
        }
    };

    const removeItem = async (itemId: number) => {
        try {
            setActionError(null);
            setPendingItemId(itemId);
            await removeCartItem(itemId);
            setCartItems(cartItems.filter(item => item.id !== itemId));
        } catch (error) {
            console.error("Failed to remove item:", error);
            setActionError("Unable to remove this item. Please try again.");
        } finally {
            setPendingItemId(null);
        }
    };

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0)
    const tax = +(subtotal * 0.08).toFixed(2);
    const total = +(subtotal + tax ).toFixed(2);
    const loadCart = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getCart();
            setCartItems(
                (data?.items ?? []).map((item: any) => ({
                    id: item.id,
                    productId: item.product_id,
                    name: item.name,
                    variant: item.size,
                    price: Number(item.price),
                    qty: item.quantity,
                    img: item.image,
                }))
            );
        } catch (err) {
            console.error(err);
            setError("We couldn't load your cart. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        loadCart();
    }, []);

    if (loading) {
        return (
            <main id="main" className="min-h-screen bg-gray-50 px-4 py-16" aria-busy="true" aria-live="polite">
                <div className="mx-auto max-w-7xl animate-pulse space-y-6">
                    <div className="h-8 w-40 rounded bg-gray-200" />
                    <div className="h-40 rounded-lg bg-white" />
                    <div className="h-12 rounded bg-gray-200" />
                </div>
                <span className="sr-only">Loading your cart...</span>
            </main>
        );
    }

    if (error) {
        return (
            <main id="main" className="min-h-[50vh] bg-gray-50 px-4 py-20">
                <div className="mx-auto max-w-xl rounded-xl border border-red-200 bg-white p-8 text-center" role="alert">
                    <h1 className="text-2xl font-semibold text-gray-900">Your cart couldn&apos;t be loaded</h1>
                    <p className="mt-3 text-sm text-red-700">{error}</p>
                    <button type="button" onClick={loadCart} className="mt-6 rounded bg-gray-900 px-5 py-3 text-white hover:bg-gray-700">Try again</button>
                </div>
            </main>
        );
    }

    if (cartItems.length === 0) {
        return (
            <main id="main" className="flex min-h-[50vh] items-center justify-center bg-gray-50 px-4 py-16">
                <div className="max-w-lg rounded-xl border border-gray-200 bg-white p-10 text-center">
                    <h1 className="text-2xl font-semibold text-gray-900">Your cart is empty</h1>
                    <p className="mt-3 text-gray-600">Find something you love and it will be waiting here.</p>
                    <Link href="/collections" className="mt-6 inline-flex rounded bg-indigo-600 px-5 py-3 font-medium text-white hover:bg-indigo-700">Continue shopping</Link>
                </div>
            </main>
        );
    }

    return (
        <main id="main" className="bg-gray-50 min-h-screen">

            <section className="bg-white py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <h1 className="text-2xl font-semibold text-gray-900">Your cart</h1>
                    <p className="text-sm text-gray-600 mt-1">{cartItems.reduce((s, it) => s + it.qty, 0)} items · ready to ship. Free delivery on this order. Estimated arrival 21 – 23 May.</p>
                </div>
            </section>

            <section className="py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            {actionError && <p className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700" role="alert">{actionError}</p>}
                            <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-200">
                                {cartItems.map((item) => (
                                    <article key={item.id} className="flex items-center gap-4 p-4">
                                        <div className="w-24 h-24 flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
                                            <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-medium text-gray-900">{item.name}</div>
                                            <div className="text-sm text-gray-500">{item.variant}</div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button disabled={pendingItemId === item.id} onClick={() => decrement(item.id)} aria-label="Decrease" className="h-8 w-8 flex items-center justify-center border rounded hover:bg-gray-100 disabled:opacity-50">
                                                <DashIcon size={18} />
                                            </button>
                                            <input type="number" value={item.qty} disabled={pendingItemId === item.id} onChange={(e) => setQty(item.id, Number(e.target.value))} aria-label="Quantity" className="w-16 text-center border rounded h-8 disabled:opacity-50" min={1} />
                                            <button disabled={pendingItemId === item.id} onClick={() => increment(item.id)} aria-label="Increase" className="h-8 w-8 flex items-center justify-center border rounded hover:bg-gray-100 disabled:opacity-50">
                                                <PlusIcon size={18} />
                                            </button>
                                        </div>
                                        <div className="w-28 text-right font-medium text-gray-900">₹{(item.price * item.qty).toFixed(2)}</div>
                                        <button disabled={pendingItemId === item.id} onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700 ml-4 transition-colors disabled:opacity-50" aria-label="Remove">
                                            <Trash2 size={20} />
                                        </button>
                                    </article>
                                ))}
                            </div>

                            <div className="mt-6 flex gap-3 flex-wrap">
                                <Link href="/collections" className="px-4 py-2 border rounded text-gray-700">← Continue shopping</Link>

                            </div>
                        </div>

                        <aside className="bg-white rounded-lg shadow-sm p-6">
                            <h3 className="text-lg font-semibold mb-4">Order summary</h3>

                            <div className="flex gap-2 mb-4">
                                <input type="text" placeholder="Promo code" className="flex-1 border rounded px-3 py-2" />
                                <button className="px-4 py-2 bg-indigo-600 text-white rounded">Apply</button>
                            </div>

                            <div className="flex justify-between py-2 text-sm text-gray-600"><span>Subtotal · {cartItems.reduce((s, it) => s + it.qty, 0)} items</span><span className="font-semibold text-gray-900">₹{subtotal.toFixed(2)}</span></div>
                            <div className="flex justify-between py-2 text-sm text-gray-600"><span>Shipping</span><span className="font-semibold text-emerald-600">Free</span></div>
                            <div className="flex justify-between py-2 text-sm text-gray-600"><span>Estimated tax</span><span className="font-semibold text-gray-900">₹{tax.toFixed(2)}</span></div>
                           

                            <div className="flex justify-between items-center mt-4 border-t pt-4 text-lg font-semibold"><span>Total</span><span>₹{total.toFixed(2)}</span></div>

                            <Link href="/checkout" className="block text-center mt-6 w-full bg-indigo-600 text-white px-4 py-3 rounded">Proceed to checkout →</Link>

                            <div className="flex justify-center gap-3 mt-6 flex-wrap">
                                <span className="text-xs text-gray-500 px-3 py-1 bg-gray-50 rounded">VISA</span>
                                <span className="text-xs text-gray-500 px-3 py-1 bg-gray-50 rounded">MASTERCARD</span>
                                <span className="text-xs text-gray-500 px-3 py-1 bg-gray-50 rounded">AMEX</span>
                                <span className="text-xs text-gray-500 px-3 py-1 bg-gray-50 rounded">PAYPAL</span>
                                <span className="text-xs text-gray-500 px-3 py-1 bg-gray-50 rounded">APPLE PAY</span>
                            </div>

                            <p className="mt-6 text-xs text-gray-500 text-center leading-6">Encrypted checkout · SSL secured. Your payment information is never stored on our servers.</p>
                        </aside>

                    </div>
                </div>
            </section>

        </main>
    )
}