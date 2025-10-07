"use client";

import UserInfo from "./UserInfo";
import { useUser } from "../Context/UserContext";

export default function UsersCard({
  friends,
  setUsers,
}: {
  friends: any[];
  setUsers: (users: any[]) => void;
}) {
  const { user: currentUser } = useUser(); // get logged-in user

  return (
    <div className="flex-1 space-y-3 mb-6 p-4 pr-2">
      {friends.map((friend) => (
        <UserInfo
          key={friend.id}
          user={friend}
          currentUser={currentUser} // pass current user
          setUsers={setUsers}
        />
      ))}
    </div>
  );
}
