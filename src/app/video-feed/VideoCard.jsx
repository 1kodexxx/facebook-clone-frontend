"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@radix-ui/react-scroll-area";
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
      transition={{ duration: 0.4 }}
      className="bg-white dark:bg-[rgb(36,37,38)] rounded-xl shadow-sm overflow-hidden mb-6 border border-transparent dark:border-gray-700"
    >
      {/* === Верхняя часть === */}
      <div className="flex items-center justify-between px-4 pt-3 pb-2">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage />
            <AvatarFallback className="bg-gray-700 text-white">
              D
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-[15px] font-semibold text-gray-900 dark:text-gray-100">
              {post?.user?.username || "Unknown"}
            </p>
          </div>
        </div>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <Clock className="h-4 w-4 mr-1" />
          <span>12-02-2024</span>
        </div>
      </div>

      {/* === Видео === */}
      <div className="w-full bg-black aspect-video">
        {post?.mediaUrl ? (
          <video controls className="w-full h-full object-cover">
            <source src={post.mediaUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className="w-full h-[280px] bg-black" />
        )}
      </div>

      {/* === Кнопки Like / Comment / Share === */}
      <div className="px-2 py-1">
        <div className="flex justify-around border-b border-gray-200 dark:border-gray-700">
          <Button
            variant="ghost"
            className="flex items-center justify-center gap-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 w-full py-2 rounded-none"
          >
            <ThumbsUp className="h-4 w-4" />
            Like
          </Button>

          <Button
            variant="ghost"
            className="flex items-center justify-center gap-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 w-full py-2 rounded-none"
            onClick={() => setShowComments(!showComments)}
          >
            <MessageCircle className="h-4 w-4" />
            Comment
          </Button>

          <Button
            variant="ghost"
            className="flex items-center justify-center gap-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 w-full py-2 rounded-none"
          >
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </div>

        {/* === Счётчики === */}
        <div className="flex justify-around text-xs text-gray-500 dark:text-gray-400 py-2">
          <span>3 Likes</span>
          <span>3 Comments</span>
          <span>3 Shares</span>
        </div>
      </div>

      {/* === Комментарии === */}
      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="px-4 pb-4"
          >
            <div className="flex items-center mt-2">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage />
                <AvatarFallback className="bg-gray-700 text-white">
                  D
                </AvatarFallback>
              </Avatar>
              <Input
                placeholder="Write a comment..."
                className="flex-1 text-sm dark:border-gray-500"
              />
              <Button size="icon" className="ml-2">
                <Send className="h-4 w-4" />
              </Button>
            </div>

            <ScrollArea className="h-[250px] w-full rounded-md border border-gray-200 dark:border-gray-700 mt-3 p-3">
              <VideoComments comments={post?.comments} />
            </ScrollArea>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default VideoCard;
