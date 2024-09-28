"use client";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 
import { useState } from "react";
import Logo from "@/components/Logo";
import { useRouter } from "next/navigation";
import { useSearchParams } from 'next/navigation'; // Import useRouter to handle navigation
import { poppinsFont } from "@/fonts/fonts";

export default function Navigation() {
    const [showPassword, setShowPassword] = useState(false);
    const [newPassword, setNewPassword] = useState(''); // State to hold new password
    const [confirmPassword, setConfirmPassword] = useState(''); // State to hold confirm password
    const [error, setError] = useState(''); // State for error messages
    const searchParams = useSearchParams(); // Initialize router for navigation
    const token  = searchParams.get('token'); // Get token from URL
    const router = useRouter()

    // Function to toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent default form submission

        // Check if passwords match
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            // Send request to reset password
            const response = await fetch(`https://taskify-backend-nq1q.onrender.com/api/reset-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, newPassword }), // Include token and new password in request body
               
            });

            console.log(token)
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || "Failed to reset password.");
            }

            // Redirect to login page after successful reset
            router.push('/login');
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message); // Set error message to be displayed
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
            <form onSubmit={handleSubmit} className={`flex flex-col justify-center shadow-[0px_4px_4px_rgba(0,0,0,0.25)] px-12 rounded-[10px] w-72 bg-white mt-8`}>
              
                <label className="pt-6 pb-1">Input New Password</label>
                <div className="relative">
                    <input 
                        type={showPassword ? "text" : "password"} 
                        name="password" 
                        required 
                        className="rounded-[10px] border p-2 w-full" 
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)} // Update password state
                    />
                    <button 
                        type="button" 
                        onClick={togglePasswordVisibility} 
                        className="absolute inset-y-0 right-3 flex items-center text-primary-color"
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>

                <label className="pt-6 pb-1">Confirm Password</label>
                <div className="relative">
                    <input 
                        type={showPassword ? "text" : "password"} 
                        name="confirmPassword" 
                        required 
                        className="rounded-[10px] border p-2 w-full" 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)} // Update confirm password state
                    />
                    <button 
                        type="button" 
                        onClick={togglePasswordVisibility} 
                        className="absolute inset-y-0 right-3 flex items-center text-primary-color"
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>

                {error && <p className="text-red-500">{error}</p>} {/* Display error message */}

                <button 
                    type="submit" 
                    className={`flex justify-center self-center text-sm bg-primary-color duration-300 hover:bg-secondary-color my-6 py-2 px-3 rounded-sm outline outline-offset-2 outline-1 outline-blue-400`}
                >
                    Reset Password
                </button>
            </form>
        </div>
    );
}
