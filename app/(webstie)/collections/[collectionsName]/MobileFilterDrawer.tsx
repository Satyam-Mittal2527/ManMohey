"use client"

import { useState } from "react";

export default function MobileFilterDrawer({ Category }: { Category?: { name: string }[] }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className="md:hidden flex items-center">
                <button aria-label="Open filters" onClick={() => setOpen(true)} className="p-2">
                    {/* hamburger icon */}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>

            {open && (
                <div className="fixed inset-0 z-50 flex">
                    <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
                    <aside className="relative w-full max-w-xs bg-white h-full p-4 overflow-auto">
                        <button aria-label="Close filters" onClick={() => setOpen(false)} className="mb-4 flex items-center gap-2">
                            {/* back arrow */}
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Back
                        </button>

                        <div className="pb-5 mb-5 border-b">
                            <h3 className="font-semibold mb-3">Category</h3>
                            {Category?.map((c, idx) => (
                                <label key={idx} className="flex items-center justify-between gap-2 py-1">
                                    <span className="flex items-center gap-2"><input type="checkbox" />{c.name}</span>
                                    <span className="text-[11px]">12</span>
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
                            <label className="flex items-center justify-between gap-2 py-1"><span className="flex items-center gap-2"><input type="checkbox"/> Apple</span> <span className="text-[11px]">84</span></label>
                            <label className="flex items-center justify-between gap-2 py-1"><span className="flex items-center gap-2"><input type="checkbox" /> Samsung</span> <span className="text-[11px]">72</span></label>
                            <label className="flex items-center justify-between gap-2 py-1"><span className="flex items-center gap-2"><input type="checkbox" /> Sony</span> <span className="text-[11px]">36</span></label>
                        </div>

                        <a href="#" className="inline-block mt-2 text-sm font-medium">Apply filters</a>
                    </aside>
                </div>
            )}
        </>
    )
}
