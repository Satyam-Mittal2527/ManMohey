"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { getOrders } from "@/lib/orders";

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const getStatusStyle = (status) => {
        switch (status) {
            case "PENDING":
                return "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200";

            case "CONFIRMED":
                return "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-200";

            case "SHIPPED":
                return "bg-violet-50 text-violet-700 ring-1 ring-inset ring-violet-200";

            case "DELIVERED":
                return "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200";

            case "CANCELLED":
                return "bg-red-50 text-red-700 ring-1 ring-inset ring-red-200";

            default:
                return "bg-gray-50 text-gray-700 ring-1 ring-inset ring-gray-200";
        }
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    const formatStatus = (status) => {
        return status.charAt(0) + status.slice(1).toLowerCase();
    };

    useEffect(() => {
        async function loadOrders() {
            try {
                setLoading(true);
                setError("");

                const response = await getOrders();

                setOrders(response.data || []);
            } catch (error) {
                console.error(
                    "Failed to load orders:",
                    error
                );

                setError(
                    error.message ||
                    "Unable to load your orders."
                );
            } finally {
                setLoading(false);
            }
        }

        loadOrders();
    }, []);

    // ---------------------------------------------------------
    // Loading
    // ---------------------------------------------------------

    if (loading) {
        return (
            <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-5xl">

                    <div className="mb-8">
                        <div className="h-9 w-40 animate-pulse rounded-lg bg-gray-200" />

                        <div className="mt-3 h-5 w-72 animate-pulse rounded bg-gray-200" />
                    </div>

                    <div className="space-y-4">

                        {[1, 2, 3].map((item) => (
                            <div
                                key={item}
                                className="rounded-2xl border border-gray-200 bg-white p-6"
                            >
                                <div className="animate-pulse">

                                    <div className="flex justify-between">
                                        <div>
                                            <div className="h-4 w-20 rounded bg-gray-200" />
                                            <div className="mt-2 h-5 w-48 rounded bg-gray-200" />
                                        </div>

                                        <div className="h-7 w-24 rounded-full bg-gray-200" />
                                    </div>

                                    <div className="mt-6 h-px bg-gray-100" />

                                    <div className="mt-5 flex justify-between">
                                        <div className="h-8 w-24 rounded bg-gray-200" />
                                        <div className="h-10 w-32 rounded-lg bg-gray-200" />
                                    </div>

                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </main>
        );
    }

    // ---------------------------------------------------------
    // Error
    // ---------------------------------------------------------

    if (error) {
        return (
            <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-5xl">

                    <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
                        My Orders
                    </h1>

                    <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-6">
                        <p className="font-medium text-red-800">
                            Unable to load your orders
                        </p>

                        <p className="mt-1 text-sm text-red-600">
                            {error}
                        </p>

                        <button
                            onClick={() => window.location.reload()}
                            className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
                        >
                            Try Again
                        </button>
                    </div>

                </div>
            </main>
        );
    }

    // ---------------------------------------------------------
    // Empty orders
    // ---------------------------------------------------------

    if (orders.length === 0) {
        return (
            <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-5xl">

                    <div className="mb-10">
                        <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
                            My Orders
                        </h1>

                        <p className="mt-2 text-gray-500">
                            View and track your ManMohey orders.
                        </p>
                    </div>

                    <div className="flex min-h-[420px] flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white px-6 text-center shadow-sm">

                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-violet-50">
                            <svg
                                className="h-8 w-8 text-violet-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={1.7}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 11H4L5 9z"
                                />
                            </svg>
                        </div>

                        <h2 className="mt-5 text-xl font-semibold text-gray-900">
                            No orders yet
                        </h2>

                        <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
                            You haven't placed any orders yet.
                            Start exploring ManMohey and find something you love.
                        </p>

                        <Link
                            href="/"
                            className="mt-6 inline-flex items-center rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-violet-700"
                        >
                            Start Shopping
                        </Link>

                    </div>

                </div>
            </main>
        );
    }

    // ---------------------------------------------------------
    // Orders
    // ---------------------------------------------------------

    return (
        <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">

            <div className="mx-auto max-w-5xl">

                {/* Header */}

                <div className="mb-8">

                    <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
                        My Orders
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        View and track your ManMohey orders.
                    </p>

                </div>

                {/* Order count */}

                <div className="mb-5 flex items-center justify-between">

                    <p className="text-sm text-gray-500">
                        {orders.length}{" "}
                        {orders.length === 1 ? "order" : "orders"}
                    </p>

                </div>

                {/* Orders */}

                <div className="space-y-4">

                    {orders.map((order) => (

                        <div
                            key={order.id}
                            className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
                        >

                            {/* Top section */}

                            <div className="p-5 sm:p-6">

                                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                                    {/* Order information */}

                                    <div>

                                        <div className="flex items-center gap-2">

                                            <span className="text-xs font-medium uppercase tracking-wider text-gray-400">
                                                Order
                                            </span>

                                        </div>

                                        <h2 className="mt-1 text-base font-semibold text-gray-900">
                                            {order.order_number}
                                        </h2>

                                        <p className="mt-1 text-sm text-gray-500">
                                            Placed on{" "}
                                            {formatDate(order.created_at)}
                                        </p>

                                    </div>

                                    {/* Status */}

                                    <span
                                        className={`inline-flex w-fit items-center rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusStyle(
                                            order.status
                                        )}`}
                                    >

                                        <span
                                            className={`mr-2 h-1.5 w-1.5 rounded-full ${
                                                order.status === "PENDING"
                                                    ? "bg-amber-500"
                                                    : order.status === "CONFIRMED"
                                                        ? "bg-blue-500"
                                                        : order.status === "SHIPPED"
                                                            ? "bg-violet-500"
                                                            : order.status === "DELIVERED"
                                                                ? "bg-emerald-500"
                                                                : order.status === "CANCELLED"
                                                                    ? "bg-red-500"
                                                                    : "bg-gray-500"
                                            }`}
                                        />

                                        {formatStatus(order.status)}

                                    </span>

                                </div>

                                {/* Divider */}

                                <div className="my-5 border-t border-gray-100" />

                                {/* Bottom section */}

                                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                                    <div className="flex items-center gap-8">

                                        <div>

                                            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                                Total
                                            </p>

                                            <p className="mt-1 text-lg font-semibold text-gray-900">
                                                ₹
                                                {Number(
                                                    order.total_amount
                                                ).toFixed(2)}
                                            </p>

                                        </div>

                                        <div className="hidden h-9 w-px bg-gray-200 sm:block" />

                                        <div>

                                            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                                Payment
                                            </p>

                                            <p className="mt-1 text-sm font-medium text-gray-700">
                                                {order.payment_status === "PENDING"
                                                    ? "Pending"
                                                    : order.payment_status}
                                            </p>

                                        </div>

                                    </div>

                                    <Link
                                        href={`/orders/${order.id}`}
                                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700"
                                    >
                                        View Details

                                        <svg
                                            className="h-4 w-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>

                                    </Link>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </main>
    );
}