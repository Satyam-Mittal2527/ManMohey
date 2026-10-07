"use client";

import { useState } from "react";
import AuthForm from "../AuthPage";
import { Register_User } from "@/lib/api";

function getRegistrationError(detail: unknown) {
    if (typeof detail === "string" && detail.trim()) return detail;
    if (Array.isArray(detail)) {
        const messages = detail
            .map((item) => {
                if (typeof item === "string") return item;
                if (item && typeof item === "object" && "msg" in item) {
                    return String(item.msg);
                }
                return "";
            })
            .filter(Boolean);
        if (messages.length > 0) return messages.join(" ");
    }
    return "We couldn’t create your account. Please review your details and try again.";
}

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
},
{
    name: "first_name",
    type: "text",
    label: "First Name"
},
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
];


export default function Register() {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setformData] = useState({
        email: "",
        password: "",
        confirm_password: "",
        first_name: "",
        last_name: "",
        age: "",
        phone_number: ""
    });
    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();
        setErrorMessage(null);
        if (formData.password !== formData.confirm_password) {
            setErrorMessage("Your passwords don’t match. Please check them and try again.");
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await Register_User({
                email: formData.email,
                password: formData.password,
                first_name: formData.first_name,
                last_name: formData.last_name,
                age: formData.age,
                phone_number: formData.phone_number
            });
            if (response?.ok) {
                window.location.href = "/login";
            } else {
                setErrorMessage(getRegistrationError(response?.detail));
            }
        } catch {
            setErrorMessage("We couldn’t complete your registration. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }
    function handleChange(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        const name = event.target.name as keyof typeof formData;
        const value = event.target.value;
        setErrorMessage(null);
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
                errorMessage={errorMessage}
                isSubmitting={isSubmitting}
            />
            <span className="text-body-3">
                Have Account? Sign in here
                <a href='/login' className='text-blue-600 font-medium font-bold'> Sign in</a>
            </span>
        </div>
    );
}