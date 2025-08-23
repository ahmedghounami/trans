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
        const res = await fetch("/api/me", {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });
        // if (!res.ok) {
        //   throw new Error("Failed to fetch user data");
        // }
        const data = await res.json();
        console.log("User data fetched:", data);
        setUser(data);
      } catch (error) {
        console.error("Error fetching me:", error);
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
