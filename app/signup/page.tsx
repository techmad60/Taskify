"use client"
import { useState } from "react";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import the icons
import Darklogo from "@/components/Darklogo";
import HorizontalLine from "@/components/HorizontalLine";
import GoogleButton from "@/components/GoogleButton";
import { poppinsFont } from "@/fonts/fonts";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  
  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

 

  return (
    <div className={`${poppinsFont.className} flex flex-col justify-center items-center font-light  bg-color-zero text-sm text-color-one`}>
      <Darklogo />
      <form className={`flex flex-col justify-center border border-color-one px-12 rounded-[10px] w-72`}>
        
        <label className="pt-6 pb-1">Name</label>
        <input type="text" name="name" required autoFocus className="border border-color-one rounded-[10px] py-2 px-4" />
        
        <label className="pt-6 pb-1">Email</label>
        <input type="email" name="email" required className="border border-color-one rounded-[10px] py-2 px-4" />
        
        {/* Password Field */}
        <label className="pt-6 pb-1">Password</label>
        <div className="relative">
          <input 
            type={showPassword ? "text" : "password"} 
            name="password" 
            required 
            className="border border-color-one rounded-[10px] py-2 px-4 w-full"
          />
          <button 
            type="button" 
            onClick={togglePasswordVisibility} 
            className="absolute inset-y-0 right-3 flex items-center text-primary-color"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        
        {/* Repeat Password Field */}
        <label className="pt-6 pb-1">Repeat password</label>
        <div className="relative">
          <input 
            type="password"
            name="repeatpassword" 
            required 
            className="border border-color-one rounded-[10px] py-2 px-4 w-full"
          />
          
        </div>

        <button type="submit" className="flex justify-center self-center text-sm bg-secondary-color duration-300 hover:bg-primary-color my-6 py-2 px-3 rounded-sm">
          Sign up
        </button>
      </form>
      <HorizontalLine />
      <GoogleButton text="Sign up" />
      <p className="mt-8">Already have an account? 
        <Link href = "/login">
           <span className="bg-secondary-color duration-300 hover:bg-primary-color cursor-pointer"> Login</span>
        </Link>
        
      </p>
    </div>
  );
}
