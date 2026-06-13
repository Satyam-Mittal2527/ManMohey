import Collection_header from "./Collection_header";
import CollectionProducts from "./Product_grid";
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
    ]
};

const products_grid = {
    sarees: Array.from({ length: 16 }, (_, index) => ({
        product : "sarees",
        name: `Saree ${index + 1}`,
        image: "/Test_saree.png",
        price: "₹999",
    })),

    kurtis: Array.from({ length: 16 }, (_, index) => ({
        product : "kurtis",
        name: `Kurti ${index + 1}`,
        image: "/Test_saree.png",
        price: "₹799",
    })),

    lehengas: Array.from({ length: 16 }, (_, index) => ({
        product : "Lehenga",
        name: `Lehenga ${index + 1}`,
        image: "/Test_saree.png",
        price: "₹1999",
    })),

    unstich: Array.from({ length: 16 }, (_, index) => ({
        product : "Unstiched",
        name: `Unstitched ${index + 1}`,
        image: "/Test_saree.png",
        price: "₹499",
    })),

    bridal:  Array.from({ length: 16 }, (_, index) => ({
        product : "Bridal",
        name: `Bridal ${index + 1}`,
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
    const headerList =headerLists[collectionName as keyof typeof headerLists];
    return (
        <>
            <div className="flex flex-col gap-4 w-full">
                <div>
                    {headerList && (
                        <Collection_header HeaderList={headerList} />
                    )}
                </div>
                {products && (
                    <CollectionProducts ProductsList={products} />
                )}
            </div>
        </>
    );
}