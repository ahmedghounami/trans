
"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useUser } from "../../Context/UserContext";
import ProfileHeader from "../profileheader";
import { useParams, useRouter } from "next/navigation";
import Loading from "@/app/components/loading";
import EditProfile from "../editProfile";
import PingPongPerformanceChart from "../../home/chart";
import PingPongAchievements from "../../home/cards";
import GameHistory from "../../home/gamehistory";
import RPSSummary from "../RPSSummary";

export default function Profile() {
    const [games, setGames] = useState<any[]>([]);
    const [user, setUser] = useState<any | null>(null); // Changed from array to null
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const router = useRouter();
    const { user: currentUser } = useUser();
    const [editMode, setEditMode] = useState(false);

    // Keep local `user` in sync when the global currentUser changes (e.g., profile updates)
    useEffect(() => {
            if (!currentUser) return;
            // If the fetched profile matches the currently logged in user, update the displayed user
            try {
                const currId = (currentUser as any).id;
                if (String(currId) === String(id)) {
                    setUser(currentUser);
                }
            } catch (e) {
                // ignore
            }
        }, [currentUser, id]);

    // Chart component used on the right column (imported at top)

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
            {editMode && (
                <EditProfile
                    setEditMode={setEditMode}
                    editMode={editMode}
                    user={user}
                />
            )}
            <ProfileHeader user={user} games={games} setEditMode={setEditMode} />
            {/* ////////////////////////////////////////////////////////// */}
            <div className="flex flex-col gap-4 max-h-[40%] p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <PingPongPerformanceChart user={user} games={games} />
                    <RPSSummary
                    user={user}
                    games={games}
                    />
                </div>

                
            </div>
        </div>
    );
}