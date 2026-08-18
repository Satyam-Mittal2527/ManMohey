"use client"

import React, { useState, useEffect, use } from "react"

import { Search } from "lucide-react";
import Link from "next/link";
import { Button } from "../(webstie)/_components/ui/button";
import AuthForm from "../(auth)/AuthPage";
import Profile from "../(webstie)/profile/page";
import Orders from "../(webstie)/orders/page";
import { SendOtp, VerifyOtp, Register_User, GetCurrentUser, Logout } from "@/lib/api";
const categories = [
  {
    name: "Sarees",
    href: "/collections/sarees",
    image: "/saree_icon.png",
    description: "Shop designer sarees, silk sarees, cotton sarees, bridal sarees and festive ethnic wear for women.",
  },
  {
    name: "Kurtis",
    href: "/collections/kurtis",
    image: "/kurti_icon.png",
    description: "Explore stylish women's kurtis, cotton kurtas, printed kurtis and daily wear ethnic outfits.",
  },
  {
    name: "Lehengas",
    href: "/collections/lehengas",
    image: "/lehenga_icon.png",
    description: "Discover bridal lehengas, wedding lehengas, party wear lehengas and festive designer collections.",
  },
  {
    name: "Unstitched",
    href: "/collections/unstitched",
    image: "/unstitched_icon.png",
    description: "Browse premium unstitched dress materials, salwar suits and fabric collections for custom tailoring.",
  },
  {
    name: "Party Wear",
    href: "/collections/party-wear",
    image: "/bridal_icon.png",
    description: "Shop elegant party wear dresses, festive ethnic wear and designer outfits for special occasions.",
  },
  {
    name: "Blouses",
    href: "/collections/blouses",
    image: "/blouses_icon.png",
    description: "Find ready-made blouses, designer blouse patterns, embroidered blouses and stylish saree blouses.",
  },
  {
    name: "Winter Collections",
    href: "/collections/winter-collection",
    image: "/winter_icon.png",
    description: "Stay warm with elegant shawls, stoles, woolen ethnic wear and winter fashion essentials for women.",
    dropdown: true,
  },
];

const winterItems = [
  {
    name: "Shawl / Stole",
    href: "/collections/shawl",
    image: "/shawl_icon.png",
  },
  {
    name: "Woolen",
    href: "/collections/woolen",
    image: "/wollen_icon.png",
  },
];

export default function Header() {

  const [searchTerm, setSearchTerm] = useState("");
  const [profilePageClick, setProfilePageClick] = useState(false)
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState<any | null>(null)
  const [showLoginPopup, setShowLoginPopup] = useState(false)
  const [showRegisterPopup, setShowRegisterPopup] = useState(false)
  const [Login_Form_items, setLogin_Form_items] = useState([{
    name: "email",
    type: "email",
    label: "Email"
  },]);
  const [registerFormItems, setRegisterFormItems] = useState([
    { name: "email", type: "email", label: "Email" },
    { name: "password", type: "password", label: "Password" },
    { name: "confirm_password", type: "password", label: "Confirm Password" },
    { name: "first_name", type: "text", label: "First Name" },
    {
      name: "last_name",
      type: "text",
      label: "Last Name"
    },
    {
      name: "age",
      type: "number",
      label: "Age"
    },
    {
      name: "phone_number",
      type: "tel",
      label: "Phone Number"
    }
  ])
  const [formData, setformData] = useState({
    email: "",
    otp: ""
  });

  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    confirm_password: "",
  })

  const [isOtpSent, setIsOtpSent] = useState(false);
  const [cooldownEnd, setCooldownEnd] = useState<number | null>(null);
  const [remaining, setRemaining] = useState<number>(0);
  const [isSending, setIsSending] = useState(false);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    console.log("Form submitted with data:", formData);
    if (!isOtpSent) {
      const response = await SendOtp({ value: formData.email });
      console.log("OTP sent response:", response);

      if (response && response.ok) {
        setformData({ email: formData.email, otp: "" });
        setLogin_Form_items([{ name: "otp", type: "text", label: "OTP" }]);
        setIsOtpSent(true);
        // start cooldown (Supabase default 3600s)
        const ttl = 60; // seconds
        const end = Date.now() + ttl * 1000;
        const key = `MM_otp_cooldown`;
        try { localStorage.setItem(key, JSON.stringify({ email: formData.email, end })); } catch (e) { }
        setCooldownEnd(end);
        setRemaining(ttl);
      } else {
        const msg = response?.data?.detail || response?.data?.message || "Failed to send OTP";
        alert(msg);
      }
    } else {
      // Handle OTP verification here
      let response = await VerifyOtp({
        email: formData.email,
        token: formData.otp
      });

      console.log("OTP verification response:", response);
      if (response.ok) {
        // use returned user directly when available (works even if cookies aren't accepted)
        const returned = response.data || null;
        if (returned && returned.user) {
          setAndPersistUser(returned.user);
        } else {
          // fallback to /me
          const data = await GetCurrentUser();
          if (data && data.user) setAndPersistUser(data.user);
        }
        setShowLoginPopup(false);
        setProfilePageClick(true);
      }
    }

  }
  function handleChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const name = event.target.name;
    const value = event.target.value;

    setformData((currentFields) => ({
      ...currentFields,
      [name]: value,
    }));
  }

  function handleRegisterChange(event: React.ChangeEvent<HTMLInputElement>) {
    const name = event.target.name;
    const value = event.target.value;
    setRegisterData((s) => ({ ...s, [name]: value }));
  }

  async function handleRegisterSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // basic client-side validation
    if (registerData.password !== registerData.confirm_password) {
      alert("Passwords do not match");
      return;
    }
    const resp = await Register_User(registerData);
    console.log("Register response:", resp);
    if (resp && resp.ok) {
      setIsSignedIn(true);
      setShowRegisterPopup(false);
      setProfilePageClick(true);
    }
  }


  // close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowLoginPopup(false)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  // localStorage helpers (store only non-sensitive user info)
  const LOCAL_KEY = "MM_currentUser";
  const saveUser = (u: any | null) => {
    try {
      if (u) localStorage.setItem(LOCAL_KEY, JSON.stringify(u));
      else localStorage.removeItem(LOCAL_KEY);
    } catch (e) {
      console.warn("localStorage save error", e);
    }
  };
  const loadUserFromStorage = (): any | null => {
    try {
      const raw = localStorage.getItem(LOCAL_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      console.warn("localStorage load error", e);
      return null;
    }
  };

  const setAndPersistUser = (u: any | null) => {
    setCurrentUser(u);
    setIsSignedIn(!!u);
    saveUser(u);
  };

  // load current user on mount: try backend then fallback to localStorage
  useEffect(() => {
    (async () => {
      const data = await GetCurrentUser();
      if (data && data.user) {
        setAndPersistUser(data.user);
        return;
      }

      const stored = loadUserFromStorage();
      if (stored) setAndPersistUser(stored);
    })();
  }, []);

  // cooldown timer effect for header popup
  useEffect(() => {
    let interval: any = null;
    const key = `MM_otp_cooldown`;

    // on mount, try to load any existing cooldown object
    try {
      const stored = localStorage.getItem(key);
      if (stored) {
        const obj = JSON.parse(stored);
        const end = Number(obj?.end);
        const email = obj?.email || "";
        if (!isNaN(end) && end > Date.now()) {
          setCooldownEnd(end);
          setIsOtpSent(true);
          // prefill email if empty
          if (!formData.email) setformData((s) => ({ ...s, email }));
        }
      }
    } catch (e) { }

    if (cooldownEnd && cooldownEnd > Date.now()) {
      interval = setInterval(() => {
        const diff = Math.max(0, Math.ceil((cooldownEnd - Date.now()) / 1000));
        setRemaining(diff);
        if (diff <= 0) {
          clearInterval(interval);
          setCooldownEnd(null);
          try { localStorage.removeItem(key); } catch (e) { }
        }
      }, 1000);
    }

    return () => { if (interval) clearInterval(interval); };
  }, [cooldownEnd, formData.email]);

  const handleResend = async () => {
    if (cooldownEnd && cooldownEnd > Date.now()) return;
    setIsSending(true);
    const response = await SendOtp({ value: formData.email });
    setIsSending(false);
    if (response && response.ok) {
      const ttl = 3600;
      const end = Date.now() + ttl * 1000;
      const key = `MM_otp_cooldown`;
      try { localStorage.setItem(key, JSON.stringify({ email: formData.email, end })); } catch (e) { }
      setCooldownEnd(end);
      setRemaining(ttl);
    } else {
      const msg = response?.data?.detail || response?.data?.message || response?.statusText || "Failed to resend OTP";
      alert(msg);
    }
  };
  return (
    <div className="flex flex-col">
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="
  mx-auto flex w-full items-center
  gap-2
  px-3 py-3
  sm:px-4
  lg:px-5
  xl:px-6
">
          <div className="flex shrink-0 items-center">
            <a href="/">
              <img
                src="/Logo.png"
                alt="ManMohey logo"
                className="h-9 w-auto lg:h-10 xl:h-12"
              />
            </a>
          </div>

          <nav className="hidden md:flex flex-1 min-w-0 items-center text-sm font-medium text-slate-700">
            <div className="flex w-full items-center justify-center gap-1 lg:gap-2 xl:gap-4 2xl:gap-8">
              {categories.map((category) => (
                <div key={category.name} className="relative group">
                  <Link
                    href={category.href}
                    className="flex flex-col items-center transition delay-100 duration-200 ease-in-out hover:-translate-y-1 hover:bg-slate-200"
                  >
                    {category.image && (
                      <div className="
  flex items-center justify-center
  h-10 w-10
  lg:h-12 lg:w-12
  xl:h-14 xl:w-14
  2xl:h-16 2xl:w-16
">
                        <img
                          src={category.image}
                          alt={category.name}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                    )}
                    <span className="
  whitespace-nowrap
  text-xs
  lg:text-sm
  xl:text-base
  2xl:text-lg
  font-medium
  text-slate-700
  hover:text-slate-900
">
                      {category.name}
                    </span>
                  </Link>
                  {category.dropdown && (
                    <div
                      className={`
absolute
top-full
left-1/2
-translate-x-1/2
mt-4

w-80

rounded-3xl
bg-white

border border-gray-100

shadow-[0_20px_60px_rgba(0,0,0,0.12)]

opacity-0
invisible
translate-y-3

group-hover:opacity-100
group-hover:visible
group-hover:translate-y-0

transition-all
duration-300
ease-out

overflow-hidden

z-50
`}
                    >
                      {winterItems.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="flex items-center gap-4 p-4 hover:bg-gray-50"
                        >
                          <img
                            src={item.image}
                            className="w-14 h-14 rounded-lg object-cover"
                          />

                          <span className="flex-1 text-lg">
                            {item.name}
                          </span>

                          <span>
                            →
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}


                </div>
              ))}
            </div>

          </nav>
          <div className="
  hidden md:flex
  items-center
  bg-white
  rounded-full
  border border-gray-300
  px-3
  py-2
  w-[180px]
  lg:w-[240px]
  xl:w-[320px]
  2xl:w-[400px]
">
            <Search className="h-5 w-5 shrink-0 text-gray-500" />

            <input
              type="text"
              placeholder="Search for Sarees, Kurtis, Lehengas..."
              className="ml-2 min-w-0 flex-1 outline-none bg-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex shrink-0 items-center gap-2 lg:gap-3 text-sm text-slate-700">
            <div className="md:hidden flex items-center bg-white rounded-full border border-gray-300 p-2 w-10">
              <Search className="h-5 w-5 text-gray-500" />
            </div>
            <a
              href="/cart"
              className="flex shrink-0 items-center gap-2 rounded-full border border-slate-200 px-3 py-2 hover:border-slate-300 hover:text-slate-900"
            >
              <span className="inline-flex h-5 w-5 items-center justify-center text-slate-500"><i className="bi bi-cart"></i></span>
              <span className="hidden md:flex">Cart</span>
            </a>

            <div className="relative">
              <Button variant="outline" onClick={() => {
                if (!isSignedIn) setShowLoginPopup(true)
                else setProfilePageClick(true)
              }}>
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full text-slate-600"><i className="bi bi-person-circle"></i></span>
                <span className="hidden md:flex">{currentUser?.user_metadata?.display_name || currentUser?.email || 'Profile'}</span>
              </Button>
              {profilePageClick && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-50">
                  <div className="p-3">
                    <Link href="/profile">
                      <span className="block px-2 py-1 hover:bg-slate-100">Profile</span>
                    </Link>
                    <Link href="/orders">
                      <span className="block px-2 py-1 hover:bg-slate-100">Orders</span>
                    </Link>
                    <button onClick={() => setProfilePageClick(false)} className="mt-2 w-full text-left px-2 py-1 text-sm text-slate-600 hover:bg-slate-100">Close</button>
                    <button
                      onClick={async () => {
                        try {
                          await Logout();
                        } catch (e) {
                          console.warn('logout error', e);
                        }
                        setAndPersistUser(null);
                        setProfilePageClick(false);

                      }}
                      className="mt-2 w-full text-left px-2 py-1 text-sm text-red-600 hover:bg-slate-100"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {showLoginPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowLoginPopup(false)} />
          <div className="relative z-10 w-full max-w-md rounded bg-white shadow-lg">
            <div className="p-6">
              <AuthForm
                fields={Login_Form_items}
                handleSubmit={handleSubmit}
                formData={formData}
                handleChange={handleChange}
                SubmitButtonText={isOtpSent ? "Verify" : "Login"}
              />
              {isOtpSent && (
                <div className="max-w-md mx-auto mt-4 text-left">
                  <div className="mb-2 font-medium">Resend OTP</div>
                  <div className="w-full bg-gray-200 rounded h-3 overflow-hidden mb-2">
                    <div
                      className="bg-blue-600 h-3 transition-all w-[var(--progress-width)]"
                      style={{ ['--progress-width' as any]: `${(100 - Math.max(0, ((remaining / 3600) * 100))).toFixed(2)}%` }}
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={handleResend}
                      disabled={!!(cooldownEnd && cooldownEnd > Date.now()) || isSending}
                      className={`px-3 py-1 rounded ${(cooldownEnd && cooldownEnd > Date.now()) || isSending ? 'bg-gray-300 text-gray-600' : 'bg-blue-600 text-white'}`}
                    >
                      {isSending ? 'Sending...' : (cooldownEnd && cooldownEnd > Date.now() ? `Resend available in ${Math.floor(remaining / 60)}:${String(remaining % 60).padStart(2, '0')}` : 'Resend OTP')}
                    </button>
                    <div className="text-sm text-gray-600">If you didn't receive the OTP, you can resend after the cooldown.</div>
                  </div>
                </div>
              )}
              <div className="text-center mt-3">
                <span className="text-body-3">
                  New to the ManMohey?&nbsp;
                  <span className="text-blue-600 font-sm" onClick={() => setShowRegisterPopup(true)}>Register</span>

                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      {showRegisterPopup && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto"
          onClick={() => setShowRegisterPopup(false)}
        >
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/40" />

          {/* Modal positioning */}
          <div className="relative flex min-h-full items-center justify-center p-4 sm:p-6">
            <div
              className="relative w-full max-w-md rounded-xl bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="max-h-[calc(100vh-2rem)] overflow-y-auto p-6 sm:p-8">
                <AuthForm
                  fields={registerFormItems}
                  handleSubmit={handleRegisterSubmit}
                  formData={registerData}
                  handleChange={handleRegisterChange}
                  SubmitButtonText="Register"
                />

                <div className="mt-3 text-center">
                  <span className="text-body-3">
                    Have Account? Sign in here&nbsp;

                    <button
                      type="button"
                      className="text-blue-600 hover:text-blue-700 hover:underline"
                      onClick={() => {
                        setShowLoginPopup(true);
                        setShowRegisterPopup(false);
                      }}
                    >
                      Login
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}