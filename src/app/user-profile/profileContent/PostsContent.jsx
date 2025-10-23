"use client";

import PostComments from "@/app/posts/PostComments";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { AnimatePresence, motion } from "framer-motion";
import {
  Facebook,
  Linkedin,
  Link as LinkIcon,
  MessageCircle,
  MoreHorizontal,
  Share2,
  ThumbsUp,
  Twitter,
} from "lucide-react";
import { useState } from "react";

const PostsContent = ({ post }) => {
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [showComments, setShowComments] = useState(false);
  return (
    <motion.div
      key={post?._id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="dark:bg-[rgb(36,37,38)] bg-white border border-gray-200 dark:border-gray-700">
        <CardContent className="p-6">
          {/* Верхняя часть */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3 cursor-pointer">
              <Avatar>
                <AvatarImage />
                <AvatarFallback className="bg-gray-300 dark:bg-gray-600 text-black dark:text-white">
                  D
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  Sasha Pushkin
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  20-05-2024
                </p>
              </div>
            </div>
            <Button variant="ghost" className="dark:hover:bg-gray-600">
              <MoreHorizontal className="h-4 w-4 text-gray-600 dark:text-gray-200" />
            </Button>
          </div>

          {/* Контент */}
          <p className="mb-4 text-gray-900 dark:text-gray-200">
            {post?.content}
          </p>

          {post?.mediaUrl && post.mediaType === "image" && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post?.mediaUrl}
              alt="post image"
              className="w-full h-auto rounded-lg mb-4"
            />
          )}

          {post?.mediaUrl && post.mediaType === "video" && (
            <video controls className="w-full h-[500px] rounded-lg mb-4">
              <source src={post?.mediaUrl} type="video/mp4" />
              Your browser does not support the video tag
            </video>
          )}

          {/* Статистика */}
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer">
              2 likes
            </span>
            <div className="flex gap-2">
              <span
                className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer"
                onClick={() => setShowComments(!showComments)}
              >
                3 comments
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer">
                3 share
              </span>
            </div>
          </div>

          <Separator className="mb-2 dark:bg-gray-500" />

          {/* Кнопки действий */}
          <div className="flex justify-between mb-2">
            <Button variant="ghost" className="flex-1 dark:hover:bg-gray-700">
              <ThumbsUp className="mr-2 h-4 w-4 text-gray-700 dark:text-gray-200" />{" "}
              Like
            </Button>
            <Button variant="ghost" className="flex-1 dark:hover:bg-gray-700">
              <MessageCircle className="mr-2 h-4 w-4 text-gray-700 dark:text-gray-200" />{" "}
              Comment
            </Button>

            {/* === Share Dialog === */}
            <Dialog
              open={isShareDialogOpen}
              onOpenChange={setIsShareDialogOpen}
            >
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex-1 dark:hover:bg-gray-700"
                >
                  <Share2 className="mr-2 h-4 w-4 text-gray-700 dark:text-gray-200" />{" "}
                  Share
                </Button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-[400px] p-6 rounded-xl dark:bg-[rgb(36,37,38)] bg-white border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
                <DialogHeader>
                  <DialogTitle className="text-lg font-semibold mb-1">
                    Share This Post
                  </DialogTitle>
                  <DialogDescription className="text-sm mb-4 text-gray-500 dark:text-gray-400">
                    Choose how you want to share this post
                  </DialogDescription>
                </DialogHeader>

                {/* Кнопки Share */}
                <div className="flex flex-col space-y-3">
                  <Button
                    className="w-full bg-white dark:bg-gray-800 text-black dark:text-white font-semibold border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center gap-2"
                    onClick={() => handleShare("facebook")}
                  >
                    <Facebook className="h-4 w-4" />
                    Share on Facebook
                  </Button>

                  <Button
                    className="w-full bg-white dark:bg-gray-800 text-black dark:text-white font-semibold border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center gap-2"
                    onClick={() => handleShare("twitter")}
                  >
                    <Twitter className="h-4 w-4" />
                    Share on Twitter
                  </Button>

                  <Button
                    className="w-full bg-white dark:bg-gray-800 text-black dark:text-white font-semibold border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center gap-2"
                    onClick={() => handleShare("linkedin")}
                  >
                    <Linkedin className="h-4 w-4" />
                    Share on Linkedin
                  </Button>

                  <Button
                    className="w-full bg-white dark:bg-gray-800 text-black dark:text-white font-semibold border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center gap-2"
                    onClick={() => handleShare("copy")}
                  >
                    <LinkIcon className="h-4 w-4" />
                    Copy Link
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Separator className="mb-2 dark:bg-gray-500" />

          {/* Комментарии */}
          <AnimatePresence>
            {showComments && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <PostComments post={post} />
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PostsContent;
