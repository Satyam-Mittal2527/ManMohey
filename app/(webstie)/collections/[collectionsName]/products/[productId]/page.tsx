"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/app/(webstie)/_components/ui/button";
import { Check, Heart, Minus, Plus, ShoppingCart, Share2, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { fetchProductById, fetchProductReviews, GetCurrentUser, submitProductReview } from "@/lib/api";
import { addToCart } from "@/lib/checkout";
import { addToWishlist, isProductWishlisted, removeFromWishlist } from "@/lib/wishlist";
import RelatedProducts from "./RelatedProduct";

interface ReviewImage {
  id: string | number;
  image_url: string;
  display_order: number;
}

interface ReviewUser {
  first_name: string;
  last_name: string;
  display_name: string;
}

interface Review {
  id: string;
  product_id: number;
  user_id: string;
  rating: number;
  comment: string;
  is_verified_purchase: boolean;
  created_at: string | null;
  user: ReviewUser;
  images: ReviewImage[];
}

interface ReviewSummary {
  average_rating: number;
  total_reviews: number;
  rating_distribution: {
    "5": number;
    "4": number;
    "3": number;
    "2": number;
    "1": number;
  };
}

interface ReviewsResponse {
  reviews: Review[];
  summary: ReviewSummary;
}

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
  const [reviews, setReviews] = useState<ReviewsResponse | null>(null);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [reviewsError, setReviewsError] = useState<string | null>(null);
  const [selectedReviewImage, setSelectedReviewImage] = useState<string | null>(null);
  const [reviewForm, setReviewForm] = useState({ rating: 0, comment: "" });
  const [reviewFiles, setReviewFiles] = useState<File[]>([]);
  const [reviewPreviews, setReviewPreviews] = useState<string[]>([]);
  const [reviewFormError, setReviewFormError] = useState<string | null>(null);
  const [reviewFormSuccess, setReviewFormSuccess] = useState<string | null>(null);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [retryKey, setRetryKey] = useState(0);


  const { productId } = useParams<{
    productId: string;
  }>();
  // console.log("Product ID:", productId);
  // console.log("Collection Name:", collectionsName); 
  useEffect(() => {
    let isActive = true;
    const fetchProduct = async () => {
      setIsLoading(true);
      setLoadError(null);
      setProduct(null);
      try {
        const response = await fetchProductById(productId);

        if (!response?.product) throw new Error("Product not found");

        if (!isActive) return;
        const nextProduct = response.product;
        const nextVariants: ProductVariant[] = nextProduct.variants ?? [];
        const firstAvailableVariant = nextVariants.find((variant: ProductVariant) => (variant.stock ?? 0) > 0);

        setCurrentImageIndex(0);
        setProduct(nextProduct);
        setRelatedProducts(nextProduct.RelatedProducts || []);
        setSelectedSize(firstAvailableVariant ? firstAvailableVariant.size : nextVariants[0]?.size ?? null);
        setQuantity(1);
      } catch (error) {
        console.error("Failed to load product:", error);
        if (isActive) setLoadError("This product could not be loaded. It may have been removed or is temporarily unavailable.");
      } finally {
        if (isActive) setIsLoading(false);
      }
    }
    void fetchProduct();
    return () => { isActive = false; };
  }, [productId, retryKey]);

  useEffect(() => {
    if (!product) return;

    const checkWishlist = async () => {
      const result = await isProductWishlisted(product.id);
      if (result.success) {
        setIsLiked(result.wishlisted);
      }
    };

    checkWishlist();
  }, [product]);

  const loadReviews = async (currentProduct: Product | null = product) => {
    if (!currentProduct) return;

    setReviewsLoading(true);
    setReviewsError(null);

    try {
      const reviewProductId = currentProduct.id ?? Number(productId);
      const response = await fetchProductReviews(reviewProductId || currentProduct.slug, 1, 20);
      setReviews(response);
    } catch (error) {
      console.error("Failed to load reviews:", error);
      setReviewsError("Unable to load reviews right now.");
      setReviews(null);
    } finally {
      setReviewsLoading(false);
    }
  };

  useEffect(() => {
    if (!product) return;
    void loadReviews(product);
  }, [product]);

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      const data = await GetCurrentUser();
      if (!isMounted) return;
      setIsAuthenticated(Boolean(data?.user));
    };

    void checkAuth();
    return () => {
      isMounted = false;
    };
  }, []);


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
        selectedVariant?.id ?? undefined
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

  const handleWishlistToggle = async () => {
    if (!product) return;

    if (isLiked) {
      const result = await removeFromWishlist(product.id);
      if (result.success) {
        setIsLiked(false);
        return;
      }

      if (result.status === 401) {
        window.dispatchEvent(new CustomEvent("open-auth-modal"));
        return;
      }

      alert(result.message || "Unable to update wishlist.");
      return;
    }

    const result = await addToWishlist(product.id);
    if (result.success) {
      setIsLiked(true);
      return;
    }

    if (result.status === 401) {
      window.dispatchEvent(new CustomEvent("open-auth-modal"));
      return;
    }

    alert(result.message || "Unable to add item to wishlist.");
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

  if (isLoading) {

    return (
      <div className="mx-auto max-w-7xl animate-pulse px-4 py-12" aria-busy="true" aria-live="polite">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="aspect-square rounded-2xl bg-slate-200" />
          <div className="space-y-5 py-4"><div className="h-8 w-3/4 rounded bg-slate-200" /><div className="h-6 w-1/3 rounded bg-slate-200" /><div className="h-24 rounded bg-slate-200" /><div className="h-12 rounded bg-slate-200" /></div>
        </div>
        <span className="sr-only">Loading product details...</span>
      </div>
    );

  }

  if (loadError || !selectedProduct) {
    return (
      <main className="flex min-h-[50vh] items-center justify-center px-4 py-16">
        <div className="max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center" role="alert">
          <h1 className="text-2xl font-semibold text-slate-900">Product unavailable</h1>
          <p className="mt-3 text-slate-600">{loadError || "We couldn't find this product."}</p>
          <button type="button" onClick={() => setRetryKey((value) => value + 1)} className="mt-6 rounded-lg bg-slate-900 px-5 py-3 text-white hover:bg-slate-700">Try again</button>
          <Link href="/collections" className="ml-3 inline-block text-sm font-medium text-pink-600 hover:underline">Browse collections</Link>
        </div>
      </main>
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

  const formatReviewDate = (value: string | null) => {
    if (!value) return "";

    try {
      const date = new Date(value);
      return new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }).format(date);
    } catch {
      return value;
    }
  };

  const renderStars = (rating: number, sizeClass = "h-4 w-4") => (
    <div className="flex items-center gap-1 text-amber-500">
      {Array.from({ length: 5 }, (_, index) => (
        <span key={`${rating}-${index}`} className={sizeClass} aria-label={`${rating} out of 5 stars`}>
          {index < rating ? "★" : "☆"}
        </span>
      ))}
    </div>
  );

  const maxBarValue = Math.max(
    ...Object.values(reviews?.summary?.rating_distribution ?? { "5": 0, "4": 0, "3": 0, "2": 0, "1": 0 }),
    1,
  );

  const buildReviewSummary = (reviewItems: Review[]): ReviewSummary => {
    const distribution = { "5": 0, "4": 0, "3": 0, "2": 0, "1": 0 };
    let totalScore = 0;

    reviewItems.forEach((review) => {
      const key = String(review.rating) as keyof typeof distribution;
      distribution[key] += 1;
      totalScore += review.rating;
    });

    const totalReviews = reviewItems.length;

    return {
      average_rating: totalReviews ? totalScore / totalReviews : 0,
      total_reviews: totalReviews,
      rating_distribution: distribution,
    };
  };

  const handleReviewPhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files ?? []);
    if (selectedFiles.length === 0) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    const validFiles: File[] = [];
    const nextPreviews: string[] = [];

    for (const file of selectedFiles) {
      if (!allowedTypes.includes(file.type)) {
        setReviewFormError("Only JPG, PNG, and WebP images are allowed.");
        continue;
      }
      if (file.size > 5 * 1024 * 1024) {
        setReviewFormError("Each review image must be 5 MB or smaller.");
        continue;
      }
      if (reviewFiles.length + validFiles.length >= 5) {
        setReviewFormError("You can upload up to 5 images per review.");
        break;
      }
      validFiles.push(file);
      nextPreviews.push(URL.createObjectURL(file));
    }

    if (validFiles.length > 0) {
      setReviewFiles((current) => [...current, ...validFiles]);
      setReviewPreviews((current) => [...current, ...nextPreviews]);
      setReviewFormError(null);
    }

    event.target.value = "";
  };

  const removeReviewPhoto = (index: number) => {
    setReviewFiles((current) => current.filter((_, fileIndex) => fileIndex !== index));
    setReviewPreviews((current) => current.filter((_, fileIndex) => fileIndex !== index));
  };

  const handleReviewSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!product) return;

    if (!isAuthenticated) {
      window.dispatchEvent(new CustomEvent("open-auth-modal"));
      return;
    }

    const trimmedComment = reviewForm.comment.trim();
    if (!reviewForm.rating) {
      setReviewFormError("Please select a star rating before submitting your review.");
      setReviewFormSuccess(null);
      return;
    }

    if (!trimmedComment) {
      setReviewFormError("Please write a review before submitting.");
      setReviewFormSuccess(null);
      return;
    }

    if (trimmedComment.length > 2000) {
      setReviewFormError("Your review must be 2000 characters or fewer.");
      setReviewFormSuccess(null);
      return;
    }

    setIsSubmittingReview(true);
    setReviewFormError(null);
    setReviewFormSuccess(null);

    try {
      const formData = new FormData();
      formData.append("rating", String(reviewForm.rating));
      formData.append("comment", trimmedComment);
      reviewFiles.forEach((file) => formData.append("images", file));

      const response = await submitProductReview(product.id, formData);

      if (!response.ok) {
        if (response.status === 401) {
          window.dispatchEvent(new CustomEvent("open-auth-modal"));
          setReviewFormError("Please sign in to submit a review.");
          return;
        }

        const detail = response.data?.detail || response.data?.message || "Unable to submit your review.";
        setReviewFormError(detail);
        return;
      }

      setReviewForm({ rating: 0, comment: "" });
      setReviewFiles([]);
      setReviewPreviews([]);
      setIsReviewFormOpen(false);
      setReviewFormSuccess("Thanks! Your review has been added.");
      await loadReviews(product);
    } catch (error) {
      console.error("Failed to submit review:", error);
      setReviewFormError("Something went wrong while submitting your review. Please try again.");
    } finally {
      setIsSubmittingReview(false);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* <ProductBreadcrumb /> */}

      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        <div className="space-y-4">
          <div className="w-full max-w-[500px] mx-auto flex flex-col items-center px-4">
            <div className="rounded-xl shadow-lg overflow-hidden mb-4 w-full relative">
              {images.length > 0 ? <Image
                src={images[currentImageIndex] ?? "/placeholder.png"}
                alt={selectedProduct.name}
                width={600}
                height={600}
                className="w-full h-auto object-cover rounded-xl"
              /> : <div className="flex aspect-square items-center justify-center bg-slate-100 text-sm text-slate-500">No product images available</div>}

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
            <div className="flex items-center gap-1 text-amber-500">
              {reviews?.summary ? renderStars(Math.round(reviews.summary.average_rating), "h-4 w-4") : null}
            </div>
            <span className="text-sm text-muted-foreground">
              {reviews?.summary
                ? `(${reviews.summary.average_rating.toFixed(1)}) • ${reviews.summary.total_reviews} reviews`
                : "Product reviews"}
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
                    <span className="text-sm text-orange-600">
                        Only {displayedStock} left
                      </span>
                    {/* {displayedStock <= 5 && (
                      <span className="text-sm text-orange-600">
                        Only {displayedStock} left
                      </span>
                    )} */}
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
                onClick={handleWishlistToggle}
                className={isLiked ? "text-pink-600" : "text-slate-700"}
              >
                <Heart className="mr-2 h-4 w-4" fill={isLiked ? "currentColor" : "none"} />
                {isLiked ? "Saved to Wishlist" : "Add to Wishlist"}
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
      <section className="mt-16 border-t border-slate-200 pt-10">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-bold text-slate-900">Customer Reviews</h2>
            <Button
              type="button"
              onClick={() => {
                if (!isAuthenticated) {
                  window.dispatchEvent(new CustomEvent("open-auth-modal"));
                  return;
                }
                setIsReviewFormOpen((current) => !current);
              }}
            >
              {isReviewFormOpen ? "Close Form" : "Write a Review"}
            </Button>
          </div>

          {isReviewFormOpen && (
            <form onSubmit={handleReviewSubmit} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-lg font-semibold text-slate-900">Write a review</p>
                  <p className="text-sm text-slate-500">Share your experience with this product.</p>
                </div>

                <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewForm((current) => ({ ...current, rating: star }))}
                      className="text-2xl transition hover:scale-110"
                      aria-label={`Rate ${star} out of 5`}
                    >
                      <span className={star <= reviewForm.rating ? "text-amber-500" : "text-slate-300"}>★</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <textarea
                  value={reviewForm.comment}
                  onChange={(event) => setReviewForm((current) => ({ ...current, comment: event.target.value }))}
                  placeholder="Tell other shoppers what you liked or disliked..."
                  rows={4}
                  maxLength={2000}
                  className="w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                />
                <div className="mt-1 text-right text-xs text-slate-500">{reviewForm.comment.length}/2000</div>
              </div>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-slate-300 bg-white px-3 py-2 text-sm text-slate-600 transition hover:border-slate-400 hover:text-slate-800">
                  <span className="font-medium">Add photos</span>
                  <input type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={handleReviewPhotoChange} className="hidden" />
                </label>

                {reviewPreviews.length > 0 && (
                  <div className="flex flex-wrap gap-3">
                    {reviewPreviews.map((preview, index) => (
                      <div key={`${preview}-${index}`} className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-2">
                        <Image src={preview} alt={`Review upload ${index + 1}`} width={96} height={96} className="h-24 w-24 object-cover rounded-lg" />
                        <button
                          type="button"
                          onClick={() => removeReviewPhoto(index)}
                          className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-xs text-white shadow"
                          aria-label={`Remove photo ${index + 1}`}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {(reviewFormError || reviewFormSuccess) && (
                <div className={`mt-3 rounded-xl px-3 py-2 text-sm ${reviewFormError ? "border border-rose-200 bg-rose-50 text-rose-700" : "border border-emerald-200 bg-emerald-50 text-emerald-700"}`}>
                  {reviewFormError || reviewFormSuccess}
                </div>
              )}

              <div className="mt-4 flex justify-end">
                <Button type="submit" disabled={isSubmittingReview} className="min-w-36">
                  {isSubmittingReview ? "Submitting Review..." : "Submit Review"}
                </Button>
              </div>
            </form>
          )}

          {reviewsLoading ? (
            <div className="space-y-4 animate-pulse" aria-live="polite" aria-busy="true">
              <div className="h-8 w-40 rounded bg-slate-200" />
              <div className="h-4 w-56 rounded bg-slate-200" />
              <div className="grid gap-4 lg:grid-cols-[220px_1fr]">
                <div className="h-40 rounded-2xl bg-slate-200" />
                <div className="space-y-4">
                  <div className="h-24 rounded-2xl bg-slate-200" />
                  <div className="h-24 rounded-2xl bg-slate-200" />
                </div>
              </div>
            </div>
          ) : reviewsError ? (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              {reviewsError}
            </div>
          ) : !reviews || reviews.reviews.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center">
              <p className="text-lg font-semibold text-slate-900">No reviews yet</p>
              <p className="mt-2 text-sm text-slate-600">Be the first to review this product.</p>
            </div>
          ) : (
            <>
              <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-bold text-slate-900">
                      {reviews.summary.average_rating.toFixed(1)}
                    </span>
                    <span className="pb-1 text-sm text-slate-500">out of 5</span>
                  </div>
                  <div className="mt-3 flex items-center gap-1 text-lg text-amber-500">
                    {renderStars(Math.round(reviews.summary.average_rating), "h-5 w-5")}
                  </div>
                  <p className="mt-3 text-sm text-slate-600">
                    Based on {reviews.summary.total_reviews} review{reviews.summary.total_reviews === 1 ? "" : "s"}
                  </p>

                  <div className="mt-5 space-y-2">
                    {[5, 4, 3, 2, 1].map((star) => {
                      const count = reviews.summary.rating_distribution[String(star) as keyof typeof reviews.summary.rating_distribution] ?? 0;
                      const width = `${(count / maxBarValue) * 100}%`;

                      return (
                        <div key={star} className="flex items-center gap-2 text-sm text-slate-600">
                          <span className="w-6 font-medium text-slate-700">{star}</span>
                          <span className="text-amber-500">★</span>
                          <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-slate-200">
                            <div
                              className="h-full rounded-full bg-amber-500"
                              style={{ width }}
                            />
                          </div>
                          <span className="w-6 text-right text-slate-500">{count}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-5">
                  {reviews.reviews.map((review) => (
                    <article key={review.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                      <div className="flex items-center gap-1 text-base text-amber-500">
                        {renderStars(review.rating, "h-4 w-4")}
                      </div>

                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <span className="text-base font-semibold text-slate-900">
                          {review.user.display_name || "Customer"}
                        </span>
                        {review.is_verified_purchase && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700">
                            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-600 text-[10px] text-white">
                              ✓
                            </span>
                            Verified Purchase
                          </span>
                        )}
                      </div>

                      <p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-700">
                        {review.comment}
                      </p>

                      {review.images.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-3">
                          {review.images.map((image) => (
                            <button
                              key={image.id ?? `${review.id}-${image.image_url}`}
                              type="button"
                              onClick={() => setSelectedReviewImage(image.image_url)}
                              className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50 transition hover:border-slate-400"
                              aria-label={`Review photo for ${selectedProduct.name}`}
                            >
                              <Image
                                src={image.image_url}
                                alt={`Review photo for ${selectedProduct.name}`}
                                width={120}
                                height={120}
                                className="h-24 w-24 object-cover sm:h-28 sm:w-28"
                              />
                            </button>
                          ))}
                        </div>
                      )}

                      <p className="mt-4 text-xs uppercase tracking-wide text-slate-500">
                        {formatReviewDate(review.created_at)}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {selectedReviewImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4"
          onClick={() => setSelectedReviewImage(null)}
        >
          <div className="relative max-h-[90vh] max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              onClick={() => setSelectedReviewImage(null)}
              className="absolute right-3 top-3 z-10 rounded-full bg-slate-900/80 px-2.5 py-1 text-xs font-medium text-white hover:bg-slate-900"
              aria-label="Close review image"
            >
              Close
            </button>
            <Image
              src={selectedReviewImage}
              alt={`Review photo for ${selectedProduct.name}`}
              width={1200}
              height={1200}
              className="max-h-[90vh] w-auto object-contain"
            />
          </div>
        </div>
      )}

      <span className="text-lg font-bold">Related Products</span>
      {relatedProducts.length > 0 ? <RelatedProducts productList={relatedProducts} /> : <p className="mt-4 text-sm text-slate-500">No related products available right now.</p>}
    </div>
  );
}
