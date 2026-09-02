"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/app/(webstie)/_components/ui/button";
import { Check, Heart, Minus, Plus, ShoppingCart, Share2, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { fetchProductById } from "@/lib/api";
import { addToCart } from "@/lib/checkout";
import RelatedProducts from "./RelatedProduct";

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

  short_description: string | null;
  description: string | null;

  price: number;
  sale_price: number | null;

  stock: number;

  featured: boolean;
  active: boolean;

  categories: Category;

  product_images: ProductImage[];

  variants: ProductVariant[];

  RelatedProducts: Product[];
}

interface ProductVariant {
  id: number;
  product_id: number;
  sku: string | null;
  size: string | null;
  color: string | null;
  stock: number | null;
  price: number | null;
}

export default function Product() {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);


  const { productId, collectionsName } = useParams<{
    productId: string;
    collectionsName: string;
  }>();
  // console.log("Product ID:", productId);
  // console.log("Collection Name:", collectionsName); 
  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetchProductById(productId);

      console.log(response);

      if (response?.product) {

        setCurrentImageIndex(0);

        setProduct(response.product);

        setRelatedProducts(response.product.RelatedProducts || []);

      }
    }
    fetchProduct();
  }, [productId]);


  useEffect(() => {
    if (!product) return;

    if (product.variants?.length > 0) {
      const firstAvailableVariant = product.variants.find(
        (variant) => (variant.stock ?? 0) > 0
      );

      if (firstAvailableVariant) {
        setSelectedSize(firstAvailableVariant.size);
      } else {
        setSelectedSize(product.variants[0]?.size ?? null);
      }
    } else {
      setSelectedSize(null);
    }

    setQuantity(1);
  }, [product]);


  console.log(productId);
  const handleAddToCart = async () => {
    console.log("Product ID:" + product?.id, quantity);
    if (!product) {
      return;
    }
    try {
      setIsAdding(true);
      const response = await addToCart(
        product.id,
        quantity,
        selectedSize,
        selectedVariant?.id ?? null
      );
      console.log("Cart Updated:", response);
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 2000);

    } catch (error) {
      console.error(error);
      alert("Unable to add item to cart.");
    } finally {
      setIsAdding(false);
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    // setTimeout(() => router.push("/cart"), 500);
  };

  const handleQuantityChange = (
    type: "increment" | "decrement"
  ) => {

    if (type === "increment") {

      setQuantity((prev) => {

        if (displayedStock <= 0) {
          return prev;
        }

        if (prev >= displayedStock) {
          return prev;
        }

        return prev + 1;
      });

    } else if (
      type === "decrement" &&
      quantity > 1
    ) {

      setQuantity((prev) => prev - 1);

    }
  };
  const selectedProduct = product;

  if (!selectedProduct) {

    return (
      <div className="flex justify-center items-center h-[60vh]">

        <div className="h-10 w-10 border-4 border-black border-t-transparent rounded-full animate-spin" />

      </div>
    );

  }
  const variants = selectedProduct.variants || [];

  const hasVariants = variants.length > 0;

  const selectedVariant = hasVariants
    ? variants.find(
      (variant) => variant.size === selectedSize
    ) || null
    : null;

  const displayedPrice = selectedVariant
    ? selectedVariant.price ?? selectedProduct.price
    : selectedProduct.sale_price ?? selectedProduct.price;

  const displayedStock = selectedVariant
    ? selectedVariant.stock ?? 0
    : selectedProduct.stock;

  const images =
    selectedProduct.product_images
      ?.sort((a, b) => a.display_order - b.display_order)
      .map((img) => img.public_url) || [];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* <ProductBreadcrumb /> */}

      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        <div className="space-y-4">
          <div className="w-full max-w-[500px] mx-auto flex flex-col items-center px-4">
            <div className="rounded-xl shadow-lg overflow-hidden mb-4 w-full relative">
              <Image
                src={images[currentImageIndex] ?? "/placeholder.png"}
                alt={selectedProduct.name}
                width={600}
                height={600}
                className="w-full h-auto object-cover rounded-xl"
              />

              {/* Left arrow */}
              <button
                type="button"
                onClick={() => {
                  const len = images.length;
                  setCurrentImageIndex((i) => (i - 1 + len) % len);
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-1 shadow hover:bg-white"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              {/* Right arrow */}
              <button
                type="button"
                onClick={() => {
                  const len = images.length;
                  setCurrentImageIndex((i) => (i + 1) % len);
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-1 shadow hover:bg-white"
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
            <div className="flex gap-3 mt-4">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="cursor-pointer border rounded-md overflow-hidden"
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <Image
                    src={image ?? "/placeholder.png"}
                    alt="Product"
                    width={80}
                    height={100}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            {selectedProduct.name}
          </h1>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1">
              {/* {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-primary text-primary" />
              ))} */}
            </div>
            <span className="text-sm text-muted-foreground">
              (4.8) • 127 reviews
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-foreground">
              ₹{Number(displayedPrice).toFixed(0)}
            </span>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            {selectedProduct.description ??
              "No description available."}
          </p>

          {/* <Separator /> */}

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Quantity
              </label>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-border rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleQuantityChange("decrement")}
                    disabled={quantity <= 1}
                    className="h-10 w-10 rounded-r-none"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 min-w-[60px] text-center font-medium">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleQuantityChange("increment")}
                    className="h-10 w-10 rounded-l-none"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">

                {displayedStock > 0 ? (
                  <>
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-green-700">
                      <span className="h-2 w-2 rounded-full bg-green-600" />
                      In Stock
                    </span>

                    {displayedStock <= 5 && (
                      <span className="text-sm text-orange-600">
                        Only {displayedStock} left
                      </span>
                    )}
                  </>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-red-600">
                    <span className="h-2 w-2 rounded-full bg-red-600" />
                    Out of Stock
                  </span>

                )}
                {selectedVariant?.sku && (
                  <p className="text-xs text-muted-foreground">
                    SKU: {selectedVariant.sku}
                  </p>
                )}
              </div>
              <div>
                <span className="block mb-2 font-medium">
                  Size
                </span>

                {hasVariants ? (
                  <div className="flex flex-wrap items-center gap-2">

                    {variants.map((variant) => {

                      const isSelected =
                        selectedSize === variant.size;

                      const isOutOfStock =
                        (variant.stock ?? 0) <= 0;

                      return (
                        <button
                          key={variant.id}
                          type="button"
                          disabled={isOutOfStock}
                          onClick={() => {
                            setSelectedSize(variant.size);
                            setQuantity(1);
                          }}
                          className={`
              relative px-4 py-2
              border rounded-md
              text-sm font-medium
              transition
              ${isSelected
                              ? "bg-black text-white border-black"
                              : isOutOfStock
                                ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                            }
            `}
                        >
                          {variant.size}

                          {isOutOfStock && (
                            <span className="ml-1 text-[10px]">
                              •
                            </span>
                          )}
                        </button>
                      );
                    })}

                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Size not applicable
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <Button
                size="lg"
                onClick={handleAddToCart}
                disabled={
                  isAdding ||
                  displayedStock <= 0 ||
                  (hasVariants && !selectedVariant)
                }
              >
                {isAdding ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Adding...
                  </div>
                ) : justAdded ? (
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    Added to Cart!
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                  </div>
                )}
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={handleBuyNow}
                className="flex-1"
              >
                Buy Now
              </Button>
            </div>

            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsLiked(!isLiked)}

              >
                <Heart

                />
                Add to Wishlist
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>
      <span className="text-lg font-bold">Related Products</span>
      <RelatedProducts productList={relatedProducts} />
    </div>
  );
}
