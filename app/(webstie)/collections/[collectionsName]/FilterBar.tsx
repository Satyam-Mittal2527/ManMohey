interface Category {
    name: string;
}

interface CollectionCategoryProps {
    CategoryList: Category[];
}
export default function Filter_bar({
    CategoryList,
}:CollectionCategoryProps) {
    return (
        <aside className="hidden md:block w-[260px] p-5 sticky top-[100px] overflow-y-auto self-start max-h-[calc(100vh-140px)] bg-white">
            <div className="pb-5 mb-5 border-b">
                <h3 className="font-semibold mb-3">Category</h3>
                {CategoryList.map((categoryItems)=> (
                     <label key={categoryItems.name} className="flex items-center justify-between gap-2 py-1">
                        <span className="flex items-center gap-2">
                            <input type="checkbox" />{categoryItems.name}
                            </span> <span className="text-[11px]">76</span>
                        </label>
                ))}
            </div>
            <div className="mb-5">
                <h3 className="font-semibold mb-3">Price range</h3>
                <div className="flex justify-between text-[11px] mb-2">
                    <span>$120</span><span>$3,400</span></div>
                <div className="h-[4px] rounded-[999px] bg-[#E2E8F0] mb-2" aria-hidden="true"></div>
                <div className="flex justify-between text-[11px]">
                    <span>$420</span><span>$2,380</span></div>
            </div>
            <div className="pb-5 mb-5 border-b">
                <h3 className="font-semibold mb-3">Brand</h3>
                <label className="flex items-center justify-between gap-2 py-1"><span className="flex items-center gap-2"><input type="checkbox" />Brand Name</span> <span className="text-[11px]">84</span></label>
                <label className="flex items-center justify-between gap-2 py-1"><span className="flex items-center gap-2"><input type="checkbox" />Brand Name</span> <span className="text-[11px]">72</span></label>
                <label className="flex items-center justify-between gap-2 py-1"><span className="flex items-center gap-2"><input type="checkbox" />Brand Name</span> <span className="text-[11px]">36</span></label>
                <label className="flex items-center justify-between gap-2 py-1"><span className="flex items-center gap-2"><input type="checkbox" />Brand Name</span> <span className="text-[11px]">22</span></label>
                <label className="flex items-center justify-between gap-2 py-1"><span className="flex items-center gap-2"><input type="checkbox" />Brand Name</span> <span className="text-[11px]">28</span></label>
                <label className="flex items-center justify-between gap-2 py-1"><span className="flex items-center gap-2"><input type="checkbox" />Brand Name</span> <span className="text-[11px]">19</span></label>
                <label className="flex items-center justify-between gap-2 py-1"><span className="flex items-center gap-2"><input type="checkbox" />Brand Name</span> <span className="text-[11px]">31</span></label>
            </div>
            <div className="pb-5 mb-5 border-b">
                <h3 className="font-semibold mb-3">Availability</h3>
                <label className="flex items-center justify-between gap-2 py-1"><span className="flex items-center gap-2"><input type="checkbox" /> Best Seller</span> <span className="text-[11px]">298</span></label>
                <label className="flex items-center justify-between gap-2 py-1"><span className="flex items-center gap-2"><input type="checkbox" /> Trending</span> <span className="text-[11px]">64</span></label>
                <label className="flex items-center justify-between gap-2 py-1"><span className="flex items-center gap-2"><input type="checkbox" /> New arrivals</span> <span className="text-[11px]">28</span></label>
            </div>
            <a href="#" className="inline-block mt-2 text-sm font-medium">Apply filters</a>
        </aside>
    )
}