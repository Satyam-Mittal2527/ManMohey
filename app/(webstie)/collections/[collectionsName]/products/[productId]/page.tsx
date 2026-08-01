"use client";


import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/app/(webstie)/_components/ui/button";
import { Check, Heart, Minus, Plus, ShoppingCart, Share2, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { fetchProductById } from "@/lib/api";
import {addToCart} from "@/lib/checkout";
import RelatedProducts from "./RelatedProduct";

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
// const Products = [
//   {
//     id: "Saree%201",
//     product_name: "Silk Saree 1",
//     product_price: "$400",
//     product_image: "/Test_saree.png",
//     product_images: ["/saree_icon.png", "/Test_Lehenga.png", "/Test_saree.png"]
//   },
//   {
//     id: "Saree%202",
//     product_name: "Silk Saree 2",
//     product_price: "$500",
//     product_image: "/Test_saree.png",
//     product    _images: ["/Test_Lehenga.png", "/Test_saree.png"]
//   },
//   {
//     ProductId: "Saree%203",
//     Product_name: "Silk Saree 3",
//     Product_price: "$600",
//     Product_image: "/Test_saree.png",
//     Product_images: ["/bridal_icon.png", "/Test_saree.png"]
//   },
//   {
//     ProductId: "Saree%204",
//     Product_name: "Silk Saree 4",
//     Product_price: "8400",
//     Product_image: "/Test_saree.png",
//     Product_images: ["/Test_kurti.png", "/Test_saree.png"]
//   },
//   {
//     ProductId: "Kurti%202",
//     Product_name: "Kurti 2",
//     Product_price: "8400",
//     Product_image: "/Test_saree.png",
//     Product_images: ["/Test_kurti.png", "/Test_saree.png"]
//   }
// ]
export default function Product() {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [selectedSize, setSelectedSize] = useState("M");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [Products, setProducts] = useState<Product[]>([]);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);


  const { productId, collectionsName } = useParams<{
    productId: string;
    collectionsName: string;
  }>();
  console.log("Product ID:", productId);
  console.log("Collection Name:", collectionsName); 
  useEffect(() => {
    const fetchProduct = async () => {
      const data = await fetchProductById(productId, collectionsName);
      console.log(data);
      if (data) {
        setCurrentImageIndex(0);
        setProducts([data]);
        setRelatedProducts(data.RelatedProducts || []); // Reset the image index when the product changes
      }
    }
    fetchProduct();
  }, [productId]);

  console.log(productId);
const handleAddToCart = async () => {
  console.log(productId, quantity);
  try {
    setIsAdding(true);
    const response = await addToCart(productId, quantity, selectedSize)
    console.log("Cart Updated:", response);
    // const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cart/items`, {
    //   method: "POST",
    //   credentials: "include", // sends auth cookies
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     product_id: productId,
    //     quantity: quantity,
    //   }),
    // });

    // if (!response.ok) {
    //   throw new Error("Failed to add item to cart");
    // }

    // const data = await response.json();

    // console.log("Cart Updated:", data);

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

  const handleQuantityChange = (type: "increment" | "decrement") => {
    if (type === "increment") {
      setQuantity((prev) => prev + 1);
    } else if (type === "decrement" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };
  const selectedProduct = Products[0];
  
  if (!selectedProduct) {
    return <div>Product not found</div>;
  }
  const images = [
    selectedProduct.image1_url,
    selectedProduct.image2_url,
    selectedProduct.image3_url,
  ].filter(Boolean);
  
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* <ProductBreadcrumb /> */}

      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        <div className="space-y-4">
          <div className="w-full max-w-[500px] mx-auto flex flex-col items-center px-4">
            <div className="rounded-xl shadow-lg overflow-hidden mb-4 w-full relative">
              <Image
                src={images[currentImageIndex] ?? "/placeholder.png"}
                alt={selectedProduct.product_name}
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
            {selectedProduct.product_name}
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
              {selectedProduct.product_price}
            </span>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's Body Type sheets.
            It has survived not only many decades, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised thanks to these sheets and more recently with desktop publishing software including versions of Lorem Ipsum.
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
              <span className="block mb-2 font-medium">Size</span>
              <div className="flex flex-wrap items-center gap-2">
                {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1 border rounded-md text-sm font-medium ${selectedSize === size
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <Button
                size="lg"
                // className={cn(
                //   "flex-1 transition-all duration-300",
                //   justAdded
                //     ? "bg-green-600 text-white hover:bg-green-600"
                //     : "bg-primary text-primary-foreground hover:bg-primary/90"
                // )}
                onClick={handleAddToCart}
                disabled={isAdding}
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
              // className={cn(
              //   "text-muted-foreground hover:text-foreground",
              //   isLiked && "text-destructive"
              // )
              // }
              >
                <Heart
                // className={cn("h-4 w-4 mr-2", isLiked && "fill-current")}
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
