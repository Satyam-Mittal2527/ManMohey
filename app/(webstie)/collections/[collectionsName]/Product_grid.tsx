import Link from "next/link";
import product from "./products/page";

interface Products {
    product: string;
    name: string;
    image: string;
    price: string;
}

interface CollectionProductsrProps {
    ProductsList: Products[];
    CollectionName: String

}

export default function CollectionProducts({
    ProductsList,
    CollectionName
}: CollectionProductsrProps) {
    return (
        <>
            <div className="mb-6">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-slate-900">{CollectionName.toUpperCase()}</h2>
                <p className="text-sm text-slate-500 mt-1">Explore curated items from the {CollectionName} collection.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

                {ProductsList.map((product) => (
                    <div key={product.name} className="flex flex-col gap-4 border border-gray-300 rounded-lg p-4">
                        <img src={product.image} alt={product.name} className="w-full h-auto rounded-lg" />
                        <div className="text-body-2 font-medium">{product.name}</div>
                        <div className="text-body-3 text-gray-500">{product.price}</div>
                        <Link href={`/collections/${product.product}/products/${product.name}`}>View Details
                        </Link>
                    </div>
                ))}
            </div>

        </>

    );
}