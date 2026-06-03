"use client";

import { useState, useEffect } from "react";
import AuthForm from "../AuthPage";
import { SendOtp, VerifyOtp } from "@/lib/api";


export default function login() {
    const [Login_Form_items, setLogin_Form_items] = useState([{
        name: "email",
        type: "email",
        label: "Email"
    },]);
    const [formData, setformData] = useState({
        email: "",
        otp: ""
    });

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
            if(response.ok){
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
    return (
        <div className="flex flex-col gap-6 text-center">
            <AuthForm
                fields={Login_Form_items}
                handleSubmit={handleSubmit}
                formData={formData}
                handleChange={handleChange}
                SubmitButtonText="Login"
            />
            <span className="text-body-3">
                New to the ManMohey? Click here to register
                <a href='/register' className='text-blue-600 font-sm'> Register</a>
            </span>
        </div>
    );
}