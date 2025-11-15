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
import { useMemo, useState } from "react";

const PostsContent = ({ post }) => {
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const createdAt = useMemo(() => "20-05-2024", []);

  // === share helpers (как в PostCard) ===
  const generateSharedLink = () => {
    const origin =
      (typeof window !== "undefined" && window.location.origin) ||
      process.env.NEXT_PUBLIC_FRONTEND_ORIGIN ||
      "http://localhost:3000";
    return `${origin}/${post?._id ?? post?.id ?? ""}`;
  };

  const webShare = async (url) => {
    try {
      if (navigator.share) {
        await navigator.share({ url });
        return true;
      }
    } catch {
      /* noop */
    }
    return false;
  };

  const handleShare = async (platform) => {
    const url = generateSharedLink();
    const u = encodeURIComponent(url);

    if (platform === "native" && (await webShare(url))) {
      setIsShareDialogOpen(false);
      return;
    }

    if (platform === "copy") {
      await navigator.clipboard?.writeText(url);
      setIsShareDialogOpen(false);
      return;
    }

    let shareUrl = null;
    if (platform === "facebook")
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${u}`;
    if (platform === "twitter")
      shareUrl = `https://twitter.com/intent/tweet?url=${u}`;
    if (platform === "linkedin")
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${u}`;
    if (shareUrl) window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.div
      key={post?._id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="dark:bg-[rgb(36,37,38)] bg-white border border-gray-200 dark:border-gray-700">
        <CardContent className="p-4 sm:p-6">
          {/* Верхняя часть */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3 cursor-pointer min-w-0">
              <Avatar>
                <AvatarImage alt="author" />
                <AvatarFallback className="bg-gray-300 dark:bg-gray-600 text-black dark:text-white">
                  D
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="font-semibold text-gray-900 dark:text-white truncate">
                  Sasha Pushkin
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {createdAt}
                </p>
              </div>
            </div>
            <Button variant="ghost" className="dark:hover:bg-gray-600">
              <MoreHorizontal className="h-4 w-4 text-gray-600 dark:text-gray-200" />
            </Button>
          </div>

          {/* Контент */}
          {post?.content && (
            <p className="mb-3 sm:mb-4 text-gray-900 dark:text-gray-200">
              {post.content}
            </p>
          )}

          {post?.mediaUrl && post.mediaType === "image" && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post?.mediaUrl}
              alt="post image"
              className="w-full h-auto rounded-lg mb-4"
            />
          )}

          {post?.mediaUrl && post.mediaType === "video" && (
            <div className="w-full aspect-video rounded-lg overflow-hidden mb-4">
              <video controls className="w-full h-full object-cover">
                <source src={post?.mediaUrl} type="video/mp4" />
                Your browser does not support the video tag
              </video>
            </div>
          )}

          {/* Статистика */}
          <div className="flex justify-between items-center mb-4 text-sm">
            <span className="text-gray-600 dark:text-gray-400">2 likes</span>
            <div className="flex gap-2">
              <button
                className="text-gray-600 dark:text-gray-400 hover:underline"
                onClick={() => setShowComments((v) => !v)}
              >
                3 comments
              </button>
              <span className="text-gray-600 dark:text-gray-400">3 share</span>
            </div>
          </div>

          <Separator className="mb-2 dark:bg-gray-500" />

          {/* Кнопки действий */}
          <div className="flex justify-between mb-2">
            <Button variant="ghost" className="flex-1 dark:hover:bg-gray-700">
              <ThumbsUp className="mr-2 h-4 w-4 text-gray-700 dark:text-gray-200" />
              Like
            </Button>
            <Button
              variant="ghost"
              className="flex-1 dark:hover:bg-gray-700"
              onClick={() => setShowComments((v) => !v)}
            >
              <MessageCircle className="mr-2 h-4 w-4 text-gray-700 dark:text-gray-200" />
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
                  <Share2 className="mr-2 h-4 w-4 text-gray-700 dark:text-gray-200" />
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

                <div className="flex flex-col space-y-3">
                  <Button onClick={() => handleShare("native")}>
                    <Share2 className="h-4 w-4 mr-2" />
                    Share via device
                  </Button>
                  <Button
                    className="bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => handleShare("facebook")}
                  >
                    <Facebook className="h-4 w-4 mr-2" />
                    Facebook
                  </Button>
                  <Button
                    className="bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => handleShare("twitter")}
                  >
                    <Twitter className="h-4 w-4 mr-2" />
                    Twitter
                  </Button>
                  <Button
                    className="bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => handleShare("linkedin")}
                  >
                    <Linkedin className="h-4 w-4 mr-2" />
                    LinkedIn
                  </Button>
                  <Button onClick={() => handleShare("copy")}>
                    <LinkIcon className="h-4 w-4 mr-2" />
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
