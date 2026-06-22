const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

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
    } catch (e) {
        try {
            const text = await response.text();
            data = text ? { message: text } : null;
        } catch (e2) {
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