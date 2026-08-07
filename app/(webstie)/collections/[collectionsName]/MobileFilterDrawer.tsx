"use client";

import { useState } from "react";

interface FilterOption {
    id: number;
    name: string;
    slug: string;
    count: number;
    hex_code?: string;
    value?: number;
}

interface FilterGroup {
    displayName: string;
    type: "checkbox" | "color" | "range";
    options: FilterOption[];
    min?: number;
    max?: number;
}
interface Category {
    id: number;
    name: string;
    slug: string;
    count?: number;
}

interface MobileFilterDrawerProps {
    childCategories: Category[];
    filterGroups?: Record<string, FilterGroup>;
}

export default function MobileFilterDrawer({
    childCategories,
    filterGroups,
}: MobileFilterDrawerProps) {

    const [openCategory, setOpenCategory] = useState(false);
    const [openPrice, setOpenPrice] = useState(false);
    const [openFilters, setOpenFilters] = useState(false);

    return (
        <>

            {/* Bottom Bar */}
            <div className="fixed bottom-0 inset-x-0 z-40 grid grid-cols-3 bg-black text-white md:hidden">

                <button
                    onClick={() => setOpenCategory(true)}
                    className="py-3"
                >
                    <i className="bi bi-handbag"></i>
                    <span className="ml-2">Category</span>
                </button>

                <button
                    onClick={() => setOpenPrice(true)}
                    className="py-3 border-x border-gray-700"
                >
                    <i className="bi bi-cash-stack"></i>
                    <span className="ml-2">Price</span>
                </button>

                <button
                    onClick={() => setOpenFilters(true)}
                    className="py-3"
                >
                    <i className="bi bi-funnel"></i>
                    <span className="ml-2">Filters</span>
                </button>

            </div>

            {/* Category Drawer */}

            {openCategory && (

                <div className="fixed inset-0 z-50 flex">

                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setOpenCategory(false)}
                    />

                    <aside className="relative h-full w-full max-w-xs overflow-y-auto bg-white p-5">

                        <button
                            onClick={() => setOpenCategory(false)}
                            className="mb-5 flex items-center gap-2"
                        >
                            ← Back
                        </button>

                        <h3 className="mb-4 text-lg font-semibold">
                            Categories
                        </h3>

                        {childCategories.map((category) => (

                            <label
                                key={category.id}
                                className="flex items-center justify-between py-2"
                            >

                                <span className="flex items-center gap-2">

                                    <input type="checkbox" />

                                    {category.name}

                                </span>

                                <span className="text-xs text-gray-500">

                                    {category.count ?? 0}

                                </span>

                            </label>

                        ))}

                        <button className="mt-6 w-full rounded-md bg-black py-2 text-white">
                            Apply
                        </button>

                    </aside>

                </div>

            )}

            {/* Price Drawer */}

            {openPrice && (

                <div className="fixed inset-0 z-50 flex">

                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setOpenPrice(false)}
                    />

                    <aside className="relative h-full w-full max-w-xs overflow-y-auto bg-white p-5">

                        <button
                            onClick={() => setOpenPrice(false)}
                            className="mb-5 flex items-center gap-2"
                        >
                            ← Back
                        </button>

                        <h3 className="mb-4 text-lg font-semibold">

                            Price

                        </h3>

                        <div className="flex justify-between text-sm">

                            <span>₹0</span>

                            <span>₹10000</span>

                        </div>

                        <div className="my-4 h-1 rounded-full bg-slate-200"></div>

                        <button className="mt-6 w-full rounded-md bg-black py-2 text-white">
                            Apply
                        </button>

                    </aside>

                </div>

            )}

            {/* Dynamic Filters */}

            {openFilters && (

                <div className="fixed inset-0 z-50 flex">

                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setOpenFilters(false)}
                    />

                    <aside className="relative h-full w-full max-w-xs overflow-y-auto bg-white p-5">

                        <button
                            onClick={() => setOpenFilters(false)}
                            className="mb-5 flex items-center gap-2"
                        >
                            ← Back
                        </button>

                        {Object.entries(filterGroups ?? {}).map(([key, group]) => {
                            if (group.type !== "range" && group.options.length === 0) return null;

                            return (
                                <div key={key} className="mb-6">
                                    <h3 className="text-sm font-medium mb-3">
                                        {group.displayName}
                                    </h3>

                                    {group.type === "range" ? (
                                        <>
                                            <div className="flex justify-between text-xs mb-2">
                                                <span>₹{group.min}</span>
                                                <span>₹{group.max}</span>
                                            </div>

                                            <div className="h-1 rounded-full bg-slate-200"></div>
                                        </>
                                    ) : (
                                        <div className="space-y-2">
                                            {group.options.map((option) => (
                                                <label
                                                    key={option.id}
                                                    className="flex items-center gap-2 py-1"
                                                >
                                                    <input type="checkbox" />

                                                    {group.type === "color" && option.hex_code && (
                                                        <span
                                                            className="w-4 h-4 rounded-full border border-gray-300"
                                                            style={{ backgroundColor: option.hex_code }}
                                                        />
                                                    )}

                                                    <span>{option.name}</span>

                                                    <span className="text-gray-500 text-sm">
                                                        ({option.count})
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })}

                        <button className="w-full rounded-md bg-black py-2 text-white">
                            Apply Filters
                        </button>

                    </aside>

                </div>

            )}

        </>
    );
}