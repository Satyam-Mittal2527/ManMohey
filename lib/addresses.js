const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    "http://localhost:8000";


export async function getAddresses() {

    const response = await fetch(
        `${baseUrl}/api/addresses/`,
        {
            credentials: "include",
        }
    );

    if (!response.ok) {
        throw new Error(
            "Failed to fetch addresses"
        );
    }

    return response.json();
}


export async function addAddress(
    addressData
) {

    try {

        const response = await fetch(
            `${baseUrl}/api/addresses/add`,
            {
                method: "POST",
                headers: {
                    "Content-Type":
                        "application/json",
                },
                credentials: "include",
                body: JSON.stringify(
                    addressData
                ),
            }
        );

        if (!response.ok) {

            const errorText =
                await response.text();

            console.error(
                "Add address error:",
                errorText
            );

            throw new Error(
                "Failed to add address"
            );
        }

        return await response.json();

    } catch (error) {

        console.error(
            "Error adding address:",
            error
        );

        throw error;
    }
}


export async function updateAddress(
    addressId,
    addressData
) {

    try {

        const response = await fetch(
            `${baseUrl}/api/addresses/${addressId}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type":
                        "application/json",
                },
                credentials: "include",
                body: JSON.stringify(
                    addressData
                ),
            }
        );

        if (!response.ok) {

            const errorText =
                await response.text();

            console.error(
                "Update address error:",
                errorText
            );

            throw new Error(
                "Failed to update address"
            );
        }

        return await response.json();

    } catch (error) {

        console.error(
            "Error updating address:",
            error
        );

        throw error;
    }
}


export async function deleteAddress(
    addressId
) {

    try {

        const response = await fetch(
            `${baseUrl}/api/addresses/${addressId}`,
            {
                method: "DELETE",
                credentials: "include",
            }
        );

        if (!response.ok) {

            const errorText =
                await response.text();

            console.error(
                "Delete address error:",
                errorText
            );

            throw new Error(
                "Failed to delete address"
            );
        }

        return await response.json();

    } catch (error) {

        console.error(
            "Error deleting address:",
            error
        );

        throw error;
    }
}


export async function setDefaultAddress(
    addressId
) {

    try {

        const response = await fetch(
            `${baseUrl}/api/addresses/${addressId}/default`,
            {
                method: "PUT",
                credentials: "include",
            }
        );

        if (!response.ok) {

            const errorText =
                await response.text();

            console.error(
                "Set default address error:",
                errorText
            );

            throw new Error(
                "Failed to set default address"
            );
        }

        return await response.json();

    } catch (error) {

        console.error(
            "Error setting default address:",
            error
        );

        throw error;
    }
}