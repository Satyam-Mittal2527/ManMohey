"use client"

import Link from "next/link";
import { get_homePage_newArrivals } from "@/lib/api";
import { useEffect, useState } from "react";

interface Products_Grid {
    id: string
    product_name: string
    product_price: string
    image1_url: string
    product_images: string[]
}

// const products_grid = [
//     {
//         product: "sarees",
//         name: "Saree",
//         image: "/Test_saree.png",
//         price: "₹999",
//     },
//     {
//         product: "kurtis",
//         name: "Kurti",
//         image: "/Test_saree.png",
//         price: "₹799",
//     },
//     {
//         product: "Lehenga",
//         name: "Lehenga",
//         image: "/Test_saree.png",
//         price: "₹1999",
//     },
//     {
//         product: "Unstitched",
//         name: "Unstitched",
//         image: "/Test_saree.png",
//         price: "₹499",
//     },
  

// ];
export default function Home_section2() {
    const [Products, setProducts] = useState<Products_Grid[]>([]);

    useEffect(()=>{
        const fetchProducts = async () => {
            try {
                const data = await get_homePage_newArrivals();
                setProducts(Array.isArray(data)? data : []);
            } catch (error) {
                console.error("Error fetching the newArrivalProducts", error);
            }
        };

        fetchProducts();
    }, [])
    return (
        <section className="bg-white py-12 md:py-14">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between gap-4 mb-4">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">New Arrivals</p>
                    <a href="/newArrivals"><button className="border border-black px-3 py-1 rounded">View All</button></a>
                </div>

                <div className="grid gap-8 grid-cols-[repeat(auto-fit,minmax(240px,1fr))]">

                    {Products.map((product) => (
                        <div key={product.id} className="flex flex-col gap-4 border border-gray-200 rounded-lg p-4">
                            <div className="w-full rounded-md overflow-hidden flex items-center justify-center bg-white">
                                <img src={product.image1_url} alt={product.product_name} className="w-full h-auto object-contain max-h-[360px] sm:max-h-[420px] md:max-h-[480px]" />
                            </div>
                            <div className="mt-2 text-sm font-medium text-gray-800">{product.product_name}</div>
                            <div className="text-sm text-gray-500">{product.product_price}</div>
                            <Link href={`/collections/${product.id}/products/${product.product_name}`} className="mt-3 text-sm text-indigo-600 hover:underline">View Details</Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}