"use client";

import { FriendCardSkeleton, NoFriendsMessage } from "@/lib/Skeleten";
import { useEffect, useState } from "react";
import LeftSideBar from "../../../components/layout/LeftSideBar";
import FriendRequest from "./FriendRequest";
import FriendsSuggestion from "./FriendsSuggestion";

export default function FriendsPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const friendRequests = [{ id: 1, name: "Sasha Pushkin" }];
  const friendSuggestions = [{ id: 2, name: "Sasha Pushkin" }];

  return (
    // РЕЗЕРВ МЕСТА ПОД САЙДБАР НА ДЕСКТОПЕ → md:pl-64
    <div className="min-h-screen bg-gray-100 dark:bg-[rgb(24,25,26)] overflow-x-hidden md:pl-64">
      <LeftSideBar />

      {/* фиксированный хедер 64px уже учтён отступом mt-16 */}
      <main className="mt-16 px-3 sm:px-5 lg:px-6 pb-10 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* === Блок запросов === */}
          <section className="mb-10 sm:mb-12">
            <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-gray-100">
              Friends Requests
            </h1>

            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
              {loading ? (
                <FriendCardSkeleton />
              ) : friendRequests.length === 0 ? (
                <NoFriendsMessage
                  text="No Friend Requests"
                  description="Looks like you are all caught up! Why not explore and connect with new people?"
                />
              ) : (
                friendRequests.map((friend) => (
                  <FriendRequest key={friend.id} friend={friend} />
                ))
              )}
            </div>
          </section>

          {/* === Блок рекомендаций === */}
          <section>
            <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-gray-100">
              People you may know
            </h1>

            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
              {loading ? (
                <FriendCardSkeleton />
              ) : friendSuggestions.length === 0 ? (
                <NoFriendsMessage
                  text="No Friend Suggestions"
                  description="Looks like you are all caught up!"
                />
              ) : (
                friendSuggestions.map((friend) => (
                  <FriendsSuggestion key={friend.id} friend={friend} />
                ))
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
