"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import { getOrder } from "@/lib/orders";


export default function OrderDetailsPage() {

    const { orderId } = useParams();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {

        if (!orderId) {
            return;
        }

        async function loadOrder() {

            try {

                setLoading(true);

                const response = await getOrder(orderId);

                setOrder(response.data);

            } catch (error) {

                console.error(
                    "Failed to load order:",
                    error
                );

                setError(
                    error.message ||
                    "Unable to load order"
                );

            } finally {

                setLoading(false);

            }
        }

        loadOrder();

    }, [orderId]);


    if (loading) {
        return (
            <main className="min-h-screen bg-gray-50 px-6 py-12">
                <div className="mx-auto max-w-5xl">

                    <h1 className="text-3xl font-semibold text-gray-900">
                        Order Details
                    </h1>

                    <p className="mt-4 text-gray-500">
                        Loading order...
                    </p>

                </div>
            </main>
        );
    }


    if (error || !order) {
        return (
            <main className="min-h-screen bg-gray-50 px-6 py-12">
                <div className="mx-auto max-w-5xl">

                    <Link
                        href="/orders"
                        className="text-sm font-medium text-violet-600 hover:text-violet-700"
                    >
                        ← Back to Orders
                    </Link>

                    <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-5 text-red-600">
                        {error || "Order not found"}
                    </div>

                </div>
            </main>
        );
    }


    const orderDate = new Date(
        order.created_at
    ).toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "long",
            year: "numeric",
        }
    );


    return (
        <main className="min-h-screen bg-gray-50 px-6 py-12">

            <div className="mx-auto max-w-5xl">

                {/* Header */}

                <div className="mb-8">

                    <Link
                        href="/orders"
                        className="text-sm font-medium text-violet-600 hover:text-violet-700"
                    >
                        ← Back to Orders
                    </Link>

                    <div className="mt-5 flex flex-col justify-between gap-4 md:flex-row md:items-center">

                        <div>

                            <h1 className="text-3xl font-semibold text-gray-900">
                                Order Details
                            </h1>

                            <p className="mt-2 text-sm text-gray-500">
                                Order #{order.order_number}
                            </p>

                            <p className="mt-1 text-sm text-gray-500">
                                Placed on {orderDate}
                            </p>

                        </div>


                        <div className="flex flex-wrap gap-2">

                            <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-medium text-yellow-700">
                                {order.status}
                            </span>

                            <span className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
                                Payment: {order.payment_status}
                            </span>

                        </div>

                    </div>

                </div>


                <div className="space-y-6">

                    {/* Products */}

                    <section className="rounded-xl border bg-white p-6 shadow-sm">

                        <h2 className="text-lg font-semibold text-gray-900">
                            Items
                        </h2>


                        <div className="mt-5 divide-y">

                            {order.items?.map((item) => (

                                <div
                                    key={item.id}
                                    className="flex flex-col justify-between gap-4 py-5 sm:flex-row"
                                >

                                    <div>

                                        <h3 className="font-medium text-gray-900">
                                            {item.product_name}
                                        </h3>

                                        <div className="mt-2 space-y-1 text-sm text-gray-500">

                                            <p>
                                                Quantity: {item.quantity}
                                            </p>

                                            {item.size && (
                                                <p>
                                                    Size: {item.size}
                                                </p>
                                            )}

                                            {item.sku && (
                                                <p>
                                                    SKU: {item.sku}
                                                </p>
                                            )}

                                        </div>

                                    </div>


                                    <div className="text-left sm:text-right">

                                        <p className="font-medium text-gray-900">
                                            ₹{Number(
                                                item.subtotal
                                            ).toFixed(2)}
                                        </p>

                                        <p className="mt-1 text-sm text-gray-500">
                                            ₹{Number(
                                                item.unit_price
                                            ).toFixed(2)} ×{" "}
                                            {item.quantity}
                                        </p>

                                    </div>

                                </div>

                            ))}

                        </div>

                    </section>


                    {/* Delivery Address */}

                    <section className="rounded-xl border bg-white p-6 shadow-sm">

                        <h2 className="text-lg font-semibold text-gray-900">
                            Delivery Address
                        </h2>

                        <div className="mt-4 text-sm leading-6 text-gray-600">

                            <p className="font-medium text-gray-900">
                                {order.full_name}
                            </p>

                            <p>
                                {order.phone_number}
                            </p>

                            <p className="mt-2">
                                {order.address_line_1}
                            </p>

                            {order.address_line_2 && (
                                <p>
                                    {order.address_line_2}
                                </p>
                            )}

                            <p>
                                {order.city}, {order.state}
                            </p>

                            <p>
                                {order.postal_code}, {order.country}
                            </p>

                        </div>

                    </section>


                    {/* Order Summary */}

                    <section className="rounded-xl border bg-white p-6 shadow-sm">

                        <h2 className="text-lg font-semibold text-gray-900">
                            Order Summary
                        </h2>


                        <div className="mt-5 space-y-3 text-sm">

                            <div className="flex justify-between">
                                <span className="text-gray-500">
                                    Subtotal
                                </span>

                                <span className="font-medium text-gray-900">
                                    ₹{Number(
                                        order.subtotal
                                    ).toFixed(2)}
                                </span>
                            </div>


                            <div className="flex justify-between">
                                <span className="text-gray-500">
                                    Shipping
                                </span>

                                <span className="font-medium text-gray-900">
                                    ₹{Number(
                                        order.shipping_fee
                                    ).toFixed(2)}
                                </span>
                            </div>


                            <div className="flex justify-between">
                                <span className="text-gray-500">
                                    Discount
                                </span>

                                <span className="font-medium text-gray-900">
                                    -₹{Number(
                                        order.discount
                                    ).toFixed(2)}
                                </span>
                            </div>


                            <div className="border-t pt-4">

                                <div className="flex justify-between">

                                    <span className="text-base font-semibold text-gray-900">
                                        Total
                                    </span>

                                    <span className="text-xl font-semibold text-gray-900">
                                        ₹{Number(
                                            order.total_amount
                                        ).toFixed(2)}
                                    </span>

                                </div>

                            </div>

                        </div>

                    </section>

                </div>

            </div>

        </main>
    );
}