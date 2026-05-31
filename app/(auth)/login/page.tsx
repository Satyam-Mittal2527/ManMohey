"use client";

import { useState, useEffect } from "react";
import AuthForm from "../AuthPage";
const Login_Form_items = [{
    name: "email",
    type: "email",
    label: "Email"
},
{
    name: "password",
    type: "password",
    label: "Password"
}
];


export default function login() {
    const [formData, setformData] = useState({
        email: "",
        password: ""
    });
    async function handleSubmit(event) {
        event.preventDefault();
        console.log("Form submitted with data:", formData);
    }
    function handleChange(event) {
        const { name, value } = event.target;
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