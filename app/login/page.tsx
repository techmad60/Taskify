"use client";
import { useState } from "react";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import the icons
import Logo from "@/components/Logo";
import HorizontalLine from "@/components/HorizontalLine";
import { useRouter } from 'next/navigation'; // Import useRouter for redirection
import GoogleButton from "@/components/GoogleButton";
import { poppinsFont } from "@/fonts/fonts";
import FormButton from "@/components/FormButton";


export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter(); // Initialize useRouter

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }
      router.push('/welcome'); // Redirect to the welcome page
      // Handle successful login (e.g., save token, redirect, etc.)
      console.log("Login successful:", data.token);
      // You can save the token in local storage or a global state management tool here.
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message); // Now `err` is safely typed as an Error
    } else {
        setError("An unknown error occurred.");
    }
    }
  };

  return (
    <div className={`${poppinsFont.className} flex flex-col justify-center items-center font-light text-sm text-color-one`}>
      <Logo 
        src="/images/dark-logo.svg" 
        alt="dark-logo" 
        logoText="Taskify" 
        textColor="text-color-two" 
       />
      <form onSubmit={handleSubmit} className={`flex flex-col justify-center shadow-[0px_4px_4px_rgba(0,0,0,0.25)] px-12 rounded-[10px] w-72 bg-white`}>
        
        <label className="pt-6 pb-1">Email</label>
        <input 
          type="email" 
          name="email" 
          required 
          autoFocus 
          className="rounded-[10px] border p-2" 
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Update email state
        />
        
        {/* Password Field */}
        <label className="pt-6 pb-1">Password</label>
        <div className="relative">
          <input 
            type={showPassword ? "text" : "password"} 
            name="password" 
            required 
            className="rounded-[10px] border p-2 w-full" 
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state
          />
          <button 
            type="button" 
            onClick={togglePasswordVisibility} 
            className="absolute inset-y-0 right-3 flex items-center text-primary-color"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>} {/* Display error message if any */}
        <FormButton ButtonText="Login"/>
      </form>
      <HorizontalLine />
      <GoogleButton text="Sign up" />
      <p className="mt-8">Don&apos;t have an account? 
        <Link href="/signup">
           <span className="text-secondary-color cursor-pointer duration-300 hover:text-primary-color"> Sign up</span>
        </Link>
      </p>
    </div>
  );
}
