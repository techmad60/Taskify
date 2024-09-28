"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function ResetPassword() {
    const searchParams = useSearchParams();
    const token = searchParams.get('token'); // Get token from query parameters
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    // Define regex pattern for password validation
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/; // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 symbol

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        // Check if the new password matches the regex pattern
        if (!passwordPattern.test(newPassword)) {
            setError("Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        
        try {
            const response = await fetch(`https://taskify-backend-nq1q.onrender.com/api/reset-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, newPassword }), // Include token and new password in request body
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || "Failed to reset password.");
            }
            router.push('/login');
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message); // Set error message to be displayed
            } else {
                setError("An unknown error occurred.");
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="password" 
                placeholder="New Password" 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)} 
                required 
            />
            <input 
                type="password" 
                placeholder="Confirm Password" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                required 
            />
            {error && <p className="text-red-500 text-xs font-extralight mt-2">{error}</p>} {/* Display error message */}
            <button type="submit">Reset Password</button>
        </form>
    );
}
