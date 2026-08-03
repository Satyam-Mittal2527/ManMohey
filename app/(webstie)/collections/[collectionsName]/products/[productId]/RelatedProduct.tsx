import Link from "next/link";

interface ProductImage {
    id: number;
    image_url: string;
    public_url: string;
    display_order: number;
}

interface Category {
    id: number;
    name: string;
    slug: string;
}

interface Product {
    id: number;

    name: string;

    slug: string;

    price: number;

    sale_price: number | null;

    categories?: Category;

    product_images: ProductImage[];
}

interface RelatedProductsProps {
    productList: Product[];
}

export default function RelatedProducts({
    productList,
}: RelatedProductsProps) {
    return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {productList.map((product) => {

                const image =
                    product.product_images
                        ?.sort((a, b) => a.display_order - b.display_order)[0]
                        ?.public_url;

                return (
                    <div
                        key={product.id}
                        className="flex flex-col gap-4 rounded-3xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md"
                    >
                        {image ? (
                            <div className="relative h-56 w-full overflow-hidden rounded-2xl bg-gray-100">
                                <img
                                    src={image}
                                    alt={product.name}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        ) : (
                            <div className="flex h-56 w-full items-center justify-center rounded-2xl bg-gray-100 text-sm text-gray-500">
                                No image
                            </div>
                        )}

                        <div className="text-base font-semibold text-gray-900">
                            {product.name}
                        </div>

                        <div className="flex items-center gap-2">

                            {product.sale_price ? (
                                <>
                                    <span className="text-lg font-bold text-black">
                                        ₹{product.sale_price}
                                    </span>

                                    <span className="text-sm text-gray-400 line-through">
                                        ₹{product.price}
                                    </span>
                                </>
                            ) : (
                                <span className="text-lg font-bold text-black">
                                    ₹{product.price}
                                </span>
                            )}

                        </div>

                        <Link
                            href={`/collections/${product.categories?.slug}/products/${product.slug}`}
                            className="text-sm font-medium text-primary hover:text-primary/80"
                        >
                            View Details
                        </Link>
                    </div>
                );
            })}
        </div>
    );
}