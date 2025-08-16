



"use client";
import { useEffect, useState } from "react";
import { useUser } from "../../Context/UserContext";
import HistoryItem from "../../home/historyitem";
import ProfileHeader from "../profileheader";
import { useParams, useRouter } from "next/navigation";


import PingPongAchievements from "../../home/achievement";
import { Gamepad2 } from "lucide-react";
import Loading from "@/app/components/loading";

export default function Profile() {
    const [games, setGames] = useState([]);
    const [user, setUser] = useState(null); // Changed from array to null
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const router = useRouter();
    const { user: currentUser } = useUser();
    useEffect(() => {
        console.log("User ID from params:", id);
    }, [id]);

    useEffect(() => {
        const fetch_user = async () => {
            try {
                const response = await fetch(`http://localhost:4000/users/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    console.error("Failed to fetch user");
                    router.push("/404"); // Use router instead of window.location
                    return;
                }
                const data = await response.json();
                setUser(data); // This is a single object, not an array
            } catch (error) {
                console.error("Error fetching user:", error);
                router.push("/404");
            }
        };

        if (id) {
            fetch_user();
        }
    }, [id, router]);

    useEffect(() => {
        const fetch_games = async () => {
            try {
                const response = await fetch(`http://localhost:4000/games/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    console.error("Failed to fetch games");
                    setGames([]); // Set empty array if failed
                    return;
                }
                const data = await response.json();
                setGames(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching games:", error);
                setGames([]);
                setLoading(false);
            }
        };

        if (id) {
            fetch_games();
        }
    }, [id]);

    if (loading || !user) {
        return (
            <div className="flex items-center justify-center h-screen text-white animate-pulse">
                <Loading />
            </div>
        );
    }
    console.log("Current user from context:", currentUser);
    console.log("Fetched user:", user);

    return (
        <div className="flex flex-col h-full relative">
            <ProfileHeader user={user} games={games} />
            {/* ////////////////////////////////////////////////////////// */}
            <div className="flex-1/5 flex gap-2 m-5">
                

                <div className="flex-1/2 flex flex-col gap-2">
                    <div className="flex-1 bg-[#2b24423d] rounded-lg p-4 flex gap-2 border border-[#7b5ddf3d] shadow-[0_0_10px_#7b5ddf22] backdrop-blur-sm">
                        <PingPongAchievements className="text-purple-400 w-6 h-6" games={games} user={user} />
                    </div>

                </div>
            </div>
        </div>
    );
}