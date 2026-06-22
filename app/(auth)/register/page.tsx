// "use client";

// import { useState, useEffect } from "react";
// import AuthForm from "../AuthPage";
// import { Register_User } from "@/lib/api";


// const Login_Form_items = [{
//     name: "email",
//     type: "email",
//     label: "Email"
// },
// {
//     name: "password",
//     type: "password",
//     label: "Password"
// },
// {
//     name: "confirm_password",
//     type: "password",
//     label: "Confirm Password"
// },
// {
//     name: "first_name",
//     type: "text",
//     label: "First Name"
// },
// {
//     name: "last_name",
//     type: "text",
//     label: "Last Name"
// },
// {
//     name: "age",
//     type: "number",
//     label: "Age"
// },
// {
//     name: "phone_number",
//     type: "tel",
//     label: "Phone Number"
// }
// ];


// export default function Register() {
//     const [formData, setformData] = useState({
//         email: "",
//         password: "",
//         confirm_password: "",
//         first_name: "",
//         last_name: "",
//         age: "",
//         phone_number: ""
//     });
//     async function handleSubmit(
//         event: React.FormEvent<HTMLFormElement>
//     ) {
//         event.preventDefault();
//         if (formData.password != formData.confirm_password) {
//             alert("Passwords Doesnt match")
//             return;
//         }

//         let response = await Register_User({
//             email: formData.email,
//             password: formData.password,
//             first_name: formData.first_name,
//             last_name: formData.last_name,
//             age: formData.age,
//             phone_number: formData.phone_number
//         });
//         console.log(response);
//         if (response.status_code == 201) {
//             alert("Registration Successful! Please Login.")
//             window.location.href = "/login";
//         } else {
//             alert("Registration Failed: " + response.detail);
//         }
//         console.log("Form submitted with data:", formData);
//     }
//     function handleChange(
//         event: React.ChangeEvent<HTMLInputElement>
//     ) {
//         const name = event.target.name as keyof typeof formData;
//         const value = event.target.value;
        
//         setformData((currentFields) => ({
//             ...currentFields,
//             [name]: value,
//         }));
//     }
//     return (
//         <div className="flex flex-col gap-6 text-center">
//             <AuthForm
//                 handleSubmit={handleSubmit}
//                 fields={Login_Form_items}
//                 formData={formData}
//                 handleChange={handleChange}
//                 SubmitButtonText="Register"
//             />
//             <span className="text-body-3">
//                 Have Account? Sign in here
//                 <a href='/login' className='text-blue-600 font-medium font-bold'> Sign in</a>
//             </span>
//         </div>
//     );
// }