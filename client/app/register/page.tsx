"use client";
import React, { useState } from 'react';
import { User, Mail, Lock, EyeOff, EyeClosed } from 'lucide-react';
import Link from 'next/link';

export default function SignUpForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [confirmapasswordtype, setConfirmapasswordtype] = useState('password');
    const [passwordtype, setPasswordtype] = useState('password');

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const response = await fetch('http://localhost:4000/users', {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password
                })
            });
            if (response.ok) {
                alert("Registration successful!");
            } else {
                alert("Registration failed!");
            }
        }
        catch (error) {
            console.error("Error during registration:", error);
            alert("An error occurred. Please try again later.");
        }
        console.log(formData);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center px-4 py-8 overflow-auto">


            <div className="relative z-10 bg-[#3d2977]/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 md:p-10 w-full max-w-md shadow-2xl my-auto">
                <h1 className="text-3xl sm:text-4xl font-bold text-white text-center mb-6 sm:mb-8">
                    Sign up
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    <div className="relative">
                        <User className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full bg-transparent border-b border-gray-500 text-white placeholder-gray-400 py-2.5 sm:py-3 pl-7 sm:pl-8 pr-2 focus:outline-none focus:border-blue-400 transition-colors text-sm sm:text-base"
                            required
                        />
                    </div>

                    <div className="relative">
                        <Mail className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
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

                    <div className="relative flex justify-center items-center">
                        <Lock className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type={passwordtype}
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$"
                            minLength={8}

                            className="w-full bg-transparent border-b border-gray-500 text-white placeholder-gray-400 py-2.5 sm:py-3 pl-7 sm:pl-8 pr-8 sm:pr-10 focus:outline-none focus:border-blue-400 transition-colors text-sm sm:text-base"
                            required
                        />
                        <EyeClosed
                            className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                            size={18}
                            onClick={() => {
                                if (passwordtype == 'password')
                                    setPasswordtype('text');
                                else
                                    setPasswordtype('password');
                            }
                            }
                        />
                    </div>

                    <div className="relative flex justify-center items-center">
                        <Lock className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type={confirmapasswordtype}
                            name="confirmPassword"
                            placeholder="Confirm the Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full bg-transparent border-b border-gray-500 text-white placeholder-gray-400 py-2.5 sm:py-3 pl-7 sm:pl-8 pr-8 sm:pr-10 focus:outline-none focus:border-blue-400 transition-colors text-sm sm:text-base"
                            required
                        />
                        <EyeClosed
                            className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                            size={18}
                            onClick={() => {

                                if (confirmapasswordtype == 'password')
                                    setConfirmapasswordtype('text');
                                else
                                    setConfirmapasswordtype('password');
                            }
                            }


                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#4c7cf3] hover:bg-[#3d6ae0] text-white font-medium py-3 sm:py-3.5 rounded-xl transition-all duration-300 mt-6 sm:mt-8 text-sm sm:text-base"
                    >
                        Create account
                    </button>

                    {/* Google Sign-In Button - Redirects to server to start OAuth flow */}
                    <button
                        type="button"
                        className="w-full bg-white hover:bg-gray-100 text-gray-800 font-medium py-3 sm:py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base"
                        onClick={() => window.location.href = 'http://localhost:4000/auth/google'}
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
                        Already have an account ?{' '}
                        <Link href="/login" className="text-[#4c7cf3] hover:text-[#3d6ae0] font-medium transition-colors">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}