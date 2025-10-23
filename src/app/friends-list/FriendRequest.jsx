"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { UserMinus, UserPlus } from "lucide-react";

const FriendRequest = ({ friend }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-[rgb(36,37,38)] rounded-xl shadow-sm p-4 flex flex-col items-center text-center"
      >
        <Avatar className="h-24 w-24 mb-4">
          <AvatarImage src="" />
          <AvatarFallback className="bg-gray-700 text-white text-xl">
            D
          </AvatarFallback>
        </Avatar>

        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          {friend.name}
        </h3>

        <div className="flex flex-col w-full gap-2">
          <Button
            className="bg-[#2374E1] hover:bg-[#1664c4] text-white w-full"
            size="lg"
          >
            <UserPlus className="mr-2 h-4 w-4" /> Confirm
          </Button>
          <Button
            variant="ghost"
            className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 w-full text-gray-900 dark:text-gray-100"
            size="lg"
          >
            <UserMinus className="mr-2 h-4 w-4" /> Delete
          </Button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FriendRequest;
