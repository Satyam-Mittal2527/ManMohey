const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL ??
  "";
console.log("API baseUrl:", baseUrl)

export async function SubscribeToNewsletter(email) {
    try {
        const response = await fetch(`${baseUrl}/api/newsletter/subscribe`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });

        const data = await response.json().catch(() => null);
        return { ok: response.ok, status: response.status, data };
    } catch {
        return {
            ok: false,
            status: 0,
            data: { detail: "We couldn’t connect to the newsletter service. Please try again." },
        };
    }
}

export async function Get_Home_page_Hero() {
    try {
        const response = await fetch(
            `${baseUrl}/api/Home/PageHero`
        );

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        return await response.json();
    }
    catch (error) {
        console.error("Error fetching home page hero data:", error);
        return null;
    }
}

export async function Register_User(user) {
    try {
        const response = await fetch(`${baseUrl}/api/User/register`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify(user)
        });
        console.log(response);
        if (response) {
            const data = await response.json();
            console.log("User registration response:", data);
            return data;
        }
    }
    catch (error) {
        console.error("Error registering user:", error);
        return null;
    }
}

export async function SendOtp(payload) {
    console.log(payload);

    const response = await fetch(`${baseUrl}/api/User/send-otp`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(payload.value)
    });

    let data = null;
    try {
        data = await response.json();
    } catch {
        try {
            const text = await response.text();
            data = text ? { message: text } : null;
        } catch {
            data = null;
        }
    }

    return { ok: response.ok, status: response.status, statusText: response.statusText, data };
}

export async function VerifyOtp(payload) {

   
    console.log("VERIFY OTP CALLED");

    const response = await fetch(`${baseUrl}/api/User/verify-otp`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(payload)
    });

    const data = await response.json().catch(() => null);
    return { ok: response.ok, status: response.status, data };
}

export async function GetCurrentUser() {
    try {
        const response = await fetch(`${baseUrl}/api/User/me`, {
            method: "GET",
            credentials: "include",
        });

        if (!response.ok) return { user: null };
        return await response.json();
    } catch (e) {
        console.error("GetCurrentUser error", e);
        return { user: null };
    }
}

export async function Logout() {
    try {
        const response = await fetch(`${baseUrl}/api/User/logout`, {
            method: "POST",
            credentials: "include",
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return await response.json();
    } catch (e) {
        console.error("Logout error", e);
        return null;
    }
}

export async function ChangePassword(payload) {
  try {
    const response = await fetch(`${baseUrl}/api/User/change-password`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    const data = await response.json().catch(() => null)
    return { ok: response.ok, status: response.status, data }
  } catch (error) {
    console.error("ChangePassword error:", error)
    return { ok: false, status: 500, data: { detail: "Network error" } }
  }
}

export async function ResetPassword(payload) {
  try {
    const headers = {
      "Content-Type": "application/json",
    }
    if (payload.access_token) {
      headers.Authorization = `Bearer ${payload.access_token}`
    }

    const response = await fetch(`${baseUrl}/api/User/reset-password`, {
      method: "POST",
      credentials: "include",
      headers,
      body: JSON.stringify(payload),
    })

    const data = await response.json().catch(() => null)
    return { ok: response.ok, status: response.status, data }
  } catch (error) {
    console.error("ResetPassword error:", error)
    return { ok: false, status: 500, data: { detail: "Network error" } }
  }
}

export async function GetNewArrivals() {
    try {
        const response = await fetch(`${baseUrl}/api/NewArrivals`, {
            method: "GET",
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        return Array.isArray(data) ? data : data?.products ?? null;
    } catch (error) {
        console.error("Error fetching new arrivals:", error);
        return null;
    }
}

export async function get_homePage_newArrivals(){
    try {
        const data = await GetNewArrivals();
        if (!Array.isArray(data)) return null;
        return data.slice(0, 4);
    } catch (error) {
        console.error("Error fetching home page new arrivals:", error);
        return null;
    }
}

export async function GetTrendings() {
    try {
        const response = await fetch(`${baseUrl}/api/Trendings`, {
            method: "GET",
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        return Array.isArray(data) ? data : data?.products ?? null;
    } catch (error) {
        console.error("Error fetching new arrivals:", error);
        return null;
    }
}

export async function get_homePage_trendings(){
    try {
        const data = await GetTrendings();
        if (!Array.isArray(data)) return null;
        return data.slice(0, 4);
    } catch (error) {
        console.error("Error fetching home page trendings:", error);
        return null;
    }
}

export async function GetBestSellers() {
    try {
        const response = await fetch(`${baseUrl}/api/BestSellers`, {
            method: "GET",
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        return Array.isArray(data) ? data : data?.products ?? null;
    } catch (error) {
        console.error("Error fetching best sellers:", error);
        return null;
    }
}

export async function get_homePage_bestSellers(){
    try {
        const data = await GetBestSellers();
        if (!Array.isArray(data)) return null;
        return data.slice(0, 4);
    } catch (error) {
        console.error("Error fetching home page best sellers:", error);
        return null;
    }
}

export async function fetchCollectionPage(collectionName, filters = {}) {
    try {
        const params = new URLSearchParams();

        if (filters.category) {
            params.set("category", String(filters.category));
        }

        Object.entries(filters).forEach(([key, value]) => {
            if (key === "category" || value === undefined || value === null || value === "") {
                return;
            }

            if (Array.isArray(value)) {
                const serialized = value.filter(Boolean).join(",");
                if (serialized) {
                    params.set(key, serialized);
                }
                return;
            }

            params.set(key, String(value));
        });

        const queryString = params.toString();
        const url = queryString
            ? `${baseUrl}/api/Products/${encodeURIComponent(collectionName)}?${queryString}`
            : `${baseUrl}/api/Products/${encodeURIComponent(collectionName)}`;

        const response = await fetch(url, {
            method: "GET",
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error("Failed to fetch collection");
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching collection:", error);
        return null;
    }
}

export async function searchProducts(searchTerm, page = 1, limit = 20) {
    const params = new URLSearchParams({
        q: searchTerm,
        page: String(page),
        limit: String(limit),
    });
    const response = await fetch(
        `${baseUrl}/api/Products/search?${params.toString()}`,
        { credentials: "include" }
    );

    if (!response.ok) throw new Error("Failed to search products");

    return await response.json();
}

export async function fetchProductById(productSlug) {

    const response = await fetch(
        `${baseUrl}/api/Products/product/${productSlug}`,
        {
            credentials: "include"
        }
    );

    return response.json();

}

export async function fetchProductReviews(productIdentifier, page = 1, limit = 10) {
    const value = String(productIdentifier).trim();
    const isNumericProductId = /^\d+$/.test(value);
    const endpoint = isNumericProductId
        ? `${baseUrl}/api/Products/${encodeURIComponent(value)}/reviews?page=${page}&limit=${limit}`
        : `${baseUrl}/api/Products/product/${encodeURIComponent(value)}/reviews?page=${page}&limit=${limit}`;

    const response = await fetch(endpoint, {
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch product reviews");
    }

    return response.json();
}

export async function fetchShopCollection(collectionSlug, page = 1, limit = 20) {
    const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
    });

    const response = await fetch(
        `${baseUrl}/api/Collections/${encodeURIComponent(collectionSlug)}?${params.toString()}`,
        {
            credentials: "include",
        }
    );

    if (!response.ok) {

        throw new Error("Failed to fetch collection");

    }

    return await response.json();

}