const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    "http://localhost:8000";


export async function getOrders() {
    const response = await fetch(
        `${baseUrl}/api/orders/`,
        {
            method: "GET",
            credentials: "include",
        }
    );

    if (!response.ok) {
        const result = await response.json();

        throw new Error(
            result.detail || "Failed to fetch orders"
        );
    }

    return response.json();
}


export async function getOrder(orderId) {
    const response = await fetch(
        `${baseUrl}/api/orders/${orderId}`,
        {
            method: "GET",
            credentials: "include",
        }
    );

    if (!response.ok) {
        const result = await response.json();

        throw new Error(
            result.detail || "Failed to fetch order"
        );
    }

    return response.json();
}

export async function createOrder(addressId) {
    const response = await fetch(
        `${baseUrl}/api/orders/create`,
        {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                address_id: addressId,
            }),
        }
    );

    const result = await response.json();

    if (!response.ok) {
        const errorMessage =
            Array.isArray(result.detail)
                ? JSON.stringify(result.detail)
                : result.detail ||
                  result.message ||
                  "Failed to create order";

        throw new Error(errorMessage);
    }

    return result;
}