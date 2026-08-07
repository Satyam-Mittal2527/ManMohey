interface FilterOption {
    id: number;
    name: string;
    count: number;
}

interface FilterGroup {
    key: string;
    name: string;
    options: FilterOption[];
}

interface Category {
    id: number;
    name: string;
    slug: string;
    count?: number;
}

interface FilterBarProps {
    childCategories: Category[];
    filterGroups: FilterGroup[];
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

            {/* Dynamic Filters */}
            {filterGroups.map((group) => (
                <div key={group.key} className="mb-6">
                    <h3 className="font-semibold mb-2">{group.name}</h3>

                    {group.options.map((option) => (
                        <label
                            key={option.id}
                            className="flex items-center gap-2 py-1"
                        >
                            <input type="checkbox" />

                            <span>{option.name}</span>

                            <span className="text-gray-500 text-sm">
                                ({option.count})
                            </span>
                        </label>
                    ))}
                </div>
            ))}

            <button
                className="mt-4 w-full rounded-md bg-black py-2 text-white hover:bg-gray-800 transition"
            >
                Apply Filters
            </button>

        </aside>
    );
}