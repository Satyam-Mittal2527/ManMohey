"use client"

import { useState } from "react";
interface Category {
    name: string;
}

interface CollectionCategoryProps {
    CategoryList: Category[];
}
export default function MobileFilterDrawer({ 
    CategoryList,
}: CollectionCategoryProps) {
    const [openCategory, setOpenCategory] = useState(false);
    const [openPrice, setOpenPrice] = useState(false);
    const [openBrand, setOpenBrand] = useState(false);
    return (
        <>
            <div className="md:hidden absolute inset-x-0 bottom-0 h-16 bg-black fixed z-10 grid grid-cols-3 divide-x-1 divide-white-200">
                <button aria-label="Open filters" onClick={() => setOpenCategory(true)} className="p-2 text-white w-full">
                    <i className="bi bi-handbag"></i>
                    <span> Category</span>
                </button>
                 <button aria-label="Open filters" onClick={() => setOpenPrice(true)} className="p-2 text-white w-full">
                    <i className="bi bi-cash-stack"></i>
                   <span> Price</span>
                </button>
                 <button aria-label="Open filters" onClick={() => setOpenBrand(true)} className="p-2 text-white w-full">
                    <i className="bi bi-bookmark-star"></i>
                   <span> Brand</span>
                </button>
            </div>

            {openCategory && (
                <div className="fixed inset-0 z-50 flex">
                    <div className="absolute inset-0 bg-black/50" onClick={() => setOpenCategory(false)} />
                    <aside className="relative w-full max-w-xs bg-white h-full p-4 overflow-auto">
                        <button aria-label="Close filters" onClick={() => setOpenCategory(false)} className="mb-4 flex items-center gap-2">
                            {/* back arrow */}
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Back
                        </button>

                        <div className="pb-5 mb-5 border-b">
                            <h3 className="font-semibold mb-3">Category</h3>
                            {CategoryList?.map((categoryItems, idx) => (
                                <label key={idx} className="flex items-center justify-between gap-2 py-1">
                                    <span className="flex items-center gap-2"><input type="checkbox" />{categoryItems.name}</span>
                                    <span className="text-[11px]">12</span>
                                </label>
                            ))}
                        </div>
                        <a href="#" className="inline-block mt-2 text-sm font-medium">Apply filters</a>
                    </aside>
                </div>
            )}
            {openPrice && (
                <div className="fixed inset-0 z-50 flex">
                    <div className="absolute inset-0 bg-black/50" onClick={() => setOpenPrice(false)} />
                    <aside className="relative w-full max-w-xs bg-white h-full p-4 overflow-auto">
                        <button aria-label="Close filters" onClick={() => setOpenPrice(false)} className="mb-4 flex items-center gap-2">
                            {/* back arrow */}
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Back
                        </button>
                          <div className="mb-5">
                            <h3 className="font-semibold mb-3">Price range</h3>
                            <div className="flex justify-between text-[11px] mb-2">
                                <span>$120</span><span>$3,400</span></div>
                            <div className="h-[4px] rounded-[999px] bg-[#E2E8F0] mb-2" aria-hidden="true"></div>
                            <div className="flex justify-between text-[11px]">
                                <span>$420</span><span>$2,380</span></div>
                        </div>
                       
                        <a href="#" className="inline-block mt-2 text-sm font-medium">Apply filters</a>
                    </aside>
                </div>
            )}
            {openBrand && (
                <div className="fixed inset-0 z-50 flex">
                    <div className="absolute inset-0 bg-black/50" onClick={() => setOpenBrand(false)} />
                    <aside className="relative w-full max-w-xs bg-white h-full p-4 overflow-auto">
                        <button aria-label="Close filters" onClick={() => setOpenBrand(false)} className="mb-4 flex items-center gap-2">
                            {/* back arrow */}
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Back
                        </button>
                         <div className="pb-5 mb-5 border-b">
                            <h3 className="font-semibold mb-3">Brand</h3>
                            <label className="flex items-center justify-between gap-2 py-1"><span className="flex items-center gap-2"><input type="checkbox"/> Brand Name</span> <span className="text-[11px]">84</span></label>
                            <label className="flex items-center justify-between gap-2 py-1"><span className="flex items-center gap-2"><input type="checkbox" /> Brand Name</span> <span className="text-[11px]">72</span></label>
                            <label className="flex items-center justify-between gap-2 py-1"><span className="flex items-center gap-2"><input type="checkbox" /> Brand Name</span> <span className="text-[11px]">36</span></label>
                        </div>
                       
                        <a href="#" className="inline-block mt-2 text-sm font-medium">Apply filters</a>
                    </aside>
                </div>
            )}
            

                        
        </>
    )
}
