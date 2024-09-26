"use client";
import { useState } from "react";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import the icons
import { useRouter } from 'next/navigation'; // Import useRouter for redirection
import { poppinsFont } from "@/fonts/fonts";
import Logo from "@/components/Logo";
import HorizontalLine from "@/components/HorizontalLine";
import GoogleButton from "@/components/GoogleButton";
import FormButton from "@/components/FormButton";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({ email: "", password: "", repeatPassword: "" }); // State to store error messages for each field
  const [name, setName] = useState(""); // State for name input
  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input
  const [repeatPassword, setRepeatPassword] = useState(""); // State for repeat password
  const router = useRouter(); // Initialize useRouter

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Email validation function
  const validateEmail = (email: string): boolean => {
    const gmailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return gmailPattern.test(email);
  };

  // Password validation function
  const validatePassword = (password: string): boolean => {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/; // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    return passwordPattern.test(password);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission

    // Validate email and password
    if (!validateEmail(email)) {
      setError({ ...error, email: "Invalid email format (must be @gmail.com)" });
      return;
    }
    if (!validatePassword(password)) {
      setError({ ...error, password: "Password must be at least 8 characters, 1 uppercase, 1 lowercase, and 1 number." });
      return;
    }
    if (password !== repeatPassword) {
      setError({ ...error, repeatPassword: "Passwords do not match" });
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }), // Send name, email, and password
      });

      if (!response.ok) {
        const data = await response.json();
        setError({ ...error, email: data.message }); // Display error message from the server
        return;
      }

      const data = await response.json();
      console.log(data.message); // Handle successful signup (e.g., redirect)
      router.push('/welcome'); // Redirect to the welcome page
    } catch (error) {
      console.log('signup failed') // Handle network errors
    }
  };

  // Real-time validation: Email, Password, and Repeat Password
  const handleBlurEmail = () => {
    if (!validateEmail(email)) {
      setError({ ...error, email: "Invalid email format (must be @gmail.com)" });
    } else {
      setError({ ...error, email: "" });
    }
  };

  const handleBlurPassword = () => {
    if (!validatePassword(password)) {
      setError({ ...error, password: "Password must be at least 8 characters, 1 uppercase, 1 lowercase, and 1 number." });
    } else {
      setError({ ...error, password: "" });
    }
  };

  const handleBlurRepeatPassword = () => {
    if (password !== repeatPassword) {
      setError({ ...error, repeatPassword: "Passwords do not match" });
    } else {
      setError({ ...error, repeatPassword: "" });
    }
  };

  return (
    <div className={`${poppinsFont.className} flex flex-col justify-center items-center font-light  bg-white text-sm text-color-one`}>
      <Logo 
        src="/images/dark-logo.svg" 
        alt="dark-logo" 
        logoText="Taskify" 
        textColor="text-color-two" 
       />
      <form onSubmit={handleSubmit} className={`flex flex-col justify-center shadow-[0px_4px_4px_rgba(0,0,0,0.25)] px-12 rounded-[10px] w-72`}>
        
        <label className="pt-6 pb-1">Name</label>
        <input 
          type="text" 
          name="name" 
          required 
          autoFocus 
          value={name} // Controlled input
          onChange={(e) => setName(e.target.value)} // Update state
          className="rounded-[10px] border  py-2 px-4" 
        />
        
        <label className="pt-6 pb-1">Email</label>
        <input 
          type="email" 
          name="email" 
          required 
          value={email} // Controlled input
          onChange={(e) => setEmail(e.target.value)} // Update state
          onBlur={handleBlurEmail} // Trigger validation on blur
          className="rounded-[10px] border py-2 px-4" 
        />
        {error.email && <p className="text-red-500 text-xs mt-2">{error.email}</p>} {/* Email error */}
        
        {/* Password Field */}
        <label className="pt-6 pb-1">Password</label>
        <div className="relative">
          <input 
            type={showPassword ? "text" : "password"} 
            name="password" 
            required 
            value={password} // Controlled input
            onChange={(e) => setPassword(e.target.value)} // Update state
            onBlur={handleBlurPassword} // Trigger validation on blur
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
        {error.password && <p className="text-red-500 text-xs mt-2">{error.password}</p>} {/* Password error */}
        
        {/* Repeat Password Field */}
        <label className="pt-6 pb-1">Repeat password</label>
        <div className="relative">
          <input 
            type="password"
            name="repeatpassword" 
            required 
            value={repeatPassword} // Controlled input
            onChange={(e) => setRepeatPassword(e.target.value)} // Update state
            onBlur={handleBlurRepeatPassword} // Trigger validation on blur
            className="rounded-[10px] border py-2 px-4 w-full"
          />
        </div>
        {error.repeatPassword && <p className="text-red-500 text-xs mt-2">{error.repeatPassword}</p>} {/* Repeat password error */}

        <FormButton ButtonText="Sign up" />
      </form>
      <HorizontalLine />
      <GoogleButton text="Sign up" />
      <p className="mt-8">Already have an account? 
        <Link href="/login">
           <span className="text-secondary-color duration-300 hover:text-primary-color cursor-pointer"> Login</span>
        </Link>
      </p>
    </div>
  );
}
