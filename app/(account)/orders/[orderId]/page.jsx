"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import {
    getOrder,
    cancelOrder,
} from "@/lib/orders";


export default function OrderDetailsPage() {

    const { orderId } = useParams();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [cancelling, setCancelling] = useState(false);

    const orderSteps = [
        "PENDING",
        "CONFIRMED",
        "SHIPPED",
        "DELIVERED",
    ];
    const getStatusStyle = (status) => {
        switch (status) {
            case "PENDING":
                return "bg-yellow-100 text-yellow-700";

            case "CONFIRMED":
                return "bg-blue-100 text-blue-700";

            case "SHIPPED":
                return "bg-violet-100 text-violet-700";

            case "DELIVERED":
                return "bg-green-100 text-green-700";

            case "CANCELLED":
                return "bg-red-100 text-red-700";

            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    const formatStatus = (status) => {
        if (!status) return "";

        return (
            status.charAt(0) +
            status.slice(1).toLowerCase()
        );
    };

    const handleCancelOrder = async () => {
        if (!order) return;

        const confirmed = window.confirm(
            "Are you sure you want to cancel this order?"
        );

        if (!confirmed) {
            return;
        }

        try {
            setCancelling(true);

            const response = await cancelOrder(order.id);

            setOrder((previousOrder) => ({
                ...previousOrder,
                status: response.data.status,
                updated_at: response.data.updated_at,
            }));

            alert("Order cancelled successfully");

        } catch (error) {
            console.error(
                "Failed to cancel order:",
                error
            );

            alert(
                error.message ||
                "Unable to cancel order"
            );
        } finally {
            setCancelling(false);
        }
    };
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


                        <div className="flex flex-wrap items-center gap-2">

                            <span
                                className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(
                                    order.status
                                )}`}
                            >
                                {order.status}
                            </span>
                            {order.status !== "CANCELLED" && (
                                <section className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                                    <h2 className="text-sm font-semibold text-gray-900">
                                        Order Progress
                                    </h2>

                                    <div className="mt-7 flex items-start">

                                        {orderSteps.map((step, index) => {

                                            const currentIndex =
                                                orderSteps.indexOf(order.status);

                                            const completed =
                                                index <= currentIndex;

                                            return (
                                                <div
                                                    key={step}
                                                    className="flex flex-1 items-start"
                                                >

                                                    <div className="flex min-w-0 flex-col items-center">

                                                        <div
                                                            className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold ${completed
                                                                ? "bg-violet-600 text-white"
                                                                : "bg-gray-100 text-gray-400"
                                                                }`}
                                                        >
                                                            {completed ? "✓" : index + 1}
                                                        </div>

                                                        <span
                                                            className={`mt-2 text-center text-xs font-medium ${completed
                                                                ? "text-gray-900"
                                                                : "text-gray-400"
                                                                }`}
                                                        >
                                                            {formatStatus(step)}
                                                        </span>

                                                    </div>

                                                    {index < orderSteps.length - 1 && (
                                                        <div
                                                            className={`mt-4 h-0.5 flex-1 ${index < currentIndex
                                                                ? "bg-violet-600"
                                                                : "bg-gray-200"
                                                                }`}
                                                        />
                                                    )}

                                                </div>
                                            );
                                        })}

                                    </div>

                                </section>
                            )}

                            {order.status === "PENDING" && (
                                <button
                                    type="button"
                                    onClick={handleCancelOrder}
                                    disabled={cancelling}
                                    className="rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {cancelling
                                        ? "Cancelling..."
                                        : "Cancel Order"}
                                </button>
                            )}

                            {order.status === "CANCELLED" && (
                                <section className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-5">

                                    <div className="flex items-start gap-3">

                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
                                            ✕
                                        </div>

                                        <div>
                                            <h2 className="font-semibold text-red-800">
                                                Order Cancelled
                                            </h2>

                                            <p className="mt-1 text-sm text-red-700">
                                                This order has been cancelled successfully.
                                            </p>

                                        </div>

                                    </div>

                                </section>
                            )}

                        </div>

                    </div>

                </div>


                <div className="space-y-6">

                    {/* Products */}

                    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                        <div className="flex items-center justify-between">

                            <h2 className="text-lg font-semibold text-gray-900">
                                Items
                            </h2>

                            <span className="text-sm text-gray-500">
                                {order.items?.length || 0}{" "}
                                {order.items?.length === 1 ? "item" : "items"}
                            </span>

                        </div>

                        <div className="mt-5 divide-y divide-gray-100">

                            {order.items?.map((item) => (

                                <div
                                    key={item.id}
                                    className="flex gap-4 py-5"
                                >

                                    {/* Product image */}

                                    <div className="h-24 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-100">

                                        {item.image ? (
                                            <img
                                                src={item.image}
                                                alt={item.product_name}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full items-center justify-center text-xs text-gray-400">
                                                No image
                                            </div>
                                        )}

                                    </div>

                                    {/* Product information */}

                                    <div className="min-w-0 flex-1">

                                        <h3 className="font-medium text-gray-900">
                                            {item.product_name}
                                        </h3>

                                        <div className="mt-2 space-y-1 text-sm text-gray-500">

                                            {item.size && (
                                                <p>
                                                    Size: {item.size}
                                                </p>
                                            )}

                                            {item.color && (
                                                <p>
                                                    Color: {item.color}
                                                </p>
                                            )}

                                            {item.sku && (
                                                <p>
                                                    SKU: {item.sku}
                                                </p>
                                            )}

                                            <p>
                                                Quantity: {item.quantity}
                                            </p>

                                        </div>

                                    </div>

                                    {/* Price */}

                                    <div className="shrink-0 text-right">

                                        <p className="font-semibold text-gray-900">
                                            ₹
                                            {Number(
                                                item.subtotal
                                            ).toFixed(2)}
                                        </p>

                                        <p className="mt-1 text-xs text-gray-500">
                                            ₹
                                            {Number(
                                                item.unit_price
                                            ).toFixed(2)}{" "}
                                            × {item.quantity}
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