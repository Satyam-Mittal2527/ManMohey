"use client"
import CollectionHeader from "./[collectionsName]/Collection_header";
import CollectionProducts from "./[collectionsName]/Product_grid";
import Filter_bar from "./[collectionsName]/FilterBar";
import MobileFilterDrawer from "./[collectionsName]/MobileFilterDrawer";
import product from "./[collectionsName]/products/page";
import { fetchProducts } from "@/lib/api";
import { useState, useEffect } from "react";
import { get } from "http";
import { useParams } from "next/navigation";

interface Products {
    id: string
    product_name: string
    product_price: string
    image1_url: string
    product_images: string[]
}

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
    collections: [
        { name: "Sarees" },
        { name: "Kurtis" },
        { name: "Lehengas" },
        { name: "Unstitched" },
    ],
};

const products_grid = {
    sarees: Array.from({ length: 16 }, (_, index) => ({
        product: "sarees",
        name: `Saree ${index + 1}`,
        image: "/Test_saree.png",
        price: "₹999",
    })),

    kurtis: Array.from({ length: 16 }, (_, index) => ({
        product: "kurtis",
        name: `Kurti ${index + 1}`,
        image: "/Test_saree.png",
        price: "₹799",
    })),

    lehengas: Array.from({ length: 16 }, (_, index) => ({
        product: "Lehenga",
        name: `Lehenga ${index + 1}`,
        image: "/Test_saree.png",
        price: "₹1999",
    })),

    unstich: Array.from({ length: 16 }, (_, index) => ({
        product: "Unstiched",
        name: `Unstitched ${index + 1}`,
        image: "/Test_saree.png",
        price: "₹499",
    })),

    bridal: Array.from({ length: 16 }, (_, index) => ({
        product: "Bridal",
        name: `Bridal ${index + 1}`,
        image: "/Test_saree.png",
        price: "₹499",
    })),
    beauty: Array.from({ length: 16 }, (_, index) => ({
        product: "Bridal",
        name: `Beauty ${index + 1}`,
        image: "/Test_saree.png",
        price: "₹499",
    })),
    lingerie: Array.from({ length: 16 }, (_, index) => ({
        product: "Bridal",
        name: `Linegerie ${index + 1}`,
        image: "/Test_saree.png",
        price: "₹499",
    })),
    collections: Array.from({ length: 16 }, (_, index) => ({
        product: "Bridal",
        name: `Collection ${index + 1}`,
        image: "/Test_saree.png",
        price: "₹499",
    })),
    
};
export default function Collection(){

    const collectionName = "collections";

    const params = useParams();

    const [products, setProducts] = useState<Products[]>([]);
    
    const categories = headerLists[collectionName as keyof typeof headerLists];


    useEffect(() => {
        const getProducts = async () => {
            try {
                const data = await fetchProducts(collectionName);
                console.log("Fetched products:", data);
                setProducts(Array.isArray(data)? data : []);
            } catch (error) {
                console.error("Error fetching the products:", error);
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
                        {products && (
                            <CollectionProducts ProductsList={products} CollectionName = {collectionName}/>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}
