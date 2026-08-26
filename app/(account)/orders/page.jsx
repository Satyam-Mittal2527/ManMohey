"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { getOrders } from "@/lib/orders";


export default function OrdersPage() {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {

        async function loadOrders() {

            try {

                setLoading(true);

                const response = await getOrders();

                setOrders(response.data || []);

            } catch (error) {

                console.error(
                    "Failed to load orders:",
                    error
                );

                setError(
                    error.message ||
                    "Unable to load orders"
                );

            } finally {

                setLoading(false);

            }
        }

        loadOrders();

    }, []);


    if (loading) {
        return (
            <main className="min-h-screen bg-gray-50 px-6 py-12">
                <div className="mx-auto max-w-5xl">
                    <h1 className="text-2xl font-semibold">
                        My Orders
                    </h1>

                    <p className="mt-4 text-gray-500">
                        Loading your orders...
                    </p>
                </div>
            </main>
        );
    }


    if (error) {
        return (
            <main className="min-h-screen bg-gray-50 px-6 py-12">
                <div className="mx-auto max-w-5xl">

                    <h1 className="text-2xl font-semibold">
                        My Orders
                    </h1>

                    <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">
                        {error}
                    </div>

                </div>
            </main>
        );
    }


    return (
        <main className="min-h-screen bg-gray-50 px-6 py-12">

            <div className="mx-auto max-w-5xl">

                <div className="mb-8">
                    <h1 className="text-3xl font-semibold text-gray-900">
                        My Orders
                    </h1>

                    <p className="mt-2 text-gray-500">
                        View and track your ManMohey orders.
                    </p>
                </div>


                {orders.length === 0 ? (

                    <div className="rounded-xl border bg-white p-10 text-center shadow-sm">

                        <h2 className="text-lg font-medium text-gray-900">
                            No orders yet
                        </h2>

                        <p className="mt-2 text-gray-500">
                            Your orders will appear here after checkout.
                        </p>

                        <Link
                            href="/"
                            className="mt-6 inline-block rounded-lg bg-violet-600 px-5 py-2.5 text-white transition hover:bg-violet-700"
                        >
                            Start Shopping
                        </Link>

                    </div>

                ) : (

                    <div className="space-y-4">

                        {orders.map((order) => (

                            <div
                                key={order.id}
                                className="rounded-xl border bg-white p-6 shadow-sm"
                            >

                                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

                                    <div>

                                        <p className="text-sm text-gray-500">
                                            Order
                                        </p>

                                        <h2 className="font-semibold text-gray-900">
                                            {order.order_number}
                                        </h2>

                                        <p className="mt-1 text-sm text-gray-500">
                                            {new Date(
                                                order.created_at
                                            ).toLocaleDateString()}
                                        </p>

                                    </div>


                                    <div className="flex items-center gap-3">

                                        <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
                                            {order.status}
                                        </span>

                                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                                            Payment: {order.payment_status}
                                        </span>

                                    </div>

                                </div>


                                <div className="mt-6 flex flex-col justify-between gap-4 border-t pt-4 sm:flex-row sm:items-center">

                                    <div>

                                        <p className="text-sm text-gray-500">
                                            Total
                                        </p>

                                        <p className="text-lg font-semibold text-gray-900">
                                            ₹{Number(
                                                order.total_amount
                                            ).toFixed(2)}
                                        </p>

                                    </div>


                                    <Link
                                        href={`/orders/${order.id}`}
                                        className="rounded-lg border border-violet-600 px-4 py-2 text-sm font-medium text-violet-600 transition hover:bg-violet-50"
                                    >
                                        View Details
                                    </Link>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </main>
    );
}