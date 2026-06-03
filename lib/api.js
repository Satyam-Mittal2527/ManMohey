const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function Get_Home_page_Hero() {
    try {
        console.log(baseUrl);
        const response = await fetch(`${baseUrl}/api/Home/PageHero`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
        });
        console.log(response);
        if (response) {
            const data = await response.json();
            console.log("Home page hero data:", data);
            return data;
        }
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
        body: JSON.stringify(payload.value)
    });

    console.log(response);
    return response;
}

export async function VerifyOtp(payload) {

   
    console.log("VERIFY OTP CALLED");

    const response = await fetch(`${baseUrl}/api/User/verify-otp`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    return response;
}