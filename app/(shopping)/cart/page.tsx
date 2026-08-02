"use client"

import React, { useMemo, useState } from "react";
import { useEffect } from "react";
import { Heart, Plus as PlusIcon, Minus as DashIcon, Trash2 } from "lucide-react";
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
// const cart_items = [
//     {
//         product: "sarees",
//         name: "Saree",
//         image: "/Test_saree.png",
//         price: "₹999",
//     },
//     {
//         product: "kurtis",
//         name: "Kurti",
//         image: "/Test_saree.png",
//         price: "₹799",
//     },
//     {
//         product: "Lehenga",
//         name: "Lehenga",
//         image: "/Test_saree.png",
//         price: "₹1999",
//     },
//     {
//         product: "Unstitched",
//         name: "Unstitched",
//         image: "/Test_saree.png",
//         price: "₹499",
//     },


// ];
export default function cart() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);

    const increment = async (itemId: number) => {
        const item = cartItems.find(i => i.id === itemId);
        if (!item) return;
        
        try {
            await updateCartItem(itemId, item.qty + 1);
            setCartItems(cartItems.map(item =>
                item.id === itemId ? { ...item, qty: item.qty + 1 } : item
            ));
        } catch (error) {
            console.error("Failed to increment:", error);
        }
    };

    const decrement = async (itemId: number) => {
        const item = cartItems.find(i => i.id === itemId);
        if (!item || item.qty <= 1) return;
        
        try {
            await updateCartItem(itemId, item.qty - 1);
            setCartItems(cartItems.map(item =>
                item.id === itemId && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item
            ));
        } catch (error) {
            console.error("Failed to decrement:", error);
        }
    };

    const setQty = async (itemId: number, newQty: number) => {
        if (newQty < 1) return;
        
        try {
            await updateCartItem(itemId, newQty);
            setCartItems(cartItems.map(item =>
                item.id === itemId ? { ...item, qty: newQty } : item
            ));
        } catch (error) {
            console.error("Failed to update quantity:", error);
        }
    };

    const removeItem = async (itemId: number) => {
        try {
            await removeCartItem(itemId);
            setCartItems(cartItems.filter(item => item.id !== itemId));
        } catch (error) {
            console.error("Failed to remove item:", error);
        }
    };

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0)
    const tax = +(subtotal * 0.08).toFixed(2);
    const promo = 56; // fixed example promo
    const total = +(subtotal + tax - promo).toFixed(2);
    const loadCart = async () => {
        try {
            setLoading(true);

            const data = await getCart();
            console.log("Cart data:", data);
            setCartItems(
                data.items.map((item: any) => ({
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
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        loadCart();
    }, []);

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
                                            <button onClick={() => decrement(item.id)} aria-label="Decrease" className="h-8 w-8 flex items-center justify-center border rounded hover:bg-gray-100">
                                                <DashIcon size={18} />
                                            </button>
                                            <input type="number" value={item.qty} onChange={(e) => setQty(item.id, Number(e.target.value))} aria-label="Quantity" className="w-16 text-center border rounded h-8" min={1} />
                                            <button onClick={() => increment(item.id)} aria-label="Increase" className="h-8 w-8 flex items-center justify-center border rounded hover:bg-gray-100">
                                                <PlusIcon size={18} />
                                            </button>
                                        </div>
                                        <div className="w-28 text-right font-medium text-gray-900">₹{(item.price * item.qty).toFixed(2)}</div>
                                        <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700 ml-4 transition-colors" aria-label="Remove">
                                            <Trash2 size={20} />
                                        </button>
                                    </article>
                                ))}
                            </div>

                            <div className="mt-6 flex gap-3 flex-wrap">
                                <a href="/collections" className="px-4 py-2 border rounded text-gray-700">← Continue shopping</a>

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
                            <div className="flex justify-between py-2 text-sm text-gray-600"><span>Promo · WELCOME20</span><span className="font-semibold text-rose-600">−₹{promo.toFixed(2)}</span></div>

                            <div className="flex justify-between items-center mt-4 border-t pt-4 text-lg font-semibold"><span>Total</span><span>₹{total.toFixed(2)}</span></div>

                            <a href="/checkout" className="block text-center mt-6 w-full bg-indigo-600 text-white px-4 py-3 rounded">Proceed to checkout →</a>

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