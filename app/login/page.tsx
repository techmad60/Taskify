 "use client";
import { useState, useEffect} from "react";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 
import Logo from "@/components/Logo";
import { useRouter } from 'next/navigation'; 
import { poppinsFont } from "@/fonts/fonts";
import FormButton from "@/components/FormButton";
import Cookies from 'js-cookie'; // Add this import

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState(""); // State for email error
  const [passwordError, setPasswordError] = useState(""); // State for password error
  const router = useRouter();


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleForgotPassword = async () => {
    // Clear previous errors
    setError("");
  
    // Check if email field is empty
    if (!email) {
      setError("Please enter your email to reset your password.");
      return;
    }
  
    try {
      // Send password reset request
      const response = await fetch(`https://taskify-backend-nq1q.onrender.com/api/request-reset`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }), // Sending email as the request body
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Failed to send reset email");
      }

      // Store JWT token in cookie
    Cookies.set('token', data.token, { expires: 1, secure: true });
  
      // If successful, redirect to the confirmation page
      router.push("/password-redirect");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message); // Set error message to be displayed
      } else {
        setError("An unknown error occurred.");
      }
    }
  };
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Clear previous errors
    setEmailError("");
    setPasswordError("");

    if (!email) {
      setEmailError("Email is required.");
      return;
    }
    
    try {
      const response = await fetch(`https://taskify-backend-nq1q.onrender.com/api/login`, {
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

      router.push('/welcome'); 
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    }
  };
  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      router.push('/welcome'); // Redirect if already logged in
    }
  }, [router]);
  

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
          onChange={(e) => setEmail(e.target.value)} 
        />
         {emailError && <p className="text-red-500">{emailError}</p>} {/* Display email error */}
        
        {/* Password Field */}
        <label className="pt-6 pb-1">Password</label>
        <div className="relative">
          <input 
            type={showPassword ? "text" : "password"} 
            name="password" 
            required 
            className="rounded-[10px] border p-2 w-full" 
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
          />
          <button 
            type="button" 
            onClick={togglePasswordVisibility} 
            className="absolute inset-y-0 right-3 flex items-center text-primary-color"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
       
        <p className="mt-3 text-blue-400 cursor-pointer duration-300 hover:text-primary-color" onClick={handleForgotPassword}>
          Forgot Password?
        </p>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        <FormButton ButtonText="Login"/>
       
      </form>
      <p className="mt-8">Don&apos;t have an account? 
        <Link href="/signup">
           <span className="text-secondary-color cursor-pointer duration-300 hover:text-primary-color"> Sign up</span>
        </Link>
      </p>
    </div>
  );
}
