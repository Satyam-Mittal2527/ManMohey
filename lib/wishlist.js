const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "";

export async function getWishlist() {
  try {
    const response = await fetch(`${baseUrl}/api/wishlist`, {
      method: "GET",
      credentials: "include",
    });

    if (response.status === 401) {
      return { success: false, error: "unauthorized", items: [] };
    }

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    return {
      success: true,
      items: Array.isArray(data?.data) ? data.data : [],
    };
  } catch (error) {
    console.error("getWishlist error:", error);
    return { success: false, error: "failed", items: [] };
  }
}

export async function addToWishlist(productId) {
  try {
    const response = await fetch(`${baseUrl}/api/wishlist`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product_id: Number(productId) }),
    });

    const data = await response.json().catch(() => ({}));

    if (response.status === 401) {
      return { success: false, status: 401, message: data?.detail || "Please log in to save items." };
    }

    if (!response.ok) {
      return { success: false, status: response.status, message: data?.detail || "Unable to add item to wishlist." };
    }

    return { success: true, status: response.status, data: data?.data ?? data };
  } catch (error) {
    console.error("addToWishlist error:", error);
    return { success: false, status: 500, message: "Network error while saving item." };
  }
}

export async function removeFromWishlist(productId) {
  try {
    const response = await fetch(`${baseUrl}/api/wishlist/${productId}`, {
      method: "DELETE",
      credentials: "include",
    });

    const data = await response.json().catch(() => ({}));

    if (response.status === 401) {
      return { success: false, status: 401, message: data?.detail || "Please log in to manage your wishlist." };
    }

    if (!response.ok) {
      return { success: false, status: response.status, message: data?.detail || "Unable to remove item from wishlist." };
    }

    return { success: true, status: response.status, data: data?.data ?? data };
  } catch (error) {
    console.error("removeFromWishlist error:", error);
    return { success: false, status: 500, message: "Network error while removing item." };
  }
}

export async function isProductWishlisted(productId) {
  try {
    const response = await fetch(`${baseUrl}/api/wishlist/check/${productId}`, {
      method: "GET",
      credentials: "include",
    });

    if (response.status === 401) {
      return { success: false, wishlisted: false, status: 401 };
    }

    if (!response.ok) {
      return { success: false, wishlisted: false, status: response.status };
    }

    const data = await response.json();
    return { success: true, wishlisted: !!data?.data?.wishlisted, status: response.status };
  } catch (error) {
    console.error("isProductWishlisted error:", error);
    return { success: false, wishlisted: false, status: 500 };
  }
}
