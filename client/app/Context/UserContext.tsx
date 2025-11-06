// app/context/UserContext.tsx

"use client";
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

export const UserContext = createContext({
  user: null,
  loading: true,
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const token = Cookies.get("token");
        
        // If no token, just set loading to false and return
        if (!token) {
          setLoading(false);
          return;
        }

        const res = await fetch("http://localhost:4000/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: 'include',
        });
        
        if (!res.ok) {
          // If unauthorized, remove invalid token
          if (res.status === 401) {
            Cookies.remove("token");
          }
          setLoading(false);
          return;
        }
        
        const data = await res.json();
        console.log("User data fetched:", data);
        setUser(data);
      } catch (error) {
        console.error("Error fetching me:", error);
        // Don't show error to user, just log it
      } finally {
        setLoading(false);
      }
    };
    fetchMe();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
