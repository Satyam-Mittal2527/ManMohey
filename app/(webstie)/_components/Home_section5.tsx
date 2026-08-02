"use client"
import Link from "next/link";
import { get_homePage_bestSellers, get_homePage_trendings } from "@/lib/api";
import { useEffect, useState } from "react";

interface Products_Grid {
    id: string
    product_name: string
    product_price: string
    image1_url: string
    product_images: string[]
}

export default function Home_section5() {
    const [Products, setProducts] = useState<Products_Grid[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
        
            useEffect(()=>{
                const fetchProducts = async () => {
                    setIsLoading(true);
                    setErrorMessage(null);
                    try {
                        const data = await get_homePage_bestSellers();
                        setProducts(Array.isArray(data)? data : []);
                    } catch (error) {
                        console.error("Error fetching the best sellers", error);
                        setErrorMessage("Unable to load best sellers right now.");
                    } finally {
                        setIsLoading(false);
                    }
                };
        
                fetchProducts();
            }, [])
    return (
        <section className="bg-white py-12 md:py-14">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between gap-4 mb-4">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Best Sellers</p>
                    <a href="/bestSellers"><button className="border border-black px-3 py-1 rounded">View All</button></a>
                </div>

                <div className="grid gap-8 grid-cols-[repeat(auto-fit,minmax(240px,1fr))]">
                    {isLoading ? (
                        Array.from({ length: 4 }).map((_, index) => (
                            <div key={index} className="flex flex-col gap-4 border border-gray-200 rounded-lg p-4 animate-pulse">
                                <div className="w-full rounded-md bg-slate-200 h-[360px] sm:h-[420px] md:h-[480px]" />
                                <div className="h-4 w-3/4 rounded bg-slate-200" />
                                <div className="h-4 w-1/2 rounded bg-slate-200" />
                                <div className="h-10 w-24 rounded bg-slate-200" />
                            </div>
                        ))
                    ) : errorMessage ? (
                        <div className="col-span-full rounded-lg border border-red-200 bg-red-50 p-6 text-center text-sm text-red-700">
                            {errorMessage}
                        </div>
                    ) : Products.length > 0 ? (
                        Products.map((product) => (
                            <div key={product.id} className="flex flex-col gap-4 border border-gray-200 rounded-lg p-4">
                                <div className="w-full rounded-md overflow-hidden flex items-center justify-center bg-white">
                                    <img src={product.image1_url} alt={product.product_name} className="w-full h-auto object-contain max-h-[360px] sm:max-h-[420px] md:max-h-[480px]" />
                                </div>
                                <div className="mt-2 text-sm font-medium text-gray-800">{product.product_name}</div>
                                <div className="text-sm text-gray-500">{product.product_price}</div>
                                <Link href={`/collections/${product.id}/products/${product.product_name}`} className="mt-3 text-sm text-indigo-600 hover:underline">View Details</Link>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full rounded-lg border border-slate-200 bg-slate-50 p-6 text-center text-sm text-slate-600">
                            No best sellers available at the moment.
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}