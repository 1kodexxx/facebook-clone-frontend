"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const PostComments = ({ post }) => {
  const [showAllComments, setShowAllComments] = useState(false);
  const comments = post?.comments || [];
  const visibleComments = showAllComments ? comments : comments.slice(0, 3);

  return (
    <div className="mt-4">
      <h3 className="font-semibold mb-3 text-gray-800 dark:text-gray-100">
        Comments
      </h3>

      <div className="max-h-60 overflow-y-auto pr-2 space-y-3">
        {visibleComments.map((comment, index) => (
          <div
            key={index}
            className="flex items-start space-x-3 text-gray-900 dark:text-gray-100"
          >
            {/* === АВАТАР === */}
            <Avatar className="h-8 w-8 flex-shrink-0 mt-[2px]">
              <AvatarImage />
              <AvatarFallback className="bg-gray-600 text-white text-sm">
                D
              </AvatarFallback>
            </Avatar>

            {/* === ТЕЛО КОММЕНТАРИЯ === */}
            <div className="flex-1">
              <div
                className="
                  bg-[#f0f2f5] dark:bg-[#1a1d29]
                  hover:bg-[#e6e7eb] dark:hover:bg-[#232634]
                  rounded-lg p-2 transition-colors duration-150
                "
              >
                <p className="font-semibold text-sm mb-[2px] leading-tight">
                  {comment?.user?.username || "User"}
                </p>
                <p className="text-sm leading-snug">
                  {comment?.user?.text || ""}
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
                <span>{comment?.createdAt}</span>
              </div>
            </div>
          </div>
        ))}

        {/* === КНОПКА SHOW ALL COMMENTS === */}
        {comments.length > 3 && (
          <button
            onClick={() => setShowAllComments(!showAllComments)}
            className="flex items-center text-blue-600 dark:text-blue-400 mt-1 text-sm font-medium hover:underline"
          >
            {showAllComments ? (
              <>
                Show less <ChevronUp className="ml-1 h-4 w-4" />
              </>
            ) : (
              <>
                Show all comments <ChevronDown className="ml-1 h-4 w-4" />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default PostComments;
