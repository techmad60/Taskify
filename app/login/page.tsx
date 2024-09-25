"use client"
import { useState } from "react";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import the icons
import Logo from "@/components/Logo";
import HorizontalLine from "@/components/HorizontalLine";
import GoogleButton from "@/components/GoogleButton";
import { poppinsFont } from "@/fonts/fonts";

export default function LoginPage() {
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
        textColor="text-color-one" 
       />
      <form className={`flex flex-col justify-center shadow-[0px_4px_4px_rgba(0,0,0,0.25)] px-12 rounded-[10px] w-72 bg-white`}>
        
        
        <label className="pt-6 pb-1">Email</label>
        <input type="email" name="email" required autoFocus className="rounded-[10px] border p-2" />
        
        {/* Password Field */}
        <label className="pt-6 pb-1">Password</label>
        <div className="relative">
          <input 
            type={showPassword ? "text" : "password"} 
            name="password" 
            required 
            className="rounded-[10px] border p-2 w-full" 
          />
          <button 
            type="button" 
            onClick={togglePasswordVisibility} 
            className="absolute inset-y-0 right-3 flex items-center text-primary-color"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        
        <Link href="/welcome" type="submit" className="flex justify-center self-center text-sm bg-primary-color duration-300 hover:bg-secondary-color my-6 py-2 px-3 rounded-sm">
          Login
        </Link>
      </form>
      <HorizontalLine />
      <GoogleButton text="Sign up" />
      <p className="mt-8">Don&apos;t have an account? 
        <Link href = "/signup">
           <span className="text-secondary-color cursor-pointer duration-300 hover:text-primary-color"> Sign up</span>
        </Link>
        
      </p>
    </div>
  );
}
