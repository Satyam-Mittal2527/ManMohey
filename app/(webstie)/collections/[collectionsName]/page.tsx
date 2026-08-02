"use client"
import Collection_header from "./Collection_header";
import CollectionProducts from "./Product_grid";
import Filter_bar from "./FilterBar"
import MobileFilterDrawer from "./MobileFilterDrawer";
import product from "./products/page";
import { fetchProducts } from "@/lib/api";
import { useState, useEffect } from "react";
import { get } from "http";
import { useParams } from "next/navigation";


const headerLists = {
    Saree: [
        { name: "Casual Saree" },
        { name: "Formal Saree" },
        { name: "Party Saree" },
        { name: "Wedding Saree" },
    ],

    Kurti: [
        { name: "Casual Kurtis" },
        { name: "Formal Kurtis" },
        { name: "Party Kurtis" },
        { name: "Wedding Kurtis" },
    ],

    Lehenga: [
        { name: "Casual Lehengas" },
        { name: "Formal Lehengas" },
        { name: "Party Lehengas" },
        { name: "Wedding Lehengas" },
    ],

    Unstitched: [
        { name: "Casual Unstitched" },
        { name: "Formal Unstitched" },
        { name: "Party Unstitched" },
        { name: "Wedding Unstitched" },
    ],
    Bridal: [
        { name: "Bridal Sarees" },
        { name: "Bridal Kurtis" },
        { name: "Bridal Lehengas" },
        { name: "Bridal Unstitched" },
    ],
    Beauty: [
        { name: "Beauty 1" },
        { name: "Beauty 2" },
        { name: "Beauty 3" },
        { name: "Beauty 4" },
    ],
    Lingerie: [
        { name: "Lingerie 1" },
        { name: "Lingerie 2" },
        { name: "Lingerie 3" },
        { name: "Lingerie 4" },
    ],
};

interface Products {
    id: string
    product: string
    product_name: string
    product_price: string
    image1_url: string
    product_images: string[]
}

const products_grid = {
    Saree: Array.from({ length: 16 }, (_, index) => ({
        product: "Saree",
        name: `Saree ${index + 1}`,
        image: "/Test_saree.png",
        price: "₹999",
    })),

    Kurti: Array.from({ length: 16 }, (_, index) => ({
        product: "Kurti",
        name: `Kurti ${index + 1}`,
        image: "/Test_saree.png",
        price: "₹799",
    })),

    Lehenga: Array.from({ length: 16 }, (_, index) => ({
        product: "Lehenga",
        name: `Lehenga ${index + 1}`,
        image: "/Test_saree.png",
        price: "₹1999",
    })),

    Unstitched: Array.from({ length: 16 }, (_, index) => ({
        product: "Unstitched",
        name: `Unstitched ${index + 1}`,
        image: "/Test_saree.png",
        price: "₹499",
    })),

    Bridal: Array.from({ length: 16 }, (_, index) => ({
        product: "Bridal",
        name: `Bridal ${index + 1}`,
        image: "/Test_saree.png",
        price: "₹499",
    })),
    Beauty: Array.from({ length: 16 }, (_, index) => ({
        product: "Bridal",
        name: `Beauty ${index + 1}`,
        image: "/Test_saree.png",
        price: "₹499",
    })),
    Lingerie: Array.from({ length: 16 }, (_, index) => ({
        product: "Bridal",
        name: `Lingerie ${index + 1}`,
        image: "/Test_saree.png",
        price: "₹499",
    })),
    
};
export default function Collection(){
    const params = useParams();

    const collectionName = params.collectionsName as string;

    const [products, setProducts] = useState<Products[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    // const products = products_grid[collectionName as keyof typeof products_grid];
    const headerList = headerLists[collectionName as keyof typeof headerLists];
    const categories = headerLists[collectionName as keyof typeof headerLists];

    useEffect(() => {
        const getProducts = async () => {
            setIsLoading(true);
            setErrorMessage(null);
            try {
                const data = await fetchProducts(collectionName);
                console.log("Fetched products:", data);
                setProducts(Array.isArray(data)? data : []);
            } catch (error) {
                console.error("Error fetching the products:", error);
                setErrorMessage("Unable to load products right now.");
            } finally {
                setIsLoading(false);
            }
            
        }
        getProducts();
    },[])
    return (

        <div className="container mx-auto px-4">
            <div className="flex gap-8 md:items-start flex-col md:flex-row">
                <MobileFilterDrawer CategoryList={categories} />
                <Filter_bar CategoryList={categories} />
                <main className="flex-1">
                    <div className="flex flex-col gap-4 w-full">
                        {isLoading ? (
                            <div className="grid gap-8 grid-cols-[repeat(auto-fit,minmax(240px,1fr))]">
                                {Array.from({ length: 8 }).map((_, index) => (
                                    <div key={index} className="flex flex-col gap-4 rounded-lg border border-gray-200 p-4 animate-pulse">
                                        <div className="h-[360px] rounded-md bg-slate-200" />
                                        <div className="h-4 w-3/4 rounded bg-slate-200" />
                                        <div className="h-4 w-1/2 rounded bg-slate-200" />
                                        <div className="h-10 w-24 rounded bg-slate-200" />
                                    </div>
                                ))}
                            </div>
                        ) : errorMessage ? (
                            <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center text-sm text-red-700">
                                {errorMessage}
                            </div>
                        ) : (
                            <CollectionProducts ProductsList={products} CollectionName={collectionName} />
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}
