"use client"
import Link from "next/link"
import { useState, useEffect } from "react"
import { GetNewArrivals, GetTrendings } from "@/lib/api"


interface Product {
    id: string
    product: string
    product_name: string
    product_price: string
    image1_url: string
    product_images: string[]
}


// const Products = [
//     {
//         ProductId: "Saree%201",
//         Product_name: "Silk Saree 1",
//         Product_price: "$400",
//         Product_image: "/Test_saree.png",
//         Product_images: ["/saree_icon.png", "/Test_saree.png", "/Test_saree.png"]
//     },
//     {
//         ProductId: "Saree%202",
//         Product_name: "Silk Saree 2",
//         Product_price: "$500",
//         Product_image: "/Test_saree.png",
//         Product_images: ["/Test_saree.png", "/Test_saree.png"]
//     },
//     {
//         ProductId: "Saree%203",
//         Product_name: "Silk Saree 3",
//         Product_price: "$600",
//         Product_image: "/Test_saree.png",
//         Product_images: ["/Test_saree.png", "/Test_saree.png"]
//     },
//     {
//         ProductId: "Saree%204",
//         Product_name: "Silk Saree 4",
//         Product_price: "8400",
//         Product_image: "/Test_saree.png",
//         Product_images: ["/Test_saree.png", "/Test_saree.png"]
//     },
//     {
//         ProductId: "Kurti%202",
//         Product_name: "Kurti 2",
//         Product_price: "8400",
//         Product_image: "/Test_saree.png",
//         Product_images: ["/Test_saree.png", "/Test_saree.png"]
//     },
//     {
//         ProductId: "Saree%201",
//         Product_name: "Silk Saree 1",
//         Product_price: "$400",
//         Product_image: "/Test_saree.png",
//         Product_images: ["/saree_icon.png", "/Test_saree.png", "/Test_saree.png"]
//     },
//     {
//         ProductId: "Saree%202",
//         Product_name: "Silk Saree 2",
//         Product_price: "$500",
//         Product_image: "/Test_saree.png",
//         Product_images: ["/Test_saree.png", "/Test_saree.png"]
//     },
//     {
//         ProductId: "Saree%203",
//         Product_name: "Silk Saree 3",
//         Product_price: "$600",
//         Product_image: "/Test_saree.png",
//         Product_images: ["/Test_saree.png", "/Test_saree.png"]
//     },
//     {
//         ProductId: "Saree%204",
//         Product_name: "Silk Saree 4",
//         Product_price: "8400",
//         Product_image: "/Test_saree.png",
//         Product_images: ["/Test_saree.png", "/Test_saree.png"]
//     },
//     {
//         ProductId: "Kurti%202",
//         Product_name: "Kurti 2",
//         Product_price: "8400",
//         Product_image: "/Test_saree.png",
//         Product_images: ["/Test_saree.png", "/Test_saree.png"]
//     },
//     {
//         ProductId: "Saree%201",
//         Product_name: "Silk Saree 1",
//         Product_price: "$400",
//         Product_image: "/Test_saree.png",
//         Product_images: ["/saree_icon.png", "/Test_saree.png", "/Test_saree.png"]
//     },
//     {
//         ProductId: "Saree%202",
//         Product_name: "Silk Saree 2",
//         Product_price: "$500",
//         Product_image: "/Test_saree.png",
//         Product_images: ["/Test_saree.png", "/Test_saree.png"]
//     },
//     {
//         ProductId: "Saree%203",
//         Product_name: "Silk Saree 3",
//         Product_price: "$600",
//         Product_image: "/Test_saree.png",
//         Product_images: ["/Test_saree.png", "/Test_saree.png"]
//     },
//     {
//         ProductId: "Saree%204",
//         Product_name: "Silk Saree 4",
//         Product_price: "8400",
//         Product_image: "/Test_saree.png",
//         Product_images: ["/Test_saree.png", "/Test_saree.png"]
//     },
//     {
//         ProductId: "Kurti%202",
//         Product_name: "Kurti 2",
//         Product_price: "8400",
//         Product_image: "/Test_saree.png",
//         Product_images: ["/Test_saree.png", "/Test_saree.png"]
//     }
// ]
export default function Trendings() {
    const [Products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await GetTrendings();
                setProducts(Array.isArray(data) ? data : []);
                console.log("Fetched products:", data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);
    return (
        <>
            <section id="hero" className="
    text-center
    px-8
    pt-[72px]
    pb-[56px]
    bg-[radial-gradient(circle_at_20%_10%,rgba(214,188,144,0.12),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(232,220,201,0.15),transparent_40%)]
bg-[#FCFAF7]
  ">
                <p className="text-[12.5px] font-semibold tracking-[0.22em] uppercase text-[var(--gold-deep)] mb-[18px]">Curated by our in-house stylists</p>
                <h1 className="font-[var(--font-display)] font-semibold text-[clamp(44px,7vw,78px)] text-[var(--wine-deep)] leading-[1.05]">Trendings</h1>
                <p className="font-[var(--font-display)] italic text-[20px] text-[var(--wine-soft)] mt-4">हाथों से बुना, दिलों से चुना</p>
                <p className="max-w-[520px] mt-[18px] mx-auto text-[var(--ink-soft)] text-[15.5px] leading-[1.6]">Handwoven by artisans, chosen by women across India — the eight pieces our customers keep coming back for, ranked by what's flying off the shelf this month.</p>
                <div className="md:flex justify-center gap-[28px] mt-[30px] text-[13.5px] font-medium text-[var(--ink-soft)] hidden">
                    <span className="flex items-center gap-[6px]"><strong>4.8★</strong> average rating</span>
                    <span className="flex items-center gap-[6px]">•</span>
                    <span className="flex items-center gap-[6px]"><strong>50,000+</strong> happy customers</span>
                    <span className="flex items-center gap-[6px]">•</span>
                    <span className="flex items-center gap-[6px]">Restocked <strong>weekly</strong></span>
                </div>
            </section>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {Products.map((product) => (
                    <div key={product.id} className="flex flex-col gap-4 border border-gray-300 rounded-lg p-4">
                        <img src={product.image1_url} alt={product.product_name} className="w-full h-auto rounded-lg" />
                        <div className="text-body-2 font-medium">{product.product_name}</div>
                        <div className="text-body-3 text-gray-500">{product.product_price}</div>
                        <Link href={`/collections/${product.product || "default"}/products/${product.id}`}>View Details
                        </Link>
                    </div>
                ))}
            </div>

        </>
    )

}