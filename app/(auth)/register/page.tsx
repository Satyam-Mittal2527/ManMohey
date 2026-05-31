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
        confirm_password : ""
    });
    async function handleSubmit(event) {
        event.preventDefault();
        if(formData.password != formData.confirm_password){
            alert("Passwords Doesnt match")
        }else{
            alert("Sign Up Succesfull")
        }
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