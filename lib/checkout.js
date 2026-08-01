import { get } from "http";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000"

export async function addToCart(productId, quantity, size) {
    console.log("From API File"+productId+""+quantity);
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cart/add`, {
            method: "POST",
            credentials: "include", 
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                product_id: productId,
                quantity: quantity,
                size : size
            }),
        });

        if (!response.ok) {
            throw new Error("Failed to add item to cart");
        }

        const data = await response.json();

    } catch (error) {
        console.error(error);
        return error
    }
}

export async function getCart() {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/cart/`,
        {
            credentials: "include",
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch cart");
    }

    return response.json();
}

export async function updateCartItem(itemId, quantity) {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/cart/${itemId}?quantity=${quantity}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            }
        );

        if (!response.ok) {
            throw new Error("Failed to update cart item");
        }

        return await response.json();
    } catch (error) {
        console.error("Error updating cart item:", error);
        throw error;
    }
}

export async function removeCartItem(itemId) {
    try {
        console.log(`Attempting to remove item ${itemId}`);
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/cart/${itemId}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            }
        );

        console.log(`Delete response status: ${response.status}`);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Delete error response: ${errorText}`);
            throw new Error(`Failed to remove cart item: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        console.log(`Delete successful: ${JSON.stringify(result)}`);
        return result;
    } catch (error) {
        console.error("Error removing cart item:", error);
        throw error;
    }
}