"use client"

import React, { useState, useEffect, use } from "react"
// import NavBar from "../(webstie)/_components/NavBar"
import { Search } from "lucide-react";
import Link from "next/link";
import { Button } from "../(webstie)/_components/ui/button";
import AuthForm from "../(auth)/AuthPage";
import { SendOtp, VerifyOtp, Register_User } from "@/lib/api";

const categories = [
  {
    name: "Sarees",
    href: "/collections/sarees",
    image: "/saree_icon.png",
    description: "Timeless elegance in every drape",
  },
  {
    name: "Kurtis",
    href: "/collections/kurtis",
    image: "/kurti_icon.png",
    description: "Comfort meets style",
  },
  {
    name: "Lehengas",
    href: "/collections/lehengas",
    image: "/lehenga_icon.png",
    description: "Celebrate in grace and beauty",
  },
  {
    name: "Unstitch",
    href: "/collections/unstich",
    image: "/saree_icon.png",
    description: "Perfect everyday elegance",
  },
  {
    name: "Bridal",
    href: "/collections/bridal",
    image: "/bridal_icon.png",
    description: "Modern meets traditional",
  },
  {
    name: "Beauty",
    href: "/collections/beauty",
    image: "/beauty_icon.png",
    description: "Modern meets traditional",
  },
  {
    name: "Lingerie",
    href: "/collections/lingerie",
    image: "/lingerie_icon.png",
    description: "Modern meets traditional",
  },
];
export default function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const [profilePageClick, setProfilePageClick] = useState(false)
  const [isSignedIn, setIsSignedIn] = useState(false)
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

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    console.log("Form submitted with data:", formData);
    if (!isOtpSent) {
      let response = await SendOtp({
        value: formData.email
      });
      console.log("OTP sent response:", response);

      setformData({
        email: formData.email,
        otp: ""
      })
      setLogin_Form_items([{
        name: "otp",
        type: "text",
        label: "OTP"
      }])

      setIsOtpSent(true);
    } else {
      // Handle OTP verification here
      let response = await VerifyOtp({
        email: formData.email,
        token: formData.otp
      });

      console.log("OTP verification response:", response);
      if (response.ok) {
        alert("Login successful!");
        window.location.href = "/";
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
  return (
    <div className="flex flex-col">
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="mx-auto flex w-full items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 text-slate-900 flex-col">
            <a href="/">
              <img src="/Logo.png" alt="ManMohey logo" className="h-12 w-auto" />
            </a>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-700">
            <div className="flex flex-row gap-8 justify-center-safe">
              {categories.map((category) => (
                <div key={category.name} className="relative group">
                  <Link
                    href={category.href}
                    className="flex flex-col items-center transition delay-100 duration-200 ease-in-out hover:-translate-y-1 hover:bg-slate-200"
                  >
                    {category.image && (
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-17 h-20 items-center"
                      />
                    )}
                    <span className="text-lg font-medium text-slate-700 hover:text-slate-900">
                      {category.name}
                    </span>
                  </Link>
                </div>
              ))}
            </div>
            {/* <a href="/newArrivals" className="hover:text-slate-900">New Arrivals</a>
            <a href="/bestSellers" className="hover:text-slate-900">Best Sellers</a>
            <a href="/sale" className="hover:text-slate-900">Sale</a> */}
            {/* <button className="hover:text-slate-900" onClick={() => setIsNavBarVisible(!isNavBarVisible)}>Collections</button> */}
          </nav>
          <div className="hidden md:flex items-center bg-white rounded-full border border-gray-300 px-4 py-2 md:w-[400px]">
            <Search className="md:h-5 md:w-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search for Sarees, Kurtis, Lehengas..."
              className="ml-2 flex-1 outline-none bg-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4 text-sm text-slate-700">
            <div className="md:hidden flex items-center bg-white rounded-full border border-gray-300 p-2 w-10">
              <Search className="h-5 w-5 text-gray-500" />
            </div>
            <a href="/cart" className="flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 hover:border-slate-300 hover:text-slate-900">
              <span className="inline-flex h-5 w-5 items-center justify-center text-slate-500"><i className="bi bi-cart"></i></span>
              <span className="hidden md:flex">Cart</span>
            </a>
         
            <div className="relative">
              <Button variant="outline" onClick={() => {
                if (!isSignedIn) setShowLoginPopup(true)
                else setProfilePageClick(true)
              }}>
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full text-slate-600"><i className="bi bi-person-circle"></i></span>
                <span className="hidden md:flex">Profile</span>
              </Button>
              {profilePageClick && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-50">
                  <div className="p-3">
                    <a href="/profile" className="block px-2 py-1 hover:bg-slate-100">Profile</a>
                    <a href="/orders" className="block px-2 py-1 hover:bg-slate-100">Orders</a>
                    <button onClick={() => setProfilePageClick(false)} className="mt-2 w-full text-left px-2 py-1 text-sm text-slate-600 hover:bg-slate-100">Close</button>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="relative z-10 w-full max-w-md rounded bg-white shadow-lg">
            <div className="p-6">
              <AuthForm
                fields={registerFormItems}
                handleSubmit={handleRegisterSubmit}
                formData={registerData}
                handleChange={handleRegisterChange}
                SubmitButtonText="Register"
              />
              <div className="text-center mt-3">
                <span className="text-body-3">
                  Have Account? Sign in here&nbsp;
                  <span className="text-blue-600 font-sm" onClick={() => { setShowLoginPopup(true); setShowRegisterPopup(false); }}>Login</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}