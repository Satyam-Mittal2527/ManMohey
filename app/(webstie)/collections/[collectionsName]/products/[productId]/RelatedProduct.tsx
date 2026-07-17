import Link from "next/link";

interface Product {
  id: number;
  product: string;
  product_name: string;
  product_price: number;
  image1_url: string;
  image2_url?: string;
  image3_url?: string;
  RelatedProducts?: Product[];
}

interface CollectionProductProps {
    productList: Product[];
}

export default function RelatedProducts(
    { productList }: CollectionProductProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {productList.map((product, idx) => {
                const name = product.product_name ?? "Product";
                const id = product.id ?? `${name}-${idx}`;
                const imageSrc = product.image1_url ?? null;

                return (
                    <div key={id} className="flex flex-col gap-4 border border-gray-200 rounded-3xl p-4 bg-white shadow-sm transition hover:shadow-md">
                        {imageSrc ? (
                            <div className="relative w-full h-56 overflow-hidden rounded-2xl bg-gray-100">
                                <img src={imageSrc} alt={name} className="w-full h-full object-cover" />
                            </div>
                        ) : (
                            <div className="w-full h-56 bg-gray-100 rounded-2xl flex items-center justify-center text-sm text-gray-500">No image</div>
                        )}
                        <div className="text-base font-semibold text-gray-900">{name}</div>
                        <div className="text-sm text-gray-500">{product.product_price ?? ""}</div>
                        <Link href={`/collections/${encodeURIComponent(product.product || "")}/products/${id}`} className="text-sm font-medium text-primary hover:text-primary/80">View Details</Link>
                    </div>
                );
            })}
        </div>
    );
}