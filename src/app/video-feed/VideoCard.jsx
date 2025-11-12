"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AnimatePresence, motion } from "framer-motion";
import { Clock, MessageCircle, Send, Share2, ThumbsUp } from "lucide-react";
import { useState } from "react";
import VideoComments from "./VideoComments";

const VideoCard = ({ post }) => {
  const [showComments, setShowComments] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="bg-white dark:bg-[rgb(36,37,38)] rounded-xl shadow-sm overflow-hidden border border-transparent dark:border-gray-700"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 sm:px-4 pt-3 pb-2">
        <div className="flex items-center space-x-3">
          <Avatar className="h-9 w-9 sm:h-10 sm:w-10">
            <AvatarImage />
            <AvatarFallback className="bg-gray-700 text-white">
              U
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="text-[15px] font-semibold text-gray-900 dark:text-gray-100 truncate">
              {post?.user?.username || "Unknown"}
            </p>
          </div>
        </div>
        <div className="flex items-center text-xs sm:text-sm text-gray-500 dark:text-gray-400 shrink-0">
          <Clock className="h-4 w-4 mr-1" />
          <span>12-02-2024</span>
        </div>
      </div>

      {/* Video */}
      <div className="w-full bg-black">
        <div className="aspect-video">
          {post?.mediaUrl ? (
            <video
              controls
              className="w-full h-full object-contain bg-black"
              playsInline
            >
              <source src={post.mediaUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="w-full h-full bg-black" />
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="px-2 sm:px-3 py-1">
        <div className="grid grid-cols-3 gap-1 border-b border-gray-200 dark:border-gray-700">
          <Button
            variant="ghost"
            className="flex items-center justify-center gap-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-none py-2"
          >
            <ThumbsUp className="h-4 w-4" />
            <span className="hidden sm:inline">Like</span>
          </Button>

          <Button
            variant="ghost"
            className="flex items-center justify-center gap-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-none py-2"
            onClick={() => setShowComments((v) => !v)}
          >
            <MessageCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Comment</span>
          </Button>

          <Button
            variant="ghost"
            className="flex items-center justify-center gap-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-none py-2"
          >
            <Share2 className="h-4 w-4" />
            <span className="hidden sm:inline">Share</span>
          </Button>
        </div>

        {/* Counters */}
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 py-2 px-1">
          <span>3 Likes</span>
          <span>3 Comments</span>
          <span>3 Shares</span>
        </div>
      </div>

      {/* Comments */}
      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="px-3 sm:px-4 pb-4"
          >
            <div className="flex items-center mt-2 gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage />
                <AvatarFallback className="bg-gray-700 text-white">
                  U
                </AvatarFallback>
              </Avatar>
              <Input
                placeholder="Write a comment..."
                className="flex-1 text-sm dark:border-gray-500"
              />
              <Button size="icon" className="ml-1 sm:ml-2 shrink-0">
                <Send className="h-4 w-4" />
              </Button>
            </div>

            {/* Внутренний скролл по высоте без горизонтального скролла */}
            <div className="h-56 sm:h-64 mt-3 overflow-y-auto overflow-x-hidden rounded-md border border-gray-200 dark:border-gray-700 p-3">
              <VideoComments comments={post?.comments} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default VideoCard;
