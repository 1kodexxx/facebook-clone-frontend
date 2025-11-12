"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";
import { MoreHorizontal, UserX } from "lucide-react";

const MutualFriends = () => {
  const mutualFriends = [
    {
      id: 1,
      name: "Sasha Pushkin",
      followers: 40,
      avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Sasha",
    },
    {
      id: 2,
      name: "Anna Petrova",
      followers: 32,
      avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Anna",
    },
    {
      id: 3,
      name: "Michael Orlov",
      followers: 50,
      avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Michael",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-4"
    >
      <Card className="bg-white/70 dark:bg-neutral-900/60 backdrop-blur border border-gray-200 dark:border-neutral-700 shadow-sm">
        <CardContent className="p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
            Mutual Friends
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {mutualFriends.map((friend) => (
              <div
                key={friend.id}
                className="bg-gray-50 dark:bg-neutral-800/80 border border-gray-200 dark:border-neutral-700 rounded-lg p-4 flex items-center justify-between hover:shadow-md transition-all duration-200 min-w-0"
              >
                {/* Friend Info */}
                <div className="flex items-center space-x-3 sm:space-x-4 min-w-0">
                  <Avatar className="h-12 w-12 ring-2 ring-gray-200 dark:ring-neutral-700 shrink-0">
                    <AvatarImage src={friend.avatar} alt={friend.name} />
                    <AvatarFallback className="bg-gray-300 dark:bg-gray-600 text-black dark:text-white">
                      {friend.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {friend.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {friend.followers} followers
                    </p>
                  </div>
                </div>

                {/* Dropdown Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-gray-100 dark:hover:bg-neutral-800"
                    >
                      <MoreHorizontal className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700"
                  >
                    <DropdownMenuItem
                      className="flex items-center gap-2 text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                      onClick={() => alert(`Unfollowed ${friend.name}`)}
                    >
                      <UserX className="h-4 w-4" /> Unfollow
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MutualFriends;
