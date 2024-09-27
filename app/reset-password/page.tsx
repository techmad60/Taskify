"use client"
import { FaEye, FaEyeSlash } from "react-icons/fa"; 
import { useState } from "react";
import Logo from "@/components/Logo";
import { poppinsFont } from "@/fonts/fonts";

export default function ResetPassword() {

    const [showPassword, setShowPassword] = useState(false);

    // Function to toggle password visibility
    const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    };

    return (
        <div className={`${poppinsFont.className} flex flex-col justify-center items-center font-light text-sm text-color-one`}>
            <Logo 
            src="/images/dark-logo.svg" 
            alt="dark-logo" 
            logoText="Taskify" 
            textColor="text-color-two" 
            />
            <form  className={`flex flex-col justify-center shadow-[0px_4px_4px_rgba(0,0,0,0.25)] px-12 rounded-[10px] w-72 bg-white mt-8`}>
                <label className="pt-6 pb-1">Email</label>
                    <input 
                    type="email" 
                    name="email" 
                    required 
                    autoFocus 
                    className="rounded-[10px] border p-2" 
                    // Update email state
                    />
                <label className="pt-6 pb-1">Input new password</label>
                <div className="relative">
                    <input 
                        type={showPassword ? "text" : "password"} 
                        name="password" 
                        required 
                        className="rounded-[10px] border p-2 w-full" 
                        
                    // Update password state
                    />
                    <button 
                        type="button" 
                        onClick={togglePasswordVisibility} 
                        className="absolute inset-y-0 right-3 flex items-center text-primary-color"
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>

                <button type="submit" className={`flex justify-center self-center text-sm bg-primary-color duration-300 hover:bg-secondary-color my-6 py-2 px-3 rounded-sm outline outline-offset-2 outline-1 outline-blue-400`}>Reset Password</button>
            </form>
        </div>
    )
}