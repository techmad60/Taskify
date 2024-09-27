"use client";
import { useState } from "react";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import the icons
import { useRouter } from 'next/navigation'; // Import useRouter for redirection
import { poppinsFont } from "@/fonts/fonts";
import Logo from "@/components/Logo";
// import HorizontalLine from "@/components/HorizontalLine";
// import GoogleButton from "@/components/GoogleButton";
import FormButton from "@/components/FormButton";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState(""); // State for name input
  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input
  const [repeatPassword, setRepeatPassword] = useState(""); // State for repeat password
  const [emailError, setEmailError] = useState(""); // State to store email errors
  const [passwordError, setPasswordError] = useState(""); // State to store password errors
  const [repeatPasswordError, setRepeatPasswordError] = useState(""); // State to store repeat password errors
  const router = useRouter(); // Initialize useRouter

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Basic email and password validation functions
  const validateEmail = (email:string) => {
    const gmailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return gmailPattern.test(email);
  };

  const validatePassword = (password:string) => {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/; // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 symbol
    return passwordPattern.test(password);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission
    let hasError = false;

    // Reset error states
    setEmailError("");
    setPasswordError("");
    setRepeatPasswordError("");

    // Validate email
    if (!validateEmail(email)) {
      setEmailError("Please provide a valid Gmail address.");
      hasError = true;
    }

    // Validate password
    if (!validatePassword(password)) {
      setPasswordError("Password must be at least 8 characters, with an uppercase, lowercase, a number, and a symbol.");
      hasError = true;
    }

    // Validate repeat password
    if (password !== repeatPassword) {
      setRepeatPasswordError("Passwords do not match.");
      hasError = true;
    }

    if (hasError) {
      return;
    }

    try {
      const response = await fetch(`https://taskify-backend-nq1q.onrender.com/api/signup/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }), // Send name, email, and password
      });

      if (!response.ok) {
        const data = await response.json();
        setEmailError(data.message); // Display error message from the server (if any)
        return;
      }

      const data = await response.json();
      console.log(data.message); // Handle successful signup
      router.push(`/redirect`); // Redirect to the redirect page
    } catch (error) {
      setEmailError("Signup failed. Please try again.");
    }
  };

  return (
    <div className={`${poppinsFont.className} flex flex-col justify-center items-center font-light bg-white text-sm text-color-one`}>
      <Logo 
        src="/images/dark-logo.svg" 
        alt="dark-logo" 
        logoText="Taskify" 
        textColor="text-color-two" 
      />
      <form onSubmit={handleSubmit} className={`flex flex-col justify-center shadow-[0px_4px_4px_rgba(0,0,0,0.25)] px-12 rounded-[10px] w-72`}>
        
        {/* Name Field */}
        <label className="pt-6 pb-1">Name</label>
        <input 
          type="text" 
          name="name" 
          required 
          autoFocus 
          value={name} // Controlled input
          onChange={(e) => setName(e.target.value)} // Update state
          className="rounded-[10px] border py-2 px-4" 
        />
        
        {/* Email Field */}
        <label className="pt-6 pb-1">Email</label>
        <input 
          type="email" 
          name="email" 
          required 
          value={email} // Controlled input
          onChange={(e) => setEmail(e.target.value)} // Update state
          className="rounded-[10px] border py-2 px-4" 
        />
        {emailError && <p className="text-red-500 text-xs font-extralight mt-2">{emailError}</p>} {/* Display email error */}
        
        {/* Password Field */}
        <label className="pt-6 pb-1">Password</label>
        <div className="relative">
          <input 
            type={showPassword ? "text" : "password"} 
            name="password" 
            required 
            value={password} // Controlled input
            onChange={(e) => setPassword(e.target.value)} // Update state
            className="rounded-[10px] border py-2 px-4 w-full"
          />
          <button 
            type="button" 
            onClick={togglePasswordVisibility} 
            className="absolute inset-y-0 right-3 flex items-center text-primary-color"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {passwordError && <p className="text-red-500 text-xs font-extralight mt-2">{passwordError}</p>} {/* Display password error */}
        
        {/* Repeat Password Field */}
        <label className="pt-6 pb-1">Repeat password</label>
        <div className="relative">
          <input 
            type="password"
            name="repeatpassword" 
            required 
            value={repeatPassword} // Controlled input
            onChange={(e) => setRepeatPassword(e.target.value)} // Update state
            className="rounded-[10px] border py-2 px-4 w-full"
          />
        </div>
        {repeatPasswordError && <p className="text-red-500 text-xs font-extralight mt-2">{repeatPasswordError}</p>} {/* Display repeat password error */}

        <FormButton ButtonText="Sign up" />
      </form>
      {/* <HorizontalLine />
      <GoogleButton text="Sign up" /> */}
      <p className="mt-8">Already have an account? 
        <Link href="/login">
           <span className="text-secondary-color duration-300 hover:text-primary-color cursor-pointer"> Login</span>
        </Link>
      </p>
    </div>
  );
}
