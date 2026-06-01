"use client";

import { useState, useEffect } from "react";
import AuthForm from "../AuthPage";
import { Register_User } from "@/lib/api";


const Login_Form_items = [{
    name: "email",
    type: "email",
    label: "Email"
},
{
    name: "password",
    type: "password",
    label: "Password"
},
{
    name: "confirm_password",
    type: "password",
    label: "Confirm Password"
}
];


export default function Register() {
    const [formData, setformData] = useState({
        email: "",
        password: "",
        confirm_password: ""
    });
    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();
        if (formData.password != formData.confirm_password) {
            alert("Passwords Doesnt match")
            return;
        }

        let response  = await Register_User({
            email: formData.email,
            password: formData.password
        });
        console.log(response);
        if(response.status == 201){
            alert("Registration Successful! Please Login.")
            window.location.href = "/login";
        }else{
            alert("Registration Failed: " + response.detail);
        }
        console.log("Form submitted with data:", formData);
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
                handleSubmit={handleSubmit}
                fields={Login_Form_items}
                formData={formData}
                handleChange={handleChange}
                SubmitButtonText="Register"
            />
            <span className="text-body-3">
                Have Account? Sign in here
                <a href='/login' className='text-blue-600 font-sm'> Sign in</a>
            </span>
        </div>
    );
}