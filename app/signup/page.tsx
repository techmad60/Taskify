"use client"
import { useState } from "react";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import the icons
import { poppinsFont } from "@/fonts/fonts";
import Logo from "@/components/Logo";
import HorizontalLine from "@/components/HorizontalLine";
import GoogleButton from "@/components/GoogleButton";
import FormButton from "@/components/FormButton";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  
  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

 

  return (
    <div className={`${poppinsFont.className} flex flex-col justify-center items-center font-light  bg-white text-sm text-color-one`}>
      <Logo 
        src="/images/dark-logo.svg" 
        alt="dark-logo" 
        logoText="Taskify" 
        textColor="text-color-two" 
       />
      <form className={`flex flex-col justify-center shadow-[0px_4px_4px_rgba(0,0,0,0.25)] px-12 rounded-[10px] w-72`}>
        
        <label className="pt-6 pb-1">Name</label>
        <input type="text" name="name" required autoFocus className="rounded-[10px] border  py-2 px-4" />
        
        <label className="pt-6 pb-1">Email</label>
        <input type="email" name="email" required className=" rounded-[10px] border py-2 px-4" />
        
        {/* Password Field */}
        <label className="pt-6 pb-1">Password</label>
        <div className="relative">
          <input 
            type={showPassword ? "text" : "password"} 
            name="password" 
            required 
            className=" rounded-[10px] border py-2 px-4 w-full"
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
            className=" rounded-[10px] border py-2 px-4 w-full"
          />
          
        </div>

       <FormButton ButtonText="Sign up"/>
      </form>
      <HorizontalLine />
      <GoogleButton text="Sign up" />
      <p className="mt-8">Already have an account? 
        <Link href = "/login">
           <span className="text-secondary-color duration-300 hover:text-primary-color cursor-pointer"> Login</span>
        </Link>
        
      </p>
    </div>
  );
}
