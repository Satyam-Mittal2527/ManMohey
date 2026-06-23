"use client"

import React, { useMemo, useState } from "react";
const cart_items= [
    {
        product: "sarees",
        name: "Saree",
        image: "/Test_saree.png",
        price: "₹999",
    },
    {
        product: "kurtis",
        name: "Kurti",
        image: "/Test_saree.png",
        price: "₹799",
    },
    {
        product: "Lehenga",
        name: "Lehenga",
        image: "/Test_saree.png",
        price: "₹1999",
    },
    {
        product: "Unstitched",
        name: "Unstitched",
        image: "/Test_saree.png",
        price: "₹499",
    },
  

];
export default function cart() {
    const [cartItems, setCartItems] = useState(() => cart_items.map((c, idx) => ({
        id: idx + 1,
        name: c.name,
        variant: c.product || '',
        // parse numeric price from strings like "₹999"
        price: Number(String(c.price).replace(/[^0-9.]/g, '')) || 0,
        qty: 1,
        img: c.image || ''
    })));

    const increment = (id: number) => {
        setCartItems((items) => items.map(i => i.id === id ? { ...i, qty: i.qty + 1 } : i));
    };
    const decrement = (id: number) => {
        setCartItems((items) => items.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty - 1) } : i));
    };
    const setQty = (id: number, val: number) => {
        const qty = isNaN(val) ? 1 : Math.max(1, Math.floor(val));
        setCartItems((items) => items.map(i => i.id === id ? { ...i, qty } : i));
    };

    const subtotal = useMemo(() => cartItems.reduce((s, it) => s + it.price * it.qty, 0), [cartItems]);
    const tax = +(subtotal * 0.08).toFixed(2);
    const promo = 56; // fixed example promo
    const total = +(subtotal + tax - promo).toFixed(2);

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
                                            <button onClick={() => decrement(item.id)} aria-label="Decrease" className="h-8 w-8 flex items-center justify-center border rounded">−</button>
                                            <input type="number" value={item.qty} onChange={(e) => setQty(item.id, Number(e.target.value))} aria-label="Quantity" className="w-16 text-center border rounded h-8" min={1} />
                                            <button onClick={() => increment(item.id)} aria-label="Increase" className="h-8 w-8 flex items-center justify-center border rounded">+</button>
                                        </div>
                                        <div className="w-28 text-right font-medium text-gray-900">₹{(item.price * item.qty).toFixed(2)}</div>
                                        <button className="text-red-500 hover:text-red-700 ml-4" aria-label="Remove">✕</button>
                                    </article>
                                ))}
                            </div>

                            <div className="mt-6 flex gap-3 flex-wrap">
                                <a href="/shop" className="px-4 py-2 border rounded text-gray-700">← Continue shopping</a>
                               
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

                            <a href="#" className="block text-center mt-6 w-full bg-indigo-600 text-white px-4 py-3 rounded">Proceed to checkout →</a>

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