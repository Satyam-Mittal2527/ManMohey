import Link from "next/link";

interface Products {
    product : string;
    name: string;
    image: string;
    price: string;
}

interface CollectionProductsrProps {
    ProductsList: Products[]; // Replace 'any[]' with the actual type if available
}

export default function CollectionProducts({
    ProductsList,
}: CollectionProductsrProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
    );
}