// ========================================
// User Context - Global Authentication State
// ========================================
// This provides user data to all components in the app

"use client";
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import socket from "../socket";

// Create context for sharing user data across components
export const UserContext = createContext({
  user: null,
  loading: true,
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);      // Store user data (name, email, picture, etc)
  const [loading, setLoading] = useState(true); // Track if we're still fetching user data

  // ========================================
  // Fetch User Data on App Load
  // ========================================
  useEffect(() => {
    const fetchMe = async () => {
      try {
        // Get JWT token from cookie (set during login)
        const token = Cookies.get("token");
        
        // If no token exists, user is not logged in
        if (!token) {
          setLoading(false);
          return;
        }

        // Ask server to verify token and get user data
        const res = await fetch("http://localhost:4000/me", {
          headers: {
            Authorization: `Bearer ${token}`,  // Send token to server
          },
          credentials: 'include',              // Include cookies in request
        });
        
        if (!res.ok) {
          // If token is invalid or expired, remove it
          if (res.status === 401) {
            Cookies.remove("token");
          }
          setLoading(false);
          return;
        }
        
        // Save user data to state (now available to all components)
        const data = await res.json();
        console.log("User data fetched:", data);
        setUser(data);
        
        // Join socket room for this user
        if (data?.id) {
          socket.emit("join", data.id);
          console.log("🔗 Joined socket room for user:", data.id);
        }
      } catch (error) {
        console.error("Error fetching me:", error);
        // Don't show error to user, just log it
      } finally {
        setLoading(false);
      }
    };
    fetchMe();
  }, []);

  // Make user data available to all child components
  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
