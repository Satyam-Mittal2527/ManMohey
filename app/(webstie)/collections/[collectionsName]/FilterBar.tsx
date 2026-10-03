"use client";

import Link from "next/link";

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

interface FilterBarProps {
    childCategories: Category[];
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

export default function Filter_bar({
    childCategories,
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
}: FilterBarProps) {
    return (
        <aside className="hidden md:block w-[260px] p-5 sticky top-[100px] overflow-y-auto self-start max-h-[calc(100vh-140px)] bg-white">
            {childCategories.length > 0 && (
                <div className="pb-5 mb-5 border-b">
                    <h3 className="font-semibold mb-3">Category</h3>

                    {childCategories.map((category) => {
                        const href = `/collections/${encodeURIComponent(
                            category.slug || category.name.toLowerCase().replace(/\s+/g, "-")
                        )}`;

                        return (
                            <Link
                                key={category.id}
                                href={href}
                                className="flex items-center justify-between py-1.5 text-sm text-slate-700 transition hover:text-black"
                            >
                                <span className="truncate">{category.name}</span>

                                <span className="text-xs text-gray-500">
                                    {category.count ?? 0}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            )}

            <div className="pb-5 mb-5 border-b">
                <h3 className="font-semibold mb-3">Price</h3>
                <div className="grid grid-cols-2 gap-2 text-xs">
                    <label className="flex flex-col gap-1">
                        <span>Min</span>
                        <input
                            type="number"
                            min={0}
                            value={minPrice}
                            onChange={(event) => onPriceChange?.("min", event.target.value)}
                            className="rounded border border-slate-300 px-2 py-1"
                        />
                    </label>
                    <label className="flex flex-col gap-1">
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
            </div>

            <div className="mb-6">
                <h3 className="text-sm font-medium mb-3">Availability</h3>
                <div className="space-y-2">
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
                </div>
            </div>

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

            <div className="mt-4 flex gap-2">
                <button
                    className="w-full rounded-md bg-black py-2 text-white hover:bg-gray-800 transition"
                    onClick={onApplyFilters}
                >
                    Apply Filters
                </button>
            </div>

            {(selectedCategories.length > 0 || Object.keys(selectedFilterValues).length > 0 || minPrice || maxPrice || availability) && (
                <button
                    className="mt-2 w-full rounded-md border border-slate-300 py-2 text-slate-700 hover:bg-slate-50 transition"
                    onClick={onClearFilters}
                >
                    Clear Filters
                </button>
            )}
        </aside>
    );
}