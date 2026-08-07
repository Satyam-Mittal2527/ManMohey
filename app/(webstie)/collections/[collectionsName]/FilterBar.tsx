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
}

export default function Filter_bar({
    childCategories,
    filterGroups,
}: FilterBarProps) {
    return (
        <aside className="hidden md:block w-[260px] p-5 sticky top-[100px] overflow-y-auto self-start max-h-[calc(100vh-140px)] bg-white">

            {/* Categories */}
            {childCategories.length > 0 && (
                <div className="pb-5 mb-5 border-b">
                    <h3 className="font-semibold mb-3">Category</h3>

                    {childCategories.map((category) => (
                        <label
                            key={category.id}
                            className="flex items-center justify-between py-1"
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
                </div>
            )}

            {/* Price */}
            <div className="pb-5 mb-5 border-b">
                <h3 className="font-semibold mb-3">Price</h3>

                <div className="flex justify-between text-xs mb-2">
                    <span>₹0</span>
                    <span>₹10000</span>
                </div>

                <div className="h-1 rounded-full bg-slate-200"></div>
            </div>

            {/* Availability */}
            <div className="mb-6">
                <h3 className="text-sm font-medium mb-3">Availability</h3>

                <div className="space-y-2">
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            className="w-4 h-4 accent-pink-600"
                        />
                        <span className="text-sm text-slate-700">
                            In Stock
                        </span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            className="w-4 h-4 accent-pink-600"
                        />
                        <span className="text-sm text-slate-700">
                            Out of Stock
                        </span>
                    </label>
                </div>
            </div>

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

            <button
                className="mt-4 w-full rounded-md bg-black py-2 text-white hover:bg-gray-800 transition"
            >
                Apply Filters
            </button>

        </aside>
    );
}