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
    featured: boolean;
    active: boolean;

    category_id: number;

    categories: Category;

    product_images: ProductImage[];
}

interface CollectionProductsProps {
    ProductsList: Product[];
    CollectionName: string;
}

export default function CollectionProducts({
    ProductsList,
    CollectionName,
}: CollectionProductsProps) {
    return (
        <>
            <div className="mb-6">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-slate-900">
                    {CollectionName.toUpperCase()}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    Explore curated items from the {CollectionName} collection.
                </p>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                {ProductsList.map((product) => {

                    const coverImage =
                        product.product_images.find(
                            (img) => img.display_order === 1
                        ) || product.product_images[0];

                    return (
                        <div
                            key={product.id}
                            className="flex flex-col rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-lg"
                        >

                            <img
                                src={coverImage?.public_url || "/placeholder.png"}
                                alt={product.name}
                                className="aspect-[3/4] w-full rounded-lg object-cover"
                            />

                            <h3 className="mt-4 text-lg font-semibold">
                                {product.name}
                            </h3>

                            <div className="mt-2">

                                {product.sale_price ? (

                                    <div className="flex items-center gap-2">

                                        <span className="text-lg font-bold text-pink-600">
                                            ₹{product.sale_price}
                                        </span>

                                        <span className="text-sm text-gray-400 line-through">
                                            ₹{product.price}
                                        </span>

                                    </div>

                                ) : (

                                    <span className="text-lg font-semibold">
                                        ₹{product.price}
                                    </span>

                                )}

                            </div>

                            <Link
                                href={`/collections/${product.categories.slug}/products/${product.slug}`}
                                className="mt-4 text-sm font-medium text-pink-600 hover:underline"
                            >
                                View Details
                            </Link>

                        </div>
                    );
                })}
            </div>
        </>
    );
}