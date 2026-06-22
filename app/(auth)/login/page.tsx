// "use client";

// import { useState, useEffect } from "react";
// import AuthForm from "../AuthPage";
// import { SendOtp, VerifyOtp } from "@/lib/api";


// export default function login() {
//     const [Login_Form_items, setLogin_Form_items] = useState([{
//         name: "email",
//         type: "email",
//         label: "Email"
//     },]);
//     const [formData, setformData] = useState({
//         email: "",
//         otp: ""
//     });

//     const [isOtpSent, setIsOtpSent] = useState(false);
//     const [cooldownEnd, setCooldownEnd] = useState<number | null>(null);
//     const [remaining, setRemaining] = useState<number>(0);
//     const [isSending, setIsSending] = useState(false);

//     async function handleSubmit(
//         event: React.FormEvent<HTMLFormElement>
//     ) {
//         event.preventDefault();
//         console.log("Form submitted with data:", formData);
//         if (!isOtpSent) {
//             setIsSending(true);
//             const response = await SendOtp({ value: formData.email });
//             setIsSending(false);
//             console.log("OTP sent response:", response);

//             if (response && response.ok) {
//                 // set OTP form
//                 setformData({ email: formData.email, otp: "" });
//                 setLogin_Form_items([{ name: "otp", type: "text", label: "OTP" }]);
//                 setIsOtpSent(true);

//                 // start cooldown (Supabase default 3600s)
//                 const ttl = 3600; // seconds
//                 const end = Date.now() + ttl * 1000;
//                 const key = `MM_otp_cooldown`;
//                 try { localStorage.setItem(key, JSON.stringify({ email: formData.email, end })); } catch (e) {}
//                 setCooldownEnd(end);
//                 setRemaining(ttl);
//             } else {
//                 const msg = response?.data?.detail || response?.data?.message || response?.statusText || "Failed to send OTP";
//                 alert(msg);
//             }
//         } else {
//             // Handle OTP verification here
//             let response = await VerifyOtp({
//                 email: formData.email,
//                 token: formData.otp
//             });

//             console.log("OTP verification response:", response);
//             if(response.ok){
//                 alert("Login successful!");
//                 window.location.href = "/";
//             }
//         }

//     }
//     function handleChange(
//         event: React.ChangeEvent<HTMLInputElement>
//     ) {
//         const name = event.target.name;
//         const value = event.target.value;

//         setformData((currentFields) => ({
//             ...currentFields,
//             [name]: value,
//         }));
//     }

//     // cooldown timer effect
//     useEffect(() => {
//         let interval: any = null;
//         const key = `MM_otp_cooldown`;

//         // on mount, try to load any existing cooldown object
//         try {
//             const stored = localStorage.getItem(key);
//             if (stored) {
//                 const obj = JSON.parse(stored);
//                 const end = Number(obj?.end);
//                 const email = obj?.email || "";
//                 if (!isNaN(end) && end > Date.now()) {
//                     setCooldownEnd(end);
//                     setIsOtpSent(true);
//                     // prefill email if empty
//                     if (!formData.email) setformData((s) => ({ ...s, email }));
//                 }
//             }
//         } catch (e) {}

//         if (cooldownEnd && cooldownEnd > Date.now()) {
//             interval = setInterval(() => {
//                 const diff = Math.max(0, Math.ceil((cooldownEnd - Date.now()) / 1000));
//                 setRemaining(diff);
//                 if (diff <= 0) {
//                     clearInterval(interval);
//                     setCooldownEnd(null);
//                     try { localStorage.removeItem(key); } catch (e) {}
//                 }
//             }, 1000);
//         }

//         return () => { if (interval) clearInterval(interval); };
//     }, [cooldownEnd, formData.email]);

//     const handleResend = async () => {
//         // only allow if no cooldown or expired
//         if (cooldownEnd && cooldownEnd > Date.now()) return;
//         setIsSending(true);
//         const response = await SendOtp({ value: formData.email });
//         setIsSending(false);
//         if (response && response.ok) {
//             const ttl = 3600;
//             const end = Date.now() + ttl * 1000;
//             const key = `MM_otp_cooldown`;
//             try { localStorage.setItem(key, JSON.stringify({ email: formData.email, end })); } catch (e) {}
//             setCooldownEnd(end);
//             setRemaining(ttl);
//         } else {
//             const msg = response?.data?.detail || response?.data?.message || response?.statusText || "Failed to resend OTP";
//             alert(msg);
//         }
//     };
//     return (
//         <div className="flex flex-col gap-6 text-center">
//             <AuthForm
//                 fields={Login_Form_items}
//                 handleSubmit={handleSubmit}
//                 formData={formData}
//                 handleChange={handleChange}
//                 SubmitButtonText="Login"
//             />
//             {isOtpSent && (
//                 <div className="max-w-md mx-auto mt-4 text-left">
//                     <div className="mb-2 font-medium">Resend OTP</div>
//                     <div className="w-full bg-gray-200 rounded h-3 overflow-hidden mb-2">
//                         <div
//                             className="bg-blue-600 h-3 transition-all"
//                             style={{ width: `${(100 - Math.max(0, ((remaining / 3600) * 100))).toFixed(2)}%` }}
//                         />
//                     </div>
//                     <div className="flex items-center gap-3">
//                         <button
//                             type="button"
//                             onClick={handleResend}
//                             disabled={!!(cooldownEnd && cooldownEnd > Date.now()) || isSending}
//                             className={`px-3 py-1 rounded ${ (cooldownEnd && cooldownEnd > Date.now()) || isSending ? 'bg-gray-300 text-gray-600' : 'bg-blue-600 text-white'}`}
//                         >
//                             {isSending ? 'Sending...' : (cooldownEnd && cooldownEnd > Date.now() ? `Resend available in ${Math.floor(remaining/60)}:${String(remaining%60).padStart(2,'0')}` : 'Resend OTP')}
//                         </button>
//                         <div className="text-sm text-gray-600">If you didn't receive the OTP, you can resend after the cooldown.</div>
//                     </div>
//                 </div>
//             )}
       
//             <span className="text-body-3">
//                 New to the ManMohey? Click here to register
//                 <a href='/register' className='text-blue-600 font-sm'> Register</a>
//             </span>
//         </div>
//     );
// }