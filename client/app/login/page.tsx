"use client";
import React, { useState, useEffect } from "react";
import { Mail, Lock } from "lucide-react";
import Link from "next/link";
import Cookies from 'js-cookie';
import { useSearchParams } from 'next/navigation';

export default function LoginForm() {
    // Store email and password from form
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const searchParams = useSearchParams();
    
    // ========================================
    // Handle Google OAuth Errors
    // ========================================
    // If Google authentication fails, user gets redirected here with error parameter
    useEffect(() => {
        const error = searchParams.get('error');
        if (error) {
            // Show user-friendly error messages
            const errorMessages: { [key: string]: string } = {
                'no_code': 'Authorization code not received from Google',
                'no_access_token': 'Failed to get access token from Google',
                'db_error': 'Database error occurred',
                'insert_failed': 'Failed to create user account',
                'oauth_failed': 'Google authentication failed'
            };
            alert(errorMessages[error] || 'Authentication failed. Please try again.');
            // Clean up URL (remove error parameter)
            window.history.replaceState({}, '', '/login');
        }
    }, [searchParams]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:4000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                Cookies.set("token", data.token, {
                    expires: 7,
                    secure: false, // Set to false for localhost (use true in production with HTTPS)
                    sameSite: "lax",
                });

                // router.push("/chat");
                window.location.href = "/home"; // Redirect to chat page


            } else {
                const error = await response.json();
                alert(error.error || "Invalid email or password!");
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("An error occurred. Please try again later.");
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center px-4 py-8 overflow-auto">
            <div className="relative z-10 bg-[#3d2977]/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 md:p-10 w-full max-w-md shadow-2xl my-auto">
                <h1 className="text-3xl sm:text-4xl font-bold text-white text-center mb-6 sm:mb-8">
                    Login
                </h1>

                <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                    <div className="relative">
                        <Mail
                            className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400"
                            size={18}
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-transparent border-b border-gray-500 text-white placeholder-gray-400 py-2.5 sm:py-3 pl-7 sm:pl-8 pr-2 focus:outline-none focus:border-blue-400 transition-colors text-sm sm:text-base"
                            required
                        />
                    </div>

                    <div className="relative">
                        <Lock
                            className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400"
                            size={18}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full bg-transparent border-b border-gray-500 text-white placeholder-gray-400 py-2.5 sm:py-3 pl-7 sm:pl-8 pr-2 focus:outline-none focus:border-blue-400 transition-colors text-sm sm:text-base"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#4c7cf3] hover:bg-[#3d6ae0] text-white font-medium py-3 sm:py-3.5 rounded-xl transition-all duration-300 mt-6 sm:mt-8 text-sm sm:text-base"
                    >
                        Login
                    </button>

                    {/* Google Sign-In Button - Redirects to server to start OAuth flow */}
                    <button
                        type="button"
                        onClick={() => window.location.href = 'http://localhost:4000/auth/google'}
                        className="w-full bg-white hover:bg-gray-100 text-gray-800 font-medium py-3 sm:py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base"
                    >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24">
                            <path
                                fill="#4285F4"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                                fill="#34A853"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                                fill="#FBBC05"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                                fill="#EA4335"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                        </svg>
                        Sign in with Google
                    </button>

                    <button
                        type="button"
                        className="w-full bg-black hover:bg-gray-900 text-white font-medium py-3 sm:py-3.5 rounded-xl transition-all duration-300 text-sm sm:text-base"
                    >
                        Sign in with 42
                    </button>

                    <p className="text-center text-gray-300 text-xs sm:text-sm mt-4 sm:mt-6">
                        Don't have an account?{" "}
                        <Link
                            href="/register"
                            className="text-[#4c7cf3] hover:text-[#3d6ae0] font-medium transition-colors"
                        >
                            Sign up
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
