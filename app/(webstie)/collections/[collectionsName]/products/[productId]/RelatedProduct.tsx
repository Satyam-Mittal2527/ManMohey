import Link from "next/link";

interface Products {
    ProductId: string;
    Product_name: string;
    Product_image: string;
    Product_price: string;
    Product_images: String[]
}

interface CollectionProductProps {
    productList: Products[];
}
export default function RelatedProducts({
    productList,

}: CollectionProductProps) {
    return (
        <div className="flex flex-row gap-2 flex-1 wrap">
            {productList.map((product) => (
                <div key={product.Product_name} className="flex flex-col gap-4 border border-gray-300 rounded-lg p-4">
                    <img src={product.Product_image} alt={product.Product_name} className="w-full h-auto rounded-lg" />
                    <div className="text-body-2 font-medium">{product.Product_name}</div>
                    <div className="text-body-3 text-gray-500">{product.Product_price}</div>
                    <Link href={`/collections/${product.Product_name}/products/${product.ProductId}`}>View Details
                    </Link>
                </div>
            ))}
        </div>
    );
}