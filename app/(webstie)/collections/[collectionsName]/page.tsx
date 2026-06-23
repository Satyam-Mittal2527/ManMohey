import Collection_header from "./Collection_header";
import CollectionProducts from "./Product_grid";
import Filter_bar from "./FilterBar"
import MobileFilterDrawer from "./MobileFilterDrawer";
import product from "./products/page";
const headerLists = {
    sarees: [
        { name: "Casual Saree" },
        { name: "Formal Saree" },
        { name: "Party Saree" },
        { name: "Wedding Saree" },
    ],

    kurtis: [
        { name: "Casual Kurtis" },
        { name: "Formal Kurtis" },
        { name: "Party Kurtis" },
        { name: "Wedding Kurtis" },
    ],

    lehengas: [
        { name: "Casual Lehengas" },
        { name: "Formal Lehengas" },
        { name: "Party Lehengas" },
        { name: "Wedding Lehengas" },
    ],

    unstich: [
        { name: "Casual Unstitched" },
        { name: "Formal Unstitched" },
        { name: "Party Unstitched" },
        { name: "Wedding Unstitched" },
    ],
    bridal: [
        { name: "Bridal Sarees" },
        { name: "Bridal Kurtis" },
        { name: "Bridal Lehengas" },
        { name: "Bridal Unstitched" },
    ],
    beauty: [
        { name: "Beauty 1" },
        { name: "Beauty 2" },
        { name: "Beauty 3" },
        { name: "Beauty 4" },
    ],
    lingerie: [
        { name: "Linegerie 1" },
        { name: "Linegerie 2" },
        { name: "Linegerie 3" },
        { name: "Linegerie 4" },
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
    
};
export default async function Collection({
    params,
}: {
    params: Promise<{ collectionsName: string }>;
}) {
    const collectionName = (await params).collectionsName;
    const products = products_grid[collectionName as keyof typeof products_grid];
    const headerList = headerLists[collectionName as keyof typeof headerLists];
    const categories = headerLists[collectionName as keyof typeof headerLists];
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
