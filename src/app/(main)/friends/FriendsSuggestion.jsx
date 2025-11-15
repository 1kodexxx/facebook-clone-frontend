"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { UserPlus } from "lucide-react";

const FriendsSuggestion = ({ friend }) => {
  const name = friend?.name || "Unknown";
  const initials =
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((s) => s[0])
      .join("")
      .toUpperCase() || "U";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="bg-white dark:bg-[rgb(36,37,38)] rounded-xl shadow-sm p-4 sm:p-5 flex flex-col items-center text-center"
      >
        <Avatar className="h-20 w-20 sm:h-24 sm:w-24 mb-4">
          <AvatarImage src={friend?.avatar || ""} alt={name} />
          <AvatarFallback className="bg-gray-700 text-white text-lg sm:text-xl">
            {initials}
          </AvatarFallback>
        </Avatar>

        <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 max-w-full truncate">
          {name}
        </h3>

        <Button
          className="bg-[#2374E1] hover:bg-[#1664c4] text-white w-full"
          size="lg"
          aria-label="Add friend"
        >
          <UserPlus className="mr-2 h-4 w-4" />
          <span className="truncate">Add Friend</span>
        </Button>
      </motion.div>
    </AnimatePresence>
  );
};

export default FriendsSuggestion;
