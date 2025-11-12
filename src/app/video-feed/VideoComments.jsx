"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const VideoComments = ({ comments = [] }) => {
  if (!comments.length) return null;

  return (
    <div className="mt-1 space-y-3">
      {comments.map((comment, index) => {
        const name = comment?.user?.username || "User";
        return (
          <div
            key={index}
            className="flex items-start space-x-3 text-gray-900 dark:text-gray-100"
          >
            {/* Аватар */}
            <Avatar className="h-8 w-8 flex-shrink-0 mt-[2px]">
              <AvatarImage />
              <AvatarFallback className="bg-gray-600 text-white text-sm">
                {name.slice(0, 1).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            {/* Комментарий */}
            <div className="flex-1 min-w-0">
              <div className="rounded-lg p-2 transition-colors duration-150 bg-[#f0f2f5] dark:bg-[#1a1d29] hover:bg-[#e6e7eb] dark:hover:bg-[#232634]">
                <p className="font-semibold text-sm mb-[2px] leading-tight truncate">
                  {name}
                </p>
                <p className="text-sm leading-snug break-words">
                  {comment?.text}
                </p>
              </div>

              <div className="flex items-center mt-1 text-xs text-gray-500 dark:text-gray-400 space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className="px-1 h-auto text-xs hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Like
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="px-1 h-auto text-xs hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Reply
                </Button>
                <span className="whitespace-nowrap">{comment?.createdAt}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default VideoComments;
