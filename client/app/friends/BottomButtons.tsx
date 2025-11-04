"use client";

import { useState } from "react";
import AddFriends from "./AddFriend";
import Requests from "./Requests";

export default function BottomButtons({
  onRefreshFriends, // 👈 receive this from parent
}: {
  onRefreshFriends?: () => void;
}) {
  const [showAddFriends, setShowAddFriends] = useState(false);
  const [showRequests, setShowRequests] = useState(false);

  return (
    <>
      {/* Bottom buttons */}
      <div className="flex justify-between gap-4 mt-4 sticky bottom-0 px-4 py-2">
        <button
          onClick={() => setShowAddFriends(true)}
          className="bg-purple-700/40 hover:bg-purple-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors uppercase"
        >
          Add Friends
        </button>
        <button
          onClick={() => setShowRequests(true)}
          className="bg-purple-700/40 hover:bg-purple-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors uppercase"
        >
          Requests
        </button>
      </div>

      {showAddFriends && <AddFriends onClose={() => setShowAddFriends(false)} />}

      {showRequests && (
        <Requests
          onClose={() => setShowRequests(false)}
          onFriendAccepted={onRefreshFriends} // 👈 call parent refresh when accepted
        />
      )}
    </>
  );
}
