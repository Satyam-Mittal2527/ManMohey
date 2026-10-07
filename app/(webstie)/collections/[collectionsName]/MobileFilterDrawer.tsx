"use client";

import Link from "next/link";

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
    title?: string;
    categoryTitle?: string;
    showPriceAvailability?: boolean;
    filterGroups?: Record<string, FilterGroup>;
    selectedFilterValues?: Record<string, number[]>;
    selectedCategories?: number[];
    minPrice?: string;
    maxPrice?: string;
    availability?: "in_stock" | "out_of_stock" | null;
    onToggleCategory?: (categoryId: number) => void;
    onToggleFilterOption?: (groupKey: string, optionId: number) => void;
    onApplyFilters?: () => void;
    onClearFilters?: () => void;
    onPriceChange?: (field: "min" | "max", value: string) => void;
    onAvailabilityChange?: (value: "in_stock" | "out_of_stock" | null) => void;
}

export default function MobileFilterDrawer({
    childCategories,
    title,
    categoryTitle = "Categories",
    showPriceAvailability = true,
    filterGroups,
    selectedFilterValues = {},
    selectedCategories = [],
    minPrice = "",
    maxPrice = "",
    availability = null,
    onToggleCategory,
    onToggleFilterOption,
    onApplyFilters,
    onClearFilters,
    onPriceChange,
    onAvailabilityChange,
}: MobileFilterDrawerProps) {
    const [openCategory, setOpenCategory] = useState(false);
    const [openPrice, setOpenPrice] = useState(false);
    const [openFilters, setOpenFilters] = useState(false);

    return (
        <>
            <div className={`fixed bottom-0 inset-x-0 z-40 grid ${showPriceAvailability ? "grid-cols-3" : "grid-cols-2"} bg-black text-white md:hidden`}>
                <button onClick={() => setOpenCategory(true)} className="py-3">
                    <i className="bi bi-handbag"></i>
                    <span className="ml-2">{categoryTitle}</span>
                </button>
                {showPriceAvailability && <button onClick={() => setOpenPrice(true)} className="py-3 border-x border-gray-700">
                    <i className="bi bi-cash-stack"></i>
                    <span className="ml-2">Price</span>
                </button>}
                <button onClick={() => setOpenFilters(true)} className="py-3">
                    <i className="bi bi-funnel"></i>
                    <span className="ml-2">Filters</span>
                </button>
            </div>

            {openCategory && (
                <div className="fixed inset-0 z-50 flex">
                    <div className="absolute inset-0 bg-black/50" onClick={() => setOpenCategory(false)} />
                    <aside className="relative h-full w-full max-w-xs overflow-y-auto bg-white p-5">
                        <button onClick={() => setOpenCategory(false)} className="mb-5 flex items-center gap-2">
                            ← Back
                        </button>
                        <h3 className="mb-4 text-lg font-semibold">{categoryTitle}</h3>

                        {childCategories.map((category) => {
                                                const href = `/collections/${encodeURIComponent(
                                                    category.slug || category.name.toLowerCase().replace(/\s+/g, "-")
                                                )}`;

                            return (
                                                    <Link
                                                        key={category.id}
                                                        href={href}
                                                        className="flex items-center justify-between py-2 text-sm text-slate-700 transition hover:text-black"
                                                        onClick={() => setOpenCategory(false)}
                                                    >
                                                        <span className="truncate">{category.name}</span>
                                                        <span className="text-xs text-gray-500">{category.count ?? 0}</span>
                                                    </Link>
                            );
                        })}

                        <button
                            className="mt-6 w-full rounded-md bg-black py-2 text-white"
                            onClick={() => {
                                setOpenCategory(false);
                                onApplyFilters?.();
                            }}
                        >
                            Apply
                        </button>
                    </aside>
                </div>
            )}

            {openPrice && (
                <div className="fixed inset-0 z-50 flex">
                    <div className="absolute inset-0 bg-black/50" onClick={() => setOpenPrice(false)} />
                    <aside className="relative h-full w-full max-w-xs overflow-y-auto bg-white p-5">
                        <button onClick={() => setOpenPrice(false)} className="mb-5 flex items-center gap-2">
                            ← Back
                        </button>
                        <h3 className="mb-4 text-lg font-semibold">Price</h3>
                        <div className="grid grid-cols-2 gap-3">
                            <label className="flex flex-col gap-1 text-sm">
                                <span>Min</span>
                                <input
                                    type="number"
                                    min={0}
                                    value={minPrice}
                                    onChange={(event) => onPriceChange?.("min", event.target.value)}
                                    className="rounded border border-slate-300 px-2 py-1"
                                />
                            </label>
                            <label className="flex flex-col gap-1 text-sm">
                                <span>Max</span>
                                <input
                                    type="number"
                                    min={0}
                                    value={maxPrice}
                                    onChange={(event) => onPriceChange?.("max", event.target.value)}
                                    className="rounded border border-slate-300 px-2 py-1"
                                />
                            </label>
                        </div>
                        <button
                            className="mt-6 w-full rounded-md bg-black py-2 text-white"
                            onClick={() => {
                                setOpenPrice(false);
                                onApplyFilters?.();
                            }}
                        >
                            Apply
                        </button>
                    </aside>
                </div>
            )}

            {openFilters && (
                <div className="fixed inset-0 z-50 flex">
                    <div className="absolute inset-0 bg-black/50" onClick={() => setOpenFilters(false)} />
                    <aside className="relative h-full w-full max-w-xs overflow-y-auto bg-white p-5">
                        <button onClick={() => setOpenFilters(false)} className="mb-5 flex items-center gap-2">
                            ← Back
                        </button>
                        {title && <h2 className="mb-4 text-lg font-semibold">{title}</h2>}
                        {Object.entries(filterGroups ?? {}).map(([key, group]) => {
                            if (group.type !== "range" && group.options.length === 0) return null;

                            return (
                                <div key={key} className="mb-6">
                                    <h3 className="text-sm font-medium mb-3">{group.displayName}</h3>
                                    {group.type === "range" ? (
                                        <>
                                            <div className="flex justify-between text-xs mb-2">
                                                <span>₹{group.min}</span>
                                                <span>₹{group.max}</span>
                                            </div>
                                            <div className="h-1 rounded-full bg-slate-200" />
                                        </>
                                    ) : (
                                        <div className="space-y-2">
                                            {group.options.map((option) => {
                                                const selected = selectedFilterValues[key]?.includes(option.id) ?? false;
                                                return (
                                                    <label key={option.id} className="flex items-center gap-2 py-1">
                                                        <input
                                                            type="checkbox"
                                                            checked={selected}
                                                            onChange={() => onToggleFilterOption?.(key, option.id)}
                                                        />
                                                        {group.type === "color" && option.hex_code && (
                                                            <span
                                                                className="w-4 h-4 rounded-full border border-gray-300"
                                                                style={{ backgroundColor: option.hex_code }}
                                                            />
                                                        )}
                                                        <span>{option.name}</span>
                                                        <span className="text-gray-500 text-sm">({option.count})</span>
                                                    </label>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            );
                        })}

                        {showPriceAvailability && <div className="space-y-2">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 accent-pink-600"
                                    checked={availability === "in_stock"}
                                    onChange={() => onAvailabilityChange?.(availability === "in_stock" ? null : "in_stock")}
                                />
                                <span className="text-sm text-slate-700">In Stock</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 accent-pink-600"
                                    checked={availability === "out_of_stock"}
                                    onChange={() => onAvailabilityChange?.(availability === "out_of_stock" ? null : "out_of_stock")}
                                />
                                <span className="text-sm text-slate-700">Out of Stock</span>
                            </label>
                        </div>}

                        <button
                            className="mt-6 w-full rounded-md bg-black py-2 text-white"
                            onClick={() => {
                                setOpenFilters(false);
                                onApplyFilters?.();
                            }}
                        >
                            Apply Filters
                        </button>

                        {(selectedCategories.length > 0 || Object.keys(selectedFilterValues).length > 0 || minPrice || maxPrice || availability) && (
                            <button
                                className="mt-3 w-full rounded-md border border-slate-300 py-2 text-slate-700"
                                onClick={onClearFilters}
                            >
                                Clear Filters
                            </button>
                        )}
                    </aside>
                </div>
            )}
        </>
    );
}