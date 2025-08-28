'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useUser } from '../Context/UserContext';
export default function LoginPage() {
    const router = useRouter();
    const [name, setName] = useState('');
    
    const user = useUser();
    

    const handleLogin = async () => {
        const name = document.querySelector('input[name="name"]')?.value.trim();
        console.log("Login attempt with name:", name);

        const res = await fetch("/api/login", {
            method: "POST",
            body: JSON.stringify({ name }),
            headers: { "Content-Type": "application/json" },
        });


        if (res.ok) {
            const data = await res.json();
            Cookies.set("token", data.token, {
                expires: 1,
                secure: true,
                sameSite: "lax",
            });
            
            // router.push("/chat");
            window.location.href = "/chat"; // Redirect to chat page
        }
        
        else {
            const errorData = await res.json();
            alert(`Login failed: ${errorData.message}`);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
            <h1 className="text-4xl text-white mb-6">Login</h1>
            <form
                onSubmit={async (e) => {
                    e.preventDefault();
                    await handleLogin();
                }}
                className="flex flex-col items-center"
            >
                <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="p-2 rounded-lg mb-4 w-64"
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
                >
                    Login
                </button>
            </form>
        </div>
    );
}
